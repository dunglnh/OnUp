/* Phần dùng chung của các công cụ làm đề (tests/README.md, mục 1) và của script kiểm tra đề mới:
   - nạp kho: mọi đề có sẵn, mỗi câu một lần, có mã "<mã đề>#<số câu>" (câu riêng của đề ngẫu nhiên đánh số trong phần câu riêng);
   - chữ của câu: chữ học sinh thấy (đề bài, lựa chọn, đáp án, cột nối, thang chấm, lời giải), đoạn đọc của câu, đáp án để dò lộ;
   - chuẩn hoá: bỏ dấu, chữ thường, chỉ giữ chữ và số (boDau, như các script kiểm tra đề), gộp tên riêng nhiều chữ thành một từ
     (gopTen, một lượt từ trái sang phải, chọn tên dài nhất), gộp nguyên âm (chữ OCR hay đọc sai dấu, sai nguyên âm);
   - chuỗi k từ và tra nhanh một tập chuỗi trong nhiều nguồn (lọc theo hai từ đầu);
   - sách ở ../OnUp-Book: danh sách cuốn, mục lục trong README (trang in → bài), trang của chữ OCR; chữ đã bỏ dấu của từng trang
     lưu đệm ở thư mục tạm của máy, nên lần chạy sau đọc lại trong vài giây.
   Chỉ dùng node, không cần trình duyệt. */
"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const crypto = require("crypto");
const { napDe } = require("./nap-de.js");

const ROOT = path.join(__dirname, "..");
const BOOK = path.join(ROOT, "..", "OnUp-Book");
const DEM = path.join(os.tmpdir(), "onup-de-dem");

/* ---------- chữ ---------- */
const boDau = (s) => String(s == null ? "" : s).normalize("NFC").normalize("NFD").replace(/[̀-ͯ]/g, "")
  .replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const gopNguyenAm = (s) => s.replace(/[aeiouy]+/g, "a");
