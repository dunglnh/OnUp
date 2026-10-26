// Tính lại đáp án và kiểm tra ma trận hai ngân hàng lớp 6 cuối năm của Phiên N22b: Tin học (data/banks/6-tin.js) và Công nghệ
// (6-congnghe.js), theo mẫu tests/tin-congnghe6-gk2.js. Mỗi ngân hàng = Đề 1 + Đề 2 (25 câu mỗi đề, cùng chia theo ma trận) + đề
// ngẫu nhiên không có câu riêng. Câu có phép tính hoặc có hình được nhận ra bằng một đoạn chữ của đề (has, đúng một câu trong hai
// kho, đúng đề ghi ở id); so đáp án với kết quả tính bằng code: trả lời bằng số ans, trắc nghiệm o[0], đúng/sai 4 ý a, sắp xếp o.
// Tin học: câu có hình đọc lại hình rồi chạy thử. Sơ đồ khối (docSoDoKhoi): Bắt đầu, Kết thúc là hình bầu dục tô moc-soft; nhập,
// thông báo là hình bình hành tô ioe-soft; bước xử lí là hình chữ nhật tô sun-soft; điều kiện là hình thoi tô ok-soft; mũi tên là
// polyline đi từ giữa một cạnh (đỉnh hình thoi) của hình này tới giữa một cạnh của hình khác, đầu mũi tên là tam giác tô ink ở đúng
// điểm cuối; hai đường ra của hình thoi có nhãn “Đúng”, “Sai” (chữ muted, gần đoạn đầu của đường, không đè lên hình nào, không chạm
// mũi tên). chay() đi theo mũi tên: “Nhập …” lấy giá trị cho các tên biến một chữ cái, “x ← biểu thức” (×, :, −; nhiều phép gán
// ngăn bằng dấu phẩy), hình thoi “a op b?” (<, >, ≤, ≥, =), “Thông báo x” hoặc “Thông báo “chữ””; quá 1 000 bước là lặp mãi. Chương
// trình Scratch (docScratch): mỗi khối một hình chữ nhật bo góc tô theo nhóm lệnh, khối trong khối lặp, khối nếu thì lùi vào 18,
// cuối khối đó có thanh đóng cao 10 không chữ, “còn không thì” cùng hàng lùi với “nếu”, thân chữ C (hình chữ nhật không viền rộng 17) nối thanh trên với thanh dưới; chayScratch() chạy các khối đặt, hỏi, nói,
// di chuyển, lặp lại, nếu. Công nghệ: điện năng tiêu thụ = công suất × thời gian (đọc số trong đề), sơ đồ khối nguyên lí của bếp
// hồng ngoại (docChuoi: các hình chữ nhật nối nhau bằng mũi tên thành một chuỗi), bảng công suất (docBang như
// tests/tin-congnghe6-gk2.js). Câu trả lời bằng số và câu có hình nào trong hai kho cũng phải có kiểm tra ở đây; hình nào cũng phải
// được đọc lại.
// Rồi kiểm tra mức độ và ma trận như tests/lsdl-gdcd6-ck2.js: mọi câu có lv; ma trận 10 Biết, 8 Hiểu, 7 Vận dụng, chủ đề theo thứ
// tự của ma trận; cả hai đề chia đúng theo ma trận; mỗi kho có ít nhất 3 câu đúng/sai 4 ý (kiểu Đ/S không lặp quá một phần ba),
// không có câu tự luận; đáp án đúng không dài hơn hẳn các lựa chọn sai, không phải lựa chọn duy nhất có chữ của nhãn chủ đề; rút
// thử nhiều lần ra đúng ma trận, không ghi chú; học sinh đã làm hết một đề cố định thì đề ngẫu nhiên rút đúng 25 câu của đề kia.
// Cuối cùng: đề bài không trùng câu nào khác trong file, không gần trùng (nhiều chữ chung) câu nào của các kho cũ cùng môn, và dò
// lộ đáp án giữa các câu rút được cùng lúc (Rút ra N5; bộ dò theo tests/lsdl-gdcd6-ck2.js; DO_LO=1 in các chỗ đáp án bằng chữ có ở
// câu khác để xem tay, danh sách đã xem ghi ở DA_XEM).
// Chạy: node tests/tin-congnghe6-ck2.js → in MATH OK.
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
const ma = (m) => ({ de1: m + "6-ck2-de1", de2: m + "6-ck2-de2", pool: m + "6-ck2-ngau-nhien" });
const T = ma("tin"), C = ma("congnghe");

const close = (x, y) => Math.abs(x - y) < 1e-9;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(",", "."); // “40 000” → 40000, “2,5” → 2.5

/* ---------- đọc hình ---------- */
const dec = (s) => s.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: dec(m[2]) }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const same = (p, q) => close(p[0], q[0]) && close(p[1], q[1]);
const daDoc = new Set(); // hình đã đọc lại bằng code
const rongChu = (t) => [...t].length * 7.7; // ước bề rộng chữ cỡ 14

