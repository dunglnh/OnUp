// Kiểm tra ngân hàng Tiếng Việt 5 giữa kì II của Phiên N5-gk2-tv (data/banks/5-tv.js, tv5-gk2-*), theo mẫu tests/tv5-ck1.js. Kho = Đề 1 +
// Đề 2 + câu riêng của đề ngẫu nhiên; số câu, số đề lấy từ danh mục.
// Đọc lại đáp án mọi câu Luyện từ và câu bằng bảng ghi trong script (CHECKS: mỗi câu khớp đúng một mục, nhận ra câu bằng một đoạn chữ của
// đề bài): vế câu theo cụm chủ ngữ – vị ngữ (VE: mỗi câu đem hỏi ghi “chủ ngữ | vị ngữ” của từng vế; chủ ngữ, vị ngữ phải có trong câu,
// vị ngữ đứng ngay sau chủ ngữ, các vế đúng thứ tự) cho câu đơn, câu ghép, số vế, vế thứ hai, gộp và tách câu, thêm vế câu; cách nối các
// vế (cặp kết từ, cặp từ hô ứng có một vế trước, một vế sau vế đầu; một kết từ nằm giữa hai vế; không có từ nối là nối trực tiếp), quan
// hệ giữa hai vế theo cặp kết từ, kết từ; liên kết câu: từ ngữ lặp lại (có ở cả hai câu, ngoài các từ ấy hai câu không chung từ nào khác
// trừ hư từ ở HU_TU), từ ngữ nối đứng đầu câu (TU_NOI), từ ngữ thay thế (THAY: câu chứa từ ngữ thay thế → từ ngữ được thay, có ở câu
// trước, không có ở câu chứa từ thay thế); câu đúng/sai 4 ý đọc từng ý theo mẫu chữ; đáp án chỉ khớp một lựa chọn. Câu chọn từ, cặp từ
// hợp văn cảnh ghi đáp án ở HOP (câu đã điền phải có trong VE, đúng cặp, đúng vị trí). Đọc hiểu: chữ trích trong ngoặc kép ở đề bài, lời
// giải có đúng trong đoạn đọc; câu sắp xếp sự việc đúng thứ tự trong đoạn (THU_TU).
// Rồi kiểm tra ma trận 10 – 8 – 7 (hai đề cố định đúng ma trận; ô Luyện từ và câu có rút có 2 câu riêng cho mỗi câu ô đó rút, một câu ở
// mỗi đề cố định cho mỗi câu ô đó rút), đoạn đọc (đoạn 4 câu mức 1-1-2-3, đoạn 3 câu mức 1-2-3), câu Viết (chỉ tự luận, đủ các kiểu bài
// Viết của Bài 1–16: bài văn tả người, mở bài và kết bài, dàn ý, đoạn văn tả hoạt động của người, đoạn văn thể hiện tình cảm, cảm xúc về
// một sự việc, chương trình hoạt động; 4–6 ý chấm, 5 điểm), dạng câu (đúng/sai 4 ý không lặp kiểu Đ/S; có điền, đúng/sai, trả lời bằng
// số, nối cột, sắp xếp), gọi người làm bài là “bạn”, đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất (kể
// cả bằng nhau) ở không quá một phần ba số câu nhiều lựa chọn, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án không có, không
// lặp chữ của nhãn chủ đề, đề bài không trùng câu nào trong file, rút thử (đúng ma trận, trọn đoạn; đã làm hết một đề cố định thì không
// rút lại câu của đề đó), dò lộ đáp án giữa mọi cặp câu của kho (đề “Ôn chủ đề” rút chung mọi câu của một chủ đề, đề ngẫu nhiên rút chung
// câu của các chủ đề khác; cả lời dặn của đề), đề bài không gần trùng câu của data/banks/4-tv.js và kho Tiếng Việt 5 cuối kì I (cặp hai
// âm tiết chung) và, nếu có ../OnUp-Book, so mọi trường chữ (cả đoạn đọc) với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng), so với
// câu của mọi kho khác, cả kho Tiếng Việt 5 cuối kì I và câu riêng của các đề ngẫu nhiên (không chuỗi 8 từ nào trùng).
// Chạy: node tests/tv5-gk2.js → in TV5 GK2 OK. DO_LO=1 in đáp án có ở câu khác (để xem tay, danh sách đã xem ở DA_XEM); DO_SACH=1 in
// chuỗi 6 từ trùng sách; DO_KHO=1 in chuỗi 6 từ trùng kho khác và câu gần trùng kho Tiếng Việt 4, Tiếng Việt 5 cuối kì I.
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
const S = { de1: "tv5-gk2-de1", de2: "tv5-gk2-de2", pool: "tv5-gk2-ngau-nhien" };
const DE = [S.de1, S.de2];
const sum = (a) => a.reduce((s, v) => s + v, 0);
const nfc = (s) => String(s).normalize("NFC");
const thuong = (s) => nfc(s).toLowerCase();

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, DE, "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 40, b.id + ": 40 phút (có câu Viết tự chấm, như kho Tiếng Việt 5 cuối kì I)");
  assert.equal(b.grade, 5); assert.equal(b.subject, "Tiếng Việt"); assert.equal(b.file, "5-tv.js");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
assert.ok(rieng.length >= 45 && rieng.length <= 60, "đề ngẫu nhiên có khoảng 50 câu riêng: " + rieng.length);
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
{ // mã đoạn đọc không trùng giữa hai đề cố định và phần câu riêng, cũng không trùng mã đoạn của kho cuối kì I cùng file
  const riengP = [...new Set(kho.filter((q) => q.src === S.pool && q.p).map((q) => q.p))];
  const ma = Object.keys(d1.passages).concat(Object.keys(d2.passages), riengP);
  assert.equal(new Set(ma).size, ma.length, "mã đoạn đọc không trùng giữa các đề");
  const ck1 = BANKS.filter((b) => b.file === "5-tv.js" && !/^tv5-gk2-/.test(b.id)).flatMap((b) => Object.keys(b.passages || {}));
  ma.forEach((m) => assert.ok(!ck1.includes(m), "mã đoạn đọc trùng kho khác cùng file: " + m));
  assert.ok(kho.every((q) => !q.p || PSG[q.p]), "câu có đoạn đọc trỏ tới đoạn có thật");
}
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("tv5-gk2-", "") + "#" + (i + 1))));
const cal = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
{
  const m = /id: "gk2-l5"[\s\S]*?banks: \[([^\]]*)\]/.exec(cal);
  assert.ok(m, "có kì thi gk2-l5");
  [S.de1, S.de2, S.pool].forEach((id) => assert.ok(m[1].includes(`"${id}"`), "gk2-l5 gắn đề " + id));
  const sc = /id: "gk2-l5"[\s\S]*?scope: "([^"]*)"/.exec(cal);
  assert.ok(sc && /Tiếng Việt: tập 2, Bài 1–16 \(tuần 19–26\)/.test(sc[1]), "scope của gk2-l5 ghi phạm vi Tiếng Việt");
}

/* ---------- chữ trong câu ---------- */
const trich = (s) => [...nfc(s).matchAll(/“([^”]*)”/g)].map((m) => m[1]); // các đoạn trong ngoặc kép
const thoat = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const tuRe = (tu) => new RegExp("(^|[^\\p{L}])" + thoat(thuong(tu)) + "(?![\\p{L}])", "u");
const coTu = (cau, tu) => tuRe(tu).test(thuong(cau));
const viTri = (cau, tu, tu0) => { // vị trí đầu của từ (cụm từ) trong câu, tìm từ vị trí tu0
  const t = thuong(cau), m = tuRe(tu).exec(t.slice(tu0 || 0));
  return m ? (tu0 || 0) + m.index + m[1].length : -1;
};
const mot = (q, ok, at) => { // đúng một lựa chọn thoả ok, và đó là lựa chọn đúng (đứng đầu mảng)
  const hit = q.o.filter(ok);
  assert.deepEqual(hit, [q.o[0]], `${at}: lựa chọn khớp ${JSON.stringify(hit)}, cần đúng một lựa chọn là đáp án ${JSON.stringify(q.o[0])}`);
};
const bang = (s) => thuong(s).replace(/[.!?…]+$/, "").replace(/\s+/g, " ").trim(); // khoá so câu: chữ thường, bỏ dấu kết câu

/* ---------- vế câu (theo Ghi nhớ tr. 10: câu đơn có một cụm chủ ngữ – vị ngữ; câu ghép gồm nhiều cụm, mỗi cụm là một vế) ----------
   Mỗi câu đem hỏi ghi “chủ ngữ | vị ngữ” của từng vế, theo thứ tự trong câu. Trạng ngữ, kết từ, dấu câu nằm ngoài các vế. */
