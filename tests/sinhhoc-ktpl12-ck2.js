// Kiểm tra ngân hàng Sinh học 12 và GDKT&PL 12 cuối năm của Phiên N12-ck2-sinhhoc-ktpl (data/banks/12-sinhhoc.js, data/banks/12-ktpl.js:
// mỗi môn hai đề cố định và đề ngẫu nhiên lấy câu của hai đề đó, không có câu riêng), theo mẫu tests/sinhhoc-ktpl12-gk2.js (phần chung),
// tests/vatli-hoahoc12-ck2.js (lời dặn của đề cuối năm, câu ôn so với kho giữa kì II). Số đề, số câu lấy từ danh mục (không ghi cứng).
// Câu có phép tính, có số liệu hay có hình nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id); số liệu đọc
// từ chữ của đề, đáp án tính bằng code (so với ans, o[0] hoặc các ý tính được của câu đúng/sai 4 ý; câu tự luận so với thang chấm và đáp số).
// Sinh học: số cá thu hoạch theo diện tích, mật độ thả, tỉ lệ sống; lượng khai thác tối đa để kích thước quần thể giữ ổn định; độ phong phú
// của từng loài và độ đa dạng của hai quần xã (chỉ số Simpson); năng lượng qua các bậc dinh dưỡng theo hiệu suất sinh thái (xuôi và ngược
// chuỗi); lượng phân urea theo phần trăm nitrogen; diện tích rừng hấp thụ đủ lượng CO₂ thải ra; câu chọn theo bảng ghi trong script (sinh vật
// biến nhiệt, đẳng nhiệt; cây ưa bóng, ưa sáng; ba nhóm tài nguyên theo Bài 34; sinh vật ăn mùn bã hữu cơ theo Bài 29; vị trí của pH đất
// so với giới hạn sinh thái, khoảng thuận lợi). Đọc lại hình: lưới thức ăn (ô có tên, mũi tên từ loài là thức ăn đến loài ăn nó, đuôi và
// đầu mũi tên trên cạnh hai ô khác nhau, không đi qua ô khác) rồi đếm chuỗi thức ăn, bậc dinh dưỡng, số chuỗi còn lại khi bỏ một loài; một
// phần chu trình nitrogen (như trên, mỗi mũi tên một số “(n)” đứng cạnh đúng một mũi tên; quá trình của từng mũi tên theo Hình 31.6 của
// sách: cố định nitrogen, nitrite hoá, nitrate hoá, phản nitrate hoá, hấp thụ, phân giải); tháp năng lượng (các bậc chồng khít, cùng trục
// giữa, bậc trên hẹp hơn, năng lượng giảm dần, dòng đơn vị); chữ trong hình từ cỡ 13, nằm trọn trong khung, vừa ô.
// GDKT&PL: tuổi kết hôn (nam từ đủ 20, nữ từ đủ 18), tuổi thành niên; câu tự luận: thang chấm đủ ý, bài gợi ý nói đủ các ý của thang chấm.
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân; dấu thanh kiểu sách “hoá”, “thuỷ”, “thoả”, “khoẻ”; Sinh học: thuật
// ngữ như sách in năm 2026 (nitrogen, phosphorus, carbon, oxygen; phì dưỡng (phú dưỡng)), địa danh của Bài 33–35 như sách in năm 2026;
// GDKT&PL: tên luật như sách in năm 2026 (Luật Bảo hiểm y tế năm 2008 (sửa đổi, bổ sung năm 2024), Luật Bảo hiểm xã hội năm 2024, Luật Di
// sản văn hoá năm 2024, Luật Giáo dục năm 2019 (sửa đổi, bổ sung năm 2025)), không ghi số điều luật, mức phạt, không tên cơ quan, đơn vị
// hành chính cũ), lời dặn của đề (sách, phạm vi, số câu mỗi phần theo ma trận, trường học khác phạm vi, câu về đề chung của Sở), môn, lịch
// thi và phạm vi của ck2-l12, mức độ và ma trận 10 – 8 – 7 (chủ đề theo tên bài và thứ tự của sách, đối chiếu mục lục trong README của cuốn
// ở OnUp-Book; bài thực hành, dự án không có chủ đề riêng; chủ đề ôn đúng chữ chủ đề của kho giữa kì II, chủ đề mới không trùng kho giữa kì
// II, cuối kì I; phần trọng tâm nhiều câu hơn hẳn phần ôn; hai đề cố định chia đúng ma trận), dạng câu theo khung Công văn 7991 (mỗi kho ít
// nhất 6 câu đúng/sai 4 ý không lặp kiểu Đ/S, Sinh học ít nhất 4 câu trả lời ngắn, 1–2 câu tự luận ở ô Vận dụng rút 1 câu), GDKT&PL câu
// tình huống từ hai phần ba kho, đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số
// câu nhiều lựa chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không
// có, đáp án đúng không trùng đáp án đúng của câu nào ở kho cuối kì I, giữa kì II, rút thử nhiều lần (đúng ma trận; đã làm hết một đề cố định
// thì không rút lại câu của đề đó), đề bài không trùng câu nào trong file, không gần trùng câu của kho cuối kì I, giữa kì II (cặp hai âm tiết
// chung), câu ôn không trùng đề bài, chuỗi 6 từ của đề bài, đáp án câu cùng chủ đề của kho giữa kì II, dò lộ đáp án giữa mọi cặp câu rút được
// cùng lúc và với lời dặn (đã xem ghi ở DA_XEM), giữa câu cùng chủ đề của kho này và kho giữa kì II (đề “Ôn chủ đề” rút chung; đã xem ghi ở
// DA_XEM_CHU_DE). Có sách ở ../OnUp-Book thì so mọi trường chữ, cả lời dặn, với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không
// chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác, cả kho cuối kì I, giữa kì II và câu riêng của các đề ngẫu
// nhiên (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 6 từ); đề bài không có chuỗi 6 từ nào trùng câu của kho cuối kì I, giữa kì II.
// Chạy: node tests/sinhhoc-ktpl12-ck2.js → in MATH OK.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const qctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), qctx);
const Quiz = qctx.window.Quiz;
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- hai kho: số đề, số câu lấy từ danh mục ----------
   DAU: phần đầu của lời dặn (sách, phạm vi); PHAN: các phần của lời dặn (số câu mỗi phần tính từ ma trận); SAU: câu lời dặn nhắc trường học
   khác phạm vi; CUOI: câu ngay trước câu về đề chung của Sở; PHAM_VI: phạm vi của môn ghi ở ck2-l12; BAI: chủ đề theo tên bài của sách (số
   bài để chia phần, đối chiếu mục lục); ON: các bài ôn (chủ đề đúng chữ kho giữa kì II); TAM: các bài trọng tâm; KHONG: bài thực hành, dự án
   trong phạm vi (không có chủ đề riêng); RUT_GON: tên bài rút gọn cho vừa mã đề "Ôn chủ đề" (tối đa 80 kí tự) và tên đầy đủ trong mục lục. */
