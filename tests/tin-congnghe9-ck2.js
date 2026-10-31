// Kiểm tra hai ngân hàng lớp 9 cuối năm của Phiên N9-ck2-tin-congnghe: Tin học (data/banks/9-tin.js; ôn Chủ đề 4 phần a, Bài 9a–13a; trọng
// tâm Chủ đề 5, 6, Bài 14–17) và Công nghệ (data/banks/9-congnghe.js; mô đun Lắp đặt mạng điện trong nhà, Bài 1–7, trọng tâm Bài 5–7; 2 câu
// ôn Định hướng nghề nghiệp), theo mẫu tests/tin-congnghe6-ck2.js và tests/tin-congnghe9-gk2.js. Mỗi ngân hàng = Đề 1 + Đề 2 (cùng chia
// đúng ma trận) + đề ngẫu nhiên không có câu riêng; mã đề, số câu lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7. Câu có phép tính,
// có công thức hoặc có hình được nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong hai kho, đúng đề ghi ở id); đáp án tính bằng
// code (so với ans, o[0], a của câu đúng/sai 4 ý). Tin học: đọc lại sơ đồ khối theo Hình 14.3, 15.4 của sách (Bắt đầu, Kết thúc hình bầu
// dục tô moc-soft; Nhập, Xuất hình bình hành tô ioe-soft; bước xử lí hình chữ nhật tô sun-soft; điều kiện hình thoi tô ok-soft, hai đường
// ra ghi “đúng”, “sai”; mũi tên đi từ giữa một cạnh tới giữa cạnh của hình khác, chỉ gồm đoạn ngang, dọc; chữ vừa hình, nhãn không đè lên
// hình, mũi tên) rồi chạy thử; đọc lại chương trình Scratch theo tên khối của Hình 16.1, 16.2 (màu theo nhóm lệnh, khối lặp, khối nếu có
// thân chữ C, “nếu không thì”) rồi chạy thử với các câu trả lời gõ vào (phát hiện lặp mãi); đọc lại trang tính (như
// tests/tin-congnghe9-gk2.js) và tính lại công thức (COUNTIF, SUMIF, IF lồng nhau; sao chép công thức), thử thiết lập của công cụ xác thực
// dữ liệu (cả Decimal, Text length); nhóm nghề, hướng nghề theo Hình 17.1 của sách. Công nghệ: đọc lại sơ đồ nguyên lí (như
// tests/tin-congnghe9-gk2.js) rồi xét thiết bị nào có điện khi đóng, ngắt công tắc, khi cầu chì đứt; đọc lại bảng chi phí (đường kẻ, ô chữ
// căn trái, ô số căn phải, chữ vừa ô) rồi tính lại thành tiền, tổng chi phí; tính lại tiền điện theo chỉ số công tơ, công suất theo số chỉ
// của ampe kìm, điểm và xếp loại tự đánh giá theo Bảng 7.1 (4, 3, 2, 1 điểm; 14–24, 25–35, 36–46, 47–56); mạch đèn cầu thang đổi trạng thái
// mỗi lần gạt một công tắc. Câu trả lời bằng số và câu có hình nào cũng phải có kiểm tra ở đây.
// Rồi: chữ (dấu thanh kiểu cũ như sách; số ngăn hàng nghìn bằng khoảng trắng; không nhắc vị trí của phương án; không dùng tên nhân vật của
// sách Tin học 9), lời dặn (các bài theo mục lục, phần a và phần b, mô đun khác, câu về đề chung của Sở), dạng câu (khung Công văn 7991;
// mỗi đề có câu đúng/sai 4 ý và câu trả lời ngắn; đúng/sai 4 ý không lặp kiểu Đ/S), mức độ, ma trận (chủ đề theo thứ tự bài; phần trọng tâm
// nhiều câu hơn hẳn phần ôn), đáp án đúng không dài hơn hẳn lựa chọn sai, là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu
// nhiều lựa chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề; rút thử nhiều lần (đúng ma trận, gặp đủ câu; đã làm hết một đề cố định
// thì rút toàn câu của đề kia); đề bài không trùng câu khác trong file, không gần trùng câu của các kho cũ cùng môn; câu ôn (cùng chữ chủ
// đề với kho giữa kì II, cuối kì I) không trùng đề bài, chuỗi 6 từ của đề bài, đáp án của câu cùng chủ đề ở kho đó; dò lộ đáp án giữa các
// câu rút được cùng lúc (số ở vị trí kết quả, hai ô sắp xếp liền nhau: không được có; chuỗi 3 từ của đáp án bằng chữ in ra với DO_LO=1 để
// xem tay, đã xem ghi ở DA_XEM) và giữa câu cùng chủ đề của kho này với kho cũ (đề “Ôn chủ đề” rút chung; DA_XEM_CHU_DE); có ../OnUp-Book
// (repo riêng tư) thì so mọi trường chữ với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng; DO_SACH=1 in
// chuỗi 6 từ) và với câu của mọi kho khác, cả câu riêng của các đề ngẫu nhiên (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ).
// Bộ đọc hình và bộ chạy thử tự thử với hình, chương trình cố ý viết sai.
// Chạy: node tests/tin-congnghe9-ck2.js → in MATH OK.
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
   chuDe: chủ đề theo thứ tự của ma trận (nhãn chủ đề, số bài, tên bài theo mục lục sách in năm 2026); cu: kho đã có cùng chữ chủ đề
   (câu ôn của kho này mang đúng chữ chủ đề của kho đó). */
const MON = [
  ["tin", "Tin học", "9-tin.js", [["Công cụ xác thực dữ liệu", "9a", "Sử dụng công cụ xác thực dữ liệu"], ["Hàm COUNTIF", "10a", "Sử dụng hàm COUNTIF"],
    ["Hàm SUMIF", "11a", "Sử dụng hàm SUMIF"], ["Hàm IF", "12a", "Sử dụng hàm IF"],
    ["Hoàn thiện bảng tính quản lí tài chính gia đình", "13a", "Hoàn thiện bảng tính quản lí tài chính gia đình"],
    ["Giải quyết vấn đề", "14", "Giải quyết vấn đề"], ["Bài toán tin học", "15", "Bài toán tin học"],
    ["Lập chương trình máy tính", "16", "Thực hành: Lập chương trình máy tính"], ["Tin học và thế giới nghề nghiệp", "17", "Tin học và thế giới nghề nghiệp"]],
    ["tin9-gk2-de1", "tin9-gk2-de2"]],
  ["congnghe", "Công nghệ", "9-congnghe.js", [["Thiết bị đóng cắt và lấy điện trong gia đình", "1", "Thiết bị đóng cắt và lấy điện trong gia đình"],
    ["Dụng cụ đo điện cơ bản", "2", "Dụng cụ đo điện cơ bản"], ["Thiết kế mạng điện trong nhà", "3", "Thiết kế mạng điện trong nhà"],
    ["Vật liệu, thiết bị và dụng cụ lắp đặt mạng điện", "4", "Vật liệu, thiết bị và dụng cụ dùng cho lắp đặt mạng điện trong nhà"],
    ["Tính toán chi phí mạng điện trong nhà", "5", "Tính toán chi phí mạng điện trong nhà"], ["Lắp đặt mạng điện trong nhà", "6", "Thực hành: Lắp đặt mạng điện trong nhà"],
    ["Ngành nghề liên quan đến lắp đặt mạng điện", "7", "Một số ngành nghề liên quan đến lắp đặt mạng điện trong nhà"],
    ["Thị trường lao động kĩ thuật, công nghệ", "3", "Thị trường lao động kĩ thuật, công nghệ tại Việt Nam"], ["Quy trình lựa chọn nghề nghiệp", "4", "Quy trình lựa chọn nghề nghiệp"]],
    ["congnghe9-gk2-de1", "congnghe9-gk2-de2", "congnghe9-ck1-de1", "congnghe9-ck1-de2"]]
].map(([m, ten, file, chuDe, cu]) => {
  const re = new RegExp(`^${m}9-ck2-`), p = BANKS.find((b) => b.pool && re.test(b.id));
  assert.ok(p, `thiếu đề ngẫu nhiên ${m}9-ck2`);
  assert.equal(p.pool.from.length, 2, p.id + ": đề ngẫu nhiên lấy câu của hai đề cố định");
  const S = { m, ten, file, chuDe, pool: p.id, de1: p.pool.from[0], de2: p.pool.from[1], kho: p.questions, cu };
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
  cu.forEach((id) => assert.ok(bank(id), "thiếu kho cũ " + id));
  return S;
});
const [T, C] = MON;
const kho = MON.flatMap((S) => S.kho);
{ // kì thi cuối năm lớp 9 gắn đủ sáu mã, phạm vi ghi Tin học, Công nghệ
  const ctxL = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctxL);
  const ev = ctxL.window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck2-l9");
  MON.forEach((S) => [S.de1, S.de2, S.pool].forEach((id) => assert.ok(ev.banks.includes(id), "ck2-l9 chưa gắn " + id)));
  assert.ok(/Tin học: Bài 9a–13a và Bài 14–17, trọng tâm Bài 14–17/.test(ev.scope) && /Công nghệ: Lắp đặt mạng điện trong nhà, Bài 1–7, trọng tâm Bài 5–7/.test(ev.scope), "phạm vi của ck2-l9 ghi Tin học, Công nghệ");
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

// xác thực dữ liệu: chép từ tests/tin-congnghe9-gk2.js, thêm Text length ở dưới

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


/* ---------- sơ đồ khối (Tin học 9, Hình 14.3, 15.4) → { nut: [{kind, chu, ra}], batDau, muiTen } ----------
   Bắt đầu, Kết thúc: hình bầu dục tô moc-soft; Nhập, Xuất: hình bình hành lệch 10 tô ioe-soft; bước xử lí: hình chữ nhật tô sun-soft;
   điều kiện: hình thoi tô ok-soft. Mũi tên là polyline đi từ giữa một cạnh (đỉnh hình thoi) của hình này tới giữa một cạnh của hình
   khác, đầu mũi tên là tam giác tô ink ở đúng điểm cuối; hai đường ra của hình thoi có nhãn “đúng”, “sai” (chữ muted cỡ 13, gần đoạn
   đầu của đường, không đè lên hình nào, cách mọi đoạn mũi tên ít nhất 4). Chữ cỡ 14 nằm gọn trong hình (ước 7,7 mỗi kí tự). */
