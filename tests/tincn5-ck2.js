// Kiểm tra ngân hàng Tin học và Công nghệ 5 cuối năm của Phiên N5-ck2-tincn (data/banks/5-tincn.js, tincn5-ck2-*), theo mẫu
// tests/tincn5-ck1.js, tests/tincn4-ck2.js và các ý chung của các phiên lớp 5 (đoạn “Chung của các phiên lớp 5” ở mục 7 của
// docs/KE-HOACH-NOI-DUNG.md). Kho = Đề 1 + Đề 2 (không có câu riêng); số câu, số đề lấy từ danh mục (không ghi cứng).
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho, đúng đề ghi ở id):
// - Tin học 5 Bài 10–16: đọc lại khối lệnh Scratch trong hình (docScratch: mỗi lệnh một hình chữ nhật bo góc tô theo màu nhóm lệnh, lệnh
//   “Khi bấm vào” có lá cờ xanh, lệnh nằm trong lệnh lặp, lệnh nếu lùi vào 18, lệnh lặp và lệnh nếu có thân chữ C và thanh đóng) rồi chạy thử
//   (chay: di chuyển, đổi trang phục, đợi, nói, hỏi và đợi, đặt và thay đổi biến, lặp lại, liên tục, lặp lại cho đến khi, nếu … thì, nếu
//   không thì; điều kiện chuột được nhấn, phím được bấm, đang chạm một nhân vật cho theo từng lượt lặp): số bước đi được, số lần một lệnh chạy,
//   giá trị của biến, lúc nhân vật nói; câu sửa chương trình thử từng cách sửa ở lựa chọn, chỉ một cách cho đúng việc đề bài muốn; đọc lại
//   biểu thức lồng nhau (docBieuThuc: khối phép toán hình viên thuốc, khối trong tính trước), tính biểu thức điều kiện, phép chia lấy dư.
// - Công nghệ 5 Bài 7–9: bảng ghi trong script theo sách in năm 2026 (bộ phận chính của mô hình xe điện, chi tiết và số lượng trong ba bảng
//   chi tiết, chi tiết dùng để cố định động cơ, giá pin, đèn LED, dây đỏ nối với cực dương của động cơ và chân dài của đèn LED, lắp pin khi
//   công tắc mở, bốn bước lắp xe điện, tiêu chí đánh giá mô hình máy phát điện gió); đọc lại sơ đồ các bước lắp ráp (docBuoc, như
//   tests/tincn5-ck1.js); câu sắp xếp: thử mọi thứ tự, chỉ thứ tự của đáp án thoả bảng “việc nào phải làm trước” ghi trong script.
// Chữ trong hình từ cỡ 13 và nằm trọn trong khung hình.
// Rồi kiểm tra mức độ, ma trận (10 Biết, 8 Hiểu, 7 Vận dụng; mỗi đề 13 câu Tin học, 12 câu Công nghệ; hai đề cố định chia đúng ma trận; ô
// rút k câu có đúng 2k câu, k câu ở mỗi đề: Công nghệ chỉ có ba bài nên có ô rút 2 câu), dạng câu (ít nhất 2 câu đúng/sai 4 ý, kiểu Đ/S
// không lặp), nối cột có một ô thừa và không nối được nhờ chữ trùng, đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay
// ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn, ba lựa chọn sai không cùng mở đầu bằng một chữ mà
// đáp án đúng không có, đáp án không lặp chữ của nhãn chủ đề, lời giải không nhắc vị trí phương án, gọi người làm bài là “bạn”, chữ như sách
// (“hoá”, “hoạ”…), không tên hãng, note (phạm vi, phần B của Chủ đề 5, đề cương của trường, đề chung của Sở), đề bài không trùng câu khác
// trong file, rút thử (đúng ma trận, gặp đủ kho; đã làm hết một đề cố định thì chỉ rút câu của đề kia), dò lộ đáp án giữa mọi cặp câu của
// kho và lời dặn (đề “Ôn chủ đề” rút chung mọi câu của một chủ đề; đã xem ghi ở DA_XEM), đề bài không gần trùng câu của data/banks/4-tincn.js
// và của kho cuối kì I lớp 5 (cặp hai âm tiết chung). Có ../OnUp-Book (repo riêng tư): mọi trường chữ, cả chữ trong hình và note, không có
// chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm; DO_SACH=1 in chuỗi 6 từ). So thêm với mọi câu của các kho khác,
// cả câu riêng của các đề ngẫu nhiên: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 6 từ và câu gần trùng.
// Chạy: node tests/tincn5-ck2.js → in TINCN5 CK2 OK. DO_LO=1 in đáp án bằng chữ có ở câu khác để người làm xem.
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
const S = { de1: "tincn5-ck2-de1", de2: "tincn5-ck2-de2", pool: "tincn5-ck2-ngau-nhien" };
const FILE = "5-tincn.js";
const sum = (a) => a.reduce((s, v) => s + v, 0);
const close = (x, y) => Math.abs(x - y) < 1e-9;
const low = (s) => String(s).normalize("NFC").toLowerCase();
const val = (s) => +String(s).replace(/\s/g, "").replace(",", ".");

/* ---------- danh mục ---------- */
const pool = bank(S.pool);
assert.ok(pool && pool.pool, "thiếu đề ngẫu nhiên " + S.pool);
const DE = pool.pool.from;
assert.deepEqual(DE, [S.de1, S.de2], "from là Đề 1 và Đề 2");
DE.concat(S.pool).forEach((id) => {
  const b = bank(id);
  assert.ok(b.grade === 5 && b.subject === "Tin học và Công nghệ" && b.minutes === 35 && b.file === FILE, id + ": lớp 5, Tin học và Công nghệ, 35 phút, file " + FILE);
  if (id !== S.pool) assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
});
const kho = pool.questions;
assert.equal(kho.filter((q) => q.src === S.pool).length, 0, "đề ngẫu nhiên không có câu riêng (lời giao việc: hai đề cố định)");
assert.equal(kho.length, sum(DE.map((id) => bank(id).n)), "kho = câu của hai đề cố định");
{
  const cal = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ck2 = /id: "ck2-l5"[\s\S]*?scope: "([^"]*)"[\s\S]*?banks: \[([^\]]*)\]/.exec(cal);
  assert.ok(ck2, "lịch có kì ck2-l5");
  DE.concat(S.pool).forEach((id) => assert.ok(ck2[2].includes(`"${id}"`), id + " gắn vào ck2-l5"));
  assert.ok(ck2[1].includes("Tin học và Công nghệ: Tin học Bài 10–16, Công nghệ Bài 7–9"), "phạm vi của ck2-l5 ghi Tin học Bài 10–16, Công nghệ Bài 7–9");
}
const ten = new Map();
DE.forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("tincn5-ck2-", "") + "#" + (i + 1))));

/* ---------- hình SVG ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const pts2 = (s) => { const v = nums(s), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]]); return p; };
const TAGS = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const RECTS = (svg) => TAGS(svg, "rect").map((a) => ({ x: +a.x, y: +a.y, w: +a.width, h: +a.height, rx: +(a.rx || 0), fill: a.fill || "none", stroke: a.stroke || null }));
const LINES = (svg) => TAGS(svg, "line").map((a) => ({ a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], stroke: a.stroke || "none" }));
const POLYS = (svg) => TAGS(svg, "polygon").map((a) => ({ p: pts2(a.points), fill: a.fill || "none" }));
const TEXTS = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start", b: a["font-weight"] === "700" }; });
const rong = (t) => (t.b ? 0.62 : 0.56) * t.fs * [...t.t].length; // ước bề rộng chữ (Noto Sans)
const trong = (x, y, r) => x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h;
const daDoc = new Set(); // hình đã đọc lại bằng code
// chữ trong hình từ cỡ 13 và nằm trọn trong khung hình
const chuHinh = (svg, at) => {
  const v = nums(/viewBox="([^"]+)"/.exec(svg)[1]);
  TEXTS(svg).forEach((t) => {
    assert.ok(t.fs >= 13, `${at}: chữ “${t.t}” cỡ ${t.fs}, cần từ cỡ 13`);
    const w = rong(t), x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0];
    assert.ok(x0 >= v[0] && x0 + w <= v[0] + v[2] && t.at[1] - 0.75 * t.fs >= v[1] && t.at[1] + 0.25 * t.fs <= v[1] + v[3], `${at}: chữ “${t.t}” tràn khỏi khung hình`);
  });
};

/* Khối lệnh Scratch (Tin học 5 Bài 10–16, chữ của lệnh như sách: “Khi bấm vào”, “lặp lại 3”, “liên tục”, “lặp lại cho đến khi …”, “nếu … thì”,
   “nếu không thì”, “đặt … thành …”, “thay đổi … một lượng …”). Mỗi lệnh một rect bo góc (rx 6) cao 28, chữ cỡ 14 bên trong; lệnh nằm trong
   lệnh lặp, lệnh nếu lùi vào 18; màu tô theo nhóm lệnh như các đề Tin học 6 trong app (Sự kiện sun-soft, Chuyển động acc-soft, Hiển thị
   moc-soft, Điều khiển bad-soft, Cảm biến ioe-soft, Các biến số ok-soft). Lệnh lặp, lệnh nếu có thân chữ C (rect rộng 17 tô bad-soft không
   viền, nối đáy lệnh đó với thanh ngay dưới cùng cột: “nếu không thì” hoặc thanh đóng cao 10 không chữ) và hai đường viền dọc của thân.
   Lệnh “Khi bấm vào” đứng đầu, có lá cờ xanh (polygon và cán tô ok, trong lệnh, bên phải chữ) như đề Tin học và Công nghệ 4.
   Trả về chương trình: danh sách { t, body?, els? }. */
