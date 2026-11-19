// Kiểm tra hai ngân hàng lớp 8 cuối kì I của Phiên N8-ck1-tin-congnghe: Tin học (data/banks/8-tin.js, Bài 1–7) và Công nghệ
// (data/banks/8-congnghe.js, Chương I Vẽ kĩ thuật Bài 1–5, Chương II Cơ khí Bài 6–9), theo mẫu tests/tin-congnghe7-ck1.js (bộ đọc trang tính, bộ
// tính công thức, bộ dò lộ, so sách). Mỗi ngân hàng = hai đề cố định trong from của đề ngẫu nhiên (cùng chia đúng ma trận) + đề ngẫu nhiên không có
// câu riêng; mã đề, số câu, số đề lấy từ danh mục (không ghi cứng).
// Câu có phép tính, có công thức, có hình, câu sắp xếp, câu nối được nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong hai kho, đúng đề ghi ở
// id); đáp án tính bằng code (so với ans, o[0], a của câu đúng/sai 4 ý, o của câu sắp xếp, r theo l của câu nối). Tin học: đọc lại trang tính trong
// hình (hàng tên cột, cột số hàng, ô chữ căn trái, ô số căn phải, chữ vừa ô, đúng một hàng tiêu đề chữ đậm; hàng thông tin như ô đơn giá có thể đứng
// trên hàng tiêu đề) và tính lại công thức bằng một bộ tính nhỏ (SUM, AVERAGE, MAX, MIN, COUNT; + − * / ^, ngoặc; địa chỉ tương đối, tuyệt đối có
// dấu $, vùng), sao chép công thức (phần có $ đứng trước giữ nguyên, phần còn lại dời theo), thứ tự các hàng sau khi sắp xếp theo một hay hai tiêu
// chí, số hàng còn hiện sau khi lọc, vùng dữ liệu để vẽ biểu đồ; đọc lại biểu đồ cột (trục, vạch chia đều, đường lưới, cột, tên nhóm, chú giải),
// biểu đồ đoạn thẳng (điểm, chấm tròn, tên mốc), biểu đồ hình quạt tròn (góc từng hình quạt đúng phần trăm ghi ở chú giải, đủ một vòng) và so biểu đồ
// với bảng số liệu cùng hình (hình ghép: bảng trên, biểu đồ dưới). Công nghệ: đọc lại ghi kích thước (đường kích thước có mũi tên hai đầu, đường gióng
// vượt quá 3, giá trị đặt đúng chỗ, Ø ở kích thước đi qua tâm đường tròn, mọi giá trị cùng một tỉ lệ vẽ) và chú thích các phần của kích thước; ba hình
// chiếu vuông góc theo phương pháp chiếu góc thứ nhất (hình chiếu bằng ngay dưới, hình chiếu cạnh ngay bên phải hình chiếu đứng, cùng chiều dài, cùng
// chiều cao, cùng chiều rộng; nhận ra khối từ hình dạng các hình chiếu); bảng kê, khung tên (bảng kẻ ô); kí hiệu cửa đi đơn một cánh; mặt bằng nhà (các
// phòng xếp kín theo lưới, dãy kích thước khớp mép phòng) rồi tính diện tích; cặp bánh răng, bộ truyền xích (đếm răng, cùng bước răng, ăn khớp hay
// đoạn xích tiếp xúc vòng chia, số răng ghi dưới bánh) rồi tính tốc độ quay, tỉ số truyền theo công thức của sách in năm 2026: i = n1/n2 = D2/D1 =
// Z2/Z1 (Công nghệ 8, tr. 38–39; lời giao việc ghi i = Z1/Z2 theo sách cũ); tỉ lệ bản vẽ. Câu trả lời bằng số, câu có hình, câu sắp xếp, câu nối nào
// cũng phải có kiểm tra ở đây.
// Rồi: chữ (dấu thanh kiểu sách: “hoá”, “khoẻ”, “kĩ”, “lí”; số từ 1 000 ngăn hàng nghìn bằng khoảng trắng, trừ năm ở câu Lịch sử công cụ tính toán;
// dấu phẩy thập phân; số trong công thức dưới 1 000; không đơn vị hành chính cũ; không tên nhân vật của sách Tin học 8; Công nghệ không có chữ của
// công thức tỉ số truyền kiểu sách cũ, không “khoan”, “thanh răng” mà sách in năm 2026 không dạy), lời dặn (các bài theo mục lục, nhắc phần trường có
// thể dạy khác, số câu về bảng tính, số câu mỗi chương, công thức tỉ số truyền; không nói đề chung của Sở), dạng câu (mỗi kho ít nhất 4 câu đúng/sai 4
// ý, kiểu Đ/S không lặp quá một phần ba; mỗi đề cố định có câu đúng/sai 4 ý, câu trả lời ngắn, câu có hình; câu nối một ô thừa, cặp nối không có chữ
// chung), mức độ và ma trận (chủ đề theo thứ tự bài, 10 – 8 – 7, hai đề chia đúng), đáp án đúng không dài hơn hẳn lựa chọn sai, là lựa chọn dài nhất
// hay ngắn nhất ở không quá một phần ba (và cả hai không dưới một phần sáu) số câu nhiều lựa chọn của mỗi đề, không là lựa chọn duy nhất có chữ của
// nhãn chủ đề, ba lựa chọn sai không cùng mở đầu một chữ mà đáp án không có; rút thử nhiều lần và với lịch sử đã làm hết từng đề; đề bài không trùng
// câu nào trong file, không gần trùng câu của các kho cùng môn (cả 7-tin.js, 9-tin.js, 7-congnghe.js, 9-congnghe.js); dò lộ đáp án giữa mọi cặp câu
// của kho (số ở vị trí kết quả, cả hai vế một cặp nối, hai ô sắp xếp liền nhau, chữ trong hình; đáp án bằng chữ in ra với DO_LO=1, đã xem ghi ở
// DA_XEM). Có ../OnUp-Book thì so mọi trường chữ, cả chữ trong hình, với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ)
// và với câu của mọi kho khác (DO_KHO=1 in chuỗi 5 từ). Bộ đọc hình, bộ tính công thức và bộ dò lộ tự thử với hình, công thức, câu cố ý viết sai.
// Chạy: node tests/tin-congnghe8-ck1.js → in MATH OK.
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

/* ---------- hai kho: mã đề, số câu lấy từ danh mục ---------- */
const T = { m: "tin", ten: "Tin học", pool: "tin8-ck1-ngau-nhien", file: "8-tin.js", cu: ["7-tin.js", "9-tin.js"] };
const C = { m: "congnghe", ten: "Công nghệ", pool: "congnghe8-ck1-ngau-nhien", file: "8-congnghe.js", cu: ["7-congnghe.js", "9-congnghe.js"] };
const MON = [T, C];
MON.forEach((s) => {
  const p = bank(s.pool); assert.ok(p && p.pool, "thiếu đề ngẫu nhiên " + s.pool);
  s.from = p.pool.from; s.de1 = s.from[0]; s.de2 = s.from[1];
  assert.ok(s.from.length === 2 && s.from.every((id) => bank(id) && bank(id).file === s.file) && p.file === s.file, s.pool + ": from là hai đề cố định cùng file " + s.file);
  assert.deepEqual(BANKS.filter((b) => b.id.startsWith(s.m + "8-ck1-")).map((b) => b.id).sort(), [s.de1, s.de2, s.pool].sort(), s.m + ": kho gồm hai đề cố định và đề ngẫu nhiên");
  [s.de1, s.de2, s.pool].forEach((id) => { const b = bank(id); assert.ok(b.grade === 8 && b.subject === s.ten && b.minutes === 35, id + ": khối 8, môn " + s.ten + ", 35 phút"); });
  s.from.forEach((id) => assert.equal(bank(id).questions.length, bank(id).n, id + ": số câu bằng n của danh mục"));
  assert.equal(p.questions.length, bank(s.de1).n + bank(s.de2).n, s.pool + ": kho là câu của hai đề cố định, không có câu riêng");
  assert.ok(p.questions.every((q) => s.from.includes(q.src)), s.pool + ": câu nào cũng thuộc một đề cố định");
  assert.ok(p.n === bank(s.de1).n && p.n === bank(s.de2).n, s.pool + ": mỗi lần rút bằng số câu một đề cố định");
  s.kho = p.questions;
});
const kho = MON.flatMap((s) => s.kho);
{ // kì thi cuối học kì I lớp 8 gắn đủ sáu mã; phạm vi ghi Tin học, Công nghệ
  const ctxL = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctxL);
  const ev = ctxL.window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck1-l8");
  MON.forEach((s) => [s.de1, s.de2, s.pool].forEach((id) => assert.ok(ev.banks.includes(id), "ck1-l8 chưa gắn " + id)));
  assert.ok(/Tin học: Bài 1–7\./.test(ev.scope) && /Công nghệ: Bài 1–9\./.test(ev.scope), "phạm vi của ck1-l8 ghi Tin học: Bài 1–7, Công nghệ: Bài 1–9");
}

/* ---------- số ---------- */
const val = (s) => +String(s).replace(/\s/g, "").replace(/−/g, "-").replace(",", "."); // "1 450" → 1450, "0,8" → 0.8
// t có cụm s đứng thành từ riêng (“Na” không khớp “Nam”)
const coCum = (t, s) => { for (let i = t.indexOf(s); i >= 0; i = t.indexOf(s, i + 1)) if (!/[\p{L}\p{N}]/u.test(t[i - 1] || " ") && !/[\p{L}\p{N}]/u.test(t[i + s.length] || " ")) return true; return false; };

/* ---------- hình ---------- */
const close = (x, y, e = 1e-9) => Math.abs(x - y) < e;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const unEsc = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: unEsc(m[2]) }));
const num = (a, k) => +a[k];
const daDoc = new Set(); // hình đã đọc lại bằng code
const coChu = (t) => assert.ok(+t["font-size"] >= 13, "chữ trong hình từ 13 trở lên: " + t.t);
const rong = (t) => (t["font-weight"] === "700" ? 0.62 : 0.55) * +t["font-size"] * [...t.t].length; // ước bề rộng dòng chữ (Noto Sans)
const khung = (svg) => { const v = attrs(svg.slice(0, svg.indexOf(">") + 1)).viewBox.split(" ").map(Number); return { w: v[2], h: v[3] }; };
const chuHinh = (svg) => (svg ? texts(svg).map((t) => t.t).join(" ") : ""); // chữ trong hình (dò lộ, so sách)
// hộp ước lượng của một dòng chữ: [trái, phải, trên, dưới]
const hop = (t) => { const w = rong(t), x = +t.x, a = t["text-anchor"], l = a === "middle" ? x - w / 2 : a === "end" ? x - w : x; return [l, l + w, +t.y - 0.75 * +t["font-size"], +t.y + 0.25 * +t["font-size"]]; };
const chongChu = (TX) => TX.forEach((a, i) => TX.slice(i + 1).forEach((b) => { const p = hop(a), q = hop(b);
  assert.ok(p[1] <= q[0] || q[1] <= p[0] || p[3] <= q[2] || q[3] <= p[2], `chữ “${a.t}” chạm chữ “${b.t}”`); }));
const trongKhung = (svg, TX) => { const K = khung(svg); TX.forEach((t) => { const h = hop(t); assert.ok(h[0] >= 0 && h[1] <= K.w && h[2] >= 0 && h[3] <= K.h, "chữ nằm trong khung hình: " + t.t); }); };

/* Hình ghép (bảng trên, biểu đồ dưới…): mỗi phần một nhóm <g transform="translate(0,y)"> nối tiếp, cách nhau 16; trả về từng phần như một hình riêng
   (viewBox cùng bề rộng, cao đến phần sau). */
const GHEP = new Map(); // hình ghép → các phần (hình ghép tính là đã đọc khi mọi phần đã đọc)
const phan = (svg) => {
  if (GHEP.has(svg)) return GHEP.get(svg);
  const K = khung(svg), m = [...svg.matchAll(/<g transform="translate\(0,([\d.]+)\)">([\s\S]*?)<\/g>/g)];
  assert.ok(m.length >= 2 && svg.replace(/<g [^>]*>[\s\S]*?<\/g>/g, "").replace(/<\/?svg[^>]*>/g, "") === "", "hình ghép: chỉ gồm các nhóm translate(0,y)");
  const ra = m.map((x, i) => { const y = +x[1], h = (i + 1 < m.length ? +m[i + 1][1] : K.h + 16) - y - 16; assert.ok(h > 0, "các phần không chồng nhau");
    return `<svg viewBox="0 0 ${K.w} ${h}" width="${K.w}">${x[2]}</svg>`; });
  GHEP.set(svg, ra);
  return ra;
};

/* Trang tính (như tests/tin-congnghe7-ck1.js): đường kẻ mảnh tô line kẻ hết bảng; hàng tên cột (A, B…) và cột số hàng tô nền bg, chữ muted ở giữa ô;
   mỗi ô dữ liệu nhiều nhất một chữ: chữ căn trái cách lề 5, số căn phải cách lề 5, chữ vừa ô; đúng một hàng tiêu đề chữ đậm (thường là hàng 1; hàng
   phía trên nó, nếu có, là hàng thông tin chữ thường như ô đơn giá). Trả về { o: { "A1": "Họ tên", "B2": 9, … }, hang, cot, tieuDe }. */
const docTrang = (svg) => {
  daDoc.add(svg);
  assert.ok(khung(svg).w <= 320, "trang tính rộng không quá 320");
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
  const o = {}, dam = new Set(), thuong = new Set();
  TX.filter((t) => +t.y > ys[1] && +t.x > xs[1]).forEach((t) => {
    const c = xs.findIndex((x, i) => i && +t.x > xs[i - 1] && +t.x <= x) - 1, r = ys.findIndex((y, i) => i && +t.y > ys[i - 1] && +t.y < y) - 1;
    assert.ok(c >= 1 && r >= 1, "chữ nằm trong một ô: " + t.t);
    const so = t["text-anchor"] === "end";
    assert.ok(so ? close(+t.x, xs[c + 1] - 5) : !t["text-anchor"] && close(+t.x, xs[c] + 5), "ô chữ căn trái, ô số căn phải: " + t.t);
    assert.ok(rong(t) <= xs[c + 1] - xs[c] - 8, "chữ vừa ô: " + t.t);
    assert.ok(close(+t.y, ys[r] + 17), "chữ đặt đúng dòng của ô: " + t.t);
    const ten = String.fromCharCode(64 + c) + r;
    assert.ok(!(ten in o), "mỗi ô một chữ: " + ten);
    (t["font-weight"] === "700" ? dam : thuong).add(r);
    if (so) { assert.ok(/^\d{1,3}$/.test(t.t), "ô số là số nguyên nhỏ hơn 1 000 (phần mềm bảng tính dùng dấu chấm thập phân): " + t.t); o[ten] = +t.t; } else o[ten] = t.t;
  });
  assert.equal(dam.size, 1, "trang tính có đúng một hàng tiêu đề chữ đậm");
  const tieuDe = [...dam][0];
  assert.ok(!thuong.has(tieuDe) && Object.keys(o).filter((k) => +k.slice(1) === tieuDe).every((k) => typeof o[k] === "string"), "hàng tiêu đề: mọi ô chữ đậm, không có số");
  return { o, hang: ys.length - 2, cot: xs.length - 2, tieuDe };
};

