// Tính lại đáp án và kiểm tra ma trận hai ngân hàng lớp 6 cuối năm của Phiên N22: Lịch sử và Địa lí (data/banks/6-lsdl.js) và GDCD
// (6-gdcd.js), theo mẫu tests/lsdl-gdcd6-gk2.js. Mỗi ngân hàng = Đề 1 + Đề 2 (25 câu mỗi đề, cùng chia theo ma trận) + đề ngẫu nhiên
// không có câu riêng. Câu có phép tính hoặc có hình được nhận ra bằng một đoạn chữ của đề (has, đúng một câu trong hai kho, đúng đề
// ghi ở id); so đáp án với kết quả tính bằng code: điền khuyết ans[0], trả lời bằng số ans, trắc nghiệm o[0]. Lịch sử và Địa lí: số
// năm (đọc các năm trong đề), thế kỉ của một năm trong ý đúng/sai, mật độ dân số (số dân : diện tích, đọc trong đề), điều kiện khí
// hậu của rừng mưa nhiệt đới; câu có hình đọc lại hình: biểu đồ cột số dân (trục số bên trái, số ở đỉnh cột, năm dưới cột), sơ đồ năm
// đới thiên nhiên (vĩ độ ghi bên trái, tên đường bên phải, số của đới), mặt cắt bãi cọc (thang độ cao, đầu cọc, hai mực nước) và
// lược đồ mật độ dân số (vùng tô màu theo chú giải, tên vùng trong vùng). Câu trả lời bằng số, câu điền có đáp án là số và câu có hình
// nào trong hai kho cũng phải có kiểm tra ở đây.
// Rồi kiểm tra mức độ và ma trận như tests/lsdl-gdcd6-gk2.js: mọi câu có lv; ma trận 10 Biết, 8 Hiểu, 7 Vận dụng, chủ đề theo thứ tự
// bài như hai đề; cả hai đề chia đúng theo ma trận; mỗi kho có ít nhất 3 câu đúng/sai 4 ý (kiểu Đ/S không lặp quá một phần ba), không
// có câu tự luận; rút thử nhiều lần ra đúng ma trận, không ghi chú; học sinh đã làm hết một đề cố định thì đề ngẫu nhiên rút đúng 25
// câu của đề kia. Cuối cùng: đề bài không trùng câu nào khác trong file và dò lộ đáp án giữa các câu rút được cùng lúc (Rút ra N5; bộ
// dò theo tests/khtn6-ck2.js): đáp án bằng số ở vị trí kết quả của câu kia, cặp nối có cả hai vế ở câu kia; đáp án bằng chữ (trắc
// nghiệm, điền) có ở câu kia thì in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. Câu 13 của
// gdcd6-ck1-de1 (Phiên N22 hỏi theo chiều khác) cũng được dò với các câu rút được cùng lúc trong kho cuối kì I.
// Chạy: node tests/lsdl-gdcd6-ck2.js → in MATH OK.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz;
const ma = (m) => ({ de1: m + "6-ck2-de1", de2: m + "6-ck2-de2", pool: m + "6-ck2-ngau-nhien" });
const L = ma("lsdl"), G = ma("gdcd");

/* ---------- số ---------- */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(",", "."); // “2 400 000” → 2400000, “2,5” → 2.5
const vn = (x) => { const [n, d] = String(x).split("."); return n.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : ""); }; // 2400000 → “2 400 000”
const nam = (s) => [...s.matchAll(/năm (\d{1,4})(?!\d| \d)/gi)].map((m) => +m[1]); // các năm ghi trong đề, theo thứ tự
const LA_MA = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
const theKi = (y) => LA_MA[Math.floor((y - 1) / 100)]; // năm sau Công nguyên: 1–100 thế kỉ I, 101–200 thế kỉ II…

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ngang = (l) => num(l, "y1") === num(l, "y2");
const trongDaGiac = (p, poly) => { let c = false; for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) { const [xi, yi] = poly[i], [xj, yj] = poly[j]; if (yi > p[1] !== yj > p[1] && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) c = !c; } return c; };
const daDoc = new Set(); // hình đã đọc lại bằng code
// trục số: các số đặt ngay cạnh vạch (chân chữ thấp hơn vạch 5 đơn vị), cách đều theo giá trị; trả về hàm đổi toạ độ y ra giá trị
const trucSo = (nhan, vach, ten) => {
  assert.ok(nhan.length >= 3, ten + ": cần ít nhất 3 số trên trục");
  nhan.forEach((n) => assert.ok(vach.some((y) => close(y, n.y - 5)), `${ten}: số ${n.v} phải đặt ngay cạnh một vạch`));
  const s = [...nhan].sort((a, b) => a.v - b.v), k = (s[0].y - s[1].y) / (s[1].v - s[0].v);
  assert.ok(k > 0, ten + ": số lớn ở trên");
  s.forEach((n) => assert.ok(close(n.y - 5, s[0].y - 5 - k * (n.v - s[0].v)), `${ten}: số ${n.v} không đặt đúng vạch`));
  return (y) => s[0].v + (s[0].y - 5 - y) / k;
};

