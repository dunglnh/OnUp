// Kiểm tra các đề Tiếng Anh thi thử tốt nghiệp THPT (data/banks/12-ta.js, ta12-tn-de<N>; Phiên N12-tn-ta: Đề 1–2; Phiên N12-tn-ta-b:
// Đề 3–4, câu 1–6 điền vào một thông báo thay cho quảng cáo; Phiên N12-tn-ta-c: Đề 5 quảng cáo, Đề 6 thông báo, câu chọn where sau
// danh từ chỉ nơi chốn; Phiên N12-tn-ta-d: Đề 7 quảng cáo, Đề 8 thông báo, câu giới từ đi sau tính từ (GT); Phiên N12-tn-ta-e: Đề 9
// quảng cáo, Đề 10 thông báo, rà cả mười đề (bảng chủ điểm CHU_DIEM, dài nhất ở cả các đề); phiên thêm đề thì mở rộng script này: thêm
// khoá của đề vào RIENG và một dòng vào CHU_DIEM). Đề tính điểm (Phiên K5), khung đề tốt nghiệp THPT từ năm 2025 (Quyết định
// 764/QĐ-BGDĐT; đề chính thức năm 2026 giữ nguyên; docs/KE-HOACH-NOI-DUNG.md, mục 2 và mục 7, khối “Phiên N12-tn-ta”). Số đề, số câu lấy
// từ danh mục (không ghi cứng).
// Kiểm tra từng đề: danh mục (tên, khối, môn, file, 50 phút, pts 10, gắn vào tn-thpt-2027; tên tiếng Anh do Quiz.title dựng); 40 câu
// nhiều lựa chọn, mỗi câu 4 lựa chọn, pt 0,25; sáu nhóm câu 6 – 6 – 5 – 5 – 8 – 10, mỗi nhóm một đoạn ở passages, câu liền nhau, đúng
// part (Part I. Cloze texts 1–12, Part II. Arrangement 13–17, Part III. Text completion 18–22, Part IV. Reading comprehension 23–40),
// đúng chủ đề (Cloze, Arrangement, Text completion, Reading), đúng lời dặn của đoạn (câu 1–6: quảng cáo hoặc thông báo); chỗ trống (1)–(6), (7)–(12), (18)–(22) theo thứ
// tự, mỗi câu hỏi đúng chỗ trống của nó; năm bộ (13)–(17): hai lời thoại (bộ 13 ba dòng a–c, bộ 14 năm dòng, hai người nói), một thư
// (lời chào Dear …, lời kết và tên), hai đoạn văn (mỗi dòng một câu); bài đọc 1 khoảng 300 từ, bài đọc 2 khoảng 400 từ có đủ [I]–[IV]
// trong đoạn mà câu chọn vị trí hỏi; các dạng câu đọc hiểu như đề tham khảo năm 2025 (DANG_DOC); mức độ 9 Biết, 15 Hiểu, 16 Vận dụng,
// phần nào cũng đủ ba mức; Quiz.grade (đúng hết: 3 – 1,25 – 1,25 – 4,5, tổng 10; sai hết: 0); note (khung đề, số câu, số phút, điểm
// mỗi câu, các phần với số câu tính từ dữ liệu, không câu nghe, phát âm, viết, app chấm cả đề).
// Tính lại đáp án bằng code (RIENG: mỗi câu một mục kiểm tra): thứ tự tính từ (ADJ), giới từ đi sau tính từ (GT), dạng của từ (HO_TU, từ loại chỗ trống cần), rút gọn
// mệnh đề quan hệ (PHAN_TU; to-infinitive sau the first, the last, the only), đại từ quan hệ theo danh từ trước chỗ trống (DT_QH; nơi chốn: where, sau chỗ trống là mệnh đề đủ chủ ngữ, động từ), cụm từ cố định (CUM, từ đứng sau chỗ trống), động từ + to-infinitive hay -ing (MAU), từ hạn định với danh
// từ đếm được số ít, số nhiều, không đếm được (DANH, LUONG), cụm động từ theo nghĩa (PV, tín hiệu trong đoạn), từ nối theo quan hệ ý và
// loại từ (QH: trạng từ trước dấu phẩy, giới từ trước danh từ, liên từ trước mệnh đề), nghĩa của từ (NGHIA), từ bổ nghĩa cho so sánh hơn,
// đại từ quan hệ sở hữu; câu sắp xếp: thử mọi thứ tự, chỉ một thứ tự hợp các ràng buộc (người nói lần lượt; câu có từ nối, từ chỉ lại
// đứng sau câu nó chỉ tới) và đó là đáp án; câu điền câu, mệnh đề: bộ phân loại nhỏ (mệnh đề đầy đủ có động từ chia, mệnh đề quan hệ,
// phân từ, cụm sau before, mệnh đề quan hệ who, mệnh đề sau until, if, while) và chỗ trống cần loại nào, chỉ đáp án hợp; câu đọc hiểu đối chiếu chữ của đoạn đọc (từ trái nghĩa, gần nghĩa
// theo TRAI, GAN; đại từ chỉ lại chủ ngữ của câu trước; ý không được nhắc; ý đúng; câu tóm tắt, diễn đạt lại, suy luận theo ý có trong
// đoạn và lỗi của từng lựa chọn sai; đoạn có ý được hỏi; vị trí [I]–[IV] duy nhất hợp từ chỉ lại của câu cần chèn).
// Rồi: đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất (kể cả bằng nhau) ở từ một phần sáu đến một
// phần ba số câu của mỗi đề (không tính câu mọi lựa chọn dài bằng nhau: thứ tự câu, thứ tự tính từ, số đoạn), không là lựa chọn duy
// nhất có chữ của nhãn chủ đề; cả các đề cộng lại: đáp án là lựa chọn dài nhất ở không quá một phần ba số câu (Phiên N12-tn-ta-e);
// mỗi nhóm câu theo một chủ điểm (CHU_DIEM: nhóm 1, 2, 4, 5, 6 là tên Unit của Global Success 10–12, có OnUp-Book thì so với mục lục
// trong README của sách; nhóm 3 là loại thư của bộ (15); mỗi mục kèm một cụm chữ có trong đoạn), không hai đề cùng chủ điểm ở cùng nhóm câu;
// lời giải không nhắc vị trí lựa chọn; dò lộ đáp án giữa mọi cặp câu của một đề (mọi đoạn hiện cùng đề), với note, và giữa câu cùng chủ
// đề của các đề thi thử và ba kho Tiếng Anh 12 (đề “Ôn chủ đề”: Cloze, Reading rút chung; DO_LO=1 in ra để xem tay, đã xem ở DA_XEM);
// đáp án câu điền không có ở chỗ khác của chính đoạn đó; đáp án không trùng câu cùng chủ đề của kho Tiếng Anh 12 khác; đề bài không gần
// trùng câu của các kho Tiếng Anh 12 khác (cặp hai từ liền nhau chung, bỏ lời dặn chuẩn LOI_DAN). Có sách ở ../OnUp-Book (repo riêng
// tư) thì từ được hỏi và đáp án câu từ vựng có trong sách Tiếng Anh 6–12 (Global Success), mọi trường chữ (cả đoạn đọc) không có chuỗi 8
// từ trùng chữ OCR của mọi cuốn (DO_SACH=1 in chuỗi 6 từ). So với mọi câu, đoạn đọc của các kho khác và giữa các đề thi thử với nhau:
// không chuỗi 8 từ nào trùng (bỏ lời dặn chuẩn; DO_KHO=1 in chuỗi 5 từ). Hai bước so chuỗi này tra bằng tập chuỗi (Phiên N12-tn-ta-e;
// cùng kết quả, chạy khoảng 15 giây thay vì gần 5 phút).
// Chạy: node tests/ta12-tn.js → in TA12 TN OK.
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
const soTu = (s) => String(s).replace(/\[I+V?\]|\[IV\]/g, " ").split(/\s+/).filter((w) => /[A-Za-z0-9]/.test(w)).length;

/* ---------- khung đề (docs/KE-HOACH-NOI-DUNG.md, mục 2; mục 7, khối “Phiên N12-tn-ta”) ---------- */
const P = ["Part I. Cloze texts", "Part II. Arrangement", "Part III. Text completion", "Part IV. Reading comprehension"];
const LD = {
  qc: "Read the advertisement. Choose the best option for each numbered blank.",
  tb: "Read the announcement. Choose the best option for each numbered blank.",
  tr: "Read the leaflet. Choose the best option for each numbered blank.",
  sx: "Read the sets of lines and sentences (13)–(17). Then answer the questions.",
  dien: "Read the text. Choose the best option to complete each numbered blank.",
  doc: "Read the text. Then answer the questions."
};
// sáu nhóm câu như đề tham khảo năm 2025: số câu, phần, chủ đề, lời dặn của đoạn, số từ của đoạn
const NHOM = [
  { n: 6, part: 0, topic: "Cloze", ld: [LD.qc, LD.tb], tu: [70, 160] },
  { n: 6, part: 0, topic: "Cloze", ld: LD.tr, tu: [80, 200] },
  { n: 5, part: 1, topic: "Arrangement", ld: LD.sx, tu: [150, 450] },
  { n: 5, part: 2, topic: "Text completion", ld: LD.dien, tu: [120, 260] },
  { n: 8, part: 3, topic: "Reading", ld: LD.doc, tu: [260, 360] },
  { n: 10, part: 3, topic: "Reading", ld: LD.doc, tu: [360, 460] }
];
// mức độ mỗi đề (nhận định đề năm 2025, 2026: khoảng 9 câu Biết, 15 Hiểu, 16 Vận dụng)
const MUC = { 1: 9, 2: 15, 3: 16 };
// dạng câu đọc hiểu như đề tham khảo năm 2025 (bài 1: 8 câu, bài 2: 10 câu)
const DANG = {
  khong: /\bNOT\b/, trai: /is OPPOSITE in meaning to ___\.$/, gan: /is closest in meaning to ___\.$/, chi: /refers to ___\.$/,
  dien: /^Which of the following best paraphrases the sentence “/, dung: /^Which of the following is TRUE according to the passage\?$/,
  doan: /^In which paragraph does the writer /, chen: /^Where in paragraph \d does the following sentence best fit\? “/,
  tomDoan: /^Which of the following best summarises paragraph \d\?$/, tomBai: /^Which of the following best summarises the passage\?$/,
  suy: /^Which of the following can be inferred from /
};
const dangCua = (q) => Object.keys(DANG).filter((k) => DANG[k].test(q.q));
const DANG_DOC = [
  { khong: 1, trai: 1, chi: 1, gan: 1, dien: 1, dung: 1, doan: 2 },
  { chen: 1, gan: 1, chi: 1, khong: 1, tomDoan: 1, trai: 1, dung: 1, dien: 1, suy: 1, tomBai: 1 }
];

const DE = BANKS.filter((b) => /^ta12-tn-de\d+$/.test(b.id)).sort((a, b) => so(a) - so(b));
assert.ok(DE.length >= 2, "có ít nhất hai đề Tiếng Anh thi thử tốt nghiệp");
DE.forEach((b, i) => assert.equal(so(b), i + 1, "số đề liền nhau từ Đề 1: " + b.id));
const ev = EVENTS.find((e) => e.id === "tn-thpt-2027");
assert.ok(ev && ev.grades.join() === "12" && ev.subjects.includes("Tiếng Anh"), "kì thi tn-thpt-2027 của khối 12 có môn Tiếng Anh");
const ten = new Map(), deOf = new Map();
DE.forEach((b) => b.questions.forEach((q, i) => { ten.set(q, "tn-de" + so(b) + "#" + (i + 1)); deOf.set(q, b); }));
const ALL = DE.flatMap((b) => b.questions);
const doanCua = (q) => deOf.get(q).passages[q.p];
const soCau = (q) => deOf.get(q).questions.indexOf(q) + 1;
const nhomCua = (q) => { let k = soCau(q); for (let i = 0; i < NHOM.length; i++) { if (k <= NHOM[i].n) return i; k -= NHOM[i].n; } return -1; };
const dauNhom = (i) => 1 + sum(NHOM.slice(0, i).map((x) => x.n));
const doanVan = (t) => String(t).split("\n").map((l) => l.trim()).filter(Boolean); // đoạn văn của bài đọc
const cauVan = (t) => String(t).replace(/\s*\[I+V?\]|\s*\[IV\]/g, "").split(/(?<=[.!?”])\s+(?=[A-Z“])/); // câu của một đoạn
const SOCHU = ["zero", "one", "two", "three", "four", "five", "six"];

