// Kiểm tra ngân hàng Tiếng Anh 12 cuối kì I của Phiên N12-ck1-ta (data/banks/12-ta.js, ta12-ck1-*), theo mẫu tests/ta9-ck1.js,
// tests/ta9-ck2.js. Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7
// như mọi kho lớp 12 (đoạn “Chung của các phiên lớp 12” của docs/KE-HOACH-NOI-DUNG.md), trọng tâm Units 4–5.
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho):
// - Pronunciation: phiên âm của từng lựa chọn ghi ở IPA (theo từ điển Anh – Anh), âm hỏi phải là nguyên âm đôi của Unit 1–3 trong Book
//   map; đúng một lựa chọn có âm đó (hay khác âm), lời giải ghi đúng phiên âm của đáp án. Trọng âm trong câu: Unit 4 (từ ngữ pháp như
//   mạo từ, giới từ, đại từ, trợ động từ, liên từ, động từ khuyết thiếu không nhấn: đúng một lựa chọn là từ ngữ pháp), Unit 5 (trợ động
//   từ, động từ khuyết thiếu được nhấn khi viết tắt với not hoặc không có động từ chính theo sau: đúng một câu như vậy);
// - quá khứ đơn, quá khứ tiếp diễn (Unit 1): hành động ngắn chỉ ở quá khứ đơn, mệnh đề while ở quá khứ tiếp diễn, mốc giờ cụ thể, việc
//   đã xong có năm, hành động dài bị cắt ngang (loiQK); câu chọn câu đồng nghĩa giữ vai của hai hành động;
// - mạo từ (Unit 2) theo bảng tên riêng, danh từ của khung Remember! (loiMaoTu); a / an theo âm đầu ghi trong bảng;
// - động từ + giới từ theo danh sách của sách (Unit 3), mệnh đề which chỉ cả câu đứng trước (Unit 3);
// - so sánh kép theo bảng dạng so sánh (Unit 4), hiện tại hoàn thành sau “the first time”, sau so sánh nhất + ever (Unit 4);
// - câu đơn, câu ghép, câu phức theo liên từ (Unit 5), liên từ theo quan hệ ý (trái ngược, bổ sung, mục đích…) có tín hiệu trong đề;
// - câu tìm lỗi sai: câu gốc sai theo bộ kiểm tra, câu đã sửa đúng, phần sai là phần duy nhất phải sửa; câu sắp xếp từ: mảnh đầu viết
//   hoa, mảnh cuối có dấu chấm; câu sắp xếp câu thành đoạn văn, thư (dạng câu của đề thi tốt nghiệp): năm theo thứ tự thời gian, câu mở
//   đầu bằng từ nối không đứng đầu, thư mở bằng lời chào và kết bằng lời kết.
// Rồi kiểm tra ma trận (hai đề cố định và câu riêng đều chia đúng ma trận, theo thứ tự chủ đề), tên chủ đề theo Contents của sách,
// Cloze (mỗi đề và phần câu riêng một đoạn điền 3 chỗ trống mức 1-2-3), Reading (mỗi đề và phần câu riêng một bài đọc 3 câu mức 1-2-3,
// dài hơn mọi bài đọc của các kho lớp 9), dạng câu (ít nhất 6 câu đúng/sai 4 ý, không lặp kiểu Đ/S), đáp án đúng không dài hơn hẳn lựa
// chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không lặp chữ của nhãn chủ đề, đề bài
// không trùng, note nói về đề chung của Sở, rút thử nhiều lần (đúng ma trận, trọn đoạn, gặp đủ kho; đã làm hết một đề cố định thì không
// rút lại câu của đề đó) và dò lộ đáp án giữa các câu rút được cùng lúc như tests/ta9-ck2.js (DO_LO=1 in ra để xem tay, danh sách đã
// xem ở DA_XEM).
// Có sách ở ../OnUp-Book (repo riêng tư): tên Unit theo Contents và mục lục trong README của cuốn; từ của đáp án câu từ vựng có trong
// trang của đúng Unit (cộng Glossary); động từ + giới từ có trong trang của Unit 3; mọi trường chữ (cả đoạn đọc; trừ lời dặn chuẩn,
// sách cũng dùng) không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm; DO_SACH=1 in chuỗi 6 từ).
// So thêm với mọi câu của các kho khác, cả câu riêng của các đề ngẫu nhiên: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/ta12-ck1.js → in TA12 CK1 OK.
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
const S = { de1: "ta12-ck1-de1", de2: "ta12-ck1-de2", pool: "ta12-ck1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 12); assert.equal(b.subject, "Tiếng Anh"); assert.equal(b.file, "12-ta.js");
  assert.ok(/common end-of-term test/.test(b.note) && /Department of Education/.test(b.note) && /Grade 12/.test(b.note), b.id + ": note nói về đề chung của Sở");
  assert.ok(/No listening/.test(b.note), b.id + ": note ghi không có câu nghe");
  assert.ok(/more questions on Units 4–5/.test(b.note), b.id + ": note ghi trọng tâm Units 4–5");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("ta12-ck1-", "") + "#" + (i + 1))));
const cauCua = (has) => { const m = kho.filter((q) => q.q.includes(has) || (q.type === "order" && q.o[0].includes(has))); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };
const trongNgoac = (s) => /“([^”]+)”/.exec(s)[1];

/* ---------- tên chủ đề theo Contents của sách, ma trận ---------- */
const UNITS = ["Life Stories We Admire", "A Multicultural World", "Green Living", "Urbanisation", "The World of Work"];
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
assert.deepEqual(TOPICS, ["Pronunciation"].concat(UNITS.map((u, i) => `Unit ${i + 1} · ${u}`), ["Cloze", "Reading"]),
  "chủ đề: Pronunciation, Unit 1–5 theo Contents, Cloze (đoạn điền), Reading");
