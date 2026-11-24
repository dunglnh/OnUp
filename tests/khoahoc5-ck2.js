// Kiểm tra ngân hàng Khoa học 5 cuối năm của Phiên N5-ck2-khoahoc (data/banks/5-khoahoc.js, khoahoc5-ck2-*), theo mẫu tests/khoahoc5-ck1.js
// và các ý chung của các phiên lớp 5 (đoạn “Chung của các phiên lớp 5” ở mục 7 của docs/KE-HOACH-NOI-DUNG.md). Kho = Đề 1 + Đề 2 + câu riêng
// của đề ngẫu nhiên; số câu, số đề lấy từ danh mục (không ghi cứng).
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho), theo các bảng ghi trong script (theo sách
// Khoa học 5 in năm 2026, Bài 18–29):
// - sơ đồ trong hình (ô có chữ, mũi tên từ ô trước đến ô sau): sự hình thành cơ thể người (HINH_THANH: trứng và tinh trùng → hợp tử → phôi →
//   thai nhi → em bé), các giai đoạn phát triển chính (GIAI_DOAN, theo đúng thứ tự); ô “?” là giai đoạn còn thiếu;
// - giai đoạn và độ tuổi (GIAI_DOAN: tuổi ấu thơ đến 9 tuổi, vị thành niên 10–19, trưởng thành 20–60, tuổi già trên 60), các giai đoạn của tuổi
//   ấu thơ và đặc điểm (AU_THO), tuổi bắt đầu dậy thì (DAY_THI), thời gian mang thai (THAI_KI);
// - vi khuẩn có ích hay gây bệnh và việc chúng làm (VI_KHUAN), bệnh tả: việc làm có làm vi khuẩn tả lây vào người không (TA_LAY), các biểu hiện
//   theo thứ tự (TA_BIEU_HIEN); nhiệt độ, thời gian ủ (NHIET: vi khuẩn lactic muối chua 30–50 °C, sữa chua ủ 40–50 °C trong 8–12 giờ);
// - đặc điểm sinh học hay xã hội (DAC_DIEM), chức năng của môi trường (CHUC_NANG), yếu tố của môi trường (YEU_TO), tài nguyên thiên nhiên
//   (TAI_NGUYEN), tác động tích cực hay tiêu cực (TAC_DONG), các ý của câu đúng/sai 4 ý (Y_DUNG_SAI), các phép tính (giờ ủ xong, số năm).
// Rồi kiểm tra mức độ, ma trận (10 Biết, 8 Hiểu, 7 Vận dụng trên 10 chủ đề theo tên bài; hai đề cố định và câu riêng đều chia đúng ma trận, mỗi
// ô có rút 3 câu), dạng câu (ít nhất 2 câu đúng/sai 4 ý, kiểu Đ/S không lặp), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất
// hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn, không lặp chữ của nhãn chủ đề, lời giải không nhắc vị
// trí phương án, gọi người làm bài là “bạn”, chữ như sách (khoẻ, hoá, tuỷ, huỷ), note (phạm vi, đề chung của Sở, ôn thêm đề cuối kì I, đề
// cương của trường), chữ trong hình từ cỡ 13 và nằm trong khung hình, đề bài không trùng, rút thử (đúng ma trận, gặp đủ kho; đã làm hết một đề
// cố định thì không rút lại câu của đề đó), dò lộ đáp án giữa mọi cặp câu của kho và lời dặn (như tests/khoahoc5-ck1.js; đã xem ghi ở
// DA_XEM), đề bài không gần trùng câu của data/banks/4-khoahoc.js và của kho Khoa học 5 cuối kì I (cặp hai âm tiết liền nhau chung). Có
// ../OnUp-Book (repo riêng tư): mọi trường chữ, cả chữ trong hình, không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp
// nguyên âm; DO_SACH=1 in chuỗi 6 từ). So thêm với mọi câu của các kho khác, cả câu riêng của các đề ngẫu nhiên: không có chuỗi 8 từ trùng;
// DO_KHO=1 in chuỗi 6 từ và câu gần trùng kho lớp 4, kho cuối kì I.
// Chạy: node tests/khoahoc5-ck2.js → in KHOAHOC5 CK2 OK. DO_LO=1 in đáp án bằng chữ có ở câu khác để người làm xem.
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
const S = { de1: "khoahoc5-ck2-de1", de2: "khoahoc5-ck2-de2", pool: "khoahoc5-ck2-ngau-nhien" };
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
  const cal = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ck2 = /id: "ck2-l5"[\s\S]*?banks: \[([^\]]*)\]/.exec(cal);
  assert.ok(ck2, "lịch có kì ck2-l5");
  DE.concat(S.pool).forEach((id) => assert.ok(ck2[1].includes(`"${id}"`), id + " gắn vào ck2-l5"));
  assert.ok(/id: "ck2-l5"[\s\S]*?Khoa học: Bài 18–29\./.test(cal), "phạm vi của ck2-l5 ghi Khoa học: Bài 18–29");
}
const ten = new Map();
DE.concat(S.pool).forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("khoahoc5-ck2-", "").replace("ngau-nhien", "own") + "#" + (i + 1))));

