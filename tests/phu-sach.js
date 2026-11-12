/* Độ phủ sách: bài nào, trang nào của sách các đề đã dùng ít (tests/README.md, mục 1). Chọn kiến thức ở chỗ ít được hỏi thì câu mới
   ít trùng câu cũ, ít lộ đáp án, khỏi phải viết lại nhiều lần (Rút ra N12-tn-lichsu-b ở mục 3.5 của docs/KE-HOACH-NOI-DUNG.md).
   node tests/phu-sach.js <cuốn: phần đường dẫn, vd "lop-12/lich-su-12"> [<file câu hỏi | tiền tố mã đề> …] [--trang] [--k 3] [--it 15]
   node tests/phu-sach.js <cuốn> --doc <số trang in | page-NNN>   → in chữ OCR của một trang (đọc nhanh, khỏi grep, sed)
     Đo theo chuỗi k từ (mặc định 3) sau khi bỏ dấu: một trang có bao nhiêu chuỗi riêng của trang (bỏ chuỗi gặp ở hơn 5% số trang của
     cuốn, như “nào sau đây”, “của Việt Nam”), bao nhiêu chuỗi đó có trong chữ của các đề (đề bài, lựa chọn, lời giải, đoạn đọc, lời dặn).
     Không ghi đề: so với mọi đề có sẵn. In độ phủ từng bài (theo mục lục trong README của cuốn), rồi các trang nhiều chữ mà ít được dùng
     nhất (--it N: số trang, mặc định 15); --trang in độ phủ từng trang của mỗi bài. Trang có ô “Em có biết?” ghi dấu ★.
   Độ phủ thấp chưa chắc là thiếu câu (trang ảnh, bài tập, hoạt động), nhưng là chỗ nên đọc trước khi chọn kiến thức cho câu mới.
   Ví dụ: node tests/phu-sach.js lop-12/lich-su-12 12-lichsu.js --it 20
          node tests/phu-sach.js lop-12/lich-su-12 --doc 107 */
"use strict";
const D = require("./de-chung.js");

const args = process.argv.slice(2), tham = [], opt = { k: 3, it: 15 };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--k" || a === "--it") opt[a.slice(2)] = parseInt(args[++i], 10);
  else if (a === "--doc") opt.doc = args[++i];
  else if (a.startsWith("--")) opt[a.slice(2)] = true;
  else tham.push(a);
}
if (!tham.length) { console.log("Cách dùng: node tests/phu-sach.js <cuốn> [<file câu hỏi | tiền tố mã đề> …] [--trang] [--k 3] [--it 15]"); process.exit(0); }
if (!D.coSach()) { console.error("Không có ../OnUp-Book (xem mục 4 của docs/KE-HOACH-NOI-DUNG.md, đoạn “Sách đã tải sẵn”)."); process.exit(1); }
const ds = D.cacCuon(tham[0]);
if (ds.length !== 1) { console.error(ds.length ? "Nhiều cuốn khớp: " + ds.map((c) => c.id).join(", ") : "Không có cuốn nào khớp “" + tham[0] + "”."); process.exit(1); }
const cuon = ds[0], K = opt.k;
if (opt.doc) {
  const p = D.trangCua(cuon).find((x) => x.anh === opt.doc || x.trang === String(opt.doc).replace(/^trang\s*/, ""));
  if (!p) { console.error("Không có trang “" + opt.doc + "” trong " + cuon.id + "."); process.exit(1); }
  console.log(`=== ${cuon.id} · ${p.nhan} (${p.anh}; ảnh: ${require("path").relative(D.ROOT, cuon.chu.replace(/chu\.txt$/, "anh/" + p.anh + ".jpg"))})\n` + p.chu.trim());
  process.exit(0);
}

