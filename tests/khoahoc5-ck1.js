// Kiểm tra ngân hàng Khoa học 5 cuối kì I của Phiên N5-ck1-khoahoc (data/banks/5-khoahoc.js, khoahoc5-ck1-*), theo mẫu tests/khoahoc4-ck2.js
// và các ý chung của các phiên lớp 5 (đoạn “Chung của các phiên lớp 5” ở mục 7 của docs/KE-HOACH-NOI-DUNG.md). Kho = Đề 1 + Đề 2 + câu riêng
// của đề ngẫu nhiên; số câu, số đề lấy từ danh mục (không ghi cứng).
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho):
// - mạch điện trong hình (pin có cực dương, cực âm; bóng đèn có hai cực trên đế; công tắc K có cần gạt; kẹp có thể kẹp một vật; dây dẫn là
//   đường gấp khúc, đầu dây nằm đúng ở một cực hoặc để hở): đèn sáng khi pin, bóng đèn, công tắc đóng và vật kẹp vào (vật dẫn điện) nối
//   thành một vòng kín qua bóng đèn, không nối tắt hai cực pin; câu chọn vật kẹp vào, câu chọn mạch có đèn sáng: chỉ một lựa chọn khớp;
//   câu sửa mạch: chuyển một đầu dây từ cực dương sang cực âm thì đèn sáng; câu số chỉ bộ phận: đường chỉ của mỗi số chạm đúng một bộ phận;
// - hoa cắt dọc (cánh hoa, đài hoa, cuống, nhị gồm chỉ nhị và bao phấn, nhuỵ gồm đầu nhuỵ, vòi nhuỵ, bầu nhuỵ có noãn): số nào chỉ bộ phận
//   nào; hai hoa của một cây: hoa chỉ có nhị là hoa đực, chỉ có nhuỵ là hoa cái;
// - vòng đời trong hình (ô có chữ, mũi tên từ giai đoạn trước đến giai đoạn sau) và câu sắp xếp: thứ tự giai đoạn theo bảng VONG_DOI;
// - hỗn hợp hay dung dịch (bảng HON_HOP), có chất mới (biến đổi hoá học) hay không (bảng BIEN_DOI), vật dẫn điện hay cách điện theo vật liệu
//   (bảng VAT_LIEU, theo các vật liệu sách nêu), trạng thái của chất (TRANG_THAI), đẻ trứng hay đẻ con (DE), nguồn năng lượng (NGUON), nơi lấy
//   chất đốt (CHAT_DOT), cây trồng bằng bộ phận nào (CAY), hoa đơn tính hay lưỡng tính (HOA), các phép tính (mi-li-lít, ngày).
// Rồi kiểm tra mức độ, ma trận (10 Biết, 8 Hiểu, 7 Vận dụng; hai đề cố định và câu riêng đều chia đúng ma trận, mỗi ô 3 câu), dạng câu (ít
// nhất 2 câu đúng/sai 4 ý, kiểu Đ/S không lặp), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá
// một phần ba và không dưới một phần sáu số câu nhiều lựa chọn, không lặp chữ của nhãn chủ đề, lời giải không nhắc vị trí phương án, note
// nói về đề chung của Sở và đề cương của trường, chữ trong hình từ cỡ 13 và nằm trong khung hình, đề bài không trùng, rút thử (đúng ma trận,
// gặp đủ kho; đã làm hết một đề cố định thì không rút lại câu của đề đó), dò lộ đáp án giữa mọi cặp câu của kho và lời dặn (đề “Ôn chủ đề”
// rút chung mọi câu của một chủ đề; đề ngẫu nhiên rút chung câu của các chủ đề khác; cách dò ở chú thích của doLo), đề bài không gần trùng
// câu của data/banks/4-khoahoc.js (cặp hai âm tiết liền nhau chung). Có ../OnUp-Book (repo riêng tư): mọi trường chữ, cả chữ trong hình,
// không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm; DO_SACH=1 in chuỗi 6 từ). So thêm với mọi câu của các
// kho khác, cả câu riêng của các đề ngẫu nhiên: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 6 từ và câu gần trùng kho lớp 4.
// Chạy: node tests/khoahoc5-ck1.js → in KHOAHOC5 OK. DO_LO=1 in đáp án bằng chữ có ở câu khác để người làm xem.
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
const S = { de1: "khoahoc5-ck1-de1", de2: "khoahoc5-ck1-de2", pool: "khoahoc5-ck1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);
const close = (x, y) => Math.abs(x - y) < 1e-9;
const low = (s) => String(s).normalize("NFC").toLowerCase();

/* ---------- danh mục ---------- */
const pool = bank(S.pool);
assert.ok(pool && pool.pool, "thiếu đề ngẫu nhiên " + S.pool);
const DE = pool.pool.from;
assert.deepEqual(DE, [S.de1, S.de2], "from là Đề 1 và Đề 2");
DE.concat(S.pool).forEach((id) => {
  const b = bank(id);
  assert.ok(b.grade === 5 && b.subject === "Khoa học" && b.minutes === 35 && b.file === "5-khoahoc.js", id + ": lớp 5, Khoa học, 35 phút, file 5-khoahoc.js");
  if (id !== S.pool) assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
});
const kho = pool.questions, mine = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, sum(DE.map((id) => bank(id).n)) + mine.length, "kho = câu của hai đề cố định + câu riêng");
assert.equal(mine.length, pool.n, "câu riêng của đề ngẫu nhiên: đủ một đề");
{
  const cal = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ck1 = /id: "ck1-l5"[\s\S]*?banks: \[([^\]]*)\]/.exec(cal);
  assert.ok(ck1, "lịch có kì ck1-l5");
  DE.concat(S.pool).forEach((id) => assert.ok(ck1[1].includes(`"${id}"`), id + " gắn vào ck1-l5"));
}
const ten = new Map();
DE.concat(S.pool).forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("khoahoc5-ck1-", "").replace("ngau-nhien", "own") + "#" + (i + 1))));

