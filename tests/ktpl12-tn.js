// Kiểm tra các đề GDKT&PL thi thử tốt nghiệp THPT (data/banks/12-ktpl.js, ktpl12-tn-de<N>; Phiên N12-tn-ktpl: Đề 1–3; phiên sau thêm đề
// thì mở rộng script này: thêm các mục kiểm tra của đề mới vào RIENG). Đề tính điểm theo khung đề tốt nghiệp THPT từ năm 2025 (Quyết định
// 764/QĐ-BGDĐT; docs/KE-HOACH-NOI-DUNG.md, mục 2 và mục 7). Số đề, số câu lấy từ danh mục.
// Khung: danh mục (tên, khối 12, môn GDKT&PL, file, 50 phút, pts 10, gắn vào tn-thpt-2027); Phần I 24 câu nhiều lựa chọn pt 0,25, Phần II
// 4 câu đúng/sai 4 ý pt 1 (đúng tên part, đúng thứ tự; không có Phần III), Quiz.grade điểm tối đa 6 – 4; phạm vi và mức độ như ma trận đề
// tham khảo năm 2025 (40 lệnh hỏi; đề chính thức năm 2026 giữ cấu trúc): 4 câu GDKT&PL 10 (Phần I, 3 Biết 1 Hiểu), 8 câu GDKT&PL 11 (Phần
// I, 5 Biết 2 Hiểu 1 Vận dụng), 12 câu GDKT&PL 12 ở Phần I (8 Biết 3 Hiểu 1 Vận dụng) và 4 câu ở Phần II (tỉ lệ Biết – Hiểu – Vận dụng
// 4 : 3 : 3: Phần I 16 – 6 – 2; Phần II không có ý Biết, 6 ý Hiểu, 10 ý Vận dụng nên bốn câu ghi mức 2, 2, 3, 3); mỗi đề có đủ 16 bài của
// GDKT&PL 12, mỗi bài một câu, chủ đề đúng chữ của ba kho GDKT&PL 12 (cuối kì I, giữa kì II, cuối năm); Phần II hai câu Phần một (Bài 1–7)
// và hai câu Phần hai (Bài 8–16); câu lớp 10, 11 ghi “Lớp 10 · ”, “Lớp 11 · ” và tên chủ đề của sách (rút gọn cho vừa mã đề “Ôn chủ đề”),
// đối chiếu mục lục trong README của cuốn ở OnUp-Book; trong Phần I câu lớp 10, rồi lớp 11 theo thứ tự chủ đề, rồi lớp 12 theo thứ tự bài;
// Đề 1–3 phủ đủ 9 chủ đề của GDKT&PL 10 và 9 chủ đề của GDKT&PL 11, không bài nào ở Phần II hai lần; mỗi câu Phần II một đoạn thông tin
// hoặc tình huống riêng (người soạn đề viết, 60–170 chữ); từ hai phần ba số câu mỗi đề là câu tình huống; lời dặn ghi số câu, số điểm, số câu
// mỗi lớp tính từ dữ liệu.
// Mỗi câu khớp đúng một mục kiểm tra của đề đó (theo chữ has trong đề bài): câu nhiều lựa chọn so với chữ khoá của đáp án (đúng một lựa chọn
// có chữ đó) hoặc tính lại bằng code (để dành theo tỉ lệ của tổng thu nhập và loại mục tiêu tài chính theo thời gian, khoản để dành mỗi
// tháng của kế hoạch tài chính cá nhân, tỉ lệ lạm phát từ chỉ số giá tiêu dùng và loại lạm phát, tốc độ tăng trưởng GDP, GNI bình quân đầu
// người, mức giảm thu nhập, tuổi bầu cử, ứng cử, kết hôn, thành niên theo bảng LUAT); ý của câu đúng/sai 4 ý so với bảng ý → đúng/sai ghi
// trong script, ý có số tính lại từ số liệu của đoạn thông tin (loại mục tiêu kinh doanh theo thời gian, nơi khoan ngoài lãnh hải 12 hải lí).
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân; dấu thanh kiểu sách “hoá”, “thuỷ”; tên luật như sách in năm 2026, không
// số điều luật, mức phạt, tên cơ quan cũ; tên tỉnh theo 34 đơn vị hành chính; không “huyện”, “63 tỉnh”); kiểu Đ/S không lặp trong một đề,
// mỗi kiểu nhiều nhất ba lần trong các đề thi thử; đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không
// quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn của đề, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn
// sai không cùng mở đầu bằng một chữ mà đáp án đúng không có; lời giải không nhắc vị trí của phương án. So với ba kho GDKT&PL 12 và giữa các
// đề thi thử: đề bài không trùng câu nào trong file, không gần trùng (chuỗi 6 từ; cặp hai âm tiết chung với câu của ba kho), đáp án không
// trùng câu cùng chủ đề. Dò lộ đáp án giữa mọi câu của một đề (đoạn thông tin, lời dặn cùng hiện) và giữa câu cùng chủ đề của các đề thi
// thử và ba kho GDKT&PL 12 (đề “Ôn chủ đề” rút chung): đáp án bằng chữ tách thành chuỗi 3 từ, chuỗi có ở câu kia in ra với DO_LO=1 để xem
// tay, đã xem ghi ở DA_XEM; số của đáp án có ở vị trí kết quả của câu kia. Có ../OnUp-Book thì so mọi trường chữ (cả đoạn thông tin, lời
// dặn) với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm, gộp tên riêng nhiều chữ thành một từ (GOP; không chuỗi 8 từ nào trùng;
// DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác, cả giữa các đề thi thử (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 6 từ). Các bộ
// tính, bộ dò lộ tự thử với câu cố ý viết sai.
// Chạy: node tests/ktpl12-tn.js → in MATH OK.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe().filter((b) => b.questions || !process.env.TAM);
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, EVENTS = ctx.window.ONTAP_SEED_EVENTS;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?";
const val = (s) => { const m = /^[−-]?\d{1,3}(?: \d{3})*(?:,\d+)?$/.exec(String(s).trim()); assert.ok(m, "không đọc được số “" + s + "”"); return +String(s).trim().replace(/ /g, "").replace(",", ".").replace("−", "-"); };
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b));
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const motCai = (q, f, at = "") => { const c = q.o.filter(f); assert.equal(c.length, 1, at + "cần đúng một lựa chọn thoả điều kiện, có " + c.length + ": " + c.join(" | ")); return c[0]; };
// lựa chọn duy nhất có mọi đoạn chữ cho trước (chữ khoá của đáp án theo sách)
const chon = (q, ...has) => motCai(q, (o) => has.every((h) => o.includes(h)));
// ý của câu đúng/sai 4 ý có chữ “…”: trả lời bằng bảng tên ý → đúng/sai (hàm: tính bằng code)
const yCo = (q, has) => { const i = q.o.findIndex((o) => o.includes(has)); assert.ok(i >= 0, "không thấy ý có “" + has + "”"); assert.equal(q.o.filter((o) => o.includes(has)).length, 1, "nhiều ý có “" + has + "”"); return i; };
const traY = (q, bang) => { const r = q.o.map(() => undefined); Object.entries(bang).forEach(([has, v]) => { const i = yCo(q, has); assert.equal(r[i], undefined, "hai mục cùng khớp ý " + (i + 1)); r[i] = typeof v === "function" ? v(q.o[i]) : v; });
  assert.ok(r.every((v) => typeof v === "boolean"), "mọi ý đều có trong bảng"); return r; };
// số đứng ngay sau một đoạn chữ trong s (“… 22 triệu đồng”: so(s, "có # triệu đồng tiền lương"))
const so = (s, mau) => { const re = new RegExp(escRe(mau).replace("#", "(" + NUM + ")")); const m = re.exec(s); assert.ok(m, "không thấy “" + mau + "” trong “" + s.slice(0, 80) + "…”"); return val(m[1]); };
const viet = (x) => { const r = Math.round(x * 100) / 100; const [n, d] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + n.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : ""); };

/* ---------- bảng theo sách Giáo dục kinh tế và pháp luật 10, 11, 12 (Kết nối tri thức, in năm 2026) ----------
   LUAT: tuổi bầu cử, ứng cử (GDKT&PL 11, Bài 14), tuổi kết hôn, thành niên (GDKT&PL 12, Bài 10). MUC_TIEU: mục tiêu tài chính theo thời gian
   (GDKT&PL 12, Bài 7: ngắn hạn 6 tháng đến 1 năm, trung hạn 2–5 năm, dài hạn từ 5 năm trở lên; Bài 5, mục tiêu kinh doanh: ngắn hạn từ một
   tháng đến một năm, trung hạn 2–5 năm, dài hạn từ 5 năm trở lên; đề không dùng đúng mốc 1–2 năm, 5 năm).
   LAM_PHAT: loại lạm phát theo tỉ lệ (GDKT&PL 11, Bài 3: vừa phải dưới 10%, phi mã 10% đến 1 000%, siêu lạm phát trên 1 000%; tỉ lệ lạm
   phát = (CPI kì này − CPI kì trước) : CPI kì trước × 100%). */
const LUAT = { bauCu: 18, ungCu: 21, tuoiKetHon: { nam: 20, nu: 18 }, thanhNien: 18 };
const mucTieu = (nam) => { assert.ok(!(nam > 1 && nam < 2) && nam !== 5, "thời gian " + nam + " năm nằm ở mốc giáp ranh của sách"); return nam <= 1 ? "ngắn hạn" : nam < 5 ? "trung hạn" : "dài hạn"; };
const lamPhat = (p) => (p < 10 ? "lạm phát vừa phải" : p <= 1000 ? "lạm phát phi mã" : "siêu lạm phát");

/* ---------- các mục kiểm tra của từng đề (RIENG; phiên thêm đề thì thêm một khoá mới) ----------
   has: đoạn chữ của đề bài; right(q, d): đáp án tính bằng code hay so với bảng, d là chữ của đoạn thông tin (rỗng nếu câu không có): câu nhiều
   lựa chọn trả về lựa chọn đúng, câu đúng/sai 4 ý trả về mảng 4 ý. */
