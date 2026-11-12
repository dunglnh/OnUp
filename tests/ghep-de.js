/* Ghép đề nháp vào app (tests/README.md, mục 2): ghi đề vào data/banks/<file>, dòng danh mục vào data/banks/index.js, mã đề vào banks của các
   kì thi trong data/calendar-2026-2027.js; xuất đề có sẵn ra nháp để sửa.
   node tests/ghep-de.js <nháp.js> [<nháp khác.js> …] [--thu]
     Mã đề đã có: thay đề đó tại chỗ (dòng danh mục cũng vậy). Mã mới: đứng sau đề ghi ở sau (trong file câu hỏi, danh mục, banks của kì thi),
     không ghi sau thì cuối file câu hỏi, sau dòng danh mục cuối cùng của cùng file, cuối banks. File câu hỏi chưa có thì tạo file mới (thêm đề
     của môn mới: xem CLAUDE.md, “Thêm đề có sẵn”). Ghi xong nạp lại như app (tests/nap-de.js) và so từng câu với nháp; khác thì trả lại các
     file như cũ. --thu: chỉ in việc sẽ làm, không ghi file.
   node tests/ghep-de.js --xuat <mã đề> [<mã đề> …] > <nháp.js>
     In đề có sẵn dưới dạng nháp (kèm kì thi đang gắn) để sửa, soát (tests/soat-nhap.js) rồi ghép lại.
   Không sửa chữ của câu: nháp viết thế nào thì ghi vậy (mỗi câu một khối, như các đề đang có). Chú thích trước đề, trước dòng danh mục:
   chuThich, chuThichMuc của nháp (chỉ ghi khi thêm đề mới). Ghép xong chạy: node tests/kiem-tra-de.js, script kiểm tra của môn, e2e. */
"use strict";
const fs = require("fs");
const path = require("path");
const D = require("./de-chung.js");

const args = process.argv.slice(2), opt = {}, ds = [];
for (const a of args) { if (a.startsWith("--")) opt[a.slice(2)] = true; else ds.push(a); }
if (!ds.length) {
  console.log("Cách dùng: node tests/ghep-de.js <nháp.js> … [--thu]\n           node tests/ghep-de.js --xuat <mã đề> … > <nháp.js>");
  process.exit(0);
}

