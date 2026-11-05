// Kiểm tra ngân hàng Tin học 12 và Công nghệ 12 cuối năm của Phiên N12-ck2-tin-congnghe (data/banks/12-tin.js, data/banks/12-congnghe.js:
// mỗi môn hai đề cố định và đề ngẫu nhiên lấy câu của hai đề đó, không có câu riêng), theo mẫu tests/tin-congnghe12-gk2.js (bộ đọc HTML,
// CSS, khung mã, bộ áp mẫu định dạng) và tests/vatli-hoahoc12-ck2.js (câu ôn, so với kho giữa kì II, cuối kì I cùng môn). Số đề, số câu lấy
// từ danh mục. Câu có phép tính, có hình, có đoạn mã, câu sắp xếp, câu tự luận nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong
// kho, đúng đề ghi ở id); đáp án tính bằng code (so với ans, o[0], thứ tự của câu sắp xếp, hoặc các ý tính được của câu đúng/sai 4 ý; câu
// tự luận so với thang chấm và bài gợi ý).
// Tin học (phần chung Bài 13–20, trọng tâm Bài 17, 19–20; chữ chủ đề như kho giữa kì II): mọi đoạn mã HTML, CSS trong câu đọc bằng bộ đọc
// của tests/tin-congnghe12-gk2.js (thêm thẻ nav của Bài 18, cỡ chữ theo pt: 1 pt = 1/72 inch, 1 px = 1/96 inch như Bài 14); kết quả hiển
// thị tính bằng bộ áp mẫu định dạng (trọng số Bảng 17.4, thứ tự ưu tiên Bảng 17.3, kế thừa, CSS ngoài qua thẻ link theo thứ tự trong
// trang) với lớp giả :hover, :visited theo trạng thái của từng phần tử (di chuột lên một phần tử thì nó và mọi phần tử cha cùng ở trạng
// thái :hover, nên bộ chọn “.the:hover h3” khớp được); mọi hình “khung mã” đọc lại (chữ cỡ 14, lùi đầu dòng theo số thẻ, ngoặc nhọn đang
// mở, dòng vừa khung).
// Công nghệ (Chương V–IX: ôn Bài 13–16, 18–19 với chữ chủ đề như kho giữa kì II, trọng tâm Bài 21–22, 24–25): mã ba chữ số của tụ điện (pF),
// vạch màu của điện trở theo bảng Hình 15.3 (cả hệ số nhân màu bạc), hệ số khuếch đại A = U_ra : U_vào, β = I_C : I_B, dòng điện collector
// định mức, mạch khuếch đại đảo, không đảo, khoảng bit T_b = 1 : R, Flip-Flop D, bộ đếm nhị phân đếm tiến (FF0 đổi trạng thái mỗi xung,
// FF sau đổi khi Q của FF trước từ 1 về 0), số lần chạy, thời gian chạy theo tần số xung nhịp của CPU, số địa chỉ của bus địa chỉ (mỗi dây
// 1 bit) tính lại bằng code; bốn hình cổng logic đọc lại bằng code theo kí hiệu của sách (cổng AND: cạnh sau thẳng, phía trước nửa hình
// tròn; cổng OR: cạnh sau cong lõm, phía trước nhọn; cổng NOT: tam giác; dấu đảo: vòng tròn nhỏ ở lối ra; dây nối ngang, dọc, nối nhau ở
// đầu mút; chữ của lối vào sát đầu dây bên trái, chữ Y sát đầu dây lối ra) rồi lập bảng chân lí của mạch; hàm logic viết trong đề, lựa
// chọn, lời giải (“·” nhân logic, “+” cộng logic, gạch trên là phủ định) đọc lại và so với bảng chân lí; bảng chân lí trong bài gợi ý của
// câu tự luận so với yêu cầu của đề. Sách dạy cổng OR, AND, NOT, NOR, NAND: không có câu về cổng XOR.
// Rồi: chữ (như tests/tin-congnghe12-gk2.js), lời dặn của đề (sách, phạm vi, số câu mỗi phần tính từ ma trận, bài không có câu riêng,
// trường học khác phạm vi, câu về đề chung của Sở), môn, lịch thi và phạm vi của ck2-l12, mức độ và ma trận 10 – 8 – 7 (chủ đề theo tên
// bài như mục lục trong README của cuốn; mọi bài trong phạm vi có chủ đề trừ bài thực hành, hội thảo; chủ đề có ở kho giữa kì II đúng chữ
// của kho đó, chủ đề mới không trùng kho giữa kì II, cuối kì I; phần trọng tâm nhiều câu hơn phần ôn; hai đề cố định chia đúng ma trận),
// dạng câu theo khung Công văn 7991 (mỗi kho ít nhất 6 câu đúng/sai 4 ý không lặp kiểu Đ/S, 1–2 câu tự luận ở ô Vận dụng rút 1 câu), đáp
// án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu
// nhiều lựa chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không
// có, rút thử nhiều lần (đúng ma trận; đã làm hết một đề cố định thì không rút lại câu của đề đó), đề bài không trùng nhau, dò lộ đáp án
// giữa mọi cặp câu rút được cùng lúc và với lời dặn (đề “Ôn chủ đề” rút chung cả chủ đề; DO_LO=1 in chuỗi 3 từ của đáp án bằng chữ để
// xem tay, đã xem ghi ở DA_XEM) và giữa câu cùng chủ đề của kho này và kho giữa kì II (đề “Ôn chủ đề” rút chung; DA_XEM_CHU_DE), bộ dò
// lộ, bộ đọc HTML, CSS, bộ đọc hình, bộ đọc hàm logic tự thử với câu, mã, hình cố ý viết sai. So với kho cuối kì I, giữa kì II cùng môn:
// đề bài không gần trùng (cặp hai âm tiết chung), không có chuỗi 6 từ nào trùng đề bài của kho cuối kì I; câu cùng chủ đề với kho giữa kì
// II không trùng đề bài, chuỗi 6 từ của đề bài, đáp án câu đó. Có sách ở ../OnUp-Book thì so mọi trường chữ, cả chữ trong hình, lời dặn,
// với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho
// khác, cả kho cuối kì I, giữa kì II (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 6 từ).
// Chạy: node tests/tin-congnghe12-ck2.js → in MATH OK.
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
const BOOK = path.join(__dirname, "../../OnUp-Book");

/* ---------- hai kho: số đề, số câu lấy từ danh mục ----------
   DAU: câu phạm vi của lời dặn; PHAN: các phần của lời dặn (số câu mỗi phần tính từ ma trận); CHUONG: tên chủ đề, chương của sách nhắc
   trong lời dặn (đối chiếu mục lục); SAU: các câu khác lời dặn phải có; BAI: chủ đề theo tên bài của sách; TU, DEN: bài đầu, bài cuối của
   phạm vi; ON: các bài ôn, TAM: các bài trọng tâm (để so số câu); KHONG: bài thực hành, hội thảo trong phạm vi (không có chủ đề riêng);
   CU: chủ đề có ở kho giữa kì II (phải đúng chữ của kho đó); PHAM_VI: phạm vi của môn ghi ở ck2-l12. */
