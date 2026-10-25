/* Phần dùng chung của tests/bai-on-ioe4.js và tests/bai-on-ioe6.js (Phiên 9s, N-IOE): nạp phần dữ liệu và phần "Test plan" của một bài ôn IOE
   trong vm, kiểm tra từng câu của một ngân hàng, so ngân hàng và lộ trình cũ với một commit, rút thử mọi đề của một lộ trình.
   Không cần trình duyệt. Mỗi script gọi chay(cfg) với cấu hình của bài ôn đó (xem chú thích ở đầu hai script). */
const { execFileSync } = require("child_process");
const fs = require("fs"), path = require("path"), vm = require("vm");
const ROOT = path.join(__dirname, "..");
const BANK_NAMES = ["UNITS", "SCHOOL", "WARD", "PROVINCE", "CITY", "NATIONAL", "SCHOOL_L", "WARD_L", "PROVINCE_L", "CITY_L", "NATIONAL_L"];

// nạp từ đầu script chính đến "/* ================= Storage" (UNITS, ngân hàng, toQ, BANKS, TRACKS, buildTest, inst) và hai dòng defaultTrack
const nap = (src) => {
  const a = src.indexOf('<script src="../../js/bridge.js"></script>'), s = src.indexOf("<script>", a) + 8, e = src.indexOf("/* ================= Storage", s);
  if (a < 0 || e < 0) throw new Error("không thấy phần dữ liệu, Test plan của trang");
  const code = src.slice(s, e), ctx = {};
  if (!/const chunks=/.test(code)) ctx.chunks = (x) => x.split("/").map((c) => c.trim()).filter(Boolean); // ioe-6: chunks ở phần Helpers
  vm.createContext(ctx);
  const names = BANK_NAMES.filter((n) => new RegExp("const " + n + "=").test(code)).concat(["TRACKS", "BANKS", "PER_WEEK", "TEST_LEN"]);
  const extra = /const TRACK_ORDER=/.test(code) ? "this.TRACK_ORDER=TRACK_ORDER;" : "";
  vm.runInContext(code + ";" + names.map((n) => `this.${n}=${n};`).join("") + extra + "this.buildTest=buildTest;", ctx);
  // defaultTrack nằm sau phần Helpers (dùng today()): chép riêng các dòng đó, today() trả ngày đặt trong ctx.__now
  const dt = src.match(/(const SCHOOL_END=[^\n]*\n)?function defaultTrack\(\)\{[^\n]*\}/);
  if (dt) vm.runInContext(`this.__now=null;function today(){const d=new Date(this.__now);d.setHours(0,0,0,0);return d}${dt[0]};this.defaultTrack=defaultTrack;`, ctx);
  return ctx;
};

const CHU_VIET = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/iu;
const TU_CO_DAU = ["café", "cafés"];
const SO_O = { m: 7, o: 6, p: 6, s: 6, e: 5, f: 4, l: 4, w: 4, r: 3, rd: 8, h: 8, hp: 7, hf: 5 };
const strip = (s) => String(s).replace(/<\/?u>/g, "");
const key = (s) => strip(s).toLowerCase().replace(/[’‘]/g, "'").replace(/[^\p{L}\p{N}]+/gu, "");
const norm = (s) => String(s).toLowerCase().replace(/[’‘]/g, "'").replace(/\s+/g, " ").replace(/[.!?]+$/, "").trim();
const chunks = (s) => s.split("/").map((x) => x.trim()).filter(Boolean);
// mã của một câu để dò trùng: câu hỏi của m, f (bỏ hình {…} ở đầu); câu được đọc của h, hp, hf; đoạn đọc và câu hỏi của rd; câu của r, e; từ của l, w; bộ từ của o, p, s
const qkey = (r) => {
  const t = r[0];
  if (t === "m" || t === "f" || t === "h" || t === "hf" || t === "hp") return "q:" + key(String(r[2]).replace(/^\{.+?\}/, ""));
  if (t === "rd") return "rd:" + key(r[2]) + "|" + key(r[3]);
  if (t === "r") return "q:" + key(chunks(r[2]).join(" "));
  if (t === "e") return "q:" + key(String(r[2]).replace(/[[\]]/g, ""));
  if (t === "l" || t === "w") return "l:" + key(r[2]);
  return t + ":" + r.slice(2).map(key).sort().join("|");
};
/* kiểm tra một câu; luat = { S: dạng của ngân hàng đọc, L: dạng của ngân hàng nghe, units: [từ, đến], cam: từ không theo sách in năm 2026 };
   bank "S" (ngân hàng đọc) hoặc "L" (ngân hàng nghe); trả về danh sách lỗi */