const NHOM = [[/^Khi bấm vào$/, "sun-soft"], [/^(di chuyển \d+ bước|bật lại nếu chạm cạnh|đi tới con trỏ chuột)$/, "acc-soft"],
  [/^(trang phục kế tiếp|nói .+|bỏ các hiệu ứng đồ hoạ)$/, "moc-soft"],
  [/^(đợi \d+ giây|lặp lại \d+|liên tục|lặp lại cho đến khi .+|nếu .+ thì|nếu không thì)$/, "bad-soft"],
  [/^hỏi “.+” và đợi$/, "ioe-soft"], [/^(đặt \S+ thành .+|thay đổi \S+ một lượng \d+)$/, "ok-soft"]];
const CO_THAN = /^(lặp lại \d+|liên tục|lặp lại cho đến khi .+|nếu .+ thì|nếu không thì)$/;
const docScratch = (svg) => {
  daDoc.add(svg);
  const T = TEXTS(svg), R = RECTS(svg), than = R.filter((r) => r.stroke === "none"), co = POLYS(svg), ln = LINES(svg);
  const hang = R.filter((r) => r.stroke !== "none").map((r) => {
    const chu = T.filter((t) => trong(t.at[0], t.at[1] - 5, r));
    assert.ok(chu.length <= 1, "mỗi lệnh một dòng chữ");
    const t = chu.length ? chu[0].t : null;
    if (t) {
      const g = NHOM.find(([re]) => re.test(t)); assert.ok(g, "lệnh lạ: " + t); assert.equal(r.fill, g[1], `màu của lệnh “${t}”`);
      assert.ok(r.h === 28 && r.rx === 6, `lệnh “${t}” cao 28, bo góc 6`); assert.ok(rong(chu[0]) + 10 <= r.w, `chữ “${t}” rộng quá lệnh`);
      assert.ok(chu[0].at[0] === r.x + 10 && chu[0].fs === 14, `chữ của lệnh “${t}” cỡ 14, cách mép trái 10`);
    } else assert.ok(r.h === 10 && r.fill === "bad-soft", "khối không chữ là thanh đóng của lệnh lặp, lệnh nếu");
    assert.ok(r.x + r.w <= 316, "lệnh nằm trong khung");
    return { x: r.x, y: r.y, h: r.h, w: r.w, t, r };
  }).sort((a, b) => a.y - b.y);
  assert.equal(T.length, hang.filter((h) => h.t).length + 0, "chữ nào cũng nằm trong một lệnh");
  // lá cờ của lệnh Khi bấm vào
  const mu = hang[0];
  assert.equal(mu.t, "Khi bấm vào", "chương trình bắt đầu bằng lệnh Khi bấm vào");
  assert.equal(co.length, 1, "hình có đúng một lá cờ"); assert.equal(co[0].fill, "ok", "lá cờ xanh");
  assert.ok(co[0].p.every(([x, y]) => trong(x, y, mu.r)), "lá cờ nằm trong lệnh Khi bấm vào");
  const x0 = Math.min(...co[0].p.map((p) => p[0])), can = ln.filter((l) => l.stroke === "ok");
  assert.ok(can.length === 1 && can[0].a[0] === x0 && can[0].b[0] === x0 && trong(x0, can[0].a[1], mu.r) && trong(x0, can[0].b[1], mu.r), "lá cờ có cán");
  assert.ok(mu.x + 10 + rong({ t: mu.t, fs: 14 }) <= x0, "lá cờ ở bên phải chữ");
  // các lệnh xếp liền nhau: lệnh sau cách lệnh trước 3 (sau thanh đóng cũng vậy)
  hang.slice(1).forEach((h, i) => assert.equal(h.y, hang[i].y + hang[i].h + 3, "các lệnh xếp liền nhau thành một khối"));
  // thân chữ C (như hình của sách): nối đáy của lệnh lặp, lệnh nếu hay “nếu không thì” với thanh ngay dưới cùng cột
  const coThan = hang.filter((h) => h.t && CO_THAN.test(h.t));
  assert.equal(than.length, coThan.length, "mỗi lệnh lặp, lệnh nếu, “nếu không thì” có một thân chữ C");
  than.forEach((r) => {
    const x = r.x - 1, y1 = r.y + 3, y2 = y1 + r.h - 6;
    assert.ok(r.fill === "bad-soft" && r.w === 17, "thân chữ C cùng màu lệnh Điều khiển, rộng 17");
    assert.ok(coThan.some((h) => h.x === x && h.y + h.h === y1), "thân chữ C bắt đầu ngay dưới lệnh lặp, lệnh nếu");
    assert.ok(hang.some((h) => h.x === x && h.y === y2 && (!h.t || h.t === "nếu không thì")), "thân chữ C kết thúc ở thanh dưới cùng cột");
    assert.ok(ln.some((l) => l.a[0] === x && l.b[0] === x && l.a[1] === y1 - 3 && l.b[1] === y2 + 3) && ln.some((l) => l.a[0] === x + 18 && l.b[0] === x + 18 && l.a[1] === y1 && l.b[1] === y2), "thân chữ C có hai đường viền dọc");
  });
  assert.equal(ln.length, 1 + 2 * than.length, "không có đường thừa");
  hang.forEach((h) => { h.d = (h.x - 10) / 18; assert.ok(Number.isInteger(h.d) && h.d >= 0, "lệnh lùi vào bội của 18"); });
  let i = 0;
  const doc = (d) => {
    const list = [];
    while (i < hang.length && hang[i].d >= d) {
      const h = hang[i];
      assert.equal(h.d, d, "lệnh lùi vào sai chỗ: " + h.t);
      if (!h.t || h.t === "nếu không thì") break;
      i++;
      const b = { t: h.t };
      if (CO_THAN.test(h.t)) {
        b.body = doc(d + 1); assert.ok(b.body.length, "lệnh " + h.t + " có lệnh bên trong");
        if (hang[i] && hang[i].t === "nếu không thì") { assert.ok(/^nếu .+ thì$/.test(h.t), "chỉ lệnh nếu có phần nếu không thì"); i++; b.els = doc(d + 1); }
        assert.ok(hang[i] && !hang[i].t && hang[i].d === d, "lệnh " + h.t + " có thanh đóng"); i++;
      }
      list.push(b);
    }
    return list;
  };
  const prog = doc(0);
  assert.equal(i, hang.length, "đọc hết các lệnh");
  assert.equal(prog.filter((b) => b.t === "Khi bấm vào").length, 1, "một lệnh Khi bấm vào");
  return prog;
};
/* Tính một giá trị, biểu thức như chữ trong lệnh: số, “chữ”, tên biến, trả lời; a + b, a − b, a * b, a / b, a chia lấy dư b; so sánh a < b,
   a > b, a = b (đúng/sai). Lấy ngẫu nhiên trả về null (không tính trước được). */
const tinh = (s, bien, traLoi) => {
  s = String(s).trim(); let m;
  if ((m = /^“(.*)”$/.exec(s))) return m[1];
  if ((m = /^(.+?) (<|>|=) (.+)$/.exec(s))) { const a = tinh(m[1], bien, traLoi), b = tinh(m[3], bien, traLoi); return { "<": +a < +b, ">": +a > +b, "=": String(a) === String(b) }[m[2]]; }
  if (/^lấy ngẫu nhiên từ \d+ đến \d+$/.test(s)) return null;
  if ((m = /^(.+) chia lấy dư (.+)$/.exec(s))) return tinh(m[1], bien, traLoi) % tinh(m[2], bien, traLoi);
  if ((m = /^(.+) ([+\-−*/]) (.+)$/.exec(s))) { const a = +tinh(m[1], bien, traLoi), b = +tinh(m[3], bien, traLoi); return { "+": a + b, "-": a - b, "−": a - b, "*": a * b, "/": a / b }[m[2]]; }
  if (/^\d+$/.test(s)) return +s;
  if (s === "trả lời") { assert.ok(traLoi != null, "chưa có câu trả lời"); return traLoi; }
  assert.ok(Object.prototype.hasOwnProperty.call(bien, s), "biến chưa có giá trị: " + s);
  return bien[s];
};
/* Chạy chương trình. moi: { nhap: [câu trả lời gõ vào], chuot(lượt), phim(lượt), cham(lượt): đúng/sai theo lượt lặp (lượt đếm chung mọi lệnh
   lặp, từ 1), luot: số lượt của lệnh liên tục (mặc định 20), toiDa: số lượt tối đa của lệnh lặp lại cho đến khi }. Trả về các việc nhân vật
   làm theo thứ tự (viec), số bước đã đi (di), giá trị các biến (bien), số lần mỗi lệnh chạy (dem), số lần kiểm tra điều kiện (kiemTra). */