DE.forEach((b) => {
  const at = b.id, qs = b.questions, N = so(b);
  assert.equal(b.title, `Tiếng Anh 12 · Thi thử tốt nghiệp · Đề ${N}`, at + ": tên đề");
  assert.equal(Quiz.title(b, "en"), `English 12 · Mock Graduation Exam · Test ${N}`, at + ": tên tiếng Anh trên màn làm đề");
  assert.equal(b.grade, 12); assert.equal(b.subject, "Tiếng Anh"); assert.equal(b.file, "12-ta.js");
  assert.equal(b.minutes, 50, at + ": 50 phút"); assert.equal(b.pts, 10, at + ": thang 10 điểm"); assert.ok(!b.pool, at + ": đề cố định");
  assert.equal(qs.length, b.n, at + ": n bằng số câu trong file"); assert.equal(qs.length, sum(NHOM.map((x) => x.n)), at + ": 40 câu");
  assert.ok(ev.banks.includes(b.id), at + ": gắn vào tn-thpt-2027");
  qs.forEach((q) => {
    assert.equal(q.type, "mc", ten.get(q) + ": câu nhiều lựa chọn"); assert.equal(q.o.length, 4, ten.get(q) + ": 4 lựa chọn");
    assert.equal(q.pt, 0.25, ten.get(q) + ": 0,25 điểm"); assert.ok([1, 2, 3].includes(q.lv), ten.get(q) + ": có mức độ");
    assert.ok(q.p && b.passages[q.p], ten.get(q) + ": có đoạn ở passages");
    assert.equal(q.part, P[NHOM[nhomCua(q)].part], ten.get(q) + ": part"); assert.equal(q.topic, NHOM[nhomCua(q)].topic, ten.get(q) + ": chủ đề");
  });
  assert.deepEqual([...new Set(qs.map((q) => q.part))], P, at + ": bốn phần đúng tên, đúng thứ tự");
  // sáu nhóm: mỗi nhóm một đoạn riêng, câu liền nhau
  const ps = NHOM.map((x, i) => { const g = qs.slice(dauNhom(i) - 1, dauNhom(i) - 1 + x.n), p = g[0].p; assert.ok(g.every((q) => q.p === p), `${at}: nhóm ${i + 1} dùng một đoạn`); return p; });
  assert.equal(new Set(ps).size, 6, at + ": sáu nhóm, sáu đoạn khác nhau"); assert.equal(Object.keys(b.passages).length, 6, at + ": sáu đoạn ở passages");
  NHOM.forEach((x, i) => {
    const ps1 = b.passages[ps[i]], w = soTu(ps1.text);
    assert.ok([].concat(x.ld).includes(ps1.title), `${at}: lời dặn của đoạn ${ps[i]}`);
    assert.ok(w >= x.tu[0] && w <= x.tu[1], `${at}: đoạn ${ps[i]} ${w} từ (${x.tu.join("–")})`);
  });
  // chỗ trống (k) ___ theo thứ tự; câu k hỏi đúng chỗ trống k
  [0, 1, 3].forEach((i) => {
    const t = b.passages[ps[i]].text, ks = Array.from({ length: NHOM[i].n }, (_, j) => dauNhom(i) + j);
    assert.deepEqual(t.match(/\(\d+\) ___/g), ks.map((k) => `(${k}) ___`), `${at}: đoạn ${ps[i]} có chỗ trống ${ks[0]}–${ks[ks.length - 1]} theo thứ tự`);
    ks.forEach((k) => assert.equal(qs[k - 1].q, `Choose the best option for blank (${k}).`, `${at}: câu ${k} hỏi chỗ trống (${k})`));
  });
  // năm bộ sắp xếp (13)–(17)
  const bo = boSapXep(b.passages[ps[2]].text);
  assert.deepEqual(Object.keys(bo).map(Number), [13, 14, 15, 16, 17], at + ": năm bộ (13)–(17)");
  const LOAI_SX = { 13: "exchange", 14: "exchange", 15: "letter", 16: "paragraph", 17: "paragraph" };
  Object.entries(bo).forEach(([k, x]) => {
    const q = qs[k - 1], loai = LOAI_SX[k], kind = loai === "exchange" ? "lines" : "sentences";
    assert.equal(q.q, `Choose the best order of the ${kind} in (${k}) to make a meaningful ${loai}.`, `${at}: đề bài câu ${k}`);
    assert.deepEqual(Object.keys(x.dong), (k === "13" ? "abc" : "abcde").split(""), `${at}: bộ (${k}) có các dòng ${k === "13" ? "a–c" : "a–e"}`);
    if (loai === "exchange") {
      const ai = Object.values(x.dong).map((d) => { const m = /^([A-Z][a-z]+(?: [A-Z][a-z]+)?): [A-Z].*[.?!]$/.exec(d); assert.ok(m, `lời thoại “Tên: …”: ${d}`); return m[1]; });
      assert.equal(new Set(ai).size, 2, `${at}: bộ (${k}) hai người nói`);
    } else {
      Object.values(x.dong).forEach((d) => assert.ok(/^[A-Z].*[.!?]$/.test(d) && !/[.!?] [A-Z]/.test(d.replace(/\b(Mr|Ms|Mrs|Dr)\. /g, "")), `${at}: bộ (${k}) mỗi dòng một câu: ${d}`));
      if (loai === "letter") assert.ok(/^Dear [A-Z][a-z]+( [A-Z][a-z]+)?,$/.test(x.dau) && /^(Best wishes|Yours sincerely|Love|Yours faithfully),$/.test(x.cuoi[0]) && x.cuoi.length === 2, `${at}: bộ (${k}) là thư có lời chào, lời kết và tên`);
      else assert.ok(!x.dau && !x.cuoi.length, `${at}: bộ (${k}) là đoạn văn`);
    }
  });
  // bài đọc: dạng câu như đề tham khảo, [I]–[IV] trong đoạn mà câu chọn vị trí hỏi
  [4, 5].forEach((i, j) => {
    const g = qs.slice(dauNhom(i) - 1, dauNhom(i) - 1 + NHOM[i].n), dem = {};
    g.forEach((q) => { const d = dangCua(q); assert.equal(d.length, 1, `${ten.get(q)}: đúng một dạng câu đọc hiểu (${d.join(", ")})`); dem[d[0]] = (dem[d[0]] || 0) + 1; });
    Object.entries(DANG_DOC[j]).forEach(([d, n]) => assert.ok((dem[d] || 0) >= n, `${at}: bài đọc ${j + 1} có ${n} câu dạng ${d} (${JSON.stringify(dem)})`));
    const t = b.passages[ps[i]].text, mk = t.match(/\[I+V?\]|\[IV\]/g) || [];
    if (j === 1) {
      const c = g.find((q) => DANG.chen.test(q.q)), dv = +/paragraph (\d)/.exec(c.q)[1];
      assert.deepEqual(mk, ["[I]", "[II]", "[III]", "[IV]"], `${at}: bài đọc 2 có [I]–[IV] theo thứ tự`);
      assert.deepEqual((doanVan(t)[dv - 1].match(/\[I+V?\]|\[IV\]/g) || []), mk, `${at}: [I]–[IV] ở đoạn ${dv}`);
      assert.deepEqual(c.o.slice().sort(), mk.slice().sort(), `${at}: câu chọn vị trí có bốn lựa chọn [I]–[IV]`);
    } else assert.equal(mk.length, 0, `${at}: bài đọc 1 không có [I]–[IV]`);
  });
  // mức độ: 9 – 15 – 16, phần nào cũng đủ ba mức
  [1, 2, 3].forEach((lv) => assert.equal(qs.filter((q) => q.lv === lv).length, MUC[lv], `${at}: ${MUC[lv]} câu mức ${Quiz.LV[lv]}`));
  P.forEach((p) => assert.deepEqual([...new Set(qs.filter((q) => q.part === p).map((q) => q.lv))].sort(), [1, 2, 3], `${at}: ${p} đủ ba mức`));
  // chấm như đề thi: đúng hết 10 điểm (3 – 1,25 – 1,25 – 4,5), sai hết 0
  const G = Quiz.grade(qs, qs.map(() => 0)), H = Quiz.grade(qs, qs.map(() => 1));
  assert.equal(G.got, 10); assert.equal(G.max, 10); assert.equal(G.auto, 10); assert.equal(H.got, 0);
  assert.deepEqual(G.parts.map((x) => [x.part, x.max]), P.map((p, i) => [p, r2(0.25 * sum(NHOM.filter((x) => x.part === i).map((x) => x.n)))]), at + ": điểm từng phần");
  // note
  const nt = b.note, phan = (i) => { const k = NHOM.map((x, j) => (x.part === i ? j : -1)).filter((j) => j >= 0); return `questions ${dauNhom(k[0])}–${dauNhom(k[k.length - 1]) + NHOM[k[k.length - 1]].n - 1}`; };
  ["the national high school graduation exam used since 2025", "Decision 764 of the Ministry of Education and Training", "In 2027, some places will pilot the exam on computers; the questions are the same as on paper.",
    "Global Success 10–12", "mainly Grade 12", "All texts are new and are not taken from the textbooks.", `${qs.length} multiple-choice questions`, `takes ${b.minutes} minutes`,
    "each question is worth 0.25 points", `Part I, cloze texts: ${b.passages[ps[0]].title === LD.tb ? "an announcement" : "an advertisement"} and a leaflet (${phan(0)})`, `Part II, arrangement (${phan(1)})`, `Part III, text completion (${phan(2)})`,
    `Part IV, reading comprehension: two texts (${phan(3)})`, "no listening, no pronunciation and no writing", "The app marks every question"].forEach((c) => assert.ok(nt.includes(c), `${at}: note có “${c}”`));
});

/* ---------- bộ sắp xếp: đọc đoạn (13)–(17) ---------- */
function boSapXep(t) {
  const ra = {};
  t.split(/\n\s*\n/).forEach((khoi) => {
    const l = khoi.split("\n").map((x) => x.trim()).filter(Boolean), m = /^\((\d+)\)$/.exec(l[0]);
    assert.ok(m, "bộ sắp xếp mở bằng (k): " + l[0]);
    const x = { dong: {}, dau: "", cuoi: [] };
    l.slice(1).forEach((d) => { const n = /^([a-e])\. (.+)$/.exec(d); if (n) x.dong[n[1]] = n[2]; else if (!Object.keys(x.dong).length) x.dau = d; else x.cuoi.push(d); });
    ra[m[1]] = x;
  });
  return ra;
}

/* ---------- bảng để tính lại đáp án ---------- */
// thứ tự tính từ trước danh từ: ý kiến 1, kích cỡ 2, tuổi 3, hình dạng 4, màu 5, nguồn gốc 6, chất liệu 7, mục đích 8
const ADJ = { lovely: 1, friendly: 1, large: 2, old: 3, young: 3, new: 3, blue: 5, British: 6, wooden: 7, cotton: 7, comfortable: 1, leather: 7, small: 2, red: 5, metal: 7, beautiful: 1, long: 2, silk: 7, little: 2, brown: 5, round: 4, paper: 7 };
// từ loại (dạng của từ)
const HO_TU = { professional: "adj", professionally: "adv", unprofessionally: "adv", professionalism: "noun", confidently: "adv", confident: "adj", confidence: "noun", confide: "verb",
  creativity: "noun", creative: "adj", creatively: "adv", create: "verb", essential: "adj", essence: "noun", essentially: "adv", essentials: "noun",
  environmentally: "adv", environmental: "adj", environment: "noun", environmentalist: "noun",
  strength: "noun", strong: "adj", strongly: "adv", strengthen: "verb", accessible: "adj", access: "noun", accessibly: "adv", accessibility: "noun",
  useful: "adj", use: "noun", usefully: "adv", usefulness: "noun",
  enthusiastic: "adj", enthusiasm: "noun", enthusiastically: "adv", enthusiast: "noun", independence: "noun", independent: "adj", independently: "adv", dependent: "adj",
  diversity: "noun", diverse: "adj", diversify: "verb", diversely: "adv", harmful: "adj", harm: "noun", harmfully: "adv", harmfulness: "noun",
  variety: "noun", various: "adj", vary: "verb", variously: "adv", illegal: "adj", illegally: "adv", illegality: "noun", legalise: "verb",
  effective: "adj", effect: "noun", effectively: "adv", effectiveness: "noun", politely: "adv", polite: "adj", politeness: "noun", impolite: "adj" };
// dạng của động từ trong mệnh đề quan hệ rút gọn: pp quá khứ phân từ (bị động), ing (chủ động), past động từ chia (không rút gọn được)
const PHAN_TU = { grown: "pp", growing: "ing", living: "ing", collected: "pp", collecting: "ing", arriving: "ing", arrived: "pp", designed: "pp", designing: "ing", borrowed: "pp", borrowing: "ing", grew: "past", brought: "pp", bringing: "ing", running: "ing", ran: "past", run: "pp" };
// cụm từ cố định: từ đứng sau chỗ trống → động từ đi cùng
const CUM = { attention: "pay", conversation: "have", best: "do", awareness: "raise", weight: "lose", prize: "won", stall: "set up", word: "spread" };
// động từ + to-infinitive hay -ing (remember: việc phải làm sau này → to-infinitive)
const MAU = { remember: "to", avoid: "ing", allows: "to", suggest: "ing", encourage: "to", forget: "to", learn: "to", hope: "to", managed: "to", advise: "to", afraid: "to" };
// danh từ sau chỗ trống: sg đếm được số ít, pl số nhiều; từ hạn định đi được với loại nào
const DANH = { donation: "sg", glasses: "pl", responsibilities: "pl", information: "unc", visitor: "sg", interviews: "pl", money: "unc", water: "unc", time: "unc", hours: "pl", parents: "pl", courage: "unc" };
const LUONG = { each: ["sg"], every: ["sg"], many: ["pl"], all: ["pl", "unc"], "a few": ["pl"], both: ["pl"], several: ["pl"], much: ["unc"], "a little": ["unc"], "a large amount of": ["unc"], "a number of": ["pl"], "a great deal of": ["unc"], "plenty of": ["pl", "unc"], most: ["pl", "unc"], "lots of": ["pl", "unc"], "a couple of": ["pl"], "a bit of": ["unc"] };
// cụm động từ: nghĩa
const PV = { "stay away from": "avoid", "put up with": "tolerate", "run out of": "have none left", "look forward to": "wait happily for", "cut down on": "reduce",
  "put off": "delay", "take off": "remove", "keep up with": "stay informed about", "look down on": "think you are better than", "turn off": "stop a machine", "give off": "send out", "find out": "discover", "give out": "hand out", "carry out": "do a task", "point out": "show",
  "pick up": "lift from a surface", "give up": "stop doing", "take after": "look like a parent", "turn down": "refuse", "turn up": "appear", "pass away": "die",
  "watch out for": "be alert to", "give in": "stop resisting", "give away": "give for free" }; // cut down on, look forward to, put up with, run out of: đã có
// từ nối: [quan hệ, loại]; adv trước dấu phẩy, prep trước danh từ, conj trước mệnh đề
const QH = {
  moreover: ["addition", "adv"], however: ["contrast", "adv"], therefore: ["result", "adv"], thus: ["result", "adv"], "because of": ["cause", "prep"], otherwise: ["condition", "adv"], "as a result": ["result", "adv"],
  "for instance": ["example", "adv"], instead: ["replacement", "adv"], "apart from": ["addition", "prep"], "instead of": ["replacement", "prep"],
  "in spite of": ["concession", "prep"], despite: ["concession", "prep"], "due to": ["cause", "prep"], "even if": ["concession", "conj"], unless: ["condition", "conj"],
  besides: ["addition", "adv"], "as long as": ["condition", "conj"], "as soon as": ["time", "conj"], once: ["time", "conj"], "even though": ["concession", "conj"], "in case": ["precaution", "conj"], although: ["concession", "conj"], because: ["cause", "conj"], furthermore: ["addition", "adv"], nevertheless: ["contrast", "adv"], "as well as": ["addition", "prep"], "except for": ["exception", "prep"], "so that": ["purpose", "conj"], "thanks to": ["cause", "prep"],
  "on the other hand": ["contrast", "adv"], since: ["cause", "conj"], "in fact": ["emphasis", "adv"]
};
// nghĩa của từ trong ngữ cảnh
const NGHIA = { tested: "check", spent: "use up", sold: "give for money", lent: "give for a time", reveal: "let others know", hide: "keep out of sight", keep: "hold on to", store: "put away",
  reduce: "make smaller", double: "make twice as big", increase: "make bigger", share: "use together",
  impression: "the picture others form of you", expression: "the look on a face", explanation: "the reasons you give", attention: "careful notice",
  damage: "harm", repair: "fix", decorate: "make beautiful", protect: "keep safe",
  warnings: "messages about danger", awards: "prizes", invitations: "requests to come", complaints: "statements that you are unhappy",
  divide: "split into parts", delay: "make later", repeat: "do again", colour: "add colour to", wash: "clean with water",
  release: "set free", accept: "treat as fine" };
