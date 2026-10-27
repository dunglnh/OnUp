// Kiểm tra ngân hàng Lịch sử và Địa lí 4 cuối năm của Phiên N16b (data/banks/4-lsdl.js, lsdl4-ck2-*), theo mẫu tests/khoahoc4-ck2.js.
// Kho = Đề 1 + Đề 2 (25 câu mỗi đề, chia đúng ma trận) + 25 câu riêng của đề ngẫu nhiên; mỗi ô (chủ đề, mức) có đúng 3 câu: một ở
// mỗi đề cố định, một câu riêng. Câu có hình, có số năm hoặc có thứ tự được nhận ra bằng một đoạn chữ của đề (has, đúng một câu trong
// kho, đúng đề ghi ở id) và tính lại đáp án bằng code: trắc nghiệm o[0], trả lời bằng số ans, sắp xếp o, nối cột l, r. Hình đọc lại
// từ chuỗi SVG: bảng lượng mưa 12 tháng (tháng có lượng mưa từ 100 mm trở lên là mùa mưa, không tháng nào cách 100 mm dưới 20 mm),
// mặt cắt địa hình từ tây sang đông (phần số 1 ở phía tây, cao và bằng phẳng là cao nguyên; số 2 có đỉnh nhọn là dãy núi; số 3 thấp,
// bằng phẳng, sát biển là đồng bằng ven biển), ba vòng thành lồng nhau của Kinh thành Huế (số 3 trong cùng là Tử Cấm thành, sông ở
// phía nam), lược đồ Huế (chùa Thiên Mụ ở phía tây Kinh thành theo mũi tên chỉ hướng bắc; chùa, Kinh thành ở bờ bắc, núi Ngự Bình ở bờ
// nam sông Hương), lược đồ sông Mê Công (nhánh gần số 1 ở phía bắc là sông Tiền). Câu tính số năm: hiệu của năm lớn nhất và năm nhỏ
// nhất ghi trong đề, lời giải ghi đúng phép trừ đó. Câu sắp xếp về năm, vị trí và câu đúng/sai 4 ý về thứ tự thời gian (“A trước khi B”,
// “A và B cách nhau N năm”): so với bảng NAM, VI_DO ghi trong script.
// Rồi kiểm tra mức độ, ma trận (10 Biết, 8 Hiểu, 7 Vận dụng), kiểu Đ/S của câu đúng/sai 4 ý không lặp quá một phần ba, đáp án đúng
// không dài hơn hẳn lựa chọn sai, tên vùng như sách chỉnh sửa năm 2026 (không “Duyên hải miền Trung”, “Tây Nguyên” chỉ trong tên lễ
// hội, “Đông Nam Bộ” chỉ là khu vực, không hỏi “thuộc tỉnh nào”), đề bài không trùng câu nào khác trong file, rút thử nhiều lần (đúng
// ma trận, gặp đủ 75 câu; đã làm hết một đề cố định thì không rút lại câu của đề đó) và dò lộ đáp án giữa các câu rút được cùng lúc
// (khác ô; bộ dò theo tests/khoahoc4-ck2.js): số ở vị trí kết quả, năm của các sự kiện trong câu đúng/sai về thứ tự thời gian, cặp
// nối có cả hai vế, chuỗi của câu sắp xếp;
// đáp án bằng chữ có ở câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM.
// Có sách ở ../OnUp-Book/lop-4/lich-su-dia-li-4/chu.txt (repo riêng tư, mục 4 của docs/KE-HOACH-NOI-DUNG.md) thì so mọi trường chữ
// của câu với chữ OCR của sách sau khi bỏ dấu, gộp nguyên âm và gộp các tên riêng nhiều chữ (tên vùng, tên di sản) thành một từ:
// không có chuỗi 8 từ liền nhau trùng sách; DO_SACH=1 in cả chuỗi 6 từ để xem tay. Không có sách thì bỏ qua bước này. So thêm với
// mọi đề khác trong data/banks/ (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ để xem tay).
// Chạy: node tests/lsdl4-ck2.js → in MATH OK.
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
const S = { de1: "lsdl4-ck2-de1", de2: "lsdl4-ck2-de2", pool: "lsdl4-ck2-ngau-nhien" };