const chay = (prog, moi = {}) => {
  const bien = {}, viec = [], dem = new Map(), nhap = [].concat(moi.nhap || []);
  let traLoi = null, di = 0, luot = 0, buoc = 0, kiemTra = 0;
  const dk = (s) => {
    kiemTra++; let m;
    if (s === "chuột được nhấn?") return !!(moi.chuot && moi.chuot(luot));
    if ((m = /^phím (.+) được bấm\?$/.exec(s))) return !!(moi.phim && moi.phim(luot, m[1]));
    if ((m = /^đang chạm (.+)\?$/.exec(s))) return !!(moi.cham && moi.cham(luot, m[1]));
    return assert.fail("điều kiện lạ: " + s);
  };
  const run = (list) => list.forEach((b) => {
    assert.ok(++buoc < 5000, "chương trình chạy quá lâu");
    dem.set(b, (dem.get(b) || 0) + 1);
    let m;
    if (b.t === "Khi bấm vào") return;
    if ((m = /^di chuyển (\d+) bước$/.exec(b.t))) { di += +m[1]; viec.push("di " + m[1]); }
    else if ((m = /^đợi (\d+) giây$/.exec(b.t))) viec.push("đợi " + m[1]);
    else if (b.t === "trang phục kế tiếp") viec.push("đổi trang phục");
    else if (b.t === "bật lại nếu chạm cạnh" || b.t === "đi tới con trỏ chuột" || b.t === "bỏ các hiệu ứng đồ hoạ") viec.push(b.t);
    else if ((m = /^nói (.+?)(?: trong (\d+) giây)?$/.exec(b.t))) viec.push("nói " + tinh(m[1], bien, traLoi));
    else if ((m = /^hỏi “(.+)” và đợi$/.exec(b.t))) { assert.ok(nhap.length, "thiếu câu trả lời gõ vào"); traLoi = String(nhap.shift()); viec.push("hỏi"); }
    else if ((m = /^đặt (\S+) thành (.+)$/.exec(b.t))) bien[m[1]] = tinh(m[2], bien, traLoi);
    else if ((m = /^thay đổi (\S+) một lượng (\d+)$/.exec(b.t))) { assert.ok(m[1] in bien, "biến chưa có giá trị: " + m[1]); bien[m[1]] = +bien[m[1]] + +m[2]; }
    else if ((m = /^lặp lại (\d+)$/.exec(b.t))) for (let k = 0; k < +m[1]; k++) { luot++; run(b.body); }
    else if (b.t === "liên tục") for (let k = 0; k < (moi.luot || 20); k++) { luot++; run(b.body); }
    else if ((m = /^lặp lại cho đến khi (.+)$/.exec(b.t))) { let k = 0; while (!dk(m[1])) { assert.ok(++k <= (moi.toiDa || 200), "lặp mãi"); luot++; run(b.body); } }
    else if ((m = /^nếu (.+) thì$/.exec(b.t))) { if (dk(m[1])) run(b.body); else if (b.els) run(b.els); }
    else assert.fail("lệnh chưa chạy được: " + b.t);
  });
  run(prog);
  return { viec, di, bien, dem, kiemTra };
};
const khoi = (prog, t) => { const r = []; (function tim(l) { l.forEach((b) => { if (b.t === t) r.push(b); if (b.body) tim(b.body); if (b.els) tim(b.els); }); })(prog); assert.equal(r.length, 1, "có đúng một lệnh “" + t + "”"); return r[0]; };
const chep = (prog) => JSON.parse(JSON.stringify(prog));

/* Biểu thức lồng nhau (Tin học 5 Bài 15, Hình 97): mỗi khối phép toán là một hình viên thuốc tô ok-soft (rx bằng nửa chiều cao); số nằm
   trong ô hình viên thuốc tô surface; dấu phép toán là chữ nằm trực tiếp trong khối. Khối nằm trong khối khác là một vế của khối ngoài.
   Trả về { gt: giá trị (khối trong tính trước), chu: biểu thức viết có ngoặc }. */
const docBieuThuc = (svg) => {
  daDoc.add(svg);
  const R = RECTS(svg), T = TEXTS(svg), vien = (r) => close(2 * r.rx, r.h);
  const khoiPT = R.filter((r) => r.fill === "ok-soft" && vien(r)), o = R.filter((r) => r.fill === "surface" && vien(r));
  assert.equal(khoiPT.length + o.length, R.length, "mọi hình chữ nhật là khối phép toán hoặc ô số");
  const chua = (a, b) => b.x > a.x && b.x + b.w < a.x + a.w && b.y > a.y && b.y + b.h < a.y + a.h;
  const sau = (r) => khoiPT.filter((k) => k !== r && chua(k, r)).length; // số khối bao quanh
  const ngoai = khoiPT.filter((k) => sau(k) === 0); assert.equal(ngoai.length, 1, "một khối ngoài cùng");
  const gt = (k) => {
    const con = khoiPT.filter((c) => chua(k, c) && sau(c) === sau(k) + 1).map((c) => { const v = gt(c); return { x: c.x, v: { gt: v.gt, chu: "(" + v.chu + ")" } }; });
    const so = o.filter((r) => chua(k, r) && khoiPT.filter((c) => chua(c, r)).length === sau(k) + 1).map((r) => {
      const t = T.filter((x) => trong(x.at[0], x.at[1] - 5, r)); assert.equal(t.length, 1, "mỗi ô một số"); assert.ok(/^\d+$/.test(t[0].t)); return { x: r.x, v: { gt: +t[0].t, chu: t[0].t } }; });
    const dau = T.filter((x) => trong(x.at[0], x.at[1] - 5, k) && !o.some((r) => trong(x.at[0], x.at[1] - 5, r)) && !khoiPT.some((c) => c !== k && chua(k, c) && trong(x.at[0], x.at[1] - 5, c)));
    assert.equal(dau.length, 1, "mỗi khối một dấu phép toán"); assert.ok(/^[+−*/]$/.test(dau[0].t), "dấu phép toán lạ: " + dau[0].t);
    const ve = con.concat(so).sort((a, b) => a.x - b.x); assert.equal(ve.length, 2, "mỗi khối hai vế");
    assert.ok(ve[0].x < dau[0].at[0] && dau[0].at[0] < ve[1].x, "dấu nằm giữa hai vế");
    const [a, b] = ve.map((v) => v.v), d = dau[0].t;
    return { gt: { "+": a.gt + b.gt, "−": a.gt - b.gt, "*": a.gt * b.gt, "/": a.gt / b.gt }[d], chu: [a.chu, d, b.chu].join(" ") };
  };
  return gt(ngoai[0]);
};
/* Sơ đồ các bước (như tests/tincn5-ck1.js): các ô chữ nhật từ trên xuống, chữ của mỗi ô (một hay hai dòng, căn giữa) nằm trong ô; giữa hai ô
   liền nhau một đoạn dọc từ đáy ô trên và một đầu tam giác chạm đỉnh ô dưới; ô “?” tô màu sun-soft. Trả về chữ các ô theo thứ tự. */
const docBuoc = (svg) => {
  daDoc.add(svg);
  const o = RECTS(svg).sort((a, b) => a.y - b.y), tx = TEXTS(svg);
  const chu = o.map((r) => {
    const t = tx.filter((x) => trong(x.at[0], x.at[1], r)).sort((a, b) => a.at[1] - b.at[1]);
    assert.ok(t.length && t.every((x) => x.anchor === "middle" && close(x.at[0], r.x + r.w / 2)), "ô nào cũng có chữ căn giữa");
    const s = t.map((x) => x.t).join(" ");
    assert.equal(r.fill === "sun-soft", s === "?", "chỉ ô “?” tô màu sun-soft");
    return s;
  });
  assert.equal(sum(o.map((r) => tx.filter((x) => trong(x.at[0], x.at[1], r)).length)), tx.length, "chữ nào cũng nằm trong một ô");
  const ln = LINES(svg), dau = POLYS(svg).filter((g) => g.p.length === 3);
  assert.equal(ln.length, o.length - 1, "giữa hai ô liền nhau một đoạn nối"); assert.equal(dau.length, o.length - 1, "mỗi đoạn nối một đầu mũi tên");
  o.slice(1).forEach((r, i) => {
    const tren = o[i], cx = r.x + r.w / 2;
    assert.ok(ln.some((l) => l.a[0] === cx && l.b[0] === cx && close(Math.min(l.a[1], l.b[1]), tren.y + tren.h) && Math.max(l.a[1], l.b[1]) < r.y), `có đoạn nối từ ô “${chu[i]}” xuống ô dưới`);
    assert.ok(dau.some((g) => { const d = g.p.reduce((a, p) => (p[1] > a[1] ? p : a)); return close(d[0], cx) && close(d[1], r.y) && g.p.every((p) => p[1] <= d[1]); }), `mũi tên chỉ xuống ô “${chu[i + 1]}”`);
  });
  return chu;
};

/* ---------- bảng tra (theo sách Tin học 5, Công nghệ 5 in năm 2026) ---------- */
// Tin học 5: nhóm lệnh của các lệnh (Bài 10–13, 16), nút tạo biến (Bài 14, Hình 89), hộp kiểm hiện giá trị của biến (Hình 87, 90), lệnh trả
// nhân vật về màu ban đầu (Bài 13), ba câu hỏi kịch bản trả lời (Bài 16: nhân vật, sân khấu, hành động)
const NHOM_TEN = { "lặp lại": "Điều khiển", "liên tục": "Điều khiển", "lặp lại cho đến khi": "Điều khiển", "đợi": "Điều khiển", "di chuyển": "Chuyển động",
  "nói": "Hiển thị", "Khi bấm vào": "Sự kiện" };
const NUT_TAO_BIEN = "Tạo một biến";
const VE_MAU_CU = "bỏ các hiệu ứng đồ hoạ";
const KICH_BAN = [[/có .+ và .+/, /nhân vật nào/], [/sân khấu là/, /sân khấu nào/], [/theo con trỏ chuột|chạm/, /hành động/]];
// Công nghệ 5 Bài 7 (tr. 32–37): bộ phận chính của mô hình xe điện (Hình 1); bảng chi tiết, vật liệu và dụng cụ (tr. 33–34); tấm 2 lỗ cố định
// động cơ, băng dính 2 mặt cố định giá pin; dây đỏ nối cực dương, dây đen nối cực âm của động cơ; lắp pin khi công tắc mở, đúng cực; bốn bước
const BO_PHAN_XE = ["khung xe", "trục và bánh xe", "động cơ và hệ truyền động", "nguồn điện"];
const CHI_TIET_XE = { "Tấm lớn": 1, "Thanh chữ U dài": 2, "Thanh thẳng 3 lỗ": 4, "Trục thẳng dài": 2, "Bánh xe": 4, "Tấm 2 lỗ": 1, "Động cơ": 1, "Bánh đai": 1,
  "Đai truyền": 1, "Puli": 1, "Giá 2 pin tiểu": 1, "Pin tiểu 1,5 V": 2, "Đai ốc": 10, "Vít ngắn": 8, "Vít dài": 2, "Vòng hãm": 10, "Tua-vít": 1, "Cờ-lê": 1, "Băng dính 2 mặt": 1 };
