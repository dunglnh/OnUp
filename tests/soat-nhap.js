/* Soát nhanh đề nháp trước khi ghép vào data/banks/ (tests/README.md, mục 1, 2). Chạy khoảng 5 giây, nên viết nháp, soát, sửa nhiều lượt
   rồi mới ghép (tests/ghep-de.js) và chạy script kiểm tra của môn (mất một đến vài phút mỗi lần).
   node tests/soat-nhap.js <nháp.js> [<nháp khác.js> …] [--mon tests/<script của môn>.js] [--sach <phần đường dẫn cuốn>]… [--khong-sach]
                           [--giu-nguyen-am] [--sach6] [--in-da-xem] [--het]
     --mon: so chữ như script của môn: đọc tên riêng gộp thành một từ (GOP, TEN_RIENG), cụm bỏ qua (TU_CHUNG, TRICH; chỉ khi script dùng
            chúng lúc chuẩn hoá; danh sách dựng từ hằng khác như ...BAI thì đọc cả hằng đó), có gộp nguyên âm hay không, chuỗi 3 từ chung khi
            dò lộ (CUM_CHUNG), dòng dò lộ đã xem (DA_XEM, DA_XEM_CHU_DE); thiếu gì thì ghi vào gop, boQua, daXem của nháp. Không ghi --mon:
            gộp nguyên âm, bỏ cụm hỏi chung và tên các chủ đề của file;
     --sach: chỉ so với các cuốn có chữ đó trong đường dẫn (mặc định mọi cuốn, như script của môn); --khong-sach: không so với sách;
     --giu-nguyen-am: không gộp nguyên âm; --sach6: in thêm chuỗi 6 từ trùng sách để xem tay (như DO_SACH=1 của script môn);
     --in-da-xem: in từng dòng dò lộ để chép vào daXem; --het: in hết (mặc định mỗi nhóm 15 dòng).
   Cách viết file nháp: tests/README.md, mục 2 (docNhap của tests/de-chung.js). Đề nháp đã ghép rồi (mã có trong danh mục) thì bản trong
   data/banks/ không tính khi so, nên soát lại được sau khi ghép.
   Soát (Lỗi: script của môn, tests/kiem-tra-de.js hay script của môn khác sẽ báo, thoát với mã 1; Xem: nên đọc lại):
   1. Cấu trúc: mã, tên đề đúng quy ước, khối, file, kì thi, dạng câu và trường của từng dạng, mức độ, lời giải, đoạn đọc, câu trùng câu của
      mọi đề, đề tính điểm (pt, part), câu điền về số âm, đề Tiếng Anh không có chữ cái tiếng Việt; khung (phần, dạng, mức) so với đề cùng kì.
   2. Lựa chọn: đáp án đúng dài hơn hẳn lựa chọn sai, là lựa chọn dài nhất hay ngắn nhất ở quá một phần ba (Xem: dưới một phần sáu) số
      câu, là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn sai cùng mở đầu một chữ, nhắc vị trí phương án, kiểu Đ/S lặp.
   3. Trùng kho: đáp án trùng câu cùng chủ đề, chuỗi 6 từ của đề bài trùng câu cùng file, chuỗi 8 từ trùng câu của mọi kho; Xem: cặp hai
      âm tiết chung với câu của kì khác cùng file.
   4. Kho khác: chuỗi 8 từ chung với câu của kho khác theo cách chuẩn hoá của script giữ kho đó (script đó sẽ báo lỗi).
   5. Dò lộ đáp án: đáp án (chuỗi 3 từ, số) của mỗi câu có ở câu khác cùng đề (cả đoạn đọc, lời dặn) và ở câu cùng chủ đề trong cùng file
      (đề “Ôn chủ đề” rút chung), cả chiều ngược lại.
   6. Sách: chuỗi 8 từ trùng chữ OCR của sách ở ../OnUp-Book.
   Script của môn vẫn là bước kiểm tra cuối (tính lại đáp án, đọc hình, luật riêng của môn). */
"use strict";
const D = require("./de-chung.js");

const args = process.argv.slice(2), dsNhap = [], opt = { sach: [] };
for (let i = 0; i < args.length; i++) {
  const a = args[i];
  if (a === "--mon") opt.mon = args[++i];
  else if (a === "--sach") opt.sach.push(args[++i]);
  else if (a.startsWith("--")) opt[a.slice(2)] = true;
  else dsNhap.push(a);
}
if (!dsNhap.length) {
  console.log("Cách dùng: node tests/soat-nhap.js <nháp.js> … [--mon tests/<script môn>.js] [--sach <cuốn>] [--khong-sach] [--giu-nguyen-am] [--sach6] [--het]");
  process.exit(0);
}
const t0 = Date.now(), MAX = opt.het ? Infinity : 15;
const NHAP = dsNhap.flatMap((f) => D.docNhap(f));
const MA = new Set(NHAP.map((d) => d.muc.id));
if (MA.size !== NHAP.length) { console.error("Hai đề nháp cùng mã."); process.exit(1); }
const KHO = D.kho().filter((b) => !MA.has(b.id));
const DE_NHAP = NHAP.map((d) => Object.assign({}, d.muc, { note: d.de.note, passages: d.de.passages, questions: d.de.questions, _d: d }));
const CAU_KHO = D.cacCau(KHO);
const CAU_NHAP = DE_NHAP.flatMap((b) => b.questions.map((q, i) => ({ b, q, ma: b.id + "#" + (i + 1), so: i + 1, nhap: true })));
const CA = CAU_KHO.concat(CAU_NHAP);
const FILES = new Set(DE_NHAP.map((b) => b.file));

const BAO = new Map(NHAP.map((d) => [d.muc.id, { loi: [], xem: [] }]));
const loi = (id, nhom, s) => BAO.get(id).loi.push([nhom, s]);
const xem = (id, nhom, s) => BAO.get(id).xem.push([nhom, s]);

/* ---------- chữ ---------- */
const r2 = (x) => Math.round(x * 100) / 100;
const la25 = (x) => typeof x === "number" && x > 0 && Number.isInteger(r2(x * 4));
const coChu = (x) => typeof x === "string" && x.trim() !== "";
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const khoaCau = (q) => { // như tests/kiem-tra-de.js: bỏ dấu câu, khoảng trắng (dấu thanh, chữ hoa giữ nguyên), câu có lựa chọn so cả lựa chọn
  const k = (s) => String(s == null ? "" : s).normalize("NFC").replace(/[^\p{L}\p{N}]+/gu, "");
  const o = q.type === "match" ? (q.l || []).concat(q.r || []) : ["mc", "tf4", "order"].includes(q.type) ? q.o || [] : [];
  return k(q.q) + (o.length ? "|" + o.map(k).join("|") : "");
};
const cat = (s, n) => { s = String(s).replace(/\s+/g, " "); return s.length > (n || 90) ? s.slice(0, (n || 90) - 1) + "…" : s; };

