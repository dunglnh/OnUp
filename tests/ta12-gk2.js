// Kiểm tra ngân hàng Tiếng Anh 12 giữa kì II của Phiên N12-gk2-ta (data/banks/12-ta.js, ta12-gk2-*), theo mẫu tests/ta12-ck1.js,
// tests/ta9-gk2.js, tests/ta9-gk1.js. Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng);
// ma trận 10 – 8 – 7 như mọi kho lớp 12 (đoạn “Chung của các phiên lớp 12” của docs/KE-HOACH-NOI-DUNG.md): Pronunciation, Unit 6, 7,
// hai câu ôn Units 1–5 mỗi đề (như kho Tiếng Anh 9 giữa kì II), Cloze, Reading.
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho):
// - Pronunciation: từ đồng âm của Unit 6 (phiên âm Anh – Anh của từng lựa chọn ghi ở IPA, đúng một lựa chọn đọc giống từ trong ngoặc,
//   không dùng các cặp từ đồng âm của sách); âm /r/ nối của Unit 7 theo khung Remember! (tr. 90): âm cuối, âm đầu của từng từ ghi ở
//   bảng; /r/ nối xuất hiện khi từ trước tận cùng bằng /ɑː/, /ɔː/, /ɜː/, /ə/, /ɪə/, /eə/, /ʊə/ (kể cả từ không có chữ r) và từ sau bắt
//   đầu bằng nguyên âm; đúng một lựa chọn có chỗ như vậy, câu đếm số chỗ tính lại số chỗ; không có “the” đứng trước nguyên âm (đọc /ði/);
// - câu sai khiến (Unit 6, khung tr. 79): have + người, máy làm việc + động từ nguyên thể; get + người + to-infinitive; have / get + vật
//   + quá khứ phân từ (loiSK, bảng NGUOI, VAT); câu đồng nghĩa giữ người làm việc và người được làm cho;
// - mệnh đề trạng ngữ chỉ cách thức (Unit 7, khung tr. 91): sau as if dùng were với mọi chủ ngữ; like / as + việc có thật; nhận ra mệnh
//   đề chỉ cách thức giữa các mệnh đề chỉ thời gian, nguyên nhân, kết quả; mệnh đề chỉ kết quả: so + tính từ + that, such + a / an +
//   tính từ + danh từ số ít + that, such + tính từ + danh từ số nhiều + that, so many + danh từ số nhiều + that (loiKQ); câu nối, câu đồng
//   nghĩa giữ hai vế và quan hệ kết quả;
// - ôn Units 1–5: learn about (động từ + giới từ của Unit 3), quá khứ tiếp diễn và quá khứ đơn (Unit 1), mạo từ (Unit 2), so sánh kép
//   (Unit 4), hiện tại hoàn thành với for (Unit 4), câu phức với although (Unit 5); mỗi câu ôn không trùng đáp án câu nào của kho cuối kì I;
// - Cloze: cụm từ cố định (free of charge, open to, log in), câu sai khiến, so … that, liên từ theo quan hệ ý có tín hiệu trong đoạn;
// - câu khác của Unit 6, 7: nghĩa của từ (gần nghĩa, trái nghĩa) theo bảng, dạng của từ theo bảng họ từ, Everyday English (ngắt lời lịch
//   sự, bắt chuyện), câu đúng/sai 4 ý về biểu đồ tròn tính lại từ số liệu trong đề, câu sắp xếp câu thành đoạn văn, thư, hội thoại.
// Rồi kiểm tra ma trận (hai đề cố định và câu riêng đều chia đúng ma trận, theo thứ tự chủ đề; ô Biết của Unit chỉ có từ vựng, ô Hiểu,
// Vận dụng của Unit mỗi đề một câu ngữ pháp và một câu khác), tên chủ đề theo Contents, Cloze, Reading (mỗi đề một đoạn 3 câu mức 1-2-3,
// bài đọc dài hơn mọi bài đọc của các kho lớp 9), dạng câu (ít nhất 6 câu đúng/sai 4 ý, không lặp kiểu Đ/S), đáp án đúng không dài hơn
// hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không lặp chữ của nhãn chủ đề, đề
// bài không trùng, note (không câu nghe, nhắc Unit 8, không nói đề chung của Sở), kì thi gk2-l12, rút thử, dò lộ đáp án giữa các câu rút
// được cùng lúc (DA_XEM), giữa mọi cặp câu cùng chủ đề của kho này và kho cuối kì I (đề “Ôn chủ đề”; DA_XEM_CHU_DE) và với note.
// So với kho cuối kì I: đề bài không gần trùng (cặp hai từ liền nhau chung), câu ôn không trùng đáp án, câu cùng chủ đề không trùng đáp án.
// Có sách ở ../OnUp-Book (repo riêng tư): tên Unit theo Contents và mục lục trong README của cuốn; từ của đáp án câu từ vựng, từ hỏi nghĩa,
// từ của câu dạng từ có trong trang của đúng Unit (cộng Glossary); mọi trường chữ không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn
// (DO_SACH=1 in chuỗi 6 từ). So thêm với mọi câu của các kho khác: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/ta12-gk2.js → in TA12 GK2 OK.
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
const S = { de1: "ta12-gk2-de1", de2: "ta12-gk2-de2", pool: "ta12-gk2-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 12); assert.equal(b.subject, "Tiếng Anh"); assert.equal(b.file, "12-ta.js");
  assert.ok(/No listening/.test(b.note), b.id + ": note ghi không có câu nghe");
  assert.ok(/Units 6–7/.test(b.note) && /two questions reviewing Units 1–5/.test(b.note), b.id + ": note ghi Units 6–7 và hai câu ôn Units 1–5");
  assert.ok(/Unit 8 \(Wildlife Conservation\)/.test(b.note) && /revision guide/.test(b.note), b.id + ": note nhắc trường đã học Unit 8 đối chiếu đề cương");
  assert.ok(!/Department of Education|common end-of-term/.test(b.note), b.id + ": đề giữa kì không có câu về đề chung của Sở (Thông tư 89/2026 chỉ ở kì cuối kì)");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("ta12-gk2-", "") + "#" + (i + 1))));
const cauCua = (has) => { const m = kho.filter((q) => q.q.includes(has) || ((q.type === "order" || q.type === "tf4") && q.o[0].includes(has))); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };
const trongNgoac = (s) => /“([^”]+)”/.exec(s)[1];
// kì thi: gắn đủ ba mã vào gk2-l12, phạm vi ghi Units 6–7
{
  const c2 = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), c2);
  const k = (c2.window.ONTAP_SEED_EVENTS || []).find((e) => e.id === "gk2-l12");
  assert.ok(k, "có kì thi gk2-l12");
  [S.de1, S.de2, S.pool].forEach((id) => assert.ok(k.banks.includes(id), "gk2-l12 gắn " + id));
  assert.ok(/Tiếng Anh: Units 6–7\./.test(k.scope), "phạm vi của gk2-l12 ghi Tiếng Anh Units 6–7");
}

