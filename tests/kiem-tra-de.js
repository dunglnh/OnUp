/* Bộ kiểm tra đề có sẵn (data/banks/), chạy bằng node, không cần trình duyệt: node tests/kiem-tra-de.js → in "DE OK".
   Chạy trước mỗi Pull Request có thêm hoặc sửa đề. Kiểm tra:
   - danh mục data/banks/index.js: mỗi đề đủ trường, mã đúng dạng, không trùng, không dùng lại mã đã bỏ
     (RETIRED_SEED_BANKS, phải giống nhau ở js/store.js và js/store-supabase.js); khối có trong data/grades.js;
     n đúng bằng số câu trong file; số câu, số phút hợp lí (GIOI_HAN);
   - file câu hỏi data/banks/<khối>-<mã môn>.js: tên đúng khối của đề, mỗi file một môn, mỗi môn một mã;
     file chứa đúng các đề danh mục ghi cho nó, chỉ ghi vào window.ONTAP_SEED_QUESTIONS; không có file thừa;
   - từng câu: dạng có trong TRUONG_CAU, không có trường lạ; có câu hỏi, chủ đề, lời giải (tự luận: đáp án gợi ý);
     trắc nghiệm có ít nhất 2 lựa chọn, không trùng nhau (phân biệt chữ hoa: có câu hỏi cách viết hoa); điền khuyết có đáp án
     và đúng một chỗ trống ___ (js/quiz.js chấm đáp án đầu là đúng), không phải câu về số âm (L33: đáp án là số âm, hoặc mọi đáp
     án là số mà đề có số âm; script tự thử với hai câu cố ý viết sai); đúng/sai có a là true hoặc false;
     đúng/sai 4 ý (tf4) có đúng 4 ý không trùng, a là 4 giá trị true/false; trả lời bằng số (num) có ans là số hoặc phân số
     viết "a/b" (chuỗi, mẫu số khác 0, L29), tol ≥ 0, app chấm đúng ans (số viết kiểu Việt Nam, như 2,5; phân số viết như trong
     dữ liệu) và hiện đúng chữ phân số; script tự thử với đáp án cố ý viết sai ("2/0", "hai phần ba") và Quiz.parse đọc "Đáp số: 3/4";
     tự thử chấm phân số, hỗn số gõ có khoảng trắng (L32: "1 1/2" đúng với "3/2", sai với "11/2"; câu điền "3 / 4" đúng với "3/4")
     và câu điền đáp án phân số gõ kèm đơn vị in sau chỗ trống (L34: "3/4 kg" đúng với "___ kg" đáp án "3/4", "6/8 kg" sai),
     câu điền đáp án phân số, hỗn số âm (L35: "-3/4", "- 3/4", "-3/4 kg" đúng với đáp án "−3/4"; "-6/8", "3/4" sai);
     Quiz.parse báo lỗi gắn với câu, đoạn đọc (issues, UX7: số câu đếm cả câu bị bỏ, câu bị bỏ hẳn có dropped và chữ đã dán);
     nối cột (match) có ít nhất 2 ô trái, cột phải đủ ô (thêm tối đa 3 ô thừa),
     không ô nào trùng; sắp xếp (order) có 3–8 ô không trùng; tự luận (essay) có thang chấm, điểm mỗi ý chia hết cho 0,25,
     tổng không quá 10; lv là 1, 2 hoặc 3; p là mã một đoạn đọc của đề; hình (svg) qua bộ lọc Quiz.svg không bị bỏ gì;
   - đoạn đọc (passages): mã gọn, có chữ hoặc hình, mỗi đoạn có ít nhất một câu dùng;
   - không có hai câu trùng nhau trong mọi đề: so câu hỏi sau khi bỏ dấu câu, khoảng trắng (dấu thanh, chữ hoa giữ nguyên),
     trắc nghiệm, đúng/sai 4 ý, nối cột, sắp xếp so cả các lựa chọn (câu “Chọn từ khác loại” khác nhau ở lựa chọn);
   - đề ngẫu nhiên (mục có pool, Phiên K3): tên kết thúc bằng "· Đề ngẫu nhiên"; from là các đề cố định có thật, cùng khối,
     môn, file, không trùng; có câu riêng trong file thì ít nhất một câu (không có thì không ghi vào file); đoạn đọc không
     trùng mã giữa các đề trong kho; matrix: mỗi chủ đề là số nguyên dương hoặc [Biết, Hiểu, Vận dụng], chữ chủ đề đúng
     topic của câu trong kho, tổng bằng n; kho đủ câu cho từng chủ đề (lỗi), thiếu ở một mức thì chỉ nhắc (app lấy bù mức
     gần nhất và ghi chú); câu riêng của pool nằm ở ô (chủ đề, mức) mà ma trận không rút câu nào thì nhắc (câu đó chỉ dùng
     để lấy bù; câu có đoạn đọc được rút cùng đoạn nên không nhắc); rút thử (Quiz.draw, kèm đoạn đọc của kho) ra đúng n câu
     không trùng, không ghi chú khi kho đủ;
   - chủ đề có đoạn đọc (Phiên K4, app rút theo đoạn): thử mọi thứ tự ưu tiên đoạn (ép qua hist; dãy dài ⌈k/3⌉, nhiều hơn 1 000 dãy thì
     lấy mẫu): lần nào cũng đúng n câu không trùng, chủ đề đúng số câu, câu cùng đoạn của một chủ đề đứng liền nhau, nhiều nhất một
     đoạn lấy một phần (lỗi); quá ⌈k/3⌉ đoạn (đoạn có dưới 3 câu của chủ đề) hoặc app ghi chú mức lệch quá 1 câu thì nhắc kèm dãy đoạn;
   - bộ rút đề (Quiz.draw) với kho giả: đúng ma trận, ưu tiên câu chưa làm và câu hay sai (cả câu tự luận), lấy bù và ghi chú khi thiếu;
     mã câu (Quiz.key) không đổi khi sửa lời giải, chủ đề; kho giả có đoạn đọc (K4): lấy cả đoạn, không quá ⌈k/3⌉ đoạn, đoạn chưa làm
     trước đoạn đã làm, đoạn hay sai trước, lấy một phần theo mức, ghi chú khi mức lệch quá 1 câu, câu Viết đi cùng đoạn đã rút;
   - đề tính điểm (mục có pts, Phiên K5; tên kì "Thi thử vào 10", "Thi thử tốt nghiệp"): pts là số dương, bội của 0,25, không đi với
     pool; số câu, số phút theo GIOI_HAN_DIEM (ít câu, câu tự luận dài); câu có thêm pt, part (chỉ ở đề tính điểm): mọi câu có pt
     (lớn hơn 0, bội của 0,25), đúng/sai 4 ý pt 1, tự luận pt bằng tổng thang chấm, tổng pt bằng pts; part có ở mọi câu hoặc không
     câu nào; câu cùng phần, câu cùng đoạn đọc đứng liền nhau (app không xáo thứ tự câu), câu cùng đoạn cùng phần (soatDiem); tự thử
     Quiz.grade với đề Toán tốt nghiệp ra 6,35/10 (cách chấm theo số câu cho 7,25), câu tự luận, Quiz.title của hai kì thi thử và
     soatDiem với đề cố ý viết sai;
   - lịch thi mặc định (data/calendar-2026-2027.js): đề và bài ôn gắn vào kì thi có thật, đúng khối của kì thi;
   - bộ lọc hình (Quiz.svg) bỏ được mã chạy và link ngoài trong vài hình mẫu cố ý viết sai (SVG_THU).
   - đề Tiếng Anh 100% tiếng Anh (Phiên TA1): đề có môn Tiếng Anh (mọi khối) và câu có topic bắt đầu bằng "English" trong đề
     khác (kèm đoạn đọc câu đó dùng): mọi trường chữ (note, tên và chữ đoạn đọc, topic, q, o, ans, l, r, x, rubric[].c, unit)
     không có chữ cái tiếng Việt (nguyên âm có dấu, ă, â, ê, ô, ơ, ư, đ); vài từ tiếng Anh có dấu được phép (TU_CO_DAU);
     lỗi ghi mã đề, số câu, trường và chữ tiếng Việt; script tự thử với một câu cố ý viết sai.
   - đề "Ôn chủ đề" (Phiên UX14): mọi chủ đề có ít nhất 10 câu (không tính tự luận) trong các đề có sẵn của một khối, một môn rút thử như
     app (Quiz.topicBank, Quiz.draw; lịch sử trống và 20 lịch sử ngẫu nhiên): đúng 10 câu, không trùng, đúng chủ đề, của các đề cùng khối,
     cùng file, không ghi chú (lỗi); lấy một phần ở hơn một đoạn đọc, quá ⌈10/3⌉ đoạn, mã đề quá 80 kí tự thì nhắc; hai chủ đề trùng 80 kí
     tự đầu của mã đề là lỗi; tự thử topicBank với kho giả và Quiz.title của đề Tiếng Anh.
   Thêm dạng câu mới thì thêm kiểm tra cho dạng đó ở đây. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const GIOI_HAN = { cau: [10, 60], phut: [10, 120], giayMoiCau: [30, 300] };
// đề tính điểm (Phiên K5): ít câu, câu tự luận dài (Toán vào 10: 7 câu tự luận, 120 phút; Ngữ văn 120 phút)
const GIOI_HAN_DIEM = { cau: [1, 60], phut: [10, 150], giayMoiCau: [30, 7200] };
const TRUONG_DE = ["id", "title", "grade", "subject", "minutes", "n", "file"]; // đề ngẫu nhiên có thêm pool ở cuối, đề tính điểm có thêm pts
const KI = ["Giữa kì I", "Cuối kì I", "Giữa kì II", "Cuối năm", "Thi thử vào 10", "Thi thử tốt nghiệp"]; // tên kì trong tên đề (thi thử: Phiên K5)
const MON_THU = "Thử nghiệm"; // đề thử nghiệm các dạng câu: tên không theo quy ước
const TRUONG_CAU = { mc: ["topic", "type", "q", "o", "x"], fill: ["topic", "type", "q", "ans", "x"], tf: ["topic", "type", "q", "a", "x"],
  tf4: ["topic", "type", "q", "o", "a", "x"], num: ["topic", "type", "q", "ans", "x"], match: ["topic", "type", "q", "l", "r", "x"],
  order: ["topic", "type", "q", "o", "x"], essay: ["topic", "type", "q", "rubric", "x"] };
const TRUONG_THEM = { num: ["tol", "unit"] }; // trường không bắt buộc của từng dạng; mọi dạng có thêm lv, p, svg
const TEN_DANG = { mc: "trắc nghiệm", fill: "điền khuyết", tf: "đúng/sai", tf4: "đúng/sai 4 ý", num: "trả lời bằng số", match: "nối cột", order: "sắp xếp", essay: "tự luận" };

const read = (f) => fs.readFileSync(path.join(ROOT, f), "utf8");
function load(files) {
  const ctx = vm.createContext({ window: {} });
  files.forEach((f) => vm.runInContext(read(f), ctx, { filename: f }));
  return ctx;
}
const bad = [];
const err = (at, msg) => bad.push(at + ": " + msg);
const text = (s) => typeof s === "string" && s.trim() !== "";
/* Tên đề có sẵn đúng quy ước "<môn> <khối> · <kì> · Đề N" (đề ngẫu nhiên: "… · Đề ngẫu nhiên"), vì chữ trên nút đề lấy từ tên
   (bankLabels trong js/app.js: thiếu số đề thì nút chỉ ghi "Đề"). Đề thử nghiệm (môn MON_THU) không theo. Trả về lời báo lỗi hoặc "". */
