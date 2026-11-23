// Kiểm tra ngân hàng Tiếng Việt 5 cuối năm của Phiên N5-ck2-tv (data/banks/5-tv.js, tv5-ck2-*), theo mẫu tests/tv5-gk2.js, tests/tv5-ck1.js.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên; số câu, số đề lấy từ danh mục.
// Đọc lại đáp án mọi câu Luyện từ và câu bằng bảng ghi trong script (CHECKS: mỗi câu khớp đúng một mục, nhận ra câu bằng một đoạn chữ của
// đề bài): đại từ (DAI: xưng hô, nghi vấn, thay thế; THAY_DT: đại từ thay thế cho từ ngữ nào, có ở câu trước), kết từ (KET, KET_NN: kết từ
// chỉ nguyên nhân), từ đồng nghĩa (DONG_NGHIA: nhóm từ đồng nghĩa; câu tìm từ khác nghĩa: ba từ cùng một nhóm, từ còn lại ngoài nhóm; câu
// chọn từ hợp văn cảnh: bốn lựa chọn cùng một nhóm, đáp án ở HOP_DN), từ đa nghĩa (nghĩa của từ trong câu, bảng DAU_NGHIA cho câu nối),
// câu ghép và cách nối các vế (VE: “chủ ngữ | vị ngữ” của từng vế như tests/tv5-gk2.js; cặp kết từ, cặp từ hô ứng, kết từ; quan hệ giữa
// hai vế), viết hoa danh từ chung (TON: danh từ chung được viết hoa để tỏ lòng kính trọng; RIENG: tên riêng; chữ đầu câu), tên người, tên
// địa lí nước ngoài (NN: tên đọc theo âm Hán Việt “hv” viết như tên riêng Việt Nam, tên phiên âm “pa” viết hoa chữ cái đầu của mỗi bộ
// phận, các tiếng của một bộ phận nối bằng dấu gạch nối, các tiếng sau viết thường; dungQT đọc lại mọi tên; số bộ phận, số tiếng), dấu
// gạch ngang (công dụng đọc từ vị trí của dấu như tests/tv5-ck1.js: lời nói, liệt kê, chú thích, liên danh; dấu gạch nối “-” trong tên
// nước ngoài khác dấu gạch ngang “–”; câu dùng dấu gạch ngang chưa đúng là câu bộ đọc không đọc được), liên kết câu (TU_NOI, từ ngữ lặp
// lại, từ ngữ thay thế như tests/tv5-gk2.js); câu đúng/sai 4 ý đọc từng ý theo mẫu chữ; đáp án chỉ khớp một lựa chọn. Đọc hiểu: chữ trích
// trong ngoặc kép ở đề bài, lời giải có đúng trong đoạn đọc; câu sắp xếp sự việc đúng thứ tự trong bài (THU_TU), câu đúng/sai, câu trả lời
// bằng số khớp đoạn đọc.
// Rồi kiểm tra ma trận 10 – 8 – 7 (hai đề cố định đúng ma trận; ô Luyện từ và câu có rút có một câu ở mỗi đề cố định, hai câu riêng),
// chữ chủ đề (chủ đề ôn đúng chữ chủ đề của kho cuối kì I, giữa kì II; chủ đề mới không có ở kho khác), đoạn đọc (đoạn 4 câu mức 1-1-2-3,
// đoạn 3 câu mức 1-2-3), câu Viết (chỉ tự luận, đủ năm kiểu bài Viết của Bài 17–30: đoạn văn nêu ý kiến tán thành, phản đối một sự việc,
// hiện tượng, đoạn văn thể hiện tình cảm, cảm xúc về một sự việc, bài văn tả phong cảnh, bài văn tả người; 4–6 ý chấm, 5 điểm), dạng câu
// (đúng/sai 4 ý không lặp kiểu Đ/S; có điền, đúng/sai, trả lời bằng số, nối cột, sắp xếp), gọi người làm bài là “bạn”, đáp án đúng không
// dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất (kể cả bằng nhau) ở không quá một phần ba số câu nhiều lựa chọn, ba lựa
// chọn sai không cùng mở đầu bằng một chữ mà đáp án không có, không lặp chữ của nhãn chủ đề, đề bài không trùng câu nào trong file, rút
// thử (đúng ma trận, trọn đoạn; đã làm hết một đề cố định thì không rút lại câu của đề đó), dò lộ đáp án giữa mọi cặp câu của kho và lời
// dặn, và với câu cùng chủ đề của các kho Tiếng Việt 5 khác (đề “Ôn chủ đề” rút chung câu cùng chủ đề), câu ôn không trùng đề bài, chuỗi
// 6 từ của đề bài, đáp án câu cùng chủ đề của kho cuối kì I, giữa kì II, đề bài không gần trùng câu của data/banks/4-tv.js và các kho
// Tiếng Việt 5 khác (cặp hai âm tiết chung) và, nếu có ../OnUp-Book, so mọi trường chữ (cả đoạn đọc và lời dặn) với chữ OCR của mọi cuốn
// (không chuỗi 8 từ nào trùng), so với câu của mọi kho khác, cả các kho Tiếng Việt 5 và câu riêng của các đề ngẫu nhiên.
// Chạy: node tests/tv5-ck2.js → in TV5 CK2 OK. DO_LO=1 in đáp án có ở câu khác (để xem tay, danh sách đã xem ở DA_XEM); DO_SACH=1 in
// chuỗi 6 từ trùng sách; DO_KHO=1 in chuỗi 6 từ trùng kho khác và câu gần trùng kho Tiếng Việt 4, Tiếng Việt 5 khác.
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
const S = { de1: "tv5-ck2-de1", de2: "tv5-ck2-de2", pool: "tv5-ck2-ngau-nhien" };
const DE = [S.de1, S.de2];
const cua = (id) => /^tv5-ck2-/.test(id);
const sum = (a) => a.reduce((s, v) => s + v, 0);
const nfc = (s) => String(s).normalize("NFC");
const thuong = (s) => nfc(s).toLowerCase();

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, DE, "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 40, b.id + ": 40 phút (có câu Viết tự chấm, như các kho Tiếng Việt 5 trước)");
  assert.equal(b.grade, 5); assert.equal(b.subject, "Tiếng Việt"); assert.equal(b.file, "5-tv.js");
  assert.ok(/Sở GD&ĐT ra đề chung cuối kì một số môn lớp 5/.test(b.note), b.id + ": lời dặn có câu về đề chung của Sở");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
assert.ok(rieng.length >= 45 && rieng.length <= 60, "đề ngẫu nhiên có khoảng 50 câu riêng: " + rieng.length);
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
{ // mã đoạn đọc không trùng giữa hai đề cố định và phần câu riêng, cũng không trùng mã đoạn của các kho khác cùng file
  const riengP = [...new Set(rieng.filter((q) => q.p).map((q) => q.p))];
  const ma = Object.keys(d1.passages).concat(Object.keys(d2.passages), riengP);
  assert.equal(new Set(ma).size, ma.length, "mã đoạn đọc không trùng giữa các đề");
  const khac = BANKS.filter((b) => b.file === "5-tv.js" && !cua(b.id)).flatMap((b) => Object.keys(b.passages || {}));
  ma.forEach((m) => assert.ok(!khac.includes(m), "mã đoạn đọc trùng kho khác cùng file: " + m));
  assert.ok(kho.every((q) => !q.p || PSG[q.p]), "câu có đoạn đọc trỏ tới đoạn có thật");
}
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("tv5-ck2-", "") + "#" + (i + 1))));
const cal = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
{
  const m = /id: "ck2-l5"[\s\S]*?banks: \[([^\]]*)\]/.exec(cal);
  assert.ok(m, "có kì thi ck2-l5");
  [S.de1, S.de2, S.pool].forEach((id) => assert.ok(m[1].includes(`"${id}"`), "ck2-l5 gắn đề " + id));
  const sc = /id: "ck2-l5"[\s\S]*?scope: "([^"]*)"/.exec(cal);
  assert.ok(sc && /Tiếng Việt: tập 2, trọng tâm Bài 17–30 \(tuần 28–34\)/.test(sc[1]), "scope của ck2-l5 ghi phạm vi Tiếng Việt");
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
const am = (s) => thuong(s).replace(/[^\p{L}\s]/gu, " ").split(/\s+/).filter(Boolean);
const tach = (o) => o.split(/,\s*/).map((w) => thuong(w).trim()).filter(Boolean); // “Tớ, cậu” → các từ
const trongCau = (cau, ws, at) => ws.forEach((w) => assert.ok(coTu(cau, w), `${at}: “${w}” không có trong câu “${cau}”`));
const quote = (q, k) => trich(q.q)[k || 0];

/* ---------- vế câu (Ghi nhớ tr. 10 của tập hai: câu đơn có một cụm chủ ngữ – vị ngữ; câu ghép gồm nhiều cụm, mỗi cụm là một vế) ----------
   Mỗi câu đem hỏi ghi “chủ ngữ | vị ngữ” của từng vế, theo thứ tự trong câu. Trạng ngữ, kết từ, dấu câu nằm ngoài các vế. */
