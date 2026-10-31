// Kiểm tra ngân hàng Lịch sử 12 và Địa lí 12 cuối kì I của Phiên N12-ck1-lichsu-diali (data/banks/12-lichsu.js, data/banks/12-diali.js:
// mỗi môn hai đề cố định và đề ngẫu nhiên lấy câu của hai đề đó, không có câu riêng), theo mẫu tests/lsdl-gdcd9-ck1.js (biểu đồ, trình tự
// sự kiện, gộp tên riêng khi so chữ với sách) và tests/sinhhoc-ktpl12-ck1.js (phần chung của các kho lớp 12). Số đề, số câu lấy từ danh mục.
// Câu có phép tính, có hình, câu sắp xếp, câu tự luận nhận ra bằng một đoạn chữ của đề (has: đúng một câu trong kho, đúng đề ghi ở id);
// số liệu đọc từ chữ của đề hay từ hình, đáp án tính bằng code (so với ans, o[0], o của câu sắp xếp, hoặc các ý tính được của câu đúng/sai
// 4 ý; câu tự luận so với thang chấm và bài gợi ý).
// Lịch sử: trình tự sự kiện (câu sắp xếp, ý “A diễn ra trước B” của câu đúng/sai 4 ý; bảng ngày tháng theo sách in năm 2026 ghi trong
// script), số ngày đêm của chiến dịch Điện Biên Phủ, năm các mốc của ASEAN, ngày tháng viết như sách (“19 – 12 – 1946”), không dùng địa danh
// đã đổi tên mà không ghi tên mới.
// Địa lí: tỉ trọng, cơ cấu, mức tăng phần trăm, điểm phần trăm, tốc độ tăng trưởng (năm gốc = 100%), mật độ dân số, số dân sau một năm theo
// tỉ lệ tăng, năng suất, tổng từ tỉ trọng, gấp bao nhiêu lần; năm loại biểu đồ đọc lại bằng code: cột (một dãy, hai dãy), tròn, đường, miền, kết hợp cột và đường (trục số,
// số ghi trên hình khớp vị trí, chú giải, năm); nhận xét của câu đọc biểu đồ, bảng số liệu xét lại bằng số đọc được; tên tỉnh, thành phố
// theo 34 đơn vị hành chính cấp tỉnh, 6 vùng kinh tế – xã hội (sách in năm 2026).
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân, dấu thanh kiểu sách “hoá”, “thuỷ”), lời dặn của đề (phạm vi, số câu
// mỗi phần tính từ ma trận, bài học tiếp theo, đề cương của trường, câu về đề chung của Sở), môn và lịch thi, mức độ và ma trận 10 – 8 – 7
// (chủ đề theo tên bài và thứ tự của sách, đối chiếu mục lục trong README của cuốn ở OnUp-Book; hai đề cố định chia đúng ma trận), dạng câu
// theo khung Công văn 7991 (mỗi kho ít nhất 6 câu đúng/sai 4 ý không lặp kiểu Đ/S, Địa lí ít nhất 4 câu trả lời ngắn đáp án là số, 1–2 câu
// tự luận ở ô Vận dụng rút 1 câu), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần
// ba số câu nhiều lựa chọn, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng
// không có, rút thử nhiều lần (đúng ma trận; đã làm hết một đề cố định thì không rút lại câu của đề đó), đề bài không trùng, dò lộ đáp án
// giữa mọi cặp câu rút được cùng lúc (đề “Ôn chủ đề” rút chung cả chủ đề; số ở vị trí kết quả của câu kia, ngày tháng của các sự kiện
// trong câu về trình tự thời gian: không được có; chuỗi 3 từ của đáp án bằng chữ in ra với DO_LO=1 để xem tay, đã xem ghi ở DA_XEM), bộ
// dò lộ, bộ đọc hình tự thử với câu, hình cố ý viết sai. Có sách ở ../OnUp-Book thì so mọi trường chữ với chữ OCR của mọi
// cuốn sau khi bỏ dấu, gộp nguyên âm, gộp tên riêng nhiều chữ thành một từ (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu
// của mọi kho khác, cả câu riêng của các đề ngẫu nhiên (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 6 từ).
// Chạy: node tests/lichsu-diali12-ck1.js → in MATH OK.
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
   PHAN: các phần của lời dặn (số câu mỗi phần tính từ ma trận); BAI: chủ đề theo tên bài của sách (số bài để chia phần, đối chiếu mục
   lục; bài thực hành không ra chủ đề riêng); RUT_GON: tên bài rút gọn cho vừa mã đề "Ôn chủ đề" (tối đa 80 kí tự) → tên trong mục lục. */
const MON = [
  { ma: "lichsu", ten: "Lịch sử", sach: "lich-su-12", ki: "ls", pham: "Lịch sử: Bài 1–8",
    PHAN: [["Chủ đề 1 Thế giới trong và sau Chiến tranh lạnh (Bài 1–3)", 1, 3], ["Chủ đề 2 ASEAN: những chặng đường lịch sử (Bài 4–5)", 4, 5],
      ["Chủ đề 3, Bài 6–8 (Cách mạng tháng Tám năm 1945; kháng chiến chống thực dân Pháp; kháng chiến chống Mỹ, cứu nước)", 6, 8]],
    sau: "Trường đã học sang Bài 9",
    BAI: [["Liên hợp quốc", 1], ["Trật tự thế giới trong Chiến tranh lạnh", 2], ["Trật tự thế giới sau Chiến tranh lạnh", 3],
      ["Sự ra đời và phát triển của Hiệp hội các quốc gia Đông Nam Á", 4], ["Cộng đồng ASEAN: Từ ý tưởng đến hiện thực", 5],
      ["Cách mạng tháng Tám năm 1945", 6], ["Cuộc kháng chiến chống thực dân Pháp (1945 – 1954)", 7], ["Cuộc kháng chiến chống Mỹ, cứu nước (1954 – 1975)", 8]],
    RUT_GON: { "Sự ra đời và phát triển của Hiệp hội các quốc gia Đông Nam Á": "Sự ra đời và phát triển của Hiệp hội các quốc gia Đông Nam Á (ASEAN)" } },
  { ma: "diali", ten: "Địa lí", sach: "dia-li-12", ki: "dl", pham: "Địa lí: Bài 1–19",
    PHAN: [["Phần 1 Địa lí tự nhiên (Bài 1–6)", 1, 6], ["Phần 2 Địa lí dân cư (Bài 7–10)", 7, 10], ["Phần 3 Địa lí các ngành kinh tế, đến hết công nghiệp (Bài 11–19)", 11, 19]],
    sau: "Trường đã học sang Bài 20",
    BAI: [["Vị trí địa lí và phạm vi lãnh thổ", 1], ["Thiên nhiên nhiệt đới ẩm gió mùa", 2], ["Sự phân hoá đa dạng của thiên nhiên", 3],
      ["Sử dụng hợp lí tài nguyên thiên nhiên và bảo vệ môi trường", 5], ["Dân số Việt Nam", 7], ["Lao động và việc làm", 8], ["Đô thị hoá", 9],
      ["Chuyển dịch cơ cấu kinh tế", 11], ["Vấn đề phát triển ngành nông nghiệp", 12], ["Vấn đề phát triển ngành lâm nghiệp và thuỷ sản", 13],
      ["Tổ chức lãnh thổ nông nghiệp", 14], ["Chuyển dịch cơ cấu ngành công nghiệp", 16], ["Một số ngành công nghiệp", 17],
      ["Một số hình thức tổ chức lãnh thổ công nghiệp", 18]],
    RUT_GON: { "Sử dụng hợp lí tài nguyên thiên nhiên và bảo vệ môi trường": "Vấn đề sử dụng hợp lí tài nguyên thiên nhiên và bảo vệ môi trường" } }
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
    assert.ok(b.file === m.file && b.subject === m.ten && b.grade === 12 && b.minutes === pool.minutes && b.n === pool.n, id + ": cùng file, môn, khối, số phút, số câu với đề ngẫu nhiên");
    assert.equal(b.title, m.ten + " 12 · Cuối kì I · Đề " + (k + 1), id + ": tên đề");
    assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
    m.kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, m.ki + (k + 1) + "#" + (i + 1)));
  });
  assert.equal(m.kho.length, sum(m.DE.map((id) => bank(id).n)), m.ma + ": kho = câu của hai đề cố định");
});
const [LS, DL] = MON;
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
    assert.ok(ev.scope.includes(m.pham + "."), "phạm vi của ck1-l12 ghi " + m.pham);
    assert.equal(m.PHAN[m.PHAN.length - 1][2], +/–(\d+)$/.exec(m.pham)[1], m.ma + ": phần cuối của lời dặn đến đúng bài cuối của phạm vi");
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
   Mỗi sự kiện: [chữ nhận ra trong ô sắp xếp hay trong ý đúng/sai, ngày dạng YYYY-MM-DD hay YYYY-MM để so, cách ghi ngày như sách
   (ghi trong lời giải), trang in]. Ý “A diễn ra trước B.” của câu đúng/sai 4 ý và câu sắp xếp tính lại bằng bảng này. */