/* ---------- tên chủ đề theo Contents của sách, ma trận ---------- */
const UNITS = { 6: "Artificial Intelligence", 7: "The World of Mass Media" }, ON = "Review of Units 1–5";
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
assert.deepEqual(TOPICS, ["Pronunciation", "Unit 6 · " + UNITS[6], "Unit 7 · " + UNITS[7], ON, "Cloze", "Reading"],
  "chủ đề: Pronunciation, Unit 6, 7 theo Contents, phần ôn Units 1–5, Cloze (đoạn điền), Reading");
const unitOf = (q) => { const m = /^Unit (\d+) · /.exec(q.topic); return m ? +m[1] : 0; };
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
const NGUON = [[d1.questions, "Đề 1", S.de1], [d2.questions, "Đề 2", S.de2], [rieng, "câu riêng", S.pool]];
NGUON.forEach(([d, at]) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, `${at}: đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `${at}: đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = dem(kho, t, l);
  assert.ok(v[l - 1] ? o >= 2 * v[l - 1] : o === 0, `ô (${t}, mức ${l}) rút ${v[l - 1]} câu, kho có ${o}`);
}));
assert.deepEqual(M[ON], [0, 1, 1], "mỗi đề 2 câu ôn Units 1–5 (Hiểu, Vận dụng), như kho Tiếng Anh 9 giữa kì II");

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
const ID_CK1 = new Set(BANKS.filter((b) => /^ta12-ck1-/.test(b.id) && b.passages).flatMap((b) => Object.keys(b.passages)));
Object.entries(PSG).forEach(([id, ps]) => {
  const qs = kho.filter((q) => q.p === id), w = soTu(ps.text);
  assert.ok(!ID_CK1.has(id), "mã đoạn trùng mã đoạn của kho cuối kì I (cùng file): " + id);
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
  nhan(q.topic).map((w) => w.replace(/es$/, "")).filter((w) => da.includes(w)).forEach((w) =>
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
  // năm đầu tiên của mỗi mảnh theo thứ tự thời gian; mảnh mở đầu bằng từ nối không đứng đầu
  const nam = q.o.map((o) => (/\b(1[89]\d\d|20\d\d)\b/.exec(o) || [])[1]).filter(Boolean).map(Number);
  assert.deepEqual(nam, nam.slice().sort((a, b) => a - b), "năm theo thứ tự thời gian: " + ten.get(q));
  assert.ok(!/^(After|Moreover|Then|Finally|However|Next|At first|A year later|Now)\b/.test(q.o[0]), "mảnh đầu không mở bằng từ nối: " + ten.get(q));
  if (thu) assert.ok(/^Dear /.test(q.o[0]) && /\bYours (sincerely|faithfully), [A-Z]/.test(q.o[cuoi]), "thư mở bằng lời chào, kết bằng lời kết và tên: " + ten.get(q));
});
// câu tìm lỗi sai: các lựa chọn là các phần của câu trong ngoặc
kho.filter((q) => LOI.test(q.q)).forEach((q) => { const c = trongNgoac(q.q); q.o.forEach((o) => assert.ok(c.includes(o), `“${o}” không phải phần của câu: ` + ten.get(q))); });
// câu điền: lời dặn; câu chia động từ, dạng của từ có từ trong ngoặc ngay sau chỗ trống
const fills = kho.filter((q) => q.type === "fill");
fills.forEach((q) => {
  assert.equal(q.q.split("___").length, 2, "câu điền có đúng một chỗ trống: " + ten.get(q));
  if (/^Fill in the blank with one word\./.test(q.q)) { q.ans.forEach((a) => assert.ok(/^[a-z]+$/i.test(a), "đáp án một từ: " + ten.get(q))); return; }
  assert.ok(/^Write the correct form of the (verb|word) in brackets\./.test(q.q), "lời dặn câu điền: " + ten.get(q));
  assert.ok(/___ \(([^)]+)\)/.test(q.q), "từ trong ngoặc ngay sau chỗ trống: " + ten.get(q));
});

/* ---------- Pronunciation: tính lại đáp án ---------- */
// Unit 6: Homophones (khung Remember! tr. 78): từ đọc giống nhau, viết khác nhau, nghĩa khác nhau. Phiên âm Anh – Anh (đối chiếu từ điển
// CMU lúc soạn). Không dùng các từ đồng âm của sách (tr. 78, 86).
const IPA = { byte: "baɪt", bite: "baɪt", bit: "bɪt", beat: "biːt", bait: "beɪt", site: "saɪt", sight: "saɪt", seat: "siːt", set: "set",
  sit: "sɪt", scene: "siːn", seen: "siːn", sign: "saɪn", sin: "sɪn", sun: "sʌn" };
const DONG_AM_SACH = ["to", "two", "too", "there", "their", "where", "wear", "board", "bored", "hour", "hours", "our", "ours", "allowed", "aloud", "know", "no", "right", "write"];
// Unit 7: Linking /r/ between two vowels (khung Remember! tr. 90): /r/ nối xuất hiện giữa từ tận cùng bằng /ɑː/, /ɔː/, /ɜː/, /ə/, /ɪə/,
// /eə/, /ʊə/ và từ sau bắt đầu bằng nguyên âm. Âm cuối (Anh – Anh) và âm đầu (V: nguyên âm, C: phụ âm) của từng từ ghi ở bảng (đối chiếu
// từ điển CMU lúc soạn: âm cuối R, ER của bản Mỹ là nguyên âm /ə/, /eə/… của bản Anh).
const R_NOI = ["ɑː", "ɔː", "ɜː", "ə", "ɪə", "eə", "ʊə"];
const AM = { newspaper: "C ə", article: "V l", radio: "C əʊ", advert: "V t", video: "C əʊ", interview: "V uː", tv: "C iː", announcement: "V t",
  the: "C ə", reporter: "C ə", asked: "V t", two: "C uː", questions: "C z", my: "C aɪ", phone: "C n", shows: "C z", time: "C m",
  and: "V d", date: "C t", robot: "C t", answered: "V d", every: "V i", question: "C n", we: "C iː", watch: "C tʃ", news: "C z",
  at: "V t", home: "C m", their: "C eə", editor: "V ə", always: "V z", answers: "V z", letter: "C ə", from: "C m", our: "V ə", readers: "C z" };
