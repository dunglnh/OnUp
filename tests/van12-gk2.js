// Kiểm tra ngân hàng Ngữ văn 12 giữa kì II của Phiên N12-gk2-van (data/banks/12-van.js, van12-gk2-*), theo mẫu tests/van12-ck1.js,
// tests/van9-gk2.js. Kho = Đề 1 + Đề 2 (đề ngẫu nhiên không có câu riêng). Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận
// 10 – 8 – 7 của kho lớp 12 (đoạn “Chung của các phiên lớp 12” của docs/KE-HOACH-NOI-DUNG.md).
// Đọc lại bằng code: phần phiên âm của hai bài thơ chữ Hán (bốn câu bảy chữ mỗi bài), bản dịch thơ «Đi đường» (lục bát: số tiếng, bằng
// trắc, vần lục – bát, bát – lục), rồi tính lại đáp án các câu về thể thơ, việc lặp «tẩu lộ», các mốc của cảnh (đêm, bình minh), và các
// câu hỏi chi tiết, các câu tiếng Việt nhận ra một biện pháp, một kiểu ngôn ngữ (CHECKS: nhận câu bằng một đoạn chữ của đề, đúng một câu
// trong kho; đáp án phải khớp chữ của đoạn đọc, của câu ví dụ; chỉ một lựa chọn có dấu hiệu của biện pháp được hỏi).
// Rồi kiểm tra ma trận, đoạn đọc (mỗi chủ đề đọc hiểu hai đoạn mỗi đề cố định, đoạn 3 câu mức 1-2-3), câu Viết (chỉ tự luận, tự chấm,
// tổng 4 điểm như câu bài văn của đề tốt nghiệp, hai kiểu bài Viết của Bài 6, 7), note (nhắc trường đã học Bài 8; không có câu về đề
// chung của Sở), dạng câu (ít nhất 6 câu đúng/sai 4 ý không lặp kiểu Đ/S, có câu trả lời ngắn), đáp án đúng không dài hơn hẳn lựa
// chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không là lựa chọn duy nhất có chữ của
// nhãn chủ đề, đề bài không trùng, rút thử nhiều lần (đúng ma trận, trọn hai đoạn mỗi bài, gặp đủ câu; đã làm hết một đề cố định thì
// không rút lại câu của đề đó), đề “Ôn chủ đề” (đủ 10 câu, nhiều nhất một đoạn lấy một phần), dò lộ đáp án giữa các câu rút được cùng
// lúc (chuỗi 3 từ liền nhau của đáp án; đáp án ngắn thì cả đáp án) ở đề bài, lựa chọn, lời giải, đáp án, đoạn đọc của câu kia. Đề “Ôn
// chủ đề” rút chung cả chủ đề, nên mọi cặp câu đều tính là rút cùng lúc, trừ hai câu Viết; DO_LO=1 in ra để xem tay, danh sách đã xem
// ở DA_XEM. So với kho cuối kì I cùng môn (đoạn “Chung của các phiên lớp 12 giữa kì II”): đề bài không gần trùng (cặp hai âm tiết chung,
// như tests/van9-gk1.js), đáp án không trùng đáp án câu nào của kho đó, đoạn đọc không dùng lại câu văn, dòng thơ của kho đó.
// Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ (cả đoạn đọc, thang chấm) với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp
// nguyên âm: không có chuỗi 8 từ liền nhau trùng sách; DO_SACH=1 in cả chuỗi 6 từ. Hai bài thơ chữ Hán không có trong sách nào ở
// OnUp-Book (phiên âm, bản dịch thơ trích nguyên văn cũng qua bước này). So thêm với mọi câu của các kho khác, cả câu riêng của các đề
// ngẫu nhiên: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/van12-gk2.js → in VAN12 GK2 OK.
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
const S = { de1: "van12-gk2-de1", de2: "van12-gk2-de2", pool: "van12-gk2-ngau-nhien" };
const CK1 = { de1: "van12-ck1-de1", de2: "van12-ck1-de2", pool: "van12-ck1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- tiếng, thanh, vần ---------- */
const TRAC = /[̣́̉̃]/; // sắc, hỏi, ngã, nặng
const tieng = (s) => String(s).normalize("NFC").replace(/[«»“”"(),.;:!?…–—]/g, " ").split(/\s+/).filter(Boolean);
const thanh = (t) => (TRAC.test(t.normalize("NFD")) ? "T" : "B");
const huyen = (t) => /̀/.test(t.normalize("NFD")); // thanh huyền (bằng, trầm); thanh ngang là bằng, bổng
// vần: bỏ dấu thanh (giữ mũ, trăng, móc), bỏ phụ âm đầu; “gi”, “qu” tính là phụ âm đầu
const van = (t) => t.normalize("NFD").replace(/[̣̀́̉̃]/g, "").normalize("NFC").toLowerCase()
  .replace(/^(ngh|ng|gh|gi|kh|ph|th|tr|ch|nh|qu|b|c|d|đ|g|h|k|l|m|n|p|r|s|t|v|x)(?=[aăâeêioôơuưy])/, "");
// lục bát: dòng sáu tiếng 2, 4, 6 là B, T, B; dòng tám tiếng 2, 4, 6, 8 là B, T, B, B, tiếng 6 và 8 một ngang một huyền;
// tiếng 6 dòng sáu vần với tiếng 6 dòng tám; tiếng 8 dòng tám vần với tiếng 6 dòng sáu kế tiếp
const kiemLucBat = (lines, at) => {
  const w = lines.map(tieng);
  w.forEach((l, i) => {
    const luc = i % 2 === 0;
    assert.equal(l.length, luc ? 6 : 8, `${at}, dòng ${i + 1}: ${luc ? 6 : 8} tiếng`);
    assert.equal((luc ? [1, 3, 5] : [1, 3, 5, 7]).map((k) => thanh(l[k])).join(""), luc ? "BTB" : "BTBB", `${at}, dòng ${i + 1}: bằng trắc`);
    if (!luc) {
      assert.notEqual(huyen(l[5]), huyen(l[7]), `${at}, dòng ${i + 1}: tiếng 6 («${l[5]}») và 8 («${l[7]}») một ngang một huyền`);
      assert.equal(van(l[5]), van(w[i - 1][5]), `${at}, dòng ${i + 1}: vần lục – bát («${w[i - 1][5]}» – «${l[5]}»)`);
      if (w[i + 1]) assert.equal(van(w[i + 1][5]), van(l[7]), `${at}, dòng ${i + 2}: vần bát – lục («${l[7]}» – «${w[i + 1][5]}»)`);
    }
  });
  return w;
};
// số đếm bằng chữ (đến 99): “ba mươi mốt” → 31
const SO = { một: 1, mốt: 1, hai: 2, ba: 3, bốn: 4, tư: 4, năm: 5, lăm: 5, sáu: 6, bảy: 7, tám: 8, chín: 9 };
const docSo = (s) => { const w = tieng(s.toLowerCase()); let n = 0; w.forEach((t) => { if (t === "mười") n += 10; else if (t === "mươi") n *= 10; else if (t in SO) n += SO[t]; else throw new Error("không đọc được số: " + s); }); return n; };

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => { assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 12); assert.equal(b.subject, "Ngữ văn"); assert.equal(b.file, "12-van.js"); });
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(rieng.length, 0, "đề ngẫu nhiên không có câu riêng (lời giao việc)");
assert.equal(kho.length, d1.n + d2.n, "kho = hai đề cố định");
const PSG = Object.assign({}, d1.passages, d2.passages);
const ten = new Map();
[S.de1, S.de2].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("van12-gk2-", "") + "#" + (i + 1))));
const doan = (id) => { assert.ok(PSG[id], "không có đoạn " + id); return PSG[id].text; };
const motCau = (has) => { const m = kho.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };
const trongNgoac = (q) => /«([^»]+)»/.exec(q.q)[1];
// phần của đoạn đọc thơ: “Phiên âm:”, “Dịch nghĩa:”, “Dịch thơ:”; dòng chỉ có số là số thứ tự bài
const phan = (id, ten2) => { const t = doan(id), i = t.indexOf(ten2 + ":\n"); assert.ok(i >= 0, `đoạn ${id} có phần ${ten2}`); const r = t.slice(i + ten2.length + 2); const j = r.search(/\n(Phiên âm|Dịch nghĩa|Dịch thơ):\n/); return (j < 0 ? r : r.slice(0, j)).split("\n").filter((l) => l.trim()); };
const baiTho = (lines) => { const bai = []; lines.forEach((l) => { if (/^\d+$/.test(l.trim())) bai.push([]); else { if (!bai.length) bai.push([]); bai[bai.length - 1].push(l); } }); return bai; };

