// Kiểm tra hai ngân hàng lớp 7 cuối kì I của Phiên N7-ck1-tin-congnghe: Tin học (data/banks/7-tin.js, Bài 1–8) và Công nghệ
// (data/banks/7-congnghe.js, Chương I Trồng trọt Bài 1–6, Chương II Lâm nghiệp Bài 7–8), theo mẫu tests/tin-congnghe9-gk2.js (bộ đọc trang
// tính, bộ tính công thức), tests/tin-congnghe9-ck1.js và tests/lsdl-gdcd7-ck1.js. Mỗi ngân hàng = hai đề cố định trong from của đề ngẫu
// nhiên (cùng chia đúng ma trận) + đề ngẫu nhiên không có câu riêng; mã đề, số câu, số đề lấy từ danh mục (không ghi cứng).
// Câu có phép tính, có công thức, có hình, câu sắp xếp, câu nối được nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong hai kho, đúng
// đề ghi ở id); đáp án tính bằng code (so với ans, o[0], a của câu đúng/sai 4 ý, o của câu sắp xếp, r theo l của câu nối). Tin học: đọc lại
// trang tính trong hình (hàng tên cột A, B…, cột số hàng, ô chữ căn trái, ô số căn phải, chữ vừa ô; ô trống, ô chữ trong cột số) và tính lại
// công thức ghi trong đề bằng một bộ tính nhỏ (SUM, AVERAGE, MAX, MIN, COUNT; + − * / ^, ngoặc tròn; địa chỉ ô, vùng), sao chép công thức
// (địa chỉ đổi theo vị trí tương đối), số ô của một vùng, vùng dữ liệu của bảng trong hình, ô theo địa chỉ; đọc lại cây thư mục (mỗi bậc lùi
// vào 24, thư mục, tệp có phần mở rộng, đường nối từ ô cha) rồi xét việc di chuyển thư mục; phần mở rộng là phần sau dấu chấm cuối cùng; thứ
// tự lắp máy và vai trò thiết bị, kiểu mạng xã hội theo bảng ghi trong script. Công nghệ: đọc lại sơ đồ các bước (ô từ trên xuống, mũi tên giữa
// hai ô liền nhau, ô “?”) và so với các bước theo sách ghi trong script (làm đất, giâm cành, trồng rừng bằng cây con có bầu); độ sâu vùi hạt 2–3
// lần đường kính; số cành giâm, số cây trồng rừng theo diện tích, tỉ lệ cây sống; thời vụ, cách thu hoạch, nhóm cây trồng theo bảng.
// Câu trả lời bằng số, câu có hình, câu sắp xếp, câu nối nào cũng phải có kiểm tra ở đây.
// Rồi: chữ (dấu thanh kiểu sách: “hoá”, “khoẻ”, “luỹ”, “kĩ”, “lí”; số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân, trừ câu về dấu
// thập phân của phần mềm bảng tính; số trong công thức nhỏ hơn 1 000; không đơn vị hành chính cũ; không dùng tên nhân vật của sách Tin học 6,
// 7, Công nghệ 6), lời dặn của đề (các bài theo mục lục, nhắc phần trường có thể dạy khác, không có câu về đề chung của Sở), dạng câu (mỗi kho
// ít nhất 4 câu đúng/sai 4 ý, kiểu Đ/S không lặp quá một phần ba; mỗi đề cố định có câu đúng/sai 4 ý và câu trả lời ngắn; câu nối có một ô
// thừa, cặp nối không có chữ chung), mức độ và ma trận (chủ đề theo thứ tự bài, 10 – 8 – 7, hai đề chia đúng), đáp án đúng không dài hơn hẳn
// lựa chọn sai, là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không là lựa chọn duy nhất có chữ của nhãn
// chủ đề, ba lựa chọn sai không cùng mở đầu một chữ mà đáp án đúng không có; rút thử nhiều lần (đúng ma trận, không ghi chú, gặp đủ câu; đã làm
// hết một đề cố định thì rút toàn câu của đề kia); đề bài không trùng câu nào trong file, không gần trùng câu của các kho cùng môn (cả 6-tin.js,
// 6-congnghe.js); dò lộ đáp án giữa mọi cặp câu của kho (đề ngẫu nhiên rút chung hai đề, đề “Ôn chủ đề” rút chung cả chủ đề; số ở vị trí kết
// quả, cả hai vế một cặp nối, hai ô sắp xếp liền nhau, chữ trong hình; đáp án bằng chữ in ra với DO_LO=1 để xem tay, đã xem ghi ở DA_XEM). Có
// sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ, cả chữ trong hình, với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không
// chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ). Bộ đọc hình,
// bộ tính công thức và bộ dò lộ tự thử với hình, công thức, câu cố ý viết sai.
// Chạy: node tests/tin-congnghe7-ck1.js → in MATH OK.
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
const T = { m: "tin", ten: "Tin học", pool: "tin7-ck1-ngau-nhien", file: "7-tin.js", lop6: "6-tin.js" };
const C = { m: "congnghe", ten: "Công nghệ", pool: "congnghe7-ck1-ngau-nhien", file: "7-congnghe.js", lop6: "6-congnghe.js" };
const MON = [T, C];
MON.forEach((s) => {
  const p = bank(s.pool); assert.ok(p && p.pool, "thiếu đề ngẫu nhiên " + s.pool);
  s.from = p.pool.from; s.de1 = s.from[0]; s.de2 = s.from[1];
  assert.ok(s.from.length === 2 && s.from.every((id) => bank(id) && bank(id).file === s.file) && p.file === s.file, s.pool + ": from là hai đề cố định cùng file " + s.file);
  assert.deepEqual(BANKS.filter((b) => b.id.startsWith(s.m + "7-ck1-")).map((b) => b.id).sort(), [s.de1, s.de2, s.pool].sort(), s.m + ": kho gồm hai đề cố định và đề ngẫu nhiên");
  [s.de1, s.de2, s.pool].forEach((id) => { const b = bank(id); assert.ok(b.grade === 7 && b.subject === s.ten && b.minutes === 35, id + ": khối 7, môn " + s.ten + ", 35 phút"); });
  s.from.forEach((id) => assert.equal(bank(id).questions.length, bank(id).n, id + ": số câu bằng n của danh mục"));
  assert.equal(p.questions.length, bank(s.de1).n + bank(s.de2).n, s.pool + ": kho là câu của hai đề cố định, không có câu riêng");
  assert.ok(p.questions.every((q) => s.from.includes(q.src)), s.pool + ": câu nào cũng thuộc một đề cố định");
  assert.ok(p.n === bank(s.de1).n && p.n === bank(s.de2).n, s.pool + ": mỗi lần rút bằng số câu một đề cố định");
  s.kho = p.questions;
});
const kho = MON.flatMap((s) => s.kho);
const monCua = (q) => MON.find((s) => s.kho.includes(q));
{ // kì thi cuối học kì I lớp 7 gắn đủ sáu mã; phạm vi ghi Tin học, Công nghệ
  const ctxL = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctxL);
  const ev = ctxL.window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck1-l7");
  MON.forEach((s) => [s.de1, s.de2, s.pool].forEach((id) => assert.ok(ev.banks.includes(id), "ck1-l7 chưa gắn " + id)));
  assert.ok(/Tin học: Bài 1–8\./.test(ev.scope) && /Công nghệ: Bài 1–8\./.test(ev.scope), "phạm vi của ck1-l7 ghi Tin học: Bài 1–8, Công nghệ: Bài 1–8");
}