/* ---------- số ---------- */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(",", ".");

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const daDoc = new Set(); // hình đã đọc lại bằng code
const trongHop = (x, y, r) => x >= num(r, "x") && x <= num(r, "x") + num(r, "width") && y >= num(r, "y") && y <= num(r, "y") + num(r, "height");
// số đánh trong vòng tròn: { "1": [x, y], … } (chữ số nằm giữa một circle)
const soTrongVong = (svg) => {
  const out = {};
  tags(svg, "circle").forEach((c) => {
    const t = texts(svg).filter((t) => /^\d$/.test(t.t) && Math.abs(num(t, "x") - num(c, "cx")) < 2 && Math.abs(num(t, "y") - 5 - num(c, "cy")) < 2);
    assert.equal(t.length, 1, "mỗi vòng tròn có đúng một chữ số ở giữa"); out[t[0].t] = [num(c, "cx"), num(c, "cy")];
  });
  return out;
};
// mũi tên chỉ hướng bắc: đường thẳng đứng, đầu tam giác ở trên, chữ B ở trên cùng
const coHuongBac = (svg) => {
  const b = texts(svg).find((t) => t.t === "B"); assert.ok(b, "lược đồ có chữ B chỉ hướng bắc");
  const l = tags(svg, "line").find((l) => num(l, "x1") === num(l, "x2") && Math.abs(num(l, "x1") - num(b, "x")) < 1);
  const tam = tags(svg, "polygon").find((p) => pts(p.points).every(([x]) => Math.abs(x - num(b, "x")) <= 8));
  assert.ok(l && tam, "mũi tên hướng bắc có thân và đầu");
  const dinh = Math.min(...pts(tam.points).map((p) => p[1]));
  assert.ok(dinh < Math.min(num(l, "y1"), num(l, "y2")) && num(b, "y") < dinh + 2, "mũi tên chỉ lên trên, chữ B ở đầu mũi tên");
};
// đường path gồm M, L, Q, C, S (toạ độ tuyệt đối) → các điểm lấy mẫu dọc đường
const mau = (d) => {
  const tk = d.match(/[MLQCS]|-?\d+(\.\d+)?/g), out = []; let i = 0, cur = [0, 0], prevC = null, cmd = "";
  const n = () => +tk[i++];
  while (i < tk.length) {
    if (/[MLQCS]/.test(tk[i])) cmd = tk[i++];
    if (cmd === "M") { cur = [n(), n()]; out.push(cur); prevC = null; }
    else if (cmd === "L") { const p = [n(), n()]; for (let k = 1; k <= 20; k++) out.push([cur[0] + (p[0] - cur[0]) * k / 20, cur[1] + (p[1] - cur[1]) * k / 20]); cur = p; prevC = null; }
    else if (cmd === "Q") { const c = [n(), n()], p = [n(), n()]; for (let k = 1; k <= 40; k++) { const t = k / 40, u = 1 - t; out.push([u * u * cur[0] + 2 * u * t * c[0] + t * t * p[0], u * u * cur[1] + 2 * u * t * c[1] + t * t * p[1]]); } cur = p; prevC = null; }
    else if (cmd === "C" || cmd === "S") {
      const c1 = cmd === "C" ? [n(), n()] : prevC ? [2 * cur[0] - prevC[0], 2 * cur[1] - prevC[1]] : cur, c2 = [n(), n()], p = [n(), n()];
      for (let k = 1; k <= 40; k++) { const t = k / 40, u = 1 - t; out.push([0, 1].map((j) => u * u * u * cur[j] + 3 * u * u * t * c1[j] + 3 * u * t * t * c2[j] + t * t * t * p[j])); }
      prevC = c2; cur = p;
    } else throw new Error("lệnh path chưa đọc được: " + cmd);
  }
  return out;
};
const yTai = (ds, x) => { const p = ds.reduce((a, b) => (Math.abs(b[0] - x) < Math.abs(a[0] - x) ? b : a)); assert.ok(Math.abs(p[0] - x) < 6, "đường đi qua x = " + x); return p[1]; };

