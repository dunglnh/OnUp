/* Chuyển các đề có sẵn trong data/banks/ (danh mục index.js và các file câu hỏi) thành lệnh SQL chèn vào bảng paid_banks (supabase/schema.sql).
   Chạy:  node supabase/banks-to-sql.js > paid-banks.sql   rồi dán nội dung file vào Supabase → SQL Editor → Run.

   - exam: mã kì thi trong data/calendar-2026-2027.js có gắn đề đó (ví dụ "ck1-l4"); không gắn kì nào thì để trống.
   - free_trial: đề số 1 của mỗi môn ở mỗi kì (số đề lấy từ đuôi "-de<số>" của mã; mã không có số thì đề đứng đầu
     nhóm môn đó trong danh mục là đề thử).
   - published: đăng ngay.
   Chạy lại nhiều lần được: đề đã có thì cập nhật nội dung, GIỮ NGUYÊN free_trial và published chủ app đã chỉnh. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { napDe } = require("../tests/nap-de.js");

const ROOT = path.join(__dirname, "..");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(ROOT, "data/calendar-2026-2027.js"), "utf8"), ctx, { filename: "data/calendar-2026-2027.js" });
const events = ctx.window.ONTAP_SEED_EVENTS || [];
const banks = napDe();

const lit = (v) => (v == null ? "null" : typeof v === "number" ? String(v) : typeof v === "boolean" ? String(v) : "'" + String(v).replace(/'/g, "''") + "'");
const numberOf = (id) => { const m = /-de(\d+)$/.exec(id); return m ? +m[1] : null; };

function rows() {
  const firstInGroup = new Set();
  return banks.map((b, i) => {
    if (!/^[a-z0-9][a-z0-9-]{0,79}$/.test(b.id || "")) throw new Error("Mã đề không hợp lệ: " + b.id);
    if (!Array.isArray(b.questions) || !b.questions.length) throw new Error("Đề không có câu hỏi: " + b.id);
    if (!(b.grade >= 1 && b.grade <= 12)) throw new Error("Khối không hợp lệ: " + b.id);
    const ev = events.find((e) => (e.banks || []).includes(b.id));
    const exam = ev ? ev.id : "";
    const group = [exam, b.grade, b.subject || ""].join("|");
    const n = numberOf(b.id);
    const trial = n != null ? n === 1 : !firstInGroup.has(group);
    firstInGroup.add(group);
    return { id: b.id, title: b.title, grade: b.grade, subject: b.subject || "", exam, minutes: b.minutes || 0, note: b.note || "",
      questions: JSON.stringify(b.questions), free_trial: trial, published: true, sort: i + 1 };
  });
}

function toSql() {
  const list = rows();
  const cols = ["id", "title", "grade", "subject", "exam", "minutes", "note", "questions", "free_trial", "published", "sort"];
  const values = list.map((r) => "(" + cols.map((c) => (c === "questions" ? lit(r[c]) + "::jsonb" : lit(r[c]))).join(", ") + ")");
  return [
    `-- Sinh bằng: node supabase/banks-to-sql.js (${list.length} đề từ data/banks/, ${list.filter((r) => r.free_trial).length} đề thử). Không sửa tay.`,
    `insert into paid_banks (${cols.join(", ")}) values`,
    values.join(",\n"),
    "on conflict (id) do update set title = excluded.title, grade = excluded.grade, subject = excluded.subject, exam = excluded.exam,",
    "  minutes = excluded.minutes, note = excluded.note, questions = excluded.questions, sort = excluded.sort;",
    ""
  ].join("\n");
}

module.exports = { rows, toSql };
if (require.main === module) process.stdout.write(toSql());