const CO_DINH = { "Tấm 2 lỗ": "động cơ", "Băng dính 2 mặt": "giá pin (Bài 7), đèn LED lên khung giá đỡ (Bài 8, 9)", "Băng dính điện": "đèn LED với đầu dây dẫn điện" };
const DAY_DONG_CO = { "đỏ": "dương", "đen": "âm" };
const LAP_PIN = { congTac: "mở", cuc: "đúng" };
const BUOC_XE = [/^Lắp khung xe$/, /động cơ.*giá pin|giá pin.*động cơ/, /puli.*đai truyền.*bánh xe/, /pin.*công tắc.*chạy thử/];
// Bài 8 (tr. 38–43): gió là nguồn năng lượng có sẵn trong tự nhiên, không giới hạn, tạo ra điện không thải khí thải; bảng chi tiết (tr. 40–41);
// dây đỏ nối chân dài, dây đen nối chân ngắn của đèn LED; phiếu đánh giá sản phẩm; gió càng mạnh đèn LED càng sáng (bảng ghi chép tr. 43)
const CHI_TIET_GIO = { "Tấm lớn": 1, "Thanh chữ U dài": 2, "Thanh chữ U ngắn": 2, "Thanh chữ L dài": 2, "Thanh thẳng 3 lỗ": 2, "Máy phát điện cánh quạt và dây dẫn điện": 1,
  "Đèn LED": 1, "Đai ốc": 12, "Vít ngắn": 12 };
const DAY_LED = { "đỏ": "dài", "đen": "ngắn" };
const GIO = { coSan: true, khiThai: false };
const TIEU_CHI_GIO = ["đúng và đủ các bộ phận", "đúng hình dạng", "mối ghép chắc chắn", "dây dẫn điện gọn gàng", "đèn LED phát sáng khi cánh quạt quay",
  "độ sáng đèn LED thay đổi khi tốc độ gió thay đổi"];
// Bài 9 (tr. 44–50): tấm pin có thể làm từ chất độc hại, chi phí lưu trữ điện cao; bảng chi tiết (tr. 46–47); khung giá đỡ bốn thanh chữ U dài,
// bốn thanh chữ L dài, một thanh chữ U ngắn; ánh sáng chiếu vào tấm pin càng nhiều thì đèn càng sáng (bảng ghi chép tr. 49)
const CHI_TIET_MT = { "Tấm lớn": 1, "Thanh chữ U dài": 4, "Thanh chữ U ngắn": 1, "Thanh chữ L dài": 4, "Tấm pin mặt trời và dây dẫn điện": 1, "Đèn LED": 1,
  "Đai ốc": 9, "Vít ngắn": 9 };
const HAN_CHE_MT = { docHai: true, luuTruTon: true };
const motDung = (q, f) => { const d = q.o.map(f); assert.deepEqual(d.map(Boolean), q.o.map((o, i) => i === 0), "chỉ lựa chọn đầu khớp: " + q.q.slice(0, 50)); return q.o[0]; };
const SO = { "một": 1, "hai": 2, "ba": 3, "bốn": 4, "năm": 5, "sáu": 6, "bảy": 7, "tám": 8, "chín": 9, "mười": 10 };
// câu sắp xếp: thử mọi thứ tự, chỉ thứ tự của đáp án thoả “việc nào phải làm trước” (truoc: [ô sau, ô phải làm trước nó])
const hoanVi = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => hoanVi(a.slice(0, i).concat(a.slice(i + 1))).map((r) => [x].concat(r))));
const motThuTu = (q, nhan, truoc) => {
  const k = q.o.map((o) => { const t = nhan.filter(([, re]) => re.test(o)); assert.equal(t.length, 1, "nhận ra ô: " + o); return t[0][0]; });
  const dung = hoanVi(k).filter((p) => truoc.every(([a, b]) => p.indexOf(b) < p.indexOf(a)));
  assert.deepEqual(dung, [k], "chỉ một thứ tự đúng, là thứ tự của đáp án: " + q.q.slice(0, 50));
  return q.o;
};
// phân loại một công việc đời thường theo cấu trúc (Bài 10, 11, 13): lặp (làm lại một việc nhiều lần, đến khi), rẽ nhánh (nếu … thì), tuần tự
// (các việc làm lần lượt, mỗi việc một lần)
const cauTruc = (o) => (/^Nếu .+ thì .+, nếu không thì .+/.test(o) ? "rẽ nhánh dạng đủ" : /^Nếu .+ thì/.test(o) ? "rẽ nhánh dạng thiếu"
  : /cho đến khi|đủ \d+ (lần|vòng)|mỗi (ngày|tối)/.test(o) ? "lặp" : /[:,].+(,| rồi )/.test(o) ? "tuần tự" : assert.fail("không phân loại được: " + o));