const unitOf = (q) => { const m = /^Unit (\d+) · /.exec(q.topic); return m ? +m[1] : 0; };
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
[[d1.questions, "Đề 1"], [d2.questions, "Đề 2"], [rieng, "câu riêng"]].forEach(([d, at]) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, `${at}: đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `${at}: đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = dem(kho, t, l);
  assert.ok(v[l - 1] ? o >= 2 * v[l - 1] : o === 0, `ô (${t}, mức ${l}) rút ${v[l - 1]} câu, kho có ${o}`);
}));
// trọng tâm Units 4–5: mỗi Unit 4, 5 nhiều câu hơn mọi Unit 1–3
const soCau = (u) => sum(M[`Unit ${u} · ${UNITS[u - 1]}`]);
[4, 5].forEach((u) => assert.ok(soCau(u) > Math.max(soCau(1), soCau(2), soCau(3)), `Unit ${u} (trọng tâm) phải nhiều câu hơn Unit 1–3`));

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
Object.entries(PSG).forEach(([id, ps]) => {
  const qs = kho.filter((q) => q.p === id), w = soTu(ps.text);
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
// sắp xếp câu thành đoạn văn, thư (dạng câu của đề thi tốt nghiệp): mỗi đề cố định và phần câu riêng đúng một câu, ở ô Vận dụng
const SX_CAU = /^Put the sentences in the correct order to make a (paragraph|letter)\.$/;
[S.de1, S.de2, S.pool].forEach((id) => {
  const qs = kho.filter((q) => q.src === id && q.type === "order" && SX_CAU.test(q.q));
  assert.equal(qs.length, 1, id + ": đúng một câu sắp xếp câu thành đoạn văn, thư"); assert.equal(qs[0].lv, 3, id + ": câu sắp xếp câu ở mức Vận dụng");
});
// lời giải không nói “option A”, “the second sentence”: app xáo phương án, xáo các mảnh
kho.forEach((q) => assert.ok(!/\b(option|answer|sentence|statement)s? [A-D]\b|\bthe (first|second|third|fourth|last) (option|answer|sentence|statement|one)\b/i.test(q.x), "lời giải nhắc vị trí: " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau; một chỗ trống, hay hai chỗ trống mà lựa
// chọn nào cũng ghi hai phần “… / …”
const mc = kho.filter((q) => q.type === "mc");
mc.forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + ten.get(q));
  const n = q.q.split("___").length - 1;
  assert.ok(n <= 2, "nhiều nhất hai chỗ trống: " + ten.get(q));
  if (n === 2) assert.ok(q.o.every((o) => o.split(" / ").length === 2), "câu hai chỗ trống: lựa chọn ghi “… / …”: " + ten.get(q));
});
// đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn (tính cả khi bằng lựa chọn sai dài nhất,
// ngắn nhất, như tests/ta9-ck2.js)
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
// câu sắp xếp
kho.filter((q) => q.type === "order").forEach((q) => {
  assert.ok(q.o.length >= 4 && q.o.length <= 8, "câu sắp xếp có 4–8 mảnh: " + ten.get(q));
  if (!SX_CAU.test(q.q)) {
    // sắp xếp từ: mảnh đầu viết hoa, mảnh cuối có dấu chấm, các mảnh khác viết thường, lời giải ghi lại cả câu
    assert.equal(q.q, "Put the words in the correct order.", "lời dặn câu sắp xếp: " + ten.get(q));
    assert.ok(/^[A-Z]/.test(q.o[0]) && q.o.slice(1).every((o) => /^[a-z]/.test(o)), "chỉ mảnh đầu viết hoa: " + ten.get(q));
    assert.ok(/\.$/.test(q.o[q.o.length - 1]) && q.o.slice(0, -1).every((o) => !/[.?!]$/.test(o)), "chỉ mảnh cuối có dấu chấm: " + ten.get(q));
    assert.ok(q.x.includes(q.o.join(" ")), "lời giải ghi lại cả câu: " + ten.get(q));
    return;
  }
  // sắp xếp câu: mỗi mảnh là một câu (chữ hoa đầu, dấu chấm cuối; lời chào của thư: dấu phẩy; lời kết của thư: tên người viết)
  const thu = /letter/.test(q.q), cuoi = q.o.length - 1;
  q.o.forEach((o, i) => assert.ok(/^[A-Z]/.test(o) && (/\.$/.test(o) || (thu && i === 0 && /,$/.test(o)) || (thu && i === cuoi)), "mỗi mảnh là một câu: " + ten.get(q) + " → " + o));
  // năm đầu tiên của mỗi mảnh theo thứ tự thời gian; mảnh mở đầu bằng từ nối không đứng đầu
  const nam = q.o.map((o) => (/\b(1[89]\d\d|20\d\d)\b/.exec(o) || [])[1]).filter(Boolean).map(Number);
  assert.deepEqual(nam, nam.slice().sort((a, b) => a - b), "năm theo thứ tự thời gian: " + ten.get(q));
  assert.ok(!/^(After|Moreover|Then|Finally|However|Next|If this)\b/.test(q.o[0]), "mảnh đầu không mở bằng từ nối: " + ten.get(q));
  if (thu) {
    assert.ok(/^Dear /.test(q.o[0]) && /\bYours (sincerely|faithfully), [A-Z]/.test(q.o[cuoi]), "thư mở bằng lời chào, kết bằng lời kết và tên: " + ten.get(q));
    assert.ok(q.o.findIndex((o) => /^Moreover\b/.test(o)) >= 3, "Moreover đứng sau câu nêu kinh nghiệm: " + ten.get(q));
  }
});
// câu tìm lỗi sai: các lựa chọn là các phần của câu trong ngoặc
kho.filter((q) => LOI.test(q.q)).forEach((q) => { const c = trongNgoac(q.q); q.o.forEach((o) => assert.ok(c.includes(o), `“${o}” không phải phần của câu: ` + ten.get(q))); });
// câu điền: lời dặn; câu chia động từ có động từ trong ngoặc ngay sau chỗ trống, đáp án là dạng của động từ đó
kho.filter((q) => q.type === "fill").forEach((q) => {
  assert.equal(q.q.split("___").length, 2, "câu điền có đúng một chỗ trống: " + ten.get(q));
  if (/^Fill in the blank with one word\./.test(q.q)) { q.ans.forEach((a) => assert.ok(/^[a-z]+$/i.test(a), "đáp án một từ: " + ten.get(q))); return; }
  assert.ok(/^Write the correct form of the verb in brackets\./.test(q.q), "lời dặn câu điền: " + ten.get(q));
  const m = /___ \(([^)]+)\)/.exec(q.q); assert.ok(m, "động từ trong ngoặc ngay sau chỗ trống: " + ten.get(q));
  q.ans.forEach((a) => assert.ok(a.includes(m[1].replace(/e$/, "").slice(0, 4)), `đáp án “${a}” không phải dạng của “${m[1]}”: ` + ten.get(q)));
});

