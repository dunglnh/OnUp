/* Nạp đề có sẵn trong node, không cần trình duyệt: danh mục data/banks/index.js và mọi file câu hỏi data/banks/<file>.
   napDe() → danh sách đề như app thấy sau khi tải câu hỏi: {id, title, grade, subject, minutes, n, file, note, questions}.
   Dùng ở tests/toan4-gk2.js, tests/so-bo-cham.js, supabase/banks-to-sql.js. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
function napDe() {
  const ctx = vm.createContext({ window: {} });
  const run = (f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
  run("data/banks/index.js");
  const banks = ctx.window.ONTAP_SEED_BANKS;
  new Set(banks.map((b) => b.file)).forEach((f) => run("data/banks/" + f));
  const qs = ctx.window.ONTAP_SEED_QUESTIONS || {};
  return banks.map((b) => Object.assign({}, b, qs[b.id]));
}
module.exports = { napDe };