/* Sơ đồ khối → { nut: [{kind, chu, cong}], batDau, ra (mũi tên đi ra, có nhan) } */
const docSoDoKhoi = (svg) => {
  daDoc.add(svg);
  const nut = [];
  tags(svg, "ellipse").forEach((e) => { assert.equal(e.fill, "moc-soft", "hình bầu dục tô moc-soft"); const cx = num(e, "cx"), cy = num(e, "cy"), rx = num(e, "rx"), ry = num(e, "ry");
    nut.push({ kind: "se", cx, cy, w: 2 * rx, h: 2 * ry, trong: ([x, y]) => ((x - cx) / rx) ** 2 + ((y - cy) / ry) ** 2 <= 1, cong: [[cx, cy - ry], [cx, cy + ry], [cx - rx, cy], [cx + rx, cy]] }); });
  tags(svg, "rect").forEach((r) => { assert.equal(r.fill, "sun-soft", "bước xử lí là hình chữ nhật tô sun-soft"); const x = num(r, "x"), y = num(r, "y"), w = num(r, "width"), h = num(r, "height");
    nut.push({ kind: "p", cx: x + w / 2, cy: y + h / 2, w, h, trong: ([a, b]) => a >= x && a <= x + w && b >= y && b <= y + h, cong: [[x + w / 2, y], [x + w / 2, y + h], [x, y + h / 2], [x + w, y + h / 2]] }); });
  const dau = [];
  tags(svg, "polygon").forEach((g) => {
    const p = pts(g.points);
    if (g.fill === "ink") { assert.equal(p.length, 3, "đầu mũi tên là tam giác"); dau.push(p[0]); return; }
    assert.equal(p.length, 4);
    if (g.fill === "ioe-soft") { // hình bình hành lệch 10: (x+10,y) (x+w,y) (x+w−10,y+h) (x,y+h)
      const x = p[3][0], y = p[0][1], w = p[1][0] - x, h = p[2][1] - y;
      assert.ok(close(p[0][0], x + 10) && close(p[1][1], y) && close(p[2][0], x + w - 10) && close(p[3][1], y + h), "hình bình hành đúng dạng");
      nut.push({ kind: "io", cx: x + w / 2, cy: y + h / 2, w, h, trong: ([a, b]) => a >= x && a <= x + w && b >= y && b <= y + h, cong: [[x + w / 2, y], [x + w / 2, y + h], [x + 5, y + h / 2], [x + w - 5, y + h / 2]] });
    } else if (g.fill === "ok-soft") { // hình thoi: trên, phải, dưới, trái
      const [t, r, b, l] = p;
      assert.ok(close(t[0], b[0]) && close(l[1], r[1]) && close(t[0] - l[0], r[0] - t[0]) && close(l[1] - t[1], b[1] - l[1]), "hình thoi đúng dạng");
      const cx = t[0], cy = l[1], w = r[0] - l[0], h = b[1] - t[1];
      nut.push({ kind: "d", cx, cy, w, h, trong: ([a, c]) => Math.abs(a - cx) / (w / 2) + Math.abs(c - cy) / (h / 2) <= 1, cong: [t, b, l, r] });
    } else assert.fail("màu hình lạ: " + g.fill);
  });
  const nhan = [];
  texts(svg).forEach((t) => {
    assert.ok(+t["font-size"] >= 13, "chữ trong hình từ 13 trở lên");
    const p = [+t.x, +t.y - 5];
    if (t.fill === "muted") { assert.ok(["Đúng", "Sai"].includes(t.t), "nhãn của đường ra là Đúng hoặc Sai: " + t.t); nhan.push({ t: t.t, x: +t.x, y: +t.y }); return; }
    const n = nut.filter((k) => k.trong(p));
    assert.equal(n.length, 1, "chữ nằm trong đúng một hình: " + t.t);
    (n[0].dong = n[0].dong || []).push({ y: +t.y, t: t.t });
  });
  nut.forEach((n) => {
    assert.ok(n.dong && n.dong.length, "hình nào cũng có chữ");
    n.chu = n.dong.sort((a, b) => a.y - b.y).map((d) => d.t).join(" ");
    const cho = n.kind === "d" ? n.w * (1 - 18 / n.h) - 6 : n.kind === "io" ? n.w - 26 : n.w - 10; // chữ nằm gọn trong hình
    n.dong.forEach((d) => assert.ok(rongChu(d.t) <= cho, `chữ “${d.t}” rộng quá hình`));
    n.ra = [];
  });
  const timNut = (p) => { const n = nut.filter((k) => k.cong.some((c) => same(c, p))); assert.equal(n.length, 1, "đầu, cuối mũi tên ở giữa cạnh của đúng một hình: " + p); return n[0]; };
  const muiTen = tags(svg, "polyline").map((l) => {
    const p = pts(l.points), tu = timNut(p[0]), toi = timNut(p[p.length - 1]);
    assert.notEqual(tu, toi);
    assert.equal(dau.filter((d) => same(d, p[p.length - 1])).length >= 1, true, "có đầu mũi tên ở cuối đường");
    p.slice(1).forEach((q, i) => assert.ok(close(q[0], p[i][0]) || close(q[1], p[i][1]), "mũi tên chỉ gồm đoạn ngang, đoạn dọc"));
    const m = { tu, toi, p };
    tu.ra.push(m);
    return m;
  });
  assert.equal(dau.length, muiTen.length, "mỗi mũi tên một đầu mũi tên");
  /* nhãn Đúng, Sai: khung chữ (cỡ 13, đo trên trình duyệt: “Đúng” rộng 29,4, cao từ y − 12 đến y + 3) không đè lên hình nào, cách
     mọi đoạn mũi tên ít nhất 4 và cách đoạn đầu của đúng một đường ra của hình thoi dưới 12: đó là nhãn của đường ra này */
  const cach = (k, a, b) => Math.hypot(Math.max(0, Math.min(a[0], b[0]) - k[2], k[0] - Math.max(a[0], b[0])), Math.max(0, Math.min(a[1], b[1]) - k[3], k[1] - Math.max(a[1], b[1]))); // khung chữ – đoạn ngang, dọc
  nhan.forEach((n) => {
    const w = [...n.t].length * 7.4, k = [n.x - w / 2, n.y - 12, n.x + w / 2, n.y + 3], o = `nhãn ${n.t} ở (${n.x}, ${n.y})`;
    const diem = []; for (let i = 0; i <= 4; i++) for (let j = 0; j <= 2; j++) diem.push([k[0] + (i * w) / 4, k[1] + (j * 15) / 2]);
    assert.ok(!nut.some((h) => diem.some((d) => h.trong(d))), o + " đè lên một hình");
    muiTen.forEach((m) => m.p.slice(1).forEach((b, i) => assert.ok(cach(k, m.p[i], b) >= 4, o + " chạm một mũi tên")));
    const m = muiTen.filter((h) => h.tu.kind === "d" && cach(k, h.p[0], h.p[1]) < 12);
    assert.equal(m.length, 1, o + " gần đúng một đường ra của hình thoi"); assert.ok(!m[0].nhan); m[0].nhan = n.t;
  });
  nut.forEach((n) => {
    if (n.kind === "d") assert.deepEqual(n.ra.map((m) => m.nhan).sort(), ["Sai", "Đúng"], "hình thoi có hai đường ra Đúng, Sai");
    else if (n.chu === "Kết thúc") assert.equal(n.ra.length, 0);
    else assert.equal(n.ra.length, 1, "hình “" + n.chu + "” có đúng một đường ra");
  });
  const batDau = nut.filter((n) => n.chu === "Bắt đầu");
  assert.equal(batDau.length, 1); assert.equal(nut.filter((n) => n.chu === "Kết thúc").length, 1);
  assert.ok(nut.every((n) => (n.kind === "se") === ["Bắt đầu", "Kết thúc"].includes(n.chu)), "chỉ Bắt đầu, Kết thúc là hình bầu dục");
  assert.ok(nut.filter((n) => n.kind === "io").every((n) => /^(Nhập|Thông báo) /.test(n.chu)), "hình bình hành chỉ để nhập hoặc thông báo");
  assert.ok(!muiTen.some((m) => m.toi === batDau[0]), "không mũi tên nào đi vào Bắt đầu");
  return { nut, batDau: batDau[0], muiTen };
};
/* biểu thức: số (có thể ngăn hàng nghìn), tên biến, + − × : và ngoặc */
const tinh = (bt, env) => {
  let s = bt.replace(/(\d) (?=\d{3}\b)/g, "$1").replace(/×/g, "*").replace(/:/g, "/").replace(/−/g, "-").replace(/,/g, ".");
  s = s.replace(/\p{L}+/gu, (v) => { assert.ok(v in env, "biến chưa có giá trị: " + v); return "(" + env[v] + ")"; });
  assert.ok(/^[\d+\-*/(). ]+$/.test(s), "biểu thức lạ: " + bt);
  return Function("return (" + s + ")")();
};
const dung = (dk, env) => {
  const m = /^(.+?) (<|>|≤|≥|=) (.+)\?$/.exec(dk);
  assert.ok(m, "điều kiện lạ: " + dk);
  const a = tinh(m[1], env), b = tinh(m[3], env);
  return { "<": a < b, ">": a > b, "≤": a <= b, "≥": a >= b, "=": a === b }[m[2]];
};
/* chạy sơ đồ khối: vao là giá trị lần lượt cho các biến của bước nhập; trả { ra: các thông báo, dem: số lần mỗi hình, lapMai } */
const chay = (G, vao, bo) => {
  const env = {}, ra = [], dem = new Map(), q = [].concat(vao || []);
  let n = G.batDau;
  for (let buoc = 0; buoc < 1000; buoc++) {
    dem.set(n, (dem.get(n) || 0) + 1);
    if (n.chu === "Kết thúc") return { ra, dem, env, lapMai: false };
    let tiep = n.ra[0];
    if (n.kind === "io" && /^Nhập /.test(n.chu)) {
      const ten = [...n.chu.replace(/\(.*?\)/g, "").matchAll(/(?<!\p{L})(\p{Ll})(?!\p{L})/gu)].map((m) => m[1]);
      assert.ok(ten.length, "bước nhập có tên biến: " + n.chu);
      ten.forEach((v) => { assert.ok(q.length, "thiếu giá trị nhập cho " + v); env[v] = q.shift(); });
    } else if (n.kind === "io") {
      const m = /^Thông báo (?:“(.*)”|(\p{L}+))$/u.exec(n.chu); assert.ok(m, "bước thông báo lạ: " + n.chu);
      ra.push(m[1] != null ? m[1] : env[m[2]]);
    } else if (n.kind === "p" && n !== bo) {
      if (/←/.test(n.chu)) n.chu.split(/, (?=\p{L}+ ←)/u).forEach((g) => { const [v, bt] = g.split(" ← "); env[v.trim()] = tinh(bt, env); });
    } else if (n.kind === "d") tiep = n.ra.find((m) => m.nhan === (dung(n.chu, env) ? "Đúng" : "Sai"));
    n = tiep.toi;
  }
  return { ra, dem, env, lapMai: true };
};
const nutChu = (G, chu) => { const n = G.nut.filter((k) => k.chu === chu); assert.equal(n.length, 1, "có đúng một hình “" + chu + "”"); return n[0]; };
const coLap = (G) => { // có mũi tên quay về hình đã đi qua (theo thứ tự đi từ Bắt đầu)
  const tham = new Map(); let lap = false;
  (function di(n, d) { tham.set(n, d); n.ra.forEach((m) => { if (tham.has(m.toi)) { if (tham.get(m.toi) !== Infinity) lap = true; } else di(m.toi, d + 1); }); tham.set(n, Infinity); })(G.batDau, 0);
  return lap;
};