// nhớ kết quả của hàm một tham số chuỗi (hàm chuẩn hoá gọi lại nhiều lần trên cùng chữ trong các vòng lặp lồng nhau)
function ghiNho(fn) {
  const m = new Map();
  return (s) => { const k = String(s); if (!m.has(k)) m.set(k, fn(k)); return m.get(k); };
}
// cây cụm chữ (đã bỏ dấu), xử lí hai lượt như hàm khongDau của các script môn: lượt đầu cụm bỏ qua (boQua: tên bài, cách hỏi chung) thành
// dấu “|” (chuỗi k từ không đi qua dấu này), lượt sau tên riêng nhiều chữ (gop) nối thành một từ; mỗi lượt đi từ trái sang phải, tại mỗi vị
// trí lấy cụm dài nhất khớp. cayTen(gop, boQua) → { bo, gop }.
function cayCum(ds, la) {
  const goc = new Map();
  (ds || []).forEach((t) => {
    const w = boDau(t).split(" ").filter(Boolean);
    if (!w.length) return;
    let n = goc;
    w.forEach((x) => { if (!n.has(x)) n.set(x, new Map()); n = n.get(x); });
    n.set("", la(w));
  });
  return goc;
}
const cayTen = (gop, boQua) => ({ bo: cayCum(boQua, () => "|"), gop: cayCum((gop || []).filter((t) => boDau(t).includes(" ")), (w) => w.join("")) });
// một lượt qua cây: w mảng từ, vt vị trí của từng từ (hoặc null)
function quaCay(w, vt, cay) {
  if (!cay || !cay.size) return { w, vt };
  const rw = [], rv = vt ? [] : null;
  for (let i = 0; i < w.length;) {
    let n = cay, j = i, het = null, den = i;
    while (j < w.length && n.has(w[j])) { n = n.get(w[j]); j++; if (n.has("")) { het = n.get(""); den = j; } }
    if (het) { rw.push(het); if (rv) rv.push([vt[i][0], vt[den - 1][1]]); i = den; } else { rw.push(w[i]); if (rv) rv.push(vt[i]); i++; }
  }
  return { w: rw, vt: rv };
}
function gopTen(w, cay) {
  if (!cay) return w;
  return quaCay(quaCay(w, null, cay.bo).w, null, cay.gop).w;
}
// chuẩn hoá đủ: bỏ dấu, bỏ cụm chung, gộp tên riêng (opt.cay: kết quả của cayTen), (opt.nguyenAm) gộp nguyên âm → mảng từ.
// tuTuBoDau: như trên với chữ đã bỏ dấu sẵn (chữ của trang sách lấy từ đệm).
function tuTuBoDau(t, opt) {
  opt = opt || {};
  let w = String(t).split(" ").filter(Boolean);
  w = gopTen(w, opt.cay);
  if (opt.nguyenAm) w = w.map(gopNguyenAm);
  return w;
}
const tuChuan = (s, opt) => tuTuBoDau(boDau(s), opt);
// như tuChuan, kèm vị trí của từng từ trong chữ gốc (đã NFC): { goc, w, vt: [[đầu, cuối], …] }, để in lại đúng đoạn chữ gốc của một chuỗi từ
const _kt = new Map(), boDauKiTu = (c) => { if (!_kt.has(c)) _kt.set(c, boDau(c)); return _kt.get(c); };
function tuViTri(s, opt) {
  opt = opt || {};
  const goc = String(s == null ? "" : s).normalize("NFC"), w = [], vt = [];
  let cur = "", dau = -1;
  for (let i = 0; i <= goc.length; i++) {
    const b = i < goc.length ? boDauKiTu(goc[i]) : "";
    if (b) { if (dau < 0) dau = i; cur += b; } else if (dau >= 0) { w.push(cur); vt.push([dau, i]); cur = ""; dau = -1; }
  }
  let r = { w, vt };
  if (opt.cay) { r = quaCay(r.w, r.vt, opt.cay.bo); r = quaCay(r.w, r.vt, opt.cay.gop); }
  return { goc, w: opt.nguyenAm ? r.w.map(gopNguyenAm) : r.w, vt: r.vt };
}
// chuỗi k từ liền nhau; mặc định bỏ chuỗi có ít hơn 5 từ từ hai chữ cái trở lên (chuỗi toàn số, chữ đơn không có nghĩa)
function chuoiTu(w, k, it) {
  const ra = [], du = it == null ? Math.min(5, k) : it;
  for (let i = 0; i + k <= w.length; i++) {
    const c = w.slice(i, i + k);
    if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= du) ra.push(c.join(" "));
  }
  return ra;
}
/* Tra nhanh: can là Map chuỗi k từ → dữ liệu kèm; nguon là danh sách { id, w } (w: mảng từ đã chuẩn hoá).
   Trả về Map chuỗi → Set id nguồn có chuỗi đó. Lọc theo hai từ đầu nên đi một lượt qua nguồn lớn (cả sách) trong vài giây. */
function timChuoi(nguon, k, can) {
  const dau = new Set([...can.keys()].map((c) => c.split(" ", 2).join(" "))), ra = new Map();
  nguon.forEach(({ id, w }) => {
    for (let i = 0; i + k <= w.length; i++) {
      if (!dau.has(w[i] + " " + w[i + 1])) continue;
      const c = w.slice(i, i + k).join(" ");
      if (can.has(c)) { if (!ra.has(c)) ra.set(c, new Set()); ra.get(c).add(id); }
    }
  });
  return ra;
}
// tìm cụm chữ trong một chuỗi, không phân biệt dấu, hoa thường, dấu câu; trả về các đoạn chữ gốc quanh chỗ tìm thấy
function timCum(goc, cum, rong) {
  rong = rong == null ? 70 : rong;
  const s = String(goc).normalize("NFC"), map = [], ch = [];
  for (let i = 0; i < s.length; i++) {
    const c = boDau(s[i]) || " ";
    for (const x of c) { ch.push(x === " " ? " " : x); map.push(i); }
  }
  const t = ch.join(""), w = boDau(cum).split(" ").filter(Boolean);
  if (!w.length) return [];
  const re = new RegExp("(?<![a-z0-9])" + w.join(" +") + "(?![a-z0-9])", "g"), ra = [];
  let m;
  while ((m = re.exec(t))) {
    const a = map[m.index], b = map[m.index + m[0].length - 1] + 1;
    const tu = Math.max(0, a - rong), den = Math.min(s.length, b + rong);
    ra.push((tu > 0 ? "…" : "") + s.slice(tu, a) + "«" + s.slice(a, b) + "»" + s.slice(b, den) + (den < s.length ? "…" : ""));
  }
  return ra;
}