const choNoi = (cum) => {
  const w = cum.toLowerCase().replace(/[“”.,?!]/g, "").split(/\s+/), ra = [];
  w.forEach((x) => assert.ok(AM[x], `chưa có âm đầu, âm cuối của “${x}”`));
  w.slice(0, -1).forEach((x, i) => {
    const sau = AM[w[i + 1]].split(" ")[0];
    assert.ok(!(x === "the" && sau === "V"), "tránh “the” trước nguyên âm (đọc /ði/): " + cum);
    if (R_NOI.includes(AM[x].split(" ")[1]) && sau === "V") ra.push(x + " " + w[i + 1]);
  });
  return ra;
};
assert.deepEqual(choNoi("their editor"), ["their editor"], "choNoi tự thử"); assert.deepEqual(choNoi("radio advert"), [], "choNoi tự thử: /əʊ/ không nối /r/");
let n = 0;
const daTinh = new Set();
kho.filter((q) => q.topic === "Pronunciation").forEach((q) => {
  daTinh.add(q); n++;
  if (/^Which word is pronounced the same as “(\w+)”\?$/.test(q.q)) {
    const goc = trongNgoac(q.q);
    [goc].concat(q.o).forEach((o) => { assert.ok(IPA[o], `chưa có phiên âm của “${o}”: ` + ten.get(q)); assert.ok(!DONG_AM_SACH.includes(o), `“${o}” là từ đồng âm của sách: ` + ten.get(q)); });
    assert.deepEqual(q.o.filter((o) => IPA[o] === IPA[goc] && o !== goc), [q.o[0]], "đúng một lựa chọn đọc giống từ trong ngoặc: " + ten.get(q));
    assert.ok(q.x.includes("/" + IPA[goc] + "/") && q.o.slice(1).every((o) => q.x.includes("/" + IPA[o] + "/")), "lời giải ghi phiên âm của các từ: " + ten.get(q));
    return;
  }
  if (/^In which (phrase|sentence) can a linking \/r\/ appear/.test(q.q)) {
    assert.deepEqual(q.o.filter((o) => choNoi(o).length), [q.o[0]], "đúng một lựa chọn có chỗ /r/ nối: " + ten.get(q));
    assert.equal(choNoi(q.o[0]).length, 1, "đáp án có đúng một chỗ /r/ nối: " + ten.get(q));
    return;
  }
  if (/^How many linking \/r\/ sounds can appear in this sentence\?/.test(q.q)) {
    const SO = ["zero", "one", "two", "three", "four", "five"];
    assert.equal(q.o[0], SO[choNoi(trongNgoac(q.q)).length], "số chỗ /r/ nối tính lại khác: " + ten.get(q));
    choNoi(trongNgoac(q.q)).forEach((c) => assert.ok(q.x.toLowerCase().includes(c), `lời giải ghi chỗ nối “${c}”: ` + ten.get(q)));
    return;
  }
  assert.fail("câu Pronunciation chưa có cách tính: " + ten.get(q));
});
// mỗi đề một câu từ đồng âm (Biết) và một câu /r/ nối (Hiểu); mỗi câu một bộ từ riêng, không dùng lại từ của câu Pronunciation kho cuối kì I
NGUON.forEach(([d, at]) => assert.deepEqual(d.filter((q) => q.topic === "Pronunciation").map((q) => (/same as/.test(q.q) ? "đồng âm" : "/r/ nối") + q.lv), ["đồng âm1", "/r/ nối2"], at + ": Pronunciation"));
{
  const tuPA = (q) => (/same as/.test(q.q) ? [trongNgoac(q.q)].concat(q.o) : []);
  const tat = kho.flatMap(tuPA); assert.equal(new Set(tat).size, tat.length, "mỗi câu từ đồng âm một bộ từ riêng");
  const ck1 = bank("ta12-ck1-ngau-nhien").questions.filter((q) => q.topic === "Pronunciation").flatMap((q) => q.o.concat(q.q.toLowerCase().match(/[a-z]+/g)));
  tat.forEach((w) => assert.ok(!ck1.includes(w), `từ “${w}” đã có ở câu Pronunciation của kho cuối kì I`));
}

