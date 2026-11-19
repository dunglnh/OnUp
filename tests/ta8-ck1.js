// Kiểm tra ngân hàng Tiếng Anh 8 cuối kì I của Phiên N8-ck1-ta (data/banks/8-ta.js, ta8-ck1-*), theo mẫu tests/ta7-ck1.js và các ý
// chung của nhóm “Trước 30/11/2026: lớp 8, cuối kì I” ở mục 7 của docs/KE-HOACH-NOI-DUNG.md.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên (chia như hai đề nữa). Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận
// [Biết, Hiểu, Vận dụng] 10 – 8 – 7 trên Pronunciation, Unit 1–6 (tên theo Contents), Reading.
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho):
// - Pronunciation: phiên âm của từng lựa chọn ghi ở IPA (Anh – Anh), tách thành âm vị; âm hỏi phải là âm của Unit 1–6 trong Book map
//   (tr. 5): /ʊ/, /uː/, /ə/, /ɪ/, /ʊə/, /ɔɪ/, /k/, /ɡ/, /n/, /ŋ/ (/br/, /pr/ của Unit 6 nhìn chữ là thấy, không hỏi); câu “có âm”, câu
//   “chữ … đọc là” (chữ đó có đúng một chỗ, âm chỉ ở chỗ đó): đúng một lựa chọn hợp; lời giải ghi đúng phiên âm của đáp án; mỗi câu một
//   bộ từ riêng;
// - Unit 1 (tr. 11): động từ chỉ sự yêu thích chỉ đi với V-ing (dislike, enjoy, detest, fancy) hay đi được với cả V-ing và to V (love,
//   like, hate, prefer); sau giới từ (crazy about) là V-ing; lời mời Do you fancy + V-ing / Would you like + to V, nhận lời mời;
// - Unit 2 (tr. 21): so sánh hơn của trạng từ theo bảng SSA (more slowly; fast → faster, hard → harder, early → earlier; well → better,
//   badly → worse); lời khen và đáp lời khen;
// - Unit 3 (tr. 31): câu đơn, câu ghép (hai mệnh đề nối bằng “, and / but / or / so / for” hay “; however, / therefore, / otherwise,”),
//   chọn liên từ theo quan hệ ý (QUAN: tương phản, kết quả, điều kiện “nếu không”) và dấu câu; lời đề nghị Could you …, please?;
// - Unit 4 (tr. 43): câu hỏi Yes / No (trợ động từ hợp chủ ngữ, động từ nguyên mẫu), từ để hỏi theo câu trả lời (HOI); danh từ đếm được,
//   không đếm được với a few, a little, much, many, any theo bảng DANH và kiểu câu; nêu ý kiến (I think …);
// - Unit 5 (tr. 53): mạo từ zero (danh từ không đếm được, trừu tượng; câu nói chung; by + phương tiện; không the trước Viet Nam); lời
//   khuyên (You should …);
// - Unit 6 (tr. 63–64): tương lai đơn will + V; câu điều kiện loại 1 (mệnh đề if, unless dùng hiện tại đơn, không will; unless không đi
//   với phủ định; mệnh đề chính có will / won't); Unless = If … not; tỏ ý chắc chắn (Yes, certainly);
// - câu sắp xếp: mảnh đầu viết hoa, mảnh cuối có dấu chấm, lời giải ghi lại cả câu, câu đúng luật; câu tìm lỗi sai: các lựa chọn là
//   các phần của câu, phần sai sửa theo luật thì thành câu ghi trong lời giải; câu đúng/sai 4 ý: từng câu chấm theo luật.
// Câu từ vựng: đáp án là từ của Unit trong TU, mỗi từ đúng một câu, ô rút từ 2 câu chỉ có câu từ vựng (Rút ra N9-ck2-ta).
// Rồi kiểm tra ma trận (hai đề cố định đúng ma trận, câu riêng gấp đôi ma trận, theo thứ tự chủ đề; ô nào cũng có gấp bốn số câu ô đó
// rút), Reading (mỗi đề một đoạn, câu riêng hai đoạn; đoạn 3 câu mức 1-2-3), dạng câu, kiểu Đ/S không lặp, đáp án đúng không dài hơn
// hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không là lựa chọn duy nhất có
// chữ của nhãn chủ đề, đề bài không trùng, không gần trùng câu của data/banks/7-ta.js, 9-ta.js, note không nói đề chung của Sở (lớp 8
// không thuộc Thông tư 89/2026), ba mã gắn vào ck1-l8, rút thử 400 lần và với lịch sử đã làm hết từng đề, dò lộ đáp án giữa mọi cặp câu
// (đề ngẫu nhiên, đề “Ôn chủ đề”; cách dò ở chú thích của doLo). DO_LO=1 in ra để xem tay, danh sách đã xem ở DA_XEM (ghi cả dòng dò lộ
// của tests/soat-nhap.js đã xem tay).
// Có sách ở ../OnUp-Book (repo riêng tư): tên Unit theo mục lục trong README của cuốn; từ của đáp án câu từ vựng có trong trang của đúng
// Unit (cộng Glossary); từ đã học (câu của Unit N chỉ dùng từ có trong sách Tiếng Anh 4, 5, 6, 7 và các trang lớp 8 đến hết Unit N, cộng
// Glossary Units 1–6; câu Pronunciation, Reading đến hết Review 2; tên riêng ở TEN, chữ gọi tên phần của câu ở META); mọi trường chữ
// (cả đoạn đọc; trừ lời dặn chuẩn và câu hỏi chung ở TU_CHUNG) không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp
// nguyên âm; DO_SACH=1 in chuỗi 6 từ). So thêm với mọi câu của các kho khác: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/ta8-ck1.js → in TA8 OK.
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
const S = { de1: "ta8-ck1-de1", de2: "ta8-ck1-de2", pool: "ta8-ck1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 8); assert.equal(b.subject, "Tiếng Anh"); assert.equal(b.file, "8-ta.js");
  assert.ok(/No listening/.test(b.note), b.id + ": note ghi không có câu nghe");
  assert.ok(!/Department of Education/.test(b.note), b.id + ": lớp 8 không thuộc Thông tư 89/2026, note không nói đề chung của Sở");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("ta8-ck1-", "") + "#" + (i + 1))));
const cauCua = (has) => { const m = kho.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };
{
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx);
  const ck1 = ctx.window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck1-l8");
  assert.ok(ck1 && ck1.grades.includes(8), "có kì thi ck1-l8 của khối 8");
  Object.values(S).forEach((id) => assert.ok(ck1.banks.includes(id), "ck1-l8 gắn " + id));
}