/* Biểu đồ cột số dân: đường lưới nằm ngang (nét màu line), số ở đầu trái mỗi đường lưới (text-anchor="end") là số dân (triệu người);
   cột là hình chữ nhật tô acc-soft đứng trên đường đáy, số ghi ở đỉnh cột (giữa cột, cao hơn đỉnh 6 đơn vị), năm ghi dưới đáy. */
const docCot = (svg) => {
  daDoc.add(svg);
  const lu = tags(svg, "line").filter((l) => l.stroke === "line");
  assert.ok(lu.length >= 4 && lu.every(ngang), "đường lưới nằm ngang");
  const x0 = Math.min(...lu.map((l) => num(l, "x1"))), ys = lu.map((l) => num(l, "y1")), day = Math.max(...ys), tx = texts(svg);
  const giaTri = trucSo(tx.filter((t) => /^\d+$/.test(t.t) && t["text-anchor"] === "end" && +t.x < x0).map((t) => ({ v: +t.t, y: +t.y })), ys, "trục số dân");
  assert.equal(Math.round(giaTri(day)), 0, "số 0 ở đường đáy");
  const cot = tags(svg, "rect").filter((r) => r.fill === "acc-soft").map((r) => {
    assert.equal(num(r, "y") + num(r, "height"), day, "cột đứng trên đường đáy");
    const cx = num(r, "x") + num(r, "width") / 2, v = Math.round(giaTri(num(r, "y")) * 1000) / 1000;
    const dinh = tx.filter((t) => t["text-anchor"] === "middle" && close(+t.x, cx) && +t.y < day);
    assert.equal(dinh.length, 1, "mỗi cột một số ở đỉnh"); assert.ok(close(+dinh[0].y, num(r, "y") - 6), "số ghi ngay trên đỉnh cột");
    assert.equal(+dinh[0].t, v, `số ở đỉnh cột (${dinh[0].t}) khớp chiều cao cột (${v})`);
    const nam = tx.filter((t) => t["text-anchor"] === "middle" && close(+t.x, cx) && +t.y > day);
    assert.equal(nam.length, 1, "mỗi cột một năm ở dưới"); return { nam: +nam[0].t, v };
  }).sort((a, b) => a.nam - b.nam);
  assert.ok(cot.length >= 4, "ít nhất 4 cột"); assert.ok(texts(svg).some((t) => t.t === "Triệu người"), "trục ghi đơn vị");
  return cot;
};

/* Sơ đồ năm đới thiên nhiên: một dải từ cực Bắc (trên) đến cực Nam (dưới); vĩ độ ghi bên trái (text-anchor="end"), tên đường ghi bên
   phải cùng hàng; ranh giới các đới là đường kẻ ngang nét ink trong dải (Xích đạo là nét đứt, không phải ranh giới); số của đới (chữ
   đậm) nằm giữa hai ranh giới. Trả về { đới: "nóng" | "ôn hoà" | "lạnh" } theo số. */
