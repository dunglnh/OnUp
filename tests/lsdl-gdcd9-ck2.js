// Tính lại đáp án và kiểm tra ma trận hai ngân hàng lớp 9 cuối năm của Phiên N9-ck2-lsdl-gdcd: Lịch sử và Địa lí (data/banks/9-lsdl.js)
// và GDCD (9-gdcd.js), theo mẫu tests/lsdl-gdcd9-ck1.js, tests/lsdl-gdcd9-gk2.js. Mỗi ngân hàng = các đề cố định trong from của đề ngẫu
// nhiên (cùng chia theo ma trận) + đề ngẫu nhiên không có câu riêng; số câu, số đề lấy từ danh mục. Câu có phép tính, có hình, câu sắp
// xếp được nhận ra bằng một đoạn chữ của đề (has, đúng một câu trong hai kho, đúng đề ghi ở id); so đáp án với kết quả tính bằng code:
// trả lời bằng số ans, trắc nghiệm o[0], đúng/sai 4 ý a, sắp xếp o. Lịch sử và Địa lí: số năm (đọc hai năm trong đề), trình tự các sự
// kiện (ý “A trước khi B” của câu đúng/sai 4 ý, câu sắp xếp; bảng ngày tháng theo sách, Bài 19–20), khoảng cách theo hải lí đổi ra
// ki-lô-mét; bốn hình đọc lại bằng code: sơ đồ vị trí tiếp giáp của vùng Đồng bằng sông Cửu Long (hướng của từng ô so với ô giữa, mũi
// tên chỉ hướng bắc; nơi tiếp giáp theo sách), sơ đồ các vùng biển (vạch đường cơ sở, 12, 24, 200 hải lí; mỗi vùng là một mũi tên hai
// đầu giữa hai vạch, tên vùng theo Luật Biển Việt Nam năm 2012), biểu đồ cột và biểu đồ cột ghép (trục số bên trái, số ở đỉnh cột, năm
// dưới cột, chú giải); các nhận xét của câu đọc biểu đồ được xét lại bằng số đọc từ hình. GDCD: câu so giá theo khối lượng của Bài 8,
// câu thuế giá trị gia tăng của Bài 10. Câu trả lời bằng số, câu điền có đáp án là số, câu có hình, câu sắp xếp nào trong hai kho cũng
// phải có kiểm tra ở đây.
// Rồi kiểm tra mức độ và ma trận: mọi câu có lv; ma trận 40% Biết, 32% Hiểu, 28% Vận dụng (10 – 8 – 7 với đề 25 câu), chủ đề theo thứ
// tự bài như các đề; đề nào cũng chia đúng theo ma trận, nên ô nào cũng có số câu gấp số đề lần số câu ô đó rút; số câu Lịch sử, Địa lí
// của mỗi đề ghi đúng ở note; mỗi kho có ít nhất 4 câu đúng/sai 4 ý (kiểu Đ/S không lặp quá một phần ba), không có câu tự luận; đáp án
// đúng không dài hơn hẳn các lựa chọn sai (Rút ra N22), là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa
// chọn (Rút ra N9-ck1-tin-congnghe); đáp án không lặp chữ của nhãn chủ đề (trừ khi mọi lựa chọn cùng có chữ đó); GDCD: câu tình huống
// (có nhân vật, việc làm cụ thể) từ một nửa kho; câu của chủ đề có cả ở kho giữa kì II (câu ôn) không trùng đề bài, đáp án câu nào của
// kho đó; mọi câu không gần trùng câu nào của các kho cũ cùng môn, cả kho giữa kì II (cặp hai âm tiết chung, như tests/tin-congnghe9-gk2.js);
// rút thử nhiều lần ra đúng ma trận, không ghi chú, gặp đủ câu của kho; học sinh đã làm hết một đề cố định thì đề ngẫu nhiên không rút lại
// câu của đề đó. Cuối cùng: đề bài không trùng câu nào khác trong file; dò lộ đáp án giữa các câu rút được cùng lúc (bộ dò của
// tests/lsdl-gdcd9-gk2.js, cả cặp nối và ngày tháng của câu về thứ tự thời gian; tự thử với câu cố ý lộ; DO_LO=1 in đáp án bằng chữ có ở
// câu kia, danh sách đã xem ở DA_XEM); có OnUp-Book thì so mọi trường chữ với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm, tên riêng
// nhiều chữ tính là một từ, bỏ qua tên văn bản luật, hiệp định ghi đúng như sách; không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và
// với câu của mọi kho khác (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ).
// Chạy: node tests/lsdl-gdcd9-ck2.js → in MATH OK.
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
// cu: đề ngẫu nhiên của kho giữa kì II cùng môn (câu ôn của kho cuối năm không trùng câu của kho đó)
const L = { pool: "lsdl9-ck2-ngau-nhien", cu: "lsdl9-gk2-ngau-nhien" }, G = { pool: "gdcd9-ck2-ngau-nhien", cu: "gdcd9-gk2-ngau-nhien" };
[L, G].forEach((s) => {
  const p = bank(s.pool); assert.ok(p && p.pool, "thiếu đề ngẫu nhiên " + s.pool);
  s.from = p.pool.from; s.de1 = s.from[0]; s.de2 = s.from[1]; s.file = p.file;
  assert.ok(s.from.length >= 2 && s.from.every((id) => bank(id) && bank(id).file === p.file), s.pool + ": from là các đề cố định cùng file");
  assert.ok(bank(s.cu) && bank(s.cu).file === p.file, s.pool + ": kho giữa kì II cùng file");
});

/* ---------- số ---------- */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(",", "."); // “2 400 000” → 2400000, “2,5” → 2.5
const vn = (x) => { const [n, d] = String(x).split("."); return n.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : ""); }; // 2400000 → “2 400 000”
const nam = (s) => [...s.matchAll(/năm (\d{1,4})(?!\d| \d)/gi)].map((m) => +m[1]); // các năm ghi trong đề, theo thứ tự
const lech = (a, b) => Math.abs(((((a - b) % 360) + 540) % 360) - 180); // độ lệch giữa hai góc (độ)