/* ---------- thơ chữ Hán: phiên âm, bản dịch thơ ---------- */
const tauLo = baiTho(phan("tau-lo", "Phiên âm")), taoGiai = baiTho(phan("tao-giai", "Phiên âm"));
assert.equal(tauLo.length, 1, "«Tẩu lộ»: một bài");
assert.equal(taoGiai.length, 2, "«Tảo giải»: hai bài");
tauLo.concat(taoGiai).forEach((b, k) => { assert.equal(b.length, 4, `bài thơ chữ Hán ${k + 1}: bốn câu`); b.forEach((l) => assert.equal(tieng(l).length, 7, "bảy chữ mỗi câu: " + l)); });
const dichTho = kiemLucBat(phan("tau-lo", "Dịch thơ"), "bản dịch thơ «Đi đường»");
assert.equal(dichTho.length, 4, "bản dịch thơ «Đi đường» có bốn dòng");
const theTho = (bai) => (bai.every((b) => b.length === 4 && b.every((l) => tieng(l).length === 7)) ? "Thất ngôn tứ tuyệt" : bai.every((b) => b.length === 8) ? "Thất ngôn bát cú Đường luật" : null);
[tauLo, taoGiai].forEach((b, k) => assert.equal(theTho(b), "Thất ngôn tứ tuyệt", `bài thơ chữ Hán ${k + 1}: thất ngôn tứ tuyệt (mỗi bài bốn câu, mỗi câu bảy chữ)`));
const dem = (s, cum) => tieng(s.toLowerCase()).join(" ").split(cum).length - 1;
const dichNghia = phan("tao-giai", "Dịch nghĩa");
assert.equal(dichNghia.length, 2, "«Tảo giải»: dịch nghĩa từng bài");