const docDoi = (svg) => {
  daDoc.add(svg);
  const tx = texts(svg), [dai] = tags(svg, "rect"), top = num(dai, "y"), bot = top + num(dai, "height"), x0 = num(dai, "x"), x1 = x0 + num(dai, "width");
  const viDo = tx.filter((t) => t["text-anchor"] === "end" && +t.x <= x0).map((t) => {
    const m = /^(\d+)°(?:(\d+)′)?([BN])?$/.exec(t.t); assert.ok(m, "vĩ độ viết dạng 66°33′B: " + t.t);
    return { lat: (+m[1] + (m[2] ? +m[2] / 60 : 0)) * (m[3] === "N" ? -1 : 1), y: +t.y - 5 };
  });
  const ten = tx.filter((t) => +t.x >= x1 && !t["text-anchor"]).map((t) => ({ ten: t.t, y: +t.y - 5 }));
  assert.equal(viDo.length, 7); assert.equal(ten.length, 7);
  const k = (viDo[0].y - viDo[viDo.length - 1].y) / (viDo[viDo.length - 1].lat - viDo[0].lat);
  viDo.forEach((v) => assert.ok(Math.abs(v.y - (viDo[0].y - k * (v.lat - viDo[0].lat))) < 0.06, "vĩ độ " + v.lat + " đặt đúng tỉ lệ"));
  const latCua = (t) => { const v = viDo.find((d) => close(d.y, ten.find((n) => n.ten === t).y)); assert.ok(v, t + " cùng hàng với một vĩ độ"); return v.lat; };
  const DUNG = { "Cực Bắc": 90, "Vòng cực Bắc": 66 + 33 / 60, "Chí tuyến Bắc": 23 + 27 / 60, "Xích đạo": 0, "Chí tuyến Nam": -(23 + 27 / 60), "Vòng cực Nam": -(66 + 33 / 60), "Cực Nam": -90 };
  Object.entries(DUNG).forEach(([t, lat]) => assert.ok(close(latCua(t), lat), t + " ghi đúng vĩ độ"));
  assert.ok(close(viDo[0].y, top) && close(viDo[viDo.length - 1].y, bot), "dải từ cực Bắc đến cực Nam");
  const ranh = tags(svg, "line").filter((l) => l.stroke === "ink" && ngang(l)).map((l) => num(l, "y1"));
  const tenRanh = ranh.map((y) => { const n = ten.find((m) => Math.abs(m.y - y) < 0.06); assert.ok(n, "ranh giới nào cũng có tên"); return n.ten; });
  assert.deepEqual([...tenRanh].sort(), ["Chí tuyến Bắc", "Chí tuyến Nam", "Vòng cực Bắc", "Vòng cực Nam"], "ranh giới các đới là chí tuyến và vòng cực");
  const moc = [{ y: top, ten: "Cực Bắc" }, ...ranh.map((y, i) => ({ y, ten: tenRanh[i] })), { y: bot, ten: "Cực Nam" }].sort((a, b) => a.y - b.y);
  const loai = (a, b) => (/Chí tuyến/.test(a) && /Chí tuyến/.test(b) ? "nóng" : /Cực/.test(a) || /Cực/.test(b) ? "lạnh" : "ôn hoà");
  const out = {};
  tx.filter((t) => t["font-weight"] === "700").forEach((t) => {
    const y = +t.y - 5, i = moc.findIndex((m, j) => j < moc.length - 1 && y > m.y && y < moc[j + 1].y);
    assert.ok(i >= 0 && +t.y - 16 > moc[i].y && +t.y + 2 < moc[i + 1].y, "số " + t.t + " nằm trọn trong một đới");
    assert.equal(out[t.t], undefined); out[t.t] = loai(moc[i].ten, moc[i + 1].ten);
  });
  assert.deepEqual(Object.keys(out).sort(), ["1", "2", "3", "4", "5"], "năm đới đánh số 1–5");
  return out;
};
const DAC_DIEM = { "nóng": "Nóng quanh năm; thiên nhiên thay đổi chủ yếu theo lượng mưa", "ôn hoà": "Thiên nhiên thay đổi rõ rệt theo bốn mùa trong năm", "lạnh": "Khí hậu giá lạnh, băng tuyết bao phủ gần như quanh năm" };

/* Mặt cắt bãi cọc: thang độ cao bên trái (số nguyên, text-anchor="end", ngay cạnh vạch), cọc là đa giác tô ink (đầu cọc là điểm cao
   nhất), mực nước là đường kẻ ngang nét đứt màu acc với tên ghi ngay trên đường (cao hơn 6 đơn vị). Trả về độ cao (m). */
