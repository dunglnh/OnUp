// Kiểm tra ngân hàng Lịch sử 12 và Địa lí 12 cuối năm của Phiên N12-ck2-lichsu-diali (data/banks/12-lichsu.js, data/banks/12-diali.js:
// mỗi môn hai đề cố định và đề ngẫu nhiên lấy câu của hai đề đó, không có câu riêng), theo mẫu tests/lichsu-diali12-gk2.js (bộ đọc biểu
// đồ, trình tự sự kiện, gộp tên riêng khi so chữ với sách; phần số, phần hình chép nguyên từ script đó) và tests/sinhhoc-ktpl12-ck2.js
// (lời dặn của đề cuối năm, câu ôn so với kho giữa kì II). Số đề, số câu lấy từ danh mục (không ghi cứng).
// Câu có phép tính, có hình, câu sắp xếp, câu tự luận nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id);
// số liệu đọc từ chữ của đề hay từ hình, đáp án tính bằng code (so với ans, o[0], o của câu sắp xếp, hoặc các ý tính được của câu đúng/sai
// 4 ý; câu tự luận so với thang chấm và bài gợi ý).
// Lịch sử (Bài 10–17, trọng tâm Bài 14–17): trình tự sự kiện của hai câu sắp xếp (bảng ngày tháng theo sách in năm 2026 ghi trong script,
// Bài 14 tr. 82–85, Bài 15 tr. 91–92; kèm bảng Bài 12–13 của kho giữa kì II để dò ngày tháng ở đề “Ôn chủ đề”), ngày tháng viết như sách.
// Địa lí (Bài 20–35, trọng tâm Bài 28–33): tốc độ tăng trưởng lấy năm gốc 100%, tỉ lệ che phủ rừng (đổi triệu ha ra nghìn ha), số thuê bao
// trên 100 dân, diện tích từ cơ cấu %, tỉ lệ diện tích vùng biển Việt Nam trong Biển Đông (số liệu của sách, Bài 33); sáu biểu đồ đọc lại
// bằng code (cột một dãy, hai dãy, tròn, đường, miền, kết hợp cột và đường: trục số, số ghi trên hình khớp vị trí, chú giải, năm); nhận xét
// của câu đọc biểu đồ xét lại bằng số đọc được; tên tỉnh, thành phố theo 34 đơn vị hành chính cấp tỉnh, 6 vùng kinh tế – xã hội.
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân, dấu thanh kiểu sách “hoá”, “thuỷ”), lời dặn của đề (phạm vi, số câu
// mỗi phần tính từ ma trận, trường học khác phạm vi, câu về đề chung của Sở), môn, lịch thi và phạm vi của ck2-l12, mức độ và ma trận
// 10 – 8 – 7 (chủ đề theo tên bài và thứ tự của sách, đối chiếu mục lục trong README của cuốn ở OnUp-Book; chủ đề ôn đúng chữ chủ đề của
// kho giữa kì II, chủ đề mới không trùng kho giữa kì II, cuối kì I; phần trọng tâm nhiều câu hơn phần ôn; hai đề cố định chia đúng ma
// trận), dạng câu theo khung Công văn 7991 (mỗi kho ít nhất 6 câu đúng/sai 4 ý không lặp kiểu Đ/S, Địa lí ít nhất 4 câu trả lời ngắn đáp
// án là số, 1–2 câu tự luận ở ô Vận dụng rút 1 câu), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở
// không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn
// sai không cùng mở đầu bằng một chữ mà đáp án đúng không có, rút thử nhiều lần (đúng ma trận; đã làm hết một đề cố định thì không rút lại
// câu của đề đó). So với kho cuối kì I, giữa kì II cùng môn: đáp án đúng của câu nhiều lựa chọn không trùng, đề bài không gần trùng (cặp hai
// âm tiết chung), không chuỗi 6 từ nào trùng; câu ôn không trùng đề bài, chuỗi 6 từ của đề bài, đáp án câu cùng chủ đề của kho giữa kì II.
// Dò lộ đáp án giữa mọi cặp câu rút được cùng lúc và với lời dặn (đề “Ôn chủ đề” rút chung cả chủ đề; số ở vị trí kết quả của câu kia,
// ngày tháng của các sự kiện trong câu về trình tự thời gian: không được có; chuỗi 3 từ của đáp án bằng chữ in ra với DO_LO=1 để xem tay,
// đã xem ghi ở DA_XEM) và giữa câu cùng chủ đề ôn của kho này với kho giữa kì II (đề “Ôn chủ đề” rút chung; DA_XEM_CHU_DE), bộ dò lộ, bộ
// đọc hình tự thử với câu, hình cố ý viết sai. Có sách ở ../OnUp-Book thì so mọi trường chữ, cả lời dặn, với chữ OCR của mọi cuốn sau khi
// bỏ dấu, gộp nguyên âm, gộp tên riêng nhiều chữ thành một từ (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ, DO_SACH8=1 in đoạn trùng
// của từng trường chữ để viết lại) và với câu của mọi kho khác, cả kho cuối kì I, giữa kì II và câu riêng của các đề ngẫu nhiên (không
// chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 6 từ).
// Chạy: node tests/lichsu-diali12-ck2.js → in MATH OK.
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
   DAU: phần đầu của lời dặn (sách, phạm vi cuối năm học); PHAN: các phần của lời dặn (số câu mỗi phần tính từ ma trận); SAU: câu lời dặn
   nhắc trường học khác phạm vi; CUOI: câu ngay trước câu về đề chung của Sở; PHAM_VI: phạm vi của môn ghi ở ck2-l12 (“Bài a–b, trọng tâm
   Bài c–d”); ON: các bài ôn (chủ đề đúng chữ của kho giữa kì II); BAI: chủ đề theo tên bài của sách (số bài để chia phần, đối chiếu mục lục;
   bài thực hành không ra chủ đề riêng); RUT_GON: tên bài rút gọn cho vừa mã đề "Ôn chủ đề" (tối đa 80 kí tự) → tên trong mục lục. */
const SO = "Từ năm học 2026–2027 Sở GD&ĐT ra đề chung cuối kì một số môn lớp 12; xem thông báo của Sở về môn và cấu trúc đề.";
const MON = [
  { ma: "lichsu", ten: "Lịch sử", sach: "lich-su-12", ki: "ls",
    DAU: "Sách Kết nối tri thức, Lịch sử 12. Phạm vi cuối năm học: Bài 10–17, trọng tâm Bài 14–17. ",
    PHAN: [["Chủ đề 4 Công cuộc Đổi mới ở Việt Nam từ năm 1986 đến nay (Bài 10–11; ôn)", 10, 11],
      ["Chủ đề 5 Lịch sử đối ngoại của Việt Nam thời cận – hiện đại (Bài 12–13 ôn; Bài 14)", 12, 14],
      ["Chủ đề 6 Hồ Chí Minh trong lịch sử Việt Nam (Bài 15–17)", 15, 17]],
    SAU: ["Trường chỉ kiểm tra Chủ đề 6 thì bỏ qua các câu Bài 10–14; trường kiểm tra cả Bài 9 (bảo vệ Tổ quốc từ sau tháng 4 – 1975) thì phụ huynh đối chiếu với đề cương của trường."],
    CUOI: "Có lời giải từng câu.", PHAM_VI: "Lịch sử: Bài 10–17, trọng tâm Bài 14–17.", ON: [10, 13],
    BAI: [["Khái quát về công cuộc Đổi mới từ năm 1986 đến nay", 10], ["Thành tựu cơ bản và bài học của công cuộc Đổi mới", 11],
      ["Hoạt động đối ngoại trong đấu tranh giành độc lập dân tộc", 12], ["Hoạt động đối ngoại trong kháng chiến chống Pháp và chống Mỹ", 13],
      ["Hoạt động đối ngoại của Việt Nam từ năm 1975 đến nay", 14], ["Khái quát cuộc đời và sự nghiệp của Hồ Chí Minh", 15],
      ["Hồ Chí Minh – Anh hùng giải phóng dân tộc", 16], ["Dấu ấn Hồ Chí Minh trong lòng nhân dân thế giới và Việt Nam", 17]],
    RUT_GON: { "Thành tựu cơ bản và bài học của công cuộc Đổi mới": "Thành tựu cơ bản và bài học của công cuộc Đổi mới ở Việt Nam từ năm 1986 đến nay",
      "Hoạt động đối ngoại trong đấu tranh giành độc lập dân tộc": "Hoạt động đối ngoại của Việt Nam trong đấu tranh giành độc lập dân tộc (từ đầu thế kỉ XX đến Cách mạng tháng Tám năm 1945)",
      "Hoạt động đối ngoại trong kháng chiến chống Pháp và chống Mỹ": "Hoạt động đối ngoại của Việt Nam trong kháng chiến chống Pháp (1945 – 1954) và kháng chiến chống Mỹ (1954 – 1975)" } },
  { ma: "diali", ten: "Địa lí", sach: "dia-li-12", ki: "dl",
    DAU: "Sách Kết nối tri thức, Địa lí 12 (bản chỉnh sửa năm 2026). Phạm vi cuối năm học: Bài 20–35, trọng tâm Bài 28–33. ",
    PHAN: [["Phần 3 Địa lí các ngành kinh tế, các ngành dịch vụ (Bài 20–23; ôn)", 20, 23],
      ["Phần 4 Địa lí các vùng kinh tế – xã hội, Bài 24–27 (ôn: Trung du và miền núi phía Bắc, Đồng bằng sông Hồng, Bắc Trung Bộ)", 24, 27],
      ["Phần 4 Địa lí các vùng kinh tế – xã hội, Bài 28–34 (Duyên hải Nam Trung Bộ và Tây Nguyên, Đông Nam Bộ, Đồng bằng sông Cửu Long, Biển Đông và các đảo, quần đảo)", 28, 34]],
    SAU: ["Bài 23, 26, 29, 32, 34, 35 là bài thực hành nên không có câu riêng.", "Trường chỉ kiểm tra Bài 28–33 thì bỏ qua các câu ôn Bài 20–27.",
      "Số liệu trong các câu có biểu đồ, bảng là số liệu tự đặt."],
    CUOI: "Một số câu cần máy tính cầm tay. Có lời giải từng câu.", PHAM_VI: "Địa lí: Bài 20–35, trọng tâm Bài 28–33.", ON: [20, 27],
    BAI: [["Vai trò, các nhân tố ảnh hưởng đến các ngành dịch vụ", 20], ["Giao thông vận tải và bưu chính viễn thông", 21], ["Thương mại và du lịch", 22],
      ["Khai thác thế mạnh ở Trung du và miền núi phía Bắc", 24], ["Phát triển kinh tế – xã hội ở Đồng bằng sông Hồng", 25], ["Phát triển kinh tế – xã hội ở Bắc Trung Bộ", 27],
      ["Phát triển kinh tế – xã hội ở Nam Trung Bộ", 28], ["Phát triển kinh tế – xã hội ở Đông Nam Bộ", 30], ["Sử dụng hợp lí tự nhiên ở Đồng bằng sông Cửu Long", 31],
      ["Phát triển kinh tế và đảm bảo quốc phòng, an ninh ở Biển Đông", 33]],
    RUT_GON: { "Vai trò, các nhân tố ảnh hưởng đến các ngành dịch vụ": "Vai trò, các nhân tố ảnh hưởng đến sự phát triển và phân bố các ngành dịch vụ",
      "Phát triển kinh tế – xã hội ở Nam Trung Bộ": "Phát triển kinh tế – xã hội ở Duyên hải Nam Trung Bộ và Tây Nguyên (Nam Trung Bộ)",
      "Sử dụng hợp lí tự nhiên ở Đồng bằng sông Cửu Long": "Sử dụng hợp lí tự nhiên để phát triển kinh tế ở Đồng bằng sông Cửu Long",
      "Phát triển kinh tế và đảm bảo quốc phòng, an ninh ở Biển Đông": "Phát triển kinh tế và đảm bảo quốc phòng, an ninh ở Biển Đông và các đảo, quần đảo" } }
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
    assert.ok(b.file === m.file && b.subject === m.ten && b.grade === 12 && b.minutes === pool.minutes && b.n === pool.n, id + ": cùng file, môn, khối, số phút, số câu với đề ngẫu nhiên");
    assert.equal(b.title, m.ten + " 12 · Cuối năm · Đề " + (k + 1), id + ": tên đề");
    assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
    m.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, m.ki + (k + 1) + "#" + (i + 1)));
  });
  assert.equal(m.kho.length, sum(m.DE.map((id) => bank(id).n)), m.ma + ": kho = câu của hai đề cố định");
  // kho cuối kì I, giữa kì II cùng môn (để so: chủ đề ôn, đề bài không gần trùng, đáp án không trùng)
  ["ck1", "gk2"].forEach((k) => {
    const p = BANKS.find((b) => b.pool && b.id === m.ma + "12-" + k + "-ngau-nhien");
    assert.ok(p && p.file === m.file, m.ma + ": có kho " + k + " cùng file");
    m[k] = p.questions; m[k + "M"] = p.pool.matrix;
    m[k].forEach((q) => ten.set(q, k + "-" + m.ki + (p.pool.from.indexOf(q.src) + 1) + "#" + (bank(q.src).questions.findIndex((x) => x.q === q.q) + 1)));
  });
  m.ON_T = m.BAI.filter((b) => b[1] >= m.ON[0] && b[1] <= m.ON[1]).map((b) => b[0]);
});
const [LS, DL] = MON;
// môn đúng chữ của lịch thi (MON_THPT), sáu mã đề gắn vào kì thi cuối năm lớp 12, phạm vi của kì thi ghi đúng số bài, kì thi có câu về đề chung của Sở
{
  const lich = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
  const mon = /const MON_THPT = \[([^\]]*)\]/.exec(lich);
  MON.forEach((m) => assert.ok(mon && mon[1].includes('"' + m.ten + '"'), "môn " + m.ten + " có trong MON_THPT"));
  const c = vm.createContext({ window: {} }); vm.runInContext(lich, c);
  const ev = c.window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck2-l12");
  assert.ok(ev && ev.grades.includes(12) && ev.subjects.includes(LS.ten) && ev.subjects.includes(DL.ten), "có kì thi ck2-l12 với hai môn");
  assert.ok(/Sở GD&ĐT/.test(ev.note || ""), "ck2-l12 có câu về đề chung của Sở");
  MON.forEach((m) => {
    [...m.DE, m.pool.id].forEach((id) => assert.ok(ev.banks.includes(id), id + " gắn vào ck2-l12"));
    assert.ok(ev.scope.includes(m.PHAM_VI), "phạm vi của ck2-l12 ghi " + m.PHAM_VI);
    const [tu, den, t1, t2] = /Bài (\d+)–(\d+), trọng tâm Bài (\d+)–(\d+)\.$/.exec(m.PHAM_VI).slice(1).map(Number);
    assert.ok(m.DAU.includes(`Bài ${tu}–${den}, trọng tâm Bài ${t1}–${t2}.`), m.ma + ": lời dặn ghi phạm vi như lịch thi");
    assert.ok(m.PHAN[0][1] === tu && m.PHAN[m.PHAN.length - 1][2] >= t2, m.ma + ": các phần của lời dặn đi từ bài đầu của phạm vi đến hết phần trọng tâm");
    assert.ok(m.ON[0] === tu && m.ON[1] < t1, m.ma + ": phần ôn đứng trước phần trọng tâm");
  });
}