const soatTen = (b) => {
  if (b.subject === MON_THU) return "";
  const want = `"${b.subject} ${b.grade} · <kì> · Đề ${b.pool ? "ngẫu nhiên" : "N"}"`;
  const m = /^(.+) (\d+) · (.+) · Đề ([1-9]\d*|ngẫu nhiên)$/u.exec(String(b.title).normalize("NFC"));
  if (!m) return `tên "${b.title}" phải đúng dạng ${want} (kì: ${KI.join(", ")})`;
  if (m[1] !== String(b.subject).normalize("NFC") || +m[2] !== b.grade) return `tên "${b.title}" phải bắt đầu bằng môn và khối: ${want}`;
  if (!KI.includes(m[3])) return `tên "${b.title}" có kì "${m[3]}" lạ, chỉ dùng: ${KI.join(", ")}`;
  if (!!b.pool !== (m[4] === "ngẫu nhiên")) return `tên "${b.title}" phải kết thúc bằng "Đề ${b.pool ? "ngẫu nhiên" : "N"}" (${b.pool ? "đề ngẫu nhiên" : "đề cố định"})`;
  return "";
};
const norm = (s) => String(s).normalize("NFC").replace(/[\p{P}\s]+/gu, "");
const opt = (s) => String(s).normalize("NFC").replace(/\s+/g, " ").trim();

const W = load(["data/grades.js", "data/calendar-2026-2027.js", "data/modules.js"]).window;
const grades = (W.ONTAP_GRADES || []).map((g) => g.grade);
const Quiz = load(["js/quiz.js"]).window.Quiz;
/* Câu trả lời bằng số (num): ans là một số, hoặc phân số là chuỗi "a/b" (L29: "2/3", "-3/4", mẫu số khác 0); tol ≥ 0 và nhỏ hơn
   đáp án; app chấm đúng đáp án (số viết kiểu Việt Nam như 2,5 và như trong dữ liệu; phân số viết như trong dữ liệu) và chỗ hiện
   đáp án ghi đúng chữ phân số, không làm tròn (Quiz.text dùng cùng chữ với màn làm bài). Trả về lời báo lỗi hoặc "". */
const soatSo = (q) => {
  const frac = typeof q.ans === "string" && /^-?\d+\/\d+$/.test(q.ans) && +q.ans.split("/")[1] !== 0;
  if (!frac && !(typeof q.ans === "number" && Number.isFinite(q.ans))) return 'trả lời bằng số cần ans là một số (ví dụ 2.5, không để trong ngoặc kép) hoặc phân số viết "a/b" (ví dụ "2/3", "-3/4"), mẫu số khác 0';
  const v = frac ? q.ans.split("/")[0] / q.ans.split("/")[1] : q.ans;
  if ("tol" in q && !(typeof q.tol === "number" && q.tol >= 0 && q.tol < Math.max(1, Math.abs(v)))) return "sai số tol phải là số ≥ 0 và nhỏ hơn đáp án";
  if (frac) return Quiz.isRight(q, q.ans) && Quiz.text(Object.assign({}, q, { q: "" })).includes("Đáp án: " + q.ans) ? "" : `app không chấm đúng hoặc không hiện đúng đáp án "${q.ans}"`;
  return Quiz.isRight(q, Quiz.fmtN(q.ans)) && Quiz.isRight(q, String(q.ans)) ? "" : `app không chấm đúng đáp án ${q.ans} (viết ${Quiz.fmtN(q.ans)})`;
};
/* Câu điền về số âm (L33) lộ dấu của đáp án: có đáp án là số âm thì app hiện dòng nhắc số âm dưới câu; mọi đáp án là số (không âm)
   thì app mở bàn phím số, bàn phím này trên iPhone không có dấu trừ. Câu như vậy dùng câu trả lời bằng số (nút ± ở mọi câu) hoặc
   trắc nghiệm. Số âm trong đề: dấu trừ (− hoặc -) liền trước chữ số, đứng đầu câu, sau khoảng trắng hoặc dấu mở ngoặc ("(−25)",
   "−5"); dấu trừ của phép trừ có khoảng trắng hai bên ("862 450 − 315 270"), gạch nối khoảng ("Bài 1–22") không tính. SO, SO_AM
   chép từ isNum, isNeg của js/quiz.js (chỗ chọn bàn phím và dòng nhắc), script kiểm tra hai biểu thức còn giống nhau. Trả về lời
   báo lỗi hoặc "". */