const SU_KIEN = [
  // Bài 6 (tr. 32–33)
  ["đạo quân Quan Đông", "1945-08-09", "9 – 8 – 1945", 32], ["Quân lệnh số 1", "1945-08-13", "13 – 8", 32], ["Hội nghị toàn quốc của Đảng", "1945-08-14", "14, 15 – 8", 32],
  ["đầu hàng Đồng minh", "1945-08-15", "15 – 8", 32], ["Đại hội Quốc dân", "1945-08-16", "16, 17 – 8", 32], ["Khởi nghĩa ở Hà Nội", "1945-08-19", "19 – 8", 33],
  ["Khởi nghĩa ở Huế", "1945-08-23", "23 – 8", 33], ["khởi nghĩa ở Sài Gòn", "1945-08-25", "25 – 8", 33], ["Đồng Nai Thượng và Hà Tiên", "1945-08-28", "28 – 8", 33],
  ["Tuyên ngôn Độc lập", "1945-09-02", "2 – 9 – 1945", 33],
  // Bài 7 (tr. 40–42)
  ["chiến dịch Hoà Bình", "1951-12", "đông – xuân 1951 – 1952", 41], ["Chiến dịch Tây Bắc", "1952-10", "thu – đông năm 1952", 41],
  ["Kế hoạch Na-va", "1953-07", "tháng 7 – 1953", 41], ["Chiến dịch Điện Biên Phủ", "1954-03-13", "13 – 3 – 1954", 42],
  // Bài 8 (tr. 46–51)
  ["Mặt trận Dân tộc giải phóng miền Nam Việt Nam", "1960-12-20", "20 – 12 – 1960", 47], ["Quân Giải phóng miền Nam", "1961-02-15", "15 – 2 – 1961", 47],
  ["Vạn Tường", "1965-08-18", "18 – 8 – 1965", 48], ["Chính phủ cách mạng lâm thời", "1969-06-06", "6 – 6 – 1969", 49],
  ["Chiến dịch Huế – Đà Nẵng", "1975-03", "tháng 3 – 1975", 51], ["chiến dịch Hồ Chí Minh", "1975-04", "tháng 4 – 1975", 51]
];
const suKien = (s) => { const m = SU_KIEN.filter(([k]) => s.toLowerCase().includes(k.toLowerCase())); assert.equal(m.length, 1, "không nhận ra đúng một sự kiện: " + s); return m[0]; };
const theoThoiGian = (q) => { const sk = q.o.map(suKien); sk.forEach(([, , ghi]) => coX(q, ghi)); assert.equal(new Set(sk.map((s) => s[1])).size, sk.length, "các sự kiện khác ngày nhau");
  return [...q.o].sort((a, b) => (suKien(a)[1] < suKien(b)[1] ? -1 : 1)); };

/* ---------- các câu cần tính ----------
   id: ls1, ls2 (Lịch sử Đề 1, 2), dl1, dl2 (Địa lí Đề 1, 2); has: đoạn chữ có trong đúng một câu của môn. right(q) trả đáp án tính được
   (số, lựa chọn đúng, thứ tự đúng của câu sắp xếp, hoặc mảng 4 ý của câu đúng/sai, null ở ý không tính bằng code); essay(q) kiểm tra câu
   tự luận (số trong thang chấm, bài gợi ý). */