/* ---------- số ----------
   Số trong đề: hàng nghìn ngăn bằng khoảng trắng, dấu phẩy thập phân. */
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?";
const val = (s) => { const m = /^[−-]?\d{1,3}(?: \d{3})*(?:,\d+)?$/.exec(String(s).trim()); assert.ok(m, "không đọc được số “" + s + "”"); return +String(s).trim().replace(/ /g, "").replace("−", "-").replace(",", "."); };
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
// mẫu chữ có # ở chỗ số: so(s, "Cho # ha") → [số]
const R = (mau) => new RegExp(mau.split("#").map(escRe).join("(" + NUM + ")"), "u");
const so = (s, mau) => { const m = R(mau).exec(s); assert.ok(m, "không thấy “" + mau + "” trong: " + String(s).slice(0, 80)); return m.slice(1).map(val); };
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b));
// số viết kiểu Việt Nam: 7500 → "7 500", 0.15 → "0,15"
const vn = (x, d = 6) => { const r = Math.round(x * 10 ** d) / 10 ** d, [a, b] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const lam = (x, d) => Math.round(x * 10 ** d + 1e-9) / 10 ** d; // làm tròn d chữ số thập phân
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const coThang = (q, ...cum) => { const r = q.rubric.map((c) => c.c).join(" | "); cum.forEach((c) => assert.ok(r.includes(c), "thang chấm cần có “" + c + "”")); };
const y = (o, re) => { const m = re.exec(o); assert.ok(m, "không đọc được ý “" + o + "”"); return m; };

/* ---------- hình ----------
   Năm loại biểu đồ tự vẽ (số liệu tự đặt), đọc lại bằng code: toạ độ làm tròn 0,1 đơn vị vẽ, nên số ghi trên hình khớp vị trí khi lệch
   không quá nửa đơn vị làm tròn. Cột: số ở đỉnh cột; tròn: góc của từng phần; đường: chấm tròn và số ở mỗi năm; miền: bề dày của miền ở
   mỗi năm; kết hợp: cột theo trục trái, đường theo trục phải. Chữ cỡ 15, chú giải là ô màu hoặc đoạn thẳng ngắn có chữ bên phải. */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const lech = (a, b) => Math.abs(((((a - b) % 360) + 540) % 360) - 180);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ngang = (l) => num(l, "y1") === num(l, "y2");
const daDoc = new Set(), LOAI_HINH = new Map(); // hình đã đọc lại bằng code, loại biểu đồ của mỗi hình
// trục số: số đặt ngay cạnh vạch (chân chữ thấp hơn vạch 5), cách đều theo giá trị; trả về hàm đổi y ra giá trị và số đơn vị mỗi đơn vị vẽ
const trucSo = (nhan, vach, ten) => {
  assert.ok(nhan.length >= 3, ten + ": cần ít nhất 3 số trên trục");
  nhan.forEach((n) => assert.ok(vach.some((y) => Math.abs(y - (n.y - 5)) < 0.051), `${ten}: số ${n.v} phải đặt ngay cạnh một vạch`));
  const s = [...nhan].sort((a, b) => a.v - b.v), k = (s[0].y - s[s.length - 1].y) / (s[s.length - 1].v - s[0].v);
  assert.ok(k > 0, ten + ": số lớn ở trên");
  s.forEach((n) => assert.ok(Math.abs(n.y - (s[0].y - k * (n.v - s[0].v))) < 0.051, `${ten}: số ${n.v} không đặt đúng vạch`));
  const f = (y) => s[0].v + (s[0].y - 5 - y) / k; f.moi = 1 / k; return f;
};
// giá trị đọc từ toạ độ khớp số ghi (toạ độ làm tròn 0,1 đơn vị vẽ)
const khop = (f, y, v, ten) => assert.ok(Math.abs(f(y) - v) <= 0.051 * f.moi + 1e-9, `${ten}: số ghi ${v} không khớp vị trí (đọc được ${f(y).toFixed(2)})`);
const chuGiaiCua = (svg, o) => o.map((r) => {
  const t = texts(svg).filter((x) => close(+x.y, num(r, "y") + 13) && +x.x > num(r, "x") + num(r, "width") && +x.x < num(r, "x") + num(r, "width") + 12);
  assert.equal(t.length, 1, "ô chú giải nào cũng có chữ"); return { fill: r.fill, ten: t[0].t };
});
const luoi = (svg) => { const lu = tags(svg, "line").filter((l) => l.stroke === "line"); assert.ok(lu.length >= 4 && lu.every(ngang), "đường lưới nằm ngang"); return lu; };
const namDuoi = (svg, day) => texts(svg).filter((t) => +t.y > day && /^\d{4}$/.test(t.t));

/* Biểu đồ cột (một hay hai dãy) */
const docCot = (svg, donVi) => {
  daDoc.add(svg); LOAI_HINH.set(svg, "cột");
  const lu = luoi(svg), x0 = Math.min(...lu.map((l) => num(l, "x1"))), ys = lu.map((l) => num(l, "y1")), day = Math.max(...ys), tx = texts(svg);
  const gt = trucSo(tx.filter((t) => /^\d[\d ]*(,\d+)?$/.test(t.t) && t["text-anchor"] === "end" && +t.x < x0).map((t) => ({ v: val(t.t), y: +t.y })), ys, "trục số");
  assert.ok(Math.abs(gt(day)) < 1e-6, "số 0 ở đường đáy");
  assert.ok(tx.some((t) => t.t === donVi && !t["text-anchor"] && +t.y < Math.min(...ys)), "trục ghi đơn vị " + donVi);
  const hcn = tags(svg, "rect"), chuGiai = chuGiaiCua(svg, hcn.filter((r) => num(r, "y") > day)), nd = namDuoi(svg, day);
  const cot = hcn.filter((r) => num(r, "y") <= day).map((r) => {
    assert.ok(close(num(r, "y") + num(r, "height"), day), "cột đứng trên đường đáy");
    const cx = num(r, "x") + num(r, "width") / 2, dinh = tx.filter((t) => t["text-anchor"] === "middle" && Math.abs(+t.x - cx) < 0.051 && +t.y < day);
    assert.equal(dinh.length, 1, "mỗi cột một số ở đỉnh"); assert.ok(Math.abs(+dinh[0].y - (num(r, "y") - 6)) < 0.051, "số ghi ngay trên đỉnh cột");
    const v = val(dinh[0].t); khop(gt, num(r, "y"), v, "cột");
    const n = [...nd].sort((a, b) => Math.abs(+a.x - cx) - Math.abs(+b.x - cx))[0];
    assert.ok(n && Math.abs(+n.x - cx) < 30, "cột nào cũng có năm ở dưới");
    const d = chuGiai.find((c) => c.fill === r.fill); if (chuGiai.length) assert.ok(d, "màu cột có trong chú giải");
    return { nam: +n.t, v, day: d && d.ten };
  });
  if (!chuGiai.length) {
    assert.ok(cot.length >= 4 && new Set(cot.map((c) => c.nam)).size === cot.length, "biểu đồ một dãy: ít nhất 4 cột, mỗi năm một cột");
    return cot.sort((a, b) => a.nam - b.nam).map(({ nam, v }) => ({ nam, v }));
  }
  const out = {};
  cot.forEach((c) => { out[c.nam] = out[c.nam] || {}; assert.equal(out[c.nam][c.day], undefined, "mỗi năm một cột của mỗi dãy"); out[c.nam][c.day] = c.v; });
  Object.values(out).forEach((g) => assert.deepEqual(Object.keys(g).sort(), chuGiai.map((c) => c.ten).sort(), "năm nào cũng đủ các dãy cột"));
  return out;
};

/* Biểu đồ tròn: { năm: { nhóm: % } } */
const docTron = (svg) => {
  daDoc.add(svg); LOAI_HINH.set(svg, "tròn");
  const tx = texts(svg), chuGiai = chuGiaiCua(svg, tags(svg, "rect"));
  assert.equal(new Set(chuGiai.map((c) => c.fill)).size, chuGiai.length, "mỗi ô chú giải một màu");
  const goc = (cx, cy, x, y) => (Math.atan2(y - cy, x - cx) * 180) / Math.PI, hinh = {};
  tags(svg, "path").forEach((p) => {
    const m = /^M ([\d.]+) ([\d.]+) L ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) 0 ([01]) 1 ([\d.]+) ([\d.]+) Z$/.exec(p.d);
    assert.ok(m, "phần của biểu đồ tròn là một hình quạt: " + p.d);
    const [cx, cy, x0, y0, r, r2, lon, x1, y1] = m.slice(1).map(Number);
    assert.ok(r === r2 && Math.abs(Math.hypot(x0 - cx, y0 - cy) - r) < 0.15 && Math.abs(Math.hypot(x1 - cx, y1 - cy) - r) < 0.15, "hai đầu cung nằm trên đường tròn");
    const a0 = goc(cx, cy, x0, y0), a1 = goc(cx, cy, x1, y1), d = (((a1 - a0) % 360) + 360) % 360;
    assert.equal(lon, d > 180 ? 1 : 0, "cờ cung lớn khớp số đo của phần");
    const c = chuGiai.find((g) => g.fill === p.fill); assert.ok(c, "màu của phần có trong chú giải");
    const nhan = tx.filter((t) => /^\d+(,\d+)?%$/.test(t.t) && Math.hypot(+t.x - cx, +t.y - 5 - cy) < r && (((goc(cx, cy, +t.x, +t.y - 5) - a0) % 360) + 360) % 360 < d);
    assert.equal(nhan.length, 1, "mỗi phần một số phần trăm ở trong");
    const k = cx + "," + cy; (hinh[k] = hinh[k] || { cx, cy, r, phan: [] }).phan.push({ a0, a1, d, ten: c.ten, v: val(nhan[0].t.slice(0, -1)) });
  });
  const out = {};
  Object.values(hinh).forEach((h) => {
    assert.ok(Math.abs(sum(h.phan.map((p) => p.d)) - 360) < 0.5, "các phần đủ một vòng tròn");
    h.phan.forEach((p, i) => {
      assert.ok(lech(h.phan[(i + 1) % h.phan.length].a0, p.a1) < 0.5, "các phần nối tiếp nhau");
      assert.ok(Math.abs(p.d / 3.6 - p.v) < 0.3, `phần “${p.ten}”: góc ${p.d.toFixed(1)}° khớp ${p.v}%`);
    });
    assert.ok(Math.abs(sum(h.phan.map((p) => p.v)) - 100) < 1e-9, "các phần cộng lại 100%");
    assert.deepEqual(h.phan.map((p) => p.ten).sort(), chuGiai.map((c) => c.ten).sort(), "mỗi hình đủ các nhóm của chú giải");
    const n = tx.filter((x) => /^Năm \d{4}$/.test(x.t) && close(+x.x, h.cx) && +x.y > h.cy + h.r);
    assert.equal(n.length, 1, "mỗi biểu đồ tròn một năm ở dưới");
    out[n[0].t.slice(4)] = Object.fromEntries(h.phan.map((p) => [p.ten, p.v]));
  });
  return out;
};

/* Biểu đồ đường: { dãy: [{ nam, v }] } */
const docDuong = (svg, donVi) => {
  daDoc.add(svg); LOAI_HINH.set(svg, "đường");
  const lu = luoi(svg), x0 = Math.min(...lu.map((l) => num(l, "x1"))), ys = lu.map((l) => num(l, "y1")), day = Math.max(...ys), tx = texts(svg);
  const gt = trucSo(tx.filter((t) => /^\d[\d ]*(,\d+)?$/.test(t.t) && t["text-anchor"] === "end" && +t.x < x0).map((t) => ({ v: val(t.t), y: +t.y })), ys, "trục số");
  assert.ok(tx.some((t) => t.t === donVi && !t["text-anchor"] && +t.y < Math.min(...ys)), "trục ghi đơn vị " + donVi);
  const nd = namDuoi(svg, day), ci = tags(svg, "circle"), chu = tags(svg, "line").filter((l) => l.stroke !== "line");
  const out = {};
  tags(svg, "polyline").forEach((pl) => {
    const lg = chu.filter((l) => l.stroke === pl.stroke && (l["stroke-dasharray"] || "") === (pl["stroke-dasharray"] || "") && ngang(l) && num(l, "y1") > day);
    assert.equal(lg.length, 1, "đường nào cũng có chú giải cùng nét");
    const tn = tx.filter((t) => close(+t.y, num(lg[0], "y1") + 5) && Math.abs(+t.x - (num(lg[0], "x2") + 6)) < 0.051);
    assert.equal(tn.length, 1, "chú giải có chữ ngay bên phải");
    const p = pts(pl.points);
    assert.ok(p.every((q, i) => !i || q[0] > p[i - 1][0]), "đường đi từ trái sang phải");
    out[tn[0].t] = p.map(([x, y]) => {
      assert.equal(ci.filter((c) => Math.abs(+c.cx - x) < 0.051 && Math.abs(+c.cy - y) < 0.051 && c.fill === pl.stroke).length, 1, "mỗi năm một chấm tròn cùng màu đường");
      const nh = tx.filter((t) => t["text-anchor"] === "middle" && Math.abs(+t.x - x) < 0.051 && (Math.abs(+t.y - (y - 8)) < 0.051 || Math.abs(+t.y - (y + 20)) < 0.051) && +t.y < day && /^\d[\d ]*(,\d+)?$/.test(t.t));
      assert.ok(nh.length >= 1 && nh.every((t) => t.t === nh[0].t), "mỗi chấm một số ngay trên hoặc dưới (điểm trùng của hai đường ghi chung một số)");
      if (nh.length > 1) assert.ok(ci.filter((c) => Math.abs(+c.cx - x) < 0.051 && Math.abs(+c.cy - y) < 0.051).length === nh.length, "chỉ điểm trùng mới có hai số");
      const v = val(nh[0].t); khop(gt, y, v, "điểm của đường " + tn[0].t);
      const n = nd.filter((t) => Math.abs(+t.x - x) < 0.051); assert.equal(n.length, 1, "điểm nào cũng có năm ở dưới");
      return { nam: +n[0].t, v };
    });
  });
  assert.ok(Object.keys(out).length >= 1, "có ít nhất một đường");
  return out;
};