const VE = {
  // Đề 1
  "Mặt trời lên cao, sương tan dần trên mặt hồ.": ["Mặt trời | lên cao", "sương | tan dần trên mặt hồ"],
  "Những giọt sương long lanh trên lá sen.": ["Những giọt sương | long lanh trên lá sen"],
  "Sáng sớm, mặt hồ phủ một lớp sương mỏng như khói.": ["mặt hồ | phủ một lớp sương mỏng như khói"],
  "Đàn cò trắng bay qua mặt hồ yên ả.": ["Đàn cò trắng | bay qua mặt hồ yên ả"],
  "Trời tối dần, đèn trong các ngôi nhà lần lượt sáng lên, chó sủa râm ran khắp xóm.": ["Trời | tối dần", "đèn trong các ngôi nhà | lần lượt sáng lên", "chó | sủa râm ran khắp xóm"],
  "Bố tưới cây.": ["Bố | tưới cây"], "Em nhặt cỏ.": ["Em | nhặt cỏ"],
  "Bố tưới cây, em nhặt cỏ.": ["Bố | tưới cây", "em | nhặt cỏ"],
  "Bố tưới cây và nhặt cỏ.": ["Bố | tưới cây và nhặt cỏ"],
  "Bố và em tưới cây, nhặt cỏ.": ["Bố và em | tưới cây, nhặt cỏ"],
  "Bố tưới cây, nhặt cỏ cho em.": ["Bố | tưới cây, nhặt cỏ cho em"],
  "Con đường làng nhỏ hẹp nhưng xe cộ qua lại tấp nập.": ["Con đường làng | nhỏ hẹp", "xe cộ | qua lại tấp nập"],
  "Đường lên đỉnh núi càng dốc, đoàn leo núi càng phải bước chậm.": ["Đường lên đỉnh núi | càng dốc", "đoàn leo núi | càng phải bước chậm"],
  "Ông quét sân, bà cho gà ăn.": ["Ông | quét sân", "bà | cho gà ăn"],
  "Ông quét sân và bà cho gà ăn.": ["Ông | quét sân", "bà | cho gà ăn"],
  "Ông chưa quét sân xong, bà đã cho cả đàn gà ăn.": ["Ông | chưa quét sân xong", "bà | đã cho cả đàn gà ăn"],
  "Trời vừa tạnh mưa, lũ trẻ đã ùa ra sân.": ["Trời | vừa tạnh mưa", "lũ trẻ | đã ùa ra sân"],
  "Ngày chủ nhật, cả nhà em dọn dẹp nhà cửa.": ["cả nhà em | dọn dẹp nhà cửa"],
  "Bố lau quạt, mẹ giặt rèm cửa.": ["Bố | lau quạt", "mẹ | giặt rèm cửa"],
  "Chị Hà quét nhà và em lau bàn ghế.": ["Chị Hà | quét nhà", "em | lau bàn ghế"],
  "Nhà cửa sạch sẽ nên ai cũng thấy vui.": ["Nhà cửa | sạch sẽ", "ai | cũng thấy vui"],
  "Hễ trời trở rét thì bà lại nhóm bếp lửa sưởi ấm cả nhà.": ["trời | trở rét", "bà | lại nhóm bếp lửa sưởi ấm cả nhà"],
  // Đề 2
  "Cả lớp chăm chú nghe câu chuyện của cô giáo.": ["Cả lớp | chăm chú nghe câu chuyện của cô giáo"],
  "Cô giáo kể chuyện, cả lớp chăm chú lắng nghe.": ["Cô giáo | kể chuyện", "cả lớp | chăm chú lắng nghe"],
  "Cô giáo kể chuyện rất hay nên cả lớp ngồi im phăng phắc.": ["Cô giáo | kể chuyện rất hay", "cả lớp | ngồi im phăng phắc"],
  "Câu chuyện kết thúc, cả lớp vỗ tay rào rào.": ["Câu chuyện | kết thúc", "cả lớp | vỗ tay rào rào"],
  "Ngoài đồng, lúa đã chín vàng, chim sẻ ríu rít bay về.": ["lúa | đã chín vàng", "chim sẻ | ríu rít bay về"],
  "Mặt trời đã lặn, đàn trâu thong thả về chuồng.": ["Mặt trời | đã lặn", "đàn trâu | thong thả về chuồng"],
  "Mặt trời đã lặn, sau một ngày dài trên cánh đồng.": ["Mặt trời | đã lặn"],
  "Mặt trời đã lặn, thong thả trên con đường làng.": ["Mặt trời | đã lặn"],
  "Mặt trời đã lặn, ở phía sau rặng tre xanh.": ["Mặt trời | đã lặn"],
  "Bố em là bác sĩ, còn mẹ em là cô giáo.": ["Bố em | là bác sĩ", "mẹ em | là cô giáo"],
  "Giá hôm nay trời không mưa thì cả lớp đã đi cắm trại.": ["trời | không mưa", "cả lớp | đã đi cắm trại"],
  "Sáng sớm, gà gáy râm ran; bếp nhà ai đã đỏ lửa; con đường làng thức dậy.": ["gà | gáy râm ran", "bếp nhà ai | đã đỏ lửa", "con đường làng | thức dậy"],
  "Cây bút đã cũ mà chữ viết vẫn đều và đẹp.": ["Cây bút | đã cũ", "chữ viết | vẫn đều và đẹp"],
  "Mùa thu, trời trong xanh.": ["trời | trong xanh"],
  "Những cánh đồng lúa chín vàng óng.": ["Những cánh đồng lúa | chín vàng óng"],
  "Gió thổi nhè nhẹ, sóng lúa dập dờn.": ["Gió | thổi nhè nhẹ", "sóng lúa | dập dờn"],
  "Lũ trẻ chạy nhảy trên bờ đê.": ["Lũ trẻ | chạy nhảy trên bờ đê"],
  "Vì cả đội đã tập luyện rất chăm chỉ nên đội em đã giành chiến thắng.": ["cả đội | đã tập luyện rất chăm chỉ", "đội em | đã giành chiến thắng"],
  // Câu riêng của đề ngẫu nhiên
  "Chim hót líu lo, hoa nở rực rỡ khắp vườn.": ["Chim | hót líu lo", "hoa | nở rực rỡ khắp vườn"],
  "Chim sâu và chim sẻ nhảy nhót trên cành.": ["Chim sâu và chim sẻ | nhảy nhót trên cành"],
  "Trong vườn, hoa hồng nở đỏ và toả hương thơm.": ["hoa hồng | nở đỏ và toả hương thơm"],
  "Những chú chim nhỏ chuyền cành và hót líu lo.": ["Những chú chim nhỏ | chuyền cành và hót líu lo"],
  "Bầu trời cao vời vợi và trong xanh.": ["Bầu trời | cao vời vợi và trong xanh"],
  "Bầu trời trong xanh, nắng vàng rực rỡ.": ["Bầu trời | trong xanh", "nắng | vàng rực rỡ"],
  "Bầu trời trong xanh nhưng gió vẫn lạnh.": ["Bầu trời | trong xanh", "gió | vẫn lạnh"],
  "Mây trắng trôi lững lờ, nắng vàng trải khắp nơi.": ["Mây trắng | trôi lững lờ", "nắng vàng | trải khắp nơi"],
  "Chiều chủ nhật, cả nhà em ra công viên.": ["cả nhà em | ra công viên"],
  "Bố chơi cầu lông với anh Hải, mẹ trải tấm thảm dưới gốc cây.": ["Bố | chơi cầu lông với anh Hải", "mẹ | trải tấm thảm dưới gốc cây"],
  "Em chạy theo những cánh bướm vàng.": ["Em | chạy theo những cánh bướm vàng"],
  "Mặt trời lặn, cả nhà mới ra về.": ["Mặt trời | lặn", "cả nhà | mới ra về"],
  "Gió thổi lồng lộng, mặt hồ gợn sóng lăn tăn, mấy chiếc thuyền nhỏ lướt đi, đàn le le vụt bay lên.": ["Gió | thổi lồng lộng", "mặt hồ | gợn sóng lăn tăn", "mấy chiếc thuyền nhỏ | lướt đi", "đàn le le | vụt bay lên"],
  "Các bạn nam đá cầu, các bạn nữ nhảy dây.": ["Các bạn nam | đá cầu", "các bạn nữ | nhảy dây"],
  "Các bạn nam và các bạn nữ cùng chơi đá cầu.": ["Các bạn nam và các bạn nữ | cùng chơi đá cầu"],
  "Trong giờ ra chơi, các bạn nam đá cầu ở góc sân.": ["các bạn nam | đá cầu ở góc sân"],
  "Các bạn nữ nhảy dây rồi chơi ô ăn quan.": ["Các bạn nữ | nhảy dây rồi chơi ô ăn quan"],
  "Hoa phượng nở đỏ rực, tiếng ve kêu râm ran.": ["Hoa phượng | nở đỏ rực", "tiếng ve | kêu râm ran"],
  "Hoa phượng nở đỏ rực.": ["Hoa phượng | nở đỏ rực"], "Tiếng ve kêu râm ran.": ["Tiếng ve | kêu râm ran"],
  "Căn phòng của Hà không rộng, song mọi đồ vật đều được xếp gọn gàng.": ["Căn phòng của Hà | không rộng", "mọi đồ vật | đều được xếp gọn gàng"],
  "Ông trồng bao nhiêu cây, khu vườn có thêm bấy nhiêu bóng mát.": ["Ông | trồng bao nhiêu cây", "khu vườn | có thêm bấy nhiêu bóng mát"],
  "Nhờ các chú công nhân làm việc ngày đêm mà cây cầu mới đã kịp thông xe.": ["các chú công nhân | làm việc ngày đêm", "cây cầu mới | đã kịp thông xe"],
  "Mỗi tối, bà kể chuyện cổ tích hoặc ông đọc báo cho cả nhà nghe.": ["bà | kể chuyện cổ tích", "ông | đọc báo cho cả nhà nghe"],
  "Dù đường đến trường rất xa nhưng Hùng chưa đi học muộn buổi nào.": ["đường đến trường | rất xa", "Hùng | chưa đi học muộn buổi nào"],
  "Chiều nay bạn ở nhà ôn bài hay bạn sang nhà bà chơi?": ["bạn | ở nhà ôn bài", "bạn | sang nhà bà chơi"],
  "Bác lao công quét đến đâu, sân trường sạch bong đến đó.": ["Bác lao công | quét đến đâu", "sân trường | sạch bong đến đó"],
  "Bởi Nam chăm chỉ tập luyện nên bạn ấy đã giành giải nhất môn cờ vua.": ["Nam | chăm chỉ tập luyện", "bạn ấy | đã giành giải nhất môn cờ vua"],
  "Vì đường trơn nên mọi người đi rất chậm.": ["đường | trơn", "mọi người | đi rất chậm"],
  "Đường trơn, mọi người đi rất chậm.": ["Đường | trơn", "mọi người | đi rất chậm"],
  "Đường trơn nhưng xe máy vẫn phóng nhanh.": ["Đường | trơn", "xe máy | vẫn phóng nhanh"],
  "Trời càng mưa to, đường càng trơn.": ["Trời | càng mưa to", "đường | càng trơn"],
  "Nắng lên, sương tan, chim chóc ríu rít gọi nhau.": ["Nắng | lên", "sương | tan", "chim chóc | ríu rít gọi nhau"],
  "Nắng lên, những giọt sương trên cỏ tan dần.": ["Nắng | lên", "những giọt sương trên cỏ | tan dần"],
  "Chim chóc ríu rít gọi nhau trên những cành cây cao.": ["Chim chóc | ríu rít gọi nhau trên những cành cây cao"],
  "Nắng đã lên nhưng sương vẫn đọng trên lá.": ["Nắng | đã lên", "sương | vẫn đọng trên lá"],
  "Mặc dù bài toán rất khó nhưng Lan vẫn kiên nhẫn tìm ra cách giải.": ["bài toán | rất khó", "Lan | vẫn kiên nhẫn tìm ra cách giải"],
  "Tuy sân bóng đã cũ nhưng các bạn vẫn chơi rất say sưa.": ["sân bóng | đã cũ", "các bạn | vẫn chơi rất say sưa"],
  "Vì sân bóng đã cũ nên các bạn vẫn chơi rất say sưa.": ["sân bóng | đã cũ", "các bạn | vẫn chơi rất say sưa"],
  "Chẳng những sân bóng đã cũ mà các bạn vẫn chơi rất say sưa.": ["sân bóng | đã cũ", "các bạn | vẫn chơi rất say sưa"],
  "Sân bóng đã cũ nên các bạn vẫn chơi rất say sưa.": ["Sân bóng | đã cũ", "các bạn | vẫn chơi rất say sưa"],
  "Sân bóng đã cũ.": ["Sân bóng | đã cũ"], "Các bạn vẫn chơi rất say sưa.": ["Các bạn | vẫn chơi rất say sưa"]
};
const VE_B = new Map(Object.entries(VE).map(([k, v]) => [bang(k), { cau: k, ve: v }]));
assert.equal(VE_B.size, Object.keys(VE).length, "bảng VE có hai câu trùng nhau");
const veCua = (cau) => { // [{cn, vn, dau, cuoi}] theo thứ tự trong câu
  const e = VE_B.get(bang(cau));
  assert.ok(e, "chưa ghi vế câu trong VE: " + cau);
  let tu0 = 0;
  return e.ve.map((s) => {
    const [cn, vn] = s.split(" | ");
    const a = viTri(cau, cn, tu0);
    assert.ok(a >= 0, `VE: chủ ngữ “${cn}” không có trong câu “${cau}” (sau vế trước)`);
    const b = a + cn.length;
    assert.ok(new RegExp("^\\s+" + thoat(thuong(vn)) + "(?![\\p{L}])", "u").test(thuong(cau).slice(b)), `VE: vị ngữ “${vn}” không đứng ngay sau chủ ngữ “${cn}” trong câu “${cau}”`);
    const c = thuong(cau).indexOf(thuong(vn), b);
    tu0 = c + vn.length;
    return { cn, vn, dau: a, cuoi: tu0 };
  });
};
const soVe = (cau) => veCua(cau).length;
const veChu = (v) => v.cn + " " + v.vn;
Object.keys(VE).forEach(veCua); // mọi dòng của bảng đọc được

