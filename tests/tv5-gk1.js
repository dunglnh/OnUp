// Kiểm tra ngân hàng Tiếng Việt 5 giữa kì I của Phiên N5-gk1-tv (data/banks/5-tv.js, tv5-gk1-*), theo mẫu tests/tv5-ck2.js, tests/tv5-ck1.js.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên; số câu, số đề lấy từ danh mục.
// Đọc lại đáp án mọi câu Luyện từ và câu bằng bảng ghi trong script (CHECKS: mỗi câu khớp đúng một mục, nhận ra câu bằng một đoạn chữ của
// đề bài): từ loại (LOAI: danh từ, động từ, tính từ; NHOM: danh từ chỉ hiện tượng tự nhiên, thời gian, con vật; TU_CAU: từ loại của mọi từ
// trong các câu của câu “có đủ danh từ, động từ và tính từ”; từ đổi từ loại theo câu: “cày”, “mưa”), đại từ (DAI: xưng hô, nghi vấn, thay
// thế; đại từ thay cho từ ngữ, ý nào: đáp án gồm chữ của câu trước; đại từ nghi vấn hỏi về điều gì; danh từ dùng để xưng hô; cách xưng hô
// hợp người nghe; sửa đoạn lặp từ bằng đại từ; đếm đại từ), từ đồng nghĩa (DONG_NGHIA: nhóm từ đồng nghĩa; từ hợp văn cảnh ở HOP_DN; từ khác
// nghĩa trong dãy), từ đa nghĩa (GOC, CHUYEN: cụm từ nhận ra câu dùng nghĩa gốc, nghĩa chuyển; NGHIA, NOI_NGHIA: nghĩa của từ trong câu);
// câu đúng/sai 4 ý đọc từng ý; đáp án chỉ khớp một lựa chọn. Đọc hiểu: chữ trích trong ngoặc kép ở đề bài, lời giải có đúng trong đoạn đọc;
// câu sắp xếp sự việc đúng thứ tự trong bài (THU_TU), câu đúng/sai, câu điền, câu trả lời bằng số khớp đoạn đọc.
// Rồi kiểm tra ma trận 10 – 8 – 7 (hai đề cố định đúng ma trận; ô Luyện từ và câu có rút có, cho mỗi câu ô đó rút, một câu ở mỗi đề cố định
// và hai câu riêng), chữ chủ đề (đúng chữ chủ đề của kho cuối kì I), đoạn đọc (đoạn 4 câu mức 1-1-2-3, đoạn 3 câu mức 1-2-3), câu Viết (chỉ
// tự luận, đủ các kiểu bài Viết của Bài 1–16: bài văn kể chuyện sáng tạo và dàn ý của nó, báo cáo công việc, bài văn tả phong cảnh, dàn ý,
// đoạn văn tả phong cảnh, mở bài và kết bài; 4–6 ý chấm, 5 điểm), dạng câu (đúng/sai 4 ý không lặp kiểu Đ/S; có điền, đúng/sai, trả lời
// bằng số, nối cột, sắp xếp), gọi người làm bài là “bạn”, đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất
// (kể cả bằng nhau) ở không quá một phần ba số câu nhiều lựa chọn, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án không có, không
// lặp chữ của nhãn chủ đề, đề bài không trùng câu nào trong file, rút thử (đúng ma trận, trọn đoạn; đã làm hết một đề cố định thì không rút
// lại câu của đề đó), dò lộ đáp án giữa mọi cặp câu của kho và lời dặn, và với câu cùng chủ đề của các kho Tiếng Việt 5 khác (đề “Ôn chủ
// đề” rút chung câu cùng chủ đề), câu ôn không trùng đề bài, chuỗi 6 từ của đề bài, đáp án câu cùng chủ đề của các kho Tiếng Việt 5 khác
// (lời giao việc: kho cuối kì I), đề bài không gần trùng câu của data/banks/4-tv.js và các kho Tiếng Việt 5 khác (cặp hai âm tiết chung)
// và, nếu có ../OnUp-Book, so mọi trường chữ (cả đoạn đọc và lời dặn) với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng), so với câu
// của mọi kho khác, cả các kho Tiếng Việt 5 và câu riêng của các đề ngẫu nhiên.
// Chạy: node tests/tv5-gk1.js → in TV5 GK1 OK. DO_LO=1 in đáp án có ở câu khác (để xem tay, danh sách đã xem ở DA_XEM); DO_SACH=1 in
// chuỗi 6 từ trùng sách; DO_KHO=1 in chuỗi 6 từ trùng kho khác và câu gần trùng kho Tiếng Việt 4, Tiếng Việt 5 khác.
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
const S = { de1: "tv5-gk1-de1", de2: "tv5-gk1-de2", pool: "tv5-gk1-ngau-nhien" };
const DE = [S.de1, S.de2];
const cua = (id) => /^tv5-gk1-/.test(id);
const sum = (a) => a.reduce((s, v) => s + v, 0);
const nfc = (s) => String(s).normalize("NFC");
const thuong = (s) => nfc(s).toLowerCase();

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, DE, "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 40, b.id + ": 40 phút (có câu Viết tự chấm, như các kho Tiếng Việt 5 trước)");
  assert.equal(b.grade, 5); assert.equal(b.subject, "Tiếng Việt"); assert.equal(b.file, "5-tv.js");
  assert.ok(!/Sở GD&ĐT/.test(b.note), b.id + ": đề giữa kì không có câu về đề chung của Sở (Thông tư 89/2026 chỉ áp dụng cuối kì)");
  assert.ok(/^Nửa đầu học kì I \(tuần 1–8, Bài 1–16/.test(b.note), b.id + ": lời dặn ghi phạm vi tuần 1–8, Bài 1–16");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
assert.ok(rieng.length >= 45 && rieng.length <= 60, "đề ngẫu nhiên có khoảng 50 câu riêng: " + rieng.length);
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
{ // mã đoạn đọc không trùng giữa hai đề cố định và phần câu riêng, cũng không trùng mã đoạn của các kho khác cùng file
  const riengP = [...new Set(rieng.filter((q) => q.p).map((q) => q.p))];
  const ma = Object.keys(d1.passages).concat(Object.keys(d2.passages), riengP);
  assert.equal(new Set(ma).size, ma.length, "mã đoạn đọc không trùng giữa các đề");
  const khac = BANKS.filter((b) => b.file === "5-tv.js" && !cua(b.id)).flatMap((b) => Object.keys(b.passages || {}));
  ma.forEach((m) => assert.ok(!khac.includes(m), "mã đoạn đọc trùng kho khác cùng file: " + m));
  assert.ok(kho.every((q) => !q.p || PSG[q.p]), "câu có đoạn đọc trỏ tới đoạn có thật");
}
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("tv5-gk1-", "") + "#" + (i + 1))));
const cal = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
{
  const m = /id: "gk1-l5"[\s\S]*?banks: \[([^\]]*)\]/.exec(cal);
  assert.ok(m, "có kì thi gk1-l5");
  [S.de1, S.de2, S.pool].forEach((id) => assert.ok(m[1].includes(`"${id}"`), "gk1-l5 gắn đề " + id));
  const sc = /id: "gk1-l5"[\s\S]*?scope: "([^"]*)"/.exec(cal);
  assert.ok(sc && /Tiếng Việt: tập một, Bài 1–16 \(tuần 1–8\)/.test(sc[1]), "scope của gk1-l5 ghi phạm vi Tiếng Việt");
}

/* ---------- chữ trong câu ---------- */
const trich = (s) => [...nfc(s).matchAll(/“([^”]*)”/g)].map((m) => m[1]); // các đoạn trong ngoặc kép
const thoat = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const tuRe = (tu) => new RegExp("(^|[^\\p{L}])" + thoat(thuong(tu)) + "(?![\\p{L}])", "u");
const coTu = (cau, tu) => tuRe(tu).test(thuong(cau));
const mot = (q, ok, at) => { // đúng một lựa chọn thoả ok, và đó là lựa chọn đúng (đứng đầu mảng)
  const hit = q.o.filter(ok);
  assert.deepEqual(hit, [q.o[0]], `${at}: lựa chọn khớp ${JSON.stringify(hit)}, cần đúng một lựa chọn là đáp án ${JSON.stringify(q.o[0])}`);
};
const am = (s) => thuong(s).replace(/[^\p{L}\s]/gu, " ").split(/\s+/).filter(Boolean);
const tach = (o) => o.split(/,\s*/).map((w) => thuong(w).trim()).filter(Boolean); // “sáo sậu, chim gáy, cá rô” → các từ
const trongCau = (cau, ws, at) => ws.forEach((w) => assert.ok(coTu(cau, w), `${at}: “${w}” không có trong câu “${cau}”`));
const quote = (q, k) => trich(q.q)[k || 0];
const haiCau = (s) => nfc(s).split(/(?<=[.?!])\s+/); // tách đoạn hai câu

