// Kiểm tra các đề Địa lí thi thử tốt nghiệp THPT (data/banks/12-diali.js, diali12-tn-de<N>; Phiên N12-tn-diali: Đề 1–4; phiên sau thêm đề
// thì mở rộng script này: thêm các mục kiểm tra của đề mới vào RIENG). Đề tính điểm theo khung đề tốt nghiệp THPT từ năm 2025 (Quyết định
// 764/QĐ-BGDĐT; docs/KE-HOACH-NOI-DUNG.md, mục 2 và mục 7, khối “Phiên N12-tn-diali”). Số đề, số câu lấy từ danh mục.
// Khung: danh mục (tên, khối 12, môn Địa lí, file, 50 phút, pts 10, gắn vào tn-thpt-2027); Phần I 18 câu nhiều lựa chọn pt 0,25, Phần II
// 4 câu đúng/sai 4 ý pt 1, Phần III 6 câu trả lời ngắn pt 0,25 (đúng tên part, đúng thứ tự), Quiz.grade điểm tối đa 4,5 – 4 – 1,5; đáp án
// Phần III là số, không quá 4 kí tự (dấu trừ, dấu phẩy tính một kí tự), câu dặn làm tròn có tol bằng nửa đơn vị làm tròn và lời giải ghi
// “≈ …”; mức độ (nhận biết và thông hiểu khoảng 70% số câu như đề tham khảo năm 2025): Phần I 10 Biết, 6 Hiểu, 2 Vận dụng; Phần II bốn
// câu ghi mức 1, 2, 3, 3; Phần III 1 Biết, 2 Hiểu, 3 Vận dụng. Phạm vi như đề tham khảo năm 2025 (100% lớp 12) và đề chính thức năm 2026
// (chủ yếu lớp 12, có số liệu lớp 11 và nội dung lớp 10): mỗi đề 24 câu Địa lí 12, mỗi chủ đề (bài lí thuyết của sách) đúng một câu, câu
// mang đúng chữ chủ đề của ba kho Địa lí 12 (cuối kì I, giữa kì II, cuối năm); 3 câu Địa lí 11 (hai câu ở Phần I, một câu ở Phần III) và 1
// câu Địa lí 10 (Phần I), đều là câu kĩ năng (bảng số liệu, biểu đồ, tính toán), chủ đề “Lớp 11 · ”, “Lớp 10 · ” và tên phần, chương của
// sách (đối chiếu mục lục trong README của cuốn ở OnUp-Book); trong mỗi phần, câu lớp 12 theo thứ tự bài, câu lớp 10, 11 đứng sau; Phần II
// có câu đoạn thông tin, câu bảng số liệu, câu biểu đồ; mỗi đề ít nhất hai biểu đồ, các đề có đủ năm loại biểu đồ; lời dặn ghi đúng số câu,
// số điểm, số câu mỗi lớp tính từ dữ liệu.
// Mỗi câu khớp đúng một mục kiểm tra của đề đó (theo chữ has trong đề bài), mục đó đọc số liệu trong đề bài hoặc hình rồi tính lại đáp án
// bằng code (tỉ trọng, tốc độ tăng trưởng, mật độ dân số, năng suất, bình quân đầu người, cán cân xuất nhập khẩu, tỉ lệ, cự li vận chuyển
// trung bình…; câu đọc biểu đồ, bảng: mỗi lựa chọn, mỗi ý xét lại bằng một luật trên số liệu), hoặc so với bảng ghi trong script (câu kiến
// thức theo trang của sách Địa lí 12 in năm 2026). Năm loại biểu đồ tự vẽ (cột một dãy và hai dãy, tròn, đường, miền, kết hợp cột và đường)
// đọc lại bằng bộ đọc của tests/lichsu-diali12-ck2.js (trục số, số ghi khớp vị trí, góc của phần tròn khớp phần trăm, bề dày miền, chú giải,
// năm), chữ trong hình không đè nhau, không đè chấm tròn, nằm trọn trong khung (ước bề rộng chữ).
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân, dấu thanh kiểu sách “hoá”, “thuỷ”; 34 tỉnh, thành phố, tên tỉnh đã
// nhập chỉ ghi kèm “nay thuộc …”, 6 vùng kinh tế – xã hội, không “huyện”, “63 tỉnh”); kiểu Đ/S không lặp trong một đề, mỗi kiểu nhiều nhất ba
// lần trong các đề thi thử; đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và
// không dưới một phần sáu số câu nhiều lựa chọn của đề, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu
// bằng một chữ mà đáp án đúng không có; lời giải không nhắc vị trí của phương án. So với ba kho Địa lí 12 và giữa các đề thi thử: đề bài không
// trùng câu nào trong file, không gần trùng (chuỗi 6 từ; cặp hai âm tiết chung), đáp án không trùng câu cùng chủ đề. Dò lộ đáp án giữa mọi câu
// của một đề và với lời dặn, giữa câu cùng chủ đề của các đề thi thử và ba kho Địa lí 12 (đề “Ôn chủ đề” rút chung; số ở vị trí kết quả cùng
// đơn vị, cả số trong khoảng tol của đáp án; đáp án bằng chữ đã xem ghi ở DA_XEM). Có ../OnUp-Book thì so mọi trường chữ (cả lời dặn) với chữ
// OCR của mọi cuốn sau khi bỏ dấu, gộp nguyên âm, gộp tên riêng nhiều chữ (không chuỗi 8 từ nào trùng) và với câu của mọi kho khác, cả giữa
// các đề thi thử với nhau. Bộ đọc hình, bộ dò chữ đè, bộ dò lộ tự thử với hình, câu cố ý viết sai.
// Chạy: node tests/diali12-tn.js → in MATH OK. DO_LO=1: in đáp án bằng chữ có ở câu khác; DO_SACH=1: in chuỗi 6 từ trùng chữ của sách;
// DO_SACH8=1: in đoạn trùng sách của từng trường chữ; DO_KHO=1: in chuỗi 6 từ trùng câu của kho khác.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, EVENTS = ctx.window.ONTAP_SEED_EVENTS;
const sum = (a) => a.reduce((s, v) => s + v, 0);

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
// chữ trong hình không đè nhau, không đè chấm tròn, nằm trọn trong khung hình (ước bề rộng chữ cỡ 15 của Noto Sans: chữ số 8,6; dấu phẩy, dấu
// chấm, khoảng trắng 4; “%” 12,6; chữ hoa và m, w 10,5; chữ khác 8,2; chữ đậm thêm 5%; chiều cao từ 11 trên chân chữ đến 3 dưới chân chữ)
const rongChu = (s) => [...s].reduce((w, c) => w + (/[0-9]/.test(c) ? 8.6 : /[,. ]/.test(c) ? 4 : c === "%" ? 12.6 : /[A-ZĐĂÂÊÔƠƯNMWmw]/.test(c) ? 10.5 : 8.2), 0);
const deChu = (svg) => {
  const vb = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg), W = +vb[1], H = +vb[2], loi = [];
  const hop = texts(svg).map((t) => { const w = rongChu(t.t) * (t["font-weight"] ? 1.05 : 1), x = +t.x, yy = +t.y;
    const l = t["text-anchor"] === "middle" ? x - w / 2 : t["text-anchor"] === "end" ? x - w : x; return { t: t.t, l, r: l + w, top: yy - 11, bot: yy + 3 }; });
  hop.forEach((b) => { if (b.l < 0 || b.r > W || b.top < 0 || b.bot > H) loi.push("chữ ra ngoài khung hình: " + b.t); });
  hop.forEach((a, i) => hop.slice(i + 1).forEach((b) => { if (a.l < b.r - 0.5 && b.l < a.r - 0.5 && a.top < b.bot - 0.5 && b.top < a.bot - 0.5) loi.push("chữ đè chữ: " + a.t + " / " + b.t); }));
  tags(svg, "circle").forEach((c) => hop.forEach((b) => { if (+c.cx + 3.5 > b.l && +c.cx - 3.5 < b.r && +c.cy + 3.5 > b.top && +c.cy - 3.5 < b.bot) loi.push("chấm tròn đè chữ " + b.t); }));
  return loi;
};

/* ---------- các mục kiểm tra của từng đề (RIENG; phiên thêm đề thì thêm một khoá mới) ----------
   has: đoạn chữ có trong đề bài của đúng một câu của đề; right(q) trả đáp án tính được (số của câu trả lời ngắn, lựa chọn đúng của câu nhiều
   lựa chọn, mảng 4 ý của câu đúng/sai). Câu kiến thức so với bảng ghi trong script (trang in của sách Địa lí 12 in năm 2026). */
const nam = (o) => Object.keys(o).map(Number).sort((a, b) => a - b);
const tangLT = (a) => a.every((v, i) => !i || v > a[i - 1]), giamLT = (a) => a.every((v, i) => !i || v < a[i - 1]);
const theoNam = (day) => Object.fromEntries(day.map((p) => [p.nam, p.v]));
// câu trả lời ngắn tính từ chữ của đề bài: đọc các số theo mẫu, so lời giải có các bước tính
const tinh = (mau, f, ...loiGiai) => (q) => { const v = so(q.q, mau); const kq = f(...v); loiGiai.forEach((g) => coX(q, typeof g === "function" ? g(...v) : g)); return kq; };
// mỗi ý của câu đúng/sai: [biểu thức chữ, hàm tính trên số liệu]; ý nào cũng khớp đúng một luật
const yTung = (q, LUAT) => q.o.map((o) => { const l = LUAT.map(([re, f]) => [re.exec(o), f]).filter(([m]) => m); assert.equal(l.length, 1, "ý nào cũng có đúng một luật: " + o); return !!l[0][1](l[0][0]); });
// đọc bảng số liệu viết trong đề bài: “Năm 2015: tên 1 số; tên 2 số…”
const bangNam = (q, nam_, ten_) => { const ra = {}; nam_.forEach((n) => { const m = new RegExp("Năm " + n + ": ([^.]*)\\.").exec(q.q); assert.ok(m, "bảng thiếu năm " + n); ra[n] = so(m[1], ten_.map((t) => t + " #").join("; ")); }); return ra; };
// câu kiến thức: đáp án theo sách (trang in), so với o[0] hay mảng ý
const sach = (trang, da) => () => da;

/* ---------- chủ đề, mục lục, bảng số liệu của sách ---------- */
// chữ chủ đề của ba kho Địa lí 12 (cuối kì I, giữa kì II, cuối năm): câu lớp 12 của đề thi thử mang đúng các chữ này
const CD12 = new Set(BANKS.filter((b) => b.file === "12-diali.js" && !b.pool && !/^diali12-tn-/.test(b.id)).flatMap((b) => b.questions.map((q) => q.topic)));
// 24 bài lí thuyết của Địa lí 12 (bản chỉnh sửa năm 2026) theo thứ tự; bài thực hành (4, 6, 10, 15, 19, 23, 26, 29, 32, 34, 35) không có chủ đề
const BAI = ["Vị trí địa lí và phạm vi lãnh thổ", "Thiên nhiên nhiệt đới ẩm gió mùa", "Sự phân hoá đa dạng của thiên nhiên",
  "Sử dụng hợp lí tài nguyên thiên nhiên và bảo vệ môi trường", "Dân số Việt Nam", "Lao động và việc làm", "Đô thị hoá", "Chuyển dịch cơ cấu kinh tế",
  "Vấn đề phát triển ngành nông nghiệp", "Vấn đề phát triển ngành lâm nghiệp và thuỷ sản", "Tổ chức lãnh thổ nông nghiệp", "Chuyển dịch cơ cấu ngành công nghiệp",
  "Một số ngành công nghiệp", "Một số hình thức tổ chức lãnh thổ công nghiệp", "Vai trò, các nhân tố ảnh hưởng đến các ngành dịch vụ",
  "Giao thông vận tải và bưu chính viễn thông", "Thương mại và du lịch", "Khai thác thế mạnh ở Trung du và miền núi phía Bắc",
  "Phát triển kinh tế – xã hội ở Đồng bằng sông Hồng", "Phát triển kinh tế – xã hội ở Bắc Trung Bộ", "Phát triển kinh tế – xã hội ở Nam Trung Bộ",
  "Phát triển kinh tế – xã hội ở Đông Nam Bộ", "Sử dụng hợp lí tự nhiên ở Đồng bằng sông Cửu Long", "Phát triển kinh tế và đảm bảo quốc phòng, an ninh ở Biển Đông"];
