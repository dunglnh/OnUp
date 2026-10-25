/* Kiểm tra bài ôn modules/ioe-6 (Phiên 9s, L44: thêm lộ trình School Level, Unit 1–4, IOE cấp trường 26–28/11/2026).
   Chạy: node tests/bai-on-ioe6.js [commit] (mặc định origin/main). Không cần trình duyệt. In "BAI ON IOE6 OK" khi đạt.
   Tách phần dữ liệu (UNITS, các ngân hàng câu) và phần "Test plan" (TRACKS, buildTest, inst) của trang như tests/so-du-lieu-bai-on.js, chạy trong vm.
   1. Dữ liệu cũ giữ nguyên: UNITS, WARD, WARD_L, CITY, CITY_L giống hệt commit; TRACKS.W, TRACKS.C giống hệt; buildTest của Ward Level (91 đề),
      City Level (56 đề), có và không có câu nghe, ra đúng các câu như commit (mã câu W…, C… và đề học sinh đã làm không đổi).
   2. SCHOOL, SCHOOL_L chỉ Unit 1–4; in số câu theo unit và dạng. SCHOOL chỉ dạng m, o, p, s, f, l, r (không có e), SCHOOL_L chỉ h, hf.
      m, h có 4 lựa chọn khác nhau; o, p, s có 4 từ khác nhau (p: mỗi từ đúng một chỗ gạch chân <u>…</u>); f, hf có đúng một ___ và đáp án;
      hf điền đáp án vào thì đúng câu được đọc; l chỉ có chữ cái; r ít nhất 3 mảnh, mảnh đầu viết hoa, dấu câu ở mảnh cuối.
   3. Không chữ cái tiếng Việt (trừ café); không trùng câu trong SCHOOL, SCHOOL_L và với WARD, CITY (so sau khi bỏ dấu câu, khoảng trắng, chữ thường:
      câu hỏi của m, f; câu được đọc của h, hf; câu của r; từ của l; bộ từ của o, p, s); không có từ không theo sách in năm 2026 (TU_CAM).
   4. TRACKS.S đúng lời giao việc, TRACK_ORDER = S, W, C; buildTest("S", k) với k = 0–48 ra đủ 30 câu, mọi câu mã S…, Unit ≤ 4, có câu nghe (máy
      không đọc được tiếng: không có câu nghe, vẫn 30 câu); mọi câu của SCHOOL, SCHOOL_L có mặt ít nhất một lần. defaultTrack: School Level đến hết
      29/11/2026, Ward Level từ 30/11/2026, City Level từ 11/1/2027.
   5. In ra để xem (không tính lỗi): đáp án của câu f, l, hf có trong chữ của câu khác cùng unit (lộ đáp án, mục 3.3 của docs/KE-HOACH-NOI-DUNG.md);
      đáp án là từ chức năng (at, on, in…) không xét.
   Script tự thử bộ kiểm tra với vài câu cố ý viết sai. */
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, ".."), FILE = "modules/ioe-6/index.html";
const ref = process.argv[2] || "origin/main";
const BANK_NAMES = ["UNITS", "SCHOOL", "WARD", "CITY", "SCHOOL_L", "WARD_L", "CITY_L"];
const load = (src) => {
  const a = src.indexOf('<script src="../../js/bridge.js"></script>'), s = src.indexOf("<script>", a) + 8, e = src.indexOf("/* ================= Storage", s);
  if (a < 0 || e < 0) throw new Error("không thấy phần dữ liệu, Test plan của trang");
  const code = src.slice(s, e), ctx = { chunks: (x) => x.split("/").map((c) => c.trim()).filter(Boolean) };
  vm.createContext(ctx);
  const names = BANK_NAMES.filter((n) => new RegExp("const " + n + "=").test(code)).concat(["TRACKS", "BANKS", "PER_WEEK", "TEST_LEN"]);
  const extra = /const TRACK_ORDER=/.test(code) ? "this.TRACK_ORDER=TRACK_ORDER;" : "";
  vm.runInContext(code + ";" + names.map((n) => `this.${n}=${n};`).join("") + extra + "this.buildTest=buildTest;", ctx);
  // defaultTrack nằm sau phần Helpers (dùng today()): chép riêng hai dòng đó, today() trả ngày đặt trong ctx.__now
  const dt = src.match(/(const SCHOOL_END=[^\n]*\n)?function defaultTrack\(\)\{[^\n]*\}/);
  if (dt) vm.runInContext(`this.__now=null;function today(){const d=new Date(this.__now);d.setHours(0,0,0,0);return d}${dt[0]};this.defaultTrack=defaultTrack;`, ctx);
  return ctx;
};
const now = load(fs.readFileSync(path.join(ROOT, FILE), "utf8"));
const old = load(execFileSync("git", ["show", `${ref}:${FILE}`], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 }));
const errs = [], note = (m) => errs.push(m);