// Bảng lượng mưa: hai bảng nhỏ, hàng “Tháng” và hàng “Mưa (mm)”; chữ số tháng, lượng mưa ở giữa ô → [lượng mưa tháng 1 … 12]
const docBangMua = (svg) => {
  daDoc.add(svg);
  const t = texts(svg), hang = (nhan) => t.filter((e) => e.t === nhan).map((e) => num(e, "y"));
  const yThang = hang("Tháng"), yMua = hang("Mưa (mm)");
  assert.equal(yThang.length, 2); assert.equal(yMua.length, 2);
  const mua = {};
  yThang.forEach((y, k) => {
    const thang = t.filter((e) => num(e, "y") === y && /^\d+$/.test(e.t)), muaH = t.filter((e) => num(e, "y") === yMua[k] && /^\d+$/.test(e.t));
    assert.equal(thang.length, 6); assert.equal(muaH.length, 6);
    thang.forEach((e) => { const m = muaH.filter((v) => Math.abs(num(v, "x") - num(e, "x")) < 1); assert.equal(m.length, 1, "lượng mưa thẳng cột tháng " + e.t); mua[+e.t] = +m[0].t; });
  });
  assert.deepEqual(Object.keys(mua).map(Number), [...Array(12).keys()].map((i) => i + 1), "đủ 12 tháng");
  return Object.values(mua);
};
// Mặt cắt địa hình: đường đất liền (polygon), biển (rect bên phải), số 1, 2, 3 đặt trên từng phần → { "1": "Cao nguyên", … }
const docMatCat = (svg) => {
  daDoc.add(svg);
  const dat = pts(tags(svg, "polygon").find((p) => p.fill === "sun-soft").points).filter(([, y]) => y < 200);
  const bien = tags(svg, "rect").find((r) => r.fill === "acc-soft"), so = soTrongVong(svg);
  const tay = texts(svg).find((e) => e.t === "Tây"), dong = texts(svg).find((e) => e.t === "Đông");
  assert.ok(num(tay, "x") < 40 && num(dong, "x") > 280, "phía tây bên trái, phía đông bên phải");
  assert.ok(dat.every(([x]) => x <= num(bien, "x")), "biển ở phía đông của đất liền");
  const yDat = (x) => { // mặt đất (đường gấp khúc của polygon) tại x
    for (let i = 1; i < dat.length; i++) { const [x0, y0] = dat[i - 1], [x1, y1] = dat[i]; if (x0 <= x && x <= x1 && x1 > x0) return y0 + (y1 - y0) * (x - x0) / (x1 - x0); }
    assert.fail("không có mặt đất ở x = " + x);
  };
  const mat = (x) => { // độ cao (y nhỏ là cao) của mặt đất trong khoảng x ± 20
    const ys = [...Array(21).keys()].map((k) => x - 20 + 2 * k).filter((v) => v >= 0 && v <= dat[dat.length - 1][0]).map(yDat);
    return { tren: Math.min(...ys), duoi: Math.max(...ys), ys };
  };
  const out = {};
  Object.entries(so).forEach(([k, [x, y]]) => {
    const m = mat(x); assert.ok(y < m.tren, "số " + k + " đặt trên mặt đất");
    const phang = m.duoi - m.tren <= 10, xaBien = num(bien, "x") - x;
    out[k] = phang && m.tren < 100 ? "Cao nguyên" : !phang && m.tren < 60 ? "Dãy núi" : phang && m.tren > 120 && xaBien < 60 ? "Đồng bằng ven biển" : "?";
  });
  assert.ok(so["1"][0] < so["2"][0] && so["2"][0] < so["3"][0], "số 1, 2, 3 xếp từ tây sang đông");
  assert.deepEqual(out, { 1: "Cao nguyên", 2: "Dãy núi", 3: "Đồng bằng ven biển" }, "các phần của mặt cắt");
  return out;
};
// Ba vòng thành lồng nhau: số đặt trong vòng thứ mấy (đếm từ ngoài) → tên vòng; sông ở phía nam (dưới vòng ngoài cùng)
const docKinhThanh = (svg) => {
  daDoc.add(svg);
  const r = tags(svg, "rect").sort((a, b) => num(b, "width") * num(b, "height") - num(a, "width") * num(a, "height")), so = soTrongVong(svg);
  assert.equal(r.length, 3, "ba vòng thành");
  [1, 2].forEach((i) => { const a = r[i - 1], b = r[i]; assert.ok(num(b, "x") > num(a, "x") && num(b, "y") > num(a, "y") && num(b, "x") + num(b, "width") < num(a, "x") + num(a, "width") && num(b, "y") + num(b, "height") < num(a, "y") + num(a, "height"), "vòng " + (i + 1) + " nằm trong vòng " + i); });
  const TEN = ["Kinh thành", "Hoàng thành", "Tử Cấm thành"], out = {};
  Object.entries(so).forEach(([k, [x, y]]) => { const sau = r.filter((v) => trongHop(x, y, v)).length; out[k] = TEN[sau - 1]; });
  assert.deepEqual(out, { 1: "Kinh thành", 2: "Hoàng thành", 3: "Tử Cấm thành" });
  const song = mau(tags(svg, "path")[0].d), day = num(r[0], "y") + num(r[0], "height");
  assert.ok(song.every(([, y]) => y > day + 5), "sông Hương chảy ở phía nam Kinh thành"); assert.ok(texts(svg).some((e) => e.t === "Sông Hương"));
  return out;
};
// Lược đồ Huế: hướng của chùa Thiên Mụ so với Kinh thành (mũi tên bắc chỉ lên); chùa, Kinh thành ở bờ bắc, núi Ngự Bình ở bờ nam
const docLuocDoHue = (svg) => {
  daDoc.add(svg); coHuongBac(svg);
  const t = texts(svg), song = mau(tags(svg, "path")[0].d);
  const kt = tags(svg, "rect").find((r) => trongHop(num(t.find((e) => e.t === "Kinh thành"), "x"), num(t.find((e) => e.t === "Kinh thành"), "y") - 5, r));
  const nhanChua = t.find((e) => e.t === "Chùa Thiên Mụ"), chua = tags(svg, "rect").find((r) => r.fill === "bad");
  assert.ok(Math.abs(num(chua, "x") + num(chua, "width") / 2 - num(nhanChua, "x")) < 4 && num(chua, "y") > num(nhanChua, "y"), "nhãn chùa Thiên Mụ ghi ngay trên dấu của chùa");
  const nui = pts(tags(svg, "polygon").find((p) => p.fill === "ok-soft").points), nhanNui = t.find((e) => e.t === "Núi Ngự Bình");
  assert.ok(Math.abs(sum(nui.map((p) => p[0])) / 3 - num(nhanNui, "x")) < 4, "nhãn núi Ngự Bình ngay dưới hình núi");
  const tam = (r) => [num(r, "x") + num(r, "width") / 2, num(r, "y") + num(r, "height") / 2];
  const [kx, ky] = tam(kt), [cx, cy] = tam(chua);
  assert.ok(num(kt, "y") + num(kt, "height") < yTai(song, kx), "Kinh thành ở bờ bắc sông Hương");
  assert.ok(cy < yTai(song, cx), "chùa Thiên Mụ ở bờ bắc sông Hương");
  assert.ok(nui.every(([x, y]) => y > yTai(song, x)), "núi Ngự Bình ở bờ nam sông Hương");
  const dx = cx - kx, dy = cy - ky;
  return Math.abs(dx) > Math.abs(dy) ? (dx < 0 ? "Phía tây" : "Phía đông") : dy < 0 ? "Phía bắc" : "Phía nam";
};
// Lược đồ sông Mê Công: thân sông chia hai nhánh; số gần nhánh nào; nhánh ở phía bắc (dưới mũi tên bắc) là sông Tiền
const docMeCong = (svg) => {
  daDoc.add(svg); coHuongBac(svg);
  const p = tags(svg, "path").map((e) => mau(e.d)), so = soTrongVong(svg);
  assert.equal(p.length, 3, "thân sông và hai nhánh");
  const [than, ...nhanh] = p, tach = than[than.length - 1];
  nhanh.forEach((n) => assert.ok(Math.hypot(n[0][0] - tach[0], n[0][1] - tach[1]) < 1, "hai nhánh tách ra từ cuối thân sông"));
  const bien = pts(tags(svg, "polygon").find((e) => e.fill === "acc-soft").points);
  // bờ biển là cạnh huyền của tam giác biển; khoảng cách có dấu đến bờ (dương là phía biển)
  const goc = bien.reduce((a, q) => (q[0] + q[1] > a[0] + a[1] ? q : a)), [A, B] = bien.filter((q) => q !== goc);
  const dau = (P) => ((B[0] - A[0]) * (P[1] - A[1]) - (B[1] - A[1]) * (P[0] - A[0])) / Math.hypot(B[0] - A[0], B[1] - A[1]);
  const phiaBien = Math.sign(dau(goc));
  nhanh.forEach((n) => {
    assert.ok(Math.abs(dau(n[n.length - 1])) <= 3, "mỗi nhánh chảy ra đến bờ biển");
    assert.ok(n.slice(0, -3).every((q) => Math.sign(dau(q)) !== phiaBien), "nhánh sông chảy trên đất liền rồi mới ra biển");
  });
  const gan = (xy) => nhanh.map((n) => Math.min(...n.map((q) => Math.hypot(q[0] - xy[0], q[1] - xy[1])))).reduce((b, d, i, a) => (d < a[b] ? i : b), 0);
  const giua = nhanh.map((n) => n[Math.floor(n.length / 2)][1]), bac = giua[0] < giua[1] ? 0 : 1;
  const out = {}; Object.entries(so).forEach(([k, xy]) => { out[k] = gan(xy) === bac ? "Sông Tiền" : "Sông Hậu"; });
  assert.notEqual(out[1], out[2], "hai số ở hai nhánh khác nhau");
  return out;
};