/* ---------- số ---------- */
const close = (x, y, e = 1e-9) => Math.abs(x - y) < e;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(/−/g, "-").replace(",", "."); // "1 860" → 1860, "0,8" → 0.8
// t có cụm s đứng thành từ riêng (“Na” không khớp “Nam”)
const coCum = (t, s) => { for (let i = t.indexOf(s); i >= 0; i = t.indexOf(s, i + 1)) if (!/[\p{L}\p{N}]/u.test(t[i - 1] || " ") && !/[\p{L}\p{N}]/u.test(t[i + s.length] || " ")) return true; return false; };

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const daDoc = new Set(); // hình đã đọc lại bằng code
const coChu = (t) => assert.ok(+t["font-size"] >= 13, "chữ trong hình từ 13 trở lên: " + t.t);
const rong = (t) => (t["font-weight"] === "700" ? 0.62 : 0.55) * +t["font-size"] * [...t.t].length; // ước bề rộng dòng chữ (Noto Sans)
const khung = (svg) => { const v = attrs(svg.slice(0, svg.indexOf(">") + 1)).viewBox.split(" ").map(Number); return { w: v[2], h: v[3] }; };
const chuHinh = (svg) => (svg ? texts(svg).map((t) => t.t).join(" ") : ""); // chữ trong hình (dò lộ, so sách)

/* Trang tính (như tests/tin-congnghe9-gk2.js): đường kẻ mảnh tô line, nằm ngang hoặc dọc, kẻ hết bảng; hàng đầu (tên cột A, B…) và cột đầu
   (số hàng 1, 2…) tô nền bg, chữ màu muted ở giữa ô; mỗi ô dữ liệu nhiều nhất một chữ: chữ căn trái cách lề 5, số căn phải cách lề 5 (text-
   anchor end), chữ vừa ô; hàng 1 là tiêu đề chữ đậm. Trả về { o: { "A1": "Họ tên", "B2": 9, … }, hang, cot } (ô số đọc thành số). */
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
    if (so) { assert.ok(/^\d{1,3}$/.test(t.t), "ô số là số nguyên nhỏ hơn 1 000 (phần mềm bảng tính dùng dấu chấm thập phân): " + t.t); o[ten] = +t.t; } else o[ten] = t.t;
  });
  return { o, hang: ys.length - 2, cot: xs.length - 2 };
};

/* Cây thư mục: mỗi dòng một ô (rect cao 24, bo góc), tâm dòng thứ i ở y = 18 + 30i; bậc d thì ô bắt đầu ở x = 8 + 24d; thư mục tô sun-soft viền
   sun, tên không có dấu chấm; tệp tô surface viền line, tên có phần mở rộng; chữ cỡ 13 nằm trọn trong ô. Ô bậc d (d ≥ 1) có đúng một đường đi
   xuống từ cạnh dưới ô cha (ô gần nhất phía trên có bậc d − 1) ở x = x_cha + 12 và một đường rẽ ngang vào cạnh trái ô; không có đường nào khác.
   Trả về [{ ten, tep, bac, cha }] theo thứ tự từ trên xuống (cha: tên ô cha, gốc thì null). */
const docCay = (svg) => {
  daDoc.add(svg);
  const K = khung(svg), R = tags(svg, "rect"), TX = texts(svg), L = tags(svg, "line");
  assert.ok(K.w <= 320, "cây thư mục rộng không quá 320");
  assert.equal(R.length, TX.length, "cây thư mục: mỗi ô một tên");
  const nut = R.map((r) => {
    const x = num(r, "x"), y = num(r, "y"), w = num(r, "width");
    assert.equal(num(r, "height"), 24, "ô cao 24");
    const t = TX.filter((t) => +t.x > x && +t.x < x + w && +t.y > y && +t.y < y + 24);
    assert.equal(t.length, 1, "mỗi ô một chữ"); coChu(t[0]);
    assert.ok(close(+t[0].x, x + 8) && +t[0].x + rong(t[0]) <= x + w - 4, "tên nằm trọn trong ô: " + t[0].t);
    const tep = /\.[a-z0-9]+$/i.test(t[0].t);
    assert.ok(tep ? r.fill === "surface" && r.stroke === "line" : r.fill === "sun-soft" && r.stroke === "sun" && !t[0].t.includes("."), "thư mục tô sun-soft, tệp tô surface: " + t[0].t);
    assert.ok(x + w <= K.w && y + 24 <= K.h, "ô nằm trong khung: " + t[0].t);
    const bac = (x - 8) / 24; assert.ok(Number.isInteger(bac) && bac >= 0, "ô lùi vào đúng bậc: " + t[0].t);
    return { ten: t[0].t, tep, bac, x, cy: y + 12 };
  }).sort((a, b) => a.cy - b.cy);
  nut.forEach((n, i) => assert.equal(n.cy, 18 + 30 * i, "các dòng cách đều 30"));
  assert.equal(nut[0].bac, 0, "dòng đầu là thư mục gốc");
  let duong = 0;
  nut.forEach((n, i) => {
    if (!n.bac) { n.cha = null; return; }
    let p = i - 1; while (p >= 0 && nut[p].bac !== n.bac - 1) p--;
    assert.ok(p >= 0 && nut.slice(p + 1, i).every((m) => m.bac >= n.bac) && !nut[p].tep, "ô cha là thư mục ở bậc trên: " + n.ten);
    const px = nut[p].x + 12, co = (a, b, c, d) => L.some((l) => l.stroke === "muted" && num(l, "x1") === a && num(l, "y1") === b && num(l, "x2") === c && num(l, "y2") === d);
    assert.ok(co(px, nut[p].cy + 12, px, n.cy) && co(px, n.cy, n.x, n.cy), "đường nối từ " + nut[p].ten + " tới " + n.ten);
    n.cha = nut[p].ten; duong += 2;
  });
  assert.equal(L.length, duong, "cây thư mục: không có đường nối thừa");
  return nut.map(({ ten, tep, bac, cha }) => ({ ten, tep, bac, cha }));
};

