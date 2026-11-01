// Kiểm tra các đề Ngữ văn thi thử vào 10 (data/banks/9-van.js, van9-vao10-de<N>; Phiên N9-vao10-van: Đề 1–2, N9-vao10-van-b: Đề 3–4;
// phiên N9-vao10-van-c thêm đề rồi mở rộng script này). Đề tính điểm (Phiên K5), khung theo đề minh hoạ tuyển sinh lớp 10 của TP.HCM năm 2026
// (docs/KE-HOACH-NOI-DUNG.md, mục 7, “Khung đề Ngữ văn”). Số đề, số câu lấy từ danh mục (không ghi cứng).
// Kiểm tra từng đề: danh mục (tên, khối, môn, file, 120 phút, pts 10, gắn vào vao10-2027); hai phần đúng tên, đúng thứ tự, mỗi phần
// một đoạn đọc dùng cho mọi câu của phần; Phần I: đọc hiểu 3 điểm (câu chấm tự động pt 0,25–1, nhiều nhất một câu tự luận ngắn
// 0,5–1 điểm) rồi câu viết đoạn văn nghị luận văn học khoảng 200 chữ 2 điểm; Phần II: đọc hiểu 1 điểm rồi câu viết bài văn nghị
// luận xã hội khoảng 500–600 chữ 4 điểm; chủ đề theo kĩ năng, khớp thể loại ghi ở tên đoạn đọc; thang chấm (ý 0,25 hoặc bội của
// 0,5 để chấm được “Một phần”, câu viết 5–7 ý, câu nêu ý kiến 2–3 ý; x của câu viết là dàn ý); note (câu chung về khung TP.HCM, đề
// thật đọc hiểu là tự luận, số điểm chấm tự động và số câu, số điểm tự chấm tính từ dữ liệu); Quiz.grade (điểm từng phần).
// Giữa các đề: mỗi cặp đề (1–2, 3–4, 5–6) Phần I khác thể loại, Phần II một văn bản nghị luận và một văn bản thông tin; thể loại cụ
// thể của văn bản Phần I (truyện, kí: LOAI; thể thơ tính từ số tiếng các dòng) không lặp giữa các đề; vấn đề nghị luận xã hội của mỗi
// đề ghi ở VAN_DE (cụm chữ trong đề bài và từ khoá), không lặp, từ khoá không có ở đề bài câu tự luận nghị luận, nêu ý kiến nào của
// các kho Ngữ văn, Tiếng Việt khác và của các đề thi thử khác; đúng/sai 4 ý không lặp kiểu Đ/S.
// Đọc lại bằng code: bài thơ người soạn viết (THO: số tiếng mỗi dòng, khổ bốn dòng, kiểu vần chân; cặp tiếng hiệp vần cùng vần,
// cùng thanh bằng hoặc trắc; thơ tự do: số tiếng các dòng, số dòng các khổ không đều), đáp án các câu tính được từ chữ của đoạn đọc
// (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu; ví dụ giờ ghi trong bài du kí theo thứ tự trước sau, năm ghi trong
// văn bản thông tin theo thứ tự và khớp tuổi, số kí hiệu của một ô chữ nổi tính từ số vị trí chấm), mọi câu trích trong «» ở đề bài,
// lựa chọn và lời giải câu chấm tự động có trong đoạn đọc.
// Rồi: đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa
// chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề; đề “Ôn chủ đề” lấy hết câu của chủ đề; dò lộ đáp án (Rút ra N19: chuỗi 3
// từ liền nhau của đáp án; đáp án ngắn thì cả đáp án) giữa mọi cặp câu của một đề (đề cố định: mọi câu cùng ra), ở đề bài, lựa
// chọn, lời giải, thang chấm, note và đoạn đọc phần kia, và giữa các câu cùng chủ đề của các đề khác nhau (đề “Ôn chủ đề” rút
// chung); DO_LO=1 in ra để xem tay, danh sách đã xem ở DA_XEM. Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ (cả đoạn
// đọc, note, thang chấm) với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm: không chuỗi 8 từ nào trùng (DO_SACH=1 in chuỗi 6
// từ); tên văn bản không có trong sách Ngữ văn 6–9. So với mọi câu, đoạn đọc của các kho khác (không chuỗi 8 từ nào trùng; DO_KHO=1
// in chuỗi 5 từ) và giữa các đề thi thử với nhau (đoạn đọc, đề bài, lựa chọn, lời giải; thang chấm và khung đề bài câu viết được
// dùng chung).
// Chạy: node tests/van9-vao10.js → in VAN9 VAO10 OK.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, EVENTS = ctx.window.ONTAP_SEED_EVENTS;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const r2 = (x) => Math.round(x * 100) / 100;
const so = (b) => +/de(\d+)$/.exec(b.id)[1];

/* ---------- khung đề (docs/KE-HOACH-NOI-DUNG.md, mục 7, “Khung đề Ngữ văn”) ---------- */
const P1 = "Phần I. Đọc hiểu và viết đoạn văn", P2 = "Phần II. Đọc hiểu và viết bài văn";
const DOC1 = { truyện: "Đọc hiểu truyện", thơ: "Đọc hiểu thơ", kí: "Đọc hiểu kí" }; // thể loại ghi ở tên đoạn đọc → chủ đề
const DOC2 = ["Đọc hiểu văn bản nghị luận", "Đọc hiểu văn bản thông tin"];
const VIET1 = "Viết đoạn văn nghị luận văn học", VIET2 = "Viết bài văn nghị luận xã hội";
const NOTE0 = "Đề thi thử theo cấu trúc đề tuyển sinh lớp 10 của TP.HCM năm 2026. Tỉnh, thành khác có thể ra đề khác: xem thông báo của Sở.";
// vấn đề nghị luận xã hội của từng đề: [cụm chữ có trong đề bài câu viết bài văn, từ khoá của vấn đề…]; sáu đề không lặp vấn đề.
// Từ khoá có trong đề bài câu viết bài văn của đề và không có ở đề bài câu tự luận nghị luận, nêu ý kiến nào của các kho Ngữ văn,
// Tiếng Việt khác, của các đề thi thử khác (dò ở dưới; đề mới chọn vấn đề chưa có rồi thêm vào đây).
const VAN_DE = {
  "van9-vao10-de1": ["so sánh bản thân với người khác", "so sánh bản thân"],
  "van9-vao10-de2": ["gìn giữ các loại hình nghệ thuật truyền thống", "nghệ thuật truyền thống"],
  "van9-vao10-de3": ["lòng dũng cảm nhận lỗi", "nhận lỗi"],
  "van9-vao10-de4": ["sẻ chia của người trẻ với người khuyết tật", "khuyết tật"]
};
// bài thơ người soạn viết: mã đoạn → [số tiếng mỗi dòng, kiểu vần chân của mọi khổ bốn dòng]; thơ tự do: [0, "tu-do"]
const THO = { "cuoc-goi": [8, "lien"], "ve-phia-lua": [0, "tu-do"] };
const THE = { 6: "Thơ sáu chữ", 7: "Thơ bảy chữ", 8: "Thơ tám chữ" };
// thể loại cụ thể của văn bản truyện, kí ở Phần I (thể thơ thì tính từ THO): các đề không lặp thể loại cụ thể
const LOAI = { "binh-nuoc": "truyện ngắn", "tau-ra-hue": "du kí" };
const LOAI_CUA = { truyện: /^truyện /, kí: /^(du kí|hồi kí|bút kí|tuỳ bút|tản văn)$/ };