/* ---------- từ loại (Bài 1, tr. 10: danh từ chỉ sự vật, hiện tượng tự nhiên, thời gian…; động từ chỉ hoạt động, trạng thái; tính từ chỉ đặc
   điểm của sự vật, hoạt động, trạng thái) ---------- */
const LOAI = {
  danh: ["đàn trâu", "bờ đê", "mưa phùn", "sáng nay", "mái phố", "đêm rằm", "xóm nhỏ", "chim sẻ", "mái ngói", "nhà", "sáo sậu", "chim gáy", "cá rô",
    "ao làng", "chú mèo tam thể", "bậu cửa sổ", "đàn cá", "mẹ", "bánh trôi"],
  dong: ["gặm", "soi sáng", "nhảy", "nhảy nhót", "bay lượn", "bơi lội", "làm"],
  tinh: ["đủng đỉnh", "lất phất", "vằng vặc", "ríu rít", "thoăn thoắt", "líu lo", "say sưa", "gay gắt", "dịu dàng", "yếu ớt", "mát mẻ", "hiền hoà",
    "nhanh nhẹn", "nhỏ"]
};
const NHOM = { hienTuong: ["mưa phùn"], thoiGian: ["sáng nay", "đêm rằm"], conVat: ["sáo sậu", "chim gáy", "cá rô"] };
const loaiCua = (w) => Object.keys(LOAI).filter((k) => LOAI[k].includes(thuong(w)));
[...LOAI.danh, ...LOAI.dong, ...LOAI.tinh].forEach((w) => assert.equal(loaiCua(w).length, 1, "bảng từ: “" + w + "” có ở hai từ loại"));
Object.values(NHOM).flat().forEach((w) => assert.deepEqual(loaiCua(w), ["danh"], "bảng từ: “" + w + "” phải là danh từ"));
const TEN_LOAI = { danh: "danh từ", dong: "động từ", tinh: "tính từ" };
// từ loại của mọi từ trong các câu của câu “có đủ danh từ, động từ và tính từ” (HU: từ chỉ lượng, từ chỉ loại, hư từ, từ xưng hô)
const HU = ["mấy", "chú", "đang", "trên", "và", "em"];
const TU_CAU = {
  "Mấy chú chim sẻ ríu rít nhảy trên mái ngói.": ["chim sẻ", "ríu rít", "nhảy", "mái ngói"],
  "Mấy chú chim sẻ đang nhảy nhót trên mái ngói.": ["chim sẻ", "nhảy nhót", "mái ngói"],
  "Mấy chú chim sẻ trên mái ngói nhà em.": ["chim sẻ", "mái ngói", "nhà"],
  "Mái ngói nhà em và mấy chú chim sẻ nhỏ.": ["mái ngói", "nhà", "chim sẻ", "nhỏ"]
};
// các từ ghi ở bảng (cùng HU) phủ kín câu theo đúng thứ tự; trả về danh sách từ tìm được, không phủ kín thì null
const phuKin = (cau, ds) => {
  const w = am(cau), ra = []; let i = 0;
  while (i < w.length) {
    const m = ds.map((x) => thuong(x).split(" ")).filter((x) => x.every((y, k) => w[i + k] === y)).sort((a, b) => b.length - a.length)[0];
    if (!m) return null;
    ra.push(m.join(" ")); i += m.length;
  }
  return ra;
};

/* ---------- đại từ (Ghi nhớ tr. 21: thay thế, nghi vấn, xưng hô; danh từ dùng để xưng hô; luyện tập tr. 29–30, 38) ---------- */
const DAI = {
  xh: ["tôi", "tớ", "mình", "chúng mình", "chúng ta", "chúng tôi", "chúng tớ", "họ", "nó", "chúng", "chúng nó", "ta", "ngươi", "cậu"],
  nv: ["ai", "gì", "nào", "sao", "bao nhiêu", "đâu", "mấy", "bao giờ", "khi nào", "bao lâu", "thế nào"],
  tt: ["thế", "vậy", "đó", "này", "ấy", "kia", "đây"]
};
const laDai = (w) => Object.keys(DAI).find((k) => DAI[k].includes(thuong(w)));
const TEN_DAI = { xh: "Đại từ xưng hô", nv: "Đại từ nghi vấn", tt: "Đại từ thay thế" };
const XUNG_HO_DANH = ["ông", "bà", "bố", "mẹ", "anh", "chị", "em", "cháu", "con", "thầy", "cô", "bác", "chú", "bạn"]; // danh từ dùng để xưng hô
const HOI = { "lí do": ["sao"], "cách làm": ["thế nào"], "thời gian": ["khi nào", "lúc nào", "bao giờ"], "nơi chốn": ["đâu", "chỗ nào"] }; // đại từ nghi vấn → điều hỏi
// đếm đại từ trong một câu (đại từ hai tiếng đếm là một)
const demDai = (s) => { const w = am(s); let n = 0; for (let i = 0; i < w.length; i++) { if (w[i + 1] && laDai(w[i] + " " + w[i + 1])) { n++; i++; } else if (laDai(w[i])) n++; } return n; };
// sửa đoạn hai câu lặp từ: câu đầu giữ nguyên, câu sau không còn từ ngữ lặp, có đại từ xưng hô hay thay thế, không thành câu hỏi, còn các từ ở giu
function suaLap(q, at, lap, giu) {
  const c1 = haiCau(quote(q))[0];
  assert.ok(coTu(haiCau(quote(q))[1], lap), at + ": câu sau của đoạn đề bài phải lặp “" + lap + "”");
  mot(q, (o) => { const [s1, s2] = haiCau(o); return s1 === c1 && !!s2 && !coTu(s2, lap) && !/\?$/.test(s2) && (giu || []).every((w) => coTu(s2, w))
    && am(s2).some((w, i, a) => ["xh", "tt"].includes(laDai(w)) || ["xh", "tt"].includes(laDai(w + " " + (a[i + 1] || "")))); }, at);
}

/* ---------- từ đồng nghĩa (Ghi nhớ tr. 48; luyện tập tr. 58) ---------- */
const DONG_NGHIA = [["cố gắng", "nỗ lực"], ["hớn hở", "phấn khởi", "vui sướng"], ["chậm rãi", "thong thả"], ["hiền từ", "hiền hậu"], ["lợn", "heo"],
  ["âu yếm", "trìu mến"], ["lo lắng", "lo âu"], ["giúp đỡ", "hỗ trợ"], ["rộng rãi", "thênh thang"], ["yên ả", "im ắng"], ["gọn gàng", "ngăn nắp", "gọn ghẽ"],
  ["chăm sóc", "trông nom"], ["nhanh chóng", "mau lẹ"], ["kiên trì", "nhẫn nại"],
  // nhóm từ gần nghĩa của các câu chọn từ hợp văn cảnh
  ["xanh ngắt", "xanh rì", "xanh lè", "xanh mướt"], ["khiêng", "xách", "cõng", "đeo"], ["thì thầm", "quát tháo", "la hét", "hò reo"], ["đỏ hỏn", "đỏ rực", "đỏ chót", "đỏ ối"]];
const nhomDN = (w) => DONG_NGHIA.find((g) => g.includes(thuong(w)));
DONG_NGHIA.flat().forEach((w) => assert.equal(DONG_NGHIA.filter((g) => g.includes(w)).length, 1, "bảng từ đồng nghĩa: “" + w + "” ở hai nhóm"));
// từ hợp văn cảnh nhất (lí do ở lời giải từng câu)
const HOP_DN = { "Bầu trời mùa thu …": "xanh ngắt", "Hai bạn … chiếc bàn": "khiêng", "hai bạn … với nhau để không làm ồn": "thì thầm", "làn da còn … .": "đỏ hỏn" };
const HOP_TT = { "nắng … làm mặt đường như bốc hơi": "gay gắt" }; // tính từ hợp văn cảnh
function dongNghia(q, at, w) { const g = nhomDN(w); assert.ok(g, at + ": chưa có nhóm của “" + w + "”"); mot(q, (o) => g.includes(thuong(o)), at); }
function hopDN(q, at) {
  const k = Object.keys(HOP_DN).find((h) => q.q.includes(h)); assert.ok(k, at + ": chưa ghi từ hợp văn cảnh");
  const g = nhomDN(q.o[0]); assert.ok(g && q.o.every((o) => g.includes(thuong(o))), at + ": các lựa chọn cùng một nhóm từ"); mot(q, (o) => thuong(o) === HOP_DN[k], at);
}
// từ khác nghĩa trong dãy: ba từ cùng một nhóm đồng nghĩa, từ còn lại (đáp án) ngoài nhóm đó; các lựa chọn là bốn từ của dãy
function khacNghia(q, at) {
  const ds = tach(quote(q)); assert.deepEqual(ds.slice().sort(), q.o.map(thuong).sort(), at + ": lựa chọn là bốn từ của dãy");
  const g = nhomDN(q.o[1]); assert.ok(g && q.o.slice(1).every((o) => g.includes(thuong(o))), at + ": ba lựa chọn sai cùng một nhóm từ đồng nghĩa");
  mot(q, (o) => !g.includes(thuong(o)), at);
}