/* ---------- tên chủ đề theo Contents của sách, ma trận ---------- */
const UNITS = ["Leisure Time", "Life in the Countryside", "Teenagers", "Ethnic Groups of Viet Nam", "Our Customs and Traditions", "Lifestyles"];
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
assert.deepEqual(TOPICS, ["Pronunciation"].concat(UNITS.map((u, i) => `Unit ${i + 1} · ${u}`), ["Reading"]), "chủ đề: Pronunciation, Unit 1–6 theo Contents, Reading");
const unitOf = (q) => { const m = /^Unit (\d+) · /.exec(q.topic); return m ? +m[1] : 0; };
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
[[d1.questions, "Đề 1", 1], [d2.questions, "Đề 2", 1], [rieng, "câu riêng", 2]].forEach(([d, at, k]) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, `${at}: đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v.map((x) => k * x), `${at}: ${k === 1 ? "đúng" : "gấp đôi"} ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = dem(kho, t, l);
  assert.ok(v[l - 1] ? o >= 2 * v[l - 1] : o === 0, `ô (${t}, mức ${l}) rút ${v[l - 1]} câu, kho có ${o}`);
}));
// Reading: mỗi đề cố định một đoạn, câu riêng hai đoạn; mỗi đoạn 3 câu mức 1-2-3 (mc, tf4, mc) đứng liền nhau; câu khác không có đoạn đọc
assert.ok(kho.filter((q) => q.topic === "Reading").every((q) => q.p) && kho.filter((q) => q.topic !== "Reading").every((q) => !q.p), "chỉ câu Reading có đoạn đọc");
[[S.de1, 1], [S.de2, 1], [S.pool, 2]].forEach(([id, k]) => {
  const ps = [...new Set(kho.filter((q) => q.topic === "Reading" && q.src === id).map((q) => q.p))];
  assert.equal(ps.length, k, id + `: ${k} đoạn đọc`);
});
Object.entries(PSG).forEach(([id, ps]) => {
  const qs = kho.filter((q) => q.p === id);
  assert.deepEqual(qs.map((q) => q.lv), [1, 2, 3], "đoạn " + id + ": 3 câu mức 1-2-3");
  assert.deepEqual(qs.map((q) => q.type), ["mc", "tf4", "mc"], "đoạn " + id + ": câu hỏi chi tiết, đúng/sai 4 ý, câu suy luận");
  assert.equal(ps.title, "Read the text. Then answer the questions.", "lời dặn của đoạn " + id);
  const w = ps.text.split(/\s+/).length;
  assert.ok(w >= 120 && w <= 200, `đoạn ${id}: ${w} từ (bài đọc của đề THCS: khoảng 120–200 từ)`);
});

/* ---------- dạng câu ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 4, "mỗi kho ít nhất 4 câu đúng/sai 4 ý");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai: " + ten.get(q)); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
assert.ok(kho.every((q) => ["mc", "tf4", "fill", "order"].includes(q.type)), "chỉ dùng trắc nghiệm, đúng/sai 4 ý, trả lời ngắn (điền), sắp xếp");
["fill", "order"].forEach((t) => assert.ok(kho.some((q) => q.type === t), "có câu dạng " + t));
const LOI = /^Which part of the sentence is wrong\? “([^”]+)”$/, GAN = /^Choose the sentence closest in meaning: “([^”]+)”$/, DUNG = "Is each sentence grammatically correct?";
assert.ok(kho.filter((q) => LOI.test(q.q)).length >= 3, "có câu tìm lỗi sai");
assert.ok(kho.filter((q) => GAN.test(q.q)).length >= 3, "có câu chọn câu đồng nghĩa (viết lại câu)");
// lời giải không nói “option A”, “the second sentence”: app xáo phương án
kho.forEach((q) => assert.ok(!/\b(option|answer|sentence|statement)s? [A-D]\b|\bthe (first|second|third|fourth|last) (option|answer|sentence|statement|one)\b/i.test(q.x), "lời giải nhắc vị trí: " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau; đúng một chỗ trống; đáp án đúng là lựa chọn
// dài nhất hay ngắn nhất (kể cả bằng nhau) ở không quá một phần ba số câu nhiều lựa chọn; dài hơn hẳn mọi lựa chọn sai hay ngắn hơn hẳn
// mọi lựa chọn sai ở từ một phần sáu số câu nhiều lựa chọn có lựa chọn khác độ dài (như tests/ta7-ck1.js, tests/soat-nhap.js), để người
// làm không đoán theo độ dài
const mc = kho.filter((q) => q.type === "mc");
mc.forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + ten.get(q));
  if (/___/.test(q.q)) assert.equal(q.q.split("___").length, 2, "đúng một chỗ trống: " + ten.get(q));
});
const dai = mc.filter((q) => q.o[0].length >= Math.max(...q.o.slice(1).map((o) => o.length))).length;
const ngan = mc.filter((q) => q.o[0].length <= Math.min(...q.o.slice(1).map((o) => o.length))).length;
assert.ok(3 * dai <= mc.length, `đáp án là lựa chọn dài nhất ở ${dai}/${mc.length} câu nhiều lựa chọn`);
assert.ok(3 * ngan <= mc.length, `đáp án là lựa chọn ngắn nhất ở ${ngan}/${mc.length} câu nhiều lựa chọn`);
{
  const khacDai = mc.filter((q) => new Set(q.o.map((o) => o.length)).size > 1), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  const han = khacDai.filter((q) => hon(q, (a, x) => a > x) || hon(q, (a, x) => a < x)).length;
  assert.ok(6 * han >= khacDai.length, `đáp án dài hơn hẳn hay ngắn hơn hẳn mọi lựa chọn sai chỉ ở ${han}/${khacDai.length} câu`);
}
// nhãn “môn · chủ đề” hiện trên câu: đáp án không là lựa chọn duy nhất có chữ của nhãn (Rút ra N6), như tests/soat-nhap.js
const tuNhan = (t) => t.toLowerCase().replace(/^unit \d+ · /, "").split(/[^a-z]+/).filter((w) => w.length > 3).map((w) => w.replace(/(ies|s)$/, (m) => (m === "ies" ? "y" : "")));
mc.forEach((q) => tuNhan(q.topic).forEach((w) => {
  const co = q.o.map((o) => new RegExp("\\b" + w).test(o.toLowerCase()));
  assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `${ten.get(q)}: chỉ đáp án có chữ “${w}” của nhãn chủ đề`);
}));
// câu sắp xếp: lời dặn, mảnh đầu viết hoa, mảnh cuối có dấu chấm, các mảnh khác viết thường, lời giải ghi lại cả câu
kho.filter((q) => q.type === "order").forEach((q) => {
  assert.equal(q.q, "Put the words in the correct order.", "lời dặn câu sắp xếp: " + ten.get(q));
  assert.ok(q.o.length >= 4, "câu sắp xếp có ít nhất 4 mảnh: " + ten.get(q));
  assert.ok(/^[A-Z]/.test(q.o[0]) && q.o.slice(1).every((o) => /^[a-z]/.test(o)), "chỉ mảnh đầu viết hoa: " + ten.get(q));
  assert.ok(/\.$/.test(q.o[q.o.length - 1]) && q.o.slice(0, -1).every((o) => !/[.?!]$/.test(o)), "chỉ mảnh cuối có dấu chấm: " + ten.get(q));
  assert.ok(q.x.includes(q.o.join(" ")), "lời giải ghi lại cả câu: " + ten.get(q));
});
// câu tìm lỗi sai: các lựa chọn là các phần của câu trong ngoặc
kho.filter((q) => LOI.test(q.q)).forEach((q) => { const c = LOI.exec(q.q)[1]; q.o.forEach((o) => assert.ok(c.includes(o), `“${o}” không phải phần của câu: ` + ten.get(q))); });
// câu điền: lời dặn, động từ trong ngoặc ngay sau chỗ trống
kho.filter((q) => q.type === "fill").forEach((q) => {
  assert.ok(/^Write the correct form of the verb in brackets\. /.test(q.q), "lời dặn câu điền: " + ten.get(q));
  assert.ok(/___ \(([^)]+)\)/.test(q.q), "động từ trong ngoặc ngay sau chỗ trống: " + ten.get(q));
});

/* ---------- Pronunciation: tính lại đáp án theo phiên âm ---------- */
// Âm trong Book map (tr. 5): Unit 1 /ʊ/, /uː/; Unit 2 /ə/, /ɪ/; Unit 3 /ʊə/, /ɔɪ/; Unit 4 /k/, /ɡ/; Unit 5 /n/, /ŋ/; Unit 6 /br/, /pr/.
// Phụ âm nhìn chữ là thấy (Rút ra N9-ck1-ta), nên câu Hiểu hỏi chỗ chữ không khớp âm (oo đọc /ʊ/, a đọc /ɪ/, c đọc /k/, n đọc /ŋ/); /br/,
// /pr/ luôn viết br, pr nên không hỏi. Review 1, 2 đã dùng các bộ good / cool / foot / cook, June / rude / truth / put, village / buffalo
// / cottage / shortage, ensure / insure / picture / surely, avoid / doing / choice / join, culture / community / circle / custom, bring /
// sing / spring / longevity, figure / danger / engine / change, growth / globe / ground / gender: không dùng lại.
const AM = ["ʊ", "uː", "ə", "ɪ", "ʊə", "ɔɪ", "k", "ɡ", "n", "ŋ"];
// phiên âm Anh – Anh (Cambridge, Oxford), không ghi trọng âm
const IPA = { food: "fuːd", fat: "fæt", fine: "faɪn", fan: "fæn", message: "mesɪdʒ", space: "speɪs", class: "klɑːs", hand: "hænd",
  during: "djʊərɪŋ", drawing: "drɔːɪŋ", riding: "raɪdɪŋ", dancing: "dɑːnsɪŋ", corn: "kɔːn", centre: "sentə", pencil: "pensl", face: "feɪs",
  milk: "mɪlk", make: "meɪk", mark: "mɑːk", meat: "miːt", toy: "tɔɪ", tea: "tiː", two: "tuː", town: "taʊn", wooden: "wʊdn", noodle: "nuːdl",
  school: "skuːl", pool: "puːl", monkey: "mʌŋki", money: "mʌni", Monday: "mʌndeɪ", month: "mʌnθ" };