const SO = "Từ năm học 2026–2027 Sở GD&ĐT ra đề chung cuối kì một số môn lớp 12; xem thông báo của Sở về môn và cấu trúc đề.";
const MON = [
  { ma: "sinhhoc", ten: "Sinh học", sach: "sinh-hoc-12", ki: "sh",
    DAU: "Sách Kết nối tri thức, Sinh học 12. Phạm vi cuối năm học: Chương 6–8 (Bài 23–35), trọng tâm Chương 7–8. ",
    PHAN: [["Chương 6 Môi trường và sinh thái học quần thể (Bài 23–25; ôn)", 23, 25], ["Chương 7 Sinh thái học quần xã (Bài 26–32)", 26, 32],
      ["Chương 8 Sinh thái học phục hồi, bảo tồn và phát triển bền vững (Bài 33–35)", 33, 35]],
    SAU: ["Bài 25, 27, 32 là bài thực hành, Bài 35 là bài dự án nên không có câu riêng.",
      "Trường kiểm tra cả Phần năm Tiến hoá (Bài 19–22) thì ôn thêm các đề giữa kì II và phụ huynh đối chiếu với đề cương của trường."],
    CUOI: "Một số câu cần máy tính cầm tay. Có lời giải từng câu.", PHAM_VI: "Sinh học: Bài 23–35, trọng tâm Bài 26–34",
    ON: [23, 24], TAM: [26, 34], KHONG: [25, 27, 32, 35],
    BAI: [["Môi trường và các nhân tố sinh thái", 23], ["Sinh thái học quần thể", 24], ["Quần xã sinh vật", 26], ["Hệ sinh thái", 28],
      ["Trao đổi vật chất và chuyển hoá năng lượng trong hệ sinh thái", 29], ["Diễn thế sinh thái", 30], ["Sinh quyển, khu sinh học và chu trình sinh – địa – hoá", 31],
      ["Sinh thái học phục hồi và bảo tồn đa dạng sinh vật", 33], ["Phát triển bền vững", 34]],
    RUT_GON: {} },
  { ma: "ktpl", ten: "GDKT&PL", sach: "giao-duc-kinh-te-va-phap-luat-12", ki: "kt",
    DAU: "Sách Kết nối tri thức, Giáo dục kinh tế và pháp luật 12, Phần hai Giáo dục pháp luật. Phạm vi cuối năm học: Bài 10–16, trọng tâm Bài 12–16. ",
    PHAN: [["Bài 10–11 (ôn: hôn nhân và gia đình; học tập)", 10, 11],
      ["Bài 12–13 (chăm sóc sức khoẻ, an sinh xã hội; di sản văn hoá, môi trường, tài nguyên thiên nhiên)", 12, 13],
      ["Bài 14–16 (pháp luật quốc tế; dân cư, lãnh thổ, chủ quyền quốc gia; WTO và hợp đồng thương mại quốc tế)", 14, 16]],
    SAU: ["Trường kiểm tra cả Bài 8–9 thì ôn thêm các đề giữa kì II và phụ huynh đối chiếu với đề cương của trường."],
    CUOI: "Phần lớn là câu tình huống. Có lời giải từng câu.", PHAM_VI: "GDKT&PL: Bài 10–16, trọng tâm Bài 12–16",
    ON: [10, 11], TAM: [12, 16], KHONG: [],
    BAI: [["Quyền và nghĩa vụ của công dân trong hôn nhân và gia đình", 10], ["Quyền và nghĩa vụ của công dân trong học tập", 11],
      ["Quyền và nghĩa vụ về chăm sóc sức khoẻ, bảo đảm an sinh xã hội", 12], ["Quyền và nghĩa vụ về di sản văn hoá, môi trường, tài nguyên", 13],
      ["Một số vấn đề chung về pháp luật quốc tế", 14], ["Công pháp quốc tế về dân cư, lãnh thổ và chủ quyền quốc gia", 15],
      ["Nguyên tắc cơ bản của WTO và hợp đồng thương mại quốc tế", 16]],
    RUT_GON: { "Quyền và nghĩa vụ về chăm sóc sức khoẻ, bảo đảm an sinh xã hội": "Quyền và nghĩa vụ của công dân trong bảo vệ, chăm sóc sức khoẻ và bảo đảm an sinh xã hội",
      "Quyền và nghĩa vụ về di sản văn hoá, môi trường, tài nguyên": "Quyền và nghĩa vụ của công dân trong bảo vệ di sản văn hoá, môi trường và tài nguyên thiên nhiên",
      "Nguyên tắc cơ bản của WTO và hợp đồng thương mại quốc tế": "Nguyên tắc cơ bản của Tổ chức Thương mại Thế giới và hợp đồng thương mại quốc tế" } }
];
const ten = new Map();
MON.forEach((m) => {
  const pool = BANKS.find((b) => b.pool && b.id === m.ma + "12-ck2-ngau-nhien");
  assert.ok(pool, "thiếu đề ngẫu nhiên " + m.ma + "12-ck2-ngau-nhien");
  m.pool = pool; m.DE = pool.pool.from; m.M = pool.pool.matrix; m.kho = pool.questions; m.file = pool.file;
  assert.equal(m.file, "12-" + m.ma + ".js", "file câu hỏi theo mã môn");
  assert.equal(m.DE.length, 2, m.ma + ": đề ngẫu nhiên lấy câu của hai đề cố định");
  assert.deepEqual(BANKS.filter((b) => b.id.startsWith(m.ma + "12-ck2-")).map((b) => b.id).sort(), [...m.DE, pool.id].sort(), m.ma + ": kho gồm hai đề cố định và đề ngẫu nhiên");
  assert.equal(m.kho.filter((q) => q.src === pool.id).length, 0, m.ma + ": đề ngẫu nhiên không có câu riêng");
  assert.ok(pool.title === m.ten + " 12 · Cuối năm · Đề ngẫu nhiên" && pool.grade === 12 && pool.subject === m.ten && pool.minutes === 45, m.ma + ": tên, khối, môn, số phút của đề ngẫu nhiên");
  m.DE.forEach((id, k) => {
    const b = bank(id);
    assert.ok(b.file === m.file && b.subject === m.ten && b.grade === 12 && b.minutes === pool.minutes && b.n === pool.n, id + ": cùng file, môn, khối, số phút, số câu với đề ngẫu nhiên");
    assert.equal(b.title, m.ten + " 12 · Cuối năm · Đề " + (k + 1), id + ": tên đề");
    assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
    m.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, m.ki + (k + 1) + "#" + (i + 1)));
  });
  assert.equal(m.kho.length, sum(m.DE.map((id) => bank(id).n)), m.ma + ": kho = câu của hai đề cố định");
  // kho giữa kì II (câu ôn: cùng chủ đề) và cuối kì I cùng môn (để so: đề bài không gần trùng, đáp án không trùng)
  ["gk2", "ck1"].forEach((k) => {
    const p = BANKS.find((b) => b.pool && b.id === m.ma + "12-" + k + "-ngau-nhien");
    assert.ok(p && p.file === m.file, m.ma + ": có kho " + k + " cùng file");
    m[k] = p.questions; m[k + "M"] = p.pool.matrix;
    p.questions.forEach((q) => { const i = p.pool.from.indexOf(q.src), b = bank(q.src); ten.set(q, k + "-" + m.ki + (i < 0 ? "r" : i + 1) + "#" + (b.questions.findIndex((x) => x.q === q.q) + 1)); });
  });
  m.CHU_DE = m.BAI.map((b) => b[0]);
  m.ON_T = m.BAI.filter((b) => b[1] >= m.ON[0] && b[1] <= m.ON[1]).map((b) => b[0]);
});
const [SH, KT] = MON;
// môn đúng chữ của lịch thi (MON_THPT), sáu mã đề gắn vào kì thi cuối năm lớp 12, phạm vi của kì thi ghi đúng số bài
{
  const lich = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
  const mon = /const MON_THPT = \[([^\]]*)\]/.exec(lich);
  MON.forEach((m) => assert.ok(mon && mon[1].includes('"' + m.ten + '"'), "môn " + m.ten + " có trong MON_THPT"));
  const c = vm.createContext({ window: {} }); vm.runInContext(lich, c);
  const ev = c.window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck2-l12");
  assert.ok(ev && ev.grades.includes(12) && MON.every((m) => ev.subjects.includes(m.ten)), "có kì thi ck2-l12 với hai môn");
  assert.ok(/Sở GD&ĐT/.test(ev.note || ""), "kì thi ck2-l12 có ghi chú về đề chung của Sở");
  MON.forEach((m) => {
    [...m.DE, m.pool.id].forEach((id) => assert.ok(ev.banks.includes(id), id + " gắn vào ck2-l12"));
    assert.ok(ev.scope.includes(m.PHAM_VI), "phạm vi của ck2-l12 ghi “" + m.PHAM_VI + "”");
    const [, tu, den, t1, t2] = /Bài (\d+)–(\d+), trọng tâm Bài (\d+)–(\d+)$/.exec(m.PHAM_VI).map(Number);
    assert.deepEqual([Math.min(...m.BAI.map((b) => b[1])), Math.max(...m.BAI.map((b) => b[1]).concat(m.KHONG))], [tu, den], m.ma + ": chủ đề từ bài đầu đến bài cuối của phạm vi ghi ở ck2-l12");
    assert.deepEqual(m.TAM, [t1, t2], m.ma + ": phần trọng tâm như ck2-l12");
    m.BAI.forEach(([t, b]) => assert.ok((b >= m.ON[0] && b <= m.ON[1]) !== (b >= m.TAM[0] && b <= m.TAM[1]), m.ma + ": Bài " + b + " thuộc đúng một trong phần ôn, phần trọng tâm"));
  });
}

/* ---------- số ----------
   Số trong đề: hàng nghìn ngăn bằng khoảng trắng, dấu phẩy thập phân. */
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?";
const val = (s) => { const m = /^[−-]?\d{1,3}(?: \d{3})*(?:,\d+)?$/.exec(String(s).trim()); assert.ok(m, "không đọc được số “" + s + "”"); return +String(s).trim().replace(/ /g, "").replace("−", "-").replace(",", "."); };
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
// mẫu chữ có # ở chỗ số: so("Cho # g", s) → [số]
const R = (mau) => new RegExp(mau.split("#").map(escRe).join("(" + NUM + ")"), "u");
const so = (s, mau) => { const m = R(mau).exec(s); assert.ok(m, "không thấy “" + mau + "” trong: " + String(s).slice(0, 80)); return m.slice(1).map(val); };
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b));
// số viết kiểu Việt Nam: 7500 → "7 500", 0.15 → "0,15"
const vn = (x, d = 6) => { const r = Math.round(x * 10 ** d) / 10 ** d, [a, b] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const coThang = (q, ...cum) => { const r = q.rubric.map((c) => c.c).join(" | "); cum.forEach((c) => assert.ok(r.includes(c), "thang chấm cần có “" + c + "”")); };
const dapSo = (q) => { const m = /^Đáp số: (.+)\.$/m.exec(q.x); assert.ok(m, "gợi ý ghi đáp số, kết thúc bằng dấu chấm"); return m[1]; };
const y = (o, re) => { const m = re.exec(o); assert.ok(m, "không đọc được ý “" + o + "”"); return m; };

/* ---------- Sinh học: bảng theo sách ----------
   Sinh vật biến nhiệt, đẳng nhiệt (Bài 23: chim, thú là sinh vật đẳng nhiệt); cây ưa bóng, ưa sáng; ba nhóm tài nguyên (Bài 34: có khả năng
   tái tạo, không có khả năng tái tạo, tài nguyên khí hậu); sinh vật ăn mùn bã hữu cơ mở đầu chuỗi (Bài 29: giun đất, bọ đất, trai, sò);
   quá trình của từng mũi tên trong chu trình nitrogen (Bài 31, Hình 31.6), điều kiện của quá trình. */
const NHIET = { "thằn lằn": "biến nhiệt", "cá rô": "biến nhiệt", "giun đất": "biến nhiệt", "chim sẻ": "đẳng nhiệt", "dơi": "đẳng nhiệt", "chuột đồng": "đẳng nhiệt" };
const ANH_SANG = { "lá lốt": "ưa bóng", "vạn niên thanh": "ưa bóng", "trầu không": "ưa bóng", "lúa": "ưa sáng", "ngô": "ưa sáng", "thanh long": "ưa sáng",
  "phi lao": "ưa sáng", "bạch đàn": "ưa sáng", "cây hoa hướng dương": "ưa sáng", "xương rồng": "ưa sáng", "cây thông": "ưa sáng", "cỏ tranh": "ưa sáng" };
const TAI_NGUYEN = { "than đá": "không tái tạo", "quặng sắt": "không tái tạo", "dầu mỏ": "không tái tạo", "rừng": "tái tạo", "đất trồng": "tái tạo",
  "nước ngọt": "tái tạo", "cá biển": "tái tạo", "tôm": "tái tạo", "rong biển": "tái tạo", "gió": "khí hậu", "bức xạ mặt trời": "khí hậu", "thuỷ triều": "khí hậu" };
const AN_MUN = ["giun đất", "bọ đất", "trai", "sò"], SAN_XUAT = ["tảo", "rong đuôi chó", "lúa"];
const NITO = { "N₂ trong khí quyển→NH₄⁺": "cố định nitrogen", "NH₄⁺→NO₂⁻": "nitrite hoá", "NO₂⁻→NO₃⁻": "nitrate hoá", "NO₃⁻→N₂ trong khí quyển": "phản nitrate hoá",
  "NO₃⁻→Thực vật": "hấp thụ", "Thực vật→Xác, chất thải": "chết, thải", "Xác, chất thải→NH₄⁺": "phân giải" };
const HIEU_KHI = new Set(["nitrite hoá", "nitrate hoá"]); // phản nitrate hoá xảy ra trong điều kiện kị khí
// mỗi lựa chọn là một nhóm tên ngăn bằng dấu phẩy; trả các lựa chọn mà mọi tên đều thuộc nhóm cần tìm theo bảng
const ca = (o, bang, nhom) => o.split(", ").every((t) => { const k = t.toLowerCase(); assert.ok(k in bang, "bảng chưa có “" + t + "”"); return bang[k] === nhom; });

/* ---------- GDKT&PL: bảng theo luật (như sách) ---------- */
const LUAT = { tuoiKetHon: { trai: 20, gái: 18 }, thanhNien: 18 };

/* ---------- hình ---------- */
const daDoc = new Set();
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">");
  return Object.assign(a, { t: m[2], at: [+a.x, +a.y], b: a["font-weight"] === "bold" || a["font-weight"] === "700", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start" }); });
const diem = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
// mọi chữ trong hình cỡ từ 13, nằm trọn trong khung, không đè lên nhau (ước bề rộng chữ như tests/toan12-ck1.js)
const hopChu = (t) => { const w = (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length, x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0];
  return [x0, t.at[1] - 0.75 * t.fs, x0 + w, t.at[1] + 0.25 * t.fs]; };
const chuHinh = (svg, at) => {
  const v = /viewBox="([^"]+)"/.exec(svg)[1].split(/\s+/).map(Number), T = texts(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, at + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= 0 && h[2] <= v[2] && h[1] >= 0 && h[3] <= v[3], at + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), at + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
};
// hình học phẳng: khoảng cách từ điểm đến đường thẳng, đến đoạn thẳng; đoạn thẳng cắt phần trong của một hình chữ nhật (thu vào 1)
const kcDuong = (p, a, b) => Math.abs((b[0] - a[0]) * (a[1] - p[1]) - (a[0] - p[0]) * (b[1] - a[1])) / Math.hypot(b[0] - a[0], b[1] - a[1]);
const kcDoan = (p, a, b) => { const dx = b[0] - a[0], dy = b[1] - a[1], t = Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy)));
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy); };
const catHop = (a, b, o) => { let t0 = 0, t1 = 1; const dx = b[0] - a[0], dy = b[1] - a[1];
  const X0 = o.x + 1, X1 = o.x + o.w - 1, Y0 = o.y + 1, Y1 = o.y + o.h - 1;
  for (const [p, q] of [[-dx, a[0] - X0], [dx, X1 - a[0]], [-dy, a[1] - Y0], [dy, Y1 - a[1]]]) {
    if (p === 0) { if (q < 0) return false; continue; }
    const r = q / p; if (p < 0) { if (r > t1) return false; if (r > t0) t0 = r; } else { if (r < t0) return false; if (r < t1) t1 = r; } }
  return t1 - t0 > 1e-6; };