const rongChu = (t) => [...t].length * 7.7;
// chữ trong hình ghi “<”, “>”, “&”, ngoặc kép bằng thực thể (&lt;…): đọc lại thành kí tự
const giaiMa = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const textsGM = (svg) => texts(svg).map((t) => Object.assign(t, { t: giaiMa(t.t) }));
const docSoDoKhoi = (svg) => {
  daDoc.add(svg);
  assert.ok(svgRong(svg) <= 320, "sơ đồ khối rộng không quá 320");
  const nut = [];
  tags(svg, "ellipse").forEach((e) => { assert.equal(e.fill, "moc-soft", "hình bầu dục tô moc-soft"); const cx = num(e, "cx"), cy = num(e, "cy"), rx = num(e, "rx"), ry = num(e, "ry");
    nut.push({ kind: "se", cx, cy, w: 2 * rx, h: 2 * ry, trong: ([x, y]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1, cong: [[cx, cy - ry], [cx, cy + ry], [cx - rx, cy], [cx + rx, cy]] }); });
  tags(svg, "rect").forEach((r) => { assert.equal(r.fill, "sun-soft", "bước xử lí là hình chữ nhật tô sun-soft"); const x = num(r, "x"), y = num(r, "y"), w = num(r, "width"), h = num(r, "height");
    assert.ok(x >= 0 && x + w <= svgRong(svg), "hình chữ nhật nằm trong khung");
    nut.push({ kind: "p", cx: x + w / 2, cy: y + h / 2, w, h, trong: ([a, b]) => a >= x && a <= x + w && b >= y && b <= y + h, cong: [[x + w / 2, y], [x + w / 2, y + h], [x, y + h / 2], [x + w, y + h / 2]] }); });
  const dau = [];
  tags(svg, "polygon").forEach((g) => {
    const p = pts(g.points);
    if (g.fill === "ink") { assert.equal(p.length, 3, "đầu mũi tên là tam giác"); dau.push(p[0]); return; }
    assert.equal(p.length, 4);
    if (g.fill === "ioe-soft") { // hình bình hành lệch 10: (x+10,y) (x+w,y) (x+w−10,y+h) (x,y+h)
      const x = p[3][0], y = p[0][1], w = p[1][0] - x, h = p[2][1] - y;
      assert.ok(close(p[0][0], x + 10) && close(p[1][1], y) && close(p[2][0], x + w - 10) && close(p[3][1], y + h), "hình bình hành đúng dạng");
      assert.ok(x >= 0 && x + w <= svgRong(svg), "hình bình hành nằm trong khung");
      nut.push({ kind: "io", cx: x + w / 2, cy: y + h / 2, w, h, trong: ([a, b]) => a >= x && a <= x + w && b >= y && b <= y + h, cong: [[x + w / 2, y], [x + w / 2, y + h], [x + 5, y + h / 2], [x + w - 5, y + h / 2]] });
    } else if (g.fill === "ok-soft") { // hình thoi: trên, phải, dưới, trái
      const [t, r, b, l] = p;
      assert.ok(close(t[0], b[0]) && close(l[1], r[1]) && close(t[0] - l[0], r[0] - t[0]) && close(l[1] - t[1], b[1] - l[1]), "hình thoi đúng dạng");
      const cx = t[0], cy = l[1], w = r[0] - l[0], h = b[1] - t[1];
      nut.push({ kind: "d", cx, cy, w, h, trong: ([a, c]) => Math.abs(a - cx) / (w / 2) + Math.abs(c - cy) / (h / 2) <= 1, cong: [t, b, l, r] });
    } else assert.fail("màu hình lạ: " + g.fill);
  });
  const nhan = [];
  textsGM(svg).forEach((t) => {
    if (t.fill === "muted") { assert.ok(["đúng", "sai"].includes(t.t) && t["font-size"] === "13", "nhãn của đường ra là đúng hoặc sai, cỡ 13: " + t.t); nhan.push({ t: t.t, x: +t.x, y: +t.y }); return; }
    assert.ok(+t["font-size"] >= 14 && t["text-anchor"] === "middle", "chữ trong hình cỡ 14, căn giữa");
    const n = nut.filter((k) => k.trong([+t.x, +t.y - 5]));
    assert.equal(n.length, 1, "chữ nằm trong đúng một hình: " + t.t);
    assert.ok(close(+t.x, n[0].cx), "chữ ở giữa hình: " + t.t);
    (n[0].dong = n[0].dong || []).push({ y: +t.y, t: t.t });
  });
  nut.forEach((n) => {
    assert.ok(n.dong && n.dong.length, "hình nào cũng có chữ");
    n.chu = n.dong.sort((a, b) => a.y - b.y).map((d) => d.t).join(" ");
    const cho = n.kind === "d" ? n.w * (1 - 18 / n.h) - 6 : n.kind === "io" ? n.w - 26 : n.kind === "se" ? n.w - 16 : n.w - 10; // chữ nằm gọn trong hình
    n.dong.forEach((d) => assert.ok(rongChu(d.t) <= cho, `chữ “${d.t}” rộng quá hình`));
    n.ra = [];
  });
  const timNut = (p) => { const n = nut.filter((k) => k.cong.some((c) => same(c, p))); assert.equal(n.length, 1, "đầu, cuối mũi tên ở giữa cạnh của đúng một hình: " + p); return n[0]; };
  const muiTen = tags(svg, "polyline").map((l) => {
    const p = pts(l.points), tu = timNut(p[0]), toi = timNut(p[p.length - 1]);
    assert.notEqual(tu, toi);
    assert.ok(dau.some((d) => same(d, p[p.length - 1])), "có đầu mũi tên ở cuối đường");
    p.slice(1).forEach((q, i) => assert.ok(close(q[0], p[i][0]) || close(q[1], p[i][1]), "mũi tên chỉ gồm đoạn ngang, đoạn dọc"));
    p.forEach((q) => assert.ok(q[0] >= 0 && q[0] <= svgRong(svg), "mũi tên nằm trong khung"));
    const m = { tu, toi, p };
    tu.ra.push(m);
    return m;
  });
  assert.equal(dau.length, muiTen.length, "mỗi mũi tên một đầu mũi tên");
  // nhãn đúng, sai: khung chữ (cỡ 13, rộng khoảng 7,4 mỗi kí tự, cao từ y − 12 đến y + 3) không đè lên hình nào, cách mọi đoạn mũi tên
  // ít nhất 4 và cách đoạn đầu của đúng một đường ra của hình thoi dưới 12: đó là nhãn của đường ra này
  const cach = (k, a, b) => Math.hypot(Math.max(0, Math.min(a[0], b[0]) - k[2], k[0] - Math.max(a[0], b[0])), Math.max(0, Math.min(a[1], b[1]) - k[3], k[1] - Math.max(a[1], b[1])));
  nhan.forEach((n) => {
    const w = [...n.t].length * 7.4, k = [n.x - w / 2, n.y - 12, n.x + w / 2, n.y + 3], o = `nhãn ${n.t} ở (${n.x}, ${n.y})`;
    const diem = []; for (let i = 0; i <= 4; i++) for (let j = 0; j <= 2; j++) diem.push([k[0] + (i * w) / 4, k[1] + (j * 15) / 2]);
    assert.ok(!nut.some((h) => diem.some((d) => h.trong(d))), o + " đè lên một hình");
    muiTen.forEach((m) => m.p.slice(1).forEach((b, i) => assert.ok(cach(k, m.p[i], b) >= 4, o + " chạm một mũi tên")));
    const m = muiTen.filter((h) => h.tu.kind === "d" && cach(k, h.p[0], h.p[1]) < 12);
    assert.equal(m.length, 1, o + " gần đúng một đường ra của hình thoi"); assert.ok(!m[0].nhan); m[0].nhan = n.t;
  });
  nut.forEach((n) => {
    if (n.kind === "d") assert.deepEqual(n.ra.map((m) => m.nhan).sort(), ["sai", "đúng"], "hình thoi có hai đường ra đúng, sai");
    else if (n.chu === "Kết thúc") assert.equal(n.ra.length, 0);
    else assert.equal(n.ra.length, 1, "hình “" + n.chu + "” có đúng một đường ra");
  });
  const batDau = nut.filter((n) => n.chu === "Bắt đầu");
  assert.equal(batDau.length, 1); assert.equal(nut.filter((n) => n.chu === "Kết thúc").length, 1);
  assert.ok(nut.every((n) => (n.kind === "se") === ["Bắt đầu", "Kết thúc"].includes(n.chu)), "chỉ Bắt đầu, Kết thúc là hình bầu dục");
  assert.ok(nut.filter((n) => n.kind === "io").every((n) => /^(Nhập|Xuất) /.test(n.chu)), "hình bình hành chỉ để nhập hoặc xuất");
  assert.ok(!muiTen.some((m) => m.toi === batDau[0]), "không mũi tên nào đi vào Bắt đầu");
  return { nut, batDau: batDau[0], muiTen };
};
/* biểu thức của sơ đồ khối, chương trình Scratch: số (ngăn hàng nghìn, dấu phẩy thập phân), tên biến, + − × : và ngoặc */
const TEN = "[\\p{L}_][\\p{L}\\p{N}_]*";
const bieuThuc = (bt, env) => {
  let s = bt.replace(/(\d) (?=\d{3}\b)/g, "$1").replace(/×/g, "*").replace(/:/g, "/").replace(/−/g, "-").replace(/(\d),(\d)/g, "$1.$2");
  s = s.replace(new RegExp(TEN, "gu"), (v) => { assert.ok(v in env, "biến chưa có giá trị: " + v); return "(" + env[v] + ")"; });
  assert.ok(/^[\d+\-*/(). ]+$/.test(s), "biểu thức lạ: " + bt);
  return Function("return (" + s + ")")();
};
const SS = { "<": (a, b) => a < b, ">": (a, b) => a > b, "≤": (a, b) => a <= b, "≥": (a, b) => a >= b, "=": (a, b) => a === b, "≠": (a, b) => a !== b };
const dungBT = (dk, env) => { const m = /^(.+?) (<|>|≤|≥|=|≠) (.+)$/.exec(dk); assert.ok(m, "điều kiện lạ: " + dk); return SS[m[2]](bieuThuc(m[1], env), bieuThuc(m[3], env)); };
/* chạy sơ đồ khối: vao là giá trị lần lượt cho các biến của bước nhập; thay: chữ thay cho ô “?”; trả { ra: các giá trị xuất, dem: số lần
   đi qua mỗi hình, lapMai } */
const chayBT = (G, vao, thay) => {
  const env = {}, ra = [], dem = new Map(), q = [].concat(vao || []);
  let n = G.batDau;
  for (let buoc = 0; buoc < 2000; buoc++) {
    dem.set(n, (dem.get(n) || 0) + 1);
    if (n.chu === "Kết thúc") return { ra, dem, env, lapMai: false };
    let tiep = n.ra[0];
    if (n.kind === "io" && /^Nhập /.test(n.chu)) n.chu.slice(5).split(", ").forEach((v) => { assert.ok(new RegExp("^" + TEN + "$", "u").test(v), "bước nhập lạ: " + n.chu); assert.ok(q.length, "thiếu giá trị nhập cho " + v); env[v] = q.shift(); });
    else if (n.kind === "io") { const m = new RegExp("^Xuất (?:“(.*)”|(" + TEN + "))$", "u").exec(n.chu); assert.ok(m, "bước xuất lạ: " + n.chu); ra.push(m[1] != null ? m[1] : env[m[2]]); }
    else if (n.kind === "p") {
      const chu = n.chu === "?" ? thay : n.chu;
      assert.ok(chu, "ô “?” chưa có bước thay");
      chu.split(new RegExp(", (?=" + TEN + " ←)", "u")).forEach((g) => { const [v, bt] = g.split(" ← "); assert.ok(bt !== undefined, "phép gán lạ: " + g); env[v.trim()] = bieuThuc(bt, env); });
    } else if (n.kind === "d") tiep = n.ra.find((m) => m.nhan === (dungBT(n.chu, env) ? "đúng" : "sai"));
    n = tiep.toi;
  }
  return { ra, dem, env, lapMai: true };
};
const nutChu = (G, chu) => { const n = G.nut.filter((k) => k.chu === chu); assert.equal(n.length, 1, "có đúng một hình “" + chu + "”"); return n[0]; };

/* ---------- chương trình Scratch (tên khối như Hình 16.1, 16.2 của sách Tin học 9) → danh sách khối { t, body?, els? } ----------
   Mỗi khối một hình chữ nhật bo góc cao 28 tô theo nhóm lệnh, một dòng chữ cỡ 14 cách lề trái 10; khối trong khối lặp, khối nếu lùi vào
   18; cuối khối lặp, khối nếu có thanh đóng cao 10 không chữ; “nếu không thì” cùng cột với “nếu”; thân chữ C (hình chữ nhật không viền,
   rộng 17) nối từ ngay dưới khối lặp, khối nếu (hay “nếu không thì”) tới thanh dưới cùng cột. */
const NHOM = [[/^khi bấm vào lá cờ xanh$/, "sun-soft"], [/^hỏi “.*” và đợi$/, "ioe-soft"], [new RegExp("^đặt " + TEN + " thành .+$", "u"), "ok-soft"],
  [/^nói .+ trong \d+ giây$/, "moc-soft"], [/^(lặp lại \d+ lần|lặp lại cho đến khi .+|nếu .+ thì|nếu không thì|dừng lại tất cả)$/, "bad-soft"]];
const KHOI_C = /^(lặp lại|nếu (?!không thì))/;
const docScratch = (svg) => {
  daDoc.add(svg);
  assert.ok(svgRong(svg) <= 320, "chương trình rộng không quá 320");
  const TX = textsGM(svg), R = tags(svg, "rect"), than = R.filter((r) => r.stroke === "none");
  const hang = R.filter((r) => r.stroke !== "none").map((r) => {
    const x = num(r, "x"), y = num(r, "y"), w = num(r, "width"), h = num(r, "height"), chu = TX.filter((t) => +t.x > x && +t.x < x + w && +t.y > y && +t.y < y + h);
    assert.ok(chu.length <= 1, "mỗi khối một dòng chữ");
    const t = chu.length ? chu[0].t : null;
    if (t) {
      const g = NHOM.find(([re]) => re.test(t)); assert.ok(g, "khối lạ: " + t); assert.equal(r.fill, g[1], "màu của khối “" + t + "”");
      assert.ok(h === 28 && +chu[0].x === x + 10 && +chu[0].y === y + 19 && chu[0]["font-size"] === "14", "khối cao 28, chữ cỡ 14 cách lề 10: " + t);
      assert.ok(rongChu(t) + 10 <= w, `chữ “${t}” rộng quá khối`); assert.ok(x + w <= 316, "khối nằm trong khung: " + t);
    } else assert.ok(h === 10 && r.fill === "bad-soft", "khối không chữ là thanh đóng");
    return { x, y, h, t };
  }).sort((a, b) => a.y - b.y);
  hang.slice(1).forEach((h, i) => assert.ok(h.y >= hang[i].y + hang[i].h, "các khối không chồng lên nhau"));
  const coThan = hang.filter((h) => h.t && (KHOI_C.test(h.t) || h.t === "nếu không thì"));
  assert.equal(than.length, coThan.length, "mỗi khối lặp, khối nếu, “nếu không thì” có một thân chữ C");
  than.forEach((r) => {
    const x = num(r, "x") - 1, y1 = num(r, "y") + 3, y2 = y1 + num(r, "height") - 6;
    assert.ok(r.fill === "bad-soft" && num(r, "width") === 17, "thân chữ C cùng màu khối điều khiển, rộng 17");
    assert.ok(coThan.some((h) => h.x === x && h.y + h.h === y1), "thân chữ C bắt đầu ngay dưới khối lặp, khối nếu");
    assert.ok(hang.some((h) => h.x === x && h.y === y2 && (!h.t || h.t === "nếu không thì")), "thân chữ C kết thúc ở thanh dưới cùng cột");
  });
  assert.equal(TX.length, hang.filter((h) => h.t).length, "chữ nào cũng nằm trong một khối");
  const x0 = Math.min(...hang.map((h) => h.x));
  hang.forEach((h) => { h.d = (h.x - x0) / 18; assert.ok(Number.isInteger(h.d), "khối lùi vào bội của 18"); });
  let i = 0;
  const doc = (d) => {
    const list = [];
    while (i < hang.length && hang[i].d >= d) {
      const h = hang[i];
      assert.equal(h.d, d, "khối lùi vào sai chỗ: " + h.t);
      if (!h.t || h.t === "nếu không thì") break;
      i++;
      const b = { t: h.t };
      if (KHOI_C.test(h.t)) {
        b.body = doc(d + 1); assert.ok(b.body.length, "khối " + h.t + " có khối bên trong");
        if (hang[i] && hang[i].t === "nếu không thì") { assert.ok(/^nếu/.test(h.t), "“nếu không thì” đi sau khối nếu"); i++; b.els = doc(d + 1); assert.ok(b.els.length); }
        assert.ok(hang[i] && !hang[i].t && hang[i].d === d, "khối " + h.t + " có thanh đóng"); i++;
      }
      list.push(b);
    }
    return list;
  };
  const prog = doc(0);
  assert.equal(i, hang.length, "đọc hết các khối");
  assert.equal(prog[0].t, "khi bấm vào lá cờ xanh", "chương trình bắt đầu bằng khối khi bấm vào lá cờ xanh");
  return prog;
};
/* chạy chương trình: traLoi là các giá trị gõ vào lần lượt; trả { noi: các giá trị nói, hoi: số lần hỏi, dem: số lần chạy mỗi khối,
   lapMai (quá 10 000 bước) } */
const chayScratch = (prog, traLoi) => {
  const env = {}, noi = [], dem = new Map(), q = [].concat(traLoi || []);
  let tra = "", buoc = 0, hoi = 0;
  const gt = (bt) => { const m = /^“(.*)”$/.exec(bt); if (m) return m[1]; if (bt === "trả lời") return tra; return bieuThuc(bt.replace(/trả lời/g, "tra_loi"), Object.assign({ tra_loi: tra }, env)); };
  const dk = (s) => {
    if (/ hoặc /.test(s)) return s.split(" hoặc ").some(dk);
    if (/ và /.test(s)) return s.split(" và ").every(dk);
    const m = /^(.+?) (<|>|=) (.+)$/.exec(s); assert.ok(m, "điều kiện lạ: " + s);
    const a = gt(m[1]), b = gt(m[3]);
    return { "<": (x, y) => x < y, ">": (x, y) => x > y, "=": (x, y) => x === y }[m[2]](a, b);
  };
  const DUNG = {};
  const run = (list) => list.forEach((b) => {
    if (++buoc > 10000) throw DUNG;
    dem.set(b, (dem.get(b) || 0) + 1);
    let m;
    if (/^hỏi “.*” và đợi$/.test(b.t)) { assert.ok(q.length, "thiếu câu trả lời gõ vào"); const v = q.shift(); tra = /^-?\d+$/.test(String(v)) ? +v : v; hoi++; }
    else if ((m = new RegExp("^đặt (" + TEN + ") thành (.+)$", "u").exec(b.t))) env[m[1]] = gt(m[2]);
    else if ((m = /^nói (.+) trong \d+ giây$/.exec(b.t))) noi.push(gt(m[1]));
    else if ((m = /^lặp lại (\d+) lần$/.exec(b.t))) for (let k = 0; k < +m[1]; k++) run(b.body);
    else if ((m = /^lặp lại cho đến khi (.+)$/.exec(b.t))) { while (!dk(m[1])) { if (++buoc > 10000) throw DUNG; run(b.body); } }
    else if ((m = /^nếu (.+) thì$/.exec(b.t))) { if (dk(m[1])) run(b.body); else if (b.els) run(b.els); }
    else assert.ok(/^khi bấm vào/.test(b.t), "khối chưa chạy được: " + b.t);
  });
  try { run(prog); } catch (e) { if (e === DUNG) return { noi, hoi, dem, lapMai: true }; throw e; }
  return { noi, hoi, dem, lapMai: false };
};
const khoiChu = (prog, t) => { const r = []; (function tim(l) { l.forEach((b) => { if (b.t === t) r.push(b); if (b.body) tim(b.body); if (b.els) tim(b.els); }); })(prog); return r; };
const boKhoi = (prog, b0) => JSON.parse(JSON.stringify(prog, (k, v) => (Array.isArray(v) ? v.filter((b) => b !== b0) : v))); // bỏ một khối

/* ---------- bảng chi phí: đường kẻ mảnh tô line kẻ hết bảng, các hàng cao bằng nhau, hàng 1 tô bg chữ đậm; ô chữ căn trái cách lề 5, ô số
   căn phải cách lề 5 (text-anchor end), chữ vừa ô → [[chữ hoặc số từng ô theo hàng]] (“120 000” đọc thành 120000) ---------- */
const docBangTien = (svg) => {
  daDoc.add(svg);
  assert.ok(svgRong(svg) <= 320, "bảng rộng không quá 320");
  const L = tags(svg, "line"), TX = textsGM(svg);
  assert.ok(L.every((l) => l.stroke === "line" && l["stroke-width"] === "1"), "bảng: đường kẻ mảnh tô line");
  const ngang = L.filter((l) => num(l, "y1") === num(l, "y2")), doc = L.filter((l) => num(l, "x1") === num(l, "x2"));
  assert.equal(ngang.length + doc.length, L.length, "bảng: đường kẻ nằm ngang hoặc thẳng đứng");
  const ys = ngang.map((l) => num(l, "y1")).sort((a, b) => a - b), xs = doc.map((l) => num(l, "x1")).sort((a, b) => a - b);
  ngang.forEach((l) => assert.ok(num(l, "x1") === xs[0] && num(l, "x2") === xs[xs.length - 1], "đường ngang kẻ hết bề rộng"));
  doc.forEach((l) => assert.ok(num(l, "y1") === ys[0] && num(l, "y2") === ys[ys.length - 1], "đường dọc kẻ hết chiều cao"));
  ys.slice(1).forEach((y, i) => assert.equal(y - ys[i], ys[1] - ys[0], "các hàng cao bằng nhau"));
  assert.ok(tags(svg, "rect").some((r) => r.fill === "bg" && num(r, "y") === ys[0] && num(r, "height") === ys[1] - ys[0]), "hàng tiêu đề tô bg");
  TX.forEach(coChu);
  const o = Array.from({ length: ys.length - 1 }, () => Array(xs.length - 1).fill(null));
  TX.forEach((t) => {
    const c = xs.findIndex((x, i) => i && +t.x > xs[i - 1] && +t.x <= x) - 1, r = ys.findIndex((y, i) => i && +t.y > ys[i - 1] && +t.y < y) - 1;
    assert.ok(c >= 0 && r >= 0 && o[r][c] === null, "chữ nằm trong một ô, mỗi ô một chữ: " + t.t);
    const so = t["text-anchor"] === "end";
    assert.ok(so ? close(+t.x, xs[c + 1] - 5) : !t["text-anchor"] && close(+t.x, xs[c] + 5), "ô chữ căn trái, ô số căn phải: " + t.t);
    assert.ok(rong(t) <= xs[c + 1] - xs[c] - 8, "chữ vừa ô: " + t.t);
    assert.equal(t["font-weight"] === "700", r === 0, "hàng tiêu đề chữ đậm, hàng khác chữ thường: " + t.t);
    if (so) { assert.ok(/^\d{1,3}( \d{3})*$/.test(t.t), "ô số: " + t.t); o[r][c] = val(t.t); } else o[r][c] = t.t;
  });
  assert.ok(o.every((h) => h.every((v) => v !== null)), "ô nào cũng có chữ");
  return o;
};
const soLuongO = (s) => { const m = /^(\d+) (m|cái)$/.exec(s); assert.ok(m, "ô số lượng ghi số và đơn vị: " + s); return +m[1]; };

/* ---------- Hình 17.1 của sách Tin học 9: nhóm nghề, hướng và các nghề của mỗi nhóm ---------- */
const NHOM_NGHE = {
  "Nhà chuyên môn về phân tích và phát triển phần mềm": ["Khoa học máy tính", ["Nhà lập trình các ứng dụng", "Nhà phát triển web và truyền thông đa phương tiện", "Nhà phân tích và thiết kế hệ thống", "Nhà phát triển phần mềm"]],
  "Nhà chuyên môn về cơ sở dữ liệu và mạng máy tính": ["Khoa học máy tính", ["Nhà thiết kế cơ sở dữ liệu", "Nhà quản trị cơ sở dữ liệu", "Nhà khoa học dữ liệu", "Nhà bảo mật (máy tính)", "Nhà quản trị hệ thống"]],
  "Nhà thiết kế đồ hoạ và truyền thông đa phương tiện": ["Tin học ứng dụng", ["Nhà thiết kế trò chơi máy tính", "Nghệ sĩ kĩ thuật số", "Nhà thiết kế đồ hoạ", "Nhà thiết kế đa phương tiện", "Nhà thiết kế trang web"]]
};
const nhomCua = (nghe) => { const g = Object.keys(NHOM_NGHE).filter((k) => NHOM_NGHE[k][1].some((x) => x.toLowerCase() === nghe.toLowerCase())); assert.equal(g.length, 1, "nghề có trong Hình 17.1: " + nghe); return g[0]; };
/* ---------- Bảng 7.1 của sách Công nghệ 9 (Lắp đặt mạng điện trong nhà): điểm mỗi cột, thang xếp loại ---------- */
const DIEM_71 = { "Phù hợp hoàn toàn": 4, "Phù hợp phần lớn": 3, "Phù hợp một phần": 2, "Hoàn toàn không phù hợp": 1 };
const XEP_71 = (d) => (d <= 24 ? "Hoàn toàn không phù hợp" : d <= 35 ? "Phù hợp một phần" : d <= 46 ? "Phù hợp phần lớn" : "Phù hợp hoàn toàn");
const diem71 = (s) => { const ds = [...s.matchAll(/(\d+) tiêu chí(?: ở cột)? «([^»]+)»/g)]; assert.ok(ds.length >= 2, "đọc được số tiêu chí từng cột"); const n = sum(ds.map((m) => +m[1]));
  assert.equal(n, 14, "đủ 14 tiêu chí của Bảng 7.1"); return sum(ds.map((m) => +m[1] * DIEM_71[m[2]])); };

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

// xác thực dữ liệu, thêm Text length (độ dài chữ) và Whole number equal to … (Value)
const thietLapXT = (s) => { const g = (k) => { const m = s.match(new RegExp(k + ": (.+?)(?=;|$)")); return m && m[1].trim(); };
  return { allow: g("Allow"), data: g("Data"), min: g("Minimum"), max: g("Maximum"), len: g("Length"), value: g("Value") }; };
const nhanXT = (tl, v) => {
  if (tl.allow === "Text length") {
    const L = [...String(v)].length, a = tl.min && val(tl.min), b = tl.max && val(tl.max);
    return { "equal to": L === val(tl.len), "less than": L < b, "greater than": L > a, between: L >= a && L <= b }[tl.data];
  }
  if (tl.data === "equal to") return typeof v === "number" && (tl.allow !== "Whole number" || Number.isInteger(v)) && v === val(tl.value);
  return nhanGiaTri(tl, v);
};
// mạch đèn cầu thang (hai công tắc ba cực): đèn sáng khi hai công tắc ở cùng phía; mỗi lần gạt một công tắc thì đèn đổi trạng thái
const denCauThang = (a, b) => a === b;

const CHECKS = [
  /* ---------- Tin học, Đề 1 ---------- */
  { id: T.de1, has: "Muốn các ô này chỉ nhận số từ", right: (q) => {
    const [a, b] = so(new RegExp(`chỉ nhận số từ ${SO} đến ${SO},`), q.q), thu = [1.58, a, b, 1.45, a - 0.1, b + 0.05, 15, 0.5];
    const dat = q.o.filter((o) => { const tl = thietLapXT(o); return thu.every((v) => nhanXT(tl, v) === (v >= a && v <= b)); });
    assert.equal(dat.length, 1, "đúng một thiết lập nhận mọi chiều cao trong khoảng, không nhận số ngoài khoảng"); return dat[0]; } },
  { id: T.de1, has: "Trong công thức =COUNTIF(C2:C40,", right: (q) => { // điều kiện ">=N" của COUNTIF: đếm cả ô bằng N
    const f = congThuc(q.q)[0], dk = ham(f)[1].slice(1, -1), [n] = so(/^>=(\d+)$/, dk), o = {}; [n - 1, n, n + 1, n, n - 3].forEach((v, i) => (o["C" + (i + 2)] = v));
    assert.equal(tinh(f, o), 3, `">=${n}" đếm cả ô bằng ${n}`); assert.ok(q.q.includes(`điều kiện "${dk}" có nghĩa`));
    const MO = { [`lớn hơn hoặc bằng ${n}`]: (v) => v >= n, [`lớn hơn ${n}`]: (v) => v > n, [`nhỏ hơn hoặc bằng ${n}`]: (v) => v <= n, [`bằng ${n}`]: (v) => v === n };
    return q.o.find((x) => { const k = Object.keys(MO).find((m) => x.endsWith(" " + m)); assert.ok(k, "lựa chọn lạ: " + x); return [n - 1, n, n + 1].every((v) => MO[k](v) === khop(v, dk)); }); } },
  { id: T.de1, has: "và hiện 4; ô H2 chứa", right: (q) => {
    const [g, h] = so(/và hiện (\d+); ô H2 chứa .+ và hiện (\d+)\./, q.q), f = congThuc(q.q);
    assert.ok(/^=COUNTIF\(B2:B30,"Photo"\)$/.test(f[0]) && /^=SUMIF\(B2:B30,"Photo",D2:D30\)$/.test(f[1]), "COUNTIF đếm, SUMIF cộng cùng một điều kiện");
    const o = {}; [["Photo", 20], ["Nước", 50], ["Photo", 35], ["Photo", 40], ["Bút", 15], ["Photo", 25]].forEach(([k, t], i) => { o["B" + (i + 2)] = k; o["D" + (i + 2)] = t; });
    assert.ok(tinh(f[0], o) === g && tinh(f[1], o) === h, "ví dụ khớp: 4 lần, 120 nghìn đồng");
    return `Quỹ lớp đã chi cho photo ${g} lần, tổng cộng ${h} nghìn đồng`; } },
  { id: T.de1, has: "Kí hiệu <> trong công thức", right: (q) => {
    const f = congThuc(q.q)[0];
    assert.ok(tinh(f, { B2: "Chưa nộp" }) === "Nhắc nộp bài" && tinh(f, { B2: "Đã nộp" }) === "" && tinh(f, { B2: "" }) === "Nhắc nộp bài", "<> là “khác”");
    return "Khác (không bằng)"; } },
  { id: T.de1, has: "số trang sách mỗi bạn đọc trong hai tháng", right: (q) => {
    const b = docTrang(q.svg), f = congThuc(q.q)[0];
    assert.ok(/sao chép xuống D7/.test(q.q) && f.startsWith("=IF(C2>B2,"));
    const ds = [2, 3, 4, 5, 6, 7].filter((r) => tinh(chep(f, r - 2, 0), b.o) === "Tăng");
    coLoiGiai(q, ...ds.map((r) => `${b.o["A" + r]} (${vn(b.o["C" + r])} > ${vn(b.o["B" + r])})`));
    const bang = [2, 3, 4, 5, 6, 7].filter((r) => b.o["B" + r] === b.o["C" + r]);
    assert.ok(bang.length === 1 && q.x.includes(b.o["A" + bang[0]]), "có một bạn đọc bằng nhau hai tháng (thử phép so sánh >), lời giải nêu bạn đó");
    return ds.length; } },
  { id: T.de1, has: "a = 17, b = 22", right: (q) => {
    const [a, b] = so(/a = (\d+), b = (\d+)\./, q.q), [them] = so(/cộng thêm (\d+) phút cho đường A/, q.q), A = /trời mưa/.test(q.q) ? a + them : a;
    return A < b ? `Đường A, ${A} phút` : `Đường B, ${b} phút`; } },
  { id: T.de1, has: "có đầu vào và đầu ra là gì", right: (q) => {
    const G = docSoDoKhoi(q.svg);
    [1, 2, 3, 4, 5, 6, 10].forEach((n) => { const r = chayBT(G, [n]); assert.ok(!r.lapMai && r.ra.length === 1 && r.ra[0] === (n * (n + 1)) / 2, "thuật toán xuất tổng 1 + … + n"); });
    assert.notEqual(chayBT(G, [4]).ra[0], 24, "không phải tích");
    assert.ok(/n = 4 thì xuất 1 \+ 2 \+ 3 \+ 4 = 10/.test(q.x));
    return q.o.find((o) => /đầu ra là tổng 1 \+ 2 \+ … \+ n$/.test(o)); } },
  { id: T.de1, has: "Bài toán tính tiền nước", right: (q) => {
    const [m1, g1, g2] = so(/không quá (\d+) m³ thì mỗi m³ giá (\d+) nghìn đồng; phần vượt quá \d+ m³ thì mỗi m³ giá (\d+) nghìn/, q.q);
    const tien = (v) => Math.min(v, m1) * g1 + Math.max(0, v - m1) * g2, [v, t] = so(/dùng (\d+) m³ nước thì phải trả (\d+) nghìn/, q.o[3]);
    coLoiGiai(q, vn(tien(v)));
    assert.ok(/^Đầu vào là số m³ nước hộ đó đã dùng\.$/.test(q.o[0]) && /^Đầu ra là giá tiền của mỗi m³ nước\.$/.test(q.o[1]) && /cấu trúc rẽ nhánh\.$/.test(q.o[2]), "ba ý đầu: đầu vào, đầu ra, cấu trúc rẽ nhánh (giá đổi khi quá ngưỡng)");
    assert.ok(tien(v) !== v * g1 && tien(v) !== v * g2, "hộ dùng quá ngưỡng: phải tách hai mức giá");
    return [true, false, true, tien(v) === t]; } },
  { id: T.de1, has: "Một bãi gửi xe tính phí", right: (q) => {
    const G = docSoDoKhoi(q.svg), [t] = so(/Xe gửi (\d+) giờ/, q.q), r = chayBT(G, [t]);
    assert.deepEqual([1, 2].map((x) => chayBT(G, [x]).ra[0]), [5, 5], "hai giờ đầu 5 nghìn đồng"); assert.equal(chayBT(G, [3]).ra[0], 8, "mỗi giờ sau thêm 3 nghìn đồng");
    assert.equal(nutChu(G, "t ≤ 2").ra.find((m) => m.nhan === "đúng").toi.chu, "p ← 5");
    return r.ra[0]; } },
  { id: T.de1, has: "Hà đọc một cuốn truyện", right: (q) => {
    const G = docSoDoKhoi(q.svg), r = chayBT(G, []);
    assert.ok(!r.lapMai && r.env.s === 100, "ngày cuối đọc tới đúng 100 trang");
    coLoiGiai(q, "10, 25, 45, 70, 100");
    return r.ra[0]; } },
  { id: T.de1, has: "cho biết tổng chi bằng bao nhiêu phần trăm tổng thu", right: (q) => {
    const dat = q.o.filter((f) => [[10, 8], [12, 15], [20, 5]].every(([thu, chi]) => close(tinh(f, { B3: thu, B4: chi }), chi / thu)));
    assert.equal(dat.length, 1, "đúng một công thức cho tỉ số tổng chi trên tổng thu"); coLoiGiai(q, "70%"); return dat[0]; } },
  { id: T.de1, has: "Hoà viết nhầm điều kiện", right: (q) => q.o.find((o) => { const d = val(o); return (d >= 8) !== (d > 8); }) },
  { id: T.de1, has: "(s, k là hai biến). Khi chương trình dừng", right: (q) => {
    const P = docScratch(q.svg), r = chayScratch(P, []);
    assert.ok(!r.lapMai && r.noi.length === 1, "nói một lần"); return r.noi[0]; } },
  { id: T.de1, has: "(dem là biến đếm)", right: (q) => {
    const P = docScratch(q.svg);
    const noi = (s) => { const r = chayScratch(P, s.split(", ").map(Number)); assert.ok(!r.lapMai); return r; };
    const [a, b, c] = q.o.slice(0, 3).map((o) => { const m = /^Gõ (?:lần lượt )?(.+?) (?:ngay lần đầu )?thì nhân vật nói (\d+)\.$/.exec(o); assert.ok(m, "ý: " + o); return noi(m[1]).noi[0] === +m[2]; });
    const kn = khoiChu(P, "nói dem trong 2 giây"); assert.equal(kn.length, 1);
    const d = [[12, 5, 30, 0], [0], [10, 11, 0], [3, 3, 3, 3, 0]].every((s) => chayScratch(P, s).dem.get(kn[0]) === 1);
    return [a, b, c, d]; } },
  { id: T.de1, has: "Nghề nào dưới đây thuộc nhóm", right: (q) => {
    const g = /thuộc nhóm (.+)\?$/.exec(q.q)[1].replace(/^n/, "N");
    q.o.slice(1).forEach((o) => assert.notEqual(nhomCua(o), g, "lựa chọn sai không thuộc nhóm đó"));
    return q.o.find((o) => nhomCua(o) === g); } },
  { id: T.de1, has: "nhóm nghề nào hợp với Phong nhất", right: (q) => { assert.deepEqual(q.o.slice().sort(), Object.keys(NHOM_NGHE).sort(), "ba lựa chọn là ba nhóm nghề của Hình 17.1"); return "Nhà thiết kế đồ hoạ và truyền thông đa phương tiện"; } },
  /* ---------- Tin học, Đề 2 ---------- */
  { id: T.de2, has: "không bạn nào chọn môn Cờ vua", right: (q) => {
    const o = {}; ["Bóng đá", "Cầu lông", "Bơi", "Cầu lông"].forEach((m, i) => (o["C" + (i + 2)] = m));
    assert.equal(tinh(congThuc(q.q)[0], o), 0); return "Số 0"; } },
  { id: T.de2, has: "=SUMIF(B2:B20,\"Sách*\",C2:C20) cộng những ô nào", right: (q) => {
    const o = {}; [["Sách giáo khoa", 12], ["Truyện tranh", 7], ["Sách truyện", 5], ["Vở mới", 20], ["sách tham khảo", 3]].forEach(([k, n], i) => { o["B" + (i + 2)] = k; o["C" + (i + 2)] = n; });
    assert.equal(tinh(congThuc(q.q)[0], o), 20, "cộng cột C của các hàng có chữ bắt đầu bằng Sách (không phân biệt hoa, thường)");
    return q.o.find((x) => /^Ô ở cột C cùng hàng với ô cột B có chữ bắt đầu bằng Sách$/.test(x)); } },
  { id: T.de2, has: "nhiệt độ cao nhất của sáu ngày", right: (q) => {
    const b = docTrang(q.svg), f = congThuc(q.q)[0], C = (r, o = b.o) => tinh(chep(f, r - 2, 0), o), H = [2, 3, 4, 5, 6, 7];
    assert.ok(H.every((r) => typeof b.o["B" + r] === "number") && b.o.B8 === undefined, "sáu ngày ở B2:B7");
    return q.o.map((y) => { let m;
      if ((m = y.match(/^Ô C(\d) hiện chữ (.+)\.$/))) return C(+m[1]) === m[2];
      if ((m = y.match(/^Có (\S+) ô ở vùng C2:C7 hiện chữ (.+)\.$/))) return H.filter((r) => C(r) === m[2]).length === soLuong(m[1]);
      if ((m = y.match(/^Nếu sửa ô B(\d) thành (\d+) thì ô C(\d) hiện chữ (.+)\.$/))) { assert.equal(m[1], m[3]); return C(+m[3], Object.assign({}, b.o, { ["B" + m[1]]: +m[2] })) === m[4]; }
      return assert.fail("ý chưa đọc được: " + y); }); } },
  { id: T.de2, has: "muốn ô B5 hiện “Thâm hụt”", right: (q) => {
    const thu = [[500, 700], [700, 500], [600, 600]], can = (b3, b4) => (b4 > b3 ? "Thâm hụt" : "Cân đối");
    const dat = q.o.filter((f) => thu.every(([b3, b4]) => tinh(f, { B3: b3, B4: b4 }) === can(b3, b4)));
    assert.equal(dat.length, 1, "đúng một công thức cho kết quả đúng với mọi trường hợp (cả thu bằng chi)"); return dat[0]; } },
  { id: T.de2, has: "lệnh rút r nghìn đồng", right: (q) => {
    const G = docSoDoKhoi(q.svg);
    const dat = q.o.filter((o) => { const a = chayBT(G, [500, 200], o).ra, b = chayBT(G, [100, 200], o).ra; return a.length === 1 && a[0] === 300 && b.length === 1 && b[0] === "Không đủ tiền"; });
    assert.equal(dat.length, 1, "đúng một bước làm thuật toán xuất số tiền còn lại"); return dat[0]; } },
  { id: T.de2, has: "Bể nước có V lít", right: (q) => {
    const G = docSoDoKhoi(q.svg), dk = nutChu(G, "V ≥ 45");
    return q.o.map((o) => {
      let m = /^Nhập V = (\d+) thì thuật toán xuất (\d+)\.$/.exec(o);
      if (m) { const r = chayBT(G, [+m[1]]); assert.ok(!r.lapMai); return r.ra[0] === +m[2]; }
      m = /^Nhập V = (\d+) thì hình thoi được kiểm tra (\d+) lần\.$/.exec(o); assert.ok(m, "ý: " + o);
      return chayBT(G, [+m[1]]).dem.get(dk) === +m[2];
    }); } },
  { id: T.de2, has: "mỗi giờ xem phim tốn 13% pin", right: (q) => {
    const P = docScratch(q.svg), r = chayScratch(P, []);
    assert.ok(!r.lapMai && r.noi.length === 1); return r.noi[0]; } },
  { id: T.de2, has: "(sao là một biến)", right: (q) => {
    const P = docScratch(q.svg), chay = (s) => chayScratch(P, s);
    const a = chay([7, 0, 4]).hoi === 3, b0 = khoiChu(P, "hỏi “Chỉ từ 1 đến 5 sao!” và đợi")[0], b = !chay([5]).dem.has(b0), c = chay([9, 3]).noi[0] === 9;
    const trong = khoiChu(P, "đặt sao thành trả lời").find((k) => P.find((x) => /^lặp lại/.test(x.t)).body.includes(k));
    assert.ok(trong && /^Nếu bỏ khối «đặt sao thành trả lời» bên trong vòng lặp thì gõ 6 rồi 2, chương trình vẫn dừng\.$/.test(q.o[3]));
    const goVao = [6].concat(Array(20000).fill(2));
    assert.ok(!chay(goVao).lapMai, "chương trình đủ khối thì dừng");
    const d = !chayScratch(boKhoi(P, trong), goVao).lapMai;
    assert.ok(/^Gõ lần lượt 7, 0, 4 thì nhân vật hỏi tất cả 3 lần\.$/.test(q.o[0]) && /^Gõ 5 ngay lần đầu thì khối hỏi bên trong vòng lặp không chạy lần nào\.$/.test(q.o[1]) && /^Gõ lần lượt 9, 3 thì nhân vật nói 9\.$/.test(q.o[2]));
    return [a, b, c, d]; } },
  { id: T.de2, has: "nhà phát triển web và truyền thông đa phương tiện; nhà thiết kế trang web", right: (q) => {
    const [x, y] = /hai nghề: (.+); (.+)\?$/.exec(q.q).slice(1).map((s) => NHOM_NGHE[nhomCua(s)][0]);
    return x === y ? `Cả hai nghề đều theo hướng ${x}` : `Nghề thứ nhất theo hướng ${x}, nghề thứ hai theo hướng ${y}`; } },
  { id: T.de2, has: "nhóm nghề nào hợp với Tú nhất", right: (q) => { assert.deepEqual(q.o.slice().sort(), Object.keys(NHOM_NGHE).sort(), "ba lựa chọn là ba nhóm nghề của Hình 17.1"); return "Nhà chuyên môn về cơ sở dữ liệu và mạng máy tính"; } },
  /* ---------- Công nghệ, Đề 1 ---------- */
  { id: C.de1, has: "Phích cắm của một nồi cơm điện ghi", right: (q) => {
    const [I, U] = so(/ghi (\d+) A – (\d+) V;/, q.q), [u, p, i] = so(/nồi cơm ghi (\d+) V – (\d+) W, khi nấu có dòng điện khoảng (\d+) A/, q.q);
    assert.ok(close(p / u, i), "dòng điện của nồi = công suất : điện áp"); coLoiGiai(q, `${vn(p)} : ${u} = ${i}`);
    return u <= U && i <= I ? q.o.find((o) => /^Phù hợp, vì/.test(o) && o.includes(`${u} V`) && o.includes(`${i} A`)) : "không"; } },
  { id: C.de1, has: "Chỉ số công tơ điện nhà Ngọc", right: (q) => {
    const [a, b, g] = so(/ngày 1\/3 là ([\d ]+) kWh, ngày 1\/4 là ([\d ]+) kWh\. Giá điện bình quân là ([\d ]+) đồng/, q.q);
    coLoiGiai(q, vn(b - a) + " kWh"); return (b - a) * g; } },
  { id: C.de1, has: "Bóng đèn số 4 sáng khi nào", right: (q) => {
    const sd = docSoDo(q.svg), ct = congTacCua(sd), sang = moiCach(ct).filter((d) => coDien(sd, { dong: d }).has(4));
    assert.deepEqual(sang.map((d) => d.sort().join()), ["2,3"], "chỉ khi đóng cả công tắc 2, 3 thì đèn 4 sáng");
    assert.ok(noiTiep(sd, thietBi(sd, 2), thietBi(sd, 3)), "hai công tắc mắc nối tiếp");
    assert.ok(moiCach(ct).every((d) => coDien(sd, { dong: d }).has(5)), "ổ lấy điện số 5 luôn có điện");
    return q.o.find((o) => /cả công tắc số 2 và công tắc số 3/.test(o)); } },
  { id: C.de1, has: "dây dẫn đi trong ống nhựa suốt các đoạn", right: (q) => sum(so(/bảng điện (\d+) m, từ bảng điện đến đèn trần (\d+) m, từ bảng điện đến quạt treo tường (\d+) m/, q.q)) },
  { id: C.de1, has: "là bảng kê vật liệu, thiết bị để lắp mạng điện cho một phòng", right: (q) => {
    const o = docBangTien(q.svg);
    assert.deepEqual(o[0], ["Vật liệu, thiết bị", "Số lượng", "Đơn giá"]);
    const tt = o.slice(1).map((h) => soLuongO(h[1]) * h[2]);
    coLoiGiai(q, ...tt.filter((x, i) => soLuongO(o[i + 1][1]) > 1).map(vn), vn(sum(tt)));
    const ong = o.find((h) => /^Ống/.test(h[0])), day = o.filter((h) => /^Dây dẫn/.test(h[0]));
    assert.equal(soLuongO(ong[1]), sum(day.map((h) => soLuongO(h[1]))), "ống luồn dây dài bằng tổng chiều dài dây");
    return sum(tt); } },
  { id: C.de1, has: "Bảng kê của Lộc", right: (q) => {
    const [ld, gd, lo, go, ga, gc, gt] = so(/(\d+) m dây dẫn giá ([\d ]+) đồng\/m; (\d+) m ống luồn dây giá ([\d ]+) đồng\/m; 1 aptomat giá ([\d ]+) đồng; 1 ổ cắm điện giá ([\d ]+) đồng; 1 công tắc giá ([\d ]+) đồng/, q.q);
    const tong = ld * gd + lo * go + ga + gc + gt, tb = ga + gc + gt;
    const [y1] = so(/dây dẫn là ([\d ]+) đồng/, q.o[0]), [y2] = so(/là ([\d ]+) đồng/, q.o[1]), [g2, y4] = so(/giá ([\d ]+) đồng\/m thì tổng chi phí tăng thêm ([\d ]+) đồng/, q.o[3]);
    assert.ok(/chiếm chưa đến một nửa/.test(q.o[2]));
    return [ld * gd === y1, tong === y2, tb < tong / 2, lo * (g2 - go) === y4]; } },
  { id: C.de1, has: "nhóm của Vy lắp", right: (q) => {
    const sd = docSoDo(q.svg);
    assert.deepEqual([...coDien(sd, { dong: [3] })].sort(), [2, 4], "lúc cầu chì còn tốt: ổ lấy điện 2, đèn 4 có điện");
    assert.equal(coDien(sd, { dong: [3], dut: [1] }).size, 0, "cầu chì 1 đứt: không thiết bị nào có điện");
    return "Cả ổ lấy điện số 2, bóng đèn số 4 đều mất điện"; } },
  { id: C.de1, has: "Hà dùng bảng tiêu chí gợi ý của bài", right: (q) => { const d = diem71(q.q); coLoiGiai(q, "= " + d); return d; } },
  /* ---------- Công nghệ, Đề 2 ---------- */
  { id: C.de2, has: "Mai kẹp ampe kìm", right: (q) => { const [I] = so(/màn hình hiện (\d+) A/, q.q), [U] = so(/mạng điện là (\d+) V/, q.q); return U * I; } },
  { id: C.de2, has: "Muốn bóng đèn số 4 sáng mà bóng đèn số 6 tắt", right: (q) => {
    const sd = docSoDo(q.svg);
    const dat = q.o.filter((o) => { const m = /^Đóng công tắc (số \d+(?: và số \d+)?), ngắt công tắc (số \d+(?: và số \d+)?)$/.exec(o); assert.ok(m, "lựa chọn: " + o);
      const dong = m[1].match(/\d+/g).map(Number), co = coDien(sd, { dong }); return co.has(4) && !co.has(6); });
    assert.equal(dat.length, 1, "đúng một cách đóng, ngắt cho đèn 4 sáng, đèn 6 tắt"); return dat[0]; } },
  { id: C.de2, has: "một phần bảng tính chi phí do Khôi lập", right: (q) => {
    const o = docBangTien(q.svg), sai = o.slice(1).filter((h) => soLuongO(h[1]) * h[2] !== h[3]);
    assert.equal(sai.length, 1, "đúng một ô thành tiền sai"); coLoiGiai(q, vn(soLuongO(sai[0][1]) * sai[0][2]), vn(sai[0][3]));
    assert.deepEqual(q.o.slice().sort(), o.slice(1).map((h) => h[0]).sort(), "lựa chọn là tên các hàng của bảng");
    return sai[0][0]; } },
  { id: C.de2, has: "Lắp điện cho nhà kho của gia đình Lực", right: (q) => {
    const [ld, gd, lo, go] = so(/(\d+) m dây dẫn \(([\d ]+) đồng\/m\), (\d+) m ống luồn dây \(([\d ]+) đồng\/m\)/, q.q);
    const le = [...q.q.matchAll(/1 [^(]+\(([\d ]+) đồng\)/g)].map((m) => val(m[1])); assert.equal(le.length, 3);
    return ld * gd + lo * go + sum(le); } },
  { id: C.de2, has: "Cửa hàng X bán dây", right: (q) => {
    const [n, k] = so(/Cần mua (\d+) m dây dẫn và (\d+) ổ cắm/, q.q), [xd, xo] = so(/X bán dây ([\d ]+) đồng\/m, ổ cắm ([\d ]+) đồng/, q.q), [yd, yo] = so(/Y bán dây ([\d ]+) đồng\/m, ổ cắm ([\d ]+) đồng/, q.q);
    const X = (d) => d * xd + k * xo, Y = (d) => d * yd + k * yo, [a1] = so(/X hết ([\d ]+) đồng/, q.o[0]), [c1] = so(/hết ([\d ]+) đồng/, q.o[2]), [d1] = so(/chỉ cần (\d+) m dây/, q.o[3]);
    assert.ok(/^Mua cả dây và ổ cắm ở cửa hàng Y rẻ hơn mua cả ở cửa hàng X\.$/.test(q.o[1]) && /^Mua dây ở cửa hàng Y, ổ cắm ở cửa hàng X thì hết/.test(q.o[2]) && /mua cả ở cửa hàng Y rẻ hơn mua cả ở cửa hàng X\.$/.test(q.o[3]));
    return [X(n) === a1, Y(n) < X(n), n * yd + k * xo === c1, Y(d1) < X(d1)]; } },
  { id: C.de2, has: "Mạch đèn cầu thang nhà Quyên", right: (q) => {
    const thu = [];
    for (const a of [0, 1]) for (const b of [0, 1]) thu.push([a, b]);
    const doi = thu.every(([a, b]) => denCauThang(a, b) !== denCauThang(1 - a, b) && denCauThang(a, b) !== denCauThang(a, 1 - b)); // gạt một công tắc thì đèn đổi
    assert.ok(doi);
    const tat = thu.filter(([a, b]) => !denCauThang(a, b)), sang = thu.filter(([a, b]) => denCauThang(a, b)), moi = (ds, f) => ds.every(f);
    assert.ok(/^Đèn đang tắt, gạt công tắc ở chân cầu thang thì đèn sáng\.$/.test(q.o[0]) && /^Đèn đang sáng, gạt công tắc ở đầu cầu thang thì đèn tắt\.$/.test(q.o[1])
      && /^Muốn đèn sáng thì phải gạt cả hai công tắc\.$/.test(q.o[2]) && /^Đèn đang sáng, gạt lần lượt mỗi công tắc một lần thì đèn vẫn sáng\.$/.test(q.o[3]));
    return [moi(tat, ([a, b]) => denCauThang(1 - a, b)), moi(sang, ([a, b]) => !denCauThang(a, 1 - b)),
      moi(tat, ([a, b]) => !denCauThang(1 - a, b) && !denCauThang(a, 1 - b)), moi(sang, ([a, b]) => denCauThang(1 - a, 1 - b))]; } },
  { id: C.de2, has: "Tuấn tự đánh giá theo bảng tiêu chí", right: (q) => { const d = diem71(q.q), k = XEP_71(d);
    assert.deepEqual(q.o.slice().sort(), Object.keys(DIEM_71).sort(), "bốn lựa chọn là bốn mức của Bảng 7.1");
    coLoiGiai(q, "= " + d, { "Hoàn toàn không phù hợp": "14–24", "Phù hợp một phần": "25–35", "Phù hợp phần lớn": "36–46", "Phù hợp hoàn toàn": "47–56" }[k]); return k; } }
];
const tim = (has) => { const r = kho.filter((q) => q.q.includes(has)); assert.equal(r.length, 1, has); return r[0]; };

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
// mọi công thức ghi trong câu Tin học đọc được, số trong công thức nhỏ hơn 1 000
T.kho.forEach((q) => [q.q, q.x].concat(q.o || []).forEach((s) => congThuc(s).forEach((f) => {
  assert.doesNotThrow(() => tinh(f, {}), "công thức không đọc được: " + f);
  ngoaiNgoac(f, (p) => p.replace(/\$?[A-Z]+\$?\d+/g, "")).replace(/"[^"]*"/g, "").match(/\d+/g)?.forEach((n) => assert.ok(+n < 1000, "số trong công thức từ 1 000 trở lên: " + f));
})));
// mọi sơ đồ khối, chương trình chạy xong (không lặp mãi) với dữ liệu của đề: đã chạy ở từng câu; sơ đồ nguyên lí theo lưu ý khi vẽ của Bài 3:
// công tắc, cầu chì ở bên trái đồ dùng điện cùng nhánh
C.kho.filter((q) => q.svg && /<circle [^>]*r="12"/.test(q.svg)).forEach((q) => {
  const sd = docSoDo(q.svg);
  sd.tb.filter((t) => ["den", "oCam"].includes(t.loai)).forEach((t) => sd.tb.filter((x) => ["congTac", "cauChi"].includes(x.loai) && close(x.tam[1], t.tam[1]))
    .forEach((x) => assert.ok(x.tam[0] < t.tam[0], `thiết bị số ${x.so} vẽ bên phải thiết bị số ${t.so}: ${q.q.slice(0, 50)}`)));
});

/* ---------- chữ, lời dặn ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], q.type === "fill" ? q.ans : [], q.unit || []).map(String);
// câu hỏi cách gõ số thập phân trong Scratch (dấu chấm như ngôn ngữ lập trình): chỉ câu này được có “1.5”
const GO_SO = tim("gõ hệ số này vào khối lệnh");
kho.forEach((q) => chu(q).forEach((s) => {
  const at = q.src + ": " + q.q.slice(0, 50) + " → ";
  // dấu thanh kiểu cũ, “kĩ”, “lí” như hai cuốn sách
  assert.ok(!/(?<![\p{L}])(?:hóa|hòa|khỏe|tùy|thỏa|thủy|tỏa|hủy|họa|lũy|xóa|kỹ|lý)(?![\p{L}])/iu.test(s), at + "viết như sách (hoá, hoà, khoẻ, tuỳ, thoả, kĩ, lí): " + s);
  // số ngăn hàng nghìn bằng khoảng trắng (năm viết liền), dấu phẩy thập phân
  const s2 = q === GO_SO ? s.replace(/\b1\.5\b/g, "1,5") : s;
  assert.ok(!/\d{5,}|\d\.\d/.test(s2) && [...s2.matchAll(/(?<!\d)\d{4}(?!\d)/g)].every((m) => /^(19|20)\d\d$/.test(m[0])), at + "số viết sai cách: " + s);
  // lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án
  assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(s), at + "nhắc vị trí của phương án: " + s);
  // nhân vật của sách Tin học 9 (An, Minh, Khoa) không dùng làm tên trong đề
  assert.ok(!/(?<![\p{L}])(?:An|Minh|Khoa)(?![\p{L}])(?! học)/u.test(s), at + "tên nhân vật của sách: " + s);
  // dấu trừ của số âm là “−” (U+2212); công thức giữ dấu “-” như phần mềm bảng tính
  assert.ok(!/(?<![A-Z\d)])-\d/.test(s.replace(/=[^ ]*/g, "")), at + "số âm viết bằng dấu “−”: " + s);
}));
assert.deepEqual(GO_SO.o.slice().sort(), ["1 5", "1,5", "1.5", "15"].sort(), "câu gõ số thập phân: lựa chọn chỉ khác cách ngăn phần thập phân");
const SO_DE_CHUNG = "Từ năm học 2026–2027 Sở GD&ĐT ra đề chung cuối kì một số môn lớp 9; xem thông báo của Sở về môn và cấu trúc đề.";
MON.forEach((S) => {
  const nt = bank(S.de1).note;
  assert.equal(bank(S.de2).note, nt, S.m + ": hai đề cùng lời dặn");
  assert.ok(nt.startsWith(`Sách Kết nối tri thức, ${S.ten} 9`) && nt.endsWith(SO_DE_CHUNG + " Có lời giải từng câu."), S.m + ": lời dặn ghi sách; cuối lời dặn là câu về đề chung của Sở và “Có lời giải từng câu.”");
  S.chuDe.forEach(([, n, ten]) => assert.ok(nt.includes(`Bài ${n} ${ten}`), S.m + ": lời dặn ghi Bài " + n + " " + ten));
  assert.ok(/không có phần thực hành trên máy/.test(nt) && /đối chiếu đề cương của trường/.test(nt), S.m + ": lời dặn ghi hỏi qua tình huống, nhắc đối chiếu đề cương");
});
assert.ok(/ôn Chủ đề 4 phần a\. Sử dụng bảng tính điện tử nâng cao/.test(bank(T.de1).note) && /trọng tâm Chủ đề 5 Giải quyết vấn đề với sự trợ giúp của máy tính/.test(bank(T.de1).note)
  && /Chủ đề 6 Hướng nghiệp với tin học/.test(bank(T.de1).note) && /phần b\. Làm quen với phần mềm làm video \(Bài 9b–13b\)/.test(bank(T.de1).note), "Tin học: lời dặn ghi phần a, chủ đề 5, 6, nhắc phần b");
{
  const on = C.chuDe.filter(([t]) => C.cu.some((id) => /ck1/.test(id) && bank(id).questions.some((q) => q.topic === t))).map(([t]) => t), n = bank(C.de1).questions.filter((q) => on.includes(q.topic)).length;
  assert.ok(on.length && bank(C.de2).questions.filter((q) => on.includes(q.topic)).length === n, "Công nghệ: hai đề cùng số câu ôn Định hướng nghề nghiệp");
  assert.ok(new RegExp(`Có ${n} câu ôn Công nghệ 9 – Định hướng nghề nghiệp`).test(bank(C.de1).note) && /mô đun Lắp đặt mạng điện trong nhà/.test(bank(C.de1).note)
    && /mô đun khác/.test(bank(C.de1).note) && /Định hướng nghề nghiệp ở học kì II/.test(bank(C.de1).note), "Công nghệ: lời dặn ghi mô đun, số câu ôn Định hướng nghề nghiệp, nhắc mô đun khác");
}

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
  // câu ôn mang đúng chữ chủ đề của kho cũ; chủ đề trọng tâm là chủ đề mới
  const cuTopic = new Set(S.cu.flatMap((id) => bank(id).questions.map((q) => q.topic)));
  const on = S.chuDe.filter(([t]) => cuTopic.has(t)), moi = S.chuDe.filter(([t]) => !cuTopic.has(t));
  assert.ok(on.length && moi.length, S.m + ": có cả chủ đề ôn và chủ đề trọng tâm");
  const soCau = (ds, d) => d.filter((q) => ds.some(([t]) => t === q.topic)).length;
  [d1, d2].forEach((d, i) => assert.ok(soCau(moi, d) > 2 * soCau(on, d), `${S.pool}: Đề ${i + 1} phần trọng tâm nhiều câu hơn hẳn phần ôn`));
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
   của các kho cũ cùng môn (Rút ra N25): đề bài cùng các lựa chọn, ô nối, ô sắp xếp có từ một nửa số cặp hai âm tiết liền nhau (tính trên
   câu ít cặp hơn, bỏ các cặp có ở mọi câu như “nào dưới đây” và cặp của nhãn chủ đề) chung với một câu cũ thì báo ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const CHUNG = new Set(["nào dưới", "dưới đây", "đây là", "là một", "mỗi ý", "ý sau", "sau đúng", "đúng hay", "hay sai", "ở hình", "nào sau", "sau đây"]);
