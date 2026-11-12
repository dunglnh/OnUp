// Kiểm tra ngân hàng Tiếng Anh 7 cuối kì I của Phiên N7-ck1-ta (data/banks/7-ta.js, ta7-ck1-*), theo mẫu tests/ta9-ck1.js và các ý
// chung của nhóm “Trước 30/11/2026: lớp 7, cuối kì I” ở mục 7 của docs/KE-HOACH-NOI-DUNG.md.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên (chia như hai đề nữa). Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận
// [Biết, Hiểu, Vận dụng] 10 – 8 – 7 trên Pronunciation, Unit 1–6 (tên theo Contents), Reading.
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho):
// - Pronunciation: phiên âm của từng lựa chọn ghi ở IPA (Anh – Anh), tách thành âm vị; âm hỏi phải là âm của Unit 1–6 trong Book map
//   (tr. 5); câu “có âm”, câu “chữ … đọc là”, câu đuôi -ed: đúng một lựa chọn hợp; lời giải ghi đúng phiên âm của đáp án; mỗi câu một
//   bộ từ riêng;
// - thì của động từ theo tín hiệu thời gian trong câu (hiện tại đơn: every, usually, twice a week…; quá khứ đơn: last…, ago,
//   yesterday) và chủ ngữ (ngôi thứ ba số ít), theo bảng dạng động từ DT; động từ chỉ sự yêu thích + V-ing;
// - so sánh like / different from / (not) as … as theo tín hiệu “the same” trong câu và bảng tính từ; lượng từ some, any, much, many,
//   a little, lots of… theo bảng danh từ đếm được, không đếm được và kiểu câu (khẳng định, phủ định, lời mời); giới từ chỉ thời gian
//   (in + tháng, at + giờ, on + ngày), nơi chốn (on + tầng, tường; in + phòng, sân; at + work) theo bảng; câu đơn (một mệnh đề);
// - Everyday English theo bảng (lời khuyên sức khoẻ, lời khen, chọn sở thích, hỏi giá, hỏi thêm chi tiết);
// - câu sắp xếp: mảnh đầu viết hoa, mảnh cuối có dấu chấm, lời giải ghi lại cả câu, câu đúng luật; câu tìm lỗi sai: các lựa chọn là
//   các phần của câu, phần sai sửa theo luật thì thành câu ghi trong lời giải; câu đúng/sai 4 ý ngữ pháp: từng câu chấm theo luật.
// Câu từ vựng: đáp án là từ của Unit trong TU, mỗi từ đúng một câu, ô rút từ 2 câu chỉ có câu từ vựng (Rút ra N9-ck2-ta).
// Rồi kiểm tra ma trận (hai đề cố định đúng ma trận, câu riêng gấp đôi ma trận, theo thứ tự chủ đề; ô nào cũng có gấp bốn số câu ô đó
// rút), Reading (mỗi đề một đoạn, câu riêng hai đoạn; đoạn 3 câu mức 1-2-3), dạng câu, kiểu Đ/S không lặp, đáp án đúng không dài hơn
// hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không là lựa chọn duy nhất có
// chữ của nhãn chủ đề, đề bài không trùng, không gần trùng câu của data/banks/6-ta.js, note không nói đề chung của Sở (lớp 7 không thuộc
// Thông tư 89/2026), ba mã gắn vào ck1-l7, rút thử 400 lần và với lịch sử đã làm hết từng đề, dò lộ đáp án giữa mọi cặp câu (đề ngẫu
// nhiên, đề “Ôn chủ đề”; cách dò ở chú thích của doLo). DO_LO=1 in ra để xem tay, danh sách đã xem ở DA_XEM (ghi cả dòng dò lộ của
// tests/soat-nhap.js đã xem tay).
// Có sách ở ../OnUp-Book (repo riêng tư): tên Unit theo mục lục trong README của cuốn; từ của đáp án câu từ vựng có trong trang của đúng
// Unit (cộng Glossary); từ đã học (câu của Unit N chỉ dùng từ có trong sách Tiếng Anh 4, 5, 6 và các trang lớp 7 đến hết Unit N, cộng
// Glossary Units 1–6; câu Pronunciation, Reading đến hết Review 2; tên riêng ở TEN, chữ gọi tên phần của câu ở META); mọi trường chữ
// (cả đoạn đọc; trừ lời dặn chuẩn và câu hỏi chung ở TU_CHUNG) không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp
// nguyên âm; DO_SACH=1 in chuỗi 6 từ). So thêm với mọi câu của các kho khác: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/ta7-ck1.js → in TA7 OK.
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
const S = { de1: "ta7-ck1-de1", de2: "ta7-ck1-de2", pool: "ta7-ck1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 7); assert.equal(b.subject, "Tiếng Anh"); assert.equal(b.file, "7-ta.js");
  assert.ok(/No listening/.test(b.note), b.id + ": note ghi không có câu nghe");
  assert.ok(!/Department of Education/.test(b.note), b.id + ": lớp 7 không thuộc Thông tư 89/2026, note không nói đề chung của Sở");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("ta7-ck1-", "") + "#" + (i + 1))));