const VE = {
  // Đề 1
  "Mùa hè năm ấy, ông dẫn em về thăm quê nội.": ["ông | dẫn em về thăm quê nội"],
  "Cánh đồng lúa trải rộng mênh mông, đàn cò trắng bay rợp trời.": ["Cánh đồng lúa | trải rộng mênh mông", "đàn cò trắng | bay rợp trời"],
  "Ông chỉ cho em ngôi trường cũ của ông.": ["Ông | chỉ cho em ngôi trường cũ của ông"],
  "Ngôi trường đã được xây mới nhưng cây bàng già vẫn còn nguyên.": ["Ngôi trường | đã được xây mới", "cây bàng già | vẫn còn nguyên"],
  "Trời mưa to nhưng đường làng ngập nước.": ["Trời | mưa to", "đường làng | ngập nước"],
  "Trời mưa to nên đường làng ngập nước.": ["Trời | mưa to", "đường làng | ngập nước"],
  "Vì trời mưa to nên đường làng ngập nước.": ["trời | mưa to", "đường làng | ngập nước"],
  "Trời mưa to, đường làng ngập nước.": ["Trời | mưa to", "đường làng | ngập nước"],
  "Hễ chú gà trống cất tiếng gáy thì cả xóm lại thức giấc.": ["chú gà trống | cất tiếng gáy", "cả xóm | lại thức giấc"],
  // Đề 2
  "Chợ quê em họp từ tờ mờ sáng.": ["Chợ quê em | họp từ tờ mờ sáng"],
  "Các bà, các mẹ gánh rau ra chợ, những chiếc xe đạp chở đầy gà vịt nối nhau qua cầu.": ["Các bà, các mẹ | gánh rau ra chợ", "những chiếc xe đạp | chở đầy gà vịt nối nhau qua cầu"],
  "Tiếng chào mời, tiếng mặc cả rộn ràng khắp các dãy hàng.": ["Tiếng chào mời, tiếng mặc cả | rộn ràng khắp các dãy hàng"],
  "Mặt trời vừa lên cao, chợ đã vãn người.": ["Mặt trời | vừa lên cao", "chợ | đã vãn người"],
  "Tuy cây đa đầu làng đã già nhưng tán lá vẫn xanh um, toả bóng mát.": ["cây đa đầu làng | đã già", "tán lá | vẫn xanh um, toả bóng mát"],
  "Trời càng về chiều, gió biển càng thổi mát.": ["Trời | càng về chiều", "gió biển | càng thổi mát"],
  // Câu riêng của đề ngẫu nhiên
  "Sau cơn mưa, cây cối trong vườn xanh mướt.": ["cây cối trong vườn | xanh mướt"],
  "Mưa tạnh, cầu vồng hiện ra sau rặng tre.": ["Mưa | tạnh", "cầu vồng | hiện ra sau rặng tre"],
  "Trời vừa hửng nắng, lũ chim đã ríu rít trên cành.": ["Trời | vừa hửng nắng", "lũ chim | đã ríu rít trên cành"],
  "Mưa đã tạnh nhưng sân trường vẫn còn ướt.": ["Mưa | đã tạnh", "sân trường | vẫn còn ướt"],
  "Ngày hội đọc sách của trường diễn ra vào sáng thứ sáu.": ["Ngày hội đọc sách của trường | diễn ra vào sáng thứ sáu"],
  "Các lớp trang trí gian sách thật đẹp, thầy cô đi thăm từng gian.": ["Các lớp | trang trí gian sách thật đẹp", "thầy cô | đi thăm từng gian"],
  "Bạn Hiền giới thiệu cuốn sách mình yêu thích.": ["Bạn Hiền | giới thiệu cuốn sách mình yêu thích"],
  "Hễ cô đọc xong câu đố thì nhiều bạn giơ tay xin trả lời.": ["cô | đọc xong câu đố", "nhiều bạn | giơ tay xin trả lời"],
  "Chúng ta tiết kiệm điện.": ["Chúng ta | tiết kiệm điện"], "Trái Đất sẽ bớt nóng lên.": ["Trái Đất | sẽ bớt nóng lên"],
  "Nếu chúng ta tiết kiệm điện thì Trái Đất sẽ bớt nóng lên.": ["chúng ta | tiết kiệm điện", "Trái Đất | sẽ bớt nóng lên"],
  "Tuy chúng ta tiết kiệm điện nhưng Trái Đất sẽ bớt nóng lên.": ["chúng ta | tiết kiệm điện", "Trái Đất | sẽ bớt nóng lên"],
  "Chúng ta tiết kiệm điện nhưng Trái Đất sẽ bớt nóng lên.": ["Chúng ta | tiết kiệm điện", "Trái Đất | sẽ bớt nóng lên"],
  "Vì Trái Đất sẽ bớt nóng lên nên chúng ta tiết kiệm điện.": ["Trái Đất | sẽ bớt nóng lên", "chúng ta | tiết kiệm điện"],
  "Không những Nam học giỏi mà bạn ấy còn chơi cờ giỏi.": ["Nam | học giỏi", "bạn ấy | còn chơi cờ giỏi"],
  "Mẹ chưa kịp gọi, hai anh em đã thức dậy.": ["Mẹ | chưa kịp gọi", "hai anh em | đã thức dậy"],
  "Nếu mẹ gọi sớm thì hai anh em sẽ thức dậy.": ["mẹ | gọi sớm", "hai anh em | sẽ thức dậy"],
  "Mẹ khẽ gọi và hai anh em thức dậy ngay.": ["Mẹ | khẽ gọi", "hai anh em | thức dậy ngay"],
  "Mẹ khẽ gọi, hai anh em thức dậy ngay.": ["Mẹ | khẽ gọi", "hai anh em | thức dậy ngay"],
  "Gió thổi mạnh, những cánh diều giấy bay vút lên cao.": ["Gió | thổi mạnh", "những cánh diều giấy | bay vút lên cao"],
  "Gió thổi mạnh và những cánh diều bay vút lên cao.": ["Gió | thổi mạnh", "những cánh diều | bay vút lên cao"],
  "Gió thổi mạnh nên những cánh diều bay vút lên cao.": ["Gió | thổi mạnh", "những cánh diều | bay vút lên cao"],
  "Hễ gió thổi mạnh thì những cánh diều lại bay vút lên cao.": ["gió | thổi mạnh", "những cánh diều | lại bay vút lên cao"]
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
Object.keys(VE).forEach(veCua); // mọi dòng của bảng đọc được

/* ---------- cách nối các vế (Ghi nhớ tr. 20, 28 của tập hai) ---------- */
const KET_NOI = { "và": "noi-tiep", "rồi": "noi-tiep", "còn": "doi-chieu", "nhưng": "tuong-phan", "mà": "tuong-phan", "song": "tuong-phan", "hoặc": "lua-chon",
  "hay": "lua-chon", "nên": "nguyen-nhan", "thì": "noi-tiep" };
const CAP_KT = { "vì… nên": "nguyen-nhan", "bởi… nên": "nguyen-nhan", "do… nên": "nguyen-nhan", "nhờ… mà": "nguyen-nhan", "nhờ… nên": "nguyen-nhan",
  "nếu… thì": "dieu-kien", "hễ… thì": "dieu-kien", "giá… thì": "dieu-kien", "tuy… nhưng": "tuong-phan", "mặc dù… nhưng": "tuong-phan",
  "dù… nhưng": "tuong-phan", "chẳng những… mà": "tang-tien", "không những… mà": "tang-tien", "không chỉ… mà": "tang-tien", "không chỉ… mà còn": "tang-tien" };
const CAP_HU = { "vừa… đã": "ho-ung", "chưa… đã": "ho-ung", "mới… đã": "ho-ung", "càng… càng": "ho-ung", "đâu… đó": "ho-ung", "đâu… đấy": "ho-ung",
  "nào… ấy": "ho-ung", "bao nhiêu… bấy nhiêu": "ho-ung", "bao giờ… bấy giờ": "ho-ung" };
const CAP = Object.assign({}, CAP_KT, CAP_HU);
// cặp từ nối các vế: phần đầu đứng trước vế thứ hai, phần sau ở vế thứ hai hoặc giữa hai vế; bỏ cặp nằm trong một cặp dài hơn
const capNoi = (cau) => {
  const vs = veCua(cau); if (vs.length < 2) return [];
  const hit = Object.keys(CAP).filter((c) => { const [a, b] = c.split("… "); const i = viTri(cau, a); return i >= 0 && i < vs[1].dau && viTri(cau, b, Math.max(i + a.length, vs[0].dau + vs[0].cn.length)) >= 0; });
  return hit.filter((c) => !hit.some((d) => d !== c && d.split("… ")[0].endsWith(" " + c.split("… ")[0]) && d.split("… ")[1] === c.split("… ")[1])
    && !hit.some((d) => d !== c && d.split("… ")[0] === c.split("… ")[0] && d.split("… ")[1].startsWith(c.split("… ")[1] + " ")));
};
const ketGiua = (cau) => { // các từ nằm giữa các vế (bỏ dấu câu)
  const vs = veCua(cau), t = thuong(cau);
  return vs.slice(1).map((v, k) => t.slice(vs[k].cuoi, v.dau).replace(/[^\p{L}\s]/gu, " ").trim()).filter(Boolean);
};
const cachNoi = (cau) => { // "truc-tiep" | "ket-tu" | "cap-ket-tu" | "ho-ung"; câu đơn: null
  const vs = veCua(cau); if (vs.length < 2) return null;
  const c = capNoi(cau);
  assert.ok(c.length <= 1, "câu có hai cặp từ nối: " + cau + " " + c.join(", "));
  if (c.length) return CAP_HU[c[0]] ? "ho-ung" : "cap-ket-tu";
  const g = ketGiua(cau);
  if (!g.length) return "truc-tiep";
  g.forEach((x) => assert.ok(KET_NOI[x], `từ nằm giữa hai vế không phải kết từ: “${x}” trong “${cau}”`));
  return "ket-tu";
};
const quanHe = (cau) => { const c = capNoi(cau); if (c.length) return CAP[c[0]]; const g = ketGiua(cau); return g.length === 1 ? KET_NOI[g[0]] : null; };
// tự thử
assert.equal(cachNoi("Trời mưa to, đường làng ngập nước."), "truc-tiep");
assert.equal(cachNoi("Ngôi trường đã được xây mới nhưng cây bàng già vẫn còn nguyên."), "ket-tu");
assert.equal(cachNoi("Hễ cô đọc xong câu đố thì nhiều bạn giơ tay xin trả lời."), "cap-ket-tu");
assert.equal(cachNoi("Trời càng về chiều, gió biển càng thổi mát."), "ho-ung");
assert.equal(cachNoi("Mẹ chưa kịp gọi, hai anh em đã thức dậy."), "ho-ung");
assert.deepEqual(capNoi("Không những Nam học giỏi mà bạn ấy còn chơi cờ giỏi."), ["không những… mà"]);
assert.equal(cachNoi("Sau cơn mưa, cây cối trong vườn xanh mướt."), null);

/* ---------- liên kết câu (Ghi nhớ tr. 45, 55, 63 của tập hai; luyện tập tr. 142) ---------- */
const TU_NOI = { "vì vậy": "ket-qua", "vì thế": "ket-qua", "thế là": "ket-qua", "do đó": "ket-qua", "nhờ vậy": "ket-qua", "trái lại": "tuong-phan",
  "tuy vậy": "tuong-phan", "tuy nhiên": "tuong-phan", "vậy mà": "tuong-phan", "song": "tuong-phan", "nhưng": "tuong-phan", "ngược lại": "tuong-phan",
  "ngoài ra": "bo-sung", "bên cạnh đó": "bo-sung", "mặt khác": "bo-sung", "hơn nữa": "bo-sung", "sau đó": "thu-tu", "cuối cùng": "thu-tu-cuoi" };
const noiDau = (s) => Object.keys(TU_NOI).sort((a, b) => b.length - a.length).find((t) => new RegExp("^" + thoat(t) + "(?![\\p{L}])", "u").test(thuong(s).trim())) || null;
// hư từ, đại từ không tính khi tìm từ ngữ lặp lại
const HU_TU = new Set(["và", "là", "có", "một", "những", "các", "của", "cho", "đã", "đang", "sẽ", "rất", "lại", "cũng", "thì", "mà", "với", "trong", "ở",
  "đến", "từ", "ra", "vào", "lên", "như", "nào", "này", "ấy", "đó", "kia", "em", "nhiều", "không", "được", "mới", "còn", "đều", "vẫn", "hay", "nhưng",
  "vì", "thế", "vậy", "nên", "bị", "để", "khi", "lúc", "sau", "trước", "cả", "mỗi", "chỉ"]);
const tuNoiDung = (s) => new Set(am(s).filter((w) => !HU_TU.has(w)));
const lapGiua = (s1, s2) => { const a = tuNoiDung(s1); return [...tuNoiDung(s2)].filter((w) => a.has(w)); };
const cauDoan = (doan) => (/\(\d\)/.test(doan) ? doan.split(/\(\d\)\s*/).map((x) => x.trim()).filter(Boolean)
  : nfc(doan).split(/(?<=[.!?])\s+(?=\p{Lu})/u).map((x) => x.trim()).filter(Boolean));
// từ ngữ thay thế: câu chứa từ ngữ thay thế → { từ ngữ thay thế: từ ngữ được thay (có ở câu trước) }
const THAY = {
  "Tháng Ba, nó nở hoa đỏ rực cả một góc trời.": { "nó": "một cây gạo cổ thụ" },
  "Chúng ríu rít gọi nhau suốt buổi sáng.": { "chúng": "Một đàn chim sẻ" },
  "Em cũng muốn làm như vậy.": { "vậy": "tưới nước cho những khóm hoa trước sân" },
  "Tin vui ấy khiến cả trường phấn khởi.": { "tin vui ấy": "Đội văn nghệ của trường vừa đoạt giải nhất" },
  "Nơi ấy lúc nào cũng xanh mướt.": { "nơi ấy": "khu vườn nhỏ" }
};
const THAY_B = new Map(Object.entries(THAY).map(([k, v]) => [bang(k), v]));
const thayCua = (s) => THAY_B.get(bang(s)) || {};
// tự thử
assert.deepEqual(lapGiua("Năm nay, lớp em tổ chức hội chợ sách cũ.", "Hội chợ diễn ra suốt buổi sáng thứ bảy."), ["hội", "chợ"]);
assert.equal(noiDau("Vậy mà cả lớp em vẫn có mặt đầy đủ, đúng giờ."), "vậy mà");

// câu đúng/sai 4 ý về câu ghép: đọc từng ý theo mẫu chữ (đoạn văn đánh số (1), (2)… ở đề bài)
const yCauGhep = (y, cs, at) => {
  const so = (k) => cs[+k - 1];
  let m;
  if ((m = /^Câu \((\d)\) là câu đơn\.$/.exec(y))) return soVe(so(m[1])) === 1;
  if ((m = /^Câu \((\d)\) là câu ghép\.$/.exec(y))) return soVe(so(m[1])) >= 2;
  if ((m = /^Câu \((\d)\) là câu ghép có (hai|ba) vế\.$/.exec(y))) return soVe(so(m[1])) === { hai: 2, ba: 3 }[m[2]];
  if ((m = /^Câu \((\d)\) là câu ghép, các vế nối (trực tiếp|bằng một kết từ)\.$/.exec(y))) return cachNoi(so(m[1])) === { "trực tiếp": "truc-tiep", "bằng một kết từ": "ket-tu" }[m[2]];
  assert.fail(`${at}: không đọc được ý “${y}”`);
};

/* ---------- đại từ, kết từ (Ghi nhớ của tập một: đại từ tr. 21, kết từ tr. 142; luyện tập tr. 90–91 của tập hai) ---------- */
const DAI = {
  xh: ["tôi", "tớ", "mình", "chúng mình", "chúng ta", "chúng tôi", "chúng tớ", "họ", "nó", "chúng", "chúng nó", "ta", "cậu"],
  nv: ["ai", "gì", "nào", "sao", "bao nhiêu", "đâu", "mấy", "bao giờ", "khi nào", "bao lâu"],
  tt: ["thế", "vậy", "đó", "này", "ấy", "kia", "đây"]
};
const laDai = (w) => Object.keys(DAI).find((k) => DAI[k].includes(thuong(w)));
const KET = ["và", "với", "hay", "hoặc", "nhưng", "mà", "thì", "của", "vì", "nên", "do", "nếu", "tuy", "mặc dù", "để", "bằng", "nhờ", "tại", "bởi",
  "còn", "trong", "cho", "như"];
const KET_NN = ["vì", "do", "tại", "bởi", "nhờ"]; // kết từ chỉ nguyên nhân

/* ---------- từ đồng nghĩa (Ghi nhớ tr. 48 của tập một; luyện tập tr. 99 của tập hai) ---------- */
const DONG_NGHIA = [["siêng năng", "chăm chỉ", "cần cù"], ["thật thà", "trung thực", "ngay thẳng"], ["bao la", "mênh mông", "bát ngát"],
  ["đông đúc", "nhộn nhịp", "tấp nập"], ["biếu", "tặng", "ban", "dâng"], ["hi sinh", "chết", "mất", "từ trần"],
  ["trắng tinh", "trắng xoá", "trắng bệch", "trắng nhợt"], ["ngọt ngào", "ngọt lịm", "ngòn ngọt", "ngọt xớt"]];
const nhomDN = (w) => DONG_NGHIA.find((g) => g.includes(thuong(w)));
// từ hợp văn cảnh nhất trong nhóm đồng nghĩa (lí do ở lời giải từng câu)
const HOP_DN = { "mang sang … ông bà nội": "biếu", "nhiều chiến sĩ đã anh dũng …": "hi sinh", "mẹ vừa giặt … như bông": "trắng tinh", "Lời ru … của bà": "ngọt ngào" };

/* ---------- viết hoa danh từ chung (tr. 114–115 của tập hai) ---------- */
const TON = ["Tổ quốc", "Bác", "Người"]; // danh từ chung được viết hoa để tỏ lòng kính trọng
const RIENG = ["Hải", "Hữu Nghị", "Bạch Long Vĩ", "Cô Tô", "Sen", "Pác Bó", "Mai"]; // tên riêng trong các câu đem so
// các từ viết hoa không đứng đầu câu: mỗi từ phải là danh từ chung tỏ lòng kính trọng (TON) hoặc tên riêng (RIENG)
const hoaGiua = (s) => { const t = nfc(s).trim(), dau = /^\S+/.exec(t)[0].length; return [...t.slice(dau).matchAll(/\p{Lu}\p{Ll}*(?: \p{Lu}\p{Ll}*)*/gu)].map((m) => m[0]); };
const hoaTon = (s) => hoaGiua(s).filter((w) => TON.includes(w) || TON.some((x) => w === x.split(" ")[0] && nfc(s).includes(x)));
const tonTrong = (s) => TON.filter((x) => new RegExp("(?<=\\S.*)(?<![\\p{L}])" + thoat(x) + "(?![\\p{L}])", "u").test(nfc(s).trim()));
assert.deepEqual(tonTrong("Các chú bộ đội canh giữ biên cương của Tổ quốc."), ["Tổ quốc"]);
assert.deepEqual(tonTrong("Bác Tư hàng xóm trồng nhiều hoa."), [], "chữ đầu câu không tính");

/* ---------- tên người, tên địa lí nước ngoài (tr. 123–124 của tập hai) ----------
   hv: đọc theo âm Hán Việt, viết như tên riêng Việt Nam (viết hoa chữ cái đầu của mỗi tiếng, không có dấu gạch nối); pa: phiên âm trực
   tiếp, viết hoa chữ cái đầu của mỗi bộ phận, các tiếng trong một bộ phận nối bằng dấu gạch nối, các tiếng sau viết thường. */
const NN = { "Lép Tôn-xtôi": "pa", "Tô-mát Ê-đi-xơn": "pa", "Luân Đôn": "hv", "Mát-xcơ-va": "pa", "Ô-xlô": "pa", "Béc-lin": "pa", "Ác-hen-ti-na": "pa",
  "Xin-ga-po": "pa", "Ma-lai-xi-a": "pa", "Ki-li-man-gia-rô": "pa", "I-u-ri Ga-ga-rin": "pa", "Bắc Kinh": "hv", "Na Uy": "hv", "Lý Bạch": "hv",
  "Thượng Hải": "hv", "Ô-xtơ-ri-a": "pa", "Đỗ Phủ": "hv", "Mê-hi-cô": "pa", "Đan Mạch": "hv", "Niu-tơn": "pa", "Ca-na-đa": "pa", "Ni-a-ga-ra": "pa",
  "Tô-rôn-tô": "pa", "An-đéc-xen": "pa", "Vôn-ga": "pa", "A-ma-dôn": "pa", "Xa-ha-ra": "pa", "An-pơ": "pa", "Hy Lạp": "hv", "Bra-xin": "pa",
  "Ma-ri Quy-ri": "pa", "Ni-giê-ri-a": "pa", "Ma-ni-la": "pa" };
const hoaDau = (t) => /^\p{Lu}\p{Ll}*$/u.test(t), thuongHet = (t) => /^\p{Ll}+$/u.test(t);
const dungQT = (ten0) => {
  const t = nfc(ten0), loai = NN[t];
  if (/-/.test(t) || !loai) return t.split(" ").every((bp) => { const ti = bp.split("-"); return ti.length && hoaDau(ti[0]) && ti.slice(1).every(thuongHet); });
  return loai === "hv" ? t.split(" ").every(hoaDau) : t.split(" ").every((bp) => { const ti = bp.split("-"); return hoaDau(ti[0]) && ti.slice(1).every(thuongHet); });
};
Object.keys(NN).forEach((t) => { assert.ok(dungQT(t), "bảng NN viết sai quy tắc: " + t); assert.equal(NN[t] === "hv", !/-/.test(t) && t.split(" ").length >= 2 || NN[t] === "hv", "bảng NN: " + t); });
assert.ok(NN["Luân Đôn"] === "hv" && Object.entries(NN).filter(([, v]) => v === "hv").every(([k]) => !/-/.test(k)), "tên Hán Việt không có dấu gạch nối");
["Lép tôn-xtôi", "Lép-Tôn-xtôi", "lép Tôn xtôi", "Tô-Mát Ê-Đi-Xơn", "vôn-ga", "Ki-li-măng-Gia-rô"].forEach((t) => assert.ok(!dungQT(t), "bộ đọc tên phải bắt được tên viết sai: " + t));
const boPhan = (t) => nfc(t).split(" ").length, soTieng = (t) => nfc(t).split(/[ -]/).length;
const tenGach = (s) => [...nfc(s).matchAll(/\p{L}+(?:-\p{L}+)+/gu)].map((m) => m[0]); // tên có dấu gạch nối trong câu

/* ---------- dấu gạch ngang (Ghi nhớ tr. 164 của tập một; luyện tập tr. 132–133 của tập hai): công dụng đọc từ vị trí của dấu ---------- */
const LOI_DAN = /(hỏi|nói|dặn|đáp|reo|bảo|thưa|kêu|dỗ)( [^:–.!?]{1,20})?:\s*$/;
const gach = (s) => { // mỗi dấu “–” của một câu, đoạn → công dụng; không đọc được thì báo lỗi
  const t = nfc(s), ra = [];
  const pos = [...t.matchAll(/–/g)].map((m) => m.index);
  for (let k = 0; k < pos.length; k++) {
    const i = pos[k], truoc = t.slice(0, i), sau = t.slice(i + 1);
    if (/:\s*$/.test(truoc) || /;\s*$/.test(truoc)) { // đầu một ý sau dấu hai chấm hay dấu chấm phẩy
      const lietKe = /;\s*$/.test(truoc) || /^[^;.!?]*;\s*–/.test(sau);
      ra.push(lietKe ? "liet-ke" : LOI_DAN.test(truoc) ? "loi-noi" : "?");
      continue;
    }
    // dấu ở giữa câu: có dấu “–” thứ hai trong cùng câu, cách từ hai từ trở lên, phần sau còn tiếp câu → chú thích (tính cả hai dấu)
    const doan = sau.split(/[.!?]/)[0], j = doan.indexOf("–");
    if (j >= 0 && doan.slice(0, j).trim().split(/\s+/).length >= 2 && doan.slice(j + 1).trim().length) { ra.push("chu-thich", "chu-thich"); k++; continue; }
    // một dấu nối hai tên: từ ngay trước và ngay sau đều viết hoa
    const a = /(\S+)\s*$/.exec(truoc), b = /^\s*(\S+)/.exec(sau);
    ra.push(a && b && /^\p{Lu}/u.test(a[1]) && /^\p{Lu}/u.test(b[1]) ? "lien-danh" : "?");
  }
  assert.ok(ra.length && !ra.includes("?"), "không đọc được công dụng của dấu gạch ngang: " + s);
  return ra;
};
const motCong = (s) => { const g = [...new Set(gach(s))]; assert.equal(g.length, 1, "câu có nhiều công dụng của dấu gạch ngang: " + s); return g[0]; };
const docDuoc = (s) => { try { gach(s); return true; } catch (e) { return false; } };
const R_DUNG = { "Nối các tên trong một liên danh": "lien-danh", "Đánh dấu lời nói của nhân vật": "loi-noi", "Đánh dấu phần giải thích": "chu-thich", "Đánh dấu các ý liệt kê": "liet-ke" };
// tự thử bộ đọc với các câu viết sai cố ý
assert.equal(motCong("Chị Hà dỗ em bé: – Nín đi em!"), "loi-noi");
assert.equal(motCong("Lớp em có: – hai bạn hát; – ba bạn múa."), "liet-ke");
assert.equal(motCong("Đội Sơn Ca – Hoạ Mi thi kéo co."), "lien-danh");
assert.equal(motCong("Cô Ba – người bán hàng vui tính – đã về quê."), "chu-thich");
assert.ok(!docDuoc("Hôm nay – trời mưa."), "bộ đọc phải báo câu dùng dấu gạch ngang không đúng");

/* ---------- từng câu Luyện từ và câu ---------- */
const bon = (q) => q.o.map((o) => o.trim());
const TU_NOI_HOP = { "…, nhiều cánh đồng lúa bị ngập úng.": "ket-qua" }; // nghĩa cần nối của câu chọn từ ngữ nối
const QH_CAN = { "Chúng ta tiết kiệm điện. Trái Đất sẽ bớt nóng lên.": "dieu-kien" }; // quan hệ giữa hai câu đơn đem gộp
const CHUA_HOP = { "dùng từ nối các vế chưa hợp lí": "nguyen-nhan" }; // quan hệ đúng của nội dung các lựa chọn
const DAU_NGHIA = { "Bạn Lan đội chiếc mũ rộng vành lên đầu.": "Bộ phận trên cùng của cơ thể người", "Nhà bà ngoại ở ngay đầu làng.": "Chỗ bắt đầu của một vùng đất",
  "Hai đầu sợi dây được buộc vào hai gốc cây.": "Phần tận cùng ở hai bên của vật dài" };
// đoạn văn có tên viết sai: tên viết sai → cách viết đúng; tên viết đúng
const NN_DOAN = { "Tháng trước, chú Tâm sang Ca-na-đa công tác.": { sai: { "ni-a-ga-ra": "Ni-a-ga-ra", "Tô Rôn-tô": "Tô-rôn-tô" }, dung: ["Ca-na-đa"] } };
// câu viết đúng mọi tên: tên phải có, đúng cách viết
const NN_CAU = { "Câu nào dưới đây viết đúng tất cả tên riêng nước ngoài?": ["Xin-ga-po", "Ma-lai-xi-a"] };
// cách viết lại đoạn văn lặp từ ngữ: chủ ngữ của các câu sau; chủ ngữ phải chỉ khu vườn
const CN_VUON = { "Vườn trồng đủ loại rau.": "vườn", "Nơi ấy lúc nào cũng xanh mướt.": "nơi ấy", "Bà trồng đủ loại rau.": "bà", "Bà lúc nào cũng xanh mướt.": "bà",
  "Trồng đủ loại rau.": "", "Lúc nào cũng xanh mướt.": "", "Họ trồng đủ các loại rau.": "họ", "Chúng lúc nào cũng xanh mướt.": "chúng" };
const hopCap = (q, at) => { // vế câu ghép với phần đầu cho sẵn: phần đầu và từ mở đầu lựa chọn tạo thành một cặp kết từ, chỉ đáp án làm được
  const dau = quote(q).replace(/\s*…\s*$/, "");
  mot(q, (o) => Object.keys(CAP_KT).some((c) => { const [a, b] = c.split("… "); return thuong(dau).startsWith(a + " ") && thuong(o).startsWith(b + " "); }), at);
  const cau = dau + " " + q.o[0] + "."; assert.equal(soVe(cau), 2, at); assert.equal(capNoi(cau).length, 1, at);
};
const CHECKS = [
  // Đại từ
  { has: "”, từ nào là đại từ?", right: (q, at) => { const c = quote(q); trongCau(c, q.o, at); mot(q, (o) => !!laDai(o), at); } },
  { has: "những từ nào là đại từ?", right: (q, at) => { const c = quote(q); q.o.forEach((o) => trongCau(c, tach(o), at)); mot(q, (o) => tach(o).every((w) => laDai(w)), at); } },
  { has: "Đại từ nghi vấn trong câu", right: (q, at) => { const c = quote(q); trongCau(c, q.o, at); mot(q, (o) => laDai(o) === "nv", at); } },
  { has: "Câu nào dưới đây có đại từ xưng hô?", right: (q, at) => mot(q, (o) => DAI.xh.some((w) => coTu(o, w)), at) },
  { has: "được dùng thay cho từ ngữ nào?", right: (q, at) => { const [c1, c2] = cauDoan(quote(q)), w = quote(q, 1), goc = thayCua(c2)[thuong(w)];
    assert.ok(goc && coTu(c1, goc) && coTu(c2, w) && !coTu(c1, w) && !!laDai(w), at + ": đại từ ở câu sau, từ ngữ được thay ở câu trước"); mot(q, (o) => thuong(o) === thuong(goc), at); } },
  { has: "thay thế cho điều gì?", right: (q, at) => { const [c1, c2] = cauDoan(quote(q)), w = quote(q, 1), goc = thayCua(c2)[thuong(w)];
    assert.ok(goc && coTu(c1, goc) && laDai(w) === "tt", at); mot(q, (o) => thuong(o) === thuong(goc), at); } },
  { has: "Từ “Chúng” chỉ gì?", right: (q, at) => { const [c1, c2] = cauDoan(quote(q)), goc = thayCua(c2)["chúng"]; assert.ok(goc && coTu(c1, goc), at);
    mot(q, (o) => thuong(goc).endsWith(thuong(o)), at); } },
  { has: "từ “Cậu” dùng để chỉ người nào?", right: (q, at) => { const m = /lời (\S+) nói với (\S+):/.exec(q.q); assert.ok(m && DAI.xh.includes("cậu"), at); // “cậu”: người nghe
    mot(q, (o) => o.includes(m[2]) && /người nghe/.test(o), at); } },
  // Kết từ
  { has: "từ nào là kết từ?", right: (q, at) => { const c = quote(q); trongCau(c, q.o, at); mot(q, (o) => KET.includes(thuong(o)), at); } },
  { has: "Kết từ trong câu", right: (q, at) => { const c = quote(q); trongCau(c, q.o, at); mot(q, (o) => KET.includes(thuong(o)), at); } },
  { has: "Kết từ chỉ nguyên nhân trong câu", right: (q, at) => { const k = am(quote(q)).filter((w) => KET_NN.includes(w)); assert.deepEqual(k, q.ans.map(thuong), at + ": câu chỉ có một kết từ chỉ nguyên nhân, là đáp án"); } },
  // Từ đồng nghĩa
  { has: "không đồng nghĩa với các từ còn lại?", right: (q, at) => khacNghia(q, at) },
  { has: "có một từ khác nghĩa với ba từ kia", right: (q, at) => khacNghia(q, at) },
  { has: "không cùng nhóm nghĩa với những từ khác", right: (q, at) => khacNghia(q, at) },
  { has: "là những từ đồng nghĩa?", right: (q, at) => khacNghia(q, at) },
  { has: "ông bà nội", right: (q, at) => hopDN(q, at) }, { has: "anh dũng …", right: (q, at) => hopDN(q, at) },
  { has: "mẹ vừa giặt", right: (q, at) => hopDN(q, at) }, { has: "Lời ru …", right: (q, at) => hopDN(q, at) },
  // Từ đa nghĩa
  { has: "Từ “lưỡi” trong câu", right: (q, at) => { assert.ok(coTu(quote(q, 1), "lưỡi cày"), at); mot(q, (o) => /cày/.test(o) && /sắc/.test(o), at); } },
  { has: "Từ “đầu” trong mỗi câu", right: (q, at) => q.l.forEach((l, i) => { assert.ok(coTu(l, "đầu"), at); assert.equal(q.r[i], DAU_NGHIA[l], `${at}: “${l}”`); }) },
  { has: "từ “cánh” được dùng với nghĩa nào?", right: (q, at) => { assert.ok(coTu(quote(q), "cánh cửa"), at); mot(q, (o) => /^Nghĩa chuyển/.test(o) && /cửa/.test(o), at); } },
  { has: "Từ “chín” trong câu", right: (q, at) => { assert.ok(coTu(quote(q, 1), "suy nghĩ cho chín"), at); mot(q, (o) => /kĩ càng/i.test(o), at); } },
  // Câu ghép
  { has: "quê nội.", right: (q, at) => { const cs = cauDoan(quote(q)); return q.o.map((y) => yCauGhep(y, cs, at)); } },
  { has: "Ngày hội đọc sách", right: (q, at) => { const cs = cauDoan(quote(q)); return q.o.map((y) => yCauGhep(y, cs, at)); } },
  { has: "dùng từ nối các vế chưa hợp lí?", right: (q, at) => { const can = CHUA_HOP["dùng từ nối các vế chưa hợp lí"]; q.o.forEach((o) => assert.equal(soVe(o), 2, at + ": " + o));
    mot(q, (o) => quanHe(o) !== null && quanHe(o) !== can, at); } },
  { has: "Đoạn văn có mấy câu ghép?", right: (q) => cauDoan(quote(q)).filter((c) => soVe(c) >= 2).length },
  { has: "Tuy cây đa đầu làng đã già", right: (q, at) => hopCap(q, at) },
  { has: "Không những Nam học giỏi", right: (q, at) => hopCap(q, at) },
  { has: "không phải là câu ghép?", right: (q, at) => mot(q, (o) => soVe(o) === 1, at) },
  { has: "Gộp hai câu đơn", right: (q, at) => { const k = quote(q), can = QH_CAN[k], [a, b] = cauDoan(k).map((c) => veCua(c)[0]); assert.ok(can && a && b, at);
    q.o.forEach((o) => assert.equal(soVe(o), 2, at + ": " + o));
    mot(q, (o) => { const v = veCua(o); return quanHe(o) === can && thuong(v[0].cn) === thuong(a.cn) && thuong(v[1].cn) === thuong(b.cn); }, at); } },
  // Cách nối các vế câu ghép
  { has: "hai vế câu được nối bằng gì?", right: (q, at) => noiBang(q, at) },
  { has: "được nối theo cách nào?", right: (q, at) => noiBang(q, at) },
  { has: "có các vế được nối bằng một cặp từ hô ứng?", right: (q, at) => mot(q, (o) => cachNoi(o) === "ho-ung", at) },
  { has: "hai vế đứng liền nhau, không cần từ nối?", right: (q, at) => mot(q, (o) => cachNoi(o) === "truc-tiep", at) },
  // Viết hoa danh từ chung
  { has: "Câu nào dưới đây có một danh từ chung được viết hoa", right: (q, at) => vietHoaCau(q, at) },
  { has: "có một từ không phải tên riêng nhưng vẫn được viết hoa", right: (q, at) => vietHoaCau(q, at) },
  { has: "từ nào được viết hoa vì người viết muốn tỏ lòng kính trọng?", right: (q, at) => { const c = quote(q); q.o.forEach((o) => trongCau(c, [o], at));
    mot(q, (o) => tonTrong(c).includes(o), at); assert.equal(tonTrong(c).length, 1, at); } },
  { has: "Người viết có thể viết hoa một danh từ chung", right: (q, at) => mot(q, (o) => /tôn kính/.test(o), at) },
  // Viết tên người, tên địa lí nước ngoài
  { has: "Tên người nước ngoài nào dưới đây viết đúng chính tả?", right: (q, at) => mot(q, (o) => !!NN[o] && dungQT(o), at) },
  { has: "Cách viết nào đúng với tên ngọn núi", right: (q, at) => mot(q, (o) => !!NN[o] && dungQT(o), at) },
  { has: "được viết như tên riêng Việt Nam, không có dấu gạch nối?", right: (q, at) => { q.o.forEach((o) => assert.ok(NN[o], at + ": tên chưa có ở NN: " + o)); mot(q, (o) => NN[o] === "hv", at); } },
  { has: "Dòng nào gồm toàn những tên riêng nước ngoài đọc theo âm Hán Việt?", right: (q, at) => {
    q.o.forEach((o) => tach(o).forEach((n) => assert.ok(Object.keys(NN).some((k) => thuong(k) === n), at + ": tên chưa có ở NN: " + n)));
    mot(q, (o) => o.split(/,\s*/).every((n) => NN[n] === "hv"), at); } },
  { has: "Tên riêng trong câu cần sửa lại thế nào cho đúng?", right: (q, at) => suaTen(q, at) },
  { has: "Tên riêng trong câu phải viết lại thế nào?", right: (q, at) => suaTen(q, at) },
  { has: "Câu nào dưới đây viết đúng tất cả tên riêng nước ngoài?", right: (q, at) => { const ds = NN_CAU[q.q]; assert.ok(ds, at);
    mot(q, (o) => ds.every((n) => o.includes(n)) && tenGach(o).every((n) => NN[n] && dungQT(n)), at); } },
  { has: "Câu nào dưới đây có tên riêng nước ngoài viết sai quy tắc?", right: (q, at) => { q.o.forEach((o) => assert.ok(tenGach(o).length, at));
    mot(q, (o) => tenGach(o).some((n) => !dungQT(n) || !NN[n]), at); } },
  { has: "gồm mấy tiếng?", right: (q) => { const n = quote(q); assert.ok(NN[n]); return soTieng(n); } },
  { has: "gồm mấy bộ phận?", right: (q) => { const n = quote(q, 1); assert.ok(NN[n]); return boPhan(n); } },
  { has: "Đoạn văn có mấy tên riêng nước ngoài viết sai quy tắc?", right: (q, at) => { const c = quote(q), k = Object.keys(NN_DOAN).find((x) => c.startsWith(x)), e = NN_DOAN[k];
    assert.ok(e, at); Object.entries(e.sai).forEach(([s, d]) => assert.ok(c.includes(s) && s !== d && NN[d] && dungQT(d) && thuong(s).replace(" ", "-") === thuong(d), `${at}: “${s}” → “${d}”`));
    e.dung.forEach((d) => assert.ok(c.includes(d) && NN[d] && dungQT(d), at)); return Object.keys(e.sai).length; } },
  { has: "Mỗi ý sau về cách viết tên riêng nước ngoài đúng hay sai?", right: (q, at) => q.o.map((y) => {
    let m;
    if ((m = /^Tên nước “(.+)” đọc theo âm Hán Việt nên được viết như tên riêng Việt Nam\.$/.exec(y))) return NN[m[1]] === "hv";
    if ((m = /^Tên nước “(.+)” gồm hai bộ phận nên có dấu gạch nối\.$/.exec(y))) return boPhan(m[1]) === 2;
    if ((m = /^Trong tên “(.+)”, bộ phận nào cũng được viết hoa chữ cái đầu\.$/.exec(y))) return m[1].split(" ").every((b) => /^\p{Lu}/u.test(b));
    if ((m = /^Các tiếng trong tên nước “(.+)” được viết rời, không có dấu gạch nối\.$/.exec(y))) return !m[1].includes("-");
    assert.fail(`${at}: không đọc được ý “${y}”`); }) },
  // Dấu gạch ngang
  { has: "có dấu gạch ngang nối hai tên riêng thành một liên danh?", right: (q, at) => mot(q, (o) => motCong(o) === "lien-danh", at) },
  { has: "dấu gạch ngang được dùng giống như trong câu", right: (q, at) => { const k = motCong(quote(q)); mot(q, (o) => motCong(o) === k, at); } },
  { has: "có dấu gạch nối, không có dấu gạch ngang?", right: (q, at) => mot(q, (o) => tenGach(o).length > 0 && !o.includes("–"), at) },
  { has: "Ghép mỗi câu với tác dụng của dấu gạch ngang", right: (q, at) => { assert.ok(q.r.length > q.l.length, at + ": có ô thừa"); q.l.forEach((l, i) => assert.equal(R_DUNG[q.r[i]], motCong(l), `${at}: “${l}”`));
    q.r.slice(q.l.length).forEach((r) => assert.ok(R_DUNG[r] && !q.l.some((l) => motCong(l) === R_DUNG[r]), at + ": ô thừa không đúng với câu nào")); } },
  { has: "phần nằm giữa hai dấu gạch ngang nói rõ điều gì?", right: (q, at) => { const c = quote(q); assert.equal(motCong(c), "chu-thich", at);
    const ct = c.split("–")[1].trim(); mot(q, (o) => thuong(ct).startsWith(thuong(o).replace(/^ông sáu là /, "")), at); } },
  { has: "có dấu gạch ngang đánh dấu lời nói của nhân vật?", right: (q, at) => mot(q, (o) => motCong(o) === "loi-noi", at) },
  { has: "triển lãm tranh thiếu nhi", right: (q, at) => { const g = gach(quote(q)); assert.deepEqual(g, ["lien-danh", "chu-thich", "chu-thich", "loi-noi"], at);
    return [g[0] === "lien-danh", g[1] === "loi-noi", g[3] === "loi-noi", new Set(g).size === 3]; } },
  { has: "dùng dấu gạch ngang chưa đúng?", right: (q, at) => mot(q, (o) => !docDuoc(o), at) },
  // Liên kết câu trong đoạn văn
  { has: "Từ ngữ nào ở đầu câu (2) giúp câu này gắn với câu (1)?", right: (q, at) => { const cs = cauDoan(quote(q)); bon(q).forEach((o) => assert.ok(coTu(quote(q), o), at));
    mot(q, (o) => noiDau(cs[1]) === thuong(o), at); } },
  { has: "Từ ngữ nào cho biết câu (2) có ý trái ngược với câu (1)?", right: (q, at) => { const cs = cauDoan(quote(q)); bon(q).forEach((o) => assert.ok(coTu(quote(q), o), at));
    mot(q, (o) => noiDau(cs[1]) === thuong(o) && TU_NOI[thuong(o)] === "tuong-phan", at); } },
  { has: "bằng cách nhắc lại từ ngữ nào?", right: (q, at) => { const [s1, s2] = cauDoan(quote(q)); mot(q, (o) => coTu(s1, o) && coTu(s2, o), at);
    assert.deepEqual(lapGiua(s1, s2).sort(), [...tuNoiDung(q.o[0])].sort(), at + ": ngoài đáp án, hai câu không lặp từ nào khác"); } },
  { has: "để câu thứ hai gắn chặt với câu thứ nhất", right: (q, at) => { const k = Object.keys(TU_NOI_HOP).find((h) => q.q.includes(h)); assert.ok(k, at);
    q.o.forEach((o) => assert.ok(TU_NOI[thuong(o)], at + ": lựa chọn không phải từ ngữ nối: " + o)); mot(q, (o) => TU_NOI[thuong(o)] === TU_NOI_HOP[k], at); } },
  { has: "dùng từ ngữ thay thế chưa đúng", right: (q, at) => { const [c1, c2] = cauDoan(quote(q)); assert.ok(coTu(c1, "một con") && coTu(c2, "chúng"), at + ": một con vật mà dùng “chúng”");
    mot(q, (o) => o === "Thay “chúng” bằng “nó”", at); } },
  { has: "thay thế cho cả câu trước?", right: (q, at) => { const [c1, c2] = cauDoan(quote(q)), th = thayCua(c2), w = Object.keys(th)[0];
    assert.ok(w && thuong(c1).replace(/[.!?]$/, "") === thuong(th[w]) && coTu(w, "ấy"), at); bon(q).forEach((o) => assert.ok(coTu(c2, o), at)); mot(q, (o) => thuong(o) === w, at); } },
  { has: "bị nhắc lại nhiều lần", right: (q, at) => { const goc = cauDoan(quote(q, 1))[0];
    mot(q, (o) => { const cs = cauDoan(o); return cs[0] === goc && cs.slice(1).every((c) => ["vườn", "nơi ấy"].includes(CN_VUON[c])) && !coTu(o.slice(goc.length), "khu vườn nhỏ của bà ngoại"); }, at);
    q.o.forEach((o) => cauDoan(o).slice(1).forEach((c) => assert.ok(c in CN_VUON, at + ": chưa ghi chủ ngữ: " + c))); } },
  { has: "Câu nào hợp nhất để điền vào chỗ trống trong đoạn văn?", right: (q, at) => { assert.ok(/… Vì vậy,/.test(quote(q)), at); mot(q, (o) => TU_NOI[noiDau(o)] === "tuong-phan", at); } }
];
// cách nối các vế của câu ghép trong ngoặc kép ở đề bài (đọc bằng cachNoi), mỗi lựa chọn là một cách nối
const CACH_NOI = { "Một cặp kết từ": "cap-ket-tu", "Nối bằng một cặp kết từ": "cap-ket-tu", "Một cặp từ hô ứng": "ho-ung", "Nối bằng một cặp từ hô ứng": "ho-ung",
  "Một kết từ": "ket-tu", "Nối bằng một kết từ": "ket-tu", "Dấu phẩy, không có từ nối": "truc-tiep", "Nối trực tiếp, chỉ dùng dấu phẩy": "truc-tiep" };
function noiBang(q, at) {
  const k = cachNoi(quote(q)); assert.ok(k, at + ": câu trong ngoặc kép phải là câu ghép");
  q.o.forEach((o) => assert.ok(CACH_NOI[o], at + ": chưa ghi cách nối ở CACH_NOI: " + o)); mot(q, (o) => CACH_NOI[o] === k, at);
}
// từ khác nghĩa trong dãy: ba từ cùng một nhóm đồng nghĩa, từ còn lại (đáp án) ngoài nhóm đó; các lựa chọn đúng là bốn từ của dãy
function khacNghia(q, at) {
  const ds = tach(quote(q)); assert.deepEqual(ds.slice().sort(), q.o.map(thuong).sort(), at + ": lựa chọn là bốn từ của dãy");
  const g = nhomDN(q.o[1]); assert.ok(g && q.o.slice(1).every((o) => g.includes(thuong(o))), at + ": ba lựa chọn sai cùng một nhóm từ đồng nghĩa");
  mot(q, (o) => !g.includes(thuong(o)), at);
}
// từ hợp văn cảnh nhất trong nhóm đồng nghĩa
function hopDN(q, at) {
  const k = Object.keys(HOP_DN).find((h) => q.q.includes(h)); assert.ok(k, at + ": chưa ghi từ hợp văn cảnh");
  const g = nhomDN(q.o[0]); assert.ok(g && q.o.every((o) => g.includes(thuong(o))), at + ": các lựa chọn cùng một nhóm từ đồng nghĩa"); mot(q, (o) => thuong(o) === HOP_DN[k], at);
}
// câu có danh từ chung viết hoa để tỏ lòng kính trọng: đúng một lựa chọn; các từ viết hoa khác (trừ chữ đầu câu) đều là tên riêng
function vietHoaCau(q, at) {
  q.o.forEach((o) => hoaGiua(o).forEach((w) => assert.ok(TON.some((x) => x.startsWith(w)) || RIENG.includes(w), `${at}: “${w}” chưa ghi ở TON hay RIENG`)));
  mot(q, (o) => tonTrong(o).length === 1, at);
}
// sửa tên viết sai: chữ của tên trong câu (bỏ hoa thường) giống đáp án; đáp án viết đúng, các lựa chọn khác viết sai
function suaTen(q, at) {
  const c = quote(q); assert.ok(thuong(c).includes(thuong(q.o[0])), at + ": tên trong câu phải là tên của đáp án");
  mot(q, (o) => !!NN[o] && dungQT(o), at);
}
let soCau = 0;
const daKiem = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.type !== "essay" && q.topic !== "Đọc hiểu" && q.q.includes(c.has));
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