/* Chương trình Scratch → danh sách khối { t, body?, els? } */
const NHOM = [[/^khi nhấn vào lá cờ xanh$/, "sun-soft"], [/^hỏi “.*” và đợi$/, "ioe-soft"], [/^đặt \p{L}+ là .+$/u, "ok-soft"], [/^nói .+ trong \d+ giây$/, "moc-soft"],
  [/^di chuyển \d+ bước$/, "acc-soft"], [/^(lặp lại \d+ lần|nếu .+ thì|còn không thì)$/, "bad-soft"]];
const docScratch = (svg) => {
  daDoc.add(svg);
  const T = texts(svg), R = tags(svg, "rect"), than = R.filter((r) => r.stroke === "none"); // than: thân chữ C, không viền
  const hang = R.filter((r) => r.stroke !== "none").map((r) => {
    const x = num(r, "x"), y = num(r, "y"), w = num(r, "width"), h = num(r, "height"), chu = T.filter((t) => +t.x > x && +t.x < x + w && +t.y > y && +t.y < y + h);
    assert.ok(chu.length <= 1, "mỗi khối một dòng chữ");
    const t = chu.length ? chu[0].t : null;
    if (t) { const g = NHOM.find(([re]) => re.test(t)); assert.ok(g, "khối lạ: " + t); assert.equal(r.fill, g[1], "màu của khối “" + t + "”"); assert.ok(rongChu(t) + 10 <= w, `chữ “${t}” rộng quá khối`); assert.ok(x + w <= 316, "khối nằm trong khung"); }
    else { assert.ok(h <= 12 && r.fill === "bad-soft", "khối không chữ là thanh đóng"); }
    return { x, y, h, t };
  }).sort((a, b) => a.y - b.y);
  // thân chữ C (như hình của sách): nối thanh của khối lặp, khối nếu hay “còn không thì” với thanh ngay dưới cùng cột
  const coThan = hang.filter((h) => h.t && /^(lặp lại|nếu|còn không thì)/.test(h.t));
  assert.equal(than.length, coThan.length, "mỗi khối lặp, khối nếu, “còn không thì” có một thân chữ C");
  than.forEach((r) => {
    const x = num(r, "x") - 1, y1 = num(r, "y") + 3, y2 = y1 + num(r, "height") - 6;
    assert.ok(r.fill === "bad-soft" && num(r, "width") === 17, "thân chữ C cùng màu khối điều khiển, rộng 17");
    assert.ok(coThan.some((h) => h.x === x && h.y + h.h === y1), "thân chữ C bắt đầu ngay dưới khối lặp, khối nếu");
    assert.ok(hang.some((h) => h.x === x && h.y === y2 && (!h.t || h.t === "còn không thì")), "thân chữ C kết thúc ở thanh dưới cùng cột");
  });
  assert.equal(T.length, hang.filter((h) => h.t).length, "chữ nào cũng nằm trong một khối");
  const x0 = Math.min(...hang.map((h) => h.x));
  hang.forEach((h) => { h.d = (h.x - x0) / 18; assert.ok(Number.isInteger(h.d), "khối lùi vào bội của 18"); });
  let i = 0;
  const doc = (d) => {
    const list = [];
    while (i < hang.length && hang[i].d >= d) {
      const h = hang[i];
      assert.equal(h.d, d, "khối lùi vào sai chỗ: " + h.t);
      if (!h.t || h.t === "còn không thì") break;
      i++;
      const b = { t: h.t };
      if (/^(lặp lại|nếu)/.test(h.t)) {
        b.body = doc(d + 1); assert.ok(b.body.length, "khối " + h.t + " có khối bên trong");
        if (hang[i] && hang[i].t === "còn không thì") { assert.ok(/^nếu/.test(h.t)); i++; b.els = doc(d + 1); }
        assert.ok(hang[i] && !hang[i].t && hang[i].d === d, "khối " + h.t + " có thanh đóng"); i++;
      }
      list.push(b);
    }
    return list;
  };
  const prog = doc(0);
  assert.equal(i, hang.length, "đọc hết các khối");
  assert.equal(prog[0].t, "khi nhấn vào lá cờ xanh", "chương trình bắt đầu bằng khối khi nhấn vào lá cờ xanh");
  return prog;
};
const chayScratch = (prog, traLoi) => {
  const env = {}, noi = [], dem = new Map(), q = [].concat(traLoi || []);
  let tra = null, di = 0, buoc = 0;
  const gt = (bt) => { const m = /^“(.*)”$/.exec(bt); if (m) return m[1]; if (bt === "trả lời") return tra; return tinh(bt, env); };
  const dk = (s) => { const m = /^(.+?) (<|>|=) (.+)$/.exec(s); assert.ok(m, "điều kiện lạ: " + s); const a = m[1] === "trả lời" ? tra : gt(m[1]), b = gt(m[3]);
    const [x, y] = typeof a === "string" && typeof b === "string" ? [a, b] : [+a, +b]; return { "<": x < y, ">": x > y, "=": x === y }[m[2]]; };
  const run = (list) => list.forEach((b) => {
    assert.ok(++buoc < 1000, "chương trình lặp mãi");
    dem.set(b, (dem.get(b) || 0) + 1);
    let m;
    if ((m = /^hỏi “.*” và đợi$/.exec(b.t))) { assert.ok(q.length, "thiếu câu trả lời gõ vào"); tra = q.shift(); }
    else if ((m = /^đặt (\p{L}+) là (.+)$/u.exec(b.t))) env[m[1]] = gt(m[2]);
    else if ((m = /^nói (.+) trong \d+ giây$/.exec(b.t))) noi.push(gt(m[1]));
    else if ((m = /^di chuyển (\d+) bước$/.exec(b.t))) di += +m[1];
    else if ((m = /^lặp lại (\d+) lần$/.exec(b.t))) for (let k = 0; k < +m[1]; k++) run(b.body);
    else if ((m = /^nếu (.+) thì$/.exec(b.t))) { if (dk(m[1])) run(b.body); else if (b.els) run(b.els); }
    else assert.ok(/^khi nhấn/.test(b.t), "khối chưa chạy được: " + b.t);
  });
  run(prog);
  return { noi, di, dem };
};
const khoi = (prog, t) => { const r = []; (function tim(l) { l.forEach((b) => { if (b.t === t) r.push(b); if (b.body) tim(b.body); if (b.els) tim(b.els); }); })(prog); assert.equal(r.length, 1, "có đúng một khối “" + t + "”"); return r[0]; };
const sua = (prog, tu, thanh) => JSON.parse(JSON.stringify(prog), (k, v) => (k === "t" && v === tu ? thanh : v)); // đổi chữ một khối
const bo = (prog, t) => JSON.parse(JSON.stringify(prog), (k, v) => (Array.isArray(v) ? v.filter((b) => !(b && b.t === t)) : v)); // bỏ một khối