/* ---------- đáp án tính lại bằng code, đối chiếu chữ của đoạn đọc, của câu ví dụ ---------- */
const coTrong = (id, s) => { assert.ok(doan(id).includes(s), `đoạn ${id} phải có «${s}»`); return true; };
const motLuaChon = (q, re, at) => { const ok = q.o.filter((o) => re.test(o.toLowerCase())); assert.equal(ok.length, 1, `${at}: đúng một lựa chọn có ${re}, có ${ok.length}`); return ok[0]; };
const lapLai = (o) => { const w = tieng(o.toLowerCase()), c = {}; for (let i = 0; i + 3 <= w.length; i++) { const k = w.slice(i, i + 3).join(" "); c[k] = (c[k] || 0) + 1; } return Object.values(c).some((v) => v >= 2); };
const THAN_MAT = /(^|\s)(nha|nè|á|à|ê|luôn|liền|tụi|ơi)(\s|$|[,.!?])/;
const CHECKS = [
  { id: S.de1, has: "Hồ Chí Minh viết tập thơ ấy trong hoàn cảnh nào", right: (q) => { assert.ok(/«Nhật kí trong tù»/.test(PSG["tau-lo"].title), "tau-lo: ghi tập thơ ở tên đoạn"); return motLuaChon(q, /nhà lao ở trung quốc \(1942 – 1943\)/, "hoàn cảnh viết «Nhật kí trong tù»"); } },
  { id: S.de1, has: "Đối chiếu phần phiên âm với bản dịch thơ", right: (q) => q.o.map((o, i) => (/chuyển sang thể lục bát/.test(o) ? dichTho.every((l, k) => l.length === (k % 2 ? 8 : 6)) : /giữ được việc lặp lại cụm từ «tẩu lộ»/.test(o) ? dem(dichTho[0].join(" "), "đi đường") === dem(tauLo[0][0], "tẩu lộ") : q.a[i])) },
  { id: S.de1, has: "Ở đoạn (1), người viết khẳng định", right: (q) => coTrong("bon-cau-hoi", "không chỉ dành cho nhà văn, nhà báo; bất cứ ai viết để người khác đọc") && q.o[0] },
  { id: S.de1, has: "bà Hạnh đã chèo đò ở khúc sông này", right: () => String(docSo(/đã chèo đò ở khúc sông này (.+?) năm/.exec(doan("ben-bai"))[1])) },
  { id: S.de1, has: "Người kể chuyện trong đoạn trích là ai", right: (q) => coTrong("nam-dau-di-day", "tôi nhận quyết định về dạy") && motLuaChon(q, /xưng «tôi»/, "người kể xưng tôi") },
  { id: S.de1, has: "dùng từ ngữ chỉ phạm vi bao quát", right: (q) => motLuaChon(q, /(^|\s)(toàn thể|tất cả|mọi|toàn bộ)\s/, "phạm vi bao quát") },
  { id: S.de1, has: "dùng phép điệp ngữ", right: (q) => { const ok = q.o.filter(lapLai); assert.equal(ok.length, 1, "điệp ngữ: đúng một lựa chọn lặp một cụm ba tiếng"); return ok[0]; } },
  { id: S.de1, has: "dùng từ ngữ có ý nghĩa hạn chế", right: (q) => motLuaChon(q, /(ít khi|không mấy|chẳng bao nhiêu|hiếm khi|chẳng mấy)/, "từ ngữ hạn chế") },
  { id: S.de1, has: "là câu hỏi thể hiện ý chất vấn", right: (q) => { assert.ok(q.o.every((o) => /\?$/.test(o)), "chất vấn: mọi lựa chọn là câu hỏi"); return motLuaChon(q, /^(lẽ nào|chẳng lẽ|há|ai bảo)\s/, "câu hỏi chất vấn"); } },
  { id: S.de1, has: "Lời nào dưới đây dùng ngôn ngữ trang trọng", right: (q) => { const ok = q.o.filter((o) => !THAN_MAT.test(o.toLowerCase())); assert.equal(ok.length, 1, "trang trọng: chỉ một lựa chọn không có tiểu từ, tiếng gọi của lời nói thân mật"); assert.ok(/kính mời/.test(ok[0])); return ok[0]; } },
  { id: S.de1, has: "Câu mở đầu nào phù hợp nhất", right: (q) => { const ok = q.o.filter((o) => /^Kính gửi/.test(o) && !THAN_MAT.test(o.toLowerCase())); assert.equal(ok.length, 1, "thư mời: đúng một lựa chọn mở đầu «Kính gửi», không suồng sã"); return ok[0]; } },
  { id: S.de2, has: "Theo phần dịch nghĩa, người tù bị giải đi", right: (q) => coTrong("tao-giai", "Gà gáy lần thứ nhất, đêm còn chưa tàn") && motLuaChon(q, /gà mới gáy lần thứ nhất/, "thời điểm lên đường") },
  { id: S.de2, has: "Đối chiếu với những điều đã biết về thơ chữ Hán", right: (q) => q.o.map((o, i) => (/từ sáng ra tối/.test(o) ? !(/đêm/.test(dichNghia[0]) && /Phương đông/.test(dichNghia[1])) : /tả cảnh buổi chiều/.test(o) ? /chiều/.test(dichNghia.join(" ")) : q.a[i])) },
  { id: S.de2, has: "lời kêu gọi ra đời trong hoàn cảnh nào", right: (q) => coTrong("loi-keu-goi", "chiến tranh phá hoại bằng không quân của Mỹ đối với miền Bắc ngày càng ác liệt") && motLuaChon(q, /chiến tranh phá hoại bằng không quân/, "hoàn cảnh ra đời") },
  { id: S.de2, has: "Khi đánh giá một tác phẩm, cần đặt tác phẩm vào bối cảnh", right: (q) => q.o.map((o, i) => (/không nhắc gì đến hoàn cảnh ra đời/.test(o) ? !/năm 1966/.test(doan("loi-keu-goi")) : /hết ý nghĩa/.test(o) ? !/Tôi không nghĩ vậy/.test(doan("loi-keu-goi")) : q.a[i])) },
  { id: S.de2, has: "làm nghề bốc vác ở chợ mà người viết trò chuyện", right: () => /Chị (\S+), bốn mươi lăm tuổi, đã làm nghề bốc vác/.exec(doan("cho-dau-moi"))[1] },
  { id: S.de2, has: "Câu nào dưới đây có từ ngữ mang nghĩa khẳng định", right: (q) => motLuaChon(q, /(chắc chắn|tất nhiên|rõ ràng|nhất định)/, "từ ngữ khẳng định") },
  { id: S.de2, has: "là câu khiến, dùng để khẳng định", right: (q) => motLuaChon(q, /^hãy .*!$/, "câu khiến") },
  { id: S.de2, has: "dùng từ ngữ mang nghĩa phủ định để bác bỏ", right: (q) => motLuaChon(q, /(chưa bao giờ|không hề|chẳng bao giờ|chưa từng)/, "từ ngữ phủ định") },
  { id: S.de2, has: "những từ ngữ nào thể hiện thái độ coi thường", right: (q) => { const dv = trongNgoac(q).toLowerCase(), ok = q.o.filter((o) => (o.match(/«[^»]+»/g) || []).every((w) => dv.includes(w.slice(1, -1)))); assert.equal(ok.length, q.o.length, "mọi từ ngữ ở các lựa chọn đều có trong đoạn văn"); return q.o.find((o) => /«lũ»/.test(o) && /«hắn»/.test(o)); } },
  { id: S.de2, has: "Ai bảo rác thải nhựa", right: (q) => { const dv = trongNgoac(q); return q.o.map((o, i) => (/nhằm hỏi thông tin/.test(o) ? !/^Ai bảo/.test(dv) : /không dùng từ ngữ nào mang nghĩa phủ định/.test(o) ? !/(chẳng|không|chưa)/.test(dv.toLowerCase()) : q.a[i])); } },
  { id: S.de2, has: "có dùng tiếng lóng", right: (q) => motLuaChon(q, /(xịn|con xe)/, "tiếng lóng") },
  { id: S.de2, has: "Tin nhắn nào phù hợp nhất", right: (q) => { const ok = q.o.filter((o) => /^Thưa thầy/.test(o) && /ạ\.$/.test(o) && !THAN_MAT.test(o.toLowerCase())); assert.equal(ok.length, 1, "tin nhắn xin phép: đúng một lựa chọn lễ phép"); return ok[0]; } }
];
let n = 0;
CHECKS.forEach((c) => {
  const q = motCau(c.has), at = c.id + ": " + c.has, want = c.right(q);
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  if (Array.isArray(want)) assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  else assert.equal(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  n++;
});
assert.ok(motCau("bà Hạnh đã chèo đò ở khúc sông này").ans.includes("ba mươi mốt"), "câu điền nhận cả số viết bằng chữ như đoạn đọc");

/* ---------- ma trận, đoạn đọc, câu Viết, note ---------- */
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
const demLv = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
assert.equal(TOPICS[TOPICS.length - 1], "Viết", "chủ đề Viết đứng cuối ma trận");
[d1.questions, d2.questions].forEach((d, i) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, `Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => demLv(d, t, l)), v, `Đề ${i + 1} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = demLv(kho, t, l);
  assert.ok(v[l - 1] ? o >= 2 * v[l - 1] : o === 0, `ô (${t}, mức ${l}) rút ${v[l - 1]} câu, kho có ${o}`);
}));
// hai chủ đề đọc hiểu theo tên Bài 6, 7 (mục lục của sách in năm 2026), đứng đầu ma trận; mỗi đề cố định hai đoạn mỗi chủ đề, đoạn 3 câu mức 1-2-3
const BAI = ["Hồ Chí Minh – “Văn hoá phải soi đường cho quốc dân đi”", "Sự thật trong tác phẩm kí"];
const docHieu = TOPICS.filter((t) => kho.some((q) => q.topic === t && q.p));
assert.deepEqual(docHieu, BAI, "hai chủ đề đọc hiểu theo tên Bài 6, 7, đứng đầu ma trận");
docHieu.forEach((t) => {
  assert.ok(kho.filter((q) => q.topic === t).every((q) => q.p), t + ": mọi câu có đoạn đọc");
  assert.deepEqual(M[t], [2, 2, 2], t + ": ma trận [2, 2, 2]");
  [S.de1, S.de2].forEach((id) => {
    const qs = kho.filter((q) => q.topic === t && q.src === id), ps = [...new Set(qs.map((q) => q.p))];
    assert.equal(ps.length, 2, `${id}, ${t}: hai đoạn`);
    ps.forEach((pp) => assert.deepEqual(qs.filter((q) => q.p === pp).map((q) => q.lv), [1, 2, 3], `${id}, ${t}, đoạn ${pp}: 3 câu mức 1-2-3`));
  });
});
Object.keys(PSG).forEach((id) => assert.equal(kho.filter((q) => q.p === id).length, 3, "đoạn " + id + " có 3 câu"));
// Bài 6: mỗi đề một bài thơ chữ Hán của Hồ Chí Minh (dịch nghĩa của người soạn) và một văn bản nghị luận người soạn viết;
// Bài 7: mỗi đề một bài viết theo lối phóng sự và một đoạn hồi kí người soạn viết
const loai = (id) => { const t = PSG[id].title; return /thơ chữ Hán của Hồ Chí Minh/.test(t) && /dịch nghĩa: người soạn/.test(t) ? "thơ" : /văn bản nghị luận người soạn viết/.test(t) ? "nghị luận" : /người soạn viết theo lối phóng sự/.test(t) ? "phóng sự" : /người soạn viết theo lối hồi kí/.test(t) ? "hồi kí" : null; };
[S.de1, S.de2].forEach((id) => {
  const ps = (t) => [...new Set(kho.filter((q) => q.topic === t && q.src === id).map((q) => q.p))].map(loai).sort().join(", ");
  assert.equal(ps(BAI[0]), "nghị luận, thơ", id + ": Bài 6 có một bài thơ chữ Hán và một văn bản nghị luận");
  assert.equal(ps(BAI[1]), "hồi kí, phóng sự", id + ": Bài 7 có một bài phóng sự và một đoạn hồi kí");
});
assert.ok(kho.filter((q) => !q.p).every((q) => !docHieu.includes(q.topic)), "câu không có đoạn đọc chỉ ở Tiếng Việt, Viết");
// tiếng Việt theo hai mục Thực hành tiếng Việt của Bài 6, 7
const TV = { "Biện pháp làm tăng tính khẳng định": 6, "Biện pháp làm tăng tính phủ định": 6, "Ngôn ngữ trang trọng và ngôn ngữ thân mật": 7 };
assert.deepEqual(TOPICS.filter((t) => !BAI.includes(t) && t !== "Viết"), Object.keys(TV), "chủ đề tiếng Việt theo hai mục Thực hành tiếng Việt Bài 6, 7");
const viet = kho.filter((q) => q.topic === "Viết");
assert.ok(viet.every((q) => q.type === "essay") && kho.filter((q) => q.type === "essay").every((q) => q.topic === "Viết"), "chủ đề Viết chỉ gồm câu tự luận, tự luận chỉ ở Viết");
viet.forEach((q) => {
  assert.ok(q.rubric.length >= 4 && q.rubric.length <= 6, "câu Viết có 4–6 ý chấm: " + q.q.slice(0, 50));
  assert.equal(sum(q.rubric.map((r) => r.p)), 4, "câu Viết 4 điểm như câu bài văn của đề tốt nghiệp: " + q.q.slice(0, 50));
  assert.ok(q.rubric.every((r) => Math.round(r.p * 4) === r.p * 4 && r.p > 0), "điểm từng ý chia hết cho 0,25");
  assert.ok(/khoảng 600 chữ/.test(q.q), "câu Viết khoảng 600 chữ: " + q.q.slice(0, 50));
  assert.ok(/^Dàn ý gợi ý:/.test(q.x) && q.x.length > 400, "câu Viết có dàn ý gợi ý: " + q.q.slice(0, 50));
});
// hai kiểu bài Viết của Bài 6, 7: Đề 1 nghị luận về một vấn đề liên quan đến tuổi trẻ (cách ứng xử trong các mối quan hệ gia đình,
// xã hội), Đề 2 báo cáo kết quả của bài tập dự án (có bảng hoặc sơ đồ, ảnh minh hoạ, tài liệu tham khảo)
const KIEU = [[6, /^Viết báo cáo .*về bài tập dự án .*bảng hoặc sơ đồ.*tài liệu tham khảo/], [7, /^Bằng một bài văn nghị luận .*người trẻ nên ứng xử .*trong gia đình cũng như ngoài xã hội/]];
KIEU.forEach(([b, re]) => assert.equal(viet.filter((q) => re.test(q.q)).length, 1, `kiểu bài Viết của Bài ${b}: ${re}`));
assert.deepEqual([S.de1, S.de2].map((id) => KIEU.find(([, re]) => re.test(viet.find((q) => q.src === id).q))[0]), [7, 6], "câu Viết của hai đề cố định: Bài 7, Bài 6");
// từ khoá vấn đề nghị luận xã hội của các đề thi thử vào 10 (VAN_DE ở tests/van9-vao10.js) không có ở đề bài câu Viết
["so sánh bản thân", "nghệ thuật truyền thống", "nhận lỗi", "khuyết tật", "giữ lời hứa", "thức khuya"].forEach((k) => viet.forEach((q) => assert.ok(!q.q.toLowerCase().includes(k), "đề Viết trùng vấn đề của đề thi thử vào 10: " + k)));
[d1, d2].forEach((b) => {
  assert.ok(/Trường đã học Bài 8 \(Dữ liệu trong văn bản thông tin\) trước khi kiểm tra thì đối chiếu đề cương của trường/.test(b.note), b.id + ": note nhắc trường đã học Bài 8");
  assert.ok(/10 câu mức Biết, 8 câu mức Hiểu, 7 câu mức Vận dụng/.test(b.note), b.id + ": note ghi ma trận");
  assert.ok(/Giữa học kì II \(Bài 6–7\)/.test(b.note), b.id + ": note ghi phạm vi");
  assert.ok(!/Sở GD&ĐT/.test(b.note), b.id + ": giữa kì II không có câu về đề chung của Sở (Thông tư 89/2026 chỉ ở cuối kì)");
});
{
  // lịch thi mặc định: đọc file như tests/van9-vao10.js
  const ctx2 = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx2);
  const k = (ctx2.window.ONTAP_SEED_EVENTS || []).find((e) => e.id === "gk2-l12");
  assert.ok(k, "có kì thi gk2-l12");
  [S.de1, S.de2, S.pool].forEach((id) => assert.ok(k.banks.includes(id), "gk2-l12 gắn " + id));
  assert.ok(/Ngữ văn: Bài 6–7\./.test(k.scope), "phạm vi của gk2-l12 ghi Ngữ văn Bài 6–7");
}