/* ---------- từ đa nghĩa (Ghi nhớ tr. 66: một nghĩa gốc và một hoặc một số nghĩa chuyển, các nghĩa luôn có liên hệ; luyện tập tr. 74) ---------- */
const GOC = { tay: "giơ tay", cửa: "cửa sổ", nặng: "bao gạo", bay: "đàn sếu bay", sâu: "cái giếng" }; // cụm từ nhận ra câu dùng nghĩa gốc
const CHUYEN = { đuôi: "đuôi đoàn tàu", bụng: "tốt bụng", quả: "quả đồi" }; // cụm từ nhận ra câu dùng nghĩa chuyển
const NGHIA = { // nghĩa của từ trong câu của đề bài: từ → [câu, nghĩa đúng]
  mở: ["trường em mở hội thi kể chuyện", /^Tổ chức/], non: ["Tay nghề của anh thợ mới vào xưởng còn non", /^Chưa thạo/],
  tươi: ["Cô giáo nở nụ cười thật tươi", /^Nghĩa chuyển: \(vẻ mặt, nụ cười\)/], già: ["mấy quả mướp già làm hạt giống", /^\(Quả\) đã lớn hết cỡ/],
  dày: ["Mạ mọc dày kín cả ruộng", /^Nhiều, sát vào nhau/] };
const NOI_NGHIA = { // câu nối: câu → nghĩa của từ trong câu
  "Cả lớp đứng nghiêm chào cờ.": "Ở tư thế thẳng người, chân đặt trên mặt đất", "Đồng hồ trên tường đứng từ đêm qua vì hết pin.": "Không chạy nữa, ngừng hoạt động (máy móc)",
  "Bạn Minh đứng đầu lớp về môn Toán.": "Có vị trí, thứ bậc cao nhất trong một nhóm",
  "Chiếc cặp của em hôm nay rất nhẹ.": "Có trọng lượng nhỏ, dễ nhấc", "Gió thổi nhẹ qua hàng cây.": "Yếu, không mạnh", "Bạn Khoa chỉ bị cảm nhẹ.": "Ở mức độ ít, không đáng lo" };
const DI = { "Bé đi từng bước chập chững.": "goc", "Ông đi một nước cờ rất hay.": "chuyen", "Chiếc áo trắng đi với quần xanh rất hợp.": "hop" };
const gocNghia = (q, at, w) => { q.o.forEach((o) => assert.ok(coTu(o, w), at + ": lựa chọn không có từ “" + w + "”")); mot(q, (o) => coTu(o, GOC[w]), at); };
const chuyenNghia = (q, at, w) => { q.o.forEach((o) => assert.ok(coTu(o, w), at + ": lựa chọn không có từ “" + w + "”")); mot(q, (o) => coTu(o, CHUYEN[w]), at); };
const noiNghia = (w) => (q, at) => q.l.forEach((l, i) => { assert.ok(coTu(l, w), at + ": câu không có từ “" + w + "”"); assert.equal(q.r[i], NOI_NGHIA[l], `${at}: nghĩa của “${w}” trong câu “${l}”`); });
const nghia = (w) => (q, at) => { const [cau, re] = NGHIA[w]; assert.ok(coTu(quote(q, 1), w) && q.q.includes(cau), at); mot(q, (o) => re.test(o), at); };