const RIENG = {
  "ktpl12-tn-de1": [
    { has: "nhận tiền phí cho mỗi đơn hàng", right: (q) => chon(q, "trung gian") },
    { has: "Bảy hộ nuôi ong", right: (q) => chon(q, "Hợp tác xã") },
    { has: "có thể hiểu theo hai cách", right: (q) => chon(q, "xác định chặt chẽ về hình thức") },
    { has: "sửa đổi, bổ sung Hiến pháp chỉ được", right: (q) => chon(q, "2/3") },
    { has: "giá thanh long giảm mạnh", right: (q) => chon(q, "bưởi da xanh") },
    { has: "chưa có kĩ năng số", right: (q) => chon(q, "cơ cấu") },
    { has: "chưa có nơi nào nhận trông trẻ", right: (q) => chon(q, "nhu cầu chưa được đáp ứng") },
    { has: "cùng điều khiển xe vượt đèn đỏ", right: (q) => chon(q, "trách nhiệm pháp lí") },
    { has: "trước ngày bầu cử", right: (q) => { const t = so(q.q, "tròn # tuổi"); assert.ok(t >= LUAT.bauCu && t < LUAT.ungCu, "đủ tuổi bầu cử, chưa đủ tuổi ứng cử");
      return chon(q, "được đi bầu cử", "chưa đủ tuổi ứng cử"); } },
    { has: "lấn chiếm 12 m² vỉa hè", right: (q) => chon(q, "khiếu nại") },
    { has: "lục soát khi chủ nhà đi vắng", right: (q) => chon(q, "chỗ ở") },
    { has: "đọc các tin nhắn riêng", right: (q) => chon(q, "bí mật thư tín") },
    { has: "kinh tế tăng trưởng ổn định trong nhiều năm", right: (q) => chon(q, "nguồn lực") },
    { has: "mua thẻ bảo hiểm y tế cho cả nhà", right: (q) => chon(q, "tự nguyện") },
    { has: "vay vốn ưu đãi để chăn nuôi", right: (q) => chon(q, "hỗ trợ việc làm") },
    { has: "xưởng làm bánh tráng", right: (q) => chon(q, "tổ chức sản xuất") },
    { has: "tiền cho thuê một gian hàng", right: (q) => { const luong = so(q.q, "có # triệu đồng tiền lương"), thue = so(q.q, "và # triệu đồng tiền cho thuê"),
      p = so(q.q, "để dành #% tổng thu nhập"), nam = so(q.q, "sau # năm"), de = (luong + thue) * p / 100, sai = luong * p / 100;
      coX(q, viet(luong) + " + " + viet(thue) + " = " + viet(luong + thue), viet(de) + " triệu đồng");
      // lựa chọn sai: chỉ tính tiền lương (bỏ thu nhập thụ động) hoặc sai loại mục tiêu
      q.o.slice(1).forEach((o) => assert.ok(!(o.includes(viet(de) + " triệu") && o.includes(mucTieu(nam))), "lựa chọn sai cũng đúng: " + o));
      assert.ok(q.o.some((o) => o.includes(viet(sai) + " triệu")), "có lựa chọn sai chỉ tính tiền lương");
      return chon(q, viet(de) + " triệu", mucTieu(nam)); } },
    { has: "sổ tiết kiệm và giấy tờ nhà đất", right: (q) => chon(q, "chiếm hữu") },
    { has: "chở hộ một bao thuốc lá lậu", right: (q) => chon(q, "xúi giục") },
    { has: "mô hình máy lọc nước tự chế", right: (q) => chon(q, "tài năng") },
    { has: "xô đẩy một điều dưỡng", right: (q) => chon(q, "Tôn trọng") },
    { has: "thanh kiếm cổ bằng đồng", right: (q) => chon(q, "nộp") },
    { has: "là đại sứ của nước K", right: (q) => chon(q, "đặc biệt") },
    { has: "giảm dần thuế nhập khẩu", right: (q) => chon(q, "Mở cửa thị trường") },
    { has: "Công ty may T", right: (q, d) => traY(q, { "cấp độ khu vực": d.includes("CPTPP"), "chỉ mang lại cơ hội": false, "Dùng vải dệt trong nước": d.includes("vải do các nhà máy dệt trong nước"),
      "rút khỏi hiệp định": false }) },
    { has: "Công ty sữa Bình An", right: (q, d) => traY(q, { "được tạm hoãn": false, "cắt bớt chi phí quảng cáo": d.includes("đóng ngay số tiền bảo hiểm còn nợ"),
      "có quyền yêu cầu công ty đóng đủ": true, "tiếp tục chậm đóng": true }) },
    { has: "bán hàng trên mạng của chị Hạnh", right: (q) => traY(q, { "vẫn phải thực hiện nghĩa vụ kê khai": true, "có quyền chọn cách bán hàng": true,
      "chỉ là cách bán hàng": false, "cản trở việc buôn bán": false }) },
    { has: "hiệp định giữa nước X và nước Y", right: (q, d) => traY(q, { "được tự ý sang lãnh thổ": !d.includes("phải được nước đó đồng ý"), "là một điều ước quốc tế": true,
      "đưa quân đến sát biên giới": false, "bảo vệ quyền con người": d.includes("giải cứu") }) },
  ],
  "ktpl12-tn-de2": [
    { has: "Bưởi da xanh của hợp tác xã Hoà Phú", right: (q) => chon(q, "thừa nhận") },
    { has: "máy gặt đập liên hợp", right: (q) => chon(q, "thế chấp") },
    { has: "thành phần nào giữ vai trò chủ đạo", right: (q) => chon(q, "Kinh tế nhà nước") },
    { has: "tổ chức thi hành luật đó trên cả nước", right: (q) => chon(q, "Chính phủ") },
    { has: "lấy cắp công thức làm bánh", right: (q) => chon(q, "không lành mạnh") },
    { has: "Chỉ số giá tiêu dùng (CPI) của quốc gia M", right: (q) => { const a = so(q.q, "năm 2024 là #"), b = so(q.q, "năm 2025 là #"), p = (b - a) / a * 100;
      coX(q, "= " + viet(p) + "%"); q.o.slice(1).forEach((o) => assert.ok(!(o.startsWith(viet(p) + "%") && o.includes(lamPhat(p))), "lựa chọn sai cũng đúng: " + o));
      return chon(q, viet(p) + "%, " + lamPhat(p)); } },
    { has: "ngày càng khó tìm việc ở các nhà máy", right: (q) => chon(q, "giản đơn") },
    { has: "lập sẵn danh sách đồ cần mua", right: (q) => chon(q, "văn minh") },
    { has: "trường phổ thông dân tộc nội trú", right: (q) => chon(q, "ngang nhau") },
    { has: "lệnh gọi nhập ngũ", right: (q) => chon(q, "bảo vệ Tổ quốc") },
    { has: "tự ý nhốt Tuấn trong kho", right: (q) => chon(q, "thân thể") },
    { has: "tự xưng là “thầy”", right: (q) => chon(q, "trục lợi") },
    { has: "cùng hơn 160 nền kinh tế khác", right: (q) => chon(q, "toàn cầu") },
    { has: "mua trái phiếu do Nhà nước phát hành", right: (q) => chon(q, "huy động vốn") },
    { has: "lao động tự do có thu nhập thấp", right: (q) => chon(q, "ốm đau, tuổi già") },
    { has: "mở tiệm sửa xe máy", right: (q) => chon(q, "tài chính") },
    { has: "Công ty gốm Hưng Phát", right: (q) => chon(q, "đạo đức") },
    { has: "Công ty xuất khẩu tôm", right: (q) => chon(q, "hoàn thuế") },
    { has: "tháo trộm bánh xe ô tô", right: (q) => chon(q, "tự bảo vệ") },
    { has: "con gái học nhiều cũng không để làm gì", right: (q) => chon(q, "phân biệt đối xử") },
    { has: "dắt xe đi sai lối", right: (q) => chon(q, "người lao động") },
    { has: "hút thuốc lá ngay cạnh", right: (q) => chon(q, "Nhắc") },
    { has: "Trước một dịch bệnh lan ra nhiều châu lục", right: (q) => chon(q, "hợp tác") },
    { has: "toạ độ đánh dấu đường ranh giới", right: (q) => chon(q, "trên biển") },
    { has: "kinh tế của quốc gia Q", right: (q, d) => { const g1 = so(d, "giá so sánh là # tỉ USD"), g2 = so(d, "năm 2025 là # tỉ USD"), gni = so(d, "GNI của Q là # tỉ USD"),
      ds = so(d, "dân số trung bình là # triệu người"), tt = (g2 - g1) / g1 * 100, bq = gni * 1e9 / (ds * 1e6);
      coX(q, viet(tt) + "%", viet(bq) + " USD");
      return traY(q, { "Tốc độ tăng trưởng": (o) => gan(so(o, "là #%"), tt), "GNI bình quân đầu người": (o) => gan(so(o, "là # USD"), bq), "Vì GNI nhỏ hơn GDP": g2 <= g1 && gni < g2,
        "tiến bộ xã hội": true }); } },
    { has: "chi tiêu của gia đình anh Hiếu", right: (q, d) => { const t1 = so(d, "giảm từ # triệu đồng"), t2 = so(d, "xuống # triệu đồng"), giam = (t1 - t2) / t1 * 100;
      coX(q, viet(giam) + "%");
      return traY(q, { "Tổng thu nhập mỗi tháng": (o) => gan(so(o, "giảm #%"), giam), "giữ các khoản chi thiết yếu": true, "việc riêng của bố mẹ": false, "Rút hết tiền tiết kiệm": false }); } },
    { has: "tình huống ở thôn Đông", right: (q) => traY(q, { "Chặt cây rừng phòng hộ": false, "Hút cát ở lòng suối": true, "Lập tổ tuần tra": true, "chỉ cần không chặt phá rừng": false }) },
    { has: "vụ việc thương mại giữa nước K và nước L", right: (q, d) => traY(q, { "tự ý cấm nhập khẩu": false, "Lộ trình cắt giảm thuế dài hơn": d.includes("lộ trình cắt giảm thuế dài hơn"),
      "thấp hơn giá thành": true, "có thể gây thiệt hại": true }) },
  ],
  "ktpl12-tn-de3": [
    { has: "Công ty cổ phần thuỷ sản Phú Quý", right: (q) => chon(q, "phân phối") },
    { has: "không được Nhà nước trả lại số tiền đó", right: (q) => chon(q, "không hoàn trả trực tiếp") },
    { has: "mua một cây đàn ghi-ta cũ", right: (q) => { const tien = so(q.q, "để dành # triệu đồng"), thang = so(q.q, "trong # tháng"), moi = tien * 1000 / thang;
      coX(q, viet(tien) + " triệu : " + viet(thang) + " = " + viet(moi) + " nghìn đồng");
      return chon(q, "đồ ăn vặt", viet(moi) + " nghìn đồng"); } },
    { has: "làm thủ tục xin cấp hộ chiếu", right: (q) => chon(q, "Sử dụng pháp luật") },
    { has: "giá phân bón, thức ăn chăn nuôi", right: (q) => chon(q, "Chi phí sản xuất") },
    { has: "trải nghiệm làm nông", right: (q) => chon(q, "lãnh đạo") },
    { has: "bán đồ gốm ở chợ", right: (q) => chon(q, "đối thủ cạnh tranh") },
    { has: "Công ty thực phẩm sạch Tân Phú", right: (q) => chon(q, "cách kinh doanh phù hợp") },
    { has: "được đề bạt làm trưởng phòng", right: (q) => chon(q, "lao động") },
    { has: "con đường bê tông trong tổ", right: (q) => chon(q, "tham gia quản lí nhà nước") },
    { has: "cán bộ địa chính xã nhận tiền", right: (q) => chon(q, "Tố cáo") },
    { has: "bản quy hoạch khu dân cư mới", right: (q) => chon(q, "tiếp cận thông tin") },
    { has: "khai thác khoáng sản ồ ạt", right: (q) => chon(q, "chưa phát triển bền vững") },
    { has: "Công ty cơ khí Tân Thành", right: (q) => chon(q, "kinh nghiệm quản lí") },
    { has: "không thuộc hệ thống chính sách an sinh xã hội", right: (q) => chon(q, "mỏ đá") },
    { has: "Sau một trận bão lớn ở tỉnh Q", right: (q) => chon(q, "vượt khó") },
    { has: "vợ chồng anh Thịnh liệt kê", right: (q) => chon(q, "nguồn thu nhập") },
    { has: "Quán karaoke của anh Phát", right: (q) => chon(q, "an ninh, trật tự") },
    { has: "làm đổ một đoạn tường rào", right: (q) => chon(q, "phần tường bị đổ") },
    { has: "chưa sinh được con trai", right: (q) => chon(q, "cưỡng ép") },
    { has: "cho người quen của mình vào khám trước", right: (q) => chon(q, "bình đẳng") },
    { has: "phân loại rác sinh hoạt", right: (q) => chon(q, "làm đúng nghĩa vụ") },
    { has: "chống buôn bán người", right: (q) => chon(q, "góp phần hình thành") },
    { has: "20 tấn hồ tiêu", right: (q) => chon(q, "đúng giá đã thoả thuận") },
    { has: "bảo hiểm của gia đình anh Toàn", right: (q, d) => traY(q, { "bảo hiểm thương mại": d.includes("ở một công ty bảo hiểm"), "trả lại đầy đủ phí": false,
      "không chi trả gì": false, "bớt khó khăn về tài chính": d.includes("bồi thường theo hợp đồng") }) },
    { has: "kế hoạch kinh doanh của anh Lộc", right: (q, d) => { const nam = so(d.replace("sau một năm", "sau 1 năm"), "sau # năm");
      return traY(q, { "những điểm mạnh": d.includes("rơm rạ nhiều và rẻ") && d.includes("có chuyên môn"), "mục tiêu kinh doanh dài hạn": mucTieu(nam) === "dài hạn",
        "chiến lược kinh doanh": d.includes("bán nấm qua mạng"), "đã đủ các nội dung cơ bản": !d.includes("chưa nói đến những việc sẽ làm") }); } },
    { has: "trong gia đình bạn Hà", right: (q, d) => { const tuoi = so(d, "năm nay # tuổi"); assert.ok(tuoi > 60, "bà ngoại ngoài 60 tuổi");
      return traY(q, { "chỉ vì Hà là con gái": true, "trái pháp luật": false, "danh dự, nhân phẩm": true, "có thể báo với thầy cô": true }); } },
    { has: "vùng biển của quốc gia H", right: (q, d) => { const hl = so(d, "cách đường cơ sở # hải lí"); assert.ok(hl > 12 && hl <= 200, "nơi khoan ngoài lãnh hải (12 hải lí), trong 200 hải lí");
      return traY(q, { "chỉ cần thông báo": false, "thuộc nội thuỷ": d.includes("phía trong đường cơ sở"), "không được ngăn cản": true, "không cần H cho phép": false }); } },
  ],
};