/* Biểu đồ miền (cơ cấu %): { dãy: { năm: % } } */
const docMien = (svg) => {
  daDoc.add(svg); LOAI_HINH.set(svg, "miền");
  const tx = texts(svg), pg = tags(svg, "polygon"), chuGiai = chuGiaiCua(svg, tags(svg, "rect"));
  assert.ok(tx.some((t) => t.t === "%" && !t["text-anchor"]), "trục ghi đơn vị %");
  const x0 = Math.min(...pg.flatMap((p) => pts(p.points).map((q) => q[0]))), nhanTruc = tx.filter((t) => t["text-anchor"] === "end" && +t.x < x0 && /^\d+$/.test(t.t)).map((t) => ({ v: +t.t, y: +t.y }));
  assert.deepEqual(nhanTruc.map((n) => n.v).sort((a, b) => a - b), [0, 20, 40, 60, 80, 100], "trục 0–100%");
  const y0 = nhanTruc.find((n) => n.v === 0).y - 5, y100 = nhanTruc.find((n) => n.v === 100).y - 5, phanTram = (a, b) => ((a - b) / (y0 - y100)) * 100;
  nhanTruc.forEach((n) => assert.ok(Math.abs(n.y - 5 - (y0 - ((y0 - y100) * n.v) / 100)) < 0.051, "số trên trục cách đều"));
  const mien = pg.map((p) => {
    const q = pts(p.points), k = q.length / 2; assert.ok(Number.isInteger(k) && k >= 3, "miền có cạnh trên, cạnh dưới qua các năm");
    const tren = q.slice(0, k), duoi = q.slice(k).reverse();
    assert.ok(tren.every((t, i) => close(t[0], duoi[i][0]) && t[1] <= duoi[i][1] && (!i || t[0] > tren[i - 1][0])), "miền đi từ trái sang phải, cạnh trên ở trên");
    const c = chuGiai.find((g) => g.fill === p.fill); assert.ok(c, "màu miền có trong chú giải");
    return { ten: c.ten, tren, duoi };
  }).sort((a, b) => b.duoi[0][1] - a.duoi[0][1]);
  assert.ok(mien[0].duoi.every((d) => Math.abs(d[1] - y0) < 0.051) && mien[mien.length - 1].tren.every((t) => Math.abs(t[1] - y100) < 0.051), "các miền phủ từ 0 đến 100%");
  mien.forEach((m, j) => j && assert.ok(m.duoi.every((d, i) => close(d[1], mien[j - 1].tren[i][1])), "miền xếp chồng liền nhau"));
  const xs = mien[0].tren.map((t) => t[0]), nam = xs.map((x) => { const n = tx.filter((t) => /^\d{4}$/.test(t.t) && +t.y > y0 && Math.abs(+t.x - x) < 0.051); assert.equal(n.length, 1, "năm ở dưới mỗi mốc"); return n[0].t; });
  const out = {};
  mien.forEach((m) => {
    out[m.ten] = {};
    xs.forEach((x, i) => {
      const lo = m.duoi[i][1], hi = m.tren[i][1];
      const nh = tx.filter((t) => t["text-anchor"] === "middle" && Math.abs(+t.x - x) <= 18.05 && +t.y - 5 > hi && +t.y - 5 < lo && /^\d+(,\d+)?$/.test(t.t));
      assert.equal(nh.length, 1, `miền ${m.ten}, năm ${nam[i]}: một số ở giữa miền`);
      const v = val(nh[0].t); assert.ok(Math.abs(phanTram(lo, hi) - v) <= 0.1, `miền ${m.ten}, năm ${nam[i]}: bề dày ${phanTram(lo, hi).toFixed(2)}% khớp số ${v}`);
      out[m.ten][nam[i]] = v;
    });
  });
  nam.forEach((n) => assert.ok(Math.abs(sum(Object.values(out).map((o) => o[n])) - 100) < 1e-9, "năm " + n + ": các miền cộng lại 100%"));
  return out;
};

/* Biểu đồ kết hợp: cột (trục trái) và đường (trục phải) → { cot: { ten, donVi, v: [{nam, v}] }, duong: { … } } */
const docKetHop = (svg) => {
  daDoc.add(svg); LOAI_HINH.set(svg, "kết hợp");
  const lu = luoi(svg), x0 = Math.min(...lu.map((l) => num(l, "x1"))), x1 = Math.max(...lu.map((l) => num(l, "x2"))), ys = lu.map((l) => num(l, "y1")), day = Math.max(...ys), tx = texts(svg);
  const so = (t) => /^\d[\d ]*(,\d+)?$/.test(t.t);
  const gtL = trucSo(tx.filter((t) => so(t) && t["text-anchor"] === "end" && +t.x < x0).map((t) => ({ v: val(t.t), y: +t.y })), ys, "trục trái");
  const gtR = trucSo(tx.filter((t) => so(t) && t["text-anchor"] === "start" && +t.x > x1).map((t) => ({ v: val(t.t), y: +t.y })), ys, "trục phải");
  assert.ok(Math.abs(gtL(day)) < 1e-6 && Math.abs(gtR(day)) < 1e-6, "số 0 của hai trục ở đường đáy");
  const dvL = tx.filter((t) => !t["text-anchor"] && +t.y < Math.min(...ys) && +t.x < x0), dvR = tx.filter((t) => t["text-anchor"] === "end" && +t.y < Math.min(...ys) && +t.x > x1);
  assert.ok(dvL.length === 1 && dvR.length === 1, "hai trục ghi đơn vị");
  const nd = namDuoi(svg, day), hcn = tags(svg, "rect"), cot = hcn.filter((r) => num(r, "y") <= day), lg = hcn.filter((r) => num(r, "y") > day);
  assert.ok(cot.length >= 3 && lg.length === 1 && cot.every((r) => r.fill === lg[0].fill), "các cột cùng màu với ô chú giải");
  const tenCot = chuGiaiCua(svg, lg)[0].ten;
  const vCot = cot.map((r) => {
    assert.ok(close(num(r, "y") + num(r, "height"), day), "cột đứng trên đường đáy");
    const cx = num(r, "x") + num(r, "width") / 2, d = tx.filter((t) => t["text-anchor"] === "middle" && Math.abs(+t.x - cx) < 0.051 && Math.abs(+t.y - (num(r, "y") - 6)) < 0.051);
    assert.equal(d.length, 1, "mỗi cột một số ngay trên đỉnh"); const v = val(d[0].t); khop(gtL, num(r, "y"), v, "cột");
    const n = nd.filter((t) => Math.abs(+t.x - cx) < 0.051); assert.equal(n.length, 1, "cột nào cũng có năm ở dưới");
    return { nam: +n[0].t, v, cx };
  }).sort((a, b) => a.nam - b.nam);
  const pl = tags(svg, "polyline"); assert.equal(pl.length, 1, "một đường");
  const lgL = tags(svg, "line").filter((l) => l.stroke === pl[0].stroke && ngang(l) && num(l, "y1") > day); assert.equal(lgL.length, 1, "đường có chú giải");
  const tenDuong = tx.filter((t) => close(+t.y, num(lgL[0], "y1") + 5) && Math.abs(+t.x - (num(lgL[0], "x2") + 6)) < 0.051); assert.equal(tenDuong.length, 1);
  const ci = tags(svg, "circle"), p = pts(pl[0].points);
  assert.equal(p.length, vCot.length, "mỗi năm một điểm của đường");
  const vDuong = p.map(([x, y], i) => {
    assert.ok(Math.abs(x - vCot[i].cx) < 0.051, "điểm của đường ở giữa cột cùng năm");
    assert.equal(ci.filter((c) => Math.abs(+c.cx - x) < 0.051 && Math.abs(+c.cy - y) < 0.051 && c.fill === pl[0].stroke).length, 1, "chấm tròn ở mỗi điểm");
    const d = tx.filter((t) => t["text-anchor"] === "middle" && Math.abs(+t.x - x) < 0.051 && Math.abs(+t.y - (y - 8)) < 0.051);
    assert.equal(d.length, 1, "mỗi điểm một số ngay trên"); const v = val(d[0].t); khop(gtR, y, v, "điểm của đường");
    return { nam: vCot[i].nam, v };
  });
  return { cot: { ten: tenCot, donVi: dvL[0].t, v: vCot.map(({ nam, v }) => ({ nam, v })) }, duong: { ten: tenDuong[0].t, donVi: dvR[0].t, v: vDuong } };
};
// câu nhiều lựa chọn xét từng lựa chọn bằng luật (biểu thức chữ → hàm tính trên số liệu): lựa chọn nào cũng khớp đúng một luật, đúng một
// lựa chọn đúng; trả về lựa chọn đúng (so với o[0])
const dungMot = (q, LUAT) => {
  const dung = q.o.filter((o) => { const l = LUAT.map(([re, f]) => [re.exec(o), f]).filter(([m]) => m); assert.equal(l.length, 1, "lựa chọn nào cũng có đúng một luật: " + o); return l[0][1](l[0][0]); });
  assert.equal(dung.length, 1, "đúng một lựa chọn đúng: " + JSON.stringify(dung)); return dung[0];
};
/* ---------- trình tự thời gian (bảng ngày tháng theo Lịch sử 12 in năm 2026) ----------
   Mỗi sự kiện: [chữ nhận ra trong ô sắp xếp hay trong ý đúng/sai, ngày dạng YYYY-MM-DD, YYYY-MM hay YYYY để so, cách ghi ngày như sách
   (ghi trong lời giải), trang in]. Câu sắp xếp tính lại bằng bảng này; Bài 12–13 chép từ tests/lichsu-diali12-gk2.js để dò ngày tháng của
   câu sắp xếp kho giữa kì II ở đề “Ôn chủ đề” (rút chung câu ôn của kho này). */
const SU_KIEN = [
  // Bài 12 (tr. 74–76)
  ["sang Nhật Bản", "1905-01", "1905", 74], ["Điền – Quế – Việt liên minh", "1908", "1908", 74], ["Phan Châu Trinh sang Pháp", "1911", "1911", 74],
  ["Việt Nam Quang phục hội", "1912-01", "1912", 74], ["Đảng Cộng sản Pháp", "1920", "1920", 74], ["Hội Liên hiệp thuộc địa", "1921", "1921", 74],
  ["đến Liên Xô", "1923-06", "6 – 1923", 75], ["Hội Liên hiệp các dân tộc bị áp bức", "1925-07", "7 – 1925", 75], ["OSS", "1945-04", "4 – 1945", 76],
  // Bài 13 (tr. 77–80)
  ["Chỉ thị Kháng chiến kiến quốc", "1945-11-25", "25 – 11 – 1945", 77], ["Hiệp định Sơ bộ", "1946-03-06", "6 – 3 – 1946", 78],
  ["Tạm ước Việt – Pháp", "1946-09-14", "14 – 9 – 1946", 78], ["Liên minh nhân dân Việt – Miên – Lào", "1951", "1951", 78],
  ["Hiệp định Giơ-ne-vơ", "1954-07-21", "21 – 7 – 1954", 79], ["Hiệp định Pa-ri", "1973-01-27", "27 – 1 – 1973", 80],
  // Bài 14 (tr. 82–85)
  ["thành viên Liên hợp quốc", "1977-09-20", "20 – 9 – 1977", 82], ["Hội đồng tương trợ kinh tế", "1978", "1978", 83],
  ["Nghị định thư thiết lập quan hệ ngoại giao", "1995-08-05", "5 – 8 – 1995", 84], ["Đối tác chiến lược toàn diện", "2023", "2023", 85],
  // Bài 15 (tr. 91–92)
  ["Trường Dục Thanh", "1910-08", "8 – 1910", 91], ["Hội nghị Véc-xai", "1919", "1919", 92], ["rời Pháp sang Liên Xô", "1923-06", "6 – 1923", 92],
  ["về nước, trực tiếp lãnh đạo", "1941-01-28", "28 – 1 – 1941", 92]
];
const suKien = (s) => { const m = SU_KIEN.filter(([k]) => s.toLowerCase().includes(k.toLowerCase())); assert.equal(m.length, 1, "không nhận ra đúng một sự kiện: " + s); return m[0]; };
const theoThoiGian = (q) => { const sk = q.o.map(suKien); sk.forEach(([, , ghi]) => coX(q, ghi)); assert.equal(new Set(sk.map((s) => s[1])).size, sk.length, "các sự kiện khác ngày nhau");
  return [...q.o].sort((a, b) => (suKien(a)[1] < suKien(b)[1] ? -1 : 1)); };