/* ---------- từng câu Luyện từ và câu ---------- */
const CHECKS = [
  // Danh từ, động từ, tính từ
  { has: "Đàn trâu đủng đỉnh gặm cỏ", right: (q, at) => { trongCau(quote(q), q.o, at); mot(q, (o) => loaiCua(o)[0] === "dong", at); } },
  { has: "từ “cày” là danh từ", right: (q, at) => { q.o.forEach((o) => assert.ok(coTu(o, "cày"), at)); mot(q, (o) => /(chiếc|cái) cày/.test(thuong(o)), at); } }, // sau từ chỉ loại là tên nông cụ
  { has: "nắng … làm mặt đường như bốc hơi", right: (q, at) => { q.o.forEach((o) => assert.deepEqual(loaiCua(o), ["tinh"], at + ": lựa chọn phải là tính từ: " + o)); mot(q, (o) => o === HOP_TT["nắng … làm mặt đường như bốc hơi"], at); } },
  { has: "mưa phùn lất phất bay", right: (q, at) => { trongCau(quote(q), q.o, at); mot(q, (o) => NHOM.hienTuong.includes(thuong(o)), at); } },
  { has: "trăng tròn vằng vặc", right: (q, at) => { const c = quote(q);
    return q.o.map((o) => { const m = /^“([^”]+)” là (danh từ|động từ|tính từ)( chỉ thời gian)?\.$/.exec(o); assert.ok(m, at + ": ý lạ " + o); trongCau(c, [m[1]], at);
      const k = Object.keys(TEN_LOAI).find((x) => TEN_LOAI[x] === m[2]), w = thuong(m[1]); assert.equal(loaiCua(w).length, 1, at + ": chưa ghi từ loại của “" + w + "”");
      return loaiCua(w)[0] === k && (!m[3] || NHOM.thoiGian.includes(w)); }); } },
  { has: "có đủ danh từ, động từ và tính từ", right: (q, at) => mot(q, (o) => { const ds = TU_CAU[o]; assert.ok(ds, at + ": chưa ghi từ loại của câu " + o);
    assert.ok(phuKin(o, ds.concat(HU)), at + ": bảng chưa phủ kín câu " + o); const k = new Set(ds.map((w) => { assert.equal(loaiCua(w).length, 1, at + ": " + w); return loaiCua(w)[0]; }));
    return ["danh", "dong", "tinh"].every((x) => k.has(x)); }, at) },
  { has: "nhảy thoăn thoắt lên bậu cửa", right: (q, at) => { trongCau(quote(q), q.o, at); q.o.forEach((o) => assert.equal(loaiCua(o).length, 1, at + ": " + o)); mot(q, (o) => loaiCua(o)[0] === "tinh", at); } },
  { has: "gồm toàn danh từ chỉ con vật", right: (q, at) => { q.o.forEach((o) => tach(o).forEach((w) => assert.equal(loaiCua(w).length, 1, at + ": chưa ghi từ loại của “" + w + "”")));
    mot(q, (o) => tach(o).every((w) => NHOM.conVat.includes(w)), at); } },
  { has: "Bé Na say sưa ngắm đàn cá", right: (q, at) => { trongCau(quote(q), q.l, at); q.l.forEach((w, i) => assert.equal(thuong(q.r[i]), TEN_LOAI[loaiCua(w)[0]], `${at}: “${w}”`)); } },
  { has: "từ “mưa” là động từ", right: (q, at) => { q.o.forEach((o) => assert.ok(coTu(o, "mưa"), at)); mot(q, (o) => /^trời mưa(?![\p{L}])/u.test(thuong(o)), at); } }, // “mưa” sau “Trời” chỉ việc trời đang làm; các câu kia: cơn mưa, hạt mưa, ngắm mưa
  { has: "sinh động hơn. Cách viết nào thêm một tính từ", right: (q, at) => { const gocCau = quote(q);
    const THEM = { "Dòng sông hiền hoà chảy qua làng.": "hiền hoà", "Dòng sông chảy qua làng em từ xưa.": "em từ xưa", "Dòng sông ấy vẫn chảy qua làng.": "ấy vẫn", "Dòng sông chảy qua làng rồi ra biển.": "rồi ra biển" };
    q.o.forEach((o) => { assert.ok(THEM[o], at + ": chưa ghi phần thêm của " + o); assert.equal(am(o).filter((w) => !am(THEM[o]).includes(w)).join(" "), am(gocCau).join(" "), at + ": bỏ phần thêm phải còn câu gốc: " + o); });
    mot(q, (o) => loaiCua(THEM[o])[0] === "tinh", at); } },
  { has: "Từ “nhanh nhẹn” điền vào chỗ trống", right: (q, at) => { const CHO = { "Chú sóc … chuyền từ cành này sang cành khác.": "tinh", "Chú sóc … một quả thông thật to rồi chạy biến.": "dong",
      "Chú sóc làm tổ trên một … cây cổ thụ rất cao.": "danh", "… , chú sóc đã chui về tổ ngủ một giấc dài.": "thoi-gian" }; // từ loại chỗ trống cần
    assert.deepEqual(loaiCua("nhanh nhẹn"), ["tinh"], at); q.o.forEach((o) => assert.ok(CHO[o], at + ": chưa ghi từ loại cần điền của " + o)); mot(q, (o) => CHO[o] === "tinh", at); } },
  // Đại từ
  { has: "từ “Mình” thuộc loại đại từ nào", right: (q) => { assert.ok(coTu(quote(q), "mình")); return TEN_DAI[laDai("mình")]; } },
  { has: "câu nào có đại từ xưng hô?", right: (q, at) => mot(q, (o) => DAI.xh.some((w) => coTu(o, w)), at) },
  { has: "Điều này” thay cho ý nào", right: (q, at) => { const [c1, c2] = haiCau(quote(q)); assert.ok(coTu(c2, "điều này") && !coTu(c1, "này"), at); mot(q, (o) => am(o).every((w) => am(c1).includes(w)), at); } },
  { has: "từ “sao” dùng để hỏi về điều gì", right: (q, at) => { assert.equal(laDai("sao"), "nv", at); assert.ok(HOI["lí do"].includes("sao"), at); mot(q, (o) => /^Lí do/.test(o), at); } },
  { has: "chúc mừng sinh nhật bà ngoại", right: (q, at) => mot(q, (o) => coTu(o, "cháu") && coTu(o, "ạ") && !DAI.xh.some((w) => coTu(o, w)), at) }, // nói với người lớn: xưng “cháu”, có “ạ”, không dùng đại từ xưng hô của bạn bè
  { has: "Bố mua cho Hải một chiếc xe đạp mới", right: (q, at) => suaLap(q, at, "xe đạp") },
  { has: "Câu nào dưới đây có đại từ thay thế?", right: (q, at) => { q.o.forEach((o) => assert.ok(!DAI.tt.some((w) => coTu(haiCau(o)[0], w)), at + ": câu trước không có đại từ thay thế"));
    mot(q, (o) => DAI.tt.some((w) => coTu(haiCau(o)[1], w)), at); } },
  { has: "từ ngữ “khi nào” thuộc loại đại từ nào", right: (q) => { assert.ok(coTu(quote(q), "khi nào")); return TEN_DAI[laDai("khi nào")]; } },
  { has: "Sói quát Dê con", right: (q, at) => { const c = quote(q); assert.ok(coTu(c, "ta") && coTu(c, "ngươi"), at); mot(q, (o) => /hống hách/.test(o), at); } }, // xưng “ta”, gọi “ngươi”: kẻ cả, coi thường
  { has: "Từ “Chúng tôi” chỉ những người nào", right: (q, at) => mot(q, (o) => /chú bộ đội/i.test(o) && !/bạn nhỏ|người dân/.test(o), at) }, // “chúng tôi” gồm người nói và người cùng phía, không gồm người nghe
  { has: "Anh Tùng học lớp 5", right: (q, at) => mot(q, (o) => coTu(o, "em") && coTu(o, "anh") && !DAI.xh.some((w) => coTu(o, w)), at) },
  { has: "về cách gói bánh chưng", right: (q, at) => mot(q, (o) => HOI["cách làm"].some((w) => coTu(o, w)), at) },
  { has: "Câu nào dưới đây có đại từ nghi vấn?", right: (q, at) => mot(q, (o) => DAI.nv.some((w) => coTu(o, w)), at) },
  { has: "từ “ấy” thuộc loại đại từ nào", right: (q) => { assert.ok(coTu(quote(q), "ấy")); return TEN_DAI[laDai("ấy")]; } },
  { has: "ghi số đại từ đếm được", right: (q) => demDai(quote(q)) },
  { has: "danh từ được dùng để xưng hô", right: (q, at) => mot(q, (o) => { const m = /^“(\p{L}+) ơi, (\p{L}+) /u.exec(o); return !!m && XUNG_HO_DANH.includes(thuong(m[1])) && XUNG_HO_DANH.includes(thuong(m[2])); }, at) },
  { has: "Từ “vậy” trong “Vì vậy” thay cho ý nào", right: (q, at) => { const [c1, c2] = haiCau(quote(q)); assert.ok(/^Vì vậy/.test(c2), at); mot(q, (o) => am(o).every((w) => am(c1).includes(w)), at); } },
  { has: "ông để phần cháu đấy", right: (q, at) => { const c = quote(q); assert.ok(coTu(c, "cháu") && coTu(c, "ông"), at); mot(q, (o) => /yêu thương/.test(o), at); } },
  { has: "Em dùng nó để chép", right: (q, at) => { const [c1, c2] = haiCau(quote(q)); assert.ok(coTu(c2, "nó") && !coTu(c1, "nó"), at); mot(q, (o) => thuong(c1).includes(thuong(o)), at); } },
  { has: "Nghe tin này", right: (q, at) => { const [c1, c2] = haiCau(quote(q)); assert.ok(coTu(c2, "tin này"), at); mot(q, (o) => am(o).every((w) => am(c1).includes(w)), at); } },
  { has: "Mảnh vườn nhỏ trồng đủ các loại rau", right: (q, at) => suaLap(q, at, "vườn") },
  { has: "Bạn Mai mới chuyển đến lớp 5C", right: (q, at) => mot(q, (o) => coTu(o, "tớ") && !["nó", "ta", "cậu", "họ"].some((w) => coTu(o, w)), at) }, // với bạn cùng lứa: tự xưng “tớ”
  { has: "được xếp ở giá sách nào", right: (q, at) => mot(q, (o) => /^Thưa cô,/.test(o) && /ạ\?$/.test(o) && coTu(o, "nào"), at) },
  { has: "Hoa nhài nhà bà cũng rất thơm", right: (q, at) => suaLap(q, at, "rất thơm", ["hoa nhài"]) },
  // Từ đồng nghĩa
  { has: "Từ nào đồng nghĩa với từ “cố gắng”?", right: (q, at) => dongNghia(q, at, "cố gắng") },
  { has: "chỉ gồm các từ đồng nghĩa với nhau", right: (q, at) => mot(q, (o) => { const ws = tach(o), g = nhomDN(ws[0]); return !!g && ws.every((w) => g.includes(w)); }, at) },
  { has: "thay từ “chậm rãi”", right: (q, at) => dongNghia(q, at, "chậm rãi") },
  { has: "Bầu trời mùa thu …", right: hopDN },
  { has: "gần nghĩa nhất với từ “hiền từ”", right: (q, at) => dongNghia(q, at, "hiền từ") },
  { has: "là cặp từ đồng nghĩa?", right: (q, at) => mot(q, (o) => { const [a, b] = o.split(" – ").map((x) => thuong(x).replace(/^con /, "")); const g = nhomDN(a); return !!g && g.includes(b); }, at) },
  { has: "thay “âu yếm”", right: (q, at) => dongNghia(q, at, "âu yếm") },
  { has: "Hai bạn … chiếc bàn", right: hopDN },
  { has: "đồng nghĩa với từ “lo lắng”", right: (q, at) => dongNghia(q, at, "lo lắng") },
  { has: "cùng nghĩa với “giúp đỡ”", right: (q, at) => dongNghia(q, at, "giúp đỡ") },
  { has: "gần giống với từ “rộng rãi”", right: (q, at) => dongNghia(q, at, "rộng rãi") },
  { has: "Mặt hồ yên ả", right: (q, at) => { const c = quote(q); mot(q, (o) => { const [a, b] = o.split(" – "); assert.ok(coTu(c, a) && coTu(c, b), at + ": cặp từ phải có trong đoạn: " + o);
    const g = nhomDN(a); return !!g && g.includes(thuong(b)); }, at); } },
  { has: "gọn gàng, ngăn nắp, gọn ghẽ, bừa bộn", right: khacNghia },
  { has: "Ghép mỗi từ bên trái với một từ đồng nghĩa", right: (q, at) => q.l.forEach((l, i) => { const g = nhomDN(l); assert.ok(g && g.includes(thuong(q.r[i])), `${at}: “${l}” – “${q.r[i]}”`);
    q.r.forEach((r, k) => assert.ok(k === i || !g.includes(thuong(r)), at + ": mỗi ô bên phải chỉ hợp với một ô bên trái")); }) },
  { has: "hai bạn … với nhau để không làm ồn", right: hopDN },
  { has: "làn da còn … .", right: hopDN },
  // Từ đa nghĩa
  { has: "từ “tay” được dùng với nghĩa gốc", right: (q, at) => gocNghia(q, at, "tay") },
  { has: "từ “đuôi” với nghĩa chuyển", right: (q, at) => chuyenNghia(q, at, "đuôi") },
  { has: "của từ “đứng” trong câu đó", right: noiNghia("đứng") },
  { has: "trường em mở hội thi kể chuyện", right: nghia("mở") },
  { has: "từ “cửa” được dùng với nghĩa gốc", right: (q, at) => gocNghia(q, at, "cửa") },
  { has: "từ “nặng” với nghĩa gốc", right: (q, at) => gocNghia(q, at, "nặng") },
  { has: "Tay nghề của anh thợ mới vào xưởng còn non", right: nghia("non") },
  { has: "Cô giáo nở nụ cười thật tươi", right: nghia("tươi") },
  { has: "từ “bụng” với nghĩa chuyển", right: (q, at) => chuyenNghia(q, at, "bụng") },
  { has: "từ “bay” được dùng với nghĩa gốc", right: (q, at) => gocNghia(q, at, "bay") },
  { has: "từ “quả” với nghĩa chuyển", right: (q, at) => chuyenNghia(q, at, "quả") },
  { has: "từ “sâu” được dùng với nghĩa gốc", right: (q, at) => gocNghia(q, at, "sâu") },
  { has: "của từ “nhẹ” trong câu đó", right: noiNghia("nhẹ") },
  { has: "mấy quả mướp già làm hạt giống", right: nghia("già") },
  { has: "Mỗi ý sau về từ “đi” đúng hay sai?", right: (q, at) => q.o.map((o) => { // Ghi nhớ tr. 66: các nghĩa của từ đa nghĩa luôn có liên hệ với nhau
    if (/^Trong câu/.test(o)) { const c = trich(o)[0]; assert.ok(DI[c] && coTu(c, "đi"), at + ": chưa ghi nghĩa của “đi” trong câu " + c);
      if (/ nghĩa gốc\.$/.test(o)) return DI[c] === "goc"; assert.ok(/hợp với nhau\.$/.test(o), at + ": ý lạ " + o); return DI[c] === "hop"; }
    assert.ok(/không liên quan gì đến nhau/.test(o), at + ": ý lạ " + o); return false; }) },
  { has: "Mạ mọc dày kín cả ruộng", right: nghia("dày") }
];
let soCau = 0;
const daKiem = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.type !== "essay" && q.topic !== "Đọc hiểu" && q.q.includes(c.has));
  assert.ok(m.length >= 1, `“${c.has}”: không có câu nào trong kho`);
  m.forEach((q) => {
    const at = ten.get(q) + " (" + c.has + ")";
    assert.ok(!daKiem.has(q), at + ": câu khớp hai mục của CHECKS");
    const want = c.right(q, at);
    daKiem.add(q); soCau++;
    if (want === undefined) return;
    const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.type === "num" ? q.ans : q.o[0];
    assert.deepEqual(got, want, `${at}: đáp án ${JSON.stringify(got)}, tính được ${JSON.stringify(want)}`);
  });
});
// mọi câu Luyện từ và câu đều được đọc lại
kho.filter((q) => !["Đọc hiểu", "Viết"].includes(q.topic)).forEach((q) => assert.ok(daKiem.has(q), "câu Luyện từ và câu chưa có cách đọc lại đáp án: " + ten.get(q) + " " + q.q.slice(0, 60)));