/* ---------- kiểm tra từng câu: id (đề), has (chữ có trong đề bài), right(q) (đáp án tính bằng code) ---------- */
const CHECKS = [
  // ----- Đề 1, Tin học -----
  { id: S.de1, has: "được làm theo cấu trúc tuần tự", right: (q) => motDung(q, (o) => cauTruc(o) === "tuần tự") },
  { id: S.de1, has: "Khối lệnh của Bình có đúng hai lệnh đó", right: (q) => {
    const m = /Khối lệnh của An: (nói “.+” trong \d+ giây), rồi (di chuyển \d+ bước)\./.exec(q.q); assert.ok(m, "đọc được khối lệnh của An");
    const an = chay([{ t: "Khi bấm vào" }, { t: m[1] }, { t: m[2] }]), binh = chay([{ t: "Khi bấm vào" }, { t: m[2] }, { t: m[1] }]);
    const truoc = (r) => (r.viec[0].startsWith("nói") ? "chào" : "đi");
    const dung = (o) => { let k;
      if ((k = /^An: (chào|đi) rồi mới (chào|đi); Bình: (chào|đi) rồi mới (chào|đi)$/.exec(o))) return k[1] === truoc(an) && k[3] === truoc(binh);
      if (/đi được xa hơn/.test(o)) return binh.di > an.di;
      if (/^Chỉ có mèo của Bình nói/.test(o)) return !an.viec.some((v) => v.startsWith("nói"));
      if (/giống hệt nhau/.test(o)) return JSON.stringify(an.viec) === JSON.stringify(binh.viec);
      return assert.fail("không đọc được lựa chọn: " + o); };
    return motDung(q, dung); } },
  { id: S.de1, has: "Ba lệnh lặp của Scratch", right: (q) => {
    const lenh = ["lặp lại", "liên tục", "lặp lại cho đến khi"]; assert.ok(lenh.every((l) => q.q.includes(l)), "đề bài kể đủ ba lệnh lặp");
    const nhom = [...new Set(lenh.map((l) => NHOM_TEN[l]))]; assert.equal(nhom.length, 1);
    assert.ok(q.o.every((o) => Object.values(NHOM_TEN).includes(o)), "lựa chọn là tên nhóm lệnh"); return nhom[0]; } },
  { id: S.de1, has: "Chạy khối lệnh ở hình. Mỗi ý sau đúng hay sai?", right: (q) => {
    const P = docScratch(q.svg), r = chay(P), lap = P.find((b) => /^lặp lại \d+$/.test(b.t));
    return q.o.map((o) => { let m;
      if ((m = /^Lệnh (.+) được thực hiện (\d+) lần\.$/.exec(o))) return r.dem.get(khoi(P, m[1])) === +m[2];
      if ((m = /^Mèo nói “(.+)” (\d+) lần, sau mỗi lượt lặp\.$/.exec(o))) return r.viec.filter((v) => v === "nói " + m[1]).length === +m[2];
      if ((m = /^Nếu không dùng lệnh lặp, phải ghép (\d+) lệnh nối tiếp nhau thay cho lệnh lặp này\.$/.exec(o))) return lap.body.length * +/\d+/.exec(lap.t)[0] === +m[1];
      if ((m = /^Lệnh (.+) chỉ chạy một lần vì nằm ngoài lệnh lặp\.$/.exec(o))) return !lap.body.includes(khoi(P, m[1])) && r.dem.get(khoi(P, m[1])) === 1;
      return assert.fail("không đọc được ý: " + o); }); } },
  { id: S.de1, has: "Chó đi tất cả bao nhiêu bước?", right: (q) => { const r = chay(docScratch(q.svg)); assert.equal(q.unit, "bước"); return r.di; } },
  { id: S.de1, has: "Câu nói nào có cấu trúc rẽ nhánh dạng đủ?", right: (q) => motDung(q, (o) => cauTruc(o) === "rẽ nhánh dạng đủ") },
  { id: S.de1, has: "rồi không bấm phím nào. Mèo làm gì?", right: (q) => {
    const P = docScratch(q.svg), khong = chay(P, { phim: () => false, luot: 30 }), co = chay(P, { phim: () => true, luot: 30 });
    assert.ok(co.di > 0, "bấm phím thì mèo đi"); assert.equal(khong.di, 0);
    return motDung(q, (o) => o === "Đứng yên tại chỗ" && khong.di === 0); } },
  { id: S.de1, has: "Trong nhóm lệnh Các biến số, bạn nháy vào nút nào?", right: () => NUT_TAO_BIEN },
  { id: S.de1, has: "(Sao là một biến). Mèo nói số nào?", right: (q) => { const r = chay(docScratch(q.svg)); assert.equal(r.viec.filter((v) => v.startsWith("nói")).length, 1); return r.viec.find((v) => v.startsWith("nói")).slice(4); } },
  { id: S.de1, has: "hai khối phép toán lồng nhau", right: (q) => {
    const b = docBieuThuc(q.svg); assert.ok(q.x.includes(b.chu.replace(/^\((.+)\) /, "$1 = ").split(" = ")[0]), "lời giải tính khối bên trong trước");
    const [, a, d, c, , e] = /^\((\d+) ([+−*/]) (\d+)\) ([+−*/]) (\d+)$/.exec(b.chu) || []; assert.ok(a, "biểu thức hai khối lồng nhau: " + b.chu);
    assert.ok(q.o.includes(String(+a - +c * +e)) || q.o.includes(String(+a * +e)), "có lựa chọn sai của cách tính không theo khối"); // 12 − 4 * 3, 12 * 3
    return String(b.gt); } },
  { id: S.de1, has: "(Xe, Bánh là hai biến), bạn gõ 7", right: (q) => { const r = chay(docScratch(q.svg), { nhap: ["7"] }); return +r.viec.find((v) => v.startsWith("nói")).slice(4); } },
  { id: S.de1, has: "Phần (3) của kịch bản cho biết điều gì?", right: (q) => {
    const phan = /\(3\) ([^;.]+)/.exec(q.q)[1], k = KICH_BAN.findIndex(([re]) => re.test(phan)); assert.equal(k, 2, "phần (3) là hành động của nhân vật");
    return motDung(q, (o) => KICH_BAN[k][1].test(o)); } },
  { id: S.de1, has: "điểm cứ tăng vùn vụt", right: (q) => {
    const P = docScratch(q.svg), luon = chay(P, { cham: () => true, luot: 30 }), mot = chay(P, { cham: (l) => l === 5, luot: 30 });
    assert.equal(luon.bien["Điểm"], 30, "thỏ còn chạm cà rốt thì lượt lặp nào cũng cộng 1"); assert.equal(mot.bien["Điểm"], 1, "chạm một lượt thì cộng 1");
    assert.ok(["đặt Điểm thành 0", "đi tới con trỏ chuột"].every((t) => khoi(P, t)), "lựa chọn sai nhắc lệnh có trong chương trình");
    return motDung(q, (o) => /lượt lặp nào cũng cộng thêm 1/.test(o)); } },
  // ----- Đề 1, Công nghệ -----
  { id: S.de1, has: "nguồn điện và bộ phận nào nữa?", right: (q) => {
    const con = BO_PHAN_XE.filter((b) => !low(q.q).includes(b)); assert.equal(con.length, 1, "đề bài kể ba bộ phận chính"); return motDung(q, (o) => low(o) === con[0]); } },
  { id: S.de1, has: "tấm 2 lỗ được dùng để làm gì?", right: (q) => motDung(q, (o) => o.includes(CO_DINH["Tấm 2 lỗ"]) && /khung xe/.test(o)) },
  { id: S.de1, has: "các bước lắp mô hình xe điện trong bài", right: (q) => {
    const b = docBuoc(q.svg), k = b.indexOf("?"); assert.equal(b.length, BUOC_XE.length, "sơ đồ có đủ bốn bước");
    b.forEach((s, i) => assert.ok(i === k || BUOC_XE[i].test(s), `ô thứ ${i + 1} đúng bước của sách: ${s}`));
    assert.ok(q.o.slice(1).every((o) => !BUOC_XE.some((re) => re.test(o))), "lựa chọn sai không là bước nào của bài");
    return motDung(q, (o) => BUOC_XE[k].test(o)); } },
  { id: S.de1, has: "Lớp còn thiếu bao nhiêu con vít?", right: (q) => {
    const m = /có (\d+) nhóm[\s\S]*cần (\d+) vít ngắn và (\d+) vít dài[\s\S]*có (\d+) con vít/.exec(q.q); assert.ok(m, "đọc được số liệu");
    assert.ok(+m[2] === CHI_TIET_XE["Vít ngắn"] && +m[3] === CHI_TIET_XE["Vít dài"], "số vít đúng bảng chi tiết"); return +m[1] * (+m[2] + +m[3]) - +m[4]; } },
  { id: S.de1, has: "chỗ nối giữa chân đèn LED và đầu dây dẫn điện được cố định bằng gì?", right: (q) => {
    assert.ok(q.o.every((o) => CO_DINH[o] || !/^Băng dính/.test(o)), "lựa chọn băng dính có trong bảng"); return motDung(q, (o) => (CO_DINH[o] || "").startsWith("đèn LED với đầu dây")); } },
  { id: S.de1, has: "không thải ra khí thải", right: () => GIO.khiThai === false },
  { id: S.de1, has: "Nối mỗi lần thử với trạng thái của đèn LED", right: (q) => {
    const gio = (l) => (/^Tắt quạt$/.test(l) ? 0 : /số nhỏ/.test(l) ? 1 : /số lớn/.test(l) ? 2 : assert.fail(l)), sang = (r) => (/không sáng/.test(r) ? 0 : /sáng yếu/.test(r) ? 1 : /sáng rõ/.test(r) ? 2 : null);
    assert.ok(q.r.slice(q.l.length).every((r) => sang(r) === null), "ô thừa không là độ sáng"); // gió càng mạnh đèn càng sáng
    return q.l.map((l) => q.r.find((r) => sang(r) === gio(l))); } },
  { id: S.de1, has: "cánh quạt quay nhanh nhưng đèn LED vẫn không sáng", right: (q) => motDung(q, (o) => /dây/.test(o) && /đèn LED/.test(o)) },
  { id: S.de1, has: "tấm pin mặt trời đã hỏng cần được thu gom", right: (q) => motDung(q, (o) => HAN_CHE_MT.docHai && /chất độc hại/.test(o)) },
  { id: S.de1, has: "bốn thanh chữ U dài dựng ở bốn góc", right: (q) => {
    assert.equal(SO[/có (\S+) thanh chữ U dài/.exec(q.q)[1]], CHI_TIET_MT["Thanh chữ U dài"], "số thanh chữ U dài đúng bảng chi tiết"); return motDung(q, (o) => /vững/.test(o)); } },
  { id: S.de1, has: "Đoạn đường ven sông ở xa khu dân cư", right: (q) => motDung(q, (o) => /dây điện/.test(o)) },
  { id: S.de1, has: "lắp và thử mô hình điện mặt trời", right: (q) => motThuTu(q,
    [["khung", /làm khung/], ["gắn", /^Gắn tấm pin/], ["thử", /quan sát đèn LED/], ["ghi", /^Ghi /]],
    [["gắn", "khung"], ["thử", "gắn"], ["ghi", "thử"]]) },
  // ----- Đề 2, Tin học -----
  { id: S.de2, has: "Nhờ đổi trang phục liên tiếp như vậy", right: (q) => motDung(q, (o) => /cử động|bước đi/.test(o)) },
  { id: S.de2, has: "Lan cần ghép thêm lệnh đợi 1 giây vào đâu", right: (q) => {
    const P = docScratch(q.svg);
    const dung = (o) => { const m = /^Ngay dưới lệnh (.+)$/.exec(o); assert.ok(m, "lựa chọn lạ: " + o);
      const Q = chep(P), k = Q.findIndex((b) => b.t === m[1] || b.t.startsWith(m[1] + " trong ")); assert.ok(k >= 0, "lựa chọn nhắc lệnh có trong khối: " + m[1]);
      Q.splice(k + 1, 0, { t: "đợi 1 giây" }); const v = chay(Q).viec, i = v.indexOf("di 40");
      return v[i + 1] === "đợi 1" && v[i + 2] === "nói Tới nơi rồi!"; };
    return motDung(q, dung); } },
  { id: S.de2, has: "Trong các việc sau, việc nào có cấu trúc lặp?", right: (q) => motDung(q, (o) => cauTruc(o) === "lặp") },
  { id: S.de2, has: "mèo nói “Mình dừng rồi!” vào lúc nào?", right: (q) => {
    const P = docScratch(q.svg);
    [1, 4, 9].forEach((p) => { const v = chay(P, { chuot: (l) => l >= p }).viec; assert.equal(v.filter((x) => x === "di 10").length, p, "mèo đi đến lượt lặp có nhấn chuột"); assert.equal(v[v.length - 1], "nói Mình dừng rồi!", "nhấn chuột thì mèo nói"); });
    assert.throws(() => chay(P, { chuot: () => false }), /lặp mãi/, "không nhấn chuột thì mèo đi mãi, không nói");
    return motDung(q, (o) => /nhấn chuột/.test(o)); } },
  { id: S.de2, has: "vịt chỉ đi 25 bước một lần", right: (q) => {
    const P = docScratch(q.svg), muon = [].concat(...Array(4).fill(["di 25", "đổi trang phục", "đợi 1"]));
    const sua = (o) => { const Q = chep(P), lap = Q.find((b) => /^lặp lại \d+$/.test(b.t)); let m;
      if (/^Kéo lệnh di chuyển (\d+) bước vào đầu bên trong lệnh lặp$/.test(o)) { const k = Q.findIndex((b) => /^di chuyển/.test(b.t)); lap.body.unshift(Q.splice(k, 1)[0]); }
      else if ((m = /^Đổi số lần lặp của lệnh lặp lại từ (\d+) thành (\d+) lần$/.exec(o))) lap.t = "lặp lại " + m[2];
      else if (/^Thay lệnh lặp lại \d+ bằng lệnh liên tục/.test(o)) lap.t = "liên tục";
      else if ((m = /^Xoá lệnh (đợi \d+ giây) nằm bên trong lệnh lặp lại \d+$/.exec(o))) lap.body = lap.body.filter((b) => b.t !== m[1]);
      else assert.fail("không đọc được cách sửa: " + o);
      return JSON.stringify(chay(Q).viec) === JSON.stringify(muon); };
    assert.notDeepEqual(chay(P).viec, muon, "khối lệnh chưa sửa chưa đúng ý Mai");
    return motDung(q, sua); } },
  { id: S.de2, has: "Lệnh nào đưa mèo trở về màu ban đầu?", right: () => VE_MAU_CU },
  { id: S.de2, has: "Khối lệnh ở hình đang chạy. Mỗi ý sau đúng hay sai?", right: (q) => {
    const P = docScratch(q.svg), nhan = chay(P, { chuot: () => true, luot: 5 }), khong = chay(P, { chuot: () => false, luot: 5 }), xen = chay(P, { chuot: (l) => l % 2 === 0, luot: 6 });
    const motViec = xen.viec.length === 6 && xen.viec.every((v, i) => v === (i % 2 ? "đổi trang phục" : "nói Nhấn chuột!"));
    const boLap = chay(P.filter((b) => b.t !== "liên tục").concat(khoi(P, "liên tục").body), { chuot: () => false });
    return q.o.map((o) => {
      if (/^Khi bạn đang nhấn chuột, mèo đổi sang trang phục kế tiếp\.$/.test(o)) return nhan.viec.filter((v) => v === "đổi trang phục").length === 5;
      if (/^Khi không nhấn chuột, mèo vẫn đổi trang phục\.$/.test(o)) return khong.viec.includes("đổi trang phục");
      if (/^Trong một lượt lặp, mèo vừa đổi trang phục vừa nói/.test(o)) return !motViec;
      if (/^Nếu bỏ lệnh liên tục, điều kiện chỉ được kiểm tra một lần\.$/.test(o)) return boLap.kiemTra === 1;
      return assert.fail("không đọc được ý: " + o); }); } },
  { id: S.de2, has: "Muốn giá trị của biến Điểm hiện trên sân khấu", right: (q) => motDung(q, (o) => /hộp kiểm/.test(o)) },
  { id: S.de2, has: "(Truyện là một biến), bạn gõ 5", right: (q) => { const r = chay(docScratch(q.svg), { nhap: ["5"] }); return r.viec.find((v) => v.startsWith("nói")).slice(4); } },
  { id: S.de2, has: "Biến a đang có giá trị 12, biến b đang có giá trị 30", right: (q) => { const bien = { a: 12, b: 30 }; return q.o.map((o) => tinh(o, bien)); } },
  { id: S.de2, has: "chưa đủ một nhóm?", right: (q) => {
    const k = +/từng nhóm (\d+) bạn/.exec(q.q)[1], sisi = Array.from({ length: 26 }, (_, i) => 20 + i);
    assert.ok(q.x.includes(": " + k + " = "), "lời giải có ví dụ chia cho " + k);
    return motDung(q, (o) => sisi.every((m) => tinh(o, { m }) === m % k)); } },
  { id: S.de2, has: "Viết kịch bản trước khi tạo chương trình", right: (q) => motDung(q, (o) => /cần làm gì/.test(o)) },
  { id: S.de2, has: "Sắp xếp các việc nhóm làm tiếp theo", right: (q) => motThuTu(q,
    [["chay", /^Nháy lá cờ xanh, chạy thử/], ["so", /^So kết quả/], ["sua", /^Tìm và sửa/], ["lai", /^Chạy lại/]],
    [["so", "chay"], ["sua", "so"], ["lai", "sua"]]) },
  // ----- Đề 2, Công nghệ -----
  { id: S.de2, has: "dây màu đỏ nối vào cực ___ của động cơ", right: () => DAY_DONG_CO["đỏ"] },
  { id: S.de2, has: "trong lúc công tắc đang đóng", right: () => LAP_PIN.congTac !== "mở" },
  { id: S.de2, has: "Nếu đai truyền bị tuột ra", right: (q) => { const dongCo = true, banhXe = false; // động cơ vẫn có điện; chuyển động không tới trục bánh xe
    return motDung(q, (o) => (/^Động cơ quay/.test(o) && dongCo) && (/bánh xe đứng yên/.test(o) && !banhXe)); } },
  { id: S.de2, has: "nhưng động cơ không quay, xe không chạy", right: (q) => motDung(q, (o) => /^Pin lắp đúng chiều/.test(o) && LAP_PIN.cuc === "đúng") },
  { id: S.de2, has: "gió là nguồn năng lượng như thế nào?", right: (q) => motDung(q, (o) => GIO.coSan && /có sẵn/i.test(o) && /không hết/.test(o)) },
  { id: S.de2, has: "dây màu đỏ được nối với chân ___ của đèn LED", right: () => DAY_LED["đỏ"] },
  { id: S.de2, has: "Vì sao không đặt máy phát nằm sát mặt bàn?", right: (q) => motDung(q, (o) => /cánh quạt không chạm mặt bàn/.test(o)) },
  { id: S.de2, has: "Đánh giá theo phiếu đánh giá sản phẩm", right: (q) => {
    const dat = { "đúng và đủ các bộ phận": /đủ các bộ phận/.test(q.q), "mối ghép chắc chắn": /mối ghép chắc chắn/.test(q.q), "dây dẫn điện gọn gàng": !/lòng thòng/.test(q.q) };
    return q.o.map((o) => { const m = /^Mô hình đạt tiêu chí (.+)\.$/.exec(o);
      if (m) { assert.ok(TIEU_CHI_GIO.includes(m[1]), "tiêu chí có trong phiếu đánh giá: " + m[1]); return dat[m[1]]; }
      if (/^Nhóm nên buộc gọn dây dẫn điện rồi thử lại\.$/.test(o)) return !dat["dây dẫn điện gọn gàng"];
      return assert.fail("không đọc được ý: " + o); }); } },
  { id: S.de2, has: "điều nào là một hạn chế khi dùng điện từ năng lượng mặt trời?", right: (q) => motDung(q, (o) => HAN_CHE_MT.luuTruTon && /^Lưu trữ điện/.test(o)) },
  { id: S.de2, has: "che mất một nửa tấm pin", right: (q) => motDung(q, (o) => o === "Sáng yếu hơn") }, // ít ánh sáng chiếu vào tấm pin thì đèn sáng yếu hơn
  { id: S.de2, has: "Vì sao số vít ngắn bằng số đai ốc?", right: (q) => {
    const m = /có (\d+) vít ngắn và (\d+) đai ốc/.exec(q.q); assert.ok(+m[1] === CHI_TIET_MT["Vít ngắn"] && +m[2] === CHI_TIET_MT["Đai ốc"], "số vít, đai ốc đúng bảng chi tiết");
    return motDung(q, (o) => /^Mỗi mối ghép/.test(o)); } },
  { id: S.de2, has: "Trời nhiều mây, không có nắng", right: (q) => motDung(q, (o) => /đèn bàn/.test(o)) }, // tấm pin tạo ra điện khi có ánh sáng chiếu vào
];
let n = 0;
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = ten.get(q) + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  assert.ok(!checked.has(q), at + ": câu đã có kiểm tra khác");
  const want = c.right(q);
  const got = { mc: () => q.o[0], fill: () => q.ans[0], num: () => q.ans, tf: () => q.a, tf4: () => q.a, order: () => q.o, match: () => q.r.slice(0, q.l.length) }[q.type]();
  assert.ok(want !== undefined, at + ": không tính được đáp án");
  if (Array.isArray(want)) assert.deepEqual(got, want, at);
  else assert.ok(typeof want === "number" ? close(got, want) : got === want, `${at}: đáp án ${JSON.stringify(got)}, tính được ${JSON.stringify(want)}`);
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": lựa chọn sai trùng đáp án đúng");
  checked.add(q); n++;
});
assert.equal(checked.size, kho.length, "câu nào trong kho cũng có kiểm tra");
kho.filter((q) => q.svg).forEach((q) => {
  assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)); chuHinh(q.svg, ten.get(q));
  const r = Quiz.svg(q.svg); assert.ok(r.svg && !r.problems.length, "bộ lọc hình bỏ bớt: " + q.q.slice(0, 40));
});
// bộ đọc hình, bộ chạy thử bắt được hình vẽ sai: màu nhóm lệnh, lệnh lùi sai chỗ, thiếu thân chữ C, thiếu lá cờ; biểu thức đọc đúng thứ tự
{ const tim = (has) => kho.find((q) => q.q.includes(has)).svg;
  const lap = tim("Chạy khối lệnh ở hình. Mỗi ý sau đúng hay sai?"), neu = tim("Khối lệnh ở hình đang chạy"), bt = tim("hai khối phép toán lồng nhau"), b = tim("các bước lắp mô hình xe điện");
  assert.throws(() => docScratch(lap.replace('fill="acc-soft"', 'fill="moc-soft"')), /màu của lệnh/);
  assert.throws(() => docScratch(lap.replace(/<rect x="28" y="68"([^>]*)\/><text x="38"/, '<rect x="10" y="68"$1/><text x="20"')), /có lệnh bên trong/);
  assert.throws(() => docScratch(lap.replace(/<rect x="11" [^>]*stroke="none"\/>/, "")), /thân chữ C/);
  assert.throws(() => docScratch(lap.replace(/<polygon [^>]*\/>/, "")), /lá cờ/);
  assert.throws(() => docScratch(neu.replace(">nếu không thì<", ">nếu không<")), /lệnh lạ/);
  const P = docScratch(lap); assert.deepEqual(P.map((x) => x.t), ["Khi bấm vào", "lặp lại 3", "nói “Xong!” trong 2 giây"], "bộ đọc tự thử: ba lệnh ở mức ngoài");
  assert.deepEqual(khoi(P, "lặp lại 3").body.map((x) => x.t), ["di chuyển 15 bước", "trang phục kế tiếp", "đợi 1 giây"], "bộ đọc tự thử: ba lệnh trong lệnh lặp");
  assert.equal(chay(P).di, 45, "bộ chạy tự thử: 3 × 15 bước");
  assert.deepEqual(docBieuThuc(bt), { gt: 24, chu: "(12 − 4) * 3" }, "bộ đọc biểu thức tự thử");
  assert.throws(() => docBieuThuc(bt.replace('<rect x="54" y="16" width="132" height="32" rx="16" fill="ok-soft"/>', "")), /dấu phép toán|hai vế/, "bỏ khối bên trong thì bộ đọc báo");
  assert.equal(tinh("12 chia lấy dư 5", {}), 2, "bộ tính tự thử: 12 chia lấy dư 5"); assert.equal(tinh("a + b > 40", { a: 12, b: 30 }), true, "bộ tính tự thử: so sánh có phép cộng");
  assert.throws(() => docBuoc(b.replace(/points="154,(\d+) 166,\1 160,(\d+)"/, (m, a, c) => `points="154,${c} 166,${c} 160,${a}"`)), /mũi tên chỉ xuống/); }

