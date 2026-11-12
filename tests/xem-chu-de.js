/* Xem các câu đã có trước khi viết câu mới (tests/README.md, mục 1).
   node tests/xem-chu-de.js <file câu hỏi | tiền tố mã đề>
     → bảng chủ đề: số câu, số câu từng mức (Biết/Hiểu/Vận dụng), dạng câu, số đề có chủ đề đó. Chủ đề ít câu là chỗ còn trống.
   node tests/xem-chu-de.js <file | tiền tố> "<chữ trong tên chủ đề>" [--day] [--giai] [--doan]
     → mọi câu của các chủ đề có chữ đó (không phân biệt dấu): mã câu, mức, dạng, đề bài, đáp án;
       --giai thêm lời giải (chỗ hay lộ đáp án nhất), --doan thêm đoạn đọc, --day in đủ chữ (mặc định cắt ở 200 kí tự).
   Ví dụ: node tests/xem-chu-de.js 12-lichsu.js
          node tests/xem-chu-de.js 12-lichsu.js "Liên hợp quốc" --giai */
"use strict";
const D = require("./de-chung.js");

const args = process.argv.slice(2), co = (f) => args.includes(f), tham = args.filter((a) => !a.startsWith("--"));
if (!tham.length) {
  console.log("Cách dùng: node tests/xem-chu-de.js <file câu hỏi | tiền tố mã đề> [\"chữ trong tên chủ đề\"] [--giai] [--doan] [--day]");
  console.log("File câu hỏi: " + D.fileCauHoi().join(", "));
  process.exit(0);
}
const de = D.chonDe(tham[0]);
if (!de.length) { console.error("Không có đề nào theo “" + tham[0] + "” (tên file trong data/banks/ hoặc tiền tố mã đề)."); process.exit(1); }
const cau = D.cacCau(de), cat = (s) => (co("--day") || s.length <= 200 ? s : s.slice(0, 197) + "…");
const MUC = { 1: "B", 2: "H", 3: "V" };

if (tham.length < 2) {
  // bảng chủ đề theo thứ tự gặp lần đầu (thường theo thứ tự bài)
  const cd = new Map();
  cau.forEach(({ b, q }) => {
    if (!cd.has(q.topic)) cd.set(q.topic, { n: 0, lv: { 1: 0, 2: 0, 3: 0, "?": 0 }, dang: {}, de: new Set() });
    const c = cd.get(q.topic); c.n++; c.lv[q.lv in c.lv ? q.lv : "?"]++; c.dang[q.type] = (c.dang[q.type] || 0) + 1; c.de.add(b.id);
  });
  console.log(`${de.length} đề, ${cau.length} câu, ${cd.size} chủ đề (${de.map((b) => b.id).join(", ")})\n`);
  console.log("  Câu  B/H/V     Đề  Dạng câu                          Chủ đề");
  [...cd].forEach(([t, c]) => {
    const lv = `${c.lv[1]}/${c.lv[2]}/${c.lv[3]}` + (c.lv["?"] ? "+" + c.lv["?"] : "");
    const dang = Object.entries(c.dang).map(([k, v]) => k + " " + v).join(", ");
    console.log(`${String(c.n).padStart(5)}  ${lv.padEnd(9)} ${String(c.de.size).padStart(3)}  ${dang.padEnd(33)} ${t}`);
  });
  console.log("\nXem câu của một chủ đề: node tests/xem-chu-de.js " + tham[0] + " \"<chữ trong tên chủ đề>\" --giai");
  process.exit(0);
}

const tim = D.boDau(tham[1]);
const ds = cau.filter(({ q }) => D.boDau(q.topic).includes(tim));
if (!ds.length) { console.log("Không có câu nào có chủ đề chứa “" + tham[1] + "”."); process.exit(0); }
const theoCd = new Map();
ds.forEach((e) => { if (!theoCd.has(e.q.topic)) theoCd.set(e.q.topic, []); theoCd.get(e.q.topic).push(e); });
const daIn = new Set();
theoCd.forEach((ls, t) => {
  console.log(`\n=== ${t} · ${ls.length} câu`);
  ls.forEach(({ b, q, ma }) => {
    const d = D.doanCua(b, q);
    if (co("--doan") && d && !daIn.has(b.id + "/" + q.p)) {
      daIn.add(b.id + "/" + q.p);
      console.log(`  [đoạn ${b.id}/${q.p}] ${d.title || ""}\n    ${cat(String(d.text || "").replace(/\s+/g, " "))}`);
    }
    console.log(`- ${ma} · ${MUC[q.lv] || "?"} · ${q.type}${q.p ? " · đoạn " + q.p : ""}: ${cat(String(q.q).replace(/\s+/g, " "))}`);
    if (q.type === "mc") console.log("    → " + q.o[0] + (co("--day") ? "   (sai: " + q.o.slice(1).join(" | ") + ")" : ""));
    else if (q.type === "tf4") q.o.forEach((o, i) => console.log(`    ${q.a[i] ? "Đ" : "S"} ${cat(o)}`));
    else if (q.type === "tf") console.log("    → " + (q.a ? "Đúng" : "Sai"));
    else if (q.type === "fill") console.log("    → " + [].concat(q.ans || []).join(" | "));
    else if (q.type === "num") console.log("    → " + q.ans + (q.unit ? " " + q.unit : "") + (q.tol ? " (±" + q.tol + ")" : ""));
    else if (q.type === "match") console.log("    → " + q.l.map((l, i) => l + " – " + q.r[i]).join("; "));
    else if (q.type === "order") console.log("    → " + q.o.join(" → "));
    else if (q.type === "essay") console.log("    → (tự luận) " + (q.rubric || []).map((r) => r.c).join("; ").slice(0, 200));
    if (co("--giai") && q.x) console.log("    x: " + cat(String(q.x).replace(/\s+/g, " ")));
  });
});