/* ---------- bảng tra (theo sách Kết nối tri thức bản chỉnh sửa năm 2026, Bài 15–26) ---------- */
// năm của các sự kiện trong câu nối, câu sắp xếp (Kinh thành Huế xây dựng đầu thế kỉ XIX, thời nhà Nguyễn)
const NAM = { "Kinh thành Huế được xây dựng": 1805, "Tôn Thất Thuyết chỉ huy cuộc phản công quân Pháp ở Kinh thành Huế": 1885, "Vua Bảo Đại thoái vị trước cổng Ngọ Môn": 1945 };
// sự kiện gắn với Thành phố Hồ Chí Minh, nhận ra bằng một cụm chữ trong ý của câu đúng/sai 4 ý (sách trang 112–113)
const SU_KIEN = [["Nguyễn Tất Thành ra đi", 1911], ["Chiến dịch Hồ Chí Minh", 1975], ["mang tên Thành phố Hồ Chí Minh", 1976], ["đổi tên", 1976]];
const namTrong = (s) => SU_KIEN.filter(([c]) => s.includes(c)).map(([, y]) => y);
// một ý “A trước khi B” hoặc “A và B cách nhau N năm” → đúng hay sai, theo năm của từng sự kiện
const yThuTu = (s) => {
  let m = /^(.+) trước khi (.+)\.$/.exec(s);
  if (m) { const a = namTrong(m[1]), b = namTrong(m[2]); assert.ok(a.length === 1 && b.length === 1, "nhận ra hai sự kiện: " + s); return a[0] < b[0]; }
  m = /^(.+) cách nhau (\d+) năm\.$/.exec(s);
  assert.ok(m, "ý chưa đọc được: " + s);
  const ys = namTrong(m[1]); assert.equal(ys.length, 2, "nhận ra hai sự kiện: " + s);
  return Math.abs(ys[0] - ys[1]) === +m[2];
};
const namCua = new Map(); // câu đúng/sai 4 ý về thứ tự thời gian → năm của các sự kiện (dò lộ đáp án)
// vĩ độ gần đúng (độ bắc) của các cao nguyên, theo bản đồ địa hình Bài 15
const VI_DO = { "Cao nguyên Kon Tum": 14.4, "Cao nguyên Pleiku": 13.9, "Cao nguyên Đắk Lắk": 12.7, "Cao nguyên Mơ Nông": 12.3, "Cao nguyên Lâm Viên": 12.0, "Cao nguyên Di Linh": 11.6 };
const theoNam = (o) => o.slice().sort((a, b) => NAM[a] - NAM[b]);