/* Sơ đồ khối nguyên lí (các hình chữ nhật nối thành một chuỗi) → chữ từng khối theo thứ tự */
const docChuoi = (svg) => {
  daDoc.add(svg);
  const R = tags(svg, "rect").map((r) => ({ x: num(r, "x"), y: num(r, "y"), w: num(r, "width"), h: num(r, "height") })), T = texts(svg);
  R.forEach((r) => { const c = T.filter((t) => +t.x >= r.x && +t.x <= r.x + r.w && +t.y - 5 >= r.y && +t.y - 5 <= r.y + r.h); assert.equal(c.length, 1, "mỗi khối một dòng chữ"); r.t = c[0].t; assert.ok(rongChu(r.t) <= r.w - 10); });
  assert.equal(T.length, R.length);
  const L = tags(svg, "polyline").map((l) => pts(l.points)), dau = tags(svg, "polygon").map((g) => pts(g.points)[0]);
  assert.equal(L.length, R.length - 1); assert.equal(dau.length, L.length);
  const tai = (p) => R.findIndex((r) => (close(p[0], r.x + r.w / 2) && (close(p[1], r.y) || close(p[1], r.y + r.h))));
  const noi = L.map((p) => { const a = tai(p[0]), b = tai(p[p.length - 1]); assert.ok(a >= 0 && b >= 0 && a !== b); assert.ok(dau.some((d) => same(d, p[p.length - 1]))); return [a, b]; });
  let k = R.findIndex((_, j) => !noi.some(([, b]) => b === j)); const thuTu = [];
  while (k >= 0) { thuTu.push(R[k].t); const n = noi.find(([a]) => a === k); k = n ? n[1] : -1; }
  assert.equal(thuTu.length, R.length, "các khối nối thành một chuỗi");
  return thuTu;
};
/* Bảng: như tests/tin-congnghe6-gk2.js → { hang, cot, o: [[chữ từng ô theo hàng]] } */
const docBang = (svg) => {
  daDoc.add(svg);
  const lines = tags(svg, "line"), ngang = lines.filter((l) => num(l, "y1") === num(l, "y2")), doc = lines.filter((l) => num(l, "x1") === num(l, "x2"));
  assert.equal(ngang.length + doc.length, lines.length, "mọi đường kẻ nằm ngang hoặc thẳng đứng");
  const ys = [...new Set(ngang.map((l) => num(l, "y1")))].sort((a, b) => a - b), xs = [...new Set(doc.map((l) => num(l, "x1")))].sort((a, b) => a - b);
  const dy = ys[1] - ys[0], dx = xs[1] - xs[0];
  ys.forEach((y, i) => i && assert.equal(y - ys[i - 1], dy, "các hàng cao bằng nhau"));
  xs.forEach((x, i) => i && assert.equal(x - xs[i - 1], dx, "các cột rộng bằng nhau"));
  const o = Array.from({ length: ys.length - 1 }, () => Array(xs.length - 1).fill(null));
  texts(svg).forEach((t) => {
    const c = xs.findIndex((x, i) => i && close(+t.x, (x + xs[i - 1]) / 2)) - 1, r = ys.findIndex((y, i) => i && close(+t.y - 5, (y + ys[i - 1]) / 2)) - 1;
    assert.ok(c >= 0 && r >= 0 && o[r][c] === null, "chữ đặt đúng giữa một ô, mỗi ô một chữ: " + t.t);
    assert.ok(rongChu(t.t) <= dx - 8, "chữ nằm gọn trong ô: " + t.t);
    o[r][c] = t.t;
  });
  assert.ok(o.every((h) => h.every((v) => v !== null)), "ô nào cũng có chữ");
  return { hang: ys.length - 1, cot: xs.length - 1, o };
};

