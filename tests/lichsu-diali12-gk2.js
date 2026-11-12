// Kiểm tra ngân hàng Lịch sử 12 và Địa lí 12 giữa kì II của Phiên N12-gk2-lichsu-diali (data/banks/12-lichsu.js, data/banks/12-diali.js:
// mỗi môn hai đề cố định và đề ngẫu nhiên lấy câu của hai đề đó, không có câu riêng), theo mẫu tests/lichsu-diali12-ck1.js (bộ đọc biểu
// đồ, trình tự sự kiện, gộp tên riêng khi so chữ với sách; phần số, phần hình chép nguyên từ script đó) và tests/sinhhoc-ktpl12-gk2.js
// (lời dặn của đề giữa kì, so với kho cuối kì I). Số đề, số câu lấy từ danh mục (không ghi cứng).
// Câu có phép tính, có hình, câu sắp xếp, câu tự luận nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id);
// số liệu đọc từ chữ của đề hay từ hình, đáp án tính bằng code (so với ans, o[0], o của câu sắp xếp, hoặc các ý tính được của câu đúng/sai
// 4 ý; câu tự luận so với thang chấm và bài gợi ý).
// Lịch sử (Bài 10–13): trình tự sự kiện (câu sắp xếp, ý “A diễn ra trước B” của câu đúng/sai 4 ý; bảng ngày tháng theo sách in năm 2026
// ghi trong script, Bài 12 tr. 74–76, Bài 13 tr. 77–80), ngày tháng viết như sách (“6 – 3 – 1946”).
// Địa lí (Bài 20–27): tỉ trọng, mức tăng phần trăm, cán cân thương mại, cự li vận chuyển trung bình, năng suất, gấp bao nhiêu lần, số
// năm gốc từ mức tăng; năm loại biểu đồ đọc lại bằng code: cột (một dãy, hai dãy), tròn, đường, miền, kết hợp cột và đường (trục số, số
// ghi trên hình khớp vị trí, chú giải, năm); nhận xét của câu đọc biểu đồ xét lại bằng số đọc được; tên tỉnh, thành phố theo 34 đơn vị
// hành chính cấp tỉnh, tỉnh của từng vùng theo sách in năm 2026, 6 vùng kinh tế – xã hội.
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân, dấu thanh kiểu sách “hoá”, “thuỷ”), lời dặn của đề (phạm vi, số câu
// mỗi phần tính từ ma trận, trường học khác phạm vi; không có câu về đề chung của Sở), môn và lịch thi, mức độ và ma trận 10 – 8 – 7 (chủ
// đề theo tên bài và thứ tự của sách, đối chiếu mục lục trong README của cuốn ở OnUp-Book; hai đề cố định chia đúng ma trận), dạng câu
// theo khung Công văn 7991 (mỗi kho ít nhất 6 câu đúng/sai 4 ý không lặp kiểu Đ/S, Địa lí ít nhất 4 câu trả lời ngắn đáp án là số, 1–2 câu
// tự luận ở ô Vận dụng rút 1 câu), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần
// ba và không dưới một phần sáu số câu nhiều lựa chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở
// đầu bằng một chữ mà đáp án đúng không có, rút thử nhiều lần (đúng ma trận; đã làm hết một đề cố định thì không rút lại câu của đề đó).
// So với kho cuối kì I cùng môn: không chủ đề nào trùng (không có câu ôn), đáp án đúng của câu nhiều lựa chọn không trùng, đề bài không
// gần trùng (cặp hai âm tiết chung), không chuỗi 6 từ nào trùng. Dò lộ đáp án giữa mọi cặp câu rút được cùng lúc (đề “Ôn chủ đề” rút
// chung cả chủ đề; số ở vị trí kết quả của câu kia, ngày tháng của các sự kiện trong câu về trình tự thời gian: không được có; chuỗi 3 từ
// của đáp án bằng chữ in ra với DO_LO=1 để xem tay, đã xem ghi ở DA_XEM), bộ dò lộ, bộ đọc hình tự thử với câu, hình cố ý viết sai. Có
// sách ở ../OnUp-Book thì so mọi trường chữ với chữ OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm, gộp tên riêng nhiều chữ thành một từ
// (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác, cả kho cuối kì I và câu riêng của các đề ngẫu nhiên
// (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 6 từ).
// Chạy: node tests/lichsu-diali12-gk2.js → in MATH OK.
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

/* ---------- hai kho: số đề, số câu lấy từ danh mục ----------
   DAU: phần đầu của lời dặn (sách, phạm vi); PHAN: các phần của lời dặn (số câu mỗi phần tính từ ma trận); SAU: câu lời dặn nhắc trường học
   khác phạm vi; CUOI: câu cuối của lời dặn; PHAM_VI: phạm vi của môn ghi ở gk2-l12; BAI: chủ đề theo tên bài của sách (số bài để chia phần,
   đối chiếu mục lục; bài thực hành không ra chủ đề riêng); RUT_GON: tên bài rút gọn cho vừa mã đề "Ôn chủ đề" (tối đa 80 kí tự) → tên trong
   mục lục. */
const MON = [
  { ma: "lichsu", ten: "Lịch sử", sach: "lich-su-12", ki: "ls",
    DAU: "Sách Kết nối tri thức, Lịch sử 12. Phạm vi giữa học kì II theo ma trận, đề cương tra được: ",
    PHAN: [["Chủ đề 4 Công cuộc Đổi mới ở Việt Nam từ năm 1986 đến nay (Bài 10–11)", 10, 11],
      ["Chủ đề 5 Lịch sử đối ngoại của Việt Nam thời cận – hiện đại, Bài 12–13 (đối ngoại từ đầu thế kỉ XX đến năm 1945; trong kháng chiến chống Pháp và chống Mỹ)", 12, 13]],
    SAU: ["Trường kiểm tra cả Bài 9 (bảo vệ Tổ quốc từ sau tháng 4 – 1975) hoặc Bài 14 (đối ngoại từ năm 1975 đến nay) thì phụ huynh đối chiếu với đề cương của trường."],
    CUOI: "Có lời giải từng câu.", PHAM_VI: "Lịch sử: Bài 10–13 (trường kiểm tra cả Bài 9 hoặc Bài 14 thì xem đề cương của trường).",
    BAI: [["Khái quát về công cuộc Đổi mới từ năm 1986 đến nay", 10], ["Thành tựu cơ bản và bài học của công cuộc Đổi mới", 11],
      ["Hoạt động đối ngoại trong đấu tranh giành độc lập dân tộc", 12], ["Hoạt động đối ngoại trong kháng chiến chống Pháp và chống Mỹ", 13]],
    RUT_GON: { "Thành tựu cơ bản và bài học của công cuộc Đổi mới": "Thành tựu cơ bản và bài học của công cuộc Đổi mới ở Việt Nam từ năm 1986 đến nay",
      "Hoạt động đối ngoại trong đấu tranh giành độc lập dân tộc": "Hoạt động đối ngoại của Việt Nam trong đấu tranh giành độc lập dân tộc (từ đầu thế kỉ XX đến Cách mạng tháng Tám năm 1945)",
      "Hoạt động đối ngoại trong kháng chiến chống Pháp và chống Mỹ": "Hoạt động đối ngoại của Việt Nam trong kháng chiến chống Pháp (1945 – 1954) và kháng chiến chống Mỹ (1954 – 1975)" } },
  { ma: "diali", ten: "Địa lí", sach: "dia-li-12", ki: "dl",
    DAU: "Sách Kết nối tri thức, Địa lí 12 (bản chỉnh sửa năm 2026). Phạm vi giữa học kì II theo ma trận, đề tra được: ",
    PHAN: [["Phần 3 Địa lí các ngành kinh tế, các ngành dịch vụ (Bài 20–23)", 20, 23],
      ["Phần 4 Địa lí các vùng kinh tế – xã hội, Trung du và miền núi phía Bắc, Đồng bằng sông Hồng, Bắc Trung Bộ (Bài 24–27)", 24, 27]],
    SAU: ["Bài 23, 26 là bài thực hành nên không có câu riêng.", "Trường kiểm tra cả Bài 28 (Duyên hải Nam Trung Bộ và Tây Nguyên) thì phụ huynh đối chiếu với đề cương của trường.",
      "Số liệu trong các câu có biểu đồ, bảng là số liệu tự đặt."],
    CUOI: "Một số câu cần máy tính cầm tay. Có lời giải từng câu.", PHAM_VI: "Địa lí: Bài 20–27 (trường kiểm tra cả Bài 28 thì xem đề cương của trường).",
    BAI: [["Vai trò, các nhân tố ảnh hưởng đến các ngành dịch vụ", 20], ["Giao thông vận tải và bưu chính viễn thông", 21], ["Thương mại và du lịch", 22],
      ["Khai thác thế mạnh ở Trung du và miền núi phía Bắc", 24], ["Phát triển kinh tế – xã hội ở Đồng bằng sông Hồng", 25], ["Phát triển kinh tế – xã hội ở Bắc Trung Bộ", 27]],
    RUT_GON: { "Vai trò, các nhân tố ảnh hưởng đến các ngành dịch vụ": "Vai trò, các nhân tố ảnh hưởng đến sự phát triển và phân bố các ngành dịch vụ" } }
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
    assert.ok(b.file === m.file && b.subject === m.ten && b.grade === 12 && b.minutes === pool.minutes && b.n === pool.n, id + ": cùng file, môn, khối, số phút, số câu với đề ngẫu nhiên");
    assert.equal(b.title, m.ten + " 12 · Giữa kì II · Đề " + (k + 1), id + ": tên đề");
    assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
    m.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, m.ki + (k + 1) + "#" + (i + 1)));
  });
  assert.equal(m.kho.length, sum(m.DE.map((id) => bank(id).n)), m.ma + ": kho = câu của hai đề cố định");
  // kho cuối kì I cùng môn (để so: không có câu ôn, đề bài không gần trùng, đáp án không trùng)
  const ck1 = BANKS.find((b) => b.pool && b.id === m.ma + "12-ck1-ngau-nhien");
  assert.ok(ck1 && ck1.file === m.file, m.ma + ": có kho cuối kì I cùng file");
  m.ck1 = ck1.questions;
  m.ck1.forEach((q) => ten.set(q, "ck1-" + m.ki + (ck1.pool.from.indexOf(q.src) + 1) + "#" + (bank(q.src).questions.findIndex((p) => p.q === q.q) + 1)));
});
const [LS, DL] = MON;
// môn đúng chữ của lịch thi (MON_THPT), sáu mã đề gắn vào kì thi giữa kì II lớp 12, phạm vi của kì thi ghi đúng số bài
{
  const lich = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
  const mon = /const MON_THPT = \[([^\]]*)\]/.exec(lich);
  MON.forEach((m) => assert.ok(mon && mon[1].includes('"' + m.ten + '"'), "môn " + m.ten + " có trong MON_THPT"));
  const c = vm.createContext({ window: {} }); vm.runInContext(lich, c);
  const ev = c.window.ONTAP_SEED_EVENTS.find((e) => e.id === "gk2-l12");
  assert.ok(ev && ev.grades.includes(12) && ev.subjects.includes(LS.ten) && ev.subjects.includes(DL.ten), "có kì thi gk2-l12 với hai môn");
  MON.forEach((m) => {
    [...m.DE, m.pool.id].forEach((id) => assert.ok(ev.banks.includes(id), id + " gắn vào gk2-l12"));
    assert.ok(ev.scope.includes(m.PHAM_VI), "phạm vi của gk2-l12 ghi " + m.PHAM_VI);
    const [tu, den] = /Bài (\d+)–(\d+)/.exec(m.PHAM_VI).slice(1).map(Number);
    assert.ok(m.PHAN[0][1] === tu && m.PHAN[m.PHAN.length - 1][2] === den, m.ma + ": các phần của lời dặn đi từ bài đầu đến bài cuối của phạm vi");
  });
}


