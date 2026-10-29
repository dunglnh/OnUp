// Kiểm tra ngân hàng Ngữ văn 9 cuối năm của Phiên N9-ck2-van (data/banks/9-van.js, van9-ck2-*), theo mẫu tests/van9-gk2.js.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho
// lớp 9 (đoạn “Chung của các phiên lớp 9” của docs/KE-HOACH-NOI-DUNG.md), bốn chủ đề đọc hiểu như kho Ngữ văn 6 cuối năm.
// Đọc lại bằng code: thể thơ, vần chân của ba bài thơ người soạn viết (Tri thức ngữ văn Bài 7: thơ sáu chữ, bảy chữ, tám chữ theo
// số tiếng mỗi dòng; vần liền, vần cách), rồi tính lại đáp án các câu về thể thơ, tiếng hiệp vần, từ lặp ở đầu dòng; các mốc giờ,
// hướng bóng nắng, cốc nước đá, loại bút của ba truyện trinh thám; các mốc năm, thế kỉ, bảng tóm tắt của ba văn bản thông tin; câu
// nêu ý kiến chủ quan («Theo tôi») và các câu chép đúng từ văn bản nghị luận; tên viết tắt các tổ chức quốc tế (chữ cái đầu của tên
// tiếng Anh, tên tiếng Việt đi kèm, lần đầu xuất hiện trong đoạn đọc có tên đầy đủ, chữ viết sai chỉ ở lựa chọn sai); câu bị động,
// câu đổi trật tự từ ngữ, câu chuyển cụm chủ ngữ – vị ngữ thành cụm danh từ (so các từ của hai câu); trạng ngữ, kiểu câu ghép theo
// kết từ, biện pháp tu từ theo dấu hiệu trong câu (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho).
// Rồi kiểm tra ma trận, đoạn đọc (mỗi đề cố định và phần câu riêng có một đoạn mỗi chủ đề đọc hiểu: Bài 6, 7 mức 1-2-3; Bài 8, 9 mức
// 1-2-3-3; đúng một truyện dừng trước khi người điều tra nói ra lời giải), câu Viết (chỉ tự luận, 4–6 ý chấm, cùng tổng điểm; nghị
// luận về một vấn đề cần giải quyết, thuyết minh, truyện trinh thám), dạng câu (đúng/sai 4 ý không lặp kiểu Đ/S, có câu trả lời
// ngắn), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa
// chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề, đề bài không trùng, phần ôn Bài 6–7 không dùng lại ví dụ của kho giữa kì II
// và của sách, rút thử nhiều lần (đúng ma trận, trọn đoạn, gặp đủ kho; đã làm hết một đề cố định thì không rút lại câu của đề đó) và
// dò lộ đáp án giữa các câu rút được cùng lúc (chuỗi 3 từ liền nhau của đáp án; đáp án ngắn thì cả đáp án) ở đề bài, lựa chọn, lời
// giải, đáp án, đoạn đọc của câu kia; DO_LO=1 in ra để xem tay, danh sách đã xem ở DA_XEM.
// Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ (cả đoạn đọc, thang chấm) với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp
// nguyên âm (tên tổ chức quốc tế nhiều chữ tính là một từ): không có chuỗi 8 từ liền nhau trùng sách; DO_SACH=1 in cả chuỗi 6 từ.
// So thêm với mọi câu của các kho khác, cả câu riêng của các đề ngẫu nhiên: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/van9-ck2.js → in VAN9 CK2 OK.
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
const S = { de1: "van9-ck2-de1", de2: "van9-ck2-de2", pool: "van9-ck2-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- tiếng, thanh, vần (như tests/van9-gk2.js) ---------- */
const TRAC = /[̣́̉̃]/; // sắc, hỏi, ngã, nặng
const tieng = (s) => String(s).normalize("NFC").replace(/[«»“”"(),.;:!?…–—]/g, " ").split(/\s+/).filter(Boolean);
const thanh = (t) => (TRAC.test(t.normalize("NFD")) ? "T" : "B");
const van = (t) => t.normalize("NFD").replace(/[̣̀́̉̃]/g, "").normalize("NFC").toLowerCase()
  .replace(/^(ngh|ng|gh|gi|kh|ph|th|tr|ch|nh|qu|b|c|d|đ|g|h|k|l|m|n|p|r|s|t|v|x)(?=[aăâeêioôơuưy])/, "");
const hiepVan = (a, b) => van(a) === van(b) && thanh(a) === thanh(b);
const khoTho = (p) => p.text.split(/\n\s*\n/).map((k) => k.split("\n").map((l) => l.trim()).filter((l) => l && !/^\(/.test(l))).filter((k) => k.length);
const cuoi = (l) => { const w = tieng(l); return w[w.length - 1]; };
const kieuVan = (k) => {
  const c = k.map(cuoi), v = (i, j) => hiepVan(c[i], c[j]);
  if (v(0, 1) && v(2, 3) && !v(1, 2)) return "lien";
  if (v(1, 3) && !v(0, 1) && !v(2, 3)) return "cach";
  return "khac";
};
const THO = { "hang-cau": [7, "cach"], "trong-truong": [6, "lien"], "song-que": [8, "cach"] }; // mã đoạn: [số tiếng mỗi dòng, kiểu vần]

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => { assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 9); assert.equal(b.subject, "Ngữ văn"); assert.equal(b.file, "9-van.js"); });
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
assert.ok(rieng.length >= d1.n, "đề ngẫu nhiên có khoảng 25 câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
{
  const own = [...new Set(rieng.filter((q) => q.p).map((q) => q.p))], k1 = Object.keys(d1.passages), k2 = Object.keys(d2.passages);
  assert.equal(new Set(k1.concat(k2, own)).size, k1.length + k2.length + own.length, "mã đoạn đọc không trùng nhau");
  assert.equal(Object.keys(PSG).length, k1.length + k2.length + own.length, "đoạn đọc nào cũng có câu dùng");
}
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("van9-ck2-", "") + "#" + (i + 1))));
// lời dặn đầu đề: có câu về đề chung của Sở (đề cuối kì lớp 9); không nêu thể thơ (câu đọc hiểu hỏi thể thơ)
[d1, d2, p].forEach((b) => {
  assert.ok(/Sở GD&ĐT ra đề chung cuối kì một số môn lớp 9/.test(b.note), b.id + ": lời dặn có câu về đề chung của Sở");
  assert.ok(!/(sáu|bảy|tám) chữ/.test(b.note), b.id + ": lời dặn không nêu thể thơ");
});