/* ---------- hình SVG ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const pts2 = (s) => { const v = nums(s), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]]); return p; };
const TAGS = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const RECTS = (svg) => TAGS(svg, "rect").map((a) => ({ x: +a.x, y: +a.y, w: +a.width, h: +a.height, fill: a.fill || "none", stroke: a.stroke || "none" }));
const CIRCLES = (svg) => TAGS(svg, "circle").map((a) => ({ c: [+a.cx, +a.cy], r: +a.r, fill: a.fill || "none" }));
const ELLIPSES = (svg) => TAGS(svg, "ellipse").map((a) => ({ c: [+a.cx, +a.cy], rx: +a.rx, ry: +a.ry, fill: a.fill || "none" }));
const LINES = (svg) => TAGS(svg, "line").map((a) => ({ a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], w: +(a["stroke-width"] || 1), stroke: a.stroke || "none" }));
const POLYLINES = (svg) => TAGS(svg, "polyline").map((a) => ({ p: pts2(a.points), stroke: a.stroke || "none" }));
const POLYS = (svg) => TAGS(svg, "polygon").map((a) => ({ p: pts2(a.points), fill: a.fill || "none" }));
const TEXTS = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start", b: a["font-weight"] === "700" }; });
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const cung = (p, q) => dist(p, q) < 0.5;
const trongHop = (p, r, pad = 0) => p[0] >= r.x - pad && p[0] <= r.x + r.w + pad && p[1] >= r.y - pad && p[1] <= r.y + r.h + pad;
const trongElip = (p, e, k = 1) => ((p[0] - e.c[0]) / e.rx) ** 2 + ((p[1] - e.c[1]) / e.ry) ** 2 <= k;
const segDist = (p, a, b) => { const ab = [b[0] - a[0], b[1] - a[1]], t = Math.max(0, Math.min(1, ((p[0] - a[0]) * ab[0] + (p[1] - a[1]) * ab[1]) / (ab[0] ** 2 + ab[1] ** 2))); return dist(p, [a[0] + t * ab[0], a[1] + t * ab[1]]); };
const trongDaGiac = (p, g) => { let c = false; for (let i = 0, j = g.length - 1; i < g.length; j = i++) { const [xi, yi] = g[i], [xj, yj] = g[j]; if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c; } return c; };
const rong = (t) => (t.b ? 0.62 : 0.56) * t.fs * [...t.t].length; // ước bề rộng chữ (Noto Sans)
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
// số chỉ bộ phận: vòng tròn r = 11 có một chữ số ở giữa; đường chỉ (line nét mảnh) có một đầu chạm vòng tròn, đầu kia là điểm chỉ vào bộ phận
const soChi = (svg) => {
  const C = CIRCLES(svg).filter((c) => c.r === 11), T = TEXTS(svg), L = LINES(svg).filter((l) => l.w < 2 && l.stroke === "ink"), o = {};
  C.forEach((c) => {
    const s = T.filter((t) => /^\d$/.test(t.t) && dist(t.at, c.c) < 8);
    assert.equal(s.length, 1, "mỗi vòng số có đúng một chữ số");
    const d = L.filter((l) => Math.abs(dist(l.b, c.c) - c.r) < 1 || Math.abs(dist(l.a, c.c) - c.r) < 1);
    assert.equal(d.length, 1, `số ${s[0].t} có đúng một đường chỉ`);
    o[s[0].t] = Math.abs(dist(d[0].b, c.c) - c.r) < 1 ? d[0].a : d[0].b;
  });
  return o;
};

/* Mạch điện. Một hình có thể có nhiều mạch, mỗi mạch trong một khung (rect fill none, stroke line) có chữ A, B, C, D; không có khung thì cả
   hình là một mạch. Cực (chỗ nối dây) là chấm tròn r = 4. Pin: rect có chữ “Pin”, hai cực ở hai đầu, cực gần chữ “+” là cực dương, gần
   chữ “−” là cực âm. Bóng đèn: vòng tròn tô bg (không có chữ số), hai cực trên đế ngay dưới. Công tắc: đế (rect tô surface) ngay trên chữ
   “K”, hai cực trên đế, cần gạt là line nét 3 đi từ một cực; đóng khi đầu kia của cần gạt nằm đúng ở cực còn lại. Kẹp: đế ngay trên một
   chữ khác (tên vật được kẹp, hoặc “?” khi để trống), vật kẹp là rect tô line nằm giữa hai cực của kẹp. Dây dẫn: polyline stroke acc, mỗi
   đầu dây nằm đúng ở một cực hoặc để hở (không nối vào đâu). Trả về mỗi mạch: { ten, sang, ly do… } và hàm thử sáng với vật kẹp khác. */