const cap2 = (s) => { const w = String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x); };
const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !CHUNG.has(c) && !nhan.has(c))); };
const ten = new Map();
MON.forEach((S) => [S.de1, S.de2].forEach((id) => bank(id).questions.forEach((q, i) => ten.set(S.kho.find((k) => k.src === id && k.q === q.q), id.replace(/9-ck2-/, "-") + "#" + (i + 1)))));
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

/* ---------- câu ôn và câu cùng chủ đề của kho cũ (đề “Ôn chủ đề” rút chung) ----------
   Đề “Ôn chủ đề” (Phiên UX14) rút 10 câu của một chủ đề từ mọi đề có sẵn cùng khối, cùng môn, nên câu ôn của kho này rút được cùng câu
   cùng chủ đề của kho giữa kì II (Tin học, Công nghệ Bài 1–4) và kho cuối kì I (Công nghệ – Định hướng nghề nghiệp). Câu ôn không trùng
   đề bài, không có chuỗi 6 từ của đề bài câu đó, không trùng đáp án (lựa chọn đúng, đáp án điền, đáp án số từ hai chữ số) của câu cùng
   chủ đề ở kho đó. */
const tu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const chuoiTu = (s, k) => { const w = tu(s), r = []; for (let i = 0; i + k <= w.length; i++) r.push(w.slice(i, i + k).join(" ")); return r; };
const daAn = (q) => (q.type === "mc" ? q.o[0] : q.type === "fill" ? q.ans[0] : q.type === "num" && (q.ans >= 10 || !Number.isInteger(q.ans)) ? String(q.ans) : null);
const LOI_DAN = "mỗi ý sau đúng hay sai"; // lời dặn chuẩn của câu đúng/sai 4 ý; tên chủ đề (tên bài) cũng không tính
const tenCu = new Map();
MON.forEach((S) => S.cu.forEach((id) => bank(id).questions.forEach((q, i) => tenCu.set(q, id.replace(/9-(gk2|ck1)-/, "-$1-") + "#" + (i + 1)))));
MON.forEach((S) => {
  const cuQ = S.cu.flatMap((id) => bank(id).questions);
  S.kho.forEach((q) => cuQ.filter((p) => p.topic === q.topic).forEach((p) => {
    const at = `${ten.get(q)} và ${tenCu.get(p)}: `;
    assert.notEqual(goc(q.q), goc(p.q), at + "trùng đề bài");
    const c6 = new Set(chuoiTu(p.q, 6)); chuoiTu(q.q, 6).filter((c) => c !== LOI_DAN && !(" " + tu(q.topic).join(" ") + " ").includes(" " + c + " ")).forEach((c) => assert.ok(!c6.has(c), at + "chung chuỗi 6 từ của đề bài: " + c));
    assert.ok(daAn(q) === null || goc(daAn(q)) !== goc(daAn(p) || ""), at + "trùng đáp án “" + daAn(q) + "”");
  }));
});

