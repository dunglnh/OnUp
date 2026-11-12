// Kiểm tra ngân hàng Tin học 12 và Công nghệ 12 cuối kì I của Phiên N12-ck1-tin-congnghe (data/banks/12-tin.js, data/banks/12-congnghe.js:
// mỗi môn hai đề cố định và đề ngẫu nhiên lấy câu của hai đề đó, không có câu riêng), theo mẫu tests/tin-congnghe9-gk2.js (sơ đồ mạch điện
// đọc lại bằng code, câu có phép tính) và tests/lichsu-diali12-ck1.js (phần chung của các kho lớp 12). Số đề, số câu lấy từ danh mục.
// Câu có phép tính, có hình, có đoạn mã HTML, câu sắp xếp, câu tự luận nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng
// đề ghi ở id); đáp án tính bằng code (so với ans, o[0], o của câu sắp xếp, cặp nối, hoặc các ý tính được của câu đúng/sai 4 ý; câu tự luận
// so với thang chấm và bài gợi ý).
// Tin học: mọi đoạn mã HTML trong câu (trong chữ của đề, lựa chọn, lời giải, hay trong hình “khung mã”) đọc bằng một bộ đọc HTML nhỏ: đúng
// cú pháp (thẻ mở, thẻ đóng lồng đúng thứ tự, thẻ rỗng không có thẻ đóng, giá trị thuộc tính trong ngoặc kép, chỉ dùng thẻ, thuộc tính
// sách dạy), rồi tính kết quả hiển thị (chữ đậm, nghiêng, gạch chân, chỉ số trên, dưới; tiêu đề; số thứ tự, kí hiệu của danh sách theo
// type, start; số hàng, cột, ô của bảng có colspan, rowspan; liên kết mở ở đâu; ô nào chọn được cùng lúc trong biểu mẫu…) để so với
// đáp án; câu tìm chỗ sai chỉ có đúng một lựa chọn viết sai cú pháp hay sai yêu cầu.
// Công nghệ: mạch ba pha (nối hình sao, hình tam giác; điện áp dây, điện áp pha, dòng điện dây, dòng điện pha; công suất tải thuần
// trở), điện năng tiêu thụ, tiền điện, điện năng tiết kiệm khi thay thiết bị tính lại bằng code; sơ đồ đọc lại bằng code.
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân, dấu thanh kiểu sách “hoá”, “thuỷ”, “kĩ”, “lí”), lời dặn của đề
// (phạm vi, số câu mỗi phần tính từ ma trận, bài học tiếp theo, đề cương của trường, câu về đề chung của Sở), môn và lịch thi, mức độ
// và ma trận 10 – 8 – 7 (chủ đề theo tên bài và thứ tự của sách, đối chiếu mục lục trong README của cuốn ở OnUp-Book; hai đề cố định
// chia đúng ma trận), dạng câu theo khung Công văn 7991 (mỗi kho ít nhất 6 câu đúng/sai 4 ý không lặp kiểu Đ/S, 1–2 câu tự luận ở ô
// Vận dụng rút 1 câu), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu
// nhiều lựa chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không
// có, rút thử nhiều lần (đúng ma trận; đã làm hết một đề cố định thì không rút lại câu của đề đó), đề bài không trùng, không gần trùng câu
// của các kho cũ cùng môn, dò lộ đáp án giữa mọi cặp câu rút được cùng lúc (đề “Ôn chủ đề” rút chung cả chủ đề; số ở vị trí kết quả của câu
// kia, cả hai vế một cặp nối, hai ô sắp xếp liền nhau: không được có; chuỗi 3 từ của đáp án bằng chữ in ra với DO_LO=1 để xem tay, đã xem
// ghi ở DA_XEM), bộ dò lộ, bộ đọc HTML, bộ đọc hình tự thử với câu, mã, hình cố ý viết sai. Có sách ở ../OnUp-Book thì so mọi trường chữ
// với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho
// khác, cả câu riêng của các đề ngẫu nhiên (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 6 từ).
// Chạy: node tests/tin-congnghe12-ck1.js → in MATH OK.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const qctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), qctx);
const Quiz = qctx.window.Quiz;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const BOOK = path.join(__dirname, "../../OnUp-Book");

/* ---------- hai kho: số đề, số câu lấy từ danh mục ----------
   PHAN: các phần của lời dặn (số câu mỗi phần tính từ ma trận; tên chủ đề, chương theo mục lục); BAI: chủ đề theo tên bài của sách (số
   bài để chia phần, đối chiếu mục lục của mọi cuốn ở sachCo). */
const MON = [
  { ma: "tin", ten: "Tin học", sachCo: ["tin-hoc-12-tin-hoc-ung-dung", "tin-hoc-12-khoa-hoc-may-tinh"], ki: "th", pham: "Tin học: Bài 1–12",
    dau: "Sách Kết nối tri thức, Tin học 12, phần chung của hai sách Định hướng Tin học ứng dụng và Định hướng Khoa học máy tính.",
    PHAN: [["Chủ đề 1 Máy tính và xã hội tri thức (Bài 1–2)", 1, 2], ["Chủ đề 2 Mạng máy tính và Internet (Bài 3–5)", 3, 5],
      ["Chủ đề 3 Đạo đức, pháp luật và văn hoá trong môi trường số (Bài 6)", 6, 6], ["Chủ đề 4 Giải quyết vấn đề với sự trợ giúp của máy tính (Bài 7–12)", 7, 12]],
    sau: "Trường đã học sang Bài 13 (CSS)",
    BAI: [["Làm quen với Trí tuệ nhân tạo", 1], ["Trí tuệ nhân tạo trong khoa học và đời sống", 2], ["Một số thiết bị mạng thông dụng", 3], ["Giao thức mạng", 4],
      ["Thực hành chia sẻ tài nguyên trên mạng", 5], ["Giao tiếp và ứng xử trong không gian mạng", 6], ["HTML và cấu trúc trang web", 7], ["Định dạng văn bản", 8],
      ["Tạo danh sách, bảng", 9], ["Tạo liên kết", 10], ["Chèn tệp tin đa phương tiện và khung nội tuyến vào trang web", 11], ["Tạo biểu mẫu", 12]] },
  { ma: "congnghe", ten: "Công nghệ", sachCo: ["cong-nghe-12-cong-nghe-dien-dien-tu"], ki: "cn", pham: "Công nghệ: Công nghệ điện – điện tử Bài 1–12",
    dau: "Sách Kết nối tri thức, Công nghệ 12 – Công nghệ điện – điện tử, Phần một Công nghệ điện.",
    PHAN: [["Chương I Giới thiệu chung về kĩ thuật điện (Bài 1–2)", 1, 2], ["Chương II Hệ thống điện quốc gia (Bài 3–7)", 3, 7],
      ["Chương III Hệ thống điện trong gia đình (Bài 8–10)", 8, 10], ["Chương IV An toàn và tiết kiệm điện năng (Bài 11–12)", 11, 12]],
    sau: "Trường học sách Công nghệ 12 – Lâm nghiệp – Thuỷ sản, hoặc trường đã học sang Phần hai Công nghệ điện tử (Bài 13)",
    BAI: [["Giới thiệu tổng quan về kĩ thuật điện", 1], ["Ngành nghề trong lĩnh vực kĩ thuật điện", 2], ["Mạch điện xoay chiều ba pha", 3],
      ["Hệ thống điện quốc gia", 4], ["Sản xuất điện năng", 5], ["Mạng điện sản xuất quy mô nhỏ", 6], ["Mạng điện hạ áp dùng trong sinh hoạt", 7],
      ["Hệ thống điện trong gia đình", 8], ["Thiết bị điện trong hệ thống điện gia đình", 9], ["Thiết kế và lắp đặt mạch điện điều khiển trong gia đình", 10],
      ["An toàn điện", 11], ["Tiết kiệm điện năng", 12]] }
];
const ten = new Map();
MON.forEach((m) => {
  const pool = BANKS.find((b) => b.pool && b.id === m.ma + "12-ck1-ngau-nhien");
  assert.ok(pool, "thiếu đề ngẫu nhiên " + m.ma + "12-ck1-ngau-nhien");
  m.pool = pool; m.DE = pool.pool.from; m.M = pool.pool.matrix; m.kho = pool.questions; m.file = pool.file;
  assert.equal(m.file, "12-" + m.ma + ".js", "file câu hỏi theo mã môn");
  assert.equal(m.DE.length, 2, m.ma + ": đề ngẫu nhiên lấy câu của hai đề cố định");
  assert.deepEqual(BANKS.filter((b) => b.id.startsWith(m.ma + "12-ck1-")).map((b) => b.id).sort(), [...m.DE, pool.id].sort(), m.ma + ": kho gồm hai đề cố định và đề ngẫu nhiên");
  assert.equal(m.kho.filter((q) => q.src === pool.id).length, 0, m.ma + ": đề ngẫu nhiên không có câu riêng");
  assert.ok(pool.subject === m.ten && pool.grade === 12 && pool.minutes === 45 && pool.title === m.ten + " 12 · Cuối kì I · Đề ngẫu nhiên", pool.id + ": môn, khối, số phút, tên");
  m.DE.forEach((id, k) => {
    const b = bank(id);
    assert.equal(id, m.ma + "12-ck1-de" + (k + 1), "mã đề cố định");
    assert.ok(b.file === m.file && b.subject === m.ten && b.grade === 12 && b.minutes === pool.minutes && b.n === pool.n, id + ": cùng file, môn, khối, số phút, số câu với đề ngẫu nhiên");
    assert.equal(b.title, m.ten + " 12 · Cuối kì I · Đề " + (k + 1), id + ": tên đề");
    assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
    m.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, m.ki + (k + 1) + "#" + (i + 1)));
  });
  assert.equal(m.kho.length, sum(m.DE.map((id) => bank(id).n)), m.ma + ": kho = câu của hai đề cố định");
});
const [TH, CN] = MON;
// môn đúng chữ của lịch thi (MON_THPT), sáu mã đề gắn vào kì thi cuối kì I lớp 12, phạm vi của kì thi ghi đúng số bài
{
  const lich = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
  const mon = /const MON_THPT = \[([^\]]*)\]/.exec(lich);
  MON.forEach((m) => assert.ok(mon && mon[1].includes('"' + m.ten + '"'), "môn " + m.ten + " có trong MON_THPT"));
  const c = vm.createContext({ window: {} }); vm.runInContext(lich, c);
  const ev = c.window.ONTAP_SEED_EVENTS.find((e) => e.id === "ck1-l12");
  assert.ok(ev && ev.grades.includes(12), "có kì thi ck1-l12");
  MON.forEach((m) => {
    [...m.DE, m.pool.id].forEach((id) => assert.ok(ev.banks.includes(id), id + " gắn vào ck1-l12"));
    assert.ok(ev.scope.includes(m.pham), "phạm vi của ck1-l12 ghi " + m.pham);
    assert.equal(m.PHAN[m.PHAN.length - 1][2], +/–(\d+)$/.exec(m.pham)[1], m.ma + ": phần cuối của lời dặn đến đúng bài cuối của phạm vi");
  });
}


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
const close = (x, yy, e = 1e-9) => Math.abs(x - yy) < e;
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
// chữ không chạm nét vẽ: hộp chữ (rộng theo rong, cao bằng cỡ chữ) cách hộp bao của mọi nét ít nhất 3
const xaNet = (T, L) => T.forEach((t) => {
  const w = rong(t), c = +t["font-size"] || 15, a = t["text-anchor"], x0 = a === "middle" ? num(t, "x") - w / 2 : a === "end" ? num(t, "x") - w : num(t, "x"), y0 = num(t, "y") - 0.75 * c, y1 = num(t, "y") + 0.25 * c;
  L.forEach((l) => { const [p, q, r, u] = ["x1", "y1", "x2", "y2"].map((k) => num(l, k));
    assert.ok(Math.max(p, r) + 3 <= x0 || Math.min(p, r) - 3 >= x0 + w || Math.max(q, u) + 3 <= y0 || Math.min(q, u) - 3 >= y1, "chữ “" + t.t + "” chạm nét vẽ"); }); });


