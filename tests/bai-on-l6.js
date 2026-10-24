/* Kiểm tra phần Toán của bài ôn modules/l6-giua-ki-1 (Phiên 9q, L42: Chương I–III theo sách Toán 6 tập một in năm 2026).
   Chạy: node tests/bai-on-l6.js [commit] (mặc định origin/main). In "BAI ON L6 OK" khi đạt.
   1. So với commit: Ngữ văn, KHTN giữ nguyên; Toán cùng bài (id, thứ tự), cùng số câu, mỗi câu cùng bài (l), cùng dạng câu (trắc nghiệm cùng
      số lựa chọn, đúng/sai, điền, câu sinh ngẫu nhiên); chỉ câu sinh ngẫu nhiên thứ hai của Bài 13 đổi opp → intcmp, câu thứ ba của Bài 14
      đổi intadd → opp (số đối sang Bài 14). Kết quả theo bài (lres) lưu theo id bài, “Ôn câu sai” theo số thứ tự câu.
      CHI_TIET=1 in thêm các câu, Ghi nhớ khác với commit.
   2. Tính lại đáp án các câu cố định; mọi phép tính “… = …” trong đề và lời giải (câu cố định và 3 000 lần mỗi hàm sinh câu Toán) tính đúng;
      roman: số La Mã ghép đúng từ các thành phần I, V, X, IV, IX, lời giải không có quy tắc trừ.
   3. Nội dung L42 (mục 2 của docs/SUA-LOI-CHAY-THU.md, “Phiên 9q”, Xong khi).
   DO_LO=1 in thêm chỗ đáp án của một câu cố định có trong đề, lựa chọn, lời giải của câu cố định khác của Toán (Rút ra N5). */
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, ".."), FILE = "modules/l6-giua-ki-1/index.html";
const ref = process.argv[2] || "origin/main";
const load = (src) => {
  const a = src.indexOf('<script src="../../js/bridge.js"></script>'), s = src.indexOf("<script>", a) + 8, e = src.indexOf("</script>", s);
  const ctx = {}; vm.createContext(ctx);
  vm.runInContext(src.slice(s, e) + ";this.APP=APP;this.SUBJ=SUBJ;this.U=U;this.rng=rng;this.roman=roman;", ctx);
  return ctx;
};
const now = load(fs.readFileSync(path.join(ROOT, FILE), "utf8"));
const old = load(execFileSync("git", ["show", `${ref}:${FILE}`], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 }));
const errs = [], note = (m) => errs.push(m);
const kind = (it) => (it.rd ? `bài đọc ${it.qs.length} câu` : it.g ? "sinh câu" : it.o ? `trắc nghiệm ${it.o.length}` : it.tf !== undefined ? "đúng/sai" : "điền");
const flat = (s) => String(s).replace(/ /g, " ").replace(/<sup>([^<]+)<\/sup>/g, "^$1");
const plain = (o) => JSON.stringify(o, (k, v) => (["L", "count", "hasGen", "id", "sid"].includes(k) && typeof v !== "object" ? undefined : v));

/* ---------- 1. cấu trúc ---------- */
for (const sb of now.APP.subjects) {
  const ob = old.APP.subjects.find((x) => x.id === sb.id);
  if (!ob) { note(`${sb.id}: không có ở ${ref}`); continue; }
  if (sb.id !== "toan") { if (plain([sb.lessons, sb.items, sb.writing, sb.test, sb.scopeText]) !== plain([ob.lessons, ob.items, ob.writing, ob.test, ob.scopeText])) note(`${sb.id}: khác ${ref} (phiên chỉ sửa Toán)`); continue; }
  if (sb.lessons.map((l) => l.id + l.name + l.short + l.group).join() !== ob.lessons.map((l) => l.id + l.name + l.short + l.group).join()) note(`toan: bài khác ${ref}`);
  if (plain([sb.test, sb.scopeText]) !== plain([ob.test, ob.scopeText])) note("toan: phạm vi đề thi thử khác");
  if (sb.items.length !== ob.items.length) note(`toan: ${sb.items.length} câu, ${ref} có ${ob.items.length}`);
  sb.items.forEach((it, i) => { const o = ob.items[i]; if (o && (it.l !== o.l || kind(it) !== kind(o))) note(`toan câu ${i}: ${it.l} ${kind(it)}, ${ref}: ${o.l} ${kind(o)}`); });
  const gens = (x) => x.items.map((it) => it.g || "").join();
  if (old.APP.gen.opp && gens(ob).includes("opp,")) { // lần so với commit trước Phiên 9q: chỉ hai câu sinh ngẫu nhiên đổi hàm
    const d = sb.items.map((it, i) => (it.g !== ob.items[i].g ? `${it.l}:${ob.items[i].g}→${it.g}` : "")).filter(Boolean).join(" ");
    if (d !== "b13:opp→intcmp b14:intadd→opp") note("toan: hàm sinh câu đổi khác dự kiến: " + d);
  } else if (gens(sb) !== gens(ob)) note("toan: hàm sinh câu khác " + ref);
  if (process.env.CHI_TIET) {
    sb.lessons.forEach((l, i) => { if (JSON.stringify(l.notes) !== JSON.stringify(ob.lessons[i].notes)) console.log(`Ghi nhớ ${l.id}:`, l.notes.filter((n) => !ob.lessons[i].notes.includes(n))); });
    sb.items.forEach((it, i) => { if (plain(it) !== plain(ob.items[i])) console.log(`câu ${i} (${it.l}): ${(ob.items[i].q || ob.items[i].g || "").slice(0, 70)} → ${(it.q || it.g || "").slice(0, 110)}`); });
  }
}