/* ---------- số ----------
   Số trong đề: hàng nghìn ngăn bằng khoảng trắng, dấu phẩy thập phân. */
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?";
const val = (s) => { const m = /^[−-]?\d{1,3}(?: \d{3})*(?:,\d+)?$/.exec(String(s).trim()); assert.ok(m, "không đọc được số “" + s + "”"); return +String(s).trim().replace(/ /g, "").replace("−", "-").replace(",", "."); };
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
// mẫu chữ có # ở chỗ số: so(s, "Cho # ha") → [số]
const R = (mau) => new RegExp(mau.split("#").map(escRe).join("(" + NUM + ")"), "u");
const so = (s, mau) => { const m = R(mau).exec(s); assert.ok(m, "không thấy “" + mau + "” trong: " + String(s).slice(0, 80)); return m.slice(1).map(val); };
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b));
// số viết kiểu Việt Nam: 7500 → "7 500", 0.15 → "0,15"
const vn = (x, d = 6) => { const r = Math.round(x * 10 ** d) / 10 ** d, [a, b] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const lam = (x, d) => Math.round(x * 10 ** d + 1e-9) / 10 ** d; // làm tròn d chữ số thập phân
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const coThang = (q, ...cum) => { const r = q.rubric.map((c) => c.c).join(" | "); cum.forEach((c) => assert.ok(r.includes(c), "thang chấm cần có “" + c + "”")); };
const y = (o, re) => { const m = re.exec(o); assert.ok(m, "không đọc được ý “" + o + "”"); return m; };

/* ---------- hình ----------
   Năm loại biểu đồ tự vẽ (số liệu tự đặt), đọc lại bằng code: toạ độ làm tròn 0,1 đơn vị vẽ, nên số ghi trên hình khớp vị trí khi lệch
   không quá nửa đơn vị làm tròn. Cột: số ở đỉnh cột; tròn: góc của từng phần; đường: chấm tròn và số ở mỗi năm; miền: bề dày của miền ở
   mỗi năm; kết hợp: cột theo trục trái, đường theo trục phải. Chữ cỡ 15, chú giải là ô màu hoặc đoạn thẳng ngắn có chữ bên phải. */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const lech = (a, b) => Math.abs(((((a - b) % 360) + 540) % 360) - 180);
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ngang = (l) => num(l, "y1") === num(l, "y2");
const daDoc = new Set(), LOAI_HINH = new Map(); // hình đã đọc lại bằng code, loại biểu đồ của mỗi hình
// trục số: số đặt ngay cạnh vạch (chân chữ thấp hơn vạch 5), cách đều theo giá trị; trả về hàm đổi y ra giá trị và số đơn vị mỗi đơn vị vẽ
const trucSo = (nhan, vach, ten) => {
  assert.ok(nhan.length >= 3, ten + ": cần ít nhất 3 số trên trục");
  nhan.forEach((n) => assert.ok(vach.some((y) => Math.abs(y - (n.y - 5)) < 0.051), `${ten}: số ${n.v} phải đặt ngay cạnh một vạch`));
  const s = [...nhan].sort((a, b) => a.v - b.v), k = (s[0].y - s[s.length - 1].y) / (s[s.length - 1].v - s[0].v);
  assert.ok(k > 0, ten + ": số lớn ở trên");
  s.forEach((n) => assert.ok(Math.abs(n.y - (s[0].y - k * (n.v - s[0].v))) < 0.051, `${ten}: số ${n.v} không đặt đúng vạch`));
  const f = (y) => s[0].v + (s[0].y - 5 - y) / k; f.moi = 1 / k; return f;
};
// giá trị đọc từ toạ độ khớp số ghi (toạ độ làm tròn 0,1 đơn vị vẽ)
const khop = (f, y, v, ten) => assert.ok(Math.abs(f(y) - v) <= 0.051 * f.moi + 1e-9, `${ten}: số ghi ${v} không khớp vị trí (đọc được ${f(y).toFixed(2)})`);
const chuGiaiCua = (svg, o) => o.map((r) => {
  const t = texts(svg).filter((x) => close(+x.y, num(r, "y") + 13) && +x.x > num(r, "x") + num(r, "width") && +x.x < num(r, "x") + num(r, "width") + 12);
  assert.equal(t.length, 1, "ô chú giải nào cũng có chữ"); return { fill: r.fill, ten: t[0].t };
});
const luoi = (svg) => { const lu = tags(svg, "line").filter((l) => l.stroke === "line"); assert.ok(lu.length >= 4 && lu.every(ngang), "đường lưới nằm ngang"); return lu; };
const namDuoi = (svg, day) => texts(svg).filter((t) => +t.y > day && /^\d{4}$/.test(t.t));

/* Biểu đồ cột (một hay hai dãy) */
const docCot = (svg, donVi) => {
  daDoc.add(svg); LOAI_HINH.set(svg, "cột");
  const lu = luoi(svg), x0 = Math.min(...lu.map((l) => num(l, "x1"))), ys = lu.map((l) => num(l, "y1")), day = Math.max(...ys), tx = texts(svg);
  const gt = trucSo(tx.filter((t) => /^\d[\d ]*(,\d+)?$/.test(t.t) && t["text-anchor"] === "end" && +t.x < x0).map((t) => ({ v: val(t.t), y: +t.y })), ys, "trục số");
  assert.ok(Math.abs(gt(day)) < 1e-6, "số 0 ở đường đáy");
  assert.ok(tx.some((t) => t.t === donVi && !t["text-anchor"] && +t.y < Math.min(...ys)), "trục ghi đơn vị " + donVi);
  const hcn = tags(svg, "rect"), chuGiai = chuGiaiCua(svg, hcn.filter((r) => num(r, "y") > day)), nd = namDuoi(svg, day);
  const cot = hcn.filter((r) => num(r, "y") <= day).map((r) => {
    assert.ok(close(num(r, "y") + num(r, "height"), day), "cột đứng trên đường đáy");
    const cx = num(r, "x") + num(r, "width") / 2, dinh = tx.filter((t) => t["text-anchor"] === "middle" && Math.abs(+t.x - cx) < 0.051 && +t.y < day);
    assert.equal(dinh.length, 1, "mỗi cột một số ở đỉnh"); assert.ok(Math.abs(+dinh[0].y - (num(r, "y") - 6)) < 0.051, "số ghi ngay trên đỉnh cột");
    const v = val(dinh[0].t); khop(gt, num(r, "y"), v, "cột");
    const n = [...nd].sort((a, b) => Math.abs(+a.x - cx) - Math.abs(+b.x - cx))[0];
    assert.ok(n && Math.abs(+n.x - cx) < 30, "cột nào cũng có năm ở dưới");
    const d = chuGiai.find((c) => c.fill === r.fill); if (chuGiai.length) assert.ok(d, "màu cột có trong chú giải");
    return { nam: +n.t, v, day: d && d.ten };
  });
  if (!chuGiai.length) {
    assert.ok(cot.length >= 4 && new Set(cot.map((c) => c.nam)).size === cot.length, "biểu đồ một dãy: ít nhất 4 cột, mỗi năm một cột");
    return cot.sort((a, b) => a.nam - b.nam).map(({ nam, v }) => ({ nam, v }));
  }
  const out = {};
  cot.forEach((c) => { out[c.nam] = out[c.nam] || {}; assert.equal(out[c.nam][c.day], undefined, "mỗi năm một cột của mỗi dãy"); out[c.nam][c.day] = c.v; });
  Object.values(out).forEach((g) => assert.deepEqual(Object.keys(g).sort(), chuGiai.map((c) => c.ten).sort(), "năm nào cũng đủ các dãy cột"));
  return out;
};

/* Biểu đồ tròn: { năm: { nhóm: % } } */
const docTron = (svg) => {
  daDoc.add(svg); LOAI_HINH.set(svg, "tròn");
  const tx = texts(svg), chuGiai = chuGiaiCua(svg, tags(svg, "rect"));
  assert.equal(new Set(chuGiai.map((c) => c.fill)).size, chuGiai.length, "mỗi ô chú giải một màu");
  const goc = (cx, cy, x, y) => (Math.atan2(y - cy, x - cx) * 180) / Math.PI, hinh = {};
  tags(svg, "path").forEach((p) => {
    const m = /^M ([\d.]+) ([\d.]+) L ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) 0 ([01]) 1 ([\d.]+) ([\d.]+) Z$/.exec(p.d);
    assert.ok(m, "phần của biểu đồ tròn là một hình quạt: " + p.d);
    const [cx, cy, x0, y0, r, r2, lon, x1, y1] = m.slice(1).map(Number);
    assert.ok(r === r2 && Math.abs(Math.hypot(x0 - cx, y0 - cy) - r) < 0.15 && Math.abs(Math.hypot(x1 - cx, y1 - cy) - r) < 0.15, "hai đầu cung nằm trên đường tròn");
    const a0 = goc(cx, cy, x0, y0), a1 = goc(cx, cy, x1, y1), d = (((a1 - a0) % 360) + 360) % 360;
    assert.equal(lon, d > 180 ? 1 : 0, "cờ cung lớn khớp số đo của phần");
    const c = chuGiai.find((g) => g.fill === p.fill); assert.ok(c, "màu của phần có trong chú giải");
    const nhan = tx.filter((t) => /^\d+(,\d+)?%$/.test(t.t) && Math.hypot(+t.x - cx, +t.y - 5 - cy) < r && (((goc(cx, cy, +t.x, +t.y - 5) - a0) % 360) + 360) % 360 < d);
    assert.equal(nhan.length, 1, "mỗi phần một số phần trăm ở trong");
    const k = cx + "," + cy; (hinh[k] = hinh[k] || { cx, cy, r, phan: [] }).phan.push({ a0, a1, d, ten: c.ten, v: val(nhan[0].t.slice(0, -1)) });
  });
  const out = {};
  Object.values(hinh).forEach((h) => {
    assert.ok(Math.abs(sum(h.phan.map((p) => p.d)) - 360) < 0.5, "các phần đủ một vòng tròn");
    h.phan.forEach((p, i) => {
      assert.ok(lech(h.phan[(i + 1) % h.phan.length].a0, p.a1) < 0.5, "các phần nối tiếp nhau");
      assert.ok(Math.abs(p.d / 3.6 - p.v) < 0.3, `phần “${p.ten}”: góc ${p.d.toFixed(1)}° khớp ${p.v}%`);
    });
    assert.ok(Math.abs(sum(h.phan.map((p) => p.v)) - 100) < 1e-9, "các phần cộng lại 100%");
    assert.deepEqual(h.phan.map((p) => p.ten).sort(), chuGiai.map((c) => c.ten).sort(), "mỗi hình đủ các nhóm của chú giải");
    const n = tx.filter((x) => /^Năm \d{4}$/.test(x.t) && close(+x.x, h.cx) && +x.y > h.cy + h.r);
    assert.equal(n.length, 1, "mỗi biểu đồ tròn một năm ở dưới");
    out[n[0].t.slice(4)] = Object.fromEntries(h.phan.map((p) => [p.ten, p.v]));
  });
  return out;
};

