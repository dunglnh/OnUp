// Kiểm tra ngân hàng Tiếng Anh 12 cuối năm của Phiên N12-ck2-ta (data/banks/12-ta.js, ta12-ck2-*), theo mẫu tests/ta12-gk2.js,
// tests/ta12-ck1.js, tests/ta9-ck2.js. Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng);
// ma trận 10 – 8 – 7 như mọi kho lớp 12 (đoạn “Chung của các phiên lớp 12” của docs/KE-HOACH-NOI-DUNG.md): Pronunciation, Unit 6–10
// (trọng tâm Units 8–10: nhiều câu hơn Units 6–7 ở mỗi đề), Cloze, Reading.
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho):
// - Pronunciation: ngữ điệu câu hỏi của Unit 10 (khung Remember! tr. 130: câu hỏi Yes/No lên giọng ở cuối, câu hỏi Wh- xuống giọng,
//   câu hỏi lựa chọn lên giọng ở lựa chọn trước or, xuống giọng ở cuối; loaiCauHoi đọc loại câu hỏi từ chữ của câu); đồng hóa âm của Unit 8
//   (khung tr. 102: /n/, /t/, /d/ đứng trước /p/, /b/, /m/ thành /m/, /p/, /b/; /θ/ trước /s/ thành /s/; âm đầu, âm cuối của từng từ ghi ở
//   bảng AM; không dùng các ví dụ, câu luyện của sách); trọng âm câu của Unit 9 (khung tr. 118: từ nội dung được nhấn, từ ngữ pháp không
//   nhấn; bảng TU_LOAI); mỗi đề một câu ngữ điệu (Biết) và một câu đồng hóa âm hay trọng âm câu (Hiểu); đáp án không trùng đáp án câu
//   Pronunciation của kho cuối kì I, giữa kì II;
// - ngữ pháp, mỗi điểm chỉ ở một ô rút 1 câu: câu sai khiến (Unit 6, ô Hiểu; loiSK như tests/ta12-gk2.js với bảng động từ mới), mệnh đề
//   chỉ cách thức, kết quả (Unit 7, ô Vận dụng: such + tính từ không có danh từ, too … that, so … so; as if + dạng quá khứ cho việc không
//   có thật), mệnh đề chỉ điều kiện, so sánh (Unit 8, ô Vận dụng: unless không đi với động từ phủ định, as … as, more … than; câu đồng
//   nghĩa tính lại chiều so sánh), cụm động từ ba từ (Unit 9, ô Hiểu: bảng PV3 theo khung tr. 119 và các trang của Unit 9, nghĩa theo tín
//   hiệu trong câu; giới từ sai, look forward to + động từ nguyên thể), câu tường thuật mệnh lệnh, yêu cầu, lời mời giúp, lời khuyên (Unit
//   10, ô Vận dụng: tell, ask, advise… + tân ngữ + to-infinitive, offer… + to-infinitive không có tân ngữ, not + to-infinitive, said +
//   người); mỗi câu ngữ pháp một đáp án riêng;
// - câu khác của Unit: nghĩa của từ (gần nghĩa, trái nghĩa) theo bảng NGHIA, dạng của từ theo bảng họ từ HO_TU (chỗ trống cần đúng từ
//   loại), Everyday English theo cụm của sách (bày tỏ sự quan tâm Unit 8, bắt chuyện Unit 7, cảm ơn và đáp lời cảm ơn Unit 10), câu
//   đúng/sai 4 ý về biểu đồ tròn tính lại từ số liệu trong đề, câu sắp xếp câu thành đoạn văn, thư, hội thoại;
// - Cloze: cụm từ cố định (CUM), cụm động từ ba từ, câu tường thuật, liên từ theo quan hệ ý có tín hiệu trong đoạn.
// Rồi kiểm tra ma trận (hai đề cố định và câu riêng đều chia đúng ma trận, theo thứ tự chủ đề; Units 8–10 nhiều câu hơn Units 6–7 ở mỗi
// đề; ô Biết của Unit chỉ có từ vựng), tên chủ đề theo Contents (Unit 6, 7 đúng chữ của kho giữa kì II), Cloze, Reading (mỗi đề một đoạn
// 3 câu mức 1-2-3, bài đọc dài hơn mọi bài đọc của các kho lớp 9), dạng câu (ít nhất 6 câu đúng/sai 4 ý, không lặp kiểu Đ/S), đáp án đúng
// không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không lặp chữ của
// nhãn chủ đề, đề bài không trùng, note (không câu nghe, Units 6–10, nhắc trường chỉ kiểm tra một phần, đề chung của Sở), kì thi ck2-l12,
// rút thử, dò lộ đáp án giữa các câu rút được cùng lúc (DA_XEM), giữa mọi cặp câu cùng chủ đề của kho này và kho cuối kì I, giữa kì II
// (đề “Ôn chủ đề”; DA_XEM_CHU_DE) và với note.
// So với kho giữa kì II: câu Unit 6, 7 không trùng đáp án, đề bài, chuỗi 6 từ của đề bài câu cùng Unit; so với kho cuối kì I, giữa kì II:
// đề bài không gần trùng (cặp hai từ liền nhau chung), câu cùng chủ đề không trùng đáp án.
// Có sách ở ../OnUp-Book (repo riêng tư): tên Unit theo Contents và mục lục trong README của cuốn; từ của đáp án câu từ vựng, từ hỏi nghĩa,
// từ của câu dạng từ, cụm động từ ba từ có trong trang của đúng Unit (cộng Glossary); khung Remember! của Unit 8–10 có các điểm âm, ngữ
// pháp mà câu hỏi; mọi trường chữ không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (DO_SACH=1 in chuỗi 6 từ). So thêm với mọi câu
// của các kho khác: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/ta12-ck2.js → in TA12 CK2 OK.
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
const S = { de1: "ta12-ck2-de1", de2: "ta12-ck2-de2", pool: "ta12-ck2-ngau-nhien" };
const GK2 = "ta12-gk2-ngau-nhien", CK1 = "ta12-ck1-ngau-nhien";
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 12); assert.equal(b.subject, "Tiếng Anh"); assert.equal(b.file, "12-ta.js");
  assert.ok(/No listening/.test(b.note), b.id + ": note ghi không có câu nghe");
  assert.ok(/Units 6–10/.test(b.note) && /more questions on Units 8–10/.test(b.note), b.id + ": note ghi Units 6–10, trọng tâm Units 8–10");
  assert.ok(/only some of these units/.test(b.note) && /revision guide/.test(b.note), b.id + ": note nhắc trường chỉ kiểm tra một phần đối chiếu đề cương");
  assert.ok(/common end-of-term test/.test(b.note) && /Department of Education/.test(b.note) && /Grade 12/.test(b.note), b.id + ": note nói về đề chung của Sở (Thông tư 89/2026, cuối kì II lớp 12)");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("ta12-ck2-", "") + "#" + (i + 1))));
const cauCua = (has) => { const m = kho.filter((q) => q.q.includes(has) || ((q.type === "order" || q.type === "tf4") && q.o[0].includes(has))); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };
const trongNgoac = (s) => /“([^”]+)”/.exec(s)[1];
// kì thi: gắn đủ ba mã vào ck2-l12, phạm vi ghi Units 6–10, trọng tâm Units 8–10
{
  const c2 = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), c2);
  const k = (c2.window.ONTAP_SEED_EVENTS || []).find((e) => e.id === "ck2-l12");
  assert.ok(k && k.grades.includes(12), "có kì thi ck2-l12 của khối 12");
  [S.de1, S.de2, S.pool].forEach((id) => assert.ok(k.banks.includes(id), "ck2-l12 gắn " + id));
  assert.ok(/Tiếng Anh: Units 6–10, trọng tâm Units 8–10\./.test(k.scope), "phạm vi của ck2-l12 ghi Tiếng Anh: Units 6–10, trọng tâm Units 8–10");
}

/* ---------- tên chủ đề theo Contents của sách, ma trận ---------- */
const UNITS = { 6: "Artificial Intelligence", 7: "The World of Mass Media", 8: "Wildlife Conservation", 9: "Career Paths", 10: "Lifelong Learning" };
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
assert.deepEqual(TOPICS, ["Pronunciation"].concat(Object.entries(UNITS).map(([u, t]) => `Unit ${u} · ${t}`), ["Cloze", "Reading"]),
  "chủ đề: Pronunciation, Unit 6–10 theo Contents, Cloze (đoạn điền), Reading");