/* ---------- 1. dữ liệu cũ, đề Ward Level, City Level ---------- */
for (const n of ["UNITS", "WARD", "WARD_L", "CITY", "CITY_L"]) if (JSON.stringify(now[n]) !== JSON.stringify(old[n])) note(`${n} khác ${ref} (không sửa chữ, không chèn câu vào giữa ngân hàng cũ)`);
const plainTrack = (T) => JSON.stringify({ ...T, start: +T.start, exam: +T.exam });
for (const k of ["W", "C"]) if (plainTrack(now.TRACKS[k]) !== plainTrack(old.TRACKS[k])) note(`TRACKS.${k} khác ${ref}`);
for (const tk of ["W", "C"]) {
  const T = now.TRACKS[tk], total = T.weeks * now.PER_WEEK;
  for (const nl of [false, true]) for (let k = 0; k < total; k++) {
    const a = now.buildTest(tk, k, nl).map((q) => q.id + (q.order || []).join("") + (q.miss || []).join("")).join(), b = old.buildTest(tk, k, nl).map((q) => q.id + (q.order || []).join("") + (q.miss || []).join("")).join();
    if (a !== b) { note(`${T.name} · Test ${k + 1}${nl ? " (không có câu nghe)" : ""}: câu khác ${ref}`); break; }
  }
}