const CHECKS = [
  { id: S.de1, has: "lượng mưa trung bình các tháng ở địa điểm A", right: (q) => {
    const m = docBangMua(q.svg), mua = m.map((v, i) => (v >= 100 ? i + 1 : 0)).filter(Boolean);
    m.forEach((v, i) => assert.ok(Math.abs(v - 100) >= 20, `tháng ${i + 1}: ${v} mm quá gần ngưỡng 100 mm`));
    assert.ok(mua.every((t, i) => i === 0 || t === mua[i - 1] + 1), "mùa mưa là các tháng liền nhau");
    mua.forEach((t) => assert.ok(q.x.includes(`${t} (${m[t - 1]} mm)`), "lời giải ghi tháng " + t));
    return `Từ tháng ${mua[0]} đến tháng ${mua[mua.length - 1]}`; } },
  { id: S.pool, has: "mô phỏng địa hình từ tây sang đông", right: (q) => docMatCat(q.svg)[/số (\d)/.exec(q.q)[1]] },
  { id: S.de2, has: "ba vòng thành của Kinh thành Huế", right: (q) => docKinhThanh(q.svg)[/số (\d)/.exec(q.q)[1]] },
  { id: S.pool, has: "Chùa Thiên Mụ nằm ở phía nào", right: (q) => docLuocDoHue(q.svg) },
  { id: S.de2, has: "vẽ sông Mê Công chia thành hai nhánh", right: (q) => {
    const k = /Nhánh số (\d), ở phía bắc/.exec(q.q)[1], m = docMeCong(q.svg);
    assert.equal(m[k], "Sông Tiền", "nhánh số " + k + " nằm ở phía bắc trên lược đồ"); return m[k]; } },
  { id: S.de2, has: "Sắp xếp các cao nguyên sau", right: (q) => q.o.slice().sort((a, b) => VI_DO[b] - VI_DO[a]) },
  { id: S.de2, has: "Sắp xếp các sự kiện sau ở Cố đô Huế", right: (q) => theoNam(q.o) },
  { id: S.de2, has: "Sắp xếp các việc của người làm muối", right: (q) => { // cho nước biển vào ô ruộng → phơi nắng gió → cào muối
    const BUOC = ["nước biển", "nắng gió", "cào"], k = (o) => BUOC.findIndex((b) => o.toLowerCase().includes(b));
    assert.ok(q.o.every((o) => k(o) >= 0) && new Set(q.o.map(k)).size === q.o.length, "mỗi bước làm muối nhận ra được");
    return q.o.slice().sort((a, b) => k(a) - k(b)); } },
  { id: S.de2, has: "về các sự kiện gắn với Thành phố Hồ Chí Minh", right: (q) => {
    namCua.set(q, [...new Set(q.o.flatMap(namTrong))]); return q.o.map(yThuTu); } }
];

const p = bank(S.pool), d1 = bank(S.de1), d2 = bank(S.de2);
assert.ok(p && d1 && d2, "thiếu đề");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "from là Đề 1 và Đề 2");
assert.ok(d1.minutes === 35 && d2.minutes === 35 && p.minutes === 35, "35 phút");
assert.equal(d1.questions.length, 25); assert.equal(d2.questions.length, 25);
const kho = p.questions;
assert.equal(kho.length, 75, "kho 75 câu: 50 câu của hai đề, 25 câu riêng");
let n = 0;
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const want = c.right(q);
  if (q.type === "tf4") assert.deepEqual(q.a, want, at + ": ý đúng, ý sai");
  else if (q.type === "order") assert.deepEqual(q.o, want, at + ": thứ tự " + JSON.stringify(q.o) + ", xếp được " + JSON.stringify(want));
  else { assert.equal(q.o[0], want, at + ": đáp án " + JSON.stringify(q.o[0]) + ", đọc được " + JSON.stringify(want)); assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng"); }
  checked.add(q); n++;
});
// câu tính số năm: đáp án = năm lớn nhất − năm nhỏ nhất ghi trong đề, lời giải ghi đúng phép trừ
kho.filter((q) => q.type === "num").forEach((q) => {
  const nam = (q.q.match(/\b(1[0-9]{3}|20[0-9]{2})\b/g) || []).map(Number), a = Math.max(...nam), b = Math.min(...nam);
  assert.ok(nam.length >= 2 && q.unit === "năm", "câu số năm ghi hai năm và đơn vị năm: " + q.q.slice(0, 50));
  assert.equal(q.ans, a - b, "tính lại số năm: " + q.q.slice(0, 50));
  assert.ok(q.x.includes(`${a} − ${b} = ${a - b}`), "lời giải ghi phép trừ " + `${a} − ${b}`);
  checked.add(q); n++;
});
kho.filter((q) => q.svg || q.type === "num" || q.type === "order" || (q.type === "tf4" && /trước khi|cách nhau/.test(q.o.join(" ")))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));
assert.equal(kho.filter((q) => q.svg).length, 5, "năm câu có hình (bảng lượng mưa, mặt cắt địa hình, Kinh thành Huế, lược đồ Huế, sông Mê Công)");