/* ---------- Đọc hiểu: chữ trích có trong đoạn đọc; câu sắp xếp đúng thứ tự trong đoạn; câu đúng/sai, câu trả lời bằng số khớp đoạn ---------- */
const gon = (s) => thuong(s).replace(/\s*\/\s*/g, " ").replace(/\s+/g, " ").trim();
kho.filter((q) => q.topic === "Đọc hiểu").forEach((q) => {
  const at = ten.get(q), text = gon(PSG[q.p].text);
  trich(q.q).concat(trich(q.x)).forEach((c) => assert.ok(text.includes(gon(c).replace(/[.]$/, "")), `${at}: chữ trích “${c}” không có trong đoạn đọc ${q.p}`));
});
const THU_TU = { "Các bạn xách giấy vụn, sách báo cũ đến trường": "xách đến trường", "Thầy phụ trách cân từng túi và ghi vào sổ": "cân từng túi",
  "Lớp 5B đổi được mười hai cây sấu non": "đổi được mười hai cây sấu non", "Cả lớp trồng cây dọc con đường vào trường": "trồng những cây sấu ấy dọc" };
kho.filter((q) => q.type === "order").forEach((q) => {
  const at = ten.get(q), text = gon(PSG[q.p].text), i = q.o.map((o) => { assert.ok(THU_TU[o], at + ": chưa ghi chỗ của sự việc ở THU_TU: " + o); return text.indexOf(gon(THU_TU[o])); });
  assert.ok(i.every((v, k) => v >= 0 && (!k || v > i[k - 1])), at + ": các sự việc không theo thứ tự trong đoạn đọc");
});
{ const tf = kho.filter((q) => q.type === "tf"); assert.ok(tf.length >= 1 && tf.every((q) => q.topic === "Đọc hiểu" && q.p), "câu đúng/sai thuộc Đọc hiểu");
  const t = tf.find((q) => /chào lớp 5C bằng tiếng Việt/.test(q.q)); assert.ok(t && t.a === true && PSG[t.p].text.includes("chào bằng tiếng Việt"), "câu đúng/sai khớp đoạn đọc"); }
{ const SO_CHU = { 5: "năm" }; kho.filter((q) => q.type === "num" && q.topic === "Đọc hiểu").forEach((q) => assert.ok(PSG[q.p].text.includes("Cứ " + SO_CHU[q.ans] + " ki-lô-gam giấy vụn"), ten.get(q) + ": số khớp đoạn đọc")); }

