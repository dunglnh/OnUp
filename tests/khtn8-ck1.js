// Kiểm tra ngân hàng KHTN 8 cuối kì I của Phiên N8-ck1-khtn (data/banks/8-khtn.js: hai đề cố định khtn8-ck1-de1, khtn8-ck1-de2 và các
// câu riêng của đề ngẫu nhiên khtn8-ck1-ngau-nhien; Khoa học tự nhiên 8, Bài 1–19), theo mẫu tests/khtn7-ck1.js, tests/khtn9-ck1.js. Số
// đề, số câu lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho lớp 8; số câu mỗi phần (Bài 1, Chương I, Chương II,
// Chương III, IV) so với lời dặn (note) của đề.
// Câu có phép tính, có hình hoặc có công thức hoá học cần xét được nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề
// ghi ở id); đáp án tính bằng code (so với ans, o[0] hoặc a): cân bằng phương trình hoá học (đếm nguyên tử hai vế), khối lượng mol, số
// mol n = m : M, thể tích khí ở 25 °C và 1 bar (24,79 L/mol), tỉ khối, nồng độ phần trăm, nồng độ mol, pha loãng, định luật bảo toàn khối
// lượng, tính theo phương trình (tỉ lệ hệ số), hiệu suất; khối lượng riêng D = m : V, áp suất p = F : S, sự truyền nguyên vẹn áp suất
// trong máy dùng chất lỏng (F₂ : S₂ = F₁ : S₁), lực đẩy Archimedes F = d · V (đổi đơn vị); loại oxide theo bảng ghi trong script, tên
// oxide theo tiền tố, tên base, kim loại đẩy kim loại khỏi muối theo dãy hoạt động, phản ứng trao đổi theo bảng tính tan. Sách in năm
// 2026 không có công thức áp suất chất lỏng theo độ sâu (Bài 16), công thức moment lực hay điều kiện cân bằng của đòn bẩy (Bài 18, 19),
// nên không câu nào dùng các công thức đó (chữ “d · h”, “F · d” bị cấm). Hình đọc lại: thang pH (số 1–14 cách đều, mũi tên chỉ pH của
// từng dung dịch), viên gạch hình hộp vẽ xiên (ba kích thước ghi trong hình khớp độ dài vẽ), bình nước (độ sâu từng điểm tính từ mặt
// nước), cờ lê (giá của lực có đi qua tâm O không), đòn bẩy (vị trí điểm tựa so với chỗ đặt vật và chỗ tay ấn), ba vật trong nước (thể
// tích phần chìm), sơ đồ phản ứng (nguyên tử là hình tròn ghi kí hiệu, hai hình tròn chạm nhau là liên kết; đếm nguyên tử, phân tử hai
// bên mũi tên), cánh tay đòn (H là chân đường vuông góc hạ từ O xuống giá của lực); chữ trong hình cỡ từ 13, nằm trong khung, không đè
// nhau. Câu trả lời bằng số và câu có hình nào cũng phải có kiểm tra ở đây.
// Rồi: chữ (công thức hoá học viết bằng chữ số dưới dòng, tên chất như sách in năm 2026: acid, base, oxide, tên IUPAC; dấu thanh kiểu cũ
// như sách “hoá”, “thuỷ”; số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân), mức độ và ma trận (18 chủ đề theo tên bài trong
// mục lục của sách, Bài 14 thực hành không có chủ đề riêng; hai đề cố định và câu riêng chia đúng ma trận, mỗi ô rút 1 câu), dạng câu
// theo khung Công văn 7991 (mỗi phần ít nhất 4 câu đúng/sai 4 ý, không lặp kiểu Đ/S; trả lời ngắn bằng số), đáp án đúng không dài hơn
// hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba (và không dưới một phần sáu) số câu nhiều lựa chọn của
// mỗi phần, không lặp chữ của nhãn chủ đề, rút thử nhiều lần (đúng ma trận, gặp đủ câu riêng; đã làm hết một đề cố định thì không rút
// lại câu của đề đó), đề bài không trùng câu nào trong data/banks/8-khtn.js, không gần trùng câu của data/banks/7-khtn.js,
// data/banks/9-khtn.js (cặp từ liền nhau chung), dò lộ đáp án giữa mọi cặp câu của kho và lời dặn (đề “Ôn chủ đề” rút chung mọi câu
// của một chủ đề, đề ngẫu nhiên rút chung câu của mọi chủ đề khác) và, nếu có ../OnUp-Book, so mọi trường chữ, cả chữ trong hình và lời
// dặn, với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng), so số liệu của từng câu với từng trang KHTN 8 (không trang nào có từ ba số
// hiếm của một câu), so với câu của mọi kho khác (không chuỗi 8 từ nào trùng). DA_XEM ghi cả dòng dò lộ của tests/soat-nhap.js đã xem
// tay. Mô tả script: tests/README.md, mục 3, “Lớp 8”.
// Chạy: node tests/khtn8-ck1.js → in MATH OK. DO_LO=1 in đáp án bằng chữ có ở câu khác; DO_SACH=1 in chuỗi 6 từ trùng sách và các trang
// có số liệu chung; DO_KHO=1 in chuỗi 6 từ trùng kho khác, câu gần trùng kho KHTN 7, KHTN 9 (để người làm xem).

const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz;
const pool = BANKS.find((b) => b.pool && /^khtn8-ck1-/.test(b.id));
assert.ok(pool, "thiếu đề ngẫu nhiên khtn8-ck1");
assert.equal(pool.pool.from.length, 2, "đề ngẫu nhiên lấy câu của hai đề cố định");
const S = { de1: pool.pool.from[0], de2: pool.pool.from[1], own: pool.id };
assert.deepEqual(BANKS.filter((b) => /^khtn8-ck1-/.test(b.id)).map((b) => b.id).sort(), Object.values(S).sort(), "kho gồm hai đề cố định và đề ngẫu nhiên");
const kho = pool.questions, mine = kho.filter((q) => q.src === S.own), cauCua = (id) => kho.filter((q) => q.src === id);
[S.de1, S.de2].forEach((id) => assert.equal(bank(id).questions.length, bank(id).n, id + ": số câu bằng n của danh mục"));
assert.equal(kho.length, mine.length + bank(S.de1).n + bank(S.de2).n, "kho = câu riêng + câu của hai đề cố định");
assert.equal(mine.length, pool.n, "câu riêng chia đúng ma trận nên có đúng n câu");
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- số ---------- */
const val = (s) => +String(s).replace(/\s/g, "").replace(/−/g, "-").replace(",", "."); // "1 200" → 1200, "4,5" → 4.5
const close = (x, y, e = 1e-9) => Math.abs(x - y) < e;
const tron = (x, k = 2) => Math.round(x * 10 ** k) / 10 ** k;
const vn = (x) => { const [a, b] = String(tron(x, 6)).split("."); return a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); }; // 1500 → "1 500", 0.25 → "0,25"
const V_MOL = 24.79; // thể tích của 1 mol khí ở 25 °C và 1 bar (L), như sách

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">");
  return { x: +a.x, y: +a.y, t: m[2], b: a["font-weight"] === "700", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start" }; });
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const cheo = (u, v) => u[0] * v[1] - u[1] * v[0];
// ước khung chữ (Noto Sans; chữ đậm rộng hơn), như tests/khtn7-ck1.js
const rong = (t) => (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length;
const hopChu = (t) => { const w = rong(t), x0 = t.anchor === "middle" ? t.x - w / 2 : t.anchor === "end" ? t.x - w : t.x; return [x0, t.y - 0.75 * t.fs, x0 + w, t.y + 0.25 * t.fs]; };
const tamChu = (t) => { const h = hopChu(t); return [(h[0] + h[2]) / 2, (h[1] + h[3]) / 2]; };
// mọi chữ trong hình cỡ từ 13 trở lên, nằm trọn trong khung, không đè lên nhau
const chuHinh = (svg, ten) => {
  const v = /viewBox="([^"]+)"/.exec(svg)[1].trim().split(/[\s,]+/).map(Number), T = texts(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, ten + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= v[0] && h[2] <= v[0] + v[2] && h[1] >= v[1] && h[3] <= v[1] + v[3], ten + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), ten + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
};
// chữ gần điểm p nhất trong các chữ khớp re
const ganNhat = (T, p, re) => { const ds = T.filter((t) => re.test(t.t)); assert.ok(ds.length, "thiếu chữ " + re); return ds.reduce((x, t) => (dist(tamChu(t), p) < dist(tamChu(x), p) ? t : x)); };
// mũi tên: đầu tam giác (điểm đầu tiên là đỉnh) nối với một đoạn thẳng cùng màu có một đầu sát đáy tam giác, thẳng hàng với đỉnh
const muiTen = (svg, mau) => tags(svg, "polygon").filter((p) => p.fill === mau && pts(p.points).length === 3).map((p) => {
  const [dinh, b1, b2] = pts(p.points), day = [(b1[0] + b2[0]) / 2, (b1[1] + b2[1]) / 2];
  const l = tags(svg, "line").filter((l) => l.stroke === mau).find((l) => dist([+l.x2, +l.y2], day) < 0.3);
  assert.ok(l, "mũi tên không có thân: " + p.points);
  const goc = [+l.x1, +l.y1], u = [(dinh[0] - goc[0]) / dist(goc, dinh), (dinh[1] - goc[1]) / dist(goc, dinh)];
  assert.ok(Math.abs(cheo(u, [day[0] - goc[0], day[1] - goc[1]])) < 0.3, "đầu mũi tên lệch khỏi thân");
  return { goc, dinh, u };
});