/* Biểu đồ đường: { dãy: [{ nam, v }] } */
const docDuong = (svg, donVi) => {
  daDoc.add(svg); LOAI_HINH.set(svg, "đường");
  const lu = luoi(svg), x0 = Math.min(...lu.map((l) => num(l, "x1"))), ys = lu.map((l) => num(l, "y1")), day = Math.max(...ys), tx = texts(svg);
  const gt = trucSo(tx.filter((t) => /^\d[\d ]*(,\d+)?$/.test(t.t) && t["text-anchor"] === "end" && +t.x < x0).map((t) => ({ v: val(t.t), y: +t.y })), ys, "trục số");
  assert.ok(tx.some((t) => t.t === donVi && !t["text-anchor"] && +t.y < Math.min(...ys)), "trục ghi đơn vị " + donVi);
  const nd = namDuoi(svg, day), ci = tags(svg, "circle"), chu = tags(svg, "line").filter((l) => l.stroke !== "line");
  const out = {};
  tags(svg, "polyline").forEach((pl) => {
    const lg = chu.filter((l) => l.stroke === pl.stroke && (l["stroke-dasharray"] || "") === (pl["stroke-dasharray"] || "") && ngang(l) && num(l, "y1") > day);
    assert.equal(lg.length, 1, "đường nào cũng có chú giải cùng nét");
    const tn = tx.filter((t) => close(+t.y, num(lg[0], "y1") + 5) && Math.abs(+t.x - (num(lg[0], "x2") + 6)) < 0.051);
    assert.equal(tn.length, 1, "chú giải có chữ ngay bên phải");
    const p = pts(pl.points);
    assert.ok(p.every((q, i) => !i || q[0] > p[i - 1][0]), "đường đi từ trái sang phải");
    out[tn[0].t] = p.map(([x, y]) => {
      assert.equal(ci.filter((c) => Math.abs(+c.cx - x) < 0.051 && Math.abs(+c.cy - y) < 0.051 && c.fill === pl.stroke).length, 1, "mỗi năm một chấm tròn cùng màu đường");
      const nh = tx.filter((t) => t["text-anchor"] === "middle" && Math.abs(+t.x - x) < 0.051 && (Math.abs(+t.y - (y - 8)) < 0.051 || Math.abs(+t.y - (y + 20)) < 0.051) && +t.y < day && /^\d[\d ]*(,\d+)?$/.test(t.t));
      assert.ok(nh.length >= 1 && nh.every((t) => t.t === nh[0].t), "mỗi chấm một số ngay trên hoặc dưới (điểm trùng của hai đường ghi chung một số)");
      if (nh.length > 1) assert.ok(ci.filter((c) => Math.abs(+c.cx - x) < 0.051 && Math.abs(+c.cy - y) < 0.051).length === nh.length, "chỉ điểm trùng mới có hai số");
      const v = val(nh[0].t); khop(gt, y, v, "điểm của đường " + tn[0].t);
      const n = nd.filter((t) => Math.abs(+t.x - x) < 0.051); assert.equal(n.length, 1, "điểm nào cũng có năm ở dưới");
      return { nam: +n[0].t, v };
    });
  });
  assert.ok(Object.keys(out).length >= 1, "có ít nhất một đường");
  return out;
};

/* Biểu đồ miền (cơ cấu %): { dãy: { năm: % } } */
const docMien = (svg) => {
  daDoc.add(svg); LOAI_HINH.set(svg, "miền");
  const tx = texts(svg), pg = tags(svg, "polygon"), chuGiai = chuGiaiCua(svg, tags(svg, "rect"));
  assert.ok(tx.some((t) => t.t === "%" && !t["text-anchor"]), "trục ghi đơn vị %");
  const x0 = Math.min(...pg.flatMap((p) => pts(p.points).map((q) => q[0]))), nhanTruc = tx.filter((t) => t["text-anchor"] === "end" && +t.x < x0 && /^\d+$/.test(t.t)).map((t) => ({ v: +t.t, y: +t.y }));
  assert.deepEqual(nhanTruc.map((n) => n.v).sort((a, b) => a - b), [0, 20, 40, 60, 80, 100], "trục 0–100%");
  const y0 = nhanTruc.find((n) => n.v === 0).y - 5, y100 = nhanTruc.find((n) => n.v === 100).y - 5, phanTram = (a, b) => ((a - b) / (y0 - y100)) * 100;
  nhanTruc.forEach((n) => assert.ok(Math.abs(n.y - 5 - (y0 - ((y0 - y100) * n.v) / 100)) < 0.051, "số trên trục cách đều"));
  const mien = pg.map((p) => {
    const q = pts(p.points), k = q.length / 2; assert.ok(Number.isInteger(k) && k >= 3, "miền có cạnh trên, cạnh dưới qua các năm");
    const tren = q.slice(0, k), duoi = q.slice(k).reverse();
    assert.ok(tren.every((t, i) => close(t[0], duoi[i][0]) && t[1] <= duoi[i][1] && (!i || t[0] > tren[i - 1][0])), "miền đi từ trái sang phải, cạnh trên ở trên");
    const c = chuGiai.find((g) => g.fill === p.fill); assert.ok(c, "màu miền có trong chú giải");
    return { ten: c.ten, tren, duoi };
  }).sort((a, b) => b.duoi[0][1] - a.duoi[0][1]);
  assert.ok(mien[0].duoi.every((d) => Math.abs(d[1] - y0) < 0.051) && mien[mien.length - 1].tren.every((t) => Math.abs(t[1] - y100) < 0.051), "các miền phủ từ 0 đến 100%");
  mien.forEach((m, j) => j && assert.ok(m.duoi.every((d, i) => close(d[1], mien[j - 1].tren[i][1])), "miền xếp chồng liền nhau"));
  const xs = mien[0].tren.map((t) => t[0]), nam = xs.map((x) => { const n = tx.filter((t) => /^\d{4}$/.test(t.t) && +t.y > y0 && Math.abs(+t.x - x) < 0.051); assert.equal(n.length, 1, "năm ở dưới mỗi mốc"); return n[0].t; });
  const out = {};
  mien.forEach((m) => {
    out[m.ten] = {};
    xs.forEach((x, i) => {
      const lo = m.duoi[i][1], hi = m.tren[i][1];
      const nh = tx.filter((t) => t["text-anchor"] === "middle" && Math.abs(+t.x - x) <= 18.05 && +t.y - 5 > hi && +t.y - 5 < lo && /^\d+(,\d+)?$/.test(t.t));
      assert.equal(nh.length, 1, `miền ${m.ten}, năm ${nam[i]}: một số ở giữa miền`);
      const v = val(nh[0].t); assert.ok(Math.abs(phanTram(lo, hi) - v) <= 0.1, `miền ${m.ten}, năm ${nam[i]}: bề dày ${phanTram(lo, hi).toFixed(2)}% khớp số ${v}`);
      out[m.ten][nam[i]] = v;
    });
  });
  nam.forEach((n) => assert.ok(Math.abs(sum(Object.values(out).map((o) => o[n])) - 100) < 1e-9, "năm " + n + ": các miền cộng lại 100%"));
  return out;
};

/* Biểu đồ kết hợp: cột (trục trái) và đường (trục phải) → { cot: { ten, donVi, v: [{nam, v}] }, duong: { … } } */
const docKetHop = (svg) => {
  daDoc.add(svg); LOAI_HINH.set(svg, "kết hợp");
  const lu = luoi(svg), x0 = Math.min(...lu.map((l) => num(l, "x1"))), x1 = Math.max(...lu.map((l) => num(l, "x2"))), ys = lu.map((l) => num(l, "y1")), day = Math.max(...ys), tx = texts(svg);
  const so = (t) => /^\d[\d ]*(,\d+)?$/.test(t.t);
  const gtL = trucSo(tx.filter((t) => so(t) && t["text-anchor"] === "end" && +t.x < x0).map((t) => ({ v: val(t.t), y: +t.y })), ys, "trục trái");
  const gtR = trucSo(tx.filter((t) => so(t) && t["text-anchor"] === "start" && +t.x > x1).map((t) => ({ v: val(t.t), y: +t.y })), ys, "trục phải");
  assert.ok(Math.abs(gtL(day)) < 1e-6 && Math.abs(gtR(day)) < 1e-6, "số 0 của hai trục ở đường đáy");
  const dvL = tx.filter((t) => !t["text-anchor"] && +t.y < Math.min(...ys) && +t.x < x0), dvR = tx.filter((t) => t["text-anchor"] === "end" && +t.y < Math.min(...ys) && +t.x > x1);
  assert.ok(dvL.length === 1 && dvR.length === 1, "hai trục ghi đơn vị");
  const nd = namDuoi(svg, day), hcn = tags(svg, "rect"), cot = hcn.filter((r) => num(r, "y") <= day), lg = hcn.filter((r) => num(r, "y") > day);
  assert.ok(cot.length >= 3 && lg.length === 1 && cot.every((r) => r.fill === lg[0].fill), "các cột cùng màu với ô chú giải");
  const tenCot = chuGiaiCua(svg, lg)[0].ten;
  const vCot = cot.map((r) => {
    assert.ok(close(num(r, "y") + num(r, "height"), day), "cột đứng trên đường đáy");
    const cx = num(r, "x") + num(r, "width") / 2, d = tx.filter((t) => t["text-anchor"] === "middle" && Math.abs(+t.x - cx) < 0.051 && Math.abs(+t.y - (num(r, "y") - 6)) < 0.051);
    assert.equal(d.length, 1, "mỗi cột một số ngay trên đỉnh"); const v = val(d[0].t); khop(gtL, num(r, "y"), v, "cột");
    const n = nd.filter((t) => Math.abs(+t.x - cx) < 0.051); assert.equal(n.length, 1, "cột nào cũng có năm ở dưới");
    return { nam: +n[0].t, v, cx };
  }).sort((a, b) => a.nam - b.nam);
  const pl = tags(svg, "polyline"); assert.equal(pl.length, 1, "một đường");
  const lgL = tags(svg, "line").filter((l) => l.stroke === pl[0].stroke && ngang(l) && num(l, "y1") > day); assert.equal(lgL.length, 1, "đường có chú giải");
  const tenDuong = tx.filter((t) => close(+t.y, num(lgL[0], "y1") + 5) && Math.abs(+t.x - (num(lgL[0], "x2") + 6)) < 0.051); assert.equal(tenDuong.length, 1);
  const ci = tags(svg, "circle"), p = pts(pl[0].points);
  assert.equal(p.length, vCot.length, "mỗi năm một điểm của đường");
  const vDuong = p.map(([x, y], i) => {
    assert.ok(Math.abs(x - vCot[i].cx) < 0.051, "điểm của đường ở giữa cột cùng năm");
    assert.equal(ci.filter((c) => Math.abs(+c.cx - x) < 0.051 && Math.abs(+c.cy - y) < 0.051 && c.fill === pl[0].stroke).length, 1, "chấm tròn ở mỗi điểm");
    const d = tx.filter((t) => t["text-anchor"] === "middle" && Math.abs(+t.x - x) < 0.051 && Math.abs(+t.y - (y - 8)) < 0.051);
    assert.equal(d.length, 1, "mỗi điểm một số ngay trên"); const v = val(d[0].t); khop(gtR, y, v, "điểm của đường");
    return { nam: vCot[i].nam, v };
  });
  return { cot: { ten: tenCot, donVi: dvL[0].t, v: vCot.map(({ nam, v }) => ({ nam, v })) }, duong: { ten: tenDuong[0].t, donVi: dvR[0].t, v: vDuong } };
};
// câu nhiều lựa chọn xét từng lựa chọn bằng luật (biểu thức chữ → hàm tính trên số liệu): lựa chọn nào cũng khớp đúng một luật, đúng một
// lựa chọn đúng; trả về lựa chọn đúng (so với o[0])
const dungMot = (q, LUAT) => {
  const dung = q.o.filter((o) => { const l = LUAT.map(([re, f]) => [re.exec(o), f]).filter(([m]) => m); assert.equal(l.length, 1, "lựa chọn nào cũng có đúng một luật: " + o); return l[0][1](l[0][0]); });
  assert.equal(dung.length, 1, "đúng một lựa chọn đúng: " + JSON.stringify(dung)); return dung[0];
};


/* ---------- trình tự thời gian (bảng ngày tháng theo Lịch sử 12 in năm 2026) ----------
   Mỗi sự kiện: [chữ nhận ra trong ô sắp xếp hay trong ý đúng/sai, ngày dạng YYYY-MM-DD, YYYY-MM hay YYYY để so, cách ghi ngày như sách
   (ghi trong lời giải), trang in]. Ý “A diễn ra trước B.” của câu đúng/sai 4 ý và câu sắp xếp tính lại bằng bảng này. */