// từ bổ nghĩa đứng trước so sánh hơn
const SO_SANH = ["much", "far", "a lot", "even", "slightly"];
// từ trái nghĩa, gần nghĩa trong ngữ cảnh của đoạn đọc
const TRAI = { conflict: "agreement", crowded: "empty", common: "unusual", recover: "get worse", slow: "quick", traditional: "modern", disappointed: "pleased", certain: "uncertain",
  simple: "complicated", natural: "man-made", former: "current", rapid: "gradual", compulsory: "optional", steep: "gentle", weakness: "strength", dull: "lively",
  strange: "familiar", poor: "rich", clear: "vague", strict: "flexible" };
const GAN = { valuable: "useful", "cope with": "deal with", "give up": "stop trying", approaches: "methods", recognise: "identify", curious: "interested", respected: "admired", routine: "repetitive",
  embarrassed: "ashamed", ancient: "very old", prize: "award", enormous: "huge", concentrate: "focus", attached: "fixed", nervous: "anxious", certain: "particular",
  beneficial: "helpful", lack: "shortage", manage: "handle", exhausted: "very tired" };
const NOI = ["however", "then", "these", "this", "their", "thanks to this", "because of this", "today", "ten years later", "sadly", "with this", "in the water", "worried that",
  "twelve years later", "membership of these", "at first", "now", "the chart", "since that day", "thanks to your kindness", "luckily", "since then", "after that", "finally", "first", "second", "for all these reasons",
  "as the months passed", "her first letters", "on the one hand", "on the other hand", "in short", "really", "during the ceremony", "inside", "realising", "to solve this", "as a result",
  "before that", "half an hour later", "the next week", "all that effort"];
// giới từ đi sau từ đứng ngay trước chỗ trống (tính từ, động từ)
const GT = { excited: "about", turned: "into" };
// danh từ trước chỗ trống của câu chọn đại từ quan hệ: người → who, vật → which, nơi chốn → where
const DT_QH = { person: "nguoi", rooms: "noi" };