/* ---------- bộ đọc HTML (Tin học Bài 7–12) ----------
   docHtml(mã): đọc một đoạn mã HTML thành cây { tag, at, kids } (chữ là { text }). Kiểm tra cú pháp như sách: tên thẻ, thuộc tính chữ
   thường; thẻ mở – thẻ đóng lồng đúng thứ tự; thẻ rỗng (RONG) không có thẻ đóng; giá trị thuộc tính trong ngoặc kép, không lặp thuộc
   tính; thuộc tính không có giá trị chỉ là các thuộc tính bật, tắt (BAT_TAT); chỉ dùng thẻ, thuộc tính sách dạy (THE, THUOC_TINH). */
const RONG = new Set(["br", "hr", "img", "input", "meta", "source"]);
const THE = new Set(["html", "head", "title", "meta", "body", "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "b", "strong", "i", "em", "u",
  "sub", "sup", "mark", "del", "small", "div", "span", "ol", "ul", "li", "dl", "dt", "dd", "table", "caption", "tr", "th", "td", "a", "img",
  "audio", "video", "source", "iframe", "form", "input", "label", "select", "option", "textarea", "fieldset", "legend"]);
const BAT_TAT = new Set(["controls", "autoplay", "muted"]);
const THUOC_TINH = new Set(["charset", "style", "type", "start", "colspan", "rowspan", "href", "target", "id", "src", "alt", "width", "height",
  "poster", "name", "value", "for", "rows", "cols", "action", "border", ...BAT_TAT]);
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
const con = (n, t) => (n.kids || []).filter((k) => k.tag === t);
// chữ hiện trên trang: gộp khoảng trắng, xuống dòng (cả Enter trong mã) thành một dấu cách; br xuống dòng; thẻ khối đứng riêng một dòng
const KHOI = new Set(["html", "body", "h1", "h2", "h3", "h4", "h5", "h6", "p", "div", "ol", "ul", "li", "dl", "dt", "dd", "table", "caption", "tr", "form", "fieldset", "hr"]);
const chuHien = (n) => {
  const ra = [], XD = "\u0001";
  const di = (x) => { if (x.text !== undefined) { ra.push(x.text.replace(/\s+/g, " ")); return; } if (["head", "title"].includes(x.tag)) return;
    if (x.tag === "br") { ra.push(XD); return; } if (KHOI.has(x.tag)) ra.push(XD); (x.kids || []).forEach(di); if (KHOI.has(x.tag)) ra.push(XD);
    if (["td", "th"].includes(x.tag)) ra.push(" | "); };
  di(n);
  return ra.join("").split(XD).map((l) => l.replace(/ +/g, " ").trim()).filter(Boolean);
};
// các đoạn chữ cùng kiểu: { t, k: Set("b", "i", "u", "sub", "sup", "mark", "del", "small", "h1"…) }
const KIEU = { strong: "b", b: "b", th: "b", em: "i", i: "i", u: "u", sub: "sub", sup: "sup", mark: "mark", del: "del", small: "small" };
const doanChu = (n, k = new Set()) => (n.kids || []).flatMap((x) => {
  if (x.text !== undefined) return x.text.trim() ? [{ t: x.text.replace(/\s+/g, " ").trim(), k }] : [];
  if (["head", "title"].includes(x.tag)) return [];
  const k2 = new Set(k); if (KIEU[x.tag]) k2.add(KIEU[x.tag]); if (/^h[1-6]$/.test(x.tag)) { k2.add(x.tag); k2.add("b"); }
  return doanChu(x, k2);
});
// kí hiệu đầu dòng của danh sách có thứ tự theo type, start
const laMa = (n) => [[1000, "M"], [900, "CM"], [500, "D"], [400, "CD"], [100, "C"], [90, "XC"], [50, "L"], [40, "XL"], [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]].reduce((s, [v, c]) => { while (n >= v) { s += c; n -= v; } return s; }, "");
const chuCai = (n) => (n > 26 ? chuCai(Math.floor((n - 1) / 26)) : "") + String.fromCharCode(65 + ((n - 1) % 26));
const dauDong = (ol) => { const t = ol.at.type || "1", b = ol.at.start === undefined ? 1 : +ol.at.start;
  assert.ok(["1", "A", "a", "I", "i"].includes(t) && Number.isInteger(b), "type, start của <ol>");
  return con(ol, "li").map((li, k) => { const n = b + k; return t === "1" ? String(n) : t === "A" ? chuCai(n) : t === "a" ? chuCai(n).toLowerCase() : t === "I" ? laMa(n) : laMa(n).toLowerCase(); }); };