// chữ của các đề đã chọn
const de = tham.length > 1 ? [...new Set(tham.slice(1).flatMap((t) => D.chonDe(t)))] : D.kho();
const kd = new Set(), doanXong = new Set();
const them = (s) => D.chuoiTu(D.tuChuan(s), K, 2).forEach((c) => kd.add(c));
D.cacCau(de).forEach(({ b, q }) => {
  D.chuCau(q).forEach(them);
  const d = D.doanCua(b, q);
  if (d && !doanXong.has(b.id + "/" + q.p)) { doanXong.add(b.id + "/" + q.p); them((d.title || "") + " " + (d.text || "")); }
});
de.forEach((b) => b.note && them(b.note));

// chuỗi của từng trang, bỏ chuỗi chung của cuốn
const tr = D.trangCua(cuon), tb = D.trangBoDau(cuon);
const tap = tb.map((t) => new Set(D.chuoiTu(t.t.split(" ").filter(Boolean), K, 2)));
const soTrang = new Map();
tap.forEach((s) => s.forEach((c) => soTrang.set(c, (soTrang.get(c) || 0) + 1)));
const tran = Math.max(3, Math.ceil(0.05 * tr.length));
const ml = D.mucLuc(cuon), it = 25;
const trang = tr.map((p, i) => {
  const s = [...tap[i]].filter((c) => soTrang.get(c) <= tran), m = s.filter((c) => kd.has(c)).length;
  const dau = (p.chu.split("\n").map((l) => l.trim()).find((l) => /\p{L}{3}/u.test(l)) || "").slice(0, 70);
  return { p, n: s.length, m, bai: D.baiCua(ml, p.trang ? parseInt(p.trang, 10) : null) || "(trước bài đầu)", em: / em co biet /.test(" " + tb[i].t + " "), dau };
});
const pt = (m, n) => (n ? Math.round((100 * m) / n) : 0);

console.log(`${cuon.id}: ${tr.length} trang, so với ${de.length} đề (${D.cacCau(de).length} câu); chuỗi ${K} từ, bỏ chuỗi gặp ở hơn ${tran} trang.\n`);
console.log("Phủ  Chữ dùng/chữ riêng  Trang      Bài");
const theoBai = new Map();
trang.forEach((t) => { if (!theoBai.has(t.bai)) theoBai.set(t.bai, []); theoBai.get(t.bai).push(t); });
theoBai.forEach((ls, bai) => {
  const n = ls.reduce((a, t) => a + t.n, 0), m = ls.reduce((a, t) => a + t.m, 0);
  const so = ls.map((t) => t.p.trang).filter(Boolean), tu = so[0], den = so[so.length - 1];
  if (n < it) return;
  console.log(`${String(pt(m, n)).padStart(3)}%  ${(m + "/" + n).padEnd(18)} ${(tu ? (tu === den ? tu : tu + "–" + den) : "").padEnd(10)} ${bai}`);
  if (opt.trang) ls.filter((t) => t.n >= it).forEach((t) => console.log(`        ${String(pt(t.m, t.n)).padStart(3)}%  trang in ${t.p.trang || "?"} (${t.p.anh})${t.em ? " ★" : ""}: ${t.dau}`));
});
console.log(`\nCác trang nhiều chữ mà ít được dùng nhất (★: có ô “Em có biết?”):`);
const ngoaiBai = /trước bài đầu|lời nói đầu|hướng dẫn sử dụng|bảng (tra cứu|phiên âm|giải thích)|mục lục|giải thích thuật ngữ|glossary|wordlist|book map/i;
trang.filter((t) => t.n >= 60 && !ngoaiBai.test(t.bai)).sort((a, b) => a.m / a.n - b.m / b.n || b.n - a.n).slice(0, opt.it)
  .forEach((t) => console.log(`${String(pt(t.m, t.n)).padStart(3)}%  trang in ${t.p.trang || "?"} (${t.p.anh})${t.em ? " ★" : ""} · ${t.bai}: ${t.dau}`));
console.log(`\nĐọc một trang: node tests/phu-sach.js ${cuon.id} --doc <số trang in>; tìm cụm chữ: node tests/tim.js "<cụm chữ>" --sach ${cuon.id}`);