/* ---------- câu điền câu, mệnh đề: bộ phân loại nhỏ ---------- */
const SUB = ["because", "although", "when", "if", "once", "since", "while", "before", "after", "unless", "until"];
const REL = ["which", "who", "that", "whose", "where"];
const PP = ["asked", "published", "held", "made", "grown", "carried", "cleared"];
const FIN = new Set(["absorbs", "makes", "hold", "holds", "helps", "need", "must", "is", "are", "was", "spreads", "means", "affect", "welcome", "will", "have", "understands", "rely", "worked", "save"]);
const NHIEU_V = new Set(["feel", "care"]); // động từ chia ở số nhiều sau who (danh từ số nhiều đứng trước)
const tuCua = (s) => String(s).toLowerCase().replace(/[^a-z' -]+/g, " ").split(/\s+/).filter(Boolean);
const loaiCau = (o) => {
  const w = tuCua(o), loi = /\bto \w+ing\b/.test(o.toLowerCase());
  let i = 0; while (["simply", "also", "often"].includes(w[i])) i++;
  const d = w[i];
  if (REL.includes(d)) return { loai: "rel", w, loi };
  if (d === "having") return { loai: "having", w, loi };
  if (/ing$/.test(d)) return { loai: "ing", w, loi };
  if (PP.includes(d)) return { loai: "pp", w, loi };
  if (["and", "but", "so"].includes(d)) return { loai: "and", w, loi };
  if (SUB.includes(d)) {
    const sau = o.includes(",") ? o.slice(o.indexOf(",") + 1).trim() : "", s = tuCua(sau);
    return { loai: "sub", w, loi, chinh: !!sau && !["so", "but"].includes(s[0]) && s.some((x) => FIN.has(x)) };
  }
  // mở bằng danh từ, đại từ: động từ chia phải đứng trước mọi đại từ quan hệ, liên từ phụ thuộc
  const cat = w.findIndex((x) => REL.includes(x) || SUB.includes(x)), truoc = cat < 0 ? w : w.slice(0, cat);
  return { loai: FIN.has(d) || ["ask", "publish"].includes(d) ? "verb" : "np", w, loi, chinh: truoc.slice(1).some((x) => FIN.has(x)) };
};
const hopCho = (cho, o) => {
  const c = loaiCau(o);
  if (c.loi) return false;
  switch (cho) {
    case "cau": return (c.loai === "np" && c.chinh) || (c.loai === "sub" && c.chinh);
    case "rel-nhieu": return c.loai === "rel" && ["that", "which"].includes(c.w[0]) && ["hold", "keep", "need"].includes(c.w[1]);
    case "which": return c.loai === "rel" && c.w[0] === "which" && FIN.has(c.w[1]);
    case "pp": return c.loai === "pp";
    case "ing": return c.loai === "ing";
    case "truoc-ing": return c.w[0] === "before" && /ing$/.test(c.w[1]);
    case "who-nhieu": return c.loai === "rel" && c.w[0] === "who" && NHIEU_V.has(c.w[1]);
    case "who": return c.loai === "rel" && c.w[0] === "who" && c.w.slice(1).some((x) => FIN.has(x));
    case "until": return c.w[0] === "until" && c.w.slice(1).some((x) => FIN.has(x));
    case "sub-dau": return c.loai === "sub" && c.w[1] !== "of" && c.w.slice(1).some((x) => FIN.has(x));
    case "rg-ing": return c.loai === "ing";
    default: throw new Error("chỗ trống không rõ loại: " + cho);
  }
};

/* ---------- tính lại đáp án: mỗi câu một mục (khoá: số đề → số câu) ---------- */
const RIENG = {
  1: {
    1: { k: "tt" }, 2: { k: "tl", can: "adj" }, 3: { k: "rg", can: "pp" }, 4: { k: "cum" }, 5: { k: "md" }, 6: { k: "lt", qh: "addition", tin: "children under six stay for free" },
    7: { k: "hd" }, 8: { k: "md" }, 9: { k: "hd" }, 10: { k: "pv", y: "avoid", tin: "alcohol for at least a day" }, 11: { k: "lt", qh: "result", tin: "replace the lost blood" },
    12: { k: "nghia", y: "check", tin: "for safety before it reaches a patient" },
    13: { k: "sx", rb: ["a<c"] }, 14: { k: "sx", rb: ["^c", "c<e", "e<a", "a<d", "d<b"] }, 15: { k: "sx", rb: ["^d", "b$", "c<a", "a<e", "e-b"] },
    16: { k: "sx", rb: ["^b", "b-d", "d-e", "e-a", "a-c"] }, 17: { k: "sx", rb: ["^e", "e-c", "c<a", "a-d", "b$"] },
    18: { k: "cau", cho: "cau" }, 19: { k: "cau", cho: "rel-nhieu", truoc: "panels" }, 20: { k: "cau", cho: "which" }, 21: { k: "cau", cho: "pp", ai: "many residents say" }, 22: { k: "cau", cho: "cau", sau: ", so some building owners" },
    23: { k: "trai", tu: "conflict", doan: 1 },
    24: { k: "khong", doan: 2, pham: "They show them how to", co: ["video calls", "news online", "scam messages"], khac: "The older residents teach traditional skills such as weaving bamboo baskets" },
    25: { k: "chi", cum: "They show them", chu: "the young people help" }, 26: { k: "gan", tu: "valuable", doan: 3 },
    27: { k: "y", bang: ["The results have gone beyond what she expected."], co: [/more successful than she imagined/], sai: [/has not been as successful/, /much more quickly/, /for so many years/] },
    28: { k: "dung", bang: "Every Sunday morning, about thirty teenagers and thirty older residents meet at the ward's cultural house", sai: [/twice a week/, /after moving to another city/, /residents teach teenagers to use smartphones/], vang: [null, /another city|moved|moving/, null], nguoc: [/Every Sunday morning/, null, /the young people help the older participants with their smartphones/] },
    29: { k: "doan", bang: "scam messages" }, 30: { k: "doan", bang: "She noticed that many grandparents in her neighbourhood felt lonely" },
    31: { k: "chen", tro: "these hard surfaces", truoc: "Roads, roofs and car parks" }, 32: { k: "gan", tu: "cope with", doan: 2 },
    33: { k: "khong", doan: 2, co: ["more patients", "air pollution worse", "more electricity"], vang: /\brain/i },
    34: { k: "chi", cum: "the water it releases through its leaves", chu: "A single large tree can" },
    35: { k: "y", bang: ["One of the cheapest solutions is to plant more trees.", "painted their roofs white or light grey"], co: [/trees/, /roofs/], sai: [/only effective way/, /look more modern/, /costs more than/] },
    36: { k: "trai", tu: "crowded", doan: 4 },
    37: { k: "dung", bang: "light colours reflect sunlight instead of absorbing it", sai: [/cooler than the farmland/, /Fewer elderly people/, /covered with concrete after the road was removed/], nguoc: [/a few degrees hotter than the farmland/, /receive many more patients, especially elderly people/, /a busy road was removed to bring back a stream that had been covered with concrete/] },
    38: { k: "y", bang: ["keeping cities cool is no longer a question of comfort; it is a question of health and survival"], co: [/health/, /not just comfort/], sai: [/more about comfort than/, /comfortable again once/, /little to do with/] },
    39: { k: "y", bang: ["One of the cheapest solutions", "expensive and slow", "None of these solutions can solve the problem alone"], co: [/both cheap and expensive measures/], sai: [/already solved/, /better than trees in every/, /main cause/] },
    40: { k: "y", bang: ["absorb sunlight", "hospitals in hot cities receive many more patients", "Fortunately, cities are not powerless."], co: [/trap heat/, /harms people/, /mix of measures/], sai: [/caused only by/, /the only city/, /the best way to stop global warming/] }
  },
  2: {
    1: { k: "tl", can: "adv" }, 2: { k: "tt" }, 3: { k: "rg", can: "ing" }, 4: { k: "cum" }, 5: { k: "md" }, 6: { k: "lt", qh: "addition", tin: "you can also learn" },
    7: { k: "hd" }, 8: { k: "pv", y: "have none left", tin: "before the end of the month", sau: " out of" }, 9: { k: "ss" }, 10: { k: "nghia", y: "let others know", tin: "to people you meet online" },
    11: { k: "lt", qh: "concession", tin: "try to sleep for at least seven hours" }, 12: { k: "qhsh" },
    13: { k: "sx", rb: ["c<b"] }, 14: { k: "sx", rb: ["^c", "a<e", "e<b", "b<d"] }, 15: { k: "sx", rb: ["^b", "c$", "e<a", "a-d"] },
    16: { k: "sx", rb: ["^c", "c-e", "e-b", "b<d", "a$"] }, 17: { k: "sx", rb: ["^b", "b-d", "d-a", "a-c", "e$"] },
    18: { k: "cau", cho: "cau" }, 19: { k: "cau", cho: "pp", truoc: "A story" }, 20: { k: "cau", cho: "ing" }, 21: { k: "cau", cho: "truoc-ing" }, 22: { k: "cau", cho: "cau" },
    23: { k: "chi", cum: "They were nearly right", chu: "some of them tried", ve: "told her teachers" },
    24: { k: "khong", doan: 2, co: ["solar power", "for farms", "expensive fuel"], vang: /\b(sold|export|countries|abroad)\b/i },
    25: { k: "gan", tu: "give up", doan: 2 }, 26: { k: "trai", tu: "common", doan: 3 },
    27: { k: "y", bang: ["Experts say the problem begins long before university."], co: [/start when girls are much younger/], sai: [/main cause/, /disappear after/, /have had this problem for a long time/] },
    28: { k: "dung", bang: "some of them tried to change her mind", sai: [/only woman/, /Most engineering degrees/, /only girls who live in big cities/], nguoc: [/one of just three women/, /less than a third of all engineering degrees/, /schoolgirls in rural areas/] },
    29: { k: "doan", bang: "Many girls are told, directly or indirectly, that they are not good at maths" },
    30: { k: "doan", bang: "Each month, members work together on a real problem" },
    31: { k: "chen", tro: "these fish", truoc: /\bFish\b/ },
    32: { k: "chi", cum: "they starve and die", chu: "the corals can" },
    33: { k: "khong", doan: 2, co: ["rising sea temperatures", "careless tourism", "fishing with explosives"], vang: /\bstorm/i },
    34: { k: "trai", tu: "recover", doan: 2 },
    35: { k: "y", bang: ["collect small pieces of healthy coral", "they are moved to damaged parts of the reef"], co: [/grow small pieces of coral/, /damaged reefs/], sai: [/sell them to tourists/, /stop corals from ever turning white/, /die within a year/] },
    36: { k: "dung", bang: "give them their colour and most of their food", sai: [/a quarter of the ocean floor/, /break pieces off healthy corals/, /removes the cause/], nguoc: [/cover less than one percent of the ocean floor/, /that have broken off naturally/, /does not remove the cause of the damage/] },
    37: { k: "y", bang: ["can plant only a few hundred pieces in a day", "may stretch for many kilometres", "will die again if the water keeps getting warmer"], co: [/on its own is too slow/], sai: [/not trained well enough/, /the cheapest way/, /to stop at once/] },
    38: { k: "y", bang: ["Coral gardens can protect important areas and buy time, but only large cuts in greenhouse gas emissions can save reefs in the long term."], co: [/short-term help/, /only if emissions fall/], sai: [/are enough to save reefs/, /less important than building/, /no need to reduce/] },
    39: { k: "gan", tu: "approaches", doan: 5 },
    40: { k: "y", bang: ["home to about a quarter of all known marine species", "The main threat is rising sea temperatures.", "have begun to grow corals by hand", "only large cuts in greenhouse gas emissions can save reefs"], co: [/valuable/, /under threat/, /replanting helps/, /cutting emissions is essential/], sai: [/are safe because/, /main reason/, /matter much less/] }
  },
  3: {
    1: { k: "tl", can: "noun", truocRe: / your $/ }, 2: { k: "md" }, 3: { k: "rgto" }, 4: { k: "cum" }, 5: { k: "hd" }, 6: { k: "lt", qh: "condition", tin: "cannot be included in the programme" },
    7: { k: "tl", can: "adj", truocRe: / is $/ }, 8: { k: "pv", y: "delay", tin: "keeps dripping", sau: " off" }, 9: { k: "md" }, 10: { k: "nghia", y: "make smaller", tin: "water-saving shower head" },
    11: { k: "rg", can: "pp" }, 12: { k: "lt", qh: "condition", loai: "conj", tin: "your water bill will fall" },
    13: { k: "sx", rb: ["a<b"] }, 14: { k: "sx", rb: ["^c", "b$", "e<a"] }, 15: { k: "sx", rb: ["^c", "d$", "a<e", "e-b"] },
    16: { k: "sx", rb: ["^b", "b-d", "d-a", "a-e", "c$"] }, 17: { k: "sx", rb: ["^d", "d-c", "c-a", "a<e", "b$"] },
    18: { k: "cau", cho: "cau" }, 19: { k: "cau", cho: "who-nhieu", truoc: "Students" }, 20: { k: "cau", cho: "until" }, 21: { k: "cau", cho: "sub-dau" }, 22: { k: "cau", cho: "cau" },
    23: { k: "chi", cum: "who ran it", chu: "The page" },
    24: { k: "khong", doan: 2, co: ["tips on online safety", "messages of support", "block and report harmful accounts"], vang: /\bpolice\b/i },
    25: { k: "trai", tu: "slow", doan: 3 }, 26: { k: "gan", tu: "recognise", doan: 3 },
    27: { k: "y", bang: ["Now they understand that the person behind the screen is real."], co: [/hurt a real person/], sai: [/face to face/, /accounts are fake/, /do no harm/] },
    28: { k: "dung", bang: "the cruel page has disappeared", sai: [/on her own/, /at once/, /more than fifty/], nguoc: [/With two friends, she started a club/, /teachers were slow to react/, /Safe Screens has thirty members/] },
    29: { k: "doan", bang: "the signs of online bullying" }, 30: { k: "doan", bang: "without giving their names" },
    31: { k: "chen", tro: "this problem", truoc: "hard to find" }, 32: { k: "gan", tu: "curious", doan: 1 },
    33: { k: "khong", doan: 3, co: ["kimbap", "sushi", "pho"], vang: /curry/i },
    34: { k: "chi", cum: "The key, they argue", chu: "Most food writers" },
    35: { k: "y", bang: ["Sometimes a dish changes as it travels."], co: [/change a great deal/, /new country/], sai: [/invented by American cooks/, /most popular sandwich/, /to sell to Italian immigrants/] },
    36: { k: "trai", tu: "traditional", doan: 4 },
    37: { k: "dung", bang: "a cheap meal for poor families in Naples", sai: [/less cheese/, /bakers in France/, /Most chefs/], nguoc: [/added more cheese/, /local bakers began filling French-style bread/, null], vang: [null, null, /most chefs/i] },
    38: { k: "y", bang: ["Sharing a meal is one of the easiest ways to learn about another culture, and it often leads to friendships that no textbook can create."], co: [/teaches people about other cultures/, /builds friendships/], sai: [/still the best way/, /only with family members/, /much harder than/] },
    39: { k: "y", bang: ["A dish that is cooked for a family festival in one country, for example, may be sold as cheap fast food in another."], co: [/lose its meaning/], sai: [/always respect/, /should be changed/, /disappearing/] },
    40: { k: "y", bang: ["Food has always travelled with people.", "Sometimes a dish changes as it travels.", "see the exchange as positive"], co: [/travels and changes/, /bring cultures closer/], sai: [/should never be changed/, /main reason/, /the only dishes/] }
  },
  4: {
    1: { k: "cum" }, 2: { k: "tl", can: "adv", sauRe: /^ friendly\b/ }, 3: { k: "rg", can: "ing" }, 4: { k: "tt" }, 5: { k: "hd" }, 6: { k: "lt", qh: "cause", tin: "will take a different route" },
    7: { k: "hd" }, 8: { k: "pv", y: "discover", tin: "about the company and the job", sau: " out" }, 9: { k: "nghia", y: "the picture others form of you", tin: "Being late" },
    10: { k: "qhdt", dt: "person" }, 11: { k: "lt", qh: "concession", tin: "try to smile" }, 12: { k: "md" },
    13: { k: "sx", rb: ["b<a"] }, 14: { k: "sx", rb: ["^d", "b$", "c<e"] }, 15: { k: "sx", rb: ["^d", "b$", "d-e", "e-c"] },
    16: { k: "sx", rb: ["^b", "b-e", "e-a", "a-d", "c$"] }, 17: { k: "sx", rb: ["^c", "c-e", "e<a", "a-d", "b$"] },
    18: { k: "cau", cho: "cau" }, 19: { k: "cau", cho: "rg-ing", truoc: "people" }, 20: { k: "cau", cho: "who", truoc: "Nguyen Van Toan," }, 21: { k: "cau", cho: "sub-dau" }, 22: { k: "cau", cho: "cau" },
    23: { k: "trai", tu: "disappointed", doan: 3 },
    24: { k: "khong", doan: 2, co: ["repair an X-ray scanner", "how heart monitors worked", "biomedical engineering"], vang: /\boperations?\b/i },
    25: { k: "chi", cum: "asking them how heart monitors worked", chu: "technicians", ve: "technicians" }, 26: { k: "gan", tu: "respected", doan: 3 },
    27: { k: "y", bang: ["Two weeks in a real workplace taught me more about myself than two years of thinking about it."], co: [/two weeks of real work/i, /years of thinking/], sai: [/which kind of workplace/, /too short/, /at school than/] },
    28: { k: "dung", bang: "everyone in her family hoped that she would one day become a doctor", sai: [/from the very beginning/, /a whole month/, /studying medicine/], nguoc: [/she was disappointed at first/, /two weeks of her summer holiday/, /first year at a technical university/] },
    29: { k: "doan", bang: "were surprised by her decision" }, 30: { k: "doan", bang: "every student should try a job before choosing a career" },
    31: { k: "chen", tro: "these programs", truoc: "Computer programs can now" }, 32: { k: "gan", tu: "routine", doan: 2 },
    33: { k: "chi", cum: "threatened to replace them", chu: "textile workers", ve: "textile workers" },
    34: { k: "khong", doan: 2, co: ["entering data", "sorting emails", "answering simple customer questions"], vang: /design|building/i },
    35: { k: "y", bang: ["History suggests, however, that technology also creates work.", "AI is already producing new jobs"], co: [/create new kinds of work/], sai: [/caused most bank clerks/, /closed many of their branches/, /earn much more money/] },
    36: { k: "trai", tu: "certain", doan: 5 },
    37: { k: "dung", bang: "replaced call-centre staff with chatbots", sai: [/grow quickly/, /spent less time/, /know exactly/], nguoc: [/millions of office jobs will disappear/, /spent more time helping customers/, /No one knows exactly/] },
    38: { k: "y", bang: ["No one knows exactly what the job market will look like in 2040, but one thing seems certain: people who are willing to learn will be in a much stronger position."], co: [/unclear/, /keep learning/], sai: [/most jobs will disappear/, /all the best jobs/, /Nobody will need/] },
    39: { k: "y", bang: ["Skills that machines struggle with, such as creativity, teamwork and understanding other people's feelings, are likely to become more valuable."], co: [/people skills/, /safer/], sai: [/better than people at teamwork/, /the same tools/, /less useful/] },
    40: { k: "y", bang: ["Today, the same fear has returned with artificial intelligence.", "technology also creates work", "What will matter most in the future is the ability to adapt."], co: [/change many jobs/, /adapt and keep learning/], sai: [/pointless/, /the first technology/, /stop the development/] }
  },
  5: {
    1: { k: "tl", can: "noun", truocRe: / your $/ }, 2: { k: "tt" }, 3: { k: "rg", can: "pp" }, 4: { k: "md" }, 5: { k: "cum" }, 6: { k: "lt", qh: "result", tin: "Places are limited" },
    7: { k: "hd" }, 8: { k: "pv", y: "remove", tin: "before you enter the main hall" }, 9: { k: "nghia", y: "harm", tin: "turn off your flash" },
    10: { k: "qhdt", dt: "rooms" }, 11: { k: "lt", qh: "time", tin: "return your audio guide" }, 12: { k: "md" },
    13: { k: "sx", rb: ["^c"] }, 14: { k: "sx", rb: ["^d", "c$", "b<a"] }, 15: { k: "sx", rb: ["^b", "c$", "e-d", "d-a"] },
    16: { k: "sx", rb: ["^c", "c-a", "a-e", "e-b", "d$"] }, 17: { k: "sx", rb: ["^d", "d-a", "a-e", "e-c", "b$"] },
    18: { k: "cau", cho: "cau" }, 19: { k: "cau", cho: "which" }, 20: { k: "cau", cho: "pp", truoc: "A study" }, 21: { k: "cau", cho: "sub-dau" }, 22: { k: "cau", cho: "cau" },
    23: { k: "gan", tu: "embarrassed", doan: 2 },
    24: { k: "khong", doan: 2, co: ["free evening class", "small cards", "at the market"], vang: /\bfilms?\b/i },
    25: { k: "chi", cum: "he told them stories", chu: "The young students" }, 26: { k: "trai", tu: "simple", doan: 4 },
    27: { k: "y", bang: ["For a few months, that is exactly what he did.", "spend his days resting and playing with his grandchildren"], co: [/relaxing/, /grandchildren/], sai: [/driving buses/, /granddaughter asked/, /did not know/] },
    28: { k: "dung", bang: "helping older people who want to start learning", sai: [/about his age/, /university/, /after one year/], nguoc: [/young enough to be his grandchildren/, null, null], vang: [null, /university/i, /one year/i] },
    29: { k: "doan", bang: "he felt embarrassed whenever he made a mistake" }, 30: { k: "doan", bang: "he could not understand a single word" },
    31: { k: "chen", tro: "these threats", truoc: "human activities" }, 32: { k: "gan", tu: "ancient", doan: 5 },
    33: { k: "chi", cum: "confuse them", chu: "Baby turtles" },
    34: { k: "khong", doan: 3, co: ["Lights from hotels", "plastic bags", "fishing nets"], vang: /\bboats?\b/i },
    35: { k: "y", bang: ["people dig up the eggs", "dogs and crabs eat many of the rest", "warmer sand produces more female turtles"], co: [/people/, /animals/, /sand/], sai: [/always lay/, /Only dogs and crabs/, /Cooler sand/] },
    36: { k: "trai", tu: "natural", doan: 3 },
    37: { k: "dung", bang: "They dig holes in the sand at night", sai: [/after the dinosaurs/, /every year/, /favourite food of/], nguoc: [/survived the disaster that wiped out the dinosaurs/, /Every few years/, /which look like jellyfish, one of their favourite foods/] },
    38: { k: "y", bang: ["Some coastal towns now turn off or cover their lights during the nesting season."], co: [/turned off or covered/], sai: [/all year round/, /more lights/, /must close/] },
    39: { k: "y", bang: ["move newly laid eggs to fenced areas, where they are guarded until they hatch"], co: [/Protecting eggs/, /survive/], sai: [/no longer need/, /only in Viet Nam/, /illegal/] },
    40: { k: "y", bang: ["for more than 100 million years", "mainly because of human activities", "people around the world are working to protect these animals"], co: [/Ancient/, /in danger because of people/, /can still be saved/], sai: [/cannot be saved/, /main threat/, /much older than dinosaurs/] }
  },
  6: {
    1: { k: "rg", can: "pp" }, 2: { k: "tt" }, 3: { k: "tl", can: "adj", truocRe: / fully $/ }, 4: { k: "lt", qh: "addition", tin: "a café, a children's corner" }, 5: { k: "ss" }, 6: { k: "md" },
    7: { k: "hd" }, 8: { k: "pv", y: "stay informed about", tin: "the latest weather forecasts" }, 9: { k: "nghia", y: "messages about danger", tin: "If you are told to leave your home" },
    10: { k: "md" }, 11: { k: "tl", can: "adj" }, 12: { k: "lt", qh: "time", loai: "conj", tin: "check that your neighbours" },
    13: { k: "sx", rb: ["^b"] }, 14: { k: "sx", rb: ["^c", "e$", "b<d"] }, 15: { k: "sx", rb: ["^d", "c$", "b<e", "e-a"] },
    16: { k: "sx", rb: ["^b", "b-c", "c-a", "a-e", "d$"] }, 17: { k: "sx", rb: ["^a", "a-c", "c-e", "e-b", "d$"] },
    18: { k: "cau", cho: "cau" }, 19: { k: "cau", cho: "who-nhieu", truoc: "young shoppers" }, 20: { k: "cau", cho: "ing" }, 21: { k: "cau", cho: "who", truoc: "online fashion bloggers," }, 22: { k: "cau", cho: "cau" },
    23: { k: "trai", tu: "former", doan: 4 },
    24: { k: "khong", doan: 2, co: ["doors banging", "talked over each other", "forgot half of the questions"], vang: /\bmusic\b/i },
    25: { k: "chi", cum: "He lent us two microphones", chu: "our IT teacher" }, 26: { k: "gan", tu: "prize", doan: 4 },
    27: { k: "y", bang: ["When we played it back, we were so embarrassed that we almost gave up."], co: [/so unhappy/, /nearly quit/], sai: [/proud/, /gave up because/, /nobody wanted/] },
    28: { k: "dung", bang: "We started recording in the school library after classes, when it was completely quiet", sai: [/Most students/, /bought/, /first prize/], nguoc: [/only three of us raised our hands/, /He lent us two microphones/, /won second prize/] },
    29: { k: "doan", bang: "we wrote a plan for every episode" }, 30: { k: "doan", bang: "the project has taught us" },
    31: { k: "chen", tro: "this pressure", truoc: "puts enormous pressure" }, 32: { k: "gan", tu: "enormous", doan: 1 },
    33: { k: "chi", cum: "when they are full", chu: "rubbish bins" },
    34: { k: "khong", doan: 2, co: ["traffic lights change automatically", "messages about accidents", "smart car parks"], vang: /\btickets?\b/i },
    35: { k: "y", bang: ["become brighter only when someone walks past", "rubbish bins send a message", "can find leaks"], co: [/waste less energy, water and time/], sai: [/stay bright all night/, /every bin/, /never have any leaks/] },
    36: { k: "trai", tu: "rapid", doan: 1 },
    37: { k: "dung", bang: "Street lights with sensors become brighter only when someone walks past", sai: [/already live in cities/, /cheap enough/, /alone can make/], nguoc: [/are expected to live in cities/, /The technology is also expensive/, /technology alone cannot make a city a good place to live/] },
    38: { k: "y", bang: ["The smartest cities of the future may be those that use technology to serve people, rather than the other way round."], co: [/work for people/, /not people for technology/], sai: [/as much technology as/, /work for the technology companies/, /not need any technology/] },
    39: { k: "y", bang: ["raises serious questions about privacy", "their data could be stolen or misused"], co: [/not want/, /movements/], sai: [/benefit most/, /completely safe/, /cheaper than/] },
    40: { k: "y", bang: ["make urban life run more smoothly", "smart cities have their critics", "technology alone cannot make a city a good place to live"], co: [/easier/, /problems/, /not enough alone/], sai: [/solved all the problems/, /most important part/, /should not be used/] }
  },
  7: {
    1: { k: "gt" }, 2: { k: "tl", can: "adj" }, 3: { k: "tt" }, 4: { k: "md" }, 5: { k: "cum" }, 6: { k: "lt", qh: "condition", tin: "we cannot promise you a place" },
    7: { k: "hd" }, 8: { k: "nghia", y: "split into parts", tin: "among everyone who lives in the house" }, 9: { k: "pv", y: "lift from a surface", tin: "their toys from the floor" },
    10: { k: "rg", can: "ing" }, 11: { k: "lt", qh: "concession", loai: "conj", tin: "it is still worth letting them help" }, 12: { k: "tl", can: "noun", truocRe: / responsibility and $/ },
    13: { k: "sx", rb: ["^b"] }, 14: { k: "sx", rb: ["^c", "d$", "a<b"] }, 15: { k: "sx", rb: ["^b", "d$", "e<a", "a<c"] },
    16: { k: "sx", rb: ["^b", "b-a", "a-c", "c-e", "d$"] }, 17: { k: "sx", rb: ["^c", "c-e", "e-a", "a-b", "d$"] },
    18: { k: "cau", cho: "cau" }, 19: { k: "cau", cho: "which" }, 20: { k: "cau", cho: "until" }, 21: { k: "cau", cho: "sub-dau" }, 22: { k: "cau", cho: "cau" },
    23: { k: "gan", tu: "concentrate", doan: 2 }, 24: { k: "trai", tu: "compulsory", doan: 1 }, 25: { k: "chi", cum: "They also fear", chu: "some parents" },
    26: { k: "khong", doan: 2, pham: "To play even a simple tune", co: ["read notes", "count beats", "move their fingers"], vang: /\bsing\b/i },
    27: { k: "y", bang: ["Music is not a luxury; it is part of a complete education."], co: [/necessary part/, /not something extra/], sai: [/too costly/, /Only rich/, /complete once/] },
    28: { k: "dung", bang: "music lessons are often the first to be cut", sai: [/only in primary school/, /less patient/, /need costly equipment/], nguoc: [/compulsory at least until Grade 9/, /learn patience/, /schools do not need costly equipment/] },
    29: { k: "doan", bang: "the whole song falls apart" }, 30: { k: "doan", bang: "calm the mind" },
    31: { k: "chen", tro: "few of them", truoc: "hundreds of millions of people" }, 32: { k: "gan", tu: "attached", doan: 3 },
    33: { k: "chi", cum: "they could easily fall head first onto the road", chu: "Riders" },
    34: { k: "khong", doan: 5, co: ["Electric bicycles", "bike-sharing schemes", "rediscovering cycling"], vang: /\bfold/i },
    35: { k: "y", bang: ["The real breakthrough came in 1885", "tyres filled with air", "Soon the bicycle became a craze."], co: [/safer design/, /air-filled tyres/, /popular/], sai: [/Dunlop built the first/, /Only rich men/, /too dangerous for women/] },
    36: { k: "trai", tu: "steep", doan: 5 },
    37: { k: "dung", bang: "but no pedals", sai: [/two wheels of the same size/, /Dunlop produced/, /sold in Viet Nam/], nguoc: [/the back wheel was tiny/, /John Kemp Starley produced/, null], vang: [null, null, /sold in Viet Nam/] },
    38: { k: "y", bang: ["The basic design, however, has hardly changed since Starley's day."], co: [/very similar/], sai: [/changed completely/, /much better than/, /Few people still ride/] },
    39: { k: "y", bang: ["Riders sat high above the ground", "they could easily fall head first onto the road"], co: [/quite dangerous/], sai: [/safer than walking/, /small front wheel/, /invented in Germany/] },
    40: { k: "y", bang: ["did not appear all at once", "used by hundreds of millions of people", "the bicycle is still changing"], co: [/over many decades/, /still widely used/], sai: [/One inventor/, /no longer/, /most dangerous/] }
  },
  8: {
    1: { k: "tl", can: "noun", truocRe: / cultural $/ }, 2: { k: "cum" }, 3: { k: "rg", can: "pp" }, 4: { k: "tt" }, 5: { k: "lt", qh: "addition", tin: "there will be a dance show" }, 6: { k: "rgto" },
    7: { k: "hd" }, 8: { k: "pv", y: "reduce", tin: "the time you spend with earphones in" }, 9: { k: "md" }, 10: { k: "tl", can: "adj", truocRe: / can be $/ },
    11: { k: "nghia", y: "keep safe", tin: "from the noise of the speakers" }, 12: { k: "lt", qh: "precaution", tin: "Carry a pair of earplugs" },
    13: { k: "sx", rb: ["^c"] }, 14: { k: "sx", rb: ["^b", "a<d", "c<e"] }, 15: { k: "sx", rb: ["^b", "b-a", "a-e", "d$"] },
    16: { k: "sx", rb: ["^b", "b-d", "d-a", "a-e", "e-c"] }, 17: { k: "sx", rb: ["^b", "b-d", "d-c", "c-e", "a$"] },
    18: { k: "cau", cho: "cau" }, 19: { k: "cau", cho: "pp", truoc: "food" }, 20: { k: "cau", cho: "sub-dau" }, 21: { k: "cau", cho: "ing" }, 22: { k: "cau", cho: "cau" },
    23: { k: "chi", cum: "because they have never planned a budget", chu: "first-year students" }, 24: { k: "gan", tu: "nervous", doan: 2 },
    25: { k: "khong", doan: 1, co: ["cooking his meals", "washing his clothes", "waking him up for school"], vang: /homework/i },
    26: { k: "y", bang: ["The good news is that you still have a whole year to practise."], co: [/still has a year/], sai: [/only a few days/, /already practised everything/, /wait a whole year/] },
    27: { k: "trai", tu: "weakness", doan: 4 },
    28: { k: "dung", bang: "will move to another city next year to start university", sai: [/not looking forward/, /not to call his family/, /no one who can help/], nguoc: [/Khanh is looking forward to university/, /call your family/, /Most universities also have counsellors/] },
    29: { k: "doan", bang: "Write down everything you spend" }, 30: { k: "doan", bang: "Every mistake will teach you something" },
    31: { k: "chen", tro: "these artisans", truoc: "keep them alive" }, 32: { k: "gan", tu: "certain", doan: 3 }, 33: { k: "chi", cum: "Next to her", chu: "a weaver" },
    34: { k: "khong", doan: 2, co: ["watch a weaver", "folk paintings are made", "print a small picture"], vang: /\bbuy\b/i },
    35: { k: "y", bang: ["short films introduce elderly masters", "among the last people able to make certain objects", "unwilling to spend years learning a craft"], co: [/may vanish/, /few young people/], sai: [/noisiest/, /eager to learn/, /oldest craft/] },
    36: { k: "trai", tu: "dull", doan: 1 },
    37: { k: "dung", bang: "Children are invited to print a small picture of their own", sai: [/until December/, /many languages/, /young man/], nguoc: [/Open until the end of August/, /only in Vietnamese and English/, /a ninety-year-old lacquer artist/] },
    38: { k: "y", bang: ["It reminds us that our heritage can live on only when young people are willing to learn it."], co: [/only if the young learn/], sai: [/even if nobody/, /no longer need/, /Only old people/] },
    39: { k: "y", bang: ["very busy at weekends", "best to go on a weekday morning"], co: [/dislike crowds/, /not go at weekends/], sai: [/easy for everyone/, /cannot enter/, /no faults/] },
    40: { k: "y", bang: ["a new exhibition at the City Museum", "performed in front of visitors by the people who keep them alive", "The exhibition is not perfect."], co: [/new exhibition/, /keep them alive/], sai: [/decided to close/, /popular with most young people/, /too crowded/] }
  },
  9: {
    1: { k: "tl", can: "noun", truocRe: / wide $/ }, 2: { k: "gt" }, 3: { k: "rg", can: "ing" }, 4: { k: "md" }, 5: { k: "lt", qh: "contrast", tin: "Most school-leavers still choose university" }, 6: { k: "hd" },
    7: { k: "tt" }, 8: { k: "tl", can: "adj", truocRe: / it is $/ }, 9: { k: "pv", y: "be alert to", tin: "made from ivory, rhino horn or tiger bones" }, 10: { k: "nghia", y: "set free", tin: "may seem kind" },
    11: { k: "md" }, 12: { k: "lt", qh: "example", tin: "Choose gifts made by local craftspeople" },
    13: { k: "sx", rb: ["^c"] }, 14: { k: "sx", rb: ["^e", "b$", "c<d"] }, 15: { k: "sx", rb: ["^c", "c-e", "e-a", "d$"] },
    16: { k: "sx", rb: ["^c", "d-a", "a-e", "b$"] }, 17: { k: "sx", rb: ["^d", "a-e", "e-b", "c$"] },
    18: { k: "cau", cho: "cau" }, 19: { k: "cau", cho: "pp", truoc: "mangrove forest" }, 20: { k: "cau", cho: "which" }, 21: { k: "cau", cho: "sub-dau" }, 22: { k: "cau", cho: "cau" },
    23: { k: "chi", cum: "as if they might escape", chu: "the devices" }, 24: { k: "gan", tu: "beneficial", doan: 5 },
    25: { k: "khong", doan: 3, co: ["board game", "spring rolls", "stories"], vang: /\bfilm/i },
    26: { k: "y", bang: ["When the week ended, we did not go back to our old habits completely."], co: [/kept some/], sai: [/returned to all/, /never to use screens/, /earlier than/] },
    27: { k: "trai", tu: "strange", doan: 2 },
    28: { k: "dung", bang: "stories about her childhood in the countryside that I had never heard before", sai: [/never works in the evening/, /at home on a laptop/, /stopped playing games/], nguoc: [/answers work emails until late in the evening/, /could not use my laptop at home/, /we played until bedtime/] },
    29: { k: "doan", bang: "at the library" }, 30: { k: "doan", bang: "We now keep one screen-free evening every Sunday" },
    31: { k: "chen", tro: "return them", truoc: "never asks when they will come back" }, 32: { k: "gan", tu: "lack", doan: 1 }, 33: { k: "chi", cum: "more than a thousand of them", chu: "second-hand books" },
    34: { k: "khong", doan: 4, co: ["began his Sunday rides", "asked schools and families in the city for donations", "reading corner"], vang: /bookshop/i },
    35: { k: "y", bang: ["forty pupils shared five textbooks", "he promised himself"], co: [/childhood without books/, /promise/], sai: [/more books than/, /no interest at all/, /gave Tam a whole library/] },
    36: { k: "trai", tu: "poor", doan: 2 },
    37: { k: "dung", bang: "later he became a postman", sai: [/by a fixed date/, /from the very beginning/, /a shop in his village/], nguoc: [/he never asks when they will come back/, /some villagers laughed at the postman/, /bought second-hand books at markets in the city/] },
    38: { k: "y", bang: ["Now the books will keep travelling without me."], co: [/keep sharing/], sai: [/taken away/, /other countries/, /too old/] },
    39: { k: "y", bang: ["he saved a little of his wages and bought second-hand books"], co: [/himself/, /his wages/], sai: [/as a gift/, /stopped working/, /too small/] },
    40: { k: "y", bang: ["he became a postman", "began his Sunday rides"], co: [/former postman/, /sharing books/], sai: [/opened a large bookshop/, /to become a farmer/, /no longer want to read/] }
  },
  10: {
    1: { k: "tl", can: "adj", truocRe: / small but $/ }, 2: { k: "tt" }, 3: { k: "rgto" }, 4: { k: "cum" }, 5: { k: "lt", qh: "cause", loai: "conj", tin: "takes place outdoors" }, 6: { k: "md" },
    7: { k: "hd" }, 8: { k: "pv", y: "stop resisting", tin: "because they are afraid of being left out" }, 9: { k: "tl", can: "adv", truocRe: / clearly and $/ },
    10: { k: "nghia", y: "treat as fine", tin: "whether or not they agree with it" }, 11: { k: "md" }, 12: { k: "lt", qh: "emphasis", tin: "you are not alone" },
    13: { k: "sx", rb: ["^b"] }, 14: { k: "sx", rb: ["^c", "b$", "d<a"] }, 15: { k: "sx", rb: ["^b", "b-d", "d-a", "c$"] },
    16: { k: "sx", rb: ["^c", "c-b", "e-a", "d$"] }, 17: { k: "sx", rb: ["^c", "c-d", "b<e", "e-a"] },
    18: { k: "cau", cho: "cau" }, 19: { k: "cau", cho: "until" }, 20: { k: "cau", cho: "ing" }, 21: { k: "cau", cho: "sub-dau" }, 22: { k: "cau", cho: "cau" },
    23: { k: "chi", cum: "they often ask whether I regret losing a year", chu: "my old classmates" }, 24: { k: "gan", tu: "manage", doan: 2 },
    25: { k: "khong", doan: 3, co: ["helped the teachers with English lessons", "ran a reading club", "painted the classrooms"], vang: /swim/i },
    26: { k: "y", bang: ["it may be wiser to take a year to find out"], co: [/may be better than/], sai: [/Everyone should spend/, /always wastes/, /choose a course quickly/] },
    27: { k: "trai", tu: "clear", doan: 5 },
    28: { k: "dung", bang: "I worked at a café in Hue to save money", sai: [/straight after Grade 12/, /school in a big city/, /now regrets/], nguoc: [/I took a gap year/, /primary school on an island/, /My answer is always no/] },
    29: { k: "doan", bang: "I am now in my third year" }, 30: { k: "doan", bang: "You need a clear plan" },
    31: { k: "chen", tro: "this meant", truoc: "from Monday to Thursday" }, 32: { k: "gan", tu: "exhausted", doan: 4 },
    33: { k: "chi", cum: "they could not reach anyone on Fridays", chu: "Some customers" },
    34: { k: "khong", doan: 3, co: ["output had stayed the same", "won two new customers", "took days off because of illness"], vang: /profit/i },
    35: { k: "y", bang: ["Staff had to finish just as much work as before", "meetings were cut from an hour to thirty minutes"], co: [/finish their work faster/, /four days/], sai: [/less work than before/, /became much longer/, /refused/] },
    36: { k: "trai", tu: "strict", doan: 2 },
    37: { k: "dung", bang: "For six months", sai: [/earned less/, /left the company/, /closed completely/], nguoc: [/for the same salary/, /nobody left the company/, /keeps a small team on duty that day/] },
    38: { k: "y", bang: ["Experts warn that a four-day week may not suit every kind of business."], co: [/may not work for some/], sai: [/every kind of business should/, /lose money/, /already failed/] },
    39: { k: "y", bang: ["Some customers complained", "so the company now keeps a small team on duty"], co: [/created problems/, /had to be solved/], sai: [/were happy with the new system/, /given up/, /prefer to work on Fridays/] },
    40: { k: "y", bang: ["For six months, its sixty employees worked only four days a week", "may not suit every kind of business"], co: [/mostly worked/, /cannot suit every company/], sai: [/salaries/, /Experts agree/, /disliked working/] }
  }
};

// sau chỗ trống (k) của đoạn: chữ ngay sau "(k) ___"
const sauCho = (q) => { const k = /\((\d+)\)/.exec(q.q)[1], t = doanCua(q).text, i = t.indexOf(`(${k}) ___`); return t.slice(i + `(${k}) ___`.length); };
const truocCho = (q) => { const k = /\((\d+)\)/.exec(q.q)[1], t = doanCua(q).text; return t.slice(0, t.indexOf(`(${k}) ___`)); };
const motDung = (q, ok, at) => { const d = q.o.filter(ok); assert.deepEqual(d, [q.o[0]], `${ten.get(q)}: ${at || "chỉ đáp án hợp"} → ${JSON.stringify(d)}`); };
const hoanVi = (a) => (a.length <= 1 ? [a] : a.flatMap((x, i) => hoanVi(a.slice(0, i).concat(a.slice(i + 1))).map((r) => [x].concat(r))));
const thoaRB = (rb, ord) => rb.every((r) => {
  let m;
  if ((m = /^\^([a-e])$/.exec(r))) return ord[0] === m[1];
  if ((m = /^([a-e])\$$/.exec(r))) return ord[ord.length - 1] === m[1];
  if ((m = /^([a-e])<([a-e])$/.exec(r))) return ord.indexOf(m[1]) < ord.indexOf(m[2]);
  if ((m = /^([a-e])-([a-e])$/.exec(r))) return ord.indexOf(m[2]) === ord.indexOf(m[1]) + 1;
  throw new Error("ràng buộc không rõ: " + r);
});
let soTinh = 0;
const DA_DUNG = new Set();
DE.forEach((b) => {
  const R = RIENG[so(b)];
  assert.ok(R, b.id + ": thêm mục kiểm tra của đề vào RIENG");
  assert.deepEqual(Object.keys(R).map(Number), b.questions.map((_, i) => i + 1), b.id + ": mỗi câu một mục kiểm tra");
  const PS = b.passages, ps = [...new Set(b.questions.map((q) => q.p))];
  b.questions.forEach((q, i) => {
    const c = R[i + 1], at = ten.get(q), sau = () => sauCho(q), lo = (s) => s.toLowerCase();
    assert.equal(new Set(q.o).size, 4, at + ": lựa chọn không trùng");
    switch (c.k) {
      case "tt": { // thứ tự tính từ: các lựa chọn là cùng các từ, chỉ đáp án đúng thứ tự
        const w0 = q.o[0].split(" ").slice().sort().join();
        q.o.forEach((o) => assert.equal(o.split(" ").slice().sort().join(), w0, at + ": cùng các tính từ"));
        motDung(q, (o) => o.split(" ").map((w) => { assert.ok(ADJ[w], at + ": thêm “" + w + "” vào ADJ"); return ADJ[w]; }).every((v, j, a) => !j || a[j - 1] <= v), "đúng thứ tự tính từ");
        break;
      }
      case "tl": { // dạng của từ: chỗ trống cần từ loại c.can (trước cụm danh từ: tính từ; sau động từ + tân ngữ: trạng từ)
        const s = sau();
        if (c.truocRe) assert.ok(c.truocRe.test(truocCho(q)), at + ": trước chỗ trống hợp từ loại " + c.can); // your → danh từ; is → tính từ
        if (c.sauRe) assert.ok(c.sauRe.test(s), at + ": sau chỗ trống hợp từ loại " + c.can); // trước tính từ friendly → trạng từ
        if (!c.truocRe && !c.sauRe && c.can === "adj") assert.ok(/^ [a-z]+ [a-z]+s\b/.test(s), at + ": sau chỗ trống là cụm danh từ");
        if (!c.truocRe && !c.sauRe && c.can === "adv") assert.ok(/speak English more $/.test(truocCho(q)), at + ": chỗ trống bổ nghĩa cho động từ speak");
        motDung(q, (o) => { assert.ok(HO_TU[o], at + ": thêm “" + o + "” vào HO_TU"); return HO_TU[o] === c.can; }, "đúng từ loại " + c.can);
        break;
      }
      case "rg": { // rút gọn mệnh đề quan hệ: bị động → quá khứ phân từ; chủ động → -ing; không có đại từ quan hệ, be
        motDung(q, (o) => { const w = o.split(" "); if (w.length > 1) return false; assert.ok(PHAN_TU[o], at + ": thêm “" + o + "” vào PHAN_TU"); return PHAN_TU[o] === c.can; }, "đúng dạng " + c.can);
        break;
      }
      case "rgto": { // sau the first, the last, the only (+ danh từ), mệnh đề quan hệ rút gọn thành to-infinitive
        assert.ok(/\bthe (first|last|only)( \w+){0,2} $/i.test(truocCho(q)), at + ": trước chỗ trống là the first, the last hay the only + danh từ");
        motDung(q, (o) => /^to (?!be )\w+$/.test(o), "to-infinitive sau the first");
        break;
      }
      case "qhdt": { // đại từ quan hệ: danh từ trước chỗ trống (DT_QH), chỗ trống làm chủ ngữ (sau chỗ trống là động từ chia); nơi chốn: sau chỗ trống là mệnh đề đủ
        const loai = DT_QH[c.dt];
        assert.ok(loai, at + ": thêm “" + c.dt + "” vào DT_QH");
        assert.ok(truocCho(q).endsWith(" " + c.dt + " "), at + ": trước chỗ trống là “" + c.dt + "”");
        if (loai === "noi") assert.ok(/^ (the |our |their |a |an )?[a-z]+ (is|are|was|were|can|will|have|has)\b/.test(sau()), at + ": sau chỗ trống là một mệnh đề đủ chủ ngữ, động từ (chỗ trống chỉ nơi chốn)");
        else assert.ok(/^ [a-z]+s\b/.test(sau()), at + ": sau chỗ trống là động từ chia (chỗ trống làm chủ ngữ)");
        motDung(q, (o) => o === { nguoi: "who", vat: "which", noi: "where" }[loai], "đại từ quan hệ cho " + loai);
        break;
      }
      case "gt": { // giới từ: từ ngay trước chỗ trống (GT) đi với giới từ nào
        const w = /(\w+) $/.exec(truocCho(q))[1].toLowerCase();
        assert.ok(GT[w], at + ": thêm “" + w + "” vào GT");
        motDung(q, (o) => o === GT[w], w + " + " + GT[w]);
        break;
      }
      case "cum": { const k = Object.keys(CUM).filter((x) => new RegExp("^ (\\w+ ){0,2}" + x + "\\b").test(sau())); assert.equal(k.length, 1, at + ": từ sau chỗ trống có trong CUM"); motDung(q, (o) => o === CUM[k[0]], "cụm từ cố định"); break; }
      case "md": { // động từ trước chỗ trống → mẫu to-infinitive hay -ing; to be + phân từ là bị động (sai)
        const v = /(\w+)(?: you)? $/.exec(truocCho(q))[1].toLowerCase(), can = MAU[v];
        assert.ok(can, at + ": thêm “" + v + "” vào MAU");
        motDung(q, (o) => (can === "to" ? /^to (?!be )\w+$/.test(o) : /^\w+ing$/.test(o)), v + " + " + can);
        break;
      }
      case "hd": { // từ hạn định hợp với danh từ sau chỗ trống
        const d = Object.keys(DANH).filter((x) => new RegExp("^ (new )?" + x + "\\b").test(sau()));
        assert.equal(d.length, 1, at + ": danh từ sau chỗ trống có trong DANH");
        motDung(q, (o) => { assert.ok(LUONG[lo(o)], at + ": thêm “" + o + "” vào LUONG"); return LUONG[lo(o)].includes(DANH[d[0]]); }, "từ hạn định hợp " + d[0]);
        break;
      }
      case "pv": { // cụm động từ có nghĩa c.y (tín hiệu trong đoạn)
        assert.ok(doanCua(q).text.includes(c.tin), at + ": tín hiệu “" + c.tin + "” có trong đoạn");
        if (c.sau) assert.ok(sau().startsWith(c.sau), at + ": sau chỗ trống là “" + c.sau + "”");
        motDung(q, (o) => PV[(o + (c.sau || "")).toLowerCase()] === c.y, "cụm động từ nghĩa " + c.y);
        break;
      }
      case "lt": { // từ nối: quan hệ ý (tín hiệu trong đoạn) và loại từ (sau chỗ trống)
        const s = sau(), loai = c.loai || (/^,/.test(s) ? "adv" : /^ (you|we|they|he|she|it|i) /.test(s) ? "conj" : "prep"); // c.loai: chủ ngữ là cụm danh từ
        assert.ok(doanCua(q).text.includes(c.tin), at + ": tín hiệu “" + c.tin + "” có trong đoạn");
        motDung(q, (o) => { const x = QH[lo(o)]; assert.ok(x, at + ": thêm “" + o + "” vào QH"); return x[0] === c.qh && x[1] === loai; }, `từ nối ${c.qh}, ${loai}`);
        break;
      }
      case "nghia": { assert.ok(doanCua(q).text.includes(c.tin), at + ": tín hiệu có trong đoạn"); motDung(q, (o) => { assert.ok(NGHIA[o], at + ": thêm “" + o + "” vào NGHIA"); return NGHIA[o] === c.y; }, "nghĩa " + c.y); break; }
      case "ss": { assert.ok(/^ more \w+/.test(sau()), at + ": sau chỗ trống là so sánh hơn"); motDung(q, (o) => SO_SANH.includes(o), "từ bổ nghĩa cho so sánh hơn"); break; }
      case "qhsh": { assert.ok(/^ job is\b/.test(sau()) && / a counsellor $/.test(truocCho(q)), at + ": danh từ không mạo từ ngay sau chỗ trống"); motDung(q, (o) => o === "whose", "đại từ quan hệ sở hữu"); break; }
      case "sx": { // thử mọi thứ tự: chỉ một thứ tự hợp ràng buộc (và người nói lần lượt), đó là đáp án
        const k = /\((\d+)\)/.exec(q.q)[1], x = boSapXep(PS[q.p].text)[k], chu = Object.keys(x.dong);
        q.o.forEach((o) => assert.deepEqual(o.split(" – ").slice().sort(), chu, at + ": lựa chọn là thứ tự của " + chu.join(", ")));
        const ai = (l) => (/^([A-Z][a-z]+(?: [A-Z][a-z]+)?): /.exec(x.dong[l]) || [])[1];
        const loiThoai = chu.every(ai), hop = (ord) => thoaRB(c.rb, ord) && (!loiThoai || ord.every((l, j) => !j || ai(l) !== ai(ord[j - 1])));
        const ok = hoanVi(chu).filter(hop).map((o) => o.join(" – "));
        assert.deepEqual(ok, [q.o[0]], `${at}: chỉ một thứ tự hợp → ${JSON.stringify(ok)}`);
        assert.ok(!NOI.some((n) => lo(x.dong[q.o[0][0]]).startsWith(n + " ") || lo(x.dong[q.o[0][0]]).startsWith(n + ",")), at + ": câu đầu không mở bằng từ nối, từ chỉ lại");
        chu.filter((l) => NOI.some((n) => lo(x.dong[l].replace(/^[A-Z][a-z]+(?: [A-Z][a-z]+)?: /, "")).startsWith(n))).forEach((l) => assert.ok(q.o[0].indexOf(l) > 0, at + ": câu có từ nối không đứng đầu: " + l));
        break;
      }
      case "cau": { // điền câu, mệnh đề: chỉ đáp án hợp loại chỗ trống
        if (c.truoc) assert.ok(truocCho(q).endsWith(c.truoc + " "), at + ": trước chỗ trống là “" + c.truoc + "”");
        if (c.ai) assert.ok(sau().startsWith(", " + c.ai), at + ": chủ ngữ sau dấu phẩy là “" + c.ai + "”");
        if (c.sau) assert.ok(sau().startsWith(c.sau), at + ": sau chỗ trống là “" + c.sau + "”");
        if (["which", "ing", "until", "who"].includes(c.cho)) assert.ok(truocCho(q).endsWith(", "), at + ": chỗ trống đứng sau dấu phẩy");
        if (c.cho === "sub-dau") assert.ok(/(^|[.!?]\s)$/.test(truocCho(q).replace(/\n/g, " ")) && /^,/.test(sau()), at + ": chỗ trống là mệnh đề đứng đầu câu, trước dấu phẩy");
        if (c.cho === "cau") assert.ok(/(^|[.!?]\s)$/.test(truocCho(q).replace(/\n/g, " ")) && /^[.,]/.test(sau()), at + ": chỗ trống là cả một câu");
        motDung(q, (o) => hopCho(c.cho, o), "chỗ trống loại " + c.cho);
        break;
      }
      case "trai": case "gan": { // từ trái nghĩa, gần nghĩa trong đoạn c.doan
        const T = c.k === "trai" ? TRAI : GAN, dv = doanVan(PS[q.p].text)[c.doan - 1];
        assert.ok(new RegExp("\\b" + c.tu + "\\b").test(dv), `${at}: “${c.tu}” có ở đoạn ${c.doan}`);
        assert.ok(q.q.includes(`“${c.tu}” in paragraph ${c.doan}`), at + ": đề bài hỏi đúng từ, đúng đoạn");
        motDung(q, (o) => o === T[c.tu], c.k === "trai" ? "trái nghĩa" : "gần nghĩa");
        assert.ok(!q.o.slice(1).some((o) => o === GAN[c.tu] || o === TRAI[c.tu]), at + ": lựa chọn sai không phải từ gần nghĩa, trái nghĩa đã ghi");
        break;
      }
      case "chi": { // đại từ chỉ lại chủ ngữ ở phần trước của cùng câu hoặc hai câu trước; số ít, số nhiều hợp
        const t = PS[q.p].text, cs = cauVan(t.replace(/\n/g, " ")), j = cs.findIndex((s) => s.includes(c.cum)), dt = /“(\w+)”/.exec(q.q)[1], re = new RegExp("\\b" + dt + "\\b", "gi");
        assert.ok(j >= 0 && new RegExp("\\b" + dt + "\\b").test(c.cum), at + ": có cụm chứa đại từ “" + dt + "”");
        const dv = +/paragraph (\d)/.exec(q.q)[1], d = doanVan(t)[dv - 1];
        assert.ok(d.includes(c.cum), at + ": cụm ở đoạn " + dv);
        assert.ok(q.q.includes(`“${c.cum}”`) || (d.match(re) || []).length === 1, at + ": đề bài chỉ rõ đại từ nào (đoạn chỉ có một “" + dt + "” hoặc đề bài trích cụm)");
        const tr = [cs[j].slice(0, cs[j].indexOf(c.cum)), j > 0 ? cs[j - 1] : "", j > 1 ? cs[j - 2] : ""].join(" ").toLowerCase();
        assert.ok(tr.includes(c.chu.toLowerCase()), `${at}: chủ ngữ “${c.chu}” đứng trước đại từ`);
        const nhieu = /^(they|them)$/i.test(dt);
        if (c.ve) { assert.ok(t.includes(c.ve), at + ": có “" + c.ve + "”"); assert.ok(lo(q.o[0]).includes(lo(c.ve).split(" ").pop()), at + ": đáp án là người mà “" + c.chu + "” chỉ tới"); } else assert.ok(lo(c.chu).startsWith(lo(q.o[0])), at + ": đáp án là chủ ngữ " + c.chu);
        assert.ok(nhieu ? /s$|people$/.test(q.o[0]) : !/s$/.test(q.o[0]), at + ": số ít, số nhiều hợp với đại từ");
        break;
      }
      case "khong": { // NOT: ý của ba lựa chọn sai có trong đoạn (phạm vi c.pham), ý của đáp án không có
        const dv = doanVan(PS[q.p].text)[c.doan - 1], pham = c.pham ? cauVan(dv).find((s) => s.includes(c.pham)) : dv;
        assert.ok(q.q.includes(`paragraph ${c.doan}`), at + ": đề bài hỏi đúng đoạn");
        c.co.forEach((x) => assert.ok(pham.includes(x), `${at}: “${x}” có trong đoạn ${c.doan}`));
        if (c.vang) assert.ok(!c.vang.test(dv) && c.vang.test(q.o[0]), at + ": ý của đáp án không có trong đoạn " + c.doan);
        if (c.khac) { assert.ok(dv.includes(c.khac) && !pham.includes(q.o[0]) && c.khac.includes(q.o[0]), at + ": đáp án là việc của người khác trong đoạn"); }
        break;
      }
      case "dung": { // TRUE: đáp án có chứng cứ trong bài; mỗi lựa chọn sai trái với một câu của bài hoặc không được nhắc tới
        const t = PS[q.p].text;
        assert.ok(t.includes(c.bang), at + ": chứng cứ của đáp án có trong bài");
        c.sai.forEach((re, j) => { assert.ok(re.test(q.o[j + 1]), `${at}: lựa chọn sai ${j + 1} có ý “${re.source}”`); assert.ok((c.nguoc && c.nguoc[j] && c.nguoc[j].test(t)) || (c.vang && c.vang[j] && !c.vang[j].test(t)), `${at}: lựa chọn sai ${j + 1} trái với bài hoặc không được nhắc`); });
        break;
      }
      case "y": { // tóm tắt, diễn đạt lại, suy luận: ý trong bài; đáp án có các ý chính; mỗi lựa chọn sai có lỗi riêng
        const t = PS[q.p].text;
        c.bang.forEach((x) => assert.ok(t.includes(x), `${at}: “${x}” có trong bài`));
        c.co.forEach((re) => assert.ok(re.test(q.o[0]), `${at}: đáp án có ý “${re.source}”`));
        c.sai.forEach((re, j) => { assert.ok(re.test(q.o[j + 1]), `${at}: lựa chọn sai ${j + 1} có lỗi “${re.source}”`); assert.ok(!re.test(q.o[0]), at + ": đáp án không có lỗi đó"); });
        if (DANG.dien.test(q.q)) assert.ok(t.includes(/“([^”]+)”/.exec(q.q)[1]), at + ": câu được hỏi có trong bài");
        break;
      }
      case "doan": { // ý được hỏi nằm ở đúng một đoạn, là đáp án
        const dv = doanVan(PS[q.p].text), co = dv.map((d, j) => (d.includes(c.bang) ? j + 1 : 0)).filter(Boolean);
        assert.deepEqual(co, [+/\d+/.exec(q.o[0])[0]], `${at}: “${c.bang}” ở đoạn ${co.join(", ")}`);
        q.o.forEach((o) => assert.ok(/^Paragraph [1-9]$/.test(o) && +o.slice(-1) <= dv.length, at + ": lựa chọn là số đoạn của bài"));
        break;
      }
      case "chen": { // câu cần chèn có từ chỉ lại; chỉ một vị trí có câu ngay trước nhắc tới điều được chỉ lại
        const t = PS[q.p].text, cauChen = /“([^”]+)”/.exec(q.q)[1], dv = doanVan(t)[+/paragraph (\d)/.exec(q.q)[1] - 1];
        assert.ok(cauChen.toLowerCase().includes(c.tro), at + ": câu cần chèn có “" + c.tro + "”");
        assert.ok(!t.includes(cauChen), at + ": câu cần chèn chưa có trong bài");
        const pos = ["[I]", "[II]", "[III]", "[IV]"].filter((m) => { const truoc = dv.slice(0, dv.indexOf(m)).replace(/\s*\[I+V?\]|\s*\[IV\]/g, "").trim(), cs = cauVan(truoc), cuoi = cs[cs.length - 1] || ""; return typeof c.truoc === "string" ? cuoi.includes(c.truoc) : c.truoc.test(cuoi); });
        assert.deepEqual(pos, [q.o[0]], `${at}: chỉ một vị trí hợp → ${JSON.stringify(pos)}`);
        break;
      }
      default: throw new Error(at + ": mục kiểm tra không rõ: " + c.k);
    }
    soTinh++;
  });
});

/* ---------- dạng câu, độ dài đáp án, nhãn chủ đề, lời giải ---------- */
const deu = (q) => new Set(q.o.map((o) => o.length)).size === 1; // mọi lựa chọn dài bằng nhau: độ dài không gợi ý gì
let dai = 0, ngan = 0, demDeu = 0;
DE.forEach((b) => {
  const mc = b.questions, tinh = mc.filter((q) => !deu(q));
  demDeu += mc.length - tinh.length;
  mc.forEach((q) => { const m = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q)); });
  const d = tinh.filter((q) => q.o[0].length >= Math.max(...q.o.slice(1).map((o) => o.length))).length;
  const n = tinh.filter((q) => q.o[0].length <= Math.min(...q.o.slice(1).map((o) => o.length))).length;
  assert.ok(3 * d <= tinh.length && 6 * d >= tinh.length, `${b.id}: đáp án là lựa chọn dài nhất ở ${d}/${tinh.length} câu (từ một phần sáu đến một phần ba)`);
  assert.ok(3 * n <= tinh.length && 6 * n >= tinh.length, `${b.id}: đáp án là lựa chọn ngắn nhất ở ${n}/${tinh.length} câu (từ một phần sáu đến một phần ba)`);
  dai += d; ngan += n;
});
// cả các đề (Phiên N12-tn-ta-e, rà mười đề): đáp án là lựa chọn dài nhất ở không quá một phần ba số câu
assert.ok(3 * dai <= ALL.length - demDeu, `cả ${DE.length} đề: đáp án là lựa chọn dài nhất ở ${dai}/${ALL.length - demDeu} câu (không quá một phần ba)`);
const nhan = (t) => t.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3);
ALL.forEach((q) => {
  nhan(q.topic).filter((w) => q.o[0].toLowerCase().includes(w)).forEach((w) => assert.ok(q.o.every((o) => o.toLowerCase().includes(w)), `đáp án lặp chữ “${w}” của nhãn chủ đề: ` + ten.get(q)));
  assert.ok(!/\b(option|answer|sentence|statement)s? [A-D]\b|\bthe (first|second|third|fourth|last) (option|answer|one)\b/i.test(q.x), "lời giải nhắc vị trí lựa chọn: " + ten.get(q));
  assert.ok(q.x && q.x.length >= 20, "câu nào cũng có lời giải: " + ten.get(q));
});