/* ---------- câu ---------- */
// chữ học sinh thấy của một câu, theo từng trường: [[tên trường, chữ], …] (không gồm đoạn đọc, hình)
function truongCau(q) {
  const ra = [["q", q.q]];
  ["o", "l", "r"].forEach((k) => (Array.isArray(q[k]) ? q[k] : []).forEach((x, i) => ra.push([k + "[" + i + "]", x])));
  if (q.type === "fill") [].concat(q.ans || []).forEach((x, i) => ra.push(["ans[" + i + "]", x]));
  if (q.type === "num") ra.push(["ans", String(q.ans) + (q.unit ? " " + q.unit : "")]);
  (q.rubric || []).forEach((r, i) => ra.push(["rubric[" + i + "]", r.c]));
  if (q.x) ra.push(["x", q.x]);
  return ra.filter(([, v]) => v != null && v !== "").map(([k, v]) => [k, String(v)]);
}
const chuCau = (q) => truongCau(q).map(([, v]) => v);
// đáp án dùng để dò lộ: nhiều lựa chọn → lựa chọn đúng; điền → các cách viết; số → số (kèm đơn vị). Câu đúng/sai, nối cột, sắp xếp,
// tự luận không có một đáp án bằng chữ để dò (phiên đọc tay).
function dapAn(q) {
  if (q.type === "mc") return [q.o[0]];
  if (q.type === "fill") return [].concat(q.ans || []).map(String);
  if (q.type === "num") return [String(q.ans)];
  return [];
}
const doanCua = (b, q) => (q.p && b && b.passages && b.passages[q.p]) || null;

/* ---------- kho ---------- */
let _kho = null;
const kho = () => _kho || (_kho = napDe());
// mọi câu, mỗi câu một lần: [{ b, q, ma, so }]; câu của đề ngẫu nhiên chỉ lấy câu riêng (src là mã đề ngẫu nhiên)
function cacCau(ds) {
  const ra = [];
  (ds || kho()).forEach((b) => {
    const qs = b.pool ? (b.questions || []).filter((q) => q.src === b.id) : (b.questions || []);
    qs.forEach((q, i) => ra.push({ b, q, ma: b.id + "#" + (i + 1), so: i + 1 }));
  });
  return ra;
}
// chọn đề theo tên file câu hỏi ("12-lichsu.js", "12-lichsu") hoặc tiền tố mã đề ("lichsu12-tn"); bỏ trống: mọi đề
function chonDe(chon, ds) {
  ds = ds || kho();
  if (!chon) return ds;
  const f = /\.js$/.test(chon) ? chon : chon + ".js";
  const theoFile = ds.filter((b) => b.file === f);
  return theoFile.length ? theoFile : ds.filter((b) => b.id.startsWith(chon));
}
const fileCauHoi = () => fs.readdirSync(path.join(ROOT, "data/banks")).filter((f) => f !== "index.js" && f.endsWith(".js"));