const DE = BANKS.filter((b) => /^van9-vao10-de\d+$/.test(b.id)).sort((a, b) => so(a) - so(b));
assert.ok(DE.length >= 2, "có ít nhất hai đề Ngữ văn thi thử vào 10");
DE.forEach((b, i) => assert.equal(so(b), i + 1, "số đề liền nhau từ Đề 1: " + b.id));
const ev = EVENTS.find((e) => e.id === "vao10-2027");
assert.ok(ev && ev.grades.join() === "9" && ev.subjects.includes("Ngữ văn"), "kì thi vao10-2027 của khối 9 có môn Ngữ văn");
const ten = new Map(), deOf = new Map();
DE.forEach((b) => b.questions.forEach((q, i) => { ten.set(q, "de" + so(b) + "#" + (i + 1)); deOf.set(q, b); }));
const ALL = DE.flatMap((b) => b.questions);
const doan = (b, p) => { assert.ok(b.passages && b.passages[p], `${b.id}: không có đoạn ${p}`); return b.passages[p]; };
const theLoai = (ps) => { const m = /\((truyện|thơ|kí|văn bản) người soạn viết\)$/.exec(ps.title); return m && m[1]; };
const tenVanBan = (ps) => ps.title.replace(/\s*\([^()]*\)$/, "");