const docCoc = (svg) => {
  daDoc.add(svg);
  const tx = texts(svg), vach = tags(svg, "line").filter((l) => !l.stroke && ngang(l)).map((l) => num(l, "y1"));
  const doCao = trucSo(tx.filter((t) => /^\d+$/.test(t.t) && t["text-anchor"] === "end").map((t) => ({ v: +t.t, y: +t.y })), vach, "thang độ cao");
  const coc = tags(svg, "polygon").filter((p) => p.fill === "ink").map((p) => Math.min(...pts(p.points).map((q) => q[1])));
  assert.ok(coc.length >= 3 && coc.every((y) => close(y, coc[0])), "các cọc cao bằng nhau");
  const nuoc = {};
  tags(svg, "line").filter((l) => l.stroke === "acc" && l["stroke-dasharray"] && ngang(l)).forEach((l) => {
    const t = tx.filter((x) => x.fill === "acc" && close(+x.y, num(l, "y1") - 6));
    assert.equal(t.length, 1, "mỗi mực nước một tên ngay trên đường"); nuoc[t[0].t] = Math.round(doCao(num(l, "y1")) * 1000) / 1000;
  });
  assert.deepEqual(Object.keys(nuoc).sort(), ["Triều cao nhất", "Triều thấp nhất"]);
  const dau = Math.round(doCao(coc[0]) * 1000) / 1000;
  assert.ok(Math.abs(dau * 2 - Math.round(dau * 2)) < 1e-9 && Object.values(nuoc).every((h) => Math.abs(h * 2 - Math.round(h * 2)) < 1e-9), "đầu cọc, mực nước nằm đúng vạch 0,5 m");
  return { dau, cao: nuoc["Triều cao nhất"], thap: nuoc["Triều thấp nhất"] };
};

/* Lược đồ mật độ dân số: mỗi vùng là đa giác tô một màu, chú giải là ô màu (x = 10) kèm chữ cùng hàng; tên vùng ghi bên trong vùng
   (chữ giữa ô nền sáng). Trả về các vùng theo mật độ tăng dần: [{ ten, lop }]. */