/* ---------- thơ: số tiếng, khổ, vần ---------- */
const laTho = (id) => Object.prototype.hasOwnProperty.call(THO, id);
Object.keys(PSG).forEach((id) => assert.ok(laTho(id) || !/\(thơ /.test(PSG[id].title), "bài thơ chưa có trong THO: " + id));
Object.entries(THO).forEach(([id, [so, kieu]]) => {
  const K = khoTho(PSG[id]);
  K.forEach((k, i) => {
    assert.equal(k.length, 4, `${id}, khổ ${i + 1}: bốn dòng`);
    k.forEach((l, j) => assert.equal(tieng(l).length, so, `${id}, khổ ${i + 1}, dòng ${j + 1}: ${so} tiếng («${l}»)`));
    assert.equal(kieuVan(k), kieu, `${id}, khổ ${i + 1}: vần ${kieu}`);
  });
  assert.ok(K.length >= 3, id + ": ít nhất ba khổ");
});
assert.deepEqual(Object.values(THO).map((v) => v[0]).sort(), [6, 7, 8], "ba bài thơ: sáu chữ, bảy chữ, tám chữ");

/* ---------- đáp án tính lại bằng code ---------- */
const soTiengTho = (id) => [...new Set(khoTho(PSG[id]).flat().map((l) => tieng(l).length))];
const THE = { 6: "Thơ sáu chữ", 7: "Thơ bảy chữ", 8: "Thơ tám chữ" };
const tu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const tuiTu = (s) => tu(s).sort().join(" "); // các từ của một câu, không kể thứ tự
const trich = (s) => [...String(s).matchAll(/«([^»]+)»/g)].map((m) => m[1]); // các đoạn trong «»
const gio = (t, re) => { const m = re.exec(t); assert.ok(m, String(re)); return +m[1] * 60 + +m[2]; };
const LA_MA = (r) => { const v = { I: 1, V: 5, X: 10, L: 50 }; let s = 0; for (let i = 0; i < r.length; i++) { const a = v[r[i]], b = v[r[i + 1]] || 0; s += a < b ? -a : a; } return s; };
const CHECKS = [
  /* ---- truyện trinh thám ---- */
  { id: S.de1, has: "chiếc mô hình biến mất trong khoảng thời gian nào", right: () => {
    const t = PSG["bong-cot-co"].text, a = /(\d+) giờ (\d+), thầy khoá cửa/.exec(t), b = /(\d+) giờ (\d+) quay lại/.exec(t);
    assert.ok(a && b && /^Chiều thứ Sáu/.test(t) && gio(t, /(\d+) giờ (\d+), thầy khoá cửa/) < gio(t, /(\d+) giờ (\d+) quay lại/), "mốc giờ của buổi chiều");
    return `Từ ${a[1]} giờ ${a[2]} đến ${b[1]} giờ ${b[2]} chiều thứ Sáu`;
  } },
  { id: S.de1, has: "Chi tiết «bóng cột cờ đổ dài về phía tây» trong lời Khoa", right: (q) => {
    // buổi chiều (từ 1 đến 6 giờ chiều) mặt trời ở phía tây, bóng đổ về phía ngược lại; Khoa kể bóng đổ về phía phòng y tế
    const t = PSG["bong-cot-co"].text, NGUOC = { tây: "đông", đông: "tây" };
    const h = +/(\d+) giờ (\d+), thầy khoá cửa/.exec(t)[1]; assert.ok(h >= 1 && h <= 6, "giờ buổi chiều");
    const bong = NGUOC["tây"], khoa = /bóng cột cờ đổ dài về phía ([^\s,.]+), chạm tới bồn hoa trước phòng y tế/.exec(t)[1];
    assert.ok(new RegExp("Phòng y tế ở phía " + khoa + " cột cờ, phòng trưng bày ở phía " + bong).test(t), "vị trí hai phòng khớp hướng bóng");
    assert.notEqual(khoa, bong, "hướng bóng Khoa kể không thể có vào buổi chiều");
    assert.ok(new RegExp("bóng cột cờ phải đổ về phía " + bong).test(t) && new RegExp("hướng về phòng trưng bày").test(t), "Minh giải thích đúng hướng bóng");
    assert.ok(/Khoa đỏ mặt nhận lỗi/.test(t), "Khoa nhận đã nói dối");
    return q.o.find((o) => /Khoa đã nói dối/.test(o));
  } },
  { id: S.de2, has: "ai trong những người được hỏi đã nói sai sự thật", right: (q) => {
    // anh Phong nói cốc nước chanh pha từ gần một tiếng trước; giữa trưa nắng gắt mà đá còn nguyên, mặt bàn khô: cốc vừa mới pha
    const t = PSG["coc-chanh"].text;
    assert.ok(/anh Phong[^«]*chỉ vào cốc nước chanh trên bàn: «Anh pha cốc này từ lúc mới ra ngồi, gần một tiếng rồi/.test(t), "anh Phong nói đã ngồi gần một tiếng");
    assert.ok(/Trưa ấy nắng gắt, mặt bàn nhựa nóng ran/.test(t) && /mấy viên đá còn nguyên cạnh sắc/.test(t) && /mặt bàn quanh đáy cốc vẫn khô/.test(t), "manh mối cốc nước đá");
    return q.o.find((o) => /^Anh Phong, vì đá trong cốc còn nguyên/.test(o));
  } },
  { id: S.pool, has: "Mẩu giấy kẹp dưới chậu cây tuần này được viết bằng gì", right: () => {
    const t = PSG["tuoi-cay"].text, but = /viết bằng (bút máy mực tím)\./.exec(t)[1];
    // hai bạn viết tay trái, mỗi bạn một loại bút: đúng một bạn dùng loại bút của mẩu giấy, và đó là người Ngân bắt gặp
    const m = /hai bạn viết tay trái là (\S+) và (\S+)\. \1 chỉ dùng ([^,]+), còn \2 luôn mang theo cây ([^.]+?) ông nội tặng/.exec(t);
    assert.ok(m, "truyện nêu hai bạn viết tay trái và loại bút của từng bạn");
    const ai = [[m[1], m[3]], [m[2], m[4]]].filter(([, b]) => b === but);
    assert.equal(ai.length, 1, "đúng một bạn viết tay trái dùng bút máy mực tím");
    assert.equal(/(\S+) đang lặng lẽ cầm bình nước tưới/.exec(t)[1], ai[0][0], "người Ngân bắt gặp đúng là bạn suy ra được");
    return but[0].toUpperCase() + but.slice(1);
  } },
  /* ---- thơ ---- */
  { id: S.de1, has: "«Hàng cau trước ngõ» được viết theo thể thơ nào", right: () => { const n = soTiengTho("hang-cau"); assert.equal(n.length, 1); return THE[n[0]]; } },
  { id: S.de2, has: "Mỗi nhận xét sau về bài thơ «Tiếng trống trường»", right: (q) => q.o.map((o, i) => {
    if (/thể thơ sáu chữ, mỗi khổ có hai cặp vần liền/.test(o)) return soTiengTho("trong-truong").join() === "6" && khoTho(PSG["trong-truong"]).every((k) => kieuVan(k) === "lien");
    if (/từ «Nhớ» được lặp lại ở đầu hai dòng thơ liền nhau/.test(o)) {
      const dau = khoTho(PSG["trong-truong"]).pop().map((l) => tieng(l)[0].toLowerCase());
      return dau.filter((w) => w === "nhớ").length === 2 && dau.some((w, j) => w === "nhớ" && dau[j + 1] === "nhớ");
    }
    return q.a[i];
  }) },
  { id: S.pool, has: "tiếng «non» hiệp vần với tiếng", right: () => {
    const k = khoTho(PSG["song-que"])[0]; assert.equal(cuoi(k[1]), "non"); assert.ok(hiepVan(cuoi(k[1]), cuoi(k[3])), "non hiệp vần với tiếng cuối dòng thứ tư");
    return cuoi(k[3]);
  } },
  /* ---- văn bản nghị luận ---- */
  { id: S.de1, has: "Câu nào dưới đây trong văn bản nêu ý kiến chủ quan", right: (q) => {
    // các lựa chọn đều chép đúng câu của văn bản; chỉ một câu có cách diễn đạt đánh dấu ý kiến chủ quan (Tri thức ngữ văn Bài 8)
    q.o.forEach((o) => assert.ok(PSG["tai-nghe"].text.includes(o), "lựa chọn không có trong văn bản: " + o));
    const cq = q.o.filter((o) => /^(Theo tôi|Tôi nghĩ|Tôi tin|Tôi cảm thấy|Theo quan điểm của tôi)\b/.test(o)); assert.equal(cq.length, 1);
    return cq[0];
  } },
  { id: S.de2, has: "Theo ước tính của FAO được dẫn trong văn bản", right: () => {
    const m = /\(FAO\) ước tính (khoảng một phần ba)/.exec(PSG["hat-gao"].text); assert.ok(m); return m[1][0].toUpperCase() + m[1].slice(1);
  } },
  /* ---- văn bản thông tin ---- */
  { id: S.de1, has: "Thành nhà Hồ được xây năm nào, do ai cho xây", right: () => {
    const t = PSG["thanh-da"].text, m = /Năm (\d{4}), ([^,.]+?) cho xây/.exec(t);
    // bảng tóm tắt: các mốc tăng dần, mỗi mốc có ở phần trên của văn bản
    const bang = [...t.matchAll(/^(\d{4}) – (.+)$/gm)].map((x) => +x[1]);
    assert.deepEqual(bang, [1397, 1400, 2011]); assert.deepEqual(bang, [...bang].sort((a, b) => a - b), "bảng theo trật tự thời gian");
    bang.forEach((y) => assert.ok(new RegExp("Năm " + y + ", ").test(t), "mốc " + y + " có trong bài"));
    assert.equal(+m[1], bang[0]);
    return `Năm ${m[1]}, do ${m[2]} cho xây`;
  } },
  { id: S.de2, has: "chùa Thiên Mụ được dựng vào năm nào, dưới thời ai", right: () => {
    const t = PSG["thien-mu"].text, m = /Năm (\d{4}), (chúa \S+ \S+) đi qua vùng này/.exec(t); assert.ok(m);
    // đoạn ba kể các công trình không theo năm xây (lời giải câu về trình tự trình bày)
    const nam = [...t.split("\n")[2].matchAll(/năm (\d{4})/g)].map((x) => +x[1]);
    assert.ok(nam.length >= 2 && nam.join() !== [...nam].sort((a, b) => a - b).join(), "đoạn ba không theo thứ tự năm xây");
    return `Năm ${m[1]}, dưới thời ${m[2]}`;
  } },
  { id: S.pool, has: "các đền tháp ở Mỹ Sơn được xây dựng trong khoảng thời gian nào", right: () => {
    const t = PSG["my-son"].text, m = /Từ thế kỉ ([IVXL]+) đến thế kỉ ([IVXL]+),/.exec(t); assert.ok(m);
    const so = LA_MA(m[2]) - LA_MA(m[1]) + 1; assert.ok(so > 9 && so <= 10 && /gần mười thế kỉ/.test(t), "từ thế kỉ IV đến XIII là gần mười thế kỉ");
    assert.ok(kho.some((q) => q.o && q.o[0] === "Mỹ Sơn – gần mười thế kỉ gạch đỏ Chăm Pa"), "dòng chữ áp phích khớp số thế kỉ");
    return `Từ thế kỉ ${m[1]} đến thế kỉ ${m[2]}`;
  } },
  /* ---- tiếng Việt ---- */
  { id: S.de1, has: "Câu nào dưới đây là câu bị động", right: (q) => {
    // câu bị động: có «được», chủ ngữ là đối tượng; lựa chọn chủ động cùng các từ (bỏ «được»), các lựa chọn khác không có «được»
    const bd = q.o.filter((o) => tu(o).includes("được")); assert.equal(bd.length, 1);
    assert.ok(q.o.some((o) => o !== bd[0] && tuiTu(o) === tu(bd[0]).filter((w) => w !== "được").sort().join(" ")), "có câu chủ động cùng nội dung");
    return bd[0];
  } },
  { id: S.de2, has: "được biến đổi từ câu «Tôi đã đọc đi đọc lại bài thơ ấy nhiều lần.»", right: (q) => {
    const [a, b] = trich(q.q); assert.equal(tuiTu(a), tuiTu(b), "hai câu cùng các từ ngữ, chỉ khác trật tự");
    assert.ok(tu(a).slice(0, 3).join(" ") === "bài thơ ấy" && !tu(a).includes("được"));
    return q.o.find((o) => /^Thay đổi trật tự từ ngữ, đưa «bài thơ ấy» lên đầu câu$/.test(o));
  } },
  { id: S.pool, has: "câu «Sự trở về của đàn cò trắng báo hiệu mùa nước nổi.» đã được biến đổi", right: (q) => {
    const [a, b] = trich(q.q); assert.equal(tu(b).filter((w) => w !== "sự" && w !== "của").sort().join(" "), tuiTu(a), "thêm «sự», «của»: cụm chủ ngữ – vị ngữ thành cụm danh từ");
    return "Gói cụm chủ ngữ – vị ngữ lại thành một cụm danh từ";
  } },
  { id: S.pool, has: "Hai câu «Lặng lẽ, bà ngồi bên cửa sổ.»", right: (q) => {
    const [a, b] = trich(q.q); assert.equal(tuiTu(a), tuiTu(b), "hai câu cùng các từ ngữ"); assert.equal(tu(a)[0] + " " + tu(a)[1], "lặng lẽ");
    return q.o.find((o) => /dáng vẻ lặng lẽ/.test(o));
  } },
  { id: S.de1, has: "Sáng Chủ nhật, ở bãi đất trống ven sông", right: (q) => {
    const c = trich(q.q)[0]; assert.ok(/^Sáng Chủ nhật, ở [^,]+, /.test(c) && / để [^,]+\.$/.test(c), "trạng ngữ thời gian, nơi chốn, mục đích");
    return "Thời gian, nơi chốn và mục đích của việc trồng cây";
  } },
  { id: S.pool, has: "«Nhờ chăm luyện tập mỗi chiều, đội bóng", right: (q) => { assert.ok(/^Nhờ [^,]+, /.test(trich(q.q)[0]), "trạng ngữ chỉ nguyên nhân"); return q.o.find((o) => /^Nguyên nhân/.test(o)); } },
  { id: S.de1, has: "Trong câu «Món quà bà gửi từ quê lên làm cả nhà xúc động.»", right: (q) => {
    const c = trich(q.q)[0], cn = /^(Món quà [^.]+?) làm cả nhà/.exec(c)[1]; assert.ok(tu(cn).length > 2, "chủ ngữ có thêm cụm «bà gửi từ quê lên»");
    return "Chủ ngữ «" + cn + "»";
  } },
  ...["«Đề bài khá dài nhưng cả lớp vẫn làm xong trước giờ nộp.»", "«Tuy nhà xa trường, Hoa chưa bao giờ đi học muộn.»", "«Anh tôi thích bóng đá, còn tôi mê cờ vua.»"].map((cau) => ({
    has: cau + " thuộc kiểu câu ghép nào", right: (q) => {
      // kiểu câu ghép theo kết từ (Tri thức ngữ văn Bài 6): tuy, vì, nếu, để… ở vế phụ là chính phụ; nhưng, còn, và, hoặc nối hai vế ngang hàng là đẳng lập
      const c = trich(q.q)[0], co = (w) => new RegExp("(^|[\\s,])" + w + "(?=[\\s,.])", "i").test(c);
      const phu = ["tuy", "vì", "nếu", "dù", "để", "bởi"].find(co), dang = ["nhưng", "còn", "và", "hoặc"].find(co);
      return phu ? `Câu ghép chính phụ, kết từ «${phu}» ở vế phụ` : `Câu ghép đẳng lập, hai vế nối bằng kết từ «${dang}»`;
    } })).map((c, i) => Object.assign(c, { id: [S.de1, S.de2, S.pool][i] })),
  { id: S.de1, has: "«Những chiếc lá vàng rơi xuống như những cánh bướm", right: (q) => { assert.ok(/ như /.test(trich(q.q)[0])); return "So sánh"; } },
  { id: S.de2, has: "«Tôi nhớ con đường đất đỏ, nhớ mái trường", right: (q) => { assert.ok(tu(trich(q.q)[0]).filter((w) => w === "nhớ").length >= 3, "lặp «nhớ»"); return "Điệp ngữ"; } },
  { id: S.de2, has: "chọn câu ghép «Vì thường xuyên thức khuya nên", right: (q) => { assert.ok(/^Vì .+ nên /.test(trich(q.q)[0])); return q.o.find((o) => /quan hệ nguyên nhân – kết quả/.test(o)); } }
];
CHECKS.forEach((c) => { c.re = new RegExp(c.has.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"); });
let n = 0;
CHECKS.forEach((c) => {
  const m = kho.filter((q) => c.re.test(q.q));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has, want = c.right(q);
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  if (Array.isArray(want)) assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  else assert.equal(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  n++;
});

/* ---------- tên viết tắt các tổ chức quốc tế (Bài 8, tr. 71) ---------- */
const TEN = { // tên viết tắt: [tên tiếng Việt, tên tiếng Anh]
  IMF: ["Quỹ Tiền tệ Quốc tế", "International Monetary Fund"],
  ASEAN: ["Hiệp hội các Quốc gia Đông Nam Á", "Association of South East Asian Nations"],
  WTO: ["Tổ chức Thương mại Thế giới", "World Trade Organization"],
  WHO: ["Tổ chức Y tế Thế giới", "World Health Organization"],
  ILO: ["Tổ chức Lao động Quốc tế", "International Labour Organization"],
  WMO: ["Tổ chức Khí tượng Thế giới", "World Meteorological Organization"],
  WB: ["Ngân hàng Thế giới", "World Bank"],
  APEC: ["Diễn đàn Hợp tác Kinh tế châu Á – Thái Bình Dương", "Asia-Pacific Economic Cooperation"],
  FAO: ["Tổ chức Lương thực và Nông nghiệp Liên hợp quốc", "Food and Agriculture Organization"],
  UNICEF: ["Quỹ Nhi đồng Liên hợp quốc", "United Nations International Children's Emergency Fund"],
  UNESCO: ["Tổ chức Giáo dục, Khoa học và Văn hoá của Liên hợp quốc", "United Nations Educational, Scientific and Cultural Organization"]
};
const SAI = ["IFM", "MIF", "Imf", "ANSEA", "Asean", "asean"]; // cách viết sai cố ý, chỉ ở lựa chọn sai của câu về cách viết
const PHO_BIEN = ["UNESCO"]; // tên viết tắt quen thuộc, đoạn đọc dùng không cần chú thích
const tat = (en) => en.split(/[\s-]+/).filter((w) => !/^(of|and|the)$/i.test(w)).map((w) => w[0].toUpperCase()).join("");
Object.entries(TEN).forEach(([a, [, en]]) => assert.equal(tat(en), a, `${a}: chữ cái đầu của «${en}»`));
{
  const VT = "Tên viết tắt các tổ chức quốc tế", chuCau = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], (q.rubric || []).map((r) => r.c));
  const all = kho.flatMap(chuCau).concat(Object.values(PSG).map((x) => x.text)).join("\n");
  // mọi chữ in hoa 2–6 chữ cái là tên viết tắt có trong bảng, chữ viết sai cố ý, số La Mã hoặc tên SIM của thẻ điện thoại
  const lạ = [...new Set(all.match(/\b[A-Z]{2,6}\b/g))].filter((w) => !TEN[w] && !SAI.includes(w) && !/^[IVXL]+$/.test(w) && w !== "SIM");
  assert.deepEqual(lạ, [], "chữ viết tắt chưa có trong bảng");
  // tên tiếng Việt đi với đúng tên viết tắt của nó
  Object.entries(TEN).forEach(([a, [vi]]) => Object.keys(TEN).filter((b) => b !== a).forEach((b) => {
    [vi + " (" + b + ")", vi + " là " + b, b + " là " + vi].forEach((s) => assert.ok(!all.includes(s), "ghép sai tên: " + s));
  }));
  // đoạn đọc: lần đầu nhắc tới một tổ chức chưa thật phổ biến thì có tên đầy đủ, tên viết tắt trong ngoặc; về sau chỉ cần tên viết tắt
  Object.entries(PSG).forEach(([id, ps]) => Object.entries(TEN).filter(([a]) => !PHO_BIEN.includes(a)).forEach(([a, [vi]]) => {
    const i = ps.text.search(new RegExp("\\b" + a + "\\b"));
    if (i >= 0) assert.equal(ps.text.slice(i - vi.length - 2, i), vi + " (", `${id}: lần đầu nhắc ${a} có tên đầy đủ`);
  }));
  // chữ viết sai chỉ ở lựa chọn sai của câu về cách viết tên viết tắt (và lời giải của câu ấy, chỉ ra vì sao sai)
  kho.forEach((q) => chuCau(q).forEach((s) => SAI.forEach((w) => {
    if (new RegExp("\\b" + w + "\\b").test(s)) assert.ok(q.topic === VT && q.o && (q.o.indexOf(s) > 0 || s === q.x), `«${w}» ở chỗ không phải lựa chọn sai: ${ten.get(q)}`);
  })));
  // câu hỏi tên viết tắt theo tên tiếng Anh: đáp án là chữ cái đầu, đúng trật tự, in hoa
  kho.filter((q) => q.topic === VT && /tên tiếng Anh: /.test(q.q)).forEach((q) => { assert.equal(q.o[0], tat(/tên tiếng Anh: ([^)]+)\)/.exec(q.q)[1])); n++; });
  // câu hỏi nghĩa của tên viết tắt trong ngữ cảnh: đáp án là tên tiếng Việt của tổ chức ấy
  kho.filter((q) => q.topic === VT && /([A-Z]{2,6}) là tổ chức nào\?$/.test(q.q)).forEach((q) => { assert.equal(q.o[0], TEN[/([A-Z]{2,6}) là tổ chức nào\?$/.exec(q.q)[1]][0]); n++; });
  // câu chọn cách viết đúng: đáp án có tên viết tắt đúng, mỗi lựa chọn sai có đúng một chữ viết sai
  kho.filter((q) => q.topic === VT && /viết đúng tên viết tắt của (.+)\?$/.test(q.q)).forEach((q) => {
    const a = Object.keys(TEN).find((k) => TEN[k][0] === /viết đúng tên viết tắt của (.+)\?$/.exec(q.q)[1]);
    assert.ok(a && new RegExp("\\b" + a + "\\b").test(q.o[0])); q.o.slice(1).forEach((o) => assert.equal(SAI.filter((w) => new RegExp("\\b" + w + "\\b").test(o)).length, 1));
    n++;
  });
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
  if (v[l - 1]) assert.ok(dem(rieng, t, l) >= 1, `ô (${t}, mức ${l}) chưa có câu riêng`);
}));
// bốn chủ đề đọc hiểu theo tên Bài 6–9: mỗi đề cố định và phần câu riêng có đúng một đoạn mỗi chủ đề, đúng mức
const docHieu = TOPICS.filter((t) => t !== "Viết" && kho.some((q) => q.topic === t && q.p));
assert.deepEqual(docHieu, ["Giải mã những bí mật", "Hồn thơ muôn điệu", "Tiếng nói của lương tri", "Đi và suy ngẫm"], "bốn chủ đề đọc hiểu theo tên Bài 6–9");
const MUC = { "Giải mã những bí mật": "1,2,3", "Hồn thơ muôn điệu": "1,2,3", "Tiếng nói của lương tri": "1,2,3,3", "Đi và suy ngẫm": "1,2,3,3" };
docHieu.forEach((t) => {
  assert.ok(kho.filter((q) => q.topic === t).every((q) => q.p), t + ": mọi câu có đoạn đọc");
  [S.de1, S.de2, S.pool].forEach((id) => {
    const qs = kho.filter((q) => q.topic === t && q.src === id), ps = [...new Set(qs.map((q) => q.p))];
    assert.equal(ps.length, 1, `${id}, ${t}: một đoạn`);
    assert.equal(qs.map((q) => q.lv).join(), MUC[t], `${id}, ${t}: mức như lời giao việc`);
  });
});
Object.keys(PSG).forEach((id) => assert.equal(new Set(kho.filter((q) => q.p === id).map((q) => q.topic)).size, 1, id + ": một chủ đề đọc hiểu"));
// Bài 6 là truyện, Bài 7 là thơ; đúng một truyện dừng ở câu người điều tra nói đã biết phải hỏi ai (câu Vận dụng hỏi người nói sai)
{
  const truyen = [...new Set(kho.filter((q) => q.topic === docHieu[0]).map((q) => q.p))], tho = [...new Set(kho.filter((q) => q.topic === docHieu[1]).map((q) => q.p))];
  truyen.forEach((x) => assert.ok(!laTho(x) && /\(truyện /.test(PSG[x].title), x + ": truyện trinh thám"));
  assert.deepEqual(tho.sort(), Object.keys(THO).sort(), "chủ đề thơ dùng ba bài thơ");
  const dung = truyen.filter((x) => /«[^»]*biết phải hỏi lại ai rồi\.»$/.test(PSG[x].text.trim()));
  assert.equal(dung.length, 1, "đúng một truyện dừng trước khi nói ra lời giải");
  const q3 = kho.find((q) => q.p === dung[0] && q.lv === 3); assert.ok(/nói sai sự thật/.test(q3.q), "câu Vận dụng của truyện ấy hỏi người nói sai");
  assert.ok(!/Phong/.test(PSG[dung[0]].text.trim().split("\n").pop()), "câu cuối không nói ra tên người");
}
// Bài 8: văn bản nghị luận có thông tin khách quan (số liệu dẫn nguồn) và ý kiến chủ quan; Bài 9: văn bản giới thiệu di tích
[...new Set(kho.filter((q) => q.topic === docHieu[2]).map((q) => q.p))].forEach((x) => {
  const t = PSG[x].text; assert.ok(/\((WHO|FAO|UNICEF)\)/.test(t) && /(Theo tôi|Tôi không nghĩ)/.test(t), x + ": có số liệu dẫn nguồn và ý kiến chủ quan");
});
[...new Set(kho.filter((q) => q.topic === docHieu[3]).map((q) => q.p))].forEach((x) => assert.ok(/\b(1[0-9]|20)\d{2}\b/.test(PSG[x].text), x + ": văn bản giới thiệu có mốc năm hình thành"));
// câu không có đoạn đọc chỉ ở Tiếng Việt, Viết; câu Tiếng Việt không trỏ tới đoạn đọc
assert.ok(kho.filter((q) => !q.p).every((q) => !docHieu.includes(q.topic)), "câu không có đoạn đọc chỉ ở Tiếng Việt, Viết");
assert.ok(kho.filter((q) => !docHieu.includes(q.topic)).every((q) => !q.p), "câu Tiếng Việt, Viết không dùng đoạn đọc");
const viet = kho.filter((q) => q.topic === "Viết");
assert.ok(viet.every((q) => q.type === "essay") && kho.filter((q) => q.type === "essay").every((q) => q.topic === "Viết"), "chủ đề Viết chỉ gồm câu tự luận, tự luận chỉ ở Viết");
viet.forEach((q) => {
  assert.ok(q.rubric.length >= 4 && q.rubric.length <= 6, "câu Viết có 4–6 ý chấm: " + q.q.slice(0, 50));
  assert.equal(sum(q.rubric.map((r) => r.p)), sum(viet[0].rubric.map((r) => r.p)), "các câu Viết cùng tổng điểm");
  assert.ok(/^Dàn ý gợi ý/.test(q.x) && q.x.length > 400, "câu Viết có dàn ý gợi ý: " + q.q.slice(0, 50));
});
// kiểu bài Viết: nghị luận về một vấn đề cần giải quyết (Bài 8), thuyết minh về danh lam thắng cảnh, di tích lịch sử (Bài 9), mỗi
// kiểu hai câu, Đề 1 nghị luận, Đề 2 thuyết minh; truyện trinh thám (Bài 6) một câu riêng
[[/^Viết bài văn nghị luận \(khoảng 500–600 chữ\) về /, 2, S.de1], [/^Viết bài văn thuyết minh \(khoảng 500–600 chữ\) giới thiệu một (danh lam thắng cảnh|di tích lịch sử)/, 2, S.de2],
  [/^Viết một truyện ngắn theo lối truyện trinh thám/, 1, null]].forEach(([re, k, de]) => {
  const qs = viet.filter((q) => re.test(q.q)); assert.equal(qs.length, k, "kiểu bài Viết: " + re);
  if (de) assert.equal(qs.filter((q) => q.src === de).length, 1, de + ": câu Viết " + re);
});
assert.ok(viet.some((q) => /danh lam thắng cảnh/.test(q.q) && /phi ngôn ngữ/.test(q.q)) && viet.some((q) => /di tích lịch sử/.test(q.q) && /bảng/.test(q.q)), "bài thuyết minh có sơ đồ, bảng biểu, hình ảnh");
// lời trong đề bài, lựa chọn, thang chấm, lời giải gọi người làm bài là “bạn”, không gọi “em” (CLAUDE.md)
kho.forEach((q) => assert.ok(!/(của em|em hãy|Em hãy|theo em|Theo em)\b/.test([q.q, q.x].concat(q.o || [], (q.rubric || []).map((r) => r.c)).join(" ")), "gọi người làm bài là «bạn»: " + ten.get(q)));

/* ---------- dạng câu ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 4, "mỗi kho ít nhất 4 câu đúng/sai 4 ý");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
assert.ok(kho.some((q) => q.type === "fill"), "có câu trả lời ngắn (điền)");
assert.ok(kho.every((q) => ["mc", "tf4", "fill", "essay"].includes(q.type)), "chỉ dùng dạng câu của khung Công văn 7991 và tự luận");
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của ý: " + ten.get(q)));
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
/* ---------- phần ôn Bài 6–7 không dùng lại ví dụ của kho giữa kì II và ví dụ của sách (lời giao việc: đề cuối năm) ----------
   Câu tiếng Việt cùng chủ đề với kho giữa kì II: câu, từ ngữ trích trong «» không có chuỗi 4 từ trùng chữ của kho ấy; từ ngữ hỏi về
   sự phát triển của từ vựng khác từ ngữ của kho ấy và ví dụ, bài tập của sách (Bài 7, tr. 54). */
{
  const gk2 = bank("van9-gk2-ngau-nhien").questions, chung = TOPICS.filter((t) => gk2.some((q) => q.topic === t) && !docHieu.includes(t) && t !== "Viết");
  assert.deepEqual(chung, ["Lựa chọn câu đơn hoặc câu ghép", "Các kiểu câu ghép", "Sự phát triển của từ vựng", "Biện pháp tu từ"], "chủ đề tiếng Việt ôn Bài 6–7");
  const chuoi4 = (s) => { const w = tu(s), r = []; for (let i = 0; i + 4 <= w.length; i++) r.push(w.slice(i, i + 4).join(" ")); return r; };
  const cu = new Set(gk2.filter((q) => chung.includes(q.topic)).flatMap((q) => [q.q, q.x].concat(q.o || [])).flatMap(chuoi4));
  kho.filter((q) => chung.includes(q.topic)).forEach((q) => trich(q.q).forEach((c) => chuoi4(c).forEach((k) => assert.ok(!cu.has(k), `${ten.get(q)}: «${k}» đã có ở kho giữa kì II`))));
  const SACH_PT = ["ngôi sao", "chuột", "kinh tế tri thức", "năng lượng xanh", "máy bay không người lái", "sốt giá", "dữ liệu lớn", "thư viện số", "thư điện tử",
    "in-tơ-nét", "jean", "pop", "photocopy", "mít tinh", "ngân hàng", "cổng", "gạo cội", "lăn tăn"];
  const daHoi = new Set(SACH_PT.concat(gk2.filter((q) => q.topic === "Sự phát triển của từ vựng").flatMap((q) => trich(q.q).concat(q.o || [])).map((s) => s.toLowerCase())));
  kho.filter((q) => q.topic === "Sự phát triển của từ vựng").forEach((q) => trich(q.q).filter((c) => tu(c).length <= 3).forEach((c) => assert.ok(!daHoi.has(c.toLowerCase()), `${ten.get(q)}: «${c}» là ví dụ đã có`)));
  n++;
}

/* ---------- rút thử ---------- */
const seen = new Set();
for (let k = 0; k < 600; k++) {
  const d = Quiz.draw(p);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, p.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  docHieu.forEach((t) => {
    const ps = [...new Set(d.questions.filter((q) => q.topic === t).map((q) => q.p))];
    assert.equal(ps.length, 1, t + ": rút trọn một đoạn");
    assert.equal(d.questions.filter((q) => q.p === ps[0]).length, kho.filter((q) => q.p === ps[0]).length, t + ": lấy cả đoạn " + ps[0]);
  });
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.equal(seen.size, kho.length, "600 lần rút thử phải gặp đủ câu của kho");
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
   Rút cùng lúc: khác chủ đề; cùng chủ đề mà khác mức; cùng ô (chủ đề, mức) mà ô rút từ 2 câu trở lên. Đáp án (lựa chọn đúng, đáp án
   điền) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có trong đề bài, lựa chọn, lời giải,
   đáp án, thang chấm hay đoạn đọc (khác đoạn của câu này) của câu kia thì in ra với DO_LO=1 để xem tay; danh sách đã xem ở DA_XEM. */
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const cungLuc = (a, b) => a !== b && !(a.topic === b.topic && a.lv === b.lv && M[a.topic][a.lv - 1] <= 1);
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], (q.rubric || []).map((r) => r.c)).map(String);
const doLo = (qs, tenCau) => {
  const ra = [];
  qs.forEach((q) => {
    const dap = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : [];
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
// chuỗi là tên biện pháp tu từ, thuật ngữ ngữ pháp có ở khắp kho (Rút ra N9): không tính là lộ đáp án
const TU_CHUNG = new Set(["so sánh", "nhân hoá", "hoán dụ", "ẩn dụ", "điệp ngữ", "liệt kê", "câu hỏi tu từ", "câu ghép đẳng", "ghép đẳng lập", "câu ghép chính", "ghép chính phụ",
  "cụm chủ ngữ", "chủ ngữ vị", "ngữ vị ngữ", "vị ngữ thành", "ngữ thành cụm", "thành cụm danh", "cụm danh từ", "quan hệ nguyên", "hệ nguyên nhân", "nguyên nhân kết", "nhân kết quả"]);
const lo = doLo(kho, (q) => ten.get(q)).filter((s) => !TU_CHUNG.has(s.split(": ").pop()));
if (process.env.DO_LO) console.log("Đáp án có ở câu rút được cùng lúc (xem tay):\n" + lo.join("\n"));
const DA_XEM = [];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = kho.find((q) => /chùa Thiên Mụ được dựng vào năm nào/.test(q.q)), b = kho.find((q) => /Câu nào dưới đây là câu bị động/.test(q.q));
  const gia = Object.assign({}, b, { x: b.x + " Chùa Thiên Mụ dựng năm 1601, dưới thời chúa Nguyễn Hoàng." });
  assert.ok(doLo([a, gia], (q) => q.topic).some((s) => / chúa nguyễn hoàng$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => String(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
// tên tổ chức quốc tế nhiều chữ, danh hiệu «Di sản văn hoá thế giới» tính là một từ (tên riêng, không phải câu chép của sách)
const TEN_RIENG = Object.values(TEN).map(([vi]) => vi).concat(["Di sản văn hoá thế giới"]).map(khongDau).filter((s) => s.split(" ").length > 3).sort((a, b) => b.length - a.length);
const tuKD = (s) => { let k = " " + khongDau(s) + " "; TEN_RIENG.forEach((r) => { k = k.split(" " + r + " ").join(" " + r.replace(/ /g, "") + " "); }); return k.split(" ").filter(Boolean); };
const chuoi = (s, k) => { const w = tuKD(s), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const truong = (q) => chu(q).concat(q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].title, PSG[q.p].text] : []);
const boChuoi = (texts, k) => { const set = new Set(); texts.forEach((t) => { const w = tuKD(t); for (let i = 0; i + k <= w.length; i++) set.add(w.slice(i, i + k).join(" ")); }); return set; };
if (SACH.length) {
  assert.ok(SACH.some((f) => /ngu-van-9-tap-2/.test(f)), "OnUp-Book có Ngữ văn 9 tập hai");
  const texts = SACH.map((f) => fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]* ===/g, " "));
  const bao = (k) => { const set = boChuoi(texts, k); return kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`))); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const khac = BANKS.filter((b) => !/^van9-ck2-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)
    .map((q) => chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).join(" | ")));
  const bao = (k) => { const set = boChuoi(khac, k); return kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại, đọc lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn đọc, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn.");
console.log("VAN9 CK2 OK");