// lưới của bảng: mỗi ô (td, th) chiếm colspan cột, rowspan hàng; mọi hàng đủ cột
const luoiBang = (table) => {
  const hang = con(table, "tr"), g = hang.map(() => []);
  hang.forEach((tr, r) => { let c = 0; tr.kids.filter((k) => ["td", "th"].includes(k.tag)).forEach((o) => {
    while (g[r][c]) c++;
    const cs = +(o.at.colspan || 1), rs = +(o.at.rowspan || 1); assert.ok(cs >= 1 && rs >= 1 && r + rs <= hang.length, "colspan, rowspan hợp lệ");
    for (let i = 0; i < rs; i++) for (let j = 0; j < cs; j++) { assert.ok(!g[r + i][c + j], "hai ô chồng lên nhau"); g[r + i][c + j] = o; }
    c += cs; }); });
  const cot = Math.max(...g.map((x) => x.length)); assert.ok(g.every((x) => x.length === cot && x.every(Boolean)), "mọi hàng của bảng đủ cột");
  return { hang: hang.length, cot, o: new Set(g.flat()).size, g };
};
// đường dẫn: tệp đang mở + href (tương đối) → tệp được mở
const duongDan = (tu, href) => { if (/^https?:\/\//.test(href)) return href; const p = tu.split("/").slice(0, -1);
  href.split("/").forEach((x) => { if (x === "..") { assert.ok(p.length, "ra ngoài thư mục gốc"); p.pop(); } else if (x !== ".") p.push(x); }); return p.join("/"); };
// khung mã (hình): nền bg viền line; mỗi dòng mã một thẻ text cỡ 14 căn trái, dòng cách đều 20, lùi đầu dòng 16 mỗi bậc theo độ sâu của
// thẻ; chữ vừa khung (cách viền phải ít nhất 7). docKhung(svg) → mã (các dòng nối bằng "\n")
const docKhung = (svg) => {
  const W = svgRong(svg), H = svgCao(svg), T = texts(svg), N = tags(svg, "rect");
  assert.ok(W === 320 && N.length === 1 && N[0].fill === "bg" && N[0].stroke === "line" && num(N[0], "x") === 1 && num(N[0], "y") === 1 && num(N[0], "width") === W - 2 && num(N[0], "height") === H - 2, "khung mã: một hình chữ nhật nền bg, viền line, vừa hình");
  assert.ok(T.length >= 2 && T.every((t, k) => t["font-size"] === "14" && !t["text-anchor"] && num(t, "y") === 26 + 20 * k), "khung mã: mỗi dòng một chữ cỡ 14, cách đều 20");
  assert.equal(H, 26 + 20 * (T.length - 1) + 16, "khung mã: cao vừa các dòng");
  const ma = T.map((t) => t.t).join("\n"); docHtml(ma);
  // lùi đầu dòng theo số thẻ đang mở (thẻ đóng ở đầu dòng lùi về bậc của thẻ mở)
  let sau = 0;
  T.forEach((t) => { const mo = (t.t.match(/<[a-z][^>]*>/g) || []).filter((x) => !RONG.has(/^<([a-z0-9]+)/.exec(x)[1])).length, dong = (t.t.match(/<\/[a-z0-9]+>/g) || []).length;
    const bac = /^<\//.test(t.t) ? sau - 1 : sau; assert.equal(num(t, "x"), 12 + 16 * bac, "khung mã: lùi đầu dòng theo bậc: " + t.t);
    assert.ok(num(t, "x") + rong(t) <= W - 8, "khung mã: dòng vừa khung: " + t.t); sau += mo - dong; });
  daDoc.add(svg); return ma;
};
// các đoạn mã trong một chuỗi chữ: đoạn trong ngoặc kép “…” có thẻ, hoặc cả chuỗi khi chuỗi mở đầu bằng thẻ (lựa chọn là một đoạn mã)
const maTrong = (s) => (/^<(?:!DOCTYPE|\/?[a-z])/.test(String(s)) ? [String(s)] : [...String(s).matchAll(/“([^”]*<[a-z!/][^”]*)”/g)].map((m) => m[1]));


/* ---------- Công nghệ: sơ đồ nối tải vào mạng điện ba pha (Bài 3) ----------
   Dây A, B, C (và dây trung tính O) là các nét ngang nét 2 tô ink, có tên đậm bên trái; mỗi bóng đèn là vòng tròn bán kính 12 có dấu ×
   (hai nét mảnh nối hai cặp điểm đối nhau trên vòng tròn), nằm ở hàng dưới các dây, hai đầu nối (trái, phải) đi lên hai dây bằng dây
   nối gấp khúc; chỗ dây nối gặp một dây pha hay dây trung tính có chấm tròn tô ink thì nối vào dây đó, đi qua dây khác không có chấm thì
   không nối. docBaPha(svg) → { day: ["A", …], tai: [["A", "O"], …] } (tải theo thứ tự từ trái sang phải, tên Đ1, Đ2… ở dưới). */
const docBaPha = (svg) => {
  assert.ok(svgRong(svg) <= 320, "sơ đồ rộng không quá 320");
  const L = tags(svg, "line"), C = tags(svg, "circle"), T = texts(svg);
  T.forEach((t) => assert.ok(+t["font-size"] >= 13, "chữ trong hình từ cỡ 13: " + t.t));
  const day = L.filter((l) => l["stroke-width"] === "2" && num(l, "y1") === num(l, "y2") && num(l, "x2") - num(l, "x1") >= 200);
  const ten = day.map((l) => { const t = T.filter((t) => t["font-weight"] === "700" && t["text-anchor"] === "end" && close(num(t, "y"), num(l, "y1") + 5) && num(t, "x") < num(l, "x1"));
    assert.equal(t.length, 1, "mỗi dây có đúng một tên đậm bên trái"); return t[0].t; });
  assert.ok(["A,B,C", "A,B,C,O"].includes(ten.join()), "dây A, B, C (và O) theo thứ tự từ trên xuống: " + ten);
  const Y = Object.fromEntries(ten.map((t, k) => [t, num(day[k], "y1")]));
  const den = C.filter((c) => c.r === "12");
  den.forEach((c) => { assert.ok(c.fill === "surface" && c.stroke === "ink", "bóng đèn tô surface, viền ink");
    const x = L.filter((l) => l["stroke-width"] === "1.5" && Math.abs(num(l, "x1") + num(l, "x2") - 2 * num(c, "cx")) < 0.02 && Math.abs(num(l, "y1") + num(l, "y2") - 2 * num(c, "cy")) < 0.02);
    assert.ok(x.length === 2 && x.every((l) => close(Math.hypot(num(l, "x1") - num(c, "cx"), num(l, "y1") - num(c, "cy")), 12, 0.02)), "bóng đèn có dấu × trong vòng tròn"); });
  const cham = C.filter((c) => c.r === "3.5" && c.fill === "ink").map((c) => [num(c, "cx"), num(c, "cy")]);
  const noi = L.filter((l) => l["stroke-width"] === "2" && !day.includes(l));
  xaNet(T, L.filter((l) => l["stroke-width"] === "2"));
  noi.forEach((l) => assert.ok(num(l, "x1") === num(l, "x2") || num(l, "y1") === num(l, "y2"), "dây nối nằm ngang hoặc thẳng đứng"));
  // mỗi bóng đèn: đi từ đầu trái, đầu phải theo dây nối tới chỗ gặp dây có chấm
  const theo = (p) => { // p: điểm đầu; đi theo các nét nối liền nhau, trả các dây có chấm ở đầu nét
    const seen = new Set(), st = [p], ra = new Set();
    while (st.length) { const [x, yy] = st.pop(), k = x + "," + yy; if (seen.has(k)) continue; seen.add(k);
      noi.forEach((l) => { const a = [num(l, "x1"), num(l, "y1")], b = [num(l, "x2"), num(l, "y2")];
        [[a, b], [b, a]].forEach(([u, v]) => { if (close(u[0], x, 1e-6) && close(u[1], yy, 1e-6)) st.push(v); }); });
      ten.forEach((t) => { if (close(yy, Y[t], 1e-6) && cham.some((c) => close(c[0], x, 1e-6) && close(c[1], yy, 1e-6))) ra.add(t); }); }
    return [...ra];
  };
  // chấm chỉ ở chỗ dây nối gặp dây, mỗi chấm thuộc đúng một dây
  cham.forEach((c) => assert.equal(ten.filter((t) => close(c[1], Y[t], 1e-6)).length, 1, "chấm nối nằm trên một dây"));
  const tai = den.sort((a, b) => num(a, "cx") - num(b, "cx")).map((c, k) => {
    const [x, yy] = [num(c, "cx"), num(c, "cy")], a = theo([x - 12, yy]), b = theo([x + 12, yy]);
    assert.ok(a.length === 1 && b.length === 1 && a[0] !== b[0], "mỗi bóng đèn nối vào đúng hai dây khác nhau");
    assert.ok(yy > Math.max(...Object.values(Y)), "bóng đèn ở hàng dưới các dây");
    const nhan = T.filter((t) => t.t === "Đ" + (k + 1)); assert.ok(nhan.length === 1 && close(num(nhan[0], "x"), x, 1e-6), "tên Đ" + (k + 1) + " dưới bóng đèn");
    return [a[0], b[0]];
  });
  assert.equal(cham.length, 2 * tai.length, "mỗi bóng đèn hai chấm nối, không có chấm thừa");
  daDoc.add(svg); return { day: ten, tai };
};
// cách nối của ba tải: "sao" (mỗi tải nối một dây pha với dây trung tính, ba dây pha khác nhau) hoặc "tam giác" (mỗi tải nối hai dây pha,
// đủ ba cặp AB, BC, CA)
const cachNoi = (sd) => {
  const k = sd.tai.map((t) => [...t].sort().join(""));
  if (sd.tai.every((t) => t.includes("O")) && new Set(sd.tai.map((t) => t.find((x) => x !== "O"))).size === 3) return "sao";
  if (sd.tai.every((t) => !t.includes("O")) && new Set(k).size === 3 && k.every((x) => ["AB", "BC", "AC"].includes(x))) return "tam giác";
  return "khác";
};
const BA = Math.sqrt(3);

/* ---------- Công nghệ: mạch đèn điều khiển từ hai vị trí (Bài 10) ----------
   Kí hiệu như Hình 10.3 của sách: công tắc ba cực là vòng tròn bán kính 15 tô surface (tên K1, K2 ở trên), ba cực là ba chấm tròn nhỏ
   (bán kính 2,5) nằm trên vòng tròn: cực giữa ở mép trái hay mép phải (ngang tâm), hai cực bên ở nửa kia (một trên, một dưới); lưỡi gạt là
   nét chéo nối cực giữa với một cực bên; dây nối là các nét ngang, dọc (nét 2), chỉ nối với nhau ở đầu nét (hai dây chéo nhau không nối,
   không có đầu dây nào chạm giữa một dây khác); đèn là vòng tròn bán kính 12 có dấu ×, hai đầu nối ở mép trái, mép phải; dây pha, dây
   trung tính là hai đầu dây duy nhất để hở, có tên đậm L, N ngay bên trái.
   docHaiCongTac(svg) → { vt: vị trí lưỡi gạt như hình ({ K1: "tren" | "duoi", K2: … }), sang(vt): đèn sáng hay tắt, noi(a, b): hai điểm
   nối với nhau chỉ bằng dây (không qua công tắc, đèn), K: cực của từng công tắc, den: hai đầu đèn, L, N }. */
const docHaiCongTac = (svg) => {
  assert.ok(svgRong(svg) <= 320, "sơ đồ rộng không quá 320");
  const Ln = tags(svg, "line"), C = tags(svg, "circle"), T = texts(svg);
  T.forEach((t) => assert.ok(+t["font-size"] >= 13, "chữ trong hình từ cỡ 13: " + t.t));
  const k = (p) => p.map((v) => (+v).toFixed(2)).join(","), dau = (l) => [[num(l, "x1"), num(l, "y1")], [num(l, "x2"), num(l, "y2")]];
  const ct = C.filter((c) => c.r === "15").sort((a, b) => num(a, "cx") - num(b, "cx")), den = C.filter((c) => c.r === "12"), cham = C.filter((c) => c.r === "2.5");
  assert.ok(ct.length === 2 && den.length === 1 && C.length === ct.length + den.length + cham.length, "hai công tắc, một đèn, các chấm cực");
  ct.concat(den).forEach((c) => assert.ok(c.fill === "surface" && c.stroke === "ink", "công tắc, đèn tô surface, viền ink"));
  // đèn: dấu × là hai nét mảnh qua tâm, đầu nét trên vòng tròn
  const d = den[0], dx = num(d, "cx"), dy = num(d, "cy");
  const cheo = Ln.filter((l) => l["stroke-width"] === "1.5");
  assert.ok(cheo.length === 2 && cheo.every((l) => Math.abs(num(l, "x1") + num(l, "x2") - 2 * dx) < 0.02 && Math.abs(num(l, "y1") + num(l, "y2") - 2 * dy) < 0.02 &&
    close(Math.hypot(num(l, "x1") - dx, num(l, "y1") - dy), 12, 0.02) && num(l, "x1") !== num(l, "x2") && num(l, "y1") !== num(l, "y2")), "đèn có dấu × trong vòng tròn");
  const denDau = [[dx - 12, dy], [dx + 12, dy]];
  // công tắc: tên ở trên, đúng ba chấm cực trên vòng tròn; cực giữa ngang tâm, hai cực bên ở nửa kia, một trên một dưới
  const K = ct.map((c, i) => {
    const cx = num(c, "cx"), cy = num(c, "cy"), ten = "K" + (i + 1);
    const nhan = T.filter((t) => t.t === ten); assert.ok(nhan.length === 1 && Math.abs(num(nhan[0], "x") - cx) <= 8 && num(nhan[0], "y") < cy - 15, "tên " + ten + " ở trên công tắc");
    const ba = cham.filter((p) => close(Math.hypot(num(p, "cx") - cx, num(p, "cy") - cy), 15, 0.05)).map((p) => [num(p, "cx"), num(p, "cy")]);
    assert.equal(ba.length, 3, ten + ": ba cực trên vòng tròn");
    const giua = ba.filter((p) => close(p[1], cy, 1e-6)), ben = ba.filter((p) => !close(p[1], cy, 1e-6)).sort((a, b) => a[1] - b[1]);
    assert.ok(giua.length === 1 && ben.length === 2 && ben[0][1] < cy && ben[1][1] > cy && ben.every((p) => (p[0] - cx) * (giua[0][0] - cx) < 0), ten + ": cực giữa ngang tâm, hai cực bên ở nửa kia");
    return { ten, giua: giua[0], tren: ben[0], duoi: ben[1] };
  });
  assert.equal(cham.length, 6, "chấm chỉ ở các cực của công tắc");
  // lưỡi gạt: nét nối cực giữa với một cực bên của cùng công tắc; mỗi công tắc đúng một lưỡi gạt
  const day = Ln.filter((l) => l["stroke-width"] === "2"), vt = {};
  assert.equal(day.length + cheo.length, Ln.length, "nét vẽ là dây (nét 2) hoặc dấu × của đèn");
  const luoi = day.filter((l) => { const [a, b] = dau(l).map(k); return K.some((s) => [s.tren, s.duoi].some((p) => [a, b].sort().join("|") === [k(s.giua), k(p)].sort().join("|"))); });
  K.forEach((s) => { const c = luoi.filter((l) => dau(l).map(k).includes(k(s.giua)));
    assert.equal(c.length, 1, s.ten + ": đúng một lưỡi gạt"); vt[s.ten] = dau(c[0]).map(k).includes(k(s.tren)) ? "tren" : "duoi"; });
  const noiDay = day.filter((l) => !luoi.includes(l));
  xaNet(T, day);
  noiDay.forEach((l) => assert.ok(num(l, "x1") === num(l, "x2") || num(l, "y1") === num(l, "y2"), "dây nối nằm ngang hoặc thẳng đứng"));
  // không đầu dây nào chạm vào giữa một dây khác (chỗ rẽ nhánh phải vẽ thành đầu nét)
  noiDay.forEach((l) => dau(l).forEach(([x, yy]) => noiDay.forEach((m) => { if (m === l) return; const [[a, b], [c, e]] = dau(m);
    const tren = (a === c ? close(x, a, 1e-9) && yy > Math.min(b, e) && yy < Math.max(b, e) : close(yy, b, 1e-9) && x > Math.min(a, c) && x < Math.max(a, c));
    assert.ok(!tren, "đầu dây chạm giữa một dây khác ở " + x + "," + yy); })));
  // đầu dây để hở: chỉ hai đầu L, N, có tên đậm ngay bên trái
  const bac = new Map(); noiDay.forEach((l) => dau(l).forEach((p) => bac.set(k(p), (bac.get(k(p)) || 0) + 1)));
  const cuc = new Set(K.flatMap((s) => [s.giua, s.tren, s.duoi]).concat(denDau).map(k));
  const ho = [...bac].filter(([p, n]) => n === 1 && !cuc.has(p)).map(([p]) => p.split(",").map(Number));
  assert.equal(ho.length, 2, "hai đầu dây để hở (L, N)");
  const nguon = Object.fromEntries(["L", "N"].map((t) => { const p = ho.find((h) => T.some((x) => x.t === t && x["font-weight"] === "700" && num(x, "x") < h[0] && h[0] - num(x, "x") <= 20 && close(num(x, "y") - 5, h[1], 1e-6)));
    assert.ok(p, "đầu dây " + t + " có tên đậm bên trái"); return [t, p]; }));
  assert.ok(T.some((t) => t.t === "Đ" && close(num(t, "x"), dx, 1e-6) && num(t, "y") > dy + 12), "tên Đ dưới đèn");
  denDau.forEach((p) => assert.ok(bac.has(k(p)), "đầu đèn có dây nối"));
  K.forEach((s) => [s.giua, s.tren, s.duoi].forEach((p) => assert.ok(bac.has(k(p)), s.ten + ": cực nào cũng có dây nối")));
  // nối: dây (và lưỡi gạt theo vị trí vt nếu có)
  const nhom = (v) => { const cha = new Map(), goc = (p) => { while (cha.has(p) && cha.get(p) !== p) p = cha.get(p); return p; }, hop = (a, b) => { const x = goc(a), yy = goc(b); if (x !== yy) cha.set(x, yy); };
    noiDay.forEach((l) => hop(...dau(l).map(k))); if (v) K.forEach((s) => hop(k(s.giua), k(s[v[s.ten]]))); return (a, b) => goc(k(a)) === goc(k(b)); };
  const noi = nhom(null);
  const sang = (v) => { const n = nhom(v), [a, b] = denDau;
    assert.ok(!n(nguon.L, nguon.N), "chập mạch giữa L và N"); assert.ok(!n(a, b), "đèn bị nối tắt");
    return (n(nguon.L, a) && n(nguon.N, b)) || (n(nguon.L, b) && n(nguon.N, a)); };
  ["tren", "duoi"].forEach((a) => ["tren", "duoi"].forEach((b) => sang({ K1: a, K2: b })));
  daDoc.add(svg);
  return { vt, sang, noi, K, den: denDau, L: nguon.L, N: nguon.N };
};
const doi = (v, t) => Object.assign({}, v, { [t]: v[t] === "tren" ? "duoi" : "tren" });
const CAC_VT = ["tren", "duoi"].flatMap((a) => ["tren", "duoi"].map((b) => ({ K1: a, K2: b })));

/* ---------- Tin học: một vài phép tính trên mã ---------- */
// một đoạn mã là một thẻ mở đứng riêng (lựa chọn “<p style=…>”, tên thẻ “<dd>”) thì thêm thẻ đóng rồi mới đọc
const docMa = (ma) => { const m = /^<([a-z][a-z0-9]*)[^<>]*>$/.exec(ma); return docHtml(m && !RONG.has(m[1]) ? ma + "</" + m[1] + ">" : ma); };
const hopLe = (ma) => { try { docMa(ma); return true; } catch (e) { return false; } };
const chuCuaNut = (n) => (n.kids || []).map((k) => (k.text !== undefined ? k.text : chuCuaNut(k))).join("");
// thuộc tính style → { tên: giá trị }; null khi viết sai (cặp tên: giá trị ngăn bằng dấu chấm phẩy)
const kieuChu = (s) => { const r = {}; for (const c of String(s).split(";").map((x) => x.trim()).filter(Boolean)) { const m = /^([a-z-]+)\s*:\s*([^:;,]+)$/.exec(c); if (!m) return null; r[m[1]] = m[2].trim(); } return r; };
const MAU = { "đỏ": "red", "xanh lá": "green", "xanh dương": "blue", "xám": "grey", "vàng": "yellow", "đen": "black", "nâu": "brown" };
// kí tự đầu dòng của danh sách không thứ tự theo list-style-type (sách: disc, circle, square, none; Hình 9.2 square là hình vuông)
const KI_TU_UL = { disc: "hình tròn", circle: "hình tròn", square: "hình vuông", none: "" };
// địa chỉ IPv4: 4 số thập phân ngăn bởi dấu chấm, mỗi số một byte (0–255)
const ipv4 = (s) => { const p = s.split("."); return p.length === 4 && p.every((x) => /^\d{1,3}$/.test(x) && +x <= 255); };
// các ô input của một biểu mẫu kèm chữ đứng ngay sau ô
const oNhap = (form) => form.kids.flatMap((x, i) => (x.tag === "input" ? [{ at: Object.assign({}, x.at), nhan: ((form.kids[i + 1] || {}).text || "").trim() }] : []));
const chonCungLuc = (a, b) => !(a.at.type === "radio" && b.at.type === "radio" && a.at.name === b.at.name);
// thứ tự theo sách: mỗi ô khớp đúng một mốc của THU_TU (các mốc ghi theo thứ tự diễn ra), các ô khớp các mốc khác nhau
const xepTheo = (o, THU_TU) => { const r = o.map((s) => { const i = THU_TU.map((t, k) => (s.toLowerCase().includes(t) ? k : -1)).filter((k) => k >= 0);
  assert.equal(i.length, 1, "ô “" + s + "” khớp đúng một mốc"); return [i[0], s]; });
  assert.equal(new Set(r.map((x) => x[0])).size, o.length, "các ô khớp các mốc khác nhau"); return r.sort((p, q) => p[0] - q[0]).map((x) => x[1]); };
const THU = ["nhất", "hai", "ba", "tư", "năm"];
// sách Công nghệ 12 không dạy cách tính điện năng: câu tính điện năng, tiền điện ghi sẵn cách tính
const DIEN_NANG = /số kWh điện năng tiêu thụ bằng số kW công suất nhân với số giờ sử dụng/;

/* ---------- câu có phép tính, có hình, có đoạn mã, câu sắp xếp, câu tự luận ----------
   id: th1, th2 (Tin học Đề 1, 2), cn1, cn2 (Công nghệ Đề 1, 2); has: đoạn chữ của đề, đúng một câu trong kho. */
const CHECKS = [
  /* ===== Tin học ===== */
  // Bài 4: địa chỉ IPv4
  { id: "th1", has: "Mỗi ý sau về địa chỉ IPv4", right: (q) => { coX(q, "từ 0 đến 255"); return q.o.map((o) => ipv4(y(o, /^([\d.]+) là một địa chỉ IPv4 viết đúng\.$/)[1])); } },
  // Bài 6: tự luận, tin nhắn trong nhóm học tập
  { id: "th1", has: "Em là nhóm trưởng", essay: (q) => { coThang(q, "lịch sự", "tôn trọng", "không công kích người nói", "Đề xuất cách làm tiếp"); coX(q, "Bài gợi ý:"); } },
  // Bài 7: chữ trên tab là nội dung của title (trong head); lựa chọn sai là chữ khác của trang
  { id: "th1", has: "ở tiêu đề (tab)", right: (q) => {
    const goc = docHtml(docKhung(q.svg)), ti = tim(goc, "title"), head = tim(goc, "head");
    assert.ok(goc.doctype && ti.length === 1 && head.length === 1 && head[0].kids.includes(ti[0]), "trang có <!DOCTYPE html>, title nằm trong head");
    const dong = chuHien(goc), giaTri = tim(goc, "meta").map((m) => m.at.charset);
    q.o.slice(1).forEach((o) => assert.ok(dong.includes(o) || giaTri.includes(o), "lựa chọn sai lấy từ trang: " + o));
    return chuCuaNut(ti[0]).trim(); } },
  // Bài 8: dòng chữ hiển thị (xuống dòng trong mã là dấu cách, br ngắt dòng, p đứng riêng)
  { id: "th1", has: "Dòng chữ thứ hai trên trang web", right: (q) => { const dong = chuHien(docHtml(docKhung(q.svg)));
    assert.equal(dong.length, 3); q.o.slice(1).forEach((o) => assert.ok((dong.join(" ") + " " + dong[0]).includes(o), "lựa chọn sai lấy từ chữ của trang: " + o)); return dong[1]; } },
  // Bài 8: chỉ chữ “là” đậm, số 2 là chỉ số trên
  { id: "th1", has: "chỉ chữ “là” được in đậm", right: (q) => {
    const dung = (o) => { const ds = doanChu(docHtml(o)); return ds.some((d) => d.t === "là") && ds.some((d) => d.t === "2") &&
      ds.every((d) => { const kk = [...d.k].sort().join(); return d.t === "là" ? kk === "b" : d.t === "2" ? kk === "sup" : kk === ""; }); };
    const c = q.o.filter(dung); assert.equal(c.length, 1, "đúng một đoạn mã đúng yêu cầu"); return c[0]; } },
  // Bài 9: kí tự đầu dòng của danh sách có thứ tự theo type, start
  { id: "th1", has: "Với đoạn mã “<ol type=", right: (q) => { const ol = tim(docHtml(maTrong(q.q)[0]), "ol")[0], li = con(ol, "li").map(chuCuaNut), dd = dauDong(ol);
    const muc = y(q.q, /mục “([^”]+)” có kí hiệu đầu dòng nào/)[1]; assert.ok(li.includes(muc)); assert.ok(q.o.includes(dd[0]) && q.o.includes(ol.at.start), "lựa chọn sai: kí hiệu của mục đầu, số start"); return dd[li.indexOf(muc)]; } },
  // Bài 9: số hàng, số cột của bảng có ô gộp
  { id: "th1", has: "Bảng tạo bởi đoạn mã trong hình", right: (q) => { const g = luoiBang(tim(docHtml(docKhung(q.svg)), "table")[0]); return g.hang + " hàng, " + g.cot + " cột"; } },
  // Bài 10: đường dẫn tuyệt đối có giao thức, tên miền
  { id: "th1", has: "đường dẫn tuyệt đối?", right: (q) => { const c = q.o.filter((o) => /^https?:\/\/[a-z0-9.-]+\.[a-z]{2,}\//.test(o)); assert.equal(c.length, 1); return c[0]; } },
  // Bài 10: đường dẫn tương đối từ tệp ở thư mục con hai cấp về thư mục gốc
  { id: "th1", has: "liên kết tới tệp gioi-thieu.html cần có href", right: (q) => {
    assert.ok(/thư mục clb; trong thư mục clb có thư mục the-thao chứa tệp bong-da\.html/.test(q.q) && /Thư mục gốc của một website có tệp gioi-thieu\.html/.test(q.q));
    const c = q.o.filter((o) => duongDan("clb/the-thao/bong-da.html", o) === "gioi-thieu.html"); assert.equal(c.length, 1, "đúng một đường dẫn tới gioi-thieu.html"); return c[0]; } },
  // Bài 11: chỉ ghi chiều rộng thì chiều cao theo tỉ lệ ảnh gốc
  { id: "th1", has: "Ảnh banner.png", right: (q) => { const [W, H] = so(q.q, "rộng # pixel, cao # pixel"), img = tim(docHtml(maTrong(q.q)[0]), "img")[0];
    assert.ok(img.at.src === "banner.png" && img.at.width && !img.at.height); return (H * +img.at.width) / W; } },
  // Bài 12: ô radio cùng name chỉ chọn được một ô; checkbox chọn độc lập
  { id: "th1", has: "Mỗi ý sau về biểu mẫu tạo bởi đoạn mã", right: (q) => {
    const o = oNhap(tim(docHtml(docKhung(q.svg)), "form")[0]), O = (t) => { const r = o.filter((x) => x.nhan === t); assert.equal(r.length, 1, "ô " + t); return r[0]; };
    return q.o.map((s) => { let m;
      if ((m = /^Có thể chọn cùng lúc cả “(.+?)” và “(.+?)”\.$/.exec(s))) return chonCungLuc(O(m[1]), O(m[2]));
      if ((m = /^Nếu đổi name của ô “(.+?)” thành name="(.+?)" thì chọn được cả “(.+?)” và “(.+?)” cùng lúc\.$/.exec(s))) { const a = O(m[1]); const b = { at: Object.assign({}, a.at, { name: m[2] }) }; return chonCungLuc(O(m[3] === m[1] ? m[4] : m[3]), b); }
      if ((m = /^Nếu đổi hai ô “(.+?)”, “(.+?)” thành type="(.+?)" \(giữ name="(.+?)"\) thì vẫn chọn được cả hai cùng lúc\.$/.exec(s))) {
        const [a, b] = [O(m[1]), O(m[2])]; assert.ok(a.at.name === m[4] && b.at.name === m[4]); return chonCungLuc({ at: { type: m[3], name: m[4] } }, { at: { type: m[3], name: m[4] } }); }
      assert.fail("không đọc được ý: " + s); }); } },
  // Bài 7: phần tử cha trực tiếp
  { id: "th2", has: "phần tử cha trực tiếp của phần tử p", right: (q) => { const cha = (n, t) => { for (const x of n.kids || []) { if (x.tag === t) return n; const r = cha(x, t); if (r) return r; } };
    return "Phần tử " + cha(docHtml(maTrong(q.q)[0]), "p").tag; } },
  // Bài 8: div là khối bắt đầu trên dòng mới, span nằm cùng dòng
  { id: "th2", has: "Chữ “Lớp 12A3” nằm ở đâu", right: (q) => { const dong = chuHien(docHtml(docKhung(q.svg))), i = dong.indexOf("Lớp 12A3");
    assert.ok(i >= 0 && dong.includes("Họ tên: Lê Ngọc Ánh") && !dong.some((l) => l.includes("Tổ 2") && l !== "Tổ 2"), "chữ trên trang: " + dong.join(" / ")); return "Một mình trên dòng thứ " + THU[i]; } },
  // Bài 8: thuộc tính style, nhiều cặp tên: giá trị ngăn bằng dấu chấm phẩy
  { id: "th2", has: "màu đỏ, cỡ chữ 24px", right: (q) => { const mau = MAU[y(q.q, /màu (\S+), cỡ chữ/)[1]], [co] = so(q.q, "cỡ chữ #px");
    const c = q.o.filter((o) => { const p = tim(docHtml(o), "p")[0], s = p && kieuChu(p.at.style || ""); return !!s && s.color === mau && s["font-size"] === co + "px" && chuCuaNut(p) === y(q.q, /dòng “([^”]+)”/)[1]; });
    assert.equal(c.length, 1); return c[0]; } },
  // Bài 9: danh sách không thứ tự, list-style-type
  { id: "th2", has: "list-style-type: square", right: (q) => {
    const goc = docHtml(maTrong(q.q)[0]), ul = tim(goc, "ul"), kieu = kieuChu(ul[0].at.style)["list-style-type"];
    assert.ok(ul.length === 1 && tim(goc, "ol").length === 0 && kieu in KI_TU_UL);
    return q.o.map((s) => { let m;
      if (/^Các mục được đánh số/.test(s)) return tim(goc, "ol").length > 0;
      if ((m = /^Đổi (\w+) thành (\w+) thì các mục không có kí tự đầu dòng\.$/.exec(s))) { assert.equal(m[1], kieu); return KI_TU_UL[m[2]] === ""; }
      if ((m = /^Mỗi mục có kí tự đầu dòng là (hình \S+)/.exec(s))) return KI_TU_UL[kieu] === m[1];
      return null; }); } },
  // Bài 9: tự luận, bảng có ô gộp cột
  { id: "th2", has: "Em hãy viết đoạn mã HTML tạo một bảng", essay: (q) => {
    const ma = maTrong(q.x); assert.equal(ma.length, 1, "bài gợi ý có một đoạn mã"); const t = tim(docHtml(ma[0]), "table")[0], g = luoiBang(t);
    assert.ok(g.hang === 3 && g.cot === 3 && t.at.border === "1", "bảng có viền, 3 hàng, 3 cột");
    const o = (r, c) => chuCuaNut(g.g[r][c]);
    assert.deepEqual([0, 1, 2].map((r) => [0, 1, 2].map((c) => o(r, c))), [["Tiết", "Thứ Hai", "Thứ Ba"], ["1", "Toán", "Ngữ văn"], ["2", "Tin học", "Tin học"]]);
    assert.ok(g.g[0].every((x) => x.tag === "th") && g.g[2][1] === g.g[2][2] && g.g[2][1].at.colspan === "2", "hàng 1 là ô tiêu đề, ô “Tin học” gộp hai cột");
    ["Tiết", "Thứ Hai", "Thứ Ba", "Toán", "Ngữ văn", "Tin học"].forEach((c) => assert.ok(q.q.includes("“" + c + "”"), "đề bài ghi “" + c + "”"));
    coThang(q, "border=\"1\"", "colspan=\"2\"", "ba ô tiêu đề th", "ba ô td"); } },
  // Bài 10: ảnh làm liên kết: img nằm trong a
  { id: "th2", has: "trở thành một liên kết tới trang", right: (q) => { const anh = y(q.q, /ảnh ([\w.-]+\.png)/)[1], trang = y(q.q, /tới trang ([\w.-]+\.html)/)[1];
    const c = q.o.filter((o) => { const g = docHtml(o), a = tim(g, "a"); return a.length === 1 && a[0].at.href === trang && tim(a[0], "img").some((i) => i.at.src === anh) && tim(g, "img").length === 1; });
    assert.equal(c.length, 1); return c[0]; } },
  // Bài 10: liên kết trong cùng trang: # và id của phần tử đích
  { id: "th2", has: "được đặt id=", right: (q) => "#" + y(q.q, /id="([^"]+)"/)[1] },
  // Bài 11: video autoplay, muted, width
  { id: "th2", has: "autoplay muted></video>", right: (q) => { const v = tim(docHtml(maTrong(q.q)[0]), "video")[0];
    return q.o.map((s) => { let m;
      if (/^Mở trang là video tự phát ngay\.$/.test(s)) return v.at.autoplay === true && v.at.muted === true; // sách: Chrome chỉ cho tự phát khi có muted
      if (/^Video phát có âm thanh\.$/.test(s)) return v.at.muted !== true;
      if ((m = /^Video hiển thị với chiều rộng (\d+) pixel\.$/.exec(s))) return v.at.width === m[1];
      return null; }); } },
  // Bài 12: for của nhãn trùng id của ô nhập
  { id: "th2", has: "Nháy chuột vào chữ “Họ tên:”", right: (q) => { const g = docHtml(maTrong(q.q)[0]), lab = tim(g, "label")[0], inp = tim(g, "input")[0];
    assert.ok(lab.at.for !== inp.at.id, "đoạn mã có lỗi"); return `Đổi for="${lab.at.for}" thành for="${inp.at.id}"`; } },

  /* ===== Công nghệ ===== */
  // Bài 3: tải nối tam giác: Up = Ud, Id = √3 Ip
  { id: "cn1", has: "mỗi dây có điện trở 95 Ω", right: (q) => { assert.ok(q.q.includes("nối hình tam giác")); const [R] = so(q.q, "điện trở # Ω"), [Ud] = so(q.q, "điện áp dây # V");
    coX(q, "Id = √3 × Ip"); assert.ok(/hàng phần mười/.test(q.q)); return lam((BA * Ud) / R, 1); } },
  // Bài 3: nối tam giác là điểm cuối pha này nối điểm đầu pha khác, không nối tắt cuộn nào
  { id: "cn1", has: "Cách nối nào sau đây là nối hình tam giác", right: (q) => { const DAU = { X: "A", Y: "B", Z: "C" };
    const tg = (o) => { const p = [...o.matchAll(/([XYZ]) với ([ABC])/g)]; return p.length === 3 && new Set(p.map((x) => x[1])).size === 3 && new Set(p.map((x) => x[2])).size === 3 && p.every((x) => DAU[x[1]] !== x[2]); };
    const c = q.o.filter(tg); assert.equal(c.length, 1); return c[0]; } },
  // Bài 4: lưới điện truyền tải có điện áp trên 110 kV
  { id: "cn1", has: "Những đường dây nào thuộc lưới điện truyền tải", right: (q) => { const U = [...q.q.matchAll(/đường dây (\d+(?:,\d+)?) kV/g)].map((m) => val(m[1]));
    assert.equal(U.length, 4); const tt = U.filter((u) => u > 110); return "Đường dây " + tt.map(vn).join(" kV và ") + " kV"; } },
  // Bài 5: thứ tự các quá trình ở nhà máy nhiệt điện
  { id: "cn1", has: "nhà máy nhiệt điện chạy bằng than", right: (q) => xepTheo(q.o, ["than cháy", "nước trong lò hơi", "làm quay turbine", "kéo máy phát", "máy biến áp"]) },
  // Bài 7: sai số điện áp cho phép ±5%, tần số 50 Hz
  { id: "cn1", has: "380/220 V. Mỗi ý sau", right: (q) => { const [, Up] = so(q.q, "#/# V");
    return q.o.map((s) => { let m;
      if ((m = /^Đo được điện áp (\d+) V ở ổ cắm thì điện áp vẫn nằm trong giới hạn sai số cho phép\.$/.exec(s))) return Math.abs(+m[1] - Up) <= 0.05 * Up;
      if ((m = /^Tần số định mức của mạng điện này là (\d+) Hz\.$/.exec(s))) return +m[1] === 50;
      return null; }); } },
  // Bài 7: số hộ = công suất cho phép : công suất mỗi hộ
  { id: "cn1", has: "công suất cho phép 400 kW", right: (q) => { const [P] = so(q.q, "công suất cho phép # kW"), [p] = so(q.q, "trung bình # kW"); return Math.floor(P / p + 1e-9); } },
  // Bài 8: điện đi từ tủ điện ngoài trời (công tơ) qua tủ điện tổng tới các tủ điện nhánh
  { id: "cn1", has: "Nhà bạn Hương có tủ điện ngoài trời", right: (q) => {
    const CHA = { "tủ điện tổng": "công tơ", "tủ điện nhánh tầng 1": "tủ điện tổng", "tủ điện nhánh tầng 2": "tủ điện tổng", "tầng 1": "tủ điện nhánh tầng 1", "tầng 2": "tủ điện nhánh tầng 2" };
    const coDien = (n, ngat) => { for (let x = n; x; x = CHA[x]) if (x === ngat) return false; return true; };
    return q.o.map((s) => { let m;
      if ((m = /^Ngắt aptomat của (tủ điện nhánh tầng \d) thì đèn ở (tầng \d) cũng tắt\.$/.exec(s))) return !coDien(m[2], m[1]);
      if (/^Ngắt aptomat tổng trong tủ điện tổng thì cả hai tầng mất điện\.$/.test(s)) return !coDien("tầng 1", "tủ điện tổng") && !coDien("tầng 2", "tủ điện tổng");
      if ((m = /^Tủ điện (nhánh tầng \d) nhận điện thẳng từ công tơ, không qua tủ điện tổng\.$/.exec(s))) return CHA["tủ điện " + m[1]] === "công tơ";
      return null; }); } },
  // Bài 9: I = P : (U × cosφ); dòng điện định mức của aptomat = I × hệ số an toàn; chọn loại lớn hơn và gần nhất
  { id: "cn1", has: "Một ấm siêu tốc có công suất", right: (q) => { const [P] = so(q.q, "công suất # W"), [U] = so(q.q, "dùng điện # V"), [cos] = so(q.q, "cosφ = #"), [k] = so(q.q, "hệ số an toàn #");
    const I = P / (U * cos), Idm = I * k, loai = q.o.map((o) => +y(o, /^MCB1P\/(\d+)A$/)[1]), chon = Math.min(...loai.filter((v) => v > Idm + 1e-9));
    coX(q, "I = P : (U × cosφ) = " + vn(P) + " : (" + vn(U) + " × " + vn(cos) + ") = " + vn(I), vn(I) + " × " + vn(k) + " = " + vn(Idm)); return "MCB1P/" + chon + "A"; } },
  // Bài 10: sơ đồ mạch đèn cầu thang nối đúng, hai lưỡi gạt cùng ở dây nối dưới
  { id: "cn1", has: "Ở vị trí của các công tắc như hình, đèn Đ sáng hay tắt", right: (q) => { const s = docHaiCongTac(q.svg), sang = s.sang(s.vt);
    // mạch nối đúng: gạt một công tắc bất kì thì đèn đổi trạng thái
    CAC_VT.forEach((v) => ["K1", "K2"].forEach((t) => assert.notEqual(s.sang(doi(v, t)), s.sang(v), "mạch đèn cầu thang: gạt " + t + " thì đèn đổi trạng thái")));
    assert.ok(!s.noi(s.L, s.den[0]) && !s.noi(s.L, s.den[1]) && (s.noi(s.N, s.den[0]) || s.noi(s.N, s.den[1])), "dây pha qua công tắc mới tới đèn; đèn nối với dây trung tính");
    const cung = s.noi(s.K[0][s.vt.K1], s.K[1][s.vt.K2]);
    return (sang ? "Sáng" : "Tắt") + ", vì hai lưỡi gạt " + (cung ? "cùng nối vào một dây nối" : "nối vào hai dây nối khác nhau"); } },
  // Bài 10: tự luận, lắp mạch đèn cầu thang
  { id: "cn1", has: "Em hãy nêu cách lắp mạch điện để bật, tắt một đèn ở cầu thang", essay: (q) => {
    coThang(q, "hai công tắc ba cực", "aptomat", "cực giữa", "dây trung tính (N)", "Trước khi đóng điện"); coX(q, "Bài gợi ý:", "Gạt bất kì công tắc nào cũng đổi trạng thái của đèn"); } },
  // Bài 12: điện năng tiết kiệm = số bóng × công suất giảm × thời gian
  { id: "cn1", has: "thay 12 bóng đèn huỳnh quang", right: (q) => { const [n, P1, n2, P2] = so(q.q, "thay # bóng đèn huỳnh quang # W bằng # bóng đèn LED # W"), [t] = so(q.q, "bật # giờ");
    assert.equal(n, n2); assert.ok(DIEN_NANG.test(q.q), "đề ghi sẵn cách tính điện năng"); return (n * (P1 - P2) * t) / 1000; } },
  // Bài 3: sơ đồ ba bóng đèn nối hình sao có dây trung tính
  { id: "cn2", has: "Ba bóng đèn được nối theo cách nào", right: (q) => { const sd = docBaPha(q.svg), c = cachNoi(sd);
    assert.ok(c !== "khác", "sơ đồ nối sao hoặc tam giác"); return c === "sao" ? (sd.day.includes("O") ? "Nối hình sao, có dây trung tính" : "Nối hình sao, không dùng dây O") : "Nối hình tam giác"; } },
  // Bài 3: tải nối sao có dây trung tính: Up = Ud/√3; P = 3 × Up × Ip × cosφ
  { id: "cn2", has: "mỗi dây có điện trở 55 Ω", right: (q) => { assert.ok(q.q.includes("nối hình sao")); const [R] = so(q.q, "điện trở # Ω"), [Ud, Up] = so(q.q, "ba pha #/# V");
    assert.ok(gan(Ud / BA, Up, 0.01), "điện áp pha = điện áp dây : √3"); const I = Up / R; coX(q, "Ip = " + vn(Up) + " : " + vn(R) + " = " + vn(I)); return 3 * Up * I; } },
  // Bài 4: cấp điện áp (hạ áp đến 1 kV, trung áp đến 35 kV, cao áp đến 220 kV, siêu cao áp trên 220 kV)
  { id: "cn2", has: "đường dây 500 kV thuộc cấp điện áp nào", right: (q) => { const [U] = so(q.q, "đường dây # kV"); return U <= 1 ? "Hạ áp" : U <= 35 ? "Trung áp" : U <= 220 ? "Cao áp" : "Siêu cao áp"; } },
  // Bài 7: đường đi của điện năng trong mạng điện hạ áp (Hình 7.2 của sách: trạm biến áp, tủ phân phối tổng, tủ phân phối khu vực, tới các hộ)
  { id: "cn2", has: "từ đường dây 22 kV tới nhà bạn An", right: (q) => xepTheo(q.o, ["trạm biến áp", "phân phối tổng", "phân phối khu vực", "đường dây nhánh", "công tơ"]) },
  // Bài 7: chia đều số hộ cho ba pha
  { id: "cn2", has: "Có 90 hộ dùng điện một pha", right: (q) => { const [n] = so(q.q, "Có # hộ"); assert.ok(q.q.includes("ba pha bốn dây")); return "Chia đều, mỗi pha " + vn(n / 3) + " hộ, để cân bằng tải"; } },
  // Bài 9: I = P : (U × cosφ); S = I : J
  { id: "cn2", has: "lò nướng điện có công suất", right: (q) => { const [P] = so(q.q, "công suất # W"), [U] = so(q.q, "dùng điện # V"), [cos] = so(q.q, "cosφ = #"), [J] = so(q.q, "cho phép # A/mm²");
    const I = P / (U * cos); coX(q, "= " + vn(I) + " (A)", "S = I : J = " + vn(I) + " : " + vn(J) + " = " + vn(I / J)); return I / J; } },
  // Bài 10: sơ đồ nối nhầm: đèn chỉ sáng khi hai lưỡi gạt cùng ở trên
  { id: "cn2", has: "nối nhầm dây như sơ đồ trong hình", right: (q) => { const s = docHaiCongTac(q.svg), on = CAC_VT.filter(s.sang);
    assert.deepEqual(on, [{ K1: "tren", K2: "tren" }], "đèn chỉ sáng khi hai lưỡi gạt cùng ở trên"); coX(q, "cùng ở vị trí trên");
    return q.o.map((t) => { let m;
      if (/^Ở vị trí các công tắc như hình, đèn tắt\.$/.test(t)) return !s.sang(s.vt);
      if ((m = /^Từ vị trí như hình, gạt (K\d) sang vị trí còn lại thì đèn sáng\.$/.exec(t))) return s.sang(doi(s.vt, m[1]));
      if ((m = /^Khi đèn đang sáng, gạt (K\d) sang vị trí còn lại thì đèn tắt\.$/.exec(t))) return on.every((v) => !s.sang(doi(v, m[1])));
      if (/^Khi đèn đang tắt, luôn bật được đèn bằng cách gạt chỉ một công tắc\.$/.test(t)) return CAC_VT.filter((v) => !s.sang(v)).every((v) => ["K1", "K2"].some((k) => s.sang(doi(v, k))));
      return null; }); } },
  // Bài 12: tiền điện giảm khi chuyển giờ chạy máy (giá giả định, đề ghi sẵn cách tính)
  { id: "cn2", has: "máy sấy 15 kW", right: (q) => { const [P, h] = so(q.q, "máy sấy # kW, mỗi ngày chạy # giờ"), [g1, g2] = so(q.q, "cao điểm là # đồng/kWh, giờ thấp điểm là # đồng/kWh"), [d] = so(q.q, "Trong # ngày");
    assert.ok(q.q.includes("Giả định giá điện") && DIEN_NANG.test(q.q), "đề ghi sẵn giá điện giả định, cách tính điện năng"); return P * h * d * (g1 - g2); } }
];
// lựa chọn sai cố ý viết sai cú pháp (câu tìm chỗ viết sai); hiện kho không có câu như vậy
const SAI_CU_PHAP = new Set([]);
// tên nhân vật của sách Tin học 12 (Bài 5, Bài 9); sách Công nghệ 12 không đặt tên nhân vật
const TEN_SACH = /Hoàng Mỹ|(?:Thầy|Cô) (?:Khải|Lan|Vũ|Hoàng|Đức|Thắng|Bích)(?![\p{L}])/u;

/* ---------- chạy kiểm tra ---------- */
let n = 0;
const daKiem = new Set();
CHECKS.forEach((c) => {
  const m = MON.find((x) => c.id.startsWith(x.ki)), cau = m.kho.filter((q) => q.q.includes(c.has));
  assert.equal(cau.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${cau.length}`);
  const q = cau[0], at = ten.get(q) + ": " + c.has;
  try {
    assert.equal(q.src, m.DE[+c.id.slice(2) - 1], "câu nằm ở đề " + q.src);
    if (q.type === "essay") {
      assert.ok(c.essay, "tự luận cần kiểm tra thang chấm"); c.essay(q);
      assert.ok(q.rubric.every((r) => r.p > 0 && Number.isInteger(r.p * 4)) && sum(q.rubric.map((r) => r.p)) === 2, "thang chấm 2 điểm, mỗi ý chia hết cho 0,25");
    } else {
      assert.ok(c.right, "câu chấm tự động cần right"); const want = c.right(q);
      if (q.type === "num") {
        assert.ok(gan(q.ans, want), "đáp án " + q.ans + ", tính được " + want);
        assert.ok(Math.abs(q.ans * 100 - Math.round(q.ans * 100)) < 1e-9, "đáp án quá hai chữ số thập phân");
        assert.ok(q.tol === undefined, "đáp án chính xác (đề dặn cách làm tròn), không cần sai số");
      } else if (q.type === "tf4") {
        assert.ok(Array.isArray(want) && want.length === 4, "câu đúng/sai 4 ý: right trả mảng 4 ý");
        assert.ok(want.filter((w) => w !== null).length >= 2, "câu đúng/sai 4 ý: tính lại ít nhất hai ý");
        want.forEach((w, i) => w === null || assert.strictEqual(q.a[i], w, "ý " + "abcd"[i] + ": đáp án " + q.a[i] + ", tính được " + w));
      } else if (q.type === "order") {
        assert.deepEqual(q.o, want, "thứ tự " + JSON.stringify(q.o) + ", tính được " + JSON.stringify(want));
      } else if (q.type === "match") {
        assert.deepEqual(q.l.map((l, k) => [l, q.r[k]]), want, "cặp nối " + JSON.stringify(q.l.map((l, k) => [l, q.r[k]])) + ", tính được " + JSON.stringify(want));
      } else {
        assert.strictEqual(q.o[0], want, "đáp án " + q.o[0] + ", tính được " + want); assert.ok(!q.o.slice(1).includes(want), "nhiễu trùng đáp án đúng");
      }
    }
  } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
  daKiem.add(q); n++;
});
// câu trả lời bằng số, câu có hình, câu sắp xếp, câu nối, câu tự luận nào cũng phải được tính lại, đọc lại ở trên; mọi đoạn mã HTML trong
// câu Tin học (trong ngoặc kép “…”, hoặc lựa chọn là một đoạn mã) đúng cú pháp, trừ lựa chọn sai của câu tìm chỗ viết sai (SAI_CU_PHAP)
MON.forEach((m) => m.kho.filter((q) => q.svg || ["num", "essay", "order", "match"].includes(q.type)).forEach((q) => assert.ok(daKiem.has(q), "chưa có kiểm tra cho câu " + ten.get(q) + ": " + q.q.slice(0, 60))));
MON.forEach((m) => m.kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + ten.get(q))));
{
  let dem = 0;
  TH.kho.forEach((q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], (q.rubric || []).map((c) => c.c)).forEach((s) => maTrong(s).forEach((ma) => {
    if (SAI_CU_PHAP.has(ma)) return;
    try { docMa(ma); dem++; } catch (e) { assert.fail(ten.get(q) + ": đoạn mã viết sai (" + e.message + "): " + ma); }
  })));
  assert.ok(dem >= 30, "Tin học: ít nhất 30 đoạn mã được đọc lại, có " + dem);
  n += dem;
}

/* ---------- chữ ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], q.type === "fill" ? q.ans : [], q.unit || [], (q.rubric || []).map((c) => c.c)).map(String);
const chuHinh = (q) => (q.svg ? texts(q.svg).map((t) => t.t) : []);
MON.forEach((m) => m.kho.forEach((q) => chu(q).forEach((s) => {
  const at = ten.get(q) + ": " + q.q.slice(0, 50) + " → ";
  // dấu thanh kiểu sách (hoá, hoà, khoẻ, tuỳ, thuỷ, kĩ, lí)
  assert.ok(!/(?<![\p{L}])(?:hóa|hòa|khỏe|tùy|thỏa|thủy|tỏa|hủy|họa|lũy|xóa|kỹ|lý)(?![\p{L}])/iu.test(s), at + "viết như sách (hoá, hoà, khoẻ, tuỳ, thoả, thuỷ, kĩ, lí): " + s);
  // số ngăn hàng nghìn bằng khoảng trắng (năm viết liền), dấu phẩy thập phân; trong đoạn mã, địa chỉ IP, tên tệp, đường dẫn thì giữ nguyên
  const ngoai = s.replace(/“[^”]*”/g, " ").replace(/\b\d{1,3}(?:\.\d{1,3}){2,3}\b/g, " ").replace(/[\w-]+\.(?:html|htm|png|jpg|mp3|mp4|gif)\b/g, " ");
  if (!maTrong(s).length || !/^</.test(s)) assert.ok(!/\d{5,}|\d\.\d/.test(ngoai) && [...ngoai.matchAll(/(?<![\d,])\d{4}(?![\d,])/g)].every((x) => /^(19|20)\d\d$/.test(x[0])), at + "số viết sai cách: " + s);
  // lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án
  assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(s), at + "nhắc vị trí của phương án: " + s);
  // tên nhân vật của sách không dùng làm tên trong đề
  assert.ok(!TEN_SACH.test(s), at + "tên nhân vật của sách: " + s);
})));

/* ---------- lời dặn, mức độ, ma trận ---------- */
const SO = "Từ năm học 2026–2027 Sở GD&ĐT ra đề chung cuối kì một số môn lớp 12; xem thông báo của Sở về môn và cấu trúc đề.";
MON.forEach((m) => {
  const M = m.M, cells = Object.values(M), CHU_DE = m.BAI.map((b) => b[0]), soBai = Object.fromEntries(m.BAI);
  assert.ok(m.kho.every((q) => [1, 2, 3].includes(q.lv)), m.ma + ": câu nào cũng cần lv");
  assert.ok(cells.every(Array.isArray), m.ma + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], m.ma + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.equal(sum(cells.map(sum)), m.pool.n, m.ma + ": tổng ma trận bằng n");
  assert.ok(cells.every((v) => sum(v) >= 1), m.ma + ": chủ đề nào cũng có câu");
  assert.deepEqual(Object.keys(M), CHU_DE, m.ma + ": chủ đề theo tên bài, thứ tự bài của sách");
  CHU_DE.forEach((t) => assert.ok(("chu-de:12:" + m.ma + ":" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
  m.DE.forEach((id) => {
    const qs = m.kho.filter((q) => q.src === id);
    assert.deepEqual([...new Set(qs.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, đúng thứ tự");
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t));
    // lời dặn: phạm vi, số câu mỗi phần (tính từ ma trận), bài học tiếp theo, câu về đề chung của Sở
    const note = bank(id).note;
    assert.equal(note, bank(m.DE[0]).note, id + ": hai đề cùng lời dặn");
    m.PHAN.forEach(([p, tu, den]) => { const k = sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))); assert.ok(note.includes(p + " " + k + " câu"), id + ": lời dặn ghi “" + p + " " + k + " câu”"); });
    assert.equal(sum(m.PHAN.map(([, tu, den]) => sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))))), m.pool.n, m.ma + ": các phần của lời dặn phủ hết ma trận");
    assert.ok(note.startsWith(m.dau) && note.includes(m.sau) && note.includes("đối chiếu với đề cương của trường") && note.endsWith(SO), id + ": lời dặn ghi sách, nhắc bài học tiếp theo, đề cương của trường và đề chung của Sở");
  });
  // chủ đề đúng tên bài trong mục lục (README của cuốn ở OnUp-Book); tên chủ đề, chương của lời dặn đúng mục lục
  m.sachCo.forEach((sach) => {
    const readme = path.join(BOOK, "lop-12", sach, "README.md");
    if (!fs.existsSync(readme)) return;
    const md = fs.readFileSync(readme, "utf8"), ml = Object.fromEntries([...md.matchAll(/Bài (\d+)[.:] ([^|*·]+?) \|/g)].map((x) => [+x[1], x[2].trim()]));
    m.BAI.forEach(([t, b]) => assert.equal(t, ml[b], m.ma + ": tên Bài " + b + " theo mục lục của " + sach));
    m.PHAN.forEach(([p]) => { const c = /^(Chủ đề|Chương) (\d+|[IVX]+) ([^(]+?) \(/.exec(p); assert.ok(c, "phần của lời dặn: " + p);
      assert.ok(md.includes("**" + c[1] + " " + c[2] + ". " + c[3] + "**") || md.includes("**" + c[1] + " " + c[2] + ". " + c[3].toUpperCase() + "**"), m.ma + ": tên " + c[1] + " " + c[2] + " theo mục lục của " + sach); });
  });
  // dạng câu theo khung Công văn 7991: nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn (số), tự luận tự chấm; nối, sắp xếp như các kho Tin học, Công nghệ
  assert.ok(m.kho.every((q) => ["mc", "tf4", "num", "essay", "match", "order"].includes(q.type)), m.ma + ": dạng câu");
  const dem = (f) => m.kho.filter(f).length;
  assert.ok(dem((q) => q.type === "essay") >= 1 && dem((q) => q.type === "essay") <= 2, m.ma + ": 1–2 câu tự luận");
  m.DE.forEach((id) => { const qs = m.kho.filter((q) => q.src === id); assert.ok(qs.filter((q) => q.type === "tf4").length >= 3 && qs.filter((q) => q.type === "essay").length <= 1, id + ": đủ đúng/sai 4 ý, nhiều nhất một câu tự luận"); });
  const tf4 = m.kho.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 6, m.ma + ": ít nhất 6 câu đúng/sai 4 ý");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(q.o.length === 4 && /Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
  assert.equal(Math.max(...Object.values(kieu)), 1, m.ma + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
  tf4.forEach((q) => { const vt = q.a.map((a, i) => q.x.indexOf("abcd"[i] + ") " + (a ? "Đúng" : "Sai")));
    assert.ok(vt.every((v, i) => v >= 0 && (i === 0 || v > vt[i - 1])) && !/[a-d]\) (Đúng|Sai)[^.:;]/.test(q.x.replace(/[a-d]\) (Đúng|Sai)$/, "")), "lời giải câu đúng/sai ghi đúng từng ý, theo thứ tự: " + ten.get(q)); });
  // câu tự luận chỉ ở ô Vận dụng rút 1 câu, ô đó còn câu khác dạng: mỗi lần rút nhiều nhất 2 câu tự luận
  const oTL = [...new Set(m.kho.filter((q) => q.type === "essay").map((q) => q.topic + "|" + q.lv))];
  assert.ok(oTL.every((k) => { const [t, lv] = k.split("|"); return +lv === 3 && M[t][2] === 1 && m.kho.some((q) => q.topic === t && q.lv === 3 && q.type !== "essay"); }), m.ma + ": câu tự luận ở ô " + oTL);
  m.kho.filter((q) => q.type === "essay").forEach((q) => assert.ok(/Em hãy/.test(q.q), "câu tự luận có lời dặn “Em hãy…”: " + ten.get(q)));
  // câu nối có ô thừa; câu sắp xếp 4–5 ô
  m.kho.filter((q) => q.type === "match").forEach((q) => assert.ok(q.r.length > q.l.length && q.l.length >= 3, "câu nối có ít nhất 3 cặp và ô thừa: " + ten.get(q)));
  m.kho.filter((q) => q.type === "order").forEach((q) => assert.ok(q.o.length >= 4 && q.o.length <= 5, "câu sắp xếp 4–5 ô: " + ten.get(q)));
  // câu nhiều lựa chọn: đáp án đúng không dài hơn hẳn lựa chọn sai, các lựa chọn không trùng nhau, đáp án đúng không là lựa chọn duy nhất có
  // chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), mc = m.kho.filter((q) => q.type === "mc");
  mc.forEach((q) => {
    const L = Math.max(...q.o.slice(1).map((o) => o.length));
    assert.ok(q.o.length === 4 && q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q) + " " + q.q.slice(0, 50));
    assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 50));
    const c = chuThuong(q.topic), tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|sau|từ|đến|năm|một|vào)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề: ${ten.get(q)} ${q.q.slice(0, 60)}`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    assert.ok(!(dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”: " + ten.get(q));
  });
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn
  const le = mc.filter((q) => { const L = q.o.map((o) => o.length); return L[0] > Math.max(...L.slice(1)) || L[0] < Math.min(...L.slice(1)); });
  assert.ok(le.length * 3 <= mc.length, `${m.ma}: đáp án đúng dài nhất hoặc ngắn nhất ở ${le.length}/${mc.length} câu: ` + le.map((q) => ten.get(q)).join(", "));
  m.le = le.length + "/" + mc.length;

  /* ---------- rút thử ---------- */
  const thu = (hist) => {
    const d = Quiz.draw(m.pool, hist);
    assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
    assert.equal(d.questions.length, m.pool.n);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
    assert.ok(d.questions.filter((q) => q.type === "essay").length <= 2);
    return d;
  };
  const seen = new Set();
  for (let k = 0; k < 300; k++) thu().questions.forEach((q) => seen.add(Quiz.key(q)));
  assert.equal(seen.size, m.kho.length, m.ma + ": 300 lần rút thử phải gặp đủ các câu của kho");
  m.DE.forEach((id) => { const done = new Set(m.kho.filter((q) => q.src === id).map(Quiz.key)); for (let k = 0; k < 20; k++) thu((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), "đã làm hết " + id + " mà vẫn gặp lại câu của đề đó")); });
  // đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng
  const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ""), deBai = m.kho.map((q) => ({ at: ten.get(q), k: goc(q.q) }));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
});

/* ---------- danh sách xem tay ----------
   CUM_CHUNG: chuỗi 3 từ chung của môn (tên thiết bị, thuật ngữ) không coi là lộ đáp án; DA_XEM: chuỗi 3 từ của đáp án có ở câu rút được cùng
   lúc, đã xem tay, không lộ (in lại bằng DO_LO=1); TU_CHUNG: tên bài, tên chương, thuật ngữ, cách nói chuẩn của đề, bỏ qua khi so với chữ
   của sách và của kho khác. */
const CUM_CHUNG = new Set(["các thiết bị", "điện năng từ", "hạ áp tới", "trạm biến áp", "380 220 v", "dây trung tính", "điện phân phối", "trong một khu", "nối vào một", "vào một dây"]);
const DA_XEM = [
  // Tin học: ý “ra quyết định” của hệ chuyên gia, không phải ý thiếu minh bạch
  "th2#2 → th1#4: cách ra quyết",
  "th2#2 → th1#4: ra quyết định",
  // Công nghệ: tên nhóm nghề, thuật ngữ (lưới điện, đường dây 500 kV, nối hình sao, lưỡi gạt) ở câu khác ý; không câu nào nêu ý của đáp án
  "cn2#4 → cn1#3: vận hành điện",
  "cn1#3 → cn1#4: kĩ thuật viên",
  "cn1#3 → cn1#4: lắp đặt điện",
  "cn2#3 → cn1#4: lắp đặt điện",
  "cn1#9 → cn1#8: lưới điện",
  "cn1#10 → cn1#8: lưới điện",
  "cn1#16 → cn1#8: lưới điện",
  "cn1#24 → cn1#8: lưới điện",
  "cn2#1 → cn1#8: lưới điện",
  "cn2#4 → cn1#8: lưới điện",
  "cn2#9 → cn1#8: lưới điện",
  "cn2#12 → cn1#8: lưới điện",
  "cn1#12 → cn1#9: đường dây 500",
  "cn1#12 → cn1#9: dây 500 kv",
  "cn2#8 → cn1#9: đường dây 500",
  "cn2#8 → cn1#9: dây 500 kv",
  "cn2#13 → cn1#9: đường dây 500",
  "cn2#13 → cn1#9: dây 500 kv",
  "cn1#1 → cn1#16: phân phối điện",
  "cn2#21 → cn1#20: hai lưỡi gạt",
  "cn2#21 → cn1#20: lưỡi gạt cùng",
  "cn1#21 → cn2#3: vẽ sơ đồ",
  "cn1#6 → cn2#6: nối hình sao",
  "cn2#7 → cn2#6: nối hình sao"
];
const TU_CHUNG = MON.flatMap((m) => m.BAI.map((b) => b[0]).concat(m.PHAN.map((p) => p[0].replace(/^(?:Chủ đề|Chương) \S+ /, "").replace(/ \(.*$/, "")))).concat([
  // Tin học: tên gọi của HTML, HTTP như sách
  "ngôn ngữ đánh dấu siêu văn bản", "giao thức truyền tải siêu văn bản",
  // Công nghệ: tên nhóm công việc (Bài 2), tên tủ điện (Bài 7), lời dặn làm tròn
  "sản xuất, chế tạo thiết bị điện", "bảo dưỡng và sửa chữa điện", "tủ điện phân phối khu vực", "tủ điện phân phối tổng", "làm tròn kết quả đến hàng phần mười"]);

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Đề ngẫu nhiên rút câu ở mọi ô, đề “Ôn chủ đề” rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi cặp câu cùng môn, trừ cặp có
   câu tự luận nằm cùng một ô rút 1 câu. Đáp án là số (trả lời ngắn, lựa chọn đúng dạng “17,3 A”; từ hai chữ số, hoặc số thập phân) tìm ở vị
   trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”, “đạt”; không tính số đứng trước một phép tính) cùng đơn vị: không được
   có. Đáp án bằng chữ (lựa chọn đúng của câu nhiều lựa chọn) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp
   án); chuỗi có trong đề bài, lựa chọn, lời giải, chữ trong hình của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM.
   Cặp nối: cả hai vế có ở câu kia thì lộ. Ô của câu sắp xếp: hai ô liền nhau theo đúng thứ tự có ở câu kia thì in ra để xem tay. */
const DON_VI = "(?:kWh|Wh|kW|W|kV|V|A|Ω|đồng|giờ|phút|%)";
const soDV = new RegExp("^(" + NUM + ")(?: ?(" + DON_VI + "))?$", "u");
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được|đạt))\\s+(" + NUM + ")(?![\\d,])(?!\\s*[·+−:×](?:\\s|\\d|\\())(?: ?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => ({ v: val(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const doLo = (qs, M, tenCau) => {
  const lo = [], chuLo = [], cungLuc = (p, q) => p !== q && (p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2);
  qs.forEach((q) => {
    let soDa = [], C = [], cap = [];
    if (q.type === "num") soDa = [{ v: q.ans, u: q.unit || "" }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: val(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]); C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)]; } }
    else if (q.type === "order") C = q.o.slice(1).map((o, i) => [q.o[i], o]);
    else if (q.type === "match") cap = q.l.map((l, k) => [l, q.r[k]]);
    soDa = soDa.filter((d) => Math.abs(d.v) >= 10 || !Number.isInteger(d.v));
    qs.forEach((p) => {
      if (!cungLuc(p, q)) return;
      const at = `${tenCau(p)} → ${tenCau(q)}: `, chuP = chu(p).concat(chuHinh(p)), T = " " + chuP.map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chuP.flatMap(kqSo).some((yy) => gan(yy.v, d.v) && (!yy.u || !d.u || yy.u === d.u))).forEach((d) => lo.push(at + vn(d.v) + " " + d.u));
      cap.filter(([a, b]) => [a, b].every((v) => T.includes(" " + tuCua(v).join(" ") + " "))).forEach(([a, b]) => lo.push(at + a + " – " + b));
      if (q.type === "order") { if (p.type === "order") C.forEach(([a, b]) => { const i = p.o.indexOf(a); if (i >= 0 && p.o[i + 1] === b) chuLo.push(at + a + " → " + b); }); return; }
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
const lo = [], chuLo = [];
MON.forEach((m) => { const r = doLo(m.kho, m.M, (q) => ten.get(q)); lo.push(...r.lo); chuLo.push(...r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));

/* ---------- không chép sách: so với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ----------
   Cụm từ chung của môn (TU_CHUNG: tên bài, tên chương, tên thẻ, thuật ngữ, cách nói chuẩn của đề) thay bằng dấu ngăn trước khi so. Chuỗi so
   phải có ít nhất 5 từ có chữ. */
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const boDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const TU_CHUNG_ = TU_CHUNG.map((p) => " " + boDau(p) + " ").sort((a, b) => b.length - a.length);
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ: băm mọi chuỗi k từ của chữ đã chuẩn hoá (một lần cho mỗi chữ, mỗi k), chỉ so thật (includes) khi băm có;
// kết quả như sach.includes(" " + c + " "), ds.filter((o) => o.s.includes(" " + c + " ")) mà không quét lại cả chữ cho mỗi chuỗi
const traChu = (() => {
  const bam = (w, k) => {
    const A = new Uint32Array(w.length), B = new Uint32Array(w.length), n = Math.max(0, w.length - k + 1), H = new Float64Array(n);
    for (let i = 0; i < w.length; i++) { let a = 0x811c9dc5, b = 0x1b873593; const t = w[i]; for (let j = 0; j < t.length; j++) { const x = t.charCodeAt(j); a = Math.imul(a ^ x, 0x01000193); b = Math.imul(b ^ x, 0x5bd1e995); } A[i] = a; B[i] = b; }
    for (let i = 0; i < n; i++) { let a = 0x9e3779b9, b = 0x85ebca6b; for (let j = i; j < i + k; j++) { a = Math.imul(a ^ A[j], 0x01000193); b = Math.imul(b ^ B[j], 0x5bd1e995); } H[i] = (a >>> 0) * 2097152 + (b >>> 11); }
    return H;
  };
  const co = (H, h) => { let l = 0, r = H.length - 1; while (l <= r) { const m = (l + r) >> 1; if (H[m] === h) return true; if (H[m] < h) l = m + 1; else r = m - 1; } return false; };
  const chuMot = new Map(), chuDs = new WeakMap();
  const bang = (m, k, tao) => { if (!m.has(k)) m.set(k, tao().sort()); return m.get(k); };
  return {
    co: (s, c) => { const w = c.split(" "); if (!chuMot.has(s)) chuMot.set(s, new Map()); return co(bang(chuMot.get(s), w.length, () => bam(s.split(" "), w.length)), bam(w, w.length)[0]) && s.includes(" " + c + " "); },
    loc: (ds, c) => {
      const w = c.split(" "), k = w.length;
      if (!chuDs.has(ds)) chuDs.set(ds, new Map());
      const H = bang(chuDs.get(ds), k, () => { const hs = ds.map((o) => bam(o.s.split(" "), k)), ra = new Float64Array(hs.reduce((a, h) => a + h.length, 0)); let i = 0; hs.forEach((h) => { ra.set(h, i); i += h.length; }); return ra; });
      return co(H, bam(w, k)[0]) ? ds.filter((o) => o.s.includes(" " + c + " ")) : [];
    },
  };
})();
const khongDau = nhoChuoi((s) => {
  let t = " " + boDau(String(s).normalize("NFC")) + " ";
  TU_CHUNG_.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  return t.replace(/[aeiouy]+/g, "a").replace(/\s+/g, " ").trim();
});
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const tatCa = MON.flatMap((m) => m.kho);
const chuSo = (q) => chu(q).concat(chuHinh(q));
if (SACH.length) {
  MON.forEach((m) => m.sachCo.forEach((sach) => assert.ok(SACH.some((f) => f.includes(path.join("lop-12", sach))), "OnUp-Book có " + sach)));
  const sach = new Set(), them = (t, k) => { const w = t.split(" ").filter(Boolean); for (let i = 0; i + k <= w.length; i++) sach.add(k + ":" + w.slice(i, i + k).join(" ")); };
  SACH.forEach((f) => { const t = khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")); them(t, 8); if (process.env.DO_SACH) them(t, 6); });
  const bao = (k) => tatCa.flatMap((q) => chuSo(q).flatMap((s) => chuoi(s, k).filter((c) => sach.has(k + ":" + c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  const trung = [...new Set(bao(8))];
  assert.deepEqual(trung, [], "chuỗi 8 từ trùng chữ của sách:\n" + trung.join("\n"));
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const cua = (b, q) => ({ id: b.id, s: " " + chu(q).concat(chuHinh(q), q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const khac = BANKS.filter((b) => !b.pool && !MON.some((m) => m.file === b.file)).flatMap((b) => b.questions.map((q) => cua(b, q)))
    .concat(BANKS.filter((b) => b.pool && !MON.some((m) => m.file === b.file)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => tatCa.flatMap((q) => [...new Set(chuSo(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  const trung = [...new Set(bao(8))];
  assert.deepEqual(trung, [], "chuỗi 8 từ trùng câu của kho khác:\n" + trung.join("\n"));
}
/* ---------- tự thử: bộ đọc HTML, bộ đọc hình, bộ dò lộ với mã, hình, câu cố ý viết sai ---------- */
{
  const hong = (f, msg) => assert.throws(f, Error, "tự thử không bắt được: " + msg);
  // bộ đọc HTML: cú pháp, thẻ và thuộc tính sách dạy
  hong(() => docHtml("<p>Chào <b>bạn</p></b>"), "thẻ đóng sai thứ tự");
  hong(() => docHtml("<p>Chào bạn"), "thiếu thẻ đóng");
  hong(() => docHtml("<p>Chào</p></p>"), "thẻ đóng thừa");
  hong(() => docHtml("<hr></hr>"), "thẻ rỗng có thẻ đóng");
  hong(() => docHtml("<p style=color:red>x</p>"), "giá trị thuộc tính không có ngoặc kép");
  hong(() => docHtml('<p id="a" id="b">x</p>'), "lặp thuộc tính");
  hong(() => docHtml("<P>x</P>"), "tên thẻ viết hoa");
  hong(() => docHtml("<button>Gửi</button>"), "thẻ sách không dạy");
  hong(() => docHtml('<input type="radio" name="g" checked>'), "thuộc tính sách không dạy");
  hong(() => docHtml('<p>x</p><!DOCTYPE html>'), "<!DOCTYPE html> không đứng đầu");
  assert.ok(!hopLe('<p "style"=color: blue>') && !hopLe('</p style="color: blue">') && hopLe('<p style="color: blue">') && hopLe("<dd>"), "tự thử: một thẻ mở đứng riêng");
  // chữ hiển thị, kiểu chữ, danh sách, bảng, đường dẫn
  assert.deepEqual(chuHien(docHtml("<p>Một\n  hai</p><p>ba<br>bốn</p><span>năm</span> <span>sáu</span>")), ["Một hai", "ba", "bốn", "năm sáu"], "tự thử: chữ hiển thị");
  assert.deepEqual(doanChu(docHtml("<p>a <strong>b <em>c</em></strong></p>")).map((d) => d.t + ":" + [...d.k].sort().join("")), ["a:", "b:b", "c:bi"], "tự thử: kiểu chữ");
  assert.deepEqual(dauDong(tim(docHtml('<ol type="I" start="3"><li>a</li><li>b</li></ol>'), "ol")[0]), ["III", "IV"], "tự thử: số La Mã của danh sách");
  assert.deepEqual(dauDong(tim(docHtml('<ol type="a" start="26"><li>a</li><li>b</li></ol>'), "ol")[0]), ["z", "aa"], "tự thử: chữ cái của danh sách");
  hong(() => luoiBang(tim(docHtml('<table><tr><td rowspan="2">a</td><td>b</td></tr><tr><td>c</td><td>d</td></tr></table>'), "table")[0]), "hàng của bảng thừa ô");
  hong(() => luoiBang(tim(docHtml('<table><tr><td colspan="2">a</td></tr><tr><td>b</td></tr></table>'), "table")[0]), "hàng của bảng thiếu ô");
  assert.deepEqual(["../d.html", "e/f.html", "../../g.html"].map((h) => duongDan("a/b/c.html", h)), ["a/d.html", "a/b/e/f.html", "g.html"], "tự thử: đường dẫn tương đối");
  hong(() => duongDan("c.html", "../d.html"), "đường dẫn ra ngoài thư mục gốc");
  assert.ok(!ipv4("1.2.3.256") && !ipv4("1.2.3") && ipv4("0.0.0.0"), "tự thử: địa chỉ IPv4");
  assert.equal(kieuChu("color: red, font-size: 12px"), null, "tự thử: style viết sai");
  // khung mã: lùi đầu dòng sai, chữ tràn khung
  const khung = TH.kho.find((q) => q.svg && q.svg.includes("&lt;form&gt;")).svg;
  hong(() => docKhung(khung.replace('x="28"', 'x="44"')), "khung mã lùi đầu dòng sai");
  hong(() => docKhung(khung.replace("&gt; Vẽ", "&gt; Vẽ và rất nhiều môn năng khiếu khác")), "dòng mã tràn khung");
  hong(() => docKhung(khung.replace("&lt;/form&gt;", "&lt;/from&gt;")), "khung mã có thẻ đóng sai");
  // sơ đồ ba pha: bỏ một chấm nối thì không còn nối vào dây
  const bp = CN.kho.find((q) => q.svg && q.svg.includes(">Đ1<")).svg;
  hong(() => docBaPha(bp.replace('<circle cx="140" cy="52" r="3.5" fill="ink"/>', "")), "sơ đồ ba pha thiếu chấm nối");
  assert.equal(cachNoi({ day: ["A", "B", "C"], tai: [["A", "B"], ["B", "C"], ["C", "A"]] }), "tam giác", "tự thử: nối tam giác");
  assert.equal(cachNoi({ day: ["A", "B", "C", "O"], tai: [["A", "O"], ["A", "O"], ["C", "O"]] }), "khác", "tự thử: hai tải cùng một pha");
  // mạch đèn hai công tắc: thêm chấm ở chỗ hai dây chéo nhau, bỏ tên L, gạt lưỡi của K2 lên
  const h1 = CN.kho.find((q) => q.svg && q.svg.includes("K2") && q.type === "mc").svg, h2 = CN.kho.find((q) => q.svg && q.svg.includes("K2") && q.type === "tf4").svg;
  hong(() => docHaiCongTac(h2.replace("</svg>", '<circle cx="119" cy="60" r="2.5" fill="ink"/></svg>')), "chấm ở chỗ hai dây chéo nhau");
  hong(() => docHaiCongTac(h1.replace('font-weight="700">L<', 'font-weight="700">X<')), "thiếu tên dây pha");
  hong(() => docHaiCongTac(h2.replace('<text x="104" y="88"', '<text x="110" y="88"')), "tên công tắc chạm dây");
  { const s = docHaiCongTac(h1.replace('<line x1="225" y1="110" x2="201" y2="122"', '<line x1="225" y1="110" x2="201" y2="98"'));
    assert.ok(s.vt.K1 === "duoi" && s.vt.K2 === "tren" && !s.sang(s.vt), "tự thử: gạt K2 lên thì đèn tắt"); }
  hong(() => docHaiCongTac(h1.replace('<line x1="300" y1="110" x2="300" y2="190"', '<line x1="300" y1="110" x2="300" y2="30"').replace('<line x1="30" y1="30" x2="60" y2="30"', '<line x1="30" y1="30" x2="300" y2="30"')), "chập mạch hoặc dây chạm giữa dây khác");
  // dò lộ: số ở vị trí kết quả của câu kia
  const a = { topic: "A", type: "num", q: "Tính dòng điện dây.", ans: 6.9, unit: "A", lv: 3, x: "" }, b = { topic: "B", type: "mc", q: "Ta có Id = √3 × Ip ≈ 6,9 A. Chọn ý đúng.", o: ["m", "n", "p", "r"], lv: 1, x: "" };
  const c = { topic: "B", type: "mc", q: "Với 6,9 × 2 = 13,8 thì sao?", o: ["m", "n", "p", "r"], lv: 2, x: "" };
  assert.equal(doLo([a, b], { A: [0, 0, 1], B: [1, 0, 0] }, (q) => q.topic).lo.length, 1, "tự thử: bộ dò lộ số");
  assert.equal(doLo([a, c], { A: [0, 0, 1], B: [0, 1, 0] }, (q) => q.topic).lo.length, 0, "tự thử: số đứng trước phép tính không tính");
}
MON.forEach((m) => console.log(`${m.ten} 12: kho ${m.kho.length} câu (${m.DE.length} đề cố định, ${m.pool.n} câu mỗi đề), ma trận 10 – 8 – 7 trên ${Object.keys(m.M).length} chủ đề; ` +
  `${m.kho.filter((q) => q.type === "tf4").length} câu đúng/sai 4 ý, ${m.kho.filter((q) => q.type === "num").length} câu trả lời ngắn, ${m.kho.filter((q) => q.type === "match").length} câu nối, ${m.kho.filter((q) => q.type === "order").length} câu sắp xếp, ${m.kho.filter((q) => q.type === "essay").length} câu tự luận, ${m.kho.filter((q) => q.svg).length} câu có hình; đáp án đúng dài nhất hoặc ngắn nhất ở ${m.le} câu nhiều lựa chọn.`));
console.log(n + " câu, ý, đoạn mã đã tính lại hoặc đọc lại.");
console.log("MATH OK");