const docMatDo = (svg) => {
  daDoc.add(svg);
  const tx = texts(svg), chuGiai = tags(svg, "rect").filter((r) => num(r, "x") === 10).map((r) => {
    const t = tx.filter((x) => close(+x.y, num(r, "y") + 12) && +x.x > 30); assert.equal(t.length, 1, "ô chú giải nào cũng có chữ"); return { fill: r.fill, t: t[0].t };
  });
  const bac = (s) => { let m; if ((m = /^Dưới (\d+) người\/km²$/.exec(s))) return [0, +m[1]]; if ((m = /^Từ (\d+) đến (\d+) người\/km²$/.exec(s))) return [+m[1], +m[2]]; if ((m = /^Trên (\d+) người\/km²$/.exec(s))) return [+m[1], Infinity]; throw new Error("chú giải lạ: " + s); };
  const lop = chuGiai.map((c) => Object.assign(c, { k: bac(c.t) })).sort((a, b) => a.k[0] - b.k[0]);
  lop.forEach((c, i) => i && assert.equal(c.k[0], lop[i - 1].k[1], "các bậc chú giải nối tiếp nhau"));
  const vung = tags(svg, "polygon").map((p) => {
    const c = lop.find((x) => x.fill === p.fill); assert.ok(c, "vùng tô màu có trong chú giải"); const poly = pts(p.points);
    const ten = tx.filter((t) => t["text-anchor"] === "middle" && trongDaGiac([+t.x, +t.y - 5], poly)); assert.equal(ten.length, 1, "mỗi vùng một tên");
    return { ten: ten[0].t, lop: c.t, hang: lop.indexOf(c) };
  });
  assert.equal(new Set(vung.map((v) => v.hang)).size, vung.length, "mỗi vùng một bậc mật độ");
  return vung.sort((a, b) => a.hang - b.hang);
};

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans[0], ans hoặc o[0]); more(q): kiểm tra thêm. */
const hieu = (q, unit) => { const y = nam(q.q); assert.equal(y.length, 2, "đề ghi đúng hai năm: " + q.q); assert.equal(q.unit, unit); assert.ok(q.x.includes(`${y[1]} − ${y[0]} = ${y[1] - y[0]}`), "lời giải ghi phép trừ"); return y[1] - y[0]; };
const CHECKS = [
  // Lịch sử và Địa lí: Đề 1
  { id: L.de1, has: "Hai cuộc khởi nghĩa cách nhau bao nhiêu năm?", right: (q) => hieu(q, "năm") },
  { id: L.de1, has: "người Việt giành lại quyền tự chủ từ tay chính quyền đô hộ", right: (q) => hieu(q, "năm") },
  { id: L.de1, has: "Số liệu khí hậu của bốn địa điểm", right: (q) => {
    const d = [...q.q.matchAll(/([A-D]): (?:nhiệt độ trung bình năm )?(\d+) °C, (?:lượng mưa năm )?([\d ]+) mm(?:, ([^;.]+))?/g)].map((m) => ({ ten: m[1], t: +m[2], r: val(m[3]), mua: m[4] || "" }));
    assert.deepEqual(d.map((x) => x.ten), ["A", "B", "C", "D"], "đọc được số liệu của bốn địa điểm");
    const hop = d.filter((x) => x.t > 21 && x.r > 1700 && x.mua === "mưa nhiều quanh năm"); // rừng nhiệt đới: trên 21 °C, trên 1 700 mm; rừng mưa: mưa nhiều quanh năm
    assert.equal(hop.length, 1, "đúng một địa điểm hợp với rừng mưa nhiệt đới");
    assert.ok(d.filter((x) => x !== hop[0]).every((x) => x.t <= 21 || x.r <= 1700 || x.mua !== "mưa nhiều quanh năm"));
    assert.ok(q.x.includes("trên 21 °C") && q.x.includes("trên 1 700 mm"), "lời giải nêu điều kiện của sách");
    return "Địa điểm " + hop[0].ten; } },
  { id: L.de1, has: "Đới số 3 có đặc điểm nào", right: (q) => {
    const doi = docDoi(q.svg);
    assert.deepEqual(Object.values(doi), ["lạnh", "ôn hoà", "nóng", "ôn hoà", "lạnh"], "năm đới từ Bắc xuống Nam");
    assert.ok(Object.values(DAC_DIEM).every((s) => q.o.includes(s)), "ba lựa chọn là đặc điểm của ba đới");
    assert.ok(q.x.includes("Đới số 2, 4 là hai đới ôn hoà; đới số 1, 5 là hai đới lạnh"), "lời giải ghi đúng các đới còn lại");
    return DAC_DIEM[doi["3"]]; } },
  { id: L.de1, has: "số dân của quốc gia X qua một số năm", right: (q) => {
    const c = docCot(q.svg), tang = c.slice(1).map((v, i) => v.v - c[i].v);
    assert.ok(tang.every((d) => d > 0), "số dân tăng liên tục");
    const lon = Math.max(...tang), i = tang.indexOf(lon); assert.equal(tang.lastIndexOf(lon), i, "một giai đoạn tăng nhiều nhất");
    assert.ok(!tang.every((d) => d === 5), "không phải mỗi giai đoạn tăng đúng 5 triệu");
    const gd = (k) => `giai đoạn ${c[k].nam} – ${c[k + 1].nam}`;
    assert.ok(q.o.includes(`Số dân tăng liên tục; ${gd(tang.length - 1)} tăng nhiều nhất`) && tang.length - 1 !== i, "lựa chọn sai: giai đoạn cuối");
    assert.ok(q.x.includes(tang.join(", ")) && q.x.includes(`${c[i + 1].v} − ${c[i].v} = ${lon} triệu người`), "lời giải ghi đúng số tăng");
    return `Số dân tăng liên tục; ${gd(i)} tăng nhiều nhất`; } },
  { id: L.de1, has: "Một xã có 18 000 người sinh sống trên diện tích 45 km²", right: (q) => {
    const [, d, s] = /có ([\d ]+) người sinh sống trên diện tích ([\d ]+) km²/.exec(q.q), v = val(d) / val(s);
    assert.ok(Number.isInteger(v) && q.unit === "người/km²" && q.x.includes(`${vn(val(d))} : ${vn(val(s))} = ${vn(v)}`)); return v; } },
  // Lịch sử và Địa lí: Đề 2
  { id: L.de2, has: "Đầu năm 544, Lý Bí tự xưng là Lý Nam Đế", right: (q) => hieu(q, "năm") },
  { id: L.de2, has: "Hình dưới mô phỏng mặt cắt một hàng cọc", right: (q) => {
    const h = docCoc(q.svg);
    assert.ok(h.cao > h.dau && h.dau > h.thap, "đầu cọc chìm lúc triều cao, nhô lên lúc triều thấp");
    assert.ok(h.cao - h.thap >= 2 && h.cao - h.thap <= 3, "mực nước chênh 2 – 3 m như sách nói về cửa sông Bạch Đằng");
    assert.ok(q.unit === "m" && q.x.includes(`${vn(h.dau)} − ${vn(h.thap)} = ${vn(h.dau - h.thap)}`) && q.x.includes(`${vn(h.cao)} − ${vn(h.dau)} = ${vn(h.cao - h.dau)}`));
    return h.dau - h.thap; } },
  { id: L.de2, has: "Vương quốc Chăm-pa ra đời năm", right: (q) => {
    const m = /năm (\d+) \(năm cuối cùng của thế kỉ ([IVX]+)\)/.exec(q.q); // năm cuối của thế kỉ: thế kỉ của năm đó khác thế kỉ của năm sau
    assert.ok(m && theKi(+m[1]) === m[2] && theKi(+m[1] + 1) !== m[2], "năm ghi là năm cuối cùng của thế kỉ");
    return hieu(q, "năm"); } },
  { id: L.de2, has: "lược đồ mật độ dân số của đảo Y", right: (q) => {
    const v = docMatDo(q.svg), it = v[0], nhieu = v[v.length - 1];
    const xs = q.x.toLowerCase(); // “Đồng bằng ven biển có mật độ trên 200 người/km², đồi và cao nguyên từ 10 đến 200 người/km², …”
    v.forEach((x) => { const t = x.ten.toLowerCase().replace(", ", " và "), l = x.lop.toLowerCase(); assert.ok(xs.includes(`${t} có mật độ ${l}`) || xs.includes(`${t} ${l}`), "lời giải ghi đúng bậc mật độ của " + x.ten); });
    assert.ok(q.o.includes(`Vùng ${it.ten.toLowerCase()} có mật độ dân số cao nhất đảo, ${nhieu.ten.toLowerCase()} thấp nhất`), "lựa chọn sai: đảo ngược hai vùng");
    return `Dân cư phân bố không đều: đông nhất ở ${nhieu.ten.toLowerCase()}, thưa nhất ở vùng ${it.ten.toLowerCase()}`; } },
  { id: L.de2, has: "Mật độ dân số của vùng M gấp bao nhiêu lần", right: (q) => {
    const v = [...q.q.matchAll(/Vùng ([MN]) có diện tích ([\d ]+) km², số dân ([\d ]+) người/g)].map((m) => ({ s: val(m[2]), d: val(m[3]) }));
    assert.equal(v.length, 2); const [m, n] = v.map((x) => x.d / x.s); assert.ok(Number.isInteger(m) && Number.isInteger(n) && Number.isInteger(m / n));
    assert.ok(q.unit === "lần" && q.x.includes(`${vn(m)} : ${vn(n)} = ${m / n}`)); return m / n; } },
  // GDCD: số liệu của sách, không phải phép tính
  { id: G.de1, has: "trẻ em là người dưới ___ tuổi", right: () => "16" }, // Luật Trẻ em năm 2016; Một số thuật ngữ dùng trong sách GDCD 6 (tr. 59)
  { id: G.de2, has: "thông qua vào năm ___", right: () => "1989" } // ngày 20/11/1989 (GDCD 6, tr. 50)
];

