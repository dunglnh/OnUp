// Kiểm tra ngân hàng Ngữ văn 12 cuối kì I của Phiên N12-ck1-van (data/banks/12-van.js, van12-ck1-*), theo mẫu tests/van9-ck1.js.
// Kho = Đề 1 + Đề 2 + ba câu Viết riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi
// kho lớp 12 (đoạn “Chung của các phiên lớp 12” của docs/KE-HOACH-NOI-DUNG.md).
// Đọc lại luật thơ bằng code: bài bảy chữ bốn câu người soạn viết (bảy tiếng mỗi câu; tiếng 2, 4, 6 theo luật bằng của thơ Đường, niêm;
// vần bằng ở cuối câu 1, 2, 4, câu 3 tận cùng thanh trắc), các câu lục bát người soạn viết trong câu Tiếng Việt (tiếng 2, 4, 6, 8 bằng
// trắc; tiếng 6 và 8 của dòng tám một thanh ngang, một thanh huyền; vần lục – bát, bát – lục), bài thơ tự do (các mốc tuổi, không viết
// hoa, không dấu câu), rồi tính lại đáp án các câu hỏi về thể thơ, mốc tuổi, cách trình bày và các câu hỏi chi tiết (CHECKS: nhận ra câu
// bằng một đoạn chữ của đề, đúng một câu trong kho; đáp án phải khớp chữ của đoạn đọc).
// Rồi kiểm tra ma trận, đoạn đọc (mỗi chủ đề đọc hiểu một đoạn mỗi đề cố định, đoạn 3 câu mức 1-2-3), câu Viết (chỉ tự luận, 4–6 ý
// chấm, tổng 4 điểm như câu bài văn của đề tốt nghiệp, đủ năm kiểu bài Viết của Bài 1–5; câu riêng của đề ngẫu nhiên chỉ là câu Viết),
// note (nhắc trường chưa học hết Bài 5, đề chung của Sở), dạng câu (ít nhất 6 câu đúng/sai 4 ý không lặp kiểu Đ/S, có câu trả lời
// ngắn), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn,
// không là lựa chọn duy nhất có chữ của nhãn chủ đề, đề bài không trùng, rút thử nhiều lần (đúng ma trận, trọn đoạn, gặp đủ kho; đã làm
// hết một đề cố định thì không rút lại câu của đề đó), đề “Ôn chủ đề” lấy hết câu của chủ đề (chủ đề nào cũng dưới 10 câu), và dò lộ đáp
// án giữa các câu rút được cùng lúc (Rút ra N19: chuỗi 3 từ liền nhau của đáp án; đáp án ngắn thì cả đáp án) ở đề bài, lựa chọn, lời
// giải, đáp án, đoạn đọc của câu kia. Đề “Ôn chủ đề” rút chung cả chủ đề, nên mọi cặp câu đều tính là rút cùng lúc, trừ hai câu Viết
// (Rút ra N12-ck1-toan); DO_LO=1 in ra để xem tay, danh sách đã xem ở DA_XEM.
// Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ (cả đoạn đọc, thang chấm) với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp
// nguyên âm: không có chuỗi 8 từ liền nhau trùng sách; DO_SACH=1 in cả chuỗi 6 từ. So thêm với mọi câu của các kho khác, cả câu riêng
// của các đề ngẫu nhiên: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/van12-ck1.js → in VAN12 OK.
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
const S = { de1: "van12-ck1-de1", de2: "van12-ck1-de2", pool: "van12-ck1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- tiếng, thanh, vần ---------- */
const TRAC = /[̣́̉̃]/; // sắc, hỏi, ngã, nặng
const tieng = (s) => String(s).normalize("NFC").replace(/[«»“”"(),.;:!?…–—]/g, " ").split(/\s+/).filter(Boolean);
const thanh = (t) => (TRAC.test(t.normalize("NFD")) ? "T" : "B");
const huyen = (t) => /̀/.test(t.normalize("NFD")); // thanh huyền (bằng, trầm); thanh ngang là bằng, bổng
// vần: bỏ dấu thanh (giữ mũ, trăng, móc), bỏ phụ âm đầu; “gi”, “qu” tính là phụ âm đầu
const van = (t) => t.normalize("NFD").replace(/[̣̀́̉̃]/g, "").normalize("NFC").toLowerCase()
  .replace(/^(ngh|ng|gh|gi|kh|ph|th|tr|ch|nh|qu|b|c|d|đ|g|h|k|l|m|n|p|r|s|t|v|x)(?=[aăâeêioôơuưy])/, "");
// thơ bảy chữ bốn câu, luật bằng: tiếng 2, 4, 6 của câu 1, 4 là B, T, B; của câu 2, 3 là T, B, T (niêm câu 1 – 4, câu 2 – 3);
// tiếng 7 của câu 1, 2, 4 bằng, cùng vần; câu 3 tận cùng thanh trắc
const kiemTuTuyet = (lines, at) => {
  assert.equal(lines.length, 4, at + ": bốn câu");
  const w = lines.map(tieng);
  w.forEach((l, i) => {
    assert.equal(l.length, 7, `${at}, câu ${i + 1}: bảy tiếng`);
    const muon = i === 0 || i === 3 ? "BTB" : "TBT";
    assert.equal([1, 3, 5].map((k) => thanh(l[k])).join(""), muon, `${at}, câu ${i + 1}: tiếng 2, 4, 6 phải ${muon}`);
  });
  [0, 1, 3].forEach((i) => assert.equal(thanh(w[i][6]), "B", `${at}, câu ${i + 1}: vần bằng`));
  assert.equal(thanh(w[2][6]), "T", at + ": câu 3 tận cùng thanh trắc");
  assert.ok(new Set([0, 1, 3].map((i) => van(w[i][6]))).size === 1, at + ": câu 1, 2, 4 cùng vần");
  return w;
};
// lục bát: dòng sáu tiếng 2, 4, 6 là B, T, B; dòng tám tiếng 2, 4, 6, 8 là B, T, B, B, tiếng 6 và 8 một ngang một huyền;
// tiếng 6 dòng sáu vần với tiếng 6 dòng tám; tiếng 8 dòng tám vần với tiếng 6 dòng sáu kế tiếp
const kiemLucBat = (lines, at) => {
  const w = lines.map(tieng);
  w.forEach((l, i) => {
    const luc = i % 2 === 0;
    assert.equal(l.length, luc ? 6 : 8, `${at}, dòng ${i + 1}: ${luc ? 6 : 8} tiếng`);
    assert.equal((luc ? [1, 3, 5] : [1, 3, 5, 7]).map((k) => thanh(l[k])).join(""), luc ? "BTB" : "BTBB", `${at}, dòng ${i + 1}: bằng trắc`);
    if (!luc) {
      assert.notEqual(huyen(l[5]), huyen(l[7]), `${at}, dòng ${i + 1}: tiếng 6 («${l[5]}») và 8 («${l[7]}») một ngang một huyền`);
      assert.equal(van(l[5]), van(w[i - 1][5]), `${at}, dòng ${i + 1}: vần lục – bát («${w[i - 1][5]}» – «${l[5]}»)`);
      if (w[i + 1]) assert.equal(van(w[i + 1][5]), van(l[7]), `${at}, dòng ${i + 2}: vần bát – lục («${l[7]}» – «${w[i + 1][5]}»)`);
    }
  });
  return w;
};
// số đếm bằng chữ (đến 99): “hai mươi bảy” → 27, “mười lăm” → 15
const SO = { một: 1, mốt: 1, hai: 2, ba: 3, bốn: 4, tư: 4, năm: 5, lăm: 5, sáu: 6, bảy: 7, tám: 8, chín: 9 };
const docSo = (s) => { const w = tieng(s.toLowerCase()); let n = 0; w.forEach((t) => { if (t === "mười") n += 10; else if (t === "mươi") n *= 10; else if (t in SO) n += SO[t]; else throw new Error("không đọc được số: " + s); }); return n; };

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => { assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 12); assert.equal(b.subject, "Ngữ văn"); assert.equal(b.file, "12-van.js"); });
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
assert.ok(rieng.length && rieng.every((q) => q.topic === "Viết" && q.type === "essay"), "câu riêng của đề ngẫu nhiên chỉ là câu Viết");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("van12-ck1-", "") + "#" + (i + 1))));
const doan = (id) => { assert.ok(PSG[id], "không có đoạn " + id); return PSG[id].text; };
const dongTho = (id) => doan(id).split("\n").filter((l) => l.trim());
const motCau = (has) => { const m = kho.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };
const trongNgoac = (q) => /«([^»]+)»/.exec(q.q)[1].split(" / ");