/* ---------- cách nối các vế (Ghi nhớ tr. 20, 28) ---------- */
const KET = { "và": "noi-tiep", "rồi": "noi-tiep", "còn": "doi-chieu", "nhưng": "tuong-phan", "mà": "tuong-phan", "song": "tuong-phan", "hoặc": "lua-chon",
  "hay": "lua-chon", "nên": "nguyen-nhan" };
const CAP_KT = { "vì… nên": "nguyen-nhan", "bởi… nên": "nguyen-nhan", "do… nên": "nguyen-nhan", "nhờ… mà": "nguyen-nhan", "nhờ… nên": "nguyen-nhan",
  "nếu… thì": "dieu-kien", "hễ… thì": "dieu-kien", "giá… thì": "dieu-kien", "tuy… nhưng": "tuong-phan", "mặc dù… nhưng": "tuong-phan",
  "dù… nhưng": "tuong-phan", "chẳng những… mà": "tang-tien", "không những… mà": "tang-tien", "không chỉ… mà": "tang-tien" };
const CAP_HU = { "vừa… đã": "ho-ung", "chưa… đã": "ho-ung", "càng… càng": "ho-ung", "đâu… đó": "ho-ung", "bao nhiêu… bấy nhiêu": "ho-ung" };
const CAP = Object.assign({}, CAP_KT, CAP_HU);
// cặp từ nối các vế: phần đầu đứng trước vế thứ hai, phần sau ở vế thứ hai hoặc giữa hai vế; bỏ cặp nằm trong một cặp dài hơn (“dù” trong “mặc dù”)
const capNoi = (cau) => {
  const vs = veCua(cau); if (vs.length < 2) return [];
  const hit = Object.keys(CAP).filter((c) => { const [a, b] = c.split("… "); const i = viTri(cau, a); return i >= 0 && i < vs[1].dau && viTri(cau, b, Math.max(i + a.length, vs[0].dau + vs[0].cn.length)) >= 0; });
  return hit.filter((c) => !hit.some((d) => d !== c && d.split("… ")[0].endsWith(" " + c.split("… ")[0]) && d.split("… ")[1] === c.split("… ")[1]));
};
const ketGiua = (cau) => { // các từ nằm giữa các vế (bỏ dấu câu)
  const vs = veCua(cau), t = thuong(cau);
  return vs.slice(1).map((v, k) => t.slice(vs[k].cuoi, v.dau).replace(/[^\p{L}\s]/gu, " ").trim()).filter(Boolean);
};
const cachNoi = (cau) => { // "truc-tiep" | "ket-tu" | "cap-ket-tu" | "ho-ung"; câu đơn: null
  const vs = veCua(cau); if (vs.length < 2) return null;
  const c = capNoi(cau);
  assert.ok(c.length <= 1, "câu có hai cặp từ nối: " + cau);
  if (c.length) return CAP_HU[c[0]] ? "ho-ung" : "cap-ket-tu";
  const g = ketGiua(cau);
  if (!g.length) return "truc-tiep";
  g.forEach((x) => assert.ok(KET[x], `từ nằm giữa hai vế không phải kết từ: “${x}” trong “${cau}”`));
  return "ket-tu";
};
const quanHe = (cau) => { const c = capNoi(cau); if (c.length) return CAP[c[0]]; const g = ketGiua(cau); return g.length === 1 ? KET[g[0]] : null; };
const CACH = { "Nối trực tiếp, không dùng từ nối": "truc-tiep", "Nối bằng một kết từ": "ket-tu", "Nối bằng một cặp kết từ": "cap-ket-tu", "Nối bằng một cặp từ hô ứng": "ho-ung" };
const QH_LUA_CHON = { "Hai vế có ý trái ngược với nhau": "tuong-phan", "Hai vế chỉ nguyên nhân và kết quả": "nguyen-nhan",
  "Hai vế chỉ điều kiện và kết quả": "dieu-kien", "Hai vế chỉ hai ý, ý sau cao hơn ý trước": "tang-tien" };
// tự thử
assert.equal(cachNoi("Bố tưới cây, em nhặt cỏ."), "truc-tiep");
assert.equal(cachNoi("Ông quét sân và bà cho gà ăn."), "ket-tu");
assert.equal(cachNoi("Giá hôm nay trời không mưa thì cả lớp đã đi cắm trại."), "cap-ket-tu");
assert.equal(cachNoi("Trời vừa tạnh mưa, lũ trẻ đã ùa ra sân."), "ho-ung");
assert.deepEqual(capNoi("Mặc dù bài toán rất khó nhưng Lan vẫn kiên nhẫn tìm ra cách giải."), ["mặc dù… nhưng"]);
assert.equal(cachNoi("Bố tưới cây và nhặt cỏ."), null);
// câu ghép có chỗ trống: thay lần lượt các phần của cặp từ (hay một kết từ) vào chỗ “…”
const dien = (cau, tu) => { const ps = tu.split("… "); let k = 0; const ra = cau.replace(/\s*…\s*/g, (m) => (k < ps.length ? (m.startsWith(" ") ? " " : "") + ps[k++] + (m.endsWith(" ") ? " " : "") : m)).replace(/\s+([,.])/g, "$1");
  assert.equal(k, ps.length, "số chỗ trống khác số phần của từ cần điền: " + cau); return ra.charAt(0).toUpperCase() + ra.slice(1); };
assert.equal(dien("Trời … tạnh mưa, lũ trẻ … ùa ra sân.", "vừa… đã"), "Trời vừa tạnh mưa, lũ trẻ đã ùa ra sân.");
assert.equal(dien("… Nam chăm chỉ tập luyện … bạn ấy đã giành giải nhất môn cờ vua.", "Bởi… nên"), "Bởi Nam chăm chỉ tập luyện nên bạn ấy đã giành giải nhất môn cờ vua.");

/* ---------- liên kết câu (Ghi nhớ tr. 45, 55, 63) ---------- */
// từ ngữ nối (tr. 55 và các từ cùng loại); nghĩa dùng để đọc lại câu chọn từ ngữ nối hợp văn cảnh
const TU_NOI = { "vì vậy": "ket-qua", "vì thế": "ket-qua", "thế là": "ket-qua", "trái lại": "tuong-phan", "tuy vậy": "tuong-phan", "nhưng": "tuong-phan",
  "ngoài ra": "bo-sung", "bên cạnh đó": "bo-sung", "đầu tiên": "thu-tu-dau", "sau đó": "thu-tu", "tiếp theo": "thu-tu", "rồi": "thu-tu",
  "cuối cùng": "thu-tu-cuoi", "thứ nhất": "liet-ke-1", "thứ hai": "liet-ke-2", "ngược lại": "tuong-phan", "sau cùng": "thu-tu-cuoi", "hơn nữa": "bo-sung",
  "do đó": "ket-qua", "không những thế": "bo-sung" };
const noiDau = (s) => Object.keys(TU_NOI).sort((a, b) => b.length - a.length).find((t) => new RegExp("^" + thoat(t) + "(?![\\p{L}])", "u").test(thuong(s).trim())) || null;
// hư từ, đại từ không tính khi tìm từ ngữ lặp lại
const HU_TU = new Set(["và", "là", "có", "một", "những", "các", "của", "cho", "đã", "đang", "sẽ", "rất", "lại", "cũng", "thì", "mà", "với", "trong", "ở",
  "đến", "từ", "ra", "vào", "lên", "như", "nào", "này", "ấy", "đó", "kia", "em", "nhiều", "không", "được", "mới", "còn", "đều", "vẫn", "hay", "nhưng",
  "vì", "thế", "vậy", "nên", "bị", "để", "khi", "lúc", "sau", "trước", "cả", "mỗi", "chỉ"]);