const KHO = {}; // mã pool → câu trong kho (câu của hai đề, mỗi câu ghi src)
[L, G].forEach((s) => {
  const p = bank(s.pool), d1 = bank(s.de1), d2 = bank(s.de2);
  assert.ok(p && d1 && d2, "thiếu đề của " + s.pool);
  assert.deepEqual(p.pool.from, [s.de1, s.de2], s.pool + ": from là Đề 1 và Đề 2");
  assert.ok(d1.minutes === d2.minutes && d2.minutes === p.minutes, s.pool + ": cùng số phút");
  assert.equal(d1.questions.length, 25); assert.equal(d2.questions.length, 25);
  KHO[s.pool] = p.questions;
  assert.equal(p.questions.length, 50, s.pool + ": 50 câu, không có câu riêng");
});
const kho = Object.values(KHO).flat();
let n = 0;
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const want = c.right(q), got = q.type === "fill" ? q.ans[0] : q.type === "num" ? q.ans : q.o[0];
  assert.ok(typeof want === "number" ? typeof got === "number" && close(got, want) : got === want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
  if (c.more) c.more(q);
  checked.add(q); n++;
});
// thế kỉ ghi trong ý đúng/sai (“… (năm 248) nổ ra vào thế kỉ III.”): tính lại từ năm
kho.filter((q) => q.type === "tf4").forEach((q) => q.o.forEach((o, i) => {
  const m = /\(năm (\d+)\).*thế kỉ ([IVX]+)\b/.exec(o); if (!m) return;
  assert.equal(q.a[i], theKi(+m[1]) === m[2], `“${o}”: năm ${m[1]} thuộc thế kỉ ${theKi(+m[1])}`); n++;
  assert.ok(q.x.includes(`năm ${m[1]} thuộc thế kỉ ${theKi(+m[1])} (từ năm ${(Math.floor((+m[1] - 1) / 100)) * 100 + 1} đến năm ${(Math.floor((+m[1] - 1) / 100) + 1) * 100})`), "lời giải nêu cách xác định thế kỉ");
}));
// câu trả lời bằng số, câu điền có đáp án là số và câu có hình nào cũng phải được tính lại ở trên
kho.filter((q) => q.type === "num" || q.svg || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));
assert.ok(KHO[L.pool].filter((q) => q.svg).length >= 4, "Lịch sử và Địa lí: vài câu có hình (lược đồ, biểu đồ dân số, sơ đồ các đới)");

