// Kiểm tra ngân hàng Tiếng Anh 5 cuối kì I của Phiên N5-ck1-ta (data/banks/5-ta.js, ta5-ck1-*), theo mẫu tests/ta9-ck1.js (phần không có
// phiên âm). Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho
// lớp 5 (đoạn “Chung của các phiên lớp 5” của docs/KE-HOACH-NOI-DUNG.md).
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho):
// - quốc tịch theo bảng nước → quốc tịch (Unit 3), tính cách theo việc người đó làm (Unit 3), số đọc bằng chữ (Unit 2: 93, 116);
// - like + V-ing, ngôi thứ ba likes / does / doesn't (Unit 4, 7), trạng từ tần suất tính từ số ngày trong tuần (every day → always, một
//   ngày → sometimes, không ngày nào → never) và đứng ngay trước động từ (Unit 4);
// - nghề theo việc làm (Unit 5: write stories → writer…), He'd like to be… khi hỏi về your brother;
// - tầng, đi lên / đi xuống tính từ bảng tầng trong đề (Unit 6); beside / under theo vị trí tả trong đề, 's chỉ người có đồ vật, They're
//   cho nhiều đồ vật, Whose khi trả lời bằng tên có 's (Unit 8);
// - quá khứ: was / were, weren't, động từ thêm -ed, go → went, Did…? – No, they didn't, mốc giờ a.m. / p.m. (Unit 9, 10);
// - câu đúng/sai 4 ý tính lại từ bảng hoặc đoạn trong đề; câu chọn câu đúng: đúng một lựa chọn đúng với dữ liệu của đề;
// - câu sắp xếp: mảnh đầu viết hoa, mảnh cuối có dấu câu, các mảnh khác viết thường, lời giải ghi lại cả câu;
// - đọc hiểu: đáp án lấy từ chữ của đoạn đọc (câu Vận dụng ghép hai ý của đoạn).
// Câu từ vựng (đáp án là từ, cụm từ của Unit): từ có trong trang của đúng Unit (theo trang bắt đầu ở Book map, cộng Wordlist, cộng
// Book map của Unit đó) và đúng nhóm nghĩa của bảng TU.
// Rồi kiểm tra không có chữ cái tiếng Việt, ma trận (hai đề cố định và câu riêng đều chia đúng ma trận, theo thứ tự chủ đề), tên chủ đề theo Book map, Reading (mỗi
// đề và phần câu riêng một đoạn 3 câu mức 1-2-3), dạng câu (ít nhất 2 câu đúng/sai 4 ý, kiểu Đ/S không lặp), đáp án đúng không dài hơn
// hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất (kể cả bằng nhau) ở không quá một phần ba số câu nhiều lựa chọn, không lặp
// chữ của nhãn chủ đề, note nói về đề chung của Sở, đề bài không trùng, rút thử (đúng ma trận, trọn đoạn, gặp đủ kho; đã làm hết một đề
// cố định thì không rút lại câu của đề đó), dò lộ đáp án giữa mọi cặp câu rút được cùng lúc (đề ngẫu nhiên: khác ô; đề “Ôn chủ đề”:
// mọi câu cùng Unit, vì Unit nào cũng dưới 10 câu nên đề đó lấy hết; cách dò ở chú thích của doLo), từ đã học (câu của Unit N chỉ dùng
// từ có trong sách Tiếng Anh 4 hai tập, các trang của sách lớp 5 đến hết Unit N, Book map đến Unit N, từ lớp 3 ở LOP3).
// Có sách ở ../OnUp-Book (repo riêng tư): tên Unit theo mục lục trong README của cuốn; từ đã học như trên; mọi trường chữ (cả đoạn đọc;
// trừ lời dặn chuẩn và mẫu câu của Book map) không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm;
// DO_SACH=1 in chuỗi 6 từ); đề bài không gần trùng câu của kho Tiếng Anh 4 (data/banks/4-ta.js; cặp hai từ liền nhau chung).
// So thêm với mọi câu của các kho khác, cả câu riêng của các đề ngẫu nhiên: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/ta5-ck1.js → in TA5 OK.
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
const S = { de1: "ta5-ck1-de1", de2: "ta5-ck1-de2", pool: "ta5-ck1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 35, b.id + ": 35 phút như lớp 4"); assert.equal(b.grade, 5); assert.equal(b.subject, "Tiếng Anh"); assert.equal(b.file, "5-ta.js");
  assert.ok(/common end-of-term test/.test(b.note) && /Department of Education/.test(b.note) && /Grade 5/.test(b.note), b.id + ": note nói về đề chung của Sở");
  assert.ok(/No listening/.test(b.note), b.id + ": note ghi không có câu nghe");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("ta5-ck1-", "") + "#" + (i + 1))));
const cauCua = (has) => { const m = kho.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };

/* ---------- tên chủ đề theo Book map (trang in 4–5), ma trận ---------- */
const UNITS = ["All About Me!", "Our Homes", "My Foreign Friends", "Our Free-Time Activities", "My Future Job", "Our School Rooms",
  "Our Favourite School Activities", "In Our Classroom", "Our Outdoor Activities", "Our School Trip"];
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
assert.deepEqual(TOPICS, UNITS.map((u, i) => `Unit ${i + 1} · ${u}`).concat(["Reading"]), "chủ đề: Unit 1–10 theo Book map, Reading");
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
UNITS.forEach((_, i) => { const n = sum(M[TOPICS[i]]); assert.ok(n >= 2 && n <= 3, `Unit ${i + 1}: mỗi đề 2–3 câu`); });
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
  assert.ok(w >= 60 && w <= 110, `đoạn ${id}: ${w} từ (bài đọc của sách lớp 5: khoảng 80–110 từ)`);
});

/* ---------- 100% tiếng Anh: không có chữ cái tiếng Việt ở mọi trường chữ (như tests/kiem-tra-de.js; cả note, đoạn đọc) ---------- */
{
  const VIET = /[àáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]/i;
  const chu = [[S.de1, d1.note], [S.de2, d2.note], [S.pool, p.note]].concat(Object.entries(PSG).map(([id, ps]) => ["đoạn " + id, ps.title + " " + ps.text]),
    kho.map((q) => [ten.get(q), [q.topic, q.q, q.x].concat(q.o || [], q.ans || [], q.l || [], q.r || []).join(" | ")]));
  assert.deepEqual(chu.filter(([, t]) => VIET.test(t)).map(([at, t]) => at + ": " + t.match(VIET)[0]), [], "có chữ cái tiếng Việt");
  assert.ok(VIET.test("Hà Nội") && !VIET.test("Ha Noi · Viet Nam – 2026–2027"), "bộ dò chữ cái tiếng Việt");
}