const SU_KIEN = [
  // Bài 12 (tr. 74–76)
  ["sang Nhật Bản", "1905-01", "1905", 74], ["Điền – Quế – Việt liên minh", "1908", "1908", 74], ["Phan Châu Trinh sang Pháp", "1911", "1911", 74],
  ["Việt Nam Quang phục hội", "1912-01", "1912", 74], ["Đảng Cộng sản Pháp", "1920", "1920", 74], ["Hội Liên hiệp thuộc địa", "1921", "1921", 74],
  ["đến Liên Xô", "1923-06", "6 – 1923", 75], ["Hội Liên hiệp các dân tộc bị áp bức", "1925-07", "7 – 1925", 75], ["OSS", "1945-04", "4 – 1945", 76],
  // Bài 13 (tr. 77–80)
  ["Chỉ thị Kháng chiến kiến quốc", "1945-11-25", "25 – 11 – 1945", 77], ["Hiệp định Sơ bộ", "1946-03-06", "6 – 3 – 1946", 78],
  ["Tạm ước Việt – Pháp", "1946-09-14", "14 – 9 – 1946", 78], ["Liên minh nhân dân Việt – Miên – Lào", "1951", "1951", 78],
  ["Hiệp định Giơ-ne-vơ", "1954-07-21", "21 – 7 – 1954", 79], ["Hiệp định Pa-ri", "1973-01-27", "27 – 1 – 1973", 80]
];
const suKien = (s) => { const m = SU_KIEN.filter(([k]) => s.toLowerCase().includes(k.toLowerCase())); assert.equal(m.length, 1, "không nhận ra đúng một sự kiện: " + s); return m[0]; };
const theoThoiGian = (q) => { const sk = q.o.map(suKien); sk.forEach(([, , ghi]) => coX(q, ghi)); assert.equal(new Set(sk.map((s) => s[1])).size, sk.length, "các sự kiện khác ngày nhau");
  return [...q.o].sort((a, b) => (suKien(a)[1] < suKien(b)[1] ? -1 : 1)); };

/* ---------- các câu cần tính ----------
   id: ls1, ls2 (Lịch sử Đề 1, 2), dl1, dl2 (Địa lí Đề 1, 2); has: đoạn chữ có trong đúng một câu của môn. right(q) trả đáp án tính được
   (số, lựa chọn đúng, thứ tự đúng của câu sắp xếp, hoặc mảng 4 ý của câu đúng/sai, null ở ý không tính bằng code); essay(q) kiểm tra câu
   tự luận (thang chấm, bài gợi ý). */
const f1 = (x) => x.toFixed(1).replace(".", ","); // số một chữ số thập phân như đề ghi (36,0)
const nam = (o) => Object.keys(o).map(Number).sort((a, b) => a - b);
const tangLT = (a) => a.every((v, i) => !i || v > a[i - 1]), giamLT = (a) => a.every((v, i) => !i || v < a[i - 1]);
const CHECKS = [
  // ---- Lịch sử ----
  { id: "ls1", has: "Sắp xếp các hoạt động đối ngoại sau theo trình tự thời gian", right: theoThoiGian },
  { id: "ls2", has: "Sắp xếp các sự kiện sau trong hoạt động đối ngoại của Việt Nam theo trình tự thời gian", right: theoThoiGian },
  { id: "ls1", has: "ngoại giao chỉ giữ vai trò phụ", essay: (q) => {
    coThang(q, "không phải vai trò phụ", "“vừa đánh, vừa đàm”", "Hội nghị Pa-ri", "Liên Xô, Trung Quốc", "kết luận"); coX(q, "Hội nghị Pa-ri", "Liên Xô và Trung Quốc", "sức mạnh tổng hợp"); } },
  { id: "ls2", has: "hai điểm mới trong đường lối đổi mới", essay: (q) => {
    coThang(q, "hội nhập quốc tế toàn diện và sâu rộng", "kinh tế tri thức", "biểu hiện thực tế", "Giải thích"); coX(q, "kinh tế tri thức", "hiệp định thương mại tự do thế hệ mới"); } },
  // ---- Địa lí, Đề 1 ----
  { id: "dl1", has: "khối lượng hàng hoá thông qua cảng biển X", right: (q) => {
    const c = docCot(q.svg, "Triệu tấn"), [n1, n2] = y(q.q, /cảng X năm (\d{4}) so với năm (\d{4}) tăng thêm bao nhiêu phần trăm/).slice(1).map(Number);
    const b = c.find((p) => p.nam === n1).v, a = c.find((p) => p.nam === n2).v, v = ((b - a) / a) * 100;
    assert.equal(q.unit, "%"); coX(q, `(${vn(b)} − ${vn(a)}) : ${vn(a)} × 100 = ${vn(v)}`); return v; } },
  { id: "dl1", has: "khối lượng hàng hoá luân chuyển là 18 750", right: (q) => {
    const [vc] = so(q.q, "chở # triệu tấn hàng hoá"), [lc] = so(q.q, "luân chuyển là # triệu tấn.km"), v = lc / vc;
    assert.ok(q.unit === "km" && /bằng khối lượng luân chuyển chia cho khối lượng vận chuyển/.test(q.q), "đề ghi cách tính cự li");
    coX(q, `${vn(lc)} : ${vn(vc)} = ${vn(v)}`); return v; } },
  { id: "dl1", has: "cơ cấu điện năng sản xuất của tỉnh T", right: (q) => {
    const c = docTron(q.svg), [t] = so(q.q, "tổng điện năng sản xuất của tỉnh T là # tỉ kWh"), [n] = y(q.q, /Điện năng do thuỷ điện sản xuất năm (\d{4})/).slice(1), p = c[n]["Thuỷ điện"], v = (t * p) / 100;
    assert.equal(q.unit, "tỉ kWh"); coX(q, `${vn(t)} × ${vn(p)} : 100 = ${vn(v)}`); return v; } },
  { id: "dl1", has: "sản lượng than khai thác của tỉnh Q đạt", right: (q) => {
    const [s, r] = so(q.q, "đạt # triệu tấn, tăng #% so với năm 2015"), v = (s * 100) / (100 + r);
    assert.equal(q.unit, "triệu tấn"); coX(q, `${f1(s)} : ${vn(100 + r)} × 100 = ${vn(v)}`); return v; } },
  { id: "dl1", has: "cơ cấu giá trị sản xuất nông nghiệp, lâm nghiệp và thuỷ sản của tỉnh H", right: (q) => {
    const c = docMien(q.svg), N = c["Nông nghiệp"], L = c["Lâm nghiệp"], T = c["Thuỷ sản"], ns = nam(N), dau = ns[0], cuoi = ns[ns.length - 1];
    assert.ok(/^Tỉ trọng nông nghiệp giảm liên tục qua các năm\.$/.test(q.o[0]));
    const [nb] = y(q.o[1], /^Năm (\d{4}), tỉ trọng thuỷ sản gấp hơn ba lần tỉ trọng lâm nghiệp\.$/).slice(1);
    const [tu, den, k] = y(q.o[2], /^Từ năm (\d{4}) đến năm (\d{4}), tỉ trọng lâm nghiệp tăng thêm (\d+) điểm phần trăm\.$/).slice(1).map(Number);
    const [nd] = y(q.o[3], /^Năm (\d{4}), nông nghiệp vẫn chiếm hơn một nửa cơ cấu\.$/).slice(1);
    coX(q, ns.map((n) => N[n] + "%").join(" → "), `${vn(T[nb])} : ${vn(L[nb])} ≈ ${vn(lam(T[nb] / L[nb], 1))}`, `từ ${L[dau]}% lên ${L[cuoi]}%`);
    return [giamLT(ns.map((n) => N[n])), T[nb] > 3 * L[nb], L[den] - L[tu] === k, N[nd] > 50]; } },
  { id: "dl1", has: "du lịch tác động như thế nào đến kinh tế, xã hội và môi trường", essay: (q) => {
    coThang(q, "tác động đến kinh tế", "tác động đến xã hội", "tác động đến môi trường", "hai việc"); coX(q, "việc làm", "ô nhiễm"); } },
  // ---- Địa lí, Đề 2 ----
  { id: "dl2", has: "820 nghìn lao động đang làm việc", right: (q) => {
    const [t, d] = so(q.q, "có # nghìn lao động đang làm việc, trong đó # nghìn người"), v = (d / t) * 100;
    assert.equal(q.unit, "%"); coX(q, `${vn(d)} : ${vn(t)} × 100 = ${vn(v)}`); return v; } },
  { id: "dl2", has: "doanh thu dịch vụ bưu chính của tỉnh E", right: (q) => {
    const [a, b] = so(q.q, "tỉnh E là # nghìn tỉ đồng; năm 2024 đạt # nghìn tỉ đồng"), v = b / a;
    assert.equal(q.unit, "lần"); coX(q, `${vn(b)} : ${vn(a)} = ${vn(v)}`); return v; } },
  { id: "dl2", has: "số thuê bao điện thoại và số thuê bao internet của tỉnh G", right: (q) => {
    const c = docDuong(q.svg, "Nghìn thuê bao"), P = Object.fromEntries(c["Thuê bao điện thoại"].map((p) => [p.nam, p.v])), I = Object.fromEntries(c["Thuê bao internet"].map((p) => [p.nam, p.v]));
    assert.ok(/^Số thuê bao điện thoại tăng liên tục qua các năm\.$/.test(q.o[0]));
    const [nb, k, na] = y(q.o[1], /^Năm (\d{4}), số thuê bao internet gấp hơn (\d+) lần năm (\d{4})\.$/).slice(1).map(Number);
    const [c1, c2, c3, c4] = y(q.o[2], /^Số thuê bao internet tăng nhiều hơn ở giai đoạn (\d{4}) – (\d{4}) so với giai đoạn (\d{4}) – (\d{4})\.$/).slice(1).map(Number);
    const [nd] = y(q.o[3], /^Năm (\d{4}), số thuê bao internet đã nhiều hơn số thuê bao điện thoại\.$/).slice(1);
    coX(q, `${vn(I[nb])} : ${vn(I[na])} = ${vn(I[nb] / I[na])}`, `${vn(I[c2])} − ${vn(I[c1])} = ${vn(I[c2] - I[c1])}`, `${vn(I[c4])} − ${vn(I[c3])} = ${vn(I[c4] - I[c3])}`);
    return [tangLT(nam(P).map((n) => P[n])), I[nb] > k * I[na], I[c2] - I[c1] > I[c4] - I[c3], I[nd] > P[nd]]; } },
  { id: "dl2", has: "cán cân thương mại hàng hoá của tỉnh K", right: (q) => {
    const c = docCot(q.svg, "Tỉ USD"), [n] = y(q.q, /Năm (\d{4}), cán cân thương mại/).slice(1), x = c[n]["Xuất khẩu"], k = c[n]["Nhập khẩu"], v = x - k;
    assert.ok(q.unit === "tỉ USD" && /trị giá xuất khẩu trừ trị giá nhập khẩu/.test(q.q)); coX(q, `${vn(x)} − ${vn(k)} = ${vn(v)}`); return v; } },
  { id: "dl2", has: "số lượng trâu và bò của tỉnh N", right: (q) => {
    const c = docCot(q.svg, "Nghìn con"), ns = nam(c), tr = ns.map((n) => c[n]["Trâu"]), bo = ns.map((n) => c[n]["Bò"]);
    const LUAT = [
      [/^Số lượng trâu giảm, số lượng bò tăng liên tục$/, () => giamLT(tr) && tangLT(bo)],
      [/^Số lượng trâu luôn ít hơn số lượng bò$/, () => ns.every((n) => c[n]["Trâu"] < c[n]["Bò"])],
      [/^Năm (\d{4}), số lượng bò gấp đôi năm (\d{4})$/, (m) => Math.abs(c[m[1]]["Bò"] / c[m[2]]["Bò"] - 2) < 0.05],
      [/^Số lượng trâu tăng liên tục qua các năm$/, () => tangLT(tr)]
    ];
    coX(q, tr.join(" → "), bo.join(" → ")); return dungMot(q, LUAT); } },
  { id: "dl2", has: "giá trị sản xuất công nghiệp của tỉnh B (cột)", right: (q) => {
    const c = docKetHop(q.svg), C = Object.fromEntries(c.cot.v.map((p) => [p.nam, p.v])), D = Object.fromEntries(c.duong.v.map((p) => [p.nam, p.v])), ns = nam(C);
    assert.ok(c.cot.donVi === "Nghìn tỉ đồng" && c.duong.donVi === "%", "đơn vị hai trục");
    const [nb, k, na] = y(q.o[0], /^Giá trị sản xuất công nghiệp của tỉnh B năm (\d{4}) gấp (\d+) lần năm (\d{4})\.$/).slice(1).map(Number);
    assert.ok(/^Tỉ trọng của tỉnh B trong giá trị sản xuất công nghiệp của vùng tăng liên tục\.$/.test(q.o[1]));
    const m3 = y(q.o[2], new RegExp("^Năm (\\d{4}), giá trị sản xuất công nghiệp của cả vùng là (" + NUM + ") nghìn tỉ đồng\\.$")), n3 = +m3[1], vung = (C[n3] / D[n3]) * 100;
    const [t1, t2] = y(q.o[3], /^Giai đoạn (\d{4}) – (\d{4}), giá trị sản xuất công nghiệp của tỉnh B tăng ít nhất\.$/).slice(1).map(Number), tang = ns.slice(1).map((n, i) => C[n] - C[ns[i]]);
    coX(q, `${vn(C[nb])} : ${vn(C[na])} = ${vn(C[nb] / C[na])}`, `${vn(C[n3])} : ${vn(D[n3])} × 100 = ${vn(vung)}`, tang.join(", "));
    return [gan(C[nb] / C[na], k), tangLT(ns.map((n) => D[n])), gan(vung, val(m3[2])), C[t2] - C[t1] === Math.min(...tang)]; } },
  { id: "dl2", has: "Đồng bằng sông Hồng có ngành công nghiệp phát triển hàng đầu cả nước", essay: (q) => {
    coThang(q, "Thủ đô Hà Nội", "nhân lực", "vốn đầu tư", "hướng phát triển"); coX(q, "chuỗi giá trị toàn cầu", "bảo vệ môi trường"); } },
  { id: "dl2", has: "Năng suất lúa cả năm của tỉnh T", right: (q) => {
    const [s, sl] = so(q.q, "diện tích lúa cả năm # nghìn ha, sản lượng lúa cả năm # nghìn tấn"), v = sl / s;
    assert.equal(q.unit, "tạ/ha"); coX(q, `${vn(sl)} : ${vn(s)} = ${vn(v)} (tấn/ha) = ${vn(v * 10)} (tạ/ha)`); return v * 10; } }
];


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
        assert.ok(q.tol === undefined, "đáp án chính xác, không cần sai số");
      } else if (q.type === "tf4") {
        assert.ok(Array.isArray(want) && want.length === 4, "câu đúng/sai 4 ý: right trả mảng 4 ý");
        assert.ok(want.filter((w) => w !== null).length >= 2, "câu đúng/sai 4 ý: tính lại ít nhất hai ý");
        want.forEach((w, i) => w === null || assert.strictEqual(q.a[i], w, "ý " + "abcd"[i] + ": đáp án " + q.a[i] + ", tính được " + w));
      } else if (q.type === "order") {
        assert.deepEqual(q.o, want, "thứ tự " + JSON.stringify(q.o) + ", tính được " + JSON.stringify(want));
      } else {
        assert.strictEqual(q.o[0], want, "đáp án " + q.o[0] + ", tính được " + want); assert.ok(!q.o.slice(1).includes(want), "nhiễu trùng đáp án đúng");
      }
    }
  } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
  daKiem.add(q); n++;
});
// ý đúng/sai “A trước B” của câu Lịch sử: so ngày của hai sự kiện theo bảng; lời giải ghi ngày của cả hai
LS.kho.filter((q) => q.type === "tf4").forEach((q) => q.o.forEach((o, i) => {
  const m = /^(.+) diễn ra trước (.+)\.$/.exec(o); if (!m) return;
  const a = suKien(m[1]), b = suKien(m[2]);
  assert.equal(q.a[i], a[1] < b[1], `“${o}”: ${a[2]} và ${b[2]}`); coX(q, a[2], b[2]); n++; daKiem.add(q);
}));
// câu trả lời bằng số, câu có hình, câu sắp xếp, câu tự luận nào cũng phải được tính lại, đọc lại ở trên
MON.forEach((m) => m.kho.filter((q) => q.svg || q.type === "num" || q.type === "essay" || q.type === "order").forEach((q) => assert.ok(daKiem.has(q), "chưa có kiểm tra cho câu " + ten.get(q) + ": " + q.q.slice(0, 60))));
MON.forEach((m) => m.kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + ten.get(q))));
assert.equal(LS.kho.filter((q) => q.svg).length, 0, "Lịch sử: không có hình");
{
  const loai = (kind) => DL.kho.filter((q) => q.svg && LOAI_HINH.get(q.svg) === kind).length;
  ["cột", "tròn", "đường", "miền", "kết hợp"].forEach((k) => assert.ok(loai(k) >= 1, "Địa lí: có biểu đồ " + k));
  DL.DE.forEach((id) => assert.ok(DL.kho.filter((q) => q.src === id && q.svg).length >= 2, id + ": ít nhất hai câu có biểu đồ"));
}

