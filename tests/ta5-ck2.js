// Kiểm tra ngân hàng Tiếng Anh 5 cuối năm của Phiên N5-ck2-ta (data/banks/5-ta.js, ta5-ck2-*), theo mẫu tests/ta5-ck1.js. Kho = Đề 1 +
// Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho lớp 5 (đoạn “Chung
// của các phiên lớp 5” của docs/KE-HOACH-NOI-DUNG.md). Phạm vi: Global Success 5 tập hai, Units 11–20 (Review 3, 4).
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho), theo bảng ghi trong script:
// - thì của động từ: quá khứ (bảng PAST: see → saw, eat → ate, take → took…; Did…? – No, I didn't; Did + động từ nguyên mẫu; Unit 11, 17),
//   will / won't (Unit 12, 13), be going to (Unit 20), should / shouldn't (Unit 15), ngôi thứ ba và usually + wears (Unit 14, 16);
// - việc làm của chuyến đi (VIEC: collect seashells…; Unit 11), nơi có tên riêng (NOI: Ha Long Bay, Phong Nha Cave…), đồ ăn, đồ uống
//   (Unit 13), bảng kế hoạch theo buổi (Unit 13), tần suất tính từ số ngày trong tuần (một ngày → once a week, hai → twice, ba → three
//   times, mọi ngày → every day; Unit 14), chỗ đau → bệnh (DAU: head → headache…), bệnh → lời khuyên (KHUYEN; Unit 15);
// - mùa và thời tiết ở Hà Nội (MUA: spring warm, summer hot, autumn cool, winter cold, như sách), quần áo ấm, quần áo mùa hè (Unit 16);
// - truyện và nhân vật (TRUYEN), tính từ → trạng từ (TRANG: good → well, beautiful → beautifully, fast, hard; Unit 17);
// - phương tiện đi lại theo mẫu câu của Unit 18 (gần → on foot; xa, có xe buýt → by bus; xa, không có xe buýt, không có ô tô → by taxi);
// - ý kiến về nơi chốn (Y_KIEN: yên tĩnh, nhiều cây → peaceful; nhiều trò chơi → exciting), số đọc bằng chữ, khoảng cách đọc từ bảng
//   trong đề, they're cho danh từ số nhiều (Unit 19);
// - câu đúng/sai 4 ý và câu chọn câu đúng: tính lại từ bảng hoặc đoạn trong đề (đúng một lựa chọn đúng); đọc hiểu: đáp án lấy từ chữ
//   của đoạn đọc (câu Vận dụng ghép hai ý của đoạn).
// Book map tập hai không dạy so sánh hơn, so sánh nhất (Unit 17 dạy trạng từ cách thức), nên kho không có câu so sánh.
// Câu từ vựng (đáp án là từ, cụm từ của Unit): từ có trong trang của đúng Unit (theo trang bắt đầu ở Book map, cộng Wordlist, cộng Book
// map của Unit đó; bảng TU).
// Rồi kiểm tra không có chữ cái tiếng Việt, ma trận (hai đề cố định và câu riêng đều chia đúng ma trận, theo thứ tự chủ đề), tên chủ đề
// theo Book map, Reading (mỗi đề và phần câu riêng một đoạn 3 câu mức 1-2-3), dạng câu (ít nhất 2 câu đúng/sai 4 ý, kiểu Đ/S không lặp),
// đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất (kể cả bằng nhau) ở không quá một phần ba và không
// dưới một phần sáu số câu nhiều lựa chọn, không lặp chữ của nhãn chủ đề, note nói về đề chung của Sở, ba mã gắn vào ck2-l5, đề bài không
// trùng, rút thử (đúng ma trận, trọn đoạn, gặp đủ kho; đã làm hết một đề cố định thì không rút lại câu của đề đó), dò lộ đáp án giữa mọi
// cặp câu rút được cùng lúc (đề ngẫu nhiên: khác ô; đề “Ôn chủ đề”: mọi câu cùng Unit; cách dò ở chú thích của doLo; DO_LO=1 in ra để
// xem tay, danh sách đã xem ở DA_XEM, ghi cả dòng dò lộ của tests/soat-nhap.js đã xem tay), từ đã học (câu của Unit N chỉ dùng từ có
// trong sách Tiếng Anh 4 hai tập, cả sách Tiếng Anh 5 tập một, các trang tập hai đến hết Unit N, Book map đến Unit N, từ lớp 3 ở LOP3).
// Có sách ở ../OnUp-Book (repo riêng tư): tên Unit theo mục lục trong README của cuốn; từ đã học như trên; mọi trường chữ (cả đoạn đọc;
// trừ lời dặn chuẩn và mẫu câu của Book map) không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm;
// DO_SACH=1 in chuỗi 6 từ); đề bài không gần trùng câu của kho Tiếng Anh 4 (data/banks/4-ta.js) và kho Tiếng Anh 5 cuối kì I (cặp hai từ
// liền nhau chung). So thêm với mọi câu của các kho khác (cả kho Tiếng Anh 5 cuối kì I), cả câu riêng của các đề ngẫu nhiên: không có
// chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/ta5-ck2.js → in TA5 CK2 OK.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz;
const S = { de1: "ta5-ck2-de1", de2: "ta5-ck2-de2", pool: "ta5-ck2-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 35, b.id + ": 35 phút như lớp 4"); assert.equal(b.grade, 5); assert.equal(b.subject, "Tiếng Anh"); assert.equal(b.file, "5-ta.js");
  assert.ok(/common end-of-term test/.test(b.note) && /Department of Education/.test(b.note) && /Grade 5/.test(b.note), b.id + ": note nói về đề chung của Sở");
  assert.ok(/No listening/.test(b.note) && /Units 11–20/.test(b.note), b.id + ": note ghi Units 11–20, không có câu nghe");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
// tên câu bỏ tiền tố chung “ta5-” của mã đề trong file (như tests/soat-nhap.js), để DA_XEM ghi được cả dòng của công cụ đó
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("ta5-", "") + "#" + (i + 1))));
const cauCua = (has) => { const m = kho.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };
// ba mã gắn vào kì thi cuối năm lớp 5
{
  const c = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), c);
  const ck2 = c.window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck2-l5");
  assert.ok(ck2 && ck2.grades.includes(5), "có kì thi ck2-l5 của khối 5");
  Object.values(S).forEach((id) => assert.ok(ck2.banks.includes(id), "ck2-l5 gắn " + id));
  assert.ok(/Tiếng Anh: Units 11–20/.test(ck2.scope), "phạm vi của ck2-l5 ghi Tiếng Anh: Units 11–20");
}