const SO_BAI = [1, 2, 3, 5, 7, 8, 9, 11, 12, 13, 14, 16, 17, 18, 20, 21, 22, 24, 25, 27, 28, 30, 31, 33];
assert.equal(BAI.length, SO_BAI.length);
assert.deepEqual([...CD12].sort(), [...BAI].sort(), "chủ đề của ba kho Địa lí 12 đúng 24 bài lí thuyết");
// tên bài rút gọn như các kho (cho vừa mã đề “Ôn chủ đề”)
const RUT_GON = {
  "Sử dụng hợp lí tài nguyên thiên nhiên và bảo vệ môi trường": "Vấn đề sử dụng hợp lí tài nguyên thiên nhiên và bảo vệ môi trường",
  "Vai trò, các nhân tố ảnh hưởng đến các ngành dịch vụ": "Vai trò, các nhân tố ảnh hưởng đến sự phát triển và phân bố các ngành dịch vụ",
  "Phát triển kinh tế – xã hội ở Nam Trung Bộ": "Phát triển kinh tế – xã hội ở Duyên hải Nam Trung Bộ và Tây Nguyên (Nam Trung Bộ)",
  "Sử dụng hợp lí tự nhiên ở Đồng bằng sông Cửu Long": "Sử dụng hợp lí tự nhiên để phát triển kinh tế ở Đồng bằng sông Cửu Long",
  "Phát triển kinh tế và đảm bảo quốc phòng, an ninh ở Biển Đông": "Phát triển kinh tế và đảm bảo quốc phòng, an ninh ở Biển Đông và các đảo, quần đảo"
};
// tên phần, khu vực của Địa lí 11 và tên chương của Địa lí 10 dùng làm chủ đề câu lớp 10, 11
const CHUONG_11 = ["Một số vấn đề về kinh tế – xã hội thế giới", "Khu vực Mỹ La tinh", "Liên minh châu Âu (EU)", "Khu vực Đông Nam Á", "Khu vực Tây Nam Á"];
const CHUONG_10 = ["Khí quyển", "Địa lí dân cư", "Địa lí ngành dịch vụ"];
// Bảng 16.2 (tr. 73): cơ cấu giá trị sản xuất công nghiệp phân theo vùng năm 2010 và năm 2024 (%)
const BANG_16_2 = { "Trung du và miền núi phía Bắc": [5.2, 10.9], "Đồng bằng sông Hồng": [22.5, 36.5], "Bắc Trung Bộ": [2.4, 5.0],
  "Duyên hải Nam Trung Bộ và Tây Nguyên": [8.0, 6.4], "Đông Nam Bộ": [53.3, 34.9], "Đồng bằng sông Cửu Long": [8.6, 6.3] };
[0, 1].forEach((k) => assert.ok(Math.abs(sum(Object.values(BANG_16_2).map((v) => v[k])) - 100) < 1e-9, "Bảng 16.2 cộng lại 100%"));
// Bảng 18 (tr. 84–85): các khu công nghệ cao đến năm 2025: năm thành lập, diện tích (ha)
const KHU_CNC = [["Khu công nghệ cao Hoà Lạc (Hà Nội)", 1998, 1586.0], ["Khu công nghệ cao Thành phố Hồ Chí Minh", 2002, 913.2], ["Khu công nghệ cao Đà Nẵng", 2010, 1128.4],
  ["Khu công nghệ cao công nghệ sinh học Đồng Nai", 2016, 207.8], ["Khu công nghệ cao sinh học Hà Nội", 2025, 199.0]];
// Hình 17.3 (tr. 77): cơ cấu sản lượng điện năm 2024 (%); điện gió, điện mặt trời nằm trong năng lượng tái tạo
const DIEN_2024 = { "Thuỷ điện": 28.7, "Nhiệt điện": 56.6, "Năng lượng tái tạo": 12.8, "Nguồn khác": 1.9 };
// tr. 44: tỉ lệ dân thành thị năm 2024 của một số địa phương (%)
const THANH_THI_2024 = { "Thành phố Hồ Chí Minh": 78.1, "Hà Nội": 49.1, "Huế": 52.8, "Quảng Ninh": 69.0, "Vĩnh Long": 17.9 };
// Bảng 9 (tr. 43): số dân thành thị (triệu người); tr. 44: tỉ lệ lực lượng lao động đã qua đào tạo năm 2024 ở thành thị, nông thôn (%)
const DAN_THANH_THI = { 2010: 26.5, 2024: 39.0 }, DAO_TAO_2024 = { "thành thị": 42.4, "nông thôn": 19.7 };
// Hình 11, Bảng 11 (tr. 48–49): cơ cấu GDP năm 2024 theo ngành và theo thành phần kinh tế (%)
const GDP_2024 = { nn: 11.9, cn: 37.6, dv: 42.4, thue: 8.1, ngoai: 50.4, nhanuoc: 21.1, fdi: 20.4 };
// tr. 7: diện tích đất liền; tr. 7, 163: vùng biển khoảng 1 triệu km²; tr. 5: nước láng giềng trên đất liền
const DAT_LIEN = 331, VUNG_BIEN = 1, LANG_GIENG = ["Trung Quốc", "Lào", "Cam-pu-chia"];
// tr. 28: đất tự nhiên năm 2024 (triệu ha) và cơ cấu (%)
const DAT_2024 = [33.1, 84.5, 12.0, 3.5];
// tr. 10: giờ nắng, lượng mưa, độ ẩm
const KHI_HAU = { nang: [1400, 3000], mua: [1500, 2000], muaMax: [3500, 4000], am: [80, 85] };
// Bài 8 (tr. 39–40): năm 2024, số dân (triệu người), lực lượng lao động, lao động ở nông thôn (triệu người), tỉ lệ đã qua đào tạo (%)
const LAO_DONG_2024 = [101.3, 52.9, 32.5, 28.4];

