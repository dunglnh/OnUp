// Kiểm tra ngân hàng Sinh học 12 và GDKT&PL 12 giữa kì II của Phiên N12-gk2-sinhhoc-ktpl (data/banks/12-sinhhoc.js, data/banks/12-ktpl.js:
// mỗi môn hai đề cố định và đề ngẫu nhiên lấy câu của hai đề đó, không có câu riêng), theo mẫu tests/sinhhoc-ktpl12-ck1.js (phần chung),
// tests/vatli-hoahoc12-gk2.js (lời dặn của đề giữa kì, so với kho cuối kì I). Số đề, số câu lấy từ danh mục (không ghi cứng).
// Câu có phép tính, có số liệu hay có hình nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id); số liệu đọc
// từ chữ của đề, đáp án tính bằng code (so với ans, o[0] hoặc các ý tính được của câu đúng/sai 4 ý; câu tự luận so với thang chấm và đáp số).
// Sinh học: tần số allele sau một thế hệ chọn lọc loại bỏ kiểu gene đồng hợp lặn (phân số chính xác), tần số allele của một nhóm cá thể
// đếm theo kiểu gene, sau khi nhập cư (dòng gene), số NST của thể song nhị bội từ hai bộ 2n, thứ tự tách nhánh theo số amino acid khác
// nhau, tỉ lệ đực : cái, kích thước quần thể sau sinh, tử, xuất cư, nhập cư, mật độ và số cá thể ước lượng bằng ô tiêu chuẩn, khoảng nhiệt
// độ chung của hai loài; thứ tự xuất hiện các nhóm sinh vật, đại và kỉ địa chất theo Bảng 22.1 của sách (bảng ghi trong script), thứ tự các
// giai đoạn phát sinh sự sống, các bước nghiên cứu của Darwin, các giai đoạn phát sinh loài người, tuổi các lớp đá trầm tích. Đọc lại hình:
// giới hạn sinh thái về nhiệt độ (vạch và số ở trục ngang đúng tỉ lệ; đường cong chạm trục ở hai giới hạn, một đỉnh; phần tô màu là khoảng
// thuận lợi, đỉnh ở trên đường cong, có điểm cực thuận; đường gióng, vạch ngoặc “Khoảng thuận lợi” đúng hai mép), hai đường cong tăng
// trưởng (số ở hai trục đúng tỉ lệ; nhãn (1), (2) gần đúng một đường; đường chữ J tăng ngày càng nhanh, không chững lại; đường chữ S không
// vượt đường nét đứt sức chứa, cuối đường sát sức chứa, dốc nhất quanh nửa sức chứa), tháp tuổi của ba quần thể (ba thanh cùng chiều cao
// chồng khít từ đường đáy, tên quần thể dưới tháp; tháp phát triển, ổn định, suy thoái theo tỉ lệ thanh dưới với thanh giữa).
// GDKT&PL: tuổi kết hôn (nam từ đủ 20, nữ từ đủ 18), con dưới 12 tháng tuổi trong câu về quyền yêu cầu li hôn, tuổi thành niên, tuổi vào
// lớp 1, thời giờ làm việc bình thường (bảng ghi trong script); câu tự luận: thang chấm đủ ý, bài gợi ý nói đủ các ý của thang chấm.
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân; dấu thanh kiểu sách “hoá”, “thuỷ”, “thoả”, “khoẻ”; Sinh học: thuật
// ngữ như sách in năm 2026, tên siêu đại, đại, kỉ địa chất như Bảng 22.1 (tên tiếng Anh, tên tiếng Việt trong ngoặc), địa danh của Bài 24
// như sách in năm 2026; GDKT&PL: tên luật như sách in năm 2026 (Hiến pháp năm 2013 (sửa đổi, bổ sung năm 2025), Luật Quản lí thuế năm 2025,
// Luật Doanh nghiệp năm 2020 (sửa đổi, bổ sung năm 2025)), không ghi số điều luật, mức phạt, không tên cơ quan, đơn vị hành chính cũ), lời
// dặn của đề (sách, phạm vi, số câu mỗi phần theo ma trận, trường học khác phạm vi; không có câu về đề chung của Sở), môn, lịch thi và phạm
// vi của gk2-l12, mức độ và ma trận 10 – 8 – 7 (chủ đề theo tên bài và thứ tự của sách, đối chiếu mục lục trong README của cuốn ở
// OnUp-Book; tên Bài 9 GDKT&PL rút gọn; hai đề cố định chia đúng ma trận), dạng câu theo khung Công văn 7991 (mỗi kho ít nhất 6 câu đúng/sai
// 4 ý không lặp kiểu Đ/S, Sinh học ít nhất 4 câu trả lời ngắn đáp án là số, 1–2 câu tự luận ở ô Vận dụng rút 1 câu), GDKT&PL câu tình huống
// từ hai phần ba kho, đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều
// lựa chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có, rút
// thử nhiều lần (đúng ma trận; đã làm hết một đề cố định thì không rút lại câu của đề đó), đề bài không trùng câu nào trong file, dò lộ đáp
// án giữa mọi cặp câu rút được cùng lúc (như tests/sinhhoc-ktpl12-ck1.js; đã xem ghi ở DA_XEM). So với kho cuối kì I cùng môn: không chủ đề
// nào trùng (không có câu ôn), đề bài không gần trùng (cặp hai âm tiết chung, chuỗi 6 từ chung), đáp án đúng của câu nhiều lựa chọn không
// trùng. Có sách ở ../OnUp-Book thì so mọi trường chữ với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng;
// DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác, cả kho cuối kì I và câu riêng của các đề ngẫu nhiên (không chuỗi 8 từ nào trùng;
// DO_KHO=1 in chuỗi 6 từ).
// Chạy: node tests/sinhhoc-ktpl12-gk2.js → in MATH OK.
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
   khác phạm vi; CUOI: câu cuối của lời dặn; PHAM_VI: phạm vi của môn ghi ở gk2-l12; BAI: chủ đề theo tên bài của sách (số bài để chia phần,
   đối chiếu mục lục); RUT_GON: tên bài rút gọn cho vừa mã đề "Ôn chủ đề" (tối đa 80 kí tự) và tên đầy đủ trong mục lục. */
const MON = [
  { ma: "sinhhoc", ten: "Sinh học", sach: "sinh-hoc-12", ki: "sh",
    DAU: "Sách Kết nối tri thức, Sinh học 12. Phạm vi giữa học kì II theo ma trận tra được: ",
    PHAN: [["Chương 5 Bằng chứng và các học thuyết tiến hoá (Bài 19–22)", 19, 22], ["Chương 6 Môi trường và sinh thái học quần thể (Bài 23–25)", 23, 25]],
    SAU: ["Bài 25 là bài thực hành nên không có câu riêng.", "Trường chỉ kiểm tra đến Bài 23, hoặc kiểm tra cả Bài 18 (Di truyền học quần thể), thì phụ huynh đối chiếu với đề cương của trường."],
    CUOI: "Một số câu cần máy tính cầm tay. Có lời giải từng câu.", PHAM_VI: "Sinh học: Bài 19–24.",
    BAI: [["Các bằng chứng tiến hoá", 19], ["Quan niệm của Darwin về chọn lọc tự nhiên và hình thành loài", 20], ["Học thuyết tiến hoá tổng hợp hiện đại", 21],
      ["Tiến hoá lớn và quá trình phát sinh chủng loại", 22], ["Môi trường và các nhân tố sinh thái", 23], ["Sinh thái học quần thể", 24]],
    RUT_GON: {} },
  { ma: "ktpl", ten: "GDKT&PL", sach: "giao-duc-kinh-te-va-phap-luat-12", ki: "kt",
    DAU: "Sách Kết nối tri thức, Giáo dục kinh tế và pháp luật 12, Phần hai Giáo dục pháp luật. Phạm vi giữa học kì II: ",
    PHAN: [["Bài 8–9 (Quyền và nghĩa vụ của công dân về kinh doanh và nộp thuế; về sở hữu tài sản và tôn trọng tài sản của người khác)", 8, 9],
      ["Bài 10–11 (Quyền và nghĩa vụ của công dân trong hôn nhân và gia đình; trong học tập)", 10, 11]],
    SAU: ["Trường kiểm tra cả Bài 12–14 thì phụ huynh đối chiếu với đề cương của trường."],
    CUOI: "Phần lớn là câu tình huống. Có lời giải từng câu.", PHAM_VI: "GDKT&PL: Bài 8–11.",
    BAI: [["Quyền và nghĩa vụ của công dân về kinh doanh và nộp thuế", 8], ["Quyền và nghĩa vụ về sở hữu tài sản, tôn trọng tài sản người khác", 9],
      ["Quyền và nghĩa vụ của công dân trong hôn nhân và gia đình", 10], ["Quyền và nghĩa vụ của công dân trong học tập", 11]],
    RUT_GON: { "Quyền và nghĩa vụ về sở hữu tài sản, tôn trọng tài sản người khác": "Quyền và nghĩa vụ của công dân về sở hữu tài sản và nghĩa vụ tôn trọng tài sản của người khác" } }
];
const ten = new Map();
MON.forEach((m) => {
  const pool = BANKS.find((b) => b.pool && b.id === m.ma + "12-gk2-ngau-nhien");
  assert.ok(pool, "thiếu đề ngẫu nhiên " + m.ma + "12-gk2-ngau-nhien");
  m.pool = pool; m.DE = pool.pool.from; m.M = pool.pool.matrix; m.kho = pool.questions; m.file = pool.file;
  assert.equal(m.file, "12-" + m.ma + ".js", "file câu hỏi theo mã môn");
  assert.equal(m.DE.length, 2, m.ma + ": đề ngẫu nhiên lấy câu của hai đề cố định");
  assert.deepEqual(BANKS.filter((b) => b.id.startsWith(m.ma + "12-gk2-")).map((b) => b.id).sort(), [...m.DE, pool.id].sort(), m.ma + ": kho gồm hai đề cố định và đề ngẫu nhiên");
  assert.equal(m.kho.filter((q) => q.src === pool.id).length, 0, m.ma + ": đề ngẫu nhiên không có câu riêng");
  assert.ok(pool.title === m.ten + " 12 · Giữa kì II · Đề ngẫu nhiên" && pool.grade === 12 && pool.subject === m.ten, m.ma + ": tên, khối, môn của đề ngẫu nhiên");
  m.DE.forEach((id, k) => {
    const b = bank(id);
    assert.ok(b.file === m.file && b.subject === m.ten && b.grade === 12 && b.minutes === pool.minutes && b.n === pool.n, id + ": cùng file, môn, khối, số phút, số câu với đề ngẫu nhiên");
    assert.equal(b.title, m.ten + " 12 · Giữa kì II · Đề " + (k + 1), id + ": tên đề");
    assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
    m.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, m.ki + (k + 1) + "#" + (i + 1)));
  });
  assert.equal(m.kho.length, sum(m.DE.map((id) => bank(id).n)), m.ma + ": kho = câu của hai đề cố định");
  // kho cuối kì I cùng môn (để so: không có câu ôn, đề bài không gần trùng, đáp án không trùng)
  const ck1 = BANKS.find((b) => b.pool && b.id === m.ma + "12-ck1-ngau-nhien");
  assert.ok(ck1 && ck1.file === m.file, m.ma + ": có kho cuối kì I cùng file");
  m.ck1 = ck1.questions;
  m.ck1.forEach((q) => ten.set(q, "ck1-" + m.ki + (ck1.pool.from.indexOf(q.src) + 1) + "#" + (bank(q.src).questions.findIndex((p) => p.q === q.q) + 1)));
});
const [SH, KT] = MON;
// môn đúng chữ của lịch thi (MON_THPT), sáu mã đề gắn vào kì thi giữa kì II lớp 12, phạm vi của kì thi ghi đúng số bài
{
  const lich = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
  const mon = /const MON_THPT = \[([^\]]*)\]/.exec(lich);
  MON.forEach((m) => assert.ok(mon && mon[1].includes('"' + m.ten + '"'), "môn " + m.ten + " có trong MON_THPT"));
  const c = vm.createContext({ window: {} }); vm.runInContext(lich, c);
  const ev = c.window.ONTAP_SEED_EVENTS.find((e) => e.id === "gk2-l12");
  assert.ok(ev && ev.grades.includes(12), "có kì thi gk2-l12");
  MON.forEach((m) => {
    [...m.DE, m.pool.id].forEach((id) => assert.ok(ev.banks.includes(id), id + " gắn vào gk2-l12"));
    assert.ok(ev.scope.includes(m.PHAM_VI), "phạm vi của gk2-l12 ghi “" + m.PHAM_VI + "”");
    const [, tu, den] = /Bài (\d+)–(\d+)\.$/.exec(m.PHAM_VI);
    assert.deepEqual([Math.min(...m.BAI.map((b) => b[1])), Math.max(...m.BAI.map((b) => b[1]))], [+tu, +den], m.ma + ": chủ đề từ bài đầu đến bài cuối của phạm vi ghi ở gk2-l12");
  });
}