/* ---------- mức độ và ma trận ---------- */
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
[L, G].forEach((s) => {
  const p = bank(s.pool), M = p.pool.matrix, cells = Object.values(M), K = KHO[s.pool], d1 = bank(s.de1).questions, d2 = bank(s.de2).questions;
  assert.ok(K.every((q) => [1, 2, 3].includes(q.lv)), s.pool + ": câu nào trong kho cũng cần lv");
  assert.ok(cells.every(Array.isArray), s.pool + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], s.pool + ": ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
  [d1, d2].forEach((d, i) => {
    assert.deepEqual([...new Set(d.map((q) => q.topic))], Object.keys(M), `${s.pool}: Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} của ${s.pool} đúng ma trận ở chủ đề ${t}`));
  });
  const tf4 = K.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 3 && !K.some((q) => q.type === "essay"), s.pool + ": ít nhất 3 câu đúng/sai 4 ý, không có câu tự luận");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
  assert.ok(Math.max(...Object.values(kieu)) <= Math.ceil(tf4.length / 3), s.pool + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp nhiều quá: " + JSON.stringify(kieu));
  // đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2)
  K.filter((q) => q.type === "mc").forEach((q) => { const m = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60)); });
  const seen = new Set();
  for (let k = 0; k < 300; k++) {
    const d = Quiz.draw(p);
    assert.equal(d.notes.length, 0, s.pool + ": rút thử có ghi chú: " + d.notes.join("; "));
    assert.equal(d.questions.length, 25);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `${s.pool}: rút đúng ma trận ở chủ đề ${t}`));
    d.questions.forEach((q) => seen.add(Quiz.key(q)));
  }
  assert.equal(seen.size, 50, s.pool + ": 300 lần rút thử phải gặp đủ 50 câu của kho");
  // học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên rút đúng 25 câu của đề kia
  [[s.de1, s.de2], [s.de2, s.de1]].forEach(([lam, con]) => {
    const hist = (q) => (q.src === lam ? { done: 1, wrong: 0 } : null); // lịch sử câu như PoolHist
    for (let k = 0; k < 30; k++) {
      const d = Quiz.draw(p, hist);
      assert.equal(d.notes.length, 0); assert.equal(d.questions.length, 25);
      assert.ok(d.questions.every((q) => q.src === con), `${s.pool}: đã làm hết ${lam} thì rút toàn câu của ${con}`);
    }
  });
});

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
["6-lsdl.js", "6-gdcd.js"].forEach((f) => {
  const deBai = BANKS.filter((b) => b.file === f).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.filter((d) => /-ck2-/.test(d.at)).forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
});