/* ---------- hình (bộ đọc của tests/lsdl-gdcd9-ck1.js, tests/lsdl-gdcd9-gk2.js) ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ngang = (l) => num(l, "y1") === num(l, "y2");
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
// chú giải: ô màu nhỏ, chữ cùng hàng ngay bên phải (chân chữ thấp hơn mép trên ô 13 đơn vị)
const chuGiaiCua = (svg, o) => o.map((r) => {
  const t = texts(svg).filter((x) => close(+x.y, num(r, "y") + 13) && +x.x > num(r, "x") + num(r, "width") && +x.x < num(r, "x") + num(r, "width") + 12);
  assert.equal(t.length, 1, "ô chú giải nào cũng có chữ"); return { fill: r.fill, ten: t[0].t };
});

/* Biểu đồ cột: đường lưới nằm ngang (nét màu line), số ở đầu trái mỗi đường lưới (text-anchor="end") là giá trị; cột là hình chữ nhật
   đứng trên đường đáy, số ghi ở đỉnh cột (giữa cột, cao hơn đỉnh 6 đơn vị), năm ghi dưới đáy. Một dãy: trả về [{ nam, v }]; cột ghép
   (có chú giải dưới đáy, màu cột theo chú giải): trả về { năm: { dãy: v } }. */