const tuNoiDung = (s) => new Set(thuong(s).replace(/[^\p{L}\s]/gu, " ").split(/\s+/).filter((w) => w && !HU_TU.has(w)));
const lapGiua = (s1, s2) => { const a = tuNoiDung(s1); return [...tuNoiDung(s2)].filter((w) => a.has(w)); };
// từ ngữ thay thế: câu chứa từ ngữ thay thế → { từ ngữ thay thế: từ ngữ được thay }
const THAY = {
  "Chúng lặn ngụp, rỉa lông, kêu cạc cạc vui vẻ.": { "chúng": "đàn vịt nhà bác Năm" },
  "Người giáo viên trẻ ấy còn chơi đàn ghi-ta rất hay.": { "người giáo viên trẻ ấy": "Cô Hạnh" },
  "Vì thế, bạn nhỏ đặt chậu cây ở bậu cửa sổ đầy nắng.": { "bạn nhỏ": "Hà" },
  "Cô bé lúc nào cũng nhanh nhẹn, vui vẻ.": { "cô bé": "bạn Minh Anh" },
  "Hai chị em xách giúp mẹ những túi rau quả nặng.": { "hai chị em": "Hoa và em gái" },
  "Mỗi sáng, nó lại hót ríu ran bên cửa sổ.": { "nó": "một chú chim khuyên" },
  "Người lính già ấy vẫn giữ chiếc ba lô cũ như một kỉ vật.": { "người lính già ấy": "Ông ngoại em" },
  "Nó đã toả bóng mát cho bao lớp học trò.": { "nó": "một cây phượng già" },
  "Đây là dịp để các bạn học sinh thi tài thể thao.": { "đây": "Hội khoẻ Phù Đổng" },
  "Tùng thường ra đó ngồi câu cá với ông nội.": { "đó": "một con kênh nhỏ" },
  "Ông dạy cậu bé cách mắc mồi, buông câu.": { "cậu bé": "bạn Tùng" },
  "Bến cá lúc ấy đã tấp nập người mua kẻ bán.": { "ấy": "Sáng chủ nhật" },
  "Những con cá ấy được xếp đầy trong các thúng tre.": { "những con cá ấy": "Những con cá thu, cá nục" },
  "Ngày ngày, nơi ấy vang lên tiếng búa chan chát.": { "nơi ấy": "một lò rèn nhỏ" },
  "Thấy vậy, mẹ khen các con đã lớn.": { "vậy": "Hai chị em xách giúp mẹ những túi rau quả nặng", "các con": "Hoa và em gái" },
  "Ai cũng háo hức chờ đến ngày ấy.": { "ngày ấy": "Hội khoẻ Phù Đổng" },
  "Vì thế, các bạn thường ra đó ngắm cảnh lúc tan học.": { "đó": "Mặt hồ" }
};
const THAY_B = new Map(Object.entries(THAY).map(([k, v]) => [bang(k), v]));
// đại từ thay thế (và tên gọi khác) có thể làm câu liên kết với câu trước; câu không có từ ngữ thay thế thì không được có các từ này (bỏ từ ngữ nối đầu câu)
const DAI_THAY = ["nó", "chúng", "họ", "đó", "ấy", "này", "vậy", "thế", "đây", "kia"];
const thayCua = (s) => THAY_B.get(bang(s)) || {};
const coDaiThay = (s) => { let t = thuong(s).trim(); const n = noiDau(t); if (n) t = t.slice(n.length); return DAI_THAY.some((w) => coTu(t, w)); };
// cách liên kết của câu s2 với câu (các câu) đứng trước: tập con của { lap, noi, the }
const lienKet = (s2, truoc) => {
  const ra = new Set(), pre = [].concat(truoc);
  if (lapGiua(pre[pre.length - 1], s2).length) ra.add("lap");
  if (noiDau(s2)) ra.add("noi");
  const th = thayCua(s2);
  Object.entries(th).forEach(([w, goc]) => { assert.ok(coTu(s2, w), `THAY: “${w}” không có trong câu “${s2}”`); if (pre.some((x) => coTu(x, goc))) ra.add("the"); });
  if (!Object.keys(th).length) assert.ok(!coDaiThay(s2), "câu có đại từ thay thế mà chưa ghi ở THAY: " + s2);
  return ra;
};
const cauDoan = (doan) => (/\(\d\)/.test(doan) ? doan.split(/\(\d\)\s*/).map((x) => x.trim()).filter(Boolean)
  : nfc(doan).split(/(?<=[.!?])\s+(?=\p{Lu})/u).map((x) => x.trim()).filter(Boolean));
const PP = { "Bằng cách lặp từ ngữ": ["lap"], "Bằng từ ngữ nối": ["noi"], "Bằng từ ngữ thay thế": ["the"], "Bằng dấu câu": ["dau-cau"],
  "Dùng từ ngữ nối và lặp từ ngữ": ["noi", "lap"], "Chỉ dùng từ ngữ nối, không lặp từ": ["noi"], "Chỉ lặp từ ngữ, không dùng từ nối": ["lap"],
  "Dùng từ ngữ thay thế": ["the"] };
const tap = (s) => [...s].sort().join("+");
// tự thử
assert.deepEqual(lapGiua("Trong vườn nhà ông có một cái giếng cổ.", "Nước giếng mát lạnh quanh năm."), ["giếng"]);
assert.equal(noiDau("Vì vậy, buổi chào cờ được chuyển vào hội trường."), "vì vậy");
assert.equal(tap(lienKet("Nhưng chỉ một lát sau, mưa đã tạnh hẳn.", "Sấm chớp ầm ầm, mưa trút xuống như thác đổ.")), "lap+noi");
assert.throws(() => lienKet("Nó bay đi mất.", "Con chim đậu trên cành."), /chưa ghi ở THAY/);

// câu đúng/sai 4 ý: đọc từng ý theo mẫu chữ (đoạn văn đánh số (1), (2)… ở đề bài)
const yDung = (y, cs, at) => {
  const so = (k) => cs[+k - 1];
  let m;
  if ((m = /^Câu \((\d)\) là câu đơn\.$/.exec(y))) return soVe(so(m[1])) === 1;
  if ((m = /^Câu \((\d)\) là câu ghép\.$/.exec(y))) return soVe(so(m[1])) >= 2;
  if ((m = /^Câu \((\d)\) là câu ghép có (hai|ba) vế\.$/.exec(y))) return soVe(so(m[1])) === { hai: 2, ba: 3 }[m[2]];
  if ((m = /^Câu \((\d)\) là câu ghép, các vế nối (trực tiếp|bằng một kết từ)\.$/.exec(y))) return cachNoi(so(m[1])) === { "trực tiếp": "truc-tiep", "bằng một kết từ": "ket-tu" }[m[2]];
  if ((m = /^Câu \((\d)\) lặp lại từ (?:ngữ )?“([^”]+)” của câu \((\d)\)\.$/.exec(y))) return coTu(so(m[1]), m[2]) && coTu(so(m[3]), m[2]);
  if ((m = /^“([^”]+)” là từ ngữ nối, nối câu \((\d)\) với câu \((\d)\)\.$/.exec(y))) return +m[2] === +m[3] + 1 && noiDau(so(m[2])) === thuong(m[1]);
  if ((m = /^Từ (?:ngữ )?“([^”]+)” ở câu \((\d)\) thay thế cho “([^”]+)”\.$/.exec(y))) {
    const goc = thayCua(so(m[2]))[thuong(m[1])];
    if (goc) assert.ok(cs.slice(0, +m[2] - 1).some((x) => coTu(x, goc)), `${at}: từ ngữ được thay “${goc}” không có ở câu trước`);
    return !!goc && thuong(goc) === thuong(m[3]);
  }
  assert.fail(`${at}: không đọc được ý “${y}”`);
};

/* ---------- từng câu Luyện từ và câu ---------- */
const quote = (q, k) => trich(q.q)[k || 0];
const bon = (q) => q.o.map((o) => o.trim());
// từ, cặp từ hợp văn cảnh (lí do ở lời giải từng câu): câu điền xong phải có trong VE, nối đúng bằng từ, cặp từ đó
const HOP = { "Trời … tạnh mưa": "vừa… đã", "Cây bút đã cũ …": "mà", "Bác lao công quét đến …": "đâu… đó", "… Nam chăm chỉ tập luyện …": "Bởi… nên" };
const TU_NOI_HOP = { "Lan học giỏi môn Toán.": "bo-sung", "…, mẹ thả bánh vào nồi nước sôi.": "thu-tu-cuoi", "Bạn Tú rất ngại phát biểu trước lớp.": "tuong-phan",
  "Thứ nhất, em biết thêm nhiều chuyện mới lạ.": "liet-ke-2" };