/* ---------- chủ điểm của từng nhóm câu (Phiên N12-tn-ta-e, rà mười đề): không hai đề cùng chủ điểm ở cùng nhóm câu ----------
   Nhóm 1, 2, 4, 5, 6 (quảng cáo hoặc thông báo, tờ rơi, đoạn điền câu, hai bài đọc): một chủ điểm của Global Success 10–12 (tên Unit, có
   OnUp-Book thì so với mục lục trong README của sách); nhóm 3 (sắp xếp): loại thư của bộ (15). Mỗi mục kèm một cụm chữ có trong đoạn của
   nhóm đó (không phân biệt chữ hoa), để bảng không lệch với đề. Phiên thêm đề thì thêm một dòng với chủ điểm chưa dùng ở nhóm đó. */
const GS_CHU_DIEM = ["Family Life", "Humans and the Environment", "Music", "For a Better Community", "Inventions", "Gender Equality",
  "Viet Nam and International Organisations", "New Ways to Learn", "Protecting the Environment", "Ecotourism", "A Long and Healthy Life", "The Generation Gap",
  "Cities of the Future", "ASEAN and Viet Nam", "Global Warming", "Preserving Our Heritage", "Education Options for School-leavers", "Becoming Independent",
  "Social Issues", "The Ecosystem", "Life Stories We Admire", "A Multicultural World", "Green Living", "Urbanisation", "The World of Work",
  "Artificial Intelligence", "The World of Mass Media", "Wildlife Conservation", "Career Paths", "Lifelong Learning"];