// bề rộng ước của một dòng chữ (như tests/khtn9-ck2.js): 0,56 cỡ chữ mỗi kí tự, chữ đậm 0,62
const rongChu = (t) => [...t.t].length * (t.b ? 0.62 : 0.56) * t.fs;
/* Sơ đồ ô và mũi tên (lưới thức ăn, một phần chu trình nitrogen): ô là hình chữ nhật bo góc nền surface, đúng một dòng chữ ở giữa, vừa ô;
   mũi tên là một đoạn thẳng màu ink và một tam giác, đỉnh nhọn (điểm đầu của tam giác) nằm trên đường kéo dài của đoạn, cách đầu đoạn 5–12;
   đuôi đoạn thẳng nằm trên cạnh của đúng một ô, đỉnh nhọn trên cạnh của đúng một ô khác; mũi tên không đi qua ô nào khác; hai mũi tên không
   trùng nhau. Có số: mỗi số “(n)” cách mũi tên gần nhất 9–30, mọi mũi tên khác xa hơn ít nhất 8, không nằm trong ô; mỗi mũi tên đúng một số,
   số từ 1 đến số mũi tên. Ngoài ô và số không có chữ nào khác. */
const docSoDo = (svg, at, coSo) => {
  const T = texts(svg), L = tags(svg, "line"), P = tags(svg, "polygon");
  const trong = (p, b) => p[0] > b.x && p[0] < b.x + b.w && p[1] > b.y && p[1] < b.y + b.h;
  const o = tags(svg, "rect").filter((r) => r.fill === "surface" && r.rx).map((r) => {
    const b = { x: +r.x, y: +r.y, w: +r.width, h: +r.height }, t = T.filter((u) => trong(u.at, b));
    assert.equal(t.length, 1, at + ": mỗi ô đúng một dòng chữ");
    assert.ok(t[0].anchor === "middle" && Math.abs(t[0].at[0] - (b.x + b.w / 2)) < 0.6, at + ": chữ “" + t[0].t + "” ở giữa ô");
    assert.ok(rongChu(t[0]) <= b.w - 8, at + ": chữ “" + t[0].t + "” vừa ô");
    return Object.assign(b, { ten: t[0].t, chu: t[0] }); });
  assert.ok(o.length >= 3 && new Set(o.map((b) => b.ten)).size === o.length, at + ": các ô có tên khác nhau");
  const tren = (p, b) => ((Math.abs(p[1] - b.y) < 0.6 || Math.abs(p[1] - b.y - b.h) < 0.6) && p[0] >= b.x - 0.6 && p[0] <= b.x + b.w + 0.6)
    || ((Math.abs(p[0] - b.x) < 0.6 || Math.abs(p[0] - b.x - b.w) < 0.6) && p[1] >= b.y - 0.6 && p[1] <= b.y + b.h + 0.6);
  const daDung = new Set();
  const mt = L.filter((l) => l.stroke === "ink").map((l) => {
    const a = [+l.x1, +l.y1], e = [+l.x2, +l.y2];
    const tg = P.filter((p) => { const t = diem(p.points)[0], d = Math.hypot(t[0] - e[0], t[1] - e[1]);
      return d >= 5 && d <= 12 && kcDuong(t, a, e) < 0.8 && (e[0] - a[0]) * (t[0] - e[0]) + (e[1] - a[1]) * (t[1] - e[1]) > 0; });
    assert.equal(tg.length, 1, at + ": mỗi đoạn thẳng một đầu mũi tên");
    assert.ok(!daDung.has(tg[0]), at + ": hai đoạn thẳng chung một đầu mũi tên"); daDung.add(tg[0]);
    const t = diem(tg[0].points)[0], tu = o.filter((b) => tren(a, b)), den = o.filter((b) => tren(t, b));
    assert.ok(tu.length === 1 && den.length === 1 && tu[0] !== den[0], at + ": mũi tên đi từ cạnh một ô đến cạnh một ô khác");
    o.filter((b) => b !== tu[0] && b !== den[0]).forEach((b) => assert.ok(!catHop(a, t, b), at + ": mũi tên " + tu[0].ten + " → " + den[0].ten + " đi qua ô " + b.ten));
    return { tu: tu[0].ten, den: den[0].ten, a, t }; });
  assert.equal(P.length, mt.length, at + ": mỗi đầu mũi tên thuộc một đoạn thẳng");
  assert.equal(new Set(mt.map((m) => m.tu + "→" + m.den)).size, mt.length, at + ": hai mũi tên trùng nhau");
  const so = {}, N = T.filter((t) => !o.some((b) => b.chu === t));
  if (coSo) {
    N.forEach((t) => {
      assert.ok(/^\(\d+\)$/.test(t.t), at + ": chữ lạ “" + t.t + "”");
      const c = [t.at[0], t.at[1] - 0.3 * t.fs], d = mt.map((m) => kcDoan(c, m.a, m.t)), k = d.indexOf(Math.min(...d));
      assert.ok(d[k] >= 9 && d[k] <= 30, at + ": số " + t.t + " cách mũi tên gần nhất " + d[k].toFixed(1));
      assert.ok(d.every((v, i) => i === k || v > d[k] + 8), at + ": số " + t.t + " ở gần hai mũi tên");
      assert.ok(!o.some((b) => trong(c, b)), at + ": số " + t.t + " nằm trong ô");
      const n = +t.t.slice(1, -1); assert.ok(!(n in so) && !Object.values(so).includes(mt[k]), at + ": mỗi mũi tên một số, mỗi số một mũi tên"); so[n] = mt[k]; });
    assert.deepEqual(Object.keys(so).map(Number).sort((u, w) => u - w), mt.map((m, i) => i + 1), at + ": số từ 1 đến " + mt.length + ", mỗi mũi tên một số");
  } else assert.equal(N.length, 0, at + ": ngoài ô có chữ lạ");
  chuHinh(svg, at); daDoc.add(svg);
  return { o: o.map((b) => b.ten), mt, so };
};
// chuỗi thức ăn của lưới (mũi tên từ loài là thức ăn đến loài ăn nó): mọi đường đi từ loài không ăn loài nào đến loài không bị loài nào ăn
const chuoiThucAn = (o, mt) => {
  const vao = (x) => mt.filter((m) => m.den === x), ra = (x) => mt.filter((m) => m.tu === x), kq = [];
  const di = (c) => { assert.ok(c.length <= o.length, "lưới thức ăn có vòng"); const r = ra(c[c.length - 1]); if (!r.length) kq.push(c); r.forEach((m) => di(c.concat(m.den))); };
  o.filter((x) => !vao(x).length).forEach((x) => di([x]));
  return kq;
};
/* Tháp năng lượng: các bậc là hình chữ nhật nền acc-soft cùng trục giữa, chồng khít từ dưới lên, bậc trên hẹp hơn bậc dưới; mỗi bậc một dòng
   chữ “Bậc k: số” ở giữa, vừa bậc, k tăng từ 1 ở dưới cùng; năng lượng giảm dần lên các bậc trên; dưới tháp một dòng “Đơn vị: …”. */
const docThap = (svg, at) => {
  const T = texts(svg), B = tags(svg, "rect").filter((r) => r.fill === "acc-soft").map((r) => ({ x: +r.x, y: +r.y, w: +r.width, h: +r.height })).sort((u, w) => w.y - u.y);
  assert.ok(B.length >= 3, at + ": ít nhất ba bậc");
  B.forEach((b, i) => { assert.ok(Math.abs(b.x + b.w / 2 - (B[0].x + B[0].w / 2)) < 0.6, at + ": các bậc cùng một trục giữa");
    if (i) { assert.ok(Math.abs(b.y + b.h - B[i - 1].y) < 0.6, at + ": các bậc chồng khít"); assert.ok(b.w < B[i - 1].w, at + ": bậc trên hẹp hơn bậc dưới"); } });
  const v = B.map((b, i) => { const t = T.filter((u) => u.at[0] > b.x && u.at[0] < b.x + b.w && u.at[1] > b.y && u.at[1] < b.y + b.h);
    assert.equal(t.length, 1, at + ": mỗi bậc một dòng chữ");
    const m = /^Bậc (\d+): (.+)$/.exec(t[0].t); assert.ok(m && +m[1] === i + 1, at + ": bậc thứ " + (i + 1) + " từ dưới lên ghi “Bậc " + (i + 1) + "”");
    assert.ok(t[0].anchor === "middle" && Math.abs(t[0].at[0] - (b.x + b.w / 2)) < 0.6 && rongChu(t[0]) <= b.w - 8, at + ": chữ ở giữa, vừa bậc " + (i + 1));
    return val(m[2]); });
  assert.ok(v.every((x, i) => i === 0 || x < v[i - 1]), at + ": năng lượng giảm dần lên các bậc trên");
  const dv = T.filter((t) => /^Đơn vị: /.test(t.t)); assert.ok(dv.length === 1 && dv[0].at[1] > B[0].y + B[0].h, at + ": một dòng đơn vị dưới tháp");
  assert.equal(T.length, B.length + 1, at + ": ngoài các bậc và dòng đơn vị không có chữ nào khác");
  chuHinh(svg, at); daDoc.add(svg);
  return { v, dv: dv[0].t.slice("Đơn vị: ".length) };
};