/* Sơ đồ các bước, từ trên xuống: mỗi bước một ô (rect x = 10, cao 34, rộng bằng khung trừ 20), ô cách nhau 50; chữ cỡ từ 13 ở giữa ô, vừa ô;
   ô có chữ “?” tô sun-soft viền sun, ô khác tô acc-soft viền acc; giữa hai ô liền nhau có một đoạn thẳng đứng (tô ink) từ cạnh dưới ô trên và
   một tam giác chĩa xuống, đỉnh chạm cạnh trên ô dưới. Trả về danh sách chữ của các ô theo thứ tự. */
const docBuoc = (svg) => {
  daDoc.add(svg);
  const K = khung(svg), R = tags(svg, "rect").sort((a, b) => num(a, "y") - num(b, "y")), TX = texts(svg), L = tags(svg, "line"), P = tags(svg, "polygon");
  assert.ok(K.w <= 320 && R.length >= 3, "sơ đồ các bước: ít nhất 3 ô, rộng không quá 320");
  const cx = K.w / 2;
  const chu = R.map((r, i) => {
    const y = num(r, "y");
    assert.ok(num(r, "x") === 10 && num(r, "width") === K.w - 20 && num(r, "height") === 34 && y === 10 + 50 * i, "ô thứ " + (i + 1) + " đặt đúng chỗ");
    const t = TX.filter((t) => +t.y > y && +t.y < y + 34);
    assert.equal(t.length, 1, "mỗi ô một dòng chữ"); coChu(t[0]);
    assert.ok(t[0]["text-anchor"] === "middle" && close(+t[0].x, cx) && rong(t[0]) <= K.w - 36, "chữ ở giữa ô, vừa ô: " + t[0].t);
    const hoi = t[0].t === "?";
    assert.ok(hoi ? r.fill === "sun-soft" && r.stroke === "sun" : r.fill === "acc-soft" && r.stroke === "acc", "ô “?” tô sun-soft, ô khác tô acc-soft: " + t[0].t);
    if (i) {
      const tren = y - 50 + 34;
      assert.ok(L.some((l) => num(l, "x1") === cx && num(l, "x2") === cx && num(l, "y1") === tren && num(l, "y2") > tren && num(l, "y2") < y && l.stroke === "ink"), "mũi tên từ ô " + i + " xuống ô " + (i + 1));
      assert.ok(P.some((p) => { const d = p.points.trim().split(/\s+/).map((s) => s.split(",").map(Number)); return d.length === 3 && d.some(([a, b]) => a === cx && b === y) && d.filter(([, b]) => b < y).length === 2 && p.fill === "ink"; }), "đầu mũi tên chạm ô " + (i + 1));
    }
    return t[0].t;
  });
  assert.equal(chu.filter((t) => t === "?").length, 1, "sơ đồ có đúng một ô “?”");
  assert.ok(L.length === R.length - 1 && P.length === R.length - 1 && TX.length === R.length, "sơ đồ các bước: không có nét, chữ thừa");
  return chu;
};

/* ---------- bộ tính công thức bảng tính ----------
   Công thức như sách: bắt đầu bằng dấu =, phép + - * / ^, ngoặc tròn, địa chỉ ô (B2), vùng (B2:B6); hàm SUM, AVERAGE, MAX, MIN, COUNT (chỉ xét
   ô chứa số, bỏ qua ô trống, ô chữ). o: giá trị các ô. Công thức viết sai (không có dấu = ở đầu, dấu : làm phép chia…) thì báo lỗi. */
const soCot = (s) => [...s].reduce((a, ch) => a * 26 + ch.charCodeAt(0) - 64, 0), tenCot = (n) => (n > 26 ? tenCot(Math.floor((n - 1) / 26)) : "") + String.fromCharCode(65 + ((n - 1) % 26));
const chep = (f, dh, dc) => f.replace(/([A-Z]+)(\d+)/g, (m, c, r) => tenCot(soCot(c) + dc) + (+r + dh)); // sao chép: địa chỉ dịch theo
const vung = (s) => { const [p, q] = s.split(":"), m = (x) => x.match(/^([A-Z]+)(\d+)$/), a = m(p), b = m(q || p), ra = [];
  for (let c = soCot(a[1]); c <= soCot(b[1]); c++) for (let r = +a[2]; r <= +b[2]; r++) ra.push(tenCot(c) + r); return ra; };