/* ---------- mức độ và ma trận ---------- */
const M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), pool.n, "tổng ma trận bằng n");
assert.ok(CHU_DE.every((t) => /^(Tin học|Công nghệ) · /.test(t)), "chủ đề có tiền tố “Tin học · ” hoặc “Công nghệ · ”");
const phan = (pre) => sum(CHU_DE.filter((t) => t.startsWith(pre)).map((t) => sum(M[t])));
assert.deepEqual([phan("Tin học · "), phan("Công nghệ · ")], [13, 12], "13 câu Tin học, 12 câu Công nghệ như kho cuối kì I");
assert.deepEqual(CHU_DE.map((t) => t.replace(/^(Tin học|Công nghệ) · /, "")), ["Cấu trúc tuần tự", "Cấu trúc lặp", "Thực hành sử dụng lệnh lặp", "Cấu trúc rẽ nhánh",
  "Sử dụng biến trong chương trình", "Sử dụng biểu thức trong chương trình", "Từ kịch bản đến chương trình", "Lắp ráp mô hình xe điện chạy bằng pin",
  "Mô hình máy phát điện gió", "Mô hình điện mặt trời"], "chủ đề theo tên Bài 10–16 của Tin học 5 và Bài 7–9 của Công nghệ 5 (mục lục trong README của hai cuốn ở OnUp-Book)");