/* ---------- đề và danh mục: số đề, số câu lấy từ danh mục ---------- */
const soDe = (id) => +/de(\d+)$/.exec(id)[1];
const DE = BANKS.filter((b) => /^ktpl12-tn-de\d+$/.test(b.id)).sort((a, b) => soDe(a.id) - soDe(b.id));
assert.ok(DE.length >= 1, "chưa có đề GDKT&PL thi thử tốt nghiệp nào trong danh mục");
DE.forEach((b, i) => assert.equal(b.id, "ktpl12-tn-de" + (i + 1), "mã đề phải liên tiếp từ ktpl12-tn-de1"));
const TN = EVENTS.find((e) => e.id === "tn-thpt-2027");
const P1 = "Phần I. Trắc nghiệm nhiều lựa chọn", P2 = "Phần II. Trắc nghiệm đúng sai";
const KHUNG = [[P1, "mc", 24, 0.25], [P2, "tf4", 4, 1]];
// chủ đề lớp 12: đúng chữ chủ đề của ba kho GDKT&PL 12 (16 bài, mỗi bài một chủ đề); chín chủ đề của sách theo mục lục (README của cuốn ở
// OnUp-Book); Phần một (kinh tế) Bài 1–7, Phần hai (pháp luật) Bài 8–16
const KHO = BANKS.filter((b) => b.file === "12-ktpl.js" && b.pool), CD_KHO = new Set(KHO.flatMap((b) => Object.keys(b.pool.matrix)));
const CHU_DE_12 = [["Tăng trưởng và phát triển kinh tế", ["Tăng trưởng và phát triển kinh tế"]], ["Hội nhập kinh tế quốc tế", ["Hội nhập kinh tế quốc tế"]],
  ["Bảo hiểm và an sinh xã hội", ["Bảo hiểm", "An sinh xã hội"]], ["Lập kế hoạch kinh doanh", ["Lập kế hoạch kinh doanh"]],
  ["Trách nhiệm xã hội của doanh nghiệp", ["Trách nhiệm xã hội của doanh nghiệp"]], ["Quản lí thu, chi trong gia đình", ["Quản lí thu, chi trong gia đình"]],
  ["Một số quyền và nghĩa vụ của công dân về kinh tế", ["Quyền và nghĩa vụ của công dân về kinh doanh và nộp thuế", "Quyền và nghĩa vụ về sở hữu tài sản, tôn trọng tài sản người khác"]],
  ["Quyền và nghĩa vụ của công dân về văn hoá, xã hội", ["Quyền và nghĩa vụ của công dân trong hôn nhân và gia đình", "Quyền và nghĩa vụ của công dân trong học tập",
    "Quyền và nghĩa vụ về chăm sóc sức khoẻ, bảo đảm an sinh xã hội", "Quyền và nghĩa vụ về di sản văn hoá, môi trường, tài nguyên"]],
  ["Một số vấn đề cơ bản của luật quốc tế", ["Một số vấn đề chung về pháp luật quốc tế", "Công pháp quốc tế về dân cư, lãnh thổ và chủ quyền quốc gia",
    "Nguyên tắc cơ bản của WTO và hợp đồng thương mại quốc tế"]]];
const BAI = CHU_DE_12.flatMap(([, ts]) => ts), chuDe12 = (t) => CHU_DE_12.findIndex(([, ts]) => ts.includes(t));
assert.equal(BAI.length, 16, "GDKT&PL 12 có 16 bài");
assert.deepEqual([...CD_KHO].sort(), [...BAI].sort(), "chủ đề của ba kho GDKT&PL 12 đúng 16 bài của sách");
// tên bài rút gọn (chữ chủ đề của ba kho) → tên trong mục lục
const RUT_GON = { "Quyền và nghĩa vụ về sở hữu tài sản, tôn trọng tài sản người khác": "Quyền và nghĩa vụ của công dân về sở hữu tài sản và nghĩa vụ tôn trọng tài sản của người khác",
  "Quyền và nghĩa vụ về chăm sóc sức khoẻ, bảo đảm an sinh xã hội": "Quyền và nghĩa vụ của công dân trong bảo vệ, chăm sóc sức khoẻ và bảo đảm an sinh xã hội",
  "Quyền và nghĩa vụ về di sản văn hoá, môi trường, tài nguyên": "Quyền và nghĩa vụ của công dân trong bảo vệ di sản văn hoá, môi trường và tài nguyên thiên nhiên",
  "Nguyên tắc cơ bản của WTO và hợp đồng thương mại quốc tế": "Nguyên tắc cơ bản của Tổ chức Thương mại Thế giới và hợp đồng thương mại quốc tế" };