/* ---------- dạng câu ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 6, "mỗi kho ít nhất 6 câu đúng/sai 4 ý (đoạn “Chung của các phiên lớp 12”)");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
assert.ok(new Set(tf4.map((q) => q.a.filter(Boolean).length)).size >= 2, "câu đúng/sai 4 ý không cùng số ý đúng");
assert.ok(kho.some((q) => q.type === "fill"), "có câu trả lời ngắn (điền)");
assert.ok(kho.every((q) => ["mc", "tf4", "fill", "essay"].includes(q.type)), "chỉ dùng dạng câu của khung Công văn 7991 và tự luận");
// lời giải không nói “ý thứ hai”, “phương án A”: app xáo ý, phương án
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của ý: " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau; đáp án đúng là lựa chọn dài nhất hay
// ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn (Phiên N9-ck1-lsdl-gdcd)
const mc = kho.filter((q) => q.type === "mc");
mc.forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + ten.get(q));
});
const dai = mc.filter((q) => q.o[0].length >= Math.max(...q.o.slice(1).map((o) => o.length))).length;
const ngan = mc.filter((q) => q.o[0].length <= Math.min(...q.o.slice(1).map((o) => o.length))).length;
assert.ok(3 * dai <= mc.length, `đáp án là lựa chọn dài nhất ở ${dai}/${mc.length} câu nhiều lựa chọn`);
assert.ok(3 * ngan <= mc.length, `đáp án là lựa chọn ngắn nhất ở ${ngan}/${mc.length} câu nhiều lựa chọn`);
// nhãn chủ đề hiện trên câu: đáp án không là lựa chọn duy nhất có chữ của nhãn (Rút ra N6)
const khongDau0 = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase();
mc.forEach((q) => {
  const w = khongDau0(q.topic).split(/[^a-z0-9]+/).filter((x) => x.length > 1), cap = [];
  for (let i = 0; i + 1 < w.length; i++) cap.push(w[i] + " " + w[i + 1]);
  cap.forEach((c) => { const co = q.o.map((o) => khongDau0(o).replace(/[^a-z0-9]+/g, " ").includes(c)); assert.ok(!(co[0] && co.filter(Boolean).length === 1), `chỉ đáp án có chữ «${c}» của nhãn chủ đề: ${ten.get(q)}`); });
});

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8) ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "12-van.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- rút thử ---------- */
const seen = new Set();
for (let k = 0; k < 400; k++) {
  const d = Quiz.draw(p);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, p.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => demLv(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  docHieu.forEach((t) => {
    const qs = d.questions.filter((q) => q.topic === t), ps = [...new Set(qs.map((q) => q.p))];
    assert.equal(ps.length, 2, t + ": rút hai đoạn");
    ps.forEach((pp) => assert.equal(qs.filter((q) => q.p === pp).length, 3, t + ": rút trọn đoạn " + pp));
  });
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.equal(seen.size, kho.length, "400 lần rút thử phải gặp đủ câu của kho");
// học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên không rút lại câu của đề đó (Rút ra N12)
[S.de1, S.de2].forEach((lam) => {
  const hist = (q) => (q.src === lam ? { done: 1, wrong: 0 } : null);
  for (let k = 0; k < 30; k++) {
    const d = Quiz.draw(p, hist);
    assert.equal(d.notes.length, 0); assert.equal(d.questions.length, p.n);
    assert.ok(d.questions.every((q) => q.src !== lam), `đã làm hết ${lam} thì không rút lại câu của đề đó`);
  }
});
// đề “Ôn chủ đề” (Phiên UX14): chủ đề có từ 10 câu chấm tự động thì rút 10 câu, đoạn đọc đi trọn (nhiều nhất một đoạn lấy một phần,
// không quá ⌈10/3⌉ đoạn); chủ đề dưới 10 câu thì lấy hết
TOPICS.filter((t) => t !== "Viết").forEach((t) => {
  const tb = Quiz.topicBank([d1, d2, p], t, { id: "chu-de", title: t });
  const co = kho.filter((q) => q.topic === t && q.type !== "essay").length;
  assert.equal(tb.questions.length, co, `Ôn chủ đề «${t}»: kho có ${co} câu`);
  assert.equal(tb.n, Math.min(co, Quiz.TOPIC_N), `Ôn chủ đề «${t}»: rút ${Math.min(co, Quiz.TOPIC_N)} câu`);
  for (let k = 0; k < 40; k++) {
    const d = Quiz.draw(tb);
    assert.equal(d.notes.length, 0, `Ôn chủ đề «${t}»: rút có ghi chú`);
    assert.equal(d.questions.length, tb.n);
    const ps = [...new Set(d.questions.filter((q) => q.p).map((q) => q.p))];
    const motPhan = ps.filter((pp) => d.questions.filter((q) => q.p === pp).length < tb.questions.filter((q) => q.p === pp).length);
    assert.ok(motPhan.length <= 1 && ps.length <= Math.ceil(Quiz.TOPIC_N / 3), `Ôn chủ đề «${t}»: ${ps.length} đoạn, ${motPhan.length} đoạn lấy một phần`);
  }
});

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Rút cùng lúc: đề “Ôn chủ đề” rút chung cả chủ đề (cả câu của hai đề), đề ngẫu nhiên rút hai đoạn mỗi bài và các câu tiếng Việt của
   những ô rút từ 2 câu, nên mọi cặp câu khác nhau đều có thể ra cùng lúc, trừ hai câu Viết (ô rút 1 câu, đề “Ôn chủ đề” bỏ câu tự luận).
   Đáp án (lựa chọn đúng, đáp án điền) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có trong
   đề bài, lựa chọn, lời giải, đáp án hay đoạn đọc (khác đoạn của câu này) của câu kia thì in ra với DO_LO=1 để xem tay; danh sách đã
   xem ở DA_XEM. */
const tu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const cungLuc = (a, b) => a !== b && !(a.topic === "Viết" && b.topic === "Viết");
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], (q.rubric || []).map((r) => r.c)).map(String);
const doLo = (qs, tenCau) => {
  const ra = [];
  qs.forEach((q) => {
    const dap = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []; // câu điền: đáp án chính (các đáp án sau là cách viết khác)
    const C = [...new Set(dap.flatMap(cum))];
    if (!C.length) return;
    qs.forEach((p2) => {
      if (!cungLuc(q, p2)) return;
      const T = " " + chu(p2).concat(p2.p && p2.p !== q.p ? [PSG[p2.p].text] : []).map((s) => tu(s).join(" ")).join(" | ") + " ";
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
    });
  });
  return [...new Set(ra)];
};
const lo = doLo(kho, (q) => ten.get(q));
if (process.env.DO_LO) console.log("Đáp án có ở câu rút được cùng lúc (xem tay):\n" + lo.join("\n"));
const DA_XEM = [];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = motCau("làm nghề bốc vác ở chợ mà người viết trò chuyện"), b = motCau("có dùng tiếng lóng");
  const gia = Object.assign({}, b, { x: b.x + " Người bốc vác trong bài phóng sự tên là Liên." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => / liên$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
}

/* ---------- so với kho cuối kì I cùng môn ---------- */
const k1 = [bank(CK1.de1), bank(CK1.de2), bank(CK1.pool)];
assert.ok(k1.every(Boolean), "có kho Ngữ văn 12 cuối kì I");
const kho1 = k1[2].questions, PSG1 = Object.assign({}, k1[0].passages, k1[1].passages, k1[2].passages);
const ten1 = new Map(kho1.map((q) => [q, "ck1:" + q.src.replace("van12-ck1-", "") + "#" + (kho1.filter((x) => x.src === q.src).indexOf(q) + 1)]));
// đáp án không trùng đáp án câu nào của kho cuối kì I, trừ tên thể thơ (câu nhận ra thể thơ của một bài thơ khác)
{
  const THE = /^(thất ngôn|ngũ ngôn|lục bát|song thất lục bát|thơ tự do)/i;
  const dap = (q) => (q.type === "mc" ? goc(q.o[0]) : q.type === "fill" ? goc(q.ans[0]) : null);
  const cu = new Set(kho1.map(dap).filter(Boolean));
  kho.forEach((q) => assert.ok(!cu.has(dap(q)) || (q.type === "mc" && THE.test(q.o[0])), "đáp án trùng một câu của kho cuối kì I: " + ten.get(q)));
}
// gần trùng (Rút ra N25; như tests/van9-gk1.js): đề bài cùng lựa chọn có từ 4 cặp hai âm tiết liền nhau chung với một câu của kho cuối
// kì I và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính cụm chung của đề Ngữ văn (CUM), cặp có số hay chữ đơn,
// cặp của nhãn chủ đề và cặp có ở từ 3% số câu của data/banks/12-van.js.
{
  const CUM = ["mỗi nhận xét sau", "đúng hay sai", "người soạn viết", "dưới đây", "biện pháp tu từ", "đoạn trích", "người viết"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const deVan12 = BANKS.filter((b) => b.file === "12-van.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), df = {};
  deVan12.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * deVan12.length)); };
  const gan = kho.flatMap((q) => { const c = capAm(q); return kho1.map((o) => { const d = capAm(o), chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${ten1.get(o)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  assert.deepEqual(gan, [], "đề bài gần trùng câu của kho cuối kì I");
}
// ngữ liệu không dùng lại của kho cuối kì I: không dòng thơ, câu văn nào của đoạn đọc trùng đoạn đọc của kho đó
{
  const cau = (t) => t.split(/\n|(?<=[.!?…»])\s+/).map(goc).filter((s) => s.length >= 12);
  const cu = new Set(Object.values(PSG1).flatMap((x) => cau(x.text)));
  Object.entries(PSG).forEach(([id, x]) => cau(x.text).forEach((s) => assert.ok(!cu.has(s), `đoạn ${id} dùng lại câu của kho cuối kì I: ${s}`)));
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const boChuoi = (texts, k) => { const set = new Set(); texts.forEach((t) => chuoi(t, k).forEach((c) => set.add(c))); return set; };
// lời của Hồ Chí Minh trích nguyên văn (sách cũng trích): không tính khi so với chữ của sách
const TRICH = ["Viết cho ai? Viết để làm gì? Viết cái gì? Viết như thế nào?", "Không có gì quý hơn độc lập, tự do"];
const boTrich = (s) => TRICH.reduce((t, c) => t.split(c).join(" | "), String(s));
const truong = (q) => chu(q).concat(q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].title, PSG[q.p].text] : []);
if (SACH.length) {
  assert.ok(SACH.some((f) => /ngu-van-12-tap-2/.test(f)), "OnUp-Book có Ngữ văn 12 tập hai");
  const texts = SACH.map((f) => fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]* ===/g, " "));
  const bao = (k) => { const set = boChuoi(texts, k); return kho.flatMap((q) => truong(q).map(boTrich).flatMap((s) => chuoi(s, k).filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`))); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // hai bài thơ chữ Hán không phải văn bản đọc của sách nào: không có tên bài (bỏ dấu) trong chữ OCR
  const tat = texts.join(" | ").normalize("NFC").toLowerCase().replace(/\s+/g, " ");
  ["Tẩu lộ", "Tảo giải", "Giải đi sớm", "Đi đường mới biết", "Gà gáy lần thứ nhất"].forEach((t) => assert.ok(!tat.includes(t.toLowerCase()), "bài thơ có trong sách ở OnUp-Book: " + t));
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const khac = BANKS.filter((b) => !/^van12-gk2-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)
    .map((q) => chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).join(" | ")));
  const bao = (k) => { const set = boChuoi(khac, k); return kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại, đối chiếu bằng code; kho " + kho.length + " câu, " + Object.keys(PSG).length + " đoạn đọc, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; " + tf4.length + " câu đúng/sai 4 ý; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn.");
console.log("VAN12 GK2 OK");