/* Thang pH: các số 1, 2, …, 14 cách đều nhau dưới thanh; mỗi dung dịch là một mũi tên tam giác tô acc chỉ xuống thanh, chữ cái ghi ngay
   trên mũi tên. Trả về pH của từng dung dịch (đọc theo vị trí đỉnh mũi tên). */
const docPH = (svg) => {
  const T = texts(svg), so = T.filter((t) => /^\d+$/.test(t.t)).sort((a, b) => a.x - b.x);
  assert.deepEqual(so.map((t) => +t.t), Array.from({ length: 14 }, (_, i) => i + 1), "thang pH ghi đủ các số 1–14 theo thứ tự");
  const buoc = so[1].x - so[0].x; so.forEach((t, i) => assert.ok(close(t.x, so[0].x + i * buoc, 0.05), "các số trên thang pH cách đều"));
  const ph = (x) => 1 + (x - so[0].x) / buoc;
  const ra = {};
  tags(svg, "polygon").filter((p) => p.fill === "acc").forEach((p) => {
    const [dinh] = pts(p.points), t = ganNhat(T, dinh, /^[A-Z]$/), v = ph(dinh[0]);
    assert.ok(Math.abs(t.x - dinh[0]) < 0.5 && t.y < dinh[1], "chữ " + t.t + " ở ngay trên mũi tên của nó");
    assert.ok(close(v, Math.round(v), 0.01), "mũi tên " + t.t + " chỉ đúng một vạch của thang");
    assert.ok(!(t.t in ra), "hai mũi tên cùng ghi " + t.t); ra[t.t] = Math.round(v);
  });
  return ra;
};

/* Viên gạch hình hộp vẽ xiên: mặt trước là hình chữ nhật (8 px mỗi cm), chiều sâu vẽ xiên 45° (2,8 px mỗi cm theo mỗi trục). Chữ “a cm”
   ghi dưới cạnh đáy mặt trước, “c cm” bên trái cạnh đứng, “b cm” cạnh cạnh xiên phía trên bên phải. Trả về { a, b, c } sau khi khớp độ
   dài vẽ. */
const docGach = (svg) => {
  const r = tags(svg, "rect").find((t) => t.fill === "sun-soft"), [x, y, W, H] = [+r.x, +r.y, +r.width, +r.height];
  const P = tags(svg, "polygon").map((p) => pts(p.points)), tren = P.find((p) => p.some((q) => close(q[0], x) && close(q[1], y)));
  assert.ok(tren, "có mặt trên của viên gạch");
  const xien = tren.find((q) => q[1] < y - 1 && q[0] < x + W / 2), d = xien[0] - x;
  assert.ok(close(y - xien[1], d, 0.11), "cạnh xiên vẽ nghiêng 45°");
  const T = texts(svg).filter((t) => /^\d+ cm$/.test(t.t)), lay = (p) => +ganNhat(T, p, /cm$/).t.split(" ")[0];
  const a = lay([x + W / 2, y + H + 10]), c = lay([x - 20, y + H / 2]), b = lay([x + W + d / 2 + 25, y - d / 2]);
  assert.ok(close(W, 8 * a, 0.05) && close(H, 8 * c, 0.05) && close(d, 2.8 * b, 0.11), "độ dài vẽ khớp kích thước ghi trong hình");
  assert.equal(new Set([a, b, c]).size, 3, "ba kích thước khác nhau");
  return { a, b, c };
};

/* Bình nước: mặt nước là đường thẳng ngang tô acc; mỗi điểm là chấm tròn r = 4 tô ink, chữ ghi bên phải chấm. Trả về độ sâu (px) của
   từng điểm tính từ mặt nước. */
const docMatNuoc = (svg) => { const l = tags(svg, "line").filter((l) => l.stroke === "acc" && l.y1 === l.y2); assert.equal(l.length, 1, "một mặt nước"); return +l[0].y1; };
const docBinh = (svg) => {
  const mat = docMatNuoc(svg), T = texts(svg), ra = {};
  tags(svg, "circle").filter((c) => c.r === "4").forEach((c) => {
    const p = [+c.cx, +c.cy], t = ganNhat(T, p, /^[A-Z]$/);
    assert.ok(dist(tamChu(t), p) < 16, "chữ " + t.t + " ở sát điểm của nó");
    assert.ok(p[1] > mat + 5, "điểm " + t.t + " ở dưới mặt nước"); ra[t.t] = p[1] - mat;
  });
  return ra;
};

/* Cờ lê: tâm O là chấm r = 3, mỗi lực là một mũi tên tô acc có chữ F₁, F₂, F₃ ở gần đỉnh. Trả về khoảng cách từ O tới giá của từng lực. */
const docCoLe = (svg) => {
  const T = texts(svg), o = tags(svg, "circle").find((c) => c.r === "3"), O = [+o.cx, +o.cy];
  assert.ok(dist(tamChu(ganNhat(T, O, /^O$/)), O) < 50, "chữ O ở gần tâm con ốc");
  const ra = {};
  muiTen(svg, "acc").forEach((m) => { const t = ganNhat(T, m.dinh, /^F[₁₂₃]$/); assert.ok(dist(tamChu(t), m.dinh) < 30, "chữ " + t.t + " ở gần đầu mũi tên");
    ra[t.t] = Math.abs(cheo(m.u, [O[0] - m.goc[0], O[1] - m.goc[1]])); });
  return ra;
};

/* Đòn bẩy: thanh ngang, điểm tựa là tam giác tô sun (đỉnh chạm thanh), vật là hình chữ nhật tô acc-soft đặt trên thanh, lực của tay là mũi
   tên tô acc có đỉnh chạm thanh; chữ O, A, B ghi dưới điểm tựa, vật, chỗ tay ấn. Trả về hoành độ của O, A, B. */
const docDonBay = (svg) => {
  const T = texts(svg), thanh = tags(svg, "rect").find((r) => r.fill === "surface"), yTren = +thanh.y, yDuoi = yTren + +thanh.height;
  const tua = pts(tags(svg, "polygon").find((p) => p.fill === "sun").points)[0], vat = tags(svg, "rect").find((r) => r.fill === "acc-soft"), [m] = muiTen(svg, "acc");
  assert.ok(close(tua[1], yDuoi) && close(+vat.y + +vat.height, yTren) && close(m.dinh[1], yTren), "điểm tựa, vật, lực của tay đều chạm thanh");
  const O = tua[0], A = +vat.x + +vat.width / 2, B = m.dinh[0];
  [["O", O], ["A", A], ["B", B]].forEach(([t, x]) => assert.ok(Math.abs(ganNhat(T, [x, yDuoi + 30], new RegExp("^" + t + "$")).x - x) < 0.5, "chữ " + t + " ghi đúng chỗ"));
  return { O, A, B };
};

/* Ba vật trong nước: mặt nước tô acc; mỗi vật là hình vuông có chữ ghi ngay trên. Trả về chiều cao phần chìm (px) của từng vật. */
const docBaVat = (svg) => {
  const mat = docMatNuoc(svg), T = texts(svg), ra = {}, canh = new Set();
  tags(svg, "rect").filter((r) => r.stroke === "ink").forEach((r) => {
    const [x, y, w, h] = [+r.x, +r.y, +r.width, +r.height], t = ganNhat(T, [x + w / 2, y - 10], /^[A-Z]$/);
    assert.ok(close(t.x, x + w / 2) && t.y < y && t.y > y - 15, "chữ " + t.t + " ghi ngay trên vật");
    canh.add(w + "×" + h); ra[t.t] = Math.max(0, y + h - Math.max(y, mat));
  });
  assert.equal(canh.size, 1, "ba vật cùng kích thước (cùng thể tích)");
  return ra;
};

/* Sơ đồ phản ứng: mỗi nguyên tử là hình tròn r ≥ 9 có kí hiệu ghi giữa hình; hai hình tròn chạm nhau là hai nguyên tử liên kết; mũi tên
   (thân và đầu tô ink) chia chất phản ứng (bên trái) và sản phẩm (bên phải). Trả về các phân tử mỗi bên (công thức gọn, kí hiệu theo thứ
   tự chữ cái) và hàng xóm của từng nguyên tử. */