// câu lớp 10, 11: “Lớp 10 · ”, “Lớp 11 · ” và tên chủ đề trong mục lục của sách (rút gọn cho vừa mã đề “Ôn chủ đề”), theo thứ tự của sách
const CHU_DE_10 = { "Nền kinh tế và các chủ thể của nền kinh tế": "Nền kinh tế và các chủ thể của nền kinh tế", "Thị trường và cơ chế thị trường": "Thị trường và cơ chế thị trường",
  "Ngân sách nhà nước và thuế": "Ngân sách nhà nước và thuế", "Sản xuất kinh doanh và các mô hình sản xuất kinh doanh": "Sản xuất kinh doanh và các mô hình sản xuất kinh doanh",
  "Tín dụng và cách sử dụng các dịch vụ tín dụng": "Tín dụng và cách sử dụng các dịch vụ tín dụng trong đời sống", "Lập kế hoạch tài chính cá nhân": "Lập kế hoạch tài chính cá nhân",
  "Pháp luật nước Cộng hoà xã hội chủ nghĩa Việt Nam": "Pháp luật nước Cộng hoà xã hội chủ nghĩa Việt Nam", "Hiến pháp nước Cộng hoà xã hội chủ nghĩa Việt Nam": "Hiến pháp nước Cộng hoà xã hội chủ nghĩa Việt Nam",
  "Hệ thống chính trị Việt Nam": "Hệ thống chính trị nước Cộng hoà xã hội chủ nghĩa Việt Nam" };
const CHU_DE_11 = { "Cạnh tranh, cung – cầu trong nền kinh tế thị trường": "Cạnh tranh, cung – cầu trong nền kinh tế thị trường", "Lạm phát, thất nghiệp": "Lạm phát, thất nghiệp",
  "Thị trường lao động và việc làm": "Thị trường lao động và việc làm", "Ý tưởng, cơ hội kinh doanh và năng lực người kinh doanh": "Ý tưởng, cơ hội kinh doanh và các năng lực cần thiết của người kinh doanh",
  "Đạo đức kinh doanh": "Đạo đức kinh doanh", "Văn hoá tiêu dùng": "Văn hoá tiêu dùng", "Quyền bình đẳng của công dân trước pháp luật": "Quyền bình đẳng của công dân trước pháp luật",
  "Một số quyền dân chủ cơ bản của công dân": "Một số quyền dân chủ cơ bản của công dân", "Một số quyền tự do cơ bản của công dân": "Một số quyền tự do cơ bản của công dân" };
const T10 = Object.keys(CHU_DE_10), T11 = Object.keys(CHU_DE_11);
const lop = (t) => (BAI.includes(t) ? 12 : /^Lớp 11 · /.test(t) && T11.includes(t.slice(9)) ? 11 : /^Lớp 10 · /.test(t) && T10.includes(t.slice(9)) ? 10 : 0);
const thuTuCD = (t) => (lop(t) === 12 ? BAI.indexOf(t) : lop(t) === 11 ? T11.indexOf(t.slice(9)) : T10.indexOf(t.slice(9)));
[...BAI, ...T10.map((t) => "Lớp 10 · " + t), ...T11.map((t) => "Lớp 11 · " + t)].forEach((t) => assert.ok(("chu-de:12:ktpl:" + t).length <= 80, "mã đề “Ôn chủ đề” quá 80 kí tự: " + t));
const soY = (q) => (q.type === "tf4" ? 4 : 1);
const dpOf = (b, q) => (q.p && b.passages && b.passages[q.p] ? b.passages[q.p].text : "");