/* ---------- dạng câu, lời dặn ---------- */
assert.ok(kho.every((q) => ["mc", "fill", "order", "match", "tf", "tf4"].includes(q.type)), "dạng câu: nhiều lựa chọn, điền, sắp xếp, nối cột, đúng/sai");
["fill", "order", "match"].forEach((t) => assert.ok(kho.filter((q) => q.type === t).length >= 3, "có ít nhất 3 câu dạng " + t));
assert.ok(kho.filter((q) => q.q === "Choose the odd one out.").length >= 2, "có câu chọn từ khác loại (odd one out)");
assert.ok(kho.filter((q) => q.type === "tf").every((q) => q.topic === "Reading"), "câu đúng/sai một ý chỉ ở Reading");
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 2, "mỗi kho ít nhất 2 câu đúng/sai 4 ý");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai: " + ten.get(q)); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
tf4.forEach((q) => assert.ok(/Is each sentence true or false\?$/.test(q.q), "lời dặn câu đúng/sai 4 ý: " + ten.get(q)));
// lời giải không nói “option A”, “the second sentence”: app xáo phương án
kho.forEach((q) => assert.ok(!/\b(option|answer|sentence|statement)s? [A-D]\b|\bthe (first|second|third|fourth|last) (option|answer|sentence|statement|one)\b/i.test(q.x), "lời giải nhắc vị trí: " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau; nhiều nhất một chỗ trống
const mcs = kho.filter((q) => q.type === "mc");
mcs.forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o.map((o) => o.toLowerCase())).size, q.o.length, "lựa chọn trùng nhau: " + ten.get(q));
  assert.ok(q.q.split("___").length <= 2, "nhiều nhất một chỗ trống: " + ten.get(q));
});
// đáp án đúng là lựa chọn dài nhất hay ngắn nhất (kể cả bằng nhau) ở không quá một phần ba số câu nhiều lựa chọn (như tests/tv5-ck1.js)
const daiNhat = mcs.filter((q) => q.o[0].length >= Math.max(...q.o.slice(1).map((o) => o.length))).length;
const nganNhat = mcs.filter((q) => q.o[0].length <= Math.min(...q.o.slice(1).map((o) => o.length))).length;
assert.ok(3 * daiNhat <= mcs.length, `đáp án là lựa chọn dài nhất ở ${daiNhat}/${mcs.length} câu nhiều lựa chọn`);
assert.ok(3 * nganNhat <= mcs.length, `đáp án là lựa chọn ngắn nhất ở ${nganNhat}/${mcs.length} câu nhiều lựa chọn`);
// nhưng không phải lúc nào cũng ở giữa (Rút ra N9-gk1-ta: 0/59 cũng là dấu hiệu đoán được; giữ khoảng một phần tư mỗi phía)
assert.ok(6 * daiNhat >= mcs.length && 6 * nganNhat >= mcs.length, `đáp án là lựa chọn dài nhất ở ${daiNhat}, ngắn nhất ở ${nganNhat}/${mcs.length} câu: mỗi phía nên khoảng một phần tư`);
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
{
  const tuNhan = (t) => t.replace(/^Unit \d+ · /, "").toLowerCase().split(/[^a-z]+/).filter((w) => w.length >= 4);
  kho.filter((q) => q.topic !== "Reading").forEach((q) => {
    const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : q.type === "match" ? q.r.slice(0, q.l.length) : [];
    tuNhan(q.topic).forEach((c) => da.forEach((d) => {
      if (new RegExp("\\b" + c).test(d.toLowerCase())) assert.ok(q.type === "mc" && q.o.every((o) => new RegExp("\\b" + c).test(o.toLowerCase())), `${ten.get(q)}: đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`);
    }));
  });
}
// câu sắp xếp: lời dặn, ít nhất 4 mảnh, mảnh đầu viết hoa, mảnh cuối có dấu câu, các mảnh khác viết thường, lời giải ghi lại cả câu
const orders = kho.filter((q) => q.type === "order");
orders.forEach((q) => {
  assert.equal(q.q, "Put the words in the correct order.", "lời dặn câu sắp xếp: " + ten.get(q));
  assert.ok(q.o.length >= 4, "câu sắp xếp có ít nhất 4 mảnh: " + ten.get(q));
  assert.ok(/^[A-Z]/.test(q.o[0]) && q.o.slice(1).every((o) => /^[a-z]/.test(o)), "chỉ mảnh đầu viết hoa: " + ten.get(q));
  assert.ok(/[.?!]$/.test(q.o[q.o.length - 1]) && q.o.slice(0, -1).every((o) => !/[.?!,]$/.test(o)), "chỉ mảnh cuối có dấu câu: " + ten.get(q));
  assert.ok(q.x.includes(q.o.join(" ")), "lời giải ghi lại cả câu: " + ten.get(q));
});
// câu điền: lời dặn, đúng một chỗ trống; câu viết dạng đúng của động từ: động từ trong ngoặc ngay sau chỗ trống
kho.filter((q) => q.type === "fill").forEach((q) => {
  assert.ok(/^(Fill in the blank with one word\.|Write the correct form of the verb in brackets\.) /.test(q.q), "lời dặn câu điền: " + ten.get(q));
  assert.equal(q.q.split("___").length, 2, "đúng một chỗ trống: " + ten.get(q));
  if (/^Write the correct/.test(q.q)) assert.ok(/___ \([a-z]+\)/.test(q.q), "động từ trong ngoặc ngay sau chỗ trống: " + ten.get(q));
  else assert.ok(q.ans.every((a) => !/\s/.test(a)), "câu điền một từ: " + ten.get(q));
});
// câu nối: lời dặn, 3 cặp và một ô thừa ở cột phải, các ô không trùng
kho.filter((q) => q.type === "match").forEach((q) => {
  assert.equal(q.q, "Match the questions with the answers.", "lời dặn câu nối: " + ten.get(q));
  assert.ok(q.l.length === 3 && q.r.length === 4, "câu nối có 3 cặp và một ô thừa: " + ten.get(q));
  assert.equal(new Set(q.r).size, q.r.length, "ô cột phải trùng nhau: " + ten.get(q));
});

/* ---------- tính lại đáp án ---------- */
const NAT = { Japan: "Japanese", Malaysia: "Malaysian", America: "American", Australia: "Australian", Britain: "British", India: "Indian", "Viet Nam": "Vietnamese" };
const SO = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen"], CHUC = { 2: "twenty", 3: "thirty", 4: "forty", 5: "fifty", 6: "sixty", 7: "seventy", 8: "eighty", 9: "ninety" };
const docSo = (n) => n >= 100 ? SO[Math.floor(n / 100)] + " hundred" + (n % 100 ? " and " + docSo(n % 100) : "") : n < 20 ? SO[n] : CHUC[Math.floor(n / 10)] + (n % 10 ? "-" + SO[n % 10] : "");
const soTuChu = (s) => { for (let n = 1; n < 1000; n++) if (docSo(n) === s.toLowerCase()) return n; return null; };
assert.equal(docSo(23), "twenty-three"); assert.equal(docSo(93), "ninety-three"); assert.equal(docSo(38), "thirty-eight");
const PAST = { go: "went", plant: "planted", listen: "listened", play: "played", paint: "painted", watch: "watched", visit: "visited", have: "had", walk: "walked", dance: "danced", help: "helped" };
const ING = { cook: "cooking", take: "taking", do: "doing", read: "reading", play: "playing", solve: "solving", surf: "surfing" };
// nghề và việc làm (Unit 5, Book map; lớp 3, 4: teacher, singer, farmer, doctor, nurse)
// (đề bài tả việc làm bằng lời không có gốc của tên nghề: report → reporter, garden → gardener là lộ đáp án)
const NGHE = { dentist: "take care of people's teeth", reporter: "tell people the news", writer: "write stories", teacher: "teach children",
  gardener: "grows flowers and trees" };