/* ---------- các câu cần tính ----------
   id: sh1, sh2 (Sinh học Đề 1, 2), kt1, kt2 (GDKT&PL Đề 1, 2); has: đoạn chữ có trong đúng một câu. right(q) trả đáp án tính được
   (số, lựa chọn đúng, hoặc mảng 4 ý của câu đúng/sai, null ở ý không tính bằng code); essay(q) kiểm tra câu tự luận. */
// tên một loài trong lưới thức ăn (chữ trong ô), không phân biệt chữ hoa
const loai = (o, s) => { const k = o.find((x) => x.toLowerCase() === s.toLowerCase()); assert.ok(k, "không có loài “" + s + "” trong hình"); return k; };
const CHECKS = [
  // ---- Sinh học, Đề 1 ----
  { id: "sh1", has: "Nhóm sinh vật nào sau đây gồm toàn sinh vật biến nhiệt?", right: (q) => {
    const dung = q.o.filter((o) => ca(o, NHIET, "biến nhiệt")); assert.equal(dung.length, 1, "đúng một nhóm toàn sinh vật biến nhiệt");
    q.o.forEach((o) => assert.equal(o.split(", ").length, 3, "mỗi lựa chọn ba loài")); coX(q, "chim và thú là sinh vật đẳng nhiệt"); return dung[0]; } },
  { id: "sh1", has: "Một hộ nuôi cá rô phi", right: (q) => {
    const [S] = so(q.q, "diện tích # m²"), [d] = so(q.q, "mật độ # con/m²"), [p] = so(q.q, "tỉ lệ cá sống là #%"), n = S * d, kq = (n * p) / 100;
    coX(q, vn(S) + " · " + vn(d) + " = " + vn(n) + " con", vn(n) + " · " + vn(p) + "% = " + vn(kq) + " con"); return kq; } },
  { id: "sh1", has: "Hai khu rừng trồng P và Q", essay: (q) => {
    // độ phong phú = phần trăm số cây của loài trong tổng số cây của khu; độ đa dạng so bằng chỉ số Simpson 1 − Σp² (cùng số loài)
    const khu = (k) => { const m = new RegExp("khu " + k + ": loài 1 có (\\d+) cây, loài 2 có (\\d+) cây, loài 3 có (\\d+) cây, loài 4 có (\\d+) cây").exec(q.q); assert.ok(m, "số cây khu " + k); return m.slice(1).map(Number); };
    const P = khu("P"), Q = khu("Q"), tong = (a) => sum(a), pt = (a) => a.map((v) => (100 * v) / tong(a)), simpson = (a) => 1 - sum(pt(a).map((v) => (v / 100) ** 2));
    [P, Q].forEach((a) => pt(a).forEach((v) => assert.ok(Number.isInteger(v), "độ phong phú là số nguyên phần trăm")));
    const chuPT = (a) => pt(a).map((v) => v + "%").join(", ");
    coThang(q, P.join(" + ") + " = " + tong(P) + " cây", chuPT(P), Q.join(" + ") + " = " + tong(Q) + " cây", chuPT(Q));
    const caoHon = simpson(Q) > simpson(P) ? "Q" : "P"; assert.ok(Math.abs(simpson(Q) - simpson(P)) > 0.05, "hai khu khác hẳn nhau về độ đa dạng");
    coThang(q, "quần xã ở khu " + caoHon + " có độ đa dạng cao hơn"); coX(q, "khu " + caoHon + " có độ đa dạng cao hơn", chuPT(P).replace(/, /g, "; "), chuPT(Q).replace(/, /g, "; "));
    assert.ok(dapSo(q).includes("khu P: " + chuPT(P)) && dapSo(q).includes("khu Q: " + chuPT(Q)) && dapSo(q).endsWith("b) khu " + caoHon), "đáp số ghi độ phong phú, khu đa dạng hơn"); } },
  { id: "sh1", has: "lưới thức ăn ở một khu đồi", right: (q) => {
    const h = docSoDo(q.svg, ten.get(q), false), C = chuoiThucAn(h.o, h.mt);
    coX(q, ...C.map((c) => c.join(" → ").toLowerCase()));
    return q.o.map((o) => {
      let m = /^Lưới thức ăn trong hình có (\d+) chuỗi thức ăn\.$/.exec(o); if (m) return C.length === +m[1];
      m = /^(.+) và (.+) cùng thuộc bậc dinh dưỡng cấp (\d+)\.$/.exec(o);
      if (m) return [m[1], m[2]].every((s) => { const k = loai(h.o, s); return C.filter((c) => c.includes(k)).every((c) => c.indexOf(k) === +m[3] - 1); });
      m = /^Trong mọi chuỗi có (.+), (.+) đều thuộc bậc dinh dưỡng cấp (\d+)\.$/.exec(o);
      if (m) { const k = loai(h.o, m[1]); assert.equal(k, loai(h.o, m[2])); return C.filter((c) => c.includes(k)).every((c) => c.indexOf(k) === +m[3] - 1); }
      m = y(o, /^Nếu loài (.+) bị loại bỏ khỏi khu đồi, lưới thức ăn chỉ còn (\d+) chuỗi thức ăn\.$/);
      const k = loai(h.o, m[1]); return C.filter((c) => !c.includes(k)).length === +m[2]; }); } },
  { id: "sh1", has: "Năng lượng tích luỹ ở bậc dinh dưỡng cấp 1 của một chuỗi thức ăn", right: (q) => {
    const [E1] = so(q.q, "bậc dinh dưỡng cấp 1 của một chuỗi thức ăn trong một năm là # kcal");
    const H = so(q.q, "giữa bậc 2 và bậc 1 là #%, giữa bậc 3 và bậc 2 là #%, giữa bậc 4 và bậc 3 là #%"), [cap] = so(q.q, "Năng lượng tích luỹ ở bậc dinh dưỡng cấp # trong năm đó");
    let E = E1; H.forEach((h, i) => { const sau = (E * h) / 100; coX(q, "Bậc " + (i + 2) + ": " + vn(E) + " · " + vn(h) + "% = " + vn(sau) + " kcal"); E = sau; });
    assert.equal(cap, H.length + 1, "câu hỏi hỏi bậc cuối cùng"); return E; } },
  { id: "sh1", has: "một phần chu trình nitrogen", right: (q) => {
    const h = docSoDo(q.svg, ten.get(q), true), qt = (n) => { const m = h.so[n]; assert.ok(m, "không có mũi tên (" + n + ")"); const k = m.tu + "→" + m.den; assert.ok(k in NITO, "mũi tên lạ " + k); return NITO[k]; };
    assert.deepEqual(Object.values(h.so).map((m) => NITO[m.tu + "→" + m.den]).filter(Boolean).length, h.mt.length, "mọi mũi tên là một quá trình của chu trình nitrogen");
    return q.o.map((o) => {
      let m = /^Ở mũi tên \((\d+)\), thực vật trực tiếp lấy khí N₂ từ không khí để tổng hợp chất hữu cơ\.$/.exec(o); if (m) return qt(m[1]) === "hấp thụ" && h.so[m[1]].tu === "N₂ trong khí quyển";
      m = /^Mũi tên \((\d+)\) là quá trình (.+), chuyển (.+) thành (.+)\.$/.exec(o); if (m) return qt(m[1]) === m[2] && h.so[m[1]].tu === m[3] && h.so[m[1]].den === m[4];
      m = /^Quá trình ở mũi tên \((\d+)\) xảy ra mạnh khi đất tơi xốp, thoáng khí\.$/.exec(o); if (m) return HIEU_KHI.has(qt(m[1]));
      m = y(o, /^Ở mũi tên \((\d+)\), vi sinh vật phân giải xác, chất thải và giải phóng NH₄⁺\.$/); return qt(m[1]) === "phân giải"; }); } },
  { id: "sh1", has: "Phân đạm urea chứa", right: (q) => {
    const [p] = so(q.q, "chứa #% nitrogen"), [m] = so(q.q, "bón thêm # kg nitrogen"), kq = m / (p / 100);
    coX(q, vn(m) + " : " + vn(p) + "% = " + vn(m) + " : " + vn(p / 100) + " = " + vn(kq) + " kg"); return kq; } },
  { id: "sh1", has: "gồm toàn tài nguyên không có khả năng tái tạo", right: (q) => {
    const dung = q.o.filter((o) => ca(o, TAI_NGUYEN, "không tái tạo")); assert.equal(dung.length, 1);
    assert.ok(q.o.some((o) => ca(o, TAI_NGUYEN, "khí hậu")) && q.o.some((o) => ca(o, TAI_NGUYEN, "tái tạo")), "lựa chọn sai thuộc hai nhóm còn lại"); coX(q, "tài nguyên khí hậu"); return dung[0]; } },
  { id: "sh1", has: "khởi đầu bằng sinh vật ăn mùn bã hữu cơ", right: (q) => {
    const dau = (o) => o.split(" → ")[0].toLowerCase(), dung = q.o.filter((o) => AN_MUN.includes(dau(o)));
    assert.equal(dung.length, 1); q.o.filter((o) => o !== dung[0]).forEach((o) => assert.ok(SAN_XUAT.includes(dau(o)), "chuỗi khác khởi đầu bằng sinh vật sản xuất: " + o)); return dung[0]; } },
  // ---- Sinh học, Đề 2 ----
  { id: "sh2", has: "Nhóm cây nào sau đây gồm toàn cây ưa bóng?", right: (q) => {
    const dung = q.o.filter((o) => ca(o, ANH_SANG, "ưa bóng")); assert.equal(dung.length, 1); q.o.forEach((o) => assert.equal(o.split(", ").length, 3, "mỗi lựa chọn ba cây")); return dung[0]; } },
  { id: "sh2", has: "Một quần thể cá trong hồ có 50 000 con", right: (q) => {
    // số cá thể tăng thêm mỗi năm nhờ sinh sản là lượng khai thác tối đa để kích thước quần thể giữ ổn định
    const [N] = so(q.q, "trong hồ có # con"), [r] = so(q.q, "tăng thêm #%"), kq = (N * r) / 100; coX(q, vn(N) + " · " + vn(r) + "% = " + vn(kq) + " con"); return kq; } },
  { id: "sh2", has: "Hình bên là tháp năng lượng", right: (q) => {
    const t = docThap(q.svg, ten.get(q)), [a, b] = so(q.q, "giữa bậc dinh dưỡng cấp # và bậc dinh dưỡng cấp #");
    assert.ok(a === b + 1 && a <= t.v.length, "hai bậc kề nhau của tháp"); assert.ok(q.q.includes("(" + t.dv + ")"), "đề bài ghi đơn vị như hình");
    t.v.slice(1).forEach((v, i) => { const h = (100 * v) / t.v[i]; assert.ok(h > 5 && h < 15, "hiệu suất giữa hai bậc kề nhau khoảng 10%"); });
    const H = (100 * t.v[a - 1]) / t.v[b - 1]; coX(q, "H = " + vn(t.v[a - 1]) + " : " + vn(t.v[b - 1]) + " · 100% = " + vn(H) + "%"); return H; } },
  { id: "sh2", has: "tảo → tôm → cá quả", right: (q) => {
    const [h] = so(q.q, "luôn là #%"), chuoi = /chuỗi thức ăn (.+?), để/.exec(q.q)[1].split(" → "), [E] = so(q.q, "tích luỹ được # kcal");
    assert.ok(q.q.includes(chuoi[2] + " (bậc dinh dưỡng cấp 3)") && q.q.includes("thì " + chuoi[0] + " phải tích luỹ"), "hỏi năng lượng của mắt xích đầu từ mắt xích cuối");
    let e = E; [1, 0].forEach((i) => { const truoc = e / (h / 100); coX(q, vn(e) + " : " + vn(h) + "% = " + vn(truoc) + " kcal"); e = truoc; }); return e; } },
  { id: "sh2", has: "Một thành phố nhỏ mỗi năm thải vào khí quyển", essay: (q) => {
    const [E] = so(q.q, "khoảng # tấn CO₂"), [k] = so(q.q, "hấp thụ trung bình # tấn CO₂ mỗi năm"), S = E / k;
    assert.ok(Number.isInteger(S), "diện tích là số nguyên hecta"); coThang(q, vn(E) + " : " + vn(k) + " = " + vn(S) + " ha", "nhiên liệu hoá thạch", "bảo vệ rừng hiện có");
    coX(q, vn(E) + " : " + vn(k) + " = " + vn(S) + " ha", "quang hợp", "hô hấp, phân giải, đốt cháy"); assert.ok(dapSo(q).startsWith("a) " + vn(S) + " ha"), "đáp số ghi diện tích"); } },
  // ---- GDKT&PL ----
  { id: "kt1", has: "Chị Nhung (24 tuổi) và anh Tuấn (27 tuổi)", right: (q) => {
    const [nu, nam] = so(q.q, "Chị Nhung (# tuổi) và anh Tuấn (# tuổi)");
    assert.ok(nu >= LUAT.tuoiKetHon.gái && nam >= LUAT.tuoiKetHon.trai, "hai người đã đủ tuổi kết hôn nên không phải tảo hôn"); coX(q, "đều đã đủ tuổi kết hôn");
    return "hành vi cản trở kết hôn"; } },
  { id: "kt1", has: "Chị Lụa (20 tuổi)", right: (q) => {
    const [t] = so(q.q, "Chị Lụa (# tuổi)"); assert.ok(t >= LUAT.thanhNien && t >= LUAT.tuoiKetHon.gái, "chị Lụa đã thành niên, đủ tuổi kết hôn");
    coX(q, "chị Lụa đã thành niên, đủ tuổi kết hôn"); return [null, false, null, null]; } },
  { id: "kt2", has: "Bạn Toàn 16 tuổi", right: (q) => {
    const [t] = so(q.q, "Bạn Toàn # tuổi"); assert.ok(t < LUAT.thanhNien, "Toàn chưa thành niên: lựa chọn sai nói về người chưa thành niên");
    return "Toàn chưa đúng vì con sống chung phải tham gia công việc gia đình"; } },
  { id: "kt2", has: "Ngôi đình cổ ở thôn của bạn Hiếu", essay: (q) => {
    assert.ok(/^Em hãy đọc tình huống và trả lời câu hỏi\./.test(q.q) && /^Bài gợi ý: a\) .+ b\) .+$/s.test(q.x), "lời dặn, bài gợi ý có hai ý a), b)");
    coThang(q, "làm hư hại di tích", "gây ô nhiễm môi trường", "Nhắc nhở khách giữ gìn di tích", "ban quản lí di tích");
    coX(q, "hư hại di tích", "ô nhiễm môi trường", "nhắc nhở khách giữ gìn di tích", "ban quản lí di tích"); } }
];

