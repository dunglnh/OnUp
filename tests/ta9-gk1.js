// Kiểm tra ngân hàng Tiếng Anh 9 giữa kì I của Phiên N9-gk1-ta (data/banks/9-ta.js, ta9-gk1-*), theo mẫu tests/ta9-ck1.js, tests/ta9-gk2.js.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho
// lớp 9 (đoạn “Chung của các phiên lớp 9” của docs/KE-HOACH-NOI-DUNG.md).
// Tính lại đáp án bằng code (câu nhận ra bằng một đoạn chữ của đề, đúng một câu trong kho):
// - Pronunciation: phiên âm của từng lựa chọn ghi ở IPA (cách ghi Anh – Anh như Glossary của sách), âm hỏi phải là âm của Unit 1–3 trong
//   Book map (/æ/, /ɑː/, /e/; /aʊ/, /əʊ/, /eə/; /h/, /r/); đúng một lựa chọn có âm đó (h câm, mở đầu bằng /r/, khác âm), lời giải ghi
//   đúng phiên âm của đáp án; sáu câu Biết hỏi sáu nguyên âm của Unit 1, 2, mỗi âm một câu; mỗi câu một bộ từ riêng, không dùng lại từ
//   của câu Pronunciation nào trong data/banks/9-ta.js (đề “Ôn chủ đề” Pronunciation rút chung bốn kho Tiếng Anh 9; Rút ra N10);
// - từ để hỏi + to-infinitive (Unit 1): lựa chọn sau dấu hai chấm là người hay thời gian (who / when); câu đồng nghĩa: question word +
//   subject + should + verb → question word + to-infinitive, đúng một lựa chọn theo luật;
// - cụm động từ (Unit 1, 2) theo danh sách của sách và dạng của động từ; tín hiệu nghĩa trong đề bài chỉ ra đúng một cụm; câu tìm lỗi:
//   cụm sai không có trong danh sách, câu sửa trong lời giải dùng cụm đúng; câu điền: dạng ngôi thứ ba số ít theo chủ ngữ;
// - so sánh kép (Unit 2): đọc từng câu “The + so sánh …, the + so sánh …” theo bảng dạng so sánh của tính từ, trạng từ;
// - động từ khuyết thiếu trong câu điều kiện loại 1 (Unit 3): tín hiệu trong đề bài chỉ ra chức năng (bắt buộc, cho phép, khuyên không
//   nên), đúng một lựa chọn có chức năng đó; dạng của câu điều kiện loại 1: mệnh đề if ở hiện tại đơn, hoà hợp chủ ngữ, will + động từ
//   nguyên thể (câu điền, câu tìm lỗi, câu đúng/sai 4 ý xét bằng cùng luật);
// - dạng của từ (Unit 1–3): từ trong ngoặc và đáp án theo bảng họ từ, chỗ trống cần đúng từ loại của đáp án, lời giải ghi họ từ;
// - câu sắp xếp: mảnh đầu viết hoa, mảnh cuối có dấu chấm, các mảnh khác viết thường, lời giải ghi lại cả câu; câu tìm lỗi sai: các
//   lựa chọn là các phần của câu trong ngoặc; còn lại là câu từ vựng (từ của sách theo Unit, nghĩa của từ trong câu) và câu Reading.
// Rồi kiểm tra ma trận (hai đề cố định và câu riêng đều chia đúng ma trận, theo thứ tự chủ đề), tên chủ đề theo Contents của sách và
// đúng chữ của kho cuối kì I, Reading (mỗi đề và phần câu riêng một đoạn 4 câu mức 1-1-2-3, không dùng lại câu văn của đoạn đọc nào của
// các kho Tiếng Anh 9), dạng câu, đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba
// số câu nhiều lựa chọn, không lặp chữ của nhãn chủ đề, đề bài không trùng, note không nói đề chung của Sở (chỉ có ở kì cuối kì), rút
// thử nhiều lần (đúng ma trận, trọn đoạn, gặp đủ kho; đã làm hết một đề cố định thì không rút lại câu của đề đó) và dò lộ đáp án giữa các
// câu rút được cùng lúc như tests/ta9-gk2.js (mọi ô của Unit rút 2 câu, nên so cả hai câu cùng ô; DA_XEM).
// Đề “Ôn chủ đề” (Phiên UX14) rút 10 câu của một chủ đề từ mọi đề Tiếng Anh 9 có sẵn: Unit 1–3 chung với kho cuối kì I, Pronunciation
// và Reading chung với cả bốn kho. Đáp án không trùng đáp án câu cùng chủ đề của kho cuối kì I; dò lộ đáp án giữa mọi cặp câu cùng chủ đề
// có ít nhất một câu của kho này (cả câu của các đoạn đọc khác nhau; DA_XEM_CHU_DE); đề bài không gần trùng câu cùng chủ đề của các kho đó
// (cặp hai từ liền nhau chung, như tests/toan9-gk1.js).
// Có sách ở ../OnUp-Book (repo riêng tư): tên Unit theo Contents; từ của đáp án câu từ vựng, từ hỏi nghĩa, từ của câu dạng từ, cụm động từ
// có trong trang của đúng Unit (theo trang bắt đầu ở Contents, cộng Review 1 và trang Glossary của Units 1–3); mọi trường chữ (cả đoạn
// đọc; trừ lời dặn chuẩn, sách cũng dùng) không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm; DO_SACH=1 in
// chuỗi 6 từ). So thêm với mọi câu của các kho khác, cả câu riêng của các đề ngẫu nhiên: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/ta9-gk1.js → in TA9 GK1 OK.
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
const S = { de1: "ta9-gk1-de1", de2: "ta9-gk1-de2", pool: "ta9-gk1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 9); assert.equal(b.subject, "Tiếng Anh"); assert.equal(b.file, "9-ta.js");
  assert.ok(/Units 1–3/.test(b.note) && /No listening/.test(b.note), b.id + ": note ghi Units 1–3, không có câu nghe");
  assert.ok(!/Department of Education/.test(b.note), b.id + ": đề giữa kì không nói đề chung của Sở (chỉ có ở cuối kì I, cuối kì II)");
});
// gắn vào kì thi giữa kì I của khối 9
{
  const c = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), c);
  const e = c.window.ONTAP_SEED_EVENTS.find((x) => x.id === "gk1-l9");
  assert.ok(e && e.grades.includes(9), "có kì thi gk1-l9 của khối 9");
  Object.values(S).forEach((id) => assert.ok(e.banks.includes(id), id + " gắn vào gk1-l9"));
  assert.ok(/Tiếng Anh: Units 1–3\./.test(e.scope), "phạm vi của gk1-l9 ghi Tiếng Anh: Units 1–3");
}
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("ta9-gk1-", "") + "#" + (i + 1))));
const cauCua = (has) => { const m = kho.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };

/* ---------- tên chủ đề theo Contents của sách, như kho cuối kì I; ma trận ---------- */
const UNITS = { 1: "Local Community", 2: "City Life", 3: "Healthy Living for Teens" };
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
assert.deepEqual(TOPICS, ["Pronunciation"].concat(Object.entries(UNITS).map(([u, t]) => `Unit ${u} · ${t}`), ["Reading"]), "chủ đề: Pronunciation, Unit 1–3 theo Contents, Reading");
const CK1 = bank("ta9-ck1-ngau-nhien");
assert.ok(CK1 && CK1.pool, "có kho Tiếng Anh 9 cuối kì I");
TOPICS.forEach((t) => assert.ok(t in CK1.pool.matrix, `chủ đề “${t}” đúng chữ của kho cuối kì I (đề “Ôn chủ đề” rút chung)`));
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
// Reading: mỗi đề cố định và phần câu riêng một đoạn, 4 câu mức 1-1-2-3 đứng liền nhau; câu khác không có đoạn đọc
assert.ok(kho.filter((q) => q.topic === "Reading").every((q) => q.p) && kho.filter((q) => q.topic !== "Reading").every((q) => !q.p), "chỉ câu Reading có đoạn đọc");
[S.de1, S.de2, S.pool].forEach((id) => {
  const qs = kho.filter((q) => q.topic === "Reading" && q.src === id), ps = [...new Set(qs.map((q) => q.p))];
  assert.equal(ps.length, 1, id + ": đúng một đoạn đọc");
  assert.deepEqual(qs.map((q) => q.lv), [1, 1, 2, 3], id + ": đoạn 4 câu mức 1-1-2-3");
});
const goc = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
{
  // câu văn của đoạn đọc các kho Tiếng Anh 9 khác (không dùng lại ngữ liệu, như tests/van9-gk1.js)
  const cau = (t) => t.split(/\n|(?<=[.!?])\s+/).map(goc).filter((s) => s.length >= 12);
  const cu = new Set(BANKS.filter((b) => b.file === "9-ta.js" && !/^ta9-gk1-/.test(b.id)).flatMap((b) => Object.values(b.passages || {}).flatMap((x) => cau(x.text))));
  Object.entries(PSG).forEach(([id, ps]) => {
    assert.equal(kho.filter((q) => q.p === id).length, 4, "đoạn " + id + " có 4 câu");
    assert.equal(ps.title, "Read the text. Then answer the questions.", "lời dặn của đoạn " + id);
    const w = ps.text.split(/\s+/).length;
    assert.ok(w >= 120 && w <= 200, `đoạn ${id}: ${w} từ (bài đọc của đề THCS: khoảng 120–200 từ)`);
    cau(ps.text).forEach((s) => assert.ok(!cu.has(s), `đoạn ${id} dùng lại câu của đoạn đọc kho khác: ${s}`));
  });
}

/* ---------- dạng câu ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 4, "mỗi kho ít nhất 4 câu đúng/sai 4 ý");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai: " + ten.get(q)); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
assert.ok(kho.every((q) => ["mc", "tf4", "fill", "order"].includes(q.type)), "chỉ dùng trắc nghiệm, đúng/sai 4 ý, trả lời ngắn (điền), sắp xếp");
["fill", "order"].forEach((t) => assert.ok(kho.some((q) => q.type === t), "có câu dạng " + t));
const LOI = /^Which part of the sentence is wrong\?/, GAN = /^Choose the sentence closest in meaning:/, NGHIA = /^Choose the answer closest in meaning to “([^”]+)” in this sentence: “([^”]+)”$/;
assert.ok(kho.filter((q) => LOI.test(q.q)).length >= 3, "có câu tìm lỗi sai");
assert.ok(kho.filter((q) => GAN.test(q.q)).length >= 3, "có câu chọn câu đồng nghĩa (viết lại câu)");
// lời giải không nói “option A”, “the second sentence”: app xáo phương án
kho.forEach((q) => assert.ok(!/\b(option|answer|sentence|statement)s? [A-D]\b|\bthe (first|second|third|fourth|last) (option|answer|sentence|statement|one)\b/i.test(q.x), "lời giải nhắc vị trí: " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau; đáp án đúng là lựa chọn dài nhất hay ngắn
// nhất ở không quá một phần ba số câu nhiều lựa chọn (Phiên N9-ck1-lsdl-gdcd; tính cả khi bằng lựa chọn sai dài nhất, ngắn nhất)
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
// nhãn “môn · chủ đề” hiện trên câu: đáp án không lặp chữ của nhãn (Rút ra N6), ví dụ community ở Unit 1, city, life ở Unit 2
const nhan = (t) => t.toLowerCase().replace(/^unit \d+ · /, "").split(/[^a-z]+/).filter((w) => w.length > 3);
kho.filter((q) => q.type === "mc" || q.type === "fill").forEach((q) => {
  const da = String(q.type === "mc" ? q.o[0] : q.ans[0]).toLowerCase();
  nhan(q.topic).forEach((w) => assert.ok(!da.includes(w.replace(/s$/, "")), `đáp án lặp chữ “${w}” của nhãn chủ đề: ` + ten.get(q)));
});
// câu sắp xếp: mảnh đầu viết hoa, mảnh cuối có dấu chấm, các mảnh khác viết thường, lời giải ghi lại cả câu
kho.filter((q) => q.type === "order").forEach((q) => {
  assert.equal(q.q, "Put the words in the correct order.", "lời dặn câu sắp xếp: " + ten.get(q));
  assert.ok(q.o.length >= 4, "câu sắp xếp có ít nhất 4 mảnh: " + ten.get(q));
  assert.ok(/^[A-Z]/.test(q.o[0]) && q.o.slice(1).every((o) => /^[a-z]/.test(o)), "chỉ mảnh đầu viết hoa: " + ten.get(q));
  assert.ok(/\.$/.test(q.o[q.o.length - 1]) && q.o.slice(0, -1).every((o) => !/[.?!]$/.test(o)), "chỉ mảnh cuối có dấu chấm: " + ten.get(q));
  assert.ok(q.x.includes(q.o.join(" ")), "lời giải ghi lại cả câu: " + ten.get(q));
});
// câu tìm lỗi sai: các lựa chọn là các phần của câu trong ngoặc
const cauNgoac = (q) => /“([^”]+)”/.exec(q.q)[1];
kho.filter((q) => LOI.test(q.q)).forEach((q) => q.o.forEach((o) => assert.ok(cauNgoac(q).includes(o), `“${o}” không phải phần của câu: ` + ten.get(q))));
// câu điền: dạng của động từ hay dạng của từ, từ trong ngoặc ngay sau chỗ trống
const fills = kho.filter((q) => q.type === "fill");
fills.forEach((q) => {
  assert.ok(/^Write the correct form of the (verb|word) in brackets\. /.test(q.q), "lời dặn câu điền: " + ten.get(q));
  assert.ok(/___ \([a-z ]+\)/.test(q.q), "từ trong ngoặc ngay sau chỗ trống: " + ten.get(q));
  assert.equal(q.ans.length, 1, "một đáp án: " + ten.get(q));
});

/* ---------- Pronunciation: tính lại đáp án theo phiên âm ---------- */
// Âm trong Book map (tr. 4–5): Unit 1 /æ/, /ɑː/, /e/; Unit 2 /aʊ/, /əʊ/, /eə/; Unit 3 /h/, /r/.
const AM = ["æ", "ɑː", "e", "aʊ", "əʊ", "eə", "h", "r"];
const IPA = { lamp: "læmp", calm: "kɑːm", lend: "lend", learn: "lɜːn", shout: "ʃaʊt", show: "ʃəʊ", share: "ʃeə", shoe: "ʃuː",
  exhibition: "eksɪbɪʃn", behind: "bɪhaɪnd", household: "haʊshəʊld", unhappy: "ʌnhæpi",
  friend: "frend", field: "fiːld", fruit: "fruːt", fry: "fraɪ", though: "ðəʊ", through: "θruː", thought: "θɔːt", thousand: "θaʊznd",
  wrong: "rɒŋ", worry: "wʌri", warm: "wɔːm", window: "wɪndəʊ",
  heart: "hɑːt", heard: "hɜːd", hear: "hɪə", health: "helθ", pear: "peə", pearl: "pɜːl", peer: "pɪə", peach: "piːtʃ",
  pack: "pæk", car: "kɑː", farm: "fɑːm", starts: "stɑːts" };