// Unit 6, 7 (phần ôn) đúng chữ chủ đề của kho giữa kì II cùng môn (đoạn “Chung của các phiên lớp 12 cuối năm”)
[6, 7].forEach((u) => assert.ok(Object.keys(bank(GK2).pool.matrix).includes(`Unit ${u} · ${UNITS[u]}`), `Unit ${u}: chữ chủ đề như kho giữa kì II`));
const unitOf = (q) => { const m = /^Unit (\d+) · /.exec(q.topic); return m ? +m[1] : 0; };
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
// câu của mỗi đề cố định lấy từ kho (bản chép có src), để dùng chung với các bảng theo câu bên dưới
const NGUON = [[kho.filter((q) => q.src === S.de1), "Đề 1", S.de1], [kho.filter((q) => q.src === S.de2), "Đề 2", S.de2], [rieng, "câu riêng", S.pool]];
assert.deepEqual(NGUON.slice(0, 2).map(([d]) => d.length), [d1.n, d2.n], "kho có đủ câu của hai đề cố định");
NGUON.forEach(([d, at]) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, `${at}: đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `${at}: đúng ma trận ở chủ đề ${t}`));
  // trọng tâm Units 8–10: nhiều câu hơn Units 6–7
  const sau = d.filter((q) => unitOf(q) >= 8).length, truoc = d.filter((q) => unitOf(q) && unitOf(q) <= 7).length;
  assert.ok(sau > truoc, `${at}: Units 8–10 (${sau} câu) nhiều hơn Units 6–7 (${truoc} câu)`);
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = dem(kho, t, l);
  assert.ok(v[l - 1] ? o >= 2 * v[l - 1] : o === 0, `ô (${t}, mức ${l}) rút ${v[l - 1]} câu, kho có ${o}`);
}));

/* ---------- đoạn điền (Cloze) và bài đọc (Reading) ---------- */
const LD_CLOZE = "Read the text. Choose the best option for each numbered blank.", LD_READ = "Read the text. Then answer the questions.";
const DOAN = ["Cloze", "Reading"];
assert.ok(kho.filter((q) => DOAN.includes(q.topic)).every((q) => q.p) && kho.filter((q) => !DOAN.includes(q.topic)).every((q) => !q.p), "chỉ câu Cloze, Reading có đoạn đọc");
const soTu = (s) => String(s).split(/\s+/).filter(Boolean).length;
const dai9 = Math.max(...BANKS.filter((b) => /^ta9-/.test(b.id) && b.passages).flatMap((b) => Object.values(b.passages).map((ps) => soTu(ps.text))));
[S.de1, S.de2, S.pool].forEach((id) => DOAN.forEach((t) => {
  const qs = kho.filter((q) => q.topic === t && q.src === id), ps = [...new Set(qs.map((q) => q.p))];
  assert.equal(ps.length, 1, `${id}: đúng một đoạn ${t}`);
  assert.deepEqual(qs.map((q) => q.lv), [1, 2, 3], `${id}: đoạn ${t} 3 câu mức 1-2-3`);
}));
const ID_CU = new Set(BANKS.filter((b) => /^ta12-(ck1|gk2)-/.test(b.id) && b.passages).flatMap((b) => Object.keys(b.passages)));
Object.entries(PSG).forEach(([id, ps]) => {
  const qs = kho.filter((q) => q.p === id), w = soTu(ps.text);
  assert.ok(!ID_CU.has(id), "mã đoạn trùng mã đoạn của kho cuối kì I, giữa kì II (cùng file): " + id);
  assert.equal(qs.length, 3, "đoạn " + id + " có 3 câu");
  if (qs[0].topic === "Cloze") {
    assert.equal(ps.title, LD_CLOZE, "lời dặn của đoạn điền " + id);
    assert.deepEqual(ps.text.match(/\(\d\) ___/g), ["(1) ___", "(2) ___", "(3) ___"], `đoạn điền ${id}: chỗ trống (1), (2), (3) theo thứ tự`);
    qs.forEach((q, i) => assert.equal(q.q, `Choose the best option for blank (${i + 1}).`, `đoạn điền ${id}: câu ${i + 1} hỏi chỗ trống (${i + 1})`));
    assert.ok(w >= 60 && w <= 150, `đoạn điền ${id}: ${w} từ (60–150)`);
  } else {
    assert.equal(ps.title, LD_READ, "lời dặn của bài đọc " + id);
    assert.ok(!/___/.test(ps.text), "bài đọc không có chỗ trống: " + id);
    assert.ok(w > dai9 && w <= 320, `bài đọc ${id}: ${w} từ, phải dài hơn mọi bài đọc của các kho lớp 9 (${dai9} từ) và không quá 320 từ`);
  }
});
// câu của chỗ trống (k): câu trong đoạn có “(k) ___”
const cauTrong = (q) => { const k = /\((\d)\)/.exec(q.q)[1]; return PSG[q.p].text.split(/\n|(?<=[.!?])\s+/).find((c) => c.includes(`(${k}) ___`)).replace(`(${k}) ___`, "___"); };

/* ---------- dạng câu ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 6, "mỗi kho ít nhất 6 câu đúng/sai 4 ý (đoạn “Chung của các phiên lớp 12”)");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai: " + ten.get(q)); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
assert.ok(kho.every((q) => ["mc", "tf4", "fill", "order"].includes(q.type)), "chỉ dùng trắc nghiệm, đúng/sai 4 ý, trả lời ngắn (điền), sắp xếp");
["fill", "order"].forEach((t) => assert.ok(kho.some((q) => q.type === t), "có câu dạng " + t));
const LOI = /^Which part of the sentence is wrong\?/, GAN = /^Choose the sentence closest in meaning:/, NOI = /^Choose the sentence that best combines the two sentences:/;
assert.ok(kho.filter((q) => LOI.test(q.q)).length >= 3, "có câu tìm lỗi sai");
assert.ok(kho.filter((q) => GAN.test(q.q)).length >= 3, "có câu chọn câu đồng nghĩa (viết lại câu)");
assert.ok(kho.some((q) => NOI.test(q.q)), "có câu nối hai câu");
// sắp xếp câu thành đoạn văn, thư, hội thoại (dạng câu của đề thi tốt nghiệp): mỗi đề cố định và phần câu riêng đúng một câu, ở ô Vận dụng
const SX_CAU = /^Put the sentences in the correct order to make a (paragraph|letter|conversation)\.$/;
[S.de1, S.de2, S.pool].forEach((id) => {
  const qs = kho.filter((q) => q.src === id && q.type === "order" && SX_CAU.test(q.q));
  assert.equal(qs.length, 1, id + ": đúng một câu sắp xếp câu thành đoạn văn, thư, hội thoại"); assert.equal(qs[0].lv, 3, id + ": câu sắp xếp câu ở mức Vận dụng");
});
assert.equal(new Set(kho.filter((q) => SX_CAU.test(q.q)).map((q) => SX_CAU.exec(q.q)[1])).size, 3, "ba câu sắp xếp câu: một đoạn văn, một thư, một hội thoại");
// lời giải không nói “option A”, “the second sentence”: app xáo phương án, xáo các mảnh
kho.forEach((q) => assert.ok(!/\b(option|answer|sentence|statement)s? [A-D]\b|\bthe (first|second|third|fourth|last) (option|answer|sentence|statement|one)\b/i.test(q.x), "lời giải nhắc vị trí: " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau; một chỗ trống
const mc = kho.filter((q) => q.type === "mc");
mc.forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + ten.get(q));
  assert.ok(q.q.split("___").length - 1 <= 1, "nhiều nhất một chỗ trống: " + ten.get(q));
});
// đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn (tính cả khi bằng lựa chọn sai dài nhất,
// ngắn nhất, như tests/ta12-ck1.js)
const dai = mc.filter((q) => q.o[0].length >= Math.max(...q.o.slice(1).map((o) => o.length))).length;
const ngan = mc.filter((q) => q.o[0].length <= Math.min(...q.o.slice(1).map((o) => o.length))).length;
assert.ok(3 * dai <= mc.length, `đáp án là lựa chọn dài nhất ở ${dai}/${mc.length} câu nhiều lựa chọn`);
assert.ok(3 * ngan <= mc.length, `đáp án là lựa chọn ngắn nhất ở ${ngan}/${mc.length} câu nhiều lựa chọn`);
// nhãn “môn · chủ đề” hiện trên câu: đáp án không lặp chữ của nhãn (Rút ra N6), trừ khi mọi lựa chọn cùng có chữ đó
const nhan = (t) => t.toLowerCase().replace(/^unit \d+ · /, "").split(/[^a-z]+/).filter((w) => w.length > 3);
kho.filter((q) => q.type === "mc" || q.type === "fill").forEach((q) => {
  const da = String(q.type === "mc" ? q.o[0] : q.ans[0]).toLowerCase();
  nhan(q.topic).map((w) => w.replace(/(es|s)$/, "")).filter((w) => da.includes(w)).forEach((w) =>
    assert.ok(q.type === "mc" && q.o.every((o) => o.toLowerCase().includes(w)), `đáp án lặp chữ “${w}” của nhãn chủ đề: ` + ten.get(q)));
});
// câu sắp xếp câu: mỗi mảnh là một câu (chữ hoa đầu; dấu chấm cuối; lời chào của thư: dấu phẩy; lời kết của thư: tên người viết; lời của
// hội thoại: “Tên: …” kết thúc bằng dấu chấm, chấm hỏi, chấm than, hai người nói lần lượt, lời đầu là câu hỏi)
kho.filter((q) => q.type === "order").forEach((q) => {
  assert.ok(SX_CAU.test(q.q), "câu sắp xếp trong kho này là sắp xếp câu: " + ten.get(q));
  assert.ok(q.o.length >= 4 && q.o.length <= 8, "câu sắp xếp có 4–8 mảnh: " + ten.get(q));
  const loai = SX_CAU.exec(q.q)[1], cuoi = q.o.length - 1;
  if (loai === "conversation") {
    const ai = q.o.map((o) => { const m = /^([A-Z][a-z]+): [A-Z].*[.?!]$/.exec(o); assert.ok(m, "lời hội thoại “Tên: …”: " + o); return m[1]; });
    assert.equal(new Set(ai).size, 2, "hội thoại hai người: " + ten.get(q));
    ai.slice(1).forEach((a, i) => assert.notEqual(a, ai[i], "hai người nói lần lượt: " + ten.get(q)));
    assert.ok(/\?$/.test(q.o[0]), "lời đầu của hội thoại là câu hỏi: " + ten.get(q));
    return;
  }
  const thu = loai === "letter";
  q.o.forEach((o, i) => assert.ok(/^[A-Z]/.test(o) && (/\.$/.test(o) || (thu && i === 0 && /,$/.test(o)) || (thu && i === cuoi)), "mỗi mảnh là một câu: " + ten.get(q) + " → " + o));
  assert.ok(!/^(After|Moreover|Then|Finally|However|Next|At first|A year later|Now|There)\b/.test(q.o[0]), "mảnh đầu không mở bằng từ nối: " + ten.get(q));
  if (thu) assert.ok(/^Dear /.test(q.o[0]) && /\bYours (sincerely|faithfully), [A-Z]/.test(q.o[cuoi]), "thư mở bằng lời chào, kết bằng lời kết và tên: " + ten.get(q));
});
// câu tìm lỗi sai: các lựa chọn là các phần của câu trong ngoặc
kho.filter((q) => LOI.test(q.q)).forEach((q) => { const c = trongNgoac(q.q); q.o.forEach((o) => assert.ok(c.includes(o), `“${o}” không phải phần của câu: ` + ten.get(q))); });
// câu điền: lời dặn; câu chia động từ, dạng của từ có từ trong ngoặc ngay sau chỗ trống
const fills = kho.filter((q) => q.type === "fill");
fills.forEach((q) => {
  assert.equal(q.q.split("___").length, 2, "câu điền có đúng một chỗ trống: " + ten.get(q));
  assert.ok(/^Write the correct form of the (verb|word) in brackets\./.test(q.q), "lời dặn câu điền: " + ten.get(q));
  assert.ok(/___ \(([^)]+)\)/.test(q.q), "từ trong ngoặc ngay sau chỗ trống: " + ten.get(q));
});

/* ---------- Pronunciation: tính lại đáp án ---------- */
// Unit 10: Intonation in questions (revision) (khung Remember! tr. 130). Loại câu hỏi đọc từ chữ của câu: bắt đầu bằng từ để hỏi là câu
// hỏi Wh-; bắt đầu bằng trợ động từ, động từ khuyết thiếu là câu hỏi Yes/No, có or là câu hỏi lựa chọn. Câu hỏi đuôi cần biết người hỏi có
// chắc không, nên không dùng làm lựa chọn.
const WH = /^(What|Where|When|Why|Who|Whose|Which|How)\b/;
const TRO_HOI = /^(Do|Does|Did|Is|Are|Was|Were|Have|Has|Had|Can|Could|Will|Would|Shall|Should|May|Might)\b/;
const loaiCauHoi = (c) => {
  assert.ok(/\?$/.test(c), "câu hỏi kết thúc bằng dấu chấm hỏi: " + c);
  assert.ok(!/, \w+n't \w+\?$/.test(c), "không dùng câu hỏi đuôi làm lựa chọn: " + c);
  if (WH.test(c)) return "Wh";
  if (TRO_HOI.test(c)) return / or /.test(c) ? "lựa chọn" : "Yes/No";
  assert.fail("chưa phân loại được câu hỏi: " + c);
};
const CUOI_CAU = { Wh: "xuống", "Yes/No": "lên", "lựa chọn": "xuống" };
assert.equal(loaiCauHoi("Is it red or blue?"), "lựa chọn"); assert.equal(loaiCauHoi("Where is it?"), "Wh"); assert.equal(loaiCauHoi("Is it red?"), "Yes/No");
// Unit 8: Assimilation (khung Remember! tr. 102). Âm đầu và âm cuối (Anh – Anh) của từng từ; V là nguyên âm.
const AM = { clean: "k n", plate: "p t", warm: "w m", coat: "k t", fresh: "f ʃ", air: "V V", big: "b g", lake: "l k", ten: "t n", men: "m n",
  sat: "s t", by: "b V", the: "ð V", green: "g n", path: "p θ" };
const dau = (w) => AM[w].split(" ")[0], cuoiAm = (w) => AM[w].split(" ")[1];
const DOI = { n: "m", t: "p", d: "b" };
const dongHoa = (a, b) => (DOI[cuoiAm(a)] && ["p", "b", "m"].includes(dau(b))) || (cuoiAm(a) === "θ" && dau(b) === "s");
const choDongHoa = (cau) => {
  const w = cau.toLowerCase().replace(/[“”.,?!]/g, "").split(/\s+/);
  w.forEach((x) => assert.ok(AM[x], `chưa có âm đầu, âm cuối của “${x}”`));
  return w.slice(0, -1).map((x, i) => [x, w[i + 1]]).filter(([x, y]) => dongHoa(x, y)).map((c) => c.join(" "));
};
// ví dụ và câu luyện của sách (tr. 102): không dùng lại
const DONG_HOA_SACH = ["on purpose", "in bed", "in may", "hot potato", "not bad", "that man", "bad penny", "good boy", "red meat", "math solver",
  "than monkeys", "fed properly", "both species", "ten per"];
assert.deepEqual(choDongHoa("ten men"), ["ten men"], "choDongHoa tự thử"); assert.deepEqual(choDongHoa("warm coat"), [], "choDongHoa tự thử: /m/ không đổi");
// Unit 9: Sentence stress and rhythm (khung Remember! tr. 118): từ nội dung (động từ chính, danh từ, tính từ, trạng từ) được nhấn; từ ngữ
// pháp (liên từ, đại từ, giới từ, trợ động từ, mạo từ) không nhấn
const TU_LOAI = { found: "động từ chính", cousin: "danh từ", job: "danh từ", bank: "danh từ", has: "trợ động từ", at: "giới từ", my: "đại từ", a: "mạo từ" };
const NHAN = ["động từ chính", "danh từ", "tính từ", "trạng từ"];
let n = 0;
const daTinh = new Set(), loaiPA = new Map();
kho.filter((q) => q.topic === "Pronunciation").forEach((q) => {
  daTinh.add(q); n++;
  if (/^Which question usually has a (falling|rising) intonation at the end\?$/.test(q.q)) {
    const huong = /falling/.test(q.q) ? "xuống" : "lên";
    assert.deepEqual(q.o.filter((o) => CUOI_CAU[loaiCauHoi(o)] === huong), [q.o[0]], "đúng một câu hỏi có ngữ điệu cuối câu như đề hỏi: " + ten.get(q));
    loaiPA.set(q, "ngữ điệu"); return;
  }
  if (/^Which question usually rises on the first choice and falls at the end\?$/.test(q.q)) {
    assert.deepEqual(q.o.filter((o) => loaiCauHoi(o) === "lựa chọn"), [q.o[0]], "đúng một câu hỏi lựa chọn: " + ten.get(q));
    loaiPA.set(q, "ngữ điệu"); return;
  }
  if (/^In which phrase can assimilation happen between the two words\?$/.test(q.q)) {
    assert.deepEqual(q.o.filter((o) => choDongHoa(o).length), [q.o[0]], "đúng một cụm có đồng hóa âm: " + ten.get(q));
    const [a, b] = q.o[0].split(" ");
    assert.ok(q.x.includes(`/${cuoiAm(a)}/`) && q.x.includes(`/${dau(b)}/`) && q.x.includes(`/${DOI[cuoiAm(a)] || "s"}/`), "lời giải ghi âm trước, âm sau và âm đổi thành: " + ten.get(q));
    loaiPA.set(q, "đồng hóa"); return;
  }
  if (/^How many times can \/n\/, \/t\/ or \/d\/ change into \/m\/, \/p\/ or \/b\/ in this sentence\?/.test(q.q)) {
    const SO = ["zero", "one", "two", "three", "four", "five"], c = choDongHoa(trongNgoac(q.q));
    assert.equal(q.o[0], SO[c.length], "số chỗ đồng hóa tính lại khác: " + ten.get(q));
    c.forEach((x) => assert.ok(q.x.toLowerCase().includes(x), `lời giải ghi chỗ đồng hóa “${x}”: ` + ten.get(q)));
    loaiPA.set(q, "đồng hóa"); return;
  }
  if (/^Which word in this sentence is usually stressed\?/.test(q.q)) {
    const w = trongNgoac(q.q).toLowerCase().replace(/[.,!?]/g, "").split(" ");
    w.forEach((x) => assert.ok(TU_LOAI[x], `chưa có từ loại của “${x}”`));
    q.o.forEach((o) => assert.ok(w.includes(o), `“${o}” không có trong câu: ` + ten.get(q)));
    assert.deepEqual(q.o.filter((o) => NHAN.includes(TU_LOAI[o])), [q.o[0]], "đúng một lựa chọn là từ nội dung: " + ten.get(q));
    // trợ động từ có động từ chính theo sau, không viết tắt với not (Unit 5: trợ động từ được nhấn khi đó)
    w.forEach((x, i) => { if (TU_LOAI[x] === "trợ động từ") assert.equal(TU_LOAI[w[i + 1]], "động từ chính", "trợ động từ có động từ chính theo sau: " + ten.get(q)); });
    loaiPA.set(q, "trọng âm câu"); return;
  }
  assert.fail("câu Pronunciation chưa có cách tính: " + ten.get(q));
});
// mỗi đề một câu ngữ điệu (Biết) và một câu đồng hóa âm hay trọng âm câu (Hiểu); kho có đủ ba điểm âm của Unit 8–10
NGUON.forEach(([d, at]) => {
  const qs = d.filter((q) => q.topic === "Pronunciation");
  assert.deepEqual(qs.map((q) => q.lv), [1, 2], at + ": Pronunciation Biết, Hiểu");
  assert.equal(loaiPA.get(qs[0]), "ngữ điệu", at + ": câu Biết hỏi ngữ điệu (Unit 10)");
  assert.ok(["đồng hóa", "trọng âm câu"].includes(loaiPA.get(qs[1])), at + ": câu Hiểu hỏi đồng hóa âm (Unit 8) hay trọng âm câu (Unit 9)");
});
assert.deepEqual([...new Set(loaiPA.values())].sort(), ["ngữ điệu", "trọng âm câu", "đồng hóa"].sort(), "Pronunciation có đủ ngữ điệu, đồng hóa âm, trọng âm câu");
// câu đồng hóa âm: mỗi câu một bộ từ riêng, không dùng ví dụ, câu luyện của sách
{
  const cum = kho.filter((q) => loaiPA.get(q) === "đồng hóa").flatMap((q) => (/phrase/.test(q.q) ? q.o : [trongNgoac(q.q)]));
  const tu = cum.flatMap((c) => c.toLowerCase().replace(/[.,]/g, "").split(" ")).filter((w) => !["the", "by"].includes(w));
  assert.equal(new Set(tu).size, tu.length, "mỗi câu đồng hóa âm một bộ từ riêng: " + tu.join(" "));
  cum.forEach((c) => DONG_HOA_SACH.forEach((s) => assert.ok(!c.toLowerCase().includes(s), `“${s}” là ví dụ của sách: ${c}`)));
}
// đáp án Pronunciation không trùng đáp án câu Pronunciation của kho cuối kì I, giữa kì II (đề “Ôn chủ đề” rút chung)
{
  const cu = [CK1, GK2].flatMap((id) => bank(id).questions.filter((q) => q.topic === "Pronunciation").map((q) => q.o[0].toLowerCase()));
  kho.filter((q) => q.topic === "Pronunciation").forEach((q) => assert.ok(!cu.includes(q.o[0].toLowerCase()), "trùng đáp án câu Pronunciation kho cũ: " + ten.get(q)));
}

/* ---------- ngữ pháp: bộ kiểm tra ---------- */
const coCum = (s, c) => (" " + s.toLowerCase().replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ") + " ").includes(" " + c.toLowerCase() + " ");
const dien = (q, o) => q.q.replace(/^[^.]*\. (?=[A-Z])/, (m) => (/^(Write|Fill)/.test(m) ? "" : m)).replace("___", o);
const motLuaChon = (q, ok, at) => { const d = q.o.filter(ok); assert.equal(d.length, 1, (at || "đúng một lựa chọn đúng") + ": " + ten.get(q) + " → " + JSON.stringify(d)); return d[0]; };
// Unit 6: câu sai khiến (khung Remember! tr. 79): have + người (hay máy làm việc) + động từ nguyên thể; get + người + to-infinitive;
// have / get + vật + quá khứ phân từ. Bảng động từ (nguyên thể → quá khứ phân từ); NGUOI là người, máy làm việc, VAT là vật được làm.
const V6 = { spray: "sprayed", translate: "translated", carry: "carried", practise: "practised", paint: "painted", check: "checked" };
const DT6 = Object.keys(V6), PP6 = Object.values(V6);
const NGUOI = ["a drone", "a robot", "the team"];
const VAT = ["its website", "the classroom", "her new phone"];
const loiSK = (s) => {
  const l = s.toLowerCase().replace(/[“”.,!?]/g, " ").replace(/\s+/g, " ").trim(), loi = [];
  NGUOI.concat(VAT).forEach((o) => {
    const re = new RegExp("\\b(have|has|had|get|gets|got) " + o + " (to )?(\\w+)", "g"); let m;
    while ((m = re.exec(l))) {
      const get = /^g/.test(m[1]), nguoi = NGUOI.includes(o), v = m[3];
      const dang = m[2] ? (DT6.includes(v) ? "to-infinitive" : "?") : DT6.includes(v) ? "động từ nguyên thể" : PP6.includes(v) ? "quá khứ phân từ" : /ing$/.test(v) ? "V-ing" : "?";
      const can = nguoi ? (get ? "to-infinitive" : "động từ nguyên thể") : "quá khứ phân từ";
      if (dang === "?") loi.push(`chưa có “${v}” trong bảng động từ`);
      else if (dang !== can) loi.push(`${m[1]} + ${o} + ${can}, không phải ${dang}`);
    }
  });
  return loi;
};
// Unit 7: mệnh đề trạng ngữ chỉ cách thức, kết quả (khung Remember! tr. 91): so + tính từ / trạng từ + that; such + (a / an) + tính từ +
// danh từ + that; as if + dạng quá khứ cho việc không có thật
const loiKQ = (s) => {
  const l = s.toLowerCase(), loi = [];
  if (/\btoo \w+ that\b/.test(l)) loi.push("too … that: dùng so … that");
  if (/\bso (a|an) \w+/.test(l)) loi.push("so + a / an: dùng such a / an");
  const m = /\bsuch (\w+)(?: (\w+))? that\b/.exec(l);
  if (m && !["a", "an"].includes(m[1]) && !m[2]) loi.push("such + tính từ (không có danh từ): dùng so");
  return loi;
};
const ketQua = (s) => /\b(so (?:many|much)(?: [\w-]+){1,2}|so [\w-]+|such (?:a|an)(?: [\w-]+){2,3}|such(?: [\w-]+){2}) that\b/.test(s.toLowerCase());
const QUA_KHU = ["owned", "knew", "were", "had"];
const asIfQK = (s) => { const m = /\bas if (?:he|she|it|they|we|you|i) (\w+)\b/i.exec(s); return !!m && QUA_KHU.includes(m[1].toLowerCase()); };
const loaiMD = (s) => {
  const l = s.toLowerCase();
  if (/\bas if\b/.test(l)) return "cách thức";
  if (/\bso (\w+|many \w+|much \w+) that\b|\bsuch\b.* that\b/.test(l)) return "kết quả";
  if (/\bso that\b/.test(l)) return "mục đích";
  if (/\b(because|since)\b/.test(l)) return "nguyên nhân";
  if (/\b(although|though)\b/.test(l)) return "nhượng bộ";
  return "không có";
};
// Unit 8: mệnh đề chỉ điều kiện, so sánh (khung Remember! tr. 103): unless = if … not nên động từ sau unless ở thể khẳng định; as + tính
// từ + as; more / -er + than
const loiDK = (s) => (/\bunless\b[^,.]*\b(don't|doesn't|didn't|not|isn't|aren't|won't|never)\b/i.test(s) ? ["unless + động từ phủ định: unless đã mang nghĩa if … not"] : []);
const loiSS = (s) => {
  const l = s.toLowerCase(), loi = [];
  const a = /\bas (\w+)\b(.*?)\b(than|as)\b/.exec(l); if (a && a[3] === "than") loi.push("as … as, không phải as … than");
  const b = /\bmore (\w+)\b(.*?)\b(than|as)\b/.exec(l); if (b && b[3] === "as" && !/\bas (\w+) as\b/.test(l)) loi.push("more … than, không phải more … as");
  if (/\bmore \w+er\b/.test(l)) loi.push("more + tính từ -er");
  return loi;
};
// chiều so sánh độ khó thật với điều nhiều người nghĩ: +1 khó hơn người ta nghĩ, −1 dễ hơn, 0 như nhau
const KHO = { easy: -1, hard: 1, easier: -1, harder: 1 };
const doKho = (s) => {
  const l = s.toLowerCase(); let m;
  if ((m = /\bis not as (easy|hard) as many people think\b/.exec(l))) return -KHO[m[1]];
  if ((m = /\bis as (easy|hard) as many people think\b/.exec(l))) return 0;
  if ((m = /\bis (easier|harder) than many people think\b/.exec(l))) return KHO[m[1]];
  if ((m = /\bmany people think .* is (easier|harder) than it is\b/.exec(l))) return -KHO[m[1]];
  return null;
};
// Unit 9: cụm động từ ba từ (khung Remember! tr. 119 và các trang của Unit 9): cụm → nghĩa
const PV3 = { "live up to": "đáp ứng kì vọng", "cut down on": "giảm bớt", "get on with": "quan hệ tốt", "put up with": "chịu đựng", "go in for": "tham gia, thích",
  "get through to": "liên lạc được", "look forward to": "mong chờ", "keep up with": "theo kịp", "walk away from": "bỏ đi khỏi", "look down on": "coi thường",
  "come up with": "nghĩ ra" };
const DANG_DT = { get: ["get", "gets", "got", "getting"], put: ["put", "puts", "putting"], look: ["look", "looks", "looked", "looking"], go: ["go", "goes", "went", "going"],
  cut: ["cut", "cuts", "cutting"], live: ["live", "lives", "lived", "living"], keep: ["keep", "keeps", "kept", "keeping"], come: ["come", "comes", "came", "coming"],
  walk: ["walk", "walks", "walked", "walking"] };
const NGUYEN_THE = ["hear", "meet", "see", "start", "work"];
const loiPV = (s) => {
  const w = s.toLowerCase().replace(/[.,!?]/g, "").split(/\s+/), loi = [];
  for (let i = 0; i + 2 < w.length; i++) {
    const g = Object.keys(DANG_DT).find((k) => DANG_DT[k].includes(w[i])); if (!g) continue;
    const cung = Object.keys(PV3).filter((c) => c.split(" ")[0] === g && c.split(" ")[1] === w[i + 1]);
    if (!cung.length) continue;
    const cum = g + " " + w[i + 1] + " " + w[i + 2];
    if (!PV3[cum]) { loi.push(`${w[i]} ${w[i + 1]} ${w[i + 2]}: dùng ${cung.join(" / ")}`); continue; }
    if (cum === "look forward to" && NGUYEN_THE.includes(w[i + 3])) loi.push("look forward to + V-ing, không phải động từ nguyên thể");
  }
  return loi;
};
// Unit 10: câu tường thuật mệnh lệnh, yêu cầu, lời mời giúp, lời khuyên (khung Remember! tr. 131): tell, ask, advise… + tân ngữ +
// (not) to-infinitive; offer, agree, propose, demand + to-infinitive, không có tân ngữ; say không có tân ngữ trực tiếp là người
const CAN_TAN = ["tell", "told", "ask", "asked", "advise", "advised", "order", "ordered", "remind", "reminded", "warn", "warned", "encourage",
  "encouraged", "invite", "invited", "persuade", "persuaded", "instruct", "instructed"];
const KHONG_TAN = ["offer", "offered", "agree", "agreed", "propose", "proposed", "demand", "demanded"];
const TAN = ["us", "me", "him", "her", "them", "you", "my grandfather"];
const loiTT = (s) => {
  const l = s.toLowerCase().replace(/[“”.,!?]/g, " ").replace(/\s+/g, " "), loi = [];
  let m;
  const reTan = new RegExp("\\b(" + CAN_TAN.join("|") + ") (" + TAN.join("|") + ") (\\S+)(?: (\\S+))?", "g");
  while ((m = reTan.exec(l))) {
    if (m[3] === "to" || (m[3] === "not" && m[4] === "to")) continue;
    loi.push(`${m[1]} + ${m[2]} + (not) to-infinitive, không phải “${m[3]}”`);
  }
  const reKhong = new RegExp("\\b(" + KHONG_TAN.join("|") + ") (" + TAN.join("|") + ") to\\b", "g");
  while ((m = reKhong.exec(l))) loi.push(`${m[1]} + to-infinitive, không có tân ngữ “${m[2]}”`);
  if (/\bsaid (us|me|him|her|them)\b/.test(l)) loi.push("said + người: dùng told + người hoặc said to + người");
  return loi;
};
// tự thử các bộ kiểm tra với câu cố ý viết sai
assert.ok(loiSK("We had a robot to carry the boxes.").length && !loiSK("We had a robot carry the boxes.").length && loiSK("I got its website translate.").length, "loiSK tự thử");
assert.ok(loiKQ("It was so a long film that we slept.").length && loiKQ("The film was such long that we slept.").length && !loiKQ("It was such a long film that we slept.").length, "loiKQ tự thử");
assert.ok(ketQua("He spoke so fast that we got lost.") && !ketQua("He spoke so fast so we got lost."), "ketQua tự thử");
assert.ok(asIfQK("He talks as if he owned the place.") && !asIfQK("He talks as if he owns the place."), "asIfQK tự thử");
assert.ok(loiDK("Unless you don't hurry, you will miss the bus.").length && !loiDK("Unless you hurry, you will miss the bus.").length && !loiDK("We will not go unless it stops raining.").length, "loiDK tự thử");
assert.ok(loiSS("Cats are as fast than dogs.").length && loiSS("Cats need more food as dogs do.").length && !loiSS("Cats are as fast as dogs.").length && !loiSS("Cats need more food than dogs do.").length, "loiSS tự thử");
assert.equal(doKho("Running is not as easy as many people think."), 1); assert.equal(doKho("Running is easier than many people think."), -1);
assert.ok(loiPV("We cut down with sugar.").length && !loiPV("We cut down on sugar.").length && loiPV("I look forward to see you.").length && !loiPV("I look forward to seeing you.").length, "loiPV tự thử");
assert.ok(loiTT("She told me don't go.").length && loiTT("She offered me to help.").length && loiTT("She said us to wait.").length && !loiTT("She told me not to go.").length && !loiTT("She offered to help.").length, "loiTT tự thử");

/* ---------- câu khác của Unit: bảng ---------- */
// nghĩa của từ trong câu (gần nghĩa, trái nghĩa): từ được hỏi → đáp án
const NGHIA = { spread: { gan: "travel" }, vulnerable: { gan: "easily harmed" }, rare: { nguoc: "plentiful", gan: "unusual" }, broaden: { gan: "widen" } };
// họ từ: từ trong ngoặc → đáp án; chỗ trống cần từ loại theo chữ trước, sau nó
const HO_TU = { effort: { d: "effortlessly", loai: "trạng từ", cho: /\bmoves ___ \(effort\) around\b/ }, invent: { d: "inventor", loai: "danh từ chỉ người", cho: /\bThe young ___ \(invent\) of\b/ },
  passion: { d: "passionate", loai: "tính từ", cho: /\bis very ___ \(passion\) about\b/ } };
// Everyday English theo cụm của sách: bày tỏ sự quan tâm (Unit 8, tr. 108–109), bắt chuyện (Unit 7, tr. 97), cảm ơn và đáp lời cảm ơn
// (Unit 10, tr. 136–137)
const QUAN_TAM = /\b(Is (something|anything) wrong|What's the matter|What's up|Are you (all right|OK)|Has something happened)\?$/;
const BAT_CHUYEN = /^(Have you (seen|heard|watched|read)|Did you (catch|hear|see)|How was your|What a|Lovely|Nice|I love your)\b.*\?$/;
const CAM_ON = /^(I'm (so|really) grateful|I really appreciate|I can't thank you enough|Thank you|Thanks|Many thanks)\b/;
const NHAN_CAM_ON = /^(You're welcome|It's my pleasure|My pleasure|No problem|Don't mention it|Glad to help)\b/;
// biểu đồ tròn: số liệu trong đề → từng ý tính lại
const bieuDo = (q) => {
  const so = {}; (q.q.match(/([A-Za-z][A-Za-z ]+): (\d+)%/g) || []).forEach((x) => { const m = /([A-Za-z][A-Za-z ]+): (\d+)%/.exec(x); so[m[1].trim().toLowerCase()] = +m[2]; });
  assert.equal(sum(Object.values(so)), 100, "các phần của biểu đồ cộng lại 100%: " + ten.get(q));
  const ten2 = (s) => { const k = Object.keys(so).find((x) => s.toLowerCase().includes(x)); assert.ok(k, "không thấy phần “" + s + "” trong số liệu"); return so[k]; };
  return q.o.map((o) => {
    let m;
    if ((m = /^(.+) came ahead of (.+)\.$/.exec(o))) return ten2(m[1]) > ten2(m[2]);
    if ((m = /^(.+) took almost half of the answers\.$/.exec(o))) return ten2(m[1]) >= 40 && ten2(m[1]) < 50;
    if ((m = /^(.+) accounted for a fifth of the answers\.$/.exec(o))) return ten2(m[1]) === 20;
    if ((m = /^(.+) and (.+) together made up more than half of the answers\.$/.exec(o))) return ten2(m[1]) + ten2(m[2]) > 50;
    assert.fail("ý chưa có cách tính: " + o);
  });
};
// Cloze: cụm từ cố định (chữ trước, sau chỗ trống → từ đúng); liên từ theo quan hệ ý
const CUM = { "work ___ a partner": "with", "ranging ___ a bakery to": "from", "are taught ___ volunteers": "by" };
const QH = { if: "điều kiện", unless: "điều kiện phủ định", although: "trái ngược", whether: "lựa chọn", instead: "thay thế", otherwise: "điều kiện phủ định",
  however: "trái ngược", "for example": "ví dụ", so: "kết quả", because: "nguyên nhân", "in order to": "mục đích", "because of": "nguyên nhân",
  "instead of": "thay thế", "in spite of": "nhượng bộ" };
const lienTu = (o) => { const l = o.toLowerCase(); return Object.keys(QH).filter((k) => l === k || l.startsWith(k + " ")).sort((a, b) => b.length - a.length)[0]; };
const quanHe = (q, tinHieu, qh) => {
  assert.ok(tinHieu.test(q.p ? PSG[q.p].text : q.q), "tín hiệu của quan hệ " + qh + ": " + ten.get(q));
  q.o.forEach((o) => assert.ok(lienTu(o), "lựa chọn không có trong bảng liên từ: " + o));
  return motLuaChon(q, (o) => QH[lienTu(o)] === qh, "đúng một liên từ chỉ quan hệ " + qh);
};
// cụm động từ ba từ theo nghĩa: mọi lựa chọn là cụm trong bảng, đúng một cụm có nghĩa như tín hiệu trong câu, đoạn
const theoNghia = (q, tinHieu, y) => {
  assert.ok(tinHieu.test(q.p ? PSG[q.p].text : q.q), "tín hiệu nghĩa “" + y + "”: " + ten.get(q));
  q.o.forEach((o) => assert.ok(PV3[o], "lựa chọn không có trong bảng cụm động từ ba từ: " + o));
  return motLuaChon(q, (o) => PV3[o] === y, "đúng một cụm có nghĩa " + y);
};

/* ---------- tính lại đáp án ---------- */
// câu tìm lỗi: câu gốc sai theo bộ kiểm tra; sửa phần sai (o[0]) thành `sua` thì câu đúng, câu đã sửa có trong lời giải, mọi phần khác
// giữ nguyên trong câu đã sửa (phần sai là phần duy nhất phải sửa)
const kiemLoi = (q, loi, sua) => {
  const c = trongNgoac(q.q), moi = c.replace(q.o[0], sua);
  assert.ok(loi(c).length, "câu gốc phải sai: " + ten.get(q));
  assert.deepEqual(loi(moi), [], "câu đã sửa phải đúng: " + ten.get(q) + " → " + moi);
  q.o.slice(1).forEach((o) => assert.ok(moi.includes(o), `phần “${o}” không phải sửa: ` + ten.get(q)));
  assert.ok(q.x.includes(moi), "lời giải ghi câu đã sửa: " + ten.get(q));
  return q.o[0];
};
const NP = new Set(); // câu ngữ pháp của Unit 6–10
const CHECKS = [
  // Unit 6: câu sai khiến (ô Hiểu)
  { has: "the farmer has a drone ___", np: 1, right: (q) => motLuaChon(q, (o) => !loiSK(dien(q, o)).length) },
  { has: "got its website ___ (translate)", np: 1, right: (q) => {
    const c = (f) => dien(q, f).replace(" (translate)", "");
    assert.deepEqual(loiSK(c(q.ans[0])), []); ["translate", "to translate", "translating"].forEach((f) => assert.ok(loiSK(c(f)).length, "dạng khác phải sai: " + f));
    return q.ans[0];
  } },
  { has: "The restaurant has a robot carry", np: 1, right: (q) => q.o.map((o) => !loiSK(o).length) },
  // Unit 7: mệnh đề chỉ cách thức, kết quả (ô Vận dụng)
  { has: "talk show was such interesting", np: 1, right: (q) => kiemLoi(q, loiKQ, "so interesting") },
  { has: "He doesn't own the TV station, but he behaves that way", np: 1, right: (q) => {
    const g = trongNgoac(q.q);
    assert.ok(/doesn't own the TV station/.test(g) && /behaves that way/.test(g), "câu gốc: không có thật (anh ấy không sở hữu đài)");
    // lựa chọn khẳng định he owns thì trái với câu gốc; so that là mục đích; as if + dạng quá khứ là cách thức, việc không có thật
    return motLuaChon(q, (o) => loaiMD(o) === "cách thức" && asIfQK(o) && !/\bhe owns\b/.test(o) && o.includes("gives orders to the camera crew"));
  } },
  { has: "The radio host spoke very fast. Many listeners", np: 1, right: (q) => motLuaChon(q, (o) => !loiKQ(o).length && ketQua(o) && o.includes("many listeners missed his main points")) },
  // Unit 8: mệnh đề chỉ điều kiện, so sánh (ô Vận dụng)
  { has: "Unless people don't stop buying ivory", np: 1, right: (q) => kiemLoi(q, loiDK, "stop") },
  { has: "Many people think protecting a species is easy", np: 1, right: (q) => {
    assert.equal(doKho("Many people think protecting a species is easy, but it is actually much harder.".replace(/^Many people think (.*) is easy, but it is actually much harder\.$/, "$1 is harder than many people think.")), 1, "câu gốc: thật ra khó hơn người ta nghĩ");
    return motLuaChon(q, (o) => !loiSS(o).length && doKho(o) === 1);
  } },
  { has: "Bats are as useful to farmers", np: 1, right: (q) => q.o.map((o) => !loiDK(o).length && !loiSS(o).length) },
  // Unit 9: cụm động từ ba từ (ô Hiểu)
  { has: "finds it easy to ___ his new colleagues", np: 1, right: (q) => theoNghia(q, /help each other and often have lunch together/, "quan hệ tốt") },
  { has: "Bao has decided to ___ snacks", np: 1, right: (q) => theoNghia(q, /To save money/, "giảm bớt") },
  { has: "I'm looking forward to hear", np: 1, right: (q) => q.o.map((o) => !loiPV(o).length) },
  // Unit 10: câu tường thuật (ô Vận dụng)
  { has: "the librarian said to us", np: 1, right: (q) => {
    const phuDinh = /^Don't\b/.test(trongNgoac(q.q));
    assert.ok(phuDinh, "câu gốc là mệnh lệnh phủ định");
    return motLuaChon(q, (o) => !loiTT(o).length && /\bnot to\b/.test(o) === phuDinh && /\btold us\b/.test(o));
  } },
  { has: "my aunt offered me to cook", np: 1, right: (q) => kiemLoi(q, loiTT, "offered to cook") },
  { has: "advised my grandfather ___ (not / sit)", np: 1, right: (q) => {
    const c = (f) => dien(q, f).replace(" (not / sit)", "");
    assert.deepEqual(loiTT(c(q.ans[0])), []); assert.ok(/\bnot\b/.test(q.ans[0]), "từ trong ngoặc có not: lời khuyên phủ định");
    ["not sit", "don't sit", "not sitting"].forEach((f) => assert.ok(loiTT(c(f)).length, "dạng khác phải sai: " + f));
    return q.ans[0];
  } },
  // câu khác của Unit: nghĩa của từ, dạng của từ, Everyday English, biểu đồ, sắp xếp câu
  ...Object.keys(NGHIA).map((w) => ({ has: `meaning to “${w}”`, right: (q) => {
    const nguoc = /opposite in meaning/.test(q.q), d = NGHIA[w][nguoc ? "nguoc" : "gan"];
    assert.ok(new RegExp("\\b" + w + "\\b").test(trongNgoac(q.q.replace(/^[^:]*: /, ""))), "câu ví dụ có từ được hỏi: " + ten.get(q));
    assert.ok(q.o.includes(d), "có lựa chọn đúng theo bảng: " + ten.get(q));
    if (nguoc) assert.ok(q.o.includes(NGHIA[w].gan), "câu trái nghĩa có lựa chọn gần nghĩa làm bẫy: " + ten.get(q));
    return d;
  } })),
  ...Object.entries(HO_TU).map(([w, h]) => ({ has: `___ (${w})`, right: (q) => {
    assert.ok(h.cho.test(q.q), `chỗ trống cần ${h.loai}: ` + ten.get(q));
    assert.ok(q.x.includes(`${w} → ${h.d}`), "lời giải ghi họ từ: " + ten.get(q));
    return h.d;
  } })),
  { has: "What is the most suitable way to express concern?", right: (q) => motLuaChon(q, (o) => QUAN_TAM.test(o)) },
  { has: "start some small talk", right: (q) => motLuaChon(q, (o) => BAT_CHUYEN.test(o)) },
  { has: "What is the most suitable thing for Mai to say to her teacher?", right: (q) => {
    q.o.slice(1).forEach((o) => assert.ok(NHAN_CAM_ON.test(o), "lựa chọn sai là lời đáp lời cảm ơn: " + o));
    return motLuaChon(q, (o) => CAM_ON.test(o) && !NHAN_CAM_ON.test(o));
  } },
  { has: "What is the most suitable reply for Linh?", right: (q) => {
    assert.ok(/“Thanks a million!”/.test(q.q), "Nam cảm ơn Linh");
    q.o.slice(1).forEach((o) => assert.ok(CAM_ON.test(o), "lựa chọn sai là lời cảm ơn: " + o));
    return motLuaChon(q, (o) => NHAN_CAM_ON.test(o));
  } },
  { has: "A survey asked 400 adults", right: (q) => bieuDo(q) },
  { has: "", order: "A smart speaker waits quietly", right: (q) => {
    assert.ok(/^Then\b/.test(q.o[1]) && /^There,/.test(q.o[2]) && /^Next\b/.test(q.o[3]) && /^Finally\b/.test(q.o[q.o.length - 1]), "Then, There, Next, Finally theo thứ tự các bước");
    return null;
  } },
  { has: "", order: "Dear Ms Hanh,", right: (q) => { assert.ok(/^I am writing to\b/.test(q.o[1]) && /^I have attached my CV\b/.test(q.o[q.o.length - 3]) && /^I would be grateful\b/.test(q.o[q.o.length - 2]), "thư: lí do viết ở đầu, CV rồi lời đề nghị ngay trước lời kết"); return null; } },
  { has: "", order: "Minh: Could you explain what a trial shift is?", right: (q) => {
    assert.ok(/afternoon/.test(q.o[1]) && /that afternoon\?$/.test(q.o[2]) && /^Nga: Yes\b/.test(q.o[3]), "câu hỏi về “that afternoon” ngay sau lời giải thích có buổi chiều, được trả lời ngay sau");
    return null;
  } },
  // Cloze
  ...["bird-count", "job-shadowing", "evening-classes"].map((pp) => ({ has: "", p: pp, k: 1, right: (q) => {
    const c = Object.keys(CUM).find((x) => PSG[q.p].text.includes(x.replace("___", "(1) ___"))); assert.ok(c, "chỗ trống (1) là cụm từ cố định trong bảng: " + q.p);
    return CUM[c];
  } })),
  { has: "", p: "bird-count", k: 2, right: (q) => quanHe(q, /\(2\) ___ it rains heavily on Saturday, we will move the count/, "điều kiện") },
  { has: "", p: "bird-count", k: 3, right: (q) => quanHe(q, /You do not need to bring your own equipment\. \(3\) ___, we will lend/, "thay thế") },
  { has: "", p: "job-shadowing", k: 2, right: (q) => theoNghia(q, /\(2\) ___ three ideas/, "nghĩ ra") },
  { has: "", p: "job-shadowing", k: 3, right: (q) => quanHe(q, /Each workplace can take only two students, \(3\) ___\./, "kết quả") },
  { has: "", p: "evening-classes", k: 2, right: (q) => motLuaChon(q, (o) => !loiTT(cauTrong(q).replace("___", o)).length) },
  { has: "", p: "evening-classes", k: 3, right: (q) => quanHe(q, /\(3\) ___ help parents with young children/, "mục đích") }
];
CHECKS.forEach((c) => {
  let q;
  if (c.order) { const m = kho.filter((x) => x.type === "order" && x.o[0].startsWith(c.order)); assert.equal(m.length, 1, "câu sắp xếp mở đầu “" + c.order + "”"); q = m[0]; }
  else if (c.p) { const m = kho.filter((x) => x.p === c.p && x.q === `Choose the best option for blank (${c.k}).`); assert.equal(m.length, 1, `chỗ trống (${c.k}) của ${c.p}`); q = m[0]; }
  else q = cauCua(c.has);
  const want = c.right(q), at = ten.get(q) + " (" + (c.has || c.order || c.p + " " + c.k) + ")";
  assert.ok(!daTinh.has(q), "câu được tính hai lần: " + at);
  daTinh.add(q); n++;
  if (c.np) { assert.ok(unitOf(q) >= 6 && unitOf(q) <= 10, "câu ngữ pháp của Unit 6–10: " + at); NP.add(q); }
  if (want === null) return;
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
});
// câu từ vựng mức Biết của Unit 6–10: đáp án là từ của Unit (TU), mỗi từ đúng một câu
const TU = { 6: ["data", "evolution", "digital"], 7: ["loudspeaker", "fake news", "audio"],
  8: ["captivity", "spawning ground", "extinct", "debris", "enclosure", "marine"],
  9: ["obsolete", "soft skills", "in demand", "childminder", "take into account", "work experience"], 10: ["night school", "well-rounded", "distraction"] };
const tuVung = kho.filter((q) => unitOf(q) && !daTinh.has(q));
tuVung.forEach((q) => {
  assert.ok(q.type === "mc" && q.lv === 1, "câu chưa tính lại đáp án (chỉ câu từ vựng mức Biết được bỏ qua): " + ten.get(q));
  assert.equal(TU[unitOf(q)].filter((t) => q.o[0].toLowerCase() === t).length, 1, "đáp án câu từ vựng là từ của Unit trong TU: " + ten.get(q));
});
Object.entries(TU).forEach(([u, ws]) => ws.forEach((t) => assert.equal(tuVung.filter((q) => unitOf(q) === +u && q.o[0].toLowerCase() === t).length, 1, `từ “${t}” của Unit ${u}: đúng một câu`)));
assert.equal(kho.filter((q) => q.topic === "Reading" || daTinh.has(q) || tuVung.includes(q)).length, kho.length, "câu nào cũng đã tính lại (trừ câu từ vựng, Reading)");
// ô rút 2 câu (Biết của Unit 8, 9): đáp án câu này không là lựa chọn sai của câu kia (Rút ra N12-ck1-ta)
[8, 9].forEach((u) => {
  const qs = kho.filter((q) => unitOf(q) === u && q.lv === 1), da = qs.map((q) => q.o[0].toLowerCase());
  qs.forEach((q) => q.o.slice(1).forEach((o) => assert.ok(!da.includes(o.toLowerCase()), `lựa chọn sai “${o}” là đáp án câu khác cùng ô: ` + ten.get(q))));
});
// mỗi điểm ngữ pháp chỉ ở một ô rút 1 câu (như tests/ta9-ck2.js): Unit 6, 9 ở ô Hiểu, Unit 7, 8, 10 ở ô Vận dụng; mỗi đề cố định và phần
// câu riêng đúng một câu ngữ pháp mỗi Unit; ô Biết chỉ có câu từ vựng; mỗi câu ngữ pháp một đáp án riêng
const O_NP = { 6: 2, 7: 3, 8: 3, 9: 2, 10: 3 };
Object.entries(O_NP).forEach(([u, l]) => {
  const t = `Unit ${u} · ${UNITS[u]}`;
  kho.filter((q) => q.topic === t && q.lv === 1).forEach((q) => assert.ok(tuVung.includes(q), `ô (${t}, Biết) chỉ có câu từ vựng: ` + ten.get(q)));
  kho.filter((q) => q.topic === t && NP.has(q)).forEach((q) => assert.equal(q.lv, l, `câu ngữ pháp của ${t} ở ô mức ${l}: ` + ten.get(q)));
  NGUON.forEach(([, at, id]) => assert.equal(kho.filter((q) => q.src === id && q.topic === t && NP.has(q)).length, 1, `${at}: ${t} đúng một câu ngữ pháp`));
});
{ const da = [...NP].map((q) => String(q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.o.join() : q.o[0]).toLowerCase()); assert.equal(new Set(da).size, da.length, "mỗi câu ngữ pháp một đáp án riêng"); }
// Cloze dùng điểm ngữ pháp, từ của Unit 8–10 (điều kiện, cụm động từ ba từ, câu tường thuật)
assert.ok(["bird-count", "job-shadowing", "evening-classes"].every((pp) => kho.some((q) => q.p === pp && q.lv === 2)), "mỗi đoạn điền có chỗ trống mức Hiểu");

/* ---------- Unit 6, 7 (phần ôn) so với kho giữa kì II: đáp án, đề bài khác câu cùng Unit (đoạn “Chung của các phiên lớp 12 cuối năm”) ---------- */
const goc = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
const LOI_DAN = ["Write the correct form of the verb in brackets.", "Write the correct form of the word in brackets.", "Fill in the blank with one word.",
  "Put the sentences in the correct order to make a paragraph.", "Put the sentences in the correct order to make a letter.",
  "Put the sentences in the correct order to make a conversation.", LD_READ, LD_CLOZE, "Read the text again. Is each sentence true or false?",
  "Is each sentence true or false?",
  "Which part of the sentence is wrong?", "Choose the sentence closest in meaning:", "Choose the sentence that best combines the two sentences:",
  "Is each sentence grammatically correct?", "Choose the best option for blank (1).", "Choose the best option for blank (2).",
  "Choose the best option for blank (3).", "Which question usually has a falling intonation at the end?", "Which question usually has a rising intonation at the end?",
  "Which question usually rises on the first choice and falls at the end?", "In which phrase can assimilation happen between the two words?",
  "How many times can /n/, /t/ or /d/ change into /m/, /p/ or /b/ in this sentence?", "Which word in this sentence is usually stressed?",
  "Choose the answer closest in meaning to", "Choose the answer opposite in meaning to", "in this sentence:", "Which word is pronounced the same as",
  "In which phrase can a linking /r/ appear between the two words?", "In which sentence can a linking /r/ appear between two words?",
  "How many linking /r/ sounds can appear in this sentence?"];
const boLoiDan = (s) => LOI_DAN.reduce((a, l) => a.split(l).join(" | "), String(s));
const gk2 = bank(GK2).questions;
{
  const da = (q) => String(q.type === "mc" ? q.o[0] : q.type === "fill" ? q.ans[0] : q.type === "tf4" ? JSON.stringify(q.a) + q.o.join(" ") : q.o.join(" ")).toLowerCase();
  const chuoi6 = (s) => { const w = boLoiDan(s).toLowerCase().replace(/[^a-z'|]+/g, " ").split(/\s+/).filter(Boolean), r = []; for (let i = 0; i + 6 <= w.length; i++) if (!w.slice(i, i + 6).includes("|")) r.push(w.slice(i, i + 6).join(" ")); return r; };
  [6, 7].forEach((u) => {
    const cu = gk2.filter((q) => unitOf(q) === u), daCu = new Set(cu.map(da)), deCu = new Set(cu.map((q) => goc(q.q + (q.o ? q.o.join("|") : ""))));
    const c6 = new Set(cu.flatMap((q) => chuoi6([q.q].concat(q.o || []).join(" | "))));
    kho.filter((q) => unitOf(q) === u).forEach((q) => {
      assert.ok(!daCu.has(da(q)), `trùng đáp án câu Unit ${u} của kho giữa kì II: ` + ten.get(q));
      assert.ok(!deCu.has(goc(q.q + (q.o ? q.o.join("|") : ""))), `trùng đề bài câu Unit ${u} của kho giữa kì II: ` + ten.get(q));
      chuoi6([q.q].concat(q.o || []).join(" | ")).forEach((c) => assert.ok(!c6.has(c), `chuỗi 6 từ “${c}” của đề bài có ở câu Unit ${u} kho giữa kì II: ` + ten.get(q)));
    });
    // từ của câu từ vựng khác kho giữa kì II
    const tuCu = cu.filter((q) => q.lv === 1 && q.type === "mc").map((q) => q.o[0].toLowerCase());
    TU[u].forEach((t) => assert.ok(!tuCu.includes(t), `từ “${t}” đã là đáp án câu từ vựng Unit ${u} của kho giữa kì II`));
  });
}

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8) ---------- */
{
  const deBai = kho.map((q) => ({ at: ten.get(q), k: goc(q.q + (q.o ? q.o.join("|") : "")) }));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- rút thử ---------- */
const seen = new Set();
for (let k = 0; k < 400; k++) {
  const d = Quiz.draw(p);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, p.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  DOAN.forEach((t) => assert.equal(new Set(d.questions.filter((q) => q.topic === t).map((q) => q.p)).size, 1, t + ": rút trọn một đoạn"));
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

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Như tests/ta12-gk2.js. Rút cùng lúc: khác chủ đề, cùng chủ đề khác mức, hoặc cùng ô mà ô rút từ 2 câu (ô Biết của Unit 8, 9); câu của
   hai đoạn khác nhau không bao giờ rút cùng lúc. Chữ cần dò của đáp án: đáp án một từ thì từ đó (từ ngữ pháp như at, if, so chỉ dò ở câu
   cùng chủ đề); đáp án 2–3 từ thì cả cụm; đáp án là câu thì các chuỗi 3 từ liền nhau không có ở lựa chọn sai nào. Đáp án câu Reading chỉ
   dò ở câu cùng đoạn; câu Pronunciation không dò (thấy từ ở câu khác không lộ cách đọc). Chữ của câu kia: đề bài, đáp án, lời giải, ý của
   câu đúng/sai, mảnh của câu sắp xếp, đoạn đọc (lựa chọn sai của câu trắc nghiệm không tính). Đáp án không lặp từ (trừ từ ngữ pháp) của
   chính đề bài câu có chỗ trống (Rút ra N12). */
const NGU_PHAP = new Set(("a an the of to in on at for from with by about and or but so than as if when while because before after is are was were be been am have has had do does did will would can could should must might may not no i you he she it we they me " +
  "him her us them my your his its our their this that these those there here what where who whose how which why yet since ago already " +
  "ever never just very too more most all some any one every each other also up out down off around away into over whether like").split(" "));
const tu = (s) => String(s).toLowerCase().replace(/[^a-z' ]+/g, " ").split(/\s+/).filter(Boolean).map((w) => w.replace(/'s$/, ""));
const goc1 = (w) => { w = w.replace(/ies$/, "y"); const d = ["ing", "ed", "es", "s", "e"].find((x) => w.endsWith(x) && w.length - x.length >= 4 && !/ss$/.test(w)); return d ? w.slice(0, -d.length) : w; };
const noi = (s) => " " + tu(s).map(goc1).join(" ") + " ";
const chuCua = (q, doan) => [q.q, q.x].concat(q.type === "mc" ? [q.o[0]] : q.o || [], q.ans || [], doan ? [doan.text] : []);
const cungLuc = (a, b) => a !== b && !(a.p && b.p && a.p !== b.p) && (a.topic !== b.topic || a.lv !== b.lv || M[a.topic][a.lv - 1] >= 2);
const canDo = (q) => {
  const raw = tu(q.type === "mc" ? q.o[0] : q.ans[0]), w = raw.map(goc1), sai = q.type === "mc" ? q.o.slice(1).map(noi) : [];
  return { raw, can: w.length >= 4 ? [...new Set(w.slice(0, -2).map((_, i) => w.slice(i, i + 3).join(" ")))].filter((c) => !sai.some((s) => s.includes(" " + c + " "))) : [w.join(" ")], nguPhap: raw.length === 1 && NGU_PHAP.has(raw[0]) };
};
// caDoan: đề “Ôn chủ đề” rút chung câu của các đoạn khác nhau (đáp án là từ ngữ pháp thì chỉ dò trong cùng đoạn)
const doLo = (qs, tenCau, cungLucFn = cungLuc, doanCua = (q) => PSG[q.p], caDoan = false) => {
  const ra = [];
  qs.forEach((q) => {
    if ((q.type !== "mc" && q.type !== "fill") || q.topic === "Pronunciation") return;
    const { raw, can, nguPhap } = canDo(q);
    if (/___/.test(q.q) && q.topic !== "Reading") {
      const de = new Set(tu(q.q.replace(/\([^)]*\)/g, " ")).map(goc1));
      raw.filter((x) => !NGU_PHAP.has(x)).map(goc1).filter((x) => de.has(x)).forEach((x) => ra.push(`${tenCau(q)} (chính đề bài): ${x}`));
    }
    qs.forEach((p2) => {
      if (!cungLucFn(q, p2) || (nguPhap && q.topic !== p2.topic) || (nguPhap && q.p && p2.p && q.p !== p2.p) || (!caDoan && q.topic === "Reading" && p2.p !== q.p)) return;
      const T = chuCua(p2, p2.p && p2.p !== q.p ? doanCua(p2) : null).map(noi).join("|");
      can.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
    });
  });
  return [...new Set(ra)];
};
const lo = doLo(kho, (q) => ten.get(q));
if (process.env.DO_LO) console.log("Đáp án có ở câu rút được cùng lúc (xem tay):\n" + lo.join("\n"));
const DA_XEM = [];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// đáp án câu điền (trừ từ ngữ pháp) không có ở lựa chọn, kể cả lựa chọn sai, của câu rút được cùng lúc: học sinh chép được chữ đúng
// (Phiên N9-gk1-ta)
fills.filter((q) => !canDo(q).nguPhap).forEach((q) => { const a = noi(q.ans[0]); kho.filter((o) => cungLuc(q, o) && o.o).forEach((o) => o.o.forEach((x) => assert.ok(!noi(x).includes(a), `lựa chọn “${x}” của ${ten.get(o)} có đáp án câu điền ${ten.get(q)}`))); });
// lời dặn (note) hiện ở màn mở đề (Rút ra RS9): không có đáp án câu nào
{
  const N = [d1.note, d2.note, p.note].map(noi).join("|");
  kho.filter((q) => (q.type === "mc" || q.type === "fill") && q.topic !== "Pronunciation").forEach((q) => { const { can, nguPhap } = canDo(q); if (!nguPhap) can.filter((c) => N.includes(" " + c + " ")).forEach((c) => assert.fail(`note có đáp án của ${ten.get(q)}: ${c}`)); });
}
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = cauCua("in ___ before they were moved"), b = cauCua("Typewriters became ___");
  const gia = Object.assign({}, b, { x: b.x + " Animals in captivity are not free." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => /: captivity$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
  const c = cauCua("To save money for his driving course"), e = cauCua("Our school wants students to be ___");
  const gia2 = Object.assign({}, e, { x: e.x + " They cut down on sugar." });
  assert.ok(doLo([c, gia2], (q) => q.topic).some((s) => /: cut down on$/.test(s)), "bộ dò phải bắt được cụm đáp án ở câu khác");
  const f = cauCua("Many people think protecting a species is easy"), g = cauCua("Dolphins, whales and sharks");
  const gia3 = Object.assign({}, g, { x: "Swimming is not as easy as it looks." });
  assert.ok(doLo([f, gia3], (q) => q.topic).some((s) => /: is not as$/.test(s)), "bộ dò phải bắt được một đoạn của đáp án là câu");
}

/* ---------- đề “Ôn chủ đề”: câu cùng chủ đề của kho cuối kì I, giữa kì II ----------
   Đề “Ôn chủ đề” (Phiên UX14) rút 10 câu của một chủ đề từ mọi đề Tiếng Anh 12 có sẵn, có lời giải sau mỗi câu: Unit 8–10 chỉ có ở kho
   này (mọi cặp câu cùng chủ đề có thể ra cùng lúc); Unit 6, 7 chung với kho giữa kì II; Pronunciation, Cloze, Reading chung với kho cuối
   kì I, giữa kì II (đoạn nào cũng có thể rút cùng nhau). Đáp án không trùng đáp án câu cùng chủ đề của hai kho đó; dò lộ như trên giữa mọi
   cặp câu cùng chủ đề có ít nhất một câu của kho này (cả câu của các đoạn khác nhau; đáp án là từ ngữ pháp chỉ dò trong cùng đoạn); chỗ đã
   xem ghi ở DA_XEM_CHU_DE. */
const khoKhac = BANKS.filter((b) => b.file === "12-ta.js" && !/^ta12-ck2-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ q, b })));
const ten1 = new Map(), PSG_KHAC = new Map();
khoKhac.forEach(({ q, b }) => { ten1.set(q, b.id.replace("ta12-", "") + "#" + (b.questions.filter((x) => !b.pool || x.src === b.id).indexOf(q) + 1)); if (q.p) PSG_KHAC.set(q, b.passages[q.p]); });
const cungCD = khoKhac.map((x) => x.q).filter((q) => TOPICS.includes(q.topic));
assert.deepEqual([...new Set(cungCD.map((q) => q.topic))].sort(), ["Cloze", "Pronunciation", "Reading", "Unit 6 · Artificial Intelligence", "Unit 7 · The World of Mass Media"].sort(),
  "chủ đề chung với kho cuối kì I, giữa kì II: Pronunciation, Unit 6, 7, Cloze, Reading");
{
  const daAn = (q) => (q.type === "mc" ? q.o[0] : q.type === "fill" ? q.ans[0] : null);
  kho.forEach((q) => { const a = daAn(q); if (a === null) return; cungCD.filter((o) => o.topic === q.topic && goc(daAn(o) || "") === goc(a)).forEach((o) => assert.fail(`${ten.get(q)} trùng đáp án “${a}” với ${ten1.get(o)}`)); });
}
const tenCD = (q) => ten.get(q) || ten1.get(q);
const loCD = TOPICS.flatMap((t) => doLo(kho.concat(cungCD).filter((q) => q.topic === t), tenCD, (a, b) => a !== b && (ten.has(a) || ten.has(b)),
  (q) => (ten.has(q) ? PSG[q.p] : PSG_KHAC.get(q)), true)).filter((s) => !lo.includes(s));
if (process.env.DO_LO) console.log("Đáp án có ở câu cùng chủ đề rút chung ở đề “Ôn chủ đề” (xem tay):\n" + loCD.join("\n"));
const DA_XEM_CHU_DE = [];
assert.deepEqual(loCD, DA_XEM_CHU_DE, "đáp án có ở câu cùng chủ đề đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM_CHU_DE");
// gần trùng (Rút ra N25; như tests/ta12-gk2.js): đề bài cùng lựa chọn, mảnh sắp xếp có từ 4 cặp hai từ liền nhau chung với một câu của kho
// cuối kì I, giữa kì II (mọi chủ đề) và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính lời dặn chuẩn, cặp của nhãn
// chủ đề và cặp có ở từ 3% số câu của data/banks/12-ta.js.
{
  const cap2 = (s) => { const w = boLoiDan(s).toLowerCase().replace(/[^a-z'|]+/g, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const cu = khoKhac.map((x) => x.q), tatCa = kho.concat(cu), df = {};
  tatCa.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capCua = (q) => { const nh = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nh.has(c) && (df[c] || 0) < 0.03 * tatCa.length)); };
  const gan = kho.flatMap((q) => { const c = capCua(q); return cu.map((o) => { const d = capCua(o), chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${ten1.get(o)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  assert.deepEqual(gan, [], "đề bài gần trùng câu của kho cuối kì I, giữa kì II");
}

/* ---------- từ của sách, không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const truong = (q) => [boLoiDan(q.q), q.x].concat(q.o || [], q.ans || [], q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].text] : []);
if (SACH.length) {
  const f12 = SACH.find((f) => /lop-12[\\/]tieng-anh-12[\\/]/.test(f));
  assert.ok(f12, "OnUp-Book có Tiếng Anh 12");
  const raw = fs.readFileSync(f12, "utf8"), parts = raw.split(/=== page-\d+ · ([^=]+) ===/), trang = {};
  for (let i = 1; i < parts.length; i += 2) { const m = /trang in (\d+)/.exec(parts[i]); if (m) trang[+m[1]] = (trang[+m[1]] || "") + parts[i + 1]; }
  // tên Unit theo Contents (trang in 2) và mục lục trong README của cuốn (người đã soát)
  const mucLuc = fs.readFileSync(path.join(path.dirname(f12), "README.md"), "utf8");
  Object.entries(UNITS).forEach(([u, t]) => {
    assert.ok(trang[2].toUpperCase().includes(`: ${t.toUpperCase()}`), `Contents ghi ${t}`);
    assert.ok(mucLuc.includes(`| Unit ${u}: ${t} |`), `mục lục ghi Unit ${u}: ${t}`);
  });
  // trang của từng Unit theo Contents, cộng Glossary (tr. 147–155; chữ OCR của Glossary lẫn hai cột, nên tìm từ trong cả Glossary)
  const TRANG = { 6: [76, 87], 7: [88, 99], 8: [100, 111], 9: [116, 127], 10: [128, 139] }, gl = raw.slice(raw.indexOf("GLOSSARY")).toLowerCase().replace(/\s+/g, " ");
  const chuUnit = (u) => { let s = ""; for (let t = TRANG[u][0]; t <= TRANG[u][1]; t++) s += " " + (trang[t] || ""); return s.toLowerCase().replace(/\s+/g, " "); };
  const coTrong = (u, t) => chuUnit(u).includes(t) || gl.includes(t);
  Object.entries(TU).forEach(([u, ws]) => ws.forEach((t) => assert.ok(coTrong(+u, t), `từ “${t}” không có trong trang của Unit ${u}`)));
  // từ hỏi nghĩa, đáp án câu dạng từ có trong trang của Unit của câu (cộng Glossary); cụm động từ ba từ có trong trang của Unit 9
  kho.filter((q) => /meaning to “/.test(q.q)).forEach((q) => { const w = /meaning to “(\w+)”/.exec(q.q)[1]; assert.ok(coTrong(unitOf(q), w), `từ hỏi nghĩa “${w}” không có trong trang của Unit ${unitOf(q)}`); });
  fills.filter((q) => /form of the word/.test(q.q)).forEach((q) => assert.ok(coTrong(unitOf(q), q.ans[0]), `từ “${q.ans[0]}” không có trong trang của Unit ${unitOf(q)}`));
  Object.keys(PV3).forEach((c) => assert.ok(chuUnit(9).includes(c), `cụm động từ “${c}” không có trong trang của Unit 9`));
  // khung Remember! của Unit 8–10 có các điểm âm, ngữ pháp mà câu hỏi
  // (chữ OCR đọc sai bảng âm của khung tr. 102, nên chỉ so lời định nghĩa; bảng đã xem trên ảnh trang, ghi ở đầu phần Pronunciation)
  ["assimilation", "a sound is changed into another"].forEach((c) => assert.ok(chuUnit(8).includes(c), `khung đồng hóa âm của Unit 8 có “${c}”`));
  ["provided that", "unless", "than, as... as"].forEach((c) => assert.ok(chuUnit(8).includes(c), `khung mệnh đề điều kiện, so sánh của Unit 8 có “${c}”`));
  ["content words", "grammatical words", "three-word phrasal verbs"].forEach((c) => assert.ok(chuUnit(9).includes(c), `khung của Unit 9 có “${c}”`));
  // (chữ OCR đọc “to-infinitive” của khung tr. 131 thành “fo-infinitive”)
  ["intonation in questions", "choice questions", "offer, propose, agree, and demand", "negative orders, requests, etc. are usually reported by not +"].forEach((c) => assert.ok(chuUnit(10).includes(c), `khung của Unit 10 có “${c}”`));
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book); tên Unit, từ của đáp án câu từ vựng, từ hỏi nghĩa, câu dạng từ, cụm động từ ba từ có trong trang của Unit.");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !/^ta12-ck2-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + [q.q, q.x].concat(q.o || [], q.ans || [], q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn (đoạn điền, bài đọc), ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn; " + tf4.length + " câu đúng/sai 4 ý.");
console.log("TA12 CK2 OK");
