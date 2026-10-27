// Kiểm tra ngân hàng Tiếng Anh 9 cuối kì I của Phiên N9-ck1-ta (data/banks/9-ta.js, ta9-ck1-*), theo mẫu tests/van9-ck1.js.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho
// lớp 9 (đoạn “Chung của các phiên lớp 9” của docs/KE-HOACH-NOI-DUNG.md).
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho):
// - Pronunciation: phiên âm của từng lựa chọn ghi ở IPA (theo từ điển Anh – Anh), âm hỏi phải là âm của Unit 1–6 trong Book map;
//   đúng một lựa chọn có âm đó (hay khác âm, h câm, mở đầu bằng /j/), lời giải ghi đúng phiên âm của đáp án;
// - so sánh kép (Unit 2): đọc từng câu “The + so sánh …, the + so sánh …” theo bảng dạng so sánh của tính từ;
// - quá khứ tiếp diễn, wish + quá khứ đơn (Unit 4), hiện tại hoàn thành, since / for / yet (Unit 5), câu điều kiện loại 1 (Unit 3),
//   động từ + to-infinitive, động từ + V-ing (Unit 6) theo bảng dạng động từ; cụm động từ (Unit 1, 2) theo danh sách của sách;
//   động từ khuyết thiếu, cụm động từ của Unit 2, từ để hỏi + to-infinitive theo tín hiệu nghĩa trong đề bài (đúng một lựa chọn hợp);
// - câu sắp xếp: mảnh đầu viết hoa, mảnh cuối có dấu chấm, các mảnh khác viết thường (một thứ tự), lời giải ghi lại cả câu;
//   câu tìm lỗi sai: các lựa chọn là các phần của câu trong ngoặc.
// Rồi kiểm tra ma trận (hai đề cố định và câu riêng đều chia đúng ma trận, theo thứ tự chủ đề), tên chủ đề theo Contents của sách,
// Reading (mỗi đề và phần câu riêng một đoạn 3 câu mức 1-2-3), dạng câu, đáp án đúng không dài hơn hẳn lựa chọn sai, đề bài không
// trùng, note nói về đề chung của Sở, rút thử nhiều lần (đúng ma trận, trọn đoạn, gặp đủ kho; đã làm hết một đề cố định thì không
// rút lại câu của đề đó) và dò lộ đáp án giữa các câu rút được cùng lúc (Rút ra N5, N25, N25b; cách dò ở chú thích của doLo): đáp án
// một từ so theo gốc từ, từ ngữ pháp (yet, had, what…) chỉ so với câu cùng Unit; đáp án 2–3 từ so cả cụm; đáp án là câu so chuỗi 3 từ
// không có ở lựa chọn sai; đáp án Reading chỉ so trong cùng đoạn; đáp án không lặp từ của chính đề bài (Rút ra N12). DO_LO=1 in ra để
// xem tay, danh sách đã xem ở DA_XEM.
// Có sách ở ../OnUp-Book (repo riêng tư): từ của đáp án câu từ vựng, cụm động từ có trong trang của đúng Unit đó (theo trang bắt đầu ở
// Contents, cộng mục Unit đó của Glossary; cụm động từ Unit 1 tính cả Review 1); mọi trường chữ (cả đoạn đọc; trừ lời dặn chuẩn của
// mục 3.2, sách cũng dùng) không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm; DO_SACH=1 in chuỗi 6 từ).
// So thêm với mọi câu của các kho khác: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/ta9-ck1.js → in TA9 OK.
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
const S = { de1: "ta9-ck1-de1", de2: "ta9-ck1-de2", pool: "ta9-ck1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 9); assert.equal(b.subject, "Tiếng Anh"); assert.equal(b.file, "9-ta.js");
  assert.ok(/common end-of-term test/.test(b.note) && /Department of Education/.test(b.note), b.id + ": note nói về đề chung của Sở");
  assert.ok(/No listening/.test(b.note), b.id + ": note ghi không có câu nghe");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("ta9-ck1-", "") + "#" + (i + 1))));