/* ---------- chạy kiểm tra ---------- */
let n = 0;
const daKiem = new Set();
CHECKS.forEach((c) => {
  const m = MON.find((x) => c.id.startsWith(x.ki)), cau = m.kho.filter((q) => q.q.includes(c.has));
  assert.equal(cau.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${cau.length}`);
  const q = cau[0], at = ten.get(q) + ": " + c.has;
  try {
    assert.equal(q.src, m.DE[+c.id.slice(2) - 1], "câu nằm ở đề " + q.src);
    if (q.type === "essay") {
      assert.ok(c.essay, "tự luận cần kiểm tra thang chấm"); c.essay(q);
      assert.ok(q.rubric.every((r) => r.p > 0 && Number.isInteger(r.p * 4)) && sum(q.rubric.map((r) => r.p)) === 2, "thang chấm 2 điểm, mỗi ý chia hết cho 0,25");
    } else {
      assert.ok(c.right, "câu chấm tự động cần right"); const want = c.right(q);
      if (q.type === "num") {
        assert.ok(gan(q.ans, want), "đáp án " + q.ans + ", tính được " + want); assert.ok(Math.abs(q.ans * 100 - Math.round(q.ans * 100)) < 1e-9, "đáp án quá hai chữ số thập phân");
        assert.ok(q.tol === undefined, "đáp án chính xác, không cần sai số");
      } else if (q.type === "tf4") {
        assert.ok(Array.isArray(want) && want.length === 4, "câu đúng/sai 4 ý: right trả mảng 4 ý");
        want.forEach((w, i) => w === null || assert.strictEqual(q.a[i], w, "ý " + "abcd"[i] + ": đáp án " + q.a[i] + ", tính được " + w));
      } else {
        assert.strictEqual(q.o[0], want, "đáp án " + q.o[0] + ", tính được " + want); assert.ok(!q.o.slice(1).includes(want), "nhiễu trùng đáp án đúng");
      }
    }
  } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
  daKiem.add(q); n++;
});
// câu trả lời bằng số, câu có hình, câu tự luận nào cũng phải được tính lại, đọc lại ở trên
MON.forEach((m) => m.kho.filter((q) => q.svg || q.type === "num" || q.type === "essay").forEach((q) => assert.ok(daKiem.has(q), "chưa có kiểm tra cho câu " + ten.get(q) + ": " + q.q.slice(0, 60))));
MON.forEach((m) => m.kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + ten.get(q))));
// bộ đọc hình bắt được hình cố ý vẽ sai
{
  const hinh = (has) => SH.kho.find((q) => q.q.includes(has)).svg;
  const lt = hinh("lưới thức ăn ở một khu đồi"), ni = hinh("một phần chu trình nitrogen"), th = hinh("Hình bên là tháp năng lượng");
  assert.throws(() => docSoDo(lt.replace('points="260,38', 'points="260,44'), "thử", false), /đầu mũi tên/);
  assert.throws(() => docSoDo(lt.replace("</svg>", '<rect x="240" y="96" width="40" height="30" rx="6" fill="surface" stroke="ink" stroke-width="1.5"/><text x="260" y="116" text-anchor="middle">Cú</text></svg>'), "thử", false), /đi qua ô/);
  assert.throws(() => docSoDo(lt.replace("</svg>", '<text x="300" y="270" text-anchor="middle">(1)</text></svg>'), "thử", false), /chữ lạ/);
  const bo = lt.replace(/<line x1="118" y1="242" x2="[^"]*" y2="[^"]*" stroke="ink" stroke-width="2"\/><polygon points="240,194 [^"]*" fill="ink" stroke="none"\/>/, "");
  assert.notEqual(bo, lt); const hb = docSoDo(bo, "thử", false); assert.equal(chuoiThucAn(hb.o, hb.mt).length, 5); // bỏ mũi tên cỏ → hoẵng
  const so3 = /<text x="([\d.]+)" y="([\d.]+)" text-anchor="middle" font-weight="700">\(3\)<\/text>/.exec(ni), so2 = /<text x="([\d.]+)" y="([\d.]+)" text-anchor="middle" font-weight="700">\(2\)<\/text>/.exec(ni);
  assert.throws(() => docSoDo(ni.replace(so3[0], so3[0].replace('x="' + so3[1] + '" y="' + so3[2] + '"', 'x="' + so2[1] + '" y="' + (+so2[2] + 18) + '"')), "thử", true), /số|chữ/);
  assert.throws(() => docThap(th.replace('<rect x="85" y="78" width="150"', '<rect x="50" y="78" width="220"'), "thử"), /hẹp hơn/);
  assert.throws(() => docThap(th.replace("Bậc 3: 216", "Bậc 2: 216"), "thử"), /Bậc 3/);
  assert.throws(() => docThap(th.replace("Bậc 3: 216", "Bậc 3: 2 600"), "thử"), /giảm dần/);
}

/* ---------- chữ ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || [], (q.rubric || []).map((c) => c.c)).map(String);
MON.forEach((m) => m.kho.forEach((q) => {
  const at = ten.get(q) + ": " + q.q.slice(0, 50);
  chu(q).forEach((s) => {
    // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân (năm viết liền: 2025)
    assert.ok(!/(?<![,\d])\d{4,}/.test(s.replace(/\b(?:19|20)\d{2}\b/g, "")) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s);
    // dấu thanh kiểu sách: oa, oe, uy không có phụ âm cuối đặt dấu ở nguyên âm sau (hoá, khoẻ, thuỷ, thoả, tuỳ)
    assert.ok(!/[òóỏõọ][ae](?![\p{L}])|[ùúủũụ]y(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s);
  });
  if (q.type === "num" && q.unit) assert.ok(q.unit.length <= 5, at + ": đơn vị ngắn");
}));
// Sinh học: thuật ngữ như sách in năm 2026; địa danh của Bài 33–35 như sách in năm 2026
SH.kho.forEach((q) => chu(q).forEach((s) => {
  assert.ok(!/(?<![\p{L}])(?:gen|alen|ADN|ARN|axit amin|prôtêin|nitơ|phốt ?pho|cacbon|cácbon|ôxi|oxi|amôni|nitrat|nitrit|hóa thạch)(?![\p{L}])/iu.test(s), ten.get(q) + ": thuật ngữ khác sách: " + s);
  assert.ok(!/phú dưỡng/.test(s.replace(/phì dưỡng \(phú dưỡng\)/g, "")), ten.get(q) + ": viết “phì dưỡng (phú dưỡng)” như sách: " + s);
  assert.ok(!/Bình Thuận|Thừa Thiên|Tương Dương|Kon Tum(?! \(nay thuộc tỉnh Quảng Ngãi\))|Kiên Giang(?! \(nay là An Giang\))/.test(s), ten.get(q) + ": địa danh cũ: " + s);
}));
// GDKT&PL: tên luật như sách in năm 2026; không số điều, mức phạt; không tên cơ quan, đơn vị hành chính cũ
KT.kho.forEach((q) => chu(q).forEach((s) => {
  const at = ten.get(q) + ": ";
  assert.ok(!/Hiến pháp năm/.test(s) || /Hiến pháp năm 2013 \(sửa đổi, bổ sung năm 2025\)/.test(s), at + "Hiến pháp năm 2013 (sửa đổi, bổ sung năm 2025): " + s);
  assert.ok(!/Luật Bảo hiểm y tế(?! năm 2008 \(sửa đổi, bổ sung năm 2024\))|Luật Bảo hiểm xã hội(?! năm 2024)|Luật Di sản văn hoá(?! năm 2024)/.test(s), at + "tên luật như sách in năm 2026: " + s);
  assert.ok(!/Luật Giáo dục(?! năm 2019 \(sửa đổi, bổ sung năm 2025\))|Luật Hôn nhân và Gia đình(?! năm 2014)|Bộ luật Hình sự(?! năm 2015 \(sửa đổi, bổ sung năm 2017, năm 2025\))/.test(s), at + "tên luật như sách in năm 2026: " + s);
  assert.ok(!/\b(?:Điều|khoản) \d|phạt (?:tiền )?(?:từ )?\d|phạt tù/.test(s), at + "không ghi số điều luật, mức phạt: " + s);
  assert.ok(!/Lao động – Thương binh|cấp huyện|\bhuyện\b|Tổng cục|Chi cục/.test(s), at + "tên cơ quan, đơn vị hành chính cũ: " + s);
}));
// GDKT&PL: câu tình huống là chính: đề bài kể việc của một người (anh K, chị Lan, bạn Tú…), một doanh nghiệp, quốc gia, gia đình có tên
const TINH_HUONG = [/(?:^|[\s(])(?:[Aa]nh|[Cc]hị|[Ôô]ng|[Bb]à|[Bb]ạn|[Cc]ụ) \p{Lu}/u, /(?:[Cc]ông ty|[Dd]oanh nghiệp|[Qq]uốc gia|[Tt]ỉnh|[Xx]ã|[Nn]ước)(?: \p{Ll}+)* [A-Z](?![\p{L}])/u,
  /(?:của|Nhóm) \p{Lu}\p{Ll}+/u, /^Gia đình (?:anh|chị|ông|bà) \p{Lu}/u, /^Vợ chồng (?:anh|chị|ông|bà) \p{Lu}/u];
const soTH = KT.kho.filter((q) => TINH_HUONG.some((r) => r.test(q.q))).length;
assert.ok(soTH * 3 >= KT.kho.length * 2, "GDKT&PL: câu tình huống là chính (" + soTH + "/" + KT.kho.length + ")");

/* ---------- lời dặn, mức độ, ma trận ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
MON.forEach((m) => {
  const M = m.M, cells = Object.values(M), CHU_DE = m.CHU_DE, soBai = Object.fromEntries(m.BAI);
  assert.ok(m.kho.every((q) => [1, 2, 3].includes(q.lv)), m.ma + ": câu nào cũng cần lv");
  assert.ok(cells.every(Array.isArray), m.ma + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], m.ma + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.equal(sum(cells.map(sum)), m.pool.n, m.ma + ": tổng ma trận bằng n");
  assert.ok(cells.every((v) => sum(v) >= 1), m.ma + ": chủ đề nào cũng có câu");
  assert.deepEqual(Object.keys(M), CHU_DE, m.ma + ": chủ đề theo tên bài, thứ tự bài của sách");
  CHU_DE.forEach((t) => assert.ok(("chu-de:12:" + m.ma + ":" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
  // mọi bài trong phạm vi có chủ đề, trừ bài thực hành, dự án
  const [tu, den] = [Math.min(...m.BAI.map((b) => b[1])), Math.max(...m.BAI.map((b) => b[1]).concat(m.KHONG))];
  for (let b = tu; b <= den; b++) assert.ok(m.KHONG.includes(b) !== m.BAI.some((x) => x[1] === b), m.ma + ": Bài " + b + " có chủ đề riêng khi không là bài thực hành, dự án");
  // chủ đề ôn đúng chữ chủ đề của kho giữa kì II; chủ đề mới không trùng chủ đề của kho giữa kì II, cuối kì I
  CHU_DE.forEach((t) => { const on = m.ON_T.includes(t); assert.equal(!!m.gk2M[t], on, m.ma + ": chủ đề " + t + (on ? " phải đúng chữ chủ đề của kho giữa kì II" : " trùng chủ đề của kho giữa kì II")); assert.ok(!m.ck1M[t], m.ma + ": chủ đề trùng kho cuối kì I: " + t); });
  // phần trọng tâm nhiều câu hơn hẳn phần ôn (từ gấp đôi)
  const dem_ = ([a, b]) => sum(CHU_DE.filter((t) => soBai[t] >= a && soBai[t] <= b).map((t) => sum(M[t])));
  assert.ok(dem_(m.TAM) >= 2 * dem_(m.ON), m.ma + ": phần trọng tâm (" + dem_(m.TAM) + " câu) nhiều hơn hẳn phần ôn (" + dem_(m.ON) + " câu)");
  m.DE.forEach((id) => {
    const qs = m.kho.filter((q) => q.src === id);
    assert.deepEqual([...new Set(qs.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, đúng thứ tự");
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t));
    // lời dặn: sách, phạm vi, số câu mỗi phần (tính từ ma trận), trường học khác phạm vi, câu về đề chung của Sở
    const note = bank(id).note;
    assert.ok(note.startsWith(m.DAU + m.PHAN[0][0]), id + ": lời dặn mở đầu bằng sách, phạm vi");
    m.PHAN.forEach(([p, a, b]) => assert.ok(note.includes(p + " " + dem_([a, b]) + " câu"), id + ": lời dặn ghi “" + p + " " + dem_([a, b]) + " câu”"));
    assert.equal(sum(m.PHAN.map(([, a, b]) => dem_([a, b]))), m.pool.n, m.ma + ": các phần của lời dặn phủ hết ma trận");
    m.SAU.forEach((s) => assert.ok(note.includes(s), id + ": lời dặn có “" + s + "”"));
    assert.ok(note.endsWith(m.CUOI + " " + SO), id + ": lời dặn kết thúc bằng “" + m.CUOI + "” và câu về đề chung của Sở");
  });
  // chủ đề đúng tên bài trong mục lục (README của cuốn ở OnUp-Book); tên chương, phần của lời dặn đúng mục lục; bài không có chủ đề riêng là
  // bài thực hành, dự án
  const readme = path.join(BOOK, "lop-12", m.sach, "README.md");
  if (fs.existsSync(readme)) {
    const md = fs.readFileSync(readme, "utf8"), ml = Object.fromEntries([...md.matchAll(/Bài (\d+)[.:] ([^|*·]+?) \|/g)].map((x) => [+x[1], x[2].trim()]));
    m.BAI.forEach(([t, b]) => assert.equal(m.RUT_GON[t] || t, ml[b], m.ma + ": tên Bài " + b + " theo mục lục"));
    m.KHONG.forEach((b) => assert.ok(/^(?:Thực hành|Dự án)/.test(ml[b]), m.ma + ": Bài " + b + " (" + ml[b] + ") không có chủ đề riêng"));
    m.PHAN.forEach(([p]) => { const c = /^Chương (\d+) (.+) \(Bài/.exec(p); if (c) assert.ok(md.includes("Chương " + c[1] + ". " + c[2].toUpperCase()), m.ma + ": tên chương " + c[1] + " theo mục lục"); });
    const ph = /Phần (hai|năm|sáu) ([^.]+)\. Phạm vi/.exec(m.DAU); if (ph) assert.ok(md.includes("Phần " + ph[1] + ": " + ph[2]), m.ma + ": tên phần theo mục lục");
  }
  // dạng câu theo khung Công văn 7991: nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn (số), tự luận tự chấm
  assert.ok(m.kho.every((q) => ["mc", "tf4", "num", "essay"].includes(q.type)), m.ma + ": dạng câu");
  const dem = (f) => m.kho.filter(f).length;
  if (m === SH) assert.ok(dem((q) => q.type === "num") >= 4, m.ma + ": ít nhất 4 câu trả lời ngắn");
  assert.ok(dem((q) => q.type === "essay") >= 1 && dem((q) => q.type === "essay") <= 2, m.ma + ": 1–2 câu tự luận");
  m.DE.forEach((id) => { const qs = m.kho.filter((q) => q.src === id); assert.ok(qs.filter((q) => q.type === "tf4").length >= 3 && qs.filter((q) => q.type === "essay").length <= 1, id + ": đủ đúng/sai 4 ý, nhiều nhất một câu tự luận"); });
  const tf4 = m.kho.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 6, m.ma + ": ít nhất 6 câu đúng/sai 4 ý");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(q.o.length === 4 && /Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
  assert.equal(Math.max(...Object.values(kieu)), 1, m.ma + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
  tf4.forEach((q) => { const vt = q.a.map((a, i) => q.x.indexOf("abcd"[i] + ") " + (a ? "Đúng" : "Sai")));
    assert.ok(vt.every((v, i) => v >= 0 && (i === 0 || v > vt[i - 1])) && !/[a-d]\) (Đúng|Sai)[^.:;]/.test(q.x.replace(/[a-d]\) (Đúng|Sai)$/, "")), "lời giải câu đúng/sai ghi đúng từng ý, theo thứ tự: " + ten.get(q)); });
  // câu tự luận chỉ ở ô Vận dụng rút 1 câu, ô đó còn câu khác dạng: mỗi lần rút nhiều nhất 2 câu tự luận
  const oTL = [...new Set(m.kho.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
  assert.ok(oTL.every((k) => { const [t, lv] = k.split("|"); return +lv === 3 && M[t][2] === 1 && m.kho.some((q) => q.topic === t && q.lv === 3 && q.type !== "essay"); }), m.ma + ": câu tự luận ở ô " + oTL);
  m.kho.filter((q) => q.type === "essay").forEach((q) => assert.ok(m === SH ? /^Trình bày lời giải\./.test(q.q) : /Em hãy/.test(q.q), "câu tự luận mở đầu bằng lời dặn: " + ten.get(q)));
  // lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án
  m.kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
  // câu nhiều lựa chọn: đáp án đúng không dài hơn hẳn lựa chọn sai, các lựa chọn không trùng nhau, đáp án đúng không là lựa chọn duy nhất có
  // chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), mc = m.kho.filter((q) => q.type === "mc");
  mc.forEach((q) => {
    const L = Math.max(...q.o.slice(1).map((o) => o.length));
    assert.ok(q.o.length === 4 && q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 50));
    assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 50));
    const c = chuThuong(q.topic), tu_ = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số)( |$)/u.test(w));
    tu_.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề: ${q.q.slice(0, 60)}`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    assert.ok(!(dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”: " + q.q.slice(0, 50));
  });
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn
  const le = mc.filter((q) => { const L = q.o.map((o) => o.length); return L[0] > Math.max(...L.slice(1)) || L[0] < Math.min(...L.slice(1)); });
  assert.ok(le.length * 3 <= mc.length, `${m.ma}: đáp án đúng dài nhất hoặc ngắn nhất ở ${le.length}/${mc.length} câu: ` + le.map((q) => ten.get(q)).join(", "));
  m.le = le.length + "/" + mc.length;
  // đáp án đúng của câu nhiều lựa chọn không trùng đáp án đúng của câu nào ở kho cuối kì I, giữa kì II
  const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
  const daCu = new Set(m.ck1.concat(m.gk2).filter((q) => q.type === "mc").map((q) => goc(q.o[0])));
  mc.forEach((q) => assert.ok(!daCu.has(goc(q.o[0])), m.ma + ": đáp án trùng một câu của kho cuối kì I, giữa kì II: " + ten.get(q)));

  /* ---------- rút thử ---------- */
  const thu = (hist) => {
    const d = Quiz.draw(m.pool, hist);
    assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
    assert.equal(d.questions.length, m.pool.n);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
    assert.ok(d.questions.filter((q) => q.type === "essay").length <= 2);
    return d;
  };
  const seen = new Set();
  for (let k = 0; k < 300; k++) thu().questions.forEach((q) => seen.add(Quiz.key(q)));
  assert.equal(seen.size, m.kho.length, m.ma + ": 300 lần rút thử phải gặp đủ các câu của kho");
  m.DE.forEach((id) => { const done = new Set(m.kho.filter((q) => q.src === id).map(Quiz.key)); for (let k = 0; k < 20; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });
  // đề bài không trùng câu nào khác trong file, cả kho cuối kì I, giữa kì II (so sau khi bỏ dấu câu, khoảng trắng)
  const caFile = BANKS.filter((b) => b.file === m.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)).map((q) => goc(q.q));
  m.kho.forEach((q) => assert.equal(caFile.filter((k) => k === goc(q.q)).length, 1, "đề bài trùng câu khác trong " + m.file + ": " + ten.get(q)));
});

/* ---------- không chép sách, không trùng kho khác: chuẩn hoá chữ ----------
   Bỏ dấu, gộp nguyên âm; cụm từ chung của môn (tên bài, tên chương, cách nói chuẩn của đề) thay bằng dấu ngăn trước khi so; chuỗi so phải có
   ít nhất 5 từ có chữ. */
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...SH.BAI, ...KT.BAI].map((b) => b[0]).concat(Object.values(SH.RUT_GON), Object.values(KT.RUT_GON), SH.PHAN.map((p) => p[0].replace(/ \(Bài.*$/, "")), ["mỗi ý sau đúng hay sai", "theo lí thuyết",
  "theo quy định của pháp luật", "nhận xét nào sau đây đúng", "em hãy đọc tình huống và trả lời câu hỏi", "việc làm nào sau đây", "cách làm nào sau đây phù hợp nhất",
  "trình bày lời giải", "hình bên là", "Phần năm Tiến hoá", "Phần hai Giáo dục pháp luật", "Giáo dục kinh tế và pháp luật 12",
  // Sinh học: tên khái niệm, nhóm như sách
  "chuỗi thức ăn khởi đầu bằng sinh vật ăn mùn bã hữu cơ", "hiệu suất sinh thái giữa hai bậc dinh dưỡng", "giữa hai bậc dinh dưỡng kế tiếp",
  "tài nguyên có khả năng tái tạo", "tài nguyên không có khả năng tái tạo", "tài nguyên khí hậu", "bảo tồn nguyên vị", "bảo tồn chuyển vị",
  // GDKT&PL: tên nguyên tắc, quyền, chế độ, vùng biển như sách
  "giải quyết các tranh chấp quốc tế bằng biện pháp hoà bình", "cấm dùng vũ lực hay đe doạ dùng vũ lực trong quan hệ quốc tế", "không can thiệp vào công việc nội bộ",
  "quyền bình đẳng và tự quyết của các dân tộc", "tận tâm, thiện chí thực hiện các cam kết quốc tế", "các quốc gia có nghĩa vụ hợp tác với nhau",
  "đối xử tối huệ quốc", "đối xử quốc gia", "nguyên tắc tự do hợp đồng", "nguyên tắc thiện chí và trung thực", "nguyên tắc tuân thủ hợp đồng đã giao kết",
  "chế độ đãi ngộ quốc gia", "chế độ đãi ngộ tối huệ quốc", "chế độ đãi ngộ đặc biệt", "chế độ bảo hộ công dân", "vùng đặc quyền kinh tế", "vùng tiếp giáp lãnh hải",
  "quyền đi qua không gây hại", "200 hải lí tính từ đường cơ sở", "điều ước quốc tế mà Việt Nam là thành viên", "Nhà nước Cộng hoà xã hội chủ nghĩa Việt Nam",
  "quyền, lợi ích hợp pháp", "cơ quan có thẩm quyền", "bảo hiểm xã hội bắt buộc", "biến động không theo chu kì", "biến động theo chu kì",
  "khởi đầu bằng sinh vật ăn mùn bã hữu cơ", "tác động tổng hợp của các nhân tố sinh thái", "quần xã đỉnh cực", "quần xã tiên phong",
  "học tập trong môi trường giáo dục an toàn, lành mạnh", "cấm dùng vũ lực hay đe doạ dùng vũ lực", "cấm dùng vũ lực", "can thiệp vào công việc nội bộ",
  "toàn vẹn lãnh thổ", "ưu đãi dành cho các nước đang phát triển", "quyền được bảo vệ, chăm sóc sức khoẻ", "chủ thể của pháp luật quốc tế"])
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");

/* ---------- so với kho cuối kì I, giữa kì II cùng môn: đề bài không gần trùng; câu ôn không trùng câu cùng chủ đề của kho giữa kì II ----------
   Cặp hai âm tiết liền nhau (Rút ra N25): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của kho cũ và số cặp chung từ một nửa số cặp
   của câu ít cặp hơn thì báo. Không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung của đề (CUM) và cặp có ở từ 3% số câu của file. */
{
  const CUM = ["mỗi ý sau đúng hay sai", "nhận xét nào sau đây đúng", "theo quy định của pháp luật", "trình bày lời giải", "em hãy đọc tình huống và trả lời câu hỏi", "theo lí thuyết", "hình bên là"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const gan_ = [], trungOn = [];
  MON.forEach((m) => {
    const caF = BANKS.filter((b) => b.file === m.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), df = {};
    caF.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
    const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * caF.length)); };
    m.kho.forEach((q) => { const c = capAm(q); m.ck1.concat(m.gk2).forEach((p) => { const d = capAm(p), chung = [...c].filter((x) => d.has(x)); if (chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`); }); });
    // câu ôn không trùng câu cùng chủ đề của kho giữa kì II: đề bài, chuỗi 6 từ của đề bài, đáp án
    m.kho.filter((q) => m.ON_T.includes(q.topic)).forEach((q) => m.gk2.filter((p) => p.topic === q.topic).forEach((p) => {
      const at = ten.get(q) + " ~ " + ten.get(p) + ": ";
      if (gocChu(q.q) === gocChu(p.q)) trungOn.push(at + "đề bài trùng");
      const c6 = chuoi(q.q, 6).filter((c) => (" " + khongDau(p.q) + " ").includes(" " + c + " "));
      if (c6.length) trungOn.push(at + "chuỗi 6 từ của đề bài: " + c6.join(" | "));
      if (q.type === "mc" && p.type === "mc" && gocChu(q.o[0]) === gocChu(p.o[0])) trungOn.push(at + "đáp án trùng");
      if (q.type === "num" && p.type === "num" && gan(q.ans, p.ans) && (q.unit || "") === (p.unit || "")) trungOn.push(at + "đáp án số trùng");
    }));
  });
  assert.deepEqual(gan_, [], "đề bài gần trùng câu của kho cuối kì I, giữa kì II");
  assert.deepEqual(trungOn, [], "câu ôn trùng câu cùng chủ đề của kho giữa kì II");
}

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Đề ngẫu nhiên rút câu ở mọi ô, đề “Ôn chủ đề” rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi cặp câu cùng môn, trừ cặp có
   câu tự luận nằm cùng một ô rút 1 câu; lời dặn (note) hiện ở màn mở đề nên cũng xét. Đề “Ôn chủ đề” của các chủ đề ôn rút chung câu của kho
   này và kho giữa kì II, nên xét thêm mọi cặp câu cùng chủ đề của hai kho (trừ tự luận). Đáp án là số (trả lời ngắn; từ hai chữ số, hoặc số
   thập phân) tìm ở vị trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”; không tính số đứng trước một phép tính) cùng đơn vị:
   không được có. Đáp án bằng chữ tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có trong đề bài, lựa
   chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM, DA_XEM_CHU_DE. */
const DON_VI = "(?:kcal\\/m²\\/năm|con\\/m²|kcal|con|cây|kg|tấn|ha|m²|%)";
const soDV = new RegExp("^(" + NUM + ")(?: ?(" + DON_VI + "))?$", "u");
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+(" + NUM + ")(?![\\d,/])(?!\\s*[·+−:×](?:\\s|\\d|\\())(?: ?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => ({ v: val(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["theo quy định", "quy định của", "quy định về", "vi phạm quy", "phạm quy định", "vi phạm nghĩa", "phạm nghĩa vụ", "định của pháp",
  "của pháp luật", "của người khác", "trái pháp luật", "bị pháp luật", "pháp luật nghiêm", "luật nghiêm cấm", "nghĩa vụ của", "của người học",
  "cơ quan có", "quan có thẩm", "có thẩm quyền", "hành vi vi", "vi vi phạm", "pháp luật quốc", "luật quốc tế", "của pháp luật", "quan hệ quốc", "hệ quốc tế",
  "của các quốc", "các quốc gia", "của quốc gia", "phù hợp với", "của hệ sinh", "hệ sinh thái", "trong hệ sinh", "sinh vật sản", "vật sản xuất",
  "bậc dinh dưỡng", "của môi trường", "môi trường sống", "vật chất và", "chất và năng", "và năng lượng", "nhân tố sinh", "tố sinh thái",
  "lưới thức ăn", "trong lưới thức", "chuỗi thức ăn", "hai bậc dinh", "và môi trường", "các cá thể", "thông tin về", "về tình trạng", "bảo đảm an",
  "đảm an sinh", "an sinh xã", "sinh xã hội", "di sản văn", "sản văn hoá", "khai thác tài", "thác tài nguyên", "phải chịu trách", "chịu trách nhiệm",
  "việc làm này", "luật trong nước", "người nước ngoài", "chế độ đãi", "độ đãi ngộ", "trong lãnh hải", "theo hợp đồng", "phải tham gia",
  "phạm quyền được", "xâm phạm quyền", "sức khoẻ của", "được bảo vệ", "chăm sóc sức", "sóc sức khoẻ", "định về bảo", "về bảo vệ", "đã vi phạm",
  "thực hiện các", "là thành viên", "chế độ bảo", "của nhà nước", "công dân của", "ở vùng này", "làm đúng vì", "các biện pháp", "đã xâm phạm", "quyền được học", "việc kết hôn", "vụ của người", "một hành vi", "hành vi bị",
  "vi bị pháp", "của nhà trường"]);
const NOTES = MON.flatMap((m) => [...new Set(m.DE.map((id) => bank(id).note))].map((s, i) => { const o = { q: m.ki + "-note" + (i + 1), x: s, topic: "note", type: "note", lv: 0 }; ten.set(o, o.q); return o; }));
const doLo = (qs, M, tenCau, them = [], cap = () => true) => {
  const lo = [], chuLo = [], cungLuc = (p, q) => p !== q && (p.type === "note" || p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2);
  const chuP = (p) => (p.type === "note" ? [p.x] : chu(p));
  qs.forEach((q) => {
    let soDa = [], C = [];
    if (q.type === "num") soDa = [{ v: q.ans, u: q.unit || "" }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: val(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]); C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)]; } }
    soDa = soDa.filter((d) => Math.abs(d.v) >= 10 || !Number.isInteger(d.v));
    qs.concat(them).forEach((p) => {
      if (!cungLuc(p, q) || !cap(p, q)) return;
      const at = `${tenCau(p)} → ${tenCau(q)}: `, T = " " + chuP(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chuP(p).flatMap(kqSo).some((yy) => gan(yy.v, d.v) && (!yy.u || !d.u || yy.u === d.u))).forEach((d) => lo.push(at + vn(d.v) + " " + d.u));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
const lo = [], chuLo = [], loCD = [], chuLoCD = [];
MON.forEach((m) => {
  const r = doLo(m.kho, m.M, (q) => ten.get(q), NOTES.filter((o) => o.q.startsWith(m.ki))); lo.push(...r.lo); chuLo.push(...r.chuLo);
  // cùng chủ đề với kho giữa kì II (đề “Ôn chủ đề”, không có câu tự luận): chỉ xét cặp một câu của kho này, một câu của kho kia
  const cuaKhoNay = (q) => m.kho.includes(q), on = m.kho.filter((q) => m.ON_T.includes(q.topic)).concat(m.gk2.filter((q) => m.ON_T.includes(q.topic))).filter((q) => q.type !== "essay");
  const r2 = doLo(on, Object.assign({}, m.gk2M, m.M), (q) => ten.get(q), [], (p, q) => p.topic === q.topic && cuaKhoNay(p) !== cuaKhoNay(q)); loCD.push(...r2.lo); chuLoCD.push(...r2.chuLo);
});
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n") + "\nĐáp án bằng chữ có ở câu cùng chủ đề của kho giữa kì II (xem tay):\n" + chuLoCD.join("\n"));
// đã xem (Phiên N12-ck2-sinhhoc-ktpl): tên khái niệm, nguyên tắc là lựa chọn của cả hai câu, câu kia không nói tới điều câu này hỏi. Sinh học:
// “loài chủ chốt”, “loài ưu thế” (hai câu sao biển, rừng thông cùng có bốn tên loài trong quần xã làm lựa chọn); “hội sinh”, “kí sinh” (hai câu
// phong lan, ve bét cùng có tên các quan hệ khác loài làm lựa chọn). GDKT&PL: “đối xử tối huệ quốc”, “đối xử quốc gia” (hai câu cà phê, ô tô
// cùng có tên các nguyên tắc của WTO làm lựa chọn; câu ông Peter có “đãi ngộ tối huệ quốc” làm lựa chọn sai, lời giải chỉ nói đãi ngộ quốc
// gia); “ước quốc tế”: câu quốc gia X nói đã tham gia một công ước quốc tế, không nói điều ước quốc tế hay luật trong nước được áp dụng trước.
const DA_XEM = ["sh2#6 → sh1#6: loài chủ chốt", "sh2#7 → sh1#7: hội sinh", "sh1#6 → sh2#6: loài ưu thế", "sh1#7 → sh2#7: kí sinh",
  "kt1#20 → kt1#23: tối huệ quốc", "kt2#24 → kt1#23: đối xử tối", "kt2#24 → kt1#23: xử tối huệ", "kt2#24 → kt1#23: tối huệ quốc",
  "kt1#17 → kt2#18: ước quốc tế", "kt1#23 → kt2#24: đối xử quốc", "kt1#23 → kt2#24: xử quốc gia"];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// đã xem: “tác động tổng hợp”: lựa chọn sai của câu giống lúa ở kho giữa kì II, lời giải câu đó chỉ nói tác động không đồng đều; “phạm danh dự”:
// lựa chọn sai “xúc phạm danh dự của chồng” của câu li hôn, không nói việc lăng mạ vợ trên mạng; “kết hôn trái pháp luật”: câu bà Nhàn hỏi
// quyền yêu cầu huỷ việc kết hôn trái pháp luật, câu chị Ngân hỏi yêu sách của cải; mỗi câu không nói tới điều câu kia hỏi.
const DA_XEM_CHU_DE = ["gk2-sh1#19 → sh2#2: tác động tổng", "gk2-sh1#19 → sh2#2: động tổng hợp", "gk2-kt2#14 → kt1#2: phạm danh dự",
  "gk2-kt1#16 → kt2#1: kết hôn trái", "gk2-kt1#16 → kt2#1: hôn trái pháp", "kt2#1 → gk2-kt1#16: kết hôn trái", "kt2#1 → gk2-kt1#16: hôn trái pháp"];
assert.deepEqual(chuLoCD, DA_XEM_CHU_DE, "đáp án bằng chữ có ở câu cùng chủ đề của kho giữa kì II đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM_CHU_DE");
assert.deepEqual(loCD, [], "lộ đáp án giữa câu cùng chủ đề của hai kho:\n" + loCD.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 2 700 kcal”, “là 3 060 con”, cụm của đáp án bằng chữ; số đứng trước phép tính không tính
{
  const tim = (has) => MON.flatMap((m) => m.kho).find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const r = doLo(qs, Object.assign({}, SH.M, KT.M), (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const khac = tim("Nhóm cây nào sau đây gồm toàn cây ưa bóng?"), khacK = tim("Lãnh thổ quốc gia gồm những bộ phận nào?");
  assert.deepEqual(thuLo([tim("Năng lượng tích luỹ ở bậc dinh dưỡng cấp 1"), gia(khac, "Bậc cuối = 2 700 kcal.")]), ["2 700 kcal"]);
  assert.deepEqual(thuLo([tim("Năng lượng tích luỹ ở bậc dinh dưỡng cấp 1"), gia(khac, "Bậc cuối = 2 700 kg.")]), []);
  assert.deepEqual(thuLo([tim("Một hộ nuôi cá rô phi"), gia(khac, "Số cá là 3 060 con.")]), ["3 060 con"]);
  assert.deepEqual(thuLo([tim("Một hộ nuôi cá rô phi"), gia(khac, "Có 3 060 · 2 con.")]), []);
  assert.deepEqual(thuLo([tim("Ví dụ nào dưới đây là diễn thế thứ sinh?"), gia(khac, "Như nương rẫy bỏ hoang.")]), ["nương rẫy bỏ", "rẫy bỏ hoang"]);
  assert.deepEqual(thuLo([tim("Ông Peter mang quốc tịch Anh"), gia(khacK, "Đó là chế độ đãi ngộ quốc gia.")]), ["đãi ngộ quốc", "ngộ quốc gia"]);
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const tatCa = MON.flatMap((m) => m.kho);
if (SACH.length) {
  MON.forEach((m) => assert.ok(SACH.some((f) => f.includes(m.sach)), "OnUp-Book có " + m.sach));
  const sach = new Set(), them = (t, k) => { const w = t.split(" ").filter(Boolean); for (let i = 0; i + k <= w.length; i++) sach.add(k + ":" + w.slice(i, i + k).join(" ")); };
  SACH.forEach((f) => { const t = khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")); them(t, 8); if (process.env.DO_SACH) them(t, 6); });
  const bao = (k) => tatCa.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.has(k + ":" + c)).map((c) => `${ten.get(q)}: ${c}`)))
    .concat(NOTES.flatMap((o) => chuoi(o.x, k).filter((c) => sach.has(k + ":" + c)).map((c) => `${o.q}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả kho cuối kì I, giữa kì II cùng file và câu
   riêng của các đề ngẫu nhiên; với kho cuối kì I, giữa kì II cùng môn: đề bài không có chuỗi 6 từ nào trùng (Rút ra N9-gk1-toan) ---------- */
{
  const cua = (b, q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const ngoai = (b) => !MON.some((m) => m.DE.includes(b.id) || m.pool === b);
  const khac = BANKS.filter((b) => !b.pool && ngoai(b)).flatMap((b) => b.questions.map((q) => cua(b, q)))
    .concat(BANKS.filter((b) => b.pool && ngoai(b)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => tatCa.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
  const gan6 = MON.flatMap((m) => { const cu = m.ck1.concat(m.gk2).map((q) => " " + khongDau(q.q) + " "); return m.kho.flatMap((q) => chuoi(q.q, 6).filter((c) => cu.some((s) => s.includes(" " + c + " "))).map((c) => ten.get(q) + ": " + c)); });
  assert.deepEqual([...new Set(gan6)], [], "đề bài có chuỗi 6 từ trùng câu của kho cuối kì I, giữa kì II");
}
MON.forEach((m) => console.log(`${m.ten} 12 cuối năm: kho ${m.kho.length} câu (${m.DE.length} đề cố định, ${m.pool.n} câu mỗi đề), ma trận 10 – 8 – 7 trên ${Object.keys(m.M).length} chủ đề; ` +
  `${m.kho.filter((q) => q.type === "tf4").length} câu đúng/sai 4 ý, ${m.kho.filter((q) => q.type === "num").length} câu trả lời ngắn, ${m.kho.filter((q) => q.type === "essay").length} câu tự luận, ${m.kho.filter((q) => q.svg).length} hình; đáp án đúng dài nhất hoặc ngắn nhất ở ${m.le} câu nhiều lựa chọn.`));
console.log("GDKT&PL 12: " + soTH + "/" + KT.kho.length + " câu tình huống.");
console.log(n + " câu đã tính lại hoặc đọc lại hình.");
console.log("MATH OK");