const QH_CAN = { "Sân bóng đã cũ. Các bạn vẫn chơi rất say sưa.": "tuong-phan" }; // quan hệ giữa hai câu đơn đem nối
// cặp từ hô ứng, cặp kết từ, kết từ hợp văn cảnh: mọi lựa chọn cùng loại; câu điền đáp án có trong VE và nối các vế đúng bằng đáp án
const hopVanCanh = (q, at, loai) => {
  const k = Object.keys(HOP).find((h) => q.q.includes(h)); assert.ok(k, at + ": chưa ghi đáp án ở HOP");
  q.o.forEach((o) => assert.ok(loai[thuong(o)], at + ": lựa chọn không cùng loại: " + o));
  const cau = dien(quote(q), q.o[0]);
  if (loai === KET) assert.deepEqual(ketGiua(cau), [thuong(q.o[0])], at); else assert.deepEqual(capNoi(cau), [thuong(q.o[0])], at);
  mot(q, (o) => o === HOP[k], at);
};
const CHECKS = [
  // Câu đơn và câu ghép
  { has: "Câu nào dưới đây là câu ghép?", right: (q, at) => mot(q, (o) => soVe(o) >= 2, at) },
  { has: "Trong các câu sau, câu nào là câu ghép?", right: (q, at) => mot(q, (o) => soVe(o) >= 2, at) },
  { has: "Câu nào dưới đây là câu đơn?", right: (q, at) => mot(q, (o) => soVe(o) === 1, at) },
  { has: "Câu nào sau đây chỉ có một chủ ngữ và một vị ngữ?", right: (q, at) => mot(q, (o) => soVe(o) === 1, at) },
  { has: "có mấy vế câu?", right: (q) => soVe(quote(q)) },
  { has: "vế thứ hai là:", right: (q, at) => { const v = veCua(quote(q)); assert.ok(v.length >= 2, at); mot(q, (o) => thuong(o) === thuong(veChu(v[1])), at); } },
  { has: "Cách viết nào gộp hai câu đơn", right: (q, at) => { const [a, b] = cauDoan(quote(q)).map((c) => veCua(c)[0]); assert.ok(a && b, at);
    mot(q, (o) => { const v = veCua(o); return v.length === 2 && [a, b].every((x, k) => thuong(veChu(x)) === thuong(veChu(v[k]))); }, at); } },
  { has: "Thêm vế câu nào vào chỗ trống", right: (q, at) => mot(q, (o) => soVe(quote(q).replace("…", o)) === 2, at) },
  { has: "kể hai nhóm bạn đang làm hai việc khác nhau", right: (q, at) => mot(q, (o) => { const v = veCua(o); return v.length === 2 && thuong(v[0].cn) !== thuong(v[1].cn); }, at) },
  { has: "Tách câu ghép", right: (q, at) => { const v = veCua(quote(q)); const dung = v.map((x) => { const s = veChu(x); return s.charAt(0).toUpperCase() + s.slice(1) + "."; }).join(" ");
    v.forEach((x) => assert.equal(soVe(veChu(x)), 1, at)); mot(q, (o) => o === dung, at); } },
  // Cách nối các vế câu ghép
  { has: "từ nào nối hai vế câu?", right: (q, at) => { const c = quote(q); bon(q).forEach((o) => assert.ok(coTu(c, o), `${at}: lựa chọn “${o}” không có trong câu`));
    mot(q, (o) => !!KET[thuong(o)] && ketGiua(c).includes(thuong(o)), at); assert.equal(cachNoi(c), "ket-tu", at); } },
  { has: "Cặp từ hô ứng nối các vế trong câu", right: (q, at) => { q.o.forEach((o) => assert.ok(CAP_HU[thuong(o)], at + ": lựa chọn không phải cặp từ hô ứng: " + o));
    const c = capNoi(quote(q)); assert.equal(c.length, 1, at); mot(q, (o) => thuong(o) === c[0], at); } },
  { has: "Cặp kết từ nối các vế trong câu", right: (q, at) => { q.o.forEach((o) => assert.ok(CAP_KT[thuong(o)], at + ": lựa chọn không phải cặp kết từ: " + o));
    const c = capNoi(quote(q)); assert.equal(c.length, 1, at); mot(q, (o) => thuong(o) === c[0], at); } },
  { has: "Cặp từ nối các vế trong câu", right: (q, at) => { q.o.forEach((o) => assert.ok(CAP[thuong(o)], at + ": lựa chọn không phải cặp từ nối: " + o));
    const c = capNoi(quote(q)); assert.equal(c.length, 1, at); mot(q, (o) => thuong(o) === c[0], at); } },
  { has: "Nối mỗi câu ghép ở cột trái với cách nối các vế", right: (q, at) => q.l.forEach((l, i) => assert.equal(CACH[q.r[i]], cachNoi(l), `${at}: “${l}”`)) },
  { has: "được nối với nhau bằng cách nào?", right: (q, at) => { q.o.forEach((o) => assert.ok(CACH[o], at + ": lựa chọn lạ " + o)); mot(q, (o) => CACH[o] === cachNoi(quote(q)), at); } },
  { has: "cho biết quan hệ gì giữa hai vế?", right: (q, at) => { const c = capNoi(quote(q)); assert.deepEqual(c, [thuong(quote(q, 1))], at + ": cặp kết từ được hỏi có trong câu");
    q.o.forEach((o) => assert.ok(QH_LUA_CHON[o], at + ": lựa chọn lạ " + o)); mot(q, (o) => QH_LUA_CHON[o] === CAP[c[0]], at); } },
  { has: "Chọn cặp từ hô ứng thích hợp", right: (q, at) => hopVanCanh(q, at, CAP_HU) },
  { has: "Chọn cặp kết từ thích hợp", right: (q, at) => hopVanCanh(q, at, CAP_KT) },
  { has: "Chọn kết từ thích hợp", right: (q, at) => hopVanCanh(q, at, KET) },
  // Câu ghép (luyện tập)
  { has: "dọn dẹp nhà cửa.", right: (q, at) => { const cs = cauDoan(quote(q)); return q.o.map((y) => yDung(y, cs, at)); } },
  { has: "Chọn vế câu thích hợp để hoàn chỉnh câu ghép", right: (q, at) => { const dau = quote(q).replace(/\s*…\s*$/, "");
    // phần đầu của câu và từ mở đầu lựa chọn tạo thành một cặp kết từ: chỉ đáp án làm được
    mot(q, (o) => Object.keys(CAP_KT).some((c) => { const [a, b] = c.split("… "); return thuong(dau).startsWith(a + " ") && thuong(o).startsWith(b + " "); }), at);
    const cau = dau + " " + q.o[0] + "."; assert.equal(soVe(cau), 2, at); assert.equal(capNoi(cau).length, 1, at); } },
  { has: "Câu ghép trong đoạn văn là câu nào", right: (q, at) => { const cs = cauDoan(quote(q)), CH = { "các vế nối trực tiếp": "truc-tiep", "các vế nối bằng một kết từ": "ket-tu", "các vế nối bằng cặp từ hô ứng": "ho-ung" };
    q.o.forEach((o) => assert.ok(/^Câu \(\d\), /.test(o) && CH[o.replace(/^Câu \(\d\), /, "")], at + ": lựa chọn lạ " + o));
    assert.equal(cs.filter((c) => soVe(c) >= 2).length, 1, at + ": đoạn văn có đúng một câu ghép");
    mot(q, (o) => { const c = cs[+/\((\d)\)/.exec(o)[1] - 1]; return soVe(c) >= 2 && cachNoi(c) === CH[o.replace(/^Câu \(\d\), /, "")]; }, at); } },
  { has: "có hai vế được nối bằng một cặp kết từ?", right: (q, at) => mot(q, (o) => cachNoi(o) === "cap-ket-tu", at) },
  { has: "là câu ghép có ba vế?", right: (q, at) => mot(q, (o) => soVe(o) === 3, at) },
  { has: "Cách nào nối đúng hai câu đơn", right: (q, at) => { const k = quote(q), can = QH_CAN[k]; assert.ok(can, at);
    cauDoan(k).forEach((c) => assert.equal(soVe(c), 1, at)); q.o.forEach((o) => assert.equal(soVe(o), 2, at + ": " + o)); mot(q, (o) => quanHe(o) === can, at); } },
  // Liên kết câu bằng cách lặp từ ngữ
  { has: "Từ được lặp lại", right: (q, at) => { const [s1, s2] = cauDoan(quote(q)); assert.deepEqual(lapGiua(s1, s2), [thuong(q.ans[0])], at); } },
  { has: "được lặp lại để liên kết hai câu", right: (q, at) => { const [s1, s2] = cauDoan(quote(q)); mot(q, (o) => coTu(s1, o) && coTu(s2, o), at);
    assert.deepEqual(lapGiua(s1, s2).sort(), [...tuNoiDung(q.o[0])].sort(), at + ": ngoài đáp án, hai câu không lặp từ nào khác"); } },
  { has: "bằng cách lặp từ ngữ? “", right: (q, at) => { const [s1] = cauDoan(quote(q)); mot(q, (o) => coTu(s1, o), at); } },
  { has: "Chọn từ ngữ thay vào chỗ trống để câu sau liên kết với câu trước bằng cách lặp từ ngữ", right: (q, at) => { const [s1] = cauDoan(quote(q)); mot(q, (o) => coTu(s1, o), at); } },
  { has: "Những câu nào lặp lại từ", right: (q, at) => { const cs = cauDoan(quote(q)), w = quote(q, 1), K = cs.map((c, i) => (i && coTu(c, w) ? i + 1 : 0)).filter(Boolean).join(",");
    assert.ok(coTu(cs[0], w), at); mot(q, (o) => (/^Chỉ có/.test(o) ? "" : "") + [...o.matchAll(/\((\d)\)/g)].map((m) => m[1]).join(",") === K, at); } },
  { has: "Câu nào liên kết với câu đứng ngay trước nó bằng cách lặp từ ngữ?", right: (q, at) => { const cs = cauDoan(quote(q)), K = cs.map((c, i) => (i && lapGiua(cs[i - 1], c).length ? i + 1 : 0)).filter(Boolean);
    assert.equal(K.length, 1, at + ": đúng một câu lặp từ ngữ của câu ngay trước"); mot(q, (o) => o === `Câu (${K[0]})`, at); } },
  // Liên kết câu bằng từ ngữ nối
  { has: "Từ ngữ nào nối câu thứ hai với câu thứ nhất?", right: (q, at) => { const [, s2] = cauDoan(quote(q)); bon(q).forEach((o) => assert.ok(coTu(quote(q), o), at));
    mot(q, (o) => noiDau(s2) === thuong(o), at); } },
  { has: "từ ngữ nối ở đầu câu thứ hai là", right: (q, at) => { const [, s2] = cauDoan(quote(q)); const d = q.type === "fill" ? q.ans[0] : q.o[0];
    assert.equal(noiDau(s2), thuong(d), at); if (q.type === "mc") mot(q, (o) => noiDau(s2) === thuong(o), at); } },
  { has: "Chọn từ ngữ nối thích hợp điền vào chỗ trống", right: (q, at) => { const k = Object.keys(TU_NOI_HOP).find((h) => q.q.includes(h)); assert.ok(k, at + ": chưa ghi nghĩa cần nối");
    q.o.forEach((o) => assert.ok(TU_NOI[thuong(o)], at + ": lựa chọn không phải từ ngữ nối: " + o)); mot(q, (o) => TU_NOI[thuong(o)] === TU_NOI_HOP[k], at); } },
  // Liên kết câu bằng từ ngữ thay thế
  { has: "ở câu thứ hai thay thế cho", right: (q, at) => { const [s1, s2] = cauDoan(quote(q)), goc = quote(q, 1);
    assert.ok(coTu(s1, goc) && !coTu(s2, goc), at + ": từ ngữ được thay có ở câu thứ nhất, không có ở câu thứ hai");
    bon(q).forEach((o) => assert.ok(coTu(s2, o), at + ": lựa chọn không có trong câu thứ hai: " + o)); mot(q, (o) => thuong(thayCua(s2)[thuong(o)] || "") === thuong(goc), at); } },
  { has: "thay thế cho từ ngữ nào?", right: (q, at) => { const cs = cauDoan(quote(q)), w = quote(q, 1), k = cs.findIndex((c) => coTu(c, w));
    const goc = thayCua(cs[k])[thuong(w)]; assert.ok(goc && cs.slice(0, k).some((c) => coTu(c, goc)), at); mot(q, (o) => thuong(o) === thuong(goc), at); } },
  { has: "một con kênh nhỏ", right: (q, at) => { const cs = cauDoan(quote(q)); return q.o.map((y) => yDung(y, cs, at)); } },
  // Liên kết câu trong đoạn văn
  { has: "Từ ngữ nào giúp câu thứ hai liên kết với câu thứ nhất?", right: (q, at) => { const [s1, s2] = cauDoan(quote(q)); lienKet(s2, s1);
    const tl = new Set([noiDau(s2)].concat(lapGiua(s1, s2), Object.keys(thayCua(s2))).filter(Boolean));
    bon(q).forEach((o) => assert.ok(coTu(quote(q), o), at + ": lựa chọn không có trong đoạn: " + o)); mot(q, (o) => tl.has(thuong(o)), at); } },
  { has: "Hai câu sau liên kết với nhau bằng cách nào?", right: (q, at) => { const [s1, s2] = cauDoan(quote(q)); const lk = tap(lienKet(s2, s1)); q.o.forEach((o) => assert.ok(PP[o], at));
    mot(q, (o) => tap(PP[o]) === lk, at); } },
  { has: "xương rồng nhỏ", right: (q, at) => { const cs = cauDoan(quote(q)); return q.o.map((y) => yDung(y, cs, at)); } },
  { has: "ra bến cá", right: (q, at) => { const cs = cauDoan(quote(q)); return q.o.map((y) => yDung(y, cs, at)); } },
  { has: "bằng những cách nào?", right: (q, at) => { const cs = cauDoan(quote(q)), m = /Câu \((\d)\) liên kết với câu \((\d)\)/.exec(q.q); const lk = tap(lienKet(cs[+m[1] - 1], cs[+m[2] - 1]));
    q.o.forEach((o) => assert.ok(PP[o], at)); mot(q, (o) => tap(PP[o]) === lk, at); } },
  { has: "và liên kết với câu đó bằng từ ngữ thay thế?", right: (q, at) => { const s1 = quote(q); mot(q, (o) => tap(lienKet(o, s1)) === "the", at); } }
];
// câu đúng/sai 4 ý của chủ đề Câu đơn và câu ghép
CHECKS.push({ has: "ra công viên.", right: (q, at) => { const cs = cauDoan(quote(q)); return q.o.map((y) => yDung(y, cs, at)); } });
let soCau = 0;
const daKiem = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.type !== "essay" && q.topic !== "Đọc hiểu" && thuong(q.q).includes(thuong(c.has)));
  assert.ok(m.length >= 1, `“${c.has}”: không có câu nào trong kho`);
  m.forEach((q) => {
    const at = ten.get(q) + " (" + c.has + ")";
    assert.ok(!daKiem.has(q), at + ": câu khớp hai mục của CHECKS");
    const want = c.right(q, at);
    daKiem.add(q); soCau++;
    if (want === undefined) return;
    const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.type === "num" ? q.ans : q.o[0];
    assert.deepEqual(got, want, `${at}: đáp án ${JSON.stringify(got)}, tính được ${JSON.stringify(want)}`);
  });
});
// mọi câu Luyện từ và câu đều được đọc lại
kho.filter((q) => !["Đọc hiểu", "Viết"].includes(q.topic)).forEach((q) => assert.ok(daKiem.has(q), "câu Luyện từ và câu chưa có cách đọc lại đáp án: " + ten.get(q) + " " + q.q.slice(0, 60)));

