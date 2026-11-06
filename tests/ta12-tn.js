// Kiểm tra các đề Tiếng Anh thi thử tốt nghiệp THPT (data/banks/12-ta.js, ta12-tn-de<N>; Phiên N12-tn-ta: Đề 1–2; phiên thêm đề thì
// mở rộng script này: thêm khoá của đề vào RIENG). Đề tính điểm (Phiên K5), khung đề tốt nghiệp THPT từ năm 2025 (Quyết định
// 764/QĐ-BGDĐT; đề chính thức năm 2026 giữ nguyên; docs/KE-HOACH-NOI-DUNG.md, mục 2 và mục 7, khối “Phiên N12-tn-ta”). Số đề, số câu lấy
// từ danh mục (không ghi cứng).
// Kiểm tra từng đề: danh mục (tên, khối, môn, file, 50 phút, pts 10, gắn vào tn-thpt-2027; tên tiếng Anh do Quiz.title dựng); 40 câu
// nhiều lựa chọn, mỗi câu 4 lựa chọn, pt 0,25; sáu nhóm câu 6 – 6 – 5 – 5 – 8 – 10, mỗi nhóm một đoạn ở passages, câu liền nhau, đúng
// part (Part I. Cloze texts 1–12, Part II. Arrangement 13–17, Part III. Text completion 18–22, Part IV. Reading comprehension 23–40),
// đúng chủ đề (Cloze, Arrangement, Text completion, Reading), đúng lời dặn của đoạn; chỗ trống (1)–(6), (7)–(12), (18)–(22) theo thứ
// tự, mỗi câu hỏi đúng chỗ trống của nó; năm bộ (13)–(17): hai lời thoại (bộ 13 ba dòng a–c, bộ 14 năm dòng, hai người nói), một thư
// (lời chào Dear …, lời kết và tên), hai đoạn văn (mỗi dòng một câu); bài đọc 1 khoảng 300 từ, bài đọc 2 khoảng 400 từ có đủ [I]–[IV]
// trong đoạn mà câu chọn vị trí hỏi; các dạng câu đọc hiểu như đề tham khảo năm 2025 (DANG_DOC); mức độ 9 Biết, 15 Hiểu, 16 Vận dụng,
// phần nào cũng đủ ba mức; Quiz.grade (đúng hết: 3 – 1,25 – 1,25 – 4,5, tổng 10; sai hết: 0); note (khung đề, số câu, số phút, điểm
// mỗi câu, các phần với số câu tính từ dữ liệu, không câu nghe, phát âm, viết, app chấm cả đề).
// Tính lại đáp án bằng code (RIENG: mỗi câu một mục kiểm tra): thứ tự tính từ (ADJ), dạng của từ (HO_TU, từ loại chỗ trống cần), rút gọn
// mệnh đề quan hệ (PHAN_TU), cụm từ cố định (CUM, từ đứng sau chỗ trống), động từ + to-infinitive hay -ing (MAU), từ hạn định với danh
// từ đếm được số ít, số nhiều, không đếm được (DANH, LUONG), cụm động từ theo nghĩa (PV, tín hiệu trong đoạn), từ nối theo quan hệ ý và
// loại từ (QH: trạng từ trước dấu phẩy, giới từ trước danh từ, liên từ trước mệnh đề), nghĩa của từ (NGHIA), từ bổ nghĩa cho so sánh hơn,
// đại từ quan hệ sở hữu; câu sắp xếp: thử mọi thứ tự, chỉ một thứ tự hợp các ràng buộc (người nói lần lượt; câu có từ nối, từ chỉ lại
// đứng sau câu nó chỉ tới) và đó là đáp án; câu điền câu, mệnh đề: bộ phân loại nhỏ (mệnh đề đầy đủ có động từ chia, mệnh đề quan hệ,
// phân từ, cụm sau before) và chỗ trống cần loại nào, chỉ đáp án hợp; câu đọc hiểu đối chiếu chữ của đoạn đọc (từ trái nghĩa, gần nghĩa
// theo TRAI, GAN; đại từ chỉ lại chủ ngữ của câu trước; ý không được nhắc; ý đúng; câu tóm tắt, diễn đạt lại, suy luận theo ý có trong
// đoạn và lỗi của từng lựa chọn sai; đoạn có ý được hỏi; vị trí [I]–[IV] duy nhất hợp từ chỉ lại của câu cần chèn).
// Rồi: đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất (kể cả bằng nhau) ở từ một phần sáu đến một
// phần ba số câu của mỗi đề (không tính câu mọi lựa chọn dài bằng nhau: thứ tự câu, thứ tự tính từ, số đoạn), không là lựa chọn duy
// nhất có chữ của nhãn chủ đề;
// lời giải không nhắc vị trí lựa chọn; dò lộ đáp án giữa mọi cặp câu của một đề (mọi đoạn hiện cùng đề), với note, và giữa câu cùng chủ
// đề của các đề thi thử và ba kho Tiếng Anh 12 (đề “Ôn chủ đề”: Cloze, Reading rút chung; DO_LO=1 in ra để xem tay, đã xem ở DA_XEM);
// đáp án câu điền không có ở chỗ khác của chính đoạn đó; đáp án không trùng câu cùng chủ đề của kho Tiếng Anh 12 khác; đề bài không gần
// trùng câu của các kho Tiếng Anh 12 khác (cặp hai từ liền nhau chung, bỏ lời dặn chuẩn LOI_DAN). Có sách ở ../OnUp-Book (repo riêng
// tư) thì từ được hỏi và đáp án câu từ vựng có trong sách Tiếng Anh 6–12 (Global Success), mọi trường chữ (cả đoạn đọc) không có chuỗi 8
// từ trùng chữ OCR của mọi cuốn (DO_SACH=1 in chuỗi 6 từ). So với mọi câu, đoạn đọc của các kho khác và giữa các đề thi thử với nhau:
// không chuỗi 8 từ nào trùng (bỏ lời dặn chuẩn; DO_KHO=1 in chuỗi 5 từ).
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
  tr: "Read the leaflet. Choose the best option for each numbered blank.",
  sx: "Read the sets of lines and sentences (13)–(17). Then answer the questions.",
  dien: "Read the text. Choose the best option to complete each numbered blank.",
  doc: "Read the text. Then answer the questions."
};
// sáu nhóm câu như đề tham khảo năm 2025: số câu, phần, chủ đề, lời dặn của đoạn, số từ của đoạn
const NHOM = [
  { n: 6, part: 0, topic: "Cloze", ld: LD.qc, tu: [70, 160] },
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
    assert.equal(ps1.title, x.ld, `${at}: lời dặn của đoạn ${ps[i]}`);
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
    "each question is worth 0.25 points", `Part I, cloze texts: an advertisement and a leaflet (${phan(0)})`, `Part II, arrangement (${phan(1)})`, `Part III, text completion (${phan(2)})`,
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
const ADJ = { lovely: 1, friendly: 1, old: 3, young: 3, British: 6, wooden: 7 };
// từ loại (dạng của từ)
const HO_TU = { professional: "adj", professionally: "adv", unprofessionally: "adv", professionalism: "noun", confidently: "adv", confident: "adj", confidence: "noun", confide: "verb" };
// dạng của động từ trong mệnh đề quan hệ rút gọn: pp quá khứ phân từ (bị động), ing (chủ động), past động từ chia (không rút gọn được)
const PHAN_TU = { grown: "pp", growing: "ing", living: "ing" };
// cụm từ cố định: từ đứng sau chỗ trống → động từ đi cùng
const CUM = { attention: "pay", conversation: "have" };
// động từ + to-infinitive hay -ing (remember: việc phải làm sau này → to-infinitive)
const MAU = { remember: "to", avoid: "ing", allows: "to" };
// danh từ sau chỗ trống: sg đếm được số ít, pl số nhiều; từ hạn định đi được với loại nào
const DANH = { donation: "sg", glasses: "pl", responsibilities: "pl" };
const LUONG = { each: ["sg"], every: ["sg"], many: ["pl"], all: ["pl", "unc"], "a few": ["pl"], both: ["pl"], several: ["pl"], much: ["unc"], "a little": ["unc"], "a large amount of": ["unc"], "a number of": ["pl"], "a great deal of": ["unc"] };
// cụm động từ: nghĩa
const PV = { "stay away from": "avoid", "put up with": "tolerate", "run out of": "have none left", "look forward to": "wait happily for", "cut down on": "reduce" };
// từ nối: [quan hệ, loại]; adv trước dấu phẩy, prep trước danh từ, conj trước mệnh đề
const QH = {
  moreover: ["addition", "adv"], however: ["contrast", "adv"], therefore: ["result", "adv"], thus: ["result", "adv"], "because of": ["cause", "prep"], otherwise: ["condition", "adv"], "as a result": ["result", "adv"],
  "for instance": ["example", "adv"], instead: ["replacement", "adv"], "apart from": ["addition", "prep"], "instead of": ["replacement", "prep"],
  "in spite of": ["concession", "prep"], despite: ["concession", "prep"], "due to": ["cause", "prep"], "even if": ["concession", "conj"], unless: ["condition", "conj"]
};
// nghĩa của từ trong ngữ cảnh
const NGHIA = { tested: "check", spent: "use up", sold: "give for money", lent: "give for a time", reveal: "let others know", hide: "keep out of sight", keep: "hold on to", store: "put away" };
// từ bổ nghĩa đứng trước so sánh hơn
const SO_SANH = ["much", "far", "a lot", "even", "slightly"];
// từ trái nghĩa, gần nghĩa trong ngữ cảnh của đoạn đọc
const TRAI = { conflict: "agreement", crowded: "empty", common: "unusual", recover: "get worse" };
const GAN = { valuable: "useful", "cope with": "deal with", "give up": "stop trying", approaches: "methods" };
const NOI = ["however", "then", "these", "this", "their", "thanks to this", "because of this", "today", "ten years later", "sadly", "with this", "in the water", "worried that"];

/* ---------- câu điền câu, mệnh đề: bộ phân loại nhỏ ---------- */
const SUB = ["because", "although", "when", "if", "once", "since", "while", "before", "after", "unless"];
const REL = ["which", "who", "that", "whose", "where"];
const PP = ["asked", "published", "held", "made", "grown"];
const FIN = new Set(["absorbs", "makes", "hold", "holds", "helps", "need", "must", "is", "are", "was", "spreads", "means", "affect"]);
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
        if (c.can === "adj") assert.ok(/^ [a-z]+ [a-z]+s\b/.test(s), at + ": sau chỗ trống là cụm danh từ");
        if (c.can === "adv") assert.ok(/speak English more $/.test(truocCho(q)), at + ": chỗ trống bổ nghĩa cho động từ speak");
        motDung(q, (o) => { assert.ok(HO_TU[o], at + ": thêm “" + o + "” vào HO_TU"); return HO_TU[o] === c.can; }, "đúng từ loại " + c.can);
        break;
      }
      case "rg": { // rút gọn mệnh đề quan hệ: bị động → quá khứ phân từ; chủ động → -ing; không có đại từ quan hệ, be
        motDung(q, (o) => { const w = o.split(" "); if (w.length > 1) return false; assert.ok(PHAN_TU[o], at + ": thêm “" + o + "” vào PHAN_TU"); return PHAN_TU[o] === c.can; }, "đúng dạng " + c.can);
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
        motDung(q, (o) => PV[o + (c.sau || "")] === c.y, "cụm động từ nghĩa " + c.y);
        break;
      }
      case "lt": { // từ nối: quan hệ ý (tín hiệu trong đoạn) và loại từ (sau chỗ trống)
        const s = sau(), loai = /^,/.test(s) ? "adv" : /^ (you|we|they|he|she|it|i) /.test(s) ? "conj" : "prep";
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
        if (c.cho === "which" || c.cho === "ing") assert.ok(truocCho(q).endsWith(", "), at + ": chỗ trống đứng sau dấu phẩy");
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
const nhan = (t) => t.toLowerCase().split(/[^a-z]+/).filter((w) => w.length > 3);
ALL.forEach((q) => {
  nhan(q.topic).filter((w) => q.o[0].toLowerCase().includes(w)).forEach((w) => assert.ok(q.o.every((o) => o.toLowerCase().includes(w)), `đáp án lặp chữ “${w}” của nhãn chủ đề: ` + ten.get(q)));
  assert.ok(!/\b(option|answer|sentence|statement)s? [A-D]\b|\bthe (first|second|third|fourth|last) (option|answer|one)\b/i.test(q.x), "lời giải nhắc vị trí lựa chọn: " + ten.get(q));
  assert.ok(q.x && q.x.length >= 20, "câu nào cũng có lời giải: " + ten.get(q));
});

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
// trái nghĩa của crowded)
const DA_XEM = [
  "ck1-de2#20 → tn-de1#4: pay", "ck1-de2#21 → tn-de1#4: pay", "ck1-de2#22 → tn-de1#4: pay", "gk2-de1#20 → tn-de1#4: pay",
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
    ["professional", "confident", "stay away from", "run out of", "tested", "reveal", "several", "a number of", "whose", "moreover", "as a result", "apart from", "even if", "pay attention to", /\bhave (a |an )?(\w+ )?conversations?\b/, "turn off"]);
  tuHoi.forEach((w) => assert.ok(w instanceof RegExp ? w.test(S) : coTrong(w), `“${w}” không có trong sách Tiếng Anh 6–12`)); // cụm động từ + danh từ: sách viết “have similar conversations”
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => ALL.flatMap((q) => TRUONG.get(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book); " + tuHoi.length + " từ được hỏi, đáp án câu từ vựng có trong sách Tiếng Anh 6–12.");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác và giữa các đề thi thử: chuỗi từ liền nhau trùng ---------- */
{
  const khac = BANKS.filter((b) => !/^ta12-tn-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + [q.q, q.x].concat(q.o || [], q.ans || [], q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => ALL.flatMap((q) => [...new Set(TRUONG.get(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
  // giữa các đề thi thử: đoạn, đề bài (bỏ lời dặn chuẩn), lựa chọn, lời giải
  const cua = (b) => " " + b.questions.flatMap((q) => TRUONG.get(q)).map(khongDau).join(" | ") + " ";
  const giua = DE.flatMap((b, i) => DE.slice(i + 1).flatMap((b2) => { const S2 = cua(b2); return [...new Set(b.questions.flatMap((q) => TRUONG.get(q).flatMap((s) => chuoi(s, 8))))].filter((c) => S2.includes(" " + c + " ")).map((c) => `${b.id} ~ ${b2.id}: ${c}`); }));
  assert.deepEqual(giua, [], "chuỗi 8 từ trùng giữa các đề thi thử");
}
console.log(DE.length + " đề, " + ALL.length + " câu; " + soTinh + " câu đã tính lại bằng code (bảng, thứ tự câu, chữ của đoạn đọc); mỗi đề 9 Biết, 15 Hiểu, 16 Vận dụng; đáp án là lựa chọn dài nhất ở " + dai + ", ngắn nhất ở " + ngan + " câu (không tính " + demDeu + " câu mọi lựa chọn dài bằng nhau).");
console.log("TA12 TN OK");