const docPhanTu = (svg) => {
  const T = texts(svg), [m] = muiTen(svg, "ink"), giua = (m.goc[0] + m.dinh[0]) / 2;
  const nt = tags(svg, "circle").filter((c) => +c.r >= 9).map((c) => { const p = [+c.cx, +c.cy], t = ganNhat(T, p, /^[A-Z][a-z]?$/);
    assert.ok(dist([t.x, t.y - 4.5], p) < 0.6, "kí hiệu ghi giữa hình tròn"); return { p, r: +c.r, e: t.t, ben: p[0] < giua ? "trai" : "phai" }; });
  nt.forEach((a, i) => nt.slice(i + 1).forEach((b) => { const d = dist(a.p, b.p); assert.ok(Math.abs(d - a.r - b.r) < 0.6 || d > a.r + b.r + 1.5, "hai nguyên tử vừa chạm vừa không: " + a.e + ", " + b.e); }));
  const lk = (a, b) => a !== b && Math.abs(dist(a.p, b.p) - a.r - b.r) < 0.6;
  const phanTu = (ben) => { const ds = nt.filter((a) => a.ben === ben), xong = new Set(), ra = [];
    ds.forEach((a) => { if (xong.has(a)) return; const nhom = [a]; xong.add(a);
      for (let i = 0; i < nhom.length; i++) ds.filter((b) => lk(nhom[i], b) && !xong.has(b)).forEach((b) => { xong.add(b); nhom.push(b); });
      const dem = {}; nhom.forEach((x) => (dem[x.e] = (dem[x.e] || 0) + 1)); ra.push(Object.keys(dem).sort().map((e) => e + (dem[e] > 1 ? dem[e] : "")).join("")); });
    return ra; };
  const ke = (ben, e) => nt.filter((a) => a.ben === ben && a.e === e).map((a) => nt.filter((b) => lk(a, b)).map((b) => b.e));
  const dem = (ben, e) => nt.filter((a) => a.ben === ben && a.e === e).length;
  return { trai: phanTu("trai"), phai: phanTu("phai"), ke, dem };
};

/* Cánh tay đòn: O, A, B là chấm r = 3 trên thanh, chữ ghi ngay trên; lực F là mũi tên tô acc đặt tại B; giá của lực kéo dài bằng nét đứt
   tới H, đường vuông góc từ O tới H bằng nét đứt, kí hiệu góc vuông ở H. Trả về toạ độ chân đường vuông góc và kiểm tra hình vẽ đúng. */
const docCanhTay = (svg) => {
  const T = texts(svg), cham = tags(svg, "circle").filter((c) => c.r === "3").map((c) => [+c.cx, +c.cy]);
  const diem = (ten) => { const t = T.find((x) => x.t === ten); assert.ok(t, "thiếu chữ " + ten); return cham.reduce((a, p) => (dist(p, [t.x, t.y]) < dist(a, [t.x, t.y]) ? p : a)); };
  const O = diem("O"), B = diem("B"), [m] = muiTen(svg, "acc");
  assert.ok(dist(m.goc, B) < 0.3, "lực F đặt tại B");
  const t = (O[0] - B[0]) * m.u[0] + (O[1] - B[1]) * m.u[1], H = [B[0] + t * m.u[0], B[1] + t * m.u[1]];
  const dut = tags(svg, "line").filter((l) => l["stroke-dasharray"]).map((l) => [[+l.x1, +l.y1], [+l.x2, +l.y2]]);
  assert.ok(dut.some(([a, b]) => dist(a, m.dinh) < 0.3 && dist(b, H) < 0.3), "giá của lực F kéo dài (nét đứt) tới chân đường vuông góc");
  assert.ok(dut.some(([a, b]) => dist(a, O) < 0.3 && dist(b, H) < 0.3), "đoạn OH vẽ bằng nét đứt");
  const vuong = tags(svg, "polyline").map((p) => pts(p.points)).find((p) => p.length === 3 && dist(p[1], H) < 14);
  assert.ok(vuong && Math.abs((vuong[0][0] - H[0]) * (vuong[2][0] - H[0]) + (vuong[0][1] - H[1]) * (vuong[2][1] - H[1])) < 1, "kí hiệu góc vuông ở H");
  assert.ok(dist(tamChu(T.find((x) => x.t === "H")), H) < 25, "chữ H ở gần chân đường vuông góc");
  return { O, B, H };
};