const cauCua = (has) => { const m = kho.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };

/* ---------- tên chủ đề theo Contents của sách, ma trận ---------- */
const UNITS = ["Local Community", "City Life", "Healthy Living for Teens", "Remembering the Past", "Our Experiences", "Vietnamese Lifestyle: Then and Now"];
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
assert.deepEqual(TOPICS, ["Pronunciation"].concat(UNITS.map((u, i) => `Unit ${i + 1} · ${u}`), ["Reading"]), "chủ đề: Pronunciation, Unit 1–6 theo Contents, Reading");
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
UNITS.forEach((_, i) => { const n = kho.filter((q) => unitOf(q) === i + 1).length / 3; assert.ok(n >= 3 && n <= 4, `Unit ${i + 1}: mỗi đề 3–4 câu`); });
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
assert.ok(kho.filter((q) => /^Which part of the sentence is wrong\?/.test(q.q)).length >= 3, "có câu tìm lỗi sai");
assert.ok(kho.filter((q) => /^Choose the sentence closest in meaning/.test(q.q)).length >= 3, "có câu chọn câu đồng nghĩa (viết lại câu)");
// lời giải không nói “option A”, “the second sentence”: app xáo phương án
kho.forEach((q) => assert.ok(!/\b(option|answer|sentence|statement)s? [A-D]\b|\bthe (first|second|third|fourth|last) (option|answer|sentence|statement|one)\b/i.test(q.x), "lời giải nhắc vị trí: " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau
kho.filter((q) => q.type === "mc").forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + ten.get(q));
  if (/___/.test(q.q)) assert.equal(q.q.split("___").length, 2, "đúng một chỗ trống: " + ten.get(q));
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
const loi = kho.filter((q) => /^Which part of the sentence is wrong\?/.test(q.q));
loi.forEach((q) => { const c = /“([^”]+)”/.exec(q.q)[1]; q.o.forEach((o) => assert.ok(c.includes(o), `“${o}” không phải phần của câu: ` + ten.get(q))); });
// câu điền: lời dặn, động từ trong ngoặc ngay sau chỗ trống, đáp án là dạng của động từ đó
kho.filter((q) => q.type === "fill").forEach((q) => {
  assert.ok(/^Write the correct form of the verb in brackets\./.test(q.q), "lời dặn câu điền: " + ten.get(q));
  const m = /___ \(([^)]+)\)/.exec(q.q); assert.ok(m, "động từ trong ngoặc ngay sau chỗ trống: " + ten.get(q));
  const v = m[1].split(" / ").pop();
  q.ans.forEach((a) => assert.ok(a.includes(v.replace(/e$/, "").slice(0, 4)), `đáp án “${a}” không phải dạng của “${v}”: ` + ten.get(q)));
});

/* ---------- Pronunciation: tính lại đáp án theo phiên âm ---------- */
// Âm trong Book map (tr. 4–7): Unit 1 /æ/, /ɑː/, /e/; Unit 2 /aʊ/, /əʊ/, /eə/; Unit 3 /h/, /r/; Unit 4 /m/, /l/; Unit 5 /j/, /w/; Unit 6 /fl/, /fr/.
const AM = ["æ", "ɑː", "e", "aʊ", "əʊ", "eə", "h", "r", "m", "l", "j", "w", "fl", "fr"];
const IPA = { hair: "heə", hour: "aʊə", home: "həʊm", how: "haʊ", bread: "bred", black: "blæk", cat: "kæt", hand: "hænd",
  glass: "ɡlɑːs", gas: "ɡæs", guess: "ɡes", gun: "ɡʌn", honest: "ɒnɪst", hobby: "hɒbi", history: "hɪstri", holiday: "hɒlədeɪ",
  cloud: "klaʊd", coast: "kəʊst", clear: "klɪə", cold: "kəʊld", university: "juːnɪvɜːsəti", umbrella: "ʌmbrelə", uncle: "ʌŋkl", under: "ʌndə" };