/* Trục của biểu đồ cột, đoạn thẳng: trục ngang tô ink ở giá trị 0, trục đứng tô ink ở đầu trục ngang; mỗi vạch chia một số màu muted căn phải ngay
   trái trục đứng; vạch khác 0 có đường lưới tô line kẻ hết vùng vẽ; các vạch cách đều, giá trị tăng đều. k: số đơn vị vẽ cho 1 đơn vị giá trị. */
const docTruc = (svg) => {
  const L = tags(svg, "line"), TX = texts(svg), ink = L.filter((l) => l.stroke === "ink");
  const ngang = ink.filter((l) => num(l, "y1") === num(l, "y2")), dung = ink.filter((l) => num(l, "x1") === num(l, "x2"));
  assert.ok(ngang.length === 1 && dung.length === 1 && ink.length === 2, "biểu đồ: một trục ngang, một trục đứng tô ink");
  const X0 = num(ngang[0], "x1"), X1 = num(ngang[0], "x2"), Y1 = num(ngang[0], "y1");
  assert.ok(num(dung[0], "x1") === X0 && num(dung[0], "y2") === Y1 && num(dung[0], "y1") < Y1, "trục đứng ở đầu trục ngang");
  const tk = TX.filter((t) => t.fill === "muted" && t["text-anchor"] === "end" && close(+t.x, X0 - 5)).map((t) => ({ v: +t.t.replace(",", "."), y: +t.y - 4.5 })).sort((a, b) => a.v - b.v);
  assert.ok(tk.length >= 3 && tk[0].v === 0 && close(tk[0].y, Y1, 0.01), "biểu đồ: vạch chia bắt đầu từ 0 ở trục ngang");
  const buoc = tk[1].v - tk[0].v, dy = tk[0].y - tk[1].y;
  tk.forEach((t, i) => { if (!i) return;
    assert.ok(close(t.v - tk[i - 1].v, buoc, 1e-9) && close(tk[i - 1].y - t.y, dy, 0.02), "các vạch chia cách đều, giá trị tăng đều");
    assert.ok(L.some((l) => l.stroke === "line" && close(num(l, "y1"), t.y, 0.02) && close(num(l, "y2"), t.y, 0.02) && num(l, "x1") === X0 && num(l, "x2") === X1), "đường lưới ở vạch " + t.v); });
  assert.equal(L.filter((l) => l.stroke === "line").length, tk.length - 1, "biểu đồ: không có đường lưới thừa");
  assert.ok(num(dung[0], "y1") <= tk[tk.length - 1].y, "trục đứng dài tới vạch trên cùng");
  return { X0, X1, Y1, k: dy / buoc, ticks: tk.map((t) => t.v) };
};
const tieuDe = (svg, TX) => { const K = khung(svg), t = TX.filter((t) => t["font-weight"] === "700");
  assert.ok(t.length === 1 && t[0]["text-anchor"] === "middle" && close(+t[0].x, K.w / 2) && +t[0].y <= 24, "biểu đồ có một dòng tiêu đề đậm ở giữa trên cùng"); return t[0].t; };
const kiemChu = (svg, TX) => { TX.forEach(coChu); trongKhung(svg, TX); chongChu(TX); };

/* Biểu đồ cột (một hay hai dãy): cột là rect tô acc (dãy 1), sun (dãy 2), chân cột trên trục ngang; tên nhóm ở giữa ô của nhóm, ngay dưới trục; hai
   dãy thì có chú giải phía dưới: ô vuông 12 tô màu của dãy, tên dãy ngay bên phải. Trả về { title, cats, series: [{ mau, v, name }] }. */
const docCot = (svg) => {
  daDoc.add(svg);
  assert.ok(khung(svg).w <= 320, "biểu đồ rộng không quá 320");
  const TX = texts(svg), R = tags(svg, "rect"), T = docTruc(svg), title = tieuDe(svg, TX);
  kiemChu(svg, TX);
  const catT = TX.filter((t) => t["text-anchor"] === "middle" && close(+t.y, T.Y1 + 18)).sort((a, b) => +a.x - +b.x);
  const bars = R.filter((r) => close(num(r, "y") + num(r, "height"), T.Y1, 0.02)), leg = R.filter((r) => num(r, "width") === 12 && num(r, "height") === 12);
  assert.equal(bars.length + leg.length, R.length, "biểu đồ cột: mỗi rect là một cột hay một ô chú giải");
  const maus = [...new Set(bars.map((b) => b.fill))];
  assert.ok(maus.length && maus.every((m, i) => m === ["acc", "sun"][i]), "cột tô acc (dãy 1), sun (dãy 2)");
  const g = (T.X1 - T.X0) / catT.length;
  catT.forEach((t, i) => assert.ok(close(+t.x, T.X0 + g * (i + 0.5), 0.02), "tên nhóm ở giữa ô của nhóm: " + t.t));
  const series = maus.map((m) => {
    const bs = bars.filter((b) => b.fill === m);
    assert.equal(bs.length, catT.length, "dãy " + m + " có đủ một cột mỗi nhóm");
    const v = catT.map((t, i) => { const b = bs.filter((b) => num(b, "x") >= T.X0 + g * i && num(b, "x") + num(b, "width") <= T.X0 + g * (i + 1));
      assert.equal(b.length, 1, "mỗi nhóm một cột của dãy " + m); return Math.round((num(b[0], "height") / T.k) * 1000) / 1000; });
    v.forEach((x) => assert.ok(x <= T.ticks[T.ticks.length - 1] + 1e-9, "cột không cao quá vạch trên cùng"));
    return { mau: m, v };
  });
  if (maus.length > 1) series.forEach((s) => { const r = leg.filter((r) => r.fill === s.mau); assert.equal(r.length, 1, "chú giải có ô màu " + s.mau);
    const t = TX.filter((t) => close(+t.x, num(r[0], "x") + 17) && close(+t.y, num(r[0], "y") + 11)); assert.equal(t.length, 1, "tên dãy cạnh ô màu"); s.name = t[0].t; });
  else assert.equal(leg.length, 0, "một dãy thì không có chú giải");
  assert.equal(TX.length, 1 + catT.length + T.ticks.length + (maus.length > 1 ? maus.length : 0), "biểu đồ cột: không có chữ thừa");
  return { title, cats: catT.map((t) => t.t), series };
};

/* Biểu đồ đoạn thẳng: một đường gấp khúc tô acc, chấm tròn r 3,5 tô acc ở mỗi điểm; tên mốc ở ngay dưới trục, đúng hoành độ của điểm. */
const docDuong = (svg) => {
  daDoc.add(svg);
  assert.ok(khung(svg).w <= 320, "biểu đồ rộng không quá 320");
  const TX = texts(svg), T = docTruc(svg), title = tieuDe(svg, TX), P = tags(svg, "polyline"), C = tags(svg, "circle");
  kiemChu(svg, TX);
  assert.ok(P.length === 1 && P[0].stroke === "acc" && P[0].fill === "none", "biểu đồ đoạn thẳng: một đường gấp khúc tô acc");
  const pts = P[0].points.trim().split(/\s+/).map((s) => s.split(",").map(Number));
  const catT = TX.filter((t) => t["text-anchor"] === "middle" && close(+t.y, T.Y1 + 18)).sort((a, b) => +a.x - +b.x);
  assert.equal(catT.length, pts.length, "mỗi điểm một tên mốc");
  const g = (T.X1 - T.X0) / pts.length;
  pts.forEach(([x, y], i) => {
    assert.ok(close(x, +catT[i].x, 0.02) && close(x, T.X0 + g * (i + 0.5), 0.02), "điểm đặt đúng trên tên mốc " + catT[i].t);
    assert.ok(C.some((c) => close(num(c, "cx"), x, 0.02) && close(num(c, "cy"), y, 0.02) && c.fill === "acc" && c.r === "3.5"), "chấm tròn ở điểm " + catT[i].t);
  });
  assert.equal(C.length, pts.length, "không có chấm thừa");
  assert.equal(TX.length, 1 + catT.length + T.ticks.length, "biểu đồ đoạn thẳng: không có chữ thừa");
  return { title, cats: catT.map((t) => t.t), v: pts.map(([, y]) => Math.round(((T.Y1 - y) / T.k) * 1000) / 1000) };
};

/* Biểu đồ hình quạt tròn: các hình quạt cùng tâm, cùng bán kính, nối tiếp từ 12 giờ theo chiều kim đồng hồ, đủ một vòng, mỗi hình một màu; chú giải:
   ô vuông 12 tô màu của hình quạt, ngay bên phải “Tên: 25%”; góc hình quạt đúng phần trăm ghi ở chú giải. Trả về { title, parts: [{ ten, pct, mau }] }. */
const docTron = (svg) => {
  daDoc.add(svg);
  assert.ok(khung(svg).w <= 320, "biểu đồ rộng không quá 320");
  const TX = texts(svg), title = tieuDe(svg, TX), PA = tags(svg, "path"), R = tags(svg, "rect");
  kiemChu(svg, TX);
  const qu = PA.map((p) => {
    const m = p.d.match(/^M (\S+) (\S+) L (\S+) (\S+) A (\S+) (\S+) 0 ([01]) 1 (\S+) (\S+) Z$/); assert.ok(m, "hình quạt viết M … L … A … Z: " + p.d);
    const [cx, cy, x1, y1, r, r2, lg, x2, y2] = m.slice(1).map(Number); assert.equal(r, r2);
    const goc = (x, y) => { const a = (Math.atan2(x - cx, cy - y) * 180) / Math.PI; return a < -1e-6 ? a + 360 : a; };
    assert.ok(close(Math.hypot(x1 - cx, y1 - cy), r, 0.02) && close(Math.hypot(x2 - cx, y2 - cy), r, 0.02), "đầu cung nằm trên đường tròn");
    let a = goc(x1, y1), b = goc(x2, y2); if (b <= a + 1e-6) b += 360;
    assert.equal(+lg, b - a > 180 ? 1 : 0, "cờ cung lớn đúng với góc");
    return { cx, cy, r, a, b, mau: p.fill };
  });
  assert.ok(qu.length >= 2 && qu.every((q) => q.cx === qu[0].cx && q.cy === qu[0].cy && q.r === qu[0].r), "các hình quạt cùng tâm, cùng bán kính");
  assert.ok(close(qu[0].a, 0, 0.02), "hình quạt đầu bắt đầu ở 12 giờ");
  qu.forEach((q, i) => i && assert.ok(close(q.a % 360, qu[i - 1].b % 360, 0.02), "các hình quạt nối tiếp nhau"));
  assert.ok(close(qu[qu.length - 1].b, 360, 0.05), "các hình quạt đủ một vòng");
  assert.equal(new Set(qu.map((q) => q.mau)).size, qu.length, "mỗi hình quạt một màu");
  const parts = qu.map((q) => {
    const r = R.filter((r) => r.fill === q.mau && num(r, "width") === 12); assert.equal(r.length, 1, "chú giải có ô màu " + q.mau);
    const t = TX.filter((t) => close(+t.x, num(r[0], "x") + 17) && close(+t.y, num(r[0], "y") + 11)); assert.equal(t.length, 1, "chữ chú giải cạnh ô màu " + q.mau);
    const m = t[0].t.match(/^(.+): (\d+(?:,\d+)?)%$/); assert.ok(m, "chú giải ghi “Tên: x%”: " + t[0].t);
    const pct = +m[2].replace(",", "."); assert.ok(close(((q.b - q.a) / 360) * 100, pct, 0.05), "góc hình quạt đúng " + t[0].t);
    return { ten: m[1], pct, mau: q.mau };
  });
  assert.ok(close(sum(parts.map((p) => p.pct)), 100, 1e-9), "các phần trăm cộng lại bằng 100");
  assert.equal(TX.length, 1 + parts.length, "biểu đồ hình quạt tròn: không có chữ thừa");
  return { title, parts };
};

/* Bảng kẻ ô (khung tên, bảng kê của bản vẽ lắp): đường kẻ mảnh tô ink, kẻ hết bảng, các hàng cao bằng nhau; mỗi ô nhiều nhất một chữ, căn trái cách
   lề 6, vừa ô; nhiều nhất một hàng chữ đậm (hàng tiêu đề). Trả về { o: [[…]] (ô trống là ""), hang, cot, dam } (dam: hàng đậm, −1 nếu không có). */
const docBang = (svg) => {
  daDoc.add(svg);
  assert.ok(khung(svg).w <= 320, "bảng rộng không quá 320");
  const L = tags(svg, "line"), TX = texts(svg);
  assert.ok(L.length && L.every((l) => l.stroke === "ink" && l["stroke-width"] === "1"), "bảng: đường kẻ mảnh tô ink");
  const ngang = L.filter((l) => num(l, "y1") === num(l, "y2")), doc = L.filter((l) => num(l, "x1") === num(l, "x2"));
  assert.equal(ngang.length + doc.length, L.length, "bảng: đường kẻ nằm ngang hoặc thẳng đứng");
  const ys = ngang.map((l) => num(l, "y1")).sort((a, b) => a - b), xs = doc.map((l) => num(l, "x1")).sort((a, b) => a - b);
  ngang.forEach((l) => assert.ok(num(l, "x1") === xs[0] && num(l, "x2") === xs[xs.length - 1], "bảng: đường ngang kẻ hết bề rộng"));
  doc.forEach((l) => assert.ok(num(l, "y1") === ys[0] && num(l, "y2") === ys[ys.length - 1], "bảng: đường dọc kẻ hết chiều cao"));
  ys.forEach((y, i) => i > 1 && assert.equal(y - ys[i - 1], ys[1] - ys[0], "bảng: các hàng cao bằng nhau"));
  const o = Array.from({ length: ys.length - 1 }, () => Array(xs.length - 1).fill("")), dam = new Set();
  TX.forEach((t) => {
    coChu(t);
    const c = xs.findIndex((x) => close(+t.x, x + 6)), r = ys.findIndex((y) => close(+t.y, y + 18));
    assert.ok(c >= 0 && c < xs.length - 1 && r >= 0 && r < ys.length - 1 && !t["text-anchor"], "chữ căn trái trong một ô: " + t.t);
    assert.ok(o[r][c] === "" && rong(t) <= xs[c + 1] - xs[c] - 10, "mỗi ô một chữ, chữ vừa ô: " + t.t);
    o[r][c] = t.t; if (t["font-weight"] === "700") dam.add(r);
  });
  assert.ok(dam.size <= 1, "bảng: nhiều nhất một hàng chữ đậm");
  const d = dam.size ? [...dam][0] : -1;
  if (d >= 0) assert.ok(TX.every((t) => (+t.y === ys[d] + 18) === (t["font-weight"] === "700")), "hàng tiêu đề: mọi ô chữ đậm");
  return { o, hang: ys.length - 1, cot: xs.length - 1, dam: d };
};