// các hàm dùng chung cho câu đọc biểu đồ, bảng
const lamTron = lam;
const vnf = (x, d) => { const [a, b] = Math.abs(x).toFixed(d).split("."); return (x < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const NN = "Nông nghiệp, lâm nghiệp và thuỷ sản", CN = "Công nghiệp và xây dựng", DV = "Dịch vụ";
const lonNhat = (o) => Object.keys(o).reduce((a, k) => (o[k] > o[a] ? k : a));
const dauCuoi = (a) => [a[0], a[a.length - 1]];
// câu chọn vùng, địa phương theo bảng của sách: lựa chọn đúng là lựa chọn có giá trị lớn nhất theo f; mọi lựa chọn phải có trong bảng
const chonTheo = (bang, f, ten = (o) => o) => (q) => { q.o.forEach((o) => assert.ok(ten(o) in bang, "lựa chọn không có trong bảng của sách: " + o)); return q.o.reduce((a, o) => (f(bang[ten(o)]) > f(bang[ten(a)]) ? o : a)); };
const BO_TEN = (o) => o.replace(/^(?:Thủ đô|Tỉnh|Thành phố) (?!Hồ Chí Minh)/, "");

const RIENG = {
  "diali12-tn-de1": [
    { has: "nhiều loại khoáng sản chủ yếu là do", right: sach("tr. 5, 9", "nằm gần nơi giao nhau của hai vành đai sinh khoáng lớn") },
    { has: "đai nhiệt đới gió mùa lên tới độ cao", right: sach("tr. 20", "900 – 1 000 m") },
    { has: "bụi mịn trong không khí", right: sach("tr. 31", "khí thải của xe máy, ô tô") },
    { has: "Đô thị đầu tiên ở nước ta", right: sach("tr. 43", "Thành Cổ Loa") },
    { has: "Sự chuyển dịch cơ cấu kinh tế theo ngành ở nước ta", right: sach("tr. 48", "công cuộc Đổi mới và công nghiệp hoá, hiện đại hoá") },
    { has: "số khu nông nghiệp công nghệ cao cấp quốc gia", right: sach("tr. 67", "11 khu") },
    { has: "vùng nào có tỉ trọng lớn nhất trong giá trị sản xuất công nghiệp", right: chonTheo(BANG_16_2, (v) => v[1]) },
    { has: "Khu công nghệ cao nào của nước ta được thành lập sớm nhất", right: (q) => {
      const som = KHU_CNC.reduce((a, k) => (k[1] < a[1] ? k : a)), rong = KHU_CNC.reduce((a, k) => (k[2] > a[2] ? k : a));
      assert.equal(som[0], rong[0], "khu thành lập sớm nhất cũng rộng nhất"); q.o.forEach((o) => assert.ok(KHU_CNC.some((k) => k[0] === o), "lựa chọn có trong Bảng 18: " + o)); return som[0]; } },
    { has: "Thị trường có tính cạnh tranh cao", right: sach("tr. 88", "Là động lực để các doanh nghiệp đổi mới, sáng tạo") },
    { has: "Tuyến đường thuỷ nội địa quan trọng", right: sach("tr. 91", "Thành phố Hồ Chí Minh – Cà Mau") },
    { has: "trồng được nhiều loại rau, cây dược liệu", right: sach("tr. 108", "Khí hậu có mùa đông lạnh, lại thay đổi theo độ cao") },
    { has: "về tỉ lệ tăng dân số, Đồng bằng sông Hồng đứng thứ mấy", right: sach("tr. 110", "Thứ nhất") },
    { has: "Đảo Cồn Cỏ thuộc tỉnh nào", right: sach("tr. 119", "Quảng Trị") },
    { has: "Nhà máy thuỷ điện Ialy", right: sach("tr. 137", "sông Sê San") },
    { has: "phát triển tổng hợp kinh tế biển", right: sach("tr. 165", "Để các ngành biển cùng phát triển, không gây hại cho nhau") },
    { has: "HDI (chỉ số phát triển con người)", right: (q) => {
      // Liên hợp quốc: từ 0,800 rất cao; 0,700 – dưới 0,800 cao; 0,550 – dưới 0,700 trung bình; dưới 0,550 thấp (Địa lí 11, Bài 1)
      const v = so(q.q, "quốc gia A #; quốc gia B #; quốc gia C #; quốc gia D #"), muc = (h) => (h >= 0.8 ? "rất cao" : h >= 0.7 ? "cao" : h >= 0.55 ? "trung bình" : "thấp");
      const cao = ["A", "B", "C", "D"].filter((k, i) => muc(v[i]) === "cao"); assert.equal(cao.length, 1); return "Quốc gia " + cao[0]; } },
    { has: "cơ cấu GDP của quốc gia M", right: (q) => {
      const d = docTron(q.svg), a = d["2010"], b = d["2023"];
      return dungMot(q, [[/^Tỉ trọng dịch vụ tăng thêm (\d+) điểm phần trăm$/, (m) => b[DV] - a[DV] === +m[1]],
        [/^Khu vực công nghiệp tăng tỉ trọng nhiều nhất$/, () => lonNhat(Object.fromEntries(Object.keys(a).map((k) => [k, b[k] - a[k]]))) === CN],
        [/^Năm 2023, dịch vụ chiếm chưa đến một nửa GDP$/, () => b[DV] < 50], [/^Khu vực nông nghiệp có tỉ trọng tăng lên$/, () => b[NN] > a[NN]]]); } },
    { has: "tỉ suất sinh thô là", right: (q) => { const [s, t] = so(q.q, "tỉ suất sinh thô là #‰, tỉ suất tử thô là #‰"); coX(q, vn(s - t) + "‰"); return vn((s - t) / 10) + "%"; } },
    { has: "tổng số giờ nắng từ", right: (q) => {
      const [n1, n2] = so(q.q, "tổng số giờ nắng từ # đến # giờ"), [m1, m2] = so(q.q, "lượng mưa trung bình từ # đến # mm"), [x1, x2] = so(q.q, "lên tới # – # mm"), [a1, a2] = so(q.q, "thường từ #% đến #%");
      assert.deepEqual([[n1, n2], [m1, m2], [x1, x2], [a1, a2]], [KHI_HAU.nang, KHI_HAU.mua, KHI_HAU.muaMax, KHI_HAU.am], "số liệu khí hậu như sách (tr. 10)");
      return yTung(q, [[/^Nước ta có nền nhiệt độ cao vì lãnh thổ nằm trong vùng nội chí tuyến\.$/, () => true], // tr. 10
        [/^Lượng mưa ở mọi nơi trên lãnh thổ nước ta đều dưới (.+) mm mỗi năm\.$/, (m) => x2 < val(m[1])],
        [/^Độ ẩm cao gây khó khăn cho việc bảo quản máy móc, nông sản\.$/, () => true], // tr. 16
        [/^Khí hậu nóng ẩm không ảnh hưởng gì đến sức khoẻ con người\.$/, () => false]]); } }, // tr. 16: bệnh nhiệt đới, dịch bệnh
    { has: "lực lượng lao động là", right: (q) => {
      const v = so(q.q, "nước ta có # triệu dân; lực lượng lao động là # triệu người, trong đó khoảng # triệu người ở nông thôn. Tỉ lệ lao động đã qua đào tạo từ trình độ sơ cấp trở lên đạt #%");
      assert.deepEqual(v, LAO_DONG_2024, "số liệu lao động như sách (tr. 34, 39, 40)"); const [dan, ld, nt, dt] = v;
      coX(q, "≈ " + vnf((nt / ld) * 100, 1) + "%", "≈ " + vnf((ld / dan) * 100, 1) + "%");
      return yTung(q, [[/^Phần lớn lực lượng lao động của nước ta đã qua đào tạo/, () => dt > 50], [/^Lao động ở nông thôn chiếm hơn (\d+)% lực lượng lao động/, (m) => (nt / ld) * 100 > +m[1]],
        [/^Lực lượng lao động chiếm hơn một nửa số dân/, () => ld / dan > 0.5], [/^Nước ta đã có đủ lao động có trình độ chuyên môn kĩ thuật cao/, () => false]]); } }, // tr. 40: còn hạn chế
    { has: "sản lượng ba sản phẩm công nghiệp của tỉnh X", right: (q) => {
      const N = [2015, 2020, 2024], t = bangNam(q, N, ["điện thoại di động", "quần áo mặc thường", "giày, dép"]), gap = (k) => t[2024][k] / t[2015][k];
      return yTung(q, [[/^Sản lượng của cả ba sản phẩm đều tăng qua các năm/, () => [0, 1, 2].every((k) => tangLT(N.map((n) => t[n][k])))],
        [/^Trong giai đoạn 2015 – 2024, sản lượng giày, dép tăng nhanh nhất/, () => gap(2) > Math.max(gap(0), gap(1))],
        [/^Năm 2024, sản lượng quần áo mặc thường gấp hơn (.+) lần năm 2015/, (m) => gap(1) > val(m[1])],
        [/^Biểu đồ cột chồng là dạng biểu đồ thích hợp nhất để thể hiện tốc độ tăng trưởng/, () => false]]); } }, // tốc độ tăng trưởng của nhiều đối tượng: biểu đồ đường
    { has: "số lao động làm việc trong các khu công nghiệp (cột)", right: (q) => {
      const d = docKetHop(q.svg); assert.deepEqual([d.cot.ten, d.duong.ten], ["Số lao động", "Số khu công nghiệp"]);
      const ld = d.cot.v.map((p) => p.v), kcn = d.duong.v.map((p) => p.v), [l0, l1] = dauCuoi(ld), [k0, k1] = dauCuoi(kcn);
      return yTung(q, [[/^Số lao động làm việc trong các khu công nghiệp của tỉnh D tăng liên tục/, () => tangLT(ld)],
        [/^Năm 2024, bình quân mỗi khu công nghiệp của tỉnh D có hơn (\d+) nghìn lao động/, (m) => l1 / k1 > +m[1]],
        [/^Từ năm 2010 đến năm 2024, số khu công nghiệp tăng nhanh hơn số lao động/, () => k1 / k0 > l1 / l0],
        [/^Đông Nam Bộ là vùng có nhiều khu công nghiệp nhất cả nước/, () => true]]); } }, // tr. 146
    { has: "nghìn nam và", right: tinh("tỉnh X có # nghìn nam và # nghìn nữ", (a, b) => (a / b) * 100) },
    { has: "tấn lương thực có hạt", right: tinh("có # triệu dân và thu hoạch được # triệu tấn lương thực có hạt", (d, s) => (s * 1000) / d) },
    { has: "Sản lượng gỗ khai thác của tỉnh Z", right: tinh("năm 2015 là # triệu m³, năm 2024 là # triệu m³", (a, b) => b / a) },
    { has: "tổng mức bán lẻ hàng hoá và doanh thu dịch vụ tiêu dùng đạt", right: tinh("có số dân # triệu người, tổng mức bán lẻ hàng hoá và doanh thu dịch vụ tiêu dùng đạt # nghìn tỉ đồng", (d, t) => t / d) },
    { has: "lúa bị thiệt hại vì nước mặn", right: tinh("có # nghìn ha lúa bị thiệt hại vì nước mặn lấn sâu vào đồng ruộng, trong tổng số # nghìn ha lúa", (a, b) => (a / b) * 100) },
    { has: "một nước thành viên của Liên minh châu Âu có GDP", right: tinh("có GDP là # tỉ USD, số dân là # triệu người", (g, d) => g / d) }
  ],
  "diali12-tn-de2": [
    { has: "nước ta còn bao nhiêu tỉnh, thành phố trực thuộc trung ương", right: (q) => { coX(q, "28 tỉnh và 6 thành phố"); return sach("tr. 8", vn(28 + 6) + " tỉnh, thành phố")(); } },
    { has: "Chế độ nước của sông ngòi", right: sach("tr. 14", "chế độ mưa phân hoá theo mùa") },
    { has: "làm ruộng bậc thang", right: sach("tr. 28", "hạn chế xói mòn đất ở những nơi đất dốc") },
    { has: "nước ta xếp thứ mấy trong các quốc gia ở Đông Nam Á", right: sach("tr. 34", "Thứ ba") },
    { has: "gắn bó lâu dài với việc bảo vệ", right: sach("tr. 62", "Giao đất rừng cho người dân, cộng đồng sử dụng lâu dài") },
    { has: "Khu nông nghiệp công nghệ cao có vai trò", right: sach("tr. 67", "Thúc đẩy đổi mới công nghệ, tạo nông sản chất lượng cao") },
    { has: "nguồn điện nào có tỉ trọng cao nhất", right: (q) => {
      const tl = { "Nhiệt điện": DIEN_2024["Nhiệt điện"], "Thuỷ điện": DIEN_2024["Thuỷ điện"], "Điện gió": DIEN_2024["Năng lượng tái tạo"], "Điện mặt trời": DIEN_2024["Năng lượng tái tạo"] };
      coX(q, vnf(DIEN_2024["Nhiệt điện"], 1) + "%"); return chonTheo(tl, (v) => v)(q); } },
    { has: "Sự ra đời và phát triển của các khu công nghiệp", right: sach("tr. 83", "Đổi mới, mở cửa nền kinh tế") },
    { has: "Địa hình nước ta ảnh hưởng đến ngành giao thông", right: sach("tr. 89", "hướng các tuyến đường và nơi xây dựng cảng biển") },
    { has: "thị trường xuất khẩu lớn", right: sach("tr. 97", "Hoa Kỳ, Trung Quốc, EU") },
    { has: "Cảng hàng không Vân Đồn ở vùng", right: sach("tr. 116", "Quảng Ninh") },
    { has: "Di sản văn hoá thế giới nào sau đây thuộc vùng Bắc Trung Bộ", right: sach("tr. 127", "Thành nhà Hồ") },
    { has: "được trồng nhiều nhất ở Đông Nam Bộ", right: sach("tr. 149", "Cao su") },
    { has: "đất phèn tập trung nhiều ở", right: sach("tr. 154", "Đồng Tháp Mười, Tứ giác Long Xuyên") },
    { has: "tỉnh, thành phố giáp biển", right: sach("tr. 164", "21 tỉnh, thành phố") },
    { has: "cơ cấu GDP của bốn quốc gia", right: (q) => {
      // nhóm nước phát triển: dịch vụ chiếm khoảng ba phần tư GDP trở lên, nông nghiệp, lâm nghiệp và thuỷ sản dưới 5% (Địa lí 11, Bài 1)
      const v = { E: so(q.q, "Quốc gia E: nông nghiệp, lâm nghiệp và thuỷ sản #; công nghiệp và xây dựng #; dịch vụ #"), G: so(q.q, "Quốc gia G: lần lượt #; #; #"), H: so(q.q, "Quốc gia H: #; #; #"), K: so(q.q, "Quốc gia K: #; #; #") };
      Object.values(v).forEach((c) => assert.ok(Math.abs(sum(c) - 100) < 1e-9, "cơ cấu cộng lại 100%"));
      const pt = Object.keys(v).filter((k) => v[k][2] >= 70 && v[k][0] < 5); assert.equal(pt.length, 1); return "Quốc gia " + pt[0]; } },
    { has: "hoạt động ngoại thương của quốc gia B", right: (q) => {
      const d = docCot(q.svg, "Tỉ USD"), N = Object.keys(d).sort(), x = (n) => d[n]["Xuất khẩu"], nk = (n) => d[n]["Nhập khẩu"], [a, b] = dauCuoi(N);
      return dungMot(q, [[/^Năm (\d{4}), quốc gia B nhập siêu$/, (m) => nk(m[1]) > x(m[1])], [/^Nhập khẩu tăng nhanh hơn xuất khẩu$/, () => nk(b) / nk(a) > x(b) / x(a)],
        [/^Năm (\d{4}), xuất khẩu gấp đôi năm (\d{4})$/, (m) => x(m[1]) / x(m[2]) >= 2]]); } },
    { has: "tháng nóng nhất và tháng lạnh nhất", right: (q) => {
      const [a1, a2] = so(q.q, "Trạm A ở ven biển: #°C và #°C"), [b1, b2] = so(q.q, "Trạm B nằm sâu trong lục địa: #°C và #°C");
      coX(q, vn(a1 - a2) + "°C", vn(b1 - b2) + "°C"); return vn(b1 - b2 - (a1 - a2)) + "°C"; } },
    { has: "Dãy Trường Sơn chắn gió", right: (q) => yTung(q, [[/^Mùa mưa ở sườn đông Trường Sơn và ở khu vực Tây Nguyên không trùng nhau\.$/, () => true], // tr. 19
      [/^Sự khác nhau về mùa mưa giữa hai sườn chủ yếu do hai nơi có độ cao khác nhau\.$/, () => false], // tr. 19: do gió mùa và hướng dãy núi
      [/^Khi khu vực Tây Nguyên đang mùa khô thì sườn đông Trường Sơn cũng ít mưa nhất trong năm\.$/, () => false],
      [/^Đây là biểu hiện của sự phân hoá thiên nhiên theo chiều đông – tây\.$/, () => true]]) },
    { has: "Sau năm 1986, đô thị hoá", right: (q) => {
      const [d0, d1] = so(q.q, "tăng từ # triệu người năm 2010 lên # triệu người năm 2024"), [tt, nt] = so(q.q, "ở thành thị là #%, ở nông thôn là #%");
      assert.deepEqual([d0, d1, tt, nt], [DAN_THANH_THI[2010], DAN_THANH_THI[2024], DAO_TAO_2024["thành thị"], DAO_TAO_2024["nông thôn"]], "số liệu như sách (tr. 43, 44)");
      return yTung(q, [[/^Từ năm 2010 đến năm 2024, số dân thành thị tăng thêm (.+) triệu người/, (m) => gan(d1 - d0, val(m[1]))],
        [/^Năm 2024, tỉ lệ lao động đã qua đào tạo ở thành thị gấp hơn hai lần ở nông thôn/, () => tt / nt > 2], [/^Số dân thành thị năm 2024 gấp hơn (.+) lần năm 2010/, (m) => d1 / d0 > val(m[1])],
        [/^Năm 2024, phần lớn lao động ở nông thôn đã qua đào tạo/, () => nt > 50]]); } },
    { has: "sản lượng ngô (tấn) của tỉnh H", right: (q) => {
      const N = [2015, 2020, 2024], t = bangNam(q, N, ["diện tích", "sản lượng"]), ns = (n) => (t[n][1] / t[n][0]) * 10; // tấn/ha → tạ/ha
      coX(q, "≈ " + vnf(ns(2020), 1) + " tạ/ha");
      return yTung(q, [[/^Diện tích ngô của tỉnh H giảm qua các năm/, () => giamLT(N.map((n) => t[n][0]))], [/^Sản lượng ngô của tỉnh H tăng liên tục dù diện tích giảm/, () => tangLT(N.map((n) => t[n][1])) && giamLT(N.map((n) => t[n][0]))],
        [/^Năm 2024, năng suất ngô của tỉnh H đạt dưới (\d+) tạ\/ha/, (m) => ns(2024) < +m[1]], [/^Từ năm 2015 đến năm 2024, năng suất ngô của tỉnh H tăng thêm (\d+) tạ\/ha/, (m) => Math.abs(ns(2024) - ns(2015) - +m[1]) < 1e-9]]); } },
    { has: "cơ cấu diện tích cây công nghiệp lâu năm phân theo loại cây ở tỉnh G", right: (q) => {
      const d = docMien(q.svg), N = Object.keys(d["Cà phê"]).sort();
      return yTung(q, [[/^Tỉ trọng diện tích hồ tiêu tăng liên tục/, () => tangLT(N.map((n) => d["Hồ tiêu"][n]))],
        [/^Năm nào cà phê cũng có tỉ trọng diện tích cao nhất/, () => N.every((n) => lonNhat(Object.fromEntries(Object.keys(d).map((k) => [k, d[k][n]]))) === "Cà phê")],
        [/^Tỉ trọng diện tích cao su năm 2024 thấp hơn năm 2010 là (\d+) điểm phần trăm/, (m) => d["Cao su"]["2010"] - d["Cao su"]["2024"] === +m[1]],
        [/^Biểu đồ cho biết diện tích trồng cà phê của tỉnh G giảm liên tục/, () => false]]); } }, // biểu đồ miền chỉ cho biết cơ cấu
    { has: "trong đó 26,4 nghìn người thất nghiệp", right: tinh("lực lượng lao động # nghìn người, trong đó # nghìn người thất nghiệp", (l, t) => (t / l) * 100) },
    { has: "GRDP bình quân đầu người của tỉnh N", right: tinh("là # nghìn tỉ đồng, số dân là # triệu người", (g, d) => g / d) },
    { has: "Tỉ trọng của vùng năm 2024 gấp bao nhiêu lần so với năm 2010", right: tinh("chiếm #% năm 2010 và #% năm 2024", (a, b) => {
      assert.deepEqual([a, b], BANG_16_2["Trung du và miền núi phía Bắc"], "số liệu như Bảng 16.2 (tr. 73)"); return b / a; }) },
    { has: "vượt công suất thiết kế", right: tinh("đón # triệu lượt hành khách, trong khi công suất thiết kế của cảng là # triệu lượt", (a, c) => ((a - c) / c) * 100) },
    { has: "qua các cửa khẩu của tỉnh L", right: tinh("đạt # tỉ USD, trong đó xuất khẩu đạt # tỉ USD", (t, x) => (x / t) * 100) },
    { has: "Trung bình mỗi ki-lô-mét vuông của quốc gia X", right: tinh("rộng # nghìn km² và có # triệu dân", (s, d) => (d * 1000) / s) }
  ],
  "diali12-tn-de3": [
    { has: "Nhờ nằm ở rìa đông bán đảo Đông Dương", right: sach("tr. 9", "làm cửa ngõ ra biển cho một số nước láng giềng") },
    { has: "ở phía nam vĩ tuyến 16°B", right: sach("tr. 12", "mùa khô ở Tây Nguyên và Nam Bộ") },
    { has: "Thềm lục địa nước ta hẹp nhất", right: sach("tr. 19", "ven biển Nam Trung Bộ") },
    { has: "dân số nước ta đang già hoá", right: sach("tr. 35", "mức sinh giảm, tuổi thọ trung bình tăng") },
    { has: "nguồn lao động của nước ta", right: sach("tr. 40", "Cần cù, sáng tạo, giàu kinh nghiệm sản xuất") },
    { has: "nước xuất khẩu hàng đầu thế giới về", right: sach("tr. 56", "cà phê, hồ tiêu và điều") },
    { has: "được đưa vào hoạt động sớm nhất nước ta", right: sach("tr. 67", "Thành phố Hồ Chí Minh") },
    { has: "Định hướng phân bố không gian công nghiệp", right: sach("tr. 73", "tập trung, không dàn đều, bảo vệ môi trường") },
    { has: "Định hướng phát triển các khu công nghiệp", right: sach("tr. 83", "tiết kiệm năng lượng, giảm phát thải khí nhà kính") },
    { has: "góp phần xoá đói, giảm nghèo", right: sach("tr. 87", "miền núi, hải đảo") },
    { has: "Thị trường khách du lịch quốc tế quan trọng nhất", right: sach("tr. 98", "Đông Bắc Á, Đông Nam Á và châu Đại Dương") },
    { has: "vùng chuyên canh cây công nghiệp ở Trung du", right: sach("tr. 107", "Thứ ba") },
    { has: "khai thác hải sản xa bờ", right: sach("tr. 126", "truy xuất được nguồn gốc hải sản, giữ gìn môi trường biển") },
    { has: "cảng Đà Nẵng sẽ là cảng cửa ngõ quốc tế", right: sach("tr. 137", "Hành lang kinh tế Đông – Tây") },
    { has: "sản lượng dầu thô khai thác ở Đông Nam Bộ", right: sach("tr. 151", "Gần 83%") },
    { has: "tỉ lệ tăng tự nhiên của dân số, tỉ lệ dân thành thị, tuổi thọ trung bình", right: (q) => {
      // nhóm nước phát triển: dân số tăng chậm, tỉ lệ dân thành thị cao, tuổi thọ trung bình cao (Địa lí 11, Bài 1)
      const v = Object.fromEntries(["L", "N", "P", "Q"].map((k) => [k, so(q.q, "Quốc gia " + k + ": #%; #%; # tuổi")]));
      const pt = Object.keys(v).filter((k) => v[k][0] < 0.5 && v[k][1] >= 75 && v[k][2] >= 78); assert.equal(pt.length, 1); return "Quốc gia " + pt[0]; } },
    { has: "sản lượng dầu thô khai thác của quốc gia T", right: (q) => {
      const d = docCot(q.svg, "Triệu tấn"), v = (n) => d.find((p) => p.nam === +n).v, a = d.map((p) => p.v);
      return dungMot(q, [[/^Sản lượng năm (\d{4}) thấp hơn năm (\d{4})$/, (m) => v(m[1]) < v(m[2])], [/^Sản lượng tăng liên tục qua các năm$/, () => tangLT(a)],
        [/^Năm (\d{4}), sản lượng gấp đôi năm (\d{4})$/, (m) => v(m[1]) / v(m[2]) >= 2], [/^Sản lượng năm (\d{4}) thấp nhất trong các năm$/, (m) => v(m[1]) === Math.min(...a)]]); } },
    { has: "tỉ suất gia tăng cơ học là", right: (q) => { const [t, c] = so(q.q, "tỉ suất tăng tự nhiên dân số là #%, tỉ suất gia tăng cơ học là #%"); return vn(t + c) + "%"; } },
    { has: "Diện tích đất tự nhiên của nước ta năm 2024", right: (q) => {
      const v = so(q.q, "là hơn # triệu ha; đất nông nghiệp chiếm #%, đất phi nông nghiệp chiếm #%, đất chưa sử dụng chiếm #%"); assert.deepEqual(v, DAT_2024, "số liệu như sách (tr. 28)");
      const [dt, , pnn, csd] = v; assert.ok(Math.abs(v[1] + pnn + csd - 100) < 1e-9);
      return yTung(q, [[/^Đất phi nông nghiệp chiếm hơn một nửa/, () => pnn > 50], [/^Năm 2024, diện tích đất chưa sử dụng của nước ta khoảng (.+) triệu ha/, (m) => lam((dt * csd) / 100, 1) === val(m[1])],
        [/^Đốt rừng làm nương rẫy là một trong những nguyên nhân/, () => true], [/^Thiên tai và biến đổi khí hậu không ảnh hưởng/, () => false]]); } }, // tr. 28
    { has: "trong cơ cấu GDP của nước ta", right: (q) => {
      const [nn, cn, dv, thue] = so(q.q, "nông nghiệp, lâm nghiệp và thuỷ sản chiếm #%; công nghiệp và xây dựng chiếm #%; dịch vụ chiếm #%; thuế sản phẩm trừ trợ cấp sản phẩm chiếm #%");
      const [ngoai, nhanuoc, fdi] = so(q.q, "kinh tế ngoài Nhà nước chiếm #%, kinh tế Nhà nước chiếm #%, khu vực đầu tư nước ngoài chiếm #%");
      assert.deepEqual({ nn, cn, dv, thue, ngoai, nhanuoc, fdi }, GDP_2024, "số liệu như sách (tr. 48, 49)");
      assert.ok(Math.abs(nn + cn + dv + thue - 100) < 1e-9 && Math.abs(ngoai + nhanuoc + fdi + thue - 100) < 1e-9, "cơ cấu cộng lại 100%");
      return yTung(q, [[/^Năm 2024, công nghiệp và xây dựng là khu vực có tỉ trọng cao nhất/, () => cn > Math.max(nn, dv)],
        [/^Tỉ trọng của kinh tế ngoài Nhà nước lớn hơn tổng tỉ trọng/, () => ngoai > nhanuoc + fdi], [/^Nông nghiệp, lâm nghiệp và thuỷ sản chiếm hơn một phần năm GDP/, () => nn > 20],
        [/^Dịch vụ cùng với công nghiệp và xây dựng chiếm hơn ba phần tư GDP/, () => dv + cn > 75]]); } },
    { has: "số lượt hành khách đi lại giữa hai thành phố A và B", right: (q) => {
      const t = bangNam(q, [2015, 2024], ["đường sắt", "đường hàng không"]), gap = (k) => t[2024][k] / t[2015][k];
      coX(q, vn(sum(t[2015])), vn(sum(t[2024])), "≈ " + vnf((t[2024][0] / sum(t[2024])) * 100, 1) + "%");
      return yTung(q, [[/^Số lượt hành khách đi bằng cả hai loại hình đều tăng/, () => [0, 1].every((k) => t[2024][k] > t[2015][k])],
        [/^Năm 2024, đường sắt chiếm hơn (\d+)% tổng số lượt hành khách/, (m) => (t[2024][0] / sum(t[2024])) * 100 > +m[1]],
        [/^Từ năm 2015 đến năm 2024, số lượt hành khách đi bằng đường hàng không tăng nhanh hơn đường sắt/, () => gap(1) > gap(0)],
        [/^Năm 2024, số lượt hành khách đi bằng đường hàng không gấp hơn ba lần đường sắt/, () => t[2024][1] / t[2024][0] > 3]]); } },
    { has: "diện tích nuôi tôm nước lợ của tỉnh C", right: (q) => {
      const d = docDuong(q.svg, "Nghìn ha"), v = (k, n) => d[k].find((p) => p.nam === n).v;
      return yTung(q, [[/^Diện tích trồng lúa của tỉnh C giảm liên tục/, () => giamLT(d["Lúa"].map((p) => p.v))],
        [/^Năm 2024, diện tích nuôi tôm nước lợ tăng thêm (\d+) nghìn ha so với năm 2015/, (m) => v("Tôm nước lợ", 2024) - v("Tôm nước lợ", 2015) === +m[1]],
        [/^Năm 2024, diện tích nuôi tôm nước lợ gấp hơn (.+) lần năm 2015/, (m) => v("Tôm nước lợ", 2024) / v("Tôm nước lợ", 2015) > val(m[1])],
        [/^Mùa khô sâu sắc làm vùng thiếu nước ngọt/, () => true]]); } }, // tr. 154
    { has: "Tính tỉ lệ dân thành thị của tỉnh H", right: tinh("có # triệu dân, trong đó # triệu người sống ở thành thị", (d, t) => (t / d) * 100) },
    { has: "tổng sản lượng thuỷ sản đạt", right: tinh("có số dân # triệu người, tổng sản lượng thuỷ sản đạt # triệu tấn", (d, s) => (s * 1000) / d) },
    { has: "nhà máy điện gió với tổng công suất", right: tinh("có # nhà máy điện gió với tổng công suất # MW", (n, p) => p / n) },
    { has: "sản lượng điện thoại di động của tỉnh B", right: tinh("đạt # triệu chiếc, chiếm #% sản lượng", (s, p) => (s / p) * 100) },
    { has: "Sản lượng dầu thô khai thác của một doanh nghiệp", right: tinh("năm 2015 là # triệu tấn, năm 2024 là # triệu tấn", (a, b) => ((a - b) / a) * 100) },
    { has: "khu vực dịch vụ đóng góp", right: tinh("có GDP là # tỉ USD, trong đó khu vực dịch vụ đóng góp # tỉ USD", (g, d) => (d / g) * 100) }
  ],
  "diali12-tn-de4": [
    { has: "Đất feralit ở nước ta có màu đỏ vàng", right: sach("tr. 15", "sự tích tụ ô-xít sắt và ô-xít nhôm") },
    { has: "có một mùa đông lạnh là", right: sach("tr. 17", "hoạt động mạnh của gió mùa Đông Bắc") },
    { has: "nước ngầm bị nhiễm mặn", right: sach("tr. 32", "khai thác nước ngầm quá mức") },
    { has: "nâng cao chất lượng lao động", right: sach("tr. 42", "Đẩy mạnh đào tạo nghề, rèn tác phong công nghiệp") },
    { has: "tỉ lệ dân thành thị cao nhất nước ta", right: (q) => { coX(q, vnf(THANH_THI_2024["Thành phố Hồ Chí Minh"], 1) + "%"); return chonTheo(THANH_THI_2024, (v) => v, BO_TEN)(q); } },
    { has: "Trong nhóm ngành nông nghiệp, lâm nghiệp và thuỷ sản", right: sach("tr. 48", "tăng tỉ trọng thuỷ sản, giảm tỉ trọng nông nghiệp") },
    { has: "Khí hậu phân hoá giữa các vùng", right: sach("tr. 51", "có nhiều loại cây trồng, vật nuôi") },
    { has: "giám sát chặt chẽ các dự án thuỷ điện", right: sach("tr. 62", "Các dự án này thường chuyển đất rừng sang mục đích khác") },
    { has: "giảm nhiều nhất", right: (q) => { const r = chonTheo(BANG_16_2, (v) => v[0] - v[1])(q); coX(q, vnf(BANG_16_2[r][0], 1) + "%", vnf(BANG_16_2[r][1], 1) + "%", vnf(BANG_16_2[r][0] - BANG_16_2[r][1], 1)); return r; } },
    { has: "ngành dệt và sản xuất trang phục", right: sach("tr. 81", "chuyển từ gia công sang thiết kế, xây dựng thương hiệu") },
    { has: "hoà mạng internet toàn cầu", right: sach("tr. 95", "Năm 1997") },
    { has: "trung tâm nhiệt điện than Phả Lại", right: sach("tr. 115", "Hải Phòng") },
    { has: "Hạn chế lớn về tự nhiên đối với sản xuất ở Đông Nam Bộ", right: sach("tr. 144", "mùa khô kéo dài 4 – 5 tháng, gây thiếu nước") },
    { has: "nguồn nước sông Mê Công", right: sach("tr. 156", "vùng ở hạ lưu, phụ thuộc vào các nước thượng nguồn") },
    { has: "Độ muối trung bình của nước Biển Đông", right: sach("tr. 163", "32 – 33‰") },
    { has: "cơ cấu trị giá xuất khẩu hàng hoá phân theo thị trường của nước E", right: (q) => {
      const d = docTron(q.svg), N = Object.keys(d).sort(), [a, b] = dauCuoi(N), EU = "Các nước trong EU";
      return dungMot(q, [[/^Hơn một nửa trị giá xuất khẩu là sang các nước trong EU$/, () => N.every((n) => d[n][EU] > 50)],
        [/^Tỉ trọng xuất khẩu sang Hoa Kỳ giảm$/, () => d[b]["Hoa Kỳ"] < d[a]["Hoa Kỳ"]], [/^Năm (\d{4}), thị trường khác chiếm tỉ trọng lớn nhất$/, (m) => lonNhat(d[m[1]]) === "Các thị trường khác"],
        [/^Tỉ trọng xuất khẩu sang các nước trong EU tăng$/, () => d[b][EU] > d[a][EU]]]); } },
    { has: "cơ cấu số người làm việc theo khu vực kinh tế của quốc gia V", right: (q) => {
      const d = docMien(q.svg), N = Object.keys(d[DV]).sort(), lon = (n) => lonNhat(Object.fromEntries(Object.keys(d).map((k) => [k, d[k][n]])));
      return dungMot(q, [[/^Năm (\d{4}), dịch vụ có tỉ trọng lao động lớn nhất$/, (m) => lon(m[1]) === DV], [/^Tỉ trọng lao động nông nghiệp, lâm nghiệp và thuỷ sản tăng$/, () => d[NN][N[N.length - 1]] > d[NN][N[0]]],
        [/^Năm (\d{4}), công nghiệp và xây dựng có tỉ trọng lớn nhất$/, (m) => lon(m[1]) === CN], [/^Tỉ trọng lao động dịch vụ giảm liên tục$/, () => giamLT(N.map((n) => d[DV][n]))]]); } },
    { has: "cán cân thương mại của quốc gia P", right: (q) => { const [x, n] = so(q.q, "bán ra nước ngoài # tỉ USD hàng hoá và dịch vụ, mua từ nước ngoài # tỉ USD"); return (x >= n ? "Xuất siêu " : "Nhập siêu ") + vn(Math.abs(x - n)) + " tỉ USD"; } },
    { has: "Nước ta ở phía đông bán đảo Đông Dương", right: (q) => {
      const [dl] = so(q.q, "Phần đất liền rộng khoảng # nghìn km²"), [bien] = so(q.q, "vùng biển rộng khoảng # triệu km²"); assert.deepEqual([dl, bien], [DAT_LIEN, VUNG_BIEN], "số liệu như sách (tr. 7)");
      return yTung(q, [[/^Vùng biển của nước ta rộng hơn ba lần phần đất liền\.$/, () => (bien * 1000) / dl > 3],
        [/^Phần đất liền nước ta giáp với bốn quốc gia\.$/, () => LANG_GIENG.length === 4], [/^Nằm trong vùng nội chí tuyến nên nước ta có nền nhiệt độ cao\.$/, () => true], // tr. 10
        [/^Vị trí gần trung tâm Đông Nam Á gây trở ngại khi nước ta mở rộng quan hệ/, () => false]]); } }, // tr. 9
    { has: "cơ cấu dân số theo nhóm tuổi của tỉnh A", right: (q) => {
      const t = bangNam(q, [2014, 2024], ["0 – 14 tuổi", "15 – 64 tuổi", "từ 65 tuổi trở lên"]); [2014, 2024].forEach((n) => assert.ok(Math.abs(sum(t[n]) - 100) < 1e-9, "cơ cấu cộng lại 100%"));
      return yTung(q, [[/^Từ năm 2014 đến năm 2024, tỉ trọng nhóm từ 65 tuổi trở lên tăng (.+) điểm phần trăm/, (m) => gan(t[2024][2] - t[2014][2], val(m[1]), 1e-9)],
        [/^Năm 2024, nhóm 15 – 64 tuổi chiếm dưới (\d+)% dân số/, (m) => t[2024][1] < +m[1]], [/^Tỉ trọng nhóm 0 – 14 tuổi tăng/, () => t[2024][0] > t[2014][0]],
        [/^Năm 2024, số người 15 – 64 tuổi gấp hơn hai lần số người của hai nhóm tuổi còn lại/, () => t[2024][1] > 2 * (t[2024][0] + t[2024][2])]]); } },
    { has: "hoạt động du lịch của tỉnh Q", right: (q) => {
      const N = [2019, 2021, 2024], t = bangNam(q, N, ["khách nội địa", "khách quốc tế", "doanh thu"]), tong = (n) => t[n][0] + t[n][1], bq = (n) => t[n][2] / tong(n);
      coX(q, "≈ " + vnf(bq(2024), 2));
      return yTung(q, [[/^Số lượt khách nội địa của tỉnh Q tăng liên tục/, () => tangLT(N.map((n) => t[n][0]))],
        [/^Năm 2024, khách quốc tế chiếm khoảng (.+)% tổng số lượt khách/, (m) => lam((t[2024][1] / tong(2024)) * 100, 1) === val(m[1])],
        [/^Doanh thu bình quân trên mỗi lượt khách năm 2024 cao hơn năm 2019/, () => bq(2024) > bq(2019)],
        [/^Lượng khách năm 2021 giảm mạnh so với năm 2019 chủ yếu do ảnh hưởng của dịch bệnh/, () => tong(2021) < tong(2019) / 2]]); } }, // tr. 98: dịch bệnh trên toàn cầu
    { has: "diện tích trồng ngô của tỉnh S", right: (q) => {
      const d = docCot(q.svg, "Nghìn ha"), N = Object.keys(d).sort(), aq = (n) => d[n]["Cây ăn quả"], ngo = (n) => d[n]["Ngô"];
      return yTung(q, [[/^Diện tích cây ăn quả của tỉnh S tăng liên tục/, () => tangLT(N.map(aq))], [/^Năm 2024, diện tích trồng ngô giảm (\d+) nghìn ha so với năm 2015/, (m) => ngo(2015) - ngo(2024) === +m[1]],
        [/^Năm 2024, diện tích cây ăn quả gấp hơn hai lần năm 2015/, () => aq(2024) / aq(2015) > 2], [/^Năm 2021, diện tích trồng ngô vẫn lớn hơn diện tích cây ăn quả/, () => ngo(2021) > aq(2021)]]); } },
    { has: "khu nông nghiệp công nghệ cao X rộng", right: tinh("rộng # ha, trong đó # ha trồng rau, hoa", (a, b) => (b / a) * 100) },
    { has: "khu công nghệ cao X thu hút", right: tinh("thu hút # dự án với tổng vốn đầu tư # tỉ USD", (n, v) => (v * 1000) / n) },
    { has: "khu vực dịch vụ của tỉnh Q tạo ra", right: tinh("tạo ra # nghìn tỉ đồng, trong khi tổng sản phẩm trên địa bàn (GRDP) của tỉnh là # nghìn tỉ đồng", (d, g) => (d / g) * 100) },
    { has: "đàn bò của tỉnh H ở Bắc Trung Bộ", right: tinh("có # nghìn con, tăng #% so với năm 2020", (s, p) => s / (1 + p / 100)) },
    { has: "các nhà máy điện gió của tỉnh B", right: tinh("có tổng công suất # MW, chiếm #% tổng công suất", (p, s) => (p / s) * 100) },
    { has: "triệu thùng dầu thô mỗi ngày", right: tinh("khai thác trung bình # triệu thùng dầu thô mỗi ngày và xuất khẩu # triệu thùng", (k, x) => (x / k) * 100) }
  ]
};

/* ---------- đề và danh mục: số đề, số câu lấy từ danh mục ---------- */
const soDe = (id) => +/de(\d+)$/.exec(id)[1];
const DE = BANKS.filter((b) => /^diali12-tn-de\d+$/.test(b.id)).sort((a, b) => soDe(a.id) - soDe(b.id));
assert.ok(DE.length >= 1, "chưa có đề Địa lí thi thử tốt nghiệp nào trong danh mục");
DE.forEach((b, i) => assert.equal(b.id, "diali12-tn-de" + (i + 1), "mã đề phải liên tiếp từ diali12-tn-de1"));
const TN = EVENTS.find((e) => e.id === "tn-thpt-2027");
const P1 = "Phần I. Trắc nghiệm nhiều lựa chọn", P2 = "Phần II. Trắc nghiệm đúng sai", P3 = "Phần III. Trả lời ngắn";
const KHUNG = [[P1, "mc", 18, 0.25], [P2, "tf4", 4, 1], [P3, "num", 6, 0.25]];
const lop = (t) => (CD12.has(t) ? 12 : /^Lớp 11 · /.test(t) && CHUONG_11.includes(t.slice(9)) ? 11 : /^Lớp 10 · /.test(t) && CHUONG_10.includes(t.slice(9)) ? 10 : 0);
const soY = (q) => (q.type === "tf4" ? 4 : 1);
const dinhDang = (a) => (a < 0 ? "−" : "") + String(Math.abs(a)).replace(".", ",");

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
      if (q.type === "num") {
        assert.equal(typeof q.ans, "number", "đáp án Phần III ghi bằng số");
        const lt = /[Ll]àm tròn kết quả đến hàng (đơn vị|phần mười|phần trăm)/.exec(q.q);
        if (lt) {
          const k = { "đơn vị": 0, "phần mười": 1, "phần trăm": 2 }[lt[1]];
          assert.ok(q.tol === 10 ** -k / 2, "tol phải bằng nửa đơn vị làm tròn: " + q.tol);
          assert.ok(Math.abs(q.ans - lamTron(want, k)) < 1e-9, "đáp án " + q.ans + ", tính được " + want + " ≈ " + lamTron(want, k));
          assert.ok(!gan(want, lamTron(want, k), 1e-12), "đáp án tính được đã tròn, không cần dặn làm tròn: " + want);
          assert.ok(Math.abs(want - lamTron(want, k)) < 10 ** -k / 2 - 1e-9, "giá trị đúng nằm ngay giữa hai số làm tròn: " + want);
          assert.ok(q.x.includes("≈ " + vnf(lamTron(want, k), k)), "lời giải ghi “≈ " + vnf(lamTron(want, k), k) + "”");
        } else {
          assert.ok(gan(q.ans, want, 1e-9), "đáp án " + q.ans + ", tính được " + want);
          assert.ok(q.tol === undefined, "đáp án tính chính xác, không cần sai số");
        }
        assert.ok([...dinhDang(q.ans)].length <= 4, "đáp án Phần III quá 4 kí tự: " + dinhDang(q.ans));
        assert.ok(!q.unit || q.unit.length <= 9, "đơn vị ngắn");
      } else {
        const got = q.type === "tf4" ? q.a : q.o[0];
        assert.strictEqual(JSON.stringify(got), JSON.stringify(want), "đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
      }
      if (q.type === "mc") {
        assert.ok(new Set(q.o).size === 4 && q.o.length === 4, "bốn lựa chọn khác nhau");
        const L = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn lựa chọn sai");
      }
      if (q.type === "tf4") assert.ok(q.o.length === 4 && q.a.includes(true) && q.a.includes(false), "đúng/sai 4 ý có cả ý đúng và ý sai");
      if (q.svg) assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại");
    } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
    n++;
  });
});
assert.deepEqual(Object.keys(RIENG).sort(), DE.map((b) => b.id).sort(), "RIENG có đúng các đề thi thử của danh mục");
assert.deepEqual(Object.entries(RIENG).flatMap(([id, ck]) => ck.filter((c) => !dung.has(c)).map((c) => id + ": " + c.has)), [], "có mục kiểm tra không khớp câu nào");

