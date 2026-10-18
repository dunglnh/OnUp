/* Nạp đề có sẵn trong node, không cần trình duyệt: danh mục data/banks/index.js và mọi file câu hỏi data/banks/<file>.
   napDe() → danh sách đề như app thấy sau khi tải câu hỏi: {id, title, grade, subject, minutes, n, file, note, questions};
   đề ngẫu nhiên (có pool) có questions là cả kho câu đã gộp (mỗi câu kèm src), như Store.loadBank trong js/store.js.
   Dùng ở tests/toan4-gk2.js, tests/so-bo-cham.js, supabase/banks-to-sql.js. */
"use strict";
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.join(__dirname, "..");
function napDe() {
  const ctx = vm.createContext({ window: {}, localStorage: null, sessionStorage: null, document: null });
  const run = (f) => vm.runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
  run("data/banks/index.js"); run("js/store.js");
  const banks = ctx.window.ONTAP_SEED_BANKS.map((b) => Object.assign({}, b));
  const files = [...new Set(banks.map((b) => b.file))];
  files.forEach((f) => run("data/banks/" + f));
  files.forEach((f) => ctx.window.Store._fillSeedFile(f, banks, ctx.window.ONTAP_SEED_QUESTIONS || {}));
  return banks;
}
module.exports = { napDe };
