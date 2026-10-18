/* Bộ kiểm tra đề có sẵn (data/banks/), chạy bằng node, không cần trình duyệt: node tests/kiem-tra-de.js → in "DE OK".
   Chạy trước mỗi Pull Request có thêm hoặc sửa đề. Kiểm tra:
   - danh mục data/banks/index.js: mỗi đề đủ trường, mã đúng dạng, không trùng, không dùng lại mã đã bỏ
     (RETIRED_SEED_BANKS, phải giống nhau ở js/store.js và js/store-supabase.js); khối có trong data/grades.js;
     n đúng bằng số câu trong file; số câu, số phút hợp lí (GIOI_HAN);
   - file câu hỏi data/banks/<khối>-<mã môn>.js: tên đúng khối của đề, mỗi file một môn, mỗi môn một mã;
     file chứa đúng các đề danh mục ghi cho nó, chỉ ghi vào window.ONTAP_SEED_QUESTIONS; không có file thừa;
   - từng câu: dạng có trong TRUONG_CAU, không có trường lạ; có câu hỏi, chủ đề, lời giải (tự luận: đáp án gợi ý);
     trắc nghiệm có ít nhất 2 lựa chọn, không trùng nhau (phân biệt chữ hoa: có câu hỏi cách viết hoa); điền khuyết có đáp án
     và đúng một chỗ trống ___ (js/quiz.js chấm đáp án đầu là đúng); đúng/sai có a là true hoặc false;
     đúng/sai 4 ý (tf4) có đúng 4 ý không trùng, a là 4 giá trị true/false; trả lời bằng số (num) có ans là số, tol ≥ 0,
     app chấm đúng ans (viết kiểu Việt Nam, như 2,5); nối cột (match) có ít nhất 2 ô trái, cột phải đủ ô (thêm tối đa 3 ô thừa),
     không ô nào trùng; sắp xếp (order) có 3–8 ô không trùng; tự luận (essay) có thang chấm, điểm mỗi ý chia hết cho 0,25,
     tổng không quá 10; lv là 1, 2 hoặc 3; p là mã một đoạn đọc của đề; hình (svg) qua bộ lọc Quiz.svg không bị bỏ gì;
   - đoạn đọc (passages): mã gọn, có chữ hoặc hình, mỗi đoạn có ít nhất một câu dùng;
   - không có hai câu trùng nhau trong mọi đề: so câu hỏi sau khi bỏ dấu câu, khoảng trắng (dấu thanh, chữ hoa giữ nguyên),
     trắc nghiệm, đúng/sai 4 ý, nối cột, sắp xếp so cả các lựa chọn (câu “Chọn từ khác loại” khác nhau ở lựa chọn);
   - đề ngẫu nhiên (mục có pool, Phiên K3): tên kết thúc bằng "· Đề ngẫu nhiên"; from là các đề cố định có thật, cùng khối,
     môn, file, không trùng; có câu riêng trong file thì ít nhất một câu (không có thì không ghi vào file); đoạn đọc không
     trùng mã giữa các đề trong kho; matrix: mỗi chủ đề là số nguyên dương hoặc [Biết, Hiểu, Vận dụng], chữ chủ đề đúng
     topic của câu trong kho, tổng bằng n; kho đủ câu cho từng chủ đề (lỗi), thiếu ở một mức thì chỉ nhắc (app lấy bù mức
     gần nhất và ghi chú); rút thử (Quiz.draw) ra đúng n câu không trùng, không ghi chú khi kho đủ;
   - bộ rút đề (Quiz.draw) với kho giả: đúng ma trận, ưu tiên câu chưa làm và câu hay sai, lấy bù và ghi chú khi thiếu;
     mã câu (Quiz.key) không đổi khi sửa lời giải, chủ đề;
   - lịch thi mặc định (data/calendar-2026-2027.js): đề và bài ôn gắn vào kì thi có thật, đúng khối của kì thi;
   - bộ lọc hình (Quiz.svg) bỏ được mã chạy và link ngoài trong vài hình mẫu cố ý viết sai (SVG_THU).
   - đề Tiếng Anh 100% tiếng Anh (Phiên TA1): đề có môn Tiếng Anh (mọi khối) và câu có topic bắt đầu bằng "English" trong đề
     khác (kèm đoạn đọc câu đó dùng): mọi trường chữ (note, tên và chữ đoạn đọc, topic, q, o, ans, l, r, x, rubric[].c, unit)
     không có chữ cái tiếng Việt (nguyên âm có dấu, ă, â, ê, ô, ơ, ư, đ); vài từ tiếng Anh có dấu được phép (TU_CO_DAU);
     lỗi ghi mã đề, số câu, trường và chữ tiếng Việt; script tự thử với một câu cố ý viết sai.
   Thêm dạng câu mới thì thêm kiểm tra cho dạng đó ở đây. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const GIOI_HAN = { cau: [10, 60], phut: [10, 120], giayMoiCau: [30, 300] };
const TRUONG_DE = ["id", "title", "grade", "subject", "minutes", "n", "file"]; // đề ngẫu nhiên có thêm pool ở cuối
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
const norm = (s) => String(s).normalize("NFC").replace(/[\p{P}\s]+/gu, "");
const opt = (s) => String(s).normalize("NFC").replace(/\s+/g, " ").trim();

const W = load(["data/grades.js", "data/calendar-2026-2027.js", "data/modules.js"]).window;
const grades = (W.ONTAP_GRADES || []).map((g) => g.grade);
const Quiz = load(["js/quiz.js"]).window.Quiz;

/* ---------- danh mục ---------- */
const catalog = load(["data/banks/index.js"]).window.ONTAP_SEED_BANKS || [];
const ids = catalog.map((b) => b.id);
const retiredOf = (f) => { const m = /const RETIRED_SEED_BANKS = (\[[^\]]*\])/.exec(read(f)); return m ? JSON.parse(m[1]) : null; };
const retired = retiredOf("js/store.js"), retiredCloud = retiredOf("js/store-supabase.js");
if (!retired || JSON.stringify(retired) !== JSON.stringify(retiredCloud)) err("RETIRED_SEED_BANKS", "js/store.js và js/store-supabase.js phải giống nhau");
if (!catalog.length) err("data/banks/index.js", "danh mục trống");
catalog.forEach((b, i) => {
  const at = "danh mục #" + (i + 1) + " " + (b.id || "");
  const keys = Object.keys(b), want = "pool" in b ? TRUONG_DE.concat("pool") : TRUONG_DE;
  if (keys.join() !== want.join()) err(at, "cần đúng các trường " + want.join(", ") + " (đang có " + keys.join(", ") + ")");
  if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(b.id || "")) err(at, "mã đề chỉ gồm chữ thường không dấu, số, dấu gạch ngang");
  if (ids.indexOf(b.id) !== i) err(at, "trùng mã đề");
  if ((retired || []).includes(b.id)) err(at, "mã đề đã bỏ (RETIRED_SEED_BANKS), dùng mã khác");
  if (!grades.includes(b.grade)) err(at, "khối " + b.grade + " không có trong data/grades.js");
  if (!text(b.title) || !text(b.subject)) err(at, "thiếu tên đề hoặc môn");
  const [c0, c1] = GIOI_HAN.cau, [p0, p1] = GIOI_HAN.phut, [s0, s1] = GIOI_HAN.giayMoiCau;
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
    const may = want.concat(TRUONG_THEM[q.type] || [], ["lv", "p", "svg"]);
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
    } else if (q.type === "tf") {
      if (typeof q.a !== "boolean") err(at, "đúng/sai cần a: true hoặc false");
    } else if (q.type === "tf4") {
      if (!Array.isArray(q.o) || q.o.length !== 4) err(at, "đúng/sai 4 ý cần đúng 4 ý trong o");
      else distinct(at, q.o, "ý");
      if (!Array.isArray(q.a) || q.a.length !== 4 || !q.a.every((x) => typeof x === "boolean")) err(at, "đúng/sai 4 ý cần a là 4 giá trị true/false");
      else if (Quiz.score(q, q.a) !== 1 || Quiz.score(q, q.a.map((x, k) => (k ? x : !x))) !== 0.5) err(at, "app chấm chưa đúng câu đúng/sai 4 ý");
      key += "|" + (Array.isArray(q.o) ? q.o.map(norm).sort().join("|") : "");
    } else if (q.type === "num") {
      if (typeof q.ans !== "number" || !Number.isFinite(q.ans)) err(at, "trả lời bằng số cần ans là một số (ví dụ 2.5, không để trong ngoặc kép)");
      else if ("tol" in q && !(typeof q.tol === "number" && q.tol >= 0 && q.tol < Math.max(1, Math.abs(q.ans)))) err(at, "sai số tol phải là số ≥ 0 và nhỏ hơn đáp án");
      else if (!Quiz.isRight(q, Quiz.fmtN(q.ans)) || !Quiz.isRight(q, String(q.ans))) err(at, `app không chấm đúng đáp án ${q.ans} (viết ${Quiz.fmtN(q.ans)})`);
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
  if (!/ · Đề ngẫu nhiên$/.test(b.title)) err(at, "tên phải kết thúc bằng “· Đề ngẫu nhiên” (chữ trên nút lấy từ tên)");
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
  const d = Quiz.draw({ pool: p, questions: kho }), keys = d.questions.map(Quiz.key);
  if (d.questions.length !== sum) err(at, `rút thử được ${d.questions.length} câu, cần ${sum}`);
  if (new Set(keys).size !== keys.length) err(at, "rút thử có câu trùng");
  if (!short && d.notes.length) err(at, "kho đủ câu mà rút thử vẫn ghi chú: " + d.notes.join("; "));
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
  const k = Quiz.key(kho[0]);
  if (!/^[a-z0-9]{4,12}$/.test(k) || k !== Quiz.key(Object.assign({}, kho[0], { x: "khác", topic: "Z", lv: 3 })) || k === Quiz.key(Object.assign({}, kho[0], { q: "a1 khác" }))) err(at, "mã câu (Quiz.key) chưa ổn định: " + k);
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

/* ---------- lịch thi mặc định ---------- */
const MODULES = W.ONTAP_MODULES || [];
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
if (warn.length) console.log("Nhắc:\n" + warn.join("\n"));
if (loose.length) console.log("Đề chưa gắn kì thi nào (vẫn hiện ở nhóm “Bài ôn khác”): " + loose.join(", "));
if (bad.length) { console.error(bad.join("\n")); console.error(`DE FAILED: ${bad.length} lỗi`); process.exitCode = 1; } else console.log("DE OK");