/* ---------- các câu cần tính hoặc có hình ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans, o[0], a hoặc o). */
const DIEN = "Biết điện năng tiêu thụ (Wh) bằng công suất (W) nhân với thời gian sử dụng (giờ)."; // câu tính điện năng ghi sẵn cách tính
const W = (s) => +s.replace(/\s/g, "");
const CHECKS = [
  /* Tin học · Thuật toán */
  { id: T.de1, has: "Sơ đồ khối ở hình mô tả thuật toán gì?", right: (q) => {
    const G = docSoDoKhoi(q.svg); assert.ok(!coLap(G));
    [[3, 8000], [12, 6500]].forEach(([n, g]) => assert.deepEqual(chay(G, [n, g]).ra, [n * g], "thuật toán tính n × g"));
    assert.ok(/Nhập số quyển vở n, giá một quyển g/.test(nutChu(G, "Nhập số quyển vở n, giá một quyển g").chu));
    return "Tính số tiền mua n quyển vở"; } },
  { id: T.de1, has: "Thực hiện thuật toán ở hình với đầu vào a = 9", right: (q) => {
    const G = docSoDoKhoi(q.svg), r = chay(G, [9]); assert.equal(r.ra.length, 1);
    assert.ok(q.x.includes(`b ← 9 × 3 = ${r.env.b}`) && q.x.includes(`c ← ${r.env.b} − 4 = ${r.env.c}`), "lời giải ghi từng bước");
    return r.ra[0]; } },
  { id: T.de1, has: "đổi số đo thời gian h giờ m phút ra phút", right: (q) => {
    // ghép các khối theo thứ tự thành sơ đồ thẳng rồi chạy thử
    const nut = q.o.map((t, i) => ({ chu: t, kind: i === 0 || i === q.o.length - 1 ? "se" : /^(Nhập|Thông báo) /.test(t) ? "io" : "p", ra: [] }));
    nut.slice(0, -1).forEach((n, i) => n.ra.push({ toi: nut[i + 1] }));
    assert.deepEqual(chay({ batDau: nut[0], nut }, [2, 15]).ra, [135], "2 giờ 15 phút = 135 phút");
    // đổi chỗ hai bước tính thì sai (p chưa có giá trị khi cộng m)
    const sai = [2, 3].map((i) => nut[5 - i]); assert.throws(() => { const n2 = [nut[0], nut[1], sai[0], sai[1], nut[4], nut[5]].map((n) => ({ chu: n.chu, kind: n.kind, ra: [] })); n2.slice(0, -1).forEach((n, i) => n.ra.push({ toi: n2[i + 1] })); chay({ batDau: n2[0], nut: n2 }, [2, 15]); });
    return q.o; } },
  { id: T.de2, has: "ngay sau bước “Cho nước vào bình” là bước nào?", right: (q) => {
    const G = docSoDoKhoi(q.svg), n = nutChu(G, "Cho nước vào bình");
    assert.ok(q.o.slice(1).every((o) => G.nut.some((k) => k.chu === o) && o !== n.ra[0].toi.chu), "lựa chọn sai là bước khác trong sơ đồ");
    return n.ra[0].toi.chu; } },
  { id: T.de2, has: "đổi độ dài từ xăng-ti-mét sang mét", right: (q) => {
    const G = docSoDoKhoi(q.svg), nhap = G.nut.find((n) => /^Nhập/.test(n.chu)), xl = G.nut.filter((n) => n.kind === "p"), tb = G.nut.find((n) => /^Thông báo/.test(n.chu));
    const thuTu = []; for (let n = G.batDau; n; n = n.ra[0] && n.ra[0].toi) thuTu.push(n);
    return [/^Nhập độ dài d \(cm\)$/.test(nhap.chu), xl.length === 2, tb.chu === "Thông báo m" && close(chay(G, [250]).ra[0], 2.5), thuTu.indexOf(tb) < thuTu.indexOf(xl[0])]; } },
  { id: T.de2, has: "tính vận tốc v của một xe đạp", right: (q) => {
    const G = docSoDoKhoi(q.svg), o = nutChu(G, "?");
    const kq = q.o.map((t) => { o.chu = t; try { return chay(G, [36, 3]).ra[0]; } catch (e) { return null; } finally { o.chu = "?"; } });
    assert.deepEqual(kq.map((v) => v === 12), [true, false, false, false], "chỉ lựa chọn đúng cho v = s : t");
    return "v ← s : t"; } },
  { id: T.de2, has: "Thuật toán ở hình thông báo b = 18", right: (q) => {
    const G = docSoDoKhoi(q.svg), n = Array.from({ length: 100 }, (_, k) => k + 1).filter((k) => chay(G, [k]).ra[0] === 18);
    assert.equal(n.length, 1, "chỉ một số học sinh cho b = 18"); assert.equal(q.unit, "học sinh"); return n[0]; } },
  /* Tin học · Các cấu trúc điều khiển */
  { id: T.de1, has: "xét kết quả một bài kiểm tra", right: (q) => {
    const so = (s) => +/^Nhập d = (\d+) thì/.exec(s)[1], G = docSoDoKhoi(q.svg), r7 = chay(G, [so(q.o[0])]).ra, r5 = chay(G, [so(q.o[1])]).ra, nhap = G.nut.find((n) => /^Nhập/.test(n.chu)), dk = G.nut.find((n) => n.kind === "d");
    const moi = [0, 3, 4.5, 5, 9.5, 10].every((d) => chay(G, [d]).ra.length === 1);
    return [r7[0] === "Đạt", r5[0] === "Chưa đạt", !moi, nhap.ra[0].toi === dk]; } },
  { id: T.de1, has: "cùng bước “Bơm thêm một lần” tạo thành cấu trúc nào?", right: (q) => {
    const G = docSoDoKhoi(q.svg); assert.ok(coLap(G), "sơ đồ có vòng lặp"); assert.equal(G.nut.filter((n) => n.kind === "d").length, 1);
    const dk = nutChu(G, "Bóng chưa đủ căng?"), bom = nutChu(G, "Bơm thêm một lần");
    assert.ok(dk.ra.find((m) => m.nhan === "Đúng").toi === bom && bom.ra[0].toi === dk, "nhánh Đúng tới bước bơm, bước bơm quay về hình thoi");
    return "Cấu trúc lặp"; } },
  { id: T.de1, has: "tính tiền vé tham quan T (đồng)", right: (q) => {
    const G = docSoDoKhoi(q.svg); assert.equal(q.unit, "đồng");
    assert.deepEqual([9, 10].map((n) => chay(G, [n]).ra[0]), [9 * 50000, 10 * 40000], "nhóm từ 10 người giá 40 000 đồng một người");
    return chay(G, [+q.q.match(/nhập n = (\d+)/)[1]]).ra[0]; } },
  { id: T.de1, has: "viết chữ “A” đúng 10 lần", right: (q) => {
    const G = docSoDoKhoi(q.svg), dk = nutChu(G, "?"), viet = nutChu(G, "Viết chữ “A”");
    const lan = q.o.map((o) => { dk.chu = o; const r = chay(G); assert.ok(!r.lapMai); return r.dem.get(viet) || 0; });
    dk.chu = "?";
    assert.deepEqual(lan, [10, 0, 0, 11], "số lần viết theo từng điều kiện");
    return "d < 10?"; } },
  { id: T.de2, has: "nếu hôm nay có tiết Thể dục thì Nam", right: (q) => {
    const G = docSoDoKhoi(q.svg), dk = G.nut.find((n) => n.kind === "d"), toi = (nh) => dk.ra.find((m) => m.nhan === nh).toi.chu;
    assert.equal(dk.chu, "Có tiết Thể dục?"); assert.equal(toi("Sai"), q.o[1]); return toi("Đúng"); } },
  { id: T.de2, has: "Thực hiện thuật toán ở hình. Mỗi ý sau đúng hay sai?", right: (q) => {
    const G = docSoDoKhoi(q.svg), r = chay(G), cong = nutChu(G, "S ← S + i");
    const boTang = chay(G, [], nutChu(G, "i ← i + 1"));
    return [r.dem.get(cong) === 4, nutChu(G, "i ← i + 1").ra[0].toi === nutChu(G, "i ≤ 4?"), !boTang.lapMai, r.env.i === 5 && r.dem.get(cong) === 5]; } },
  { id: T.de2, has: "Mỗi tuần Hà bỏ vào lợn đất 15 nghìn đồng", right: (q) => {
    const G = docSoDoKhoi(q.svg), r = chay(G); assert.equal(q.unit, "tuần"); assert.ok(r.env.T >= 100 && r.env.T - 15 < 100);
    return r.ra[0]; } },
  /* Tin học · Chương trình máy tính */
  { id: T.de1, has: "khối lệnh nào nhận dữ liệu đầu vào do người dùng gõ", right: (q) => {
    const P = docScratch(q.svg), ten = []; (function d(l) { l.forEach((b) => { ten.push(b.t); if (b.body) d(b.body); }); })(P);
    assert.ok(q.o.every((o) => ten.includes(o)), "lựa chọn là các khối của chương trình");
    assert.deepEqual(chayScratch(P, ["4"]).noi, [8]);
    return ten.find((t) => /^hỏi /.test(t)); } },
  { id: T.de1, has: "Chạy chương trình Scratch ở hình. Mỗi ý sau đúng hay sai?", right: (q) => {
    const P = docScratch(q.svg), r = chayScratch(P), dc = khoi(P, "di chuyển 30 bước"), xong = P.indexOf(khoi(P, "nói “Xong!” trong 2 giây")), lap = P.findIndex((b) => /^lặp lại/.test(b.t));
    return [r.noi.filter((s) => s === "Bắt đầu!").length === 4, r.dem.get(dc) === 4, xong > lap && lap > 0, r.dem.get(khoi(P, "nói “Tiếp nào!” trong 1 giây")) === 1]; } },
  { id: T.de1, has: "(a, b là hai biến). Nhân vật nói số nào?", right: (q) => { const r = chayScratch(docScratch(q.svg)); assert.equal(r.noi.length, 1); return r.noi[0]; } },
  { id: T.de1, has: "(s là một biến). Nhân vật nói số nào?", right: (q) => { const r = chayScratch(docScratch(q.svg)); assert.equal(r.noi.length, 1); return r.noi[0]; } },
  { id: T.de2, has: "sử dụng những cấu trúc điều khiển nào?", right: (q) => {
    const P = docScratch(q.svg), co = (re) => { let c = false; (function d(l) { l.forEach((b) => { if (re.test(b.t)) c = true; if (b.body) d(b.body); if (b.els) d(b.els); }); })(P); return c; };
    assert.deepEqual(chayScratch(P, ["chưa"]).noi, ["Cho mèo ăn nhé!", "Chúc ngày vui!"]); assert.deepEqual(chayScratch(P, ["rồi"]).noi, ["Chúc ngày vui!"]);
    return "Tuần tự" + (co(/^nếu/) ? " và rẽ nhánh" : "") + (co(/^lặp/) ? " và lặp" : ""); } },
  { id: T.de2, has: "Lan gõ 20 rồi nhấn Enter", right: (q) => {
    const P = docScratch(q.svg);
    assert.deepEqual(chayScratch(P, ["19"]).noi, [q.o[1]], "gõ 19 thì nói câu ở lựa chọn thứ hai");
    const r = chayScratch(P, ["20"]); assert.equal(r.noi.length, 1); return r.noi[0]; } },
  { id: T.de2, has: "nói lần lượt 3, 2, 1", right: (q) => {
    const P = docScratch(q.svg); assert.deepEqual(chayScratch(P).noi, [3, 4, 5], "chương trình đang nói 3, 4, 5");
    const kq = q.o.map((o) => { let m; const Q = (m = /^Đổi «(.+)» thành «(.+)»$/.exec(o)) ? sua(P, m[1], m[2]) : (m = /^Bỏ khối «(.+)»$/.exec(o)) ? bo(P, m[1]) : assert.fail("lựa chọn lạ: " + o); assert.notDeepEqual(Q, P, "lựa chọn sửa đúng một khối có trong chương trình: " + o); return JSON.stringify(chayScratch(Q).noi); });
    assert.deepEqual(kq.map((s) => s === "[3,2,1]"), [true, false, false, false], "chỉ lựa chọn đúng cho 3, 2, 1");
    return q.o[0]; } },
  /* Công nghệ */
  { id: C.de1, has: "Đèn chùm ở phòng khách nhà Mai", right: (q) => {
    const m = /có (\d+) bóng LED, mỗi bóng ghi 220 V – (\d+) W\. Mỗi tối đèn bật (\d+) giờ/.exec(q.q); assert.ok(m && q.q.includes(DIEN)); assert.equal(q.unit, "Wh");
    return +m[1] * +m[2] * +m[3]; } },
  { id: C.de1, has: "Ti vi nhà Bình ghi", right: (q) => {
    const m = /ghi 220 V – (\d+) W\. Trước đây ti vi bật (\d+) giờ mỗi ngày, nay .* chỉ bật (\d+) giờ/.exec(q.q); assert.ok(m && q.q.includes(DIEN)); assert.equal(q.unit, "Wh");
    return +m[1] * (+m[2] - +m[3]); } },
  { id: C.de1, has: "Bảng ở hình ghi công suất và thời gian dùng mỗi ngày", right: (q) => {
    const b = docBang(q.svg); assert.deepEqual(b.o[0], ["Đồ dùng", "Công suất", "Thời gian"]); assert.ok(q.q.includes(DIEN));
    const dd = b.o.slice(1).map(([ten, p, t]) => ({ ten, p: W(p.replace(/ W$/, "")), t: +t.replace(/ giờ$/, "") })), A = (ten) => { const d = dd.find((k) => k.ten === ten); return d.p * d.t; };
    const lon = dd.reduce((a, d) => (d.p > a.p ? d : a));
    assert.ok(dd.every((d) => q.x.includes(`${d.p} × ${d.t} = ${d.p * d.t} (Wh)`)), "lời giải tính điện năng từng đồ dùng");
    return [lon.ten === "Máy bơm", A("Quạt điện") > A("Máy bơm"), A("Máy giặt") === 400, A("Đèn LED") === 17]; } },
  { id: C.de1, has: "cho thấy cách bếp hồng ngoại làm việc", right: (q) => {
    const c = docChuoi(q.svg), sach = ["Nguồn điện", "Bộ phận điều khiển", "Mâm nhiệt hồng ngoại", "Nồi nấu"]; // Hình 13.2 của sách
    assert.equal(c.length, sach.length); assert.equal(c.filter((t) => t === "?").length, 1);
    c.forEach((t, i) => t !== "?" && assert.equal(t, sach[i]));
    return sach[c.indexOf("?")]; } },
  { id: C.de2, has: "Bình nóng lạnh nhà An ghi", right: (q) => {
    const m = /ghi 220 V – ([\d ]+) W, mỗi ngày bật (\d+) phút\. .* Trong (\d+) ngày/.exec(q.q); assert.ok(m && q.q.includes(DIEN)); assert.equal(q.unit, "kWh");
    return (W(m[1]) * (+m[2] / 60) * +m[3]) / 1000; } },
  { id: C.de2, has: "Bàn là nhà Mai ghi", right: (q) => {
    const m = /ghi 220 V – ([\d ]+) W\. .* rút phích sớm (\d+) phút .* Mỗi tuần Mai là quần áo (\d+) lần/.exec(q.q); assert.ok(m && q.q.includes(DIEN)); assert.equal(q.unit, "Wh");
    return W(m[1]) * (+m[2] / 60) * +m[3]; } },
  { id: C.de2, has: "Chọn quạt nào là hợp lí?", right: (q) => {
    // mọi lựa chọn đều 220 V (đề không dạy điện áp ở câu này); chỉ lựa chọn đúng là quạt bàn công suất nhỏ
    const ok = q.o.map((o) => { const m = /^Quạt (.+) ghi (\d+) V – (\d+) W$/.exec(o); assert.ok(m && +m[2] === 220, "lựa chọn ghi 220 V: " + o); return /^bàn /.test(m[1]) && +m[3] <= 60; });
    assert.deepEqual(ok, [true, false, false, false], "chỉ lựa chọn đúng là quạt bàn công suất nhỏ");
    return q.o[0]; } }
];

