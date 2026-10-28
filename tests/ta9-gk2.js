// Kiểm tra ngân hàng Tiếng Anh 9 giữa kì II của Phiên N9-gk2-ta (data/banks/9-ta.js, ta9-gk2-*), theo mẫu tests/ta9-ck1.js.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho
// lớp 9 (đoạn “Chung của các phiên lớp 9” của docs/KE-HOACH-NOI-DUNG.md).
// Tính lại đáp án bằng code (câu nhận ra bằng một đoạn chữ của đề, đúng một câu trong kho):
// - Pronunciation: âm /sl/, /sn/ (Unit 7) theo phiên âm của từng lựa chọn (bảng IPA, cách ghi Anh – Anh như sách; chữ sl, sn có trong
//   mọi lựa chọn, đúng một từ đọc khác); trọng âm (Unit 8: -ic, -ious; Unit 9: -ion, -ity) theo bảng âm tiết của từng từ, từ nào cũng
//   đúng quy tắc của sách (trọng âm ở âm tiết ngay trước đuôi; -ious đọc một âm tiết sau c, t, g, x), đúng một lựa chọn khớp đề bài,
//   lời giải ghi đúng chỗ trọng âm của mọi lựa chọn; mỗi câu một bộ từ riêng (Rút ra N10);
// - câu tường thuật Yes / No (Unit 7): đọc câu hỏi trực tiếp trong ngoặc, đổi sang if / whether + trật tự câu kể, lùi thì (bảng), đổi
//   đại từ (ghi theo từng câu), so với câu tạo từ lựa chọn đúng (lựa chọn sai không ra câu đó); câu đúng/sai 4 ý và câu sắp xếp xét
//   bằng cùng luật (sau if / whether là chủ ngữ rồi động từ đã lùi thì);
// - đại từ quan hệ (Unit 8): who sau danh từ chỉ người, which sau danh từ chỉ vật, whose khi ngay sau chỗ trống là danh từ;
// - mệnh đề quan hệ xác định (Unit 9): đại từ quan hệ làm chủ ngữ (theo sau là động từ) hay tân ngữ (theo sau là chủ ngữ); chỉ bỏ được
//   khi làm tân ngữ; câu nối hai câu tính lại từ hai câu cho sẵn; câu tìm lỗi sai: câu sửa trong lời giải đúng luật, câu gốc sai, lựa
//   chọn đúng phủ chỗ khác nhau giữa hai câu;
// - dạng của từ (Unit 7, 8, 9): từ trong ngoặc và đáp án theo bảng họ từ, chỗ trống cần đúng từ loại của đáp án;
// - ôn Units 1–6: when + to-infinitive (tín hiệu giờ), promise + to-infinitive, must (quy định), hang out with (cụm động từ của Unit 2),
//   so sánh nhất + present perfect + ever, quá khứ tiếp diễn và quá khứ đơn; đáp án không trùng đáp án câu nào của kho cuối kì I;
// - câu sắp xếp: mảnh đầu viết hoa, mảnh cuối có dấu chấm, các mảnh khác viết thường, lời giải ghi lại cả câu; câu tìm lỗi sai: các
//   lựa chọn là các phần của câu trong ngoặc; còn lại là câu từ vựng (từ của sách theo Unit) và câu Reading.
// Rồi kiểm tra ma trận (hai đề cố định và câu riêng đều chia đúng ma trận, theo thứ tự chủ đề), tên chủ đề theo Contents của sách,
// Reading (mỗi đề và phần câu riêng một đoạn 3 câu mức 1-2-3, đoạn không có who, which, whose), dạng câu, đáp án đúng không dài hơn hẳn
// lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn (Phiên N9-ck1-lsdl-gdcd), không lặp
// chữ của nhãn chủ đề, đề bài không trùng, note không nói đề chung của Sở (chỉ có ở kì cuối kì), rút thử nhiều lần (đúng ma trận, trọn
// đoạn, gặp đủ kho; đã làm hết một đề cố định thì không rút lại câu của đề đó) và dò lộ đáp án giữa các câu rút được cùng lúc như
// tests/ta9-ck1.js (Rút ra N5, N25, N25b, N9-ck1-ta; thêm whose vào từ ngữ pháp; câu Pronunciation không dò vì thấy từ ở câu khác không
// lộ cách đọc). Unit 8 hỏi who, which, whose ở ô Biết, nên các câu khác của Unit 8 không có ba từ đó; whose chỉ có ở một câu của kho.
// DO_LO=1 in chỗ trùng để xem tay, danh sách đã xem ở DA_XEM.
// Có sách ở ../OnUp-Book (repo riêng tư): tên Unit theo Contents; từ của đáp án câu từ vựng, từ trong ngoặc của câu dạng từ, từ hỏi
// nghĩa có trong trang của đúng Unit đó (theo trang bắt đầu ở Contents, cộng mục Unit đó của Glossary); cụm động từ của câu ôn có trong
// trang của Unit 2; mọi trường chữ (cả đoạn đọc; trừ lời dặn chuẩn, sách cũng dùng) không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi
// cuốn (bỏ dấu, gộp nguyên âm; DO_SACH=1 in chuỗi 6 từ). So thêm với mọi câu của các kho khác: không có chuỗi 8 từ trùng; DO_KHO=1 in
// chuỗi 5 từ.
// Chạy: node tests/ta9-gk2.js → in TA9 GK2 OK.
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
const S = { de1: "ta9-gk2-de1", de2: "ta9-gk2-de2", pool: "ta9-gk2-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 9); assert.equal(b.subject, "Tiếng Anh"); assert.equal(b.file, "9-ta.js");
  assert.ok(/Units 7–9/.test(b.note) && /No listening/.test(b.note), b.id + ": note ghi Units 7–9, không có câu nghe");
  assert.ok(!/Department of Education/.test(b.note), b.id + ": đề giữa kì không nói đề chung của Sở (chỉ có ở cuối kì I, cuối kì II)");
});
// gắn vào kì thi giữa kì II của khối 9
{
  const c = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), c);
  const e = c.window.ONTAP_SEED_EVENTS.find((x) => x.id === "gk2-l9");
  assert.ok(e && e.grades.includes(9), "có kì thi gk2-l9 của khối 9");
  Object.values(S).forEach((id) => assert.ok(e.banks.includes(id), id + " gắn vào gk2-l9"));
  assert.ok(/Tiếng Anh: Units 7–9/.test(e.scope), "phạm vi của gk2-l9 ghi Tiếng Anh: Units 7–9");
}
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("ta9-gk2-", "") + "#" + (i + 1))));
const cauCua = (has) => { const m = kho.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };

/* ---------- tên chủ đề theo Contents của sách, ma trận ---------- */
const UNITS = { 7: "Natural Wonders of the World", 8: "Tourism", 9: "World Englishes" };
const ON = "Review of Units 1–6";
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
assert.deepEqual(TOPICS, ["Pronunciation"].concat(Object.entries(UNITS).map(([u, t]) => `Unit ${u} · ${t}`), [ON, "Reading"]),
  "chủ đề: Pronunciation, Unit 7–9 theo Contents, phần ôn Units 1–6, Reading");
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
[7, 8, 9].forEach((u) => { const n = kho.filter((q) => unitOf(q) === u).length / 3; assert.ok(n >= 5 && n <= 6, `Unit ${u}: mỗi đề 5–6 câu`); });
assert.ok(kho.filter((q) => q.topic === ON).length / 3 === 2, "mỗi đề 2 câu ôn Units 1–6");
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
  assert.ok(!/\b(who|which|whose)\b/i.test(ps.text), "đoạn " + id + " không có who, which, whose (đáp án của Unit 8)");
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
// nhãn “môn · chủ đề” hiện trên câu: đáp án không lặp chữ của nhãn (Rút ra N6), ví dụ tourism ở Unit 8
const nhan = (t) => t.toLowerCase().replace(/^unit \d+ · /, "").split(/[^a-z]+/).filter((w) => w.length > 3 && !["units", "review"].includes(w));
kho.filter((q) => q.type === "mc" || q.type === "fill").forEach((q) => {
  const da = String(q.type === "mc" ? q.o[0] : q.ans[0]).toLowerCase();
  nhan(q.topic).forEach((w) => assert.ok(!da.includes(w.replace(/es$/, "")), `đáp án lặp chữ “${w}” của nhãn chủ đề: ` + ten.get(q)));
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
// Âm và trọng âm trong Book map (tr. 6–7): Unit 7 /sl/, /sn/; Unit 8 trọng âm từ tận cùng -ic, -ious; Unit 9 trọng âm từ tận cùng -ion, -ity.
// Quy tắc của sách (tr. 84, 94): trọng âm ở âm tiết ngay trước -ic, -ious, -ion, -ity.
const IPA = { island: "aɪlənd", sleeve: "sliːv", slender: "slendə", asleep: "əsliːp", "doesn't": "dʌznt", snowball: "snəʊbɔːl", sniff: "snɪf", snore: "snɔː" };
// âm tiết của từ (|), số sau dấu hai chấm là âm tiết mang trọng âm (đã so với từ điển CMU: vị trí trọng âm chính như cách đọc Anh – Anh)
const AT = { scenic: "sce|nic:1", heroic: "he|ro|ic:2", exotic: "ex|ot|ic:2", poetic: "po|et|ic:2",
  invitation: "in|vi|ta|tion:3", complexity: "com|plex|i|ty:2", majority: "ma|jor|i|ty:2", security: "se|cur|i|ty:2",
  pollution: "pol|lu|tion:2", question: "ques|tion:1", nation: "na|tion:1", information: "in|for|ma|tion:3",
  glorious: "glo|ri|ous:1", mysterious: "mys|te|ri|ous:2", suspicious: "sus|pi|cious:2", infectious: "in|fec|tious:2",
  curiosity: "cu|ri|os|i|ty:3", community: "com|mu|ni|ty:2", celebrity: "ce|leb|ri|ty:2", humidity: "hu|mid|i|ty:2",
  obvious: "ob|vi|ous:1", organic: "or|gan|ic:2", dramatic: "dra|mat|ic:2", delicious: "de|li|cious:2",
  magnetic: "mag|net|ic:2", economic: "e|co|nom|ic:3", energetic: "en|er|get|ic:3", optimistic: "op|ti|mis|tic:3" };
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
let n = 0;
kho.filter((q) => q.topic === "Pronunciation").forEach((q) => {
  assert.equal(q.type, "mc");
  q.o.forEach((o) => { assert.ok(!tuPhatAm.has(o), `từ “${o}” đã có ở câu Pronunciation khác (mỗi câu một bộ từ riêng): ` + ten.get(q)); tuPhatAm.set(o, q); });
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
  }
  assert.deepEqual(dung, [q.o[0]], "đáp án tính lại khác: " + ten.get(q) + " → " + dung.join(", "));
  n++;
});
// Unit 7 hỏi /sl/, /sn/ (mỗi âm ít nhất một câu); Unit 8 hỏi -ic hoặc -ious, Unit 9 hỏi -ion hoặc -ity (mỗi loại ít nhất hai câu)
{
  const pr = kho.filter((q) => q.topic === "Pronunciation");
  ["sl", "sn"].forEach((a) => assert.ok(pr.some((q) => q.q.includes("/" + a + "/")), "có câu âm /" + a + "/"));
  assert.ok(pr.filter((q) => q.o.some((o) => /(ic|ious)$/.test(o))).length >= 2, "có câu trọng âm -ic, -ious (Unit 8)");
  assert.ok(pr.filter((q) => q.o.some((o) => /(ion|ity)$/.test(o))).length >= 2, "có câu trọng âm -ion, -ity (Unit 9)");
}

/* ---------- ngữ pháp: tính lại đáp án ---------- */
const coCum = (s, c) => (" " + s.toLowerCase().replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ") + " ").includes(" " + c.toLowerCase() + " ");
const dien = (q, o) => q.q.replace("___", o);
const sau = (q, o) => dien(q, o).split(" → ").pop();
// câu tường thuật Yes / No (Unit 7): if / whether + chủ ngữ + động từ lùi thì; đổi đại từ theo từng câu; this → that, here → there
const LUI = { will: "would", can: "could", may: "might", is: "was", am: "was", are: null };
const QK = { live: "lived", like: "liked", want: "wanted", have: "had", know: "knew", feed: "fed" };
const SO_NHIEU = ["we", "they", "you"];
const tuongThuat = (cauHoi, doi) => {
  const w = cauHoi.replace(/\?$/, "").split(" "), tro = w[0].toLowerCase(), cn = doi[w[1]] || w[1];
  const doiCho = (x) => (doi[x] || { this: "that", these: "those", here: "there" }[x] || x);
  const con = w.slice(2).map(doiCho);
  if (["do", "does"].includes(tro)) { assert.ok(QK[con[0]], "chưa có quá khứ của " + con[0]); return [cn, QK[con[0]]].concat(con.slice(1)).join(" "); }
  assert.ok(tro in LUI, "chưa có cách lùi thì của " + tro);
  return [cn, LUI[tro] || (SO_NHIEU.includes(cn.toLowerCase()) ? "were" : "was")].concat(con).join(" ");
};
const TRO = ["was", "were", "did", "do", "does", "could", "can", "will", "would", "is", "are", "am", "had", "has", "have"];
const HIEN_TAI = ["is", "are", "am", "do", "does", "can", "will", "has", "have", "may"];
// câu tường thuật đúng: “asked (ai đó) / wanted to know” rồi if / whether + chủ ngữ + động từ (không phải trợ động từ đảo lên trước), không có thì hiện tại
const dungTuongThuat = (s) => {
  const m = /\b(asked(?: [a-z]+){0,2}|wanted to know) (if|whether) (.+)$/i.exec(s.replace(/[.]$/, ""));
  if (!m) return false;
  const w = m[3].split(" ");
  if (TRO.includes(w[0])) return false;
  const vt = w.findIndex((x, i) => i > 0 && (TRO.includes(x) || /ed$/.test(x) || Object.values(QK).includes(x)));
  return vt > 0 && !w.some((x) => HIEN_TAI.includes(x));
};
// đại từ quan hệ (Unit 8): who sau người, which sau vật, whose khi ngay sau chỗ trống là danh từ
const NGUOI = ["driver", "guide", "man", "woman", "girl", "boy", "people", "students", "teacher"];
const DANH_TU = ["people", "rooms", "house", "houses", "name", "son", "daughter", "father", "mother"];
const daiTuQH = (q) => {
  const [truoc, sauTrong] = q.q.split("___"), tTruoc = truoc.trim().split(" ").pop(), tSau = sauTrong.trim().split(" ")[0];
  if (DANH_TU.includes(tSau)) return "whose";
  return NGUOI.includes(tTruoc) ? "who" : "which";
};
// mệnh đề quan hệ (Unit 9): đại từ quan hệ làm tân ngữ khi ngay sau nó là chủ ngữ; chỉ bỏ được khi làm tân ngữ
const CHU_NGU = ["i", "we", "you", "he", "she", "they", "my", "our", "your", "his", "her", "their", "the"];
const lamTanNgu = (s) => { const m = /\b(?:who|which) (\w+)/i.exec(s); return !!m && CHU_NGU.includes(m[1].toLowerCase()); };
// lỗi của mệnh đề quan hệ: thêm it, them… sau động từ khi đại từ quan hệ đã là tân ngữ; dùng who cho vật
const VAT = ["app", "museum", "song", "book", "kite", "road", "cake", "bus"];
const loiMenhDe = (s) => {
  const l = [];
  if (/\b(?:which|who) (?:i|we|you|he|she|they|my \w+) \w+ (?:it|them|him|her)\b/i.test(s)) l.push("thêm đại từ tân ngữ");
  if (new RegExp("\\b(?:" + VAT.join("|") + ") (?:my \\w+|i|we|you|he|she|they) \\w+(?: \\w+){0,2} (?:it|them)\\b", "i").test(s)) l.push("thêm đại từ tân ngữ (bỏ đại từ quan hệ)");
  const who = /\b(\w+) who\b/i.exec(s); if (who && VAT.includes(who[1].toLowerCase())) l.push("who sau vật");
  if (/\b(?:which|who) \w+(?: \w+){1,5} it (?:has|is|leaves)\b/i.test(s)) l.push("thêm chủ ngữ it");
  return l;
};
// so câu gốc (sai) với câu sửa trong lời giải (sau dấu hai chấm cuối): chỗ khác nhau của câu gốc phải nằm trong lựa chọn đúng của câu
// tìm lỗi; chỉ thêm từ (who, with) thì lựa chọn đúng phải có cả từ đứng trước và từ đứng sau chỗ thêm
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
// động từ + to-infinitive (Unit 6); cụm động từ của Unit 2 (A Closer Look 2)
const V_TO = ["promise", "hope", "decide", "agree", "want", "plan", "learn"];
const PV2 = ["get around", "carry out", "come down with", "hang out with", "cut down on", "throw away"];
const KHUYET = { must: "bắt buộc", might: "có thể xảy ra", "can't": "không thể", "needn't": "không cần" };
const TU_HOI = { when: /\b\d+ (a|p)\.m\.|\bo'clock\b|\btime\b/, what: /: a \w+ or a \w+/, who: /\b(ask|invite)\b/, where: /\b(put|leave|go)\b/, which: /\bwhich one\b/ };
const PP = { eat: "eaten", see: "seen", visit: "visited", try: "tried" };
const CHECKS = [
  // Unit 7: tường thuật câu hỏi Yes / No
  ...[["Will you join our trip", { you: "I", our: "their" }], ["Are you afraid of heights?", { you: "she" }], ["Can we feed the monkeys?", { we: "they" }]].map(([has, doi]) => ({ has, right: (q) => {
    const cau = /“([^”]+\?)”/.exec(q.q)[1], menh = tuongThuat(cau, doi);
    const d = q.o.filter((o) => ["if", "whether"].some((t) => sau(q, o).includes(t + " " + menh)));
    assert.equal(d.length, 1, "đúng một lựa chọn cho câu tường thuật “" + menh + "”");
    // lựa chọn đúng theo luật; lựa chọn sai thì sai luật (trật tự, thì) hoặc sai đại từ
    q.o.forEach((o) => assert.ok(o === d[0] ? dungTuongThuat(sau(q, o)) : !dungTuongThuat(sau(q, o)) || /\b(I|we|you)\b/.test(o) !== /\b(I|we|you)\b/.test(d[0]), "luật tường thuật xét lựa chọn “" + o + "”"));
    assert.ok(q.x.includes(menh), "lời giải ghi lại câu tường thuật"); return d[0];
  } })),
  { has: "“Do you live near the waterfall?”", right: (q) => {
    const menh = tuongThuat("Do you live near the waterfall?", { you: "he" }), d = q.o.filter((o) => o.includes("if " + menh) || o.includes("whether " + menh));
    assert.equal(d.length, 1); q.o.forEach((o) => assert.ok(o === d[0] ? dungTuongThuat(o) : !dungTuongThuat(o) || /\bif I\b/.test(o), "luật tường thuật xét lựa chọn “" + o + "”")); return d[0];
  } },
  { has: "Is each sentence grammatically correct?", right: (q) => q.o.map(dungTuongThuat) },
  { has: "", order: "My sister", right: (q) => { assert.ok(dungTuongThuat(q.o.join(" ")), "câu sắp xếp đúng luật tường thuật"); return null; } },
  // Unit 8: who, which, whose
  ...["The driver ___ took us", "take the bus ___ stops", "a village ___ people make"].map((has) => ({ has, right: (q) => {
    assert.deepEqual(q.o.slice().sort(), ["what", "which", "who", "whose"].sort(), "lựa chọn: who, which, whose, what");
    const d = daiTuQH(q); assert.ok(q.x.includes(d)); return d;
  } })),
  // Unit 9: mệnh đề quan hệ xác định
  { has: "In which sentence can we leave out the relative pronoun?", right: (q) => { const d = q.o.filter(lamTanNgu); assert.equal(d.length, 1, "đúng một câu có đại từ quan hệ làm tân ngữ"); return d[0]; } },
  { has: "“I often use a learning app. My cousin told me about it.”", right: (q) => {
    // bỏ it ở cuối câu thứ hai, bỏ đại từ quan hệ (làm tân ngữ), đặt ngay sau danh từ của câu thứ nhất (a → the)
    const [c1, c2] = /“([^”]+)”/.exec(q.q)[1].split(". "), menh = c2.replace(/ it\.$/, "").replace(/^My/, "my");
    const d = c1.replace(/\ba learning app\b/, "the learning app " + menh) + ".";
    q.o.slice(1).forEach((o) => assert.ok(loiMenhDe(o).length || !o.includes(menh + "."), "lựa chọn sai phải sai luật hay sai nghĩa: " + o));
    assert.deepEqual(loiMenhDe(d), []); return d;
  } },
  { has: "“The museum opened last year. It has a room full of old maps.”", right: (q) => {
    const [c1, c2] = /“([^”]+)”/.exec(q.q)[1].split(". "), d = c1.replace(/^The museum /, "The museum which ") + " " + c2.replace(/^It /, "");
    q.o.slice(1).forEach((o) => assert.ok(loiMenhDe(o).length || o.indexOf("which") > o.indexOf("year"), "lựa chọn sai phải sai luật hay sai chỗ: " + o));
    assert.deepEqual(loiMenhDe(d), []); return d;
  } },
  ...["The song which we sang it", "People live near the airport"].map((has) => ({ has, right: (q) => {
    const { sua, ch } = loiPhu(q);
    assert.deepEqual(loiMenhDe(sua), [], "câu sửa đúng luật: " + sua);
    assert.ok(loiMenhDe(cauNgoac(q)).length || !/\b(who|which)\b/.test(cauNgoac(q)), "câu gốc sai");
    if (/^People live/.test(cauNgoac(q))) assert.ok(/^People who live/.test(sua) && !lamTanNgu(sua), "đại từ quan hệ làm chủ ngữ không bỏ được");
    assert.equal(ch.length, 1, "đúng một lựa chọn phủ chỗ sai"); return ch[0];
  } })),
  { has: "", order: "The cake", right: (q) => { const c = q.o.join(" "); assert.ok(/^The cake my grandmother made was\b/.test(c) && q.x.includes("object"), "bỏ đại từ quan hệ làm tân ngữ"); return null; } },
  // ôn Units 1–6
  { has: "hasn't told us ___ to arrive", right: (q) => { assert.ok(q.q.includes("___ to ") && q.o.every((o) => TU_HOI[o])); const d = q.o.filter((o) => TU_HOI[o].test(q.q)); assert.equal(d.length, 1, "đúng một từ để hỏi hợp tín hiệu"); return d[0]; } },
  { has: "", order: "My parents", right: (q) => { const c = q.o.join(" "); assert.ok(coCum(c, "promised to take") && V_TO.includes("promise"), "promise + to-infinitive"); return null; } },
  { has: "borrow books from our school library", right: (q) => { assert.ok(/It's the rule\.$/.test(q.q)); q.o.forEach((o) => assert.ok(KHUYET[o])); const d = q.o.filter((o) => KHUYET[o] === "bắt buộc"); assert.equal(d.length, 1); return d[0]; } },
  { has: "hangs out his best friend", right: (q) => { const { sua, ch } = loiPhu(q); assert.ok(PV2.includes("hang out with") && coCum(sua, "hangs out with"), "cụm động từ hang out with"); assert.equal(ch.length, 1); return ch[0]; } },
  { has: "This is the best pho I ___", right: (q) => { assert.ok(/\bthe best\b/.test(q.q), "so sánh nhất"); const d = q.o.filter((o) => o === "have ever " + PP.eat); assert.equal(d.length, 1); return d[0]; } },
  { has: "we were seeing a shooting star", right: (q) => { const { sua, ch } = loiPhu(q); assert.ok(/^While we were \w+ing\b/.test(sua) && coCum(sua, "we saw"), "quá khứ tiếp diễn cho việc dài, quá khứ đơn cho việc ngắn"); assert.equal(ch.length, 1); return ch[0]; } }
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
// Unit 8: chỉ ba câu chọn đại từ quan hệ có who, which, whose; whose chỉ có ở một câu của kho
{
  const nguPhap8 = kho.filter((q) => unitOf(q) === 8 && daTinh.has(q));
  assert.ok(nguPhap8.length === 3 && nguPhap8.every((q) => q.lv === 1), "Unit 8 hỏi đại từ quan hệ ở ba câu mức Biết");
  kho.filter((q) => unitOf(q) === 8 && !daTinh.has(q)).forEach((q) => assert.ok(!/\b(who|which|whose)\b/i.test([q.q, q.x].concat(q.o || [], q.ans || []).join(" ")), "câu Unit 8 khác có who, which, whose: " + ten.get(q)));
  const coWhose = kho.filter((q) => /\bwhose\b/i.test([q.q, q.x].concat(q.type === "mc" ? [q.o[0]] : q.o || [], q.ans || []).join(" ")));
  assert.equal(coWhose.length, 1, "whose chỉ có ở một câu của kho: " + coWhose.map((q) => ten.get(q)).join(", "));
}
// dạng của từ: từ trong ngoặc → đáp án theo bảng họ từ; chỗ trống cần đúng từ loại (danh từ sau the, my, with; tính từ sau must be;
// trạng từ sau went; danh từ chỉ người sau travel, young)
const HO_TU = { discover: { u: 7, ans: "discovery", cho: /\bThe ___ \(/ }, sustain: { u: 7, ans: "sustainable", cho: /\bmust be ___ \(/ },
  admire: { u: 7, ans: "admiration", cho: /\bwith ___ \(/ }, agency: { u: 8, ans: "agent", cho: /\bas a travel ___ \(/ },
  smooth: { u: 8, ans: "smoothly", cho: /\bwent ___ \(/ }, travel: { u: 8, ans: "travellers", cho: /\byoung ___ \(/ },
  translate: { u: 9, ans: "translation", cho: /\bmy ___ \(/ } };
fills.forEach((q) => {
  const goc = /___ \(([a-z]+)\)/.exec(q.q)[1], h = HO_TU[goc];
  assert.ok(h, "chưa có trong bảng họ từ: " + goc); assert.equal(h.u, unitOf(q), "từ của Unit " + h.u + ": " + ten.get(q));
  assert.ok(h.cho.test(q.q), "chỗ trống cần đúng từ loại của đáp án: " + ten.get(q));
  assert.equal(q.ans[0], h.ans, ten.get(q)); assert.ok(q.x.includes(goc + " → " + h.ans), "lời giải ghi họ từ: " + ten.get(q));
  daTinh.add(q); n++;
});
// câu từ vựng: đáp án là từ của Unit trong TU (mỗi từ đúng một câu); câu hỏi nghĩa của từ: từ trong đề và từ đồng nghĩa theo DONG_NGHIA
const TU = { 7: ["peak", "annual", "crazy", "paradise", "urgent", "ecosystem", "biodiversity"],
  8: ["itinerary", "homestay", "low season", "hunting for", "brochure", "souvenir", "package holiday", "worked out", "self-guided", "holidaymakers", "fixed", "wandered"],
  9: ["fluent", "immigrants", "picked up", "official languages", "native speaker", "bilingual", "varieties", "went over"] };
// dạng gốc để tìm trong sách (Glossary ghi dạng gốc)
const GOC = { "hunting for": "hunt", "worked out": "work out", holidaymakers: "holidaymaker", wandered: "wander", immigrants: "immigrant",
  "picked up": "pick up", "official languages": "official language", varieties: "variet", "went over": "go over", "native speaker": "native speaker" };
const DONG_NGHIA = { majestic: "magnificent", occur: "happen" };
const tuVung = kho.filter((q) => unitOf(q) && !daTinh.has(q));
tuVung.forEach((q) => {
  assert.ok(q.type === "mc" && q.lv <= 2, "câu chưa tính lại đáp án (chỉ câu từ vựng mức Biết, Hiểu được bỏ qua): " + ten.get(q));
  const hoi = /closest in meaning to “(\w+)”/.exec(q.q);
  if (hoi) { assert.equal(DONG_NGHIA[hoi[1]], q.o[0], "từ đồng nghĩa: " + ten.get(q)); return; }
  assert.equal(TU[unitOf(q)].filter((t) => q.o[0] === t).length, 1, "đáp án câu từ vựng là từ của Unit trong TU: " + ten.get(q));
});
Object.entries(TU).forEach(([u, ws]) => ws.forEach((t) => assert.equal(tuVung.filter((q) => unitOf(q) === +u && q.o[0] === t).length, 1, `từ “${t}” của Unit ${u}: đúng một câu`)));
assert.ok(kho.filter((q) => q.topic === "Pronunciation" || q.topic === "Reading" || daTinh.has(q) || tuVung.includes(q)).length === kho.length);
// câu ôn Units 1–6 không trùng đáp án câu nào của kho cuối kì I (Rút ra N25: trùng ý giữa các kho)
{
  const ck1 = bank("ta9-ck1-ngau-nhien").questions, da = (q) => String(q.type === "mc" ? q.o[0] : q.type === "fill" ? q.ans[0] : q.o.join(" ")).toLowerCase();
  const daCk1 = new Set(ck1.map(da));
  kho.filter((q) => q.topic === ON).forEach((q) => assert.ok(!daCk1.has(da(q)), "câu ôn trùng đáp án của kho cuối kì I: " + ten.get(q)));
  // đề bài, đáp án, lời giải của kho cuối kì I (lựa chọn sai không tính) chưa có các điểm này
  assert.ok(!ck1.some((q) => /\bpromise|\bhang(s)? out\b|\bever eaten\b|\bshooting star\b|___ to arrive/.test([q.q, q.x].concat(q.type === "mc" ? [q.o[0]] : q.o || [], q.ans || []).join(" "))), "kho cuối kì I đã hỏi điểm này");
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
   Như tests/ta9-ck1.js. Rút cùng lúc: khác chủ đề, cùng chủ đề khác mức, hoặc cùng ô mà ô rút từ 2 câu (Rút ra N25); câu của hai đoạn
   đọc khác nhau không bao giờ rút cùng lúc. Chữ cần dò của đáp án (lựa chọn đúng, đáp án điền), so cả từ theo gốc từ: đáp án một từ thì
   từ đó, từ ngữ pháp (NGU_PHAP: who, which, whose, if, must…) chỉ dò ở câu cùng chủ đề; đáp án 2–3 từ thì cả cụm; đáp án là câu thì các
   chuỗi 3 từ liền nhau không có ở lựa chọn sai nào. Đáp án câu Reading chỉ dò ở câu cùng đoạn; câu Pronunciation không dò (thấy từ ở câu
   khác không lộ cách đọc). Chữ của câu kia: đề bài, đáp án, lời giải, ý của câu đúng/sai, mảnh của câu sắp xếp, đoạn đọc (lựa chọn sai
   của câu trắc nghiệm không tính). Đáp án không lặp từ (trừ từ ngữ pháp) của chính đề bài câu có chỗ trống (Rút ra N12). */
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
  const a = cauCua("Mount Kilimanjaro is in Africa"), b = cauCua("How long did the science camp last?");
  const gia = Object.assign({}, b, { x: b.x + " We climbed to the peak of a hill." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => /: peak$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
  const c = cauCua("The driver ___ took us"), e = cauCua("Hotels and flights are much cheaper");
  const gia2 = Object.assign({}, e, { x: e.x + " Ask the woman who sells tickets." });
  assert.ok(doLo([c, gia2], (q) => q.topic).some((s) => /: who$/.test(s)), "bộ dò phải bắt được đáp án ngữ pháp ở câu cùng Unit");
  const f = cauCua("hotels in Ha Long are full of"), g = cauCua("Strong storms often occur");
  const gia3 = Object.assign({}, g, { x: "Many holidaymaker families come in summer." });
  assert.ok(doLo([f, gia3], (q) => q.topic).some((s) => /: holidaymaker$/.test(s)), "bộ dò phải bắt được dạng khác của đáp án (holidaymakers / holidaymaker)");
}

/* ---------- từ của sách, không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
// lời dặn chuẩn của đề Tiếng Anh (mục 3.2 của docs/KE-HOACH-NOI-DUNG.md) và lời dặn của câu phát âm, câu dạng từ, giống lời dặn của sách: không so
const LOI_DAN = ["Write the correct form of the word in brackets.", "Put the words in the correct order.", "Read the text. Then answer the questions.",
  "Read the text again. Is each sentence true or false?", "Which part of the sentence is wrong?", "Choose the sentence closest in meaning:",
  "Is each sentence grammatically correct?", "Choose the word with a different stress pattern.", "In which sentence can we leave out the relative pronoun?"];
const boLoiDan = (s) => LOI_DAN.reduce((a, l) => a.split(l).join(" "), String(s));
const truong = (q) => [boLoiDan(q.q), q.x].concat(q.o || [], q.ans || [], q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].text] : []);
if (SACH.length) {
  const f9 = SACH.find((f) => /lop-9[\\/]tieng-anh-9[\\/]/.test(f));
  assert.ok(f9, "OnUp-Book có Tiếng Anh 9");
  const raw = fs.readFileSync(f9, "utf8"), parts = raw.split(/=== page-\d+ · ([^=]+) ===/), trang = {};
  for (let i = 1; i < parts.length; i += 2) { const m = /trang in (\d+)/.exec(parts[i]); if (m) trang[+m[1]] = (trang[+m[1]] || "") + parts[i + 1]; }
  // tên Unit theo Contents (trang in 2)
  Object.entries(UNITS).forEach(([u, t]) => assert.ok(trang[2].toUpperCase().includes(`UNIT ${u}: ${t.toUpperCase()}`), `Contents ghi Unit ${u}: ${t}`));
  // trang của từng Unit: từ trang bắt đầu (Contents) đến trước Unit sau, cộng mục Unit đó của Glossary
  const BAT_DAU = { 2: 18, 3: 28, 7: 72, 8: 82, 9: 92, 10: 102 }, gl = raw.slice(raw.indexOf("GLOSSARY"));
  const mucGl = (u) => { const i = gl.search(new RegExp("\\nUnit " + u + "\\b")); return i < 0 ? "" : gl.slice(i, i + 4000); };
  const chuUnit = (u) => { let s = ""; for (let t = BAT_DAU[u]; t < BAT_DAU[u + 1]; t++) s += " " + (trang[t] || ""); return (s + " " + (u >= 7 ? mucGl(u) : "")).toLowerCase().replace(/\s+/g, " "); };
  // cụm động từ của bài nối tr. 94 (cột A: pick, go; cột B: up a new language, over the grammatical points): chữ OCR tách hai cột, mục
  // Unit 9 của Glossary (tr. 138, đã xem ảnh page-140) có “pick up”, “go over” mà chữ OCR mất; tìm hai nửa của cụm
  const TACH = { "pick up": ["pick", "up a new language"], "go over": ["go", "over the grammatical points"] };
  const coTrong = (c, t) => (TACH[t] ? TACH[t].every((x) => c.includes(x)) : c.includes(t));
  Object.entries(TU).forEach(([u, ws]) => { const c = chuUnit(+u); ws.forEach((t) => assert.ok(coTrong(c, GOC[t] || t), `từ “${GOC[t] || t}” không có trong trang của Unit ${u}`)); });
  Object.entries(HO_TU).forEach(([w, h]) => assert.ok(chuUnit(h.u).includes(w), `từ “${w}” (câu dạng từ) không có trong trang của Unit ${h.u}`));
  Object.keys(DONG_NGHIA).forEach((w) => assert.ok(chuUnit(7).includes(w), `từ “${w}” không có trong trang của Unit 7`));
  assert.ok(chuUnit(2).includes("hang out with"), "cụm động từ hang out with có trong trang của Unit 2");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book); tên Unit, từ của đáp án câu từ vựng, câu dạng từ có trong trang của Unit.");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && !/^ta9-gk2-/.test(b.id)).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + [q.q, q.x].concat(q.o || [], q.ans || [], q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn đọc, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn.");
console.log("TA9 GK2 OK");