/* ---------- 1. cấu trúc ---------- */
const KHOI = D.docKhoi(), LICH = D.docLich();
const KI_TEN = ["Giữa kì I", "Cuối kì I", "Giữa kì II", "Cuối năm", "Thi thử vào 10", "Thi thử tốt nghiệp"];
const DANG = ["mc", "tf", "fill", "tf4", "num", "match", "order", "essay"];
const SO = /^[-−–]?\s*\d[\d\s.,]*$/, SO_AM = /^\(?\s*[-−–]\s*\d/, SO_AM_TRONG_DE = /(^|[\s([])[-−]\d/;
const CHU_VIET = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/iu;
const TU_CO_DAU = ["café", "cafés", "cliché", "fiancé", "fiancée", "résumé", "naïve", "façade", "crème"];
const chuViet = (s) => [...new Set(String(s).normalize("NFC").split(/\s+/).map((w) => w.replace(/^[^\p{L}]+|[^\p{L}]+$/gu, ""))
  .filter((w) => CHU_VIET.test(w) && !TU_CO_DAU.includes(w.toLowerCase())))];
const tiengAnh = (s) => /^(tieng anh|english)$/.test(D.boDau(s));
const KHOA_KHO = new Map(CAU_KHO.map((e) => [khoaCau(e.q), e.ma]));

DE_NHAP.forEach((b) => {
  const d = b._d, id = b.id, L = (s) => loi(id, "cấu trúc", s), X = (s) => xem(id, "cấu trúc", s);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(id || "")) L(`mã đề “${id}”: chỉ chữ thường không dấu, số, gạch nối`);
  if (!KHOI.some((g) => g.grade === b.grade)) L(`khối ${JSON.stringify(b.grade)} không có trong data/grades.js`);
  const t = String(b.title || "").split(" · "), dau = `${b.subject} ${b.grade}`;
  if (t.length !== 3 || t[0] !== dau || !KI_TEN.includes(t[1]) || !(b.pool ? t[2] === "Đề ngẫu nhiên" : /^Đề \d+$/.test(t[2])))
    L(`tên đề “${b.title}”: cần “${dau} · <kì> · ${b.pool ? "Đề ngẫu nhiên" : "Đề N"}” (kì: ${KI_TEN.join(", ")})`);
  const soMa = /-de(\d+)$/.exec(id || ""), soTen = /^Đề (\d+)$/.exec(t[2] || "");
  if (soMa && soTen && soMa[1] !== soTen[1]) L(`mã đề ghi Đề ${soMa[1]}, tên ghi Đề ${soTen[1]}`);
  const trungTen = KHO.find((x) => x.title === b.title);
  if (trungTen) L(`tên đề trùng đề ${trungTen.id}`);
  if (!/^\d+-[a-z0-9]+\.js$/.test(b.file || "") || !String(b.file).startsWith(b.grade + "-")) L(`file “${b.file}”: cần “${b.grade}-<mã môn>.js”`);
  const cungFile = KHO.filter((x) => x.file === b.file), cungMon = KHO.filter((x) => x.grade === b.grade && x.subject === b.subject);
  if (cungFile.some((x) => x.subject !== b.subject)) L(`file ${b.file} là của môn ${cungFile.find((x) => x.subject !== b.subject).subject}`);
  if (!cungFile.length && cungMon.length) L(`môn ${b.subject} lớp ${b.grade} đang ở file ${cungMon[0].file}`);
  if (!cungFile.length && !cungMon.length) X(`file mới ${b.file} (tests/ghep-de.js tạo file)`);
  if (!(typeof b.minutes === "number" && b.minutes >= 5 && b.minutes <= 180)) L(`số phút ${JSON.stringify(b.minutes)}`);
  if (b.pts != null && (!la25(b.pts) || b.pool)) L(`pts ${JSON.stringify(b.pts)}: số dương bội của 0,25, không đi với pool`);
  if (b.pool) {
    const from = (b.pool.from || []).filter((x) => !MA.has(x)), thieu = from.filter((x) => !KHO.some((k) => k.id === x));
    if (thieu.length) L(`pool.from có đề không có trong danh mục: ${thieu.join(", ")}`);
  }
  d.ki.forEach((k) => {
    const e = LICH.find((x) => x.id === k);
    if (!e) L(`kì thi “${k}” không có trong data/calendar-2026-2027.js`);
    else if (!(e.grades || []).includes(b.grade)) L(`kì thi ${k} không có khối ${b.grade}`);
  });
  if (!d.ki.length) X("chưa gắn kì thi nào (ki)");
  if (d.sau && !KHO.some((x) => x.id === d.sau) && !MA.has(d.sau)) L(`sau: “${d.sau}” không có trong danh mục`);
  if (!coChu(b.note)) X("đề chưa có lời dặn (note hoặc noteTu)");

  const qs = b.questions, ps = b.passages || {}, dung = new Set(), khoa = new Map();
  qs.forEach((q, i) => {
    const E = (s) => L(`#${i + 1}: ${s}`);
    if (!q || !DANG.includes(q.type)) return E(`dạng câu “${q && q.type}” không có (${DANG.join(", ")})`);
    if (!coChu(q.topic)) E("thiếu chủ đề (topic)");
    if (!coChu(q.q)) E("thiếu đề bài (q)");
    if (!coChu(q.x)) E("thiếu lời giải (x)");
    if (![1, 2, 3].includes(q.lv)) E(`mức độ lv = ${JSON.stringify(q.lv)}, cần 1, 2 hoặc 3`);
    if (q.p != null) { if (!ps[q.p]) E(`đoạn đọc “${q.p}” không có trong passages`); else dung.add(q.p); }
    if (q.type === "mc") {
      if (!Array.isArray(q.o) || q.o.length < 2 || !q.o.every(coChu)) E("câu nhiều lựa chọn cần o: ít nhất 2 lựa chọn, đáp án đúng đứng đầu");
      else if (new Set(q.o).size !== q.o.length) E("hai lựa chọn trùng nhau");
    }
    if (q.type === "tf4") {
      if (!Array.isArray(q.o) || q.o.length !== 4 || !q.o.every(coChu) || new Set(q.o).size !== 4) E("câu đúng/sai 4 ý cần o: 4 ý không trùng");
      if (!Array.isArray(q.a) || q.a.length !== 4 || !q.a.every((x) => typeof x === "boolean")) E("câu đúng/sai 4 ý cần a: 4 giá trị true/false");
    }
    if (q.type === "tf" && typeof q.a !== "boolean") E("câu đúng/sai cần a: true hoặc false");
    if (q.type === "fill") {
      const n = (String(q.q).match(/___/g) || []).length, ans = [].concat(q.ans == null ? [] : q.ans).map(String);
      if (n !== 1) E(`câu điền cần đúng một chỗ trống ___ (đang ${n})`);
      if (!ans.length || !ans.every(coChu)) E("câu điền cần ans");
      else if (ans.some((a) => SO_AM.test(a.trim())) || (ans.every((a) => SO.test(a.trim())) && SO_AM_TRONG_DE.test(q.q))) E("câu về số âm dùng câu trả lời bằng số hoặc trắc nghiệm (L33)");
    }
    if (q.type === "num") {
      const ok = typeof q.ans === "number" ? isFinite(q.ans) : /^[-−]?\d+\/[1-9]\d*$/.test(String(q.ans));
      if (!ok) E(`câu trả lời bằng số cần ans là số hoặc "a/b" (đang ${JSON.stringify(q.ans)})`);
      if (q.tol != null && !(typeof q.tol === "number" && q.tol >= 0)) E("tol phải là số không âm");
    }
    if (q.type === "match" && !(Array.isArray(q.l) && Array.isArray(q.r) && q.l.length >= 2 && q.r.length >= q.l.length && q.l.concat(q.r).every(coChu)))
      E("câu nối cột cần l, r (r ít nhất bằng l, ô thừa ở cuối r)");
    if (q.type === "order" && !(Array.isArray(q.o) && q.o.length >= 3 && q.o.length <= 8 && new Set(q.o).size === q.o.length)) E("câu sắp xếp cần o: 3–8 ô không trùng, theo thứ tự đúng");
    if (q.type === "essay" && !(Array.isArray(q.rubric) && q.rubric.length && q.rubric.every((r) => r && coChu(r.c) && la25(+r.p)))) E("câu tự luận cần rubric: [{ c, p }], p là bội của 0,25");
    if (q.svg != null && !/^<svg[\s>]/.test(String(q.svg).trim())) E("svg phải là chuỗi <svg …>");
    if (!b.pts && (q.pt != null || q.part != null)) E("pt, part chỉ dùng ở đề tính điểm (pts)");
    const k = khoaCau(q);
    if (khoa.has(k)) E(`trùng câu #${khoa.get(k)}`); else khoa.set(k, i + 1);
    if (KHOA_KHO.has(k)) E(`trùng câu ${KHOA_KHO.get(k)}`);
  });
  Object.keys(ps).forEach((k) => {
    if (!dung.has(k)) L(`đoạn đọc “${k}” không có câu nào dùng`);
    if (!ps[k] || !(coChu(ps[k].text) || coChu(ps[k].svg))) L(`đoạn đọc “${k}” thiếu text`);
    KHO.forEach((x) => { if (x.passages && x.passages[k] && x.file === b.file) L(`mã đoạn đọc “${k}” trùng đoạn của ${x.id}`); });
  });
  // đề tính điểm (như soatDiem của tests/kiem-tra-de.js)
  if (b.pts) {
    qs.forEach((q, i) => {
      if (!la25(q.pt)) L(`#${i + 1}: pt = ${JSON.stringify(q.pt)}, cần số lớn hơn 0, bội của 0,25`);
      else if (q.type === "tf4" && q.pt !== 1) L(`#${i + 1}: câu đúng/sai 4 ý có pt 1`);
      else if (q.type === "essay" && Array.isArray(q.rubric) && r2(q.rubric.reduce((a, c) => a + (+c.p || 0), 0)) !== q.pt) L(`#${i + 1}: pt khác tổng thang chấm`);
    });
    const tong = r2(qs.reduce((a, q) => a + (typeof q.pt === "number" ? q.pt : 0), 0));
    if (tong !== b.pts) L(`tổng pt của các câu là ${tong}, cần bằng pts = ${b.pts}`);
    const coPart = qs.filter((q) => q.part != null).length;
    if (coPart && coPart !== qs.length) L(`${coPart}/${qs.length} câu có part: ghi cho mọi câu hoặc không câu nào`);
    const lien = (f, ten) => { const gap = new Set(); let truoc; qs.forEach((q, i) => { const v = f(q); if (v == null) { truoc = v; return; } if (v !== truoc && gap.has(v)) L(`#${i + 1}: câu cùng ${ten} “${cat(v, 40)}” không đứng liền nhau`); gap.add(v); truoc = v; }); };
    lien((q) => q.part, "phần"); lien((q) => q.p, "đoạn đọc");
    qs.forEach((q, i) => { const j = qs.findIndex((x) => x.p != null && x.p === q.p); if (q.p != null && qs[j].part !== q.part) L(`#${i + 1}: câu cùng đoạn đọc khác phần`); });
  }
  // đề Tiếng Anh: không có chữ cái tiếng Việt ở mọi trường chữ
  if (tiengAnh(b.subject)) {
    if (b.note) { const v = chuViet(b.note); if (v.length) L(`note có chữ tiếng Việt: ${v.slice(0, 5).join(", ")}`); }
    Object.entries(ps).forEach(([k, p]) => { const v = chuViet((p.title || "") + " " + (p.text || "")); if (v.length) L(`đoạn đọc ${k} có chữ tiếng Việt: ${v.slice(0, 5).join(", ")}`); });
    qs.forEach((q, i) => { const v = chuViet([q.topic].concat(D.chuCau(q)).join(" ")); if (v.length) L(`#${i + 1}: có chữ tiếng Việt: ${v.slice(0, 5).join(", ")}`); });
  }
  // khung so với các đề cùng kì: số câu theo (phần, dạng, mức)
  const khung = (ds) => { const m = {}; ds.forEach((q) => { const k = `${q.part || ""}|${q.type}|${q.lv}`; m[k] = (m[k] || 0) + 1; }); return m; };
  const viet = (m) => Object.keys(m).sort().map((k) => { const [p, t, l] = k.split("|"); return `${p ? cat(p, 12) + " " : ""}${t} mức ${l}: ${m[k]}`; }).join("; ");
  const anh = KHO.filter((x) => D.kiCua(x.id) === D.kiCua(id) && x.id !== id && !x.pool && !b.pool);
  if (anh.length) {
    const cua = viet(khung(qs)), cac = [...new Set(anh.map((x) => viet(khung(x.questions))))];
    if (!cac.includes(cua)) X(`khung khác các đề cùng kì (${anh.map((x) => x.id).join(", ")}):\n      nháp: ${cua}\n      ${anh[0].id}: ${viet(khung(anh[0].questions))}`);
  }
});

/* ---------- 2. lựa chọn (như các script của môn) ---------- */
const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
const KIEU_ANH = {}; // kiểu Đ/S của các đề thi thử cùng kì (mỗi kiểu nhiều nhất ba lần)
DE_NHAP.forEach((b) => {
  const id = b.id, L = (s) => loi(id, "lựa chọn", s), X = (s) => xem(id, "lựa chọn", s), qs = b.questions;
  qs.forEach((q, i) => {
    const at = `#${i + 1}`;
    if (/(phương án|lựa chọn|đáp án) (thứ|số) (nhất|hai|ba|tư|\d)|(phương án|đáp án) [A-D]\b/i.test([q.x].concat(q.o || []).join(" "))) L(`${at}: nhắc vị trí của phương án (app xáo phương án)`);
    if (q.type !== "mc" || !Array.isArray(q.o) || q.o.length < 2) return;
    const dai = Math.max(...q.o.slice(1).map((o) => o.length));
    if (q.o[0].length > Math.max(1.2 * dai, dai + 8)) L(`${at}: đáp án đúng dài hơn hẳn lựa chọn sai (${q.o[0].length} kí tự, lựa chọn sai dài nhất ${dai})`);
    const c = chuThuong(String(q.topic).replace(/^Lớp \d+ · /, ""));
    const tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|lên|giữa|từ|đến|năm|nay|sau|the|of|and|in|a|an|to)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); if (co[0] && !co.slice(1).some(Boolean)) L(`${at}: chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    if (q.o.length >= 4 && dau.slice(1).every((x) => x === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1) L(`${at}: ba lựa chọn sai cùng mở đầu bằng “${dau[1]}”, đáp án đúng thì không`);
  });
  const mc = qs.filter((q) => q.type === "mc" && Array.isArray(q.o) && q.o.length > 1 && new Set(q.o.map((o) => o.length)).size > 1);
  const hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  const dai = mc.filter((q) => hon(q, (a, x) => a > x)), ngan = mc.filter((q) => hon(q, (a, x) => a < x));
  const so = (ds) => ds.map((q) => "#" + (qs.indexOf(q) + 1)).join(" ");
  if (mc.length) {
    if (dai.length * 3 > mc.length || ngan.length * 3 > mc.length) L(`đáp án đúng dài nhất ở ${dai.length} câu (${so(dai)}), ngắn nhất ở ${ngan.length} câu (${so(ngan)}) trong ${mc.length} câu nhiều lựa chọn: mỗi loại không quá ${Math.floor(mc.length / 3)}`);
    else if ((dai.length + ngan.length) * 6 < mc.length) X(`đáp án đúng dài nhất hay ngắn nhất ở ${dai.length + ngan.length}/${mc.length} câu nhiều lựa chọn: nhiều script môn cần từ ${Math.ceil(mc.length / 6)} câu`);
  }
  const kieu = qs.filter((q) => q.type === "tf4" && Array.isArray(q.a)).map((q) => q.a.map((a) => (a ? "Đ" : "S")).join(""));
  if (new Set(kieu).size !== kieu.length) L(`kiểu Đ/S của các câu đúng/sai 4 ý lặp: ${kieu.join(", ")}`);
  if (/-(tn|vao10)-de\d+$/.test(id)) kieu.forEach((k) => { const ki = D.kiCua(id); (KIEU_ANH[ki] = KIEU_ANH[ki] || {})[k] = ((KIEU_ANH[ki] || {})[k] || 0) + 1; });
});
// đề thi thử: mỗi kiểu Đ/S nhiều nhất ba lần trong các đề cùng kì (cả đề đã có)
Object.keys(KIEU_ANH).forEach((ki) => {
  KHO.filter((x) => D.kiCua(x.id) === ki && /-de\d+$/.test(x.id)).forEach((x) => x.questions.filter((q) => q.type === "tf4").forEach((q) => {
    const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); KIEU_ANH[ki][k] = (KIEU_ANH[ki][k] || 0) + 1;
  }));
  Object.entries(KIEU_ANH[ki]).filter(([, n]) => n > 3).forEach(([k, n]) => DE_NHAP.filter((b) => D.kiCua(b.id) === ki && b.questions.some((q) => q.type === "tf4" && q.a.map((a) => (a ? "Đ" : "S")).join("") === k))
    .forEach((b) => loi(b.id, "lựa chọn", `kiểu Đ/S ${k} dùng ${n} lần trong các đề ${ki}-de… (nhiều nhất 3)`)));
});

/* ---------- chuẩn hoá để so chuỗi từ (như khongDau của các script môn) ---------- */
const fs = require("fs"), path = require("path");
// cách chuẩn hoá của một script môn, như hàm khongDau của script đó: tên riêng gộp thành một từ (GOP, TEN_RIENG), cụm bỏ qua (TU_CHUNG,
// TRICH; chỉ khi script dùng chúng lúc chuẩn hoá), có gộp nguyên âm hay không; danh sách dựng từ hằng khác (...BAI) đọc cả hằng đó
function cachCuaScript(file) {
  const src = fs.readFileSync(file, "utf8"), doc = (ten) => D.docMangSau(file, ten);
  return {
    gop: [].concat(/\bGOP_?\.forEach\(/.test(src) ? doc("GOP") : [], /\bTEN_RIENG\.forEach\(/.test(src) ? doc("TEN_RIENG") : []),
    bo: [].concat(/\bTU_CHUNG_?\.forEach\(/.test(src) ? doc("TU_CHUNG") : [], /\bTRICH\.(reduce|forEach)\(/.test(src) ? doc("TRICH") : []),
    nguyenAm: /\[aeiouy\]\+/.test(src),
  };
}
const MON_CACH = opt.mon ? cachCuaScript(opt.mon) : null;
const GOP = [...new Set(NHAP.flatMap((d) => d.gop).concat(MON_CACH ? MON_CACH.gop : []))];
const CUM_HOI = ["mỗi ý sau đúng hay sai", "nào sau đây", "sắp xếp các sự kiện sau theo trình tự thời gian", "đọc đoạn tư liệu",
  "đọc đoạn thông tin", "đọc đoạn văn", "đọc đoạn trích", "đọc văn bản", "tư liệu người soạn viết", "người soạn viết", "theo đoạn tư liệu", "theo đoạn văn",
  "chọn đáp án đúng", "choose the correct answer", "read the passage", "according to the passage"];
const tenChuDe = (files) => CA.filter((e) => files.has(e.b.file)).map((e) => String(e.q.topic).replace(/^Lớp \d+ · /, ""));
// cụm bỏ qua khi so chuỗi 8 từ, chuỗi 6 từ: boQua của nháp và cụm của script môn (--mon); không ghi --mon thì cụm hỏi chung và tên chủ đề
const BO_QUA = [...new Set(NHAP.flatMap((d) => d.boQua).concat(MON_CACH ? MON_CACH.bo : CUM_HOI.concat(tenChuDe(FILES))))];
const NGUYEN_AM = !opt["giu-nguyen-am"] && (MON_CACH ? MON_CACH.nguyenAm : true);
const CAY = D.cayTen(GOP, BO_QUA), CACH = { cay: CAY, nguyenAm: NGUYEN_AM };
const tuChuan = D.ghiNho((s) => D.tuChuan(s, CACH));
const ma2de = new Map(CA.map((e) => [e.ma, e.b.id]));
// trường chữ của đề nháp: { id, ma, tr, s } (deBai: chỉ đề bài; coNote: cả lời dặn)
function truongNhap(deBai, coNote) {
  const ra = [];
  if (!deBai) DE_NHAP.forEach((b) => {
    if (coNote && b.note) ra.push({ id: b.id, ma: b.id, tr: "lời dặn", s: b.note });
    Object.entries(b.passages || {}).forEach(([p, d]) => ra.push({ id: b.id, ma: b.id, tr: "đoạn " + p, s: (d.title || "") + " " + (d.text || "") }));
  });
  CAU_NHAP.forEach((e) => (deBai ? [["q", e.q.q]] : D.truongCau(e.q)).forEach(([tr, s]) => ra.push({ id: e.b.id, ma: e.ma, tr, s })));
  return ra;
}
// chuỗi k từ của các trường (cách chuẩn hoá cach) → Map chuỗi → [{ r, i }]; r có thêm goc, w, vt để in lại đoạn chữ gốc
function canCua(ds, k, cach, it) {
  const m = new Map();
  ds.forEach((r0) => {
    const r = Object.assign({}, r0, D.tuViTri(r0.s, cach));
    for (let i = 0; i + k <= r.w.length; i++) {
      const c = r.w.slice(i, i + k);
      if (c.includes("|") || c.filter((x) => /[a-z]{2}/.test(x)).length < (it == null ? Math.min(5, k) : it)) continue;
      const key = c.join(" ");
      if (!m.has(key)) m.set(key, []);
      m.get(key).push({ r, i });
    }
  });
  return m;
}
// gom chỗ trùng: các chuỗi chồng nhau của cùng một trường thành một đoạn chữ gốc → [{ r, doan, nguon: [mã nguồn] }]
function gomDoan(gap, can, k, bo) {
  const theoR = new Map();
  gap.forEach((ids, c) => can.get(c).forEach(({ r, i }) => {
    const ns = [...ids].filter((x) => !(bo && bo(r, x)));
    if (!ns.length) return;
    if (!theoR.has(r)) theoR.set(r, new Map());
    const m = theoR.get(r); if (!m.has(i)) m.set(i, new Set()); ns.forEach((x) => m.get(i).add(x));
  }));
  const ra = [];
  theoR.forEach((m, r) => {
    let dau = null, cuoi = -1, ns = null;
    const xong = () => { if (dau != null) ra.push({ r, doan: r.goc.slice(r.vt[dau][0], r.vt[cuoi - 1][1]), nguon: [...ns] }); };
    [...m.keys()].sort((a, b) => a - b).forEach((i) => {
      if (dau != null && i <= cuoi) { cuoi = Math.max(cuoi, i + k); m.get(i).forEach((x) => ns.add(x)); }
      else { xong(); dau = i; cuoi = i + k; ns = new Set(m.get(i)); }
    });
    xong();
  });
  return ra;
}
const dsNguon = (ns, n) => ns.slice(0, n || 3).join(", ") + (ns.length > (n || 3) ? ` (+${ns.length - (n || 3)})` : "");
// nguồn để so: mỗi câu của kho và đề nháp (các trường nối bằng dấu ngăn), mỗi đoạn đọc một lần
function nguonKho(tu, ds) {
  const ra = [], doan = new Set();
  (ds || CA).forEach((e) => {
    ra.push({ id: e.ma, de: e.b.id, w: D.truongCau(e.q).flatMap(([, v]) => tu(v).concat("|")) });
    const d = D.doanCua(e.b, e.q), k = e.b.id + " đoạn " + e.q.p;
    if (d && !doan.has(k)) { doan.add(k); ra.push({ id: k, de: e.b.id, w: tu((d.title || "") + " " + (d.text || "")) }); }
  });
  return ra;
}

/* ---------- 3. trùng kho ---------- */
{
  // đáp án trùng câu cùng chủ đề (câu nhiều lựa chọn)
  const dapAnCD = new Map();
  CA.forEach((e) => { if (e.q.type !== "mc" || !Array.isArray(e.q.o)) return; const k = e.q.topic + "|" + gocChu(e.q.o[0]); if (!dapAnCD.has(k)) dapAnCD.set(k, []); dapAnCD.get(k).push(e); });
  CAU_NHAP.forEach((e) => { if (e.q.type !== "mc" || !Array.isArray(e.q.o)) return; dapAnCD.get(e.q.topic + "|" + gocChu(e.q.o[0])).filter((x) => x.b.id !== e.b.id)
    .forEach((x) => loi(e.b.id, "trùng kho", `${e.ma}: đáp án “${cat(e.q.o[0], 50)}” trùng câu cùng chủ đề ${x.ma}`)); });
  // chuỗi 6 từ của đề bài trùng đề bài câu cùng file (cả đề nháp khác)
  const can6 = canCua(truongNhap(true), 6, CACH);
  const nguon6 = CA.filter((e) => FILES.has(e.b.file)).map((e) => ({ id: e.ma, w: tuChuan(e.q.q) }));
  gomDoan(D.timChuoi(nguon6, 6, can6), can6, 6, (r, x) => ma2de.get(x) === r.id)
    .forEach((g) => loi(g.r.id, "trùng kho", `${g.r.ma}: đề bài có chuỗi 6 từ trùng đề bài ${dsNguon(g.nguon)}: “${cat(g.doan, 110)}”`));
  // cặp hai âm tiết liền nhau chung với câu của kì khác cùng file (như các script môn: từ 4 cặp và từ một nửa số cặp của câu ít cặp hơn;
  // không tính cặp có số, chữ đơn, cặp của nhãn chủ đề, cụm hỏi chung (CUM của script môn nếu có) và cặp có ở từ 3% số câu của file).
  // Mỗi script tính hơi khác (câu nào đem so, cụm nào bỏ), nên chỉ ghi vào mục Xem: script của môn báo thì sửa.
  const cumMon = D.docMang(opt.mon, "CUM"), CUM2 = cumMon.coDinhNghia ? cumMon : CUM_HOI;
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM2.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean);
    return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  FILES.forEach((f) => {
    const ca = CA.filter((e) => e.b.file === f), df = {};
    ca.forEach((e) => new Set(cap2(e.q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
    const capAm = new Map();
    const capCua = (e) => { if (capAm.has(e)) return capAm.get(e); const nhan = new Set(cap2(e.q.topic));
      const v = new Set(cap2([e.q.q].concat(e.q.o || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); capAm.set(e, v); return v; };
    CAU_NHAP.filter((e) => e.b.file === f).forEach((e) => {
      const c = capCua(e);
      ca.filter((x) => D.kiCua(x.b.id) !== D.kiCua(e.b.id)).forEach((x) => {
        const d = capCua(x), chung = [...c].filter((y) => d.has(y));
        if (chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) xem(e.b.id, "trùng kho", `${e.ma} gần trùng ${x.ma} (cặp hai âm tiết chung): ${chung.join(", ")}`);
      });
    });
  });
  // chuỗi 8 từ trùng câu của mọi kho (cả đoạn đọc), mọi đề nháp khác
  const can8 = canCua(truongNhap(false, true), 8, CACH), nguon8 = nguonKho(tuChuan), deCua = new Map(nguon8.map((x) => [x.id, x.de]));
  gomDoan(D.timChuoi(nguon8, 8, can8), can8, 8, (r, x) => deCua.get(x) === r.id)
    .forEach((g) => loi(g.r.id, "trùng kho", `${g.r.ma} ${g.r.tr}: chuỗi 8 từ trùng ${dsNguon(g.nguon)}: “${cat(g.doan, 110)}”`));
}

/* ---------- 3b. script của môn khác sẽ báo ----------
   Mỗi script kiểm tra đề có bước “chuỗi 8 từ trùng câu của kho khác” so câu của kho mình với câu của mọi kho khác, bằng GOP, TU_CHUNG của
   chính script đó; câu mới có chuỗi 8 từ chung với câu của kho kia làm script kia báo lỗi dù script của môn mình không báo (tên riêng, cụm
   chung mỗi script gộp một khác; Rút ra từ việc làm công cụ làm đề ở mục 3.5 của docs/KE-HOACH-NOI-DUNG.md). Tìm cặp (trường nháp, câu kho) có chuỗi 8 từ chung theo cách chuẩn hoá trơn (bỏ dấu,
   gộp nguyên âm, không gộp tên), rồi xét lại cặp đó bằng danh sách của từng script giữ kho kia (theo tên script: lsdl-gdcd9-ck1.js giữ
   lsdl9-ck1-…, gdcd9-ck1-…; không đoán được theo tên thì script có ghi tiền tố mã đề đó). */
let soScript = 0;
{
  const THU = path.join(D.ROOT, "tests"), monTen = opt.mon ? path.basename(opt.mon) : null;
  const SC = fs.readdirSync(THU).filter((f) => f.endsWith(".js") && f !== monTen).map((f) => ({ f, src: fs.readFileSync(path.join(THU, f), "utf8") }))
    .filter((s) => s.src.includes("chuỗi 8 từ trùng câu của kho khác"));
  soScript = SC.length;
  SC.forEach((s) => {
    const m = /^([a-z]+(?:-[a-z]+)*?)(\d+)-([a-z0-9]+)\.js$/.exec(s.f);
    s.tien = m ? m[1].split("-").map((p) => p + m[2] + "-" + m[3]) : [];
    // script chỉ so với kho của file khác (BANKS.filter((b) => … !MON.some((m) => m.file === b.file) …), b.file !== FILE)
    s.boFile = /BANKS\.filter\(\(b\) => [^\n;]*(!MON\.some\(\(m\) => m\.file === b\.file\)|b\.file !== (FILE|"))/.test(s.src);
  });
  const chuCua = new Map();
  const chuScript = (id) => {
    if (!chuCua.has(id)) {
      const ki = D.kiCua(id), theoTen = SC.filter((s) => s.tien.includes(ki));
      chuCua.set(id, theoTen.length ? theoTen : SC.filter((s) => s.src.includes(ki + "-") || s.src.includes(ki + "\"")));
    }
    return chuCua.get(id);
  };
  const cachCua = new Map();
  const cachScript = (s) => {
    if (!cachCua.has(s.f)) {
      const c = cachCuaScript(path.join(THU, s.f)), cach = { cay: D.cayTen(c.gop, c.bo), nguyenAm: c.nguyenAm };
      cachCua.set(s.f, { cach, tu: D.ghiNho((x) => D.tuChuan(x, cach)) });
    }
    return cachCua.get(s.f);
  };
  const TRON = { nguyenAm: true }, tron = D.ghiNho((x) => D.tuChuan(x, TRON));
  const can = canCua(truongNhap(false, false), 8, TRON, 0), nguon = nguonKho(tron, CAU_KHO), theoId = new Map(nguon.map((x) => [x.id, x]));
  const cap = new Map(); // r → Set mã nguồn
  D.timChuoi(nguon, 8, can).forEach((ids, c) => can.get(c).forEach(({ r }) => ids.forEach((x) => { if (!cap.has(r)) cap.set(r, new Set()); cap.get(r).add(x); })));
  const bao = new Map();
  cap.forEach((xs, r) => xs.forEach((x) => {
    const n = theoId.get(x);
    chuScript(n.de).forEach((s) => {
      if (s.boFile && KHO.find((b) => b.id === n.de).file === DE_NHAP.find((b) => b.id === r.id).file) return;
      const { tu } = cachScript(s);
      const a = new Set(D.chuoiTu(tu(r.s), 8)), b = D.chuoiTu(n.id.includes(" đoạn ") ? tu(nguonGoc(n.id)) : D.truongCau(cauCua(n.id)).flatMap(([, v]) => tu(v).concat("|")), 8);
      const chung = b.filter((c) => a.has(c));
      if (!chung.length) return;
      const k = r.id + "|" + r.ma + "|" + r.tr + "|" + s.f;
      if (!bao.has(k)) bao.set(k, { r, s, ds: new Set(), c: chung[0] });
      bao.get(k).ds.add(x);
    });
  }));
  bao.forEach(({ r, s, ds, c }) => loi(r.id, "kho khác", `${r.ma} ${r.tr}: tests/${s.f} sẽ báo chuỗi 8 từ trùng ${dsNguon([...ds])}: “${c}” (theo cách chuẩn hoá của script đó)`));
}
function cauCua(ma) { return CA.find((e) => e.ma === ma).q; }
function nguonGoc(id) { const [de, p] = id.split(" đoạn "), b = KHO.find((x) => x.id === de), d = b.passages[p]; return (d.title || "") + " " + (d.text || ""); }

/* ---------- 4. dò lộ đáp án (như doLo của tests/lichsu12-tn.js, tests/sinhhoc12-tn.js) ----------
   Đáp án của câu A (lựa chọn đúng của câu nhiều lựa chọn, cách viết của câu điền) tách thành chuỗi 3 từ (đáp án từ 3 từ trở xuống thì lấy
   cả đáp án), bỏ chuỗi có ở từ hai lựa chọn sai của A, bỏ chuỗi 3 từ chung của môn (CUM_CHUNG của script môn) khi đáp án dài hơn 3 từ;
   chuỗi có trong đề bài, lựa chọn, lời giải, đoạn đọc của câu B (hay lời dặn của đề) thì báo “B → A: chuỗi”. Đáp án là số (năm, số đo) tìm
   ở vị trí kết quả của câu kia (sau “=”, “là”, “bằng”, “được”, “vào năm”, “năm”). Cặp (A, B): cùng đề nháp, hoặc cùng chủ đề (một câu là
   câu nháp; đề “Ôn chủ đề” rút câu của các đề cùng file). Câu cùng đoạn đọc không tính đoạn đọc chung. */
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/[\]{}]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?";
const KQ = new RegExp("(?:=|(?:^|[\\s(])(?:là|bằng|được|vào năm|năm))\\s+(" + NUM + ")(?![\\d,])", "gu");
const giaTri = (s) => parseFloat(String(s).replace(/\s/g, "").replace("−", "-").replace(",", "."));
const CUM_CHUNG = new Set(D.docMang(opt.mon, "CUM_CHUNG"));
const tienTo = (() => { // tiền tố chung của mã đề trong file (DA_XEM của script môn thường ghi tên bỏ tiền tố này)
  const ids = KHO.filter((b) => FILES.has(b.file)).map((b) => b.id).concat([...MA]);
  let p = ids[0] || ""; ids.forEach((x) => { while (!x.startsWith(p)) p = p.slice(0, -1); });
  return p.slice(0, p.lastIndexOf("-") + 1);
})();
const rutTen = (ma) => (tienTo && ma.startsWith(tienTo) ? ma.slice(tienTo.length) : ma);
const DA_XEM = new Set(NHAP.flatMap((d) => d.daXem).concat(D.docMang(opt.mon, "DA_XEM"), D.docMang(opt.mon, "DA_XEM_CHU_DE")));
const DONG_LO = []; // từng dòng “B → A: chuỗi” (in bằng --in-da-xem)
{
  const dap = (e) => { // { chu: [chuỗi], so: [số] }
    const q = e.q;
    if (q.type === "mc" && Array.isArray(q.o)) {
      const a = String(q.o[0]).trim();
      if (/^[−-]?\d[\d\s]*(,\d+)?$/.test(a)) return { chu: [], so: [giaTri(a)] };
      if (/^\d(, \d)+$/.test(a)) return { chu: [], so: [] }; // thứ tự “2, 1, 4, 3” của câu sắp xếp sự kiện
      const c3 = cum3(a), sai = q.o.slice(1).map((o) => " " + tuCua(o).join(" ") + " ");
      return { chu: [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)].filter((c) => sai.filter((o) => o.includes(" " + c + " ")).length < 2), so: [] };
    }
    if (q.type === "fill") { const ans = [].concat(q.ans || []).map(String); return { chu: ans.filter((a) => !SO.test(a.trim())).map((a) => tuCua(a).join(" ")).filter(Boolean), so: ans.filter((a) => SO.test(a.trim())).map(giaTri) }; }
    if (q.type === "num" && typeof q.ans === "number") return { chu: [], so: [q.ans] };
    return { chu: [], so: [] };
  };
  const chuB = (b, a) => { // chữ của câu B khi hiện cùng câu A (bỏ đoạn đọc chung)
    if (b.loi) return [b.loi];
    const d = D.doanCua(b.b, b.q), cung = a.q.p != null && b.q.p === a.q.p && a.b.id === b.b.id;
    return D.chuCau(b.q).concat(d && !cung ? [(d.title || "") + " " + (d.text || "")] : []);
  };
  const theoCap = new Map();
  const ghi = (A, B, s) => {
    const id = A.nhap ? A.b.id : B.b ? B.b.id : B.id, dong = `${B.ma} → ${A.ma}: ${s}`;
    if (DA_XEM.has(dong) || DA_XEM.has(`${rutTen(B.ma)} → ${rutTen(A.ma)}: ${s}`)) return;
    DONG_LO.push(dong);
    const k = id + "\u0000" + B.ma + "\u0000" + A.ma;
    if (!theoCap.has(k)) theoCap.set(k, { id, A, B, ds: [] });
    if (!theoCap.get(k).ds.includes(s)) theoCap.get(k).ds.push(s);
  };
  const xet = (A, B) => {
    const da = dap(A); if (!da.chu.length && !da.so.length) return;
    const T = chuB(B, A), TT = " " + T.map((s) => tuCua(s).join(" ")).join(" | ") + " ";
    da.chu.filter((c) => TT.includes(" " + c + " ")).forEach((c) => ghi(A, B, c));
    if (da.so.length) { const kq = T.flatMap((s) => [...String(s).matchAll(KQ)].map((x) => giaTri(x[1]))); da.so.filter((v) => kq.includes(v)).forEach((v) => ghi(A, B, String(v).replace(".", ","))); }
  };
  // cùng đề nháp: mọi câu cùng hiện, cả lời dặn
  DE_NHAP.forEach((b) => {
    const cau = CAU_NHAP.filter((e) => e.b === b), note = b.note ? { ma: b.id + " lời dặn", loi: b.note, b: null, id: b.id } : null;
    cau.forEach((A) => cau.concat(note ? [note] : []).forEach((B) => { if (B !== A) xet(A, B); }));
  });
  // cùng chủ đề: một câu là câu nháp; đề “Ôn chủ đề” rút câu cùng chủ đề trong các đề cùng khối, cùng môn (cùng file câu hỏi)
  const kCD = (e) => e.b.file + "|" + e.q.topic, theoCD = new Map();
  CA.filter((e) => e.q.type !== "essay").forEach((e) => { if (!theoCD.has(kCD(e))) theoCD.set(kCD(e), []); theoCD.get(kCD(e)).push(e); });
  CAU_NHAP.forEach((N) => (theoCD.get(kCD(N)) || []).forEach((K) => {
    if (K.b.id === N.b.id) return;
    if (N.q.type !== "essay") xet(N, K);
    if (!K.nhap) xet(K, N);
  }));
  theoCap.forEach(({ id, A, B, ds }) => {
    const da = A.q.type === "mc" ? A.q.o[0] : [].concat(A.q.ans).join(" | ");
    loi(id, "dò lộ", `${B.ma} → ${A.ma} (đáp án “${cat(da, 60)}”): ${ds.map((s) => "“" + s + "”").join(", ")}`);
  });
}

/* ---------- 5. sách ---------- */
let soCuon = 0;
if (!opt["khong-sach"] && D.coSach()) {
  const cuon = D.cacCuon(opt.sach.length ? opt.sach : null);
  soCuon = cuon.length;
  const nguon = [];
  cuon.forEach((cu) => D.trangBoDau(cu).forEach((p) => nguon.push({ id: cu.id + " " + p.nhan + " (" + p.anh + ")", w: D.tuTuBoDau(p.t, CACH) })));
  const bao = (k, f) => { const can = canCua(truongNhap(false, true), k, CACH); gomDoan(D.timChuoi(nguon, k, can), can, k).forEach(f); };
  bao(8, (g) => loi(g.r.id, "sách", `${g.r.ma} ${g.r.tr}: chuỗi 8 từ trùng ${dsNguon(g.nguon, 2)}: “${cat(g.doan, 110)}”`));
  if (opt.sach6) bao(6, (g) => xem(g.r.id, "sách", `${g.r.ma} ${g.r.tr}: chuỗi 6 từ trùng ${dsNguon(g.nguon, 2)}: “${cat(g.doan, 110)}”`));
}

/* ---------- in ---------- */
let coLoi = false;
const NHOM = ["cấu trúc", "lựa chọn", "trùng kho", "kho khác", "dò lộ", "sách"];
DE_NHAP.forEach((b) => {
  const r = BAO.get(b.id), qs = b.questions, d = b._d;
  const dem = (f) => qs.filter(f).length, dang = {};
  qs.forEach((q) => (dang[q.type] = (dang[q.type] || 0) + 1));
  console.log(`\n=== ${b.id} · ${b.title} (${path.relative(process.cwd(), d.nhap)})`);
  console.log(`${qs.length} câu (${Object.entries(dang).map(([k, v]) => k + " " + v).join(", ")}); mức Biết/Hiểu/Vận dụng ${dem((q) => q.lv === 1)}/${dem((q) => q.lv === 2)}/${dem((q) => q.lv === 3)}; `
    + `${new Set(qs.map((q) => q.topic)).size} chủ đề; ${Object.keys(b.passages || {}).length} đoạn đọc` + (b.pts ? `; tổng điểm ${r2(qs.reduce((a, q) => a + (q.pt || 0), 0))}/${b.pts}` : "")
    + (d.ki.length ? `; kì thi ${d.ki.join(", ")}` : ""));
  const inNhom = (ds, ten) => {
    if (!ds.length) return;
    console.log(`${ten} (${ds.length}):`);
    NHOM.forEach((n) => {
      const ls = ds.filter(([x]) => x === n);
      ls.slice(0, MAX).forEach(([, s]) => console.log(`  [${n}] ${s}`));
      if (ls.length > MAX) console.log(`  [${n}] … còn ${ls.length - MAX} dòng (--het để in hết)`);
    });
  };
  inNhom(r.loi, "Lỗi"); inNhom(r.xem, "Xem");
  if (!r.loi.length) console.log("Không có lỗi." + (r.xem.length ? "" : " Không có gì cần xem."));
  if (r.loi.length) coLoi = true;
});
console.log(`\nĐã so với ${KHO.length} đề có sẵn` + (soCuon ? `, chữ OCR của ${soCuon} cuốn sách` : opt["khong-sach"] ? " (không so với sách)" : " (không có ../OnUp-Book)")
  + `, cách chuẩn hoá của ${soScript} script môn khác`
  + (opt.mon ? `; từ ${opt.mon} đọc ${MON_CACH.gop.length} tên riêng, ${MON_CACH.bo.length} cụm bỏ qua, CUM_CHUNG ${CUM_CHUNG.size}, DA_XEM ${DA_XEM.size}${NGUYEN_AM ? "" : ", không gộp nguyên âm"}`
    : "; chưa ghi --mon (GOP, TU_CHUNG, CUM_CHUNG, DA_XEM của script môn)")
  + ` · ${((Date.now() - t0) / 1000).toFixed(1)} giây.`);
if (opt["in-da-xem"] && DONG_LO.length) console.log("\nCác dòng dò lộ (chép dòng đã xem tay vào daXem của nháp, DA_XEM của script môn khi ghép):\n" + [...new Set(DONG_LO)].map((s) => "  " + JSON.stringify(s) + ",").join("\n"));
else if (DONG_LO.length) console.log("Dò lộ “B → A”: chữ của câu B có chuỗi của đáp án câu A. Thật sự lộ thì sửa; không lộ thì --in-da-xem in từng dòng để chép vào daXem.");
process.exit(coLoi ? 1 : 0);