/* Ghi kích thước (Công nghệ 8, tr. 8–9): mọi nét của kích thước là nét liền mảnh tô ink (stroke-width 1); mũi tên là tam giác tô ink dài 7. Kích thước dài:
   đường kích thước nằm ngang hay thẳng đứng, hai đầu là hai mũi tên, mỗi đầu có một đường gióng vuông góc vượt quá đường kích thước 3; giá trị ở giữa phía
   trên (nằm ngang) hay ngay bên trái (thẳng đứng). Đường kính: đường kích thước đi qua tâm đường tròn, hai mũi tên chạm đường tròn, giá trị “Ø…” ở trên tâm,
   không có đường gióng. Mọi giá trị cùng một tỉ lệ vẽ (số milimét trên một đơn vị vẽ). Trả về { kt: [{ v, kieu: "dài"|"Ø", huong, a, b, len, chu }], mm }. */
const docKichThuoc = (svg, opt = {}) => {
  const L = tags(svg, "line"), P = tags(svg, "polygon"), C = tags(svg, "circle"), TX = texts(svg);
  const mui = P.filter((p) => p.fill === "ink" && p.points.trim().split(/\s+/).length === 3).map((p) => {
    const d = p.points.trim().split(/\s+/).map((s) => s.split(",").map(Number));
    const i = d.findIndex((q, k) => { const [u, v] = d.filter((_, j) => j !== k); return close(Math.hypot(u[0] - q[0], u[1] - q[1]), Math.hypot(v[0] - q[0], v[1] - q[1]), 0.05) && Math.hypot(u[0] - v[0], u[1] - v[1]) < 6; });
    assert.ok(i >= 0, "mũi tên là tam giác cân nhọn: " + p.points); return d[i];
  });
  const la = (p, x, y) => close(p[0], x, 0.02) && close(p[1], y, 0.02);
  const mong = L.filter((l) => l.stroke === "ink" && l["stroke-width"] === "1");
  const dk = mong.filter((l) => mui.some((p) => la(p, num(l, "x1"), num(l, "y1"))) && mui.some((p) => la(p, num(l, "x2"), num(l, "y2"))));
  const dung = new Set(dk); // nét đã dùng
  const kt = dk.map((l) => {
    const x1 = num(l, "x1"), y1 = num(l, "y1"), x2 = num(l, "x2"), y2 = num(l, "y2"), ngang = y1 === y2;
    assert.ok(ngang || x1 === x2, "đường kích thước nằm ngang hay thẳng đứng");
    const len = Math.hypot(x2 - x1, y2 - y1), mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    const tron = C.find((c) => ngang && close(num(c, "cy"), y1, 0.02) && close(num(c, "cx"), mx, 0.02) && close(2 * num(c, "r"), len, 0.05));
    const t = TX.filter((t) => (ngang ? t["text-anchor"] === "middle" && close(+t.x, mx, 0.02) && close(+t.y, y1 - (tron ? 5 : 4), 0.02)
      : close(+t.y, my + 4.5, 0.02) && ((t["text-anchor"] === "end" && close(+t.x, x1 - 5, 0.02)) || (!t["text-anchor"] && close(+t.x, x1 + 5, 0.02)))));
    assert.equal(t.length, 1, "mỗi đường kích thước một giá trị đặt đúng chỗ");
    const m = t[0].t.match(/^(Ø|R)?(\d{1,3}(?: \d{3})*)$/); assert.ok(m, "giá trị kích thước là số, đường kính ghi Ø: " + t[0].t);
    const v = +m[2].replace(/ /g, ""), kieu = m[1] || "dài";
    assert.ok(!/^\d{4}$/.test(m[2]), "giá trị từ 1 000 ngăn hàng nghìn bằng khoảng trắng: " + t[0].t);
    if (tron) assert.equal(kieu, "Ø", "kích thước đi qua tâm đường tròn ghi Ø");
    else {
      assert.ok(kieu === "dài" || (kieu === "Ø" && opt.oDai), "kích thước dài không ghi Ø, R (trừ đường kính của khối trụ vẽ thành hình chữ nhật)");
      [[x1, y1], [x2, y2]].forEach(([x, y]) => {
        const g = mong.filter((k) => !dk.includes(k) && (ngang ? num(k, "x1") === x && num(k, "x2") === x && Math.min(num(k, "y1"), num(k, "y2")) <= y && Math.max(num(k, "y1"), num(k, "y2")) >= y
          : num(k, "y1") === y && num(k, "y2") === y && Math.min(num(k, "x1"), num(k, "x2")) <= x && Math.max(num(k, "x1"), num(k, "x2")) >= x));
        assert.equal(g.length, 1, "mỗi đầu đường kích thước có một đường gióng: " + t[0].t);
        const vuot = ngang ? Math.min(Math.abs(num(g[0], "y1") - y), Math.abs(num(g[0], "y2") - y)) : Math.min(Math.abs(num(g[0], "x1") - x), Math.abs(num(g[0], "x2") - x));
        assert.ok(close(vuot, 3, 0.02), "đường gióng vượt quá đường kích thước 3 đơn vị vẽ: " + t[0].t);
        dung.add(g[0]);
      });
    }
    return { v, kieu, huong: ngang ? "ngang" : "đứng", a: [x1, y1], b: [x2, y2], len, chu: t[0].t };
  });
  assert.ok(kt.length >= 1, "hình có kích thước");
  const mm = kt[0].v / kt[0].len;
  kt.forEach((k) => assert.ok(close(k.v / k.len, mm, 1e-6), "mọi giá trị kích thước cùng một tỉ lệ vẽ: " + k.chu));
  assert.equal(mui.length, 2 * kt.length, "không có mũi tên thừa");
  if (!opt.nhieuNet) assert.equal(mong.filter((l) => !dung.has(l)).length, 0, "không có nét mảnh tô ink thừa");
  daDoc.add(svg);
  return { kt, mm, dung };
};

/* Kí hiệu cửa đi đơn một cánh (Công nghệ 8, tr. 29): tường là hai đoạn nét đậm (stroke-width 4) cùng nằm ngang, giữa có chỗ hở; cánh cửa là đoạn thẳng
   (stroke-width 2) vuông góc với tường ở một mép chỗ hở, dài bằng chỗ hở; một cung một phần tư đường tròn tâm ở mép đó, nối đầu cánh cửa với mép kia. */
const docCua = (svg) => {
  daDoc.add(svg);
  const L = tags(svg, "line"), PA = tags(svg, "path");
  const tuong = L.filter((l) => l["stroke-width"] === "4"), canh = L.filter((l) => l["stroke-width"] === "2");
  assert.ok(tuong.length === 2 && canh.length === 1 && PA.length === 1 && L.length === 3 && !texts(svg).length, "kí hiệu: hai đoạn tường, một cánh cửa, một cung, không có chữ");
  const Y = num(tuong[0], "y1"); assert.ok(tuong.every((l) => num(l, "y1") === Y && num(l, "y2") === Y), "hai đoạn tường cùng nằm ngang");
  const [t1, t2] = tuong.sort((a, b) => num(a, "x1") - num(b, "x1")), a = num(t1, "x2"), b = num(t2, "x1"), g = b - a;
  assert.ok(g > 20, "tường có chỗ hở");
  const c = canh[0]; assert.ok(num(c, "x1") === a && num(c, "x2") === a && num(c, "y1") === Y && close(Y - num(c, "y2"), g, 0.02), "cánh cửa dựng ở mép chỗ hở, dài bằng chỗ hở");
  const m = PA[0].d.match(/^M (\S+) (\S+) A (\S+) (\S+) 0 0 1 (\S+) (\S+)$/); assert.ok(m && PA[0].fill === "none", "cung viết M … A …");
  const [x0, y0, r, r2, x1, y1] = m.slice(1).map(Number);
  assert.ok(close(x0, a) && close(y0, Y - g, 0.02) && close(r, g, 0.02) && r === r2 && close(x1, b) && close(y1, Y), "cung một phần tư đường tròn từ đầu cánh cửa tới mép kia");
  return { loai: "Cửa đi đơn một cánh", g };
};

/* Bánh răng, đĩa xích: đa giác răng tô surface viền ink, tâm có chấm tròn r 4 tô ink; đỉnh răng cùng nằm trên một đường tròn, chân răng trên một đường
   tròn nhỏ hơn; số răng = số đỉnh răng; vòng chia = trung bình hai đường tròn. Cặp bánh răng: tâm cùng hàng ngang, khoảng cách tâm bằng tổng bán kính vòng
   chia, cùng bước răng. Bộ truyền xích: hai đoạn xích nét đứt tô muted, mỗi đoạn tiếp xúc với vòng chia của cả hai đĩa. Dưới mỗi bánh hai dòng chữ: tên
   (“Bánh dẫn”…) và “N răng”, N đúng bằng số răng vẽ. Trả về { kieu: "răng"|"xích", banh: [{ ten, Z, r, cx }] } (từ trái sang phải). */
const docTruyen = (svg) => {
  daDoc.add(svg);
  assert.ok(khung(svg).w <= 320, "hình rộng không quá 320");
  const PG = tags(svg, "polygon"), C = tags(svg, "circle"), L = tags(svg, "line"), TX = texts(svg);
  kiemChu(svg, TX);
  const banh = PG.map((p) => {
    const d = p.points.trim().split(/\s+/).map((s) => s.split(",").map(Number));
    const xs = d.map((q) => q[0]), ys = d.map((q) => q[1]);
    const tam = C.filter((c) => c.r === "4" && c.fill === "ink" && num(c, "cx") > Math.min(...xs) && num(c, "cx") < Math.max(...xs) && num(c, "cy") > Math.min(...ys) && num(c, "cy") < Math.max(...ys));
    assert.equal(tam.length, 1, "mỗi bánh một chấm tâm nằm trong bánh"); const t = tam[0];
    assert.ok(t && p.fill === "surface" && p.stroke === "ink", "bánh có tâm, tô surface viền ink");
    const cx = num(t, "cx"), cy = num(t, "cy"), R = d.map(([x, y]) => Math.hypot(x - cx, y - cy)), ro = Math.max(...R), ri = Math.min(...R);
    assert.ok(R.every((x) => close(x, ro, 0.05) || close(x, ri, 0.05)), "đỉnh răng, chân răng nằm trên hai đường tròn");
    const dinh = R.filter((x) => close(x, ro, 0.05)).length;
    assert.ok(dinh % 2 === 0 && R.length === 2 * dinh, "mỗi răng hai đỉnh, hai chân");
    const Z = dinh / 2, r = (ro + ri) / 2;
    const nhan = TX.filter((t) => close(+t.x, cx, 0.02) && t["text-anchor"] === "middle").sort((a, b) => +a.y - +b.y);
    assert.ok(nhan.length === 2 && +nhan[0].y > cy + ro, "dưới mỗi bánh hai dòng chữ");
    assert.equal(nhan[1].t, Z + " răng", "số răng ghi dưới bánh đúng số răng vẽ");
    return { ten: nhan[0].t, Z, r, cx, cy, buoc: (2 * Math.PI * r) / Z, ro };
  }).sort((a, b) => a.cx - b.cx);
  assert.ok(banh.length === 2 && close(banh[0].cy, banh[1].cy, 0.02), "hai bánh, tâm cùng hàng ngang");
  assert.ok(close(banh[0].buoc, banh[1].buoc, 0.01), "hai bánh cùng bước răng");
  assert.equal(TX.length, 4, "không có chữ thừa");
  const xich = L.filter((l) => l.stroke === "muted" && l["stroke-dasharray"]);
  let kieu;
  if (!xich.length) { assert.ok(close(banh[1].cx - banh[0].cx, banh[0].r + banh[1].r, 0.05), "cặp bánh răng ăn khớp: khoảng cách tâm bằng tổng bán kính vòng chia"); kieu = "răng"; }
  else {
    assert.equal(xich.length, 2, "bộ truyền xích có hai đoạn xích");
    xich.forEach((l) => { const x1 = num(l, "x1"), y1 = num(l, "y1"), x2 = num(l, "x2"), y2 = num(l, "y2"), dd = Math.hypot(x2 - x1, y2 - y1);
      banh.forEach((b) => assert.ok(close(Math.abs((x2 - x1) * (y1 - b.cy) - (x1 - b.cx) * (y2 - y1)) / dd, b.r, 0.05), "đoạn xích tiếp xúc với vòng chia của " + b.ten)); });
    assert.ok(banh[1].cx - banh[0].cx > banh[0].ro + banh[1].ro + 20, "hai đĩa xích đặt cách xa nhau"); kieu = "xích";
  }
  return { kieu, banh: banh.map(({ ten, Z, r, cx }) => ({ ten, Z, r, cx })) };
};

/* Mặt bằng nhà (Công nghệ 8, Bài 5): các phòng là hình chữ nhật nét đậm (stroke-width 3), xếp kín theo lưới cột × hàng; tên phòng ở giữa phòng; dãy kích
   thước phía trên ghi bề rộng từng cột, bên trái ghi chiều sâu từng hàng (milimét, cùng tỉ lệ vẽ, đường gióng ở các mép phòng). Trả về
   { phong: [{ ten, dai, rong }] } (milimét; dai theo chiều ngang của hình). */
