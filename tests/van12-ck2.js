// Kiểm tra ngân hàng Ngữ văn 12 cuối năm của Phiên N12-ck2-van (data/banks/12-van.js, van12-ck2-*), theo mẫu tests/van12-gk2.js,
// tests/van9-ck2.js. Kho = Đề 1 + Đề 2 + câu Viết riêng của đề ngẫu nhiên (đủ bốn kiểu bài Viết của Bài 6–9, như kho cuối kì I). Số câu,
// số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 của kho lớp 12 (đoạn “Chung của các phiên lớp 12” của
// docs/KE-HOACH-NOI-DUNG.md).
// Đọc lại bằng code: bài thơ tám chữ người soạn viết (số tiếng từng dòng, khổ bốn dòng, vần chân cách: cùng vần, cùng thanh bằng hoặc
// trắc), bảng số lượt mượn sách (tổng mỗi năm, tỉ lệ đọc sách, loại sách duy nhất tăng hơn một phần ba) và bảng lượng nước mưa từng tháng
// (tổng của mười hai tháng, số tháng không thu được nước) của hai văn bản thông tin, các mốc giờ của bài phóng sự, rồi tính lại đáp án các
// câu có số liệu, các ý đúng/sai 4 ý, các câu hỏi chi tiết (đối chiếu chữ của đoạn đọc) và các câu tiếng Việt nhận ra một biện pháp, một
// dấu hiệu (chỉ một lựa chọn có dấu hiệu được hỏi; CHECKS: nhận câu bằng một đoạn chữ của đề, đúng một câu trong kho).
// Rồi kiểm tra ma trận, đoạn đọc (mỗi đề cố định một đoạn mỗi chủ đề đọc hiểu: Bài 6, 7 đoạn 3 câu mức 1-2-3; Bài 8, 9 đoạn 4 câu mức
// 1-2-3-3), phần trọng tâm Bài 8–9 nhiều câu hơn hẳn phần ôn Bài 6–7, câu ôn mang đúng chữ chủ đề của kho giữa kì II, câu Viết (chỉ tự
// luận, tự chấm, tổng 4 điểm như câu bài văn của đề tốt nghiệp, đủ bốn kiểu bài Viết của Bài 6–9), note (phạm vi, câu về đề chung của
// Sở), dạng câu (ít nhất 6 câu đúng/sai 4 ý không lặp kiểu Đ/S, có câu điền), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn
// dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề, đề bài không
// trùng, rút thử nhiều lần (đúng ma trận, trọn một đoạn mỗi bài, gặp đủ câu; đã làm hết một đề cố định thì không rút lại câu của đề đó),
// đề “Ôn chủ đề” (rút chung câu cùng chủ đề của mọi kho Ngữ văn 12), dò lộ đáp án giữa các câu rút được cùng lúc (chuỗi 3 từ liền nhau
// của đáp án; đáp án ngắn thì cả đáp án) ở đề bài, lựa chọn, lời giải, đáp án, đoạn đọc của câu kia: mọi cặp câu trừ hai câu Viết (đề
// “Ôn chủ đề” rút chung cả chủ đề), và mọi cặp câu cùng chủ đề của kho này với kho giữa kì II; DO_LO=1 in ra để xem tay, danh sách đã
// xem ở DA_XEM. So với kho giữa kì II (đoạn “Chung của các phiên lớp 12 cuối năm”): câu ôn không trùng đề bài, chuỗi 6 từ của đề bài,
// đáp án câu cùng chủ đề; câu ví dụ trong «» của câu tiếng Việt không dùng lại ví dụ của kho đó; so với kho cuối kì I, giữa kì II: đề bài
// không gần trùng (cặp hai âm tiết chung), đoạn đọc không dùng lại câu văn, dòng thơ.
// Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ (cả đoạn đọc, thang chấm) với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp
// nguyên âm: không có chuỗi 8 từ liền nhau trùng sách; DO_SACH=1 in cả chuỗi 6 từ. So thêm với mọi câu của các kho khác, cả câu riêng
// của các đề ngẫu nhiên: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ.
// Chạy: node tests/van12-ck2.js → in VAN12 CK2 OK.
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
const S = { de1: "van12-ck2-de1", de2: "van12-ck2-de2", pool: "van12-ck2-ngau-nhien" };
const GK2 = { de1: "van12-gk2-de1", de2: "van12-gk2-de2", pool: "van12-gk2-ngau-nhien" };
const CK1 = { de1: "van12-ck1-de1", de2: "van12-ck1-de2", pool: "van12-ck1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- tiếng, thanh, vần ---------- */
const TRAC = /[̣́̉̃]/; // sắc, hỏi, ngã, nặng
const tieng = (s) => String(s).normalize("NFC").replace(/[«»“”"(),.;:!?…–—]/g, " ").split(/\s+/).filter(Boolean);
const thanh = (t) => (TRAC.test(t.normalize("NFD")) ? "T" : "B");
// vần: bỏ dấu thanh (giữ mũ, trăng, móc), bỏ phụ âm đầu; “gi”, “qu” tính là phụ âm đầu
const van = (t) => t.normalize("NFD").replace(/[̣̀́̉̃]/g, "").normalize("NFC").toLowerCase()
  .replace(/^(ngh|ng|gh|gi|kh|ph|th|tr|ch|nh|qu|b|c|d|đ|g|h|k|l|m|n|p|r|s|t|v|x)(?=[aăâeêioôơuưy])/, "");
// số đếm bằng chữ (đến 99) và giờ: “mười một giờ đêm” → 23
const SO = { một: 1, mốt: 1, hai: 2, ba: 3, bốn: 4, tư: 4, năm: 5, lăm: 5, sáu: 6, bảy: 7, tám: 8, chín: 9 };
const docSo = (s) => { const w = tieng(s.toLowerCase()); let n = 0; w.forEach((t) => { if (t === "mười") n += 10; else if (t === "mươi") n *= 10; else if (t in SO) n += SO[t]; else throw new Error("không đọc được số: " + s); }); return n; };
const gio = (s) => { const m = /^(.+?) giờ (sáng|trưa|chiều|tối|đêm)$/.exec(s.toLowerCase().trim()); assert.ok(m, "không đọc được giờ: " + s); const h = docSo(m[1]); return (m[2] === "chiều" || m[2] === "tối" || (m[2] === "đêm" && h >= 7)) && h < 12 ? h + 12 : h; };
const so = (s) => +String(s).replace(/\s/g, "");

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => { assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 12); assert.equal(b.subject, "Ngữ văn"); assert.equal(b.file, "12-van.js"); });
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
assert.ok(rieng.length && rieng.every((q) => q.topic === "Viết" && q.type === "essay"), "câu riêng của đề ngẫu nhiên chỉ là câu Viết");
const PSG = Object.assign({}, d1.passages, d2.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("van12-ck2-", "") + "#" + (i + 1))));
const doan = (id) => { assert.ok(PSG[id], "không có đoạn " + id); return PSG[id].text; };
const motCau = (has) => { const m = kho.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };
const trongNgoac = (q) => /«([^»]+)»/.exec(q.q)[1];
const doanVan = (id, k) => { const m = doan(id).split("\n").find((l) => l.startsWith("(" + k + ")")); assert.ok(m, `đoạn ${id} có đoạn (${k})`); return m; };