/* ---------- sách ---------- */
const coSach = () => fs.existsSync(BOOK);
// [{ id: "lop-12/lich-su-12", chu, readme }] các cuốn đã có chữ OCR; loc: chuỗi có trong id (ví dụ "lich-su-12", "lop-9/")
function cacCuon(loc) {
  if (!coSach()) return [];
  const ra = [];
  fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).sort((a, b) => parseInt(a.slice(4)) - parseInt(b.slice(4))).forEach((l) =>
    fs.readdirSync(path.join(BOOK, l)).sort().forEach((c) => {
      const chu = path.join(BOOK, l, c, "chu.txt");
      if (fs.existsSync(chu)) ra.push({ id: l + "/" + c, chu, readme: path.join(BOOK, l, c, "README.md") });
    }));
  const ls = [].concat(loc || []).filter(Boolean);
  return ls.length ? ra.filter((x) => ls.some((s) => x.id.includes(s))) : ra;
}
// trang của chữ OCR: [{ anh: "page-003", trang: "1" | null, nhan: "trang in 1", chu }]
function trangCua(cuon) {
  const t = fs.readFileSync(cuon.chu, "utf8"), ra = [], re = /^=== (page-\d+) · ([^=\n]*?) ===$/gm;
  let m, truoc = null;
  while ((m = re.exec(t))) {
    if (truoc) truoc.chu = t.slice(truoc._tu, m.index);
    const so = /trang in (\d+)/.exec(m[2]);
    truoc = { anh: m[1], trang: so ? so[1] : null, nhan: m[2], _tu: re.lastIndex };
    ra.push(truoc);
  }
  if (truoc) truoc.chu = t.slice(truoc._tu);
  ra.forEach((p) => delete p._tu);
  return ra;
}
// trang đã bỏ dấu: [{ anh, trang, nhan, t }] (t: chữ của trang sau boDau), cùng thứ tự với trangCua; đệm theo đường dẫn, cỡ,
// ngày sửa của file ở thư mục tạm của máy (lần đầu đọc hết các cuốn mất vài giây, các lần sau dưới một giây)
function trangBoDau(cuon) {
  const st = fs.statSync(cuon.chu), khoa = "2|" + cuon.chu + "|" + st.size + "|" + st.mtimeMs;
  const f = path.join(DEM, crypto.createHash("sha1").update(khoa).digest("hex") + ".json");
  try { const d = JSON.parse(fs.readFileSync(f, "utf8")); if (d.khoa === khoa) return d.trang; } catch (e) { /* chưa có đệm */ }
  const trang = trangCua(cuon).map((p) => ({ anh: p.anh, trang: p.trang, nhan: p.nhan, t: boDau(p.chu) }));
  try { fs.mkdirSync(DEM, { recursive: true }); fs.writeFileSync(f, JSON.stringify({ khoa, trang })); } catch (e) { /* không ghi được đệm thì thôi */ }
  return trang;
}
// mục lục trong README của cuốn: [{ trang: số trang in, ten: "Bài 1. Liên hợp quốc" }] theo thứ tự trang (bỏ dòng không có số trang)
function mucLuc(cuon) {
  if (!fs.existsSync(cuon.readme)) return [];
  const ra = [];
  fs.readFileSync(cuon.readme, "utf8").split("\n").forEach((l) => {
    const m = /^\|\s*(\d+)\s*\|\s*page-\d+\s*\|\s*(.+?)\s*\|\s*$/.exec(l);
    if (!m) return;
    const ten = m[2].replace(/\*\*/g, "").split(" · ").pop().trim();
    ra.push({ trang: parseInt(m[1], 10), ten });
  });
  return ra.sort((a, b) => a.trang - b.trang);
}
// bài chứa một trang in (mục cuối cùng của mục lục có trang ≤ trang đó)
function baiCua(ml, trang) {
  let ra = null;
  if (trang == null) return null;
  ml.forEach((m) => { if (m.trang <= trang) ra = m.ten; });
  return ra;
}
// đọc các chuỗi ghi thẳng trong định nghĩa `const <ten> = …;` của script kiểm tra của môn (GOP: tên riêng nhiều chữ; TU_CHUNG: cụm chữ
// chung; CUM_CHUNG: chuỗi 3 từ chung khi dò lộ; DA_XEM: dòng dò lộ đã xem; TRICH: câu trích nguyên văn; boLoiDan: lời dặn chuẩn): mọi chuỗi trong câu lệnh đó, kể
// cả trong .concat([…]), bỏ chú thích. Kết quả có thêm coDinhNghia (script có định nghĩa đó) và coBieuThuc (câu lệnh có phần dựng bằng
// biểu thức, như [...BAI, …], Object.values(…): phần đó không đọc được). Không có file, không có định nghĩa: [].
function docMang(file, ten) {
  const ra = []; ra.coBieuThuc = false; ra.coDinhNghia = false; ra.thamChieu = [];
  if (!file || !fs.existsSync(file)) return ra;
  // `const TEN = …` ở đầu dòng; không có thì `const A = …, TEN = …` (hằng khai báo sau dấu phẩy trong cùng câu lệnh, như LD_READ của
  // tests/ta12-ck1.js)
  const t = fs.readFileSync(file, "utf8"), m = new RegExp("(?:^|\\n)\\s*const " + ten + "\\s*=\\s*(?:new Set\\(\\s*)?").exec(t)
    || new RegExp("(?:^|\\n)\\s*const [^;\\n]*?,\\s*" + ten + "\\s*=\\s*").exec(t);
  if (!m) return ra;
  ra.coDinhNghia = true;
  let i = m.index + m[0].length, sau = 0;
  while (i < t.length) {
    const c = t[i];
    if (c === '"' || c === "'" || c === "`") {
      let j = i + 1;
      while (j < t.length && t[j] !== c) j += t[j] === "\\" ? 2 : 1;
      if (c === "`") ra.coBieuThuc = true;
      else try { ra.push(JSON.parse(c === '"' ? t.slice(i, j + 1) : '"' + t.slice(i + 1, j).replace(/\\'/g, "'").replace(/"/g, '\\"') + '"')); } catch (e) { ra.coBieuThuc = true; }
      i = j + 1; continue;
    }
    if (c === "/" && t[i + 1] === "/") { while (i < t.length && t[i] !== "\n") i++; continue; }
    if (c === "/" && t[i + 1] === "*") { const j = t.indexOf("*/", i + 2); i = j < 0 ? t.length : j + 2; continue; }
    if ("[({".includes(c)) sau++;
    else if ("])}".includes(c)) sau--;
    else if ((c === ";" || c === ",") && sau <= 0) break;
    else if (/[A-Za-z_$.]/.test(c)) {
      ra.coBieuThuc = true;
      const w = /^[A-Za-z_$][\w$]*/.exec(t.slice(i));
      const truoc = t[i - 1] !== "." || t.slice(i - 3, i) === "..."; // bỏ thuộc tính (x.TEN), giữ ...TEN
      if (w && truoc && /^[A-Z][A-Z0-9_]+$/.test(w[0]) && !ra.thamChieu.includes(w[0])) ra.thamChieu.push(w[0]);
      if (w) { i += w[0].length; continue; }
    }
    if (sau < 0) break;
    i++;
  }
  return ra;
}
// như docMang, thêm chuỗi của các hằng viết hoa mà định nghĩa đó dùng tới (…BAI, Object.values(TEN)…), đọc tiếp đến sâu 3 lớp
function docMangSau(file, ten, sau) {
  const da = new Set(), ra = [];
  const doc = (n, d) => {
    if (da.has(n) || d > (sau == null ? 3 : sau)) return;
    da.add(n);
    const m = docMang(file, n);
    if (n === ten) ra.coDinhNghia = m.coDinhNghia;
    m.forEach((x) => ra.push(x));
    m.thamChieu.forEach((x) => doc(x, d + 1));
  };
  doc(ten, 0);
  return ra;
}
const docGop = (file) => docMang(file, "GOP");