/* ---------- 2, 3. ngân hàng School Level ---------- */
const CHU_VIET = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/iu;
const TU_CO_DAU = ["café", "cafés"];
// lời giao việc Phiên 9s (ghi chú Tiếng Anh 6 ở mục 3.4 của docs/KE-HOACH-NOI-DUNG.md; bảng "Cập nhật năm 2026" trong README của cuốn)
const TU_CAM = ["attic", "talkative", "generous", "patient", "curious", "lazy", "Bac Giang", "Nam Dinh", "Phu Yen", "Quang Binh", "District 1"];
const SO_O = { m: 7, o: 6, p: 6, s: 6, f: 4, l: 4, r: 3, h: 8, hf: 5 };
const strip = (s) => String(s).replace(/<\/?u>/g, "");
const key = (s) => strip(s).toLowerCase().replace(/[’‘]/g, "'").replace(/[^\p{L}\p{N}]+/gu, "");
const norm = (s) => String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ").replace(/[.!?]+$/, "").trim();
const chunks = (s) => s.split("/").map((x) => x.trim()).filter(Boolean);
const qkey = (r) => {
  const t = r[0];
  if (t === "m" || t === "f" || t === "h" || t === "hf") return "q:" + key(r[2]);
  if (t === "r") return "q:" + key(chunks(r[2]).join(" "));
  if (t === "e") return "q:" + key(r[2].replace(/[[\]]/g, ""));
  if (t === "l") return "l:" + key(r[2]);
  return t + ":" + r.slice(2).map(key).sort().join("|");
};
// kiểm tra một câu của SCHOOL (bank "S") hoặc SCHOOL_L (bank "L"); trả về danh sách lỗi
const checkRow = (r, bank) => {
  const out = [], bad = (m) => out.push(m);
  if (!Array.isArray(r)) return ["không phải mảng"];
  const [t, u] = r;
  if (!(bank === "S" ? ["m", "o", "p", "s", "f", "l", "r"] : ["h", "hf"]).includes(t)) return [`dạng ${t} không dùng ở ${bank === "S" ? "SCHOOL" : "SCHOOL_L"}`];
  if (!(Number.isInteger(u) && u >= 1 && u <= 4)) bad(`unit ${u} (chỉ Unit 1–4)`);
  if (r.length !== SO_O[t]) bad(`dạng ${t} cần ${SO_O[t]} ô, có ${r.length}`);
  if (r.slice(2).some((x) => typeof x !== "string" || !x.trim())) bad("có ô trống");
  if (out.length) return out;
  const text = r.slice(2).join(" ");
  const viet = text.split(/[^\p{L}]+/u).filter((w) => CHU_VIET.test(w) && !TU_CO_DAU.includes(w.toLowerCase()));
  if (viet.length) bad("chữ cái tiếng Việt: " + viet.join(", "));
  for (const w of TU_CAM) if (new RegExp("\\b" + w + "\\b", "i").test(strip(text))) bad("từ không theo sách in năm 2026: " + w);
  const distinct = (arr, what) => { if (new Set(arr.map(key)).size !== arr.length) bad(what + " trùng nhau"); };
  if (t === "m") distinct(r.slice(3), "lựa chọn");
  if (t === "h") distinct(r.slice(4), "lựa chọn");
  if (t === "o" || t === "p" || t === "s") distinct(r.slice(2), "từ");
  if (t === "p") r.slice(2).forEach((w) => { if ((w.match(/<u>[^<]+<\/u>/g) || []).length !== 1) bad(`từ "${w}" phải có đúng một chỗ gạch chân`); });
  else if (/<u>/.test(text)) bad("gạch chân chỉ dùng ở câu phát âm");
  if (t === "f" || t === "hf") {
    const q = t === "f" ? r[2] : r[3], ans = r[r.length - 1].split("|");
    if ((q.match(/___/g) || []).length !== 1) bad("cần đúng một chỗ trống ___");
    if (!ans.every((a) => a.trim())) bad("đáp án trống");
    if (t === "hf" && norm(q.replace("___", ans[0])) !== norm(r[2])) bad("điền đáp án vào không ra câu được đọc");
  }
  if (t === "l") { if (!/^[a-z]+$/i.test(r[2])) bad("từ của câu điền chữ chỉ có chữ cái"); if (new RegExp("\\b" + r[2] + "\\b", "i").test(r[3])) bad("gợi ý có chính từ đó"); }
  if (t === "r") {
    const c = chunks(r[2]);
    if (c.length < 3) bad("câu sắp xếp cần ít nhất 3 mảnh");
    else { if (!/^[A-Z]/.test(c[0])) bad("mảnh đầu phải viết hoa"); if (!/[.?!]$/.test(c[c.length - 1])) bad("dấu câu ở mảnh cuối"); if (new Set(c.map((x) => x.toLowerCase())).size !== c.length) bad("hai mảnh giống nhau"); }
  }
  return out;
};
// tự thử: câu cố ý viết sai phải bị báo
{
  const thu = [[["m", 1, "We ___ English.", "have", "has", "has", "having"], "S", "trùng"], [["e", 1, "x", 0, "y"], "S", "dạng e"], [["m", 5, "a ___", "b", "c", "d", "e"], "S", "unit 5"],
    [["p", 2, "lamp<u>s</u>", "sink<u>s</u>", "sofas", "flat<u>s</u>"], "S", "gạch chân"], [["f", 1, "I ___ to ___.", "go"], "S", "chỗ trống"], [["l", 2, "living room", "a room"], "S", "chữ cái"],
    [["r", 1, "I / go."], "S", "3 mảnh"], [["m", 2, "There is an attic.", "a", "b", "c", "d"], "S", "attic"], [["m", 1, "Toi la Nam.", "Tôi", "b", "c", "d"], "S", "tiếng Việt"],
    [["hf", 1, "I like art.", "I ___ music.", "like"], "L", "câu được đọc"], [["h", 1, "a", "b", "c", "d"], "L", "cần 8 ô"]];
  for (const [r, bank, what] of thu) if (!checkRow(r, bank).length) note(`tự thử: câu sai (${what}) không bị báo: ${JSON.stringify(r)}`);
  if (checkRow(["m", 4, "My street is ___ than yours.", "quieter", "quiet", "more quiet", "quietest"], "S").length) note("tự thử: câu đúng bị báo");
  if (checkRow(["m", 4, "Let's meet at the café.", "a", "b", "c", "d"], "S").length) note("tự thử: café bị báo là chữ tiếng Việt");
}
if (!now.SCHOOL || !now.SCHOOL_L) note("trang không có SCHOOL, SCHOOL_L");
else {
  const seen = new Map();
  for (const n of ["WARD", "CITY", "WARD_L", "CITY_L"]) now[n].forEach((r, i) => { const k = qkey(r); if (!seen.has(k)) seen.set(k, `${n}[${i}]`); });
  const rows = now.SCHOOL.map((r, i) => ({ r, at: `SCHOOL[${i}]`, bank: "S" })).concat(now.SCHOOL_L.map((r, i) => ({ r, at: `SCHOOL_L[${i}]`, bank: "L" })));
  const by = {};
  for (const { r, at, bank } of rows) {
    checkRow(r, bank).forEach((m) => note(`${at} ${JSON.stringify(r).slice(0, 80)}: ${m}`));
    const k = qkey(r);
    if (seen.has(k)) note(`${at} trùng câu ${seen.get(k)}: ${JSON.stringify(r).slice(0, 80)}`); else seen.set(k, at);
    const u = r[1]; by[u] = by[u] || {}; by[u][r[0]] = (by[u][r[0]] || 0) + 1;
  }
  console.log(`School Level: SCHOOL ${now.SCHOOL.length} câu, SCHOOL_L ${now.SCHOOL_L.length} câu nghe`);
  for (const u of Object.keys(by).sort()) {
    const c = by[u], s = ["m", "o", "p", "s", "f", "l", "r"].reduce((a, t) => a + (c[t] || 0), 0), l = (c.h || 0) + (c.hf || 0);
    console.log(`  Unit ${u} (${now.UNITS[u]}): ${s} câu (${["m", "o", "p", "s", "f", "l", "r"].map((t) => `${t} ${c[t] || 0}`).join(", ")}), ${l} câu nghe (h ${c.h || 0}, hf ${c.hf || 0})`);
  }
  /* ---------- 5. lộ đáp án (in ra để xem) ---------- */
  const CHUC_NANG = new Set("a an the at on in to of for from with by up into near under behind between next and or but so than is are am do does don't doesn't isn't aren't be it i you he she we they me him her us them my your his our their this that these those there here not no yes".split(" "));
  let lo = 0, boQua = 0;
  for (const { r, at } of rows) {
    const t = r[0], ans = t === "f" ? r[3].split("|") : t === "hf" ? r[4].split("|") : t === "l" ? [r[2]] : [];
    for (const a of ans) {
      if (CHUC_NANG.has(a.toLowerCase())) { boQua++; continue; }
      const re = new RegExp("(^|[^\\p{L}'])" + a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^\\p{L}'])", "iu");
      for (const o of rows) if (o.r !== r && o.r[1] === r[1] && re.test(strip(o.r.slice(2).join(" | ")))) { lo++; console.log(`  lộ đáp án? ${at} "${a}" có ở ${o.at}: ${strip(o.r.slice(2).join(" | ")).slice(0, 90)}`); }
    }
  }
  console.log(`  ${lo} chỗ đáp án câu f, l, hf có trong câu khác cùng unit (in để xem; ${boQua} đáp án là từ chức năng không xét)`);
}

/* ---------- 4. lộ trình School Level ---------- */
const S = now.TRACKS && now.TRACKS.S;
const wantS = { key: "S", name: "School Level", units: "Units 1–4", start: +new Date(2026, 9, 12), weeks: 7, exam: +new Date(2026, 10, 26), examText: "26–28 Nov 2026", pools: [["S", 30]], mins: 20 };
if (!S || plainTrack(S) !== JSON.stringify(wantS)) note("TRACKS.S khác lời giao việc: " + (S ? plainTrack(S) : "không có"));
if (JSON.stringify(now.TRACK_ORDER) !== '["S","W","C"]') note("TRACK_ORDER phải là S, W, C");
if (now.SCHOOL && !now.SCHOOL.length) note("SCHOOL chưa có câu nào");
if (S && now.SCHOOL && now.SCHOOL.length) {
  const total = S.weeks * now.PER_WEEK, used = new Set();
  for (let k = 0; k < total; k++) {
    for (const nl of [false, true]) {
      const qs = now.buildTest("S", k, nl), at = `School Level · Test ${k + 1}${nl ? " (không có câu nghe)" : ""}`;
      if (qs.length !== now.TEST_LEN) note(`${at}: ${qs.length} câu`);
      if (new Set(qs.map((q) => q.id)).size !== qs.length) note(`${at}: một câu ra hai lần`);
      if (!qs.every((q) => /^S\d+$/.test(q.id) && q.u >= 1 && q.u <= 4)) note(`${at}: có câu không thuộc School Level, Unit 1–4`);
      const nSay = qs.filter((q) => q.say).length;
      if (nl ? nSay : !nSay) note(`${at}: ${nSay} câu nghe`);
      if (!nl) qs.forEach((q) => used.add(q.id));
    }
  }
  const all = now.BANKS.S.map((q) => q.id), miss = all.filter((id) => !used.has(id));
  if (miss.length) note(`${miss.length} câu School Level không có trong đề nào: ${miss.slice(0, 10).join(", ")}`);
  console.log(`  ${total} đề School Level, mỗi đề ${now.TEST_LEN} câu (${now.buildTest("S", 0).filter((q) => q.say).length} câu nghe ở Test 1); ${used.size}/${all.length} câu có mặt`);
}
if (!now.defaultTrack) note("không thấy defaultTrack");
else for (const [d, want] of [["2026-10-12T12:00", "S"], ["2026-10-21T07:00", "S"], ["2026-11-29T23:00", "S"], ["2026-11-30T00:30", "W"], ["2027-01-10T20:00", "W"], ["2027-01-11T08:00", "C"], ["2027-03-10T08:00", "C"]]) {
  now.__now = d; const got = now.defaultTrack(); if (got !== want) note(`defaultTrack ngày ${d}: ${got}, cần ${want}`);
}

errs.forEach((e) => console.error("LỖI:", e));
if (errs.length) { console.error(`BAI ON IOE6 FAILED (${errs.length} lỗi)`); process.exitCode = 1; } else console.log("BAI ON IOE6 OK");