/* ---------- khung đề (Quyết định 764/QĐ-BGDĐT): danh mục, phần, điểm, mức độ, phạm vi, dạng câu của Phần II, biểu đồ, lời dặn ---------- */
const KIEU = {}, LOAI_DE = new Set();
DE.forEach((b) => {
  const at = b.id, qs = b.questions;
  assert.deepEqual([b.title, b.grade, b.subject, b.minutes, b.pts, b.file, !!b.pool], ["Địa lí 12 · Thi thử tốt nghiệp · Đề " + soDe(b.id), 12, "Địa lí", 50, 10, "12-diali.js", false], at + ": danh mục");
  assert.ok(TN && TN.banks.includes(b.id) && TN.grades.includes(12) && TN.subjects.includes("Địa lí"), at + ": phải gắn vào tn-thpt-2027");
  let k = 0;
  KHUNG.forEach(([part, type, so_, pt]) => { const ph = qs.slice(k, k + so_); k += so_;
    assert.ok(ph.length === so_ && ph.every((q) => q.part === part && q.type === type && q.pt === pt), at + ": " + part + " gồm " + so_ + " câu " + type + ", mỗi câu " + pt + " điểm"); });
  assert.equal(k, qs.length, at + ": đề có đúng 28 câu theo khung 18 – 4 – 6");
  const G = Quiz.grade(qs, qs.map(() => null));
  assert.ok(G.max === 10 && G.got === 0, at + ": Quiz.grade: tối đa 10 điểm");
  assert.deepEqual(G.parts.map((p) => [p.part, p.max]), [[P1, 4.5], [P2, 4], [P3, 1.5]], at + ": điểm tối đa từng phần 4,5 – 4 – 1,5");
  const dem = (a, c, f) => qs.slice(a, c).filter(f).length;
  // mức độ: nhận biết và thông hiểu khoảng 70% số câu (đề tham khảo năm 2025), mỗi phần đủ ba mức
  assert.deepEqual([1, 2, 3].map((l) => dem(0, 18, (q) => q.lv === l)), [10, 6, 2], at + ": Phần I 10 Biết, 6 Hiểu, 2 Vận dụng");
  assert.deepEqual(qs.slice(18, 22).map((q) => q.lv).sort(), [1, 2, 3, 3], at + ": Phần II bốn câu ghi mức 1, 2, 3, 3");
  assert.deepEqual([1, 2, 3].map((l) => dem(22, 28, (q) => q.lv === l)), [1, 2, 3], at + ": Phần III 1 Biết, 2 Hiểu, 3 Vận dụng");
  // phạm vi: mỗi chủ đề lớp 12 đúng một câu; 3 câu lớp 11 (hai ở Phần I, một ở Phần III), 1 câu lớp 10 (Phần I)
  qs.forEach((q, i) => assert.ok(lop(q.topic), at + "#" + (i + 1) + ": chủ đề lạ “" + q.topic + "”"));
  assert.deepEqual(qs.filter((q) => lop(q.topic) === 12).map((q) => q.topic).sort(), [...BAI].sort(), at + ": mỗi chủ đề Địa lí 12 đúng một câu");
  assert.deepEqual([dem(0, 18, (q) => lop(q.topic) === 11), dem(18, 22, (q) => lop(q.topic) === 11), dem(22, 28, (q) => lop(q.topic) === 11)], [2, 0, 1], at + ": câu lớp 11: hai ở Phần I, một ở Phần III");
  assert.deepEqual([dem(0, 18, (q) => lop(q.topic) === 10), dem(18, 28, (q) => lop(q.topic) === 10)], [1, 0], at + ": một câu lớp 10 ở Phần I");
  const lenh12 = sum(qs.filter((q) => lop(q.topic) === 12).map(soY));
  assert.equal(sum(qs.map(soY)), 40, at + ": đề có 40 lệnh hỏi"); assert.equal(lenh12, 36, at + ": 36 trong 40 lệnh hỏi thuộc lớp 12");
  // trong mỗi phần, câu lớp 12 theo thứ tự bài, câu lớp 10, 11 đứng sau
  [[0, 18], [18, 22], [22, 28]].forEach(([a, c]) => { const ph = qs.slice(a, c), ch = ph.filter((q) => lop(q.topic) === 12).map((q) => BAI.indexOf(q.topic)), dau = ph.findIndex((q) => lop(q.topic) !== 12);
    ch.forEach((v, i) => i && assert.ok(v > ch[i - 1], at + ": câu lớp 12 theo thứ tự bài trong từng phần"));
    assert.ok(dau < 0 || ph.slice(dau).every((q) => lop(q.topic) !== 12), at + ": câu lớp 10, 11 đứng sau các câu lớp 12 của phần"); });
  // Phần II: một câu đoạn thông tin, một câu bảng số liệu, một câu biểu đồ (như đề thật); câu lớp 10, 11 là câu kĩ năng
  const p2 = qs.slice(18, 22);
  assert.ok(p2.some((q) => /^Cho thông tin/.test(q.q)) && p2.some((q) => /^Cho bảng số liệu/.test(q.q)) && p2.some((q) => q.svg), at + ": Phần II có câu đoạn thông tin, câu bảng số liệu, câu biểu đồ");
  qs.filter((q) => lop(q.topic) < 12).forEach((q) => assert.ok(q.svg || /bảng số liệu|số liệu tự đặt/.test(q.q), at + ": câu lớp 10, 11 là câu kĩ năng: " + q.q.slice(0, 50)));
  // biểu đồ: mỗi đề ít nhất hai biểu đồ
  const hinh = qs.filter((q) => q.svg); assert.ok(hinh.length >= 2, at + ": đề có ít nhất hai biểu đồ");
  hinh.forEach((q) => LOAI_DE.add(LOAI_HINH.get(q.svg) + (LOAI_HINH.get(q.svg) === "cột" && !/<rect [^>]*y="2[3-9]\d/.test(q.svg) ? " một dãy" : "")));
  assert.ok(!b.passages, at + ": đề không có đoạn thông tin dùng chung (thông tin ghi ở đề bài từng câu)");
  // lời dặn: số câu, số điểm, số câu mỗi lớp tính từ dữ liệu
  const c12 = dem(0, 28, (q) => lop(q.topic) === 12), c11 = dem(0, 28, (q) => lop(q.topic) === 11), c10 = dem(0, 28, (q) => lop(q.topic) === 10);
  ["Quyết định 764/QĐ-BGDĐT", "thí điểm thi trên máy tính", `đề có ${c12} câu Địa lí 12, ${c11} câu Địa lí 11 và ${c10} câu Địa lí 10 (${lenh12} trong 40 lệnh hỏi thuộc Địa lí 12)`,
    `Đề có ${qs.length} câu, làm trong ${b.minutes} phút`, "Phần I gồm 18 câu nhiều lựa chọn (4,5 điểm, mỗi câu 0,25 điểm)", "Phần II gồm 4 câu đúng/sai, mỗi câu 4 ý (4 điểm)",
    "Phần III gồm 6 câu trả lời ngắn (1,5 điểm, mỗi câu 0,25 điểm)", "không quá 4 kí tự", "Đề không có câu tự chấm", "đề tham khảo năm 2025 và đề chính thức năm 2026",
    "không được dùng Atlat", "số liệu tự đặt", "bản chỉnh sửa năm 2026"]
    .forEach((s) => assert.ok(b.note.includes(s), at + ": lời dặn thiếu “" + s + "”"));
  // đúng/sai 4 ý: trong một đề không lặp kiểu Đ/S
  const kieu = qs.filter((q) => q.type === "tf4").map((q) => q.a.map((a) => (a ? "Đ" : "S")).join(""));
  assert.equal(new Set(kieu).size, kieu.length, at + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + kieu.join(", "));
  kieu.forEach((x) => (KIEU[x] = (KIEU[x] || 0) + 1));
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn của đề
  const mc = qs.filter((q) => q.type === "mc"), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  const dai2 = mc.filter((q) => hon(q, (a, c) => a > c)).length, ngan = mc.filter((q) => hon(q, (a, c) => a < c)).length;
  assert.ok(dai2 * 3 <= mc.length && ngan * 3 <= mc.length && (dai2 + ngan) * 6 >= mc.length, at + `: đáp án đúng dài nhất ở ${dai2}, ngắn nhất ở ${ngan} trong ${mc.length} câu`);
  b._le = dai2 + ngan;
  // lời giải không nhắc vị trí của phương án (app xáo phương án)
  qs.forEach((q) => assert.ok(!/(phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x + " " + (q.o || []).join(" ")), at + ": nhắc vị trí của phương án: " + q.q.slice(0, 50)));
});
assert.ok(Object.values(KIEU).every((c) => c <= 3), "một kiểu Đ/S dùng quá ba lần trong các đề thi thử: " + JSON.stringify(KIEU));
if (DE.length >= 4) assert.deepEqual([...LOAI_DE].map((l) => l.replace(" một dãy", "")).filter((l, i, a) => a.indexOf(l) === i).sort(), ["cột", "đường", "kết hợp", "miền", "tròn"].sort(), "các đề có đủ năm loại biểu đồ");
// câu nhiều lựa chọn: đáp án đúng không là lựa chọn duy nhất có chữ của nhãn chủ đề; ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
{
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), loi = [];
  DE.forEach((b) => b.questions.forEach((q, i) => {
    if (q.type !== "mc") return;
    const at = b.id + "#" + (i + 1), c = chuThuong(q.topic.replace(/^Lớp 1[01] · /, "")), tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|đến|một)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); if (co[0] && !co.slice(1).some(Boolean)) loi.push(`${at}: chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    if (dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1) loi.push(at + ": ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”");
  }));
  assert.deepEqual(loi, [], "câu nhiều lựa chọn có gợi ý từ chữ của lựa chọn");
}

/* ---------- danh sách dùng khi so chữ ---------- */
// tên riêng, tên vùng, khu vực nhiều chữ tính là một từ khi so với chữ OCR của sách (như tests/lichsu-diali12-ck2.js)
const GOP = [
  "Trung du và miền núi phía Bắc", "Đồng bằng sông Hồng", "Bắc Trung Bộ", "Duyên hải Nam Trung Bộ và Tây Nguyên", "Đông Nam Bộ", "Đồng bằng sông Cửu Long",
  "Nam Trung Bộ", "Tây Nguyên", "Nam Bộ", "Bắc Bộ", "Trung Bộ", "Thành phố Hồ Chí Minh", "Hà Nội", "Hải Phòng", "Đà Nẵng", "Cần Thơ", "Huế", "Thanh Hoá", "Nghệ An",
  "Hà Tĩnh", "Quảng Trị", "Quảng Ninh", "Hưng Yên", "Ninh Bình", "Bắc Ninh", "Lai Châu", "Điện Biên", "Sơn La", "Lào Cai", "Phú Thọ", "Tuyên Quang", "Cao Bằng",
  "Lạng Sơn", "Thái Nguyên", "Khánh Hoà", "Lâm Đồng", "Quảng Ngãi", "Gia Lai", "Đắk Lắk", "Tây Ninh", "Đồng Nai", "Vĩnh Long", "Đồng Tháp", "An Giang", "Cà Mau",
  "Biển Đông", "Vịnh Bắc Bộ", "vịnh Thái Lan", "Đông Dương", "Đông Nam Á", "Đông Bắc Á", "Tây Nam Á", "châu Đại Dương", "Trung Đông", "Nam Âu", "Bắc Âu", "Đông Âu",
  "Nam Á", "Mỹ La tinh", "Liên minh châu Âu", "Liên hợp quốc", "Hoa Kỳ", "Trung Quốc", "Lào", "Cam-pu-chia", "Liên bang Nga", "Nhật Bản", "Hàn Quốc",
  "In-đô-nê-xi-a", "Phi-líp-pin", "Mi-an-ma", "Thái Lan", "Trường Sơn", "Bạch Mã", "Hoàng Liên Sơn", "Mê Công", "sông Tiền", "sông Hậu", "Sê San", "Srêpôk", "Ialy",
  "Đồng Tháp Mười", "Tứ giác Long Xuyên", "Cà Mau", "Củ Chi", "Hoà Lạc", "Cổ Loa", "Cồn Cỏ", "Vân Đồn", "Phả Lại", "Thành nhà Hồ", "Hành lang kinh tế Đông – Tây",
  "Nghị quyết số 202/2025/QH15", "Quyết định 764/QĐ-BGDĐT", "Quần thể di tích Cố đô Huế", "Phố cổ Hội An", "Thánh địa Mỹ Sơn", "Hoàng thành Thăng Long",
  // tên khu vực kinh tế, thành phần kinh tế như sách
  "nông nghiệp, lâm nghiệp và thuỷ sản", "công nghiệp và xây dựng", "kinh tế ngoài Nhà nước", "kinh tế Nhà nước", "khu vực có vốn đầu tư nước ngoài"
];
// cụm từ chung của môn: tên bài, tên chủ đề, tên chương, cách nói chuẩn của đề (thay bằng dấu ngăn trước khi so với sách)
const TU_CHUNG = [...BAI, ...Object.values(RUT_GON), ...CHUONG_11, ...CHUONG_10, "mỗi ý sau đúng hay sai", "Nhận xét nào sau đây đúng", "Cho biểu đồ", "Cho bảng số liệu",
  "Cho thông tin", "số liệu tự đặt", "làm tròn kết quả đến hàng đơn vị", "làm tròn kết quả đến hàng phần mười", "làm tròn kết quả đến hàng phần trăm",
  "vùng kinh tế – xã hội", "Địa lí các ngành kinh tế", "Địa lí các vùng kinh tế – xã hội", "Địa lí tự nhiên", "Địa lí dân cư",
  "tổng sản phẩm trên địa bàn", "tổng mức bán lẻ hàng hoá và doanh thu dịch vụ tiêu dùng", "giá trị sản xuất công nghiệp", "cơ cấu giá trị sản xuất công nghiệp",
  // tên chỉ tiêu thống kê, hình thức tổ chức lãnh thổ, khái niệm như sách và cách hỏi chung của đề thi (không coi là gần trùng câu khác)
  "cơ cấu diện tích cây công nghiệp lâu năm", "vùng chuyên canh cây công nghiệp", "khu nông nghiệp công nghệ cao", "khu công nghiệp", "nhà máy điện gió",
  "phát triển tổng hợp kinh tế biển", "tỉ suất tăng tự nhiên", "lao động đã qua đào tạo", "tỉ lệ dân thành thị", "bình quân đầu người",
  "phân theo khu vực kinh tế", "nền kinh tế", "chiếm bao nhiêu phần trăm", "gấp bao nhiêu lần", "là bao nhiêu", "chiếm tỉ trọng lớn nhất", "vùng nào có",
  "giải pháp nào sau đây", "đặc điểm nào sau đây đúng với", "có nguồn gốc cận nhiệt và ôn đới", "trình độ chuyên môn kĩ thuật", "có điều kiện thuận lợi",
  "tỉ lệ tăng tự nhiên của dân số", "thuế sản phẩm trừ trợ cấp sản phẩm", "dệt và sản xuất trang phục", "cơ cấu dân số theo nhóm tuổi"];
// chuỗi 3 từ chung của môn (thuật ngữ, tên riêng hay gặp): không làm lộ đáp án nào
const CUM_CHUNG = new Set(["nhất cả nước", "của cả nước", "tăng liên tục", "đồng bằng sông", "bằng sông cửu", "sông cửu long", "nam trung bộ", "đông nam bộ", "và tây nguyên",
  "duyên hải nam", "hải nam trung", "trung bộ và", "bộ và tây", "thành phố hồ", "phố hồ chí", "hồ chí minh", "tỉ trọng của", "có tỉ trọng", "tăng nhanh hơn", "quốc gia b", "qua các năm"]);

/* ---------- chữ ---------- */
const giaTri = (a) => (typeof a === "number" ? a : NaN);
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || []).map(String);
// 34 đơn vị hành chính cấp tỉnh (Nghị quyết 202/2025/QH15; Địa lí 12 in năm 2026, Bài 1) và 6 vùng kinh tế – xã hội (Nghị quyết 252/2025/QH15)
const TINH = ["Hà Nội", "Huế", "Hải Phòng", "Đà Nẵng", "Cần Thơ", "Thành phố Hồ Chí Minh", "Lai Châu", "Điện Biên", "Sơn La", "Lạng Sơn", "Quảng Ninh",
  "Thanh Hoá", "Nghệ An", "Hà Tĩnh", "Cao Bằng", "Tuyên Quang", "Lào Cai", "Thái Nguyên", "Phú Thọ", "Bắc Ninh", "Hưng Yên", "Ninh Bình", "Quảng Trị",
  "Quảng Ngãi", "Gia Lai", "Khánh Hoà", "Lâm Đồng", "Đắk Lắk", "Đồng Nai", "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang"];
assert.equal(TINH.length, 34);
// tỉnh, thành phố của 6 vùng kinh tế – xã hội (Địa lí 12 in năm 2026, Bài 24, 25, 27, 28, 30, 31)
const VUNG_TINH = { "Trung du và miền núi phía Bắc": ["Lai Châu", "Điện Biên", "Sơn La", "Lào Cai", "Phú Thọ", "Tuyên Quang", "Cao Bằng", "Lạng Sơn", "Thái Nguyên"],
  "Đồng bằng sông Hồng": ["Hà Nội", "Hải Phòng", "Hưng Yên", "Ninh Bình", "Bắc Ninh", "Quảng Ninh"], "Bắc Trung Bộ": ["Huế", "Thanh Hoá", "Nghệ An", "Hà Tĩnh", "Quảng Trị"],
  "Duyên hải Nam Trung Bộ và Tây Nguyên": ["Đà Nẵng", "Quảng Ngãi", "Gia Lai", "Đắk Lắk", "Khánh Hoà", "Lâm Đồng"], "Đông Nam Bộ": ["Thành phố Hồ Chí Minh", "Đồng Nai", "Tây Ninh"],
  "Đồng bằng sông Cửu Long": ["Cần Thơ", "Vĩnh Long", "Đồng Tháp", "An Giang", "Cà Mau"] };
assert.deepEqual(Object.values(VUNG_TINH).flat().sort(), [...TINH].sort(), "34 tỉnh, thành phố chia đủ cho 6 vùng");
// tên tỉnh đã nhập năm 2025 (không viết như tỉnh hiện nay)
const TINH_CU = ["Hà Giang", "Yên Bái", "Bắc Kạn", "Vĩnh Phúc", "Hoà Bình", "Bắc Giang", "Thái Bình", "Hải Dương", "Hà Nam", "Nam Định", "Quảng Bình",
  "Quảng Nam", "Kon Tum", "Bình Định", "Phú Yên", "Ninh Thuận", "Bình Thuận", "Đắk Nông", "Bà Rịa – Vũng Tàu", "Bà Rịa - Vũng Tàu", "Bình Dương", "Bình Phước",
  "Long An", "Tiền Giang", "Bến Tre", "Trà Vinh", "Hậu Giang", "Sóc Trăng", "Bạc Liêu", "Kiên Giang", "Thừa Thiên Huế"];
const TINH_CUA = (s) => [...String(s).matchAll(/\((\p{Lu}[\p{L}]*(?: \p{Lu}[\p{L}]*)*)\)/gu)].map((x) => x[1]).filter((t) => !/^(?:Trung Quốc|Nam Trung Bộ|HDI|GDP|GRDP|GNI|EU|ASEAN|FDI|MW)$/.test(t));
{
  const loi = [], kt = (ok, m) => ok || loi.push(m);
  DE.forEach((b) => {
    b.questions.map((q) => [b.id + ": " + q.q.slice(0, 50), chu(q)]).concat([[b.id + ": lời dặn", [b.note]]]).forEach(([at, ss]) => ss.forEach((s) => {
      // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân (năm viết liền: 2025)
      kt(!/(?<![,\d])\d{5,}/.test(s) && !/(?<![,\d])\d{4}(?![\d ])/.test(s.replace(/\b(?:1[89]|20)\d{2}\b/g, "").replace(/\d+\/QĐ-BGDĐT|\d+\/\d{4}\/QH\d+/g, "")) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s.slice(0, 120));
      // dấu thanh kiểu sách (hoá, thuỷ, hoà, khoẻ, tuỳ)
      kt(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|lũy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s.slice(0, 120));
      // địa danh theo đơn vị hành chính hiện nay: không “huyện”, “63 tỉnh”; tỉnh đã nhập chỉ ghi kèm “nay thuộc …”
      kt(!/(?<![\p{L}])(?:huyện|63 tỉnh|64 tỉnh)(?![\p{L}])/iu.test(s), at + ": đơn vị hành chính cũ: " + s.slice(0, 120));
      TINH_CUA(s).forEach((t) => kt(TINH.includes(t), at + ": tỉnh trong ngoặc không có trong 34 đơn vị: " + t));
      const s2 = s.replace(/(?:[Cc]hiến dịch|thuỷ điện) Hoà Bình|Thái Bình Dương|sông (?:Hồng, )?Thái Bình/g, "");
      TINH_CU.forEach((t) => { if (s2.includes(t)) kt(new RegExp(escRe(t) + " \\(nay (?:thuộc|là) ").test(s2), at + ": tên tỉnh cũ “" + t + "” không ghi tên mới"); });
      [...s.matchAll(/(?:tỉnh|thành phố) (\p{Lu}[\p{L}]*(?: \p{Lu}[\p{L}]*)*)/gu)].forEach((x) => kt(TINH.includes(x[1]) || TINH.includes("Thành phố " + x[1]) || /^\p{Lu}$/u.test(x[1]) || /^Hồ Chí Minh$/.test(x[1]), at + ": tên tỉnh, thành phố không có trong 34 đơn vị: " + x[0]));
      // vùng kinh tế – xã hội gọi đúng tên của sách in năm 2026
      kt(!/vùng (?:kinh tế – xã hội )?(?:Tây Nguyên|Duyên hải Nam Trung Bộ(?! và Tây Nguyên))/.test(s) && !/(?:7|bảy) vùng kinh tế/.test(s), at + ": tên vùng theo 6 vùng kinh tế – xã hội: " + s.slice(0, 120));
    }));
  });
  // chữ trong hình không đè nhau, không đè chấm tròn, nằm trọn trong khung
  DE.forEach((b) => b.questions.forEach((q, i) => { if (q.svg) deChu(q.svg).forEach((m) => loi.push(b.id + "#" + (i + 1) + ": " + m)); }));
  assert.deepEqual(loi, [], "chữ viết khác quy ước");
}

/* ---------- so với ba kho Địa lí 12 và giữa các đề thi thử: đề bài không trùng, không gần trùng; đáp án không trùng câu cùng chủ đề ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const boDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP_ = GOP.map(boDau).sort((a, b) => b.length - a.length), TU_CHUNG_ = TU_CHUNG.map((p) => " " + boDau(p) + " ").sort((a, b) => b.length - a.length);
// bỏ dấu, thay cụm chung bằng dấu ngăn, gộp tên riêng nhiều chữ thành một từ, gộp nguyên âm (chữ OCR hay đọc sai dấu, nguyên âm)
const khongDau = (s) => {
  let t = " " + boDau(String(s).normalize("NFC")) + " ";
  TU_CHUNG_.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  GOP_.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); });
  return t.replace(/[aeiouy]+/g, "a").replace(/\s+/g, " ").trim();
};
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const ten = new Map();
DE.forEach((b) => b.questions.forEach((q, i) => ten.set(q, b.id.replace("diali12-", "") + "#" + (i + 1))));
const KHO_Q = BANKS.filter((b) => b.file === "12-diali.js" && !b.pool && !/^diali12-tn-/.test(b.id)).flatMap((b) => b.questions.map((q, i) => { ten.set(q, b.id.replace("diali12-", "") + "#" + (i + 1)); return Object.assign(q, { _de: b.id }); }));
const TNQ = DE.flatMap((b) => b.questions.map((q) => Object.assign(q, { _de: b.id })));
{
  const ds = BANKS.filter((b) => b.file === "12-diali.js" && !b.pool).flatMap((b) => b.questions.map((q) => ({ q, k: gocChu(q.q) })));
  TNQ.forEach((q) => assert.deepEqual(ds.filter((e) => e.k === gocChu(q.q)).map((e) => ten.get(e.q)), [ten.get(q)], "đề bài trùng câu khác trong 12-diali.js"));
  // cặp hai âm tiết liền nhau: đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của ba kho và số cặp chung từ một nửa số cặp của câu ít cặp
  // hơn thì báo; không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung và cặp có ở từ 3% số câu của file. Giữa các đề thi thử chỉ so chuỗi 6 từ.
  const CUM = ["mỗi ý sau đúng hay sai", "làm tròn kết quả đến hàng phần trăm", "làm tròn kết quả đến hàng phần mười", "làm tròn kết quả đến hàng đơn vị", "số liệu tự đặt"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => c.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const ca = KHO_Q.concat(TNQ), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && df[c] < 0.03 * ca.length)); };
  const gan_ = [], gan6 = [], trung = [];
  TNQ.forEach((q) => {
    const c = capAm(q);
    KHO_Q.concat(TNQ.filter((p) => p._de !== q._de)).forEach((p) => {
      const d = capAm(p), chung = [...c].filter((x) => d.has(x));
      if (!/^diali12-tn-/.test(p._de) && chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`);
      const s = " " + khongDau(p.q) + " "; chuoi(q.q, 6).forEach((x) => { if (s.includes(" " + x + " ")) gan6.push(ten.get(q) + " ~ " + ten.get(p) + ": " + x); });
      if (p.topic !== q.topic) return;
      if (q.type === "mc" && p.type === "mc" && gocChu(q.o[0]) === gocChu(p.o[0])) trung.push(ten.get(q) + " ~ " + ten.get(p) + ": đáp án trùng câu cùng chủ đề");
      if (q.type === "num" && p.type === "num" && gan(q.ans, giaTri(p.ans)) && (q.unit || "") === (p.unit || "")) trung.push(ten.get(q) + " ~ " + ten.get(p) + ": đáp án số trùng câu cùng chủ đề");
    });
  });
  if (process.env.DO_GAN) console.log("Gần trùng (xem tay):\n" + [...new Set(gan_), ...new Set(gan6), ...trung].join("\n"));
  assert.deepEqual([...new Set(gan_)], [], "đề bài gần trùng (cặp hai âm tiết) câu khác");
  assert.deepEqual([...new Set(gan6)], [], "đề bài gần trùng (chuỗi 6 từ) câu khác");
  assert.deepEqual(trung, [], "đáp án trùng câu cùng chủ đề");
}