const cauCua = (has) => { const m = kho.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };
{
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx);
  const ck1 = ctx.window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck1-l7");
  assert.ok(ck1 && ck1.grades.includes(7), "có kì thi ck1-l7 của khối 7");
  Object.values(S).forEach((id) => assert.ok(ck1.banks.includes(id), "ck1-l7 gắn " + id));
}

/* ---------- tên chủ đề theo Contents của sách, ma trận ---------- */
const UNITS = ["Hobbies", "Healthy Living", "Community Service", "Music and Arts", "Food and Drink", "A Visit to a School"];
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
  assert.ok(w >= 100 && w <= 180, `đoạn ${id}: ${w} từ (bài đọc của đề lớp 7: khoảng 100–180 từ)`);
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
// mọi lựa chọn sai ở từ một phần sáu số câu nhiều lựa chọn có lựa chọn khác độ dài (như tests/van7-ck1.js, tests/soat-nhap.js), để
// người làm không đoán theo độ dài
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
// Âm trong Book map (tr. 5): Unit 1 /ə/, /ɜː/; Unit 2 /f/, /v/; Unit 3 /t/, /d/, /ɪd/ (đuôi -ed); Unit 4 /ʃ/, /ʒ/; Unit 5 /ɒ/, /ɔː/;
// Unit 6 /tʃ/, /dʒ/. Phụ âm của Unit 2, 4, 6 nhìn chữ là thấy (Rút ra N9-ck1-ta), nên câu Hiểu hỏi chỗ chữ không khớp âm (gh đọc /f/,
// si đọc /ʒ/, s đọc /ʃ/, er đọc /ɜː/).
const AM = ["ə", "ɜː", "f", "v", "t", "d", "ɪd", "ʃ", "ʒ", "ɒ", "ɔː", "tʃ", "dʒ"];
// phiên âm Anh – Anh (Cambridge, Oxford), không ghi trọng âm
const IPA = { third: "θɜːd", three: "θriː", throw: "θrəʊ", thin: "θɪn", sure: "ʃɔː", sun: "sʌn", sea: "siː", sing: "sɪŋ",
  forty: "fɔːti", fifty: "fɪfti", sixty: "sɪksti", ninety: "naɪnti", television: "telɪvɪʒn", information: "ɪnfəmeɪʃn", competition: "kɒmpətɪʃn",
  collection: "kəlekʃn", baked: "beɪkt", boiled: "bɔɪld", fried: "fraɪd", roasted: "rəʊstɪd", jeans: "dʒiːnz", yes: "jes", shoes: "ʃuːz",
  cheese: "tʃiːz", enough: "ɪnʌf", eight: "eɪt", daughter: "dɔːtə", night: "naɪt", person: "pɜːsn", teacher: "tiːtʃə", sister: "sɪstə", water: "wɔːtə" };
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
    q.o.forEach((o) => assert.equal(o.split(chu).length, 2, `“${o}” có đúng một chỗ chữ ${chu}: ` + ten.get(q)));
    dung = q.o.filter((o, i) => am[i].includes(hoi));
    if (dung.length === 1) assert.equal(am[q.o.indexOf(dung[0])].filter((x) => x === hoi).length, 1, "âm /" + hoi + "/ chỉ có ở chỗ chữ " + chu + ": " + ten.get(q));
  } else if (/^Which word has the ending -ed pronounced \/(t|d|ɪd)\/\?$/.test(q.q)) {
    hoi = /\/([^/]+)\//.exec(q.q)[1];
    q.o.forEach((o) => assert.ok(/ed$/.test(o), `“${o}” tận cùng bằng -ed: ` + ten.get(q)));
    const duoi = (a) => (a.slice(-2).join("") === "ɪd" ? "ɪd" : a[a.length - 1]);
    dung = q.o.filter((o, i) => duoi(am[i]) === hoi);
  } else assert.fail("câu Pronunciation chưa có cách tính: " + ten.get(q));
  assert.ok(AM.includes(hoi), `âm /${hoi}/ không có trong Book map Unit 1–6: ` + ten.get(q));
  assert.deepEqual(dung, [q.o[0]], "đáp án tính lại khác: " + ten.get(q) + " → " + dung.join(", "));
  assert.ok(q.x.replace(/[ˈˌ]/g, "").includes("/" + IPA[q.o[0]] + "/"), "lời giải ghi phiên âm của đáp án: " + ten.get(q));
  // lời giải chỉ nói đến từ của chính câu này
  Object.keys(IPA).filter((w) => new RegExp("\\b" + w + "\\b", "i").test(q.x)).forEach((w) => assert.ok(q.o.includes(w), `lời giải nhắc “${w}” của câu khác: ` + ten.get(q)));
  n++;
});