const checkRow = (r, bank, luat) => {
  const out = [], bad = (m) => out.push(m);
  if (!Array.isArray(r)) return ["không phải mảng"];
  const [t, u] = r;
  if (!(bank === "S" ? luat.S : luat.L).includes(t)) return [`dạng ${t} không dùng ở ngân hàng ${bank === "S" ? "đọc" : "nghe"} này`];
  if (!(Number.isInteger(u) && u >= luat.units[0] && u <= luat.units[1])) bad(`unit ${u} (chỉ Unit ${luat.units[0]}–${luat.units[1]})`);
  if (r.length !== SO_O[t]) bad(`dạng ${t} cần ${SO_O[t]} ô, có ${r.length}`);
  const oChu = t === "e" ? [r[2], r[4]] : r.slice(2);
  if (oChu.some((x) => typeof x !== "string" || !x.trim()) || (t === "e" && !Number.isInteger(r[3]))) bad("có ô trống hoặc sai kiểu");
  if (out.length) return out;
  const text = oChu.join(" ");
  const viet = text.split(/[^\p{L}]+/u).filter((w) => CHU_VIET.test(w) && !TU_CO_DAU.includes(w.toLowerCase()));
  if (viet.length) bad("chữ cái tiếng Việt: " + viet.join(", "));
  for (const w of luat.cam) if (new RegExp("\\b" + w + "\\b", "i").test(strip(text))) bad("từ không theo sách in năm 2026: " + w);
  const distinct = (arr, what) => { if (new Set(arr.map(key)).size !== arr.length) bad(what + " trùng nhau"); };
  if (t === "m") distinct(r.slice(3), "lựa chọn");
  if (t === "h" || t === "rd") distinct(r.slice(4), "lựa chọn");
  if (t === "hp" && new Set(r.slice(3)).size !== 4) bad("hình trùng nhau");
  if (t === "o" || t === "p" || t === "s") distinct(r.slice(2), "từ");
  if (t === "p") r.slice(2).forEach((w) => { if ((w.match(/<u>[^<]+<\/u>/g) || []).length !== 1) bad(`từ "${w}" phải có đúng một chỗ gạch chân`); });
  else if (/<u>/.test(text)) bad("gạch chân chỉ dùng ở câu phát âm");
  if (t === "e") {
    const parts = [...r[2].matchAll(/\[([^\]]+)\]/g)].map((m) => m[1]);
    if (parts.length !== 4) bad("câu tìm lỗi cần đúng 4 phần trong [ ]");
    else if (!(r[3] >= 0 && r[3] <= 3)) bad("chỉ số phần sai phải từ 0 đến 3");
    else if (norm(parts[r[3]]) === norm(r[4])) bad("chữ sửa giống phần sai");
  }
  if (t === "f" || t === "hf") {
    const q = t === "f" ? r[2] : r[3], ans = r[r.length - 1].split("|");
    if ((q.match(/___/g) || []).length !== 1) bad("cần đúng một chỗ trống ___");
    if (!ans.every((a) => a.trim())) bad("đáp án trống");
    if (t === "hf" && norm(q.replace("___", ans[0])) !== norm(r[2])) bad("điền đáp án vào không ra câu được đọc");
  }
  if (t === "l" || t === "w") {
    if (!/^[a-z]+$/i.test(r[2])) bad("từ của câu điền chữ, xếp chữ chỉ có chữ cái");
    if (new RegExp("\\b" + r[2] + "\\b", "i").test(r[3])) bad("gợi ý có chính từ đó");
    if (t === "w" && new Set(r[2].toLowerCase()).size < 3) bad("câu xếp chữ cần ít nhất 3 chữ cái khác nhau");
  }
  if (t === "r") {
    const c = chunks(r[2]);
    if (c.length < 3) bad("câu sắp xếp cần ít nhất 3 mảnh");
    else { if (!/^[A-Z]/.test(c[0])) bad("mảnh đầu phải viết hoa"); if (!/[.?!]$/.test(c[c.length - 1])) bad("dấu câu ở mảnh cuối"); if (new Set(c.map((x) => x.toLowerCase())).size !== c.length) bad("hai mảnh giống nhau"); }
  }
  return out;
};
// tự thử bộ kiểm tra: câu cố ý viết sai phải bị báo, câu đúng không bị báo
const tuThu = (note) => {
  const L4 = { S: ["m", "o", "p", "e", "f", "l", "w", "r", "rd"], L: ["h", "hp", "hf"], units: [1, 15], cam: ["attic", "District 1"] };
  const thu = [[["m", 1, "We ___ English.", "have", "has", "has", "having"], "S", "trùng"], [["s", 1, "a", "b", "c", "d"], "S", "dạng s"], [["m", 16, "a ___", "b", "c", "d", "e"], "S", "unit 16"],
    [["p", 2, "lamp<u>s</u>", "sink<u>s</u>", "sofas", "flat<u>s</u>"], "S", "gạch chân"], [["f", 1, "I ___ to ___.", "go"], "S", "chỗ trống"], [["l", 2, "living room", "a room"], "S", "chữ cái"],
    [["w", 2, "aab", "letters"], "S", "3 chữ cái khác nhau"], [["r", 1, "I / go."], "S", "3 mảnh"], [["m", 2, "There is an attic.", "a", "b", "c", "d"], "S", "attic"], [["m", 1, "Toi la Nam.", "Tôi", "b", "c", "d"], "S", "tiếng Việt"],
    [["e", 1, "[He] [are] [my] friend.", 1, "is"], "S", "3 phần"], [["e", 1, "[He] [is] [my] [friend].", 4, "is"], "S", "chỉ số"], [["e", 1, "[He] [are] [my] [friend].", 1, "are"], "S", "sửa giống"],
    [["rd", 1, "Text.", "Q?", "a", "a", "c", "d"], "S", "lựa chọn đọc"], [["hp", 1, "I like cats.", "🐱", "🐱", "🐶", "🐦"], "L", "hình"],
    [["hf", 1, "I like art.", "I ___ music.", "like"], "L", "câu được đọc"], [["h", 1, "a", "b", "c", "d"], "L", "cần 8 ô"]];
  for (const [r, bank, what] of thu) if (!checkRow(r, bank, L4).length) note(`tự thử: câu sai (${what}) không bị báo: ${JSON.stringify(r)}`);
  for (const r of [["m", 4, "My street is ___ than yours.", "quieter", "quiet", "more quiet", "quietest"], ["m", 4, "Let's meet at the café.", "a", "b", "c", "d"], ["e", 3, "[She] [have] [long] [hair].", 1, "has"], ["hp", 2, "It's a cat.", "🐱", "🐶", "🐦", "🐟"]])
    if (checkRow(r, r[0] === "hp" ? "L" : "S", L4).length) note("tự thử: câu đúng bị báo: " + JSON.stringify(r) + " " + checkRow(r, r[0] === "hp" ? "L" : "S", L4).join("; "));
};