/* ---------- hình SVG ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const pts2 = (s) => { const v = nums(s), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]]); return p; };
const TAGS = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const RECTS = (svg) => TAGS(svg, "rect").map((a) => ({ x: +a.x, y: +a.y, w: +a.width, h: +a.height, fill: a.fill || "none", stroke: a.stroke || "none" }));
const LINES = (svg) => TAGS(svg, "line").map((a) => ({ a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], w: +(a["stroke-width"] || 1), stroke: a.stroke || "none" }));
const POLYS = (svg) => TAGS(svg, "polygon").map((a) => ({ p: pts2(a.points), fill: a.fill || "none" }));
const TEXTS = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start", b: a["font-weight"] === "700" }; });
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const trongHop = (p, r, pad = 0) => p[0] >= r.x - pad && p[0] <= r.x + r.w + pad && p[1] >= r.y - pad && p[1] <= r.y + r.h + pad;
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
/* Sơ đồ: mỗi ô là một rect có đúng một chữ ở giữa (chữ trong ô nằm trọn trong ô); mũi tên là line (gốc sát ô trước) và polygon tam giác (đỉnh
   đầu là mũi nhọn, sát ô sau; trung điểm hai đỉnh còn lại là cuối line). Chữ ngoài ô (như “thụ tinh”) không phải ô. Trả về { o: tên các ô,
   mui: [[ô trước, ô sau]…] }. */
const docSoDo = (svg) => {
  daDoc.add(svg);
  const T = TEXTS(svg), o = RECTS(svg).map((r) => {
    const c = T.filter((t) => trongHop([t.at[0], t.at[1] - 5], r)); assert.equal(c.length, 1, "mỗi ô một chữ");
    const w = rong(c[0]); assert.ok(c[0].anchor === "middle" && Math.abs(c[0].at[0] - (r.x + r.w / 2)) < 1 && w <= r.w - 4, `chữ “${c[0].t}” nằm giữa và vừa trong ô`);
    return Object.assign(r, { ten: c[0].t });
  });
  assert.equal(new Set(o.map((r) => r.ten)).size, o.length, "tên các ô không trùng");
  const sat = (p) => { const g = o.filter((r) => trongHop(p, r, 6)); assert.equal(g.length, 1, `điểm (${p}) phải sát đúng một ô`); return g[0].ten; };
  const L = LINES(svg), P = POLYS(svg).map((g) => g.p);
  assert.equal(L.length, P.length, "mỗi mũi tên một đầu nhọn");
  const mui = L.map((l) => {
    const d = P.find((p) => dist([(p[1][0] + p[2][0]) / 2, (p[1][1] + p[2][1]) / 2], l.b) < 1); assert.ok(d, "đầu nhọn nằm ở cuối mũi tên");
    return [sat(l.a), sat(d[0])];
  });
  return { o: o.map((r) => r.ten), mui };
};