function tinh(f, o) {
  assert.ok(f.startsWith("="), "công thức bắt đầu bằng dấu =: " + f);
  const tk = [], re = /\s*(?:(\d+(?:\.\d+)?)|([A-Z]+\d+(?::[A-Z]+\d+)?)|([A-Z]+)\(|([-+*/^(),]))/y;
  let m, i = 1;
  for (re.lastIndex = 1; i < f.length; i = re.lastIndex) { m = re.exec(f); assert.ok(m, "không đọc được công thức: " + f); tk.push(m[1] ? { n: +m[1] } : m[2] ? { ref: m[2] } : m[3] ? { fn: m[3] } : { op: m[4] }); }
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
  const HAM = {
    SUM: (ts) => sum(soTrong(ts)),
    AVERAGE: (ts) => { const a = soTrong(ts); assert.ok(a.length, "AVERAGE không có số"); return sum(a) / a.length; },
    MAX: (ts) => Math.max(...soTrong(ts)),
    MIN: (ts) => Math.min(...soTrong(ts)),
    COUNT: (ts) => soTrong(ts).length
  };
  const v = cong();
  assert.equal(p, tk.length, "công thức còn thừa: " + f);
  return v;
}
// các công thức có trong một đoạn chữ: dấu = liền với chữ hoa, chữ số hay dấu ngoặc, đến khoảng trắng gần nhất (bỏ dấu câu ở cuối)
const congThuc = (s) => [...String(s).matchAll(/(?<![\p{L}\d])=[A-Z(\d][^\s]*/gu)].map((m) => {
  let f = m[0].replace(/[.,;]+$/, "");
  while (f.endsWith(")") && (f.match(/\)/g) || []).length > (f.match(/\(/g) || []).length) f = f.slice(0, -1).replace(/[.,;]+$/, ""); // “(=B3*C3)”
  return f;
});

/* ---------- bảng theo sách (OnUp-Book lop-7/tin-hoc-7, lop-7/cong-nghe-7; page-N là trang in N − 1) ---------- */
// Tin học 7, tr. 8: cấp nguồn điện cho máy tính sau khi các thiết bị đã được kết nối
const LAP_MAY = ["Cắm dây màn hình, bàn phím, chuột vào đúng cổng của thân máy", "Cắm dây nguồn của máy vào ổ điện", "Bật công tắc nguồn của máy tính", "Đăng nhập vào tài khoản của mình trên máy"];
// Tin học 7, tr. 5–6 (Hình 1.2: thiết bị vào, thiết bị lưu trữ, thiết bị ra)
const VAI_TRO = { "Máy quét mã vạch": "Thiết bị vào", "Máy in hoá đơn": "Thiết bị ra", "Ổ cứng gắn ngoài": "Thiết bị lưu trữ" };
// Tin học 7, tr. 11: loại tệp theo phần mở rộng
const LOAI_TEP = { ".pptx": "bài trình chiếu", ".ppt": "bài trình chiếu", ".docx": "văn bản", ".doc": "văn bản", ".htm": "trang web", ".html": "trang web", ".exe": "chương trình" };
// Tin học 7, tr. 19, Bảng 4.1: mạng xã hội theo mục đích sử dụng
const KIEU_MXH = { "Hỏi cách giải một bài toán khó, chờ mọi người góp ý": "Diễn đàn học tập, thảo luận", "Cất giữ, sắp xếp và khoe những tấm hình mình chụp": "Chia sẻ ảnh",
  "Xem, bình luận những đoạn phim ngắn tự quay": "Chia sẻ video" };
// Công nghệ 7, tr. 12: làm đất gồm cày, bừa (đập) rồi lên luống, sau đó mới gieo trồng
const LAM_DAT = ["Cày đất", "Bừa, đập cho đất nhỏ, mặt ruộng phẳng", "Lên luống", "Gieo hạt, trồng cây"];
// Công nghệ 7, tr. 22: năm bước giâm cành (chọn cành, cắt cành, xử lí cành bằng thuốc kích thích ra rễ, cắm cành, chăm sóc)
const GIAM = ["Chọn cành bánh tẻ, không sâu bệnh", "Cắt vát thành đoạn, tỉa bớt lá", "Chấm gốc cành vào thuốc kích thích ra rễ", "Cắm cành hơi chếch vào khay đất", "Chăm sóc đến khi cành ra rễ"];
// Công nghệ 7, tr. 34, Hình 8.1: sáu bước trồng rừng bằng cây con có bầu
const BAU = ["Đào lỗ sâu hơn chiều cao bầu", "Rạch, bỏ vỏ bầu", "Đặt bầu cây vào giữa lỗ trong hố", "Lấp đất, nén chặt (lần 1)", "Lấp thêm đất, nén chặt (lần 2)", "Vun đất quanh gốc cây"];
// Công nghệ 7, tr. 15: các vụ gieo trồng (tháng bắt đầu, tháng kết thúc)
const THOI_VU = { "hè thu": [4, 7], "đông xuân": [11, 4], "mùa": [7, 11], "đông": [10, 12] };
// Công nghệ 7, tr. 19: phương pháp thu hoạch (nhổ: su hào, sắn, lạc…; củ cải nằm nông như su hào)
const THU_HOACH = { "su hào": "Nhổ", "củ cải": "Nhổ", "lạc": "Nhổ" };
// Công nghệ 7, tr. 8: nhóm cây trồng theo mục đích sử dụng
const NHOM_CAY = { "Sả, ớt, gừng": "Cây gia vị", "Bưởi, nhãn, xoài": "Cây ăn quả", "Cúc, lay ơn, thược dược": "Cây hoa" };

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans, o[0], a, o hoặc r theo l). */
const lc = (q, f) => { const m = q.o.filter(f); assert.equal(m.length, 1, "đúng một lựa chọn khớp: " + q.q.slice(0, 50)); return m[0]; };
const soCua = (re, s) => { const m = re.exec(s); assert.ok(m, "không đọc được số liệu: " + re); return m.slice(1).map(val); };
const buoc = (q, BANG) => { // sơ đồ các bước: khớp bảng, trừ ô “?”; đáp án là bước ở ô đó, lựa chọn sai không là bước nào của bảng
  const d = docBuoc(q.svg), k = d.indexOf("?");
  assert.deepEqual(d.filter((t, i) => i !== k), BANG.filter((t, i) => i !== k), "các ô của sơ đồ đúng như các bước theo sách");
  q.o.slice(1).forEach((o) => assert.ok(!BANG.includes(o), "lựa chọn sai là một bước của quy trình: " + o));
  return BANG[k];
};
const CHECKS = [
  // Tin học: Đề 1
  { id: T.de1, has: "Hãy xếp các việc sau theo thứ tự an toàn", right: () => LAP_MAY },
  { id: T.de1, has: "GioiThieu.Lop7A.pptx", right: (q) => { const ten = q.q.match(/(\S+\.pptx)/)[1], mr = ten.slice(ten.lastIndexOf(".")); return `${mr}, tệp ${LOAI_TEP[mr]}`; } },
  { id: T.de1, has: "cây thư mục bài học của Phúc", right: (q) => {
    const cay = docCay(q.svg), tim = (t) => cay.find((n) => n.ten === t);
    const muc = tim("BaiTapBangTinh"), dich = tim("TinHoc"), goc = tim("Toan");
    assert.ok(muc && !muc.tep && muc.cha === "Toan" && dich && !dich.tep && goc && dich.bac === goc.bac, "cây: BaiTapBangTinh nằm trong Toan, TinHoc cùng bậc với Toan");
    assert.ok(cay.some((n) => n.cha === "Toan" && n !== muc), "thư mục Toan còn nội dung khác (đổi tên, xoá Toan là sai)");
    return `Chọn ${muc.ten}, dùng Cut; mở thư mục ${dich.ten} rồi dùng Paste`; } },
  { id: T.de1, has: "chỉ cho người dùng tạo tài khoản khi đã đủ", right: () => 13 }, // Tin học 7, tr. 19: phổ biến là từ 13 tuổi trở lên
  { id: T.de1, has: "ô nằm ở cột C và hàng 12", right: () => tenCot(3) + 12 },
  { id: T.de1, has: "số sách mỗi bạn đọc trong tháng", right: (q) => {
    const { o, hang, cot } = docTrang(q.svg);
    vung("A2:" + tenCot(cot) + hang).forEach((c) => assert.ok(c in o, "ô dữ liệu có chữ: " + c));
    return "A2:" + tenCot(cot) + hang; } },
  { id: T.de1, has: "=(B2+C2)*2", right: (q) => tinh("=(B2+C2)*2", docTrang(q.svg).o) },
  { id: T.de1, has: "Ô E2 có công thức =12*5", right: () => {
    const o = { C2: 12, D2: 5 }, e = tinh("=12*5", o), f0 = tinh("=C2*D2", o);
    assert.equal(e, f0, "trước khi sửa, E2 và F2 cùng kết quả");
    o.C2 = 15; return `E2 vẫn hiện ${tinh("=12*5", o)}, F2 hiện ${tinh("=C2*D2", o)}`; } },
  { id: T.de1, has: "ô E3 có công thức =C3*D3", right: () => chep("=C3*D3", 3, 0) },
  { id: T.de1, has: "mười hai phẩy năm", right: () => "12.5" }, // Tin học 7, tr. 42: phần mềm bảng tính thường dùng dấu chấm thập phân
  { id: T.de1, has: "=MAX(B2:B6). Ô B7", right: (q) => tinh("=MAX(B2:B6)", docTrang(q.svg).o) },
  { id: T.de1, has: "=COUNT(B2:B7)", right: (q) => {
    const o = docTrang(q.svg).o; assert.ok(!("B3" in o) && o.B5 === "vắng", "ô B3 trống, ô B5 ghi “vắng” như đề bài");
    return tinh("=COUNT(B2:B7)", o); } },
  { id: T.de1, has: "=AVERAGE(B2:B5)", right: (q) => tinh("=AVERAGE(B2:B5)", docTrang(q.svg).o) },
  // Tin học: Đề 2
  { id: T.de2, has: "Ở quầy thu ngân của một nhà sách", right: (q) => q.l.map((l) => { assert.ok(VAI_TRO[l], "bảng vai trò có " + l); return VAI_TRO[l]; }) },
  { id: T.de2, has: "Mỗi việc dưới đây hợp với một kiểu mạng xã hội", right: (q) => q.l.map((l) => { assert.ok(KIEU_MXH[l], "bảng kiểu mạng xã hội có " + l); return KIEU_MXH[l]; }) },
  { id: T.de2, has: "Ô A4 chứa dữ liệu nào", right: (q) => docTrang(q.svg).o.A4 },
  { id: T.de2, has: "chọn vùng từ ô B2 đến ô D7", right: () => vung("B2:D7").length },
  { id: T.de2, has: "Để ô E2 tính trung bình cộng ba điểm đó", right: (q) => lc(q, (f) => [[6, 7, 8], [9, 4, 10], [5, 5, 8]].every(([b, c, d]) => {
    try { return close(tinh(f, { B2: b, C2: c, D2: d }), (b + c + d) / 3); } catch (e) { return false; } })) },
  { id: T.de2, has: "Ô B5 có công thức =B2+B3+B4. Sao chép ô B5 sang ô D5", right: (q) => {
    const o = docTrang(q.svg).o; assert.equal(o.B5, tinh("=B2+B3+B4", o), "ô B5 hiện đúng kết quả của công thức");
    const f = chep("=B2+B3+B4", 0, 2); assert.equal(f, "=D2+D3+D4"); assert.ok(q.x.includes(f), "lời giải ghi công thức sau khi sao chép");
    return tinh(f, o); } },
  { id: T.de2, has: "số vỏ chai nhựa mỗi tổ thu gom được", right: (q) => { const o = docTrang(q.svg).o;
    return q.o.map((s) => { const m = s.match(/^(=\S+) cho kết quả (\d+)\.$/); assert.ok(m, "ý ghi công thức và kết quả: " + s); return close(tinh(m[1], o), +m[2]); }); } },
  { id: T.de2, has: "=MIN(B2:B6)", right: (q) => tinh("=MIN(B2:B6)", docTrang(q.svg).o) },
  { id: T.de2, has: "=SUM(B2:B6)-MAX(B2:B6)", right: (q) => tinh("=SUM(B2:B6)-MAX(B2:B6)", docTrang(q.svg).o) },
  // Công nghệ: Đề 1
  { id: C.de1, has: "Ô có dấu “?” là việc nào", right: (q) => buoc(q, LAM_DAT) },
  { id: C.de1, has: "vụ hè thu thường kéo dài", right: (q) => { const [a, b] = THOI_VU["hè thu"];
    q.o.slice(1).forEach((o) => { const [x, y] = o.match(/\d+/g).map(Number); assert.ok(Object.values(THOI_VU).some(([u, v]) => u === x && v === y), "lựa chọn sai là thời gian của một vụ khác: " + o); });
    return `Từ tháng ${a} đến tháng ${b}`; } },
  { id: C.de1, has: "Theo kĩ thuật gieo hạt to", right: (q) => { const [d] = soCua(/đường kính khoảng (\d+(?:,\d+)?) cm/, q.q);
    return lc(q, (o) => { const m = o.match(/^Khoảng (\d+(?:,\d+)?) cm$/); return !!m && val(m[1]) >= 2 * d - 1e-9 && val(m[1]) <= 3 * d + 1e-9; }); } },
  { id: C.de1, has: "thường được thu hoạch bằng phương pháp nào", right: (q) => { const cay = q.q.split(" thường")[0].split(", ").map((s) => s.toLowerCase());
    const pp = [...new Set(cay.map((c) => { assert.ok(THU_HOACH[c], "bảng thu hoạch có " + c); return THU_HOACH[c]; }))]; assert.equal(pp.length, 1); return pp[0]; } },
  { id: C.de1, has: "Bước đó là gì", right: (q) => buoc(q, GIAM) },
  { id: C.de1, has: "chia thành các ô vuông cạnh 10 cm", right: (q) => { const [d, r] = soCua(/dài (\d+(?:,\d+)?) m, rộng (\d+(?:,\d+)?) m/, q.q);
    return Math.floor((d * 100) / 10 + 1e-9) * Math.floor((r * 100) / 10 + 1e-9); } },
  { id: C.de1, has: "Đội cần bao nhiêu cây giống", right: (q) => { const [ha] = soCua(/rộng (\d+(?:,\d+)?) ha/, q.q), [a, b] = soCua(/chiếm (\d+(?:,\d+)?) m × (\d+(?:,\d+)?) m/, q.q);
    assert.ok(q.q.includes("1 ha = 10 000 m²")); return (ha * 10000) / (a * b); } },
  // Công nghệ: Đề 2
  { id: C.de2, has: "Bà của Uyên có một mảnh vườn", right: (q) => q.l.map((l) => { assert.ok(NHOM_CAY[l], "bảng nhóm cây có " + l); return NHOM_CAY[l]; }) },
  { id: C.de2, has: "Cần điền việc gì vào ô", right: (q) => buoc(q, BAU) },
  { id: C.de2, has: "Tỉ lệ cây sống là bao nhiêu phần trăm", right: (q) => { const [tr, song] = soCua(/trồng (\d{1,3}(?: \d{3})*) cây.*có (\d{1,3}(?: \d{3})*) cây sống/, q.q); return (song / tr) * 100; } }
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
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));
assert.ok(MON.every((s) => s.from.every((id) => s.kho.some((q) => q.src === id && q.svg))), "đề cố định nào cũng có câu có hình");
// câu nối: một ô thừa, cặp nối không có chữ chung (không đoán được bằng chữ giống nhau)
const tuDon = (s) => new Set(String(s).toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 1));
kho.filter((q) => q.type === "match").forEach((q) => {
  assert.equal(q.r.length, q.l.length + 1, "câu nối có một ô thừa: " + q.q.slice(0, 50));
  q.l.forEach((l, i) => { const b = tuDon(q.r[i]); assert.ok(![...tuDon(l)].some((w) => b.has(w)), `cặp nối “${l}” – “${q.r[i]}” có chữ chung`); });
});
// mọi công thức trong câu Tin học đọc được (trừ các công thức cố ý viết sai hay viết dở trong đề bài, lựa chọn), số trong công thức nhỏ hơn 1 000
const CONG_THUC_SAI = ["=(B2+C2+D2):3", "=SUM(", "=<tên"];
{
  let dem = 0;
  T.kho.forEach((q) => [q.q, q.x].concat(q.o || []).forEach((s) => congThuc(s).forEach((f) => {
    dem++;
    if (CONG_THUC_SAI.some((x) => f.startsWith(x))) return;
    const o = {}; (f.match(/[A-Z]+\d+(?::[A-Z]+\d+)?/g) || []).forEach((r) => vung(r).forEach((c) => { o[c] = 1; })); // mỗi ô một số để thử đọc công thức
    tinh(f, o);
    (f.replace(/[A-Z]+\d+/g, "").match(/\d+/g) || []).forEach((x) => assert.ok(+x < 1000, "số trong công thức nhỏ hơn 1 000: " + f));
  })));
  assert.ok(dem >= 20, "kho Tin học có các công thức để đọc lại"); nCt = dem;
}