/* ---------- Đọc hiểu: chữ trích có trong đoạn đọc; câu sắp xếp đúng thứ tự trong đoạn ---------- */
const gon = (s) => nfc(s).replace(/\s*\/\s*/g, " ").replace(/\s+/g, " ").trim();
kho.filter((q) => q.topic === "Đọc hiểu").forEach((q) => {
  const at = ten.get(q), text = gon(PSG[q.p].text);
  trich(q.q).concat(trich(q.x)).forEach((c) => assert.ok(text.includes(gon(c).replace(/[.]$/, "")), `${at}: chữ trích “${c}” không có trong đoạn đọc ${q.p}`));
});
const THU_TU = { "Cả làng thức dậy khi trời còn tối": "cả làng đã thức dậy", "Hùng theo ông lên đồi bẻ từng chùm vải": "Hùng theo ông lên đồi",
  "Những sọt vải được chở ra điểm cân": "chở ra điểm cân", "Hùng mang rổ vải đi biếu bà cụ Tư": "mang biếu bà cụ Tư" };
kho.filter((q) => q.type === "order").forEach((q) => {
  const at = ten.get(q), text = gon(PSG[q.p].text), i = q.o.map((o) => { assert.ok(THU_TU[o], at + ": chưa ghi chỗ của sự việc ở THU_TU: " + o); return text.indexOf(THU_TU[o]); });
  assert.ok(i.every((v, k) => v >= 0 && (!k || v > i[k - 1])), at + ": các sự việc không theo thứ tự trong đoạn đọc");
});
{ const tf = kho.filter((q) => q.type === "tf"); assert.ok(tf.length >= 1 && tf.every((q) => q.topic === "Đọc hiểu" && q.p), "câu đúng/sai thuộc Đọc hiểu");
  const t = tf.find((q) => /để bánh khô giòn/.test(q.q)); assert.ok(t && t.a === false && PSG[t.p].text.includes("bánh mới mềm, dẻo"), "câu đúng/sai khớp đoạn đọc"); }

/* ---------- ma trận, đoạn đọc, câu Viết ---------- */
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
const TOPIC_TEN = ["Đọc hiểu", "Câu đơn và câu ghép", "Cách nối các vế câu ghép", "Câu ghép", "Liên kết câu bằng cách lặp từ ngữ", "Liên kết câu bằng từ ngữ nối",
  "Liên kết câu bằng từ ngữ thay thế", "Liên kết câu trong đoạn văn", "Viết"];