/* ---------- dữ liệu khác của app ---------- */
const chayFile = (f, ctx) => require("vm").runInContext(fs.readFileSync(path.join(ROOT, f), "utf8"), ctx, { filename: f });
// danh sách khối (data/grades.js) và lịch mặc định (data/calendar-2026-2027.js)
function docKhoi() { const ctx = require("vm").createContext({ window: {} }); chayFile("data/grades.js", ctx); return ctx.window.ONTAP_GRADES || []; }
function docLich() { const ctx = require("vm").createContext({ window: {} }); chayFile("data/calendar-2026-2027.js", ctx); return ctx.window.ONTAP_SEED_EVENTS || []; }
// tiền tố chung của các đề cùng kì: "lichsu12-tn-de8" → "lichsu12-tn", "toan4-ck1-ngau-nhien" → "toan4-ck1"
const kiCua = (id) => String(id).replace(/-(de\d+|ngau-nhien)$/, "");

/* ---------- đề nháp (tests/soat-nhap.js, tests/ghep-de.js; cách viết ở tests/README.md, mục 2) ----------
   File nháp ghi module.exports = một đề hoặc mảng đề:
     { id, title, grade, subject, minutes, file, pts?, pool?, ki?: [mã kì thi], sau?: mã đề đứng trước,
       note | noteTu: mã đề có sẵn để chép lời dặn, passages?, questions,
       theoDang?: { <dạng câu>: { trường mặc định } }, chuThich?, chuThichMuc?, gop?, boQua?, daXem? }
   docNhap → [{ nhap: đường dẫn, muc: dòng danh mục, ki, sau, de: { note, passages, questions }, chuThich, chuThichMuc, gop, boQua, daXem }] */