/* ---------- Đọc hiểu: chữ trích có trong đoạn đọc; câu sắp xếp đúng thứ tự trong đoạn; câu đúng/sai, câu điền, câu trả lời bằng số khớp đoạn ---------- */
const gon = (s) => thuong(s).replace(/\s*\/\s*/g, " ").replace(/\s+/g, " ").trim();
kho.filter((q) => q.topic === "Đọc hiểu").forEach((q) => {
  const at = ten.get(q), text = gon(PSG[q.p].text), qq = q.type === "fill" ? q.q.replace("___", q.ans[0]) : q.q;
  trich(qq).concat(trich(q.x)).forEach((c) => assert.ok(text.includes(gon(c).replace(/[.]$/, "")), `${at}: chữ trích “${c}” không có trong đoạn đọc ${q.p}`));
});
const THU_TU = { "Nụ quỳnh căng tròn, trắng muốt": "nụ quỳnh căng tròn", "Cả nhà bày ghế ra hiên ngồi chờ": "bày ghế ra hiên",
  "Những cánh hoa ngoài cùng từ từ tách ra": "từ từ tách ra", "Bông quỳnh nở trọn, to bằng cái bát": "đã nở trọn" };
kho.filter((q) => q.type === "order").forEach((q) => {
  const at = ten.get(q), text = gon(PSG[q.p].text), i = q.o.map((o) => { assert.ok(THU_TU[o], at + ": chưa ghi chỗ của sự việc ở THU_TU: " + o); return text.indexOf(gon(THU_TU[o])); });
  assert.ok(i.every((v, k) => v >= 0 && (!k || v > i[k - 1])), at + ": các sự việc không theo thứ tự trong đoạn đọc");
});
{ const tf = kho.filter((q) => q.type === "tf"); assert.ok(tf.length >= 1 && tf.every((q) => q.topic === "Đọc hiểu" && q.p), "câu đúng/sai thuộc Đọc hiểu");
  const t = tf.find((q) => /lớp vỏ cứng bằng đá vôi/.test(q.q)); assert.ok(t && t.a === true && PSG[t.p].text.includes("Mỗi con tự tạo cho mình một lớp vỏ cứng bằng đá vôi."), "câu đúng/sai khớp đoạn đọc"); }
{ const SO_CHU = { 2: "hai" }; kho.filter((q) => q.type === "num" && q.topic === "Đọc hiểu").forEach((q) => assert.ok(PSG[q.p].text.includes("Mỗi ngày " + SO_CHU[q.ans] + " lần"), ten.get(q) + ": số khớp đoạn đọc")); }
kho.filter((q) => q.type === "fill").forEach((q) => assert.ok(q.topic === "Đọc hiểu" && q.ans.length === 1 && gon(PSG[q.p].text).includes(gon(trich(q.q)[0].replace("___", q.ans[0]))), ten.get(q) + ": câu điền chép đúng dòng thơ"));