// nguyên âm của một phiên âm (nguyên âm đôi trước, rồi nguyên âm dài, nguyên âm ngắn)
const NGUYEN_AM = /aɪ|aʊ|eɪ|eə|ɪə|əʊ|ɔɪ|ʊə|ɑː|ɜː|iː|uː|ɔː|[æeɪiɒʌʊəu]/g;
const PRON = kho.filter((q) => q.topic === "Pronunciation");
let n = 0;
PRON.forEach((q) => {
  assert.equal(q.type, "mc");
  q.o.forEach((o) => assert.ok(IPA[o], "chưa có phiên âm của “" + o + "”: " + ten.get(q)));
  const ph = q.o.map((o) => IPA[o]);
  let dung, am;
  const coAm = /^Which word has the sound \/([^/]+)\/\?$/.exec(q.q), dau = /^Which word begins with the sound \/([^/]+)\/\?$/.exec(q.q);
  if (coAm) { am = coAm[1]; dung = q.o.filter((o, i) => (ph[i].match(NGUYEN_AM) || []).concat(ph[i].split("")).includes(am)); }
  else if (dau) { am = dau[1]; dung = q.o.filter((o, i) => ph[i].startsWith(am)); }
  else if (q.q === "In which word is the letter h NOT pronounced?") {
    am = "h";
    // chữ h không đứng trong sh, ch, th, ph, gh, wh (chữ đó đọc thành âm khác)
    q.o.forEach((o) => assert.ok(/h/.test(o.replace(/[sctpgw]h/g, "")), `“${o}” cần có chữ h đứng riêng: ` + ten.get(q)));
    dung = q.o.filter((o, i) => !ph[i].includes("h"));
  } else if (q.q === "Which word has a different vowel sound?") {
    const v = ph.map((x) => x.match(NGUYEN_AM).join(""));
    assert.ok(ph.every((x) => x.match(NGUYEN_AM).length === 1), "từ một âm tiết: " + ten.get(q));
    v.forEach((a) => assert.ok(AM.includes(a), `âm /${a}/ không có trong Book map Unit 1–3: ` + ten.get(q)));
    dung = q.o.filter((o, i) => v.filter((x) => x === v[i]).length === 1);
    am = v[q.o.indexOf(dung[0])];
  } else assert.fail("câu Pronunciation chưa có cách tính: " + ten.get(q));
  assert.ok(AM.includes(am), `âm /${am}/ không có trong Book map Unit 1–3: ` + ten.get(q));
  assert.deepEqual(dung, [q.o[0]], "đáp án tính lại khác: " + ten.get(q) + " → " + dung.join(", "));
  assert.ok(q.x.replace(/[ˈˌ]/g, "").includes("/" + IPA[q.o[0]] + "/"), "lời giải ghi phiên âm của đáp án: " + ten.get(q));
  n++;
});
// sáu câu Biết hỏi sáu nguyên âm của Unit 1, 2 (mỗi âm một câu); ba câu Hiểu: h câm, /r/, khác âm
assert.deepEqual(PRON.filter((q) => q.lv === 1).map((q) => /\/([^/]+)\//.exec(q.q)[1]).sort(), ["aʊ", "eə", "e", "æ", "ɑː", "əʊ"].sort(), "câu Biết hỏi sáu nguyên âm của Unit 1, 2");
assert.deepEqual(PRON.filter((q) => q.lv === 2).map((q) => q.q).sort(), ["In which word is the letter h NOT pronounced?", "Which word begins with the sound /r/?", "Which word has a different vowel sound?"].sort(), "câu Hiểu: h câm, /r/, khác âm");
// mỗi câu một bộ từ riêng; không dùng lại từ của câu Pronunciation nào khác trong data/banks/9-ta.js (lựa chọn, lời giải)
{
  const tuPA = new Map();
  PRON.forEach((q) => q.o.forEach((o) => { assert.ok(!tuPA.has(o), `từ “${o}” đã có ở câu Pronunciation khác: ` + ten.get(q)); tuPA.set(o, q); }));
  const khac = BANKS.filter((b) => b.file === "9-ta.js" && !/^ta9-gk1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => q.topic === "Pronunciation" && (!b.pool || q.src === b.id)));
  // từ của các lựa chọn và từ có phiên âm đi kèm trong lời giải (“Hour has /aʊə/”, “In island /ˈaɪlənd/”)
  const chu = " " + khac.map((q) => q.o.join(" ") + " " + (q.x.match(/[A-Za-z']+(?= \/)/g) || []).join(" ")).join(" ").toLowerCase() + " ";
  tuPA.forEach((q, o) => assert.ok(!chu.includes(" " + o + " "), `từ “${o}” đã có ở câu Pronunciation của kho Tiếng Anh 9 khác: ` + ten.get(q)));
}

/* ---------- ngữ pháp: tính lại đáp án ---------- */
const coCum = (s, c) => (" " + s.toLowerCase().replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ") + " ").includes(" " + c.toLowerCase() + " ");
// động từ ngôi thứ ba số ít, quá khứ, V-ing
const ba = (v) => (/(s|sh|ch|x|o)$/.test(v) ? v + "es" : /[^aeiou]y$/.test(v) ? v.slice(0, -1) + "ies" : v + "s");
const QUA_KHU = { come: "came", get: "got", hang: "hung", run: "ran", go: "went", take: "took", find: "found", cut: "cut", throw: "threw" };
const dangDT = (v) => [v, ba(v), QUA_KHU[v] || (/[^aeiou]y$/.test(v) ? v.slice(0, -1) + "ied" : v.replace(/e$/, "") + "ed"), v.replace(/e$/, "") + "ing"];
// cụm động từ của sách: Unit 1 (A Closer Look 2, Looking Back), Unit 2 (A Closer Look 2, Looking Back)
const PV = { 1: ["go out", "pass down", "cut down on", "run out of", "come back", "hand down", "find out", "take care of", "get on with", "look around"],
  2: ["get around", "carry out", "come down with", "hang out with", "cut down on", "throw away"] };
const cumDT = (s, u) => PV[u].filter((pv) => { const [v, ...r] = pv.split(" "); return dangDT(v).some((d) => coCum(s, [d].concat(r).join(" "))); });
// tín hiệu nghĩa trong đề bài: đúng một cụm động từ hợp
const NGHIA_PV = { "get on with": /\bfriendly to each other\b/, "hang out with": /\b(classmates|friends)\b/, "cut down on": /\btrying to ___ plastic bags\b/,
  "throw away": /\bleftovers\b/, "come down with": /\b(fever|cold|flu)\b/, "get around": /\b(buses|metro)\b/, "carry out": /\b(survey|project)\b/ };
// so sánh kép: The + so sánh …, the + so sánh … (Unit 2)
const SS = { old: "older", dangerous: "more dangerous", big: "bigger", heavy: "heavier", high: "higher", good: "better" };
const SS_DUNG = new Set(Object.values(SS));
const soSanh = (w, i) => (w[i] === "more" ? "more " + w[i + 1] : w[i]);
const soSanhKep = (s) => {
  const [a, b] = s.replace(/[.]$/, "").split(", ");
  if (!b) return false;
  const x = a.split(" "), y = b.split(" ");
  return x[0] === "The" && y[0] === "the" && [soSanh(x, 1), soSanh(y, 1)].every((c) => SS_DUNG.has(c));
};
// từ để hỏi + to-infinitive (Unit 1): hai lựa chọn sau dấu hai chấm là người (who) hay thời gian (when)
const NGUOI = /\b(postman|guard|teacher|cousin|neighbour|doctor)\b/, THOI_GIAN = /\b(Monday|Saturday|Sunday|morning|evening|tomorrow)\b/;
const tuHoi = (s) => { const m = /: (.+) or (.+)\.$/.exec(s); assert.ok(m, "lựa chọn sau dấu hai chấm: " + s); return [m[1], m[2]].every((x) => NGUOI.test(x)) ? "who" : [m[1], m[2]].every((x) => THOI_GIAN.test(x)) ? "when" : null; };
const TU_HOI = /\b(which \w+|who|what|where|when|how)\b/;
// động từ khuyết thiếu trong câu điều kiện loại 1 (Unit 3): chức năng theo tín hiệu trong đề bài
const KHUYET = { must: "bắt buộc", may: "cho phép", "shouldn't": "khuyên không nên", "might not": "có thể không xảy ra", "mustn't": "cấm", "are able to": "khả năng" };
// câu điều kiện loại 1: If + chủ ngữ + hiện tại đơn (hoà hợp với chủ ngữ), chủ ngữ + will + động từ nguyên thể
const SO_NHIEU = ["I", "you", "we", "they", "You", "We", "They"];
const dieuKien = (s) => {
  const m = /^If (\w+) (.+?), (\w+) will (\w+)\b/.exec(s);
  if (!m) return false;
  const [, cn, menhDe, , dt] = m, dtIf = menhDe.split(" ")[0];
  if (/\b(will|won't)\b/.test(menhDe) || /(s|ed|ing)$/.test(dt)) return false;
  if (/^(doesn't|don't)$/.test(dtIf)) return dtIf === (SO_NHIEU.includes(cn) ? "don't" : "doesn't");
  return SO_NHIEU.includes(cn) ? !/s$/.test(dtIf) : /s$/.test(dtIf);
};
const CHECKS = [
  // Unit 1: từ để hỏi + to-infinitive
  ...["we can't decide ___ to invite", "haven't decided ___ to hold it"].map((has) => ({ has, right: (q) => {
    assert.ok(q.o.every((o) => ["who", "what", "where", "when", "how"].includes(o)), "lựa chọn là từ để hỏi");
    const d = tuHoi(q.q); assert.ok(d && q.x.includes(d + " + to-infinitive"), "lời giải ghi " + d + " + to-infinitive"); return d;
  } })),
  { has: "which bus I should take", right: (q) => {
    const m = /^(.*\b(?:which \w+|who|what|where|when|how)) (?:I|we|you|he|she|they) should (\w+)(.*)$/.exec(cauNgoac(q));
    assert.ok(m, "câu gốc: từ để hỏi + chủ ngữ + should + động từ"); const want = m[1] + " to " + m[2] + m[3];
    const d = q.o.filter((o) => new RegExp(TU_HOI.source + " to (?!\\w+ing\\b)[a-z]+\\b").test(o) && !new RegExp(TU_HOI.source + " (I|we|you|he|she|they)\\b").test(o));
    assert.deepEqual(d, [want], "đúng một lựa chọn: từ để hỏi + to-infinitive"); return want;
  } },
  // Unit 1: cụm động từ
  { has: "find off more about", right: (q) => {
    const c = cauNgoac(q), sai = q.o.find((o) => /^\w+ \w+$/.test(o) && c.includes(o) && !cumDT(o, 1).length && PV[1].some((pv) => pv.startsWith(o.split(" ")[0] + " ")));
    assert.ok(sai, "phần sai là cụm động từ viết sai"); const sua = c.replace(sai, "find out");
    assert.deepEqual(cumDT(sua, 1), ["find out"]); assert.ok(q.x.includes(sua), "lời giải ghi câu đã sửa"); return sai;
  } },
  { has: "are friendly to each other and never argue", right: (q) => {
    q.o.forEach((o) => assert.equal(cumDT(o, 1).length, 1, "mỗi lựa chọn một cụm động từ của Unit 1: " + o));
    const d = q.o.filter((o) => NGHIA_PV[cumDT(o, 1)[0]] && NGHIA_PV[cumDT(o, 1)[0]].test(q.q)); assert.equal(d.length, 1, "đúng một cụm hợp nghĩa"); return d[0];
  } },
  { has: "he only ___ (come back)", right: (q) => { assert.ok(PV[1].includes("come back") && /\bhe only ___/.test(q.q), "chủ ngữ he"); return ba("come") + " back"; } },
  // Unit 2: cụm động từ, mỗi lựa chọn một cụm của Unit 2, đúng một cụm có tín hiệu nghĩa trong đề bài
  ...["Lan likes to ___ her friends", "trying to ___ plastic bags", "don't ___ the leftovers"].map((has) => ({ has, right: (q) => {
    const d = q.o.filter((o) => { const pv = cumDT(o, 2); assert.equal(pv.length, 1, "mỗi lựa chọn một cụm động từ của Unit 2: " + o); return NGHIA_PV[pv[0]].test(q.q); });
    assert.equal(d.length, 1, "đúng một cụm động từ hợp nghĩa"); return d[0];
  } })),
  // Unit 2: so sánh kép
  { has: "the most dangerous it becomes", right: (q) => {
    const c = cauNgoac(q), sua = c.replace("the most dangerous", "the " + SS.dangerous);
    assert.ok(!soSanhKep(c) && soSanhKep(sua) && q.x.includes(sua), "câu gốc sai, câu sửa đúng luật so sánh kép");
    return q.o.find((o) => /^the most \w+$/.test(o));
  } },
  { has: "When a town grows bigger", right: (q) => { const d = q.o.filter(soSanhKep); assert.equal(d.length, 1, "đúng một câu so sánh kép đúng"); assert.ok(/\bbigger\b/.test(d[0]) && /\bheavier\b/.test(d[0]), "giữ nghĩa của câu gốc"); return d[0]; } },
  { has: "", order: "The higher", right: (q) => { assert.ok(soSanhKep(q.o.join(" ")), "câu sắp xếp đúng luật so sánh kép"); return null; } },
  // Unit 3: động từ khuyết thiếu trong câu điều kiện loại 1
  ...[["swimming team", /There is no other way/, "bắt buộc"], ["finish your test early", /said it was OK/, "cho phép"], ["sleep well tonight", /It will keep you awake/, "khuyên không nên"]].map(([has, tinHieu, cn]) => ({ has, right: (q) => {
    assert.ok(tinHieu.test(q.q) && /^If you /.test(q.q), "câu điều kiện loại 1 có tín hiệu của chức năng " + cn);
    q.o.forEach((o) => assert.ok(KHUYET[o], "lựa chọn không có trong bảng chức năng: " + o));
    const d = q.o.filter((o) => KHUYET[o] === cn); assert.equal(d.length, 1); return d[0];
  } })),
  // Unit 3: dạng của câu điều kiện loại 1
  { has: "If Tuan ___ (go)", right: (q) => { const v = /___ \((\w+)\)/.exec(q.q)[1], dt = ba(v); assert.ok(dieuKien(q.q.split(". ").slice(1).join(". ").replace("___ (go)", dt))); return dt; } },
  { has: "If Mai don't get enough sleep", right: (q) => {
    const c = cauNgoac(q), sua = c.replace("don't", "doesn't");
    assert.ok(!dieuKien(c) && dieuKien(sua) && q.x.includes(sua), "câu gốc sai, câu sửa đúng luật câu điều kiện loại 1");
    return q.o.find((o) => /\bdon't\b/.test(o));
  } },
  { has: "Is each sentence grammatically correct?", right: (q) => q.o.map(dieuKien) }
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
// dạng của từ: từ trong ngoặc → đáp án theo bảng họ từ; chỗ trống cần đúng từ loại (động từ sau will; tính từ trước danh từ, sau being,
// very, stayed; danh từ sau the biggest, reduce, trước centre; trạng từ sau động từ dress)
const HO_TU = { short: { u: 1, ans: "shorten", loai: "verb", cho: /\bwill ___ \(/ }, origin: { u: 1, ans: "original", loai: "adjective", cho: /\bthe ___ \(origin\) plan\b/ },
  attract: { u: 1, ans: "attraction", loai: "noun", cho: /\bthe biggest ___ \(/ }, rely: { u: 2, ans: "reliable", loai: "adjective", cho: /\bbeing ___ \(/ },
  entertain: { u: 2, ans: "entertainment", loai: "noun", cho: /\bThe new ___ \(entertain\) centre\b/ }, convenience: { u: 2, ans: "convenient", loai: "adjective", cho: /\bvery ___ \(/ },
  anxious: { u: 3, ans: "anxiety", loai: "noun", cho: /\breduce ___ \(/ }, optimism: { u: 3, ans: "optimistic", loai: "adjective", cho: /\bstayed ___ \(/ },
  appropriate: { u: 3, ans: "appropriately", loai: "adverb", cho: /\bdress ___ \(/ } };
fills.filter((q) => /the word in brackets/.test(q.q)).forEach((q) => {
  const w = /___ \(([a-z]+)\)/.exec(q.q)[1], h = HO_TU[w];
  assert.ok(h, "chưa có trong bảng họ từ: " + w); assert.equal(h.u, unitOf(q), "từ của Unit " + h.u + ": " + ten.get(q));
  assert.ok(h.cho.test(q.q), "chỗ trống cần đúng từ loại của đáp án: " + ten.get(q));
  assert.equal(q.ans[0], h.ans, ten.get(q)); assert.ok(q.x.toLowerCase().includes(`${w} (`) && q.x.includes(`→ ${h.ans} (${h.loai})`), "lời giải ghi họ từ, từ loại: " + ten.get(q));
  assert.ok(!daTinh.has(q)); daTinh.add(q); n++;
});
// mỗi Unit, mỗi đề (và phần câu riêng): ô Vận dụng có một câu dạng của từ
[S.de1, S.de2, S.pool].forEach((id) => [1, 2, 3].forEach((u) => assert.equal(kho.filter((q) => q.src === id && unitOf(q) === u && q.lv === 3 && /the word in brackets/.test(q.q)).length, 1, `${id}, Unit ${u}: một câu dạng của từ ở ô Vận dụng`)));
// câu từ vựng: đáp án là từ của Unit trong TU (mỗi từ đúng một câu, mức Biết); câu hỏi nghĩa của từ trong câu (mức Hiểu): từ trong đề có
// trong câu được dẫn, đáp án theo NGHIA_TU
const TU = { 1: ["electricians", "pottery", "police officer", "suburb", "garbage collector", "speciality"],
  2: ["tram", "pricey", "construction site", "itchy", "rush hour", "commuters"],
  3: ["additional", "mood", "distractions", "physical", "stressed out", "well-balanced"] };
const NGHIA_TU = { 1: { function: "purpose", facilities: "useful places and things", fragrance: "a nice smell" },
  2: { bustling: "busy and lively", "public amenities": "a family's car", congested: "crowded with traffic" },
  3: { accomplished: "achieved", delays: "leaves until later", "gives priority to": "works on it first" } };
// dạng gốc để tìm trong sách
const GOC = { electricians: "electrician", distractions: "distraction", commuters: "commuter", accomplished: "accomplish", delays: "delay", "gives priority to": "priority" };
const tuVung = kho.filter((q) => unitOf(q) && !daTinh.has(q));
tuVung.forEach((q) => {
  assert.equal(q.type, "mc", "câu chưa tính lại đáp án (chỉ câu từ vựng được bỏ qua): " + ten.get(q));
  const h = NGHIA.exec(q.q) || /^Which of these is NOT one of the (public amenities) of a town\?$/.exec(q.q);
  if (h) {
    assert.equal(q.lv, 2, "câu hỏi nghĩa của từ ở mức Hiểu: " + ten.get(q));
    assert.ok(!h[2] || h[2].includes(h[1]), "từ hỏi có trong câu được dẫn: " + ten.get(q));
    assert.equal(NGHIA_TU[unitOf(q)][h[1]], q.o[0], "nghĩa của từ: " + ten.get(q)); return;
  }
  assert.equal(q.lv, 1, "câu từ vựng mức Biết: " + ten.get(q));
  assert.equal(TU[unitOf(q)].filter((t) => q.o[0] === t).length, 1, "đáp án câu từ vựng là từ của Unit trong TU: " + ten.get(q));
});
Object.entries(TU).forEach(([u, ws]) => ws.forEach((t) => assert.equal(tuVung.filter((q) => unitOf(q) === +u && q.o[0] === t).length, 1, `từ “${t}” của Unit ${u}: đúng một câu`)));
Object.entries(NGHIA_TU).forEach(([u, m]) => Object.keys(m).forEach((t) => assert.equal(tuVung.filter((q) => unitOf(q) === +u && (q.q.includes("“" + t + "”") || q.q.includes(" " + t + " of a town"))).length, 1, `từ hỏi nghĩa “${t}” của Unit ${u}: đúng một câu`)));
assert.ok(kho.filter((q) => q.topic === "Pronunciation" || q.topic === "Reading" || daTinh.has(q) || tuVung.includes(q)).length === kho.length);
// mỗi Unit, mỗi đề: ô Hiểu một câu ngữ pháp và một câu nghĩa của từ; ô Vận dụng một câu ngữ pháp và một câu dạng của từ; ô Biết hai câu từ vựng
[S.de1, S.de2, S.pool].forEach((id) => [1, 2, 3].forEach((u) => {
  const qs = kho.filter((q) => q.src === id && unitOf(q) === u), ngp = (q) => daTinh.has(q) && !/the word in brackets/.test(q.q);
  assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.lv === l && ngp(q)).length), [0, 1, 1], `${id}, Unit ${u}: một câu ngữ pháp ở ô Hiểu, một ở ô Vận dụng`);
}));

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
   Như tests/ta9-gk2.js. Rút cùng lúc: khác chủ đề, cùng chủ đề khác mức, hoặc cùng ô mà ô rút từ 2 câu (Rút ra N25; mọi ô của Unit 1–3 rút
   2 câu); câu của hai đoạn đọc khác nhau không bao giờ rút cùng lúc. Chữ cần dò của đáp án (lựa chọn đúng, đáp án điền), so cả từ theo gốc
   từ: đáp án một từ thì từ đó, từ ngữ pháp (NGU_PHAP: who, when, must, may…) chỉ dò ở câu cùng chủ đề; đáp án 2–3 từ thì cả cụm; đáp án là
   câu thì các chuỗi 3 từ liền nhau không có ở lựa chọn sai nào. Đáp án câu Reading chỉ dò ở câu cùng đoạn; câu Pronunciation không dò
   (thấy từ ở câu khác không lộ cách đọc). Chữ của câu kia: đề bài, đáp án, lời giải, ý của câu đúng/sai, mảnh của câu sắp xếp, đoạn đọc
   (lựa chọn sai của câu trắc nghiệm không tính). Đáp án không lặp từ (trừ từ ngữ pháp) của chính đề bài câu có chỗ trống (Rút ra N12). */
const NGU_PHAP = new Set(("a an the of to in on at for from with by about and or but so than as if when while because before after " +
  "is are was were be been am have has had do does did will would can could should must might may not no i you he she it we they me " +
  "him her us them my your his its our their this that these those there here what where who whose how which why yet since ago already " +
  "ever never just very too more most all some any one every each other also up out down off around away into over whether").split(" "));
const tu = (s) => String(s).toLowerCase().replace(/[^a-z' ]+/g, " ").split(/\s+/).filter(Boolean).map((w) => w.replace(/'s$/, ""));
const goc1 = (w) => { w = w.replace(/ies$/, "y"); const d = ["ing", "ed", "es", "s", "e"].find((x) => w.endsWith(x) && w.length - x.length >= 4 && !/ss$/.test(w)); return d ? w.slice(0, -d.length) : w; };
const noi = (s) => " " + tu(s).map(goc1).join(" ") + " ";
const chuCua = (q, doan) => [q.q, q.x].concat(q.type === "mc" ? [q.o[0]] : q.o || [], q.ans || [], doan ? [doan.text] : []);
const cungLuc = (a, b) => a !== b && !(a.p && b.p && a.p !== b.p) && (a.topic !== b.topic || a.lv !== b.lv || M[a.topic][a.lv - 1] >= 2);
// cungLucFn: hai câu rút được cùng lúc; doanCua: đoạn đọc của câu; caDoan: đáp án Reading dò cả câu của đoạn khác (đề “Ôn chủ đề”)
const doLo = (qs, tenCau, cungLucFn = cungLuc, doanCua = (q) => PSG[q.p], caDoan = false) => {
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
      if (!cungLucFn(q, p2) || (nguPhap && q.topic !== p2.topic) || (!caDoan && q.topic === "Reading" && p2.p !== q.p)) return;
      const T = chuCua(p2, p2.p && p2.p !== q.p ? doanCua(p2) : null).map(noi).join("|");
      can.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
    });
  });
  return [...new Set(ra)];
};
const lo = doLo(kho, (q) => ten.get(q));
// đáp án câu điền không có ở lựa chọn (cả lựa chọn sai) của câu rút được cùng lúc: học sinh chép được chữ đúng (Phiên N9-gk1-ta)
fills.forEach((q) => { const a = noi(q.ans[0]); kho.filter((o) => cungLuc(q, o) && o.o).forEach((o) => o.o.forEach((x) => assert.ok(!noi(x).includes(a), `lựa chọn “${x}” của ${ten.get(o)} có đáp án câu điền ${ten.get(q)}`))); });
if (process.env.DO_LO) console.log("Đáp án có ở câu rút được cùng lúc (xem tay):\n" + lo.join("\n"));
const DA_XEM = [];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = cauCua("its main function is to keep water cool"), b = cauCua("How long did the bus trip to school often take?");
  const gia = Object.assign({}, b, { x: b.x + " The purpose of the new line is to save time." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => /: purpos$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
  const c = cauCua("swimming team"), e = cauCua("Kim got a high mark");
  const gia2 = Object.assign({}, e, { x: e.x + " You must be very happy." });
  assert.ok(doLo([c, gia2], (q) => q.topic).some((s) => /: must$/.test(s)), "bộ dò phải bắt được đáp án ngữ pháp ở câu cùng Unit");
  const f = cauCua("thousands of ___ travel into the centre"), g = cauCua("Lan has three tests");
  const gia3 = Object.assign({}, g, { x: "Many a commuter feels stressed out." });
  assert.ok(doLo([f, gia3], (q) => q.topic).some((s) => /: commuter$/.test(s)), "bộ dò phải bắt được dạng khác của đáp án (commuters / commuter)");
}

/* ---------- đề “Ôn chủ đề”: câu cùng chủ đề của các kho Tiếng Anh 9 khác ----------
   Đề “Ôn chủ đề” (Phiên UX14) rút 10 câu của một chủ đề từ mọi đề Tiếng Anh 9 có sẵn: Unit 1–3 chung với kho cuối kì I; Pronunciation,
   Reading chung với cả bốn kho (đoạn đọc nào cũng có thể rút cùng nhau). Đáp án không trùng đáp án câu cùng chủ đề của kho cuối kì I; dò lộ
   như trên giữa mọi cặp câu cùng chủ đề có ít nhất một câu của kho này (cả câu của các đoạn khác nhau); chỗ đã xem ghi ở DA_XEM_CHU_DE.
   Đề bài không gần trùng câu cùng chủ đề của các kho đó. */
const khoKhac = BANKS.filter((b) => b.file === "9-ta.js" && !/^ta9-gk1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ q, b })));
const ten1 = new Map(), PSG_KHAC = new Map();
khoKhac.forEach(({ q, b }) => { ten1.set(q, b.id.replace("ta9-", "") + "#" + (b.questions.filter((x) => !b.pool || x.src === b.id).indexOf(q) + 1)); if (q.p) PSG_KHAC.set(q, b.passages[q.p]); });
const cungCD = khoKhac.map((x) => x.q).filter((q) => TOPICS.includes(q.topic));
TOPICS.filter((t) => /^Unit /.test(t)).forEach((t) => assert.ok(cungCD.filter((q) => q.topic === t).every((q) => ten1.get(q).startsWith("ck1-")), `chủ đề ${t} chỉ chung với kho cuối kì I`));
{
  const daAn = (q) => (q.type === "mc" ? q.o[0] : q.type === "fill" ? q.ans[0] : null);
  kho.forEach((q) => { const a = daAn(q); if (a === null) return; cungCD.filter((o) => o.topic === q.topic && ten1.get(o).startsWith("ck1-") && goc(daAn(o) || "") === goc(a)).forEach((o) => assert.fail(`${ten.get(q)} trùng đáp án “${a}” với ${ten1.get(o)}`)); });
}
const tenCD = (q) => ten.get(q) || ten1.get(q);
const loCD = TOPICS.flatMap((t) => doLo(kho.concat(cungCD).filter((q) => q.topic === t), tenCD, (a, b) => a !== b && (ten.has(a) || ten.has(b)),
  (q) => (ten.has(q) ? PSG[q.p] : PSG_KHAC.get(q)), true)).filter((s) => !lo.includes(s));
if (process.env.DO_LO) console.log("Đáp án có ở câu cùng chủ đề rút chung ở đề “Ôn chủ đề” (xem tay):\n" + loCD.join("\n"));
// đã xem (Phiên N9-gk1-ta): từ ngữ pháp có ở câu của kho cuối kì I với nghĩa khác, không chỉ ra đáp án: who là đại từ quan hệ trong lời
// giải câu artisans; when là liên từ (When the kitchen …, … when his parents are at work); must trong lời giải định nghĩa deadline
const DA_XEM_CHU_DE = ["ck1-de2#3 → de1#6: who", "ck1-de1#3 → de2#6: when", "ck1-de1#5 → de2#6: when", "ck1-de1#9 → de1#18: must"];
assert.deepEqual(loCD, DA_XEM_CHU_DE, "đáp án có ở câu cùng chủ đề đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM_CHU_DE");
// gần trùng (Rút ra N25; như tests/toan9-gk1.js): đề bài cùng lựa chọn, mảnh sắp xếp có từ 4 cặp hai từ liền nhau chung với một câu cùng
// chủ đề của kho khác và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính lời dặn chuẩn, cặp của nhãn chủ đề và cặp
// có ở từ 3% số câu của data/banks/9-ta.js.
const LOI_DAN = ["Write the correct form of the verb in brackets.", "Write the correct form of the word in brackets.", "Put the words in the correct order.",
  "Read the text. Then answer the questions.", "Read the text again. Is each sentence true or false?", "Which part of the sentence is wrong?",
  "Choose the sentence closest in meaning:", "Is each sentence grammatically correct?", "What is the main idea of the text?",
  "Which word has a different vowel sound?", "In which word is the letter h NOT pronounced?"];
const boLoiDan = (s) => LOI_DAN.concat(["Choose the answer closest in meaning to", "in this sentence:", "Which word has the sound", "Which word begins with the sound"]).reduce((a, l) => a.split(l).join(" | "), String(s));
{
  const cap2 = (s) => { const w = boLoiDan(s).toLowerCase().replace(/[^a-z'|]+/g, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const tatCa = kho.concat(khoKhac.map((x) => x.q)), df = {};
  tatCa.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capCua = (q) => { const nh = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nh.has(c) && (df[c] || 0) < 0.03 * tatCa.length)); };
  const gan = kho.flatMap((q) => { const c = capCua(q); return cungCD.filter((o) => o.topic === q.topic).map((o) => { const d = capCua(o), chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${ten1.get(o)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  assert.deepEqual(gan, [], "đề bài gần trùng câu cùng chủ đề của kho khác");
}

/* ---------- từ của sách, không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const tuKD = (s) => khongDau(s).split(" ").filter(Boolean);
const chuoi = (s, k) => { const w = tuKD(s), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
// tập các chuỗi k từ của một khối chữ (Phiên N9-ck1-lsdl-gdcd)
const boChuoi = (texts, k) => { const set = new Set(); texts.forEach((t) => { const w = tuKD(t); for (let i = 0; i + k <= w.length; i++) set.add(w.slice(i, i + k).join(" ")); }); return set; };
const truong = (q) => [boLoiDan(q.q), q.x].concat(q.o || [], q.ans || [], q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].text] : []);
if (SACH.length) {
  const f9 = SACH.find((f) => /lop-9[\\/]tieng-anh-9[\\/]/.test(f));
  assert.ok(f9, "OnUp-Book có Tiếng Anh 9");
  const raw = fs.readFileSync(f9, "utf8"), parts = raw.split(/=== page-\d+ · ([^=]+) ===/), trang = {};
  for (let i = 1; i < parts.length; i += 2) { const m = /trang in (\d+)/.exec(parts[i]); if (m) trang[+m[1]] = (trang[+m[1]] || "") + parts[i + 1]; }
  // trang của từng Unit (Contents: Unit 1 tr. 8, Unit 2 tr. 18, Unit 3 tr. 28, Review 1 tr. 38, Unit 4 tr. 40), cộng Review 1 và trang
  // Glossary của Units 1–3 (tr. 136–137; chữ OCR của trang này lẫn cột, nên tính cả trang)
  const BAT_DAU = { 1: 8, 2: 18, 3: 28, 4: 38 };
  // tên Unit theo Contents (trang in 2; chữ OCR đọc dòng Unit 2 thành “UNIT 22 CITY LIF…”, nên so mục lục trong README của cuốn, người
  // đã soát) và tên ở trang đầu của Unit
  const mucLuc = fs.readFileSync(path.join(path.dirname(f9), "README.md"), "utf8");
  Object.entries(UNITS).forEach(([u, t]) => {
    assert.ok(mucLuc.includes(`| ${BAT_DAU[u]} | page-0${BAT_DAU[u] + 2} | Unit ${u}: ${t} |`), `mục lục ghi Unit ${u}: ${t}, trang in ${BAT_DAU[u]}`);
    let s = ""; for (let k = BAT_DAU[u]; k < BAT_DAU[+u + 1]; k++) s += trang[k] || "";
    assert.ok(s.replace(/\s+/g, "").toUpperCase().includes(t.replace(/\s+/g, "").toUpperCase()), `trang của Unit ${u} ghi tên ${t} (đầu trang, chân trang)`);
  });
  const chuUnit = (u) => { let s = ""; for (let t = BAT_DAU[u]; t < BAT_DAU[u + 1]; t++) s += " " + (trang[t] || ""); return (s + " " + trang[38] + " " + trang[39] + " " + trang[136] + " " + trang[137]).toLowerCase().replace(/\s+/g, " "); };
  const chuRieng = (u) => { let s = ""; for (let t = BAT_DAU[u]; t < BAT_DAU[u + 1]; t++) s += " " + (trang[t] || ""); return s.toLowerCase().replace(/\s+/g, " "); };
  Object.entries(TU).forEach(([u, ws]) => { const c = chuUnit(+u); ws.forEach((t) => assert.ok(c.includes(GOC[t] || t), `từ “${GOC[t] || t}” không có trong trang của Unit ${u}`)); });
  Object.entries(NGHIA_TU).forEach(([u, m]) => { const c = chuUnit(+u); Object.keys(m).forEach((t) => assert.ok(c.includes(GOC[t] || t), `từ hỏi nghĩa “${GOC[t] || t}” không có trong trang của Unit ${u}`)); });
  Object.values(HO_TU).forEach((h) => assert.ok(chuRieng(h.u).includes(h.ans), `từ “${h.ans}” (câu dạng từ) không có trong trang của Unit ${h.u}`));
  Object.entries(PV).forEach(([u, ws]) => { const c = chuUnit(+u); ws.forEach((t) => assert.ok(c.includes(t), `cụm động từ “${t}” không có trong trang của Unit ${u} (hay Review 1, Glossary)`)); });
  const set8 = boChuoi(SACH.map((f) => fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")), 8);
  const bao8 = kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, 8).filter((c) => set8.has(c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) {
    const set6 = boChuoi(SACH.map((f) => fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")), 6);
    console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, 6).filter((c) => set6.has(c)).map((c) => `${ten.get(q)}: ${c}`))))].join("\n"));
  }
  assert.deepEqual([...new Set(bao8)], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book); tên Unit, từ của đáp án câu từ vựng, từ hỏi nghĩa, câu dạng từ, cụm động từ có trong trang của Unit.");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const khac = BANKS.filter((b) => !/^ta9-gk1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)
    .map((q) => [q.q, q.x].concat(q.o || [], q.ans || [], q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).join(" | ")));
  const bao = (k) => { const set = boChuoi(khac, k); return kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn đọc, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn.");
console.log("TA9 GK1 OK");