const docMatBang = (svg) => {
  daDoc.add(svg);
  assert.ok(khung(svg).w <= 320, "mặt bằng rộng không quá 320");
  const R = tags(svg, "rect"), TX = texts(svg), K = docKichThuoc(svg);
  kiemChu(svg, TX);
  assert.ok(R.length >= 2 && R.every((r) => r.stroke === "ink" && r["stroke-width"] === "3" && r.fill === "none"), "các phòng là hình chữ nhật nét đậm");
  const xs = [...new Set(R.flatMap((r) => [num(r, "x"), num(r, "x") + num(r, "width")].map((v) => Math.round(v * 100) / 100)))].sort((a, b) => a - b);
  const ys = [...new Set(R.flatMap((r) => [num(r, "y"), num(r, "y") + num(r, "height")].map((v) => Math.round(v * 100) / 100)))].sort((a, b) => a - b);
  assert.equal(R.length, (xs.length - 1) * (ys.length - 1), "các phòng xếp kín theo lưới");
  const tren = K.kt.filter((k) => k.huong === "ngang").sort((a, b) => a.a[0] - b.a[0]), trai = K.kt.filter((k) => k.huong === "đứng").sort((a, b) => a.a[1] - b.a[1]);
  assert.ok(tren.length === xs.length - 1 && tren.every((k, i) => close(k.a[0], xs[i], 0.02) && close(k.b[0], xs[i + 1], 0.02) && k.a[1] < ys[0]), "dãy kích thước phía trên ghi bề rộng từng cột");
  assert.ok(trai.length === ys.length - 1 && trai.every((k, i) => close(k.a[1], ys[i], 0.02) && close(k.b[1], ys[i + 1], 0.02) && k.a[0] < xs[0]), "dãy kích thước bên trái ghi chiều sâu từng hàng");
  const phong = R.map((r) => {
    const x = num(r, "x"), y = num(r, "y"), w = num(r, "width"), h = num(r, "height");
    const t = TX.filter((t) => +t.x > x && +t.x < x + w && +t.y > y && +t.y < y + h);
    assert.ok(t.length >= 1 && t.every((u) => u["text-anchor"] === "middle" && close(+u.x, x + w / 2, 0.02) && hop(u)[0] > x + 3 && hop(u)[1] < x + w - 3), "tên phòng ở giữa phòng, vừa phòng");
    return { ten: t.sort((a, b) => +a.y - +b.y).map((u) => u.t).join(" "), dai: Math.round(w * K.mm), rong: Math.round(h * K.mm) };
  });
  return { phong };
};

/* Ba hình chiếu vuông góc (Công nghệ 8, tr. 11–12; phương pháp chiếu góc thứ nhất): mỗi hình chiếu có đúng một đường bao (đa giác hay đường tròn nét liền
   đậm: stroke ink, stroke-width 2, không tô); trong đường bao có cạnh thấy (nét liền đậm), cạnh khuất (nét đứt: stroke-width 1.2, dasharray "5 3"), đường
   tâm (nét gạch dài – chấm: muted, dasharray "12 3 2 3", được vượt ra ngoài đường bao tới 8). Các hình chiếu cách nhau; hình ở trên bên trái là hình chiếu
   đứng, hình ngay dưới (cùng bề ngang) là hình chiếu bằng, hình ngay bên phải (cùng chiều cao) là hình chiếu cạnh; chiều cao của hình chiếu bằng bằng bề
   ngang của hình chiếu cạnh. Nhãn “(1)”… (nếu có) ở giữa, ngay dưới một hình chiếu. Trả về { dung, bang, canh, nhan: { "(1)": "dung", … } }; mỗi hình chiếu
   { w, h, bao: "tam giác"|"chữ nhật"|"vuông"|"tròn"|"đa giác", thay: [[x1,y1,x2,y2]…] (toạ độ trong hình chiếu), khuat, tron (đường tròn thấy bên trong), cheo }. */
const docBaHinh = (svg) => {
  daDoc.add(svg);
  const K = khung(svg); assert.ok(K.w <= 320, "hình rộng không quá 320");
  const PG = tags(svg, "polygon"), L = tags(svg, "line"), C = tags(svg, "circle"), TX = texts(svg);
  assert.ok(!tags(svg, "rect").length && !tags(svg, "path").length, "ba hình chiếu vẽ bằng polygon, line, circle");
  const kieu = (e) => (e.stroke === "ink" && e["stroke-width"] === "2" && !e["stroke-dasharray"] ? "thay" : e.stroke === "ink" && e["stroke-width"] === "1.2" && e["stroke-dasharray"] === "5 3" ? "khuat"
    : e.stroke === "muted" && e["stroke-width"] === "1" && e["stroke-dasharray"] === "12 3 2 3" ? "tam" : assert.fail("nét lạ: " + JSON.stringify(e)));
  const bao = PG.map((p) => { assert.ok(kieu(p) === "thay" && p.fill === "none", "đường bao là nét liền đậm, không tô"); const d = p.points.trim().split(/\s+/).map((q) => q.split(",").map(Number));
    return { loai: "pg", d, x0: Math.min(...d.map((q) => q[0])), x1: Math.max(...d.map((q) => q[0])), y0: Math.min(...d.map((q) => q[1])), y1: Math.max(...d.map((q) => q[1])) }; });
  const tron = C.map((c) => ({ k: kieu(c), cx: num(c, "cx"), cy: num(c, "cy"), r: num(c, "r") }));
  tron.forEach((c) => assert.ok(c.k !== "tam", "đường tròn là nét liền đậm hay nét đứt"));
  // đường tròn không nằm trong đa giác nào là đường bao của một hình chiếu
  const trong = (b, x, y, e = 0.01) => x >= b.x0 - e && x <= b.x1 + e && y >= b.y0 - e && y <= b.y1 + e;
  tron.filter((c) => c.k === "thay" && !bao.some((b) => trong(b, c.cx - c.r, c.cy) && trong(b, c.cx + c.r, c.cy))).forEach((c) => bao.push({ loai: "tron", c, x0: c.cx - c.r, x1: c.cx + c.r, y0: c.cy - c.r, y1: c.cy + c.r }));
  bao.forEach((a, i) => bao.slice(i + 1).forEach((b) => assert.ok(a.x1 + 12 < b.x0 || b.x1 + 12 < a.x0 || a.y1 + 12 < b.y0 || b.y1 + 12 < a.y0, "các hình chiếu cách nhau")));
  const hinh = bao.map((b) => {
    const w = b.x1 - b.x0, h = b.y1 - b.y0;
    const loai = b.loai === "tron" ? "tròn" : b.d.length === 3 ? "tam giác" : b.d.length === 4 && b.d.every((q) => (close(q[0], b.x0) || close(q[0], b.x1)) && (close(q[1], b.y0) || close(q[1], b.y1))) ? (close(w, h, 0.01) ? "vuông" : "chữ nhật") : "đa giác";
    return { b, w, h, bao: loai, thay: [], khuat: [], tam: [], tron: [], cheo: 0 };
  });
  const cua = (x, y, e) => { const v = hinh.filter((v) => trong(v.b, x, y, e)); assert.equal(v.length, 1, "mỗi nét nằm trong đúng một hình chiếu"); return v[0]; };
  L.forEach((l) => { const k = kieu(l), x1 = num(l, "x1"), y1 = num(l, "y1"), x2 = num(l, "x2"), y2 = num(l, "y2"), e = k === "tam" ? 8 : 0.01, v = cua(x1, y1, e);
    assert.ok(trong(v.b, x2, y2, e), "nét nằm trong hình chiếu của nó");
    v[k].push([x1 - v.b.x0, y1 - v.b.y0, x2 - v.b.x0, y2 - v.b.y0]);
    if (k === "thay" && v.bao === "vuông" && [[x1, y1], [x2, y2]].some(([x, y]) => (close(x, v.b.x0) || close(x, v.b.x1)) && (close(y, v.b.y0) || close(y, v.b.y1)))) v.cheo++; });
  tron.filter((c) => !bao.some((b) => b.c === c)).forEach((c) => { const v = cua(c.cx, c.cy, 0.01); assert.ok(trong(v.b, c.cx - c.r, c.cy - c.r) && trong(v.b, c.cx + c.r, c.cy + c.r), "đường tròn nằm trong hình chiếu");
    v.tron.push({ k: c.k, cx: c.cx - v.b.x0, cy: c.cy - v.b.y0, r: c.r }); });
  assert.ok(hinh.length === 2 || hinh.length === 3, "hình có hai hay ba hình chiếu");
  const dung = hinh.slice().sort((a, b) => a.b.y0 + a.b.x0 - b.b.y0 - b.b.x0)[0];
  const bang = hinh.find((v) => v !== dung && close(v.b.x0, dung.b.x0, 0.01) && close(v.b.x1, dung.b.x1, 0.01) && v.b.y0 > dung.b.y1);
  const canh = hinh.find((v) => v !== dung && close(v.b.y0, dung.b.y0, 0.01) && close(v.b.y1, dung.b.y1, 0.01) && v.b.x0 > dung.b.x1);
  assert.ok(bang, "hình chiếu bằng ở ngay dưới hình chiếu đứng, cùng bề ngang (cùng chiều dài vật)");
  assert.ok(hinh.length === 2 || canh, "hình chiếu cạnh ở ngay bên phải hình chiếu đứng, cùng chiều cao");
  if (canh) assert.ok(close(bang.h, canh.w, 0.01), "chiều cao của hình chiếu bằng bằng bề ngang của hình chiếu cạnh (cùng chiều rộng vật)");
  const nhan = {};
  TX.forEach((t) => { coChu(t); assert.ok(/^\(\d\)$/.test(t.t) && t["text-anchor"] === "middle", "nhãn hình chiếu ghi (1), (2)…: " + t.t);
    const v = hinh.filter((v) => close(+t.x, (v.b.x0 + v.b.x1) / 2, 0.01) && close(+t.y, v.b.y1 + 19, 0.01)); assert.equal(v.length, 1, "nhãn ở giữa, ngay dưới một hình chiếu");
    nhan[t.t] = v[0] === dung ? "dung" : v[0] === bang ? "bang" : "canh"; });
  trongKhung(svg, TX);
  const ra = (v) => v && { w: v.w, h: v.h, bao: v.bao, thay: v.thay, khuat: v.khuat, tam: v.tam, tron: v.tron, cheo: v.cheo };
  return { dung: ra(dung), bang: ra(bang), canh: ra(canh), nhan };
};

/* Chú thích các phần của một kích thước: nhãn “(1)”… (chữ cỡ 13) nối bằng một đường dẫn mảnh tô muted tới đúng một phần: đường gióng, đường kích thước
   (không chạm mũi tên) hay giá trị kích thước (đầu đường dẫn nằm sát hộp chữ). Trả về { "(1)": "đường gióng", … }. */
const docChuThich = (svg) => {
  daDoc.add(svg);
  const K = docKichThuoc(svg, { nhieuNet: true }), TX = texts(svg), L = tags(svg, "line");
  kiemChu(svg, TX);
  assert.equal(K.kt.length, 1, "hình có một kích thước để chú thích");
  const k = K.kt[0], gia = TX.find((t) => t.t === k.chu), dk = [...K.dung].filter((l) => num(l, "x1") === k.a[0] && num(l, "y1") === k.a[1] && num(l, "x2") === k.b[0] && num(l, "y2") === k.b[1]);
  const gi = [...K.dung].filter((l) => !dk.includes(l));
  const tren = (l, x, y) => { const x1 = num(l, "x1"), y1 = num(l, "y1"), x2 = num(l, "x2"), y2 = num(l, "y2"); return close((x2 - x1) * (y - y1) - (y2 - y1) * (x - x1), 0, 0.5) && x >= Math.min(x1, x2) - 0.01 && x <= Math.max(x1, x2) + 0.01 && y >= Math.min(y1, y2) - 0.01 && y <= Math.max(y1, y2) + 0.01; };
  const ra = {};
  TX.filter((t) => /^\(\d\)$/.test(t.t)).forEach((t) => {
    const h = hop(t), dan = L.filter((l) => l.stroke === "muted" && [[num(l, "x1"), num(l, "y1")], [num(l, "x2"), num(l, "y2")]].some(([x, y]) => x >= h[0] - 4 && x <= h[1] + 4 && y >= h[2] - 4 && y <= h[3] + 4));
    assert.equal(dan.length, 1, "mỗi nhãn một đường dẫn: " + t.t);
    const l = dan[0], p = [[num(l, "x1"), num(l, "y1")], [num(l, "x2"), num(l, "y2")]].sort((a, b) => Math.hypot(b[0] - (h[0] + h[1]) / 2, b[1] - (h[2] + h[3]) / 2) - Math.hypot(a[0] - (h[0] + h[1]) / 2, a[1] - (h[2] + h[3]) / 2))[0];
    const hg = hop(gia), toi = [];
    if (gi.some((g) => tren(g, ...p))) toi.push("đường gióng");
    if (dk.some((d) => tren(d, ...p)) && Math.min(Math.hypot(p[0] - k.a[0], p[1] - k.a[1]), Math.hypot(p[0] - k.b[0], p[1] - k.b[1])) > 10) toi.push("đường kích thước");
    if (p[0] >= hg[0] - 3 && p[0] <= hg[1] + 3 && p[1] >= hg[2] - 3 && p[1] <= hg[3] + 3) toi.push("giá trị kích thước");
    assert.equal(toi.length, 1, "đường dẫn của " + t.t + " chỉ đúng một phần: " + toi.join(", "));
    ra[t.t] = toi[0];
  });
  assert.equal(L.filter((l) => l.stroke === "muted").length, Object.keys(ra).length, "không có đường dẫn thừa");
  return ra;
};

/* ---------- bộ tính công thức bảng tính ----------
   Công thức như sách: bắt đầu bằng dấu =, phép + - * / ^, ngoặc tròn, địa chỉ ô (B2), địa chỉ tuyệt đối ($B$2; Tin học 8, tr. 23), vùng
   (B2:B6); hàm SUM, AVERAGE, MAX, MIN, COUNT (chỉ xét ô chứa số, bỏ qua ô trống, ô chữ). Sao chép công thức dời dh hàng, dc cột: phần có dấu $ đứng
   trước giữ nguyên, phần còn lại dời theo (Tin học 8, tr. 22–24). */
const soCot = (s) => [...s].reduce((a, ch) => a * 26 + ch.charCodeAt(0) - 64, 0), tenCot = (n) => (n > 26 ? tenCot(Math.floor((n - 1) / 26)) : "") + String.fromCharCode(65 + ((n - 1) % 26));
const chep = (f, dh, dc) => f.replace(/(\$?)([A-Z]+)(\$?)(\d+)/g, (m, a, c, b, r) => a + (a ? c : tenCot(soCot(c) + dc)) + b + (b ? r : +r + dh));
const boDo = (ref) => ref.replace(/\$/g, "");
const vung = (s) => { const [p, q] = boDo(s).split(":"), m = (x) => x.match(/^([A-Z]+)(\d+)$/), a = m(p), b = m(q || p), ra = [];
  for (let c = soCot(a[1]); c <= soCot(b[1]); c++) for (let r = +a[2]; r <= +b[2]; r++) ra.push(tenCot(c) + r); return ra; };