/* ---------- 2. Toán: đáp án, phép tính ---------- */
const { U } = now, T = now.SUBJ.toan;
const RV = { I: 1, V: 5, X: 10, IV: 4, IX: 9 };
const fromRoman = (s) => { let v = 0; for (const c of s.match(/IX|IV|X|V|I/g) || []) v += RV[c]; return (s.match(/IX|IV|X|V|I/g) || []).join("") === s ? v : NaN; };
// phép tính "A = B = C" trong chữ: mỗi vế chỉ có số, + − · : ^, ngoặc thì phải bằng nhau (số ngăn hàng nghìn bằng khoảng trắng)
const calc = (s) => { const e = s.replace(/(\d) (?=\d{3}(?!\d))/g, "$1").replace(/·/g, "*").replace(/:/g, "/").replace(/−/g, "-").replace(/\^/g, "**").replace(/\[/g, "(").replace(/\]/g, ")");
  if (!/^[\d\s+\-*/().]+$/.test(e)) return NaN; try { return Function(`return (${e})`)(); } catch (_) { return NaN; } };
const equations = (text, label) => {
  const t = flat(text).replace(/°C/g, "").replace(/(\S):/g, "$1;");
  for (const mt of t.matchAll(/[\d([−][\d\s+−·:^()[\]=]*[\d)\]]/g)) {
    const seg = mt[0];
    if (!seg.includes("=") || /[\p{L}+−·:]\s*$/u.test(t.slice(0, mt.index)) || /^\^/.test(t.slice(mt.index + seg.length))) continue; // vế trái có chữ (x + 313 = 1 013), số mũ chưa biết (2^?): bỏ qua
    const sides = seg.split("=").map((x) => x.trim()).filter(Boolean), vals = sides.map(calc);
    if (sides.length < 2 || vals.some((v) => !Number.isFinite(v))) continue; // vế có chữ (a = b · q + r, x = …): bỏ qua
    if (vals.some((v) => Math.abs(v - vals[0]) > 1e-9)) note(`${label}: phép tính sai "${seg}"`);
  }
};
const gcd = (a, b) => (b ? gcd(b, a % b) : a), range = (a, b) => Array.from({ length: b - a + 1 }, (_, i) => a + i);
const divs = (n) => range(1, n).filter((d) => n % d === 0);
const set = (a) => a.join("; "), neg = (n) => (n < 0 ? "−" + -n : String(n));
/* Đáp án tính lại của các câu cố định (tìm câu theo một đoạn chữ của đề): chuỗi là lựa chọn đúng (viết như trên màn hình), số là đáp án điền,
   true/false là câu đúng/sai. */