const SO = "Từ năm học 2026–2027 Sở GD&ĐT ra đề chung cuối kì một số môn lớp 12; xem thông báo của Sở về môn và cấu trúc đề.";
const MON = [
  { ma: "tin", ten: "Tin học", sachCo: ["tin-hoc-12-tin-hoc-ung-dung", "tin-hoc-12-khoa-hoc-may-tinh"], ki: "th",
    dau: "Sách Kết nối tri thức, Tin học 12, phần chung của hai sách Định hướng Tin học ứng dụng và Định hướng Khoa học máy tính.",
    DAU: "Phạm vi cuối năm học: phần CSS của Chủ đề 4 Giải quyết vấn đề với sự trợ giúp của máy tính (Bài 13–18) và Chủ đề 5 Hướng nghiệp với tin học (Bài 19–21), trọng tâm Bài 17, 19–20.",
    CHUONG: ["Chủ đề 4 Giải quyết vấn đề với sự trợ giúp của máy tính (", "Chủ đề 5 Hướng nghiệp với tin học ("],
    PHAN: [["Bài 13–16 (khái niệm CSS, định dạng văn bản, màu, khung)", 13, 16], ["Bài 17, 19–20 (các mức ưu tiên của bộ chọn, hướng nghiệp)", 17, 20]],
    SAU: ["Bài 18 thực hành tổng hợp, Bài 21 hội thảo hướng nghiệp không có câu riêng",
      "Trường kiểm tra cả phần riêng của định hướng Khoa học máy tính (Bài 22–30) hoặc Tin học ứng dụng (Bài 22–28) thì phụ huynh đối chiếu với đề cương của trường"],
    PHAM_VI: "Tin học: phần chung Bài 13–21 (CSS, hướng nghiệp), trọng tâm Bài 17, 19–20",
    TU: 13, DEN: 21, ON: [13, 16], TAM: [17, 20], KHONG: [18, 21],
    // phần riêng của hai định hướng: bài cuối của sách (lời dặn ghi Bài 22–30, Bài 22–28)
    RIENG: [["tin-hoc-12-khoa-hoc-may-tinh", 30], ["tin-hoc-12-tin-hoc-ung-dung", 28]],
    BAI: [["Khái niệm, vai trò của CSS", 13], ["Định dạng văn bản bằng CSS", 14], ["Tạo màu cho chữ và nền", 15], ["Định dạng khung", 16],
      ["Các mức ưu tiên của bộ chọn", 17], ["Dịch vụ sửa chữa và bảo trì máy tính", 19], ["Nhóm nghề quản trị trong ngành Công nghệ thông tin", 20]] },
  { ma: "congnghe", ten: "Công nghệ", sachCo: ["cong-nghe-12-cong-nghe-dien-dien-tu"], ki: "cn",
    dau: "Sách Kết nối tri thức, Công nghệ 12 – Công nghệ điện – điện tử, Phần hai Công nghệ điện tử.",
    DAU: "Phạm vi cuối năm học: Chương V–IX (Bài 13–26), trọng tâm Chương VIII–IX.",
    CHUONG: ["Chương V Giới thiệu chung về kĩ thuật điện tử (", "Chương VI Linh kiện điện tử (", "Chương VII Điện tử tương tự (", "Chương VIII Điện tử số (", "Chương IX Vi điều khiển ("],
    PHAN: [["Chương V Giới thiệu chung về kĩ thuật điện tử (Bài 13–14)", 13, 14], ["Chương VI Linh kiện điện tử (Bài 15–17)", 15, 17],
      ["Chương VII Điện tử tương tự (Bài 18–20)", 18, 20], ["Chương VIII Điện tử số (Bài 21–23)", 21, 23], ["Chương IX Vi điều khiển (Bài 24–26)", 24, 26]],
    SAU: ["Các bài thực hành (Bài 17, 20, 23, 26) không có câu riêng", "Trường chỉ kiểm tra Chương VIII–IX thì bỏ qua các câu Chương V–VII",
      "Trường học sách Công nghệ 12 – Lâm nghiệp – Thuỷ sản thì phụ huynh đối chiếu với đề cương của trường"],
    PHAM_VI: "Công nghệ: Công nghệ điện – điện tử Bài 13–26, trọng tâm Chương VIII–IX",
    TU: 13, DEN: 26, ON: [13, 19], TAM: [21, 25], KHONG: [17, 20, 23, 26], RIENG: [],
    BAI: [["Khái quát về kĩ thuật điện tử", 13], ["Ngành nghề và dịch vụ trong lĩnh vực kĩ thuật điện tử", 14], ["Điện trở, tụ điện và cuộn cảm", 15],
      ["Diode, transistor và mạch tích hợp IC", 16], ["Giới thiệu về điện tử tương tự", 18], ["Khuếch đại thuật toán", 19],
      ["Tín hiệu số và các cổng logic cơ bản", 21], ["Một số mạch xử lí tín hiệu trong điện tử số", 22], ["Khái quát về vi điều khiển", 24],
      ["Bo mạch lập trình vi điều khiển", 25]] }
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
  assert.ok(pool.subject === m.ten && pool.grade === 12 && pool.minutes === 45 && pool.title === m.ten + " 12 · Cuối năm · Đề ngẫu nhiên", pool.id + ": môn, khối, số phút, tên");
  m.DE.forEach((id, k) => {
    const b = bank(id);
    assert.equal(id, m.ma + "12-ck2-de" + (k + 1), "mã đề cố định");
    assert.ok(b.file === m.file && b.subject === m.ten && b.grade === 12 && b.minutes === pool.minutes && b.n === pool.n, id + ": cùng file, môn, khối, số phút, số câu với đề ngẫu nhiên");
    assert.equal(b.title, m.ten + " 12 · Cuối năm · Đề " + (k + 1), id + ": tên đề");
    assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
    m.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, m.ki + (k + 1) + "#" + (i + 1)));
  });
  assert.equal(m.kho.length, sum(m.DE.map((id) => bank(id).n)), m.ma + ": kho = câu của hai đề cố định");
  // kho giữa kì II (câu cùng chủ đề) và cuối kì I cùng môn (để so: đề bài không gần trùng)
  ["gk2", "ck1"].forEach((k) => {
    const p = BANKS.find((b) => b.pool && b.id === m.ma + "12-" + k + "-ngau-nhien");
    assert.ok(p && p.file === m.file, m.ma + ": có kho " + k + " cùng file");
    m[k] = p.questions; m[k + "M"] = p.pool.matrix;
    p.questions.forEach((q) => { const i = p.pool.from.indexOf(q.src), b = bank(q.src); ten.set(q, k + "-" + m.ki + (i < 0 ? "r" : i + 1) + "#" + (b.questions.findIndex((x) => x.q === q.q) + 1)); });
  });
  m.CHU_DE = m.BAI.map((b) => b[0]);
  m.ON_T = m.BAI.filter((b) => b[1] >= m.ON[0] && b[1] <= m.ON[1]).map((b) => b[0]);
  m.CU = m.CHU_DE.filter((t) => m.gk2M[t]);
});
const [TH, CN] = MON;
// Tin học: mọi chủ đề có ở kho giữa kì II (kho giữa kì II đã ôn cả Bài 13–20; phiên giao trọng tâm Bài 17, 19–20); Công nghệ: chỉ các chủ đề ôn
assert.deepEqual(TH.CU, TH.CHU_DE, "Tin học: mọi chủ đề đúng chữ kho giữa kì II");
assert.deepEqual(CN.CU, CN.ON_T, "Công nghệ: chủ đề ôn đúng chữ kho giữa kì II, chủ đề mới không có ở kho đó");
// môn đúng chữ của lịch thi (MON_THPT), sáu mã đề gắn vào kì thi cuối năm lớp 12, phạm vi của kì thi ghi đúng số bài
{
  const lich = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
  const mon = /const MON_THPT = \[([^\]]*)\]/.exec(lich);
  MON.forEach((m) => assert.ok(mon && mon[1].includes('"' + m.ten + '"'), "môn " + m.ten + " có trong MON_THPT"));
  const c = vm.createContext({ window: {} }); vm.runInContext(lich, c);
  const ev = c.window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck2-l12");
  assert.ok(ev && ev.grades.includes(12), "có kì thi ck2-l12");
  MON.forEach((m) => {
    [...m.DE, m.pool.id].forEach((id) => assert.ok(ev.banks.includes(id), id + " gắn vào ck2-l12"));
    assert.ok(ev.scope.includes(m.PHAM_VI), "phạm vi của ck2-l12 ghi " + m.PHAM_VI);
    assert.ok(m.PHAM_VI.includes("Bài " + m.TU + "–" + m.DEN), m.ma + ": phạm vi của ck2-l12 từ Bài " + m.TU + " đến Bài " + m.DEN);
  });
}
/* ---------- số ----------
   Số trong đề: hàng nghìn ngăn bằng khoảng trắng, dấu phẩy thập phân. */
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?";
const val = (s) => { const m = /^[−-]?\d{1,3}(?: \d{3})*(?:,\d+)?$/.exec(String(s).trim()); assert.ok(m, "không đọc được số “" + s + "”"); return +String(s).trim().replace(/ /g, "").replace("−", "-").replace(",", "."); };
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
// mẫu chữ có # ở chỗ số: so(s, "Cho # Ω") → [số]
const R = (mau) => new RegExp(mau.split("#").map(escRe).join("(" + NUM + ")"), "u");
const so = (s, mau) => { const m = R(mau).exec(s); assert.ok(m, "không thấy “" + mau + "” trong: " + String(s).slice(0, 80)); return m.slice(1).map(val); };
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b));
// số viết kiểu Việt Nam: 7500 → "7 500", 0.15 → "0,15"
const vn = (x, d = 6) => { const r = Math.round(x * 10 ** d) / 10 ** d, [a, b] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const lam = (x, d) => Math.round(x * 10 ** d + 1e-9) / 10 ** d; // làm tròn d chữ số thập phân
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const coThang = (q, ...cum) => { const r = q.rubric.map((c) => c.c).join(" | "); cum.forEach((c) => assert.ok(r.includes(c), "thang chấm cần có “" + c + "”")); };
const y = (o, re) => { const m = re.exec(o); assert.ok(m, "không đọc được ý “" + o + "”"); return m; };

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const giaiMa = (t) => t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: giaiMa(m[2]) }));
const num = (a, k) => +a[k];
const svgRong = (svg) => +attrs(svg.slice(0, svg.indexOf(">") + 1)).viewBox.split(" ")[2];
const svgCao = (svg) => +attrs(svg.slice(0, svg.indexOf(">") + 1)).viewBox.split(" ")[3];
const daDoc = new Set(); // hình đã đọc lại bằng code
// ước bề rộng một dòng chữ (Noto Sans, đo trong trình duyệt; mỗi nhóm lấy bề rộng của kí tự rộng nhất nhóm, nên ước lượng không nhỏ hơn bề
// rộng thật): xếp nhóm theo chữ gốc (bỏ dấu): chữ rất hẹp; t, f, dấu cách; r, /, ", -, 1; chữ rộng; chữ hoa; dấu so sánh; a c e k s v x y z;
// chữ thường, chữ số còn lại
const rongChu = (t, c) => { const g = c.normalize("NFD")[0];
  return (/[il|.,:;'!]/.test(g) ? 0.3 : /[tf ]/.test(g) ? 0.35 : /[r/"\-1]/.test(g) ? 0.47 : /[mwMW]/.test(g) ? 0.9 : /[A-ZĐ]/.test(g) ? 0.76 : /[<>=+]/.test(g) ? 0.66 : /[aceksvxyz]/.test(g) ? 0.58 : 0.62) *
    (+t["font-size"] || 15) * (t["font-weight"] === "700" ? 1.06 : 1); };
const rong = (t) => sum([...t.t].map((c) => rongChu(t, c)));

/* ---------- bộ đọc HTML (Tin học Bài 7–12; chép từ tests/tin-congnghe12-gk2.js, thêm thẻ nav của Bài 18) ----------
   docHtml(mã): đọc một đoạn mã HTML thành cây { tag, at, kids } (chữ là { text }). Kiểm tra cú pháp như sách: tên thẻ, thuộc tính chữ
   thường; thẻ mở – thẻ đóng lồng đúng thứ tự; thẻ rỗng (RONG) không có thẻ đóng; giá trị thuộc tính trong ngoặc kép, không lặp thuộc
   tính; thuộc tính không có giá trị chỉ là các thuộc tính bật, tắt (BAT_TAT); chỉ dùng thẻ, thuộc tính sách dạy (THE, THUOC_TINH). */
const RONG = new Set(["br", "hr", "img", "input", "meta", "source", "link"]);
const THE = new Set(["html", "head", "title", "meta", "link", "style", "body", "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "b", "strong", "i", "em", "u",
  "sub", "sup", "mark", "del", "small", "div", "span", "nav", "ol", "ul", "li", "dl", "dt", "dd", "table", "caption", "tr", "th", "td", "a", "img",
  "audio", "video", "source", "iframe", "form", "input", "label", "select", "option", "textarea", "fieldset", "legend"]);
const BAT_TAT = new Set(["controls", "autoplay", "muted"]);
const THUOC_TINH = new Set(["charset", "style", "type", "start", "colspan", "rowspan", "href", "target", "id", "src", "alt", "width", "height",
  "poster", "name", "value", "for", "rows", "cols", "action", "border", "class", "rel", ...BAT_TAT]);
const docHtml = (src) => {
  const root = { tag: "#", at: {}, kids: [] }, st = [root];
  const re = /<!DOCTYPE html>|<\/([a-z][a-z0-9]*)>|<([a-z][a-z0-9]*)((?:\s+[a-z-]+(?:="[^"<>]*")?)*)\s*>|([^<]+)|(<)/g;
  let m;
  while ((m = re.exec(src))) {
    if (m[0] === "<!DOCTYPE html>") { assert.ok(st.length === 1 && !root.kids.some((k) => k.tag), "<!DOCTYPE html> đứng đầu tệp"); root.doctype = true; continue; }
    if (m[5]) assert.fail("thẻ viết sai: " + src.slice(m.index, m.index + 30));
    if (m[4] !== undefined) { st[st.length - 1].kids.push({ text: m[4] }); continue; }
    if (m[1]) { const top = st.pop(); assert.ok(top !== root && top.tag === m[1], `thẻ đóng </${m[1]}> không khớp thẻ mở <${top.tag}>`); continue; }
    const tag = m[2]; assert.ok(THE.has(tag), "thẻ sách chưa dạy: <" + tag + ">");
    const at = {};
    for (const a of m[3].matchAll(/([a-z-]+)(?:="([^"]*)")?/g)) {
      assert.ok(!(a[1] in at), `<${tag}> lặp thuộc tính ${a[1]}`); assert.ok(THUOC_TINH.has(a[1]), "thuộc tính sách chưa dạy: " + a[1]);
      assert.ok(a[2] !== undefined || BAT_TAT.has(a[1]), `thuộc tính ${a[1]} cần giá trị trong ngoặc kép`); at[a[1]] = a[2] === undefined ? true : a[2];
    }
    const node = { tag, at, kids: [] }; st[st.length - 1].kids.push(node);
    if (!RONG.has(tag)) st.push(node);
  }
  assert.equal(st.length, 1, "thiếu thẻ đóng </" + st[st.length - 1].tag + ">");
  return root;
};
const tim = (n, t) => (n.kids || []).flatMap((k) => (k.tag === t ? [k] : []).concat(tim(k, t)));

/* ---------- bộ đọc CSS (Tin học Bài 13–17) ----------
   docCss(mã) → [{ chon: [bộ chọn], kb: [[tên, giá trị]], thu }]: mỗi mẫu định dạng “bộ chọn { thuộc tính: giá trị; … }”, nhiều bộ chọn ngăn
   bằng dấu phẩy, mỗi khai báo kết thúc bằng dấu chấm phẩy (cả khai báo cuối), tên thuộc tính chữ thường, chỉ thuộc tính sách dạy (CSS_TT),
   không lặp thuộc tính trong một mẫu; giá trị có thể kèm !important; lệnh @import "tệp.css"; đứng đầu. Bộ chọn (docChon): thẻ, *, .lớp,
   #id, [thuộc tính], [thuộc tính="giá trị"], :lớp giả, ::phần tử giả ghép liền nhau; hai bộ chọn đơn ngăn bằng dấu cách (phần tử con cháu),
   “>” (phần tử con trực tiếp), “+” (phần tử liền sau), “~” (phần tử đứng sau, cùng cha) như Bảng 15.1. */
// thuộc tính sách dạy (Bài 13–17): phông, màu, dòng văn bản, khung, display; margin, padding chỉ một giá trị (sách không dạy thuộc tính
// từng cạnh, nhiều giá trị); font-style không dùng (sách ghi giá trị “italics”, khác chuẩn CSS)
const CSS_TT = new Set(["color", "background-color", "font-family", "font-size", "font-weight", "text-align", "text-decoration", "text-indent",
  "line-height", "width", "height", "margin", "padding", "border", "border-width", "border-style", "border-color", "display"]);
// kế thừa theo sách (Bài 14, 15, 16): màu chữ, phông, cỡ chữ, độ đậm, căn lề, thụt lề, chiều cao dòng; text-decoration, các thuộc tính
// khung không kế thừa; background-color sách nói có kế thừa (chuẩn CSS thì không): không câu nào hỏi kế thừa màu nền
const KE_THUA = new Set(["color", "font-family", "font-size", "font-weight", "text-align", "text-indent", "line-height"]);
// lớp giả (Bảng 17.1; :active có trong mã Thực hành), phần tử giả (Bảng 17.2)
const GIA = new Set(["link", "visited", "hover", "active"]);
const GIA_PT = new Set(["first-line", "first-letter", "selection"]);
const NOI = new Set([">", "+", "~"]);
const docChon = (s) => {
  const t = String(s).trim(), D = [], N = [];
  assert.ok(t, "bộ chọn trống");
  t.replace(/\s*([>+~])\s*/g, " $1 ").split(/\s+/).forEach((p) => {
    if (NOI.has(p)) { assert.ok(D.length && N.length === D.length - 1, "bộ chọn viết sai: “" + s + "”"); N.push(p); return; }
    if (D.length && N.length === D.length - 1) N.push(" ");
    D.push(p);
  });
  assert.ok(D.length === N.length + 1, "bộ chọn viết sai: “" + s + "”");
  const dons = D.map((p) => {
    const m = /^(\*|[a-z][a-z0-9]*)?((?:[.#][A-Za-z][A-Za-z0-9_-]*|::?[a-z-]+|\[[a-z-]+(?:="[^"]*")?\])*)$/.exec(p);
    assert.ok(m && (m[1] || m[2]), "bộ chọn viết sai: “" + p + "”");
    if (m[1] && m[1] !== "*") assert.ok(THE.has(m[1]), "bộ chọn thẻ sách chưa dạy: " + m[1]);
    const d = { the: m[1] || "*", lop: [], id: [], gia: [], pt: [], tt: [] };
    for (const x of m[2].matchAll(/::([a-z-]+)|:([a-z-]+)|\.([A-Za-z][A-Za-z0-9_-]*)|#([A-Za-z][A-Za-z0-9_-]*)|\[([a-z-]+)(?:="([^"]*)")?\]/g)) {
      if (x[1]) { assert.ok(GIA_PT.has(x[1]), "pseudo-element sách chưa dạy: " + x[1]); d.pt.push(x[1]); }
      else if (x[2]) { assert.ok(GIA.has(x[2]), "pseudo-class sách chưa dạy: " + x[2]); d.gia.push(x[2]); }
      else if (x[3]) d.lop.push(x[3]); else if (x[4]) d.id.push(x[4]); else d.tt.push([x[5], x[6]]);
    }
    assert.ok(d.id.length <= 1, "một bộ chọn đơn có hai id: " + p);
    return d;
  });
  assert.ok(dons.slice(0, -1).every((d) => !d.pt.length), "pseudo-element chỉ ở cuối bộ chọn: " + s);
  return { s: t, don: dons, noi: N, ts: trongSo(dons) };
};
// trọng số của bộ chọn (Bài 17, Bảng 17.4): mỗi id 100; mỗi lớp, lớp giả, bộ chọn kiểu thuộc tính 10; mỗi phần tử, phần tử giả 1; cộng lại
const trongSo = (dons) => sum(dons.map((d) => 100 * d.id.length + 10 * (d.lop.length + d.gia.length + d.tt.length) + (d.the === "*" ? 0 : 1) + d.pt.length));
const docKhaiBao = (s, at) => {
  const t = String(s).trim(), kb = [];
  if (!t) return kb;
  assert.ok(t.endsWith(";"), at + ": khai báo cuối cần dấu chấm phẩy: “" + t + "”");
  t.slice(0, -1).split(";").forEach((c) => {
    const m = /^\s*([a-z-]+)\s*:\s*([^:;{}!]+?)\s*(!important)?\s*$/.exec(c);
    assert.ok(m, at + ": khai báo viết sai: “" + c.trim() + "”");
    assert.ok(CSS_TT.has(m[1]), "thuộc tính CSS sách chưa dạy: " + m[1]);
    assert.ok(!kb.some((k) => k[0] === m[1]), at + ": lặp thuộc tính " + m[1]);
    giaTriHopLe(m[1], m[2]);
    kb.push([m[1], m[2], !!m[3]]);
  });
  return kb;
};
const docCss = (src, thu0 = 0) => {
  const R = [], nhap = [];
  // lệnh @import "tệp.css"; (cách thứ hai kết nối CSS ngoài, Bài 13) đứng đầu mã CSS
  const t = String(src).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/^\s*(?:@import\s+"([^"]+)"\s*;\s*)+/, (m) => { for (const x of m.matchAll(/@import\s+"([^"]+)"/g)) nhap.push(x[1]); return " "; });
  const re = /([^{}]+)\{([^{}]*)\}/g; let m, het = 0;
  while ((m = re.exec(t))) {
    assert.ok(!t.slice(het, m.index).trim(), "mã CSS viết sai: “" + t.slice(het, m.index).trim() + "”");
    const chon = m[1].split(",").map(docChon);
    R.push({ chon, kb: docKhaiBao(m[2], m[1].trim()), thu: thu0 + R.length });
    het = re.lastIndex;
  }
  assert.ok(!t.slice(het).trim(), "mã CSS viết sai (thiếu ngoặc nhọn?): “" + t.slice(het).trim() + "”");
  R.nhap = nhap;
  return R;
};

/* ---------- giá trị CSS: màu, độ dài ----------
   Màu (Bài 15) theo tên (sách dùng tên tiếng Anh), mã hex #rrggbb (sách không dạy #rgb), rgb(r, g, b) bằng số 0–255 hay phần trăm,
   hsl(H, S%, L%) → [r, g, b]. Độ dài: px; cỡ chữ thêm pt, em, rem, % (Bài 14). */
const TEN_MAU = { black: [0, 0, 0], white: [255, 255, 255], red: [255, 0, 0], lime: [0, 255, 0], green: [0, 128, 0], blue: [0, 0, 255],
  yellow: [255, 255, 0], cyan: [0, 255, 255], aqua: [0, 255, 255], magenta: [255, 0, 255], fuchsia: [255, 0, 255], gray: [128, 128, 128],
  grey: [128, 128, 128], silver: [192, 192, 192], maroon: [128, 0, 0], navy: [0, 0, 128], purple: [128, 0, 128], olive: [128, 128, 0],
  teal: [0, 128, 128], orange: [255, 165, 0], pink: [255, 192, 203], brown: [165, 42, 42] };
const docMau = (v) => {
  const s = String(v).trim().toLowerCase(); let m;
  if (TEN_MAU[s]) return TEN_MAU[s].slice();
  if ((m = /^#([0-9a-f]{6})$/.exec(s))) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
  if ((m = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.exec(s))) { const c = m.slice(1).map(Number); assert.ok(c.every((x) => x <= 255), "rgb() mỗi số 0–255: " + v); return c; }
  if ((m = /^rgb\(\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/.exec(s))) { const c = m.slice(1).map(Number); assert.ok(c.every((x) => x <= 100), "rgb() theo % mỗi số 0–100%: " + v); return c.map((x) => Math.round((x * 255) / 100 + 1e-9)); }
  if ((m = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/.exec(s))) {
    const [h, S, L] = [+m[1], +m[2] / 100, +m[3] / 100]; assert.ok(h < 360 && S <= 1 && L <= 1, "hsl(): " + v);
    const C = (1 - Math.abs(2 * L - 1)) * S, X = C * (1 - Math.abs(((h / 60) % 2) - 1)), k = Math.floor(h / 60), d = L - C / 2;
    const [r, g, b] = [[C, X, 0], [X, C, 0], [0, C, X], [0, X, C], [X, 0, C], [C, 0, X]][k];
    return [r, g, b].map((x) => Math.round((x + d) * 255));
  }
  assert.fail("không đọc được màu “" + v + "”");
};
const hex = (c) => "#" + c.map((x) => x.toString(16).toUpperCase().padStart(2, "0")).join("");
const KIEU_VIEN = new Set(["none", "solid", "dotted", "dashed", "double", "inset", "outset", "ridge", "groove"]); // Bảng 16.2
const docPx = (v) => { const m = /^(\d+(?:\.\d+)?)px$/.exec(String(v).trim()); assert.ok(m || String(v).trim() === "0", "độ dài viết sai (cần px): “" + v + "”"); return m ? +m[1] : 0; };
const docVien = (v) => { // border: độ dày, kiểu, màu (thứ tự bất kì)
  const p = String(v).trim().split(/\s+(?![^(]*\))/), r = { w: 3, kieu: "none", mau: null };
  assert.ok(p.length >= 1 && p.length <= 3, "border viết sai: “" + v + "”");
  p.forEach((x) => { if (/^\d/.test(x)) r.w = docPx(x); else if (KIEU_VIEN.has(x)) r.kieu = x; else r.mau = docMau(x); });
  return r;
};
const giaTriHopLe = (tt, v) => {
  if (["color", "background-color", "border-color"].includes(tt)) docMau(v);
  else if (tt === "margin" || tt === "padding") { assert.ok(!/\s/.test(String(v).trim()), "margin, padding một giá trị (sách): “" + v + "”"); docPx(v); }
  else if (tt === "border") docVien(v);
  else if (["width", "height", "border-width"].includes(tt)) docPx(v);
  else if (tt === "text-indent") assert.ok(/^-?\d+(?:\.\d+)?(?:px|em|%)$/.test(v), "text-indent: “" + v + "”");
  else if (tt === "font-family") assert.ok(/^(?:(?:"[A-Za-z ]+"|[A-Za-z][A-Za-z-]*)\s*,\s*)*(serif|sans-serif|monospace|cursive|fantasy)$/.test(v), "font-family: danh sách phông, tên loại phông ở cuối: “" + v + "”");
  else if (tt === "border-style") assert.ok(KIEU_VIEN.has(v), "border-style: “" + v + "”");
  else if (tt === "font-size") assert.ok(/^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/.test(v), "font-size viết sai: “" + v + "”");
  else if (tt === "font-weight") assert.ok(["normal", "bold"].includes(v) || /^[1-9]00$/.test(v), "font-weight: “" + v + "”");
  else if (tt === "text-align") assert.ok(["left", "right", "center", "justify"].includes(v), "text-align: “" + v + "”");
  else if (tt === "text-decoration") assert.ok(["none", "underline", "overline", "line-through"].includes(v), "text-decoration: “" + v + "”");
  else if (tt === "display") assert.ok(["block", "inline", "none"].includes(v), "display (sách: block, inline, none): “" + v + "”");
};

/* ---------- áp mẫu định dạng lên trang ---------- */
const ganCha = (n, cha = null) => { n.cha = cha; (n.kids || []).forEach((k) => k.tag && ganCha(k, n)); return n; };
const anhTruoc = (el) => { if (!el.cha) return []; const k = el.cha.kids.filter((x) => x.tag); return k.slice(0, k.indexOf(el)); };
// gia: lớp giả đang xảy ra. Mảng (như ["hover"]): chỉ với chính phần tử được định dạng (như tests/tin-congnghe12-gk2.js); đối tượng
// { hover: Set, visited: Set }: các phần tử đang ở trạng thái đó (di chuột lên một phần tử thì nó và mọi phần tử cha cùng ở trạng thái
// :hover, diChuot), để bộ chọn như “.the:hover h3” khớp được; phần tử giả không khớp phần tử nào của cây
const coGia = (el, g, gia, cuoi) => (Array.isArray(gia) ? cuoi && gia.includes(g) : !!(gia && gia[g] && gia[g].has(el)));
const khopDon = (el, d, gia, cuoi) => el && el.tag && el.tag !== "#" && (d.the === "*" || d.the === el.tag) &&
  d.lop.every((l) => String(el.at.class || "").split(/\s+/).includes(l)) && d.id.every((i) => el.at.id === i) &&
  d.tt.every(([a, v]) => el.at[a] !== undefined && (v === undefined || el.at[a] === v)) &&
  d.gia.every((g) => coGia(el, g, gia, cuoi));
const khop = (el, c, gia) => {
  const don = c.don, noi = c.noi;
  const tu = (e, i) => { if (!khopDon(e, don[i], gia, i === don.length - 1)) return false; if (i === 0) return true;
    const n = noi[i - 1];
    if (n === ">") return tu(e.cha, i - 1);
    if (n === "+") { const a = anhTruoc(e); return a.length > 0 && tu(a[a.length - 1], i - 1); }
    if (n === "~") return anhTruoc(e).some((a) => tu(a, i - 1));
    for (let a = e.cha; a && a.tag !== "#"; a = a.cha) if (tu(a, i - 1)) return true; return false; };
  return !don[don.length - 1].pt.length && tu(el, don.length - 1);
};
// di chuột lên phần tử el: el và các phần tử cha ở trạng thái :hover
const diChuot = (el, them = {}) => { const h = new Set(); for (let e = el; e && e.tag && e.tag !== "#"; e = e.cha) h.add(e); return Object.assign({ hover: h }, them); };
/* apCss(gốc, { "tệp.css": mã }) → { kieu(phần tử, thuộc tính, lớp giả), mau }: mẫu định dạng của các thẻ link (tệp CSS ngoài) và style theo
   thứ tự trong trang. Thứ tự ưu tiên theo Bảng 17.3: khai báo có !important; CSS trực tiếp (thuộc tính style); trọng số lớn hơn; cùng trọng
   số thì mẫu ở vị trí cuối cùng; không mẫu nào thì thuộc tính kế thừa (KE_THUA) lấy của phần tử cha; không có thì mặc định của trình duyệt
   (undefined). */
const apCss = (goc, ngoai = {}) => {
  ganCha(goc);
  const mau = [];
  const di = (n) => { (n.kids || []).forEach((k) => {
    if (k.tag === "style") { const r = docCss(k.kids.map((x) => x.text || "").join(""), mau.length);
      r.nhap.forEach((f) => { assert.ok(ngoai[f] !== undefined, "lệnh @import tới tệp CSS chưa có: " + f); mau.push(...docCss(ngoai[f], mau.length)); });
      mau.push(...r.map((x, i) => Object.assign(x, { thu: mau.length + i }))); }
    else if (k.tag === "link") { assert.ok(k.at.rel === "stylesheet" && ngoai[k.at.href] !== undefined, "thẻ link tới tệp CSS chưa có: " + k.at.href); mau.push(...docCss(ngoai[k.at.href], mau.length)); }
    if (k.tag) di(k); }); };
  di(goc);
  const kieu = (el, tt, gia) => {
    const ung = []; // [mức: 3 !important, 2 trực tiếp, 1 mẫu; trọng số; thứ tự; giá trị]
    if (el.at && el.at.style !== undefined) docKhaiBao(el.at.style, "style").forEach((k) => { if (k[0] === tt) ung.push([k[2] ? 3 : 2, 1e9, 1e9, k[1]]); });
    mau.forEach((r) => r.chon.forEach((c) => { if (!khop(el, c, gia)) return; r.kb.forEach((k) => { if (k[0] === tt) ung.push([k[2] ? 3 : 1, c.ts, r.thu, k[1]]); }); }));
    if (ung.length) return ung.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]).pop()[3];
    if (KE_THUA.has(tt) && el.cha && el.cha.tag && el.cha.tag !== "#") return kieu(el.cha, tt, Array.isArray(gia) ? undefined : gia);
    return undefined;
  };
  return { kieu, mau };
};
// cỡ chữ (px) của một phần tử: pt đổi ra px, % theo cỡ chữ của phần tử cha, rem theo phần tử gốc html (Bài 14); không định dạng thì kế thừa, gốc 16px;
// em sách định nghĩa theo cỡ chữ của trình duyệt nên chỉ dùng khi phần tử cha có cỡ mặc định (16px); h1–h6 có cỡ riêng của trình duyệt: không hỏi
const coChu = (ap, el) => {
  const tu = (e) => {
    if (!e || !e.tag || e.tag === "#") return 16;
    const v = ap.kieu(e, "font-size");
    const own = (() => { if (!e.at) return undefined; const r = ap.mau.some((x) => x.chon.some((c) => khop(e, c) && x.kb.some((k) => k[0] === "font-size"))); return r || (e.at.style && /font-size/.test(e.at.style)); })();
    if (!own) return tu(e.cha);
    const m = /^(\d+(?:\.\d+)?)(px|pt|em|rem|%)$/.exec(v);
    if (m[2] === "px") return +m[1];
    if (m[2] === "pt") return (+m[1] * 96) / 72; // 1 pt = 1/72 inch, 1 px = 1/96 inch (Bài 14)
    if (m[2] === "em") return +m[1] * tu(e.cha);
    if (m[2] === "%") return (+m[1] / 100) * tu(e.cha);
    let h = e; while (h.cha && h.cha.tag !== "#") h = h.cha; return +m[1] * (h === e ? 16 : tu(h));
  };
  return tu(el);
};

/* ---------- Công nghệ: điện trở, tụ điện, cuộn cảm (Bài 15) ----------
   Vạch màu theo Hình 15.3 của sách: điện trở 4 vạch: vạch 1, 2 là hai chữ số, vạch 3 là hệ số nhân, vạch 4 là sai số; 5 vạch: ba chữ số, hệ
   số nhân, sai số. MAU_SO: màu → chữ số; MAU_MU: màu → số mũ của hệ số nhân (bảng của sách chỉ có nâu đến xanh lam, nhũ vàng 0,1, bạc 0,01;
   ô hệ số nhân của màu đen in “0”, tím, xám, trắng để trống: không dùng); MAU_SAI: màu → sai số (%) (bảng chỉ có nâu, đỏ, nhũ vàng, bạc). */
const MAU_SO = { "đen": 0, "nâu": 1, "đỏ": 2, "cam": 3, "vàng": 4, "xanh lục": 5, "xanh lam": 6, "tím": 7, "xám": 8, "trắng": 9 };
const MAU_MU = { "nâu": 1, "đỏ": 2, "cam": 3, "vàng": 4, "xanh lục": 5, "xanh lam": 6, "nhũ vàng": -1, "bạc": -2 };
const MAU_SAI = { "nâu": 1, "đỏ": 2, "nhũ vàng": 5, "bạc": 10 };
// vòng màu → { R (Ω), sai (%) }; vm: mảng tên màu theo thứ tự từ trái sang phải
const docVongMau = (vm) => {
  assert.ok(vm.length === 4 || vm.length === 5, "điện trở 4 hoặc 5 vạch màu: " + vm.join(", "));
  const so = vm.slice(0, vm.length - 2), mu = vm[vm.length - 2], sai = vm[vm.length - 1];
  so.forEach((c) => assert.ok(c in MAU_SO, "màu chữ số: " + c)); assert.ok(MAU_SO[so[0]] > 0, "vạch đầu không là màu đen");
  assert.ok(mu in MAU_MU, "màu hệ số nhân theo bảng của sách: " + mu); assert.ok(sai in MAU_SAI, "màu sai số theo bảng của sách: " + sai);
  const n = +so.map((c) => MAU_SO[c]).join("");
  return { R: Math.round(n * 10 ** MAU_MU[mu] * 1e6) / 1e6, sai: MAU_SAI[sai] };
};
// trị số viết như sách: 4 700 Ω → "4,7 kΩ"; 220 Ω → "220 Ω"; 1 000 000 Ω → "1 MΩ"
const triSo = (R) => (R >= 1e6 ? vn(R / 1e6) + " MΩ" : R >= 1e3 ? vn(R / 1e3) + " kΩ" : vn(R) + " Ω");
// dung kháng X_C = 1 : (2πfC), cảm kháng X_L = 2πfL (sách không dạy điện trở, tụ, cuộn cảm mắc nối tiếp, song song, định luật Ohm, P = UI)
const dungKhang = (f, C) => 1 / (2 * Math.PI * f * C);
const camKhang = (f, L) => 2 * Math.PI * f * L;

/* ---------- Công nghệ: khuếch đại thuật toán (Bài 19) ----------
   Mạch khuếch đại đảo: U_ra = −(R2 : R1) × U_vào; mạch khuếch đại không đảo: G = 1 + R2 : R1 (R1 nối lối vào đảo xuống đất, R2 nối từ lối
   ra về lối vào đảo). */
const daoK = (R1, R2) => -R2 / R1;
const khongDaoK = (R1, R2) => 1 + R2 / R1;

/* ---------- Tin học: đoạn mã trong câu ----------
   maTrong(chuỗi): các đoạn mã của một chuỗi chữ: đoạn trong ngoặc kép “…” có thẻ HTML, có mẫu định dạng CSS (ngoặc nhọn) hay là các quy
   định “thuộc tính: giá trị;”; hoặc cả chuỗi khi chuỗi là một đoạn mã (lựa chọn là thẻ HTML, mẫu định dạng, quy định). docDoan(mã) đọc
   đoạn mã: HTML thì đọc thẻ, rồi đọc mã CSS trong thẻ style và trong thuộc tính style; mẫu định dạng thì đọc bằng docCss; quy định thì đọc
   bằng docKhaiBao. */
const laQuyDinh = (s) => /^\s*[a-z-]+\s*:\s*[^:;{}<>“”]+;(\s*[a-z-]+\s*:\s*[^:;{}<>“”]+;)*\s*$/.test(s);
// bộ chọn có thể có “>” (phần tử con trực tiếp)
const laKhoiCss = (s) => /^\s*[^{}<“”]+\{[^{}<>“”]*\}\s*$/.test(s);
const laMaCa = (s) => /^<(?:!DOCTYPE|\/?[a-z])/.test(String(s)) || laKhoiCss(String(s)) || laQuyDinh(String(s));
const maTrong = (s) => (laMaCa(s) ? [String(s)] : [...String(s).matchAll(/“([^”]*)”/g)].map((m) => m[1]).filter((m) => /<[a-z!/]/.test(m) || laKhoiCss(m) || laQuyDinh(m)));
const laMa = (s) => laMaCa(s);
// một đoạn mã là một thẻ mở đứng riêng thì thêm thẻ đóng rồi mới đọc
const docMa = (ma) => { const m = /^<([a-z][a-z0-9]*)[^<>]*>$/.exec(ma); return docHtml(m && !RONG.has(m[1]) ? ma + "</" + m[1] + ">" : ma); };
const docDoan = (ma) => {
  if (/^\s*</.test(ma) || /<[a-z!/]/.test(ma)) {
    const g = docMa(ma);
    tim(g, "style").forEach((st) => docCss(st.kids.map((x) => x.text || "").join("")));
    const di = (n) => (n.kids || []).forEach((k) => { if (k.tag) { if (k.at.style !== undefined) docKhaiBao(k.at.style, "style"); di(k); } });
    di(g); return g;
  }
  if (laKhoiCss(ma)) return docCss(ma);
  return docKhaiBao(ma, "quy định");
};
const hopLe = (ma) => { try { docDoan(ma); return true; } catch (e) { return false; } };
// phần tử có chữ (chữ của chính nó, không tính phần tử con) chứa đoạn t
const theoChu = (g, t) => { const r = []; const di = (n) => (n.kids || []).forEach((k) => { if (!k.tag) return;
  if ((k.kids || []).some((x) => x.text !== undefined && x.text.includes(t))) r.push(k); di(k); }); di(g);
  assert.equal(r.length, 1, "đúng một phần tử có chữ “" + t + "”"); return r[0]; };
// đoạn mã của hình khung mã: chưa có thẻ body thì trình duyệt đặt nội dung vào body (mẫu cho body kế thừa xuống)
const trangMa = (ma) => ganCha(docHtml(/<body[\s>]/.test(ma) ? ma : "<html><body>" + ma + "</body></html>"));
// trang có các mẫu CSS và đoạn HTML: <html><head><style>…</style></head><body>…</body></html>
const trang = (css, html) => docHtml("<html><head><style>" + css + "</style></head><body>" + html + "</body></html>");
const MAU_VIET = { "đỏ": "red", "xanh lá": "green", "xanh dương": "blue", "xanh lam": "blue", "xám": "gray", "cam": "orange", "vàng": "yellow", "đen": "black", "trắng": "white", "navy": "navy", "teal": "teal", "tím": "purple", "maroon": "maroon" };
const cungMau = (a, b) => docMau(a).join() === docMau(b).join();
const tenMau = (v) => { const c = docMau(v); if (c[0] === c[1] && c[1] === c[2]) return c[0] === 0 ? "Đen" : c[0] === 255 ? "Trắng" : "Xám";
  const k = Object.keys(MAU_VIET).find((t) => cungMau(MAU_VIET[t], v)); assert.ok(k, "chưa có tên tiếng Việt cho màu " + v); return k[0].toUpperCase() + k.slice(1); };
// loại phông chung cuối danh sách của font-family
const loaiPhong = (v) => String(v).split(",").map((x) => x.trim()).pop();
// khung mã (hình): nền bg viền line; mỗi dòng mã một thẻ text cỡ 14 căn trái, dòng cách đều 20, lùi đầu dòng 16 mỗi bậc theo số thẻ và
// ngoặc nhọn đang mở; chữ vừa khung. docKhung(svg) → mã (các dòng nối bằng "\n")
const docKhung = (svg) => {
  const W = svgRong(svg), H = svgCao(svg), T = texts(svg), N = tags(svg, "rect");
  assert.ok(W === 320 && N.length === 1 && N[0].fill === "bg" && N[0].stroke === "line" && num(N[0], "x") === 1 && num(N[0], "y") === 1 && num(N[0], "width") === W - 2 && num(N[0], "height") === H - 2, "khung mã: một hình chữ nhật nền bg, viền line");
  assert.ok(T.length >= 2 && T.every((t, k) => t["font-size"] === "14" && !t["text-anchor"] && num(t, "y") === 26 + 20 * k), "khung mã: mỗi dòng một chữ cỡ 14, cách đều 20");
  assert.equal(H, 26 + 20 * (T.length - 1) + 16, "khung mã: cao vừa các dòng");
  const ma = T.map((t) => t.t).join("\n"); docDoan(ma);
  let sau = 0;
  T.forEach((t) => { const mo = (t.t.match(/<[a-z][^>]*>/g) || []).filter((x) => !RONG.has(/^<([a-z0-9]+)/.exec(x)[1])).length + (t.t.match(/\{/g) || []).length;
    const dong = (t.t.match(/<\/[a-z0-9]+>/g) || []).length + (t.t.match(/\}/g) || []).length;
    const bac = /^(<\/|\})/.test(t.t) ? sau - 1 : sau; assert.equal(num(t, "x"), 12 + 16 * bac, "khung mã: lùi đầu dòng theo bậc: " + t.t);
    assert.ok(num(t, "x") + rong(t) <= W - 8, "khung mã: dòng vừa khung: " + t.t); sau += mo - dong; });
  assert.equal(sau, 0, "khung mã: thẻ, ngoặc nhọn đóng đủ");
  daDoc.add(svg); return ma;
};
// Bảng 16.1: phần tử khối, phần tử nội tuyến theo sách (chỉ dùng các thẻ không gây tranh cãi)
const KHOI_SACH = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "form", "table", "hr", "ol", "ul", "li"]);
const NOI_TUYEN_SACH = new Set(["b", "span", "a", "img", "em", "strong", "sub", "sup", "q", "i", "u", "del", "mark", "br", "label", "textarea", "input"]);
// quy định đặt tên lớp, id (Bài 16): bắt đầu bằng chữ cái, chỉ chữ cái không dấu, chữ số, dấu gạch ngang, gạch dưới; phân biệt hoa, thường
const tenHopLe = (t) => /^[A-Za-z][A-Za-z0-9_-]*$/.test(t);

/* ---------- Công nghệ: chữ trong hình từ cỡ 13, nằm trong khung hình ---------- */
const khungHinh = (svg) => { const W = svgRong(svg), H = svgCao(svg);
  texts(svg).forEach((t) => { const c = +t["font-size"]; assert.ok(c >= 13, "chữ trong hình cỡ từ 13: " + t.t); const w = rong(t), a = t["text-anchor"], x0 = a === "middle" ? num(t, "x") - w / 2 : num(t, "x");
    assert.ok(x0 >= 0 && x0 + w <= W && num(t, "y") - 0.75 * c >= 0 && num(t, "y") <= H, "chữ “" + t.t + "” nằm trong khung hình"); }); };
const doc = (svg) => ({ L: tags(svg, "line").map((l) => ({ x1: num(l, "x1"), y1: num(l, "y1"), x2: num(l, "x2"), y2: num(l, "y2"), w: +(l["stroke-width"] || 1) })),
  R: tags(svg, "rect"), C: tags(svg, "circle"), P: tags(svg, "polygon").map((p) => p.points.trim().split(/\s+/).map((xy) => xy.split(",").map(Number))), T: texts(svg) });
// số đọc từ chữ: "4,7 kΩ" → 4 700; "15 mH" → 0,015; "47 µF" → 47·10⁻⁶
const HE = { k: 1e3, M: 1e6, m: 1e-3, "µ": 1e-6, p: 1e-12, "": 1 };
const doLuong = (s, dv) => { const m = new RegExp("(" + NUM + ") ?(k|M|m|µ|p)?" + dv + "(?![\\p{L}])", "u").exec(s); assert.ok(m, "không thấy số đo " + dv + " trong: " + String(s).slice(0, 60)); return val(m[1]) * HE[m[2] || ""]; };
const mauCua = (s) => s.split(",").map((x) => x.trim().toLowerCase().replace(/\.$/, ""));

/* ---------- Công nghệ: mạch logic trong hình (Bài 21) ----------
   Kí hiệu theo sách (Hình 21.6, 21.8, 21.10, 21.12, 21.15): cổng AND: path “M x y H xm A r r 0 0 1 xm y+2r H x Z” (cạnh sau thẳng, phía
   trước nửa hình tròn), hai lối vào ở cạnh sau cách đỉnh r/2 và 3r/2, lối ra ở đỉnh nửa hình tròn; cổng OR: path “M x y Q x+12 y+r x
   y+2r Q x+0,6L y+2r x+L y+r Q x+0,6L y x y Z” (cạnh sau cong lõm, phía trước nhọn), hai lối vào trên cạnh sau cong ở t = 1/4, 3/4 (điểm
   (x + 24t(1 − t), y + 2rt)), lối ra ở mũi nhọn; cổng NOT: tam giác đỉnh hướng sang phải, lối vào ở giữa cạnh sau; dấu đảo: vòng tròn
   r = 5 sát lối ra (cổng NOT luôn có; AND, OR có dấu đảo là NAND, NOR). Dây nối: đoạn ngang hoặc dọc, nối nhau ở đầu mút (đầu dây không
   chạm giữa dây khác); đầu dây nào cũng là chân cổng, lối vào, lối ra của mạch hoặc đầu dây khác. Lối vào của mạch: một chữ in hoa
   text-anchor end, cách đầu dây 6 về bên trái, thấp hơn 5; lối ra: chữ Y cách đầu dây 6 về bên phải. Mỗi lưới dây có đúng một nguồn (lối
   vào của mạch hoặc lối ra của một cổng), không có vòng. docMach(svg) → { vao: [tên lối vào], cong: [loại cổng], ham(giá trị) → Y }. */
const CONG = { AND: (a, b) => a & b, OR: (a, b) => a | b, NAND: (a, b) => 1 - (a & b), NOR: (a, b) => 1 - (a | b), NOT: (a) => 1 - a };
const docMach = (svg) => {
  khungHinh(svg);
  const cong = [], P = [...svg.matchAll(/<path d="([^"]*)"[^>]*>/g)].map((m) => m[1]);
  P.forEach((d) => {
    let m;
    if ((m = /^M (\S+) (\S+) H (\S+) A (\S+) (\S+) 0 0 1 (\S+) (\S+) H (\S+) Z$/.exec(d))) {
      const [x, y, xm, r, r2, xm2, y2, x2] = m.slice(1).map(Number);
      assert.ok(r === r2 && xm === xm2 && x2 === x && y2 === y + 2 * r && xm > x, "cổng AND vẽ sai: " + d);
      cong.push({ loai: "AND", vao: [[x, y + r / 2], [x, y + 1.5 * r]], ra: [xm + r, y + r] });
    } else if ((m = /^M (\S+) (\S+) Q (\S+) (\S+) (\S+) (\S+) Q (\S+) (\S+) (\S+) (\S+) Q (\S+) (\S+) (\S+) (\S+) Z$/.exec(d))) {
      const v = m.slice(1).map(Number), [x, y] = v, h = v[5] - y, r = h / 2, L = v[8] - x;
      assert.ok(h > 0 && L > 0 && v[2] === x + 12 && v[3] === y + r && v[4] === x && gan(v[6], x + 0.6 * L) && v[7] === y + h && v[9] === y + r && gan(v[10], x + 0.6 * L) && v[11] === y && v[12] === x && v[13] === y, "cổng OR vẽ sai: " + d);
      const tai = (t) => [x + 24 * t * (1 - t), y + h * t];
      cong.push({ loai: "OR", vao: [tai(0.25), tai(0.75)], ra: [x + L, y + r] });
    } else assert.fail("hình lạ trong mạch logic: " + d);
  });
  tags(svg, "polygon").forEach((g) => { const p = g.points.trim().split(/\s+/).map((xy) => xy.split(",").map(Number));
    assert.ok(p.length === 3 && p[0][0] === p[1][0] && p[2][1] === (p[0][1] + p[1][1]) / 2 && p[2][0] > p[0][0], "cổng NOT: tam giác đỉnh hướng sang phải");
    cong.push({ loai: "NOT", vao: [[p[0][0], p[2][1]]], ra: p[2].slice() }); });
  const tron = tags(svg, "circle");
  assert.ok(tron.every((c) => +c.r === 5), "trong mạch logic chỉ có vòng tròn dấu đảo");
  tron.forEach((c) => { const g = cong.find((k) => !k.dao && k.ra[0] + 5 === +c.cx && k.ra[1] === +c.cy); assert.ok(g, "dấu đảo nằm sát lối ra của một cổng"); g.dao = true; g.ra = [g.ra[0] + 10, g.ra[1]]; });
  cong.forEach((g) => { if (g.loai === "NOT") assert.ok(g.dao, "cổng NOT có dấu đảo ở lối ra"); else if (g.dao) g.loai = "N" + g.loai; });
  assert.ok(cong.length >= 1, "mạch có cổng logic");
  // dây nối
  const day = tags(svg, "line").map((l) => [[+l.x1, +l.y1], [+l.x2, +l.y2]]), k = (p) => p[0] + "," + p[1];
  day.forEach(([p, q]) => assert.ok((p[0] === q[0]) !== (p[1] === q[1]), "dây nối là đoạn ngang hoặc dọc"));
  day.forEach((a, i) => a.forEach((p) => day.forEach(([u, v], j) => { if (i === j) return;
    const giua = (u[0] === v[0] && p[0] === u[0] && p[1] > Math.min(u[1], v[1]) && p[1] < Math.max(u[1], v[1])) || (u[1] === v[1] && p[1] === u[1] && p[0] > Math.min(u[0], v[0]) && p[0] < Math.max(u[0], v[0]));
    assert.ok(!giua, "đầu dây chạm giữa một dây khác"); })));
  const cha = day.map((_, i) => i), goc = (i) => (cha[i] === i ? i : (cha[i] = goc(cha[i])));
  day.forEach((a, i) => day.forEach((b, j) => { if (i < j && a.some((p) => b.some((q) => k(p) === k(q)))) cha[goc(i)] = goc(j); }));
  const luoi = (p) => { const i = day.findIndex((d) => d.some((q) => k(q) === k(p))); return i < 0 ? null : goc(i); };
  // chữ của lối vào, lối ra
  const nguon = new Map(), vao = [], chan = new Set();
  let ra = null;
  texts(svg).forEach((t) => {
    const x = +t.x, y = +t.y, trai = t["text-anchor"] === "end";
    const dau = day.flat().filter((p) => p[1] === y - 5 && p[0] === (trai ? x + 6 : x - 6));
    assert.equal(dau.length, 1, "chữ “" + t.t + "” đứng sát đúng một đầu dây");
    chan.add(k(dau[0]));
    if (trai) { assert.ok(/^[A-Z]$/.test(t.t) && !vao.includes(t.t), "lối vào của mạch: một chữ in hoa, không lặp"); nguon.set(luoi(dau[0]), { vao: t.t }); vao.push(t.t); }
    else { assert.ok(t.t === "Y" && ra === null, "lối ra của mạch: chữ Y"); ra = luoi(dau[0]); }
  });
  assert.ok(ra !== null, "mạch có lối ra Y");
  cong.forEach((g, i) => {
    const n = luoi(g.ra); assert.ok(n !== null && !nguon.has(n), "lối ra của cổng " + g.loai + " nối với một lưới dây chưa có nguồn"); nguon.set(n, { cong: i }); chan.add(k(g.ra));
    g.luoi = g.vao.map((p) => { const m = luoi(p); assert.ok(m !== null, "lối vào của cổng " + g.loai + " có dây nối"); chan.add(k(p)); return m; });
  });
  new Set(day.map((_, i) => goc(i))).forEach((n) => assert.ok(nguon.has(n), "lưới dây nào cũng có nguồn"));
  day.forEach((d) => d.forEach((p) => assert.ok(chan.has(k(p)) || day.filter((e) => e.some((q) => k(q) === k(p))).length >= 2, "đầu dây bỏ trống ở " + k(p))));
  const tinh = (n, gt, sau = 0) => { assert.ok(sau < 20, "mạch có vòng"); const s = nguon.get(n);
    if (s.vao) { assert.ok(s.vao in gt, "thiếu giá trị lối vào " + s.vao); return gt[s.vao]; }
    const g = cong[s.cong]; return CONG[g.loai](...g.luoi.map((m) => tinh(m, gt, sau + 1))); };
  daDoc.add(svg);
  return { vao: vao.slice().sort(), cong: cong.map((g) => g.loai), ham: (gt) => tinh(ra, gt) };
};
// hàm logic viết bằng chữ: biến là một chữ in hoa (gạch trên: Ā, B̄ là phủ định), “·” nhân logic, “+” cộng logic, ngoặc tròn; có thể mở đầu
// bằng “Y = ” → hàm (giá trị) → 0, 1
const docHam = (s) => {
  const t = String(s).normalize("NFD").trim().replace(/^[A-Z] = /, "");
  let i = 0;
  const bo = () => { while (t[i] === " ") i++; };
  const nguyenTo = () => { bo(); let f;
    if (t[i] === "(") { i++; f = cong_(); bo(); assert.equal(t[i], ")", "hàm logic thiếu ngoặc: " + s); i++; }
    else { const c = t[i]; assert.ok(/^[A-Z]$/.test(c || ""), "hàm logic viết sai: " + s); i++; f = (g) => { assert.ok(c in g, "thiếu giá trị " + c); return g[c]; }; }
    if (t[i] === "̄") { i++; const h = f; f = (g) => 1 - h(g); }
    return f; };
  const nhan_ = () => { let f = nguyenTo(); bo(); while (t[i] === "·") { i++; const a = f, b = nguyenTo(); f = (g) => a(g) & b(g); bo(); } return f; };
  const cong_ = () => { let f = nhan_(); bo(); while (t[i] === "+") { i++; const a = f, b = nhan_(); f = (g) => a(g) | b(g); bo(); } return f; };
  const f = cong_(); bo(); assert.equal(i, t.length, "hàm logic viết sai: " + s);
  return f;
};
// mọi tổ hợp giá trị của các biến; hai hàm giống nhau trên mọi tổ hợp
const toHop = (bien) => bien.reduce((ds, b) => ds.flatMap((d) => [0, 1].map((v) => Object.assign({}, d, { [b]: v }))), [{}]);
const giongNhau = (f, g, bien) => toHop(bien).every((d) => f(d) === g(d));
/* ---------- Công nghệ: Flip-Flop D, bộ đếm nhị phân đếm tiến (Bài 22) ----------
   Flip-Flop D: có xung CLK thì Q nhận giá trị của D (D = 1: đặt, D = 0: xoá), không có xung thì Q giữ nguyên. Bộ đếm n bit nối tiếp: mỗi
   xung FF0 đổi trạng thái; FF thứ i + 1 đổi trạng thái khi Q của FF thứ i chuyển từ 1 về 0. demTien(n, số xung) → [Q₀, Q₁, …] từ 0…0. */
const flipFlopD = (Q, xung) => xung.reduce((q, d) => d, Q);
const demTien = (n, xung) => { const q = Array(n).fill(0);
  for (let k = 0; k < xung; k++) for (let i = 0; i < n; i++) { const cu = q[i]; q[i] ^= 1; if (!(cu === 1 && q[i] === 0)) break; }
  return q; };
const giaTri = (q) => sum(q.map((b, i) => b * 2 ** i));

/* ---------- câu có phép tính, có hình, có đoạn mã, câu sắp xếp, câu tự luận ----------
   id: th1, th2 (Tin học Đề 1, 2), cn1, cn2 (Công nghệ Đề 1, 2); has: đoạn chữ của đề, đúng một câu trong kho. */
const motLuaChon = (q, ok) => { const c = q.o.filter(ok); assert.equal(c.length, 1, "đúng một lựa chọn đáp ứng yêu cầu, có " + c.length); return c[0]; };
// màu kiểu (có thể chưa định dạng) đúng màu tên t (tiếng Việt hay tên CSS)
const co = (v, t) => v !== undefined && cungMau(v, MAU_VIET[t] || t);
// chữ trong ngoặc kép của một lựa chọn (“Chỉ chữ “Trang chủ””, “Hai đoạn “A” và “B””)
const trongNgoac = (s) => [...String(s).matchAll(/“([^”]*)”/g)].map((x) => x[1]);
const CHECKS = [
  /* ===== Tin học, Đề 1 ===== */
  // Bài 13: chú thích trong CSS
  { id: "th1", has: "trình duyệt bỏ qua lời chú thích đó", right: (q) => motLuaChon(q, (o) => /^\/\*[^*]*\*\/$/.test(o) && docCss("p {color: red;} " + o + " h1 {color: blue;}").length === 2) },
  // Bài 13: CSS ngoài (thẻ link), CSS trong (thẻ style), CSS trực tiếp (thuộc tính style); thuộc tính style chỉ tác dụng với thẻ chứa nó
  { id: "th1", has: "Tệp “chung.css” chỉ có mẫu", right: (q) => { const ma = docKhung(q.svg), [ngoai, link, trong] = maTrong(q.q);
    const tao = (coLink) => { const g = docHtml("<html><head>" + (coLink ? link : "") + "<style>" + trong + "</style></head><body>" + ma + "</body></html>"); return { g, ap: apCss(g, { "chung.css": ngoai }) }; };
    const { g, ap } = tao(true);
    return q.o.map((s) => { let m;
      if ((m = /^Chữ “(.+?)” có màu (.+?) và cỡ (\d+) pixel\.$/.exec(s))) { const e = theoChu(g, m[1]); return co(ap.kieu(e, "color"), m[2]) && coChu(ap, e) === +m[3]; }
      if ((m = /^Chữ “(.+?)” có cỡ (\d+) pixel\.$/.exec(s))) return coChu(ap, theoChu(g, m[1])) === +m[2];
      if ((m = /^Tiêu đề “(.+?)” có màu (.+?)\.$/.exec(s))) return co(ap.kieu(theoChu(g, m[1]), "color"), m[2]);
      m = y(s, /^Nếu xoá thẻ link ở phần head thì chữ “(.+?)” vẫn có màu (.+?)\.$/); const k = tao(false); return co(k.ap.kieu(theoChu(k.g, m[1]), "color"), m[2]); }); } },
  // Bài 14: cỡ chữ theo pt (1 pt = 1/72 inch, 1 px = 1/96 inch)
  { id: "th1", has: "đặt cỡ chữ theo đơn vị point", right: (q) => { assert.ok(/1 pt = 1\/72 inch/.test(q.q) && /1 px = 1\/96 inch/.test(q.q), "đề cho cách đổi như sách");
    const g = trang(maTrong(q.q)[0], "<h2>Tin</h2>"); return coChu(apCss(g), tim(g, "h2")[0]); } },
  // Bài 15: tên màu không phân biệt chữ hoa, chữ thường
  { id: "th1", has: "Một bạn viết mẫu “h1 {color: Red;}”", right: (q) => { const [a, b] = maTrong(q.q).map((x) => docCss(x)[0].kb[0][1]);
    assert.ok(cungMau(a, b) && cungMau(a, "red"), "hai mẫu cùng màu đỏ"); return y(q.o[0], /^Hai mẫu như nhau: tên màu không phân biệt hoa, thường$/)[0]; } },
  // Bài 15: bộ chọn phần tử con trực tiếp
  { id: "th1", has: "Cho mẫu “nav > a {color: red;}”", right: (q) => { const [css, html] = maTrong(q.q), g = trang(css, html), ap = apCss(g);
    const do_ = tim(g, "a").filter((a) => co(ap.kieu(a, "color"), "đỏ")).map((a) => a.kids[0].text).sort().join("|");
    return motLuaChon(q, (o) => (/^Không chữ nào/.test(o) ? "" : trongNgoac(o).sort().join("|")) === do_); } },
  // Bài 15: màu xám (ba thành phần bằng nhau) sáng hơn
  { id: "th1", has: "đang có màu nền “#808080”", right: (q) => { const c0 = docMau(trongNgoac(q.q)[0]);
    return motLuaChon(q, (o) => { const c = docMau(o); return c[0] === c[1] && c[1] === c[2] && c[0] > c0[0]; }); } },
  // Bài 16: phần tử nội tuyến theo Bảng 16.1
  { id: "th1", has: "thẻ nào tạo phần tử nội tuyến giống như thẻ span", right: (q) => { q.o.slice(1).forEach((o) => assert.ok(KHOI_SACH.has(o), "lựa chọn sai là phần tử khối: " + o)); return motLuaChon(q, (o) => NOI_TUYEN_SACH.has(o)); } },
  // Bài 16: width không áp dụng cho phần tử nội tuyến, đường viền vẫn có
  { id: "th1", has: "Cho mẫu “.nhan {border: 1px solid red; width: 200px;}”", right: (q) => { const [css, html] = maTrong(q.q), g = trang(css, html), ap = apCss(g), sp = tim(g, "span")[0];
    const v = docVien(ap.kieu(sp, "border")); assert.ok(v.kieu === "solid" && cungMau(hex(v.mau), "red") && ap.kieu(sp, "width") === "200px", "mẫu đặt viền đỏ, chiều rộng 200px cho span");
    assert.ok(NOI_TUYEN_SACH.has("span") && ap.kieu(sp, "display") === undefined, "span vẫn là phần tử nội tuyến: width không có tác dụng");
    return y(q.o[0], /^Có viền đỏ, nhưng khung không rộng 200 pixel$/)[0]; } },
  // Bài 16: display: inline cho các mục li
  { id: "th1", has: "Muốn ba mục nằm trên cùng một hàng ngang", right: (q) => { const html = maTrong(q.q)[0];
    return motLuaChon(q, (o) => { const g = trang(o, html), ap = apCss(g), muc = tim(g, "div").slice(1); return muc.length === 3 && muc.every((d) => ap.kieu(d, "display") === "inline"); }); } },
  // Bài 17: trọng số của *
  { id: "th1", has: "kí hiệu * có giá trị trọng số bằng bao nhiêu", right: () => String(docChon("*").ts) },
  // Bài 17: !important đứng trên CSS trực tiếp, trọng số, vị trí
  { id: "th1", has: "Quy định nào luôn được dùng, bất kể trọng số", right: (q) => { const g = trang("p {color: green !important;} #a {color: red;}", '<p id="a" style="color: blue;">x</p>');
    assert.ok(co(apCss(g).kieu(tim(g, "p")[0], "color"), "xanh lá"), "!important thắng CSS trực tiếp, id, mẫu viết sau"); return motLuaChon(q, (o) => /!important/.test(o)); } },
  // Bài 17: trọng số của bộ chọn có thuộc tính, lớp giả
  { id: "th1", has: "Tính trọng số của bộ chọn “ul li a.moi:hover”", right: (q) => { coX(q, "10"); return docChon(trongNgoac(q.q)[0]).ts; } },
  // Bài 17: :hover thua bộ chọn có id dù viết sau
  { id: "th1", has: "Mỗi ý sau về màu chữ của các liên kết trong đoạn mã ở hình", right: (q) => { const g = trangMa(docKhung(q.svg)), ap = apCss(g);
    return q.o.map((s) => { let m;
      if ((m = /^Khi di chuột lên chữ “(.+?)”, chữ chuyển màu (.+?)\.$/.exec(s))) { const e = theoChu(g, m[1]); return co(ap.kieu(e, "color", diChuot(e)), m[2]); }
      m = y(s, /^Khi chưa di chuột lên, chữ “(.+?)” có màu (.+?)\.$/); return co(ap.kieu(theoChu(g, m[1]), "color"), m[2]); }); } },
  // Bài 17: mẫu thêm vào để :hover thắng bộ chọn có id
  { id: "th1", has: "Trang có mẫu “#thanh-menu a {color: white;}”", right: (q) => { const [cu, div, them] = maTrong(q.q), html = div + '<a href="#1">Trang chủ</a></div>';
    const vang = (css) => { const g = trang(cu + " " + css, html), a = tim(g, "a")[0]; return co(apCss(g).kieu(a, "color", diChuot(a)), "vàng"); };
    assert.ok(!vang(them), "mẫu vừa thêm chưa làm chữ chuyển vàng"); return motLuaChon(q, (o) => vang(o)); } },
  // Bài 17: hai tệp CSS ngoài, cùng trọng số thì mẫu ở vị trí cuối cùng
  { id: "th1", has: "kết nối hai tệp CSS ngoài: “co-ban.css”", right: (q) => { const [a, b] = maTrong(q.q), ngoai = { "co-ban.css": a, "mua-he.css": b };
    const mau = (dau, sau) => { const g = docHtml('<html><head><link href="' + dau + '" rel="stylesheet"><link href="' + sau + '" rel="stylesheet"></head><body><h1>Hè</h1></body></html>'); return apCss(g, ngoai).kieu(tim(g, "h1")[0], "color"); };
    assert.ok(co(mau("co-ban.css", "mua-he.css"), "cam") && co(mau("mua-he.css", "co-ban.css"), "navy"), "thứ tự thẻ link quyết định màu");
    return y(q.o[0], /^Thẻ link tới mua-he\.css đặt sau thẻ link tới co-ban\.css$/)[0]; } },
  // Bài 17: trọng số của bộ chọn tổ hợp, bộ chọn có id, xoá một mẫu
  { id: "th1", has: "tạo một hàng của bảng lịch hoạt động", right: (q) => { const ma = docKhung(q.svg), g = trangMa(ma), ap = apCss(g);
    return q.o.map((s) => { let m;
      if ((m = /^Chữ “(.+?)” có màu (.+?)\.$/.exec(s))) return co(ap.kieu(theoChu(g, m[1]), "color"), m[2]);
      if ((m = /^Ô “(.+?)” có nền (.+?)\.$/.exec(s))) return co(ap.kieu(theoChu(g, m[1]), "background-color"), m[2]);
      m = y(s, /^Nếu xoá mẫu “(.+?)” thì chữ “(.+?)” có màu (.+?)\.$/); assert.ok(ma.includes(m[1]), "mẫu bị xoá có trong đoạn mã");
      const g2 = trangMa(ma.replace(m[1], "")); return co(apCss(g2).kieu(theoChu(g2, m[2]), "color"), m[3]); }); } },
  // Bài 19: tự luận, tin tuyển kĩ thuật viên
  { id: "th1", has: "Một cửa hàng đăng tin tuyển kĩ thuật viên", essay: (q) => { coThang(q, "phần cứng", "phần mềm", "giao tiếp", "quản lí thời gian"); coX(q, "Bài gợi ý:", "Kĩ thuật sửa chữa, lắp ráp máy tính"); } },

  /* ===== Tin học, Đề 2 ===== */
  // Bài 13: cú pháp mẫu định dạng (ba lựa chọn sai ở SAI_CU_PHAP hoặc không là mã)
  { id: "th2", has: "Mẫu định dạng nào dưới đây viết đúng cú pháp của CSS", right: (q) => motLuaChon(q, (o) => hopLe(o) && laKhoiCss(o)) },
  // Bài 14: bỏ gạch chân, chữ đậm (text-decoration không kế thừa)
  { id: "th2", has: "đang có gạch chân theo mặc định của trình duyệt", right: (q) => motLuaChon(q, (o) => { const g = trang(o, '<nav><a href="#1">Tin</a></nav>'), ap = apCss(g), a = tim(g, "a")[0];
    return ap.kieu(a, "text-decoration") === "none" && ap.kieu(a, "font-weight") === "bold"; }) },
  // Bài 15: hsl() theo vòng tròn màu
  { id: "th2", has: "Màu “hsl(120, 100%, 50%)” là màu gì", right: (q) => { const c = docMau(trongNgoac(q.q)[0]); assert.deepEqual(c, [0, 255, 0], "hsl(120, 100%, 50%) là xanh lá cây tươi");
    return y(q.o[0], /^Xanh lá cây$/)[0]; } },
  // Bài 15: bộ chọn phần tử đứng sau cùng cha
  { id: "th2", has: "Cho mẫu “h2 ~ p {color: gray;}”", right: (q) => { const [css, html] = maTrong(q.q), g = trang(css, html), ap = apCss(g), P = tim(g, "p");
    const xam = P.filter((p) => co(ap.kieu(p, "color"), "xám")).map((p) => p.kids[0].text).sort().join("|");
    return motLuaChon(q, (o) => (/^Cả ba đoạn/.test(o) ? P.map((p) => p.kids[0].text) : trongNgoac(o)).sort().join("|") === xam); } },
  // Bài 15: tự luận, mẫu định dạng cho khung thông báo
  { id: "th2", has: "Trang “thong-bao.html”", essay: (q) => { coThang(q, "background-color: #FFFFE0;", "border: 2px solid orange;", "color: white;", "background-color: rgb(200, 0, 0);", "font-weight: bold;");
    const html = maTrong(q.q)[0], g = trang(maTrong(q.x).join(" "), html), ap = apCss(g), div = tim(g, "div")[0], h3 = tim(g, "h3")[0], P = tim(g, "p");
    const v = docVien(ap.kieu(div, "border"));
    assert.ok(co(ap.kieu(div, "background-color"), "#FFFFE0") && v.w === 2 && v.kieu === "solid" && cungMau(hex(v.mau), "orange"), "bài gợi ý: khung nền vàng nhạt, viền cam 2 pixel");
    assert.ok(co(ap.kieu(h3, "color"), "trắng") && co(ap.kieu(h3, "background-color"), "rgb(200, 0, 0)"), "bài gợi ý: tiêu đề chữ trắng nền đỏ");
    assert.ok(ap.kieu(P[0], "font-weight") === "bold" && ap.kieu(P[1], "font-weight") !== "bold", "bài gợi ý: chỉ đoạn ngay sau tiêu đề in đậm"); } },
  // Bài 16: border gộp border-width, border-style, border-color (lựa chọn viết sai ở SAI_CU_PHAP)
  { id: "th2", has: "cho đường viền giống hệt mẫu", right: (q) => { const goc_ = docVien(docCss(trongNgoac(q.q)[0])[0].kb[0][1]);
    return motLuaChon(q, (o) => { if (!hopLe(o)) return false; const g = trang(o, '<div class="the">x</div>'), ap = apCss(g), d = tim(g, "div")[0], w = ap.kieu(d, "border-width");
      return w !== undefined && docPx(w) === goc_.w && ap.kieu(d, "border-style") === goc_.kieu && co(ap.kieu(d, "border-color"), hex(goc_.mau)); }); } },
  // Bài 16: nền, chữ đậm, đường viền, vùng đệm (padding) cho một liên kết
  { id: "th2", has: "cần trông như một nút: nền vàng, chữ đậm", right: (q) => { const html = maTrong(q.q)[0];
    return motLuaChon(q, (o) => { const g = trang(o, html), ap = apCss(g), a = tim(g, "a")[0], b = ap.kieu(a, "border"), v = b && docVien(b);
      return co(ap.kieu(a, "background-color"), "vàng") && ap.kieu(a, "font-weight") === "bold" && ap.kieu(a, "padding") === "8px" && !!v && v.w === 1 && v.kieu === "solid" && cungMau(hex(v.mau), "blue"); }); } },
  // Bài 17: thành phần có giá trị trọng số bằng một lớp
  { id: "th2", has: "thành phần nào dưới đây có giá trị bằng giá trị của một lớp", right: (q) => motLuaChon(q, (o) => docChon(y(o, /như (\S+)$/)[1]).ts === docChon(".a").ts) },
  // Bài 17: :visited và :hover cùng trọng số, mẫu viết sau thắng
  { id: "th2", has: "đứng trước mẫu “a:hover {color: orange;}”", right: (q) => { const g = trang(maTrong(q.q).join(" "), '<a href="#1">Tin</a>'), a = tim(g, "a")[0];
    return tenMau(apCss(g).kieu(a, "color", diChuot(a, { visited: new Set([a]) }))); } },
  // Bài 17: lớp giả, phần tử giả, trọng số
  { id: "th2", has: "Mỗi ý sau về các bộ chọn có lớp giả, phần tử giả", right: (q) => q.o.map((s) => { let m;
    if ((m = /^Trong bộ chọn “(.+?)”, phần “(.+?)” là một (lớp giả|phần tử giả)\.$/.exec(s))) { const d = docChon(m[1]).don.slice(-1)[0], t = m[2].replace(/^:+/, "");
      return m[3] === "lớp giả" ? /^:[^:]/.test(m[2]) && d.gia.includes(t) : /^::/.test(m[2]) && d.pt.includes(t); }
    m = y(s, /^Bộ chọn “(.+?)” có trọng số (\d+)\.$/); return docChon(m[1]).ts === +m[2]; }) },
  // Bài 17: sắp xếp theo trọng số
  { id: "th2", has: "Sắp xếp các bộ chọn sau theo trọng số từ nhỏ đến lớn", right: (q) => { const ts = q.o.map((o) => docChon(o).ts); assert.equal(new Set(ts).size, ts.length, "các trọng số khác nhau");
    return q.o.slice().sort((a, b) => docChon(a).ts - docChon(b).ts); } },
  // Bài 17: hai lớp của một phần tử, mẫu viết trước có trọng số lớn hơn
  { id: "th2", has: "Thẻ style có mẫu “.tinh-trang {color: green;}” viết ở cuối cùng", right: (q) => { const [cuoi, html] = maTrong(q.q);
    return motLuaChon(q, (o) => { const g = trang(o + " " + cuoi, html); return co(apCss(g).kieu(tim(g, "span")[0], "color"), "đỏ"); }); } },
  // Bài 17: trọng số của mẫu có sẵn và mẫu thêm vào
  { id: "th2", has: "Trang có mẫu “#khuyen-mai span {color: gray;}”", right: (q) => { const [cu, html] = maTrong(q.q);
    const do_ = (css) => { const g = trang(css, html); return co(apCss(g).kieu(tim(g, "span")[0], "color"), "đỏ"); };
    return q.o.map((s) => { let m;
      if ((m = /^Thêm vào cuối thẻ style mẫu “(.+?)” là đạt\.$/.exec(s))) return do_(cu + " " + m[1]);
      m = y(s, /^Sửa mẫu có sẵn thành “(.+?)” rồi thêm “(.+?)” vào cuối thẻ style là đạt\.$/); return do_(m[1] + " " + m[2]); }); } },
  // Bài 17: :hover ở phần tử cha (di chuột lên chữ “Giá tốt”, chỉ tiêu đề đổi màu)
  { id: "th2", has: "Mỗi ô sản phẩm có mã", right: (q) => { const html = maTrong(q.q)[0];
    return motLuaChon(q, (o) => { const g = trang(o, html), ap = apCss(g), h3 = tim(g, "h3")[0], p = tim(g, "p")[0], chuot = diChuot(p);
      return co(ap.kieu(h3, "color", chuot), "cam") && !co(ap.kieu(p, "color", chuot), "cam") && !co(ap.kieu(h3, "color"), "cam"); }); } },

  /* ===== Công nghệ, Đề 1 ===== */
  // Bài 15: mã ba chữ số của tụ điện, đơn vị pF
  { id: "cn1", has: "chỉ in ba chữ số “223”", right: (q) => { const m = y(trongNgoac(q.q)[0], /^(\d)(\d)(\d)$/); return +(m[1] + m[2]) * 10 ** +m[3]; } },
  // Bài 18: hệ số khuếch đại A = U_ra : U_vào
  { id: "cn1", has: "Một mạch khuếch đại điện áp nhận tín hiệu vào có biên độ", right: (q) => { const [, a, b] = q.q.split("có biên độ"); return lam(doLuong(b, "V") / doLuong(a, "V"), 6); } },
  // Bài 19: mạch khuếch đại không đảo G = 1 + R2 : R1
  { id: "cn1", has: "Mạch khuếch đại không đảo dùng khuếch đại thuật toán có R1", right: (q) => { const R1 = doLuong(q.q.split("R1 =")[1], "Ω"), R2 = doLuong(q.q.split("R2 =")[1], "Ω"), Uv = so(q.q, "Điện áp vào là # V")[0];
    return lam(khongDaoK(R1, R2) * Uv, 6); } },
  // Bài 21: kí hiệu cổng logic
  { id: "cn1", has: "Hình bên là kí hiệu của cổng logic nào?", right: (q) => { const h = docMach(q.svg); assert.equal(h.cong.length, 1, "hình có một cổng"); return "Cổng " + h.cong[0]; } },
  // Bài 21: mạch ghép ba cổng, bảng chân lí; hàm logic ở lời giải khớp mạch
  { id: "cn1", has: "Cho mạch logic trong hình. Mỗi ý sau đúng hay sai?", right: (q) => { const h = docMach(q.svg), bien = h.vao;
    assert.ok(giongNhau(h.ham, docHam(y(q.x, /nên Y = (.+?)\. a\)/)[1]), bien), "hàm logic ở lời giải khớp mạch trong hình");
    const SO_CHU = { "một": 1, "hai": 2, "ba": 3, "bốn": 4, "năm": 5 };
    return q.o.map((s) => { let m;
      if ((m = /^Khi A = (\d), B = (\d), C = (\d) thì Y = (\d)\.$/.exec(s))) return h.ham({ A: +m[1], B: +m[2], C: +m[3] }) === +m[4];
      m = y(s, /^Có đúng (\S+) tổ hợp của A, B, C làm Y = 1\.$/); return toHop(bien).filter((d) => h.ham(d) === 1).length === SO_CHU[m[1]]; }); } },
  // Bài 21: khoảng bit T_b = 1 : R
  { id: "cn1", has: "có tốc độ bit R = 2 000 bit/s", right: (q) => lam(1000 / so(q.q, "R = # bit/s")[0], 6) },
  // Bài 21: hàm logic theo yêu cầu (ít nhất một cảm biến báo, công tắc chính bật)
  { id: "cn1", has: "Đèn cảnh báo của một kho hàng sáng", right: (q) => motLuaChon(q, (o) => giongNhau(docHam(o), (g) => (g.A | g.B) & g.K, ["A", "B", "K"])) },
  // Bài 22: Flip-Flop D
  { id: "cn1", has: "Một Flip-Flop D đang có Q = 0", right: (q) => { const Q = so(q.q, "đang có Q = #")[0];
    return q.o.map((s) => { let m;
      if ((m = /^Khi có xung CLK tác dụng mà D = (\d) thì Q chuyển thành (\d)\.$/.exec(s))) return flipFlopD(Q, [+m[1]]) === +m[2];
      if ((m = /^Khi chưa có xung CLK, D đổi từ (\d) sang (\d) thì Q chuyển ngay thành (\d)\.$/.exec(s))) return flipFlopD(Q, []) === +m[3];
      if ((m = /^Sau một xung CLK với D = (\d), có thêm một xung CLK với D = (\d) thì Q trở về (\d)\.$/.exec(s))) return flipFlopD(Q, [+m[1], +m[2]]) === +m[3];
      y(s, /^Lối ra Q̄ luôn cùng trạng thái với lối ra Q\.$/); return null; }); } },
  // Bài 22: tự luận, mạch so sánh A > B theo bốn bước thiết kế mạch logic tổ hợp
  { id: "cn1", has: "Em hãy thiết kế mạch so sánh hai số nhị phân 1 bit A, B có lối ra G = 1 khi A > B", essay: (q) => { coThang(q, "G = A · B̄", "NOT", "AND");
    const hang = [...q.x.matchAll(/A = (\d), B = (\d): G = (\d)/g)]; assert.equal(hang.length, 4, "bảng chân lí đủ bốn tổ hợp");
    hang.forEach((h) => assert.equal(+h[3], +h[1] > +h[2] ? 1 : 0, "bảng chân lí của bài gợi ý đúng yêu cầu"));
    assert.ok(giongNhau(docHam(y(q.x, /nên G = (.+?)\. \(3\)/)[1]), (g) => (g.A > g.B ? 1 : 0), ["A", "B"]), "hàm logic của bài gợi ý đúng yêu cầu"); } },
  // Bài 24: số lần chạy vòng lặp theo tần số xung nhịp
  { id: "cn1", has: "Một vòng lặp của chương trình gồm 4 câu lệnh", right: (q) => (so(q.q, "tần số # MHz")[0] * 1e6) / (so(q.q, "gồm # câu lệnh")[0] * so(q.q, "cần # xung nhịp")[0]) },
  // Bài 24: bus địa chỉ n dây: 2ⁿ địa chỉ
  { id: "cn1", has: "Bus địa chỉ của một vi điều khiển gồm", right: (q) => vn(2 ** so(q.q, "gồm # dây dẫn")[0]) },
  // Bài 25: các bước lập trình cho vi điều khiển (Hình 25.7)
  { id: "cn1", has: "Sắp xếp các bước đưa một chương trình vào vi điều khiển", right: (q) => { const BUOC = ["Viết mã nguồn", "Biên dịch", "Truyền mã máy", "Nạp mã máy"];
    assert.ok(q.o.every((o) => BUOC.some((b) => o.startsWith(b))), "ô của câu sắp xếp là các bước lập trình"); return BUOC.map((b) => q.o.find((o) => o.startsWith(b))); } },

  /* ===== Công nghệ, Đề 2 ===== */
  // Bài 15: vạch màu, hệ số nhân màu bạc
  { id: "cn2", has: "Một điện trở nhỏ có 4 vạch màu", right: (q) => docVongMau(mauCua(y(q.q, /đọc từ trái sang phải: (.+?)\. /)[1])).R },
  // Bài 16: β = I_C : I_B
  { id: "cn2", has: "Hệ số khuếch đại dòng β", right: (q) => lam(so(q.q, "I_C = # mA")[0] / so(q.q, "I_B = # mA")[0], 6) },
  // Bài 16: dòng điện collector định mức lớn hơn dòng làm việc
  { id: "cn2", has: "Nên chọn transistor có dòng điện collector định mức nào", right: (q) => { const I = so(q.q, "dòng điện làm việc # mA")[0]; return motLuaChon(q, (o) => so(o, "# mA")[0] > I); } },
  // Bài 18: biên độ ra = A × biên độ vào
  { id: "cn2", has: "Một mạch khuếch đại điện áp có hệ số khuếch đại A = 40", right: (q) => { const A = so(q.q, "A = #")[0], Uv = so(q.q, "có biên độ # mV")[0] / 1000;
    return q.o.map((s) => { let m;
      if ((m = /^Tín hiệu ra có biên độ (.+?) V\.$/.exec(s))) return gan(A * Uv, val(m[1]));
      m = y(s, /^Muốn tín hiệu ra có biên độ (.+?) V thì tín hiệu vào phải có biên độ (.+?) mV\.$/); return gan((val(m[1]) / A) * 1000, val(m[2])); }); } },
  // Bài 19: mạch khuếch đại đảo G = −R2 : R1
  { id: "cn2", has: "Cần hệ số khuếch đại G = −15", right: (q) => { const R1 = doLuong(q.q.split("R1 =")[1], "Ω"), G = so(q.q, "G = #")[0]; return motLuaChon(q, (o) => gan(daoK(R1, doLuong(o, "Ω")), G)); } },
  // Bài 21: kí hiệu cổng logic
  { id: "cn2", has: "Hình bên vẽ kí hiệu của cổng logic nào?", right: (q) => { const h = docMach(q.svg); assert.equal(h.cong.length, 1, "hình có một cổng"); return "Cổng " + h.cong[0]; } },
  // Bài 21: bảng chân lí của các cổng với cùng hai lối vào
  { id: "cn2", has: "Hai lối vào của mỗi cổng logic dưới đây đều có", right: (q) => { const [, a, b] = y(q.q, /x₁ = (\d), x₂ = (\d)/).map(Number);
    return q.o.map((s) => { const m = y(s, /^Lối ra của cổng (\w+) bằng (\d)\.$/); return CONG[m[1]](a, b) === +m[2]; }); } },
  // Bài 21: mạch NOT – AND trong hình
  { id: "cn2", has: "Cho mạch logic trong hình. Lối ra Y bằng 1 khi nào?", right: (q) => { const h = docMach(q.svg);
    assert.ok(giongNhau(h.ham, docHam(y(q.x, /nên Y = (.+?)\. /)[1]), h.vao), "hàm logic ở lời giải khớp mạch trong hình");
    assert.equal(toHop(h.vao).filter((d) => h.ham(d) === 1).length, 1, "chỉ một tổ hợp làm Y = 1");
    return motLuaChon(q, (o) => { let m = /^Khi A ở mức (\d) và B ở mức (\d)$/.exec(o); if (!m) { const c = y(o, /^Khi cả A và B ở mức (\d)$/); m = [o, c[1], c[1]]; } return h.ham({ A: +m[1], B: +m[2] }) === 1; }); } },
  // Bài 21: tự luận, kho lạnh hai cửa (AND, NAND)
  { id: "cn2", has: "Một kho lạnh có hai cửa", essay: (q) => { coThang(q, "Y = A · B", "AND", "NAND");
    const hang = [...q.x.matchAll(/A = (\d), B = (\d): Y = (\d), Z = (\d)/g)]; assert.equal(hang.length, 4, "bảng chân lí đủ bốn tổ hợp");
    hang.forEach((h) => { const [A, B, Y, Z] = h.slice(1).map(Number); assert.ok(Y === (A & B) && Z === ((1 - A) | (1 - B)), "bảng chân lí của bài gợi ý đúng yêu cầu (máy nén chạy khi hai cửa đóng, đèn sáng khi có cửa mở)"); });
    assert.ok(giongNhau(docHam(y(q.x, /nên Y = (.+?), dùng một cổng AND/)[1]), (g) => g.A & g.B, ["A", "B"]), "Y = A · B");
    assert.ok(hang.every((h) => +h[4] === CONG.NAND(+h[1], +h[2])), "Z là hàm NAND"); } },
  // Bài 22: bộ đếm nhị phân 2 bit
  { id: "cn2", has: "Bộ đếm nhị phân 2 bit dùng hai Flip-Flop D đếm tiến", right: (q) => q.o.map((s) => { let m;
    if ((m = /^Sau (\d+) xung, (?:bộ đếm trở về )?Q₁Q₀ = ([01])([01])\.$/.exec(s))) { const d = demTien(2, +m[1]); return d[1] === +m[2] && d[0] === +m[3]; }
    if ((m = /^Sau (\d+) xung, giá trị thập phân của bộ đếm là (\d+)\.$/.exec(s))) return giaTri(demTien(2, +m[1])) === +m[2];
    m = y(s, /^Sau (\d+) xung, Q([₀₁]) = (\d)\.$/); return demTien(2, +m[1])["₀₁".indexOf(m[2])] === +m[3]; }) },
  // Bài 22: bộ đếm nhị phân 3 bit
  { id: "cn2", has: "Ghép ba Flip-Flop D thành bộ đếm nhị phân 3 bit", right: (q) => { assert.ok(/đếm từ 0 đến 7/.test(q.q)); return giaTri(demTien(3, so(q.q, "Sau # xung")[0])); } },
  // Bài 24: thời gian chạy theo tần số xung nhịp
  { id: "cn2", has: "Một đoạn chương trình cần 300 xung nhịp", right: (q) => lam((so(q.q, "cần # xung nhịp")[0] / (so(q.q, "tần số # MHz")[0] * 1e6)) * 1e6, 6) }
];
// lựa chọn sai của câu tìm mẫu viết đúng cú pháp, câu tìm mẫu cùng đường viền
const SAI_CU_PHAP = new Set(["h3 {color = olive; text-align = right;}", "h3 {color: olive, text-align: right,}", ".the {border-color: 3px; border-style: dashed; border-width: green;}"]);
// tên nhân vật của sách Tin học 12 (Bài 5, Bài 9); Bài 13–21 và sách Công nghệ 12 không đặt tên nhân vật
const TEN_SACH = /Hoàng Mỹ|(?:Thầy|Cô) (?:Khải|Lan|Vũ|Hoàng|Đức|Thắng|Bích)(?![\p{L}])/u;

/* ---------- chạy kiểm tra ---------- */
let n = 0;
const daKiem = new Set();
CHECKS.forEach((c) => {
  const m = MON.find((x) => c.id.startsWith(x.ki)), cau = m.kho.filter((q) => q.q.includes(c.has) && (!c.hinh || (q.svg && c.hinh(q.svg))));
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
        assert.ok(gan(q.ans, want), "đáp án " + q.ans + ", tính được " + want);
        assert.ok(Math.abs(q.ans * 100 - Math.round(q.ans * 100)) < 1e-9, "đáp án quá hai chữ số thập phân");
        assert.ok(q.tol === undefined, "đáp án chính xác (đề dặn cách làm tròn), không cần sai số");
      } else if (q.type === "tf4") {
        assert.ok(Array.isArray(want) && want.length === 4, "câu đúng/sai 4 ý: right trả mảng 4 ý");
        assert.ok(want.filter((w) => w !== null).length >= 2, "câu đúng/sai 4 ý: tính lại ít nhất hai ý");
        want.forEach((w, i) => w === null || assert.strictEqual(q.a[i], w, "ý " + "abcd"[i] + ": đáp án " + q.a[i] + ", tính được " + w));
      } else if (q.type === "order") {
        assert.deepEqual(q.o, want, "thứ tự " + JSON.stringify(q.o) + ", tính được " + JSON.stringify(want));
      } else if (q.type === "match") {
        assert.deepEqual(q.l.map((l, k) => [l, q.r[k]]), want, "cặp nối " + JSON.stringify(q.l.map((l, k) => [l, q.r[k]])) + ", tính được " + JSON.stringify(want));
      } else {
        assert.strictEqual(q.o[0], want, "đáp án " + q.o[0] + ", tính được " + want); assert.ok(!q.o.slice(1).includes(want), "nhiễu trùng đáp án đúng");
      }
    }
  } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
  daKiem.add(q); n++;
});
// câu trả lời bằng số, câu có hình, câu sắp xếp, câu nối, câu tự luận nào cũng phải được tính lại, đọc lại ở trên; mọi đoạn mã HTML, CSS
// trong câu Tin học (trong ngoặc kép “…”, hoặc lựa chọn là một đoạn mã) đúng cú pháp, trừ lựa chọn sai của câu tìm chỗ viết sai (SAI_CU_PHAP)
MON.forEach((m) => m.kho.filter((q) => q.svg || ["num", "essay", "order", "match"].includes(q.type)).forEach((q) => assert.ok(daKiem.has(q), "chưa có kiểm tra cho câu " + ten.get(q) + ": " + q.q.slice(0, 60))));
MON.forEach((m) => m.kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + ten.get(q))));
{
  let dem = 0;
  TH.kho.forEach((q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], (q.rubric || []).map((c) => c.c)).forEach((s) => maTrong(s).forEach((ma) => {
    if (SAI_CU_PHAP.has(ma)) return;
    try { docDoan(ma); dem++; } catch (e) { assert.fail(ten.get(q) + ": đoạn mã viết sai (" + e.message + "): " + ma); }
  })));
  assert.ok(dem >= 30, "Tin học: ít nhất 30 đoạn mã được đọc lại, có " + dem);
  n += dem;
}