/* ---------- bảng tra (theo sách Khoa học 5 in năm 2026 và lời giải của câu) ---------- */
// sự hình thành cơ thể người (Bài 22): trứng của mẹ và tinh trùng của bố → (thụ tinh) hợp tử → phôi → thai nhi → em bé được sinh ra
const HINH_THANH = { "Trứng": "Hợp tử", "Tinh trùng": "Hợp tử", "Hợp tử": "Phôi", "Phôi": "Thai nhi", "Thai nhi": "Em bé" };
const THAI_KI = 9; // khoảng 9 tháng sau thụ tinh, em bé được sinh ra
// các giai đoạn phát triển chính (Bài 23, theo thứ tự) và độ tuổi: tuổi già là trên 60 tuổi
const GIAI_DOAN = [["Tuổi ấu thơ", 0, 9], ["Tuổi vị thành niên", 10, 19], ["Tuổi trưởng thành", 20, 60], ["Tuổi già", 61, Infinity]];
const giaiDoan = (tuoi) => GIAI_DOAN.find(([, a, b]) => tuoi >= a && tuoi <= b)[0];
const batDau = (ten) => GIAI_DOAN.find(([t]) => t === ten)[1];
// các giai đoạn của tuổi ấu thơ và đặc điểm (Bài 23, Hình 2)
const AU_THO = [
  { ten: "Dưới 1 tuổi", dac: ["sữa mẹ"] },
  { ten: "Từ 1 đến dưới 3 tuổi", dac: ["đủ răng sữa", "bắt đầu biết nói", "đi vững"] },
  { ten: "Từ 3 đến 5 tuổi", dac: ["nói rõ", "kể lại", "tô màu", "nặn", "cao lên chậm"] },
  { ten: "Từ 6 đến 9 tuổi", dac: ["thay răng", "tự chăm sóc", "học tập"] }
];
const DAY_THI = { nữ: [8, 13], nam: [9, 14] }; // tuổi bắt đầu dậy thì (Bài 23, Em có biết)
// tuổi già (Bài 23): sức khoẻ, sự nhạy bén của các giác quan, trí nhớ giảm dần nhưng vẫn đóng góp cho gia đình, xã hội; nên vận động phù hợp
const TUOI_GIA = { giam: /giảm dần/, gop: /giúp ích|đóng góp|góp sức/ };
// vi khuẩn có ích hay gây bệnh và việc chúng làm (Bài 19, 20); làm bánh mì nở xốp là nấm men, không phải vi khuẩn
const VI_KHUAN = { "Vi khuẩn lactic": { ich: true, viec: "Làm sữa thành sữa chua" }, "Vi khuẩn tả": { ich: false, viec: "Gây tiêu chảy, nôn mửa" },
  "Vi khuẩn trong khoang miệng": { ich: false, viec: "Gây sâu răng" } };
const NAM_MEN = "Làm bánh mì nở xốp";
// bệnh tả (Bài 20): lây qua đường tiêu hoá; việc làm có thể làm vi khuẩn tả lây vào người; biểu hiện theo thứ tự
const TA_LAY = { "gỏi cá": true, "ruồi": true, "đã đun sôi": false, "tay chưa rửa": true };
const TA_BIEU_HIEN = ["Đầy bụng, sôi bụng", "Đi ngoài nhiều lần, nôn mửa", "Cơ thể mất nước, mệt lả"];
// nhiệt độ, thời gian (Bài 19): vi khuẩn lactic muối chua hoạt động tốt 30–50 °C; sữa chua ủ 40–50 °C trong 8–12 giờ
const NHIET = { muoiChua: [30, 50], suaChua: [40, 50], uSuaChua: [8, 12] };
const DAC_DIEM = { "mọc râu": "sinh học", "cờ vua": "xã hội", "tóc dài": "xã hội", "lái xe": "xã hội", "nấu ăn": "xã hội" };
const CHUC_NANG = { "gặm cỏ": "Cung cấp thức ăn", "che chở": "Bảo vệ khỏi những tác động bên ngoài", "phân trâu": "Chứa đựng chất thải của sinh vật" };
const YEU_TO = ["ánh sáng", "không khí", "đất", "nước", "nhiệt độ"];
const TAI_NGUYEN = ["dầu mỏ", "than đá", "nước", "gió", "ánh sáng mặt trời", "khoáng sản"];
const TAC_DONG = { "chặt cây non": false, "trồng cây": true, "dầu nhớt": false, "tái chế": true }; // tích cực đến môi trường hay không
const BANG_VS = [3, 4]; // thay băng vệ sinh từ 3 đến 4 giờ một lần (Bài 25)
const tra = (bang, s) => { const k = Object.keys(bang).filter((m) => low(s).includes(low(m))); assert.equal(k.length, 1, `“${s}”: cần đúng một mục trong bảng, có ${k.join(", ") || "không"}`); return bang[k[0]]; };
const motDung = (q, f) => { const d = q.o.map(f); assert.deepEqual(d.map(Boolean), q.o.map((o, i) => i === 0), "chỉ lựa chọn đầu khớp: " + q.q.slice(0, 50)); return q.o[0]; };
const so = (re, s) => { const m = re.exec(s); assert.ok(m, `không đọc được ${re} trong: ${s.slice(0, 60)}`); return +m[1]; };

