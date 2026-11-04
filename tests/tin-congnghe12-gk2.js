// Kiểm tra ngân hàng Tin học 12 và Công nghệ 12 giữa kì II của Phiên N12-gk2-tin-congnghe (data/banks/12-tin.js, data/banks/12-congnghe.js:
// mỗi môn hai đề cố định và đề ngẫu nhiên lấy câu của hai đề đó, không có câu riêng), theo mẫu tests/tin-congnghe12-ck1.js (bộ đọc HTML,
// khung mã, phần chung của các kho lớp 12) và tests/vatli-hoahoc12-gk2.js (so với kho cuối kì I cùng môn, cận dưới một phần sáu). Số đề,
// số câu lấy từ danh mục. Câu có phép tính, có hình, có đoạn mã, câu sắp xếp, câu nối, câu tự luận nhận ra bằng một đoạn chữ của đề (has:
// đúng một câu trong kho, đúng đề ghi ở id); đáp án tính bằng code (so với ans, o[0], o của câu sắp xếp, cặp nối, hoặc các ý tính được của
// câu đúng/sai 4 ý; câu tự luận so với thang chấm và bài gợi ý).
// Tin học: mọi đoạn mã HTML, CSS trong câu (trong ngoặc kép “…”, lựa chọn là một đoạn mã, hay hình “khung mã”) đọc bằng một bộ đọc HTML
// nhỏ (như kho cuối kì I, thêm thẻ style, link, thuộc tính class, rel) và một bộ đọc CSS nhỏ: đúng cú pháp (bộ chọn, ngoặc nhọn, mỗi khai
// báo “thuộc tính: giá trị;”), chỉ thuộc tính, giá trị, kiểu bộ chọn sách dạy; rồi tính kết quả hiển thị bằng một bộ áp mẫu định dạng nhỏ:
// phần tử nào khớp bộ chọn (cả bộ chọn tổ hợp, bộ chọn thuộc tính, nhiều lớp), trọng số của bộ chọn (Bảng 17.4) và thứ tự xuất hiện,
// !important, CSS trực tiếp (thứ tự ưu tiên của Bảng 17.3), kế thừa từ phần tử cha, CSS ngoài (thẻ link, @import), cỡ chữ theo em, rem, %,
// màu theo tên, rgb() bằng số hay phần trăm, mã hex, hsl() để so với đáp án; mọi hình “khung mã” đọc lại (chữ cỡ 14, lùi đầu dòng theo số
// thẻ, ngoặc nhọn đang mở, dòng vừa khung).
// Công nghệ: trị số, sai số của điện trở theo vạch màu (bảng quy ước mã màu Hình 15.3 của sách: hệ số nhân, sai số chỉ các màu có trong
// bảng), điện cảm ghi bằng mã ba chữ số, dung kháng, cảm kháng, khoảng sai số khi đo điện trở, điều kiện dẫn của diode, transistor NPN,
// cách đặt tên transistor của Nhật Bản, số chân của IC hai hàng, mạch so sánh, điện áp ra của mạch khuếch đại đảo, hệ số khuếch đại và R2
// của mạch không đảo tính lại bằng code (sách không dạy điện trở mắc nối tiếp, song song, định luật Ohm: không có câu tính các đại lượng
// đó); bốn hình kí hiệu linh kiện (tụ phân cực, transistor PNP, biến trở, khuếch đại thuật toán rút gọn) đọc lại bằng code theo quy ước
// của sách (chữ trong hình từ cỡ 13, nằm trong khung hình).
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân, dấu thanh kiểu sách “hoá”, “thuỷ”, “kĩ”, “lí”), lời dặn của đề
// (phạm vi, số câu mỗi phần tính từ ma trận, bài học khác phạm vi, đề cương của trường; không có câu về đề chung của Sở), môn và lịch thi,
// mức độ và ma trận 10 – 8 – 7 (chủ đề theo tên bài và thứ tự của sách, đối chiếu mục lục trong README của cuốn ở OnUp-Book; hai đề cố định
// chia đúng ma trận; không chủ đề nào trùng kho cuối kì I), dạng câu theo khung Công văn 7991 (mỗi kho ít nhất 6 câu đúng/sai 4 ý không lặp
// kiểu Đ/S, 1–2 câu tự luận ở ô Vận dụng rút 1 câu), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở
// không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn
// sai không cùng mở đầu bằng một chữ mà đáp án đúng không có, rút thử nhiều lần (đúng ma trận; đã làm hết một đề cố định thì không rút lại
// câu của đề đó), đề bài không trùng nhau, dò lộ đáp án giữa mọi cặp câu rút được cùng lúc và với lời dặn (đề “Ôn chủ đề” rút chung cả chủ
// đề; số ở vị trí kết quả của câu kia, cả hai vế một cặp nối, hai ô sắp xếp liền nhau: không được có; chuỗi 3 từ của đáp án bằng chữ in ra
// với DO_LO=1 để xem tay, đã xem ghi ở DA_XEM), bộ dò lộ, bộ đọc HTML, CSS, bộ đọc hình tự thử với câu, mã, hình cố ý viết sai. So với kho
// cuối kì I cùng môn: đề bài không gần trùng (cặp hai âm tiết chung, chuỗi 6 từ chung). Có sách ở ../OnUp-Book thì so mọi trường chữ với
// chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác,
// cả kho cuối kì I và câu riêng của các đề ngẫu nhiên (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 6 từ).
// Chạy: node tests/tin-congnghe12-gk2.js → in MATH OK.
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
  { ma: "tin", ten: "Tin học", sachCo: ["tin-hoc-12-tin-hoc-ung-dung", "tin-hoc-12-khoa-hoc-may-tinh"], ki: "th", pham: "Tin học: Bài 13–20",
    dau: "Sách Kết nối tri thức, Tin học 12, phần chung của hai sách Định hướng Tin học ứng dụng và Định hướng Khoa học máy tính.",
    PHAN: [["Chủ đề 4 Giải quyết vấn đề với sự trợ giúp của máy tính (Bài 13–18)", 13, 18], ["Chủ đề 5 Hướng nghiệp với tin học (Bài 19–20)", 19, 20]],
    sau: ["Trường chỉ kiểm tra phần CSS (Bài 13–18)", "Bài 21"],
    BAI: [["Khái niệm, vai trò của CSS", 13], ["Định dạng văn bản bằng CSS", 14], ["Tạo màu cho chữ và nền", 15], ["Định dạng khung", 16],
      ["Các mức ưu tiên của bộ chọn", 17], ["Dịch vụ sửa chữa và bảo trì máy tính", 19], ["Nhóm nghề quản trị trong ngành Công nghệ thông tin", 20]] },
  { ma: "congnghe", ten: "Công nghệ", sachCo: ["cong-nghe-12-cong-nghe-dien-dien-tu"], ki: "cn", pham: "Công nghệ: Công nghệ điện – điện tử Bài 13–20",
    dau: "Sách Kết nối tri thức, Công nghệ 12 – Công nghệ điện – điện tử, Phần hai Công nghệ điện tử.",
    PHAN: [["Chương V Giới thiệu chung về kĩ thuật điện tử (Bài 13–14)", 13, 14], ["Chương VI Linh kiện điện tử (Bài 15–17)", 15, 17],
      ["Chương VII Điện tử tương tự (Bài 18–20)", 18, 20]],
    sau: ["Trường học sách Công nghệ 12 – Lâm nghiệp – Thuỷ sản", "chỉ kiểm tra đến Chương VI"],
    BAI: [["Khái quát về kĩ thuật điện tử", 13], ["Ngành nghề và dịch vụ trong lĩnh vực kĩ thuật điện tử", 14], ["Điện trở, tụ điện và cuộn cảm", 15],
      ["Diode, transistor và mạch tích hợp IC", 16], ["Giới thiệu về điện tử tương tự", 18], ["Khuếch đại thuật toán", 19]] }
];
const ten = new Map();
MON.forEach((m) => {
  const pool = BANKS.find((b) => b.pool && b.id === m.ma + "12-gk2-ngau-nhien");
  assert.ok(pool, "thiếu đề ngẫu nhiên " + m.ma + "12-gk2-ngau-nhien");
  m.pool = pool; m.DE = pool.pool.from; m.M = pool.pool.matrix; m.kho = pool.questions; m.file = pool.file;
  assert.equal(m.file, "12-" + m.ma + ".js", "file câu hỏi theo mã môn");
  assert.equal(m.DE.length, 2, m.ma + ": đề ngẫu nhiên lấy câu của hai đề cố định");
  assert.deepEqual(BANKS.filter((b) => b.id.startsWith(m.ma + "12-gk2-")).map((b) => b.id).sort(), [...m.DE, pool.id].sort(), m.ma + ": kho gồm hai đề cố định và đề ngẫu nhiên");
  assert.equal(m.kho.filter((q) => q.src === pool.id).length, 0, m.ma + ": đề ngẫu nhiên không có câu riêng");
  assert.ok(pool.subject === m.ten && pool.grade === 12 && pool.minutes === 45 && pool.title === m.ten + " 12 · Giữa kì II · Đề ngẫu nhiên", pool.id + ": môn, khối, số phút, tên");
  m.DE.forEach((id, k) => {
    const b = bank(id);
    assert.equal(id, m.ma + "12-gk2-de" + (k + 1), "mã đề cố định");
    assert.ok(b.file === m.file && b.subject === m.ten && b.grade === 12 && b.minutes === pool.minutes && b.n === pool.n, id + ": cùng file, môn, khối, số phút, số câu với đề ngẫu nhiên");
    assert.equal(b.title, m.ten + " 12 · Giữa kì II · Đề " + (k + 1), id + ": tên đề");
    assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
    m.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, m.ki + (k + 1) + "#" + (i + 1)));
  });
  assert.equal(m.kho.length, sum(m.DE.map((id) => bank(id).n)), m.ma + ": kho = câu của hai đề cố định");
  // kho cuối kì I cùng môn (để so: không có câu ôn, đề bài không gần trùng)
  const ck1 = BANKS.find((b) => b.pool && b.id === m.ma + "12-ck1-ngau-nhien");
  assert.ok(ck1 && ck1.file === m.file, m.ma + ": có kho cuối kì I cùng file");
  m.ck1 = ck1.questions;
  m.ck1.forEach((q) => ten.set(q, "ck1-" + m.ki + (ck1.pool.from.indexOf(q.src) + 1) + "#" + (bank(q.src).questions.indexOf(bank(q.src).questions.find((p) => p.q === q.q)) + 1)));
});
const [TH, CN] = MON;
// môn đúng chữ của lịch thi (MON_THPT), sáu mã đề gắn vào kì thi giữa kì II lớp 12, phạm vi của kì thi ghi đúng số bài
{
  const lich = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
  const mon = /const MON_THPT = \[([^\]]*)\]/.exec(lich);
  MON.forEach((m) => assert.ok(mon && mon[1].includes('"' + m.ten + '"'), "môn " + m.ten + " có trong MON_THPT"));
  const c = vm.createContext({ window: {} }); vm.runInContext(lich, c);
  const ev = c.window.ONTAP_SEED_EVENTS.find((e) => e.id === "gk2-l12");
  assert.ok(ev && ev.grades.includes(12), "có kì thi gk2-l12");
  MON.forEach((m) => {
    [...m.DE, m.pool.id].forEach((id) => assert.ok(ev.banks.includes(id), id + " gắn vào gk2-l12"));
    assert.ok(ev.scope.includes(m.pham), "phạm vi của gk2-l12 ghi " + m.pham);
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

/* ---------- bộ đọc HTML (Tin học Bài 7–12; chép từ tests/tin-congnghe12-ck1.js, thêm thẻ style, link, thuộc tính class, rel) ----------
   docHtml(mã): đọc một đoạn mã HTML thành cây { tag, at, kids } (chữ là { text }). Kiểm tra cú pháp như sách: tên thẻ, thuộc tính chữ
   thường; thẻ mở – thẻ đóng lồng đúng thứ tự; thẻ rỗng (RONG) không có thẻ đóng; giá trị thuộc tính trong ngoặc kép, không lặp thuộc
   tính; thuộc tính không có giá trị chỉ là các thuộc tính bật, tắt (BAT_TAT); chỉ dùng thẻ, thuộc tính sách dạy (THE, THUOC_TINH). */
const RONG = new Set(["br", "hr", "img", "input", "meta", "source", "link"]);
const THE = new Set(["html", "head", "title", "meta", "link", "style", "body", "h1", "h2", "h3", "h4", "h5", "h6", "p", "br", "hr", "b", "strong", "i", "em", "u",
  "sub", "sup", "mark", "del", "small", "div", "span", "ol", "ul", "li", "dl", "dt", "dd", "table", "caption", "tr", "th", "td", "a", "img",
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
   hsl(H, S%, L%) → [r, g, b]. Độ dài: px; cỡ chữ thêm em, rem, % (Bài 14). */
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
  else if (tt === "font-size") assert.ok(/^\d+(?:\.\d+)?(?:px|em|rem|%)$/.test(v), "font-size viết sai: “" + v + "”");
  else if (tt === "font-weight") assert.ok(["normal", "bold"].includes(v) || /^[1-9]00$/.test(v), "font-weight: “" + v + "”");
  else if (tt === "text-align") assert.ok(["left", "right", "center", "justify"].includes(v), "text-align: “" + v + "”");
  else if (tt === "text-decoration") assert.ok(["none", "underline", "overline", "line-through"].includes(v), "text-decoration: “" + v + "”");
  else if (tt === "display") assert.ok(["block", "inline", "none"].includes(v), "display (sách: block, inline, none): “" + v + "”");
};

/* ---------- áp mẫu định dạng lên trang ---------- */
const ganCha = (n, cha = null) => { n.cha = cha; (n.kids || []).forEach((k) => k.tag && ganCha(k, n)); return n; };
const anhTruoc = (el) => { if (!el.cha) return []; const k = el.cha.kids.filter((x) => x.tag); return k.slice(0, k.indexOf(el)); };
const khopDon = (el, d, gia) => el && el.tag && el.tag !== "#" && (d.the === "*" || d.the === el.tag) &&
  d.lop.every((l) => String(el.at.class || "").split(/\s+/).includes(l)) && d.id.every((i) => el.at.id === i) &&
  d.tt.every(([a, v]) => el.at[a] !== undefined && (v === undefined || el.at[a] === v)) &&
  d.gia.every((g) => (gia || []).includes(g));
// gia: các lớp giả đang xảy ra với phần tử (ví dụ ["hover"] khi di chuột lên); phần tử giả không khớp phần tử nào của cây
const khop = (el, c, gia) => {
  const don = c.don, noi = c.noi;
  const tu = (e, i) => { if (!khopDon(e, don[i], i === don.length - 1 ? gia : [])) return false; if (i === 0) return true;
    const n = noi[i - 1];
    if (n === ">") return tu(e.cha, i - 1);
    if (n === "+") { const a = anhTruoc(e); return a.length > 0 && tu(a[a.length - 1], i - 1); }
    if (n === "~") return anhTruoc(e).some((a) => tu(a, i - 1));
    for (let a = e.cha; a && a.tag !== "#"; a = a.cha) if (tu(a, i - 1)) return true; return false; };
  return !don[don.length - 1].pt.length && tu(el, don.length - 1);
};
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
    if (KE_THUA.has(tt) && el.cha && el.cha.tag && el.cha.tag !== "#") return kieu(el.cha, tt);
    return undefined;
  };
  return { kieu, mau };
};
// cỡ chữ (px) của một phần tử: % theo cỡ chữ của phần tử cha, rem theo phần tử gốc html (Bài 14); không định dạng thì kế thừa, gốc 16px;
// em sách định nghĩa theo cỡ chữ của trình duyệt nên chỉ dùng khi phần tử cha có cỡ mặc định (16px); h1–h6 có cỡ riêng của trình duyệt: không hỏi
const coChu = (ap, el) => {
  const tu = (e) => {
    if (!e || !e.tag || e.tag === "#") return 16;
    const v = ap.kieu(e, "font-size");
    const own = (() => { if (!e.at) return undefined; const r = ap.mau.some((x) => x.chon.some((c) => khop(e, c) && x.kb.some((k) => k[0] === "font-size"))); return r || (e.at.style && /font-size/.test(e.at.style)); })();
    if (!own) return tu(e.cha);
    const m = /^(\d+(?:\.\d+)?)(px|em|rem|%)$/.exec(v);
    if (m[2] === "px") return +m[1];
    if (m[2] === "em") return +m[1] * tu(e.cha);
    if (m[2] === "%") return (+m[1] / 100) * tu(e.cha);
    let h = e; while (h.cha && h.cha.tag !== "#") h = h.cha; return +m[1] * (h === e ? 16 : tu(h));
  };
  return tu(el);
};

/* ---------- Công nghệ: điện trở, tụ điện, cuộn cảm (Bài 15) ----------
   Vạch màu theo Hình 15.3 của sách: điện trở 4 vạch: vạch 1, 2 là hai chữ số, vạch 3 là hệ số nhân, vạch 4 là sai số; 5 vạch: ba chữ số, hệ
   số nhân, sai số. MAU_SO: màu → chữ số; MAU_MU: màu → số mũ của hệ số nhân (bảng của sách chỉ có nâu đến xanh lam, nhũ vàng 0,1, bạc 0,01;
   ô hệ số nhân của màu đen in “0”, tím, xám, trắng để trống: không dùng); MAU_SAI: màu → sai số (%) (bảng chỉ có nâu, đỏ, nhũ vàng, bạc). */
const MAU_SO = { "đen": 0, "nâu": 1, "đỏ": 2, "cam": 3, "vàng": 4, "xanh lục": 5, "xanh lam": 6, "tím": 7, "xám": 8, "trắng": 9 };
const MAU_MU = { "nâu": 1, "đỏ": 2, "cam": 3, "vàng": 4, "xanh lục": 5, "xanh lam": 6, "nhũ vàng": -1, "bạc": -2 };
const MAU_SAI = { "nâu": 1, "đỏ": 2, "nhũ vàng": 5, "bạc": 10 };
// vòng màu → { R (Ω), sai (%) }; vm: mảng tên màu theo thứ tự từ trái sang phải
const docVongMau = (vm) => {
  assert.ok(vm.length === 4 || vm.length === 5, "điện trở 4 hoặc 5 vạch màu: " + vm.join(", "));
  const so = vm.slice(0, vm.length - 2), mu = vm[vm.length - 2], sai = vm[vm.length - 1];
  so.forEach((c) => assert.ok(c in MAU_SO, "màu chữ số: " + c)); assert.ok(MAU_SO[so[0]] > 0, "vạch đầu không là màu đen");
  assert.ok(mu in MAU_MU, "màu hệ số nhân theo bảng của sách: " + mu); assert.ok(sai in MAU_SAI, "màu sai số theo bảng của sách: " + sai);
  const n = +so.map((c) => MAU_SO[c]).join("");
  return { R: Math.round(n * 10 ** MAU_MU[mu] * 1e6) / 1e6, sai: MAU_SAI[sai] };
};
// trị số viết như sách: 4 700 Ω → "4,7 kΩ"; 220 Ω → "220 Ω"; 1 000 000 Ω → "1 MΩ"
const triSo = (R) => (R >= 1e6 ? vn(R / 1e6) + " MΩ" : R >= 1e3 ? vn(R / 1e3) + " kΩ" : vn(R) + " Ω");
// dung kháng X_C = 1 : (2πfC), cảm kháng X_L = 2πfL (sách không dạy điện trở, tụ, cuộn cảm mắc nối tiếp, song song, định luật Ohm, P = UI)
const dungKhang = (f, C) => 1 / (2 * Math.PI * f * C);
const camKhang = (f, L) => 2 * Math.PI * f * L;

/* ---------- Công nghệ: khuếch đại thuật toán (Bài 19) ----------
   Mạch khuếch đại đảo: U_ra = −(R2 : R1) × U_vào; mạch khuếch đại không đảo: G = 1 + R2 : R1 (R1 nối lối vào đảo xuống đất, R2 nối từ lối
   ra về lối vào đảo). */
const daoK = (R1, R2) => -R2 / R1;
const khongDaoK = (R1, R2) => 1 + R2 / R1;

/* ---------- Tin học: đoạn mã trong câu ----------
   maTrong(chuỗi): các đoạn mã của một chuỗi chữ: đoạn trong ngoặc kép “…” có thẻ HTML, có mẫu định dạng CSS (ngoặc nhọn) hay là các quy
   định “thuộc tính: giá trị;”; hoặc cả chuỗi khi chuỗi là một đoạn mã (lựa chọn là thẻ HTML, mẫu định dạng, quy định). docDoan(mã) đọc
   đoạn mã: HTML thì đọc thẻ, rồi đọc mã CSS trong thẻ style và trong thuộc tính style; mẫu định dạng thì đọc bằng docCss; quy định thì đọc
   bằng docKhaiBao. */
const laQuyDinh = (s) => /^\s*[a-z-]+\s*:\s*[^:;{}<>“”]+;(\s*[a-z-]+\s*:\s*[^:;{}<>“”]+;)*\s*$/.test(s);
const laKhoiCss = (s) => /^\s*[^{}<>“”]+\{[^{}<>“”]*\}\s*$/.test(s);
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
const MAU_VIET = { "đỏ": "red", "xanh lá": "green", "xanh dương": "blue", "xanh lam": "blue", "xám": "gray", "cam": "orange", "vàng": "yellow", "đen": "black", "trắng": "white", "navy": "navy", "teal": "teal", "tím": "purple" };
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

/* ---------- Công nghệ: hình kí hiệu linh kiện ----------
   Mọi chữ trong hình cỡ từ 13, nằm trong khung hình. docTu: kí hiệu tụ điện (tụ phân cực: một bản là hình chữ nhật hẹp rỗng có dấu +,
   bản kia là một vạch thẳng có dấu −; hai dây nối nằm ngang). docTransistor: vòng tròn, cực B là đường ngang vào một vạch đứng, hai đường
   xiên từ vạch đứng ra cực C (trên), E (dưới); mũi tên (tam giác) nằm trên một đường xiên, đó là cực E; mũi tên hướng vào vạch đứng là PNP,
   hướng ra là NPN. docOpAmp: tam giác đỉnh hướng sang phải, hai lối vào ở cạnh trái có dấu −, +, lối ra ở đỉnh. docBienTro: hình chữ nhật
   nằm ngang có dây nối hai đầu, mũi tên từ trên chỉ thẳng xuống chạm giữa cạnh trên. */
const khungHinh = (svg) => { const W = svgRong(svg), H = svgCao(svg);
  texts(svg).forEach((t) => { const c = +t["font-size"]; assert.ok(c >= 13, "chữ trong hình cỡ từ 13: " + t.t); const w = rong(t), a = t["text-anchor"], x0 = a === "middle" ? num(t, "x") - w / 2 : num(t, "x");
    assert.ok(x0 >= 0 && x0 + w <= W && num(t, "y") - 0.75 * c >= 0 && num(t, "y") <= H, "chữ “" + t.t + "” nằm trong khung hình"); }); };
const doc = (svg) => ({ L: tags(svg, "line").map((l) => ({ x1: num(l, "x1"), y1: num(l, "y1"), x2: num(l, "x2"), y2: num(l, "y2"), w: +(l["stroke-width"] || 1) })),
  R: tags(svg, "rect"), C: tags(svg, "circle"), P: tags(svg, "polygon").map((p) => p.points.trim().split(/\s+/).map((xy) => xy.split(",").map(Number))), T: texts(svg) });
const docTu = (svg) => {
  khungHinh(svg); const h = doc(svg);
  assert.ok(h.R.length === 1 && h.C.length === 0 && h.P.length === 0, "tụ phân cực: một hình chữ nhật");
  const r = h.R[0], rx = num(r, "x"), ry = num(r, "y"), rw = num(r, "width"), rh = num(r, "height");
  assert.ok(rw * 3 <= rh && r.fill === "none", "bản cực hình chữ nhật hẹp, rỗng");
  const dung = h.L.filter((l) => l.x1 === l.x2), ngang = h.L.filter((l) => l.y1 === l.y2);
  assert.ok(dung.length === 1 && ngang.length === 2 && h.L.length === 3, "một vạch đứng (bản cực kia), hai dây nối nằm ngang");
  const v = dung[0], gx = v.x1 - (rx + rw);
  assert.ok(gx > 4 && gx < 30 && Math.min(v.y1, v.y2) === ry && Math.max(v.y1, v.y2) === ry + rh, "vạch đứng song song, dài bằng bản hình chữ nhật, đặt sát bên phải");
  const yGiua = ry + rh / 2;
  assert.ok(ngang.every((l) => l.y1 === yGiua) && ngang.some((l) => Math.max(l.x1, l.x2) === rx) && ngang.some((l) => Math.min(l.x1, l.x2) === v.x1), "dây nối vào giữa hai bản cực");
  const cong = h.T.filter((t) => t.t === "+"), tru = h.T.filter((t) => t.t === "−");
  assert.ok(cong.length === 1 && tru.length === 1 && h.T.length === 2, "có đúng một dấu + và một dấu −");
  assert.ok(Math.abs(num(cong[0], "x") - (rx + rw / 2)) < Math.abs(num(cong[0], "x") - v.x1) && Math.abs(num(tru[0], "x") - v.x1) < Math.abs(num(tru[0], "x") - (rx + rw / 2)), "dấu + cạnh bản hình chữ nhật, dấu − cạnh vạch thẳng");
  daDoc.add(svg); return "Tụ phân cực (tụ hoá)";
};
const docTransistor = (svg) => {
  khungHinh(svg); const h = doc(svg);
  assert.ok(h.C.length === 1 && h.P.length === 1 && h.P[0].length === 3, "transistor: một vòng tròn, một mũi tên");
  const vach = h.L.filter((l) => l.x1 === l.x2 && l.w >= 3); assert.equal(vach.length, 1, "một vạch đứng đậm");
  const bx = vach[0].x1, B = h.L.find((l) => l.y1 === l.y2 && Math.max(l.x1, l.x2) === bx); assert.ok(B, "cực B: đường ngang chạm vạch đứng");
  const xien = h.L.filter((l) => l.x1 === bx && l.y1 !== l.y2 && l.x2 !== l.x1); assert.equal(xien.length, 2, "hai đường xiên từ vạch đứng");
  const kc = (p, l) => { const dx = l.x2 - l.x1, dy = l.y2 - l.y1; return Math.abs(dy * (p[0] - l.x1) - dx * (p[1] - l.y1)) / Math.hypot(dx, dy); };
  const tam = h.P[0], E = xien.find((l) => tam.every((p) => kc(p, l) < 8)); assert.ok(E, "mũi tên nằm trên một đường xiên (cực E)");
  const C = xien.find((l) => l !== E), tren = (l) => l.y2 < l.y1;
  assert.ok(tren(C) && !tren(E), "cực C ở trên, cực E ở dưới");
  const dinh = tam.reduce((a, p) => (kc(p, E) < kc(a, E) ? p : a)), day = tam.filter((p) => p !== dinh), giua = [(day[0][0] + day[1][0]) / 2, (day[0][1] + day[1][1]) / 2];
  assert.ok(kc(dinh, E) < 1 && Math.abs(kc(day[0], E) - kc(day[1], E)) < 1, "mũi tên cân, đỉnh nằm trên đường E");
  const xa = (p) => Math.hypot(p[0] - E.x1, p[1] - E.y1), loai = xa(dinh) < xa(giua) ? "PNP" : "NPN";
  // đỉnh mũi tên nằm giữa hai đầu đoạn E
  const tE = ((dinh[0] - E.x1) * (E.x2 - E.x1) + (dinh[1] - E.y1) * (E.y2 - E.y1)) / ((E.x2 - E.x1) ** 2 + (E.y2 - E.y1) ** 2); assert.ok(tE > 0.1 && tE < 0.9, "mũi tên nằm trên đoạn E");
  const nhan = (t) => { const r = h.T.filter((x) => x.t === t); assert.equal(r.length, 1, "nhãn " + t); return r[0]; }, cy = (vach[0].y1 + vach[0].y2) / 2;
  assert.ok(h.T.length === 3 && num(nhan("B"), "x") < bx && num(nhan("C"), "x") > bx && num(nhan("E"), "x") > bx && num(nhan("C"), "y") < cy && num(nhan("E"), "y") > cy, "nhãn B bên trái, C trên, E dưới");
  daDoc.add(svg); return loai;
};
const docOpAmp = (svg) => {
  khungHinh(svg); const h = doc(svg);
  assert.ok(h.P.length === 1 && h.P[0].length === 3 && h.R.length === 0 && h.C.length === 0, "khuếch đại thuật toán: một tam giác");
  const P = h.P[0].slice().sort((a, b) => a[0] - b[0]), trai = P.slice(0, 2), dinh = P[2];
  assert.ok(trai[0][0] === trai[1][0] && dinh[1] === (trai[0][1] + trai[1][1]) / 2 && dinh[0] > trai[0][0], "tam giác đỉnh hướng sang phải");
  const xL = trai[0][0], vao = h.L.filter((l) => l.y1 === l.y2 && Math.max(l.x1, l.x2) === xL), ra = h.L.filter((l) => l.y1 === l.y2 && Math.min(l.x1, l.x2) === dinh[0] && l.y1 === dinh[1]);
  assert.ok(vao.length === 2 && ra.length === 1 && h.L.length === 3, "hai lối vào ở cạnh trái, một lối ra ở đỉnh");
  const dau = (t) => { const r = h.T.filter((x) => x.t === t); assert.equal(r.length, 1, "dấu " + t); const l = vao.find((v) => Math.abs(num(r[0], "y") - 6 - v.y1) <= 4);
    assert.ok(l && num(r[0], "x") > xL && num(r[0], "x") < xL + 25, "dấu " + t + " đặt ngay trong tam giác, cạnh một lối vào"); return l; };
  const tru = dau("−"), cong = dau("+"); assert.ok(tru !== cong, "hai dấu ở hai lối vào khác nhau");
  daDoc.add(svg); return { tru: tru.y1 < cong.y1 ? "trên" : "dưới" };
};
const docBienTro = (svg) => {
  khungHinh(svg); const h = doc(svg);
  assert.ok(h.R.length === 1 && h.P.length === 1 && h.C.length === 0 && h.T.length === 0, "biến trở: một hình chữ nhật, một mũi tên");
  const r = h.R[0], rx = num(r, "x"), ry = num(r, "y"), rw = num(r, "width"), rh = num(r, "height");
  assert.ok(rw > 2 * rh && r.fill === "none", "hình chữ nhật nằm ngang, rỗng");
  const day = h.L.filter((l) => l.y1 === l.y2 && l.y1 === ry + rh / 2); assert.ok(day.some((l) => Math.max(l.x1, l.x2) === rx) && day.some((l) => Math.min(l.x1, l.x2) === rx + rw), "dây nối hai đầu");
  const can = h.L.filter((l) => l.x1 === l.x2); assert.equal(can.length, 1, "một cán mũi tên thẳng đứng");
  const tam = h.P[0], dinh = tam.reduce((a, p) => (p[1] > a[1] ? p : a));
  assert.ok(can[0].x1 === rx + rw / 2 && dinh[0] === rx + rw / 2 && dinh[1] === ry && Math.max(can[0].y1, can[0].y2) === Math.min(...tam.map((p) => p[1])), "mũi tên từ trên chỉ thẳng xuống, chạm giữa cạnh trên");
  daDoc.add(svg); return "Biến trở";
};
// số đọc từ chữ: "4,7 kΩ" → 4 700; "15 mH" → 0,015; "47 µF" → 47·10⁻⁶
const HE = { k: 1e3, M: 1e6, m: 1e-3, "µ": 1e-6, p: 1e-12, "": 1 };
const doLuong = (s, dv) => { const m = new RegExp("(" + NUM + ") ?(k|M|m|µ|p)?" + dv + "(?![\\p{L}])", "u").exec(s); assert.ok(m, "không thấy số đo " + dv + " trong: " + String(s).slice(0, 60)); return val(m[1]) * HE[m[2] || ""]; };
const mauCua = (s) => s.split(",").map((x) => x.trim().toLowerCase().replace(/\.$/, ""));

/* ---------- câu có phép tính, có hình, có đoạn mã, câu sắp xếp, câu nối, câu tự luận ----------
   id: th1, th2 (Tin học Đề 1, 2), cn1, cn2 (Công nghệ Đề 1, 2); has: đoạn chữ của đề, đúng một câu trong kho. */
const motLuaChon = (q, ok) => { const c = q.o.filter(ok); assert.equal(c.length, 1, "đúng một lựa chọn đáp ứng yêu cầu, có " + c.length); return c[0]; };
const CHECKS = [
  /* ===== Tin học, Đề 1 ===== */
  // Bài 13: phần trong ngoặc là một quy định của mẫu
  { id: "th1", has: "phần “color: navy;” được gọi là gì", right: (q) => { const [ma, qd] = maTrong(q.q); const r = docCss(ma)[0], k = docKhaiBao(qd, "quy định")[0];
    assert.ok(r.kb.some((x) => x[0] === k[0] && x[1] === k[1]), "phần được hỏi là một quy định của mẫu"); assert.ok(/quy định/.test(q.o[0]) && !q.o.slice(1).some((o) => /quy định/.test(o))); return q.o[0]; } },
  // Bài 13: ba cách thiết lập CSS
  { id: "th1", has: "Mỗi ý sau về các cách đưa mẫu định dạng CSS vào trang web", right: (q) => {
    // b) đoạn mã dùng thuộc tính style của thẻ (CSS nội tuyến) mà ý gọi là CSS trong; c) bộ chọn nhiều thẻ ngăn bằng dấu phẩy
    y(q.o[1], /là cách thiết lập CSS trong\.$/); const p = tim(docDoan(maTrong(q.o[1])[0]), "p")[0];
    const c = docCss(y(q.o[2], /^Bộ chọn “(.+?)” áp dụng mẫu định dạng cho cả các thẻ h2 và các thẻ h4\.$/)[1] + " {color: red;}")[0].chon.map((x) => x.s);
    return [null, p.at.style === undefined, c.length === 2 && c.includes("h2") && c.includes("h4"), null]; } },
  // Bài 14: căn đều hai bên
  { id: "th1", has: "căn đều hai bên lề", right: (q) => motLuaChon(q, (o) => { const k = docKhaiBao(o, "lựa chọn"); return k.length === 1 && k[0][0] === "text-align" && k[0][1] === "justify"; }) },
  // Bài 14: cỡ chữ theo % của phần tử cha, phần tử cha kế thừa từ html
  { id: "th1", has: "Chữ “chưa gồm phí gửi xe” có cỡ bao nhiêu pixel", right: (q) => { const m = maTrong(q.q); const g = trang(m[0] + " " + m[1], m[2]);
    return coChu(apCss(g), theoChu(g, "chưa gồm phí gửi xe")); } },
  // Bài 14: chọn mẫu đúng yêu cầu (phông đều nhau, đậm, thụt 30px)
  { id: "th1", has: "Đoạn văn có class=\"trich-dan\" cần", right: (q) => motLuaChon(q, (o) => { const g = trang(o, '<p class="trich-dan">Trích dẫn</p>'), ap = apCss(g), p = tim(g, "p")[0];
    return loaiPhong(ap.kieu(p, "font-family") || "") === "monospace" && ap.kieu(p, "font-weight") === "bold" && ap.kieu(p, "text-indent") === "30px"; }) },
  // Bài 15: đổi rgb() sang mã hex
  { id: "th1", has: "cùng một màu với “rgb(70, 130, 180)”", right: (q) => { const c = docMau(y(q.q, /“(rgb\([^”]+\))”/)[1]); q.o.slice(1).forEach((o) => assert.ok(!cungMau(o, hex(c)), "lựa chọn sai khác màu"));
    return hex(c); } },
  // Bài 15: bộ chọn tổ hợp (con cháu, cha con, anh em liền kề, anh em)
  { id: "th1", has: "Cho đoạn mã HTML trong hình. Mỗi ý sau đúng hay sai?", right: (q) => { const g = trangMa(docKhung(q.svg));
    return q.o.map((s) => { const m = y(s, /^Mẫu “(.+?) \{color: green;\}” áp dụng cho chữ “(.+?)”\.$/); const el = theoChu(g, m[2]);
      return khop(el, docChon(m[1])); }); } },
  // Bài 15: rgb() theo phần trăm của 255
  { id: "th1", has: "Màu “rgb(20%, 60%, 100%)”", right: (q) => docMau(y(q.q, /“(rgb\([^”]+\))”/)[1])[1] },
  // Bài 16: kiểu đường viền
  { id: "th1", has: "Nối mỗi giá trị của border-style", right: (q) => { const Y = { solid: "một nét liền", dotted: "các chấm nhỏ", dashed: "các đoạn gạch ngắn", double: "hai nét song song" };
    q.l.forEach((l) => assert.ok(KIEU_VIEN.has(l))); assert.ok(q.r.slice(q.l.length).every((r) => r.endsWith(Y.double)), "ô thừa là double");
    return q.l.map((l) => [l, q.r.find((r) => r.endsWith(Y[l]))]); } },
  // Bài 16: bộ chọn lớp, nhiều lớp, thẻ có lớp, id
  { id: "th1", has: "Mỗi ý sau về chữ hiển thị trên trình duyệt đúng hay sai?", right: (q) => { const g = trangMa(docKhung(q.svg)), ap = apCss(g);
    return q.o.map((s) => { let m;
      if ((m = /^Chữ “(.+?)” màu (.+?) và in đậm\.$/.exec(s))) { const e = theoChu(g, m[1]); return cungMau(ap.kieu(e, "color"), MAU_VIET[m[2]]) && ap.kieu(e, "font-weight") === "bold"; }
      if ((m = /^Chữ “(.+?)” màu (.+?)\.$/.exec(s))) return cungMau(ap.kieu(theoChu(g, m[1]), "color"), MAU_VIET[m[2]]);
      m = y(s, /^Chữ “(.+?)” in đậm\.$/); return ap.kieu(theoChu(g, m[1]), "font-weight") === "bold"; }); } },
  // Bài 16: bộ chọn thuộc tính
  { id: "th1", has: "Muốn chỉ hai ô nhập chữ có viền liền màu xanh lam", right: (q) => { const o = maTrong(q.q).slice(0, 3);
    return motLuaChon(q, (r) => { const g = trang(r, o.join("")), ap = apCss(g), vien = tim(g, "input").map((e) => ap.kieu(e, "border"));
      return vien.map((v, i) => !!v === (tim(g, "input")[i].at.type === "text")).every(Boolean) && vien.filter(Boolean).every((v) => { const d = docVien(v); return d.kieu === "solid" && cungMau(hex(d.mau), "blue"); }); }); } },
  // Bài 16: id riêng cho một phần tử
  { id: "th1", has: "Bạn muốn riêng khung thứ hai có nền vàng", right: (q) => motLuaChon(q, (o) => {
    const ids = /Thêm id="bt2" cho khung thứ hai/.test(o) ? ["", "bt2", ""] : /Đặt id="bang-tin" cho cả ba khung/.test(o) ? ["bang-tin", "bang-tin", "bang-tin"] : ["", "", ""];
    if (new Set(ids.filter(Boolean)).size < ids.filter(Boolean).length) return false; // id phải duy nhất
    const g = trang(maTrong(o).filter(laKhoiCss).join(" "), ids.map((i) => '<div class="bang-tin"' + (i ? ' id="' + i + '"' : "") + ">Tin</div>").join("")), ap = apCss(g);
    return tim(g, "div").map((e) => !!ap.kieu(e, "background-color") && cungMau(ap.kieu(e, "background-color"), "yellow")).join() === "false,true,false"; }) },
  // Bài 17: trọng số
  { id: "th1", has: "bộ chọn “ul#menu li.moi > a” có trọng số", right: (q) => { coX(q, "100", "10"); return docChon(y(q.q, /bộ chọn “(.+?)”/)[1]).ts; } },
  // Bài 17: trọng số và thứ tự cuối cùng
  { id: "th1", has: "Cho đoạn mã trong hình. Mỗi ý sau đúng hay sai?", right: (q) => { const ma = docKhung(q.svg), g = trangMa(ma), ap = apCss(g);
    return q.o.map((s) => { let m;
      if ((m = /^Chữ “(.+?)” có màu (.+?)\.$/.exec(s))) return cungMau(ap.kieu(theoChu(g, m[1]), "color"), MAU_VIET[m[2]]);
      m = y(s, /^Nếu đổi chỗ hai mẫu cuối \(mẫu span viết sau cùng\) thì chữ “(.+?)” vẫn có màu (.+?)\.$/);
      const doi = ma.replace("span { color: orange; }\np span { color: blue; }", "p span { color: blue; }\nspan { color: orange; }"); assert.notEqual(doi, ma);
      const g2 = trangMa(doi); return cungMau(apCss(g2).kieu(theoChu(g2, m[1]), "color"), MAU_VIET[m[2]]); }); } },
  // Bài 17: thêm mẫu có trọng số lớn hơn
  { id: "th1", has: "Trang có mẫu “#tin-moi p {color: gray;}”", right: (q) => motLuaChon(q, (o) => { const g = trang(maTrong(q.q)[0] + " " + o, '<div id="tin-moi"><p class="noi-bat">Tin</p><p>Khác</p></div>'), ap = apCss(g), p = tim(g, "p");
    return cungMau(ap.kieu(p[0], "color"), "red") && cungMau(ap.kieu(p[1], "color"), "gray"); }) },
  // Bài 19: tự luận, kế hoạch xử lí sự cố
  { id: "th1", has: "Phòng tin học của trường có 30 máy tính", essay: (q) => { coThang(q, "phần mềm", "phần cứng", "hỗ trợ người dùng", "định kì"); coX(q, "Bài gợi ý:", "mã độc", "card màn hình"); } },

  /* ===== Tin học, Đề 2 ===== */
  // Bài 13: lệnh @import trong phần tử style
  { id: "th2", has: "Ngoài thẻ link, cách nào dưới đây", right: (q) => motLuaChon(q, (o) => { if (!hopLe(o)) return false; const g = docDoan(o), st = tim(g, "style");
    return st.length === 1 && docCss(st[0].kids.map((x) => x.text || "").join("")).nhap.join() === "mau-chung.css"; }) },
  // Bài 13: tự luận, tệp CSS ngoài và dòng mã kết nối
  { id: "th2", has: "nội dung tệp “ban-tin.css”", essay: (q) => { coThang(q, "color: blue;", "text-align: center;", "text-indent: 20px;", "href=\"ban-tin.css\"", "rel=\"stylesheet\"");
    const [h1, p, link] = maTrong(q.x); const css = h1 + " " + p, g = docHtml('<html><head><link href="ban-tin.css" rel="stylesheet"></head><body><h1>Tin</h1><p>Bài</p></body></html>');
    const ap = apCss(g, { "ban-tin.css": css }), H = tim(g, "h1")[0], P = tim(g, "p")[0];
    assert.ok(cungMau(ap.kieu(H, "color"), "blue") && ap.kieu(H, "text-align") === "center" && loaiPhong(ap.kieu(P, "font-family")) === "sans-serif" && ap.kieu(P, "text-indent") === "20px", "bài gợi ý đúng yêu cầu");
    const l = tim(docDoan(link), "link")[0]; assert.ok(l && l.at.href === "ban-tin.css" && l.at.rel === "stylesheet", "bài gợi ý có thẻ link đúng"); } },
  // Bài 14: gạch giữa dòng chữ
  { id: "th2", has: "đường kẻ ngang ở giữa dòng chữ", right: (q) => motLuaChon(q, (o) => { const k = docKhaiBao(o, "lựa chọn"); return k[0][0] === "text-decoration" && k[0][1] === "line-through"; }) },
  // Bài 14: kế thừa, thứ tự cuối cùng
  { id: "th2", has: "Mỗi ý sau về trang hiển thị trên trình duyệt đúng hay sai?", right: (q) => { const g = trangMa(docKhung(q.svg)), ap = apCss(g), h1 = tim(g, "h1")[0], p = tim(g, "p")[0];
    return q.o.map((s) => { let m;
      if (s === "Tiêu đề h1 được căn giữa.") return ap.kieu(h1, "text-align") === "center";
      if ((m = /^Chữ “(.+?)” có màu (.+?)\.$/.exec(s))) return cungMau(ap.kieu(theoChu(g, m[1]), "color"), m[2]);
      if ((m = /^Tiêu đề h1 có màu (.+?)\.$/.exec(s))) return cungMau(ap.kieu(h1, "color"), m[1]);
      y(s, /^Chữ của đoạn văn dùng phông chữ không chân\.$/); return loaiPhong(ap.kieu(p, "font-family")) === "sans-serif"; }); } },
  // Bài 14: rem theo phần tử gốc, % theo phần tử cha
  { id: "th2", has: "Chữ “(cập nhật)” có cỡ bao nhiêu pixel", right: (q) => { const m = maTrong(q.q); const g = trang(m.slice(0, 3).join(" "), "<h2>Tin " + m[3] + "</h2>");
    return coChu(apCss(g), theoChu(g, "(cập nhật)")); } },
  // Bài 15: số màu của hệ RGB
  { id: "th2", has: "Hệ màu này có tất cả bao nhiêu màu", right: () => vn(256 ** 3) },
  // Bài 15: hsl có độ bão hoà 0%
  { id: "th2", has: "Màu “hsl(0, 0%, 50%)”", right: (q) => tenMau(y(q.q, /“(hsl\([^”]+\))”/)[1]) },
  // Bài 15: các cách viết màu
  { id: "th2", has: "Mỗi ý sau về các cách viết màu trong CSS", right: (q) => q.o.map((s) => { let m;
    if ((m = /^Trong màu “(.+?)”, thành phần xanh lá bằng (\d+)\.$/.exec(s))) return docMau(m[1])[1] === +m[2];
    if ((m = /^Màu “(.+?)” là màu đỏ tươi\.$/.exec(s))) return cungMau(m[1], "red");
    if ((m = /^“(.+?)” và “(.+?)” cùng là màu đỏ\.$/.exec(s))) return cungMau(m[1], "red") && cungMau(m[2], "red");
    m = y(s, /^“(.+?)” và “(.+?)” cùng một màu\.$/); return cungMau(m[1], m[2]); }) },
  // Bài 15: màu chữ, màu nền
  { id: "th2", has: "chữ màu vàng trên nền đen", right: (q) => motLuaChon(q, (o) => { const g = trang(o, "<table><tr><th>Môn</th></tr></table>"), ap = apCss(g), th = tim(g, "th")[0];
    return cungMau(ap.kieu(th, "color"), "yellow") && cungMau(ap.kieu(th, "background-color"), "black"); }) },
  // Bài 16: phần tử khối theo Bảng 16.1
  { id: "th2", has: "mặc định tạo phần tử khối", right: (q) => { q.o.slice(1).forEach((o) => assert.ok(NOI_TUYEN_SACH.has(o), "lựa chọn sai là phần tử nội tuyến: " + o)); return motLuaChon(q, (o) => KHOI_SACH.has(o)); } },
  // Bài 16: đặt tên lớp, id
  { id: "th2", has: "Mỗi ý sau về cách đặt tên lớp (class)", right: (q) => q.o.map((s) => { let m;
    if ((m = /^Bộ chọn “\.(.+?)” và “\.(.+?)” chọn cùng những phần tử\.$/.exec(s))) return m[1] === m[2];
    if ((m = /^Tên lớp “(.+?)” không đúng quy định vì bắt đầu bằng chữ số\.$/.exec(s))) return !tenHopLe(m[1]) && /^\d/.test(m[1]);
    m = y(s, /^Tên (?:id|lớp) “(.+?)” đúng quy định\.$/); return tenHopLe(m[1]); }) },
  // Bài 16: ẩn phần tử
  { id: "th2", has: "Bạn muốn lúc đầu đoạn đáp án không hiển thị", right: (q) => motLuaChon(q, (o) => { const g = trang(o, '<p class="dap-an">Đáp án</p><p>Đề bài</p>'), ap = apCss(g), p = tim(g, "p");
    return ap.kieu(p[0], "display") === "none" && ap.kieu(p[1], "display") === undefined; }) },
  // Bài 16: vùng đệm
  { id: "th2", has: "khoảng trống 12 pixel giữa chữ và đường viền", right: (q) => motLuaChon(q, (o) => { const k = docKhaiBao(o, "lựa chọn")[0]; return k[0] === "padding" && docPx(k[1]) === 12; }) },
  // Bài 17: trọng số thắng thứ tự viết
  { id: "th2", has: "Chữ trong “<span class=\"gia\">99 nghìn</span>” có màu gì", right: (q) => { const m = maTrong(q.q); const g = trang(m[0] + " " + m[1], m[2]);
    return tenMau(apCss(g).kieu(tim(g, "span")[0], "color")); } },
  // Bài 17: thứ tự ưu tiên (Bảng 17.3)
  { id: "th2", has: "Mỗi ý sau về thứ tự ưu tiên khi nhiều mẫu CSS", right: (q) => {
    const a = (() => { const g = trang("#a {color: red;}", '<p id="a" style="color: blue;">x</p>'); return cungMau(apCss(g).kieu(tim(g, "p")[0], "color"), "blue"); })();
    const b = (() => { const g = trang("body {color: red;} p {color: blue;}", "<p>x</p>"); return cungMau(apCss(g).kieu(tim(g, "p")[0], "color"), "blue"); })();
    const d = (() => { const g = trang("p.a {color: red;} p {color: blue;}", '<p class="a">x</p>'); return cungMau(apCss(g).kieu(tim(g, "p")[0], "color"), "blue"); })();
    assert.ok(/thuộc tính style/.test(q.o[0]) && /kế thừa/.test(q.o[1]) && /Mẫu viết sau cùng luôn được áp dụng/.test(q.o[3]));
    return [a, b, null, d]; } },
  // Bài 17: trọng số của bốn mẫu
  { id: "th2", has: "Số “15” hiển thị màu gì", right: (q) => { const g = trangMa(docKhung(q.svg)); return tenMau(apCss(g).kieu(theoChu(g, "15"), "color")); } },

  /* ===== Công nghệ, Đề 1 ===== */
  { id: "cn1", has: "Một công ti sắp mở nhà máy sản xuất loa thông minh", essay: (q) => { coThang(q, "thiết kế", "sản xuất", "chất lượng", "đại học"); coX(q, "Bài gợi ý:", "mạch nguyên lí", "quản lí chất lượng"); } },
  { id: "cn1", has: "Kí hiệu trong hình bên là của linh kiện nào?", right: (q) => docTu(q.svg) },
  { id: "cn1", has: "nâu, xám, đỏ, nhũ vàng", right: (q) => { const m = y(q.q, /theo thứ tự: (.+?)\. /); return docVongMau(mauCua(m[1])).R; } },
  { id: "cn1", has: "Một tụ điện có điện dung 47 µF", right: (q) => { assert.ok(/làm tròn kết quả đến hàng đơn vị/.test(q.q)); return Math.round(dungKhang(doLuong(q.q, "Hz"), doLuong(q.q, "F"))); } },
  { id: "cn1", has: "có giá trị 39 kΩ, sai số ±10%", right: (q) => { const R = doLuong(q.q, "Ω"), sai = +y(q.q, /sai số ±(\d+)%/)[1];
    return motLuaChon(q, (o) => { try { const v = docVongMau(mauCua(o)); return gan(v.R, R) && v.sai === sai; } catch (e) { return false; } }); } },
  { id: "cn1", has: "Mạch nguồn cần một tụ hoá điện dung 100 µF", right: (q) => { const C = doLuong(q.q, "F"), U = doLuong(q.q.split("điện áp")[1], "V");
    return motLuaChon(q, (o) => { const m = y(o, /^Tụ ghi (.+?) V – (.+?) µF$/); return val(m[1]) > U && gan(val(m[2]) * 1e-6, C); }); } },
  { id: "cn1", has: "Hình bên là kí hiệu của linh kiện bán dẫn nào?", right: (q) => (docTransistor(q.svg) === "PNP" ? "Transistor lưỡng cực loại PNP" : "Transistor lưỡng cực loại NPN") },
  { id: "cn1", has: "Một diode silicon có điện áp ngưỡng U_F = 0,7 V", right: (q) => { const UF = so(q.q, "U_F = # V")[0];
    return q.o.map((s) => { const U = so(s, "U_AK = # V")[0];
      if (/dòng điện chạy qua diode theo chiều từ K đến A/.test(s)) return false; // diode không cho dòng điện đi theo chiều ngược
      if (/vẫn dẫn hoàn toàn|diode dẫn hoàn toàn/.test(s)) return U > UF;
      y(s, /phân cực thuận nhưng chưa dẫn hoàn toàn/); return U > 0 && U <= UF; }); } },
  { id: "cn1", has: "Một IC hai hàng chân có 16 chân", right: (q) => { const n = so(q.q, "có # chân")[0], k = so(q.q, "đối diện với chân số #")[0];
    // ngược chiều kim đồng hồ: hàng dưới 1…n/2 từ trái sang phải, hàng trên n/2+1…n từ phải sang trái; chân thứ k từ trái của hàng trên là n + 1 − k
    assert.ok(k <= n / 2); return n + 1 - k; } },
  { id: "cn1", has: "Mạch cần một transistor loại PNP", right: (q) => motLuaChon(q, (o) => /^[AB]\d{3,4}$/.test(o)) },
  // Bài 18: đường đi của tín hiệu trong hệ thống truyền thông tin tương tự (micro → khuếch đại → điều chế → bộ phát … bộ thu → giải điều chế
  // → khuếch đại công suất → loa)
  { id: "cn1", has: "Sắp xếp các khâu xử lí tín hiệu", right: (q) => { const CHUOI = ["Bộ chuyển đổi", "Khuếch đại", "Điều chế", "Bộ phát", "Bộ thu", "Giải điều chế", "Khuếch đại công suất", "Loa"];
    assert.ok(q.o.every((o) => CHUOI.includes(o)), "ô của câu sắp xếp là khâu của hệ thống"); return CHUOI.filter((c) => q.o.includes(c)); } },
  { id: "cn1", has: "kí hiệu rút gọn của khuếch đại thuật toán. Chân có dấu “−”", right: (q) => { docOpAmp(q.svg); return "Lối vào đảo"; } },
  { id: "cn1", has: "Mạch so sánh không đảo", right: (q) => { const Ucc = so(q.q, "nguồn +# V")[0], Ung = so(q.q, "điện áp ngưỡng # V")[0], Uv = so(q.q, "điện áp vào là # V")[0];
    return vn(Uv > Ung ? Ucc : -Ucc) + " V"; } },
  { id: "cn1", has: "Mạch khuếch đại đảo dùng khuếch đại thuật toán có R1", right: (q) => { const R1 = doLuong(q.q.split("R1 =")[1], "Ω"), R2 = doLuong(q.q.split("R2 =")[1], "Ω"), Uv = so(q.q, "điện áp vào là # V")[0];
    return daoK(R1, R2) * Uv; } },

  /* ===== Công nghệ, Đề 2 ===== */
  { id: "cn2", has: "Hình bên là kí hiệu của linh kiện nào?", right: (q) => docBienTro(q.svg) },
  { id: "cn2", has: "có ghi mã “471”", right: (q) => { const m = y(q.q, /mã “(\d)(\d)(\d)”/); return +(m[1] + m[2]) * 10 ** +m[3]; } },
  { id: "cn2", has: "xanh lam, xanh lục, đen, đỏ, nâu", right: (q) => { const v = docVongMau(mauCua(y(q.q, /theo thứ tự: (.+?)\. /)[1])); return triSo(v.R) + " ± " + v.sai + "%"; } },
  { id: "cn2", has: "Một cuộn cảm có điện cảm 15 mH", right: (q) => { assert.ok(/làm tròn kết quả đến hàng đơn vị/.test(q.q)); return Math.round(camKhang(doLuong(q.q, "Hz"), doLuong(q.q, "H"))); } },
  { id: "cn2", has: "Đo bằng đồng hồ vạn năng được 495 Ω", right: (q) => { const v = docVongMau(mauCua(y(q.q, /4 vạch màu: (.+?)\. /)[1])), d = doLuong(q.q.split("được")[1], "Ω");
    const lo = v.R * (1 - v.sai / 100), hi = v.R * (1 + v.sai / 100); assert.ok(d < lo || d > hi, "giá trị đo nằm ngoài khoảng sai số");
    return motLuaChon(q, (o) => o.startsWith("Không, vì " + vn(d) + " Ω nằm ngoài khoảng từ " + vn(lo) + " Ω đến " + vn(hi) + " Ω")); } },
  { id: "cn2", has: "Kiểm tra ba diode bằng đồng hồ vạn năng", right: (q) => { const kq = y(q.q, /được ba kết quả: (.+?)\. Diode/)[1].split(";").map((x) => x.trim());
    const tot = kq.filter((x) => /^\d/.test(x) && val(x.replace(" V", "")) >= 0.3 && val(x.replace(" V", "")) <= 0.8); assert.equal(tot.length, 1); return "Diode đo được " + tot[0]; } },
  { id: "cn2", has: "Một transistor NPN có điện áp ngưỡng U_F = 0,6 V", right: (q) => { const UF = so(q.q, "U_F = # V")[0];
    return motLuaChon(q, (o) => { const [be, ce] = [so(o, "U_BE = # V")[0], so(o, "U_CE = # V")[0]]; return be > UF && ce > 0; }); } },
  // U_ra = A × (U_không đảo − U_đảo), A rất lớn: hai lối vào bằng nhau thì U_ra = 0
  { id: "cn2", has: "Hai lối vào của một khuếch đại thuật toán cùng được nối", right: (q) => { const U = so(q.q, "điện áp # V")[0], A = 1e5; return vn(A * (U - U)) + " V"; } },
  { id: "cn2", has: "Cảm biến cho tín hiệu dạng sin biên độ", essay: (q) => { const Uv = so(q.q, "biên độ # V")[0], Ur = so(q.q, "có biên độ # V")[0], R1 = doLuong(q.q.split("R1 =")[1], "Ω");
    const G = lam(Ur / Uv, 6), R2 = (G - 1) * R1; assert.ok(Number.isInteger(G) && Number.isInteger(R2 / 1e3) && gan(khongDaoK(R1, R2), G), "hệ số khuếch đại, R2 tính được");
    coThang(q, "không đảo", "G = " + vn(Ur) + " : " + vn(Uv) + " = " + vn(G), "R2 = " + vn(G - 1) + " × " + vn(R1 / 1e3) + " kΩ = " + vn(R2 / 1e3) + " kΩ", "nối với lối vào không đảo");
    coX(q, "Bài gợi ý:", "R2 = " + vn(R2 / 1e3) + " kΩ"); } }
];
const SAI_CU_PHAP = new Set(["<p style=\"mau-chung.css\">Mẫu</p>"]);
// tên nhân vật của sách Tin học 12 (Bài 5, Bài 9); Bài 13–21 và sách Công nghệ 12 không đặt tên nhân vật
const TEN_SACH = /Hoàng Mỹ|(?:Thầy|Cô) (?:Khải|Lan|Vũ|Hoàng|Đức|Thắng|Bích)(?![\p{L}])/u;

/* ---------- chạy kiểm tra ---------- */
let n = 0;
const daKiem = new Set();
CHECKS.forEach((c) => {
  const m = MON.find((x) => c.id.startsWith(x.ki)), cau = m.kho.filter((q) => q.q.includes(c.has) && (!c.hinh || (q.svg && c.hinh(q.svg))));
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
// câu trả lời bằng số, câu có hình, câu sắp xếp, câu nối, câu tự luận nào cũng phải được tính lại, đọc lại ở trên; mọi đoạn mã HTML, CSS
// trong câu Tin học (trong ngoặc kép “…”, hoặc lựa chọn là một đoạn mã) đúng cú pháp, trừ lựa chọn sai của câu tìm chỗ viết sai (SAI_CU_PHAP)
MON.forEach((m) => m.kho.filter((q) => q.svg || ["num", "essay", "order", "match"].includes(q.type)).forEach((q) => assert.ok(daKiem.has(q), "chưa có kiểm tra cho câu " + ten.get(q) + ": " + q.q.slice(0, 60))));
MON.forEach((m) => m.kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + ten.get(q))));
{
  let dem = 0;
  TH.kho.forEach((q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], (q.rubric || []).map((c) => c.c)).forEach((s) => maTrong(s).forEach((ma) => {
    if (SAI_CU_PHAP.has(ma)) return;
    try { docDoan(ma); dem++; } catch (e) { assert.fail(ten.get(q) + ": đoạn mã viết sai (" + e.message + "): " + ma); }
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
  // số ngăn hàng nghìn bằng khoảng trắng (năm viết liền), dấu phẩy thập phân; trong đoạn mã, mã màu, tên tệp, tên transistor (B1132) thì
  // giữ nguyên
  const ngoai = s.replace(/“[^”]*”/g, " ").replace(/#[0-9A-Fa-f]{6}\b/g, " ").replace(/(?<![\p{L}\d])[A-D]\d{3,4}(?![\p{L}\d])/gu, " ").replace(/[\w-]+\.(?:html|htm|css|png|jpg)\b/g, " ");
  if (!laMa(s)) assert.ok(!/\d{5,}|\d\.\d/.test(ngoai) && [...ngoai.matchAll(/(?<![\d,])\d{4}(?![\d,])/g)].every((x) => /^(19|20)\d\d$/.test(x[0])), at + "số viết sai cách: " + s);
  // lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án
  assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(s), at + "nhắc vị trí của phương án: " + s);
  // tên nhân vật của sách không dùng làm tên trong đề
  assert.ok(!TEN_SACH.test(s), at + "tên nhân vật của sách: " + s);
})));

/* ---------- lời dặn, mức độ, ma trận ---------- */
MON.forEach((m) => {
  const M = m.M, cells = Object.values(M), CHU_DE = m.BAI.map((b) => b[0]), soBai = Object.fromEntries(m.BAI);
  assert.ok(m.kho.every((q) => [1, 2, 3].includes(q.lv)), m.ma + ": câu nào cũng cần lv");
  assert.ok(cells.every(Array.isArray), m.ma + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], m.ma + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  assert.equal(sum(cells.map(sum)), m.pool.n, m.ma + ": tổng ma trận bằng n");
  assert.ok(cells.every((v) => sum(v) >= 1), m.ma + ": chủ đề nào cũng có câu");
  assert.deepEqual(Object.keys(M), CHU_DE, m.ma + ": chủ đề theo tên bài, thứ tự bài của sách");
  CHU_DE.forEach((t) => assert.ok(("chu-de:12:" + m.ma + ":" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
  // không chủ đề nào trùng kho cuối kì I: kho này không có câu ôn
  const cu = new Set(m.ck1.map((q) => q.topic)); CHU_DE.forEach((t) => assert.ok(!cu.has(t), m.ma + ": chủ đề trùng kho cuối kì I: " + t));
  m.DE.forEach((id) => {
    const qs = m.kho.filter((q) => q.src === id);
    assert.deepEqual([...new Set(qs.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, đúng thứ tự");
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t));
    // lời dặn: sách, phạm vi, số câu mỗi phần (tính từ ma trận), bài học khác phạm vi, đề cương của trường; không có câu về đề chung của Sở
    const note = bank(id).note;
    assert.equal(note, bank(m.DE[0]).note, id + ": hai đề cùng lời dặn");
    m.PHAN.forEach(([p, tu, den]) => { const k = sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))); assert.ok(note.includes(p + " " + k + " câu"), id + ": lời dặn ghi “" + p + " " + k + " câu”"); });
    assert.equal(sum(m.PHAN.map(([, tu, den]) => sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))))), m.pool.n, m.ma + ": các phần của lời dặn phủ hết ma trận");
    assert.ok(note.startsWith(m.dau + " Phạm vi giữa học kì II") && m.sau.every((s) => note.includes(s)) && note.includes("đối chiếu với đề cương của trường"), id + ": lời dặn ghi sách, phạm vi, bài học khác phạm vi, đề cương của trường");
    assert.ok(!/Sở GD&ĐT|đề chung/.test(note), id + ": đề giữa kì không có câu về đề chung của Sở");
    assert.ok(note.endsWith("Có lời giải từng câu."), id + ": lời dặn kết thúc như kho cuối kì I");
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
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, và không dưới một phần sáu: đáp án đúng
  // không bao giờ ở hai đầu thì học sinh loại được lựa chọn dài nhất, ngắn nhất mà đoán
  const le = mc.filter((q) => { const L = q.o.map((o) => o.length); return L[0] > Math.max(...L.slice(1)) || L[0] < Math.min(...L.slice(1)); });
  assert.ok(le.length * 3 <= mc.length && le.length * 6 >= mc.length, `${m.ma}: đáp án đúng dài nhất hoặc ngắn nhất ở ${le.length}/${mc.length} câu: ` + le.map((q) => ten.get(q)).join(", "));
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
  const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ""), deBai = m.kho.concat(m.ck1).map((q) => ({ at: ten.get(q), k: goc(q.q) }));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
});

