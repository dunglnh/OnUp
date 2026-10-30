// Kiểm tra ngân hàng Ngữ văn 9 giữa kì I của Phiên N9-gk1-van (data/banks/9-van.js, van9-gk1-*), theo mẫu tests/van9-ck1.js.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho
// lớp 9 (đoạn “Chung của các phiên lớp 9” của docs/KE-HOACH-NOI-DUNG.md); ba chủ đề đọc hiểu theo tên Bài 1–3, mỗi chủ đề một đoạn
// 4 câu mức 1-2-3-3 mỗi đề (như kho Ngữ văn 6 giữa kì I).
// Đọc lại luật thơ bằng code: số tiếng mỗi dòng (song thất lục bát 7-7-6-8, lục bát 6-8), thanh bằng – trắc và vần của các bài song
// thất lục bát người soạn viết, cả hai bài trong đề câu Viết (luật ở Tri thức ngữ văn Bài 2, như tests/van9-ck1.js), rồi tính lại đáp
// án các câu về luật thơ, thanh, vần, chơi chữ (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho).
// Rồi kiểm tra lời dặn của đề (phạm vi tuần 1 đến tuần 9, đối chiếu đề cương; không có câu về đề chung của Sở), đề gắn vào kì thi
// gk1-l9, ma trận, đoạn đọc, câu Viết (chỉ tự luận, 4–6 ý chấm, cùng tổng điểm; đủ ba kiểu bài Viết của Bài 1–3), dạng câu (đúng/sai
// 4 ý không lặp kiểu Đ/S, có câu trả lời ngắn), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở
// không quá một phần ba số câu nhiều lựa chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề, đề bài không trùng, rút thử nhiều
// lần (đúng ma trận, trọn đoạn, gặp đủ kho; đã làm hết một đề cố định thì không rút lại câu của đề đó) và dò lộ đáp án giữa các câu rút
// được cùng lúc (Rút ra N19: chuỗi 3 từ liền nhau của đáp án; đáp án ngắn thì cả đáp án) ở đề bài, lựa chọn, lời giải, đáp án, thang
// chấm, đoạn đọc của câu kia; DO_LO=1 in ra để xem tay, danh sách đã xem ở DA_XEM.
// Kho cuối kì I (van9-ck1-*) có cùng tám chủ đề (ba bài đọc, năm chủ đề tiếng Việt), nên đề “Ôn chủ đề” (Phiên UX14) rút chung câu của
// hai kho: đáp án không trùng đáp án câu cùng chủ đề của kho đó, dò lộ đáp án giữa mọi cặp câu cùng chủ đề (DA_XEM_CHU_DE), đề bài
// không gần trùng câu của kho đó (cặp hai âm tiết chung, như tests/toan9-gk1.js), đoạn đọc không dùng lại dòng thơ, câu văn của kho đó.
// Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ (cả đoạn đọc, thang chấm) với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp
// nguyên âm: không có chuỗi 8 từ liền nhau trùng sách (câu thơ của tác phẩm cổ trích nguyên văn ở TRICH không tính); DO_SACH=1 in cả
// chuỗi 6 từ. So thêm với mọi câu của các kho khác, cả câu riêng của các đề ngẫu nhiên: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/van9-gk1.js → in VAN9 GK1 OK.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz;
const S = { de1: "van9-gk1-de1", de2: "van9-gk1-de2", pool: "van9-gk1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- tiếng, thanh, vần ---------- */
const TRAC = /[̣́̉̃]/; // sắc, hỏi, ngã, nặng
const tieng = (s) => String(s).normalize("NFC").replace(/[«»“”"(),.;:!?…–—]/g, " ").split(/\s+/).filter(Boolean);
const thanh = (t) => (TRAC.test(t.normalize("NFD")) ? "T" : "B");
// phụ âm đầu; “gi”, “qu” tính là phụ âm đầu (“gió” → “gi”, “quà” → “qu”)
const DAU = /^(ngh|ng|gh|gi|kh|ph|th|tr|ch|nh|qu|b|c|d|đ|g|h|k|l|m|n|p|r|s|t|v|x)(?=[aăâeêioôơuưyáàảãạắằẳẵặấầẩẫậéèẻẽẹếềểễệíìỉĩịóòỏõọốồổỗộớờởỡợúùủũụứừửữựýỳỷỹỵ])/;
const dau = (t) => (DAU.exec(t.normalize("NFC").toLowerCase()) || [""])[0];
// vần: bỏ dấu thanh (giữ mũ, trăng, móc), bỏ phụ âm đầu
const van = (t) => { const x = t.normalize("NFC").toLowerCase(); return x.slice(dau(x).length).normalize("NFD").replace(/[̣̀́̉̃]/g, "").normalize("NFC"); };
const vanThanh = (t) => { const x = t.normalize("NFC").toLowerCase(); return x.slice(dau(x).length); }; // phần vần kèm dấu thanh
const dongTho = (p) => p.text.split("\n").filter((l) => l.trim() && !/^\(/.test(l.trim())); // dòng thơ: bỏ dòng chú thích, câu dẫn trong ngoặc
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
// bộ đọc luật thơ bắt được bài viết sai luật
assert.throws(() => kiemSTLB(["Đêm bão tới, gió gào ngoài cửa,", "Mẹ lặng ngồi đến nửa đêm sâu.", "Thuyền cha giờ ở nơi xa,", "Biển đen sóng dữ bạc đầu mênh mang."], "thử"), /vần chân/);
assert.throws(() => kiemSTLB(["Đêm bão tới, gió gào ngoài cửa,", "Mẹ ngồi đến tận nửa đêm sâu.", "Thuyền cha giờ ở nơi đâu,", "Biển đen sóng dữ bạc đầu mênh mang."], "thử"), /tiếng 3/);

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => { assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 9); assert.equal(b.subject, "Ngữ văn"); assert.equal(b.file, "9-van.js"); });
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
assert.ok(rieng.length >= d1.n * 0.8, "đề ngẫu nhiên có khoảng 25 câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("van9-gk1-", "") + "#" + (i + 1))));
// lời dặn: đề giữa kì I tra được ghi “tuần 1 đến tuần 9”; trường thi đến Bài 2 hoặc Bài 4 thì đối chiếu đề cương; đề giữa kì không có
// câu về đề chung của Sở (chỉ đề cuối kì của lớp 9)
[d1, d2].forEach((b) => assert.ok(/Bài 1–3/.test(b.note) && /tuần 1 đến tuần 9/.test(b.note), b.id + ": lời dặn ghi Bài 1–3, tuần 1 đến tuần 9"));
[d1, d2, p].forEach((b) => {
  assert.ok(/Bài 2 hoặc đến Bài 4/.test(b.note) && /đối chiếu đề cương/.test(b.note), b.id + ": lời dặn nhắc đối chiếu đề cương");
  assert.ok(!/Sở|đề chung/.test(b.note), b.id + ": đề giữa kì không nói về đề chung của Sở");
});
{
  const ev = ctx.window.ONTAP_SEED_EVENTS.find((e) => e.id === "gk1-l9");
  assert.ok(ev && ev.grades.includes(9) && /Ngữ văn: Bài 1–3\./.test(ev.scope), "kì thi gk1-l9 của lớp 9, phạm vi Ngữ văn Bài 1–3");
  [S.de1, S.de2, S.pool].forEach((id) => assert.ok(ev.banks.includes(id), id + " gắn vào gk1-l9"));
}

/* ---------- thơ: số tiếng, luật song thất lục bát ---------- */
const THO = { // mã đoạn: kiểu thơ (đoạn trích truyện thơ Nôm chỉ đếm tiếng: vần xưa có chỗ không chỉnh, như «nhau» – «dâu»)
  "dem-cho-cha": "stlb", "ben-do-xua": "stlb", "tham-thay": "stlb",
  "mo-dau-kieu": "luc-bat", "van-tien-gap-nan": "luc-bat", "mo-dam-tien": "luc-bat"
};
assert.deepEqual(Object.keys(THO).sort(), Object.keys(PSG).filter((id) => dongTho(PSG[id]).every((l) => tieng(l).length <= 8)).sort(), "đoạn thơ nào cũng được đọc lại");
Object.entries(THO).forEach(([id, kieu]) => {
  const lines = dongTho(PSG[id]), n = soTieng(lines);
  if (kieu === "stlb") kiemSTLB(lines, id);
  else assert.deepEqual(n, n.map((_, i) => [6, 8][i % 2]), id + ": lục bát 6-8");
});
// hai bài thơ trong đề câu Viết phân tích thơ song thất lục bát
const vietTho = kho.filter((q) => q.type === "essay" && /phân tích bài thơ song thất lục bát/.test(q.q));
assert.equal(vietTho.length, 2, "hai câu Viết phân tích bài thơ song thất lục bát người soạn viết");
vietTho.forEach((q) => kiemSTLB(/«([^»]+)»/.exec(q.q)[1].split(" / "), "bài thơ của " + ten.get(q)));

/* ---------- đáp án tính lại bằng code ---------- */
const dongCua = (id) => dongTho(PSG[id]).map(tieng);
const trongNgoac = (q, k = 0) => [...q.q.matchAll(/«([^»]+)»/g)].map((m) => m[1])[k];
const demVan = (s, v) => tieng(s).filter((t) => van(t) === v).length;
const CHECKS = [
  { id: S.de1, has: "hiệp vần với tiếng «gọi»", right: () => { const w = dongCua("dem-cho-cha"); assert.equal(w[4][6], "gọi"); assert.equal(van(w[5][4]), van(w[4][6])); return w[5][4]; } },
  { id: S.de2, has: "tiếng thứ năm của câu thất thứ hai mang thanh trắc", right: (q) => {
    const w = dongCua("ben-do-xua");
    assert.ok(thanh(w[1][4]) === "T" && van(w[1][4]) === van(w[0][6]), "tiếng 5 của câu thất thứ hai thanh trắc, hiệp vần với tiếng cuối câu thất thứ nhất");
    assert.ok(q.o.slice(1).every((o) => w[1].includes(o) && w[1].indexOf(o) !== 4), "lựa chọn sai là tiếng khác của câu thơ ấy");
    return w[1][4];
  } },
  { id: S.pool, has: "mỗi nhận xét sau về bài thơ «Thăm thầy»", right: (q) => {
    const w = dongCua("tham-thay"), t = PSG["tham-thay"].text;
    const y = [[/«phủ».*«cũ»/, () => w[1][4] === "phủ" && w[0][6] === "cũ" && van(w[1][4]) === van(w[0][6])],
      [/«chưa».*«thưa»/, () => w[3][5] === "chưa" && w[2][5] === "thưa" && van(w[3][5]) === van(w[2][5])],
      [/trẻ khoẻ như xưa/, () => !/tóc thưa/.test(t) && !/bạc phơ/.test(t)], [/sáu – tám chữ rồi/, () => soTieng(dongTho(PSG["tham-thay"])).slice(0, 2).join() === "6,8"]];
    return q.o.map((o) => { const f = y.find(([re]) => re.test(o)); assert.ok(f, "ý chưa có cách tính: " + o); return f[1](); });
  } },
  { id: S.de1, has: "mỗi nhận xét sau về đoạn mở đầu «Truyện Kiều»", right: (q) => {
    const t = PSG["mo-dau-kieu"].text, n = soTieng(dongTho(PSG["mo-dau-kieu"]));
    const y = [[/Cảo thơm lần giở trước đèn/, () => /Cảo thơm lần giở trước đèn/.test(t) && /cảo thơm: sách hay/.test(t)],
      [/lời đối thoại/, () => /«/.test(dongTho(PSG["mo-dau-kieu"]).join(" "))],
      [/song thất lục bát/, () => n.some((x) => x === 7)], [/con út/, () => /Thuý Kiều/.test(t)]];
    return q.o.map((o) => { const f = y.find(([re]) => re.test(o)); assert.ok(f, "ý chưa có cách tính: " + o); return f[1](); });
  } },
  { id: S.pool, has: "Từ những đặc điểm của truyện thơ Nôm đã học", right: (q) => {
    const t = PSG["mo-dam-tien"].text;
    const y = [[/tả cảnh ngụ tình/, () => /cỏ áy bóng tà/.test(t) && /Gió hiu hiu/.test(t)],
      [/lời đối thoại/, () => ["Vân rằng: «", "Rằng: «", "Quan rằng: «"].every((s) => t.includes(s))],
      [/«Lại càng» lặp ba lần/, () => t.split("Lại càng").length - 1 === 3],
      [/Vương Quan khen chị/, () => !/Quan rằng: «Chị nói hay sao,\nMột lời là một vận vào khó nghe/.test(t)]];
    return q.o.map((o) => { const f = y.find(([re]) => re.test(o)); assert.ok(f, "ý chưa có cách tính: " + o); return f[1](); });
  } },
  { id: S.de1, has: "lặp lại vần nào ở nhiều tiếng nhất", right: (q) => {
    const s = trongNgoac(q), c = q.o.map((v) => demVan(s, v)), m = Math.max(...c);
    assert.equal(c.filter((x) => x === m).length, 1, "đúng một vần lặp nhiều nhất"); return q.o[c.indexOf(m)];
  } },
  { id: S.de1, has: "có sáu tiếng cùng mang vần «iu»", right: (q) => { assert.equal(demVan(trongNgoac(q), "iu"), 6); return null; } },
  { id: S.de2, has: "có năm tiếng cùng mang vần «ơi»", right: (q) => { assert.equal(demVan(trongNgoac(q), "ơi"), 5); return null; } },
  { id: S.pool, has: "lặp lại một vần ở năm tiếng", right: (q) => {
    const w = tieng(trongNgoac(q)), v = [...new Set(w.map(van))].filter((x) => demVan(trongNgoac(q), x) === 5);
    assert.equal(v.length, 1, "đúng một vần lặp ở năm tiếng"); return v[0];
  } },
  { id: S.pool, has: "gieo thanh điệu khác nhau", right: (q) => {
    assert.ok(tieng(trongNgoac(q, 0)).every((t) => thanh(t) === "T") && tieng(trongNgoac(q, 1)).every((t) => thanh(t) === "B"), "câu đầu toàn thanh trắc, câu sau toàn thanh bằng");
    return null;
  } },
  { id: S.de2, has: "có các tiếng đều mang thanh bằng", right: (q) => { const r = q.o.filter((o) => tieng(o).every((t) => thanh(t) === "B")); assert.equal(r.length, 1, "đúng một dòng toàn thanh bằng"); return r[0]; } },
  { id: S.de2, has: "Bà ba béo bán bánh bèo bên bờ biển", right: (q) => {
    const w = tieng(trongNgoac(q));
    assert.ok(w.every((t) => dau(t) === "b") && !w.every((t) => thanh(t) === "B"), "mọi tiếng có phụ âm đầu b, không phải mọi tiếng thanh bằng");
    assert.ok(/phụ âm đầu b/.test(q.o[0]) && w.length === 9 && /^Chín tiếng/.test(q.x), "lời giải đếm đúng số tiếng");
    return q.o[0];
  } },
  { id: S.de1, has: "Da trắng vỗ bì bạch", right: (q) => { assert.ok(!tieng(trongNgoac(q)).every((t) => thanh(t) === "T"), "vế đối không toàn thanh trắc"); return null; } },
  { id: S.de1, has: "Chị Xuân đi chợ mùa hè", right: (q) => {
    const MUA = ["xuân", "hè", "thu", "đông"], w = tieng(trongNgoac(q)).map((t) => t.toLowerCase());
    assert.ok(MUA.every((m) => w.includes(m)), "đủ tên bốn mùa trong bài ca dao");
    const r = q.o.filter((o) => o.split(", ").every((x) => MUA.includes(x.toLowerCase()))); assert.equal(r.length, 1); return r[0];
  } },
  { id: S.de2, has: "Câu đố nào dưới đây có dùng lối chơi chữ", right: (q) => { assert.ok(van("sao") === "ao" && /«[Ss]ao»/.test(q.x) && /«ao»/.test(q.x), "sao bớt phụ âm đầu thành ao"); return q.o.find((o) => /^Để nguyên lấp lánh trên trời/.test(o)); } },
  { id: S.pool, has: "Con gì đầu dê mình ốc", right: () => dau("dê") + vanThanh("ốc") },
  { id: S.pool, has: "là bí mật, không được bật mí", right: (q) => {
    const [a, b] = ["bí", "mật"], lai = dau(a) + vanThanh(b) + " " + dau(b) + vanThanh(a);
    assert.equal(lai, "bật mí", "đổi phần vần, thanh của «bí mật» được «bật mí»"); assert.ok(q.q.includes("«" + "Chuyện này là bí mật")); return "Nói lái";
  } }
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
// lời giải các câu vần, thanh nêu đúng các tiếng có trong câu được hỏi
kho.filter((q) => q.topic === "Điệp thanh, điệp vần").forEach((q) => {
  const w = tieng([q.q].concat(q.o || []).join(" ")).map((t) => t.toLowerCase());
  [...q.x.matchAll(/«([^»\s]+)»/g)].map((m) => m[1].toLowerCase()).filter((t) => dau(t)).forEach((t) => assert.ok(w.includes(t), `${ten.get(q)}: lời giải nhắc «${t}» không có trong câu`));
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
  if (v[l - 1]) assert.ok(dem(rieng, t, l) > 0, `ô (${t}, mức ${l}) có câu riêng của đề ngẫu nhiên`);
}));
// ba chủ đề đọc hiểu theo tên Bài 1–3 (chữ như kho cuối kì I): mỗi đề cố định và phần câu riêng có đúng một đoạn mỗi chủ đề, đoạn 4 câu
// mức 1-2-3-3 đứng liền nhau
const docHieu = TOPICS.filter((t) => kho.some((q) => q.topic === t && q.p));
assert.deepEqual(docHieu, ["Thế giới kì ảo", "Những cung bậc tâm trạng", "Hồn nước nằm trong tiếng mẹ cha"], "ba chủ đề đọc hiểu theo tên Bài 1–3");
docHieu.forEach((t) => {
  assert.ok(kho.filter((q) => q.topic === t).every((q) => q.p), t + ": mọi câu có đoạn đọc");
  assert.deepEqual(M[t], [1, 1, 2], t + ": ma trận [1, 1, 2]");
  [S.de1, S.de2, S.pool].forEach((id) => {
    const all = kho.filter((q) => q.src === id), qs = all.filter((q) => q.topic === t), ps = [...new Set(qs.map((q) => q.p))];
    assert.equal(ps.length, 1, `${id}, ${t}: đúng một đoạn`);
    assert.deepEqual(qs.map((q) => q.lv), [1, 2, 3, 3], `${id}, ${t}: đoạn 4 câu mức 1-2-3-3`);
    assert.equal(all.indexOf(qs[3]) - all.indexOf(qs[0]), 3, `${id}, ${t}: câu cùng đoạn đứng liền nhau`);
  });
});
Object.keys(PSG).forEach((id) => assert.equal(kho.filter((q) => q.p === id).length, 4, "đoạn " + id + " có 4 câu"));
assert.ok(kho.filter((q) => !q.p).every((q) => !docHieu.includes(q.topic)), "câu không có đoạn đọc chỉ ở Tiếng Việt, Viết");
// ngữ liệu đọc hiểu: một truyện truyền kì kể lại, một bài thơ song thất lục bát người soạn viết, một đoạn trích truyện thơ Nôm mỗi đề
[S.de1, S.de2, S.pool].forEach((id) => {
  const ps = docHieu.map((t) => kho.find((q) => q.src === id && q.topic === t).p);
  assert.ok(/người soạn kể lại theo truyện .*(Bồ Tùng Linh|Nguyễn Dữ)/.test(PSG[ps[0]].title), id + ": truyện truyền kì kể lại, ghi nguồn");
  assert.equal(THO[ps[1]], "stlb", id + ": bài thơ song thất lục bát"); assert.ok(/người soạn viết/.test(PSG[ps[1]].title), id + ": bài thơ người soạn viết");
  assert.ok(/^Trích «Truyện (Kiều|Lục Vân Tiên)»/.test(PSG[ps[2]].title) && THO[ps[2]] === "luc-bat", id + ": đoạn trích truyện thơ Nôm");
});
const viet = kho.filter((q) => q.topic === "Viết");
assert.ok(viet.every((q) => q.type === "essay") && kho.filter((q) => q.type === "essay").every((q) => q.topic === "Viết"), "chủ đề Viết chỉ gồm câu tự luận, tự luận chỉ ở Viết");
viet.forEach((q) => {
  assert.ok(q.rubric.length >= 4 && q.rubric.length <= 6, "câu Viết có 4–6 ý chấm: " + q.q.slice(0, 50));
  assert.equal(sum(q.rubric.map((r) => r.p)), sum(viet[0].rubric.map((r) => r.p)), "các câu Viết cùng tổng điểm");
  assert.ok(q.rubric.every((r) => r.p * 4 === Math.round(r.p * 4)), "điểm từng ý chia hết cho 0,25");
  assert.ok(/^Dàn ý gợi ý:/.test(q.x) && q.x.length > 400, "câu Viết có dàn ý gợi ý: " + q.q.slice(0, 50));
});
// ba kiểu bài Viết của Bài 1–3: vấn đề cần giải quyết (con người trong mối quan hệ với tự nhiên; trong đời sống của học sinh hiện nay),
// phân tích một tác phẩm thơ song thất lục bát
[[/rơm rạ|chim hoang dã/, 2], [/phân tích bài thơ song thất lục bát/, 2], [/trong đời sống học sinh hiện nay/, 1]].forEach(([re, k]) => assert.equal(viet.filter((q) => re.test(q.q)).length, k, "kiểu bài Viết: " + re));
assert.ok(viet.every((q) => /nghị luận|phân tích/.test(q.q)), "câu Viết là bài văn nghị luận");

/* ---------- dạng câu ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 4, "mỗi kho ít nhất 4 câu đúng/sai 4 ý");
[S.de1, S.de2].forEach((id) => assert.ok(tf4.some((q) => q.src === id), id + " có câu đúng/sai 4 ý"));
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
assert.ok(kho.some((q) => q.type === "fill"), "có câu trả lời ngắn (điền)");
assert.ok(kho.every((q) => ["mc", "tf4", "fill", "essay"].includes(q.type)), "chỉ dùng dạng câu của khung Công văn 7991 và tự luận");
// lời giải không nói “ý thứ hai”, “phương án A”: app xáo ý, phương án
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của ý: " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau; đáp án đúng là lựa chọn dài nhất hay
// ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn (Phiên N9-ck1-lsdl-gdcd)
const mc = kho.filter((q) => q.type === "mc");
mc.forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + ten.get(q));
});
const dai = mc.filter((q) => q.o[0].length >= Math.max(...q.o.slice(1).map((o) => o.length))).length;
const ngan = mc.filter((q) => q.o[0].length <= Math.min(...q.o.slice(1).map((o) => o.length))).length;
assert.ok(3 * dai <= mc.length, `đáp án là lựa chọn dài nhất ở ${dai}/${mc.length} câu nhiều lựa chọn`);
assert.ok(3 * ngan <= mc.length, `đáp án là lựa chọn ngắn nhất ở ${ngan}/${mc.length} câu nhiều lựa chọn`);
// nhãn chủ đề hiện trên câu: đáp án không là lựa chọn duy nhất có chữ của nhãn (Rút ra N6)
const khongDau0 = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase();
mc.forEach((q) => {
  const w = khongDau0(q.topic).split(/[^a-z0-9]+/).filter((x) => x.length > 1), cap = [];
  for (let i = 0; i + 1 < w.length; i++) cap.push(w[i] + " " + w[i + 1]);
  cap.forEach((c) => { const co = q.o.map((o) => khongDau0(o).replace(/[^a-z0-9]+/g, " ").includes(c)); assert.ok(!(co[0] && co.filter(Boolean).length === 1), `chỉ đáp án có chữ «${c}» của nhãn chủ đề: ${ten.get(q)}`); });
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
  docHieu.forEach((t) => {
    const ps = [...new Set(d.questions.filter((q) => q.topic === t).map((q) => q.p))];
    assert.equal(ps.length, 1, t + ": rút trọn một đoạn");
    const i = d.questions.findIndex((q) => q.p === ps[0]);
    assert.ok(d.questions.slice(i, i + 4).every((q) => q.p === ps[0]), t + ": câu cùng đoạn đứng liền nhau");
  });
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
   Rút cùng lúc: khác chủ đề; cùng chủ đề mà khác mức; cùng ô (chủ đề, mức) mà ô rút từ 2 câu trở lên (hai câu mức 3 của một đoạn, hai
   câu mức 1 của Điển tích, điển cố…). Đáp án (lựa chọn đúng, đáp án điền) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở
   xuống thì lấy cả đáp án); chuỗi có trong đề bài, lựa chọn, lời giải, đáp án, thang chấm hay đoạn đọc (khác đoạn của câu này) của câu
   kia thì in ra với DO_LO=1 để xem tay; danh sách đã xem ở DA_XEM. */
const tu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], (q.rubric || []).map((r) => r.c)).map(String);
const doLo = (qs, tenCau, cungLuc, doan) => {
  const ra = [];
  qs.forEach((q) => {
    const dap = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []; // câu điền: đáp án chính (các đáp án sau là cách viết khác)
    const C = [...new Set(dap.flatMap(cum))];
    if (!C.length) return;
    qs.forEach((p2) => {
      if (!cungLuc(q, p2)) return;
      const T = " " + chu(p2).concat(p2.p && doan(p2) !== doan(q) ? [doan(p2).text] : []).map((s) => tu(s).join(" ")).join(" | ") + " ";
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
    });
  });
  return [...new Set(ra)];
};
// chuỗi là tên biện pháp tu từ, thuật ngữ có ở khắp kho (Rút ra N9): không tính là lộ đáp án
// “đến”: đáp án là một tiếng của câu thơ (câu hỏi tiếng thứ năm hiệp vần), từ rất thường gặp, câu khác có chữ ấy không cho biết vị trí, vần
const TU_CHUNG = new Set(["so sánh", "nhân hoá", "điệp ngữ", "nói lái", "điệp âm", "phụ âm đầu", "nhân vật chính", "của nhân vật", "có yếu tố", "đến"]);
// mỗi lần rút lấy trọn một đoạn của mỗi chủ đề đọc hiểu (kiểm tra ở trên), nên hai đoạn của một chủ đề không rút cùng lúc
const cungLuc = (a, b) => a !== b && !(a.topic === b.topic && a.p && b.p && a.p !== b.p) && !(a.topic === b.topic && a.lv === b.lv && M[a.topic][a.lv - 1] <= 1);
const lo = doLo(kho, (q) => ten.get(q), cungLuc, (q) => PSG[q.p]).filter((s) => !TU_CHUNG.has(s.split(": ").pop()));
if (process.env.DO_LO) console.log("Đáp án có ở câu rút được cùng lúc (xem tay):\n" + lo.join("\n"));
// đã xem (Phiên N9-gk1-van): “dốc” là lời giải câu đố «Con gì đầu dê mình ốc?»; chữ «Dốc» trong câu «Dốc lòng nhân nghĩa há chờ trả ơn»
// của đoạn trích «Truyện Lục Vân Tiên» (dốc lòng: hết lòng) là từ khác, không gợi cách ghép tiếng của câu đố.
const DA_XEM = ["de2#9 → ngau-nhien#18: dốc", "de2#10 → ngau-nhien#18: dốc", "de2#11 → ngau-nhien#18: dốc", "de2#12 → ngau-nhien#18: dốc"];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = kho.find((q) => /nhờ việc làm nào mà thầy được giữ chức/.test(q.q)), b = kho.find((q) => /chữ quốc ngữ ngay từ khi ra đời/.test(q.q));
  const gia = Object.assign({}, b, { x: b.x + " Thầy Dương Trạm nhặt về, giữ gìn những tờ giấy có chữ." });
  assert.ok(doLo([a, gia], (q) => q.topic, cungLuc, (q) => PSG[q.p]).some((s) => /: những tờ giấy$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
}

/* ---------- câu của kho cuối kì I cùng chủ đề (đề “Ôn chủ đề” rút chung) ----------
   Đề “Ôn chủ đề” rút 10 câu của một chủ đề từ mọi đề Ngữ văn 9 có sẵn (bỏ câu tự luận), nên câu của kho này rút được cùng mọi câu cùng
   chủ đề của kho này và của kho cuối kì I (tám chủ đề chung). Đáp án không trùng đáp án câu cùng chủ đề của kho đó; dò lộ như trên giữa
   mọi cặp câu cùng chủ đề có ít nhất một câu của kho này; chỗ đã xem ghi ở DA_XEM_CHU_DE. Đề bài không gần trùng câu của kho đó. */
const ck1 = bank("van9-ck1-ngau-nhien");
assert.ok(ck1 && ck1.pool, "có kho Ngữ văn 9 cuối kì I");
const kho1 = ck1.questions, PSG1 = Object.assign({}, ...ck1.pool.from.map((id) => bank(id).passages || {}), ck1.passages || {});
const ten1 = new Map();
ck1.pool.from.concat(ck1.id).forEach((id) => kho1.filter((q) => q.src === id).forEach((q, i) => ten1.set(q, "ck1-" + id.replace("van9-ck1-", "") + "#" + (i + 1))));
const CHUNG = TOPICS.filter((t) => t !== "Viết");
assert.ok(CHUNG.every((t) => kho1.some((q) => q.topic === t)), "tám chủ đề đọc hiểu, tiếng Việt cùng chữ với kho cuối kì I");
const daAn = (q) => (q.type === "mc" ? q.o[0] : q.type === "fill" ? q.ans[0] : null);
kho.forEach((q) => { const a = daAn(q); if (a === null) return; kho1.filter((o) => o.topic === q.topic && goc(daAn(o) || "") === goc(a)).forEach((o) => assert.fail(`${ten.get(q)} trùng đáp án “${a}” với ${ten1.get(o)}`)); });
const tenCD = (q) => ten.get(q) || ten1.get(q);
const loCD = CHUNG.flatMap((t) => doLo(kho.concat(kho1).filter((q) => q.topic === t && q.type !== "essay"), tenCD,
  (a, b) => a !== b && (ten.has(a) || ten.has(b)), (q) => (ten.has(q) ? PSG[q.p] : PSG1[q.p]))).filter((s) => !TU_CHUNG.has(s.split(": ").pop()) && !lo.includes(s));
if (process.env.DO_LO) console.log("Đáp án có ở câu cùng chủ đề rút chung ở đề “Ôn chủ đề” (xem tay):\n" + loCD.join("\n"));
const DA_XEM_CHU_DE = [];
assert.deepEqual(loCD, DA_XEM_CHU_DE, "đáp án có ở câu cùng chủ đề đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM_CHU_DE");
// gần trùng (Rút ra N25; như tests/toan9-gk1.js): đề bài cùng lựa chọn có từ 4 cặp hai âm tiết liền nhau chung với một câu của kho cuối
// kì I và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính cụm chung của đề Ngữ văn (CUM), cặp có số hay chữ đơn,
// cặp của nhãn chủ đề và cặp có ở từ 3% số câu của data/banks/9-van.js.
{
  const CUM = ["mỗi nhận xét sau", "đúng hay sai", "người soạn viết", "song thất lục bát", "truyện thơ nôm", "truyện truyền kì", "dưới đây", "biện pháp tu từ", "yếu tố hán việt"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const deVan9 = BANKS.filter((b) => b.file === "9-van.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), df = {};
  deVan9.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * deVan9.length)); };
  const gan = kho.flatMap((q) => { const c = capAm(q); return kho1.map((o) => { const d = capAm(o), chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${ten1.get(o)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  assert.deepEqual(gan, [], "đề bài gần trùng câu của kho cuối kì I");
}
// ngữ liệu không dùng lại của kho cuối kì I: không dòng thơ, câu văn nào của đoạn đọc trùng đoạn đọc của kho đó
{
  const cau = (t) => t.split(/\n|(?<=[.!?…»])\s+/).map(goc).filter((s) => s.length >= 12);
  const cu = new Set(Object.values(PSG1).flatMap((x) => cau(x.text)));
  Object.entries(PSG).forEach(([id, x]) => cau(x.text).forEach((s) => assert.ok(!cu.has(s), `đoạn ${id} dùng lại câu của kho cuối kì I: ${s}`)));
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// câu thơ trích nguyên văn của tác phẩm cổ (sách cũng dẫn) không tính là chép sách
const TRICH = [];
const khongDau = (s) => TRICH.reduce((x, c) => x.split(c).join(" "), String(s).normalize("NFC")).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const tuKD = (s) => khongDau(s).split(" ").filter(Boolean);
const chuoi = (s, k) => { const w = tuKD(s), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const truong = (q) => chu(q).concat(q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].title, PSG[q.p].text] : []);
// tập các chuỗi k từ của một khối chữ (so nhanh hơn includes trên cả khối; Phiên N9-ck1-lsdl-gdcd)
const boChuoi = (texts, k) => { const set = new Set(); texts.forEach((t) => { const w = tuKD(t); for (let i = 0; i + k <= w.length; i++) set.add(w.slice(i, i + k).join(" ")); }); return set; };
if (SACH.length) {
  assert.ok(SACH.some((f) => /ngu-van-9-tap-1/.test(f)), "OnUp-Book có Ngữ văn 9 tập một");
  assert.ok(TRICH.every((c) => kho.some((q) => truong(q).some((s) => s.normalize("NFC").includes(c)))), "câu trích ở TRICH phải có trong kho");
  const texts = SACH.map((f) => fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]* ===/g, " "));
  const bao = (k) => { const set = boChuoi(texts, k); return kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`))); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const khac = BANKS.filter((b) => !/^van9-gk1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)
    .map((q) => chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].title || "", b.passages[q.p].text || ""] : []).join(" | ")));
  const bao = (k) => { const set = boChuoi(khac, k); return kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại, đọc lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn đọc, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn.");
console.log("VAN9 GK1 OK");