/* ---------- Pronunciation: tính lại đáp án theo phiên âm, theo luật trọng âm trong câu của sách ---------- */
// Âm trong Book map (tr. 4): Unit 1 /eɪ/, /əʊ/; Unit 2 /ɔɪ/, /aɪ/, /aʊ/; Unit 3 /ɪə/, /eə/, /ʊə/. Unit 4: unstressed words in connected
// speech; Unit 5: stressing auxiliary and modal verbs.
const AM = ["eɪ", "əʊ", "ɔɪ", "aɪ", "aʊ", "ɪə", "eə", "ʊə"];
const IPA = { steak: "steɪk", steam: "stiːm", stem: "stem", stack: "stæk", loyal: "lɔɪəl", local: "ləʊkl", lovely: "lʌvli", loud: "laʊd",
  chair: "tʃeə", cheer: "tʃɪə", chore: "tʃɔː", chart: "tʃɑːt", flown: "fləʊn", town: "taʊn", brown: "braʊn", crown: "kraʊn" };
const NGUYEN_AM = /[æɑɒɔəɜeɪiʊuʌaː]+/g;
// từ ngữ pháp không nhấn trong câu (khung Remember! tr. 49): mạo từ, giới từ, đại từ nhân xưng, tính từ sở hữu, trợ động từ, liên từ,
// động từ khuyết thiếu, there is / there are
const TU_NGU_PHAP = new Set(("a an the of to for in on at from with by into until above i you we they he she it my your our their her his its " +
  "be am is are was were been have has had do does did and but or so can could will would shall should may might must there").split(" "));