/* ---------- ma trận, chữ chủ đề, đoạn đọc, câu Viết ---------- */
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
const TOPIC_TEN = ["Đọc hiểu", "Đại từ", "Kết từ", "Từ đồng nghĩa", "Từ đa nghĩa", "Câu ghép", "Cách nối các vế câu ghép", "Viết hoa danh từ chung",
  "Viết tên người, tên địa lí nước ngoài", "Dấu gạch ngang", "Liên kết câu trong đoạn văn", "Viết"];
const demO = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
assert.deepEqual(TOPICS, TOPIC_TEN, "chủ đề theo thứ tự các bài Luyện từ và câu của Bài 17–29, Viết đứng cuối");
assert.deepEqual(TOPICS.map((t) => sum(M[t])), [7, 2, 1, 2, 1, 2, 1, 1, 3, 2, 2, 1], "7 câu Đọc hiểu, 17 câu Luyện từ và câu, 1 câu Viết");
TOPICS.forEach((t) => assert.ok(("chu-de:5:tv:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
{ // chủ đề ôn đúng chữ chủ đề của kho cuối kì I, giữa kì II (đề “Ôn chủ đề” rút chung câu cùng chủ đề); chủ đề mới chưa có ở kho khác
  const cd = (re) => new Set(BANKS.filter((b) => b.file === "5-tv.js" && re.test(b.id)).flatMap((b) => b.questions.map((q) => q.topic)));
  const ck1 = cd(/^tv5-ck1-/), gk2 = cd(/^tv5-gk2-/), khac = cd(/^tv5-(?!ck2-)/);
  ["Đại từ", "Kết từ", "Từ đồng nghĩa", "Từ đa nghĩa", "Dấu gạch ngang"].forEach((t) => assert.ok(ck1.has(t) && TOPICS.includes(t), "chủ đề ôn phải đúng chữ của kho cuối kì I: " + t));
  ["Câu ghép", "Cách nối các vế câu ghép", "Liên kết câu trong đoạn văn"].forEach((t) => assert.ok(gk2.has(t) && TOPICS.includes(t), "chủ đề ôn phải đúng chữ của kho giữa kì II: " + t));
  ["Viết hoa danh từ chung", "Viết tên người, tên địa lí nước ngoài"].forEach((t) => assert.ok(!khac.has(t), "chủ đề mới đã có ở kho khác: " + t));
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
// câu Viết: chỉ tự luận, 4–6 ý chấm, 5 điểm, gợi ý có ví dụ; đủ năm kiểu bài Viết của Bài 17–30
const viet = kho.filter((q) => q.topic === "Viết");
assert.ok(viet.every((q) => q.type === "essay") && kho.filter((q) => q.type === "essay").every((q) => q.topic === "Viết"), "chủ đề Viết chỉ gồm câu tự luận, tự luận chỉ ở Viết");
viet.forEach((q) => {
  assert.ok(q.rubric.length >= 4 && q.rubric.length <= 6, "câu Viết có 4–6 ý chấm: " + ten.get(q));
  assert.equal(sum(q.rubric.map((r) => r.p)), 5, "câu Viết 5 điểm như các kho Tiếng Việt 4, 5: " + ten.get(q));
  assert.ok(q.rubric.every((r) => r.p > 0 && r.p * 4 === Math.round(r.p * 4)), "điểm mỗi ý chia hết cho 0,25: " + ten.get(q));
  assert.ok(/^Gợi ý:/.test(q.x) && /\nVí dụ/.test(q.x) && q.x.length > 400, "câu Viết có gợi ý và bài mẫu: " + ten.get(q));
});
const KIEU_VIET = { "tán thành": /nêu ý kiến tán thành/, "phản đối": /nêu ý kiến phản đối/, "tình cảm, cảm xúc về một sự việc": /tình cảm, cảm xúc của bạn về /,
  "tả phong cảnh": /^Viết bài văn .*tả phong cảnh/, "tả người": /^Viết bài văn .*tả (ông|bà|một người)/ };
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
  assert.equal(new Set(q.o.map((o) => nfc(o).trim())).size, q.o.length, "lựa chọn trùng nhau (phân biệt chữ hoa: có câu hỏi cách viết tên riêng): " + ten.get(q));
  const dau = (o) => thuong(o).split(/\s+/)[0], sai = q.o.slice(1).map(dau);
  assert.ok(!(sai.length >= 3 && sai.every((d) => d === sai[0]) && dau(q.o[0]) !== sai[0]), "ba lựa chọn sai cùng mở đầu bằng “" + sai[0] + "”: " + ten.get(q));
});
// đáp án đúng là lựa chọn dài nhất hay ngắn nhất (kể cả bằng nhau) ở không quá một phần ba số câu nhiều lựa chọn
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

/* ---------- dò lộ đáp án ----------
   Như tests/tv5-gk2.js: đề ngẫu nhiên rút chung câu của các chủ đề khác, câu cùng đoạn đọc luôn đi cùng nhau, lời dặn (note) hiện ở màn mở
   đề nên cũng là “câu kia”; đề “Ôn chủ đề” rút chung mọi câu của một chủ đề trong các kho Tiếng Việt 5 (cả câu cùng chủ đề của kho cuối kì
   I, giữa kì II, kèm đoạn đọc của chúng). Đáp án (lựa chọn đúng, đáp án điền) tách thành chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì
   lấy cả đáp án); cặp nối thì câu kia có cả hai vế. Chuỗi có ở đề bài, lựa chọn đúng, đáp án, ô nối, lời giải, thang chấm hay đoạn đọc
   (khác đoạn của câu này) của câu kia thì in ra với DO_LO=1 để xem tay; danh sách đã xem ở DA_XEM. Lựa chọn sai của câu kia không tính
   (Rút ra N25). Đáp án một, hai từ (kết từ, từ ngữ nối, đại từ) là chữ thường gặp: chỉ tính khi câu kia nhắc chính từ đó trong ngoặc kép,
   hoặc câu cùng chủ đề có từ đó ở lựa chọn đúng, đáp án, ô nối, lời giải (bỏ câu ví dụ trong ngoặc kép). Cặp câu của kho khác với nhau
   không tính. */
const tu = (s) => thuong(s).replace(/[«»“”‘’"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((r) => r.c)).map(String);
const chuDung = (q) => [q.q, q.x].concat(q.type === "mc" ? [q.o[0]] : q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((r) => r.c)).map(String); // bỏ lựa chọn sai
const LOI_DAN_DE = [...new Set([S.de1, S.de2, S.pool].map((id) => bank(id).note))].map((note, i) => ({ q: note, x: "", note: true, ten: "note" + (i + 1) }));
// câu cùng chủ đề của các kho Tiếng Việt 5 khác (đề “Ôn chủ đề”), kèm đoạn đọc của kho đó
const KHAC_CD = BANKS.filter((b) => b.file === "5-tv.js" && !cua(b.id)).flatMap((b) => b.questions.filter((q) => (!b.pool || q.src === b.id) && TOPICS.includes(q.topic))
  .map((q, i) => Object.assign({}, q, { khac: true, ten: b.id.replace("tv5-", "") + "#" + (b.questions.indexOf(q) + 1), doan: q.p && b.passages && b.passages[q.p] ? b.passages[q.p].text : null })));
const tenCau = (q) => (q.note || q.khac ? q.ten : ten.get(q) || q.topic);
const doanCua = (q) => (q.khac ? q.doan : q.p ? PSG[q.p].text : null);
const CHUNG = new Set(Object.keys(R_DUNG));
const CUM_CHUNG = new Set(["nối trực tiếp", "trực tiếp không", "tiếp không dùng", "không dùng từ", "dùng từ nối", "nối bằng một", "bằng một kết",
  "một kết từ", "bằng một cặp", "một cặp kết", "cặp kết từ", "một cặp từ", "cặp từ hô", "từ hô ứng", "bằng cách lặp", "cách lặp từ", "lặp từ ngữ",
  "bằng từ ngữ", "từ ngữ nối", "từ ngữ thay", "ngữ thay thế", "dùng từ ngữ", "ngữ nối và", "nối và lặp", "và lặp từ", "chỉ dùng từ", "ngữ nối không",
  "nối không lặp", "không lặp từ", "chỉ lặp từ", "từ ngữ không", "ngữ không dùng", "hai vế có", "vế có ý", "có ý trái", "ý trái ngược", "trái ngược với",
  "ngược với nhau", "hai vế chỉ", "các vế nối", "vế nối trực", "vế nối bằng", "nối bằng cặp", "bằng cặp từ", "dấu gạch nối", "nghĩa chuyển chỉ",
  "nghĩa gốc chỉ",
  // công dụng của dấu gạch ngang (Ghi nhớ tr. 164 của tập một): mọi câu hỏi về công dụng đều có đủ các công dụng ở lựa chọn, ô nối
  "một liên danh", "thành một liên", "đánh dấu phần", "phần chú thích", "đánh dấu các", "dấu các ý", "đánh dấu chỗ", "lời nói của", "nói của nhân",
  "của nhân vật"]);
// số lựa chọn sai của câu nhiều lựa chọn có chuỗi c: chuỗi có ở từ hai lựa chọn sai không giúp chọn đáp án (như tests/soat-nhap.js)
const saiCo = (q, c) => (q.type === "mc" ? q.o.slice(1).filter((o) => (" " + tu(o).join(" ") + " ").includes(" " + c + " ")).length : 0);
const doLo = (qs, them) => {
  const ra = [];
  qs.forEach((q) => {
    if (q.khac) return; // đáp án của câu kho khác chỉ xét khi câu kia là câu của kho này (vòng của câu kho này bên dưới)
    const dap = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : [];
    const chung = q.type === "mc" && CHUNG.has(q.o[0]);
    const C = chung ? [tu(trich(q.q)[0] || q.q).join(" ")] : [...new Set(dap.flatMap(cum))].filter((c, k, a) => a.length === 1 || !CUM_CHUNG.has(c)).filter((c) => saiCo(q, c) < 2), cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const ngan = C.length === 1 && !chung && dap.length && tu(dap[0]).length <= 2 ? C[0] : null;
    qs.concat(them || []).forEach((p2) => {
      if (p2 === q) return;
      if (p2.khac && p2.topic !== q.topic) return; // câu của kho khác chỉ đi cùng câu này ở đề “Ôn chủ đề” của cùng chủ đề
      const d2 = doanCua(p2), nguon = p2.note ? [p2.q] : chuDung(p2).concat(d2 && !(p2.p && p2.p === q.p && !p2.khac) ? [d2] : []);
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
  // đáp án của câu kho khác có ở câu cùng chủ đề của kho này
  (them || []).filter((q) => q.khac).forEach((q) => {
    const dap = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : [];
    const C = [...new Set(dap.flatMap(cum))].filter((c, k, a) => a.length === 1 || !CUM_CHUNG.has(c)).filter((c) => saiCo(q, c) < 2), ngan = C.length === 1 && dap.length && tu(dap[0]).length <= 2 ? C[0] : null;
    qs.filter((p2) => p2.topic === q.topic).forEach((p2) => {
      const d2 = doanCua(p2), nguon = chuDung(p2).concat(d2 ? [d2] : []);
      if (ngan) {
        const ngoac = nguon.some((x) => [...nfc(x).matchAll(/“([^”]*)”/g)].some((m) => tu(m[1]).join(" ") === ngan));
        const cungCD = [p2.x].concat(p2.type === "mc" ? [p2.o[0]] : p2.o || [], p2.ans == null || typeof p2.ans === "number" ? [] : [].concat(p2.ans), p2.l || [], p2.r || [])
          .some((x) => (" " + tu(nfc(x).replace(/“[^”]*\s[^”]*”/g, " ")).join(" ") + " ").includes(" " + ngan + " "));
        if (ngoac || cungCD) ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${ngan}`);
        return;
      }
      const T = " " + nguon.map((s) => tu(s).join(" ")).join(" | ") + " ";
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
    });
  });
  return [...new Set(ra)];
};
const lo = doLo(kho, LOI_DAN_DE.concat(KHAC_CD));
if (process.env.DO_LO) console.log("Đáp án có ở câu khác (xem tay):\n" + lo.join("\n"));
// đã xem tay (Phiên N5-ck2-tv, 23/11/2026): không lộ đáp án thật (ghi lí do từng dòng ở mô tả Pull Request của phiên)
const DA_XEM = [];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu khác đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = kho.find((q) => q.q.includes("Tết đến, mẹ gói một hộp bánh")), b = kho.find((q) => q.q.includes("Một đàn chim sẻ"));
  assert.ok(doLo([a, Object.assign({}, b, { x: b.x + " Ví dụ: “biếu”." })]).some((s) => /: biếu$/.test(s)), "bộ dò phải bắt được đáp án một từ nhắc trong ngoặc kép ở câu khác");
  const c = kho.find((q) => q.q.includes("Ông nội Khánh từng làm công việc gì?")), d = kho.find((q) => q.q.includes("Khánh không bỏ cuộc"));
  assert.ok(doLo([c, Object.assign({}, d, { x: d.x + " Ông là nghệ sĩ đàn bầu của một đoàn nghệ thuật." })]).some((s) => /nghệ sĩ đàn/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
  const e = kho.find((q) => q.q.includes("Tớ sẽ kể cho cậu nghe")), f = KHAC_CD.find((q) => q.topic === "Đại từ");
  assert.ok(doLo([e], [Object.assign({}, f, { x: f.x + " “Tớ, cậu”." })]).some((s) => /tớ cậu$/.test(s)), "bộ dò phải bắt được đáp án có ở câu cùng chủ đề của kho khác");
}

/* ---------- câu ôn không trùng câu cùng chủ đề của kho cuối kì I, giữa kì II (lời giao việc; như tests/khtn9-ck2.js) ----------
   Câu cùng chủ đề của hai kho đó: đề bài không trùng, không chung chuỗi 6 từ (bỏ cách hỏi chuẩn ở TU_CHUNG), đáp án không trùng. */
const khongDau = (() => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = nfc(k).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim(); m.set(k, v); } return v; }; })();
const TU_CHUNG = [...TOPIC_TEN, "luyện tập về câu ghép", "luyện tập về liên kết câu trong đoạn văn", "luyện tập về đại từ và kết từ", "luyện tập về dấu gạch ngang",
  "luyện tập về từ đồng nghĩa và từ đa nghĩa", "viết hoa danh từ chung để thể hiện sự tôn trọng đặc biệt", "cách viết tên người và tên địa lí nước ngoài",
  "cụm chủ ngữ – vị ngữ", "mỗi ý sau đúng hay sai", "đọc đoạn văn", "thích hợp điền vào chỗ trống", "viết đoạn văn (khoảng", "viết bài văn (khoảng",
  "nêu ý kiến tán thành", "nêu ý kiến phản đối", "thể hiện tình cảm, cảm xúc", "tình cảm, cảm xúc của bạn về", "bài văn tả phong cảnh", "bài văn tả người",
  "câu nào dưới đây", "dấu gạch nối", "danh từ chung", "tên riêng nước ngoài", "tên riêng việt nam", "câu đơn", "câu ghép", "đại từ nghi vấn", "đại từ xưng hô",
  "cặp kết từ nối các vế trong câu", "cặp từ hô ứng", "từ ngữ nối", "từ ngữ thay thế", "nghĩa gốc", "nghĩa chuyển", "cộng hoà xã hội chủ nghĩa việt nam",
  "độc lập – tự do – hạnh phúc"]
  .map((x) => " " + khongDau(x) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((x) => { while (t.includes(x)) t = t.replace(x, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|")) ra.push(c.join(" ")); } return ra; };
{
  const cuOn = KHAC_CD.filter((q) => q.topic !== "Đọc hiểu" && q.topic !== "Viết");
  const ra = [];
  kho.filter((q) => cuOn.some((x) => x.topic === q.topic)).forEach((q) => cuOn.filter((x) => x.topic === q.topic).forEach((x) => {
    if (goc(q.q) === goc(x.q)) ra.push(`${ten.get(q)} = ${x.ten}: đề bài trùng`);
    const c6 = new Set(chuoi(x.q, 6)); chuoi(q.q, 6).filter((c) => c6.has(c)).slice(0, 1).forEach((c) => ra.push(`${ten.get(q)} ~ ${x.ten}: chuỗi 6 từ của đề bài “${c}”`));
    const da = (y) => (y.type === "mc" ? goc(y.o[0]) : y.type === "fill" ? goc(y.ans[0]) : null);
    if (da(q) && da(q) === da(x)) ra.push(`${ten.get(q)} = ${x.ten}: đáp án trùng`);
  }));
  assert.deepEqual(ra, [], "câu ôn trùng câu cùng chủ đề của kho cuối kì I, giữa kì II");
}

/* ---------- không gần trùng câu của kho Tiếng Việt 4 và các kho Tiếng Việt 5 khác (như tests/tv5-gk2.js) ----------
   Đề bài cùng lựa chọn, ô nối, ô sắp xếp có từ 4 cặp hai âm tiết liền nhau chung với một câu của các kho đó và số cặp chung từ một nửa số
   cặp của câu ít cặp hơn thì báo. Bỏ cách hỏi chung (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của các kho đem so. */
const CUM = ["mỗi ý sau đúng hay sai", "chọn từ thích hợp nhất điền vào chỗ trống", "chọn từ thích hợp điền vào chỗ trống", "thích hợp điền vào chỗ trống",
  "dòng nào dưới đây gồm toàn", "đọc đoạn văn", "đọc câu", "trong câu", "từ nào là", "câu đơn", "câu ghép", "vế câu", "cặp kết từ", "cặp từ hô ứng",
  "từ ngữ nối", "từ ngữ thay thế", "lặp từ ngữ", "liên kết", "câu thứ nhất", "câu thứ hai", "chủ ngữ", "vị ngữ", "dấu gạch ngang", "dấu gạch nối",
  "đại từ", "kết từ", "nghĩa gốc", "nghĩa chuyển", "tên riêng nước ngoài", "câu nào dưới đây",
  // công dụng của dấu gạch ngang (Ghi nhớ tr. 164 của tập một; câu về công dụng của kho Tiếng Việt 4 cũng dùng các cụm này)
  "nối các từ ngữ trong một liên danh", "nối các tên trong một liên danh", "đánh dấu chỗ bắt đầu lời nói của nhân vật", "đánh dấu lời nói của nhân vật",
  "đánh dấu các ý được liệt kê", "đánh dấu các ý liệt kê", "đánh dấu phần chú thích, giải thích", "đánh dấu phần giải thích"];
{
  const cap2 = (s) => { let t = thuong(s); CUM.map(thuong).forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const cauCua = (ok) => BANKS.filter(ok).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => Object.assign({ id: b.id }, q)));
  const cu = cauCua((b) => b.file === "4-tv.js" || (b.file === "5-tv.js" && !cua(b.id))), ca = cu.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const P = cu.map((x) => [x, capAm(x)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return P.map(([x, d]) => { const chung = [...c].filter((y) => d.has(y)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${x.id}: ${x.q.slice(0, 60)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Tiếng Việt 4, Tiếng Việt 5 khác:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Tiếng Việt 4 hay kho Tiếng Việt 5 khác");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (cả đoạn đọc, thang chấm, lời dặn) không có trong sách; cụm từ chung (TU_CHUNG: tên chủ đề, tên
   bài Luyện từ và câu, tên kiểu bài Viết, thuật ngữ, cách hỏi chuẩn) thay bằng dấu ngăn trước khi so. */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
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
const truong = (q) => chu(q).concat(q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].title, PSG[q.p].text] : []);
if (SACH.length) {
  assert.ok(SACH.some((f) => /tieng-viet-5-tap-1/.test(f)) && SACH.some((f) => /tieng-viet-5-tap-2/.test(f)), "OnUp-Book có Tiếng Việt 5 hai tập");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  LOI_DAN_DE.forEach((n) => assert.deepEqual(chuoi(n.q, 8).filter((c) => traChu.co(sach, c)), [], "lời dặn có chuỗi 8 từ trùng sách"));
  // tên riêng nước ngoài: không dùng tên trong bảng tra cứu tên riêng nước ngoài của sách (tr. 159), tên của bài tập về tên nước ngoài (tr. 123–124)
  const SACH_TEN = ["Hi-ma-lay-a", "Bu-tan", "Nê-pan", "Pa-ki-xtan", "Ê-vơ-rét", "Ét-mun", "Hi-la-ri", "Niu Di-lân", "Ten-ding", "No-gay", "Ép-phen", "Pa-ri",
    "A-na-tôn", "Phrăng-xơ", "Gu-xta-vơ", "Mát-xđa", "Xít-ni", "Ô-xtrây-li-a", "Bét-tô-ven", "Đa-nuýp", "Hi-rô-si-ma", "Na-ga-xa-ki", "Tan-da-ni-a", "Ngô-rông-gô-rô"];
  kho.forEach((q) => SACH_TEN.forEach((t) => assert.ok(!chu(q).concat(q.p ? [PSG[q.p].text] : []).some((s) => nfc(s).includes(t)), `${ten.get(q)}: dùng tên riêng của sách “${t}”`)));
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả các kho Tiếng Việt 5 và câu riêng của
   các đề ngẫu nhiên ---------- */
{
  const cauKhac = (b, q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const khac = BANKS.filter((b) => !b.pool && !cua(b.id)).flatMap((b) => b.questions.map((q) => cauKhac(b, q)))
    .concat(BANKS.filter((b) => b.pool && !cua(b.id)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cauKhac(b, q))));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(soCau + " câu Luyện từ và câu đã đọc lại đáp án; kho " + kho.length + " câu (" + d1.n + " + " + d2.n + " câu của hai đề cố định, " + rieng.length + " câu riêng), "
  + Object.keys(PSG).length + " đoạn đọc, " + viet.length + " câu Viết, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("TV5 CK2 OK");