/* ---------- chạy kiểm tra từng câu ---------- */
let n = 0;
const dung = new Set();
DE.forEach((b) => {
  const CK = RIENG[b.id]; assert.ok(CK, b.id + ": chưa có các mục kiểm tra của đề ở RIENG"); assert.equal(b.questions.length, b.n, b.id + ": số câu khác danh mục");
  b.questions.forEach((q, i) => {
    const at = b.id + "#" + (i + 1), cs_ = CK.filter((c) => q.q.includes(c.has)), dai_ = Math.max(...cs_.map((c) => c.has.length)), ch = cs_.filter((c) => c.has.length === dai_);
    assert.equal(ch.length, 1, at + ": cần đúng một mục kiểm tra cho “" + q.q.slice(0, 60) + "…”, có " + ch.length);
    const c = ch[0]; assert.ok(!dung.has(c), at + ": hai câu cùng khớp “" + c.has + "”"); dung.add(c);
    try {
      const want = c.right(q, dpOf(b, q));
      const got = q.type === "tf4" ? q.a : q.o[0];
      assert.strictEqual(JSON.stringify(got), JSON.stringify(want), "đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
      if (q.type === "mc") {
        assert.ok(new Set(q.o).size === 4 && q.o.length === 4, "bốn lựa chọn khác nhau");
        const L = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn lựa chọn sai");
      }
      if (q.type === "tf4") {
        assert.ok(q.o.length === 4 && q.a.includes(true) && q.a.includes(false), "đúng/sai 4 ý có cả ý đúng và ý sai");
        // lời giải ghi “a) Đúng: …”, “b) Sai: …” theo đúng đáp án
        q.a.forEach((a, k) => assert.ok(q.x.includes("abcd"[k] + ") " + (a ? "Đúng" : "Sai") + ":"), "lời giải ghi “" + "abcd"[k] + ") " + (a ? "Đúng" : "Sai") + ":”"));
      }
      assert.ok(!q.svg, "đề GDKT&PL không có hình");
    } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
    n++;
  });
});
assert.deepEqual(Object.keys(RIENG).sort(), DE.map((b) => b.id).sort(), "RIENG có đúng các đề thi thử của danh mục");
assert.deepEqual(Object.entries(RIENG).flatMap(([id, ck]) => ck.filter((c) => !dung.has(c)).map((c) => id + ": " + c.has)), [], "có mục kiểm tra không khớp câu nào");

/* ---------- khung đề (Quyết định 764/QĐ-BGDĐT): danh mục, phần, điểm, mức độ, phạm vi, đoạn thông tin, lời dặn ---------- */
const KIEU = {};
// câu tình huống: đề bài hay đoạn thông tin kể việc của một người (anh K, chị Lan, bạn Tú…), một gia đình, doanh nghiệp, quốc gia có tên
const TINH_HUONG = [/(?:^|[\s(])(?:[Aa]nh|[Cc]hị|[Ôô]ng|[Bb]à|[Bb]ạn|[Cc]ụ|[Ee]m) \p{Lu}/u, /(?:[Cc]ông ty|[Dd]oanh nghiệp|[Qq]uốc gia|[Tt]ỉnh|[Xx]ã|[Nn]ước|[Hh]ộ)(?: \p{Ll}+)* \p{Lu}/u,
  /(?:của|Nhóm) \p{Lu}\p{Ll}+/u, /(?:^|\. )\p{Lu}\p{Ll}* hộ /u];
const laTH = (b, q) => TINH_HUONG.some((r) => r.test(q.q + " " + dpOf(b, q)));
DE.forEach((b) => {
  const at = b.id, qs = b.questions;
  assert.deepEqual([b.title, b.grade, b.subject, b.minutes, b.pts, b.file, !!b.pool], ["GDKT&PL 12 · Thi thử tốt nghiệp · Đề " + soDe(b.id), 12, "GDKT&PL", 50, 10, "12-ktpl.js", false], at + ": danh mục");
  assert.ok(TN && TN.banks.includes(b.id) && TN.grades.includes(12) && TN.subjects.includes("GDKT&PL"), at + ": phải gắn vào tn-thpt-2027");
  let k = 0;
  KHUNG.forEach(([part, type, so_, pt]) => { const ph = qs.slice(k, k + so_); k += so_;
    assert.ok(ph.length === so_ && ph.every((q) => q.part === part && q.type === type && q.pt === pt), at + ": " + part + " gồm " + so_ + " câu " + type + ", mỗi câu " + pt + " điểm"); });
  assert.equal(k, qs.length, at + ": đề có đúng 28 câu theo khung 24 – 4");
  const G = Quiz.grade(qs, qs.map(() => null));
  assert.ok(G.max === 10 && G.got === 0, at + ": Quiz.grade: tối đa 10 điểm");
  assert.deepEqual(G.parts.map((p) => [p.part, p.max]), [[P1, 6], [P2, 4]], at + ": điểm tối đa từng phần 6 – 4");
  qs.forEach((q, i) => assert.ok(lop(q.topic), at + "#" + (i + 1) + ": chủ đề lạ “" + q.topic + "”"));
  const dem = (a, c, f) => qs.slice(a, c).filter(f).length, muc = (a, c, l) => [1, 2, 3].map((v) => dem(a, c, (q) => q.lv === v && (!l || lop(q.topic) === l)));
  // phạm vi, mức độ như ma trận đề tham khảo năm 2025: Phần I 4 câu lớp 10 (3 Biết, 1 Hiểu), 8 câu lớp 11 (5 Biết, 2 Hiểu, 1 Vận dụng), 12 câu
  // lớp 12 (8 Biết, 3 Hiểu, 1 Vận dụng); Phần II bốn câu lớp 12 ghi mức 2, 2, 3, 3
  assert.deepEqual(muc(0, 24), [16, 6, 2], at + ": Phần I 16 Biết, 6 Hiểu, 2 Vận dụng");
  assert.deepEqual([muc(0, 24, 10), muc(0, 24, 11), muc(0, 24, 12)], [[3, 1, 0], [5, 2, 1], [8, 3, 1]], at + ": mức của câu lớp 10, 11, 12 ở Phần I");
  assert.deepEqual(qs.slice(24, 28).map((q) => q.lv).sort(), [2, 2, 3, 3], at + ": Phần II bốn câu ghi mức 2, 2, 3, 3");
  assert.ok(qs.slice(24, 28).every((q) => lop(q.topic) === 12), at + ": Phần II chỉ có câu lớp 12");
  const lenh = (l) => sum(qs.filter((q) => lop(q.topic) === l).map(soY));
  assert.equal(sum(qs.map(soY)), 40, at + ": đề có 40 lệnh hỏi");
  assert.deepEqual([lenh(10), lenh(11), lenh(12)], [4, 8, 28], at + ": 10% lệnh hỏi lớp 10, 20% lớp 11, 70% lớp 12");
  // 16 bài của GDKT&PL 12, mỗi bài đúng một câu; Phần II hai câu Bài 1–7, hai câu Bài 8–16
  assert.deepEqual(qs.filter((q) => lop(q.topic) === 12).map((q) => q.topic).sort(), [...BAI].sort(), at + ": mỗi bài GDKT&PL 12 đúng một câu");
  const p2 = qs.slice(24, 28).map((q) => BAI.indexOf(q.topic));
  assert.deepEqual([p2.filter((x) => x < 7).length, p2.filter((x) => x >= 7).length], [2, 2], at + ": Phần II hai câu kinh tế (Bài 1–7), hai câu pháp luật (Bài 8–16)");
  // thứ tự: Phần I câu lớp 10, rồi lớp 11, rồi lớp 12; trong mỗi lớp theo thứ tự chủ đề, bài; Phần II theo thứ tự bài
  const kh = (q) => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3][lop(q.topic)] * 100 + thuTuCD(q.topic);
  [[0, 24], [24, 28]].forEach(([a, c]) => { const v = qs.slice(a, c).map(kh); v.forEach((x, i) => i && assert.ok(x >= v[i - 1], at + ": thứ tự câu trong " + (a ? P2 : P1) + " (câu " + (a + i + 1) + ")")); });
  // đoạn thông tin: mỗi câu Phần II một đoạn riêng (người soạn đề viết), không dùng cho câu khác, không ghi số câu
  const ps = Object.keys(b.passages || {});
  assert.deepEqual(ps.sort(), qs.slice(24, 28).map((q) => q.p).sort(), at + ": mỗi câu Phần II một đoạn thông tin riêng");
  assert.ok(qs.slice(0, 24).every((q) => !q.p), at + ": Phần I không dùng đoạn thông tin");
  ps.forEach((p) => { const d = b.passages[p];
    assert.ok(d.title && d.text && /^(?:Thông tin|Tình huống) .+ \(người soạn đề viết\)$/.test(d.title) && !/câu \d/i.test(d.title + d.text), at + ": đoạn " + p + " có tên “Thông tin …/Tình huống … (người soạn đề viết)”, có chữ, không ghi số câu");
    const w = d.text.split(/\s+/).length; assert.ok(w >= 60 && w <= 170, at + ": đoạn " + p + " dài " + w + " chữ (60–170)"); });
  // câu tình huống là chính: từ hai phần ba số câu
  const th = qs.filter((q) => laTH(b, q)).length; b._th = th;
  assert.ok(th * 3 >= qs.length * 2, at + ": câu tình huống là chính (" + th + "/" + qs.length + ")");
  // lời dặn: số câu, số điểm, số câu mỗi lớp tính từ dữ liệu
  const c = (l) => dem(0, 28, (q) => lop(q.topic) === l);
  ["Quyết định 764/QĐ-BGDĐT", "thí điểm thi trên máy tính", `đề có ${c(12)} câu GDKT&PL 12 (mỗi bài một câu), ${c(11)} câu GDKT&PL 11 và ${c(10)} câu GDKT&PL 10 (${lenh(10) + lenh(11)} trong 40 lệnh hỏi), câu lớp 10, 11 đều ở Phần I`,
    "khoảng 70% số lệnh hỏi thuộc lớp 12, 20% thuộc lớp 11, 10% thuộc lớp 10", `Đề có ${qs.length} câu, làm trong ${b.minutes} phút`, "Phần I gồm 24 câu nhiều lựa chọn (6 điểm, mỗi câu 0,25 điểm)",
    "Phần II gồm 4 câu đúng/sai, mỗi câu 4 ý (4 điểm)", "đề GDKT&PL không có Phần III", "do người soạn đề viết", "Phần lớn là câu tình huống", "Đề không có câu tự chấm",
    "ma trận đề tham khảo năm 2025", "đề chính thức năm 2026", "Bài 1–16"]
    .forEach((s) => assert.ok(b.note.includes(s), at + ": lời dặn thiếu “" + s + "”"));
  // đúng/sai 4 ý: trong một đề không lặp kiểu Đ/S
  const kieu = qs.filter((q) => q.type === "tf4").map((q) => q.a.map((a) => (a ? "Đ" : "S")).join(""));
  assert.equal(new Set(kieu).size, kieu.length, at + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + kieu.join(", "));
  kieu.forEach((x) => (KIEU[x] = (KIEU[x] || 0) + 1));
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn của đề
  const mc = qs.filter((q) => q.type === "mc" && new Set(q.o.map((o) => o.length)).size > 1), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  const dai2 = mc.filter((q) => hon(q, (a, c_) => a > c_)).length, ngan = mc.filter((q) => hon(q, (a, c_) => a < c_)).length;
  assert.ok(dai2 * 3 <= mc.length && ngan * 3 <= mc.length && (dai2 + ngan) * 6 >= mc.length, at + `: đáp án đúng dài nhất ở ${dai2}, ngắn nhất ở ${ngan} trong ${mc.length} câu`);
  b._le = dai2 + ngan; b._mc = mc.length;
  // lời giải không nhắc vị trí của phương án (app xáo phương án)
  qs.forEach((q) => assert.ok(!/(phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x + " " + (q.o || []).join(" ")), at + ": nhắc vị trí của phương án: " + q.q.slice(0, 50)));
});
assert.ok(Object.values(KIEU).every((c) => c <= 3), "một kiểu Đ/S dùng quá ba lần trong các đề thi thử: " + JSON.stringify(KIEU));
// Đề 1–3 (Phiên N12-tn-ktpl): phủ đủ chín chủ đề của GDKT&PL 10 và chín chủ đề của GDKT&PL 11; không bài nào ở Phần II hai lần
if (DE.length >= 3) {
  const ba = DE.slice(0, 3).flatMap((b) => b.questions);
  assert.deepEqual([...new Set(ba.filter((q) => lop(q.topic) === 10).map((q) => q.topic.slice(9)))].sort(), [...T10].sort(), "Đề 1–3 phủ đủ chín chủ đề GDKT&PL 10");
  assert.deepEqual([...new Set(ba.filter((q) => lop(q.topic) === 11).map((q) => q.topic.slice(9)))].sort(), [...T11].sort(), "Đề 1–3 phủ đủ chín chủ đề GDKT&PL 11");
  const p2 = DE.slice(0, 3).flatMap((b) => b.questions.slice(24, 28).map((q) => q.topic));
  assert.equal(new Set(p2).size, p2.length, "Đề 1–3: một bài ở Phần II hai lần");
}
// câu nhiều lựa chọn: đáp án đúng không là lựa chọn duy nhất có chữ của nhãn chủ đề; ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
{
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), loi = [];
  DE.forEach((b) => b.questions.forEach((q, i) => {
    if (q.type !== "mc") return;
    const at = b.id + "#" + (i + 1), c = chuThuong(q.topic.replace(/^Lớp 1[01] · /, "")), tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|một|giữa|từ|đến|năm|nay|sau|người)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); if (co[0] && !co.slice(1).some(Boolean)) loi.push(`${at}: chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    if (dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1) loi.push(at + ": ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”");
  }));
  assert.deepEqual(loi, [], "câu nhiều lựa chọn có gợi ý từ chữ của lựa chọn:\n" + loi.join("\n"));
}

/* ---------- chữ ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || []).map(String);
// 34 đơn vị hành chính cấp tỉnh (Nghị quyết 202/2025/QH15) như tests/lichsu12-tn.js
const TINH = ["Hà Nội", "Huế", "Hải Phòng", "Đà Nẵng", "Cần Thơ", "Thành phố Hồ Chí Minh", "Lai Châu", "Điện Biên", "Sơn La", "Lạng Sơn", "Quảng Ninh",
  "Thanh Hoá", "Nghệ An", "Hà Tĩnh", "Cao Bằng", "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ", "Bắc Ninh", "Hưng Yên", "Ninh Bình", "Quảng Trị",
  "Quảng Ngãi", "Gia Lai", "Khánh Hoà", "Lâm Đồng", "Đắk Lắk", "Đồng Nai", "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang"];
assert.equal(TINH.length, 34);
const TINH_CU = ["Hà Giang", "Yên Bái", "Bắc Kạn", "Vĩnh Phúc", "Hoà Bình", "Bắc Giang", "Thái Bình", "Hải Dương", "Hà Nam", "Nam Định", "Quảng Bình",
  "Quảng Nam", "Kon Tum", "Bình Định", "Phú Yên", "Ninh Thuận", "Bình Thuận", "Đắk Nông", "Bà Rịa – Vũng Tàu", "Bà Rịa - Vũng Tàu", "Bình Dương", "Bình Phước",
  "Long An", "Tiền Giang", "Bến Tre", "Trà Vinh", "Hậu Giang", "Sóc Trăng", "Bạc Liêu", "Kiên Giang", "Thừa Thiên Huế"];
{
  const loi = [], kt = (ok, m) => ok || loi.push(m);
  DE.forEach((b) => {
    const doan = Object.values(b.passages || {}).flatMap((p) => [p.title, p.text]);
    b.questions.map((q) => [b.id + ": " + q.q.slice(0, 50), chu(q)]).concat([[b.id + ": đoạn thông tin, lời dặn", doan.concat(b.note)]]).forEach(([at, ss]) => ss.forEach((s) => {
      // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân (năm viết liền)
      kt(!/(?<![,\d])\d{5,}/.test(s) && !/(?<![,\d])\d{4}(?![\d ])/.test(s.replace(/\b(?:1[0-9]|20)\d{2}\b/g, "").replace(/\d+\/QĐ-BGDĐT/g, "")) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s.slice(0, 120));
      // dấu thanh kiểu sách: oa, oe, uy không có phụ âm cuối đặt dấu ở nguyên âm sau (hoá, khoẻ, thuỷ, tuỳ)
      kt(!/[òóỏõọ][ae](?![\p{L}])|[ùúủũụ]y(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s.slice(0, 120));
      // địa danh theo đơn vị hành chính hiện nay: không “huyện”, “63 tỉnh”; tỉnh đã nhập chỉ ghi kèm “nay thuộc …”
      kt(!/(?<![\p{L}])(?:huyện|63 tỉnh|64 tỉnh|cấp huyện)(?![\p{L}])/iu.test(s), at + ": đơn vị hành chính cũ: " + s.slice(0, 120));
      // “Thái Bình Dương” (tên đại dương, như trong tên Hiệp định CPTPP) không phải tên tỉnh Thái Bình, Bình Dương
      TINH_CU.forEach((t) => { if (s.replace(/Thái Bình Dương/g, "").includes(t)) kt(new RegExp(escRe(t) + " \\(nay (?:thuộc|là) ").test(s), at + ": tên tỉnh cũ “" + t + "” không ghi tên mới"); });
      // tên tỉnh đặt bằng một chữ cái (tỉnh K, tỉnh H) là tên giả định
      [...s.matchAll(/(?:tỉnh|thành phố) (\p{Lu}[\p{L}]*(?: \p{Lu}[\p{L}]*)*)/gu)].forEach((x) => kt(x[1].length === 1 || TINH.includes(x[1]) || TINH.includes("Thành phố " + x[1]) || /^Hồ Chí Minh$/.test(x[1]), at + ": tên tỉnh, thành phố không có trong 34 đơn vị: " + x[0]));
      // tên luật như sách in năm 2026; không số điều luật, mức phạt; không tên cơ quan cũ
      kt(!/Hiến pháp năm/.test(s) || /Hiến pháp năm 2013 \(sửa đổi, bổ sung năm 2025\)/.test(s), at + ": Hiến pháp năm 2013 (sửa đổi, bổ sung năm 2025): " + s.slice(0, 120));
      kt(!/Luật Bảo hiểm y tế(?! năm 2008 \(sửa đổi, bổ sung năm 2024\))|Luật Bảo hiểm xã hội(?! năm 2024)|Luật Di sản văn hoá(?! năm 2024)|Luật Quản lí thuế(?! năm 2025)|Luật Đầu tư(?! năm 2025)/.test(s), at + ": tên luật như sách in năm 2026: " + s.slice(0, 120));
      kt(!/Luật Giáo dục(?! năm 2019 \(sửa đổi, bổ sung năm 2025\))|Luật Hôn nhân và Gia đình(?! năm 2014)|Bộ luật Hình sự(?! năm 2015 \(sửa đổi, bổ sung năm 2017, năm 2025\))|Luật Doanh nghiệp(?! năm 2020 \(sửa đổi, bổ sung năm 2025\))/.test(s), at + ": tên luật như sách in năm 2026: " + s.slice(0, 120));
      kt(!/\b(?:Điều|khoản) \d|phạt (?:tiền )?(?:từ )?\d|phạt tù/.test(s), at + ": không ghi số điều luật, mức phạt: " + s.slice(0, 120));
      kt(!/Lao động – Thương binh|Tổng cục|Chi cục|Phòng Đăng kí kinh doanh/.test(s), at + ": tên cơ quan cũ: " + s.slice(0, 120));
      kt(!/HDI[^.]*GDP\/người|thu nhập \(tính bằng GDP/.test(s), at + ": chỉ số thu nhập trong HDI tính bằng GNI/người: " + s.slice(0, 120));
    }));
  });
  assert.deepEqual(loi, [], "chữ viết khác quy ước:\n" + loi.join("\n"));
}

/* ---------- so với ba kho GDKT&PL 12 và giữa các đề thi thử: đề bài không trùng, không gần trùng; đáp án không trùng câu cùng chủ đề ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const ten = new Map();
DE.forEach((b) => b.questions.forEach((q, i) => ten.set(q, b.id.replace("ktpl12-", "") + "#" + (i + 1))));
const KHO_Q = BANKS.filter((b) => b.file === "12-ktpl.js" && !b.pool && !/^ktpl12-tn-/.test(b.id)).flatMap((b) => b.questions.map((q, i) => { ten.set(q, b.id.replace("ktpl12-", "") + "#" + (i + 1)); return Object.assign(q, { _de: b.id, _d: dpOf(b, q) }); }));
const TNQ = DE.flatMap((b) => b.questions.map((q) => Object.assign(q, { _de: b.id, _d: dpOf(b, q) })));

// tên riêng nhiều chữ (tổ chức, hiệp định, văn bản luật, cơ quan, quyền, địa danh): mỗi tên tính là một từ khi so với chữ của sách và của kho khác
const GOP = ["Hiệp định Đối tác Toàn diện và Tiến bộ xuyên Thái Bình Dương", "Tổ chức Thương mại Thế giới", "Hiến pháp năm 2013 (sửa đổi, bổ sung năm 2025)",
  "Luật Bảo hiểm xã hội năm 2024", "Luật Bảo hiểm y tế năm 2008 (sửa đổi, bổ sung năm 2024)", "Luật Di sản văn hoá năm 2024", "Luật Hôn nhân và Gia đình năm 2014",
  "Luật Giáo dục năm 2019 (sửa đổi, bổ sung năm 2025)", "Bộ luật Hình sự năm 2015 (sửa đổi, bổ sung năm 2017, năm 2025)", "Uỷ ban nhân dân", "Hội đồng nhân dân",
  "Quốc hội", "Chính phủ", "Toà án nhân dân", "Viện kiểm sát nhân dân", "Mặt trận Tổ quốc Việt Nam", "Việt Nam", "Hà Nội", "Thành phố Hồ Chí Minh", "Vĩnh Long", "Hưng Yên",
  "châu Á – Thái Bình Dương", "Liên hợp quốc", "Giáo dục kinh tế và pháp luật"];
// cụm từ chung của môn: tên bài, tên chủ đề, tên quyền, nguyên tắc, chính sách, loại bảo hiểm như sách, cách hỏi chung của đề (thay bằng dấu ngăn trước khi so)
const TU_CHUNG = [...BAI, ...Object.values(RUT_GON), ...T10, ...Object.values(CHU_DE_10), ...T11, ...Object.values(CHU_DE_11), ...CHU_DE_12.map((c) => c[0]),
  "mỗi ý sau đúng hay sai", "người soạn đề viết", "nào sau đây", "nhận xét nào sau đây đúng",
  "đề thi thử theo cấu trúc đề thi tốt nghiệp thpt từ năm 2025", "năm 2027 thí điểm thi trên máy tính ở nơi đủ điều kiện, đề như thi giấy",
  "cơ quan nhà nước có thẩm quyền", "theo quy định của pháp luật", "quyền bất khả xâm phạm về chỗ ở", "quyền được bảo đảm an toàn và bí mật thư tín, điện thoại, điện tín",
  "bí mật thư tín, điện thoại, điện tín", "bình đẳng về trách nhiệm pháp lí", "bình đẳng về quyền và nghĩa vụ", "tính xác định chặt chẽ về hình thức",
  "tính quy phạm phổ biến", "tính quyền lực, bắt buộc chung", "chính sách hỗ trợ việc làm", "chính sách trợ giúp xã hội", "chính sách bảo đảm các dịch vụ xã hội cơ bản",
  "kế hoạch tổ chức sản xuất", "mục tiêu tài chính trung hạn", "mục tiêu tài chính ngắn hạn", "mục tiêu tài chính dài hạn", "thu nhập thụ động", "thu nhập chủ động",
  "nguyên tắc mở cửa thị trường", "ưu đãi dành cho các nước đang phát triển", "thương mại công bằng", "đối xử tối huệ quốc", "đối xử quốc gia", "bảo hiểm xã hội bắt buộc", "bảo hiểm y tế bắt buộc",
  "bảo hiểm thất nghiệp", "bảo hiểm thương mại", "bảo hiểm con người", "bảo hiểm tài sản", "bảo hiểm trách nhiệm dân sự",
  "chế độ đãi ngộ đặc biệt", "chế độ đãi ngộ quốc gia", "chế độ đãi ngộ tối huệ quốc", "quyền chiếm hữu", "quyền sử dụng", "quyền định đoạt", "thất nghiệp cơ cấu", "thất nghiệp tạm thời", "thất nghiệp chu kì", "thất nghiệp tự nguyện",
  "chủ thể trung gian", "chủ thể sản xuất", "chủ thể tiêu dùng", "phát triển tài năng, năng khiếu, sáng tạo",
  "kinh tế thị trường định hướng xã hội chủ nghĩa", "biên giới quốc gia trên biển", "biên giới quốc gia trên không", "Các quốc gia có nghĩa vụ hợp tác với nhau",
  "Không can thiệp vào công việc nội bộ của các quốc gia khác", "Cấm dùng vũ lực hay đe doạ dùng vũ lực trong quan hệ quốc tế", "Giải quyết các tranh chấp quốc tế bằng biện pháp hoà bình",
  "Quyền bình đẳng và tự quyết của các dân tộc", "Tận tâm, thiện chí thực hiện các cam kết quốc tế", "Bình đẳng về chủ quyền giữa các quốc gia", "Cấm dùng vũ lực hay đe doạ dùng vũ lực",
  "quyền bất khả xâm phạm về thân thể", "kinh tế có vốn đầu tư nước ngoài", "chức năng điều tiết, kích thích hoặc hạn chế",
  "quyền tham gia quản lí nhà nước và xã hội", "an ninh, trật tự, an toàn xã hội"];
const boDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP_ = GOP.map(boDau).sort((a, b) => b.length - a.length), TU_CHUNG_ = TU_CHUNG.map((p) => " " + boDau(p) + " ").sort((a, b) => b.length - a.length);
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
const khongDau = nhoChuoi((s) => {
  let t = " " + boDau(s) + " ";
  TU_CHUNG_.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  GOP_.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); });
  return t.replace(/[aeiouy]+/g, "a").replace(/\s+/g, " ").trim();
});
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
{
  const ds = BANKS.filter((b) => b.file === "12-ktpl.js" && !b.pool).flatMap((b) => b.questions.map((q) => ({ q, k: gocChu(q.q) })));
  TNQ.forEach((q) => assert.deepEqual(ds.filter((e) => e.k === gocChu(q.q)).map((e) => ten.get(e.q)), [ten.get(q)], "đề bài trùng câu khác trong 12-ktpl.js"));
  // cặp hai âm tiết liền nhau (như tests/lichsu12-tn.js): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của ba kho và số cặp chung từ
  // một nửa số cặp của câu ít cặp hơn thì báo; không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung và cặp có ở từ 3% số câu của file.
  // Giữa các đề thi thử chỉ so chuỗi 6 từ.
  const CUM = ["mỗi ý sau đúng hay sai", "nào sau đây", "nhận xét nào sau đây đúng"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c_) => { t = t.split(c_).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c_) => c_.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const ca = KHO_Q.concat(TNQ), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c_) => (df[c_] = (df[c_] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c_) => !nhan.has(c_) && df[c_] < 0.03 * ca.length)); };
  const gan_ = [], gan6 = [], trung = [];
  TNQ.forEach((q) => {
    const c = capAm(q);
    KHO_Q.concat(TNQ.filter((p) => p._de !== q._de)).forEach((p) => {
      const d = capAm(p), chung = [...c].filter((x) => d.has(x));
      if (!/^ktpl12-tn-/.test(p._de) && chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`);
      const s = " " + khongDau(p.q) + " "; chuoi(q.q, 6).forEach((x) => { if (s.includes(" " + x + " ")) gan6.push(ten.get(q) + " ~ " + ten.get(p) + ": " + x); });
      if (p.topic !== q.topic) return;
      if (q.type === "mc" && p.type === "mc" && gocChu(q.o[0]) === gocChu(p.o[0])) trung.push(ten.get(q) + " ~ " + ten.get(p) + ": đáp án trùng câu cùng chủ đề");
    });
  });
  assert.deepEqual([...new Set(gan_)], [], "đề bài gần trùng (cặp hai âm tiết) câu khác:\n" + [...new Set(gan_)].join("\n"));
  assert.deepEqual([...new Set(gan6)], [], "đề bài gần trùng (chuỗi 6 từ) câu khác:\n" + [...new Set(gan6)].join("\n"));
  assert.deepEqual(trung, [], "đáp án trùng câu cùng chủ đề:\n" + trung.join("\n"));
}