/* ---------- số ----------
   Số trong đề: hàng nghìn ngăn bằng khoảng trắng, dấu phẩy thập phân. Tỉ lệ viết phân số "a/b" (đáp án câu trả lời ngắn). */
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
// phân số chính xác { n, d }
const ucln = (a, b) => (b ? ucln(b, a % b) : Math.abs(a));
const F = (n, d = 1) => { assert.ok(Number.isInteger(n) && Number.isInteger(d) && d !== 0, "phân số " + n + "/" + d); if (d < 0) { n = -n; d = -d; } const g = ucln(n, d) || 1; return { n: n / g, d: d / g }; };
const fCong = (a, b) => F(a.n * b.d + b.n * a.d, a.d * b.d), fNhan = (a, b) => F(a.n * b.n, a.d * b.d), fChia = (a, b) => F(a.n * b.d, a.d * b.n);
const fChu = (f) => f.n + "/" + f.d, fSo = (f) => f.n / f.d;
const fThap = (x) => F(Math.round(x * 1e6), 1e6); // số thập phân của đề → phân số
const docPS = (s) => { const m = /^(\d+)\/(\d+)$/.exec(String(s).trim()); assert.ok(m, "không đọc được phân số “" + s + "”"); return F(+m[1], +m[2]); };
// dãy số ngăn bằng “; ” sau một đoạn chữ: “lần lượt là 3; 4; 2” → [3, 4, 2]
const day = (s, truoc, sau) => { const m = new RegExp(escRe(truoc) + "((?:" + NUM + "; )+" + NUM + ")" + escRe(sau), "u").exec(s); assert.ok(m, "không thấy dãy số sau “" + truoc + "”"); return m[1].split("; ").map(val); };

/* ---------- Sinh học: bảng theo sách ----------
   Bảng 22.1 (Tóm tắt các đại địa chất…): siêu đại (Eon), đại (Era), kỉ (Period) với tên tiếng Việt trong ngoặc như sách; thời gian (triệu
   năm trước) và các sự kiện câu hỏi dùng. Bài 22: hoá thạch tế bào nhân sơ cổ nhất 3 500, nhân thực 1 800 triệu năm. */
const SIEU_DAI = [["Phanerozoic", "Hiển sinh"], ["Proterozoic", "Nguyên sinh"], ["Archean", "Thái cổ"]];
const DAI = [["Cenozoic", "Tân sinh"], ["Mesozoic", "Trung sinh"], ["Paleozoic", "Cổ sinh"]];
const KI = [ // [tên, tên tiếng Việt, từ, đến (triệu năm trước), đại]
  ["Quaternary", "Đệ tứ", 1.8, 0, "Cenozoic"], ["Tertiary", "Đệ tam", 65, 1.8, "Cenozoic"], ["Cretaceous", "Phấn trắng", 144, 65, "Mesozoic"],
  ["Jurassic", "", 206, 144, "Mesozoic"], ["Triassic", "Tam điệp", 248, 206, "Mesozoic"], ["Permian", "", 290, 248, "Paleozoic"],
  ["Carboniferous", "Than đá", 354, 290, "Paleozoic"], ["Devonian", "", 417, 354, "Paleozoic"], ["Silurian", "", 443, 417, "Paleozoic"],
  ["Ordovician", "", 490, 443, "Paleozoic"], ["Cambrian", "", 543, 490, "Paleozoic"]];
const kiCua = (ten_) => { const k = KI.find((x) => x[0] === ten_); assert.ok(k, "kỉ " + ten_); return k; };
const SU_KIEN = { // sự kiện → kỉ (theo cột “Các sự kiện quan trọng”) hoặc số triệu năm
  "thực vật lên cạn": "Ordovician", "lưỡng cư xuất hiện": "Devonian", "bò sát xuất hiện": "Carboniferous", "thực vật hạt trần phát triển mạnh": "Carboniferous",
  "khủng long, thú xuất hiện": "Triassic", "khủng long phát sinh, ngự trị": "Jurassic", "thực vật có hoa xuất hiện": "Jurassic", "khủng long tuyệt diệt": "Cretaceous",
  "loài người xuất hiện": "Quaternary", "tế bào nhân sơ": 3500, "tế bào nhân thực": 1800 };
// thời điểm bắt đầu của sự kiện (triệu năm trước); “khủng long tuyệt diệt” là cuối kỉ
const luc = (sk) => { const v = SU_KIEN[sk]; assert.ok(v !== undefined, "sự kiện " + sk); if (typeof v === "number") return v; const k = kiCua(v); return sk === "khủng long tuyệt diệt" ? k[3] : k[2]; };
const tenKi = (ten_) => { const k = kiCua(ten_); return k[1] ? k[0] + " (" + k[1] + ")" : k[0]; };
// ba giai đoạn phát sinh sự sống (Bài 22), các bước nghiên cứu của Darwin (Bài 20), các giai đoạn phát sinh loài người (Bài 22)
const GD_SU_SONG = ["tiến hoá hoá học", "tiến hoá tiền sinh học", "tiến hoá sinh học"];
const BUOC_DARWIN = ["quan sát, thu thập dữ liệu", "đề xuất giả thuyết", "kiểm chứng giả thuyết bằng thực nghiệm"];
const LOAI_NGUOI = ["Ardipithecus", "Australopithecus", "chi Homo"];
// một chuỗi “A → B → C” là hoán vị của các bước; trả thứ tự (mảng chỉ số), bước viết gọn “kiểm chứng bằng thực nghiệm” vẫn nhận ra
const thuTu = (s, buoc) => s.split(" → ").map((p) => { const k = buoc.findIndex((b) => p.toLowerCase().replace(" giả thuyết bằng", " bằng") === b.toLowerCase().replace(" giả thuyết bằng", " bằng")); assert.ok(k >= 0, "không nhận ra bước “" + p + "”"); return k; });

/* ---------- GDKT&PL: bảng theo luật (như sách) ---------- */
const LUAT = { tuoiKetHon: { trai: 20, gái: 18 }, thanhNien: 18, conNho: 12 /* tháng tuổi */, vaoLop1: 6, lopCuoiTHCS: 9, gioLam: 8 };

/* ---------- hình ---------- */
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
const daDoc = new Set();
// thang số của một trục: [[toạ độ, số], …] → hàm đổi toạ độ ra số; mọi số phải đúng tỉ lệ
const thang = (ds, at) => { const [p, q] = [ds[0], ds[ds.length - 1]], b = (q[0] - p[0]) / (q[1] - p[1]), a = p[0] - b * p[1];
  ds.forEach(([u, v]) => assert.ok(Math.abs(a + b * v - u) < 0.5, at + ": số " + v + " không đúng tỉ lệ trên trục")); return (u) => (u - a) / b; };
/* Giới hạn sinh thái về nhiệt độ: trục ngang (đoạn ngang màu ink) có vạch chia, mỗi vạch một số ngay dưới; đường cong (polyline acc) đi từ
   trái sang phải, chạm trục ở hai đầu (giới hạn dưới, giới hạn trên), một đỉnh (điểm cực thuận); phần tô ok-soft đứng trên trục, các đỉnh
   trên nằm trên đường cong (khoảng thuận lợi), hai đường gióng nét đứt ở hai mép; vạch ngoặc màu ok đúng hai mép, chữ “Khoảng thuận lợi” ở
   giữa ngay trên. Giới hạn và hai mép khoảng thuận lợi rơi đúng vạch có số. */
