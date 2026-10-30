// Kiểm tra ngân hàng Ngữ văn 9 cuối kì I của Phiên N9-ck1-van (data/banks/9-van.js, van9-ck1-*), theo mẫu tests/tincn4-ck2.js.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho
// lớp 9 (đoạn “Chung của các phiên lớp 9” của docs/KE-HOACH-NOI-DUNG.md).
// Đọc lại luật thơ bằng code: số tiếng mỗi dòng (song thất lục bát 7-7-6-8, lục bát 6-8, thất ngôn 7), thanh bằng – trắc và vần của
// hai bài song thất lục bát người soạn viết (luật ở Tri thức ngữ văn Bài 2, tr. 40: thất 1 tiếng 5 B, tiếng 7 T; thất 2 tiếng 3 B,
// tiếng 5 T, tiếng 7 B; lục tiếng 2 B, 4 T, 6 B; bát tiếng 2 B, 4 T, 6 B, 8 B; vần lưng ở tiếng 5 của thất 2, tiếng 6 của bát; vần
// chân), rồi tính lại đáp án các câu hỏi về luật thơ, thanh, vần (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho).
// Rồi kiểm tra ma trận, đoạn đọc (mỗi chủ đề đọc hiểu một đoạn mỗi đề, đoạn 3 câu mức 1-2-3), câu Viết (chỉ tự luận, 4–6 ý chấm),
// dạng câu (đúng/sai 4 ý không lặp kiểu Đ/S, có câu trả lời ngắn), đáp án đúng không dài hơn hẳn lựa chọn sai, đề bài không trùng,
// rút thử nhiều lần (đúng ma trận, trọn đoạn, gặp đủ kho; đã làm hết một đề cố định thì không rút lại câu của đề đó) và dò lộ đáp án
// giữa các câu rút được cùng lúc (Rút ra N19: chuỗi 3 từ liền nhau của đáp án; đáp án ngắn thì cả đáp án) ở đề bài, lựa chọn, lời
// giải, đáp án, đoạn đọc của câu kia; DO_LO=1 in ra để xem tay, danh sách đã xem ở DA_XEM.
// Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ (cả đoạn đọc, thang chấm) với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp
// nguyên âm: không có chuỗi 8 từ liền nhau trùng sách (câu thơ của tác phẩm cổ trích nguyên văn ở TRICH không tính); DO_SACH=1 in cả
// chuỗi 6 từ. So thêm với mọi câu của các kho khác: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/van9-ck1.js → in VAN9 OK.
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
const S = { de1: "van9-ck1-de1", de2: "van9-ck1-de2", pool: "van9-ck1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- tiếng, thanh, vần ---------- */
const TRAC = /[̣́̉̃]/; // sắc, hỏi, ngã, nặng
const tieng = (s) => String(s).normalize("NFC").replace(/[«»“”"(),.;:!?…–—]/g, " ").split(/\s+/).filter(Boolean);
const thanh = (t) => (TRAC.test(t.normalize("NFD")) ? "T" : "B");
// vần: bỏ dấu thanh (giữ mũ, trăng, móc), bỏ phụ âm đầu; “gi”, “qu” tính là phụ âm đầu (“gió” → “o”, “quà” → “a”)
const van = (t) => t.normalize("NFD").replace(/[̣̀́̉̃]/g, "").normalize("NFC").toLowerCase()
  .replace(/^(ngh|ng|gh|gi|kh|ph|th|tr|ch|nh|qu|b|c|d|đ|g|h|k|l|m|n|p|r|s|t|v|x)(?=[aăâeêioôơuưy])/, "");
const dongTho = (p) => p.text.split("\n").filter((l) => l.trim() && !/^\(/.test(l.trim())); // dòng thơ: bỏ dòng chú thích, dòng (1)…
const soTieng = (lines) => lines.map((l) => tieng(l).length);
const LUAT = [{ B: [5], T: [7] }, { B: [3, 7], T: [5] }, { B: [2, 6], T: [4] }, { B: [2, 6, 8], T: [4] }];
const kiemSTLB = (lines, at) => {
  assert.equal(lines.length % 4, 0, at + ": số dòng song thất lục bát chia hết cho 4");
  lines.forEach((l, i) => {
    const w = tieng(l), k = i % 4, L = LUAT[k];
    assert.equal(w.length, [7, 7, 6, 8][k], `${at}, dòng ${i + 1}: số tiếng`);
    L.B.forEach((x) => assert.equal(thanh(w[x - 1]), "B", `${at}, dòng ${i + 1}: tiếng ${x} («${w[x - 1]}») phải thanh bằng`));
    L.T.forEach((x) => assert.equal(thanh(w[x - 1]), "T", `${at}, dòng ${i + 1}: tiếng ${x} («${w[x - 1]}») phải thanh trắc`));
  });
  const w = lines.map(tieng), cung = (a, b, s) => assert.equal(van(a), van(b), `${at}: ${s} («${a}» – «${b}»)`);
  for (let g = 0; g < w.length; g += 4) {
    cung(w[g][6], w[g + 1][4], "vần lưng thất 1 – thất 2");
    cung(w[g + 1][6], w[g + 2][5], "vần chân thất 2 – lục");
    cung(w[g + 2][5], w[g + 3][5], "vần lưng lục – bát");
    if (g) cung(w[g - 1][7], w[g][4], "vần bát – thất 1 của khổ sau");
  }
};

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => { assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 9); assert.equal(b.subject, "Ngữ văn"); assert.equal(b.file, "9-van.js"); });
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
assert.ok(rieng.length >= d1.n / 2, "đề ngẫu nhiên có câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("van9-ck1-", "") + "#" + (i + 1))));

/* ---------- thơ: số tiếng, luật song thất lục bát ---------- */
const THO = { // mã đoạn: kiểu thơ
  "chinh-phu": "stlb-so-tieng", "nho-ba": "stlb", "chia-tay": "stlb", // song thất lục bát (đoạn «Chinh phụ ngâm» chỉ đếm tiếng: vần xưa không chỉnh)
  "chi-em-kieu": "luc-bat", "ma-giam-sinh": "luc-bat", "canh-ngay-xuan": "luc-bat", "trau-oi": "luc-bat", // lục bát
  "banh-troi": "that-ngon", "ban-den-choi": "that-ngon" // thất ngôn
};
Object.entries(THO).forEach(([id, kieu]) => {
  const ps = PSG[id]; assert.ok(ps, "không có đoạn " + id);
  const lines = dongTho(ps); // bỏ dòng chú thích, câu dẫn trong ngoặc, đoạn văn đánh số (1), (2)…: còn lại các dòng thơ
  const n = soTieng(lines);
  if (kieu === "stlb") kiemSTLB(lines, id);
  else if (kieu === "stlb-so-tieng") assert.deepEqual(n, n.map((_, i) => [7, 7, 6, 8][i % 4]), id + ": 7-7-6-8");
  else if (kieu === "luc-bat") assert.deepEqual(n, n.map((_, i) => [6, 8][i % 2]), id + ": lục bát 6-8");
  else assert.ok((n.length === 4 || n.length === 8) && n.every((x) => x === 7), id + ": bài thất ngôn bốn hoặc tám câu, mỗi câu bảy tiếng");
});

/* ---------- đáp án tính lại bằng code ---------- */
const dongCua = (id) => dongTho(PSG[id]).map(tieng);
const CHECKS = [
  { id: S.de2, has: "tiếng ___ hiệp vần lưng", right: () => { const w = dongCua("nho-ba"); assert.equal(van(w[3][5]), van(w[2][5])); return w[3][5]; } },
  { id: S.pool, has: "Đoạn thơ viết theo thể song thất lục bát. Mỗi nhận xét", right: (q) => {
    const w = dongCua("chia-tay");
    const y = [[/khó.*thanh bằng/, () => thanh(w[4][6]) === "B" && w[4][6] === "khó"], [/«nắm».*«thắm»/, () => w[1][4] === "nắm" && w[0][6] === "thắm" && van(w[1][4]) === van(w[0][6])],
      [/«câu».*«đâu»/, () => w[3][5] === "câu" && w[2][5] === "đâu" && van(w[3][5]) === van(w[2][5])], [/chia nhỏ phần quà/, () => true]];
    return q.o.map((o) => { const f = y.find(([re]) => re.test(o)); assert.ok(f, "ý chưa có cách tính: " + o); return f[1](); });
  } },
  { id: S.de1, has: "Xét đoạn thơ trên, mỗi nhận xét", right: (q) => q.o.map((o, i) => (/cặp câu bảy chữ/.test(o) ? soTieng(dongTho(PSG["chinh-phu"])).join() === "7,7,6,8,7,7,6,8,7,7,6,8" : q.a[i])) },
  { id: S.de1, has: "Sóng vỗ, đá đổ", right: (q) => { const w = tieng(/«([^»]+)»/.exec(q.q)[1]); assert.ok(/tám tiếng/.test(q.q) && w.length === 8 && w.every((t) => thanh(t) === "T"), "tám tiếng đều thanh trắc"); return q.o[0]; } },
  { id: S.de2, has: "Chiều thu mưa rơi", right: (q) => { const w = tieng(/«([^»]+)»/.exec(q.q)[1]); assert.ok(/bảy tiếng/.test(q.q) && w.length === 7 && w.every((t) => thanh(t) === "B"), "bảy tiếng đều thanh bằng"); return q.o[0]; } },
  { id: S.pool, has: "Rì rào, xì xào", right: (q) => { const w = tieng(/«([^»]+)»/.exec(q.q)[1]), ao = ["rào", "xào", "lao", "xao"]; assert.ok(/vần «ao»/.test(q.q) && ao.every((t) => w.includes(t) && van(t) === "ao") && ao.every((t) => q.x.includes("«" + t + "»")), "các tiếng lời giải nêu đều có trong câu, cùng vần ao"); return q.o[0]; } },
  { id: S.pool, has: "Văn chiêu hồn» của Nguyễn Du", right: (q) => { const l = /«(Tiết[^»]+)»/.exec(q.q)[1].split(" / "); assert.deepEqual(soTieng(l), [7, 7, 6, 8], "khổ thơ 7-7-6-8"); return null; } }
];
let n = 0;
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has, want = c.right(q);
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  if (want === null) { n++; return; }
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  if (Array.isArray(want)) assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  else assert.equal(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  n++;
});

/* ---------- ma trận, đoạn đọc, câu Viết ---------- */
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
assert.equal(TOPICS[TOPICS.length - 1], "Viết", "chủ đề Viết đứng cuối ma trận");
[d1.questions, d2.questions].forEach((d, i) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, `Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = dem(kho, t, l);
  assert.ok(v[l - 1] ? o >= 2 * v[l - 1] : o === 0, `ô (${t}, mức ${l}) rút ${v[l - 1]} câu, kho có ${o}`);
}));
// chủ đề đọc hiểu (có đoạn đọc): mỗi đề cố định và phần câu riêng có đúng một đoạn mỗi chủ đề, mỗi đoạn 3 câu mức 1-2-3 đứng liền nhau
const docHieu = TOPICS.filter((t) => kho.some((q) => q.topic === t && q.p));
assert.equal(docHieu.length, 5, "năm chủ đề đọc hiểu theo Bài 1–5");
docHieu.forEach((t) => {
  assert.ok(kho.filter((q) => q.topic === t).every((q) => q.p), t + ": mọi câu có đoạn đọc");
  assert.deepEqual(M[t], [1, 1, 1], t + ": ma trận [1, 1, 1]");
  [S.de1, S.de2, S.pool].forEach((id) => {
    const qs = kho.filter((q) => q.topic === t && q.src === id), ps = [...new Set(qs.map((q) => q.p))];
    assert.equal(ps.length, 1, `${id}, ${t}: đúng một đoạn`);
    assert.deepEqual(qs.map((q) => q.lv), [1, 2, 3], `${id}, ${t}: đoạn 3 câu mức 1-2-3`);
  });
});
Object.keys(PSG).forEach((id) => assert.equal(kho.filter((q) => q.p === id).length, 3, "đoạn " + id + " có 3 câu"));
assert.ok(kho.filter((q) => !q.p).every((q) => !docHieu.includes(q.topic)), "câu không có đoạn đọc chỉ ở Tiếng Việt, Viết");
const viet = kho.filter((q) => q.topic === "Viết");
assert.ok(viet.every((q) => q.type === "essay") && kho.filter((q) => q.type === "essay").every((q) => q.topic === "Viết"), "chủ đề Viết chỉ gồm câu tự luận, tự luận chỉ ở Viết");
viet.forEach((q) => {
  assert.ok(q.rubric.length >= 4 && q.rubric.length <= 6, "câu Viết có 4–6 ý chấm: " + q.q.slice(0, 50));
  assert.equal(sum(q.rubric.map((r) => r.p)), sum(viet[0].rubric.map((r) => r.p)), "các câu Viết cùng tổng điểm");
  assert.ok(/^Dàn ý gợi ý:/.test(q.x) && q.x.length > 400, "câu Viết có dàn ý gợi ý: " + q.q.slice(0, 50));
});
// năm kiểu bài Viết của tập một đều có: vấn đề cần giải quyết (con người – tự nhiên, đời sống học sinh), phân tích thơ song thất lục bát, truyện, kịch
[/vấn đề cần giải quyết: tình trạng/, /vấn đề của học sinh hiện nay cần tìm cách giải quyết/, /song thất lục bát/, /phân tích truyện/, /phân tích đoạn trích .* đã học ở Bài 5/].forEach((re) => assert.equal(viet.filter((q) => re.test(q.q)).length, 1, "kiểu bài Viết: " + re));

/* ---------- dạng câu ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 4, "mỗi kho ít nhất 4 câu đúng/sai 4 ý");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
assert.ok(kho.some((q) => q.type === "fill"), "có câu trả lời ngắn (điền)");
assert.ok(kho.every((q) => ["mc", "tf4", "fill", "essay"].includes(q.type)), "chỉ dùng dạng câu của khung Công văn 7991 và tự luận");
// lời giải không nói “ý thứ hai”, “phương án A”: app xáo ý, phương án
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của ý: " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2; ngưỡng như tests/tincn4-ck2.js); các lựa chọn không trùng nhau
kho.filter((q) => q.type === "mc").forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + ten.get(q));
});

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8) ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "9-van.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- rút thử ---------- */
const seen = new Set();
for (let k = 0; k < 400; k++) {
  const d = Quiz.draw(p);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, p.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  docHieu.forEach((t) => assert.equal(new Set(d.questions.filter((q) => q.topic === t).map((q) => q.p)).size, 1, t + ": rút trọn một đoạn"));
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
   Rút cùng lúc: khác chủ đề, hoặc cùng đoạn đọc mà khác mức. Đáp án (lựa chọn đúng, đáp án điền) tách thành các chuỗi 3 từ liền nhau
   (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có trong đề bài, lựa chọn, lời giải, đáp án hay đoạn đọc (khác đoạn của câu này)
   của câu kia thì in ra với DO_LO=1 để xem tay; danh sách đã xem ở DA_XEM. */
const tu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const cungLuc = (a, b) => a !== b && (a.topic !== b.topic || (a.p && a.p === b.p && a.lv !== b.lv));
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], (q.rubric || []).map((r) => r.c)).map(String);
const doLo = (qs, tenCau) => {
  const ra = [];
  qs.forEach((q) => {
    const dap = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []; // câu điền: đáp án chính (các đáp án sau là cách viết khác)
    const C = [...new Set(dap.flatMap(cum))];
    if (!C.length) return;
    qs.forEach((p2) => {
      if (!cungLuc(q, p2)) return;
      const T = " " + chu(p2).concat(p2.p && p2.p !== q.p ? [PSG[p2.p].text] : []).map((s) => tu(s).join(" ")).join(" | ") + " ";
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
    });
  });
  return [...new Set(ra)];
};
const lo = doLo(kho, (q) => ten.get(q));
if (process.env.DO_LO) console.log("Đáp án có ở câu rút được cùng lúc (xem tay):\n" + lo.join("\n"));
// đã xem (Phiên N9-ck1-van): chữ chung, không làm lộ đáp án. “của người viết”, “cho thấy người”, “nhân vật qua”, “người phụ nữ”,
// “số phận người”, “ở cõi tiên”, “tên tướng giặc”: cụm từ thường gặp, câu kia không nói tới điều câu này hỏi; “tớ”: «Trước thầy sau
// tớ» (người hầu) trong đoạn trích «Truyện Kiều», không phải từ xưng hô; “hán”: chữ «Hán Việt» của câu, nhãn chủ đề yếu tố Hán Việt,
// không nói gì về chữ Nôm.
const DA_XEM = [
  "de1#21 → ngau-nhien#11: của người viết", "de2#24 → ngau-nhien#11: của người viết", "de1#5 → ngau-nhien#12: cho thấy người",
  "de2#7 → ngau-nhien#21: tớ", "de2#8 → ngau-nhien#21: tớ", "de2#9 → ngau-nhien#21: tớ", "de1#3 → de1#1: tên tướng giặc",
  "ngau-nhien#25 → de1#2: nhân vật qua", "de1#11 → de1#10: người phụ nữ", "de1#12 → de1#10: người phụ nữ", "de2#25 → de1#10: người phụ nữ",
  "de1#10 → de1#11: người phụ nữ", "de1#12 → de1#11: người phụ nữ", "de2#25 → de1#11: số phận người", "de2#25 → de1#11: người phụ nữ",
  "de1#17 → de1#20: hán", "de2#3 → de2#2: ở cõi tiên"
];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = kho.find((q) => q.q.includes("Mị Châu hứa sẽ làm gì")), b = kho.find((q) => q.q.includes("Câu rút gọn có đặc điểm"));
  const gia = Object.assign({}, b, { x: b.x + " Mị Châu hứa rắc lông ngỗng trên đường." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => / rắc lông ngỗng$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// câu thơ trích nguyên văn của tác phẩm cổ (sách cũng dẫn) không tính là chép sách: «Cỏ non xanh tận chân trời…» (Truyện Kiều,
// Nguyễn Du) ở đoạn đọc canh-ngay-xuan và câu 9 của đề ngẫu nhiên, Ngữ văn 10 tập một dẫn làm ví dụ đảo ngữ
const TRICH = ["Cỏ non xanh tận chân trời", "Cành lê trắng điểm một vài bông hoa"];
const khongDau = (s) => TRICH.reduce((x, c) => x.split(c).join(" "), String(s).normalize("NFC")).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const truong = (q) => chu(q).concat(q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].title, PSG[q.p].text] : []);
if (SACH.length) {
  assert.ok(SACH.some((f) => /ngu-van-9-tap-1/.test(f)), "OnUp-Book có Ngữ văn 9 tập một");
  assert.ok(TRICH.every((c) => kho.some((q) => truong(q).some((s) => s.normalize("NFC").includes(c)))), "câu trích ở TRICH phải có trong kho");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · trang in \d+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && !/^van9-ck1-/.test(b.id)).flatMap((b) => b.questions.map((q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn đọc, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề.");
console.log("VAN9 OK");