/* ---------- dò lộ đáp án (Rút ra N5; bộ dò theo tests/khtn6-ck2.js) giữa hai câu rút được cùng lúc: khác ô (chủ đề, mức), hoặc
   cùng một ô rút từ 2 câu. Đáp án là số (từ hai chữ số, hoặc số thập phân) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”,
   “bằng”, “được”); cặp nối: câu kia có cả hai vế. Đáp án bằng chữ (lựa chọn đúng của câu trắc nghiệm, đáp án câu điền) có ở câu kia
   thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
// t có cụm s đứng thành từ riêng (“Na” không khớp “Nam”)
const coCum = (t, s) => { for (let i = t.indexOf(s); i >= 0; i = t.indexOf(s, i + 1)) if (!/[\p{L}\p{N}]/u.test(t[i - 1] || " ") && !/[\p{L}\p{N}]/u.test(t[i + s.length] || " ")) return true; return false; };
const doLo = (qs, M, tenCau) => {
  const cungLuc = (p, q) => p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
  const lo = [], chuLo = [];
  qs.forEach((q, i) => {
    const so = (q.type === "num" && (q.ans >= 10 || !Number.isInteger(q.ans))) || (q.type === "fill" && /^\d{2,}$/.test(q.ans[0])) ? [val(q.type === "num" ? q.ans : q.ans[0])] : [];
    const cum = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    qs.forEach((p, j) => {
      if (j === i || !cungLuc(p, q)) return;
      const C = chu(p), T = C.map((s) => s.toLowerCase()), at = `${tenCau(p)} → ${tenCau(q)}: `;
      so.filter((x) => C.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l.toLowerCase()) && coCum(t, r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      cum.filter((s) => T.some((t) => coCum(t, s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const ten = new Map();
[L, G].forEach((s) => [s.de1, s.de2].forEach((id) => KHO[s.pool].filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace(/6-ck2-/, "-") + "#" + (i + 1)))));
const loAll = [], chuAll = [];
[L, G].forEach((s) => { const r = doLo(KHO[s.pool], bank(s.pool).pool.matrix, (q) => ten.get(q)); loAll.push(...r.lo); chuAll.push(...r.chuLo); });
// câu 13 của gdcd6-ck1-de1 với các câu rút được cùng lúc trong kho cuối kì I
const ck1 = bank("gdcd6-ck1-ngau-nhien"), c13 = bank("gdcd6-ck1-de1").questions[12];
assert.ok(c13.topic === "Siêng năng, kiên trì" && c13.type === "mc" && c13.lv === 2 && c13.q.includes("chép lời giải trên mạng"), "câu 13 của gdcd6-ck1-de1 giữ chủ đề, mức, dạng câu");
assert.ok(c13.o.every((o) => !/^(kiên trì|siêng năng)$/i.test(o.trim())) && !/kiên trì|siêng năng/i.test(c13.o.join(" ") + c13.q + c13.x), "câu 13: lựa chọn, đề bài, lời giải không nhắc chữ của nhãn chủ đề");
const k13 = ck1.questions.find((q) => q.src === "gdcd6-ck1-de1" && q.q === c13.q);
{ const r = doLo(ck1.questions, ck1.pool.matrix, (q) => (q === k13 ? "ck1-de1#13" : q.src.replace("gdcd6-", "") + "#" + (bank(q.src).questions.findIndex((x) => x.q === q.q) + 1)));
  r.lo.filter((s) => s.includes("ck1-de1#13")).forEach((s) => loAll.push(s)); r.chuLo.filter((s) => s.includes("ck1-de1#13")).forEach((s) => chuAll.push(s)); }
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuAll.join("\n"));
// đã xem (Phiên N22): …
const DA_XEM = [];
assert.deepEqual(chuAll, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 33 (năm)”, “là 400 người/km²”, cả hai vế một cặp nối, lựa chọn đúng
const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
const thu = (qs) => { const M = new Proxy({}, { get: () => [1, 1, 1] }), r = doLo(qs, M, (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
const khac = tim("Phát triển bền vững là");
assert.deepEqual(thu([tim("Năm 905, người Việt giành lại"), gia(khac, "Ví dụ: 938 − 905 = 33 (năm).")]), ["33"]);
assert.deepEqual(thu([tim("Một xã có 18 000 người"), gia(khac, "Mật độ là 400 người/km².")]), ["400"]);
assert.deepEqual(thu([tim("Nối mỗi cuộc khởi nghĩa"), gia(khac, "Khởi nghĩa Bà Triệu chống nhà Ngô.")]), ["Khởi nghĩa Bà Triệu → Nhà Ngô"]);
assert.deepEqual(thu([tim("Tên gọi ban đầu của nước đó"), gia(khac, "Nước Lâm Ấp ra đời năm 192.")]), ["Lâm Ấp"]);
console.log(n, "câu, ý đã tính lại hoặc đọc lại hình (hai ngân hàng); kho " + kho.length + " câu, 2 ma trận 10 – 8 – 7.");
console.log("MATH OK");