const VAT_LIEU = { "sắt": true, "thép": true, "đồng": true, "thiếc": true, "bạc": true, "vàng": true, "sứ": false, "nhựa": false, "gỗ": false, "cao su": false, "thuỷ tinh": false, "kính": false, "len": false, "chỉ khâu": false };
const dan = (vat) => { // vật làm bằng gì: đúng một vật liệu của bảng có trong tên vật
  const k = Object.keys(VAT_LIEU).filter((m) => new RegExp(`(^|[^\\p{L}])${m}($|[^\\p{L}])`, "u").test(low(vat)));
  assert.equal(k.length, 1, `“${vat}”: cần đúng một vật liệu trong bảng VAT_LIEU, có ${k.join(", ") || "không"}`);
  return VAT_LIEU[k[0]];
};
const docMach = (svg) => {
  daDoc.add(svg);
  const K = RECTS(svg).filter((r) => r.fill === "none" && r.stroke === "line"), T = TEXTS(svg);
  const khung = K.length ? K.map((r) => ({ r, ten: T.filter((t) => /^[A-D]$/.test(t.t) && trongHop(t.at, r)).map((t) => t.t)[0] })) : [{ r: { x: -1e9, y: -1e9, w: 2e9, h: 2e9 }, ten: "" }];
  khung.forEach((k) => assert.ok(k.ten !== undefined, "mỗi khung mạch có một chữ A, B, C, D"));
  return khung.map(({ r: kh, ten }) => {
    const o = (p) => trongHop(p, kh);
    const cuc = CIRCLES(svg).filter((c) => c.r === 4 && o(c.c)).map((c) => c.c), tx = T.filter((t) => o(t.at));
    const rects = RECTS(svg).filter((r) => o([r.x + r.w / 2, r.y + r.h / 2]) && r.fill !== "none");
    const cucTrong = (r) => cuc.filter((c) => trongHop(c, r, 1));
    // pin
    const chuPin = tx.filter((t) => t.t === "Pin"); assert.equal(chuPin.length, 1, "mỗi mạch một pin");
    const pin = rects.find((r) => r.fill === "sun-soft" && trongHop(chuPin[0].at, r)); assert.ok(pin, "chữ Pin nằm trong thân pin");
    const cucPin = cuc.filter((c) => c[1] > pin.y && c[1] < pin.y + pin.h && (Math.abs(c[0] - pin.x) < 16 || Math.abs(c[0] - pin.x - pin.w) < 18));
    assert.equal(cucPin.length, 2, "pin có hai cực ở hai đầu");
    const dau = (s) => { const t = tx.filter((x) => x.t === s); assert.equal(t.length, 1, "mạch có một dấu " + s); return cucPin.slice().sort((a, b) => dist(a, t[0].at) - dist(b, t[0].at))[0]; };
    const duong = dau("+"), am = dau("−"); assert.ok(!cung(duong, am), "dấu + và − ở hai cực khác nhau");
    // bóng đèn
    const den = CIRCLES(svg).filter((c) => o(c.c) && c.fill === "bg" && c.r >= 10 && c.r <= 20 && !T.some((t) => /^\d$/.test(t.t) && dist(t.at, c.c) < 8));
    assert.equal(den.length, 1, "mỗi mạch một bóng đèn");
    const cucDen = cuc.filter((c) => c[1] > den[0].c[1] && dist(c, den[0].c) < 50 && !cucPin.includes(c)).sort((a, b) => a[0] - b[0]);
    assert.equal(cucDen.length, 2, "bóng đèn có hai cực trên đế");
    // đế có chữ ở dưới: công tắc K hoặc kẹp
    const de = (t) => { const r = rects.filter((r) => r.fill === "surface" && t.at[0] > r.x && t.at[0] < r.x + r.w && t.at[1] > r.y + r.h && t.at[1] - r.y - r.h < 26); assert.equal(r.length, 1, `chữ “${t.t}” nằm ngay dưới một đế`); const c = cucTrong(r[0]); assert.equal(c.length, 2, `đế của “${t.t}” có hai cực`); return { r: r[0], c }; };
    const chuK = tx.filter((t) => t.t === "K"); assert.equal(chuK.length, 1, "mỗi mạch một công tắc K");
    const k = de(chuK[0]), can = LINES(svg).filter((l) => l.w === 3 && k.c.some((c) => cung(c, l.a)));
    assert.equal(can.length, 1, "công tắc có một cần gạt đi từ một cực");
    const dong = k.c.some((c) => !cung(c, can[0].a) && cung(c, can[0].b));
    if (!dong) assert.ok(can[0].b[1] < k.r.y - 8, "công tắc mở: cần gạt nhấc hẳn lên khỏi đế");
    const chuKep = tx.filter((t) => !["Pin", "K", "+", "−"].includes(t.t) && !/^[A-D\d]$/.test(t.t));
    assert.ok(chuKep.length <= 1, "mạch có nhiều nhất một kẹp");
    let kep = null;
    if (chuKep.length) {
      const d = de(chuKep[0]), vat = rects.filter((r) => r.fill === "line" && trongHop([r.x + r.w / 2, r.y + r.h / 2], d.r));
      kep = { ten: chuKep[0].t, c: d.c, coVat: vat.length === 1 };
      assert.equal(kep.coVat, kep.ten !== "?", "kẹp ghi “?” thì để trống, ghi tên vật thì có vật nằm giữa hai cực");
      if (kep.coVat) assert.ok(vat[0].x > Math.min(...d.c.map((c) => c[0])) - 1 && vat[0].x + vat[0].w < Math.max(...d.c.map((c) => c[0])) + 1, "vật kẹp nằm giữa hai cực của kẹp");
    }
    // dây dẫn
    const day = POLYLINES(svg).filter((p) => p.stroke === "acc" && o(p.p[0])).map((p) => p.p);
    day.forEach((p) => p.slice(1, -1).forEach((v) => assert.ok(!cuc.some((c) => dist(c, v) < 6), "dây chỉ chạm cực ở hai đầu dây")));
    const noi = (p) => cuc.find((c) => cung(c, p)) || null;
    const thu = (vat, dayKhac) => { // vat: tên vật kẹp (null: để trống); dayKhac: các dây thay cho dây trong hình
      const id = (c) => cuc.indexOf(c), cha = cuc.map((c, i) => i), goc = (i) => (cha[i] === i ? i : (cha[i] = goc(cha[i])));
      const hop = (a, b) => { if (a && b) cha[goc(id(a))] = goc(id(b)); };
      (dayKhac || day).forEach((p) => hop(noi(p[0]), noi(p[p.length - 1])));
      if (dong) hop(k.c[0], k.c[1]);
      if (kep && vat && dan(vat)) hop(kep.c[0], kep.c[1]);
      const g = (c) => goc(id(c));
      assert.ok(g(duong) !== g(am), "hai cực của pin bị nối tắt");
      const a = g(cucDen[0]), b = g(cucDen[1]);
      return (a === g(duong) && b === g(am)) || (a === g(am) && b === g(duong));
    };
    const hoDay = day.filter((p) => !noi(p[0]) || !noi(p[p.length - 1])).length;
    return { ten, sang: thu(kep && kep.coVat ? kep.ten : null), dong, kep, hoDay, thu, day, duong, am, noi,
      boPhan: (p) => (trongHop(p, pin) ? "Pin" : dist(p, den[0].c) <= den[0].r ? "Bóng đèn" : trongHop(p, k.r) ? "Công tắc" : day.some((d) => d.slice(1).some((v, i) => segDist(p, d[i], v) < 2)) ? "Dây dẫn điện" : null) };
  });
};

/* Hoa cắt dọc: cánh hoa là ellipse tô bad-soft (hoặc sun-soft), đài hoa là polygon tô ok, cuống là rect tô ok, nhị gồm chỉ nhị (line stroke
   ok) và bao phấn (ellipse tô sun) ở đầu chỉ nhị, nhuỵ gồm đầu nhuỵ (ellipse tô ok-soft nhỏ ở trên cùng), vòi nhuỵ (rect tô ok-soft) và bầu
   nhuỵ (ellipse tô ok-soft to nhất) có noãn (chấm tròn tô bg) bên trong. Điểm chỉ của mỗi số được xếp vào bộ phận nằm trên cùng chứa nó. */
