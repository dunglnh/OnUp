/* Kiểm tra phần dữ liệu của bài ôn modules/l4-giua-ki-1 (Phiên 9p, L40, L41: Toán Bài 1–19, Tiếng Việt tuần 1–8 theo sách in năm 2026).
   Chạy: node tests/bai-on-l4.js [commit] (mặc định origin/main). In "BAI ON L4 OK" khi đạt.
   1. So với commit: cùng bài (id, thứ tự), cùng số câu; mỗi câu cùng bài (l), cùng dạng câu (trắc nghiệm cùng số lựa chọn, đúng/sai, điền,
      câu sinh ngẫu nhiên cùng hàm, bài đọc cùng số câu); 4 mục Viết cùng tên, cùng thứ tự, bảng kiểm 5 dòng. Kết quả theo bài (lres) lưu theo
      id bài, “Ôn câu sai” theo số thứ tự câu, bản nháp, ô đã tích của phần Viết theo số thứ tự mục (CLAUDE.md, hợp đồng với bài ôn).
      CHI_TIET=1 in thêm các câu, Ghi nhớ, mục Viết khác với commit.
   2. Toán: tính lại đáp án các câu cố định (đáp án điền, lựa chọn đúng, đúng/sai); mọi phép tính “… = …” trong đề và lời giải (câu cố định
      và 3 000 lần mỗi hàm sinh câu) tính đúng; câu Bài 2, Bài 5 đặt tính có nhớ không quá hai lượt, không liên tiếp (Rút ra N23);
      perim, step3: đáp án tính lại từ số trong đề, đề perim không ghi sẵn công thức chu vi, step3 không còn hai bối cảnh gần sách.
   3. Nội dung L40, L41 (mục 2 của docs/SUA-LOI-CHAY-THU.md, “Phiên 9p”, Xong khi).
   DO_LO=1 in thêm chỗ đáp án của một câu cố định có trong đề, lựa chọn, lời giải, đoạn đọc của câu cố định khác cùng môn (Rút ra N5);
   người làm xem từng chỗ (chữ chỉ loại như “góc tù”, số nhỏ trùng nhau thì không phải lộ đáp án). */
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, ".."), FILE = "modules/l4-giua-ki-1/index.html";
const ref = process.argv[2] || "origin/main";
const load = (src) => {
  const a = src.indexOf('<script src="../../js/bridge.js"></script>'), s = src.indexOf("<script>", a) + 8, e = src.indexOf("</script>", s);
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(src.slice(s, e) + ";this.APP=APP;this.SUBJ=SUBJ;this.U=U;this.rng=rng;this.docSo=docSo;this.roman=roman;", ctx);
  return ctx;
};
const now = load(fs.readFileSync(path.join(ROOT, FILE), "utf8"));
const old = load(execFileSync("git", ["show", `${ref}:${FILE}`], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 }));
const errs = [], note = (m) => errs.push(m);
const kind = (it) => (it.rd ? `bài đọc ${it.qs.length} câu` : it.g ? `sinh câu ${it.g}` : it.o ? `trắc nghiệm ${it.o.length}` : it.tf !== undefined ? "đúng/sai" : "điền");
const flat = (s) => String(s).replace(/ /g, " ");