/* ---------- các câu cần tính ----------
   id: ls1, ls2 (Lịch sử Đề 1, 2), dl1, dl2 (Địa lí Đề 1, 2); has: đoạn chữ có trong đúng một câu của môn. right(q) trả đáp án tính được
   (số, lựa chọn đúng, thứ tự đúng của câu sắp xếp, hoặc mảng 4 ý của câu đúng/sai, null ở ý không tính bằng code); essay(q) kiểm tra câu
   tự luận (thang chấm, bài gợi ý). */
const nam = (o) => Object.keys(o).map(Number).sort((a, b) => a - b);
const tangLT = (a) => a.every((v, i) => !i || v > a[i - 1]), giamLT = (a) => a.every((v, i) => !i || v < a[i - 1]);
const theoNam = (day) => Object.fromEntries(day.map((p) => [p.nam, p.v]));
const CHECKS = [
  // ---- Lịch sử ----
  { id: "ls1", has: "Sắp xếp theo trình tự thời gian các sự kiện sau trong cuộc đời hoạt động của Hồ Chí Minh", right: theoThoiGian },
  { id: "ls2", has: "Sắp xếp theo trình tự thời gian các mốc sau trong quan hệ đối ngoại của Việt Nam sau năm 1975", right: theoThoiGian },
  { id: "ls1", has: "nhằm bảo vệ chủ quyền lãnh thổ, biển đảo", essay: (q) => {
    coThang(q, "biên giới đất liền", "vịnh Bắc Bộ", "Lào, Cam-pu-chia", "môi trường ổn định", "luật pháp quốc tế"); coX(q, "vịnh Bắc Bộ", "đàm phán, thương lượng"); } },
  { id: "ls2", has: "học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh", essay: (q) => {
    coThang(q, "việc làm thứ nhất", "việc làm thứ hai", "Giải thích: những phẩm chất của Người", "hoàn thiện bản thân"); coX(q, "giản dị", "trung thực", "hoàn thiện bản thân"); } },
  // ---- Địa lí, Đề 1 ----
  { id: "dl1", has: "tốc độ tăng trưởng khối lượng hàng hoá vận chuyển bằng đường bộ và đường thuỷ nội địa", right: (q) => {
    const c = docDuong(q.svg, "%"), B = theoNam(c["Đường bộ"]), T = theoNam(c["Đường thuỷ nội địa"]), ns = nam(B), dau = ns[0], cuoi = ns[ns.length - 1];
    assert.ok(B[dau] === 100 && T[dau] === 100 && new RegExp("năm " + dau + " = 100%").test(q.svg), "năm gốc " + dau + " = 100%");
    const LUAT = [
      [/^Khối lượng của đường bộ tăng nhanh hơn đường thuỷ nội địa$/, () => B[cuoi] > T[cuoi]],
      [/^Khối lượng của đường thuỷ nội địa tăng nhanh hơn đường bộ$/, () => T[cuoi] > B[cuoi]],
      [/^Năm (\d{4}), khối lượng của đường bộ gấp hơn (\d+) lần năm (\d{4})$/, (m) => B[m[1]] / B[m[3]] > +m[2]],
      [/^Khối lượng của đường thuỷ nội địa giảm qua các năm$/, () => giamLT(ns.map((n) => T[n]))]
    ];
    coX(q, `lên ${vn(B[cuoi])}%`, `lên ${vn(T[cuoi])}%`, `gấp ${vn(B[cuoi] / B[dau])} lần`, "(" + ns.slice(1).map((n) => vn(T[n]) + "%").join(", ") + ")"); return dungMot(q, LUAT); } },
  { id: "dl1", has: "Tỉ lệ che phủ rừng của tỉnh N", right: (q) => {
    const [dt] = so(q.q, "diện tích tự nhiên # triệu ha"), [r] = so(q.q, "trong đó # nghìn ha là rừng"), d = dt * 1000, v = (r / d) * 100;
    assert.equal(q.unit, "%"); coX(q, `${vn(dt)} triệu ha = ${vn(d)} nghìn ha`, `${vn(r)} : ${vn(d)} × 100 = ${vn(v)}`); return v; } },
  { id: "dl1", has: "sản lượng điện mặt trời của tỉnh K", right: (q) => {
    const c = theoNam(docCot(q.svg, "Tỉ kWh")), [n0] = y(q.q, /lấy năm (\d{4}) = 100%/).slice(1), [n1] = y(q.q, /của tỉnh K năm (\d{4}) là bao nhiêu phần trăm/).slice(1), v = (c[n1] / c[n0]) * 100;
    assert.equal(q.unit, "%"); coX(q, `${vn(c[n1])} : ${vn(c[n0])} × 100 = ${vn(v)}`); return v; } },
  { id: "dl1", has: "số lượt khách du lịch (cột) và doanh thu du lịch (đường) của tỉnh V", right: (q) => {
    const c = docKetHop(q.svg), C = theoNam(c.cot.v), D = theoNam(c.duong.v), ns = nam(C);
    assert.ok(c.cot.donVi === "Triệu lượt" && c.duong.donVi === "Nghìn tỉ đồng", "đơn vị hai trục");
    const [n1, n2] = y(q.o[0], /^Năm (\d{4}), số lượt khách giảm so với năm (\d{4})\.$/).slice(1);
    const [a2, b2] = y(q.o[1], /^Doanh thu du lịch năm (\d{4}) gấp đôi năm (\d{4})\.$/).slice(1);
    const [a3, b3] = y(q.o[2], /^Doanh thu bình quân mỗi lượt khách năm (\d{4}) thấp hơn năm (\d{4})\.$/).slice(1);
    assert.ok(/^Số lượt khách năm sau luôn nhiều hơn năm trước\.$/.test(q.o[3]));
    // nghìn tỉ đồng chia triệu lượt ra triệu đồng mỗi lượt
    coX(q, `${vn(C[n2])} triệu lượt xuống ${vn(C[n1])} triệu lượt`, `${vn(D[a2])} : ${vn(D[b2])} = ${vn(D[a2] / D[b2])}`, `${vn(D[b3])} : ${vn(C[b3])} = ${vn(D[b3] / C[b3])} (triệu đồng`,
      `${vn(D[a3])} : ${vn(C[a3])} ≈ ${vn(lam(D[a3] / C[a3], 1))} (triệu đồng`);
    return [C[n1] < C[n2], gan(D[a2] / D[b2], 2), D[a3] / C[a3] < D[b3] / C[b3], tangLT(ns.map((n) => C[n]))]; } },
  { id: "dl1", has: "cần khai thác tự nhiên một cách hợp lí", essay: (q) => {
    coThang(q, "thế mạnh tự nhiên", "khó khăn", "hướng thứ nhất", "hướng thứ hai"); coX(q, "thuỷ lợi", "rừng ngập mặn", "biến đổi khí hậu"); } },
  { id: "dl1", has: "bằng khoảng bao nhiêu phần trăm của Biển Đông", right: (q) => {
    // số liệu của sách (Bài 33): Biển Đông 3,447 triệu km², vùng biển Việt Nam khoảng 1 triệu km²
    const [bd] = so(q.q, "Biển Đông có diện tích khoảng # triệu km²"), [vb] = so(q.q, "vùng biển Việt Nam rộng khoảng # triệu km²"), v = (vb / bd) * 100;
    assert.ok(bd === 3.447 && vb === 1 && /làm tròn đến hàng đơn vị/.test(q.q), "số liệu của sách, đề ghi cách làm tròn");
    assert.equal(q.unit, "%"); coX(q, `${vn(vb)} : ${vn(bd)} × 100 ≈ ${vn(lam(v, 2))} ≈ ${vn(lam(v, 0))}`); return lam(v, 0); } },
  // ---- Địa lí, Đề 2 ----
  { id: "dl2", has: "thuê bao điện thoại di động trên 100 dân", right: (q) => {
    const [d, t] = so(q.q, "có # nghìn dân và # nghìn thuê bao điện thoại di động"), v = (t / d) * 100;
    assert.equal(q.unit, "thuê bao"); coX(q, `${vn(t)} : ${vn(d)} × 100 = ${vn(v)}`); return v; } },
  { id: "dl2", has: "sản lượng thuỷ sản khai thác và nuôi trồng của tỉnh L", right: (q) => {
    const c = docCot(q.svg, "Nghìn tấn"), ns = nam(c), K = ns.map((n) => c[n]["Khai thác"]), N = ns.map((n) => c[n]["Nuôi trồng"]), k = K.length - 1;
    const LUAT = [
      [/^Sản lượng nuôi trồng tăng nhanh hơn sản lượng khai thác$/, () => N[k] / N[0] > K[k] / K[0]],
      [/^Sản lượng khai thác tăng nhanh hơn sản lượng nuôi trồng$/, () => K[k] / K[0] > N[k] / N[0]],
      [/^Năm (\d{4}), sản lượng nuôi trồng lớn hơn sản lượng khai thác$/, (m) => c[m[1]]["Nuôi trồng"] > c[m[1]]["Khai thác"]],
      [/^Sản lượng khai thác năm (\d{4}) gấp đôi năm (\d{4})$/, (m) => Math.abs(c[m[1]]["Khai thác"] / c[m[2]]["Khai thác"] - 2) < 0.05]
    ];
    coX(q, `từ ${vn(N[0])} lên ${vn(N[k])} nghìn tấn`, `từ ${vn(K[0])} lên ${vn(K[k])} nghìn tấn (gấp ${vn(K[k] / K[0])} lần)`, `gấp khoảng ${vn(lam(N[k] / N[0], 1))} lần`); return dungMot(q, LUAT); } },
  { id: "dl2", has: "cơ cấu diện tích cây công nghiệp lâu năm của tỉnh Y", right: (q) => {
    const c = docTron(q.svg), [t1, t2] = [so(q.q, "năm 2015 là # nghìn ha")[0], so(q.q, "năm 2024 là # nghìn ha")[0]];
    const [p1, p2] = [c[2015]["Điều"], c[2024]["Điều"]], a = (t1 * p1) / 100, b = (t2 * p2) / 100, v = b - a;
    assert.equal(q.unit, "nghìn ha"); coX(q, `${vn(t1)} × ${vn(p1)} : 100 = ${vn(a)}`, `${vn(t2)} × ${vn(p2)} : 100 = ${vn(b)}`, `${vn(b)} − ${vn(a)} = ${vn(v)}`); return v; } },
  { id: "dl2", has: "cơ cấu diện tích gieo trồng của tỉnh C", right: (q) => {
    const c = docMien(q.svg), L = c["Lúa"], Q = c["Cây ăn quả"], K = c["Cây khác"], ns = nam(L);
    assert.ok(/^Năm nào lúa cũng có tỉ trọng lớn nhất\.$/.test(q.o[0]));
    const [tu, den] = y(q.o[1], /^Cây ăn quả tăng nhiều điểm phần trăm hơn cây khác trong giai đoạn (\d{4}) – (\d{4})\.$/).slice(1);
    const [n3] = y(q.o[2], /^Năm (\d{4}), tỉ trọng cây khác lớn hơn tỉ trọng cây ăn quả\.$/).slice(1);
    assert.ok(/^Tỉ trọng lúa giảm, tỉ trọng cây ăn quả tăng liên tục\.$/.test(q.o[3]));
    coX(q, ns.map((n) => L[n] + "%").join(", "), `tăng ${Q[den] - Q[tu]} điểm phần trăm (${Q[tu]}% lên ${Q[den]}%)`, `tăng ${K[den] - K[tu]} điểm phần trăm (${K[tu]}% lên ${K[den]}%)`,
      `cây khác chiếm ${K[n3]}%, cây ăn quả chiếm ${Q[n3]}%`, ns.map((n) => Q[n] + "%").join(" → "));
    return [ns.every((n) => L[n] > Q[n] && L[n] > K[n]), Q[den] - Q[tu] > K[den] - K[tu], K[n3] > Q[n3], giamLT(ns.map((n) => L[n])) && tangLT(ns.map((n) => Q[n]))]; } },
  { id: "dl2", has: "phát triển kinh tế biển, đảo đối với việc bảo vệ chủ quyền", essay: (q) => {
    coThang(q, "tiền tiêu", "Luật Biển năm 1982", "(DOC)", "(COC)"); coX(q, "biện pháp hoà bình", "Luật Biển năm 1982", "tuyến phòng thủ tiền tiêu"); } }
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
        assert.ok(gan(q.ans, want), "đáp án " + q.ans + ", tính được " + want);
        assert.ok(Math.abs(q.ans * 100 - Math.round(q.ans * 100)) < 1e-9, "đáp án quá hai chữ số thập phân");
        assert.ok(q.tol === undefined, "đáp án chính xác, không cần sai số");
      } else if (q.type === "tf4") {
        assert.ok(Array.isArray(want) && want.length === 4, "câu đúng/sai 4 ý: right trả mảng 4 ý");
        assert.ok(want.filter((w) => w !== null).length >= 2, "câu đúng/sai 4 ý: tính lại ít nhất hai ý");
        want.forEach((w, i) => w === null || assert.strictEqual(q.a[i], w, "ý " + "abcd"[i] + ": đáp án " + q.a[i] + ", tính được " + w));
      } else if (q.type === "order") {
        assert.deepEqual(q.o, want, "thứ tự " + JSON.stringify(q.o) + ", tính được " + JSON.stringify(want));
      } else {
        assert.strictEqual(q.o[0], want, "đáp án " + q.o[0] + ", tính được " + want); assert.ok(!q.o.slice(1).includes(want), "nhiễu trùng đáp án đúng");
      }
    }
  } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
  daKiem.add(q); n++;
});
// ý đúng/sai “A trước B” của câu Lịch sử: so ngày của hai sự kiện theo bảng; lời giải ghi ngày của cả hai
LS.kho.filter((q) => q.type === "tf4").forEach((q) => q.o.forEach((o, i) => {
  const m = /^(.+) diễn ra trước (.+)\.$/.exec(o); if (!m) return;
  const a = suKien(m[1]), b = suKien(m[2]);
  assert.equal(q.a[i], a[1] < b[1], `“${o}”: ${a[2]} và ${b[2]}`); coX(q, a[2], b[2]); n++; daKiem.add(q);
}));
// câu trả lời bằng số, câu có hình, câu sắp xếp, câu tự luận nào cũng phải được tính lại, đọc lại ở trên
MON.forEach((m) => m.kho.filter((q) => q.svg || q.type === "num" || q.type === "essay" || q.type === "order").forEach((q) => assert.ok(daKiem.has(q), "chưa có kiểm tra cho câu " + ten.get(q) + ": " + q.q.slice(0, 60))));
MON.forEach((m) => m.kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + ten.get(q))));
assert.equal(LS.kho.filter((q) => q.svg).length, 0, "Lịch sử: không có hình");
{
  const loai = (kind) => DL.kho.filter((q) => q.svg && LOAI_HINH.get(q.svg) === kind).length;
  ["cột", "tròn", "đường", "miền", "kết hợp"].forEach((k) => assert.ok(loai(k) >= 1, "Địa lí: có biểu đồ " + k));
  DL.DE.forEach((id) => assert.ok(DL.kho.filter((q) => q.src === id && q.svg).length >= 2, id + ": ít nhất hai câu có biểu đồ"));
}