/* ---------- tiếng, thanh, vần (như tests/van9-gk2.js) ---------- */
const TRAC = /[̣́̉̃]/; // sắc, hỏi, ngã, nặng
const tieng = (s) => String(s).normalize("NFC").replace(/[«»“”"(),.;:!?…–—]/g, " ").split(/\s+/).filter(Boolean);
const thanh = (t) => (TRAC.test(t.normalize("NFD")) ? "T" : "B");
const van = (t) => t.normalize("NFD").replace(/[̣̀́̉̃]/g, "").normalize("NFC").toLowerCase()
  .replace(/^(ngh|ng|gh|gi|kh|ph|th|tr|ch|nh|qu|b|c|d|đ|g|h|k|l|m|n|p|r|s|t|v|x)(?=[aăâeêioôơuưy])/, "");
const hiepVan = (a, b) => van(a) === van(b) && thanh(a) === thanh(b);
const khoTho = (p) => p.text.split(/\n\s*\n/).map((k) => k.split("\n").map((l) => l.trim()).filter(Boolean)).filter((k) => k.length);
const cuoi = (l) => { const w = tieng(l); return w[w.length - 1]; };
const kieuVan = (k) => {
  const c = k.map(cuoi), v = (i, j) => hiepVan(c[i], c[j]);
  if (v(0, 1) && v(2, 3) && !v(1, 2)) return "lien";
  if (v(1, 3) && !v(0, 1) && !v(2, 3)) return "cach";
  return "khac";
};

/* ---------- từng đề: danh mục, phần, điểm, chủ đề, thang chấm, note ---------- */
const SOCHU = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"];
const diem = (x) => String(r2(x)).replace(".", ",");
DE.forEach((b) => {
  const at = b.id, qs = b.questions;
  assert.equal(b.title, `Ngữ văn 9 · Thi thử vào 10 · Đề ${so(b)}`, at + ": tên đề");
  assert.equal(b.grade, 9); assert.equal(b.subject, "Ngữ văn"); assert.equal(b.file, "9-van.js");
  assert.equal(b.minutes, 120, at + ": 120 phút"); assert.equal(b.pts, 10, at + ": thang 10 điểm");
  assert.ok(!b.pool, at + ": đề cố định");
  assert.equal(qs.length, b.n, at + ": n bằng số câu trong file");
  assert.ok(ev.banks.includes(b.id), at + ": gắn vào vao10-2027");
  assert.deepEqual([...new Set(qs.map((q) => q.part))], [P1, P2], at + ": hai phần, đúng tên, đúng thứ tự");
  assert.ok(qs.every((q) => ["mc", "tf4", "fill", "essay"].includes(q.type)), at + ": chỉ dùng trắc nghiệm, đúng/sai 4 ý, điền, tự luận");
  assert.ok(qs.every((q) => [1, 2, 3].includes(q.lv)), at + ": câu nào cũng có lv");
  assert.equal(Object.keys(b.passages || {}).length, 2, at + ": hai văn bản (đoạn đọc)");
  [P1, P2].forEach((P, k) => {
    const pq = qs.filter((q) => q.part === P), ps = [...new Set(pq.map((q) => q.p))];
    assert.equal(ps.length, 1, `${at}, ${P}: mọi câu dùng một đoạn đọc`);
    assert.ok(ps[0], `${at}, ${P}: câu có đoạn đọc`);
    const psg = doan(b, ps[0]), viet = pq[pq.length - 1], doc = pq.slice(0, -1);
    assert.ok(/người soạn viết\)$/.test(psg.title), `${at}, ${P}: văn bản người soạn viết (ngữ liệu ngoài sách giáo khoa)`);
    assert.equal(viet.type, "essay", `${at}, ${P}: câu cuối của phần là câu viết`);
    assert.equal(viet.topic, k ? VIET2 : VIET1, `${at}, ${P}: chủ đề câu viết`);
    assert.equal(viet.pt, k ? 4 : 2, `${at}, ${P}: điểm câu viết`);
    assert.ok(k ? /khoảng 500–600 chữ/.test(viet.q) : /khoảng 200 chữ/.test(viet.q), `${at}, ${P}: dung lượng câu viết`);
    assert.ok(k ? /^Từ văn bản|Từ văn bản/.test(viet.q) : viet.q.includes("«" + tenVanBan(psg) + "»"), `${at}, ${P}: câu viết gắn với văn bản của phần`);
    assert.ok(/^Dàn ý gợi ý:\n/.test(viet.x) && viet.x.length > 600, `${at}, ${P}: câu viết có dàn ý gợi ý`);
    assert.ok(viet.rubric.length >= 5 && viet.rubric.length <= 7, `${at}, ${P}: câu viết có 5–7 ý chấm`);
    assert.equal(r2(sum(doc.map((q) => q.pt))), k ? 1 : 3, `${at}, ${P}: điểm đọc hiểu`);
    const tp = [...new Set(doc.map((q) => q.topic))];
    assert.equal(tp.length, 1, `${at}, ${P}: các câu đọc hiểu cùng một chủ đề`);
    if (k) assert.ok(DOC2.includes(tp[0]) && theLoai(psg) === "văn bản", `${at}: Phần II là văn bản nghị luận hoặc văn bản thông tin`);
    else assert.equal(tp[0], DOC1[theLoai(psg)], `${at}: chủ đề Phần I khớp thể loại ghi ở tên đoạn đọc`);
    const ngan = doc.filter((q) => q.type === "essay"), tu = doc.filter((q) => q.type !== "essay");
    assert.ok(ngan.length <= 1, `${at}, ${P}: nhiều nhất một câu tự luận ngắn`);
    ngan.forEach((q) => {
      assert.ok(q.pt >= 0.5 && q.pt <= 1 && q.lv === 3, `${at}, ${P}: câu tự luận ngắn 0,5–1 điểm, mức Vận dụng`);
      // app tự ghi “Gợi ý:” trước x, nên x của câu tự luận ngắn không mở đầu bằng chữ đó
      assert.ok(/khoảng 3–5 câu/.test(q.q) && !/^(Dàn ý )?[Gg]ợi ý:/.test(q.x) && q.x.length > 150 && q.rubric.length >= 2 && q.rubric.length <= 3, `${at}, ${P}: câu tự luận ngắn (3–5 câu, 2–3 ý chấm, có gợi ý)`);
    });
    assert.ok(tu.length >= 2 && tu.every((q) => q.pt >= 0.25 && q.pt <= 1), `${at}, ${P}: câu chấm tự động 0,25–1 điểm`);
    assert.ok(tu.some((q) => q.lv === 1) && tu.some((q) => q.lv === 2), `${at}, ${P}: đọc hiểu có câu Biết và câu Hiểu`);
  });
  qs.filter((q) => q.type === "essay").forEach((q) => {
    assert.equal(q.lv, 3, at + ": câu tự luận mức Vận dụng");
    q.rubric.forEach((r) => assert.ok(r.p === 0.25 || Number.isInteger(r.p * 2), `${at}: ý chấm ${r.p} điểm (0,25 hoặc bội của 0,5 để chấm được «Một phần»): ${r.c.slice(0, 50)}`));
  });
  // note: câu chung, đề thật đọc hiểu là tự luận, điểm chấm tự động và câu tự luận tính từ dữ liệu, thể loại hai văn bản
  const G = Quiz.grade(qs, []), ess = qs.filter((q) => q.type === "essay");
  assert.ok(b.note.startsWith(NOTE0), at + ": note mở đầu bằng câu chung về khung đề TP.HCM");
  assert.ok(/Ở đề thật, câu đọc hiểu là câu tự luận/.test(b.note), at + ": note ghi đề thật đọc hiểu là câu tự luận");
  const m = /app chấm tự động [^(]*\(([\d,]+) điểm\), còn (\S+) câu tự luận \(([\d,]+) điểm\)/.exec(b.note);
  assert.ok(m, at + ": note ghi phần chấm tự động và phần tự chấm");
  assert.deepEqual([m[1], m[2], m[3]], [diem(G.auto), SOCHU[ess.length], diem(sum(ess.map((q) => q.pt)))], at + ": số điểm, số câu trong note khớp dữ liệu");
  const t1 = qs.find((q) => q.part === P1).topic, t2 = qs.find((q) => q.part === P2).topic;
  assert.ok(b.note.includes(t1 === DOC1.thơ ? "đọc hiểu một bài thơ" : t1 === DOC1.truyện ? "đọc hiểu một truyện" : "đọc hiểu một bài kí"), at + ": note ghi thể loại văn bản Phần I");
  assert.ok(b.note.includes(t2 === DOC2[0] ? "đọc hiểu một văn bản nghị luận" : "đọc hiểu một văn bản thông tin"), at + ": note ghi loại văn bản Phần II");
  // chấm như đề thi (Quiz.grade): làm đúng hết câu chấm tự động thì được đủ phần chấm tự động; từng phần 5 điểm
  const dung = qs.map((q) => (q.type === "mc" ? 0 : q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a.slice() : null));
  const H = Quiz.grade(qs, dung);
  assert.equal(H.max, 10); assert.equal(H.got, H.auto); assert.equal(G.got, 0);
  assert.deepEqual(H.parts.map((x) => [x.part, x.max]), [[P1, 5], [P2, 5]], at + ": mỗi phần 5 điểm");
  // vấn đề nghị luận xã hội
  assert.ok(VAN_DE[b.id] && VAN_DE[b.id].length >= 2 && qs[qs.length - 1].q.includes(VAN_DE[b.id][0]), at + ": vấn đề nghị luận xã hội ghi ở VAN_DE và có trong đề bài");
});
assert.equal(new Set(Object.values(VAN_DE).map((v) => v[0])).size, Object.keys(VAN_DE).length, "các đề không lặp vấn đề nghị luận xã hội");
assert.deepEqual(Object.keys(VAN_DE).sort(), DE.map((b) => b.id).sort(), "VAN_DE ghi đủ các đề");
// từng cặp đề (1–2, 3–4, 5–6): Phần I khác thể loại; Phần II một văn bản nghị luận, một văn bản thông tin
for (let i = 0; i + 1 < DE.length; i += 2) {
  const tp = (b, P) => b.questions.find((q) => q.part === P).topic, a = DE[i], c = DE[i + 1];
  assert.notEqual(tp(a, P1), tp(c, P1), `${a.id}, ${c.id}: Phần I khác thể loại`);
  assert.notEqual(tp(a, P2), tp(c, P2), `${a.id}, ${c.id}: Phần II một văn bản nghị luận, một văn bản thông tin`);
}
// thể loại cụ thể của văn bản Phần I không lặp giữa các đề (truyện, kí: LOAI; thơ: thể thơ tính từ số tiếng các dòng)
const loaiCuThe = DE.map((b) => {
  const id = b.questions.find((q) => q.part === P1).p, tl = theLoai(b.passages[id]);
  if (tl === "thơ") { assert.ok(THO[id], "bài thơ chưa có trong THO: " + id); return THO[id][1] === "tu-do" ? "thơ tự do" : THE[THO[id][0]].toLowerCase(); }
  assert.ok(LOAI[id] && LOAI_CUA[tl].test(LOAI[id]), `${b.id}: thể loại cụ thể của «${tenVanBan(b.passages[id])}» (${tl}) ghi ở LOAI`);
  return LOAI[id];
});
assert.equal(new Set(loaiCuThe).size, loaiCuThe.length, "thể loại cụ thể của văn bản Phần I lặp giữa các đề: " + loaiCuThe.join(", "));
Object.keys(LOAI).forEach((id) => assert.ok(DE.some((b) => b.passages[id]), "LOAI ghi đoạn không có: " + id));
// vấn đề nghị luận xã hội: từ khoá có trong đề bài câu viết bài văn của đề, không có ở đề bài câu tự luận nghị luận, nêu ý kiến nào
// (đề bài có «nghị luận», «ý kiến», «bàn về», «suy nghĩ») của các kho Ngữ văn, Tiếng Việt khác và của các đề thi thử khác. Câu viết bài
// văn kể chuyện, phân tích văn bản không tính (Ngữ văn 6 giữa kì I có câu kể lại một lần mắc lỗi và biết nhận lỗi: kiểu bài tự sự).
const boDau = (s) => " " + String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() + " ";
const deBaiTuLuan = BANKS.filter((b) => b.subject === "Ngữ văn" || b.subject === "Tiếng Việt")
  .flatMap((b) => b.questions.filter((q) => q.type === "essay" && (!b.pool || q.src === b.id)).map((q) => [b.id, boDau(q.q)]))
  .filter(([, q]) => / (nghi luan|y kien|ban ve|suy nghi) /.test(q));
assert.ok(deBaiTuLuan.length > 20, "đọc được đề bài câu tự luận nghị luận của các kho Ngữ văn, Tiếng Việt");
let nKhoa = 0;
DE.forEach((b) => VAN_DE[b.id].slice(1).forEach((k) => {
  assert.ok(boDau(b.questions[b.questions.length - 1].q).includes(boDau(k)), `${b.id}: từ khoá «${k}» có trong đề bài câu viết bài văn`);
  const trung = [...new Set(deBaiTuLuan.filter(([id, q]) => id !== b.id && q.includes(boDau(k))).map(([id]) => id))];
  assert.deepEqual(trung, [], `${b.id}: từ khoá «${k}» của vấn đề nghị luận xã hội đã có ở đề bài câu tự luận của kho khác`);
  nKhoa++;
}));

/* ---------- thơ: số tiếng, khổ, vần ---------- */
DE.forEach((b) => Object.entries(b.passages).forEach(([id, ps]) => {
  if (theLoai(ps) !== "thơ") return;
  assert.ok(THO[id], "bài thơ chưa có trong THO: " + id);
  const [n, kieu] = THO[id], K = khoTho(ps);
  assert.ok(K.length >= 3, id + ": ít nhất ba khổ");
  if (kieu === "tu-do") { // thơ tự do (Ngữ văn 8, Bài 7): không quy định số tiếng mỗi dòng, số dòng mỗi khổ
    const dai = K.flat().map((l) => tieng(l).length);
    assert.ok(Math.min(...dai) >= 2 && Math.max(...dai) <= 12, id + ": dòng thơ tự do 2–12 tiếng");
    assert.ok(new Set(dai).size >= 4 && new Set(K.map((k) => k.length)).size >= 2, id + ": số tiếng các dòng, số dòng các khổ không đều");
    return;
  }
  K.forEach((k, i) => {
    assert.equal(k.length, 4, `${id}, khổ ${i + 1}: bốn dòng`);
    k.forEach((l, j) => assert.equal(tieng(l).length, n, `${id}, khổ ${i + 1}, dòng ${j + 1}: ${n} tiếng («${l}»)`));
    assert.equal(kieuVan(k), kieu, `${id}, khổ ${i + 1}: vần ${kieu}`);
  });
}));

/* ---------- đáp án tính lại từ chữ của đoạn đọc ---------- */
const motCau = (has) => { const m = ALL.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu, có ${m.length}`); return m[0]; };
const chuDoan = (q) => doan(deOf.get(q), q.p).text;
const co = (q, s) => { assert.ok(chuDoan(q).includes(s), `${ten.get(q)}: đoạn đọc phải có «${s}»`); return true; };
const khongCo = (q, s) => !chuDoan(q).includes(s);
const yOf = (q, re) => { const k = q.o.findIndex((o) => re.test(o)); assert.ok(k >= 0, `${ten.get(q)}: không thấy ý ${re}`); return k; };
const tf = (q, rules) => { const a = q.a.slice(); rules.forEach(([re, v]) => { a[yOf(q, re)] = v; }); return a; };
const SO = { một: 1, hai: 2, ba: 3, bốn: 4, năm: 5, sáu: 6, bảy: 7, tám: 8, chín: 9, mười: 10 };
const CHU = ["không", "một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín"];
const soChu = (n) => (n < 10 ? CHU[n] : n < 20 ? "mười" + (n % 10 ? " " + (n % 10 === 5 ? "lăm" : CHU[n % 10]) : "")
  : CHU[Math.floor(n / 10)] + " mươi" + (n % 10 ? " " + (n % 10 === 1 ? "mốt" : n % 10 === 5 ? "lăm" : CHU[n % 10]) : ""));
// giờ ghi bằng chữ trong bài du kí («Bảy giờ tối», «Sáu giờ sáng», «Năm giờ chiều») đổi ra giờ trong ngày
const gioGhi = (t) => [...t.matchAll(/(^|[^\p{L}])(một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười) giờ (sáng|trưa|chiều|tối)(?![\p{L}])/giu)]
  .map((m) => { const h = SO[m[2].toLowerCase()], b = m[3].toLowerCase(); return b === "chiều" || b === "tối" ? h + 12 : h; });
// chuyến tàu đi qua một đêm: giờ đầu là buổi tối, các giờ sau thuộc ngày hôm sau, tăng dần; «Nửa đêm», «Gần trưa» đứng đúng chỗ
const chuyenTau = (t) => {
  const g = gioGhi(t), viTri = (x) => t.indexOf(x);
  assert.ok(g.length >= 4 && g[0] >= 18 && g[1] < 12 && g.slice(1).every((x, i, a) => !i || x > a[i - 1]), "giờ ghi trong bài du kí theo thứ tự trước sau: " + g.join(", "));
  assert.ok(viTri("Bảy giờ tối") < viTri("Nửa đêm") && viTri("Nửa đêm") < viTri("Sáu giờ sáng") && viTri("Sáu giờ sáng") < viTri("Gần trưa") && viTri("Gần trưa") < viTri("Hai giờ chiều"), "các mốc trong ngày theo thứ tự");
  return { gio: 24 - g[0] + g[g.length - 1] };
};
// từ ngữ địa phương Huế trong lời của nhân vật (Ngữ văn 8, Bài 1: từ ngữ địa phương)
const PHUONG_NGU = { răng: "sao", rứa: "thế", chừ: "bây giờ" };
const CHECKS = [
  { has: "«Bình nước đầu hẻm» do ai kể lại và kể theo ngôi nào", right: (q) => {
    const n = (chuDoan(q).match(/(^|[^\p{L}])[Tt]ôi(?![\p{L}])/gu) || []).length;
    assert.ok(n >= 10, "truyện kể bằng lời nhân vật xưng «tôi»");
    const ok = q.o.filter((o) => /^Ngôi thứ nhất; người kể xưng «tôi»/.test(o));
    assert.equal(ok.length, 1, "đúng một lựa chọn: ngôi thứ nhất, người kể xưng «tôi»");
    return ok[0]; } },
  { has: "Tấm bìa ba dán trên thân bình nước ghi", right: (q) => /«Nước uống ([^.»]+)\. Mời bà con\.»/.exec(chuDoan(q))[1] },
  { has: "Đọc lại truyện «Bình nước đầu hẻm»", right: (q) => tf(q, [
    [/ông cụ gọi nhân vật «tôi» ra/, !(co(q, "Ông không nói gì, chỉ lặng lẽ ngồi xuống") && co(q, "Tôi bấm máy gọi"))],
    [/«ôi» là thán từ/, co(q, "Ôi, trưa nay nắng dữ quá!") && /\n– [^\n]*Ôi, /.test(chuDoan(q))],
    [/gấp cẩn thận mảnh giấy cảm ơn/, co(q, "Ba đọc đi đọc lại mảnh giấy rồi gấp cẩn thận, bỏ vào túi áo")]]) },
  { has: "Vấn đề chính (luận đề) mà văn bản «Đường chạy của riêng mình»", right: (q) => co(q, "Theo tôi, so sánh tự nó không có lỗi; điều đáng bàn là ta so sánh với ai và để làm gì.") && q.o.find((o) => /so sánh mình với ai/.test(o) && /để làm gì/.test(o)) },
  { has: "Người viết đưa câu «Nhiều nghiên cứu tâm lí học", right: (q) => {
    const c = chuDoan(q).split(/(?<=[.?!])\s+/).find((s) => s.startsWith("Nhiều nghiên cứu tâm lí học đã ghi nhận rằng"));
    assert.ok(c && !/(^|[^\p{L}])(tôi|chúng ta|ta|thích|ghét)(?![\p{L}])|thú vị|đáng ghi nhận/iu.test(c), "câu dẫn kết quả nghiên cứu là thông tin khách quan, không có dấu hiệu ý kiến chủ quan");
    return q.o.find((o) => /^Đưa thông tin khách quan làm bằng chứng/.test(o)); } },
  { has: "«Cuộc gọi lúc mười giờ đêm» được viết theo thể thơ nào", right: (q) => { const n = [...new Set(khoTho(doan(deOf.get(q), q.p)).flat().map((l) => tieng(l).length))]; assert.equal(n.length, 1); return THE[n[0]]; } },
  { has: "hiệp vần với tiếng «phắc» kết thúc dòng thơ ngay trên", right: (q) => { const k = khoTho(doan(deOf.get(q), q.p))[2]; assert.equal(cuoi(k[0]), "phắc"); assert.ok(hiepVan(cuoi(k[0]), cuoi(k[1])) && !hiepVan(cuoi(k[1]), cuoi(k[2]))); return cuoi(k[1]); } },
  { has: "Dòng thơ «Nghìn đường kim nối dài theo tháng ngày»", right: (q) => { assert.ok(khoTho(doan(deOf.get(q), q.p)).flat().includes("Nghìn đường kim nối dài theo tháng ngày."), "là một dòng của bài thơ"); return q.o[0]; } },
  { has: "Mỗi ý sau nói về bài thơ «Cuộc gọi lúc mười giờ đêm»", right: (q) => { const K = khoTho(doan(deOf.get(q), q.p)), kh = (i) => K[i].join("\n"); return tf(q, [
    [/khổ thơ đầu, mẹ gọi về khi vừa tan ca/, /vừa tan ca/.test(kh(0)) && /chưa kịp thay ra/.test(kh(0))],
    [/khổ thơ thứ hai, người con kể hết/, !/giấu thật kín/.test(kh(1))],
    [/khổ thơ cuối, người con chủ động nhắn/, /con nhắn mẹ: «Ngủ ngon»/.test(kh(K.length - 1))],
    [/dùng biện pháp tu từ so sánh/, /(^|[^\p{L}])(như|tựa|giống|bằng|là)(?![\p{L}])/u.test(K[K.length - 1].find((l) => /Tết đã gõ bên thềm/.test(l)))]]); } },
  { has: "phân tích khổ thơ thứ tư của bài thơ", right: (q) => { const want = khoTho(doan(deOf.get(q), q.p))[3].join(" / "); assert.ok(q.q.includes("«" + want + "»"), "đề bài chép đúng khổ thơ thứ tư"); return null; } },
  { has: "chữ «tài tử» trong tên gọi", right: (q) => co(q, "Chữ «tài tử» ở đây chỉ những người chơi nhạc không chuyên") && q.o.find((o) => /không chuyên/.test(o)) },
  { has: "Các đề mục đặt ở đầu đoạn", right: (q) => {
    const dm = [...q.q.matchAll(/«([^»]+)»/g)].map((m) => m[1]), doanVan = chuDoan(q).split("\n");
    assert.ok(dm.length >= 3 && dm.every((h) => doanVan.some((d) => d.startsWith(h + ". "))), "mỗi đề mục mở đầu một đoạn của văn bản");
    return q.o[0]; } },
  // Đề 3: bài du kí «Chuyến tàu ra Huế», văn bản nghị luận «Khi ta dám nhận lỗi»
  { has: "là một bài du kí. Dấu hiệu nào", right: (q) => {
    const t = chuDoan(q), toi = (t.match(/(^|[^\p{L}])[Tt]ôi(?![\p{L}])/gu) || []).length;
    chuyenTau(t);
    assert.ok(toi >= 8 && co(q, "rời ga Sài Gòn") && co(q, "vào ga Huế"), "người viết xưng «tôi», là người trong cuộc, ghi lại chuyến đi từ ga Sài Gòn ra ga Huế");
    const ok = q.o.filter((o) => /trong chuyến đi tới một vùng đất$/.test(o));
    assert.equal(ok.length, 1, "đúng một lựa chọn nói về chuyến đi của người viết");
    return ok[0]; } },
  { has: "mặc chiếc áo dài màu ___ đã bạc", right: (q) => /chiếc áo dài màu (\p{L}+) đã bạc/u.exec(chuDoan(q))[1] },
  { has: "dùng từ ngữ địa phương Huế. Các từ", right: (q) => {
    const [loi, ...tuDP] = [...q.q.matchAll(/«([^»]+)»/g)].map((m) => m[1]);
    assert.ok(chuDoan(q).includes("\n– " + loi + "\n"), "lời của mệ là lời thoại, ghi nguyên văn");
    assert.ok(tuDP.length >= 3 && tuDP.every((w) => PHUONG_NGU[w] && new RegExp("(^|[^\\p{L}])" + w + "(?![\\p{L}])", "iu").test(loi)), "mỗi từ hỏi nghĩa có trong lời của mệ và trong bảng PHUONG_NGU");
    return tuDP.map((w) => `«${w}» là ${PHUONG_NGU[w]}`).join(", "); } },
  { has: "Đọc lại văn bản «Chuyến tàu ra Huế»", right: (q) => { const t = chuDoan(q), { gio } = chuyenTau(t); return tf(q, [
    [/trình tự thời gian/, co(q, "rời ga Sài Gòn") && co(q, "vào ga Huế")],
    [/đoàn tàu đã chạy khoảng/, q.o[yOf(q, /đoàn tàu đã chạy khoảng/)].includes("khoảng " + soChu(gio) + " giờ")],
    [/dùng biện pháp so sánh/, /(^|[^\p{L}])(như|tựa|giống|tưởng như)(?![\p{L}])/u.test(/«([^»]+)»/.exec(q.o[yOf(q, /dùng biện pháp so sánh/)])[1])],
    [/bên phải là vách đá dựng đứng, bên trái là biển/, /[Bb]ên phải là vách đá dựng đứng, bên trái là biển/.test(t) || !co(q, "Bên trái là vách đá dựng đứng, bên phải là biển")]]); } },
  { has: "nêu rõ ý kiến chính (luận đề) của người viết", right: (q) => {
    const doanVan = chuDoan(q).split("\n"), cau = doanVan.flatMap((d) => d.split(/(?<=[.?!])\s+/));
    q.o.forEach((o) => assert.ok(cau.includes(o), `lựa chọn «${o}» là một câu của văn bản`));
    assert.equal(doanVan[1].split(/(?<=[.?!])\s+/).length, 1, "đoạn thứ hai chỉ có một câu");
    return doanVan[1]; } },
  { has: "đổ lỗi cho hoàn cảnh chỉ giúp ta thấy ___", right: (q) => /Đổ lỗi giúp ta thấy (\p{L}+ \p{L}+) trong chốc lát/u.exec(chuDoan(q))[1] },
  { has: "Người viết nhắc tới ý kiến «nhận lỗi là tự hạ thấp mình»", right: (q) => {
    const t = chuDoan(q), i = t.indexOf("Có ý kiến cho rằng nhận lỗi là tự hạ thấp mình");
    assert.ok(i >= 0 && /^[^.]*\.\s*Thật ra,/.test(t.slice(i)), "ngay sau ý kiến trái chiều là câu phản bác («Thật ra, …»)");
    return q.o.find((o) => /phản bác/.test(o)); } },
  // Đề 4: bài thơ tự do «Người đi về phía lửa», văn bản thông tin «Những dấu chấm biết nói»
  { has: "được so sánh với «con ___ dữ»", right: (q) => /mái tôn như con (\p{L}+) dữ/u.exec(khoTho(doan(deOf.get(q), q.p))[0].join("\n"))[1] },
  { has: "đã đưa ra khỏi đám cháy những ai", right: (q) => {
    const K = khoTho(doan(deOf.get(q), q.p)), k3 = K[2].join("\n");
    assert.ok(/bế ra bà cụ nhà bên/.test(k3) && /ôm ra con mèo nhỏ/.test(k3) && K[0].includes("Mẹ ôm con chạy ra,"), "khổ ba: chú bế bà cụ nhà bên, ôm con mèo; khổ đầu: hai mẹ con tự chạy ra");
    return q.o.find((o) => /^Bà cụ nhà bên và một con mèo nhỏ$/.test(o)); } },
  { has: "«Mẹ ôm con chạy ra, / Còn chú / Chạy vào.»", right: (q) => {
    const k1 = khoTho(doan(deOf.get(q), q.p))[0];
    assert.ok(k1[k1.length - 1] === "Chạy vào." && k1.filter((l) => /chạy ra/.test(l)).length >= 2, "khổ đầu đối lập mọi người «chạy ra» với chú «Chạy vào»");
    return q.o.find((o) => /^Người lính dũng cảm/.test(o)); } },
  { has: "Các nhận định dưới đây về bài thơ «Người đi về phía lửa»", right: (q) => {
    const K = khoTho(doan(deOf.get(q), q.p)), dai = K.flat().map((l) => tieng(l).length), kc = K[K.length - 1];
    const hoi = kc.map((l, i) => (/(^|[^\p{L}])[Kk]hông hỏi(?![\p{L}])/u.test(l) ? i : -1)).filter((i) => i >= 0);
    assert.equal(Math.min(...dai), 2, "lời giải ghi «có dòng chỉ hai tiếng»");
    return tf(q, [
      [/thể thơ tự do/, new Set(dai).size >= 4 && new Set(K.map((k) => k.length)).size >= 2],
      [/«không hỏi» được lặp lại ở hai dòng thơ liền nhau/, hoi.length === 2 && hoi[1] === hoi[0] + 1],
      [/đã kịp hỏi tên/, !/Không ai kịp hỏi tên/.test(K[3].join(" "))],
      [/như vừa khóc» có dùng biện pháp so sánh/, K.flat().some((l) => /đen nhẻm như vừa khóc/.test(l))]]); } },
  { has: "Cảm hứng chủ đạo của bài thơ «Người đi về phía lửa»", right: (q) => {
    const kc = khoTho(doan(deOf.get(q), q.p)).slice(-1)[0].join(" ");
    assert.ok(/về phía có người đang cần mình/.test(kc) && /rưng rưng/.test(kc) && khongCo(q, "xây lại") && khongCo(q, "bất cẩn"), "khổ cuối: xúc động, ngợi ca những người đi về phía có người cần mình; bài thơ không nói chuyện xây nhà, trách người gây cháy");
    return q.o.find((o) => /^Lòng biết ơn, cảm phục/.test(o)); } },
  { has: "chỉ trong một ô chữ nổi, người ta có thể tạo ra ___", right: (q) => {
    const t = chuDoan(q), m = /Mỗi ô chữ nổi gồm (\d+) vị trí chấm, xếp thành (\p{L}+) cột, mỗi cột (\p{L}+) chấm/u.exec(t);
    assert.ok(m && +m[1] === SO[m[2]] * SO[m[3]], "số vị trí chấm của một ô bằng số cột nhân số chấm mỗi cột");
    const n = 2 ** +m[1] - 1; // mỗi vị trí có hoặc không có chấm nổi, bỏ ô không có chấm nào
    assert.ok(t.includes("tạo ra " + n + " kí hiệu"), "số kí hiệu ghi trong văn bản khớp số vị trí chấm"); return String(n); } },
  { has: "chủ yếu được sắp xếp theo cách nào", right: (q) => {
    const t = chuDoan(q), y = [...t.matchAll(/[Nn]ăm (\d{4})/g)].map((m) => +m[1]);
    assert.ok(y.length >= 4 && y.every((v, i) => !i || v > y[i - 1]), "các mốc năm của văn bản theo thứ tự trước sau: " + y.join(", "));
    const sinh = /sinh ngày (\d+) tháng (\d+) năm (\d{4})/.exec(t), xong = /Năm (\d{4}), khi mới (\d+) tuổi/.exec(t), le = /ngày (\d+) tháng (\d+), ngày sinh của/.exec(t);
    assert.equal(+xong[1] - +sinh[3], +xong[2], "tuổi khi hoàn thành chữ nổi khớp năm sinh");
    assert.deepEqual([le[1], le[2]], [sinh[1], sinh[2]], "Ngày Chữ nổi thế giới là ngày sinh của Lu-i Brai");
    return q.o.find((o) => /^Theo các mốc thời gian/.test(o)); } }
];
let nCheck = 0;
CHECKS.forEach((c) => {
  const q = motCau(c.has), want = c.right(q);
  if (want === null) { nCheck++; return; }
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  if (Array.isArray(want)) assert.deepEqual(got, want, `${ten.get(q)}: đáp án ${JSON.stringify(got)}, tính được ${JSON.stringify(want)}`);
  else assert.equal(got, want, `${ten.get(q)}: đáp án ${JSON.stringify(got)}, tính được ${JSON.stringify(want)}`);
  nCheck++;
});
// câu trích trong «» (từ ba tiếng) ở đề bài, lựa chọn và lời giải câu chấm tự động có trong đoạn đọc (bỏ “/” ngăn dòng, tiếng)
const gon = (s) => String(s).normalize("NFC").replace(/\s*\/\s*/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
let nTrich = 0;
ALL.forEach((q) => {
  const ps = doan(deOf.get(q), q.p), text = gon(ps.text);
  [q.q].concat(q.o || [], q.type === "essay" ? [] : [q.x]).forEach((s) => [...s.matchAll(/«([^»]+)»/g)].forEach((m) => {
    m[1].split("…").map((x) => x.trim()).filter((x) => tieng(x.replace(/_+/g, " ")).length >= 3 && gon(x) !== gon(tenVanBan(ps))).forEach((x) => {
      // chỗ trống của câu điền (___) khớp với bất kì chữ nào
      const re = new RegExp(gon(x).replace(/[.!?]$/, "").split(/_{3,}/).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".+?"));
      assert.ok(re.test(text), `${ten.get(q)}: câu trích «${x}» không có trong đoạn đọc`);
      nTrich++;
    });
  }));
});

/* ---------- dạng câu, độ dài lựa chọn, nhãn chủ đề ---------- */
const tf4 = ALL.filter((q) => q.type === "tf4"), kieu = {};
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), ten.get(q) + ": câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
ALL.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của ý: " + ten.get(q)));
const mc = ALL.filter((q) => q.type === "mc");
mc.forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.ok(!q.o.some((o) => /^(Tất cả|Cả hai|Cả ba|Cả A)/.test(o)), "lựa chọn kiểu «Tất cả…» không hợp khi app xáo lựa chọn: " + ten.get(q));
});
const dai = mc.filter((q) => q.o[0].length >= Math.max(...q.o.slice(1).map((o) => o.length))).length;
const ngan = mc.filter((q) => q.o[0].length <= Math.min(...q.o.slice(1).map((o) => o.length))).length;
assert.ok(3 * dai <= mc.length, `đáp án là lựa chọn dài nhất ở ${dai}/${mc.length} câu nhiều lựa chọn`);
assert.ok(3 * ngan <= mc.length, `đáp án là lựa chọn ngắn nhất ở ${ngan}/${mc.length} câu nhiều lựa chọn`);
const khongDau0 = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase();
mc.forEach((q) => {
  const w = khongDau0(q.topic).split(/[^a-z0-9]+/).filter((x) => x.length > 1), cap = [];
  for (let i = 0; i + 1 < w.length; i++) cap.push(w[i] + " " + w[i + 1]);
  cap.forEach((c) => { const hit = q.o.map((o) => khongDau0(o).replace(/[^a-z0-9]+/g, " ").includes(c)); assert.ok(!(hit[0] && hit.filter(Boolean).length === 1), `chỉ đáp án có chữ «${c}» của nhãn chủ đề: ${ten.get(q)}`); });
});
// đơn vị hành chính cũ (CLAUDE.md, “Nội dung câu hỏi”)
const moiChu = (b) => [b.note].concat(...Object.values(b.passages).map((ps) => [ps.title, ps.text]), ...b.questions.map((q) => [q.q, q.x].concat(q.o || [], q.ans || [], (q.rubric || []).map((r) => r.c))));
DE.forEach((b) => moiChu(b).forEach((s) => assert.ok(!/(^|[^\p{L}])(huyện|thị xã|thị trấn|63 tỉnh)(?![\p{L}])/iu.test(s), `${b.id}: không dùng đơn vị hành chính cũ: ${s.slice(0, 60)}`)));

/* ---------- đề “Ôn chủ đề” (Phiên UX14): lấy hết câu chấm tự động của chủ đề trong các đề thi thử ---------- */
[...new Set(ALL.filter((q) => q.type !== "essay").map((q) => q.topic))].forEach((t) => {
  const tb = Quiz.topicBank(DE, t, { id: "chu-de", title: t }), cau = ALL.filter((q) => q.topic === t && q.type !== "essay").length;
  assert.equal(tb.questions.length, cau, `Ôn chủ đề «${t}»: kho có đủ ${cau} câu`);
  if (cau < Quiz.TOPIC_N) { const d = Quiz.draw(tb); assert.equal(d.notes.length, 0, `Ôn chủ đề «${t}»: rút có ghi chú`); assert.equal(d.questions.length, cau); }
});

/* ---------- dò lộ đáp án ----------
   Đề cố định: mọi câu của một đề cùng ra, đề bài, lựa chọn của mọi câu xem được qua bảng số câu, lời giải hiện ngay sau mỗi câu
   khi ôn luyện; note hiện ở màn mở đề. Đáp án (lựa chọn đúng, đáp án điền) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở
   xuống thì lấy cả đáp án); chuỗi có ở đề bài, lựa chọn, lời giải, thang chấm của câu khác cùng đề, ở note, ở đoạn đọc phần kia, thì
   in ra với DO_LO=1 để xem tay. Đề “Ôn chủ đề” rút chung câu cùng chủ đề của các đề khác nhau (kèm đoạn đọc của chúng): so cả các
   cặp đó. */
const tu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], (q.rubric || []).map((r) => r.c)).map(String);
const dapAn = (q) => (q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []);
const doLo = (pairs, tenCau) => {
  const ra = [];
  pairs.forEach(([q, k, them]) => {
    const C = [...new Set(dapAn(q).flatMap(cum))];
    if (!C.length) return;
    const T = " " + (k ? chu(k) : []).concat(them || []).map((s) => tu(s).join(" ")).join(" | ") + " ";
    C.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${k ? tenCau(k) : "note"} → ${tenCau(q)}: ${c}`));
  });
  return [...new Set(ra)];
};
const capDo = [];
DE.forEach((b) => b.questions.forEach((q) => {
  capDo.push([q, null, [b.note]]);
  b.questions.forEach((k) => { if (k !== q) capDo.push([q, k, k.p !== q.p ? [b.passages[k.p].text] : []]); });
}));
ALL.forEach((q) => ALL.forEach((k) => { if (deOf.get(q) !== deOf.get(k) && q.topic === k.topic && q.type !== "essay" && k.type !== "essay") capDo.push([q, k, [doan(deOf.get(k), k.p).text]]); }));
const lo = doLo(capDo, (q) => ten.get(q));
if (process.env.DO_LO) console.log("Đáp án có ở câu rút được cùng lúc (xem tay):\n" + lo.join("\n"));
// đã xem (Phiên N9-vao10-van): chữ chung, không làm lộ đáp án.
const DA_XEM = [];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
{ // bộ dò bắt được chỗ lộ cố ý viết sai
  const a = motCau("Tấm bìa ba dán trên thân bình nước ghi"), b = motCau("Câu nói của ông cụ «Cả con đường này");
  const gia = Object.assign({}, b, { x: b.x + " Bình nước ba để ở đầu hẻm là nước miễn phí." });
  assert.ok(doLo([[a, gia, []]], (q) => ten.get(q) || "giả").some((s) => / miễn phí$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
// tên di sản, tên danh sách của UNESCO viết đúng như tên gọi chính thức: tính là một từ (tên riêng, không phải câu chép của sách)
const TEN_RIENG = ["Nghệ thuật Đờn ca tài tử Nam Bộ", "Danh sách di sản văn hoá phi vật thể đại diện của nhân loại"].map(khongDau).sort((a, b) => b.length - a.length);
const tuKD = (s) => { let k = " " + khongDau(s) + " "; TEN_RIENG.forEach((r) => { k = k.split(" " + r + " ").join(" " + r.replace(/ /g, "") + " "); }); return k.split(" ").filter(Boolean); };
const chuoi = (s, k) => { const w = tuKD(s), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const boChuoi = (texts, k) => { const set = new Set(); texts.forEach((t) => chuoi(t, k).forEach((c) => set.add(c))); return set; };
// mọi trường chữ của một đề, theo từng câu (đoạn đọc, note tính vào câu đầu dùng chúng)
const truongDe = (b) => b.questions.map((q, i) => ({ q, s: chu(q).concat(i ? [] : [b.note], b.questions.findIndex((x) => x.p === q.p) === i ? [b.passages[q.p].title, b.passages[q.p].text] : []) }));
if (SACH.length) {
  assert.ok(SACH.some((f) => /ngu-van-9-tap-2/.test(f)), "OnUp-Book có Ngữ văn 9 tập hai");
  const texts = SACH.map((f) => fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]* ===/g, " "));
  const bao = (k) => { const set = boChuoi(texts, k); return DE.flatMap((b) => truongDe(b).flatMap(({ q, s }) => s.flatMap((x) => chuoi(x, k).filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`)))); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // ngữ liệu ngoài sách giáo khoa lớp 6–9: tên văn bản không có trong sách Ngữ văn 6–9
  const van69 = SACH.filter((f) => /lop-[6-9]\/ngu-van-/.test(f)).map((f) => " " + khongDau(fs.readFileSync(f, "utf8")) + " ");
  DE.forEach((b) => Object.values(b.passages).forEach((ps) => assert.ok(!van69.some((t) => t.includes(" " + khongDau(tenVanBan(ps)) + " ")), `${b.id}: «${tenVanBan(ps)}» có trong sách Ngữ văn 6–9`)));
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21), giữa các đề thi thử với nhau ---------- */
{
  const khac = BANKS.filter((b) => !/^van9-vao10-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)
    .map((q) => chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).join(" | ")));
  const bao = (k) => { const set = boChuoi(khac, k); return DE.flatMap((b) => truongDe(b).flatMap(({ q, s }) => [...new Set(s.flatMap((x) => chuoi(x, k)))].filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`))); };
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
  // giữa các đề thi thử: đoạn đọc, đề bài, lựa chọn, lời giải không dùng lại của đề khác (thang chấm, note, khung đề bài câu viết dùng chung)
  const boKhung = (s) => s.replace(/^(Dàn ý gợi ý|Gợi ý):\s*/, "").replace(/(^|\n)– [^:\n]{1,40}: /g, "\n"); // nhãn của dàn ý: Mở bài, Kết đoạn…
  const rieng = (b) => Object.values(b.passages).map((ps) => ps.text).concat(...b.questions.map((q) => [boKhung(q.x)].concat(q.type === "essay" ? [] : [q.q], q.o || [])));
  DE.forEach((b) => {
    const set = boChuoi(DE.filter((c) => c !== b).flatMap(rieng), 8);
    rieng(b).forEach((s) => chuoi(s, 8).forEach((c) => assert.ok(!set.has(c), `${b.id} dùng lại chữ của đề thi thử khác: ${c}`)));
  });
}
console.log(nKhoa + " từ khoá vấn đề nghị luận xã hội dò ở " + deBaiTuLuan.length + " đề bài câu tự luận nghị luận, nêu ý kiến; thể loại cụ thể của văn bản Phần I: " + loaiCuThe.join(", ") + ".");
console.log(DE.length + " đề, " + ALL.length + " câu (" + ALL.filter((q) => q.type !== "essay").length + " câu chấm tự động, " + ALL.filter((q) => q.type === "essay").length + " câu tự luận); " + nCheck + " câu tính lại đáp án, " + nTrich + " câu trích đối chiếu đoạn đọc; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn.");
console.log("VAN9 VAO10 OK");