const docCot = (svg, donVi) => {
  daDoc.add(svg);
  const lu = tags(svg, "line").filter((l) => l.stroke === "line");
  assert.ok(lu.length >= 4 && lu.every(ngang), "đường lưới nằm ngang");
  const x0 = Math.min(...lu.map((l) => num(l, "x1"))), ys = lu.map((l) => num(l, "y1")), day = Math.max(...ys), tx = texts(svg);
  const giaTri = trucSo(tx.filter((t) => /^\d[\d ]*$/.test(t.t) && t["text-anchor"] === "end" && +t.x < x0).map((t) => ({ v: val(t.t), y: +t.y })), ys, "trục số");
  assert.equal(Math.round(giaTri(day)), 0, "số 0 ở đường đáy");
  assert.ok(tx.some((t) => t.t === donVi && !t["text-anchor"] && +t.y < Math.min(...ys)), "trục ghi đơn vị " + donVi);
  const hcn = tags(svg, "rect"), chuGiai = chuGiaiCua(svg, hcn.filter((r) => num(r, "y") > day));
  const namDuoi = tx.filter((t) => t["text-anchor"] === "middle" && +t.y > day && /^\d{4}$/.test(t.t));
  const cot = hcn.filter((r) => num(r, "y") <= day).map((r) => {
    assert.ok(close(num(r, "y") + num(r, "height"), day), "cột đứng trên đường đáy");
    const cx = num(r, "x") + num(r, "width") / 2, v = Math.round(giaTri(num(r, "y")) * 1000) / 1000;
    const dinh = tx.filter((t) => t["text-anchor"] === "middle" && close(+t.x, cx) && +t.y < day);
    assert.equal(dinh.length, 1, "mỗi cột một số ở đỉnh"); assert.ok(close(+dinh[0].y, num(r, "y") - 6), "số ghi ngay trên đỉnh cột");
    assert.equal(val(dinh[0].t), v, `số ở đỉnh cột (${dinh[0].t}) khớp chiều cao cột (${v})`);
    const n = [...namDuoi].sort((a, b) => Math.abs(+a.x - cx) - Math.abs(+b.x - cx))[0];
    assert.ok(n && Math.abs(+n.x - cx) < 30, "cột nào cũng có năm ở dưới");
    const d = chuGiai.find((c) => c.fill === r.fill);
    if (chuGiai.length) assert.ok(d, "màu cột có trong chú giải");
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

/* Sơ đồ vị trí tiếp giáp: các ô chữ nhật có chữ ở trong; ô giữa ghi tên vùng (“Vùng …”), mỗi ô khác ở một trong tám hướng so với ô
   giữa (lệch không quá 15°); mũi tên chỉ hướng bắc: đoạn thẳng đứng, đầu mũi tên ở trên, chữ B trên đầu mũi tên. Trả về { vung, huong }. */
const docViTri = (svg) => {
  daDoc.add(svg);
  const tx = texts(svg), o = tags(svg, "rect").map((r) => {
    const x = num(r, "x"), y = num(r, "y"), w = num(r, "width"), h = num(r, "height");
    const chu = tx.filter((t) => +t.x > x && +t.x < x + w && +t.y > y && +t.y < y + h).sort((a, b) => +a.y - +b.y).map((t) => t.t).join(" ");
    assert.ok(chu, "ô nào cũng có chữ"); return { chu, x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
  });
  o.forEach((a, i) => o.slice(i + 1).forEach((b) => assert.ok(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y, `ô “${a.chu}” đè lên ô “${b.chu}”`)));
  const giua = o.filter((v) => /^Vùng /.test(v.chu)); assert.equal(giua.length, 1, "một ô giữa ghi tên vùng");
  const ln = tags(svg, "line"), tg = tags(svg, "polygon"), B = tx.filter((t) => t.t === "B");
  assert.ok(ln.length === 1 && num(ln[0], "x1") === num(ln[0], "x2") && tg.length === 1 && B.length === 1, "một mũi tên chỉ hướng bắc");
  const dinh = pts(tg[0].points).reduce((a, p) => (p[1] < a[1] ? p : a));
  assert.ok(dinh[1] < Math.min(num(ln[0], "y1"), num(ln[0], "y2")) && close(dinh[0], num(ln[0], "x1")) && +B[0].y < dinh[1], "mũi tên chỉ lên trên là hướng bắc");
  const HUONG = ["đông", "đông bắc", "bắc", "tây bắc", "tây", "tây nam", "nam", "đông nam"], huong = {};
  o.filter((v) => v !== giua[0]).forEach((v) => {
    const g = (Math.atan2(giua[0].cy - v.cy, v.cx - giua[0].cx) * 180) / Math.PI, k = (((Math.round(g / 45) % 8) + 8) % 8);
    assert.ok(lech(g, k * 45) <= 15, `ô “${v.chu}” lệch hướng quá 15°`);
    assert.equal(huong[HUONG[k]], undefined, "mỗi hướng một ô"); huong[HUONG[k]] = v.chu;
  });
  return { vung: giua[0].chu, huong };
};
// nơi tiếp giáp của vùng theo hướng (sách tr. 205: giáp vùng Đông Nam Bộ, nước láng giềng Cam-pu-chia; phía tây và phía đông nam có
// vùng biển rộng; hướng theo bản đồ tự nhiên của vùng, Hình 19.1)
const TIEP_GIAP = {
  "Vùng Đồng bằng sông Cửu Long": { "bắc": "Cam-pu-chia", "đông bắc": "Đông Nam Bộ", "tây": "Vịnh Thái Lan", "đông nam": "Biển Đông" }
};
const viTriDung = (q) => {
  const { vung, huong } = docViTri(q.svg), T = TIEP_GIAP[vung]; assert.ok(T, "có bảng nơi tiếp giáp của " + vung);
  const o = {};
  Object.entries(huong).forEach(([h, chu]) => { assert.ok(T[h], `phía ${h} của ${vung} không có trong bảng`); if (/^\(\d\)$/.test(chu)) o[chu] = T[h]; else assert.equal(chu, T[h], `ô phía ${h}`); });
  assert.deepEqual(Object.keys(huong).sort(), Object.keys(T).sort(), vung + ": sơ đồ đủ các nơi tiếp giáp trong bảng");
  return { T, o };
};

/* Sơ đồ các vùng biển (không theo tỉ lệ): dải biển là hình chữ nhật màu acc-soft, đất liền là hình chữ nhật màu sun-soft ở bên trái;
   các vạch đứng nét đứt, số (hải lí, tính từ đường cơ sở) hay chữ “Đường cơ sở” ghi ngay dưới dải biển, giữa vạch; mỗi vùng là một
   mũi tên hai đầu nằm ngang (đầu mũi tên là tam giác ở hai đầu), số “(k)” ghi giữa mũi tên, cao hơn mũi tên 7 đơn vị. Đầu mũi tên nằm
   ở mép đất liền hoặc ở một vạch. Tên vùng theo Luật Biển Việt Nam năm 2012: nội thuỷ ở phía trong đường cơ sở; lãnh hải rộng 12 hải
   lí tính từ đường cơ sở; vùng tiếp giáp lãnh hải rộng 12 hải lí phía ngoài lãnh hải; vùng đặc quyền kinh tế từ ranh giới ngoài của
   lãnh hải đến 200 hải lí tính từ đường cơ sở. Trả về { “(k)”: tên vùng }. */
const VUNG_BIEN = { "bờ-0": "Nội thuỷ", "0-12": "Lãnh hải", "12-24": "Vùng tiếp giáp lãnh hải", "12-200": "Vùng đặc quyền kinh tế" };
const docVungBien = (svg) => {
  daDoc.add(svg);
  const tx = texts(svg), hcn = tags(svg, "rect");
  const bien = hcn.filter((r) => r.fill === "acc-soft"), dat = hcn.filter((r) => r.fill === "sun-soft");
  assert.ok(bien.length === 1 && dat.length === 1, "một dải biển, một khối đất liền");
  const bo = num(dat[0], "x") + num(dat[0], "width"), day = num(bien[0], "y") + num(bien[0], "height");
  assert.ok(close(num(bien[0], "x"), bo), "dải biển bắt đầu ở mép đất liền");
  const vach = tags(svg, "line").filter((l) => l["stroke-dasharray"]).map((l) => {
    assert.ok(num(l, "x1") === num(l, "x2"), "vạch đứng");
    const x = num(l, "x1"), nhan = tx.filter((t) => t["text-anchor"] === "middle" && close(+t.x, x) && +t.y > day).sort((a, b) => +a.y - +b.y).map((t) => t.t).join(" ");
    assert.ok(nhan === "Đường cơ sở" || /^\d+$/.test(nhan), "vạch nào cũng có nhãn: " + nhan);
    return { x, v: nhan === "Đường cơ sở" ? 0 : +nhan };
  }).sort((a, b) => a.x - b.x);
  assert.deepEqual(vach.map((v) => v.v), [0, 12, 24, 200], "các vạch: đường cơ sở, 12, 24, 200 hải lí, từ trái sang phải");
  assert.ok(vach[0].x > bo, "đường cơ sở nằm ngoài bờ biển");
  const dauMut = tags(svg, "polygon").map((p) => pts(p.points)), out = {};
  tags(svg, "line").filter((l) => !l["stroke-dasharray"]).forEach((l) => {
    assert.ok(ngang(l), "mũi tên nằm ngang");
    const y = num(l, "y1"), a = Math.min(num(l, "x1"), num(l, "x2")), b = Math.max(num(l, "x1"), num(l, "x2"));
    [a, b].forEach((x) => assert.ok(dauMut.some((p) => p.some(([px, py]) => close(px, x) && close(py, y))), "mũi tên có đầu ở cả hai phía"));
    const moc = (x) => { if (close(x, bo)) return "bờ"; const v = vach.find((w) => close(w.x, x)); assert.ok(v, "đầu mũi tên nằm ở mép đất liền hoặc ở một vạch"); return v.v; };
    const ten = VUNG_BIEN[moc(a) + "-" + moc(b)]; assert.ok(ten, `khoảng ${moc(a)}–${moc(b)} không phải một vùng biển`);
    const k = tx.filter((t) => /^\(\d\)$/.test(t.t) && close(+t.x, (a + b) / 2) && close(+t.y, y - 7));
    assert.equal(k.length, 1, "mỗi mũi tên một số vùng ở giữa"); assert.equal(out[k[0].t], undefined, "mỗi số vùng một mũi tên");
    out[k[0].t] = ten;
  });
  assert.deepEqual(Object.values(out).sort(), Object.values(VUNG_BIEN).sort(), "sơ đồ đủ bốn vùng");
  return out;
};

/* ---------- trình tự thời gian (bảng ngày tháng theo sách: Bài 19 tr. 99, Bài 20 tr. 101–105) ----------
   Mỗi sự kiện: [chữ nhận ra trong ý, ngày dạng YYYY-MM-DD, YYYY-MM hay YYYY để so, cách ghi ngày trong lời giải]. */
const SU_KIEN = [
  ["Hiệp thương chính trị", "1975-11", "11/1975"], ["bầu Quốc hội chung", "1976-04-25", "25/4/1976"], ["gia nhập Liên hợp quốc", "1977", "1977"],
  ["tổng phản công", "1978-12-23", "23/12/1978"], ["tấn công dọc biên giới phía Bắc", "1979-02-17", "17/2/1979"], ["Hiến pháp năm 1980", "1980-12", "12/1980"],
  ["Khu vực mậu dịch tự do ASEAN", "1992", "1992"], ["Lào và Mi-an-ma", "1997-07", "7/1997"], ["Hiến chương ASEAN", "2007", "2007"], ["RCEP", "2020", "2020"]
];
const suKien = (s) => { const m = SU_KIEN.filter(([k]) => s.toLowerCase().includes(k.toLowerCase())); assert.equal(m.length, 1, "không nhận ra đúng một sự kiện: " + s); return m[0]; };
const thuTu = (q) => {
  const sk = q.o.map(suKien); sk.forEach(([, , ghi]) => assert.ok(q.x.includes(ghi), "lời giải ghi ngày " + ghi));
  assert.equal(new Set(sk.map((s) => s[1])).size, sk.length, "các sự kiện khác ngày nhau");
  return [...q.o].sort((a, b) => (suKien(a)[1] < suKien(b)[1] ? -1 : 1));
};

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans, o[0], a hoặc o). */
const hieu = (q, unit) => { const y = nam(q.q); assert.equal(y.length, 2, "đề ghi đúng hai năm: " + q.q); assert.equal(q.unit, unit); assert.ok(q.x.includes(`${y[1]} − ${y[0]} = ${y[1] - y[0]}`), "lời giải ghi phép trừ"); return y[1] - y[0]; };
const so = (re, s) => { const m = re.exec(s); assert.ok(m, "không đọc được số liệu: " + re); return m.slice(1).map(val); };
const CHECKS = [
  // Lịch sử và Địa lí: Đề 1
  { id: L.de1, has: "Sắp xếp các mốc phát triển sau của ASEAN", right: thuTu },
  { id: L.de1, has: "Từ khi đề ra đường lối đổi mới đến khi gia nhập WTO", right: (q) => hieu(q, "năm") },
  { id: L.de1, has: "cho biết vị trí tiếp giáp của vùng Đồng bằng sông Cửu Long", right: (q) => {
    const { T, o } = viTriDung(q);
    assert.ok(q.x.includes(`giáp ${T["bắc"]} ở phía bắc, giáp vùng ${T["đông bắc"]} ở phía đông bắc`) && q.x.includes("phía tây và phía đông nam là vùng biển rộng"), "lời giải ghi đúng hướng");
    return Object.keys(o).sort().map((k) => `${k} ${k === "(2)" ? "vùng " : ""}${o[k]}`).join("; "); } },
  { id: L.de1, has: "Quan sát sơ đồ các vùng biển của nước ta", right: (q) => {
    const v = docVungBien(q.svg), thuong = (s) => s[0].toLowerCase() + s.slice(1);
    Object.entries(v).forEach(([k, ten]) => assert.ok(q.x.includes(`Vùng ${k}`) && q.x.toLowerCase().includes(ten.toLowerCase()), "lời giải nêu vùng " + k));
    assert.ok(q.x.includes("12 hải lí") && q.x.includes("200 hải lí"), "lời giải ghi số hải lí");
    return `${v["(2)"]}; ${thuong(v["(3)"])}`; } },
  { id: L.de1, has: "ranh giới ngoài của vùng đặc quyền kinh tế cách đường cơ sở bao nhiêu ki-lô-mét", right: (q) => {
    const [hl] = so(/rộng (\d+) hải lí tính từ đường cơ sở/, q.q), [m] = so(/1 hải lí = ([\d ]+) m/, q.q), v = (hl * m) / 1000;
    assert.ok(q.unit === "km" && q.x.includes(`${hl} hải lí = ${hl} × ${vn(m)} = ${vn(hl * m)} (m) = ${vn(v)} (km)`), "lời giải ghi phép đổi"); return v; } },
  // Lịch sử và Địa lí: Đề 2
  { id: L.de2, has: "theo dõi diện tích lúa bị ảnh hưởng do xâm nhập mặn", right: (q) => {
    const c = docCot(q.svg, "Nghìn ha"), v = (y) => { const x = c.find((z) => z.nam === +y); assert.ok(x, "biểu đồ có năm " + y); return x.v; };
    const LUAT = [
      [/^Năm (\d{4}), diện tích lúa bị ảnh hưởng gấp (\d+) lần năm (\d{4})\.$/, (m) => v(m[1]) === +m[2] * v(m[3])],
      [/^Diện tích lúa bị ảnh hưởng tăng liên tục từ năm (\d{4}) đến năm (\d{4})\.$/, (m) => { const d = c.filter((z) => z.nam >= +m[1] && z.nam <= +m[2]); return d.every((z, i) => !i || z.v > d[i - 1].v); }],
      [/^Năm (\d{4}) có diện tích lúa bị ảnh hưởng lớn nhất trong bốn năm\.$/, (m) => c.length === 4 && v(m[1]) === Math.max(...c.map((z) => z.v))],
      [/^Năm (\d{4}), diện tích lúa bị ảnh hưởng ít hơn năm (\d{4})\.$/, (m) => v(m[1]) < v(m[2])]
    ];
    const dung = q.o.filter((o) => { const l = LUAT.map(([re, f]) => [re.exec(o), f]).filter(([m]) => m); assert.equal(l.length, 1, "ý nào cũng có luật: " + o); return l[0][1](l[0][0]); });
    assert.equal(dung.length, 1, "đúng một nhận xét đúng: " + dung.join(" | "));
    const g = /^Năm (\d{4}), diện tích lúa bị ảnh hưởng gấp (\d+) lần năm (\d{4})\./.exec(dung[0]);
    if (g) assert.ok(q.x.includes(`${v(g[1])} : ${v(g[3])} = ${g[2]}`), "lời giải ghi phép chia");
    return dung[0]; } },
  { id: L.de2, has: "sản lượng thuỷ sản khai thác và nuôi trồng của tỉnh X", right: (q) => {
    const c = docCot(q.svg, "Nghìn tấn"), [y] = nam(q.q), d = c[y]; assert.ok(d, "biểu đồ có năm " + y);
    const kt = d["Khai thác"], nt = d["Nuôi trồng"], tong = kt + nt, v = (nt / tong) * 100;
    assert.ok(Number.isInteger(v) && q.unit === "%" && q.x.includes(`${kt} + ${nt} = ${tong}`) && q.x.includes(`${nt} : ${tong} × 100 = ${v}`), "lời giải ghi phép tính");
    const n = Object.keys(c).sort(); assert.ok(n.every((z, i) => !i || (c[z]["Nuôi trồng"] > c[n[i - 1]]["Nuôi trồng"] && c[z]["Khai thác"] < c[n[i - 1]]["Khai thác"])), "nuôi trồng tăng, khai thác giảm như lời giải");
    return v; } },
  // GDCD
  { id: G.de1, has: "Giả sử thuế suất thuế giá trị gia tăng", right: (q) => {
    const [g] = so(/giá chưa tính thuế giá trị gia tăng là ([\d ]+) đồng/, q.q), [r] = so(/của mặt hàng này là (\d+)%/, q.q), t = (g * r) / 100, v = g + t;
    assert.ok(q.unit === "đồng" && q.x.includes(`${vn(g)} × ${r} : 100 = ${vn(t)}`) && q.x.includes(`${vn(g)} + ${vn(t)} = ${vn(v)}`), "lời giải ghi phép tính"); return v; } },
  { id: G.de2, has: "thay vì bốn gói 500 g thì mẹ tiết kiệm được bao nhiêu đồng", right: (q) => {
    // gói lớn và gói nhỏ: khối lượng (g hay kg) và giá đọc trong đề; số gói nhỏ = khối lượng gói lớn : khối lượng gói nhỏ
    const g = [...q.q.matchAll(/gói (\d+) (g|kg) giá ([\d ]+) đồng/g)].map((m) => ({ kl: +m[1] * (m[2] === "kg" ? 1000 : 1), gia: val(m[3]) }));
    assert.equal(g.length, 2, "đề ghi hai loại gói"); const [nho, lon] = [...g].sort((a, b) => a.kl - b.kl), k = lon.kl / nho.kl;
    assert.ok(Number.isInteger(k) && q.q.includes(`cần mua ${lon.kl / 1000} kg`) && q.q.includes(`thay vì ${["", "một", "hai", "ba", "bốn", "năm"][k]} gói`), "đề: số gói nhỏ đủ khối lượng gói lớn");
    const v = k * nho.gia - lon.gia;
    assert.ok(q.unit === "đồng" && v > 0 && q.x.includes(`${k} × ${vn(nho.gia)} = ${vn(k * nho.gia)}`) && q.x.includes(`${vn(k * nho.gia)} − ${vn(lon.gia)} = ${vn(v)}`), "lời giải ghi phép tính"); return v; } }
];

const KHO = {}; // mã pool → câu trong kho (câu của các đề cố định, mỗi câu ghi src)
[L, G].forEach((s) => {
  const p = bank(s.pool), de = s.from.map(bank);
  assert.ok(de.every((d) => d.minutes === p.minutes && d.n === p.n && d.questions.length === d.n), s.pool + ": các đề cùng số phút, số câu như danh mục");
  assert.equal(p.questions.length, sum(de.map((d) => d.n)), s.pool + ": kho là câu của các đề cố định, không có câu riêng");
  assert.ok(p.questions.every((q) => s.from.includes(q.src)), s.pool + ": câu nào cũng thuộc một đề cố định");
  KHO[s.pool] = p.questions;
});
const kho = Object.values(KHO).flat();
let n = 0;
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const want = c.right(q), got = q.type === "fill" ? q.ans[0] : q.type === "num" ? q.ans : q.type === "tf4" ? q.a : q.type === "order" ? q.o : q.o[0];
  if (typeof want === "number") assert.ok(typeof got === "number" && close(got, want), at + ": đáp án " + got + ", tính được " + want);
  else assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
  checked.add(q); n++;
});
// ý đúng/sai “A trước khi B” của câu về trình tự thời gian: so ngày của hai sự kiện theo bảng; lời giải ghi ngày của cả hai
const thoiGian = (q) => q.type === "tf4" && /trình tự|thứ tự thời gian/i.test(q.q);
kho.filter(thoiGian).forEach((q) => q.o.forEach((o, i) => {
  const m = /^(.+) trước khi (.+)\.$/.exec(o); assert.ok(m, "ý của câu về trình tự thời gian viết dạng “A trước khi B.”: " + o);
  const a = suKien(m[1]), b = suKien(m[2]);
  assert.equal(q.a[i], a[1] < b[1], `“${o}”: ${a[2]} và ${b[2]}`); assert.ok(q.x.includes(a[2]) && q.x.includes(b[2]), "lời giải ghi ngày " + a[2] + ", " + b[2]); n++;
  checked.add(q);
}));
// câu trả lời bằng số, câu điền có đáp án là số, câu có hình, câu sắp xếp nào cũng phải được tính lại ở trên
kho.filter((q) => q.type === "num" || q.svg || q.type === "order" || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));
assert.ok(KHO[L.pool].filter((q) => q.svg).length >= 4 && L.from.every((id) => KHO[L.pool].some((q) => q.src === id && q.svg)), "Lịch sử và Địa lí: vài câu có hình, đề nào cũng có");