/* ---------- chữ ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], q.type === "fill" ? q.ans : [], q.unit || [], (q.rubric || []).map((c) => c.c)).map(String);
const chuHinh = (q) => (q.svg ? texts(q.svg).map((t) => t.t) : []);
MON.forEach((m) => m.kho.forEach((q) => chu(q).forEach((s) => {
  const at = ten.get(q) + ": " + q.q.slice(0, 50) + " → ";
  // dấu thanh kiểu sách (hoá, hoà, khoẻ, tuỳ, thuỷ, kĩ, lí)
  assert.ok(!/(?<![\p{L}])(?:hóa|hòa|khỏe|tùy|thỏa|thủy|tỏa|hủy|họa|lũy|xóa|kỹ|lý)(?![\p{L}])/iu.test(s), at + "viết như sách (hoá, hoà, khoẻ, tuỳ, thoả, thuỷ, kĩ, lí): " + s);
  // số ngăn hàng nghìn bằng khoảng trắng (năm viết liền), dấu phẩy thập phân; trong đoạn mã, mã màu, tên tệp, tên transistor (B1132) thì
  // giữ nguyên
  const ngoai = s.replace(/“[^”]*”/g, " ").replace(/#[0-9A-Fa-f]{6}\b/g, " ").replace(/(?<![\p{L}\d])[A-D]\d{3,4}(?![\p{L}\d])/gu, " ").replace(/[\w-]+\.(?:html|htm|css|png|jpg)\b/g, " ");
  if (!laMa(s)) assert.ok(!/\d{5,}|\d\.\d/.test(ngoai) && [...ngoai.matchAll(/(?<![\d,])\d{4}(?![\d,])/g)].every((x) => /^(19|20)\d\d$/.test(x[0])), at + "số viết sai cách: " + s);
  // lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án
  assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(s), at + "nhắc vị trí của phương án: " + s);
  // tên nhân vật của sách không dùng làm tên trong đề
  assert.ok(!TEN_SACH.test(s), at + "tên nhân vật của sách: " + s);
})));

/* ---------- lời dặn, mức độ, ma trận ---------- */
MON.forEach((m) => {
  const M = m.M, cells = Object.values(M), CHU_DE = m.CHU_DE, soBai = Object.fromEntries(m.BAI);
  assert.ok(m.kho.every((q) => [1, 2, 3].includes(q.lv)), m.ma + ": câu nào cũng cần lv");
  assert.ok(cells.every(Array.isArray), m.ma + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], m.ma + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.equal(sum(cells.map(sum)), m.pool.n, m.ma + ": tổng ma trận bằng n");
  assert.ok(cells.every((v) => sum(v) >= 1), m.ma + ": chủ đề nào cũng có câu");
  assert.deepEqual(Object.keys(M), CHU_DE, m.ma + ": chủ đề theo tên bài, thứ tự bài của sách");
  CHU_DE.forEach((t) => assert.ok(("chu-de:12:" + m.ma + ":" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
  // mọi bài trong phạm vi có chủ đề, trừ bài thực hành, hội thảo
  for (let b = m.TU; b <= m.DEN; b++) assert.ok(m.KHONG.includes(b) !== m.BAI.some((x) => x[1] === b), m.ma + ": Bài " + b + " có chủ đề riêng khi không là bài thực hành, hội thảo");
  // chủ đề có ở kho giữa kì II đúng chữ của kho đó (CU); chủ đề mới không trùng kho giữa kì II; không chủ đề nào trùng kho cuối kì I
  CHU_DE.forEach((t) => { assert.equal(!!m.gk2M[t], m.CU.includes(t), m.ma + ": chủ đề " + t + " so với kho giữa kì II"); assert.ok(!m.ck1M[t], m.ma + ": chủ đề trùng kho cuối kì I: " + t); });
  // phần trọng tâm nhiều câu hơn phần ôn
  const dem_ = ([tu, den]) => sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t])));
  assert.ok(dem_(m.TAM) > dem_(m.ON), m.ma + ": phần trọng tâm (" + dem_(m.TAM) + " câu) nhiều hơn phần ôn (" + dem_(m.ON) + " câu)");
  m.DE.forEach((id) => {
    const qs = m.kho.filter((q) => q.src === id);
    assert.deepEqual([...new Set(qs.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, đúng thứ tự");
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t));
    // lời dặn: sách, phạm vi, số câu mỗi phần (tính từ ma trận), bài không có câu riêng, trường học khác phạm vi, câu về đề chung của Sở
    const note = bank(id).note;
    assert.equal(note, bank(m.DE[0]).note, id + ": hai đề cùng lời dặn");
    assert.ok(note.startsWith(m.dau + " " + m.DAU), id + ": lời dặn mở đầu bằng sách, phạm vi");
    m.CHUONG.forEach((c) => assert.ok(note.includes(c), id + ": lời dặn ghi " + c));
    m.PHAN.forEach(([p, tu, den]) => { const k = dem_([tu, den]); assert.ok(note.includes(p + " " + k + " câu"), id + ": lời dặn ghi “" + p + " " + k + " câu”"); });
    assert.equal(sum(m.PHAN.map(([, tu, den]) => dem_([tu, den]))), m.pool.n, m.ma + ": các phần của lời dặn phủ hết ma trận");
    m.SAU.forEach((s) => assert.ok(note.includes(s), id + ": lời dặn có “" + s + "”"));
    assert.ok(note.endsWith("Có lời giải từng câu. " + SO), id + ": lời dặn kết thúc bằng câu về đề chung của Sở");
  });
  // chủ đề đúng tên bài trong mục lục (README của cuốn ở OnUp-Book); bài không có chủ đề riêng là bài thực hành, hội thảo; tên chủ đề, chương
  // của lời dặn đúng mục lục; bài cuối phần riêng của hai định hướng Tin học đúng như lời dặn ghi
  m.sachCo.forEach((sach) => {
    const readme = path.join(BOOK, "lop-12", sach, "README.md");
    if (!fs.existsSync(readme)) return;
    const md = fs.readFileSync(readme, "utf8"), ml = Object.fromEntries([...md.matchAll(/Bài (\d+)[.:] ([^|*·]+?) \|/g)].map((x) => [+x[1], x[2].trim()]));
    m.BAI.forEach(([t, b]) => assert.equal(t, ml[b], m.ma + ": tên Bài " + b + " theo mục lục của " + sach));
    m.KHONG.forEach((b) => assert.ok(/^(?:Thực hành|Hội thảo)/.test(ml[b]), m.ma + ": Bài " + b + " (" + ml[b] + ") không có chủ đề riêng"));
    m.CHUONG.forEach((p) => { const c = /^(Chủ đề|Chương) (\d+|[IVX]+) (.+?) \($/.exec(p); assert.ok(c, "tên trong lời dặn: " + p);
      assert.ok(md.includes("**" + c[1] + " " + c[2] + ". " + c[3] + "**") || md.includes("**" + c[1] + " " + c[2] + ". " + c[3].toUpperCase() + "**"), m.ma + ": tên " + c[1] + " " + c[2] + " theo mục lục của " + sach); });
    const r = m.RIENG.find((x) => x[0] === sach);
    if (r) assert.ok(ml[r[1]] && !ml[r[1] + 1], m.ma + ": " + sach + " kết thúc ở Bài " + r[1]);
  });
  // dạng câu theo khung Công văn 7991: nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn (số), tự luận tự chấm; sắp xếp như các kho Tin học, Công nghệ
  assert.ok(m.kho.every((q) => ["mc", "tf4", "num", "essay", "match", "order"].includes(q.type)), m.ma + ": dạng câu");
  const dem = (f) => m.kho.filter(f).length;
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
  m.kho.filter((q) => q.type === "essay").forEach((q) => assert.ok(/Em hãy/.test(q.q), "câu tự luận có lời dặn “Em hãy…”: " + ten.get(q)));
  // câu nối có ô thừa; câu sắp xếp 4–5 ô
  m.kho.filter((q) => q.type === "match").forEach((q) => assert.ok(q.r.length > q.l.length && q.l.length >= 3, "câu nối có ít nhất 3 cặp và ô thừa: " + ten.get(q)));
  m.kho.filter((q) => q.type === "order").forEach((q) => assert.ok(q.o.length >= 4 && q.o.length <= 5, "câu sắp xếp 4–5 ô: " + ten.get(q)));
  // câu nhiều lựa chọn: đáp án đúng không dài hơn hẳn lựa chọn sai, các lựa chọn không trùng nhau, đáp án đúng không là lựa chọn duy nhất có
  // chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), mc = m.kho.filter((q) => q.type === "mc");
  mc.forEach((q) => {
    const L = Math.max(...q.o.slice(1).map((o) => o.length));
    assert.ok(q.o.length === 4 && q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q) + " " + q.q.slice(0, 50));
    assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 50));
    const c = chuThuong(q.topic), tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|sau|từ|đến|năm|một|vào)( |$)/u.test(w));
    tu.forEach((w) => { const co_ = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); assert.ok(!(co_[0] && !co_.slice(1).some(Boolean)), `chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề: ${ten.get(q)} ${q.q.slice(0, 60)}`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    assert.ok(!(dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”: " + ten.get(q));
  });
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, và không dưới một phần sáu
  const le = mc.filter((q) => { const L = q.o.map((o) => o.length); return L[0] > Math.max(...L.slice(1)) || L[0] < Math.min(...L.slice(1)); });
  assert.ok(le.length * 3 <= mc.length && le.length * 6 >= mc.length, `${m.ma}: đáp án đúng dài nhất hoặc ngắn nhất ở ${le.length}/${mc.length} câu: ` + le.map((q) => ten.get(q)).join(", "));
  m.le = le.length + "/" + mc.length;

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
  // đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng
  const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ""), deBai = m.kho.concat(m.gk2, m.ck1).map((q) => ({ at: ten.get(q), k: goc(q.q) }));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
});

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Đề ngẫu nhiên rút câu ở mọi ô, đề “Ôn chủ đề” rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi cặp câu cùng môn, trừ cặp có
   câu tự luận nằm cùng một ô rút 1 câu; lời dặn (note) hiện ở màn mở đề nên cũng xét. Đề “Ôn chủ đề” của các chủ đề có ở kho giữa kì II
   rút chung câu của kho này và kho đó, nên xét thêm mọi cặp câu cùng chủ đề của hai kho (trừ tự luận). Đáp án là số (trả lời ngắn, lựa chọn
   đúng dạng “4 096”, “150 kΩ”; từ hai chữ số, hoặc số thập phân) tìm ở vị trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”,
   “được”, “đạt”; không tính số đứng trước một phép tính) cùng đơn vị: không được có. Đáp án bằng chữ (lựa chọn đúng của câu nhiều lựa chọn)
   tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có trong đề bài, lựa chọn, lời giải, chữ trong
   hình của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM, DA_XEM_CHU_DE. Ô của câu sắp xếp: hai ô liền nhau theo đúng
   thứ tự có ở câu sắp xếp kia thì in ra để xem tay. */