/* ---------- mức độ và ma trận ---------- */
const M = p.pool.matrix, cells = Object.values(M);
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.deepEqual(Object.keys(M).map((t) => sum(M[t])), [2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2], "13 chủ đề, mỗi chủ đề 1–2 câu: Bắc Trung Bộ và Nam Trung Bộ 14 câu, Nam Bộ 11 câu");
[d1.questions, d2.questions].forEach((d, i) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], Object.keys(M), `Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = kho.filter((q) => q.topic === t && q.lv === l);
  assert.deepEqual(o.map((q) => q.src).sort(), v[l - 1] ? [S.de1, S.de2, S.pool].sort() : [], `ô (${t}, mức ${l}): một câu ở mỗi đề, một câu riêng`);
}));
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 4 && !kho.some((q) => q.type === "essay"), "ít nhất 4 câu đúng/sai 4 ý, không có câu tự luận");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) <= Math.ceil(tf4.length / 3), "kiểu Đ/S của các câu đúng/sai 4 ý lặp nhiều quá: " + JSON.stringify(kieu));
["match", "order", "fill", "num", "tf", "tf4"].forEach((t) => assert.ok(kho.some((q) => q.type === t), "kho có câu dạng " + t));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2; ngưỡng như tests/lsdl-gdcd6-ck2.js)
kho.filter((q) => q.type === "mc").forEach((q) => { const m = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60)); });
// nối cột: mỗi ô bên phải chỉ một ô bên trái (không có ô phải trùng nhau), có ô thừa; không nối được chỉ nhờ chữ trùng
const tu = (s) => new Set(String(s).toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 1));
kho.filter((q) => q.type === "match").forEach((q) => {
  assert.equal(new Set(q.r).size, q.r.length); assert.ok(q.r.length === q.l.length + 1, "nối cột có một ô thừa");
  q.l.forEach((l, i) => { if (/^Năm \d{4}$/.test(q.r[i])) return; const chung = [...tu(l)].filter((w) => tu(q.r[i]).has(w)); assert.deepEqual(chung, [], `cặp nối “${l} → ${q.r[i]}” có chữ trùng`); });
});
// tên vùng như sách chỉnh sửa năm 2026 (mục 3.4 của docs/KE-HOACH-NOI-DUNG.md); nơi đã sáp nhập năm 2025 không hỏi “thuộc tỉnh nào”
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], q.ans && typeof q.ans !== "number" ? q.ans : []).map(String);
kho.forEach((q) => chu(q).forEach((s) => {
  assert.ok(!/duyên hải miền trung/i.test(s), "không dùng “Duyên hải miền Trung”: " + s);
  assert.ok(!/Tây Nguyên/.test(s.replace(/Cồng chiêng Tây Nguyên/g, "")), "“Tây Nguyên” chỉ có trong tên lễ hội, không gian văn hoá cồng chiêng: " + s);
  assert.ok(!/Đông Nam Bộ/.test(s.replace(/khu vực Đông Nam Bộ/g, "")), "“Đông Nam Bộ” chỉ dùng như khu vực của vùng Nam Bộ: " + s);
  assert.ok(!/thuộc (tỉnh|thành phố) nào|ở tỉnh nào/i.test(s), "không hỏi “thuộc tỉnh nào”: " + s);
}));
const seen = new Set();
for (let k = 0; k < 400; k++) {
  const d = Quiz.draw(p);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, 25);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.equal(seen.size, 75, "400 lần rút thử phải gặp đủ 75 câu của kho");
// học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên không rút lại câu của đề đó; làm hết cả hai đề thì rút đúng 25 câu riêng
[[S.de1], [S.de2], [S.de1, S.de2]].forEach((lam) => {
  const hist = (q) => (lam.includes(q.src) ? { done: 1, wrong: 0 } : null);
  for (let k = 0; k < 30; k++) {
    const d = Quiz.draw(p, hist);
    assert.equal(d.notes.length, 0); assert.equal(d.questions.length, 25);
    assert.ok(d.questions.every((q) => !lam.includes(q.src)), `đã làm hết ${lam.join(", ")} thì không rút lại câu của các đề đó`);
  }
});

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "4-lsdl.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.filter((d) => /-ck2-/.test(d.at)).forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- dò lộ đáp án (Rút ra N5) giữa hai câu rút được cùng lúc: khác ô (chủ đề, mức); mọi ô của kho này rút 1 câu, và mỗi đề
   cố định có một câu mỗi ô, nên hai câu cùng ô không bao giờ cùng một đề. Số (từ hai chữ số) chỉ tìm ở vị trí kết quả của câu kia;
   câu đúng/sai về thứ tự thời gian: năm của các sự kiện không có ở câu kia; cặp nối: câu kia có cả hai vế; câu sắp xếp: câu kia có cả chuỗi
   (“A → B → C”). Lựa chọn đúng, đáp án điền có ở câu kia thì in ra với DO_LO=1, danh sách đã xem ở DA_XEM. ---------- */
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,]| \d)/gu)].map((m) => val(m[1]));
const coCum = (t, s) => { for (let i = t.indexOf(s); i >= 0; i = t.indexOf(s, i + 1)) if (!/[\p{L}\p{N}]/u.test(t[i - 1] || " ") && !/[\p{L}\p{N}]/u.test(t[i + s.length] || " ")) return true; return false; };
const doLo = (qs, tenCau) => {
  const lo = [], chuLo = [];
  qs.forEach((q, i) => {
    const so = q.type === "num" && q.ans >= 10 ? [q.ans] : [];
    const cum = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const nam = (namCua.get(q) || []).map(String);
    const xep = q.type === "order" ? [q.o.join(" → ").toLowerCase()] : [];
    qs.forEach((p2, j) => {
      if (j === i || (p2.topic === q.topic && p2.lv === q.lv)) return;
      const C = chu(p2), T = C.map((s) => s.toLowerCase()), at = `${tenCau(p2)} → ${tenCau(q)}: `;
      so.filter((x) => C.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      nam.filter((y) => T.some((t) => coCum(t, y))).forEach((y) => lo.push(at + "năm " + y));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l.toLowerCase()) && coCum(t, r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      xep.filter((s) => T.some((t) => t.includes(s))).forEach((s) => lo.push(at + s));
      cum.filter((s) => T.some((t) => coCum(t, s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("lsdl4-ck2-", "") + "#" + (i + 1))));
const r = doLo(kho, (q) => ten.get(q));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + r.chuLo.join("\n"));
// đã xem (Phiên N16b): “cao nguyên” ở các câu kia là tên vùng, tên cao nguyên (vùng cao nguyên, cao nguyên Mơ Nông…), không cho biết
// phần nào của mặt cắt là cao nguyên; “phía tây” ở các câu kia nói về địa hình, vị trí của cả vùng, không nói chùa Thiên Mụ ở phía nào
// Kinh thành; “Đinh Núp” ở de1#7 chỉ là một lựa chọn sai (tên người), không cho biết ông là người dân tộc nào.
const DA_XEM = [
  "de1#7 → ngau-nhien#1: Cao nguyên", "de1#13 → ngau-nhien#1: Cao nguyên", "de1#14 → ngau-nhien#1: Cao nguyên", "de2#8 → ngau-nhien#1: Cao nguyên",
  "de2#17 → ngau-nhien#1: Cao nguyên",
  "ngau-nhien#1 → ngau-nhien#10: Phía tây", "de1#1 → ngau-nhien#10: Phía tây", "de2#1 → ngau-nhien#10: Phía tây", "de2#13 → ngau-nhien#10: Phía tây",
  "de1#7 → de2#8: Đinh Núp"
];
assert.deepEqual(r.chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(r.lo, [], "lộ đáp án:\n" + r.lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 72”, năm của câu nối, cả hai vế một cặp nối, cả chuỗi của câu sắp xếp,
// lựa chọn đúng
const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
const thu = (qs) => { const k = doLo(qs, (q) => q.q.slice(0, 12)); return k.lo.concat(k.chuLo).map((s) => s.replace(/^.*: /, "")); };
const khac = tim("Đỉnh núi cao nhất vùng Nam Bộ");
assert.deepEqual(thu([tim("Anh hùng Núp nhận danh hiệu"), gia(khac, "Ví dụ: 2027 − 1955 = 72.")]), ["72"]);
assert.deepEqual(thu([tim("về các sự kiện gắn với Thành phố Hồ Chí Minh"), gia(khac, "Năm 1911 là năm đáng nhớ.")]), ["năm 1911"]);
assert.deepEqual(thu([tim("Nối mỗi lễ hội ở vùng Bắc Trung Bộ"), gia(khac, "Lễ hội Ka-tê của đồng bào Chăm rất vui.")]), ["Lễ hội Ka-tê → Đồng bào Chăm"]);
assert.deepEqual(thu([tim("Sắp xếp các cao nguyên sau"), gia(khac, "Thứ tự: Cao nguyên Kon Tum → Cao nguyên Pleiku → Cao nguyên Đắk Lắk → Cao nguyên Di Linh.")]), ["cao nguyên kon tum → cao nguyên pleiku → cao nguyên đắk lắk → cao nguyên di linh"]);
assert.deepEqual(thu([tim("ai đã dựng nên Chùa Cầu"), gia(khac, "Thương nhân Nhật Bản từng buôn bán ở đây.")]), ["Thương nhân Nhật Bản"]);
// bộ đọc ý về thứ tự thời gian: đổi một ý thì kết quả đổi theo
assert.equal(yThuTu("Chiến dịch Hồ Chí Minh toàn thắng và việc thành phố đổi tên cách nhau 1 năm."), true);
assert.equal(yThuTu("Thành phố đã mang tên Thành phố Hồ Chí Minh trước khi có Chiến dịch Hồ Chí Minh."), false);

/* ---------- không chép sách, không trùng kho khác: so chuỗi từ sau khi bỏ dấu, gộp nguyên âm, gộp tên riêng nhiều chữ ---------- */
const GOP = [["thanh pho ho chi minh", "tphcm"], ["bac trung bo va nam trung bo", "btbntb"], ["trung du va mien nui phia bac", "tdmnpb"], ["dong bang song cuu long", "dbscl"],
  ["dong bang bac bo", "dbbb"], ["thanh pho ho chi minh", "tphcm"], ["le hoi cong chieng tay nguyen", "lhcctn"],
  ["khong gian van hoa cong chieng tay nguyen", "kgvhcctn"], ["quan the di tich co do hue", "qtdtcdh"], ["anh hung luc luong vu trang nhan dan", "ahllvtnd"],
  ["vuon quoc gia phong nha ke bang", "vqgpnkb"], ["le khao le the linh hoang sa", "lkltlhs"], ["di san van hoa phi vat the", "dsvhpvt"],
  ["kiet tac truyen khau va phi vat the cua nhan loai", "kttkpvtcnl"], ["van mieu quoc tu giam", "vmqtg"],
  // tên người, tên phong trào, tên lễ hội và tên gọi cũ của thành phố: mỗi tên tính là một từ
  ["binh tay dai nguyen soai", "btdns"], ["nguyen trung truc", "ntt1"], ["nguyen thi dinh", "ntd"], ["truong dinh", "td"], ["nguyen tat thanh", "ntt2"],
  ["nguyen sinh cung", "nsc"], ["huynh thuc khang", "htk"], ["phan boi chau", "pbc"], ["phan chau trinh", "pct"], ["ton that thuyet", "ttt"],
  ["n trang long", "ntl"], ["ho chi minh", "hcm"], ["khoi nghia huong khe", "knhk"], ["phong trao duy tan", "ptdt"], ["phong trao chong thue", "ptct"],
  ["phong trao xo viet nghe tinh", "ptxvnt"], ["dem pho co", "dpc"], ["le hoi den long", "lhdl"], ["sai gon", "sg"], ["cho lon", "cl"], ["gia dinh", "gd"]];
// câu nói được trích nguyên văn (có ghi người nói) không tính là chép sách
const TRICH = ["Bao giờ người Tây nhổ hết cỏ nước Nam thì mới hết người Nam đánh Tây"];
const khongDau = (s) => { let t = TRICH.reduce((a, c) => a.split(c).join(" "), String(s)).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
  GOP.forEach(([a, b]) => { t = t.split(a).join(b); }); return t.replace(/[aeiouy]+/g, "a"); };
const trungVoi = (nguon) => { const v = " " + nguon + " "; return (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k).join(" "); if (v.includes(" " + c + " ")) ra.push(c); } return ra; }; };
const SACH = path.join(__dirname, "../../OnUp-Book/lop-4/lich-su-dia-li-4/chu.txt");
if (fs.existsSync(SACH)) {
  const trung = trungVoi(khongDau(fs.readFileSync(SACH, "utf8").replace(/=== page-\d+ · [^=]* ===/g, " ")));
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => trung(s, k).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của sách Lịch sử và Địa lí 4 (OnUp-Book).");
} else console.log("Không có ../OnUp-Book/lop-4/lich-su-dia-li-4/chu.txt: bỏ qua bước so với chữ của sách.");
{
  const khac = BANKS.filter((b) => !b.pool && !/^lsdl4-ck2-/.test(b.id)).flatMap((b) => b.questions.flatMap((q) => chu(q))).join(" \n ");
  const trung = trungVoi(khongDau(khac).replace(/\n/g, " "));
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => trung(s, k).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng đề khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng đề khác trong data/banks/");
}
console.log(n, "câu đã tính lại hoặc đọc lại hình; kho " + kho.length + " câu, ma trận 10 – 8 – 7 trên " + Object.keys(M).length + " chủ đề.");
console.log("MATH OK");
