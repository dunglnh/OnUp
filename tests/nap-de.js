/* Nạp đề có sẵn trong node, không cần trình duyệt: danh mục data/banks/index.js và mọi file câu hỏi data/banks/<file>.
   napDe() → danh sách đề như app thấy sau khi tải câu hỏi: {id, title, grade, subject, minutes, n, file, note, questions};
   đề ngẫu nhiên (có pool) có questions là cả kho câu đã gộp (mỗi câu kèm src), như Store.loadBank trong js/store.js.
   Dùng ở tests/toan4-gk2.js, tests/so-bo-cham.js, supabase/banks-to-sql.js.
   Danh mục chủ đề (Phiên UX23a): chuDe(kho, Quiz) đếm, khoiChuDe(o) viết khối window.ONTAP_SEED_TOPICS cuối data/banks/index.js
   (tests/ghep-de.js ghi, tests/kiem-tra-de.js kiểm; xem chú thích của khối). */
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
// js/quiz.js chạy trong node (như tests/kiem-tra-de.js): Quiz.topicBank, Quiz.key… của chính app
function napQuiz() {
  const ctx = vm.createContext({ window: {} });
  vm.runInContext(fs.readFileSync(path.join(ROOT, "js/quiz.js"), "utf8"), ctx, { filename: "js/quiz.js" });
  return ctx.window.Quiz;
}

/* ---------- danh mục chủ đề (Phiên UX23a) ----------
   chuDe(kho, Quiz) → { "<file>": [[chủ đề, số câu, "mã kì"], …] }, file theo khối rồi tên file:
   - chủ đề theo thứ tự gặp (đề theo thứ tự danh mục, câu theo thứ tự trong đề; đề ngẫu nhiên chỉ câu riêng), đã gộp khoảng trắng như
     topicKey của js/app.js; chỉ chủ đề có câu chấm tự động (chủ đề toàn câu tự luận không có);
   - số câu: số câu đề "Ôn chủ đề" rút được (Quiz.topicBank với mọi đề của file: bỏ tự luận, câu trùng theo Quiz.key, đề ngẫu nhiên chỉ
     góp câu riêng), như renderTopic của js/app.js;
   - mã kì: các kì có câu (không phải tự luận) của chủ đề, lấy từ mã đề (gk1, ck1, gk2, ck2, vao10, tn; theo thứ tự đó, ngăn bằng dấu
     cách); đề không có mã kì (đề thử nghiệm) không góp mã. */
const KI_CHU_DE = ["gk1", "ck1", "gk2", "ck2", "vao10", "tn"];
const kiCuaDe = (id) => { const m = /-(gk1|ck1|gk2|ck2|vao10|tn)-/.exec(String(id) + "-"); return m ? m[1] : ""; };
const gopChuDe = (t) => String(t == null ? "" : t).normalize("NFC").replace(/\s+/g, " ").trim();
function chuDe(kho, Quiz) {
  Quiz = Quiz || napQuiz();
  const files = [...new Set(kho.map((b) => b.file))].sort((a, b) => parseInt(a, 10) - parseInt(b, 10) || (a < b ? -1 : a > b ? 1 : 0));
  const ra = {};
  files.forEach((f) => {
    const srcs = kho.filter((b) => b.file === f), thuTu = [], ki = new Map();
    srcs.forEach((b) => (b.questions || []).forEach((q) => {
      if (!q || q.type === "essay" || (b.pool && (q.src || b.id) !== b.id)) return;
      const t = gopChuDe(q.topic);
      if (!t) return;
      if (!ki.has(t)) { ki.set(t, new Set()); thuTu.push(t); }
      const k = kiCuaDe(b.id);
      if (k) ki.get(t).add(k);
    }));
    ra[f] = thuTu.map((t) => [t, Quiz.topicBank(srcs, t, { id: "chu-de" }).questions.length, KI_CHU_DE.filter((k) => ki.get(t).has(k)).join(" ")]);
  });
  return ra;
}
// đầu khối: dòng chú thích đầu tiên là dấu để tests/ghep-de.js tìm khối mà ghi lại (từ dấu đó đến hết file)
const DAU_KHOI = "/* Danh mục chủ đề (Phiên UX23a), do tests/ghep-de.js ghi, không sửa tay.";
function khoiChuDe(o) {
  const tep = Object.entries(o).map(([f, l]) => {
    const muc = l.map(([t, n, k]) => "[" + JSON.stringify(t) + ", " + n + ", " + JSON.stringify(k) + "]"), dong = [];
    let cur = "";
    muc.forEach((x, i) => { const s = x + (i < muc.length - 1 ? "," : ""); if (cur && (cur + " " + s).length > 140) { dong.push(cur); cur = s; } else cur += (cur ? " " : "") + s; });
    if (cur) dong.push(cur);
    return "  " + JSON.stringify(f) + ": [" + (dong.length ? "\n    " + dong.join("\n    ") + "\n  " : "") + "]";
  });
  return `${DAU_KHOI} Ghép đề (node tests/ghep-de.js <nháp>) thì công cụ ghi lại khối này; chỉ
   ghi lại khối: node tests/ghep-de.js --chu-de. Tab Bài ôn (bên “Ôn theo chủ đề”, js/app.js) đọc khối này để biết chủ đề, số câu của
   mỗi kì mà không phải tải file câu hỏi. Mỗi file câu hỏi một danh sách [chủ đề, số câu, mã kì], theo thứ tự gặp (đề theo danh mục, câu
   trong đề; đề ngẫu nhiên chỉ câu riêng): chủ đề đã gộp khoảng trắng; số câu chấm tự động không trùng mà đề “Ôn chủ đề” rút được
   (Quiz.topicBank: bỏ tự luận, đề ngẫu nhiên chỉ góp câu riêng); mã các kì có câu của chủ đề (gk1, ck1, gk2, ck2, vao10, tn, lấy từ
   mã đề). Chủ đề toàn câu tự luận không có. tests/kiem-tra-de.js đếm lại và báo lỗi khi khối khác số đếm (tests/nap-de.js, chuDe). */
window.ONTAP_SEED_TOPICS = {
${tep.join(",\n")}
};
`;
}
// chữ mới của data/banks/index.js: thay khối danh mục chủ đề (từ dấu đầu khối đến hết file), chưa có thì thêm vào cuối
function ghiKhoiChuDe(chu, o) {
  const i = chu.indexOf(DAU_KHOI), dau = i >= 0 ? chu.slice(0, i) : chu.replace(/\s*$/, "\n\n");
  return dau + khoiChuDe(o);
}
module.exports = { napDe, napQuiz, chuDe, khoiChuDe, ghiKhoiChuDe, kiCuaDe, gopChuDe, KI_CHU_DE, DAU_KHOI };
