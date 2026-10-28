// Kiểm tra ngân hàng Ngữ văn 9 giữa kì II của Phiên N9-gk2-van (data/banks/9-van.js, van9-gk2-*), theo mẫu tests/van9-ck1.js.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho
// lớp 9 (đoạn “Chung của các phiên lớp 9” của docs/KE-HOACH-NOI-DUNG.md), số câu từng phần như kho Ngữ văn 6 giữa kì II.
// Đọc lại thể thơ bằng code (Tri thức ngữ văn Bài 7, tr. 45: thơ sáu chữ, bảy chữ, tám chữ xác định theo số tiếng mỗi dòng; vần
// chân, vần liền hoặc vần cách): mỗi bài thơ người soạn viết đúng số tiếng, chia khổ bốn dòng, hiệp vần đúng kiểu đã định (cặp tiếng
// hiệp vần cùng vần, cùng thanh bằng hoặc cùng thanh trắc). Rồi tính lại đáp án các câu về thể thơ, vần, từ lặp ở đầu dòng, khổ thơ viết thêm (CHECKS: nhận ra câu bằng một đoạn
// chữ của đề, đúng một câu trong kho), bài thơ mẫu trong lời giải câu Viết, các mốc giờ, ngày của truyện.
// Rồi kiểm tra ma trận, đoạn đọc (mỗi đề cố định và phần câu riêng có hai truyện trinh thám, đoạn 4 câu mức 1-2-3-3 và 3 câu mức
// 1-2-3; hai bài thơ, đoạn 3 câu mức 1-2-3 và 4 câu mức 1-1-2-3), câu Viết (chỉ tự luận, 4–6 ý chấm, cùng tổng điểm; đủ ba kiểu bài
// Viết của Bài 6–7; câu Viết về bài thơ gắn với đoạn của bài thơ tám chữ ấy, câu đọc hiểu của bài thơ đó không hỏi thể thơ), dạng câu
// (đúng/sai 4 ý không lặp kiểu Đ/S, có câu trả lời ngắn), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn
// nhất ở không quá một phần ba số câu nhiều lựa chọn, đề bài không trùng, rút thử nhiều lần (đúng ma trận, trọn đoạn, gặp đủ kho; đã
// làm hết một đề cố định thì không rút lại câu của đề đó) và dò lộ đáp án giữa các câu rút được cùng lúc (Rút ra N19: chuỗi 3 từ
// liền nhau của đáp án; đáp án ngắn thì cả đáp án) ở đề bài, lựa chọn, lời giải, đáp án, đoạn đọc của câu kia; DO_LO=1 in ra để xem
// tay, danh sách đã xem ở DA_XEM.
// Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ (cả đoạn đọc, thang chấm) với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp
// nguyên âm: không có chuỗi 8 từ liền nhau trùng sách; DO_SACH=1 in cả chuỗi 6 từ. So thêm với mọi câu của các kho khác: không có
// chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/van9-gk2.js → in VAN9 GK2 OK.
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
const S = { de1: "van9-gk2-de1", de2: "van9-gk2-de2", pool: "van9-gk2-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- tiếng, thanh, vần ---------- */
const TRAC = /[̣́̉̃]/; // sắc, hỏi, ngã, nặng
const tieng = (s) => String(s).normalize("NFC").replace(/[«»“”"(),.;:!?…–—]/g, " ").split(/\s+/).filter(Boolean);
const thanh = (t) => (TRAC.test(t.normalize("NFD")) ? "T" : "B");
// vần: bỏ dấu thanh (giữ mũ, trăng, móc), bỏ phụ âm đầu; “gi”, “qu” tính là phụ âm đầu (“gió” → “o”, “quà” → “a”)
const van = (t) => t.normalize("NFD").replace(/[̣̀́̉̃]/g, "").normalize("NFC").toLowerCase()
  .replace(/^(ngh|ng|gh|gi|kh|ph|th|tr|ch|nh|qu|b|c|d|đ|g|h|k|l|m|n|p|r|s|t|v|x)(?=[aăâeêioôơuưy])/, "");
const hiepVan = (a, b) => van(a) === van(b) && thanh(a) === thanh(b); // cùng vần, cùng thanh bằng hoặc cùng thanh trắc
// khổ thơ: các dòng thơ (bỏ dòng chú thích trong ngoặc), khổ ngăn bằng dòng trống
const khoTho = (p) => p.text.split(/\n\s*\n/).map((k) => k.split("\n").map((l) => l.trim()).filter((l) => l && !/^\(/.test(l))).filter((k) => k.length);
const cuoi = (l) => { const w = tieng(l); return w[w.length - 1]; };
// kiểu vần của một khổ bốn dòng: "lien" (1-2, 3-4), "cach" (2-4), theo các cặp tiếng cuối dòng hiệp vần
const kieuVan = (k) => {
  const c = k.map(cuoi), v = (i, j) => hiepVan(c[i], c[j]);
  if (v(0, 1) && v(2, 3) && !v(1, 2)) return "lien";
  if (v(1, 3) && !v(0, 1) && !v(2, 3)) return "cach";
  return "khac";
};
const THO = { // mã đoạn: [số tiếng mỗi dòng, kiểu vần của mọi khổ]
  "cho-som": [6, "cach"], "phuong-cuoi": [8, "lien"], "dem-mua": [6, "lien"], "lang-chai": [7, "cach"], "gat-lua": [8, "lien"], "pho-thu": [7, "lien"]
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
{ // đề ngẫu nhiên đã gộp đoạn đọc của hai đề cố định: đoạn của câu riêng không trùng mã với đoạn của hai đề
  const own = [...new Set(rieng.filter((q) => q.p).map((q) => q.p))], k1 = Object.keys(d1.passages), k2 = Object.keys(d2.passages);
  assert.equal(new Set(k1.concat(k2, own)).size, k1.length + k2.length + own.length, "mã đoạn đọc không trùng nhau");
  assert.equal(Object.keys(PSG).length, k1.length + k2.length + own.length, "đoạn đọc nào cũng có câu dùng");
}
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("van9-gk2-", "") + "#" + (i + 1))));

/* ---------- thơ: số tiếng, khổ, vần ---------- */
const laTho = (id) => Object.prototype.hasOwnProperty.call(THO, id);
Object.keys(PSG).forEach((id) => assert.ok(laTho(id) || !/\(thơ /.test(PSG[id].title), "bài thơ chưa có trong THO: " + id));
Object.entries(THO).forEach(([id, [so, kieu]]) => {
  const ps = PSG[id]; assert.ok(ps, "không có đoạn " + id);
  const K = khoTho(ps);
  K.forEach((k, i) => {
    assert.equal(k.length, 4, `${id}, khổ ${i + 1}: bốn dòng`);
    k.forEach((l, j) => assert.equal(tieng(l).length, so, `${id}, khổ ${i + 1}, dòng ${j + 1}: ${so} tiếng («${l}»)`));
    assert.equal(kieuVan(k), kieu, `${id}, khổ ${i + 1}: vần ${kieu}`);
  });
  assert.ok(K.length >= 3, id + ": ít nhất ba khổ");
});

/* ---------- đáp án tính lại bằng code ---------- */
const soTiengTho = (id) => [...new Set(khoTho(PSG[id]).flat().map((l) => tieng(l).length))];
const THE = { 6: "Thơ sáu chữ", 7: "Thơ bảy chữ", 8: "Thơ tám chữ" };
// khổ thơ viết trong một lựa chọn: các dòng ngăn bằng " / "
const khoLuaChon = (o) => o.split(" / ").map((l) => l.trim());
const CHECKS = [
  { id: S.de1, has: "tiếng «chào» ở cuối dòng thứ hai", right: (q) => {
    const k = khoTho(PSG["cho-som"])[1]; assert.equal(cuoi(k[1]), "chào"); assert.ok(hiepVan(cuoi(k[1]), cuoi(k[3])), "chào hiệp vần với tiếng cuối dòng thứ tư");
    return cuoi(k[3]);
  } },
  { id: S.de1, has: "từ nào được lặp lại ở đầu các dòng thơ", right: () => {
    const dau = khoTho(PSG["phuong-cuoi"])[1].map((l) => tieng(l)[0].toLowerCase()), dem = {};
    dau.forEach((w) => (dem[w] = (dem[w] || 0) + 1));
    const lap = Object.keys(dem).filter((w) => dem[w] >= 2); assert.equal(lap.length, 1, "đúng một từ đứng đầu từ hai dòng trở lên");
    return "Từ «" + lap[0] + "»";
  } },
  { id: S.de1, has: "Mỗi nhận xét sau về bài thơ «Mùa phượng cuối»", right: (q) => q.o.map((o, i) => (/hai cặp vần liền/.test(o) ? khoTho(PSG["phuong-cuoi"]).every((k) => kieuVan(k) === "lien") : q.a[i])) },
  { id: S.de2, has: "«Làng chài buổi sớm» được viết theo thể thơ nào", right: () => { const n = soTiengTho("lang-chai"); assert.equal(n.length, 1); return THE[n[0]]; } },
  { id: S.de2, has: "Ở khổ thơ thứ hai, hai tiếng nào hiệp vần với nhau", right: () => {
    const c = khoTho(PSG["lang-chai"])[1].map(cuoi), cap = [];
    for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) if (hiepVan(c[i], c[j])) cap.push("«" + c[i] + "» và «" + c[j] + "»");
    assert.equal(cap.length, 1, "khổ hai có đúng một cặp tiếng cuối dòng hiệp vần"); return cap[0];
  } },
  { id: S.pool, has: "«Phố cũ vào thu» gieo vần theo cách nào", right: (q) => {
    const k = khoTho(PSG["pho-thu"]).map(kieuVan); assert.ok(k.every((x) => x === k[0]), "mọi khổ cùng một kiểu vần");
    const dung = q.o.filter((o) => (k[0] === "lien" ? /^Vần chân, vần liền/ : /^Vần chân, vần cách/).test(o)); assert.equal(dung.length, 1); return dung[0];
  } },
  { id: S.de2, has: "Nếu viết thêm một khổ thơ nữa cho bài thơ", right: (q) => {
    const [so, kieu] = THO["dem-mua"], dung = q.o.filter((o) => { const k = khoLuaChon(o); return k.length === 4 && k.every((l) => tieng(l).length === so) && kieuVan(k) === kieu; });
    assert.equal(dung.length, 1, "đúng một khổ có đủ " + so + " tiếng mỗi dòng và vần " + kieu);
    return dung[0];
  } },
  { id: S.de2, has: "Lời kể của ai có chỗ vô lí", right: (q) => {
    const t = PSG["ao-ca"].text, m = /Tờ lịch hôm nay ghi: mùng (\d+) tháng/.exec(t); assert.ok(m, "truyện ghi ngày âm lịch hôm nay");
    assert.equal(+m[1] - 1, 1, "đêm qua là đêm mùng một: không có trăng"); assert.ok(/Trăng sáng như ban ngày/.test(t) && /Tối như mực/.test(t));
    assert.ok(/mùng một/.test(q.o[0]) && /^Hoà/.test(q.o[0])); return q.o[0];
  } }
];
// đề bài (chữ thường) có chữ “lời kể của ai” viết hoa ở đầu câu
CHECKS.forEach((c) => { c.re = new RegExp(c.has.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"); });
let n = 0;
CHECKS.forEach((c) => {
  const m = kho.filter((q) => c.re.test(q.q) && (!c.p || q.p === c.p));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has, want = c.right(q);
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  if (Array.isArray(want)) assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  else assert.equal(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  n++;
});
// các khổ sai của câu viết thêm khổ thơ: mỗi khổ sai đúng một kiểu (số tiếng, vần, xen dòng như lục bát)
{
  const q = kho.find((x) => /Nếu viết thêm một khổ thơ nữa/.test(x.q)), sai = q.o.slice(1).map(khoLuaChon);
  assert.ok(sai.some((k) => k.every((l) => tieng(l).length === 7)), "có khổ bảy tiếng mỗi dòng");
  assert.ok(sai.some((k) => k.every((l) => tieng(l).length === 6) && kieuVan(k) === "khac"), "có khổ đủ sáu tiếng mà sai vần");
  assert.ok(sai.some((k) => k.map((l) => tieng(l).length).join() === "6,8,6,8"), "có khổ xen dòng sáu tiếng, tám tiếng");
}
// mốc giờ của truyện «Mười lăm phút trước giờ chào cờ»: 7 giờ − 6 giờ 45 = 15 phút
{
  const t = PSG["cup-bac"].text, a = /mới (\d+) giờ (\d+)/.exec(t), b = /Đúng (\d+) giờ, lớp phải mang cúp/.exec(t);
  assert.ok(a && b && (+b[1] * 60) - (+a[1] * 60 + +a[2]) === 15 && /chỉ còn mười lăm phút/.test(t), "mốc giờ khớp «mười lăm phút»");
  n++;
}
// mốc giờ của truyện «Cuốn sách trong ngày mưa»: mưa từ 3 giờ 10, Tú đến 3 giờ 15 (ướt), ông Khải nói đến 3 giờ 25 mà khô
{
  const t = PSG["hieu-sach"].text, gio = (re) => { const m = re.exec(t); assert.ok(m, String(re)); return +m[1] * 60 + +m[2]; };
  const mua = gio(/(\d+) giờ (\d+), trời đổ mưa/), tu = gio(/trú mưa lúc (\d+) giờ (\d+)/), khai = gio(/đi bộ từ nhà tới, đến lúc (\d+) giờ (\d+)/);
  assert.ok(mua < tu && mua < khai && /ướt sũng/.test(t) && /khô ráo/.test(t), "ông Khải nói đến sau khi mưa mà giày khô: nói dối");
  n++;
}
// bài thơ mẫu trong lời giải câu tập làm thơ tám chữ: mỗi dòng tám tiếng, mỗi khổ bốn dòng vần liền
{
  const q = kho.find((x) => x.topic === "Viết" && /^Tập làm một bài thơ tám chữ/.test(x.q)); assert.ok(q, "có câu tập làm thơ tám chữ");
  const tho = q.x.split("(người soạn viết):\n")[1].split("\n").filter(Boolean);
  assert.equal(tho.length % 4, 0, "bài thơ mẫu chia khổ bốn dòng");
  tho.forEach((l) => assert.equal(tieng(l).length, 8, "bài thơ mẫu: «" + l + "» có tám tiếng"));
  for (let i = 0; i < tho.length; i += 4) assert.equal(kieuVan(tho.slice(i, i + 4)), "lien", "bài thơ mẫu: khổ " + (i / 4 + 1) + " vần liền");
  n++;
}

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
// hai chủ đề đọc hiểu (Bài 6, Bài 7): mỗi đề cố định và phần câu riêng có đúng hai đoạn mỗi chủ đề, đúng mức như lời giao việc
const docHieu = TOPICS.filter((t) => t !== "Viết" && kho.some((q) => q.topic === t && q.p));
assert.deepEqual(docHieu, ["Giải mã những bí mật", "Hồn thơ muôn điệu"], "hai chủ đề đọc hiểu theo tên Bài 6, Bài 7");
const MUC = { "Giải mã những bí mật": ["1,2,3", "1,2,3,3"], "Hồn thơ muôn điệu": ["1,1,2,3", "1,2,3"] };
docHieu.forEach((t) => {
  assert.ok(kho.filter((q) => q.topic === t).every((q) => q.p), t + ": mọi câu có đoạn đọc");
  [S.de1, S.de2, S.pool].forEach((id) => {
    const qs = kho.filter((q) => q.topic === t && q.src === id), ps = [...new Set(qs.map((q) => q.p))];
    assert.deepEqual(ps.map((x) => qs.filter((q) => q.p === x).map((q) => q.lv).join()).sort(), MUC[t], `${id}, ${t}: hai đoạn, mức như lời giao việc`);
  });
});
// truyện: một truyện có lời giải bí ẩn, một truyện dừng trước khi công bố (câu Vận dụng hỏi người có lỗi, người nói dối)
[S.de1, S.de2, S.pool].forEach((id) => {
  const ps = [...new Set(kho.filter((q) => q.topic === docHieu[0] && q.src === id).map((q) => q.p))];
  ps.forEach((x) => assert.ok(!laTho(x), x + ": đoạn của chủ đề truyện trinh thám không phải bài thơ"));
  assert.equal(ps.filter((x) => /“[^”]*(biết|gõ cửa)[^”]*(rồi|ai)[^”]*”\s*$/.test(PSG[x].text.trim())).length, 1, id + ": đúng một truyện dừng ở câu người điều tra nói đã biết lời giải");
  const ps2 = [...new Set(kho.filter((q) => q.topic === docHieu[1] && q.src === id).map((q) => q.p))];
  ps2.forEach((x) => assert.ok(laTho(x), x + ": đoạn của chủ đề thơ là bài thơ"));
});
// câu không có đoạn đọc chỉ ở Tiếng Việt, Viết; câu Tiếng Việt không trỏ tới đoạn đọc
assert.ok(kho.filter((q) => !q.p).every((q) => !docHieu.includes(q.topic)), "câu không có đoạn đọc chỉ ở Tiếng Việt, Viết");
assert.ok(kho.filter((q) => !docHieu.includes(q.topic) && q.topic !== "Viết").every((q) => !q.p), "câu Tiếng Việt không dùng đoạn đọc");
const viet = kho.filter((q) => q.topic === "Viết");
assert.ok(viet.every((q) => q.type === "essay") && kho.filter((q) => q.type === "essay").every((q) => q.topic === "Viết"), "chủ đề Viết chỉ gồm câu tự luận, tự luận chỉ ở Viết");
viet.forEach((q) => {
  assert.ok(q.rubric.length >= 4 && q.rubric.length <= 6, "câu Viết có 4–6 ý chấm: " + q.q.slice(0, 50));
  assert.equal(sum(q.rubric.map((r) => r.p)), sum(viet[0].rubric.map((r) => r.p)), "các câu Viết cùng tổng điểm");
  assert.ok(/^Dàn ý gợi ý/.test(q.x) && q.x.length > 400, "câu Viết có dàn ý gợi ý: " + q.q.slice(0, 50));
});
// ba kiểu bài Viết của Bài 6–7: truyện kể sáng tạo; tập làm một bài thơ tám chữ; đoạn văn ghi lại cảm nghĩ về một bài thơ tám chữ
[[/truyện kể sáng tạo/, 2], [/^Tập làm một bài thơ tám chữ/, 1], [/^Viết đoạn văn \(khoảng 200 chữ\) ghi lại cảm nghĩ của bạn về bài thơ tám chữ «([^»]+)»/, 2]]
  .forEach(([re, k]) => assert.equal(viet.filter((q) => re.test(q.q)).length, k, "kiểu bài Viết: " + re));
// câu Viết về bài thơ gắn với đoạn của bài thơ tám chữ cùng tên, cùng đề; câu đọc hiểu của bài thơ ấy không hỏi thể thơ, số tiếng
viet.filter((q) => /cảm nghĩ của bạn về bài thơ tám chữ/.test(q.q)).forEach((q) => {
  const ten2 = /«([^»]+)»/.exec(q.q)[1], ps = PSG[q.p];
  assert.ok(ps && ps.title.startsWith(ten2 + " "), "câu Viết về «" + ten2 + "» gắn với đoạn của bài thơ ấy");
  assert.deepEqual(soTiengTho(q.p), [8], q.p + ": bài thơ tám chữ");
  assert.ok(kho.filter((x) => x.p === q.p && x !== q).every((x) => x.src === q.src && !/thể thơ|tám chữ|số tiếng|mấy tiếng/.test([x.q].concat(x.o || [], x.ans || []).join(" "))), q.p + ": câu đọc hiểu không hỏi thể thơ (đề Viết đã nêu)");
});
// truyện kể, bài thơ gắn với chủ đề đọc hiểu nào thì không có câu ở chủ đề đọc hiểu khác
Object.keys(PSG).forEach((id) => assert.equal(new Set(kho.filter((q) => q.p === id && q.topic !== "Viết").map((q) => q.topic)).size, 1, id + ": một chủ đề đọc hiểu"));
// lời trong đề bài, lựa chọn, thang chấm, lời giải gọi người làm bài là “bạn”, không gọi “em” (CLAUDE.md)
kho.forEach((q) => assert.ok(!/(của em|em hãy|Em hãy|theo em|Theo em)\b/.test([q.q, q.x].concat(q.o || [], (q.rubric || []).map((r) => r.c)).join(" ")), "gọi người làm bài là «bạn»: " + ten.get(q)));

/* ---------- dạng câu ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 4, "mỗi kho ít nhất 4 câu đúng/sai 4 ý");
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
let vietTho = 0;
for (let k = 0; k < 600; k++) {
  const d = Quiz.draw(p);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, p.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  docHieu.forEach((t) => {
    const ps = [...new Set(d.questions.filter((q) => q.topic === t).map((q) => q.p))];
    assert.equal(ps.length, 2, t + ": rút trọn hai đoạn");
    ps.forEach((x) => assert.equal(d.questions.filter((q) => q.p === x && q.topic === t).length, kho.filter((q) => q.p === x && q.topic === t).length, t + ": lấy cả đoạn " + x));
  });
  const v = d.questions.find((q) => q.topic === "Viết");
  // bài thơ có câu Viết đi kèm được rút ở phần đọc hiểu thì câu Viết là câu về bài thơ ấy (K4: đoạn đã rút cho chủ đề khác đứng trước)
  const thoRut = new Set(d.questions.filter((q) => q.topic === docHieu[1]).map((q) => q.p)), coViet = viet.filter((q) => q.p && thoRut.has(q.p)).map((q) => q.p);
  if (coViet.length) assert.ok(coViet.includes(v.p), "bài thơ có câu Viết đi kèm đã được rút mà câu Viết là câu khác");
  if (v.p) vietTho++;
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.equal(seen.size, kho.length, "600 lần rút thử phải gặp đủ câu của kho");
assert.ok(vietTho > 0 && vietTho < 600, "câu Viết lúc về bài thơ, lúc là kiểu bài khác");
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
   Rút cùng lúc: khác chủ đề; cùng chủ đề mà khác mức; cùng ô (chủ đề, mức) mà ô rút từ 2 câu trở lên (hai đoạn của một chủ đề đọc
   hiểu được rút cùng nhau). Đáp án (lựa chọn đúng, đáp án điền) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy
   cả đáp án); chuỗi có trong đề bài, lựa chọn, lời giải, đáp án, thang chấm hay đoạn đọc (khác đoạn của câu này) của câu kia thì in
   ra với DO_LO=1 để xem tay; danh sách đã xem ở DA_XEM. */
const tu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const cungLuc = (a, b) => a !== b && !(a.topic === b.topic && a.lv === b.lv && M[a.topic][a.lv - 1] <= 1);
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
// chuỗi là tên biện pháp tu từ, thuật ngữ ngữ pháp, thể loại có ở khắp kho (Rút ra N9): không tính là lộ đáp án
const TU_CHUNG = new Set(["so sánh", "nhân hoá", "hoán dụ", "ẩn dụ", "điệp ngữ", "liệt kê", "câu hỏi tu từ", "mạch cảm xúc", "ngôi thứ nhất", "thứ nhất người", "nhất người kể", "người kể là",
  "câu ghép đẳng", "ghép đẳng lập", "có từ ngữ", "từ ngữ nối", "không có từ", "quan hệ giả", "hệ giả thiết", "giả thiết hệ", "thiết hệ quả", "ở khổ cuối"]);
const lo = doLo(kho, (q) => ten.get(q)).filter((s) => !TU_CHUNG.has(s.split(": ").pop()));
if (process.env.DO_LO) console.log("Đáp án có ở câu rút được cùng lúc (xem tay):\n" + lo.join("\n"));
// đã xem (Phiên N9-gk2-van): “bao” là đáp án câu điền tiếng hiệp vần, nằm ngay trong bài thơ «Phiên chợ sớm» của câu ấy (câu hỏi
// nhận ra tiếng hiệp vần); “bao” ở câu khác là «bao gạo», «bao nhiêu», «biết bao» trong lời trích bài thơ ấy, không nói gì về vần.
// “vần chân vần”, “chân vần liền”: đề câu tập làm thơ tám chữ dặn «gieo vần chân (vần liền hoặc vần cách)», nêu cả hai cách gieo
// vần, không cho biết bài «Phố cũ vào thu» gieo theo cách nào.
const DA_XEM = ["ngau-nhien#23 → ngau-nhien#12: vần chân vần", "ngau-nhien#23 → ngau-nhien#12: chân vần liền", "ngau-nhien#5 → de1#8: bao",
  "ngau-nhien#6 → de1#8: bao", "ngau-nhien#7 → de1#8: bao", "de1#9 → de1#8: bao", "de1#17 → de1#8: bao"];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = kho.find((q) => /chị Ngọc sẽ gõ cửa nhà ai/.test(q.q)), b = kho.find((q) => /Câu nào dưới đây là câu đơn/.test(q.q));
  const gia = Object.assign({}, b, { x: b.x + " Lốp xe có miếng vá là xe của nhà chú Lành." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => / nhà chú lành$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const tuKD = (s) => khongDau(s).split(" ").filter(Boolean);
const chuoi = (s, k) => { const w = tuKD(s), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const truong = (q) => chu(q).concat(q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].title, PSG[q.p].text] : []);
// tập các chuỗi k từ của một khối chữ (so nhanh hơn includes trên cả khối; Phiên N9-ck1-lsdl-gdcd)
const boChuoi = (texts, k) => { const set = new Set(); texts.forEach((t) => { const w = tuKD(t); for (let i = 0; i + k <= w.length; i++) set.add(w.slice(i, i + k).join(" ")); }); return set; };
if (SACH.length) {
  assert.ok(SACH.some((f) => /ngu-van-9-tap-2/.test(f)), "OnUp-Book có Ngữ văn 9 tập hai");
  const texts = SACH.map((f) => fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]* ===/g, " "));
  const bao = (k) => { const set = boChuoi(texts, k); return kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`))); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác ---------- */
{
  const khac = BANKS.filter((b) => !b.pool && !/^van9-gk2-/.test(b.id)).flatMap((b) => b.questions.map((q) => chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).join(" | ")));
  const bao = (k) => { const set = boChuoi(khac, k); return kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại, đọc lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn đọc, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn.");
console.log("VAN9 GK2 OK");