// tính cách (Unit 3) theo việc người đó làm
const TINH_CACH = { active: /plays football, runs and swims/, clever: /learns new words very quickly/, helpful: /helps/, friendly: /makes friends/ };
// trạng từ tần suất theo số ngày trong tuần: 7 → always, 0 → never; ý về sometimes, often, usually không dùng (ranh giới không rõ:
// một ngày một tuần là sometimes hay rarely tuỳ người)
const tanSuat = (soNgay) => (soNgay === 7 ? "always" : soNgay === 0 ? "never" : "khác");
const soNgay = (s) => (/every day/.test(s) ? 7 : /doesn't/.test(s) ? 0 : (s.match(/\b(Mondays|Tuesdays|Wednesdays|Thursdays|Fridays|Saturdays|Sundays)\b/g) || []).length);
// tầng (Unit 6): ground 0, first 1, second 2, third 3
const TANG = ["ground", "first", "second", "third"];
const bangTang = (s) => { const r = {}; s.replace(/(Ground|First|Second|Third) floor: ([^.]+)\./g, (_, f, rooms) => rooms.split(", ").forEach((x) => (r[x] = TANG.indexOf(f.toLowerCase())))); return r; };
const diTang = (tu, den) => (den > tu ? "upstairs" : "downstairs");
// đúng/sai của câu theo dữ liệu: đúng một lựa chọn đúng → lựa chọn đó phải đứng đầu
const motDung = (q, dung) => { const d = q.o.filter(dung); assert.equal(d.length, 1, ten.get(q) + ": cần đúng một lựa chọn đúng, có " + d.length + " (" + d.join(" | ") + ")"); return d[0]; };
const CHECKS = [
  // Unit 1: loại của từ (animal, sport), từ khác loại
  { has: "It's a dolphin. It can swim", right: () => "animal" },
  { has: "It's table tennis. I play it", right: (q) => motDung(q, (o) => ({ sport: ["table tennis", "football"], food: ["rice"], colour: ["pink"], drink: ["juice"] })[o].some((x) => q.q.includes("It's " + x))) },
  { has: "– Can you tell me about yourself? – ___", right: (q) => motDung(q, (o) => /^Sure\. I'm \w+, and I'm in Class 5[A-E]\.$/.test(o)) },
  { has: "far from the city. They have a big garden", right: (q) => motDung(q, (o) => o === "countryside" && /far from the city/.test(q.q)) },
  { odd: "sandwich", nhom: { food: ["sandwich"], game: ["basketball", "tennis", "badminton", "football", "volleyball", "table tennis"] } },
  { match: "What's your favourite colour?", right: (q) => (q.r[0] === "It's pink." && /food/.test(q.l[1]) && /chicken|rice/.test(q.r[1]) && /^Where do you live\?$/.test(q.l[2]) && /^In the (city|countryside)\.$/.test(q.r[2]) ? q.r[0] : null) },
  // Unit 2
  { has: "– Do you live in this flat? – ___ I live in that house.", right: () => "No, I don't." },
  { order: "Does your", right: (q) => (/^Does your \w+( \w+)? live (near|in) [a-z ]+\?$/.test(q.o.join(" ")) ? q.o[0] : null) },
  { has: "Twenty-three is ___.", right: (q) => String(soTuChu(q.q.replace(" is ___.", ""))) },
  { has: "Look at the home survey", right: (q) => {
    const bang = {}; q.q.replace(/(\w+) – (flat|house) – (near|far from) the school/g, (_, ai, nha, xa) => (bang[ai] = { nha, xa }));
    return motDung(q, (o) => { const m = /^(\w+)(?: and (\w+))? lives? in (?:a )?(flat|house)s? (near|far from) the school\.$/.exec(o); return !!m && [m[1], m[2]].filter(Boolean).every((ai) => bang[ai] && bang[ai].nha === m[3] && bang[ai].xa === m[4]); });
  } },
  { has: "It's 15 Hai Ba Trung Street", right: () => "address" },
  { has: "at number 93", right: (q) => motDung(q, (o) => o === `Hanh lives at ${docSo(93)} Le Loi Street.`) },
  // Unit 3
  { has: "Akio is from Japan. He's ___.", right: () => NAT.Japan },
  { has: "He's from Malaysia. He's ___.", right: () => NAT.Malaysia },
  { has: "– What ___ is Sofia? – She's American.", right: () => "nationality" },
  { has: "– What's Ivan like? – He's ___.", right: (q) => motDung(q, (o) => !!TINH_CACH[o] && TINH_CACH[o].test(q.q)) },
  { has: "She learns new words very quickly", right: (q) => motDung(q, (o) => !!TINH_CACH[o] && TINH_CACH[o].test(q.q)) },
  { match: "What's she like?", right: (q) => (/^She's (active|clever|helpful|friendly)\.$/.test(q.r[0]) && q.l[1] === "Where's she from?" && /^She's from (Japan|Malaysia|America|Australia|Britain)\.$/.test(q.r[1])
    && q.l[2] === "What does she look like?" && /^She has [a-z ]+ hair\.$/.test(q.r[2]) && !/^She's (active|clever|helpful|friendly|from)/.test(q.r[3]) ? q.r[0] : null) },
  // Unit 4
  { has: "I like ___ the Internet", right: () => ING.surf },
  { has: "playing the ___. She plays it at the music club", right: (q) => motDung(q, (o) => ["violin", "piano", "guitar"].includes(o)) },
  { has: "the flowers in my garden every evening", right: () => "water" },
  { has: "My mother likes ___ (cook)", right: () => ING.cook },
  { has: "What does your brother like doing on Sundays?", right: (q) => motDung(q, (o) => /^He likes \w+ing [a-z ]+\.$/.test(o) && Object.values(ING).includes(o.split(" ")[2])) },
  { has: "Choose the correct sentence.", unit: 4, exact: true, right: (q) => motDung(q, (o) => /^I (always|usually|often|sometimes|never) play [a-z ]+\.$/.test(o)) },
  { has: "Look at Ngoc's week", right: (q) => {
    const viec = q.q.replace(/^.*?: /, "").replace(/\. Is each.*$/, "").split("; ");
    const ngay = (v) => soNgay(viec.find((s) => s.includes(v)));
    return q.o.map((o) => { const m = /^Ngoc (always|never) (reads books|plays the piano|goes swimming)\.$/.exec(o); assert.ok(m, ten.get(q) + ": đọc được ý “" + o + "”");
      return tanSuat(ngay({ "reads books": "reads books", "plays the piano": "plays the piano", "goes swimming": "go swimming" }[m[2]])) === m[1]; });
  } },
  { has: "Tuan plays the guitar on Mondays and Fridays", right: (q) => motDung(q, (o) => { const m = /^Tuan (always|never) plays (football|the guitar)\.$/.exec(o);
    const cau = q.q.split(". ").find((s) => s.includes(m[2])); return tanSuat(soNgay(cau)) === m[1]; }) },
  { order: "My father", right: (q) => (/^(always|usually|often|sometimes|never)$/.test(q.o[1]) && /^go(es)? /.test(q.o[2]) ? q.o[0] : null) },
  // Unit 5
  { has: "I'd like to take care of people's teeth", right: (q) => motDung(q, (o) => !!NGHE[o] && q.q.includes(NGHE[o])) },
  { has: "– Because I'd like to tell people the news.", right: (q) => motDung(q, (o) => !!NGHE[o] && q.q.includes(NGHE[o])) },
  { has: "He grows flowers and trees in the park", right: (q) => Object.keys(NGHE).find((n) => q.q.includes(NGHE[n])) },
  { has: "– Why would you like to be a writer? – ___", right: () => "Because I'd like to " + NGHE.writer + "." },
  { match: "Why would you like to be a teacher?", right: (q) => (q.r[0] === "Because I'd like to " + NGHE.teacher + "." && /^Yes, I would\./.test(q.r[1]) && /^No, she isn't\. She's a (\w+)\.$/.exec(q.r[2]) && !q.l[2].includes(/She's a (\w+)/.exec(q.r[2])[1]) && /^Because I'd like to /.test(q.r[3]) && !q.r[3].includes(NGHE.teacher) ? q.r[0] : null) },
  { has: "What would your brother like to be", right: (q) => motDung(q, (o) => /^He'd like to be an? \w+\.$/.test(o)) },
  // Unit 6
  { has: "Could you tell me the way to the gym, ___?", right: () => "please" },
  { has: "– Excuse me. Where's the computer room? – Go ___ the corridor", right: () => "along" },
  { has: "We go ___ to get from the third floor to the first floor.", right: () => diTang(3, 1) },
  { has: "The library is between them.", right: () => `It's on the ${TANG[(TANG.indexOf("first") + TANG.indexOf("third")) / 2]} floor.` },
  { has: "Yen is in the art room. She wants to go to the computer room.", right: (q) => { const b = bangTang(q.q); return `She goes ${diTang(b["art room"], b["computer room"])} to the ${TANG[b["computer room"]]} floor.`; } },
  { has: "Linh is in the gym. She wants to read some books.", right: (q) => { const b = bangTang(q.q); return `She goes ${diTang(b.gym, b.library)} to the ${TANG[b.library]} floor.`; } },
  // Unit 7
  { has: "What school activity does Nga like?", right: () => "She likes " + ING.do + " projects." },
  { has: "– Does Tung like solving maths problems? – ___ He thinks maths problems aren't fun.", right: (q) => (/aren't fun|doesn't like/.test(q.q) ? "No, he doesn't." : "Yes, he does.") },
  { odd: "interesting", nhom: { activity: ["reading", "singing", "dancing", "drawing", "read books", "play games", "solve maths problems", "do projects"], think: ["interesting", "fun", "useful", "good for group work"] } },
  { has: "he can learn a lot of new things", right: (q) => motDung(q, (o) => /useful/.test(o)) },
  { has: "Duc and his three friends play games together at break time", right: (q) => motDung(q, (o) => /group work/.test(o)) },
  { has: "Read: “Phuc likes reading books.", right: (q) => {
    // đọc đoạn thành sự kiện: ai thích, không thích việc gì; nghĩ việc đó thế nào (He, She chỉ người được nhắc gần nhất)
    const thich = {}, nghi = {}, gioi = { He: "Phuc", She: "Tra" };
    let ai = null, viec = null;
    /“([^”]+)”/.exec(q.q)[1].split(/\. ?/).filter(Boolean).forEach((cau) => { let m;
      if ((m = /^(?:His sister )?(\w+) (likes|doesn't like) ([a-z ]+?)(?: because (?:she|he) thinks they aren't (\w+))?$/.exec(cau))) {
        ai = gioi[m[1]] || m[1]; viec = m[3]; (thich[ai] = thich[ai] || {})[viec] = m[2] === "likes";
        if (m[4]) (nghi[ai] = nghi[ai] || {})[viec] = "not " + m[4];
      } else if ((m = /^(He|She) thinks it's (\w+)$/.exec(cau))) (nghi[ai] = nghi[ai] || {})[viec] = m[2];
      else assert.fail(ten.get(q) + ": chưa đọc được câu “" + cau + "”");
    });
    return q.o.map((o) => { let m;
      if ((m = /^(\w+) likes ([a-z ]+)\.$/.exec(o))) return !!(thich[m[1]] && thich[m[1]][m[2]]);
      if ((m = /^(\w+) thinks ([a-z ]+) is (\w+)\.$/.exec(o))) return !!(nghi[m[1]] && nghi[m[1]][m[2]] === m[3]);
      assert.fail(ten.get(q) + ": chưa đọc được ý “" + o + "”"); });
  } },
  // Unit 8
  { has: "They're ___ the clock, on the left of it.", right: () => "beside" },
  { has: "The ball is ___ the chair. The chair is above the ball.", right: () => "under" },
  { has: "It's ___. Look, her name is on it.", right: (q) => motDung(q, (o) => /^[A-Z][a-z]+'s$/.test(o)) },
  { has: "pencil sharpener is this? – It's Duc's.", right: () => "Whose" },
  { has: "– Where are my crayons? – ___", right: (q) => motDung(q, (o) => /^They're (in|on|under|above|beside|in front of) /.test(o)) },
  { match: "Are these your crayons?", right: (q) => (q.r[0] === "Yes, they are." && /^Where are/.test(q.l[1]) && /^They're /.test(q.r[1]) && /^Where's/.test(q.l[2]) && /^It's /.test(q.r[2]) && !/^(Yes, they|They're|It's)/.test(q.r[3]) ? q.r[0] : null) },
  // Unit 9
  { has: "We watched the fish at the ___", right: () => "aquarium" },
  { has: "to music at home yesterday", right: () => PAST.listen },
  { has: "(paint) pictures", right: () => PAST.paint },
  { has: "What did you do in the park yesterday?", right: () => "We " + PAST.play + " chess." },
  { has: "– What did you do at home yesterday? – ___", right: () => "We " + PAST.help + " our mum." },
  { has: "– Were you at the funfair yesterday? – No, we ___.", right: () => "weren't" },
    { has: "Were you at the theatre last Sunday morning, Hai?", right: (q) => { const sang = /was at the (\w+) in the morning/.exec(q.q)[1]; return sang === "theatre" ? "Yes, I was. I was at the theatre." : `No, I wasn't. I was at the ${sang}.`; } },
  { has: "Look at Nga's Sunday", right: (q) => {
    const lich = {}; q.q.replace(/(morning|afternoon|evening) – ([^;.]+)/g, (_, buoi, viec) => (lich[buoi] = viec));
    return q.o.map((o) => { let m;
      if ((m = /^Nga was (at home|at the \w+) in the (\w+)\.$/.exec(o))) return lich[m[2]].split(", ")[0] === m[1];
      if ((m = /^Nga (watched a cartoon|played the \w+) in the (\w+)\.$/.exec(o))) return lich[m[2]].includes(m[1]);
      assert.fail(ten.get(q) + ": chưa đọc được ý “" + o + "”"); });
  } },
  { order: "My friends", right: (q) => (q.o[1] === PAST.dance + " around" ? q.o[0] : null) },
  // Unit 10
  { has: "our class ___ to the zoo", right: () => PAST.go },
  { has: "ten small trees in the park", right: () => PAST.plant },
  { has: "– How was your school trip", right: () => "It was very good!" },
  { has: "Did Class 5B go to Bai Dinh Pagoda?", right: (q) => { const di = /Class 5B – ([^.]+)\./.exec(q.q)[1]; return di === "Bai Dinh Pagoda" ? "Yes, they did." : "No, they didn't."; } },
  { has: "at nine o'clock, we played games; at three o'clock, we sang songs", right: (q) => {
    // giờ của chuyến đi trong ngày học: 7–11 giờ là buổi sáng, 12–5 giờ là buổi chiều
    const gio = {}; q.q.replace(/at (\w+) o'clock, we ([a-z ]+?)[;.”]/g, (_, h, viec) => (gio[viec] = SO.indexOf(h)));
    const buoi = (h) => (h >= 7 && h <= 11 ? "morning" : "afternoon");
    return motDung(q, (o) => { const m = /^We (played games|sang songs) in the (morning|afternoon)\.$/.exec(o); return !!m && buoi(gio[m[1]]) === m[2]; });
  } },
  { has: "Look at Class 5E's school trip to Bai Dinh Pagoda", right: (q) => {
    const gio = {}; q.q.replace(/(\d+) (a|p)\.m\. – ([a-z ]+)/g, (_, h, ap, viec) => (gio[viec] = (+h % 12) + (ap === "p" ? 12 : 0)));
    const buoi = (h) => (h < 12 ? "morning" : h < 18 ? "afternoon" : "evening");
    return q.o.map((o) => { let m;
      if ((m = /^They visited the old buildings in the (\w+)\.$/.exec(o))) return buoi(gio["visit the old buildings"]) === m[1];
      if ((m = /^They played games in the (\w+)\.$/.exec(o))) return buoi(gio["play games"]) === m[1];
      if ((m = /^They had lunch at (\w+) o'clock\.$/.exec(o))) return gio["have lunch"] % 12 === SO.indexOf(m[1]);
      if (/^They played games after lunch\.$/.test(o)) return gio["play games"] > gio["have lunch"];
      assert.fail(ten.get(q) + ": chưa đọc được ý “" + o + "”"); });
  } },
  // Reading: đáp án lấy từ chữ của đoạn đọc
  { has: "Where does Khoa's family live?", right: (q) => (PSG.khoa.text.includes("lives " + q.o[0].replace(/^In/, "in").replace(/\.$/, "")) ? q.o[0] : null) },
  { has: "Jack is from Australia.", right: () => new RegExp("he's " + NAT.Australia).test(PSG.khoa.text) },
  { has: "Choose the correct sentence.", unit: "khoa", right: (q) => { const lop = /I study in Class (5[A-E])/.exec(PSG.khoa.text)[1]; assert.ok(/Jack and I are in the same class/.test(PSG.khoa.text)); return `Jack is in Class ${lop}.`; } },
  { has: "When did Class 5C visit Hoan Kiem Lake?", right: (q) => (PSG.lop5c.text.includes(q.o[0].replace(/\.$/, ",") + " our class visited Hoan Kiem Lake") ? q.o[0] : null) },
  { has: "Read the text again. Is each sentence true or false?", unit: "lop5c", right: (q) => q.o.map((o) => ({
    "It was sunny on the day of the trip.": /It was sunny/.test(PSG.lop5c.text), "The pupils looked at the old buildings near the lake.": /walked around the lake and looked at the old buildings near it/.test(PSG.lop5c.text),
    "Ms Lan played the piano on the bus.": /Ms Lan, played the piano/.test(PSG.lop5c.text), "The pupils sang songs on the bus.": /On the bus, [^.]*we sang songs/.test(PSG.lop5c.text) })[o]) },
  { has: "Choose the correct sentence.", unit: "lop5c", right: (q) => { const t = PSG.lop5c.text, an = t.indexOf("we had lunch"), xem = t.indexOf("we watched a cartoon");
    assert.ok(an > 0 && xem > an && /After lunch, we watched a cartoon/.test(t)); return "They had lunch, and then they watched a cartoon."; } },
  { has: "Where's the big map?", right: (q) => (PSG.vy.text.includes("big map " + q.o[0].replace(/^It's /, "").replace(/\.$/, "")) ? q.o[0] : null) },
  { has: "Vy's favourite school activity is solving maths problems.", right: () => /My favourite school activity is solving maths problems/.test(PSG.vy.text) },
  { has: "Bao wants some crayons.", right: (q) => (/crayons and glue sticks are on a small table near Ms Hoa's desk/.test(PSG.vy.text) ? "To the table near Ms Hoa's desk." : null) }
];
const daTinh = new Set();
let n = 0;
CHECKS.forEach((c) => {
  let q;
  if (c.order) { const m = kho.filter((x) => x.type === "order" && x.o[0] === c.order); assert.equal(m.length, 1, "câu sắp xếp mở đầu “" + c.order + "”"); q = m[0]; }
  else if (c.odd) { const m = kho.filter((x) => x.q === "Choose the odd one out." && x.o[0] === c.odd); assert.equal(m.length, 1, "câu odd one out đáp án “" + c.odd + "”"); q = m[0]; }
  else if (c.match) { const m = kho.filter((x) => x.type === "match" && x.l[0] === c.match); assert.equal(m.length, 1, "câu nối mở đầu “" + c.match + "”"); q = m[0]; }
  else { const m = kho.filter((x) => (c.exact ? x.q === c.has : x.q.includes(c.has)) && (c.unit === undefined || (typeof c.unit === "number" ? unitOf(x) === c.unit : x.p === c.unit)));
    assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`); q = m[0]; }
  assert.ok(!daTinh.has(q), "câu tính lại hai lần: " + ten.get(q)); daTinh.add(q); n++;
  const at = ten.get(q) + " (" + (c.has || c.order || c.odd || c.match) + ")";
  if (c.odd) {
    const nhomCua = (o) => Object.keys(c.nhom).find((k) => c.nhom[k].includes(o));
    q.o.forEach((o) => assert.ok(nhomCua(o), at + ": “" + o + "” chưa có trong bảng nhóm"));
    assert.equal(q.o.filter((o) => nhomCua(o) === nhomCua(q.o[0])).length, 1, at + ": đáp án là từ duy nhất của nhóm của nó");
    assert.equal(new Set(q.o.slice(1).map(nhomCua)).size, 1, at + ": ba lựa chọn còn lại cùng một nhóm");
    return;
  }
  const want = c.right(q);
  assert.ok(want !== null && want !== undefined, at + ": không tính lại được");
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.type === "tf" ? q.a : q.type === "match" ? q.r[0] : q.type === "order" ? q.o[0] : q.o[0];
  assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
});
assert.deepEqual(kho.filter((q) => !daTinh.has(q)).map((q) => ten.get(q)), [], "câu chưa tính lại đáp án");

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8) ---------- */
const goc = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
{
  const deBai = kho.map((q) => ({ at: ten.get(q), k: goc(q.q + (q.o ? q.o.join("|") : "") + (q.l ? q.l.join("|") : "")) }));
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
   Rút cùng lúc: đề ngẫu nhiên rút một câu mỗi ô, nên hai câu khác ô có thể cùng đề; đề “Ôn chủ đề” lấy hết câu của một Unit (Unit nào
   cũng dưới 10 câu), nên mọi cặp câu cùng Unit cũng rút cùng lúc. Chỉ hai câu của hai đoạn đọc khác nhau là không bao giờ cùng đề (rút
   trọn một đoạn). Mọi đoạn đọc đi cùng mọi câu không phải Reading. Chữ cần dò của đáp án (lựa chọn đúng, đáp án điền, ô phải của từng cặp
   nối, cả câu của câu sắp xếp), so cả từ, bỏ đuôi -s, -es, -ed, -ing, -e, giữ số (116, 93): đáp án một từ thì từ đó, từ ngữ pháp có ở
   mọi câu (NGU_PHAP: weren't, didn't, whose…) chỉ dò ở câu cùng Unit; đáp án 2–3 từ thì cả cụm; đáp án là câu thì các chuỗi 3 từ liền
   nhau không có ở lựa chọn sai, ô phải khác của câu đó (phần làm câu đó đúng); câu sắp xếp: các chuỗi 4 từ liền nhau của cả câu. Chữ của
   câu kia: đề bài, đáp án, lời giải, ý của câu đúng/sai, mảnh của câu sắp xếp, ô nối, đoạn đọc (lựa chọn sai của câu trắc nghiệm không
   tính, Rút ra N25); riêng đáp án câu điền dò cả lựa chọn sai của câu kia (học sinh chép được chữ đúng; Rút ra N9-gk1-ta). Đáp án câu
   Reading dò ở các câu không phải Reading và câu cùng đoạn (không dò trong chính đoạn đọc của nó). Đáp án không lặp từ (trừ từ ngữ pháp)
   của chính đề bài câu điền khuyết (Rút ra N12). */
const NGU_PHAP = new Set(("a an the of to in on at for from with by about and or but so than as if when while because before after " +
  "is are was were be been am have has had do does did will would can could should must might may not no i you he she it we they me " +
  "him her us them my your his its our their this that these those there here what where who whose how which why yet since ago already " +
  "ever never just very too more most all some any one every each other also up out down off around away into over weren't wasn't " +
  "didn't don't doesn't isn't aren't can't i'm it's he's she's they're we're i'd he'd").split(" "));
const tu = (s) => String(s).toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9' ]+/g, " ").split(/\s+/).filter(Boolean).map((w) => w.replace(/^'+|'+$/g, "")).filter(Boolean)
  .map((w) => (/^(it|he|she|that|what|where|who)'s$/.test(w) ? w : w.replace(/'s$/, "")));
const goc1 = (w) => { if (/n't$|'/.test(w)) return w; w = w.replace(/ies$/, "y"); const d = ["ing", "ed", "es", "s", "e"].find((x) => w.endsWith(x) && w.length - x.length >= 4 && !/ss$/.test(w)); return d ? w.slice(0, -d.length) : w; };
const noi = (s) => " " + tu(s).map(goc1).join(" ") + " ";
const chuCua = (q, coLuaChonSai) => [q.q, q.x].concat(q.type === "mc" && !coLuaChonSai ? [q.o[0]] : q.o || [], q.ans || [], q.l || [], q.r || []);
const PSG_Q = Object.entries(PSG).map(([id, ps]) => ({ id, p: id, topic: "Reading", psg: true, text: ps.text }));
const cungLuc = (a, b) => a !== b && !(a.p && b.p && a.p !== b.p) && !(a.topic === "Reading" && b.psg && b.p === a.p);
const chuoiTu = (w, k) => [...new Set(w.slice(0, w.length - k + 1).map((_, i) => w.slice(i, i + k).join(" ")))];
const daCan = (q) => {
  if (q.type === "mc" || q.type === "fill") {
    const raw = tu(q.type === "mc" ? q.o[0] : q.ans[0]), w = raw.map(goc1), sai = q.type === "mc" ? q.o.slice(1).map(noi) : [];
    const nguPhap = raw.length === 1 && NGU_PHAP.has(raw[0]);
    return [{ raw, nguPhap, can: w.length >= 4 ? chuoiTu(w, 3).filter((c) => !sai.some((s) => s.includes(" " + c + " "))) : [w.join(" ")] }];
  }
  if (q.type === "match") return q.r.slice(0, q.l.length).map((r, i) => { const w = tu(r).map(goc1), khac = q.r.filter((_, j) => j !== i).map(noi);
    return { raw: tu(r), nguPhap: false, can: (w.length >= 4 ? chuoiTu(w, 3) : [w.join(" ")]).filter((c) => !khac.some((s) => s.includes(" " + c + " "))) }; });
  if (q.type === "order") { const w = tu(q.o.join(" ")).map(goc1); return [{ raw: [], nguPhap: false, can: chuoiTu(w, 4) }]; }
  return [];
};
const doLo = (qs, tenCau) => {
  const ra = [], tatCa = qs.concat(PSG_Q.filter((x) => qs.some((q) => q.p === x.p) || qs.some((q) => !q.p)));
  qs.forEach((q) => daCan(q).forEach(({ raw, nguPhap, can }) => {
    if (q.type === "fill") {
      const de = new Set(tu(q.q.replace(/\([^)]*\)/g, " ")).map(goc1));
      raw.filter((x) => !NGU_PHAP.has(x)).map(goc1).filter((x) => de.has(x)).forEach((x) => ra.push(`${tenCau(q)} (chính đề bài): ${x}`));
    }
    tatCa.forEach((p2) => {
      if (!cungLuc(q, p2) || (nguPhap && q.topic !== p2.topic)) return;
      if (q.topic === "Reading" && p2.topic === "Reading" && p2.p !== q.p) return;
      if (q.topic === "Reading" && p2.psg) return;
      const T = (p2.psg ? [p2.text] : chuCua(p2, q.type === "fill")).map(noi).join("|");
      can.filter((c) => c.trim() && T.includes(" " + c + " ")).forEach((c) => ra.push(`${p2.psg ? "đoạn " + p2.id : tenCau(p2)} → ${tenCau(q)}: ${c}`));
    });
  }));
  return [...new Set(ra)];
};
const lo = doLo(kho, (q) => ten.get(q));
if (process.env.DO_LO) console.log("Đáp án có ở câu rút được cùng lúc (xem tay):\n" + lo.join("\n"));
const DA_XEM = [];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = cauCua("We watched the fish at the ___"), b = cauCua("Akio is from Japan");
  assert.ok(doLo([a, Object.assign({}, b, { x: b.x + " Akio likes the aquarium." })], (q) => q.topic).some((s) => /: aquarium$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
  const c = cauCua("pencil sharpener is this? – It's Duc's."), e = cauCua("– Where are my crayons?");
  assert.ok(doLo([c, Object.assign({}, e, { q: "– Whose crayons are these? – They're Lam's." })], (q) => q.topic).some((s) => /: whos$/.test(s)), "bộ dò phải bắt được từ ngữ pháp ở câu cùng Unit");
  const f = cauCua("(cook) in her free time"), g = cauCua("I ___ the flowers in my garden");
  assert.ok(doLo([f, Object.assign({}, g, { o: g.o.concat(["cooking"]) })], (q) => q.topic).some((s) => /: cook$/.test(s)), "bộ dò phải bắt được đáp án câu điền ở lựa chọn sai của câu khác");
  const h = cauCua("our class ___ to the zoo");
  assert.ok(doLo([h, Object.assign({}, cauCua("Look at Nga's Sunday"), { q: "Nga went to the funfair." })], (q) => q.topic).some((s) => /: went$/.test(s)), "bộ dò phải bắt được dạng quá khứ là đáp án");
}

/* ---------- từ đã học, không chép sách: so với chữ OCR, nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ: băm mọi chuỗi k từ của chữ đã chuẩn hoá (một lần cho mỗi chữ, mỗi k), chỉ so thật (includes) khi băm có;
// kết quả như sach.includes(" " + c + " "), ds.filter((o) => o.s.includes(" " + c + " ")) mà không quét lại cả chữ cho mỗi chuỗi
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
const khongDau = nhoChuoi((s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim());
// lời dặn chuẩn của đề Tiếng Anh (mục 3.2 của docs/KE-HOACH-NOI-DUNG.md) và mẫu câu của Book map (sách dạy đúng các câu này): không so
const LOI_DAN = ["Put the words in the correct order.", "Read the text. Then answer the questions.", "Read the text again. Is each sentence true or false?",
  "Match the questions with the answers.", "Fill in the blank with one word.", "Write the correct form of the verb in brackets.", "Choose the odd one out.",
  "Choose the correct sentence.", "Is each sentence true or false?",
  "What would you like to be in the future?", "What do you like doing in your free time?", "Can you tell me about yourself?", "What do you do at the weekend?",
  "What school activity does he like?", "What school activity does she like?", "What nationality is he?", "What nationality is she?", "Could you tell me the way to the"];
const boLoiDan = (s) => LOI_DAN.slice(0, 9).reduce((t, l) => t.split(l).join(" | "), String(s));
const MAU = LOI_DAN.map((x) => " " + khongDau(x) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; MAU.forEach((x) => { while (t.includes(x)) t = t.replace(x, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|")) ra.push(c.join(" ")); } return ra; };
const truong = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], q.l || [], q.r || [], q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].text] : []);
if (SACH.length) {
  const f5 = SACH.find((f) => /lop-5[\\/]tieng-anh-5-tap-1[\\/]/.test(f)), f5b = SACH.find((f) => /lop-5[\\/]tieng-anh-5-tap-2[\\/]/.test(f));
  const f4 = SACH.filter((f) => /lop-4[\\/]tieng-anh-4-tap-[12][\\/]/.test(f));
  assert.ok(f5 && f5b && f4.length === 2, "OnUp-Book có Tiếng Anh 5 hai tập, Tiếng Anh 4 hai tập");
  // tên Unit theo mục lục trong README của cuốn (chép từ Book map, người đã soát)
  const mucLuc = fs.readFileSync(path.join(path.dirname(f5), "README.md"), "utf8");
  UNITS.forEach((u, i) => assert.ok(mucLuc.toLowerCase().includes(`unit ${i + 1}. ${u.toLowerCase()} |`), `mục lục ghi Unit ${i + 1}. ${u}`));
  // trang của sách lớp 5 tập một theo trang in; Unit N bắt đầu ở BAT_DAU[N - 1] (Book map); Starter tr. 7; Wordlist tr. 78–80
  const raw = fs.readFileSync(f5, "utf8"), parts = raw.split(/=== page-\d+ · ([^=]+) ===/), trang = {};
  for (let i = 1; i < parts.length; i += 2) { const m = /trang in (\d+)/.exec(parts[i]); if (m) trang[+m[1]] = (trang[+m[1]] || "") + parts[i + 1]; }
  const BAT_DAU = [10, 16, 22, 28, 34, 44, 50, 56, 62, 68, 74], WORDLIST = (trang[78] || "") + trang[79] + trang[80];
  const trangDen = (tu0, den) => { let s = ""; for (let t = tu0; t < den; t++) s += " " + (trang[t] || ""); return s; };
  // Book map (tr. 4–5) của từng Unit: từ vựng, mẫu câu; chữ OCR của Book map lẫn các Unit, nên chép lại ở đây và kiểm tra có trong chữ OCR
  const BOOK_MAP = { 1: "city class countryside dolphin pink sandwich table tennis yourself favourite",
    2: "building flat house tower address twenty-three thirty-eight ninety-three fifteen sixteen",
    3: "nationality American Australian Japanese Malaysian active clever friendly helpful",
    4: "go for a walk play the violin surf the Internet water the flowers always often sometimes usually free time weekend",
    5: "firefighter gardener reporter writer grow flowers report the news teach children write stories teacher dentist future",
    6: "first floor ground floor second floor third floor go along go downstairs go past go upstairs computer room",
    7: "do projects play games read books solve maths problems fun good for group work interesting useful school activity solving reading",
    8: "above beside in front of under crayon glue stick pencil sharpener set square whose",
    9: "aquarium campsite funfair theatre dance around the campfire listen to music play chess watch the fish cinema bakery",
    10: "Ba Na Hills Bai Dinh Pagoda Hoan Kiem Lake Suoi Tien Theme Park plant trees play games visit the old buildings walk around the lake November December" };
  // chữ OCR của Book map đọc sai vài từ (đã xem ảnh trang, page-006, page-007); số viết bằng chữ ở đây, Book map ghi bằng chữ số
  // (null: chữ OCR bỏ sót cột Word stress của Unit 7, 9, đã đọc ở ảnh trang)
  const OCR_BM = { December: "Detember", "twenty-three": "23", "thirty-eight": "38", "ninety-three": "93",
    solving: null, reading: null, cinema: null, bakery: null };
  const ocrBM = " " + khongDau(trang[4] + trang[5]) + " ";
  const thieuBM = Object.entries(BOOK_MAP).flatMap(([u, s]) => s.split(" ").filter((w) => OCR_BM[w] !== null && !ocrBM.includes(" " + khongDau(OCR_BM[w] || w) + " ")).map((w) => `Unit ${u}: ${w}`));
  assert.deepEqual(thieuBM, [], "từ chép ở BOOK_MAP phải có trong chữ OCR của Book map (tr. 4–5)");
  // từ vựng là đáp án (bảng TU): có trong trang của đúng Unit (cộng Wordlist, Book map của Unit đó)
  const TU = { 1: ["animal", "sport", "countryside", "sandwich"], 2: ["address"], 3: ["Japanese", "Malaysian", "nationality", "active", "clever"], 4: ["surfing", "violin", "water"],
    5: ["dentist", "reporter", "gardener"], 6: ["please", "along", "downstairs"], 7: ["interesting"], 8: ["beside", "under", "Whose"], 9: ["aquarium"] };
  const chuUnit = (u) => (trangDen(BAT_DAU[u - 1], BAT_DAU[u]) + " " + WORDLIST + " " + BOOK_MAP[u]).toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, " ");
  Object.entries(TU).forEach(([u, ws]) => { const c = chuUnit(+u); ws.forEach((t) => assert.ok(c.includes(t.toLowerCase().replace(/ing$/, "").replace(/!$/, "")), `từ “${t}” không có trong trang của Unit ${u}`)); });
  kho.filter((q) => unitOf(q) && (q.type === "mc" || q.type === "fill")).forEach((q) => {
    const d = q.type === "mc" ? q.o[0] : q.ans[0];
    if (/^[A-Za-z!' ]+$/.test(d) && d.split(" ").length <= 3 && !/'s$/.test(d) && !/^(No|Yes|She|He|We|They|It|I)\b/.test(d) && !Object.values(PAST).includes(d) && !Object.values(ING).includes(d) && !/^(weren't|didn't|went)$/.test(d))
      assert.ok((TU[unitOf(q)] || []).includes(d), `${ten.get(q)}: đáp án từ vựng “${d}” chưa có trong bảng TU của Unit ${unitOf(q)}`);
  });
  // từ đã học: câu của Unit N chỉ dùng từ có trong sách Tiếng Anh 4 hai tập, các trang lớp 5 từ Starter đến hết Unit N, Book map đến
  // Unit N; câu Reading dùng được mọi từ của tập một. LOP3: từ của Global Success 3 không có trong chữ OCR (hình vẽ không có chữ)
  const LOP3 = "cat dog bird rabbit fish goldfish parrot elephant tiger monkey ruler pencil pen eraser book books notebook bag desk chair table lamp window door bed kitchen bedroom bathroom living room yard gate pond tree toy toys doll kite car ball robot teddy bear ship train plane bus bike rice bread milk water juice chicken meat egg eggs mother father mum dad brother sister grandmother grandfather grandma grandpa family friend friends cook cooking driver doctor nurse worker farmer singer teacher red blue green yellow pink orange black white brown purple colour head face eyes ears nose mouth hand hands arm leg legs hair swim swimming sing singing dance dancing draw drawing paint painting run running walk walking read reading write writing skate skating cycling chess football basketball volleyball badminton music room art room gym playground library classroom school hello hi goodbye bye thank thanks yes no please sorry fine name old years how many sit stand open close".split(" ");
  // chữ dùng trong lời giải để gọi tên phần của câu (sách dùng ở lời dặn: “Read and answer”, “Make a sentence”, “Look and write”)
  const META = "v ing ed text word words thing things person means say says tells asks answer answers question questions sentence add use past job country reason more than one becomes".split(" ");
  const NAMES = "khoa hoa sen star tran phu jack thu ivan akio sofia ali nga tuan lan linh duc thuy hai lam bao vy quan ha tam le loi trung hoan kiem bai dinh ba na hills suoi tien theme park pagoda lake hoa ms thao ngoc tung phuc tra yen kim hanh hung".split(" ");
  const tuSach = (s) => new Set(s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z' -]+/g, " ").split(/[\s-]+/).map((w) => w.replace(/^'+|'+$/g, "")).filter(Boolean));
  const L4 = tuSach(f4.map((f) => fs.readFileSync(f, "utf8")).join(" "));
  const hocDen = (u) => { const s = tuSach(trangDen(7, u ? BAT_DAU[u] : 81) + " " + Object.entries(BOOK_MAP).filter(([k]) => !u || +k <= u).map(([, v]) => v).join(" ") + " " + (u ? "" : WORDLIST));
    L4.forEach((w) => s.add(w)); LOP3.concat(META, NAMES).forEach((w) => s.add(w)); return s; };
  const HOC = {}; for (let u = 0; u <= 10; u++) HOC[u] = hocDen(u);
  const bien = (w) => { const r = [w];
    if (/n't$/.test(w)) r.push(w === "can't" ? "can" : w === "won't" ? "will" : w.replace(/n't$/, ""), "not");
    if (/'(s|m|re|d|ll|ve)$/.test(w)) r.push(w.replace(/'(s|m|re|d|ll|ve)$/, ""));
    [["ies", "y"], ["ied", "y"], ["es", ""], ["s", ""], ["ed", ""], ["d", ""], ["ing", ""], ["ing", "e"], ["ly", ""]].forEach(([d, t]) => { if (w.endsWith(d) && w.length - d.length >= 2) { const g = w.slice(0, -d.length) + t; r.push(g); if (/(.)\1$/.test(g)) r.push(g.slice(0, -1)); } });
    r.slice().forEach((g) => { ["s", "es", "d", "ed", "ing"].forEach((d) => r.push(g + d)); if (/e$/.test(g)) r.push(g.slice(0, -1) + "ing"); });
    return r; };
  const chuaHoc = [];
  kho.forEach((q) => {
    const u = unitOf(q), hoc = HOC[u];
    [...tuSach(boLoiDan([q.q, q.x].concat(q.o || [], q.ans || [], q.l || [], q.r || [], q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].text] : []).join(" | ")))]
      .filter((w) => w.length > 1 && !/^\d/.test(w) && !bien(w).some((b) => hoc.has(b))).forEach((w) => chuaHoc.push(`${ten.get(q)} (Unit ${u || "Reading"}): ${w}`));
  });
  assert.deepEqual(chuaHoc, [], "từ chưa học đến Unit của câu (thêm vào LOP3 nếu là từ lớp 3)");
  // không chép sách: chuỗi 8 từ liền nhau của mọi trường chữ không có trong chữ OCR của mọi cuốn
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book); tên Unit theo mục lục, từ của đáp án câu từ vựng có trong trang của Unit, câu chỉ dùng từ đã học.");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- không gần trùng câu của kho Tiếng Anh 4 (lời giao việc; như tests/tv5-ck1.js) ----------
   Đề bài cùng lựa chọn, ô nối, ô sắp xếp có từ 4 cặp hai từ liền nhau chung với một câu của data/banks/4-ta.js và số cặp chung từ một
   nửa số cặp của câu ít cặp hơn thì báo. Bỏ lời dặn chuẩn (LOI_DAN) và cặp có ở từ 3% số câu của hai file. */
{
  const cap2 = (s) => { let t = " " + String(s).toLowerCase().replace(/[’]/g, "'") + " "; LOI_DAN.map((x) => x.toLowerCase()).forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^a-z0-9'|]+/g, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const lop4 = BANKS.filter((b) => b.file === "4-ta.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), ca = lop4.concat(kho), df = {};
  const deBai = (q) => [q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ");
  ca.forEach((q) => new Set(cap2(deBai(q))).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capCua = (q) => new Set(cap2(deBai(q)).filter((c) => (df[c] || 0) < 0.03 * ca.length));
  const P4 = lop4.map((x) => [x, capCua(x)]);
  const ganTrung = kho.flatMap((q) => { const c = capCua(q); return P4.map(([x, d]) => { const chung = [...c].filter((y) => d.has(y)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${x.q.slice(0, 60)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Tiếng Anh 4:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Tiếng Anh 4");
}

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const cauKhac = (b, q) => ({ id: b.id, s: " " + [q.q, q.x].concat(q.o || [], q.ans || [], q.l || [], q.r || [], q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const khac = BANKS.filter((b) => !b.pool && b.file !== "5-ta.js").flatMap((b) => b.questions.map((q) => cauKhac(b, q)))
    .concat(BANKS.filter((b) => b.pool && b.file !== "5-ta.js").flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cauKhac(b, q))));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + d1.n + " + " + d2.n + " câu của hai đề cố định, " + rieng.length + " câu riêng), " + Object.keys(PSG).length
  + " đoạn đọc, " + tf4.length + " câu đúng/sai 4 ý, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("TA5 OK");