/* ---------- tên chủ đề theo Book map (trang in 4–5), ma trận ---------- */
const UNITS = ["Family Time", "Our Tet Holiday", "Our Special Days", "Staying Healthy", "Our Health", "Seasons and the Weather",
  "Stories for Children", "Means of Transport", "Places of Interest", "Our Summer Holidays"];
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
assert.deepEqual(TOPICS, UNITS.map((u, i) => `Unit ${i + 11} · ${u}`).concat(["Reading"]), "chủ đề: Unit 11–20 theo Book map, Reading");
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
UNITS.forEach((_, i) => { const n = sum(M[TOPICS[i]]); assert.ok(n >= 2 && n <= 3, `Unit ${i + 11}: mỗi đề 2–3 câu`); });
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
// mã đoạn đọc không trùng mã đoạn của kho cuối kì I cùng file
BANKS.filter((b) => b.file === "5-ta.js" && !Object.values(S).includes(b.id)).forEach((b) => Object.keys(b.passages || {}).forEach((id) => assert.ok(!PSG[id], "mã đoạn " + id + " trùng kho " + b.id)));

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
// nhưng không phải lúc nào cũng ở giữa (Rút ra N9-gk1-ta: 0/59 cũng là dấu hiệu đoán được; Rút ra N5-ck1-ta: cận dưới một phần sáu)
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
  assert.ok(/^[A-Z]/.test(q.o[0]) && q.o.slice(1, -1).every((o) => /^[a-z]/.test(o)), "chỉ mảnh đầu viết hoa (mảnh cuối có thể là tên riêng): " + ten.get(q));
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
const SO = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen",
  "seventeen", "eighteen", "nineteen"], CHUC = { 2: "twenty", 3: "thirty", 4: "forty", 5: "fifty", 6: "sixty", 7: "seventy", 8: "eighty", 9: "ninety" };
const docSo = (n) => n >= 100 ? SO[Math.floor(n / 100)] + " hundred" + (n % 100 ? " and " + docSo(n % 100) : "") : n < 20 ? SO[n] : CHUC[Math.floor(n / 10)] + (n % 10 ? "-" + SO[n % 10] : "");
const soTuChu = (s) => { for (let n = 1; n < 1000; n++) if (docSo(n) === s.toLowerCase()) return n; return null; };
assert.equal(docSo(140), "one hundred and forty"); assert.equal(docSo(129), "one hundred and twenty-nine"); assert.equal(docSo(45), "forty-five");
// quá khứ của động từ (Unit 11: swam, took, bought, saw, ate như Book map và các trang của Unit; Unit 17: sang, ran, won)
const PAST = { see: "saw", eat: "ate", swim: "swam", take: "took", buy: "bought", go: "went", collect: "collected", sing: "sang", run: "ran", win: "won",
  walk: "walked", cook: "cooked", work: "worked", visit: "visited", practise: "practised", drink: "drank", listen: "listened", surf: "surfed", fall: "fell", wear: "wore" };