/* ---------- chữ, lời dặn ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).map(String);
const TINH_CU = ["Hà Giang", "Yên Bái", "Bắc Kạn", "Vĩnh Phúc", "Hoà Bình", "Bắc Giang", "Thái Bình", "Hải Dương", "Hà Nam", "Nam Định", "Quảng Bình",
  "Quảng Nam", "Kon Tum", "Bình Định", "Phú Yên", "Ninh Thuận", "Bình Thuận", "Đắk Nông", "Bà Rịa", "Bình Dương", "Bình Phước", "Long An", "Tiền Giang",
  "Bến Tre", "Trà Vinh", "Hậu Giang", "Sóc Trăng", "Bạc Liêu", "Kiên Giang", "Thừa Thiên"];
// tên nhân vật của sách Tin học 6, 7 (An, Minh, Khoa) và Công nghệ 6 (Hoa, Lan): không dùng làm tên người trong câu
const TEN_SACH = ["An", "Minh", "Khoa", "Hoa", "Lan"];
kho.forEach((q) => chu(q).concat(q.svg ? [chuHinh(q.svg)] : []).forEach((s) => {
  const at = q.src + ": “" + s.slice(0, 60) + "”";
  assert.ok(!/(?<![\p{L}])(?:huyện|63 tỉnh|64 tỉnh)(?![\p{L}])/iu.test(s), at + ": đơn vị hành chính cũ");
  TINH_CU.forEach((t) => assert.ok(!new RegExp(`(?<![\\p{L}])${t}(?![\\p{L}])`, "u").test(s), at + ": tên tỉnh đã nhập “" + t + "”"));
  assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|lũy|thỏa|kỹ|lý)(?![\p{L}])/iu.test(s), at + ": dấu thanh, chữ kiểu sách (hoá, khoẻ, luỹ, kĩ, lí)");
  TEN_SACH.forEach((t) => assert.ok(!new RegExp(`(?<![\\p{L}])${t}(?![\\p{L}])`, "u").test(s), at + ": tên nhân vật của sách “" + t + "”"));
  assert.ok(!/(?<![,\d])\d{5,}/.test(s), at + ": số từ 10 000 ngăn hàng nghìn bằng khoảng trắng");
  assert.ok(!/\d\.\d/.test(s) || q.q.includes("mười hai phẩy năm"), at + ": dấu phẩy thập phân (chỉ câu về dấu thập phân của phần mềm bảng tính ghi 12.5)");
  assert.ok(!/(?:phương án|lựa chọn) [A-D]\b|câu [A-D]\b/.test(s), at + ": không nhắc vị trí của phương án");
}));
// lời dặn: các bài theo mục lục sách in năm 2026, nhắc phần trường có thể dạy khác, không có câu về đề chung của Sở (lớp 7 không thuộc Thông tư 89/2026)
const BAI = {
  [T.m]: ["Bài 1 Thiết bị vào – ra", "Bài 2 Phần mềm máy tính", "Bài 3 Quản lí dữ liệu trong máy tính", "Bài 4 Mạng xã hội và một số kênh trao đổi thông tin trên Internet",
    "Bài 5 Ứng xử trên mạng", "Bài 6 Làm quen với phần mềm bảng tính", "Bài 7 Tính toán tự động trên bảng tính", "Bài 8 Công cụ hỗ trợ tính toán", "Bài 9–10", "Chủ đề 5"],
  [C.m]: ["Chương I Trồng trọt", "Bài 1 Giới thiệu về trồng trọt", "Bài 2 Làm đất trồng cây", "Bài 3 Gieo trồng, chăm sóc và phòng trừ sâu, bệnh cho cây trồng",
    "Bài 4 Thu hoạch sản phẩm trồng trọt", "Bài 5 Nhân giống vô tính cây trồng", "Bài 6 Dự án trồng rau an toàn", "Chương II Lâm nghiệp", "Bài 7 Giới thiệu về rừng",
    "Bài 8 Trồng, chăm sóc và bảo vệ rừng", "Chương III"]
};
MON.forEach((s) => s.from.forEach((id) => {
  const note = bank(id).note;
  BAI[s.m].forEach((b) => assert.ok(note.includes(b), id + ": lời dặn ghi " + b));
  assert.ok(/10 câu Biết, 8 câu Hiểu, 7 câu Vận dụng/.test(note) && !/đề chung/.test(note), id + ": lời dặn ghi ma trận, không nói đề chung của Sở");
}));
assert.ok(bank(T.de1).note.includes("13 câu về bảng tính (Bài 6–8)"), "lời dặn Tin học ghi số câu về bảng tính");

/* ---------- dạng câu, mức độ, ma trận, rút thử ---------- */
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
// chữ của nhãn chủ đề (bỏ phần trong ngoặc), tách theo “ và ”, “, ”
const phanNhan = (t) => t.replace(/\s*\([^)]*\)$/, "").split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const CHUNG = new Set(["nào dưới", "dưới đây", "đây là", "là một", "mỗi ý", "ý sau", "sau đúng", "đúng hay", "hay sai", "ở hình", "nào sau", "sau đây", "trang tính", "ý nào"]);
const cap2 = (s) => { const w = String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x); };
const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !CHUNG.has(c) && !nhan.has(c))); };
// chủ đề theo thứ tự bài của sách (mục lục trong README của cuốn ở OnUp-Book); Bài 6 của Công nghệ (dự án) không có chủ đề riêng
const CHU_DE = {
  [T.m]: ["Thiết bị vào – ra", "Phần mềm máy tính", "Quản lí dữ liệu trong máy tính", "Mạng xã hội và kênh trao đổi thông tin", "Ứng xử trên mạng",
    "Làm quen với phần mềm bảng tính", "Tính toán tự động trên bảng tính", "Công cụ hỗ trợ tính toán"],
  [C.m]: ["Giới thiệu về trồng trọt", "Làm đất trồng cây", "Gieo trồng, chăm sóc và phòng trừ sâu, bệnh", "Thu hoạch sản phẩm trồng trọt", "Nhân giống vô tính cây trồng",
    "Giới thiệu về rừng", "Trồng, chăm sóc và bảo vệ rừng"]
};
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
  });
  const tf4 = K.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 4, s.pool + ": ít nhất 4 câu đúng/sai 4 ý");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
  assert.ok(Math.max(...Object.values(kieu)) <= Math.ceil(tf4.length / 3), s.pool + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp nhiều quá: " + JSON.stringify(kieu));
  const mc = K.filter((q) => q.type === "mc");
  // đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2, N22)
  mc.forEach((q) => { const m = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60)); });
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn (Rút ra N9-ck1-tin-congnghe)
  const hon = (q, f) => q.o.slice(1).every((o) => f([...q.o[0]].length, [...o].length));
  assert.ok(mc.filter((q) => hon(q, (a, x) => a > x)).length <= mc.length / 3, s.pool + ": đáp án đúng là lựa chọn dài nhất ở quá một phần ba số câu nhiều lựa chọn");
  assert.ok(mc.filter((q) => hon(q, (a, x) => a < x)).length <= mc.length / 3, s.pool + ": đáp án đúng là lựa chọn ngắn nhất ở quá một phần ba số câu nhiều lựa chọn");
  // ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
  mc.forEach((q) => { const dau = (o) => o.split(" ")[0].toLowerCase(), d = q.o.slice(1).map(dau); assert.ok(!(d.every((x) => x === d[0]) && dau(q.o[0]) !== d[0]), "ba lựa chọn sai cùng mở đầu “" + d[0] + "”: " + q.q.slice(0, 50)); });
  // đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
  K.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => { if (d.toLowerCase().includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => o.toLowerCase().includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); });
  // không gần trùng câu của các kho cùng môn đã có, cả kho lớp 6 (Rút ra N25, như tests/lsdl-gdcd7-ck1.js): đề bài cùng các lựa chọn, ô nối có
  // từ một nửa số cặp hai âm tiết liền nhau (tính trên câu ít cặp hơn, bỏ các cặp có ở mọi câu và cặp của nhãn chủ đề) chung với một câu cũ thì báo
  {
    const cua = new Set(s.from.concat(s.pool));
    const cu = BANKS.filter((b2) => !cua.has(b2.id) && b2.subject === p.subject).flatMap((b2) => b2.questions.filter((q) => !b2.pool || q.src === b2.id).map((q, i) => ({ at: b2.id + "#" + (i + 1), f: b2.file, c: capAm(q) })));
    assert.ok(cu.some((e) => e.f === s.lop6), s.pool + ": có kho lớp 6 cùng môn để so");
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
  // học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên không rút lại câu của đề đó
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

/* ---------- dò lộ đáp án (Rút ra N5; bộ dò của tests/lsdl-gdcd7-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung cả chủ đề, đề
   ngẫu nhiên rút chung hai đề. Đáp án là số (từ hai chữ số, hoặc số thập phân) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”,
   “bằng”, “được”); cặp nối: câu kia có cả hai vế; câu sắp xếp: câu kia có hai bước liền nhau; chữ trong hình của câu kia cũng tính. Đáp án
   bằng chữ (lựa chọn đúng của câu trắc nghiệm, đáp án câu điền) có ở câu kia thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách
   đã xem ghi ở DA_XEM. ---------- */
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
MON.forEach((s) => s.from.forEach((id) => s.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace(/7-ck1-/, "-") + "#" + (i + 1)))));
const loAll = [], chuAll = [];
MON.forEach((s) => { const r = doLo(s.kho, (q) => ten.get(q), () => true); loAll.push(...r.lo); chuAll.push(...r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuAll.join("\n"));
// đã xem (Phiên N7-ck1-tin-congnghe): chữ chung, câu kia không cho biết điều câu này hỏi
const DA_XEM = [];
assert.deepEqual(chuAll, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 31”, cả hai vế một cặp nối, hai ô sắp xếp liền nhau, lựa chọn đúng, chữ trong hình
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thu = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 12), () => true); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*?: /, "")); };
  const khac = tim("Phần mềm nào dưới đây là một hệ điều hành");
  assert.deepEqual(thu([tim("=MAX(B2:B6). Ô B7"), gia(khac, "Ví dụ: =MAX(B2:B6) = 31.")]), ["31"]);
  assert.deepEqual(thu([tim("Ở quầy thu ngân của một nhà sách"), gia(khac, "Máy in hoá đơn là thiết bị ra.")]), ["Máy in hoá đơn → Thiết bị ra"]);
  assert.deepEqual(thu([tim("Hãy xếp các việc sau theo thứ tự an toàn"), gia(khac, "Cắm dây nguồn của máy vào ổ điện rồi Bật công tắc nguồn của máy tính.")]), ["Cắm dây nguồn của máy vào ổ điện | Bật công tắc nguồn của máy tính"]);
  assert.deepEqual(thu([tim("Ô có dấu “?” là việc nào"), gia(khac, "Sau khi cày phải Bừa, đập cho đất nhỏ, mặt ruộng phẳng.")]), ["Bừa, đập cho đất nhỏ, mặt ruộng phẳng"]);
  assert.deepEqual(thu([tim("Ô A4 chứa dữ liệu nào"), Object.assign({}, khac, { svg: '<svg viewBox="0 0 100 20"><text x="5" y="15" font-size="13">Xôi xéo</text></svg>' })]), ["Xôi xéo"]);
}