/* ---------- ma trận, chữ chủ đề, đoạn đọc, câu Viết ---------- */
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
const TOPIC_TEN = ["Đọc hiểu", "Danh từ, động từ, tính từ", "Đại từ", "Từ đồng nghĩa", "Từ đa nghĩa", "Viết"];
const demO = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
assert.deepEqual(TOPICS, TOPIC_TEN, "chủ đề theo thứ tự các bài Luyện từ và câu của Bài 1–15, Viết đứng cuối");
assert.deepEqual(TOPICS.map((t) => sum(M[t])), [7, 3, 6, 4, 4, 1], "7 câu Đọc hiểu, 17 câu Luyện từ và câu (theo số bài: danh từ, động từ, tính từ 1; đại từ 3; từ đồng nghĩa 2; từ đa nghĩa 2), 1 câu Viết");
TOPICS.forEach((t) => assert.ok(("chu-de:5:tv:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
{ // chủ đề đúng chữ chủ đề của kho cuối kì I (đề “Ôn chủ đề” rút chung câu cùng chủ đề)
  const ck1 = new Set(BANKS.filter((b) => b.file === "5-tv.js" && /^tv5-ck1-/.test(b.id)).flatMap((b) => b.questions.map((q) => q.topic)));
  TOPICS.forEach((t) => assert.ok(ck1.has(t), "chủ đề phải đúng chữ của kho cuối kì I: " + t));
}
assert.deepEqual([...new Set(kho.map((q) => q.topic))].sort(), TOPICS.slice().sort(), "chủ đề của kho đúng chữ của ma trận");
[d1.questions, d2.questions].forEach((d, i) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, `Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => demO(d, t, l)), v, `Đề ${i + 1} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const have = kho.filter((q) => q.topic === t && q.lv === l);
  assert.ok(v[l - 1] ? have.length >= 2 * v[l - 1] : have.length === 0, `ô (${t}, mức ${l}) rút ${v[l - 1]} câu, kho có ${have.length}`);
  if (t !== "Đọc hiểu" && t !== "Viết" && v[l - 1]) assert.deepEqual(DE.concat(S.pool).map((s) => have.filter((q) => q.src === s).length), [v[l - 1], v[l - 1], 2 * v[l - 1]], `ô (${t}, mức ${l}): mỗi đề cố định ${v[l - 1]} câu, câu riêng ${2 * v[l - 1]}`);
}));
// đoạn đọc: chỉ ở Đọc hiểu, mọi câu Đọc hiểu có đoạn; mỗi đề cố định một đoạn 4 câu 1-1-2-3 và một đoạn 3 câu 1-2-3, câu riêng hai đoạn mỗi loại
assert.ok(kho.filter((q) => q.topic === "Đọc hiểu").every((q) => q.p) && kho.filter((q) => q.p).every((q) => q.topic === "Đọc hiểu"), "đoạn đọc chỉ dùng cho câu Đọc hiểu");
const mucDoan = (id) => kho.filter((q) => q.p === id).map((q) => q.lv).join("-");
Object.keys(PSG).forEach((id) => assert.ok(["1-1-2-3", "1-2-3"].includes(mucDoan(id)), `đoạn ${id}: mức ${mucDoan(id)}, cần 1-1-2-3 hoặc 1-2-3`));
[[S.de1, 1], [S.de2, 1], [S.pool, 2]].forEach(([id, k]) => {
  const ps = [...new Set(kho.filter((q) => q.src === id && q.p).map((q) => q.p))];
  assert.deepEqual(["1-1-2-3", "1-2-3"].map((x) => ps.filter((d) => mucDoan(d) === x).length), [k, k], id + ": số đoạn 4 câu, 3 câu");
});
[d1.questions, d2.questions, rieng].forEach((qs) => { const ps = qs.map((q) => q.p || ""); ps.forEach((x, i) => assert.ok(!x || ps.indexOf(x) === i || ps[i - 1] === x, "câu cùng đoạn đọc đứng liền nhau: " + x)); });
// câu Viết: chỉ tự luận, 4–6 ý chấm, 5 điểm, gợi ý có ví dụ; đủ các kiểu bài Viết của Bài 1–16, mỗi kiểu một câu
const viet = kho.filter((q) => q.topic === "Viết");
assert.ok(viet.every((q) => q.type === "essay") && kho.filter((q) => q.type === "essay").every((q) => q.topic === "Viết"), "chủ đề Viết chỉ gồm câu tự luận, tự luận chỉ ở Viết");
viet.forEach((q) => {
  assert.ok(q.rubric.length >= 4 && q.rubric.length <= 6, "câu Viết có 4–6 ý chấm: " + ten.get(q));
  assert.equal(sum(q.rubric.map((r) => r.p)), 5, "câu Viết 5 điểm như các kho Tiếng Việt 4, 5: " + ten.get(q));
  assert.ok(q.rubric.every((r) => r.p > 0 && r.p * 4 === Math.round(r.p * 4)), "điểm mỗi ý chia hết cho 0,25: " + ten.get(q));
  assert.ok(/^Gợi ý:/.test(q.x) && /\nVí dụ/.test(q.x) && q.x.length > 400, "câu Viết có gợi ý và bài mẫu: " + ten.get(q));
});
const KIEU_VIET = { "bài văn kể chuyện sáng tạo (Bài 1–5)": /kể sáng tạo câu chuyện theo lời/, "dàn ý bài văn kể chuyện sáng tạo (Bài 3)": /lập dàn ý để kể lại câu chuyện/,
  "báo cáo công việc (Bài 6–8)": /viết bản báo cáo/, "bài văn tả phong cảnh (Bài 15)": /^Viết bài văn .*tả cảnh/, "dàn ý bài văn tả phong cảnh (Bài 13)": /lập dàn ý cho bài văn tả cảnh/,
  "đoạn văn tả phong cảnh (Bài 14)": /^Viết một đoạn văn .*tả/, "mở bài, kết bài của bài văn tả phong cảnh (Bài 11)": /mở bài theo kiểu gián tiếp và đoạn kết bài theo kiểu mở rộng/ };
viet.forEach((q) => assert.equal(Object.values(KIEU_VIET).filter((re) => re.test(q.q)).length, 1, "câu Viết thuộc đúng một kiểu bài: " + ten.get(q)));
Object.entries(KIEU_VIET).forEach(([k, re]) => assert.equal(viet.filter((q) => re.test(q.q)).length, 1, "mỗi kiểu bài Viết một câu: " + k));
assert.equal(viet.length, 7, "7 câu Viết: " + viet.length);

/* ---------- dạng câu, cách viết ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 2, "mỗi kho ít nhất 2 câu đúng/sai 4 ý");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
["fill", "tf", "num", "match", "order"].forEach((t) => assert.ok(kho.some((q) => q.type === t), "kho có dạng câu " + t));
assert.ok(kho.every((q) => ["mc", "tf", "tf4", "fill", "num", "match", "order", "essay"].includes(q.type)), "chỉ dùng dạng câu hợp với tiểu học");
const ngoaiNgoac = (s) => nfc(s).replace(/“[^”]*”/g, " ").replace(/‘[^’]*’/g, " ");
kho.forEach((q) => assert.ok(!/(của em|(?<![Cc]ác )em hãy|Em hãy|theo em|Theo em|em chọn)\b/.test(ngoaiNgoac([q.q].concat(q.type === "essay" ? [q.x.split("\nVí dụ")[0]] : [q.x]).join(" "))), "gọi người làm bài là “bạn”: " + ten.get(q)));
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b|câu (đầu|cuối) của đề/.test(q.x), "lời giải nhắc vị trí của ý, câu: " + ten.get(q)));
kho.filter((q) => q.type === "mc").forEach((q) => assert.ok(!/[Cc]âu thứ (nhất|hai|ba|tư)/.test(ngoaiNgoac(q.x)) || /“[^”]*\.[^”]*\.[^”]*”|\(1\)/.test(q.q),
  "lời giải gọi lựa chọn bằng thứ tự (app xáo lựa chọn): " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau; ba lựa chọn sai không cùng mở đầu bằng một chữ
const mcs = kho.filter((q) => q.type === "mc");
mcs.forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o.map((o) => nfc(o).trim())).size, q.o.length, "lựa chọn trùng nhau (phân biệt chữ hoa: có câu hỏi cách viết tên riêng): " + ten.get(q));
  const dau = (o) => thuong(o).split(/\s+/)[0], sai = q.o.slice(1).map(dau);
  assert.ok(!(sai.length >= 3 && sai.every((d) => d === sai[0]) && dau(q.o[0]) !== sai[0]), "ba lựa chọn sai cùng mở đầu bằng “" + sai[0] + "”: " + ten.get(q));
});
// đáp án đúng là lựa chọn dài nhất hay ngắn nhất (kể cả bằng nhau) ở không quá một phần ba số câu nhiều lựa chọn
const daiNhat = mcs.filter((q) => q.o[0].length >= Math.max(...q.o.slice(1).map((o) => o.length))).length;
const nganNhat = mcs.filter((q) => q.o[0].length <= Math.min(...q.o.slice(1).map((o) => o.length))).length;
assert.ok(3 * daiNhat <= mcs.length, `đáp án là lựa chọn dài nhất ở ${daiNhat}/${mcs.length} câu nhiều lựa chọn`);
assert.ok(3 * nganNhat <= mcs.length, `đáp án là lựa chọn ngắn nhất ở ${nganNhat}/${mcs.length} câu nhiều lựa chọn`);
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
{ const phanNhan = (t) => t.split(/ và |, /).map((s) => thuong(s).trim()).filter((s) => s.includes(" ") || s.length >= 6);
  kho.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => {
    if (thuong(d).includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => thuong(o).includes(c)), `${ten.get(q)}: đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); }); }
// đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng
const goc = (s) => thuong(s).replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "5-tv.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- rút thử ---------- */
const docHieu = kho.filter((q) => q.topic === "Đọc hiểu"), soCauDoan = (id) => kho.filter((q) => q.p === id).length;
const thu = (hist) => {
  const d = Quiz.draw(p, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, p.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => demO(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  const got = {}; d.questions.filter((q) => q.p).forEach((q) => (got[q.p] = (got[q.p] || 0) + 1));
  assert.ok(Object.keys(got).length <= Math.ceil(sum(M["Đọc hiểu"]) / 3), "Đọc hiểu lấy quá ⌈7/3⌉ đoạn");
  assert.ok(Object.keys(got).filter((x) => got[x] < soCauDoan(x)).length <= 1, "nhiều nhất một đoạn lấy một phần");
  return d;
};
const seen = new Set();
for (let k = 0; k < 400; k++) thu().questions.forEach((q) => seen.add(Quiz.key(q)));
assert.equal(seen.size, kho.length, "400 lần rút thử phải gặp đủ câu của kho");
// học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên không rút lại câu của đề đó (Rút ra N12)
DE.forEach((lam) => { for (let k = 0; k < 30; k++) assert.ok(thu((q) => (q.src === lam ? { done: 1, wrong: 0 } : null)).questions.every((q) => q.src !== lam), `đã làm hết ${lam} thì không rút lại câu của đề đó`); });
assert.ok(docHieu.length === 28, "28 câu Đọc hiểu: " + docHieu.length);

/* ---------- dò lộ đáp án ----------
   Như tests/tv5-gk2.js: đề ngẫu nhiên rút chung câu của các chủ đề khác, câu cùng đoạn đọc luôn đi cùng nhau, lời dặn (note) hiện ở màn mở
   đề nên cũng là “câu kia”; đề “Ôn chủ đề” rút chung mọi câu của một chủ đề trong các kho Tiếng Việt 5 (cả câu cùng chủ đề của kho cuối kì
   I, giữa kì II, kèm đoạn đọc của chúng). Đáp án (lựa chọn đúng, đáp án điền) tách thành chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì
   lấy cả đáp án); cặp nối thì câu kia có cả hai vế. Chuỗi có ở đề bài, lựa chọn đúng, đáp án, ô nối, lời giải, thang chấm hay đoạn đọc
   (khác đoạn của câu này) của câu kia thì in ra với DO_LO=1 để xem tay; danh sách đã xem ở DA_XEM. Lựa chọn sai của câu kia không tính
   (Rút ra N25). Đáp án một, hai từ (kết từ, từ ngữ nối, đại từ) là chữ thường gặp: chỉ tính khi câu kia nhắc chính từ đó trong ngoặc kép,
   hoặc câu cùng chủ đề có từ đó ở lựa chọn đúng, đáp án, ô nối, lời giải (bỏ câu ví dụ trong ngoặc kép). Cặp câu của kho khác với nhau
   không tính. */
const tu = (s) => thuong(s).replace(/[«»“”‘’"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((r) => r.c)).map(String);
const chuDung = (q) => [q.q, q.x].concat(q.type === "mc" ? [q.o[0]] : q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((r) => r.c)).map(String); // bỏ lựa chọn sai
const LOI_DAN_DE = [...new Set([S.de1, S.de2, S.pool].map((id) => bank(id).note))].map((note, i) => ({ q: note, x: "", note: true, ten: "note" + (i + 1) }));
// câu cùng chủ đề của các kho Tiếng Việt 5 khác (đề “Ôn chủ đề”), kèm đoạn đọc của kho đó
const KHAC_CD = BANKS.filter((b) => b.file === "5-tv.js" && !cua(b.id)).flatMap((b) => b.questions.filter((q) => (!b.pool || q.src === b.id) && TOPICS.includes(q.topic))
  .map((q, i) => Object.assign({}, q, { khac: true, ten: b.id.replace("tv5-", "") + "#" + (b.questions.indexOf(q) + 1), doan: q.p && b.passages && b.passages[q.p] ? b.passages[q.p].text : null })));
const tenCau = (q) => (q.note || q.khac ? q.ten : ten.get(q) || q.topic);
const doanCua = (q) => (q.khac ? q.doan : q.p ? PSG[q.p].text : null);
const CHUNG = new Set(["Đại từ nghi vấn", "Đại từ xưng hô", "Đại từ thay thế"]); // câu hỏi loại đại từ: bốn lựa chọn là tên loại, dò câu được hỏi
const CUM_CHUNG = new Set(["đại từ nghi", "từ nghi vấn", "đại từ xưng", "từ xưng hô", "đại từ thay", "từ thay thế", "nghĩa chuyển chỉ", "nghĩa gốc chỉ"]);
// số lựa chọn sai của câu nhiều lựa chọn có chuỗi c: chuỗi có ở từ hai lựa chọn sai không giúp chọn đáp án (như tests/soat-nhap.js)
const saiCo = (q, c) => (q.type === "mc" ? q.o.slice(1).filter((o) => (" " + tu(o).join(" ") + " ").includes(" " + c + " ")).length : 0);
const doLo = (qs, them) => {
  const ra = [];
  qs.forEach((q) => {
    if (q.khac) return; // đáp án của câu kho khác chỉ xét khi câu kia là câu của kho này (vòng của câu kho này bên dưới)
    const dap = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : [];
    const chung = q.type === "mc" && CHUNG.has(q.o[0]);
    const C = chung ? [tu(trich(q.q)[0] || q.q).join(" ")] : [...new Set(dap.flatMap(cum))].filter((c, k, a) => a.length === 1 || !CUM_CHUNG.has(c)).filter((c) => saiCo(q, c) < 2), cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const ngan = C.length === 1 && !chung && dap.length && tu(dap[0]).length <= 2 ? C[0] : null;
    qs.concat(them || []).forEach((p2) => {
      if (p2 === q) return;
      if (p2.khac && p2.topic !== q.topic) return; // câu của kho khác chỉ đi cùng câu này ở đề “Ôn chủ đề” của cùng chủ đề
      const d2 = doanCua(p2), nguon = p2.note ? [p2.q] : chuDung(p2).concat(d2 && !(p2.p && p2.p === q.p && !p2.khac) ? [d2] : []);
      if (ngan) {
        const ngoac = nguon.some((x) => [...nfc(x).matchAll(/“([^”]*)”/g)].some((m) => tu(m[1]).join(" ") === ngan));
        const cungCD = !p2.note && p2.topic === q.topic && [p2.x].concat(p2.type === "mc" ? [p2.o[0]] : p2.o || [], p2.ans == null || typeof p2.ans === "number" ? [] : [].concat(p2.ans), p2.l || [], p2.r || [])
          .some((x) => (" " + tu(nfc(x).replace(/“[^”]*\s[^”]*”/g, " ")).join(" ") + " ").includes(" " + ngan + " "));
        if (ngoac || cungCD) ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${ngan}`);
        return;
      }
      const T = " " + nguon.map((s) => tu(s).join(" ")).join(" | ") + " ";
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
      cap.filter(([l, r]) => T.includes(" " + tu(l).join(" ") + " ") && T.includes(" " + tu(r).join(" ") + " ")).forEach(([l, r]) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${l} → ${r}`));
    });
  });
  // đáp án của câu kho khác có ở câu cùng chủ đề của kho này
  (them || []).filter((q) => q.khac).forEach((q) => {
    const dap = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : [];
    const C = [...new Set(dap.flatMap(cum))].filter((c, k, a) => a.length === 1 || !CUM_CHUNG.has(c)).filter((c) => saiCo(q, c) < 2), ngan = C.length === 1 && dap.length && tu(dap[0]).length <= 2 ? C[0] : null;
    qs.filter((p2) => p2.topic === q.topic).forEach((p2) => {
      const d2 = doanCua(p2), nguon = chuDung(p2).concat(d2 ? [d2] : []);
      if (ngan) {
        const ngoac = nguon.some((x) => [...nfc(x).matchAll(/“([^”]*)”/g)].some((m) => tu(m[1]).join(" ") === ngan));
        const cungCD = [p2.x].concat(p2.type === "mc" ? [p2.o[0]] : p2.o || [], p2.ans == null || typeof p2.ans === "number" ? [] : [].concat(p2.ans), p2.l || [], p2.r || [])
          .some((x) => (" " + tu(nfc(x).replace(/“[^”]*\s[^”]*”/g, " ")).join(" ") + " ").includes(" " + ngan + " "));
        if (ngoac || cungCD) ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${ngan}`);
        return;
      }
      const T = " " + nguon.map((s) => tu(s).join(" ")).join(" | ") + " ";
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
    });
  });
  return [...new Set(ra)];
};
const lo = doLo(kho, LOI_DAN_DE.concat(KHAC_CD));
if (process.env.DO_LO) console.log("Đáp án có ở câu khác (xem tay):\n" + lo.join("\n"));
// đã xem tay (Phiên N5-ck2-tv, 23/11/2026): không lộ đáp án thật (ghi lí do từng dòng ở mô tả Pull Request của phiên)
// đã xem tay (Phiên N5-gk1-tv, 27/11/2026): không lộ đáp án thật (ghi lí do từng dòng ở mô tả Pull Request của phiên)
const DA_XEM = [];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu khác đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = kho.find((q) => q.q.includes("Bầu trời mùa thu …")), b = kho.find((q) => q.q.includes("Hai bạn … chiếc bàn"));
  assert.ok(doLo([a, Object.assign({}, b, { x: b.x + " Ví dụ: “xanh ngắt”." })]).some((s) => /: xanh ngắt$/.test(s)), "bộ dò phải bắt được đáp án hai từ nhắc trong ngoặc kép ở câu khác");
  const c = kho.find((q) => q.q.includes("Nhóm của Bảo được giao việc gì?")), d = kho.find((q) => q.q.includes("Thầy phụ trách chỉ cho cả nhóm"));
  assert.ok(doLo([c, Object.assign({}, d, { x: d.x + " Cả nhóm được giao dựng lều ở bìa rừng thông." })]).some((s) => /bìa rừng thông/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
  const e = kho.find((q) => q.q.includes("Bầu trời mùa thu …")), f = KHAC_CD.find((q) => q.topic === "Từ đồng nghĩa");
  assert.ok(doLo([e], [Object.assign({}, f, { x: f.x + " “xanh ngắt”." })]).some((s) => /: xanh ngắt$/.test(s)), "bộ dò phải bắt được đáp án có ở câu cùng chủ đề của kho khác");
}

/* ---------- câu ôn không trùng câu cùng chủ đề của các kho Tiếng Việt 5 khác (lời giao việc: kho cuối kì I; như tests/van9-gk1.js) ----------
   Câu cùng chủ đề của các kho đó: đề bài không trùng, không chung chuỗi 6 từ (bỏ cách hỏi chuẩn ở TU_CHUNG), đáp án không trùng. */
const khongDau = (() => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = nfc(k).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim(); m.set(k, v); } return v; }; })();
const TU_CHUNG = [...TOPIC_TEN, "luyện tập về danh từ, động từ, tính từ", "luyện tập về đại từ", "luyện tập về từ đồng nghĩa", "luyện tập về từ đa nghĩa",
  "bài văn kể chuyện sáng tạo", "kể chuyện sáng tạo", "báo cáo công việc", "bài văn tả phong cảnh", "đoạn văn tả phong cảnh", "lập dàn ý cho bài văn",
  "mở bài gián tiếp", "kết bài mở rộng", "mỗi ý sau đúng hay sai", "đọc đoạn văn", "đọc câu", "chọn từ thích hợp nhất điền vào chỗ trống",
  "chọn tính từ thích hợp nhất điền vào chỗ trống", "thích hợp nhất điền vào chỗ trống", "thích hợp điền vào chỗ trống", "từ nào đồng nghĩa với từ",
  "dòng nào dưới đây gồm toàn", "câu nào dưới đây", "trong câu nào", "được dùng với nghĩa gốc", "được dùng với nghĩa chuyển", "có nghĩa là gì",
  "thuộc loại đại từ nào", "danh từ chỉ hiện tượng tự nhiên", "danh từ chỉ thời gian", "danh từ chỉ con vật", "đại từ nghi vấn", "đại từ xưng hô",
  "đại từ thay thế", "nghĩa gốc", "nghĩa chuyển", "danh từ", "động từ", "tính từ", "cộng hoà xã hội chủ nghĩa việt nam", "độc lập – tự do – hạnh phúc"]
  .map((x) => " " + khongDau(x) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((x) => { while (t.includes(x)) t = t.replace(x, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|")) ra.push(c.join(" ")); } return ra; };
{
  const cuOn = KHAC_CD.filter((q) => q.topic !== "Đọc hiểu" && q.topic !== "Viết");
  const ra = [];
  kho.filter((q) => cuOn.some((x) => x.topic === q.topic)).forEach((q) => cuOn.filter((x) => x.topic === q.topic).forEach((x) => {
    if (goc(q.q) === goc(x.q)) ra.push(`${ten.get(q)} = ${x.ten}: đề bài trùng`);
    const c6 = new Set(chuoi(x.q, 6)); chuoi(q.q, 6).filter((c) => c6.has(c)).slice(0, 1).forEach((c) => ra.push(`${ten.get(q)} ~ ${x.ten}: chuỗi 6 từ của đề bài “${c}”`));
    const da = (y) => (y.type === "mc" ? goc(y.o[0]) : y.type === "fill" ? goc(y.ans[0]) : null);
    if (da(q) && da(q) === da(x)) ra.push(`${ten.get(q)} = ${x.ten}: đáp án trùng`);
  }));
  assert.deepEqual(ra, [], "câu ôn trùng câu cùng chủ đề của kho Tiếng Việt 5 khác");
}

/* ---------- không gần trùng câu của kho Tiếng Việt 4 và các kho Tiếng Việt 5 khác (như tests/tv5-gk2.js) ----------
   Đề bài cùng lựa chọn, ô nối, ô sắp xếp có từ 4 cặp hai âm tiết liền nhau chung với một câu của các kho đó và số cặp chung từ một nửa số
   cặp của câu ít cặp hơn thì báo. Bỏ cách hỏi chung (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của các kho đem so. */
const CUM = ["mỗi ý sau đúng hay sai", "chọn từ thích hợp nhất điền vào chỗ trống", "chọn tính từ thích hợp nhất điền vào chỗ trống", "chọn từ thích hợp điền vào chỗ trống",
  "thích hợp điền vào chỗ trống", "dòng nào dưới đây gồm toàn", "đọc đoạn văn", "đọc câu", "trong câu", "từ nào là", "câu nào dưới đây",
  "danh từ chỉ hiện tượng tự nhiên", "danh từ chỉ thời gian", "danh từ chỉ con vật", "danh từ", "động từ", "tính từ", "đại từ xưng hô", "đại từ nghi vấn",
  "đại từ thay thế", "đại từ", "nghĩa gốc", "nghĩa chuyển", "từ đồng nghĩa", "từ đa nghĩa"];
{
  const cap2 = (s) => { let t = thuong(s); CUM.map(thuong).forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const cauCua = (ok) => BANKS.filter(ok).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => Object.assign({ id: b.id }, q)));
  const cu = cauCua((b) => b.file === "4-tv.js" || (b.file === "5-tv.js" && !cua(b.id))), ca = cu.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const P = cu.map((x) => [x, capAm(x)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return P.map(([x, d]) => { const chung = [...c].filter((y) => d.has(y)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${x.id}: ${x.q.slice(0, 60)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Tiếng Việt 4, Tiếng Việt 5 khác:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Tiếng Việt 4 hay kho Tiếng Việt 5 khác");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (cả đoạn đọc, thang chấm, lời dặn) không có trong sách; cụm từ chung (TU_CHUNG: tên chủ đề, tên
   bài Luyện từ và câu, tên kiểu bài Viết, thuật ngữ, cách hỏi chuẩn) thay bằng dấu ngăn trước khi so. */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
// tra nhanh chuỗi k từ: băm mọi chuỗi k từ của chữ đã chuẩn hoá (một lần cho mỗi chữ, mỗi k), chỉ so thật (includes) khi băm có
const traChu = (() => {
  const bam = (w, k) => {
    const A = new Uint32Array(w.length), B = new Uint32Array(w.length), n = Math.max(0, w.length - k + 1), H = new Float64Array(n);
    for (let i = 0; i < w.length; i++) { let a = 0x811c9dc5, b = 0x1b873593; const t = w[i]; for (let j = 0; j < t.length; j++) { const x = t.charCodeAt(j); a = Math.imul(a ^ x, 0x01000193); b = Math.imul(b ^ x, 0x5bd1e995); } A[i] = a; B[i] = b; }
    for (let i = 0; i < n; i++) { let a = 0x9e3779b9, b = 0x85ebca6b; for (let j = i; j < i + k; j++) { a = Math.imul(a ^ A[j], 0x01000193); b = Math.imul(b ^ B[j], 0x5bd1e995); } H[i] = (a >>> 0) * 2097152 + (b >>> 11); }
    return H;
  };
  const co = (H, h) => { let l = 0, r = H.length - 1; while (l <= r) { const m = (l + r) >> 1; if (H[m] === h) return true; if (H[m] < h) l = m + 1; else r = m - 1; } return false; };
  const chuMot = new Map(), chuDs = new WeakMap();
  const bangH = (m, k, tao) => { if (!m.has(k)) m.set(k, tao().sort()); return m.get(k); };
  return {
    co: (s, c) => { const w = c.split(" "); if (!chuMot.has(s)) chuMot.set(s, new Map()); return co(bangH(chuMot.get(s), w.length, () => bam(s.split(" "), w.length)), bam(w, w.length)[0]) && s.includes(" " + c + " "); },
    loc: (ds, c) => {
      const w = c.split(" "), k = w.length;
      if (!chuDs.has(ds)) chuDs.set(ds, new Map());
      const H = bangH(chuDs.get(ds), k, () => { const hs = ds.map((o) => bam(o.s.split(" "), k)), ra = new Float64Array(hs.reduce((a, h) => a + h.length, 0)); let i = 0; hs.forEach((h) => { ra.set(h, i); i += h.length; }); return ra; });
      return co(H, bam(w, k)[0]) ? ds.filter((o) => o.s.includes(" " + c + " ")) : [];
    },
  };
})();
const truong = (q) => chu(q).concat(q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].title, PSG[q.p].text] : []);
if (SACH.length) {
  assert.ok(SACH.some((f) => /tieng-viet-5-tap-1/.test(f)) && SACH.some((f) => /tieng-viet-5-tap-2/.test(f)), "OnUp-Book có Tiếng Việt 5 hai tập");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  LOI_DAN_DE.forEach((n) => assert.deepEqual(chuoi(n.q, 8).filter((c) => traChu.co(sach, c)), [], "lời dặn có chuỗi 8 từ trùng sách"));
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả các kho Tiếng Việt 5 và câu riêng của
   các đề ngẫu nhiên ---------- */
{
  const cauKhac = (b, q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const khac = BANKS.filter((b) => !b.pool && !cua(b.id)).flatMap((b) => b.questions.map((q) => cauKhac(b, q)))
    .concat(BANKS.filter((b) => b.pool && !cua(b.id)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cauKhac(b, q))));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(soCau + " câu Luyện từ và câu đã đọc lại đáp án; kho " + kho.length + " câu (" + d1.n + " + " + d2.n + " câu của hai đề cố định, " + rieng.length + " câu riêng), "
  + Object.keys(PSG).length + " đoạn đọc, " + viet.length + " câu Viết, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("TV5 GK1 OK");