const NGUYEN_AM = /[æɑɒɔəɜeɪiʊuʌaː]+/g;
let n = 0;
kho.filter((q) => q.topic === "Pronunciation").forEach((q) => {
  q.o.forEach((o) => assert.ok(IPA[o], "chưa có phiên âm của “" + o + "”: " + ten.get(q)));
  const ph = q.o.map((o) => IPA[o]);
  let dung, am;
  if (/has the sound \/([^/]+)\//.test(q.q)) { am = /\/([^/]+)\//.exec(q.q)[1]; dung = q.o.filter((o, i) => ph[i].includes(am)); }
  else if (/begins with the sound \/([^/]+)\//.test(q.q)) { am = /\/([^/]+)\//.exec(q.q)[1]; dung = q.o.filter((o, i) => ph[i].startsWith(am)); }
  else if (/letter h NOT pronounced/.test(q.q)) { am = "h"; dung = q.o.filter((o, i) => o[0] === "h" && !ph[i].startsWith("h")); }
  else if (/different vowel sound/.test(q.q)) {
    const v = ph.map((x) => x.match(NGUYEN_AM).join("")); am = [...new Set(v)];
    assert.ok(q.o.every((o, i) => ph[i].match(NGUYEN_AM).length === 1), "từ một âm tiết: " + ten.get(q));
    dung = q.o.filter((o, i) => v.filter((x) => x === v[i]).length === 1);
    am.forEach((a) => assert.ok(AM.includes(a), `âm /${a}/ không có trong Book map: ` + ten.get(q)));
    am = am[0];
  } else assert.fail("câu Pronunciation chưa có cách tính: " + ten.get(q));
  assert.ok(AM.includes(am), `âm /${am}/ không có trong Book map Unit 1–6: ` + ten.get(q));
  assert.deepEqual(dung, [q.o[0]], "đáp án tính lại khác: " + ten.get(q) + " → " + dung.join(", "));
  assert.ok(q.x.replace(/[ˈˌ]/g, "").includes("/" + IPA[q.o[0]] + "/"), "lời giải ghi phiên âm của đáp án: " + ten.get(q));
  n++;
});

/* ---------- ngữ pháp: tính lại đáp án ---------- */
const coCum = (s, c) => (" " + s.toLowerCase().replace(/[^a-z' ]+/g, " ").replace(/\s+/g, " ") + " ").includes(" " + c.toLowerCase() + " ");
const dien = (q, o) => q.q.replace("___", o);
// so sánh kép: The + so sánh + …, the + so sánh + … (Unit 2)
const SS = { busy: "busier", careful: "more careful", fast: "faster", dangerous: "more dangerous", long: "longer", angry: "angrier", cheap: "cheaper", tall: "taller", dark: "darker", dirty: "dirtier" };
const SS_DUNG = new Set(Object.values(SS));
const soSanh = (w, i) => (w[i] === "more" && !["people", "cars"].includes(w[i + 1]) ? "more " + w[i + 1] : w[i]);
const soSanhKep = (s) => {
  const [a, b] = s.split(", ");
  if (!b) return false;
  const x = a.split(" "), y = b.split(" ");
  return x[0] === "The" && y[0] === "the" && [soSanh(x, 1), soSanh(y, 1)].every((c) => SS_DUNG.has(c) || c === "more");
};
// quá khứ tiếp diễn (Unit 4): was / were theo chủ ngữ + V-ing
const BE = { i: "was", "my grandpa": "was", "my sister": "was", "my brother": "was", it: "was", we: "were", "the children": "were" };
const ING = { tell: "telling", play: "playing", take: "taking", watch: "watching", cook: "cooking", wait: "waiting" };
const qktd = (sub, vp) => { const m = /^(was|were) (\w+)$/.exec(vp); return !!m && m[1] === BE[sub.toLowerCase()] && Object.values(ING).includes(m[2]); };
// hiện tại hoàn thành (Unit 5)
const PP = { visit: "visited", ride: "ridden", see: "seen", travel: "travelled", try: "tried", climb: "climbed" };
// động từ + V-ing, động từ + to-infinitive (Unit 6)
const V_ING = ["enjoy", "suggest", "avoid", "finish", "fancy", "mind"], V_TO = ["hope", "decide", "agree", "want", "promise", "plan", "learn"];
const dangSau = (s) => {
  const loi = [];
  s.toLowerCase().replace(/\b(\w+?)(?:s|es|d|ed)?\s+(?=(\w+))/g, (m, v, next) => { // nhìn trước chữ sau: không nuốt động từ đứng sau chủ ngữ
    const goc = [v, v + "e", v.replace(/i$/, "y")].find((g) => V_ING.includes(g) || V_TO.includes(g));
    if (goc && V_ING.includes(goc) && !/ing$/.test(next)) loi.push(m + next);
    if (goc && V_TO.includes(goc) && next !== "to") loi.push(m + next);
    return m;
  });
  return loi;
};
// cụm động từ của Unit 1, 2 (Getting Started, A Closer Look 2, Review 1 của sách)
const PV = { 1: ["go out", "pass down", "cut down on", "run out of", "come back", "hand down", "find out", "take care of", "get on with", "look around", "look after"],
  2: ["get around", "carry out", "come down with", "hang out with", "cut down on", "throw away"] };
const KHUYET = { should: "lời khuyên", "shouldn't": "khuyên không nên", can: "cho phép", "can't": "không thể", must: "bắt buộc", "mustn't": "cấm",
  might: "có thể xảy ra", "might not": "có thể không xảy ra" };
// tín hiệu nghĩa: cụm động từ (Unit 2), từ để hỏi (Unit 1)
const NGHIA_PV = { "come down with": /\b(fever|cold|flu)\b/, "get around": /\b(buses|metro)\b/, "carry out": /\b(survey|project|experiment)\b/,
  "hang out with": /\bfriends\b/, "cut down on": /\b(sugar|sweets|fast food)\b/, "throw away": /\b(rubbish|bin)\b/ };
const TU_HOI = { what: /: a \w+ or a \w+\.$/, how: /\bshow me ___ to use\b/, where: /\bleft them (by|in|on) the \w+/, when: /\b(o'clock|tomorrow|date)\b/, who: /\b(ask|invite)\b/ };
const QUA_KHU = { come: "came", get: "got", hang: "hung", run: "ran", go: "went", take: "took", find: "found" };
const cumDT = (s, u) => PV[u].filter((pv) => {
  const [v, ...r] = pv.split(" "), dang = [v, v + "s", v + "es", QUA_KHU[v] || v.replace(/y$/, "i") + "ed", v.replace(/e$/, "") + "ing"];
  return dang.some((d) => coCum(s, [d].concat(r).join(" ")));
});
const CHECKS = [
  // Unit 1
  { has: "looks after my little cousin", right: (q) => { q.o.forEach((o) => assert.equal(cumDT(o, 1).length, 1, "mỗi lựa chọn một cụm động từ của Unit 1: " + o)); assert.deepEqual(cumDT(q.q, 1), ["look after"]); return q.o.find((o) => cumDT(o, 1)[0] === "take care of"); } },
  { has: "ran out from milk", right: (q) => { assert.ok(PV[1].includes("run out of") && /ran out of milk/.test(q.x)); return q.o.find((o) => /^ran out \w+$/.test(o) && !cumDT(o, 1).length); } },
  // từ để hỏi + to-infinitive: tín hiệu trong câu cho biết hỏi về vật, cách làm hay nơi chốn; đúng một lựa chọn hợp tín hiệu
  ...["decide ___ to buy", "show me ___ to use", "told us ___ to put our bags"].map((has) => ({ has, right: (q) => {
    assert.ok(q.q.includes("___ to ") && q.o.every((o) => TU_HOI[o]), "từ để hỏi + to-infinitive");
    const d = q.o.filter((o) => TU_HOI[o].test(q.q)); assert.equal(d.length, 1, "đúng một từ để hỏi hợp tín hiệu"); return d[0];
  } })),
  // Unit 2
  // cụm động từ của Unit 2: mỗi lựa chọn một cụm, đúng một cụm có tín hiệu nghĩa trong đề bài
  ...["After playing football in the rain", "it is easy to ___ in this city", "going to ___ a survey"].map((has) => ({ has, right: (q) => {
    const d = q.o.filter((o) => { const pv = cumDT(o, 2); assert.equal(pv.length, 1, "mỗi lựa chọn một cụm động từ của Unit 2: " + o); return NGHIA_PV[pv[0]].test(q.q); });
    assert.equal(d.length, 1, "đúng một cụm động từ hợp nghĩa"); return d[0];
  } })),
  { has: "The more tall the buildings are", right: (q) => { const c = /“([^”]+)”/.exec(q.q)[1]; assert.ok(!soSanhKep(c) && soSanhKep(c.replace("The more tall", "The " + SS.tall)) && q.x.includes(c.replace("The more tall", "The " + SS.tall))); return q.o.find((o) => o.startsWith("The ") && !SS_DUNG.has(soSanh(o.split(" "), 1))); } },
  { has: "As our town gets busier", right: (q) => { const d = q.o.filter(soSanhKep); assert.equal(d.length, 1, "đúng một câu so sánh kép đúng"); return d[0]; } },
  { has: "Is each sentence grammatically correct?", right: (q) => q.o.map(soSanhKep) },
  // Unit 3
  { has: "can't concentrate on his homework", right: (q) => { const d = q.o.filter((o) => /^If you (?!will )\w+ (?!.*\bturned\b).*, you will \w+/.test(o) && !/^If you \w+ed\b/.test(o)); assert.equal(d.length, 2, "hai câu đúng ngữ pháp (khác nghĩa)"); return d.find((o) => /better/.test(o)); } },
  { has: "If Nam ___ (practise)", right: () => "practises" },
  // động từ khuyết thiếu trong câu điều kiện loại 1: tín hiệu trong đề bài cho biết chức năng, đúng một lựa chọn có chức năng đó
  ...[["If you want to stay healthy", /^If you want to/, "lời khuyên"], ["I'll let you", /I'll let you\.$/, "cho phép"], ["If Hoa doesn't sleep enough", /^If \w+ doesn't/, "có thể xảy ra"]].map(([has, tinHieu, cn]) => ({ has, right: (q) => {
    assert.ok(tinHieu.test(q.q), "tín hiệu của chức năng " + cn);
    q.o.forEach((o) => assert.ok(KHUYET[o], "lựa chọn không phải động từ khuyết thiếu: " + o));
    const d = q.o.filter((o) => KHUYET[o] === cn); assert.equal(d.length, 1); return d[0];
  } })),
  { has: "If he will join", right: (q) => { assert.ok(q.x.includes("If he joins")); return q.o.find((o) => /^will \w+$/.test(o) && q.q.includes("If he " + o)); } },
  // Unit 4
  ...[["At 8 p.m. yesterday, my grandpa", "my grandpa"], ["At 9 a.m. last Sunday, the children", "the children"], ["At this time last Sunday, we", "we"]].map(([has, sub]) => ({ has, right: (q) => { const d = q.o.filter((o) => qktd(sub, o)); assert.equal(d.length, 1); return d[0]; } })),
  { has: "my brother was watch a film", right: (q) => { assert.ok(q.x.includes("was " + ING.watch)); return q.o.find((o) => /^(was|were) \w+$/.test(o) && !qktd("my brother", o)); } },
  { has: "I wish I ___ more free time", right: (q) => { assert.ok(/don't have/.test(q.q)); return "had"; } },
  { has: "She wishes she ___ swim", right: (q) => { assert.ok(/can't swim/.test(q.q)); return "could"; } },
  { has: "I wish I lived near the sea", right: (q) => q.o.find((o) => /^I don't live near the sea/.test(o)) },
  ...[["My sister", "was cooking", "My sister"], ["While I", "was waiting", "I"]].map(([dau, vp, sub]) => ({ has: "", order: dau, right: (q) => { assert.ok(qktd(sub, vp) && q.o.includes(vp), "quá khứ tiếp diễn: " + vp); return null; } })),
  // Unit 5
  { has: "this history museum three times", right: (q) => { const base = q.o.find((o) => PP[o]); return "have " + PP[base]; } },
  { has: "Have you ever ___ a camel", right: (q) => PP[q.o.find((o) => PP[o])] },
  { has: "She has never ___ snow", right: (q) => PP[q.o.find((o) => PP[o])] },
  { has: "(never / travel)", right: () => "have never " + PP.travel },
  { has: "has never climb a mountain", right: (q) => { assert.ok(q.x.includes(PP.climb)); return q.o.find((o) => PP[o] && PP[o] !== o); } },
  { has: "This is the first time I have tried snorkelling", right: (q) => q.o.find((o) => o.includes("have never " + PP.try)) },
  { has: "has lived in Ha Noi ___ 2020", right: (q) => (/___ \d{4}\b/.test(q.q) ? "since" : "for") },
  { has: "have been friends ___ five years", right: (q) => (/___ (one|two|three|four|five|six|\d+) (years|months|weeks|days)\b/.test(q.q) ? "for" : "since") },
  { has: "science project ___?", right: () => "yet" },
  // Unit 6
  { has: "My grandparents enjoy ___", right: (q) => { const d = q.o.filter((o) => !dangSau(dien(q, o)).length); assert.equal(d.length, 1); return d[0]; } },
  { has: "We hope ___ the craft village", right: (q) => { const d = q.o.filter((o) => !dangSau(dien(q, o)).length); assert.equal(d.length, 1); return d[0]; } },
  { has: "My mum avoids ___ (eat)", right: (q) => { assert.deepEqual(dangSau(dien(q, q.ans[0]).replace(/ \(eat\)/, "")), []); return "eating"; } },
  { has: "Which sentence is correct?", right: (q) => { const d = q.o.filter((o) => !dangSau(o).length); assert.equal(d.length, 1); return d[0]; } },
  ...[["My grandma", "suggest"], ["Our class", "agree"]].map(([dau, v]) => ({ has: "", order: dau, right: (q) => { const c = q.o.join(" "); assert.ok(coCum(c, v + "ed") || coCum(c, v + "d")); assert.deepEqual(dangSau(c), [], "dạng động từ sau " + v); return null; } })),
  { has: "", order: "My grandfather", right: (q) => { assert.deepEqual(cumDT(q.o.join(" "), 1), ["pass down"], "cụm động từ của Unit 1"); return null; } }
];
const daTinh = new Set();
CHECKS.forEach((c) => {
  const q = c.order ? (() => { const m = kho.filter((x) => x.type === "order" && x.o[0] === c.order); assert.equal(m.length, 1, "câu sắp xếp mở đầu “" + c.order + "”"); return m[0]; })() : cauCua(c.has);
  const want = c.right(q), at = ten.get(q) + " (" + (c.has || c.order) + ")";
  daTinh.add(q); n++;
  if (want === null) return;
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
});
// câu nào cũng đã tính lại, trừ câu từ vựng (kiểm tra theo từ của sách ở dưới), câu Reading
const TU = { 1: ["firefighter", "artisan", "delivery person"], 2: ["underground", "polluted", "liveable"], 3: ["deadline", "counsellor", "fattening"],
  4: ["preserve", "barefoot", "monument"], 5: ["thrilling", "embarrass", "by rote"], 6: ["memorise", "pursue", "privacy"] };
const tuVung = kho.filter((q) => unitOf(q) && !daTinh.has(q));
tuVung.forEach((q) => {
  assert.ok(q.type === "mc" && q.lv === 1, "câu chưa tính lại đáp án (chỉ câu từ vựng mức Biết được bỏ qua): " + ten.get(q));
  assert.equal(TU[unitOf(q)].filter((t) => q.o[0].toLowerCase().startsWith(t)).length, 1, "đáp án câu từ vựng là từ của Unit trong TU: " + ten.get(q));
});
Object.entries(TU).forEach(([u, ws]) => ws.forEach((t) => assert.equal(tuVung.filter((q) => unitOf(q) === +u && q.o[0].toLowerCase().startsWith(t)).length, 1, `từ “${t}” của Unit ${u}: đúng một câu`)));
assert.ok(kho.filter((q) => q.topic === "Pronunciation" || q.topic === "Reading" || daTinh.has(q) || tuVung.includes(q)).length === kho.length);

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
   Rút cùng lúc: khác chủ đề, cùng chủ đề khác mức, hoặc cùng ô mà ô rút từ 2 câu (Rút ra N25); câu của hai đoạn đọc khác nhau không
   bao giờ rút cùng lúc (rút trọn một đoạn). Chữ cần dò của đáp án (lựa chọn đúng, đáp án điền), so cả từ, bỏ đuôi -s, -ed, -ing (artisan /
   artisans, memorise / memorising): đáp án một từ thì từ đó, từ ngữ pháp có ở mọi câu (NGU_PHAP: yet, had, what…) chỉ dò ở câu cùng chủ đề; đáp án 2–3 từ
   thì cả cụm (came down with, by rote, was telling); đáp án là câu thì các chuỗi 3 từ liền nhau không có ở lựa chọn sai nào (phần
   làm câu đó đúng). Đáp án câu Reading chỉ dò ở câu cùng đoạn. Chữ của câu kia: đề bài, đáp án, lời giải, ý của câu đúng/sai, mảnh
   của câu sắp xếp, đoạn đọc (lựa chọn sai của câu trắc nghiệm không tính, Rút ra N25). Đáp án không lặp từ (trừ từ ngữ pháp) của
   chính đề bài câu điền khuyết (Rút ra N12). */
const NGU_PHAP = new Set(("a an the of to in on at for from with by about and or but so than as if when while because before after " +
  "is are was were be been am have has had do does did will would can could should must might may not no i you he she it we they me " +
  "him her us them my your his its our their this that these those there here what where who how which why yet since ago already " +
  "ever never just very too more most all some any one every each other also up out down off around away into over").split(" "));
const tu = (s) => String(s).toLowerCase().replace(/[^a-z' ]+/g, " ").split(/\s+/).filter(Boolean).map((w) => w.replace(/'s$/, ""));
// gốc của từ: bỏ đuôi -s, -es, -ed, -ing, -e khi còn ít nhất 4 chữ (memorise / memorising, artisan / artisans, preserve / preserved)
const goc1 = (w) => { w = w.replace(/ies$/, "y"); const d = ["ing", "ed", "es", "s", "e"].find((x) => w.endsWith(x) && w.length - x.length >= 4 && !/ss$/.test(w)); return d ? w.slice(0, -d.length) : w; };
const noi = (s) => " " + tu(s).map(goc1).join(" ") + " ";
const chuCua = (q, coDoan) => [q.q, q.x].concat(q.type === "mc" ? [q.o[0]] : q.o || [], q.ans || [], coDoan && q.p ? [PSG[q.p].text] : []);
const cungLuc = (a, b) => a !== b && !(a.p && b.p && a.p !== b.p) && (a.topic !== b.topic || a.lv !== b.lv || M[a.topic][a.lv - 1] >= 2);
const doLo = (qs, tenCau) => {
  const ra = [];
  qs.forEach((q) => {
    if (q.type !== "mc" && q.type !== "fill") return;
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
  const a = cauCua("its trains run in tunnels"), b = cauCua("When is the main street closed");
  const gia = Object.assign({}, b, { x: b.x + " Cars can use the new underground car park." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => /: underground$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
  const c = cauCua("I wish I ___ more free time"), e = cauCua("Mai can't swim");
  const gia2 = Object.assign({}, e, { topic: c.topic, lv: 3, x: e.x + " She had no time." });
  assert.ok(doLo([c, gia2], (q) => q.topic).some((s) => /: had$/.test(s)), "bộ dò phải bắt được đáp án ngữ pháp ở câu cùng Unit");
  const f = cauCua("Nam tried to ___ all the new words"), g = cauCua("Learning a lesson ___ means");
  const gia3 = Object.assign({}, g, { x: "Learning by rote means memorising words without understanding them." });
  assert.ok(doLo([f, gia3], (q) => q.topic).some((s) => /: memoris$/.test(s)), "bộ dò phải bắt được dạng khác của đáp án (memorise / memorising)");
}

/* ---------- từ của sách, không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
// lời dặn chuẩn của đề Tiếng Anh (mục 3.2 của docs/KE-HOACH-NOI-DUNG.md) giống lời dặn của sách: không so
const LOI_DAN = ["Write the correct form of the verb in brackets.", "Put the words in the correct order.", "Read the text. Then answer the questions.",
  "Read the text again. Is each sentence true or false?", "Which part of the sentence is wrong?", "Choose the sentence closest in meaning:", "Is each sentence grammatically correct?"];
const boLoiDan = (s) => LOI_DAN.reduce((a, l) => a.split(l).join(" "), String(s));
const truong = (q) => [boLoiDan(q.q), q.x].concat(q.o || [], q.ans || [], q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].text] : []);
if (SACH.length) {
  const f9 = SACH.find((f) => /lop-9[\\/]tieng-anh-9[\\/]/.test(f));
  assert.ok(f9, "OnUp-Book có Tiếng Anh 9");
  // trang của từng Unit: từ trang bắt đầu (Contents) đến trước Unit sau, cộng mục Unit đó của Glossary
  const raw = fs.readFileSync(f9, "utf8"), parts = raw.split(/=== page-\d+ · ([^=]+) ===/), trang = {};
  for (let i = 1; i < parts.length; i += 2) { const m = /trang in (\d+)/.exec(parts[i]); if (m) trang[+m[1]] = (trang[+m[1]] || "") + parts[i + 1]; }
  const BAT_DAU = [8, 18, 28, 40, 50, 60, 72], gl = raw.slice(raw.indexOf("GLOSSARY")), mucGl = gl.split(/\n(?=Unit \d+ *\n)/);
  const chuUnit = (u) => { let s = ""; for (let t = BAT_DAU[u - 1]; t < BAT_DAU[u]; t++) s += " " + (trang[t] || ""); return (s + " " + (mucGl.find((m) => new RegExp("^Unit " + u + " *\\n").test(m)) || "")).toLowerCase().replace(/\s+/g, " "); };
  Object.entries(TU).forEach(([u, ws]) => { const c = chuUnit(+u); ws.forEach((t) => assert.ok(c.includes(t), `từ “${t}” không có trong trang của Unit ${u}`)); });
  Object.entries(PV).forEach(([u, ws]) => { const c = chuUnit(+u) + " " + chuUnit(3); ws.forEach((t) => assert.ok(c.includes(t), `cụm động từ “${t}” không có trong trang của Unit ${u} (hay Review 1)`)); });
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book); từ của đáp án câu từ vựng, cụm động từ có trong trang của Unit.");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && !/^ta9-ck1-/.test(b.id)).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + [q.q, q.x].concat(q.o || [], q.ans || [], q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn đọc, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề.");
console.log("TA9 OK");