/* ---------- dò lộ đáp án (như tests/sinhhoc12-tn.js) ----------
   Đề cố định: mọi câu cùng hiện, lời dặn hiện ở màn mở đề; đề “Ôn chủ đề” rút chung câu cùng chủ đề của các đề thi thử và ba kho Địa lí 12.
   Đáp án là số (trả lời ngắn, lựa chọn đúng là số kèm đơn vị; từ hai chữ số, hoặc số thập phân) tìm ở vị trí kết quả của câu kia (ngay sau “=”,
   “≈”, “là”, “bằng”, “được”, “đạt”, “chiếm”; không tính số đứng trước một phép tính) cùng đơn vị, cả số trong khoảng tol của đáp án: không được
   có. Đáp án bằng chữ tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án; chuỗi có ở từ hai lựa chọn sai thì bỏ);
   chuỗi có trong đề bài, lựa chọn, lời giải của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. */
const DON_VI = "(?:triệu tấn\\.km|triệu tấn|nghìn tấn|nghìn tỉ đồng|tỉ đồng|tỉ kWh|tỉ USD|nghìn USD|USD|nghìn thuê bao|nghìn con|nghìn người|triệu người|nghìn ha|triệu ha|triệu lượt|triệu đồng|triệu km²|km²|người\\/km²|kg\\/người|tạ\\/ha|tấn\\/ha|thuê bao|MW|km|năm|lần|%|‰|°C)";
const soDV = new RegExp("^(" + NUM + ")(?: ?(" + DON_VI + "))?$", "u");
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được|đạt|chiếm))\\s+(" + NUM + ")(?![\\d,])(?!\\s*[·+−:×](?:\\s|\\d|\\())(?: ?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => ({ v: val(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const chuP = (p) => (p.type === "note" ? [p.x] : chu(p));
const NOTES = DE.map((b) => { const o = { q: b.id + "-note", x: b.note, topic: "note", type: "note", _de: b.id }; ten.set(o, b.id.replace("diali12-", "") + "-note"); return o; });
const doLo = (qs, them, cap) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    let soDa = [], C = [];
    if (q.type === "num") soDa = [{ v: giaTri(q.ans), u: q.unit || "", t: q.tol || 0 }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: val(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]), sai = q.o.slice(1).map((o) => " " + tuCua(o).join(" ") + " ");
      C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)].filter((c) => sai.filter((o) => o.includes(" " + c + " ")).length < 2); } }
    soDa = soDa.filter((d) => Math.abs(d.v) >= 10 || !Number.isInteger(d.v));
    qs.concat(them).forEach((p) => {
      if (p === q || !cap(p, q)) return;
      const at = `${ten.get(p)} → ${ten.get(q)}: `, T = " " + chuP(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chuP(p).flatMap(kqSo).some((y) => (gan(y.v, d.v) || (d.t && Math.abs(y.v - d.v) <= d.t + 1e-12)) && (!y.u || !d.u || y.u === d.u))).forEach((d) => lo.push(at + vn(d.v) + " " + d.u));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
// trong một đề (mọi câu cùng hiện) và với lời dặn của đề
const r1 = doLo(TNQ, NOTES, (p, q) => p._de === q._de);
// cùng chủ đề (đề “Ôn chủ đề”): câu của đề thi thử với câu cùng chủ đề của đề thi thử khác và của ba kho (trừ câu tự luận)
const onCD = TNQ.concat(KHO_Q.filter((q) => q.type !== "essay" && TNQ.some((t) => t.topic === q.topic)));
const r2 = doLo(onCD, [], (p, q) => p.topic === q.topic && p._de !== q._de && (/^diali12-tn-/.test(p._de) || /^diali12-tn-/.test(q._de)));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác (xem tay):\n" + [...r1.chuLo, ...r2.chuLo].join("\n"));
// đã xem (Phiên N12-tn-diali): chữ chung, câu kia không nói tới điều câu này hỏi. Tên vùng, tỉnh ở đề bài, lựa chọn sai của câu khác (Đồng bằng sông
// Hồng ở câu tỉ lệ tăng dân số; Quảng Ninh, Hải Phòng là lựa chọn sai của câu Vân Đồn, Phả Lại hay tên tỉnh của vùng ở kho giữa kì II; Đông Nam Bộ ở
// đề bài câu hạn chế tự nhiên; Quảng Trị trong danh sách tỉnh của vùng; các sông Sê San, Srêpôk… liệt kê chung); số liệu của tỉnh, quốc gia tự đặt
// (cao su của tỉnh G, dịch vụ của quốc gia M, V, trị giá xuất khẩu của quốc gia P, tỉ trọng các khu vực, thành phần kinh tế cả nước) không cho biết
// điều câu kia hỏi; “nhiệt điện”, “đào tạo nghề”, “có mùa đông” ở câu kho nói việc khác (nhiên liệu của nhà máy, nơi có nhiều trường nghề, lựa
// chọn sai “không có mùa đông” của câu chăn nuôi); “phân hoá theo”, “tuổi thọ trung bình” là tên chỉ tiêu, cách nói chung.
const DA_XEM = [
  "ck1-de1#21 → tn-de2#7: nhiệt điện",
  "ck1-de1#22 → tn-de2#7: nhiệt điện",
  "ck1-de1#9 → tn-de4#6: thuỷ sản giảm",
  "ck1-de1#9 → tn-de4#6: trọng nông nghiệp",
  "ck1-de1#9 → tn-de4#6: tỉ trọng nông",
  "ck1-de2#6 → tn-de4#4: đào tạo nghề",
  "ck2-de2#9 → tn-de1#14: sông sê san",
  "gk2-de1#18 → tn-de2#11: quảng ninh",
  "gk2-de1#18 → tn-de4#12: hải phòng",
  "gk2-de1#19 → tn-de4#12: hải phòng",
  "gk2-de2#16 → tn-de1#11: có mùa đông",
  "gk2-de2#19 → tn-de2#11: quảng ninh",
  "gk2-de2#22 → tn-de1#13: quảng trị",
  "tn-de1#12 → tn-de1#7: bằng sông hồng",
  "tn-de1#17 → tn-de4#17: 2023 dịch vụ",
  "tn-de1#17 → tn-de4#17: năm 2023 dịch",
  "tn-de1#7 → tn-de4#9: đông nam bộ",
  "tn-de2#11 → tn-de4#12: hải phòng",
  "tn-de2#19 → tn-de2#2: phân hoá theo",
  "tn-de2#22 → tn-de2#13: cao su",
  "tn-de3#16 → tn-de3#4: thọ trung bình",
  "tn-de3#16 → tn-de3#4: tuổi thọ trung",
  "tn-de3#20 → ck1-de1#8: kinh tế nhà",
  "tn-de3#20 → ck1-de1#8: tế nhà nước",
  "tn-de3#20 → ck1-de1#9: công nghiệp và",
  "tn-de3#20 → ck1-de1#9: nghiệp và xây",
  "tn-de3#20 → ck1-de1#9: và xây dựng",
  "tn-de3#21 → ck2-de1#2: nhanh hơn đường",
  "tn-de4#12 → tn-de2#11: quảng ninh",
  "tn-de4#13 → tn-de4#9: đông nam bộ",
  "tn-de4#17 → tn-de1#17: dịch vụ tăng",
  "tn-de4#17 → tn-de4#6: thuỷ sản giảm",
  "tn-de4#18 → tn-de4#16: giá xuất khẩu",
  "tn-de4#18 → tn-de4#16: trị giá xuất"
];
assert.deepEqual([...r1.chuLo, ...r2.chuLo].sort(), [...DA_XEM].sort(), "đáp án bằng chữ có ở câu khác đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual([...r1.lo, ...r2.lo], [], "lộ đáp án:\n" + [...r1.lo, ...r2.lo].join("\n"));

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (nếu có) ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const truongChu = (q) => (q.type === "note" ? [q.x] : chu(q));
if (SACH.length) {
  assert.ok(SACH.some((f) => /dia-li-12/.test(f)), "OnUp-Book có Địa lí 12");
  // chủ đề đúng tên bài trong mục lục (README của Địa lí 12; tên Bài 5, 20, 28, 31, 33 rút gọn như các kho), tên phần, khu vực của Địa lí 11, tên chương của Địa lí 10
  const ml = (l, c) => { const f = path.join(BOOK, l, c, "README.md"); return fs.existsSync(f) ? fs.readFileSync(f, "utf8") : null; };
  const r12 = ml("lop-12", "dia-li-12"), r11 = ml("lop-11", "dia-li-11"), r10 = ml("lop-10", "dia-li-10"), hoa = (s) => s.normalize("NFC").toLocaleUpperCase("vi");
  if (r12) BAI.forEach((t, i) => { const m = new RegExp("Bài " + SO_BAI[i] + "\\. ([^|]+?) \\|").exec(r12); assert.ok(m, "mục lục có Bài " + SO_BAI[i]);
    const ten_ = m[1].trim(), ngan = RUT_GON[t]; assert.ok(ngan ? ten_ === ngan : ten_ === t, "chủ đề đúng tên Bài " + SO_BAI[i] + ": " + t + " / " + ten_); });
  if (r11) CHUONG_11.forEach((t) => assert.ok(hoa(r11).includes("**" + hoa(t) + "**") || hoa(r11).includes(". " + hoa(t) + "**"), "tên phần, khu vực của Địa lí 11: " + t));
  if (r10) CHUONG_10.forEach((t) => assert.ok(new RegExp("\\*\\*Chương \\d+\\. " + escRe(t) + "\\*\\*").test(r10), "tên chương Địa lí 10: " + t));
  const sach = new Set(), them = (t, k) => { const w = t.split(" ").filter(Boolean); for (let i = 0; i + k <= w.length; i++) sach.add(k + ":" + w.slice(i, i + k).join(" ")); };
  SACH.forEach((f) => { const t = khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")); them(t, 8); if (process.env.DO_SACH) them(t, 6); });
  const tatCa = TNQ.concat(NOTES), bao = (k) => tatCa.flatMap((q) => truongChu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.has(k + ":" + c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH8) tatCa.forEach((q) => truongChu(q).forEach((s, f) => { const w = khongDau(s).split(" ").filter(Boolean), dau = new Array(w.length).fill(0);
    for (let i = 0; i + 8 <= w.length; i++) { const c = w.slice(i, i + 8); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5 && sach.has("8:" + c.join(" "))) for (let j = i; j < i + 8; j++) dau[j] = 1; }
    const r = []; let cur = []; w.forEach((x, i) => { if (dau[i]) cur.push(x); else if (cur.length) { r.push(cur.join(" ")); cur = []; } }); if (cur.length) r.push(cur.join(" "));
    if (r.length) console.log(ten.get(q) + " [" + f + "] " + r.join(" … ")); }));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả ba kho Địa lí 12 và giữa các đề thi thử ---------- */
{
  const cua = (b, q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const khac = BANKS.filter((b) => !b.pool).flatMap((b) => b.questions.map((q) => cua(b, q))).concat(BANKS.filter((b) => b.pool).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const tap = new Map(); khac.forEach((o) => { const w = o.s.split(" ").filter(Boolean); for (let i = 0; i + 8 <= w.length; i++) { const c = w.slice(i, i + 8).join(" "); if (!tap.has(c)) tap.set(c, new Set()); tap.get(c).add(o.id); } });
  const bao = TNQ.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, 8)))].flatMap((c) => [...(tap.get(c) || [])].filter((id) => id !== q._de).map((id) => `${ten.get(q)} ~ ${id}: ${c}`)));
  if (process.env.DO_KHO) { const t6 = new Map(); khac.forEach((o) => { const w = o.s.split(" ").filter(Boolean); for (let i = 0; i + 6 <= w.length; i++) { const c = w.slice(i, i + 6).join(" "); if (!t6.has(c)) t6.set(c, new Set()); t6.get(c).add(o.id); } });
    console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(TNQ.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, 6)))].flatMap((c) => [...(t6.get(c) || [])].filter((id) => id !== q._de).map((id) => `${ten.get(q)} ~ ${id}: ${c}`))))].join("\n")); }
  assert.deepEqual([...new Set(bao)], [], "chuỗi 8 từ trùng câu của kho khác");
}