const docHoa = (svg) => {
  daDoc.add(svg);
  const E = ELLIPSES(svg), xanh = E.filter((e) => e.fill === "ok-soft").sort((a, b) => a.ry - b.ry), bao = E.filter((e) => e.fill === "sun"), canh = E.filter((e) => ["bad-soft", "sun-soft"].includes(e.fill));
  const chi = LINES(svg).filter((l) => l.stroke === "ok"), voi = RECTS(svg).filter((r) => r.fill === "ok-soft"), cuong = RECTS(svg).filter((r) => r.fill === "ok"), dai = POLYS(svg).filter((g) => g.fill === "ok");
  const noan = CIRCLES(svg).filter((c) => c.fill === "bg" && c.r <= 6);
  assert.ok(xanh.length === 2 && voi.length === 1 && noan.length === 1, "nhuỵ có đầu nhuỵ, vòi nhuỵ, bầu nhuỵ có noãn");
  const [dauN, bau] = xanh;
  assert.ok(dauN.c[1] < voi[0].y + 2 && bau.c[1] - bau.ry < voi[0].y + voi[0].h && trongElip(noan[0].c, bau), "đầu nhuỵ ở trên vòi nhuỵ, vòi nhuỵ nối vào bầu nhuỵ, noãn nằm trong bầu nhuỵ");
  assert.ok(bao.length >= 2 && bao.length === chi.length, "mỗi chỉ nhị mang một bao phấn");
  bao.forEach((e) => assert.ok(chi.some((l) => trongElip(l.b, e, 1.6)), "bao phấn nằm ở đầu một chỉ nhị"));
  const la = (p) => {
    if (bao.some((e) => trongElip(p, e))) return ["Nhị", "Bao phấn"];
    if (chi.some((l) => segDist(p, l.a, l.b) < 2)) return ["Nhị", "Chỉ nhị"];
    if (trongElip(p, dauN)) return ["Nhuỵ", "Đầu nhuỵ"];
    if (dist(p, noan[0].c) <= noan[0].r) return ["Nhuỵ", "Noãn"];
    if (trongHop(p, voi[0])) return ["Nhuỵ", "Vòi nhuỵ"];
    if (trongElip(p, bau)) return ["Nhuỵ", "Bầu nhuỵ"];
    if (dai.some((g) => trongDaGiac(p, g.p))) return ["Đài hoa", "Đài hoa"];
    if (canh.some((e) => trongElip(p, e))) return ["Cánh hoa", "Cánh hoa"];
    if (cuong.some((r) => trongHop(p, r))) return ["Cuống hoa", "Cuống hoa"];
    return null;
  };
  const o = {};
  Object.entries(soChi(svg)).forEach(([n, p]) => { const b = la(p); assert.ok(b, `số ${n} không chỉ vào bộ phận nào`); o[n] = b; });
  assert.equal(new Set(Object.values(o).map((b) => b[1])).size, Object.keys(o).length, "mỗi số chỉ một bộ phận khác nhau");
  return o;
};
// hai hoa của một cây: chữ “Hoa A”, “Hoa B” dưới mỗi hoa; bộ phận thuộc hoa có chữ gần nó nhất theo chiều ngang
const docHaiHoa = (svg) => {
  daDoc.add(svg);
  const T = TEXTS(svg).filter((t) => /^Hoa [AB]$/.test(t.t)); assert.equal(T.length, 2, "hình có chữ Hoa A, Hoa B");
  const cua = (x) => T.slice().sort((a, b) => Math.abs(a.at[0] - x) - Math.abs(b.at[0] - x))[0].t.slice(-1);
  const o = {};
  T.forEach((t) => {
    const h = t.t.slice(-1), E = ELLIPSES(svg).filter((e) => cua(e.c[0]) === h), nhi = E.filter((e) => e.fill === "sun").length;
    const nhuy = E.filter((e) => e.fill === "ok-soft").length + RECTS(svg).filter((r) => r.fill === "ok-soft" && cua(r.x + r.w / 2) === h).length;
    assert.ok(E.filter((e) => e.fill === "sun-soft").length >= 2, "mỗi hoa có cánh hoa");
    o[h] = nhi && nhuy ? "lưỡng tính" : nhi ? "đực" : nhuy ? "cái" : null;
    assert.ok(o[h], "hoa " + h + " có nhị hoặc nhuỵ");
  });
  return o;
};
/* Vòng đời: mỗi giai đoạn là một ô (rect có chữ ở giữa); mũi tên là line (gốc sát ô của giai đoạn trước) và polygon tam giác (đỉnh đầu là
   mũi nhọn, sát ô của giai đoạn sau). Trả về các giai đoạn theo chiều mũi tên, bắt đầu từ ô “Trứng”, đi hết một vòng. */
const docVongDoi = (svg) => {
  daDoc.add(svg);
  const o = RECTS(svg).map((r) => { const c = TEXTS(svg).filter((t) => trongHop([t.at[0], t.at[1] - 5], r)); assert.equal(c.length, 1, "mỗi ô một tên giai đoạn"); return Object.assign(r, { ten: c[0].t }); });
  const sat = (p) => { const g = o.filter((r) => trongHop(p, r, 6)); assert.equal(g.length, 1, `điểm (${p}) phải sát đúng một ô`); return g[0].ten; };
  const L = LINES(svg), P = POLYS(svg).map((g) => g.p);
  assert.equal(L.length, P.length, "mỗi mũi tên một đầu nhọn");
  const sau = {};
  L.forEach((l) => {
    const d = P.find((p) => dist([(p[1][0] + p[2][0]) / 2, (p[1][1] + p[2][1]) / 2], l.b) < 1); assert.ok(d, "đầu nhọn nằm ở cuối mũi tên");
    const a = sat(l.a), b = sat(d[0]); assert.ok(!(a in sau), "mỗi ô chỉ có một mũi tên đi ra"); sau[a] = b;
  });
  const vong = ["Trứng"];
  while (vong.length < o.length) { const t = sau[vong[vong.length - 1]]; assert.ok(t && !vong.includes(t), "mũi tên đi qua mọi ô một lần"); vong.push(t); }
  assert.equal(sau[vong[vong.length - 1]], "Trứng", "giai đoạn cuối quay về trứng");
  return vong;
};

/* ---------- bảng tra (theo sách Khoa học 5 và lời giải của câu) ---------- */
// hỗn hợp: "dd" là dung dịch (chất hoà tan, phân bố đều), "hh" là hỗn hợp nhưng không phải dung dịch
const HON_HOP = { "mật ong": "dd", "si-rô": "dd", "muối": "dd", "sỏi": "hh", "thóc": "hh", "dầu ăn": "hh", "ớt băm": "hh" };
const honHop = (s) => { const k = Object.keys(HON_HOP).filter((m) => low(s).includes(m)); assert.equal(k.length, 1, `“${s}”: cần đúng một chất trong bảng HON_HOP`); return HON_HOP[k[0]]; };
// có chất mới được tạo thành (biến đổi hoá học) hay không
const BIEN_DOI = { "táo": true, "que diêm": true, "thiu": true, "khét": true, "nước đá": false, "xé": false, "bơ": false, "kem": false, "nghiền": false };
const bienDoi = (s) => { const k = Object.keys(BIEN_DOI).filter((m) => low(s).includes(m)); assert.equal(k.length, 1, `“${s}”: cần đúng một trường hợp trong bảng BIEN_DOI`); return BIEN_DOI[k[0]]; };
const TRANG_THAI = { "nước rửa bát": "lỏng", "khí các-bô-níc": "khí", "muối hạt": "rắn", "bi ve": "rắn", "cục tẩy": "rắn", "viên phấn": "rắn", "đũa tre": "rắn",
  "nước mắm": "lỏng", "dầu ăn": "lỏng", "sữa đậu nành": "lỏng", "nước đá": "rắn", "nước lọc": "lỏng", "hơi nước": "khí", "cát": "rắn", "nước mưa": "lỏng", "khí trong bóng bay": "khí" };