/* cfg: { file, ref, cu: tên ngân hàng phải giữ nguyên như commit (cả UNITS: chỉ các khóa cũ), kiemTra: [{ ten, tenL, lv, luat, label }] ngân hàng mới
   kiểm tra từng câu, track: { [k]: lộ trình phải có như cfg (start, exam là Date) }, order: TRACK_ORDER mong đợi, ngay: [[ngày, lộ trình mặc định]],
   rut: [{ tk, lv: các mã ngân hàng được phép, units: [từ, đến] }] lộ trình mới rút thử mọi đề, ok: chữ in khi đạt } */
const chay = (cfg) => {
  const now = nap(fs.readFileSync(path.join(ROOT, cfg.file), "utf8"));
  const old = nap(execFileSync("git", ["show", `${cfg.ref}:${cfg.file}`], { cwd: ROOT, encoding: "utf8", maxBuffer: 1 << 26 }));
  const errs = [], note = (m) => errs.push(m);
  tuThu(note);

  /* ---------- 1. dữ liệu cũ, đề của các lộ trình cũ ---------- */
  for (const n of cfg.cu) {
    if (!old[n]) continue; // ngân hàng mới của phiên này: chưa có ở commit
    if (n === "UNITS") { for (const k of Object.keys(old.UNITS)) if (now.UNITS[k] !== old.UNITS[k]) note(`UNITS[${k}] khác ${cfg.ref}`); if (Object.keys(now.UNITS).slice(0, Object.keys(old.UNITS).length).join() !== Object.keys(old.UNITS).join()) note("UNITS: unit mới phải thêm ở cuối"); continue; }
    if (JSON.stringify(now[n]) !== JSON.stringify(old[n])) note(`${n} khác ${cfg.ref} (không sửa chữ, không chèn câu vào giữa ngân hàng cũ)`);
  }
  const plainTrack = (T) => JSON.stringify({ ...T, start: +T.start, exam: +T.exam });
  const sig = (q) => q.id + (q.order || []).join("") + (q.miss || []).join("") + (q.tiles || []).map((t) => t.i).join(",");
  for (const tk of Object.keys(old.TRACKS)) {
    if (!now.TRACKS[tk] || plainTrack(now.TRACKS[tk]) !== plainTrack(old.TRACKS[tk])) { note(`TRACKS.${tk} khác ${cfg.ref}`); continue; }
    const T = now.TRACKS[tk], total = T.weeks * now.PER_WEEK;
    for (const nl of [false, true]) for (let k = 0; k < total; k++) {
      if (now.buildTest(tk, k, nl).map(sig).join() !== old.buildTest(tk, k, nl).map(sig).join()) { note(`${T.name} · Test ${k + 1}${nl ? " (không có câu nghe)" : ""}: câu khác ${cfg.ref}`); break; }
    }
  }

  /* ---------- 2, 3. ngân hàng kiểm tra từng câu ---------- */
  const noi = new Map(); // mã câu → mọi chỗ có mã đó trong mọi ngân hàng của trang (dò trùng với câu cũ và giữa các câu mới)
  for (const n of BANK_NAMES.filter((x) => x !== "UNITS" && now[x])) now[n].forEach((r, i) => { const k = qkey(r); noi.set(k, (noi.get(k) || []).concat(`${n}[${i}]`)); });
  for (const b of cfg.kiemTra) {
    if (!now[b.ten] || !now[b.tenL]) { note(`trang không có ${b.ten}, ${b.tenL}`); continue; }
    if (!now[b.ten].length) { note(`${b.ten} chưa có câu nào`); continue; }
    const rows = now[b.ten].map((r, i) => ({ r, at: `${b.ten}[${i}]`, bank: "S" })).concat(now[b.tenL].map((r, i) => ({ r, at: `${b.tenL}[${i}]`, bank: "L" })));
    const by = {};
    for (const { r, at, bank } of rows) {
      checkRow(r, bank, b.luat).forEach((m) => note(`${at} ${JSON.stringify(r).slice(0, 80)}: ${m}`));
      const khac = noi.get(qkey(r)).filter((x) => x !== at);
      if (khac.length) note(`${at} trùng câu ${khac.join(", ")}: ${JSON.stringify(r).slice(0, 80)}`);
      const u = r[1]; by[u] = by[u] || {}; by[u][r[0]] = (by[u][r[0]] || 0) + 1;
    }
    const doc = b.luat.S, nghe = b.luat.L;
    console.log(`${b.label}: ${b.ten} ${now[b.ten].length} câu, ${b.tenL} ${now[b.tenL].length} câu nghe`);
    for (const u of Object.keys(by).sort((x, y) => x - y)) {
      const c = by[u], s = doc.reduce((a, t) => a + (c[t] || 0), 0), l = nghe.reduce((a, t) => a + (c[t] || 0), 0);
      console.log(`  Unit ${u} (${now.UNITS[u]}): ${s} câu (${doc.filter((t) => c[t]).map((t) => `${t} ${c[t]}`).join(", ")}), ${l} câu nghe (${nghe.filter((t) => c[t]).map((t) => `${t} ${c[t]}`).join(", ")})`);
    }
    /* ---------- 5. lộ đáp án (in ra để xem) ---------- */
    const CHUC_NANG = new Set("a an the at on in to of for from with by up into near under behind between next and or but so than is are am was were do does did don't doesn't isn't aren't be it i you he she we they me him her us them my your his our their this that these those there here not no yes".split(" "));
    let lo = 0, boQua = 0;
    for (const { r, at } of rows) {
      const t = r[0], ans = t === "f" ? r[3].split("|") : t === "hf" ? r[4].split("|") : t === "l" || t === "w" ? [r[2]] : [];
      for (const a of ans) {
        if (CHUC_NANG.has(a.toLowerCase())) { boQua++; continue; }
        const re = new RegExp("(^|[^\\p{L}'])" + a.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "($|[^\\p{L}'])", "iu");
        for (const o of rows) if (o.r !== r && o.r[1] === r[1] && re.test(strip((o.r[0] === "e" ? [o.r[2], o.r[4]] : o.r.slice(2)).join(" | ")))) { lo++; console.log(`  lộ đáp án? ${at} "${a}" có ở ${o.at}: ${strip(o.r.slice(2).join(" | ")).slice(0, 90)}`); }
      }
    }
    console.log(`  ${lo} chỗ đáp án câu f, l, w, hf có trong câu khác cùng unit (in để xem; ${boQua} đáp án là từ chức năng không xét)`);
  }

  /* ---------- 4. lộ trình ---------- */
  for (const [tk, want] of Object.entries(cfg.track)) {
    const T = now.TRACKS && now.TRACKS[tk];
    if (!T || plainTrack(T) !== JSON.stringify({ ...want, start: +want.start, exam: +want.exam })) note(`TRACKS.${tk} khác lời giao việc: ` + (T ? plainTrack(T) : "không có"));
  }
  if (JSON.stringify(now.TRACK_ORDER) !== JSON.stringify(cfg.order)) note("TRACK_ORDER phải là " + cfg.order.join(", "));
  for (const { tk, lv, units } of cfg.rut) {
    const T = now.TRACKS[tk], main = T && T.pools[0][0];
    if (!T || !now.BANKS[main] || !now.BANKS[main].length) { note(`lộ trình ${tk} chưa rút được đề`); continue; }
    const total = T.weeks * now.PER_WEEK, used = new Set(), re = new RegExp(`^(${lv.join("|")})\\d+$`);
    for (let k = 0; k < total; k++) for (const nl of [false, true]) {
      const qs = now.buildTest(tk, k, nl), at = `${T.name} · Test ${k + 1}${nl ? " (không có câu nghe)" : ""}`;
      if (qs.length !== now.TEST_LEN) note(`${at}: ${qs.length} câu`);
      if (new Set(qs.map((q) => q.id)).size !== qs.length) note(`${at}: một câu ra hai lần`);
      if (!qs.every((q) => re.test(q.id) && q.u >= units[0] && q.u <= units[1])) note(`${at}: có câu ngoài ${lv.join(", ")}, Unit ${units[0]}–${units[1]}`);
      const nSay = qs.filter((q) => q.say).length;
      if (nl ? nSay : !nSay) note(`${at}: ${nSay} câu nghe`);
      if (!nl) qs.forEach((q) => used.add(q.id));
    }
    const all = now.BANKS[main].map((q) => q.id), miss = all.filter((id) => !used.has(id));
    if (miss.length) note(`${miss.length} câu ${T.name} không có trong đề nào: ${miss.slice(0, 10).join(", ")}`);
    const t1 = now.buildTest(tk, 0), per = {}; t1.forEach((q) => { per[q.lv] = (per[q.lv] || 0) + 1; });
    console.log(`  ${total} đề ${T.name}, mỗi đề ${now.TEST_LEN} câu (Test 1: ${Object.entries(per).map(([k, n]) => `${n} câu ${k}`).join(", ")}, ${t1.filter((q) => q.say).length} câu nghe); ${used.size - [...used].filter((id) => !all.includes(id)).length}/${all.length} câu ${main} có mặt`);
  }
  if (!now.defaultTrack) note("không thấy defaultTrack");
  else for (const [d, want] of cfg.ngay) { now.__now = d; const got = now.defaultTrack(); if (got !== want) note(`defaultTrack ngày ${d}: ${got}, cần ${want}`); }

  errs.forEach((e) => console.error("LỖI:", e));
  if (errs.length) { console.error(`${cfg.ok.replace(/ OK$/, "")} FAILED (${errs.length} lỗi)`); process.exitCode = 1; } else console.log(cfg.ok);
};

module.exports = { chay, nap, checkRow, qkey, key, norm, strip, chunks };