/* ---------- bài thơ tám chữ ---------- */
const kho4 = doan("mua-kho").split(/\n\s*\n/).map((k) => k.split("\n").filter((l) => l.trim()));
assert.equal(kho4.length, 3, "bài thơ có ba khổ");
kho4.forEach((k, i) => {
  assert.equal(k.length, 4, `khổ ${i + 1}: bốn dòng`);
  k.forEach((l) => assert.equal(tieng(l).length, 8, "thơ tám chữ, tám tiếng mỗi dòng: " + l));
  const cuoi = k.map((l) => tieng(l)[7]);
  // vần chân cách (dòng 1 – 3, 2 – 4): cùng vần, cùng thanh bằng hoặc trắc
  [[0, 2], [1, 3]].forEach(([a, b]) => {
    assert.equal(van(cuoi[a]), van(cuoi[b]), `khổ ${i + 1}: «${cuoi[a]}» hiệp vần với «${cuoi[b]}»`);
    assert.equal(thanh(cuoi[a]), thanh(cuoi[b]), `khổ ${i + 1}: «${cuoi[a]}», «${cuoi[b]}» cùng thanh`);
  });
  assert.notEqual(thanh(cuoi[0]), thanh(cuoi[1]), `khổ ${i + 1}: hai cặp vần xen bằng, trắc`);
});
const theTho = (k4) => (k4.every((k) => k.every((l) => tieng(l).length === 8)) ? "thơ tám chữ" : null);
assert.equal(theTho(kho4), "thơ tám chữ");