const AM_VI = ["tʃ", "dʒ", "eɪ", "aɪ", "ɔɪ", "əʊ", "aʊ", "ɪə", "eə", "ʊə", "iː", "ɑː", "ɔː", "uː", "ɜː"];
const tachAm = (ipa) => { const s = ipa.replace(/[ˈˌ]/g, ""), r = []; for (let i = 0; i < s.length;) { const m = AM_VI.find((x) => s.startsWith(x, i)); r.push(m || s[i]); i += m ? m.length : 1; } return r; };
let n = 0;
const tuPhatAm = new Map();
kho.filter((q) => q.topic === "Pronunciation").forEach((q) => {
  assert.equal(q.type, "mc", "câu Pronunciation là trắc nghiệm: " + ten.get(q));
  q.o.forEach((o) => { assert.ok(IPA[o], "chưa có phiên âm của “" + o + "”: " + ten.get(q)); assert.ok(!tuPhatAm.has(o), `từ “${o}” đã dùng ở ${tuPhatAm.get(o)}: mỗi câu phát âm một bộ từ riêng`); tuPhatAm.set(o, ten.get(q)); });
  const am = q.o.map((o) => tachAm(IPA[o]));
  let dung, hoi;
  if (/^Which word has the sound \/([^/]+)\/\?$/.test(q.q)) { hoi = /\/([^/]+)\//.exec(q.q)[1]; dung = q.o.filter((o, i) => am[i].includes(hoi)); }
  else if (/^In which word (?:is the letter|are the letters) (\w+) pronounced \/([^/]+)\/\?$/.test(q.q)) {
    const [, chu, a] = /^In which word (?:is the letter|are the letters) (\w+) pronounced \/([^/]+)\/\?$/.exec(q.q); hoi = a;
    q.o.forEach((o) => assert.equal(o.toLowerCase().split(chu).length, 2, `“${o}” có đúng một chỗ chữ ${chu}: ` + ten.get(q)));
    dung = q.o.filter((o, i) => am[i].includes(hoi));
    if (dung.length === 1) assert.equal(am[q.o.indexOf(dung[0])].filter((x) => x === hoi).length, 1, "âm /" + hoi + "/ chỉ có ở chỗ chữ " + chu + ": " + ten.get(q));
  } else assert.fail("câu Pronunciation chưa có cách tính: " + ten.get(q));
  assert.ok(AM.includes(hoi), `âm /${hoi}/ không có trong Book map Unit 1–6: ` + ten.get(q));
  assert.deepEqual(dung, [q.o[0]], "đáp án tính lại khác: " + ten.get(q) + " → " + dung.join(", "));
  assert.ok(q.x.replace(/[ˈˌ]/g, "").includes("/" + IPA[q.o[0]] + "/"), "lời giải ghi phiên âm của đáp án: " + ten.get(q));
  // lời giải chỉ nói đến từ của chính câu này
  Object.keys(IPA).filter((w) => new RegExp("\\b" + w + "\\b", "i").test(q.x)).forEach((w) => assert.ok(q.o.includes(w), `lời giải nhắc “${w}” của câu khác: ` + ten.get(q)));
  n++;
});

/* ---------- ngữ pháp: tính lại đáp án ---------- */
const mot = (s) => s.toLowerCase().replace(/[’]/g, "'");
const dien = (q, o) => q.q.replace("___", o);
// động từ: nguyên mẫu → [ngôi thứ ba số ít, quá khứ, V-ing]
const DT = { fly: ["flies", "flew", "flying"], drive: ["drives", "drove", "driving"], play: ["plays", "played", "playing"], clean: ["cleans", "cleaned", "cleaning"],
  collect: ["collects", "collected", "collecting"], go: ["goes", "went", "going"], take: ["takes", "took", "taking"], grow: ["grows", "grew", "growing"],
  allow: ["allows", "allowed", "allowing"], finish: ["finishes", "finished", "finishing"], visit: ["visits", "visited", "visiting"], do: ["does", "did", "doing"],
  spend: ["spends", "spent", "spending"], hurry: ["hurries", "hurried", "hurrying"], study: ["studies", "studied", "studying"], pass: ["passes", "passed", "passing"],
  practise: ["practises", "practised", "practising"], swim: ["swims", "swam", "swimming"], harvest: ["harvests", "harvested", "harvesting"], travel: ["travels", "travelled", "travelling"] };
const DANG = new Map();
Object.entries(DT).forEach(([v, [s3, qk, ing]]) => { DANG.set(v, [v, "base"]); DANG.set(s3, [v, "s3"]); if (!DANG.has(qk)) DANG.set(qk, [v, "past"]); DANG.set(ing, [v, "ing"]); });
// chủ ngữ ngôi thứ ba số ít (tên người, he, she, it, my + một người)
const NGOI3 = /^(he|she|it|lan|nam|mai|hoa|minh|phong|(my|your|lai's) (brother|sister|aunt|uncle|cousin|mum|dad|father|mother|grandfather|grandmother))$/i;
const chia = (v, sub) => (NGOI3.test(sub) ? DT[v][0] : v);
const phuDinh = (v, sub) => (NGOI3.test(sub) ? "doesn't " : "don't ") + v;
// Unit 1 (tr. 11): động từ chỉ sự yêu thích chỉ đi với V-ing, hay đi được với cả V-ing và to V; giới từ + V-ing
const CHI_ING = ["dislike", "enjoy", "detest", "fancy"], CA_HAI = ["love", "like", "hate", "prefer"];
const goc = (w) => { const g = [w, w.replace(/ies$/, "y"), w.replace(/s$/, ""), w.replace(/d$/, ""), w.replace(/ed$/, "")]; return CHI_ING.concat(CA_HAI).find((v) => g.includes(v)); };
// đúng luật Unit 1: sau động từ chỉ sự yêu thích là V-ing (hay to V nếu động từ đi được với cả hai); sau about, of, in, on là V-ing
const thichDung = (s) => {
  const w = mot(s).replace(/[^a-z' -]+/g, " ").split(/\s+/).filter(Boolean);
  return w.every((x, i) => {
    const v = goc(x), sau = w[i + 1] || "";
    if (v && !(x === "like" && w[i - 1] === "would")) {
      if (sau === "to") return CA_HAI.includes(v) && DANG.has(w[i + 2]) && DANG.get(w[i + 2])[1] === "base";
      if (DANG.has(sau)) return DANG.get(sau)[1] === "ing";
    }
    if (["about", "of"].includes(x) && DANG.has(sau)) return DANG.get(sau)[1] === "ing";
    return true;
  });
};
// lời mời (Communication, tr. 12): Do you fancy + V-ing …? hay Would you like + to V …?; nhận lời: Yes, I'd love to.
const moiDung = (s) => /^Do you fancy \w+ing\b/.test(s) || /^Would you like to [a-z]+\b/.test(s) && DANG.has(/^Would you like to ([a-z]+)/.exec(s)[1]);
const NHAN_LOI = /^(Yes, I'd love to\.|That's great\. Thanks\.|Sounds great!)$/;
// Unit 2 (tr. 21): so sánh hơn của trạng từ
const SSA = { slowly: "more slowly", quickly: "more quickly", carefully: "more carefully", fast: "faster", hard: "harder", early: "earlier", late: "later", well: "better", badly: "worse" };
const ssDung = (s) => { const t = mot(s);
  if ([...t.matchAll(/\bmore (\w+)/g)].some((m) => !Object.values(SSA).includes("more " + m[1]))) return false; // more faster, more early
  return !new RegExp(`\\b(${Object.keys(SSA).filter((a) => !/ly$/.test(a)).join("|")}) than\\b`).test(t); }; // fast than, hard than
const DAP_KHEN = /^(Thank you\b.*|I'm glad you like it\.)$/;
// Unit 3 (tr. 31): câu ghép: hai mệnh đề độc lập nối bằng liên từ (for, and, but, or, so) sau dấu phẩy, hay trạng từ liên kết (however,
// therefore, otherwise) sau dấu chấm phẩy
const ghep = (s) => /, (and|but|or|so|for) /.test(s) || /; (however|therefore|otherwise), /.test(s);
// quan hệ ý giữa hai mệnh đề → [liên từ, trạng từ liên kết]
const QUAN = { "tương phản": ["but", "however"], "kết quả": ["so", "therefore"], "nếu không": ["or", "otherwise"] };
const lienTu = (q, quan) => (/; ___,/.test(q.q) ? QUAN[quan][1] : /, ___ /.test(q.q) ? QUAN[quan][0] : assert.fail("chỗ trống không sau dấu phẩy, chấm phẩy: " + ten.get(q)));
const DE_NGHI = /^(Could|Can) you [a-z]+ .+, please\?$/;
// Unit 4 (tr. 43): danh từ đếm được (c), không đếm được (u); kiểu câu; lượng từ
const DANH = { cows: "c", buffaloes: "c", groups: "c", land: "u", salt: "u", water: "u", sugar: "u" };
const TINH = new Set(["ethnic", "old", "fresh", "free"]); // tính từ đứng giữa lượng từ và danh từ
const kieuCau = (s) => (/\bnot\b|n't\b|\bnever\b/i.test(s) ? "phu" : /\?/.test(s) ? "hoi" : "khang");
const LUONG = { any: (d, k) => k === "phu" || k === "hoi", much: (d, k) => d === "u" && k !== "khang", many: (d) => d === "c", "a little": (d) => d === "u", "a few": (d) => d === "c" };
// kiểu câu tính theo mệnh đề có lượng từ (câu ghép: “, so / but / and / or …”, “; …”)
const luongDung = (s, lt) => {
  const re = new RegExp("\\b" + lt + " ((?:\\w+ )*?)(\\w+)\\b"), menh = s.split(/, (?:so|but|and|or|for) |; /).find((x) => re.test(mot(x)));
  if (!menh) return false;
  const t = mot(menh), sau = t.slice(re.exec(t).index + lt.length).replace(/[^a-z' ]+/g, " ").split(/\s+/).filter(Boolean);
  const dt = sau.find((x) => !TINH.has(x)); // bỏ qua tính từ đứng trước danh từ
  return !!DANH[dt] && LUONG[lt](DANH[dt], kieuCau(menh));
};
// câu hỏi Yes / No, Wh- (tr. 43): trợ động từ hợp chủ ngữ, rồi động từ nguyên mẫu; từ để hỏi hợp câu trả lời
const SO_IT = /^(lai's grandmother|he|she|my uncle)$/i, SO_NHIEU = /^(they|you|we|the tay people)$/i;
const cauHoiDung = (s) => {
  const m = /^(?:(?:Why|When|Where|What|How) )?(Do|Does|Is|Are|do|does|is|are) (Lai's grandmother|they|you|the Tay people) (\w+)\b.*\?$/.exec(s); if (!m) return false;
  const tro = m[1].toLowerCase(), v = DANG.get(m[3]);
  if (tro === "does") return SO_IT.test(m[2]) && !!v && v[1] === "base";
  if (tro === "do") return SO_NHIEU.test(m[2]) && !!v && v[1] === "base";
  return !v || v[1] === "ing"; // is, are + V-ing hay tính từ, không + động từ nguyên mẫu
};
const hoiTu = (traLoi) => (/^Because\b/.test(traLoi) ? "Why" : /\bkilometres?\b/.test(traLoi) ? "How far" : /\btimes a (day|week)\b/.test(traLoi) ? "How often" : null);
const Y_KIEN = /^(I think|In my opinion|To my way of thinking)\b/;
// Unit 5 (tr. 53): mạo từ zero: danh từ không đếm được, trừu tượng (KDD), danh từ số nhiều nói chung (NHIEU), by + phương tiện (XE);
// không the trước Viet Nam
const KDD = ["health", "money", "water", "friendship", "happiness", "rice"], NHIEU = ["children", "students"], XE = ["coach", "bus", "motorbike", "train", "car", "boat"];
const maoTuDung = (s) => { const t = mot(s);
  if (new RegExp(`\\bby (a|an|the) (${XE.join("|")})\\b`).test(t) || new RegExp(`\\bon (${XE.join("|")})\\b`).test(t)) return false;
  if (new RegExp(`\\b(a|an) (\\w+ )?(${KDD.concat(NHIEU).join("|")})\\b`).test(t)) return false;
  if (new RegExp(`\\bthe (${KDD.join("|")})\\b(?! of)`).test(t)) return false;
  return !/\bthe viet nam\b/.test(t) && !/\bhealths\b/.test(t); };
const KHUYEN = /^(You should|It's a good idea to|Perhaps you should)\b/;
// Unit 6 (tr. 63–64): câu điều kiện loại 1: mệnh đề if / unless ở hiện tại đơn (không will), unless không đi với phủ định, mệnh đề chính
// có will / won't
const dkDung = (s) => {
  const a = /^(If|Unless) ([^,]+), (.+)$/.exec(s), b = a ? null : /^(.+) (if|unless) (.+)$/i.exec(s);
  if (!a && !b) return false;
  const lien = mot(a ? a[1] : b[2]), dk = mot(a ? a[2] : b[3]), chinh = mot(a ? a[3] : b[1]);
  if (/\b(will|won't)\b/.test(dk)) return false;
  if (lien === "unless" && /n't\b|\bnot\b/.test(dk)) return false;
  return /\b(will|won't)\b/.test(chinh);
};
const CHAC = /^(Yes, certainly\.|Sure\.|Of course\.|Definitely\.)$/;
const CHECKS = [
  // Unit 1: động từ chỉ sự yêu thích + V-ing / to V, giới từ + V-ing; mời, nhận lời mời
  { has: "My cousins enjoy ___ kites", right: (q) => { q.o.forEach((o) => assert.ok(DANG.has(o.replace(/^to /, "")) && DANG.get(o.replace(/^to /, ""))[0] === "fly")); const d = q.o.filter((o) => thichDung(dien(q, o))); assert.equal(d.length, 1); return d[0]; } },
  { has: "(drive) when the roads are busy", right: (q) => { assert.ok(CHI_ING.includes(goc(/(\w+) ___/.exec(q.q)[1])), "động từ chỉ đi với V-ing"); return DT.drive[2]; } },
  { has: "Would you like to come to my house", right: (q) => { const d = q.o.filter((o) => NHAN_LOI.test(o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "dislikes to play computer games", right: (q) => { const c = LOI.exec(q.q)[1], dung = c.replace("dislikes to play", "dislikes playing"); assert.ok(!thichDung(c) && thichDung(dung) && q.x.includes(dung)); return "dislikes to play"; } },
  { has: "Which sentence is NOT correct?", right: (q) => { const d = q.o.filter((o) => !thichDung(o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "crazy about ___ old coins", right: (q) => { const d = q.o.filter((o) => thichDung(dien(q, o)) && DANG.has(o) && DANG.get(o)[0] === "collect"); assert.equal(d.length, 1); return d[0]; } },
  { has: "Mai wants to invite Lan to go cycling", right: (q) => { const d = q.o.filter(moiDung); assert.equal(d.length, 1); return d[0]; } },
  { has: "", order: "Our teacher", right: (q) => { const c = q.o.join(" "); assert.ok(thichDung(c) && /\bloves taking\b/.test(c)); return null; } },
  // Unit 2: so sánh hơn của trạng từ; khen, đáp lời khen
  { has: "get up ___ than people in big cities", right: (q) => { assert.ok(q.o.includes("early")); return SSA.early; } },
  { has: "more faster than the old one", right: (q) => { const c = LOI.exec(q.q)[1], dung = c.replace("more faster", SSA.fast); assert.ok(!ssDung(c) && ssDung(dung) && q.x.includes(dung)); return "more faster"; } },
  { has: "Our team played ___ than last week", right: (q) => { assert.ok(/\blost\b/.test(q.q), "đội chơi kém (badly)"); return SSA.badly; } },
  { has: "the farmers work ___ than at other times", right: (q) => SSA.hard },
  { has: "Nam swims more slowly than his brother", right: (q) => { const m = /^(\w+) swims more slowly than his (\w+)\.$/.exec(GAN.exec(q.q)[1]); return `${m[1]}'s ${m[2]} swims ${SSA.fast} than ${m[1]}.`; } },
  { has: "Your painting of the village is really beautiful", right: (q) => { const d = q.o.filter((o) => DAP_KHEN.test(o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "Which sentence is a compliment?", right: (q) => { const d = q.o.filter((o) => /!$/.test(o) && /\b(nice|beautiful|great|lovely|wonderful)\b/.test(o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "", order: "Farmers in my village", right: (q) => { const c = q.o.join(" "); assert.ok(ssDung(c) && c.includes(" " + SSA.quickly + " than ")); return null; } },
  // Unit 3: câu đơn, câu ghép; đề nghị
  { has: "join the music club, ___ it was already full", right: (q) => lienTu(q, "tương phản") },
  { has: "Mi practised the piano every day; ___,", right: (q) => lienTu(q, "kết quả") },
  { has: "so she sang in front of the whole school", right: (q) => { const c = LOI.exec(q.q)[1], dung = c.replace(", so she sang", `, ${QUAN["tương phản"][0]} she sang`); assert.ok(ghep(c) && ghep(dung) && q.x.includes(dung)); return "so she sang"; } },
  { has: "Is each sentence a compound sentence?", tf4: "Lan and Hoa joined", right: (q) => q.o.map(ghep) },
  { has: "Which sentence is a compound sentence?", right: (q) => { const d = q.o.filter(ghep); assert.equal(d.length, 1); return d[0]; } },
  { has: "borrow a calculator from your classmate", right: (q) => { const d = q.o.filter((o) => DE_NGHI.test(o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "We must leave now, or we will be late", right: (q) => GAN.exec(q.q)[1].replace(`, ${QUAN["nếu không"][0]} `, `; ${QUAN["nếu không"][1]}, `) },
  { has: "", order: "Mai felt stressed", right: (q) => { const c = q.o.join(" "); assert.ok(ghep(c) && /, so /.test(c)); return null; } },
  // Unit 4: danh từ đếm được, không đếm được; câu hỏi Yes / No, Wh-; nêu ý kiến
  { has: "has only ___ cows", right: (q) => { const d = q.o.filter((o) => luongDung(dien(q, o), o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "doesn't have many land for growing rice", right: (q) => { const c = LOI.exec(q.q)[1], dung = c.replace("many land", "much land"); assert.ok(!luongDung(c, "many") && luongDung(dung, "much") && q.x.includes(dung)); return "many land"; } },
  { has: "is your village from the town centre?", right: (q) => hoiTu(q.q.split("? – ")[1]) },
  { has: "Choose the correct question for the answer: “Because", right: (q) => { const t = hoiTu(/“([^”]+)”/.exec(q.q)[1]), d = q.o.filter((o) => o.startsWith(t + " ") && cauHoiDung(o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "What do you think about the night market", right: (q) => { const d = q.o.filter((o) => Y_KIEN.test(o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "Which question is correct?", right: (q) => { const d = q.o.filter(cauHoiDung); assert.equal(d.length, 1); return d[0]; } },
  { has: DUNG, tf4: "We need a little salt", right: (q) => q.o.map((o) => luongDung(o, ["a little", "a few", "many", "much"].find((lt) => new RegExp("\\b" + lt + " ").test(mot(o))))) },
  { has: "", order: "There is", right: (q) => { assert.ok(luongDung(q.o.join(" "), "a little")); return null; } },
  // Unit 5: mạo từ zero; khuyên
  { has: "Which sentence is correct?", right: (q) => { const d = q.o.filter(maoTuDung); assert.equal(d.length, 1); return d[0]; } },
  { has: "says that ___ is more important than money", right: (q) => { const d = q.o.filter((o) => maoTuDung(dien(q, o))); assert.equal(d.length, 1); return d[0]; } },
  { has: "countryside by the bus at the weekend", right: (q) => { const c = LOI.exec(q.q)[1], dung = c.replace("by the bus", "by bus"); assert.ok(!maoTuDung(c) && maoTuDung(dung) && q.x.includes(dung)); return "by the bus"; } },
  { has: "It's a good idea to arrive early", right: (q) => GAN.exec(q.q)[1].replace(/^It's a good idea to /, "You should ") },
  { has: "Do you have any advice?", right: (q) => { const d = q.o.filter((o) => KHUYEN.test(o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "Which sentence uses articles correctly?", right: (q) => { const d = q.o.filter(maoTuDung); assert.equal(d.length, 1); return d[0]; } },
  { has: DUNG, tf4: "Water is important", right: (q) => q.o.map(maoTuDung) },
  { has: "", order: "My grandparents", right: (q) => { const c = q.o.join(" "); assert.ok(maoTuDung(c) && /\bby train\b/.test(c)); return null; } },
  // Unit 6: tương lai đơn, câu điều kiện loại 1, unless; tỏ ý chắc chắn
  { has: "If my parents ___ me, I will", right: (q) => { const d = q.o.filter((o) => dkDung(dien(q, o)) && DANG.has(o) && DANG.get(o)[1] === "base"); assert.equal(d.length, 1); // chủ ngữ số nhiều: hiện tại đơn là nguyên mẫu
    assert.equal(d[0], chia("allow", "my parents")); return d[0]; } },
  { has: "If Lan ___ (not finish)", right: (q) => phuDinh("finish", "Lan") },
  { has: "Next summer, my family ___", right: (q) => "will " + DANG.get(q.o.find((o) => DANG.has(o)))[0] },
  { has: "I'm sure you ___ well", right: (q) => "will " + DANG.get(q.o.find((o) => DANG.has(o)))[0] },
  { has: "If you will spend too much time online", right: (q) => { const c = LOI.exec(q.q)[1], dung = c.replace("If you will spend", "If you spend"); assert.ok(!dkDung(c) && dkDung(dung) && q.x.includes(dung)); return "will spend"; } },
  { has: "Hoi An is a beautiful old town", right: (q) => { const d = q.o.filter((o) => CHAC.test(o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "If he doesn't hurry, he will miss the train", right: (q) => { const m = /^If (\w+) doesn't (\w+), (.+)$/.exec(GAN.exec(q.q)[1]); const d = `Unless ${m[1]} ${chia(m[2], m[1])}, ${m[3]}`; assert.ok(dkDung(d)); return d; } },
  { has: DUNG, tf4: "If you study hard", right: (q) => q.o.map(dkDung) }
];
const daTinh = new Set();
CHECKS.forEach((c) => {
  const q = c.order ? (() => { const m = kho.filter((x) => x.type === "order" && x.o[0] === c.order); assert.equal(m.length, 1, "câu sắp xếp mở đầu “" + c.order + "”"); return m[0]; })()
    : c.tf4 ? (() => { const m = kho.filter((x) => x.type === "tf4" && x.q === c.has && x.o[0].startsWith(c.tf4)); assert.equal(m.length, 1, "câu đúng/sai mở đầu “" + c.tf4 + "”"); return m[0]; })() : cauCua(c.has);
  const want = c.right(q), at = ten.get(q) + " (" + (c.has || c.order) + ")";
  assert.ok(!daTinh.has(q), "hai mục CHECKS cùng một câu: " + at);
  daTinh.add(q); n++;
  if (want === null) return;
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
});
// câu điền: các cách viết được nhận là cùng một đáp án (viết tắt, viết đủ)
kho.filter((q) => q.type === "fill").forEach((q) => q.ans.slice(1).forEach((a) => assert.equal(a.replace("does not", "doesn't").replace("do not", "don't"), q.ans[0], "cách viết khác của đáp án: " + ten.get(q))));
// câu nào cũng đã tính lại, trừ câu từ vựng (kiểm tra theo từ của sách ở dưới), câu Reading
const TU = { 1: ["knitting", "resort", "keep in touch", "diy", "bracelet", "cruel", "snowboarding", "outdoors"], 2: ["orchard", "hospitable", "combine harvester", "picturesque"],
  3: ["forum", "bully", "upload", "notifications"], 4: ["stilt house", "terraced fields", "gong", "livestock", "weave", "costumes", "communal house", "flute"],
  5: ["lanterns", "table manners", "reunion", "martial arts"], 6: ["igloo", "street food", "nomadic", "revive"] };
const GOC = { notifications: "notification", "terraced fields": "terraced", lanterns: "lantern", costumes: "costume" }; // chữ tìm trong trang sách
const tuVung = kho.filter((q) => unitOf(q) && !daTinh.has(q));
tuVung.forEach((q) => {
  assert.ok(q.type === "mc" && q.lv === 1, "câu chưa tính lại đáp án (chỉ câu từ vựng mức Biết được bỏ qua): " + ten.get(q));
  assert.equal(TU[unitOf(q)].filter((t) => mot(q.o[0]) === t).length, 1, "đáp án câu từ vựng là từ của Unit trong TU: " + ten.get(q));
});
Object.entries(TU).forEach(([u, ws]) => ws.forEach((t) => assert.equal(tuVung.filter((q) => unitOf(q) === +u && mot(q.o[0]) === t).length, 1, `từ “${t}” của Unit ${u}: đúng một câu`)));
// ô rút từ 2 câu chỉ có câu từ vựng: hai câu cùng điểm ngữ pháp rút cùng lúc thì lộ nhau (Rút ra N9-ck2-ta)
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => { if (k >= 2) kho.filter((q) => q.topic === t && q.lv === i + 1).forEach((q) => assert.ok(t === "Pronunciation" || tuVung.includes(q), `ô (${t}, mức ${i + 1}) rút ${k} câu: chỉ đặt câu từ vựng, ${ten.get(q)}`)); }));
assert.equal(kho.filter((q) => q.topic === "Pronunciation" || q.topic === "Reading" || daTinh.has(q) || tuVung.includes(q)).length, kho.length);

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8) ---------- */
const gocDe = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
{
  const deBai = kho.map((q) => ({ at: ten.get(q), k: gocDe(q.q + (q.o ? q.o.join("|") : "")) }));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- rút thử ---------- */
const seen = new Set();
for (let k = 0; k < 400; k++) {
  const d = Quiz.draw(p);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, p.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  assert.equal(new Set(d.questions.filter((q) => q.topic === "Reading").map((q) => q.p)).size, 1, "Reading: rút trọn một đoạn");
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

/* ---------- dò lộ đáp án giữa hai câu cùng hiện ----------
   Cùng hiện: mọi cặp câu của kho (đề ngẫu nhiên rút câu của mọi ô; đề “Ôn chủ đề” rút 10 câu của một chủ đề, nên cả hai câu cùng ô),
   trừ câu của hai đoạn đọc khác nhau (đáp án Reading chỉ dò ở câu cùng đoạn). Chữ cần dò của đáp án (lựa chọn đúng, đáp án điền), so cả
   từ, bỏ đuôi -s, -ed, -ing (Rút ra N25b, N10): đáp án một từ ngữ pháp (NGU_PHAP: liên từ, trạng từ liên kết, lượng từ, trợ động từ…)
   thì cụm gồm đáp án và chữ ngay sau chỗ trống (but it, therefore she; Rút ra N9-ck1-ta); đáp án một từ khác thì từ đó; đáp án 2–3 từ
   thì cả cụm (a few, how far, keep in touch); đáp án là câu thì các chuỗi 3 từ liền nhau không có ở lựa chọn sai nào; đáp án câu
   Pronunciation thì chỉ dò ở câu Pronunciation khác và phiên âm của nó ở lời giải câu khác (từ thường gặp ở câu khác không chỉ ra âm).
   Chữ của câu kia: đề bài, đáp án, lời giải, các ý của câu đúng/sai, mảnh của câu sắp xếp, đoạn đọc (khác đoạn của câu này); lựa chọn
   sai của câu trắc nghiệm không tính (Rút ra N25). Đáp án không lặp từ (trừ từ ngữ pháp) của chính đề bài câu có chỗ trống (Rút ra N12). */
const NGU_PHAP = new Set(("a an the of to in on at for from with by about and or but so than as if when while because before after is are was were be been am have has had do does did will would can could should must might may not no i you he she it we they me " +
  "him her us them my your his its our their this that these those there here what where who how which why yet since ago already ever never just very too more most all some any one every each other also up out down off around away into over like much many few little lot lots " +
  "however therefore otherwise unless").split(" "));
const tu = (s) => String(s).toLowerCase().replace(/[’]/g, "'").replace(/[^a-z' ]+/g, " ").split(/\s+/).filter(Boolean).map((w) => w.replace(/'s$/, ""));
const goc1 = (w) => { w = w.replace(/ies$/, "y"); const d = ["ing", "ed", "es", "s", "e"].find((x) => w.endsWith(x) && w.length - x.length >= 4 && !/ss$/.test(w)); return d ? w.slice(0, -d.length) : w; };
const noi = (s) => " " + tu(s).map(goc1).join(" ") + " ";
const XAC_DINH = new Set(["the", "a", "an", "my", "our", "your", "his", "her", "their"]);
const chuCua = (q, coDoan) => [q.q, q.x].concat(q.type === "mc" ? [q.o[0]] : q.o || [], q.ans || [], coDoan && q.p ? [PSG[q.p].text] : []);
const doLo = (qs, tenCau) => {
  const ra = [];
  qs.forEach((q) => {
    if (q.type !== "mc" && q.type !== "fill") return;
    const A = q.type === "mc" ? q.o[0] : q.ans[0], raw = tu(A), w = raw.map(goc1), sai = q.type === "mc" ? q.o.slice(1).map(noi) : [];
    let can;
    if (raw.length === 1 && NGU_PHAP.has(raw[0]) && /___/.test(q.q)) {
      const sau = tu(q.q.split("___")[1]), them = sau.slice(0, XAC_DINH.has(sau[0]) || ["you", "your"].includes(sau[0]) ? 2 : 1);
      can = [w.concat(them.map(goc1)).join(" ")];
    } else can = w.length >= 4 ? [...new Set(w.slice(0, -2).map((_, i) => w.slice(i, i + 3).join(" ")))].filter((c) => !sai.some((s) => s.includes(" " + c + " "))) : [w.join(" ")];
    // (trừ câu hội thoại có chỗ trống là cả lời đáp: lời đáp nhắc lại chữ của câu hỏi, như các lựa chọn sai)
    if (/___/.test(q.q) && !/– ___/.test(q.q) && q.topic !== "Reading" && q.topic !== "Pronunciation") {
      const de = new Set(tu(q.q.replace(/\([^)]*\)/g, " ")).map(goc1));
      raw.filter((x) => !NGU_PHAP.has(x)).map(goc1).filter((x) => de.has(x)).forEach((x) => ra.push(`${tenCau(q)} (chính đề bài): ${x}`));
    }
    qs.forEach((p2) => {
      if (p2 === q || (q.p && p2.p && q.p !== p2.p) || (q.topic === "Reading" && p2.p !== q.p)) return;
      if (q.topic === "Pronunciation") {
        if (p2.topic === "Pronunciation") can.filter((c) => noi(chuCua(p2, false).join(" | ")).includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
        if (p2.x.replace(/[ˈˌ]/g, "").includes("/" + IPA[A] + "/")) ra.push(`${tenCau(p2)} → ${tenCau(q)}: /${IPA[A]}/`);
        return;
      }
      const T = chuCua(p2, p2.p !== q.p).map(noi).join("|");
      can.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
    });
  });
  return [...new Set(ra)];
};
const lo = doLo(kho, (q) => ten.get(q));
if (process.env.DO_LO) console.log("Đáp án có ở câu cùng hiện (xem tay):\n" + lo.join("\n"));
// đã xem tay; cả dòng của tests/soat-nhap.js (dò mọi từ của đáp án, cả lựa chọn sai của câu kia; Phiên N8-ck1-ta): but, therefore là
// lựa chọn sai của câu chọn liên từ cùng chủ đề; but ở câu đã sửa (lời giải) của câu tìm lỗi Unit 3 là quy tắc hai ý tương phản, câu khác
// bối cảnh với câu chọn liên từ.
const DA_XEM = ["de2#11 → de1#11: but", "de2#12 → de1#11: but", "ngau-nhien#23 → de2#11: therefore"];
assert.deepEqual(lo.filter((s) => !DA_XEM.includes(s)), [], "đáp án có ở câu cùng hiện đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = cauCua("join the music club, ___ it was already full"), b = cauCua("My grandparents grow mangoes");
  const gia = Object.assign({}, b, { x: b.x + " The orchard is big, but it was already full of fruit." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => /: but it$/.test(s)), "bộ dò phải bắt được đáp án liên từ cùng chữ sau nó");
  const c = cauCua("Ethnic people in the mountains raise ___"), e = cauCua("has only ___ cows");
  const gia2 = Object.assign({}, e, { x: e.x + " Cows and pigs are livestock." });
  assert.ok(doLo([c, gia2], (q) => q.topic).some((s) => /: livestock$/.test(s)), "bộ dò phải bắt được từ vựng ở lời giải câu khác");
  const f = cauCua("Which word has the sound /ʊə/?"), g = cauCua("Which word has the sound /ɪ/?");
  const gia3 = Object.assign({}, g, { x: g.x + " During /ˈdjʊərɪŋ/ has /ʊə/." });
  assert.ok(doLo([f, gia3], (q) => q.topic).length >= 1, "bộ dò phải bắt được từ, phiên âm của đáp án câu phát âm");
}

/* ---------- không gần trùng câu của kho Tiếng Anh 7, 9 (7-ta.js, 9-ta.js) ----------
   Đề bài cùng lựa chọn (mảnh sắp xếp, ý đúng/sai) có từ 4 cặp hai từ liền nhau chung với một câu của hai file đó và số cặp chung từ một
   nửa số cặp của câu ít cặp hơn thì báo. Không tính lời dặn chuẩn (TU_CHUNG) và cặp có ở từ 3% số câu của các file. */
const TU_CHUNG = ["Read the text. Then answer the questions.", "Read the text again. Is each sentence true or false?", "Which part of the sentence is wrong?",
  "Choose the sentence closest in meaning:", "Put the words in the correct order.", "Is each sentence grammatically correct?", "Write the correct form of the verb in brackets.",
  "What is the best title for the text?", "Which word has the sound", "In which word are the letters", "In which word is the letter",
  "Which sentence is a compound sentence?", "Is each sentence a compound sentence?", "Choose the correct question for the answer:", "Which sentence best describes the text?"];
const boChung = (s) => TU_CHUNG.reduce((a, l) => a.split(l).join(" | "), String(s));
{
  const ta79 = BANKS.filter((b) => b.file === "7-ta.js" || b.file === "9-ta.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, q })));
  const cap2 = (s) => { const w = boChung(s).toLowerCase().replace(/[^a-z'|]+/g, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const chu = (q) => [q.q].concat(q.o || []).join(" | ");
  const tatCa = kho.concat(ta79.map((x) => x.q)), df = {};
  tatCa.forEach((q) => new Set(cap2(chu(q))).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capCua = (q) => new Set(cap2(chu(q)).filter((c) => (df[c] || 0) < 0.03 * tatCa.length));
  const gan = kho.flatMap((q) => { const c = capCua(q); return ta79.map((o) => { const d = capCua(o.q), chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${o.id}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng câu của 7-ta.js, 9-ta.js:\n" + gan.join("\n"));
  assert.deepEqual(gan, [], "đề bài gần trùng câu của kho Tiếng Anh 7, 9");
}

/* ---------- sách: tên Unit, từ của Unit, từ đã học, không chép sách (chữ OCR, bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ (như tests/ta9-ck1.js): băm mọi chuỗi k từ của chữ một lần, chỉ so thật khi băm có
const traChu = (() => {
  const bam = (w, k) => {
    const A = new Uint32Array(w.length), B = new Uint32Array(w.length), n = Math.max(0, w.length - k + 1), H = new Float64Array(n);
    for (let i = 0; i < w.length; i++) { let a = 0x811c9dc5, b = 0x1b873593; const t = w[i]; for (let j = 0; j < t.length; j++) { const x = t.charCodeAt(j); a = Math.imul(a ^ x, 0x01000193); b = Math.imul(b ^ x, 0x5bd1e995); } A[i] = a; B[i] = b; }
    for (let i = 0; i < n; i++) { let a = 0x9e3779b9, b = 0x85ebca6b; for (let j = i; j < i + k; j++) { a = Math.imul(a ^ A[j], 0x01000193); b = Math.imul(b ^ B[j], 0x5bd1e995); } H[i] = (a >>> 0) * 2097152 + (b >>> 11); }
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
// lời dặn chuẩn, câu hỏi chung (TU_CHUNG) thay bằng “|” trước khi so chuỗi (sách và các kho khác cũng dùng)
const TU_CHUNG_ = TU_CHUNG.map((c) => " " + c.toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim() + " ").sort((a, b) => b.length - a.length);
const khongDau = nhoChuoi((s) => {
  let t = " " + String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim() + " ";
  TU_CHUNG_.forEach((c) => { while (t.includes(c)) t = t.replace(c, " | "); });
  return t.trim();
});
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|")) ra.push(c.join(" ")); } return ra; };
const truong = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].text] : []);
if (SACH.length) {
  const f8 = SACH.find((f) => /lop-8[\\/]tieng-anh-8[\\/]/.test(f));
  assert.ok(f8, "OnUp-Book có Tiếng Anh 8");
  const raw = fs.readFileSync(f8, "utf8"), parts = raw.split(/=== page-\d+ · ([^=]+) ===/), trang = {};
  for (let i = 1; i < parts.length; i += 2) { const m = /trang in (\d+)/.exec(parts[i]); if (m) trang[+m[1]] = (trang[+m[1]] || "") + parts[i + 1]; }
  // trang của từng Unit (Contents: Unit 1 tr. 8, Unit 2 tr. 18, Unit 3 tr. 28, Review 1 tr. 38, Unit 4 tr. 40, Unit 5 tr. 50, Unit 6 tr. 60,
  // Review 2 tr. 70, Unit 7 tr. 72; ảnh page-N là trang in N − 2), Glossary Units 1–6 tr. 136–137 (chữ OCR của trang này lẫn cột, nên
  // tính cả trang)
  const BAT_DAU = [8, 18, 28, 40, 50, 60, 72], GLOSSARY = (trang[136] || "") + " " + (trang[137] || "");
  const mucLuc = fs.readFileSync(path.join(path.dirname(f8), "README.md"), "utf8");
  UNITS.forEach((t, i) => {
    assert.ok(mucLuc.includes(`| ${BAT_DAU[i]} | page-${String(BAT_DAU[i] + 2).padStart(3, "0")} | Unit ${i + 1}: ${t} |`), `mục lục ghi Unit ${i + 1}: ${t}, trang in ${BAT_DAU[i]}`);
    let s = ""; for (let k = BAT_DAU[i]; k < BAT_DAU[i + 1]; k++) s += trang[k] || "";
    assert.ok(s.replace(/\s+/g, "").toUpperCase().includes(t.replace(/\s+/g, "").toUpperCase()), `trang của Unit ${i + 1} ghi tên ${t}`);
  });
  const trangDen = (a, b) => { let s = ""; for (let t = a; t < b; t++) s += " " + (trang[t] || ""); return s; };
  const chuUnit = (u) => (trangDen(BAT_DAU[u - 1], BAT_DAU[u]) + " " + GLOSSARY).toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, " ");
  Object.entries(TU).forEach(([u, ws]) => { const c = chuUnit(+u); ws.forEach((t) => assert.ok(c.includes(GOC[t] || t), `từ “${GOC[t] || t}” không có trong trang của Unit ${u}`)); });
  // từ đã học: câu của Unit N chỉ dùng từ có trong sách Tiếng Anh 4, 5, 6, 7 (hai tập mỗi lớp 4–6) và các trang lớp 8 đến hết Unit N,
  // cộng Glossary Units 1–6; câu Pronunciation, Reading đến hết Review 2. TEN: tên riêng; META: chữ lời giải dùng để gọi tên phần của câu.
  const TEN = "phong mai nam lan hoa mi minh lai ba may hmong bahnar ede dao tet canada japan mongolia hoi an da lat pho banh ao dai".split(" ");
  const META = "clause clauses irregular uncountable countable plural noun nouns verb verbs adjective adverb comparative subject compliment pronounced letters letter ending base form negative gerund infinitive preposition conditional article abstract".split(" ");
  const tuSach = (s) => new Set(s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z' -]+/g, " ").split(/[\s-]+/).map((w) => w.replace(/^'+|'+$/g, "")).filter(Boolean));
  const CU = SACH.filter((f) => /lop-[4567][\\/]tieng-anh-/.test(f)).map((f) => fs.readFileSync(f, "utf8")).join(" ");
  const hocDen = (u) => { const s = tuSach(CU + " " + trangDen(1, u ? BAT_DAU[u] : 72) + " " + GLOSSARY); TEN.concat(META).forEach((w) => s.add(w)); return s; };
  const HOC = {}; for (let u = 0; u <= 6; u++) HOC[u] = hocDen(u);
  const BQT = { flew: "fly", drove: "drive", went: "go", took: "take", grew: "grow", did: "do", spent: "spend", swam: "swim", made: "make", came: "come", taught: "teach", showed: "show", sang: "sing", gave: "give", learnt: "learn", told: "tell", sold: "sell", bought: "buy", wore: "wear", sat: "sit", ate: "eat", left: "leave", felt: "feel", built: "build", won: "win", wrote: "write" };
  const bien = (w) => { const r = [w];
    if (/n't$/.test(w)) r.push(w === "can't" ? "can" : w === "won't" ? "will" : w.replace(/n't$/, ""), "not");
    if (/'(s|m|re|d|ll|ve)$/.test(w)) r.push(w.replace(/'(s|m|re|d|ll|ve)$/, ""));
    [["ies", "y"], ["ied", "y"], ["ier", "y"], ["es", ""], ["s", ""], ["ed", ""], ["d", ""], ["ing", ""], ["ing", "e"], ["ly", ""], ["er", ""]].forEach(([d, t]) => { if (w.endsWith(d) && w.length - d.length >= 2) { const g = w.slice(0, -d.length) + t; r.push(g); if (/(.)\1$/.test(g)) r.push(g.slice(0, -1)); } });
    r.slice().forEach((g) => { ["s", "es", "d", "ed", "ing"].forEach((d) => r.push(g + d)); if (/e$/.test(g)) r.push(g.slice(0, -1) + "ing"); if (/[^aeiou]y$/.test(g)) r.push(g.slice(0, -1) + "ies"); });
    if (BQT[w]) r.push(BQT[w]);
    return r; };
  const chuaHoc = [];
  kho.forEach((q) => {
    const u = unitOf(q), hoc = HOC[u];
    [...tuSach(boChung([q.q, q.x].concat(q.o || [], q.ans || [], q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].text] : []).join(" | ")).replace(/\/[^/\s]+\//g, " "))]
      .filter((w) => w.length > 1 && !/^\d/.test(w) && !/^\/|[ɪəɜʃʒɒɔʊæʌθðŋː]/.test(w) && !bien(w).some((b) => hoc.has(b))).forEach((w) => chuaHoc.push(`${ten.get(q)} (Unit ${u || q.topic}): ${w}`));
  });
  assert.deepEqual(chuaHoc, [], "từ chưa học đến Unit của câu");
  // không chép sách: chuỗi 8 từ liền nhau của mọi trường chữ không có trong chữ OCR của mọi cuốn
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book); tên Unit, từ của đáp án câu từ vựng có trong trang của Unit, câu chỉ dùng từ đã học.");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const khac = BANKS.filter((b) => !/^ta8-ck1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)
    .map((q) => ({ id: b.id, s: " " + [q.q, q.x].concat(q.o || [], q.ans || [], q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn đọc, " + tf4.length + " câu đúng/sai 4 ý, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn.");
console.log("TA8 OK");