function tinh(f, o) {
  assert.ok(f.startsWith("="), "công thức bắt đầu bằng dấu =: " + f);
  const tk = [], re = /\s*(?:(\d+(?:\.\d+)?)|(\$?[A-Z]+\$?\d+(?::\$?[A-Z]+\$?\d+)?)|([A-Z]+)\(|([-+*/^(),]))/y;
  let m, i = 1;
  for (re.lastIndex = 1; i < f.length; i = re.lastIndex) { m = re.exec(f); assert.ok(m, "không đọc được công thức: " + f); tk.push(m[1] ? { n: +m[1] } : m[2] ? { ref: boDo(m[2]) } : m[3] ? { fn: m[3] } : { op: m[4] }); }
  let p = 0;
  const nhin = () => tk[p], an = (op) => { assert.ok(tk[p] && tk[p].op === op, `công thức thiếu “${op}”: ${f}`); p++; };
  const so = (x) => (Array.isArray(x) ? assert.fail("vùng đứng một mình: " + f) : x === "" || x === undefined ? 0 : typeof x === "number" ? x : assert.fail("phép tính với ô chữ: " + f));
  const cong = () => { let a = nhan(); while (nhin() && ["+", "-"].includes(nhin().op)) { const op = tk[p++].op, b = nhan(); a = op === "+" ? so(a) + so(b) : so(a) - so(b); } return a; };
  const nhan = () => { let a = mu(); while (nhin() && ["*", "/"].includes(nhin().op)) { const op = tk[p++].op, b = mu(); a = op === "*" ? so(a) * so(b) : so(a) / so(b); } return a; };
  const mu = () => { const a = mot(); if (nhin() && nhin().op === "^") { p++; return so(a) ** so(mu()); } return a; };
  const mot = () => { const t = tk[p++]; assert.ok(t, "công thức thiếu phần sau: " + f);
    if (t.op === "-") return -so(mot());
    if (t.op === "(") { const v = cong(); an(")"); return v; }
    if ("n" in t) return t.n;
    if (t.ref) return t.ref.includes(":") ? vung(t.ref) : (o[t.ref] === undefined ? "" : o[t.ref]);
    if (t.fn) { const ts = [cong()]; while (nhin() && nhin().op === ",") { p++; ts.push(cong()); } an(")"); assert.ok(HAM[t.fn], "hàm lạ: " + t.fn); return HAM[t.fn](ts); }
    assert.fail("không đọc được công thức: " + f); };
  const soTrong = (ts) => ts.flatMap((x) => (Array.isArray(x) ? x.map((c) => o[c]) : [x])).filter((v) => typeof v === "number");
  const HAM = { SUM: (ts) => sum(soTrong(ts)), AVERAGE: (ts) => { const a = soTrong(ts); assert.ok(a.length, "AVERAGE không có số"); return sum(a) / a.length; },
    MAX: (ts) => Math.max(...soTrong(ts)), MIN: (ts) => Math.min(...soTrong(ts)), COUNT: (ts) => soTrong(ts).length };
  const v = cong();
  assert.equal(p, tk.length, "công thức còn thừa: " + f);
  return v;
}
// các công thức có trong một đoạn chữ: dấu = liền với chữ hoa, $, chữ số hay dấu ngoặc, đến khoảng trắng gần nhất (bỏ dấu câu ở cuối)
const congThuc = (s) => [...String(s).matchAll(/(?<![\p{L}\d])=[A-Z$(\d][^\s]*/gu)].map((m) => {
  let f = m[0].replace(/[.,;]+$/, "");
  while (f.endsWith(")") && (f.match(/\)/g) || []).length > (f.match(/\(/g) || []).length) f = f.slice(0, -1).replace(/[.,;]+$/, "");
  return f;
});
// các hàng dữ liệu của trang tính (dưới hàng tiêu đề): [{ r, A: …, B: … }]
const hangDL = (t) => { const ra = []; for (let r = t.tieuDe + 1; r <= t.hang; r++) { const h = { r }; for (let c = 1; c <= t.cot; c++) h[tenCot(c)] = t.o[tenCot(c) + r]; ra.push(h); } return ra; };
const cotCua = (t, ten) => { for (let c = 1; c <= t.cot; c++) if (t.o[tenCot(c) + t.tieuDe] === ten) return tenCot(c); assert.fail("trang tính không có cột " + ten); };

/* ---------- bảng theo sách (OnUp-Book lop-8/tin-hoc-8, lop-8/cong-nghe-8; page-N là trang in N − 2) ---------- */
// Tin học 8, tr. 7–8: linh kiện điện tử chính của năm thế hệ máy tính điện tử
const THE_HE = ["Đèn điện tử chân không", "Bóng bán dẫn", "Mạch tích hợp (IC)", "Mạch tích hợp cỡ rất lớn (VLSI)", "Mạch tích hợp cỡ siêu lớn (ULSI)"];
// Tin học 8, tr. 25: chép bảng từ tệp văn bản sang trang tính (chọn bảng, Copy, chọn ô góc trên bên trái của vùng dán, Paste)
const CHEP_BANG = ["Chọn cả bảng trong tệp văn bản", "Sao chép bảng đã chọn (Ctrl + C)", "Mở trang tính, chọn ô sẽ là góc trên bên trái của bảng", "Dán bảng vào trang tính"];
// Tin học 8, tr. 28–29: hộp thoại Sort
const HOP_SORT = { "My data has headers": "Giữ hàng tiêu đề, không xếp lẫn vào dữ liệu", "Add Level": "Thêm một tiêu chí sắp xếp nữa", "Delete Level": "Xoá bớt một tiêu chí sắp xếp", Order: "Chọn thứ tự tăng dần hay giảm dần" };
// Công nghệ 8, tr. 8, Bảng 1.3: nét vẽ và ứng dụng
const NET = { "Nét liền đậm": "Đường bao, cạnh nhìn thấy được", "Nét liền mảnh": "Đường kích thước, đường gióng", "Nét đứt mảnh": "Đường bao, cạnh bị che khuất", "Nét gạch dài - chấm - mảnh": "Đường tâm, đường trục đối xứng" };
// Công nghệ 8, tr. 7, Bảng 1.2: tỉ lệ phóng to
const PHONG_TO = [2, 5, 10, 20, 50, 100, 200, 500, 1000, 5000];
// Công nghệ 8, tr. 18–19: các bước vẽ hình chiếu vuông góc của vật thể đơn giản (viết bằng lời khác)
const BUOC_VE = ["Xem vật thể gồm những khối đơn giản nào", "Chọn hướng chiếu cho từng hình chiếu", "Vẽ mờ các hình chiếu bằng nét liền mảnh", "Tô đậm nét thấy, tẩy nét thừa rồi ghi kích thước"];
// Công nghệ 8, tr. 22, Bảng 3.1: trình tự đọc bản vẽ chi tiết
const DOC_CHI_TIET = ["Đọc khung tên", "Đọc các hình biểu diễn", "Đọc các kích thước", "Đọc yêu cầu kĩ thuật"];
// Công nghệ 8, tr. 35: gang có tỉ lệ carbon lớn hơn 2,14%, thép nhỏ hơn hoặc bằng 2,14%
const CARBON_GANG = 2.14;
// Công nghệ 8, tr. 12–17: nhận ra khối từ hình dạng hình chiếu đứng, hình chiếu bằng (hình vuông có hai đường chéo: các cạnh bên của hình chóp)
const KHOI = (v) => (v.dung.bao === "tam giác" && v.bang.bao === "vuông" && v.bang.cheo === 2 ? "Hình chóp tứ giác đều"
  : v.dung.bao === "chữ nhật" && v.bang.bao === "tròn" ? "Hình trụ" : v.dung.bao === "tam giác" && v.bang.bao === "tròn" ? "Hình nón"
  : v.dung.bao === "tròn" && v.bang.bao === "tròn" ? "Hình cầu" : assert.fail("không nhận ra khối"));
const TEN_HC = { dung: "hình chiếu đứng", bang: "hình chiếu bằng", canh: "hình chiếu cạnh" };
const hoaDau = (s) => s[0].toUpperCase() + s.slice(1);

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans, o[0], a, o hoặc r theo l). */
const lc = (q, f) => { const m = q.o.filter(f); assert.equal(m.length, 1, "đúng một lựa chọn khớp: " + q.q.slice(0, 50)); return m[0]; };
const soCua = (re, s) => { const m = re.exec(s); assert.ok(m, "không đọc được số liệu: " + re); return m.slice(1).map(val); };
const CHECKS = [
  // Tin học: Đề 1
  { id: T.de1, has: "Sắp xếp các linh kiện điện tử chính", right: () => THE_HE },
  { id: T.de1, has: "Ô F3 có công thức =D3-E3. Sao chép ô F3 sang ô G6", right: () => chep("=D3-E3", 6 - 3, soCot("G") - soCot("F")) },
  { id: T.de1, has: "Hưng ghi số điện gia đình", right: (q) => {
    const t = docTrang(q.svg), f = "=B2*B5";
    assert.equal(t.o.C2, tinh(f, t.o), "ô C2 hiện đúng kết quả của =B2*B5");
    const g = [1, 2].map((k) => chep(f, k, 0)), ra = g.map((x) => x.match(/\*(B\d+)$/)[1]);
    g.forEach((x, k) => { assert.equal(t.o["C" + (3 + k)], tinh(x, t.o), "ô C" + (3 + k) + " hiện đúng kết quả của " + x); assert.ok(!(ra[k] in t.o), ra[k] + " là ô trống"); });
    assert.ok(q.x.includes(g[0]) && q.x.includes(g[1]), "lời giải ghi công thức sau khi sao chép");
    return `Địa chỉ B5 đã đổi theo thành ${ra.join(", ")} là hai ô trống`; } },
  { id: T.de1, has: "tiền vé tham quan", right: (q) => { const t = docTrang(q.svg), f = q.q.match(/công thức (=\S+) rồi/)[1];
    assert.equal(f, "=B2*$B$7"); assert.equal(t.o.A7, "Giá vé", "ô B7 là giá vé"); assert.ok(/Ô C5 hiện số nào/.test(q.q));
    return tinh(chep(f, 3, 0), t.o); } },
  { id: T.de1, has: "Ba tổ ghi điểm thi đua", right: (q) => { const t = docTrang(q.svg), f = "=B2-C2";
    assert.equal(t.o.D2, tinh(f, t.o), "ô D2 hiện đúng kết quả của công thức");
    return q.o.map((s) => {
      let m;
      if ((m = s.match(/^Sao chép ô D2 (?:xuống|sang) ô ([A-Z]+)(\d+) thì ô \1\2 có công thức (=\S+)$/))) return chep(f, +m[2] - 2, soCot(m[1]) - 4) === m[3];
      if ((m = s.match(/^Sao chép ô D2 xuống ô D(\d+) thì ô D\1 hiện (\d+)$/))) return tinh(chep(f, +m[1] - 2, 0), t.o) === +m[2];
      if ((m = s.match(/^Sửa số ở ô ([A-Z]\d+) thành (\d+) thì ô D2 vẫn hiện (\d+)$/))) return tinh(f, Object.assign({}, t.o, { [m[1]]: +m[2] })) === +m[3];
      return assert.fail("không đọc được ý: " + s); }); } },
  { id: T.de1, has: "Nối mỗi mục trong hộp thoại Sort", right: (q) => q.l.map((l) => { assert.ok(HOP_SORT[l], "bảng hộp thoại Sort có " + l); return HOP_SORT[l]; }) },
  { id: T.de1, has: "số lần tâng cầu", right: (q) => { const t = docTrang(q.svg), so = cotCua(t, "Số lần"), ten = cotCua(t, "Họ tên");
    const h = hangDL(t).sort((a, b) => b[so] - a[so]); assert.ok(new Set(h.map((x) => x[so])).size === h.length, "không có hai số bằng nhau");
    const k = +q.q.match(/hàng (\d+) của trang tính/)[1]; return h[k - t.tieuDe - 1][ten]; } },
  { id: T.de1, has: "quyên góp sách như bảng", right: (q) => { const t = docTrang(q.svg), [nguong] = soCua(/từ (\d+) quyển truyện trở lên/, q.q), c = cotCua(t, "Truyện");
    assert.ok(q.q.includes("Number Filters")); return hangDL(t).filter((h) => h[c] >= nguong).length; } },
  { id: T.de1, has: "Biểu đồ cột ở hình được tạo từ bảng ở phía trên", right: (q) => {
    const [p1, p2] = phan(q.svg), t = docTrang(p1), b = docCot(p2), h = hangDL(t), k = cotCua(t, "Khối"), so = cotCua(t, "Số bài");
    assert.deepEqual(b.cats, h.map((x) => x[k]), "tên nhóm của biểu đồ là tên khối ở bảng"); assert.deepEqual(b.series[0].v, h.map((x) => x[so]), "chiều cao các cột đúng số ở bảng");
    const i = b.series[0].v.indexOf(Math.max(...b.series[0].v)); assert.equal(b.series[0].v.filter((v) => v === b.series[0].v[i]).length, 1, "một cột cao nhất");
    return `${b.cats[i]}, ô ${so}${h[i].r}`; } },
  { id: T.de1, has: "so sánh số bạn nam và số bạn nữ", right: (q) => { const t = docTrang(q.svg), mon = cotCua(t, "Môn thể thao"), cuoi = cotCua(t, "Nữ");
    assert.equal(t.o.A1, "TT", "cột A là số thứ tự, không chọn"); assert.equal(soCot(cotCua(t, "Nam")) + 1, soCot(cuoi), "hai cột số liền nhau");
    return `${mon}${t.tieuDe}:${cuoi}${t.hang}`; } },
  // Tin học: Đề 2
  { id: T.de2, has: "Sắp xếp các việc sau theo đúng thứ tự", right: () => CHEP_BANG },
  { id: T.de2, has: "Ô D3 có công thức =B3*C3*$F$1", right: () => { const f = "=B3*C3*$F$1", g = chep(f, 1, 0), a = f.match(/\$?[A-Z]+\$?\d+/g), b = g.match(/\$?[A-Z]+\$?\d+/g);
    const giu = a.filter((x, i) => x === b[i]); assert.equal(giu.length, 1); return "Địa chỉ " + giu[0]; } },
  { id: T.de2, has: "câu lạc bộ của trường; ô B6", right: (q) => { const t = docTrang(q.svg), f = "=B2*100/$B$6";
    assert.equal(t.o.B6, tinh("=SUM(B2:B5)", t.o), "ô B6 là tổng số thành viên"); assert.equal(t.o.C2, tinh(f, t.o), "ô C2 hiện đúng kết quả");
    assert.ok(q.x.includes(String(tinh(chep(f, 3, 0), t.o))), "lời giải ghi kết quả ở ô C5"); return chep(f, 3, 0); } },
  { id: T.de2, has: "Lớp 8D mua nước uống", right: (q) => { const t = docTrang(q.svg); assert.equal(t.tieuDe, 2, "hàng 1 là ô giá, hàng 2 là tiêu đề"); assert.equal(t.o.A1, "Giá 1 chai");
    return lc(q, (f) => hangDL(t).every((h) => { try { return tinh(chep(f, h.r - 3, 0), t.o) === h.B * t.o.B1; } catch (e) { return false; } })); } },
  { id: T.de2, has: "các món lớp 8A mua cho vườn trường", right: (q) => { const t = docTrang(q.svg), f = "=B2*C2";
    assert.equal(t.o.D2, tinh(f, t.o), "ô D2 hiện đúng kết quả"); assert.equal(t.o.A6, "Tổng");
    const o = Object.assign({}, t.o); [3, 4, 5].forEach((r) => { o["D" + r] = tinh(chep(f, r - 2, 0), o); });
    [3, 4, 5].forEach((r) => assert.ok(q.x.includes(`D${r} = ${t.o["B" + r]} × ${t.o["C" + r]} = ${o["D" + r]}`), "lời giải ghi ô D" + r));
    return tinh("=SUM(D2:D5)", o); } },
  { id: T.de2, has: "các tổ ghi số pin cũ", right: (q) => { const t = docTrang(q.svg), lop = cotCua(t, "Lớp"), so = cotCua(t, "Số pin"), to = cotCua(t, "Tổ");
    const h = hangDL(t).sort((a, b) => (a[lop] < b[lop] ? -1 : a[lop] > b[lop] ? 1 : b[so] - a[so]));
    const k = +q.q.match(/hàng (\d+) của trang tính/)[1], x = h[k - t.tieuDe - 1]; return `${x[to]} của lớp ${x[lop]}`; } },
  { id: T.de2, has: "đi học đúng giờ của hai lớp", right: (q) => { const b = docCot(q.svg);
    assert.equal(b.series.length, 2, "hai dãy cột"); b.series.forEach((s) => assert.ok(q.q.includes("“" + s.name + "”"), "đề bài nhắc tên dãy " + s.name)); return "Chú giải"; } },
  { id: T.de2, has: "số lượt mượn sách", right: (q) => { const d = docDuong(q.svg), tang = d.v.slice(1).map((v, i) => v - d.v[i]), i = tang.indexOf(Math.max(...tang));
    assert.equal(tang.filter((v) => v === tang[i]).length, 1, "một lần tăng nhiều nhất"); return `Từ ${d.cats[i]} sang ${d.cats[i + 1]}`; } },
  { id: T.de2, has: "theo cách đến trường", right: (q) => { const d = docTron(q.svg), [si] = soCua(/có (\d+) học sinh/, q.q), p = d.parts.find((x) => x.ten === "Xe đạp");
    return (si * p.pct) / 100; } },
  // Công nghệ: Đề 1
  { id: C.de1, has: "Nối mỗi loại nét vẽ", right: (q) => q.l.map((l) => { assert.ok(NET[l], "bảng nét vẽ có " + l); return NET[l]; }) },
  { id: C.de1, has: "Các phần được đánh số (1), (2), (3)", right: (q) => { const m = docChuThich(q.svg); return hoaDau(["(1)", "(2)", "(3)"].map((k) => m[k]).join(", ")); } },
  { id: C.de1, has: "được vẽ trên bản vẽ có tỉ lệ 1 : 5", right: (q) => { const [L, k] = soCua(/dài (\d+) mm được vẽ trên bản vẽ có tỉ lệ 1 : (\d+)/, q.q); return L / k; } },
  { id: C.de1, has: "ba hình chiếu vuông góc của một khối chữ T", right: (q) => { const v = docBaHinh(q.svg);
    // khối chữ T ngược: chỗ gờ nhô lên ở hình chiếu đứng trùng hai cạnh thấy của hình chiếu bằng; vai của đế ở hình chiếu đứng trùng cạnh thấy của hình chiếu cạnh
    assert.ok(v.dung.bao === "đa giác" && v.bang.bao === "chữ nhật" && v.canh.bao === "vuông", "hình chiếu đứng là chữ T, hai hình còn lại là hình chữ nhật, hình vuông");
    assert.deepEqual(v.bang.thay.map((l) => (l[0] === l[2] ? l[0] : -1)).sort((a, b) => a - b), [v.bang.w / 3, (2 * v.bang.w) / 3], "hai cạnh thấy của gờ trên hình chiếu bằng");
    assert.ok(v.canh.thay.length === 1 && v.canh.thay[0][1] === v.canh.thay[0][3], "một cạnh thấy nằm ngang trên hình chiếu cạnh (vai của đế)");
    return hoaDau(["(1)", "(2)", "(3)"].map((k) => TEN_HC[v.nhan[k]]).join(", ")); } },
  { id: C.de1, has: "Đọc bản vẽ chi tiết ở hình", right: (q) => { const [p1, p2] = phan(q.svg), K = docKichThuoc(p1, { nhieuNet: true }), B = docBang(p2);
    const o = {}; B.o.forEach((h) => { for (let i = 0; i + 1 < h.length; i += 2) o[h[i]] = h[i + 1]; });
    const ngang = K.kt.filter((k) => k.kieu === "dài" && k.huong === "ngang").sort((a, b) => a.a[0] - b.a[0]), dung = K.kt.filter((k) => k.kieu === "dài" && k.huong === "đứng"), lo = K.kt.filter((k) => k.kieu === "Ø");
    assert.ok(ngang.length === 2 && dung.length === 1 && lo.length === 1, "bản vẽ có dài, bề dày (nằm ngang), rộng (thẳng đứng) và đường kính lỗ");
    const PG = tags(p1, "polygon").filter((p) => p["stroke-width"] === "2").map((p) => { const d = p.points.split(" ").map((x) => x.split(",").map(Number)); return { x0: Math.min(...d.map((x) => x[0])), x1: Math.max(...d.map((x) => x[0])), y0: Math.min(...d.map((x) => x[1])), y1: Math.max(...d.map((x) => x[1])) }; }).sort((a, b) => a.x0 - b.x0);
    assert.ok(PG.length === 2 && close(ngang[0].a[0], PG[0].x0) && close(ngang[0].b[0], PG[0].x1) && close(ngang[1].a[0], PG[1].x0) && close(ngang[1].b[0], PG[1].x1) && close(dung[0].a[1], PG[0].y0) && close(dung[0].b[1], PG[0].y1), "kích thước ghi đúng cạnh của hai hình chiếu");
    assert.equal(o["Tỉ lệ"], "1 : 2", "khung tên ghi tỉ lệ");
    return `${hoaDau(o["Tên gọi"].toLowerCase())} bằng ${o["Vật liệu"].toLowerCase()}, dài ${ngang[0].v} mm, rộng ${dung[0].v} mm, dày ${ngang[1].v} mm, có lỗ Ø${lo[0].v}`; } },
  { id: C.de1, has: "bảng kê trên bản vẽ lắp của một bộ giá kẹp", right: (q) => { const B = docBang(q.svg), c = B.o[0].indexOf("Số lượng");
    assert.ok(B.dam === 0 && c >= 0 && B.o[0][0] === "STT", "bảng kê: hàng đầu là tiêu đề có cột Số lượng"); B.o.slice(1).forEach((h, i) => assert.equal(h[0], String(i + 1), "số thứ tự tăng dần"));
    return sum(B.o.slice(1).map((h) => +h[c])); } },
  { id: C.de1, has: "Trên mặt bằng của một ngôi nhà có kí hiệu như ở hình", right: (q) => docCua(q.svg).loai },
  { id: C.de1, has: "Diện tích phòng ngủ là bao nhiêu mét vuông", right: (q) => { const p = docMatBang(q.svg).phong.find((x) => x.ten === "Phòng ngủ"); return (p.dai * p.rong) / 1e6; } },
  { id: C.de1, has: "kim loại đen có tỉ lệ carbon", right: () => CARBON_GANG },
  { id: C.de1, has: "Hình là một cặp bánh răng ăn khớp. Bánh dẫn quay theo chiều kim đồng hồ", right: (q) => { const g = docTruyen(q.svg);
    assert.equal(g.kieu, "răng"); const [dan, bi] = ["Bánh dẫn", "Bánh bị dẫn"].map((t) => g.banh.find((b) => b.ten === t));
    // Công nghệ 8, tr. 39: bánh răng bị dẫn quay ngược chiều bánh dẫn; bánh ít răng hơn quay nhanh hơn (n1/n2 = Z2/Z1)
    return `Ngược chiều kim đồng hồ, ${bi.Z < dan.Z ? "nhanh" : "chậm"} hơn bánh dẫn`; } },
  { id: C.de1, has: "bộ truyền xích của một máy tuốt lúa", right: (q) => { const g = docTruyen(q.svg), [n1] = soCua(/quay (\d+) vòng\/phút/, q.q);
    assert.equal(g.kieu, "xích"); const [dan, bi] = ["Đĩa dẫn", "Đĩa bị dẫn"].map((t) => g.banh.find((b) => b.ten === t));
    assert.ok(q.q.includes(dan.Z + " răng") && q.q.includes(bi.Z + " răng"), "đề bài ghi đúng số răng trên hình"); return (n1 * dan.Z) / bi.Z; } },
  { id: C.de1, has: "bánh đai dẫn lắp trên trục động cơ", right: (q) => { const [n1, D1, n2] = soCua(/quay (\d[\d ]*) vòng\/phút; bánh đai dẫn .* đường kính (\d+) mm\. Muốn trục máy bơm quay (\d+) vòng\/phút/, q.q);
    return (D1 * n1) / n2; } }, // n1/n2 = D2/D1 (Công nghệ 8, tr. 38, công thức 7.1)
  // Công nghệ: Đề 2
  { id: C.de2, has: "đoạn thẳng dài 45 mm biểu diễn chiều dài thật 9 mm", right: (q) => { const [ve, that] = soCua(/dài (\d+) mm biểu diễn chiều dài thật (\d+) mm/, q.q), k = ve / that;
    assert.ok(Number.isInteger(k) && PHONG_TO.includes(k), "tỉ lệ phóng to có trong bảng của sách"); return `${k} : 1`; } },
  { id: C.de2, has: "Sắp xếp các bước vẽ ba hình chiếu vuông góc", right: () => BUOC_VE },
  { id: C.de2, has: "Ba hình chiếu vuông góc ở hình là của một khối đa diện đều", right: (q) => { const v = docBaHinh(q.svg);
    assert.ok(v.canh && v.canh.bao === "tam giác" && close(v.canh.w, v.bang.h) && Object.keys(v.nhan).length === 0, "hình chiếu cạnh là tam giác; hình không có nhãn tên hình chiếu");
    return KHOI(v); } },
  { id: C.de2, has: "dài 60 mm, rộng 40 mm, cao 30 mm nằm trên mặt bàn", right: (q) => { const [L, W, H] = soCua(/dài (\d+) mm, rộng (\d+) mm, cao (\d+) mm/, q.q);
    const kt = { "đứng": [L, H], "bằng": [L, W], "cạnh": [W, H] };
    return q.o.map((s) => { let m;
      if ((m = s.match(/^Hình chiếu (đứng|bằng|cạnh) là hình chữ nhật (\d+) mm × (\d+) mm$/))) return kt[m[1]][0] === +m[2] && kt[m[1]][1] === +m[3];
      if (s === "Cả ba hình chiếu đều là hình chữ nhật") return true;
      return assert.fail("không đọc được ý: " + s); }); } },
  { id: C.de2, has: "Sắp xếp các bước đọc một bản vẽ chi tiết", right: () => DOC_CHI_TIET },
  { id: C.de2, has: "bản vẽ chi tiết một trục bậc", right: (q) => { const K = docKichThuoc(q.svg, { oDai: true }), oo = K.kt.filter((k) => k.kieu === "Ø"), dai = K.kt.filter((k) => k.kieu === "dài");
    assert.ok(oo.length === 2 && oo.every((k) => k.huong === "đứng") && dai.length === 2 && dai.every((k) => k.huong === "ngang"), "trục bậc: hai đường kính, hai chiều dài bậc");
    const PG = tags(q.svg, "polygon").filter((p) => p["stroke-width"] === "2"); assert.equal(PG.length, 1, "một đường bao của trục");
    const d = PG[0].points.split(" ").map((x) => x.split(",").map(Number)), xs = [...new Set(d.map((x) => x[0]))].sort((a, b) => a - b);
    assert.ok(close(dai[0].a[0], xs[0]) && close(dai[1].b[0], xs[2]) && close(dai[0].b[0], xs[1]), "chiều dài các bậc ghi đúng chỗ chuyển bậc");
    return `Ø${Math.max(...oo.map((k) => k.v))} và ${sum(dai.map((k) => k.v))} mm`; } },
  { id: C.de2, has: "Phòng khách có diện tích lớn hơn phòng ngủ 1", right: (q) => { const p = docMatBang(q.svg).phong, s = (t) => { const r = p.find((x) => x.ten === t); return (r.dai * r.rong) / 1e6; };
    return Math.round((s("Phòng khách") - s("Phòng ngủ 1")) * 1e6) / 1e6; } },
  { id: C.de2, has: "Tỉ số truyền của bộ truyền này bằng bao nhiêu", right: (q) => { const g = docTruyen(q.svg); assert.equal(g.kieu, "răng");
    const [dan, bi] = ["Bánh dẫn", "Bánh bị dẫn"].map((t) => g.banh.find((b) => b.ten === t));
    assert.ok(q.q.includes("i = n1 : n2"), "đề bài ghi công thức của sách"); return bi.Z / dan.Z; } } // i = n1/n2 = Z2/Z1 (Công nghệ 8, tr. 39, công thức 7.2)
];
let n = 0, nCt = 0; // số câu đã tính lại hoặc đọc lại hình; số công thức trong câu Tin học đã đọc
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong hai kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const want = c.right(q), got = q.type === "fill" ? q.ans[0] : q.type === "num" ? q.ans : q.type === "tf4" ? q.a : q.type === "order" ? q.o : q.type === "match" ? q.r.slice(0, q.l.length) : q.o[0];
  if (typeof want === "number") assert.ok(typeof got === "number" && close(got, want, 1e-6), at + ": đáp án " + got + ", tính được " + want);
  else assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
  if (q.type === "num") { const w = String(Math.round(want * 1e6) / 1e6).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, " "); assert.ok(coCum(q.x, w), at + ": lời giải ghi kết quả " + w); }
  checked.add(q); n++;
});
// câu trả lời bằng số, câu có hình, câu sắp xếp, câu nối nào cũng phải được tính lại ở trên; hình nào cũng được đọc lại
kho.filter((q) => q.type === "num" || q.svg || q.type === "order" || q.type === "match").forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg) || (GHEP.has(q.svg) && GHEP.get(q.svg).every((p) => daDoc.has(p))), "hình chưa được đọc lại: " + q.q.slice(0, 60)));
assert.ok(MON.every((s) => s.from.every((id) => s.kho.some((q) => q.src === id && q.svg))), "đề cố định nào cũng có câu có hình");
// câu nối: một ô thừa, cặp nối không có chữ chung (không đoán được bằng chữ giống nhau)
const tuDon = (s) => new Set(String(s).toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 1));
kho.filter((q) => q.type === "match").forEach((q) => {
  assert.equal(q.r.length, q.l.length + 1, "câu nối có một ô thừa: " + q.q.slice(0, 50));
  q.l.forEach((l, i) => { const b = tuDon(q.r[i]); assert.ok(![...tuDon(l)].some((w) => b.has(w)), `cặp nối “${l}” – “${q.r[i]}” có chữ chung`); });
});
// mọi công thức trong câu Tin học đọc được, số trong công thức nhỏ hơn 1 000
{
  let dem = 0;
  T.kho.forEach((q) => [q.q, q.x].concat(q.o || []).forEach((s) => congThuc(s).forEach((f) => {
    dem++;
    const o = {}; (f.match(/\$?[A-Z]+\$?\d+(?::\$?[A-Z]+\$?\d+)?/g) || []).forEach((r) => vung(r).forEach((c) => { o[c] = 1; })); // mỗi ô một số để thử đọc công thức
    tinh(f, o);
    (f.replace(/\$?[A-Z]+\$?\d+/g, "").match(/\d+/g) || []).forEach((x) => assert.ok(+x < 1000, "số trong công thức nhỏ hơn 1 000: " + f));
  })));
  assert.ok(dem >= 25, "kho Tin học có các công thức để đọc lại"); nCt = dem;
}