/* ---------- danh sách xem tay ----------
   CUM_CHUNG: chuỗi 3 từ chung của môn (tên thuộc tính, thuật ngữ) không coi là lộ đáp án; DA_XEM: chuỗi 3 từ của đáp án có ở câu rút được
   cùng lúc, đã xem tay, không lộ (in lại bằng DO_LO=1); TU_CHUNG: tên bài, tên chương, thuật ngữ, cách nói chuẩn của đề, bỏ qua khi so với
   chữ của sách và của kho khác. */
const CUM_CHUNG = new Set(["mẫu định dạng", "thiết bị điện", "bị điện tử", "transistor lưỡng cực", "giá trị điện", "trị điện trở"]);
const DA_XEM = [
  // Tin học: thuật ngữ, tên màu, tên thẻ, phần chung của mọi lựa chọn; câu kia không nêu ý của đáp án (S của hsl, ngành học không gắn với công
  // việc theo dõi mạng, !important, bộ chọn của đề)
  "th2#5 → th1#1: một quy định",
  "th1#13 → th1#7: font weight bold",
  "th2#17 → th1#19: {color red }",
  "th1#25 → th1#20: hệ điều hành",
  "th2#22 → th1#20: hệ điều hành",
  "th2#25 → th1#20: cập nhật hệ",
  "th2#25 → th1#20: nhật hệ điều",
  "th2#25 → th1#20: hệ điều hành",
  "th1#25 → th1#21: yêu cầu của",
  "th1#24 → th1#23: quản trị mạng",
  "th2#18 → th2#5: được ưu tiên",
  "th1#13 → th2#9: xám",
  "th1#19 → th2#9: xám",
  "th2#19 → th2#9: xám",
  "th2#10 → th2#11: rgb 0 0",
  "th1#17 → th2#12: li",
  "th1#9 → th2#17: xanh dương",
  "th1#18 → th2#17: xanh dương",
  "th2#3 → th2#17: xanh dương",
  "th2#10 → th2#17: xanh dương",
  "th2#11 → th2#17: xanh dương",
  "th2#19 → th2#17: xanh dương",
  "th1#13 → th2#19: xám",
  "th1#19 → th2#19: xám",
  "th2#9 → th2#19: xám",
  // Công nghệ: tên nghề, thuật ngữ ở lựa chọn sai hay ở câu khác ý; phần chung của mọi lựa chọn (hai lối vào, lối ra); câu tự luận nói lối
  // vào đảo không kèm dấu “−”; U_F = 0,7 V của diode không nói gì về transistor
  "cn1#4 → cn1#1: chế tạo thiết",
  "cn1#4 → cn1#1: tạo thiết bị",
  "cn2#1 → cn1#1: cho sản xuất",
  "cn2#6 → cn1#1: chế tạo thiết",
  "cn2#6 → cn1#1: tạo thiết bị",
  "cn1#3 → cn1#2: từ xa qua",
  "cn1#1 → cn1#4: và sửa chữa",
  "cn2#9 → cn1#10: cuộn cảm có",
  "cn2#11 → cn1#10: cuộn cảm có",
  "cn2#22 → cn1#20: có biên độ",
  "cn2#25 → cn1#20: có biên độ",
  "cn2#25 → cn1#23: lối vào đảo",
  "cn1#1 → cn2#2: đồ dùng điện",
  "cn1#11 → cn2#7: điện dung",
  "cn1#13 → cn2#7: điện dung",
  "cn2#13 → cn2#8: biến trở",
  "cn1#17 → cn2#19: = 0 7",
  "cn1#17 → cn2#19: 0 7 v",
  "cn2#22 → cn2#20: tín hiệu lối",
  "cn2#22 → cn2#20: hiệu lối ra",
  "cn2#22 → cn2#20: hiệu lối vào",
  "cn2#11 → cn2#21: có tần số",
  "cn2#17 → cn2#23: mạch tích hợp",
  "cn2#20 → cn2#23: lối vào và",
  "cn2#24 → cn2#23: hai lối vào"
];
const TU_CHUNG = MON.flatMap((m) => m.BAI.map((b) => b[0]).concat(m.PHAN.map((p) => p[0].replace(/^(?:Chủ đề|Chương) \S+ /, "").replace(/ \(.*$/, "")))).concat([
  // cách hỏi chuẩn của đề
  "mỗi ý sau đúng hay sai",
  // Tin học: tên nghề, ngành học, nhóm kiến thức, thuật ngữ như sách (Bài 19, 20)
  "sửa chữa và bảo trì máy tính", "Kĩ thuật sửa chữa, lắp ráp máy tính", "Công nghệ kĩ thuật phần cứng máy tính", "Công nghệ kĩ thuật phần mềm máy tính",
  "Công nghệ thông tin", "Quản trị mạng máy tính", "Quản trị hệ thống", "An ninh mạng", "Hệ thống thông tin", "bảo mật hệ thống thông tin",
  "quản trị và bảo trì hệ thống", "quản lí hệ thống", "luật pháp và tuân thủ quy định", "tấn công từ chối dịch vụ", "quản trị mạng",
  // Công nghệ: tên nghề (Bài 14), tên dụng cụ đo, lời dặn làm tròn
  "thiết kế thiết bị điện tử", "sản xuất, chế tạo thiết bị điện tử", "lắp đặt thiết bị điện tử", "vận hành thiết bị điện tử",
  "bảo dưỡng và sửa chữa thiết bị điện tử", "đồng hồ vạn năng", "làm tròn kết quả đến hàng đơn vị"]);

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Đề ngẫu nhiên rút câu ở mọi ô, đề “Ôn chủ đề” rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi cặp câu cùng môn, trừ cặp có
   câu tự luận nằm cùng một ô rút 1 câu. Đáp án là số (trả lời ngắn, lựa chọn đúng dạng “17,3 A”; từ hai chữ số, hoặc số thập phân) tìm ở vị
   trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”, “đạt”; không tính số đứng trước một phép tính) cùng đơn vị: không được
   có. Đáp án bằng chữ (lựa chọn đúng của câu nhiều lựa chọn) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp
   án); chuỗi có trong đề bài, lựa chọn, lời giải, chữ trong hình của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM.
   Cặp nối: cả hai vế có ở câu kia thì lộ. Ô của câu sắp xếp: hai ô liền nhau theo đúng thứ tự có ở câu kia thì in ra để xem tay. Lời
   dặn của đề cũng dò như một câu kia. */