CHU_DE.forEach((t) => assert.ok(("chu-de:5:tincn:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
DE.forEach((id) => {
  const d = bank(id).questions;
  assert.deepEqual([...new Set(d.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, theo thứ tự của ma trận");
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `${id} đúng ma trận ở chủ đề ${t}`));
});
// ô rút k câu có đúng 2k câu, k câu ở mỗi đề (Tin học: ô rút 1 câu; Công nghệ chỉ có ba bài nên có ô rút 2 câu)
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = kho.filter((q) => q.topic === t && q.lv === l);
  DE.forEach((id) => assert.equal(o.filter((q) => q.src === id).length, v[l - 1], `ô (${t}, mức ${l}): ${v[l - 1]} câu ở ${id}`));
  assert.ok(v[l - 1] <= (t.startsWith("Tin học") ? 1 : 2), `ô (${t}, mức ${l}) rút nhiều nhất ${t.startsWith("Tin học") ? 1 : 2} câu`);
}));
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 2 && !kho.some((q) => q.type === "essay"), "ít nhất 2 câu đúng/sai 4 ý, không có câu tự luận");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.equal(Math.max(...Object.values(kieu)), 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
["match", "order", "fill", "num", "tf", "tf4"].forEach((t) => assert.ok(kho.some((q) => q.type === t), "kho có câu dạng " + t));
kho.filter((q) => q.type === "order").forEach((q) => assert.ok(q.o.length >= 4 && new Set(q.o).size === q.o.length, "câu sắp xếp có ít nhất 4 ô khác nhau"));
// nối cột: mỗi ô bên phải chỉ một ô bên trái, có một ô thừa; không nối được chỉ nhờ chữ trùng
{ const tu = (s) => new Set(low(s).split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 1));
  kho.filter((q) => q.type === "match").forEach((q) => {
    assert.equal(new Set(q.r).size, q.r.length); assert.equal(q.r.length, q.l.length + 1, "nối cột có một ô thừa");
    q.l.forEach((l, i) => assert.deepEqual([...tu(l)].filter((w) => tu(q.r[i]).has(w)), [], `cặp nối “${l} → ${q.r[i]}” có chữ trùng`));
  }); }
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2) và không hay là lựa chọn dài nhất hay ngắn nhất: mỗi kiểu không quá một phần ba
// và không dưới một phần sáu số câu nhiều lựa chọn (Rút ra N9-ck1-tin-congnghe, N5-ck1-ta)
const mcs = kho.filter((q) => q.type === "mc"), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
mcs.forEach((q) => { const m = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60)); assert.equal(new Set(q.o).size, q.o.length); });
const daiNhat = mcs.filter((q) => hon(q, (a, b) => a > b)).length, nganNhat = mcs.filter((q) => hon(q, (a, b) => a < b)).length;
[[daiNhat, "dài nhất"], [nganNhat, "ngắn nhất"]].forEach(([k, s]) => assert.ok(k <= mcs.length / 3 && k >= mcs.length / 6, `đáp án đúng là lựa chọn ${s} ở ${k}/${mcs.length} câu nhiều lựa chọn`));
DE.forEach((id) => { const d = mcs.filter((q) => q.src === id); [(a, b) => a > b, (a, b) => a < b].forEach((f) => assert.ok(d.filter((q) => hon(q, f)).length <= d.length / 3, id + ": đáp án đúng dài nhất hay ngắn nhất ở quá một phần ba số câu")); });
// ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
const cungDau = (q) => { const dau = (s) => String(s).trim().split(/\s+/)[0].toLowerCase(), w = q.o.slice(1).map(dau); return w.every((x) => x === w[0]) && dau(q.o[0]) !== w[0]; };
assert.ok(cungDau({ o: ["Đứng yên", "Đi A", "Đi B", "đi C"] }) && !cungDau({ o: ["Như A", "Như B", "Như C", "Như D"] }) && !cungDau({ o: ["A", "Đi B", "Để C", "Đi D"] }), "bộ dò lựa chọn cùng mở đầu tự thử");
mcs.forEach((q) => assert.ok(!cungDau(q), "ba lựa chọn sai cùng mở đầu một chữ, đáp án đúng thì không: " + q.q.slice(0, 60)));
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
{ const phanNhan = (t) => t.replace(/^(Tin học|Công nghệ) · /, "").split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
  kho.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => {
    if (low(d).includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => low(o).includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); }); }
// lời giải không nhắc vị trí phương án; gọi người làm bài là “bạn”; chữ như sách; không tên hãng
const HANG = /\b(Samsung|Apple|iPhone|Nokia|Oppo|OPPO|Xiaomi|Vivo|Realme|Huawei|Panasonic|Toshiba|Sharp|LG|Electrolux|Aqua|Hitachi|Sanyo|Sony|Casio|Bphone|Lego|LEGO|Duracell|Energizer)\b/;
const chuCau = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans)).join(" ");
kho.forEach((q) => {
  assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50));
  const C = chuCau(q);
  assert.ok(!/(^|[^\p{L}])em([^\p{L}]|$)/u.test(C.replace(/trẻ em/giu, "")), "gọi người làm bài là “bạn”, không “em”: " + q.q.slice(0, 50));
  assert.ok(!/hóa|họa|thủy|khỏe|tùy|hòa|thỏa|xóa|xòe/u.test(C), "viết “hoá”, “hoạ”, “thuỷ”, “khoẻ”, “tuỳ”, “hoà”, “thoả”, “xoá”, “xoè” như sách: " + q.q.slice(0, 50));
  assert.ok(!HANG.test(C), "không nhắc tên hãng: " + q.q.slice(0, 50));
  assert.ok(!/Tổng cục|(^|[^\p{L}])huyện([^\p{L}]|$)|63 tỉnh/u.test(C), "tên cơ quan, địa danh như sách in năm 2026: " + q.q.slice(0, 50));
});
// lời dặn: phạm vi, phần B của Chủ đề 5, đề cương của trường, đề chung của Sở, số câu từng môn, từng mức
DE.forEach((id) => { const t = bank(id).note;
  assert.ok(/Bài 10–16/.test(t) && /Bài 8B, 9B/.test(t) && /Bài 7–9/.test(t) && /đề cương của trường/.test(t) && /Sở GD&ĐT ra đề chung cuối kì một số môn lớp 5/.test(t), id + ": note ghi phạm vi, phần B, đề cương của trường, đề chung của Sở");
  assert.ok(t.includes("13 câu") && t.includes("12 câu") && t.includes("10 câu mức Biết, 8 câu mức Hiểu, 7 câu mức Vận dụng"), id + ": note ghi số câu từng môn, từng mức"); });