const f1 = (x) => x.toFixed(1).replace(".", ","); // số một chữ số thập phân như đề ghi (1,0; 16,0)
const tiTrong = (q, mau) => { const [t, c] = so(q.q, mau), v = (c / t) * 100; assert.equal(q.unit, "%"); coX(q, `${vn(c)} : ${vn(t)} × 100 = ${vn(v)}`); return v; };
const CHECKS = [
  // ---- Lịch sử ----
  { id: "ls2", has: "Sắp xếp các sự kiện sau theo trình tự thời gian (sự kiện sớm nhất đứng đầu).", right: theoThoiGian },
  { id: "ls2", has: "của cách mạng miền Nam theo trình tự thời gian", right: theoThoiGian },
  { id: "ls1", has: "về chiến dịch Điện Biên Phủ năm 1954", right: (q) => {
    // 56 ngày đêm tính lại từ hai ngày ghi trong ý a (tính cả ngày đầu và ngày cuối); ý d theo bảng ngày tháng
    const [d1, m1, d2, m2, nm] = y(q.o[0], /kéo dài 56 ngày đêm, từ ngày (\d+) – (\d+) đến ngày (\d+) – (\d+) – (\d{4})\.$/).slice(1).map(Number);
    const ngay = (Date.UTC(nm, m2 - 1, d2) - Date.UTC(nm, m1 - 1, d1)) / 864e5 + 1;
    const [, a, b] = y(q.o[3], /^(.+) diễn ra trước (.+)\.$/), A = suKien(a), B = suKien(b);
    coX(q, "19 + 30 + 7 = " + ngay); return [ngay === 56, null, null, A[1] < B[1]]; } },
  { id: "ls2", has: "quá trình phát triển của ASEAN", right: (q) => {
    // năm theo bảng các giai đoạn phát triển của ASEAN (Bài 4, tr. 24) và Bài 5 (tr. 27)
    const NAM = { "AFTA": 1992, "Cộng đồng ASEAN": 2015, "TAC": 1976, "Hiến chương ASEAN": 2007 };
    assert.ok(/AFTA\) chỉ được thoả thuận sau khi Cộng đồng ASEAN ra đời\.$/.test(q.o[0]) && /\(TAC\) được kí năm (\d{4})\.$/.test(q.o[2]) && /^Hiến chương ASEAN được thông qua trong giai đoạn (\d{4}) – (\d{4})/.test(q.o[3]));
    const [nTac] = y(q.o[2], /năm (\d{4})\.$/).slice(1).map(Number), [tu, den] = y(q.o[3], /giai đoạn (\d{4}) – (\d{4})/).slice(1).map(Number);
    coX(q, "năm " + NAM.AFTA, "năm " + NAM["Cộng đồng ASEAN"], "năm " + NAM["Hiến chương ASEAN"]);
    return [NAM.AFTA > NAM["Cộng đồng ASEAN"], null, nTac === NAM.TAC, NAM["Hiến chương ASEAN"] >= tu && NAM["Hiến chương ASEAN"] <= den]; } },
  { id: "ls1", has: "nguyên nhân chủ quan dẫn tới thắng lợi của cuộc kháng chiến chống thực dân Pháp", essay: (q) => {
    coThang(q, "sự lãnh đạo của Đảng", "toàn dân, toàn quân", "hậu phương", "nguyên nhân quyết định"); coX(q, "giữ vai trò quyết định"); } },
  { id: "ls2", has: "biểu hiện của xu thế đa cực", essay: (q) => {
    coThang(q, "Trung Quốc, Nga, Ấn Độ, Nhật Bản", "suy giảm tương đối", "G20, ASEM", "cơ hội cho Việt Nam"); coX(q, "Cơ hội cho Việt Nam"); } },
  // ---- Địa lí, Đề 1 ----
  { id: "dl1", has: "có số dân 1 250 nghìn người, tỉ lệ tăng dân số là 1,2%", right: (q) => {
    const [d, r] = so(q.q, "có số dân # nghìn người, tỉ lệ tăng dân số là #%"), t = (d * r) / 100;
    assert.ok(q.unit === undefined && /bao nhiêu nghìn người/.test(q.q)); coX(q, `${vn(d)} × ${vn(r)} : 100 = ${vn(t)}`, `${vn(d)} + ${vn(t)} = ${vn(d + t)}`); return d + t; } },
  { id: "dl1", has: "38,5% dân số nước ta sống ở thành thị", right: (q) => {
    // ý a: dân thành thị dưới một nửa; ý b: so giá trị làm ra trên mỗi phần trăm lao động ở đô thị và ngoài đô thị (lao động đô thị lấy
    // bằng mức trên “chưa bằng 40%” để xét trường hợp bất lợi nhất)
    const [tt] = so(q.q, "khoảng #% dân số"), [ld] = so(q.q, "chưa bằng #% tổng số lao động"), [gdp] = so(q.q, "khoảng #% GDP");
    assert.ok(/^Phần lớn dân số nước ta vẫn sống ở nông thôn\.$/.test(q.o[0]) && /^Bình quân mỗi lao động ở đô thị làm ra nhiều giá trị hơn/.test(q.o[1]));
    return [tt < 50, gdp / ld > (100 - gdp) / (100 - ld), null, null]; } },
  { id: "dl1", has: "cơ cấu tổng sản phẩm trên địa bàn (GRDP) của tỉnh V", right: (q) => {
    const c = docTron(q.svg), [a, b] = Object.keys(c).sort(), N = "Nông nghiệp, lâm nghiệp và thuỷ sản", C = "Công nghiệp và xây dựng", D = "Dịch vụ";
    const t = (k) => c[b][k] - c[a][k];
    const LUAT = [
      [/^Tỉ trọng công nghiệp và xây dựng tăng nhiều hơn tỉ trọng dịch vụ$/, () => t(C) > t(D) && t(D) > 0],
      [/^Dịch vụ là khu vực có tỉ trọng tăng nhanh nhất$/, () => Object.keys(c[b]).every((k) => t(D) >= t(k))],
      [/^Tỉ trọng nông nghiệp, lâm nghiệp và thuỷ sản giảm chưa đến (\d+) điểm phần trăm$/, (m) => t(N) < 0 && -t(N) < +m[1]],
      [/^Năm (\d{4}), công nghiệp và xây dựng chiếm hơn một nửa GRDP$/, (m) => c[m[1]][C] > 50]
    ];
    coX(q, `từ ${c[a][C]}% lên ${c[b][C]}%`, `từ ${c[a][D]}% lên ${c[b][D]}%`, `từ ${c[a][N]}% xuống ${c[b][N]}%`);
    return dungMot(q, LUAT); } },
  { id: "dl1", has: "tổng sản phẩm trên địa bàn tỉnh H là", right: (q) => tiTrong(q, "tỉnh H là # nghìn tỉ đồng, trong đó khu vực công nghiệp và xây dựng đạt # nghìn tỉ đồng") },
  { id: "dl1", has: "cơ cấu giá trị sản xuất nông nghiệp của tỉnh Y", right: (q) => {
    const c = docMien(q.svg), nam = Object.keys(c["Trồng trọt"]).sort(), dau = nam[0], cuoi = nam[nam.length - 1];
    const tang = (k) => nam.every((n, i) => !i || c[k][n] > c[k][nam[i - 1]]), giam = (k) => nam.every((n, i) => !i || c[k][n] < c[k][nam[i - 1]]);
    const LUAT = [
      [/^Tỉ trọng chăn nuôi tăng liên tục qua các năm$/, () => tang("Chăn nuôi")],
      [/^Năm (\d{4}), trồng trọt vẫn chiếm hơn một nửa$/, (m) => c["Trồng trọt"][m[1]] > 50],
      [/^Tỉ trọng dịch vụ nông nghiệp giảm dần qua các năm$/, () => giam("Dịch vụ nông nghiệp")],
      [/^Năm (\d{4}), chăn nuôi chiếm tỉ trọng lớn nhất$/, (m) => Object.keys(c).every((k) => c["Chăn nuôi"][m[1]] >= c[k][m[1]])]
    ];
    coX(q, `từ ${c["Chăn nuôi"][dau]}% (${dau})`, `${c["Chăn nuôi"][cuoi]}% (${cuoi})`, `còn ${c["Trồng trọt"][cuoi]}% năm ${cuoi}`);
    return dungMot(q, LUAT); } },
  { id: "dl1", has: "tỉnh L có 560 nghìn ha cây lương thực có hạt", right: (q) => { const [t] = so(q.q, "có # nghìn ha cây lương thực có hạt"), [l] = so(q.q, "diện tích lúa là # nghìn ha"), v = (l / t) * 100;
    assert.equal(q.unit, "%"); coX(q, `${vn(l)} : ${vn(t)} × 100 = ${vn(v)}`); return v; } },
  { id: "dl1", has: "sản lượng thuỷ sản khai thác và nuôi trồng của tỉnh Z", right: (q) => {
    const c = docCot(q.svg, "Nghìn tấn"), [n] = y(q.q, /Năm (\d{4}), sản lượng thuỷ sản nuôi trồng chiếm bao nhiêu phần trăm/).slice(1), k = c[n]["Khai thác"], u = c[n]["Nuôi trồng"];
    assert.equal(q.unit, "%"); coX(q, `${vn(k)} + ${vn(u)} = ${vn(k + u)}`, `${vn(u)} : ${vn(k + u)} × 100 = ${vn((u / (k + u)) * 100)}`);
    return (u / (k + u)) * 100; } },
  { id: "dl1", has: "giá trị sản xuất công nghiệp của tỉnh P là", right: (q) => tiTrong(q, "tỉnh P là # nghìn tỉ đồng, trong đó khu vực có vốn đầu tư nước ngoài đạt # nghìn tỉ đồng") },
  { id: "dl1", has: "Sản lượng điện của tỉnh R phân theo nguồn", essay: (q) => {
    const nam = [...q.q.matchAll(/Năm (\d{4}): thuỷ điện ([\d,]+); nhiệt điện ([\d,]+); điện gió và điện mặt trời ([\d,]+)\./g)].map((m) => ({ n: m[1], v: m.slice(2).map(val) }));
    assert.equal(nam.length, 2, "bảng hai năm");
    const [a, b] = nam.map((x) => ({ n: x.n, g: x.v[2], t: sum(x.v) })), pa = (a.g / a.t) * 100, pb = (b.g / b.t) * 100;
    coThang(q, `năm ${a.n}: ${f1(a.g)} : ${f1(a.t)} × 100 = ${vn(pa)}%`, `năm ${b.n}: ${f1(b.g)} : ${f1(b.t)} × 100 = ${vn(pb)}%`, `tăng gấp ${vn(b.g / a.g)} lần`, `từ ${vn(pa)}% lên ${vn(pb)}%`);
    coX(q, `${nam[0].v.map(f1).join(" + ")} = ${f1(a.t)} (tỉ kWh)`, `${nam[1].v.map(f1).join(" + ")} = ${f1(b.t)} (tỉ kWh)`, `${f1(a.g)} : ${f1(a.t)} × 100 = ${vn(pa)}%`, `${f1(b.g)} : ${f1(b.t)} × 100 = ${vn(pb)}%`);
    assert.ok(pb > pa); } },
  { id: "dl1", has: "Khu công nghiệp K có 320 ha", right: (q) => {
    const [tong] = so(q.q, "có # ha đất công nghiệp"), [, thue] = so(q.q, "đã cho # doanh nghiệp thuê # ha"), [ld] = so(q.q, "tạo việc làm cho # lao động");
    const [pa] = so(q.o[0], "khu K là #%."), [pc] = so(q.o[2], "tạo việc làm cho # lao động.");
    coX(q, `${vn(thue)} : ${vn(tong)} × 100 = ${vn((thue / tong) * 100)}`, `${vn(ld)} : ${vn(thue)} = ${vn(ld / thue)}`);
    return [gan((thue / tong) * 100, pa), null, gan(ld / thue, pc), null]; } },
  // ---- Địa lí, Đề 2 ----
  { id: "dl2", has: "tỉnh Y có diện tích 7 850 km²", right: (q) => { const [s] = so(q.q, "diện tích # km²"), [d] = so(q.q, "số dân là # nghìn người"), v = (d * 1000) / s;
    assert.equal(q.unit, "người/km²"); coX(q, `${vn(d * 1000)} : ${vn(s)} = ${vn(v)}`); return v; } },
  { id: "dl2", has: "biểu đồ nào thích hợp nhất?", right: (q) => {
    // bảng cơ cấu (%) của từ bốn năm trở lên, đề hỏi sự chuyển dịch cơ cấu: biểu đồ miền
    const nam = q.q.split(/(?=Năm \d{4}:)/).filter((x) => /^Năm \d{4}:/.test(x)).map((x) => ({ n: +x.slice(4, 8), v: [...x.slice(9).matchAll(/\d+/g)].slice(0, 3).map((m) => +m[0]) }));
    assert.ok(nam.length >= 4 && nam.every((x) => x.v.length === 3 && sum(x.v) === 100), "bảng cơ cấu: từ bốn năm, mỗi năm cộng lại 100%");
    assert.ok(/đơn vị: %/.test(q.q) && /sự chuyển dịch cơ cấu/.test(q.q)); return "Biểu đồ miền"; } },
  { id: "dl2", has: "Tổng sản phẩm trên địa bàn tỉnh Q năm 2015 là", right: (q) => {
    const [t1, a1] = so(q.q, "năm 2015 là # nghìn tỉ đồng, trong đó khu vực có vốn đầu tư nước ngoài đạt # nghìn tỉ đồng"), [t2, a2] = so(q.q, "năm 2025 là # nghìn tỉ đồng, khu vực này đạt # nghìn tỉ đồng");
    const p1 = (a1 / t1) * 100, p2 = (a2 / t2) * 100;
    coX(q, `${vn(a1)} : ${vn(t1)} × 100 = ${vn(p1)}`, `${vn(a2)} : ${vn(t2)} × 100 = ${vn(p2)}`, `${vn(p2)} − ${vn(p1)} = ${vn(p2 - p1)}`); return p2 - p1; } },
  { id: "dl2", has: "diện tích và sản lượng cà phê của tỉnh M", right: (q) => {
    const c = docKetHop(q.svg), [n] = y(q.q, /Năng suất cà phê của tỉnh M năm (\d{4})/).slice(1), dt = c.cot.v.find((v) => v.nam === +n).v, sl = c.duong.v.find((v) => v.nam === +n).v;
    assert.ok(c.cot.ten === "Diện tích" && c.cot.donVi === "Nghìn ha" && c.duong.ten === "Sản lượng" && c.duong.donVi === "Nghìn tấn" && q.unit === "tạ/ha" && /làm tròn đến hàng đơn vị/.test(q.q));
    coX(q, `${vn(sl)} : ${vn(dt)} ≈ ${vn(lam(sl / dt, 1))} (tấn/ha)`); return Math.round((sl / dt) * 10); } },
  { id: "dl2", has: "tốc độ tăng trưởng giá trị sản xuất của hai ngành công nghiệp ở tỉnh K", right: (q) => {
    const c = docDuong(q.svg, "%"), A = c["Chế biến, chế tạo"], B = c["Khai khoáng"], [a, b, cc, d] = q.o;
    assert.ok(A[0].v === 100 && B[0].v === 100 && /năm 2015 = 100%/.test(q.q), "năm gốc 100%");
    const [nA, lan] = y(a, /^Năm (\d{4}), giá trị sản xuất ngành chế biến, chế tạo gấp hơn (\d+,\d) lần năm 2015\.$/).slice(1);
    const vA = A.find((p) => p.nam === +nA).v, [nD, hon] = y(d, /^Năm (\d{4}), tốc độ tăng trưởng của ngành chế biến, chế tạo cao hơn ngành khai khoáng (\d+) điểm phần trăm\.$/).slice(1);
    const hieu = A.find((p) => p.nam === +nD).v - B.find((p) => p.nam === +nD).v;
    assert.ok(/^Giá trị sản xuất ngành khai khoáng tăng liên tục/.test(b) && /^Theo biểu đồ, năm \d{4} giá trị sản xuất của ngành chế biến, chế tạo lớn hơn ngành khai khoáng\.$/.test(cc));
    coX(q, `${vA}% : 100% = ${vn(vA / 100)} lần`, `${A.find((p) => p.nam === +nD).v} − ${B.find((p) => p.nam === +nD).v} = ${hieu}`);
    // ý c: biểu đồ tốc độ tăng trưởng không cho biết giá trị tuyệt đối của hai ngành nên không kết luận được
    return [vA / 100 > val(lan), B.every((p, i) => !i || p.v > B[i - 1].v), false, hieu === +hon]; } },
  { id: "dl2", has: "sản lượng điện phát ra của các nhà máy trên địa bàn tỉnh N", right: (q) => {
    const c = docCot(q.svg, "Tỉ kWh"), v = Object.fromEntries(c.map((p) => [p.nam, p.v])), tg = c.slice(1).map((p, i) => lam(p.v - c[i].v, 1));
    const LUAT = [
      [/^Sản lượng điện năm (\d{4}) gấp hơn ba lần năm (\d{4})$/, (m) => v[m[1]] > 3 * v[m[2]]],
      [/^Sản lượng điện tăng chậm dần qua từng giai đoạn$/, () => tg.every((d, i) => !i || d < tg[i - 1])],
      [/^Giai đoạn (\d{4}) – (\d{4}) sản lượng điện tăng nhiều nhất$/, (m) => lam(v[m[2]] - v[m[1]], 1) === Math.max(...tg)],
      [/^Sản lượng điện năm (\d{4}) gấp đôi năm (\d{4})$/, (m) => Math.abs(v[m[1]] / v[m[2]] - 2) < 0.05]
    ];
    coX(q, tg.map((d) => vn(d)).join("; ") + " tỉ kWh", `${vn(v[2025])} : ${vn(v[2010])} ≈ ${vn(lam(v[2025] / v[2010], 1))}`, `khoảng ${vn(lam(v[2020] / v[2015], 1))} lần`);
    return dungMot(q, LUAT); } },
  { id: "dl2", has: "Sản lượng giày thể thao của tỉnh S", right: (q) => { const [a, b] = so(q.q, "năm 2015 là # triệu đôi, năm 2025 là # triệu đôi"), v = ((b - a) / a) * 100;
    assert.equal(q.unit, "%"); coX(q, `(${vn(b)} − ${vn(a)}) : ${vn(a)} × 100 = ${vn(v)}`); return v; } },
  { id: "dl2", has: "các khu công nghiệp của tỉnh T đạt giá trị xuất khẩu", right: (q) => { const [x, p] = so(q.q, "xuất khẩu # tỉ USD, chiếm #%"), v = (x / p) * 100;
    assert.equal(q.unit, "tỉ USD"); coX(q, `${vn(x)} : ${vn(p)} × 100 = ${vn(v)}`); return v; } },
  { id: "dl2", has: "trồng rừng ngập mặn, rừng phòng hộ ven biển", essay: (q) => { coThang(q, "chắn sóng", "đa dạng sinh học", "hai việc"); coX(q, "Học sinh có thể"); } }
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
        assert.ok(q.tol === undefined, "đáp án chính xác (đề dặn cách làm tròn), không cần sai số");
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
const VUNG = ["Trung du và miền núi phía Bắc", "Đồng bằng sông Hồng", "Bắc Trung Bộ", "Duyên hải Nam Trung Bộ và Tây Nguyên", "Đông Nam Bộ", "Đồng bằng sông Cửu Long"];
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
    // tên chiến dịch, tên nhà máy giữ như sách (Chiến dịch Hoà Bình; nhà máy thuỷ điện Hoà Bình) không phải tên tỉnh
    const s2 = s.replace(/(?:[Cc]hiến dịch|thuỷ điện) Hoà Bình/g, "");
    TINH_CU.forEach((t) => { if (s2.includes(t)) assert.ok(new RegExp(escRe(t) + " \\(nay (?:thuộc|là) ").test(s2), at + ": tên tỉnh cũ “" + t + "” không ghi tên mới"); });
    [...s.matchAll(/(?:tỉnh|thành phố) (\p{Lu}[\p{L}]*(?: \p{Lu}[\p{L}]*)*)/gu)].forEach((x) => assert.ok(TINH.includes(x[1]) || TINH.includes("Thành phố " + x[1]) || /^\p{Lu}$/u.test(x[1]) || /^Hồ Chí Minh$/.test(x[1]), at + ": tên tỉnh, thành phố không có trong 34 đơn vị: " + x[0]));
  });
  if (q.type === "num" && q.unit) assert.ok(q.unit.length <= 9, at + ": đơn vị ngắn");
}));
// Lịch sử: ngày tháng viết như sách (“19 – 12 – 1946”, “tháng 3 – 1945”), không “19/12/1946”, “19-12-1946”
LS.kho.forEach((q) => chu(q).forEach((s) => assert.ok(!/\d{1,2}\/\d{1,2}(?:\/\d{4})?|\b\d{1,2}-\d{1,2}-\d{4}\b|\d – \d{1,2}\/|tháng \d{1,2}\/\d{4}/.test(s), ten.get(q) + ": ngày tháng viết như sách (“19 – 12 – 1946”): " + s)));
// Địa lí: vùng kinh tế – xã hội gọi đúng tên của sách in năm 2026 (không còn “vùng Tây Nguyên”, “vùng Duyên hải Nam Trung Bộ” riêng)
DL.kho.forEach((q) => chu(q).forEach((s) => assert.ok(!/vùng (?:kinh tế – xã hội )?(?:Tây Nguyên|Duyên hải Nam Trung Bộ(?! và Tây Nguyên))/.test(s) && !/(?:7|bảy) vùng kinh tế/.test(s), ten.get(q) + ": tên vùng theo 6 vùng kinh tế – xã hội: " + s)));