const DON_VI = "(?:kΩ|MΩ|Ω|µH|mH|µF|pF|mV|V|Hz|px|%)";
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
// lời dặn của đề hiện ở màn mở đề: xét như một câu rút cùng mọi câu của kho (chỉ dò đáp án của câu khác có trong lời dặn)
MON.forEach((m) => {
  const note = { topic: "lời dặn", type: "note", q: bank(m.DE[0]).note, x: "", lv: 0 };
  const r = doLo(m.kho.concat(note), m.M, (q) => (q === note ? "lời dặn " + m.ma : ten.get(q))); lo.push(...r.lo); chuLo.push(...r.chuLo);
});
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));

/* ---------- không chép sách: so với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ----------
   Cụm từ chung của môn (TU_CHUNG: tên bài, tên chương, tên thẻ, thuật ngữ, cách nói chuẩn của đề) thay bằng dấu ngăn trước khi so. Chuỗi so
   phải có ít nhất 5 từ có chữ. */
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const boDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const TU_CHUNG_ = TU_CHUNG.map((p) => " " + boDau(p) + " ").sort((a, b) => b.length - a.length);
const khongDau = (s) => {
  let t = " " + boDau(String(s).normalize("NFC")) + " ";
  TU_CHUNG_.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  return t.replace(/[aeiouy]+/g, "a").replace(/\s+/g, " ").trim();
};
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

