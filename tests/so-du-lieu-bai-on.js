/* So phần dữ liệu câu hỏi của 4 bài ôn dạng trang (modules/<mã>/index.html) giữa một commit và bản đang có trong thư mục làm việc
   (Phiên 9o: sửa phần làm bài, không đổi dữ liệu câu, id của bài, thứ tự câu trong items). Chạy: node tests/so-du-lieu-bai-on.js [commit]
   (mặc định origin/main). Phần dữ liệu: l4, l6 từ đầu script chính đến dòng "const SUBJ={};" (APP: môn, bài, items, gen); IOE từ đầu script
   chính đến "/* ================= Test plan" (UNITS, các ngân hàng câu). In "DU LIEU BAI ON OK" khi 4 phần giống hệt. */
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path");
const ROOT = path.join(__dirname, "..");
const ref = process.argv[2] || "origin/main";
const MODS = { "l4-giua-ki-1": "const SUBJ={};", "l6-giua-ki-1": "const SUBJ={};", "ioe-4": "/* ================= Test plan", "ioe-6": "/* ================= Test plan" };
const dataOf = (src, end) => { const a = src.indexOf('<script src="../../js/bridge.js"></script>'), b = src.indexOf(end, a); if (a < 0 || b < 0) throw new Error("không thấy mốc " + end); return src.slice(a, b); };
let bad = 0;
for (const [m, end] of Object.entries(MODS)) {
  const file = `modules/${m}/index.html`;
  const old = execFileSync("git", ["show", `${ref}:${file}`], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 });
  const now = fs.readFileSync(path.join(ROOT, file), "utf8");
  const a = dataOf(old, end), b = dataOf(now, end);
  if (a === b) console.log(`${m}: dữ liệu không đổi (${a.length} kí tự)`);
  else { bad++; const i = [...a].findIndex((ch, k) => ch !== b[k]); console.log(`${m}: KHÁC từ kí tự ${i}: "${a.slice(i, i + 60)}" → "${b.slice(i, i + 60)}"`); }
}
if (bad) { console.error("DU LIEU BAI ON KHAC"); process.exitCode = 1; } else console.log("DU LIEU BAI ON OK");