const SO = /^[-−–]?\s*\d[\d\s.,]*$/, SO_AM = /^\(?\s*[-−–]\s*\d/, SO_AM_TRONG_DE = /(^|[\s([])[-−]\d/;
const soatSoAm = (q) => (q.ans.some((a) => SO_AM.test(String(a).trim())) || (q.ans.every((a) => SO.test(String(a).trim())) && SO_AM_TRONG_DE.test(q.q))
  ? "câu về số âm dùng câu trả lời bằng số hoặc trắc nghiệm (L33)" : "");
/* Đề tính điểm (Phiên K5, mục danh mục có pts): mọi câu có pt (điểm tối đa, lớn hơn 0, bội của 0,25), câu đúng/sai 4 ý pt 1 (chấm
   0,1/0,25/0,5/1 theo TF4_PTS), câu tự luận pt bằng tổng thang chấm, tổng pt bằng pts; part là tên phần (chữ), có ở mọi câu hoặc
   không câu nào; câu cùng phần đứng liền nhau, câu cùng đoạn đọc đứng liền nhau và cùng phần (app không xáo thứ tự câu của đề tính
   điểm). Trả về danh sách lời báo lỗi. */
const soatDiem = (b, qs) => {
  const out = [], r2 = (x) => Math.round(x * 100) / 100, at = (i) => `câu ${i + 1}: `;
  qs.forEach((q, i) => {
    if (!(typeof q.pt === "number" && q.pt > 0 && Number.isInteger(q.pt * 4))) out.push(at(i) + `pt (điểm tối đa của câu) = ${JSON.stringify(q.pt)}, cần số lớn hơn 0, bội của 0,25`);
    else if (q.type === "tf4" && q.pt !== 1) out.push(at(i) + `câu đúng/sai 4 ý có pt 1 (đang ${q.pt})`);
    else if (q.type === "essay" && Array.isArray(q.rubric) && r2(q.rubric.reduce((a, c) => a + ((c && +c.p) || 0), 0)) !== q.pt) out.push(at(i) + `câu tự luận có pt ${q.pt} nhưng thang chấm tổng ${r2(q.rubric.reduce((a, c) => a + ((c && +c.p) || 0), 0))} điểm`);
    if ("part" in q && !text(q.part)) out.push(at(i) + "part (tên phần) phải là chữ");
  });
  const sum = r2(qs.reduce((a, q) => a + (typeof q.pt === "number" ? q.pt : 0), 0));
  if (sum !== b.pts) out.push(`tổng pt của các câu là ${sum}, cần bằng pts = ${b.pts}`);
  const withPart = qs.filter((q) => "part" in q).length;
  if (withPart && withPart !== qs.length) out.push(`${withPart}/${qs.length} câu có part: ghi part cho mọi câu hoặc không câu nào`);
  [["part", "phần"], ["p", "đoạn đọc"]].forEach(([k, what]) => {
    const done = new Set();
    qs.forEach((q, i) => {
      if (!(k in q)) return;
      if (done.has(q[k]) && qs[i - 1][k] !== q[k]) out.push(at(i) + `câu cùng ${what} "${q[k]}" phải đứng liền nhau`);
      done.add(q[k]);
      if (k === "p" && i && qs[i - 1].p === q.p && qs[i - 1].part !== q.part) out.push(at(i) + `câu cùng đoạn đọc "${q.p}" phải cùng phần`);
    });
  });
  return out;
};

/* ---------- danh mục ---------- */
const catalog = load(["data/banks/index.js"]).window.ONTAP_SEED_BANKS || [];
const ids = catalog.map((b) => b.id);
const retiredOf = (f) => { const m = /const RETIRED_SEED_BANKS = (\[[^\]]*\])/.exec(read(f)); return m ? JSON.parse(m[1]) : null; };
const retired = retiredOf("js/store.js"), retiredCloud = retiredOf("js/store-supabase.js");
if (!retired || JSON.stringify(retired) !== JSON.stringify(retiredCloud)) err("RETIRED_SEED_BANKS", "js/store.js và js/store-supabase.js phải giống nhau");
if (!catalog.length) err("data/banks/index.js", "danh mục trống");
catalog.forEach((b, i) => {
  const at = "danh mục #" + (i + 1) + " " + (b.id || "");
  const keys = Object.keys(b), want = "pool" in b ? TRUONG_DE.concat("pool") : "pts" in b ? TRUONG_DE.concat("pts") : TRUONG_DE;
  if ("pts" in b && !(typeof b.pts === "number" && b.pts > 0 && b.pts <= 100 && Number.isInteger(b.pts * 4))) err(at, "pts (thang điểm của đề tính điểm) phải là số dương, bội của 0,25, ví dụ 10");
  if (keys.join() !== want.join()) err(at, "cần đúng các trường " + want.join(", ") + " (đang có " + keys.join(", ") + ")");
  if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(b.id || "")) err(at, "mã đề chỉ gồm chữ thường không dấu, số, dấu gạch ngang");
  if (ids.indexOf(b.id) !== i) err(at, "trùng mã đề");
  if ((retired || []).includes(b.id)) err(at, "mã đề đã bỏ (RETIRED_SEED_BANKS), dùng mã khác");
  if (!grades.includes(b.grade)) err(at, "khối " + b.grade + " không có trong data/grades.js");
  if (!text(b.title) || !text(b.subject)) err(at, "thiếu tên đề hoặc môn");
  else { const m = soatTen(b); if (m) err(at, m); }
  const gh = "pts" in b ? GIOI_HAN_DIEM : GIOI_HAN, [c0, c1] = gh.cau, [p0, p1] = gh.phut, [s0, s1] = gh.giayMoiCau;
  if (!(Number.isInteger(b.n) && b.n >= c0 && b.n <= c1)) err(at, `số câu n = ${b.n}, cần từ ${c0} đến ${c1}`);
  if (!(Number.isInteger(b.minutes) && b.minutes >= p0 && b.minutes <= p1)) err(at, `số phút = ${b.minutes}, cần từ ${p0} đến ${p1}`);
  else if (b.n > 0 && (b.minutes * 60 / b.n < s0 || b.minutes * 60 / b.n > s1)) err(at, `${b.minutes} phút cho ${b.n} câu: cần ${s0}–${s1} giây mỗi câu`);
});

/* ---------- file câu hỏi ---------- */
const files = [...new Set(catalog.map((b) => b.file))];
const codeOf = {}; // môn → mã môn
catalog.forEach((b) => {
  const m = /^(\d+)-([a-z]+)\.js$/.exec(b.file || "");
  if (!m) { err(b.id, `file "${b.file}" cần dạng <khối>-<mã môn>.js, ví dụ 4-toan.js`); return; }
  if (+m[1] !== b.grade) err(b.id, `đề lớp ${b.grade} nằm trong file ${b.file} của lớp ${m[1]}`);
  if (codeOf[b.subject] && codeOf[b.subject] !== m[2]) err(b.id, `môn "${b.subject}" có hai mã: ${codeOf[b.subject]}, ${m[2]}`);
  codeOf[b.subject] = codeOf[b.subject] || m[2];
});
Object.entries(codeOf).forEach(([s, c]) => Object.entries(codeOf).forEach(([s2, c2]) => { if (s < s2 && c === c2) err("mã môn " + c, `dùng cho hai môn: ${s}, ${s2}`); }));
const onDisk = fs.readdirSync(path.join(ROOT, "data/banks")).filter((f) => f !== "index.js");
onDisk.filter((f) => !files.includes(f)).forEach((f) => err("data/banks/" + f, "file không có đề nào trong danh mục (thừa hoặc ghi nhầm tên file)"));
const questions = {}; // mã đề → {note, questions}
files.filter((f) => onDisk.includes(f)).forEach((f) => {
  const at = "data/banks/" + f;
  let ctx;
  try { ctx = load([at]); } catch (e) { err(at, "không chạy được: " + e.message); return; }
  const globals = Object.keys(ctx).concat(Object.keys(ctx.window).map((k) => "window." + k));
  if (globals.join() !== "window,window.ONTAP_SEED_QUESTIONS") err(at, "chỉ được ghi vào window.ONTAP_SEED_QUESTIONS (đang có " + globals.join(", ") + ")");
  const got = ctx.window.ONTAP_SEED_QUESTIONS || {}, want = catalog.filter((b) => b.file === f).map((b) => b.id);
  Object.keys(got).filter((id) => !want.includes(id)).forEach((id) => err(at, `có đề "${id}" mà danh mục không ghi file này`));
  want.filter((id) => !got[id] && !catalog.find((b) => b.id === id).pool).forEach((id) => err(at, `thiếu đề "${id}" (danh mục ghi đề này ở file ${f})`)); // đề ngẫu nhiên không bắt buộc có câu riêng
  Object.entries(got).forEach(([id, v]) => {
    if (questions[id]) err(at, `đề "${id}" có ở hai file`);
    if (!v || !["note,questions", "note,passages,questions"].includes(Object.keys(v).join())) err(at + " " + id, "cần đúng các trường note, questions (có đoạn đọc: note, passages, questions)");
    questions[id] = v;
  });
});
files.filter((f) => !onDisk.includes(f)).forEach((f) => err("data/banks/" + f, "không có file này (danh mục ghi file: " + catalog.filter((b) => b.file === f).map((b) => b.id).join(", ") + ")"));

/* ---------- từng câu ---------- */
const seen = new Map(); // khóa so trùng → vị trí
const count = Object.fromEntries(Object.keys(TRUONG_CAU).map((t) => [t, 0]));
const svgOK = (at, src) => {
  if (typeof src !== "string") { err(at, "hình (svg) phải là chuỗi"); return; }
  const c = Quiz.svg(src);
  if (!c.svg || c.problems.length) err(at, "hình chưa đúng: " + c.problems.join("; "));
};
const distinct = (at, arr, what) => {
  if (!Array.isArray(arr) || !arr.every(text)) { err(at, what + " phải là danh sách chữ, không ô trống"); return false; }
  if (new Set(arr.map(opt)).size !== arr.length) { err(at, "hai " + what + " trùng nhau: " + JSON.stringify(arr)); return false; }
  return true;
};
catalog.forEach((b) => {
  const v = questions[b.id];
  if (!v) return;
  if (typeof v.note !== "string") err(b.id, "note phải là chuỗi (có thể để trống)");
  const qs = Array.isArray(v.questions) ? v.questions : [];
  if (!Array.isArray(v.questions)) err(b.id, "questions phải là mảng");
  if (b.pool) { if (!qs.length) err(b.id, "đề ngẫu nhiên có trong file thì phải có câu riêng; không có thì bỏ khỏi file"); }
  else if (qs.length !== b.n) err(b.id, `danh mục ghi n = ${b.n} nhưng file có ${qs.length} câu`);
  const psg = v.passages === undefined ? {} : v.passages;
  if (!psg || typeof psg !== "object" || Array.isArray(psg)) err(b.id, "passages phải là đối tượng { mã: { title, text, svg } }");
  else Object.entries(psg).forEach(([pid, p]) => {
    const at = b.id + " đoạn đọc " + pid;
    if (!/^[a-z0-9-]{1,40}$/.test(pid)) err(at, "mã đoạn chỉ gồm chữ thường không dấu, số, dấu gạch ngang");
    if (!p || typeof p !== "object") { err(at, "không phải đoạn đọc"); return; }
    const extra = Object.keys(p).filter((k) => !["title", "text", "svg"].includes(k));
    if (extra.length) err(at, "trường lạ: " + extra.join(", "));
    if ("title" in p && !text(p.title)) err(at, "title phải là chữ");
    if (!text(p.text) && !p.svg) err(at, "cần chữ (text) hoặc hình (svg)");
    if ("text" in p && typeof p.text !== "string") err(at, "text phải là chuỗi");
    if (p.svg !== undefined) svgOK(at, p.svg);
    if (!qs.some((q) => q && q.p === pid)) err(at, "không câu nào dùng đoạn này");
  });
  qs.forEach((q, i) => {
    const at = b.id + " câu " + (i + 1);
    if (!q || typeof q !== "object") { err(at, "không phải câu hỏi"); return; }
    const want = TRUONG_CAU[q.type];
    if (!want) { err(at, `dạng câu "${q.type}" không có (${Object.keys(TRUONG_CAU).join(", ")})`); return; }
    count[q.type]++;
    const may = want.concat(TRUONG_THEM[q.type] || [], ["lv", "p", "svg"], "pts" in b ? ["pt", "part"] : []); // pt, part: chỉ ở đề tính điểm
    const extra = Object.keys(q).filter((k) => !may.includes(k)), miss = want.filter((k) => !(k in q));
    if (extra.length) err(at, "trường lạ: " + extra.join(", "));
    if (miss.length) err(at, "thiếu: " + miss.join(", "));
    if (!text(q.q)) err(at, "thiếu câu hỏi");
    if (!text(q.topic)) err(at, "thiếu chủ đề");
    if (!text(q.x)) err(at, q.type === "essay" ? "thiếu đáp án gợi ý (x)" : "thiếu lời giải");
    if ("lv" in q && ![1, 2, 3].includes(q.lv)) err(at, "mức độ lv phải là 1 (Biết), 2 (Hiểu) hoặc 3 (Vận dụng)");
    if ("p" in q && !(psg && Object.prototype.hasOwnProperty.call(psg, q.p))) err(at, `đoạn đọc "${q.p}" không có trong passages của đề`);
    if ("svg" in q) svgOK(at, q.svg);
    let key = q.type + "|" + norm(q.q);
    if (q.type === "mc") {
      const o = Array.isArray(q.o) ? q.o : [];
      if (o.length < 2) err(at, "trắc nghiệm cần ít nhất 2 lựa chọn");
      if (!o.every(text)) err(at, "có lựa chọn trống");
      if (new Set(o.map(opt)).size !== o.length) err(at, "hai lựa chọn trùng nhau: " + JSON.stringify(o));
      key += "|" + o.map(norm).sort().join("|");
    } else if (q.type === "fill") {
      const blanks = String(q.q).match(/_{2,}/g) || [];
      if (blanks.length !== 1 || blanks[0] !== "___") err(at, "điền khuyết cần đúng một chỗ trống ___ (ba dấu gạch dưới)");
      if (!Array.isArray(q.ans) || !q.ans.length || !q.ans.every(text)) err(at, "điền khuyết cần đáp án");
      else if (!Quiz.isRight(q, q.ans[0])) err(at, `app không chấm đúng đáp án "${q.ans[0]}"`);
      else { const m = soatSoAm(q); if (m) err(at, m); }
    } else if (q.type === "tf") {
      if (typeof q.a !== "boolean") err(at, "đúng/sai cần a: true hoặc false");
    } else if (q.type === "tf4") {
      if (!Array.isArray(q.o) || q.o.length !== 4) err(at, "đúng/sai 4 ý cần đúng 4 ý trong o");
      else distinct(at, q.o, "ý");
      if (!Array.isArray(q.a) || q.a.length !== 4 || !q.a.every((x) => typeof x === "boolean")) err(at, "đúng/sai 4 ý cần a là 4 giá trị true/false");
      else if (Quiz.score(q, q.a) !== 1 || Quiz.score(q, q.a.map((x, k) => (k ? x : !x))) !== 0.5) err(at, "app chấm chưa đúng câu đúng/sai 4 ý");
      key += "|" + (Array.isArray(q.o) ? q.o.map(norm).sort().join("|") : "");
    } else if (q.type === "num") {
      const m = soatSo(q);
      if (m) err(at, m);
      if ("unit" in q && !text(q.unit)) err(at, "đơn vị unit phải là chữ");
    } else if (q.type === "match") {
      const l = Array.isArray(q.l) ? q.l : [], r = Array.isArray(q.r) ? q.r : [];
      if (l.length < 2 || l.length > 8) err(at, "nối cột cần từ 2 đến 8 ô bên trái (l)");
      if (r.length < l.length || r.length > l.length + 3) err(at, `cột phải (r) cần ${l.length} ô nối với cột trái, thêm tối đa 3 ô thừa`);
      if (distinct(at, l, "ô bên trái") && distinct(at, r, "ô bên phải") && Quiz.score(q, l.map((_, k) => k)) !== 1) err(at, "app chấm chưa đúng câu nối cột");
      key += "|" + l.map(norm).sort().join("|") + "|" + r.map(norm).sort().join("|");
    } else if (q.type === "order") {
      const o = Array.isArray(q.o) ? q.o : [];
      if (o.length < 3 || o.length > 8) err(at, "sắp xếp cần từ 3 đến 8 ô (o, viết theo thứ tự đúng)");
      else if (distinct(at, o, "ô") && Quiz.score(q, o.map((_, k) => k)) !== 1) err(at, "app chấm chưa đúng câu sắp xếp");
      key += "|" + o.map(norm).sort().join("|");
    } else if (q.type === "essay") {
      const rb = Array.isArray(q.rubric) ? q.rubric : [];
      if (!rb.length) err(at, "tự luận cần thang chấm rubric: [{ c: \"ý cần có\", p: 0.5 }, …]");
      rb.forEach((c, k) => {
        if (!c || Object.keys(c).join() !== "c,p" || !text(c.c)) err(at, `ý chấm ${k + 1} cần đúng hai trường c (ý cần có), p (điểm)`);
        else if (!(typeof c.p === "number" && c.p > 0 && Number.isInteger(c.p * 4))) err(at, `ý chấm ${k + 1}: điểm ${c.p} phải lớn hơn 0 và chia hết cho 0,25`);
      });
      const sum = rb.reduce((a, c) => a + ((c && +c.p) || 0), 0);
      if (sum > 10) err(at, `thang chấm tổng ${sum} điểm, tối đa 10`);
    }
    if (seen.has(key)) err(at, "trùng với " + seen.get(key));
    else seen.set(key, at);
  });
  if ("pts" in b) soatDiem(b, qs.filter((q) => q && typeof q === "object")).forEach((m) => err(b.id, m));
});

/* ---------- đề ngẫu nhiên (pool) ---------- */
const topicOf = (t) => String(t == null ? "" : t).normalize("NFC").replace(/\s+/g, " ").trim();
const warn = []; // chỗ chỉ nhắc, không tính là lỗi
const pools = catalog.filter((b) => b.pool);
pools.forEach((b) => {
  const at = "đề ngẫu nhiên " + b.id, p = b.pool;
  if (!p || typeof p !== "object" || Array.isArray(p)) { err(at, "pool phải là { from, matrix }"); return; }
  const extra = Object.keys(p).filter((k) => !["from", "matrix"].includes(k));
  if (extra.length) err(at, "pool có trường lạ: " + extra.join(", "));
  const from = p.from === undefined ? [] : p.from;
  if (!Array.isArray(from) || !from.every((x) => typeof x === "string")) { err(at, "from phải là danh sách mã đề cố định"); return; }
  const parts = []; // [mã, {note, passages, questions}] của câu riêng và các đề trong from
  const own = questions[b.id];
  if (own) parts.push([b.id, own]);
  from.forEach((id, i) => {
    const s = catalog.find((x) => x.id === id);
    if (!s) { err(at, `from có đề không có: ${id}`); return; }
    if (s.pool) err(at, `from không được chứa đề ngẫu nhiên khác (${id})`);
    if (from.indexOf(id) !== i) err(at, `from ghi hai lần ${id}`);
    if (s.grade !== b.grade || s.subject !== b.subject || s.file !== b.file) err(at, `${id} phải cùng khối, môn, file với đề ngẫu nhiên`);
    if (questions[id]) parts.push([id, questions[id]]);
  });
  if (!own && !from.length) err(at, "cần câu riêng trong file hoặc from");
  const pids = {};
  parts.forEach(([id, v]) => Object.keys(v.passages || {}).forEach((pid) => { if (pids[pid]) err(at, `đoạn đọc "${pid}" có ở cả ${pids[pid]} và ${id}`); pids[pid] = id; }));
  const kho = parts.flatMap(([, v]) => (Array.isArray(v.questions) ? v.questions : []));
  const psgAll = Object.assign({}, ...parts.map(([, v]) => (v.passages && typeof v.passages === "object" ? v.passages : {})));
  const hasPsg = (q) => !!q && q.p != null && Object.prototype.hasOwnProperty.call(psgAll, q.p);
  const m = p.matrix;
  if (!m || typeof m !== "object" || Array.isArray(m) || !Object.keys(m).length) { err(at, "matrix phải là { \"chủ đề\": số câu } hoặc { \"chủ đề\": [Biết, Hiểu, Vận dụng] }"); return; }
  const have = {}; // chủ đề → [chưa ghi mức, Biết, Hiểu, Vận dụng]
  kho.forEach((q) => { const t = topicOf(q && q.topic); (have[t] = have[t] || [0, 0, 0, 0])[q && [1, 2, 3].includes(q.lv) ? q.lv : 0]++; });
  const inMatrix = new Set();
  let sum = 0, short = false;
  Object.entries(m).forEach(([t, v]) => {
    const topic = topicOf(t), tAt = `${at}, chủ đề "${t}"`;
    if (!topic) err(tAt, "tên chủ đề trống");
    if (inMatrix.has(topic)) err(tAt, "ghi hai lần");
    inMatrix.add(topic);
    const okN = (x) => Number.isInteger(x) && x >= 0;
    if (Array.isArray(v) ? v.length !== 3 || !v.every(okN) || !v.some((x) => x > 0) : !(okN(v) && v > 0)) { err(tAt, "số câu phải là số nguyên dương, hoặc [Biết, Hiểu, Vận dụng] gồm 3 số nguyên ≥ 0"); return; }
    const need = Array.isArray(v) ? v.reduce((a, x) => a + x, 0) : v;
    sum += need;
    const h = have[topic];
    if (!h) { err(tAt, "kho không có câu nào của chủ đề này (chữ phải đúng như topic của câu)"); return; }
    const total = h.reduce((a, x) => a + x, 0);
    if (total < need) err(tAt, `ma trận cần ${need} câu mà kho chỉ có ${total}`);
    if (Array.isArray(v)) v.forEach((n, i) => { if (n > h[i + 1]) { short = true; warn.push(`${tAt}: mức ${Quiz.LV[i + 1]} cần ${n} câu, kho có ${h[i + 1]} (app lấy bù mức gần nhất và ghi chú)`); } });
  });
  if (sum !== b.n) err(at, `tổng ma trận ${sum} khác n = ${b.n}`);
  Object.keys(have).filter((t) => !inMatrix.has(t)).forEach((t) => warn.push(`${at}: chủ đề "${t}" (${have[t].reduce((a, x) => a + x, 0)} câu) không có trong ma trận, chỉ dùng để lấy bù`));
  // câu riêng của pool mà ô (chủ đề, mức) của ma trận là 0 thì chỉ dùng để lấy bù: viết câu mới đúng mức ma trận cần (Phiên N1);
  // câu có đoạn đọc được rút cùng đoạn (K4), mức lệch quá 1 câu thì nhắc ở phần thử theo đoạn bên dưới
  if (own) (Array.isArray(own.questions) ? own.questions : []).forEach((q, i) => {
    const v = q && m[Object.keys(m).find((t) => topicOf(t) === topicOf(q.topic))];
    if (Array.isArray(v) && !(v[q.lv - 1] > 0) && !hasPsg(q)) warn.push(`${at}, câu riêng ${i + 1}: ma trận không rút câu nào ở ô (chủ đề "${topicOf(q.topic)}", ${Quiz.LV[q.lv] ? "mức " + Quiz.LV[q.lv] : "chưa ghi mức"}), câu này chỉ dùng để lấy bù`);
  });
  const d = Quiz.draw({ pool: p, questions: kho, passages: psgAll }), keys = d.questions.map(Quiz.key);
  if (d.questions.length !== sum) err(at, `rút thử được ${d.questions.length} câu, cần ${sum}`);
  if (new Set(keys).size !== keys.length) err(at, "rút thử có câu trùng");
  /* Chủ đề có đoạn đọc (K4): app rút theo đoạn, thứ tự đoạn theo lịch sử của học sinh. Thử mọi dãy ⌈k/3⌉ đoạn làm thứ tự ưu tiên (ép qua
     hist: đoạn trong dãy done = vị trí trong dãy, đoạn khác của chủ đề 50, câu lẻ 60; chủ đề khác 0), nhiều hơn 1 000 dãy thì lấy mẫu:
     bộ rút của app luôn trùng với một dãy nào đó, nên kho qua đây thì app không bao giờ ghi chú cho chủ đề này. */
  let psgWarn = false;
  const pTopics = [...new Set(kho.filter(hasPsg).map((q) => topicOf(q.topic)))].filter((t) => inMatrix.has(t));
  pTopics.forEach((t) => {
    const v = m[Object.keys(m).find((x) => topicOf(x) === t)], k = Array.isArray(v) ? v.reduce((a, x) => a + x, 0) : v;
    if (!(k > 0)) return;
    const cap = Math.ceil(k / 3), pids = [...new Set(kho.filter((q) => hasPsg(q) && topicOf(q.topic) === t).map((q) => String(q.p)))], len = Math.min(cap, pids.length);
    const seqs = [], rec = (pre) => { if (pre.length === len) { seqs.push(pre); return; } pids.forEach((x) => { if (!pre.includes(x)) rec(pre.concat(x)); }); };
    if (pids.slice(0, len).reduce((a, _, i) => a * (pids.length - i), 1) > 1000) for (let i = 0; i < 1000; i++) seqs.push(pids.slice().sort(() => Math.random() - 0.5).slice(0, len)); else rec([]);
    const hits = new Map(); // lời nhắc → [số dãy gặp, dãy đầu tiên]: mỗi lời nhắc chỉ ghi một dòng
    const remind = (seq, msg) => { psgWarn = true; const h = hits.get(msg) || [0, seq]; h[0]++; hits.set(msg, h); };
    seqs.forEach((seq) => {
      const hist = (q) => ({ done: topicOf(q.topic) !== t ? 0 : !hasPsg(q) ? 60 : seq.includes(String(q.p)) ? seq.indexOf(String(q.p)) : 50, wrong: 0 });
      const d2 = Quiz.draw({ pool: p, questions: kho, passages: psgAll }, hist), k2 = d2.questions.map(Quiz.key), tag = `${at}, chủ đề "${t}", rút các đoạn ${seq.join(" → ")} trước`;
      if (d2.questions.length !== sum) err(tag, `rút được ${d2.questions.length} câu, cần ${sum}`);
      if (new Set(k2).size !== k2.length) err(tag, "có câu trùng");
      const inT = d2.questions.filter((q) => topicOf(q.topic) === t), got = [...new Set(inT.filter(hasPsg).map((q) => String(q.p)))];
      if (inT.length !== k) err(tag, `chủ đề được ${inT.length} câu, ma trận ${k}`);
      got.forEach((pid) => { const pos = inT.map((q, i) => (hasPsg(q) && String(q.p) === pid ? i : -1)).filter((i) => i >= 0); if (pos[pos.length - 1] - pos[0] !== pos.length - 1) err(tag, `câu của đoạn ${pid} không đứng liền nhau`); });
      const partial = got.filter((pid) => inT.filter((q) => hasPsg(q) && String(q.p) === pid).length < kho.filter((q) => hasPsg(q) && String(q.p) === pid && topicOf(q.topic) === t).length);
      if (partial.length > 1) err(tag, `lấy một phần ở ${partial.length} đoạn (${partial.join(", ")}), chỉ được một`);
      if (got.length > cap) remind(seq, `lấy ${got.length} đoạn, quá ⌈${k}/3⌉ = ${cap} (mỗi đoạn nên có ít nhất 3 câu của chủ đề)`);
      const ns = d2.notes.filter((x) => x.startsWith(t + ":"));
      if (ns.length) remind(seq, `app ghi chú cho học sinh: ${ns.join("; ")}`);
    });
    hits.forEach(([n, seq], msg) => warn.push(`${at}, chủ đề "${t}": ${n}/${seqs.length} thứ tự đoạn (ví dụ rút ${seq.join(" → ")} trước) ${msg}`));
  });
  if (!short && !psgWarn && d.notes.length) err(at, "kho đủ câu mà rút thử vẫn ghi chú: " + d.notes.join("; "));
});

/* ---------- bộ rút đề (Quiz.draw) với kho giả ---------- */
{
  const at = "bộ rút đề";
  const tf = (topic, q, lv) => Object.assign({ topic, type: "tf", q, a: true }, lv ? { lv } : {});
  const kho = [tf("A", "a1", 1), tf("A", "a2", 1), tf("A", "a3", 2), tf("A", "a4"), tf("B", "b1", 3), tf("B", "b2", 3), tf("C", "c1", 1)];
  const draw = (matrix, qs, hist) => Quiz.draw({ pool: { matrix }, questions: qs || kho }, hist);
  const hist = (o) => (q) => o[q.q] || { done: 0, wrong: 0 };
  const d1 = draw({ A: [1, 1, 0], B: 2 });
  if (d1.questions.map((q) => q.topic).sort().join() !== "A,A,B,B" || d1.notes.length || !d1.questions.some((q) => q.topic === "A" && q.lv === 1) || !d1.questions.some((q) => q.q === "a3")) err(at, "rút theo ma trận chưa đúng: " + JSON.stringify(d1));
  const d2 = draw({ A: 1 }, null, hist({ a1: { done: 2, wrong: 0 }, a2: { done: 1, wrong: 0 }, a3: { done: 3, wrong: 0 } }));
  if (d2.questions.map((q) => q.q).join() !== "a4") err(at, "chưa ưu tiên câu chưa làm: " + d2.questions.map((q) => q.q));
  const d3 = draw({ A: 1 }, null, hist({ a1: { done: 1, wrong: 0 }, a2: { done: 1, wrong: 1 }, a3: { done: 1, wrong: 0 }, a4: { done: 1, wrong: 0 } }));
  if (d3.questions.map((q) => q.q).join() !== "a2") err(at, "chưa ưu tiên câu hay sai: " + d3.questions.map((q) => q.q));
  const d4 = draw({ A: [0, 0, 1], C: 2 }, kho.filter((q) => q.q !== "a4")), q4 = d4.questions.map((q) => q.q);
  if (q4.length !== 3 || q4[0] !== "a3" || q4[1] !== "c1" || d4.notes.length !== 2 || !/^A: thiếu 1 câu mức Vận dụng, lấy bù mức Hiểu$/.test(d4.notes[0]) || !/^C: thiếu 1 câu, lấy từ chủ đề khác$/.test(d4.notes[1])) err(at, "lấy bù chưa đúng: " + JSON.stringify([q4, d4.notes]));
  const d5 = draw({ A: [0, 1, 0] }, kho.filter((q) => q.q === "a1" || q.q === "a4"));
  if (d5.questions.length !== 1 || d5.questions[0].q !== "a4" || !/lấy bù câu chưa ghi mức$/.test(d5.notes.join())) err(at, "câu chưa ghi mức phải được lấy bù trước mức xa hơn: " + JSON.stringify([d5.questions.map((q) => q.q), d5.notes]));
  const d6 = draw({ B: 3 }, kho.filter((q) => q.topic === "B"));
  if (d6.questions.length !== 2 || !/^B: kho chưa đủ câu, thiếu 1 câu$/.test(d6.notes.join())) err(at, "kho thiếu chưa báo: " + JSON.stringify(d6.notes));
  // câu tự luận có lịch sử như câu khác (js/app.js ghi cả câu tự luận đã làm): đã làm thì nhường câu chưa làm cùng ô, sai thì được rút lại
  const es = (q) => ({ topic: "E", type: "essay", q, rubric: [{ c: "Đủ ý", p: 1 }], x: "Gợi ý", lv: 3 }), khoE = [es("e1"), es("e2"), tf("E", "e3", 3)];
  const d7 = draw({ E: [0, 0, 1] }, khoE, hist({ e1: { done: 1, wrong: 0 }, e2: { done: 2, wrong: 0 } })), d8 = draw({ E: [0, 0, 1] }, khoE, hist({ e1: { done: 1, wrong: 0 }, e2: { done: 1, wrong: 1 }, e3: { done: 1, wrong: 0 } }));
  if (d7.questions.map((q) => q.q).join() !== "e3" || d8.questions.map((q) => q.q).join() !== "e2") err(at, "câu tự luận chưa theo lịch sử câu: " + [d7, d8].map((d) => d.questions.map((q) => q.q)).join(" | "));
  const k = Quiz.key(kho[0]);
  if (!/^[a-z0-9]{4,12}$/.test(k) || k !== Quiz.key(Object.assign({}, kho[0], { x: "khác", topic: "Z", lv: 3 })) || k === Quiz.key(Object.assign({}, kho[0], { q: "a1 khác" }))) err(at, "mã câu (Quiz.key) chưa ổn định: " + k);
}

/* ---------- bộ rút đề theo đoạn đọc (K4) với kho giả ---------- */
{
  const at = "bộ rút đề theo đoạn đọc (K4)";
  const tf = (topic, q, lv, p) => Object.assign({ topic, type: "tf", q, a: true, x: "." }, lv ? { lv } : {}, p ? { p } : {});
  // chủ đề R: đoạn A, C, D 3 câu mức 1-2-3, đoạn B 4 câu mức 1-1-2-3, 6 câu lẻ (mức 1, 1, 1, 2, 2, 3); chủ đề V (Viết): tự luận ở đoạn A, B và 3 câu lẻ
  const psg = { A: { text: "a" }, B: { text: "b" }, C: { text: "c" }, D: { text: "d" } };
  const P = (id, lvs) => lvs.map((lv, i) => tf("R", `${id}${i + 1}`, lv, id));
  const singles = [1, 1, 1, 2, 2, 3].map((lv, i) => tf("R", `s${i + 1}`, lv));
  const es = (q, p) => Object.assign({ topic: "V", type: "essay", q, rubric: [{ c: "Đủ ý", p: 1 }], x: "Gợi ý", lv: 3 }, p ? { p } : {});
  const kho = [...P("A", [1, 2, 3]), ...P("B", [1, 1, 2, 3]), ...P("C", [1, 2, 3]), ...P("D", [1, 2, 3]), ...singles, es("vA", "A"), es("vB", "B"), es("v1"), es("v2"), es("v3")];
  const draw = (matrix, hist, qs) => Quiz.draw({ pool: { matrix }, questions: qs || kho, passages: psg }, hist);
  const hist = (o) => (q) => o[q.q] || { done: 0, wrong: 0 };
  const doneAll = (ids, extra) => Object.assign(Object.fromEntries(kho.filter((q) => ids.includes(q.p)).map((q) => [q.q, { done: 1, wrong: 0 }])), extra || {});
  const byP = (d, t) => { const r = {}; d.questions.filter((q) => q.topic === t && q.p).forEach((q) => (r[q.p] = (r[q.p] || 0) + 1)); return r; };
  const lvs = (d, t) => [1, 2, 3].map((lv) => d.questions.filter((q) => q.topic === t && q.lv === lv).length).join("");
  // 1. chưa có lịch sử: 7 câu R lấy cả đoạn B (4) và một đoạn 3 câu, đúng mức 3-2-2, không câu lẻ, không ghi chú; câu cùng đoạn liền nhau theo thứ tự trong kho
  for (let i = 0; i < 20; i++) {
    const d = draw({ R: [3, 2, 2] }), bp = byP(d, "R"), ids = Object.keys(bp).sort(), seq = d.questions.map((q) => q.p || "");
    const contiguous = ids.every((p) => { const a = seq.map((x, k) => (x === p ? k : -1)).filter((k) => k >= 0); return a[a.length - 1] - a[0] === a.length - 1; });
    const ordered = ids.every((p) => { const a = d.questions.filter((q) => q.p === p).map((q) => kho.indexOf(q)); return a.every((v, k) => !k || v > a[k - 1]); });
    if (d.questions.length !== 7 || ids.length !== 2 || bp.B !== 4 || bp[ids.find((p) => p !== "B")] !== 3 || lvs(d, "R") !== "322" || d.notes.length || !contiguous || !ordered || d.questions.some((q) => !q.p)) { err(at, "rút theo đoạn chưa đúng: " + JSON.stringify([bp, lvs(d, "R"), d.notes, contiguous, ordered])); break; }
  }
  // 2. "Làm đề khác": B, C đã làm đúng → A, D (3 + 3) rồi 1 câu lẻ mức 1 (câu lẻ chưa làm ưu tiên hơn đoạn đã làm), không ghi chú
  {
    const d = draw({ R: [3, 2, 2] }, hist(doneAll(["B", "C"]))), bp = byP(d, "R"), single = d.questions.filter((q) => q.topic === "R" && !q.p);
    if (Object.keys(bp).sort().join() !== "A,D" || bp.A !== 3 || bp.D !== 3 || single.length !== 1 || single[0].lv !== 1 || d.notes.length) err(at, "đoạn chưa làm phải được rút trước, câu lẻ chưa làm trước đoạn đã làm: " + JSON.stringify([bp, single.map((q) => q.q), d.notes]));
  }
  // 3. đoạn hay sai (2/3 câu sai, điểm trung bình −1/3) được rút cả đoạn trước đoạn chưa làm; sai 1/3 câu (1/3) thì nhường đoạn chưa làm
  {
    const d = draw({ R: [3, 2, 2] }, hist(doneAll(["A"], { A1: { done: 1, wrong: 1 }, A2: { done: 1, wrong: 1 } }))), bp = byP(d, "R");
    if (bp.A !== 3 || Object.keys(bp).length !== 2) err(at, "đoạn hay sai phải được rút cả đoạn: " + JSON.stringify(bp));
    const d2 = draw({ R: [3, 2, 2] }, hist(doneAll(["A"], { A1: { done: 1, wrong: 1 } })));
    if ("A" in byP(d2, "R")) err(at, "đoạn mới sai 1/3 câu phải nhường đoạn chưa làm: " + JSON.stringify(byP(d2, "R")));
  }
  // 4. đoạn nhiều câu hơn số cần: lấy phần vừa đủ theo mức ma trận; cả đoạn lệch 1 câu mỗi mức thì không ghi chú
  {
    const d = draw({ R: [1, 1, 1] }, null, P("B", [1, 1, 2, 3]));
    if (d.questions.length !== 3 || lvs(d, "R") !== "111" || d.notes.length) err(at, "lấy một phần đoạn phải theo mức ma trận: " + JSON.stringify([d.questions.map((q) => q.q), d.notes]));
    const d2 = draw({ R: [2, 1, 0] }, null, P("A", [1, 2, 3]));
    if (d2.questions.length !== 3 || d2.notes.length) err(at, "lệch 1 câu mỗi mức thì không ghi chú: " + JSON.stringify(d2.notes));
  }
  // 5. lệch quá 1 câu thì ghi chú
  {
    const d = draw({ R: [3, 0, 0] }, null, P("A", [1, 2, 3]));
    if (d.questions.length !== 3 || d.notes.join() !== "R: lấy cả đoạn đọc nên mức Biết có 1 câu thay vì 3, mức Hiểu có 1 câu thay vì 0, mức Vận dụng có 1 câu thay vì 0") err(at, "ghi chú mức lệch chưa đúng: " + JSON.stringify(d.notes));
  }
  // 6. không quá ⌈k/3⌉ đoạn: đoạn chỉ 2 câu → 7 câu lấy từ 3 đoạn (6 câu) và 1 câu lẻ, không ghi chú
  {
    const d = draw({ R: [3, 2, 2] }, null, [...P("A", [1, 2]), ...P("B", [1, 3]), ...P("C", [2, 3]), ...P("D", [1, 2]), ...singles]), bp = byP(d, "R");
    if (d.questions.length !== 7 || Object.keys(bp).length !== 3 || Object.values(bp).some((n) => n !== 2) || d.questions.filter((q) => !q.p).length !== 1 || d.notes.length) err(at, "quá ⌈k/3⌉ đoạn: " + JSON.stringify([bp, d.notes]));
  }
  // 7. câu Viết về bài thơ đi cùng bài thơ: R rút đoạn A (các đoạn khác đã làm) thì V lấy câu tự luận của A, đứng sau; câu tự luận của A đã làm thì nhường câu chưa làm
  {
    const d = draw({ R: [1, 1, 1], V: [0, 0, 1] }, hist(doneAll(["B", "C", "D"]))), v = d.questions.find((q) => q.topic === "V");
    if (Object.keys(byP(d, "R")).join() !== "A" || !v || v.q !== "vA" || d.questions.indexOf(v) < d.questions.findIndex((q) => q.p === "A")) err(at, "câu Viết phải đi cùng đoạn đã rút, đứng sau: " + JSON.stringify([byP(d, "R"), v && v.q]));
    const d2 = draw({ R: [1, 1, 1], V: [0, 0, 1] }, hist(doneAll(["B", "C", "D"], { vA: { done: 1, wrong: 0 } }))), v2 = d2.questions.find((q) => q.topic === "V");
    if (Object.keys(byP(d2, "R")).join() !== "A" || !v2 || v2.q === "vA") err(at, "câu Viết đã làm phải nhường câu chưa làm: " + JSON.stringify([byP(d2, "R"), v2 && v2.q]));
  }
  // 8. ma trận không ghi mức: cả đoạn rồi phần vừa đủ của đoạn thứ hai
  {
    const d = draw({ R: 4 }, null, [...P("A", [1, 2, 3]), ...P("C", [1, 2, 3])]), bp = byP(d, "R");
    if (d.questions.length !== 4 || Object.values(bp).sort().join() !== "1,3" || d.notes.length) err(at, "ma trận không ghi mức: " + JSON.stringify([bp, d.notes]));
  }
  // 9. mọi câu đã làm như nhau: vẫn rút theo đoạn (bằng điểm thì đoạn trước câu lẻ)
  {
    const d = draw({ R: [3, 2, 2] }, hist(Object.fromEntries(kho.map((q) => [q.q, { done: 1, wrong: 0 }])))), bp = byP(d, "R");
    if (Object.keys(bp).length !== 2 || d.questions.some((q) => !q.p) || d.notes.length) err(at, "mọi câu đã làm thì vẫn rút theo đoạn: " + JSON.stringify(bp));
  }
  if (!Object.keys(Quiz.TXT.vi).every((k) => k in Quiz.TXT.en) || typeof Quiz.TXT.en.drawPsg !== "function") err(at, "bảng chữ tiếng Anh thiếu khóa");
}

/* ---------- đề "Ôn chủ đề" (Phiên UX14, X48) ----------
   Như app (renderTopic trong js/app.js): kho của một chủ đề là Quiz.topicBank của mọi đề có sẵn cùng khối, cùng file (nạp như
   Store.loadBank, tests/nap-de.js; đề ngẫu nhiên chỉ góp câu riêng), rút Quiz.TOPIC_N câu bằng Quiz.draw. Thử mọi chủ đề có ít nhất
   10 câu (không tính tự luận) với lịch sử trống và 20 lịch sử ngẫu nhiên (ép qua hist): đúng 10 câu, không trùng, đều đúng chủ đề, của
   các đề cùng khối, cùng file, không ghi chú (lỗi); lấy một phần ở hơn một đoạn đọc, hoặc quá ⌈10/3⌉ đoạn, thì nhắc. Mã đề (refId
   "chu-de:<khối>:<mã môn>:<chủ đề>") quá 80 kí tự thì app cắt còn 80 (cột ref_id của bản đám mây): nhắc; hai chủ đề trùng 80 kí tự đầu
   thì lẫn kết quả của nhau: lỗi. Tự thử topicBank với kho giả (bỏ câu tự luận, câu trùng, câu đề cố định chép trong đề ngẫu nhiên; mã
   đoạn đọc kèm mã đề gốc) và Quiz.title của đề Tiếng Anh. */
const soOnCD = { chuDe: 0, rut: 0 };
{
  let loaded = [];
  try { loaded = require("./nap-de.js").napDe(); } catch (e) { err("đề Ôn chủ đề", "không nạp được đề: " + e.message); }
  const refs = new Map(), cap = Math.ceil(Quiz.TOPIC_N / 3);
  [...new Set(loaded.map((b) => b.grade + "|" + b.file))].forEach((gf) => {
    const [g, file] = gf.split("|"), srcs = loaded.filter((b) => String(b.grade) === g && b.file === file), code = file.replace(/^\d+-|\.js$/g, "");
    const ids0 = new Set(srcs.map((b) => b.id)), head = `chu-de:${g}:${code}:`;
    [...new Set(srcs.flatMap((b) => (b.questions || []).map((q) => topicOf(q && q.topic))))].filter(Boolean).forEach((t) => {
      const at = `đề "Ôn chủ đề" lớp ${g}, ${file}, chủ đề "${t}"`, ref = head + t, cut = ref.slice(0, 80);
      if (ref.length > 80) warn.push(`${at}: mã đề dài ${ref.length} kí tự, app cắt còn 80`);
      if (refs.has(cut) && refs.get(cut) !== ref) err(at, `trùng 80 kí tự đầu của mã đề với chủ đề "${refs.get(cut).slice(head.length)}"`);
      refs.set(cut, ref);
      const b = Quiz.topicBank(srcs, t, { id: cut, title: `${srcs[0].subject} ${g} · Ôn chủ đề · ${t}`, grade: +g, subject: srcs[0].subject });
      if (b.questions.length < Quiz.TOPIC_N) return;
      soOnCD.chuDe++;
      const inP = {}, hits = new Set();
      b.questions.forEach((q) => { if (q.p) inP[q.p] = (inP[q.p] || 0) + 1; });
      for (let k = 0; k <= 20; k++) {
        const h = new Map(b.questions.map((q) => [q, { done: Math.floor(Math.random() * 3), wrong: Math.random() < 0.3 ? 1 : 0 }]));
        const d = Quiz.draw(b, k ? (q) => h.get(q) : null), qs = d.questions, keys = qs.map(Quiz.key), tag = `${at} (${b.questions.length} câu), lần rút ${k + 1}`;
        soOnCD.rut++;
        if (qs.length !== Quiz.TOPIC_N) err(tag, `rút được ${qs.length} câu, cần ${Quiz.TOPIC_N}`);
        if (new Set(keys).size !== keys.length) err(tag, "có câu trùng");
        if (qs.some((q) => topicOf(q.topic) !== t)) err(tag, "có câu của chủ đề khác");
        if (qs.some((q) => !ids0.has(q.src))) err(tag, "có câu không thuộc đề nào của khối, môn này");
        if (d.notes.length) err(tag, "app ghi chú cho học sinh: " + d.notes.join("; "));
        const got = {}; qs.forEach((q) => { if (q.p) got[q.p] = (got[q.p] || 0) + 1; });
        const part = Object.keys(got).filter((p) => got[p] < inP[p]);
        if (part.length > 1) hits.add(`lấy một phần ở ${part.length} đoạn đọc`);
        if (Object.keys(got).length > cap) hits.add(`lấy ${Object.keys(got).length} đoạn đọc, quá ⌈${Quiz.TOPIC_N}/3⌉ = ${cap} (mỗi đoạn nên có ít nhất 3 câu của chủ đề)`);
      }
      hits.forEach((msg) => warn.push(`${at}: có lần rút ${msg}`));
    });
  });
  // kho giả: f1, đề ngẫu nhiên pool (from f1, một câu riêng), f2 (trùng một câu của f1, cùng mã đoạn đọc p1 với f1)
  const at = "Quiz.topicBank (kho giả)", mc = (topic, q, x) => Object.assign({ type: "mc", topic, q, o: ["1", "2"], x: "." }, x || {});
  const F1 = { id: "f1", questions: [mc("T", "a"), { type: "essay", topic: "T", q: "e", rubric: [{ c: "ý", p: 1 }], x: "." }, mc("U", "b"), mc(" T ", "c", { p: "p1" })], passages: { p1: { text: "x" } } };
  const P = { id: "pool", pool: { from: ["f1"] }, questions: [mc("T", "own", { src: "pool" }), mc("T", "a", { src: "f1" })], passages: { p1: { text: "x" } } };
  const F2 = { id: "f2", questions: [mc("T", "a"), mc("T", "d", { p: "p1" })], passages: { p1: { text: "y" } } };
  const tb = Quiz.topicBank([F1, P, F2], "T", { id: "chu-de:4:toan:T", title: "Toán 4 · Ôn chủ đề · T", grade: 4, subject: "Toán" });
  const sig = tb.questions.map((q) => q.q + "@" + q.src + (q.p ? "#" + q.p : "")).join();
  if (sig !== "a@f1,c@f1#f1/p1,own@pool,d@f2#f2/p1") err(at, "kho câu sai: " + sig);
  if (!tb.passages || Object.keys(tb.passages).join() !== "f1/p1,f2/p1" || tb.passages["f2/p1"].text !== "y") err(at, "đoạn đọc sai: " + JSON.stringify(tb.passages));
  if (tb.n !== 4 || JSON.stringify(tb.pool.matrix) !== '{"T":4}' || tb.topic !== "T" || tb.id !== "chu-de:4:toan:T") err(at, "ma trận, mã đề sai: " + JSON.stringify({ n: tb.n, m: tb.pool.matrix, id: tb.id }));
  if (Quiz.draw(tb).questions.length !== 4) err(at, "kho dưới 10 câu thì rút hết");
  if (Quiz.title({ title: "Tiếng Anh 4 · Ôn chủ đề · Unit 1 · My Friends", subject: "Tiếng Anh" }) !== "English 4 · Topic practice · Unit 1 · My Friends"
    || Quiz.title({ title: "Tiếng Anh 4 · Ôn chủ đề · Unit 1 · My Friends", subject: "Tiếng Anh" }, "vi") !== "Tiếng Anh 4 · Ôn chủ đề · Unit 1 · My Friends") err(at, "Quiz.title chưa dịch đề Ôn chủ đề");
}

/* ---------- bộ lọc hình ----------
   Hình cố ý viết sai: bộ lọc phải bỏ mã chạy, link ngoài, style, màu tự đặt; hình hỏng cấu trúc thì bỏ cả hình. */
const SVG_THU = [
  ['<svg viewBox="0 0 10 10"><script>alert(1)</script><circle cx="5" cy="5" r="4" onload="alert(2)" fill="#f00" stroke="acc"/></svg>', true],
  ['<svg viewBox="0 0 10 10" onload="alert(1)"><a href="https://ví.dụ"><text x="1" y="5">bấm</text></a><image href="https://ví.dụ/a.png"/></svg>', true],
  ['<svg viewBox="0 0 10 10"><foreignObject><div xmlns="http://www.w3.org/1999/xhtml">x</div></foreignObject><rect x="1" y="1" width="2" height="2" style="fill:url(https://ví.dụ)"/><use href="#a"/></svg>', true],
  ['<svg viewBox="0 0 10 10"><rect x="1" y="1" width="2" height="2" transform="url(javascript:alert(1))"/><text x="1" y="5">&lt;script&gt;</text></svg>', true],
  ['<svg viewBox="0 0 10 10"><rect x="1"y="2"/></svg>', false],
  ['<svg viewBox="0 0 10 10"><g><rect/></svg>', false],
  ['<div><svg viewBox="0 0 10 10"></svg></div>', false],
  ['<svg><circle r="1"/></svg>', false]
];
SVG_THU.forEach(([src, keep], i) => {
  const c = Quiz.svg(src), at = "bộ lọc hình, mẫu " + (i + 1);
  if (!c.problems.length) err(at, "không báo chỗ sai");
  if (!keep) { if (c.svg) err(at, "hình hỏng mà vẫn giữ: " + c.svg); return; }
  if (!c.svg) { err(at, "bỏ cả hình, cần giữ phần vẽ an toàn"); return; }
  if (/<(script|a|image|use|foreignObject|div)\b|\son\w+=|href|url|javascript|#f00|style="[^"]*fill:url/i.test(c.svg)) err(at, "còn sót: " + c.svg);
  if (!/^<svg viewBox="0 0 10 10" role="img" focusable="false">/.test(c.svg)) err(at, "thẻ svg đầu chưa đúng: " + c.svg.slice(0, 80));
});
const dep = Quiz.svg('<svg viewBox="0 0 10 10" width="120"><circle cx="5" cy="5" r="4" fill="acc-soft" stroke="ok"/><text x="1" y="5">A &amp; B</text></svg>');
if (dep.problems.length || dep.svg !== '<svg viewBox="0 0 10 10" role="img" focusable="false" style="max-width:120px"><circle cx="5" cy="5" r="4" style="fill:var(--acc-soft);stroke:var(--ok)"></circle><text x="1" y="5">A &amp; B</text></svg>') err("bộ lọc hình", "hình đúng bị đổi: " + JSON.stringify(dep));

/* ---------- đề Tiếng Anh: 100% tiếng Anh (Phiên TA1) ----------
   Đề có môn Tiếng Anh: mọi trường chữ của đề (note), đoạn đọc và từng câu. Đề môn khác: câu có topic bắt đầu bằng "English"
   và đoạn đọc câu đó dùng. Chữ cái tiếng Việt: nguyên âm có dấu thanh, ă, â, ê, ô, ơ, ư, đ (cả chữ hoa). Từ tiếng Anh có dấu
   được phép ghi ở TU_CO_DAU (so chữ thường, bỏ dấu câu quanh từ). */
const TU_CO_DAU = ["café", "cafés", "cliché", "fiancé", "fiancée", "résumé", "naïve", "façade", "crème"];
const CHU_VIET = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/iu;
const chuViet = (s) => { // các từ có chữ cái tiếng Việt trong một chuỗi (bỏ từ được phép), tối đa 5
  const out = [];
  String(s).normalize("NFC").split(/\s+/).forEach((w) => { const core = w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, ""); if (CHU_VIET.test(core) && !TU_CO_DAU.includes(core.toLowerCase()) && !out.includes(core)) out.push(core); });
  return out.slice(0, 5).join(", ") + (out.length > 5 ? "…" : "");
};
const truongChu = (q) => { // [tên trường, chữ] của một câu
  const f = [["topic", q.topic], ["q", q.q], ["x", q.x], ["unit", q.unit]];
  const list = (name, arr) => (Array.isArray(arr) ? arr : []).forEach((v, k) => f.push([`${name}[${k + 1}]`, v]));
  list("o", q.o); list("ans", q.ans); list("l", q.l); list("r", q.r);
  (Array.isArray(q.rubric) ? q.rubric : []).forEach((c, k) => f.push([`rubric[${k + 1}].c`, c && c.c]));
  return f.filter(([, v]) => typeof v === "string");
};
const soatTiengAnh = (at, fields, report) => fields.forEach(([name, v]) => { const vi = chuViet(v); if (vi) report(at, `${name} có chữ tiếng Việt: ${vi}`); });
const laCauTiengAnh = (q) => /^English\b/.test(topicOf(q && q.topic));
const soTA = { de: 0, cau: 0, cauKhac: 0 };
catalog.forEach((b) => {
  const v = questions[b.id];
  if (!v) return;
  const all = b.subject === "Tiếng Anh", qs = Array.isArray(v.questions) ? v.questions : [], psg = v.passages && typeof v.passages === "object" ? v.passages : {};
  const used = new Set();
  if (all) { soTA.de++; soatTiengAnh(b.id, [["note", v.note]], err); Object.keys(psg).forEach((pid) => used.add(pid)); }
  qs.forEach((q, i) => {
    if (!q || typeof q !== "object" || !(all || laCauTiengAnh(q))) return;
    if (all) soTA.cau++; else soTA.cauKhac++;
    soatTiengAnh(`${b.id} câu ${i + 1}`, truongChu(q), err);
    if (q.p) used.add(q.p);
  });
  used.forEach((pid) => { const p = psg[pid]; if (p && typeof p === "object") soatTiengAnh(`${b.id} đoạn đọc ${pid}`, [["title", p.title], ["text", p.text]], err); });
});
// tự thử: câu cố ý viết sai phải bị bắt đúng trường, đúng chữ; từ được phép không bị báo
{
  const at = "kiểm tra tiếng Anh", got = [];
  soatTiengAnh("thu câu 1", truongChu({ topic: "English · Reading", type: "mc", q: "Chọn đáp án đúng: Where is Lan from?", o: ["Viet Nam", "Nhật Bản"], x: "Lan ở Việt Nam. She likes cafés." }), (a, m) => got.push(a + ": " + m));
  const want = ["thu câu 1: q có chữ tiếng Việt: Chọn, đáp, án, đúng", "thu câu 1: x có chữ tiếng Việt: ở, Việt", "thu câu 1: o[2] có chữ tiếng Việt: Nhật, Bản"];
  if (JSON.stringify(got) !== JSON.stringify(want)) err(at, "chưa bắt đúng câu cố ý viết sai: " + JSON.stringify(got));
  if (chuViet("Lucy likes cafés. Voilà, a café!") !== "Voilà") err(at, "từ được phép (café, cafés) bị báo, hoặc từ có dấu khác không bị báo: " + chuViet("Lucy likes cafés. Voilà, a café!"));
  if (laCauTiengAnh({ topic: "Tiếng Anh · Đọc hiểu" }) || !laCauTiengAnh({ topic: "English · Reading" })) err(at, "nhận câu Tiếng Anh theo topic chưa đúng");
}

// tự thử quy ước tên đề: tên sai phải bị báo, tên đúng và đề thử nghiệm thì không
{
  const at = "kiểm tra tên đề", mk = (title, pool) => Object.assign({ title, grade: 4, subject: "Tin học và Công nghệ" }, pool ? { pool: {} } : {});
  const sai = [mk("Tin học và Công nghệ 4 · Cuối kì I"), mk("Tin học và Công nghệ 4 · Cuối kỳ I · Đề 1"), mk("Tin học 4 · Cuối kì I · Đề 1"), mk("Tin học và Công nghệ 6 · Cuối kì I · Đề 1"),
    mk("Tin học và Công nghệ 4 · Cuối kì I · Đề 0"), mk("Tin học và Công nghệ 4 · Cuối kì I · Đề ngẫu nhiên"), mk("Tin học và Công nghệ 4 · Cuối kì I · Đề 1", true), mk("Đề 1 · Tin học và Công nghệ 4 · Cuối kì I")];
  sai.forEach((b, i) => { if (!soatTen(b)) err(at, `tên sai mẫu ${i + 1} không bị báo: "${b.title}"`); });
  [mk("Tin học và Công nghệ 4 · Cuối kì I · Đề 1"), mk("Tin học và Công nghệ 4 · Giữa kì II · Đề 12"), mk("Tin học và Công nghệ 4 · Cuối năm · Đề ngẫu nhiên", true),
    { title: "Đề thử nghiệm · Các dạng câu mới", grade: 6, subject: MON_THU }].forEach((b, i) => { const m = soatTen(b); if (m) err(at, `tên đúng mẫu ${i + 1} bị báo: ${m}`); });
}

// tự thử đề tính điểm (Phiên K5): Quiz.grade với đề Toán tốt nghiệp (12 câu nhiều lựa chọn 0,25 điểm, 4 câu đúng/sai 4 ý 1 điểm,
// 6 câu trả lời ngắn 0,5 điểm): đúng 10/12 câu, 4 câu đúng/sai đúng 4, 3, 2, 1 ý, 4/6 câu trả lời ngắn → 6,35 điểm (cách chấm theo
// số câu cho 7,25); câu tự luận chỉ góp vào điểm tối đa; tên kì thi thử; soatDiem bắt được đề viết sai
{
  const at = "kiểm tra đề tính điểm", P1 = "Phần I. Trắc nghiệm nhiều lựa chọn", P2 = "Phần II. Trắc nghiệm đúng sai", P3 = "Phần III. Trả lời ngắn";
  const mc = (i) => ({ topic: "Hàm số", type: "mc", q: "Câu " + i, o: ["A", "B", "C", "D"], x: "Lời giải", pt: 0.25, part: P1 });
  const tf = (i) => ({ topic: "Đạo hàm", type: "tf4", q: "Câu " + i, o: ["a", "b", "c", "d"], a: [true, false, true, false], x: "Lời giải", pt: 1, part: P2 });
  const nm = (i) => ({ topic: "Xác suất", type: "num", q: "Câu " + i, ans: i, x: "Lời giải", pt: 0.5, part: P3 });
  const qs = [...Array(12)].map((_, i) => mc(i + 1)).concat([...Array(4)].map((_, i) => tf(i + 13)), [...Array(6)].map((_, i) => nm(i + 17)));
  const flip = (k) => [true, false, true, false].map((v, j) => (j < k ? v : !v)); // đúng k ý đầu
  const ans = qs.map((q, i) => (i < 12 ? (i < 10 ? 0 : 1) : i < 16 ? flip(4 - (i - 12)) : i < 20 ? String(q.ans) : String(q.ans + 1)));
  const G = Quiz.grade(qs, ans), parts = G.parts.map((p) => [p.part, p.got, p.max, p.n]);
  if (G.got !== 6.35 || G.max !== 10 || G.auto !== 10 || JSON.stringify(parts) !== JSON.stringify([[P1, 2.5, 3, 12], [P2, 1.85, 4, 4], [P3, 2, 3, 6]])) err(at, "Quiz.grade chưa ra 6,35/10 (2,5 + 1,85 + 2): " + JSON.stringify(G));
  const old = qs.reduce((a, q, i) => a + Quiz.score(q.type === "mc" ? Object.assign({}, q, { a: 0 }) : q, ans[i]), 0);
  if (Math.round((old / qs.length) * 40) / 4 !== 7.25) err(at, `ví dụ 6,35 phải cho 7,25 theo cách chấm số câu (đang ${old}/${qs.length})`);
  const ess = { topic: "Viết", type: "essay", q: "Viết đoạn văn", rubric: [{ c: "Ý 1", p: 1.5 }, { c: "Ý 2", p: 0.5 }], x: "Gợi ý", pt: 2, part: "Phần II. Viết" };
  const G2 = Quiz.grade([mc(1), ess], [0, "bài viết"]);
  if (G2.got !== 0.25 || G2.max !== 2.25 || G2.auto !== 0.25 || G2.parts[1].essay !== 2 || G2.parts[1].got !== 0) err(at, "Quiz.grade tính sai câu tự luận: " + JSON.stringify(G2));
  if (Quiz.grade(qs, []).got !== 0) err(at, "Quiz.grade: câu chưa làm phải được 0 điểm");
  const de = { id: "toan12-tn-de1", title: "Toán 12 · Thi thử tốt nghiệp · Đề 1", grade: 12, subject: "Toán", minutes: 90, n: 22, file: "12-toan.js", pts: 10 };
  const dung = soatDiem(de, qs); if (dung.length) err(at, "đề đúng bị báo: " + dung.join("; "));
  [de, { title: "Ngữ văn 9 · Thi thử vào 10 · Đề 2", grade: 9, subject: "Ngữ văn" }].forEach((b) => { const m = soatTen(b); if (m) err(at, `tên "${b.title}" bị báo: ${m}`); });
  if (!soatTen({ title: "Toán 12 · Thi thử THPT · Đề 1", grade: 12, subject: "Toán" })) err(at, "tên kì lạ “Thi thử THPT” không bị báo");
  if (Quiz.title({ title: "Tiếng Anh 9 · Thi thử vào 10 · Đề 1", subject: "Tiếng Anh" }) !== "English 9 · Mock Entrance Exam · Test 1" || Quiz.title({ title: "Tiếng Anh 12 · Thi thử tốt nghiệp · Đề 2", subject: "Tiếng Anh" }) !== "English 12 · Mock Graduation Exam · Test 2") err(at, "Quiz.title chưa dịch hai kì thi thử");
  const sai = [
    ["thiếu pt", qs.map((q, i) => (i ? q : Object.assign({}, q, { pt: undefined })))],
    ["pt không bội 0,25", qs.map((q, i) => (i ? q : Object.assign({}, q, { pt: 0.3 })))],
    ["đúng/sai 4 ý pt khác 1", qs.map((q, i) => (i === 12 ? Object.assign({}, q, { pt: 0.5 }) : q))],
    ["tổng khác pts", qs.slice(0, 21)],
    ["phần không liền nhau", [qs[12]].concat(qs.slice(0, 12), qs.slice(13))],
    ["thiếu part ở một câu", qs.map((q, i) => (i ? q : (({ part, ...r }) => r)(q)))],
    ["tự luận pt khác thang chấm", qs.slice(0, 20).concat([Object.assign({}, ess, { pt: 1, part: P3 })])],
    ["đoạn đọc tách đôi", qs.map((q, i) => (i === 0 || i === 2 ? Object.assign({}, q, { p: "d1" }) : q))],
  ];
  sai.forEach(([ten, list]) => { if (!soatDiem(de, list).length) err(at, `đề sai (${ten}) không bị báo`); });
}

// tự thử câu trả lời bằng số (L29): phân số "2/3", "-3/4" và số qua; đáp án viết sai bị báo; Quiz.parse đọc "Đáp số: 3/4" thành phân số
{
  const at = "kiểm tra trả lời bằng số", mk = (ans) => ({ topic: "Phân số", type: "num", q: "Câu thử", ans, x: "Lời giải" });
  ["2/3", "-3/4", 2.5, -7].forEach((a) => { const m = soatSo(mk(a)); if (m) err(at, `ans ${JSON.stringify(a)} đúng mà bị báo: ${m}`); });
  ["2/0", "hai phần ba", "2,5", "2/3/4", " 2/3", "−3/4"].forEach((a) => { if (!soatSo(mk(a))) err(at, `ans ${JSON.stringify(a)} sai mà không bị báo`); });
  [["1/2 + 1/4 = ?\nĐáp số: 3/4", "3/4"], ["1/4 − 1 = ?\nĐáp số: -3/4", "-3/4"]].forEach(([src, want]) => {
    const p = Quiz.parse(src), q = p.questions[0];
    if (p.errors.length || p.questions.length !== 1 || q.type !== "num" || q.ans !== want || "unit" in q || soatSo(Object.assign(q, { x: "Lời giải" }))) err(at, `Quiz.parse đọc “${src.split("\n")[1]}” chưa đúng: ` + JSON.stringify(p));
  });
}

// tự thử phân số, hỗn số gõ có khoảng trắng (L32): câu trả lời bằng số đọc hỗn số "a b/c" là a + b/c, không còn là "ab/c";
// câu điền có đáp án là phân số, hỗn số không tính khoảng trắng quanh "/" (vẫn so chữ); Quiz.parse vẫn báo lỗi "Đáp số: 1 1/2"
{
  const at = "kiểm tra phân số, hỗn số gõ có khoảng trắng (L32)";
  const so = (ans, unit) => Object.assign({ topic: "Phân số", type: "num", q: "Câu thử", ans, x: "Lời giải" }, unit ? { unit } : {});
  const dien = (ans) => ({ topic: "Phân số", type: "fill", q: "Viết phân số tối giản: ___", ans: [ans], x: "Lời giải" });
  [[so("3/2"), "1 1/2", 1], [so(1.5), "1 1/2", 1], [so("11/2"), "1 1/2", 0], [so("-3/2"), "-1 1/2", 1], [so("-3/2"), "(-1 1/2)", 1],
    [so("11/4"), "2 3/4", 1], [so("23/4"), "2 3/4", 0], [so("3/2"), "1 1/0", 0], [so(400), "1 200/3", 1], [so("203/3"), "1 200/3", 1],
    [so(1200), "1 200", 1], [so("2/3"), "2 / 3", 1], [so("11/2"), "11/2", 1], [so("3/4", "kg"), "3/4 kg", 1],
    [dien("3/4"), "3 / 4", 1], [dien("3/4"), "3/ 4", 1], [dien("3/4"), "6/8", 0], [dien("3 1/2"), "3 1 / 2", 1], [dien("3 1/2"), "31/2", 0]]
    .forEach(([q, g, want]) => { if (Quiz.score(q, g) !== want) err(at, `${q.type === "num" ? "câu trả lời bằng số" : "câu điền"} đáp án ${JSON.stringify(q.type === "num" ? q.ans : q.ans[0])}${q.unit ? " " + q.unit : ""}: gõ "${g}" phải ${want ? "đúng" : "sai"}`); });
  const p = Quiz.parse("1 + 1/2 = ?\nĐáp số: 1 1/2");
  if (p.questions.length || !p.errors.some((e) => e.includes("3/2"))) err(at, "Quiz.parse phải báo lỗi dòng “Đáp số: 1 1/2” và dặn viết 3/2: " + JSON.stringify(p));
}

// tự thử issues của Quiz.parse (Phiên UX7, X13): lỗi gắn với câu (n đếm cả câu bị bỏ, dropped: câu bị bỏ hẳn, kèm chữ đã dán) và đoạn
// đọc (p); errors dạng chữ giữ nguyên
{
  const at = "kiểm tra lỗi gắn vào câu (UX7)";
  const p = Quiz.parse("# Cộng\n2 + 2 = ?\n* 4\n- 5\nMức: Rất khó\n\nDây dài 2 m, cắt 0,75 m. Còn bao nhiêu mét?\nĐáp số: một phẩy hai lăm\n\n3 + 3 = [6]\n\nĐoạn đọc: Mèo\nNhà Bin có mèo.\nHết đoạn\n\n# Viết\nĐoạn đọc: Trống\nHết đoạn");
  const got = JSON.stringify(p.issues.map((x) => (x.n ? [x.n, !!x.dropped, x.dropped ? x.topic + "|" + x.text.split("\n")[1] : ""] : ["p" + x.p, !!x.dropped])));
  const want = JSON.stringify([["p2", false], [1, false, ""], [2, true, "Cộng|Đáp số: một phẩy hai lăm"], ["p1", false], ["p2", false]]); // đoạn đọc đọc trước câu
  if (got !== want || p.questions.length !== 2 || p.errors.length !== p.issues.length || !/^Câu 2: dòng “Đáp số:”/.test(p.errors[2]) || p.questions[0].lv) err(at, `issues chưa đúng: ${got}, mong đợi ${want}; errors ${JSON.stringify(p.errors)}`);
  const q = Quiz.parse("Thiếu cuối\nĐoạn đọc: Mèo\nNhà Bin có mèo.").issues;
  if (JSON.stringify(q) !== JSON.stringify([{ p: 1, msg: "thiếu dòng “Hết đoạn” ở cuối đoạn", dropped: true }, { n: 1, msg: "chưa nhận ra dạng câu (\"Thiếu cuối Nhà Bin có mèo.…\")", dropped: true, topic: "", text: "Thiếu cuối\nNhà Bin có mèo." }])) err(at, "đoạn đọc thiếu “Hết đoạn”: " + JSON.stringify(q));
}

// tự thử câu điền đáp án phân số, hỗn số gõ kèm đơn vị in ngay sau chỗ trống (L34): đúng như câu có đáp án là số
// (cả gõ "m2" thay "m²"); vẫn so chữ nên phân số chưa tối giản, số thập phân, đơn vị khác vẫn sai
{
  const at = "kiểm tra câu điền đáp án phân số gõ kèm đơn vị (L34)";
  const dien = (q, ans) => ({ topic: "Phân số", type: "fill", q, ans: [ans], x: "Lời giải" });
  const kg = dien("1/2 kg + 1/4 kg = ___ kg", "3/4"), m = dien("Sợi dây dài ___ m", "3 1/2"), m2 = dien("Diện tích hình vuông là ___ m²", "3/4");
  [[kg, "3/4 kg", 1], [kg, "3/4kg", 1], [kg, "3 / 4 kg", 1], [kg, "3/4 KG", 1], [kg, "6/8 kg", 0], [kg, "0,75 kg", 0], [kg, "3/4 g", 0],
    [m, "3 1/2 m", 1], [m, "31/2 m", 0], [m2, "3/4 m²", 1], [m2, "3/4 m2", 1], [m2, "3/4 m", 0]]
    .forEach(([q, g, want]) => { if (Quiz.score(q, g) !== want) err(at, `câu điền “${q.q}” đáp án "${q.ans[0]}": gõ "${g}" phải ${want ? "đúng" : "sai"}`); });
}

// tự thử câu điền đáp án phân số, hỗn số âm (L35): đáp án viết dấu trừ chữ in "−", gạch "–" hay "-" đều nhận mọi kiểu dấu trừ
// và khoảng trắng sau dấu trừ, cả khi gõ kèm đơn vị (L34); vẫn so chữ nên phân số chưa tối giản, thiếu hay thừa dấu trừ vẫn sai
{
  const at = "kiểm tra câu điền đáp án phân số âm (L35)";
  const dien = (q, ans) => ({ topic: "Phân số", type: "fill", q, ans: [ans], x: "Lời giải" });
  const thu = [];
  ["−3/4", "–3/4", "-3/4"].forEach((a) => {
    const p = dien("Viết phân số tối giản: 1/4 − 1 = ___", a), kg = dien("1/4 kg − 1 kg = ___ kg", a);
    thu.push([p, "-3/4", 1], [p, "−3/4", 1], [p, "–3/4", 1], [p, "- 3/4", 1], [p, "3/4", 0], [p, "-6/8", 0], [p, "-0,75", 0],
      [kg, "-3/4 kg", 1], [kg, "- 3/4 kg", 1], [kg, "−3/4 kg", 1], [kg, "-6/8 kg", 0], [kg, "3/4 kg", 0]);
  });
  const h = dien("Viết dưới dạng hỗn số: −3/2 = ___", "−1 1/2"), duong = dien("Viết phân số tối giản: 1/2 + 1/4 = ___", "3/4");
  thu.push([h, "-1 1/2", 1], [h, "- 1 1/2", 1], [h, "1 1/2", 0], [h, "-11/2", 0], [duong, "-3/4", 0], [duong, "−3/4", 0]);
  thu.forEach(([q, g, want]) => { if (Quiz.score(q, g) !== want) err(at, `câu điền “${q.q}” đáp án "${q.ans[0]}": gõ "${g}" phải ${want ? "đúng" : "sai"}`); });
}

// tự thử câu điền về số âm (L33): hai câu cố ý viết sai bị báo; phép trừ, gạch nối khoảng, đáp án có chữ thì không;
// SO, SO_AM vẫn giống isNum, isNeg của js/quiz.js
{
  const at = "kiểm tra câu điền về số âm (L33)", mk = (q, ans) => ({ topic: "Số nguyên", type: "fill", q, ans, x: "Lời giải" });
  [mk("(−72) : 8 = ___", ["-9"]), mk("(−25) + 30 = ___", ["5"]), mk("−5 + 2 = ___", ["(−3)"])].forEach((q) => { if (!soatSoAm(q)) err(at, `câu sai "${q.q}" (đáp án ${q.ans}) không bị báo`); });
  [mk("862 450 − 315 270 = ___", ["547 180"]), mk("Bài 1–22: số liền sau của 99 là ___", ["100"]), mk("Số đối của −7 là ___.", ["7", "+7"]), mk("Nhiệt độ −2 °C tăng thêm 7 °C thì được ___ °C.", ["5", "+5"])]
    .forEach((q) => { if (soatSoAm(q)) err(at, `câu đúng "${q.q}" (đáp án ${q.ans}) bị báo`); });
  const src = read("js/quiz.js");
  [["isNum", SO], ["isNeg", SO_AM]].forEach(([n, re]) => { if (!src.includes(`const ${n} = (s) => /${re.source}/.test(`)) err(at, `${n} trong js/quiz.js đã đổi: sửa ${n === "isNum" ? "SO" : "SO_AM"} trong script này cho khớp`); });
}

/* ---------- lịch thi mặc định ---------- */
const MODULES = W.ONTAP_MODULES || [];
{ // mã kì thi không trùng, mọi kì thi có khối trong data/grades.js và ngày đúng dạng (Lịch các khối mới: lịch có kì thi của khối 4–12)
  const seenEv = new Set();
  (W.ONTAP_SEED_EVENTS || []).forEach((e) => {
    const at = "kì thi " + e.id;
    if (seenEv.has(e.id)) err(at, "mã kì thi trùng"); seenEv.add(e.id);
    if (!Array.isArray(e.grades) || !e.grades.length || e.grades.some((g) => !grades.includes(g))) err(at, `khối ${JSON.stringify(e.grades)} không có trong data/grades.js`);
    [e.start, e.end].forEach((d) => { if (d != null && !/^\d{4}-\d{2}-\d{2}$/.test(d)) err(at, `ngày "${d}" không đúng dạng YYYY-MM-DD`); });
    if (e.start && e.end && e.end < e.start) err(at, "ngày kết thúc trước ngày bắt đầu");
  });
}
(W.ONTAP_SEED_EVENTS || []).forEach((e) => {
  const at = "kì thi " + e.id;
  (e.banks || []).forEach((id) => {
    const b = catalog.find((x) => x.id === id);
    if (!b) err(at, `gắn đề không có: ${id}`);
    else if (!(e.grades || []).includes(b.grade)) err(at, `gắn đề lớp ${b.grade} (${id}) nhưng kì thi dành cho lớp ${(e.grades || []).join(", ")}`);
  });
  (e.modules || []).forEach((id) => {
    const m = MODULES.find((x) => x.id === id);
    if (!m) err(at, `gắn bài ôn không có: ${id}`);
    else if (!(e.grades || []).includes(m.grade)) err(at, `gắn bài ôn lớp ${m.grade} (${id}) nhưng kì thi dành cho lớp ${(e.grades || []).join(", ")}`);
  });
});
const linked = new Set((W.ONTAP_SEED_EVENTS || []).flatMap((e) => e.banks || []));
const loose = ids.filter((id) => !linked.has(id));

const total = Object.values(count).reduce((a, n) => a + n, 0);
console.log(`${catalog.length - pools.length} đề, ${files.length} file câu hỏi, ${total} câu (${Object.entries(count).filter(([, n]) => n).map(([t, n]) => n + " " + TEN_DANG[t]).join(", ")}); ${pools.length} đề ngẫu nhiên.`);
console.log(`Đề Tiếng Anh 100% tiếng Anh: ${soTA.de} đề, ${soTA.cau} câu; ${soTA.cauKhac} câu Tiếng Anh trong đề khác.`);
console.log(`Đề "Ôn chủ đề": ${soOnCD.chuDe} chủ đề có ít nhất ${Quiz.TOPIC_N} câu, rút thử ${soOnCD.rut} lần.`);
if (warn.length) console.log("Nhắc:\n" + warn.join("\n"));
if (loose.length) console.log("Đề chưa gắn kì thi nào (vẫn hiện ở nhóm “Bài ôn khác”): " + loose.join(", "));
if (bad.length) { console.error(bad.join("\n")); console.error(`DE FAILED: ${bad.length} lỗi`); process.exitCode = 1; } else console.log("DE OK");
