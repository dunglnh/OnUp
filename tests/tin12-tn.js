// Kiểm tra các đề Tin học thi thử tốt nghiệp THPT (data/banks/12-tin.js, tin12-tn-de<N>; Phiên N12-tn-tin: Đề 1–3; phiên sau thêm đề thì mở
// rộng script này: thêm các mục kiểm tra của đề mới vào RIENG, định hướng của phần riêng vào DINH_HUONG). Đề tính điểm theo khung đề tốt
// nghiệp THPT từ năm 2025 (Quyết định 764/QĐ-BGDĐT) và đề chính thức năm 2025, 2026 (docs/KE-HOACH-NOI-DUNG.md, mục 2 và mục 7). Số đề, số
// câu lấy từ danh mục.
// Khung: danh mục (tên, khối 12, môn Tin học, file, 50 phút, pts 10, gắn vào tn-thpt-2027); Phần I 24 câu nhiều lựa chọn pt 0,25, Phần II
// 4 câu đúng/sai 4 ý pt 1 (không có Phần III), Quiz.grade điểm tối đa 6 – 4. Như đề chính thức năm 2025, 2026, cả 24 câu Phần I là phần
// chung (lời giao việc mặc định 16 câu chung, 8 câu riêng theo đề tham khảo); Phần II câu 1, 2 phần chung Tin học 12, câu 3, 4 phần riêng
// của một định hướng (đề thật có 2 câu riêng của mỗi định hướng, thí sinh làm 2 câu của định hướng mình). Phần I: 7 câu Tin học 10 (4 Biết,
// 2 Hiểu, 1 Vận dụng), 4 câu phần chung Tin học 11 (3 Biết, 1 Hiểu), 13 câu phần chung Tin học 12 (9 Biết, 3 Hiểu, 1 Vận dụng); Phần II
// bốn câu ghi mức 2, 2, 3, 3; mỗi bài Tin học 12 nhiều nhất hai câu một đề. Chủ đề: câu phần chung Tin học 12 đúng chữ chủ đề của ba kho
// Tin học 12 (tên bài của sách); câu lớp 10, 11 ghi “Lớp 10 · ”, “Lớp 11 · ” và tên chủ đề của sách; câu phần riêng ghi “Tin học ứng dụng · ”
// hay “Khoa học máy tính · ” rồi tên bài (Tin học 12: Bài 22–28 của sách Tin học ứng dụng, Bài 22–30 của sách Khoa học máy tính) hay
// “Lớp 11 · ” và tên chủ đề riêng của Tin học 11; đối chiếu mục lục trong README của các cuốn ở OnUp-Book. Phần I câu lớp 10, rồi lớp 11,
// rồi lớp 12, mỗi lớp theo thứ tự chủ đề, bài; Phần II hai câu chung theo thứ tự bài rồi hai câu riêng. Đề 1–3 phủ đủ 6 chủ đề Tin học 10,
// 5 chủ đề phần chung Tin học 11 và gần đủ các bài Tin học 12 của ba kho. Lời dặn ghi định hướng của phần riêng, đề của định hướng kia,
// số câu, số điểm, số câu mỗi lớp tính từ dữ liệu.
// Mỗi câu khớp đúng một mục kiểm tra của đề đó (theo chữ has trong đề bài): câu nhiều lựa chọn so với chữ khoá của đáp án (đúng một lựa chọn
// có chữ đó) hoặc tính lại bằng code: mã Python (trong khung mã hay trong đề bài) chạy bằng python3: in ra gì, sửa dòng nào cho đúng yêu
// cầu, điều kiện nào đúng với đúng các số nguyên tố, tên biến hợp lệ, lệnh nhập số, kết quả từng lượt của sắp xếp nổi bọt; câu SQL chạy trên
// SQLite (mô-đun sqlite3 của python3); mã HTML, CSS đọc bằng bộ đọc của tests/tin-congnghe12-ck2.js (cú pháp như sách, chỉ thẻ, thuộc tính
// sách dạy) rồi tính: vị trí ô của bảng có rowspan, colspan, kí hiệu đầu dòng của danh sách lồng nhau, đường dẫn tương đối, liên kết tới
// phần có id ở trang khác, khung nội tuyến và target, biểu mẫu, kế thừa căn lề, kích thước khung; phép tính: cộng số nhị phân, mã màu hex,
// dung lượng âm thanh, bảng chân trị của phép XOR, thời gian các khung hình của ảnh động GIF làm bằng GIMP; ý của câu đúng/sai 4 ý so với
// bảng ý → đúng/sai ghi trong script hoặc tính bằng code. Mọi đoạn mã HTML, CSS trong chữ của đề đọc lại được; mọi khung mã được đọc lại.
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân, trừ đoạn mã, câu có mã Python, số nhị phân, mã màu; dấu thanh kiểu
// sách “hoá”, “thuỷ”; không “huyện”, “63 tỉnh”); kiểu Đ/S không lặp trong một đề, mỗi kiểu nhiều nhất ba lần trong các đề thi thử; đáp án
// đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều
// lựa chọn của đề, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không
// có; lời giải không nhắc vị trí của phương án. So với ba kho Tin học 12 và giữa các đề thi thử: đề bài không trùng câu nào trong file,
// không gần trùng (chuỗi 6 từ; cặp hai âm tiết chung với câu của ba kho), đáp án không trùng câu cùng chủ đề. Dò lộ đáp án giữa mọi câu của
// một đề (lời dặn cùng hiện) và giữa câu cùng chủ đề của các đề thi thử và ba kho (đề “Ôn chủ đề” rút chung), như tests/ktpl12-tn.js; chuỗi
// đã xem tay ghi ở DA_XEM. Có ../OnUp-Book thì so mọi trường chữ (cả lời dặn) với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng;
// DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác, cả giữa các đề thi thử (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 6 từ). Các bộ
// tính, bộ dò lộ tự thử với câu cố ý viết sai.
// Chạy: node tests/tin12-tn.js → in MATH OK (cần python3 có mô-đun sqlite3; biến môi trường PYTHON đổi lệnh chạy).
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const { execFileSync } = require("child_process");
const BANKS = require("./nap-de.js").napDe();
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, EVENTS = ctx.window.ONTAP_SEED_EVENTS;
const sum = (a) => a.reduce((s, v) => s + v, 0);