const LOAI_THU = ["thư cho bạn", "thư xin việc", "thư khiếu nại", "thư cảm ơn", "thư xin lỗi", "thư gửi toà soạn", "thư hỏi thông tin", "thư mời", "thư chúc mừng", "thư xin phép"];
const CHU_DIEM = {
  1: [["Ecotourism", "ECO-LODGE"], ["For a Better Community", "GIVE BLOOD"], ["thư cho bạn", "Dear Siti,"], ["Cities of the Future", "GREEN WALLS FOR HOT CITIES"], ["The Generation Gap", "the generation gap"], ["Global Warming", "hotter than the farmland"]],
  2: [["New Ways to Learn", "LEARN A LANGUAGE"], ["Becoming Independent", "MOVING OUT"], ["thư xin việc", "used to serving customers"], ["The World of Mass Media", "STOP BEFORE YOU SHARE"], ["Gender Equality", "mechanical engineer"], ["The Ecosystem", "Coral reefs"]],
  3: [["Music", "MUSIC NIGHT"], ["Protecting the Environment", "SAVE WATER"], ["thư khiếu nại", "the box was damaged"], ["Artificial Intelligence", "AI TUTORS"], ["Social Issues", "cruel jokes"], ["A Multicultural World", "Food has always travelled with people"]],
  4: [["Humans and the Environment", "awareness of air pollution"], ["The World of Work", "JOB INTERVIEW"], ["thư cảm ơn", "very grateful to you"], ["Urbanisation", "LEAVING THE CITY"], ["Career Paths", "study medicine"], ["Artificial Intelligence", "worry about their jobs"]],
  5: [["A Long and Healthy Life", "keeps your heart healthy"], ["Preserving Our Heritage", "OLD CITADEL"], ["thư xin lỗi", "so sorry that I missed"], ["A Long and Healthy Life", "TEENAGERS NEED MORE SLEEP"], ["Lifelong Learning", "retired at the age of 62"], ["Wildlife Conservation", "Sea turtles"]],
  6: [["Lifelong Learning", "CITY LIBRARY"], ["Global Warming", "STORM SEASON"], ["thư gửi toà soạn", "Dear Editor,"], ["Green Living", "SECOND-HAND CLOTHES"], ["The World of Mass Media", "school podcast"], ["Cities of the Future", "live in cities"]],
  7: [["Inventions", "YOUNG INVENTORS"], ["Family Life", "SHARE THE HOUSEWORK"], ["thư hỏi thông tin", "could you tell me"], ["Humans and the Environment", "ALL THE STARS"], ["Music", "music is treated as a minor subject"], ["Inventions", "the bicycle"]],
  8: [["ASEAN and Viet Nam", "ASEAN CULTURE WEEK"], ["A Long and Healthy Life", "SAVE YOUR HEARING"], ["thư mời", "to invite you"], ["For a Better Community", "FEED A NEIGHBOURHOOD"], ["Becoming Independent", "His parents still do almost everything for him"], ["Preserving Our Heritage", "traditional crafts"]],
  9: [["Education Options for School-leavers", "COLLEGE OPEN DAY"], ["Wildlife Conservation", "WILD ANIMALS ARE NOT SOUVENIRS"], ["thư chúc mừng", "Congratulations on"], ["The Ecosystem", "MANGROVE FOREST"], ["Family Life", "our family would put away all screens"], ["Life Stories We Admire", "Do Van Tam"]],
  10: [["Global Warming", "EARTH HOUR"], ["Social Issues", "Peer pressure"], ["thư xin phép", "to ask whether we could use"], ["Gender Equality", "GIRLS' FOOTBALL TEAM"], ["Education Options for School-leavers", "I took a gap year"], ["The World of Work", "four days a week"]]
};
DE.forEach((b) => {
  const C = CHU_DIEM[so(b)], ps = [...new Set(b.questions.map((q) => q.p))];
  assert.ok(C && C.length === NHOM.length, b.id + ": thêm chủ điểm của sáu nhóm câu vào CHU_DIEM");
  C.forEach(([cd, bang], i) => {
    assert.ok((i === 2 ? LOAI_THU : GS_CHU_DIEM).includes(cd), `${b.id}: nhóm ${i + 1} có chủ điểm “${cd}” không có trong ${i === 2 ? "LOAI_THU" : "GS_CHU_DIEM"}`);
    assert.ok(b.passages[ps[i]].text.toLowerCase().includes(bang.toLowerCase()), `${b.id}: đoạn của nhóm ${i + 1} có “${bang}”`);
  });
});
NHOM.forEach((_, i) => { const ds = DE.map((b) => CHU_DIEM[so(b)][i][0]); assert.equal(new Set(ds).size, ds.length, `nhóm ${i + 1}: hai đề cùng chủ điểm (${ds.join("; ")})`); });