/* ---------- hoá học ---------- */
const SUB = "₀₁₂₃₄₅₆₇₈₉", sub2n = (s) => +[...s].map((c) => SUB.indexOf(c)).join("");
// "Ca(OH)₂" → { Ca: 1, O: 2, H: 2 }
const congThuc = (f) => {
  let i = 0;
  const doc = () => {
    const out = {};
    while (i < f.length && f[i] !== ")") {
      let part;
      if (f[i] === "(") { i++; part = doc(); assert.equal(f[i], ")", "thiếu ) trong " + f); i++; }
      else { const m = /^[A-Z][a-z]?/.exec(f.slice(i)); assert.ok(m, "không đọc được công thức " + f); i += m[0].length; part = { [m[0]]: 1 }; }
      let k = ""; while (i < f.length && SUB.includes(f[i])) k += f[i++];
      const n = k ? sub2n(k) : 1;
      Object.entries(part).forEach(([e, c]) => (out[e] = (out[e] || 0) + c * n));
    }
    return out;
  };
  const r = doc(); assert.equal(i, f.length, "thừa chữ trong công thức " + f); return r;
};
// khối lượng nguyên tử (amu) như sách (KHTN 7, Bảng 3.1; KHTN 8 dùng cùng trị số cho khối lượng mol, g/mol)
const KLNT = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, P: 31, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 64, Zn: 65, Ag: 108, Ba: 137 };
const KL = (f) => Object.entries(congThuc(f)).reduce((s, [e, c]) => { assert.ok(e in KLNT, "thiếu khối lượng mol của " + e); return s + KLNT[e] * c; }, 0);
// khối lượng mol đề cho (“(Khối lượng mol: N 14, H 1 g/mol.)”) đúng như sách
const klDeCho = (q) => {
  const m = /\(Khối lượng mol: ([^)]*?) g\/mol\.\)/.exec(q.q); assert.ok(m, "đề cho khối lượng mol");
  m[1].split(", ").forEach((p) => { const [e, v] = p.split(" "); assert.ok(close(val(v), KLNT[e]), "khối lượng mol của " + e + " như sách: " + v); });
};
// phương trình "2Al + 3Cl₂ → 2AlCl₃" → { trai: [[hệ số, công thức]…], phai: […] }
const pt = (s) => { const [a, b] = s.split(" → "); assert.ok(b, "phương trình có mũi tên: " + s);
  const ve = (x) => x.split(" + ").map((c) => { const m = /^(\d*)([A-Z(].*)$/.exec(c.trim()); assert.ok(m, "không đọc được chất " + c); return [m[1] ? +m[1] : 1, m[2]]; });
  return { trai: ve(a), phai: ve(b) }; };
const demVe = (ve) => { const d = {}; ve.forEach(([k, f]) => Object.entries(congThuc(f)).forEach(([e, c]) => (d[e] = (d[e] || 0) + k * c))); return d; };
const canBang = (s) => { const p = pt(s), a = demVe(p.trai), b = demVe(p.phai); return Object.keys(a).length === Object.keys(b).length && Object.keys(a).every((e) => a[e] === b[e]); };
const heSo = (p, f) => { const c = p.trai.concat(p.phai).find(([, x]) => x === f); assert.ok(c, "phương trình không có " + f); return c[0]; };
const ptTrongDe = (q) => { const m = /([0-9]*[A-Z][A-Za-z₀-₉()]*(?: \+ [0-9]*[A-Z][A-Za-z₀-₉()]*)* → [0-9]*[A-Z][A-Za-z₀-₉()]*(?: \+ [0-9]*[A-Z][A-Za-z₀-₉()]*)*)/.exec(q.q);
  assert.ok(m, "đề có phương trình hoá học"); assert.ok(canBang(m[1]), "phương trình trong đề đã cân bằng: " + m[1]); return pt(m[1]); };
// loại oxide theo sách (Bài 10): acid, base, lưỡng tính, trung tính
const LOAI_OXIDE = { "MgO": "base", "CaO": "base", "CuO": "base", "Na₂O": "base", "Fe₂O₃": "base", "SO₂": "acid", "SO₃": "acid", "CO₂": "acid", "P₂O₅": "acid",
  "Al₂O₃": "lưỡng tính", "ZnO": "lưỡng tính", "CO": "trung tính", "NO": "trung tính" };
const voiAcid = (o) => ["base", "lưỡng tính"].includes(LOAI_OXIDE[o]), voiBase = (o) => ["acid", "lưỡng tính"].includes(LOAI_OXIDE[o]);
// tên oxide của phi kim theo tiền tố (Bài 10): mono (bỏ ở nguyên tố đầu), di, tri, tetra, penta (pent- trước “oxide”)
const TIEN_TO = ["", "mono", "di", "tri", "tetra", "penta"], TEN_NT = { N: "nitrogen", S: "sulfur", C: "carbon", P: "phosphorus" };
const tenTienTo = (f) => { const c = congThuc(f), e = Object.keys(c).find((x) => x !== "O"); assert.ok(e in TEN_NT, "phi kim " + e);
  const truoc = c[e] > 1 ? TIEN_TO[c[e]] : "", sau = TIEN_TO[c.O]; return truoc + TEN_NT[e] + " " + (sau === "mono" ? "mon" : sau === "penta" ? "pent" : sau) + "oxide"; };
// tên base (Bài 9): tên kim loại + hydroxide, ghi hoá trị trong ngoặc với kim loại nhiều hoá trị
const KIM_LOAI = { Na: ["sodium", 1], K: ["potassium", 1], Mg: ["magnesium", 1], Ca: ["calcium", 1], Ba: ["barium", 1], Al: ["aluminium", 1], Zn: ["zinc", 1], Fe: ["iron", 2], Cu: ["copper", 2] };
const LA_MA = ["", "I", "II", "III"];
const tenBase = (f) => { const c = congThuc(f), e = Object.keys(c).find((x) => !["O", "H"].includes(x)), [ten, nhieu] = KIM_LOAI[e];
  assert.equal(c.O, c.H, "base có nhóm OH"); return ten + (nhieu > 1 ? "(" + LA_MA[c.O] + ")" : "") + " hydroxide"; };
// dãy hoạt động của kim loại (thứ tự giảm dần) để xét kim loại đẩy kim loại khác khỏi dung dịch muối (Bài 11)
const DAY = ["K", "Na", "Mg", "Al", "Zn", "Fe", "Cu", "Ag"];
// cặp chất trộn với nhau trong câu phản ứng trao đổi (Bài 11): sản phẩm có chất khí, kết tủa (màu) hay không, theo bảng tính tan
const TRAO_DOI = {
  "magnesium carbonate|sulfuric acid": { khi: true, ketTua: null }, // MgCO₃ + H₂SO₄ → MgSO₄ + CO₂ + H₂O
  "potassium nitrate|sodium chloride": { khi: false, ketTua: null }, // KCl, NaNO₃ đều tan
  "sodium hydroxide|potassium chloride": { khi: false, ketTua: null }, // KOH, NaCl đều tan
  "hydrochloric acid|potassium sulfate": { khi: false, ketTua: null }, // không tạo chất khí, chất không tan
};

/* ---------- các câu cần tính ----------
   id: đề chứa câu (de1, de2, own); has: đoạn chữ của đề; right(q): đáp án tính bằng code. */
const so = (q, re) => { const m = re.exec(q.q); assert.ok(m, "đề thiếu số liệu: " + re); return m.slice(1).map(val); };
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const lamTron = (q) => { assert.ok(q.q.includes("Làm tròn kết quả đến chữ số thập phân thứ hai.") && q.tol === 0.01, "đề dặn làm tròn đến hàng phần trăm, tol 0,01"); };
const dieuKien = (q) => assert.ok(q.q.includes("ở 25 °C và 1 bar") || q.q.includes("Ở 25 °C và 1 bar"), "đề ghi điều kiện 25 °C và 1 bar");
const CHECKS = [
  /* ----- Bài 3: mol và tỉ khối chất khí ----- */
  { id: "de1", has: "Khí chlorine (Cl₂) nặng hơn không khí", right: (q) => {
    klDeCho(q); lamTron(q); assert.ok(q.q.includes("khối lượng mol của không khí là 29 g/mol"), "đề cho khối lượng mol của không khí như sách");
    const M = KL("Cl₂"); coX(q, `${vn(M)} : 29`); return tron(M / 29); } },
  { id: "de1", has: "9,6 g khí oxygen", right: (q) => {
    klDeCho(q); lamTron(q); dieuKien(q); const [m] = so(q, /chứa ([\d,]+) g khí oxygen/), n = m / KL("O₂");
    coX(q, `${vn(m)} : ${KL("O₂")} = ${vn(n)}`, "24,79"); return tron(V_MOL * n); } },
  { id: "de2", has: "tỉ khối đối với khí hydrogen bằng", right: (q) => {
    klDeCho(q); const [d] = so(q, /hydrogen bằng ([\d,]+)/), M = d * KL("H₂"), dung = q.o.filter((o) => close(KL(o), M));
    assert.equal(dung.length, 1, "đúng một lựa chọn có khối lượng mol " + M); coX(q, `= ${vn(M)}`); return dung[0]; } },
  { id: "de2", has: "9,916 L khí ammonia", right: (q) => {
    klDeCho(q); dieuKien(q); const [V] = so(q, /([\d,]+) L khí ammonia/), n = V / V_MOL; assert.ok(close(n, tron(n, 3), 1e-9), "số mol tròn");
    coX(q, `= ${vn(n)} (mol)`); return tron(n * KL("NH₃"), 6); } },
  { id: "own", has: "Tỉ khối của khí Y đối với oxygen là", right: (q) => {
    klDeCho(q); dieuKien(q); const [d, V] = so(q, /oxygen là ([\d,]+)\. Ở 25 °C và 1 bar, ([\d,]+) L khí Y/), M = d * KL("O₂"), n = V / V_MOL;
    assert.ok(close(n, tron(n, 3), 1e-9), "số mol tròn"); coX(q, `= ${vn(M)} (g/mol)`); return tron(n * M, 6); } },
  /* ----- Bài 4: dung dịch và nồng độ ----- */
  { id: "de1", has: "g đường vào", right: (q) => { const [a, b] = so(q, /hết ([\d,]+) g đường vào ([\d,]+) g nước/); coX(q, `${vn(a)} + ${vn(b)} = ${vn(a + b)}`); return tron((100 * a) / (a + b), 6); } },
  { id: "de2", has: "g sodium hydroxide (NaOH) vào nước", right: (q) => {
    klDeCho(q); const [m, V] = so(q, /hết ([\d,]+) g sodium hydroxide \(NaOH\) vào nước, được ([\d,]+) mL/), n = m / KL("NaOH");
    coX(q, `= ${vn(n)} (mol)`, `= ${vn(V / 1000)} L`); return tron(n / (V / 1000), 6); } },
  { id: "own", has: "g dung dịch muối ăn nồng độ", right: (q) => {
    const [m, c1, c2] = so(q, /Có ([\d,]+) g dung dịch muối ăn nồng độ ([\d,]+)%\. .* nồng độ ([\d,]+)%\?/), ct = (m * c1) / 100, m2 = (ct * 100) / c2;
    coX(q, `= ${vn(ct)} (g)`, `= ${vn(m2)} (g)`); return tron(m2 - m, 6); } },
  /* ----- Bài 5, 6: phương trình hoá học, định luật bảo toàn khối lượng, tính theo phương trình ----- */
  { id: "de1", has: "Bột nhôm (aluminium) cháy trong khí chlorine", right: (q) => {
    const dung = q.o.filter(canBang); assert.equal(dung.length, 1, "đúng một phương trình cân bằng");
    q.o.forEach((o) => { const p = pt(o); assert.deepEqual([p.trai.map((c) => c[1]), p.phai.map((c) => c[1])], [["Al", "Cl₂"], ["AlCl₃"]], "lựa chọn đúng chất của phản ứng: " + o); });
    return dung[0]; } },
  { id: "de2", has: "g magnesium trong khí oxygen, thu được", right: (q) => {
    const [mg, mgo] = so(q, /hoàn toàn ([\d,]+) g magnesium trong khí oxygen, thu được ([\d,]+) g magnesium oxide/);
    assert.ok(close((mg / KL("Mg")) * KL("MgO"), mgo, 1e-9), "số liệu khớp 2Mg + O₂ → 2MgO"); coX(q, `${vn(mgo)} − ${vn(mg)} = ${vn(mgo - mg)}`); return tron(mgo - mg, 6); } },
  { id: "de1", has: "g sulfur trong khí oxygen theo phương trình", right: (q) => {
    klDeCho(q); lamTron(q); dieuKien(q); const p = ptTrongDe(q), [m] = so(q, /hết ([\d,]+) g sulfur/), n = ((m / KL("S")) * heSo(p, "SO₂")) / heSo(p, "S");
    coX(q, `n(SO₂) = ${vn(n)} mol`); return tron(V_MOL * n); } },
  { id: "de2", has: "Người ta tổng hợp ammonia từ nitrogen và hydrogen", right: (q) => {
    klDeCho(q); const p = ptTrongDe(q), [m, thuc] = so(q, /Cho ([\d,]+) g N₂ phản ứng với lượng H₂ dư thì thu được ([\d,]+) g NH₃/);
    const lt = ((m / KL("N₂")) * heSo(p, "NH₃")) / heSo(p, "N₂") * KL("NH₃"); coX(q, `${vn(lt)} (g)`); return tron((100 * thuc) / lt, 6); } },
  { id: "own", has: "g copper cần ít nhất bao nhiêu lít khí hydrogen", right: (q) => {
    klDeCho(q); lamTron(q); dieuKien(q); const p = ptTrongDe(q), [m] = so(q, /thu được ([\d,]+) g copper/), n = ((m / KL("Cu")) * heSo(p, "H₂")) / heSo(p, "Cu");
    coX(q, `n(H₂) = n(Cu) = ${vn(n)} mol`); return tron(V_MOL * n); } },
  { id: "own", has: "4P + 5O₂ → 2P₂O₅", right: (q) => {
    const p = ptTrongDe(q), k = (f) => heSo(p, f);
    const [, a, b, c] = /Tỉ lệ số mol P : O₂ : P₂O₅ là (\d+) : (\d+) : (\d+)\./.exec(q.o[1]);
    const [, x, y, z] = /Cứ (\d+) nguyên tử P kết hợp với (\d+) phân tử O₂ thì sinh ra (\d+) phân tử P₂O₅\./.exec(q.o[2]);
    const [, mp, mo] = /hết ([\d,]+) mol P cần ([\d,]+) mol O₂\./.exec(q.o[3]);
    assert.ok(/thay cho 5O₂/.test(q.o[0]), "ý a nói chuyện viết 10O thay cho O₂ (đổi chỉ số: sai)");
    return [false, [+a, +b, +c].join() === [k("P"), k("O₂"), k("P₂O₅")].join(), [+x, +y, +z].join() === [k("P"), k("O₂"), k("P₂O₅")].join(), close((val(mp) * k("O₂")) / k("P"), val(mo))]; } },
  /* ----- Chương II: acid, base, oxide, muối ----- */
  { id: "de1", has: "Hình bên là thang pH", right: (q) => { const ph = docPH(q.svg), base = Object.keys(ph).filter((t) => ph[t] > 7);
    assert.equal(base.length, 1, "đúng một dung dịch có pH lớn hơn 7"); Object.entries(ph).forEach(([t, v]) => coX(q, `${t} (pH = ${v})`)); return "Dung dịch " + base[0]; } },
  { id: "de2", has: "Tên gọi của base có công thức", right: (q) => tenBase(/công thức ([A-Za-z(]+[A-Za-z₀-₉()]*) là/.exec(q.q)[1]) },
  { id: "de1", has: "Oxide nào sau đây tác dụng được với dung dịch hydrochloric acid", right: (q) => {
    const dung = q.o.filter((o) => voiAcid(o) && !voiBase(o)); assert.equal(dung.length, 1, "đúng một oxide chỉ tác dụng với dung dịch acid"); return dung[0]; } },
  { id: "de2", has: "Cho bốn oxide: CaO, SO₃, ZnO, NO", right: (q) => q.o.map((s) => {
    const ox = /^([A-Z][A-Za-z₀-₉]*) /.exec(s)[1], khong = /không (phản ứng|tác dụng)/.test(s), ca = /cả dung dịch acid và dung dịch base/.test(s);
    const acid = /hydrochloric acid|dung dịch acid/.test(s), base = /sodium hydroxide|dung dịch base/.test(s);
    const that = ca ? voiAcid(ox) && voiBase(ox) : acid ? voiAcid(ox) : base ? voiBase(ox) : assert.fail("không rõ ý: " + s);
    return khong ? !that : that; }) },
  { id: "own", has: "Oxide của nitrogen có công thức", right: (q) => tenTienTo(/công thức ([A-Z][A-Za-z₀-₉]*)\./.exec(q.q)[1]) },
  { id: "de2", has: "bị lẫn một ít copper(II) sulfate", right: (q) => {
    // kim loại đứng trước copper trong dãy hoạt động thì đẩy copper ra khỏi muối; để không lẫn muối mới, kim loại đó phải là zinc
    const dung = q.o.filter((o) => DAY.indexOf(o) >= 0 && DAY.indexOf(o) < DAY.indexOf("Cu") && o === "Zn"); assert.ok(q.o.every((o) => DAY.includes(o)), "lựa chọn là kim loại trong dãy");
    assert.ok(q.o.filter((o) => DAY.indexOf(o) < DAY.indexOf("Cu")).length >= 2, "có kim loại khác cũng đẩy được copper (để thấy lí do chọn zinc)");
    assert.ok(!q.o.some((o) => DAY.indexOf(o) > DAY.indexOf("Cu")), "không có kim loại đứng sau copper trong dãy (dãy hoạt động học ở lớp 9)"); return dung[0]; } },
  { id: "own", has: "Trộn từng cặp chất sau với nhau", right: (q) => q.o.map((s) => {
    const cap = Object.keys(TRAO_DOI).find((k) => k.split("|").every((x) => s.includes(x))); assert.ok(cap, "chưa có cặp chất trong TRAO_DOI: " + s);
    const r = TRAO_DOI[cap]; if (/có bọt khí|có khí thoát ra/.test(s)) return r.khi;
    const m = /kết tủa (trắng|màu nâu đỏ)/.exec(s); assert.ok(m, "không rõ hiện tượng: " + s); return r.ketTua === m[1]; }) },
  { id: "de1", has: "calcium chloride (CaCl₂) tác dụng với dung dịch sodium carbonate", right: (q) => {
    klDeCho(q); const p = ptTrongDe(q), [m] = so(q, /chứa ([\d,]+) g calcium chloride/), n = ((m / KL("CaCl₂")) * heSo(p, "CaCO₃")) / heSo(p, "CaCl₂");
    coX(q, `= ${vn(n)} (mol)`); return tron(n * KL("CaCO₃"), 6); } },
  /* ----- Bài 13: khối lượng riêng ----- */
  { id: "de1", has: "L mật ong", right: (q) => { const [V, m] = so(q, /chứa ([\d,]+) L mật ong\. Khối lượng mật ong trong lọ là ([\d,]+) kg/); coX(q, `${vn(m * 1000)} : ${vn(V * 1000)} = ${vn(m / V)}`); return tron(m / (V / 1000), 6); } },
  { id: "de2", has: "tấm kính cửa sổ hình chữ nhật", right: (q) => {
    const [a, b, c, D] = so(q, /dài ([\d,]+) m, rộng ([\d,]+) m, dày ([\d,]+) mm\. Khối lượng riêng của kính là ([\d ]+) kg\/m³/), V = a * b * (c / 1000);
    coX(q, `= ${vn(V)} (m³)`); return tron(D * V, 6); } },
  { id: "own", has: "bức tượng nhỏ làm bằng đá", right: (q) => { const [m, V] = so(q, /khối lượng ([\d,]+) kg và thể tích ([\d,]+) dm³/); coX(q, `= ${vn(V / 1000)} m³`); return tron(m / (V / 1000), 6); } },
  /* ----- Bài 15, 16, 17: áp suất, lực đẩy Archimedes ----- */
  { id: "de1", has: "Một viên gạch đặc hình hộp chữ nhật có kích thước như hình", right: (q) => {
    const g = docGach(q.svg), mat = [[g.a, g.b], [g.a, g.c], [g.b, g.c]].map(([x, y]) => [Math.max(x, y), Math.min(x, y)]).sort((u, v) => u[0] * u[1] - v[0] * v[1]);
    const ten = ([x, y]) => `Đặt mặt ${x} cm × ${y} cm tiếp xúc với sàn`;
    mat.forEach((m) => assert.ok(q.o.includes(ten(m)), "lựa chọn có đủ ba mặt: " + ten(m))); coX(q, `${mat[0][0] * mat[0][1]} cm²`); return ten(mat[0]); } },
  { id: "own", has: "Một người có trọng lượng", right: (q) => { const [F, S] = so(q, /trọng lượng ([\d ]+) N .* là ([\d ]+) cm²/); coX(q, `= ${vn(S / 1e4)} m²`); return tron(F / (S / 1e4), 6); } },
  { id: "de1", has: "Một bình đựng nước, các điểm A, B, C, D", right: (q) => { const d = docBinh(q.svg), sau = Object.keys(d).sort((a, b) => d[b] - d[a]);
    assert.ok(d[sau[0]] > d[sau[1]] + 10, "điểm sâu nhất rõ ràng"); assert.ok(close(d.A, d.B), "A và B cùng độ sâu (lời giải nói vậy)"); return "Điểm " + sau[0]; } },
  { id: "de1", has: "Ghế nâng ở một tiệm gội đầu", right: (q) => { const [s1, s2, F1] = so(q, /xi lanh nhỏ là ([\d,]+) cm², ở xi lanh lớn là ([\d,]+) cm²\. .* một lực ([\d,]+) N/); coX(q, "F₂ : S₂ = F₁ : S₁"); return tron((F1 * s2) / s1, 6); } },
  { id: "de2", has: "Máy ép kiện giấy vụn", right: (q) => { const [F1, s1, s2] = so(q, /Một lực ([\d ]+) N đè lên pit-tông nhỏ \(diện tích ([\d,]+) cm²\)\. Pit-tông lớn, diện tích ([\d,]+) m²/); coX(q, `= ${vn(s2 * 1e4)} cm²`); return tron((F1 * s2 * 1e4) / s1, 6); } },
  { id: "own", has: "máy ép dầu lạc", right: (q) => { const [F2, s1, s2] = so(q, /bằng lực ([\d ]+) N, .*pit-tông nhỏ, có diện tích ([\d,]+) cm², .*tấm ép có diện tích ([\d,]+) cm²/); coX(q, "F₁ : S₁ = F₂ : S₂"); return tron((F2 * s1) / s2, 6); } },
  { id: "de1", has: "Một can nhựa rỗng, đậy kín", right: (q) => { const [V, d] = so(q, /thể tích ([\d,]+) L .* nước là ([\d ]+) N\/m³/); coX(q, `= ${vn(V / 1000)} m³`); return tron((d * V) / 1000, 6); } },
  { id: "de2", has: "Ba vật A, B, C có thể tích bằng nhau", right: (q) => { const h = docBaVat(q.svg), it = Object.keys(h).sort((a, b) => h[a] - h[b]);
    assert.ok(h[it[0]] < h[it[1]], "vật chìm ít nhất rõ ràng"); return "Vật " + it[0]; } },
  /* ----- Chương IV: tác dụng làm quay của lực, đòn bẩy ----- */
  { id: "de1", has: "Dùng cờ lê vặn một con ốc có tâm O", right: (q) => { const k = docCoLe(q.svg), qua = Object.keys(k).filter((t) => k[t] < 0.5);
    assert.equal(qua.length, 1, "đúng một lực có giá đi qua O"); Object.keys(k).filter((t) => !qua.includes(t)).forEach((t) => assert.ok(k[t] > 20, "giá của " + t + " cách xa O")); return "Lực " + qua[0]; } },
  { id: "de1", has: "Hình bên mô tả một đòn bẩy: O là điểm tựa", right: (q) => { const d = docDonBay(q.svg), loai = (d.O - d.A) * (d.O - d.B) < 0 ? 1 : 2;
    const dung = q.o.filter((o) => o.startsWith(`Loại ${loai}, vì O `)); assert.equal(dung.length, 1, "đúng một lựa chọn nói loại " + loai + " theo vị trí của O"); return dung[0]; } },
  { id: "own", has: "Cánh tay đòn của lực F là đoạn nào", right: (q) => { docCanhTay(q.svg); return "Đoạn OH"; } },
  /* ----- Bài 2: sơ đồ phản ứng ----- */
  { id: "own", has: "sơ đồ mô tả phản ứng khi khí methane cháy", right: (q) => {
    const s = docPhanTu(q.svg);
    assert.deepEqual([s.trai.slice().sort(), s.phai.slice().sort()], [["CH4", "O2", "O2"], ["CO2", "H2O", "H2O"]], "sơ đồ đúng CH₄ + 2O₂ → CO₂ + 2H₂O");
    const ke = (ben) => s.ke(ben, "C").flat();
    const a = ke("trai").every((e) => e === "H") && ke("phai").every((e) => e === "O");
    const b = s.dem("phai", "H") < s.dem("trai", "H");
    const c = s.trai.every((f) => !s.phai.includes(f));
    const [, n, k] = /thu được (\d+) phân tử, trong đó có (\d+) phân tử nước/.exec(q.o[3]); const d = s.phai.length === +n && s.phai.filter((f) => f === "H2O").length === +k;
    return [a, b, c, d]; } },
];
let n = 0;
const daKiem = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, S[c.id], at + ": câu nằm ở đề " + q.src);
  try {
    const want = c.right(q), got = q.type === "num" ? q.ans : q.type === "tf4" ? q.a : q.o[0];
    if (q.type === "num") assert.ok(close(got, want, 1e-9), "đáp án " + got + ", tính được " + want);
    else assert.strictEqual(JSON.stringify(got), JSON.stringify(want), "đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
    if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), "lựa chọn sai trùng đáp án đúng");
  } catch (e) { e.message = at + ": " + e.message; throw e; }
  assert.ok(!daKiem.has(q), at + ": câu đã có mục kiểm tra khác");
  daKiem.add(q); n++;
});
// câu trả lời bằng số và câu có hình nào cũng phải được tính lại, đọc lại ở trên; hình qua bộ lọc của app, chữ trong hình vừa khung
kho.filter((q) => q.svg || q.type === "num").forEach((q) => assert.ok(daKiem.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
const hinh = kho.filter((q) => q.svg);
hinh.forEach((q) => { assert.deepEqual(Quiz.svg(q.svg).problems, [], "hình bị lọc: " + q.q.slice(0, 50)); chuHinh(q.svg, q.q.slice(0, 40)); });
// bộ đọc hình, bộ tính bắt được hình, đề cố ý viết sai
{
  const cau = (has) => kho.find((q) => q.q.includes(has)), tim = (has) => CHECKS.find((c) => c.has === has), sua = (q, d) => Object.assign({}, q, d);
  const ph = cau("Hình bên là thang pH");
  assert.notEqual(tim("Hình bên là thang pH").right(sua(ph, { svg: ph.svg.replace(/>D</, ">X<").replace(/>B</, ">D<").replace(/>X</, ">B<"), x: ph.x.replace("D (pH = 11)", "B (pH = 11)").replace("B (pH = 5)", "D (pH = 5)") })), ph.o[0]);
  assert.throws(() => docPH(ph.svg.replace("44,48 38,38 50,38", "53,48 47,38 59,38").replace('<text x="44" y="32"', '<text x="53" y="32"')), /vạch/);
  const g = cau("Một viên gạch đặc hình hộp chữ nhật");
  assert.throws(() => docGach(g.svg.replace(">10 cm<", ">12 cm<")), /khớp kích thước/);
  const bn = cau("Một bình đựng nước, các điểm A, B, C, D");
  assert.notEqual(tim("Một bình đựng nước, các điểm A, B, C, D").right(sua(bn, { svg: bn.svg.replace('cx="90" cy="185"', 'cx="90" cy="120"').replace('x="99" y="190"', 'x="99" y="125"') })), bn.o[0]);
  const cl = cau("Dùng cờ lê vặn một con ốc có tâm O");
  assert.throws(() => tim("Dùng cờ lê vặn một con ốc có tâm O").right(sua(cl, { svg: cl.svg.replace('x1="255" y1="90" x2="295" y2="90"', 'x1="255" y1="80" x2="295" y2="90"') })), /lệch|đi qua O/);
  const db = cau("Hình bên mô tả một đòn bẩy: O là điểm tựa");
  assert.notEqual(tim("Hình bên mô tả một đòn bẩy: O là điểm tựa").right(sua(db, { svg: db.svg.replace(/110,80 96,108 124,108/, "24,80 10,108 38,108").replace('x="110" y="128"', 'x="24" y="128"') })), db.o[0]);
  const bv = cau("Ba vật A, B, C có thể tích bằng nhau");
  assert.throws(() => docBaVat(bv.svg.replace('width="40" height="40" fill="ok-soft"', 'width="40" height="50" fill="ok-soft"')), /cùng kích thước/);
  const mt = cau("sơ đồ mô tả phản ứng khi khí methane cháy");
  assert.throws(() => tim("sơ đồ mô tả phản ứng khi khí methane cháy").right(sua(mt, { svg: mt.svg.replace(/(<circle cx="245" cy="40" r="14"[^>]*\/><text x="245" y="44.5"[^>]*>)O</, "$1C<") })), /sơ đồ đúng/);
  const ct = cau("Cánh tay đòn của lực F là đoạn nào");
  assert.throws(() => docCanhTay(ct.svg.replace(/(<line x1="60" y1="100" x2=")([\d.]+)/, (m0, a, x) => a + (+x + 6))), /nét đứt/);
  assert.ok(canBang("2Al + 3Cl₂ → 2AlCl₃") && !canBang("2Al + 3Cl₂ → 3AlCl₃") && canBang("CaCl₂ + Na₂CO₃ → CaCO₃ + 2NaCl") && !canBang("Fe₂O₃ + CO → 2Fe + CO₂"), "bộ cân bằng phương trình");
  assert.equal(tenTienTo("P₂O₅"), "diphosphorus pentoxide"); assert.equal(tenTienTo("CO"), "carbon monoxide"); assert.equal(tenBase("Fe(OH)₃"), "iron(III) hydroxide");
  assert.throws(() => chuHinh(g.svg.replace('font-size="14"', 'font-size="12"'), "thử"), /cỡ 13/);
}

/* ---------- chữ (sách Khoa học tự nhiên 8 in năm 2026) ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || []).map(String);
const chuCau = (q) => chu(q).concat(q.svg ? [texts(q.svg).map((t) => t.t).join(" ")] : []);
kho.forEach((q) => {
  const at = q.src + ": " + q.q.slice(0, 50);
  chuCau(q).forEach((s) => {
    // công thức hoá học viết bằng chữ số dưới dòng (CO₂, Ca(OH)₂), không viết CO2
    assert.ok(!/(?:^|[^A-Za-z])(?:[A-Z][a-z]?|\))+\d/.test(s), at + ": công thức cần chữ số dưới dòng: " + s);
    // tên chất, thuật ngữ như sách in năm 2026 (acid, base, oxide, tên IUPAC; khối lượng nguyên tử tính bằng amu)
    assert.ok(!/(?<![\p{L}])(?:oxi|oxit|axit|bazơ|hiđroxit|hiđro|hidro|cacbon|nitơ|clo|canxi|magie|photpho|silic|natri|liti|nguyên tử khối|phân tử khối|đvC|nhiệt phân kali)(?![\p{L}])/iu.test(s), at + ": tên chất, thuật ngữ khác sách: " + s);
    // dấu thanh kiểu cũ như sách (hoá, thuỷ, tuỳ, hoà…)
    assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|họa|lũy|thỏa)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s);
    // số ngăn hàng nghìn bằng khoảng trắng (trừ năm), dấu phẩy thập phân
    assert.ok(!/(?<![\d,])\d{4,}/.test(s.replace(/\b(?:19|20)\d\d\b/g, "")) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s);
    // điều sách in năm 2026 không dạy: công thức áp suất chất lỏng theo độ sâu, công thức moment lực, điều kiện cân bằng của đòn bẩy;
    // đơn vị hành chính cũ
    assert.ok(!/d · h|d\.h|F · d|F₁ · d₁|F\.d|(?<![\p{L}])(?:huyện|63 tỉnh)(?![\p{L}])/u.test(s), at + ": công thức sách không dạy hay đơn vị hành chính cũ: " + s);
  });
});

/* ---------- mức độ, ma trận, phần ---------- */
// 18 chủ đề theo thứ tự bài của sách: [chữ chủ đề, số bài]; tên bài như mục lục (README của cuốn ở OnUp-Book); Bài 14 là bài thực hành
const CHU_DE = [["Sử dụng một số hoá chất, thiết bị cơ bản trong phòng thí nghiệm", 1], ["Phản ứng hoá học", 2], ["Mol và tỉ khối chất khí", 3],
  ["Dung dịch và nồng độ", 4], ["Định luật bảo toàn khối lượng và phương trình hoá học", 5], ["Tính theo phương trình hoá học", 6],
  ["Tốc độ phản ứng và chất xúc tác", 7], ["Acid", 8], ["Base. Thang pH", 9], ["Oxide", 10], ["Muối", 11], ["Phân bón hoá học", 12],
  ["Khối lượng riêng", 13], ["Áp suất trên một bề mặt", 15], ["Áp suất chất lỏng. Áp suất khí quyển", 16], ["Lực đẩy Archimedes", 17],
  ["Tác dụng làm quay của lực. Moment lực", 18], ["Đòn bẩy và ứng dụng", 19]];
const TEN_BAI = CHU_DE.map((c) => c[0]);
assert.deepEqual(CHU_DE.map((c) => c[1]), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16, 17, 18, 19], "chủ đề theo Bài 1–19, không có Bài 14 (thực hành)");
const SACH_README = path.join(__dirname, "../../OnUp-Book/lop-8/khoa-hoc-tu-nhien-8/README.md");
if (fs.existsSync(SACH_README)) { const md = fs.readFileSync(SACH_README, "utf8");
  CHU_DE.forEach(([t, b]) => assert.ok(md.includes("Bài " + b + ". " + t + " |"), "tên Bài " + b + " như mục lục trong README của sách: " + t));
  assert.ok(md.includes("Bài 14. Thực hành xác định khối lượng riêng |"), "Bài 14 là bài thực hành"); }
CHU_DE.forEach(([t]) => assert.ok(("chu-de:8:khtn:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const M = pool.pool.matrix, cells = Object.values(M);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), pool.n, "tổng ma trận bằng n");
assert.ok(cells.every((v) => v.every((k) => k <= 1)), "mỗi ô rút nhiều nhất 1 câu");
assert.deepEqual(Object.keys(M), TEN_BAI, "chủ đề theo thứ tự bài của sách");
// hai đề cố định và câu riêng đều chia đúng ma trận, nên ô nào cũng có gấp ba số câu ô đó rút
[S.de1, S.de2, S.own].forEach((id) => {
  assert.deepEqual([...new Set(cauCua(id).map((q) => q.topic))], Object.keys(M), id + ": đủ chủ đề, đúng thứ tự");
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => cauCua(id).filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t));
});
// số câu mỗi phần đúng như lời dặn của đề; lớp 8 không có đề chung của Sở
const PHAN = [["Bài 1", 1, 1], ["Chương I", 2, 7], ["Chương II", 8, 12], ["Chương III, IV", 13, 19]];
const theoPhan = PHAN.map(([ten, a, b]) => [ten, a, b, sum(CHU_DE.filter(([, k]) => k >= a && k <= b).map(([t]) => sum(M[t])))]);
[S.de1, S.de2].forEach((id) => theoPhan.forEach(([ten, a, b, k]) => assert.ok(new RegExp(`${ten} \\(${a === b ? "" : `Bài ${a}–${b}: `}[^)]*\\) ${k} câu`).test(bank(id).note), id + ": lời dặn ghi " + ten + " " + k + " câu")));
assert.ok(bank(S.own).note.includes("mỗi lần rút " + theoPhan.map(([ten, , , k]) => k + " câu " + ten).join(", ")), "lời dặn của đề ngẫu nhiên ghi số câu mỗi phần");
assert.ok(bank(S.own).note.includes(theoPhan.map(([ten, a, b]) => ten + (a === b ? "" : ` (Bài ${a}–${b})`)).join(", ")), "lời dặn của đề ngẫu nhiên ghi phạm vi từng phần");
[S.de1, S.de2, S.own].forEach((id) => assert.ok(!/Sở|Thông tư/.test(bank(id).note), id + ": lời dặn không nói tới đề chung của Sở (không có ở lớp 8)"));
// ba mã gắn vào kì thi cuối học kì I của lớp 8
{ const ev = (global.window = global.window || {}, require(path.join(__dirname, "../data/calendar-2026-2027.js")), window.ONTAP_SEED_EVENTS).find((e) => e.id === "ck1-l8");
  assert.ok(ev && Object.values(S).every((id) => ev.banks.includes(id)), "ba mã gắn vào ck1-l8"); assert.ok(/KHTN: Bài 1–19/.test(ev.scope), "phạm vi của ck1-l8 ghi KHTN Bài 1–19"); }

/* ---------- dạng câu ---------- */
assert.ok(kho.every((q) => ["mc", "tf4", "num"].includes(q.type)), "chỉ dùng nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn bằng số (khung Công văn 7991), không có tự luận");
[S.de1, S.de2, S.own].forEach((id) => {
  assert.ok(cauCua(id).filter((q) => q.type === "tf4").length >= 4, id + ": ít nhất 4 câu đúng/sai 4 ý");
  assert.ok(cauCua(id).filter((q) => q.type === "num").length >= 3, id + ": cần câu trả lời bằng số");
});
const kieu = {};
kho.filter((q) => q.type === "tf4").forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.equal(Math.max(...Object.values(kieu)), 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
// lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án (ý của câu đúng/sai giữ thứ tự a, b, c, d)
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau
kho.filter((q) => q.type === "mc").forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 50));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 50));
});
// đáp án đúng là lựa chọn dài nhất hay ngắn nhất: mỗi kiểu không quá một phần ba, cả hai không dưới một phần sáu số câu nhiều lựa chọn của
// mỗi phần (học sinh không loại được hai đầu mà đoán)
const daiNgan = [S.de1, S.de2, S.own].map((id) => {
  const mcs = cauCua(id).filter((q) => q.type === "mc" && new Set(q.o.map((o) => o.length)).size > 1), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  const dai = mcs.filter((q) => hon(q, (a, b) => a > b)).length, ngan = mcs.filter((q) => hon(q, (a, b) => a < b)).length;
  assert.ok(dai * 3 <= mcs.length && ngan * 3 <= mcs.length, `${id}: đáp án đúng dài nhất ở ${dai}, ngắn nhất ở ${ngan} trên ${mcs.length} câu nhiều lựa chọn`);
  assert.ok((dai + ngan) * 6 >= mcs.length, `${id}: đáp án đúng dài nhất hay ngắn nhất ở ${dai + ngan}/${mcs.length} câu nhiều lựa chọn, cần từ một phần sáu`);
  return `${dai} + ${ngan}/${mcs.length}`;
});
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó; nhãn tách theo “. ”, “ và ”, “, ”
{ const phanNhan = (t) => t.split(/\. | và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
  kho.filter((q) => q.type === "mc").forEach((q) => phanNhan(q.topic).forEach((c) => { if (q.o[0].toLowerCase().includes(c)) assert.ok(q.o.every((o) => o.toLowerCase().includes(c)), `đáp án “${q.o[0]}” lặp chữ “${c}” của nhãn chủ đề`); })); }

/* ---------- rút thử ---------- */
const thu = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, pool.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  return d;
};
const seen = new Set();
for (let k = 0; k < 400; k++) thu().questions.forEach((q) => seen.add(Quiz.key(q)));
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm hết một đề cố định: lần rút sau không lấy lại câu của đề đó
pool.pool.from.forEach((id) => { const done = new Set(bank(id).questions.map(Quiz.key)); for (let k = 0; k < 30; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });

/* ---------- đề bài không trùng câu nào khác trong data/banks/8-khtn.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "8-khtn.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: gocChu(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- dò lộ đáp án (Rút ra N5, N24, N8, RS9; như tests/khtn7-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung mọi câu
   của một chủ đề, đề ngẫu nhiên rút chung câu của các chủ đề khác; lời dặn (note) hiện ở màn mở đề nên cũng là “câu kia”. Đáp án là số
   nguyên (từ 10) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”); số thập phân tìm ở vị trí kết quả; đáp án
   bằng chữ có ở câu kia (cả chữ trong hình) thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const KQ = "(?:=|(?:^|[\\s(])(?:là|bằng|được))\\s+";
const SAU = "(?!\\d|,\\d|\\/|°|%|\\s*[·+−×:](?:\\s|\\d|\\())"; // số đứng ngay trước một phép tính là thừa số, số hạng
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const soKQ = (s) => [...String(s).matchAll(new RegExp(KQ + "(\\d{1,3}(?: \\d{3})*)" + SAU, "gu"))].map((m) => val(m[1]));
const kqLa = (s, a) => new RegExp(KQ + esc(a) + SAU, "u").test(s);
const ten = new Map();
[S.de1, S.de2].forEach((id) => cauCua(id).forEach((q, i) => ten.set(q, id.replace("khtn8-ck1-", "") + "#" + (i + 1))));
mine.forEach((q, i) => ten.set(q, "own#" + (i + 1)));
const LOI_DAN = [...new Set([S.de1, S.de2, S.own].map((id) => bank(id).note))].map((note, i) => ({ q: note, x: "", note: true, ten: "note" + (i + 1) }));
const doLo = (qs, name, notes) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so_ = [], kq = [], cum = [];
    const them = (a) => { a = String(a);
      const m = /^(\d{1,3}(?: \d{3})*)(?: ([^\d\s]+))?$/.exec(a);
      if (m) so_.push(val(m[1]));
      else if (/^−?\d[\d ,/]*(?:\s[^\d\s]+)?$/.test(a)) kq.push(a.replace(/ [^\d\s]+$/, ""));
      else if (a.length >= 2) cum.push(a); };
    if (q.type === "num") them(vn(q.ans)); else if (q.type === "mc") them(q.o[0]);
    qs.concat(notes || []).forEach((p) => {
      if (p === q) return;
      const C = p.note ? [p.q] : chuCau(p), T = C.map((s) => s.toLowerCase()), at = `${name(p)} lộ đáp án ${name(q)}: `;
      so_.filter((x) => x >= 10 && C.flatMap(soKQ).includes(x)).forEach((x) => lo.push(at + x));
      kq.filter((a) => C.some((s) => kqLa(s, a))).forEach((a) => lo.push(at + a));
      cum.filter((s) => { const re = new RegExp("(?<![\\p{L}\\p{N}])" + esc(s.toLowerCase()) + "(?![\\p{L}\\p{N}])", "u"); return T.some((t) => re.test(t)); }).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const tenCau = (q) => (q.note ? q.ten : ten.get(q));
const { lo: loDA, chuLo } = doLo(kho, tenCau, LOI_DAN);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác của kho (xem tay):\n" + chuLo.join("\n"));
const DA_XEM = [
];
assert.deepEqual(chuLo.filter((s) => !DA_XEM.includes(s)), [], "đáp án bằng chữ có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loDA, [], "lộ đáp án:\n" + loDA.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 1 500”, “là 2,48”, cả đáp án bằng chữ
{ const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x }), khac = tim("Muốn bổ sung nitrogen cho cây trồng");
  const thuLo = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 10).replace(/:/g, "")); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*? lộ đáp án [^:]*: /, "")); };
  assert.deepEqual(thuLo([tim("Ghế nâng ở một tiệm gội đầu"), gia(khac, "Ví dụ lực = 1 500 N.")]), [1500]);
  assert.deepEqual(thuLo([tim("g sulfur trong khí oxygen theo phương trình"), gia(khac, "Thể tích là 2,48 L.")]), ["2,48"]);
  assert.deepEqual(thuLo([tim("Trong thực tế, để đo nhanh khối lượng riêng"), gia(khac, "Dùng tỉ trọng kế.")]), ["tỉ trọng kế"]);
  assert.deepEqual(thuLo([tim("Ghế nâng ở một tiệm gội đầu"), gia(khac, "Ví dụ 1 500 · 2 = 3 000.")]), []); }

/* ---------- không gần trùng câu của kho KHTN 7, KHTN 9 (lời giao việc; Rút ra N25, như tests/khtn7-ck1.js): đề bài cùng lựa chọn có từ 4
   cặp từ liền nhau chung với một câu của data/banks/7-khtn.js hay data/banks/9-khtn.js và số cặp chung từ một nửa số cặp của câu ít cặp
   hơn thì báo. Cặp từ tính cả số; bỏ cách hỏi chung của đề KHTN (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của các file. ---------- */
{
  const CUM = ["mỗi ý sau đúng hay sai", "hình bên", "nhận xét nào sau đây đúng", "phát biểu nào sau đây đúng", "nào sau đây", "trong các", "chất nào sau đây là",
    "đúng hay sai", "khối lượng mol", "làm tròn kết quả đến chữ số thập phân thứ hai", "ở 25 °c và 1 bar", "dung dịch hydrochloric acid", "dung dịch sodium hydroxide"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/(\d),(?=\d)/g, "$1_").replace(/[^\p{L}\p{N}\s|_]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|") && c.split(" ").some((x) => x.length >= 2)); };
  const cauFile = (file) => BANKS.filter((b) => b.file === file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const khac = cauFile("7-khtn.js").concat(cauFile("9-khtn.js")), ca = khac.concat(kho), df = {};
  assert.ok(cauFile("7-khtn.js").length > 0 && cauFile("9-khtn.js").length > 0, "có kho KHTN 7, KHTN 9 để so");
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const PK = khac.map((p) => [p, capAm(p)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return PK.map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho KHTN 7, KHTN 9:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho KHTN 7, KHTN 9");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, chữ trong hình) và lời dặn không có trong sách; cụm từ chung của môn
   (tên bài, cách hỏi chung, điều kiện 25 °C và 1 bar, lời dặn làm tròn, cách cho khối lượng mol) thay bằng dấu ngăn trước khi so; chuỗi so phải
   có ít nhất 5 từ có chữ. Số liệu: số riêng của một câu (số thập phân, số lớn hơn 40, trừ 100, 1 000, 60, 90, 180, 360 và số có ở từ 5% số
   trang) không có từ ba số cùng ở một trang của KHTN 8 (dò bối cảnh, số liệu của bài tập, ví dụ trong sách; DO_SACH=1 in các trang có từ
   hai số chung để xem). */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ: băm mọi chuỗi k từ của chữ đã chuẩn hoá (một lần cho mỗi chữ, mỗi k), chỉ so thật (includes) khi băm có;
// kết quả như sach.includes(" " + c + " "), ds.filter((o) => o.s.includes(" " + c + " ")) mà không quét lại cả chữ cho mỗi chuỗi
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
const khongDau = nhoChuoi((s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim());
const TU_CHUNG = [...TEN_BAI, "mỗi ý sau đúng hay sai", "nào sau đây", "làm tròn kết quả đến chữ số thập phân thứ hai", "ở 25 °C và 1 bar", "khối lượng mol",
  "dung dịch hydrochloric acid", "dung dịch sodium hydroxide", "lực đẩy Archimedes", "trọng lượng riêng của nước"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
if (SACH.length) {
  assert.ok(SACH.some((f) => /khoa-hoc-tu-nhien-8/.test(f)), "OnUp-Book có Khoa học tự nhiên 8");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chuCau(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q)}: ${c}`)))
    .concat(LOI_DAN.flatMap((d) => chuoi(d.q, k).filter((c) => traChu.co(sach, c)).map((c) => `${d.ten}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // số liệu riêng của từng câu so với từng trang của KHTN 8
  const trang = fs.readFileSync(SACH.find((f) => /khoa-hoc-tu-nhien-8/.test(f)), "utf8").split(/(?==== page-\d+ · )/).map((p) => ({ ten: (/trang in (\d+)/.exec(p) || [])[1], so: new Set((p.match(/\d+(?:[ .]\d{3})*(?:,\d+)?/g) || []).map((x) => x.replace(/[ .](?=\d{3})/g, ""))) }));
  const dfSo = {}; trang.forEach((p) => p.so.forEach((x) => (dfSo[x] = (dfSo[x] || 0) + 1)));
  const soRieng = (q) => [...new Set((chuCau(q).join(" ").match(/\d{1,3}(?: \d{3})+(?:,\d+)?|\d+(?:,\d+)?/g) || []).map((x) => x.replace(/ /g, "")).filter((x) => (/,/.test(x) || (+x > 40 && ![100, 1000, 60, 90, 180, 360].includes(+x))) && (dfSo[x] || 0) < 0.05 * trang.length))];
  const soChung = kho.flatMap((q) => { const s = soRieng(q); return trang.map((p) => [p.ten, s.filter((x) => p.so.has(x))]).filter(([, c]) => c.length >= 2).map(([t, c]) => `${ten.get(q)} ~ trang ${t}: ${c.join("; ")} (câu có ${s.length} số)`); });
  if (process.env.DO_SACH) console.log("Trang sách có từ hai số liệu chung với một câu (xem tay):\n" + soChung.join("\n"));
  const SO_XEM = [
  ];
  assert.deepEqual(soChung.filter((s) => /: (.+) \(/.exec(s)[1].split("; ").length >= 3 && !SO_XEM.includes(s)), [], "trang sách có từ ba số liệu chung với một câu");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && b.file !== "8-khtn.js").flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })))
    .concat(BANKS.filter((b) => b.pool && b.file !== "8-khtn.js").flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " }))));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình (" + [S.de1, S.de2].map((id) => bank(id).questions.length).join(" + ") + " câu của 2 đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu, " + hinh.length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề: " + theoPhan.map(([t, , , k]) => t + " " + k).join(", ") + "; đáp án đúng dài nhất + ngắn nhất ở " + daiNgan.join(", ") + " câu nhiều lựa chọn.");
console.log("MATH OK");