/* ---------- chữ, lời dặn ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).map(String);
const TINH_CU = ["Hà Giang", "Yên Bái", "Bắc Kạn", "Vĩnh Phúc", "Hoà Bình", "Bắc Giang", "Thái Bình", "Hải Dương", "Hà Nam", "Nam Định", "Quảng Bình",
  "Quảng Nam", "Kon Tum", "Bình Định", "Phú Yên", "Ninh Thuận", "Bình Thuận", "Đắk Nông", "Bà Rịa", "Bình Dương", "Bình Phước", "Long An", "Tiền Giang",
  "Bến Tre", "Trà Vinh", "Hậu Giang", "Sóc Trăng", "Bạc Liêu", "Kiên Giang", "Thừa Thiên"];
// tên nhân vật của sách Tin học 8 (An, Minh, Khoa): không dùng làm tên người trong câu
const TEN_SACH = ["An", "Minh", "Khoa"];
// năm được nhắc ở các câu Lịch sử công cụ tính toán, lời dặn (số bốn chữ số liền là năm)
const NAM = new Set([1642, 1833, 1944, 1945, 2015]);
kho.forEach((q) => chu(q).concat(q.svg ? [chuHinh(q.svg)] : []).forEach((s) => {
  const at = q.src + ": “" + s.slice(0, 60) + "”";
  assert.ok(!/(?<![\p{L}])(?:huyện|63 tỉnh|64 tỉnh)(?![\p{L}])/iu.test(s), at + ": đơn vị hành chính cũ");
  TINH_CU.forEach((t) => assert.ok(!new RegExp(`(?<![\\p{L}])${t}(?![\\p{L}])`, "u").test(s), at + ": tên tỉnh đã nhập “" + t + "”"));
  assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|lũy|thỏa|kỹ|lý)(?![\p{L}])/iu.test(s), at + ": dấu thanh, chữ kiểu sách (hoá, khoẻ, kĩ, lí)");
  TEN_SACH.forEach((t) => assert.ok(!new RegExp(`(?<![\\p{L}])${t}(?![\\p{L}])`, "u").test(s), at + ": tên nhân vật của sách “" + t + "”"));
  (s.match(/(?<![\d,])\d{4,}(?![\d,])/g) || []).forEach((x) => assert.ok(T.kho.includes(q) && NAM.has(+x), at + ": số từ 1 000 ngăn hàng nghìn bằng khoảng trắng (chỉ năm viết liền): " + x));
  assert.ok(!/\d\.\d/.test(s), at + ": dấu phẩy thập phân");
  assert.ok(!/(?:phương án|lựa chọn) [A-D]\b|câu [A-D]\b/.test(s), at + ": không nhắc vị trí của phương án");
  if (C.kho.includes(q)) {
    assert.ok(!/(?<![\p{L}])(?:khoan|thanh răng|vít me)(?![\p{L}])/iu.test(s), at + ": sách Công nghệ 8 in năm 2026 không dạy khoan, bánh răng – thanh răng");
    assert.ok(!/i\s*=\s*n2|i\s*=\s*Z1\s*[:/]|i\s*=\s*D1\s*[:/]|Z1\s*:\s*Z2\s*=\s*i/.test(s), at + ": tỉ số truyền theo công thức của sách in năm 2026 (i = n1/n2 = Z2/Z1)");
  }
}));
// lời dặn: các bài theo mục lục sách in năm 2026, nhắc phần trường có thể dạy khác; không có câu về đề chung của Sở (lớp 8 không thuộc Thông tư 89/2026)
const BAI = {
  [T.m]: ["Bài 1 Lược sử công cụ tính toán", "Bài 2 Thông tin trong môi trường số", "Bài 3 Thực hành: Khai thác thông tin số", "Bài 4 Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số",
    "Bài 5 Sử dụng bảng tính giải quyết bài toán thực tế", "Bài 6 Sắp xếp và lọc dữ liệu", "Bài 7 Trình bày dữ liệu bằng biểu đồ", "Bài 8a", "Bài 8b", "13 câu về bảng tính (Bài 5–7)"],
  [C.m]: ["Chương I Vẽ kĩ thuật", "Bài 1 Một số tiêu chuẩn trình bày bản vẽ kĩ thuật", "Bài 2 Hình chiếu vuông góc", "Bài 3 Bản vẽ chi tiết", "Bài 4 Bản vẽ lắp", "Bài 5 Bản vẽ nhà",
    "Chương II Cơ khí", "Bài 6 Vật liệu cơ khí", "Bài 7 Truyền và biến đổi chuyển động", "Bài 8 Gia công cơ khí bằng tay", "Bài 9 Ngành nghề trong lĩnh vực cơ khí", "Bài 10",
    "Chương III", "15 câu Chương I, 10 câu Chương II", "i = n1 : n2"]
};
MON.forEach((s) => s.from.forEach((id) => {
  const note = bank(id).note;
  BAI[s.m].forEach((b) => assert.ok(note.includes(b), id + ": lời dặn ghi " + b));
  assert.ok(/10 câu Biết, 8 câu Hiểu, 7 câu Vận dụng/.test(note) && !/đề chung/.test(note), id + ": lời dặn ghi ma trận, không nói đề chung của Sở");
}));

/* ---------- dạng câu, mức độ, ma trận, rút thử ---------- */
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
const phanNhan = (t) => t.replace(/\s*\([^)]*\)$/, "").split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const CHUNG = new Set(["nào dưới", "dưới đây", "đây là", "là một", "mỗi ý", "ý sau", "sau đúng", "đúng hay", "hay sai", "ở hình", "nào sau", "sau đây", "trang tính", "ý nào", "hình là"]);
const cap2 = (s) => { const w = String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x); };
const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !CHUNG.has(c) && !nhan.has(c))); };
// chủ đề theo thứ tự bài của sách (mục lục trong README của cuốn ở OnUp-Book); Bài 3 Tin học (thực hành), Bài 10 Công nghệ (dự án) không có chủ đề riêng
const CHU_DE = {
  [T.m]: ["Lược sử công cụ tính toán", "Thông tin trong môi trường số", "Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số", "Sử dụng bảng tính giải quyết bài toán thực tế",
    "Sắp xếp và lọc dữ liệu", "Trình bày dữ liệu bằng biểu đồ"],
  [C.m]: ["Tiêu chuẩn trình bày bản vẽ kĩ thuật", "Hình chiếu vuông góc", "Bản vẽ chi tiết", "Bản vẽ lắp", "Bản vẽ nhà", "Vật liệu cơ khí", "Truyền và biến đổi chuyển động",
    "Gia công cơ khí bằng tay", "Ngành nghề trong lĩnh vực cơ khí"]
};
const BANG_TINH = CHU_DE[T.m].slice(3), CHUONG_I = CHU_DE[C.m].slice(0, 5);
MON.forEach((s) => {
  const p = bank(s.pool), M = p.pool.matrix, cells = Object.values(M), K = s.kho, N = p.n, de = s.from.map((id) => bank(id).questions);
  assert.deepEqual(Object.keys(M), CHU_DE[s.m], s.pool + ": chủ đề của ma trận theo thứ tự bài");
  assert.ok(K.every((q) => [1, 2, 3].includes(q.lv)), s.pool + ": câu nào trong kho cũng cần lv");
  assert.ok(cells.every(Array.isArray), s.pool + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  const b = Math.round(0.4 * N), h = Math.round(0.32 * N);
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [b, h, N - b - h], s.pool + ": ma trận 40% Biết, 32% Hiểu, 28% Vận dụng");
  de.forEach((d, i) => {
    assert.deepEqual([...new Set(d.map((q) => q.topic))], Object.keys(M), `${s.pool}: Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} của ${s.pool} đúng ma trận ở chủ đề ${t}`));
    assert.ok(d.some((q) => q.type === "tf4") && d.some((q) => q.type === "num" || q.type === "fill"), `${s.pool}: Đề ${i + 1} có câu đúng/sai 4 ý và câu trả lời ngắn`);
    assert.ok(d.every((q) => ["mc", "tf4", "num", "fill", "match", "order"].includes(q.type)), `${s.pool}: Đề ${i + 1} chỉ có dạng câu của khung Công văn 7991 (không tự luận)`);
    if (s === T) assert.equal(d.filter((q) => BANG_TINH.includes(q.topic)).length, 13, "Tin học: mỗi đề 13 câu về bảng tính (Bài 5–7), như lời dặn");
    else assert.equal(d.filter((q) => CHUONG_I.includes(q.topic)).length, 15, "Công nghệ: mỗi đề 15 câu Chương I, như lời dặn");
    // đáp án đúng là lựa chọn dài nhất hay ngắn nhất: mỗi kiểu không quá một phần ba, cả hai không dưới một phần sáu số câu nhiều lựa chọn của đề
    const mcs = d.filter((q) => q.type === "mc"), hon = (q, f) => q.o.slice(1).every((o) => f([...q.o[0]].length, [...o].length));
    const dai = mcs.filter((q) => hon(q, (a, x) => a > x)).length, ngan = mcs.filter((q) => hon(q, (a, x) => a < x)).length;
    assert.ok(dai * 3 <= mcs.length && ngan * 3 <= mcs.length, `${s.from[i]}: đáp án đúng dài nhất ở ${dai}, ngắn nhất ở ${ngan} trên ${mcs.length} câu nhiều lựa chọn`);
    assert.ok((dai + ngan) * 6 >= mcs.length, `${s.from[i]}: đáp án đúng dài nhất hay ngắn nhất ở ${dai + ngan}/${mcs.length} câu nhiều lựa chọn, cần từ một phần sáu`);
  });
  const tf4 = K.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 4, s.pool + ": ít nhất 4 câu đúng/sai 4 ý");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
  assert.ok(Math.max(...Object.values(kieu)) <= Math.ceil(tf4.length / 3), s.pool + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp nhiều quá: " + JSON.stringify(kieu));
  const mc = K.filter((q) => q.type === "mc");
  mc.forEach((q) => { const m = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60)); });
  mc.forEach((q) => { const dau = (o) => o.split(" ")[0].toLowerCase(), d = q.o.slice(1).map(dau); assert.ok(!(d.every((x) => x === d[0]) && dau(q.o[0]) !== d[0]), "ba lựa chọn sai cùng mở đầu “" + d[0] + "”: " + q.q.slice(0, 50)); });
  K.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => { if (d.toLowerCase().includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => o.toLowerCase().includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); });
  // không gần trùng câu của các kho cùng môn đã có (Rút ra N25): đề bài cùng các lựa chọn, ô nối có từ một nửa số cặp hai âm tiết liền nhau (tính trên câu
  // ít cặp hơn, bỏ các cặp có ở mọi câu và cặp của nhãn chủ đề) chung với một câu cũ thì báo
  {
    const cua = new Set(s.from.concat(s.pool));
    const cu = BANKS.filter((b2) => !cua.has(b2.id) && b2.subject === p.subject).flatMap((b2) => b2.questions.filter((q) => !b2.pool || q.src === b2.id).map((q, i) => ({ at: b2.id + "#" + (i + 1), f: b2.file, c: capAm(q) })));
    s.cu.forEach((f) => assert.ok(cu.some((e) => e.f === f), s.pool + ": có kho " + f + " để so"));
    K.forEach((q) => { const c = capAm(q); cu.forEach((e) => {
      const chung = [...c].filter((x) => e.c.has(x)).length;
      assert.ok(chung / Math.min(c.size, e.c.size) < 0.5, `gần trùng câu của kho cũ ${e.at}: ${q.src} “${q.q.slice(0, 50)}”`);
    }); });
  }
  const seen = new Set();
  for (let k = 0; k < 12 * K.length; k++) {
    const d = Quiz.draw(p);
    assert.equal(d.notes.length, 0, s.pool + ": rút thử có ghi chú: " + d.notes.join("; "));
    assert.equal(d.questions.length, N);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `${s.pool}: rút đúng ma trận ở chủ đề ${t}`));
    d.questions.forEach((q) => seen.add(Quiz.key(q)));
  }
  assert.equal(seen.size, K.length, s.pool + ": rút thử nhiều lần phải gặp đủ câu của kho");
  s.from.forEach((lam) => {
    const hist = (q) => (q.src === lam ? { done: 1, wrong: 0 } : null);
    for (let k = 0; k < 30; k++) {
      const d = Quiz.draw(p, hist);
      assert.equal(d.notes.length, 0); assert.equal(d.questions.length, N);
      assert.ok(d.questions.every((q) => q.src !== lam), `${s.pool}: đã làm hết ${lam} thì không rút lại câu của đề đó`);
    }
  });
});

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
MON.forEach((s) => {
  const deBai = BANKS.filter((b) => b.file === s.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
});

/* ---------- dò lộ đáp án (Rút ra N5; bộ dò của tests/tin-congnghe7-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung cả chủ đề, đề
   ngẫu nhiên rút chung hai đề. Đáp án là số (từ hai chữ số, hoặc số thập phân) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”,
   “được”); cặp nối: câu kia có cả hai vế; câu sắp xếp: câu kia có hai bước liền nhau; chữ trong hình của câu kia cũng tính. Đáp án bằng chữ (lựa chọn
   đúng của câu trắc nghiệm, đáp án câu điền) có ở câu kia thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const chuDo = (q) => chu(q).concat(q.svg ? [chuHinh(q.svg)] : []);
const doLo = (qs, tenCau, cungLuc) => {
  const lo = [], chuLo = [];
  qs.forEach((q, i) => {
    const so = (q.type === "num" && (q.ans >= 10 || !Number.isInteger(q.ans))) || (q.type === "fill" && /^\d{2,}$/.test(q.ans[0])) ? [val(q.type === "num" ? q.ans : q.ans[0])] : [];
    const cum = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const lien = q.type === "order" ? q.o.slice(1).map((o, k) => [q.o[k], o]) : [];
    qs.forEach((p, j) => {
      if (j === i || !cungLuc(p, q)) return;
      const Cp = chuDo(p), Tp = Cp.map((s) => s.toLowerCase()), at = `${tenCau(p)} → ${tenCau(q)}: `;
      so.filter((x) => Cp.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => Tp.some((t) => coCum(t, l.toLowerCase())) && Tp.some((t) => coCum(t, r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      lien.filter(([a, b]) => Tp.some((t) => coCum(t, a.toLowerCase())) && Tp.some((t) => coCum(t, b.toLowerCase()))).forEach(([a, b]) => lo.push(at + a + " | " + b));
      cum.filter((s) => Tp.some((t) => coCum(t, s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const ten = new Map();
MON.forEach((s) => s.from.forEach((id) => s.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace(/8-ck1-/, "-") + "#" + (i + 1)))));
const loAll = [], chuAll = [];
MON.forEach((s) => { const r = doLo(s.kho, (q) => ten.get(q), () => true); loAll.push(...r.lo); chuAll.push(...r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuAll.join("\n"));
// đã xem (Phiên N8-ck1-tin-congnghe): chữ chung, câu kia không cho biết điều câu này hỏi
const DA_XEM = [];
assert.deepEqual(chuAll.filter((s) => !DA_XEM.includes(s)), [], "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 1 845”, cả hai vế một cặp nối, hai ô sắp xếp liền nhau, lựa chọn đúng, chữ trong hình
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thu = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 12), () => true); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*?: /, "")); };
  const khac = tim("Câu nào dưới đây nói đúng về thông tin số");
  assert.deepEqual(thu([tim("tiền vé tham quan"), gia(khac, "Ví dụ: tiền vé là 1 845 nghìn đồng.")]), ["1845"]);
  assert.deepEqual(thu([tim("Nối mỗi loại nét vẽ"), gia(khac, "Nét liền đậm dùng cho Đường bao, cạnh nhìn thấy được.")]), ["Nét liền đậm → Đường bao, cạnh nhìn thấy được"]);
  assert.deepEqual(thu([tim("Sắp xếp các linh kiện điện tử chính"), gia(khac, "Sau Đèn điện tử chân không là Bóng bán dẫn.")]), ["Đèn điện tử chân không | Bóng bán dẫn"]);
  assert.deepEqual(thu([tim("Biểu đồ đoạn thẳng thường được dùng khi nào"), gia(khac, "Dùng khi cần thấy số liệu tăng hay giảm theo thời gian.")]), ["Khi cần thấy số liệu tăng hay giảm theo thời gian"]);
  assert.deepEqual(thu([tim("Đọc bản vẽ chi tiết ở hình"), Object.assign({}, khac, { svg: '<svg viewBox="0 0 400 20"><text x="5" y="15" font-size="13">Tấm đệm bằng thép, dài 80 mm, rộng 50 mm, dày 10 mm, có lỗ Ø20</text></svg>' })]),
    ["Tấm đệm bằng thép, dài 80 mm, rộng 50 mm, dày 10 mm, có lỗ Ø20"]);
}

/* ---------- bộ đọc hình, bộ tính công thức tự thử với hình, công thức cố ý viết sai ---------- */
{
  const tim = (has) => kho.find((q) => q.q.includes(has));
  const trang = tim("tiền vé tham quan").svg, cot = tim("đi học đúng giờ của hai lớp").svg, duong = tim("số lượt mượn sách").svg, tron = tim("theo cách đến trường").svg;
  const ba = tim("ba hình chiếu vuông góc của một khối chữ T").svg, rang = tim("Hình là một cặp bánh răng ăn khớp").svg, xich = tim("bộ truyền xích của một máy tuốt lúa").svg;
  const mb = tim("Diện tích phòng ngủ là bao nhiêu").svg, cua = tim("Trên mặt bằng của một ngôi nhà có kí hiệu").svg, ct = tim("Các phần được đánh số (1), (2), (3)").svg, truc = tim("bản vẽ chi tiết một trục bậc").svg;
  assert.throws(() => docTrang(trang.replace(/font-weight="700">Lớp</, ">Lớp<")), /tiêu đề/, "bộ đọc trang tính bắt hàng tiêu đề không đậm hết");
  assert.throws(() => docTrang(trang.replace(/text-anchor="end" font-size="13">38</, 'font-size="13">38<')), /căn/, "bộ đọc trang tính bắt ô số không căn phải");
  assert.throws(() => docCot(cot.replace(/height="([\d.]+)" fill="acc"/, (m, h) => `height="${+h - 5}" fill="acc"`)), /cột|chân/, "bộ đọc biểu đồ cột bắt cột không đứng trên trục");
  assert.throws(() => docCot(cot.replace(/<line [^>]*stroke="line"[^>]*\/>/, "")), /lưới/, "bộ đọc biểu đồ cột bắt thiếu đường lưới");
  assert.throws(() => docDuong(duong.replace(/<circle [^>]*\/>/, "")), /chấm/, "bộ đọc biểu đồ đoạn thẳng bắt thiếu chấm ở một điểm");
  assert.throws(() => docTron(tron.replace(/Xe đạp: 45%/, "Xe đạp: 40%")), /góc|100/, "bộ đọc biểu đồ hình quạt tròn bắt phần trăm không khớp góc");
  { // dời đường bao của hình chiếu cạnh (đa giác ở xa bên phải nhất) xuống 4: không còn cùng hàng với hình chiếu đứng
    const x0 = (p) => Math.min(...p.split(" ").map((x) => +x.split(",")[0])), p = [...ba.matchAll(/<polygon points="([^"]*)"/g)].map((m) => m[1]).sort((a, b) => x0(b) - x0(a))[0];
    const lech = ba.replace(`points="${p}"`, `points="${p.split(" ").map((x) => { const [u, v] = x.split(",").map(Number); return u + "," + (v + 4); }).join(" ")}"`);
    assert.throws(() => docBaHinh(lech), /hình chiếu cạnh/, "bộ đọc ba hình chiếu bắt hình chiếu cạnh lệch hàng");
  }
  assert.throws(() => docTruyen(rang.replace(/>18 răng</, ">20 răng<")), /số răng/, "bộ đọc bánh răng bắt số răng ghi sai");
  assert.throws(() => docTruyen(xich.replace(/<line [^>]*stroke="muted"[^>]*\/>/, "")), /hai đoạn xích|ăn khớp/, "bộ đọc bộ truyền xích bắt thiếu một đoạn xích");
  assert.throws(() => docMatBang(mb.replace(/>3 300</, ">3 200<")), /tỉ lệ/, "bộ đọc mặt bằng bắt kích thước ghi sai tỉ lệ");
  assert.throws(() => docCua(cua.replace(/A 60 60/, "A 50 50")), /cung/, "bộ đọc kí hiệu cửa bắt cung sai bán kính");
  assert.throws(() => docChuThich(ct.replace(/x2="128" y2="18"/, 'x2="100" y2="50"')), /chỉ đúng một phần/, "bộ đọc chú thích bắt đường dẫn không chỉ vào phần nào");
  assert.throws(() => docKichThuoc(truc, { oDai: true }) && docKichThuoc(truc.replace(/>40</, ">45<"), { oDai: true }), /tỉ lệ/, "bộ đọc kích thước bắt giá trị sai tỉ lệ vẽ");
  assert.throws(() => tinh("=SUM(B2:B4", { B2: 1 }), /thiếu/, "bộ tính bắt thiếu ngoặc");
  assert.throws(() => tinh("B2*$B$1", {}), /dấu =/, "bộ tính bắt công thức không có dấu =");
  assert.equal(tinh("=B2*$B$1", { B2: 3, B1: 5 }), 15, "địa chỉ tuyệt đối đọc như ô thường");
  assert.equal(chep("=B2*$B$1", 3, 0), "=B5*$B$1", "sao chép: địa chỉ tuyệt đối giữ nguyên");
  assert.equal(chep("=$B2+C$1", 2, 1), "=$B4+D$1", "sao chép: phần có $ giữ nguyên, phần còn lại dời");
  daDoc.clear();
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book; và với câu của các kho khác ---------- */
// tên riêng nhiều chữ như sách: mỗi tên tính là một từ
const GOP = ["blaise pascal", "charles babbage", "john von neumann", "von neumann", "claude shannon", "howard aiken", "harvard mark i", "gottfried leibniz",
  "my data has headers", "add level", "delete level", "select all", "number filters", "text filters", "sort a to z", "sort filter", "chart elements", "data labels",
  "format painter", "merge center", "insert column or bar chart", "page layout", "microsoft excel", "viet nam", "ha noi"].sort((a, b) => b.length - a.length);
// cụm chung của môn (tên bài như sách, cách hỏi chung): không tính khi so chuỗi
const TU_CHUNG = ["Mỗi ý sau đúng hay sai", "Lược sử công cụ tính toán", "Thông tin trong môi trường số", "Thực hành: Khai thác thông tin số",
  "Đạo đức và văn hoá trong sử dụng công nghệ kĩ thuật số", "Sử dụng bảng tính giải quyết bài toán thực tế", "Sắp xếp và lọc dữ liệu", "Trình bày dữ liệu bằng biểu đồ",
  "Chương I Vẽ kĩ thuật", "Chương II Cơ khí", "Một số tiêu chuẩn trình bày bản vẽ kĩ thuật", "Hình chiếu vuông góc", "Bản vẽ chi tiết", "Bản vẽ lắp", "Bản vẽ nhà",
  "Vật liệu cơ khí", "Truyền và biến đổi chuyển động", "Gia công cơ khí bằng tay", "Ngành nghề trong lĩnh vực cơ khí", "phương pháp chiếu góc thứ nhất",
  "Thợ cơ khí và sửa chữa máy móc", "Kĩ thuật viên kĩ thuật cơ khí", "cơ cấu tay quay con trượt", "cơ cấu tay quay thanh lắc", "Nét gạch dài - chấm - mảnh",
  "Mạch tích hợp cỡ rất lớn", "Mạch tích hợp cỡ siêu lớn", "Đèn điện tử chân không"].sort((a, b) => b.length - a.length);
// cụm 3 từ chung của hai môn (cho bộ dò lộ của tests/soat-nhap.js)
const CUM_CHUNG = ["hàng tiêu đề", "vùng dữ liệu", "trang tính ở", "ở trang tính", "trang tính trong", "sao chép công", "chép công thức", "địa chỉ tương", "chỉ tương đối",
  "địa chỉ tuyệt", "chỉ tuyệt đối", "hình chiếu đứng", "hình chiếu bằng", "hình chiếu cạnh", "bánh bị dẫn", "đĩa bị dẫn", "tốc độ quay", "bản vẽ chi", "vẽ chi tiết",
  "truyền động đai", "truyền động bánh", "động bánh răng", "truyền động xích", "cơ cấu tay", "cấu tay quay", "công nghệ kĩ", "nghệ kĩ thuật", "kĩ thuật số", "của chi tiết",
  "kích thước ghi", "ghi kích thước", "nét liền mảnh", "nét liền đậm", "thế hệ thứ", "máy tính điện", "tính điện tử", "khi sao chép"];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
const khongDau = nhoChuoi((s) => {
  let t = String(s).normalize("NFC").toLowerCase(); // cụm chung bỏ không phân biệt hoa thường, như tests/soat-nhap.js
  TU_CHUNG.forEach((c) => { t = t.split(c.toLowerCase()).join(" | "); });
  t = " " + t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9|]+/g, " ").trim() + " ";
  GOP.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); });
  return t.replace(/[aeiouy]+/g, "a").trim();
});
const tuCua = (s) => khongDau(s).split(" ").filter(Boolean);
const chuoi = (s, k) => { const ra = []; khongDau(s).split("|").forEach((p) => { const w = p.split(" ").filter(Boolean); for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); }); return ra; };
const truong = (q) => [q.q, q.x].concat(q.o || [], q.ans != null ? [].concat(q.ans).map(String) : [], q.l || [], q.r || [], q.svg ? [chuHinh(q.svg)] : []);
const soVoi = (ds, k) => {
  const cua = new Map();
  kho.forEach((q) => truong(q).forEach((s) => chuoi(s, k).forEach((c) => { if (!cua.has(c)) cua.set(c, new Set()); cua.get(c).add(ten.get(q)); })));
  const bao = new Map();
  ds.forEach(([id, s]) => { const w = tuCua(s); for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k).join(" "); if (cua.has(c)) { if (!bao.has(c)) bao.set(c, new Set()); bao.get(c).add(id); } } });
  return [...bao].flatMap(([c, ids]) => [...cua.get(c)].map((q) => `${q} ~ ${[...ids].join(", ")}: ${c}`));
};
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
if (SACH.length) {
  assert.ok(["tin-hoc-8", "cong-nghe-8"].every((c) => SACH.some((f) => f.includes(path.join("lop-8", c)))), "OnUp-Book có Tin học 8, Công nghệ 8");
  const ds = SACH.map((f) => [path.basename(path.dirname(f)), fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")]);
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + soVoi(ds, 6).join("\n"));
  assert.deepEqual(soVoi(ds, 8), [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
{
  const cua = new Set(MON.flatMap((s) => s.from.concat(s.pool)));
  const ds = BANKS.filter((b) => !cua.has(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => [b.id, [q.q, q.x].concat(q.o || [], q.ans != null ? [].concat(q.ans).map(String) : [], q.l || [], q.r || []).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).join(" | ")]));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + soVoi(ds, 5).join("\n"));
  assert.deepEqual(soVoi(ds, 8), [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n + " câu đã tính lại hoặc đọc lại hình (hai ngân hàng), " + nCt + " công thức trong câu Tin học đã đọc lại; kho " + kho.length + " câu, " + MON.map((s) => s.from.length + " đề cố định " + bank(s.pool).n + " câu").join(" và ") + ".");
console.log("MATH OK");