// ý của câu đúng/sai 4 ý: mỗi ý khớp đúng một mục (đoạn chữ → đúng hay sai, theo sách)
const Y_DUNG_SAI = {
  // dưa muối, sữa chua (Bài 19)
  "để được lâu hơn rau tươi": true, "mất hết chất dinh dưỡng": false, "có sẵn trong tự nhiên được dùng để muối dưa": true, "bị thối, có mùi hôi": false,
  // thai nhi (Bài 22): phôi 1 tháng nhỏ hơn hạt đậu xanh, 3 tháng có hình dạng người, tháng thứ chín các cơ quan gần như hoàn thiện
  "to bằng quả bưởi": false, "trong tử cung của người mẹ": true, "ba tháng tuổi, thai nhi đã có hình dạng người": true, "vẫn chưa hình thành": false,
  // tuổi vị thành niên (Bài 23)
  "nối tiếp giữa trẻ em và người lớn": true, "phần đầu của tuổi vị thành niên": true, "hoóc-môn sinh dục": true, "lực lượng lao động chủ yếu": false,
  // vệ sinh cơ thể (Bài 25)
  "lau khô người": true, "còn ẩm": false, "khăn bẩn": false, "gội đầu thường xuyên": true
};
const yDungSai = (o) => {
  const k = Object.keys(Y_DUNG_SAI).filter((m) => low(o).includes(low(m)));
  if (k.length === 1) return Y_DUNG_SAI[k[0]];
  assert.equal(k.length, 0, "ý khớp nhiều mục: " + o);
  if (/vi khuẩn tả/.test(low(o)) || Object.keys(TA_LAY).some((m) => low(o).includes(m))) return tra(TA_LAY, o);
  return tra(TAC_DONG, o);
};