/* ---------- ngữ pháp: tính lại đáp án ---------- */
const mot = (s) => s.toLowerCase();
const dien = (q, o) => q.q.replace("___", o);
// động từ: nguyên mẫu → [ngôi thứ ba số ít, quá khứ, V-ing]
const DT = { go: ["goes", "went", "going"], like: ["likes", "liked", "liking"], plant: ["plants", "planted", "planting"], teach: ["teaches", "taught", "teaching"],
  give: ["gives", "gave", "giving"], clean: ["cleans", "cleaned", "cleaning"], watch: ["watches", "watched", "watching"], sing: ["sings", "sang", "singing"],
  meet: ["meets", "met", "meeting"], drink: ["drinks", "drank", "drinking"], do: ["does", "did", "doing"], collect: ["collects", "collected", "collecting"],
  join: ["joins", "joined", "joining"], buy: ["buys", "bought", "buying"], help: ["helps", "helped", "helping"], have: ["has", "had", "having"],
  water: ["waters", "watered", "watering"], visit: ["visits", "visited", "visiting"], keep: ["keeps", "kept", "keeping"], need: ["needs", "needed", "needing"], eat: ["eats", "ate", "eating"], take: ["takes", "took", "taking"] };
const DANG = new Map();
Object.entries(DT).forEach(([v, [s3, qk, ing]]) => { DANG.set(v, [v, "base"]); DANG.set(s3, [v, "s3"]); if (!DANG.has(qk)) DANG.set(qk, [v, "past"]); DANG.set(ing, [v, "ing"]); });
// chủ ngữ ngôi thứ ba số ít
const NGOI3 = /^(he|she|it|(my|your) (brother|little brother|sister|aunt|uncle|cousin|mum|dad|father|mother|grandfather|grandmother)|our art club|the club)$/i;
const QUA_KHU = /\b(last (summer|winter|week|month|year|weekend|night|sunday)|yesterday|ago)\b/i;
const HIEN_TAI = /\b(every|usually|often|always|sometimes|never|twice a week|on (mondays|tuesdays|wednesdays|thursdays|fridays|saturdays|sundays|friday afternoons))\b/i;
const thi = (s) => (QUA_KHU.test(s) ? "qk" : HIEN_TAI.test(s) ? "ht" : null);
const chia = (v, sub, t) => (t === "qk" ? DT[v][1] : NGOI3.test(sub) ? DT[v][0] : v);
const phuDinh = (v, sub, t) => (t === "qk" ? "didn't " : NGOI3.test(sub) ? "doesn't " : "don't ") + v;
const troDT = (sub, t) => (t === "qk" ? "Did" : NGOI3.test(sub) ? "Does" : "Do");
// động từ chỉ sự yêu thích + V-ing (Unit 1, tr. 10): sau enjoy chỉ V-ing; sau like, love, hate lựa chọn không có to-infinitive
const THICH = ["like", "love", "enjoy", "hate"];
// câu quá khứ đơn đúng: sau did / didn't là nguyên mẫu; dạng quá khứ theo bảng DT (buyed, teached không có); có tín hiệu quá khứ thì
// động từ chính ở quá khứ
const quaKhuDung = (s) => {
  const w = mot(s).replace(/[^a-z' -]+/g, " ").split(/\s+/).filter(Boolean);
  if (w.some((x) => /ed$/.test(x) && !DANG.has(x) && DT[x.slice(0, -2)])) return false; // buyed, teached
  const iDid = w.findIndex((x) => x === "did" || x === "didn't");
  if (iDid >= 0) { const v = w.slice(iDid + 1).find((x) => DANG.has(x)); return !!v && DANG.get(v)[1] === "base"; }
  const v = w.find((x) => DANG.has(x));
  return !!v && DANG.get(v)[1] === "past";
};
// so sánh (Unit 4): as + tính từ nguyên dạng + as; tính từ → dạng so sánh hơn
const SS = { long: "longer", old: "older", short: "shorter", sweet: "sweeter", big: "bigger", popular: "more popular", exciting: "more exciting", expensive: "more expensive" };
const asAsDung = (s) => { const m = /\bas (more )?(\w+) as\b/.exec(mot(s)); return !!m && !m[1] && Object.keys(SS).includes(m[2]); };
const soSanhGiong = (s) => (/\b(don't|do not|not) (sound |look )?the same\b/i.test(s) ? "different from" : /\bthe same\b/i.test(s) ? "like" : null);
// lượng từ (Unit 5): danh từ đếm được (c), không đếm được (u); kiểu câu
const DANH = { bananas: "c", people: "c", tomatoes: "c", rice: "u", meat: "u", sugar: "u", butter: "u", coffee: "u", water: "u", milk: "u" };
const kieuCau = (s) => (/^– Would you like/.test(s) ? "moi" : /\bnot\b|n't\b|\bnever\b/i.test(s) ? "phu" : /\?/.test(s) ? "hoi" : "khang");
const LUONG = { any: (d, k) => k === "phu" || k === "hoi", some: (d, k) => k === "khang" || k === "moi", much: (d, k) => d === "u" && k !== "khang",
  many: (d) => d === "c", "a little": (d) => d === "u", "a few": (d) => d === "c", "lots of": (d, k) => k === "khang", every: () => false };
const luongDung = (s, lt) => { const m = new RegExp("\\b" + lt + " (\\w+)").exec(mot(s)); return !!m && !!DANH[m[1]] && LUONG[lt](DANH[m[1]], kieuCau(s)); };
// giới từ (Unit 6, tr. 63): thời gian: in + tháng, at + giờ, on + ngày, thứ; nơi chốn: on + tầng, tường; in + phòng, sân, vườn; at + work
const THANG = /^(january|february|march|april|may|june|july|august|september|october|november|december)$/;
const gioiTuThoiGian = (x) => (THANG.test(mot(x)) ? "in" : /^\d+ (a\.m\.|p\.m\.|o'clock)$/.test(mot(x)) ? "at" : /^(\w+ \d+(st|nd|rd|th)|monday|tuesday|wednesday|thursday|friday|saturday|sunday)\b/.test(mot(x)) ? "on" : null);
const NOI = { floor: "on", wall: "on", board: "on", work: "at", home: "at", playground: "in", library: "in", classroom: "in", garden: "in", park: "in", kitchen: "in" };
// cụm giới từ: từ giới từ đến trước giới từ, liên từ kế tiếp hay dấu câu
const gioiTuDung = (s) => [...mot(s).matchAll(/\b(in|on|at) (?:the |our |my )?([a-z0-9' ]+?)(?=\s+(?:of|next|now|with|in|on|at|and|every|from)\b|[.,?!]|$)/g)].every((m) => {
  const cuoi = m[2].trim().split(" ").pop(), g = NOI[cuoi] || gioiTuThoiGian(m[2].trim());
  return !g || g === m[1];
});
// câu đơn (Unit 2): một mệnh đề; hai mệnh đề nối bằng “, and / but / so / or” hay because, when… thì không phải câu đơn
const cauDon = (s) => !/, (and|but|so|or) /.test(s) && !/\b(because|when|while|if)\b/i.test(s);
// Everyday English
const MEO = { tired: /\bbed earlier\b/, cold: /\bwarm water and rest\b/, sweets: /\bless sugar\b.*\bsport\b/ };
const XAU = /\b(soft drinks|until midnight|less fruit|ice cream|cold water|stay up late|late at night|watch TV more)\b/;
const KHEN = ["That's wonderful!", "Sounds great!", "Great work!", "Well done!"];
const HOI_THEM = ["Can you tell me more?", "Can you tell me why?", "Can you tell me how?"];
const CHECKS = [
  // Unit 1: hiện tại đơn (thói quen, lịch cố định), động từ chỉ sự yêu thích + V-ing, Everyday English
  { has: "to the swimming pool every Saturday morning", right: (q) => { q.o.forEach((o) => assert.ok(DANG.has(o.replace(/^is /, "")) && DANG.get(o.replace(/^is /, ""))[0] === "go")); return chia("go", "My brother", thi(q.q)); } },
  { has: "(not like) camping", right: (q) => phuDinh("like", "My aunt", thi(q.q)) },
  { has: "Do you enjoy ___", right: (q) => { assert.ok(q.o.every((o) => [o, o.replace(/^to /, "")].some((x) => DANG.has(x) && DANG.get(x)[0] === "take"))); return DT.take[2]; } },
  { has: "your sister like doing judo?", right: (q) => { assert.ok(/Yes, she does/.test(q.q)); return troDT("your sister", thi(q.q)); } },
  { has: "Do you like collecting teddy bears?", right: (q) => { const am = /\bboring\b/.test(q.q); const d = q.o.filter((o) => (am ? /^No, I don't\.$/ : /^Yes, (I do|very much)\.$/).test(o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "I'm not interested in playing chess", right: (q) => GAN.exec(q.q)[1].replace("I'm not interested in", "I don't like") },
  { has: "watchs cartoons", right: (q) => { const c = LOI.exec(q.q)[1], dung = c.replace("watchs", chia("watch", "My little brother", thi(c))); assert.ok(q.x.includes(dung), "lời giải ghi câu đã sửa"); return "watchs"; } },
  { has: "", order: "Our art club", right: (q) => { const c = q.o.join(" "); assert.ok(c.includes(" " + chia("meet", "Our art club", thi(c)) + " "), "hiện tại đơn ngôi thứ ba"); return null; } },
  // Unit 2: câu đơn, Everyday English (lời khuyên sức khoẻ)
  { has: "Which sentence is a simple sentence?", right: (q) => { const d = q.o.filter(cauDon); assert.equal(d.length, 1); return d[0]; } },
  { has: "Which sentence is NOT a simple sentence?", right: (q) => { const d = q.o.filter((o) => !cauDon(o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "My mum drinks green tea every morning. My dad", right: (q) => {
    const [a, b] = GAN.exec(q.q)[1].split(/(?<=\.) /), m1 = /^(My \w+) (drinks) (.+)\.$/.exec(a), m2 = /^(My \w+) (drinks) (.+) too\.$/.exec(b);
    assert.ok(m1 && m2 && m1[3] === m2[3], "hai câu cùng vị ngữ");
    return `${m1[1]} and ${mot(m2[1])} ${DANG.get(m1[2])[0]} ${m1[3]}.`;
  } },
  { has: "Fruit and vegetables gives us", right: (q) => { const c = LOI.exec(q.q)[1]; assert.ok(q.x.includes(c.replace("gives us", "give us"))); return "gives us"; } },
  { has: "", order: "My grandparents", right: (q) => { const i = q.o.indexOf("often"); assert.ok(i === 1 && /^go\b/.test(q.o[i + 1]), "often đứng trước động từ chính"); return null; } },
  ...[["I often feel tired in the afternoon", "tired"], ["– I have a cold. –", "cold"], ["I often eat sweets, and I never do exercise", "sweets"]].map(([has, k]) => ({ has, right: (q) => {
    const d = q.o.filter((o) => MEO[k].test(o) && !XAU.test(o)); assert.equal(d.length, 1, "đúng một lời khuyên hợp"); q.o.slice(1).forEach((o) => assert.ok(XAU.test(o), "lựa chọn sai là lời khuyên có hại: " + o)); return d[0];
  } })),
  // Unit 3: quá khứ đơn, Everyday English (lời khen)
  { has: "trees along the road to the village", right: (q) => chia("plant", "the members of our club", thi(q.q)) },
  { has: "(teach) the village children", right: (q) => chia("teach", "the volunteers", thi(q.q)) },
  { has: "you do to help your neighbourhood last weekend", right: (q) => mot(troDT("you", thi(q.q))) },
  { has: "didn't cleaned the playground", right: (q) => { const c = LOI.exec(q.q)[1]; assert.ok(!quaKhuDung(c) && quaKhuDung(c.replace("didn't cleaned", "didn't clean")) && q.x.includes(c.replace("didn't cleaned", "didn't clean"))); return "didn't cleaned"; } },
  { has: "his old toys to the children in the orphanage", right: (q) => chia("give", "my brother", thi(q.q)) },
  { has: "We collected 300 books for the village library", right: (q) => { const d = q.o.filter((o) => KHEN.includes(o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "", order: "Last year,", right: (q) => { const c = q.o.join(" "); assert.ok(c.includes(" " + chia("collect", "the students", thi(c)) + " ") && quaKhuDung(c)); return null; } },
  { has: DUNG, tf4: "We visit the old farmers last week.", right: (q) => q.o.map(quaKhuDung) },
  // Unit 4: so sánh like, different from, (not) as … as; Everyday English (chọn sở thích)
  { has: "the song we learnt last week", right: (q) => soSanhGiong(q.q) },
  { has: "Folk music is very ___ rock music", right: (q) => soSanhGiong(q.q) },
  { has: "My violin is more expensive than my sister's guitar", right: (q) => {
    const m = /^(.+) is more (\w+) than (.+)\.$/.exec(GAN.exec(q.q)[1]); return `${m[3].replace(/^./, (c) => c.toUpperCase())} is not as ${m[2]} as ${mot(m[1][0]) + m[1].slice(1)}.`;
  } },
  { has: "not as longer as last year's", right: (q) => { const c = LOI.exec(q.q)[1], dung = c.replace("as longer as", "as long as"); assert.ok(!asAsDung(c) && asAsDung(dung) && SS.long === "longer" && q.x.includes(dung)); return "as longer as"; } },
  { has: DUNG, tf4: "My piano is not as older as yours", right: (q) => q.o.map(asAsDung) },
  { has: "", order: "Classical music", right: (q) => { assert.ok(asAsDung(q.o.join(" ")), "not as + tính từ + as"); return null; } },
  { has: "Which do you prefer, drawing or singing?", right: (q) => {
    const [, a, b] = /prefer, (\w+) or (\w+)\?/.exec(q.q), khong = /not good at (\w+)/.exec(q.q)[1]; assert.ok([a, b].includes(khong)); return `I prefer ${khong === a ? b : a}.`;
  } },
  { has: "Which do you prefer, the guitar or the piano?", right: (q) => { const d = q.o.filter((o) => /^I prefer (the guitar|the piano)\.$/.test(o)); assert.equal(d.length, 1); return d[0]; } },
  // Unit 5: lượng từ, hỏi giá
  { has: "there aren't ___ bananas left", right: (q) => { const d = q.o.filter((o) => luongDung(dien(q, o), o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "Would you like ___ more rice?", right: (q) => { const d = q.o.filter((o) => luongDung(dien(q, o).replace(" more", ""), o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "people at the food festival", right: (q) => { const d = q.o.filter((o) => luongDung(dien(q, o), o)); assert.equal(d.length, 1); return d[0]; } },
  { has: "I don't eat many meat", right: (q) => { const c = LOI.exec(q.q)[1], dung = c.replace("many meat", "much meat"); assert.ok(!luongDung(c, "many") && luongDung(dung, "much") && q.x.includes(dung)); return "many meat"; } },
  { has: "We have only a little rice left", right: (q) => { assert.ok(DANH.rice === "u" && LUONG.much("u", "phu")); return "There isn't much rice left."; } },
  { has: DUNG, tf4: "We need a little sugar", right: (q) => q.o.map((o) => luongDung(o, ["a little", "many", "much"].find((lt) => new RegExp("\\b" + lt + " ").test(o)))) },
  { has: "is a bowl of chicken soup? – It's", right: (q) => { assert.ok(/\d dong\.$/.test(q.q), "câu trả lời là giá"); return "How much"; } },
  { has: "", order: "My dad", right: (q) => { const c = q.o.join(" "); assert.ok(c.includes(" " + chia("drink", "My dad", thi(c)) + " ") && /two glasses of water/.test(c)); return null; } },
  // Unit 6: giới từ chỉ thời gian, nơi chốn; Everyday English (hỏi thêm chi tiết)
  ...["Our class is going on a school trip ___", "The school library opens ___", "We celebrate Teachers' Day ___"].map((has) => ({ has, right: (q) => {
    const d = q.o.filter((o) => { const m = /^(in|on|at|to) (.+)$/.exec(o); return m && gioiTuThoiGian(m[2]) === m[1]; }); assert.equal(d.length, 1); return d[0];
  } })),
  { has: "has a meeting in the first floor", right: (q) => { const c = LOI.exec(q.q)[1], dung = c.replace("in the first floor", "on the first floor"); assert.ok(!gioiTuDung(c) && gioiTuDung(dung) && q.x.includes(dung)); return "in the first floor"; } },
  { has: "English lessons in Monday", right: (q) => { const c = LOI.exec(q.q)[1], dung = c.replace("in Monday", "on Monday"); assert.ok(!gioiTuDung(c) && gioiTuDung(dung) && q.x.includes(dung)); return "in Monday"; } },
  { has: DUNG, tf4: "There is a map in the wall", right: (q) => q.o.map(gioiTuDung) },
  { has: "", order: "The students", right: (q) => { const c = q.o.join(" "); assert.ok(gioiTuDung(c) && c.includes(" " + chia("water", "The students", thi(c)) + " ")); return null; } },
  { has: "visit a famous school in Hue", right: (q) => { const d = q.o.filter((o) => HOI_THEM.includes(o)); assert.equal(d.length, 1); return d[0]; } }
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
const TU = { 1: ["jogging", "hate", "patient", "stamps", "unusual", "creativity", "reduce", "valuable"], 2: ["sunburn", "chapped lips", "put on weight", "vegetarian"],
  3: ["donated", "nursing home", "homeless", "raise"], 4: ["composer", "gallery", "orchestra", "portrait"],
  5: ["flour", "menu", "teaspoon", "recipe", "slice", "bottle", "pork", "ingredients"], 6: ["canteen", "projector", "timetable", "laboratory"] };
const GOC = { donated: "donate", laboratory: "laborator" }; // chữ tìm trong trang sách (laboratories, donate)
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
   từ, bỏ đuôi -s, -ed, -ing (Rút ra N25b, N10): đáp án một từ ngữ pháp (NGU_PHAP: giới từ, lượng từ, trợ động từ, like…) thì cụm gồm đáp
   án và chữ ngay sau chỗ trống (any bananas, some more, does your sister; Rút ra N9-ck1-ta); đáp án một từ khác thì từ đó; đáp án 2–3 từ
   thì cả cụm (lots of, chapped lips, in November); đáp án là câu thì các chuỗi 3 từ liền nhau không có ở lựa chọn sai nào; đáp án câu
   Pronunciation thì chỉ dò ở câu Pronunciation khác và phiên âm của nó ở lời giải câu khác (từ thường gặp ở câu khác không chỉ ra âm).
   Chữ của câu kia: đề bài, đáp án, lời giải, các ý của câu đúng/sai, mảnh của câu sắp xếp, đoạn đọc (khác đoạn của câu này); lựa chọn
   sai của câu trắc nghiệm không tính (Rút ra N25). Đáp án không lặp từ (trừ từ ngữ pháp) của chính đề bài câu có chỗ trống (Rút ra N12). */
const NGU_PHAP = new Set(("a an the of to in on at for from with by about and or but so than as if when while because before after is are was were be been am have has had do does did will would can could should must might may not no i you he she it we they me " +
  "him her us them my your his its our their this that these those there here what where who how which why yet since ago already ever never just very too more most all some any one every each other also up out down off around away into over like much many few little lot lots").split(" "));
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
// đã xem tay; cả dòng của tests/soat-nhap.js (dò mọi từ của đáp án, cả lựa chọn sai của câu kia; Phiên N7-ck1-ta): like ở câu điền
// doesn't like là động từ, đáp án like của câu so sánh là giới từ; like, different from, some, in November 20th là lựa chọn sai của câu
// cùng ô; does trong cách viết đủ does not like của câu điền; is not as là khung câu chung của các câu so sánh cùng ô Vận dụng (đề “Ôn chủ
// đề”), không chỉ ra vế nào đứng trước.
const DA_XEM = ["de1#6 → de1#14: like", "de2#14 → de1#14: like", "de2#15 → de1#15: is not as", "ngau-nhien#30 → de1#15: is not as",
  "ngau-nhien#41 → de1#21: in november", "de1#14 → de2#14: different from", "de1#18 → de2#18: some", "de1#6 → ngau-nhien#9: does"];
assert.deepEqual(lo.filter((s) => !DA_XEM.includes(s)), [], "đáp án có ở câu cùng hiện đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = cauCua("Our class is going on a school trip"), b = cauCua("A ___ is a list of all the dishes");
  const gia = Object.assign({}, b, { x: b.x + " The restaurant opens in November." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => /: in november$/.test(s)), "bộ dò phải bắt được đáp án giới từ cùng chữ sau nó");
  const c = cauCua("the skin around my mouth"), e = cauCua("Eating too many sweets");
  const gia2 = Object.assign({}, e, { x: e.x + " Cold wind can give you chapped lips." });
  assert.ok(doLo([c, gia2], (q) => q.topic).some((s) => /: chapp lips$/.test(s)), "bộ dò phải bắt được cụm từ vựng ở lời giải câu khác");
  const f = cauCua("Which word has the sound /ʒ/?"), g = cauCua("Which word has the sound /ɔː/?");
  const gia3 = Object.assign({}, g, { x: g.x + " Television /ˈtelɪvɪʒn/ has /ʒ/." });
  assert.ok(doLo([f, gia3], (q) => q.topic).length >= 1, "bộ dò phải bắt được từ, phiên âm của đáp án câu phát âm");
}

/* ---------- không gần trùng câu của kho Tiếng Anh 6 (6-ta.js) ----------
   Đề bài cùng lựa chọn (mảnh sắp xếp, ý đúng/sai) có từ 4 cặp hai từ liền nhau chung với một câu của 6-ta.js và số cặp chung từ một
   nửa số cặp của câu ít cặp hơn thì báo. Không tính lời dặn chuẩn (TU_CHUNG) và cặp có ở từ 3% số câu của hai file. */
const TU_CHUNG = ["Read the text. Then answer the questions.", "Read the text again. Is each sentence true or false?", "Which part of the sentence is wrong?",
  "Choose the sentence closest in meaning:", "Put the words in the correct order.", "Is each sentence grammatically correct?", "Write the correct form of the verb in brackets.",
  "What is the best title for the text?", "Which word has the sound", "Which word has the ending -ed pronounced", "In which word are the letters", "In which word is the letter",
  "Which sentence is a simple sentence?", "Which sentence is NOT a simple sentence?"];
const boChung = (s) => TU_CHUNG.reduce((a, l) => a.split(l).join(" | "), String(s));
{
  const ta6 = BANKS.filter((b) => b.file === "6-ta.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, q })));
  const cap2 = (s) => { const w = boChung(s).toLowerCase().replace(/[^a-z'|]+/g, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const chu = (q) => [q.q].concat(q.o || []).join(" | ");
  const tatCa = kho.concat(ta6.map((x) => x.q)), df = {};
  tatCa.forEach((q) => new Set(cap2(chu(q))).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capCua = (q) => new Set(cap2(chu(q)).filter((c) => (df[c] || 0) < 0.03 * tatCa.length));
  const gan = kho.flatMap((q) => { const c = capCua(q); return ta6.map((o) => { const d = capCua(o.q), chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${o.id}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng câu của 6-ta.js:\n" + gan.join("\n"));
  assert.deepEqual(gan, [], "đề bài gần trùng câu của kho Tiếng Anh 6");
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
  const f7 = SACH.find((f) => /lop-7[\\/]tieng-anh-7[\\/]/.test(f));
  assert.ok(f7, "OnUp-Book có Tiếng Anh 7");
  const raw = fs.readFileSync(f7, "utf8"), parts = raw.split(/=== page-\d+ · ([^=]+) ===/), trang = {};
  for (let i = 1; i < parts.length; i += 2) { const m = /trang in (\d+)/.exec(parts[i]); if (m) trang[+m[1]] = (trang[+m[1]] || "") + parts[i + 1]; }
  // trang của từng Unit (Contents: Unit 1 tr. 8, Unit 2 tr. 18, Unit 3 tr. 28, Review 1 tr. 38, Unit 4 tr. 40, Unit 5 tr. 50, Unit 6 tr. 60,
  // Review 2 tr. 70, Unit 7 tr. 72), Glossary Units 1–6 tr. 136–137 (chữ OCR của trang này lẫn cột, nên tính cả trang)
  const BAT_DAU = [8, 18, 28, 40, 50, 60, 72], GLOSSARY = (trang[136] || "") + " " + (trang[137] || "");
  const mucLuc = fs.readFileSync(path.join(path.dirname(f7), "README.md"), "utf8");
  UNITS.forEach((t, i) => {
    assert.ok(mucLuc.includes(`| ${BAT_DAU[i]} | page-${String(BAT_DAU[i] + 1).padStart(3, "0")} | Unit ${i + 1}: ${t} |`), `mục lục ghi Unit ${i + 1}: ${t}, trang in ${BAT_DAU[i]}`);
    let s = ""; for (let k = BAT_DAU[i]; k < BAT_DAU[i + 1]; k++) s += trang[k] || "";
    assert.ok(s.replace(/\s+/g, "").toUpperCase().includes(t.replace(/\s+/g, "").toUpperCase()), `trang của Unit ${i + 1} ghi tên ${t}`);
  });
  const trangDen = (a, b) => { let s = ""; for (let t = a; t < b; t++) s += " " + (trang[t] || ""); return s; };
  const chuUnit = (u) => (trangDen(BAT_DAU[u - 1], BAT_DAU[u]) + " " + GLOSSARY).toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, " ");
  Object.entries(TU).forEach(([u, ws]) => { const c = chuUnit(+u); ws.forEach((t) => assert.ok(c.includes(GOC[t] || t), `từ “${GOC[t] || t}” không có trong trang của Unit ${u}`)); });
  // từ đã học: câu của Unit N chỉ dùng từ có trong sách Tiếng Anh 4, 5, 6 (hai tập mỗi lớp) và các trang lớp 7 đến hết Unit N, cộng Glossary
  // Units 1–6; câu Pronunciation, Reading đến hết Review 2. TEN: tên riêng; META: chữ lời giải dùng để gọi tên phần của câu.
  const TEN = "duc lan thu hoa long mai tom hue canada dan bau tranh pe".split(" ");
  const META = "clause clauses irregular uncountable plural noun nouns verb verbs adjective comparative subject compliment stressed pronounced letters letter ending base form negative".split(" ");
  const tuSach = (s) => new Set(s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z' -]+/g, " ").split(/[\s-]+/).map((w) => w.replace(/^'+|'+$/g, "")).filter(Boolean));
  const CU = SACH.filter((f) => /lop-[456][\\/]tieng-anh-/.test(f)).map((f) => fs.readFileSync(f, "utf8")).join(" ");
  const hocDen = (u) => { const s = tuSach(CU + " " + trangDen(1, u ? BAT_DAU[u] : 72) + " " + GLOSSARY); TEN.concat(META).forEach((w) => s.add(w)); return s; };
  const HOC = {}; for (let u = 0; u <= 6; u++) HOC[u] = hocDen(u);
  const BQT = { broke: "break", flew: "fly", taught: "teach", gave: "give", stood: "stand", went: "go", made: "make", took: "take", came: "come", bought: "buy", met: "meet", learnt: "learn", sold: "sell", showed: "show", ate: "eat", drank: "drink", sang: "sing", kept: "keep" };
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
  const khac = BANKS.filter((b) => !/^ta7-ck1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)
    .map((q) => ({ id: b.id, s: " " + [q.q, q.x].concat(q.o || [], q.ans || [], q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn đọc, " + tf4.length + " câu đúng/sai 4 ý, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn.");
console.log("TA7 OK");
