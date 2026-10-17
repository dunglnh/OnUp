/* Bộ kiểm tra đề có sẵn (data/banks/), chạy bằng node, không cần trình duyệt: node tests/kiem-tra-de.js → in "DE OK".
   Chạy trước mỗi Pull Request có thêm hoặc sửa đề. Kiểm tra:
   - danh mục data/banks/index.js: mỗi đề đủ trường, mã đúng dạng, không trùng, không dùng lại mã đã bỏ
     (RETIRED_SEED_BANKS, phải giống nhau ở js/store.js và js/store-supabase.js); khối có trong data/grades.js;
     n đúng bằng số câu trong file; số câu, số phút hợp lí (GIOI_HAN);
   - file câu hỏi data/banks/<khối>-<mã môn>.js: tên đúng khối của đề, mỗi file một môn, mỗi môn một mã;
     file chứa đúng các đề danh mục ghi cho nó, chỉ ghi vào window.ONTAP_SEED_QUESTIONS; không có file thừa;
   - từng câu: dạng mc, fill hoặc tf, không có trường lạ; có câu hỏi, chủ đề, lời giải; trắc nghiệm có ít nhất 2 lựa chọn,
     không trùng nhau (phân biệt chữ hoa: có câu hỏi cách viết hoa); điền khuyết có đáp án và đúng một chỗ trống ___ (js/quiz.js chấm đáp án đầu là đúng);
     đúng/sai có a là true hoặc false;
   - không có hai câu trùng nhau trong mọi đề: so câu hỏi sau khi bỏ dấu câu, khoảng trắng (dấu thanh, chữ hoa giữ nguyên),
     trắc nghiệm so cả các lựa chọn (câu “Chọn từ khác loại” khác nhau ở lựa chọn);
   - lịch thi mặc định (data/calendar-2026-2027.js): đề và bài ôn gắn vào kì thi có thật, đúng khối của kì thi.
   Thêm dạng câu mới (docs/KE-HOACH-NOI-DUNG.md, Phiên K2) thì thêm kiểm tra cho dạng đó ở đây. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
const GIOI_HAN = { cau: [10, 60], phut: [10, 120], giayMoiCau: [30, 300] };
const TRUONG_DE = ["id", "title", "grade", "subject", "minutes", "n", "file"];
const TRUONG_CAU = { mc: ["topic", "type", "q", "o", "x"], fill: ["topic", "type", "q", "ans", "x"], tf: ["topic", "type", "q", "a", "x"] };

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
  const keys = Object.keys(b);
  if (keys.join() !== TRUONG_DE.join()) err(at, "cần đúng các trường " + TRUONG_DE.join(", ") + " (đang có " + keys.join(", ") + ")");
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
  want.filter((id) => !got[id]).forEach((id) => err(at, `thiếu đề "${id}" (danh mục ghi đề này ở file ${f})`));
  Object.entries(got).forEach(([id, v]) => {
    if (questions[id]) err(at, `đề "${id}" có ở hai file`);
    if (!v || Object.keys(v).join() !== "note,questions") err(at + " " + id, "cần đúng hai trường note, questions");
    questions[id] = v;
  });
});
files.filter((f) => !onDisk.includes(f)).forEach((f) => err("data/banks/" + f, "không có file này (danh mục ghi file: " + catalog.filter((b) => b.file === f).map((b) => b.id).join(", ") + ")"));

/* ---------- từng câu ---------- */
const seen = new Map(); // khóa so trùng → vị trí
const count = { mc: 0, fill: 0, tf: 0 };
catalog.forEach((b) => {
  const v = questions[b.id];
  if (!v) return;
  if (typeof v.note !== "string") err(b.id, "note phải là chuỗi (có thể để trống)");
  const qs = Array.isArray(v.questions) ? v.questions : [];
  if (!Array.isArray(v.questions)) err(b.id, "questions phải là mảng");
  if (qs.length !== b.n) err(b.id, `danh mục ghi n = ${b.n} nhưng file có ${qs.length} câu`);
  qs.forEach((q, i) => {
    const at = b.id + " câu " + (i + 1);
    if (!q || typeof q !== "object") { err(at, "không phải câu hỏi"); return; }
    const want = TRUONG_CAU[q.type];
    if (!want) { err(at, `dạng câu "${q.type}" không có (mc, fill, tf)`); return; }
    count[q.type]++;
    const extra = Object.keys(q).filter((k) => !want.includes(k)), miss = want.filter((k) => !(k in q));
    if (extra.length) err(at, "trường lạ: " + extra.join(", "));
    if (miss.length) err(at, "thiếu: " + miss.join(", "));
    if (!text(q.q)) err(at, "thiếu câu hỏi");
    if (!text(q.topic)) err(at, "thiếu chủ đề");
    if (!text(q.x)) err(at, "thiếu lời giải");
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
    } else if (typeof q.a !== "boolean") err(at, "đúng/sai cần a: true hoặc false");
    if (seen.has(key)) err(at, "trùng với " + seen.get(key));
    else seen.set(key, at);
  });
});

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

const total = count.mc + count.fill + count.tf;
console.log(`${catalog.length} đề, ${files.length} file câu hỏi, ${total} câu (${count.mc} trắc nghiệm, ${count.fill} điền khuyết, ${count.tf} đúng/sai).`);
if (loose.length) console.log("Đề chưa gắn kì thi nào (vẫn hiện ở nhóm “Bài ôn khác”): " + loose.join(", "));
if (bad.length) { console.error(bad.join("\n")); console.error(`DE FAILED: ${bad.length} lỗi`); process.exitCode = 1; } else console.log("DE OK");