/* ---------- 1. cấu trúc ---------- */
for (const sb of now.APP.subjects) {
  const ob = old.APP.subjects.find((x) => x.id === sb.id);
  if (!ob) { note(`${sb.id}: không có ở ${ref}`); continue; }
  if (sb.lessons.map((l) => l.id).join() !== ob.lessons.map((l) => l.id).join()) note(`${sb.id}: bài khác ${ref}`);
  if (sb.items.length !== ob.items.length) note(`${sb.id}: ${sb.items.length} câu, ${ref} có ${ob.items.length}`);
  sb.items.forEach((it, i) => { const o = ob.items[i]; if (o && (it.l !== o.l || kind(it) !== kind(o))) note(`${sb.id} câu ${i}: ${it.l} ${kind(it)}, ${ref}: ${o.l} ${kind(o)}`); });
  const W = sb.writing || [], OW = ob.writing || [];
  if (W.length !== OW.length || W.some((w, i) => w.title !== OW[i].title || w.checklist.length !== 5)) note(`${sb.id}: mục Viết khác ${ref} (số mục, tên, bảng kiểm 5 dòng)`);
  if (process.env.CHI_TIET) {
    sb.lessons.forEach((l, i) => { if (JSON.stringify(l.notes) !== JSON.stringify(ob.lessons[i].notes)) console.log(`${sb.id} Ghi nhớ ${l.id}:`, l.notes.filter((n) => !ob.lessons[i].notes.includes(n))); });
    sb.items.forEach((it, i) => { if (JSON.stringify(it) !== JSON.stringify(ob.items[i])) console.log(`${sb.id} câu ${i} (${it.l}): ${(ob.items[i].q || ob.items[i].g || "").slice(0, 70)} → ${(it.q || it.g || "").slice(0, 90)}`); });
    W.forEach((w, i) => { if (JSON.stringify(w) !== JSON.stringify(OW[i])) console.log(`${sb.id} Viết ${i}: ${w.title}: ${w.prompt}`); });
  }
}