/* ---------- kiểm tra từng câu: has (chữ có trong đề bài), right(q) (đáp án tính bằng code) ---------- */
const CHECKS = [
  // vi khuẩn có ích trong chế biến thực phẩm
  { has: "dưa nhanh chua nhất?", right: (q) => motDung(q, (o) => { const t = so(/(\d+) °C/, o); return t >= NHIET.muoiChua[0] && t <= NHIET.muoiChua[1]; }) },
  { has: "Sữa chua thường được ủ từ", right: (q) => {
    const a = so(/ủ từ (\d+) đến/, q.q), b = so(/đến (\d+) giờ/, q.q), bd = so(/lúc (\d+) giờ/, q.q);
    assert.deepEqual([a, b], NHIET.uSuaChua, "thời gian ủ sữa chua theo sách"); assert.ok(/lâu nhất/.test(q.q));
    const kq = bd + b - 24; assert.ok(kq > 0 && kq < 12 && q.x.includes(`${bd} + ${b} = ${bd + b}`) && q.x.includes(`${bd + b} − 24 = ${kq}`)); return kq; } },
  { has: "Sữa chua làm xong nên được cất giữ ở đâu?", right: (q) => q.o.find((o) => /^Ngăn mát/.test(o)) },
  { has: "Mỗi ý sau về dưa muối và sữa chua đúng hay sai?", right: (q) => q.o.map(yDungSai) },
  // vi khuẩn gây bệnh ở người
  { has: "Nối mỗi loại vi khuẩn với việc nó làm.", right: (q) => {
    assert.ok(q.r.includes(NAM_MEN) && !q.l.includes(NAM_MEN), "ô thừa là việc của nấm men");
    assert.deepEqual(q.l.map((l) => VI_KHUAN[l].ich), [true, false, false], "một vi khuẩn có ích, hai vi khuẩn gây bệnh");
    return q.l.map((l) => VI_KHUAN[l].viec); } },
  { has: "có thể làm vi khuẩn tả lây vào người", right: (q) => q.o.map(yDungSai) },
  { has: "biểu hiện của người mắc bệnh tả", right: () => TA_BIEU_HIEN },
  // sự hình thành cơ thể người
  { has: "vẽ các bước từ khi thụ tinh", right: (q) => {
    const s = docSoDo(q.svg); assert.equal(s.o.length, Object.keys(HINH_THANH).length + 1, "sáu ô");
    const hoi = s.o.filter((t) => t === "?"); assert.equal(hoi.length, 1, "một ô “?”");
    const dap = Object.values(HINH_THANH).find((v) => !s.o.includes(v)); assert.ok(dap, "ô “?” là một bước của sự hình thành");
    const ra = (t) => (t === "?" ? dap : t);
    assert.deepEqual(s.mui.map(([a, b]) => ra(a) + "→" + ra(b)).sort(), Object.entries(HINH_THANH).map(([a, b]) => a + "→" + b).sort(), "mũi tên đúng thứ tự các bước");
    return motDung(q, (o) => o === dap); } },
  { has: "khoảng bao lâu sau thì em bé được sinh ra?", right: (q) => motDung(q, (o) => o === `Khoảng ${THAI_KI} tháng`) },
  { has: "Mỗi ý sau về sự lớn lên của thai nhi", right: (q) => q.o.map(yDungSai) },
  // các giai đoạn phát triển của con người
  { has: "vẽ các giai đoạn phát triển chính của con người theo thứ tự", right: (q) => {
    const s = docSoDo(q.svg), thu = GIAI_DOAN.map(([t]) => t); assert.equal(s.o.length, thu.length, "bốn ô");
    const dap = thu.find((t) => !s.o.includes(t)); assert.ok(dap && s.o.includes("?"), "ô “?” là giai đoạn còn thiếu");
    const sau = Object.fromEntries(s.mui); assert.equal(s.mui.length, thu.length - 1, "ba mũi tên");
    thu.slice(0, -1).forEach((t, i) => assert.equal(sau[t === dap ? "?" : t], thu[i + 1] === dap ? "?" : thu[i + 1], "mũi tên đi từ " + t + " sang giai đoạn kế tiếp"));
    return motDung(q, (o) => o === dap); } },
  { has: "tuổi trưởng thành của con người kéo dài", right: (q) => { const [, a, b] = GIAI_DOAN.find(([t]) => t === "Tuổi trưởng thành"); return motDung(q, (o) => o === `Từ ${a} đến ${b} tuổi`); } },
  { has: "nguồn dinh dưỡng chính của trẻ là:", right: (q) => { assert.ok(/6 tháng đầu/.test(q.q) && AU_THO[0].dac.includes("sữa mẹ")); return motDung(q, (o) => /sữa mẹ/i.test(o)); } },
  { has: "Cốm có thể đang ở độ tuổi nào?", right: (q) => {
    const diem = AU_THO.map((g) => g.dac.filter((d) => low(q.q).includes(d)).length), max = Math.max(...diem);
    assert.equal(diem.filter((d) => d === max).length, 1, "đặc điểm trong đề chỉ khớp một giai đoạn"); return AU_THO[diem.indexOf(max)].ten; } },
  { has: "Ai trong số đó đang ở tuổi già?", right: (q) => motDung(q, (o) => giaiDoan(so(/\((\d+) tuổi\)/, o)) === "Tuổi già") },
  { has: "bước vào tuổi vị thành niên?", right: (q) => { const t = so(/lên (\d+) tuổi/, q.q), kq = batDau("Tuổi vị thành niên") - t; assert.equal(giaiDoan(t), "Tuổi ấu thơ"); assert.ok(q.x.includes(`10 − ${t} = ${kq}`)); return kq; } },
  { has: "Mỗi ý sau về tuổi vị thành niên", right: (q) => q.o.map(yDungSai) },
  { has: "Nhận xét nào đúng về người ở tuổi già?", right: (q) => motDung(q, (o) => TUOI_GIA.giam.test(o) && TUOI_GIA.gop.test(o)) },
  { has: "Giải thích nào đúng?", right: (q) => { assert.ok(DAY_THI.nữ[0] < DAY_THI.nam[0] && /nữ/.test(q.q)); return q.o.find((o) => /nữ thường bắt đầu dậy thì sớm hơn/.test(o)); } },
  // nam và nữ
  { has: "Đặc điểm nào dưới đây là đặc điểm sinh học?", right: (q) => motDung(q, (o) => tra(DAC_DIEM, o) === "sinh học") },
  { has: "Thích nấu ăn là một đặc điểm sinh học", right: () => tra(DAC_DIEM, "nấu ăn") === "sinh học" },
  // chăm sóc sức khoẻ tuổi dậy thì
  { has: "thay băng vệ sinh", right: (q) => motDung(q, (o) => o === `Từ ${BANG_VS[0]} đến ${BANG_VS[1]} giờ một lần`) },
  { has: "giúp cơ thể sạch sẽ ở tuổi dậy thì", right: (q) => q.o.map(yDungSai) },
  // phòng tránh bị xâm hại (Bài 26: nguy cơ có thể từ người lạ, cũng có thể từ người quen biết)
  { has: "Nguy cơ bị xâm hại có thể đến cả từ người quen biết", right: () => true },
  // chức năng của môi trường
  { has: "Nối mỗi ví dụ với chức năng của môi trường", right: (q) => { const r = q.l.map((l) => tra(CHUC_NANG, l)); assert.equal(q.r.filter((x) => !r.includes(x)).length, 1); return r; } },
  { has: "chỉ có những yếu tố của môi trường tự nhiên?", right: (q) => motDung(q, (o) => o.split(", ").every((x) => YEU_TO.includes(low(x)))) },
  // tác động của con người đến môi trường
  { has: "đều là tài nguyên thiên nhiên?", right: (q) => motDung(q, (o) => o.split(", ").every((x) => TAI_NGUYEN.includes(low(x)))) },
  { has: "tác động tích cực đến môi trường", right: (q) => q.o.map(yDungSai) }
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
// câu có hình, câu trả lời bằng số, câu sắp xếp, nối cột, đúng/sai và câu của chủ đề có bảng tra nào cũng phải có kiểm tra
const CO_BANG = ["Các giai đoạn phát triển của con người"];
kho.filter((q) => q.svg || ["num", "order", "match", "tf", "tf4"].includes(q.type) || CO_BANG.includes(q.topic))
  .forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => { assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)); chuHinh(q.svg, ten.get(q)); });