/* ---------- mức độ và ma trận ---------- */
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
// chữ của nhãn chủ đề (bỏ phần trong ngoặc, chữ “Vùng ”), tách theo “ và ”, “, ”
const phanNhan = (t) => t.replace(/\s*\([^)]*\)$/, "").replace(/^Vùng /, "").split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const CHUNG = new Set(["nào dưới", "dưới đây", "đây là", "là một", "mỗi ý", "ý sau", "sau đúng", "đúng hay", "hay sai", "ở hình", "nào sau", "sau đây"]);
const cap2 = (s) => { const w = String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x); };
const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !CHUNG.has(c) && !nhan.has(c))); };
[L, G].forEach((s) => {
  const p = bank(s.pool), M = p.pool.matrix, cells = Object.values(M), K = KHO[s.pool], N = p.n, de = s.from.map((id) => bank(id).questions);
  assert.ok(K.every((q) => [1, 2, 3].includes(q.lv)), s.pool + ": câu nào trong kho cũng cần lv");
  assert.ok(cells.every(Array.isArray), s.pool + ": ma trận ghi theo [Biết, Hiểu, Vận dụng]");
  const b = Math.round(0.4 * N), h = Math.round(0.32 * N);
  assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [b, h, N - b - h], s.pool + ": ma trận 40% Biết, 32% Hiểu, 28% Vận dụng");
  de.forEach((d, i) => {
    assert.deepEqual([...new Set(d.map((q) => q.topic))], Object.keys(M), `${s.pool}: Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} của ${s.pool} đúng ma trận ở chủ đề ${t}`));
  });
  const tf4 = K.filter((q) => q.type === "tf4"), kieu = {};
  assert.ok(tf4.length >= 4 && !K.some((q) => q.type === "essay"), s.pool + ": ít nhất 4 câu đúng/sai 4 ý, không có câu tự luận");
  tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
  assert.ok(Math.max(...Object.values(kieu)) <= Math.ceil(tf4.length / 3), s.pool + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp nhiều quá: " + JSON.stringify(kieu));
  // đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2, N22)
  K.filter((q) => q.type === "mc").forEach((q) => { const m = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60)); });
  // đáp án đúng không hay là lựa chọn dài nhất hay ngắn nhất (Rút ra N9-ck1-tin-congnghe): mỗi kiểu không quá một phần ba số câu nhiều lựa chọn
  {
    const mc = K.filter((q) => q.type === "mc"), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
    assert.ok(mc.filter((q) => hon(q, (a, b) => a > b)).length <= mc.length / 3, s.pool + ": đáp án đúng là lựa chọn dài nhất ở quá một phần ba số câu nhiều lựa chọn");
    assert.ok(mc.filter((q) => hon(q, (a, b) => a < b)).length <= mc.length / 3, s.pool + ": đáp án đúng là lựa chọn ngắn nhất ở quá một phần ba số câu nhiều lựa chọn");
  }
  // đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
  K.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => { if (d.toLowerCase().includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => o.toLowerCase().includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); });
  // câu ôn (chủ đề có cả ở kho giữa kì II cùng môn) không trùng đề bài, đáp án câu nào của kho đó
  {
    const cu = KHO[s.cu] = bank(s.cu).questions;
    const chung = Object.keys(M).filter((t) => cu.some((q) => q.topic === t));
    assert.ok(chung.length >= 1, s.pool + ": có câu ôn của kho giữa kì II");
    K.filter((q) => chung.includes(q.topic)).forEach((q) => cu.filter((c) => c.topic === q.topic).forEach((c) => {
      assert.notEqual(goc(q.q), goc(c.q), "câu ôn trùng đề bài kho giữa kì II: " + q.q.slice(0, 60));
      if (q.type === "mc" && c.type === "mc") assert.notEqual(goc(q.o[0]), goc(c.o[0]), "câu ôn trùng đáp án kho giữa kì II: " + q.q.slice(0, 60));
    }));
  }
  // không gần trùng câu của các kho cũ cùng môn, cả kho giữa kì II (Rút ra N25; như tests/tin-congnghe9-gk2.js): đề bài cùng các lựa
  // chọn, ô nối, ô sắp xếp có từ một nửa số cặp hai âm tiết liền nhau (tính trên câu ít cặp hơn, bỏ các cặp có ở mọi câu như “nào dưới
  // đây” và cặp của nhãn chủ đề) chung với một câu cũ thì báo
  {
    const cua = new Set(s.from.concat(s.pool));
    const cu = BANKS.filter((b) => !cua.has(b.id) && b.subject === p.subject).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), c: capAm(q) })));
    assert.ok(cu.length > 0 && cu.some((e) => e.at.startsWith(s.cu.replace(/ngau-nhien$/, ""))), s.pool + ": có kho cũ cùng môn để so, cả kho giữa kì II");
    K.forEach((q) => { const c = capAm(q); cu.forEach((e) => {
      const chung = [...c].filter((x) => e.c.has(x)).length;
      assert.ok(chung / Math.min(c.size, e.c.size) < 0.5, `gần trùng câu của kho cũ ${e.at}: ${q.src} “${q.q.slice(0, 50)}”`);
    }); });
  }
  const seen = new Set();
  for (let k = 0; k < 12 * K.length; k++) {
    const d = Quiz.draw(p);
    assert.equal(d.notes.length, 0, s.pool + ": rút thử có ghi chú: " + d.notes.join("; "));
    assert.equal(d.questions.length, N);
    Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `${s.pool}: rút đúng ma trận ở chủ đề ${t}`));
    d.questions.forEach((q) => seen.add(Quiz.key(q)));
  }
  assert.equal(seen.size, K.length, s.pool + ": rút thử nhiều lần phải gặp đủ câu của kho");
  // học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên không rút lại câu của đề đó
  s.from.forEach((lam) => {
    const hist = (q) => (q.src === lam ? { done: 1, wrong: 0 } : null); // lịch sử câu như PoolHist
    for (let k = 0; k < 30; k++) {
      const d = Quiz.draw(p, hist);
      assert.equal(d.notes.length, 0); assert.equal(d.questions.length, N);
      assert.ok(d.questions.every((q) => q.src !== lam), `${s.pool}: đã làm hết ${lam} thì không rút lại câu của đề đó`);
    }
  });
});
// Lịch sử và Địa lí: số câu Lịch sử, Địa lí của mỗi đề ghi đúng ở note (chủ đề Lịch sử đứng trước “Vùng Bắc Trung Bộ”)
{
  const T = Object.keys(bank(L.pool).pool.matrix), dau = T.indexOf("Vùng Bắc Trung Bộ"); assert.ok(dau > 0);
  assert.ok(T.slice(dau).every((t) => /^Vùng |^Biển/.test(t)), "các chủ đề Địa lí đứng sau chủ đề Lịch sử");
  L.from.forEach((id) => { const d = bank(id), ls = d.questions.filter((q) => T.indexOf(q.topic) < dau).length; assert.ok(d.note.includes(`${ls} câu Lịch sử, ${d.n - ls} câu Địa lí`), id + ": note ghi số câu Lịch sử, Địa lí"); });
}
// GDCD: câu tình huống là chính (Rút ra N9-ck1-lsdl-gdcd): đề bài (câu nối: cả cột trái) kể việc làm của một người cụ thể (tên riêng,
// tên kèm tuổi, “Bà”, “Bố”, “Mẹ”, “Anh”, “Chị”…, “Nhà <tên>”, “Gia đình”, “Nhóm”, “Lớp”) hay của một cơ sở kinh doanh cụ thể; từ một
// nửa kho
{
  const AI = "Bà|Bố|Mẹ|Anh|Chị|Ông|Cô|Chú|Dì|Bác|Bé|Nhà(?= \\p{Lu})|Gia đình|Bạn|Nhóm|Lớp|Trên đường|Lên lớp|Từ học kì|Gần nhà|Một (?:cửa hàng|cơ sở|số người)|Đêm khuya|Chú chó";
  const TEN = "Hải|Khoa|Tú|Quang|Tín|Quân|Khôi|Sơn|Nhung|Hoa|Thành|Khánh|Minh|Vĩnh|Thư|Phong|Thắng|Liên|Mai|Đức|Su|Hưng|Lan|Quý|Toàn|Ngân|Hà|Hạnh";
  const RE = new RegExp(`(?<!\\p{L})(?:${AI}|${TEN})(?!\\p{L})|\\p{Lu}\\p{Ll}+ \\(\\d+ tuổi\\)`, "u");
  const tinhHuong = (q) => RE.test(q.q + (q.type === "match" ? " " + q.l.join(" ") : ""));
  assert.ok(tinhHuong({ q: "Bà của Tú hay mua thuốc bổ." }) && tinhHuong({ q: "Nhà Quang định mua tủ lạnh." }) && !tinhHuong({ q: "Vì sao Nhà nước thu thuế?" }) && !tinhHuong({ q: "Biện pháp nào thuộc trách nhiệm dân sự?" }), "tự thử câu tình huống");
  const K = KHO[G.pool], th = K.filter(tinhHuong).length;
  assert.ok(th * 2 >= K.length, `GDCD: câu tình huống mới có ${th}/${K.length}`);
  console.log(`GDCD: ${th}/${K.length} câu tình huống.`);
}

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
[L, G].forEach((s) => {
  const deBai = BANKS.filter((b) => b.file === s.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
});

/* ---------- dò lộ đáp án (Rút ra N5; bộ dò của tests/lsdl-gdcd9-gk2.js) giữa hai câu rút được cùng lúc: khác ô (chủ đề, mức), hoặc
   cùng một ô rút từ 2 câu. Đáp án là số (từ hai chữ số, hoặc số thập phân) chỉ tìm ở vị trí kết quả của câu kia (ngay sau “=”, “là”,
   “bằng”, “được”); cặp nối: câu kia có cả hai vế; câu về thứ tự thời gian (sắp xếp, ý “A trước khi B”): câu kia không ghi ngày tháng
   nào của các sự kiện đó (cách ghi trong lời giải). Đáp án bằng chữ (lựa chọn đúng của câu trắc nghiệm, đáp án câu điền) có ở câu kia
   thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
// t có cụm s đứng thành từ riêng (“Na” không khớp “Nam”)
const coCum = (t, s) => { for (let i = t.indexOf(s); i >= 0; i = t.indexOf(s, i + 1)) if (!/[\p{L}\p{N}]/u.test(t[i - 1] || " ") && !/[\p{L}\p{N}]/u.test(t[i + s.length] || " ")) return true; return false; };
// ngày tháng của câu về thứ tự thời gian: cách ghi trong lời giải của mọi sự kiện có trong câu (bỏ cách ghi chỉ có năm như “1992”)
const ngayCua = (q) => {
  const ds = q.type === "order" && q.o.every((o) => SU_KIEN.some(([k]) => o.toLowerCase().includes(k.toLowerCase()))) ? q.o
    : thoiGian(q) ? q.o.flatMap((o) => { const m = /^(.+) trước khi (.+)\.$/.exec(o); return [m[1], m[2]]; }) : [];
  return [...new Set(ds.map((d) => suKien(d)[2]).filter((g) => /\//.test(g)))];
};
const doLo = (qs, M, tenCau) => {
  const cungLuc = (p, q) => p.topic !== q.topic || p.lv !== q.lv || M[p.topic][p.lv - 1] >= 2;
  const lo = [], chuLo = [];
  qs.forEach((q, i) => {
    const so = (q.type === "num" && (q.ans >= 10 || !Number.isInteger(q.ans))) || (q.type === "fill" && /^\d{2,}$/.test(q.ans[0])) ? [val(q.type === "num" ? q.ans : q.ans[0])] : [];
    const cum = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const ngay = ngayCua(q);
    qs.forEach((p, j) => {
      if (j === i || !cungLuc(p, q)) return;
      const C = chu(p), T = C.map((s) => s.toLowerCase()), at = `${tenCau(p)} → ${tenCau(q)}: `;
      so.filter((x) => C.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l.toLowerCase()) && coCum(t, r.toLowerCase()))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      ngay.filter((g) => C.some((t) => coCum(t, g))).forEach((g) => lo.push(at + "ngày " + g));
      cum.filter((s) => T.some((t) => coCum(t, s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const ten = new Map();
[L, G].forEach((s) => s.from.forEach((id) => KHO[s.pool].filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace(/9-ck2-/, "-") + "#" + (i + 1)))));
const loAll = [], chuAll = [];
[L, G].forEach((s) => { const r = doLo(KHO[s.pool], bank(s.pool).pool.matrix, (q) => ten.get(q)); loAll.push(...r.lo); chuAll.push(...r.chuLo); });
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuAll.join("\n"));
const DA_XEM = [];
assert.deepEqual(chuAll, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 80”, ngày tháng của câu về thứ tự, lựa chọn đúng, cặp nối
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thu = (qs) => { const M = new Proxy({}, { get: () => [1, 1, 1] }), r = doLo(qs, M, (q) => q.q.slice(0, 12)); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const khac = tim("dầu mỏ và khí tự nhiên tập trung chủ yếu ở đâu"), khac2 = tim("Ví dụ nào dưới đây là một thay đổi về môi trường sống");
  assert.deepEqual(thu([tim("sản lượng thuỷ sản khai thác và nuôi trồng của tỉnh X"), gia(khac, "Ví dụ: 440 : 550 × 100 = 80.")]), ["80"]);
  assert.deepEqual(thu([tim("trình tự thời gian của những sự kiện trong các năm 1975 – 1980"), gia(khac, "Ngày 17/2/1979, chiến sự nổ ra.")]), ["ngày 17/2/1979"]);
  assert.deepEqual(thu([tim("Hai cảng hàng không quốc tế của vùng Đông Nam Bộ"), gia(khac, "Hàng về qua Tân Sơn Nhất và Long Thành.")]), ["Tân Sơn Nhất và Long Thành"]);
  assert.deepEqual(thu([tim("Nối mỗi hành vi ở cột trái"), gia(khac2, "Ông Quý đổ trộm phế thải xây dựng ra lòng đường là vi phạm hành chính.")]), ["Ông Quý đổ trộm phế thải xây dựng ra lòng đường → Vi phạm hành chính"]);
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book; và với câu của các kho khác ---------- */
// tên riêng nhiều chữ (vùng, tổ chức, sự kiện, văn bản, chiến dịch, địa danh, tên người) và tên bài: mỗi tên tính là một từ (như
// tests/lsdl-gdcd9-ck1.js, tests/lsdl-gdcd9-gk2.js; thêm tên của Bài 18–21 phần Lịch sử, Địa lí và Bài 9–10 GDCD)
const GOP = ["thanh pho ho chi minh", "trung du va mien nui phia bac", "duyen hai nam trung bo va tay nguyen", "dong bang song cuu long", "dong bang song hong",
  "bac trung bo", "dong nam bo", "ho chi minh", "vo nguyen giap", "viet nam dan chu cong hoa", "cong hoa xa hoi chu nghia viet nam", "cong hoa mien nam viet nam",
  "dang cong san viet nam", "dang cong san dong duong", "mat tran viet minh", "hoi lien viet", "mat tran lien viet", "mat tran lien hiep quoc dan viet nam",
  "khang chien chong my cuu nuoc", "khang chien chong thuc dan phap", "dai hoi dai bieu toan quoc", "hoi nghi hiep thuong chinh tri", "quoc hoi khoa vi",
  "tong tuyen cu", "hiep dinh gio ne vo", "hiep dinh pa ri", "chien tranh lanh", "chien tranh the gioi thu hai", "trat tu hai cuc i an ta",
  "lien bang nga", "lien xo", "lien minh chau au", "to chuc thuong mai the gioi", "ngan hang the gioi", "quy tien te quoc te", "lien hop quoc",
  "hiep hoi cac quoc gia dong nam a", "cong dong asean", "hien chuong asean", "khu vuc mau dich tu do asean", "hiep dinh doi tac kinh te toan dien khu vuc",
  "cong dong chinh tri an ninh", "cong dong kinh te", "cong dong van hoa xa hoi", "tam nhin asean 2020", "vanh dai con duong", "cach mang 4 0",
  "cach mang khoa hoc ki thuat", "van vat ket noi", "tri tue nhan tao", "dien toan dam may", "du lieu lon", "dien bien phu tren khong", "dien bien phu",
  "nga ba dong loc", "duong ho chi minh", "bien gioi tay nam", "bien gioi phia bac", "pon pot", "vi xuyen", "gac ma", "co lin", "len dao",
  "trung quoc", "nhat ban", "han quoc", "hong cong", "dai loan", "xin ga po", "an do", "mi an ma", "cam pu chia", "thai lan", "ma lai xi a",
  "in do ne xi a", "phi lip pin", "bru nay", "dong duong", "dong bac a", "dong nam a",
  "bien dong", "vinh thai lan", "hoang sa", "truong sa", "bach long vi", "con dao", "con son", "ly son", "phu quy", "con co", "van don", "co to", "cat hai",
  "kien hai", "tho chau", "tho chu", "nam du", "phu quoc", "vinh ha long", "cat ba", "tan son nhat", "long thanh", "cat bi", "noi bai", "cam ranh", "chu lai",
  "phu bai", "yok don", "nui chua", "song thanh", "xuan thuy", "phong nha ke bang", "tram chim", "hoi an", "my son", "co do hue", "thanh nha ho",
  "hoang thanh thang long", "trang an", "dong thap muoi", "tu giac long xuyen", "ban dao ca mau", "song tien", "song hau", "song me cong", "can tho",
  "an giang", "ca mau", "dong thap", "vinh long", "tay ninh", "dong nai", "lam dong", "dak lak", "khanh hoa", "quang ngai", "quang tri", "thanh hoa",
  "nghe an", "ha tinh", "da nang", "hai phong", "ha noi", "sai gon", "cuu long", "nam con son", "song hong", "phu khanh", "malay tho chu", "dung quat",
  "nghi son", "bach ho", "viet nam", "luat bien viet nam", "vung dac quyen kinh te", "vung tiep giap lanh hai", "them luc dia", "duong co so",
  "hien phap nam 2013", "bo luat hinh su", "bo luat dan su", "bo luat lao dong", "luat dau tu", "luat can bo cong chuc", "luat vien chuc",
  "luat xu li vi pham hanh chinh", "thue gia tri gia tang", "thue thu nhap ca nhan", "thue su dung dat nong nghiep",
  "vi pham phap luat va trach nhiem phap li", "quyen tu do kinh doanh va nghia vu nop thue", "thich ung voi thay doi", "tieu dung thong minh",
  "nong lam nghiep va thuy san", "cong nghiep va xay dung"
].sort((a, b) => b.length - a.length);
// câu trích, khẩu hiệu, phương châm, tên gọi trong ngoặc kép, tên văn bản luật, hiệp định ghi đúng như sách: không tính là chép sách
const TRICH = ["đánh nhanh, thắng nhanh", "đánh chắc, tiến chắc", "sống bám đá, chết hoá đá, thành bất tử", "thống nhất trong đa dạng", "Điện Biên Phủ trên không",
  "Hiệp định Pa-ri về chấm dứt chiến tranh, lập lại hoà bình ở Việt Nam", "Hiến pháp năm 2013 (sửa đổi, bổ sung năm 2025)",
  "Bộ luật Hình sự năm 2015 (sửa đổi, bổ sung năm 2017, 2025)"];
const khongDau = (s) => { let t = " " + TRICH.reduce((x, c) => x.split(c).join(" "), String(s).normalize("NFC")).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() + " ";
  GOP.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); }); return t.replace(/[aeiouy]+/g, "a").trim(); };