const KHO = {};
[T, C].forEach((s) => { KHO[s.pool] = bank(s.pool).questions; assert.equal(KHO[s.pool].length, 50, s.pool + ": kho 50 câu"); });
const kho = [...KHO[T.pool], ...KHO[C.pool]];
const checked = new Set();
let n = 0;
CHECKS.forEach((c) => {
  const hits = kho.filter((q) => (q.q || "").includes(c.has));
  assert.equal(hits.length, 1, "đoạn chữ phải ứng với đúng một câu: " + c.has);
  const q = hits[0];
  assert.equal(q.src, c.id, "câu ở đúng đề: " + c.has);
  const r = c.right(q), got = q.type === "num" ? q.ans : q.type === "tf4" ? q.a : q.type === "order" ? q.o : q.o[0];
  if (typeof r === "number") assert.ok(close(got, r), `đáp án ${got} khác kết quả tính ${r}: ${q.q.slice(0, 70)}`);
  else assert.deepEqual(got, r, `đáp án “${got}” khác kết quả tính “${r}”: ${q.q.slice(0, 70)}`);
  checked.add(q); n++;
});
kho.filter((q) => q.type === "num" || q.svg).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));
// câu tính điện năng nào cũng ghi sẵn cách tính (sách Công nghệ 6 không có công thức)
KHO[C.pool].filter((q) => /\bWh\b|kWh/.test(q.q)).forEach((q) => assert.ok(q.q.includes(DIEN), "câu tính điện năng cần ghi sẵn cách tính: " + q.q.slice(0, 50)));