/* ---------- dò lộ đáp án (Rút ra N5, N19) giữa hai câu rút được cùng lúc: khác ô (chủ đề, mức), hoặc cùng một ô rút từ 2 câu.
   Đáp án là số (từ hai chữ số, hoặc số thập phân) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”); cặp nối:
   câu kia có cả hai vế; ô sắp xếp: câu kia có cả hai ô liền nhau theo đúng thứ tự. Đáp án bằng chữ (lựa chọn đúng, đáp án câu điền)
   tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có trong đề bài, lựa chọn, ô nối, lời giải
   của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. ---------- */
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const coCum = (t, s) => (" " + tu(t).join(" ") + " ").includes(" " + tu(s).join(" ") + " ");
const doLo = (qs, cungLuc, tenCau = (q) => ten.get(q)) => {
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
MON.forEach((S) => { const M = bank(S.pool).pool.matrix, r = doLo(S.kho, (p, q) => p !== q && (p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2)); loAll.push(...r.lo); chuAll.push(...r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuAll.join("\n"));
// đã xem (Phiên N9-ck2-tin-congnghe): chữ chung, câu kia không cho biết điều câu này hỏi. Tin học: “lớn hơn hoặc bằng” (lựa chọn sai của
// câu hỏi kí hiệu <>, không nói kí hiệu nào), “đầu vào là”, “đầu ra là”, “vào là số” (câu tiền nước, câu hoá đơn nói về bài toán
// khác), tên nhóm nghề, tên hướng nghề (là các lựa chọn của câu chọn nhóm nghề, câu chọn hướng nghề; câu kia không nói
// Phong, Tú hợp nhóm nào), “được nhập vào”, “nhập vào ô”, “dữ liệu được” (câu công thức có kí hiệu <>, câu xác thực kiểu List không nói
// công cụ xác thực dữ liệu dùng để làm gì), “theo thứ tự”, “số 0”, “có bao nhiêu”: cụm từ thường. Công nghệ: “cầu chì”
// (thiết bị có trong sơ đồ, mạch thực hành của nhiều câu; không câu nào nói cầu dao kết hợp với cầu chì), “đồng hồ vạn năng”, “đo điện trở”
// (dụng cụ, thang đo có ở nhiều câu; không câu nào nói đo điện trở để tìm chỗ đứt), “hai công tắc” (mọi lựa chọn của câu mạch đèn cầu thang
// đều có hai công tắc), “công tắc ba cực” (câu mạch hai đèn sáng luân phiên), “công tắc số”, “bóng đèn số”, “đèn số 4”, “ngắt công
// tắc” (số của thiết bị trong các sơ đồ khác nhau), “ở cửa hàng” (câu so giá hai cửa hàng không nói đơn giá lấy từ đâu khi lập bảng), “cách
// điện ở” (câu kiểm tra mối nối không nói tuốt vỏ đầu dây), “theo đúng thứ tự” (lời dặn của câu sắp xếp), “công tơ điện”, “ổ cắm điện”, “đồ
// dùng điện”, “số ghi trên”, “vỏ cách điện”, “nối với nhau”: cụm từ thường.
const DA_XEM = [
  "tin-de1#5 → tin-de1#3: lớn hơn hoặc",
  "tin-de1#5 → tin-de1#3: hơn hoặc bằng",
  "tin-de2#1 → tin-de1#9: theo thứ tự",
  "tin-de1#15 → tin-de1#14: đầu vào là",
  "tin-de1#15 → tin-de1#14: vào là số",
  "tin-de1#15 → tin-de1#14: đầu ra là",
  "tin-de2#12 → tin-de1#14: đầu ra là",
  "tin-de1#22 → tin-de1#25: nhà thiết kế",
  "tin-de1#22 → tin-de1#25: thiết kế đồ",
  "tin-de1#22 → tin-de1#25: kế đồ hoạ",
  "tin-de2#24 → tin-de1#25: nhà thiết kế",
  "tin-de2#24 → tin-de1#25: thiết kế đồ",
  "tin-de2#24 → tin-de1#25: kế đồ hoạ",
  "tin-de2#24 → tin-de1#25: đồ hoạ và",
  "tin-de2#24 → tin-de1#25: hoạ và truyền",
  "tin-de2#24 → tin-de1#25: và truyền thông",
  "tin-de2#24 → tin-de1#25: truyền thông đa",
  "tin-de2#24 → tin-de1#25: thông đa phương",
  "tin-de2#24 → tin-de1#25: đa phương tiện",
  "tin-de1#5 → tin-de2#1: được nhập vào",
  "tin-de1#5 → tin-de2#1: nhập vào ô",
  "tin-de2#2 → tin-de2#1: dữ liệu được",
  "tin-de2#15 → tin-de2#3: số 0",
  "tin-de2#19 → tin-de2#3: số 0",
  "tin-de1#6 → tin-de2#15: có bao nhiêu",
  "tin-de1#10 → tin-de2#15: có bao nhiêu",
  "tin-de2#23 → tin-de2#24: theo hướng khoa",
  "tin-de2#23 → tin-de2#24: hướng khoa học",
  "tin-de2#23 → tin-de2#24: khoa học máy",
  "tin-de2#23 → tin-de2#24: học máy tính",
  "tin-de1#22 → tin-de2#25: nhà chuyên môn",
  "tin-de1#22 → tin-de2#25: chuyên môn về",
  "tin-de1#22 → tin-de2#25: cơ sở dữ",
  "tin-de1#22 → tin-de2#25: sở dữ liệu",
  "congnghe-de1#5 → congnghe-de1#1: cầu chì",
  "congnghe-de1#13 → congnghe-de1#1: cầu chì",
  "congnghe-de1#16 → congnghe-de1#1: cầu chì",
  "congnghe-de1#17 → congnghe-de1#1: cầu chì",
  "congnghe-de1#18 → congnghe-de1#1: cầu chì",
  "congnghe-de2#17 → congnghe-de1#1: cầu chì",
  "congnghe-de2#18 → congnghe-de1#1: cầu chì",
  "congnghe-de1#8 → congnghe-de1#2: số ghi trên",
  "congnghe-de1#17 → congnghe-de1#5: công tắc số",
  "congnghe-de1#17 → congnghe-de1#5: tắc số 3",
  "congnghe-de1#18 → congnghe-de1#5: và công tắc",
  "congnghe-de1#3 → congnghe-de1#6: đồng hồ vạn",
  "congnghe-de1#3 → congnghe-de1#6: hồ vạn năng",
  "congnghe-de1#21 → congnghe-de1#6: đồng hồ vạn",
  "congnghe-de1#21 → congnghe-de1#6: hồ vạn năng",
  "congnghe-de2#3 → congnghe-de1#6: đồng hồ vạn",
  "congnghe-de2#3 → congnghe-de1#6: hồ vạn năng",
  "congnghe-de2#3 → congnghe-de1#6: đo điện trở",
  "congnghe-de2#7 → congnghe-de1#6: đồng hồ vạn",
  "congnghe-de2#7 → congnghe-de1#6: hồ vạn năng",
  "congnghe-de2#18 → congnghe-de1#6: đồng hồ vạn",
  "congnghe-de2#18 → congnghe-de1#6: hồ vạn năng",
  "congnghe-de2#12 → congnghe-de1#8: ở cửa hàng",
  "congnghe-de1#5 → congnghe-de1#13: hai công tắc",
  "congnghe-de2#17 → congnghe-de1#13: công tắc ba",
  "congnghe-de2#17 → congnghe-de1#13: tắc ba cực",
  "congnghe-de2#19 → congnghe-de1#13: hai công tắc",
  "congnghe-de1#14 → congnghe-de1#15: vỏ cách điện",
  "congnghe-de2#16 → congnghe-de1#15: cách điện ở",
  "congnghe-de1#5 → congnghe-de1#17: bóng đèn số",
  "congnghe-de1#5 → congnghe-de1#17: đèn số 4",
  "congnghe-de2#5 → congnghe-de1#17: bóng đèn số",
  "congnghe-de2#5 → congnghe-de1#17: đèn số 4",
  "congnghe-de1#21 → congnghe-de2#1: các đồ dùng",
  "congnghe-de1#21 → congnghe-de2#1: đồ dùng điện",
  "congnghe-de2#6 → congnghe-de2#1: đồ dùng điện",
  "congnghe-de2#7 → congnghe-de2#1: các đồ dùng",
  "congnghe-de2#7 → congnghe-de2#1: đồ dùng điện",
  "congnghe-de2#17 → congnghe-de2#1: các đồ dùng",
  "congnghe-de1#17 → congnghe-de2#5: công tắc số",
  "congnghe-de2#18 → congnghe-de2#5: ngắt công tắc",
  "congnghe-de1#4 → congnghe-de2#7: công tơ điện",
  "congnghe-de1#6 → congnghe-de2#7: công tơ điện",
  "congnghe-de1#16 → congnghe-de2#8: theo đúng thứ",
  "congnghe-de1#16 → congnghe-de2#8: đúng thứ tự",
  "congnghe-de1#1 → congnghe-de2#10: ổ cắm điện",
  "congnghe-de1#3 → congnghe-de2#10: ổ cắm điện",
  "congnghe-de1#12 → congnghe-de2#10: ổ cắm điện",
  "congnghe-de1#18 → congnghe-de2#10: ổ cắm điện",
  "congnghe-de2#2 → congnghe-de2#10: ổ cắm điện",
  "congnghe-de2#12 → congnghe-de2#10: ổ cắm điện",
  "congnghe-de1#16 → congnghe-de2#18: nối với nhau"
];
assert.deepEqual(chuAll, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
// cùng chủ đề (đề “Ôn chủ đề”): mọi cặp câu cùng chủ đề có ít nhất một câu của kho này, cả hai câu cùng ô của kho này và câu của kho cũ
const loCD = MON.flatMap((S) => S.chuDe.flatMap(([t]) => {
  const qs = S.kho.concat(S.cu.flatMap((id) => bank(id).questions)).filter((q) => q.topic === t), r = doLo(qs, (a, b) => a !== b && (ten.has(a) || ten.has(b)), (q) => ten.get(q) || tenCu.get(q));
  return r.lo.concat(r.chuLo).filter((s) => !chuAll.includes(s));
}));
if (process.env.DO_LO) console.log("Đáp án có ở câu cùng chủ đề rút chung ở đề “Ôn chủ đề” (xem tay):\n" + loCD.join("\n"));
// đã xem (Phiên N9-ck2-tin-congnghe): câu ôn cùng chủ đề với kho giữa kì II, kho cuối kì I dùng chung kiến thức của bài, câu kia không nói
// đáp án câu này. Tin học: cú pháp thiết lập “Allow: …; Data: between; Minimum: …” (lựa chọn của các câu chọn thiết lập; câu chiều cao cần
// Decimal, câu số khách cần Whole number), “nhập vào ô”, “đặt điều kiện”, “dữ liệu không” (câu Custom, câu Any value không nói công cụ dùng
// để làm gì), “có giá trị”, “giá trị lớn hơn”, “đếm ô có” (lựa chọn sai của câu COUNTIF với ô E2, không nói ">=" nghĩa là gì), “ô ở cột”,
// “cùng hàng với”, “ở cột C” (các câu SUMIF cùng nói cộng ô cùng hàng ở vùng sum_range; câu “Sách*” còn hỏi điều kiện bắt đầu bằng Sách, câu
// kia không có), “khi điều kiện”, “và tổng chi”, “chi nhiều hơn thu” (câu Thâm hụt nói chi nhiều hơn thu là B4 > B3; câu kia hỏi ý nghĩa số
// âm của =C4-C5), tên hướng nghề, tên nhóm nghề (là các lựa chọn của câu kia). Công nghệ: “đồ dùng điện”, “chịu được dòng điện”, “ổ cắm có
// dây” (câu ổ cắm nổi nói kéo ổ cắm có dây từ phòng khác sang thì vướng, không nói dùng cho đồ dùng ở xa), “phích cắm điện”, “hai que đo”,
// “tắt nguồn của” (lựa chọn sai của câu bước đầu tiên khi đo), “của đồng hồ”, “công tơ điện”, số của thiết bị trong các sơ đồ khác nhau,
// “phù hợp một phần” (tên cột của bảng tiêu chí; câu của Hà không nói khoảng điểm xếp loại), “cung lao động”, “ba yếu tố”, “tôi
// có thể” (câu của Nga ghi sẵn nghĩa của từng yếu tố trong lựa chọn).
const DA_XEM_CHU_DE = [
  "tin-de2#1 → tin-de1#1: dữ liệu không",
  "tin-gk2-de2#4 → tin-de1#1: dữ liệu không",
  "tin-gk2-de1#5 → tin-de1#2: data between minimum",
  "tin-gk2-de1#5 → tin-de1#2: between minimum 1",
  "tin-gk2-de2#5 → tin-de1#2: allow decimal data",
  "tin-gk2-de2#5 → tin-de1#2: decimal data between",
  "tin-gk2-de2#5 → tin-de1#2: data between minimum",
  "tin-gk2-de2#5 → tin-de1#2: between minimum 1",
  "tin-gk2-de2#1 → tin-de2#1: nhập vào ô",
  "tin-de1#1 → tin-gk2-de2#1: đặt điều kiện",
  "tin-de1#2 → tin-gk2-de2#5: allow whole number",
  "tin-de1#2 → tin-gk2-de2#5: whole number data",
  "tin-de1#2 → tin-gk2-de2#5: data between minimum",
  "tin-de1#2 → tin-gk2-de2#5: between minimum 1",
  "tin-gk2-de2#6 → tin-de1#3: ô có giá",
  "tin-gk2-de2#6 → tin-de1#3: có giá trị",
  "tin-gk2-de2#6 → tin-de1#3: giá trị lớn",
  "tin-gk2-de2#6 → tin-de1#3: trị lớn hơn",
  "tin-gk2-de2#8 → tin-de1#3: đếm ô có",
  "tin-de1#3 → tin-gk2-de2#6: có giá trị",
  "tin-de1#4 → tin-de2#4: ô ở cột",
  "tin-gk2-de1#11 → tin-de2#4: ô ở cột",
  "tin-gk2-de1#13 → tin-de2#4: cùng hàng với",
  "tin-gk2-de1#14 → tin-de2#4: ở cột c",
  "tin-de2#5 → tin-gk2-de1#17: khi điều kiện",
  "tin-de1#7 → tin-gk2-de2#21: và tổng chi",
  "tin-de2#7 → tin-gk2-de2#23: chi nhiều hơn",
  "tin-de2#7 → tin-gk2-de2#23: nhiều hơn thu",
  "tin-de2#24 → tin-de1#24: tin học ứng",
  "tin-de2#24 → tin-de1#24: học ứng dụng",
  "tin-de2#25 → tin-de1#25: nhà thiết kế",
  "tin-de2#25 → tin-de1#25: thiết kế đồ",
  "tin-de2#25 → tin-de1#25: kế đồ hoạ",
  "tin-de2#25 → tin-de1#25: đồ hoạ và",
  "tin-de2#25 → tin-de1#25: hoạ và truyền",
  "tin-de2#25 → tin-de1#25: và truyền thông",
  "tin-de2#25 → tin-de1#25: truyền thông đa",
  "tin-de2#25 → tin-de1#25: thông đa phương",
  "tin-de2#25 → tin-de1#25: đa phương tiện",
  "tin-de1#24 → tin-de2#24: khoa học máy",
  "tin-de1#24 → tin-de2#24: học máy tính",
  "tin-de1#24 → tin-de2#24: hướng tin học",
  "tin-de1#24 → tin-de2#24: tin học ứng",
  "tin-de1#24 → tin-de2#24: học ứng dụng",
  "tin-de1#25 → tin-de2#25: nhà chuyên môn",
  "tin-de1#25 → tin-de2#25: chuyên môn về",
  "tin-de1#25 → tin-de2#25: môn về cơ",
  "tin-de1#25 → tin-de2#25: về cơ sở",
  "tin-de1#25 → tin-de2#25: cơ sở dữ",
  "tin-de1#25 → tin-de2#25: sở dữ liệu",
  "tin-de1#25 → tin-de2#25: dữ liệu và",
  "tin-de1#25 → tin-de2#25: liệu và mạng",
  "tin-de1#25 → tin-de2#25: và mạng máy",
  "tin-de1#25 → tin-de2#25: mạng máy tính",
  "congnghe-gk2-de1#1 → congnghe-de2#1: đồ dùng điện",
  "congnghe-gk2-de2#3 → congnghe-de2#1: đồ dùng điện",
  "congnghe-gk2-de1#3 → congnghe-de2#2: chịu được dòng",
  "congnghe-gk2-de1#3 → congnghe-de2#2: được dòng điện",
  "congnghe-gk2-de1#4 → congnghe-de2#2: chịu được dòng",
  "congnghe-gk2-de1#4 → congnghe-de2#2: được dòng điện",
  "congnghe-gk2-de2#5 → congnghe-de2#2: ổ cắm có",
  "congnghe-gk2-de2#5 → congnghe-de2#2: cắm có dây",
  "congnghe-de1#1 → congnghe-gk2-de2#3: phích cắm điện",
  "congnghe-gk2-de1#9 → congnghe-de1#3: hai que đo",
  "congnghe-gk2-de2#6 → congnghe-de1#3: hai que đo",
  "congnghe-gk2-de2#6 → congnghe-de2#3: tắt nguồn của",
  "congnghe-gk2-de2#7 → congnghe-de2#3: của đồng hồ",
  "congnghe-de1#4 → congnghe-gk2-de1#7: công tơ điện",
  "congnghe-de2#5 → congnghe-de1#5: công tắc số",
  "congnghe-de2#5 → congnghe-de1#5: tắc số 2",
  "congnghe-de2#5 → congnghe-de1#5: số 2 và",
  "congnghe-de2#5 → congnghe-de1#5: tắc số 3",
  "congnghe-gk2-de1#15 → congnghe-de1#5: công tắc số",
  "congnghe-gk2-de1#15 → congnghe-de1#5: số 2 và",
  "congnghe-gk2-de1#15 → congnghe-de1#5: tắc số 3",
  "congnghe-gk2-de1#16 → congnghe-de1#5: và công tắc",
  "congnghe-gk2-de2#14 → congnghe-de1#5: công tắc số",
  "congnghe-gk2-de2#14 → congnghe-de1#5: tắc số 2",
  "congnghe-gk2-de2#17 → congnghe-de1#5: công tắc số",
  "congnghe-gk2-de2#17 → congnghe-de1#5: tắc số 2",
  "congnghe-gk2-de2#17 → congnghe-de1#5: số 2 và",
  "congnghe-de1#5 → congnghe-de2#5: đóng công tắc",
  "congnghe-de1#5 → congnghe-de2#5: công tắc số",
  "congnghe-de1#5 → congnghe-de2#5: tắc số 2",
  "congnghe-de1#5 → congnghe-de2#5: số 2 và",
  "congnghe-gk2-de1#15 → congnghe-de2#5: đóng công tắc",
  "congnghe-gk2-de1#15 → congnghe-de2#5: công tắc số",
  "congnghe-gk2-de1#15 → congnghe-de2#5: số 2 và",
  "congnghe-gk2-de1#15 → congnghe-de2#5: số 3 ngắt",
  "congnghe-gk2-de2#14 → congnghe-de2#5: đóng công tắc",
  "congnghe-gk2-de2#14 → congnghe-de2#5: công tắc số",
  "congnghe-gk2-de2#14 → congnghe-de2#5: tắc số 2",
  "congnghe-gk2-de2#17 → congnghe-de2#5: đóng công tắc",
  "congnghe-gk2-de2#17 → congnghe-de2#5: công tắc số",
  "congnghe-gk2-de2#17 → congnghe-de2#5: tắc số 2",
  "congnghe-gk2-de2#17 → congnghe-de2#5: số 2 và",
  "congnghe-de1#5 → congnghe-gk2-de1#15: số 2 và",
  "congnghe-de1#5 → congnghe-gk2-de1#15: bóng đèn số",
  "congnghe-de2#5 → congnghe-gk2-de1#15: số 2 và",
  "congnghe-de2#5 → congnghe-gk2-de1#15: bóng đèn số",
  "congnghe-de2#5 → congnghe-gk2-de1#15: đèn số 6",
  "congnghe-de1#5 → congnghe-gk2-de1#16: và công tắc",
  "congnghe-de2#6 → congnghe-gk2-de1#21: đồ dùng điện",
  "congnghe-de1#23 → congnghe-de2#23: phù hợp một",
  "congnghe-de1#23 → congnghe-de2#23: hợp một phần",
  "congnghe-ck1-de1#13 → congnghe-de1#24: cung lao động",
  "congnghe-de2#25 → congnghe-de1#25: cả ba yếu",
  "congnghe-de2#25 → congnghe-de1#25: ba yếu tố",
  "congnghe-de1#25 → congnghe-de2#25: tôi có thể"
];
assert.deepEqual(loCD, DA_XEM_CHU_DE, "đáp án có ở câu cùng chủ đề đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM_CHU_DE");

// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 17”, hai ô sắp xếp liền nhau, cụm của đáp án trắc nghiệm
{
  const gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x }), khac = tim("Công cụ Data Validation (xác thực dữ liệu) dùng để làm gì?");
  const thuLo = (qs) => { const r = doLo(qs, (p, q) => p !== q, (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const xe = tim("Một bãi gửi xe tính phí");
  assert.deepEqual(thuLo([xe, khac]), [], "câu không sửa thì không báo");
  assert.ok(thuLo([xe, gia(khac, "Ví dụ p = 17.")]).includes("17"));
  const sx = tim("Sắp xếp các việc nhóm làm theo đúng quá trình giải quyết vấn đề");
  assert.ok(thuLo([sx, gia(khac, sx.o[0] + ". Sau đó: " + sx.o[1] + ".")]).includes(sx.o[0] + " → " + sx.o[1]));
  assert.ok(thuLo([tim("Mạch đèn cầu thang thực hành trong bài"), gia(khac, "Mạch này dùng hai công tắc ba cực.")]).includes("công tắc ba"));
}

/* ---------- bộ đọc hình, bộ chạy thử, bộ tính công thức tự thử với hình, chương trình, công thức cố ý viết sai ---------- */
{
  const doi = (s, a, b) => { assert.ok(typeof a === "string" ? s.includes(a) : a.test(s), "chuỗi để sửa: " + a); return s.replace(a, b); };
  const hong = (doc, goc, sai, re) => { assert.notEqual(sai, goc, "hình chưa bị sửa"); assert.throws(() => doc(sai), re); };
  // bộ tính công thức, xác thực dữ liệu (cả Text length)
  const o = { A1: 1, A2: 2, A3: 3, B1: "Sách giáo khoa", B2: "Vở", B3: "sách truyện", C1: 10, C2: 20, C3: 30 };
  assert.equal(tinh('=SUMIF(B1:B3,"Sách*",C1:C3)', o), 40, "“Sách*”: bắt đầu bằng Sách, không phân biệt hoa, thường");
  assert.equal(tinh('=COUNTIF(A1:A3,">=2")', o), 2);
  assert.equal(tinh('=IF(A3>=3,"Nắng nóng",IF(A3>=2,"Ấm","Mát"))', o), "Nắng nóng");
  assert.equal(tinh('=IF(B2<>"Vở","Khác","Vở")', o), "Vở");
  assert.equal(chep('=IF(C2>B2,"Tăng","Không tăng")', 3, 0), '=IF(C5>B5,"Tăng","Không tăng")');
  const tl = thietLapXT("Allow: Text length; Data: equal to; Length: 8");
  assert.deepEqual(["AB123456", "AB12345", "AB1234567"].map((v) => nhanXT(tl, v)), [true, false, false]);
  assert.deepEqual([1.58, 2, 2.1, 1.1].map((v) => nhanXT(thietLapXT("Allow: Decimal; Data: between; Minimum: 1,2; Maximum: 2"), v)), [true, true, false, false]);
  assert.deepEqual([8, 8.5, 9].map((v) => nhanXT(thietLapXT("Allow: Whole number; Data: equal to; Value: 8"), v)), [true, false, false]);
  // sơ đồ khối
  const xe = tim("Một bãi gửi xe tính phí").svg;
  assert.doesNotThrow(() => docSoDoKhoi(xe));
  hong(docSoDoKhoi, xe, doi(xe, 'fill="ok-soft"', 'fill="sun-soft"'), /màu hình lạ/);
  hong(docSoDoKhoi, xe, doi(xe, ">đúng</text>", ">Đúng</text>"), /nhãn của đường ra là đúng hoặc sai/);
  hong(docSoDoKhoi, xe, doi(xe, /<text x="\d+" y="\d+" (text-anchor="middle" font-size="13" fill="muted">sai<\/text>)/, '<text x="160" y="26" $1'), /đè lên một hình/);
  hong(docSoDoKhoi, xe, doi(xe, /<polygon points="[^"]*" fill="ink"\/>/, ""), /có đầu mũi tên ở cuối đường/);
  hong(docSoDoKhoi, xe, doi(xe, ">p ← 5</text>", ">p ← 5 + 0 × 1 + 0 × 2 + 0 × 3</text>"), /rộng quá hình/);
  hong(docSoDoKhoi, xe, doi(xe, /<polyline points="160,36 160,56"/, '<polyline points="160,36 150,46 160,56"'), /chỉ gồm đoạn ngang, đoạn dọc/);
  const truyen = tim("Hà đọc một cuốn truyện").svg;
  assert.ok(!chayBT(docSoDoKhoi(truyen), []).lapMai && chayBT(docSoDoKhoi(doi(truyen, "s &lt; 100", "s ≥ 0")), []).lapMai, "bộ chạy thử nhận ra thuật toán lặp mãi");
  assert.throws(() => chayBT(docSoDoKhoi(tim("lệnh rút r nghìn đồng").svg), [500, 200]), /ô “\?” chưa có bước thay/);
  // chương trình Scratch
  const s1 = tim("(s, k là hai biến). Khi chương trình dừng").svg;
  assert.doesNotThrow(() => docScratch(s1));
  hong(docScratch, s1, doi(s1, 'fill="moc-soft"', 'fill="ok-soft"'), /màu của khối/);
  hong(docScratch, s1, doi(s1, /<rect x="(\d+)"([^>]*\/><text x=")(\d+)("[^>]*>đặt s thành s \+ k<\/text>)/, (m, a, b, c, d) => `<rect x="${+a + 18}"${b}${+c + 18}${d}`), /khối lùi vào sai chỗ/);
  hong(docScratch, s1, doi(s1, ">nói s trong 2 giây<", ">nói s + k + s + k + s + k trong 2 giây<"), /rộng quá khối/);
  hong(docScratch, s1, doi(s1, /<rect [^>]*stroke="none"\/>/, ""), /mỗi khối lặp, khối nếu, “nếu không thì” có một thân chữ C/);
  const pin = tim("mỗi giờ xem phim tốn 13% pin").svg;
  assert.ok(chayScratch(docScratch(doi(pin, "đặt pin thành pin − 13", "đặt pin thành pin + 13")), []).lapMai, "bộ chạy thử nhận ra chương trình lặp mãi");
  // bảng chi phí
  const bg = tim("là bảng kê vật liệu, thiết bị để lắp mạng điện cho một phòng").svg;
  hong(docBangTien, bg, doi(bg, / text-anchor="end"/, ""), /ô chữ căn trái, ô số căn phải/);
  hong(docBangTien, bg, doi(bg, ">Ống luồn dây</text>", ">Ống luồn dây bằng nhựa cứng chống cháy loại tốt</text>"), /chữ vừa ô/);
  // sơ đồ nguyên lí
  const sd = tim("Bóng đèn số 4 sáng khi nào").svg;
  hong(docSoDo, sd, doi(sd, /<circle [^>]*r="3" fill="ink"[^>]*\/>/, ""), /chấm tròn đậm đúng ở chỗ nối/);
  // nhóm nghề (Hình 17.1), Bảng 7.1
  assert.equal(nhomCua("nhà khoa học dữ liệu"), "Nhà chuyên môn về cơ sở dữ liệu và mạng máy tính");
  assert.throws(() => nhomCua("Kĩ sư điện"), /nghề có trong Hình 17\.1/);
  assert.deepEqual([24, 25, 35, 36, 46, 47].map(XEP_71), ["Hoàn toàn không phù hợp", "Phù hợp một phần", "Phù hợp một phần", "Phù hợp phần lớn", "Phù hợp phần lớn", "Phù hợp hoàn toàn"]);
  assert.throws(() => diem71("6 tiêu chí ở cột «Phù hợp hoàn toàn», 5 tiêu chí ở cột «Phù hợp phần lớn»"), /đủ 14 tiêu chí/);
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book; trùng ý với các kho khác (Rút ra N21) ----------
   Cụm từ chung của môn (tên bài, tên chủ đề, tên nhóm nghề và các nghề của Hình 17.1, tên ba yếu tố chọn nghề, tên sơ đồ, cú pháp hàm IF
   và cú pháp thiết lập xác thực dữ liệu như sách, lời dặn chuẩn của câu đúng/sai 4 ý) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. */
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = MON.flatMap((S) => S.chuDe.map((c) => c[2])).concat(["Hoàn thiện bảng tính quản lí tài chính gia đình", "Giải quyết vấn đề với sự trợ giúp của máy tính",
  "Hướng nghiệp với tin học", "Lắp đặt mạng điện trong nhà", "Thiết bị đóng cắt và lấy điện trong gia đình", "Tôi thích – Tôi có thể – Tôi cần làm",
  "=IF(logical_test, [value_if_true], [value_if_false])", "sơ đồ nguyên lí", "sơ đồ lắp đặt", "nghiên cứu sơ đồ lắp đặt mạng điện",
  "nghề liên quan đến lắp đặt mạng điện trong nhà", "nghề liên quan đến lắp đặt mạng điện", "Mỗi ý sau đúng hay sai", "Allow: Whole number", "Allow: Decimal",
  "Allow: Text length", "Data: between", "Data: greater than", "Data: less than", "Data: equal to", "Minimum:", "Maximum:"], MON.flatMap((S) => S.chuDe.map((c) => c[0])),
  Object.keys(NHOM_NGHE).flatMap((k) => [k, k.replace(/^Nhà (chuyên môn về )?/, "")]), Object.values(NHOM_NGHE).flatMap((v) => v[1]))
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const boChuoi = (ds, k) => { const out = new Map(); ds.forEach(([id, s]) => { const w = khongDau(s).split(" ").filter(Boolean); for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k).join(" "); if (!out.has(c)) out.set(c, new Set()); out.get(c).add(id); } }); return out; };
const bao = (bo, k) => [...new Set(kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].filter((c) => bo.has(c)).map((c) => `${ten.get(q)} ~ ${[...bo.get(c)].join(", ")}: ${c}`)))];
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
if (SACH.length) {
  assert.ok(["tin-hoc-9", "cong-nghe-9-lap-dat-mang-dien-trong-nha", "cong-nghe-9-dinh-huong-nghe-nghiep"].every((c) => SACH.some((f) => f.includes(path.join("lop-9", c)))), "OnUp-Book có Tin học 9, Công nghệ 9 – Lắp đặt mạng điện trong nhà, Định hướng nghề nghiệp");
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
console.log(CHECKS.length + " câu đã tính lại, đọc lại hình hoặc chạy thử; " + MON.map((S) => `${S.ten}: kho ${S.kho.length} câu, ma trận 10 – 8 – 7 trên ${S.chuDe.length} chủ đề`).join("; ") + ".");
console.log("MATH OK");