/* ---------- tự thử các bộ đọc với hình, câu cố ý viết sai ---------- */
{
  const tim = (has) => { const r = TNQ.filter((q) => q.q.includes(has)); assert.equal(r.length, 1, "tự thử: cần đúng một câu có “" + has + "”"); return r[0]; };
  // bộ đọc biểu đồ bắt được số ghi sai vị trí, phần tròn sai góc, miền không cộng đủ 100%
  const qT = tim("cơ cấu GDP của quốc gia M ở khu vực Đông Nam Á"), qC = tim("hoạt động ngoại thương của quốc gia B"), qM = tim("cơ cấu số người làm việc theo khu vực kinh tế của quốc gia V");
  const qD = tim("diện tích trồng lúa và diện tích nuôi tôm nước lợ"), qK = tim("số lao động làm việc trong các khu công nghiệp (cột)");
  assert.throws(() => docTron(qT.svg.replace(">46%<", ">50%<")), /khớp|cộng lại 100%/);
  assert.throws(() => docCot(qC.svg.replace(">18,5<", ">19,5<"), "Tỉ USD"), /không khớp vị trí/);
  assert.throws(() => docMien(qM.svg.replace(">52<", ">55<")), /khớp số|cộng lại 100%/);
  assert.throws(() => docDuong(qD.svg.replace(">168<", ">178<"), "Nghìn ha"), /không khớp vị trí/);
  assert.throws(() => docKetHop(qK.svg.replace(">410<", ">440<")), /không khớp vị trí/);
  // bộ dò chữ đè: dời số của cột sang sát số của cột bên cạnh, dời chữ ra ngoài khung hình
  assert.ok(deChu(qC.svg.replace(/(<text x=")(\d+(?:\.\d+)?)(" y="[\d.]+" text-anchor="middle" font-size="15">18,5<)/, (m, a, x, b) => a + (+x + 20) + b)).some((m) => /chữ đè chữ/.test(m)), "bộ dò chữ đè bắt được hai số đè nhau");
  assert.ok(deChu(qC.svg.replace('<text x="8" y="22" font-size="15">Tỉ USD</text>', '<text x="300" y="22" font-size="15">Tỉ USD</text>')).some((m) => /ra ngoài khung/.test(m)), "bộ dò bắt được chữ ra ngoài khung hình");
  // bộ dò lộ bắt được số ở vị trí kết quả cùng đơn vị, số trong khoảng tol của đáp án
  const thu = (qs) => { const r = doLo(qs, [], () => true); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const ghi = (q, x) => { const o = Object.assign({}, q, { x: q.x + " " + x }); ten.set(o, "thử-giả"); return o; };
  const qS = tim("Diện tích lúa bị thiệt hại chiếm bao nhiêu phần trăm"), khac = tim("Tỉ suất tăng tự nhiên dân số của quốc gia K là");
  [qS, khac].forEach((q) => ten.set(q, "thử"));
  assert.deepEqual(thu([qS, ghi(khac, "Tỉ lệ đó là 11,8%.")]), ["11,8 %"]);
  assert.deepEqual(thu([qS, ghi(khac, "Tỉ lệ đó là 11,79%.")]), ["11,8 %"]);
  assert.deepEqual(thu([qS, ghi(khac, "Có 11,8 nghìn ha đất.")]), []);
  assert.ok(thu([khac, ghi(qS, "Tỉ suất tăng tự nhiên là 1,1%.")]).length > 0);
}
DE.forEach((b) => console.log(`${b.id}: ${b.questions.length} câu (${b.questions.filter((q) => q.type === "mc").length} nhiều lựa chọn, ${b.questions.filter((q) => q.type === "tf4").length} đúng/sai 4 ý, ${b.questions.filter((q) => q.type === "num").length} trả lời ngắn), ` +
  `${b.questions.filter((q) => lop(q.topic) === 11).length} câu lớp 11, ${b.questions.filter((q) => lop(q.topic) === 10).length} câu lớp 10, ${b.questions.filter((q) => q.svg).length} biểu đồ; đáp án đúng dài nhất hoặc ngắn nhất ở ${b._le}/18 câu nhiều lựa chọn.`));
console.log(n + " câu đã tính lại hoặc so với bảng (" + daDoc.size + " hình đã đọc lại).");
console.log("MATH OK");