/* ---------- so với kho cuối kì I cùng môn: đề bài không gần trùng ----------
   Cặp hai âm tiết liền nhau (Rút ra N25; như tests/khtn9-gk1.js): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của kho cuối kì I
   và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung của đề
   (CUM) và cặp có ở từ 3% số câu của file. */
{
  const CUM = ["mỗi ý sau đúng hay sai", "nhận xét nào sau đây đúng", "phát biểu nào sau đây đúng", "làm tròn kết quả đến hàng đơn vị", "cho đoạn mã trong hình", "hình bên là kí hiệu của linh kiện"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const gan_ = [];
  MON.forEach((m) => {
    const ca = BANKS.filter((b) => b.file === m.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), df = {};
    ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
    const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * ca.length)); };
    m.kho.forEach((q) => { const c = capAm(q); m.ck1.forEach((p) => { const d = capAm(p), chung = [...c].filter((x) => d.has(x)); if (chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`); }); });
  });
  assert.deepEqual(gan_, [], "đề bài gần trùng câu của kho cuối kì I");
}

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả kho cuối kì I cùng file và câu riêng của
   các đề ngẫu nhiên; với kho cuối kì I cùng môn: đề bài không có chuỗi 6 từ nào trùng (Rút ra N9-gk1-toan) ---------- */
{
  const cua = (b, q) => ({ id: b.id, s: " " + chu(q).concat(chuHinh(q), q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const ngoai = (b) => !MON.some((m) => m.DE.includes(b.id) || m.pool === b);
  const khac = BANKS.filter((b) => !b.pool && ngoai(b)).flatMap((b) => b.questions.map((q) => cua(b, q)))
    .concat(BANKS.filter((b) => b.pool && ngoai(b)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => tatCa.flatMap((q) => [...new Set(chuSo(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
  const gan6 = MON.flatMap((m) => { const ck1 = m.ck1.map((q) => " " + khongDau(q.q) + " "); return m.kho.flatMap((q) => chuoi(q.q, 6).filter((c) => ck1.some((s) => s.includes(" " + c + " "))).map((c) => ten.get(q) + ": " + c)); });
  assert.deepEqual([...new Set(gan6)], [], "đề bài có chuỗi 6 từ trùng câu của kho cuối kì I");
}

/* ---------- tự thử: bộ đọc HTML, CSS, bộ áp mẫu định dạng, khung mã, bộ đọc hình, bộ dò lộ với mã, hình, câu cố ý viết sai ---------- */
{
  const hong = (f, msg) => assert.throws(f, Error, "tự thử không bắt được: " + msg);
  // bộ đọc HTML: cú pháp, thẻ và thuộc tính sách dạy
  hong(() => docHtml("<p>Chào <b>bạn</p></b>"), "thẻ đóng sai thứ tự");
  hong(() => docHtml("<p>Chào bạn"), "thiếu thẻ đóng");
  hong(() => docHtml("<hr></hr>"), "thẻ rỗng có thẻ đóng");
  hong(() => docHtml("<p style=color:red>x</p>"), "giá trị thuộc tính không có ngoặc kép");
  hong(() => docHtml('<p class="a" class="b">x</p>'), "lặp thuộc tính");
  hong(() => docHtml("<button>Gửi</button>"), "thẻ sách không dạy");
  hong(() => docHtml('<link rel="stylesheet" href="a.css"></link>'), "thẻ link có thẻ đóng");
  // bộ đọc CSS: cú pháp, thuộc tính, giá trị, bộ chọn sách dạy
  hong(() => docCss("p { color: red }"), "thiếu dấu chấm phẩy cuối");
  hong(() => docCss("p { color red; }"), "thiếu dấu hai chấm");
  hong(() => docCss("p { color: red; "), "thiếu ngoặc nhọn");
  hong(() => docCss("p { colour: red; }"), "thuộc tính viết sai");
  hong(() => docCss("p { color: reed; }"), "tên màu sai");
  hong(() => docCss("p { color: rgb(256, 0, 0); }"), "rgb() quá 255");
  hong(() => docCss("p { font-size: 12; }"), "cỡ chữ thiếu đơn vị");
  hong(() => docCss("p { margin: 10px 20px; }"), "margin nhiều giá trị (sách không dạy)");
  hong(() => docCss("p { font-family: serif, Arial; }"), "tên loại phông không ở cuối danh sách");
  hong(() => docCss("p { border: 2px wavy blue; }"), "kiểu viền sách không có");
  hong(() => docCss("p { color: red; color: blue; }"), "lặp thuộc tính trong một mẫu");
  hong(() => docCss("p:hovered { color: red; }"), "lớp giả sách không có");
  hong(() => docCss("li:first-child { color: red; }"), "lớp giả sách không dạy");
  hong(() => docCss("p > { color: red; }"), "bộ chọn thiếu phần tử");
  hong(() => docCss("#a#b { color: red; }"), "hai id trong một bộ chọn đơn");
  // trọng số theo Bảng 17.4 (id 100; lớp, lớp giả, thuộc tính 10; phần tử, phần tử giả 1)
  assert.deepEqual(["p em", ".x #y", "p em.a.b", "p > #z", "a:hover", "p::first-line", "*", "input[type=\"text\"]"].map((s) => docChon(s).ts), [2, 110, 22, 101, 11, 2, 0, 11], "tự thử: trọng số");
  // màu: tên, hex, rgb() theo số và theo %, hsl()
  assert.deepEqual(["olive", "#00ff00", "rgb(255, 0, 255)", "rgb(100%, 50%, 0%)", "hsl(0, 100%, 50%)", "hsl(120, 100%, 25%)", "hsl(240, 0%, 50%)"].map(docMau),
    [[128, 128, 0], [0, 255, 0], [255, 0, 255], [255, 128, 0], [255, 0, 0], [0, 128, 0], [128, 128, 128]], "tự thử: màu");
  hong(() => docMau("#0F0"), "mã hex ba chữ số (sách không dạy)");
  // áp mẫu định dạng: kế thừa, con cháu, con trực tiếp, anh em liền kề, anh em, trọng số, thứ tự cuối cùng, CSS trực tiếp, !important
  {
    const g = docHtml('<style>div p { color: blue; } p > em { color: red; } em + strong { color: green; } em ~ b { color: navy; } .a { color: olive; } p.a { color: teal; } #k { color: maroon; } p { font-size: 20px; } .to { font-size: 1.5em; } .x { color: gray !important; }</style>' +
      '<div><p class="a">A <em>B</em> <strong>C</strong> <b>D</b></p><p id="k" class="a" style="color: lime;">E</p></div><p>F <span class="to">G</span></p><p class="x" style="color: lime;">H</p>');
    const ap = apCss(g), el = (t, i = 0) => tim(g, t)[i], mau = (e) => hex(docMau(ap.kieu(e, "color")));
    assert.deepEqual([mau(el("p", 0)), mau(el("em")), mau(el("strong")), mau(el("b")), mau(el("p", 1)), ap.kieu(el("p", 2), "color"), mau(el("p", 3))],
      ["#008080", "#FF0000", "#008000", "#000080", "#00FF00", undefined, "#808080"], "tự thử: áp mẫu định dạng");
    assert.equal(coChu(ap, el("span")), 30, "tự thử: cỡ chữ em theo phần tử cha");
  }
  // CSS ngoài: thẻ link, lệnh @import trong thẻ style; tệp chưa có thì báo
  {
    const g = docHtml('<link href="a.css" rel="stylesheet"><style>@import "b.css"; p { color: red; }</style><p class="x">Chữ</p>'), ap = apCss(g, { "a.css": ".x { color: blue; font-size: 20px; }", "b.css": ".x { font-size: 12px; }" });
    assert.deepEqual([hex(docMau(ap.kieu(tim(g, "p")[0], "color"))), coChu(ap, tim(g, "p")[0])], ["#0000FF", 12], "tự thử: CSS ngoài, @import (trọng số; cùng trọng số thì mẫu sau cùng)");
    hong(() => apCss(docHtml('<link href="c.css" rel="stylesheet">'), {}), "thẻ link tới tệp CSS chưa có");
    hong(() => docCss('p { color: red; } @import "b.css";'), "@import không đứng đầu");
  }
  // đoạn mã trong chữ của câu
  assert.deepEqual(maTrong("Mẫu “p {color: red;}”, quy định “color: red;”, thẻ “<b>x</b>”, chữ “màu đỏ”, màu “rgb(1, 2, 3)”."), ["p {color: red;}", "color: red;", "<b>x</b>"], "tự thử: đoạn mã trong chữ");
  assert.ok(laMa("text-align: center;") && laMa(".a {color: red;}") && laMa("<p>x</p>") && !laMa("Chữ màu đỏ"), "tự thử: lựa chọn là đoạn mã");
  // khung mã: lùi đầu dòng sai, dòng tràn khung, thẻ chưa đóng
  {
    const k = TH.kho.find((q) => q.svg && q.q.includes("Số “15”")).svg;
    assert.ok(docKhung(k).includes('<td class="so">15</td>'), "tự thử: đọc khung mã");
    hong(() => docKhung(k.replace('<text x="44" y="186" font-size="14">', '<text x="28" y="186" font-size="14">')), "khung mã lùi đầu dòng sai");
    hong(() => docKhung(k.replace("#bang td { color: gray; }", "#bang td { color: gray; font-weight: bold; text-align: right; }")), "dòng tràn khung");
    hong(() => docKhung(k.replace("&lt;/table&gt;", "&lt;/tr&gt;")), "thẻ đóng không khớp");
  }
  // vòng màu theo bảng của sách, các phép tính Công nghệ
  assert.deepEqual(docVongMau(["vàng", "tím", "đỏ", "nhũ vàng"]), { R: 4700, sai: 5 }, "tự thử: vòng màu 4 vạch");
  assert.deepEqual(docVongMau(["nâu", "đen", "đen", "nâu", "nâu"]), { R: 1000, sai: 1 }, "tự thử: vòng màu 5 vạch");
  assert.deepEqual(docVongMau(["xanh lục", "xanh lam", "nhũ vàng", "bạc"]), { R: 5.6, sai: 10 }, "tự thử: hệ số nhân 0,1");
  hong(() => docVongMau(["đen", "tím", "đỏ", "nhũ vàng"]), "vạch đầu màu đen");
  hong(() => docVongMau(["nâu", "đen", "đen", "nhũ vàng"]), "hệ số nhân màu đen (bảng của sách in “0”)");
  hong(() => docVongMau(["nâu", "đen", "đỏ", "xanh lục"]), "sai số màu xanh lục (bảng của sách không có)");
  assert.ok(triSo(4700) === "4,7 kΩ" && triSo(220) === "220 Ω" && triSo(1e6) === "1 MΩ" && Math.round(dungKhang(50, 10e-6)) === 318 && Math.round(camKhang(50, 0.1)) === 31 &&
    gan(daoK(2, 10), -5) && gan(khongDaoK(2, 10), 6), "tự thử: các phép tính Công nghệ");
  // hình kí hiệu linh kiện cố ý vẽ sai
  {
    const h = (f) => CN.kho.find((q) => q.svg && f(q.svg)).svg, tu = h((s) => s.includes(">+</text>") && !s.includes("<polygon")), tr = h((s) => s.includes("<circle")),
      oa = h((s) => s.includes('fill="acc-soft"')), bt = h((s) => s.includes("<rect") && s.includes("<polygon"));
    hong(() => docTu(tu.replace(">+</text>", ">#</text>").replace(">−</text>", ">+</text>").replace(">#</text>", ">−</text>")), "tụ phân cực đổi chỗ dấu + và −");
    hong(() => docTu(tu.replace('<line x1="122" y1="25" x2="122" y2="75"', '<line x1="122" y1="30" x2="122" y2="70"')), "hai bản cực không dài bằng nhau");
    assert.equal(docTransistor(tr.replace(/<polygon points="[^"]*"/, '<polygon points="107.1,108.1 92.6,104.6 99.8,95.0"')), "NPN", "tự thử: mũi tên hướng ra là NPN");
    hong(() => docTransistor(tr.replace(/<polygon points="[^"]*"/, '<polygon points="96.2,60.2 103.4,47.1 110.7,56.6"')), "mũi tên ở cực C");
    hong(() => docTransistor(tr.replace('<text x="30" y="72"', '<text x="140" y="72"')), "nhãn B không ở bên trái");
    hong(() => docOpAmp(oa.replace('<text x="82" y="51"', '<text x="40" y="51"')), "dấu − nằm ngoài tam giác");
    hong(() => docOpAmp(oa.replace('<line x1="170" y1="70" x2="215" y2="70"', '<line x1="170" y1="80" x2="215" y2="80"')), "lối ra không ở đỉnh");
    hong(() => docBienTro(bt.replace('points="114,45 126,45 120,53"', 'points="114,40 126,40 120,48"')), "mũi tên không chạm cạnh trên");
    hong(() => docTu(tu.replace('font-size="16"', 'font-size="12"')), "chữ trong hình nhỏ hơn 13");
  }
  // dò lộ: số ở vị trí kết quả của câu kia; số đứng trước một phép tính không tính
  {
    const a = { topic: "A", type: "num", q: "Tính cảm kháng.", ans: 38, unit: "Ω", lv: 3, x: "" }, b = { topic: "B", type: "mc", q: "Ta có X_L ≈ 38 Ω. Chọn ý đúng.", o: ["m", "n", "p", "r"], lv: 1, x: "" };
    const c = { topic: "B", type: "mc", q: "Với 38 × 2 = 76 thì sao?", o: ["m", "n", "p", "r"], lv: 2, x: "" };
    assert.equal(doLo([a, b], { A: [0, 0, 1], B: [1, 0, 0] }, (q) => q.topic).lo.length, 1, "tự thử: bộ dò lộ số");
    assert.equal(doLo([a, c], { A: [0, 0, 1], B: [0, 1, 0] }, (q) => q.topic).lo.length, 0, "tự thử: số đứng trước phép tính không tính");
  }
}

MON.forEach((m) => console.log(`${m.ten} 12 giữa kì II: kho ${m.kho.length} câu (${m.DE.length} đề cố định, ${m.pool.n} câu mỗi đề), ma trận 10 – 8 – 7 trên ${Object.keys(m.M).length} chủ đề; ` +
  `${m.kho.filter((q) => q.type === "tf4").length} câu đúng/sai 4 ý, ${m.kho.filter((q) => q.type === "num").length} câu trả lời ngắn, ${m.kho.filter((q) => q.type === "match").length} câu nối, ${m.kho.filter((q) => q.type === "order").length} câu sắp xếp, ${m.kho.filter((q) => q.type === "essay").length} câu tự luận, ${m.kho.filter((q) => q.svg).length} câu có hình; đáp án đúng dài nhất hoặc ngắn nhất ở ${m.le} câu nhiều lựa chọn.`));
console.log(n + " câu, ý, đoạn mã đã tính lại hoặc đọc lại.");
console.log("MATH OK");