const DE_CON = { "thỏ": "con", "vịt": "trứng", "rùa": "trứng", "cá chép": "trứng", "cá heo": "con", "trâu": "con", "chim bồ câu": "trứng" };
const THU_TINH_TRONG = { "chim bồ câu": true }; // thụ tinh bên trong cơ thể con cái
const NGUON = { "đèn bàn học": "Năng lượng điện", "bếp ga": "Năng lượng chất đốt", "cây lúa": "Năng lượng mặt trời", "phơi sắn": "Năng lượng mặt trời", "cánh buồm": "Năng lượng gió", "guồng": "Năng lượng nước chảy" };
const CHAT_DOT = { "Than đá": "mỏ", "Dầu mỏ": "giếng khoan", "Củi": "cành cây" };
// máy chạy bằng chất đốt: chạy nhờ năng lượng của chất đốt khi cháy, thải ra khói, phải đổ thêm chất đốt khi đã cháy hết
const MAY_CHAT_DOT = { "nhờ năng lượng của dầu khi cháy": true, "nhanh hơn, người cày đỡ vất vả": true, "không hề thải ra khói": false, "không cần đổ thêm dầu": false };
const CAY = { "thanh long": "thân", "ngô": "hạt", "hướng dương": "hạt", "đậu xanh": "hạt" };
const HOA = { "cam": "lưỡng tính", "đậu": "lưỡng tính", "bầu": "đơn tính", "mướp": "đơn tính" };
const VONG_DOI = { "tằm": ["Trứng", "Tằm (ấu trùng)", "Nhộng", "Ngài tằm"], "mèo": ["thai", "sinh ra", "tự kiếm ăn", "trưởng thành"] };
const tra = (bang, s) => { const k = Object.keys(bang).filter((m) => low(s).includes(low(m))); assert.equal(k.length, 1, `“${s}”: cần đúng một mục trong bảng`); return bang[k[0]]; };
const motDung = (q, f) => { const d = q.o.map(f); assert.deepEqual(d.map(Boolean), q.o.map((o, i) => i === 0), "chỉ lựa chọn đầu khớp: " + q.q.slice(0, 50)); return q.o[0]; };

// ý của câu đúng/sai 4 ý tính lại bằng bảng tra
const yDungSai = (o) => {
  let m;
  if (/^Con đực tạo ra trứng/.test(o)) return false; // con đực tạo ra tinh trùng, con cái tạo ra trứng
  if ((m = /^(.+?) con nở ra từ trứng\.$/.exec(o))) return tra(DE_CON, m[1]) === "trứng";
  if ((m = /^(.+?) đẻ trứng giống như (.+?)\.$/.exec(o))) { assert.equal(tra(DE_CON, m[2]), "trứng"); return tra(DE_CON, m[1]) === "trứng"; }
  if ((m = /^Ở (.+?), sự thụ tinh xảy ra bên trong cơ thể con cái\.$/.exec(o))) return !!THU_TINH_TRONG[m[1]];
  if ((m = /^(.+): có chất mới được tạo thành\.$/.exec(o))) return bienDoi(m[1]);
  if ((m = /^(.+) cho dòng điện chạy qua\.$/.exec(o))) return dan(m[1]);
  assert.fail("không đọc được ý: " + o);
};