const tuCua = (s) => khongDau(s).split(" ").filter(Boolean);
const chuoi = (s, k) => { const w = tuCua(s), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const truong = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], q.l || [], q.r || []);
const boChuoi = (ds, k) => { const out = new Map(); ds.forEach(([id, s]) => { const w = tuCua(s); for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k).join(" "); if (!out.has(c)) out.set(c, new Set()); out.get(c).add(id); } }); return out; };
const khoMoi = KHO[L.pool].concat(KHO[G.pool]);
const bao = (bo, k) => [...new Set(khoMoi.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].filter((c) => bo.has(c)).map((c) => `${ten.get(q)} ~ ${[...bo.get(c)].join(", ")}: ${c}`)))];
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
if (SACH.length) {
  assert.ok(["lich-su-dia-li-9", "giao-duc-cong-dan-9"].every((c) => SACH.some((f) => f.includes(path.join("lop-9", c)))), "OnUp-Book có Lịch sử và Địa lí 9, Giáo dục công dân 9");
  const ds = SACH.map((f) => [path.basename(path.dirname(f)), fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")]);
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + bao(boChuoi(ds, 6), 6).join("\n"));
  assert.deepEqual(bao(boChuoi(ds, 8), 8), [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
{
  const cua = new Set(L.from.concat(G.from, [L.pool, G.pool]));
  const ds = BANKS.filter((b) => !cua.has(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => [b.id, truong(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).join(" | ")]));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + bao(boChuoi(ds, 5), 5).join("\n"));
  assert.deepEqual(bao(boChuoi(ds, 8), 8), [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu, ý đã tính lại hoặc đọc lại hình (hai ngân hàng); kho " + khoMoi.length + " câu, " + [L, G].map((s) => s.from.length + " đề cố định " + bank(s.pool).n + " câu").join(" và ") + ".");
console.log("MATH OK");
