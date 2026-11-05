// Kiểm tra các đề Ngữ văn thi thử tốt nghiệp THPT (data/banks/12-van.js, van12-tn-de<N>; Phiên N12-tn-van: Đề 1–2; Phiên N12-tn-van-b:
// Đề 3–4; phiên thêm đề thì mở rộng script này). Đề tính điểm (Phiên K5), khung đề tốt nghiệp THPT từ năm 2025 (Quyết định 764/QĐ-BGDĐT; docs/KE-HOACH-NOI-DUNG.md,
// mục 2 và mục 7, nhóm “Trước 10/12/2026: lớp 12, đề thi thử tốt nghiệp”). Số đề, số câu lấy từ danh mục (không ghi cứng).
// Kiểm tra từng đề: danh mục (tên, khối, môn, file, 120 phút, pts 10, gắn vào tn-thpt-2027); hai phần đúng tên, đúng thứ tự; Phần I đọc
// hiểu 4 điểm, mọi câu dùng một đoạn đọc (văn bản người soạn viết, khoảng 350–1 100 tiếng; bài thơ 120–450 tiếng): câu chấm tự động pt
// 0,25–1, nhiều nhất hai câu
// tự luận ngắn 0,5–1 điểm, điểm theo mức như đề thật năm 2025, 2026 (Biết 1, Hiểu 2, Vận dụng 1); chủ đề theo kĩ năng khớp thể loại ghi ở
// tên đoạn đọc (văn bản nghị luận, thông tin: LOAI); Phần II hai câu viết không gắn đoạn đọc, ghi tên văn bản đọc hiểu: đoạn văn nghị
// luận khoảng 200 chữ 2 điểm (từ Đề 3, ít nhất một đề là đoạn văn so sánh, đánh giá: kiểu bài Viết của Ngữ văn 12, Bài 1, 2; văn bản
// đem so sánh người soạn viết, chép trong đề bài, ghi ở NGOAI), bài văn nghị luận xã hội khoảng 600 chữ 4 điểm, thang chấm sáu tiêu chí
// của đáp án thi (DOAN, BAI; ý 0,25
// hoặc bội của 0,5 để chấm được “Một phần”), x là dàn ý; note (câu chung về khung đề, đề thật đọc hiểu là 5 câu tự luận, số điểm chấm tự
// động, số câu, số điểm tự chấm tính từ dữ liệu, thể loại văn bản); Quiz.grade (Phần I 4 điểm, Phần II 6 điểm); gọi người làm bài là
// “bạn”.
// Giữa các đề: mỗi cặp đề (1–2, 3–4) có một văn bản văn học và một văn bản nghị luận hoặc thông tin; năm đề phủ ít nhất bốn loại văn bản
// (truyện, thơ, kí, kịch, văn bản nghị luận, văn bản thông tin); thể loại cụ thể (LOAI; thể thơ tính từ số tiếng các dòng) không lặp;
// vấn đề nghị luận xã hội của mỗi đề ghi ở VAN_DE (cụm chữ trong đề bài và từ khoá), không lặp, từ khoá không có ở đề bài câu Viết nào
// của các kho Ngữ văn 12, đề thi thử vào 10 và câu tự luận nghị luận, nêu ý kiến nào của các kho Ngữ văn, Tiếng Việt khác; đúng/sai 4 ý
// không lặp kiểu Đ/S.
// Đọc lại bằng code: bài thơ người soạn viết (THO, như tests/van9-vao10.js: số tiếng mỗi dòng, khổ bốn dòng, kiểu vần chân; thơ tự do),
// đáp án các câu tính được từ chữ của đoạn đọc (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu; bảng số liệu của văn bản
// thông tin đọc lại từng dòng, cộng lại bằng dòng tổng cộng; phép chia “a/b ≈ c%” trong lời giải tính lại), mọi câu trích trong «» ở đề
// bài, lựa chọn và lời giải câu chấm tự động có trong văn bản đọc hiểu của đề (trừ câu trích ngoài văn bản ghi ở NGOAI).
// Rồi: đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn,
// không là lựa chọn duy nhất có chữ của nhãn chủ đề; đề “Ôn chủ đề” lấy hết câu của chủ đề; dò lộ đáp án (chuỗi 3 từ liền nhau của đáp
// án; đáp án ngắn thì cả đáp án) giữa mọi cặp câu của một đề, với note, và giữa các câu cùng chủ đề của các đề khác nhau (đề “Ôn chủ đề”
// rút chung); DO_LO=1 in ra để xem tay, danh sách đã xem ở DA_XEM. Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ (cả đoạn
// đọc, note, thang chấm) với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm: không chuỗi 8 từ nào trùng (DO_SACH=1 in chuỗi 6 từ);
// tên văn bản không có trong sách Ngữ văn 6–12. So với mọi câu, đoạn đọc của các kho khác (không chuỗi 8 từ nào trùng; DO_KHO=1 in
// chuỗi 5 từ) và giữa các đề thi thử tốt nghiệp với nhau (đoạn đọc, đề bài, lựa chọn, lời giải; thang chấm và khung đề bài câu viết
// được dùng chung).
// Chạy: node tests/van12-tn.js → in VAN12 TN OK.
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