const docGioiHan = (svg, at) => {
  const L = tags(svg, "line"), T = texts(svg);
  const truc = L.filter((l) => l.y1 === l.y2 && l.stroke === "ink"); assert.equal(truc.length, 1, at + ": một trục ngang");
  const yT = +truc[0].y1;
  const vach = L.filter((l) => l.x1 === l.x2 && Math.min(+l.y1, +l.y2) < yT && Math.max(+l.y1, +l.y2) > yT).map((l) => +l.x1);
  const soX = vach.map((x) => { const s = T.filter((t) => /^\d+$/.test(t.t) && t.anchor === "middle" && Math.abs(t.at[0] - x) < 0.5 && t.at[1] > yT && t.at[1] < yT + 30);
    assert.equal(s.length, 1, at + ": mỗi vạch một số ngay dưới"); return [x, +s[0].t]; });
  assert.ok(soX.length >= 3, at + ": ít nhất ba vạch có số");
  const TX = thang(soX, at);
  const cong = tags(svg, "polyline").filter((p) => p.stroke === "acc"); assert.equal(cong.length, 1, at + ": một đường cong");
  const P = diem(cong[0].points);
  assert.ok(P.every((p, i) => i === 0 || p[0] > P[i - 1][0]), at + ": đường cong đi từ trái sang phải");
  assert.ok(P[0][1] === yT && P[P.length - 1][1] === yT && P.slice(1, -1).every(([, v]) => v < yT), at + ": đường cong chạm trục ở hai đầu, ở trên trục ở giữa");
  const iMax = P.reduce((k, p, i) => (p[1] < P[k][1] ? i : k), 0);
  assert.ok(P.every((p, i) => i === 0 || (i <= iMax ? p[1] <= P[i - 1][1] : p[1] >= P[i - 1][1])), at + ": đường cong lên rồi xuống, một đỉnh");
  const yCong = (x) => { for (let i = 1; i < P.length; i++) if (x <= P[i][0]) { const [x1, y1] = P[i - 1], [x2, y2] = P[i]; return y1 + ((y2 - y1) * (x - x1)) / (x2 - x1); } return yT; };
  const to = tags(svg, "polygon").filter((p) => p.fill === "ok-soft"); assert.equal(to.length, 1, at + ": một phần tô màu");
  const Q = diem(to[0].points), xa = Math.min(...Q.map((v) => v[0])), xb = Math.max(...Q.map((v) => v[0]));
  Q.forEach(([x, v]) => assert.ok(v === yT || Math.abs(v - yCong(x)) < 0.6, at + ": đỉnh (" + x + ", " + v + ") của phần tô màu không ở trên đường cong"));
  assert.equal(Q.filter(([, v]) => v === yT).map(([x]) => x).sort((u, w) => u - w).join(), [xa, xb].join(), at + ": phần tô màu đứng trên trục từ hai mép");
  [xa, xb].forEach((x) => assert.ok(L.some((l) => l["stroke-dasharray"] && +l.x1 === x && +l.x2 === x && Math.max(+l.y1, +l.y2) === yT && Math.abs(Math.min(+l.y1, +l.y2) - yCong(x)) < 0.6), at + ": đường gióng nét đứt ở mép phần tô màu"));
  const ngoac = L.filter((l) => l.stroke === "ok" && l.y1 === l.y2); assert.equal(ngoac.length, 1, at + ": một vạch ngoặc");
  assert.ok(Math.min(+ngoac[0].x1, +ngoac[0].x2) === xa && Math.max(+ngoac[0].x1, +ngoac[0].x2) === xb, at + ": vạch ngoặc đúng hai mép khoảng thuận lợi");
  const chu_ = T.find((t) => t.t === "Khoảng thuận lợi");
  assert.ok(chu_ && chu_.anchor === "middle" && Math.abs(chu_.at[0] - (xa + xb) / 2) < 0.5 && chu_.at[1] < +ngoac[0].y1, at + ": chữ “Khoảng thuận lợi” ở giữa, ngay trên vạch ngoặc");
  assert.ok(P[iMax][0] > xa && P[iMax][0] < xb, at + ": điểm cực thuận nằm trong khoảng thuận lợi");
  const kq = { lo: TX(P[0][0]), hi: TX(P[P.length - 1][0]), tl: [TX(xa), TX(xb)] };
  [kq.lo, kq.hi, ...kq.tl].forEach((v) => assert.ok(soX.some(([, s]) => s === v), at + ": giới hạn, mép khoảng thuận lợi " + v + " rơi đúng vạch có số"));
  chuHinh(svg, at); daDoc.add(svg);
  return kq;
};
/* Hai đường cong tăng trưởng: trục ngang, trục đứng (ink) gặp nhau ở gốc; vạch trục đứng có số căn phải bên trái, vạch trục ngang có số căn
   giữa bên dưới, số 0 ở gốc, mọi số đúng tỉ lệ; hai polyline đi lên; nhãn (1), (2) gần đúng một đường (đường kia xa ít nhất gấp đôi), mỗi
   đường một nhãn; đường nét đứt nằm ngang là sức chứa của môi trường. Chữ J: hệ số góc tăng dần; chữ S: không vượt sức chứa, cuối đường
   sát sức chứa (dưới 2%), không phải chữ J; nDoc: số cá thể ở quãng dốc nhất của đường (2). */
const docTangTruong = (svg, at) => {
  const L = tags(svg, "line"), T = texts(svg), ink = L.filter((l) => l.stroke === "ink");
  const ox = ink.filter((l) => l.y1 === l.y2 && Math.abs(l.x2 - l.x1) > 100), oy = ink.filter((l) => l.x1 === l.x2 && Math.abs(l.y2 - l.y1) > 100);
  assert.ok(ox.length === 1 && oy.length === 1, at + ": một trục ngang, một trục đứng");
  const gx = +oy[0].x1, gy = +ox[0].y1;
  assert.ok(Math.min(+ox[0].x1, +ox[0].x2) === gx && Math.max(+oy[0].y1, +oy[0].y2) === gy, at + ": hai trục gặp nhau ở gốc");
  const vy = ink.filter((l) => l.y1 === l.y2 && l !== ox[0] && Math.max(+l.x1, +l.x2) === gx).map((l) => +l.y1);
  const vx = ink.filter((l) => l.x1 === l.x2 && l !== oy[0] && Math.min(+l.y1, +l.y2) === gy).map((l) => +l.x1);
  const soY = vy.map((v) => { const s = T.filter((t) => /^\d+$/.test(t.t) && t.anchor === "end" && t.at[0] < gx && Math.abs(t.at[1] - 5 - v) < 0.5); assert.equal(s.length, 1, at + ": mỗi vạch trục đứng một số"); return [v, +s[0].t]; });
  const soX = vx.map((x) => { const s = T.filter((t) => /^\d+$/.test(t.t) && t.anchor === "middle" && Math.abs(t.at[0] - x) < 0.5 && t.at[1] > gy); assert.equal(s.length, 1, at + ": mỗi vạch trục ngang một số"); return [x, +s[0].t]; });
  assert.ok(soY.length >= 3 && soX.length >= 3, at + ": hai trục có số");
  assert.ok(soY.some(([v, s]) => s === 0 && v === gy) && soX.some(([x, s]) => s === 0 && x === gx), at + ": số 0 ở gốc của hai trục");
  const Nof = thang(soY, at + " (trục đứng)"), tOf = thang(soX, at + " (trục ngang)");
  const duong = tags(svg, "polyline").map((p) => diem(p.points)); assert.equal(duong.length, 2, at + ": hai đường cong");
  const kc = (P, [x, v]) => Math.min(...P.slice(1).map((B, i) => { const A = P[i], dx = B[0] - A[0], dy = B[1] - A[1], t = Math.max(0, Math.min(1, ((x - A[0]) * dx + (v - A[1]) * dy) / (dx * dx + dy * dy))); return Math.hypot(A[0] + t * dx - x, A[1] + t * dy - v); }));
  const nhan = {};
  ["(1)", "(2)"].forEach((s) => { const t = T.filter((u) => u.t === s); assert.equal(t.length, 1, at + ": một nhãn " + s);
    const h = hopChu(t[0]), c = [(h[0] + h[2]) / 2, (h[1] + h[3]) / 2], d = duong.map((P) => kc(P, c)), k = d[0] < d[1] ? 0 : 1;
    assert.ok(d[1 - k] >= 2 * d[k], at + ": nhãn " + s + " gần cả hai đường"); nhan[s] = duong[k]; });
  assert.ok(nhan["(1)"] !== nhan["(2)"], at + ": mỗi đường một nhãn");
  const doc_ = (P) => P.map(([x, v]) => [tOf(x), Nof(v)]), D1 = doc_(nhan["(1)"]), D2 = doc_(nhan["(2)"]);
  [D1, D2].forEach((D) => assert.ok(D.every((p, i) => i === 0 || (p[0] > D[i - 1][0] && p[1] >= D[i - 1][1])), at + ": đường cong đi lên từ trái sang phải"));
  const ngang = L.filter((l) => l["stroke-dasharray"] && l.y1 === l.y2); assert.equal(ngang.length, 1, at + ": một đường nét đứt nằm ngang");
  const K = Nof(+ngang[0].y1);
  const hsg = (D) => D.slice(1).map((p, i) => (p[1] - D[i][1]) / (p[0] - D[i][0]));
  const laJ = (D) => hsg(D).every((s, i, a) => i === 0 || s > a[i - 1]);
  const laS = (D) => D.every((p) => p[1] <= K + 0.5) && K - D[D.length - 1][1] < 0.02 * K && !laJ(D);
  const s2 = hsg(D2), k2 = s2.indexOf(Math.max(...s2));
  chuHinh(svg, at); daDoc.add(svg);
  return { J1: laJ(D1), S1: laS(D1), J2: laJ(D2), S2: laS(D2), K, nDoc: (D2[k2][1] + D2[k2 + 1][1]) / 2 };
};
/* Tháp tuổi: mỗi tháp ba thanh (rect) cùng chiều cao, cùng tâm, chồng khít từ đường đáy (đoạn ngang ink); tên tháp (một chữ in hoa, đậm,
   căn giữa) dưới đường đáy; mọi thanh thuộc một tháp. Thanh từ dưới lên: trước sinh sản, sinh sản, sau sinh sản. Dạng tháp theo tỉ lệ
   thanh dưới với thanh giữa: từ 1,2 là phát triển, đến 0,8 là suy thoái, lệch không quá 10% là ổn định (khác thì hình không rõ dạng). */
const docThapTuoi = (svg, at) => {
  const R_ = tags(svg, "rect").map((r) => ({ y: +r.y, w: +r.width, h: +r.height, cx: +r.x + +r.width / 2 }));
  const day_ = tags(svg, "line").filter((l) => l.y1 === l.y2 && l.stroke === "ink"); assert.equal(day_.length, 1, at + ": một đường đáy");
  const yD = +day_[0].y1, T = texts(svg);
  const thap = T.filter((t) => /^[A-Z]$/.test(t.t)).map((t) => {
    const tt = R_.filter((r) => Math.abs(r.cx - t.at[0]) < 0.5).sort((a, b) => b.y - a.y);
    assert.equal(tt.length, 3, at + ": tháp " + t.t + " có ba thanh");
    assert.ok(t.b && t.anchor === "middle" && t.at[1] > yD, at + ": tên tháp " + t.t + " đậm, căn giữa, dưới đường đáy");
    assert.ok(tt[0].y + tt[0].h === yD && tt.every((r, i) => r.h === tt[0].h && (i === 0 || r.y + r.h === tt[i - 1].y)), at + ": ba thanh của tháp " + t.t + " chồng khít từ đường đáy, cùng chiều cao");
    return { ten: t.t, w: tt.map((r) => r.w) };
  });
  assert.equal(thap.length * 3, R_.length, at + ": mọi thanh thuộc một tháp");
  const dang = (w) => (w[0] >= 1.2 * w[1] ? "phát triển" : w[0] <= 0.8 * w[1] ? "suy thoái" : Math.abs(w[0] - w[1]) <= 0.1 * w[1] ? "ổn định" : "?");
  chuHinh(svg, at); daDoc.add(svg);
  return Object.fromEntries(thap.map((t) => [t.ten, { w: t.w, dang: dang(t.w), tiLe: t.w[0] / t.w[1] }]));
};