/* ---------- kiểm tra từng câu: has (chữ có trong đề bài), right(q) (đáp án tính bằng code) ---------- */
const CHECKS = [
  // hỗn hợp và dung dịch
  { has: "tạo thành dung dịch?", right: (q) => motDung(q, (o) => honHop(o) === "dd") },
  { has: "bát nước chấm", right: (q) => { assert.equal(honHop(q.q), "hh"); return q.o.find((o) => /^Là hỗn hợp nhưng không phải/.test(o)); } },
  { has: "rót si-rô dâu", right: (q) => honHop(q.q) === "dd" },
  { has: "vừa ngọt vừa mặn", right: (q) => q.o.find((o) => /giữ vị riêng/.test(o)) },
  { has: "ngâm rau", right: (q) => { assert.equal(honHop("muối"), "dd", "muối hoà tan, phân bố đều"); return q.o.find((o) => /như nhau/.test(o)); } },
  { has: "Khi đun nóng nước muối", right: () => "bay hơi" },
  // trạng thái của chất
  { has: "ở trạng thái lỏng?", right: (q) => motDung(q, (o) => tra(TRANG_THAI, o) === "lỏng") },
  { has: "gồm toàn chất ở trạng thái rắn?", right: (q) => motDung(q, (o) => o.split(", ").every((c) => tra(TRANG_THAI, c) === "rắn")) },
  { has: "bình chia vạch", right: (q) => { const a = +/có (\d+) ml nước/.exec(q.q)[1], b = +/vạch (\d+) ml/.exec(q.q)[1]; assert.ok(q.x.includes(`${b} − ${a} = ${b - a}`)); return b - a; } },
  // biến đổi hoá học
  { has: "Trường hợp nào dưới đây có sự biến đổi hoá học?", right: (q) => motDung(q, bienDoi) },
  { has: "cháy đen, có mùi khét", right: (q) => { assert.ok(bienDoi(q.q)); return q.o.find((o) => /chất mới/.test(o)); } },
  // năng lượng
  { has: "Nối mỗi đồ dùng, việc làm với nguồn năng lượng", right: (q) => q.l.map((l) => tra(NGUON, l)) },
  { has: "Nối mỗi việc với nguồn năng lượng", right: (q) => q.l.map((l) => tra(NGUON, l)) },
  { has: "Nối mỗi chất đốt với nơi", right: (q) => q.l.map((l) => { const k = CHAT_DOT[l]; assert.ok(k, l); const r = q.r.filter((x) => low(x).includes(k)); assert.equal(r.length, 1, l); return r[0]; }) },
  { has: "máy cày chạy bằng dầu", right: (q) => q.o.map((o) => tra(MAY_CHAT_DOT, o)) },
  { has: "bếp củi cải tiến", right: (q) => { const a = +/đốt hết (\d+) kg củi/.exec(q.q)[1], b = +/chỉ cần (\d+) kg củi/.exec(q.q)[1], d = +/Sau (\d+) ngày/.exec(q.q)[1]; assert.ok(q.x.includes(`${a} − ${b} = ${a - b}`) && q.x.includes(`${a - b} × ${d} = ${(a - b) * d}`)); return (a - b) * d; } },
  // mạch điện, vật dẫn điện và vật cách điện
  { has: "Vật nào dưới đây là vật dẫn điện?", right: (q) => motDung(q, dan) },
  { has: "Thảo nên dùng thứ gì để nối pin", right: (q) => motDung(q, dan) },
  { has: "Bộ phận được đánh số 3 là:", right: (q) => { const m = docMach(q.svg); assert.equal(m.length, 1); assert.ok(m[0].sang, "mạch đánh số là mạch kín"); const s = soChi(q.svg); const b = Object.fromEntries(Object.entries(s).map(([n, p]) => [n, m[0].boPhan(p)])); assert.deepEqual(Object.values(b).slice().sort(), q.o.slice().sort(), "bốn số chỉ bốn bộ phận là bốn lựa chọn"); assert.ok(q.x.includes("số 3 là " + b[3].toLowerCase())); return b[3]; } },
  { has: "giữa hai kẹp có kẹp một chiếc đũa gỗ", right: (q) => { const [m] = docMach(q.svg); assert.ok(m.dong && m.kep && m.kep.coVat && !m.sang && !m.hoDay, "công tắc đóng, dây nối đủ, đèn không sáng"); assert.ok(m.thu("Đinh sắt"), "thay đũa bằng vật dẫn điện thì đèn sáng: lí do là chiếc đũa"); return q.o.find((o) => low(o).includes(low(m.kep.ten))); } },
  { has: "còn để trống giữa hai kẹp", right: (q) => { const [m] = docMach(q.svg); assert.ok(m.dong && m.kep && !m.kep.coVat && !m.sang && !m.hoDay); return motDung(q, (o) => m.thu(o)); } },
  { has: "Ở mạch điện nào dưới đây, bóng đèn sáng?", right: (q) => {
    const M = docMach(q.svg); assert.equal(M.length, 4, "bốn mạch A, B, C, D");
    const s = M.filter((m) => m.sang); assert.equal(s.length, 1, "đúng một mạch có đèn sáng");
    M.filter((m) => !m.sang).forEach((m) => assert.ok(!m.dong || m.hoDay, `mạch ${m.ten} không sáng vì công tắc mở hoặc có dây để hở`));
    return motDung(q, (o) => o === "Mạch " + s[0].ten); } },
  { has: "Duy cần sửa thế nào để đèn sáng?", right: (q) => {
    const [m] = docMach(q.svg); assert.ok(m.dong && !m.sang && !m.hoDay && !m.kep, "công tắc đóng, dây nối đủ mà đèn không sáng");
    assert.ok(!m.day.some((p) => [p[0], p[p.length - 1]].some((e) => cung(e, m.am))), "cực âm bỏ trống");
    const sua = m.day.map((p, i) => { if (!cung(p[p.length - 1], m.duong)) return false; const d = m.day.slice(); d[i] = p.slice(0, -1).concat([m.am]); return m.thu(null, d); });
    assert.ok(sua.some(Boolean), "chuyển một đầu dây ở cực dương sang cực âm thì đèn sáng");
    return q.o.find((o) => /từ cực dương sang cực âm/.test(o)); } },
  // sinh sản của thực vật có hoa
  { has: "Bộ phận được đánh số 2 là:", right: (q) => { const h = docHoa(q.svg); assert.deepEqual(Object.values(h).map((b) => b[0]).sort(), q.o.slice().sort(), "bốn số chỉ bốn bộ phận là bốn lựa chọn"); return h[2][0]; } },
  { has: "bộ phận nào sẽ phát triển thành quả?", right: (q) => { const h = docHoa(q.svg), n = Object.keys(h).filter((k) => h[k][1] === "Bầu nhuỵ"); assert.equal(n.length, 1, "một số chỉ bầu nhuỵ"); assert.deepEqual(q.o.slice().sort(), Object.keys(h).map((k) => "Bộ phận số " + k).sort()); return "Bộ phận số " + n[0]; } },
  { has: "lấy từ cùng một cây bầu", right: (q) => { const h = docHaiHoa(q.svg); assert.equal(HOA["bầu"], "đơn tính"); assert.deepEqual(h, { A: "đực", B: "cái" }); return q.o.find((o) => o === "Hoa A là hoa đực, hoa B là hoa cái"); } },
  { has: "Hoa lưỡng tính là hoa:", right: (q) => { [...q.x.matchAll(/hoa (cam|đậu|bầu|mướp)/g)].forEach((m) => assert.equal(HOA[m[1]], "lưỡng tính", "ví dụ trong lời giải là hoa lưỡng tính")); return q.o.find((o) => /cả nhị lẫn nhuỵ/.test(o)); } },
  // sự phát triển của cây con
  { has: "cắm đoạn thân (cành) xuống đất?", right: (q) => motDung(q, (o) => tra(CAY, o) === "thân") },
  { has: "Cây con chỉ có thể mọc lên từ hạt.", right: () => false },
  // sinh sản của động vật
  { has: "Con vật nào dưới đây đẻ con?", right: (q) => motDung(q, (o) => tra(DE_CON, o) === "con") },
  { has: "khi trứng được thụ tinh", right: () => "hợp tử" },
  { has: "Mỗi ý sau về sự sinh sản của động vật đúng hay sai?", right: (q) => q.o.map(yDungSai) },
  { has: "Mỗi ý sau về sự biến đổi của chất đúng hay sai?", right: (q) => q.o.map(yDungSai) },
  { has: "Mỗi ý sau về các vật dụng đúng hay sai?", right: (q) => q.o.map(yDungSai) },
  { has: "Vịt con mới nở", right: (q) => { assert.equal(DE_CON["vịt"], "trứng"); return q.o.find((o) => /gần giống/.test(o)); } },
  // vòng đời của động vật
  { has: "vòng đời của con tằm", right: (q) => { const v = docVongDoi(q.svg), b = VONG_DOI["tằm"]; v.forEach((s, i) => s !== "?" && assert.equal(s, b[i], "giai đoạn trong hình đúng thứ tự")); const d = b[v.indexOf("?")]; return q.o.find((o) => o.startsWith(d)); } },
  { has: "vòng đời của mèo", right: (q) => VONG_DOI["mèo"].map((k) => { const o = q.o.filter((x) => low(x).includes(k)); assert.equal(o.length, 1, k); return o[0]; }) },
  { has: "Trứng ruồi nở sau khoảng", right: (q) => { const a = +/nở sau khoảng (\d+) ngày/.exec(q.q)[1], b = +/thêm khoảng (\d+) ngày/.exec(q.q)[1], d = +/vào ngày (\d+) tháng 7/.exec(q.q)[1]; assert.ok(d + a + b <= 31, "vẫn trong tháng 7"); assert.ok(q.x.includes(`${d} + ${a} + ${b} = ${d + a + b}`)); return d + a + b; } }
];
let n = 0;
const checked = new Set();
kho.forEach((q) => {
  const c = CHECKS.filter((k) => q.q.includes(k.has));
  if (!c.length) return;
  assert.equal(c.length, 1, "câu khớp nhiều mục của CHECKS: " + q.q.slice(0, 60));
  const want = c[0].right(q), at = ten.get(q) + ": " + q.q.slice(0, 50);
  const got = { mc: () => q.o[0], fill: () => q.ans[0], num: () => q.ans, tf: () => q.a, tf4: () => q.a, order: () => q.o, match: () => q.r.slice(0, q.l.length) }[q.type]();
  assert.ok(want !== undefined, at + ": không tính được đáp án");
  if (Array.isArray(want)) assert.deepEqual(got, want, at);
  else assert.ok(typeof want === "number" ? close(got, want) : got === want, `${at}: đáp án ${JSON.stringify(got)}, tính được ${JSON.stringify(want)}`);
  checked.add(q); n++;
});
CHECKS.forEach((c) => assert.ok(kho.filter((q) => q.q.includes(c.has)).length >= 1, "mục CHECKS không khớp câu nào: " + c.has));
// câu có hình, câu trả lời bằng số, câu sắp xếp, nối cột, đúng/sai và câu của các chủ đề có bảng tra nào cũng phải có kiểm tra
const CO_BANG = ["Hỗn hợp và dung dịch", "Sự biến đổi hoá học", "Sinh sản của động vật"];
kho.filter((q) => q.svg || ["num", "order", "match", "tf", "tf4"].includes(q.type) && !/Mỗi việc làm sau|Mỗi ý sau về an toàn|khóm cỏ dại/.test(q.q) || CO_BANG.includes(q.topic))
  .forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => { assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)); chuHinh(q.svg, ten.get(q)); });