const ANS = [
  ["Cho A = {2; 4; 6; 8}", "4 ∈ A"],
  ["chữ số có mặt trong số 7 070 177", `{${set([...new Set("7070177")].map(Number).sort())}}`],
  ["Cách viết nào đúng?", `{x ∈ ℕ | 2 < x ≤ 6} = {${set(range(0, 20).filter((x) => 2 < x && x <= 6))}}`],
  ["Chương XXIII", String(fromRoman("XXIII"))],
  ["4 307 viết dưới dạng tổng", "4 · 1 000 + 3 · 100 + 0 · 10 + 7"],
  ["không có số liền trước", "0"],
  ["Hai số tự nhiên liên tiếp hơn kém nhau 1", true],
  ["37 + 125 + 63", 37 + 125 + 63], ["298 + 47 + 2", 298 + 47 + 2], ["25 · 37 · 4", 25 * 37 * 4], ["47 · 99 + 47", 47 * 99 + 47],
  ["Trong lũy thừa 5", "5"],
  ["sau 4 giờ có bao nhiêu con", String(2 ** 4)],
  ["Giá trị của 50 − 4 · 2", String(50 - 4 * 2 ** 3)],
  ["Cô có 18 cái bánh", set(divs(18))],
  ["Các bội của 9 nhỏ hơn 45", set(range(0, 44).filter((x) => x % 9 === 0))],
  ["chắc chắn chia hết cho 9", false],
  ["Số nguyên tố chẵn duy nhất", "2"],
  ["số nguyên tố nhỏ hơn 20", String(range(2, 19).filter((n) => divs(n).length === 2).length)],
  ["28 bạn nam và 42 bạn nữ", gcd(28, 42)],
  ["cứ 6 giây nháy một lần, đèn đỏ cứ 10 giây", (6 * 10) / gcd(6, 10)],
  ["5 độ dưới 0 °C", "−5 °C"],
  ["So sánh hai số nguyên", "−7 < −2"],
  ["Bỏ dấu ngoặc: −(a − b + c)", "−a + b − c"],
  ["(−2) · (−3) · (−5)", neg(-2 * -3 * -5)],
  ["Các ước của −21", set([...divs(21).map((d) => -d).reverse(), ...divs(21)].map(neg))],
  ["tổng cộng thay đổi −18 °C", `${neg(-18 / 6)} °C`],
];
for (const [key, want] of ANS) {
  const its = T.items.filter((it) => !it.g && flat(it.q).replace(/\^\d+/g, "").includes(key));
  if (its.length !== 1) { note(`Toán: ${its.length} câu có "${key}"`); continue; }
  const it = its[0], got = it.o ? flat(it.o[it.a || 0]) : it.tf !== undefined ? it.tf : it.ans;
  const ok = typeof want === "boolean" ? got === want : typeof want === "number" ? String(got).split("|").map(Number).includes(want) : got === want;
  if (!ok) note(`Toán "${key}": đáp án ${JSON.stringify(got)}, tính lại được ${JSON.stringify(want)}`);
}
if (ANS.length !== T.items.filter((it) => !it.g).length) note(`Toán: ${ANS.length} đáp án tính lại, có ${T.items.filter((it) => !it.g).length} câu cố định`);
T.items.forEach((it, i) => { if (it.o && new Set(it.o.map(flat)).size !== it.o.length) note(`Toán câu ${i}: lựa chọn trùng nhau`); });
T.items.forEach((it, i) => { if (!it.g) { equations(it.q, `Toán câu ${i}`); equations(it.x || "", `Toán câu ${i} lời giải`); } });
T.lessons.forEach((l) => l.notes.forEach((n) => equations(n, `Ghi nhớ ${l.id}`)));
// câu "Chương XXIII": lời giải ghép đúng các thành phần; mọi lựa chọn sai khác đáp án
// hàm sinh câu của Toán: phép tính trong đề và lời giải đúng; roman: ghép thành phần đúng, không có quy tắc trừ; opp: đáp án là số đối
const used = new Set(T.items.filter((it) => it.g).map((it) => it.g)), seenRoman = new Set();
for (const g of used) for (let k = 0; k < 3000; k++) {
  const q = now.APP.gen[g](now.rng(`bai-on-l6|${g}|${k}`), U), lab = `sinh câu ${g} (lần ${k})`;
  equations(q.q, lab); equations(q.x || "", lab + " lời giải");
  if (g === "roman") {
    const n = +(/Số (\d+) viết/.exec(q.q) || /= (\d+)\.$/.exec(q.x) || [])[1], r = q.o ? q.o[0] : /Số La Mã ([IVX]+)/.exec(q.q)[1];
    if (fromRoman(r) !== n || (q.ans !== undefined && +q.ans !== n)) note(`${lab}: ${r} ≠ ${n}`);
    const x = q.x.replace(/^Thành phần: I = 1, V = 5, X = 10, IV = 4, IX = 9\. (Số La Mã bằng tổng giá trị các thành phần: )?/, "");
    const m = /^(?:([IVX]+(?: \+ [IVX]+)+) = ([\d +]+) = (\d+)|([IVX]+) = (\d+))[.,]/.exec(x);
    if (!m || (m[1] ? m[1].split(" + ").join("") !== r || m[1].split(" + ").map((c) => RV[c]).join(" + ") !== m[2].trim() || +m[3] !== n : m[4] !== r || +m[5] !== n)) note(`${lab}: lời giải không ghép đúng thành phần: ${q.x}`);
    if (/trừ/.test(q.x)) note(`${lab}: lời giải còn quy tắc trừ`);
    seenRoman.add(n);
  }
  if (g === "opp") { const n = +flat(/Số đối của (\S+) là/.exec(q.q)[1]).replace("−", "-"); if (+q.ans !== -n) note(`${lab}: ${q.q} → ${q.ans}`); }
  if (g === "divrem" && /0 < /.test(q.x)) note(`${lab}: lời giải còn “0 < r”`);
}
if (seenRoman.size !== 30) note(`roman: chỉ ra ${seenRoman.size}/30 số`);