/* ---------- các câu cần tính ----------
   id: sh1, sh2 (Sinh học Đề 1, 2), kt1, kt2 (GDKT&PL Đề 1, 2); has: đoạn chữ có trong đúng một câu. right(q) trả đáp án tính được
   (số, phân số "a/b", lựa chọn đúng, hoặc mảng 4 ý của câu đúng/sai, null ở ý không tính bằng code); essay(q) kiểm tra câu tự luận. */
const CHECKS = [
  // ---- Sinh học, Đề 1 ----
  { id: "sh1", has: "loài P – 2; loài Q – 19", right: (q) => {
    // số amino acid khác người càng nhiều thì tách khỏi nhánh của người càng sớm, họ hàng càng xa
    const d = Object.fromEntries([...q.q.matchAll(/loài ([A-Z]) – (\d+)/g)].map((m) => [m[1], +m[2]])), ds = Object.keys(d).sort((a, b) => d[a] - d[b]);
    assert.equal(ds.length, 4); assert.equal(new Set(Object.values(d)).size, 4, "bốn số khác nhau");
    const dung = q.o.filter((o) => {
      let m = /^Loài ([A-Z]) tách khỏi nhánh của người sớm nhất trong bốn loài$/.exec(o); if (m) return m[1] === ds[3];
      m = /^Loài ([A-Z]) có quan hệ họ hàng gần người nhất trong bốn loài$/.exec(o); if (m) return m[1] === ds[0];
      m = /^Loài ([A-Z]) có họ hàng với người gần hơn so với loài ([A-Z])$/.exec(o); if (m) return d[m[1]] < d[m[2]];
      m = y(o, /^Loài ([A-Z]) tách khỏi nhánh của người sớm hơn so với loài ([A-Z])$/); return d[m[1]] > d[m[2]]; });
    assert.equal(dung.length, 1, "chỉ một kết luận đúng");
    coX(q, "Loài " + ds[3] + " khác người " + d[ds[3]] + " amino acid", "loài " + ds[0] + " (khác " + d[ds[0]] + ") gần người nhất, rồi đến " + ds[1] + " (khác " + d[ds[1]] + "), " + ds[2] + " (khác " + d[ds[2]] + ")");
    return dung[0]; } },
  { id: "sh1", has: "Darwin đã đi từ những quan sát của mình", right: (q) => {
    const dung = q.o.filter((o) => thuTu(o, BUOC_DARWIN).join() === "0,1,2"); assert.equal(dung.length, 1);
    assert.ok(q.o.every((o) => new Set(thuTu(o, BUOC_DARWIN)).size === 3), "mỗi lựa chọn là một thứ tự của ba bước"); return dung[0]; } },
  { id: "sh1", has: "cây có kiểu gene aa chết khi còn non", right: (q) => {
    // thế hệ xuất phát theo Hardy – Weinberg; aa chết trước khi sinh sản: q₁ = pq : (p² + 2pq) = q : (1 + q)
    const [q0] = so(q.q, "tần số allele a là #"), qa = fThap(q0), pa = fCong(F(1), F(-qa.n, qa.d));
    const AA = fNhan(pa, pa), Aa = fNhan(F(2), fNhan(pa, qa)), q1 = fChia(fNhan(F(1, 2), Aa), fCong(AA, Aa));
    assert.equal(fChu(q1), fChu(fChia(qa, fCong(F(1), qa))));
    coX(q, vn(fSo(AA)), vn(fSo(Aa)), vn(fSo(fCong(AA, Aa))), "= " + fChu(q1)); return fChu(q1); } },
  { id: "sh1", has: "Loài cỏ X có bộ NST 2n = 16", right: (q) => {
    // con lai mang hai bộ đơn bội khác loài; đa bội hoá thành thể song nhị bội 2(n₁ + n₂)
    const [a, b] = [...q.q.matchAll(/bộ NST 2n = (\d+)/g)].map((m) => +m[1]); assert.ok(a % 2 === 0 && b % 2 === 0);
    coX(q, a / 2 + " + " + b / 2 + " = " + (a / 2 + b / 2), "2 · " + (a / 2 + b / 2) + " = " + (a + b)); return a + b; } },
  { id: "sh1", has: "sự sống trên Trái Đất đã phát sinh qua ba giai đoạn", right: (q) => {
    const dung = q.o.filter((o) => thuTu(o, GD_SU_SONG).join() === "0,1,2"); assert.equal(dung.length, 1);
    assert.ok(q.o.every((o) => new Set(thuTu(o, GD_SU_SONG)).size === 3), "mỗi lựa chọn là một thứ tự của ba giai đoạn"); return dung[0]; } },
  { id: "sh1", has: "thực vật có hoa xuất hiện ở đại nào", right: (q) => {
    const dai = kiCua(SU_KIEN["khủng long phát sinh, ngự trị"])[4]; assert.equal(kiCua(SU_KIEN["thực vật có hoa xuất hiện"])[4], dai, "hai sự kiện cùng một đại");
    const ten_ = (o) => { const m = y(o, /^(Siêu đại|Đại) (\w+) \(([^)]+)\)$/), bang = m[1] === "Đại" ? DAI : SIEU_DAI; assert.ok(bang.some(([e, v]) => e === m[2] && v === m[3]), "tên như Bảng 22.1: " + o); return m[2]; };
    const dung = q.o.filter((o) => ten_(o) === dai); assert.equal(dung.length, 1); return dung[0]; } },
  { id: "sh1", has: "lớp đá chứa hoá thạch lưỡng cư đó", right: (q) => {
    // có lưỡng cư, chưa có bò sát, ngay dưới lớp có bò sát: kỉ ngay trước kỉ bò sát xuất hiện
    const iBS = KI.indexOf(kiCua(SU_KIEN["bò sát xuất hiện"])), iLC = KI.indexOf(kiCua(SU_KIEN["lưỡng cư xuất hiện"]));
    const kiO = (o) => { const m = y(o, /^Kỉ (\w+)(?: \(([^)]+)\))?$/); assert.equal(tenKi(m[1]), m[1] + (m[2] ? " (" + m[2] + ")" : ""), "tên kỉ như Bảng 22.1"); return KI.indexOf(kiCua(m[1])); };
    const dung = q.o.filter((o) => { const i = kiO(o); return i <= iLC && i === iBS + 1; }); assert.equal(dung.length, 1);
    coX(q, "lưỡng cư xuất hiện ở kỉ " + tenKi(SU_KIEN["lưỡng cư xuất hiện"]), "là kỉ " + tenKi(SU_KIEN["bò sát xuất hiện"])); return dung[0]; } },
  { id: "sh1", has: "mức sinh trưởng của loài cá X theo nhiệt độ nước", right: (q) => {
    const h = docGioiHan(q.svg, "giới hạn sinh thái"), T = day(q.q, "lần lượt là: ", " (°C)");
    assert.equal(T.length, 12, "nhiệt độ của 12 tháng"); assert.ok(T.every((t) => !h.tl.includes(t)), "không tháng nào đúng bằng mép khoảng thuận lợi");
    const thang_ = T.map((t, i) => [i + 1, t]).filter(([, t]) => t > h.tl[0] && t < h.tl[1]);
    coX(q, "từ " + h.tl[0] + " °C đến " + h.tl[1] + " °C", "từ " + h.lo + " °C đến " + h.hi + " °C", "tức " + thang_.length + " tháng");
    thang_.forEach(([i, t]) => assert.ok(new RegExp("(?:tháng |, )" + i + " \\(" + t + " °C\\)").test(q.x), "lời giải kể tháng " + i));
    assert.ok(T.every((t) => t > h.lo && t < h.hi), "cá sống được cả năm (đề không hỏi tháng cá chết)"); return thang_.length; } },
  { id: "sh1", has: "hai đường cong tăng trưởng (1) và (2)", right: (q) => {
    const h = docTangTruong(q.svg, "đường cong tăng trưởng");
    assert.ok(h.J1 && !h.S1 && h.S2 && !h.J2, "đường (1) chữ J, đường (2) chữ S");
    assert.ok(Math.abs(h.nDoc - h.K / 2) < 0.1 * h.K, "đường (2) dốc nhất quanh nửa sức chứa");
    const [a, b, c, d] = q.o;
    assert.ok(/^Đường \(1\) là kiểu tăng trưởng thường gặp khi nguồn sống của môi trường bị giới hạn\.$/.test(a) && /^Đường \(1\) có dạng chữ J, biểu diễn tăng trưởng theo tiềm năng sinh học\.$/.test(c)
      && /^Ở đường \(2\), số cá thể tăng nhanh nhất khi quần thể đã gần đạt sức chứa của môi trường\.$/.test(d), "các ý");
    const Kb = val(y(b, /^Theo đường \(2\), sức chứa của môi trường đối với quần thể vào khoảng ([\d ]+) cá thể\.$/)[1]);
    coX(q, "ở mức " + vn(h.K) + " cá thể", "khoảng " + vn(h.K / 2) + " cá thể");
    return [h.S1, gan(Kb, h.K, 0.01), h.J1, h.nDoc > 0.8 * h.K]; } },
  { id: "sh1", has: "cỏ mần trầu", essay: (q) => {
    const [S] = so(q.q, "bãi đất rộng # m²"), [k, canh] = so(q.q, "đặt ngẫu nhiên # ô vuông, mỗi ô có cạnh # cm"), dem = day(q.q, "lần lượt là ", ". a)"), [md2] = so(q.q, "tính được mật độ # cây/m²");
    assert.equal(dem.length, k, "số ô bằng số lần đếm");
    const tb = sum(dem) / k, o = (canh / 100) ** 2, md = tb / o, N = md * S, N2 = md2 * S, giam = ((N - N2) / N) * 100;
    coThang(q, vn(tb), vn(o) + " m²", vn(md) + " cây/m²", vn(N) + " cây", vn(N2) + " cây", vn(giam) + "%");
    coX(q, vn(tb) + " cây", vn(md) + " cây/m²", vn(N) + " cây", vn(N2) + " cây", vn(giam) + "%");
    assert.equal(dapSo(q), "a) " + vn(md) + " cây/m²; " + vn(N) + " cây; b) giảm " + vn(giam) + "%"); } },
  // ---- Sinh học, Đề 2 ----
  { id: "sh2", has: "Ở một vách đá gồm nhiều lớp trầm tích", right: (q) => {
    // lớp càng sâu càng cổ (địa tầng không xáo trộn)
    const LOP = { "sâu nhất": 0, giữa: 1, "gần mặt đất nhất": 2 }, ds = [...q.q.matchAll(/hoá thạch loài (?:cá )?([A-Z]) ([^;]*?)ở lớp (sâu nhất|giữa|gần mặt đất nhất)/g)].map((m) => ({ ten: m[1], tk: m[2], lop: LOP[m[3]] }));
    assert.equal(ds.length, 3); const L_ = Object.fromEntries(ds.map((d) => [d.ten, d]));
    const [a, , , d] = q.o, mA = y(a, /^Hoá thạch loài ([A-Z]) có tuổi lớn hơn hoá thạch loài ([A-Z]) và loài ([A-Z])\.$/), mD = y(d, /^Loài ([A-Z]) có thể là một dạng trung gian chuyển tiếp giữa cá và động vật có bốn chi\.$/);
    const r = L_[mD[1]], ca = ds.find((x) => /^cá /.test(q.q.slice(q.q.indexOf("loài cá " + x.ten) - 0)) || q.q.includes("loài cá " + x.ten)), bonChi = ds.find((x) => /bốn chi/.test(x.tk) && !/vây/.test(x.tk));
    const trungGian = /vây/.test(r.tk) && /chi/.test(r.tk) && ca && bonChi && r.lop > ca.lop && r.lop < bonChi.lop;
    return [L_[mA[1]].lop < L_[mA[2]].lop && L_[mA[1]].lop < L_[mA[3]].lop, null, null, trungGian]; } },
  { id: "sh2", has: "bắt ngẫu nhiên 30 con cá", right: (q) => {
    const [n] = so(q.q, "bắt ngẫu nhiên # con cá"), [AA, Aa, aa] = so(q.q, "có # con AA, # con Aa và # con aa"); assert.equal(AA + Aa + aa, n);
    coX(q, Aa + " · 1 + " + aa + " · 2 = " + (Aa + 2 * aa), n + " · 2 = " + 2 * n); return (Aa + 2 * aa) / (2 * n); } },
  { id: "sh2", has: "quần thể thỏ rừng có 900 con", right: (q) => {
    const [N, p] = so(q.q, "có # con, tần số allele A là #"), [m, pm] = so(q.q, "Có # con thỏ từ một quần thể khác cùng loài, có tần số allele A là #");
    const kq = (N * 2 * p + m * 2 * pm) / (2 * (N + m)); coX(q, "m = " + vn(m) + " : " + vn(N + m) + " = " + vn(m / (N + m)));
    assert.ok(gan(kq, p * (1 - m / (N + m)) + pm * (m / (N + m)))); return kq; } },
  { id: "sh2", has: "Theo sơ đồ phát sinh loài người", right: (q) => {
    const dung = q.o.filter((o) => thuTu(o, LOAI_NGUOI).join() === "0,1,2"); assert.equal(dung.length, 1);
    assert.ok(q.o.every((o) => new Set(thuTu(o, LOAI_NGUOI)).size === 3)); return dung[0]; } },
  { id: "sh2", has: "mỗi ý sau về thứ tự xuất hiện của các nhóm sinh vật", right: (q) => {
    const [a, b, c, d] = q.o;
    assert.ok(/^Thực vật có hoa xuất hiện trước khi thực vật lên cạn\.$/.test(a) && /^Loài người xuất hiện khi khủng long còn đang ngự trị\.$/.test(b)
      && /^Tế bào nhân sơ xuất hiện trước tế bào nhân thực\.$/.test(c) && /^Thực vật hạt trần đã phát triển mạnh trước khi thực vật có hoa xuất hiện\.$/.test(d), "các ý");
    coX(q, "(kỉ " + tenKi(SU_KIEN["thực vật lên cạn"]) + ")", "cuối kỉ " + tenKi(SU_KIEN["khủng long tuyệt diệt"]), "ở kỉ " + tenKi(SU_KIEN["loài người xuất hiện"]),
      vn(luc("tế bào nhân sơ") / 1000) + " tỉ năm", vn(luc("tế bào nhân thực") / 1000) + " tỉ năm", "từ kỉ " + tenKi(SU_KIEN["thực vật hạt trần phát triển mạnh"]));
    return [luc("thực vật có hoa xuất hiện") > luc("thực vật lên cạn"), luc("loài người xuất hiện") >= luc("khủng long tuyệt diệt"),
      luc("tế bào nhân sơ") > luc("tế bào nhân thực"), luc("thực vật hạt trần phát triển mạnh") > luc("thực vật có hoa xuất hiện")]; } },
  { id: "sh2", has: "Sau đợt tuyệt chủng hàng loạt vào cuối kỉ", right: (q) => {
    coX(q, "Thú đã xuất hiện từ kỉ " + tenKi(SU_KIEN["khủng long, thú xuất hiện"]));
    assert.ok(q.q.includes("cuối kỉ " + tenKi(SU_KIEN["khủng long tuyệt diệt"])) && kiCua(SU_KIEN["khủng long tuyệt diệt"])[3] === kiCua("Tertiary")[2], "đợt tuyệt chủng cuối kỉ, ngay trước đại Cenozoic");
    return q.o[0]; } },
  { id: "sh2", has: "Loài cá M sống được", essay: (q) => {
    const [m1, m2, m3, m4] = so(q.q, "Loài cá M sống được trong khoảng nhiệt độ nước từ # °C đến # °C, khoảng thuận lợi từ # °C đến # °C");
    const [n1, n2, n3, n4] = so(q.q, "Loài cá N sống được từ # °C đến # °C, khoảng thuận lợi từ # °C đến # °C"), [a1, a2] = so(q.q, "dao động từ # °C đến # °C");
    assert.ok(m1 < m3 && m3 < m4 && m4 < m2 && n1 < n3 && n3 < n4 && n4 < n2, "khoảng thuận lợi nằm trong giới hạn sinh thái");
    const chung = [Math.max(m1, n1), Math.min(m2, n2)], tl = [Math.max(m3, n3), Math.min(m4, n4)];
    const nuoi = [["M", m1, m2], ["N", n1, n2]].filter(([, lo, hi]) => lo <= a1 && a2 <= hi).map(([t]) => t); assert.deepEqual(nuoi, ["M"], "chỉ loài M sống được ở mọi nhiệt độ của ao");
    coThang(q, "từ " + chung[0] + " °C đến " + chung[1] + " °C", "từ " + tl[0] + " °C đến " + tl[1] + " °C", "Chọn nuôi loài " + nuoi[0]);
    coX(q, "từ " + chung[0] + " °C đến " + chung[1] + " °C", "từ " + tl[0] + " °C đến " + tl[1] + " °C", "Nên nuôi loài " + nuoi[0]);
    assert.equal(dapSo(q), "a) " + chung[0] + " – " + chung[1] + " °C; " + tl[0] + " – " + tl[1] + " °C; b) nuôi loài " + nuoi[0]); } },
  { id: "sh2", has: "tháp tuổi của ba quần thể A, B, C", right: (q) => {
    const t = docThapTuoi(q.svg, "tháp tuổi");
    assert.deepEqual(Object.keys(t).sort(), ["A", "B", "C"]); assert.ok(Object.values(t).every((v) => v.dang !== "?"), "mỗi tháp rõ một dạng");
    const [a, b, c, d] = q.o;
    assert.ok(/^Quần thể A có xu hướng tăng số lượng cá thể trong thời gian tới\.$/.test(a) && /^Ở quần thể B, nhóm tuổi trước sinh sản và nhóm tuổi sinh sản có tỉ lệ xấp xỉ nhau\.$/.test(b)
      && /^Ở quần thể C, nhóm tuổi trước sinh sản chiếm tỉ lệ lớn nhất trong ba nhóm tuổi\.$/.test(c) && /^Trong ba quần thể, quần thể C có nguy cơ suy giảm số lượng cá thể nhiều nhất\.$/.test(d), "các ý");
    assert.equal(t.C.w[0], Math.min(...t.C.w), "lời giải: ở C thanh dưới cùng ngắn nhất"); coX(q, "thanh dưới cùng ngắn nhất");
    const it = Object.entries(t).sort((u, v) => u[1].tiLe - v[1].tiLe)[0][0];
    return [t.A.dang === "phát triển", t.B.dang === "ổn định", t.C.w[0] === Math.max(...t.C.w), it === "C" && t.C.dang === "suy thoái"]; } },
  { id: "sh2", has: "Một đàn hươu sao", right: (q) => {
    const [n] = so(q.q, "có # con trưởng thành"), [d, c] = so(q.q, "tỉ lệ đực : cái là # : #"), cai = (n * c) / (d + c);
    assert.ok(Number.isInteger(cai)); coX(q, d + " + " + c + " = " + (d + c), "= " + vn(cai) + " con", vn(n) + " − " + vn(cai) + " = " + vn(n - cai) + " con"); return cai; } },
  { id: "sh2", has: "Đầu năm, một quần thể sóc", right: (q) => {
    const [N] = so(q.q, "quần thể sóc có # con"), [b, d] = so(q.q, "số con sinh ra bằng #% và số con chết bằng #%"), [i] = so(q.q, "có # con từ nơi khác nhập cư"), [e] = so(q.q, "và # con xuất cư");
    const B = (N * b) / 100, D = (N * d) / 100, kq = N + B - D + i - e;
    coX(q, "= " + vn(B), "= " + vn(D), vn(N) + " + " + vn(B) + " − " + vn(D) + " + " + i + " − " + e + " = " + vn(kq)); return kq; } },
  // ---- GDKT&PL ----
  { id: "kt1", has: "anh Kiên (26 tuổi", right: (q) => {
    const [anh, em] = so(q.q, "anh Kiên (# tuổi, đã đi làm) để em trai # tuổi");
    assert.ok(anh >= LUAT.thanhNien && em < LUAT.thanhNien, "anh đã thành niên, em chưa thành niên"); coX(q, "anh chị đã thành niên", "em chưa thành niên", "Em trai mới " + em + " tuổi");
    return "Anh Kiên vi phạm nghĩa vụ nuôi dưỡng, chăm sóc em khi cha mẹ mất"; } },
  { id: "kt1", has: "Anh Đạt thuê hai học sinh 14 tuổi", right: (q) => {
    const [tuoi, gio] = so(q.q, "hai học sinh # tuổi làm việc ở khâu phun keo độc hại, mỗi ngày # tiếng");
    assert.ok(tuoi < LUAT.thanhNien && gio > LUAT.gioLam, "người lao động chưa thành niên, làm quá thời giờ làm việc bình thường"); coX(q, "lao động chưa thành niên", "quá thời giờ");
    return "Anh Đạt vi phạm nghĩa vụ bảo đảm quyền, lợi ích hợp pháp của người lao động"; } },
  { id: "kt1", has: "Bạn K mới chuyển đến lớp 12A", essay: (q) => {
    assert.ok(/^Em hãy đọc tình huống và trả lời câu hỏi\./.test(q.q) && /^Bài gợi ý: a\) .+ b\) .+$/s.test(q.x), "lời dặn, bài gợi ý có hai ý a), b)");
    coThang(q, "danh dự, nhân phẩm", "cản trở K thực hiện quyền học tập", "gỡ video, xin lỗi K", "báo với giáo viên chủ nhiệm");
    coX(q, "danh dự, nhân phẩm", "cản trở K thực hiện quyền học tập", "gỡ video và xin lỗi K", "báo với giáo viên chủ nhiệm"); } },
  { id: "kt2", has: "Trường hợp nào sau đây là tảo hôn?", right: (q) => {
    const chua = q.o.filter((o) => { const m = y(o, /^Tổ chức cưới cho con (trai|gái) (\d+) tuổi$/); return +m[2] < LUAT.tuoiKetHon[m[1]]; });
    assert.equal(chua.length, 1, "đúng một trường hợp chưa đủ tuổi kết hôn"); coX(q, "Nam phải từ đủ " + LUAT.tuoiKetHon.trai + " tuổi, nữ từ đủ " + LUAT.tuoiKetHon.gái + " tuổi"); return chua[0]; } },
  { id: "kt2", has: "người chồng không được đơn phương yêu cầu", right: (q) => {
    // tuổi của con chung ghi bằng tháng hay năm; chỉ con dưới 12 tháng tuổi làm người chồng không được đơn phương yêu cầu li hôn
    const thang_ = (o) => { const m = /con chung (\d+) (tháng )?tuổi/.exec(o); return m ? (m[2] ? +m[1] : 12 * +m[1]) : null; };
    assert.ok(q.o.filter((o) => thang_(o) !== null).length >= 2, "có cả con dưới và trên 12 tháng tuổi");
    const nho = q.o.filter((o) => thang_(o) !== null && thang_(o) < LUAT.conNho); assert.equal(nho.length, 1);
    coX(q, "chưa đủ " + LUAT.conNho + " tháng tuổi"); return nho[0]; } },
  { id: "kt2", has: "Bạn Lục 13 tuổi, đang học lớp 7", right: (q) => {
    const [tuoi, lop] = so(q.q, "Bạn Lục # tuổi, đang học lớp #"); assert.ok(tuoi - lop === LUAT.vaoLop1 && lop <= LUAT.lopCuoiTHCS, "đúng tuổi của lớp, còn ở cấp trung học cơ sở");
    coX(q, "Bắt Lục " + tuoi + " tuổi nghỉ học"); return "Bố mẹ Lục vi phạm vì không để con trong độ tuổi quy định được đi học"; } }
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
        if (typeof q.ans === "string") { assert.equal(fChu(docPS(q.ans)), q.ans, "phân số tối giản"); assert.equal(q.ans, want, "đáp án " + q.ans + ", tính được " + want); }
        else { assert.ok(gan(q.ans, want), "đáp án " + q.ans + ", tính được " + want); assert.ok(Math.abs(q.ans * 100 - Math.round(q.ans * 100)) < 1e-9, "đáp án quá hai chữ số thập phân"); }
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
  const gh = hinh("mức sinh trưởng của loài cá X theo nhiệt độ nước"), tt = hinh("hai đường cong tăng trưởng (1) và (2)"), tp = hinh("tháp tuổi của ba quần thể A, B, C");
  assert.throws(() => docGioiHan(gh.replace(">32</text>", ">30</text>"), "thử"), /tỉ lệ/);
  assert.throws(() => docGioiHan(gh.replace(/(<line x1="150" y1="58" x2=")222(")/, "$1234$2"), "thử"), /vạch ngoặc/);
  assert.throws(() => docGioiHan(gh.replace(/<polygon points="([^"]*)" fill="ok-soft"/, (s, p) => s.replace(p, p.replace(/,170$/, ",160"))), "thử"), /phần tô màu/);
  assert.throws(() => docTangTruong(tt.replace(/<text x="118" y="44" text-anchor="end">\(1\)<\/text>/, '<text x="230" y="84">(1)</text>'), "thử"), /nhãn|mỗi đường/);
  assert.equal(docTangTruong(tt.replace(/(<line x1="50" y1=")55(" x2="300" y2=")55(")/, "$180$280$3"), "thử").S2, false); // sức chứa vẽ thấp: đường (2) vượt
  assert.throws(() => docThapTuoi(tp.replace('<rect x="32" y="90"', '<rect x="32" y="88"'), "thử"), /chồng khít/);
  assert.equal(docThapTuoi(tp.replace('<rect x="128" y="120" width="64"', '<rect x="140" y="120" width="40"'), "thử").B.dang, "suy thoái");
  assert.deepEqual(thuTu("Kiểm chứng bằng thực nghiệm → quan sát, thu thập dữ liệu → đề xuất giả thuyết", BUOC_DARWIN), [2, 0, 1]);
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
// Sinh học: thuật ngữ như sách in năm 2026; tên siêu đại, đại, kỉ như Bảng 22.1; địa danh của Bài 24 như sách in năm 2026
{
  const toan = SH.kho.flatMap(chu).join(" | "), dem = (s) => toan.split(s).length - 1;
  SH.kho.forEach((q) => chu(q).forEach((s) => {
    assert.ok(!/(?<![\p{L}])(?:gen|alen|ADN|ARN|axit amin|prôtêin|nuclêôtit|Menđen|Hacđi|Vanbec|Đacuyn|Đác-uyn|Lamac|Lamác|quần xã sinh vật học|hóa thạch)(?![\p{L}])/iu.test(s), ten.get(q) + ": thuật ngữ khác sách: " + s);
    assert.ok(!/Hardy\s*[-—]\s*Weinberg|Hardy-Weinberg/.test(s), ten.get(q) + ": viết “Hardy – Weinberg”: " + s);
    assert.ok(!/Tương Dương|Kiên Giang(?! \(nay là An Giang\))/.test(s), ten.get(q) + ": địa danh cũ của Bài 24: " + s);
  }));
  [...SIEU_DAI, ...DAI, ...KI.filter((k) => k[1]).map((k) => [k[0], k[1]])].forEach(([e, v]) => {
    assert.equal(dem(e), dem(e + " (" + v + ")"), "tên “" + e + "” phải kèm “(" + v + ")” như Bảng 22.1");
    assert.equal(dem(v), dem(e + " (" + v + ")"), "tên “" + v + "” chỉ ghi trong ngoặc sau “" + e + "” như Bảng 22.1");
  });
  const ki_ = [...toan.matchAll(/[Kk]ỉ (\p{Lu}\w+)/gu)].map((m) => m[1]); assert.ok(ki_.length > 0 && ki_.every((k) => KI.some((x) => x[0] === k)), "tên kỉ theo Bảng 22.1: " + ki_);
}
// GDKT&PL: tên luật như sách in năm 2026; không số điều, mức phạt; không tên cơ quan, đơn vị hành chính cũ
KT.kho.forEach((q) => chu(q).forEach((s) => {
  const at = ten.get(q) + ": ";
  assert.ok(!/Hiến pháp năm/.test(s) || /Hiến pháp năm 2013 \(sửa đổi, bổ sung năm 2025\)/.test(s), at + "Hiến pháp năm 2013 (sửa đổi, bổ sung năm 2025): " + s);
  assert.ok(!/Luật Quản lí thuế(?! năm 2025)/.test(s) && !/Luật Doanh nghiệp(?! năm 2020 \(sửa đổi, bổ sung năm 2025\))/.test(s), at + "tên luật như sách in năm 2026: " + s);
  assert.ok(!/Luật Hôn nhân và Gia đình(?! năm 2014)|Luật Giáo dục(?! năm 2019)|Bộ luật Dân sự(?! năm 2015)/.test(s), at + "tên luật như sách: " + s);
  assert.ok(!/\b(?:Điều|khoản) \d|phạt (?:tiền )?(?:từ )?\d/.test(s), at + "không ghi số điều luật, mức phạt: " + s);
  assert.ok(!/Lao động – Thương binh|Phòng Đăng kí kinh doanh|cấp huyện|\bhuyện\b|Tổng cục Thuế|Chi cục Thuế/.test(s), at + "tên cơ quan, đơn vị hành chính cũ: " + s);
}));
// GDKT&PL: câu tình huống là chính: đề bài kể việc của một người (anh K, chị Lan, bạn Tú…), một doanh nghiệp, gia đình có tên
const TINH_HUONG = [/(?:^|[\s(])(?:[Aa]nh|[Cc]hị|[Ôô]ng|[Bb]à|[Bb]ạn|[Cc]ụ) \p{Lu}/u, /(?:[Cc]ông ty|[Dd]oanh nghiệp|[Qq]uốc gia|[Tt]ỉnh|[Xx]ã|[Nn]ước)(?: \p{Ll}+)* [A-Z](?![\p{L}])/u,
  /(?:của|Nhóm) \p{Lu}\p{Ll}+/u, /^Gia đình (?:anh|chị|ông|bà) \p{Lu}/u, /^Vợ chồng (?:anh|chị|ông|bà) \p{Lu}/u];
const soTH = KT.kho.filter((q) => TINH_HUONG.some((r) => r.test(q.q))).length;
assert.ok(soTH * 3 >= KT.kho.length * 2, "GDKT&PL: câu tình huống là chính (" + soTH + "/" + KT.kho.length + ")");

/* ---------- lời dặn, mức độ, ma trận ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
MON.forEach((m) => {
  const M = m.M, cells = Object.values(M), CHU_DE = m.BAI.map((b) => b[0]), soBai = Object.fromEntries(m.BAI);
  assert.ok(m.kho.every((q) => [1, 2, 3].includes(q.lv)), m.ma + ": câu nào cũng cần lv");
  assert.ok(cells.every(Array.isArray), m.ma + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], m.ma + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.equal(sum(cells.map(sum)), m.pool.n, m.ma + ": tổng ma trận bằng n");
  assert.ok(cells.every((v) => sum(v) >= 1), m.ma + ": chủ đề nào cũng có câu");
  assert.deepEqual(Object.keys(M), CHU_DE, m.ma + ": chủ đề theo tên bài, thứ tự bài của sách");
  CHU_DE.forEach((t) => assert.ok(("chu-de:12:" + m.ma + ":" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
  // không chủ đề nào trùng kho cuối kì I: kho này không có câu ôn
  const cu = new Set(m.ck1.map((q) => q.topic)); CHU_DE.forEach((t) => assert.ok(!cu.has(t), m.ma + ": chủ đề trùng kho cuối kì I: " + t));
  m.DE.forEach((id) => {
    const qs = m.kho.filter((q) => q.src === id);
    assert.deepEqual([...new Set(qs.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, đúng thứ tự");
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t));
    // lời dặn: sách, phạm vi, số câu mỗi phần (tính từ ma trận), trường học khác phạm vi; không có câu về đề chung của Sở (chỉ cuối kì)
    const note = bank(id).note;
    assert.ok(note.startsWith(m.DAU + m.PHAN[0][0]), id + ": lời dặn mở đầu bằng sách, phạm vi");
    m.PHAN.forEach(([p, tu, den]) => { const k = sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))); assert.ok(note.includes(p + " " + k + " câu"), id + ": lời dặn ghi “" + p + " " + k + " câu”"); });
    assert.equal(sum(m.PHAN.map(([, tu, den]) => sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))))), m.pool.n, m.ma + ": các phần của lời dặn phủ hết ma trận");
    m.SAU.forEach((s) => assert.ok(note.includes(s), id + ": lời dặn có “" + s + "”"));
    assert.ok(!/Sở GD&ĐT|đề chung/.test(note), id + ": đề giữa kì không có câu về đề chung của Sở");
    assert.ok(note.endsWith(m.CUOI), id + ": lời dặn kết thúc bằng “" + m.CUOI + "”");
  });
  // chủ đề đúng tên bài trong mục lục (README của cuốn ở OnUp-Book); tên chương, phần của lời dặn đúng mục lục
  const readme = path.join(BOOK, "lop-12", m.sach, "README.md");
  if (fs.existsSync(readme)) {
    const md = fs.readFileSync(readme, "utf8"), ml = Object.fromEntries([...md.matchAll(/Bài (\d+)[.:] ([^|*·]+?) \|/g)].map((x) => [+x[1], x[2].trim()]));
    m.BAI.forEach(([t, b]) => assert.equal(m.RUT_GON[t] || t, ml[b], m.ma + ": tên Bài " + b + " theo mục lục"));
    m.PHAN.forEach(([p]) => { const c = /^Chương (\d+) (.+) \(Bài/.exec(p); if (c) assert.ok(md.includes("Chương " + c[1] + ". " + c[2].toUpperCase()), m.ma + ": tên chương " + c[1] + " theo mục lục"); });
    const ph = /Phần (hai|năm|sáu) ([^.]+)\. Phạm vi/.exec(m.DAU); if (ph) assert.ok(md.includes("Phần " + ph[1] + ": " + ph[2]), m.ma + ": tên phần theo mục lục");
    // bài thực hành (Bài 25 Sinh học) không ra chủ đề riêng
    Object.entries(ml).filter(([b, t]) => /^Thực hành/.test(t) && +b >= Math.min(...m.BAI.map((x) => x[1])) && +b <= Math.max(...m.PHAN.map((x) => x[2]))).forEach(([b]) => assert.ok(!m.BAI.some((x) => x[1] === +b), m.ma + ": bài thực hành " + b + " không ra chủ đề riêng"));
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
    const c = chuThuong(q.topic), tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề: ${q.q.slice(0, 60)}`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    assert.ok(!(dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”: " + q.q.slice(0, 50));
  });
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn
  const le = mc.filter((q) => { const L = q.o.map((o) => o.length); return L[0] > Math.max(...L.slice(1)) || L[0] < Math.min(...L.slice(1)); });
  assert.ok(le.length * 3 <= mc.length, `${m.ma}: đáp án đúng dài nhất hoặc ngắn nhất ở ${le.length}/${mc.length} câu: ` + le.map((q) => ten.get(q)).join(", "));
  m.le = le.length + "/" + mc.length;
  // đáp án đúng của câu nhiều lựa chọn không trùng đáp án đúng của câu nào ở kho cuối kì I
  const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
  const daCu = new Set(m.ck1.filter((q) => q.type === "mc").map((q) => goc(q.o[0])));
  mc.forEach((q) => assert.ok(!daCu.has(goc(q.o[0])), m.ma + ": đáp án trùng một câu của kho cuối kì I: " + ten.get(q)));

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
  // đề bài không trùng câu nào khác trong file, cả kho cuối kì I (so sau khi bỏ dấu câu, khoảng trắng)
  const caFile = BANKS.filter((b) => b.file === m.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)).map((q) => goc(q.q));
  m.kho.forEach((q) => assert.equal(caFile.filter((k) => k === goc(q.q)).length, 1, "đề bài trùng câu khác trong " + m.file + ": " + ten.get(q)));
});

/* ---------- so với kho cuối kì I cùng môn: đề bài không gần trùng ----------
   Cặp hai âm tiết liền nhau (Rút ra N25; như tests/vatli-hoahoc12-gk2.js): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của kho
   cuối kì I và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung
   của đề (CUM) và cặp có ở từ 3% số câu của file. */
{
  const CUM = ["mỗi ý sau đúng hay sai", "nhận xét nào sau đây đúng", "theo quy định của pháp luật", "trình bày lời giải", "em hãy đọc tình huống và trả lời câu hỏi", "theo lí thuyết"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const gan_ = [];
  MON.forEach((m) => {
    const ca = BANKS.filter((b) => b.file === m.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), df = {};
    ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
    const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * ca.length)); };
    m.kho.forEach((q) => { const c = capAm(q); m.ck1.forEach((p) => { const d = capAm(p), chung = [...c].filter((x) => d.has(x)); if (chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`); }); });
  });
  assert.deepEqual(gan_, [], "đề bài gần trùng câu của kho cuối kì I");
}

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Đề ngẫu nhiên rút câu ở mọi ô, đề “Ôn chủ đề” rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi cặp câu cùng môn, trừ cặp có
   câu tự luận nằm cùng một ô rút 1 câu. Đáp án là số (trả lời ngắn, phân số; từ hai chữ số, hoặc số thập phân, hoặc phân số) tìm ở vị trí
   kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”; không tính số đứng trước một phép tính) cùng đơn vị: không được có. Đáp án
   bằng chữ tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có trong đề bài, lựa chọn, lời giải của
   câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. */
const DON_VI = "(?:cây\\/m²|triệu đồng|cá thể|con|tháng|cây|NST|tuổi|°C|%)";
const SO_DA = "(?:\\d+\\/\\d+|" + NUM + ")";
const soDV = new RegExp("^(" + SO_DA + ")(?: ?(" + DON_VI + "))?$", "u");
const giaTri = (s) => (/\//.test(s) ? fSo(docPS(s)) : val(s));
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+(" + SO_DA + ")(?![\\d,/])(?!\\s*[·+−:×](?:\\s|\\d|\\())(?: ?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => ({ v: giaTri(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["theo quy định", "quy định của", "vi phạm nghĩa", "phạm nghĩa vụ", "định của pháp", "của pháp luật", "của người khác",
  "hợp pháp của", "trái pháp luật", "của môi trường", "cho người khác", "ích hợp pháp", "vi phạm vì", "tôn trọng quyền",
  "quyền tự do", "quyền lợi ích", "pháp của người", "lợi ích hợp", "các cá thể", "sống của môi", "phối với nhau",
  "phù hợp với", "nguồn sống của", "nghĩa vụ của", "là tài sản", "không phân biệt", "giao phối với", "của người học",
  "đủ điều kiện", "đảm quyền lợi", "được kinh doanh", "điều kiện sống", "vụ của người", "tạo điều kiện", "trong quần thể",
  "thích nghi với", "kinh doanh của", "hành vi bị", "của sinh vật", "của nhân tố", "các quần thể", "bị pháp luật",
  "bảo đảm quyền", "tự do kinh", "do kinh doanh", "tài sản chung", "phải bồi thường", "chọn lọc tự", "lọc tự nhiên",
  "nhân tố sinh", "tố sinh thái", "các biến dị"]);
const doLo = (qs, M, tenCau) => {
  const lo = [], chuLo = [], cungLuc = (p, q) => p !== q && (p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2);
  qs.forEach((q) => {
    let soDa = [], C = [];
    if (q.type === "num") soDa = [{ v: typeof q.ans === "string" ? giaTri(q.ans) : q.ans, u: q.unit || "" }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: giaTri(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]); C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)]; } }
    soDa = soDa.filter((d) => Math.abs(d.v) >= 10 || !Number.isInteger(d.v));
    qs.forEach((p) => {
      if (!cungLuc(p, q)) return;
      const at = `${tenCau(p)} → ${tenCau(q)}: `, T = " " + chu(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chu(p).flatMap(kqSo).some((yy) => gan(yy.v, d.v) && (!yy.u || !d.u || yy.u === d.u))).forEach((d) => lo.push(at + vn(d.v) + " " + d.u));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
const lo = [], chuLo = [];
MON.forEach((m) => { const r = doLo(m.kho, m.M, (q) => ten.get(q)); lo.push(...r.lo); chuLo.push(...r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
// đã xem (Phiên N12-gk2-sinhhoc-ktpl): chữ chung, câu kia không nói tới điều câu này hỏi. Sinh học: “các lớp đá” (câu kỉ Devonian kể hoá
// thạch trong lớp đá, không nói đó là bằng chứng trực tiếp); ba bước nghiên cứu của Darwin (câu thỏ trắng chỉ hỏi cách kiểm chứng một giả
// thuyết; mọi lựa chọn của câu kia đều có đủ ba bước); “biến dị cá thể … có sẵn trong quần thể”, “được giữ lại” (câu châu chấu nói về chọn
// lọc tự nhiên ở một quần thể, không so hai kiểu chọn lọc, không nói về hình thành loài); “mà nguồn sống” (câu mật độ hỏi điều xảy ra khi
// quần thể quá đông, không nói Darwin giải thích vì sao ít con sống sót); tên ba giai đoạn phát sinh sự sống (mọi lựa chọn
// của câu thứ tự đều có đủ ba tên); “giao phối cận huyết” (lựa chọn sai, câu cá cảnh nói tác động lên kiểu gene, không nói về quần thể quá
// nhỏ); các cụm còn lại trùng chữ ngẫu nhiên. GDKT&PL: “nghĩa vụ bảo đảm quyền, lợi ích hợp pháp” (câu ông Lực nói về người tiêu dùng, câu
// kia hỏi ai vi phạm); “bồi thường cho anh” (câu thuê ô tô, câu kia là mượn máy tính); “đăng kí kết hôn”, “yêu cầu Toà án” (câu ông Định, câu
// li hôn kể việc, không nói điều kiện của việc kết hôn, cách xử lí kết hôn trái pháp luật); “nghĩa vụ nuôi dưỡng” (cha mẹ với con, lựa chọn
// sai của câu anh Hiển); “quyền định đoạt” (lựa chọn sai của câu mượn máy tính, không nói lập di chúc là định đoạt); “góp ý để nhóm” (thang
// chấm của câu tự luận chỉ hiện sau khi làm, nói về chế giễu bạn); các cụm còn lại trùng chữ ngẫu nhiên.
const DA_XEM = [
  "sh1#16 → sh1#1: các lớp đá", "sh2#6 → sh1#4: kiểm chứng giả", "sh2#6 → sh1#4: chứng giả thuyết",
  "sh2#6 → sh1#4: bằng thực nghiệm", "sh1#6 → sh1#5: biến dị cá", "sh1#6 → sh1#5: dị cá thể", "sh1#6 → sh1#5: có sẵn trong",
  "sh1#6 → sh1#5: sẵn trong quần", "sh1#4 → sh1#7: thuyết chọn lọc", "sh1#7 → sh1#13: hoá sinh học",
  "sh2#13 → sh1#13: tiến hoá tiền", "sh2#13 → sh1#13: hoá tiền sinh", "sh2#13 → sh1#13: tiền sinh học",
  "sh2#25 → sh1#24: mức tử vong", "sh2#25 → sh1#24: tử vong và", "sh1#24 → sh2#4: mà nguồn sống", "sh2#6 → sh2#4: con sinh ra",
  "sh2#25 → sh2#4: số con sinh", "sh2#25 → sh2#4: con sinh ra", "sh1#3 → sh2#5: tích luỹ dần", "sh1#6 → sh2#5: được giữ lại",
  "sh2#4 → sh2#5: biến dị có", "sh2#7 → sh2#12: khu vực địa", "sh2#7 → sh2#12: vực địa lí", "sh2#8 → sh2#12: giữa các quần",
  "sh2#16 → sh2#18: có điều kiện", "sh1#8 → sh2#21: giao phối cận", "sh1#8 → sh2#21: phối cận huyết",
  "sh1#10 → sh2#21: giao phối cận", "sh1#10 → sh2#21: phối cận huyết", "sh1#24 → sh2#21: hỗ trợ nhau",
  "sh2#8 → sh2#21: giao phối cận", "sh2#8 → sh2#21: phối cận huyết", "sh2#12 → sh2#21: giao phối cận",
  "sh2#12 → sh2#21: phối cận huyết", "kt1#4 → kt1#6: nghĩa vụ bảo", "kt1#4 → kt1#6: vụ bảo đảm", "kt2#11 → kt1#10: bồi thường cho",
  "kt2#11 → kt1#10: thường cho anh", "kt1#16 → kt1#14: đăng kí kết", "kt1#16 → kt1#14: kí kết hôn", "kt2#17 → kt1#15: hai anh em",
  "kt1#14 → kt1#16: việc kết hôn", "kt2#14 → kt1#16: yêu cầu toà", "kt2#14 → kt1#16: cầu toà án", "kt1#20 → kt1#17: nghĩa vụ nuôi",
  "kt2#17 → kt1#17: nghĩa vụ nuôi", "kt2#17 → kt1#17: vụ nuôi dưỡng", "kt2#18 → kt1#17: khi cha mẹ",
  "kt2#24 → kt1#19: quyền quyết định", "kt2#23 → kt1#21: học ở mọi", "kt2#7 → kt1#24: thông tin về", "kt2#8 → kt2#3: của mình để",
  "kt2#17 → kt2#3: của mình để", "kt2#24 → kt2#3: làm việc trái", "kt1#22 → kt2#6: điều kiện kinh",
  "kt1#10 → kt2#8: quyền định đoạt", "kt1#25 → kt2#12: góp ý để", "kt1#25 → kt2#12: ý để nhóm", "kt1#19 → kt2#22: sản chung của",
  "kt1#23 → kt2#22: của nhà trường", "kt1#18 → kt2#24: được đi học", "kt1#21 → kt2#24: trong độ tuổi",
  "kt2#16 → kt2#24: không để con"
];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 2/7”, “là 320 con”, cụm của đáp án bằng chữ
{
  const tim = (has) => MON.flatMap((m) => m.kho).find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const r = doLo(qs, Object.assign({}, SH.M, KT.M), (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const khac = tim("Tập hợp sinh vật nào sau đây là một quần thể?"), khacK = tim("Quyền học thường xuyên, học suốt đời");
  assert.deepEqual(thuLo([tim("cây có kiểu gene aa chết khi còn non"), gia(khac, "Tần số = 2/7.")]), [vn(2 / 7) + " "]);
  assert.deepEqual(thuLo([tim("Một đàn hươu sao"), gia(khac, "Số con cái là 320 con.")]), ["320 con"]);
  assert.deepEqual(thuLo([tim("Một đàn hươu sao"), gia(khac, "Có 320 con trong đàn.")]), []);
  assert.deepEqual(thuLo([tim("Một trận lũ lớn tràn qua bãi bồi"), gia(khac, "Đây là phiêu bạt di truyền.")]), ["phiêu bạt di", "bạt di truyền"]);
  assert.deepEqual(thuLo([tim("Bà Thoa có một ki-ốt"), gia(khacK, "Đó là quyền sử dụng.")]), ["quyền sử dụng"]);
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ----------
   Cụm từ chung của môn (tên bài, cách nói chuẩn của đề) thay bằng dấu ngăn trước khi so; chuỗi so phải có ít nhất 5 từ có chữ. */
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
const TU_CHUNG = [...SH.BAI, ...KT.BAI].map((b) => b[0]).concat(Object.values(SH.RUT_GON), Object.values(KT.RUT_GON), ["mỗi ý sau đúng hay sai", "theo lí thuyết",
  "theo quy định của pháp luật", "nhận xét nào sau đây đúng", "em hãy đọc tình huống và trả lời câu hỏi",
  "viết kết quả dưới dạng phân số", "việc làm nào sau đây", "cách làm nào sau đây phù hợp nhất",
  // Sinh học: tên ba giai đoạn phát sinh sự sống, các bước nghiên cứu của Darwin, hai con đường hình thành loài, ba nhóm tuổi như sách
  "tiến hoá hoá học", "tiến hoá tiền sinh học", "tiến hoá sinh học", "quan sát, thu thập dữ liệu", "đề xuất giả thuyết", "kiểm chứng giả thuyết bằng thực nghiệm",
  "hình thành loài khác khu vực địa lí", "hình thành loài cùng khu vực địa lí", "nhóm tuổi trước sinh sản", "nhóm tuổi sinh sản", "nhóm tuổi sau sinh sản",
  // GDKT&PL: tên văn bản luật, tên quyền, nghĩa vụ, chế độ, cơ quan, giấy tờ như sách
  "Hiến pháp năm 2013 (sửa đổi, bổ sung năm 2025)", "quyền, lợi ích hợp pháp", "cơ quan nhà nước có thẩm quyền", "bị xử phạt hành chính hoặc bị truy cứu trách nhiệm hình sự",
  "nghĩa vụ tôn trọng tài sản của người khác", "tôn trọng quyền tự do kinh doanh của người khác", "tôn trọng quyền học tập của người khác", "chế độ hôn nhân một vợ một chồng",
  "huỷ việc kết hôn trái pháp luật", "vùng có điều kiện kinh tế – xã hội đặc biệt khó khăn", "giấy chứng nhận đăng kí hộ kinh doanh"])
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const tatCa = MON.flatMap((m) => m.kho);
if (SACH.length) {
  MON.forEach((m) => assert.ok(SACH.some((f) => f.includes(m.sach)), "OnUp-Book có " + m.sach));
  const sach = new Set(), them = (t, k) => { const w = t.split(" ").filter(Boolean); for (let i = 0; i + k <= w.length; i++) sach.add(k + ":" + w.slice(i, i + k).join(" ")); };
  SACH.forEach((f) => { const t = khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")); them(t, 8); if (process.env.DO_SACH) them(t, 6); });
  const bao = (k) => tatCa.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.has(k + ":" + c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả kho cuối kì I cùng file và câu riêng của
   các đề ngẫu nhiên; với kho cuối kì I cùng môn: đề bài không có chuỗi 6 từ nào trùng (Rút ra N9-gk1-toan) ---------- */
{
  const cua = (b, q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const ngoai = (b) => !MON.some((m) => m.DE.includes(b.id) || m.pool === b);
  const khac = BANKS.filter((b) => !b.pool && ngoai(b)).flatMap((b) => b.questions.map((q) => cua(b, q)))
    .concat(BANKS.filter((b) => b.pool && ngoai(b)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => tatCa.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
  const gan6 = MON.flatMap((m) => { const ck1 = m.ck1.map((q) => " " + khongDau(q.q) + " "); return m.kho.flatMap((q) => chuoi(q.q, 6).filter((c) => ck1.some((s) => s.includes(" " + c + " "))).map((c) => ten.get(q) + ": " + c)); });
  assert.deepEqual([...new Set(gan6)], [], "đề bài có chuỗi 6 từ trùng câu của kho cuối kì I");
}
MON.forEach((m) => console.log(`${m.ten} 12 giữa kì II: kho ${m.kho.length} câu (${m.DE.length} đề cố định, ${m.pool.n} câu mỗi đề), ma trận 10 – 8 – 7 trên ${Object.keys(m.M).length} chủ đề; ` +
  `${m.kho.filter((q) => q.type === "tf4").length} câu đúng/sai 4 ý, ${m.kho.filter((q) => q.type === "num").length} câu trả lời ngắn, ${m.kho.filter((q) => q.type === "essay").length} câu tự luận, ${m.kho.filter((q) => q.svg).length} hình; đáp án đúng dài nhất hoặc ngắn nhất ở ${m.le} câu nhiều lựa chọn.`));
console.log("GDKT&PL 12: " + soTH + "/" + KT.kho.length + " câu tình huống.");
console.log(n + " câu đã tính lại hoặc đọc lại hình.");
console.log("MATH OK");