/* ---------- thơ: luật, số tiếng, cách trình bày ---------- */
const chieuThu = kiemTuTuyet(dongTho("chieu-thu"), "chieu-thu");
const tre = kiemLucBat(trongNgoac(motCau("Hàng tre đứng gác")), "câu thơ về hàng tre");
const nho = kiemLucBat(trongNgoac(motCau("Nhớ sao tiếng mõ")), "khổ thơ «Nhớ sao»");
assert.equal(nho.length, 4, "khổ thơ «Nhớ sao» có bốn dòng");
assert.equal(tre.length, 2, "hai câu thơ về hàng tre");
const thuyen = dongTho("thuyen-giay");
const tuoi = thuyen.filter((l) => /^năm .+ tuổi\b/.test(l)).map((l) => docSo(/^năm (.+?) tuổi/.exec(l)[1]));
assert.equal(tuoi.length, 3, "thuyen-giay: ba khổ mở bằng «năm … tuổi»");

/* ---------- đáp án tính lại bằng code, đối chiếu chữ của đoạn đọc ---------- */
const coTrong = (id, s) => { assert.ok(doan(id).includes(s), `đoạn ${id} phải có «${s}»`); return true; };
const CHECKS = [
  { id: S.de1, has: "được viết theo thể thơ nào", right: () => (chieuThu.length === 4 ? "Thất ngôn tứ tuyệt" : chieuThu.length === 8 ? "Thất ngôn bát cú" : null) },
  { id: S.de1, has: "Đối chiếu với đặc điểm của phong cách cổ điển", right: (q) => q.o.map((o, i) => (/số chữ mỗi câu tuỳ ý, không gieo vần/.test(o) ? !(chieuThu.every((l) => l.length === 7) && new Set([0, 1, 3].map((k) => van(chieuThu[k][6]))).size === 1) : q.a[i])) },
  { id: S.de2, has: "con thuyền giấy ở những tuổi nào", right: (q) => { const ok = q.o.filter((o) => o.split(/,|\svà\s/).map((t) => docSo(t.replace(/tuổi/g, " "))).join() === tuoi.join()); assert.equal(ok.length, 1, "đúng một lựa chọn khớp các mốc tuổi"); return ok[0]; } },
  { id: S.de2, has: "hình ảnh và cách trình bày của bài thơ", right: (q) => q.o.map((o, i) => (/lặp lại cấu trúc «năm … tuổi»/.test(o) ? tuoi.length === 3 : /không viết hoa đầu dòng, không dùng dấu câu/.test(o) ? !/[A-ZĐÀ-Ỹ]|[.,;:!?…]/.test(doan("thuyen-giay").replace(/[a-zđà-ỹ]/g, "")) : q.a[i])) },
  { id: S.de1, has: "số tiền Thắm có được", right: (q) => coTrong("cho-cuoi-nam", "chỉ đủ cho một trong hai thứ: chiếc áo bông cho mẹ, hoặc tiền học") && q.o[0] },
  { id: S.de1, has: "Ý kiến chính (luận đề) mà người viết nêu ở đoạn (1)", right: (q) => coTrong("dat-cau-hoi", "Theo tôi, biết đặt câu hỏi là một năng lực cần được rèn luyện") && q.o[0] },
  { id: S.de1, has: "bước ra từ bức tranh xưng tên", right: () => /xưng là (\S+ \S+?),/.exec(doan("nguoi-trong-tranh"))[1] },
  { id: S.de1, has: "Ông Phúc dặn cu Tí", right: () => "«" + /phải nói: «([^»]+)»/.exec(doan("tam-bien"))[1] + "»" },
  { id: S.de2, has: "bố của nhân vật «tôi» làm nghề", right: () => /ngồi (sửa \S+ \S+) đến tối/.exec(doan("khu-tap-the"))[1] },
  { id: S.de2, has: "giọng nói của một vùng quê còn gồm", right: (q) => coTrong("giong-que", "cách gọi tên đồ vật, cách xưng hô, những từ ngữ riêng") && q.o[0] },
  { id: S.de2, has: "nhìn thấy ai ngồi trên con đò", right: (q) => coTrong("con-do", "bà nội tôi, người đã mất từ năm tôi lên sáu") && q.o.find((o) => /bà nội/.test(o) && /lên sáu/.test(o)) },
  { id: S.de2, has: "bộ sa lông và chiếc ti vi", right: (q) => coTrong("nha-co-khach", "bộ sa lông là của nhà bác Khả, ti vi cũng của bác ấy") && q.o.find((o) => /bác Khả/.test(o)) },
  { id: S.de2, has: "mở đầu ba dòng bằng cùng một cụm từ", right: (q) => { const dau = trongNgoac(q).map((l) => tieng(l).slice(0, 2).join(" ")); assert.equal(dau.filter((d) => d === dau[0]).length, 3, "ba dòng mở bằng cùng cụm từ"); return q.o[0]; } }
];
let n = 0;
CHECKS.forEach((c) => {
  const q = motCau(c.has), at = c.id + ": " + c.has, want = c.right(q);
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  if (Array.isArray(want)) assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  else assert.equal(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  n++;
});

/* ---------- ma trận, đoạn đọc, câu Viết, note ---------- */
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
// năm chủ đề đọc hiểu theo tên Bài 1–5 (mục lục của sách in năm 2026), đứng đầu ma trận; mỗi đề cố định một đoạn mỗi chủ đề, 3 câu mức 1-2-3
const BAI = ["Khả năng lớn lao của tiểu thuyết", "Những thế giới thơ", "Lập luận trong văn bản nghị luận", "Yếu tố kì ảo trong truyện kể", "Tiếng cười của hài kịch"];
const docHieu = TOPICS.filter((t) => kho.some((q) => q.topic === t && q.p));
assert.deepEqual(docHieu, BAI, "năm chủ đề đọc hiểu theo tên Bài 1–5, đứng đầu ma trận");
docHieu.forEach((t) => {
  assert.ok(kho.filter((q) => q.topic === t).every((q) => q.p), t + ": mọi câu có đoạn đọc");
  assert.deepEqual(M[t], [1, 1, 1], t + ": ma trận [1, 1, 1]");
  [S.de1, S.de2].forEach((id) => {
    const qs = kho.filter((q) => q.topic === t && q.src === id), ps = [...new Set(qs.map((q) => q.p))];
    assert.equal(ps.length, 1, `${id}, ${t}: đúng một đoạn`);
    assert.deepEqual(qs.map((q) => q.lv), [1, 2, 3], `${id}, ${t}: đoạn 3 câu mức 1-2-3`);
  });
});
Object.keys(PSG).forEach((id) => assert.equal(kho.filter((q) => q.p === id).length, 3, "đoạn " + id + " có 3 câu"));
assert.ok(Object.values(PSG).every((ps) => /người soạn (viết|kể lại)/.test(ps.title)), "đoạn đọc ngoài sách: người soạn viết hoặc kể lại");
assert.ok(kho.filter((q) => !q.p).every((q) => !docHieu.includes(q.topic)), "câu không có đoạn đọc chỉ ở Tiếng Việt, Viết");
// Bài 5 không có mục Thực hành tiếng Việt: chủ đề tiếng Việt chỉ của Bài 1–4; Bài 3, 4 (trọng tâm) nhiều câu hơn Bài 1, 2
const TV = { "Nói mỉa": 1, "Nghịch ngữ": 1, "Biện pháp tu từ trong thơ": 2, "Lỗi logic": 3, "Lỗi câu mơ hồ": 3, "Điển cố": 4 };
assert.deepEqual(TOPICS.filter((t) => !BAI.includes(t) && t !== "Viết"), Object.keys(TV), "chủ đề tiếng Việt theo các mục Thực hành tiếng Việt Bài 1–4");
const soCauBai = (b) => sum(Object.keys(TV).filter((t) => TV[t] === b).map((t) => sum(M[t])));
assert.ok(soCauBai(3) + soCauBai(4) > soCauBai(1) + soCauBai(2), "tiếng Việt: Bài 3, 4 nhiều câu hơn Bài 1, 2");
const viet = kho.filter((q) => q.topic === "Viết");
assert.ok(viet.every((q) => q.type === "essay") && kho.filter((q) => q.type === "essay").every((q) => q.topic === "Viết"), "chủ đề Viết chỉ gồm câu tự luận, tự luận chỉ ở Viết");
viet.forEach((q) => {
  assert.ok(q.rubric.length >= 4 && q.rubric.length <= 6, "câu Viết có 4–6 ý chấm: " + q.q.slice(0, 50));
  assert.equal(sum(q.rubric.map((r) => r.p)), 4, "câu Viết 4 điểm như câu bài văn của đề tốt nghiệp: " + q.q.slice(0, 50));
  assert.ok(q.rubric.every((r) => Math.round(r.p * 4) === r.p * 4 && r.p > 0), "điểm từng ý chia hết cho 0,25");
  assert.ok(/khoảng 600 chữ/.test(q.q), "câu Viết là bài văn khoảng 600 chữ: " + q.q.slice(0, 50));
  assert.ok(/^Dàn ý gợi ý:/.test(q.x) && q.x.length > 400, "câu Viết có dàn ý gợi ý: " + q.q.slice(0, 50));
});
// năm kiểu bài Viết của Bài 1–5; hai đề cố định có kiểu bài của Bài 3, 4 (Bài 5 học sau bài kiểm tra ở nhiều trường)
const KIEU = [[1, /so sánh, đánh giá hai truyện ngắn/], [2, /so sánh, đánh giá hai bài thơ/], [3, /bàn về vấn đề: người trẻ/], [4, /vay mượn, cải biến và sáng tạo/], [5, /^Viết báo cáo nghiên cứu/]];
KIEU.forEach(([b, re]) => assert.equal(viet.filter((q) => re.test(q.q)).length, 1, `kiểu bài Viết của Bài ${b}: ${re}`));
assert.deepEqual([S.de1, S.de2].map((id) => KIEU.find(([, re]) => re.test(viet.find((q) => q.src === id).q))[0]), [3, 4], "câu Viết của hai đề cố định: Bài 3, Bài 4");
[d1, d2].forEach((b) => {
  assert.ok(/Trường chưa học hết Bài 5 thì bỏ qua ba câu của chủ đề «Tiếng cười của hài kịch»/.test(b.note), b.id + ": note nhắc trường chưa học hết Bài 5");
  assert.ok(/10 câu mức Biết, 8 câu mức Hiểu, 7 câu mức Vận dụng/.test(b.note), b.id + ": note ghi ma trận");
});
[d1, d2, p].forEach((b) => assert.ok(/Sở GD&ĐT ra đề chung cuối kì một số môn lớp 12/.test(b.note), b.id + ": note nhắc đề chung của Sở"));
assert.ok(/câu Viết báo cáo nghiên cứu/.test(p.note), "note của đề ngẫu nhiên nhắc câu Viết của Bài 5");

/* ---------- dạng câu ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 6, "mỗi kho ít nhất 6 câu đúng/sai 4 ý (đoạn “Chung của các phiên lớp 12”)");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
assert.ok(new Set(tf4.map((q) => q.a.filter(Boolean).length)).size >= 2, "câu đúng/sai 4 ý không cùng số ý đúng");
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
  const deBai = BANKS.filter((b) => b.file === "12-van.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
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
// đề “Ôn chủ đề” (Phiên UX14): chủ đề nào cũng dưới 10 câu chấm tự động, nên đề lấy hết câu của chủ đề, đoạn đọc đi trọn
TOPICS.filter((t) => t !== "Viết").forEach((t) => {
  const tb = Quiz.topicBank([d1, d2, p], t, { id: "chu-de", title: t });
  const co = kho.filter((q) => q.topic === t && q.type !== "essay").length;
  assert.ok(co < Quiz.TOPIC_N && tb.questions.length === co && tb.n === co, `Ôn chủ đề «${t}»: lấy hết ${co} câu`);
  const d = Quiz.draw(tb);
  assert.equal(d.notes.length, 0, `Ôn chủ đề «${t}»: rút có ghi chú`);
  assert.equal(d.questions.length, co);
});

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Rút cùng lúc: đề “Ôn chủ đề” rút chung cả chủ đề (cả câu Biết của hai đề), đề ngẫu nhiên rút một đoạn mỗi bài và một câu mỗi ô khác,
   nên mọi cặp câu khác nhau đều có thể ra cùng lúc, trừ hai câu Viết (ô rút 1 câu, đề “Ôn chủ đề” bỏ câu tự luận). Đáp án (lựa chọn
   đúng, đáp án điền) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có trong đề bài, lựa chọn,
   lời giải, đáp án hay đoạn đọc (khác đoạn của câu này) của câu kia thì in ra với DO_LO=1 để xem tay; danh sách đã xem ở DA_XEM. */
const tu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const cungLuc = (a, b) => a !== b && !(a.topic === "Viết" && b.topic === "Viết");
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
// đã xem (Phiên N12-ck1-van): chữ chung, không làm lộ đáp án. “đặt câu hỏi”: chữ của nhan đề «Học cách đặt câu hỏi» và của
// chính đoạn đọc, câu kia không nói gì về luận đề.
const DA_XEM = ["de1#8 → de1#7: đặt câu hỏi", "de1#9 → de1#7: đặt câu hỏi"];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = motCau("bước ra từ bức tranh xưng tên"), b = motCau("Câu nào dưới đây có dùng điển cố");
  const gia = Object.assign({}, b, { x: b.x + " Nàng tiên trong tranh tên là Giáng Kiều." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => / giáng kiều$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const boChuoi = (texts, k) => { const set = new Set(); texts.forEach((t) => chuoi(t, k).forEach((c) => set.add(c))); return set; };
const truong = (q) => chu(q).concat(q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].title, PSG[q.p].text] : []);
if (SACH.length) {
  assert.ok(SACH.some((f) => /ngu-van-12-tap-1/.test(f)), "OnUp-Book có Ngữ văn 12 tập một");
  const texts = SACH.map((f) => fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]* ===/g, " "));
  const bao = (k) => { const set = boChuoi(texts, k); return kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`))); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const khac = BANKS.filter((b) => !/^van12-ck1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)
    .map((q) => chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).join(" | ")));
  const bao = (k) => { const set = boChuoi(khac, k); return kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại, đối chiếu bằng code; kho " + kho.length + " câu (" + rieng.length + " câu Viết riêng), " + Object.keys(PSG).length + " đoạn đọc, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; " + tf4.length + " câu đúng/sai 4 ý; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn.");
console.log("VAN12 OK");