/* ---------- dò lộ đáp án (như tests/lichsu12-tn.js) ----------
   Đề cố định: mọi câu cùng hiện, đoạn thông tin cùng hiện, lời dặn hiện ở màn mở đề; đề “Ôn chủ đề” rút chung câu cùng chủ đề của các đề thi
   thử và ba kho GDKT&PL 12 (kèm đoạn thông tin của câu). Số có trong đáp án (lựa chọn đúng, đáp án của câu trả lời bằng số) tìm ở vị trí kết
   quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”): không được có. Đáp án bằng chữ tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ
   trở xuống thì lấy cả đáp án); chuỗi có ở từ hai lựa chọn sai thì không chỉ ra được lựa chọn đúng nên bỏ; chuỗi có trong đề bài, lựa chọn,
   lời giải, đoạn thông tin của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. */
const KQ = new RegExp("(?:=|(?:^|[\\s(])(?:là|bằng|được))\\s+(" + NUM + ")(?![\\d,])", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => val(x[1]));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["theo quy định", "quy định của", "của pháp luật", "theo quy định của", "người lao động", "quyền và nghĩa", "và nghĩa vụ", "nghĩa vụ của",
  "của công dân", "nhà nước có", "cơ quan nhà", "quan nhà nước", "triệu đồng mỗi", "đồng mỗi tháng", "mỗi tháng để", "tháng để dành", "đây là mục", "là mục tiêu",
  "mục tiêu tài", "tiêu tài chính", "kinh tế quốc", "tế quốc tế", "pháp luật quốc", "luật quốc tế",
  "khám bệnh chữa", "bệnh chữa bệnh", "người làm việc", "có thẩm quyền", "quan có thẩm", "định của pháp", "điều ước quốc", "ước quốc tế",
  "trái pháp luật", "vi phạm nghĩa", "phạm nghĩa vụ", "của người học", "của nhà trường", "hợp pháp của", "do nhà nước",
  "quyền bất khả", "bất khả xâm", "khả xâm phạm", "xâm phạm về", "bảo vệ tài", "các dân tộc", "của các dân", "quyền bình đẳng",
  "đủ điều kiện", "đúng pháp luật", "tài sản của", "sản của mình", "các khoản chi", "cơ quan có", "về bảo vệ",
  "vi phạm pháp", "phạm pháp luật", "có nghĩa vụ", "quốc gia có",
  "tăng trưởng kinh", "trưởng kinh tế", "phát triển bền", "triển bền vững", "di sản văn", "sản văn hoá", "việc làm này", "nguồn thu nhập", "nhà nước và",
  "quy định về", "xâm phạm quyền", "các quốc gia", "môi trường sống", "bảo hiểm xã", "hiểm xã hội", "kinh doanh của", "ở vùng này", "khám chữa bệnh", "được khám chữa",
  "chính sách hỗ", "sách hỗ trợ", "chính sách trợ", "sách trợ giúp", "chính sách bảo", "sách bảo đảm", "chính sách về", "sách về bảo", "luật quốc gia", "giúp người dân"]);
