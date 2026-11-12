/* Tìm cụm chữ trong mọi đề có sẵn và trong chữ OCR của sách (tests/README.md, mục 1). Không phân biệt dấu, hoa thường, dấu câu.
   Dùng trước khi viết câu: đáp án, chi tiết định dùng đã có ở câu nào chưa (cả lời giải, đoạn đọc, lời dặn của đề), sách ghi ở trang nào.
   node tests/tim.js "<cụm chữ>" ["<cụm khác>" …] [--kho <file câu hỏi | tiền tố mã đề>] [--sach <phần đường dẫn cuốn>]
                     [--chu-de "<chữ trong tên chủ đề>"] [--chi-kho | --chi-sach] [--het]
     --kho: chỉ tìm trong các đề đó (mặc định mọi đề); --sach: chỉ tìm trong các cuốn có chữ đó trong đường dẫn (vd lich-su-12, lop-9/);
     --chu-de: đánh dấu ⚠ chỗ tìm thấy ở câu cùng chủ đề (đề “Ôn chủ đề” rút chung câu cùng chủ đề nên dễ lộ đáp án);
     --het: in hết chỗ tìm thấy (mặc định mỗi cụm 25 chỗ trong kho, 25 trang sách).
   Ví dụ: node tests/tim.js "Tuần lễ vàng" "Quỹ Độc lập" --kho 12-lichsu.js --sach lich-su-12 --chu-de "Hồ Chí Minh" */
"use strict";
const D = require("./de-chung.js");

const args = process.argv.slice(2), cum = [], opt = {};
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--kho" || a === "--sach" || a === "--chu-de") opt[a.slice(2)] = args[++i];
  else if (a.startsWith("--")) opt[a.slice(2)] = true;
  else cum.push(a);
}
if (!cum.length) { console.log("Cách dùng: node tests/tim.js \"<cụm chữ>\" [\"<cụm khác>\" …] [--kho <file|tiền tố>] [--sach <cuốn>] [--chu-de \"<chủ đề>\"] [--chi-kho|--chi-sach] [--het]"); process.exit(0); }
const MAX = opt.het ? Infinity : 25, cd = opt["chu-de"] ? D.boDau(opt["chu-de"]) : null;
const gon = (s) => s.replace(/\s+/g, " ");

let cau = [], noteDe = [];
if (!opt["chi-sach"]) {
  const de = D.chonDe(opt.kho);
  cau = D.cacCau(de);
  noteDe = de.filter((b) => b.note).map((b) => ({ ma: b.id, chu: b.note }));
}
const cuon = opt["chi-kho"] ? [] : D.cacCuon(opt.sach);
if (!opt["chi-kho"] && !D.coSach()) console.log("(Không có ../OnUp-Book: chỉ tìm trong kho.)");

cum.forEach((c) => {
  const n = D.boDau(c), nn = " " + n + " ";
  console.log(`\n=== “${c}”`);
  // trong kho: từng trường chữ của câu, đoạn đọc (một lần mỗi đoạn), lời dặn của đề
  const thay = [], doanXong = new Set();
  const thu = (nhan, chu, cung) => { if (!(" " + D.boDau(chu) + " ").includes(nn)) return; D.timCum(chu, c).forEach((s) => thay.push({ nhan, s, cung })); };
  cau.forEach(({ b, q, ma }) => {
    const cung = cd != null && D.boDau(q.topic).includes(cd);
    D.truongCau(q).forEach(([k, v]) => thu(`${ma} [${q.topic}] ${k}`, v, cung));
    const d = D.doanCua(b, q), kd = b.id + "/" + q.p;
    if (d && !doanXong.has(kd)) { doanXong.add(kd); thu(`${b.id} đoạn ${q.p} [${q.topic}]`, (d.title || "") + " " + (d.text || ""), cung); }
  });
  noteDe.forEach(({ ma, chu }) => thu(`${ma} lời dặn`, chu, false));
  if (!opt["chi-sach"]) {
    const soCung = thay.filter((x) => x.cung).length;
    console.log(`Kho: ${thay.length} chỗ` + (cd != null ? `, ${soCung} chỗ ở câu cùng chủ đề` : ""));
    thay.sort((a, b) => b.cung - a.cung).slice(0, MAX).forEach((x) => console.log(`  ${x.cung ? "⚠ " : ""}${x.nhan}: ${gon(x.s)}`));
    if (thay.length > MAX) console.log(`  … còn ${thay.length - MAX} chỗ (--het để in hết)`);
  }
  // trong sách: lọc trang bằng chữ đã bỏ dấu (đệm), chỉ đọc chữ gốc của cuốn có trang khớp
  if (cuon.length) {
    let so = 0;
    const dong = [];
    cuon.forEach((cu) => {
      const tb = D.trangBoDau(cu), khop = [];
      tb.forEach((t, i) => { if ((" " + t.t + " ").includes(nn)) khop.push(i); });
      if (!khop.length) return;
      const tr = D.trangCua(cu);
      khop.forEach((i) => {
        so++;
        if (dong.length >= MAX) return;
        const p = tr[i], s = D.timCum(p.chu, c, 60)[0] || "";
        dong.push(`  ${cu.id} · ${p.nhan} (${p.anh}): ${gon(s)}`);
      });
    });
    console.log(`Sách: ${so} trang` + (cuon.length < D.cacCuon().length ? ` (${cuon.length} cuốn)` : ""));
    dong.forEach((l) => console.log(l));
    if (so > MAX) console.log(`  … còn ${so - MAX} trang (--het để in hết)`);
  }
});