const goc = (qk) => Object.keys(PAST).find((v) => PAST[v] === qk);
// việc làm của chuyến đi (Book map Unit 11) và nơi có tên riêng (Book map Unit 11, 18, 20)
const VIEC = { seashells: "collect", souvenirs: "buy", seafood: "eat", "a boat trip": "take", "on the beach": "walk", "in the sea": "swim", "interesting places": "see" };
const NOI = { "Ha Long": "Bay", "Phong Nha": "Cave", "Phu Quoc": "Island", Huong: "River", Dragon: "Bridge" };
// đồ ăn, đồ uống (Unit 13)
const DO_UONG = ["milk tea", "apple juice", "lemonade", "water", "fruit juice"], DO_AN = ["pizza", "chicken", "burgers", "bread", "sandwiches", "cakes"];
// do / play (Unit 14) và đồ ăn tốt cho sức khoẻ
const DO = ["yoga", "morning exercise"], PLAY = ["chess", "football", "badminton", "sports", "basketball", "table tennis"];
const LANH = ["vegetables", "fruit", "fish"], KHONG_LANH = ["sweets", "chips", "ice cream"];
// tần suất theo số ngày trong tuần (Book map Unit 14)
const TAN = (n) => (n === 7 ? "every day" : ["", "once a week", "twice a week", "three times a week"][n] || "khác");
const soNgay = (s) => (/every day/.test(s) ? 7 : (s.match(/\b(Mondays|Tuesdays|Wednesdays|Thursdays|Fridays|Saturdays|Sundays)\b/g) || []).length);
const hoa = (s) => s[0].toUpperCase() + s.slice(1);
// chỗ đau → bệnh, bệnh → lời khuyên (Book map Unit 15)
const DAU = { head: "headache", tooth: "toothache", throat: "sore throat", stomach: "stomach ache" };
const KHUYEN = { toothache: "go to the dentist", headache: "have a rest", "sore throat": "drink warm water" };
// mùa và thời tiết ở Hà Nội (Book map Unit 16 và bài hát, bài đọc của Unit 16), quần áo ấm và quần áo mùa hè
const MUA = { spring: "warm", summer: "hot", autumn: "cool", winter: "cold" };
const AM = ["jumper", "coat", "warm clothes"], HE = ["T-shirt", "shorts", "pair of shorts", "dress", "skirt"];
// truyện của Unit 17 (cặp nhân vật chính) và tính từ → trạng từ
const TRUYEN = { tortoise: "hare", ant: "grasshopper", fox: "crow", "Snow White": "seven dwarfs" };
const TRANG = { good: "well", beautiful: "beautifully", fast: "fast", hard: "hard" };
// phương tiện đi lại (Book map Unit 18): gần → đi bộ; xa mà có xe buýt → xe buýt; xa, không có xe buýt, không có ô tô → taxi
const diBang = ({ xa, buyt }) => (!xa ? "on foot" : buyt ? "by bus" : "by taxi");
// ý kiến về nơi chốn (Book map Unit 19)
const Y_KIEN = { quiet: "peaceful", "fun games": "exciting" };
// đúng/sai của câu theo dữ liệu: đúng một lựa chọn đúng → lựa chọn đó phải đứng đầu
const motDung = (q, dung) => { const d = q.o.filter(dung); assert.equal(d.length, 1, ten.get(q) + ": cần đúng một lựa chọn đúng, có " + d.length + " (" + d.join(" | ") + ")"); return d[0]; };
const docBang = (s) => { const r = {}; s.split("; ").forEach((x) => { const m = /^(\w+) – (.+)$/.exec(x.trim()); assert.ok(m, "đọc được bảng: " + x); r[m[1]] = m[2].split(", "); }); return r; };
const CHECKS = [
  // Unit 11
  { has: "Hien ___ seashells on the beach", right: () => PAST[VIEC.seashells] },
  { has: "She bought some ___ for us: a small lamp and a doll.", right: (q) => motDung(q, (o) => o === "souvenirs" && VIEC[o] === "buy") },
  { has: "– Did you go to Da Lat last summer? – ___ We were at home all summer.", right: (q) => (/were at home all summer/.test(q.q) ? "No, I didn't." : "Yes, I did.") },
  { has: "Look at Hai's weekend in Quy Nhon", right: (q) => {
    const lich = docBang(/: (.+)\. Is each/.exec(q.q)[1]);
    return q.o.map((o) => { const m = /^Hai (\w+) (.+) on (Saturday|Sunday)\.$/.exec(o); assert.ok(m && goc(m[1]), ten.get(q) + ": đọc được ý “" + o + "”");
      return lich[m[3]].includes(goc(m[1]) + " " + m[2]); });
  } },
  { has: "– What did your family do in Vung Tau? – ___", right: () => "We " + PAST[VIEC.seafood] + " seafood." },
  { order: "Did your brother", right: (q) => (q.o.join(" ") === "Did your brother take a lot of photos in Hoi An?" && !goc(q.o[1]) ? q.o[0] : null) },
  { has: "around Ha Long ___", right: () => NOI["Ha Long"] },
  { has: "___ (see) some interesting places", right: () => PAST[VIEC["interesting places"]] },
  { has: "Did they eat seafood on Sunday?", right: (q) => { const ngay = /On (\w+), they ate seafood/.exec(q.q)[1];
    return ngay === "Sunday" ? "Yes, they did. They ate it on Sunday." : `No, they didn't. They ate it on ${ngay}.`; } },
  // Unit 12
  { has: "I'll ___ my room. I'll put some flowers and pictures on the wall.", right: () => "decorate" },
  { has: "– Will you make spring rolls for Tet? – ___ My grandmother will make them.", right: (q) => (/My grandmother will make them/.test(q.q) ? "No, I won't." : "Yes, I will.") },
  { has: "They're square and green, and we eat them at Tet.", right: () => "banh chung" },
  { match: "Where will you go at Tet?", right: (q) => (/^To my /.test(q.r[0]) && /^Will you /.test(q.l[1]) && q.r[1] === "Yes, I will." && /^What will your dad buy/.test(q.l[2])
    && q.r[2] === "A branch of peach blossoms." && !/^(To |Yes|A branch)/.test(q.r[3]) ? q.r[0] : null) },
  { has: "we'll watch a ___ show in the evening", right: () => "fireworks" },
  { has: "– Where will your family go at Tet? – ___", right: (q) => motDung(q, (o) => /^We'll go to a [a-z ]+\.$/.test(o)) },
  // Unit 13
  { has: "give flowers to our teachers", right: () => "Teachers' Day" },
  { has: "– What drinks will you have at the party? – We'll have ___.", right: (q) => motDung(q, (o) => DO_UONG.includes(o)) },
  { odd: "burgers", nhom: { food: DO_AN, drink: DO_UONG } },
  { has: "Class 5D's party menu", right: (q) => `They'll have ${/Drinks: ([^.]+)\./.exec(q.q)[1].split(", ").join(" and ")}.` },
  { has: "Look at the activities for Children's Day at Hoa Mai School", right: (q) => {
    const lich = docBang(/: (morning.+)\. Is each/.exec(q.q)[1]);
    return q.o.map((o) => { const m = /^(?:The pupils|They) will (sing|dance|play games|eat pizza) in the (morning|afternoon)\.$/.exec(o); assert.ok(m, ten.get(q) + ": đọc được ý “" + o + "”");
      return lich[m[2]].some((v) => v === m[1] || v.split(" and ").includes(m[1]) || v.startsWith(m[1] + " ") || v.split(" and ").some((x) => x.startsWith(m[1]))); });
  } },
  { order: "What food", right: (q) => (q.o.join(" ") === "What food will your class have on Children's Day?" ? q.o[0] : null) },
  // Unit 14
  { has: "She does ___ every morning.", right: (q) => motDung(q, (o) => DO.includes(o)) },
  { has: "She eats a lot of ___ and fruit.", right: (q) => motDung(q, (o) => LANH.includes(o)) },
  { has: "My grandfather does morning ___", right: () => DO[1].split(" ")[1] },
  { has: "– How does Mr Hung stay healthy? – ___", right: (q) => motDung(q, (o) => /^He (plays|does|eats|drinks) [a-z ]+\.$/.test(o)) },
  { match: "How does your mum stay healthy?", right: (q) => (/^She (plays|does|eats|drinks) [a-z ]+\.$/.test(q.r[0]) && /^Does she /.test(q.l[1]) && q.r[1] === "Yes, she does."
    && /^Is your brother /.test(q.l[2]) && q.r[2] === "Yes, he is." && !/^(She |Yes, she|Yes, he)/.test(q.r[3]) ? q.r[0] : null) },
  { has: "– How does Kim stay healthy? – ___", right: (q) => motDung(q, (o) => /^She (plays|does|eats|drinks) [a-z ]+\.$/.test(o)) },
  { has: "How often does Anh play badminton?", right: (q) => hoa(TAN(soNgay(/“([^”]+)”/.exec(q.q)[1].split(". ").find((c) => /badminton/.test(c))))) + "." },
  { has: "Bao goes swimming on Mondays and Saturdays", right: (q) => motDung(q, (o) => {
    const m = /^Bao (plays football|goes swimming) (once a week|twice a week|three times a week|every day)\.$/.exec(o); assert.ok(m, ten.get(q) + ": đọc được ý “" + o + "”");
    const cau = /“([^”]+)”/.exec(q.q)[1].split(". ").find((c) => c.includes(m[1].split(" ")[1])); return TAN(soNgay(cau)) === m[2];
  }) },
  { has: "How often does Thu play table tennis?", right: (q) => hoa(TAN(soNgay(q.q.split(" – ")[0]))) + "." },
  // Unit 15
  { has: "My head hurts. I have a ___.", right: () => DAU.head },
  { has: "I ate too much food at the party. Now I have a ___.", right: () => DAU.stomach },
  { odd: "medicine", nhom: { problem: Object.values(DAU), thing: ["medicine"] } },
  { has: "– My teeth hurt. What should I do? – ___", right: () => "You should " + KHUYEN[DAU.tooth] + "." },
  { has: "Phong has a toothache. His mother says, “You ___ eat a lot of sweets.”", right: () => (KHONG_LANH.includes("sweets") ? "shouldn't" : "should") },
  { match: "What's the matter?", right: (q) => (/^My (head|tooth|throat|stomach) hurts\.$/.test(q.r[0]) && q.l[1] === "What should I do?" && /^(Have a rest|Drink warm water|Go to the dentist|Take some medicine)\.$/.test(q.r[1])
    && /^Are you OK/.test(q.l[2]) && /^Yes, I'm fine/.test(q.r[2]) && !/hurts|rest|fine|water|dentist|medicine/.test(q.r[3]) ? q.r[0] : null) },
  // Unit 16
  { has: "in Ha Noi in ___? – It's cool and cloudy.", right: () => Object.keys(MUA).find((m) => MUA[m] === "cool") },
  { has: "It's very cold today, so I'll wear a ___ over my T-shirt.", right: (q) => motDung(q, (o) => AM.includes(o)) },
  { has: "we often go swimming in summer because it's very ___.", right: (q) => motDung(q, (o) => o === MUA.summer) },
  { has: "Look at Lan's clothes", right: (q) => {
    const lich = docBang(/: (spring.+)\. Is each/.exec(q.q)[1]);
    return q.o.map((o) => { const m = /^Lan wears (?:a )?([A-Za-z-]+) in (\w+)\.$/.exec(o); assert.ok(m, ten.get(q) + ": đọc được ý “" + o + "”");
      return lich[m[2]][0].split(" and ").some((x) => x.replace(/^an? /, "") === m[1]); });
  } },
  { has: "Weather in Da Lat this week", right: (q) => { const lich = docBang(/this week: ([^”]+)\.”/.exec(q.q)[1]); return `On ${Object.keys(lich).find((d) => lich[d][0].split(" and ").includes("warm"))}.`; } },
  { has: "What does Hoa usually wear in winter?", right: (q) => (MUA.winter === "cold" && /It's cold/.test(q.q) && AM.includes("warm clothes") ? "She wears warm clothes." : null) },
  // Unit 17
  { has: "They're the tortoise and the ___. The tortoise won the race.", right: () => TRUYEN.tortoise },
  { has: "the ___ sang all summer and didn't work", right: () => Object.keys(TRUYEN).map((k) => TRUYEN[k]).find((v) => v === "grasshopper") },
  { has: "My grandfather is a good cook. He cooks very ___.", right: () => TRANG.good },
  { has: "– How did your friend sing at the school party? – She sang ___.", right: () => TRANG.beautiful },
  { has: "She ran very ___, and she won!", right: () => TRANG.fast },
  { has: "The story is about a rabbit and a tiger.", right: (q) => { const m = /about a (\w+) and a (\w+)\./.exec(q.q); return `They're the ${m[1]} and the ${m[2]}.`; } },
  // Unit 18
  { has: "How can I get to Ngo Mon Square from here?", right: (q) => hoa(diBang({ xa: !/very near/.test(q.q) })) + "." },
  { has: "– Where do you want to visit? – ___", right: (q) => motDung(q, (o) => /^I want to visit [A-Z][A-Za-z ]+\.$/.test(o)) },
  { match: "Where do you want to visit?", right: (q) => (/^[A-Z][A-Za-z ]+\.$/.test(q.r[0]) && /^How can (I|we) get there\?$/.test(q.l[1]) && /^(By (bicycle|bus|taxi)|On foot)\.$/.test(q.r[1])
    && q.l[2] === "Is it far from here?" && q.r[2] === "No, it isn't." && !/^(By |On foot|No, it)/.test(q.r[3]) ? q.r[0] : null) },
  { has: "The zoo is far from Duy's house.", right: (q) => `They can get there ${diBang({ xa: /is far/.test(q.q), buyt: !/no bus/.test(q.q) })}.` },
  { has: "Kim wants to visit the city museum and the water park today.", right: (q) => {
    const xa = { museum: !/museum is near/.test(q.q), "water park": /water park is far/.test(q.q) }, buyt = { museum: false, "water park": /bus to it/.test(q.q) };
    return motDung(q, (o) => { let m;
      if ((m = /^She can get to the (museum|water park) (on foot|by bus|by taxi)\.$/.exec(o))) return diBang({ xa: xa[m[1]], buyt: buyt[m[1]] }) === m[2];
      if ((m = /^She can't walk to the (museum|water park)\.$/.exec(o))) return xa[m[1]];
      if (/^She wants to visit the zoo\.$/.test(o)) return false;
      assert.fail(ten.get(q) + ": chưa đọc được ý “" + o + "”"); });
  } },
  { order: "How can", right: (q) => (/^How can (I|we) get to [A-Z][A-Za-z ]+\?$/.test(q.o.join(" ")) ? q.o[0] : null) },
  // Unit 19
  { has: "What do you think of Tuyen Lam Lake?", right: (q) => (/It's quiet/.test(q.q) ? Y_KIEN.quiet : null) },
  { has: "One hundred and forty is ___.", right: (q) => String(soTuChu(q.q.replace(" is ___.", ""))) },
  { has: "There are a lot of fun games there. They think it's ___.", right: () => Y_KIEN["fun games"] },
  { has: "How far is it from Thanh's home to the lake?", right: (q) => `It's about ${docSo(+/to the lake – about (\d+) kilometres/.exec(q.q)[1])} kilometres.` },
  { has: "Look at Duc's notes", right: (q) => {
    const km = {}; q.q.replace(/home – the (\w+(?: \w+)?): about (\d+) kilometres/g, (_, noi, so) => (km[noi] = +so));
    return q.o.map((o) => { let m;
      if ((m = /^It's about ([a-z -]+) kilometres from (?:Duc's|his) home to the (\w+(?: \w+)?)\.$/.exec(o))) return km[m[2]] === soTuChu(m[1]);
      if ((m = /^The (\w+(?: \w+)?) is about ([a-z -]+) kilometres from his home\.$/.exec(o))) return km[m[1]] === soTuChu(m[2]);
      assert.fail(ten.get(q) + ": chưa đọc được ý “" + o + "”"); });
  } },
  { has: "What do you think of the old buildings in Hue?", right: (q) => (/buildings/.test(q.q) ? "I think they're beautiful." : "I think it's beautiful.") },
  // Unit 20
  { has: "we're going to visit Phong Nha ___", right: () => NOI["Phong Nha"] },
  { has: "I'm going to stay in a tent in the forest.", right: () => "go camping" },
  { has: "she's going to ___ a music club", right: () => "join" },
  { has: "– What are you going to do this summer? – ___", right: (q) => motDung(q, (o) => { const m = /^I'm going to ([a-z]+) [a-z ]+\.$/.exec(o); return !!m && m[1] !== "visit" && !goc(m[1]); }) },
  { has: "– Where are you going to visit this summer? – ___", right: (q) => motDung(q, (o) => /^I'm going to visit [A-Z][A-Za-z ]+\.$/.test(o)) },
  { match: "Where are you going to visit this summer?", right: (q) => (/^[A-Z][a-z]+ [A-Z][a-z]+ (Island|Cave|River)\.$/.test(q.r[0]) && /^What are you going to do there\?$/.test(q.l[1])
    && /^(Visit|Go|Join|Practise) [a-z -]+\.$/.test(q.r[1]) && /^Who are you going with\?$/.test(q.l[2]) && /^With my [a-z]+\.$/.test(q.r[2]) && !/^(Visit|Go|Join|With)/.test(q.r[3]) ? q.r[0] : null) },
  // Reading: đáp án lấy từ chữ của đoạn đọc
  { has: "Where did the elephant and the bird live?", right: () => (/lived near a river in a big forest/.test(PSG.elephant.text) ? "Near a river in a forest." : null) },
  { has: "The elephant fell into the river.", right: () => /the elephant fell into the river/i.test(PSG.elephant.text) },
  { has: "Why did the bird sing for the elephant every morning?", right: () => (/The elephant came and helped her/.test(PSG.elephant.text)
    && /After that, she sang a song for the elephant every morning/.test(PSG.elephant.text) ? "Because the elephant helped her." : null) },
  { has: "When is Sports Day at Lan's school?", right: () => (/^Next Friday is Sports Day at Lan's school/.test(PSG.sportsday.text) ? "Next Friday." : null) },
  { has: "Read the text again. Is each sentence true or false?", unit: "sportsday", right: (q) => { const t = PSG.sportsday.text; return q.o.map((o) => ({
    "The pupils will play games in the park.": / play games in the park/.test(t), "Lan will play basketball in the morning.": /In the morning, Lan will play basketball/.test(t),
    "Lan's grandparents will come to the school.": /Lan's grandparents will come to the school/.test(t), "The girls will play football in the afternoon.": /the girls will play football/.test(t) })[o]); } },
  { has: "What will Lan do on Sports Day?", right: () => (/Lan will play basketball with her class, and then she will run in a race/.test(PSG.sportsday.text) ? "She'll play basketball and run in a race." : null) },
  { has: "How did Nhi's family get to Hue?", right: () => (/We came here by train/.test(PSG.hue.text) ? "By train." : null) },
  { has: "Nhi thinks Thien Mu Pagoda is beautiful.", right: () => /Thien Mu Pagoda\. I think it's very beautiful/.test(PSG.hue.text) },
  { has: "In the letter, today is Monday. When is Nhi's family going to take the boat trip?", right: () => { const NGAY = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    assert.ok(/Tomorrow, we're going to take a boat trip/.test(PSG.hue.text)); return `On ${NGAY[(NGAY.indexOf("Monday") + 1) % 7]}.`; } }
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
const gocChu = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
{
  const caFile = BANKS.filter((b) => b.file === "5-ta.js" && !Object.values(S).includes(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ q, at: b.id })))
    .concat(kho.map((q) => ({ q, at: ten.get(q) })));
  const k = (q) => gocChu(q.q + (q.o ? q.o.join("|") : "") + (q.l ? q.l.join("|") : ""));
  kho.forEach((q) => { const cung = caFile.filter((e) => e.q !== q && k(e.q) === k(q)).map((e) => e.at); assert.deepEqual(cung, [], "đề bài trùng: " + ten.get(q) + " ~ " + cung.join(", ")); });
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
   Như tests/ta5-ck1.js. Rút cùng lúc: đề ngẫu nhiên rút một câu mỗi ô, nên hai câu khác ô có thể cùng đề; đề “Ôn chủ đề” lấy hết câu của
   một Unit (Unit nào cũng dưới 10 câu), nên mọi cặp câu cùng Unit cũng rút cùng lúc. Chỉ hai câu của hai đoạn đọc khác nhau là không bao
   giờ cùng đề (rút trọn một đoạn). Mọi đoạn đọc đi cùng mọi câu không phải Reading. Chữ cần dò của đáp án (lựa chọn đúng, đáp án điền, ô
   phải của từng cặp nối, cả câu của câu sắp xếp), so cả từ, bỏ đuôi -s, -es, -ed, -ing, -e, giữ số: đáp án một từ thì từ đó, từ ngữ pháp có
   ở mọi câu (NGU_PHAP: shouldn't, won't…) chỉ dò ở câu cùng Unit; đáp án 2–3 từ thì cả cụm; đáp án là câu thì các chuỗi 3 từ liền nhau
   không có ở lựa chọn sai, ô phải khác của câu đó (phần làm câu đó đúng); câu sắp xếp: các chuỗi 4 từ liền nhau của cả câu. Chữ của câu
   kia: đề bài, đáp án, lời giải, ý của câu đúng/sai, mảnh của câu sắp xếp, ô nối, đoạn đọc (lựa chọn sai của câu trắc nghiệm không tính,
   Rút ra N25); riêng đáp án câu điền dò cả lựa chọn sai của câu kia (học sinh chép được chữ đúng; Rút ra N9-gk1-ta). Đáp án câu Reading
   dò ở các câu không phải Reading và câu cùng đoạn (không dò trong chính đoạn đọc của nó). Đáp án không lặp từ (trừ từ ngữ pháp) của
   chính đề bài câu điền khuyết (Rút ra N12). */
const NGU_PHAP = new Set(("a an the of to in on at for from with by about and or but so than as if when while because before after " +
  "is are was were be been am have has had do does did will would can could should must might may not no i you he she it we they me " +
  "him her us them my your his its our their this that these those there here what where who whose how which why yet since ago already " +
  "ever never just very too more most all some any one every each other also up out down off around away into over weren't wasn't " +
  "didn't don't doesn't isn't aren't can't i'm it's he's she's they're we're i'd he'd won't shouldn't i'll we'll you'll they'll he'll she'll").split(" "));
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
// đã xem tay (dòng của tests/soat-nhap.js, công cụ dò cả lựa chọn sai của câu kia): on foot, twice a week, once a week, headache,
// stomach ache là lựa chọn sai của câu cùng Unit (các câu Unit 14, 15, 18 cùng hỏi tần suất, bệnh, phương tiện; lựa chọn sai không chỉ ra
// câu kia đúng ở lựa chọn nào); get to the là khung câu How can … get to the …? có ở đề bài câu Unit 18 khác.
const DA_XEM = ["ck2-de1#18 → ck2-de1#17: on foot", "ck2-de2#18 → ck2-de1#17: on foot", "ck2-de1#18 → ck2-de2#18: get to the",
  "ck2-de2#10 → ck2-de1#10: twice a week", "ck2-ngau-nhien#10 → ck2-de1#10: twice a week", "ck2-de1#10 → ck2-de2#10: once a week",
  "ck2-de2#11 → ck2-de1#11: headache", "ck2-ngau-nhien#11 → ck2-de1#11: headache", "ck2-de1#11 → ck2-de2#11: stomach ache"];
assert.deepEqual(lo.filter((s) => !DA_XEM.includes(s)), [], "đáp án có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = cauCua("Hien ___ seashells on the beach"), b = cauCua("around Ha Long ___");
  assert.ok(doLo([b, Object.assign({}, a, { x: a.x + " They took a boat trip around the bay." })], (q) => q.topic).some((s) => /: bay$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
  const c = cauCua("Phong has a toothache. His mother says"), e = cauCua("– My teeth hurt. What should I do?");
  assert.ok(doLo([c, Object.assign({}, e, { q: "– Can I eat a lot of sweets? – No, you shouldn't." })], (q) => q.topic).some((s) => /: shouldn't$/.test(s)), "bộ dò phải bắt được từ ngữ pháp ở câu cùng Unit");
  const f = cauCua("she's going to ___ a music club"), g = cauCua("I'm going to stay in a tent");
  assert.ok(doLo([f, Object.assign({}, g, { o: g.o.concat(["join a music club"]) })], (q) => q.topic).some((s) => /: join$/.test(s)), "bộ dò phải bắt được đáp án câu điền ở lựa chọn sai của câu khác");
  const h = cauCua("___ (see) some interesting places");
  assert.ok(doLo([h, Object.assign({}, cauCua("Look at Hai's weekend in Quy Nhon"), { q: "Hai saw the sea." })], (q) => q.topic).some((s) => /: saw$/.test(s)), "bộ dò phải bắt được dạng quá khứ là đáp án");
}

/* ---------- từ đã học, không chép sách: so với chữ OCR, nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ (như tests/ta5-ck1.js): băm mọi chuỗi k từ của chữ đã chuẩn hoá, chỉ so thật (includes) khi băm có
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
// lời dặn chuẩn của đề Tiếng Anh (mục 3.2 của docs/KE-HOACH-NOI-DUNG.md; 9 dòng đầu) và mẫu câu của Book map tập hai (sách dạy đúng các câu
// này; bỏ khi so chuỗi với sách và với kho khác): không so
const LOI_DAN = ["Put the words in the correct order.", "Read the text. Then answer the questions.", "Read the text again. Is each sentence true or false?",
  "Match the questions with the answers.", "Fill in the blank with one word.", "Write the correct form of the verb in brackets.", "Choose the odd one out.",
  "Choose the correct sentence.", "Is each sentence true or false?",
  "What did your family do in", "Where will you go at Tet?", "What drinks will you have at the party?", "What food will you have at the party?",
  "How does he stay healthy?", "How does she stay healthy?", "What's the matter?", "What should I do?", "How's the weather in Ha Noi in",
  "What do you usually wear in", "Who are the main characters in the story?", "Where do you want to visit?", "How can I get to", "What do you think of",
  "How far is it from", "Where are you going to visit this summer?", "What are you going to do this summer?"];
const boLoiDan = (s) => LOI_DAN.slice(0, 9).reduce((t, l) => t.split(l).join(" | "), String(s));
const MAU = LOI_DAN.map((x) => " " + khongDau(x) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; MAU.forEach((x) => { while (t.includes(x)) t = t.replace(x, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|")) ra.push(c.join(" ")); } return ra; };
const truong = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], q.l || [], q.r || [], q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].text] : []);
if (SACH.length) {
  const f5a = SACH.find((f) => /lop-5[\\/]tieng-anh-5-tap-1[\\/]/.test(f)), f5 = SACH.find((f) => /lop-5[\\/]tieng-anh-5-tap-2[\\/]/.test(f));
  const f4 = SACH.filter((f) => /lop-4[\\/]tieng-anh-4-tap-[12][\\/]/.test(f));
  assert.ok(f5a && f5 && f4.length === 2, "OnUp-Book có Tiếng Anh 5 hai tập, Tiếng Anh 4 hai tập");
  // tên Unit theo mục lục trong README của cuốn (chép từ Book map, người đã soát)
  const mucLuc = fs.readFileSync(path.join(path.dirname(f5), "README.md"), "utf8");
  UNITS.forEach((u, i) => assert.ok(mucLuc.toLowerCase().includes(`unit ${i + 11}. ${u.toLowerCase()} |`), `mục lục ghi Unit ${i + 11}. ${u}`));
  // trang của sách lớp 5 tập hai theo trang in; Unit N bắt đầu ở BAT_DAU[N - 11] (Book map); Review 3 tr. 36, Review 4 tr. 70; Wordlist tr. 74–75
  const trangCua = (f) => { const raw = fs.readFileSync(f, "utf8"), parts = raw.split(/=== page-\d+ · ([^=]+) ===/), trang = {};
    for (let i = 1; i < parts.length; i += 2) { const m = /trang in (\d+)/.exec(parts[i]); if (m) trang[+m[1]] = (trang[+m[1]] || "") + parts[i + 1]; } return trang; };
  const trang = trangCua(f5), trang1 = trangCua(f5a);
  const BAT_DAU = [6, 12, 18, 24, 30, 40, 46, 52, 58, 64, 70], WORDLIST = trang[74] + " " + trang[75];
  const trangDen = (tu0, den) => { let s = ""; for (let t = tu0; t < den; t++) s += " " + (trang[t] || ""); return s; };
  // Book map (tr. 4–5) của từng Unit: từ vựng, mẫu câu; chữ OCR của Book map lẫn các cột, nên chép lại ở đây (đã xem ảnh page-006,
  // page-007) và kiểm tra có trong chữ OCR
  const BOOK_MAP = { 11: "buy souvenirs collect seashells eat seafood see some interesting places take a boat trip around the bay walk on the beach",
    12: "buy roses buy a branch of peach blossoms decorate the house do the shopping make banh chung make spring rolls fireworks show flower festival New Year party",
    13: "at Mid-Autumn Festival on Children's Day on Sports Day on Teachers' Day apple juice burgers milk tea pizza",
    14: "do morning exercise do yoga drink fresh juice eat healthy food eat vegetables play sports every day once a week three times a week twice a week",
    15: "headache sore throat stomach ache toothache drink warm water go to the dentist have a rest take some medicine",
    16: "autumn spring summer winter cold cool hot warm blouse jeans jumper trousers",
    17: "ant crow dwarfs fox grasshopper hare Snow White tortoise cook well run fast sing beautifully work hard",
    18: "Dragon Bridge Ha Noi Opera House Ho Chi Minh City Museum Ngo Mon Square by bicycle by bus by taxi on foot",
    19: "beautiful exciting fantastic peaceful twenty-nine forty hundred",
    20: "Dam Sen Aquarium Huong River Phong Nha Cave Phu Quoc Island go camping join a music club practise swimming visit an eco-farm" };
  // chữ OCR của Book map đọc sai vài từ (đã xem ảnh trang); null: chữ OCR bỏ sót
  const OCR_BM = { see: "Se@some", Children: null, "Children's": null, "Teachers'": null, "twenty-nine": "29", forty: "40", hundred: "100" };
  const ocrBM = " " + khongDau(trang[4] + trang[5]) + " ";
  const thieuBM = Object.entries(BOOK_MAP).flatMap(([u, s]) => s.split(" ").filter((w) => OCR_BM[w] !== null && !ocrBM.includes(" " + khongDau(OCR_BM[w] || w) + " ")).map((w) => `Unit ${u}: ${w}`));
  assert.deepEqual(thieuBM, [], "từ chép ở BOOK_MAP phải có trong chữ OCR của Book map (tr. 4–5)");
  // từ vựng là đáp án (bảng TU): có trong trang của đúng Unit (cộng Wordlist, Book map của Unit đó)
  const TU = { 11: ["souvenirs", "Bay"], 12: ["decorate", "banh chung", "fireworks"], 13: ["Teachers' Day", "milk tea", "burgers"], 14: ["yoga", "vegetables", "exercise"],
    15: ["headache", "stomach ache", "medicine"], 16: ["autumn", "jumper", "hot"], 17: ["hare", "well", "grasshopper", "beautifully", "fast"],
    19: ["peaceful", "exciting"], 20: ["Cave", "go camping", "join"] };
  const chuUnit = (u) => (trangDen(BAT_DAU[u - 11], BAT_DAU[u - 10]) + " " + WORDLIST + " " + BOOK_MAP[u]).toLowerCase().replace(/[’]/g, "'").replace(/\s+/g, " ");
  Object.entries(TU).forEach(([u, ws]) => { const c = chuUnit(+u); ws.forEach((t) => assert.ok(c.includes(t.toLowerCase().replace(/ing$/, "").replace(/!$/, "")), `từ “${t}” không có trong trang của Unit ${u}`)); });
  kho.filter((q) => unitOf(q) && (q.type === "mc" || q.type === "fill")).forEach((q) => {
    const d = q.type === "mc" ? q.o[0] : q.ans[0];
    if (/^[A-Za-z!' ]+$/.test(d) && d.split(" ").length <= 3 && !/'s$/.test(d) && !/^(No|Yes|She|He|We|They|It|I)\b/.test(d) && !Object.values(PAST).includes(d) && !/^(shouldn't|won't|didn't)$/.test(d))
      assert.ok((TU[unitOf(q)] || []).includes(d), `${ten.get(q)}: đáp án từ vựng “${d}” chưa có trong bảng TU của Unit ${unitOf(q)}`);
  });
  // từ đã học: câu của Unit N chỉ dùng từ có trong sách Tiếng Anh 4 hai tập, cả sách Tiếng Anh 5 tập một (cùng Book map đã chép ở
  // tests/ta5-ck1.js), các trang tập hai từ Unit 11 đến hết Unit N, Book map tập hai đến Unit N; câu Reading dùng được mọi từ của tập
  // hai. LOP3: từ của Global Success 3 không có trong chữ OCR (hình vẽ không có chữ), như tests/ta5-ck1.js
  const LOP3 = "cat dog bird rabbit fish goldfish parrot elephant tiger monkey ruler pencil pen eraser book books notebook bag desk chair table lamp window door bed kitchen bedroom bathroom living room yard gate pond tree toy toys doll kite car ball robot teddy bear ship train plane bus bike rice bread milk water juice chicken meat egg eggs mother father mum dad brother sister grandmother grandfather grandma grandpa family friend friends cook cooking driver doctor nurse worker farmer singer teacher red blue green yellow pink orange black white brown purple colour head face eyes ears nose mouth hand hands arm leg legs hair swim swimming sing singing dance dancing draw drawing paint painting run running walk walking read reading write writing skate skating cycling chess football basketball volleyball badminton music room art room gym playground library classroom school hello hi goodbye bye thank thanks yes no please sorry fine name old years how many sit stand open close".split(" ");
  // chữ dùng trong lời giải để gọi tên phần của câu (sách dùng ở lời dặn: “Read and answer”, “Make a sentence”, “Look and write”)
  const META = "v ing ed text word words thing things person means say says tells asks answer answers question questions sentence add use past job country reason more than one becomes form".split(" ");
  const NAMES = "hien quy nhon hai hung vung tau hoi an da lat khanh hoa mai tet duy ngo mon tuyen lam thanh phong nha huong quoc phu nhi mia thien mu lan kim bao anh thu son duc vy dragon".split(" ");
  const tuSach = (s) => new Set(s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z' -]+/g, " ").split(/[\s-]+/).map((w) => w.replace(/^'+|'+$/g, "")).filter(Boolean));
  const L4 = tuSach(f4.map((f) => fs.readFileSync(f, "utf8")).join(" "));
  const TAP1 = tuSach(Object.values(trang1).join(" "));
  const BM1 = "city class countryside dolphin pink sandwich table tennis yourself favourite building flat house tower address twenty-three thirty-eight ninety-three fifteen sixteen nationality American Australian Japanese Malaysian active clever friendly helpful go for a walk play the violin surf the Internet water the flowers always often sometimes usually free time weekend firefighter gardener reporter writer grow flowers report the news teach children write stories teacher dentist future first floor ground floor second floor third floor go along go downstairs go past go upstairs computer room do projects play games read books solve maths problems fun good for group work interesting useful school activity solving reading above beside in front of under crayon glue stick pencil sharpener set square whose aquarium campsite funfair theatre dance around the campfire listen to music play chess watch the fish cinema bakery Ba Na Hills Bai Dinh Pagoda Hoan Kiem Lake Suoi Tien Theme Park plant trees play games visit the old buildings walk around the lake November December";
  const hocDen = (u) => { const s = tuSach(trangDen(6, u ? BAT_DAU[u - 10] : 76) + " " + Object.entries(BOOK_MAP).filter(([k]) => !u || +k <= u).map(([, v]) => v).join(" ") + " " + BM1 + " " + (u ? "" : WORDLIST));
    L4.forEach((w) => s.add(w)); TAP1.forEach((w) => s.add(w)); LOP3.concat(META, NAMES).forEach((w) => s.add(w)); return s; };
  const HOC = { 0: hocDen(0) }; for (let u = 11; u <= 20; u++) HOC[u] = hocDen(u);
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

/* ---------- không gần trùng câu của kho Tiếng Anh 4 và kho Tiếng Anh 5 cuối kì I (lời giao việc; như tests/ta5-ck1.js) ----------
   Đề bài cùng lựa chọn, ô nối, ô sắp xếp có từ 4 cặp hai từ liền nhau chung với một câu của data/banks/4-ta.js hay của kho ta5-ck1-* và số
   cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Bỏ lời dặn chuẩn, mẫu câu của Book map (LOI_DAN) và cặp có ở từ 3% số câu. */
{
  const cap2 = (s) => { let t = " " + String(s).toLowerCase().replace(/[’]/g, "'") + " "; LOI_DAN.map((x) => x.toLowerCase()).forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^a-z0-9'|]+/g, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const cu = BANKS.filter((b) => b.file === "4-ta.js" || (b.file === "5-ta.js" && !Object.values(S).includes(b.id))).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ q, id: b.id })));
  const ca = cu.map((x) => x.q).concat(kho), df = {};
  const deBai = (q) => [q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ");
  ca.forEach((q) => new Set(cap2(deBai(q))).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capCua = (q) => new Set(cap2(deBai(q)).filter((c) => (df[c] || 0) < 0.03 * ca.length));
  const PC = cu.map((x) => [x, capCua(x.q)]);
  const ganTrung = kho.flatMap((q) => { const c = capCua(q); return PC.map(([x, d]) => { const chung = [...c].filter((y) => d.has(y)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${x.id}: ${x.q.q.slice(0, 60)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Tiếng Anh 4, kho Tiếng Anh 5 cuối kì I:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Tiếng Anh 4 hay kho Tiếng Anh 5 cuối kì I");
}

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const cauKhac = (b, q) => ({ id: b.id, s: " " + [q.q, q.x].concat(q.o || [], q.ans || [], q.l || [], q.r || [], q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const laKho = (b) => Object.values(S).includes(b.id);
  const khac = BANKS.filter((b) => !b.pool && !laKho(b)).flatMap((b) => b.questions.map((q) => cauKhac(b, q)))
    .concat(BANKS.filter((b) => b.pool && !laKho(b)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cauKhac(b, q))));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + d1.n + " + " + d2.n + " câu của hai đề cố định, " + rieng.length + " câu riêng), " + Object.keys(PSG).length
  + " đoạn đọc, " + tf4.length + " câu đúng/sai 4 ý, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("TA5 CK2 OK");