/* ---------- mức độ và ma trận ---------- */
const M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), pool.n, "tổng ma trận bằng n");
assert.equal(CHU_DE.length, 14, "14 chủ đề theo tên Bài 1–5, 7–11, 13–16");
const nhom = (a, b) => sum(CHU_DE.slice(a, b).map((t) => sum(M[t])));
assert.deepEqual([nhom(0, 5), nhom(5, 10), nhom(10, 14)], [9, 9, 7], "Chất 9 câu, Năng lượng 9, Thực vật và động vật 7");
CHU_DE.forEach((t) => assert.ok(("chu-de:5:khoahoc:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
DE.forEach((id) => {
  const d = bank(id).questions;
  assert.deepEqual([...new Set(d.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, theo thứ tự của ma trận");
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `${id} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = kho.filter((q) => q.topic === t && q.lv === l);
  assert.deepEqual(o.map((q) => q.src).sort(), v[l - 1] ? DE.concat(S.pool).sort() : [], `ô (${t}, mức ${l}): một câu ở mỗi đề, một câu riêng`);
  assert.ok(v[l - 1] <= 1, `ô (${t}, mức ${l}) rút nhiều nhất 1 câu`);
}));
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 2 && !kho.some((q) => q.type === "essay"), "ít nhất 2 câu đúng/sai 4 ý, không có câu tự luận");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.equal(Math.max(...Object.values(kieu)), 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
["match", "order", "fill", "num", "tf", "tf4"].forEach((t) => assert.ok(kho.some((q) => q.type === t), "kho có câu dạng " + t));
kho.filter((q) => q.type === "match").forEach((q) => { assert.equal(new Set(q.r).size, q.r.length); assert.equal(q.r.length, q.l.length + 1, "nối cột có một ô thừa"); });
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2) và không hay là lựa chọn dài nhất hay ngắn nhất: mỗi kiểu không quá một phần ba
// và không dưới một phần sáu số câu nhiều lựa chọn (Rút ra N9-ck1-tin-congnghe, N5-ck1-ta)
const mcs = kho.filter((q) => q.type === "mc"), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
mcs.forEach((q) => { const m = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60)); assert.equal(new Set(q.o).size, q.o.length); });
const daiNhat = mcs.filter((q) => hon(q, (a, b) => a > b)).length, nganNhat = mcs.filter((q) => hon(q, (a, b) => a < b)).length;
[[daiNhat, "dài nhất"], [nganNhat, "ngắn nhất"]].forEach(([k, s]) => assert.ok(k <= mcs.length / 3 && k >= mcs.length / 6, `đáp án đúng là lựa chọn ${s} ở ${k}/${mcs.length} câu nhiều lựa chọn`));
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
{ const phanNhan = (t) => t.split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
  kho.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => {
    if (low(d).includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => low(o).includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); }); }
// lời giải không nhắc vị trí phương án (app xáo phương án); gọi người làm bài là “bạn”; chữ như sách in năm 2026
kho.forEach((q) => {
  assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50));
  const C = [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).join(" ");
  assert.ok(!/(^|[^\p{L}])em([^\p{L}]|$)/u.test(C), "gọi người làm bài là “bạn”, không “em”: " + q.q.slice(0, 50));
  assert.ok(!/hóa|thủy|nhụy|khỏe|tùy|hòa/u.test(C), "viết “hoá”, “thuỷ”, “nhuỵ”, “khoẻ”, “tuỳ”, “hoà” như sách: " + q.q.slice(0, 50));
  assert.ok(!/Tây Nguyên|63 tỉnh|huyện/u.test(C), "không dùng tên vùng, đơn vị hành chính cũ: " + q.q.slice(0, 50));
});
// lời dặn: phạm vi, đề chung của Sở, trường chưa học hết Chủ đề 3 thì xem đề cương
DE.concat(S.pool).forEach((id) => { const t = bank(id).note; assert.ok(/Bài 1–17/.test(t) && /Sở GD&ĐT ra đề chung cuối kì một số môn lớp 5/.test(t) && /đề cương của trường/.test(t), id + ": note ghi phạm vi, đề chung của Sở, đề cương của trường"); });
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
// học sinh đã làm hết một đề cố định (đúng cả): lần rút sau không lấy lại câu của đề đó; làm hết cả hai đề thì rút đúng các câu riêng
[[S.de1], [S.de2], [S.de1, S.de2]].forEach((lam) => {
  const done = new Set(lam.flatMap((id) => bank(id).questions.map(Quiz.key)));
  for (let k = 0; k < 30; k++) thuRut((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), `đã làm hết ${lam.join(", ")} mà vẫn gặp lại câu của đề đó`));
});

/* ---------- đề bài không trùng câu nào khác trong data/banks/5-khoahoc.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "5-khoahoc.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: gocChu(q.q) })));
  deBai.forEach((d) => { const cung2 = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung2, [d.at], "đề bài trùng: " + cung2.join(", ")); });
}

/* ---------- dò lộ đáp án (Rút ra N5, N25, RS9; như tests/toan5-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung mọi câu của một
   chủ đề (chủ đề nào cũng dưới 10 câu nên lấy hết), đề ngẫu nhiên rút chung câu của các chủ đề khác; lời dặn (note) hiện ở màn mở đề nên cũng
   là “câu kia”. Chữ của câu kia gồm đề bài, lời giải, các ô, đáp án và chữ trong hình. Số (từ 10) chỉ tìm ở vị trí kết quả (ngay sau “=”,
   “là”, “bằng”, “được”); cặp nối: câu kia có cả hai vế; câu sắp xếp: câu kia có hai ô liền nhau theo đúng thứ tự; đáp án bằng chữ (lựa
   chọn đúng, đáp án điền) có ở câu kia thì in ra với DO_LO=1 để người làm xem (đáp án một, hai từ chỉ tính khi câu kia cùng chủ đề), danh
   sách đã xem ghi ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || [], q.svg ? TEXTS(q.svg).map((t) => t.t) : []).map(String);
const val = (s) => +String(s).replace(/\s/g, "").replace(",", ".");
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const coCum = (t, s) => new RegExp("(?<![\\p{L}\\p{N}])" + low(s).replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u").test(t);
const LOI_DAN = [...new Set(DE.concat(S.pool).map((id) => bank(id).note))].map((note, i) => ({ q: note, note: true, ten: "note" + (i + 1) }));
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
// đã xem (Phiên N5-ck1-khoahoc): câu kia chỉ nhắc tên bộ phận (nhuỵ, bầu nhuỵ, đầu nhuỵ; công tắc K), không cho biết số nào trong hình
// chỉ bộ phận đó: hai câu số chỉ bộ phận phải đọc hình.
const DA_XEM = [
  "own#19 → de1#19: Nhuỵ", "own#20 → de1#19: Nhuỵ", "de1#20 → de1#19: Nhuỵ", "de2#19 → de1#19: Nhuỵ", "de2#20 → de1#19: Nhuỵ",
  "own#15 → de2#13: Công tắc", "de1#14 → de2#13: Công tắc", "de1#15 → de2#13: Công tắc", "de2#14 → de2#13: Công tắc"
];
assert.deepEqual(r.chuLo, DA_XEM, "đáp án bằng chữ có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(r.lo, [], "lộ đáp án:\n" + r.lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 40”, cả hai vế một cặp nối, hai ô liền nhau của câu sắp xếp, lựa chọn đúng
{ const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const k = doLo(qs, (q) => q.q.slice(0, 12)); return k.lo.concat(k.chuLo).map((s) => s.replace(/^.*?: /, "")); };
  const khac = tim("Khí sinh học (bi-ô-ga)");
  assert.deepEqual(thuLo([tim("bình chia vạch"), gia(khac, "Mực nước dâng thêm là 40 ml.")]), ["40"]);
  assert.deepEqual(thuLo([tim("Nối mỗi chất đốt với nơi"), gia(khac, "Củi lấy từ cành cây khô, gỗ vụn.")]), ["Củi → Cành cây khô, gỗ vụn"]);
  assert.deepEqual(thuLo([tim("vòng đời của mèo"), gia(khac, "Mèo con được sinh ra rồi mèo con lớn lên, tập tự kiếm ăn.")]), ["Mèo con được sinh ra → Mèo con lớn lên, tập tự kiếm ăn"]);
  assert.deepEqual(thuLo([tim("Ruồi thường đẻ trứng"), gia(khac, "Hãy thu gom, xử lí rác, phân chuồng thường xuyên.")]), ["Thu gom, xử lí rác, phân chuồng thường xuyên"]); }
// bộ đọc hình bắt được hình vẽ sai: công tắc vẽ mở, dây không chạm cực, mũi tên vòng đời ngược chiều, số chỉ sai bộ phận
{ const tim = (has) => kho.find((q) => q.q.includes(has)), chk = (has) => CHECKS.find((c) => c.has === has);
  const kep = tim("còn để trống giữa hai kẹp"), bon = tim("Ở mạch điện nào dưới đây"), tam = tim("vòng đời của con tằm"), hoa = tim("Bộ phận được đánh số 2 là:");
  assert.throws(() => chk("còn để trống giữa hai kẹp").right(Object.assign({}, kep, { svg: kep.svg.replace('x2="82" y2="103"', 'x2="76" y2="80"') })), /công tắc|AssertionError/);
  const hoC = bon.svg.replace('points="47,303 10,303', 'points="30,303 10,303'); assert.notEqual(hoC, bon.svg);
  assert.equal(docMach(hoC).filter((m) => m.sang).length, 0, "dây của mạch C để hở thì không mạch nào sáng");
  assert.throws(() => docVongDoi(tam.svg.replace(/<line x1="213" y1="30"/, '<line x1="250" y1="93"')), /AssertionError|ô/);
  assert.throws(() => chk("Bộ phận được đánh số 2 là:").right(Object.assign({}, hoa, { svg: hoa.svg.replace('x1="161" y1="84"', 'x1="230" y1="100"') })), /AssertionError|bốn số/); }

/* ---------- không gần trùng câu của kho Khoa học lớp 4 (lời giao việc; Rút ra N25, như tests/toan5-ck1.js): đề bài cùng lựa chọn, ô nối, ô sắp
   xếp có từ 4 cặp hai âm tiết liền nhau chung với một câu của data/banks/4-khoahoc.js và số cặp chung từ một nửa số cặp của câu ít cặp hơn
   thì báo. Bỏ cách hỏi chung (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của hai file. ---------- */
{
  const CUM = ["mỗi ý sau đúng hay sai", "nào dưới đây", "dưới đây", "cách nào", "vì sao", "điều này cho thấy", "nên làm gì"];
  const cap2 = (s) => { let t = low(s); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const cauCua = (file) => BANKS.filter((b) => b.file === file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const lop4 = cauCua("4-khoahoc.js"), ca = lop4.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const P4 = lop4.map((p) => [p, capAm(p)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return P4.map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Khoa học 4:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Khoa học 4");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, chữ trong hình) không có trong sách; cụm từ chung của môn (tên bài,
   tên chủ đề, cách hỏi chuẩn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...CHU_DE, "mỗi ý sau đúng hay sai", "cho dòng điện chạy qua", "không cho dòng điện chạy qua", "mạch điện thắp sáng đơn giản", "vật dẫn điện", "vật cách điện",
  "năng lượng mặt trời", "năng lượng gió", "năng lượng nước chảy", "năng lượng chất đốt", "năng lượng điện", "sự biến đổi hoá học", "biến đổi hoá học", "chất mới được tạo thành",
  "ở trạng thái rắn", "ở trạng thái lỏng", "ở trạng thái khí", "hình dạng xác định", "khoảng không gian xác định", "hoà tan", "phân bố đều", "thụ phấn, thụ tinh",
  "cực dương", "cực âm", "công tắc", "bóng đèn", "hạt phấn", "bao phấn", "đầu nhuỵ", "vòi nhuỵ", "bầu nhuỵ", "tế bào sinh dục cái", "tế bào sinh dục đực", "hoa đơn tính", "hoa lưỡng tính",
  "chất dinh dưỡng dự trữ", "chất dinh dưỡng", "trưởng thành", "ấu trùng", "đẻ trứng", "đẻ con", "phân hữu cơ", "phân bón hoá học", "thuốc trừ sâu", "khí sinh học", "dầu di-ê-den",
  "ở nhiệt độ bình thường", "sau khi thụ tinh", "theo đúng thứ tự"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
if (SACH.length) {
  assert.ok(SACH.some((f) => /lop-5\/khoa-hoc-5/.test(f)), "OnUp-Book có Khoa học 5");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const khac = BANKS.filter((b) => b.file !== "5-khoahoc.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n + " câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu, " + kho.filter((q) => q.svg).length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("KHOAHOC5 OK");
