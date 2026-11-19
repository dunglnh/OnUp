// Tính lại đáp án và kiểm tra ma trận hai ngân hàng lớp 8 cuối kì I của Phiên N8-ck1-lsdl-gdcd: Lịch sử và Địa lí (data/banks/8-lsdl.js)
// và GDCD (8-gdcd.js), theo mẫu tests/lsdl-gdcd7-ck1.js. Mỗi ngân hàng = hai đề cố định trong from của đề ngẫu nhiên (cùng chia theo ma
// trận) + đề ngẫu nhiên không có câu riêng; số câu, số đề lấy từ danh mục. Câu có phép tính, có hình, câu sắp xếp, câu nối được nhận ra bằng
// một đoạn chữ của đề (has, đúng một câu trong hai kho, đúng đề ghi ở id); so đáp án với kết quả tính bằng code: trả lời bằng số ans, trắc
// nghiệm o[0], đúng/sai 4 ý a, sắp xếp o, nối cột r (theo l). Lịch sử và Địa lí: trình tự thời gian (câu sắp xếp các phát minh của cách
// mạng công nghiệp, các sự kiện của phong trào công nhân; bảng năm theo sách SU_KIEN), số năm của phong trào Tây Sơn (năm theo sách), làng
// nghề theo sách (LANG_NGHE), nơi tập trung khoáng sản theo sách (KHOANG), chiều dài bắc – nam và các ý về vĩ độ, kinh độ tính lại từ toạ
// độ ghi trong đề (toạ độ theo sách), mùa lũ tính lại từ lưu lượng các tháng (lưu lượng trung bình năm ghi trong đề phải đúng); bốn hình đọc
// lại bằng code: trục thời gian (vạch đặt theo tỉ lệ năm, năm trên vạch, nhãn dưới vạch; mốc được hỏi khớp năm của sự kiện theo SU_KIEN),
// sơ đồ vị trí của phần đất liền và hai quần đảo (hướng của từng ô so với ô giữa, mũi tên chỉ hướng bắc, tên và tỉnh, thành phố theo sách ở
// TIEP_GIAP, THUOC),
// hai biểu đồ nhiệt độ và lượng mưa (như tests/lsdl-gdcd6-gk2.js: cột, chấm khớp trục; tháng nóng nhất, mưa nhiều nhất, số tháng dưới
// 20 °C, mùa mưa, biên độ nhiệt năm tính lại từ hình, mỗi ý đúng/sai và mỗi lựa chọn xét lại bằng số đọc từ hình); chữ trong hình từ cỡ 13,
// trong khung, không đè nhau. GDCD: câu tục ngữ, thành ngữ, các bước lập kế hoạch thực hiện mục tiêu (BUOC, theo sách). Câu trả lời bằng
// số, câu có hình, câu sắp xếp, câu nối nào trong hai kho cũng phải có kiểm tra ở đây.
// Rồi kiểm tra mức độ và ma trận: mọi câu có lv; ma trận 40% Biết, 32% Hiểu, 28% Vận dụng (10 – 8 – 7 với đề 25 câu), chủ đề theo thứ
// tự bài như các đề; đề nào cũng chia đúng theo ma trận, nên ô nào cũng có gấp đôi số câu ô đó rút; số câu Lịch sử, Địa lí của mỗi đề
// ghi đúng ở note; mỗi kho có ít nhất 4 câu đúng/sai 4 ý (kiểu Đ/S không lặp quá một phần ba), không có câu tự luận; câu nối có một ô
// thừa, cặp nối không có chữ chung; đáp án đúng không dài hơn hẳn các lựa chọn sai, là lựa chọn dài nhất hay ngắn nhất ở không quá một
// phần ba số câu nhiều lựa chọn; đáp án không lặp chữ của nhãn chủ đề (trừ khi mọi lựa chọn cùng có chữ đó); GDCD: câu tình huống (có
// nhân vật, việc làm cụ thể) từ một nửa kho; chữ như sách in năm 2026 (không “huyện”, “63 tỉnh”, tên tỉnh đã nhập năm 2025 trừ khi ghi kèm
// “(nay thuộc …)”, dấu thanh kiểu sách, số ngăn hàng nghìn); mọi câu không gần trùng câu nào của các kho cùng môn đã có, cả 7-lsdl.js,
// 9-lsdl.js, 7-gdcd.js, 9-gdcd.js (cặp hai âm tiết chung, như tests/lsdl-gdcd7-ck1.js); rút thử nhiều lần ra đúng ma trận, không ghi chú,
// gặp đủ câu của kho; học sinh đã làm hết một đề cố định thì đề ngẫu nhiên không rút lại câu của đề đó.
// Cuối cùng: đề bài không trùng câu nào khác trong file; dò lộ đáp án (bộ dò của tests/lsdl-gdcd7-ck1.js) giữa mọi cặp câu của kho (đề
// “Ôn chủ đề” rút chung cả chủ đề, đề ngẫu nhiên rút chung các chủ đề): đáp án là số ở vị trí kết quả, cặp nối, năm của câu về thứ tự
// thời gian, năm của mốc được hỏi trên trục thời gian, đáp án bằng chữ (DO_LO=1 in ra, danh sách đã xem ở DA_XEM); bộ dò tự thử với câu
// cố ý lộ; có OnUp-Book thì so mọi trường chữ với chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm, tên riêng nhiều chữ tính là một từ, bỏ qua
// câu tục ngữ, khẩu hiệu, tên văn bản luật ghi đúng như sách; không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho
// khác (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 5 từ).
// Chạy: node tests/lsdl-gdcd8-ck1.js → in MATH OK.
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
const L = { pool: "lsdl8-ck1-ngau-nhien" }, G = { pool: "gdcd8-ck1-ngau-nhien" };
[L, G].forEach((s) => {
  const p = bank(s.pool); assert.ok(p && p.pool, "thiếu đề ngẫu nhiên " + s.pool);
  s.from = p.pool.from; s.de1 = s.from[0]; s.de2 = s.from[1]; s.file = p.file;
  assert.ok(s.from.length === 2 && s.from.every((id) => bank(id) && bank(id).file === p.file), s.pool + ": from là hai đề cố định cùng file");
});