// bộ đọc sơ đồ bắt được hình vẽ sai: mũi tên ngược chiều, ô đổi chỗ, đầu nhọn lệch
{ const tim = (has) => kho.find((q) => q.q.includes(has)), chk = (has) => CHECKS.find((c) => c.has === has);
  const ht = tim("vẽ các bước từ khi thụ tinh"), gd = tim("vẽ các giai đoạn phát triển chính của con người theo thứ tự");
  assert.throws(() => chk("vẽ các bước từ khi thụ tinh").right(Object.assign({}, ht, { svg: ht.svg.replace(">Phôi<", ">Thai nhi<").replace(/>Thai nhi<\/text>(?![\s\S]*>Thai nhi<)/, ">Phôi</text>") })), /AssertionError|mũi tên/);
  assert.throws(() => chk("vẽ các giai đoạn phát triển chính của con người theo thứ tự").right(Object.assign({}, gd, { svg: gd.svg.replace(">Tuổi trưởng thành<", ">Tuổi già#<").replace(">Tuổi già<", ">Tuổi trưởng thành<").replace(">Tuổi già#<", ">Tuổi già<") })), /AssertionError|mũi tên/);
  assert.throws(() => docSoDo(gd.svg.replace(/points="171,28 /, 'points="160,60 ')), /AssertionError|ô|nhọn/); }

/* ---------- mức độ và ma trận ---------- */
const M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), pool.n, "tổng ma trận bằng n");
assert.equal(CHU_DE.length, 10, "10 chủ đề theo tên Bài 18–20, 22–26, 28–29");
const nhom = (a, b) => sum(CHU_DE.slice(a, b).map((t) => sum(M[t])));
assert.deepEqual([nhom(0, 3), nhom(3, 8), nhom(8, 10)], [8, 12, 5], "Vi khuẩn 8 câu, Con người và sức khoẻ 12, Sinh vật và môi trường 5");
CHU_DE.forEach((t) => assert.ok(("chu-de:5:khoahoc:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
{ const cu = new Set(bank("khoahoc5-ck1-ngau-nhien").questions.map((q) => q.topic)); CHU_DE.forEach((t) => assert.ok(!cu.has(t), "chữ chủ đề trùng kho cuối kì I: " + t)); }
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
// lời giải không nhắc vị trí phương án (app xáo phương án); gọi người làm bài là “bạn” (“em” chỉ trong trẻ em, em bé, em trai, em gái); chữ như sách
kho.forEach((q) => {
  assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50));
  const C = [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).join(" ");
  assert.ok(!/(^|[^\p{L}])(?<![Tt]rẻ )em(?! (?:bé|trai|gái))([^\p{L}]|$)/u.test(C), "gọi người làm bài là “bạn”, không “em”: " + q.q.slice(0, 50));
  assert.ok(!/hóa|thủy|nhụy|khỏe|tùy|hòa|tủy|hủy/u.test(C), "viết “hoá”, “thuỷ”, “nhuỵ”, “khoẻ”, “tuỳ”, “hoà”, “tuỷ”, “huỷ” như sách: " + q.q.slice(0, 50));
  assert.ok(!/Tây Nguyên|63 tỉnh|(?<!\p{L})(huyện|quận)(?!\p{L})/u.test(C), "không dùng tên vùng, đơn vị hành chính cũ: " + q.q.slice(0, 50));
});
// lời dặn: phạm vi, đề chung của Sở, ôn thêm đề cuối kì I khi trường kiểm tra cả năm, đề cương của trường
DE.concat(S.pool).forEach((id) => { const t = bank(id).note; assert.ok(/Bài 18–29/.test(t) && /Sở GD&ĐT ra đề chung cuối kì một số môn lớp 5/.test(t) && /đề cương của trường/.test(t) && /ôn thêm đề Khoa học 5 cuối kì I/.test(t), id + ": note ghi phạm vi, đề chung của Sở, đề cuối kì I, đề cương của trường"); });
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

/* ---------- dò lộ đáp án (Rút ra N5, N25, RS9; như tests/khoahoc5-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung mọi câu của một
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
    const so2 = q.type === "num" && q.ans >= 10 ? [q.ans] : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const lien = q.type === "order" ? q.o.slice(1).map((o, k) => [q.o[k], o]) : [], cum = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : [];
    qs.concat(notes || []).forEach((p) => {
      if (p === q) return;
      const C = p.note ? [p.q] : chu(p), T = C.map(low), at = `${name(p)} → ${name(q)}: `;
      so2.filter((x) => C.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
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
// đã xem (Phiên N5-ck2-khoahoc): xem chú thích từng dòng ở Pull Request của phiên
const DA_XEM = [];
assert.deepEqual(r.chuLo, DA_XEM, "đáp án bằng chữ có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(r.lo, [], "lộ đáp án:\n" + r.lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 8”… (số dưới 10 không tính), cả hai vế một cặp nối, hai ô liền nhau của câu sắp
// xếp, lựa chọn đúng
{ const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const k = doLo(qs, (q) => q.q.slice(0, 12)); return k.lo.concat(k.chuLo).map((s) => s.replace(/^.*?: /, "")); };
  const khac = tim("Người dân vùng núi dùng tre");
  assert.deepEqual(thuLo([tim("Nối mỗi loại vi khuẩn"), gia(khac, "Vi khuẩn tả gây tiêu chảy, nôn mửa.")]), ["Vi khuẩn tả → Gây tiêu chảy, nôn mửa"]);
  assert.deepEqual(thuLo([tim("biểu hiện của người mắc bệnh tả"), gia(khac, "Lúc đầu đầy bụng, sôi bụng; sau đó đi ngoài nhiều lần, nôn mửa.")]), ["Đầy bụng, sôi bụng → Đi ngoài nhiều lần, nôn mửa"]);
  assert.deepEqual(thuLo([tim("Ai trong số đó đang ở tuổi già?"), gia(khac, "Người ở tuổi già như ông nội (63 tuổi) vẫn giúp ích gia đình.")]), ["Ông nội (63 tuổi)"]); }

/* ---------- không gần trùng câu của kho Khoa học lớp 4 và kho Khoa học 5 cuối kì I (lời giao việc; Rút ra N25, như tests/khoahoc5-ck1.js): đề
   bài cùng lựa chọn, ô nối, ô sắp xếp có từ 4 cặp hai âm tiết liền nhau chung với một câu của kho kia và số cặp chung từ một nửa số cặp của câu
   ít cặp hơn thì báo. Bỏ cách hỏi chung (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của các kho đem so. ---------- */
{
  const CUM = ["mỗi ý sau đúng hay sai", "mỗi việc làm sau", "nào dưới đây", "dưới đây", "cách nào", "vì sao", "điều này cho thấy", "điều đó cho thấy", "nên làm gì"];
  const cap2 = (s) => { let t = low(s); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const cauCua = (f) => BANKS.filter(f).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const cu = cauCua((b) => b.file === "4-khoahoc.js" || /^khoahoc5-ck1-/.test(b.id)), ca = cu.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const PC = cu.map((p) => [p, capAm(p)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return PC.map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Khoa học 4, kho Khoa học 5 cuối kì I:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Khoa học 4 hoặc kho Khoa học 5 cuối kì I");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, chữ trong hình) không có trong sách; cụm từ chung của môn (tên bài,
   tên chủ đề, cách hỏi chuẩn) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ (chép từ tests/khoahoc5-ck1.js): băm mọi chuỗi k từ của chữ đã chuẩn hoá, chỉ so thật (includes) khi băm có
const traChu = (() => {
  const bam = (w, k) => {
    const A = new Uint32Array(w.length), B = new Uint32Array(w.length), n2 = Math.max(0, w.length - k + 1), H = new Float64Array(n2);
    for (let i = 0; i < w.length; i++) { let a = 0x811c9dc5, b = 0x1b873593; const t = w[i]; for (let j = 0; j < t.length; j++) { const x = t.charCodeAt(j); a = Math.imul(a ^ x, 0x01000193); b = Math.imul(b ^ x, 0x5bd1e995); } A[i] = a; B[i] = b; }
    for (let i = 0; i < n2; i++) { let a = 0x9e3779b9, b = 0x85ebca6b; for (let j = i; j < i + k; j++) { a = Math.imul(a ^ A[j], 0x01000193); b = Math.imul(b ^ B[j], 0x5bd1e995); } H[i] = (a >>> 0) * 2097152 + (b >>> 11); }
    return H;
  };
  const co = (H, h) => { let l = 0, r2 = H.length - 1; while (l <= r2) { const m = (l + r2) >> 1; if (H[m] === h) return true; if (H[m] < h) l = m + 1; else r2 = m - 1; } return false; };
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
const TU_CHUNG = [...CHU_DE, "mỗi ý sau đúng hay sai", "vi khuẩn có ích trong chế biến thực phẩm", "vi khuẩn gây bệnh ở người và cách phòng tránh",
  "các giai đoạn phát triển chính của con người", "giai đoạn phát triển chính của con người", "con người và sức khoẻ", "sinh vật và môi trường",
  "chức năng của môi trường", "tôn trọng bạn cùng giới và khác giới", "bạn cùng giới và khác giới", "tác động của con người", "tài nguyên thiên nhiên",
  "đa dạng sinh học", "tuổi vị thành niên", "tuổi trưởng thành", "tuổi ấu thơ", "tuổi dậy thì", "đặc điểm sinh học", "đặc điểm xã hội", "cơ quan sinh dục",
  "vi khuẩn lactic", "vi khuẩn tả", "bệnh tả", "sâu răng", "sữa chua", "rau, củ, quả", "thai nhi", "hợp tử", "tinh trùng"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
if (SACH.length) {
  assert.ok(SACH.some((f) => /lop-5\/khoa-hoc-5/.test(f)), "OnUp-Book có Khoa học 5");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q)}: ${c}`)))
    .concat(LOI_DAN.flatMap((d) => chuoi(d.q, k).filter((c) => traChu.co(sach, c)).map((c) => `${d.ten}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả câu riêng của các đề ngẫu nhiên; kho cuối
   kì I cùng file cũng so ---------- */
{
  const khac = BANKS.filter((b) => b.file !== "5-khoahoc.js" || /^khoahoc5-ck1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n + " câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu, " + kho.filter((q) => q.svg).length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("KHOAHOC5 CK2 OK");