const TRO = /\b(am|is|are|was|were|have|has|had|do|does|did|can|could|will|would|shall|should|may|might|must)(n't)?\b|\b(haven't|hasn't|don't|doesn't|didn't|can't|won't|wasn't|weren't|isn't|aren't|couldn't|wouldn't|shouldn't|mustn't)\b/gi;
const PP = { become: "become", take: "taken", see: "seen", visit: "visited", finish: "finished" };
let n = 0;
const daTinh = new Set();
kho.filter((q) => q.topic === "Pronunciation").forEach((q) => {
  daTinh.add(q); n++;
  if (/NOT stressed in connected speech/.test(q.q)) {
    // Unit 4: đúng một lựa chọn là từ ngữ pháp (ở đây là trợ động từ: có quá khứ phân từ theo sau), các lựa chọn đều có trong câu
    const c = trongNgoac(q.q), w = c.toLowerCase().replace(/[.,!?]/g, "").split(" ");
    q.o.forEach((o) => assert.ok(w.includes(o), `“${o}” không có trong câu: ` + ten.get(q)));
    const d = q.o.filter((o) => TU_NGU_PHAP.has(o)); assert.deepEqual(d, [q.o[0]], "đúng một lựa chọn là từ ngữ pháp: " + ten.get(q));
    assert.ok(Object.values(PP).includes(w[w.indexOf(q.o[0]) + 1]), "trợ động từ có quá khứ phân từ theo sau: " + ten.get(q));
    return;
  }
  if (/auxiliary or modal verb usually stressed/.test(q.q)) {
    // Unit 5: mỗi câu đúng một trợ động từ / động từ khuyết thiếu; được nhấn khi viết tắt với not hoặc không có động từ chính theo sau
    const nhan = q.o.filter((o) => {
      const m = o.match(TRO) || []; assert.equal(m.length, 1, "mỗi câu đúng một trợ động từ: " + o);
      return /n't$/i.test(m[0]) || new RegExp("\\b" + m[0] + "[.!?]$", "i").test(o);
    });
    assert.deepEqual(nhan, [q.o[0]], "đúng một câu có trợ động từ được nhấn: " + ten.get(q));
    return;
  }
  q.o.forEach((o) => assert.ok(IPA[o], "chưa có phiên âm của “" + o + "”: " + ten.get(q)));
  const ph = q.o.map((o) => IPA[o]);
  let dung, am;
  if (/has the sound \/([^/]+)\//.test(q.q)) { am = /\/([^/]+)\//.exec(q.q)[1]; dung = q.o.filter((o, i) => ph[i].includes(am)); }
  else if (/different vowel sound/.test(q.q)) {
    const v = ph.map((x) => x.match(NGUYEN_AM).join(""));
    assert.ok(q.o.every((o, i) => ph[i].match(NGUYEN_AM).length === 1), "từ một âm tiết: " + ten.get(q));
    dung = q.o.filter((o, i) => v.filter((x) => x === v[i]).length === 1);
    [...new Set(v)].forEach((a) => assert.ok(AM.includes(a), `âm /${a}/ không có trong Book map: ` + ten.get(q)));
    am = v[q.o.indexOf(dung[0])];
  } else assert.fail("câu Pronunciation chưa có cách tính: " + ten.get(q));
  assert.ok(AM.includes(am), `âm /${am}/ không có trong Book map Unit 1–3: ` + ten.get(q));
  assert.deepEqual(dung, [q.o[0]], "đáp án tính lại khác: " + ten.get(q) + " → " + dung.join(", "));
  assert.ok(q.x.replace(/[ˈˌ]/g, "").includes("/" + IPA[q.o[0]] + "/"), "lời giải ghi phiên âm của đáp án: " + ten.get(q));
});
assert.ok(kho.some((q) => /NOT stressed in connected speech/.test(q.q)) && kho.some((q) => /auxiliary or modal verb usually stressed/.test(q.q)), "Pronunciation có trọng âm trong câu của Unit 4 và Unit 5");

/* ---------- ngữ pháp: bộ kiểm tra ---------- */
const coCum = (s, c) => (" " + s.toLowerCase().replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ") + " ").includes(" " + c.toLowerCase() + " ");
const dien = (q, o) => q.q.replace(/^[^.]*\. (?=[A-Z])/, (m) => (/^(Write|Fill)/.test(m) ? "" : m)).replace("___", o);
// Unit 1: quá khứ đơn, quá khứ tiếp diễn (khung Remember! tr. 10). Hành động ngắn (NGAN) chỉ ở quá khứ đơn; hành động dài (DAI) bị cắt
// ngang bởi when + hành động ngắn thì ở quá khứ tiếp diễn; mệnh đề while ở quá khứ tiếp diễn; mốc giờ cụ thể (At 9 p.m. …) dùng quá khứ
// tiếp diễn; việc đã xong có năm (in 2018) dùng quá khứ đơn; câu kể việc đã qua không có thì hiện tại.
const QKD = { rang: "ring", "went out": "go out", broke: "break", arrived: "arrive", moved: "move", finished: "finish", saw: "see",
  walked: "walk", skied: "ski", cooked: "cook", took: "take", watched: "watch", "went skiing": "go skiing", lost: "lose" };
const ING = { ringing: "ring", "going out": "go out", breaking: "break", arriving: "arrive", moving: "move", finishing: "finish", seeing: "see",
  walking: "walk", skiing: "ski", cooking: "cook", taking: "take", watching: "watch", cleaning: "clean", shining: "shine", losing: "lose" };
const NGAN = ["ring", "go out", "break", "arrive", "move", "finish", "see", "lose"], DAI = ["take", "cook", "clean", "watch", "ski", "walk", "shine"];
const HIEN_TAI = /\b(rings|cooks|has rung|have rung|takes|is ringing)\b/;
const menhDe = (s) => s.replace(/[.!?]$/, "").split(/,\s*| (?=(?:when|while|after|and then) )/i).map((c) => c.trim()).filter(Boolean);
const dongTu = (c) => {
  const m = /\b(was|were) (going out|\w+ing)\b/.exec(c);
  if (m) return { thi: "QKTD", v: ING[m[2]] || m[2] };
  const f = Object.keys(QKD).find((k) => coCum(c, k));
  if (f) return { thi: "QKD", v: QKD[f] };
  return HIEN_TAI.test(c) ? { thi: "HT", v: "" } : null;
};
const loiQK = (s) => {
  const loi = [], cs = menhDe(s).map((c) => ({ c, d: dongTu(c) })).filter((x) => x.d);
  cs.forEach(({ c, d }) => {
    if (d.thi === "HT") loi.push("thì hiện tại trong câu kể việc đã qua: " + c);
    if (d.thi === "QKTD" && NGAN.includes(d.v)) loi.push("hành động ngắn dùng quá khứ đơn: " + c);
    if (/^while\b/i.test(c) && d.thi !== "QKTD") loi.push("mệnh đề while (hành động dài) dùng quá khứ tiếp diễn: " + c);
    if (/\bin (1[89]|20)\d\d\b/.test(c) && d.thi === "QKTD") loi.push("việc đã xong, có năm: quá khứ đơn: " + c);
  });
  if (/^At \d+ (a|p)\.m\./.test(s)) cs.filter((x) => DAI.includes(x.d.v) && x.d.thi !== "QKTD").forEach((x) => loi.push("mốc giờ cụ thể: quá khứ tiếp diễn: " + x.c));
  const ngan = /\bwhen\b/i.test(s) && cs.find((x) => NGAN.includes(x.d.v) && x.d.thi === "QKD");
  if (ngan) cs.filter((x) => x !== ngan && DAI.includes(x.d.v) && x.d.thi !== "QKTD").forEach((x) => loi.push("hành động dài bị cắt ngang: quá khứ tiếp diễn: " + x.c));
  return loi;
};
const vai = (s) => { const r = {}; menhDe(s).forEach((c) => { const d = dongTu(c); if (d) r[d.v] = d.thi; }); return r; };
// Unit 2: mạo từ (khung Remember! tr. 22–23): the với nhạc cụ (sau play), đại dương, sông, nước có tên số nhiều hay có chữ kingdom, states,
// vật duy nhất (moon, world); không mạo từ với tên thành phố, phần lớn tên nước, một ngọn núi, danh từ số nhiều, không đếm được dùng
// chung chung; danh từ đếm được số ít chưa xác định (hour, certificate) cần a / an, theo âm đầu ghi ở AM_DAU (không đoán theo chữ cái).
const TEN = ["indian ocean", "united kingdom", "united states", "ha noi", "hoi an", "mount fuji", "da nang", "viet nam"];
const THE = ["indian_ocean", "philippines", "united_kingdom", "united_states", "nile", "moon", "world", "violin", "guitar"];
const ZERO = ["japan", "egypt", "ha_noi", "hoi_an", "mount_fuji", "globalisation", "elephants", "canada"];
const BAT_DINH = ["hour", "up-to-date"];
const AM_DAU = { hour: "nguyên âm", "up-to-date": "nguyên âm", united_kingdom: "phụ âm", university: "phụ âm", school: "phụ âm", documentary: "phụ âm" };
const tachTu = (s) => TEN.reduce((a, t) => a.split(t).join(t.replace(" ", "_")), " " + s.toLowerCase().replace(/[“”".,;:!?()]/g, " ") + " ").split(/\s+/).filter(Boolean);
const loiMaoTu = (s) => {
  const t = tachTu(s), loi = [];
  t.forEach((x, i) => {
    if (THE.includes(x) && t[i - 1] !== "the") loi.push("cần the trước " + x);
    if (ZERO.includes(x) && ["the", "a", "an"].includes(t[i - 1])) loi.push(x + " không có mạo từ");
    if (BAT_DINH.includes(x) && !["a", "an"].includes(t[i - 1])) loi.push("cần a / an trước " + x);
    if (x === "a" || x === "an") {
      const sau = t[i + 1], am = AM_DAU[sau] || (/^[aeiou]/.test(sau || "") ? "nguyên âm" : "phụ âm");
      if ((x === "an") !== (am === "nguyên âm")) loi.push(`${x} ${sau}: dùng ${am === "nguyên âm" ? "an" : "a"}`);
    }
  });
  return loi;
};
// Unit 3: động từ + giới từ (khung Remember! tr. 34; đối chiếu chữ của sách ở dưới)
const VP = { apologise: "for", apologised: "for", care: "about", prepare: "for", preparing: "for", rely: "on", depend: "on", depends: "on",
  explain: "to", explained: "to" };
const loiGioiTu = (s) => { const t = tachTu(s), loi = []; t.forEach((x, i) => { if (VP[x] && t[i + 1] !== VP[x]) loi.push(`${x} ${VP[x]}, không phải ${x} ${t[i + 1]}`); }); return loi; };
// Unit 3: mệnh đề quan hệ chỉ cả câu đứng trước: dấu phẩy + which + động từ số ít; không dùng that, what, who, and which, không bỏ dấu phẩy
const whichCaCau = (s) => /, which (has|makes|helps|encourages|is)\b/.test(s) && !/, (that|what|who|and which) /.test(s);
// Unit 4: so sánh kép (khung Remember! tr. 51): so sánh hơn + and + so sánh hơn, more and more + tính từ dài; The + so sánh hơn …, the +
// so sánh hơn …; dạng so sánh theo bảng
const SS = { crowded: "more crowded", tall: "taller", late: "later", long: "longer" }, SS_V = Object.values(SS);
const ssKep = (s) => {
  const l = s.toLowerCase();
  const m1 = /\b(\w+er) and (\w+er)\b/.exec(l); if (m1 && m1[1] === m1[2] && SS_V.includes(m1[1])) return true;
  const m2 = /\bmore and more (\w+)\b/.exec(l); if (m2 && SS_V.includes("more " + m2[1])) return true;
  const m3 = /^the (more \w+|\w+er)\b[^,]*, the (more \w+|\w+er)\b/.exec(l); return !!(m3 && SS_V.includes(m3[1]) && SS_V.includes(m3[2]));
};
// Unit 4: hiện tại hoàn thành (khung Remember! tr. 50): This is the first / second time + chủ ngữ + have / has + quá khứ phân từ; so sánh
// nhất + chủ ngữ + have / has ever + quá khứ phân từ; Since + mốc quá khứ, … have / has + quá khứ phân từ
const PP_V = Object.values(PP);
const htht = (s) => {
  const l = s.toLowerCase();
  const m1 = /\bis the (first|second|third) time (?:\w+ ){1,3}?(has|have) (\w+)\b/.exec(l); if (m1) return PP_V.includes(m1[3]);
  const m2 = /\bthe (most \w+|\w+est) .*\b(has|have) ever (\w+)\b/.exec(l); return !!(m2 && PP_V.includes(m2[3]));
};
const sauSince = (s) => { const m = /^Since [^,]+, (.*)$/.exec(s); return !!m && new RegExp("\\b(have|has) (" + PP_V.join("|") + ")\\b").test(m[1]); };
// Unit 5: liên từ theo quan hệ ý; câu đơn, câu ghép, câu phức (khung tr. 63)
const QH = { although: "trái ngược", though: "trái ngược", however: "trái ngược", because: "nguyên nhân", "because of": "nguyên nhân + danh từ",
  if: "điều kiện", unless: "điều kiện phủ định", "so that": "mục đích", therefore: "kết quả", thus: "kết quả", "as a result": "kết quả",
  "for example": "ví dụ", "in addition": "bổ sung", moreover: "bổ sung", instead: "thay thế" };
const CN = "(i|you|he|she|it|we|they|my|his|her|our|their|the|lan|mai|nam)";
const PHU_THUOC = ["when", "while", "because", "although", "if", "unless", "so that", "since", "after", "before"];
const DANG_LAP = ["and", "but", "or", "nor", "yet", "so"], TRANG_NOI = ["as a result", "moreover", "in fact", "on the other hand", "however", "therefore"];
const loaiCau = (s) => {
  const l = s.toLowerCase().replace(/[.!?]$/, "");
  if (PHU_THUOC.some((c) => new RegExp("(^|, | )" + c + " " + CN + "\\b").test(l))) return "complex";
  if (DANG_LAP.some((c) => new RegExp(", " + c + " " + CN + "\\b").test(l)) || TRANG_NOI.some((c) => l.includes("; " + c + ","))) return "compound";
  return "simple";
};
// lỗi nối câu: because / although (phụ thuộc) và so / but (đẳng lập) không nối cùng hai mệnh đề
const loiNoi = (s) => (/^(Because|Although)\b/.test(s) && /, (so|but) /.test(s) ? ["không dùng because / although cùng so / but"] : []);
// tự thử các bộ kiểm tra với câu cố ý viết sai
assert.ok(loiQK("When the phone was ringing, I was cooking.").length && !loiQK("When the phone rang, I was cooking.").length, "loiQK tự thử");
assert.ok(loiMaoTu("She swam in Pacific.").length === 0 && loiMaoTu("We visited the Egypt.").length && loiMaoTu("I waited a hour.").length, "loiMaoTu tự thử");
assert.ok(loiGioiTu("We rely in buses.").length && !loiGioiTu("We rely on buses.").length, "loiGioiTu tự thử");
assert.ok(!whichCaCau("He came late, that annoyed us.") && whichCaCau("He came late, which annoyed us.".replace("annoyed", "makes")), "whichCaCau tự thử");
assert.ok(ssKep("The roads are getting longer and longer.") && !ssKep("The roads are getting long and longer."), "ssKep tự thử");
assert.ok(htht("This is the second time we have visited it.") && !htht("This is the second time we visited it."), "htht tự thử");
assert.equal(loaiCau("If it rains, we stay home."), "complex"); assert.equal(loaiCau("It rained, so we stayed home."), "compound"); assert.equal(loaiCau("We stayed home."), "simple");

/* ---------- ngữ pháp: tính lại đáp án ---------- */
// câu tìm lỗi: câu gốc sai theo bộ kiểm tra; sửa phần sai (o[0]) thành `sua` thì câu đúng, câu đã sửa có trong lời giải (cả câu, hay
// `trongLoiGiai`), mọi phần khác giữ nguyên trong câu đã sửa (phần sai là phần duy nhất phải sửa)
const kiemLoi = (q, loi, sua, trongLoiGiai) => {
  const c = trongNgoac(q.q), moi = c.replace(q.o[0], sua);
  assert.ok(loi(c).length, "câu gốc phải sai: " + ten.get(q));
  assert.deepEqual(loi(moi), [], "câu đã sửa phải đúng: " + ten.get(q) + " → " + moi);
  q.o.slice(1).forEach((o) => assert.ok(moi.includes(o), `phần “${o}” không phải sửa: ` + ten.get(q)));
  assert.ok(q.x.includes(trongLoiGiai || moi), "lời giải ghi câu đã sửa: " + ten.get(q));
  return q.o[0];
};
const motLuaChon = (q, ok, at) => { const d = q.o.filter(ok); assert.equal(d.length, 1, (at || "đúng một lựa chọn đúng") + ": " + ten.get(q) + " → " + JSON.stringify(d)); return d[0]; };
const quanHe = (q, tinHieu, qh) => {
  assert.ok(tinHieu.test(q.p ? PSG[q.p].text : q.q), "tín hiệu của quan hệ " + qh + ": " + ten.get(q));
  q.o.forEach((o) => assert.ok(QH[o.toLowerCase()], "lựa chọn không có trong bảng liên từ: " + o));
  return motLuaChon(q, (o) => QH[o.toLowerCase()] === qh, "đúng một liên từ chỉ quan hệ " + qh);
};
const THU = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const CHECKS = [
  // Unit 1
  { has: "When the fire alarm ___", right: (q) => motLuaChon(q, (o) => !loiQK(dien(q, o)).length) },
  { has: "While my mother ___ (cook)", right: (q) => {
    const c = (o) => dien(q, o).replace(" (cook)", "");
    assert.deepEqual(loiQK(c(q.ans[0])), []); ["cooked", "cooks"].forEach((f) => assert.ok(loiQK(c(f)).length, "dạng khác phải sai: " + f));
    return q.ans[0];
  } },
  { has: "When the lights were going out", right: (q) => kiemLoi(q, loiQK, "went out") },
  { has: "Is each sentence grammatically correct?", unit: 1, right: (q) => q.o.map((o) => !loiQK(o).length) },
  { has: "My aunt broke her leg while she was skiing", right: (q) => {
    const g = vai(trongNgoac(q.q)); assert.deepEqual(g, { break: "QKD", ski: "QKTD" }, "câu gốc: trượt tuyết là hành động dài");
    return motLuaChon(q, (o) => !loiQK(o).length && /\b(when|while)\b/.test(o) && JSON.stringify(vai(o)) === JSON.stringify({ ski: "QKTD", break: "QKD" }));
  } },
  { has: "", order: "Pham Van Long was born", right: () => null },
  // Unit 2
  { has: "Is each sentence grammatically correct?", unit: 2, right: (q) => q.o.map((o) => !loiMaoTu(o).length) },
  { has: "travelled to the Japan", right: (q) => kiemLoi(q, loiMaoTu, "Japan", "travelled to Japan") },
  { has: "It took us ___ hour", right: (q) => motLuaChon(q, (o) => !loiMaoTu(dien(q, o.replace("– (no article)", ""))).length) },
  { has: "about ___ Egypt and ___ Nile", right: (q) => motLuaChon(q, (o) => { const [a, b] = o.split(" / ").map((x) => (x === "–" ? "" : x)); return !loiMaoTu(trongNgoac(q.q).replace("___", a).replace("___", b)).length; }) },
  { has: "Which sentence uses articles correctly?", right: (q) => motLuaChon(q, (o) => !loiMaoTu(o).length) },
  { has: "Thanks to the globalisation", right: (q) => kiemLoi(q, loiMaoTu, "globalisation", "Thanks to globalisation, young people can now enjoy") },
  // Unit 3
  { has: "apologised ___ wrapping", right: (q) => { assert.deepEqual(loiGioiTu(dien(q, q.ans[0])), []); return VP.apologised; } },
  { has: "Is each sentence grammatically correct?", unit: 3, right: (q) => q.o.map((o) => !loiGioiTu(o).length) },
  { has: "depends ___ the students", right: (q) => motLuaChon(q, (o) => !loiGioiTu(dien(q, o)).length) },
  { has: "Our school has banned plastic straws. This", right: (q) => motLuaChon(q, whichCaCau) },
  { has: "", order: "My neighbours", right: (q) => { assert.ok(whichCaCau(q.o.join(" ")), "mệnh đề which chỉ cả câu"); return null; } },
  { has: "that encourages people to reuse", right: (q) => kiemLoi(q, (s) => (whichCaCau(s) ? [] : ["dùng , which"]), "which encourages", "…, which encourages people to reuse things.") },
  // Unit 4
  { has: "have been getting ___", right: (q) => motLuaChon(q, (o) => ssKep(dien(q, o))) },
  { has: "___ we leave home, the longer", right: (q) => motLuaChon(q, (o) => ssKep(dien(q, o))) },
  { has: "apartment blocks in our city are getting ___", right: (q) => motLuaChon(q, (o) => ssKep(dien(q, o))) },
  { has: "my grandmother takes the metro", right: (q) => kiemLoi(q, (s) => (htht(s) ? [] : ["hiện tại hoàn thành sau the first time"]), "has taken the metro", "This is the first time my grandmother has taken the metro.") },
  { has: "I have never seen such a modern train station", right: (q) => {
    assert.ok(/\bhave never seen such a (\w+)/.test(q.q), "câu gốc: never … such a + tính từ");
    return motLuaChon(q, (o) => htht(o) && o.includes("the most " + /such a (\w+)/.exec(q.q)[1]));
  } },
  { has: "", order: "The graph shows the percentage", right: () => null },
  // Unit 5
  { has: "___ the pay was low, Mai took the job", right: (q) => quanHe(q, /pay was low, Mai took the job/, "trái ngược") },
  { has: "Is each sentence a complex sentence?", right: (q) => q.o.map((o) => loaiCau(o) === "complex") },
  { has: "Which sentence is a compound sentence?", right: (q) => motLuaChon(q, (o) => loaiCau(o) === "compound") },
  { has: "The job is well-paid. It also offers", right: (q) => motLuaChon(q, (o) => /\bnot only\b.*\bbut also\b/.test(o) && !/\b(not offer|cannot|because|so it)\b/.test(o) && /pays well/.test(o) && /offers flexible working hours/.test(o)) },
  { has: "so she took a part-time job", right: (q) => kiemLoi(q, loiNoi, "she took", "Because she wanted to save money for university, she took a part-time job at a bookshop.") },
  { has: "", order: "Dear Ms Linh,", right: () => null },
  // Cloze
  { has: "", p: "green-swap", k: 1, right: (q) => { const sau = /\(1\) ___ (\w+)/.exec(PSG[q.p].text)[1]; assert.ok(THU.includes(sau), "sau chỗ trống là thứ trong tuần"); return "on"; } },
  { has: "", p: "green-swap", k: 2, right: (q) => motLuaChon(q, (o) => whichCaCau(cauTrong(q).replace("___", o))) },
  { has: "", p: "green-swap", k: 3, right: (q) => quanHe(q, /saves everyone money\. \(3\) ___, every student who brings .* free cloth bag/, "bổ sung") },
  { has: "", p: "summer-jobs", k: 1, right: (q) => { assert.ok(/To \(1\) ___, please send us your CV/.test(PSG[q.p].text), "gửi CV là để xin việc"); return "apply"; } },
  { has: "", p: "summer-jobs", k: 2, right: (q) => motLuaChon(q, (o) => !loiMaoTu(cauTrong(q).replace("___", o.replace("– (no article)", ""))).length) },
  { has: "", p: "summer-jobs", k: 3, right: (q) => quanHe(q, /not very high; \(3\) ___, all our staff get free entry/, "trái ngược") },
  { has: "", p: "riverside-park", k: 1, right: (q) => { assert.ok(/^\(1\) ___ the past,/m.test(PSG[q.p].text), "in the past"); return "In"; } },
  { has: "", p: "riverside-park", k: 2, right: (q) => motLuaChon(q, (o) => sauSince(cauTrong(q).replace("___", o))) },
  { has: "", p: "riverside-park", k: 3, right: (q) => quanHe(q, /on a lead \(3\) ___ everyone can enjoy/, "mục đích") }
];
CHECKS.forEach((c) => {
  let q;
  if (c.order) { const m = kho.filter((x) => x.type === "order" && x.o[0].startsWith(c.order)); assert.equal(m.length, 1, "câu sắp xếp mở đầu “" + c.order + "”"); q = m[0]; }
  else if (c.p) { const m = kho.filter((x) => x.p === c.p && x.q === `Choose the best option for blank (${c.k}).`); assert.equal(m.length, 1, `chỗ trống (${c.k}) của ${c.p}`); q = m[0]; }
  else if (c.unit) { const m = kho.filter((x) => x.q.includes(c.has) && unitOf(x) === c.unit); assert.equal(m.length, 1, `“${c.has}” ở Unit ${c.unit}`); q = m[0]; }
  else q = cauCua(c.has);
  const want = c.right(q), at = ten.get(q) + " (" + (c.has || c.order || c.p + " " + c.k) + ")";
  assert.ok(!daTinh.has(q), "câu được tính hai lần: " + at);
  daTinh.add(q); n++;
  if (want === null) return;
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
});
// câu nào cũng đã tính lại, trừ câu từ vựng (kiểm tra theo từ của sách ở dưới), câu Reading
const TU = { 1: ["attend", "achievement", "on cloud nine"], 2: ["cuisine", "custom", "culture shock"], 3: ["landfill", "single-use", "decompose"],
  4: ["afford", "rush hour", "unemployment", "resident", "leisure", "gradually"], 5: ["bonus", "shift", "rewarding", "vacancy", "repetitive", "overtime"] };
const tuVung = kho.filter((q) => unitOf(q) && !daTinh.has(q));
tuVung.forEach((q) => {
  assert.ok(q.type === "mc" && q.lv === 1, "câu chưa tính lại đáp án (chỉ câu từ vựng mức Biết được bỏ qua): " + ten.get(q));
  assert.equal(TU[unitOf(q)].filter((t) => q.o[0].toLowerCase().startsWith(t)).length, 1, "đáp án câu từ vựng là từ của Unit trong TU: " + ten.get(q));
});
Object.entries(TU).forEach(([u, ws]) => ws.forEach((t) => assert.equal(tuVung.filter((q) => unitOf(q) === +u && q.o[0].toLowerCase().startsWith(t)).length, 1, `từ “${t}” của Unit ${u}: đúng một câu`)));
assert.equal(kho.filter((q) => q.topic === "Reading" || daTinh.has(q) || tuVung.includes(q)).length, kho.length);
// ô rút từ 2 câu chỉ có câu từ vựng (Rút ra N9-ck2-ta): hai câu cùng điểm ngữ pháp không ra cùng đề
Object.entries(M).forEach(([t, v]) => v.forEach((k, l) => { if (k >= 2) kho.filter((q) => q.topic === t && q.lv === l + 1).forEach((q) => assert.ok(tuVung.includes(q), `ô (${t}, mức ${l + 1}) rút ${k} câu: chỉ đặt câu từ vựng: ` + ten.get(q))); }));

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
   Như tests/ta9-ck2.js. Rút cùng lúc: khác chủ đề, cùng chủ đề khác mức, hoặc cùng ô mà ô rút từ 2 câu (Rút ra N25); câu của hai đoạn
   khác nhau không bao giờ rút cùng lúc. Chữ cần dò của đáp án (lựa chọn đúng, đáp án điền), so cả từ theo gốc từ: đáp án một từ thì từ
   đó, từ ngữ pháp (NGU_PHAP: on, which, an…) chỉ dò ở câu cùng chủ đề; đáp án 2–3 từ thì cả cụm; đáp án là câu thì các chuỗi 3 từ liền
   nhau không có ở lựa chọn sai nào. Đáp án câu Reading chỉ dò ở câu cùng đoạn; đáp án câu Cloze dò như câu thường (đáp án là từ ngữ
   pháp thì chỉ ở câu cùng đoạn); câu Pronunciation không dò (thấy từ ở câu khác không lộ cách đọc); câu hai chỗ trống (“– / the”) không
   dò. Chữ của câu kia: đề bài, đáp án, lời giải, ý của câu đúng/sai, mảnh của câu sắp xếp, đoạn đọc (lựa chọn sai của câu trắc nghiệm
   không tính). Đáp án không lặp từ (trừ từ ngữ pháp) của chính đề bài câu có chỗ trống (Rút ra N12). */
const NGU_PHAP = new Set(("a an the of to in on at for from with by about and or but so than as if when while because before after " +
  "is are was were be been am have has had do does did will would can could should must might may not no i you he she it we they me " +
  "him her us them my your his its our their this that these those there here what where who whose how which why yet since ago already " +
  "ever never just very too more most all some any one every each other also up out down off around away into over whether").split(" "));
const tu = (s) => String(s).toLowerCase().replace(/[^a-z' ]+/g, " ").split(/\s+/).filter(Boolean).map((w) => w.replace(/'s$/, ""));
const goc1 = (w) => { w = w.replace(/ies$/, "y"); const d = ["ing", "ed", "es", "s", "e"].find((x) => w.endsWith(x) && w.length - x.length >= 4 && !/ss$/.test(w)); return d ? w.slice(0, -d.length) : w; };
const noi = (s) => " " + tu(s).map(goc1).join(" ") + " ";
const chuCua = (q, coDoan) => [q.q, q.x].concat(q.type === "mc" ? [q.o[0]] : q.o || [], q.ans || [], coDoan && q.p ? [PSG[q.p].text] : []);
const cungLuc = (a, b) => a !== b && !(a.p && b.p && a.p !== b.p) && (a.topic !== b.topic || a.lv !== b.lv || M[a.topic][a.lv - 1] >= 2);
const doLo = (qs, tenCau) => {
  const ra = [];
  qs.forEach((q) => {
    if ((q.type !== "mc" && q.type !== "fill") || q.topic === "Pronunciation" || (q.type === "mc" && / \/ /.test(q.o[0]))) return;
    const raw = tu(q.type === "mc" ? q.o[0] : q.ans[0]), w = raw.map(goc1), sai = q.type === "mc" ? q.o.slice(1).map(noi) : [];
    const can = w.length >= 4 ? [...new Set(w.slice(0, -2).map((_, i) => w.slice(i, i + 3).join(" ")))].filter((c) => !sai.some((s) => s.includes(" " + c + " "))) : [w.join(" ")];
    const nguPhap = raw.length === 1 && NGU_PHAP.has(raw[0]);
    if (/___/.test(q.q) && q.topic !== "Reading") {
      const de = new Set(tu(q.q.replace(/\([^)]*\)/g, " ")).map(goc1));
      raw.filter((x) => !NGU_PHAP.has(x)).map(goc1).filter((x) => de.has(x)).forEach((x) => ra.push(`${tenCau(q)} (chính đề bài): ${x}`));
    }
    qs.forEach((p2) => {
      if (!cungLuc(q, p2) || (nguPhap && q.topic !== p2.topic) || (q.topic === "Reading" && p2.p !== q.p)) return;
      const T = chuCua(p2, p2.p !== q.p).map(noi).join("|");
      can.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
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
  const a = cauCua("ends up in a huge ___"), b = cauCua("Rents in the city centre");
  const gia = Object.assign({}, b, { x: b.x + " Some of the city's rubbish goes to a landfill." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => /: landfill$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
  const c = cauCua("depends ___ the students"), e = cauCua("we bury fruit peel");
  const gia2 = Object.assign({}, e, { x: e.x + " It depends on the weather." });
  assert.ok(doLo([c, gia2], (q) => q.topic).some((s) => /: on$/.test(s)), "bộ dò phải bắt được đáp án ngữ pháp ở câu cùng Unit");
  const f = cauCua("we bury fruit peel"), g = cauCua("Rents in the city centre");
  const gia3 = Object.assign({}, g, { x: "Plastic decomposes very slowly." });
  assert.ok(doLo([f, gia3], (q) => q.topic).some((s) => /: decompos$/.test(s)), "bộ dò phải bắt được dạng khác của đáp án (decompose / decomposes)");
  const h = kho.find((q) => q.p === "summer-jobs" && /\(3\)/.test(q.q)), r = cauCua("Which sentence is a compound sentence?");
  const gia4 = Object.assign({}, r, { x: r.x + " However, a simple sentence has only one clause." });
  assert.ok(doLo([h, gia4], (q) => q.topic).some((s) => /: however$/.test(s)), "bộ dò phải bắt được đáp án câu Cloze ở câu khác");
}

/* ---------- từ của sách, không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
// lời dặn chuẩn của đề Tiếng Anh (mục 3.2 của docs/KE-HOACH-NOI-DUNG.md) và của các dạng câu trong kho: sách, các kho khác cũng dùng
const LOI_DAN = ["Write the correct form of the verb in brackets.", "Fill in the blank with one word.", "Put the words in the correct order.",
  "Put the sentences in the correct order to make a paragraph.", "Put the sentences in the correct order to make a letter.", LD_READ, LD_CLOZE,
  "Read the text again. Is each sentence true or false?", "Which part of the sentence is wrong?", "Choose the sentence closest in meaning:",
  "Choose the sentence that best combines the two sentences:", "Is each sentence grammatically correct?", "Is each sentence a complex sentence?",
  "Which sentence uses articles correctly?", "Which sentence is a compound sentence?", "Choose the best answer to complete the sentence (– means no article):",
  "In which sentence is the auxiliary or modal verb usually stressed?", "Which word in this sentence is usually NOT stressed in connected speech?",
  "Which word has a different vowel sound?", "Choose the best option for blank (1).", "Choose the best option for blank (2).", "Choose the best option for blank (3)."];
const boLoiDan = (s) => LOI_DAN.reduce((a, l) => a.split(l).join(" "), String(s));
const truong = (q) => [boLoiDan(q.q), q.x].concat(q.o || [], q.ans || [], q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].text] : []);
if (SACH.length) {
  const f12 = SACH.find((f) => /lop-12[\\/]tieng-anh-12[\\/]/.test(f));
  assert.ok(f12, "OnUp-Book có Tiếng Anh 12");
  const raw = fs.readFileSync(f12, "utf8"), parts = raw.split(/=== page-\d+ · ([^=]+) ===/), trang = {};
  for (let i = 1; i < parts.length; i += 2) { const m = /trang in (\d+)/.exec(parts[i]); if (m) trang[+m[1]] = (trang[+m[1]] || "") + parts[i + 1]; }
  // tên Unit theo Contents (trang in 2) và mục lục trong README của cuốn (người đã soát)
  const mucLuc = fs.readFileSync(path.join(path.dirname(f12), "README.md"), "utf8");
  UNITS.forEach((t, i) => {
    assert.ok(trang[2].toUpperCase().includes(`: ${t.toUpperCase()}`), `Contents ghi ${t}`);
    assert.ok(mucLuc.includes(`| Unit ${i + 1}: ${t} |`), `mục lục ghi Unit ${i + 1}: ${t}`);
  });
  // trang của từng Unit theo Contents (Review 1 ở trang in 44–47 nằm giữa Unit 3 và Unit 4), cộng Glossary (tr. 147–155; chữ OCR của
  // Glossary lẫn hai cột, nên tìm từ trong cả Glossary)
  const TRANG = { 1: [8, 19], 2: [20, 31], 3: [32, 43], 4: [48, 59], 5: [60, 71] }, gl = raw.slice(raw.indexOf("GLOSSARY")).toLowerCase().replace(/\s+/g, " ");
  const chuUnit = (u) => { let s = ""; for (let t = TRANG[u][0]; t <= TRANG[u][1]; t++) s += " " + (trang[t] || ""); return s.toLowerCase().replace(/\s+/g, " "); };
  const coTrong = (u, t) => chuUnit(u).includes(t) || gl.includes(t);
  Object.entries(TU).forEach(([u, ws]) => ws.forEach((t) => assert.ok(coTrong(+u, t), `từ “${t}” không có trong trang của Unit ${u}`)));
  assert.ok(chuUnit(5).includes("apply for"), "apply (đoạn điền) có trong trang của Unit 5");
  // động từ + giới từ của câu Unit 3 có trong khung Remember! (tr. 34)
  const VP_GOC = ["apologise for", "care about", "prepare for", "rely on", "depend on", "explain to"];
  Object.entries(VP).forEach(([v, p2]) => assert.ok(VP_GOC.some((c) => c.endsWith(" " + p2) && v.startsWith(c.split(" ")[0].replace(/e$/, ""))), `“${v} ${p2}” chưa có dạng gốc trong VP_GOC`));
  VP_GOC.forEach((c) => assert.ok(chuUnit(3).includes(c), `“${c}” không có trong trang của Unit 3`));
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book); tên Unit, từ của đáp án câu từ vựng, động từ + giới từ có trong trang của Unit.");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác ---------- */
{
  // đề cố định và câu riêng của các đề ngẫu nhiên (câu của đề cố định trong kho đề ngẫu nhiên chỉ tính một lần)
  const khac = BANKS.filter((b) => !/^ta12-ck1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + [q.q, q.x].concat(q.o || [], q.ans || [], q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn (đoạn điền, bài đọc), ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn; " + tf4.length + " câu đúng/sai 4 ý.");
console.log("TA12 CK1 OK");