/* ---------- khung đề (docs/KE-HOACH-NOI-DUNG.md, mục 2; mục 7, khối “Phiên N12-tn-van”) ---------- */
const P1 = "Phần I. Đọc hiểu", P2 = "Phần II. Viết";
// thể loại ghi ở tên đoạn đọc → chủ đề; văn bản nghị luận, thông tin: chủ đề theo LOAI
const DOC = { truyện: "Đọc hiểu truyện", thơ: "Đọc hiểu thơ", kí: "Đọc hiểu kí", kịch: "Đọc hiểu kịch" };
const DOC_VB = { "văn bản nghị luận": "Đọc hiểu văn bản nghị luận", "văn bản thông tin": "Đọc hiểu văn bản thông tin" };
const VIET1 = "Viết đoạn văn nghị luận", VIET2 = "Viết bài văn nghị luận xã hội";
// thang chấm câu viết theo sáu tiêu chí của đáp án thi tốt nghiệp (hình thức; vấn đề; hệ thống ý; triển khai bằng lí lẽ, dẫn chứng;
// diễn đạt; sáng tạo)
const DOAN = [0.25, 0.25, 0.5, 0.5, 0.25, 0.25], BAI = [0.25, 0.5, 1, 1.5, 0.25, 0.5];
// điểm đọc hiểu theo mức như đề thật năm 2025, 2026: hai câu Biết 0,5 điểm, hai câu Hiểu 1 điểm, một câu Vận dụng 1 điểm
const MUC = { 1: 1, 2: 2, 3: 1 };
const NOTE0 = "Đề thi thử theo cấu trúc đề thi tốt nghiệp THPT từ năm 2025 (Quyết định 764/QĐ-BGDĐT). Năm 2027 thí điểm thi trên máy tính ở nơi đủ điều kiện, đề như thi giấy.";
// vấn đề nghị luận xã hội của từng đề: [cụm chữ có trong đề bài câu viết bài văn, từ khoá của vấn đề…]; các đề không lặp vấn đề.
// Từ khoá có trong đề bài câu viết bài văn của đề và không có ở đề bài câu Viết, câu tự luận nghị luận của các kho khác (dò ở dưới; đề
// mới chọn vấn đề chưa có rồi thêm vào đây).
const VAN_DE = {
  "van12-tn-de1": ["sự kiên nhẫn của người trẻ", "kiên nhẫn"],
  "van12-tn-de2": ["văn hoá ứng xử trên mạng xã hội của người trẻ", "ứng xử trên mạng"],
  "van12-tn-de3": ["tinh thần học tập suốt đời", "học tập suốt đời"],
  "van12-tn-de4": ["thói quen «dùng rồi bỏ» của người trẻ", "dùng rồi bỏ"]
};
// bài thơ người soạn viết: mã đoạn → [số tiếng mỗi dòng, kiểu vần chân của mọi khổ bốn dòng]; thơ tự do: [0, "tu-do"]
const THO = { "hoc-tro": [8, "lien"] };
const THE = { 5: "Thơ năm chữ", 6: "Thơ sáu chữ", 7: "Thơ bảy chữ", 8: "Thơ tám chữ" };
// thể loại cụ thể của văn bản Phần I (thể thơ thì tính từ THO): các đề không lặp thể loại cụ thể
const LOAI = { "lua-nguoi": "truyện ngắn", "dau-chan": "văn bản nghị luận xã hội", "sua-do": "văn bản thông tin" };
const LOAI_CUA = { truyện: /^truyện /, kí: /^(du kí|hồi kí|bút kí|tuỳ bút|tản văn|phóng sự)$/, kịch: /^(bi kịch|hài kịch|chính kịch)$/, "văn bản": /^văn bản (nghị luận|thông tin)( |$)/ };
// câu trích trong «» ở đề bài không lấy từ văn bản đọc hiểu (thành ngữ đem so sánh ở câu Vận dụng; đoạn thơ người soạn viết đem so sánh
// ở câu viết đoạn văn so sánh, đánh giá của Đề 3, các dòng ngăn bằng “/”)
const NGOAI = ["dục tốc bất đạt", "Tóc đã bạc, ông mới tập nhắn tin, / Ngón tay to lần từng phím chữ nhỏ. / Gõ mấy chữ nhớ thương mất cả buổi chiều, / Bấm gửi rồi, ông ngồi canh màn hình sáng."];

const DE = BANKS.filter((b) => /^van12-tn-de\d+$/.test(b.id)).sort((a, b) => so(a) - so(b));
assert.ok(DE.length >= 2, "có ít nhất hai đề Ngữ văn thi thử tốt nghiệp");
DE.forEach((b, i) => assert.equal(so(b), i + 1, "số đề liền nhau từ Đề 1: " + b.id));
const ev = EVENTS.find((e) => e.id === "tn-thpt-2027");
assert.ok(ev && ev.grades.join() === "12" && ev.subjects.includes("Ngữ văn"), "kì thi tn-thpt-2027 của khối 12 có môn Ngữ văn");
const ten = new Map(), deOf = new Map();
DE.forEach((b) => b.questions.forEach((q, i) => { ten.set(q, "de" + so(b) + "#" + (i + 1)); deOf.set(q, b); }));
const ALL = DE.flatMap((b) => b.questions);
const doan = (b, p) => { assert.ok(b.passages && b.passages[p], `${b.id}: không có đoạn ${p}`); return b.passages[p]; };
const maDoc = (b) => b.questions.find((q) => q.part === P1).p; // văn bản đọc hiểu của đề
// tên đoạn đọc ghi thể loại và «người soạn viết», có thể thêm ghi chú sau dấu chấm phẩy («nhân vật, số liệu là hư cấu»)
const theLoai = (ps) => { const m = /\((truyện|thơ|kí|kịch|văn bản) người soạn viết(; [^()]+)?\)$/.exec(ps.title); return m && m[1]; };
const tenVanBan = (ps) => ps.title.replace(/\s*\([^()]*\)$/, "");
// văn bản đọc hiểu của câu: câu Phần II không gắn đoạn đọc nhưng viết về văn bản của Phần I
const vanBanCua = (q) => doan(deOf.get(q), q.p || maDoc(deOf.get(q)));