const tongMaTran = (m) => Object.values(m || {}).reduce((a, v) => a + (Array.isArray(v) ? v.reduce((x, y) => x + y, 0) : +v || 0), 0);
function docNhap(file) {
  const f = path.resolve(file);
  delete require.cache[f];
  const v = require(f);
  return [].concat(v).map((d, i) => {
    if (!d || typeof d !== "object" || !Array.isArray(d.questions)) throw new Error(file + (Array.isArray(v) ? " (đề thứ " + (i + 1) + ")" : "") + ": cần một đề { id, title, …, questions: [ … ] }");
    const macDinh = d.theoDang || {};
    const qs = d.questions.map((q) => Object.assign({}, macDinh[q && q.type] || {}, q));
    let note = d.note;
    if (note == null && d.noteTu) {
      const b = kho().find((x) => x.id === d.noteTu);
      if (!b) throw new Error(file + ": noteTu “" + d.noteTu + "” không có trong danh mục");
      note = b.note;
    }
    const muc = { id: d.id, title: d.title, grade: d.grade, subject: d.subject, minutes: d.minutes, n: d.pool ? tongMaTran(d.pool.matrix) : qs.length, file: d.file };
    if (d.pool) muc.pool = d.pool;
    if (d.pts != null) muc.pts = d.pts;
    const de = {};
    if (note != null) de.note = note;
    if (d.passages && Object.keys(d.passages).length) de.passages = d.passages;
    de.questions = qs;
    return { nhap: f, muc, ki: [].concat(d.ki || []), sau: d.sau || null, de, chuThich: d.chuThich || null, chuThichMuc: d.chuThichMuc || null,
      gop: d.gop || [], boQua: d.boQua || [], daXem: d.daXem || [] };
  });
}

module.exports = {
  ROOT, BOOK, DEM, boDau, gopNguyenAm, ghiNho, cayTen, quaCay, gopTen, tuTuBoDau, tuChuan, tuViTri, chuoiTu, timChuoi, timCum,
  truongCau, chuCau, dapAn, doanCua, kho, cacCau, chonDe, fileCauHoi,
  coSach, cacCuon, trangCua, trangBoDau, mucLuc, baiCua, docMang, docMangSau, docGop, docKhoi, docLich, kiCua, tongMaTran, docNhap,
};