/* ---------- 2. Toán ---------- */
const { U, docSo, roman } = now, T = now.SUBJ.toan, fmt = (n) => flat(U.fmt(n)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
// phép tính "A = B = C" trong chữ: mỗi vế chỉ có số, + − × :, ngoặc thì phải bằng nhau (số ngăn hàng nghìn bằng khoảng trắng; ° bỏ đi;
// dấu chia viết " : ", dấu hai chấm liền chữ đứng trước như "a = 7:" là dấu câu)
const calc = (s) => { const e = s.replace(/(\d) (?=\d{3}(?!\d))/g, "$1").replace(/×/g, "*").replace(/:/g, "/").replace(/−/g, "-");
  return /^[\d\s+\-*/().]+$/.test(e) ? Function(`return (${e})`)() : NaN; };
const equations = (text, label) => {
  for (const seg of flat(text).replace(/°/g, "").replace(/(\S):/g, "$1;").match(/[\d(][\d\s+−×:()=]*[\d)]/g) || []) {
    if (!seg.includes("=")) continue;
    const sides = seg.split("=").map((x) => x.trim()).filter(Boolean), vals = sides.map(calc);
    if (sides.length < 2 || vals.some((v) => !Number.isFinite(v)) || vals.some((v) => Math.abs(v - vals[0]) > 1e-9)) note(`${label}: phép tính sai "${seg}"`);
  }
};
// lượt nhớ khi đặt tính (cộng, trừ; nhân với số có một chữ số), như tests/toan4-gk1.js: không quá hai lượt, không liên tiếp
const luotNho = (a, b, op) => {
  const A = String(a).split("").reverse().map(Number), B = String(b).split("").reverse().map(Number), out = [];
  let c = 0;
  if (op === "×") { A.forEach((d, i) => { c = Math.floor((d * b + c) / 10); if (c && i < A.length - 1) out.push(i); }); return out; }
  for (let i = 0; i < Math.max(A.length, B.length); i++) {
    const v = op === "+" ? (A[i] || 0) + (B[i] || 0) + c : (A[i] || 0) - (B[i] || 0) - c;
    c = op === "+" ? +(v >= 10) : +(v < 0); if (c) out.push(i);
  }
  return out;
};
const nho = (a, b, op, label) => { const l = luotNho(a, b, op); if (!(l.length <= 2 && l.every((v, k) => !k || v - l[k - 1] > 1))) note(`${label}: ${a} ${op} ${b} có nhớ ở các hàng ${l}`); };
const loai = (d) => (d < 90 ? "góc nhọn" : d === 90 ? "góc vuông" : d < 180 ? "góc tù" : "góc bẹt");
const distinctDigits = (n) => new Set(String(n)).size === String(n).length;
const range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
/* Đáp án tính lại của các câu cố định có số (tìm câu theo một đoạn chữ của đề): số là đáp án điền hoặc lựa chọn đúng (viết như trên màn hình),
   true/false là câu đúng/sai. Câu khái niệm (dụng cụ đo góc, cách đặt thước, góc bẹt khi mở vở, ước lượng) không có ở đây. */
const ANS = [
  ["Số lớn nhất có năm chữ số", fmt(Math.max(...range(10000, 99999)))],
  ["Số liền sau của 49 999", 49999 + 1],
  ["Số bé nhất có năm chữ số khác nhau", fmt(range(10000, 99999).find(distinctDigits))],
  ["36 000 − 4 500 × 3", 36000 - 4500 * 3],
  ["12 350 vé", 12350 + (12350 + 3070)],
  ["40 000 + 30 000 − 20 000", 40000 + 30000 - 20000],
  ["Số chẵn lớn nhất có bốn chữ số", fmt(range(1000, 9999).filter((n) => n % 2 === 0).pop())],
  ["Số lẻ bé nhất có năm chữ số", fmt(range(10000, 99999).find((n) => n % 2 === 1))],
  ["số lẻ lớn hơn 32 và bé hơn 35", (() => { const x = range(33, 34).filter((n) => n % 2); return x.length === 1 ? x[0] : NaN; })()],
  ["Lớp 4C có 26 bạn", 26 % 2 === 0],
  ["Với a = 8 và b = 5", 8 * 5 + 8],
  ["chiều dài 14 cm, chiều rộng 9 cm", (14 + 9) * 2],
  ["18 hàng ghế, mỗi hàng 9 ghế", 18 * 9 + 24 - 150],
  ["Góc vuông có số đo là", "90°"],
  ["mấy góc 60°", 180 / 60],
  ["lớn hơn số đo của góc vuông 30°", loai(90 + 30)],
  ["Góc có số đo 140° bé hơn góc vuông", 140 < 90],
  ["10 trăm nghìn bằng", fmt(10 * 100000)],
  ["Số 1 000 000 có bao nhiêu chữ số 0", String(1000000).split("").filter((d) => d === "0").length],
  ["Trong số 482 105, các chữ số thuộc lớp nghìn", String(Math.floor(482105 / 1000)).split("").join(", ")],
  ["bốn mươi triệu không trăm linh tám nghìn", fmt(40008000)],
  ["Số 205 000 000 đọc là", ((s) => s[0].toUpperCase() + s.slice(1))(docSo(205000000))],
  ["2 549 000 làm tròn", fmt(Math.round(2549000 / 100000) * 100000)],
  ["Số bé nhất trong các số 345 678", fmt(Math.min(345678, 345687, 345768, 354678))],
  ["bé hơn 4 như sau: 1; 2; 3", (() => { const x = range(0, 3).filter((n) => ![1, 2, 3].includes(n)); return x.length === 1 ? String(x[0]) : NaN; })()],
  ["Một tỉ (1 000 000 000) là số tự nhiên lớn nhất", false],
  ["từ 18 đến 56", range(18, 56).length],
  ["2 tấn khoai lang", `${2 * 10} tạ`],
  ["Tấm bìa có ___ ô vuông", (2 * 100 * 100) / (10 * 10)], // 2 m² = 20 000 cm², mỗi ô 10 cm × 10 cm
  ["Năm 2026 thuộc thế kỉ", roman(Math.ceil(2026 / 100))],
  ["1 phút 15 giây", 60 + 15],
];
for (const [key, want] of ANS) {
  const its = T.items.filter((it) => !it.g && flat(it.q).includes(key));
  if (its.length !== 1) { note(`Toán: ${its.length} câu có "${key}"`); continue; }
  const it = its[0], got = it.o ? it.o[it.a || 0] : it.tf !== undefined ? it.tf : it.ans;
  const ok = typeof want === "boolean" ? got === want : typeof want === "number" ? (it.o ? flat(got) === fmt(want) : String(got).split("|").map(Number).includes(want)) : flat(got) === String(want);
  if (!ok) note(`Toán "${key}": đáp án ${JSON.stringify(got)}, tính lại được ${JSON.stringify(want)}`);
}
// "Một tỉ … lớn nhất": số trong lời giải là số liền sau của một tỉ
if (!T.items.some((it) => it.tf === false && flat(it.x || "").includes(fmt(1e9 + 1)))) note("Toán: lời giải câu “Một tỉ … lớn nhất” không có số liền sau của một tỉ");
// "Số “bốn mươi triệu …” viết là": đọc lại các lựa chọn bằng docSo, chỉ lựa chọn đúng đọc đúng chữ trong đề
{ const it = T.items.find((x) => x.o && /bốn mươi triệu không trăm linh tám nghìn/.test(x.q)), reads = it ? it.o.map((o) => docSo(+flat(o).replace(/ /g, ""))) : [];
  if (reads.filter((r) => r === "bốn mươi triệu không trăm linh tám nghìn").length !== 1 || reads[0] !== "bốn mươi triệu không trăm linh tám nghìn") note("Toán: lựa chọn của câu “bốn mươi triệu …” đọc lại không khớp"); }
// trắc nghiệm: các lựa chọn khác nhau; số đo góc của câu "Bạn Hà đo một góc": chỉ lựa chọn đúng có °
T.items.forEach((it, i) => { if (it.o && new Set(it.o.map(flat)).size !== it.o.length) note(`Toán câu ${i}: lựa chọn trùng nhau`); });
{ const it = T.items.find((x) => x.o && /Bạn Hà đo một góc/.test(x.q)); if (!(it && it.o.filter((o) => o.endsWith("°")).length === 1 && it.o[0].endsWith("°"))) note("Toán: câu “Bạn Hà đo một góc” phải có đúng một lựa chọn là số đo góc"); }
// phép tính trong đề và lời giải của mọi câu cố định
T.items.forEach((it, i) => { if (!it.g) { equations(it.q, `Toán câu ${i}`); equations(it.x || "", `Toán câu ${i} lời giải`); } });
// Bài 2, Bài 5: phép tính đặt tính của câu cố định mới (Rút ra N23)
[[4500, 3, "×"], [36000, 13500, "−"], [12350, 3070, "+"], [12350, 15420, "+"], [18, 9, "×"], [162, 24, "+"], [186, 150, "−"]].forEach(([a, b, op]) => nho(a, b, op, "Toán Bài 2, Bài 5"));
// hàm sinh câu: phép tính trong đề và lời giải đúng, đáp án là số nguyên dương; perim, step3 tính lại từ số trong đề
const num = (s) => +flat(s).replace(/ /g, "");
const NUM = "(\\d{1,3}(?:[ \\u00a0]\\d{3})*|\\d+)";
const RE = {
  vuong: new RegExp(`cạnh a = ${NUM} cm`), cn: new RegExp(`chiều dài a = ${NUM} cm, chiều rộng b = ${NUM} cm`),
  ca: new RegExp(`thả ${NUM} con cá trắm\\. Số cá chép gấp ${NUM} lần số cá trắm\\. Số cá rô phi nhiều hơn số cá chép ${NUM} con`),
  vo: new RegExp(`Lớp 4A có ${NUM} bạn, lớp 4B có nhiều hơn lớp 4A ${NUM} bạn\\. Mỗi bạn được phát ${NUM} quyển vở`),
  sach: new RegExp(`Thư viện trường có ${NUM} quyển truyện\\. Thư viện mua thêm ${NUM} thùng truyện, mỗi thùng ${NUM} quyển\\. Cô thủ thư xếp đều tất cả số truyện vào ${NUM} giá sách`),
};
const kinds = { perim: new Set(), step3: new Set() };
for (const g of Object.keys(now.APP.gen)) for (let k = 0; k < 3000; k++) {
  const q = now.APP.gen[g](now.rng(`bai-on-l4|${g}|${k}`), U), lab = `sinh câu ${g} (lần ${k})`;
  equations(q.q, lab); equations(q.x || "", lab + " lời giải");
  if (q.ans !== undefined && !String(q.ans).split("|").every((a) => /^\d+$/.test(a) ? +a > 0 || g === "max" : true)) note(`${lab}: đáp án "${q.ans}"`);
  if (g === "perim") {
    let m, want;
    if ((m = RE.vuong.exec(q.q))) { want = num(m[1]) * 4; kinds.perim.add("vuông"); }
    else if ((m = RE.cn.exec(q.q))) { want = (num(m[1]) + num(m[2])) * 2; kinds.perim.add("chữ nhật"); }
    if (want === undefined || +q.ans !== want) note(`${lab}: đáp án ${q.ans}, tính lại ${want}: ${q.q}`);
    if (/P\s*=|×/.test(q.q)) note(`${lab}: đề ghi sẵn công thức chu vi: ${q.q}`);
  }
  if (g === "step3") {
    let m, want;
    if ((m = RE.ca.exec(q.q))) { const [a, k2, d] = m.slice(1).map(num); want = a + a * k2 + (a * k2 + d); kinds.step3.add("ao cá"); }
    else if ((m = RE.vo.exec(q.q))) { const [a, d, k2] = m.slice(1).map(num); want = (a + (a + d)) * k2; kinds.step3.add("phát vở"); }
    else if ((m = RE.sach.exec(q.q))) { const [a, b, c, k2] = m.slice(1).map(num); want = (a + b * c) / k2; kinds.step3.add("thư viện"); }
    if (want === undefined || !Number.isInteger(want) || +q.ans !== want) note(`${lab}: đáp án ${q.ans}, tính lại ${want}: ${q.q}`);
    if (/gạo|trả lại|đưa cô bán hàng/.test(q.q)) note(`${lab}: còn bối cảnh gần sách: ${q.q}`);
  }
}
if (kinds.perim.size !== 2 || kinds.step3.size !== 3) note(`hàm sinh câu: perim ra ${[...kinds.perim]}, step3 ra ${[...kinds.step3]}`);

/* ---------- 3. nội dung L40, L41 ---------- */
const TV = now.SUBJ.tv, all = (sb) => flat(JSON.stringify([sb.lessons, sb.items, sb.writing || []]));
const toanText = all(T), tvText = all(TV);
for (const [re, what] of [[/Tìm x/, "“Tìm x”"], [/Tổng của hai số lẻ/i, "“Tổng của hai số lẻ”"], [/mười triệu viết là/i, "“Số mười triệu viết là”"], [/Số liền sau hơn số liền trước/, "Ghi nhớ cũ của Bài 1"], [/Lúc [36] giờ/, "câu góc của hai kim đồng hồ lúc 3 giờ, 6 giờ"], [/con voi/, "câu con voi"], [/phòng học/, "câu diện tích phòng học"]]) if (re.test(toanText)) note(`Toán còn ${what}`);
if (/Nam Định/.test(tvText)) note("Tiếng Việt còn “Nam Định”");
const L = (sb, id) => sb.lessons.find((l) => l.id === id), has = (arr, re) => arr.some((n) => re.test(flat(n)));
if (!has(L(T, "b1").notes, /liền sau của một số thì lớn hơn số đó 1 đơn vị/)) note("Ghi nhớ Bài 1 chưa nói rõ số liền sau, số liền trước");
if (!has(L(T, "b3").notes, /chia hết cho 2 là số chẵn/)) note("Ghi nhớ Bài 3 chưa có định nghĩa số chẵn, số lẻ theo sách");
if (!has(L(T, "b11").notes, /hàng triệu, hàng chục triệu, hàng trăm triệu/) || has(L(T, "b12").notes, /hàng chục triệu/)) note("lớp triệu phải ở Ghi nhớ Bài 11, không ở Bài 12");
if (!has(L(T, "b12").notes, /1 000 000 000, đọc là một tỉ/)) note("Ghi nhớ Bài 12 chưa có số một tỉ");
const n4 = TV.items.filter((it) => it.l === "n4");
if (has(L(TV, "n4").notes, /(^|[^\p{L}])(đã|đang|sẽ)(?!\p{L})/u)) note("Ghi nhớ bài Động từ còn “đã, đang, sẽ”");
if (n4.some((it) => (it.o || []).some((o) => /^(đã|đang|sẽ|sắp|vừa)$/.test(o)))) note("bài Động từ còn câu chọn “đã, đang, sẽ”");
if (!has(L(TV, "n4").notes, /di chuyển/)) note("Ghi nhớ bài Động từ chưa có động từ chỉ hoạt động di chuyển");
if (!has(L(TV, "n5").notes, /từ loại/) || has(L(TV, "n5").notes, /chính tả/) || TV.items.some((it) => it.l === "n5" && /chính tả/.test(it.q))) note("bài Từ điển: công dụng chưa theo sách (nghĩa, từ loại, cách dùng từ)");
const [w0, w1] = TV.writing, wt = (w) => flat([w.prompt, ...w.outline, ...w.checklist].join(" "));
if (!/một câu chuyện/.test(w0.prompt) || !/thích hay không thích/.test(wt(w0)) || !/^Mở đầu/.test(w0.outline[0]) || !/^Triển khai/.test(w0.outline[1]) || !/^Kết thúc/.test(w0.outline[2]) || /nhân vật em yêu thích/.test(w0.prompt)) note("Viết đoạn văn nêu ý kiến: chưa theo sách (ý kiến về một câu chuyện; Mở đầu – Triển khai – Kết thúc)");
for (const word of ["quốc hiệu", "tiêu ngữ", "người nhận", "chữ kí"]) for (const [part, arr] of [["dàn ý", w1.outline], ["bảng kiểm", w1.checklist]]) if (!has(arr, new RegExp(word, "i"))) note(`Viết báo cáo thảo luận nhóm: ${part} chưa có “${word}”`);
if (!has(w1.outline, /dấu gạch ngang/) || !has(w1.checklist, /dấu gạch ngang/)) note("Viết báo cáo thảo luận nhóm: chưa có “mỗi kết quả một dòng, dấu gạch ngang”");

/* ---------- dò lộ đáp án (chỉ in, người làm xem) ---------- */
if (process.env.DO_LO) for (const sb of now.APP.subjects) {
  const E = [];
  sb.items.forEach((it, i) => { if (!it.g) (it.qs || [it]).forEach((q, k) => E.push({ id: it.qs ? `${i}#${k}` : `${i}`, i, l: it.l, f: { "đề": q.q, "lựa chọn": (q.o || []).join(" | "), "lời giải": q.x || "", "đoạn đọc": it.rd || "" },
    ans: q.o ? [q.o[q.a || 0]] : q.tf !== undefined ? [] : String(q.ans).split("|") })); });
  const norm = (s) => flat(s).replace(/\s+/g, " ").toLowerCase().trim(), nums = (s) => (norm(s).match(/\d{1,3}(?: \d{3})+(?!\d)|\d+/g) || []).map((x) => +x.replace(/ /g, ""));
  for (const e of E) for (const a of e.ans) {
    const an = norm(a), isN = /^\d[\d ]*$/.test(an), re = new RegExp(`(^|[^\\p{L}\\d])${an.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}\\d])`, "u");
    for (const f of E) if (f.i !== e.i) for (const [k, v] of Object.entries(f.f)) if (v && (isN ? nums(v).includes(+an.replace(/ /g, "")) : re.test(norm(v)))) console.log(`dò lộ ${sb.id}: câu ${e.id} (${e.l}) đáp án "${a}" có ở ${k} câu ${f.id} (${f.l}): ${norm(v).slice(0, 90)}`);
  }
}

if (errs.length) { errs.forEach((x) => console.error("✗", x)); console.error("BAI ON L4 SAI"); process.exitCode = 1; }
else console.log(`Toán: ${ANS.length} đáp án tính lại, ${T.items.filter((it) => !it.g).length} câu cố định, ${Object.keys(now.APP.gen).length} hàm sinh câu × 3 000 lần; perim: ${[...kinds.perim].join(", ")}; step3: ${[...kinds.step3].join(", ")}\nBAI ON L4 OK`);