/* ---------- tiếng, thanh, vần (như tests/van9-vao10.js) ---------- */
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
const loaiVanBan = (b) => { // thể loại lớn của văn bản đọc hiểu: truyện, thơ, kí, kịch, văn bản nghị luận, văn bản thông tin
  const id = maDoc(b), tl = theLoai(b.passages[id]);
  return tl === "văn bản" ? /^văn bản (nghị luận|thông tin)/.exec(LOAI[id] || "")[0] : tl;
};
DE.forEach((b) => {
  const at = b.id, qs = b.questions;
  assert.equal(b.title, `Ngữ văn 12 · Thi thử tốt nghiệp · Đề ${so(b)}`, at + ": tên đề");
  assert.equal(b.grade, 12); assert.equal(b.subject, "Ngữ văn"); assert.equal(b.file, "12-van.js");
  assert.equal(b.minutes, 120, at + ": 120 phút"); assert.equal(b.pts, 10, at + ": thang 10 điểm");
  assert.ok(!b.pool, at + ": đề cố định");
  assert.equal(qs.length, b.n, at + ": n bằng số câu trong file");
  assert.ok(ev.banks.includes(b.id), at + ": gắn vào tn-thpt-2027");
  assert.deepEqual([...new Set(qs.map((q) => q.part))], [P1, P2], at + ": hai phần, đúng tên, đúng thứ tự");
  assert.ok(qs.every((q) => ["mc", "tf4", "fill", "essay"].includes(q.type)), at + ": chỉ dùng trắc nghiệm, đúng/sai 4 ý, điền, tự luận");
  assert.ok(qs.every((q) => [1, 2, 3].includes(q.lv)), at + ": câu nào cũng có lv");
  assert.equal(Object.keys(b.passages || {}).length, 1, at + ": một văn bản đọc hiểu (đoạn đọc)");
  // Phần I: đọc hiểu 4 điểm
  const doc = qs.filter((q) => q.part === P1), ps = [...new Set(doc.map((q) => q.p))];
  assert.equal(ps.length, 1, at + ": mọi câu Phần I dùng một đoạn đọc");
  assert.ok(ps[0], at + ": câu Phần I có đoạn đọc");
  const psg = doan(b, ps[0]), tl = theLoai(psg);
  assert.ok(tl, `${at}: tên đoạn đọc ghi thể loại và «người soạn viết» (ngữ liệu ngoài sách giáo khoa): ${psg.title}`);
  const dai = tieng(psg.text).length, [it, nhieu] = tl === "thơ" ? [120, 450] : [350, 1100]; // bài thơ ngắn hơn văn xuôi
  assert.ok(dai >= it && dai <= nhieu, `${at}: văn bản đọc hiểu khoảng ${it}–${nhieu} tiếng (đang ${dai})`);
  assert.equal(r2(sum(doc.map((q) => q.pt))), 4, at + ": Phần I 4 điểm");
  const tp = [...new Set(doc.map((q) => q.topic))];
  assert.equal(tp.length, 1, at + ": các câu đọc hiểu cùng một chủ đề");
  if (tl === "văn bản") {
    assert.ok(LOAI[ps[0]] && LOAI_CUA["văn bản"].test(LOAI[ps[0]]), `${at}: loại văn bản «${tenVanBan(psg)}» ghi ở LOAI`);
    assert.equal(tp[0], DOC_VB[loaiVanBan(b)], `${at}: chủ đề Phần I khớp loại văn bản ở LOAI`);
  } else assert.equal(tp[0], DOC[tl], `${at}: chủ đề Phần I khớp thể loại ghi ở tên đoạn đọc`);
  const ngan = doc.filter((q) => q.type === "essay"), tu = doc.filter((q) => q.type !== "essay");
  assert.ok(ngan.length <= 2, at + ": nhiều nhất hai câu tự luận ngắn ở Phần I");
  ngan.forEach((q) => {
    assert.ok(q.pt >= 0.5 && q.pt <= 1 && q.lv === 3, `${at}: câu tự luận ngắn 0,5–1 điểm, mức Vận dụng`);
    // app tự ghi “Gợi ý:” trước x, nên x của câu tự luận ngắn không mở đầu bằng chữ đó
    assert.ok(/khoảng \d–\d câu/.test(q.q) && !/^(Dàn ý )?[Gg]ợi ý:/.test(q.x) && q.x.length > 150 && q.rubric.length >= 2 && q.rubric.length <= 3, `${at}: câu tự luận ngắn (số câu trả lời, 2–3 ý chấm, có gợi ý)`);
  });
  assert.ok(tu.length >= 4 && tu.every((q) => q.pt >= 0.25 && q.pt <= 1), at + ": ít nhất bốn câu chấm tự động 0,25–1 điểm");
  assert.ok(tu.some((q) => q.lv === 1) && tu.some((q) => q.lv === 2), at + ": đọc hiểu có câu Biết và câu Hiểu chấm tự động");
  [1, 2, 3].forEach((lv) => assert.equal(r2(sum(doc.filter((q) => q.lv === lv).map((q) => q.pt))), MUC[lv], `${at}: điểm đọc hiểu mức ${lv}`));
  // Phần II: hai câu viết
  const viet = qs.filter((q) => q.part === P2);
  assert.equal(viet.length, 2, at + ": Phần II hai câu viết");
  viet.forEach((q, k) => {
    assert.equal(q.type, "essay", at + ": câu viết là tự luận");
    assert.ok(!q.p, at + ": câu viết không gắn đoạn đọc (câu cùng đoạn đọc phải cùng phần)");
    assert.equal(q.topic, k ? VIET2 : VIET1, at + ": chủ đề câu viết");
    assert.equal(q.pt, k ? 4 : 2, at + ": điểm câu viết");
    assert.ok(k ? /bài văn nghị luận \(khoảng 600 chữ\)/.test(q.q) : /^Viết đoạn văn nghị luận \(khoảng 200 chữ\)/.test(q.q), at + ": dung lượng câu viết");
    assert.ok(q.q.includes("«" + tenVanBan(psg) + "»"), at + ": câu viết ghi tên văn bản đọc hiểu");
    assert.deepEqual(q.rubric.map((r) => r.p), k ? BAI : DOAN, at + ": thang chấm sáu tiêu chí của đáp án thi");
    assert.ok(/^Dàn ý gợi ý:\n/.test(q.x) && q.x.length > 600, at + ": câu viết có dàn ý gợi ý");
  });
  qs.filter((q) => q.type === "essay").forEach((q) => {
    assert.equal(q.lv, 3, at + ": câu tự luận mức Vận dụng");
    q.rubric.forEach((r) => assert.ok(r.p === 0.25 || Number.isInteger(r.p * 2), `${at}: ý chấm ${r.p} điểm (0,25 hoặc bội của 0,5 để chấm được «Một phần»): ${r.c.slice(0, 50)}`));
  });
  // note: câu chung, đề thật đọc hiểu là 5 câu tự luận, điểm chấm tự động và câu tự luận tính từ dữ liệu, thể loại văn bản
  const G = Quiz.grade(qs, []), ess = qs.filter((q) => q.type === "essay");
  assert.ok(b.note.startsWith(NOTE0), at + ": note mở đầu bằng câu chung về khung đề tốt nghiệp THPT");
  assert.ok(/Ở đề thật, phần đọc hiểu gồm 5 câu tự luận/.test(b.note), at + ": note ghi đề thật đọc hiểu là câu tự luận");
  assert.ok(/Đề làm trong 120 phút/.test(b.note) && /trọng tâm lớp 12/.test(b.note), at + ": note ghi số phút, phạm vi");
  const m = /app chấm tự động [^(]*\(([\d,]+) điểm\), còn (\S+) câu tự luận \(([\d,]+) điểm\)/.exec(b.note);
  assert.ok(m, at + ": note ghi phần chấm tự động và phần tự chấm");
  assert.deepEqual([m[1], m[2], m[3]], [diem(G.auto), SOCHU[ess.length], diem(sum(ess.map((q) => q.pt)))], at + ": số điểm, số câu trong note khớp dữ liệu");
  const lvb = loaiVanBan(b);
  assert.ok(b.note.includes("Phần I (4 điểm): đọc hiểu " + (lvb === "truyện" ? "một truyện" : lvb === "thơ" ? "một bài thơ" : lvb === "kí" ? "một bài kí" : lvb === "kịch" ? "một đoạn kịch" : "một " + lvb)), at + ": note ghi thể loại văn bản đọc hiểu");
  assert.ok(b.note.includes("Phần II (6 điểm): viết đoạn văn nghị luận khoảng 200 chữ (2 điểm) và bài văn nghị luận xã hội khoảng 600 chữ (4 điểm)"), at + ": note ghi Phần II");
  // chấm như đề thi (Quiz.grade): làm đúng hết câu chấm tự động thì được đủ phần chấm tự động; Phần I 4 điểm, Phần II 6 điểm
  const dung = qs.map((q) => (q.type === "mc" ? 0 : q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a.slice() : null));
  const H = Quiz.grade(qs, dung);
  assert.equal(H.max, 10); assert.equal(H.got, H.auto); assert.equal(G.got, 0);
  assert.deepEqual(H.parts.map((x) => [x.part, x.max]), [[P1, 4], [P2, 6]], at + ": Phần I 4 điểm, Phần II 6 điểm");
  // vấn đề nghị luận xã hội
  assert.ok(VAN_DE[b.id] && VAN_DE[b.id].length >= 2 && qs[qs.length - 1].q.includes(VAN_DE[b.id][0]), at + ": vấn đề nghị luận xã hội ghi ở VAN_DE và có trong đề bài");
  // gọi người làm bài là “bạn”
  qs.forEach((q) => assert.ok(!/anh\/chị|anh, chị|các em|(^|[^\p{L}])em (hãy|có|nêu|cho)(?![\p{L}])|của em(?![\p{L}])/u.test(q.q), `${ten.get(q)}: gọi người làm bài là «bạn»`));
});
assert.equal(new Set(Object.values(VAN_DE).map((v) => v[0])).size, Object.keys(VAN_DE).length, "các đề không lặp vấn đề nghị luận xã hội");
assert.deepEqual(Object.keys(VAN_DE).sort(), DE.map((b) => b.id).sort(), "VAN_DE ghi đủ các đề");
// câu 1 Phần II: từ Đề 3, ít nhất một đề là đoạn văn so sánh, đánh giá (kiểu bài Viết của Ngữ văn 12, Bài 1, 2: so sánh, đánh giá hai tác
// phẩm truyện, thơ); văn bản đem so sánh người soạn viết, chép trong đề bài (ghi ở NGOAI)
const soSanh = DE.filter((b) => /^Viết đoạn văn nghị luận \(khoảng 200 chữ\) so sánh, đánh giá /.test(b.questions.find((q) => q.topic === VIET1).q));
if (DE.length >= 3) assert.ok(soSanh.length >= 1, "câu 1 Phần II: ít nhất một đề là đoạn văn so sánh, đánh giá");
soSanh.forEach((b) => {
  const q = b.questions.find((x) => x.topic === VIET1), m = /\(người soạn viết\): «([^»]+)»$/.exec(q.q);
  assert.ok(m && NGOAI.includes(m[1]), b.id + ": văn bản đem so sánh người soạn viết, chép trong đề bài, ghi ở NGOAI");
});
// từng cặp đề (1–2, 3–4): một văn bản văn học, một văn bản nghị luận hoặc thông tin
for (let i = 0; i + 1 < DE.length; i += 2) {
  const vb = [DE[i], DE[i + 1]].map((b) => /^văn bản /.test(loaiVanBan(b)));
  assert.equal(vb.filter(Boolean).length, 1, `${DE[i].id}, ${DE[i + 1].id}: một văn bản văn học, một văn bản nghị luận hoặc thông tin`);
}
// năm đề phủ ít nhất bốn loại văn bản; thể loại cụ thể không lặp (truyện, kí, kịch, văn bản: LOAI; thơ: thể thơ tính từ THO)
const loaiLon = DE.map(loaiVanBan);
assert.ok(new Set(loaiLon).size >= Math.min(DE.length, 4), "các đề phủ ít nhất bốn loại văn bản (năm đề): " + loaiLon.join(", "));
const loaiCuThe = DE.map((b) => {
  const id = maDoc(b), tl = theLoai(b.passages[id]);
  if (tl === "thơ") { assert.ok(THO[id], "bài thơ chưa có trong THO: " + id); return THO[id][1] === "tu-do" ? "thơ tự do" : THE[THO[id][0]].toLowerCase(); }
  assert.ok(LOAI[id] && LOAI_CUA[tl].test(LOAI[id]), `${b.id}: thể loại cụ thể của «${tenVanBan(b.passages[id])}» (${tl}) ghi ở LOAI`);
  return LOAI[id];
});
assert.equal(new Set(loaiCuThe).size, loaiCuThe.length, "thể loại cụ thể của văn bản đọc hiểu lặp giữa các đề: " + loaiCuThe.join(", "));
Object.keys(LOAI).forEach((id) => assert.ok(DE.some((b) => b.passages[id]), "LOAI ghi đoạn không có: " + id));
// vấn đề nghị luận xã hội: từ khoá có trong đề bài câu viết bài văn của đề, không có ở đề bài câu Viết nào của các kho Ngữ văn 12 và đề
// thi thử vào 10, ở đề bài câu tự luận nghị luận, nêu ý kiến (có «nghị luận», «ý kiến», «bàn về», «suy nghĩ») của các kho Ngữ văn,
// Tiếng Việt khác và của các đề thi thử tốt nghiệp khác.
const boDau = (s) => " " + String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() + " ";
const deBaiTuLuan = BANKS.filter((b) => b.subject === "Ngữ văn" || b.subject === "Tiếng Việt")
  .flatMap((b) => b.questions.filter((q) => q.type === "essay" && (!b.pool || q.src === b.id)).map((q) => [b.id, boDau(q.q)]))
  .filter(([id, q]) => /^van12-|^van9-vao10-/.test(id) || / (nghi luan|y kien|ban ve|suy nghi) /.test(q));
assert.ok(deBaiTuLuan.length > 30, "đọc được đề bài câu Viết, câu tự luận nghị luận của các kho Ngữ văn, Tiếng Việt");
let nKhoa = 0;
DE.forEach((b) => VAN_DE[b.id].slice(1).forEach((k) => {
  assert.ok(boDau(b.questions[b.questions.length - 1].q).includes(boDau(k)), `${b.id}: từ khoá «${k}» có trong đề bài câu viết bài văn`);
  const trung = [...new Set(deBaiTuLuan.filter(([id, q]) => id !== b.id && q.includes(boDau(k))).map(([id]) => id))];
  assert.deepEqual(trung, [], `${b.id}: từ khoá «${k}» của vấn đề nghị luận xã hội đã có ở đề bài câu tự luận của kho khác`);
  nKhoa++;
}));

/* ---------- thơ: số tiếng, khổ, vần (như tests/van9-vao10.js) ---------- */
DE.forEach((b) => Object.entries(b.passages).forEach(([id, ps]) => {
  if (theLoai(ps) !== "thơ") return;
  assert.ok(THO[id], "bài thơ chưa có trong THO: " + id);
  const [n, kieu] = THO[id], K = khoTho(ps);
  assert.ok(K.length >= 3, id + ": ít nhất ba khổ");
  if (kieu === "tu-do") { // thơ tự do: không quy định số tiếng mỗi dòng, số dòng mỗi khổ
    const dd = K.flat().map((l) => tieng(l).length);
    assert.ok(Math.min(...dd) >= 2 && Math.max(...dd) <= 12, id + ": dòng thơ tự do 2–12 tiếng");
    assert.ok(new Set(dd).size >= 4 && new Set(K.map((k) => k.length)).size >= 2, id + ": số tiếng các dòng, số dòng các khổ không đều");
    return;
  }
  K.forEach((k, i) => {
    assert.equal(k.length, 4, `${id}, khổ ${i + 1}: bốn dòng`);
    k.forEach((l, j) => assert.equal(tieng(l).length, n, `${id}, khổ ${i + 1}, dòng ${j + 1}: ${n} tiếng («${l}»)`));
    assert.equal(kieuVan(k), kieu, `${id}, khổ ${i + 1}: vần ${kieu}`);
  });
}));
Object.keys(THO).forEach((id) => assert.ok(DE.some((b) => b.passages[id]), "THO ghi đoạn không có: " + id));

/* ---------- đáp án tính lại từ chữ của văn bản đọc hiểu ---------- */
const motCau = (has) => { const m = ALL.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu, có ${m.length}`); return m[0]; };
const chuDoan = (q) => vanBanCua(q).text;
const co = (q, s) => { assert.ok(chuDoan(q).includes(s), `${ten.get(q)}: văn bản phải có «${s}»`); return true; };
const khongCo = (q, s) => !chuDoan(q).includes(s);
const yOf = (q, re) => { const k = q.o.findIndex((o) => re.test(o)); assert.ok(k >= 0, `${ten.get(q)}: không thấy ý ${re}`); return k; };
const tf = (q, rules) => { const a = q.a.slice(); rules.forEach(([re, v]) => { a[yOf(q, re)] = v; }); return a; };
const motLuaChon = (q, re) => { const ok = q.o.filter((o) => re.test(o)); assert.equal(ok.length, 1, `${ten.get(q)}: đúng một lựa chọn khớp ${re}`); return ok[0]; };
const doanVan = (q) => chuDoan(q).split("\n");
// bảng số liệu của văn bản thông tin: dòng “– <loại>: <a> món mang tới; <b> món sửa được”, dòng cuối là tổng cộng
const bangSua = (q) => {
  const R = doanVan(q).map((d) => /^– (.+?)(?: \([^()]*\))?: (\d+) món mang tới; (\d+) món sửa được$/u.exec(d)).filter(Boolean).map((m) => ({ ten: m[1], toi: +m[2], sua: +m[3] }));
  const tong = R.pop();
  assert.ok(R.length >= 3 && tong.ten === "Tổng cộng", "bảng có ít nhất ba loại đồ và dòng tổng cộng");
  assert.deepEqual([sum(R.map((r) => r.toi)), sum(R.map((r) => r.sua))], [tong.toi, tong.sua], "dòng tổng cộng bằng tổng các loại");
  R.forEach((r) => assert.ok(r.sua <= r.toi, r.ten + ": số món sửa được không quá số món mang tới"));
  return { R, tong };
};
// lời kể (không phải lời thoại: dòng mở đầu bằng “– ”)
const loiKe = (q) => doanVan(q).filter((d) => !/^– /.test(d)).join("\n");
const CHECKS = [
  // Đề 1: truyện ngắn «Đợi lửa nguội»
  { has: "«Đợi lửa nguội» được kể theo ngôi nào", right: (q) => {
    const t = chuDoan(q);
    assert.equal((t.match(/(^|[^\p{L}])[Tt]ôi(?![\p{L}])/gu) || []).length, 0, "người kể không xưng «tôi»");
    assert.ok((t.match(/Khoa/g) || []).length >= 10, "nhân vật chính được gọi bằng tên");
    return motLuaChon(q, /^Ngôi thứ ba;/); } },
  { has: "ông đặt những chiếc bình mới chuốt dưới ___", right: (q) => {
    const m = [...chuDoan(q).matchAll(/dưới ([\p{L} ]+?), nơi chỉ có bóng râm và gió/gu)];
    assert.equal(m.length, 1, "văn bản nói một lần về chỗ để bình khô");
    return m[0][1]; } },
  { has: "«Một vết nứt mảnh như sợi tóc chạy chéo qua thân bình", right: (q) => {
    const cau = /«([^»]+)»/.exec(q.q)[1];
    assert.ok(co(q, cau) && /(^|[^\p{L}])như(?![\p{L}])/u.test(cau), "câu trích có trong văn bản, có từ so sánh «như»");
    assert.ok(co(q, "Bình nứt không đựng được nước") && khongCo(q, "hoa văn"), "bình nứt không dùng được nữa; văn bản không nói tới hoa văn");
    return motLuaChon(q, /^Gợi vết nứt nhỏ/); } },
  { has: "Xét bốn ý sau về cách kể và các chi tiết của truyện", right: (q) => {
    const t = chuDoan(q), ke = loiKe(q);
    const trongKhoa = (ke.match(/(Khoa|[Cc]ậu) (nhìn mà thấy|thấy|tự nhủ|chỉ muốn|chờ)(?![\p{L}])/gu) || []).length;
    const trongOng = /(^|[^\p{L}])[Ôô]ng (nghĩ|thấy|tự nhủ|muốn|mong|lo|buồn|vui|giận)(?![\p{L}])/u.test(ke);
    return tf(q, [
      [/nhìn sự việc qua cảm nhận của Khoa/, trongKhoa >= 3 && !trongOng],
      [/ông mắng Khoa một trận/, !(co(q, "Nhưng ông không mắng.") && co(q, "rồi ngồi xuống bậc đá trước lò"))],
      [/được kể lại bằng lời của chính ông/, /\n– Năm ông mười sáu tuổi,[^\n]*lén mở cửa lò/.test(t)],
      [/bỏ lại ở bãi đất sau lò/, !(co(q, "trong ba lô của Khoa có thêm chiếc bình nứt") && khongCo(q, "bãi đất"))]]); } },
  { has: "Khoa nghe được «những tiếng tách khe khẽ»", right: (q) => {
    assert.ok(co(q, "đoạn phim nào dài quá vài phút là ngón tay cậu đã lướt sang đoạn khác") && co(q, "Không cầm điện thoại, cậu nghe được những tiếng tách khe khẽ")
      && co(q, "Lần đầu tiên, Khoa thấy thời gian không phải là thứ chỉ để vượt qua cho thật nhanh."), "trước kia Khoa quen lướt nhanh; ngồi bên lò, không cầm điện thoại, cậu mới nghe, mới thấy");
    assert.ok(co(q, "ông bảo đó là tiếng đất đang nguội dần") && khongCo(q, "sợ bóng tối"), "tiếng trong lò là tiếng đất nguội, không phải lò sắp vỡ; Khoa không sợ bóng tối");
    return motLuaChon(q, /^Khoa đã chịu lắng lại/); } },
  { has: "Thành ngữ «dục tốc bất đạt»", right: (q) => { const cau = [...q.q.matchAll(/«([^»]+)»/g)].map((m) => m[1])[1]; co(q, cau); return null; } },
  { has: "phân tích nhân vật ông ngoại trong truyện", right: (q) => { co(q, "ông ngoại"); return null; } },
  // Đề 2: văn bản nghị luận «Dấu chân trên xi măng ướt»
  { has: "«Dấu chân trên xi măng ướt» chủ yếu bàn về vấn đề gì", right: (q) => {
    const d = doanVan(q);
    assert.ok(/^Tối hôm ấy, Hà/.test(d[0]) && d[1].includes("Câu chuyện ấy khiến tôi tin rằng: mỗi lời bình luận trên mạng là một lời nói thật")
      && d[1].includes("trước khi bấm «Gửi», mỗi người cần dừng lại một nhịp để cân nhắc"), "luận đề nêu ở đoạn thứ hai, sau câu chuyện mở đầu");
    return motLuaChon(q, /^Phải nghĩ thật kĩ về những lời mình sắp viết/); } },
  { has: "Có cần thiết không? Có ___ không?", right: (q) => {
    const m = [...chuDoan(q).matchAll(/Điều mình viết có đúng không\? Có cần thiết không\? Có (\p{L}+(?: \p{L}+)?) không\?/gu)];
    assert.equal(m.length, 1, "ba câu tự hỏi ghi một lần trong văn bản");
    return m[0][1]; } },
  { has: "«giống như dấu chân in trên nền xi măng ướt»", right: (q) => {
    assert.ok(co(q, "Nó giống như dấu chân in trên nền xi măng ướt: in xuống thì dễ, xoá đi thì khó.") && co(q, "nằm đó rất lâu sau khi chính người viết đã quên"), "văn bản giải thích hình ảnh: in thì dễ, xoá thì khó; lời chê nằm lại rất lâu");
    return motLuaChon(q, /^Lời đã đăng lên mạng/); } },
  { has: "Bốn nhận xét dưới đây bàn về cách người viết lập luận", right: (q) => {
    const d = doanVan(q), coNguoi = d.find((x) => x.startsWith("Có người cho rằng"));
    assert.ok(coNguoi, "có đoạn mở đầu bằng «Có người cho rằng»");
    return tf(q, [
      [/mở đầu bằng một số liệu thống kê/, /\d|%/.test(d[0]) || !/^Tối hôm ấy, Hà/.test(d[0])],
      [/Câu chuyện của Hà ở đoạn đầu là dẫn chứng/, /^Tối hôm ấy, Hà/.test(d[0]) && d[1].includes("Câu chuyện ấy khiến tôi tin rằng")],
      [/thừa nhận một phần ý kiến khác/, coNguoi.includes("Tôi đồng ý rằng góp ý thẳng thắn là cần thiết") && coNguoi.includes("Nhưng nói thẳng khác với nói nặng.")],
      [/không nên chỉ ra chỗ chưa được/, !co(q, "góp ý thẳng thắn là cần thiết")]]); } },
  { has: "Các luận điểm của văn bản có quan hệ thế nào với luận đề", right: (q) => {
    const d = doanVan(q), dau = ["Tối hôm ấy, Hà", "Phần lớn những người", "Ông bà ta vẫn nói", "Màn hình còn khiến", "Có người cho rằng", "Vậy trước khi bấm «Gửi»", "Mạng xã hội giống"];
    assert.deepEqual(d.map((x, i) => x.startsWith(dau[i])), dau.map(() => true), "bảy đoạn: câu chuyện, luận đề, hai lí do, bàn về ý kiến khác, cách làm, kết");
    return motLuaChon(q, /^Lần lượt nêu lí do ủng hộ luận đề/); } },
  { has: "Ngoài ba câu người viết gợi ý", right: (q) => { co(q, "ta có thể tự hỏi ba câu"); return null; } },
  { has: "đánh giá sức thuyết phục của văn bản", right: (q) => { co(q, "Có người cho rằng"); return null; } },
  // Đề 3: bài thơ «Học trò bảy mươi» (thơ tám chữ, vần liền)
  { has: "«Học trò bảy mươi» được viết theo thể thơ nào", right: (q) => {
    const n = [...new Set(khoTho(vanBanCua(q)).flat().map((l) => tieng(l).length))];
    assert.equal(n.length, 1, "mọi dòng thơ cùng số tiếng");
    return motLuaChon(q, new RegExp("^" + THE[n[0]] + "$")); } },
  { has: "bàn tay của bà cả đời quen ___", right: (q) => {
    const m = [...chuDoan(q).matchAll(/Bàn tay ấy cả đời quen ([\p{L} ]+?),/gu)];
    assert.equal(m.length, 1, "bài thơ nói một lần về bàn tay của bà");
    return m[0][1]; } },
  { has: "«Nét chữ run như mạ non trước gió»", right: (q) => {
    const cau = /«([^»]+)»/.exec(q.q)[1];
    assert.ok(co(q, cau) && /(^|[^\p{L}])như(?![\p{L}])/u.test(cau), "câu trích có trong bài thơ, có từ so sánh «như»");
    assert.ok(co(q, "Tối ấy bên ngọn đèn") && khongCo(q, "ngoài đồng") && co(q, "quen cấy lúa"), "bà học buổi tối bên ngọn đèn, không phải ngoài đồng; bàn tay quen việc ruộng");
    return motLuaChon(q, /^Gợi nét chữ non, chưa vững của bà/); } },
  { has: "Bốn ý dưới đây bàn về chủ thể trữ tình, vần và kết cấu", right: (q) => {
    const t = chuDoan(q), K = khoTho(vanBanCua(q)), dau = K[0].join("\n"), het = K[K.length - 1].join("\n");
    return tf(q, [
      [/Chủ thể trữ tình là người cháu nay đã lớn/, !/(^|[^\p{L}])[Tt]ôi(?![\p{L}])/u.test(t) && (t.match(/cháu/g) || []).length >= 6 && co(q, "Mười năm sau") && co(q, "cất giữ đến giờ")],
      [/gieo vần cách/, K.every((k) => kieuVan(k) === "cach")],
      [/năm tám mươi tuổi/, !(co(q, "Năm cháu vào lớp Một, bà bảy mươi") && khongCo(q, "tám mươi"))],
      [/Khổ cuối nhắc lại hình ảnh ngọn đèn và cuốn vở/, ["ngọn đèn", "vở"].every((x) => dau.includes(x) && het.includes(x))]]); } },
  { has: "Vì sao chữ đầu tiên bà viết là tên cháu", right: (q) => {
    assert.ok(co(q, "Chữ đầu tiên bà viết là tên cháu,\nBà nâng niu như cầm vật quý báu.") && co(q, "Tên của mình, bà để viết sau cùng"), "tên cháu viết trước, được nâng niu; tên bà viết sau cùng");
    assert.ok(khongCo(q, "cô giáo") && khongCo(q, "quên") && co(q, "Thư của bà gửi"), "bài thơ không có cô giáo, không nói bà quên tên; về sau bà viết thư cho cháu");
    return motLuaChon(q, /^Với bà, đứa cháu quý hơn cả bản thân/); } },
  { has: "Bà bảo con chữ «cũng như hạt thóc»", right: (q) => { co(q, "Bà bảo con chữ cũng như hạt thóc,\nPhải gieo đủ mùa, mầm mới chịu mọc."); return null; } },
  { has: "so sánh, đánh giá hình ảnh người bà trong bài thơ", right: (q) => { co(q, "Bà xin làm học trò"); return null; } },
  { has: "hãy bàn về tinh thần học tập suốt đời", right: (q) => { co(q, "bà bảy mươi"); return null; } },
  // Đề 4: văn bản thông tin «Sửa thay vì vứt» (bảng số liệu đọc lại bằng bangSua)
  { has: "Xét theo cách thu thập, dữ liệu trong bảng", right: (q) => {
    assert.ok(co(q, "Sau mỗi buổi, nhóm ghi vào sổ từng món đồ") && co(q, "Bảng dưới đây tổng hợp từ cuốn sổ ấy."), "bảng tổng hợp từ cuốn sổ nhóm tự ghi");
    assert.ok(["khảo sát", "chuyên gia", "phỏng vấn", "của phường"].every((x) => khongCo(q, x)), "văn bản không lấy số liệu từ khảo sát, chuyên gia, phường");
    return motLuaChon(q, /^Sơ cấp, vì chính nhóm ghi chép/); } },
  { has: "phần lớn những món đồ chưa sửa được là do thiếu ___ thay thế", right: (q) => {
    const m = [...chuDoan(q).matchAll(/Trong (\d+) món chưa sửa được, (\d+) món thiếu ([\p{L} ]+?) thay thế[^;]*; (\d+) món hỏng quá nặng/gu)], { tong } = bangSua(q);
    assert.equal(m.length, 1, "văn bản nói một lần về lí do chưa sửa được");
    const [a, b, c] = [+m[0][1], +m[0][2], +m[0][4]];
    assert.ok(a === tong.toi - tong.sua && a === b + c && b > c, "số món chưa sửa được khớp bảng; thiếu thứ thay thế là phần lớn");
    return m[0][3]; } },
  { has: "loại đồ nào có tỉ lệ sửa được thấp nhất", right: (q) => {
    const { R } = bangSua(q), tl = R.map((r) => r.sua / r.toi), k = tl.indexOf(Math.min(...tl));
    assert.equal(tl.filter((x) => x === tl[k]).length, 1, "một loại có tỉ lệ sửa được thấp nhất");
    const nhieu = R.reduce((a, r) => (r.toi - r.sua > a.toi - a.sua ? r : a));
    assert.ok(nhieu.ten !== R[k].ten && q.o.slice(1).includes(nhieu.ten), "loại có nhiều món chưa sửa được nhất khác loại có tỉ lệ thấp nhất, là một lựa chọn sai");
    return motLuaChon(q, new RegExp("^" + R[k].ten + "$")); } },
  { has: "Đối chiếu với bảng và các đoạn của văn bản", right: (q) => {
    const { R, tong } = bangSua(q), max = Math.max(...R.map((r) => r.toi)), nhat = R.filter((r) => r.toi === max);
    assert.ok(co(q, tong.sua + " món đã sửa xong sẽ thành khoảng 1,5 tấn rác"), "1,5 tấn là ước tính cho số món đã sửa xong trong bảng");
    return tf(q, [
      [/Đồ điện gia dụng là loại đồ được mang tới nhiều nhất/, nhat.length === 1 && nhat[0].ten === "Đồ điện gia dụng"],
      [/Hơn ba phần tư số đồ mang tới/, 4 * tong.sua > 3 * tong.toi],
      [/khẳng định cả khu phố mỗi năm bỏ đi/, !co(q, "nên không cho biết cả khu phố mỗi năm bỏ đi bao nhiêu món còn sửa được")],
      [/không có nhân vật nào/, !(co(q, "bà Tư ôm tới") && co(q, "Bác Hùng, thợ điện") && co(q, "Bà Tư cười: «Tôi cứ tưởng phải mua quạt mới.»"))]]); } },
  { has: "Câu chuyện chiếc quạt của bà Tư có tác dụng gì", right: (q) => {
    const t = chuDoan(q), { R } = bangSua(q), dien = R.find((r) => r.ten === "Đồ điện gia dụng"), k = t.indexOf("bà Tư ôm tới chiếc quạt");
    assert.ok(k >= 0 && k < t.indexOf("Bảng."), "câu chuyện đứng trước bảng số liệu");
    assert.ok(dien.sua < dien.toi && khongCo(q, "quảng cáo"), "không phải mọi món đồ điện đều sửa được; văn bản không quảng cáo");
    return motLuaChon(q, /^Dẫn người đọc vào vấn đề qua một trường hợp cụ thể/); } },
  { has: "nhóm định «gọi điện hỏi lại chủ đồ sau một tháng»", right: (q) => { co(q, "mà sổ không theo dõi được"); return null; } },
  { has: "đánh giá cách người viết sử dụng dữ liệu", right: (q) => {
    const t = chuDoan(q), { tong } = bangSua(q), m = /(\d+) lần chủ đồ tự tay/.exec(t), b = /nhóm mở (\d+) buổi/.exec(t);
    assert.ok(m && +m[1] <= tong.sua && b && +b[1] <= 52, "số lần chủ đồ tự sửa không quá số món sửa được; số buổi không quá số Chủ nhật trong một năm");
    return null; } },
  { has: "hãy bàn về thói quen «dùng rồi bỏ»", right: (q) => { co(q, "thói quen «dùng rồi bỏ»"); return null; } }
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
// phép chia “a/b ≈ c%” trong lời giải tính lại (làm tròn đến hàng đơn vị)
let nTile = 0;
ALL.forEach((q) => [...String(q.x).matchAll(/(\d+)\/(\d+) ≈ (\d+)%/g)].forEach((m) => { assert.equal(Math.round((100 * m[1]) / m[2]), +m[3], `${ten.get(q)}: ${m[0]}`); nTile++; }));
// câu nào có đáp án tính được (trắc nghiệm, điền, đúng/sai) cũng có mục trong CHECKS
ALL.filter((q) => q.type !== "essay").forEach((q) => assert.ok(CHECKS.some((c) => q.q.includes(c.has)), `${ten.get(q)}: chưa có mục kiểm tra đáp án trong CHECKS`));
// câu trích trong «» (từ ba tiếng) ở đề bài, lựa chọn và lời giải câu chấm tự động có trong văn bản đọc hiểu (bỏ “/” ngăn dòng)
const gon = (s) => String(s).normalize("NFC").replace(/\s*\/\s*/g, " ").replace(/\s+/g, " ").trim().toLowerCase();
let nTrich = 0;
ALL.forEach((q) => {
  const ps = vanBanCua(q), text = gon(ps.text);
  [q.q].concat(q.o || [], q.type === "essay" ? [] : [q.x]).forEach((s) => [...s.matchAll(/«([^»]+)»/g)].forEach((m) => {
    m[1].split("…").map((x) => x.trim()).filter((x) => tieng(x.replace(/_+/g, " ")).length >= 3 && gon(x) !== gon(tenVanBan(ps)) && !NGOAI.includes(x)).forEach((x) => {
      // chỗ trống của câu điền (___) khớp với bất kì chữ nào
      const re = new RegExp(gon(x).replace(/[.!?]$/, "").split(/_{3,}/).map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join(".+?"));
      assert.ok(re.test(text), `${ten.get(q)}: câu trích «${x}» không có trong văn bản đọc hiểu`);
      nTrich++;
    });
  }));
});
NGOAI.forEach((x) => assert.ok(ALL.some((q) => q.q.includes("«" + x + "»")) && !DE.some((b) => gon(doan(b, maDoc(b)).text).includes(gon(x))), "NGOAI chỉ ghi câu trích có ở đề bài, không có trong văn bản: " + x));

/* ---------- dạng câu, độ dài lựa chọn, nhãn chủ đề ---------- */
const tf4 = ALL.filter((q) => q.type === "tf4"), kieu = {};
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), ten.get(q) + ": câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
ALL.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của ý: " + ten.get(q)));
const mc = ALL.filter((q) => q.type === "mc");
mc.forEach((q) => {
  const mx = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * mx, mx + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.ok(!q.o.some((o) => /^(Tất cả|Cả hai|Cả ba|Cả A)/.test(o)), "lựa chọn kiểu «Tất cả…» không hợp khi app xáo lựa chọn: " + ten.get(q));
});
const daiNhat = mc.filter((q) => q.o[0].length >= Math.max(...q.o.slice(1).map((o) => o.length))).length;
const nganNhat = mc.filter((q) => q.o[0].length <= Math.min(...q.o.slice(1).map((o) => o.length))).length;
assert.ok(3 * daiNhat <= mc.length, `đáp án là lựa chọn dài nhất ở ${daiNhat}/${mc.length} câu nhiều lựa chọn`);
assert.ok(3 * nganNhat <= mc.length, `đáp án là lựa chọn ngắn nhất ở ${nganNhat}/${mc.length} câu nhiều lựa chọn`);
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
  // chủ đề chỉ có ở đề thi thử tốt nghiệp: không trùng chữ chủ đề của các kho Ngữ văn 12 khác
  assert.ok(!BANKS.some((b) => b.grade === 12 && b.subject === "Ngữ văn" && !/^van12-tn-/.test(b.id) && b.questions.some((q) => q.topic === t)), `chủ đề «${t}» trùng chữ chủ đề của kho Ngữ văn 12 khác`);
});

/* ---------- dò lộ đáp án ----------
   Đề cố định: mọi câu của một đề cùng ra, đề bài, lựa chọn của mọi câu xem được qua bảng số câu, lời giải hiện ngay sau mỗi câu
   khi ôn luyện; note hiện ở màn mở đề. Đáp án (lựa chọn đúng, đáp án điền) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở
   xuống thì lấy cả đáp án); chuỗi có ở đề bài, lựa chọn, lời giải, thang chấm của câu khác cùng đề, ở note, thì in ra với DO_LO=1 để
   xem tay. Đề “Ôn chủ đề” rút chung câu cùng chủ đề của các đề khác nhau (kèm đoạn đọc của chúng): so cả các cặp đó. */
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
  b.questions.forEach((k) => { if (k !== q) capDo.push([q, k, k.p && k.p !== q.p ? [b.passages[k.p].text] : []]); });
}));
ALL.forEach((q) => ALL.forEach((k) => { if (deOf.get(q) !== deOf.get(k) && q.topic === k.topic && q.type !== "essay" && k.type !== "essay") capDo.push([q, k, [vanBanCua(k).text]]); }));
const lo = doLo(capDo, (q) => ten.get(q));
if (process.env.DO_LO) console.log("Đáp án có ở câu rút được cùng lúc (xem tay):\n" + lo.join("\n"));
// đã xem (Phiên N12-tn-van): chữ chung, không làm lộ đáp án.
const DA_XEM = [];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
{ // bộ dò bắt được chỗ lộ cố ý viết sai
  const a = motCau("ông đặt những chiếc bình mới chuốt dưới ___"), b = motCau("«Một vết nứt mảnh như sợi tóc chạy chéo qua thân bình");
  const gia = Object.assign({}, b, { x: b.x + " Những chiếc bình mới chuốt được để khô dưới mái hiên." });
  assert.ok(doLo([[a, gia, []]], (q) => ten.get(q) || "giả").some((s) => / mái hiên$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const tuKD = (s) => khongDau(s).split(" ").filter(Boolean);
const chuoi = (s, k) => { const w = tuKD(s), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const boChuoi = (texts, k) => { const set = new Set(); texts.forEach((t) => chuoi(t, k).forEach((c) => set.add(c))); return set; };
// mọi trường chữ của một đề, theo từng câu (đoạn đọc, note tính vào câu đầu dùng chúng)
const truongDe = (b) => b.questions.map((q, i) => ({ q, s: chu(q).concat(i ? [] : [b.note], q.p && b.questions.findIndex((x) => x.p === q.p) === i ? [b.passages[q.p].title, b.passages[q.p].text] : []) }));
if (SACH.length) {
  assert.ok(SACH.some((f) => /ngu-van-12-tap-2/.test(f)), "OnUp-Book có Ngữ văn 12 tập hai");
  const texts = SACH.map((f) => fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]* ===/g, " "));
  const bao = (k) => { const set = boChuoi(texts, k); return DE.flatMap((b) => truongDe(b).flatMap(({ q, s }) => s.flatMap((x) => chuoi(x, k).filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`)))); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  // ngữ liệu ngoài sách Ngữ văn 6–12: tên văn bản không có trong sách Ngữ văn 6–12. So sau khi bỏ dấu, giữ nguyên âm (boDau): tên ba,
  // bốn chữ mà gộp nguyên âm thì khớp nhầm nhiều câu của sách («Đợi lửa nguội» thành «da la nga»).
  const vanSach = SACH.filter((f) => /lop-([6-9]|1[0-2])\/ngu-van-/.test(f)).map((f) => boDau(fs.readFileSync(f, "utf8")));
  assert.ok(vanSach.length >= 14, "OnUp-Book có sách Ngữ văn 6–12");
  DE.forEach((b) => Object.values(b.passages).forEach((ps) => assert.ok(!vanSach.some((t) => t.includes(boDau(tenVanBan(ps)))), `${b.id}: «${tenVanBan(ps)}» có trong sách Ngữ văn 6–12`)));
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21), giữa các đề thi thử tốt nghiệp với nhau ---------- */
{
  const khac = BANKS.filter((b) => !/^van12-tn-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)
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
console.log(nKhoa + " từ khoá vấn đề nghị luận xã hội dò ở " + deBaiTuLuan.length + " đề bài câu Viết, câu tự luận nghị luận; loại văn bản đọc hiểu: " + loaiCuThe.join(", ") + ".");
console.log(DE.length + " đề, " + ALL.length + " câu (" + ALL.filter((q) => q.type !== "essay").length + " câu chấm tự động, " + ALL.filter((q) => q.type === "essay").length + " câu tự luận); " + nCheck + " câu tính lại đáp án, " + nTile + " tỉ lệ tính lại, " + nTrich + " câu trích đối chiếu văn bản; đáp án là lựa chọn dài nhất ở " + daiNhat + "/" + mc.length + ", ngắn nhất ở " + nganNhat + "/" + mc.length + " câu nhiều lựa chọn.");
console.log("VAN12 TN OK");