/* ---------- dò lộ đáp án ----------
   Như tests/ta12-ck2.js. Trong một đề, mọi câu và mọi đoạn hiện cùng nhau (đề cố định, không rút): đáp án của câu này có ở đề bài, đáp án,
   lời giải của câu khác, hay ở đoạn của nhóm khác không. Chữ cần dò của đáp án: một từ thì từ đó (từ ngữ pháp chỉ dò trong cùng đoạn);
   2–3 từ thì cả cụm; từ 4 từ thì các chuỗi 3 từ liền nhau không có ở lựa chọn sai nào. Đáp án không phải chữ (thứ tự câu, vị trí [I]–[IV],
   số đoạn) không dò. Đề “Ôn chủ đề” rút chung câu cùng chủ đề của các đề thi thử và ba kho Tiếng Anh 12 (Cloze, Reading; đoạn nào cũng có
   thể rút cùng nhau): dò mọi cặp câu cùng chủ đề có ít nhất một câu của các đề thi thử. */
const NGU_PHAP = new Set(("a an the of to in on at for from with by about and or but so than as if when while because before after is are was were be been am have has had do does did will would can could should must might may not no i you he she it we they me " +
  "him her us them my your his its our their this that these those there here what where who whose how which why yet since ago already " +
  "ever never just very too more most all some any one every each other also up out down off around away into over whether like much").split(" "));