const demO = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
assert.deepEqual(TOPICS, TOPIC_TEN, "chủ đề theo thứ tự các bài Luyện từ và câu của sách, Viết đứng cuối");
assert.deepEqual(TOPICS.map((t) => sum(M[t])), [7, 3, 4, 2, 2, 2, 2, 2, 1], "7 câu Đọc hiểu, 17 câu Luyện từ và câu theo số bài (cách nối các vế câu ghép 2 bài), 1 câu Viết");
TOPICS.forEach((t) => assert.ok(("chu-de:5:tv:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
{ // chữ chủ đề không trùng chủ đề của kho Tiếng Việt 5 cuối kì I, trừ Đọc hiểu, Viết (đề “Ôn chủ đề” rút chung câu cùng chủ đề)
  const cu = new Set(BANKS.filter((b) => b.file === "5-tv.js" && !/^tv5-gk2-/.test(b.id)).flatMap((b) => b.questions.map((q) => q.topic)));
  TOPICS.filter((t) => !["Đọc hiểu", "Viết"].includes(t)).forEach((t) => assert.ok(!cu.has(t), "chủ đề trùng kho cuối kì I: " + t));
}
assert.deepEqual([...new Set(kho.map((q) => q.topic))].sort(), TOPICS.slice().sort(), "chủ đề của kho đúng chữ của ma trận");
[d1.questions, d2.questions].forEach((d, i) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, `Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => demO(d, t, l)), v, `Đề ${i + 1} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const have = kho.filter((q) => q.topic === t && q.lv === l);
  assert.ok(v[l - 1] ? have.length >= 2 * v[l - 1] : have.length === 0, `ô (${t}, mức ${l}) rút ${v[l - 1]} câu, kho có ${have.length}`);
  if (t !== "Đọc hiểu" && t !== "Viết" && v[l - 1]) assert.deepEqual(DE.concat(S.pool).map((s) => have.filter((q) => q.src === s).length), [v[l - 1], v[l - 1], 2 * v[l - 1]], `ô (${t}, mức ${l}): mỗi đề cố định ${v[l - 1]} câu, câu riêng ${2 * v[l - 1]}`);
}));
// đoạn đọc: chỉ ở Đọc hiểu, mọi câu Đọc hiểu có đoạn; mỗi đề cố định một đoạn 4 câu 1-1-2-3 và một đoạn 3 câu 1-2-3, câu riêng hai đoạn mỗi loại
assert.ok(kho.filter((q) => q.topic === "Đọc hiểu").every((q) => q.p) && kho.filter((q) => q.p).every((q) => q.topic === "Đọc hiểu"), "đoạn đọc chỉ dùng cho câu Đọc hiểu");
const mucDoan = (id) => kho.filter((q) => q.p === id).map((q) => q.lv).join("-");
Object.keys(PSG).forEach((id) => assert.ok(["1-1-2-3", "1-2-3"].includes(mucDoan(id)), `đoạn ${id}: mức ${mucDoan(id)}, cần 1-1-2-3 hoặc 1-2-3`));
[[S.de1, 1], [S.de2, 1], [S.pool, 2]].forEach(([id, k]) => {
  const ps = [...new Set(kho.filter((q) => q.src === id && q.p).map((q) => q.p))];
  assert.deepEqual(["1-1-2-3", "1-2-3"].map((x) => ps.filter((d) => mucDoan(d) === x).length), [k, k], id + ": số đoạn 4 câu, 3 câu");
});
[d1.questions, d2.questions, rieng].forEach((qs) => { const ps = qs.map((q) => q.p || ""); ps.forEach((x, i) => assert.ok(!x || ps.indexOf(x) === i || ps[i - 1] === x, "câu cùng đoạn đọc đứng liền nhau: " + x)); });
// câu Viết: chỉ tự luận, 4–6 ý chấm, 5 điểm, gợi ý có ví dụ; đủ các kiểu bài Viết của Bài 1–16
const viet = kho.filter((q) => q.topic === "Viết");
assert.ok(viet.every((q) => q.type === "essay") && kho.filter((q) => q.type === "essay").every((q) => q.topic === "Viết"), "chủ đề Viết chỉ gồm câu tự luận, tự luận chỉ ở Viết");
viet.forEach((q) => {
  assert.ok(q.rubric.length >= 4 && q.rubric.length <= 6, "câu Viết có 4–6 ý chấm: " + ten.get(q));
  assert.equal(sum(q.rubric.map((r) => r.p)), 5, "câu Viết 5 điểm như các kho Tiếng Việt 4, 5: " + ten.get(q));
  assert.ok(q.rubric.every((r) => r.p > 0 && r.p * 4 === Math.round(r.p * 4)), "điểm mỗi ý chia hết cho 0,25: " + ten.get(q));
  assert.ok(/^Gợi ý:/.test(q.x) && /\nVí dụ/.test(q.x) && q.x.length > 400, "câu Viết có gợi ý và bài mẫu: " + ten.get(q));
});
const KIEU_VIET = { "bài văn tả người": /^Viết bài văn tả /, "mở bài, kết bài": /mở bài gián tiếp .*kết bài mở rộng/, "dàn ý": /^Lập dàn ý cho bài văn tả /,
  "đoạn văn tả hoạt động": /^Viết đoạn văn .*tả hoạt động của một người/, "tình cảm, cảm xúc về một sự việc": /tình cảm, cảm xúc của bạn về một /,
  "chương trình hoạt động": /^Viết chương trình hoạt động/ };
Object.entries(KIEU_VIET).forEach(([k, re]) => assert.ok(viet.filter((q) => re.test(q.q)).length >= 1, "thiếu kiểu bài Viết: " + k));
viet.forEach((q) => assert.equal(Object.values(KIEU_VIET).filter((re) => re.test(q.q)).length, 1, "câu Viết thuộc đúng một kiểu bài: " + ten.get(q)));
assert.equal(viet.length, 7, "7 câu Viết: " + viet.length);

/* ---------- dạng câu, cách viết ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 2, "mỗi kho ít nhất 2 câu đúng/sai 4 ý");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
["fill", "tf", "num", "match", "order"].forEach((t) => assert.ok(kho.some((q) => q.type === t), "kho có dạng câu " + t));
assert.ok(kho.every((q) => ["mc", "tf", "tf4", "fill", "num", "match", "order", "essay"].includes(q.type)), "chỉ dùng dạng câu hợp với tiểu học");
const ngoaiNgoac = (s) => nfc(s).replace(/“[^”]*”/g, " ").replace(/‘[^’]*’/g, " ");
kho.forEach((q) => assert.ok(!/(của em|(?<![Cc]ác )em hãy|Em hãy|theo em|Theo em|em chọn)\b/.test(ngoaiNgoac([q.q].concat(q.type === "essay" ? [q.x.split("\nVí dụ")[0]] : [q.x]).join(" "))), "gọi người làm bài là “bạn”: " + ten.get(q)));
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b|câu (đầu|cuối) của đề/.test(q.x), "lời giải nhắc vị trí của ý, câu: " + ten.get(q)));
kho.filter((q) => q.type === "mc").forEach((q) => assert.ok(!/[Cc]âu thứ (nhất|hai|ba|tư)/.test(ngoaiNgoac(q.x)) || /“[^”]*\.[^”]*\.[^”]*”|\(1\)/.test(q.q),
  "lời giải gọi lựa chọn bằng thứ tự (app xáo lựa chọn): " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau; ba lựa chọn sai không cùng mở đầu bằng một chữ
const mcs = kho.filter((q) => q.type === "mc");
mcs.forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o.map(thuong)).size, q.o.length, "lựa chọn trùng nhau: " + ten.get(q));
  const dau = (o) => thuong(o).split(/\s+/)[0], sai = q.o.slice(1).map(dau);
  assert.ok(!(sai.length >= 3 && sai.every((d) => d === sai[0]) && dau(q.o[0]) !== sai[0]), "ba lựa chọn sai cùng mở đầu bằng “" + sai[0] + "”: " + ten.get(q));
});
// đáp án đúng là lựa chọn dài nhất hay ngắn nhất (kể cả bằng nhau) ở không quá một phần ba số câu nhiều lựa chọn (như tests/tv5-ck1.js)
const daiNhat = mcs.filter((q) => q.o[0].length >= Math.max(...q.o.slice(1).map((o) => o.length))).length;
const nganNhat = mcs.filter((q) => q.o[0].length <= Math.min(...q.o.slice(1).map((o) => o.length))).length;
assert.ok(3 * daiNhat <= mcs.length, `đáp án là lựa chọn dài nhất ở ${daiNhat}/${mcs.length} câu nhiều lựa chọn`);
assert.ok(3 * nganNhat <= mcs.length, `đáp án là lựa chọn ngắn nhất ở ${nganNhat}/${mcs.length} câu nhiều lựa chọn`);
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
{ const phanNhan = (t) => t.split(/ và |, /).map((s) => thuong(s).trim()).filter((s) => s.includes(" ") || s.length >= 6);
  kho.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => {
    if (thuong(d).includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => thuong(o).includes(c)), `${ten.get(q)}: đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); }); }
// đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng
const goc = (s) => thuong(s).replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "5-tv.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- rút thử ---------- */
const docHieu = kho.filter((q) => q.topic === "Đọc hiểu"), soCauDoan = (id) => kho.filter((q) => q.p === id).length;
const thu = (hist) => {
  const d = Quiz.draw(p, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, p.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => demO(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  const got = {}; d.questions.filter((q) => q.p).forEach((q) => (got[q.p] = (got[q.p] || 0) + 1));
  assert.ok(Object.keys(got).length <= Math.ceil(sum(M["Đọc hiểu"]) / 3), "Đọc hiểu lấy quá ⌈7/3⌉ đoạn");
  assert.ok(Object.keys(got).filter((x) => got[x] < soCauDoan(x)).length <= 1, "nhiều nhất một đoạn lấy một phần");
  return d;
};
const seen = new Set();
for (let k = 0; k < 400; k++) thu().questions.forEach((q) => seen.add(Quiz.key(q)));
assert.equal(seen.size, kho.length, "400 lần rút thử phải gặp đủ câu của kho");
// học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên không rút lại câu của đề đó (Rút ra N12)
DE.forEach((lam) => { for (let k = 0; k < 30; k++) assert.ok(thu((q) => (q.src === lam ? { done: 1, wrong: 0 } : null)).questions.every((q) => q.src !== lam), `đã làm hết ${lam} thì không rút lại câu của đề đó`); });
assert.ok(docHieu.length === 28, "28 câu Đọc hiểu: " + docHieu.length);

/* ---------- dò lộ đáp án giữa mọi cặp câu của kho ----------
   Như tests/tv5-ck1.js: đề “Ôn chủ đề” rút chung mọi câu của một chủ đề, đề ngẫu nhiên rút chung câu của các chủ đề khác, câu cùng đoạn đọc
   luôn đi cùng nhau; lời dặn (note) hiện ở màn mở đề nên cũng là “câu kia”. Đáp án (lựa chọn đúng, đáp án điền) tách thành chuỗi 3 từ liền
   nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án); cặp nối thì câu kia có cả hai vế. Chuỗi có ở đề bài, lựa chọn đúng, đáp án, ô nối, lời
   giải, thang chấm hay đoạn đọc (khác đoạn của câu này) của câu kia thì in ra với DO_LO=1 để xem tay; danh sách đã xem ở DA_XEM. Lựa chọn
   sai của câu kia không tính (Rút ra N25). Câu hỏi cách nối các vế, cách liên kết, quan hệ giữa hai vế có chung các lựa chọn (CACH, PP,
   QH_LUA_CHON), nên với các câu đó dò câu, đoạn được hỏi (chữ trong ngoặc kép đầu tiên của đề bài) thay cho đáp án. Đáp án một, hai từ
   (kết từ, từ ngữ nối, đại từ) là chữ thường gặp: chỉ tính khi câu kia nhắc chính từ đó trong ngoặc kép, hoặc câu cùng chủ đề có từ đó ở
   lựa chọn đúng, đáp án, ô nối, lời giải (bỏ câu ví dụ trong ngoặc kép). */
const tu = (s) => thuong(s).replace(/[«»“”‘’"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((r) => r.c)).map(String);
const chuDung = (q) => [q.q, q.x].concat(q.type === "mc" ? [q.o[0]] : q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((r) => r.c)).map(String); // bỏ lựa chọn sai
const LOI_DAN_DE = [...new Set([S.de1, S.de2, S.pool].map((id) => bank(id).note))].map((note, i) => ({ q: note, x: "", note: true, ten: "note" + (i + 1) }));
const tenCau = (q) => (q.note ? q.ten : ten.get(q) || q.topic);
const CHUNG = new Set(Object.keys(CACH).concat(Object.keys(PP), Object.keys(QH_LUA_CHON)));
// chuỗi 3 từ chung của các lựa chọn dùng lại ở nhiều câu (cách nối các vế, cách liên kết, quan hệ giữa hai vế): không tính khi dò lộ
const CUM_CHUNG = new Set(["nối trực tiếp", "trực tiếp không", "tiếp không dùng", "không dùng từ", "dùng từ nối", "nối bằng một", "bằng một kết",
  "một kết từ", "bằng một cặp", "một cặp kết", "cặp kết từ", "một cặp từ", "cặp từ hô", "từ hô ứng", "bằng cách lặp", "cách lặp từ", "lặp từ ngữ",
  "bằng từ ngữ", "từ ngữ nối", "từ ngữ thay", "ngữ thay thế", "dùng từ ngữ", "ngữ nối và", "nối và lặp", "và lặp từ", "chỉ dùng từ", "ngữ nối không",
  "nối không lặp", "không lặp từ", "chỉ lặp từ", "từ ngữ không", "ngữ không dùng", "hai vế có", "vế có ý", "có ý trái", "ý trái ngược", "trái ngược với",
  "ngược với nhau", "hai vế chỉ", "các vế nối", "vế nối trực", "vế nối bằng", "nối bằng cặp", "bằng cặp từ"]);
const doLo = (qs, notes) => {
  const ra = [];
  qs.forEach((q) => {
    const dap = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : [];
    const chung = q.type === "mc" && CHUNG.has(q.o[0]);
    const C = chung ? [tu(trich(q.q)[0] || q.q).join(" ")] : [...new Set(dap.flatMap(cum))].filter((c, k, a) => a.length === 1 || !CUM_CHUNG.has(c)), cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const ngan = C.length === 1 && !chung && tu(dap[0]).length <= 2 ? C[0] : null;
    qs.concat(notes || []).forEach((p2) => {
      if (p2 === q) return;
      const nguon = p2.note ? [p2.q] : chuDung(p2).concat(p2.p && p2.p !== q.p ? [PSG[p2.p].text] : []);
      if (ngan) {
        const ngoac = nguon.some((x) => [...nfc(x).matchAll(/“([^”]*)”/g)].some((m) => tu(m[1]).join(" ") === ngan));
        const cungCD = !p2.note && p2.topic === q.topic && [p2.x].concat(p2.type === "mc" ? [p2.o[0]] : p2.o || [], p2.ans == null || typeof p2.ans === "number" ? [] : [].concat(p2.ans), p2.l || [], p2.r || [])
          .some((x) => (" " + tu(nfc(x).replace(/“[^”]*\s[^”]*”/g, " ")).join(" ") + " ").includes(" " + ngan + " "));
        if (ngoac || cungCD) ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${ngan}`);
        return;
      }
      const T = " " + nguon.map((s) => tu(s).join(" ")).join(" | ") + " ";
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
      cap.filter(([l, r]) => T.includes(" " + tu(l).join(" ") + " ") && T.includes(" " + tu(r).join(" ") + " ")).forEach(([l, r]) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${l} → ${r}`));
    });
  });
  return [...new Set(ra)];
};
const lo = doLo(kho, LOI_DAN_DE);
if (process.env.DO_LO) console.log("Đáp án có ở câu khác của kho (xem tay):\n" + lo.join("\n"));
// đã xem tay (23/11/2026): “câu 2”, “và câu 4” là số câu của đoạn văn khác; “thứ hai” là chữ “câu thứ hai” của đề bài, lời giải; “mặt trời
// lên” của bài đọc vải thiều không nói gì về câu ghép de1#8; “mà” của cặp “nhờ… mà” không gợi ý kết từ chỉ ý trái ngược của de2#14
const DA_XEM = [
  "de2#18 → ngau-nhien#35: câu 2", "ngau-nhien#37 → ngau-nhien#40: thứ hai", "ngau-nhien#38 → ngau-nhien#40: thứ hai", "de1#19 → ngau-nhien#40: thứ hai",
  "de2#19 → ngau-nhien#40: thứ hai", "ngau-nhien#1 → de1#8: mặt trời lên", "ngau-nhien#2 → de1#8: mặt trời lên", "ngau-nhien#3 → de1#8: mặt trời lên",
  "ngau-nhien#4 → de1#8: mặt trời lên", "ngau-nhien#23 → de2#14: mà", "de1#15 → de2#18: và câu 4"
];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = kho.find((q) => q.q.includes("Bố đóng cho em một giá sách nhỏ.")), b = kho.find((q) => q.q.includes("Ông em trồng một hàng cau"));
  assert.ok(doLo([a, Object.assign({}, b, { x: b.x + " Ví dụ: “giá sách”." })]).some((s) => /: giá sách$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
  const c = kho.find((q) => q.q.includes("Con đường làng nhỏ hẹp")), d = kho.find((q) => q.q.includes("Cây bút đã cũ"));
  assert.ok(doLo([c, Object.assign({}, d, { x: d.x + " Có thể dùng “nhưng”." })]).some((s) => /: nhưng$/.test(s)), "bộ dò phải bắt được kết từ đáp án được nhắc trong ngoặc kép");
  const e = kho.find((q) => q.q.includes("gà gáy râm ran"));
  assert.ok(doLo([e, Object.assign({}, d, { x: d.x + " Câu “Sáng sớm, gà gáy râm ran; bếp nhà ai đã đỏ lửa; con đường làng thức dậy.” nối trực tiếp." })]).length >= 1, "bộ dò phải bắt được câu được hỏi nằm ở câu khác");
}

/* ---------- không gần trùng câu của kho Tiếng Việt 4 và kho Tiếng Việt 5 cuối kì I (lời giao việc; như tests/tv5-ck1.js) ----------
   Đề bài cùng lựa chọn, ô nối, ô sắp xếp có từ 4 cặp hai âm tiết liền nhau chung với một câu của hai kho đó và số cặp chung từ một nửa số
   cặp của câu ít cặp hơn thì báo. Bỏ cách hỏi chung (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của các kho đem so. */
const CUM = ["mỗi ý sau đúng hay sai", "chọn từ thích hợp nhất điền vào chỗ trống", "chọn từ thích hợp điền vào chỗ trống", "thích hợp điền vào chỗ trống",
  "dòng nào dưới đây gồm toàn", "đọc đoạn văn", "đọc câu", "trong câu", "từ nào là", "câu đơn", "câu ghép", "vế câu", "cặp kết từ", "cặp từ hô ứng",
  "từ ngữ nối", "từ ngữ thay thế", "lặp từ ngữ", "liên kết", "câu thứ nhất", "câu thứ hai", "chủ ngữ", "vị ngữ"];
{
  const cap2 = (s) => { let t = thuong(s); CUM.map(thuong).forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const cauCua = (ok) => BANKS.filter(ok).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => Object.assign({ id: b.id }, q)));
  const cu = cauCua((b) => b.file === "4-tv.js" || (b.file === "5-tv.js" && !/^tv5-gk2-/.test(b.id))), ca = cu.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const P = cu.map((x) => [x, capAm(x)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return P.map(([x, d]) => { const chung = [...c].filter((y) => d.has(y)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${x.id}: ${x.q.slice(0, 60)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Tiếng Việt 4, Tiếng Việt 5 cuối kì I:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Tiếng Việt 4 hay kho Tiếng Việt 5 cuối kì I");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (cả đoạn đọc, thang chấm) không có trong sách; cụm từ chung (TU_CHUNG: tên chủ đề, tên bài Luyện
   từ và câu, tên kiểu bài Viết, thuật ngữ, cách hỏi chuẩn) thay bằng dấu ngăn trước khi so. */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ: băm mọi chuỗi k từ của chữ đã chuẩn hoá (một lần cho mỗi chữ, mỗi k), chỉ so thật (includes) khi băm có
const traChu = (() => {
  const bam = (w, k) => {
    const A = new Uint32Array(w.length), B = new Uint32Array(w.length), n = Math.max(0, w.length - k + 1), H = new Float64Array(n);
    for (let i = 0; i < w.length; i++) { let a = 0x811c9dc5, b = 0x1b873593; const t = w[i]; for (let j = 0; j < t.length; j++) { const x = t.charCodeAt(j); a = Math.imul(a ^ x, 0x01000193); b = Math.imul(b ^ x, 0x5bd1e995); } A[i] = a; B[i] = b; }
    for (let i = 0; i < n; i++) { let a = 0x9e3779b9, b = 0x85ebca6b; for (let j = i; j < i + k; j++) { a = Math.imul(a ^ A[j], 0x01000193); b = Math.imul(b ^ B[j], 0x5bd1e995); } H[i] = (a >>> 0) * 2097152 + (b >>> 11); }
    return H;
  };
  const co = (H, h) => { let l = 0, r = H.length - 1; while (l <= r) { const m = (l + r) >> 1; if (H[m] === h) return true; if (H[m] < h) l = m + 1; else r = m - 1; } return false; };
  const chuMot = new Map(), chuDs = new WeakMap();
  const bangH = (m, k, tao) => { if (!m.has(k)) m.set(k, tao().sort()); return m.get(k); };
  return {
    co: (s, c) => { const w = c.split(" "); if (!chuMot.has(s)) chuMot.set(s, new Map()); return co(bangH(chuMot.get(s), w.length, () => bam(s.split(" "), w.length)), bam(w, w.length)[0]) && s.includes(" " + c + " "); },
    loc: (ds, c) => {
      const w = c.split(" "), k = w.length;
      if (!chuDs.has(ds)) chuDs.set(ds, new Map());
      const H = bangH(chuDs.get(ds), k, () => { const hs = ds.map((o) => bam(o.s.split(" "), k)), ra = new Float64Array(hs.reduce((a, h) => a + h.length, 0)); let i = 0; hs.forEach((h) => { ra.set(h, i); i += h.length; }); return ra; });
      return co(H, bam(w, k)[0]) ? ds.filter((o) => o.s.includes(" " + c + " ")) : [];
    },
  };
})();
const khongDau = nhoChuoi((s) => nfc(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim());
const TU_CHUNG = [...TOPIC_TEN, "luyện tập về câu ghép", "luyện tập về liên kết câu trong đoạn văn", "cụm chủ ngữ – vị ngữ", "mỗi ý sau đúng hay sai",
  "thích hợp điền vào chỗ trống", "thể hiện tình cảm, cảm xúc", "tình cảm, cảm xúc của bạn về", "viết đoạn văn (khoảng", "hai câu sau liên kết với nhau bằng cách nào",
  "từ ngữ nào nối câu thứ hai với câu thứ nhất", "từ nào nối hai vế câu", "cặp từ hô ứng nối các vế trong câu", "cặp kết từ nối các vế trong câu",
  "cặp từ nối các vế trong câu", "chọn vế câu thích hợp để hoàn chỉnh câu ghép", "chọn từ ngữ nối thích hợp điền vào chỗ trống", "được nối với nhau bằng cách nào",
  "ở câu thứ hai thay thế cho", "thay thế cho từ ngữ nào", "được lặp lại để liên kết hai câu", "từ ngữ nối ở đầu câu thứ hai là",
  "thay vào chỗ trống để câu", "từ ngữ nào giúp câu thứ hai liên kết với câu thứ nhất", "bài văn tả người", "chương trình hoạt động", "mở bài gián tiếp",
  "kết bài mở rộng", "cộng hoà xã hội chủ nghĩa việt nam", "độc lập – tự do – hạnh phúc"]
  .map((x) => " " + khongDau(x) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((x) => { while (t.includes(x)) t = t.replace(x, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|")) ra.push(c.join(" ")); } return ra; };
const truong = (q) => chu(q).concat(q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].title, PSG[q.p].text] : []);
if (SACH.length) {
  assert.ok(SACH.some((f) => /tieng-viet-5-tap-1/.test(f)) && SACH.some((f) => /tieng-viet-5-tap-2/.test(f)), "OnUp-Book có Tiếng Việt 5 hai tập");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  LOI_DAN_DE.forEach((n) => assert.deepEqual(chuoi(n.q, 8).filter((c) => traChu.co(sach, c)), [], "lời dặn có chuỗi 8 từ trùng sách"));
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả kho Tiếng Việt 5 cuối kì I và câu riêng
   của các đề ngẫu nhiên ---------- */
{
  const cua = (id) => /^tv5-gk2-/.test(id);
  const cauKhac = (b, q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const khac = BANKS.filter((b) => !b.pool && !cua(b.id)).flatMap((b) => b.questions.map((q) => cauKhac(b, q)))
    .concat(BANKS.filter((b) => b.pool && !cua(b.id)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cauKhac(b, q))));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(soCau + " câu Luyện từ và câu đã đọc lại đáp án; kho " + kho.length + " câu (" + d1.n + " + " + d2.n + " câu của hai đề cố định, " + rieng.length + " câu riêng), "
  + Object.keys(PSG).length + " đoạn đọc, " + viet.length + " câu Viết, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("TV5 GK2 OK");