/* ---------- chữ ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || [], (q.rubric || []).map((c) => c.c)).map(String);
// 34 đơn vị hành chính cấp tỉnh (Nghị quyết 202/2025/QH15; Địa lí 12 in năm 2026, Bài 1) và 6 vùng kinh tế – xã hội (Nghị quyết 252/2025/QH15)
const TINH = ["Hà Nội", "Huế", "Hải Phòng", "Đà Nẵng", "Cần Thơ", "Thành phố Hồ Chí Minh", "Lai Châu", "Điện Biên", "Sơn La", "Lạng Sơn", "Quảng Ninh",
  "Thanh Hoá", "Nghệ An", "Hà Tĩnh", "Cao Bằng", "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ", "Bắc Ninh", "Hưng Yên", "Ninh Bình", "Quảng Trị",
  "Quảng Ngãi", "Gia Lai", "Khánh Hoà", "Lâm Đồng", "Đắk Lắk", "Đồng Nai", "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang"];
assert.equal(TINH.length, 34);
// tỉnh, thành phố của 6 vùng kinh tế – xã hội (Địa lí 12 in năm 2026, Bài 24, 25, 27, 28, 30, 31)
const VUNG_TINH = { "Trung du và miền núi phía Bắc": ["Lai Châu", "Điện Biên", "Sơn La", "Lào Cai", "Phú Thọ", "Tuyên Quang", "Cao Bằng", "Lạng Sơn", "Thái Nguyên"],
  "Đồng bằng sông Hồng": ["Hà Nội", "Hải Phòng", "Hưng Yên", "Ninh Bình", "Bắc Ninh", "Quảng Ninh"], "Bắc Trung Bộ": ["Huế", "Thanh Hoá", "Nghệ An", "Hà Tĩnh", "Quảng Trị"],
  "Duyên hải Nam Trung Bộ và Tây Nguyên": ["Đà Nẵng", "Quảng Ngãi", "Gia Lai", "Đắk Lắk", "Khánh Hoà", "Lâm Đồng"], "Đông Nam Bộ": ["Thành phố Hồ Chí Minh", "Đồng Nai", "Tây Ninh"],
  "Đồng bằng sông Cửu Long": ["Cần Thơ", "Vĩnh Long", "Đồng Tháp", "An Giang", "Cà Mau"] };
assert.deepEqual(Object.values(VUNG_TINH).flat().sort(), [...TINH].sort(), "34 tỉnh, thành phố chia đủ cho 6 vùng");
// địa danh ghi kèm tỉnh trong ngoặc “Hà Tiên (An Giang)”: tỉnh có trong 34 đơn vị; câu hỏi “thuộc …” của vùng nào thì đáp án đúng ở vùng đó
const TINH_CUA = (s) => [...String(s).matchAll(/\((\p{Lu}[\p{L}]*(?: \p{Lu}[\p{L}]*)*)\)/gu)].map((x) => x[1]).filter((t) => !/^(?:Trung Quốc|Anh|Pháp|Nam Trung Bộ|SEV|MICE|DOC|COC|EVFTA|RCEP)$/.test(t));
// tên tỉnh đã nhập năm 2025 (không viết như tỉnh hiện nay)
const TINH_CU = ["Hà Giang", "Yên Bái", "Bắc Kạn", "Vĩnh Phúc", "Hoà Bình", "Bắc Giang", "Thái Bình", "Hải Dương", "Hà Nam", "Nam Định", "Quảng Bình",
  "Quảng Nam", "Kon Tum", "Bình Định", "Phú Yên", "Ninh Thuận", "Bình Thuận", "Đắk Nông", "Bà Rịa – Vũng Tàu", "Bà Rịa - Vũng Tàu", "Bình Dương", "Bình Phước",
  "Long An", "Tiền Giang", "Bến Tre", "Trà Vinh", "Hậu Giang", "Sóc Trăng", "Bạc Liêu", "Kiên Giang", "Thừa Thiên Huế"];
MON.forEach((m) => m.kho.forEach((q) => {
  const at = ten.get(q) + ": " + q.q.slice(0, 50);
  chu(q).forEach((s) => {
    // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân (năm viết liền: 2025)
    assert.ok(!/(?<![,\d])\d{5,}/.test(s) && !/(?<![,\d])\d{4}(?![\d ])/.test(s.replace(/\b(?:1[89]|20)\d{2}\b/g, "")) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s);
    // dấu thanh kiểu sách (hoá, thuỷ, hoà, khoẻ, tuỳ)
    assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|lũy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s);
    // địa danh theo đơn vị hành chính hiện nay: không “huyện”, “cấp huyện”, “63 tỉnh”; tỉnh đã nhập chỉ ghi kèm “nay thuộc …”
    assert.ok(!/(?<![\p{L}])(?:huyện|63 tỉnh|64 tỉnh)(?![\p{L}])/iu.test(s), at + ": đơn vị hành chính cũ: " + s);
    // tên nhà máy thuỷ điện giữ như sách (thuỷ điện Hoà Bình), Thái Bình Dương, sông Thái Bình (“sông Hồng, Thái Bình”) không phải tên tỉnh
    if (m === DL) TINH_CUA(s).forEach((t) => assert.ok(TINH.includes(t), at + ": tỉnh trong ngoặc không có trong 34 đơn vị: " + t));
    const s2 = s.replace(/(?:[Cc]hiến dịch|thuỷ điện) Hoà Bình|Thái Bình Dương|sông (?:Hồng, )?Thái Bình/g, "");
    TINH_CU.forEach((t) => { if (s2.includes(t)) assert.ok(new RegExp(escRe(t) + " \\(nay (?:thuộc|là) ").test(s2), at + ": tên tỉnh cũ “" + t + "” không ghi tên mới"); });
    [...s.matchAll(/(?:tỉnh|thành phố) (\p{Lu}[\p{L}]*(?: \p{Lu}[\p{L}]*)*)/gu)].forEach((x) => assert.ok(TINH.includes(x[1]) || TINH.includes("Thành phố " + x[1]) || /^\p{Lu}$/u.test(x[1]) || /^Hồ Chí Minh$/.test(x[1]), at + ": tên tỉnh, thành phố không có trong 34 đơn vị: " + x[0]));
  });
  if (q.type === "num" && q.unit) assert.ok(q.unit.length <= 9, at + ": đơn vị ngắn");
}));
// Lịch sử: ngày tháng viết như sách (“6 – 3 – 1946”, “tháng 6 – 1923”), không “6/3/1946”, “6-3-1946” (tỉ số như “189/193” thì được)
LS.kho.forEach((q) => chu(q).forEach((s) => assert.ok(!/(?<!\d)\d{1,2}\/\d{1,2}(?!\d)(?:\/\d{4})?|\b\d{1,2}-\d{1,2}-\d{4}\b|\d – \d{1,2}\/|tháng \d{1,2}\/\d{4}/.test(s), ten.get(q) + ": ngày tháng viết như sách (“6 – 3 – 1946”): " + s)));
// Địa lí: vùng kinh tế – xã hội gọi đúng tên của sách in năm 2026; câu kể tỉnh của một vùng thì đúng tỉnh của vùng đó
DL.kho.forEach((q) => chu(q).forEach((s) => assert.ok(!/vùng (?:kinh tế – xã hội )?(?:Tây Nguyên|Duyên hải Nam Trung Bộ(?! và Tây Nguyên))/.test(s) && !/(?:7|bảy) vùng kinh tế/.test(s), ten.get(q) + ": tên vùng theo 6 vùng kinh tế – xã hội: " + s)));
DL.kho.filter((q) => q.type === "mc" && /^(?:Lai Châu|Lạng Sơn|Đồng Nai|Cần Thơ|Quảng Ngãi)/.test(q.o[0])).forEach((q) => {
  const v = Object.keys(VUNG_TINH).find((k) => q.q.includes(k)) || Object.keys(VUNG_TINH).find((k) => q.x.includes(k)) || (/Chợ nổi Cái Răng/.test(q.q) ? "Đồng bằng sông Cửu Long" : /lọc dầu/.test(q.q) ? "Duyên hải Nam Trung Bộ và Tây Nguyên" : null);
  assert.ok(v && q.o[0].split(/ và |, /).every((t) => VUNG_TINH[v].includes(t)), ten.get(q) + ": đáp án là tỉnh của " + v); n++;
});

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
  // chủ đề ôn đúng chữ chủ đề của kho giữa kì II; chủ đề mới không trùng kho giữa kì II, cuối kì I; phần trọng tâm nhiều câu hơn phần ôn
  const cu1 = new Set(m.ck1.map((q) => q.topic)), cu2 = new Set(m.gk2.map((q) => q.topic));
  CHU_DE.forEach((t) => assert.ok(m.ON_T.includes(t) ? cu2.has(t) && !cu1.has(t) : !cu1.has(t) && !cu2.has(t), m.ma + ": " + (m.ON_T.includes(t) ? "chủ đề ôn không đúng chữ kho giữa kì II: " : "chủ đề mới trùng kho cũ: ") + t));
  assert.ok(m.ON_T.length >= 1 && sum(m.ON_T.map((t) => sum(M[t]))) * 2 < m.pool.n, m.ma + ": phần trọng tâm nhiều câu hơn hẳn phần ôn");
  m.DE.forEach((id) => {
    const qs = m.kho.filter((q) => q.src === id);
    assert.deepEqual([...new Set(qs.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, đúng thứ tự");
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t));
    // lời dặn: sách, phạm vi; số câu mỗi phần (tính từ ma trận); trường học khác phạm vi; câu cuối rồi câu về đề chung của Sở
    const note = bank(id).note;
    assert.ok(note.startsWith(m.DAU + m.PHAN[0][0]), id + ": lời dặn mở đầu bằng sách, phạm vi");
    m.PHAN.forEach(([p, tu, den]) => { const k = sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))); assert.ok(note.includes(p + " " + k + " câu"), id + ": lời dặn ghi “" + p + " " + k + " câu”"); });
    assert.equal(sum(m.PHAN.map(([, tu, den]) => sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))))), m.pool.n, m.ma + ": các phần của lời dặn phủ hết ma trận");
    m.SAU.forEach((x) => assert.ok(note.includes(x), id + ": lời dặn có “" + x + "”"));
    assert.ok(note.endsWith(m.CUOI + " " + SO), id + ": lời dặn kết thúc bằng “" + m.CUOI + "” rồi câu về đề chung của Sở");
  });
  // chủ đề đúng tên bài trong mục lục (README của cuốn ở OnUp-Book); tên chủ đề, phần của lời dặn đúng mục lục
  const readme = path.join(BOOK, "lop-12", m.sach, "README.md");
  if (fs.existsSync(readme)) {
    const md = fs.readFileSync(readme, "utf8"), ml = Object.fromEntries([...md.matchAll(/Bài (\d+)[.:] ([^|*·]+?) \|/g)].map((x) => [+x[1], x[2].trim()]));
    m.BAI.forEach(([t, b]) => assert.equal(m.RUT_GON[t] || t, ml[b], m.ma + ": tên Bài " + b + " theo mục lục"));
    m.PHAN.forEach(([p]) => { const c = /^(Chủ đề|Phần) (\d+) ([^(,]+?)(?: \(|,)/.exec(p); assert.ok(c && md.includes((c[1] === "Phần" ? "PHẦN" : c[1]) + " " + c[2] + ". " + c[3].toUpperCase()), m.ma + ": tên " + p.slice(0, 20) + " theo mục lục"); });
    // bài thực hành trong phạm vi không ra chủ đề riêng
    const [tu, den] = /Bài (\d+)–(\d+)/.exec(m.PHAM_VI).slice(1).map(Number);
    for (let b = tu; b <= den; b++) assert.ok(/^Thực hành/.test(ml[b] || "") === !m.BAI.some((x) => x[1] === b), m.ma + ": Bài " + b + (m.BAI.some((x) => x[1] === b) ? " là bài thực hành" : " không phải bài thực hành mà thiếu chủ đề"));
  }
  // dạng câu theo khung Công văn 7991: nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn (số), tự luận tự chấm; Lịch sử có thêm câu sắp xếp sự kiện
  assert.ok(m.kho.every((q) => (m === LS ? ["mc", "tf4", "order", "essay"] : ["mc", "tf4", "num", "essay"]).includes(q.type)), m.ma + ": dạng câu");
  const dem = (f) => m.kho.filter(f).length;
  if (m === DL) assert.ok(dem((q) => q.type === "num") >= 4, m.ma + ": ít nhất 4 câu trả lời ngắn đáp án là số");
  if (m === LS) assert.ok(dem((q) => q.type === "order") <= 2, m.ma + ": nhiều nhất 2 câu sắp xếp");
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
  // lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án
  m.kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
  // câu sắp xếp: 4 ô, mỗi ô là một sự kiện trong bảng ngày tháng
  m.kho.filter((q) => q.type === "order").forEach((q) => assert.ok(q.o.length === 4 && /theo trình tự thời gian/.test(q.q), "câu sắp xếp 4 sự kiện theo trình tự thời gian: " + ten.get(q)));
  // câu nhiều lựa chọn: đáp án đúng không dài hơn hẳn lựa chọn sai, các lựa chọn không trùng nhau, đáp án đúng không là lựa chọn duy nhất có
  // chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), mc = m.kho.filter((q) => q.type === "mc");
  mc.forEach((q) => {
    const L = Math.max(...q.o.slice(1).map((o) => o.length));
    assert.ok(q.o.length === 4 && q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q) + " " + q.q.slice(0, 50));
    assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 50));
    const c = chuThuong(q.topic.replace(/\s*\([^)]*\)$/, "")), tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|sau|từ|đến|năm)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề: ${ten.get(q)} ${q.q.slice(0, 60)}`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    assert.ok(!(dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”: " + ten.get(q));
  });
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn
  const le = mc.filter((q) => { const L = q.o.map((o) => o.length); return L[0] > Math.max(...L.slice(1)) || L[0] < Math.min(...L.slice(1)); });
  assert.ok(le.length * 3 <= mc.length && le.length * 6 >= mc.length, `${m.ma}: đáp án đúng dài nhất hoặc ngắn nhất ở ${le.length}/${mc.length} câu: ` + le.map((q) => ten.get(q)).join(", "));
  m.le = le.length + "/" + mc.length;
  // đáp án đúng của câu nhiều lựa chọn không trùng đáp án đúng của câu nào ở kho cuối kì I, giữa kì II
  const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
  const daCu = new Set(m.ck1.concat(m.gk2).filter((q) => q.type === "mc").map((q) => goc(q.o[0])));
  mc.forEach((q) => assert.ok(!daCu.has(goc(q.o[0])), m.ma + ": đáp án trùng một câu của kho cuối kì I, giữa kì II: " + ten.get(q)));
  // câu ôn không trùng đề bài, chuỗi 6 từ của đề bài, đáp án câu cùng chủ đề của kho giữa kì II (chuỗi 6 từ: bỏ dấu, như so với sách, ở dưới)
  m.kho.filter((q) => m.ON_T.includes(q.topic)).forEach((q) => m.gk2.filter((p) => p.topic === q.topic).forEach((p) => {
    assert.ok(goc(q.q) !== goc(p.q), ten.get(q) + ": đề bài trùng " + ten.get(p));
    if (q.type === "mc" && p.type === "mc") assert.ok(goc(q.o[0]) !== goc(p.o[0]), ten.get(q) + ": đáp án trùng " + ten.get(p));
    if (q.type === "num" && p.type === "num") assert.ok(!gan(q.ans, p.ans), ten.get(q) + ": đáp án số trùng " + ten.get(p));
    m.trungOn = (m.trungOn || []).concat([[q, p]]);
  }));

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

/* ---------- so với kho cuối kì I, giữa kì II cùng môn: đề bài không gần trùng ----------
   Cặp hai âm tiết liền nhau (Rút ra N25; như tests/sinhhoc-ktpl12-gk2.js): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của kho
   cuối kì I, giữa kì II và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung
   của đề (CUM) và cặp có ở từ 3% số câu của file. */
{
  const CUM = ["mỗi ý sau đúng hay sai", "nhận xét nào sau đây đúng", "số liệu tự đặt", "theo trình tự thời gian", "sự kiện sớm nhất đứng đầu"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const gan_ = [];
  MON.forEach((m) => {
    const ca = BANKS.filter((b) => b.file === m.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), df = {};
    ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
    const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && !(df[c] >= 0.03 * ca.length))); };
    m.kho.forEach((q) => { const c = capAm(q); m.ck1.concat(m.gk2).forEach((p) => { const d = capAm(p), chung = [...c].filter((x) => d.has(x)); if (chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`); }); });
  });
  assert.deepEqual(gan_, [], "đề bài gần trùng câu của kho cuối kì I, giữa kì II");
}


/* ---------- danh sách dùng khi dò lộ đáp án và so chữ với sách ---------- */
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["xã hội chủ", "hội chủ nghĩa", "nước xã hội", "các nước xã", "và các nước", "của nhân dân", "nền kinh tế", "thực dân pháp",
  "việt nam dân", "nam dân chủ", "dân chủ cộng", "chủ cộng hoà", "nước việt nam", "trung hoa dân", "hoa dân quốc", "văn hoá xã", "hoá xã hội",
  "khoa học công", "học công nghệ", "để phát triển", "phát triển của", "nhất cả nước", "của cả nước", "tăng liên tục"]);
// chuỗi 3 từ chung của Bài 14–17, Bài 28–33 (thuật ngữ, tên riêng hay gặp): không làm lộ đáp án nào
["chủ nghĩa xã", "nghĩa xã hội", "dân tộc và", "độc lập dân", "lập dân tộc", "của việt nam", "hồ chí minh", "chủ tịch hồ", "tịch hồ chí", "giải phóng dân",
  "phóng dân tộc", "xây dựng đất", "dựng đất nước", "cộng đồng quốc", "đồng quốc tế", "người yêu nước", "của cách mạng", "vấn đề dân", "đề dân tộc",
  "cam pu chia", "liên xô và", "quan hệ ngoại", "hệ ngoại giao", "bạn bè quốc", "bè quốc tế", "của người", "đồng bằng sông", "bằng sông cửu",
  "sông cửu long", "nam trung bộ", "đông nam bộ", "và tây nguyên", "duyên hải nam", "hải nam trung", "trung bộ và", "bộ và tây", "lời kêu gọi",
  "chí minh và", "ô nhiễm môi", "nhiễm môi trường", "cây ăn quả", "sự giúp đỡ", "giúp đỡ của", "của cả hai", "đường thuỷ nội", "thuỷ nội địa", "hàng xuất khẩu",
  "cuộc kháng chiến", "giúp nước ta", "quốc tế về", "để chuẩn bị", "du lịch có", "tăng nhanh hơn", "khỏi tình trạng", "trong các vùng"].forEach((c) => CUM_CHUNG.add(c));
// đã xem (Phiên N12-ck2-lichsu-diali): chữ chung, câu kia không nói tới điều câu này hỏi. Ý về sản lượng nuôi trồng của Đồng
// bằng sông Cửu Long không cho biết sản lượng của tỉnh L tăng nhanh hay chậm; Quảng Ngãi ở lời giải câu đặc khu (Lý Sơn) và là lựa chọn sai của
// câu cà phê, không nói tới nhà máy lọc dầu; Đồng Nai ở câu thuỷ điện là tên sông; “hướng đi của” Nguyễn Tất Thành không nói tới năm 1959.
const DA_XEM = [
  "ls1#14 → ls2#22: hướng đi của", "dl1#19 → dl2#6: sản lượng nuôi",
  "dl1#19 → dl2#6: lượng nuôi trồng", "dl1#7 → dl2#7: quảng ngãi", "dl2#8 → dl2#7: quảng ngãi", "dl2#9 → dl2#13: đồng nai"
];
// cặp câu cùng chủ đề ôn của kho này và kho giữa kì II (đề “Ôn chủ đề” rút chung) đã xem tay: “Kiên trì mục tiêu độc lập dân tộc và chủ nghĩa xã
// hội” là lựa chọn sai của hai câu Bài 11 kho giữa kì II; “chính trị, văn hoá” ở câu kia là chữ chung; biểu đồ tốc độ tăng trưởng không cho biết
// loại hình vận tải có khối lượng lớn nhất; “nhờ thị trường lớn” ở lời giải câu thương mại nói về bán lẻ trong nước, không nói tới thuế xuất
// khẩu; Lạng Sơn, Lào Cai là lựa chọn sai của câu kia.
const DA_XEM_CHU_DE = [
  "gk2-ls1#11 → ls1#2: kiên trì mục", "gk2-ls1#11 → ls1#2: trì mục tiêu", "gk2-ls1#11 → ls1#2: mục tiêu độc", "gk2-ls1#11 → ls1#2: tiêu độc lập",
  "gk2-ls1#11 → ls1#2: tộc và chủ", "gk2-ls1#11 → ls1#2: và chủ nghĩa", "gk2-ls2#11 → ls1#2: kiên trì mục", "gk2-ls2#11 → ls1#2: trì mục tiêu",
  "gk2-ls2#11 → ls1#2: mục tiêu độc", "gk2-ls2#11 → ls1#2: tiêu độc lập", "gk2-ls2#11 → ls1#2: tộc và chủ", "gk2-ls2#11 → ls1#2: và chủ nghĩa",
  "gk2-ls1#10 → ls2#2: trị văn hoá", "dl1#2 → gk2-dl1#4: đường bộ", "gk2-dl2#11 → dl1#3: thị trường lớn", "gk2-dl2#15 → dl2#4: lạng sơn",
  "dl1#4 → gk2-dl2#15: lào cai", "dl2#4 → gk2-dl2#15: lào cai"
];
// tên riêng nhiều chữ (tổ chức, văn kiện, sự kiện, hội nghị, chương trình, địa danh, vùng, ngư trường, công trình, ngành): mỗi tên tính là
// một từ khi so với chữ của sách và của kho khác (như tests/lichsu-diali12-ck1.js)
const GOP = [
  // Lịch sử, Bài 10–11
  "Đại hội đại biểu toàn quốc lần thứ VI", "Đại hội đại biểu toàn quốc lần thứ VII", "Đại hội đại biểu toàn quốc lần thứ VIII", "Đại hội đại biểu toàn quốc lần thứ IX",
  "Đại hội đại biểu toàn quốc lần thứ X", "Đại hội đại biểu toàn quốc lần thứ XI", "Đại hội đại biểu toàn quốc lần thứ XII", "Đại hội đại biểu toàn quốc lần thứ XIII",
  "Đại hội đại biểu toàn quốc", "Đảng Cộng sản Việt Nam", "Ba chương trình kinh tế lớn", "Cương lĩnh xây dựng đất nước trong thời kì quá độ lên chủ nghĩa xã hội",
  "Chiến lược ổn định và phát triển kinh tế – xã hội", "Nhà nước pháp quyền xã hội chủ nghĩa", "kinh tế thị trường định hướng xã hội chủ nghĩa",
  "đường dây 500 kV Bắc – Nam", "đường dây 500 kV", "cao tốc Thành phố Hồ Chí Minh – Trung Lương", "Trung Lương", "Tổ chức Thương mại Thế giới", "Liên hợp quốc",
  "Hội đồng Bảo an", "Hội đồng Nhân quyền", "Diễn đàn Hợp tác kinh tế châu Á – Thái Bình Dương", "Hiệp hội các quốc gia Đông Nam Á", "Cộng đồng ASEAN",
  "Mục tiêu Phát triển Thiên niên kỉ", "Chỉ số Đổi mới sáng tạo toàn cầu", "COVID-19", "Việt Nam",
  // Lịch sử, Bài 12–13
  "Phan Bội Châu", "Phan Châu Trinh", "Nguyễn Ái Quốc", "Hồ Chí Minh", "Phong trào Đông du", "Duy tân hội", "Việt Nam Quang phục hội", "Điền – Quế – Việt liên minh",
  "Đông Á Đồng minh hội", "Hội Liên hiệp thuộc địa", "Hội Liên hiệp các dân tộc bị áp bức", "Quốc tế Cộng sản", "Đảng Cộng sản Pháp", "Đảng Cộng sản Đông Dương",
  "Đảng Cộng sản Trung Quốc", "Đảng Xã hội Pháp", "Việt Nam Cách mạng thanh niên", "Mặt trận Việt Minh", "Việt Minh", "Việt Nam Cách mạng đồng minh hội",
  "Cơ quan Tình báo chiến lược Mỹ", "Trung Hoa Dân quốc", "Việt Nam Dân chủ Cộng hoà", "Chỉ thị Kháng chiến kiến quốc", "Hiệp định Sơ bộ", "Tạm ước Việt – Pháp",
  "Hội nghị Phông-ten-nơ-blô", "Phông-ten-nơ-blô", "Liên minh nhân dân Việt – Miên – Lào", "Hội nghị Giơ-ne-vơ", "Hiệp định Giơ-ne-vơ", "Giơ-ne-vơ", "Hội nghị Pa-ri",
  "Hiệp định Pa-ri", "Pa-ri", "Mặt trận Dân tộc giải phóng miền Nam Việt Nam", "Chính phủ cách mạng lâm thời Cộng hoà miền Nam Việt Nam", "Cộng hoà miền Nam Việt Nam",
  "Việt Nam Cộng hoà", "Đại hội đồng Liên hợp quốc", "Liên Xô", "Trung Quốc", "Nhật Bản", "Thái Lan", "Quảng Châu", "Miến Điện", "Mã Lai", "In-đô-nê-xi-a",
  "Cam-pu-chia", "Đông Dương", "Đông Nam Á", "Á, Phi, Mỹ La-tinh", "Mỹ La-tinh", "Cách mạng tháng Tám năm 1945", "Cách mạng tháng Tám", "Chiến tranh thế giới thứ hai",
  "Chiến tranh thế giới thứ nhất",
  // Địa lí, Bài 20–27: vùng, địa danh, công trình, ngư trường, cảng, khu du lịch, mỏ
  "Trung du và miền núi phía Bắc", "Đồng bằng sông Hồng", "Bắc Trung Bộ", "Duyên hải Nam Trung Bộ và Tây Nguyên", "Đông Nam Bộ", "Đồng bằng sông Cửu Long",
  "Thành phố Hồ Chí Minh", "Hà Nội", "Hải Phòng", "Đà Nẵng", "Cần Thơ", "Huế", "Thanh Hoá", "Nghệ An", "Hà Tĩnh", "Quảng Trị", "Quảng Ninh", "Hưng Yên", "Ninh Bình",
  "Bắc Ninh", "Lai Châu", "Điện Biên", "Sơn La", "Lào Cai", "Phú Thọ", "Tuyên Quang", "Cao Bằng", "Lạng Sơn", "Thái Nguyên", "Khánh Hoà", "Lâm Đồng",
  "đường sắt Thống Nhất", "quốc lộ 1", "đường Hồ Chí Minh", "Nội Bài", "Tân Sơn Nhất", "Long Thành", "Cái Mép – Thị Vải", "Lạch Huyện", "Nghi Sơn", "Vũng Áng",
  "Hòn La", "Chân Mây", "Cửa Lò", "Sầm Sơn", "Thiên Cầm", "Lăng Cô", "Phong Nha – Kẻ Bàng", "Mẫu Sơn", "Sa Pa", "Hồ Ba Bể", "Hồ Núi Cốc", "Tân Trào",
  "Mộc Châu", "Điện Biên Phủ", "Thác Bản Giốc", "Hạ Long", "Vịnh Hạ Long", "Cát Bà", "Tràng An", "Tam Đảo", "Hải Phòng – Quảng Ninh", "Vịnh Bắc Bộ",
  "Hoàng Liên Sơn", "Trường Sơn Bắc", "sông Đà", "sông Hồng", "sông Thái Bình", "sông Đồng Nai", "sông Mê Công", "Hoà Bình", "Sơn La", "Lai Châu", "Tuyên Quang",
  "Thác Bà", "Bản Chát", "Huội Quảng", "Biển Đông", "Trung Quốc", "Lào", "Cam-pu-chia", "Liên minh châu Âu", "Hoa Kỳ", "Hàn Quốc",
  "Cảng Hải Phòng", "Đình Vũ", "Hải Hà", "Vân Đồn", "Cẩm Phả", "Hòn Gai", "Uông Bí", "Mạo Khê", "Quỳnh Lập", "Thạch Khê", "Cổ Định", "Nhật Lệ", "Bãi Cháy",
  "Nam Côn Sơn", "Cộng hoà Nhân dân Trung Hoa", "Uỷ ban Giám sát quốc tế", "châu Á – Thái Bình Dương", "vị trí địa lí",
  // tên khu vực kinh tế như sách Địa lí 12 (như tests/lichsu-diali12-ck1.js)
  "nông nghiệp, lâm nghiệp và thuỷ sản", "công nghiệp và xây dựng",
  // Lịch sử, Bài 14–17
  "Hội đồng tương trợ kinh tế", "Phong trào Không liên kết", "Hiệp hội các quốc gia Đông Nam Á", "Hiệp định Thương mại tự do Việt Nam – EU",
  "Hiệp định Đối tác kinh tế toàn diện Khu vực", "Đối tác chiến lược toàn diện", "Uỷ viên không thường trực Hội đồng Bảo an", "Hoa Kỳ", "Ma-lai-xi-a",
  "Phi-líp-pin", "Phi-lip-pin", "Nguyễn Tất Thành", "Nguyễn Sinh Cung", "Nguyễn Sinh Sắc", "Hoàng Thị Loan", "Văn Ba", "Trường Dục Thanh", "Phan Thiết",
  "Trường Quốc học Huế", "Hội nghị Véc-xai", "Véc-xai", "Lê-nin", "Hội Việt Nam Cách mạng Thanh niên", "Việt Nam Quốc dân đảng",
  "Đội Việt Nam Tuyên truyền Giải phóng quân", "Uỷ ban Dân tộc giải phóng Việt Nam", "Đại hội Quốc dân", "Đảng Lao động Việt Nam",
  "Hội nghị lần thứ 8 Ban Chấp hành Trung ương Đảng Cộng sản Đông Dương", "Ban Chấp hành Trung ương Đảng", "Ban Chấp hành Trung ương Đảng Cộng sản Đông Dương", "Hội nghị Trung ương 15", "Quốc hội khoá I", "Quốc hội khoá VI",
  "Tuyên ngôn Độc lập", "Lời kêu gọi toàn quốc kháng chiến", "Chính cương vắn tắt", "Sách lược vắn tắt", "Cương lĩnh chính trị đầu tiên",
  "Lăng Chủ tịch Hồ Chí Minh", "Bảo tàng Hồ Chí Minh", "Chủ tịch Hồ Chí Minh", "UNESCO", "Sài Gòn – Gia Định", "Thành phố Hồ Chí Minh",
  // Địa lí, Bài 28–33
  "Nam Trung Bộ", "Tây Nguyên", "Quảng Ngãi", "Gia Lai", "Đắk Lắk", "Tây Ninh", "Đồng Nai", "Vĩnh Long", "Đồng Tháp", "An Giang", "Cà Mau",
  "Phú Quý", "Lý Sơn", "Côn Đảo", "Phú Quốc", "Côn Sơn", "Tân Rai", "Nhân Cơ", "Sư Tử Đen", "Sư Tử Trắng", "Dung Quất", "Vân Phong", "Nhơn Hội",
  "Phú Mỹ", "Nhơn Trạch", "Lan Tây", "Lan Đỏ", "Na Dương", "An Khánh", "Cát Tiên", "Bù Gia Mập", "Tràm Chim", "U Minh Thượng", "Mũi Cà Mau",
  "Cái Răng", "Phụng Hiệp", "Hà Tiên", "vịnh Thái Lan", "Ấn Độ Dương", "Robusta", "Arabica",
  "Công ước của Liên hợp quốc về Luật Biển năm 1982", "Tuyên bố về ứng xử của các bên ở Biển Đông", "Bộ quy tắc ứng xử ở Biển Đông"
];
// cụm từ chung của môn: tên bài, tên chủ đề, cách nói chuẩn của đề (thay bằng dấu ngăn trước khi so)
const TU_CHUNG = [...LS.BAI, ...DL.BAI].map((b) => b[0]).concat(Object.values(LS.RUT_GON), Object.values(DL.RUT_GON), ["mỗi ý sau đúng hay sai",
  "Sắp xếp các sự kiện sau theo trình tự thời gian", "sự kiện sớm nhất đứng đầu", "Nhận xét nào sau đây đúng", "Cho biểu đồ", "Theo biểu đồ", "số liệu tự đặt",
  "làm tròn kết quả đến hàng đơn vị", "làm tròn kết quả đến một chữ số thập phân", "Công cuộc Đổi mới ở Việt Nam từ năm 1986 đến nay",
  "Lịch sử đối ngoại của Việt Nam thời cận – hiện đại", "Địa lí các ngành kinh tế", "Địa lí các vùng kinh tế – xã hội", "vùng kinh tế – xã hội",
  "Em hãy nêu ý kiến của em về",
  // Lịch sử, Bài 10–11: tên đường lối, chủ trương, bài học của công cuộc Đổi mới, các quyền dân tộc cơ bản, tên công trình, chức danh như sách
  "hội nhập kinh tế quốc tế", "chủ động, tích cực hội nhập quốc tế toàn diện và sâu rộng", "cơ chế quản lí kinh tế tập trung quan liêu, bao cấp",
  "tập trung quan liêu, bao cấp", "cơ chế thị trường có sự quản lí của Nhà nước", "Kiên trì mục tiêu độc lập dân tộc và chủ nghĩa xã hội",
  "Đổi mới toàn diện, đồng bộ, có bước đi, hình thức và cách làm phù hợp", "Kết hợp sức mạnh dân tộc với sức mạnh thời đại", "Kết hợp sức mạnh dân tộc và sức mạnh thời đại",
  "phát huy vai trò chủ động, sáng tạo của nhân dân", "phát huy quyền làm chủ của nhân dân", "tôn trọng quy luật khách quan", "xuất phát từ thực tiễn",
  "Nhà nước pháp quyền xã hội chủ nghĩa", "đẩy mạnh công nghiệp hoá, hiện đại hoá đất nước", "công nghiệp hoá, hiện đại hoá", "kinh tế thị trường định hướng xã hội chủ nghĩa",
  "kinh tế tri thức", "hiệp định thương mại tự do thế hệ mới", "nền văn hoá tiên tiến, đậm đà bản sắc dân tộc", "vừa là mục tiêu, vừa là động lực",
  "nền kinh tế mở, hội nhập với khu vực và thế giới", "quốc sách hàng đầu", "giáo dục – đào tạo và khoa học – công nghệ", "đối tác chiến lược, đối tác toàn diện",
  "chế độ tem phiếu", "độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ", "độc lập, chủ quyền, thống nhất, toàn vẹn lãnh thổ",
  "chủ quyền, độc lập, thống nhất và toàn vẹn lãnh thổ", "chủ quyền, độc lập, thống nhất, toàn vẹn lãnh thổ", "Đường dây tải điện 500 kV Bắc – Nam",
  "Đường dây truyền tải điện 500 kV Bắc – Nam", "Trưởng ban Nghiên cứu về Đông Dương",
  // Địa lí: tên chỉ tiêu thống kê, nhóm hàng, ngành công nghiệp, cặp thuật ngữ như sách
  "vị trí địa lí và điều kiện tự nhiên", "cơ cấu giá trị sản xuất", "giá trị sản xuất công nghiệp", "giá trị sản xuất",
  "tổng mức bán lẻ hàng hoá và doanh thu dịch vụ tiêu dùng", "tổng trị giá xuất nhập khẩu", "trị giá xuất khẩu", "trị giá nhập khẩu",
  "Hàng điện tử, máy tính và linh kiện", "sản xuất sản phẩm điện tử, máy vi tính", "cơ sở vật chất – kĩ thuật", "cơ sở hạ tầng", "trữ lượng thuỷ năng",
  // Lịch sử, Bài 14–17: tên chủ đề, giai đoạn cuộc đời Hồ Chí Minh, định hướng đối ngoại, câu nói, tên văn kiện như sách
  "Hồ Chí Minh trong lịch sử Việt Nam", "Thời niên thiếu và những hoạt động đầu tiên", "Những năm tháng hoạt động ở nước ngoài",
  "Trực tiếp lãnh đạo cách mạng Việt Nam", "Không có gì quý hơn độc lập, tự do", "Bản Yêu sách của nhân dân An Nam", "Yêu sách của nhân dân An Nam",
  "hợp tác, bình đẳng, cùng có lợi", "không phân biệt chế độ chính trị – xã hội", "tư tưởng, đạo đức, phong cách Hồ Chí Minh",
  "học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh", "Luận cương về vấn đề dân tộc và thuộc địa",
  "bảo vệ Tổ quốc từ sau tháng 4 – 1975", "kháng chiến chống thực dân Pháp", "kháng chiến chống Mỹ, cứu nước", "kháng chiến chống Mỹ",
  "hoạt động đối ngoại của Việt Nam", "Em hãy giải thích vì sao", "làm tròn đến hàng đơn vị",
  // Địa lí, Bài 28–33: tên chỉ tiêu, tên nhóm cây, nhóm ngành, bài như sách
  "tỉ lệ che phủ rừng", "cây công nghiệp lâu năm", "thuỷ sản khai thác", "thuỷ sản nuôi trồng", "du lịch sông nước, miệt vườn",
  "tổng hợp kinh tế biển", "đảm bảo quốc phòng, an ninh", "Biển Đông và các đảo, quần đảo", "năng lượng tái tạo",
  "khối lượng hàng hoá vận chuyển", "tốc độ tăng trưởng"]);
// khẩu hiệu, phương châm, tên văn kiện trong ngoặc kép như sách: không tính là chép sách
const TRICH = [];

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Như tests/lichsu-diali12-ck1.js. Đề ngẫu nhiên rút câu ở mọi ô, đề “Ôn chủ đề” rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi
   cặp câu cùng môn, trừ cặp có câu tự luận nằm cùng một ô rút 1 câu. Đáp án là số (trả lời ngắn, lựa chọn đúng dạng “25%”; từ hai chữ số, hoặc
   số thập phân) tìm ở vị trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”, “đạt”; không tính số đứng trước một phép tính) cùng
   đơn vị: không được có. Đáp án bằng chữ (lựa chọn đúng của câu nhiều lựa chọn) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống
   thì lấy cả đáp án); chuỗi có trong đề bài, lựa chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. Ô của
   câu sắp xếp: hai ô liền nhau theo đúng thứ tự có ở câu sắp xếp kia thì in ra để xem tay. */
const DON_VI = "(?:triệu tấn\\.km|triệu tấn|nghìn tấn|nghìn tỉ đồng|tỉ đồng|tỉ kWh|tỉ USD|nghìn thuê bao|nghìn con|nghìn người|triệu người|nghìn ha|triệu lượt|triệu đồng|triệu km²|thuê bao|MW|tạ\\/ha|tấn\\/ha|km|năm|lần|%)";
const soDV = new RegExp("^(" + NUM + ")(?: ?(" + DON_VI + "))?$", "u");
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được|đạt))\\s+(" + NUM + ")(?![\\d,])(?!\\s*[·+−:×](?:\\s|\\d|\\())(?: ?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => ({ v: val(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const doLo = (qs, M, tenCau) => {
  const lo = [], chuLo = [], cungLuc = (p, q) => p !== q && (p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2);
  qs.forEach((q) => {
    let soDa = [], C = [];
    if (q.type === "num") soDa = [{ v: q.ans, u: q.unit || "" }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: val(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]); C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)]; } }
    else if (q.type === "order") C = q.o.slice(1).map((o, i) => [q.o[i], o]);
    soDa = soDa.filter((d) => Math.abs(d.v) >= 10 || !Number.isInteger(d.v));
    qs.forEach((p) => {
      if (!cungLuc(p, q)) return;
      const at = `${tenCau(p)} → ${tenCau(q)}: `, T = " " + chu(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chu(p).flatMap(kqSo).some((yy) => gan(yy.v, d.v) && (!yy.u || !d.u || yy.u === d.u))).forEach((d) => lo.push(at + vn(d.v) + " " + d.u));
      if (q.type === "order") { if (p.type === "order") C.forEach(([a, b]) => { const i = p.o.indexOf(a); if (i >= 0 && p.o[i + 1] === b) chuLo.push(at + a + " → " + b); }); return; }
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
// Lịch sử: ngày tháng của câu về trình tự thời gian (câu sắp xếp, ý “A diễn ra trước B”), ghi như sách, có ở câu kia thì lộ thứ tự
const ngayCua = (q) => [...new Set((q.type === "order" ? q.o : q.type === "tf4" ? q.o.flatMap((o) => { const m = /^(.+) diễn ra trước (.+)\.$/.exec(o); return m ? [m[1], m[2]] : []; }) : []).map((d) => suKien(d)[2]))];
const coNgay = (s, g) => new RegExp("(?<![\\d,]|[\\d,] )" + escRe(g) + "(?!\\d)").test(s);
const loNgay = (qs, M, tenCau) => {
  const cungLuc = (p, q) => p !== q && (p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2), ra = [];
  qs.forEach((q) => ngayCua(q).forEach((g) => qs.forEach((p) => { if (cungLuc(p, q) && chu(p).some((s) => coNgay(s, g))) ra.push(`${tenCau(p)} → ${tenCau(q)}: ngày ${g}`); })));
  return ra;
};
// lời dặn của đề cũng là chữ học sinh thấy cùng lúc với mọi câu của đề
const lo = [], chuLo = [];
MON.forEach((m) => {
  const ghi = m.DE.map((id) => { const g = { topic: "lời dặn", type: "note", q: bank(id).note, x: "" }; ten.set(g, "lời dặn " + id); return g; });
  const r = doLo(m.kho.concat(ghi), m.M, (q) => ten.get(q)); lo.push(...r.lo); chuLo.push(...r.chuLo);
});
lo.push(...loNgay(LS.kho, LS.M, (q) => ten.get(q)));
// câu cùng chủ đề ôn của kho này và kho giữa kì II: đề “Ôn chủ đề” rút chung (trừ câu tự luận); chỉ xét cặp một câu mỗi kho
const loChuDe = [], chuLoChuDe = [];
MON.forEach((m) => m.ON_T.forEach((t) => {
  const qs = m.kho.concat(m.gk2).filter((q) => q.topic === t && q.type !== "essay"), MM = { [t]: [9, 9, 9] };
  const hai = (s) => { const [a, b] = s.split(": ")[0].split(" → "); return a.startsWith("gk2-") !== b.startsWith("gk2-"); };
  const r = doLo(qs, MM, (q) => ten.get(q)); loChuDe.push(...r.lo.filter(hai)); chuLoChuDe.push(...r.chuLo.filter(hai));
  if (m === LS) loChuDe.push(...loNgay(qs, MM, (q) => ten.get(q)).filter(hai));
}));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n") + "\nCâu cùng chủ đề ôn với kho giữa kì II (xem tay):\n" + [...new Set(chuLoChuDe)].join("\n"));
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual([...new Set(chuLoChuDe)], DA_XEM_CHU_DE, "đáp án bằng chữ có ở câu cùng chủ đề của kho giữa kì II đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM_CHU_DE");
assert.deepEqual(lo.concat(loChuDe), [], "lộ đáp án:\n" + lo.concat(loChuDe).join("\n"));

/* ---------- không chép sách: so với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm, gộp tên riêng nhiều chữ), nếu có OnUp-Book ----------
   Tên riêng nhiều chữ (GOP) tính là một từ; cụm từ chung của môn (TU_CHUNG: tên bài, cách nói chuẩn của đề) thay bằng dấu ngăn; câu trích
   nguyên văn (TRICH) không tính. Chuỗi so phải có ít nhất 5 từ có chữ. */
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const boDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP_ = GOP.map(boDau).sort((a, b) => b.length - a.length), TU_CHUNG_ = TU_CHUNG.map((p) => " " + boDau(p) + " ").sort((a, b) => b.length - a.length);
const khongDau = (s) => {
  let t = " " + boDau(TRICH.reduce((x, c) => x.split(c).join(" | "), String(s).normalize("NFC"))) + " ";
  TU_CHUNG_.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  GOP_.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); });
  return t.replace(/[aeiouy]+/g, "a").replace(/\s+/g, " ").trim();
};
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const tatCa = MON.flatMap((m) => m.kho);
if (SACH.length) {
  MON.forEach((m) => assert.ok(SACH.some((f) => f.includes(path.join("lop-12", m.sach))), "OnUp-Book có " + m.sach));
  const sach = new Set(), them = (t, k) => { const w = t.split(" ").filter(Boolean); for (let i = 0; i + k <= w.length; i++) sach.add(k + ":" + w.slice(i, i + k).join(" ")); };
  SACH.forEach((f) => { const t = khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")); them(t, 8); if (process.env.DO_SACH) them(t, 6); });
  const bao = (k) => tatCa.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.has(k + ":" + c)).map((c) => `${ten.get(q)}: ${c}`)));
  // DO_SACH8=1: in các đoạn liền của mỗi trường chữ nằm trong chuỗi 8 từ trùng sách (dạng đã bỏ dấu, gộp nguyên âm), để viết lại
  if (process.env.DO_SACH8) tatCa.forEach((q) => chu(q).forEach((s, f) => { const w = khongDau(s).split(" ").filter(Boolean), dau = new Array(w.length).fill(0);
    for (let i = 0; i + 8 <= w.length; i++) { const c = w.slice(i, i + 8); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5 && sach.has("8:" + c.join(" "))) for (let j = i; j < i + 8; j++) dau[j] = 1; }
    const r = []; let cur = []; w.forEach((x, i) => { if (dau[i]) cur.push(x); else if (cur.length) { r.push(cur.join(" ")); cur = []; } }); if (cur.length) r.push(cur.join(" "));
    if (r.length) console.log(ten.get(q) + " [" + ["q", "x"].concat((q.o || []).map((_, k) => "o" + k), q.unit ? ["unit"] : [], (q.rubric || []).map((_, k) => "r" + k))[f] + "] " + r.join(" … ")); }));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // lời dặn của đề cũng không chép sách
  const notes = MON.flatMap((m) => m.DE.map((id) => [id, bank(id).note])).flatMap(([id, t]) => chuoi(t, 8).filter((c) => sach.has("8:" + c)).map((c) => id + ": " + c));
  assert.deepEqual([...new Set(notes)], [], "lời dặn có chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả kho cuối kì I cùng file và câu riêng của
   các đề ngẫu nhiên; với kho cuối kì I cùng môn: đề bài không có chuỗi 6 từ nào trùng (Rút ra N9-gk1-toan) ---------- */
{
  const cua = (b, q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const ngoai = (b) => !MON.some((m) => m.DE.includes(b.id) || m.pool === b);
  const khac = BANKS.filter((b) => !b.pool && ngoai(b)).flatMap((b) => b.questions.map((q) => cua(b, q)))
    .concat(BANKS.filter((b) => b.pool && ngoai(b)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => tatCa.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
  const gan6 = MON.flatMap((m) => { const ck1 = m.ck1.concat(m.gk2).map((q) => " " + khongDau(q.q) + " "); return m.kho.flatMap((q) => chuoi(q.q, 6).filter((c) => ck1.some((s) => s.includes(" " + c + " "))).map((c) => ten.get(q) + ": " + c)); });
  assert.deepEqual([...new Set(gan6)], [], "đề bài có chuỗi 6 từ trùng câu của kho cuối kì I, giữa kì II");
  // câu ôn: đề bài không có chuỗi 6 từ nào trùng đề bài câu cùng chủ đề của kho giữa kì II
  const on6 = MON.flatMap((m) => (m.trungOn || []).flatMap(([q, p]) => chuoi(q.q, 6).filter((c) => (" " + khongDau(p.q) + " ").includes(" " + c + " ")).map((c) => ten.get(q) + " ~ " + ten.get(p) + ": " + c)));
  assert.deepEqual([...new Set(on6)], [], "câu ôn có chuỗi 6 từ trùng đề bài câu cùng chủ đề của kho giữa kì II");
}
/* ---------- tự thử: bộ dò lộ đáp án, bộ đọc hình bắt được chỗ cố ý viết sai ---------- */
{
  const tim = (has) => { const r = tatCa.filter((q) => q.q.includes(has)); assert.equal(r.length, 1, "tự thử: cần đúng một câu có “" + has + "”"); return r[0]; };
  const gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const r = doLo(qs, Object.assign({}, LS.M, DL.M), (q) => q.q.slice(0, 40)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  // số ở vị trí kết quả của câu kia, cùng đơn vị: lộ; số không ở vị trí kết quả: không lộ; tên tỉnh của đáp án có ở câu kia: in ra để xem
  const thueBao = tim("thuê bao điện thoại di động trên 100 dân"), naDuong = tim("Nhà máy nhiệt điện than Na Dương thuộc tỉnh nào");
  assert.deepEqual(thuLo([thueBao, gia(naDuong, "Mỗi 100 dân của tỉnh có 128 thuê bao (đạt 128 thuê bao).")]), ["128 thuê bao"]);
  assert.deepEqual(thuLo([thueBao, gia(naDuong, "Tỉnh có 128 trạm phát sóng.")]), []);
  assert.deepEqual(thuLo([naDuong, gia(thueBao, "Nhà máy Na Dương ở Lạng Sơn.")]), ["lạng sơn"]);
  const xep = LS.kho.filter((q) => q.type === "order"), [x1, x2] = xep;
  assert.equal(xep.length, 2, "tự thử: hai câu sắp xếp");
  // hai ô liền nhau đúng thứ tự có ở câu sắp xếp kia: báo ở cả hai chiều
  assert.deepEqual(thuLo([x1, Object.assign({}, x2, { o: [x1.o[1], x1.o[2], x2.o[0], x2.o[1]] })]), [x1.o[1] + " → " + x1.o[2], x1.o[1] + " → " + x1.o[2]]);
  // ngày tháng của câu về trình tự thời gian có ở câu kia (chỉ ghi năm 1995 thì không tính là ngày 5 – 8 – 1995)
  const thuNgay = (qs) => loNgay(qs, LS.M, (q) => q.q.slice(0, 40)).map((s) => s.replace(/^.*: /, ""));
  const hdba = tim("hai lần được bầu làm Uỷ viên không thường trực"), doiTen = tim("Quốc hội khoá VI quyết định đặt tên");
  assert.ok(x2.o.some((o) => o.includes("Nghị định thư")) && x1.o.some((o) => o.includes("Véc-xai")), "tự thử: hai câu sắp xếp");
  assert.deepEqual(thuNgay([x2, gia(hdba, "Hai nước kí Nghị định thư ngày 5 – 8 – 1995.")]), ["ngày 5 – 8 – 1995"]);
  assert.deepEqual(thuNgay([x2, gia(hdba, "Năm 1995 có nhiều sự kiện.")]), []);
  assert.deepEqual(thuNgay([x1, gia(doiTen, "Năm 1919, Người gửi bản Yêu sách.")]), ["ngày 1919"]);
  // lời dặn của đề cũng được dò: số kết quả của câu có ở lời dặn thì báo
  assert.deepEqual(thuLo([thueBao, { topic: "lời dặn", type: "note", q: "Tỉnh P đạt 128 thuê bao trên 100 dân.", x: "" }]), ["128 thuê bao"]);
  // đổi một số ghi trên hình (số liệu, phần trăm) thì bộ đọc báo lỗi
  const hinh = (has) => tim(has).svg, doi = (svg, lab, moi) => { assert.ok(svg.includes(">" + lab + "<"), "hình có số " + lab); return svg.replace(">" + lab + "<", ">" + moi + "<"); };
  const tron = hinh("cơ cấu diện tích cây công nghiệp lâu năm của tỉnh Y"), v1 = Object.values(Object.values(docTron(tron))[0])[0];
  assert.throws(() => docTron(doi(tron, vn(v1) + "%", vn(v1 + 4) + "%")));
  const cot = hinh("sản lượng điện mặt trời của tỉnh K"), v2 = docCot(cot, "Tỉ kWh")[1].v;
  assert.throws(() => docCot(doi(cot, vn(v2), vn(v2 + 2)), "Tỉ kWh"));
  const cot2 = hinh("sản lượng thuỷ sản khai thác và nuôi trồng của tỉnh L"), v3 = docCot(cot2, "Nghìn tấn")[2015]["Khai thác"];
  assert.throws(() => docCot(doi(cot2, vn(v3), vn(v3 + 3)), "Nghìn tấn"));
  const duong = hinh("tốc độ tăng trưởng khối lượng hàng hoá vận chuyển bằng đường bộ"), d = docDuong(duong, "%")["Đường bộ"], v4 = d[d.length - 1].v;
  assert.throws(() => docDuong(doi(duong, vn(v4), vn(v4 + 20)), "%"));
  const mien = hinh("cơ cấu diện tích gieo trồng của tỉnh C"), v5 = Object.values(docMien(mien)["Cây ăn quả"])[0];
  assert.throws(() => docMien(doi(mien, vn(v5), vn(v5 + 5))));
  const kh = hinh("số lượt khách du lịch (cột) và doanh thu du lịch (đường)"), v6 = docKetHop(kh).cot.v[1].v;
  assert.throws(() => docKetHop(doi(kh, vn(v6), vn(v6 + 40))));
  // bảng ngày tháng: đảo hai ô của câu sắp xếp thì không còn đúng thứ tự
  assert.notDeepEqual([x1.o[1], x1.o[0], ...x1.o.slice(2)], theoThoiGian(x1));
  assert.notDeepEqual([x2.o[1], x2.o[0], ...x2.o.slice(2)], theoThoiGian(x2));
}
MON.forEach((m) => console.log(`${m.ten} 12 cuối năm: kho ${m.kho.length} câu (${m.DE.length} đề cố định, ${m.pool.n} câu mỗi đề), ma trận 10 – 8 – 7 trên ${Object.keys(m.M).length} chủ đề (ôn ${m.ON_T.length} chủ đề của kho giữa kì II, ${sum(m.ON_T.map((t) => sum(m.M[t])))} câu mỗi đề); ` +
  `${m.kho.filter((q) => q.type === "tf4").length} câu đúng/sai 4 ý, ${m.kho.filter((q) => q.type === "num").length} câu trả lời ngắn, ${m.kho.filter((q) => q.type === "order").length} câu sắp xếp, ${m.kho.filter((q) => q.type === "essay").length} câu tự luận; đáp án đúng dài nhất hoặc ngắn nhất ở ${m.le} câu nhiều lựa chọn.`));
console.log("Địa lí 12: " + DL.kho.filter((q) => q.svg).length + " câu có biểu đồ (" + [...new Set(DL.kho.filter((q) => q.svg).map((q) => LOAI_HINH.get(q.svg)))].join(", ") + ").");
console.log(n + " câu, ý đã tính lại hoặc đọc lại hình.");
console.log("MATH OK");
