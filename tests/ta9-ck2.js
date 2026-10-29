// Kiểm tra ngân hàng Tiếng Anh 9 cuối năm của Phiên N9-ck2-ta (data/banks/9-ta.js, ta9-ck2-*), theo mẫu tests/ta9-gk2.js.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho
// lớp 9 (đoạn “Chung của các phiên lớp 9” của docs/KE-HOACH-NOI-DUNG.md), Units 10–12 nhiều câu hơn Units 7–9 (trọng tâm).
// Tính lại đáp án bằng code (câu nhận ra bằng một đoạn chữ của đề, đúng một câu trong kho):
// - Pronunciation: âm /sl/, /sn/ (Unit 7) theo phiên âm của từng lựa chọn (chữ sl, sn có trong mọi lựa chọn, đúng một từ đọc khác);
//   trọng âm (Unit 8: -ic, -ious; Unit 9: -ion, -ity) theo bảng âm tiết của từng từ (đã so với từ điển CMU), từ nào cũng đúng quy tắc
//   của sách (trọng âm ở âm tiết ngay trước đuôi), đúng một lựa chọn khớp đề bài, lời giải ghi chỗ trọng âm của mọi lựa chọn; mỗi câu
//   một bộ từ riêng, không có từ nào của các câu Pronunciation của kho giữa kì II (Rút ra N10);
// - câu tường thuật Yes / No (Unit 7): đọc câu hỏi trực tiếp trong ngoặc, đổi sang if / whether + chủ ngữ + động từ lùi thì, đổi đại từ
//   (ghi theo từng câu), so với câu tạo từ lựa chọn đúng (lựa chọn sai không ra câu đó, hoặc sai luật);
// - mệnh đề quan hệ xác định (Unit 9): who sau người, which sau vật, whose phải có danh từ theo sau; đại từ quan hệ làm chủ ngữ không bỏ
//   được, làm tân ngữ thì bỏ được và không thêm it, them; đúng một lựa chọn hợp luật;
// - mệnh đề quan hệ không xác định (Unit 10): danh từ riêng hoặc người đã xác định, rồi dấu phẩy, who / which / whose, mệnh đề, dấu phẩy,
//   phần còn lại của câu; không bỏ đại từ quan hệ, không thêm it; câu nối hai câu tính lại từ hai câu cho sẵn; câu tìm lỗi: câu sửa trong
//   lời giải đúng luật, câu gốc sai, đúng một lựa chọn phủ chỗ sai; câu sắp xếp ghép lại đúng luật;
// - suggest / advise / recommend (Unit 11): sau động từ là V-ing, hoặc (that) + chủ ngữ + (should) + động từ nguyên thể; không có
//   to-infinitive, tân ngữ + to-infinitive, động từ chia quá khứ, chia ngôi thứ ba;
// - so / such … that (Unit 12): so + tính từ; such a / an + tính từ + danh từ số ít (a / an theo âm đầu của từ sau); such + tính từ +
//   danh từ số nhiều; các câu khác của Unit 12 không có so, such (đáp án của ô Hiểu);
// - although / though / because / since (Unit 12): but trong câu cho sẵn là tương phản → although / though, không dùng cùng but;
//   câu đúng/sai 4 ý tính lại bằng luật “không dùng although / though / because / since cùng but”;
// - dạng của từ (Unit 7, 8, 9): từ trong ngoặc và đáp án theo bảng họ từ, chỗ trống cần đúng từ loại của đáp án;
// - từ vựng: đáp án là từ của Unit trong TU (mỗi từ đúng một câu), câu hỏi nghĩa theo DONG_NGHIA, từ khác loại theo nhóm, loại hình du
//   lịch theo nơi đi, nơi đến và mục đích chuyến đi (đúng một loại khớp); đáp án Unit 7–9 không trùng đáp án câu cùng Unit của kho giữa
//   kì II; câu sắp xếp: mảnh đầu viết hoa, mảnh cuối có dấu chấm, lời giải ghi lại cả câu; câu tìm lỗi sai: lựa chọn là phần của câu.
// Rồi kiểm tra ma trận (hai đề cố định và câu riêng đều chia đúng ma trận, theo thứ tự chủ đề), tên chủ đề theo Contents của sách,
// Reading (mỗi đề và phần câu riêng một đoạn 3 câu mức 1-2-3, 120–200 từ), dạng câu (ít nhất 4 câu đúng/sai 4 ý, kiểu Đ/S không lặp),
// đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không
// lặp chữ của nhãn chủ đề (trừ khi mọi lựa chọn cùng có chữ đó, Rút ra N6), đề bài không trùng, note nói về đề chung của Sở, rút thử nhiều
// lần (đúng ma trận, trọn đoạn, gặp đủ kho; đã làm hết một đề cố định thì không rút lại câu của đề đó) và dò lộ đáp án giữa các câu rút
// được cùng lúc như tests/ta9-gk2.js (DO_LO=1 in chỗ trùng để xem tay, danh sách đã xem ở DA_XEM).
// Có sách ở ../OnUp-Book (repo riêng tư): tên Unit theo Contents; từ của đáp án câu từ vựng, từ hỏi nghĩa, từ của câu dạng từ có trong
// trang của đúng Unit đó (theo trang bắt đầu ở Contents, cộng mục Unit đó của Glossary); mọi trường chữ (cả đoạn đọc; trừ lời dặn
// chuẩn, sách cũng dùng) không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm; DO_SACH=1 in chuỗi 6 từ). So
// thêm với mọi câu của các kho khác: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/ta9-ck2.js → in TA9 CK2 OK.
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
const S = { de1: "ta9-ck2-de1", de2: "ta9-ck2-de2", pool: "ta9-ck2-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 9); assert.equal(b.subject, "Tiếng Anh"); assert.equal(b.file, "9-ta.js");
  assert.ok(/Units 7–12/.test(b.note) && /No listening/.test(b.note), b.id + ": note ghi Units 7–12, không có câu nghe");
  assert.ok(/common end-of-term test/.test(b.note) && /Department of Education/.test(b.note), b.id + ": note nói về đề chung của Sở (kì cuối kì)");
});
// gắn vào kì thi cuối năm của khối 9
{
  const c = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), c);
  const e = c.window.ONTAP_SEED_EVENTS.find((x) => x.id === "ck2-l9");
  assert.ok(e && e.grades.includes(9), "có kì thi ck2-l9 của khối 9");
  Object.values(S).forEach((id) => assert.ok(e.banks.includes(id), id + " gắn vào ck2-l9"));
  assert.ok(/Tiếng Anh: Units 7–12, trọng tâm Units 10–12/.test(e.scope), "phạm vi của ck2-l9 ghi Tiếng Anh: Units 7–12, trọng tâm Units 10–12");
}
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("ta9-ck2-", "") + "#" + (i + 1))));
const cauCua = (has) => { const m = kho.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };

/* ---------- tên chủ đề theo Contents của sách, ma trận ---------- */
const UNITS = { 7: "Natural Wonders of the World", 8: "Tourism", 9: "World Englishes", 10: "Planet Earth", 11: "Electronic Devices", 12: "Career Choices" };
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
assert.deepEqual(TOPICS, ["Pronunciation"].concat(Object.entries(UNITS).map(([u, t]) => `Unit ${u} · ${t}`), ["Reading"]),
  "chủ đề: Pronunciation, Unit 7–12 theo Contents, Reading");
const unitOf = (q) => { const m = /^Unit (\d+) · /.exec(q.topic); return m ? +m[1] : 0; };
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
[[d1.questions, "Đề 1"], [d2.questions, "Đề 2"], [rieng, "câu riêng"]].forEach(([d, at]) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, `${at}: đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `${at}: đúng ma trận ở chủ đề ${t}`));
  // trọng tâm Units 10–12: nhiều câu hơn Units 7–9
  const sau = d.filter((q) => unitOf(q) >= 10).length, truoc = d.filter((q) => unitOf(q) && unitOf(q) <= 9).length;
  assert.ok(sau > truoc, `${at}: Units 10–12 (${sau} câu) nhiều hơn Units 7–9 (${truoc} câu)`);
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = dem(kho, t, l);
  assert.ok(v[l - 1] ? o >= 2 * v[l - 1] : o === 0, `ô (${t}, mức ${l}) rút ${v[l - 1]} câu, kho có ${o}`);
}));
// Reading: mỗi đề cố định và phần câu riêng một đoạn, 3 câu mức 1-2-3 đứng liền nhau; câu khác không có đoạn đọc
assert.ok(kho.filter((q) => q.topic === "Reading").every((q) => q.p) && kho.filter((q) => q.topic !== "Reading").every((q) => !q.p), "chỉ câu Reading có đoạn đọc");
[S.de1, S.de2, S.pool].forEach((id) => {
  const qs = kho.filter((q) => q.topic === "Reading" && q.src === id), ps = [...new Set(qs.map((q) => q.p))];
  assert.equal(ps.length, 1, id + ": đúng một đoạn đọc");
  assert.deepEqual(qs.map((q) => q.lv), [1, 2, 3], id + ": đoạn 3 câu mức 1-2-3");
});
Object.entries(PSG).forEach(([id, ps]) => {
  assert.equal(kho.filter((q) => q.p === id).length, 3, "đoạn " + id + " có 3 câu");
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
const LOI = /^Which part of the sentence is wrong\?/, GAN = /^Choose the sentence closest in meaning/;
assert.ok(kho.filter((q) => LOI.test(q.q)).length >= 3, "có câu tìm lỗi sai");
assert.ok(kho.filter((q) => GAN.test(q.q)).length >= 3, "có câu chọn câu đồng nghĩa (viết lại câu)");
// lời giải không nói “option A”, “the second sentence”: app xáo phương án
kho.forEach((q) => assert.ok(!/\b(option|answer|sentence|statement)s? [A-D]\b|\bthe (first|second|third|fourth|last) (option|answer|sentence|statement|one)\b/i.test(q.x), "lời giải nhắc vị trí: " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau; đáp án đúng là lựa chọn dài nhất hay ngắn
// nhất ở không quá một phần ba số câu nhiều lựa chọn (Phiên N9-ck1-lsdl-gdcd)
const mc = kho.filter((q) => q.type === "mc");
mc.forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + ten.get(q));
  if (/___/.test(q.q)) assert.equal(q.q.split("___").length, 2, "đúng một chỗ trống: " + ten.get(q));
});
// (tính cả khi bằng lựa chọn sai dài nhất, ngắn nhất, như tests/van9-gk2.js)
const dai = mc.filter((q) => q.o[0].length >= Math.max(...q.o.slice(1).map((o) => o.length))).length;
const ngan = mc.filter((q) => q.o[0].length <= Math.min(...q.o.slice(1).map((o) => o.length))).length;
assert.ok(3 * dai <= mc.length, `đáp án là lựa chọn dài nhất ở ${dai}/${mc.length} câu nhiều lựa chọn`);
assert.ok(3 * ngan <= mc.length, `đáp án là lựa chọn ngắn nhất ở ${ngan}/${mc.length} câu nhiều lựa chọn`);
// nhãn “môn · chủ đề” hiện trên câu: đáp án không lặp chữ của nhãn (Rút ra N6), trừ khi mọi lựa chọn cùng có chữ đó (tourism ở câu loại
// hình du lịch của Unit 8, planet ở câu nối hai câu của Unit 10)
const nhan = (t) => t.toLowerCase().replace(/^unit \d+ · /, "").split(/[^a-z]+/).filter((w) => w.length > 3 && !["units", "review"].includes(w));
kho.filter((q) => q.type === "mc" || q.type === "fill").forEach((q) => {
  const da = String(q.type === "mc" ? q.o[0] : q.ans[0]).toLowerCase();
  nhan(q.topic).map((w) => w.replace(/es$/, "")).filter((w) => da.includes(w)).forEach((w) =>
    assert.ok(q.type === "mc" && q.o.every((o) => o.toLowerCase().includes(w)), `đáp án lặp chữ “${w}” của nhãn chủ đề: ` + ten.get(q)));
});
// câu sắp xếp: mảnh đầu viết hoa, mảnh cuối có dấu chấm, các mảnh khác viết thường, lời giải ghi lại cả câu
const orders = kho.filter((q) => q.type === "order");
orders.forEach((q) => {
  assert.equal(q.q, "Put the words in the correct order.", "lời dặn câu sắp xếp: " + ten.get(q));
  assert.ok(q.o.length >= 4, "câu sắp xếp có ít nhất 4 mảnh: " + ten.get(q));
  assert.ok(/^[A-Z]/.test(q.o[0]) && q.o.slice(1).every((o) => /^[a-z]/.test(o)), "chỉ mảnh đầu viết hoa: " + ten.get(q));
  assert.ok(/\.$/.test(q.o[q.o.length - 1]) && q.o.slice(0, -1).every((o) => !/[.?!]$/.test(o)), "chỉ mảnh cuối có dấu chấm: " + ten.get(q));
  assert.ok(q.x.includes(q.o.join(" ")), "lời giải ghi lại cả câu: " + ten.get(q));
});
// câu tìm lỗi sai: các lựa chọn là các phần của câu trong ngoặc
const loi = kho.filter((q) => LOI.test(q.q));
const cauNgoac = (q) => /“([^”]+)”/.exec(q.q)[1];
loi.forEach((q) => q.o.forEach((o) => assert.ok(cauNgoac(q).includes(o), `“${o}” không phải phần của câu: ` + ten.get(q))));
// câu điền: dạng của từ, từ trong ngoặc ngay sau chỗ trống
const fills = kho.filter((q) => q.type === "fill");
fills.forEach((q) => {
  assert.ok(/^Write the correct form of the word in brackets\./.test(q.q), "lời dặn câu điền: " + ten.get(q));
  assert.ok(/___ \([a-z]+\)/.test(q.q), "từ trong ngoặc ngay sau chỗ trống: " + ten.get(q));
});

/* ---------- Pronunciation: tính lại đáp án ---------- */
// Âm và trọng âm trong Book map (tr. 6–7): Unit 7 /sl/, /sn/; Unit 8 trọng âm từ tận cùng -ic, -ious; Unit 9 trọng âm từ tận cùng -ion,
// -ity. Quy tắc của sách (tr. 84, 94): trọng âm ở âm tiết ngay trước -ic, -ious, -ion, -ity. Unit 10–12 dạy ngữ điệu, không hỏi.
const IPA = { aisle: "aɪl", slice: "slaɪs", sleepy: "sliːpi", slogan: "sləʊɡən", "isn't": "ɪznt", snack: "snæk", sneeze: "sniːz", snail: "sneɪl" };
// âm tiết của từ (|), số sau dấu hai chấm là âm tiết mang trọng âm (đã so với từ điển CMU: vị trí trọng âm chính)
const AT = { scientific: "sci|en|tif|ic:3", activity: "ac|tiv|i|ty:2", harmonious: "har|mo|ni|ous:2", facility: "fa|cil|i|ty:2",
  various: "va|ri|ous:1", ambitious: "am|bi|tious:2", nutritious: "nu|tri|tious:2", religious: "re|li|gious:2",
  education: "ed|u|ca|tion:3", ability: "a|bil|i|ty:2", identity: "i|den|ti|ty:2", victorious: "vic|to|ri|ous:2",
  serious: "se|ri|ous:1", fantastic: "fan|tas|tic:2", romantic: "ro|man|tic:2", collection: "col|lec|tion:2" };
const amTiet = (w) => { const [s, k] = AT[w].split(":"); return { parts: s.split("|"), k: +k }; };
// số âm tiết của đuôi: -ic, -ion 1; -ity 2; -ious 1 sau c, t, g, x (đọc /ʃəs/, /dʒəs/), còn lại 2 (/i.əs/)
const duoi = (w) => (/ic$/.test(w) ? 1 : /ion$/.test(w) ? 1 : /ity$/.test(w) ? 2 : /[ctgx]ious$/.test(w) ? 1 : /ious$/.test(w) ? 2 : 0);
Object.keys(AT).forEach((w) => {
  const { parts, k } = amTiet(w);
  assert.equal(parts.join(""), w, "âm tiết ghép lại thành từ: " + w);
  assert.ok(duoi(w), "từ không có đuôi -ic, -ious, -ion, -ity: " + w);
  assert.equal(k, parts.length - duoi(w), `trọng âm của “${w}” không theo quy tắc của sách (âm tiết ngay trước đuôi)`);
});
const danh = (w) => { const { parts, k } = amTiet(w); return parts.slice(0, k - 1).join("") + "ˈ" + parts.slice(k - 1).join(""); };
const THU = ["first", "second", "third", "fourth"];
const tuPhatAm = new Map();
// từ của các câu Pronunciation kho giữa kì II (mỗi câu một bộ từ riêng, cả giữa hai kho cùng phần Units 7–9)
const tuGk2 = new Set(bank("ta9-gk2-ngau-nhien").questions.filter((q) => q.topic === "Pronunciation").flatMap((q) => q.o));
let n = 0;
kho.filter((q) => q.topic === "Pronunciation").forEach((q) => {
  assert.equal(q.type, "mc");
  q.o.forEach((o) => {
    assert.ok(!tuPhatAm.has(o), `từ “${o}” đã có ở câu Pronunciation khác (mỗi câu một bộ từ riêng): ` + ten.get(q)); tuPhatAm.set(o, q);
    assert.ok(!tuGk2.has(o), `từ “${o}” đã có ở câu Pronunciation của kho giữa kì II: ` + ten.get(q));
  });
  let dung;
  const am = /letters (sl|sn) NOT pronounced \/(sl|sn)\//.exec(q.q);
  if (am) {
    assert.equal(am[1], am[2]);
    q.o.forEach((o) => { assert.ok(IPA[o], "chưa có phiên âm của “" + o + "”: " + ten.get(q)); assert.ok(o.includes(am[1]), `“${o}” không có chữ ${am[1]}: ` + ten.get(q)); });
    dung = q.o.filter((o) => !IPA[o].includes(am[1]));
    assert.ok(q.x.replace(/[ˈˌ]/g, "").includes("/" + IPA[q.o[0]] + "/"), "lời giải ghi phiên âm của đáp án: " + ten.get(q));
  } else {
    q.o.forEach((o) => assert.ok(AT[o], "chưa có âm tiết của “" + o + "”: " + ten.get(q)));
    const tt = q.o.map((o) => amTiet(o).k), th = /stressed on the (first|second|third|fourth) syllable\?$/.exec(q.q);
    if (th) dung = q.o.filter((o, i) => tt[i] === THU.indexOf(th[1]) + 1);
    else if (q.q === "Choose the word with a different stress pattern.") dung = q.o.filter((o, i) => tt.filter((x) => x === tt[i]).length === 1);
    else assert.fail("câu Pronunciation chưa có cách tính: " + ten.get(q));
    q.o.forEach((o) => assert.ok(q.x.includes(danh(o)), `lời giải ghi chỗ trọng âm của “${o}” (${danh(o)}): ` + ten.get(q)));
    assert.ok(q.x.includes(danh(q.o[0]) + " (" + THU[amTiet(q.o[0]).k - 1] + " syllable)"), "lời giải ghi đúng âm tiết mang trọng âm của đáp án: " + ten.get(q));
    // các lựa chọn cùng số âm tiết: không đoán được đáp án theo độ dài của từ (Rút ra N9-gk2-ta)
    assert.equal(new Set(q.o.map((o) => amTiet(o).parts.length)).size, 1, "các lựa chọn cùng số âm tiết: " + ten.get(q));
  }
  assert.deepEqual(dung, [q.o[0]], "đáp án tính lại khác: " + ten.get(q) + " → " + dung.join(", "));
  n++;
});
{
  const pr = kho.filter((q) => q.topic === "Pronunciation");
  ["sl", "sn"].forEach((a) => assert.ok(pr.some((q) => q.q.includes("/" + a + "/")), "có câu âm /" + a + "/ (Unit 7)"));
  assert.ok(pr.some((q) => q.o.some((o) => /(ic|ious)$/.test(o))), "có câu trọng âm -ic, -ious (Unit 8)");
  assert.ok(pr.some((q) => q.o.some((o) => /(ion|ity)$/.test(o))), "có câu trọng âm -ion, -ity (Unit 9)");
}

/* ---------- ngữ pháp: tính lại đáp án ---------- */
const dien = (q, o) => q.q.replace("___", o);
const sau = (q, o) => dien(q, o).split(" → ").pop();
const tuCau = (s) => s.replace(/[.,]/g, "").split(" ");
// Unit 7: câu tường thuật Yes / No: if / whether + chủ ngữ + động từ lùi thì; đổi đại từ theo từng câu
const LUI = { will: "would", can: "could", is: "was", am: "was", are: null };
const QK = { have: "had", live: "lived", like: "liked" };
const SO_NHIEU = ["we", "they", "you"];
const tuongThuat = (cauHoi, chuNgu, doi) => {
  const w = cauHoi.replace(/\?$/, "").split(" "), tro = w[0].toLowerCase(), k = chuNgu.split(" ").length;
  assert.equal(w.slice(1, 1 + k).join(" ").toLowerCase(), chuNgu.toLowerCase(), "chủ ngữ của câu hỏi: " + cauHoi);
  const cn = doi[chuNgu] || chuNgu, con = w.slice(1 + k).map((x) => doi[x] || x);
  if (["do", "does"].includes(tro)) { assert.ok(QK[con[0]], "chưa có quá khứ của " + con[0]); return [cn, QK[con[0]]].concat(con.slice(1)).join(" "); }
  assert.ok(tro in LUI, "chưa có cách lùi thì của " + tro);
  return [cn, LUI[tro] || (SO_NHIEU.includes(cn.toLowerCase()) ? "were" : "was")].concat(con).join(" ");
};
const TRO = ["was", "were", "did", "do", "does", "could", "can", "will", "would", "is", "are", "am", "had", "has", "have"];
const HIEN_TAI = ["is", "are", "am", "do", "does", "can", "will", "has", "have"];
// câu tường thuật đúng: “asked (ai đó)” rồi if / whether + chủ ngữ + động từ (không đảo trợ động từ lên trước), không có thì hiện tại
const dungTuongThuat = (s) => {
  const m = /\b(asked(?: [a-z]+){0,2}|wanted to know) (if|whether) (.+)$/i.exec(s.replace(/[.]$/, ""));
  if (!m) return false;
  const w = m[3].split(" ");
  if (TRO.includes(w[0])) return false;
  const vt = w.findIndex((x, i) => i > 0 && (TRO.includes(x) || /ed$/.test(x) || Object.values(QK).includes(x)));
  return vt > 0 && !w.some((x) => HIEN_TAI.includes(x));
};
// Unit 9: mệnh đề quan hệ xác định ngay sau danh từ: who sau người, which sau vật, whose + danh từ; đại từ làm chủ ngữ (theo sau là
// động từ) không bỏ được; làm tân ngữ (theo sau là chủ ngữ) thì bỏ được và không thêm it, them
const NGUOI = ["girl", "boy", "man", "woman", "uncle", "aunt", "people", "students"];
const DANH_TU = ["name", "house", "mother", "father", "books"];
const CHU_NGU = ["i", "we", "you", "he", "she", "they", "my", "our", "your", "his", "her", "their", "the"];
const xacDinh = (truoc, menh) => {
  const w = menh.split(" "), nguoi = NGUOI.includes(truoc);
  if (w[0] === "whose") return DANH_TU.includes(w[1]);
  let dt = null, con = w;
  if (["who", "which"].includes(w[0])) { dt = w[0]; con = w.slice(1); }
  if ((dt === "who" && !nguoi) || (dt === "which" && nguoi)) return false;
  const tanNgu = CHU_NGU.includes(con[0].toLowerCase());
  if (!dt && !tanNgu) return false;
  return !(tanNgu && con.slice(2).some((x) => ["it", "them", "him", "her"].includes(x)));
};
// Unit 10: mệnh đề quan hệ không xác định: <danh từ riêng / người đã xác định>, who | which | whose …, <phần còn lại>
const VAT = ["saturn", "cave", "river", "lake", "mountain", "island"];
const khongXacDinh = (s) => {
  const m = /^([A-Z][A-Za-z ]*?), (who|which|whose) ([^,]+), ([a-z].*)$/.exec(s);
  if (!m) return false;
  const truoc = m[1].toLowerCase().split(" ").pop(), w = m[3].split(" ");
  if (m[2] === "whose") return DANH_TU.includes(w[0]);
  if ((m[2] === "who") !== NGUOI.includes(truoc)) return false;
  if (m[2] === "which" && !VAT.includes(truoc)) return false;
  // không thêm it, them (đại từ quan hệ đã là chủ ngữ hay tân ngữ)
  return !w.some((x) => ["it", "them"].includes(x));
};
// Unit 11: suggest / advise / recommend + V-ing, hoặc (that) + chủ ngữ + (should) + động từ nguyên thể
const CHU = ["i", "we", "you", "he", "she", "they"];
const QUA_KHU = ["bought", "charged", "went", "took", "made", "gave"];
const goiY = (s) => {
  const m = /\b(?:suggest|advise|recommend)(?:s|d|ed)? (.+)$/i.exec(s.replace(/[.]$/, ""));
  if (!m) return false;
  let w = m[1].split(" ");
  if (/ing$/.test(w[0])) return true;
  if (w[0] === "that") w = w.slice(1);
  if (!CHU.includes(w[0].toLowerCase())) return false;
  let v = w[1];
  if (v === "should") v = w[2];
  return !!v && !QUA_KHU.includes(v) && !/(ed|s|ing)$/.test(v) && !["to", "don't", "must", "will"].includes(v);
};
// Unit 12: although / though (tương phản) hay because / since (lí do); không dùng cùng but
const KET_TU = { although: "tương phản", though: "tương phản", because: "lí do", since: "lí do" };
const dungKetTu = (s) => !/\b(although|though|because|since)\b[^.]*\bbut\b/i.test(s);
// so loi: so câu gốc (sai) với câu sửa trong lời giải (sau dấu hai chấm cuối): chỗ khác nhau của câu gốc phải nằm trong lựa chọn đúng; chỉ
// thêm từ (which) thì lựa chọn đúng phải có cả từ đứng trước và từ đứng sau chỗ thêm (như tests/ta9-gk2.js)
const loiPhu = (q) => {
  const sua = q.x.split(": ").pop(), x = cauNgoac(q).replace(/[.]$/, "").split(" "), y = sua.replace(/[.]$/, "").split(" ");
  let tu = 0; while (tu < x.length && x[tu] === y[tu]) tu++;
  let j = 0; while (j < x.length - tu && j < y.length - tu && x[x.length - 1 - j] === y[y.length - 1 - j]) j++;
  const den = x.length - j;
  const ch = q.o.filter((o) => {
    const ow = o.split(" ");
    for (let s = 0; s + ow.length <= x.length; s++) if (ow.every((t, k) => x[s + k] === t)) { const e = s + ow.length; return tu === den ? s <= tu - 1 && e >= tu + 1 : s <= tu && e >= den; }
    return false;
  });
  return { sua, ch };
};
const CHECKS = [
  // Unit 7: tường thuật câu hỏi Yes / No
  ...[["“Do you have a map of the cave?”", "Do you have a map of the cave?", "you", { you: "we" }],
    ["“Are you still waiting for the cable car?”", "Are you still waiting for the cable car?", "you", { you: "we" }]].map(([has, cau, cn, doi]) => ({ has, right: (q) => {
    const menh = tuongThuat(cau, cn, doi);
    const d = q.o.filter((o) => ["if", "whether"].some((t) => sau(q, o).includes(t + " " + menh)));
    assert.equal(d.length, 1, "đúng một lựa chọn cho câu tường thuật “" + menh + "”");
    q.o.forEach((o) => assert.ok(o === d[0] ? dungTuongThuat(sau(q, o)) : !dungTuongThuat(sau(q, o)) || !sau(q, o).includes(menh), "luật tường thuật xét lựa chọn “" + o + "”"));
    assert.ok(q.x.includes(menh.split(" ").slice(0, 2).join(" ")), "lời giải ghi lại câu tường thuật"); return d[0];
  } })),
  { has: "“Will the rain stop before the boat trip?”", right: (q) => {
    const menh = tuongThuat("Will the rain stop before the boat trip?", "the rain", {}), d = q.o.filter((o) => dungTuongThuat(o) && o.includes("if " + menh));
    assert.equal(d.length, 1, "đúng một câu tường thuật đúng luật"); assert.ok(q.x.includes(d[0]), "lời giải ghi lại câu tường thuật"); return d[0];
  } },
  // Unit 9: mệnh đề quan hệ xác định
  ...["The English songs ___", "The girl ___ next to me", "The words ___ in this lesson"].map((has) => ({ has, right: (q) => {
    const truoc = q.q.split(" ___")[0].split(" ").pop().toLowerCase().replace(/s$/, (x) => (NGUOI.includes(q.q.split(" ___")[0].split(" ").pop().toLowerCase()) ? x : ""));
    const d = q.o.filter((o) => xacDinh(truoc, o));
    assert.equal(d.length, 1, "đúng một mệnh đề quan hệ hợp luật: " + d.join(" | "));
    assert.ok(q.x.includes(dien(q, d[0]).replace(/\.$/, "")), "lời giải ghi lại cả câu"); return d[0];
  } })),
  // Unit 10: mệnh đề quan hệ không xác định
  { has: "“Saturn is the sixth planet from the Sun. It has beautiful rings.”", right: (q) => {
    const [c1, c2] = /“([^”]+)”/.exec(q.q)[1].split(". "), [ten1, ...con1] = c1.split(" ");
    const d = ten1 + ", which " + con1.join(" ") + ", " + c2.replace(/^It /, "");
    q.o.slice(1).forEach((o) => assert.ok(!khongXacDinh(o), "lựa chọn sai phải sai luật: " + o));
    assert.ok(khongXacDinh(d)); return d;
  } },
  { has: "Phong Nha Cave, we explored", right: (q) => {
    const { sua, ch } = loiPhu(q);
    assert.ok(khongXacDinh(sua), "câu sửa đúng luật: " + sua); assert.ok(!khongXacDinh(cauNgoac(q)), "câu gốc sai luật");
    assert.equal(ch.length, 1, "đúng một lựa chọn phủ chỗ sai"); return ch[0];
  } },
  { has: "", order: "My uncle,", right: (q) => { assert.ok(khongXacDinh(q.o.join(" ")), "câu sắp xếp đúng luật mệnh đề quan hệ không xác định"); return null; } },
  // Unit 11: suggest / advise / recommend
  ...["recommended to buy a case", "advised that I bought"].map((has) => ({ has, right: (q) => {
    const { sua, ch } = loiPhu(q);
    assert.ok(goiY(sua), "câu sửa đúng luật: " + sua); assert.ok(!goiY(cauNgoac(q)), "câu gốc sai luật");
    assert.equal(ch.length, 1, "đúng một lựa chọn phủ chỗ sai"); return ch[0];
  } })),
  { has: "“You should charge the camcorder before the trip,” Dad said to us.", right: (q) => {
    const d = q.o.filter(goiY); assert.equal(d.length, 1, "đúng một câu đúng luật: " + d.join(" | "));
    assert.ok(/\bwe\b/.test(d[0]) && /charge the camcorder before the trip/.test(d[0]), "giữ nghĩa: Dad nói với chúng tôi"); return d[0];
  } },
  // Unit 12: so / such … that
  ...["The job interview was ___", "It was ___ interesting career talk", "The garment workers were ___"].map((has) => ({ has, right: (q) => {
    assert.ok(q.o.includes("so") && q.o.some((o) => /^such\b/.test(o)), "lựa chọn có so và such");
    const w = q.q.split("___ ")[1].split(" that")[0].split(" ");
    const d = w.length === 1 ? "so" : /s$|^people$/.test(w[w.length - 1]) ? "such" : "such " + (/^[aeiou]/.test(w[0]) ? "an" : "a");
    assert.ok(q.o.includes(d), "có lựa chọn " + d); return d;
  } })),
  // Unit 12: although / though / because / since
  { has: "“Lan had no experience, but she got the job at the bakery.”", right: (q) => {
    const [a, b] = /“([^”]+)”/.exec(q.q)[1].replace(/\.$/, "").split(", but ");
    const d = q.o.filter((o) => { const k = o.split(" ")[0].toLowerCase(); return KET_TU[k] === "tương phản" && dungKetTu(o) && o === o.split(" ")[0] + " " + a + ", " + b + "."; });
    assert.equal(d.length, 1, "đúng một câu dùng although / though thay but"); return d[0];
  } },
  { has: "", order: "Although", right: (q) => { const c = q.o.join(" "); assert.ok(dungKetTu(c) && /^Although [^,]+, (?!but\b)[a-z][^,]*\.$/.test(c), "Although + mệnh đề, mệnh đề chính"); return null; } },
  { has: "Is each sentence grammatically correct?", right: (q) => {
    q.o.forEach((o) => assert.ok(KET_TU[o.split(" ")[0].toLowerCase()], "câu bắt đầu bằng although / though / because / since: " + o));
    return q.o.map(dungKetTu);
  } }
];
const daTinh = new Set();
CHECKS.forEach((c) => {
  const q = c.order ? (() => { const m = kho.filter((x) => x.type === "order" && x.o[0] === c.order); assert.equal(m.length, 1, "câu sắp xếp mở đầu “" + c.order + "”"); return m[0]; })() : cauCua(c.has);
  const want = c.right(q), at = ten.get(q) + " (" + (c.has || c.order) + ")";
  assert.ok(!daTinh.has(q), "câu được tính hai lần: " + at);
  daTinh.add(q); n++;
  if (want === null) return;
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
});
// mỗi điểm ngữ pháp chỉ ở một ô (ô rút 1 câu): Unit 7 tường thuật ở Hiểu, Unit 9 mệnh đề xác định ở Hiểu, Unit 10, 11 ở Vận dụng, Unit 12
// so / such ở Hiểu (ô Biết của Unit 12 rút 2 câu nên chỉ có từ vựng), although / because / since ở Vận dụng
{
  const o = (q) => unitOf(q) + ":" + q.lv;
  const ngp = kho.filter((q) => daTinh.has(q) && q.topic !== "Pronunciation");
  assert.deepEqual([...new Set(ngp.map(o))].sort(), ["7:2", "9:2", "10:3", "11:3", "12:2", "12:3"].sort(), "ô của các câu ngữ pháp");
  // các câu khác của Unit 12 không có so, such (đáp án của ô Hiểu)
  kho.filter((q) => unitOf(q) === 12 && !/___ (stressful|interesting|hard-working)/.test(q.q)).forEach((q) =>
    assert.ok(!/\b(so|such)\b/i.test([q.q, q.x].concat(q.o || [], q.ans || []).join(" ")), "câu Unit 12 khác có so, such: " + ten.get(q)));
}
// dạng của từ: từ trong ngoặc → đáp án theo bảng họ từ; chỗ trống cần đúng từ loại (danh từ sau The, written, Many, kind of, a lot of;
// tính từ trước danh từ; trạng từ sau speak English)
const HO_TU = { locate: { u: 7, ans: "location", cho: /\bThe ___ \(/ }, permit: { u: 7, ans: "permission", cho: /\bwritten ___ \(/ },
  explore: { u: 7, ans: "explorers", cho: /\bMany ___ \(/ }, culture: { u: 8, ans: "cultural", cho: /'s ___ \(culture\) festival\b/ },
  forget: { u: 8, ans: "unforgettable", cho: /\ban ___ \(forget\) experience\b/ }, luxury: { u: 8, ans: "luxurious", cho: /\ba ___ \(luxury\) hotel\b/ },
  fluent: { u: 9, ans: "fluently", cho: /\bspeak English ___ \(/ }, communicate: { u: 9, ans: "communication", cho: /\bkind of ___ \(/ },
  confident: { u: 9, ans: "confidence", cho: /\ba lot of ___ \(/ } };
fills.forEach((q) => {
  const goc = /___ \(([a-z]+)\)/.exec(q.q)[1], h = HO_TU[goc];
  assert.ok(h, "chưa có trong bảng họ từ: " + goc); assert.equal(h.u, unitOf(q), "từ của Unit " + h.u + ": " + ten.get(q));
  assert.ok(h.cho.test(q.q), "chỗ trống cần đúng từ loại của đáp án: " + ten.get(q));
  assert.equal(q.ans[0], h.ans, ten.get(q)); assert.ok(q.x.includes(goc + " → " + h.ans), "lời giải ghi họ từ: " + ten.get(q));
  daTinh.add(q); n++;
});
// câu từ vựng: đáp án là từ của Unit trong TU (mỗi từ đúng một câu); câu hỏi nghĩa của từ theo DONG_NGHIA; từ khác loại theo nhóm;
// loại hình du lịch theo nơi đi, nơi đến và mục đích (đúng một loại khớp)
const TU = { 7: ["landscape", "destination", "feature"], 8: ["agency", "hop-on hop-off", "world-famous"], 9: ["an exchange student", "borrowed words", "second language"],
  10: ["habitat", "nature reserve", "food chain", "orbit", "pesticides", "threat"], 11: ["smartwatch", "wireless", "rubber"],
  12: ["surgeon", "an assembly worker", "tailor", "rewarding", "inquiring", "demanding"] };
// dạng của sách (Glossary ghi dạng gốc)
const GOC = { "an exchange student": "exchange student", "borrowed words": "borrowed word", pesticides: "pesticide", "an assembly worker": "assembly worker" };
const DONG_NGHIA = { vital: [10, "very important"], harm: [10, "hurt"], observe: [10, "watch"], portable: [11, "easy to carry"], stylish: [11, "fashionable"] };
const NHOM = { "kim loại": ["copper", "steel", "aluminium", "iron"] };
const VN = ["Ha Noi", "Da Nang", "Ho Chi Minh City", "Hue", "Can Tho"];
const loaiDuLich = (s) => {
  const m = /from ([A-Z][A-Za-z ]+?) to ([A-Z][A-Za-z ]+?)(?: in [A-Z][a-z]+)? (?:only )?to (.+)$/.exec(s);
  assert.ok(m, "đọc được nơi đi, nơi đến, mục đích: " + s);
  const l = [];
  if (VN.includes(m[1]) && VN.includes(m[2])) l.push("domestic tourism");
  if (/\b(food|dishes)\b/.test(m[3])) l.push("food tourism");
  if (/\bbuy\b/.test(m[3])) l.push("shopping tourism");
  return l;
};
const tuVung = kho.filter((q) => unitOf(q) && !daTinh.has(q));
const hoiNghia = new Set();
tuVung.forEach((q) => {
  assert.ok(q.type === "mc" && q.lv <= 2, "câu chưa tính lại đáp án (chỉ câu từ vựng mức Biết, Hiểu được bỏ qua): " + ten.get(q));
  const hoi = /closest in meaning to “(\w+)”/.exec(q.q);
  if (hoi) { assert.ok(DONG_NGHIA[hoi[1]] && DONG_NGHIA[hoi[1]][0] === unitOf(q), "từ hỏi nghĩa của Unit: " + ten.get(q)); assert.equal(DONG_NGHIA[hoi[1]][1], q.o[0], "từ đồng nghĩa: " + ten.get(q)); hoiNghia.add(hoi[1]); return; }
  if (q.q === "Choose the odd one out.") {
    const d = q.o.filter((o) => !Object.values(NHOM).some((g) => g.includes(o)));
    assert.deepEqual(d, [q.o[0]], "từ khác loại: " + ten.get(q)); return;
  }
  if (/^Which type of tourism is it\?/.test(q.q)) {
    assert.ok(q.o.every((o) => /tourism$/.test(o)), "lựa chọn là loại hình du lịch: " + ten.get(q));
    const l = loaiDuLich(/“([^”]+)”/.exec(q.q)[1].replace(/\.$/, ""));
    assert.deepEqual(q.o.filter((o) => l.includes(o)), [q.o[0]], "đúng một loại hình du lịch khớp: " + ten.get(q) + " → " + l.join(", ")); return;
  }
  assert.equal(TU[unitOf(q)].filter((t) => q.o[0] === t).length, 1, "đáp án câu từ vựng là từ của Unit trong TU: " + ten.get(q));
});
Object.entries(TU).forEach(([u, ws]) => ws.forEach((t) => assert.equal(tuVung.filter((q) => unitOf(q) === +u && q.o[0] === t).length, 1, `từ “${t}” của Unit ${u}: đúng một câu`)));
assert.deepEqual([...hoiNghia].sort(), Object.keys(DONG_NGHIA).sort(), "mọi từ trong DONG_NGHIA có câu hỏi nghĩa");
assert.ok(kho.filter((q) => q.topic === "Pronunciation" || q.topic === "Reading" || daTinh.has(q) || tuVung.includes(q)).length === kho.length);
// Unit 7–9 viết khác kho giữa kì II: đáp án không trùng đáp án câu cùng Unit của kho đó (Rút ra N20, N25)
{
  const gk2 = bank("ta9-gk2-ngau-nhien").questions, da = (q) => String(q.type === "mc" ? q.o[0] : q.type === "fill" ? q.ans[0] : q.type === "order" ? q.o.join(" ") : JSON.stringify(q.a)).toLowerCase();
  [7, 8, 9].forEach((u) => {
    const cu = new Set(gk2.filter((q) => unitOf(q) === u).map(da));
    kho.filter((q) => unitOf(q) === u).forEach((q) => assert.ok(!cu.has(da(q)), "trùng đáp án câu Unit " + u + " của kho giữa kì II: " + ten.get(q)));
  });
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

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Như tests/ta9-gk2.js. Rút cùng lúc: khác chủ đề, cùng chủ đề khác mức, hoặc cùng ô mà ô rút từ 2 câu (Rút ra N25); câu của hai đoạn
   đọc khác nhau không bao giờ rút cùng lúc. Chữ cần dò của đáp án (lựa chọn đúng, đáp án điền), so cả từ theo gốc từ: đáp án một từ thì
   từ đó, từ ngữ pháp (NGU_PHAP: so, had, were…) chỉ dò ở câu cùng chủ đề; đáp án 2–3 từ thì cả cụm; đáp án là câu thì các chuỗi 3 từ
   liền nhau không có ở lựa chọn sai nào. Đáp án câu Reading chỉ dò ở câu cùng đoạn; câu Pronunciation không dò (thấy từ ở câu khác không
   lộ cách đọc). Chữ của câu kia: đề bài, đáp án, lời giải, ý của câu đúng/sai, mảnh của câu sắp xếp, đoạn đọc (lựa chọn sai của câu
   trắc nghiệm không tính). Đáp án không lặp từ (trừ từ ngữ pháp) của chính đề bài câu có chỗ trống (Rút ra N12). */
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
    if ((q.type !== "mc" && q.type !== "fill") || q.topic === "Pronunciation") return;
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
  const a = cauCua("Wetlands are the natural ___"), b = cauCua("How did the ranger show the club around");
  const gia = Object.assign({}, b, { x: b.x + " Wetlands are a habitat for birds." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => /: habitat$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
  const c = cauCua("The job interview was ___"), e = cauCua("Teaching young children is a ___ job");
  const gia2 = Object.assign({}, e, { x: e.x + " It is so interesting." });
  assert.ok(doLo([c, gia2], (q) => q.topic).some((s) => /: so$/.test(s)), "bộ dò phải bắt được đáp án ngữ pháp ở câu cùng Unit");
  const f = cauCua("Bees are dying in some areas"), g = cauCua("Plastic bags in the sea can harm");
  const gia3 = Object.assign({}, g, { x: "Farmers should use less pesticide." });
  assert.ok(doLo([f, gia3], (q) => q.topic).some((s) => /: pesticid$/.test(s)), "bộ dò phải bắt được dạng khác của đáp án (pesticides / pesticide)");
}

/* ---------- từ của sách, không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
// lời dặn chuẩn của đề Tiếng Anh (mục 3.2 của docs/KE-HOACH-NOI-DUNG.md) và lời dặn của câu phát âm, câu dạng từ, giống lời dặn của sách: không so
const LOI_DAN = ["Write the correct form of the word in brackets.", "Put the words in the correct order.", "Read the text. Then answer the questions.",
  "Read the text again. Is each sentence true or false?", "Which part of the sentence is wrong?", "Choose the sentence closest in meaning:",
  "Is each sentence grammatically correct?", "Choose the word with a different stress pattern.", "Choose the odd one out.",
  "In which word are the letters sl NOT pronounced /sl/?", "In which word are the letters sn NOT pronounced /sn/?",
  "Which word is stressed on the first syllable?", "Which word is stressed on the second syllable?", "Which word is stressed on the third syllable?"];
const boLoiDan = (s) => LOI_DAN.reduce((a, l) => a.split(l).join(" "), String(s));
const truong = (q) => [boLoiDan(q.q), q.x].concat(q.o || [], q.ans || [], q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].text] : []);
if (SACH.length) {
  const f9 = SACH.find((f) => /lop-9[\\/]tieng-anh-9[\\/]/.test(f));
  assert.ok(f9, "OnUp-Book có Tiếng Anh 9");
  const raw = fs.readFileSync(f9, "utf8"), parts = raw.split(/=== page-\d+ · ([^=]+) ===/), trang = {};
  for (let i = 1; i < parts.length; i += 2) { const m = /trang in (\d+)/.exec(parts[i]); if (m) trang[+m[1]] = (trang[+m[1]] || "") + parts[i + 1]; }
  // tên Unit theo Contents (trang in 2; chữ OCR đọc “UNIT 11” thành “UNIT TI”, nên so cả mục lục trong README của cuốn, người đã soát)
  const mucLuc = fs.readFileSync(path.join(path.dirname(f9), "README.md"), "utf8");
  Object.entries(UNITS).forEach(([u, t]) => {
    assert.ok(trang[2].toUpperCase().includes(`: ${t.toUpperCase()} `), `Contents ghi ${t}`);
    assert.ok(mucLuc.includes(`| Unit ${u}: ${t} |`), `mục lục ghi Unit ${u}: ${t}`);
  });
  // trang của từng Unit: từ trang bắt đầu (Contents) đến trước Unit sau (Review 3 ở trang in 102–103, Review 4 ở 134–135), cộng mục Unit
  // đó của Glossary (tr. 138–139; đã xem ảnh page-140, page-141: chữ OCR của hai trang này lẫn cột, nên tìm cả từ trong toàn Glossary)
  const BAT_DAU = { 7: 72, 8: 82, 9: 92, 10: 104, 11: 114, 12: 124, 13: 134 }, gl = raw.slice(raw.indexOf("GLOSSARY")).toLowerCase();
  const chuUnit = (u) => { let s = ""; for (let t = BAT_DAU[u]; t < BAT_DAU[u + 1]; t++) s += " " + (trang[t] || ""); return s.toLowerCase().replace(/\s+/g, " "); };
  const coTrong = (u, t) => chuUnit(u).includes(t) || gl.replace(/\s+/g, " ").includes(t);
  Object.entries(TU).forEach(([u, ws]) => ws.forEach((t) => assert.ok(coTrong(+u, GOC[t] || t), `từ “${GOC[t] || t}” không có trong trang của Unit ${u}`)));
  // từ của câu dạng từ: từ trong ngoặc hoặc đáp án có trong trang của Unit (sách ghi cultural, luxurious, unforgettable)
  Object.entries(HO_TU).forEach(([w, h]) => assert.ok(chuUnit(h.u).includes(w) || chuUnit(h.u).includes(h.ans), `từ “${w}” / “${h.ans}” (câu dạng từ) không có trong trang của Unit ${h.u}`));
  Object.entries(DONG_NGHIA).forEach(([w, [u]]) => assert.ok(coTrong(u, w), `từ “${w}” không có trong trang của Unit ${u}`));
  Object.values(NHOM).flat().concat(["cardboard"]).forEach((w) => assert.ok(coTrong(11, w), `vật liệu “${w}” không có trong trang của Unit 11`));
  ["domestic tourism", "food tourism", "shopping tourism"].forEach((w) => assert.ok(coTrong(8, w), `“${w}” không có trong trang của Unit 8`));
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book); tên Unit, từ của đáp án câu từ vựng, câu hỏi nghĩa, câu dạng từ có trong trang của Unit.");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác ---------- */
{
  // đề cố định và câu riêng của các đề ngẫu nhiên (câu của đề cố định trong kho đề ngẫu nhiên chỉ tính một lần)
  const khac = BANKS.filter((b) => !/^ta9-ck2-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + [q.q, q.x].concat(q.o || [], q.ans || [], q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn đọc, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn.");
console.log("TA9 CK2 OK");