// chép từ tests/tin-congnghe12-ck2.js
/* ---------- số ----------
   Số trong đề: hàng nghìn ngăn bằng khoảng trắng, dấu phẩy thập phân. */
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?";
const val = (s) => { const m = /^[−-]?\d{1,3}(?: \d{3})*(?:,\d+)?$/.exec(String(s).trim()); assert.ok(m, "không đọc được số “" + s + "”"); return +String(s).trim().replace(/ /g, "").replace("−", "-").replace(",", "."); };
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
// mẫu chữ có # ở chỗ số: so(s, "Cho # Ω") → [số]
const R = (mau) => new RegExp(mau.split("#").map(escRe).join("(" + NUM + ")"), "u");
const so = (s, mau) => { const m = R(mau).exec(s); assert.ok(m, "không thấy “" + mau + "” trong: " + String(s).slice(0, 80)); return m.slice(1).map(val); };
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b));
// số viết kiểu Việt Nam: 7500 → "7 500", 0.15 → "0,15"
const vn = (x, d = 6) => { const r = Math.round(x * 10 ** d) / 10 ** d, [a, b] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const lam = (x, d) => Math.round(x * 10 ** d + 1e-9) / 10 ** d; // làm tròn d chữ số thập phân
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const coThang = (q, ...cum) => { const r = q.rubric.map((c) => c.c).join(" | "); cum.forEach((c) => assert.ok(r.includes(c), "thang chấm cần có “" + c + "”")); };
const y = (o, re) => { const m = re.exec(o); assert.ok(m, "không đọc được ý “" + o + "”"); return m; };

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const giaiMa = (t) => t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: giaiMa(m[2]) }));
const num = (a, k) => +a[k];
const svgRong = (svg) => +attrs(svg.slice(0, svg.indexOf(">") + 1)).viewBox.split(" ")[2];
const svgCao = (svg) => +attrs(svg.slice(0, svg.indexOf(">") + 1)).viewBox.split(" ")[3];
const daDoc = new Set(); // hình đã đọc lại bằng code
// ước bề rộng một dòng chữ (Noto Sans, đo trong trình duyệt; mỗi nhóm lấy bề rộng của kí tự rộng nhất nhóm, nên ước lượng không nhỏ hơn bề
// rộng thật): xếp nhóm theo chữ gốc (bỏ dấu): chữ rất hẹp; t, f, dấu cách; r, /, ", -, 1; chữ rộng; chữ hoa; dấu so sánh; a c e k s v x y z;
// chữ thường, chữ số còn lại
const rongChu = (t, c) => { const g = c.normalize("NFD")[0];
  return (/[il|.,:;'!]/.test(g) ? 0.3 : /[tf ]/.test(g) ? 0.35 : /[r/"\-1]/.test(g) ? 0.47 : /[mwMW]/.test(g) ? 0.9 : /[A-ZĐ]/.test(g) ? 0.76 : /[<>=+]/.test(g) ? 0.66 : /[aceksvxyz]/.test(g) ? 0.58 : 0.62) *
    (+t["font-size"] || 15) * (t["font-weight"] === "700" ? 1.06 : 1); };
const rong = (t) => sum([...t.t].map((c) => rongChu(t, c)));

/* ---------- bộ đọc HTML (Tin học Bài 7–12; chép từ tests/tin-congnghe12-gk2.js, thêm thẻ nav của Bài 18) ----------
   docHtml(mã): đọc một đoạn mã HTML thành cây { tag, at, kids } (chữ là { text }). Kiểm tra cú pháp như sách: tên thẻ, thuộc tính chữ
   thường; thẻ mở – thẻ đóng lồng đúng thứ tự; thẻ rỗng (RONG) không có thẻ đóng; giá trị thuộc tính trong ngoặc kép, không lặp thuộc
   tính; thuộc tính không có giá trị chỉ là các thuộc tính bật, tắt (BAT_TAT); chỉ dùng thẻ, thuộc tính sách dạy (THE, THUOC_TINH). */
const RONG = new Set(["br", "hr", "img", "input", "meta", "source", "link"]);
const THE = new Set(["html", "head", "title", "meta", "link", "style", "body", "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "b", "strong", "i", "em", "u",
  "sub", "sup", "mark", "del", "small", "div", "span", "nav", "ol", "ul", "li", "dl", "dt", "dd", "table", "caption", "tr", "th", "td", "a", "img",
  "audio", "video", "source", "iframe", "form", "input", "label", "select", "option", "textarea", "fieldset", "legend"]);
const BAT_TAT = new Set(["controls", "autoplay", "muted"]);
const THUOC_TINH = new Set(["charset", "style", "type", "start", "colspan", "rowspan", "href", "target", "id", "src", "alt", "width", "height",
  "poster", "name", "value", "for", "rows", "cols", "action", "border", "class", "rel", ...BAT_TAT]);
const docHtml = (src) => {
  const root = { tag: "#", at: {}, kids: [] }, st = [root];
  const re = /<!DOCTYPE html>|<\/([a-z][a-z0-9]*)>|<([a-z][a-z0-9]*)((?:\s+[a-z-]+(?:="[^"<>]*")?)*)\s*>|([^<]+)|(<)/g;
  let m;
  while ((m = re.exec(src))) {
    if (m[0] === "<!DOCTYPE html>") { assert.ok(st.length === 1 && !root.kids.some((k) => k.tag), "<!DOCTYPE html> đứng đầu tệp"); root.doctype = true; continue; }
    if (m[5]) assert.fail("thẻ viết sai: " + src.slice(m.index, m.index + 30));
    if (m[4] !== undefined) { st[st.length - 1].kids.push({ text: m[4] }); continue; }
    if (m[1]) { const top = st.pop(); assert.ok(top !== root && top.tag === m[1], `thẻ đóng </${m[1]}> không khớp thẻ mở <${top.tag}>`); continue; }
    const tag = m[2]; assert.ok(THE.has(tag), "thẻ sách chưa dạy: <" + tag + ">");
    const at = {};
    for (const a of m[3].matchAll(/([a-z-]+)(?:="([^"]*)")?/g)) {
      assert.ok(!(a[1] in at), `<${tag}> lặp thuộc tính ${a[1]}`); assert.ok(THUOC_TINH.has(a[1]), "thuộc tính sách chưa dạy: " + a[1]);
      assert.ok(a[2] !== undefined || BAT_TAT.has(a[1]), `thuộc tính ${a[1]} cần giá trị trong ngoặc kép`); at[a[1]] = a[2] === undefined ? true : a[2];
    }
    const node = { tag, at, kids: [] }; st[st.length - 1].kids.push(node);
    if (!RONG.has(tag)) st.push(node);
  }
  assert.equal(st.length, 1, "thiếu thẻ đóng </" + st[st.length - 1].tag + ">");
  return root;
};
const tim = (n, t) => (n.kids || []).flatMap((k) => (k.tag === t ? [k] : []).concat(tim(k, t)));

/* ---------- bộ đọc CSS (Tin học Bài 13–17) ----------
   docCss(mã) → [{ chon: [bộ chọn], kb: [[tên, giá trị]], thu }]: mỗi mẫu định dạng “bộ chọn { thuộc tính: giá trị; … }”, nhiều bộ chọn ngăn
   bằng dấu phẩy, mỗi khai báo kết thúc bằng dấu chấm phẩy (cả khai báo cuối), tên thuộc tính chữ thường, chỉ thuộc tính sách dạy (CSS_TT),
   không lặp thuộc tính trong một mẫu; giá trị có thể kèm !important; lệnh @import "tệp.css"; đứng đầu. Bộ chọn (docChon): thẻ, *, .lớp,
   #id, [thuộc tính], [thuộc tính="giá trị"], :lớp giả, ::phần tử giả ghép liền nhau; hai bộ chọn đơn ngăn bằng dấu cách (phần tử con cháu),
   “>” (phần tử con trực tiếp), “+” (phần tử liền sau), “~” (phần tử đứng sau, cùng cha) như Bảng 15.1. */
// thuộc tính sách dạy (Bài 13–17): phông, màu, dòng văn bản, khung, display; margin, padding chỉ một giá trị (sách không dạy thuộc tính
// từng cạnh, nhiều giá trị); font-style không dùng (sách ghi giá trị “italics”, khác chuẩn CSS)
const CSS_TT = new Set(["color", "background-color", "font-family", "font-size", "font-weight", "text-align", "text-decoration", "text-indent",
  "line-height", "width", "height", "margin", "padding", "border", "border-width", "border-style", "border-color", "display"]);
// kế thừa theo sách (Bài 14, 15, 16): màu chữ, phông, cỡ chữ, độ đậm, căn lề, thụt lề, chiều cao dòng; text-decoration, các thuộc tính
// khung không kế thừa; background-color sách nói có kế thừa (chuẩn CSS thì không): không câu nào hỏi kế thừa màu nền
const KE_THUA = new Set(["color", "font-family", "font-size", "font-weight", "text-align", "text-indent", "line-height"]);
// lớp giả (Bảng 17.1; :active có trong mã Thực hành), phần tử giả (Bảng 17.2)
const GIA = new Set(["link", "visited", "hover", "active"]);
const GIA_PT = new Set(["first-line", "first-letter", "selection"]);
const NOI = new Set([">", "+", "~"]);
const docChon = (s) => {
  const t = String(s).trim(), D = [], N = [];
  assert.ok(t, "bộ chọn trống");
  t.replace(/\s*([>+~])\s*/g, " $1 ").split(/\s+/).forEach((p) => {
    if (NOI.has(p)) { assert.ok(D.length && N.length === D.length - 1, "bộ chọn viết sai: “" + s + "”"); N.push(p); return; }
    if (D.length && N.length === D.length - 1) N.push(" ");
    D.push(p);
  });
  assert.ok(D.length === N.length + 1, "bộ chọn viết sai: “" + s + "”");
  const dons = D.map((p) => {
    const m = /^(\*|[a-z][a-z0-9]*)?((?:[.#][A-Za-z][A-Za-z0-9_-]*|::?[a-z-]+|\[[a-z-]+(?:="[^"]*")?\])*)$/.exec(p);
    assert.ok(m && (m[1] || m[2]), "bộ chọn viết sai: “" + p + "”");
    if (m[1] && m[1] !== "*") assert.ok(THE.has(m[1]), "bộ chọn thẻ sách chưa dạy: " + m[1]);
    const d = { the: m[1] || "*", lop: [], id: [], gia: [], pt: [], tt: [] };
    for (const x of m[2].matchAll(/::([a-z-]+)|:([a-z-]+)|\.([A-Za-z][A-Za-z0-9_-]*)|#([A-Za-z][A-Za-z0-9_-]*)|\[([a-z-]+)(?:="([^"]*)")?\]/g)) {
      if (x[1]) { assert.ok(GIA_PT.has(x[1]), "pseudo-element sách chưa dạy: " + x[1]); d.pt.push(x[1]); }
      else if (x[2]) { assert.ok(GIA.has(x[2]), "pseudo-class sách chưa dạy: " + x[2]); d.gia.push(x[2]); }
      else if (x[3]) d.lop.push(x[3]); else if (x[4]) d.id.push(x[4]); else d.tt.push([x[5], x[6]]);
    }
    assert.ok(d.id.length <= 1, "một bộ chọn đơn có hai id: " + p);
    return d;
  });
  assert.ok(dons.slice(0, -1).every((d) => !d.pt.length), "pseudo-element chỉ ở cuối bộ chọn: " + s);
  return { s: t, don: dons, noi: N, ts: trongSo(dons) };
};
// trọng số của bộ chọn (Bài 17, Bảng 17.4): mỗi id 100; mỗi lớp, lớp giả, bộ chọn kiểu thuộc tính 10; mỗi phần tử, phần tử giả 1; cộng lại
const trongSo = (dons) => sum(dons.map((d) => 100 * d.id.length + 10 * (d.lop.length + d.gia.length + d.tt.length) + (d.the === "*" ? 0 : 1) + d.pt.length));
const docKhaiBao = (s, at) => {
  const t = String(s).trim(), kb = [];
  if (!t) return kb;
  assert.ok(t.endsWith(";"), at + ": khai báo cuối cần dấu chấm phẩy: “" + t + "”");
  t.slice(0, -1).split(";").forEach((c) => {
    const m = /^\s*([a-z-]+)\s*:\s*([^:;{}!]+?)\s*(!important)?\s*$/.exec(c);
    assert.ok(m, at + ": khai báo viết sai: “" + c.trim() + "”");
    assert.ok(CSS_TT.has(m[1]), "thuộc tính CSS sách chưa dạy: " + m[1]);
    assert.ok(!kb.some((k) => k[0] === m[1]), at + ": lặp thuộc tính " + m[1]);
    giaTriHopLe(m[1], m[2]);
    kb.push([m[1], m[2], !!m[3]]);
  });
  return kb;
};
const docCss = (src, thu0 = 0) => {
  const R = [], nhap = [];
  // lệnh @import "tệp.css"; (cách thứ hai kết nối CSS ngoài, Bài 13) đứng đầu mã CSS
  const t = String(src).replace(/\/\*[\s\S]*?\*\//g, " ").replace(/^\s*(?:@import\s+"([^"]+)"\s*;\s*)+/, (m) => { for (const x of m.matchAll(/@import\s+"([^"]+)"/g)) nhap.push(x[1]); return " "; });
  const re = /([^{}]+)\{([^{}]*)\}/g; let m, het = 0;
  while ((m = re.exec(t))) {
    assert.ok(!t.slice(het, m.index).trim(), "mã CSS viết sai: “" + t.slice(het, m.index).trim() + "”");
    const chon = m[1].split(",").map(docChon);
    R.push({ chon, kb: docKhaiBao(m[2], m[1].trim()), thu: thu0 + R.length });
    het = re.lastIndex;
  }
  assert.ok(!t.slice(het).trim(), "mã CSS viết sai (thiếu ngoặc nhọn?): “" + t.slice(het).trim() + "”");
  R.nhap = nhap;
  return R;
};

/* ---------- giá trị CSS: màu, độ dài ----------
   Màu (Bài 15) theo tên (sách dùng tên tiếng Anh), mã hex #rrggbb (sách không dạy #rgb), rgb(r, g, b) bằng số 0–255 hay phần trăm,
   hsl(H, S%, L%) → [r, g, b]. Độ dài: px; cỡ chữ thêm pt, em, rem, % (Bài 14). */
const TEN_MAU = { black: [0, 0, 0], white: [255, 255, 255], red: [255, 0, 0], lime: [0, 255, 0], green: [0, 128, 0], blue: [0, 0, 255],
  yellow: [255, 255, 0], cyan: [0, 255, 255], aqua: [0, 255, 255], magenta: [255, 0, 255], fuchsia: [255, 0, 255], gray: [128, 128, 128],
  grey: [128, 128, 128], silver: [192, 192, 192], maroon: [128, 0, 0], navy: [0, 0, 128], purple: [128, 0, 128], olive: [128, 128, 0],
  teal: [0, 128, 128], orange: [255, 165, 0], pink: [255, 192, 203], brown: [165, 42, 42] };
const docMau = (v) => {
  const s = String(v).trim().toLowerCase(); let m;
  if (TEN_MAU[s]) return TEN_MAU[s].slice();
  if ((m = /^#([0-9a-f]{6})$/.exec(s))) return [0, 2, 4].map((i) => parseInt(m[1].slice(i, i + 2), 16));
  if ((m = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/.exec(s))) { const c = m.slice(1).map(Number); assert.ok(c.every((x) => x <= 255), "rgb() mỗi số 0–255: " + v); return c; }
  if ((m = /^rgb\(\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/.exec(s))) { const c = m.slice(1).map(Number); assert.ok(c.every((x) => x <= 100), "rgb() theo % mỗi số 0–100%: " + v); return c.map((x) => Math.round((x * 255) / 100 + 1e-9)); }
  if ((m = /^hsl\(\s*(\d{1,3})\s*,\s*(\d{1,3})%\s*,\s*(\d{1,3})%\s*\)$/.exec(s))) {
    const [h, S, L] = [+m[1], +m[2] / 100, +m[3] / 100]; assert.ok(h < 360 && S <= 1 && L <= 1, "hsl(): " + v);
    const C = (1 - Math.abs(2 * L - 1)) * S, X = C * (1 - Math.abs(((h / 60) % 2) - 1)), k = Math.floor(h / 60), d = L - C / 2;
    const [r, g, b] = [[C, X, 0], [X, C, 0], [0, C, X], [0, X, C], [X, 0, C], [C, 0, X]][k];
    return [r, g, b].map((x) => Math.round((x + d) * 255));
  }
  assert.fail("không đọc được màu “" + v + "”");
};
const hex = (c) => "#" + c.map((x) => x.toString(16).toUpperCase().padStart(2, "0")).join("");
const KIEU_VIEN = new Set(["none", "solid", "dotted", "dashed", "double", "inset", "outset", "ridge", "groove"]); // Bảng 16.2
const docPx = (v) => { const m = /^(\d+(?:\.\d+)?)px$/.exec(String(v).trim()); assert.ok(m || String(v).trim() === "0", "độ dài viết sai (cần px): “" + v + "”"); return m ? +m[1] : 0; };
const docVien = (v) => { // border: độ dày, kiểu, màu (thứ tự bất kì)
  const p = String(v).trim().split(/\s+(?![^(]*\))/), r = { w: 3, kieu: "none", mau: null };
  assert.ok(p.length >= 1 && p.length <= 3, "border viết sai: “" + v + "”");
  p.forEach((x) => { if (/^\d/.test(x)) r.w = docPx(x); else if (KIEU_VIEN.has(x)) r.kieu = x; else r.mau = docMau(x); });
  return r;
};
const giaTriHopLe = (tt, v) => {
  if (["color", "background-color", "border-color"].includes(tt)) docMau(v);
  else if (tt === "margin" || tt === "padding") { assert.ok(!/\s/.test(String(v).trim()), "margin, padding một giá trị (sách): “" + v + "”"); docPx(v); }
  else if (tt === "border") docVien(v);
  else if (["width", "height", "border-width"].includes(tt)) docPx(v);
  else if (tt === "text-indent") assert.ok(/^-?\d+(?:\.\d+)?(?:px|em|%)$/.test(v), "text-indent: “" + v + "”");
  else if (tt === "font-family") assert.ok(/^(?:(?:"[A-Za-z ]+"|[A-Za-z][A-Za-z-]*)\s*,\s*)*(serif|sans-serif|monospace|cursive|fantasy)$/.test(v), "font-family: danh sách phông, tên loại phông ở cuối: “" + v + "”");
  else if (tt === "border-style") assert.ok(KIEU_VIEN.has(v), "border-style: “" + v + "”");
  else if (tt === "font-size") assert.ok(/^\d+(?:\.\d+)?(?:px|pt|em|rem|%)$/.test(v), "font-size viết sai: “" + v + "”");
  else if (tt === "font-weight") assert.ok(["normal", "bold"].includes(v) || /^[1-9]00$/.test(v), "font-weight: “" + v + "”");
  else if (tt === "text-align") assert.ok(["left", "right", "center", "justify"].includes(v), "text-align: “" + v + "”");
  else if (tt === "text-decoration") assert.ok(["none", "underline", "overline", "line-through"].includes(v), "text-decoration: “" + v + "”");
  else if (tt === "display") assert.ok(["block", "inline", "none"].includes(v), "display (sách: block, inline, none): “" + v + "”");
};

/* ---------- áp mẫu định dạng lên trang ---------- */
const ganCha = (n, cha = null) => { n.cha = cha; (n.kids || []).forEach((k) => k.tag && ganCha(k, n)); return n; };
const anhTruoc = (el) => { if (!el.cha) return []; const k = el.cha.kids.filter((x) => x.tag); return k.slice(0, k.indexOf(el)); };
// gia: lớp giả đang xảy ra. Mảng (như ["hover"]): chỉ với chính phần tử được định dạng (như tests/tin-congnghe12-gk2.js); đối tượng
// { hover: Set, visited: Set }: các phần tử đang ở trạng thái đó (di chuột lên một phần tử thì nó và mọi phần tử cha cùng ở trạng thái
// :hover, diChuot), để bộ chọn như “.the:hover h3” khớp được; phần tử giả không khớp phần tử nào của cây
const coGia = (el, g, gia, cuoi) => (Array.isArray(gia) ? cuoi && gia.includes(g) : !!(gia && gia[g] && gia[g].has(el)));
const khopDon = (el, d, gia, cuoi) => el && el.tag && el.tag !== "#" && (d.the === "*" || d.the === el.tag) &&
  d.lop.every((l) => String(el.at.class || "").split(/\s+/).includes(l)) && d.id.every((i) => el.at.id === i) &&
  d.tt.every(([a, v]) => el.at[a] !== undefined && (v === undefined || el.at[a] === v)) &&
  d.gia.every((g) => coGia(el, g, gia, cuoi));
const khop = (el, c, gia) => {
  const don = c.don, noi = c.noi;
  const tu = (e, i) => { if (!khopDon(e, don[i], gia, i === don.length - 1)) return false; if (i === 0) return true;
    const n = noi[i - 1];
    if (n === ">") return tu(e.cha, i - 1);
    if (n === "+") { const a = anhTruoc(e); return a.length > 0 && tu(a[a.length - 1], i - 1); }
    if (n === "~") return anhTruoc(e).some((a) => tu(a, i - 1));
    for (let a = e.cha; a && a.tag !== "#"; a = a.cha) if (tu(a, i - 1)) return true; return false; };
  return !don[don.length - 1].pt.length && tu(el, don.length - 1);
};
// di chuột lên phần tử el: el và các phần tử cha ở trạng thái :hover
const diChuot = (el, them = {}) => { const h = new Set(); for (let e = el; e && e.tag && e.tag !== "#"; e = e.cha) h.add(e); return Object.assign({ hover: h }, them); };
/* apCss(gốc, { "tệp.css": mã }) → { kieu(phần tử, thuộc tính, lớp giả), mau }: mẫu định dạng của các thẻ link (tệp CSS ngoài) và style theo
   thứ tự trong trang. Thứ tự ưu tiên theo Bảng 17.3: khai báo có !important; CSS trực tiếp (thuộc tính style); trọng số lớn hơn; cùng trọng
   số thì mẫu ở vị trí cuối cùng; không mẫu nào thì thuộc tính kế thừa (KE_THUA) lấy của phần tử cha; không có thì mặc định của trình duyệt
   (undefined). */
const apCss = (goc, ngoai = {}) => {
  ganCha(goc);
  const mau = [];
  const di = (n) => { (n.kids || []).forEach((k) => {
    if (k.tag === "style") { const r = docCss(k.kids.map((x) => x.text || "").join(""), mau.length);
      r.nhap.forEach((f) => { assert.ok(ngoai[f] !== undefined, "lệnh @import tới tệp CSS chưa có: " + f); mau.push(...docCss(ngoai[f], mau.length)); });
      mau.push(...r.map((x, i) => Object.assign(x, { thu: mau.length + i }))); }
    else if (k.tag === "link") { assert.ok(k.at.rel === "stylesheet" && ngoai[k.at.href] !== undefined, "thẻ link tới tệp CSS chưa có: " + k.at.href); mau.push(...docCss(ngoai[k.at.href], mau.length)); }
    if (k.tag) di(k); }); };
  di(goc);
  const kieu = (el, tt, gia) => {
    const ung = []; // [mức: 3 !important, 2 trực tiếp, 1 mẫu; trọng số; thứ tự; giá trị]
    if (el.at && el.at.style !== undefined) docKhaiBao(el.at.style, "style").forEach((k) => { if (k[0] === tt) ung.push([k[2] ? 3 : 2, 1e9, 1e9, k[1]]); });
    mau.forEach((r) => r.chon.forEach((c) => { if (!khop(el, c, gia)) return; r.kb.forEach((k) => { if (k[0] === tt) ung.push([k[2] ? 3 : 1, c.ts, r.thu, k[1]]); }); }));
    if (ung.length) return ung.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]).pop()[3];
    if (KE_THUA.has(tt) && el.cha && el.cha.tag && el.cha.tag !== "#") return kieu(el.cha, tt, Array.isArray(gia) ? undefined : gia);
    return undefined;
  };
  return { kieu, mau };
};
// cỡ chữ (px) của một phần tử: pt đổi ra px, % theo cỡ chữ của phần tử cha, rem theo phần tử gốc html (Bài 14); không định dạng thì kế thừa, gốc 16px;
// em sách định nghĩa theo cỡ chữ của trình duyệt nên chỉ dùng khi phần tử cha có cỡ mặc định (16px); h1–h6 có cỡ riêng của trình duyệt: không hỏi
const coChu = (ap, el) => {
  const tu = (e) => {
    if (!e || !e.tag || e.tag === "#") return 16;
    const v = ap.kieu(e, "font-size");
    const own = (() => { if (!e.at) return undefined; const r = ap.mau.some((x) => x.chon.some((c) => khop(e, c) && x.kb.some((k) => k[0] === "font-size"))); return r || (e.at.style && /font-size/.test(e.at.style)); })();
    if (!own) return tu(e.cha);
    const m = /^(\d+(?:\.\d+)?)(px|pt|em|rem|%)$/.exec(v);
    if (m[2] === "px") return +m[1];
    if (m[2] === "pt") return (+m[1] * 96) / 72; // 1 pt = 1/72 inch, 1 px = 1/96 inch (Bài 14)
    if (m[2] === "em") return +m[1] * tu(e.cha);
    if (m[2] === "%") return (+m[1] / 100) * tu(e.cha);
    let h = e; while (h.cha && h.cha.tag !== "#") h = h.cha; return +m[1] * (h === e ? 16 : tu(h));
  };
  return tu(el);
};


// chép từ tests/tin-congnghe12-ck2.js
/* ---------- Tin học: đoạn mã trong câu ----------
   maTrong(chuỗi): các đoạn mã của một chuỗi chữ: đoạn trong ngoặc kép “…” có thẻ HTML, có mẫu định dạng CSS (ngoặc nhọn) hay là các quy
   định “thuộc tính: giá trị;”; hoặc cả chuỗi khi chuỗi là một đoạn mã (lựa chọn là thẻ HTML, mẫu định dạng, quy định). docDoan(mã) đọc
   đoạn mã: HTML thì đọc thẻ, rồi đọc mã CSS trong thẻ style và trong thuộc tính style; mẫu định dạng thì đọc bằng docCss; quy định thì đọc
   bằng docKhaiBao. */
const laQuyDinh = (s) => /^\s*[a-z-]+\s*:\s*[^:;{}<>“”]+;(\s*[a-z-]+\s*:\s*[^:;{}<>“”]+;)*\s*$/.test(s);
// bộ chọn có thể có “>” (phần tử con trực tiếp)
const laKhoiCss = (s) => /^\s*[^{}<“”]+\{[^{}<>“”]*\}\s*$/.test(s);
const laMaCa = (s) => /^<(?:!DOCTYPE|\/?[a-z])/.test(String(s)) || laKhoiCss(String(s)) || laQuyDinh(String(s));
const maTrong = (s) => (laMaCa(s) ? [String(s)] : [...String(s).matchAll(/“([^”]*)”/g)].map((m) => m[1]).filter((m) => /<[a-z!/]/.test(m) || laKhoiCss(m) || laQuyDinh(m)));
const laMa = (s) => laMaCa(s);
// một đoạn mã là một thẻ mở đứng riêng thì thêm thẻ đóng rồi mới đọc
const docMa = (ma) => { const m = /^<([a-z][a-z0-9]*)[^<>]*>$/.exec(ma); return docHtml(m && !RONG.has(m[1]) ? ma + "</" + m[1] + ">" : ma); };
const docDoan = (ma) => {
  if (/^\s*</.test(ma) || /<[a-z!/]/.test(ma)) {
    const g = docMa(ma);
    tim(g, "style").forEach((st) => docCss(st.kids.map((x) => x.text || "").join("")));
    const di = (n) => (n.kids || []).forEach((k) => { if (k.tag) { if (k.at.style !== undefined) docKhaiBao(k.at.style, "style"); di(k); } });
    di(g); return g;
  }
  if (laKhoiCss(ma)) return docCss(ma);
  return docKhaiBao(ma, "quy định");
};
const hopLe = (ma) => { try { docDoan(ma); return true; } catch (e) { return false; } };
// phần tử có chữ (chữ của chính nó, không tính phần tử con) chứa đoạn t
const theoChu = (g, t) => { const r = []; const di = (n) => (n.kids || []).forEach((k) => { if (!k.tag) return;
  if ((k.kids || []).some((x) => x.text !== undefined && x.text.includes(t))) r.push(k); di(k); }); di(g);
  assert.equal(r.length, 1, "đúng một phần tử có chữ “" + t + "”"); return r[0]; };
// đoạn mã của hình khung mã: chưa có thẻ body thì trình duyệt đặt nội dung vào body (mẫu cho body kế thừa xuống)
const trangMa = (ma) => ganCha(docHtml(/<body[\s>]/.test(ma) ? ma : "<html><body>" + ma + "</body></html>"));
// trang có các mẫu CSS và đoạn HTML: <html><head><style>…</style></head><body>…</body></html>
const trang = (css, html) => docHtml("<html><head><style>" + css + "</style></head><body>" + html + "</body></html>");
const MAU_VIET = { "đỏ": "red", "xanh lá": "green", "xanh dương": "blue", "xanh lam": "blue", "xám": "gray", "cam": "orange", "vàng": "yellow", "đen": "black", "trắng": "white", "navy": "navy", "teal": "teal", "tím": "purple", "maroon": "maroon" };
const cungMau = (a, b) => docMau(a).join() === docMau(b).join();
const tenMau = (v) => { const c = docMau(v); if (c[0] === c[1] && c[1] === c[2]) return c[0] === 0 ? "Đen" : c[0] === 255 ? "Trắng" : "Xám";
  const k = Object.keys(MAU_VIET).find((t) => cungMau(MAU_VIET[t], v)); assert.ok(k, "chưa có tên tiếng Việt cho màu " + v); return k[0].toUpperCase() + k.slice(1); };
// loại phông chung cuối danh sách của font-family
const loaiPhong = (v) => String(v).split(",").map((x) => x.trim()).pop();
// khung mã (hình): nền bg viền line; mỗi dòng mã một thẻ text cỡ 14 căn trái, dòng cách đều 20, lùi đầu dòng 16 mỗi bậc theo số thẻ và
// ngoặc nhọn đang mở; chữ vừa khung. docKhung(svg) → mã (các dòng nối bằng "\n")
const docKhung = (svg) => {
  const W = svgRong(svg), H = svgCao(svg), T = texts(svg), N = tags(svg, "rect");
  assert.ok(W === 320 && N.length === 1 && N[0].fill === "bg" && N[0].stroke === "line" && num(N[0], "x") === 1 && num(N[0], "y") === 1 && num(N[0], "width") === W - 2 && num(N[0], "height") === H - 2, "khung mã: một hình chữ nhật nền bg, viền line");
  assert.ok(T.length >= 2 && T.every((t, k) => t["font-size"] === "14" && !t["text-anchor"] && num(t, "y") === 26 + 20 * k), "khung mã: mỗi dòng một chữ cỡ 14, cách đều 20");
  assert.equal(H, 26 + 20 * (T.length - 1) + 16, "khung mã: cao vừa các dòng");
  const ma = T.map((t) => t.t).join("\n"); docDoan(ma);
  let sau = 0;
  T.forEach((t) => { const mo = (t.t.match(/<[a-z][^>]*>/g) || []).filter((x) => !RONG.has(/^<([a-z0-9]+)/.exec(x)[1])).length + (t.t.match(/\{/g) || []).length;
    const dong = (t.t.match(/<\/[a-z0-9]+>/g) || []).length + (t.t.match(/\}/g) || []).length;
    const bac = /^(<\/|\})/.test(t.t) ? sau - 1 : sau; assert.equal(num(t, "x"), 12 + 16 * bac, "khung mã: lùi đầu dòng theo bậc: " + t.t);
    assert.ok(num(t, "x") + rong(t) <= W - 8, "khung mã: dòng vừa khung: " + t.t); sau += mo - dong; });
  assert.equal(sau, 0, "khung mã: thẻ, ngoặc nhọn đóng đủ");
  daDoc.add(svg); return ma;
};
// Bảng 16.1: phần tử khối, phần tử nội tuyến theo sách (chỉ dùng các thẻ không gây tranh cãi)
const KHOI_SACH = new Set(["h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "form", "table", "hr", "ol", "ul", "li"]);
const NOI_TUYEN_SACH = new Set(["b", "span", "a", "img", "em", "strong", "sub", "sup", "q", "i", "u", "del", "mark", "br", "label", "textarea", "input"]);
// quy định đặt tên lớp, id (Bài 16): bắt đầu bằng chữ cái, chỉ chữ cái không dấu, chữ số, dấu gạch ngang, gạch dưới; phân biệt hoa, thường
const tenHopLe = (t) => /^[A-Za-z][A-Za-z0-9_-]*$/.test(t);

/* ---------- chọn đáp án ---------- */
const motLuaChon = (q, ok) => { const c = q.o.filter(ok); assert.equal(c.length, 1, "đúng một lựa chọn đáp ứng yêu cầu, có " + c.length + ": " + c.join(" | ")); return c[0]; };
// lựa chọn duy nhất có mọi đoạn chữ cho trước (chữ khoá của đáp án theo sách); lựa chọn đúng bằng một chữ
const chon = (q, ...has) => motLuaChon(q, (o) => has.every((h) => o.includes(h)));
const laDung = (q, s) => motLuaChon(q, (o) => o === s);
// ý của câu đúng/sai 4 ý có chữ “…”: bảng chữ của ý → đúng/sai (hàm: tính bằng code)
const yCo = (q, has) => { const i = q.o.findIndex((o) => o.includes(has)); assert.ok(i >= 0, "không thấy ý có “" + has + "”"); assert.equal(q.o.filter((o) => o.includes(has)).length, 1, "nhiều ý có “" + has + "”"); return i; };
const traY = (q, bang) => { const r = q.o.map(() => undefined); Object.entries(bang).forEach(([has, v]) => { const i = yCo(q, has); assert.equal(r[i], undefined, "hai mục cùng khớp ý " + (i + 1)); r[i] = typeof v === "function" ? v(q.o[i]) : v; });
  assert.ok(r.every((v) => typeof v === "boolean"), "mọi ý đều có trong bảng"); return r; };
// mỗi ý đọc bằng một mẫu chữ: theoMau(q, [[biểu thức chính quy, hàm(kết quả khớp) → đúng/sai], …]); mỗi ý khớp đúng một mẫu
const theoMau = (q, ds) => q.o.map((s) => { const k = ds.filter(([re]) => re.test(s)); assert.equal(k.length, 1, "ý cần khớp đúng một mẫu: " + s); const v = k[0][1](k[0][0].exec(s)); assert.equal(typeof v, "boolean", "tính được đúng/sai: " + s); return v; });
const chuCua = (el) => (el.kids || []).map((x) => (x.text !== undefined ? x.text : chuCua(x))).join("");

/* ---------- Python (Tin học 10, Bài 16–32; Tin học 11 định hướng Khoa học máy tính), SQL (Tin học 11, Bài 14): chạy bằng python3 ---------- */
const PY = process.env.PYTHON || "python3";
try { execFileSync(PY, ["-I", "-c", "import sqlite3, ast, keyword, json"], { stdio: "pipe" }); }
catch (e) { assert.fail("cần python3 (có mô-đun sqlite3) để chạy mã Python, câu SQL của đề: " + e.message); }
let soLanChay = 0;
// chạy một đoạn mã Python, vao: chữ gõ từ bàn phím; trả về { out } (bỏ dấu xuống dòng cuối) hay { err } (dòng cuối của thông báo lỗi)
const chayPy = (ma, vao = "") => { soLanChay++;
  try { return { out: execFileSync(PY, ["-I", "-c", ma], { input: vao, encoding: "utf8", timeout: 20000, stdio: ["pipe", "pipe", "pipe"] }).replace(/\n$/, "") }; }
  catch (e) { return { err: String(e.stderr || e.message).trim().split("\n").pop() }; } };
const inRa = (ma, vao) => { const r = chayPy(ma, vao); assert.ok(r.err === undefined, "mã Python lỗi (" + r.err + "):\n" + ma); return r.out; };
// khung mã Python: như docKhung (nền bg viền line, mỗi dòng một chữ cỡ 14 cách đều 20, chữ vừa khung) nhưng lùi đầu dòng 16 mỗi bậc theo khối
// lệnh của Python: dòng đầu không lùi; dòng sau dòng kết thúc bằng “:” lùi thêm đúng một bậc, dòng khác không lùi thêm. docKhungPy(svg) → mã
// (mỗi bậc 4 dấu cách), đã kiểm tra cú pháp bằng ast.parse
const docKhungPy = (svg) => {
  const W = svgRong(svg), H = svgCao(svg), T = texts(svg), N = tags(svg, "rect");
  assert.ok(W === 320 && N.length === 1 && N[0].fill === "bg" && N[0].stroke === "line" && num(N[0], "x") === 1 && num(N[0], "y") === 1 && num(N[0], "width") === W - 2 && num(N[0], "height") === H - 2, "khung mã: một hình chữ nhật nền bg, viền line");
  assert.ok(T.length >= 2 && T.every((t, k) => t["font-size"] === "14" && !t["text-anchor"] && num(t, "y") === 26 + 20 * k), "khung mã: mỗi dòng một chữ cỡ 14, cách đều 20");
  assert.equal(H, 26 + 20 * (T.length - 1) + 16, "khung mã: cao vừa các dòng");
  const bac = T.map((t) => (num(t, "x") - 12) / 16);
  bac.forEach((b, k) => { assert.ok(Number.isInteger(b) && b >= 0, "khung mã: lùi đầu dòng 16 mỗi bậc: " + T[k].t);
    assert.ok(num(T[k], "x") + rong(T[k]) <= W - 8, "khung mã: dòng vừa khung: " + T[k].t);
    if (k === 0) assert.equal(b, 0, "khung mã: dòng đầu không lùi");
    else if (/:$/.test(T[k - 1].t)) assert.equal(b, bac[k - 1] + 1, "khung mã: sau dòng kết thúc bằng “:” lùi thêm một bậc: " + T[k].t);
    else assert.ok(b <= bac[k - 1], "khung mã: dòng không mở khối lệnh thì dòng sau không lùi thêm: " + T[k].t); });
  const ma = T.map((t, k) => "    ".repeat(bac[k]) + t.t).join("\n");
  const r = chayPy("import ast, sys\nast.parse(sys.stdin.read())", ma); assert.ok(r.err === undefined, "khung mã: mã Python viết sai: " + r.err);
  daDoc.add(svg); return ma;
};
// chạy câu SQL trên cơ sở dữ liệu SQLite trong bộ nhớ: bang = { tên bảng: [cột…] }, dong = { tên bảng: [[giá trị…]…] }; trả về các dòng kết
// quả của câu, hay mọi dòng của bảng xem sau khi chạy câu; câu lỗi thì { loi }
const chaySql = (bang, dong, cau, xem) => JSON.parse(inRa("import sqlite3, json, sys\nd = json.loads(sys.stdin.read())\nc = sqlite3.connect(':memory:')\n" +
  "for t, cot in d['bang'].items():\n    c.execute('CREATE TABLE ' + t + ' (' + ', '.join(cot) + ')')\n    c.executemany('INSERT INTO ' + t + ' VALUES (' + ', '.join('?' * len(cot)) + ')', d['dong'][t])\n" +
  "try:\n    r = c.execute(d['cau']).fetchall()\n    if d['xem']:\n        r = c.execute('SELECT * FROM ' + d['xem']).fetchall()\n    print(json.dumps(r, ensure_ascii=False))\n" +
  "except Exception as e:\n    print(json.dumps({'loi': str(e)}))", JSON.stringify({ bang, dong, cau, xem: xem || "" })));

/* ---------- phép tính của Tin học 10, 11, 12 ---------- */
// biểu thức lôgic của hai mệnh đề p, q (Tin học 10, Bài 5: AND, OR, NOT, XOR)
const logic = (s, p, q) => { const js = s.replace(/\bXOR\b/g, "!==").replace(/\bAND\b/g, "&&").replace(/\bOR\b/g, "||").replace(/\bNOT\b/g, "!");
  assert.ok(/^[pq!=&|() ]+$/.test(js), "biểu thức lôgic lạ: " + s); return Function("p", "q", "return (" + js + ");")(p, q); };
const BON = [[false, false], [false, true], [true, false], [true, true]];
// bảng HTML (Tin học 12, Bài 9): vị trí từng ô (hàng r, cột c, số hàng rs, số cột cs) theo rowspan, colspan như trình duyệt; bangO(table)(chữ) → ô
const bangO = (table) => {
  const dung = [], o = [];
  tim(table, "tr").forEach((tr, r) => { let c = 0;
    tr.kids.filter((k) => k.tag === "th" || k.tag === "td").forEach((td) => {
      while (dung[r] && dung[r][c]) c++;
      const rs = +(td.at.rowspan || 1), cs = +(td.at.colspan || 1);
      for (let i = 0; i < rs; i++) for (let j = 0; j < cs; j++) (dung[r + i] = dung[r + i] || [])[c + j] = true;
      o.push({ chu: chuCua(td).trim(), r, c, rs, cs }); c += cs; }); });
  return (t) => { const x = o.filter((v) => v.chu === t); assert.equal(x.length, 1, "đúng một ô có chữ “" + t + "”"); return x[0]; };
};
// kí hiệu đầu dòng của một mục danh sách có thứ tự (Bài 9: type 1, a, A; start): “Số 2”, “Chữ a”
const kiHieu = (li) => { const ol = li.cha; assert.ok(ol && ol.tag === "ol", "mục của danh sách có thứ tự");
  const k = ol.kids.filter((x) => x.tag === "li").indexOf(li) + +(ol.at.start || 1), t = ol.at.type || "1";
  assert.ok(["1", "a", "A"].includes(t), "kiểu đánh thứ tự chưa tính: " + t);
  return t === "1" ? "Số " + k : "Chữ " + String.fromCharCode((t === "a" ? 96 : 64) + k); };
// đường dẫn tương đối (Bài 10): từ thư mục của trang (“” là thư mục gốc), “..” lên thư mục cha
const diDuong = (thuMuc, href) => { const p = thuMuc ? thuMuc.split("/") : [];
  href.split("/").forEach((s) => { if (s === "..") { assert.ok(p.length, "đường dẫn ra ngoài thư mục gốc: " + href); p.pop(); } else if (s !== ".") p.push(s); });
  return p.join("/"); };
// ảnh động GIF làm bằng GIMP (Tin học 11 định hướng Tin học ứng dụng, Bài 28): mỗi lớp một khung hình, lớp dưới cùng hiện đầu tiên; lớp có
// “(… ms)” trong tên hiện chừng đó mili-giây, lớp khác hiện bằng thời gian ghi ở Delay between frames where unspecified; chọn Loop forever thì
// chạy lặp mãi, không chọn thì chạy một lượt rồi dừng
const anhDong = (s) => {
  const m = /ghi các lớp từ trên xuống: ((?:“[^”]+”(?:, )?)+)\./.exec(s); assert.ok(m, "đề ghi các lớp từ trên xuống");
  const mac = so(s, "Delay between frames where unspecified là # mili-giây")[0];
  const khung = [...m[1].matchAll(/“([^”]+)”/g)].map((x) => x[1]).reverse().map((t) => { const d = /^(.+?) \((\d+)ms\)$/.exec(t); return d ? { ten: d[1], ms: +d[2] } : { ten: t, ms: mac }; });
  assert.ok(/không chọn Loop forever/.test(s) !== /(?<!không )chọn Loop forever/.test(s), "đề ghi có chọn Loop forever hay không");
  return { khung, tong: sum(khung.map((k) => k.ms)), lap: !/không chọn Loop forever/.test(s) };
};
const CAN_LE = { center: "Căn giữa", left: "Căn trái", right: "Căn phải", justify: "Căn đều hai bên" };

/* ---------- các mục kiểm tra của từng đề (RIENG; phiên thêm đề thì thêm một khoá mới) ----------
   has: đoạn chữ của đề bài; right(q): câu nhiều lựa chọn trả về lựa chọn đúng, câu đúng/sai 4 ý trả về mảng 4 ý. */
const RIENG = {
  "tin12-tn-de1": [
    { has: "thông tin màu của mỗi điểm ảnh", right: (q) => chon(q, "Độ sâu màu") },
    { has: "Hệ thống báo động của một cửa hàng", right: (q) => { assert.ok(q.q.includes("chỉ sáng khi có đúng một trong hai cửa đang mở"), "đèn sáng khi đúng một cửa mở");
      return motLuaChon(q, (o) => BON.every(([p, r]) => logic(o, p, r) === (p !== r))); } },
    { has: "Khoa tải một trò chơi", right: (q) => chon(q, "Trojan") },
    { has: "Lan lấy một bài hát", right: (q) => chon(q, "vi phạm bản quyền") },
    { has: "đặt đúng quy tắc đặt tên biến", right: (q) => { const ok = JSON.parse(inRa("import keyword, json\nds = json.loads(input())\nprint(json.dumps([s.isidentifier() and not keyword.iskeyword(s) for s in ds]))", JSON.stringify(q.o)));
      return motLuaChon(q, (o) => ok[q.o.indexOf(o)]); } },
    { has: "nhập từ bàn phím một số nguyên", right: (q) => motLuaChon(q, (o) => { const r = chayPy(o + "\nprint(type(n).__name__, n)", "7\n"); return r.err === undefined && r.out === "int 7"; }) },
    { has: "tổng các số lẻ từ 1 đến 19", right: (q) => { const ma = docKhungPy(q.svg), dong = /sửa dòng “([^”]+)”/.exec(q.q)[1], [a, b] = so(q.q, "tổng các số lẻ từ # đến #");
      assert.equal(inRa(ma), String(so(q.q, "trong hình in ra #")[0]), "chương trình trong hình in đúng số ghi ở đề"); assert.ok(ma.includes(dong), "khung mã có dòng cần sửa");
      let can = 0; for (let k = a; k <= b; k++) if (k % 2) can += k; coX(q, "= " + can);
      return motLuaChon(q, (o) => { const r = chayPy(ma.replace(dong, o)); return r.err === undefined && r.out === String(can); }); } },
    { has: "bộ phận nào của bộ xử lí trung tâm", right: (q) => chon(q, "ALU") },
    { has: "chỉ trả về các tệp PDF", right: (q) => chon(q, "filetype:pdf") },
    { has: "Bảng Sach của một thư viện", right: (q) => laDung(q, "MaSach") },
    { has: "SELECT TenSach FROM sach", right: (q) => { const cau = /“(SELECT [^”]+)”/.exec(q.q)[1];
      const dong = [["S1", "Tin hoc 12", "Nhom tac gia", 2024], ["S2", "Cay cam", "Tac gia B", 2020], ["S3", "Bai tap lap trinh", "Tac gia C", 2021], ["S4", "An toan mang", "Tac gia D", 2019]];
      assert.deepEqual(chaySql({ sach: ["MaSach", "TenSach", "TacGia", "NamXB"] }, { sach: dong }, cau), dong.filter((d) => d[3] > 2020).map((d) => [d[1]]).sort(), "câu truy vấn lấy tên sách xuất bản sau năm 2020, xếp theo tên");
      return chon(q, "sau năm 2020", "xếp theo tên sách"); } },
    { has: "thuật ngữ trí tuệ nhân tạo (AI) ra đời", right: (q) => chon(q, "Dartmouth") },
    { has: "Một trang trại dùng hệ thống", right: (q) => laDung(q, "Nông nghiệp") },
    { has: "Một cửa hàng nhỏ chỉ có ba máy tính", right: (q) => chon(q, "Hợp lí, vì mạng ít máy") },
    { has: "gắn với phần cứng của thiết bị mạng", right: (q) => chon(q, "MAC") },
    { has: "“nhìn thấy” máy tính của mình", right: (q) => laDung(q, "Network discovery và File and printer sharing") },
    { has: "tin nhắn riêng mà Hùng gửi", right: (q) => chon(q, "Không đăng") },
    { has: "<!DOCTYPE html>", right: (q) => { assert.ok(docMa("<!DOCTYPE html>").doctype, "dòng khai báo đọc được"); return chon(q, "văn bản HTML"); } },
    { has: "hiển thị in nghiêng", right: (q) => laDung(q, "<i>") },
    { has: "Lịch thi Tin học", right: (q) => { const dich = /Trang “([\w-]+\.html)”/.exec(q.q)[1], id = /id="([\w-]+)"/.exec(q.q)[1];
      return motLuaChon(q, (o) => { const a = tim(docMa(o), "a"); return a.length === 1 && a[0].at.href === dich + "#" + id; }); } },
    { has: "khi ảnh không tải được", right: (q) => laDung(q, "alt") },
    { has: "Phần nào sau đây của một biểu mẫu web", right: (q) => chon(q, "máy chủ") },
    { has: "thẳng vào phần body", right: (q) => { docCss(maTrong(q.q)[0]); return chon(q, "Hiện dòng chữ đó"); } },
    { has: "sửa chữa, thay thế phần cứng", right: (q) => chon(q, "quạt tản nhiệt") },
    { has: "camera có trí tuệ nhân tạo ở các ngã tư", right: (q) => traY(q, { "Nhận ra ô tô, xe máy": true, "không cần người theo dõi": false, "biển số xe, khuôn mặt": true, "chỉ có ảnh chụp ban ngày": true }) },
    { has: "tạo bảng sĩ số của một lớp", right: (q) => { const ma = docKhung(q.svg), bo = (m) => bangO(tim(docHtml(m), "table")[0]), O = bo(ma);
      return theoMau(q, [
        [/^Ô “(.+?)” chiếm hai hàng đầu tiên của cột thứ nhất\.$/, (m) => { const o = O(m[1]); return o.r === 0 && o.rs === 2 && o.c === 0 && o.cs === 1; }],
        [/^Ô “(.+?)” trải trên hai cột, ngay phía trên hai ô “(.+?)” và “(.+?)”\.$/, (m) => { const o = O(m[1]), a = O(m[2]), b = O(m[3]);
          return o.cs === 2 && [a, b].every((x) => x.r === o.r + o.rs) && [a.c, b.c].sort().join() === [o.c, o.c + 1].join(); }],
        [/^Số “(.+?)” nằm ở cột thứ (nhất|hai|ba) của bảng\.$/, (m) => O(m[1]).c === ["nhất", "hai", "ba"].indexOf(m[2])],
        [/^Nếu xoá thuộc tính rowspan="2" của ô “(.+?)” thì ô “(.+?)” sẽ nằm ngay dưới ô “\1”\.$/, (m) => { const cu = '<th rowspan="2">' + m[1] + "</th>"; assert.ok(ma.includes(cu), "mã có ô " + m[1]);
          const O2 = bo(ma.replace(cu, "<th>" + m[1] + "</th>")), a = O2(m[1]), b = O2(m[2]); return b.c === a.c && b.r === a.r + a.rs; }]]); } },
    { has: "Open as Layers", right: (q) => { const A = anhDong(q.q), ms = (t) => { const k = A.khung.filter((x) => x.ten === t); assert.equal(k.length, 1, "một lớp tên " + t); return k[0].ms; };
      coX(q, A.khung.map((k) => k.ms).join(" + ") + " = " + vn(A.tong) + " ms");
      return theoMau(q, [
        [/^Khung hình đầu tiên của ảnh động là lớp “(.+?)”\.$/, (m) => A.khung[0].ten === m[1]],
        [/^Một lượt chạy hết các khung hình kéo dài (\S+) giây\.$/, (m) => gan(val(m[1]) * 1000, A.tong)],
        [/^Ảnh động chạy lặp đi lặp lại mãi không dừng\.$/, () => A.lap],
        [/^Lớp “(.+?)” hiện lâu hơn lớp “(.+?)”\.$/, (m) => ms(m[1]) > ms(m[2])]]); } },
    { has: "câu lạc bộ nhiếp ảnh", right: (q) => traY(q, { "lệnh Bản đồ trong bảng chọn Chèn": true, "Google Drive của Hương không chèn thẳng": false, "thành phần nội dung": true, "dòng bản quyền": false }) },
  ],
  "tin12-tn-de2": [
    { has: "1011 + 110", right: (q) => { const [, a, b] = /nhị phân ([01]+) \+ ([01]+)/.exec(q.q), t = parseInt(a, 2) + parseInt(b, 2); coX(q, "= " + t); return laDung(q, t.toString(2)); } },
    { has: "kể cả chữ Việt có dấu", right: (q) => laDung(q, "Unicode") },
    { has: "Trường em thuê một dịch vụ", right: (q) => chon(q, "điện toán đám mây") },
    { has: "phần mềm Inkscape", right: (q) => chon(q, "vectơ") },
    { has: "17 // 5", right: (q) => laDung(q, inRa("print(" + /biểu thức (.+?) có giá trị/.exec(q.q)[1] + ")")) },
    { has: "làm việc với danh sách A", right: (q) => laDung(q, inRa(docKhungPy(q.svg))) },
    { has: "có phải số nguyên tố hay không", right: (q) => { const ma = docKhungPy(q.svg) + "\nnt = lambda n: all(n % d for d in range(2, n))\n";
      return motLuaChon(q, (o) => inRa(ma + "print(all((" + o + ") == nt(n) for n in range(2, 300)))") === "True"); } },
    { has: "giấy phép công cộng GNU GPL", right: (q) => chon(q, "Công bố mã nguồn") },
    { has: "mã OTP", right: (q) => chon(q, "Không gửi mã") },
    { has: "bảng KhachHang", right: (q) => laDung(q, "Tính nhất quán") },
    { has: "xoá khỏi bảng hocsinh", right: (q) => { const lop = /lớp là (\w+)\?/.exec(q.q)[1], dong = [["An", "12B"], ["Binh", lop], ["Chi", "12C"], ["Dung", lop]];
      const con = JSON.stringify(dong.filter((d) => d[1] !== lop));
      return motLuaChon(q, (o) => JSON.stringify(chaySql({ hocsinh: ["ten", "lop"] }, { hocsinh: dong }, o, "hocsinh")) === con); } },
    { has: "Khi làm ra một phần mềm có trí tuệ nhân tạo", right: (q) => chon(q, "trí thông minh") },
    { has: "giả giọng nói", right: (q) => chon(q, "rủi ro an ninh") },
    { has: "Password protected sharing", right: (q) => chon(q, "tài khoản trên máy đó") },
    { has: "dấu hiệu “nghiện mạng”", right: (q) => chon(q, "Thức khuya") },
    { has: "chế giễu ngoại hình", right: (q) => chon(q, "Không chia sẻ") },
    { has: "meta charset", right: (q) => { docMa(maTrong(q.q)[0]); return chon(q, "tiếng Việt"); } },
    { has: "tiêu đề chính, cấp cao nhất", right: (q) => laDung(q, "<h1>") },
    { has: "list-style-type", right: (q) => { assert.deepEqual([...q.o].sort(), ["circle", "disc", "none", "square"], "bốn giá trị của list-style-type như sách"); return laDung(q, "circle"); } },
    { has: "Lịch trực nhật", right: (q) => laDung(q, "Chữ “" + chuCua(tim(docMa(maTrong(q.q)[0]), "a")[0]) + "”") },
    { has: "hai thẻ <source>", right: (q) => chon(q, "phát được") },
    { has: "phần nằm trong cặp ngoặc nhọn", right: (q) => { docCss(maTrong(q.q)[0]); return laDung(q, "Vùng mô tả"); } },
    { has: "tự hiện chữ đậm", right: (q) => motLuaChon(q, (o) => hopLe(o) && /^h2 \{/.test(o) && docCss(o)[0].kb.some((k) => k[0] === "font-weight" && k[1] === "normal")) },
    { has: "#1E90FF", right: (q) => { const h = /#([0-9A-F]{6})/.exec(q.q)[1], g = parseInt(h.slice(2, 4), 16); coX(q, "= " + g); return laDung(q, String(g)); } },
    { has: "mở trang web học trực tuyến", right: (q) => traY(q, { "gán nhãn cổng ứng dụng": true, "không cần địa chỉ IP của máy An": false, "đều phải tuân theo giao thức mạng": true, "nhiều bộ định tuyến": true }) },
    { has: "biểu mẫu đặt hàng", right: (q) => { const g = trangMa(docKhung(q.svg)), form = tim(g, "form")[0], inp = tim(g, "input");
      const nut = (v) => { const k = inp.filter((i) => i.at.value === v); assert.equal(k.length, 1, "một nút “" + v + "”"); return k[0]; };
      return theoMau(q, [
        [/^Nháy vào nút “(.+?)” thì trình duyệt gửi dữ liệu đã nhập tới đường dẫn (.+?)\.$/, (m) => nut(m[1]).at.type === "submit" && form.at.action === m[2]],
        [/^Nháy vào nút “(.+?)” cũng gửi dữ liệu tới (.+?) như nút “(.+?)”\.$/, (m) => nut(m[1]).at.type === "submit" && nut(m[3]).at.type === "submit" && form.at.action === m[2]],
        [/^Phần tử input có type="file" tạo một ô để gõ đường dẫn của trang web cần mở\.$/, () => { assert.ok(inp.some((i) => i.at.type === "file"), "có ô type=\"file\""); return false; }],
        [/^Khi gửi đi, dữ liệu gõ vào ô “(.+?)” được tham chiếu bằng tên (.+?) ghi ở thuộc tính name\.$/, (m) => { const nhan = tim(g, "label").filter((l) => chuCua(l).startsWith(m[1]));
          assert.equal(nhan.length, 1, "một nhãn “" + m[1] + "”"); const o = inp.filter((i) => i.at.id === nhan[0].at.for); assert.equal(o.length, 1, "nhãn gắn với một ô nhập"); return o[0].at.name === m[2]; }]]); } },
    { has: "Cho chương trình Python trong hình. Mỗi ý", right: (q) => { const ma = docKhungPy(q.svg), out = inRa(ma), m0 = /^(\[[\d, ]+\]) (\d+)$/.exec(out), B = JSON.parse(/\nB = (\[[\d, ]+\])/.exec(ma)[1]);
      assert.ok(m0 && ma.includes("\n    return dem") && /\nd = sap_xep\(B\)\nprint\(B, d\)$/.test(ma), "chương trình in dãy đã xếp và số lần đổi chỗ");
      // dãy sau lượt đầu của vòng lặp ngoài: chạy chính hàm trong hình, in A khi i = 0 vừa xong vòng lặp trong
      const luot1 = inRa(ma.replace("\n    return dem", "\n        if i == 0:\n            print(A)\n    return dem").replace(/\nd = sap_xep\(B\)\nprint\(B, d\)$/, "\nsap_xep(B)"));
      const noiBot = /\n {8}for j in range\(n - 1 - i\):\n {12}if A\[j\] > A\[j\+1\]:\n {16}A\[j\], A\[j\+1\] = A\[j\+1\], A\[j\]/.test(ma), vongLong = /\n {4}for i in range[^\n]*\n {8}for j in range/.test(ma);
      return theoMau(q, [
        [/^Hàm sap_xep dùng cách sắp xếp nổi bọt để đưa dãy về thứ tự tăng dần\.$/, () => noiBot && m0[1] === JSON.stringify([...B].sort((x, y) => x - y)).replace(/,/g, ", ")],
        [/^Sau lượt lặp đầu tiên của vòng lặp ngoài \(i = 0\), dãy B là (\[[\d, ]+\])\.$/, (m) => luot1 === m[1]],
        [/^Chương trình in ra (.+?)\.$/, (m) => m[1] === out],
        [/^Độ phức tạp thời gian của hàm là O\(n\), vì mỗi phần tử chỉ được xét một lần\.$/, () => !vongLong]]); } },
    { has: "dữ liệu mua hàng của 5 000 khách", right: (q) => traY(q, { "là dữ liệu không có nhãn": true, "Bài toán chia nhóm khách hàng này dùng": false, "gắn sẵn nhãn": true, "chỉ cần học một lần": false }) },
  ],
  "tin12-tn-de3": [
    { has: "thiết bị thông minh", right: (q) => chon(q, "nhịp tim") },
    { has: "chu kì lấy mẫu", right: (q) => { const f = so(q.q, "mỗi giây lấy # mẫu")[0], b = so(q.q, "mỗi mẫu ghi bằng # byte")[0], p = so(q.q, "dài # phút")[0], kb = so(q.q, "1 KB = # byte")[0];
      assert.ok(gan(so(q.q, "chu kì lấy mẫu là 1/# giây")[0], f), "chu kì lấy mẫu khớp số mẫu mỗi giây");
      const by = f * b * 60 * p; coX(q, vn(by) + " byte"); return laDung(q, vn(by / kb) + " KB"); } },
    { has: "Vườn rau nhà Hùng", right: (q) => chon(q, "IoT") },
    { has: "nghề phát triển phần mềm", right: (q) => chon(q, "lập trình và kiểm thử") },
    { has: "giá trị 3.0 thuộc kiểu", right: (q) => laDung(q, inRa("print(type(" + /giá trị (\S+) thuộc kiểu/.exec(q.q)[1] + ").__name__)")) },
    { has: "tách một xâu kí tự", right: (q) => laDung(q, inRa(docKhungPy(q.svg))) },
    { has: "cộng một số giá trị của biến k", right: (q) => laDung(q, inRa(docKhungPy(q.svg))) },
    { has: "Loại bộ nhớ ngoài nào", right: (q) => chon(q, "SSD") },
    { has: "nhà quản trị cơ sở dữ liệu", right: (q) => chon(q, "nâng cấp hệ quản trị") },
    { has: "Một hãng xe khách", right: (q) => chon(q, "phân tán") },
    { has: "bị hỏng ổ đĩa", right: (q) => chon(q, "sao lưu") },
    { has: "băng chuyền", right: (q) => laDung(q, "Sản xuất công nghiệp") },
    { has: "mạng cục bộ có dây", right: (q) => laDung(q, "Ethernet") },
    { has: "chỉ nên chia sẻ cho người cần dùng", right: (q) => chon(q, "người xấu") },
    { has: "thư mục “Nhom-4”", right: (q) => chon(q, "Share this folder") },
    { has: "Môi trường hình thành nhờ mạng máy tính", right: (q) => laDung(q, "Thế giới ảo") },
    { has: "lỗi chính tả trong trang", right: (q) => { assert.deepEqual(q.o.slice(1).sort(), ["Cốc Cốc", "Microsoft Edge", "Mozilla Firefox"], "ba lựa chọn sai là trình duyệt web"); return laDung(q, "Notepad++"); } },
    { has: "Thẻ <strong> và thẻ <b>", right: (q) => chon(q, "quan trọng") },
    { has: "danh sách lồng nhau", right: (q) => laDung(q, kiHieu(theoChu(trangMa(docKhung(q.svg)), /Mục “(.+?)”/.exec(q.q)[1]))) },
    { has: "Thời khoá biểu", right: (q) => { const [k, a] = maTrong(q.q).map((m) => docMa(m)), f = tim(k, "iframe")[0], l = tim(a, "a")[0];
      assert.ok(f && l && l.at.target === f.at.name && f.at.id === f.at.name, "target của liên kết là tên (mã định danh) của khung nội tuyến"); return chon(q, "ngay trong khung"); } },
    { has: "thẻ đóng </input>", right: (q) => { assert.ok(RONG.has("input"), "input là thẻ đơn"); return chon(q, "thẻ đơn"); } },
    { has: "Hạn nộp: thứ Sáu", right: (q) => { const [css, html] = maTrong(q.q), g = trang(css, html), v = apCss(g).kieu(tim(g, "p")[0], "text-align");
      assert.ok(CAN_LE[v], "căn lề " + v); return motLuaChon(q, (o) => o.startsWith(CAN_LE[v] + ",")); } },
    { has: "Bản tin", right: (q) => { const [css, html] = maTrong(q.q), g = trang(css, html), ap = apCss(g), d = tim(g, "div")[0];
      return laDung(q, "Rộng " + docPx(ap.kieu(d, "width")) + " pixel, cao " + docPx(ap.kieu(d, "height")) + " pixel"); } },
    { has: "cần có kiến thức về những mảng nào", right: (q) => chon(q, "Phần cứng, phần mềm và kết nối mạng") },
    { has: "Lớp 12A5", right: (q) => traY(q, { "trả lời mỉa mai": false, "Nhờ nhóm, các bạn ở xa nhau": true, "cần kiểm tra nguồn tin": true, "nêu tên công khai": false }) },
    { has: "thư mục con “cu”", right: (q) => {
      ["tệp index.html", "thư mục “anh” chứa logo.png", "thư mục “tin” chứa lich.html và thư mục con “cu”", "trong “cu” có thang11.html", "mã của trang lich.html"].forEach((s) => assert.ok(q.q.includes(s), "đề tả cây thư mục: " + s));
      const TEP = new Set(["index.html", "anh/logo.png", "tin/lich.html", "tin/cu/thang11.html"]), g = trangMa(docKhung(q.svg));
      const lk = (t) => { const a = tim(g, "a").filter((x) => chuCua(x) === t); assert.equal(a.length, 1, "một liên kết “" + t + "”"); return diDuong("tin", a[0].at.href); };
      return theoMau(q, [
        [/^Nháy vào “(.+?)” thì mở tệp index\.html ở thư mục gốc của website\.$/, (m) => lk(m[1]) === "index.html" && TEP.has("index.html")],
        [/^Ảnh (.+?) hiện được trên trang lich\.html\.$/, (m) => { const i = tim(g, "img"); assert.ok(i.length === 1 && i[0].at.src.endsWith(m[1]), "một ảnh " + m[1]); return TEP.has(diDuong("tin", i[0].at.src)); }],
        [/^Nháy vào “(.+?)” thì mở tệp (.+?) trong thư mục (\w+)\.$/, (m) => lk(m[1]) === "tin/" + m[3] + "/" + m[2] && TEP.has(lk(m[1]))],
        [/^Đổi tên thư mục “(.+?)” thành “(.+?)” mà không sửa mã thì liên kết “(.+?)” vẫn mở được trang\.$/, (m) => new Set([...TEP].map((t) => t.replace("tin/" + m[1] + "/", "tin/" + m[2] + "/"))).has(lk(m[3]))]]); } },
    { has: "câu lạc bộ đọc sách", right: (q) => { const m = /thêm trang con “(.+?)” của Trang chủ, rồi thêm trang con “(.+?)” của trang “(.+?)”/.exec(q.q), cha = { [m[1]]: "Trang chủ", [m[2]]: m[3] };
      return traY(q, { "bảng chọn Trang ở khung bên phải": true, "tự gõ lại tên đó": false, "là trang con trực tiếp của": (s) => cha[/“(.+?)”/.exec(s)[1]] === /trực tiếp của (.+?)\.$/.exec(s)[1], "gắn liên kết cho chữ “Xem thêm”": true }); } },
    { has: "phiếu hỏi ý kiến", right: (q) => traY(q, { "ứng dụng Forms của Google": true, "bật Bắt buộc": true, "tự hiện ngay trên trang web": false, "chỉ xem được số phiếu": false }) },
  ],
};

/* ---------- đề và danh mục: số đề, số câu lấy từ danh mục ---------- */
const soDe = (id) => +/de(\d+)$/.exec(id)[1];
const DE = BANKS.filter((b) => /^tin12-tn-de\d+$/.test(b.id)).sort((a, b) => soDe(a.id) - soDe(b.id));
assert.ok(DE.length >= 1, "chưa có đề Tin học thi thử tốt nghiệp nào trong danh mục");
DE.forEach((b, i) => assert.equal(b.id, "tin12-tn-de" + (i + 1), "mã đề phải liên tiếp từ tin12-tn-de1"));
const TN = EVENTS.find((e) => e.id === "tn-thpt-2027");
const P1 = "Phần I. Trắc nghiệm nhiều lựa chọn", P2 = "Phần II. Trắc nghiệm đúng sai";
const KHUNG = [[P1, "mc", 24, 0.25], [P2, "tf4", 4, 1]];
// định hướng của phần riêng (câu 3, 4 của Phần II) từng đề; phiên sau thêm đề thì thêm vào đây
const DINH_HUONG = { 1: "Tin học ứng dụng", 2: "Khoa học máy tính", 3: "Tin học ứng dụng" };
const KHAC = { "Tin học ứng dụng": "Khoa học máy tính", "Khoa học máy tính": "Tin học ứng dụng" };
// tên chủ đề, tên bài theo mục lục của sách (README của từng cuốn ở OnUp-Book; so ở bước sách)
const CHU_DE_10 = ["Máy tính và xã hội tri thức", "Mạng máy tính và Internet", "Đạo đức, pháp luật và văn hoá trong môi trường số", "Ứng dụng tin học",
  "Giải quyết vấn đề với sự trợ giúp của máy tính", "Hướng nghiệp với tin học"];
const CHU_DE_11 = ["Máy tính và xã hội tri thức", "Tổ chức lưu trữ, tìm kiếm và trao đổi thông tin", "Đạo đức, pháp luật và văn hoá trong môi trường số",
  "Giới thiệu các hệ cơ sở dữ liệu", "Hướng nghiệp với tin học"];
const RIENG_11 = { "Tin học ứng dụng": ["Thực hành tạo và khai thác cơ sở dữ liệu", "Phần mềm chỉnh sửa ảnh và làm video"], "Khoa học máy tính": ["Kĩ thuật lập trình"] };
const BAI_12 = ["Làm quen với Trí tuệ nhân tạo", "Trí tuệ nhân tạo trong khoa học và đời sống", "Một số thiết bị mạng thông dụng", "Giao thức mạng",
  "Thực hành chia sẻ tài nguyên trên mạng", "Giao tiếp và ứng xử trong không gian mạng", "HTML và cấu trúc trang web", "Định dạng văn bản", "Tạo danh sách, bảng",
  "Tạo liên kết", "Chèn tệp tin đa phương tiện và khung nội tuyến vào trang web", "Tạo biểu mẫu", "Khái niệm, vai trò của CSS", "Định dạng văn bản bằng CSS",
  "Tạo màu cho chữ và nền", "Định dạng khung", "Các mức ưu tiên của bộ chọn", "Thực hành tổng hợp thiết kế trang web", "Dịch vụ sửa chữa và bảo trì máy tính",
  "Nhóm nghề quản trị trong ngành Công nghệ thông tin", "Hội thảo hướng nghiệp"];
const RIENG_12 = {
  "Tin học ứng dụng": ["Thực hành kết nối các thiết bị số", "Chuẩn bị xây dựng trang web", "Xây dựng phần đầu trang web", "Xây dựng phần thân và chân trang web",
    "Liên kết và thanh điều hướng", "Biểu mẫu trên trang web", "Thực hành tổng hợp"],
  "Khoa học máy tính": ["Tìm hiểu thiết bị mạng", "Đường truyền mạng và ứng dụng", "Sơ bộ về thiết kế mạng", "Làm quen với Học máy", "Làm quen với Khoa học dữ liệu",
    "Máy tính và Khoa học dữ liệu", "Thực hành trải nghiệm trích rút thông tin và tri thức", "Mô phỏng trong giải quyết vấn đề", "Ứng dụng mô phỏng trong giáo dục"] };
// chủ đề Tin học 12 phần chung: đúng chữ chủ đề của ba kho Tin học 12 (tên bài của sách)
const KHO = BANKS.filter((b) => b.file === "12-tin.js" && b.pool), CD_KHO = new Set(KHO.flatMap((b) => Object.keys(b.pool.matrix)));
assert.ok(CD_KHO.size >= 19 && [...CD_KHO].every((t) => BAI_12.includes(t)), "chủ đề của ba kho Tin học 12 là tên bài Tin học 12 của sách");
const lop = (t) => (CD_KHO.has(t) ? 12 : /^Lớp 11 · /.test(t) && CHU_DE_11.includes(t.slice(9)) ? 11 : /^Lớp 10 · /.test(t) && CHU_DE_10.includes(t.slice(9)) ? 10 : 0);
// phần riêng: “<định hướng> · <tên bài Tin học 12>” hay “<định hướng> · Lớp 11 · <tên chủ đề riêng của Tin học 11>” → định hướng
const rieng = (t) => { const m = /^(Tin học ứng dụng|Khoa học máy tính) · (?:Lớp 11 · (.+)|(.+))$/.exec(t); if (!m) return null;
  return (m[2] ? RIENG_11[m[1]].includes(m[2]) : RIENG_12[m[1]].includes(m[3])) ? m[1] : null; };
const thuTuCD = (t) => (lop(t) === 12 ? BAI_12.indexOf(t) : lop(t) === 11 ? CHU_DE_11.indexOf(t.slice(9)) : CHU_DE_10.indexOf(t.slice(9)));
DE.flatMap((b) => b.questions).forEach((q) => assert.ok(("chu-de:12:tin:" + q.topic).length <= 80, "mã đề “Ôn chủ đề” quá 80 kí tự: " + q.topic));

/* ---------- chạy kiểm tra từng câu ---------- */
let n = 0;
const dung = new Set();
DE.forEach((b) => {
  const CK = RIENG[b.id]; assert.ok(CK, b.id + ": chưa có các mục kiểm tra của đề ở RIENG"); assert.equal(b.questions.length, b.n, b.id + ": số câu khác danh mục");
  b.questions.forEach((q, i) => {
    const at = b.id + "#" + (i + 1), cs_ = CK.filter((c) => q.q.includes(c.has)), dai_ = Math.max(...cs_.map((c) => c.has.length)), ch = cs_.filter((c) => c.has.length === dai_);
    assert.equal(ch.length, 1, at + ": cần đúng một mục kiểm tra cho “" + q.q.slice(0, 60) + "…”, có " + ch.length);
    const c = ch[0]; assert.ok(!dung.has(c), at + ": hai câu cùng khớp “" + c.has + "”"); dung.add(c);
    try {
      const want = c.right(q);
      const got = q.type === "tf4" ? q.a : q.o[0];
      assert.strictEqual(JSON.stringify(got), JSON.stringify(want), "đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
      if (q.type === "mc") {
        assert.ok(new Set(q.o).size === 4 && q.o.length === 4, "bốn lựa chọn khác nhau");
        const L = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn lựa chọn sai");
      }
      if (q.type === "tf4") {
        assert.ok(q.o.length === 4 && q.a.includes(true) && q.a.includes(false), "đúng/sai 4 ý có cả ý đúng và ý sai");
        // lời giải ghi “a) Đúng: …”, “b) Sai: …” theo đúng đáp án
        q.a.forEach((a, k) => assert.ok(q.x.includes("abcd"[k] + ") " + (a ? "Đúng" : "Sai") + ":"), "lời giải ghi “" + "abcd"[k] + ") " + (a ? "Đúng" : "Sai") + ":”"));
      }
      if (q.svg) assert.ok(daDoc.has(q.svg), "khung mã chưa được đọc lại");
    } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
    n++;
  });
});
assert.deepEqual(Object.keys(RIENG).sort(), DE.map((b) => b.id).sort(), "RIENG có đúng các đề thi thử của danh mục");
assert.deepEqual(Object.entries(RIENG).flatMap(([id, ck]) => ck.filter((c) => !dung.has(c)).map((c) => id + ": " + c.has)), [], "có mục kiểm tra không khớp câu nào");
// mọi đoạn mã HTML, CSS trong chữ của đề (trong ngoặc kép “…”, hay lựa chọn, lời giải là một đoạn mã) đọc lại được
const chu = (q) => [q.q, q.x].concat(q.o || []).map(String);
{
  let dem = 0;
  DE.forEach((b) => b.questions.forEach((q, i) => chu(q).forEach((s) => maTrong(s).forEach((ma) => {
    try { docDoan(ma); dem++; } catch (e) { assert.fail(b.id + "#" + (i + 1) + ": đoạn mã viết sai (" + e.message + "): " + ma); } }))));
  assert.ok(dem >= 5 * DE.length, "ít nhất 5 đoạn mã HTML, CSS mỗi đề được đọc lại, có " + dem);
  n += dem;
}

/* ---------- khung đề (Quyết định 764/QĐ-BGDĐT; đề chính thức năm 2025, 2026): danh mục, phần, điểm, mức độ, phạm vi, lời dặn ---------- */
const KIEU = {};
DE.forEach((b) => {
  const at = b.id, qs = b.questions, so_ = soDe(b.id), dh = DINH_HUONG[so_];
  assert.ok(dh, at + ": chưa ghi định hướng của phần riêng ở DINH_HUONG");
  assert.deepEqual([b.title, b.grade, b.subject, b.minutes, b.pts, b.file, !!b.pool, b.auto], ["Tin học 12 · Thi thử tốt nghiệp · Đề " + so_, 12, "Tin học", 50, 10, "12-tin.js", false, undefined], at + ": danh mục");
  assert.ok(TN && TN.banks.includes(b.id) && TN.grades.includes(12) && TN.subjects.includes("Tin học"), at + ": phải gắn vào tn-thpt-2027");
  let k = 0;
  KHUNG.forEach(([part, type, n_, pt]) => { const ph = qs.slice(k, k + n_); k += n_;
    assert.ok(ph.length === n_ && ph.every((q) => q.part === part && q.type === type && q.pt === pt), at + ": " + part + " gồm " + n_ + " câu " + type + ", mỗi câu " + pt + " điểm"); });
  assert.equal(k, qs.length, at + ": đề có đúng 28 câu theo khung 24 – 4");
  const G = Quiz.grade(qs, qs.map(() => null));
  assert.ok(G.max === 10 && G.got === 0, at + ": Quiz.grade: tối đa 10 điểm");
  assert.deepEqual(G.parts.map((p) => [p.part, p.max]), [[P1, 6], [P2, 4]], at + ": điểm tối đa từng phần 6 – 4");
  const p1 = qs.slice(0, 24), p2 = qs.slice(24);
  p1.forEach((q, i) => assert.ok(lop(q.topic), at + "#" + (i + 1) + ": Phần I chỉ có câu phần chung; chủ đề lạ “" + q.topic + "”"));
  const muc = (ds, l) => [1, 2, 3].map((v) => ds.filter((q) => q.lv === v && (!l || lop(q.topic) === l)).length);
  assert.deepEqual(muc(p1), [16, 6, 2], at + ": Phần I 16 Biết, 6 Hiểu, 2 Vận dụng");
  assert.deepEqual([muc(p1, 10), muc(p1, 11), muc(p1, 12)], [[4, 2, 1], [3, 1, 0], [9, 3, 1]], at + ": mức của câu Tin học 10, 11, 12 ở Phần I");
  // Phần II: câu 1, 2 phần chung Tin học 12, câu 3, 4 phần riêng của định hướng ghi ở DINH_HUONG; mức 2, 2, 3, 3
  assert.ok(p2.slice(0, 2).every((q) => lop(q.topic) === 12) && p2.slice(2).every((q) => rieng(q.topic) === dh), at + ": Phần II hai câu chung Tin học 12 rồi hai câu riêng của định hướng " + dh);
  assert.deepEqual(p2.map((q) => q.lv).sort(), [2, 2, 3, 3], at + ": Phần II bốn câu ghi mức 2, 2, 3, 3");
  BAI_12.forEach((t) => assert.ok(qs.filter((q) => q.topic === t).length <= 2, at + ": bài “" + t + "” quá hai câu"));
  // thứ tự: Phần I câu lớp 10, rồi lớp 11, rồi lớp 12, mỗi lớp theo thứ tự chủ đề, bài; hai câu chung của Phần II theo thứ tự bài
  const kh = (q) => [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3][lop(q.topic)] * 100 + thuTuCD(q.topic);
  p1.map(kh).forEach((x, i, v) => i && assert.ok(x >= v[i - 1], at + ": thứ tự câu trong Phần I (câu " + (i + 1) + ")"));
  assert.ok(kh(p2[0]) <= kh(p2[1]), at + ": thứ tự hai câu chung của Phần II");
  // lời dặn: định hướng của phần riêng, đề của định hướng kia, số câu mỗi lớp tính từ dữ liệu
  const c = (l) => p1.filter((q) => lop(q.topic) === l).length;
  ["Quyết định 764/QĐ-BGDĐT", "thí điểm thi trên máy tính", "Như đề chính thức năm 2025, 2026, cả 24 câu Phần I là phần chung",
    "Phần II còn 2 câu riêng cho định hướng Khoa học máy tính và 2 câu riêng cho định hướng Tin học ứng dụng",
    `ở đề này Phần I có ${c(10)} câu Tin học 10, ${c(11)} câu phần chung Tin học 11 (Bài 1–16) và ${c(12)} câu phần chung Tin học 12 (Bài 1–21)`,
    `đề này có sẵn phần riêng của định hướng ${dh} (câu 3, 4 của Phần II); học định hướng ${KHAC[dh]} thì làm Đề `,
    `câu 3, 4 thuộc phần riêng của định hướng ${dh}`, `Đề có ${qs.length} câu, làm trong ${b.minutes} phút`,
    "Phần I gồm 24 câu nhiều lựa chọn (6 điểm, mỗi câu 0,25 điểm)", "Phần II gồm 4 câu đúng/sai, mỗi câu 4 ý (4 điểm)", "đề Tin học không có Phần III",
    "Đề không có câu tự chấm"].forEach((s) => assert.ok(b.note.includes(s), at + ": lời dặn thiếu “" + s + "”"));
  const chi = [...b.note.matchAll(/(?:thì làm|hoặc) Đề (\d+)/g)].map((m) => +m[1]);
  assert.ok(chi.length && chi.every((x) => DINH_HUONG[x] === KHAC[dh] && DE.some((d) => soDe(d.id) === x)), at + ": lời dặn chỉ sang đề có phần riêng của định hướng kia: " + chi);
  assert.deepEqual(chi.sort(), DE.map((d) => soDe(d.id)).filter((x) => DINH_HUONG[x] === KHAC[dh]), at + ": lời dặn chỉ sang mọi đề của định hướng kia");
  p2.slice(2).forEach((q) => { const t = q.topic.replace(/^(?:Tin học ứng dụng|Khoa học máy tính) · /, "");
    assert.ok(b.note.includes(/^Lớp 11 · /.test(t) ? "Tin học 11: " + t.slice(9) : "Tin học 12: Bài " + (dh === "Tin học ứng dụng" ? "22–28" : "22–30")), at + ": lời dặn ghi phần riêng của câu “" + q.topic + "”"); });
  // đúng/sai 4 ý: trong một đề không lặp kiểu Đ/S
  const kieu = qs.filter((q) => q.type === "tf4").map((q) => q.a.map((a) => (a ? "Đ" : "S")).join(""));
  assert.equal(new Set(kieu).size, kieu.length, at + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + kieu.join(", "));
  kieu.forEach((x) => (KIEU[x] = (KIEU[x] || 0) + 1));
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn của đề
  const mc = qs.filter((q) => q.type === "mc" && new Set(q.o.map((o) => o.length)).size > 1), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  const dai2 = mc.filter((q) => hon(q, (a, c_) => a > c_)).length, ngan = mc.filter((q) => hon(q, (a, c_) => a < c_)).length;
  assert.ok(dai2 * 3 <= mc.length && ngan * 3 <= mc.length && (dai2 + ngan) * 6 >= mc.length, at + `: đáp án đúng dài nhất ở ${dai2}, ngắn nhất ở ${ngan} trong ${mc.length} câu`);
  b._le = dai2 + ngan; b._mc = mc.length;
});
assert.ok(Object.values(KIEU).every((c) => c <= 3), "một kiểu Đ/S dùng quá ba lần trong các đề thi thử: " + JSON.stringify(KIEU));
// Đề 1–3 (Phiên N12-tn-tin): phủ đủ 6 chủ đề Tin học 10, 5 chủ đề phần chung Tin học 11; các bài Tin học 12 của ba kho thiếu không quá hai
// (Bài 17, Bài 20: ba kho đã có 26 và 12 câu hỏi hết các ý của bài, câu mới dễ lộ đáp án câu kho)
if (DE.length >= 3) {
  const ba = DE.slice(0, 3).flatMap((b) => b.questions);
  assert.deepEqual([...new Set(ba.filter((q) => lop(q.topic) === 10).map((q) => q.topic.slice(9)))].sort(), [...CHU_DE_10].sort(), "Đề 1–3 phủ đủ 6 chủ đề Tin học 10");
  assert.deepEqual([...new Set(ba.filter((q) => lop(q.topic) === 11).map((q) => q.topic.slice(9)))].sort(), [...CHU_DE_11].sort(), "Đề 1–3 phủ đủ 5 chủ đề phần chung Tin học 11");
  const co = new Set(ba.filter((q) => lop(q.topic) === 12).map((q) => q.topic)), thieu = [...CD_KHO].filter((t) => !co.has(t));
  assert.ok(thieu.length <= 2, "Đề 1–3 thiếu quá hai bài Tin học 12 của ba kho: " + thieu.join("; "));
  DE[0]._thieu = thieu;
}
// câu nhiều lựa chọn: đáp án đúng không là lựa chọn duy nhất có chữ của nhãn chủ đề; ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
{
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), loi = [];
  DE.forEach((b) => b.questions.forEach((q, i) => {
    if (q.type !== "mc") return;
    const at = b.id + "#" + (i + 1), c = chuThuong(q.topic.replace(/^(?:Tin học ứng dụng · |Khoa học máy tính · )?(?:Lớp 1[01] · )?/, ""));
    const tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|một|giữa|từ|đến|năm|nay|sau|người)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); if (co[0] && !co.slice(1).some(Boolean)) loi.push(`${at}: chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    if (dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1) loi.push(at + ": ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”");
  }));
  assert.deepEqual(loi, [], "câu nhiều lựa chọn có gợi ý từ chữ của lựa chọn:\n" + loi.join("\n"));
}

/* ---------- chữ ---------- */
{
  const loi = [], kt = (ok, m) => ok || loi.push(m);
  DE.forEach((b) => b.questions.map((q) => [b.id + ": " + q.q.slice(0, 50), chu(q), /Python|nhị phân/.test(q.q) || !!q.svg]).concat([[b.id + ": lời dặn", [b.note], false]]).forEach(([at, ss, coMa]) => ss.forEach((s) => {
    // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân (năm viết liền); bỏ đoạn trong ngoặc kép “…”, mã màu, tên tệp; câu có mã Python,
    // số nhị phân thì không xét (giá trị như 3.0, số như 10001 viết như trong mã)
    const ngoai = s.replace(/“[^”]*”/g, " ").replace(/#[0-9A-Fa-f]{6}\b/g, " ").replace(/[\w-]+\.(?:html|css|png|pdf|mp4|webm)\b/g, " ");
    if (!coMa) kt(!/(?<![,\d])\d{5,}/.test(ngoai) && [...ngoai.matchAll(/(?<![\d,])\d{4}(?![\d,])/g)].every((x) => /^(19|20)\d\d$/.test(x[0])) && !/\d\.\d/.test(ngoai), at + ": số viết sai cách: " + s.slice(0, 120));
    // dấu thanh kiểu sách: oa, oe, uy không có phụ âm cuối đặt dấu ở nguyên âm sau (hoá, khoẻ, thuỷ, tuỳ); kĩ, lí
    kt(!/[òóỏõọ][ae](?![\p{L}])|[ùúủũụ]y(?![\p{L}])|(?<![\p{L}])(?:kỹ|lý)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s.slice(0, 120));
    kt(!/(?<![\p{L}])(?:huyện|63 tỉnh|64 tỉnh|cấp huyện)(?![\p{L}])/iu.test(s), at + ": đơn vị hành chính cũ: " + s.slice(0, 120));
    kt(!/(phương án|lựa chọn|ý) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(s), at + ": nhắc vị trí của phương án (app xáo phương án): " + s.slice(0, 120));
  })));
  assert.deepEqual(loi, [], "chữ viết khác quy ước:\n" + loi.join("\n"));
}

/* ---------- so với ba kho Tin học 12 và giữa các đề thi thử: đề bài không trùng, không gần trùng; đáp án không trùng câu cùng chủ đề ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const ten = new Map();
DE.forEach((b) => b.questions.forEach((q, i) => ten.set(q, b.id.replace("tin12-", "") + "#" + (i + 1))));
const KHO_Q = BANKS.filter((b) => b.file === "12-tin.js" && !b.pool && !/^tin12-tn-/.test(b.id)).flatMap((b) => b.questions.map((q, i) => { ten.set(q, b.id.replace("tin12-", "") + "#" + (i + 1)); return Object.assign(q, { _de: b.id }); }));
const TNQ = DE.flatMap((b) => b.questions.map((q) => Object.assign(q, { _de: b.id })));

// tên riêng nhiều chữ (phần mềm, dịch vụ, mục cài đặt, địa danh): mỗi tên tính là một từ khi so với chữ của sách và của kho khác
const GOP = ["Google Sites", "Google Forms", "Google Drive", "Google Maps", "Microsoft Edge", "Mozilla Firefox", "Cốc Cốc", "Đại học Dartmouth", "Alan Turing",
  "GNU GPL", "Việt Nam", "Hải Phòng", "Cà Mau"];
// cụm từ chung của môn: tên bài, tên chủ đề, thuật ngữ, tên mục cài đặt, cách nói chung của đề (thay bằng dấu ngăn trước khi so)
const TU_CHUNG = [...BAI_12, ...CHU_DE_10, ...CHU_DE_11, ...Object.values(RIENG_11).flat(), ...Object.values(RIENG_12).flat(),
  "mỗi ý sau đúng hay sai", "nào sau đây", "nào dưới đây", "đoạn mã trong hình", "chương trình python trong hình", "trong hình",
  "đề thi thử theo cấu trúc đề thi tốt nghiệp thpt từ năm 2025", "năm 2027 thí điểm thi trên máy tính ở nơi đủ điều kiện, đề như thi giấy",
  "phần i gồm 24 câu nhiều lựa chọn (6 điểm, mỗi câu 0,25 điểm)", "phần ii gồm 4 câu đúng/sai, mỗi câu 4 ý (4 điểm)",
  "app chấm tự động cả hai phần như đề thật", "đúng 1, 2, 3 hay cả 4 ý của một câu thì câu đó được 0,1; 0,25; 0,5 hay 1 điểm",
  "đề không có câu tự chấm, nên điểm lưu ở mục kết quả là điểm của cả đề",
  "trí tuệ nhân tạo", "cơ sở dữ liệu", "hệ quản trị cơ sở dữ liệu", "mạng máy tính", "mạng cục bộ", "trình duyệt web", "trang web", "khung nội tuyến",
  "danh sách không có thứ tự", "danh sách có thứ tự", "danh sách lồng nhau", "học có giám sát", "học không giám sát", "sắp xếp nổi bọt", "phần mềm nguồn mở",
  "điện toán đám mây", "kết nối vạn vật", "thiết bị thông minh", "độ sâu màu", "bộ chia tín hiệu", "bộ chuyển mạch", "bộ định tuyến", "địa chỉ ip", "địa chỉ mac",
  "khoá chính", "câu truy vấn", "lớp giả", "bộ chọn", "vùng mô tả", "mẫu định dạng", "phần tử cha", "thẻ đơn", "tệp css ngoài",
  "network discovery", "file and printer sharing", "password protected sharing", "advanced sharing settings", "share this folder", "public networks",
  "open as layers", "loop forever", "delay between frames where unspecified", "as animation", "thêm trang con", "bảng chọn chèn",
  "quản trị và bảo trì hệ thống", "bảo mật hệ thống thông tin", "quản trị mạng", "sửa chữa và bảo trì máy tính", "nghề phát triển phần mềm", "nghề thiết kế đồ hoạ máy tính"];
const boDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP_ = GOP.map(boDau).sort((a, b) => b.length - a.length), TU_CHUNG_ = TU_CHUNG.map((p) => " " + boDau(p) + " ").sort((a, b) => b.length - a.length);
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
const khongDau = nhoChuoi((s) => {
  let t = " " + boDau(s) + " ";
  TU_CHUNG_.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  GOP_.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); });
  return t.replace(/[aeiouy]+/g, "a").replace(/\s+/g, " ").trim();
});
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
{
  const ds = BANKS.filter((b) => b.file === "12-tin.js" && !b.pool).flatMap((b) => b.questions.map((q) => ({ q, k: gocChu(q.q) })));
  TNQ.forEach((q) => assert.deepEqual(ds.filter((e) => e.k === gocChu(q.q)).map((e) => ten.get(e.q)), [ten.get(q)], "đề bài trùng câu khác trong 12-tin.js"));
  // cặp hai âm tiết liền nhau (như tests/ktpl12-tn.js): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của ba kho và số cặp chung từ
  // một nửa số cặp của câu ít cặp hơn thì báo; không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung và cặp có ở từ 3% số câu của
  // file. Giữa các đề thi thử chỉ so chuỗi 6 từ.
  const CUM = ["mỗi ý sau đúng hay sai", "nào sau đây", "nào dưới đây", "đoạn mã trong hình", "chương trình python trong hình"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c_) => { t = t.split(c_).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c_) => c_.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const ca = KHO_Q.concat(TNQ), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c_) => (df[c_] = (df[c_] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c_) => !nhan.has(c_) && df[c_] < 0.03 * ca.length)); };
  const gan_ = [], gan6 = [], trung = [];
  TNQ.forEach((q) => {
    const c = capAm(q);
    KHO_Q.concat(TNQ.filter((p) => p._de !== q._de)).forEach((p) => {
      const d = capAm(p), chung = [...c].filter((x) => d.has(x));
      if (!/^tin12-tn-/.test(p._de) && chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`);
      const s = " " + khongDau(p.q) + " "; chuoi(q.q, 6).forEach((x) => { if (s.includes(" " + x + " ")) gan6.push(ten.get(q) + " ~ " + ten.get(p) + ": " + x); });
      if (p.topic !== q.topic) return;
      if (q.type === "mc" && p.type === "mc" && gocChu(q.o[0]) === gocChu(p.o[0])) trung.push(ten.get(q) + " ~ " + ten.get(p) + ": đáp án trùng câu cùng chủ đề");
    });
  });
  assert.deepEqual([...new Set(gan_)], [], "đề bài gần trùng (cặp hai âm tiết) câu khác:\n" + [...new Set(gan_)].join("\n"));
  assert.deepEqual([...new Set(gan6)], [], "đề bài gần trùng (chuỗi 6 từ) câu khác:\n" + [...new Set(gan6)].join("\n"));
  assert.deepEqual(trung, [], "đáp án trùng câu cùng chủ đề:\n" + trung.join("\n"));
}

/* ---------- dò lộ đáp án (như tests/ktpl12-tn.js) ----------
   Đề cố định: mọi câu cùng hiện, lời dặn hiện ở màn mở đề; đề “Ôn chủ đề” rút chung câu cùng chủ đề của các đề thi thử và ba kho Tin học 12.
   Như tests/soat-nhap.js: đáp án là một số (17 // 5 → 3) thì tìm số đó ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”):
   không được có; đáp án khác: số không nguyên hay từ 10 trở lên trong đáp án tìm như vậy, chữ của đáp án tách thành các chuỗi 3 từ liền nhau
   (đáp án từ 3 từ trở xuống thì lấy cả đáp án); chuỗi có ở từ hai lựa chọn sai thì không chỉ ra được lựa chọn đúng nên bỏ; chuỗi có trong đề
   bài, lựa chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. */
const KQ = new RegExp("(?:=|(?:^|[\\s(])(?:là|bằng|được))\\s+(" + NUM + ")(?![\\d,])", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => val(x[1]));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/[\]{}]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["trí tuệ nhân", "tuệ nhân tạo", "cơ sở dữ", "sở dữ liệu", "hệ quản trị", "quản trị cơ", "trị cơ sở", "mẫu định dạng", "nghề sửa chữa"]);
const chuP = (p) => (p.type === "note" ? [p.x] : chu(p));
const NOTES = DE.map((b) => { const o = { q: b.id + "-note", x: b.note, topic: "note", type: "note", _de: b.id }; ten.set(o, b.id.replace("tin12-", "") + "-note"); return o; });
const laSo = (q) => q.type === "mc" && /^[−-]?\d[\d ]*(,\d+)?$/.test(String(q.o[0]).trim());
const soCua = (q) => (laSo(q) ? [+String(q.o[0]).trim().replace(/ /g, "").replace("−", "-").replace(",", ".")] : q.type === "mc" ? [...String(q.o[0]).matchAll(new RegExp(NUM, "gu"))].map((x) => val(x[0])).filter((v) => !Number.isInteger(v) || Math.abs(v) >= 10) : []);
const doLo = (qs, them, cap) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    let C = [];
    const soDa = soCua(q);
    if (q.type === "mc" && !laSo(q)) { const c3 = cum3(q.o[0]), sai = q.o.slice(1).map((o) => " " + tuCua(o).join(" ") + " ");
      C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)].filter((c) => sai.filter((o) => o.includes(" " + c + " ")).length < 2); }
    qs.concat(them).forEach((p) => {
      if (p === q || !cap(p, q)) return;
      const at = `${ten.get(p)} → ${ten.get(q)}: `, T = " " + chuP(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chuP(p).flatMap(kqSo).some((y_) => gan(y_, d))).forEach((d) => lo.push(at + d));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
// trong một đề (mọi câu cùng hiện) và với lời dặn của đề
const r1 = doLo(TNQ, NOTES, (p, q) => p._de === q._de);
// cùng chủ đề (đề “Ôn chủ đề”): câu của đề thi thử với câu cùng chủ đề của đề thi thử khác và của ba kho (trừ câu tự luận)
const onCD = TNQ.concat(KHO_Q.filter((q) => q.type !== "essay" && TNQ.some((t) => t.topic === q.topic)));
const r2 = doLo(onCD, [], (p, q) => p.topic === q.topic && p._de !== q._de && (/^tin12-tn-/.test(p._de) || /^tin12-tn-/.test(q._de)));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác (xem tay):\n" + [...r1.chuLo, ...r2.chuLo].join("\n"));
// Đã xem tay (Phiên N12-tn-tin): chữ của đáp án có ở câu khác nhưng không chỉ ra đáp án.
const DA_XEM = [
  // lựa chọn sai của câu kho là đáp án của câu thi thử; câu kho không nói thẻ, giá trị đó làm gì
  "ck1-de1#14 → tn-de2#18: <h1>", "gk2-de1#7 → tn-de2#23: font weight normal",
];
assert.deepEqual([...r1.chuLo, ...r2.chuLo].sort(), [...DA_XEM].sort(), "đáp án bằng chữ có ở câu khác đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual([...r1.lo, ...r2.lo], [], "lộ đáp án:\n" + [...r1.lo, ...r2.lo].join("\n"));

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (nếu có); tên chủ đề, tên bài theo mục lục ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const truongChu = (q) => (q.type === "note" ? [q.x] : chu(q));
// tra nhanh: các chuỗi k từ của chữ đề thi thử (Map chuỗi → các câu), đi một lượt qua chữ nguồn đã chuẩn hoá; trả về Map chuỗi → các mã nguồn có chuỗi đó
const chuoiDe = (k) => { const m = new Map(); TNQ.concat(NOTES).forEach((q) => new Set(truongChu(q).flatMap((x) => chuoi(x, k))).forEach((c) => { if (!m.has(c)) m.set(c, []); m.get(c).push(q); })); return m; };
const timChuoi = (nguon, k, ds) => {
  const dau = new Set([...ds.keys()].map((c) => c.split(" ").slice(0, 2).join(" "))), ra = new Map();
  nguon.forEach(({ id, t }) => { const w = t.split(" "); for (let i = 0; i + k <= w.length; i++) { if (!dau.has(w[i] + " " + w[i + 1])) continue; const c = w.slice(i, i + k).join(" ");
    if (ds.has(c)) { if (!ra.has(c)) ra.set(c, new Set()); ra.get(c).add(id); } } });
  return ra;
};
if (SACH.length) {
  const CUON = { 10: "lop-10/tin-hoc-10", ud11: "lop-11/tin-hoc-11-tin-hoc-ung-dung", kh11: "lop-11/tin-hoc-11-khoa-hoc-may-tinh",
    ud12: "lop-12/tin-hoc-12-tin-hoc-ung-dung", kh12: "lop-12/tin-hoc-12-khoa-hoc-may-tinh" };
  assert.ok(Object.values(CUON).every((c) => SACH.some((f) => f.includes(c))), "OnUp-Book có Tin học 10, Tin học 11 và Tin học 12 của hai định hướng");
  // mục lục: chỉ đọc mục “## Mục lục” của README; chủ đề “**Chủ đề N. Tên**”, bài “Bài N. Tên |”
  const ml = (c) => { const f = path.join(BOOK, c, "README.md"); assert.ok(fs.existsSync(f), "có README của " + c); const r = fs.readFileSync(f, "utf8"), i = r.indexOf("## Mục lục");
    assert.ok(i >= 0, c + ": README có mục lục"); return r.slice(i, (r.indexOf("\n## ", i + 5) + 1 || r.length + 1) - 1); };
  const cd = (c) => [...ml(c).matchAll(/\*\*Chủ đề (\d+)\. ([^*]+?)\*\*/g)].map((x) => x[2].trim());
  const bai = (c) => [...ml(c).matchAll(/Bài (\d+)\. ([^|]+?) \|/g)].map((x) => x[2].trim());
  assert.deepEqual(cd(CUON[10]), CHU_DE_10, "sáu chủ đề của Tin học 10 theo mục lục");
  assert.deepEqual(cd(CUON.ud11), [...CHU_DE_11, ...RIENG_11["Tin học ứng dụng"]], "chủ đề của Tin học 11 định hướng Tin học ứng dụng theo mục lục");
  assert.deepEqual(cd(CUON.kh11), [...CHU_DE_11, ...RIENG_11["Khoa học máy tính"]], "chủ đề của Tin học 11 định hướng Khoa học máy tính theo mục lục");
  assert.deepEqual(bai(CUON.ud12), [...BAI_12, ...RIENG_12["Tin học ứng dụng"]], "bài của Tin học 12 định hướng Tin học ứng dụng theo mục lục");
  assert.deepEqual(bai(CUON.kh12), [...BAI_12, ...RIENG_12["Khoa học máy tính"]], "bài của Tin học 12 định hướng Khoa học máy tính theo mục lục");
  const sach = SACH.map((f) => ({ id: f, t: khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")) }));
  const bao = (k) => { const ds = chuoiDe(k), gap = timChuoi(sach, k, ds); return [...gap.keys()].flatMap((c) => ds.get(c).map((q) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách:\n" + [...new Set(bao(8))].join("\n"));
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả ba kho Tin học 12 và giữa các đề thi thử ---------- */
{
  const cua = (b, q) => ({ id: b.id, t: chu(q).map(khongDau).join(" | ") });
  const khac = BANKS.filter((b) => !b.pool).flatMap((b) => b.questions.map((q) => cua(b, q))).concat(BANKS.filter((b) => b.pool).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => { const ds = chuoiDe(k), gap = timChuoi(khac, k, ds);
    return [...gap.keys()].flatMap((c) => ds.get(c).flatMap((q) => [...gap.get(c)].filter((id) => id !== q._de).map((id) => `${ten.get(q)} ~ ${id}: ${c}`))); };
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác:\n" + [...new Set(bao(8))].join("\n"));
}

/* ---------- tự thử các bộ tính với câu cố ý viết sai ---------- */
{
  const hong = (f, m) => assert.throws(f, undefined, "tự thử: " + m);
  const muc = (id, has) => { const q = TNQ.find((x) => x._de === id && x.q.includes(has)), c = RIENG[id].find((x) => q.q.includes(x.has)); return { q, c }; };
  // bảng chân trị
  assert.ok(BON.every(([p, r]) => logic("p XOR q", p, r) === (p !== r)) && !BON.every(([p, r]) => logic("p OR q", p, r) === (p !== r)), "tự thử: bảng chân trị");
  hong(() => logic("p + q", true, false), "biểu thức lôgic lạ");
  // Python: chạy được, báo lỗi cú pháp; khung mã Python lùi đầu dòng sai; đổi số trong đề thì đáp án tính được không còn khớp
  assert.equal(inRa("print(17 // 5, 17 % 5)"), "3 2", "tự thử: chạy Python");
  assert.ok(chayPy("print(1").err, "tự thử: Python báo lỗi cú pháp");
  const k7 = muc("tin12-tn-de1", "tổng các số lẻ");
  hong(() => docKhungPy(k7.q.svg.replace('<text x="28" y="86"', '<text x="12" y="86"')), "khung mã Python lùi đầu dòng sai");
  hong(() => k7.c.right(Object.assign({}, k7.q, { q: k7.q.q.replace("từ 1 đến 19", "từ 1 đến 21") })), "đổi yêu cầu của đề thì không còn lựa chọn đúng");
  const am = muc("tin12-tn-de3", "chu kì lấy mẫu");
  hong(() => am.c.right(Object.assign({}, am.q, { q: am.q.q.replace("dài 1 phút", "dài 2 phút") })), "đổi số liệu của đề âm thanh");
  // SQL
  assert.deepEqual(chaySql({ t: ["a"] }, { t: [[1], [2]] }, "DELETE FROM t WHERE a = 1;", "t"), [[2]], "tự thử: chạy SQL");
  assert.ok(chaySql({ t: ["a"] }, { t: [[1]] }, "REMOVE t;").loi, "tự thử: SQL báo lỗi");
  // bảng có rowspan, colspan; danh sách lồng nhau; đường dẫn tương đối; ảnh động
  const O = bangO(tim(docHtml('<table><tr><td rowspan="2">A</td><td>B</td></tr><tr><td>C</td></tr></table>'), "table")[0]);
  assert.ok(O("C").r === 1 && O("C").c === 1 && O("A").rs === 2, "tự thử: ô sau ô gộp hàng");
  const g = trangMa('<ol type="A" start="3"><li>x</li><li>y<ol><li>z</li></ol></li></ol>');
  assert.deepEqual(["y", "z"].map((t) => kiHieu(theoChu(g, t))), ["Chữ D", "Số 1"], "tự thử: kí hiệu đầu dòng");
  assert.equal(diDuong("a/b", "../../x.html"), "x.html", "tự thử: đường dẫn tương đối"); hong(() => diDuong("a", "../../x.html"), "đường dẫn ra ngoài thư mục gốc");
  const A = anhDong("Bảng Layers ghi các lớp từ trên xuống: “C (100ms)”, “B”, “A”. Đặt Delay between frames where unspecified là 50 mili-giây và chọn Loop forever.");
  assert.ok(A.khung[0].ten === "A" && A.tong === 200 && A.lap === true, "tự thử: ảnh động");
  // bộ dò lộ bắt được câu cố ý viết sai: đáp án của câu này chép vào lời giải câu khác
  const thu = (qs) => { const r = doLo(qs, [], () => true); return r.lo.concat(r.chuLo); };
  const ghi = (q, x) => { const o = Object.assign({}, q, { x: q.x + " " + x }); ten.set(o, "thử-giả"); return o; };
  const qA = TNQ.find((q) => q.type === "mc" && !/\d/.test(q.o[0]) && q.o[0].split(" ").length >= 4), qK = TNQ.find((q) => q !== qA && q._de === qA._de && q.type === "mc");
  assert.ok(thu([qA, ghi(qK, qA.o[0] + ".")]).some((s) => s.startsWith("thử-giả → ")), "bộ dò lộ bắt được đáp án chép sang câu khác");
  const qS = TNQ.find((q) => q.type === "mc" && soCua(q).length);
  assert.ok(thu([qS, ghi(qK, "Kết quả bằng " + vn(soCua(qS)[0]) + ".")]).some((s) => s.startsWith("thử-giả → ")), "bộ dò lộ bắt được số của đáp án");
}
DE.forEach((b) => console.log(`${b.id}: ${b.questions.length} câu (${b.questions.filter((q) => q.type === "mc").length} nhiều lựa chọn, ${b.questions.filter((q) => q.type === "tf4").length} đúng/sai 4 ý), ` +
  `${b.questions.filter((q) => lop(q.topic) === 10).length} câu lớp 10, ${b.questions.filter((q) => lop(q.topic) === 11).length} câu lớp 11, phần riêng ${DINH_HUONG[soDe(b.id)]}, ` +
  `${b.questions.filter((q) => q.svg).length} khung mã; đáp án đúng dài nhất hoặc ngắn nhất ở ${b._le}/${b._mc} câu nhiều lựa chọn.`));
if (DE[0]._thieu) console.log("Đề 1–3 không hỏi bài Tin học 12: " + (DE[0]._thieu.join("; ") || "không"));
console.log(n + " câu, đoạn mã đã tính lại hoặc so với bảng; " + soLanChay + " lần chạy python3.");
console.log("MATH OK");