// chuỗi 3 từ chung của môn (thuật ngữ, tên thuộc tính, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["a hover {color", "{color red }", "{color orange }", "{color yellow }", "font weight bold", "weight bold }", "{display inline }",
  "phần tử cha", "một phần tử", "trong một phần", "color green }", "{background color yellow", "sửa chữa lắp", "chữa lắp ráp", "lắp ráp máy", "ráp máy tính",
  "lắp đặt thiết", "đặt thiết bị", "có biên độ", "ngành công nghệ", "công nghệ thông", "nghệ thông tin", "nghề sửa chữa", "tín hiệu vào", "y = a", "mẫu định dạng", "thiết bị điện", "bị điện tử", "transistor lưỡng cực", "giá trị điện", "trị điện trở", "mạch tích hợp",
  "vi điều khiển", "vào vi điều", "của vi điều", "dòng điện một", "điện một chiều", "dòng điện xoay", "điện xoay chiều", "mức điện áp", "tín hiệu lối",
  "hiệu lối vào", "hiệu lối ra", "với tín hiệu", "của tín hiệu", "khuếch đại thuật", "đại thuật toán", "bộ xử lí", "xử lí trung", "lí trung tâm",
  "máy tính và", "mạng máy tính", "hệ thống máy", "thống máy tính", "của tổ chức", "lối ra của"]);