/* ---------- lời dặn, mức độ, ma trận ---------- */
const SO = "Từ năm học 2026–2027 Sở GD&ĐT ra đề chung cuối kì một số môn lớp 12; xem thông báo của Sở về môn và cấu trúc đề.";
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
  m.DE.forEach((id) => {
    const qs = m.kho.filter((q) => q.src === id);
    assert.deepEqual([...new Set(qs.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, đúng thứ tự");
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => qs.filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t));
    // lời dặn: phạm vi, số câu mỗi phần (tính từ ma trận), bài học tiếp theo, câu về đề chung của Sở
    const note = bank(id).note;
    m.PHAN.forEach(([p, tu, den]) => { const k = sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))); assert.ok(note.includes(p + " " + k + " câu"), id + ": lời dặn ghi “" + p + " " + k + " câu”"); });
    assert.equal(sum(m.PHAN.map(([, tu, den]) => sum(CHU_DE.filter((t) => soBai[t] >= tu && soBai[t] <= den).map((t) => sum(M[t]))))), m.pool.n, m.ma + ": các phần của lời dặn phủ hết ma trận");
    assert.ok(note.includes(m.sau) && note.includes("đối chiếu với đề cương của trường") && note.endsWith(SO), id + ": lời dặn nhắc bài học tiếp theo, đề cương của trường và đề chung của Sở");
  });
  // chủ đề đúng tên bài trong mục lục (README của cuốn ở OnUp-Book); tên chủ đề, phần của lời dặn đúng mục lục
  const readme = path.join(BOOK, "lop-12", m.sach, "README.md");
  if (fs.existsSync(readme)) {
    const md = fs.readFileSync(readme, "utf8"), ml = Object.fromEntries([...md.matchAll(/Bài (\d+)[.:] ([^|*·]+?) \|/g)].map((x) => [+x[1], x[2].trim()]));
    m.BAI.forEach(([t, b]) => assert.equal(m.RUT_GON[t] || t, ml[b], m.ma + ": tên Bài " + b + " theo mục lục"));
    m.PHAN.forEach(([p]) => { const c = /^(Chủ đề|Phần) (\d+) ([^(,]+?)(?: \(|,)/.exec(p); if (c) assert.ok(md.includes((c[1] === "Phần" ? "PHẦN" : c[1]) + " " + c[2] + ". " + c[3].toUpperCase()), m.ma + ": tên " + c[1] + " " + c[2] + " theo mục lục"); });
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

/* ---------- danh sách dùng khi dò lộ đáp án và so chữ với sách ---------- */
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["các nước lớn", "để phát triển", "thu đông năm", "các quốc gia", "các nước thành", "nước thành viên", "giữa các nước",
  "trong khu vực", "các nước trong", "nước trong khu", "mở đầu cuộc", "cuộc chiến tranh", "chiến dịch tây", "hoà bình an", "bình an ninh", "chủ yếu là",
  "công nghiệp và", "nghiệp và xây", "và xây dựng", "tỉ trọng dịch", "trọng dịch vụ", "liên tục qua", "tục qua các", "qua các năm", "tăng liên tục",
  "ứng dụng công", "dụng công nghệ", "đồng bằng sông", "và đồng bằng", "trung bộ và", "bộ và tây", "nhiệt đới ẩm", "vốn đầu tư", "đầu tư nước",
  "tư nước ngoài", "thu hút vốn", "sản lượng điện", "lượng điện năm", "ở thành thị", "ở nông thôn"]);
// đã xem (Phiên N12-ck1-lichsu-diali): chữ chung, câu kia không nói tới điều câu này hỏi. Tên vùng (Đồng bằng sông Hồng, Đồng bằng sông Cửu
// Long, Đông Nam Bộ, Duyên hải Nam Trung Bộ và Tây Nguyên, Trung du và miền núi phía Bắc), tên tỉnh (Quảng Ninh, Thái Nguyên), tên tổ chức, văn
// kiện (Liên hợp quốc, Hiến chương), tên nhóm ngành (chế biến, chế tạo) chỉ có ở câu kia trong bối cảnh khác hoặc là lựa chọn sai, không cho biết
// vùng, tỉnh, nhóm ngành nào trả lời câu này; “quân đồng minh” ở câu về Cách mạng tháng Tám là quân Đồng minh chống phát xít; “chiến tranh xâm
// lược” của Pháp (1945) và của Mỹ là hai cuộc chiến khác nhau; “Pháp phải rút” ở câu Việt Bắc 1947 là rút khỏi Việt Bắc; “phi Mỹ hoá chiến
// tranh” (câu Mậu Thân) không chỉ ra tên chiến lược 1969 – 1973 (lựa chọn sai “Chiến tranh đặc biệt” cũng dùng quân đội Sài Gòn là chính) và
// ngược lại; “lợn” ở câu trang trại của anh Tuấn không cho biết lợn cho phần lớn sản lượng thịt; “cơ sở nghiên cứu”, “hạ tầng tốt” ở câu khu
// công nghệ cao, khu công nghiệp nói về nơi khác, không nói nơi đặt khu nông nghiệp công nghệ cao; “Toàn dân, toàn quân” của bài gợi ý câu tự
// luận không nói đường lối kháng chiến.
const DA_XEM = [
  "ls1#20 → ls1#16: toàn dân toàn", "ls1#14 → ls1#23: quân đồng minh", "ls2#13 → ls1#23: quân đồng minh", "ls2#15 → ls1#23: quân đồng minh",
  "ls2#21 → ls1#23: quân mỹ và", "ls2#16 → ls1#24: chiến tranh xâm", "ls2#16 → ls1#24: tranh xâm lược", "ls1#1 → ls2#1: liên hợp quốc",
  "ls1#2 → ls2#1: hiến chương liên", "ls1#2 → ls2#1: chương liên hợp", "ls1#2 → ls2#1: liên hợp quốc", "ls1#9 → ls2#1: thông qua hiến",
  "ls1#9 → ls2#1: qua hiến chương", "ls2#2 → ls2#1: liên hợp quốc", "ls1#4 → ls2#4: mỹ và liên", "ls1#4 → ls2#4: và liên xô", "ls1#7 → ls2#7: bru nây",
  "ls1#24 → ls2#16: chiến tranh xâm", "ls1#24 → ls2#16: tranh xâm lược", "ls1#18 → ls2#18: pháp phải rút", "ls2#23 → ls2#21: hoá chiến tranh",
  "ls2#21 → ls2#23: hoá chiến tranh", "dl2#17 → dl1#11: lợn", "dl1#24 → dl1#16: cơ sở nghiên", "dl1#24 → dl1#16: sở nghiên cứu",
  "dl1#24 → dl1#16: nghiên cứu và", "dl2#24 → dl1#16: hạ tầng tốt", "dl2#20 → dl1#18: chế biến chế", "dl2#20 → dl1#18: biến chế tạo",
  "dl1#14 → dl1#21: quảng ninh", "dl1#2 → dl2#6: bằng sông hồng", "dl2#2 → dl2#6: bằng sông hồng", "dl2#12 → dl2#6: bằng sông hồng",
  "dl2#14 → dl2#6: bằng sông hồng", "dl2#16 → dl2#6: bằng sông hồng", "dl2#24 → dl2#6: bằng sông hồng", "dl1#22 → dl2#14: bằng sông cửu",
  "dl1#22 → dl2#14: sông cửu long", "dl2#6 → dl2#14: bằng sông cửu", "dl2#6 → dl2#14: sông cửu long", "dl2#12 → dl2#14: bằng sông cửu",
  "dl2#12 → dl2#14: sông cửu long", "dl2#16 → dl2#14: bằng sông cửu", "dl2#16 → dl2#14: sông cửu long", "dl2#24 → dl2#14: bằng sông cửu",
  "dl2#24 → dl2#14: sông cửu long", "dl1#14 → dl2#16: nam trung bộ", "dl1#14 → dl2#16: đông nam bộ", "dl1#22 → dl2#16: đông nam bộ",
  "dl2#6 → dl2#16: đông nam bộ", "dl2#8 → dl2#16: duyên hải nam", "dl2#8 → dl2#16: hải nam trung", "dl2#8 → dl2#16: nam trung bộ",
  "dl2#8 → dl2#16: và tây nguyên", "dl2#21 → dl2#16: duyên hải nam", "dl2#21 → dl2#16: hải nam trung", "dl2#21 → dl2#16: nam trung bộ",
  "dl2#21 → dl2#16: và tây nguyên", "dl2#21 → dl2#16: đông nam bộ", "dl2#24 → dl2#16: đông nam bộ", "dl1#21 → dl2#18: thái nguyên",
  "dl2#1 → dl2#18: thái nguyên", "dl2#14 → dl2#21: trung du và", "dl2#14 → dl2#21: du và miền", "dl2#14 → dl2#21: và miền núi",
  "dl2#14 → dl2#21: miền núi phía", "dl2#14 → dl2#21: núi phía bắc", "dl2#16 → dl2#21: trung du và", "dl2#16 → dl2#21: du và miền",
  "dl2#16 → dl2#21: và miền núi", "dl2#16 → dl2#21: miền núi phía", "dl2#16 → dl2#21: núi phía bắc", "dl2#24 → dl2#21: trung du và",
  "dl2#24 → dl2#21: du và miền", "dl2#24 → dl2#21: và miền núi", "dl2#24 → dl2#21: miền núi phía", "dl2#24 → dl2#21: núi phía bắc",
  "dl1#2 → dl2#24: bằng sông hồng", "dl1#14 → dl2#24: đông nam bộ", "dl1#22 → dl2#24: đông nam bộ", "dl2#2 → dl2#24: bằng sông hồng",
  "dl2#6 → dl2#24: đông nam bộ", "dl2#6 → dl2#24: bằng sông hồng", "dl2#12 → dl2#24: bằng sông hồng", "dl2#14 → dl2#24: bằng sông hồng",
  "dl2#16 → dl2#24: đông nam bộ", "dl2#16 → dl2#24: bằng sông hồng", "dl2#21 → dl2#24: đông nam bộ"
];
// tên riêng nhiều chữ (tổ chức, văn kiện, sự kiện, chiến dịch, chiến lược, địa danh, vùng, ngư trường, khu vực kinh tế, ngành): mỗi tên tính
// là một từ khi so với chữ của sách và của kho khác (như tests/lsdl-gdcd9-ck1.js)
const GOP = [
  // Lịch sử, Chủ đề 1–2
  "Trật tự thế giới hai cực I-an-ta", "Hiến chương Liên hợp quốc", "Liên hợp quốc", "Hội đồng Bảo an", "Đại hội đồng", "Hội Quốc liên", "Hội nghị I-an-ta", "trật tự hai cực I-an-ta", "I-an-ta",
  "Xan Phran-xi-xcô", "Chiến tranh lạnh", "Chiến tranh thế giới thứ hai", "Chiến tranh thế giới thứ nhất", "Liên Xô", "Liên bang Nga", "Liên minh châu Âu",
  "Trung Quốc", "Nhật Bản", "Ấn Độ", "Tây Âu", "Đông Âu", "Đông Nam Á", "Đông Bắc Á", "Tây Á", "Nam Á", "Mỹ La-tinh",
  "Hiệp hội các quốc gia Đông Nam Á", "Cộng đồng Chính trị – An ninh ASEAN", "Cộng đồng Kinh tế ASEAN", "Cộng đồng Văn hoá – Xã hội ASEAN", "Cộng đồng ASEAN",
  "Hiến chương ASEAN", "Hiệp ước Thân thiện và Hợp tác ở Đông Nam Á", "Khu vực Mậu dịch tự do ASEAN", "Tuyên bố Băng Cốc", "Băng Cốc", "Tầm nhìn ASEAN 2025",
  "Bru-nây", "Xin-ga-po", "Thái Lan", "In-đô-nê-xi-a", "Ma-lai-xi-a", "Phi-líp-pin", "Mi-an-ma", "Cam-pu-chia",
  // Lịch sử, Bài 6
  "Cách mạng tháng Tám năm 1945", "Cách mạng tháng Tám", "Uỷ ban Khởi nghĩa toàn quốc", "Uỷ ban Dân tộc giải phóng Việt Nam", "Quân lệnh số 1", "Lệnh Tổng khởi nghĩa",
  "Hội nghị toàn quốc của Đảng", "Đại hội Quốc dân", "Tổng khởi nghĩa", "Tân Trào", "Bảo Đại", "Trần Trọng Kim", "Tuyên ngôn Độc lập", "Việt Nam Dân chủ Cộng hoà",
  "Chính phủ lâm thời", "Hồ Chí Minh", "Quảng trường Ba Đình", "Ba Đình", "Pốt-xđam", "Trung Hoa Dân quốc", "Quan Đông", "Đồng minh", "Đồng Nai Thượng", "Hà Tiên",
  "Sài Gòn", "Đảng Cộng sản Đông Dương", "Đảng Cộng sản Việt Nam", "Đông Dương", "Tổng bộ Việt Minh", "Mặt trận Việt Minh", "Việt Minh",
  // Lịch sử, Bài 7
  "kháng chiến chống thực dân Pháp", "Chiến dịch Việt Bắc thu – đông năm 1947", "Chiến dịch Biên giới thu – đông năm 1950", "Chiến dịch Việt Bắc", "Chiến dịch Biên giới",
  "Chiến dịch Điện Biên Phủ", "Điện Biên Phủ", "Kế hoạch Na-va", "Na-va", "Hiệp định Giơ-ne-vơ", "Giơ-ne-vơ", "Đảng Lao động Việt Nam", "Đảng Dân chủ Việt Nam",
  "Mặt trận Liên Việt", "Hội Liên Việt", "Chiến dịch Hoà Bình", "Chiến dịch Tây Bắc", "Chiến dịch Thượng Lào", "Thượng Lào", "Luật Cải cách ruộng đất", "Him Lam", "Mường Thanh", "Bản Kéo", "Việt Bắc",
  "Đại hội đại biểu toàn quốc lần thứ II", "Đại hội đại biểu toàn quốc lần thứ III", "Đại hội đại biểu toàn quốc",
  // Lịch sử, Bài 8
  "kháng chiến chống Mỹ, cứu nước", "Phong trào Đồng khởi", "Đồng khởi", "Chiến tranh đặc biệt", "Chiến tranh cục bộ", "Việt Nam hoá chiến tranh",
  "Chiến tranh đơn phương", "Mặt trận Dân tộc giải phóng miền Nam Việt Nam", "Quân Giải phóng miền Nam", "Vạn Tường",
  "Chính phủ cách mạng lâm thời Cộng hoà miền Nam Việt Nam", "Cộng hoà miền Nam Việt Nam", "Việt Nam Cộng hoà", "Ngô Đình Diệm",
  "Tổng tiến công và nổi dậy Xuân Mậu Thân năm 1968", "Tổng tiến công và nổi dậy Xuân Mậu Thân", "Xuân Mậu Thân", "Mậu Thân", "Hiệp định Pa-ri", "Pa-ri",
  "Tổng tiến công và nổi dậy Xuân 1975", "Chiến dịch Tây Nguyên", "Chiến dịch Huế – Đà Nẵng", "Chiến dịch Hồ Chí Minh", "Phước Long", "Buôn Ma Thuột",
  "Đường Hồ Chí Minh", "Trường Sơn", "Đà Nẵng", "Hà Nội", "Nam Bộ", "Trung Bộ", "Bắc Bộ", "Việt Nam",
  // Địa lí: vùng, địa danh, ngư trường, gió, khu vực kinh tế, ngành
  "Trung du và miền núi phía Bắc", "Đồng bằng sông Hồng", "Bắc Trung Bộ", "Duyên hải Nam Trung Bộ và Tây Nguyên", "Đông Nam Bộ", "Đồng bằng sông Cửu Long",
  "Tây Nguyên", "Nam Trung Bộ", "Cửu Long", "sông Hồng", "Biển Đông", "Lũng Cú", "Đất Mũi", "Sín Thầu", "Pu Sam Sao", "Hoàng Liên Sơn", "Trường Sơn Bắc",
  "Trường Sơn Nam", "Bạch Mã", "Đại Lãnh", "quần đảo Hoàng Sa", "quần đảo Trường Sa", "Hoàng Sa", "Trường Sa", "Ấn Độ Dương", "Thái Bình Dương", "Nam Côn Sơn",
  "Phú Mỹ", "Nhơn Trạch", "Ô Môn", "Thành phố Hồ Chí Minh", "Hải Phòng – Quảng Ninh", "Cà Mau – An Giang", "Khánh Hoà – Lâm Đồng – Thành phố Hồ Chí Minh",
  "Hải Phòng", "Quảng Ninh", "Khánh Hoà", "Cà Mau", "An Giang", "Lâm Đồng", "Hà Tĩnh", "Lạng Sơn", "Bắc Ninh", "Tuyên Quang", "Sơn La", "Lào Cai", "Cao Bằng",
  "Thái Nguyên", "Đồng Nai", "Cần Thơ", "Quảng Ngãi", "Lai Châu", "Điện Biên", "Gia Lai", "Đắk Lắk", "Thanh Hoá", "Nghệ An", "Phú Thọ", "Hưng Yên", "Ninh Bình",
  "Quảng Trị", "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "gió mùa Đông Bắc", "gió mùa Tây Nam", "Tín phong bán cầu Bắc", "áp cao Xi-bia", "áp cao cận chí tuyến bán cầu Nam", "dải hội tụ nhiệt đới", "đai ôn đới gió mùa trên núi", "Bắc Ấn Độ Dương", "Phan-xi-păng", "khu nông nghiệp ứng dụng công nghệ cao",
  "khu công nghệ cao", "khu công nghiệp", "khu kinh tế", "khu chế xuất", "trung tâm công nghiệp", "khu vực có vốn đầu tư nước ngoài", "đầu tư trực tiếp nước ngoài",
  "kinh tế Nhà nước", "kinh tế ngoài Nhà nước", "nông nghiệp, lâm nghiệp và thuỷ sản", "công nghiệp và xây dựng", "công nghiệp chế biến, chế tạo",
  "sản xuất và phân phối điện", "tổng sản phẩm trên địa bàn", "tổng sản phẩm trong nước"
];
// cụm từ chung của môn: tên bài, tên chủ đề, cách nói chuẩn của đề (thay bằng dấu ngăn trước khi so)
const TU_CHUNG = [...LS.BAI, ...DL.BAI].map((b) => b[0]).concat(Object.values(LS.RUT_GON), Object.values(DL.RUT_GON), ["mỗi ý sau đúng hay sai",
  "Sắp xếp các sự kiện sau theo trình tự thời gian", "sự kiện sớm nhất đứng đầu", "Nhận xét nào sau đây đúng", "Cho bảng số liệu", "Cho biểu đồ", "Theo biểu đồ",
  "làm tròn kết quả đến hàng đơn vị", "làm tròn kết quả đến một chữ số thập phân", "số liệu tự đặt", "Thế giới trong và sau Chiến tranh lạnh", "ASEAN: những chặng đường lịch sử",
  // thuật ngữ, tên chỉ tiêu thống kê, tên nhóm ngành công nghiệp, tên vùng biển, đới cảnh quan như sách Địa lí 12
  "Sản xuất và phân phối điện, khí đốt, nước nóng, hơi nước, điều hoà không khí", "Cung cấp nước, quản lí và xử lí rác thải, nước thải",
  "kinh tế thị trường định hướng xã hội chủ nghĩa", "lao động từ 15 tuổi trở lên đã qua đào tạo", "chuyển dịch cơ cấu công nghiệp theo ngành",
  "sản phẩm điện tử, máy vi tính", "cơ cấu giá trị sản xuất", "giá trị sản xuất", "tốc độ tăng trưởng", "sản lượng thuỷ sản nuôi trồng", "sản lượng thuỷ sản khai thác",
  "tỉ lệ thất nghiệp", "tỉ lệ thiếu việc làm", "cây công nghiệp lâu năm", "cây công nghiệp hằng năm", "cây ăn quả", "rừng ngập mặn", "rừng phòng hộ ven biển",
  "vùng kinh tế – xã hội", "vùng chuyên canh", "biên giới quốc gia trên biển", "vùng đặc quyền kinh tế", "vùng tiếp giáp lãnh hải",
  "cận nhiệt đới gió mùa trên núi", "cận xích đạo gió mùa", "nhiệt đới gió mùa"]);
// khẩu hiệu, phương châm, tên chiến lược, chiến thuật trong ngoặc kép như sách: không tính là chép sách
const TRICH = ["Hiệp định Giơ-ne-vơ về chấm dứt chiến tranh, lập lại hoà bình ở Đông Dương", "toàn dân, toàn diện, trường kì, tự lực cánh sinh, tranh thủ sự ủng hộ của quốc tế",
  "toàn dân, toàn diện, trường kì, tự lực cánh sinh", "đánh nhanh, thắng nhanh", "dùng người Việt đánh người Việt", "phi Mỹ hoá", "tìm diệt", "cố vấn", "ấp chiến lược", "quốc sách"];

/* ---------- dò lộ đáp án giữa hai câu rút được cùng lúc ----------
   Đề ngẫu nhiên rút câu ở mọi ô, đề “Ôn chủ đề” rút chung mọi câu của một chủ đề (trừ tự luận), nên xét mọi cặp câu cùng môn, trừ cặp có
   câu tự luận nằm cùng một ô rút 1 câu. Đáp án là số (trả lời ngắn, lựa chọn đúng dạng “25%”; từ hai chữ số, hoặc số thập phân) tìm ở vị
   trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”, “đạt”; không tính số đứng trước một phép tính) cùng đơn vị: không được
   có. Đáp án bằng chữ (lựa chọn đúng của câu nhiều lựa chọn) tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp
   án); chuỗi có trong đề bài, lựa chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. Ô của câu sắp
   xếp: hai ô liền nhau theo đúng thứ tự có ở câu kia (cùng câu sắp xếp khác) thì in ra để xem tay. */
const DON_VI = "(?:triệu người|nghìn người|người\\/km²|nghìn ha|nghìn tấn|triệu tấn|tỉ kWh|tạ\\/ha|tấn\\/ha|nghìn tỉ đồng|năm|lần|%)";
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
   Tên riêng nhiều chữ (GOP: tổ chức, văn kiện, sự kiện, chiến dịch, vùng, ngành) tính là một từ như tests/lsdl4-ck2.js, tests/lsdl-gdcd9-ck1.js;
   cụm từ chung của môn (TU_CHUNG: tên bài, cách nói chuẩn của đề) thay bằng dấu ngăn; câu trích nguyên văn (TRICH) không tính. Chuỗi so
   phải có ít nhất 5 từ có chữ. */
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const boDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP_ = GOP.map(boDau).sort((a, b) => b.length - a.length), TU_CHUNG_ = TU_CHUNG.map((p) => " " + boDau(p) + " ").sort((a, b) => b.length - a.length);
const khongDau = (s) => {
  let t = " " + boDau(TRICH.reduce((x, c) => x.split(c).join(" | "), String(s).normalize("NFC"))) + " ";
  TU_CHUNG_.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  GOP_.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); });
  return t.replace(/[aeiouy]+/g, "a").replace(/\s+/g, " ").trim();
};
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
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const cua = (b, q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const khac = BANKS.filter((b) => !b.pool && !MON.some((m) => m.file === b.file)).flatMap((b) => b.questions.map((q) => cua(b, q)))
    .concat(BANKS.filter((b) => b.pool && !MON.some((m) => m.file === b.file)).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => tatCa.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
/* ---------- tự thử: bộ dò lộ đáp án, bộ đọc hình bắt được chỗ cố ý viết sai ---------- */
{
  const tim = (has) => tatCa.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const r = doLo(qs, Object.assign({}, LS.M, DL.M), (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const matDo = tim("tỉnh Y có diện tích 7 850 km²"), than = tim("Than được khai thác chủ yếu ở tỉnh nào");
  assert.deepEqual(thuLo([matDo, gia(than, "Mật độ dân số của vùng này đạt 300 người/km².")]), ["300 người/km²"]);
  assert.deepEqual(thuLo([matDo, gia(than, "Có 300 người làm ở mỏ.")]), []);
  assert.deepEqual(thuLo([than, gia(matDo, "Than đá tập trung ở Quảng Ninh.")]), ["quảng ninh"]);
  const xep = LS.kho.filter((q) => q.type === "order"), [x1, x2] = xep;
  // hai ô liền nhau đúng thứ tự có ở câu sắp xếp kia: báo ở cả hai chiều
  assert.deepEqual(thuLo([x1, Object.assign({}, x2, { o: [x1.o[1], x1.o[2], x2.o[0], x2.o[1]] })]), [x1.o[1] + " → " + x1.o[2], x1.o[1] + " → " + x1.o[2]]);
  // ngày tháng của câu về trình tự thời gian có ở câu kia (ngày nhiều hôm như “14, 15 – 8” không tính là ngày 15 – 8)
  const thuNgay = (qs) => loNgay(qs, LS.M, (q) => q.q.slice(0, 12)).map((s) => s.replace(/^.*: /, ""));
  const trinhTu = tim("về trình tự các sự kiện của Cách mạng tháng Tám"), bao = tim("làm báo tường về Cách mạng tháng Tám");
  assert.deepEqual(thuNgay([trinhTu, gia(bao, "Huế giành chính quyền ngày 23 – 8.")]), ["ngày 23 – 8"]);
  assert.deepEqual(thuNgay([x1, gia(bao, "Ngày 15 – 8 – 1945, Nhật Bản đầu hàng.")]), ["ngày 15 – 8"]);
  assert.deepEqual(thuNgay([x1, gia(bao, "Ngày 14, 15 – 8, Đảng họp Hội nghị toàn quốc.")]), []);
  // đổi một số ghi trên hình (số liệu, phần trăm) thì bộ đọc báo lỗi
  const hinh = (has) => tim(has).svg, doi = (svg, lab, moi) => { assert.ok(svg.includes(">" + lab + "<"), "hình có số " + lab); return svg.replace(">" + lab + "<", ">" + moi + "<"); };
  const tron = hinh("(GRDP) của tỉnh V"), v1 = Object.values(Object.values(docTron(tron))[0])[0];
  assert.throws(() => docTron(doi(tron, vn(v1) + "%", vn(v1 + 4) + "%")));
  const cot = hinh("sản lượng điện phát ra của các nhà máy"), v2 = docCot(cot, "Tỉ kWh")[1].v;
  assert.throws(() => docCot(doi(cot, vn(v2), vn(v2 + 2)), "Tỉ kWh"));
  const cot2 = hinh("sản lượng thuỷ sản khai thác và nuôi trồng của tỉnh Z"), v3 = Object.values(Object.values(docCot(cot2, "Nghìn tấn"))[0])[0];
  assert.throws(() => docCot(doi(cot2, vn(v3), vn(v3 + 30)), "Nghìn tấn"));
  const duong = hinh("tốc độ tăng trưởng giá trị sản xuất của hai ngành"), d = docDuong(duong, "%")["Khai khoáng"], v4 = d[d.length - 1].v;
  assert.throws(() => docDuong(doi(duong, vn(v4), vn(v4 + 20)), "%"));
  const mien = hinh("cơ cấu giá trị sản xuất nông nghiệp của tỉnh Y"), v5 = Object.values(docMien(mien)["Chăn nuôi"])[0];
  assert.throws(() => docMien(doi(mien, vn(v5), vn(v5 + 5))));
  const kh = hinh("diện tích và sản lượng cà phê của tỉnh M"), v6 = docKetHop(kh).cot.v[0].v;
  assert.throws(() => docKetHop(doi(kh, vn(v6), vn(v6 + 40))));
  // bảng ngày tháng: đảo hai ô của câu sắp xếp thì không còn đúng thứ tự
  assert.notDeepEqual([x1.o[1], x1.o[0], ...x1.o.slice(2)], theoThoiGian(x1));
}
MON.forEach((m) => console.log(`${m.ten} 12: kho ${m.kho.length} câu (${m.DE.length} đề cố định, ${m.pool.n} câu mỗi đề), ma trận 10 – 8 – 7 trên ${Object.keys(m.M).length} chủ đề; ` +
  `${m.kho.filter((q) => q.type === "tf4").length} câu đúng/sai 4 ý, ${m.kho.filter((q) => q.type === "num").length} câu trả lời ngắn, ${m.kho.filter((q) => q.type === "order").length} câu sắp xếp, ${m.kho.filter((q) => q.type === "essay").length} câu tự luận; đáp án đúng dài nhất hoặc ngắn nhất ở ${m.le} câu nhiều lựa chọn.`));
console.log("Địa lí 12: " + DL.kho.filter((q) => q.svg).length + " câu có biểu đồ (" + [...new Set(DL.kho.filter((q) => q.svg).map((q) => LOAI_HINH.get(q.svg)))].join(", ") + ").");
console.log(n + " câu, ý đã tính lại hoặc đọc lại hình.");
console.log("MATH OK");