/* ---------- văn bản thông tin: bảng số liệu tính lại ---------- */
const MUON = (() => {
  const t = doan("doc-gi"), r = {};
  [...t.matchAll(/^– (.+?): ([\d ]+) lượt[^;]*; ([\d ]+) lượt/gm)].forEach((m) => { r[m[1]] = [so(m[2]), so(m[3])]; });
  const loai = Object.keys(r).filter((k) => k !== "Tổng cộng");
  assert.deepEqual(loai, ["Truyện, tiểu thuyết", "Sách khoa học, kĩ thuật", "Sách tham khảo các môn học"], "bảng có ba loại sách");
  [0, 1].forEach((k) => assert.equal(sum(loai.map((l) => r[l][k])), r["Tổng cộng"][k], "dòng tổng cộng của bảng khớp ba loại sách"));
  const m = /(\d+) trong số (\d+) bạn, tức (\d+)%/.exec(t); assert.ok(m);
  assert.equal(Math.round((100 * +m[1]) / +m[2]), +m[3], "tỉ lệ đọc sách khớp số bạn");
  assert.ok(new RegExp("phiếu hỏi cho " + m[2] + " học sinh").test(t), "số học sinh được hỏi khớp");
  const ld = [...t.matchAll(/«[^»]+» \((\d+) bạn\)/g)].map((x) => +x[1]);
  assert.ok(ld.length === 2 && ld[0] > ld[1] && sum(ld) <= +m[2] - +m[1], "số bạn chọn hai lí do (nhiều nhất trước) không quá số bạn không đọc");
  const tang = loai.filter((l) => r[l][1] - r[l][0] > r[l][0] / 3);
  assert.deepEqual(tang, ["Sách khoa học, kĩ thuật"], "sách khoa học, kĩ thuật là loại duy nhất tăng hơn một phần ba");
  assert.ok(/sách khoa học, kĩ thuật là loại duy nhất có số lượt mượn tăng hơn một phần ba/.test(t));
  return { r, loai, doc: +m[1], hoi: +m[2] };
})();
const MUA = (() => {
  const t = doan("nuoc-mua"), thang = {};
  t.split("\n").filter((l) => /^– Tháng/.test(l)).forEach((l) => {
    const m = /^– (.+): ([\d ]+)$/.exec(l);
    if (m && /tháng \d+, tháng/i.test(m[1])) { m[1].match(/\d+/g).forEach((k) => (thang[+k] = so(m[2]))); return; }
    [...l.matchAll(/[Tt]háng (\d+): ([\d ]+?)(?=;|$)/g)].forEach((x) => (thang[+x[1]] = so(x[2])));
  });
  assert.deepEqual(Object.keys(thang).map(Number).sort((a, b) => a - b), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "đủ số liệu mười hai tháng");
  const tong = sum(Object.values(thang)), ghi = so(/tổng cộng ([\d ]+) lít/.exec(t)[1]);
  assert.equal(tong, ghi, "tổng ghi trong văn bản bằng tổng mười hai tháng");
  const dung = so(/dung tích ([\d ]+) lít/.exec(t)[1]);
  assert.ok(Object.values(thang).every((v) => v <= dung), "không tháng nào thu nhiều hơn dung tích bể");
  assert.ok(/suốt mấy tháng mùa khô, bể cạn/.test(t) && Object.values(thang).filter((v) => v === 0).length >= 3, "mùa khô bể cạn khớp số tháng không thu được nước");
  return { thang, tong };
})();
const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/* ---------- đáp án tính lại bằng code, đối chiếu chữ của đoạn đọc, của câu ví dụ ---------- */
const coTrong = (id, ...s) => { s.forEach((x) => assert.ok(doan(id).includes(x), `đoạn ${id} phải có «${x}»`)); return true; };
const motLuaChon = (q, re, at) => { const ok = q.o.filter((o) => re.test(o.toLowerCase())); assert.equal(ok.length, 1, `${at || q.q.slice(0, 40)}: đúng một lựa chọn có ${re}, có ${ok.length}`); return ok[0]; };
const tf = (q, rules) => q.o.map((o) => { const r = rules.find(([re]) => re.test(o)); assert.ok(r, "ý chưa có cách tính: " + o); return r[1](); });
const CHECKS = [
  /* ---- Đề 1 ---- */
  { id: S.de1, has: "những truyện ngắn ấy được viết bằng thứ tiếng nào", right: (q) => coTrong("tieng-cuoi-pa-ri", "truyện ngắn bằng tiếng Pháp", "không phải đồng bào trong nước mà là công chúng Pháp") && motLuaChon(q, /^bằng tiếng pháp, cho công chúng/) },
  { id: S.de1, has: "Chỉ một tình huống mà hai đối tượng cùng bị phơi bày", right: (q) => {
    const d = doanVan("tieng-cuoi-pa-ri", 2); assert.ok(/vừa giễu cợt .+, vừa cho thấy/.test(d) && d.trim().endsWith(trongNgoac(q)), "câu ấy đứng cuối đoạn (2), sau phần phân tích hai đối tượng");
    return motLuaChon(q, /^khái quát/);
  } },
  { id: S.de1, has: "cách văn bản đánh giá những truyện ngắn ấy", right: (q) => tf(q, [
    [/lí giải việc chọn tiếng cười bằng chính đối tượng người đọc/, () => /công chúng Pháp/.test(doanVan("tieng-cuoi-pa-ri", 1)) && /chọn tiếng cười/.test(doanVan("tieng-cuoi-pa-ri", 1))],
    [/mất đi giá trị nghệ thuật/, () => !/không loại trừ nhau/.test(doanVan("tieng-cuoi-pa-ri", 3))],
    [/Đoạn \(4\) chỉ ra điều mà người đọc trẻ hôm nay/, () => /Bạn trẻ hôm nay đọc lại vẫn có thể học/.test(doanVan("tieng-cuoi-pa-ri", 4))],
    [/chỉ còn giá trị đối với các nhà nghiên cứu/, () => !/vẫn còn sức sống/.test(doanVan("tieng-cuoi-pa-ri", 4))]]) },
  { id: S.de1, has: "Người viết có mặt ở bến xe trong khoảng thời gian nào", right: (q) => {
    const t = doan("dem-ben-xe"), dau = /^(.+? giờ tối) ngày 27 tháng Chạp/.exec(t)[1], cuoi = /rời bến lúc (.+? giờ sáng)/.exec(t)[1];
    // xe của anh Lộc khởi hành lúc mười một giờ đêm; lúc người viết rời bến, xe đã chạy được hai tiếng
    const kh = gio(/giờ khởi hành (.+? giờ đêm)/.exec(t)[1]), di = (gio(cuoi) + 24 - kh) % 24;
    assert.ok(gio(dau) < kh && new RegExp("đã chạy được " + ["", "một", "hai", "ba", "bốn"][di] + " tiếng").test(t), "giờ khởi hành, giờ rời bến khớp số tiếng xe đã chạy");
    return `Từ ${dau.toLowerCase()} đến ${cuoi}`;
  } },
  { id: S.de1, has: "Đoạn tả sân bến lúc nửa đêm", right: (q) => coTrong("dem-ben-xe", "Nửa đêm", "ánh đèn vàng", "ngủ gục trên ba lô", "nắm chặt tấm vé") && motLuaChon(q, /cụ thể/) },
  { id: S.de1, has: "khả năng tác động của bài viết đối với người đọc", right: (q) => { const t = doan("dem-ben-xe"); return tf(q, [
    [/Qua những con người cụ thể/, () => /Anh Lộc, hai mươi tám tuổi/.test(t)],
    [/nhóm sinh viên tình nguyện/, () => /nhóm sinh viên tình nguyện/.test(t)],
    [/chỉ nêu số chuyến xe/, () => !/Anh Lộc/.test(t)],
    [/bộc lộ suy nghĩ riêng/, () => /Tôi .*chợt nghĩ/.test(t)]]); } },
  { id: S.de1, has: "dữ liệu nào là dữ liệu sơ cấp", right: (q) => coTrong("doc-gi", "phát phiếu hỏi cho " + MUON.hoi + " học sinh", "lấy từ sổ mượn") && motLuaChon(q, /phiếu hỏi/) },
  { id: S.de1, has: "Theo tôi, đây là tín hiệu đáng mừng nhất", right: (q) => coTrong("doc-gi", trongNgoac(q)) && motLuaChon(q, /chủ quan/) },
  { id: S.de1, has: "Dựa vào số liệu đã cho", right: (q) => { const r = MUON.r, tg = (l) => r[l][1] - r[l][0]; return tf(q, [
    [/Tổng số lượt mượn .* ít hơn năm học trước/, () => r["Tổng cộng"][1] < r["Tổng cộng"][0]],
    [/sách tham khảo các môn học giảm đúng một phần năm/, () => -5 * tg("Sách tham khảo các môn học") === r["Sách tham khảo các môn học"][0]],
    [/truyện, tiểu thuyết tăng thêm nhiều lượt hơn sách khoa học, kĩ thuật/, () => tg("Truyện, tiểu thuyết") > tg("Sách khoa học, kĩ thuật")],
    [/Hơn một nửa số học sinh được hỏi không đọc/, () => 2 * (MUON.hoi - MUON.doc) > MUON.hoi]]); } },
  { id: S.de1, has: "Kết luận nào dưới đây có đủ cơ sở", right: (q) => {
    const r = MUON.r; assert.ok(r["Sách tham khảo các môn học"][1] > 0, "sách tham khảo vẫn được mượn: «bỏ hẳn» là sai");
    coTrong("doc-gi", "cần một cuộc khảo sát khác mới khẳng định được");
    return motLuaChon(q, /^ở trường này, .*khoa học/);
  } },
  { id: S.de1, has: "người qua đường cho rằng việc bà gieo hạt", right: (q) => coTrong("mua-kho", "trời chưa mưa, gieo uổng") && motLuaChon(q, /uổng công, vì trời chưa có mưa/) },
  { id: S.de1, has: "đời cũng như đất ấy", right: (q) => coTrong("mua-kho", "đời cũng như đất ấy", "mùa khô khát") && motLuaChon(q, /gian khó/) },
  { id: S.de1, has: "Cảm hứng chủ đạo nào xuyên suốt bài thơ", right: (q) => coTrong("mua-kho", "niềm tin", "mướt xanh") && motLuaChon(q, /lạc quan/) },
  { id: S.de1, has: "Xét bài thơ theo các giá trị của tác phẩm văn học", right: (q) => tf(q, [
    [/hướng dẫn kĩ thuật gieo trồng/, () => false],
    [/sống chủ động, không buông xuôi/, () => coTrong("mua-kho", "Người giữ được niềm tin")],
    [/chỉ kể chuyện riêng của một bà cụ/, () => !doan("mua-kho").includes("đời cũng như đất ấy")],
    [/mầm non nhú lên giữa khe kẽ, ruộng xanh từng hàng/, () => coTrong("mua-kho", "Mầm non nhú lên giữa từng khe kẽ", "mướt xanh từng hàng")]]) },
  { id: S.de1, has: "Chỉ có thể giữ cho dòng kênh sạch", right: (q) => {
    const c = trongNgoac(q).toLowerCase(); q.o.forEach((o) => assert.ok(c.includes(o.slice(1, -1)), "lựa chọn có trong câu: " + o));
    assert.ok(!/(mọi|tất cả|toàn thể|luôn|chắc chắn|rõ ràng)/.test(c), "câu chỉ có một từ ngữ khẳng định");
    return motLuaChon(q, /chỉ có thể/);
  } },
  { id: S.de1, has: "cụm từ «hiếm người» có tác dụng gì", right: (q) => { assert.ok(/hiếm người/.test(trongNgoac(q))); return motLuaChon(q, /rất ít/); } },
  { id: S.de1, has: "có từ ngữ địa phương", right: (q) => motLuaChon(q, /(^|[\s«])(mi|mô|chừ|răng|rứa|nớ|tê)(?=[\s,.!?»])/) },
  { id: S.de1, has: "muốn lược bớt vài chữ ở giữa", right: (q) => { assert.ok(!kho.some((x) => x !== q && chu(x).some((s) => /\[…\]|\[\.\.\.\]/.test(s))), "kí hiệu […] chỉ có ở câu này"); return motLuaChon(q, /\[…\]/); } },
  { id: S.de1, has: "trường hợp nào dưới đây không cần ghi nguồn", right: (q) => motLuaChon(q, /(mỗi tuần lễ có bảy ngày)/) },
  { id: S.de1, has: "Vì sao việc làm ấy bị coi là đạo văn", right: (q) => motLuaChon(q, /hiểu lầm .* chính bạn/) },
  { id: S.de1, has: "viết sai quy định về chính tả", right: (q) => motLuaChon(q, /(^|\s)(ko|đc|dc|k|j|hok|bít)(?=[\s,.!?])/) },
  { id: S.de1, has: "được ghép từ những yếu tố đã có sẵn", right: (q) => { const ok = q.o.filter((o) => !/-/.test(o)); assert.equal(ok.length, 1, "chỉ một từ không phải từ mượn có gạch nối"); return ok[0]; } },
  { id: S.de1, has: "chưa đúng chuẩn ngữ pháp vì sao", right: (q) => { assert.ok(/^Những .+ năm nay\.$/.test(trongNgoac(q)), "câu ví dụ chỉ là một cụm danh từ"); return motLuaChon(q, /thiếu vị ngữ/); } },
  { id: S.de1, has: "từ «đám mây» được dùng theo cách nào", right: (q) => { assert.ok(/lưu trên đám mây/.test(trongNgoac(q))); return motLuaChon(q, /nghĩa mới/); } },
  /* ---- Đề 2 ---- */
  { id: S.de2, has: "không chỉ nói mà còn làm", right: (q) => coTrong("ngon-duoc", "Người không chỉ nói mà còn làm", "phong trào Bình dân học vụ được phát động để xoá nạn mù chữ") && motLuaChon(q, /bình dân học vụ/) },
  { id: S.de2, has: "hình ảnh ngọn đuốc giúp người viết", right: (q) => coTrong("ngon-duoc", "Ngọn đuốc không bước thay người đi đường") && motLuaChon(q, /không đi thay ai/) },
  { id: S.de2, has: "giữ cho «ngọn đuốc» ấy sáng", right: (q) => coTrong("ngon-duoc", "phân biệt điều đúng với điều sai") && motLuaChon(q, /đối chiếu/) },
  { id: S.de2, has: "mỗi khi màn hình nhoè đi, ông Khang làm gì", right: (q) => coTrong("ti-vi-ca-xom", "trèo lên mái nhà xoay cái cần ăng-ten bằng tre") && motLuaChon(q, /^trèo lên mái nhà xoay cái cần ăng-ten bằng tre$/) },
  { id: S.de2, has: "Câu cuối đoạn trích («…chưa bao giờ thấy lại", right: (q) => coTrong("ti-vi-ca-xom", trongNgoac(q).replace(/^…/, ""), "Mấy năm sau, nhà nào cũng dần có ti vi riêng") && motLuaChon(q, /nhớ tiếc/) },
  { id: S.de2, has: "giá trị tư liệu và trải nghiệm riêng", right: (q) => { const t = doan("ti-vi-ca-xom"), nam = +/năm (\d{4})/.exec(t)[1]; return tf(q, [
    [/nét sinh hoạt của làng quê những năm tám mươi/, () => nam >= 1980 && nam < 1990],
    [/bịa ra mọi chi tiết/, () => !/theo lối hồi kí/.test(PSG["ti-vi-ca-xom"].title)],
    [/quên hẳn/, () => !/tôi nhớ rất rõ/.test(t)],
    [/người trong cuộc/, () => /Tôi khi ấy mười tuổi/.test(t)]]); } },
  { id: S.de2, has: "bể đã thu được tổng cộng ___ lít", right: () => fmt(MUA.tong) },
  { id: S.de2, has: "tra bảng lượng mưa của đài khí tượng", right: (q) => coTrong("nuoc-mua", "Để đối chiếu") && motLuaChon(q, /kiểm tra lại số liệu tự đo/) },
  { id: S.de2, has: "Dựa vào số liệu từng tháng", right: (q) => { const T = MUA.thang, mx = Math.max(...Object.values(T)); return tf(q, [
    [/tháng 6 nhiều gấp đôi tháng 5/, () => T[6] >= 2 * T[5]],
    [/chỉ có hai tháng bể không thu được/, () => Object.values(T).filter((v) => v === 0).length === 2],
    [/Tháng 9 và tháng 8 là hai tháng bể thu được nhiều nước nhất/, () => T[9] === mx && T[8] === mx && Object.values(T).filter((v) => v === mx).length === 2],
    [/Ba tháng 7, 8, 9 thu được hơn một nửa/, () => 2 * (T[7] + T[8] + T[9]) > MUA.tong]]); } },
  { id: S.de2, has: "nhan đề nào phù hợp nhất với nội dung", right: (q) => coTrong("nuoc-mua", "giảm khoảng một phần tư", "bể cạn") && motLuaChon(q, /lợi ích và giới hạn/) },
  { id: S.de2, has: "vì sao ông Thuận không cần ở lại đảo nữa", right: (q) => coTrong("nguoi-giu-den", "LINH: Bố ơi, sáng mai tàu ra đón bố. Đèn bây giờ tự bật, tự tắt rồi") && motLuaChon(q, /tự bật, tự tắt/) },
  { id: S.de2, has: "Về đất liền, bố là ai?", right: (q) => coTrong("nguoi-giu-den", "Về đất liền, bố là ai?", "Bốn mươi năm") && motLuaChon(q, /chỗ đứng/) },
  { id: S.de2, has: "Những điều ấy đâu có tắt theo ngọn đèn cũ", right: (q) => coTrong("nguoi-giu-den", "Những điều ấy đâu có tắt theo ngọn đèn cũ", "đưa bao con thuyền về đúng bến") && motLuaChon(q, /đã sống/) },
  { id: S.de2, has: "Xét chủ đề, tư tưởng, cảm hứng chủ đạo của cảnh kịch", right: (q) => { const t = doan("nguoi-giu-den"); return tf(q, [
    [/phê phán máy móc/, () => !/bật đúng giờ thật/.test(t)],
    [/mang chiếc kính cũ theo/, () => /mang chiếc kính này theo/.test(t)],
    [/Cảm hứng chủ đạo là trân trọng/, () => true],
    [/ở lại đảo một mình/, () => !/Thôi được/.test(t)]]); } },
  { id: S.de2, has: "chỉ trạng thái đều đặn, lâu dài", right: (q) => motLuaChon(q, /(thường xuyên|luôn luôn|lúc nào cũng)/) },
  { id: S.de2, has: "há lại để nó bỏ hoang", right: (q) => { assert.ok(/, há lại .+\?$/.test(trongNgoac(q)), "câu hỏi chất vấn bằng «há»"); return motLuaChon(q, /phản đối dứt khoát/); } },
  { id: S.de2, has: "thường gặp ở câu trong ngôn ngữ trang trọng", right: (q) => motLuaChon(q, /đủ các thành phần/) },
  { id: S.de2, has: "kí hiệu [___]", right: (q) => { assert.ok(/nguyên văn/.test(q.q)); return "sic"; } },
  { id: S.de2, has: "mục tài liệu tham khảo đặt sau phần chính", right: (q) => motLuaChon(q, /công trình đã tham khảo/) },
  { id: S.de2, has: "dẫn gián tiếp ý ấy", right: (q) => {
    const goc0 = trongNgoac(q).replace(/\.$/, "");
    const ok = q.o.filter((o) => o.includes("Trần Hoài An") && !o.includes(goc0.slice(-20)) && !/[«»“”]/.test(o) && /người bạn/.test(o));
    assert.equal(ok.length, 1, "dẫn gián tiếp: nêu tên người có ý kiến, không chép nguyên câu, giữ ý");
    return ok[0];
  } },
  { id: S.de2, has: "lạm dụng từ ngữ nước ngoài", right: (q) => motLuaChon(q, /\b(meeting|start|deadline|online|check)\b/) },
  { id: S.de2, has: "từ vay mượn đã được Việt hoá cách viết", right: (q) => { const ok = q.o.filter((o) => /-/.test(o)); assert.equal(ok.length, 1, "chỉ một từ mượn viết có gạch nối"); return ok[0]; } },
  { id: S.de2, has: "«hok bít», «j zậy»", right: (q) => motLuaChon(q, /lệch chuẩn chính tả/) },
  { id: S.de2, has: "cách kết hợp «nắng ướt»", right: (q) => motLuaChon(q, /mới lạ/) }
];
function chu(q) { return [q.q, q.x].concat(q.o || [], q.ans || [], (q.rubric || []).map((r) => r.c)).map(String); }
let n = 0;
CHECKS.forEach((c) => {
  const q = motCau(c.has), at = c.id + ": " + c.has, want = c.right(q);
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  if (Array.isArray(want)) assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  else assert.equal(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  n++;
});
assert.ok(motCau("bể đã thu được tổng cộng ___ lít").ans.includes(String(MUA.tong)), "câu điền nhận cả số viết liền");
assert.ok(kho.filter((q) => q.type !== "essay").every((q) => CHECKS.some((c) => q.q.includes(c.has))), "mọi câu chấm tự động đều được tính lại hoặc đối chiếu");

/* ---------- ma trận, đoạn đọc, câu Viết, note ---------- */
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
const demLv = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
assert.equal(TOPICS[TOPICS.length - 1], "Viết", "chủ đề Viết đứng cuối ma trận");
[d1.questions, d2.questions].forEach((d, i) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, `Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => demLv(d, t, l)), v, `Đề ${i + 1} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = demLv(kho, t, l);
  assert.ok(v[l - 1] ? o >= 2 * v[l - 1] : o === 0, `ô (${t}, mức ${l}) rút ${v[l - 1]} câu, kho có ${o}`);
}));
// bốn chủ đề đọc hiểu theo tên Bài 6–9 (mục lục của sách in năm 2026), đứng đầu ma trận; mỗi đề cố định một đoạn mỗi chủ đề:
// Bài 6, 7 đoạn 3 câu mức 1-2-3; Bài 8, 9 đoạn 4 câu mức 1-2-3-3
const BAI = ["Hồ Chí Minh – “Văn hoá phải soi đường cho quốc dân đi”", "Sự thật trong tác phẩm kí", "Dữ liệu trong văn bản thông tin", "Văn học và cuộc đời"];
const MUC = [[1, 2, 3], [1, 2, 3], [1, 2, 3, 3], [1, 2, 3, 3]];
const docHieu = TOPICS.filter((t) => kho.some((q) => q.topic === t && q.p));
assert.deepEqual(docHieu, BAI, "bốn chủ đề đọc hiểu theo tên Bài 6–9, đứng đầu ma trận");
docHieu.forEach((t, k) => {
  assert.ok(kho.filter((q) => q.topic === t).every((q) => q.p), t + ": mọi câu có đoạn đọc");
  assert.deepEqual(M[t], [1, 1, MUC[k].length - 2], t + ": ma trận khớp số câu của đoạn");
  [S.de1, S.de2].forEach((id) => {
    const qs = kho.filter((q) => q.topic === t && q.src === id), ps = [...new Set(qs.map((q) => q.p))];
    assert.equal(ps.length, 1, `${id}, ${t}: một đoạn`);
    assert.deepEqual(qs.map((q) => q.lv), MUC[k], `${id}, ${t}: đoạn ${MUC[k].length} câu mức ${MUC[k].join("-")}`);
  });
});
assert.ok(kho.filter((q) => !q.p).every((q) => !docHieu.includes(q.topic)), "câu không có đoạn đọc chỉ ở tiếng Việt, Viết");
// ngữ liệu ngoài sách: mỗi đề một văn bản nghị luận (Bài 6), một văn bản kí (Bài 7: Đề 1 phóng sự, Đề 2 hồi kí), một văn bản thông tin
// có số liệu (Bài 8), một tác phẩm văn học (Bài 9: Đề 1 thơ, Đề 2 kịch), người soạn viết
const loai = (id) => { const t = PSG[id].title; return /văn bản nghị luận người soạn viết/.test(t) ? "nghị luận" : /người soạn viết theo lối phóng sự/.test(t) ? "phóng sự" : /người soạn viết theo lối hồi kí/.test(t) ? "hồi kí" : /văn bản thông tin người soạn viết; trường, số liệu là hư cấu/.test(t) ? "thông tin" : /bài thơ người soạn viết/.test(t) ? "thơ" : /cảnh kịch người soạn viết/.test(t) ? "kịch" : null; };
assert.deepEqual([S.de1, S.de2].map((id) => BAI.map((t) => loai(kho.find((q) => q.src === id && q.topic === t).p)).join(", ")), ["nghị luận, phóng sự, thông tin, thơ", "nghị luận, hồi kí, thông tin, kịch"], "loại văn bản đọc của từng bài");
Object.keys(PSG).forEach((id) => assert.ok(kho.some((q) => q.p === id), "đoạn " + id + " có câu"));
assert.ok(/LINH:/.test(doan("nguoi-giu-den")) && /ÔNG THUẬN \(/.test(doan("nguoi-giu-den")) && /^\(/.test(doan("nguoi-giu-den")), "cảnh kịch có lời thoại, chỉ dẫn sân khấu");
// tiếng Việt theo bốn mục Thực hành tiếng Việt Bài 6–9; câu ôn Bài 6, 7 đúng chữ chủ đề của kho giữa kì II
const gk2 = [bank(GK2.de1), bank(GK2.de2), bank(GK2.pool)];
assert.ok(gk2.every(Boolean), "có kho Ngữ văn 12 giữa kì II");
const ON = ["Biện pháp làm tăng tính khẳng định", "Biện pháp làm tăng tính phủ định", "Ngôn ngữ trang trọng và ngôn ngữ thân mật"];
const TAM = ["Tôn trọng và bảo vệ quyền sở hữu trí tuệ", "Giữ gìn và phát triển tiếng Việt"];
assert.deepEqual(TOPICS.filter((t) => !BAI.includes(t) && t !== "Viết"), ON.concat(TAM), "chủ đề tiếng Việt theo bốn mục Thực hành tiếng Việt Bài 6–9");
const tenGK2 = Object.keys(gk2[2].pool.matrix);
ON.concat(BAI.slice(0, 2)).forEach((t) => assert.ok(tenGK2.includes(t), "câu ôn mang đúng chữ chủ đề của kho giữa kì II: " + t));
TAM.concat(BAI.slice(2)).forEach((t) => assert.ok(!tenGK2.includes(t), "chủ đề Bài 8, 9 không có ở kho giữa kì II: " + t));
// phần trọng tâm (Bài 8–9) nhiều câu hơn hẳn phần ôn (Bài 6–7) ở mỗi đề
[d1, d2].forEach((b) => {
  const dem = (ts) => b.questions.filter((q) => ts.includes(q.topic)).length, on = dem(ON.concat(BAI.slice(0, 2))), tam = dem(TAM.concat(BAI.slice(2)));
  assert.ok(tam >= on + 5, `${b.id}: trọng tâm Bài 8–9 có ${tam} câu, phần ôn Bài 6–7 có ${on} câu`);
});
const viet = kho.filter((q) => q.topic === "Viết");
assert.ok(viet.every((q) => q.type === "essay") && kho.filter((q) => q.type === "essay").every((q) => q.topic === "Viết"), "chủ đề Viết chỉ gồm câu tự luận, tự luận chỉ ở Viết");
viet.forEach((q) => {
  assert.ok(q.rubric.length >= 4 && q.rubric.length <= 6, "câu Viết có 4–6 ý chấm: " + q.q.slice(0, 50));
  assert.equal(sum(q.rubric.map((r) => r.p)), 4, "câu Viết 4 điểm như câu bài văn của đề tốt nghiệp: " + q.q.slice(0, 50));
  assert.ok(q.rubric.every((r) => Math.round(r.p * 4) === r.p * 4 && r.p > 0), "điểm từng ý chia hết cho 0,25");
  assert.ok(/khoảng 600 chữ/.test(q.q), "câu Viết khoảng 600 chữ: " + q.q.slice(0, 50));
  assert.ok(/^Dàn ý gợi ý:/.test(q.x) && q.x.length > 400, "câu Viết có dàn ý gợi ý: " + q.q.slice(0, 50));
});
// bốn kiểu bài Viết của Bài 6–9; hai đề cố định có kiểu bài của Bài 8, 9 (trọng tâm), câu riêng có kiểu bài của Bài 6, 7
const KIEU = [[6, /bài tập dự án.*bản báo cáo.*bảng hoặc sơ đồ.*tài liệu/], [7, /cách người trẻ nên cư xử với người cao tuổi ở trong nhà cũng như ngoài xã hội/],
  [8, /^Viết một bức thư .*gửi Ban Giám hiệu .*để trao đổi về một việc/], [9, /bài phát biểu .*trong lễ phát động phong trào/]];
KIEU.forEach(([b, re]) => assert.equal(viet.filter((q) => re.test(q.q)).length, 1, `kiểu bài Viết của Bài ${b}: ${re}`));
const kieuCua = (q) => KIEU.find(([, re]) => re.test(q.q))[0];
assert.deepEqual([S.de1, S.de2].map((id) => kieuCua(viet.find((q) => q.src === id))), [8, 9], "câu Viết của hai đề cố định: Bài 8, Bài 9");
assert.deepEqual(rieng.map(kieuCua), [6, 7], "câu Viết riêng của đề ngẫu nhiên: Bài 6, Bài 7");
// từ khoá vấn đề nghị luận xã hội của các đề thi thử vào 10 (VAN_DE ở tests/van9-vao10.js) và vấn đề, dự án của câu Viết kho giữa kì II
// không có ở đề bài câu Viết
["so sánh bản thân", "nghệ thuật truyền thống", "nhận lỗi", "khuyết tật", "giữ lời hứa", "thức khuya", "kí ức quê nhà", "khác với cha mẹ", "người cao tuổi ở địa phương về đời sống"].forEach((k) => viet.forEach((q) => assert.ok(!q.q.toLowerCase().includes(k), "đề Viết trùng vấn đề của kho khác: " + k)));
const SO_GD = "Từ năm học 2026–2027 Sở GD&ĐT ra đề chung cuối kì một số môn lớp 12; xem thông báo của Sở về môn và cấu trúc đề.";
[d1, d2, p].forEach((b) => {
  assert.ok(b.note.startsWith("Cuối năm học (Bài 6–9, trọng tâm Bài 8–9), sách Kết nối tri thức."), b.id + ": note ghi phạm vi");
  assert.ok(b.note.endsWith(SO_GD), b.id + ": note có câu về đề chung của Sở (Thông tư 89/2026 áp dụng cả cuối kì II lớp 12)");
});
[d1, d2].forEach((b) => assert.ok(/10 câu mức Biết, 8 câu mức Hiểu, 7 câu mức Vận dụng/.test(b.note), b.id + ": note ghi ma trận"));
{
  const nt = (b) => { const t = b.questions.filter((q) => q.p).map((q) => loai(q.p)); return { "nghị luận": "một văn bản nghị luận", "phóng sự": "một bài viết theo lối phóng sự", "hồi kí": "một đoạn hồi kí", "thông tin": "một văn bản thông tin có số liệu", "thơ": "một bài thơ", "kịch": "một cảnh kịch" }; };
  [d1, d2].forEach((b) => { const ten2 = nt(b); [...new Set(b.questions.filter((q) => q.p).map((q) => loai(q.p)))].forEach((l) => assert.ok(b.note.includes(ten2[l]), b.id + ": note nhắc " + ten2[l])); });
}
{
  // lịch thi mặc định: đọc file như tests/van9-vao10.js
  const ctx2 = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx2);
  const k = (ctx2.window.ONTAP_SEED_EVENTS || []).find((e) => e.id === "ck2-l12");
  assert.ok(k && k.grades.includes(12), "có kì thi ck2-l12 của khối 12");
  [S.de1, S.de2, S.pool].forEach((id) => assert.ok(k.banks.includes(id), "ck2-l12 gắn " + id));
}

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
// gọi người làm bài là “bạn” (Rút ra RS9)
kho.forEach((q) => chu(q).forEach((s) => assert.ok(!/(^|[\s(])em (hãy|có|nên|cần)\b/i.test(s), "gọi người làm bài là «bạn»: " + ten.get(q))));
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
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => demLv(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  docHieu.forEach((t) => {
    const qs = d.questions.filter((q) => q.topic === t), ps = [...new Set(qs.map((q) => q.p))];
    assert.equal(ps.length, 1, t + ": rút một đoạn");
    assert.equal(qs.length, kho.filter((q) => q.p === ps[0]).length, t + ": rút trọn đoạn " + ps[0]);
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
// đề “Ôn chủ đề” (Phiên UX14): rút chung câu cùng chủ đề của mọi kho Ngữ văn 12 (cuối kì I, giữa kì II, cuối năm); chủ đề có từ 10 câu
// chấm tự động thì rút 10 câu, đoạn đọc đi trọn (nhiều nhất một đoạn lấy một phần, không quá ⌈10/3⌉ đoạn); dưới 10 câu thì lấy hết
const VAN12 = BANKS.filter((b) => b.file === "12-van.js");
TOPICS.filter((t) => t !== "Viết").forEach((t) => {
  const tb = Quiz.topicBank(VAN12, t, { id: "chu-de", title: t });
  const co = VAN12.flatMap((b) => b.questions.filter((q) => (!b.pool || q.src === b.id) && q.topic === t && q.type !== "essay")).length;
  assert.equal(tb.questions.length, co, `Ôn chủ đề «${t}»: các kho có ${co} câu`);
  assert.equal(tb.n, Math.min(co, Quiz.TOPIC_N), `Ôn chủ đề «${t}»: rút ${Math.min(co, Quiz.TOPIC_N)} câu`);
  for (let k = 0; k < 40; k++) {
    const d = Quiz.draw(tb);
    assert.equal(d.notes.length, 0, `Ôn chủ đề «${t}»: rút có ghi chú`);
    assert.equal(d.questions.length, tb.n);
    const ps = [...new Set(d.questions.filter((q) => q.p).map((q) => q.p))];
    const motPhan = ps.filter((pp) => d.questions.filter((q) => q.p === pp).length < tb.questions.filter((q) => q.p === pp).length);
    assert.ok(motPhan.length <= 1 && ps.length <= Math.ceil(Quiz.TOPIC_N / 3), `Ôn chủ đề «${t}»: ${ps.length} đoạn, ${motPhan.length} đoạn lấy một phần`);
  }
});

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Rút cùng lúc: đề “Ôn chủ đề” rút chung cả chủ đề (cả câu của hai đề và của kho giữa kì II cùng chủ đề), đề ngẫu nhiên rút một đoạn mỗi
   bài và các câu tiếng Việt của những ô rút từ 2 câu, nên mọi cặp câu khác nhau đều có thể ra cùng lúc, trừ hai câu Viết (ô rút 1 câu, đề
   “Ôn chủ đề” bỏ câu tự luận). Đáp án (lựa chọn đúng, đáp án điền) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy
   cả đáp án); chuỗi có trong đề bài, lựa chọn, lời giải, đáp án hay đoạn đọc (khác đoạn của câu này) của câu kia thì in ra với DO_LO=1 để
   xem tay; danh sách đã xem ở DA_XEM. */
const tu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/[\]]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const cungLuc = (a, b) => a !== b && !(a.topic === "Viết" && b.topic === "Viết");
const doLo = (qs, tenCau, psg) => {
  const ra = [];
  qs.forEach((q) => {
    const dap = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []; // câu điền: đáp án chính (các đáp án sau là cách viết khác)
    const C = [...new Set(dap.flatMap(cum))];
    if (!C.length) return;
    qs.forEach((p2) => {
      if (!cungLuc(q, p2)) return;
      const T = " " + chu(p2).concat(p2.p && (p2.p !== q.p || p2.src !== q.src) && psg(p2) ? [psg(p2).text] : []).map((s) => tu(s).join(" ")).join(" | ") + " ";
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
    });
  });
  return [...new Set(ra)];
};
const PSG2 = Object.assign({}, gk2[0].passages, gk2[1].passages);
const psgCua = (q) => (/^van12-gk2-/.test(q.src) ? PSG2[q.p] : PSG[q.p]);
const ten2 = new Map(gk2[2].questions.map((q) => [q, "gk2:" + q.src.replace("van12-gk2-", "") + "#" + (gk2[2].questions.filter((x) => x.src === q.src).indexOf(q) + 1)]));
const tenAll = (q) => ten.get(q) || ten2.get(q);
const lo = doLo(kho, tenAll, psgCua);
// cùng chủ đề với kho giữa kì II (đề “Ôn chủ đề” rút chung): chỉ giữ cặp có một câu của kho này
const khoGK2 = gk2[2].questions.filter((q) => TOPICS.includes(q.topic) && q.topic !== "Viết");
const loGK2 = TOPICS.filter((t) => t !== "Viết").flatMap((t) => doLo(kho.filter((q) => q.topic === t).concat(khoGK2.filter((q) => q.topic === t)), tenAll, psgCua))
  .filter((s) => s.includes("gk2:") && !/^gk2:\S+ → gk2:/.test(s));
if (process.env.DO_LO) console.log("Đáp án có ở câu rút được cùng lúc (xem tay):\n" + lo.concat(loGK2).join("\n"));
const DA_XEM = [];
assert.deepEqual(lo.concat(loGK2), DA_XEM, "đáp án có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = motCau("mỗi khi màn hình nhoè đi, ông Khang làm gì"), b = motCau("Xét chủ đề, tư tưởng, cảm hứng chủ đạo của cảnh kịch");
  const gia = Object.assign({}, b, { x: b.x + " Ông Thuận không cần trèo lên mái nhà xoay cái cần ăng-ten bằng tre." });
  assert.ok(doLo([a, gia], (q) => q.topic, psgCua).some((s) => / cần ăng ten$| cái cần ăng$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
}

/* ---------- so với kho giữa kì II, cuối kì I cùng môn ---------- */
const k1 = [bank(CK1.de1), bank(CK1.de2), bank(CK1.pool)];
assert.ok(k1.every(Boolean), "có kho Ngữ văn 12 cuối kì I");
const kho1 = k1[2].questions, kho2 = gk2[2].questions;
const PSG1 = Object.assign({}, k1[0].passages, k1[1].passages, k1[2].passages);
const ten1 = new Map(kho1.map((q) => [q, "ck1:" + q.src.replace("van12-ck1-", "") + "#" + (kho1.filter((x) => x.src === q.src).indexOf(q) + 1)]));
// câu ôn Bài 6, 7 (cùng chủ đề với kho giữa kì II, như tests/khtn9-ck2.js): không trùng đề bài, chuỗi 6 từ của đề bài, đáp án câu cùng
// chủ đề của kho đó; câu Viết cũng so (chủ đề «Viết» chung ba kho)
{
  const dap = (q) => (q.type === "mc" ? goc(q.o[0]) : q.type === "fill" ? goc(q.ans[0]) : null);
  const c6 = (s) => { const w = tu(s), r = new Set(); for (let i = 0; i + 6 <= w.length; i++) r.add(w.slice(i, i + 6).join(" ")); return r; };
  kho.filter((q) => tenGK2.includes(q.topic)).forEach((q) => kho2.filter((o) => o.topic === q.topic).forEach((o) => {
    assert.notEqual(goc(q.q), goc(o.q), `đề bài trùng câu cùng chủ đề của kho giữa kì II: ${ten.get(q)} ~ ${ten2.get(o)}`);
    const chung = [...c6(q.q)].filter((x) => c6(o.q).has(x));
    assert.deepEqual(chung, [], `chuỗi 6 từ của đề bài trùng câu cùng chủ đề của kho giữa kì II: ${ten.get(q)} ~ ${ten2.get(o)}`);
    if (dap(q)) assert.notEqual(dap(q), dap(o), `đáp án trùng câu cùng chủ đề của kho giữa kì II: ${ten.get(q)} ~ ${ten2.get(o)}`);
  }));
  // câu ví dụ trong «» của câu tiếng Việt không dùng lại ví dụ của kho giữa kì II (Phần ôn Bài 6–7 không dùng lại ví dụ)
  const vd = (q) => (q.q.match(/«[^»]{12,}»/g) || []).concat(q.o || []).map(goc).filter((s) => s.length >= 12);
  const cu = new Set(kho2.flatMap(vd));
  kho.filter((q) => !q.p).forEach((q) => vd(q).forEach((s) => assert.ok(!cu.has(s), "câu ví dụ dùng lại của kho giữa kì II: " + ten.get(q))));
}
// gần trùng (Rút ra N25; như tests/van12-gk2.js): đề bài cùng lựa chọn có từ 4 cặp hai âm tiết liền nhau chung với một câu của kho cuối kì
// I, giữa kì II và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính cụm chung của đề Ngữ văn (CUM), cặp có số hay chữ
// đơn, cặp của nhãn chủ đề và cặp có ở từ 3% số câu của data/banks/12-van.js.
{
  const CUM = ["mỗi nhận xét sau", "đúng hay sai", "người soạn viết", "dưới đây", "biện pháp tu từ", "đoạn trích", "người viết", "khoảng 600 chữ"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const deVan12 = VAN12.flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), df = {};
  deVan12.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * deVan12.length)); };
  const gan = kho.flatMap((q) => { const c = capAm(q); return kho1.concat(kho2).map((o) => { const d = capAm(o), chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${ten1.get(o) || ten2.get(o)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  assert.deepEqual(gan, [], "đề bài gần trùng câu của kho cuối kì I, giữa kì II");
}
// ngữ liệu không dùng lại của kho cuối kì I, giữa kì II: không dòng thơ, câu văn nào của đoạn đọc trùng đoạn đọc của hai kho đó
{
  const cau = (t) => t.split(/\n|(?<=[.!?…»])\s+/).map(goc).filter((s) => s.length >= 12);
  const cu = new Set(Object.values(PSG1).concat(Object.values(PSG2)).flatMap((x) => cau(x.text)));
  Object.entries(PSG).forEach(([id, x]) => cau(x.text).forEach((s) => assert.ok(!cu.has(s), `đoạn ${id} dùng lại câu của kho cũ: ${s}`)));
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
const khongDau = nhoChuoi((s) => String(s).normalize("NFC").normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim());
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const boChuoi = (texts, k) => { const set = new Set(); texts.forEach((t) => chuoi(t, k).forEach((c) => set.add(c))); return set; };
const truong = (q) => chu(q).concat(q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].title, PSG[q.p].text] : []);
// câu nói của Hồ Chí Minh làm tên Bài 6 (sách cũng trích): không tính khi so với chữ của sách
const TRICH = ["văn hoá phải soi đường cho quốc dân đi"];
const boTrich = (s) => TRICH.reduce((t, c) => t.split(c).join(" | "), String(s));
if (SACH.length) {
  assert.ok(SACH.some((f) => /ngu-van-12-tap-2/.test(f)), "OnUp-Book có Ngữ văn 12 tập hai");
  const texts = SACH.map((f) => fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]* ===/g, " "));
  const bao = (k) => { const set = boChuoi(texts, k); return kho.flatMap((q) => truong(q).map(boTrich).flatMap((s) => chuoi(s, k).filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`))); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const khac = BANKS.filter((b) => !/^van12-ck2-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)
    .map((q) => chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).join(" | ")));
  const bao = (k) => { const set = boChuoi(khac, k); return kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].filter((c) => set.has(c)).map((c) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại, đối chiếu bằng code; kho " + kho.length + " câu (" + rieng.length + " câu Viết riêng), " + Object.keys(PSG).length + " đoạn đọc, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; " + tf4.length + " câu đúng/sai 4 ý; đáp án là lựa chọn dài nhất ở " + dai + "/" + mc.length + ", ngắn nhất ở " + ngan + "/" + mc.length + " câu nhiều lựa chọn.");
console.log("VAN12 CK2 OK");
