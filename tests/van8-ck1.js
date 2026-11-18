// Kiểm tra ngân hàng Ngữ văn 8 cuối kì I của Phiên N8-ck1-van (data/banks/8-van.js, van8-ck1-*), theo mẫu tests/van7-ck1.js.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho
// lớp 8 (đoạn “Chung của các phiên lớp 8” ở nhóm lớp 8 cuối kì I, mục 7 của docs/KE-HOACH-NOI-DUNG.md).
// Thơ Đường luật người soạn viết (sáu bài trong đoạn đọc của Bài 2, Bài 4 và hai bài tứ tuyệt trong đề bài câu Viết; THO): số câu (bát
// cú 8, tứ tuyệt 4), bảy tiếng mỗi câu, luật bằng hay trắc tính từ chữ thứ hai câu 1, tiếng 2, 4, 6 mỗi câu theo luật (câu 1, 4, 5, 8 của
// luật bằng là B T B, câu 2, 3, 6, 7 là T B T; luật trắc ngược lại), niêm (chữ thứ hai câu 2 – 3, 4 – 5, 6 – 7, 8 – 1 cùng thanh; tứ tuyệt:
// 2 – 3, 4 – 1), một vần bằng ở cuối câu 1, 2, 4, 6, 8 (tứ tuyệt 1, 2, 4), các tiếng vần khác nhau, câu không vần tận cùng thanh trắc;
// đối ở hai câu thực, hai câu luận của bài bát cú (bảng DOI: từng cặp vế cùng số tiếng, tiếng cuối hai vế ngược thanh); nhịp 4/3 (bảng
// NHIP khớp từng chữ của bài).
// Tính lại đáp án (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho): thể thơ, luật, niêm, đối, vần, nhịp của các bài
// thơ; câu tiếng Việt theo bảng ghi trong script: biệt ngữ xã hội (BIET_NGU), từ ngữ địa phương (DIA_PHUONG), từ tượng hình, từ tượng thanh
// (TUONG_HINH, TUONG_THANH), đảo ngữ (DAO: chủ ngữ, vị ngữ của câu, có đảo hay không), kiểu đoạn văn (DOAN: vị trí câu mang ý khái quát,
// kiểu đoạn tính bằng code), từ, thành ngữ Hán Việt (HAN_VIET), sắc thái nghĩa (SAC_THAI), câu hỏi tu từ (TU_TU); chi tiết của câu mức Biết
// có trong đoạn đọc (CHI_TIET). Chữ trích trong «» của câu có đoạn đọc (đề bài, lời giải, ý của câu đúng/sai) phải có trong đoạn đọc.
// Rồi kiểm tra ma trận, đoạn đọc (mỗi chủ đề đọc hiểu một đoạn mỗi đề, đoạn 3 câu mức 1-2-3), câu Viết (chỉ tự luận, 4–6 ý chấm, cùng
// tổng điểm, đủ năm kiểu bài Viết của Bài 1–5), dạng câu (đúng/sai 4 ý không lặp kiểu Đ/S, có câu trả lời ngắn), đáp án đúng không dài hơn
// hẳn lựa chọn sai, là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không là lựa chọn duy nhất có chữ của
// nhãn chủ đề; đề bài không trùng câu nào trong file; không gần trùng câu của kho Ngữ văn 7, Ngữ văn 9 (7-van.js, 9-van.js), đoạn đọc
// không dùng lại câu văn nào của hai kho đó; không hỏi văn bản của sách (tên văn bản ở mục lục Ngữ văn 8 tập một); rút thử nhiều lần
// (đúng ma trận, trọn đoạn, gặp đủ kho; đã làm hết một đề cố định thì không rút lại câu của đề đó); dò lộ đáp án giữa mọi cặp câu của kho
// (đề ngẫu nhiên rút chung câu khác chủ đề, đề “Ôn chủ đề” rút chung câu cùng chủ đề) và lời dặn: chuỗi 3 từ liền nhau của đáp án có ở câu
// kia; DO_LO=1 in ra để xem tay, danh sách đã xem ở DA_XEM.
// Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ (cả đoạn đọc, thang chấm) với chữ OCR của mọi cuốn (có Ngữ văn 8 hai
// tập) sau khi bỏ dấu, gộp nguyên âm, gộp tên riêng ở GOP thành một từ, bỏ câu trích ở TRICH: không có chuỗi 8 từ liền nhau trùng sách;
// DO_SACH=1 in cả chuỗi 6 từ. So thêm với mọi câu của các kho khác: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ và câu gần trùng.
// Chạy: node tests/van8-ck1.js → in VAN8 OK.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, EVENTS = ctx.window.ONTAP_SEED_EVENTS;
const S = { de1: "van8-ck1-de1", de2: "van8-ck1-de2", pool: "van8-ck1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- tiếng, thanh, vần ---------- */
const TRAC = /[̣́̉̃]/; // sắc, hỏi, ngã, nặng
const tieng = (s) => String(s).normalize("NFC").replace(/[«»“”"(),.;:!?…–—]/g, " ").split(/\s+/).filter(Boolean);
const thanh = (t) => (TRAC.test(t.normalize("NFD")) ? "T" : "B");
const khongThanh = (t) => t.normalize("NFD").replace(/[̣̀́̉̃]/g, "").normalize("NFC").toLowerCase();
// vần: bỏ dấu thanh (giữ mũ, trăng, móc), bỏ phụ âm đầu (“gi”, “qu” tính là phụ âm đầu)
const PAD = /^(ngh|ng|gh|gi|kh|ph|th|tr|ch|nh|qu|b|c|d|đ|g|h|k|l|m|n|p|r|s|t|v|x)(?=[aăâeêioôơuưy])/;
const van = (t) => khongThanh(t).replace(PAD, "");
const dongTho = (text) => String(text).split("\n").map((l) => l.trim()).filter(Boolean);
const cuoi = (l) => tieng(l).slice(-1)[0];

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 8); assert.equal(b.subject, "Ngữ văn"); assert.equal(b.file, "8-van.js");
  assert.ok(!/Sở|đề chung/.test(b.note), b.id + ": lớp 8 không thuộc Thông tư 89/2026, lời dặn không nói đề chung của Sở");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
assert.ok(rieng.length >= d1.n + d2.n - 10, "đề ngẫu nhiên có khoảng 50 câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("van8-ck1-", "") + "#" + (i + 1))));
const cau = (has) => { const m = kho.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };
// lịch thi: ba mã gắn vào kì cuối kì I lớp 8
{
  const e = EVENTS.find((x) => x.id === "ck1-l8");
  assert.ok(e && e.grades.includes(8), "có kì thi ck1-l8 của khối 8");
  [S.de1, S.de2, S.pool].forEach((id) => assert.ok(e.banks.includes(id), "ck1-l8 gắn " + id));
  assert.ok(/Ngữ văn: Bài 1–5\./.test(e.scope), "phạm vi của ck1-l8 ghi Ngữ văn Bài 1–5");
}
// không hỏi văn bản của sách: tên văn bản ở mục lục Ngữ văn 8 tập một không có trong câu, đoạn đọc nào
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], (q.rubric || []).map((r) => r.c)).map(String);
{
  const VB_SACH = ["Lá cờ thêu sáu chữ vàng", "Quang Trung đại phá quân Thanh", "Ta đi tới", "Minh sư", "Thu điếu", "Thiên Trường vãn vọng", "Ca Huế trên sông Hương",
    "Qua Đèo Ngang", "Hịch tướng sĩ", "Tinh thần yêu nước của nhân dân ta", "Nam quốc sơn hà", "Chiếu dời đô", "Lễ xướng danh khoa Đinh Dậu", "Lai Tân",
    "Một số giọng điệu của tiếng cười", "Vịnh cây vông", "Trưởng giả học làm sang", "Giá không có ruồi"];
  const tat = kho.flatMap(chu).concat(Object.values(PSG).flatMap((x) => [x.title, x.text])).join(" | ").toLowerCase();
  VB_SACH.forEach((v) => assert.ok(!tat.includes(v.toLowerCase()), "không hỏi văn bản của sách: «" + v + "»"));
}

/* ---------- thơ Đường luật: số câu, số tiếng, luật, niêm, vần, đối, nhịp ---------- */
const trongDe = (has, re) => { const m = re.exec(cau(has).q); assert.ok(m, "đề bài có bài thơ: " + has); return m[1].split(" / ").join("\n"); };
const THO = { // mã: chữ của bài, số câu
  "som-que": { nguon: () => PSG["som-que"].text, cau: 8 },
  "con-ve": { nguon: () => PSG["con-ve"].text, cau: 4 },
  "chua-nui": { nguon: () => PSG["chua-nui"].text, cau: 8 },
  "ngam-thac": { nguon: () => PSG["ngam-thac"].text, cau: 4 },
  "hay-hua": { nguon: () => PSG["hay-hua"].text, cau: 8 },
  "than-met": { nguon: () => PSG["than-met"].text, cau: 4 },
  "ngam-sen": { nguon: () => trongDe("«Ngắm sen»", /: «(Hồ sen[^»]+)»$/), cau: 4 },
  "hoc-vet": { nguon: () => trongDe("«Học vẹt»", /: «(Văn mẫu[^»]+)»$/), cau: 4 }
};
const dongCua = (id) => dongTho(THO[id].nguon());
const LUAT = { B: ["BTB", "TBT", "TBT", "BTB", "BTB", "TBT", "TBT", "BTB"], T: ["TBT", "BTB", "BTB", "TBT", "TBT", "BTB", "BTB", "TBT"] };
const luatCua = (id) => thanh(tieng(dongCua(id)[0])[1]); // "B": luật bằng, "T": luật trắc
const cauVan = (id) => (THO[id].cau === 8 ? [0, 1, 3, 5, 7] : [0, 1, 3]);
const tiengVan = (id) => cauVan(id).map((i) => cuoi(dongCua(id)[i]));
// đối ở hai câu thực (3 – 4), hai câu luận (5 – 6) của bài bát cú: các vế của câu trên, các vế tương ứng của câu dưới
const DOI = {
  "som-que": [[["Ruộng lúa", "đương thì", "xanh mướt mắt"], ["Vườn hoa", "mới nở", "ngát mùi hương"]], [["Trâu già", "thong thả", "ra đồng cỏ"], ["Trẻ nhỏ", "tung tăng", "đến mái trường"]]],
  "chua-nui": [[["Hồi chuông", "chầm chậm", "lan sườn núi"], ["Làn khói", "mơ màng", "quyện bóng mây"]], [["Mái ngói", "trăm năm", "rêu phủ kín"], ["Sân chùa", "bao độ", "lá rơi đầy"]]],
  "hay-hua": [[["Đèn bàn", "hẹn sửa", "đèn còn tắt"], ["Áo rách", "nhận khâu", "áo hở vai"]], [["Nước chậu", "hứa thay", "rêu đã mọc"], ["Cây hoa", "hẹn tưới", "lá vàng phai"]]]
};
// ngắt nhịp từng câu (dấu “ | ” giữa hai vế)
const NHIP = {
  "som-que": ["Làng quê buổi sớm | phủ hơi sương,", "Gà gáy xa xa | vọng cuối đường.", "Ruộng lúa đương thì | xanh mướt mắt,", "Vườn hoa mới nở | ngát mùi hương.",
    "Trâu già thong thả | ra đồng cỏ,", "Trẻ nhỏ tung tăng | đến mái trường.", "Đứng ngắm quê nhà | lòng rộn rã,", "Mai này xa xứ | dạ còn vương."],
  "con-ve": ["Lất phất mưa xuân | rắc khắp đồng,", "Cành đào chúm chím | nụ khoe hồng.", "Bên thềm mẹ đứng | trông ra ngõ,", "Đón bước con về, | dạ ấm nồng."],
  "chua-nui": ["Bậc đá cheo leo | dẫn tới đây,", "Chùa xưa ẩn hiện | giữa rừng cây.", "Hồi chuông chầm chậm | lan sườn núi,", "Làn khói mơ màng | quyện bóng mây.",
    "Mái ngói trăm năm | rêu phủ kín,", "Sân chùa bao độ | lá rơi đầy.", "Lòng người phút chốc | thêm thanh tịnh,", "Bước chậm ra về, | dạ ngất ngây."],
  "ngam-thac": ["Non cao thác bạc | đẹp như tranh,", "Cậu ấm leo lên | chẳng ngó quanh.", "Điện thoại giơ cao | xoay đủ kiểu,", "Ảnh về chỉ thấy | mỗi mình anh."],
  "hay-hua": ["Hứa hẹn xưa nay | chẳng kém ai,", "Việc gì cũng bảo: | «Để ngày mai».", "Đèn bàn hẹn sửa, | đèn còn tắt,", "Áo rách nhận khâu, | áo hở vai.",
    "Nước chậu hứa thay, | rêu đã mọc,", "Cây hoa hẹn tưới, | lá vàng phai.", "Hôm nay ai hỏi: | «Xong chưa nhỉ?»,", "Cậu bảo: «Ngày kìa, | chắc chẳng sai»."],
  "than-met": ["Nắng đã ba sào | ngập khắp trời,", "Chàng ta ôm gối | ngủ chưa rời.", "Trưa trờ thức dậy | than rằng mệt:", "Bởi trót đêm qua | mộng đổi đời."],
  "ngam-sen": ["Hồ sen tháng sáu | ngát hương bay,", "Lá biếc hoa hồng | thắm cả ngày.", "Gió thoảng mặt hồ | khua sóng nhẹ,", "Ngồi bên lặng ngắm | thấy lòng say."],
  "hoc-vet": ["Văn mẫu đêm nào | cũng thuộc làu,", "Đọc lên vanh vách | trước như sau.", "Khi thầy hỏi ý: | “Sao như thế?”,", "Lại đọc một lèo, | đọc thật mau."]
};
const nhipCua = (id) => NHIP[id].map((x) => x.split(" | ").map((s) => tieng(s).length).join("/"));
Object.entries(THO).forEach(([id, t]) => {
  const l = dongCua(id), w = l.map(tieng), luat = luatCua(id);
  assert.equal(l.length, t.cau, `${id}: ${t.cau} câu`);
  w.forEach((x, i) => assert.equal(x.length, 7, `${id}, câu ${i + 1} («${l[i]}»): bảy tiếng`));
  w.forEach((x, i) => assert.equal([1, 3, 5].map((k) => thanh(x[k])).join(""), LUAT[luat][i], `${id}, câu ${i + 1}: tiếng 2, 4, 6 theo luật ${luat === "B" ? "bằng" : "trắc"}`));
  const niem = t.cau === 8 ? [[1, 2], [3, 4], [5, 6], [7, 0]] : [[1, 2], [3, 0]];
  niem.forEach(([a, b]) => assert.equal(thanh(w[a][1]), thanh(w[b][1]), `${id}: niêm câu ${a + 1} – câu ${b + 1}`));
  const v = tiengVan(id);
  assert.equal(new Set(v.map(van)).size, 1, `${id}: một vần ở cuối câu ${cauVan(id).map((i) => i + 1).join(", ")} (${v.join(", ")})`);
  assert.ok(v.every((x) => thanh(x) === "B"), `${id}: vần bằng (${v.join(", ")})`);
  assert.equal(new Set(v.map((x) => x.toLowerCase())).size, v.length, `${id}: các tiếng vần khác nhau`);
  l.forEach((x, i) => { if (!cauVan(id).includes(i)) assert.equal(thanh(cuoi(x)), "T", `${id}, câu ${i + 1}: câu không vần tận cùng thanh trắc`); });
  if (t.cau === 8) {
    assert.ok(DOI[id], id + ": chưa ghi đối ở DOI");
    DOI[id].forEach(([tren, duoi], k) => {
      const [a, b] = [2 + 2 * k, 3 + 2 * k], at = `${id}, câu ${a + 1} – ${b + 1}`;
      assert.equal(tieng(tren.join(" ")).join(" "), w[a].join(" "), at + ": bảng DOI khớp câu trên");
      assert.equal(tieng(duoi.join(" ")).join(" "), w[b].join(" "), at + ": bảng DOI khớp câu dưới");
      tren.forEach((x, j) => {
        assert.equal(tieng(x).length, tieng(duoi[j]).length, `${at}: vế «${x}» – «${duoi[j]}» cùng số tiếng`);
        assert.notEqual(thanh(cuoi(x)), thanh(cuoi(duoi[j])), `${at}: vế «${x}» – «${duoi[j]}» ngược thanh ở tiếng cuối`);
      });
    });
  }
  assert.ok(NHIP[id], id + ": chưa ghi nhịp ở NHIP");
  assert.deepEqual(NHIP[id].map((x) => x.replace(" | ", " ")), l, id + ": bảng NHIP khớp từng câu của bài");
  nhipCua(id).forEach((k, i) => assert.equal(k, "4/3", `${id}, câu ${i + 1}: nhịp 4/3`));
});
// đoạn đọc toàn câu bảy tiếng (bài thơ) thì phải có trong THO
Object.entries(PSG).filter(([, ps]) => dongTho(ps.text).every((x) => tieng(x).length === 7)).forEach(([id]) => assert.ok(THO[id], "bài thơ " + id + " chưa có ở THO"));
const THE = { 8: "Thất ngôn bát cú Đường luật", 4: "Thất ngôn tứ tuyệt Đường luật" };
const doiCo = (id, a, b) => DOI[id].some(([tren, duoi]) => tren.some((x, j) => x === a && duoi[j] === b));

/* ---------- bảng tiếng Việt ---------- */
const chuThuong = (s) => String(s).replace(/_/g, " ").normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const coCum = (s, c) => (" " + chuThuong(s) + " ").includes(" " + chuThuong(c) + " ");
const trich = (q) => /«([^»]+)»/.exec(q.q)[1];
const motCai = (ds, at) => { assert.equal(ds.length, 1, at + ": đúng một lựa chọn đạt, có " + ds.length); return ds[0]; };
// biệt ngữ xã hội: biệt ngữ → nhóm người dùng
const BIET_NGU = { "ôm ngỗng": "học sinh", "phao": "học sinh", "cuốc": "người lái xe chở khách", "chốt đơn": "người mua bán hàng qua mạng" };
const bietNgu = (s) => Object.keys(BIET_NGU).filter((w) => coCum(s, w));
// từ ngữ địa phương → từ ngữ toàn dân
const DIA_PHUONG = { "bắp": "ngô", "tía": "bố", "tui": "tôi", "o": "cô", "mô": "đâu", "heo": "lợn", "bông": "hoa", "chén": "bát", "trái": "quả", "ghe": "thuyền",
  "mắc": "đắt", "bữa nay": "hôm nay", "mạ": "mẹ" };
const diaPhuong = (s) => Object.keys(DIA_PHUONG).filter((w) => coCum(s, w));
// từ tượng thanh, từ tượng hình
const TUONG_THANH = ["xào xạc", "ríu rít", "loảng xoảng", "leng keng", "tí tách", "róc rách", "xì xào", "oang oang", "chiêm chiếp"];
const TUONG_HINH = ["khẳng khiu", "ngoằn ngoèo", "lò dò", "thoăn thoắt", "lúp xúp", "lon ton"];
// đảo ngữ: câu → { cn: chủ ngữ, vn: vị ngữ, dao: vị ngữ đứng trước chủ ngữ }
const DAO = {
  "Xanh ngắt một màu đồng lúa non.": { cn: "đồng lúa non", vn: "xanh ngắt một màu", dao: true },
  "Lấp ló sau rặng tre những mái nhà tranh.": { cn: "những mái nhà tranh", vn: "lấp ló sau rặng tre", dao: true },
  "Những mái nhà tranh lấp ló sau rặng tre.": { cn: "những mái nhà tranh", vn: "lấp ló sau rặng tre", dao: false },
  "Sau rặng tre, những mái nhà tranh lấp ló.": { cn: "những mái nhà tranh", vn: "lấp ló", dao: false },
  "Mái nhà tranh nào cũng lấp ló sau rặng tre.": { cn: "mái nhà tranh nào", vn: "cũng lấp ló sau rặng tre", dao: false },
  "Rộn ràng tiếng trống trường ngày khai giảng.": { cn: "tiếng trống trường ngày khai giảng", vn: "rộn ràng", dao: true },
  "Dập dờn cánh bướm vườn xuân": { cn: "cánh bướm", vn: "dập dờn", dao: true },
  "Vàng rực cả triền đồi hoa dã quỳ.": { cn: "hoa dã quỳ", vn: "vàng rực cả triền đồi", dao: true },
  "Trên cành cao, đôi chim chích choè hót vang.": { cn: "đôi chim chích choè", vn: "hót vang", dao: false },
  "Lững lờ trôi trên bầu trời những đám mây trắng.": { cn: "những đám mây trắng", vn: "lững lờ trôi trên bầu trời", dao: true },
  "Thấp thoáng bóng thuyền nơi cuối bãi.": { cn: "bóng thuyền", vn: "thấp thoáng", dao: true },
  "Rì rào tiếng sóng vỗ ven bờ.": { cn: "tiếng sóng vỗ ven bờ", vn: "rì rào", dao: true }
};
Object.entries(DAO).forEach(([c, d]) => {
  const k = chuThuong(c), i = k.indexOf(chuThuong(d.cn)), j = k.indexOf(chuThuong(d.vn));
  assert.ok(i >= 0 && j >= 0, "bảng DAO khớp chữ của câu: " + c);
  assert.equal(j < i, d.dao, "bảng DAO: vị ngữ đứng trước chủ ngữ khi và chỉ khi có đảo ngữ: " + c);
});
const daoCua = (s) => { const d = DAO[s]; assert.ok(d, "câu chưa có ở DAO: " + s); return d; };
// kiểu đoạn văn: đoạn (nhận ra bằng chữ đầu) → các câu mang ý khái quát; kiểu đoạn tính từ vị trí các câu ấy
const DOAN = { "(1) Đọc sách mang lại": [1], "(1) Mỗi sáng, bác lao công": [4], "(1) Mùa xuân, cả xóm": [], "(1) Tiết kiệm nước": [1, 5], "(1) Bạn Hà đến lớp sớm": [4],
  "(1) Chiếc xe đạp cũ": [1] };
const soCau = (q) => (q.q.match(/\(\d\)/g) || []).length;
const kieuDoan = (q) => {
  const k = Object.keys(DOAN).filter((x) => q.q.includes(x)); assert.equal(k.length, 1, ten.get(q) + ": đoạn văn có ở DOAN");
  const v = DOAN[k[0]], n = soCau(q);
  return !v.length ? "Song song" : v.length === 2 && v[0] === 1 && v[1] === n ? "Phối hợp" : v[0] === 1 ? "Diễn dịch" : v[0] === n ? "Quy nạp" : null;
};
// từ, thành ngữ Hán Việt
const THANH_NGU = { "tiến thoái lưỡng nan": "Tiến lên hay lùi lại đều khó khăn", "khẩu phật tâm xà": "Ngoài miệng nói lời hiền lành, trong lòng thâm hiểm" };
const DONG = { "đồng hương": "cùng", "nhi đồng": "trẻ em", "thần đồng": "trẻ em", "đồng ruộng": "từ thuần Việt" }; // nghĩa của «đồng» trong từ
const BAT = { "bất khuất": "không chịu khuất phục", "bất tiện": "không thuận tiện", "bất ngờ": "không ngờ tới", "bất đắc dĩ": "không muốn mà phải làm" };
const YEU_TO = { nguyệt: "mặt trăng", nhật: "mặt trời", thực: "ăn, khuyết dần" };
// sắc thái nghĩa: từ ngữ → sắc thái
const SAC_THAI = { "kính mời": "trang trọng", "rủ rê": "xấu", "gọi": "thân mật", "bảo": "thân mật", "keo kiệt": "xấu", "tiết kiệm": "tốt", "giản dị": "tốt",
  "tằn tiện": "tốt", "kiên cường": "tốt", "ngoan cố": "xấu", "liều lĩnh": "xấu", "bướng bỉnh": "xấu", "tự phụ": "xấu", "tự tin": "tốt", "tự hào": "tốt",
  "tự giác": "tốt", "mảnh mai": "tốt", "gầy nhom": "xấu", "gầy đét": "xấu", "gầy gò": "xấu", "tớ": "thân mật", "kính gửi": "trang trọng", "căn cứ": "trang trọng",
  "thưa ngài": "trang trọng" };
const sacThai = (s) => Object.keys(SAC_THAI).filter((w) => coCum(s, w)).map((w) => SAC_THAI[w]);
// câu hỏi tu từ (câu không dùng để hỏi) và câu hỏi thật
const TU_TU = ["Ai mà chẳng nhớ nơi mình sinh ra và lớn lên?", "Canh chua mẹ nấu thì làm sao con chê được?", "Dòng sông quê ấy, ai mà quên được?",
  "Có ai lại không thương mẹ mình?"];
const HOI_THAT = ["Mấy giờ thì chuyến tàu này rời ga hả bác?", "Bạn đã làm xong bài tập về nhà chưa?", "Thư viện trường mình mở cửa vào những ngày nào trong tuần?",
  "Con có muốn ăn thêm bát nữa không?", "Chuyến xe về quê mấy giờ thì chạy?", "Mẹ đi chợ đã về chưa hả chị?", "Chiều nay ai sẽ trực nhật lớp mình?",
  "Ngày mai lớp mình học mấy tiết?", "Nhà bạn ở phố nào?", "Chuyến xe buýt số 9 bao giờ thì đến?"];
const tuTu = (s) => { assert.ok(TU_TU.includes(s) !== HOI_THAT.includes(s), "câu hỏi phải có ở đúng một bảng TU_TU, HOI_THAT: " + s); return TU_TU.includes(s); };

/* ---------- đáp án tính lại bằng code ---------- */
const noiDung = (q, i) => q.a[i]; // ý về nội dung, cảm xúc: đọc tay
const yTf = (q, y) => q.o.map((o, i) => { const f = y.filter(([re]) => re.test(o)); assert.equal(f.length, 1, "ý cần đúng một cách tính: " + o); return !!f[0][1](q, i); });
const CHECKS = [
  // thơ Đường luật: thể thơ, luật, niêm, đối, vần, nhịp
  { id: S.de1, has: "bạn xếp bài thơ «Buổi sớm quê nhà» vào thể thơ nào", right: () => THE[dongCua("som-que").length] },
  { id: S.de1, has: "Xét luật thơ và cảm xúc của bài «Buổi sớm quê nhà»", right: (q) => yTf(q, [
    [/^Chữ thứ hai của câu 1 \(«quê»\) mang thanh bằng, nên bài thơ làm theo luật bằng/, () => tieng(dongCua("som-que")[0])[1] === "quê" && luatCua("som-que") === "B"],
    [/gieo vần trắc ở cuối các câu 1, 2, 4, 6, 8/, () => tiengVan("som-que").every((t) => thanh(t) === "T")],
    [/Hai câu luận đối nhau: «Trâu già» – «Trẻ nhỏ», «thong thả» – «tung tăng»/, () => doiCo("som-que", "Trâu già", "Trẻ nhỏ") && doiCo("som-que", "thong thả", "tung tăng")],
    [/chán cảnh quê/, noiDung]]) },
  { id: S.de2, has: "trong bài «Ngày con về» thường ngắt nhịp", right: (q) => {
    const dau = NHIP["con-ve"][0].replace(/[,.]$/, "").replace(" | ", " / ");
    assert.ok(nhipCua("con-ve").every((k) => k === "4/3"), "con-ve: mọi câu nhịp 4/3");
    return motCai(q.o.filter((o) => o === "Nhịp 4/3, như «" + dau + "»"), "nhịp 4/3 của câu 1"); } },
  { id: S.pool, has: "hiệp vần với nhau trong bài «Thăm chùa núi»", right: () => tiengVan("chua-nui").join(", ") },
  { id: S.pool, has: "Mỗi ý sau về luật và cảm xúc của bài «Thăm chùa núi»", right: (q) => yTf(q, [
    [/^Bài thơ theo luật bằng, vì chữ thứ hai của câu 1 là «đá»/, () => tieng(dongCua("chua-nui")[0])[1] === "đá" && luatCua("chua-nui") === "B"],
    [/^Câu 2 và câu 3 niêm với nhau: chữ thứ hai \(«xưa», «chuông»\) cùng thanh bằng/, () => { const w = dongCua("chua-nui").map(tieng); return w[1][1] === "xưa" && w[2][1] === "chuông" && thanh(w[1][1]) === "B" && thanh(w[2][1]) === "B"; }],
    [/Hai câu luận đối nhau: «Mái ngói» – «Sân chùa», «trăm năm» – «bao độ»/, () => doiCo("chua-nui", "Mái ngói", "Sân chùa") && doiCo("chua-nui", "trăm năm", "bao độ")],
    [/^Hai câu kết cho thấy/, noiDung]]) },
  { id: S.de1, has: "Mỗi ý sau về nghệ thuật trào phúng của bài «Đi ngắm thác»", right: (q) => yTf(q, [
    [/phép tương phản/, noiDung],
    [/đả kích gay gắt/, noiDung],
    [/Ba tiếng «tranh», «quanh», «anh» ở cuối câu 1, 2, 4 hiệp vần/, () => tiengVan("ngam-thac").join(",") === "tranh,quanh,anh" && new Set(tiengVan("ngam-thac").map(van)).size === 1],
    [/^Câu thứ ba chuyển sang/, (q2, i) => /^Điện thoại giơ cao xoay đủ kiểu/.test(dongCua("ngam-thac")[2]) && noiDung(q2, i)]]) },
  { id: S.pool, has: "Mỗi ý sau về bài thơ trào phúng «Than mệt»", right: (q) => yTf(q, [
    [/chỉ gieo vần ở cuối câu thứ nhất và câu thứ ba/, () => { const l = dongCua("than-met"); return van(cuoi(l[0])) === van(cuoi(l[2])) && van(cuoi(l[1])) !== van(cuoi(l[0])); }],
    [/ngợi ca, trân trọng/, noiDung],
    [/Cụm từ «trưa trờ»/, (q2, i) => /^Trưa trờ /.test(dongCua("than-met")[2]) && noiDung(q2, i)],
    [/phê phán thói lười biếng/, noiDung]]) },
  { id: S.pool, has: "Theo bài thơ, «chàng ta» thức dậy vào lúc nào", right: () => "Lúc " + tieng(dongCua("than-met")[2]).slice(0, 2).join(" ").toLowerCase() },
  { id: S.pool, has: "bài thơ tứ tuyệt Đường luật «Ngắm sen»", right: (q) => {
    const r = q.rubric.map((x) => x.c).join(" "), v = tiengVan("ngam-sen");
    assert.ok(r.includes("luật " + (luatCua("ngam-sen") === "B" ? "bằng" : "trắc")) && r.includes("vần «" + van(v[0]) + "» ở câu 1, 2, 4"), "thang chấm nêu đúng luật và vần của «Ngắm sen»");
    assert.ok(q.x.includes(v.map((t) => "«" + t + "»").join(", ")), "dàn ý nêu đúng các tiếng vần: " + v.join(", "));
    return null; } },
  { id: S.pool, has: "phân tích bài thơ trào phúng «Học vẹt»", right: (q) => {
    const v = tiengVan("hoc-vet");
    assert.ok(q.x.includes("vần " + v.map((t) => "«" + t + "»").join(", ")), "dàn ý nêu đúng các tiếng vần: " + v.join(", "));
    return null; } },
  // biệt ngữ xã hội
  { id: S.de1, has: "nào dưới đây có dùng biệt ngữ xã hội", right: (q) => motCai(q.o.filter((o) => bietNgu(o).length), "câu có biệt ngữ") },
  { id: S.de2, has: "từ «phao» là biệt ngữ xã hội", right: (q) => { assert.equal(BIET_NGU.phao, "học sinh"); assert.ok(/học sinh/.test(q.q)); return motCai(q.o.filter((o) => /phòng thi/.test(o)), "nghĩa của «phao» trong giới học sinh"); } },
  { id: S.pool, has: "biệt ngữ xã hội của những người lái xe chở khách", right: (q) => { const w = motCai(bietNgu(trich(q)), "biệt ngữ trong câu"); assert.equal(BIET_NGU[w], "người lái xe chở khách"); return w; } },
  { id: S.pool, has: "có biệt ngữ «chốt đơn»", right: () => "Những " + BIET_NGU["chốt đơn"] },
  // từ ngữ địa phương
  { id: S.de1, has: "Từ ngữ toàn dân tương ứng với «bắp» là", right: () => DIA_PHUONG["bắp"] },
  { id: S.de2, has: "có các từ ngữ địa phương nào", right: (q) => tieng(trich(q).toLowerCase()).filter((t) => DIA_PHUONG[t]).join(", ") },
  { id: S.pool, has: "con lợn được gọi bằng từ ngữ địa phương nào", right: (q) => { q.o.forEach((o) => assert.ok(DIA_PHUONG[o], "phương án ở DIA_PHUONG: " + o)); return motCai(q.o.filter((o) => DIA_PHUONG[o] === "lợn"), "«lợn»"); } },
  { id: S.pool, has: "nào dưới đây có dùng từ ngữ địa phương", right: (q) => motCai(q.o.filter((o) => diaPhuong(o).length), "câu có từ ngữ địa phương") },
  { id: S.pool, has: "từ ngữ địa phương «mắc» có nghĩa là gì", right: () => DIA_PHUONG["mắc"] },
  // từ tượng hình, từ tượng thanh
  { id: S.de1, has: "Lá khô bay xào xạc", right: (q) => { q.o.forEach((o) => assert.ok(coCum(trich(q), o), "phương án có trong câu: " + o)); return motCai(q.o.filter((o) => TUONG_THANH.includes(o)), "từ tượng thanh"); } },
  { id: S.de2, has: "Từ nào dưới đây là từ tượng hình", right: (q) => { q.o.forEach((o) => assert.ok(TUONG_HINH.includes(o) || TUONG_THANH.includes(o), "phương án ở bảng: " + o)); return motCai(q.o.filter((o) => TUONG_HINH.includes(o)), "từ tượng hình"); } },
  { id: S.pool, has: "Bếp lửa reo tí tách", right: (q) => motCai(TUONG_THANH.filter((w) => coCum(trich(q), w)), "từ tượng thanh trong câu") },
  { id: S.pool, has: "chỉ gồm các từ tượng thanh", right: (q) => motCai(q.o.filter((o) => o.split(", ").every((w) => TUONG_THANH.includes(w))), "dòng toàn từ tượng thanh") },
  { id: S.pool, has: "Đàn gà con lon ton", right: (q) => { q.o.forEach((o) => assert.ok(coCum(trich(q), o), "phương án có trong câu: " + o)); return motCai(q.o.filter((o) => TUONG_HINH.includes(o)), "từ tượng hình"); } },
  // đảo ngữ
  { id: S.de1, has: "«Xanh ngắt một màu đồng lúa non.»", right: (q) => { assert.ok(daoCua(trich(q)).dao); return null; } },
  { id: S.de2, has: "nào dưới đây dùng biện pháp tu từ đảo ngữ", right: (q) => motCai(q.o.filter((o) => daoCua(o).dao), "câu đảo ngữ") },
  { id: S.pool, has: "Viết lại theo trật tự thông thường", right: (q) => { const d = daoCua(trich(q)); assert.ok(d.dao); const c = d.cn + " " + d.vn + "."; return c[0].toUpperCase() + c.slice(1); } },
  { id: S.pool, has: "«Dập dờn cánh bướm vườn xuân»", right: (q) => { assert.ok(daoCua(trich(q)).dao); return null; } },
  { id: S.pool, has: "«Vàng rực cả triền đồi hoa dã quỳ.»", right: (q) => { const d = daoCua(trich(q)); return yTf(q, [
    [/^Câu đưa vị ngữ «([^»]+)» lên trước chủ ngữ «([^»]+)»/, (q2, i) => { const m = /«([^»]+)» lên trước chủ ngữ «([^»]+)»/.exec(q2.o[i]); return d.dao && m[1] === d.vn && m[2] === d.cn; }],
    [/^Câu không dùng đảo ngữ/, () => !d.dao],
    [/số lượng hoa dã quỳ rất ít ỏi/, noiDung],
    [/không nên dùng trong văn miêu tả/, noiDung]]); } },
  { id: S.pool, has: "KHÔNG dùng đảo ngữ", right: (q) => motCai(q.o.filter((o) => !daoCua(o).dao), "câu không đảo ngữ") },
  // kiểu đoạn văn
  { id: S.de1, has: "(1) Đọc sách mang lại", right: (q) => motCai(q.o.filter((o) => o.startsWith(kieuDoan(q) + ", câu (" + DOAN["(1) Đọc sách mang lại"][0] + ")")), "kiểu đoạn, câu chủ đề") },
  { id: S.de2, has: "(1) Mỗi sáng, bác lao công", right: (q) => { assert.equal(kieuDoan(q), "Quy nạp"); assert.equal(DOAN["(1) Mỗi sáng, bác lao công"][0], soCau(q)); return motCai(q.o.filter((o) => /^Quy nạp: .*câu cuối$/.test(o)), "quy nạp, ý chung ở câu cuối"); } },
  { id: S.pool, has: "(1) Mùa xuân, cả xóm", right: (q) => motCai(q.o.filter((o) => o.startsWith(kieuDoan(q) + ", không câu nào")), "song song") },
  { id: S.pool, has: "(1) Tiết kiệm nước", right: (q) => { const v = DOAN["(1) Tiết kiệm nước"]; return motCai(q.o.filter((o) => o === `${kieuDoan(q)}, câu (${v[0]}) và câu (${v[1]}) cùng nêu ý khái quát`), "phối hợp"); } },
  { id: S.pool, has: "(1) Bạn Hà đến lớp sớm", right: (q) => { assert.equal(kieuDoan(q), "Quy nạp"); return motCai(q.o.filter((o) => o.startsWith("Đưa ý của câu (" + DOAN["(1) Bạn Hà đến lớp sớm"][0] + ") lên đầu đoạn")), "đưa câu khái quát lên đầu"); } },
  { id: S.pool, has: "(1) Chiếc xe đạp cũ", right: (q) => { assert.equal(kieuDoan(q), "Diễn dịch"); return motCai(q.o.filter((o) => o.startsWith("Câu (" + DOAN["(1) Chiếc xe đạp cũ"][0] + ")")), "câu chủ đề"); } },
  // từ, thành ngữ Hán Việt
  { id: S.de1, has: "«tiến thoái lưỡng nan» có nghĩa là gì", right: () => THANH_NGU["tiến thoái lưỡng nan"] },
  { id: S.de2, has: "Yếu tố «đồng» trong từ nào", right: (q) => { q.o.forEach((o) => assert.ok(DONG[o], "phương án ở DONG: " + o)); return motCai(q.o.filter((o) => DONG[o] === "cùng"), "«đồng» nghĩa là cùng"); } },
  { id: S.pool, has: "«khẩu phật tâm xà» dùng để chỉ", right: () => THANH_NGU["khẩu phật tâm xà"] },
  { id: S.pool, has: "mặt trời bị che khuất là", right: (q) => { assert.ok(q.q.includes("«nguyệt» (" + YEU_TO.nguyệt + ")") && q.q.includes("«thực» (" + YEU_TO.thực + ")")); return Object.keys(YEU_TO).find((k) => YEU_TO[k] === "mặt trời") + " thực"; } },
  { id: S.pool, has: "mang nghĩa «không chịu khuất phục»", right: (q) => { q.o.forEach((o) => assert.ok(BAT[o], "phương án ở BAT: " + o)); return motCai(q.o.filter((o) => BAT[o] === "không chịu khuất phục"), "bất khuất"); } },
  // sắc thái nghĩa
  { id: S.de1, has: "thầy cô và các bạn đến dự đêm văn nghệ", right: (q) => { q.o.forEach((o) => assert.ok(SAC_THAI[o], "phương án ở SAC_THAI: " + o)); return motCai(q.o.filter((o) => SAC_THAI[o] === "trang trọng"), "lời mời trang trọng"); } },
  { id: S.de2, has: "dùng từ chưa phù hợp với sắc thái nghĩa", right: (q) => motCai(q.o.filter((o) => sacThai(o).includes("xấu") && /quý|khen/.test(o)), "từ xấu nghĩa đi với ý khen") },
  { id: S.pool, has: "bày tỏ được sự ngợi ca", right: (q) => { q.o.forEach((o) => assert.ok(SAC_THAI[o], "phương án ở SAC_THAI: " + o)); return motCai(q.o.filter((o) => SAC_THAI[o] === "tốt"), "từ tốt nghĩa"); } },
  { id: S.pool, has: "Trong thư gửi một người bạn thân", right: (q) => motCai(q.o.filter((o) => sacThai(o).includes("thân mật") && !sacThai(o).includes("trang trọng")), "câu thân mật") },
  { id: S.pool, has: "phù hợp nhất với ý chê", right: (q) => { q.o.forEach((o) => assert.ok(SAC_THAI[o], "phương án ở SAC_THAI: " + o)); return motCai(q.o.filter((o) => SAC_THAI[o] === "xấu"), "từ xấu nghĩa"); } },
  { id: S.pool, has: "Để tả một bạn gầy mà vẫn thể hiện thiện cảm", right: (q) => { q.o.forEach((o) => assert.equal(sacThai(o).length, 1, "mỗi phương án đúng một từ ở SAC_THAI: " + o)); return motCai(q.o.filter((o) => sacThai(o)[0] === "tốt"), "từ tốt nghĩa"); } },
  // câu hỏi tu từ
  { id: S.de1, has: "Ai mà chẳng nhớ", right: (q) => motCai(q.o.filter(tuTu), "câu hỏi tu từ"), o: true },
  { id: S.de2, has: "Canh chua mẹ nấu", right: (q) => { const c = [...q.q.matchAll(/— ([^—»]+\?)/g)].map((m) => m[1].trim()); assert.equal(c.length, 2); return motCai(c.filter(tuTu), "câu hỏi tu từ trong hội thoại"); } },
  { id: S.pool, has: "không nhằm hỏi mà dùng để khẳng định", right: (q) => motCai(q.o.filter(tuTu), "câu hỏi tu từ") },
  { id: S.pool, has: "Mỗi ý sau về các câu (người soạn viết) dưới đây", right: (q) => q.o.map((o) => { const m = /^«([^»]+)» là câu hỏi tu từ\.$/.exec(o); assert.ok(m, "ý dạng «…» là câu hỏi tu từ."); return tuTu(m[1]); }) }
];
// câu nào cũng có ở CHECKS thì mới tính lại được; các câu de1 «Ai mà chẳng nhớ» và pool «Dòng sông quê» cùng đề bài nên nhận ra theo đáp án
let n = 0;
CHECKS.forEach((c) => {
  const q = c.o ? (() => { const m = kho.filter((x) => x.o && x.o.includes(x.o.find((o) => o.startsWith(c.has)))); assert.equal(m.length, 1, c.has); return m[0]; })() : cau(c.has);
  const at = c.id + ": " + c.has, want = c.right(q);
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  n++;
  if (want === null) return;
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  if (Array.isArray(want)) assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  else assert.equal(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
});
// chi tiết của câu mức Biết về đoạn đọc: cụm then chốt của đáp án có trong đoạn đọc
const CHI_TIET = [["vì sao viên trung sứ", "trị tội"], ["Nguyễn Huệ chọn khúc sông nào", "Rạch Gầm xuống Xoài Mút"], ["Trần Bình Trọng nhận nhiệm vụ gì", "không đuổi kịp hai vua"],
  ["anh Tư là người có tính xấu gì", "khoác lác"], ["ông Thái khẳng định chiếc bình", "gần nghìn năm tuổi"], ["Lão Phú trong truyện có thói xấu gì", "từng giọt dầu"],
  ["thói xấu bị phê phán trong bài thơ là gì", "Để ngày mai"], ["Đoạn (2) của văn bản nêu luận điểm nào", "biết cội nguồn"]];
CHI_TIET.forEach(([has, c]) => {
  const q = kho.find((x) => x.q.toLowerCase().includes(has.toLowerCase())); assert.ok(q && q.p, "câu chi tiết: " + has);
  assert.ok(coCum(PSG[q.p].text, c), `${ten.get(q)}: đoạn đọc có «${c}»`);
  assert.ok(coCum(q.o[0], c) || coCum(q.x, c), `${ten.get(q)}: đáp án hay lời giải dựa vào «${c}»`);
  n++;
});
// chữ trích trong «» của câu có đoạn đọc (đề bài, lời giải, ý của câu đúng/sai) có trong đoạn đọc (hay tên đoạn đọc)
// chữ trích không lấy từ đoạn đọc mà đúng: tên phong trào, chiến dịch nêu trong lời giải; vần của bài thơ
const NGOAI_DOAN = [];
{
  const thieu = [];
  kho.filter((q) => q.p).forEach((q) => {
    const T = " " + chuThuong(PSG[q.p].title + " " + PSG[q.p].text) + " ";
    [q.q, q.x].concat(q.type === "tf4" ? q.o : []).forEach((s) => [...String(s).matchAll(/«([^»]+)»/g)].forEach((m) => {
      // « / » ngăn hai câu thơ; «ây»: vần của một tiếng trong đoạn
      const c = m[1].replace(/ \/ /g, " ");
      const laVan = /^\S+$/.test(c) && tieng(PSG[q.p].text).some((t) => van(t) === khongThanh(c));
      if (!T.includes(" " + chuThuong(c) + " ") && !laVan && !NGOAI_DOAN.includes(`${ten.get(q)}: «${c}»`)) thieu.push(`${ten.get(q)}: «${c}»`);
    }));
  });
  assert.deepEqual(thieu, [], "chữ trích không có trong đoạn đọc");
}

/* ---------- ma trận, đoạn đọc, câu Viết ---------- */
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
assert.equal(TOPICS[TOPICS.length - 1], "Viết", "chủ đề Viết đứng cuối ma trận");
[d1.questions, d2.questions].forEach((d, i) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, `Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = dem(kho, t, l);
  assert.ok(v[l - 1] ? o >= 2 * v[l - 1] : o === 0, `ô (${t}, mức ${l}) rút ${v[l - 1]} câu, kho có ${o}`);
}));
// năm chủ đề đọc hiểu theo tên Bài 1–5: mỗi đề cố định và phần câu riêng có đúng một đoạn mỗi chủ đề, đoạn 3 câu mức 1-2-3
const docHieu = TOPICS.filter((t) => kho.some((q) => q.topic === t && q.p));
assert.deepEqual(docHieu, ["Câu chuyện của lịch sử", "Vẻ đẹp cổ điển", "Lời sông núi", "Tiếng cười trào phúng trong thơ", "Những câu chuyện hài"], "năm chủ đề đọc hiểu theo tên Bài 1–5");
docHieu.forEach((t) => {
  assert.ok(kho.filter((q) => q.topic === t).every((q) => q.p), t + ": mọi câu có đoạn đọc");
  assert.deepEqual(M[t], [1, 1, 1], t + ": ma trận [1, 1, 1]");
  [S.de1, S.de2, S.pool].forEach((id) => {
    const qs = kho.filter((q) => q.topic === t && q.src === id), ps = [...new Set(qs.map((q) => q.p))];
    assert.equal(ps.length, 1, `${id}, ${t}: đúng một đoạn`);
    assert.deepEqual(qs.map((q) => q.lv), [1, 2, 3], `${id}, ${t}: đoạn 3 câu mức 1-2-3`);
  });
});
Object.keys(PSG).forEach((id) => assert.equal(kho.filter((q) => q.p === id).length, 3, "đoạn " + id + " có 3 câu"));
// thể loại của đoạn đọc theo bài: truyện lịch sử, thơ Đường luật, văn bản nghị luận, thơ trào phúng Đường luật, truyện cười hay hài kịch
{
  const LOAI = { "Câu chuyện của lịch sử": /\(truyện lịch sử người soạn viết\)$/, "Vẻ đẹp cổ điển": /\(thơ người soạn viết\)$/, "Lời sông núi": /\(văn bản nghị luận người soạn viết\)$/,
    "Tiếng cười trào phúng trong thơ": /\(thơ trào phúng người soạn viết\)$/, "Những câu chuyện hài": /\((truyện cười|cảnh hài kịch) người soạn viết\)$/ };
  docHieu.forEach((t) => [...new Set(kho.filter((q) => q.topic === t).map((q) => q.p))].forEach((id) => assert.ok(LOAI[t].test(PSG[id].title), `${t}: đoạn ${id} ghi đúng thể loại`)));
  ["Vẻ đẹp cổ điển", "Tiếng cười trào phúng trong thơ"].forEach((t) => kho.filter((q) => q.topic === t).forEach((q) => assert.ok(THO[q.p], `${t}: đoạn ${q.p} là thơ Đường luật đã kiểm luật`)));
  assert.ok(kho.some((q) => q.topic === "Những câu chuyện hài" && /hài kịch/.test(PSG[q.p].title)) && kho.some((q) => q.topic === "Những câu chuyện hài" && /truyện cười/.test(PSG[q.p].title)), "Bài 5 có cả hài kịch và truyện cười");
}
assert.ok(kho.filter((q) => !q.p).every((q) => !docHieu.includes(q.topic)), "câu không có đoạn đọc chỉ ở Tiếng Việt, Viết");
const viet = kho.filter((q) => q.topic === "Viết");
assert.ok(viet.every((q) => q.type === "essay" && !q.p) && kho.filter((q) => q.type === "essay").every((q) => q.topic === "Viết"), "chủ đề Viết chỉ gồm câu tự luận không gắn đoạn đọc, tự luận chỉ ở Viết");
viet.forEach((q) => {
  assert.ok(q.rubric.length >= 4 && q.rubric.length <= 6, "câu Viết có 4–6 ý chấm: " + ten.get(q));
  assert.equal(sum(q.rubric.map((r) => r.p)), sum(viet[0].rubric.map((r) => r.p)), "các câu Viết cùng tổng điểm: " + ten.get(q));
  assert.ok(/^Dàn ý gợi ý/.test(q.x) && q.x.length > 300, "câu Viết có dàn ý gợi ý: " + ten.get(q));
});
// năm kiểu bài Viết của Bài 1–5 đều có
[["kể lại chuyến tham quan di tích", [/kể lại/i, /di tích/]], ["phân tích bài thơ Đường luật", [/phân tích bài thơ (tứ tuyệt|thất ngôn bát cú)? ?Đường luật/i]],
  ["nghị luận về con người với cộng đồng, đất nước", [/nghị luận/, /cộng đồng|đất nước/]], ["phân tích bài thơ trào phúng", [/phân tích bài thơ trào phúng/i]],
  ["nghị luận về một thói xấu", [/nghị luận/, /thói (xấu|đổ lỗi|lười|ỷ lại)/]]]
  .forEach(([k, re]) => assert.ok(viet.some((q) => re.every((r) => r.test(q.q))), "thiếu kiểu bài Viết: " + k));

/* ---------- dạng câu, lựa chọn ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 4, "mỗi kho ít nhất 4 câu đúng/sai 4 ý");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
assert.ok(kho.some((q) => q.type === "fill"), "có câu trả lời ngắn (điền)");
assert.ok(kho.every((q) => ["mc", "tf4", "fill", "essay"].includes(q.type)), "chỉ dùng dạng câu của khung Công văn 7991 và tự luận");
// gọi người làm bài là «bạn» (trừ lời dẫn trong ngoặc kép), lời giải không nói “ý thứ hai”, “phương án A” (app xáo ý, phương án)
kho.forEach((q) => assert.ok(!/(của em|(?<![Cc]ác )em hãy|Em hãy|theo em|Theo em|em chọn)\b/.test([q.q, q.x].concat(q.o || [], (q.rubric || []).map((r) => r.c)).join(" ").replace(/«[^»]*»|“[^”]*”/g, "")), "gọi người làm bài là «bạn»: " + ten.get(q)));
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn|đáp án) (thứ|số) (nhất|hai|ba|tư|\d)|(phương án|đáp án) [A-D]\b/i.test([q.x].concat(q.o || []).join(" ")), "nhắc vị trí của ý, phương án: " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai; các lựa chọn không trùng nhau; ba lựa chọn sai không cùng mở đầu một chữ mà đáp án thì không
const mcs = kho.filter((q) => q.type === "mc");
mcs.forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length)), dau = q.o.map((o) => o.split(" ")[0]);
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + ten.get(q));
  assert.ok(!(q.o.length >= 4 && dau.slice(1).every((x) => x === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu một chữ: " + ten.get(q));
});
// đáp án đúng là lựa chọn dài nhất hay ngắn nhất (hơn hẳn mọi lựa chọn sai): mỗi kiểu không quá một phần ba, cả hai kiểu cộng lại từ một
// phần sáu số câu nhiều lựa chọn (để người làm không đoán theo độ dài)
{
  const khac = mcs.filter((q) => new Set(q.o.map((o) => o.length)).size > 1), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  const dai = khac.filter((q) => hon(q, (a, b) => a > b)).length, ngan = khac.filter((q) => hon(q, (a, b) => a < b)).length;
  assert.ok(3 * dai <= khac.length, `đáp án là lựa chọn dài nhất ở ${dai}/${khac.length} câu nhiều lựa chọn`);
  assert.ok(3 * ngan <= khac.length, `đáp án là lựa chọn ngắn nhất ở ${ngan}/${khac.length} câu nhiều lựa chọn`);
  assert.ok(6 * (dai + ngan) >= khac.length, `đáp án là lựa chọn dài nhất hay ngắn nhất chỉ ở ${dai + ngan}/${khac.length} câu`);
}
// đáp án không là lựa chọn duy nhất có chữ (cặp hai chữ) của nhãn chủ đề, như tests/soat-nhap.js
mcs.forEach((q) => {
  const c = chuThuong(q.topic).split(" ");
  const tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|lên|giữa|từ|đến|năm|nay|sau)( |$)/u.test(w));
  tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o) + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `${ten.get(q)}: chỉ đáp án có chữ “${w}” của nhãn chủ đề`); });
});

/* ---------- đề bài không trùng câu nào khác trong file ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "8-van.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: gocChu(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- không gần trùng kho Ngữ văn 7, Ngữ văn 9 (data/banks/7-van.js, 9-van.js) ----------
   Đề bài cùng lựa chọn có từ 4 cặp từ liền nhau chung với một câu của hai kho đó và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì
   báo; bỏ cách hỏi chung (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của ba file. Đoạn đọc không có câu văn (từ 5 từ) nào có
   trong đoạn đọc, câu hỏi của hai kho đó. */
{
  const CUM = ["người soạn viết", "mỗi ý sau đúng hay sai", "mỗi nhận xét sau", "đúng hay sai", "câu nào dưới đây", "dưới đây", "có tác dụng gì", "trong câu",
    "từ ngữ địa phương", "biệt ngữ xã hội", "câu hỏi tu từ", "đảo ngữ", "theo văn bản", "theo bạn", "bài thơ", "văn bản", "người viết", "nhân vật", "đoạn văn"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const fileKhac = BANKS.filter((b) => b.file === "7-van.js" || b.file === "9-van.js");
  assert.ok(fileKhac.some((b) => b.file === "7-van.js") && fileKhac.some((b) => b.file === "9-van.js"), "có kho Ngữ văn 7, Ngữ văn 9");
  const cu = fileKhac.flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), ca = cu.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const PC = cu.map((x) => [x, capAm(x)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return PC.map(([x, d]) => { const chung = [...c].filter((y) => d.has(y)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${x.q.slice(0, 60)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Ngữ văn 7, 9:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Ngữ văn 7, 9");
  const chuCu = " " + fileKhac.flatMap((b) => Object.values(b.passages || {}).map((x) => (x.title || "") + " | " + (x.text || "")).concat(b.questions.flatMap(chu))).map(chuThuong).join(" | ") + " ";
  Object.entries(PSG).forEach(([id, ps]) => String(ps.text).split(/(?<=[.!?…])\s+|\n+/).map(chuThuong).filter((c) => c.split(" ").length >= 5)
    .forEach((c) => assert.ok(!chuCu.includes(" " + c + " "), `đoạn ${id} dùng lại câu văn của kho Ngữ văn 7, 9: ${c}`)));
}

/* ---------- rút thử ---------- */
const seen = new Set();
for (let k = 0; k < 400; k++) {
  const d = Quiz.draw(p);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, p.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  docHieu.forEach((t) => assert.equal(new Set(d.questions.filter((q) => q.topic === t).map((q) => q.p)).size, 1, t + ": rút trọn một đoạn"));
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.equal(seen.size, kho.length, "400 lần rút thử phải gặp đủ câu của kho");
// học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên không rút lại câu của đề đó
[S.de1, S.de2].forEach((lam) => {
  const hist = (q) => (q.src === lam ? { done: 1, wrong: 0 } : null);
  for (let k = 0; k < 30; k++) {
    const d = Quiz.draw(p, hist);
    assert.equal(d.notes.length, 0); assert.equal(d.questions.length, p.n);
    assert.ok(d.questions.every((q) => q.src !== lam), `đã làm hết ${lam} thì không rút lại câu của đề đó`);
  }
});

/* ---------- dò lộ đáp án giữa hai câu hiện cùng lúc ----------
   Mọi cặp câu của kho: đề ngẫu nhiên rút chung câu khác chủ đề, đề “Ôn chủ đề” rút chung câu cùng chủ đề (chủ đề dưới 10 câu thì cả
   chủ đề); thêm lời dặn của ba đề (hiện ở màn mở đề). Đáp án (lựa chọn đúng, đáp án điền) tách thành các chuỗi 3 từ liền nhau (đáp án
   từ 3 từ trở xuống thì lấy cả đáp án; bỏ chuỗi có ở từ hai lựa chọn sai), như tests/soat-nhap.js; chuỗi có trong đề bài, lựa chọn,
   lời giải, đáp án, thang chấm hay đoạn đọc (khác đoạn của câu này) của câu kia thì in ra với DO_LO=1 để xem tay; đã xem ở DA_XEM. */
const tuDL = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/[\]{}]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tuDL(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const dapAn = (q) => {
  if (q.type === "mc") { const sai = q.o.slice(1).map((o) => " " + tuDL(o).join(" ") + " "); return [...new Set(cum(q.o[0]))].filter((c) => sai.filter((o) => o.includes(" " + c + " ")).length < 2); }
  if (q.type === "fill") return [...new Set(q.ans.map((a) => tuDL(a).join(" ")).filter(Boolean))];
  return [];
};
const LOI_DAN = [d1, d2, p].map((b) => ({ ten: b.id.replace("van8-ck1-", "") + " lời dặn", loi: b.note }));
const doLo = (qs, tenCau, notes) => {
  const ra = [];
  qs.forEach((a) => {
    const C = dapAn(a);
    if (!C.length) return;
    qs.concat(notes || []).forEach((b) => {
      if (b === a) return;
      const T = " " + (b.loi ? [b.loi] : chu(b).concat(b.p && b.p !== a.p ? [PSG[b.p].title + " " + PSG[b.p].text] : [])).map((s) => tuDL(s).join(" ")).join(" | ") + " ";
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${b.loi ? b.ten : tenCau(b)} → ${tenCau(a)}: ${c}`));
    });
  });
  return [...new Set(ra)];
};
const lo = doLo(kho, (q) => ten.get(q), LOI_DAN);
if (process.env.DO_LO) console.log("Đáp án có ở câu hiện cùng lúc (xem tay):\n" + lo.map((s) => "  " + JSON.stringify(s) + ",").join("\n"));
// đã xem tay: chuỗi chung, câu kia không cho biết đáp án (lựa chọn sai, đoạn đọc khác nói chuyện khác)
const DA_XEM = [
  "de2#23 → ngau-nhien#29: không câu nào",
  "de2#6 → ngau-nhien#42: bộc lộ tình",
  "de2#6 → ngau-nhien#42: lộ tình cảm",
  "ngau-nhien#6 → de1#20: câu 1 là",
  "ngau-nhien#7 → de2#10: việc gì cũng",
  "ngau-nhien#8 → de2#10: việc gì cũng",
  "ngau-nhien#9 → de2#10: việc gì cũng",
  "ngau-nhien#13 → de2#10: chẳng chịu làm",
  "ngau-nhien#33 → de2#10: việc gì cũng",
  "de1#21 → de2#10: việc gì cũng"
];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu hiện cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = cau("Từ ngữ toàn dân tương ứng với «bắp» là"), b = cau("có các từ ngữ địa phương nào");
  const gia = Object.assign({}, b, { x: b.x + " Ở Nam Bộ, «bắp» là cây ngô." });
  assert.ok(doLo([a, gia], (q) => (q === a ? "A" : "B")).includes("B → A: ngô"), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// câu trích nguyên văn được phép trùng sách: lời của nhân vật lịch sử, ca dao, lời Bác Hồ dùng làm bằng chứng
const TRICH = ["Ta thà làm quỷ nước Nam chứ không thèm làm vương đất Bắc", "Một cây làm chẳng nên non / Ba cây chụm lại nên hòn núi cao",
  "Đoàn kết, đoàn kết, đại đoàn kết, / Thành công, thành công, đại thành công", "Dân ta phải biết sử ta, / Cho tường gốc tích nước nhà Việt Nam"];
// tên riêng nhiều chữ: gộp thành một từ trước khi so
const GOP = ["Văn Miếu – Quốc Tử Giám", "Địa đạo Củ Chi", "Trần Khánh Dư", "Trần Bình Trọng", "Nguyễn Huệ", "Trương Văn Hổ", "Rạch Gầm", "Xoài Mút", "Thiên Mạc",
  "Bảo Nghĩa vương"];
// cụm chữ chung (cách hỏi chung của đề Ngữ văn, tên chủ đề theo tên bài và mục Thực hành tiếng Việt của sách): thay bằng dấu ngăn trước khi so
const TU_CHUNG = ["người soạn viết", "mỗi ý sau đúng hay sai", "mỗi nhận xét sau", "nào dưới đây", "trong câu", "có tác dụng gì", "nhằm điều gì",
  "Câu chuyện của lịch sử", "Vẻ đẹp cổ điển", "Lời sông núi", "Tiếng cười trào phúng trong thơ", "Những câu chuyện hài", "Biệt ngữ xã hội", "Từ ngữ địa phương",
  "Từ tượng hình, từ tượng thanh", "Đoạn văn diễn dịch, quy nạp, song song, phối hợp", "Từ, thành ngữ Hán Việt", "Sắc thái nghĩa của từ ngữ", "Câu hỏi tu từ",
  "Nghĩa tường minh và nghĩa hàm ẩn", "thất ngôn bát cú Đường luật", "thất ngôn tứ tuyệt Đường luật"];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ: băm mọi chuỗi k từ của chữ đã chuẩn hoá (một lần cho mỗi chữ, mỗi k), chỉ so thật (includes) khi băm có
const traChu = (() => {
  const bam = (w, k) => {
    const A = new Uint32Array(w.length), B = new Uint32Array(w.length), m = Math.max(0, w.length - k + 1), H = new Float64Array(m);
    for (let i = 0; i < w.length; i++) { let a = 0x811c9dc5, b = 0x1b873593; const t = w[i]; for (let j = 0; j < t.length; j++) { const x = t.charCodeAt(j); a = Math.imul(a ^ x, 0x01000193); b = Math.imul(b ^ x, 0x5bd1e995); } A[i] = a; B[i] = b; }
    for (let i = 0; i < m; i++) { let a = 0x9e3779b9, b = 0x85ebca6b; for (let j = i; j < i + k; j++) { a = Math.imul(a ^ A[j], 0x01000193); b = Math.imul(b ^ B[j], 0x5bd1e995); } H[i] = (a >>> 0) * 2097152 + (b >>> 11); }
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
const boDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP_ = GOP.map(boDau).sort((a, b) => b.length - a.length), TU_CHUNG_ = TU_CHUNG.map((c) => " " + boDau(c) + " ").sort((a, b) => b.length - a.length);
const TRICH_ = TRICH.map((c) => " " + boDau(c) + " ");
// bỏ dấu, bỏ câu trích, thay cụm chung bằng dấu ngăn, gộp tên riêng nhiều chữ thành một từ, gộp nguyên âm (chữ OCR hay đọc sai dấu, nguyên âm)
const khongDau = nhoChuoi((s) => {
  let t = " " + boDau(String(s).normalize("NFC")) + " ";
  TRICH_.forEach((c) => { t = t.split(c).join(" | "); });
  TRICH.forEach(() => {}); // TRICH.forEach: tests/soat-nhap.js đọc danh sách này
  TU_CHUNG_.forEach((c) => { while (t.includes(c)) t = t.replace(c, " | "); });
  GOP_.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); });
  return t.replace(/[aeiouy]+/g, "a").replace(/\s+/g, " ").trim();
});
// chuỗi k từ (không qua dấu ngăn), ít nhất 5 từ có chữ cái
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const truong = (q) => chu(q).concat(q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].title, PSG[q.p].text] : []);
if (SACH.length) {
  assert.ok(SACH.some((f) => /ngu-van-8-tap-1/.test(f)) && SACH.some((f) => /ngu-van-8-tap-2/.test(f)), "OnUp-Book có Ngữ văn 8 hai tập");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác: chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác (cả câu riêng của đề ngẫu nhiên) ---------- */
{
  const khac = BANKS.filter((b) => !/^van8-ck1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)
    .map((q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn đọc, "
  + Object.keys(THO).length + " bài thơ Đường luật đã kiểm luật, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề.");
console.log("VAN8 OK");