const chuP = (p) => (p.type === "note" ? [p.x] : chu(p).concat(p._d ? [p._d] : []));
const NOTES = DE.map((b) => { const o = { q: b.id + "-note", x: [b.note].join(" | "), topic: "note", type: "note", _de: b.id }; ten.set(o, b.id.replace("ktpl12-", "") + "-note"); return o; });
const soCua = (q) => (q.type === "num" ? [+q.ans] : q.type === "mc" ? [...String(q.o[0]).matchAll(new RegExp(NUM, "gu"))].map((x) => val(x[0])).filter((v) => !Number.isInteger(v) || Math.abs(v) >= 10) : []);
const doLo = (qs, them, cap) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    let C = [];
    const soDa = soCua(q);
    if (q.type === "mc") { const c3 = cum3(q.o[0]), sai = q.o.slice(1).map((o) => " " + tuCua(o).join(" ") + " ");
      C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)].filter((c) => sai.filter((o) => o.includes(" " + c + " ")).length < 2); }
    qs.concat(them).forEach((p) => {
      if (p === q || !cap(p, q)) return;
      const at = `${ten.get(p)} → ${ten.get(q)}: `, T = " " + chuP(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chuP(p).flatMap(kqSo).some((y) => gan(y, d))).forEach((d) => lo.push(at + d));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
// trong một đề (mọi câu cùng hiện) và với lời dặn, đoạn thông tin của đề
const r1 = doLo(TNQ, NOTES, (p, q) => p._de === q._de);
// cùng chủ đề (đề “Ôn chủ đề”): câu của đề thi thử với câu cùng chủ đề của đề thi thử khác và của ba kho (trừ câu tự luận)
const onCD = TNQ.concat(KHO_Q.filter((q) => q.type !== "essay" && TNQ.some((t) => t.topic === q.topic)));
const r2 = doLo(onCD, [], (p, q) => p.topic === q.topic && p._de !== q._de && (/^ktpl12-tn-/.test(p._de) || /^ktpl12-tn-/.test(q._de)));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác (xem tay):\n" + [...r1.chuLo, ...r2.chuLo].join("\n"));
// Đã xem tay (Phiên N12-tn-ktpl): chữ của đáp án có ở câu khác nhưng không chỉ ra đáp án.
const DA_XEM = [
  // câu hỏi chọn một nhóm, một loại: tên nhóm, loại là đáp án của câu này đứng trong lựa chọn của câu kia (chính sách an sinh xã hội,
  // kế hoạch trong bản kế hoạch kinh doanh, hình thức trách nhiệm xã hội, cấp độ hội nhập, chế độ đãi ngộ, quyền của chủ sở hữu, nguyên tắc của
  // pháp luật quốc tế, quyền dân chủ); lựa chọn không chỉ ra đáp án
  "ck1-de1#10 → tn-de1#15: hỗ trợ việc", "ck1-de1#10 → tn-de1#15: trợ việc làm", "ck1-de1#14 → tn-de1#16: kế hoạch tổ",
  "ck1-de1#14 → tn-de1#16: hoạch tổ chức", "ck1-de1#14 → tn-de1#16: tổ chức sản", "ck1-de1#14 → tn-de1#16: chức sản xuất",
  "ck1-de1#14 → tn-de2#16: kế hoạch tài", "ck1-de1#14 → tn-de2#16: hoạch tài chính", "ck1-de1#16 → tn-de2#16: kế hoạch tài",
  "ck1-de1#16 → tn-de2#16: hoạch tài chính", "ck1-de1#18 → tn-de2#17: trách nhiệm đạo", "ck1-de1#18 → tn-de2#17: nhiệm đạo đức",
  "ck1-de1#4 → tn-de2#13: hội nhập toàn", "ck1-de1#4 → tn-de2#13: nhập toàn cầu", "ck1-de2#10 → tn-de1#15: hỗ trợ việc",
  "ck1-de2#10 → tn-de1#15: trợ việc làm", "ck1-de2#16 → tn-de1#16: kế hoạch tổ", "ck1-de2#16 → tn-de1#16: hoạch tổ chức",
  "ck1-de2#16 → tn-de1#16: tổ chức sản", "ck1-de2#16 → tn-de1#16: chức sản xuất", "ck1-de2#18 → tn-de2#17: trách nhiệm đạo",
  "ck1-de2#18 → tn-de2#17: nhiệm đạo đức", "ck2-de1#20 → tn-de1#23: đãi ngộ đặc", "ck2-de1#20 → tn-de1#23: ngộ đặc biệt",
  "ck2-de2#16 → tn-de2#23: gia có nghĩa", "ck2-de2#16 → tn-de2#23: nghĩa vụ hợp", "ck2-de2#16 → tn-de2#23: vụ hợp tác",
  "ck2-de2#16 → tn-de2#23: hợp tác với", "ck2-de2#16 → tn-de2#23: tác với nhau", "ck2-de2#20 → tn-de1#23: đãi ngộ đặc",
  "ck2-de2#20 → tn-de1#23: ngộ đặc biệt", "gk2-de1#8 → tn-de1#18: quyền chiếm hữu", "gk2-de2#8 → tn-de1#18: quyền chiếm hữu",
  "tn-de1#15 → ck1-de1#10: trợ giúp xã", "tn-de1#15 → ck1-de1#10: giúp xã hội", "tn-de1#15 → ck1-de2#10: bảo đảm các",
  "tn-de1#15 → ck1-de2#10: đảm các dịch", "tn-de1#15 → ck1-de2#10: các dịch vụ", "tn-de1#15 → ck1-de2#10: dịch vụ xã",
  "tn-de1#15 → ck1-de2#10: vụ xã hội", "tn-de1#15 → ck1-de2#10: xã hội cơ", "tn-de1#15 → ck1-de2#10: hội cơ bản",
  "tn-de1#16 → tn-de2#16: kế hoạch tài", "tn-de1#16 → tn-de2#16: hoạch tài chính", "tn-de1#18 → gk2-de1#8: quyền sử dụng",
  "tn-de1#18 → gk2-de2#8: quyền định đoạt", "tn-de1#23 → ck2-de1#20: đãi ngộ quốc", "tn-de1#23 → ck2-de1#20: ngộ quốc gia",
  "tn-de2#10 → tn-de3#10: quyền tham gia", "tn-de2#10 → tn-de3#10: tham gia quản", "tn-de2#10 → tn-de3#10: gia quản lí",
  "tn-de2#10 → tn-de3#10: quản lí nhà", "tn-de2#10 → tn-de3#10: lí nhà nước", "tn-de2#13 → ck1-de1#4: hội nhập song",
  "tn-de2#13 → ck1-de1#4: nhập song phương", "tn-de2#17 → ck1-de1#18: trách nhiệm pháp", "tn-de2#17 → ck1-de1#18: nhiệm pháp lí",
  "tn-de2#17 → ck1-de2#18: trách nhiệm kinh", "tn-de2#17 → ck1-de2#18: nhiệm kinh tế",
  // lời giải của câu kho nói bảo hiểm xã hội tự nguyện do Nhà nước tổ chức; tn-de1#14 hỏi bảo hiểm y tế tự nguyện, lựa chọn sai là bảo hiểm
  // của doanh nghiệp tư nhân: phải biết bảo hiểm y tế tự nguyện cũng do Nhà nước cung cấp
  "ck1-de1#7 → tn-de1#14: tự nguyện do", "ck1-de1#7 → tn-de1#14: nguyện do nhà"
];
assert.deepEqual([...r1.chuLo, ...r2.chuLo].sort(), [...DA_XEM].sort(), "đáp án bằng chữ có ở câu khác đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual([...r1.lo, ...r2.lo], [], "lộ đáp án:\n" + [...r1.lo, ...r2.lo].join("\n"));

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (nếu có) ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const truongChu = (q) => (q.type === "note" ? [q.x] : chu(q));
// tra nhanh: các chuỗi k từ của chữ đề thi thử (Map chuỗi → các câu), đi một lượt qua chữ nguồn đã chuẩn hoá; trả về Map chuỗi → các mã nguồn có chuỗi đó
const chuoiDe = (k, them) => { const m = new Map(); TNQ.concat(NOTES).forEach((q) => new Set(truongChu(q).concat(them && q._d ? [q._d] : []).flatMap((x) => chuoi(x, k))).forEach((c) => { if (!m.has(c)) m.set(c, []); m.get(c).push(q); })); return m; };
const timChuoi = (nguon, k, ds) => {
  const dau = new Set([...ds.keys()].map((c) => c.split(" ").slice(0, 2).join(" "))), ra = new Map();
  nguon.forEach(({ id, t }) => { const w = t.split(" "); for (let i = 0; i + k <= w.length; i++) { if (!dau.has(w[i] + " " + w[i + 1])) continue; const c = w.slice(i, i + k).join(" ");
    if (ds.has(c)) { if (!ra.has(c)) ra.set(c, new Set()); ra.get(c).add(id); } } });
  return ra;
};
if (SACH.length) {
  assert.ok(["lop-10/giao-duc-kinh-te-va-phap-luat-10", "lop-11/giao-duc-kinh-te-va-phap-luat-11", "lop-12/giao-duc-kinh-te-va-phap-luat-12"].every((c) => SACH.some((f) => f.includes(c))), "OnUp-Book có GDKT&PL 10, 11, 12");
  // chủ đề lớp 12 đúng tên bài trong mục lục (README của GDKT&PL 12; tên rút gọn ở RUT_GON), tên chủ đề lớp 10, 11 đúng mục lục
  // chỉ đọc mục “## Mục lục” của README (README còn có bảng trang cập nhật năm 2026, cũng ghi “Bài …”)
  const ml = (l, c) => { const f = path.join(BOOK, l, c, "README.md"); if (!fs.existsSync(f)) return null; const r = fs.readFileSync(f, "utf8"), i = r.indexOf("## Mục lục");
    return i < 0 ? r : r.slice(i, (r.indexOf("\n## ", i + 5) + 1 || r.length + 1) - 1); };
  const hoa = (s) => s.normalize("NFC").toLocaleUpperCase("vi");
  const cdCua = (r) => [...r.matchAll(/Chủ đề \d+: ([^·|]+?) · Bài/g)].map((x) => hoa(x[1].trim()));
  const r12 = ml("lop-12", "giao-duc-kinh-te-va-phap-luat-12"), r11 = ml("lop-11", "giao-duc-kinh-te-va-phap-luat-11"), r10 = ml("lop-10", "giao-duc-kinh-te-va-phap-luat-10");
  if (r12) { const bai = [...r12.matchAll(/Bài (\d+): ([^|]+?) \|/g)].map((x) => x[2].trim());
    assert.equal(bai.length, 16, "GDKT&PL 12 có 16 bài trong mục lục");
    BAI.forEach((t, i) => assert.equal(bai[i], RUT_GON[t] || t, "chủ đề đúng tên Bài " + (i + 1) + " trong mục lục"));
    assert.deepEqual(cdCua(r12), CHU_DE_12.map((c) => hoa(c[0])), "chín chủ đề của GDKT&PL 12 theo mục lục"); }
  if (r11) assert.deepEqual(cdCua(r11), Object.values(CHU_DE_11).map(hoa), "chín chủ đề của GDKT&PL 11 theo mục lục");
  if (r10) assert.deepEqual(cdCua(r10), Object.values(CHU_DE_10).map(hoa), "chín chủ đề của GDKT&PL 10 theo mục lục");
  const sach = SACH.map((f) => ({ id: f, t: khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")) }));
  const bao = (k) => { const ds = chuoiDe(k, true), gap = timChuoi(sach, k, ds); return [...gap.keys()].flatMap((c) => ds.get(c).map((q) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách:\n" + [...new Set(bao(8))].join("\n"));
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả ba kho GDKT&PL 12 và giữa các đề thi thử ---------- */
{
  const cua = (b, q) => ({ id: b.id, t: chu(q).concat(dpOf(b, q) ? [dpOf(b, q)] : []).map(khongDau).join(" | ") });
  const khac = BANKS.filter((b) => !b.pool).flatMap((b) => b.questions.map((q) => cua(b, q))).concat(BANKS.filter((b) => b.pool).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => { const ds = chuoiDe(k, true), gap = timChuoi(khac, k, ds);
    return [...gap.keys()].flatMap((c) => ds.get(c).flatMap((q) => [...gap.get(c)].filter((id) => id !== q._de).map((id) => `${ten.get(q)} ~ ${id}: ${c}`))); };
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác:\n" + [...new Set(bao(8))].join("\n"));
}

/* ---------- tự thử các bộ tính với câu cố ý viết sai ---------- */
{
  // bộ tính tiền để dành: đổi số tiền cho thuê trong đề thì đáp án tính được không còn khớp
  const qD = TNQ.find((q) => /tiền cho thuê một gian hàng/.test(q.q)), mD = RIENG[qD._de].find((c) => qD.q.includes(c.has));
  assert.throws(() => mD.right(Object.assign({}, qD, { q: qD.q.replace(/và \d+ triệu đồng tiền cho thuê/, "và 9 triệu đồng tiền cho thuê") })), "bộ tính bắt được số liệu đổi");
  assert.equal(mucTieu(4), "trung hạn"); assert.equal(mucTieu(0.5), "ngắn hạn"); assert.equal(mucTieu(8), "dài hạn"); assert.throws(() => mucTieu(5));
  assert.equal(lamPhat(4.5), "lạm phát vừa phải"); assert.equal(lamPhat(10), "lạm phát phi mã"); assert.equal(lamPhat(1500), "siêu lạm phát");
  // bộ dò lộ bắt được câu cố ý viết sai: đáp án của câu này chép vào lời giải câu khác
  const thu = (qs) => { const r = doLo(qs, [], () => true); return r.lo.concat(r.chuLo); };
  const ghi = (q, x) => { const o = Object.assign({}, q, { x: q.x + " " + x }); ten.set(o, "thử-giả"); return o; };
  const qA = TNQ.find((q) => q.type === "mc" && !/\d/.test(q.o[0]) && q.o[0].split(" ").length >= 4), qK = TNQ.find((q) => q !== qA && q._de === qA._de && q.type === "mc");
  assert.ok(thu([qA, ghi(qK, qA.o[0] + ".")]).some((s) => s.startsWith("thử-giả → ")), "bộ dò lộ bắt được đáp án chép sang câu khác");
  assert.ok(thu([qD, ghi(qK, "Số tiền đó bằng " + viet(soCua(qD)[0]) + " triệu đồng.")]).some((s) => s.startsWith("thử-giả → ")), "bộ dò lộ bắt được số của đáp án");
}
DE.forEach((b) => console.log(`${b.id}: ${b.questions.length} câu (${b.questions.filter((q) => q.type === "mc").length} nhiều lựa chọn, ${b.questions.filter((q) => q.type === "tf4").length} đúng/sai 4 ý), ` +
  `${b.questions.filter((q) => lop(q.topic) === 10).length} câu lớp 10, ${b.questions.filter((q) => lop(q.topic) === 11).length} câu lớp 11, ${Object.keys(b.passages || {}).length} đoạn thông tin, ${b._th} câu tình huống; ` +
  `đáp án đúng dài nhất hoặc ngắn nhất ở ${b._le}/${b._mc} câu nhiều lựa chọn.`));
console.log(n + " câu đã tính lại hoặc so với bảng.");
console.log("MATH OK");