/* ---------- 3. nội dung L42 ---------- */
const text = flat(JSON.stringify([T.lessons, T.items])) + Object.values(now.APP.gen).filter((f, i) => ["roman", "divrem", "opp"].includes(Object.keys(now.APP.gen)[i])).join("");
for (const [re, what] of [[/thì trừ/, "“thì trừ”"], [/0 < r/, "“0 < r”"], [/ước nguyên của/, "“ước nguyên của”"], [/NHA TRANG/, "“NHA TRANG”"], [/Các bội của 6 nhỏ hơn 30/, "“Các bội của 6 nhỏ hơn 30”"], [/tính chất đặc trưng/, "“tính chất đặc trưng”"], [/x < 4\}/, "ví dụ {x ∈ ℕ | x < 4} của sách"], [/60 = 2/, "ví dụ 60 = 2² · 3 · 5 của sách"], [/các ước của 6 là/, "ví dụ các ước của 6 của sách"]]) if (re.test(text)) note(`Toán còn ${what}`);
const L = (id) => T.lessons.find((l) => l.id === id), has = (id, re) => L(id).notes.some((n) => re.test(flat(n)));
if (!has("b1", /Hai cách mô tả một tập hợp/) || !has("b1", /dấu hiệu đặc trưng/)) note("Ghi nhớ Bài 1 chưa dùng chữ của sách (hai cách mô tả, dấu hiệu đặc trưng)");
if (!has("b2", /năm thành phần: I = 1, V = 5, X = 10, IV = 4, IX = 9/) || !has("b2", /tổng giá trị các thành phần/)) note("Ghi nhớ Bài 2 chưa viết số La Mã theo sách");
if (!has("b5", /0 ≤ r < b/) || !has("b5", /r = 0: phép chia hết/)) note("Ghi nhớ Bài 5 chưa có 0 ≤ r < b, r = 0 là phép chia hết");
if (has("b13", /đối/) || !has("b14", /số đối/)) note("số đối phải ở Ghi nhớ Bài 14, không ở Bài 13");
if (T.items.some((it) => it.l === "b13" && (it.g === "opp" || /đối/.test(it.q || "")))) note("Bài 13 còn câu về số đối");

/* ---------- dò lộ đáp án (chỉ in, người làm xem) ---------- */
if (process.env.DO_LO) {
  const E = T.items.map((it, i) => ({ i, it })).filter((e) => !e.it.g).map(({ i, it }) => ({ i, l: it.l, f: { "đề": it.q, "lựa chọn": (it.o || []).join(" | "), "lời giải": it.x || "" },
    ans: it.o ? [it.o[it.a || 0]] : it.tf !== undefined ? [] : String(it.ans).split("|") }));
  const norm = (s) => flat(s).replace(/\s+/g, " ").toLowerCase().trim();
  for (const e of E) for (const a of e.ans) {
    const an = norm(a), re = new RegExp(`(^|[^\\p{L}\\d])${an.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}\\d])`, "u");
    for (const f of E) if (f.i !== e.i) for (const [k, v] of Object.entries(f.f)) if (v && re.test(norm(v))) console.log(`dò lộ: câu ${e.i} (${e.l}) đáp án "${a}" có ở ${k} câu ${f.i} (${f.l}): ${norm(v).slice(0, 90)}`);
  }
}

if (errs.length) { errs.forEach((x) => console.error("✗", x)); console.error("BAI ON L6 SAI"); process.exitCode = 1; }
else console.log(`Toán: ${ANS.length} đáp án tính lại, ${used.size} hàm sinh câu × 3 000 lần; roman ra ${seenRoman.size}/30 số\nBAI ON L6 OK`);