const seen = new Set();
const thuRut = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, pool.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, "rút đúng ma trận ở chủ đề " + t));
  return d;
};
for (let k = 0; k < 400; k++) thuRut().questions.forEach((q) => seen.add(Quiz.key(q)));
assert.equal(seen.size, kho.length, "400 lần rút thử phải gặp đủ các câu của kho");
// học sinh đã làm hết một đề cố định (đúng cả): lần rút sau toàn câu của đề kia
[[S.de1, S.de2], [S.de2, S.de1]].forEach(([lam, kia]) => {
  const done = new Set(bank(lam).questions.map(Quiz.key)), kia2 = new Set(bank(kia).questions.map(Quiz.key));
  for (let k = 0; k < 30; k++) thuRut((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(kia2.has(Quiz.key(q)), `đã làm hết ${lam} mà vẫn gặp lại câu của đề đó`));
});

/* ---------- đề bài không trùng câu nào khác trong data/banks/5-tincn.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === FILE).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: gocChu(q.q) })));
  deBai.forEach((d) => { const cung2 = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung2, [d.at], "đề bài trùng: " + cung2.join(", ")); });
}

/* ---------- dò lộ đáp án (Rút ra N5, N25, RS9; như tests/tincn5-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung mọi câu của một
   chủ đề, đề ngẫu nhiên rút chung câu của các chủ đề khác; lời dặn (note) hiện ở màn mở đề nên cũng là “câu kia”. Chữ của câu kia gồm đề bài,
   lời giải, các ô, đáp án và chữ trong hình. Số (từ 10) chỉ tìm ở vị trí kết quả (ngay sau “=”, “là”, “bằng”, “được”); cặp nối: câu kia có
   cả hai vế; câu sắp xếp: câu kia có hai ô liền nhau theo đúng thứ tự; đáp án bằng chữ (lựa chọn đúng, đáp án điền) có ở câu kia thì in ra
   với DO_LO=1 để người làm xem (đáp án một, hai từ chỉ tính khi câu kia cùng chủ đề), danh sách đã xem ghi ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || [], q.svg ? TEXTS(q.svg).map((t) => t.t) : []).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const coCum = (t, s) => new RegExp("(?<![\\p{L}\\p{N}])" + low(s).replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u").test(t);
const LOI_DAN = [...new Set(DE.map((id) => bank(id).note))].map((note, i) => ({ q: note, note: true, ten: "note" + (i + 1) }));
const doLo = (qs, name, notes) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so = q.type === "num" && q.ans >= 10 ? [q.ans] : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const lien = q.type === "order" ? q.o.slice(1).map((o, k) => [q.o[k], o]) : [], cum = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : [];
    qs.concat(notes || []).forEach((p) => {
      if (p === q) return;
      const C = p.note ? [p.q] : chu(p), T = C.map(low), at = `${name(p)} → ${name(q)}: `;
      so.filter((x) => C.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l) && coCum(t, r))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      lien.filter(([a, b]) => T.some((t) => t.includes(low(a)) && t.includes(low(b)) && t.indexOf(low(a)) < t.indexOf(low(b)))).forEach(([a, b]) => lo.push(at + a + " → " + b));
      cum.filter((s) => (s.split(/\s+/).length > 2 || p.topic === q.topic) && T.some((t) => coCum(t, s))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const tenCau = (q) => (q.note ? q.ten : ten.get(q));
const r = doLo(kho, tenCau, LOI_DAN);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác của kho (xem tay):\n" + r.chuLo.join("\n"));
const DA_XEM = [];
assert.deepEqual(r.chuLo, DA_XEM, "đáp án bằng chữ có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(r.lo, [], "lộ đáp án:\n" + r.lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “là 78”, cả hai vế một cặp nối, hai ô liền nhau của câu sắp xếp, lựa chọn đúng
{ const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const k = doLo(qs, (q) => q.q.slice(0, 12)); return k.lo.concat(k.chuLo).map((s) => s.replace(/^.*?: /, "")); };
  const khac = tim("tấm 2 lỗ được dùng để làm gì?");
  assert.deepEqual(thuLo([tim("Chó đi tất cả bao nhiêu bước?"), gia(khac, "Chó đi tất cả là 78 bước.")]), ["78"]);
  assert.deepEqual(thuLo([tim("Nối mỗi lần thử với trạng thái"), gia(khac, "Bật quạt số nhỏ thì đèn LED sáng yếu.")]), ["Bật quạt số nhỏ → Đèn LED sáng yếu"]);
  assert.deepEqual(thuLo([tim("Sắp xếp các việc nhóm làm tiếp theo"), gia(khac, "So kết quả chạy thử với kịch bản rồi tìm và sửa chỗ chưa đúng trong các lệnh.")]), ["So kết quả chạy thử với kịch bản → Tìm và sửa chỗ chưa đúng trong các lệnh"]);
  assert.deepEqual(thuLo([tim("nguồn điện và bộ phận nào nữa?"), gia(khac, "Mô hình có động cơ và hệ truyền động.")]), ["Động cơ và hệ truyền động"]); }

/* ---------- không gần trùng câu của kho Tin học và Công nghệ lớp 4 và kho cuối kì I lớp 5 (lời giao việc; Rút ra N25, như tests/tincn5-ck1.js):
   đề bài cùng lựa chọn, ô nối, ô sắp xếp có từ 4 cặp hai âm tiết liền nhau chung với một câu của data/banks/4-tincn.js hay của tincn5-ck1-* và số
   cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Bỏ cách hỏi chung (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu đem so. ---------- */
{
  const CUM = ["mỗi ý sau đúng hay sai", "nào sau đây", "dưới đây", "bạn nên làm gì", "theo đúng thứ tự", "sắp xếp các việc", "khối lệnh ở hình", "chạy khối lệnh"];
  const cap2 = (s) => { let t = low(s); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const cauCua = (file, f) => BANKS.filter((b) => b.file === file && f(b)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const cu = cauCua("4-tincn.js", () => true).concat(cauCua(FILE, (b) => b.id.startsWith("tincn5-ck1-"))), ca = cu.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const P4 = cu.map((p) => [p, capAm(p)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return P4.map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Tin học và Công nghệ 4, kho cuối kì I lớp 5:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Tin học và Công nghệ 4 hay kho cuối kì I lớp 5");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, chữ trong hình) không có trong sách; tên riêng nhiều chữ (GOP) tính là
   một từ; cụm từ chung của môn (tên bài, tên chủ đề, tên tiêu chí, thuật ngữ như sách: TU_CHUNG) thay bằng dấu ngăn trước khi so; chuỗi so phải
   có ít nhất 5 từ có chữ. */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const boDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP = ["ket noi tri thuc", "khi bam vao"].sort((a, b) => b.length - a.length).map((g, i) => [" " + g + " ", " g" + i + " "]);
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ (như tests/tincn5-ck1.js)
const traChu = (() => {
  const bam = (w, k) => {
    const A = new Uint32Array(w.length), B = new Uint32Array(w.length), n = Math.max(0, w.length - k + 1), H = new Float64Array(n);
    for (let i = 0; i < w.length; i++) { let a = 0x811c9dc5, b = 0x1b873593; const t = w[i]; for (let j = 0; j < t.length; j++) { const x = t.charCodeAt(j); a = Math.imul(a ^ x, 0x01000193); b = Math.imul(b ^ x, 0x5bd1e995); } A[i] = a; B[i] = b; }
    for (let i = 0; i < n; i++) { let a = 0x9e3779b9, b = 0x85ebca6b; for (let j = i; j < i + k; j++) { a = Math.imul(a ^ A[j], 0x01000193); b = Math.imul(b ^ B[j], 0x5bd1e995); } H[i] = (a >>> 0) * 2097152 + (b >>> 11); }
    return H;
  };
  const co = (H, h) => { let l = 0, r = H.length - 1; while (l <= r) { const m = (l + r) >> 1; if (H[m] === h) return true; if (H[m] < h) l = m + 1; else r = m - 1; } return false; };
  const chuMot = new Map(), chuDs = new WeakMap();
  const bang = (m, k, tao) => { if (!m.has(k)) m.set(k, tao().sort()); return m.get(k); };
  return {
    co: (s, c) => { const w = c.split(" "); if (!chuMot.has(s)) chuMot.set(s, new Map()); return co(bang(chuMot.get(s), w.length, () => bam(s.split(" "), w.length)), bam(w, w.length)[0]) && s.includes(" " + c + " "); },
    loc: (ds, c) => {
      const w = c.split(" "), k = w.length;
      if (!chuDs.has(ds)) chuDs.set(ds, new Map());
      const H = bang(chuDs.get(ds), k, () => { const hs = ds.map((o) => bam(o.s.split(" "), k)), ra = new Float64Array(hs.reduce((a, h) => a + h.length, 0)); let i = 0; hs.forEach((h) => { ra.set(h, i); i += h.length; }); return ra; });
      return co(H, bam(w, k)[0]) ? ds.filter((o) => o.s.includes(" " + c + " ")) : [];
    },
  };
})();
const khongDau = nhoChuoi((s) => { let t = " " + boDau(s) + " "; GOP.forEach(([a, b]) => { while (t.includes(a)) t = t.replace(a, b); });
  return t.trim().split(" ").map((w) => (/^g\d+$/.test(w) ? w : w.replace(/[aeiouy]+/g, "a"))).join(" "); });
const TU_CHUNG = [...CHU_DE.map((t) => t.replace(/^(Tin học|Công nghệ) · /, "")), "Cấu trúc tuần tự", "Cấu trúc lặp", "Thực hành sử dụng lệnh lặp",
  "Cấu trúc rẽ nhánh", "Sử dụng biến trong chương trình", "Sử dụng biểu thức trong chương trình", "Từ kịch bản đến chương trình",
  "Lắp ráp mô hình xe điện chạy bằng pin", "Mô hình máy phát điện gió", "Mô hình điện mặt trời", "Giải quyết vấn đề với sự trợ giúp của máy tính", "Thủ công kĩ thuật",
  "Làm sản phẩm thủ công theo video hướng dẫn", "Sở GD&ĐT ra đề chung cuối kì một số môn lớp 5", "mỗi ý sau đúng hay sai", "lặp lại cho đến khi",
  "mô hình xe điện chạy bằng pin", "máy phát điện cánh quạt", ...TIEU_CHI_GIO]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}|^g\d+$/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
if (SACH.length) {
  ["lop-5/tin-hoc-5", "lop-5/cong-nghe-5", "lop-4/tin-hoc-4", "lop-4/cong-nghe-4"].forEach((c) => assert.ok(SACH.some((f) => f.includes(c)), "OnUp-Book có " + c));
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q)}: ${c}`)))
    .concat(LOI_DAN.flatMap((d) => chuoi(d.q, k).filter((c) => traChu.co(sach, c)).map((c) => `${d.ten}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const khac = BANKS.filter((b) => b.file !== FILE || b.id.startsWith("tincn5-ck1-")).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n + " câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, không có câu riêng); kho " + kho.length + " câu, " + kho.filter((q) => q.svg).length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề (" + CHU_DE.filter((t) => t.startsWith("Tin học")).length + " Tin học, " + CHU_DE.filter((t) => t.startsWith("Công nghệ")).length + " Công nghệ); đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("TINCN5 CK2 OK");