/* ---------- số ---------- */
const close = (x, y) => Math.abs(x - y) < 1e-9;
const sum = (a) => a.reduce((s, v) => s + v, 0);
const val = (s) => +String(s).replace(/\s/g, "").replace(",", "."); // “2 400 000” → 2400000, “2,5” → 2.5
const vn = (x) => { const [n, d] = String(x).split("."); return n.replace(/\B(?=(\d{3})+(?!\d))/g, " ") + (d ? "," + d : ""); }; // 2400000 → “2 400 000”
const nam = (s) => [...s.matchAll(/năm (\d{1,4})(?!\d| \d)/gi)].map((m) => +m[1]); // các năm ghi trong đề, theo thứ tự
const LA_MA = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII", "XIII", "XIV", "XV", "XVI", "XVII", "XVIII", "XIX", "XX", "XXI"];
const theKi = (y) => LA_MA[Math.floor((y - 1) / 100)]; // năm sau Công nguyên: 1–100 thế kỉ I, 101–200 thế kỉ II…
const tuDon = (s) => new Set(String(s).toLowerCase().split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 1)); // các tiếng của một ô (như tests/lsdl4-ck2.js)
const lech = (a, b) => Math.abs(((((a - b) % 360) + 540) % 360) - 180); // độ lệch giữa hai góc (độ)
// toạ độ “8°34'B”, “109°28'Đ” → số độ (phút đổi ra độ)
const DO_RE = /(\d{1,3})°(\d{2})'([BNĐT])/g;
const toaDo = (s) => [...String(s).matchAll(DO_RE)].map((m) => ({ v: +m[1] + +m[2] / 60, h: m[3], d: +m[1], p: +m[2] }));
const doPhut = (phut) => `${Math.floor(phut / 60)}°${String(phut % 60).padStart(2, "0")}'`; // 889 phút → “14°49'”

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ngang = (l) => num(l, "y1") === num(l, "y2");
const daDoc = new Set(); // hình đã đọc lại bằng code
// bề rộng ước của một dòng chữ cỡ f (chữ thường ~0,55f, chữ hoa, số ~0,62f): để kiểm tra chữ không đè nhau, không ra ngoài khung
const rongChu = (t, f) => [...String(t)].reduce((s, c) => s + (/[A-ZĐ0-9ÂÊÔƠƯ(]/.test(c) ? 0.62 : /[ \-–.,:]/.test(c) ? 0.3 : 0.55) * f, 0);
const khung = (svg) => { const m = /viewBox="0 0 ([\d.]+) ([\d.]+)"/.exec(svg); assert.ok(m, "hình có viewBox"); return { w: +m[1], h: +m[2] }; };
// chữ trong hình từ cỡ 13 (chữ ≥ 13px ở 360px), nằm trong khung, hai dòng chữ không đè nhau
const chuTrongHinh = (svg, ten) => {
  const K = khung(svg), hop = texts(svg).map((t) => {
    const f = +(t["font-size"] || 15), w = rongChu(t.t, f), x = +t.x, a = t["text-anchor"];
    assert.ok(f >= 13, `${ten}: chữ “${t.t}” cỡ ${f}, dưới 13`);
    const x0 = a === "middle" ? x - w / 2 : a === "end" ? x - w : x;
    return { t: t.t, x0, x1: x0 + w, y0: +t.y - 0.8 * f, y1: +t.y + 0.2 * f };
  });
  hop.forEach((b) => assert.ok(b.x0 >= -0.5 && b.x1 <= K.w + 0.5 && b.y0 >= -0.5 && b.y1 <= K.h + 0.5, `${ten}: chữ “${b.t}” ra ngoài khung hình`));
  hop.forEach((b, i) => hop.slice(i + 1).forEach((c) => assert.ok(b.x1 <= c.x0 || c.x1 <= b.x0 || b.y1 <= c.y0 || c.y1 <= b.y0, `${ten}: chữ “${b.t}” đè lên “${c.t}”`)));
};

/* Trục thời gian: một đường ngang (nét ink) có mũi tên ở đầu phải; mỗi mốc là một vạch đứng cắt đường ngang, năm ghi ngay trên vạch,
   nhãn ghi ngay dưới vạch (cùng x với vạch); khoảng cách giữa các vạch tỉ lệ với số năm. Trả về [{ nam, nhan }] theo thứ tự năm
   (như tests/lsdl-gdcd7-ck1.js). */
const docTruc = (svg) => {
  daDoc.add(svg); chuTrongHinh(svg, "trục thời gian");
  const ln = tags(svg, "line"), duong = ln.filter(ngang);
  assert.equal(duong.length, 1, "trục thời gian: một đường ngang");
  const y = num(duong[0], "y1"), xMax = Math.max(num(duong[0], "x1"), num(duong[0], "x2")), tx = texts(svg);
  const tg = tags(svg, "polygon"); assert.equal(tg.length, 1, "trục thời gian: một mũi tên");
  const dinh = pts(tg[0].points).reduce((a, p) => (p[0] > a[0] ? p : a));
  assert.ok(close(dinh[1], y) && dinh[0] > xMax, "trục thời gian: mũi tên ở đầu phải, chỉ sang phải");
  const vach = ln.filter((l) => !ngang(l));
  assert.ok(vach.length >= 3 && vach.every((l) => num(l, "x1") === num(l, "x2") && Math.min(num(l, "y1"), num(l, "y2")) < y && Math.max(num(l, "y1"), num(l, "y2")) > y), "trục thời gian: ít nhất 3 vạch đứng cắt đường ngang");
  const moc = vach.map((l) => {
    const x = num(l, "x1"), tren = tx.filter((t) => close(+t.x, x) && +t.y < y), duoi = tx.filter((t) => close(+t.x, x) && +t.y > y);
    assert.ok(tren.length === 1 && /^\d{3,4}$/.test(tren[0].t) && duoi.length === 1, "trục thời gian: mỗi vạch một năm ở trên, một nhãn ở dưới");
    return { x, nam: +tren[0].t, nhan: duoi[0].t };
  }).sort((a, b) => a.nam - b.nam);
  assert.equal(tx.length, 2 * moc.length, "trục thời gian: không có chữ nào khác ngoài năm và nhãn của các mốc");
  const k = (moc[1].x - moc[0].x) / (moc[1].nam - moc[0].nam);
  assert.ok(k > 0, "trục thời gian: năm tăng từ trái sang phải");
  moc.forEach((m) => assert.ok(Math.abs(m.x - (moc[0].x + k * (m.nam - moc[0].nam))) < 0.15, `trục thời gian: vạch năm ${m.nam} không đặt đúng tỉ lệ`));
  return moc.map(({ nam, nhan }) => ({ nam, nhan }));
};

/* Sơ đồ vị trí tiếp giáp (như tests/lsdl-gdcd7-ck1.js): các ô chữ nhật có chữ ở trong, không đè nhau; ô giữa (nền acc-soft) ghi tên lãnh
   thổ, mỗi ô khác ở một trong tám hướng so với ô giữa (lệch không quá 15°); mũi tên chỉ hướng bắc: đoạn thẳng đứng, đầu mũi tên ở trên,
   chữ B trên đầu mũi tên. Trả về { giua, huong }. */
const docViTri = (svg) => {
  daDoc.add(svg); chuTrongHinh(svg, "sơ đồ vị trí");
  const tx = texts(svg), o = tags(svg, "rect").map((r) => {
    const x = num(r, "x"), y = num(r, "y"), w = num(r, "width"), h = num(r, "height");
    const chu = tx.filter((t) => +t.x > x && +t.x < x + w && +t.y > y && +t.y < y + h).sort((a, b) => +a.y - +b.y).map((t) => t.t).join(" ");
    assert.ok(chu, "ô nào cũng có chữ"); return { chu, fill: r.fill, x, y, w, h, cx: x + w / 2, cy: y + h / 2 };
  });
  o.forEach((a, i) => o.slice(i + 1).forEach((b) => assert.ok(a.x + a.w <= b.x || b.x + b.w <= a.x || a.y + a.h <= b.y || b.y + b.h <= a.y, `ô “${a.chu}” đè lên ô “${b.chu}”`)));
  const giua = o.filter((v) => v.fill === "acc-soft"); assert.equal(giua.length, 1, "một ô giữa (nền acc-soft)");
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
  return { giua: giua[0].chu, huong };
};

/* Biểu đồ nhiệt độ và lượng mưa (như tests/lsdl-gdcd6-gk2.js): đường lưới ngang (nét line) chung cho hai trục, số của trục lượng mưa
   (bên trái, mm) và trục nhiệt độ (bên phải, °C) đặt ngay cạnh đầu một đường lưới; cột lượng mưa tô acc-soft đứng trên đường đáy, chấm
   nhiệt độ tô bad nối bằng một đường gấp khúc; chữ số tháng 1–12 dưới đáy, cột và chấm đứng thẳng trên chữ số tháng. Trả về { mua, nhiet }
   (12 tháng). Để đọc được bằng mắt: tháng nóng nhất, tháng mưa nhiều nhất ở trên đường lưới hoặc cao hơn hẳn tháng khác (từ 1 °C, 30 mm);
   không cột nào cách vạch 100 mm dưới 20 mm, không chấm nào cách vạch 20 °C dưới 1 °C. */
const docBieuDo = (svg) => {
  daDoc.add(svg); chuTrongHinh(svg, "biểu đồ khí hậu");
  const lu = tags(svg, "line").filter((l) => l.stroke === "line");
  assert.ok(lu.length >= 5 && lu.every((l) => num(l, "y1") === num(l, "y2")), "đường lưới nằm ngang");
  const x0 = Math.min(...lu.map((l) => num(l, "x1"))), x1 = Math.max(...lu.map((l) => num(l, "x2"))), ys = lu.map((l) => num(l, "y1")).sort((a, b) => a - b);
  const day = ys[ys.length - 1], dinh = ys[0], tx = texts(svg);
  const truc = (side) => tx.filter((t) => /^\d+$/.test(t.t) && (side === "trai" ? t["text-anchor"] === "end" && +t.x < x0 : +t.x > x1)).map((t) => {
    const y = ys.find((g) => close(g, +t.y - 5));
    assert.ok(y !== undefined, `số ${t.t} ở trục ${side} phải đặt ngay cạnh một đường lưới`);
    return { v: +t.t, y };
  });
  const thang = (lb) => {
    assert.equal(lb.length, ys.length, "đường lưới nào cũng có số ở hai trục");
    lb.sort((a, b) => b.y - a.y);
    assert.ok(lb[0].v === 0 && lb[0].y === day, "số 0 ở đường đáy");
    const k = (lb[0].y - lb[1].y) / (lb[1].v - lb[0].v);
    lb.forEach((l) => assert.ok(close(l.y, day - k * l.v), `số ${l.v} không đặt đúng vạch`));
    return (y) => (day - y) / k;
  };
  const muaTheoY = thang(truc("trai")), nhietTheoY = thang(truc("phai"));
  const thangX = tx.filter((t) => /^\d+$/.test(t.t) && t["text-anchor"] === "middle" && +t.y > day).map((t) => ({ m: +t.t, x: +t.x }));
  assert.deepEqual(thangX.map((t) => t.m), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "chữ số tháng 1–12 dưới đáy");
  const thangCua = (x) => { const g = thangX.filter((t) => Math.abs(t.x - x) < 1); assert.equal(g.length, 1, "cột, chấm phải đứng thẳng trên chữ số tháng"); return g[0].m; };
  const mua = Array(12).fill(null), nhiet = Array(12).fill(null);
  tags(svg, "rect").filter((r) => r.fill === "acc-soft" && close(num(r, "y") + num(r, "height"), day)).forEach((r) => {
    const m = thangCua(num(r, "x") + num(r, "width") / 2);
    assert.equal(mua[m - 1], null, "mỗi tháng một cột"); mua[m - 1] = Math.round(muaTheoY(num(r, "y")) * 1000) / 1000;
  });
  const cham = tags(svg, "circle").filter((c) => c.fill === "bad" && num(c, "cy") >= dinh && num(c, "cy") <= day);
  cham.forEach((c) => { const m = thangCua(num(c, "cx")); assert.equal(nhiet[m - 1], null, "mỗi tháng một chấm"); nhiet[m - 1] = Math.round(nhietTheoY(num(c, "cy")) * 1000) / 1000; });
  assert.ok(mua.every((v) => v !== null) && nhiet.every((v) => v !== null), "đủ 12 cột và 12 chấm");
  const duong = tags(svg, "polyline").filter((p) => p.stroke === "bad");
  assert.equal(duong.length, 1, "một đường nhiệt độ");
  assert.deepEqual(pts(duong[0].points), cham.map((c) => [num(c, "cx"), num(c, "cy")]), "đường nhiệt độ nối đúng các chấm");
  assert.ok(tx.some((t) => t.t === "Lượng mưa (mm)") && tx.some((t) => t.t === "Nhiệt độ (°C)"), "chú giải ghi đơn vị");
  // đọc được bằng mắt
  const hon = (a, i) => a.every((v, j) => j === i || a[i] - v >= (a === mua ? 30 : 1) - 1e-9);
  assert.ok(hon(nhiet, nhiet.indexOf(Math.max(...nhiet))) && hon(mua, mua.indexOf(Math.max(...mua))), "tháng nóng nhất, mưa nhiều nhất cao hơn hẳn các tháng khác");
  assert.ok(mua.every((v) => Math.abs(v - 100) >= 20) && nhiet.every((v) => Math.abs(v - 20) >= 1), "không cột nào sát vạch 100 mm, không chấm nào sát vạch 20 °C");
  return { mua, nhiet };
};
const viTriLon = (a) => { const m = Math.max(...a), i = a.indexOf(m); assert.equal(a.lastIndexOf(m), i, "giá trị lớn nhất chỉ ở một tháng"); return i + 1; };
const viTriNho = (a) => { const m = Math.min(...a), i = a.indexOf(m); assert.equal(a.lastIndexOf(m), i, "giá trị nhỏ nhất chỉ ở một tháng"); return i + 1; };
const nf1 = (x) => String(Math.round(x * 10) / 10).replace(".", ","); // 16.5 → “16,5”

/* ---------- bảng theo sách (OnUp-Book lop-8/lich-su-dia-li-8, lop-8/giao-duc-cong-dan-8; page-N là trang in N − 2) ---------- */
// trình tự thời gian: [chữ nhận ra trong ô, năm để so, cách ghi năm trong lời giải]. Cách mạng công nghiệp ở Anh (tr. 15–16): máy kéo sợi
// Gien-ni năm 1764, máy kéo sợi chạy bằng sức nước của R. Ác-rai năm 1769, máy hơi nước của Giêm Oát năm 1784, đầu máy xe lửa của
// Xti-phen-xơn năm 1814. Phong trào Tây Sơn (tr. 36–39): khởi nghĩa năm 1771, chúa Nguyễn bị bắt, chính quyền chúa Nguyễn bị lật đổ năm
// 1777, vào Thăng Long lật đổ chúa Trịnh (7 – 1786), đại phá quân Thanh đầu năm 1789. Phong trào công nhân (tr. 51–53): Quốc tế thứ nhất
// tháng 9 – 1864, Công xã Pa-ri 18 – 3 – 1871, Đảng Xã hội dân chủ Đức năm 1875, Quốc tế thứ hai 14 – 7 – 1889.
const SU_KIEN = [
  ["Gien-ni", 1764, "1764"], ["Ác-rai", 1769, "1769"], ["Giêm Oát", 1784, "1784"], ["Xti-phen-xơn", 1814, "1814"],
  ["dựng cờ khởi nghĩa", 1771, "1771"], ["lật đổ chính quyền chúa Nguyễn", 1777, "1777"], ["lật đổ chúa Trịnh", 1786, "1786"],
  ["đại phá quân Thanh", 1789, "1789"],
  ["Quốc tế thứ nhất", 1864, "1864"], ["lập ra Công xã", 1871, "1871"], ["Xã hội dân chủ Đức", 1875, "1875"], ["Quốc tế thứ hai", 1889, "1889"]
];
const suKien = (s) => { const m = SU_KIEN.filter(([k]) => s.toLowerCase().includes(k.toLowerCase())); assert.equal(m.length, 1, "không nhận ra đúng một sự kiện: " + s); return m[0]; };
// vị trí quanh phần đất liền theo hướng (Bài 1 tr. 95–96: chung đường biên giới với Trung Quốc, Lào, Cam-pu-chia; quần đảo Hoàng Sa thuộc
// thành phố Đà Nẵng, quần đảo Trường Sa thuộc tỉnh Khánh Hoà; hướng theo bản đồ tr. 96)
const TIEP_GIAP = { "Việt Nam": { "bắc": "Trung Quốc", "tây": "Lào", "tây nam": "Cam-pu-chia", "đông": "Hoàng Sa", "đông nam": "Trường Sa" } };
const THUOC = { "Hoàng Sa": "Đà Nẵng", "Trường Sa": "Khánh Hoà" };
// nơi tập trung chủ yếu của khoáng sản (Bài 3 tr. 111–112)
const KHOANG = { "Than đá": "Quảng Ninh", "A-pa-tít": "Lào Cai", "Bô-xít": "Tây Nguyên", "Dầu mỏ, khí tự nhiên": "Thềm lục địa phía nam" };
// làng nghề thủ công thế kỉ XVI – XVIII (Bài 9 tr. 43)
const LANG_NGHE = { "Thổ Hà": "Làm gốm", "Bát Tràng": "Làm gốm", "La Khê": "Dệt vải lụa", "Nho Lâm": "Rèn sắt", "Châu Khê": "Làm giấy", "Đốc Sơ": "Làm giấy" };
// các bước lập kế hoạch thực hiện mục tiêu cá nhân (GDCD 8 Bài 6 tr. 38–39): [chữ nhận ra trong ô, số thứ tự của bước]
const BUOC = [["Ghi ra những việc cần làm", 1], ["cần đọc trước", 2], ["Định thời gian", 3], ["xem lại mình đã đọc được bao nhiêu", 4]];
// thế kỉ ghi cạnh một sự kiện: [chữ nhận ra trong câu, năm theo sách]. Cách mạng tư sản Anh bùng nổ 8 – 1642 (tr. 9), Cách mạng tư sản Pháp
// 14 – 7 – 1789 (tr. 13), phong trào nông dân Đàng Ngoài: các cuộc khởi nghĩa lớn 1739 – 1769 (tr. 33)
const THE_KI = [["Cách mạng tư sản Anh", 1642], ["Cách mạng tư sản Pháp", 1789], ["Đàng Ngoài nổi dậy", 1740]];

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans, o[0], a, o hoặc r theo l). */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || []).map(String);
const so = (re, s) => { const m = re.exec(s); assert.ok(m, "không đọc được số liệu: " + re); return m.slice(1).map(val); };
// câu sắp xếp theo thứ tự thời gian: mỗi ô là một sự kiện của SU_KIEN, khác năm; lời giải ghi năm từng sự kiện
const theoNam = (q) => {
  const sk = q.o.map(suKien); sk.forEach(([, , ghi]) => assert.ok(q.x.includes(ghi), "lời giải ghi năm " + ghi));
  assert.equal(new Set(sk.map(([, y]) => y)).size, sk.length, "các sự kiện khác năm");
  return [...q.o].sort((a, b) => suKien(a)[1] - suKien(b)[1]);
};
// sơ đồ vị trí: ô ghi chữ khớp bảng TIEP_GIAP, hai ô đánh số; đáp án “(1) …, (2) …” (quần đảo ghi kèm tỉnh, thành phố theo THUOC); lời giải ghi
// đủ các tên trong bảng, tỉnh, thành phố của quần đảo, hướng của ô đánh số
const viTri = (q, giua) => {
  const { giua: c, huong } = docViTri(q.svg), T = TIEP_GIAP[c], o = {}, x = q.x.toLowerCase();
  assert.equal(c, giua, "ô giữa của sơ đồ"); assert.ok(T, "có bảng nơi tiếp giáp của " + c);
  Object.entries(huong).forEach(([h, chu]) => { assert.ok(T[h], `phía ${h} của ${c} không có trong bảng`); if (/^\(\d\)$/.test(chu)) { o[chu] = T[h]; assert.ok(x.includes("phía " + h), "lời giải ghi hướng " + h); } else assert.equal(chu, T[h], `ô phía ${h}`); });
  assert.deepEqual(Object.keys(o).sort(), ["(1)", "(2)"], "hai ô đánh số (1), (2)");
  Object.values(T).forEach((t) => assert.ok(x.includes(t.toLowerCase()) && (!THUOC[t] || x.includes(THUOC[t].toLowerCase())), "lời giải ghi " + t + (THUOC[t] ? ", " + THUOC[t] : "")));
  return Object.keys(o).sort().map((k) => `${k} ${o[k]}${THUOC[o[k]] ? ` (${THUOC[o[k]]})` : ""}`).join(", ");
};
let namHoi = null; // năm của mốc được hỏi trên trục thời gian (câu khác trong kho không ghi năm này)
const CHECKS = [
  // Lịch sử và Địa lí: Đề 1
  { id: L.de1, has: "Xếp các phát minh dưới đây trong cách mạng công nghiệp", right: theoNam },
  { id: L.de1, has: "Trên trục thời gian dưới đây về phong trào Tây Sơn, mốc (2)", right: (q) => {
    const moc = docTruc(q.svg), sk = q.o.map(suKien), x = q.x.toLowerCase();
    assert.deepEqual(moc.map((m) => m.nhan), ["(1)", "(2)", "(3)"], "ba mốc (1), (2), (3) theo thứ tự năm");
    moc.forEach((m) => { assert.ok(x.includes(`mốc ${m.nhan} là năm ${m.nam}`), "lời giải ghi năm của mốc " + m.nhan); assert.ok(sk.some(([, y]) => y === m.nam), `mốc ${m.nhan} (năm ${m.nam}) là năm của một sự kiện trong các lựa chọn`); });
    sk.forEach(([, , ghi]) => assert.ok(q.x.includes("năm " + ghi), "lời giải ghi năm " + ghi));
    assert.equal(new Set(sk.map(([, y]) => y)).size, sk.length, "các sự kiện khác năm");
    namHoi = moc[1].nam; return q.o.find((o) => suKien(o)[1] === namHoi); } },
  { id: L.de1, has: "Xếp các sự kiện dưới đây của phong trào công nhân", right: theoNam },
  { id: L.de1, has: "Tính chiều dài theo hướng bắc – nam của phần đất liền", right: (q) => {
    const t = toaDo(q.q); assert.ok(t.length === 2 && t.every((d) => d.h === "B"), "hai vĩ độ Bắc");
    assert.deepEqual(t.map((d) => `${d.d}°${d.p}'`), ["8°34'", "23°23'"], "toạ độ phần đất liền theo sách (tr. 95)");
    const [k] = so(/mỗi độ vĩ dài khoảng (\d+) km/, q.q), phut = (t[1].d * 60 + t[1].p) - (t[0].d * 60 + t[0].p), v = Math.round((phut / 60) * k);
    assert.ok(q.unit === "km" && q.tol <= 5 && q.x.includes(`= ${doPhut(phut)}`) && q.x.includes(`≈ ${vn(v)}`), "lời giải ghi số độ và kết quả");
    assert.ok(Math.abs(15 * k - v) > q.tol, "tol không nhận cách làm tròn 15 độ"); return v; } },
  { id: L.de1, has: "Nối mỗi loại khoáng sản với nơi tập trung chủ yếu", right: (q) => {
    const thua = q.r[q.l.length]; assert.ok(!Object.values(KHOANG).includes(thua), "ô thừa không phải nơi tập trung của khoáng sản nào trong bảng");
    return q.l.map((k) => { assert.ok(KHOANG[k] && q.x.toLowerCase().includes(KHOANG[k].toLowerCase()), "bảng khoáng sản có " + k + ", lời giải ghi nơi tập trung"); return KHOANG[k]; }); } },
  { id: L.de1, has: "biểu đồ khí hậu của địa điểm A", right: (q) => {
    const { mua, nhiet } = docBieuDo(q.svg), nong = viTriLon(nhiet), lanh = viTriNho(nhiet), bd = Math.max(...nhiet) - Math.min(...nhiet);
    const muaMua = mua.map((v, i) => (v > 100 ? i + 1 : 0)).filter(Boolean), duoi20 = nhiet.filter((v) => v < 20).length;
    const LUAT = [
      [/^Tháng có nhiệt độ trung bình cao nhất là tháng (\d+)\.$/, (m) => +m[1] === nong],
      [/^Mùa mưa \(các tháng có lượng mưa trên 100 mm\) kéo dài từ tháng (\d+) đến tháng (\d+)\.$/, (m) => muaMua.join() === Array.from({ length: +m[2] - +m[1] + 1 }, (_, i) => +m[1] + i).join()],
      [/^Có (\d+) tháng nhiệt độ trung bình dưới 20 °C\.$/, (m) => +m[1] === duoi20],
      [/^Biên độ nhiệt năm \(hiệu số nhiệt độ tháng cao nhất và tháng thấp nhất\) nhỏ hơn (\d+) °C\.$/, (m) => bd < +m[1]]
    ];
    assert.ok(q.x.includes(`khoảng ${nf1(Math.max(...nhiet))} °C`) && q.x.includes(`khoảng ${nf1(Math.min(...nhiet))} °C`) && q.x.includes(`biên độ khoảng ${nf1(bd)} °C`) && q.x.includes(`chỉ có ${duoi20} tháng`) && q.x.includes(`tháng ${lanh}`), "lời giải ghi đúng số đọc từ hình");
    assert.ok(q.x.toLowerCase().includes(`tổng lượng mưa cả năm khoảng ${vn(sum(mua))} mm`), "lời giải ghi tổng lượng mưa cả năm tính từ hình");
    return q.o.map((o) => { const l = LUAT.map(([re, f]) => [re.exec(o), f]).filter(([m]) => m); assert.equal(l.length, 1, "ý nào cũng có luật: " + o); return l[0][1](l[0][0]); }); } },
  { id: L.de1, has: "Mùa lũ của con sông này kéo dài bao nhiêu tháng", right: (q) => {
    const ll = [...q.q.matchAll(/tháng (\d+): ([\d ]+?)(?=;|\.)/g)].map((m) => [+m[1], val(m[2])]);
    assert.deepEqual(ll.map(([t]) => t), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], "đủ lưu lượng 12 tháng");
    const [tb] = so(/Lưu lượng trung bình năm của sông là ([\d ]+) m³\/s/, q.q), v = ll.map(([, x]) => x);
    assert.ok(close(sum(v) / 12, tb), `lưu lượng trung bình năm ${tb}, tính được ${sum(v) / 12}`);
    const lu = ll.filter(([, x]) => x > tb).map(([t]) => t);
    assert.ok(lu.every((t, i) => i === 0 || t === lu[i - 1] + 1), "các tháng lũ liền nhau");
    assert.ok(v.every((x) => Math.abs(x - tb) >= 100), "không tháng nào sát lưu lượng trung bình năm");
    assert.ok(q.unit === "tháng" && q.x.includes(`tháng ${lu.slice(0, -1).join(", ")} và ${lu[lu.length - 1]}`), "lời giải ghi các tháng lũ"); return lu.length; } },
  // Lịch sử và Địa lí: Đề 2
  { id: L.de2, has: "Tính từ khi khởi nghĩa bùng nổ đến khi đánh tan quân Thanh", right: (q) => {
    const y = nam(q.q); assert.deepEqual(y, [1771, 1789], "năm theo sách (tr. 36, 39): khởi nghĩa năm 1771, đại phá quân Thanh đầu năm 1789");
    assert.ok(q.unit === "năm" && q.x.includes(`${y[1]} − ${y[0]} = ${y[1] - y[0]}`), "lời giải ghi phép trừ"); return y[1] - y[0]; } },
  { id: L.de2, has: "Nối mỗi làng nghề thủ công nổi tiếng", right: (q) => {
    const ten = (l) => l.replace(/\s*\(.*\)$/, ""), thua = q.r[q.l.length];
    assert.ok(!q.l.some((l) => LANG_NGHE[ten(l)] === thua), "ô thừa không phải nghề của làng nào trong câu");
    return q.l.map((l) => { const n = LANG_NGHE[ten(l)]; assert.ok(n, "bảng làng nghề có " + l); return n; }); } },
  { id: L.de2, has: "Hai ô đánh số (1), (2) lần lượt là quần đảo nào", right: (q) => viTri(q, "Việt Nam") },
  { id: L.de2, has: "Dựa vào các số đó, mỗi ý sau đúng hay sai", right: (q) => {
    const t = toaDo(q.q), V = t.filter((d) => d.h === "B"), K = t.filter((d) => d.h === "Đ");
    assert.deepEqual(t.map((d) => `${d.d}°${String(d.p).padStart(2, "0")}'${d.h}`), ["8°34'B", "23°23'B", "102°09'Đ", "109°28'Đ"], "toạ độ phần đất liền theo sách (tr. 95)");
    const dv = V[1].v - V[0].v, dk = K[1].v - K[0].v, CHI_TUYEN = 23 + 27 / 60;
    const LUAT = [
      [/^Theo chiều bắc – nam, phần đất liền trải qua gần (\d+) vĩ độ\.$/, (m) => dv < +m[1] && dv > +m[1] - 0.5],
      [/^Theo chiều tây – đông, phần đất liền trải qua hơn (\d+) kinh độ\.$/, (m) => dk > +m[1]],
      [/^Phần đất liền nằm ở nửa cầu Tây\.$/, () => K.every((d) => d.h === "T")],
      [/^Toàn bộ phần đất liền nằm giữa Xích đạo và chí tuyến Bắc \(23°27'B\)\.$/, () => V.every((d) => d.v > 0 && d.v < CHI_TUYEN)]
    ];
    assert.ok(q.x.includes(`= ${doPhut(Math.round(dv * 60))}`) && q.x.includes(`= ${doPhut(Math.round(dk * 60))}`), "lời giải ghi số vĩ độ, kinh độ tính được");
    return q.o.map((o) => { const l = LUAT.map(([re, f]) => [re.exec(o), f]).filter(([m]) => m); assert.equal(l.length, 1, "ý nào cũng có luật: " + o); return l[0][1](l[0][0]); }); } },
  { id: L.de2, has: "thể hiện khí hậu của địa điểm B", right: (q) => {
    const { mua, nhiet } = docBieuDo(q.svg), nong = viTriLon(nhiet), mn = viTriLon(mua);
    const kho = mua.map((v, i) => (v < 100 ? i + 1 : 0)).filter(Boolean);
    assert.ok(q.x.includes(`ở tháng ${nong} (khoảng ${nf1(Math.max(...nhiet))} °C)`) && q.x.includes(`ở tháng ${mn} (khoảng ${Math.max(...mua)} mm)`), "lời giải ghi đúng số đọc từ hình");
    assert.ok(Math.min(...nhiet) > 25 && /các tháng đều trên 25 °C/.test(q.x), "lời giải: nhiệt độ các tháng đều trên 25 °C");
    assert.ok(Math.max(...nhiet) - Math.min(...nhiet) < 9 && /biên độ nhiệt nhỏ/.test(q.x), "lời giải: biên độ nhiệt nhỏ");
    assert.ok(kho.join() === "1,2,3,4,12" && /mùa khô kéo dài từ tháng 12 đến hết tháng 4/.test(q.x), "lời giải: mùa khô từ tháng 12 đến hết tháng 4");
    assert.ok(q.x.toLowerCase().includes(`tổng lượng mưa cả năm khoảng ${vn(sum(mua))} mm`), "lời giải ghi tổng lượng mưa cả năm tính từ hình");
    const dung = q.o.filter((o) => { const m = /^Tháng nóng nhất là tháng (\d+); tháng mưa nhiều nhất là tháng (\d+)$/.exec(o); assert.ok(m, "lựa chọn viết theo mẫu: " + o); return +m[1] === nong && +m[2] === mn; });
    assert.equal(dung.length, 1, "chỉ một lựa chọn đúng"); return dung[0]; } },
  // GDCD
  { id: G.de1, has: "Câu tục ngữ nào dưới đây nói về truyền thống tôn sư trọng đạo", right: () => "Không thầy đố mày làm nên" },
  { id: G.de1, has: "Sắp xếp các việc Ngân làm theo đúng thứ tự", right: (q) => {
    const buoc = (o) => { const m = BUOC.filter(([k]) => o.includes(k)); assert.equal(m.length, 1, "không nhận ra đúng một bước: " + o); return m[0][1]; };
    assert.deepEqual(q.o.map(buoc).sort(), [1, 2, 3, 4], "bốn bước đầu của kế hoạch");
    return [...q.o].sort((a, b) => buoc(a) - buoc(b)); } },
  { id: G.de2, has: "Thành ngữ nào dưới đây chỉ thái độ không bảo vệ lẽ phải", right: () => "Gió chiều nào che chiều ấy" }
];

/* ---------- tính lại ---------- */
const KHO = {}; // mã pool → câu trong kho (câu của hai đề cố định, mỗi câu ghi src)
[L, G].forEach((s) => {
  const p = bank(s.pool), de = s.from.map(bank);
  assert.ok(de.every((d) => d.minutes === p.minutes && d.n === p.n && d.questions.length === d.n), s.pool + ": hai đề cùng số phút, số câu như danh mục");
  assert.equal(p.questions.length, sum(de.map((d) => d.n)), s.pool + ": kho là câu của hai đề cố định, không có câu riêng");
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
  const want = c.right(q), got = q.type === "fill" ? q.ans[0] : q.type === "num" ? q.ans : q.type === "tf4" ? q.a : q.type === "order" ? q.o : q.type === "match" ? q.r.slice(0, q.l.length) : q.o[0];
  if (typeof want === "number") assert.ok(typeof got === "number" && close(got, want), at + ": đáp án " + got + ", tính được " + want);
  else assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
  checked.add(q); n++;
});
// câu trả lời bằng số, câu điền có đáp án là số, câu có hình, câu sắp xếp, câu nối nào cũng phải được tính lại ở trên
kho.filter((q) => q.type === "num" || q.svg || q.type === "order" || q.type === "match" || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)));
assert.ok(KHO[L.pool].filter((q) => q.svg).length >= 4 && L.from.every((id) => KHO[L.pool].filter((q) => q.src === id && q.svg).length >= 2), "Lịch sử và Địa lí: bốn câu có hình, đề nào cũng có hai câu");
// đủ ba loại hình của phiên: trục thời gian, sơ đồ vị trí có mũi tên chỉ hướng bắc, biểu đồ khí hậu
assert.ok(["Trục thời gian", "Sơ đồ", "Biểu đồ nhiệt độ và lượng mưa"].every((t) => KHO[L.pool].some((q) => q.svg && q.svg.includes("<title>" + t))), "Lịch sử và Địa lí: có trục thời gian, sơ đồ vị trí, biểu đồ khí hậu");
// câu nối: một ô thừa, cặp nối không có chữ chung (không đoán được bằng chữ giống nhau)
kho.filter((q) => q.type === "match").forEach((q) => {
  assert.equal(q.r.length, q.l.length + 1, "câu nối có một ô thừa: " + q.q.slice(0, 50));
  q.l.forEach((l, i) => { const b = tuDon(q.r[i]); assert.ok(![...tuDon(l)].some((w) => b.has(w)), `cặp nối “${l}” – “${q.r[i]}” có chữ chung`); });
});
// năm thuộc thế kỉ nào (“Năm 1777 thuộc thế kỉ XVIII”) tính lại; thế kỉ ghi cạnh một sự kiện có năm theo sách (THE_KI; “đầu”, “giữa”,
// “cuối” thì thế kỉ tính lại từ năm của sách (đầu: năm 1–30 của thế kỉ, giữa: 31–70, cuối: 71–100); ý đúng/sai thì đáp án khớp (sự kiện ghi
// ở đề bài hay ở ý); kho Lịch sử và Địa lí có ít nhất hai chỗ như vậy
{
  const KHUC = { "đầu": [1, 30], "giữa": [31, 70], "cuối": [71, 100] }, dung = (y, khuc, r) => theKi(y) === r && (!khuc || ((y - 1) % 100) + 1 >= KHUC[khuc][0] && ((y - 1) % 100) + 1 <= KHUC[khuc][1]);
  const cau = (s) => String(s).split(/(?<=[.;?!])\s+/), suKienKi = (s) => THE_KI.filter(([k]) => s.includes(k));
  let soKi = 0;
  KHO[L.pool].forEach((q) => {
    chu(q).forEach((t) => [...t.matchAll(/[Nn]ăm (\d{1,4}) thuộc thế kỉ ([IVX]+)\b/g)].forEach((m) => { assert.equal(m[2], theKi(+m[1]), `“${m[0]}”: năm ${m[1]} thuộc thế kỉ ${theKi(+m[1])}`); soKi++; }));
    const ki = (s, ngu) => { const m = /(?:(đầu|giữa|cuối) )?thế kỉ ([IVX]+)\b/.exec(s), e = suKienKi(ngu + " " + s); return m && e.length === 1 ? { ok: dung(e[0][1], m[1], m[2]), m, e: e[0] } : null; };
    [q.x].concat(q.type === "mc" ? [q.q, q.o[0]] : [q.q]).forEach((t) => cau(t).forEach((s) => { const k = ki(s, ""); if (k) { assert.ok(k.ok, `“${s}”: ${k.e[0]} năm ${k.e[1]}, thế kỉ ${theKi(k.e[1])}`); soKi++; } }));
    if (q.type === "tf4") q.o.forEach((o, i) => { const k = ki(o, q.q); if (k) { assert.equal(q.a[i], k.ok, `“${o}”: ${k.e[0]} năm ${k.e[1]}, thế kỉ ${theKi(k.e[1])}`); soKi++; } });
  });
  assert.ok(soKi >= 2, "Lịch sử và Địa lí: có câu, lời giải ghi thế kỉ để tính lại"); n += soKi;
}