/* ---------- chữ ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || [], (q.rubric || []).map((c) => c.c)).map(String);
// 34 đơn vị hành chính cấp tỉnh (Nghị quyết 202/2025/QH15; Địa lí 12 in năm 2026, Bài 1) và 6 vùng kinh tế – xã hội (Nghị quyết 252/2025/QH15)
const TINH = ["Hà Nội", "Huế", "Hải Phòng", "Đà Nẵng", "Cần Thơ", "Thành phố Hồ Chí Minh", "Lai Châu", "Điện Biên", "Sơn La", "Lạng Sơn", "Quảng Ninh",
  "Thanh Hoá", "Nghệ An", "Hà Tĩnh", "Cao Bằng", "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ", "Bắc Ninh", "Hưng Yên", "Ninh Bình", "Quảng Trị",
  "Quảng Ngãi", "Gia Lai", "Khánh Hoà", "Lâm Đồng", "Đắk Lắk", "Đồng Nai", "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang"];
assert.equal(TINH.length, 34);
// tỉnh, thành phố của ba vùng trong phạm vi (Địa lí 12 in năm 2026, Bài 24, 25, 27)
const VUNG_TINH = { "Trung du và miền núi phía Bắc": ["Lai Châu", "Điện Biên", "Sơn La", "Lào Cai", "Phú Thọ", "Tuyên Quang", "Cao Bằng", "Lạng Sơn", "Thái Nguyên"],
  "Đồng bằng sông Hồng": ["Hà Nội", "Hải Phòng", "Hưng Yên", "Ninh Bình", "Bắc Ninh", "Quảng Ninh"], "Bắc Trung Bộ": ["Huế", "Thanh Hoá", "Nghệ An", "Hà Tĩnh", "Quảng Trị"] };
assert.equal(sum(Object.values(VUNG_TINH).map((v) => v.length)), 20);
// tên tỉnh đã nhập năm 2025 (không viết như tỉnh hiện nay)
const TINH_CU = ["Hà Giang", "Yên Bái", "Bắc Kạn", "Vĩnh Phúc", "Hoà Bình", "Bắc Giang", "Thái Bình", "Hải Dương", "Hà Nam", "Nam Định", "Quảng Bình",
  "Quảng Nam", "Kon Tum", "Bình Định", "Phú Yên", "Ninh Thuận", "Bình Thuận", "Đắk Nông", "Bà Rịa – Vũng Tàu", "Bà Rịa - Vũng Tàu", "Bình Dương", "Bình Phước",
  "Long An", "Tiền Giang", "Bến Tre", "Trà Vinh", "Hậu Giang", "Sóc Trăng", "Bạc Liêu", "Kiên Giang", "Thừa Thiên Huế"];
MON.forEach((m) => m.kho.forEach((q) => {
  const at = ten.get(q) + ": " + q.q.slice(0, 50);
  chu(q).forEach((s) => {
    // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân (năm viết liền: 2025)
    assert.ok(!/(?<![,\d])\d{5,}/.test(s) && !/(?<![,\d])\d{4}(?![\d ])/.test(s.replace(/\b(?:1[89]|20)\d{2}\b/g, "")) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s);
    // dấu thanh kiểu sách (hoá, thuỷ, hoà, khoẻ, tuỳ)
    assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|lũy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s);
    // địa danh theo đơn vị hành chính hiện nay: không “huyện”, “cấp huyện”, “63 tỉnh”; tỉnh đã nhập chỉ ghi kèm “nay thuộc …”
    assert.ok(!/(?<![\p{L}])(?:huyện|63 tỉnh|64 tỉnh)(?![\p{L}])/iu.test(s), at + ": đơn vị hành chính cũ: " + s);
    // tên nhà máy thuỷ điện giữ như sách (thuỷ điện Hoà Bình), Thái Bình Dương, sông Thái Bình (“sông Hồng, Thái Bình”) không phải tên tỉnh
    const s2 = s.replace(/(?:[Cc]hiến dịch|thuỷ điện) Hoà Bình|Thái Bình Dương|sông (?:Hồng, )?Thái Bình/g, "");
    TINH_CU.forEach((t) => { if (s2.includes(t)) assert.ok(new RegExp(escRe(t) + " \\(nay (?:thuộc|là) ").test(s2), at + ": tên tỉnh cũ “" + t + "” không ghi tên mới"); });
    [...s.matchAll(/(?:tỉnh|thành phố) (\p{Lu}[\p{L}]*(?: \p{Lu}[\p{L}]*)*)/gu)].forEach((x) => assert.ok(TINH.includes(x[1]) || TINH.includes("Thành phố " + x[1]) || /^\p{Lu}$/u.test(x[1]) || /^Hồ Chí Minh$/.test(x[1]), at + ": tên tỉnh, thành phố không có trong 34 đơn vị: " + x[0]));
  });
  if (q.type === "num" && q.unit) assert.ok(q.unit.length <= 9, at + ": đơn vị ngắn");
}));
// Lịch sử: ngày tháng viết như sách (“6 – 3 – 1946”, “tháng 6 – 1923”), không “6/3/1946”, “6-3-1946” (tỉ số như “189/193” thì được)
LS.kho.forEach((q) => chu(q).forEach((s) => assert.ok(!/(?<!\d)\d{1,2}\/\d{1,2}(?!\d)(?:\/\d{4})?|\b\d{1,2}-\d{1,2}-\d{4}\b|\d – \d{1,2}\/|tháng \d{1,2}\/\d{4}/.test(s), ten.get(q) + ": ngày tháng viết như sách (“6 – 3 – 1946”): " + s)));
// Địa lí: vùng kinh tế – xã hội gọi đúng tên của sách in năm 2026; câu kể tỉnh của một vùng thì đúng tỉnh của vùng đó
DL.kho.forEach((q) => chu(q).forEach((s) => assert.ok(!/vùng (?:kinh tế – xã hội )?(?:Tây Nguyên|Duyên hải Nam Trung Bộ(?! và Tây Nguyên))/.test(s) && !/(?:7|bảy) vùng kinh tế/.test(s), ten.get(q) + ": tên vùng theo 6 vùng kinh tế – xã hội: " + s)));
assert.equal(DL.kho.filter((q) => /bốn tỉnh nào\?$/.test(q.q)).length, 2, "Địa lí: hai câu hỏi bốn tỉnh của vùng");
DL.kho.filter((q) => /bốn tỉnh nào\?$/.test(q.q)).forEach((q) => {
  const v = /Đồng bằng sông Hồng/.test(q.q) ? "Đồng bằng sông Hồng" : "Bắc Trung Bộ", tinh = (o) => o.split(", ");
  assert.deepEqual(tinh(q.o[0]).sort(), VUNG_TINH[v].filter((t) => !["Hà Nội", "Hải Phòng", "Huế"].includes(t)).sort(), ten.get(q) + ": đáp án đúng bốn tỉnh của " + v);
  q.o.slice(1).forEach((o) => { assert.equal(tinh(o).length, 4); assert.ok(tinh(o).every((t) => TINH.includes(t)) && tinh(o).some((t) => !VUNG_TINH[v].includes(t)), ten.get(q) + ": lựa chọn sai có tỉnh ngoài vùng: " + o); });
  n++;
});

/* ---------- lời dặn, mức độ, ma trận ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
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
    // lời dặn: sách và phạm vi, số câu mỗi phần (tính từ ma trận), trường học khác phạm vi, câu cuối; không có câu về đề chung của Sở
    const note = bank(id).note;
    assert.ok(note.startsWith(m.DAU + m.PHAN[0][0]), id + ": lời dặn mở đầu bằng sách, phạm vi");
    m.PHAN.forEach(([p, tu, den]) => { const k = sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))); assert.ok(note.includes(p + " " + k + " câu"), id + ": lời dặn ghi “" + p + " " + k + " câu”"); });
    assert.equal(sum(m.PHAN.map(([, tu, den]) => sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))))), m.pool.n, m.ma + ": các phần của lời dặn phủ hết ma trận");
    m.SAU.forEach((s) => assert.ok(note.includes(s), id + ": lời dặn có “" + s + "”"));
    assert.ok(!/Sở GD&ĐT|đề chung/.test(note), id + ": đề giữa kì không có câu về đề chung của Sở");
    assert.ok(note.endsWith(m.CUOI), id + ": lời dặn kết thúc bằng “" + m.CUOI + "”");
  });
  // chủ đề đúng tên bài trong mục lục (README của cuốn ở OnUp-Book); tên chủ đề, phần của lời dặn đúng mục lục
  const readme = path.join(BOOK, "lop-12", m.sach, "README.md");
  if (fs.existsSync(readme)) {
    const md = fs.readFileSync(readme, "utf8"), ml = Object.fromEntries([...md.matchAll(/Bài (\d+)[.:] ([^|*·]+?) \|/g)].map((x) => [+x[1], x[2].trim()]));
    m.BAI.forEach(([t, b]) => assert.equal(m.RUT_GON[t] || t, ml[b], m.ma + ": tên Bài " + b + " theo mục lục"));
    m.PHAN.forEach(([p]) => { const c = /^(Chủ đề|Phần) (\d+) ([^(,]+?)(?: \(|,)/.exec(p); assert.ok(c && md.includes((c[1] === "Phần" ? "PHẦN" : c[1]) + " " + c[2] + ". " + c[3].toUpperCase()), m.ma + ": tên " + p.slice(0, 20) + " theo mục lục"); });
    // bài thực hành trong phạm vi không ra chủ đề riêng
    const [tu, den] = /Bài (\d+)–(\d+)/.exec(m.PHAM_VI).slice(1).map(Number);
    for (let b = tu; b <= den; b++) assert.ok(/^Thực hành/.test(ml[b] || "") === !m.BAI.some((x) => x[1] === b), m.ma + ": Bài " + b + (m.BAI.some((x) => x[1] === b) ? " là bài thực hành" : " không phải bài thực hành mà thiếu chủ đề"));
  }
  // dạng câu theo khung Công văn 7991: nhiều lựa chọn, đúng/sai 4 ý, trả lời ngắn (số), tự luận tự chấm; Lịch sử có thêm câu sắp xếp sự kiện
  assert.ok(m.kho.every((q) => (m === LS ? ["mc", "tf4", "order", "essay"] : ["mc", "tf4", "num", "essay"]).includes(q.type)), m.ma + ": dạng câu");
  const dem = (f) => m.kho.filter(f).length;
  if (m === DL) assert.ok(dem((q) => q.type === "num") >= 4, m.ma + ": ít nhất 4 câu trả lời ngắn đáp án là số");
  if (m === LS) assert.ok(dem((q) => q.type === "order") <= 2, m.ma + ": nhiều nhất 2 câu sắp xếp");
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
  // lời giải không nói “ý thứ hai”, “phương án A”: app xáo phương án
  m.kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50)));
  // câu sắp xếp: 4 ô, mỗi ô là một sự kiện trong bảng ngày tháng
  m.kho.filter((q) => q.type === "order").forEach((q) => assert.ok(q.o.length === 4 && /theo trình tự thời gian/.test(q.q), "câu sắp xếp 4 sự kiện theo trình tự thời gian: " + ten.get(q)));
  // câu nhiều lựa chọn: đáp án đúng không dài hơn hẳn lựa chọn sai, các lựa chọn không trùng nhau, đáp án đúng không là lựa chọn duy nhất có
  // chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), mc = m.kho.filter((q) => q.type === "mc");
  mc.forEach((q) => {
    const L = Math.max(...q.o.slice(1).map((o) => o.length));
    assert.ok(q.o.length === 4 && q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q) + " " + q.q.slice(0, 50));
    assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + q.q.slice(0, 50));
    const c = chuThuong(q.topic.replace(/\s*\([^)]*\)$/, "")), tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|sau|từ|đến|năm)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề: ${ten.get(q)} ${q.q.slice(0, 60)}`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    assert.ok(!(dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”: " + ten.get(q));
  });
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn
  const le = mc.filter((q) => { const L = q.o.map((o) => o.length); return L[0] > Math.max(...L.slice(1)) || L[0] < Math.min(...L.slice(1)); });
  assert.ok(le.length * 3 <= mc.length && le.length * 6 >= mc.length, `${m.ma}: đáp án đúng dài nhất hoặc ngắn nhất ở ${le.length}/${mc.length} câu: ` + le.map((q) => ten.get(q)).join(", "));
  m.le = le.length + "/" + mc.length;
  // đáp án đúng của câu nhiều lựa chọn không trùng đáp án đúng của câu nào ở kho cuối kì I
  const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
  const daCu = new Set(m.ck1.filter((q) => q.type === "mc").map((q) => goc(q.o[0])));
  mc.forEach((q) => assert.ok(!daCu.has(goc(q.o[0])), m.ma + ": đáp án trùng một câu của kho cuối kì I: " + ten.get(q)));

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
  // đề bài không trùng câu nào khác trong file, cả kho cuối kì I (so sau khi bỏ dấu câu, khoảng trắng)
  const caFile = BANKS.filter((b) => b.file === m.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)).map((q) => goc(q.q));
  m.kho.forEach((q) => assert.equal(caFile.filter((k) => k === goc(q.q)).length, 1, "đề bài trùng câu khác trong " + m.file + ": " + ten.get(q)));
});

/* ---------- so với kho cuối kì I cùng môn: đề bài không gần trùng ----------
   Cặp hai âm tiết liền nhau (Rút ra N25; như tests/sinhhoc-ktpl12-gk2.js): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của kho
   cuối kì I và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì báo. Không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung
   của đề (CUM) và cặp có ở từ 3% số câu của file. */
{
  const CUM = ["mỗi ý sau đúng hay sai", "nhận xét nào sau đây đúng", "số liệu tự đặt", "theo trình tự thời gian", "sự kiện sớm nhất đứng đầu"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const gan_ = [];
  MON.forEach((m) => {
    const ca = BANKS.filter((b) => b.file === m.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), df = {};
    ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
    const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && !(df[c] >= 0.03 * ca.length))); };
    m.kho.forEach((q) => { const c = capAm(q); m.ck1.forEach((p) => { const d = capAm(p), chung = [...c].filter((x) => d.has(x)); if (chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`); }); });
  });
  assert.deepEqual(gan_, [], "đề bài gần trùng câu của kho cuối kì I");
}


/* ---------- danh sách dùng khi dò lộ đáp án và so chữ với sách ---------- */
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["xã hội chủ", "hội chủ nghĩa", "nước xã hội", "các nước xã", "và các nước", "của nhân dân", "nền kinh tế", "thực dân pháp",
  "việt nam dân", "nam dân chủ", "dân chủ cộng", "chủ cộng hoà", "nước việt nam", "trung hoa dân", "hoa dân quốc", "văn hoá xã", "hoá xã hội",
  "khoa học công", "học công nghệ", "để phát triển", "phát triển của", "nhất cả nước", "của cả nước", "tăng liên tục"]);
// đã xem (Phiên N12-gk2-lichsu-diali): chữ chung, câu kia không nói tới điều câu này hỏi. Tên tỉnh (Lào Cai), tên văn kiện, tổ chức (Hiệp định
// Giơ-ne-vơ, Liên hợp quốc), tên quân đội (quân Trung Hoa Dân quốc ở miền Bắc) chỉ có ở câu kia trong bối cảnh khác hoặc là lựa chọn sai, không cho
// biết điều câu này hỏi; “hàng điện tử” ở câu xuất khẩu và ngành điện tử ở Đồng bằng sông Hồng không cho biết nhóm hàng nhập khẩu lớn nhất (và
// ngược lại); “chuyển đổi số” của ngành dịch vụ nói chung không chỉ ra hướng phát triển của viễn thông (các lựa chọn sai của câu đó đều trái hẳn);
// “tôn trọng chủ quyền” có ở đáp án của cả câu Hiệp định Pa-ri và câu Liên minh Việt – Miên – Lào, mỗi câu tự có lựa chọn sai riêng; “đánh đuổi
// thực dân Pháp” ở câu kia là lựa chọn sai; “nước ta tham gia” ở câu kia nói về kinh tế, thương mại, không nói về khoa học – công nghệ; “Liên Xô
// và Trung Quốc” ở bài gợi ý câu tự luận (kháng chiến chống Mỹ) không nói tới năm 1950.
const DA_XEM = [
  "ls1#4 → ls1#5: liên hợp quốc", "ls2#20 → ls1#5: liên hợp quốc", "ls2#21 → ls1#5: liên hợp quốc", "ls2#22 → ls1#5: liên hợp quốc",
  "ls2#16 → ls1#17: với tổ chức", "ls1#23 → ls1#20: quân trung hoa", "ls1#23 → ls1#20: ở miền bắc", "ls2#20 → ls1#20: giải giáp quân",
  "ls2#20 → ls1#20: giáp quân nhật", "ls1#25 → ls1#21: liên xô và", "ls2#23 → ls1#22: hiệp định giơ", "ls2#23 → ls1#22: định giơ ne",
  "ls2#23 → ls1#22: giơ ne vơ", "ls2#10 → ls2#6: vùng lãnh thổ", "ls1#13 → ls2#10: nước ta tham", "ls1#13 → ls2#10: ta tham gia",
  "ls1#17 → ls2#10: tham gia nhiều", "ls2#5 → ls2#10: nước ta tham", "ls2#5 → ls2#10: ta tham gia", "ls2#5 → ls2#10: tham gia nhiều",
  "ls2#12 → ls2#10: quốc tế về", "ls1#17 → ls2#17: đánh đuổi thực", "ls1#17 → ls2#17: đuổi thực dân", "ls1#23 → ls2#17: đánh đuổi thực",
  "ls1#23 → ls2#17: đuổi thực dân", "ls2#16 → ls2#19: chống phát xít", "ls2#22 → ls2#21: tôn trọng chủ", "ls2#22 → ls2#21: trọng chủ quyền",
  "ls2#21 → ls2#22: tôn trọng chủ", "ls2#21 → ls2#22: trọng chủ quyền", "dl2#21 → dl1#4: đường bộ", "dl1#19 → dl1#10: điện tử máy",
  "dl2#9 → dl1#10: hàng điện tử", "dl1#10 → dl1#19: điện tử máy", "dl2#1 → dl1#20: thị trường lớn", "dl2#11 → dl1#20: thị trường lớn",
  "dl1#2 → dl2#5: chuyển đổi số", "dl1#20 → dl2#12: vốn đầu tư", "dl2#21 → dl2#12: vốn đầu tư", "dl1#18 → dl2#15: lào cai",
  "dl2#23 → dl2#17: số lượng trâu", "dl2#1 → dl2#24: dài với nhiều"
];
// tên riêng nhiều chữ (tổ chức, văn kiện, sự kiện, hội nghị, chương trình, địa danh, vùng, ngư trường, công trình, ngành): mỗi tên tính là
// một từ khi so với chữ của sách và của kho khác (như tests/lichsu-diali12-ck1.js)
const GOP = [
  // Lịch sử, Bài 10–11
  "Đại hội đại biểu toàn quốc lần thứ VI", "Đại hội đại biểu toàn quốc lần thứ VII", "Đại hội đại biểu toàn quốc lần thứ VIII", "Đại hội đại biểu toàn quốc lần thứ IX",
  "Đại hội đại biểu toàn quốc lần thứ X", "Đại hội đại biểu toàn quốc lần thứ XI", "Đại hội đại biểu toàn quốc lần thứ XII", "Đại hội đại biểu toàn quốc lần thứ XIII",
  "Đại hội đại biểu toàn quốc", "Đảng Cộng sản Việt Nam", "Ba chương trình kinh tế lớn", "Cương lĩnh xây dựng đất nước trong thời kì quá độ lên chủ nghĩa xã hội",
  "Chiến lược ổn định và phát triển kinh tế – xã hội", "Nhà nước pháp quyền xã hội chủ nghĩa", "kinh tế thị trường định hướng xã hội chủ nghĩa",
  "đường dây 500 kV Bắc – Nam", "đường dây 500 kV", "cao tốc Thành phố Hồ Chí Minh – Trung Lương", "Trung Lương", "Tổ chức Thương mại Thế giới", "Liên hợp quốc",
  "Hội đồng Bảo an", "Hội đồng Nhân quyền", "Diễn đàn Hợp tác kinh tế châu Á – Thái Bình Dương", "Hiệp hội các quốc gia Đông Nam Á", "Cộng đồng ASEAN",
  "Mục tiêu Phát triển Thiên niên kỉ", "Chỉ số Đổi mới sáng tạo toàn cầu", "COVID-19", "Việt Nam",
  // Lịch sử, Bài 12–13
  "Phan Bội Châu", "Phan Châu Trinh", "Nguyễn Ái Quốc", "Hồ Chí Minh", "Phong trào Đông du", "Duy tân hội", "Việt Nam Quang phục hội", "Điền – Quế – Việt liên minh",
  "Đông Á Đồng minh hội", "Hội Liên hiệp thuộc địa", "Hội Liên hiệp các dân tộc bị áp bức", "Quốc tế Cộng sản", "Đảng Cộng sản Pháp", "Đảng Cộng sản Đông Dương",
  "Đảng Cộng sản Trung Quốc", "Đảng Xã hội Pháp", "Việt Nam Cách mạng thanh niên", "Mặt trận Việt Minh", "Việt Minh", "Việt Nam Cách mạng đồng minh hội",
  "Cơ quan Tình báo chiến lược Mỹ", "Trung Hoa Dân quốc", "Việt Nam Dân chủ Cộng hoà", "Chỉ thị Kháng chiến kiến quốc", "Hiệp định Sơ bộ", "Tạm ước Việt – Pháp",
  "Hội nghị Phông-ten-nơ-blô", "Phông-ten-nơ-blô", "Liên minh nhân dân Việt – Miên – Lào", "Hội nghị Giơ-ne-vơ", "Hiệp định Giơ-ne-vơ", "Giơ-ne-vơ", "Hội nghị Pa-ri",
  "Hiệp định Pa-ri", "Pa-ri", "Mặt trận Dân tộc giải phóng miền Nam Việt Nam", "Chính phủ cách mạng lâm thời Cộng hoà miền Nam Việt Nam", "Cộng hoà miền Nam Việt Nam",
  "Việt Nam Cộng hoà", "Đại hội đồng Liên hợp quốc", "Liên Xô", "Trung Quốc", "Nhật Bản", "Thái Lan", "Quảng Châu", "Miến Điện", "Mã Lai", "In-đô-nê-xi-a",
  "Cam-pu-chia", "Đông Dương", "Đông Nam Á", "Á, Phi, Mỹ La-tinh", "Mỹ La-tinh", "Cách mạng tháng Tám năm 1945", "Cách mạng tháng Tám", "Chiến tranh thế giới thứ hai",
  "Chiến tranh thế giới thứ nhất",
  // Địa lí, Bài 20–27: vùng, địa danh, công trình, ngư trường, cảng, khu du lịch, mỏ
  "Trung du và miền núi phía Bắc", "Đồng bằng sông Hồng", "Bắc Trung Bộ", "Duyên hải Nam Trung Bộ và Tây Nguyên", "Đông Nam Bộ", "Đồng bằng sông Cửu Long",
  "Thành phố Hồ Chí Minh", "Hà Nội", "Hải Phòng", "Đà Nẵng", "Cần Thơ", "Huế", "Thanh Hoá", "Nghệ An", "Hà Tĩnh", "Quảng Trị", "Quảng Ninh", "Hưng Yên", "Ninh Bình",
  "Bắc Ninh", "Lai Châu", "Điện Biên", "Sơn La", "Lào Cai", "Phú Thọ", "Tuyên Quang", "Cao Bằng", "Lạng Sơn", "Thái Nguyên", "Khánh Hoà", "Lâm Đồng",
  "đường sắt Thống Nhất", "quốc lộ 1", "đường Hồ Chí Minh", "Nội Bài", "Tân Sơn Nhất", "Long Thành", "Cái Mép – Thị Vải", "Lạch Huyện", "Nghi Sơn", "Vũng Áng",
  "Hòn La", "Chân Mây", "Cửa Lò", "Sầm Sơn", "Thiên Cầm", "Lăng Cô", "Phong Nha – Kẻ Bàng", "Mẫu Sơn", "Sa Pa", "Hồ Ba Bể", "Hồ Núi Cốc", "Tân Trào",
  "Mộc Châu", "Điện Biên Phủ", "Thác Bản Giốc", "Hạ Long", "Vịnh Hạ Long", "Cát Bà", "Tràng An", "Tam Đảo", "Hải Phòng – Quảng Ninh", "Vịnh Bắc Bộ",
  "Hoàng Liên Sơn", "Trường Sơn Bắc", "sông Đà", "sông Hồng", "sông Thái Bình", "sông Đồng Nai", "sông Mê Công", "Hoà Bình", "Sơn La", "Lai Châu", "Tuyên Quang",
  "Thác Bà", "Bản Chát", "Huội Quảng", "Biển Đông", "Trung Quốc", "Lào", "Cam-pu-chia", "Liên minh châu Âu", "Hoa Kỳ", "Hàn Quốc",
  "Cảng Hải Phòng", "Đình Vũ", "Hải Hà", "Vân Đồn", "Cẩm Phả", "Hòn Gai", "Uông Bí", "Mạo Khê", "Quỳnh Lập", "Thạch Khê", "Cổ Định", "Nhật Lệ", "Bãi Cháy",
  "Nam Côn Sơn", "Cộng hoà Nhân dân Trung Hoa", "Uỷ ban Giám sát quốc tế", "châu Á – Thái Bình Dương", "vị trí địa lí",
  // tên khu vực kinh tế như sách Địa lí 12 (như tests/lichsu-diali12-ck1.js)
  "nông nghiệp, lâm nghiệp và thuỷ sản", "công nghiệp và xây dựng"
];
// cụm từ chung của môn: tên bài, tên chủ đề, cách nói chuẩn của đề (thay bằng dấu ngăn trước khi so)
const TU_CHUNG = [...LS.BAI, ...DL.BAI].map((b) => b[0]).concat(Object.values(LS.RUT_GON), Object.values(DL.RUT_GON), ["mỗi ý sau đúng hay sai",
  "Sắp xếp các sự kiện sau theo trình tự thời gian", "sự kiện sớm nhất đứng đầu", "Nhận xét nào sau đây đúng", "Cho biểu đồ", "Theo biểu đồ", "số liệu tự đặt",
  "làm tròn kết quả đến hàng đơn vị", "làm tròn kết quả đến một chữ số thập phân", "Công cuộc Đổi mới ở Việt Nam từ năm 1986 đến nay",
  "Lịch sử đối ngoại của Việt Nam thời cận – hiện đại", "Địa lí các ngành kinh tế", "Địa lí các vùng kinh tế – xã hội", "vùng kinh tế – xã hội",
  "Em hãy nêu ý kiến của em về",
  // Lịch sử, Bài 10–11: tên đường lối, chủ trương, bài học của công cuộc Đổi mới, các quyền dân tộc cơ bản, tên công trình, chức danh như sách
  "hội nhập kinh tế quốc tế", "chủ động, tích cực hội nhập quốc tế toàn diện và sâu rộng", "cơ chế quản lí kinh tế tập trung quan liêu, bao cấp",
  "tập trung quan liêu, bao cấp", "cơ chế thị trường có sự quản lí của Nhà nước", "Kiên trì mục tiêu độc lập dân tộc và chủ nghĩa xã hội",
  "Đổi mới toàn diện, đồng bộ, có bước đi, hình thức và cách làm phù hợp", "Kết hợp sức mạnh dân tộc với sức mạnh thời đại", "Kết hợp sức mạnh dân tộc và sức mạnh thời đại",
  "phát huy vai trò chủ động, sáng tạo của nhân dân", "phát huy quyền làm chủ của nhân dân", "tôn trọng quy luật khách quan", "xuất phát từ thực tiễn",
  "Nhà nước pháp quyền xã hội chủ nghĩa", "đẩy mạnh công nghiệp hoá, hiện đại hoá đất nước", "công nghiệp hoá, hiện đại hoá", "kinh tế thị trường định hướng xã hội chủ nghĩa",
  "kinh tế tri thức", "hiệp định thương mại tự do thế hệ mới", "nền văn hoá tiên tiến, đậm đà bản sắc dân tộc", "vừa là mục tiêu, vừa là động lực",
  "nền kinh tế mở, hội nhập với khu vực và thế giới", "quốc sách hàng đầu", "giáo dục – đào tạo và khoa học – công nghệ", "đối tác chiến lược, đối tác toàn diện",
  "chế độ tem phiếu", "độc lập, chủ quyền, thống nhất và toàn vẹn lãnh thổ", "độc lập, chủ quyền, thống nhất, toàn vẹn lãnh thổ",
  "chủ quyền, độc lập, thống nhất và toàn vẹn lãnh thổ", "chủ quyền, độc lập, thống nhất, toàn vẹn lãnh thổ", "Đường dây tải điện 500 kV Bắc – Nam",
  "Đường dây truyền tải điện 500 kV Bắc – Nam", "Trưởng ban Nghiên cứu về Đông Dương",
  // Địa lí: tên chỉ tiêu thống kê, nhóm hàng, ngành công nghiệp, cặp thuật ngữ như sách
  "vị trí địa lí và điều kiện tự nhiên", "cơ cấu giá trị sản xuất", "giá trị sản xuất công nghiệp", "giá trị sản xuất",
  "tổng mức bán lẻ hàng hoá và doanh thu dịch vụ tiêu dùng", "tổng trị giá xuất nhập khẩu", "trị giá xuất khẩu", "trị giá nhập khẩu",
  "Hàng điện tử, máy tính và linh kiện", "sản xuất sản phẩm điện tử, máy vi tính", "cơ sở vật chất – kĩ thuật", "cơ sở hạ tầng", "trữ lượng thuỷ năng"]);
// khẩu hiệu, phương châm, tên văn kiện trong ngoặc kép như sách: không tính là chép sách
const TRICH = [];

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Như tests/lichsu-diali12-ck1.js. Đề ngẫu nhiên rút câu ở mọi ô, đề “Ôn chủ đề” rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi
   cặp câu cùng môn, trừ cặp có câu tự luận nằm cùng một ô rút 1 câu. Đáp án là số (trả lời ngắn, lựa chọn đúng dạng “25%”; từ hai chữ số, hoặc
   số thập phân) tìm ở vị trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”, “đạt”; không tính số đứng trước một phép tính) cùng
   đơn vị: không được có. Đáp án bằng chữ (lựa chọn đúng của câu nhiều lựa chọn) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống
   thì lấy cả đáp án); chuỗi có trong đề bài, lựa chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. Ô của
   câu sắp xếp: hai ô liền nhau theo đúng thứ tự có ở câu sắp xếp kia thì in ra để xem tay. */
const DON_VI = "(?:triệu tấn\\.km|triệu tấn|nghìn tấn|nghìn tỉ đồng|tỉ đồng|tỉ kWh|tỉ USD|nghìn thuê bao|nghìn con|nghìn người|triệu người|nghìn ha|tạ\\/ha|tấn\\/ha|km|năm|lần|%)";
const soDV = new RegExp("^(" + NUM + ")(?: ?(" + DON_VI + "))?$", "u");
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được|đạt))\\s+(" + NUM + ")(?![\\d,])(?!\\s*[·+−:×](?:\\s|\\d|\\())(?: ?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => ({ v: val(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const doLo = (qs, M, tenCau) => {
  const lo = [], chuLo = [], cungLuc = (p, q) => p !== q && (p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2);
  qs.forEach((q) => {
    let soDa = [], C = [];
    if (q.type === "num") soDa = [{ v: q.ans, u: q.unit || "" }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: val(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]); C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)]; } }
    else if (q.type === "order") C = q.o.slice(1).map((o, i) => [q.o[i], o]);
    soDa = soDa.filter((d) => Math.abs(d.v) >= 10 || !Number.isInteger(d.v));
    qs.forEach((p) => {
      if (!cungLuc(p, q)) return;
      const at = `${tenCau(p)} → ${tenCau(q)}: `, T = " " + chu(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chu(p).flatMap(kqSo).some((yy) => gan(yy.v, d.v) && (!yy.u || !d.u || yy.u === d.u))).forEach((d) => lo.push(at + vn(d.v) + " " + d.u));
      if (q.type === "order") { if (p.type === "order") C.forEach(([a, b]) => { const i = p.o.indexOf(a); if (i >= 0 && p.o[i + 1] === b) chuLo.push(at + a + " → " + b); }); return; }
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
// Lịch sử: ngày tháng của câu về trình tự thời gian (câu sắp xếp, ý “A diễn ra trước B”), ghi như sách, có ở câu kia thì lộ thứ tự
const ngayCua = (q) => [...new Set((q.type === "order" ? q.o : q.type === "tf4" ? q.o.flatMap((o) => { const m = /^(.+) diễn ra trước (.+)\.$/.exec(o); return m ? [m[1], m[2]] : []; }) : []).map((d) => suKien(d)[2]))];
const coNgay = (s, g) => new RegExp("(?<![\\d,]|[\\d,] )" + escRe(g) + "(?!\\d)").test(s);
const loNgay = (qs, M, tenCau) => {
  const cungLuc = (p, q) => p !== q && (p.topic !== q.topic || (p.type !== "essay" && q.type !== "essay") || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2), ra = [];
  qs.forEach((q) => ngayCua(q).forEach((g) => qs.forEach((p) => { if (cungLuc(p, q) && chu(p).some((s) => coNgay(s, g))) ra.push(`${tenCau(p)} → ${tenCau(q)}: ngày ${g}`); })));
  return ra;
};
const lo = [], chuLo = [];
MON.forEach((m) => { const r = doLo(m.kho, m.M, (q) => ten.get(q)); lo.push(...r.lo); chuLo.push(...r.chuLo); });
lo.push(...loNgay(LS.kho, LS.M, (q) => ten.get(q)));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuLo.join("\n"));
assert.deepEqual(chuLo, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(lo, [], "lộ đáp án:\n" + lo.join("\n"));

/* ---------- không chép sách: so với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm, gộp tên riêng nhiều chữ), nếu có OnUp-Book ----------
   Tên riêng nhiều chữ (GOP) tính là một từ; cụm từ chung của môn (TU_CHUNG: tên bài, cách nói chuẩn của đề) thay bằng dấu ngăn; câu trích
   nguyên văn (TRICH) không tính. Chuỗi so phải có ít nhất 5 từ có chữ. */
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const boDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP_ = GOP.map(boDau).sort((a, b) => b.length - a.length), TU_CHUNG_ = TU_CHUNG.map((p) => " " + boDau(p) + " ").sort((a, b) => b.length - a.length);
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
  let t = " " + boDau(TRICH.reduce((x, c) => x.split(c).join(" | "), String(s).normalize("NFC"))) + " ";
  TU_CHUNG_.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  GOP_.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); });
  return t.replace(/[aeiouy]+/g, "a").replace(/\s+/g, " ").trim();
});
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const tatCa = MON.flatMap((m) => m.kho);
if (SACH.length) {
  MON.forEach((m) => assert.ok(SACH.some((f) => f.includes(path.join("lop-12", m.sach))), "OnUp-Book có " + m.sach));
  const sach = new Set(), them = (t, k) => { const w = t.split(" ").filter(Boolean); for (let i = 0; i + k <= w.length; i++) sach.add(k + ":" + w.slice(i, i + k).join(" ")); };
  SACH.forEach((f) => { const t = khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")); them(t, 8); if (process.env.DO_SACH) them(t, 6); });
  const bao = (k) => tatCa.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.has(k + ":" + c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả kho cuối kì I cùng file và câu riêng của
   các đề ngẫu nhiên; với kho cuối kì I cùng môn: đề bài không có chuỗi 6 từ nào trùng (Rút ra N9-gk1-toan) ---------- */
{
  const cua = (b, q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const ngoai = (b) => !MON.some((m) => m.DE.includes(b.id) || m.pool === b);
  const khac = BANKS.filter((b) => !b.pool && ngoai(b)).flatMap((b) => b.questions.map((q) => cua(b, q)))
    .concat(BANKS.filter((b) => b.pool && ngoai(b)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => tatCa.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
  const gan6 = MON.flatMap((m) => { const ck1 = m.ck1.map((q) => " " + khongDau(q.q) + " "); return m.kho.flatMap((q) => chuoi(q.q, 6).filter((c) => ck1.some((s) => s.includes(" " + c + " "))).map((c) => ten.get(q) + ": " + c)); });
  assert.deepEqual([...new Set(gan6)], [], "đề bài có chuỗi 6 từ trùng câu của kho cuối kì I");
}
/* ---------- tự thử: bộ dò lộ đáp án, bộ đọc hình bắt được chỗ cố ý viết sai ---------- */
{
  const tim = (has) => { const r = tatCa.filter((q) => q.q.includes(has)); assert.equal(r.length, 1, "tự thử: cần đúng một câu có “" + has + "”"); return r[0]; };
  const gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const r = doLo(qs, Object.assign({}, LS.M, DL.M), (q) => q.q.slice(0, 40)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  // số ở vị trí kết quả của câu kia, cùng đơn vị: lộ; số không ở vị trí kết quả: không lộ; tên tỉnh của đáp án có ở câu kia: in ra để xem
  const laoDong = tim("820 nghìn lao động đang làm việc"), apatit = tim("a-pa-tít có trữ lượng tương đối lớn ở tỉnh nào");
  assert.deepEqual(thuLo([laoDong, gia(apatit, "Lao động dịch vụ của tỉnh này chiếm 35% (tỉ lệ đạt 35%).")]), ["35 %"]);
  assert.deepEqual(thuLo([laoDong, gia(apatit, "Mỏ có 35 người làm.")]), []);
  assert.deepEqual(thuLo([apatit, gia(laoDong, "A-pa-tít tập trung ở Lào Cai.")]), ["lào cai"]);
  const xep = LS.kho.filter((q) => q.type === "order"), [x1, x2] = xep;
  assert.equal(xep.length, 2, "tự thử: hai câu sắp xếp");
  // hai ô liền nhau đúng thứ tự có ở câu sắp xếp kia: báo ở cả hai chiều
  assert.deepEqual(thuLo([x1, Object.assign({}, x2, { o: [x1.o[1], x1.o[2], x2.o[0], x2.o[1]] })]), [x1.o[1] + " → " + x1.o[2], x1.o[1] + " → " + x1.o[2]]);
  // ngày tháng của câu về trình tự thời gian có ở câu kia (chỉ ghi năm 1946 thì không tính là ngày 14 – 9 – 1946)
  const thuNgay = (qs) => loNgay(qs, LS.M, (q) => q.q.slice(0, 40)).map((s) => s.replace(/^.*: /, ""));
  const tamUoc = tim("Tạm ước Việt – Pháp với Chính phủ Pháp nhằm mục đích"), truoc = tim("trước Cách mạng tháng Tám"), pari = tim("Hiệp định Pa-ri về Việt Nam có điều khoản");
  assert.ok(x2.o.some((o) => o.includes("Tạm ước Việt – Pháp")), "tự thử: câu sắp xếp thứ hai có Tạm ước Việt – Pháp");
  assert.deepEqual(thuNgay([x2, gia(tamUoc, "Bản tạm ước được kí ngày 14 – 9 – 1946.")]), ["ngày 14 – 9 – 1946"]);
  assert.deepEqual(thuNgay([x2, gia(tamUoc, "Năm 1946, hai bên còn tiếp xúc.")]), []);
  assert.deepEqual(thuNgay([x2, gia(pari, "Hiệp định được kí ngày 27 – 1 – 1973.")]), ["ngày 27 – 1 – 1973"]);
  assert.deepEqual(thuNgay([truoc, gia(tamUoc, "Năm 1921, Nguyễn Ái Quốc ở Pháp.")]), ["ngày 1921"]);
  // đổi một số ghi trên hình (số liệu, phần trăm) thì bộ đọc báo lỗi
  const hinh = (has) => tim(has).svg, doi = (svg, lab, moi) => { assert.ok(svg.includes(">" + lab + "<"), "hình có số " + lab); return svg.replace(">" + lab + "<", ">" + moi + "<"); };
  const tron = hinh("cơ cấu điện năng sản xuất của tỉnh T"), v1 = Object.values(Object.values(docTron(tron))[0])[0];
  assert.throws(() => docTron(doi(tron, vn(v1) + "%", vn(v1 + 4) + "%")));
  const cot = hinh("khối lượng hàng hoá thông qua cảng biển X"), v2 = docCot(cot, "Triệu tấn")[1].v;
  assert.throws(() => docCot(doi(cot, vn(v2), vn(v2 + 2)), "Triệu tấn"));
  const cot2 = hinh("trị giá xuất khẩu và nhập khẩu hàng hoá của tỉnh K"), v3 = Object.values(Object.values(docCot(cot2, "Tỉ USD"))[0])[0];
  assert.throws(() => docCot(doi(cot2, vn(v3), vn(v3 + 3)), "Tỉ USD"));
  const duong = hinh("số thuê bao điện thoại và số thuê bao internet của tỉnh G"), d = docDuong(duong, "Nghìn thuê bao")["Thuê bao internet"], v4 = d[d.length - 1].v;
  assert.throws(() => docDuong(doi(duong, vn(v4), vn(v4 + 20)), "Nghìn thuê bao"));
  const mien = hinh("cơ cấu giá trị sản xuất nông nghiệp, lâm nghiệp và thuỷ sản của tỉnh H"), v5 = Object.values(docMien(mien)["Lâm nghiệp"])[0];
  assert.throws(() => docMien(doi(mien, vn(v5), vn(v5 + 5))));
  const kh = hinh("giá trị sản xuất công nghiệp của tỉnh B (cột)"), v6 = docKetHop(kh).cot.v[0].v;
  assert.throws(() => docKetHop(doi(kh, vn(v6), vn(v6 + 40))));
  // bảng ngày tháng: đảo hai ô của câu sắp xếp thì không còn đúng thứ tự
  assert.notDeepEqual([x1.o[1], x1.o[0], ...x1.o.slice(2)], theoThoiGian(x1));
  // câu chọn bốn tỉnh của vùng: lựa chọn đúng mà có một tỉnh ngoài vùng thì bị bắt
  const vung = DL.kho.find((q) => /Bắc Trung Bộ còn có bốn tỉnh nào\?$/.test(q.q)), sai = Object.assign({}, vung, { o: ["Thanh Hoá, Nghệ An, Hà Tĩnh, Quảng Ngãi", ...vung.o.slice(1)] });
  assert.ok(vung && !sai.o[0].split(", ").every((t) => VUNG_TINH["Bắc Trung Bộ"].includes(t)));
}
MON.forEach((m) => console.log(`${m.ten} 12 giữa kì II: kho ${m.kho.length} câu (${m.DE.length} đề cố định, ${m.pool.n} câu mỗi đề), ma trận 10 – 8 – 7 trên ${Object.keys(m.M).length} chủ đề; ` +
  `${m.kho.filter((q) => q.type === "tf4").length} câu đúng/sai 4 ý, ${m.kho.filter((q) => q.type === "num").length} câu trả lời ngắn, ${m.kho.filter((q) => q.type === "order").length} câu sắp xếp, ${m.kho.filter((q) => q.type === "essay").length} câu tự luận; đáp án đúng dài nhất hoặc ngắn nhất ở ${m.le} câu nhiều lựa chọn.`));
console.log("Địa lí 12: " + DL.kho.filter((q) => q.svg).length + " câu có biểu đồ (" + [...new Set(DL.kho.filter((q) => q.svg).map((q) => LOAI_HINH.get(q.svg)))].join(", ") + ").");
console.log(n + " câu, ý đã tính lại hoặc đọc lại hình.");
console.log("MATH OK");