/* ---------- bộ đọc hình, bộ tính công thức tự thử với hình, công thức cố ý viết sai ---------- */
{
  const tim = (has) => kho.find((q) => q.q.includes(has));
  const trang = tim("=AVERAGE(B2:B5)").svg, cay = tim("cây thư mục bài học của Phúc").svg, so = tim("Bước đó là gì").svg;
  assert.throws(() => docTrang(trang.replace('font-weight="700">Tuần<', '>Tuần<')), /tiêu đề/, "bộ đọc trang tính bắt hàng tiêu đề không đậm");
  assert.throws(() => docTrang(trang.replace(/text-anchor="end" font-size="13">35</, 'font-size="13">35<')), /căn/, "bộ đọc trang tính bắt ô số không căn phải");
  assert.throws(() => docCay(cay.replace(/<line [^>]*\/>/, "")), /đường nối/, "bộ đọc cây thư mục bắt thiếu đường nối");
  assert.throws(() => docCay(cay.replace('fill="sun-soft" stroke="sun"', 'fill="surface" stroke="line"')), /sun-soft/, "bộ đọc cây thư mục bắt thư mục tô như tệp");
  assert.throws(() => docBuoc(so.replace(/<polygon [^>]*\/>/, "")), /mũi tên/, "bộ đọc sơ đồ bắt thiếu mũi tên");
  assert.throws(() => docBuoc(so.replace(">?<", ">Tưới nước<")), /“\?”/, "bộ đọc sơ đồ bắt thiếu ô “?”");
  assert.throws(() => tinh("=SUM(B2:B4", { B2: 1 }), /thiếu/, "bộ tính bắt thiếu ngoặc");
  assert.throws(() => tinh("(B2+C2)/2", {}), /dấu =/, "bộ tính bắt công thức không có dấu =");
  assert.throws(() => tinh("=(B2+C2):2", {}), /không đọc được/, "bộ tính bắt dấu : làm phép chia");
  assert.equal(tinh("=COUNT(A1:A4)", { A1: 3, A2: "vắng", A4: 0 }), 2, "COUNT bỏ qua ô chữ, ô trống");
  assert.equal(tinh("=AVERAGE(A1:A3)+2^3", { A1: 4, A2: "x", A3: 8 }), 14, "AVERAGE bỏ qua ô chữ; luỹ thừa");
  assert.equal(chep("=C3*D3+B3", 2, 1), "=D5*E5+C5", "sao chép công thức dịch cả hàng và cột");
  daDoc.clear();
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book; và với câu của các kho khác ---------- */
// tên riêng nhiều chữ như sách: mỗi tên tính là một từ
const GOP = ["microsoft word", "microsoft excel", "file explorer", "windows defender", "viet nam", "ha noi"].sort((a, b) => b.length - a.length);
// cụm chung của môn (tên bài như sách, cách hỏi chung): không tính khi so chuỗi
const TU_CHUNG = ["Mỗi ý sau đúng hay sai", "Mạng xã hội và một số kênh trao đổi thông tin trên Internet", "Gieo trồng, chăm sóc và phòng trừ sâu, bệnh cho cây trồng",
  "Trồng, chăm sóc và bảo vệ rừng", "Làm quen với phần mềm bảng tính", "Tính toán tự động trên bảng tính", "Công cụ hỗ trợ tính toán", "Thiết bị vào – ra",
  "Phần mềm máy tính", "Quản lí dữ liệu trong máy tính", "Ứng xử trên mạng", "Giới thiệu về trồng trọt", "Làm đất trồng cây", "Thu hoạch sản phẩm trồng trọt",
  "Nhân giống vô tính cây trồng", "Dự án trồng rau an toàn", "Giới thiệu về rừng"].sort((a, b) => b.length - a.length);
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
const khongDau = nhoChuoi((s) => {
  let t = String(s).normalize("NFC");
  TU_CHUNG.forEach((c) => { t = t.split(c).join(" | "); });
  t = " " + t.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9|]+/g, " ").trim() + " ";
  GOP.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); });
  return t.replace(/[aeiouy]+/g, "a").trim();
});
const tuCua = (s) => khongDau(s).split(" ").filter(Boolean);
const chuoi = (s, k) => { const ra = []; khongDau(s).split("|").forEach((p) => { const w = p.split(" ").filter(Boolean); for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); }); return ra; };
const truong = (q) => [q.q, q.x].concat(q.o || [], q.ans != null ? [].concat(q.ans).map(String) : [], q.l || [], q.r || [], q.svg ? [chuHinh(q.svg)] : []);
// chuỗi k từ của kho mới có trong một danh sách chữ [mã, chữ]: dựng tập chuỗi của kho một lần rồi quét từng chữ
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
  assert.ok(["tin-hoc-7", "cong-nghe-7"].every((c) => SACH.some((f) => f.includes(path.join("lop-7", c)))), "OnUp-Book có Tin học 7, Công nghệ 7");
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