/* ---------- ngữ pháp: bộ kiểm tra ---------- */
const coCum = (s, c) => (" " + s.toLowerCase().replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ") + " ").includes(" " + c.toLowerCase() + " ");
const dien = (q, o) => q.q.replace(/^[^.]*\. (?=[A-Z])/, (m) => (/^(Write|Fill)/.test(m) ? "" : m)).replace("___", o);
const motLuaChon = (q, ok, at) => { const d = q.o.filter(ok); assert.equal(d.length, 1, (at || "đúng một lựa chọn đúng") + ": " + ten.get(q) + " → " + JSON.stringify(d)); return d[0]; };
// Unit 6: câu sai khiến (khung Remember! tr. 79): have + người (hay máy làm việc) + động từ nguyên thể; get + người + to-infinitive;
// have / get + vật + quá khứ phân từ. Bảng động từ (nguyên thể → quá khứ phân từ); NGUOI là người, máy làm việc, VAT là vật được làm.
const V6 = { replace: "replaced", vote: "voted", design: "designed", fix: "fixed", copy: "copied", bring: "brought", repair: "repaired",
  watch: "watched", recycle: "recycled", scan: "scanned", accompany: "accompanied" };
const DT6 = Object.keys(V6), PP6 = Object.values(V6);
const NGUOI = ["the it team", "the whole class", "a local printing shop", "our robot club", "a mechanic", "the delivery robot", "his players", "it"];
const VAT = ["the posters", "all the old film posters", "her broken tablet", "all the old computers", "every photo"];
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
// vai trong câu sai khiến: chủ ngữ (người nhờ) và người làm việc (sau have / get, hay sau by)
const vaiSK = (s) => {
  const l = s.toLowerCase().replace(/[.,]/g, ""), m = /^(.+?) (?:had|got|have|has|get) (.+)$/.exec(l); if (!m) return null;
  const lam = NGUOI.find((o) => m[2].startsWith(o + " ")) || (/ by (.+)$/.exec(m[2]) || [])[1] || null;
  return { chu: m[1], lam };
};
// Unit 7: mệnh đề trạng ngữ chỉ cách thức (khung Remember! tr. 91): as, as if, like; sau as if dùng were với mọi chủ ngữ (việc không có
// thật); mệnh đề chỉ kết quả: so … that, such … that
const loiAsIf = (s) => { const m = /\bas if (?:i|you|he|she|it|we|they) (to be|being|be|were|is|was|are|am)\b/i.exec(s); return m && m[1].toLowerCase() !== "were" ? ["sau as if dùng were: " + m[1]] : []; };
const CACH = { as: "có thật", like: "có thật", "as if": "không có thật" };
const loaiMD = (s) => {
  const l = s.toLowerCase();
  if (/\bas if\b/.test(l) || /\b(as|like) (a|an|the|my|our|his|her|their) [\w ]+? (does|did|do)\b/.test(l)) return "cách thức";
  if (/\bso (\w+|many \w+|much \w+) that\b|\bsuch\b.* that\b/.test(l)) return "kết quả";
  if (/\b(when|while|after|before)\b/.test(l)) return "thời gian";
  if (/\b(because|since)\b/.test(l)) return "nguyên nhân";
  return "không có";
};
const SO_IT = ["advert", "headline", "film", "interview"], SO_NHIEU = ["adverts", "videos", "posts"];
const loiKQ = (s) => {
  const l = s.toLowerCase(), loi = [];
  if (/\btoo \w+ that\b/.test(l)) loi.push("too … that: dùng so … that");
  if (/\bso (a|an) \w+/.test(l)) loi.push("so + a / an: dùng such a / an");
  if (/\bsuch (many|much)\b/.test(l)) loi.push("such many / much: dùng so many / much");
  const mu = /\bso much (\w+)/.exec(l); if (mu && SO_NHIEU.includes(mu[1])) loi.push("so much + danh từ số nhiều: dùng so many");
  const m = /\bsuch (\w+)(?: (\w+))? that\b/.exec(l);
  if (m && !["a", "an"].includes(m[1])) { if (!m[2]) loi.push("such + tính từ (không có danh từ): dùng so"); else if (SO_IT.includes(m[2])) loi.push("such + danh từ số ít: cần a / an"); }
  return loi;
};
const ketQua = (s) => /\b(so (?:many|much)(?: [\w-]+){1,2}|so [\w-]+|such (?:a|an)(?: [\w-]+){2,3}|such(?: [\w-]+){2}) that\b/.test(s.toLowerCase());
// ôn Unit 1: quá khứ đơn, quá khứ tiếp diễn (khung Remember! tr. 10): hành động ngắn (NGAN) ở quá khứ đơn, hành động dài bị cắt ngang ở
// quá khứ tiếp diễn, mệnh đề while ở quá khứ tiếp diễn
const QKD = { died: "die", recorded: "record" }, ING = { dying: "die", recording: "record" }, NGAN = ["die"], DAI = ["record"];
const menhDe = (s) => s.replace(/[.!?]$/, "").split(/,\s*| (?=(?:when|while|because) )/i).map((c) => c.trim()).filter(Boolean);
const dongTu = (c) => {
  const m = /\b(was|were) (?:\w+ly )?(\w+ing)\b/.exec(c);
  if (m) return { thi: "QKTD", v: ING[m[2]] || m[2] };
  const f = Object.keys(QKD).find((k) => coCum(c, k));
  return f ? { thi: "QKD", v: QKD[f] } : null;
};
const loiQK = (s) => {
  const loi = [], cs = menhDe(s).map((c) => ({ c, d: dongTu(c) })).filter((x) => x.d);
  cs.forEach(({ c, d }) => {
    if (d.thi === "QKTD" && NGAN.includes(d.v)) loi.push("hành động ngắn dùng quá khứ đơn: " + c);
    if (/^while\b/i.test(c) && d.thi !== "QKTD") loi.push("mệnh đề while (hành động dài) dùng quá khứ tiếp diễn: " + c);
  });
  const ngan = cs.find((x) => NGAN.includes(x.d.v) && x.d.thi === "QKD");
  if (ngan) cs.filter((x) => DAI.includes(x.d.v) && x.d.thi !== "QKTD").forEach((x) => loi.push("hành động dài bị cắt ngang: quá khứ tiếp diễn: " + x.c));
  return loi;
};
const vai = (s) => { const r = {}; menhDe(s).forEach((c) => { const d = dongTu(c); if (d) r[d.v] = d.thi; }); return r; };
// ôn Unit 2: mạo từ (khung Remember! tr. 22): the với nhạc cụ (sau play), đại dương, nước có chữ kingdom; a / an theo âm đầu ghi ở AM_DAU
const THE = ["united_kingdom", "atlantic", "piano"];
const AM_DAU = { university: "phụ âm", engineer: "nguyên âm" };
const tachTu = (s) => (" " + s.toLowerCase().replace(/[“”".,;:!?()]/g, " ") + " ").replace(/ united kingdom /g, " united_kingdom ").split(/\s+/).filter(Boolean);
const loiMaoTu = (s) => {
  const t = tachTu(s), loi = [];
  t.forEach((x, i) => {
    if (THE.includes(x) && t[i - 1] !== "the") loi.push("cần the trước " + x);
    if (x === "a" || x === "an") {
      const sau = t[i + 1], am = AM_DAU[sau] || (/^[aeiou]/.test(sau || "") ? "nguyên âm" : "phụ âm");
      if ((x === "an") !== (am === "nguyên âm")) loi.push(`${x} ${sau}: dùng ${am === "nguyên âm" ? "an" : "a"}`);
    }
  });
  return loi;
};
// ôn Unit 3: động từ + giới từ (khung Remember! tr. 34)
const VP = { learn: "about" }, VP_GOC = ["learn about"];
// ôn Unit 4: so sánh kép (The + so sánh hơn …, the + so sánh hơn …); hiện tại hoàn thành phủ định với for + khoảng thời gian
const ssKep = (s) => /^the (more|less|\w+er) [^,]+, the (more|less|\w+er)\b/i.test(s);
const KHOANG = /\b(two|three|four|five|six) (days|weeks|months|years)\b/;
const httPhuDinh = (s) => /\b(haven't|hasn't) \w+ed\b/.test(s) && new RegExp("\\bfor " + KHOANG.source.slice(2, -2) + "\\b").test(s) && !/\bsince (two|three|four|five|six) /.test(s);
// ôn Unit 5, Cloze: liên từ theo quan hệ ý; because / although (phụ thuộc) và so / but (đẳng lập) không nối cùng hai mệnh đề
const QH = { although: "trái ngược", but: "trái ngược", because: "nguyên nhân", so: "kết quả", therefore: "kết quả", unless: "điều kiện phủ định",
  otherwise: "điều kiện phủ định", "as a result": "kết quả", "so that": "mục đích", meanwhile: "đồng thời", "for instance": "ví dụ", unlike: "khác biệt", despite: "nhượng bộ",
  "instead of": "thay thế", "apart from": "bổ sung" };
const lienTu = (o) => { const l = o.toLowerCase(); return Object.keys(QH).filter((k) => l === k || l.startsWith(k + " ")).sort((a, b) => b.length - a.length)[0]; };
const loiNoi = (s) => (/^(Because|Although)\b/.test(s) && /, (so|but) /.test(s) ? ["không dùng because / although cùng so / but"] : []);
const quanHe = (q, tinHieu, qh) => {
  assert.ok(tinHieu.test(q.p ? PSG[q.p].text : q.q), "tín hiệu của quan hệ " + qh + ": " + ten.get(q));
  q.o.forEach((o) => assert.ok(lienTu(o), "lựa chọn không có trong bảng liên từ: " + o));
  return motLuaChon(q, (o) => QH[lienTu(o)] === qh, "đúng một liên từ chỉ quan hệ " + qh);
};
// cụm từ cố định của đoạn điền: chữ trước, sau chỗ trống → từ đúng
const CUM = { "free ___ charge": "of", "open ___ all": "to", "visitors ___ the main entrance": "at" };
// tự thử các bộ kiểm tra với câu cố ý viết sai
assert.ok(loiSK("We had the it team to replace the cables.").length && !loiSK("We had the IT team replace the cables.").length && loiSK("I got every photo scan.").length, "loiSK tự thử");
assert.ok(loiAsIf("He acts as if he is the boss.").length && !loiAsIf("He acts as if he were the boss.").length, "loiAsIf tự thử");
assert.ok(loiKQ("It was so a long film that we slept.").length && loiKQ("The film was such long that we slept.").length && !loiKQ("It was such a long film that we slept.").length, "loiKQ tự thử");
assert.ok(loiQK("While the battery died, I was recording.").length && !loiQK("While I was recording, the battery died.").length, "loiQK tự thử");
assert.ok(loiMaoTu("She plays piano.").length && loiMaoTu("He is an university student.").length && !loiMaoTu("She plays the piano at a university.").length, "loiMaoTu tự thử");
assert.ok(ssKep("The harder you try, the better you get.") && !ssKep("Harder you try, the better you get."), "ssKep tự thử");
assert.ok(httPhuDinh("I haven't watched TV for two weeks.") && !httPhuDinh("I haven't watched TV since two weeks."), "httPhuDinh tự thử");
assert.ok(ketQua("It had so many adverts that I left.") && ketQua("It was such a long film that we slept.") && !ketQua("It was funny so that we laughed."), "ketQua tự thử");
assert.equal(loaiMD("She sings as her mother does."), "cách thức"); assert.equal(loaiMD("She sings so loudly that we wake up."), "kết quả"); assert.equal(loaiMD("She sings when we visit."), "thời gian");

/* ---------- câu khác của Unit 6, 7: bảng ---------- */
// nghĩa của từ trong câu (gần nghĩa, trái nghĩa): từ được hỏi → đáp án
const NGHIA = { capable: { gan: "able" }, credible: { gan: "believable" }, advanced: { nguoc: "basic", gan: "modern" } };
// họ từ: từ trong ngoặc → đáp án; loại từ chỗ trống cần (tính từ sau more / trước danh từ, danh từ số nhiều sau many)
const HO_TU = { interact: { d: "interactive", loai: "tính từ" }, apply: { d: "applications", loai: "danh từ số nhiều" }, rely: { d: "reliable", loai: "tính từ" } };
const loaiTu = (q) => (/\bmany (?:\w+ )?___/.test(q.q) ? "danh từ số nhiều" : /\bmore ___|\ba ___ \(\w+\) \w+/.test(q.q) ? "tính từ" : "?");
// Everyday English: ngắt lời lịch sự (Unit 6, tr. 84), bắt chuyện (Unit 7, tr. 97)
const NGAT = /^(Sorry to interrupt|Sorry for interrupting|I'm sorry to interrupt|Pardon me)\b.*\bbut\b/;
const BAT_CHUYEN = /^(Hi|Hello)\b.*\?$/;
// biểu đồ tròn: số liệu trong đề → từng ý tính lại
const bieuDo = (q) => {
  const so = {}; (q.q.match(/([A-Za-z][A-Za-z ]+): (\d+)%/g) || []).forEach((x) => { const m = /([A-Za-z][A-Za-z ]+): (\d+)%/.exec(x); so[m[1].trim().toLowerCase().replace(/^.*\. /, "")] = +m[2]; });
  assert.equal(sum(Object.values(so)), 100, "các phần của biểu đồ cộng lại 100%: " + ten.get(q));
  const ten2 = (s) => Object.keys(so).find((k) => s.toLowerCase().includes(k));
  return q.o.map((o) => {
    let m;
    if ((m = /^(.+) was the top source of news\.$/.exec(o))) return so[ten2(m[1])] === Math.max(...Object.values(so));
    if ((m = /^More students chose (.+) than (.+)\.$/.exec(o))) return so[ten2(m[1])] > so[ten2(m[2])];
    if ((m = /^(.+) accounted for a quarter of the answers\.$/.exec(o))) return so[ten2(m[1])] === 25;
    if ((m = /^Almost half of the students relied mainly on (.+)\.$/.exec(o))) return so[ten2(m[1])] >= 40 && so[ten2(m[1])] < 50;
    assert.fail("ý chưa có cách tính: " + o);
  });
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
const NP = new Set(); // câu ngữ pháp của Unit 6, 7
const CHECKS = [
  // Unit 6: câu sai khiến
  { has: "had the IT team ___", np: 1, right: (q) => motLuaChon(q, (o) => !loiSK(dien(q, o)).length) },
  { has: "got the whole class ___ (vote)", np: 1, right: (q) => {
    const c = (f) => dien(q, f).replace(" (vote)", "");
    assert.deepEqual(loiSK(c(q.ans[0])), []); ["vote", "voted", "voting"].forEach((f) => assert.ok(loiSK(c(f)).length, "dạng khác phải sai: " + f));
    return q.ans[0];
  } },
  { has: "We had the delivery robot", np: 1, right: (q) => q.o.map((o) => !loiSK(o).length) },
  { has: "A local printing shop designed the posters", np: 1, right: (q) => {
    const g = trongNgoac(q.q).toLowerCase(), lam = "a local printing shop", cho = "our robot club";
    assert.ok(g.startsWith(lam + " designed") && g.includes("for " + cho), "câu gốc: cửa hàng làm, câu lạc bộ được làm cho");
    return motLuaChon(q, (o) => { const v = vaiSK(o); return !loiSK(o).length && !!v && v.chu === cho && v.lam === lam; });
  } },
  { has: "got a mechanic fix the brakes", np: 1, right: (q) => kiemLoi(q, loiSK, "a mechanic to fix") },
  { has: "film posters copy onto", np: 1, right: (q) => kiemLoi(q, loiSK, "the old film posters copied") },
  // Unit 7: mệnh đề chỉ cách thức, kết quả
  { has: "the host talks to the audience as if she ___", np: 1, right: (q) => motLuaChon(q, (o) => !loiAsIf(dien(q, o)).length) },
  { has: "Nobody reads the evening news ___ Ms Hoa does", np: 1, right: (q) => {
    assert.ok(/___ [A-Z][a-z]* ?[A-Z]?[a-z]* does\b/.test(q.q), "sau chỗ trống là việc có thật (… does)");
    return motLuaChon(q, (o) => CACH[o] === "có thật");
  } },
  { has: "Which sentence has an adverbial clause of manner?", np: 1, right: (q) => motLuaChon(q, (o) => loaiMD(o) === "cách thức") },
  { has: "The live interview was too long", np: 1, right: (q) => kiemLoi(q, loiKQ, "so long") },
  { has: "The advert was very funny. Millions", np: 1, right: (q) => motLuaChon(q, (o) => !loiKQ(o).length && ketQua(o) && o.includes("millions of people shared it online")) },
  { has: "The website had a lot of adverts. Because of this", np: 1, right: (q) => motLuaChon(q, (o) => !loiKQ(o).length && ketQua(o) && o.includes("I closed it after a minute")) },
  // Unit 6, 7: câu khác (nghĩa của từ, dạng của từ, Everyday English, biểu đồ, sắp xếp câu)
  ...["capable", "credible", "advanced"].map((w) => ({ has: `meaning to “${w}”`, right: (q) => {
    const nguoc = /opposite in meaning/.test(q.q), d = NGHIA[w][nguoc ? "nguoc" : "gan"];
    assert.ok(new RegExp("\\b" + w + "\\b").test(trongNgoac(q.q.replace(/^[^:]*: /, ""))), "câu ví dụ có từ được hỏi: " + ten.get(q));
    assert.ok(q.o.includes(d), "có lựa chọn đúng theo bảng: " + ten.get(q));
    if (nguoc) assert.ok(q.o.includes(NGHIA[w].gan), "câu trái nghĩa có lựa chọn gần nghĩa làm bẫy: " + ten.get(q));
    return d;
  } })),
  ...Object.entries(HO_TU).map(([w, h]) => ({ has: `___ (${w})`, right: (q) => {
    assert.equal(loaiTu(q), h.loai, `chỗ trống cần ${h.loai}: ` + ten.get(q));
    assert.ok(q.x.includes(`${w} → ${h.d}`), "lời giải ghi họ từ: " + ten.get(q));
    return h.d;
  } })),
  { has: "wants to ask the speaker", right: (q) => { const tu = trongNgoac(q.q); return motLuaChon(q, (o) => NGAT.test(o) && o.includes(tu)); } },
  { has: "start some small talk", right: (q) => motLuaChon(q, (o) => BAT_CHUYEN.test(o)) },
  { has: "A survey asked 200 students", right: (q) => bieuDo(q) },
  { has: "", order: "In 2022, three students", right: (q) => {
    assert.ok(/^At first\b/.test(q.o[1]) && /^A year later\b/.test(q.o[2]) && /^Now\b/.test(q.o[q.o.length - 1]), "At first ngay sau câu mở đầu, A year later sau đó, Now ở cuối");
    return null;
  } },
  { has: "", order: "Dear Editor,", right: (q) => { assert.ok(/^I am writing to\b/.test(q.o[1]) && /^I would be grateful\b/.test(q.o[q.o.length - 2]), "thư: lí do viết ở đầu, lời đề nghị ngay trước lời kết"); return null; } },
  { has: "", order: "Mai: Have you seen the video", right: (q) => { assert.ok(/\?$/.test(q.o[1]) && /^Mai: No\b/.test(q.o[2]), "câu hỏi của Nam được Mai trả lời ngay sau"); return null; } },
  // ôn Units 1–5
  { has: "can learn ___ the ways", right: (q) => { assert.ok(VP_GOC.includes("learn " + VP.learn), "learn about có trong khung của sách"); assert.deepEqual(q.ans, [VP.learn]); return VP.learn; } },
  { has: "Minh was recording a video", right: (q) => {
    assert.deepEqual(vai(trongNgoac(q.q).replace(/\. /, ", ")), { record: "QKTD", die: "QKD" }, "câu gốc: quay video là hành động dài");
    return motLuaChon(q, (o) => !loiQK(o).length && /^(While|When) /.test(o) && JSON.stringify(vai(o)) === JSON.stringify({ record: "QKTD", die: "QKD" }));
  } },
  { has: "Is each sentence grammatically correct?", unit: ON, right: (q) => q.o.map((o) => !loiMaoTu(o).length) },
  { has: "The online course was free, but", right: (q) => motLuaChon(q, (o) => !loiNoi(o).length && QH[lienTu(o) || (/, (so|but) /.exec(o) || [])[1]] === "trái ngược") },
  { has: "you practise speaking English, the more confident", right: (q) => motLuaChon(q, (o) => ssKep(dien(q, o))) },
  { has: "The last time I watched TV was two weeks ago", right: (q) => motLuaChon(q, httPhuDinh) },
  // Cloze
  ...Object.entries({ "photo-day": 1, "podcast-contest": 1, "max-robot": 1 }).map(([pp, k]) => ({ has: "", p: pp, k, right: (q) => {
    const c = Object.keys(CUM).find((x) => PSG[q.p].text.includes(x.replace("___", "(1) ___"))); assert.ok(c, "chỗ trống (1) là cụm từ cố định trong bảng: " + q.p);
    return CUM[c];
  } })),
  { has: "", p: "photo-day", k: 2, np: 0, right: (q) => motLuaChon(q, (o) => !loiSK(cauTrong(q).replace("___", o)).length) },
  { has: "", p: "photo-day", k: 3, right: (q) => quanHe(q, /by our volunteers[^]*\(3\) ___, you can join a short lesson/, "đồng thời") },
  { has: "", p: "podcast-contest", k: 2, right: (q) => motLuaChon(q, (o) => { const s = cauTrong(q).replace("___", o); return !loiKQ(s).length && ketQua(s); }) },
  { has: "", p: "podcast-contest", k: 3, right: (q) => quanHe(q, /This year there is one new rule\. \(3\) ___ last year/, "khác biệt") },
  { has: "", p: "max-robot", k: 2, right: (q) => motLuaChon(q, (o) => !loiSK(cauTrong(q).replace("___", o)).length) },
  { has: "", p: "max-robot", k: 3, right: (q) => quanHe(q, /can only speak English and Vietnamese for now, \(3\) ___/, "trái ngược") }
];
CHECKS.forEach((c) => {
  let q;
  if (c.order) { const m = kho.filter((x) => x.type === "order" && x.o[0].startsWith(c.order)); assert.equal(m.length, 1, "câu sắp xếp mở đầu “" + c.order + "”"); q = m[0]; }
  else if (c.p) { const m = kho.filter((x) => x.p === c.p && x.q === `Choose the best option for blank (${c.k}).`); assert.equal(m.length, 1, `chỗ trống (${c.k}) của ${c.p}`); q = m[0]; }
  else if (c.unit) { const m = kho.filter((x) => x.q.includes(c.has) && x.topic === c.unit); assert.equal(m.length, 1, `“${c.has}” ở ${c.unit}`); q = m[0]; }
  else q = cauCua(c.has);
  const want = c.right(q), at = ten.get(q) + " (" + (c.has || c.order || c.p + " " + c.k) + ")";
  assert.ok(!daTinh.has(q), "câu được tính hai lần: " + at);
  daTinh.add(q); n++;
  if (c.np) { assert.ok(unitOf(q) === 6 || unitOf(q) === 7, "câu ngữ pháp của Unit 6, 7: " + at); NP.add(q); }
  if (want === null) return;
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
});
// câu từ vựng mức Biết của Unit 6, 7: đáp án là từ của Unit (TU), mỗi từ đúng một câu
const TU = { 6: ["chatbot", "upgrade", "hands-on", "voice command", "portfolio", "analyse", "platform", "activate", "human-like", "programme",
  "personalised", "virtual reality"], 7: ["publicity", "bias", "broadcast", "the press", "distribute", "fact-check", "instant", "accessible", "presence"] };
const tuVung = kho.filter((q) => unitOf(q) && !daTinh.has(q));
tuVung.forEach((q) => {
  assert.ok(q.type === "mc" && q.lv === 1, "câu chưa tính lại đáp án (chỉ câu từ vựng mức Biết được bỏ qua): " + ten.get(q));
  assert.equal(TU[unitOf(q)].filter((t) => q.o[0].toLowerCase().startsWith(t)).length, 1, "đáp án câu từ vựng là từ của Unit trong TU: " + ten.get(q));
});
Object.entries(TU).forEach(([u, ws]) => ws.forEach((t) => assert.equal(tuVung.filter((q) => unitOf(q) === +u && q.o[0].toLowerCase().startsWith(t)).length, 1, `từ “${t}” của Unit ${u}: đúng một câu`)));
assert.equal(kho.filter((q) => q.topic === "Reading" || daTinh.has(q) || tuVung.includes(q)).length, kho.length, "câu nào cũng đã tính lại (trừ câu từ vựng, Reading)");
// ô Biết của Unit (rút 3–4 câu) chỉ có câu từ vựng; ô Hiểu, Vận dụng của Unit (rút 2 câu): mỗi đề cố định và phần câu riêng đúng một câu
// ngữ pháp và một câu khác (như kho Tiếng Anh 9 giữa kì I); mỗi câu ngữ pháp một đáp án riêng
[6, 7].forEach((u) => {
  const t = `Unit ${u} · ${UNITS[u]}`;
  kho.filter((q) => q.topic === t && q.lv === 1).forEach((q) => assert.ok(tuVung.includes(q), `ô (${t}, Biết) chỉ có câu từ vựng: ` + ten.get(q)));
  NGUON.forEach(([, at, id]) => [2, 3].forEach((l) => assert.equal(kho.filter((q) => q.src === id && q.topic === t && q.lv === l && NP.has(q)).length, 1, `${at}: ô (${t}, mức ${l}) đúng một câu ngữ pháp`)));
});
{ const da = [...NP].map((q) => String(q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a.join() : q.o[0]).toLowerCase()); assert.equal(new Set(da).size, da.length, "mỗi câu ngữ pháp một đáp án riêng"); }
// Unit 7: were (đáp án câu as if), like (đáp án câu cách thức) chỉ có ở câu đó trong Unit 7; mọi câu của Unit 7 không có as if trừ câu đó
{
  const u7 = kho.filter((q) => unitOf(q) === 7), chu = (q) => [q.q, q.x].concat(q.type === "mc" ? [q.o[0]] : q.o || [], q.ans || []).join(" | ");
  [["were", "as if she ___"], ["like", "___ Ms Hoa does"], ["as if", "as if she ___"]].forEach(([w, cua]) => u7.filter((q) => !q.q.includes(cua) && new RegExp("\\b" + w + "\\b", "i").test(chu(q))).forEach((q) => assert.fail(`câu Unit 7 khác có “${w}”: ` + ten.get(q))));
}
// câu ôn Units 1–5: mỗi câu một điểm ngữ pháp của học kì I, không trùng đáp án câu nào của kho cuối kì I (Rút ra N25)
{
  const ck1 = bank("ta12-ck1-ngau-nhien").questions, da = (q) => String(q.type === "mc" ? q.o[0] : q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.o.join(" ") : q.o.join(" ")).toLowerCase();
  const daCk1 = new Set(ck1.map(da));
  kho.filter((q) => q.topic === ON).forEach((q) => assert.ok(!daCk1.has(da(q)), "câu ôn trùng đáp án của kho cuối kì I: " + ten.get(q)));
  assert.equal(kho.filter((q) => q.topic === ON).length, 6, "sáu câu ôn: learn about, quá khứ tiếp diễn, mạo từ, so sánh kép, hiện tại hoàn thành, although");
}

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8) ---------- */
const goc = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
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
   Như tests/ta12-ck1.js, tests/ta9-gk1.js. Rút cùng lúc: khác chủ đề, cùng chủ đề khác mức, hoặc cùng ô mà ô rút từ 2 câu (ô Hiểu, Vận
   dụng của Unit 6, 7 có một câu ngữ pháp, một câu khác: so cả cặp cùng ô); câu của hai đoạn khác nhau không bao giờ rút cùng lúc. Chữ cần
   dò của đáp án: đáp án một từ thì từ đó (từ ngữ pháp như of, so, were, like chỉ dò ở câu cùng chủ đề); đáp án 2–3 từ thì cả cụm; đáp án
   là câu thì các chuỗi 3 từ liền nhau không có ở lựa chọn sai nào. Đáp án câu Reading chỉ dò ở câu cùng đoạn; câu Pronunciation không dò
   (thấy từ ở câu khác không lộ cách đọc). Chữ của câu kia: đề bài, đáp án, lời giải, ý của câu đúng/sai, mảnh của câu sắp xếp, đoạn đọc
   (lựa chọn sai của câu trắc nghiệm không tính). Đáp án không lặp từ (trừ từ ngữ pháp) của chính đề bài câu có chỗ trống (Rút ra N12). */
const NGU_PHAP = new Set(("a an the of to in on at for from with by about and or but so than as if when while because before after " +
  "is are was were be been am have has had do does did will would can could should must might may not no i you he she it we they me " +
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
  const a = cauCua("the warehouse robots"), b = cauCua("Messaging apps let us send");
  const gia = Object.assign({}, b, { x: b.x + " Engineers programmed the robot." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => /: programm$/.test(s)), "bộ dò phải bắt được đáp án (dạng khác) nằm trong lời giải câu khác");
  const c = cauCua("as if she ___"), e = cauCua("The singer refused to talk");
  const gia2 = Object.assign({}, e, { x: e.x + " Reporters were outside." });
  assert.ok(doLo([c, gia2], (q) => q.topic).some((s) => /: were$/.test(s)), "bộ dò phải bắt được đáp án ngữ pháp ở câu cùng Unit");
  const f = cauCua("The advert was very funny. Millions"), g = cauCua("Every morning, volunteers");
  const gia3 = Object.assign({}, g, { x: "It was such a funny show." });
  assert.ok(doLo([f, gia3], (q) => q.topic).some((s) => /: such a funny$/.test(s)), "bộ dò phải bắt được một đoạn của đáp án là câu");
}

/* ---------- đề “Ôn chủ đề”: câu cùng chủ đề của kho cuối kì I ----------
   Đề “Ôn chủ đề” (Phiên UX14) rút 10 câu của một chủ đề từ mọi đề Tiếng Anh 12 có sẵn, có lời giải sau mỗi câu: Unit 6, 7 và phần ôn chỉ
   có ở kho này (mọi cặp câu cùng chủ đề có thể ra cùng lúc); Pronunciation, Cloze, Reading chung với kho cuối kì I (đoạn nào cũng có thể
   rút cùng nhau). Đáp án không trùng đáp án câu cùng chủ đề của kho cuối kì I; dò lộ như trên giữa mọi cặp câu cùng chủ đề có ít nhất
   một câu của kho này (cả câu của các đoạn khác nhau; đáp án là từ ngữ pháp chỉ dò trong cùng đoạn); chỗ đã xem ghi ở DA_XEM_CHU_DE.
   Kho cuối năm (ta12-ck2-*, Unit 6, 7 chung chủ đề với kho này) làm sau: tests/ta12-ck2.js so các cặp câu của hai kho, nên ở đây chỉ so với
   kho cuối kì I. */
const khoKhac = BANKS.filter((b) => b.file === "12-ta.js" && /^ta12-ck1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ q, b })));
const ten1 = new Map(), PSG_KHAC = new Map();
khoKhac.forEach(({ q, b }) => { ten1.set(q, b.id.replace("ta12-", "") + "#" + (b.questions.filter((x) => !b.pool || x.src === b.id).indexOf(q) + 1)); if (q.p) PSG_KHAC.set(q, b.passages[q.p]); });
const cungCD = khoKhac.map((x) => x.q).filter((q) => TOPICS.includes(q.topic));
assert.deepEqual([...new Set(cungCD.map((q) => q.topic))].sort(), ["Cloze", "Pronunciation", "Reading"], "chủ đề chung với kho cuối kì I: Pronunciation, Cloze, Reading");
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
// gần trùng (Rút ra N25; như tests/ta9-gk1.js): đề bài cùng lựa chọn, mảnh sắp xếp có từ 4 cặp hai từ liền nhau chung với một câu của kho
// cuối kì I (mọi chủ đề) và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính lời dặn chuẩn, cặp của nhãn chủ đề và
// cặp có ở từ 3% số câu của data/banks/12-ta.js.
const LOI_DAN = ["Write the correct form of the verb in brackets.", "Write the correct form of the word in brackets.", "Fill in the blank with one word.",
  "Put the sentences in the correct order to make a paragraph.", "Put the sentences in the correct order to make a letter.",
  "Put the sentences in the correct order to make a conversation.", LD_READ, LD_CLOZE, "Read the text again. Is each sentence true or false?",
  "Which part of the sentence is wrong?", "Choose the sentence closest in meaning:", "Choose the sentence that best combines the two sentences:",
  "Is each sentence grammatically correct?", "Choose the best option for blank (1).", "Choose the best option for blank (2).",
  "Choose the best option for blank (3).", "Which word is pronounced the same as", "In which phrase can a linking /r/ appear between the two words?",
  "In which sentence can a linking /r/ appear between two words?", "How many linking /r/ sounds can appear in this sentence?",
  "Choose the answer closest in meaning to", "Choose the answer opposite in meaning to", "in this sentence:"];
const boLoiDan = (s) => LOI_DAN.reduce((a, l) => a.split(l).join(" | "), String(s));
{
  const cap2 = (s) => { const w = boLoiDan(s).toLowerCase().replace(/[^a-z'|]+/g, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const ck1 = khoKhac.map((x) => x.q), tatCa = kho.concat(ck1), df = {};
  tatCa.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capCua = (q) => { const nh = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nh.has(c) && (df[c] || 0) < 0.03 * tatCa.length)); };
  const gan = kho.flatMap((q) => { const c = capCua(q); return ck1.map((o) => { const d = capCua(o), chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${ten1.get(o)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  assert.deepEqual(gan, [], "đề bài gần trùng câu của kho cuối kì I");
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
  // trang của từng Unit theo Contents (Unit 6 tr. 76–87, Unit 7 tr. 88–99), cộng Glossary (tr. 147–155; chữ OCR của Glossary lẫn hai
  // cột, nên tìm từ trong cả Glossary)
  const TRANG = { 6: [76, 87], 7: [88, 99] }, gl = raw.slice(raw.indexOf("GLOSSARY")).toLowerCase().replace(/\s+/g, " ");
  const chuUnit = (u) => { let s = ""; for (let t = TRANG[u][0]; t <= TRANG[u][1]; t++) s += " " + (trang[t] || ""); return s.toLowerCase().replace(/\s+/g, " "); };
  const coTrong = (u, t) => chuUnit(u).includes(t) || gl.includes(t);
  Object.entries(TU).forEach(([u, ws]) => ws.forEach((t) => assert.ok(coTrong(+u, t), `từ “${t}” không có trong trang của Unit ${u}`)));
  // từ hỏi nghĩa, đáp án câu dạng từ có trong trang của Unit của câu (cộng Glossary)
  kho.filter((q) => /meaning to “/.test(q.q)).forEach((q) => { const w = /meaning to “(\w+)”/.exec(q.q)[1]; assert.ok(coTrong(unitOf(q), w), `từ hỏi nghĩa “${w}” không có trong trang của Unit ${unitOf(q)}`); });
  fills.filter((q) => /form of the word/.test(q.q)).forEach((q) => assert.ok(coTrong(unitOf(q), q.ans[0].replace(/s$/, "")), `từ “${q.ans[0]}” không có trong trang của Unit ${unitOf(q)}`));
  // khung Remember! của Unit 6, 7 có các điểm ngữ pháp, âm mà câu hỏi
  ["have + someone + bare infinitive", "get + someone + to-infinitive", "past participle"].forEach((c) => assert.ok(chuUnit(6).includes(c), `khung câu sai khiến của Unit 6 có “${c}”`));
  // (chữ OCR đọc “so ... that” của khung thành “so ... thaf”)
  ["as if", "such ... that", "subjunctive were"].forEach((c) => assert.ok(chuUnit(7).includes(c), `khung mệnh đề trạng ngữ của Unit 7 có “${c}”`));
  assert.ok(chuUnit(6).includes("homophones") && chuUnit(7).includes("linking /r/"), "Book map: Unit 6 Homophones, Unit 7 Linking /r/");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book); tên Unit, từ của đáp án câu từ vựng, từ hỏi nghĩa, câu dạng từ có trong trang của Unit.");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !/^ta12-gk2-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + [q.q, q.x].concat(q.o || [], q.ans || [], q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn (đoạn điền, bài đọc), ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn; " + tf4.length + " câu đúng/sai 4 ý.");
console.log("TA12 GK2 OK");