/* ---------- mức độ và ma trận ---------- */
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean); // các chữ, giữ dấu
[T, C].forEach((s) => {
  const p = bank(s.pool), M = p.pool.matrix, cells = Object.values(M), K = KHO[s.pool], d1 = bank(s.de1).questions, d2 = bank(s.de2).questions;
  assert.ok(K.every((q) => [1, 2, 3].includes(q.lv)), s.pool + ": câu nào trong kho cũng cần lv");
  assert.ok(cells.every(Array.isArray), s.pool + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], s.pool + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  [d1, d2].forEach((d, i) => {
    assert.deepEqual([...new Set(d.map((q) => q.topic))], Object.keys(M), `${s.pool}: Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} của ${s.pool} đúng ma trận ở chủ đề ${t}`));
  });
  const tf4 = K.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 3 && !K.some((q) => q.type === "essay"), s.pool + ": ít nhất 3 câu đúng/sai 4 ý, không có câu tự luận");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
  assert.ok(Math.max(...Object.values(kieu)) <= Math.ceil(tf4.length / 3), s.pool + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp nhiều quá: " + JSON.stringify(kieu));
  K.filter((q) => q.type === "mc").forEach((q) => {
    // đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2), không phải lựa chọn duy nhất có chữ của nhãn chủ đề (Rút ra N6)
    const m = Math.max(...q.o.slice(1).map((o) => o.length));
    assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60));
    const c = chuThuong(q.topic), tu = c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/\b(trong|của|các|và|ở)\b/u.test(w)); // từ hai âm tiết của nhãn
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề: ${q.q.slice(0, 60)}`); });
    // ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có (Rút ra N22)
    const dau = q.o.map((o) => o.split(" ")[0]);
    assert.ok(!(dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && q.o.length === 4 && dau[1].length > 1 && !/^(Vì|Để|Khi|Cấu)$/.test(dau[1])), "ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”: " + q.q.slice(0, 50));
  });
  const seen = new Set();
  for (let k = 0; k < 300; k++) {
    const d = Quiz.draw(p);
    assert.equal(d.notes.length, 0, s.pool + ": rút thử có ghi chú: " + d.notes.join("; "));
    assert.equal(d.questions.length, 25);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `${s.pool}: rút đúng ma trận ở chủ đề ${t}`));
    d.questions.forEach((q) => seen.add(Quiz.key(q)));
  }
  assert.equal(seen.size, 50, s.pool + ": 300 lần rút thử phải gặp đủ 50 câu của kho");
  // học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên rút đúng 25 câu của đề kia
  [[s.de1, s.de2], [s.de2, s.de1]].forEach(([lam, con]) => {
    const hist = (q) => (q.src === lam ? { done: 1, wrong: 0 } : null); // lịch sử câu như PoolHist
    for (let k = 0; k < 30; k++) {
      const d = Quiz.draw(p, hist);
      assert.equal(d.notes.length, 0); assert.equal(d.questions.length, 25);
      assert.ok(d.questions.every((q) => q.src === con), `${s.pool}: đã làm hết ${lam} thì rút toàn câu của ${con}`);
    }
  });
});

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng; không gần trùng câu
   của các kho cũ cùng môn (Rút ra N25: so ý với kho đã có cùng bài): đề bài cùng các lựa chọn, ô nối, ô sắp xếp có từ một nửa số
   cặp hai âm tiết liền nhau (tính trên câu ít cặp hơn, bỏ các cặp có ở mọi câu như “nào dưới đây”) chung với một câu cũ thì báo ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const CHUNG = new Set(["nào dưới", "dưới đây", "đây là", "là một", "mỗi ý", "ý sau", "sau đúng", "đúng hay", "hay sai", "ở hình", "nào sau", "sau đây"]);
const cap2 = (s) => { const w = String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x); };
const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !CHUNG.has(c) && !nhan.has(c))); }; // bỏ cả cặp của nhãn chủ đề
["6-tin.js", "6-congnghe.js"].forEach((f) => {
  const deBai = BANKS.filter((b) => b.file === f).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q), c: capAm(q), q })));
  deBai.filter((d) => /-ck2-/.test(d.at)).forEach((d) => {
    const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", "));
    deBai.filter((e) => !/-ck2-/.test(e.at)).forEach((e) => {
      const chung = [...d.c].filter((x) => e.c.has(x)).length;
      assert.ok(chung / Math.min(d.c.size, e.c.size) < 0.5, `gần trùng câu của kho cũ ${e.at}: ${d.at} “${d.q.q.slice(0, 50)}”`);
    });
  });
});

/* ---------- dò lộ đáp án (Rút ra N5; bộ dò theo tests/lsdl-gdcd6-ck2.js) giữa hai câu rút được cùng lúc: khác ô (chủ đề, mức), hoặc
   cùng một ô rút từ 2 câu. Đáp án là số (từ hai chữ số, hoặc số thập phân) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”,
   “bằng”, “được”); cặp nối: câu kia có cả hai vế; ô sắp xếp: câu kia có cả hai ô liền nhau theo đúng thứ tự. Đáp án bằng chữ (lựa
   chọn đúng của câu trắc nghiệm) có ở câu kia thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const coCum = (t, s) => { for (let i = t.indexOf(s); i >= 0; i = t.indexOf(s, i + 1)) if (!/[\p{L}\p{N}]/u.test(t[i - 1] || " ") && !/[\p{L}\p{N}]/u.test(t[i + s.length] || " ")) return true; return false; };
const doLo = (qs, M, tenCau) => {
  const cungLuc = (p, q) => p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
  const lo = [], chuLo = [];
  qs.forEach((q, i) => {
    const so = q.type === "num" && (q.ans >= 10 || !Number.isInteger(q.ans)) ? [q.ans] : [];
    const cum = q.type === "mc" ? [q.o[0]] : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const lien = q.type === "order" ? q.o.slice(1).map((o, k) => [q.o[k], o]) : [];
    qs.forEach((p, j) => {
      if (j === i || !cungLuc(p, q)) return;
      const Cp = chu(p), Tp = Cp.map((s) => s.toLowerCase()), at = `${tenCau(p)} → ${tenCau(q)}: `;
      so.filter((x) => Cp.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => Tp.some((t) => coCum(t, l.toLowerCase()) && coCum(t, r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      lien.filter(([a, b]) => Tp.some((t) => { const x = t.indexOf(a.toLowerCase()), y = t.indexOf(b.toLowerCase()); return x >= 0 && y > x; })).forEach(([a, b]) => lo.push(at + a + " → " + b));
      cum.filter((s) => Tp.some((t) => coCum(t, s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const ten = new Map();
[T, C].forEach((s) => [s.de1, s.de2].forEach((id) => KHO[s.pool].filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace(/6-ck2-/, "-") + "#" + (i + 1)))));
const loAll = [], chuAll = [];
[T, C].forEach((s) => { const r = doLo(KHO[s.pool], bank(s.pool).pool.matrix, (q) => ten.get(q)); loAll.push(...r.lo); chuAll.push(...r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuAll.join("\n"));
// đã xem (Phiên N22b): “Cấu trúc lặp” (đáp án câu 12 Đề 1: sơ đồ bơm bóng) có ở đề bài câu 8 Đề 2 (hỏi câu nào có cấu trúc lặp)
// và ở cột trái câu nối 11 Đề 2 (tên ba cấu trúc): chỉ là tên cấu trúc, không cho biết sơ đồ bơm bóng là cấu trúc nào.
const DA_XEM = ["tin-de2#8 → tin-de1#12: Cấu trúc lặp", "tin-de2#11 → tin-de1#12: Cấu trúc lặp"];
assert.deepEqual(chuAll, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 23”, cả hai vế một cặp nối, hai ô sắp xếp liền nhau, lựa chọn đúng
const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
const thu = (qs) => { const M = new Proxy({}, { get: () => [1, 1, 1] }), r = doLo(qs, M, (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
const khac = tim("Tên nào dưới đây là tên một ngôn ngữ lập trình?");
assert.deepEqual(thu([tim("với đầu vào a = 9"), gia(khac, "Ví dụ: c = 23.")]), ["23"]);
assert.deepEqual(thu([tim("Nối mỗi cấu trúc điều khiển"), gia(khac, "Cấu trúc lặp: chạy quanh sân trường cho đến khi đủ 5 vòng.")]), ["Cấu trúc lặp → Chạy quanh sân trường cho đến khi đủ 5 vòng"]);
assert.deepEqual(thu([tim("Mẹ nhờ Lan nấu cơm"), gia(khac, "Lau khô mặt ngoài nồi nấu chứa gạo vừa vo, đặt khít vào thân nồi rồi đóng nắp, cắm phích điện, bật nút nấu.")]), ["Lau khô mặt ngoài nồi nấu chứa gạo vừa vo, đặt khít vào thân nồi → Đóng nắp, cắm phích điện, bật nút nấu"]);
assert.deepEqual(thu([tim("Cấu trúc rẽ nhánh còn được gọi là"), gia(khac, "Nó còn gọi là cấu trúc lựa chọn.")]), ["Cấu trúc lựa chọn"]);
console.log(n, "câu đã tính lại hoặc đọc lại hình (hai ngân hàng); kho " + kho.length + " câu, 2 ma trận 10 – 8 – 7.");
console.log("MATH OK");