/* ---------- mức độ và ma trận ---------- */
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
// chữ của nhãn chủ đề (bỏ phần trong ngoặc), tách theo “ và ”, “, ”
const phanNhan = (t) => t.replace(/\s*\([^)]*\)$/, "").split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
const goc = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const CHUNG = new Set(["nào dưới", "dưới đây", "đây là", "là một", "mỗi ý", "ý sau", "sau đúng", "đúng hay", "hay sai", "ý nào", "nào đúng", "nào sai", "nào sau", "sau đây"]);
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
    assert.ok(mc.filter((q) => hon(q, (a, b2) => a > b2)).length <= mc.length / 3, s.pool + ": đáp án đúng là lựa chọn dài nhất ở quá một phần ba số câu nhiều lựa chọn");
    assert.ok(mc.filter((q) => hon(q, (a, b2) => a < b2)).length <= mc.length / 3, s.pool + ": đáp án đúng là lựa chọn ngắn nhất ở quá một phần ba số câu nhiều lựa chọn");
  }
  // đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
  K.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? q.ans : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => { if (d.toLowerCase().includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => o.toLowerCase().includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); });
  // không gần trùng câu của các kho cùng môn đã có, cả kho lớp 7 và lớp 9 (7-lsdl.js, 9-lsdl.js; 7-gdcd.js, 9-gdcd.js; Rút ra N25, như
  // tests/lsdl-gdcd7-ck1.js): đề bài cùng các lựa chọn, ô nối, ô sắp xếp có từ một nửa số cặp hai âm tiết liền nhau (tính trên câu ít cặp
  // hơn, bỏ các cặp có ở mọi câu như “nào dưới đây” và cặp của nhãn chủ đề) chung với một câu cũ thì báo
  {
    const cua = new Set(s.from.concat(s.pool)), can = { "8-lsdl.js": ["7-lsdl.js", "9-lsdl.js"], "8-gdcd.js": ["7-gdcd.js", "9-gdcd.js"] }[s.file];
    const cu = BANKS.filter((b2) => !cua.has(b2.id) && b2.subject === p.subject).flatMap((b2) => b2.questions.filter((q) => !b2.pool || q.src === b2.id).map((q, i) => ({ at: b2.id + "#" + (i + 1), f: b2.file, c: capAm(q) })));
    assert.ok(can && can.every((f) => cu.some((e) => e.f === f)), s.pool + ": có kho lớp 7, lớp 9 cùng môn để so");
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
// Lịch sử và Địa lí: số câu Lịch sử, Địa lí của mỗi đề ghi đúng ở note (chủ đề Lịch sử đứng trước “Vị trí địa lí và phạm vi lãnh thổ Việt
// Nam”), hai phần gần cân (hơn kém nhau không quá một câu); note nhắc trường học Bài 12 Lịch sử hay Chương 3 Địa lí ở học kì I
{
  const T = Object.keys(bank(L.pool).pool.matrix), dau = T.indexOf("Vị trí địa lí và phạm vi lãnh thổ Việt Nam"); assert.ok(dau > 0);
  L.from.forEach((id) => {
    const d = bank(id), ls = d.questions.filter((q) => T.indexOf(q.topic) < dau).length;
    assert.ok(d.note.includes(`${ls} câu Lịch sử, ${d.n - ls} câu Địa lí`), id + ": note ghi số câu Lịch sử, Địa lí");
    assert.ok(Math.abs(2 * ls - d.n) <= 1, id + ": phần Lịch sử, phần Địa lí gần cân");
    assert.ok(/Bài 12/.test(d.note) && /Chương 3/.test(d.note), id + ": note nhắc Bài 12 Lịch sử, Chương 3 Địa lí");
  });
}
// GDCD: Bài 4–6 nhiều câu hơn các bài đầu; note nhắc trường dạy Bài 7 ở học kì I; tên văn bản luật theo sách in năm 2026 (Hiến pháp năm
// 2013 ghi kèm “(sửa đổi, bổ sung năm 2025)”; luật ghi năm như sách)
{
  const M = bank(G.pool).pool.matrix, so = Object.values(M).map(sum);
  assert.ok(Math.min(...so.slice(3)) > Math.max(...so.slice(0, 3)), "GDCD: Bài 4–6 nhiều câu hơn Bài 1–3");
  G.from.forEach((id) => assert.ok(/Bài 7/.test(bank(id).note), id + ": note nhắc Bài 7"));
  const LUAT = ["Luật Bảo vệ môi trường năm 2020", "Luật Lâm nghiệp năm 2017", "Luật Địa chất và Khoáng sản năm 2024", "Luật Thuỷ sản năm 2017", "Luật Tài nguyên nước năm 2023"];
  KHO[G.pool].forEach((q) => chu(q).forEach((t) => {
    [...t.matchAll(/Hiến pháp(?: năm \d{4})?/g)].forEach((m) => assert.ok(t.slice(m.index).startsWith("Hiến pháp năm 2013 (sửa đổi, bổ sung năm 2025)"), q.src + ": Hiến pháp ghi như sách: " + t.slice(m.index, m.index + 60)));
    [...t.matchAll(/Luật [A-ZĐ][^.,;:()“”]*?năm \d{4}/g)].forEach((m) => assert.ok(LUAT.includes(m[0]), q.src + ": tên luật không có trong sách GDCD 8 Bài 5: " + m[0]));
  }));
}
// GDCD: câu tình huống là chính (Rút ra N9-ck1-lsdl-gdcd): đề bài (câu đúng/sai 4 ý: cả các ý) kể việc làm, lời nói của một người cụ thể
// (tên riêng, “Bà”, “Bác”, “Ông”…, “Nhóm”, “Xã”, “Một số người”) hay của một nơi cụ thể (“Cửa hàng”, “Trường”, “Lớp”, “Công ty”); từ một nửa kho
{
  const AI = "Anh|Chị|Bố|Mẹ|Ông|Bà|Bác|Cô|Chú|Nhóm|Xã|Phường|Lớp|Trường|Gia đình|Cửa hàng|Công ty|Một số người|Một người|Một bạn";
  const TEN = "Phong|Thu Trang|Minh Tâm|Gia Hân|Thư|Khang|Quỳnh|Thảo Vy|Diệp|Khoa|Lộc|Ánh|Trinh|Đạt|Phúc|Hào|Nguyệt|Quang Vinh|Khánh Linh|Gia Bảo|Kiều Anh|Minh Khôi|Tường Vi|Tuệ|Quyên|Huyền|Diệu|Thiện|Ngân|Ngọc Hân|Hoàng Long|Bảo Ngọc|Kim Thoa|Mai Anh|Thanh Trúc|Nhật Huy|Bảo Hân|Tuấn Kiệt|Tiến|Nhi|Kha|Mỹ Tiên|Hoài An|Minh Đức|Thảo My|Văn Hiếu|Trọng Nhân|Vân Anh|Tấn Phát|Ngọc Ánh|Bảo Trâm|Quốc Việt|Duy Khánh|Châu Anh";
  const RE = new RegExp(`(?<!\\p{L})(?:${AI}|${TEN})(?!\\p{L})`, "u");
  const tinhHuong = (q) => RE.test(q.q + (q.type === "tf4" ? " " + q.o.join(" ") : ""));
  assert.ok(tinhHuong({ q: "Bà của Khang kể về làng." }) && tinhHuong({ q: "Mỗi ý sau đúng hay sai?", type: "tf4", o: ["Ngân lập kế hoạch học tập."] }) && !tinhHuong({ q: "Lẽ phải là gì?" }) && !tinhHuong({ q: "Việc làm nào dưới đây thể hiện lao động sáng tạo?" }), "tự thử câu tình huống");
  const K = KHO[G.pool], th = K.filter(tinhHuong).length;
  assert.ok(th * 2 >= K.length, `GDCD: câu tình huống mới có ${th}/${K.length}`);
  console.log(`GDCD: ${th}/${K.length} câu tình huống.`);
}
// chữ như sách in năm 2026: không “huyện”, “63 tỉnh”, tên tỉnh đã nhập năm 2025; dấu thanh kiểu sách (hoá, thuỷ, khoẻ); số ngăn hàng nghìn
// bằng khoảng trắng, dấu phẩy thập phân
const TINH_CU = ["Hà Giang", "Yên Bái", "Bắc Kạn", "Vĩnh Phúc", "Hoà Bình", "Bắc Giang", "Thái Bình", "Hải Dương", "Hà Nam", "Nam Định", "Quảng Bình",
  "Quảng Nam", "Kon Tum", "Bình Định", "Phú Yên", "Ninh Thuận", "Bình Thuận", "Đắk Nông", "Bà Rịa", "Bình Dương", "Bình Phước", "Long An", "Tiền Giang",
  "Bến Tre", "Trà Vinh", "Hậu Giang", "Sóc Trăng", "Bạc Liêu", "Kiên Giang", "Thừa Thiên"];
kho.forEach((q) => chu(q).concat(q.type === "fill" ? q.ans : []).forEach((s) => {
  const at = q.src + ": “" + s.slice(0, 60) + "”";
  assert.ok(!/(?<![\p{L}])(?:huyện|63 tỉnh|64 tỉnh)(?![\p{L}])/iu.test(s), at + ": đơn vị hành chính cũ");
  const s2 = s.replace(/Thái Bình Dương/g, "");
  TINH_CU.forEach((t) => assert.ok(!new RegExp(`(?<![\\p{L}])${t}(?![\\p{L}])`, "u").test(s2), at + ": tên tỉnh đã nhập “" + t + "”"));
  assert.ok(!/(?<![\p{L}])(?:hóa|hòa|thủy|thụy|tỏa|hủy|tùy|khỏe|lũy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu sách (hoá, thuỷ, khoẻ)");
  assert.ok(!/(?<![,\d])\d{5,}/.test(s) && !/\d\.\d/.test(s), at + ": số viết sai cách");
}));

/* ---------- đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
[L, G].forEach((s) => {
  const deBai = BANKS.filter((b) => b.file === s.file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
});

/* ---------- dò lộ đáp án (Rút ra N5; bộ dò của tests/lsdl-gdcd7-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung cả chủ đề
   (cả câu cùng ô), đề ngẫu nhiên rút chung các chủ đề. Đáp án là số (từ hai chữ số, hoặc số thập phân) chỉ tìm ở vị trí kết quả của câu
   kia (ngay sau “=”, “là”, “bằng”, “được”); cặp nối: câu kia có cả hai vế; câu về thứ tự thời gian (câu sắp xếp): câu kia không ghi năm
   nào của các sự kiện đó (cách ghi trong lời giải); câu trục thời gian: câu khác không ghi năm của mốc được hỏi. Đáp án bằng chữ (lựa chọn
   đúng của câu trắc nghiệm, đáp án câu điền) có ở câu kia thì chỉ in ra khi chạy với DO_LO=1 để người làm xem, danh sách đã xem ghi ở
   DA_XEM. ---------- */
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
// t có cụm s đứng thành từ riêng (“Na” không khớp “Nam”)
const coCum = (t, s) => { for (let i = t.indexOf(s); i >= 0; i = t.indexOf(s, i + 1)) if (!/[\p{L}\p{N}]/u.test(t[i - 1] || " ") && !/[\p{L}\p{N}]/u.test(t[i + s.length] || " ")) return true; return false; };
// năm của câu về thứ tự thời gian: cách ghi trong lời giải của mọi sự kiện có trong câu sắp xếp
const ngayCua = (q) => (q.type === "order" && q.o.every((o) => SU_KIEN.some(([k]) => o.toLowerCase().includes(k.toLowerCase()))) ? [...new Set(q.o.map((d) => suKien(d)[2]))] : []);
const doLo = (qs, tenCau, cungLuc) => {
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
      ngay.filter((g) => C.some((t) => coCum(t, g))).forEach((g) => lo.push(at + "năm " + g));
      cum.filter((s) => T.some((t) => coCum(t, s.toLowerCase()))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const ten = new Map();
[L, G].forEach((s) => s.from.forEach((id) => KHO[s.pool].filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace(/8-ck1-/, "-") + "#" + (i + 1)))));
const loAll = [], chuAll = [];
[L, G].forEach((s) => { const r = doLo(KHO[s.pool], (q) => ten.get(q), () => true); loAll.push(...r.lo); chuAll.push(...r.chuLo); });
// câu trục thời gian: năm của mốc được hỏi không có ở câu khác của kho
{
  assert.ok(namHoi, "đã đọc trục thời gian");
  const truc = kho.find((q) => q.q.includes("Trên trục thời gian dưới đây về phong trào Tây Sơn, mốc (2)"));
  KHO[L.pool].filter((q) => q !== truc && chu(q).some((t) => coCum(t, String(namHoi)))).forEach((q) => loAll.push(`${ten.get(q)} → ${ten.get(truc)}: năm ${namHoi}`));
}
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu rút được cùng lúc (xem tay):\n" + chuAll.join("\n"));
// đã xem (Phiên N8-ck1-lsdl-gdcd)
const DA_XEM = [];
assert.deepEqual(chuAll, DA_XEM, "đáp án bằng chữ có ở câu rút được cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(loAll, [], "lộ đáp án:\n" + loAll.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 18”, “là 1 645 km”, năm của câu về thứ tự, cặp nối, lựa chọn đúng
{
  const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thu = (qs) => { const r = doLo(qs, (q) => q.q.slice(0, 12), () => true); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const khac = tim("Các cánh cung Sông Gâm, Ngân Sơn, Bắc Sơn, Đông Triều"), khac2 = tim("Lẽ phải là gì");
  assert.ok(khac && khac2, "câu dùng để tự thử bộ dò");
  assert.deepEqual(thu([tim("Tính từ khi khởi nghĩa bùng nổ đến khi đánh tan quân Thanh"), gia(khac, "Ví dụ: 1789 − 1771 = 18 (năm).")]), ["18"]);
  assert.deepEqual(thu([tim("Tính chiều dài theo hướng bắc – nam"), gia(khac, "Chiều dài đó là 1 645 km.")]), ["1645"]);
  assert.deepEqual(thu([tim("Xếp các phát minh dưới đây"), gia(khac, "Năm 1784, Giêm Oát hoàn thành máy hơi nước.")]), ["năm 1784"]);
  assert.deepEqual(thu([tim("Nối mỗi loại khoáng sản"), gia(khac, "Than đá tập trung chủ yếu ở Quảng Ninh.")]), ["Than đá → Quảng Ninh"]);
  assert.deepEqual(thu([tim("Câu tục ngữ nào dưới đây nói về truyền thống tôn sư trọng đạo"), gia(khac2, "Người xưa dạy: Không thầy đố mày làm nên.")]), ["Không thầy đố mày làm nên"]);
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book; và với câu của các kho khác ---------- */
// tên riêng nhiều chữ (người, nước, địa danh, triều đại, tổ chức, văn bản) như sách: mỗi tên tính là một từ (như tests/lsdl-gdcd7-ck1.js)
const GOP = ["s m a r t", "sac lo", "crom oen", "bo xton", "xa ra to ga", "looc tao", "oa sinh ton", "lu i", "gien ni", "ac rai", "giem oat", "e cac rai",
  "xti phen xon", "ma lac ca", "phi lip pin", "in do ne xi a", "ma lai xi a", "bo dao nha", "tay ban nha", "ha lan", "mac dang dung", "nguyen kim",
  "trinh kiem", "nguyen hoang", "song gianh", "luy thay", "nguyen huu canh", "gia dinh", "tran bien", "phien tran", "hoang sa", "truong sa",
  "bac hai", "hoang cong chat", "nguyen danh phuong", "nguyen huu cau", "muong thanh", "tam dao", "do son", "tay son", "nguyen nhac", "nguyen hue",
  "nguyen lu", "rach gam", "xoai mut", "phu xuan", "thang long", "ton si nghi", "tam diep", "bien son", "quang trung", "ngoc hoi", "dong da",
  "tho ha", "bat trang", "la khe", "nho lam", "chau khe", "doc so", "ke cho", "pho hien", "hoi an", "dang trong", "dang ngoai", "nam trieu",
  "bac trieu", "le trung hung", "dai viet", "cong giao", "thien chua giao", "quoc ngu", "cac mac", "ang ghen", "pa ri", "cong xa pa ri", "si ca go",
  "roc phe lo", "mooc gan", "quoc te thu nhat", "quoc te thu hai", "trung quoc", "an do", "dong nam a", "bac my", "chau au", "cam pu chia",
  "viet nam", "ha noi", "bien dong", "hoang lien son", "phan xi pang", "truong son bac", "truong son nam", "song gam", "ngan son", "bac son",
  "dong trieu", "dong bang song hong", "dong bang song cuu long", "bach ma", "song hong", "song da", "thu bon", "me cong", "ton le sap", "son la",
  "sa pa", "ba na", "sam son", "cua lo", "lang co", "xich dao", "chi tuyen bac", "thai binh duong", "quang ninh", "lao cai", "tay nguyen",
  "an giang", "nghe an", "bac ninh", "ninh binh", "thanh hoa", "dong thap", "dien bien", "phu tho", "hai phong", "quang tri", "gia lai",
  "dong ho", "quan ho", "hien phap", "thao vy", "quang vinh", "khanh linh", "gia bao", "kieu anh", "minh khoi", "tuong vi", "kim ngan", "ngoc han",
  "hoang long", "bao ngoc", "kim thoa", "mai anh", "thanh truc", "nhat huy", "bao han", "tuan kiet", "my tien", "hoai an", "minh duc", "thao my",
  "van hieu", "trong nhan", "van anh", "tan phat", "ngoc anh", "bao tram", "quoc viet", "duy khanh", "chau anh"
].sort((a, b) => b.length - a.length);
// câu tục ngữ, thành ngữ, khẩu hiệu, tên tác phẩm, tên văn bản luật trích nguyên văn không tính là chép sách
const TRICH = ["Không thầy đố mày làm nên", "Đói cho sạch, rách cho thơm", "Thương người như thể thương thân", "Tốt gỗ hơn tốt nước sơn",
  "Gió chiều nào che chiều ấy", "Cây ngay không sợ chết đứng", "Một con ngựa đau cả tàu bỏ cỏ", "Ăn ngay nói thật, mọi tật mọi lành",
  "Hiến pháp năm 2013 (sửa đổi, bổ sung năm 2025)", "Luật Bảo vệ môi trường năm 2020", "Luật Lâm nghiệp năm 2017", "Luật Thuỷ sản năm 2017",
  "Luật Tài nguyên nước năm 2023", "Luật Địa chất và Khoáng sản năm 2024", "lấy của người giàu chia cho người nghèo", "phù Lê diệt Trịnh",
  "phù Lê diệt Mạc", "Tự do, Bình đẳng, Bác ái", "Tuyên ngôn Nhân quyền và Dân quyền", "Tuyên ngôn của Đảng Cộng sản",
  "Tình cảnh giai cấp công nhân Anh", "Chiếu khuyến nông", "Chiếu lập học"];
// cụm 3 từ chung của môn (tests/soat-nhap.js bỏ khi dò lộ đáp án dài hơn 3 từ)
const CUM_CHUNG = ["chủ yếu là", "phong tục của", "của dân tộc", "dân tộc việt", "tộc việt nam", "vì đó là", "tôn trọng sự", "việc cần làm", "bảo vệ môi", "vệ môi trường",
  "tài nguyên thiên", "nguyên thiên nhiên", "bảo vệ lẽ", "vệ lẽ phải", "mục tiêu cá", "tiêu cá nhân", "phần đất liền", "thế kỉ xviii", "thế kỉ xvi"];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
const khongDau = nhoChuoi((s) => { let t = " " + TRICH.reduce((x, c) => x.split(c).join(" "), String(s).normalize("NFC")).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim() + " ";
  GOP.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); }); return t.replace(/[aeiouy]+/g, "a").trim(); });
const tuCua = (s) => khongDau(s).split(" ").filter(Boolean);
const chuoi = (s, k) => { const w = tuCua(s), ra = []; for (let i = 0; i + k <= w.length; i++) ra.push(w.slice(i, i + k).join(" ")); return ra; };
const truong = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], q.l || [], q.r || []);
const boChuoi = (ds, k) => { const out = new Map(); ds.forEach(([id, s]) => { const w = tuCua(s); for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k).join(" "); if (!out.has(c)) out.set(c, new Set()); out.get(c).add(id); } }); return out; };
const bao = (bo, k) => [...new Set(kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].filter((c) => bo.has(c)).map((c) => `${ten.get(q)} ~ ${[...bo.get(c)].join(", ")}: ${c}`)))];
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
if (SACH.length) {
  assert.ok(["lich-su-dia-li-8", "giao-duc-cong-dan-8"].every((c) => SACH.some((f) => f.includes(path.join("lop-8", c)))), "OnUp-Book có Lịch sử và Địa lí 8, Giáo dục công dân 8");
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
console.log(n, "câu đã tính lại hoặc đọc lại hình (hai ngân hàng); kho " + kho.length + " câu, " + [L, G].map((s) => s.from.length + " đề cố định " + bank(s.pool).n + " câu").join(" và ") + ".");
console.log("MATH OK");