/* ---------- viết giá trị theo kiểu các file đề (khoá không ngoặc kép, chuỗi JSON giữ nguyên chữ Việt) ---------- */
const khoa = (k) => (/^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k));
const js = (v) => {
  if (Array.isArray(v)) return "[" + v.map(js).join(", ") + "]";
  if (v && typeof v === "object") { const ks = Object.keys(v); return ks.length ? "{ " + ks.map((k) => khoa(k) + ": " + js(v[k])).join(", ") + " }" : "{}"; }
  return JSON.stringify(v);
};
const DAU = ["part", "topic", "type", "p", "q"], NGAN = ["a", "ans", "unit", "tol"], CUOI = ["x", "lv", "pt"];
// một câu: dòng đầu (phần, chủ đề, dạng, đoạn, đề bài, đáp án ngắn), mỗi trường dài một dòng (lựa chọn, ý, cột nối, thang chấm, hình), dòng cuối
// (lời giải, mức, điểm)
function cauJs(q, le) {
  const ks = Object.keys(q), dau = DAU.filter((k) => k in q), ngan = NGAN.filter((k) => k in q && (!Array.isArray(q[k]) || (k === "ans" && q.type === "fill")));
  const giua = ks.filter((k) => !dau.includes(k) && !ngan.includes(k) && !CUOI.includes(k)), cuoi = CUOI.filter((k) => k in q);
  const dong = [dau.concat(ngan).map((k) => khoa(k) + ": " + js(q[k])).join(", ")];
  giua.forEach((k) => dong.push(khoa(k) + ": " + js(q[k])));
  if (cuoi.length) dong.push(cuoi.map((k) => khoa(k) + ": " + js(q[k])).join(", "));
  return le + "{ " + dong.join(",\n" + le + "  ") + " }";
}
const sap = (v) => (Array.isArray(v) ? v.map(sap) : v && typeof v === "object" ? Object.keys(v).sort().reduce((o, k) => ((o[k] = sap(v[k])), o), {}) : v);
const bang = (a, b) => JSON.stringify(sap(a)) === JSON.stringify(sap(b));
// một đề trong file câu hỏi (le: lề của khoá đề). cu: đề đang có trong file (tachDe): câu, đoạn đọc không đổi giữ nguyên chữ cũ, để diff chỉ
// có chỗ sửa
function deJs(id, de, le, cu) {
  const l2 = le + "  ", l3 = l2 + "  ", ra = [], cuCau = new Map();
  if (cu) cu.obj.questions.forEach((q, i) => { const k = JSON.stringify(sap(q)); if (!cuCau.has(k)) cuCau.set(k, cu.cau[i]); });
  const doanJs = (k, p) => (cu && cu.doan.has(k) && cu.obj.passages && bang(cu.obj.passages[k], p) ? cu.doan.get(k) : JSON.stringify(k) + ": " + js(p));
  const cauCu = (q) => { const k = JSON.stringify(sap(q)); return cu && cuCau.has(k) ? l3 + cuCau.get(k) : cauJs(q, l3); };
  if (de.note != null) ra.push(l2 + "note: " + JSON.stringify(de.note));
  if (de.passages && Object.keys(de.passages).length) ra.push(l2 + "passages: {\n" + Object.entries(de.passages).map(([k, p]) => l3 + doanJs(k, p)).join(",\n") + "\n" + l2 + "}");
  ra.push(l2 + "questions: [\n" + de.questions.map(cauCu).join(",\n") + "\n" + l2 + "]");
  return le + JSON.stringify(id) + ": {\n" + ra.join(",\n") + "\n" + le + "}";
}
// tách một đề đang có trong file câu hỏi (chữ từ khoá đến ngoặc đóng): { obj, cau: [chữ của từng câu], doan: Map mã đoạn → chữ }
function tachDe(E) {
  const mo = E.indexOf("{"), ra = { cau: [], doan: new Map() };
  try { ra.obj = require("vm").runInNewContext("(" + E.slice(mo) + ")"); } catch (e) { return null; }
  const boQua = (i) => (E.startsWith("/*", i) ? E.indexOf("*/", i) + 2 : E.startsWith("//", i) ? E.indexOf("\n", i) : -1);
  const q = /\bquestions:\s*\[/.exec(E);
  if (q) {
    const a = q.index + q[0].length - 1, b = dong_ngoac(E, a);
    for (let i = a + 1; i < b;) { const j = boQua(i); if (j > 0) { i = j; continue; } if (E[i] === "{") { const k = dong_ngoac(E, i); ra.cau.push(E.slice(i, k + 1)); i = k + 1; } else i++; }
  }
  const p = /\bpassages:\s*\{/.exec(E);
  if (p) {
    const a = p.index + p[0].length - 1, b = dong_ngoac(E, a), re = /("(?:[^"\\]|\\.)*"|[A-Za-z_$][\w$]*)\s*:\s*\{/y;
    for (let i = a + 1; i < b;) {
      const j = boQua(i); if (j > 0) { i = j; continue; }
      if (/[\s,]/.test(E[i])) { i++; continue; }
      re.lastIndex = i; const m = re.exec(E); if (!m) break;
      const vc = dong_ngoac(E, re.lastIndex - 1); ra.doan.set(m[1].startsWith('"') ? JSON.parse(m[1]) : m[1], E.slice(i, vc + 1)); i = vc + 1;
    }
  }
  return ra.cau.length === (ra.obj.questions || []).length ? ra : null;
}
// dòng danh mục: một dòng; đề ngẫu nhiên thêm dòng pool như các mục đang có
function mucJs(m) {
  const dau = ["id", "title", "grade", "subject", "minutes", "n", "file"].filter((k) => m[k] != null).map((k) => k + ": " + js(m[k])).join(", ");
  if (!m.pool) return "  { " + dau + (m.pts != null ? ", pts: " + js(m.pts) : "") + " }";
  const o = Object.entries(m.pool.matrix || {}).map(([k, v]) => JSON.stringify(k) + ": " + js(v)), dong = [];
  let cur = "      ";
  o.forEach((x, i) => { const s = x + (i < o.length - 1 ? "," : ""); if (cur.trim() && (cur + " " + s).length > 150) { dong.push(cur); cur = "      " + s; } else cur += (cur.trim() ? " " : "") + s; });
  dong.push(cur);
  return "  { " + dau + ",\n    pool: { from: " + js(m.pool.from || []) + ", matrix: {\n" + dong.join("\n") + " } }" + (m.pts != null ? ", pts: " + js(m.pts) : "") + " }";
}
const chuThich = (s, le) => le + "/* " + String(s).trim().split("\n").map((x) => x.trim()).join("\n" + le + "   ") + " */\n";

/* ---------- tìm trong file: ngoặc khớp (bỏ qua chuỗi, chú thích) ---------- */
function dong_ngoac(t, i) { // t[i] là { hoặc [ → vị trí ngoặc đóng khớp
  const mo = t[i], dg = mo === "{" ? "}" : "]";
  let sau = 0;
  for (let j = i; j < t.length; j++) {
    const c = t[j];
    if (c === '"' || c === "'" || c === "`") { j++; while (j < t.length && t[j] !== c) j += t[j] === "\\" ? 2 : 1; continue; }
    if (c === "/" && t[j + 1] === "/") { while (j < t.length && t[j] !== "\n") j++; continue; }
    if (c === "/" && t[j + 1] === "*") { j = t.indexOf("*/", j + 2) + 1; if (j <= 0) return -1; continue; }
    if (c === "{" || c === "[") sau++;
    else if (c === "}" || c === "]") { sau--; if (!sau) return c === dg ? j : -1; }
  }
  return -1;
}
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
// đề trong file câu hỏi: { dau: vị trí khoá, cuoi: sau ngoặc đóng } hoặc null
function timDe(t, id) {
  const m = new RegExp('(^|\\n)(  )' + escRe(JSON.stringify(id)) + ": \\{").exec(t);
  if (!m) return null;
  const dau = m.index + m[1].length + 2, mo = t.indexOf("{", dau + JSON.stringify(id).length), cuoi = dong_ngoac(t, mo);
  return cuoi < 0 ? null : { dau, cuoi: cuoi + 1 };
}
// dòng danh mục: { dau, cuoi } của đối tượng { id: "<id>", … }
function timMuc(t, id) {
  const m = new RegExp('\\{ id: ' + escRe(JSON.stringify(id)) + ",").exec(t);
  if (!m) return null;
  const cuoi = dong_ngoac(t, m.index);
  return cuoi < 0 ? null : { dau: m.index, cuoi: cuoi + 1 };
}
const PHIEN = new Date().toISOString().slice(0, 10);

/* ---------- xuất đề có sẵn ra nháp ---------- */
if (opt.xuat) {
  const lich = D.docLich();
  const ra = ds.map((id) => {
    const b = D.kho().find((x) => x.id === id);
    if (!b) { console.error("Không có đề " + id + " trong danh mục."); process.exit(1); }
    const qs = (b.pool ? b.questions.filter((q) => q.src === b.id) : b.questions).map((q) => { const c = Object.assign({}, q); if (b.pool) delete c.src; return c; });
    const d = { id: b.id, title: b.title, grade: b.grade, subject: b.subject, minutes: b.minutes, file: b.file };
    if (b.pool) d.pool = b.pool;
    if (b.pts != null) d.pts = b.pts;
    const ki = lich.filter((e) => (e.banks || []).includes(b.id)).map((e) => e.id);
    const dong = Object.entries(d).map(([k, v]) => "  " + k + ": " + js(v)).concat(["  ki: " + js(ki)]);
    const de = deJs("_", { note: b.note, passages: b.passages, questions: qs }, "").replace(/^"_": \{\n/, "").replace(/\n\}$/, "");
    return "{\n" + dong.join(",\n") + ",\n" + de + "\n}";
  });
  console.log(`/* Nháp xuất từ data/banks/ ngày ${PHIEN} (node tests/ghep-de.js --xuat ${ds.join(" ")}). Sửa, soát bằng tests/soat-nhap.js, ghép lại bằng
   node tests/ghep-de.js <file này>: đề cùng mã được thay tại chỗ. Cách viết nháp: tests/README.md, mục 2. */
module.exports = ${ra.length === 1 ? ra[0] : "[\n" + ra.join(",\n") + "\n]"};`);
  process.exit(0);
}

/* ---------- ghép ---------- */
const NHAP = ds.flatMap((f) => D.docNhap(f));
const IDX = path.join(D.ROOT, "data/banks/index.js"), CAL = path.join(D.ROOT, "data/calendar-2026-2027.js");
const goc = new Map(), moi = new Map(); // đường dẫn → chữ cũ, chữ mới
const doc = (f) => { if (!moi.has(f)) { const t = fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null; goc.set(f, t); moi.set(f, t); } return moi.get(f); };
const viec = [];
NHAP.forEach((d) => {
  const id = d.muc.id, fq = path.join(D.ROOT, "data/banks", d.muc.file);
  if (!/^\d+-[a-z0-9]+\.js$/.test(d.muc.file || "")) { console.error(id + ": file “" + d.muc.file + "” không đúng dạng <khối>-<mã môn>.js"); process.exit(1); }
  // file câu hỏi
  let t = doc(fq);
  const entry = deJs(id, d.de, "  ");
  if (t == null) {
    t = `/* Câu hỏi các đề ${d.muc.subject} lớp ${d.muc.grade} có sẵn. Danh mục (tên, khối, môn, số phút, số câu): data/banks/index.js.
   App chỉ tải file này khi mở một đề trong đó. Dạng câu hỏi: xem đầu data/banks/index.js. */
window.ONTAP_SEED_QUESTIONS = Object.assign(window.ONTAP_SEED_QUESTIONS || {}, {
${d.chuThich ? chuThich(d.chuThich, "  ") : ""}${entry}
});
`;
    viec.push(`${id}: tạo file data/banks/${d.muc.file}`);
  } else {
    const co = timDe(t, id), cu = co ? tachDe(t.slice(co.dau, co.cuoi)) : null;
    if (co && cu && bang({ note: cu.obj.note, passages: cu.obj.passages || {}, questions: cu.obj.questions }, { note: d.de.note, passages: d.de.passages || {}, questions: d.de.questions }))
      viec.push(`${id}: đề trong data/banks/${d.muc.file} không đổi`);
    else if (co) {
      t = t.slice(0, co.dau) + deJs(id, d.de, "  ", cu).slice(2) + t.slice(co.cuoi);
      const doi = cu ? d.de.questions.filter((q) => !cu.obj.questions.some((x) => bang(x, q))).length : d.de.questions.length;
      viec.push(`${id}: thay đề trong data/banks/${d.muc.file} (${doi} câu mới hoặc đã sửa)`);
    }
    else {
      let sau = d.sau ? timDe(t, d.sau) : null;
      if (d.sau && !sau) viec.push(`${id}: (không thấy ${d.sau} trong ${d.muc.file}, ghi cuối file)`);
      if (!sau) { // đề cuối cùng của file
        const re = /\n {2}("[^"]+"): \{/g; let m, cuoi = null;
        while ((m = re.exec(t))) { const x = timDe(t, JSON.parse(m[1])); if (x) cuoi = x; }
        sau = cuoi;
      }
      if (!sau) { console.error(id + ": không tìm được chỗ ghi trong " + d.muc.file); process.exit(1); }
      t = t.slice(0, sau.cuoi) + ",\n" + (d.chuThich ? chuThich(d.chuThich, "  ") : "") + entry + t.slice(sau.cuoi);
      viec.push(`${id}: thêm đề vào data/banks/${d.muc.file}` + (d.sau ? ` sau ${d.sau}` : ""));
    }
  }
  moi.set(fq, t);
  // danh mục
  let ti = doc(IDX);
  const row = mucJs(d.muc), co = timMuc(ti, id);
  let cuMuc = null;
  if (co) try { cuMuc = require("vm").runInNewContext("(" + ti.slice(co.dau, co.cuoi) + ")"); } catch (e) { /* đọc không được thì viết lại */ }
  if (co && cuMuc && bang(cuMuc, JSON.parse(JSON.stringify(d.muc)))) viec.push(`${id}: dòng danh mục không đổi`);
  else if (co) { ti = ti.slice(0, co.dau - 2) + row + ti.slice(co.cuoi); viec.push(`${id}: thay dòng danh mục (n: ${d.muc.n})`); }
  else {
    // không ghi sau (hay không thấy): sau dòng cuối cùng của cùng file, cùng loại (đề cố định hay đề ngẫu nhiên), không có thì cùng file
    let sau = d.sau ? timMuc(ti, d.sau) : null;
    if (!sau) {
      const cung = D.kho().filter((b) => b.file === d.muc.file && !NHAP.some((x) => x.muc.id === b.id)), loai = cung.filter((b) => !!b.pool === !!d.muc.pool);
      (loai.length ? loai : cung).forEach((b) => { const x = timMuc(ti, b.id); if (x && (!sau || x.dau > sau.dau)) sau = x; });
    }
    const ct = d.chuThichMuc ? "\n" + chuThich(d.chuThichMuc, "  ").replace(/\n$/, "") : "";
    if (!sau) { const k = ti.lastIndexOf("\n];"); ti = ti.slice(0, k) + "," + ct + "\n" + row + ti.slice(k); }
    else {
      const phay = ti.indexOf(",", sau.cuoi), xuong = ti.indexOf("\n", sau.cuoi);
      if (phay >= 0 && phay < xuong) ti = ti.slice(0, phay + 1) + ct + "\n" + row + "," + ti.slice(phay + 1); // dòng sau còn dòng khác
      else ti = ti.slice(0, sau.cuoi) + "," + ct + "\n" + row + ti.slice(sau.cuoi); // dòng cuối danh mục
    }
    viec.push(`${id}: thêm dòng danh mục (n: ${d.muc.n})` + (d.sau ? ` sau ${d.sau}` : ""));
  }
  moi.set(IDX, ti);
  // lịch
  let tc = doc(CAL);
  d.ki.forEach((k) => {
    const m = new RegExp('\\{ id: ' + escRe(JSON.stringify(k)) + ",").exec(tc);
    if (!m) { console.error(id + ": không có kì thi " + k + " trong data/calendar-2026-2027.js"); process.exit(1); }
    const het = dong_ngoac(tc, m.index), b = tc.indexOf("banks: [", m.index);
    if (b < 0 || b > het) { console.error(id + ": kì thi " + k + " không có banks"); process.exit(1); }
    const mo = b + "banks: ".length, dg = dong_ngoac(tc, mo), mang = tc.slice(mo + 1, dg), co2 = [...mang.matchAll(/"([^"]+)"/g)].map((x) => x[1]);
    if (co2.includes(id)) return;
    let chen;
    if (d.sau && co2.includes(d.sau)) { const v = tc.indexOf(JSON.stringify(d.sau), mo) + JSON.stringify(d.sau).length; tc = tc.slice(0, v) + ", " + JSON.stringify(id) + tc.slice(v); chen = "sau " + d.sau; }
    else { tc = tc.slice(0, dg) + (co2.length ? ", " : "") + JSON.stringify(id) + tc.slice(dg); chen = "cuối"; }
    viec.push(`${id}: gắn vào banks của kì thi ${k} (${chen})`);
  });
  moi.set(CAL, tc);
});

viec.forEach((v) => console.log("· " + v));
if (opt.thu) { console.log("(--thu: chưa ghi file nào)"); process.exit(0); }
const ghi = (m) => m.forEach((t, f) => { if (t == null) { if (fs.existsSync(f)) fs.unlinkSync(f); } else fs.writeFileSync(f, t); });
ghi(moi);
// nạp lại như app, so với nháp
let sai = [];
try {
  const { napDe } = require("./nap-de.js"), kho = napDe(), lich = D.docLich();
  NHAP.forEach((d) => {
    const b = kho.find((x) => x.id === d.muc.id);
    if (!b) { sai.push(d.muc.id + ": không có trong danh mục sau khi ghép"); return; }
    const qs = (b.pool ? b.questions.filter((q) => q.src === b.id).map((q) => { const c = Object.assign({}, q); delete c.src; return c; }) : b.questions);
    if (JSON.stringify(sap(qs)) !== JSON.stringify(sap(d.de.questions))) sai.push(d.muc.id + ": câu hỏi nạp lại khác nháp");
    if ((b.note || null) !== (d.de.note == null ? null : d.de.note)) sai.push(d.muc.id + ": lời dặn nạp lại khác nháp");
    if (JSON.stringify(sap(b.passages || {})) !== JSON.stringify(sap(d.de.passages || {}))) sai.push(d.muc.id + ": đoạn đọc nạp lại khác nháp");
    ["title", "grade", "subject", "minutes", "n", "file", "pts"].forEach((k) => { if (JSON.stringify(b[k]) !== JSON.stringify(d.muc[k])) sai.push(`${d.muc.id}: ${k} trong danh mục là ${JSON.stringify(b[k])}, nháp ${JSON.stringify(d.muc[k])}`); });
    d.ki.forEach((k) => { const e = lich.find((x) => x.id === k); if (!e || !(e.banks || []).includes(d.muc.id)) sai.push(`${d.muc.id}: chưa gắn vào kì thi ${k}`); });
  });
} catch (e) { sai.push("nạp lại lỗi: " + e.message); }
if (sai.length) {
  ghi(goc);
  console.error("Ghép chưa đúng, đã trả lại các file như cũ:\n" + sai.join("\n"));
  process.exit(1);
}
console.log(`Đã ghép ${NHAP.length} đề, nạp lại khớp nháp. Tiếp theo: node tests/kiem-tra-de.js; script kiểm tra của môn; node tests/e2e.js.`);