const tu = (s) => String(s).toLowerCase().replace(/[^a-z' ]+/g, " ").split(/\s+/).filter(Boolean).map((w) => w.replace(/'s$/, ""));
const goc1 = (w) => { w = w.replace(/ies$/, "y"); const d = ["ing", "ed", "es", "s", "e"].find((x) => w.endsWith(x) && w.length - x.length >= 4 && !/ss$/.test(w)); return d ? w.slice(0, -d.length) : w; };
const noi = (s) => " " + tu(s).map(goc1).join(" ") + " ";
const khongChu = (q) => q.topic === "Arrangement" || /^\[I+V?\]$|^\[IV\]$|^Paragraph \d$/.test(q.o[0]);
const canDo = (q) => {
  const raw = tu(q.o[0]), w = raw.map(goc1), sai = q.o.slice(1).map(noi);
  return { raw, can: w.length >= 4 ? [...new Set(w.slice(0, -2).map((_, i) => w.slice(i, i + 3).join(" ")))].filter((c) => !sai.some((s) => s.includes(" " + c + " "))) : [w.join(" ")], nguPhap: raw.length === 1 && NGU_PHAP.has(raw[0]) };
};
const KHO12 = BANKS.filter((b) => b.file === "12-ta.js" && !/^ta12-tn-/.test(b.id)), tenKho = new Map(), doanKho = new Map();
KHO12.forEach((b) => b.questions.filter((q) => !b.pool || q.src === b.id).forEach((q, i) => { tenKho.set(q, b.id.replace("ta12-", "") + "#" + (i + 1)); if (q.p) doanKho.set(q, b.passages[q.p]); }));
const tenCau = (q) => ten.get(q) || tenKho.get(q);
const doanCuaCau = (q) => (ten.has(q) ? doanCua(q) : doanKho.get(q));
const chuCua = (q, doan) => [q.q, q.x].concat(q.type === "mc" ? [q.o[0]] : q.o || [], q.ans || [], doan ? [doan.text] : []);
const doLo = (qs, cungLuc) => {
  const ra = [];
  qs.forEach((q) => {
    if (!ten.has(q) && !tenKho.has(q)) return;
    if ((q.type !== "mc" && q.type !== "fill") || q.topic === "Pronunciation" || (ten.has(q) && khongChu(q))) return;
    const { can, nguPhap } = canDo(q.type === "fill" ? Object.assign({}, q, { o: [q.ans[0]] }) : q);
    qs.forEach((p2) => {
      if (!cungLuc(q, p2) || (nguPhap && (q.topic !== p2.topic || (q.p && p2.p && q.p !== p2.p)))) return;
      const T = chuCua(p2, p2.p && p2.p !== q.p ? doanCuaCau(p2) : null).map(noi).join("|");
      can.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
    });
  });
  return [...new Set(ra)];
};
const lo = DE.flatMap((b) => doLo(b.questions, (a, x) => a !== x));
const cungCD = KHO12.flatMap((b) => b.questions.filter((q) => (!b.pool || q.src === b.id) && ["Cloze", "Reading"].includes(q.topic)));
const loCD = ["Cloze", "Arrangement", "Text completion", "Reading"].flatMap((t) => doLo(ALL.concat(cungCD).filter((q) => q.topic === t), (a, x) => a !== x && (ten.has(a) || ten.has(x)) && deOf.get(a) !== deOf.get(x) || false)).filter((s) => !lo.includes(s));
if (process.env.DO_LO) console.log("Đáp án có ở câu khác cùng đề, cùng chủ đề (xem tay):\n" + lo.concat(loCD).join("\n"));
// đã xem: từ của đáp án có ở đoạn của kho khác cùng chủ đề nhưng khác nghĩa, không gợi đáp án (pay: tiền lương, trả tiền, đáp án là pay
// attention to; useful trong lời một nhân vật nói về ứng dụng, câu hỏi là từ gần nghĩa của valuable; empty tả mái nhà trống, câu hỏi là từ
// trái nghĩa của crowded; put trong “Put your rubbish in the bins” của đoạn điền kho cuối kì I là đặt, để, đáp án tn-de3#8 là put off: hoãn)
const DA_XEM = [
  "ck1-de2#20 → tn-de1#4: pay", "ck1-de2#21 → tn-de1#4: pay", "ck1-de2#22 → tn-de1#4: pay", "gk2-de1#20 → tn-de1#4: pay",
  "ck1-ngau-nhien#20 → tn-de3#8: put", "ck1-ngau-nhien#21 → tn-de3#8: put", "ck1-ngau-nhien#22 → tn-de3#8: put",
  "gk2-de1#23 → tn-de1#26: useful", "gk2-de1#24 → tn-de1#26: useful", "gk2-de1#25 → tn-de1#26: useful",
  "ck1-de1#23 → tn-de1#36: empty", "ck1-de1#24 → tn-de1#36: empty", "ck1-de1#25 → tn-de1#36: empty"
];
assert.deepEqual(lo.concat(loCD), DA_XEM, "đáp án có ở câu khác đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// đáp án câu điền (Cloze, Text completion) không có ở chỗ khác của chính đoạn đó (trừ từ ngữ pháp)
ALL.filter((q) => ["Cloze", "Text completion"].includes(q.topic)).forEach((q) => {
  const { can, nguPhap } = canDo(q), T = noi(doanCua(q).text.replace(/\(\d+\) ___/g, " "));
  if (!nguPhap) can.forEach((c) => assert.ok(!T.includes(" " + c + " "), `${ten.get(q)}: đáp án “${c}” có ở chỗ khác của đoạn`));
});
// note hiện ở màn mở đề: không có đáp án câu nào của đề
DE.forEach((b) => { const N = noi(b.note); b.questions.filter((q) => !khongChu(q)).forEach((q) => { const { can, nguPhap } = canDo(q); if (!nguPhap) can.filter((c) => N.includes(" " + c + " ")).forEach((c) => assert.fail(`note có đáp án của ${ten.get(q)}: ${c}`)); }); });
// đáp án không trùng câu cùng chủ đề của các kho Tiếng Anh 12 khác và của đề thi thử khác
{
  const goc = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, "");
  const daAn = (q) => (q.type === "mc" ? q.o[0] : q.type === "fill" ? q.ans[0] : null);
  ALL.filter((q) => !khongChu(q)).forEach((q) => ALL.concat(cungCD).filter((o) => o !== q && o.topic === q.topic && deOf.get(o) !== deOf.get(q) && daAn(o) !== null && goc(daAn(o)) === goc(q.o[0])).forEach((o) => assert.fail(`${ten.get(q)} trùng đáp án “${q.o[0]}” với ${tenCau(o)}`)));
}
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = DE[0].questions[1], b2 = Object.assign({}, DE[0].questions[30], { x: DE[0].questions[30].x + " Only " + a.o[0] + " staff work here." });
  assert.ok(doLo([a, b2], (x, y) => x !== y).some((s) => s.endsWith(": " + goc1(a.o[0].toLowerCase()))), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
  const c = DE[0].questions.find((q) => q.topic === "Reading" && /successful/.test(q.o[0])), e = Object.assign({}, DE[0].questions[22], { x: "It has been more successful than she imagined." });
  assert.ok(doLo([c, e], (x, y) => x !== y).length > 0, "bộ dò phải bắt được một đoạn của đáp án là câu");
}

/* ---------- đề bài không gần trùng câu của các kho Tiếng Anh 12 khác, của đề thi thử khác (cặp hai từ liền nhau chung) ---------- */
const LOI_DAN = ["Choose the best option for blank", "Choose the best order of the lines in", "Choose the best order of the sentences in", "to make a meaningful exchange", "to make a meaningful letter",
  "to make a meaningful paragraph", "Which of the following is TRUE according to the passage?", "Which of the following best summarises paragraph", "Which of the following best summarises the passage?",
  "Which of the following best paraphrases the sentence", "Which of the following can be inferred from", "is closest in meaning to ___.", "is OPPOSITE in meaning to ___.", "refers to ___.",
  "does the following sentence best fit?", "In which paragraph does the writer", "According to paragraph", "Which of the following is NOT mentioned as", "Which of the following is NOT mentioned", "which of the following", "in paragraph", "Read the text. Then answer the questions."];
const LD_RE = new RegExp(LOI_DAN.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|"), "gi"); // không phân biệt chữ hoa
const boLoiDan = (s) => String(s).replace(LD_RE, " | ");
{
  const cap2 = (s) => { const w = boLoiDan(s).toLowerCase().replace(/[^a-z'|]+/g, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const cu = KHO12.flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), tatCa = ALL.concat(cu), df = {};
  tatCa.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capCua = (q) => new Set(cap2([q.q].concat(q.topic === "Arrangement" ? [] : q.o).join(" | ")).filter((c) => (df[c] || 0) < 0.03 * tatCa.length));
  const gan = ALL.flatMap((q) => { const c = capCua(q); return tatCa.filter((o) => o !== q && deOf.get(o) !== deOf.get(q)).map((o) => { const d = capCua(o), chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${tenCau(o)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  assert.deepEqual(gan, [], "đề bài gần trùng câu của kho Tiếng Anh 12 khác, của đề thi thử khác");
}

/* ---------- từ của sách, không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const daDoan = new Set();
const truong = (q) => { const ra = [boLoiDan(q.q), q.x].concat(q.o); const k = deOf.get(q).id + "/" + q.p; if (!daDoan.has(k)) { daDoan.add(k); ra.push(doanCua(q).text); } return ra; };
const TRUONG = new Map(); ALL.forEach((q) => TRUONG.set(q, truong(q)));
if (SACH.length) {
  // từ được hỏi và đáp án câu từ vựng có trong sách Tiếng Anh 6–12 (Global Success)
  const ta = SACH.filter((f) => /lop-(6|7|8|9|10|11|12)[\\/]tieng-anh/.test(f));
  assert.ok(ta.length >= 7, "OnUp-Book có sách Tiếng Anh 6–12");
  const S = " " + ta.map((f) => fs.readFileSync(f, "utf8").replace(/-\n/g, "").replace(/\s+/g, " ").toLowerCase()).join(" | ") + " ";
  const coTrong = (w) => [w, w.replace(/es$/, ""), w.replace(/s$/, "")].some((x) => S.includes(" " + x.toLowerCase())); // từ số nhiều: tìm cả dạng số ít
  const tuHoi = [].concat(Object.keys(TRAI), Object.values(TRAI).filter((w) => !/^get /.test(w)), Object.keys(GAN), Object.values(GAN).filter((w) => !/^stop /.test(w)), Object.keys(CUM).map((k) => CUM[k] + " "),
    ["professional", "confident", "stay away from", "run out of", "tested", "reveal", "several", "a number of", "whose", "moreover", "as a result", "apart from", "even if", "pay attention to", /\bhave (a |an )?(\w+ )?conversations?\b/, "turn off",
      "creativity", "essential", "put off", "plenty of", "otherwise", "as long as", "reduce", /\bdo (your|their|his|her|our) best\b/, "environmentally friendly", /\braise (\w+ )?awareness\b/, "due to", "find out", "impression", "although",
      "strength", "lose weight", "a large amount of", "take off", "damage", "as soon as", "therefore",
      "borrowed", "accessible", "furthermore", "slightly", "a little", "keep up with", "warnings", "useful", "once",
      "excited about", "enthusiastic", "managed to", "won first prize", "unless", "lots of", "divide", "pick up", "even though", "independence",
      "cultural diversity", "set up", "brought", "as well as", "a couple of", "cut down on", "avoid", "harmful", "protect", "in case",
      "variety", "turned into", "advise", "nevertheless", "both", "illegal", "watch out for", "release", "riding", "for instance",
      "effective", "afraid to", "since", "a bit of", "give in", "politely", "accept", "in fact"]);
  tuHoi.forEach((w) => assert.ok(w instanceof RegExp ? w.test(S) : coTrong(w), `“${w}” không có trong sách Tiếng Anh 6–12`));
  // chủ điểm của bảng CHU_DIEM là tên Unit trong mục lục của Global Success 10–12
  const mucLuc = ["10", "11", "12"].map((l) => fs.readFileSync(path.join(BOOK, "lop-" + l, "tieng-anh-" + l, "README.md"), "utf8")).join("\n");
  GS_CHU_DIEM.forEach((cd) => assert.ok(mucLuc.includes(": " + cd + " |"), `“${cd}” là tên Unit trong mục lục Global Success 10–12`)); // cụm động từ + danh từ: sách viết “have similar conversations”
  // tra bằng tập chuỗi (Phiên N12-tn-ta-e; trước đó tìm từng chuỗi trong chữ của 108 cuốn, gần 3 phút): gom mọi chuỗi k từ của các câu,
  // rồi đi qua chữ của từng cuốn một lần; cùng kết quả vì chuỗi không vượt qua chỗ nối hai cuốn
  const sachTu = SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")).split(" ").filter(Boolean));
  const coSach = (k) => { const can = new Set(ALL.flatMap((q) => TRUONG.get(q).flatMap((s) => chuoi(s, k)))), co = new Set(); sachTu.forEach((w) => { for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k).join(" "); if (can.has(c)) co.add(c); } }); return co; };
  const bao = (k) => { const co = coSach(k); return ALL.flatMap((q) => TRUONG.get(q).flatMap((s) => chuoi(s, k).filter((c) => co.has(c)).map((c) => `${ten.get(q)}: ${c}`))); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book); " + tuHoi.length + " từ được hỏi, đáp án câu từ vựng có trong sách Tiếng Anh 6–12.");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác và giữa các đề thi thử: chuỗi từ liền nhau trùng ---------- */
{
  // mỗi trường chữ của câu kho khác tách thành chuỗi k từ (chuỗi không vượt qua chỗ nối hai trường), tra bằng tập chuỗi như bước so với sách
  const khac = BANKS.filter((b) => !/^ta12-tn-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: [q.q, q.x].concat(q.o || [], q.ans || [], q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []) })));
  const bao = (k) => {
    const can = new Set(ALL.flatMap((q) => TRUONG.get(q).flatMap((s) => chuoi(s, k)))), co = new Map();
    khac.forEach((o) => o.s.forEach((s) => chuoi(s, k).filter((c) => can.has(c)).forEach((c) => (co.get(c) || co.set(c, new Set()).get(c)).add(o.id))));
    return ALL.flatMap((q) => [...new Set(TRUONG.get(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => [...(co.get(c) || [])].map((id) => `${ten.get(q)} ~ ${id}: ${c}`)));
  };
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
  // giữa các đề thi thử: đoạn, đề bài (bỏ lời dặn chuẩn), lựa chọn, lời giải
  const cua = (b) => " " + b.questions.flatMap((q) => TRUONG.get(q)).map(khongDau).join(" | ") + " ";
  const giua = DE.flatMap((b, i) => DE.slice(i + 1).flatMap((b2) => { const S2 = cua(b2); return [...new Set(b.questions.flatMap((q) => TRUONG.get(q).flatMap((s) => chuoi(s, 8))))].filter((c) => S2.includes(" " + c + " ")).map((c) => `${b.id} ~ ${b2.id}: ${c}`); }));
  assert.deepEqual(giua, [], "chuỗi 8 từ trùng giữa các đề thi thử");
}
console.log(DE.length + " đề, " + ALL.length + " câu; " + soTinh + " câu đã tính lại bằng code (bảng, thứ tự câu, chữ của đoạn đọc); mỗi đề 9 Biết, 15 Hiểu, 16 Vận dụng; đáp án là lựa chọn dài nhất ở " + dai + ", ngắn nhất ở " + ngan + " câu (không tính " + demDeu + " câu mọi lựa chọn dài bằng nhau).");
console.log("TA12 TN OK");