const DON_VI = "(?:kΩ|MΩ|Ω|µH|mH|µF|pF|mV|V|mA|A|kHz|MHz|Hz|µs|ms|s|px|pt|%|lần|bit\\/s)";
const soDV = new RegExp("^(" + NUM + ")(?: ?(" + DON_VI + "))?$", "u");
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được|đạt))\\s+(" + NUM + ")(?![\\d,⁰¹²³⁴⁵⁶⁷⁸⁹])(?!\\s*[·+−:×](?:\\s|\\d|\\())(?: ?\\(?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => ({ v: val(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const NOTES = MON.flatMap((m) => [...new Set(m.DE.map((id) => bank(id).note))].map((s, i) => { const o = { q: s, x: "", topic: "lời dặn", type: "note", lv: 0 }; ten.set(o, "lời dặn " + m.ma + (i ? i + 1 : "")); return o; }));
const doLo = (qs, M, tenCau, them = [], cap = () => true) => {
  const lo = [], chuLo = [], cungLuc = (p, q) => p !== q && (p.type === "note" || p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2);
  qs.forEach((q) => {
    let soDa = [], C = [];
    if (q.type === "num") soDa = [{ v: q.ans, u: q.unit || "" }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: val(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]); C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)]; } }
    else if (q.type === "order") C = q.o.slice(1).map((o, i) => [q.o[i], o]);
    soDa = soDa.filter((d) => Math.abs(d.v) >= 10 || !Number.isInteger(d.v));
    qs.concat(them).forEach((p) => {
      if (!cungLuc(p, q) || !cap(p, q)) return;
      const at = `${tenCau(p)} → ${tenCau(q)}: `, chuP = chu(p).concat(chuHinh(p)), T = " " + chuP.map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chuP.flatMap(kqSo).some((yy) => gan(yy.v, d.v) && (!yy.u || !d.u || yy.u === d.u))).forEach((d) => lo.push(at + vn(d.v) + " " + d.u));
      if (q.type === "order") { if (p.type === "order") C.forEach(([a, b]) => { const i = p.o.indexOf(a); if (i >= 0 && p.o[i + 1] === b) chuLo.push(at + a + " → " + b); }); return; }
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
const lo = [], chuLo = [], loCD = [], chuLoCD = [];
MON.forEach((m) => {
  const r = doLo(m.kho, m.M, (q) => ten.get(q), NOTES.filter((o) => ten.get(o).startsWith("lời dặn " + m.ma))); lo.push(...r.lo); chuLo.push(...r.chuLo);
  // cùng chủ đề với kho giữa kì II (đề “Ôn chủ đề”, không có câu tự luận): chỉ xét cặp một câu của kho này, một câu của kho kia
  const cuaKhoNay = (q) => m.kho.includes(q), cd = m.kho.concat(m.gk2).filter((q) => m.CU.includes(q.topic) && q.type !== "essay");
  const r2 = doLo(cd, Object.assign({}, m.gk2M, m.M), (q) => ten.get(q), [], (p, q) => p.topic === q.topic && cuaKhoNay(p) !== cuaKhoNay(q)); loCD.push(...r2.lo); chuLoCD.push(...r2.chuLo);
});
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n") + "\nĐáp án bằng chữ có ở câu cùng chủ đề của kho giữa kì II (xem tay):\n" + chuLoCD.join("\n"));
// đã xem (Phiên N12-ck2-tin-congnghe): tên màu, tên cổng logic, tên chương, kĩ năng mềm chung của mọi nghề; câu kia không nói tới điều câu
// này hỏi. “cam”: màu chữ của mẫu ở câu khác (CSS ngoài, viền của khung thông báo, :hover ở phần tử cha), không nói mẫu nào thắng khi liên kết
// vừa :visited vừa :hover; “giải quyết vấn đề”: tên Chủ đề 4 trong lời dặn, không nói kĩ năng của nghề sửa chữa; “quản lí thời gian”: bài tự
// luận về tin tuyển kĩ thuật viên sửa máy (Bài 19) xếp kĩ năng mềm của nghề đó, không nói về nhóm nghề quản trị; “cổng NOR”, “cổng NAND”: câu
// đúng/sai 4 ý tính lối ra của các cổng, câu tự luận chọn cổng NAND, không nói kí hiệu của cổng.
const DA_XEM = ["th1#18 → th2#14: cam", "th2#7 → th2#14: cam", "th2#19 → th2#14: cam", "lời dặn tin → th2#20: giải quyết vấn", "lời dặn tin → th2#20: quyết vấn đề",
  "th1#22 → th2#23: quản lí thời", "th1#22 → th2#23: lí thời gian", "cn2#12 → cn1#10: cổng nor", "cn2#12 → cn2#10: cổng nand", "cn2#14 → cn2#10: cổng nand"];
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));
// đã xem: thuật ngữ, tên màu, tên nghề, ngành, trình độ ở lựa chọn hay ở câu khác ý. “dòng đầu tiên”: câu ::first-line của kho giữa kì II hỏi phần
// nào được định dạng, không nói dòng đầu đổi theo độ rộng cửa sổ; “mạng máy tính”: tên ngành (Quản trị mạng máy tính), cách nói “duy trì mạng
// máy tính” ở kho giữa kì II, không nói giao thức, router thuộc kiến thức nào; “cam”, “xám”, “xanh dương”: màu tính ra ở câu khác mã; “quản lí
// hệ thống”: tên nhóm kiến thức ở kho giữa kì II, không nói đòi hỏi quản lí từ xa; “đại học”, “diode ổn áp”, “vận hành thiết bị”: lựa chọn sai
// của câu kia; “lối vào đảo”: tên chân nối R1, R2, không nói chân nào có dấu “−”.
const DA_XEM_CHU_DE = ["gk2-th2#16 → th1#16: dòng đầu tiên", "gk2-th1#24 → th1#24: mạng máy tính", "gk2-th2#24 → th1#24: mạng máy tính", "gk2-th1#16 → th2#14: cam",
  "gk2-th1#25 → th2#24: quản lí hệ", "gk2-th1#25 → th2#24: lí hệ thống", "gk2-th2#23 → th2#24: quản lí hệ", "gk2-th2#23 → th2#24: lí hệ thống",
  "th1#7 → gk2-th2#9: xám", "th2#6 → gk2-th2#9: xám", "th1#19 → gk2-th2#17: xanh dương", "th2#14 → gk2-th2#17: xanh dương",
  "gk2-cn2#4 → cn1#2: đại học", "gk2-cn1#16 → cn1#6: diode ổn áp", "cn1#9 → gk2-cn1#23: lối vào đảo", "cn2#8 → gk2-cn1#23: lối vào đảo",
  "cn2#2 → gk2-cn2#6: vận hành thiết", "cn2#2 → gk2-cn2#6: hành thiết bị"];
assert.deepEqual(chuLoCD, DA_XEM_CHU_DE, "đáp án bằng chữ có ở câu cùng chủ đề của kho giữa kì II đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM_CHU_DE");
assert.deepEqual(loCD, [], "lộ đáp án giữa câu cùng chủ đề của hai kho:\n" + loCD.join("\n"));

/* ---------- TU_CHUNG: tên bài, tên chương, thuật ngữ, cách nói chuẩn của đề, bỏ qua khi so với chữ của sách và của kho khác ---------- */
const TU_CHUNG = MON.flatMap((m) => m.BAI.map((b) => b[0]).concat(m.CHUONG.map((p) => p.replace(/^(?:Chủ đề|Chương) \S+ /, "").replace(/ \($/, "")))).concat([
  // cách hỏi chuẩn của đề
  "mỗi ý sau đúng hay sai",
  // tên sách, tên phần của sách trong lời dặn
  "Công nghệ 12 – Công nghệ điện – điện tử", "Phần hai Công nghệ điện tử", "Lâm nghiệp – Thuỷ sản", "Định hướng Tin học ứng dụng", "Định hướng Khoa học máy tính",
  // Tin học: tên nghề, ngành học, nhóm kiến thức, thuật ngữ như sách (Bài 19, 20)
  "sửa chữa và bảo trì máy tính", "Kĩ thuật sửa chữa, lắp ráp máy tính", "Công nghệ kĩ thuật phần cứng máy tính", "Công nghệ kĩ thuật phần mềm máy tính",
  "Công nghệ thông tin", "Quản trị mạng máy tính", "Quản trị hệ thống", "An ninh mạng", "Hệ thống thông tin", "bảo mật hệ thống thông tin",
  "quản trị và bảo trì hệ thống", "quản lí hệ thống", "luật pháp và tuân thủ quy định", "quản trị mạng", "Mạng máy tính và truyền thông dữ liệu",
  // Công nghệ: tên nghề (Bài 14), linh kiện, khối chức năng, thuật ngữ như sách (Bài 21–25)
  "thiết kế thiết bị điện tử", "sản xuất, chế tạo thiết bị điện tử", "lắp đặt thiết bị điện tử", "vận hành thiết bị điện tử",
  "bảo dưỡng và sửa chữa thiết bị điện tử", "đồng hồ vạn năng", "khối đầu vào", "khối đầu ra", "bộ xử lí trung tâm", "khối dao động",
  "khối truyền thông", "khối tín hiệu vào/ra", "khối nguồn", "trình tải khởi động", "môi trường lập trình tích hợp", "thanh công cụ",
  "cửa sổ lập trình", "cửa sổ thông báo", "mạch logic tổ hợp", "mạch dãy", "bộ ghi dịch", "bộ đếm nhị phân", "tín hiệu số", "tốc độ bit",
  "khoảng bit", "cổng logic", "bảng chân lí", "dòng điện collector định mức", "hệ số khuếch đại", "mạch khuếch đại đảo", "mạch khuếch đại không đảo"]);
/* ---------- không chép sách: so mọi trường chữ, cả lời dặn, với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ----------
   Cụm từ chung của môn (TU_CHUNG: tên bài, tên chương, tên thẻ, thuật ngữ, cách nói chuẩn của đề) thay bằng dấu ngăn trước khi so. Chuỗi so
   phải có ít nhất 5 từ có chữ. */
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const boDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const TU_CHUNG_ = TU_CHUNG.map((p) => " " + boDau(p) + " ").sort((a, b) => b.length - a.length);
const khongDau = (s) => {
  let t = " " + boDau(String(s).normalize("NFC")) + " ";
  TU_CHUNG_.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  return t.replace(/[aeiouy]+/g, "a").replace(/\s+/g, " ").trim();
};
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const tatCa = MON.flatMap((m) => m.kho);
const chuSo = (q) => chu(q).concat(chuHinh(q));
if (SACH.length) {
  MON.forEach((m) => m.sachCo.forEach((sach) => assert.ok(SACH.some((f) => f.includes(path.join("lop-12", sach))), "OnUp-Book có " + sach)));
  const sach = new Set(), them = (t, k) => { const w = t.split(" ").filter(Boolean); for (let i = 0; i + k <= w.length; i++) sach.add(k + ":" + w.slice(i, i + k).join(" ")); };
  SACH.forEach((f) => { const t = khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")); them(t, 8); if (process.env.DO_SACH) them(t, 6); });
  const bao = (k) => tatCa.concat(NOTES).flatMap((q) => chuSo(q).flatMap((s) => chuoi(s, k).filter((c) => sach.has(k + ":" + c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  const trung = [...new Set(bao(8))];
  assert.deepEqual(trung, [], "chuỗi 8 từ trùng chữ của sách:\n" + trung.join("\n"));
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");

/* ---------- so với kho cuối kì I, giữa kì II cùng môn ----------
   Đề bài không gần trùng: cặp hai âm tiết liền nhau (Rút ra N25): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của kho cuối kì I,
   giữa kì II và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung
   của đề (CUM) và cặp có ở từ 3% số câu của file. Câu cùng chủ đề với kho giữa kì II (CU): không trùng đề bài, chuỗi 6 từ của đề bài, đáp án
   câu đó (như tests/vatli-hoahoc12-ck2.js). */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const CUM = ["mỗi ý sau đúng hay sai", "nhận xét nào sau đây đúng", "phát biểu nào sau đây đúng", "làm tròn kết quả đến hàng đơn vị", "cho đoạn mã trong hình",
    "hình bên là kí hiệu của", "cho mạch logic trong hình", "em hãy"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const gan_ = [], trungOn = [];
  MON.forEach((m) => {
    const ca = BANKS.filter((b) => b.file === m.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), df = {};
    ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
    const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * ca.length)); };
    m.kho.forEach((q) => { const c = capAm(q); m.ck1.concat(m.gk2).forEach((p) => { const d = capAm(p), chung = [...c].filter((x) => d.has(x)); if (chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`); }); });
    m.kho.filter((q) => m.CU.includes(q.topic)).forEach((q) => m.gk2.filter((p) => p.topic === q.topic).forEach((p) => {
      const at = ten.get(q) + " ~ " + ten.get(p) + ": ";
      if (gocChu(q.q) === gocChu(p.q)) trungOn.push(at + "đề bài trùng");
      const c6 = chuoi(q.q, 6).filter((c) => (" " + khongDau(p.q) + " ").includes(" " + c + " "));
      if (c6.length) trungOn.push(at + "chuỗi 6 từ của đề bài: " + c6.join(" | "));
      if (q.type === "mc" && p.type === "mc" && gocChu(q.o[0]) === gocChu(p.o[0])) trungOn.push(at + "đáp án trùng");
      if (q.type === "num" && p.type === "num" && gan(q.ans, p.ans) && (q.unit || "") === (p.unit || "")) trungOn.push(at + "đáp án số trùng");
    }));
  });
  assert.deepEqual(gan_, [], "đề bài gần trùng câu của kho cuối kì I, giữa kì II");
  assert.deepEqual(trungOn, [], "câu cùng chủ đề trùng câu của kho giữa kì II");
}

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả kho cuối kì I, giữa kì II cùng file và câu
   riêng của các đề ngẫu nhiên; với kho cuối kì I cùng môn: đề bài không có chuỗi 6 từ nào trùng (Rút ra N9-gk1-toan) ---------- */
{
  const cua = (b, q) => ({ id: b.id, s: " " + chu(q).concat(chuHinh(q), q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const ngoai = (b) => !MON.some((m) => m.DE.includes(b.id) || m.pool === b);
  const khac = BANKS.filter((b) => !b.pool && ngoai(b)).flatMap((b) => b.questions.map((q) => cua(b, q)))
    .concat(BANKS.filter((b) => b.pool && ngoai(b)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => tatCa.concat(NOTES).flatMap((q) => [...new Set(chuSo(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
  const gan6 = MON.flatMap((m) => { const ck1 = m.ck1.map((q) => " " + khongDau(q.q) + " "); return m.kho.flatMap((q) => chuoi(q.q, 6).filter((c) => ck1.some((s) => s.includes(" " + c + " "))).map((c) => ten.get(q) + ": " + c)); });
  assert.deepEqual([...new Set(gan6)], [], "đề bài có chuỗi 6 từ trùng câu của kho cuối kì I");
}

/* ---------- tự thử: bộ đọc HTML, CSS, bộ áp mẫu định dạng, khung mã, bộ đọc mạch logic, hàm logic, bộ dò lộ với mã, hình, câu cố ý viết sai ---------- */
{
  const hong = (f, msg) => assert.throws(f, Error, "tự thử không bắt được: " + msg);
  // bộ đọc HTML: cú pháp, thẻ và thuộc tính sách dạy
  hong(() => docHtml("<p>Chào <b>bạn</p></b>"), "thẻ đóng sai thứ tự");
  hong(() => docHtml("<p>Chào bạn"), "thiếu thẻ đóng");
  hong(() => docHtml("<hr></hr>"), "thẻ rỗng có thẻ đóng");
  hong(() => docHtml("<p style=color:red>x</p>"), "giá trị thuộc tính không có ngoặc kép");
  hong(() => docHtml("<button>Gửi</button>"), "thẻ sách không dạy");
  hong(() => docHtml("<nav><a href=\"#1\">x</nav></a>"), "thẻ nav đóng sai thứ tự");
  // bộ đọc CSS: cú pháp, thuộc tính, giá trị, bộ chọn sách dạy
  hong(() => docCss("p { color: red }"), "thiếu dấu chấm phẩy cuối");
  hong(() => docCss("p { color red; }"), "thiếu dấu hai chấm");
  hong(() => docCss("p { color: red; "), "thiếu ngoặc nhọn");
  hong(() => docCss("p { color = red; }"), "dấu bằng thay dấu hai chấm");
  hong(() => docCss("p { color: reed; }"), "tên màu sai");
  hong(() => docCss("p { font-size: 12; }"), "cỡ chữ thiếu đơn vị");
  hong(() => docCss("p { font-size: 12pc; }"), "đơn vị sách không dạy");
  hong(() => docCss("p { border-color: 3px; }"), "màu viền là độ dài");
  hong(() => docCss("p:hovered { color: red; }"), "lớp giả sách không có");
  hong(() => docCss("p > { color: red; }"), "bộ chọn thiếu phần tử");
  // trọng số theo Bảng 17.4, màu
  assert.deepEqual(["ul li a[href]:hover", "#menu a", ".moi:hover", "tr.cuoi-tuan td", "#lich .nghi", ".tinh-trang.het", "*", "::first-line"].map((s) => docChon(s).ts), [23, 101, 20, 12, 110, 20, 0, 1], "tự thử: trọng số");
  assert.deepEqual(["Red", "#B0B0B0", "hsl(120, 100%, 50%)", "maroon"].map(docMau), [[255, 0, 0], [176, 176, 176], [0, 255, 0], [128, 0, 0]], "tự thử: màu");
  // cỡ chữ theo pt, em, %
  {
    const g = docHtml('<style>h2 { font-size: 18pt; } .a { font-size: 150%; }</style><h2>X <span class="a">Y</span></h2><p>Z</p>'), ap = apCss(g);
    assert.deepEqual([coChu(ap, tim(g, "h2")[0]), coChu(ap, tim(g, "span")[0]), coChu(ap, tim(g, "p")[0])], [24, 36, 16], "tự thử: cỡ chữ pt, %");
  }
  // lớp giả :hover theo trạng thái: chính phần tử, phần tử cha; :visited; kế thừa màu từ phần tử cha đang :hover
  {
    const g = docHtml('<style>.k:hover h3 { color: orange; } a:visited { color: purple; } a:hover { color: red; } .k:hover { color: green; }</style><div class="k"><h3>T</h3><p>P</p></div><a href="#1">L</a>');
    const ap = apCss(g), [h3, p, a] = [tim(g, "h3")[0], tim(g, "p")[0], tim(g, "a")[0]], m = (e, st) => ap.kieu(e, "color", st);
    assert.ok(co(m(h3, diChuot(p)), "cam") && co(m(p, diChuot(p)), "xanh lá") && m(h3) === undefined, "tự thử: :hover ở phần tử cha, kế thừa");
    assert.ok(co(m(a, { visited: new Set([a]) }), "tím") && co(m(a, diChuot(a, { visited: new Set([a]) })), "đỏ") && co(m(a, ["hover"]), "đỏ"), "tự thử: :visited, :hover");
  }
  // đoạn mã trong chữ của câu
  assert.deepEqual(maTrong("Mẫu “nav > a {color: red;}”, thẻ “<nav>…</nav>”, tệp “a.css”, màu “#808080”."), ["nav > a {color: red;}", "<nav>…</nav>"], "tự thử: đoạn mã trong chữ");
  // khung mã: lùi đầu dòng sai, dòng tràn khung, thẻ chưa đóng
  {
    const k = TH.kho.find((q) => q.svg && q.q.includes("bảng lịch hoạt động")).svg;
    assert.ok(docKhung(k).includes('<td class="nghi">Thứ Bảy</td>'), "tự thử: đọc khung mã");
    hong(() => docKhung(k.replace('<text x="44" y="106" font-size="14">', '<text x="28" y="106" font-size="14">')), "khung mã lùi đầu dòng sai");
    hong(() => docKhung(k.replace("tr.cuoi-tuan td {color: blue;}", "tr.cuoi-tuan td {color: blue; font-weight: bold; text-align: right;}")), "dòng tràn khung");
    hong(() => docKhung(k.replace("&lt;/table&gt;", "&lt;/tr&gt;")), "thẻ đóng không khớp");
  }
  // vòng màu, các phép tính Công nghệ
  assert.deepEqual(docVongMau(["nâu", "đỏ", "bạc", "nhũ vàng"]), { R: 0.12, sai: 5 }, "tự thử: hệ số nhân màu bạc");
  hong(() => docVongMau(["nâu", "đen", "đen", "nhũ vàng"]), "hệ số nhân màu đen (bảng của sách in “0”)");
  assert.ok(gan(khongDaoK(2000, 8200), 5.1) && gan(daoK(10000, 150000), -15), "tự thử: hệ số khuếch đại");
  // bộ đếm, Flip-Flop D
  assert.deepEqual([0, 1, 2, 3, 4, 5].map((n) => giaTri(demTien(2, n))), [0, 1, 2, 3, 0, 1], "tự thử: bộ đếm 2 bit");
  assert.deepEqual([7, 8, 13].map((n) => giaTri(demTien(3, n))), [7, 0, 5], "tự thử: bộ đếm 3 bit");
  assert.deepEqual([flipFlopD(0, [1]), flipFlopD(1, []), flipFlopD(0, [1, 0])], [1, 1, 0], "tự thử: Flip-Flop D");
  // hàm logic
  {
    const bang = (s) => toHop(["A", "B"]).map((d) => docHam(s)(d)).join("");
    assert.deepEqual(["Y = A · B", "Y = A + B", "Y = Ā · B", "G = A · B̄", "Y = (A + B) · Ā", "Z = Ā + B̄"].map(bang), ["0001", "0111", "0100", "0010", "0100", "1110"], "tự thử: hàm logic");
    hong(() => docHam("Y = A · (B + C"), "thiếu ngoặc");
    hong(() => docHam("Y = A XOR B"), "phép sách không dạy");
  }
  // mạch logic trong hình: đọc cổng, dây, chữ; hình cố ý vẽ sai
  {
    const h = (has) => CN.kho.find((q) => q.svg && q.q.includes(has)).svg, nor = h("Hình bên là kí hiệu của cổng logic nào?"), m1 = h("Cho mạch logic trong hình. Mỗi ý sau"), m2 = h("Lối ra Y bằng 1 khi nào?");
    assert.deepEqual([docMach(nor).cong, docMach(m1).cong.slice().sort(), docMach(m2).cong.slice().sort()], [["NOR"], ["AND", "NOT", "OR"], ["AND", "NOT"]], "tự thử: đọc cổng logic");
    assert.equal(toHop(["A", "B", "C"]).map((d) => docMach(m1).ham(d)).join(""), "10101011", "tự thử: bảng chân lí của mạch A · B + C̄");
    // bỏ dấu đảo của cổng NOR thì thành cổng OR
    const bo = nor.replace(/<circle [^>]*\/>/, "").replace(/x1="190" y1="50" x2="240" y2="50"/, 'x1="180" y1="50" x2="240" y2="50"').replace('<text x="246" y="55"', '<text x="246" y="55"');
    assert.deepEqual(docMach(bo).cong, ["OR"], "tự thử: không có dấu đảo là cổng OR");
    hong(() => docMach(nor.replace(/<circle [^>]*\/>/, "")), "dây lối ra không chạm cổng khi bỏ dấu đảo");
    hong(() => docMach(m2.replace(/<circle [^>]*\/>/, "")), "cổng NOT thiếu dấu đảo");
    hong(() => docMach(m1.replace('x1="20" y1="40"', 'x1="24" y1="40"')), "chữ lối vào không sát đầu dây");
    hong(() => docMach(m1.replace(/<line x1="150" y1="80" x2="204.5" y2="80"[^>]*\/>/, "")), "lối vào của cổng OR không có dây nối");
    hong(() => docMach(m2.replace(/<line x1="100" y1="45" x2="170" y2="45"/, '<line x1="100" y1="45" x2="160" y2="45"')), "dây bỏ trống, không chạm lối vào");
    hong(() => docMach(m1.replace(/A 30 30 0 0 1/, "A 25 25 0 0 1")), "cổng AND vẽ sai");
    hong(() => docMach(m1.replace(/Q 212 95 200 125/, "Q 214 95 200 125")), "cổng OR vẽ sai");
    hong(() => docMach(nor.replace('font-size="15"', 'font-size="12"')), "chữ trong hình nhỏ hơn 13");
  }
  // dò lộ: số ở vị trí kết quả của câu kia; số đứng trước một phép tính không tính
  {
    const a = { topic: "A", type: "num", q: "Tính.", ans: 160, lv: 3, x: "" }, b = { topic: "B", type: "mc", q: "Ta có β = 160 nên chọn.", o: ["m", "n", "p", "r"], lv: 1, x: "" };
    const c = { topic: "B", type: "mc", q: "Với 160 × 2 = 320 thì sao?", o: ["m", "n", "p", "r"], lv: 2, x: "" };
    assert.equal(doLo([a, b], { A: [0, 0, 1], B: [1, 0, 0] }, (q) => q.topic).lo.length, 1, "tự thử: bộ dò lộ số");
    assert.equal(doLo([a, c], { A: [0, 0, 1], B: [0, 1, 0] }, (q) => q.topic).lo.length, 0, "tự thử: số đứng trước phép tính không tính");
    const d = { topic: "B", type: "mc", q: "Mạch nào?", o: ["Bộ ghi dịch", "x", "y", "z"], lv: 1, x: "" }, e = { topic: "A", type: "mc", q: "Bộ ghi dịch là mạch dãy.", o: ["m", "n", "p", "r"], lv: 2, x: "" };
    assert.equal(doLo([d, e], { A: [0, 1, 0], B: [1, 0, 0] }, (q) => q.topic).chuLo.length, 1, "tự thử: bộ dò lộ chữ");
  }
}

MON.forEach((m) => console.log(`${m.ten} 12 cuối năm: kho ${m.kho.length} câu (${m.DE.length} đề cố định, ${m.pool.n} câu mỗi đề), ma trận 10 – 8 – 7 trên ${Object.keys(m.M).length} chủ đề (${m.CU.length} chủ đề cùng chữ kho giữa kì II); ` +
  `${m.kho.filter((q) => q.type === "tf4").length} câu đúng/sai 4 ý, ${m.kho.filter((q) => q.type === "num").length} câu trả lời ngắn, ${m.kho.filter((q) => q.type === "order").length} câu sắp xếp, ${m.kho.filter((q) => q.type === "essay").length} câu tự luận, ${m.kho.filter((q) => q.svg).length} câu có hình; đáp án đúng dài nhất hoặc ngắn nhất ở ${m.le} câu nhiều lựa chọn.`));
console.log(n + " câu, ý, đoạn mã đã tính lại hoặc đọc lại.");
console.log("MATH OK");
