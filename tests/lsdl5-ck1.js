// Kiểm tra ngân hàng Lịch sử và Địa lí 5 cuối kì I của Phiên N5-ck1-lsdl (data/banks/5-lsdl.js, lsdl5-ck1-*), theo mẫu tests/lsdl4-ck2.js,
// tests/khoahoc5-ck1.js và các ý chung của các phiên lớp 5 (đoạn “Chung của các phiên lớp 5” ở mục 7 của docs/KE-HOACH-NOI-DUNG.md). Kho = Đề 1
// + Đề 2 + câu riêng của đề ngẫu nhiên; số câu, số đề lấy từ danh mục (không ghi cứng).
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho):
// - số liệu theo sách in năm 2026 (bảng SO_LIEU: 34 đơn vị hành chính cấp tỉnh gồm 28 tỉnh, 6 thành phố; 54 dân tộc; 18 đời Hùng Vương;
//   ba lần Mông – Nguyên xâm lược), lời giải câu số tỉnh, thành phố ghi đúng 28 tỉnh và 6 thành phố;
// - số năm giữa hai sự kiện: năm ghi trong đề đúng bảng NAM (năm của các sự kiện theo sách), đáp án là hiệu, lời giải ghi đúng phép trừ;
//   câu sắp xếp và câu đúng/sai 4 ý về trục thời gian: thứ tự, từng ý tính lại theo bảng NAM;
// - chiều rộng lá cờ bằng 2/3 chiều dài (Quốc kì); hai địa điểm A, B theo nhiệt độ tháng 1, tháng 7 (tháng 1 dưới 18 °C: có mùa đông lạnh,
//   miền Bắc; tháng 1 từ 24 °C và chênh tháng 7 không quá 5 °C: nóng quanh năm, miền Nam); nơi ở cột trái của câu nối thuộc vùng đất, vùng
//   biển hay vùng trời;
// - hình đọc lại từ chuỗi SVG: sơ đồ vị trí tiếp giáp (ô “Việt Nam” ở giữa, mỗi ô khác ở một trong tám hướng, nơi tiếp giáp theo bảng
//   TIEP_GIAP), lược đồ hai quần đảo (vòng số cạnh một nhóm chấm đảo ngoài khơi, bên phải bờ biển; theo mũi tên chỉ hướng bắc, quần đảo
//   phía bắc là Hoàng Sa, phía nam là Trường Sa), biểu đồ cột số dân (trục số, số ở đỉnh cột khớp chiều cao cột, năm dưới mỗi cột), trục
//   thời gian (vạch mốc, số mốc ở trên, năm ở dưới, năm tăng dần sang phải), lược đồ dời đô (hướng từ Hoa Lư đến thành Đại La theo mũi
//   tên chỉ hướng bắc); chữ trong hình từ cỡ 13 và nằm trọn trong khung hình.
// Rồi kiểm tra mức độ, ma trận (10 Biết, 8 Hiểu, 7 Vận dụng; 10 chủ đề theo tên Bài 1–10, Địa lí 11 câu, Lịch sử 14 câu; hai đề cố định và
// câu riêng đều chia đúng ma trận, mỗi ô 3 câu), dạng câu (ít nhất 2 câu đúng/sai 4 ý, kiểu Đ/S không lặp), đáp án đúng không dài hơn hẳn
// lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn, ba lựa chọn
// sai không cùng mở đầu bằng một chữ mà đáp án đúng không có, không lặp chữ của nhãn chủ đề, lời giải không nhắc vị trí phương án, gọi người làm bài là “bạn”, chữ như sách in năm 2026 (“hoà”, “thuỷ”; không
// “huyện”, “63 tỉnh”, tên vùng cũ; tên tỉnh, thành phố là một trong 34 đơn vị hành chính năm 2025; không hỏi “thuộc tỉnh nào”), note (phạm
// vi Bài 1–11, Bài 12, đề cương của trường, đề chung của Sở), đề bài không trùng, rút thử (đúng ma trận, gặp đủ kho; đã làm hết một đề cố
// định thì không rút lại câu của đề đó), dò lộ đáp án giữa mọi cặp câu của kho và lời dặn (đề “Ôn chủ đề” rút chung mọi câu của một chủ
// đề; cách dò ở chú thích của doLo), đề bài không gần trùng câu của data/banks/4-lsdl.js (cặp hai âm tiết liền nhau chung). Có
// ../OnUp-Book (repo riêng tư): mọi trường chữ, cả chữ trong hình, không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp
// nguyên âm, tên riêng nhiều chữ tính là một từ; DO_SACH=1 in chuỗi 6 từ). So thêm với mọi câu của các kho khác, cả câu riêng của các đề
// ngẫu nhiên: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 6 từ và câu gần trùng kho lớp 4.
// Chạy: node tests/lsdl5-ck1.js → in LSDL5 OK. DO_LO=1 in đáp án bằng chữ có ở câu khác để người làm xem.
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
const S = { de1: "lsdl5-ck1-de1", de2: "lsdl5-ck1-de2", pool: "lsdl5-ck1-ngau-nhien" };
const FILE = "5-lsdl.js";
const sum = (a) => a.reduce((s, v) => s + v, 0);
const close = (x, y) => Math.abs(x - y) < 1e-9;
const low = (s) => String(s).normalize("NFC").toLowerCase();
const val = (s) => +String(s).replace(/\s/g, "").replace(",", ".");

/* ---------- danh mục ---------- */
const pool = bank(S.pool);
assert.ok(pool && pool.pool, "thiếu đề ngẫu nhiên " + S.pool);
const DE = pool.pool.from;
assert.deepEqual(DE, [S.de1, S.de2], "from là Đề 1 và Đề 2");
DE.concat(S.pool).forEach((id) => {
  const b = bank(id);
  assert.ok(b.grade === 5 && b.subject === "Lịch sử và Địa lí" && b.minutes === 35 && b.file === FILE, id + ": lớp 5, Lịch sử và Địa lí, 35 phút, file " + FILE);
  if (id !== S.pool) assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
});
const kho = pool.questions, mine = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, sum(DE.map((id) => bank(id).n)) + mine.length, "kho = câu của hai đề cố định + câu riêng");
assert.equal(mine.length, pool.n, "câu riêng của đề ngẫu nhiên: đủ một đề");
{
  const cal = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ck1 = /id: "ck1-l5"[\s\S]*?banks: \[([^\]]*)\]/.exec(cal);
  assert.ok(ck1, "lịch có kì ck1-l5");
  DE.concat(S.pool).forEach((id) => assert.ok(ck1[1].includes(`"${id}"`), id + " gắn vào ck1-l5"));
}
const ten = new Map();
DE.concat(S.pool).forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("lsdl5-ck1-", "").replace("ngau-nhien", "own") + "#" + (i + 1))));

/* ---------- hình SVG ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const pts2 = (s) => { const v = nums(s), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]]); return p; };
const TAGS = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const RECTS = (svg) => TAGS(svg, "rect").map((a) => ({ x: +a.x, y: +a.y, w: +a.width, h: +a.height, fill: a.fill || "none" }));
const CIRCLES = (svg) => TAGS(svg, "circle").map((a) => ({ c: [+a.cx, +a.cy], r: +a.r, fill: a.fill || "none" }));
const LINES = (svg) => TAGS(svg, "line").map((a) => ({ a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], stroke: a.stroke || "none" }));
const POLYS = (svg) => TAGS(svg, "polygon").map((a) => ({ p: pts2(a.points), fill: a.fill || "none" }));
const TEXTS = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start", b: a["font-weight"] === "700" }; });
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const rong = (t) => (t.b ? 0.62 : 0.56) * t.fs * [...t.t].length; // ước bề rộng chữ (Noto Sans)
const daDoc = new Set(); // hình đã đọc lại bằng code
// chữ trong hình từ cỡ 13 và nằm trọn trong khung hình
const chuHinh = (svg, at) => {
  const v = nums(/viewBox="([^"]+)"/.exec(svg)[1]);
  TEXTS(svg).forEach((t) => {
    assert.ok(t.fs >= 13, `${at}: chữ “${t.t}” cỡ ${t.fs}, cần từ cỡ 13`);
    const w = rong(t), x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0];
    assert.ok(x0 >= v[0] && x0 + w <= v[0] + v[2] && t.at[1] - 0.75 * t.fs >= v[1] && t.at[1] + 0.25 * t.fs <= v[1] + v[3], `${at}: chữ “${t.t}” tràn khỏi khung hình`);
  });
};
const lech = (a, b) => Math.abs(((((a - b) % 360) + 540) % 360) - 180); // độ lệch giữa hai góc (độ)
const HUONG = ["đông", "đông bắc", "bắc", "tây bắc", "tây", "tây nam", "nam", "đông nam"];
// hướng từ điểm p đến điểm q (trục y của hình hướng xuống; mũi tên chỉ hướng bắc chỉ lên): một trong tám hướng, lệch không quá 15°
const huong = (p, q) => {
  const g = (Math.atan2(p[1] - q[1], q[0] - p[0]) * 180) / Math.PI, k = ((Math.round(g / 45) % 8) + 8) % 8;
  assert.ok(lech(g, k * 45) <= 15, `hướng lệch ${Math.round(lech(g, k * 45))}° so với hướng ${HUONG[k]}`); return HUONG[k];
};
// mũi tên chỉ hướng bắc: một đoạn thẳng đứng ngay dưới chữ B, đầu tam giác ở đầu trên, chữ B ở trên cùng
const muiTenBac = (svg) => {
  const B = TEXTS(svg).filter((t) => t.t === "B"); assert.equal(B.length, 1, "hình có đúng một chữ B chỉ hướng bắc");
  const ln = LINES(svg).filter((l) => l.a[0] === l.b[0] && Math.abs(l.a[0] - B[0].at[0]) < 1);
  assert.equal(ln.length, 1, "mũi tên chỉ hướng bắc là một đoạn thẳng đứng dưới chữ B");
  const tg = POLYS(svg).filter((g) => g.p.length === 3 && g.p.some(([x]) => Math.abs(x - B[0].at[0]) < 1));
  assert.equal(tg.length, 1, "mũi tên chỉ hướng bắc có một đầu tam giác");
  const dinh = tg[0].p.reduce((a, p) => (p[1] < a[1] ? p : a));
  assert.ok(dinh[1] < Math.min(ln[0].a[1], ln[0].b[1]) && B[0].at[1] < dinh[1], "mũi tên chỉ lên trên: phía trên hình là hướng bắc");
};
/* Sơ đồ vị trí tiếp giáp: ô chữ nhật có chữ ở trong; ô “Việt Nam” ở giữa, mỗi ô khác ở một trong tám hướng so với ô giữa (lệch không quá 15°).
   Trả về { hướng: chữ trong ô }. */
const docViTri = (svg) => {
  daDoc.add(svg); muiTenBac(svg);
  const tx = TEXTS(svg), o = RECTS(svg).map((r) => {
    const chu = tx.filter((t) => t.at[0] > r.x && t.at[0] < r.x + r.w && t.at[1] > r.y && t.at[1] < r.y + r.h).map((t) => t.t).join(" ");
    assert.ok(chu, "ô nào cũng có chữ"); return { chu, c: [r.x + r.w / 2, r.y + r.h / 2] };
  });
  const giua = o.filter((v) => v.chu === "Việt Nam"); assert.equal(giua.length, 1, "một ô giữa ghi Việt Nam");
  const out = {};
  o.filter((v) => v !== giua[0]).forEach((v) => { const h = huong(giua[0].c, v.c); assert.equal(out[h], undefined, "mỗi hướng một ô"); out[h] = v.chu; });
  return out;
};
// nơi tiếp giáp của nước ta theo hướng (Bài 1, Hình 3 bản đồ hành chính năm 2025: Trung Quốc ở phía bắc, Lào ở phía tây, Cam-pu-chia ở
// phía tây nam; Biển Đông ở phía đông và phía nam)
const TIEP_GIAP = { "bắc": "Trung Quốc", "tây": "Lào", "tây nam": "Cam-pu-chia", "đông": "Biển Đông" };
/* Lược đồ hai quần đảo: vòng tròn số (r ≥ 8, một chữ số ở giữa) cạnh một nhóm chấm đảo (r ≤ 4); mọi chấm đảo nằm ngoài khơi, bên phải
   đường bờ biển (path có nét); theo mũi tên chỉ hướng bắc, quần đảo ở phía bắc là Hoàng Sa, ở phía nam là Trường Sa (Bài 1, Bài 3). */
const docQuanDao = (svg) => {
  daDoc.add(svg); muiTenBac(svg);
  const tx = TEXTS(svg), cham = CIRCLES(svg).filter((c) => c.r <= 4);
  const so = CIRCLES(svg).filter((c) => c.r >= 8).map((c) => {
    const t = tx.filter((x) => /^\d$/.test(x.t) && Math.abs(x.at[0] - c.c[0]) < 1 && Math.abs(x.at[1] - 5 - c.c[1]) < 1);
    assert.equal(t.length, 1, "vòng tròn số có một chữ số ở giữa");
    const g = cham.filter((d) => dist(d.c, c.c) < 60); assert.ok(g.length >= 4, `quần đảo số ${t[0].t}: ít nhất 4 chấm đảo gần vòng số`);
    return { n: t[0].t, y: sum(g.map((d) => d.c[1])) / g.length, g };
  });
  assert.deepEqual(so.map((s) => s.n).sort(), ["1", "2"], "hai vòng tròn số 1, 2");
  assert.equal(sum(so.map((s) => s.g.length)), cham.length, "chấm đảo nào cũng thuộc một quần đảo");
  const bo = TAGS(svg, "path").filter((p) => p.stroke && p.stroke !== "none"); assert.equal(bo.length, 1, "một đường bờ biển");
  const xb = Math.max(...nums(bo[0].d.replace(/[A-Za-z]/g, " ")).filter((v, i) => i % 2 === 0));
  assert.ok(cham.every((c) => c.c[0] - c.r > xb), "các đảo nằm ngoài khơi, bên phải đường bờ biển");
  const [bac, nam] = so.slice().sort((a, b) => a.y - b.y);
  assert.ok(nam.y - bac.y > 60, "hai quần đảo cách xa nhau theo chiều bắc – nam");
  const ten2 = { [bac.n]: "Hoàng Sa", [nam.n]: "Trường Sa" };
  return `1: ${ten2[1]}; 2: ${ten2[2]}`;
};
/* Biểu đồ cột một dãy: đường lưới nằm ngang (nét màu line), số ở đầu trái mỗi đường lưới (text-anchor="end", chân chữ thấp hơn vạch 5 đơn
   vị) là giá trị; cột là hình chữ nhật đứng trên đường đáy, số ở đỉnh cột (giữa cột, cao hơn đỉnh 6 đơn vị) khớp chiều cao cột, năm ghi dưới
   đáy giữa cột; trục ghi đơn vị. Trả về [{ nam, v }] theo năm. */
const docCot = (svg, donVi) => {
  daDoc.add(svg);
  const lu = LINES(svg).filter((l) => l.stroke === "line");
  assert.ok(lu.length >= 4 && lu.every((l) => l.a[1] === l.b[1]), "đường lưới nằm ngang");
  const x0 = Math.min(...lu.map((l) => l.a[0])), ys = lu.map((l) => l.a[1]), day = Math.max(...ys), tx = TEXTS(svg);
  const nhan = tx.filter((t) => /^\d[\d ]*$/.test(t.t) && t.anchor === "end" && t.at[0] < x0).map((t) => ({ v: val(t.t), y: t.at[1] }));
  assert.ok(nhan.length >= 3, "trục số có ít nhất 3 số");
  nhan.forEach((n) => assert.ok(ys.some((y) => close(y, n.y - 5)), `số ${n.v} phải đặt ngay cạnh một vạch`));
  const s = [...nhan].sort((a, b) => a.v - b.v), k = (s[0].y - s[1].y) / (s[1].v - s[0].v);
  assert.ok(k > 0, "số lớn ở trên");
  s.forEach((n) => assert.ok(close(n.y, s[0].y - k * (n.v - s[0].v)), `số ${n.v} không đặt đúng vạch`));
  const giaTri = (y) => s[0].v + (s[0].y - 5 - y) / k;
  assert.equal(Math.round(giaTri(day)), 0, "số 0 ở đường đáy");
  assert.ok(tx.some((t) => t.t === donVi && t.anchor === "start" && t.at[1] < Math.min(...ys)), "trục ghi đơn vị " + donVi);
  const namDuoi = tx.filter((t) => t.anchor === "middle" && t.at[1] > day && /^\d{4}$/.test(t.t));
  const cot = RECTS(svg).map((r) => {
    assert.ok(close(r.y + r.h, day), "cột đứng trên đường đáy");
    const cx = r.x + r.w / 2, v = Math.round(giaTri(r.y) * 1000) / 1000;
    const dinh = tx.filter((t) => t.anchor === "middle" && close(t.at[0], cx) && t.at[1] < day);
    assert.equal(dinh.length, 1, "mỗi cột một số ở đỉnh"); assert.ok(close(dinh[0].at[1], r.y - 6), "số ghi ngay trên đỉnh cột");
    assert.equal(val(dinh[0].t), v, `số ở đỉnh cột (${dinh[0].t}) khớp chiều cao cột (${v})`);
    const n = namDuoi.filter((t) => Math.abs(t.at[0] - cx) < 1); assert.equal(n.length, 1, "cột nào cũng có năm ở dưới");
    return { nam: +n[0].t, v };
  });
  assert.ok(cot.length >= 4 && new Set(cot.map((c) => c.nam)).size === cot.length, "ít nhất 4 cột, mỗi năm một cột");
  return cot.sort((a, b) => a.nam - b.nam);
};
/* Trục thời gian: đoạn thẳng nằm ngang dài nhất là trục, đầu mũi tên tam giác ở bên phải (chiều thời gian); mỗi mốc là một vạch đứng cắt
   trục, số mốc “(n)” ở trên, năm ở dưới, cùng hoành độ với vạch; năm tăng dần từ trái sang phải. Trả về { "n": năm }. */
const docTruc = (svg) => {
  daDoc.add(svg);
  const ln = LINES(svg), truc = ln.filter((l) => l.a[1] === l.b[1]).sort((a, b) => Math.abs(b.b[0] - b.a[0]) - Math.abs(a.b[0] - a.a[0]))[0];
  const y = truc.a[1], x1 = Math.max(truc.a[0], truc.b[0]), dau = POLYS(svg).filter((g) => g.p.length === 3);
  assert.equal(dau.length, 1, "trục có một đầu mũi tên"); assert.ok(Math.max(...dau[0].p.map((p) => p[0])) > x1, "mũi tên chỉ chiều thời gian sang phải");
  const tx = TEXTS(svg), out = {};
  const vach = ln.filter((l) => l.a[0] === l.b[0] && Math.min(l.a[1], l.b[1]) < y && Math.max(l.a[1], l.b[1]) > y).sort((a, b) => a.a[0] - b.a[0]);
  assert.ok(vach.length >= 3, "trục có ít nhất 3 mốc");
  const nam = vach.map((v) => {
    const tren = tx.filter((t) => Math.abs(t.at[0] - v.a[0]) < 1 && t.at[1] < y && /^\(\d\)$/.test(t.t));
    const duoi = tx.filter((t) => Math.abs(t.at[0] - v.a[0]) < 1 && t.at[1] > y && /^\d+$/.test(t.t));
    assert.equal(tren.length, 1, "mốc nào cũng có số (n) ở trên"); assert.equal(duoi.length, 1, "mốc nào cũng có năm ở dưới");
    out[tren[0].t.replace(/\D/g, "")] = +duoi[0].t; return +duoi[0].t;
  });
  nam.forEach((v, i) => assert.ok(i === 0 || v > nam[i - 1], "năm tăng dần từ trái sang phải"));
  assert.equal(tx.length, vach.length * 2, "trục chỉ ghi số mốc và năm");
  return out;
};
/* Lược đồ dời đô: hai điểm (vòng tròn r = 7) có tên ghi ngay trên hoặc ngay dưới, cùng hoành độ; hướng đi từ điểm “tu” đến điểm “den” theo
   mũi tên chỉ hướng bắc → "Phía …". */
const docDoiDo = (svg, tu, den) => {
  daDoc.add(svg); muiTenBac(svg);
  const tx = TEXTS(svg), diem = {};
  CIRCLES(svg).filter((c) => c.r === 7).forEach((c) => {
    const t = tx.filter((x) => Math.abs(x.at[0] - c.c[0]) < 1 && Math.abs(x.at[1] - c.c[1]) < 40);
    assert.equal(t.length, 1, "mỗi điểm có một tên ngay trên hoặc dưới"); diem[t[0].t] = c.c;
  });
  assert.ok(diem[tu] && diem[den], "lược đồ có " + tu + " và " + den);
  return "Phía " + huong(diem[tu], diem[den]);
};

/* ---------- bảng tra (theo sách Lịch sử và Địa lí 5 bản chỉnh sửa năm 2026, Bài 1–10) ---------- */
// số liệu: Bài 1 (34 đơn vị hành chính cấp tỉnh: 28 tỉnh, 6 thành phố), Bài 4 (54 dân tộc), Bài 5 (18 đời Hùng Vương), Bài 10 (ba lần
// Mông – Nguyên xâm lược: 1258, 1285, 1287 – 1288)
const SO_LIEU = { tinhThanh: 34, tinh: 28, thanhPho: 6, danToc: 54, doiHungVuong: 18, lanMongNguyen: 3 };
// năm của các sự kiện (năm TCN ghi số âm): Bài 8 (179 TCN, 40, 248, 542, 713, 766, 905, 938), Bài 9 (1009, 1010, 1077), Bài 10 (1226,
// 1258, đầu năm 1285, 1288), Bài 3 (tư liệu năm 1836); khoá là chữ có trong câu hỏi, lựa chọn, ô sắp xếp hay ý đúng/sai
const NAM = {
  "Triệu Đà thôn tính nước Âu Lạc": -179, "Khởi nghĩa Hai Bà Trưng": 40, "Khởi nghĩa Bà Triệu": 248, "Khởi nghĩa Lý Bí": 542,
  "Khởi nghĩa Mai Thúc Loan": 713, "Khởi nghĩa Phùng Hưng": 766, "Khúc Thừa Dụ giành được quyền tự chủ": 905, "đánh tan quân Nam Hán": 938,
  "Triều Lý chuyển kinh đô về Thăng Long": 1010, "đánh bại quân Tống": 1077, "vua Minh Mạng cử người mang các cột mốc": 1836,
  "Lý Chiêu Hoàng nhường ngôi cho Trần Cảnh": 1226, "Quân Mông Cổ sang xâm lược lần thứ nhất": 1258, "Hội nghị Diên Hồng": 1285,
  "Chiến thắng Bạch Đằng, bắt sống Ô Mã Nhi": 1288
};
const namCua = (s) => { const k = Object.keys(NAM).filter((e) => low(s).includes(low(e))); assert.equal(k.length, 1, "nhận ra đúng một sự kiện: " + s); return NAM[k[0]]; };
// câu số năm: năm ghi trong đề đúng năm của hai sự kiện (hay năm tính đến), đáp án là hiệu, lời giải ghi đúng phép trừ
const hieu = (q, nam) => {
  const y = (q.q.match(/năm (\d{3,4})/gi) || []).map((s) => +s.replace(/\D/g, "")).sort((a, b) => a - b), want = nam.slice().sort((a, b) => a - b);
  assert.deepEqual(y, want, "năm ghi trong đề đúng năm của sự kiện: " + q.q.slice(0, 60));
  assert.equal(q.unit, "năm");
  assert.ok(q.x.includes(`${want[1]} − ${want[0]} = ${want[1] - want[0]}`), "lời giải ghi phép trừ: " + q.q.slice(0, 60));
  return want[1] - want[0];
};
// một ý về trục thời gian thời kì Bắc thuộc → đúng hay sai, theo bảng NAM (thời kì Bắc thuộc bắt đầu năm 179 TCN)
const yTruc = (s) => {
  let m;
  if ((m = /^Mốc năm (\d+)( TCN)? ghi: (.+)\.$/.exec(s))) return namCua(m[3]) === (m[2] ? -m[1] : +m[1]);
  if ((m = /^(.+) được ghi trước (.+)\.$/.exec(s))) return namCua(m[1]) < namCua(m[2]);
  if ((m = /^Mốc năm (\d+) được ghi là năm bắt đầu thời kì Bắc thuộc\.$/.exec(s))) return +m[1] === NAM["Triệu Đà thôn tính nước Âu Lạc"];
  return assert.fail("không đọc được ý: " + s);
};
const namYTruc = new Map(); // câu đúng/sai 4 ý về trục thời gian → năm của hai sự kiện được so trong cùng một ý (dò lộ đáp án)
// phần lãnh thổ (Bài 1): khoảng không phía trên là vùng trời; nước biển là vùng biển; đất liền, đảo, quần đảo là vùng đất
const vungCua = (s) => (/khoảng không|bầu trời/i.test(s) ? "Vùng trời" : /nước/i.test(s) ? "Vùng biển" : /quần đảo|đảo|đất liền/i.test(s) ? "Vùng đất" : assert.fail(s));
// nhiệt độ tháng 1, tháng 7 → miền: tháng 1 dưới 18 °C là có mùa đông lạnh (miền Bắc); tháng 1 từ 24 °C, chênh tháng 7 không quá 5 °C là nóng
// quanh năm (miền Nam) (Bài 2: miền Bắc có mùa đông lạnh, miền Nam nóng quanh năm); số liệu ở giữa hai ngưỡng thì không xếp được
const mienCua = (t1, t7) => (t1 < 18 ? "Bắc" : t1 >= 24 && t7 - t1 <= 5 ? "Nam" : assert.fail(`nhiệt độ ${t1} °C, ${t7} °C không xếp được miền`));
const motDung = (q, f) => { const d = q.o.map(f); assert.deepEqual(d.map(Boolean), q.o.map((o, i) => i === 0), "chỉ lựa chọn đầu khớp: " + q.q.slice(0, 50)); return q.o[0]; };

/* ---------- kiểm tra từng câu: has (chữ có trong đề bài), right(q) (đáp án tính bằng code) ---------- */
const CHECKS = [
  { has: "bao nhiêu đơn vị hành chính cấp tỉnh", right: (q) => {
    assert.ok(q.x.includes(`${SO_LIEU.tinh} tỉnh và ${SO_LIEU.thanhPho} thành phố`) && SO_LIEU.tinh + SO_LIEU.thanhPho === SO_LIEU.tinhThanh, "lời giải ghi 28 tỉnh và 6 thành phố");
    assert.ok(!q.o.slice(1).includes(String(SO_LIEU.tinhThanh))); return String(SO_LIEU.tinhThanh); } },
  { has: "Lá cờ dài", right: (q) => { const L = +/dài (\d+) cm/.exec(q.q)[1]; assert.ok(q.x.includes(`${L} × 2 : 3 = ${(L * 2) / 3}`), "lời giải ghi phép tính"); return (L * 2) / 3; } },
  { has: "Hai ô có số (1), (2)", right: (q) => {
    const h = docViTri(q.svg);
    Object.entries(h).filter(([, v]) => !/^\(\d\)$/.test(v)).forEach(([k, v]) => assert.equal(v, TIEP_GIAP[k], `ô phía ${k} ghi đúng nơi tiếp giáp`));
    const so = (n) => TIEP_GIAP[Object.keys(h).find((k) => h[k] === `(${n})`)];
    return motDung(q, (o) => o === `(1) ${so(1)}; (2) ${so(2)}`); } },
  { has: "hai địa điểm A, B", right: (q) => {
    const m = /A: tháng 1 là (\d+) °C, tháng 7 là (\d+) °C; B: tháng 1 là (\d+) °C, tháng 7 là (\d+) °C/.exec(q.q).slice(1).map(Number);
    const A = mienCua(m[0], m[1]), B = mienCua(m[2], m[3]);
    const doc = (o) => { const c = /^Cả hai nơi .* miền (Bắc|Nam)$/.exec(o), r = /^A .* miền (Bắc|Nam); B .* miền (Bắc|Nam)$/.exec(o); return c ? [c[1], c[1]] : r ? [r[1], r[2]] : assert.fail(o); };
    return motDung(q, (o) => doc(o).join() === [A, B].join()); } },
  { has: "hai quần đảo lớn nhất của nước ta", right: (q) => docQuanDao(q.svg) },
  { has: "Cộng đồng các dân tộc Việt Nam gồm", right: () => String(SO_LIEU.danToc) },
  { has: "Số dân của tỉnh M năm 2025 nhiều hơn", right: (q) => {
    const c = docCot(q.svg, "Nghìn người"), a = c[0], b = c[c.length - 1];
    assert.ok(q.q.includes(`năm ${b.nam} nhiều hơn năm ${a.nam}`), "đề so năm cuối với năm đầu của biểu đồ");
    assert.ok(q.x.includes(`${b.v} − ${a.v} = ${b.v - a.v}`), "lời giải ghi phép trừ"); return b.v - a.v; } },
  { has: "trải qua bao nhiêu đời Hùng Vương", right: () => SO_LIEU.doiHungVuong },
  { has: "Mốc (2) là năm nổ ra", right: (q) => {
    const t = docTruc(q.svg), m = /Mốc \((\d)\)/.exec(q.q)[1];
    Object.values(t).forEach((y) => assert.ok(Object.values(NAM).includes(y), `năm ${y} trên trục là năm của một sự kiện trong bảng NAM`));
    return motDung(q, (o) => NAM[o] === t[m]); } },
  { has: "Mai Thúc Loan nổ ra năm 713", right: (q) => hieu(q, [NAM["Khởi nghĩa Mai Thúc Loan"], NAM["Khúc Thừa Dụ giành được quyền tự chủ"]]) },
  { has: "Lớp 5A làm trục thời gian về thời kì Bắc thuộc", right: (q) => {
    q.o.forEach((o) => { const m = /^(.+) được ghi trước (.+)\.$/.exec(o); if (m) namYTruc.set(q, [namCua(m[1]), namCua(m[2])].map(String)); });
    return q.o.map(yTruc); } },
  { has: "Triều Lý chuyển kinh đô về Thăng Long", right: (q) => hieu(q, [NAM["Triều Lý chuyển kinh đô về Thăng Long"], NAM["đánh bại quân Tống"]]) },
  { has: "đoàn thuyền đi về phía nào", right: (q) => docDoiDo(q.svg, "Hoa Lư", "Thành Đại La") },
  { has: "quân Mông – Nguyên đã ___ lần", right: () => String(SO_LIEU.lanMongNguyen) },
  { has: "hai lần đánh tan quân xâm lược trên sông Bạch Đằng", right: (q) => hieu(q, [NAM["đánh tan quân Nam Hán"], NAM["Chiến thắng Bạch Đằng, bắt sống Ô Mã Nhi"]]) },
  { has: "vua Minh Mạng cử người mang các cột mốc", right: (q) => { assert.ok(q.q.includes("đến năm 2026")); return hieu(q, [NAM["vua Minh Mạng cử người mang các cột mốc"], 2026]); } },
  { has: "phần lãnh thổ của nước ta mà nơi đó thuộc về", right: (q) => q.l.map(vungCua) },
  { has: "các sự kiện thời nhà Trần sau đây", right: (q) => q.o.slice().sort((a, b) => namCua(a) - namCua(b)) }
];
let n = 0;
const checked = new Set();
kho.forEach((q) => {
  const c = CHECKS.filter((k) => q.q.includes(k.has));
  if (!c.length) return;
  assert.equal(c.length, 1, "câu khớp nhiều mục của CHECKS: " + q.q.slice(0, 60));
  const want = c[0].right(q), at = ten.get(q) + ": " + q.q.slice(0, 50);
  const got = { mc: () => q.o[0], fill: () => q.ans[0], num: () => q.ans, tf: () => q.a, tf4: () => q.a, order: () => q.o, match: () => q.r.slice(0, q.l.length) }[q.type]();
  assert.ok(want !== undefined, at + ": không tính được đáp án");
  if (Array.isArray(want)) assert.deepEqual(got, want, at);
  else assert.ok(typeof want === "number" ? close(got, want) : got === want, `${at}: đáp án ${JSON.stringify(got)}, tính được ${JSON.stringify(want)}`);
  checked.add(q); n++;
});
CHECKS.forEach((c) => assert.ok(kho.filter((q) => q.q.includes(c.has)).length >= 1, "mục CHECKS không khớp câu nào: " + c.has));
// câu có hình, câu trả lời bằng số, câu sắp xếp, nối cột, điền và câu đúng/sai 4 ý về trục thời gian nào cũng phải có kiểm tra
kho.filter((q) => q.svg || ["num", "order", "match", "fill"].includes(q.type) || (q.type === "tf4" && /trục thời gian/.test(q.q)))
  .forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => { assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)); chuHinh(q.svg, ten.get(q)); });

/* ---------- mức độ và ma trận ---------- */
const M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), pool.n, "tổng ma trận bằng n");
assert.equal(CHU_DE.length, 10, "10 chủ đề theo tên Bài 1–10 (Bài 11 là ôn tập)");
const nhom = (a, b) => sum(CHU_DE.slice(a, b).map((t) => sum(M[t])));
assert.deepEqual([nhom(0, 4), nhom(4, 10)], [11, 14], "Địa lí (Bài 1–4) 11 câu, Lịch sử (Bài 5–10) 14 câu");
CHU_DE.forEach((t) => { assert.ok(sum(M[t]) >= 2 && sum(M[t]) <= 3, "mỗi bài 2–3 câu: " + t); assert.ok(("chu-de:5:lsdl:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t); });
DE.forEach((id) => {
  const d = bank(id).questions;
  assert.deepEqual([...new Set(d.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, theo thứ tự của ma trận");
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `${id} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = kho.filter((q) => q.topic === t && q.lv === l);
  assert.deepEqual(o.map((q) => q.src).sort(), v[l - 1] ? DE.concat(S.pool).sort() : [], `ô (${t}, mức ${l}): một câu ở mỗi đề, một câu riêng`);
  assert.ok(v[l - 1] <= 1, `ô (${t}, mức ${l}) rút nhiều nhất 1 câu`);
}));
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 2 && !kho.some((q) => q.type === "essay"), "ít nhất 2 câu đúng/sai 4 ý, không có câu tự luận");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.equal(Math.max(...Object.values(kieu)), 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
["match", "order", "fill", "num", "tf", "tf4"].forEach((t) => assert.ok(kho.some((q) => q.type === t), "kho có câu dạng " + t));
// nối cột: mỗi ô bên phải chỉ một ô bên trái, có một ô thừa; không nối được chỉ nhờ chữ trùng
{ const tu = (s) => new Set(low(s).split(/[^\p{L}\p{N}]+/u).filter((w) => w.length > 1));
  kho.filter((q) => q.type === "match").forEach((q) => {
    assert.equal(new Set(q.r).size, q.r.length); assert.equal(q.r.length, q.l.length + 1, "nối cột có một ô thừa");
    q.l.forEach((l, i) => assert.deepEqual([...tu(l)].filter((w) => tu(q.r[i]).has(w)), [], `cặp nối “${l} → ${q.r[i]}” có chữ trùng`));
  }); }
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2) và không hay là lựa chọn dài nhất hay ngắn nhất: mỗi kiểu không quá một phần ba
// và không dưới một phần sáu số câu nhiều lựa chọn (Rút ra N9-ck1-tin-congnghe, N5-ck1-ta)
const mcs = kho.filter((q) => q.type === "mc"), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
mcs.forEach((q) => { const m = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + q.q.slice(0, 60)); assert.equal(new Set(q.o).size, q.o.length); });
const daiNhat = mcs.filter((q) => hon(q, (a, b) => a > b)).length, nganNhat = mcs.filter((q) => hon(q, (a, b) => a < b)).length;
[[daiNhat, "dài nhất"], [nganNhat, "ngắn nhất"]].forEach(([k, s]) => assert.ok(k <= mcs.length / 3 && k >= mcs.length / 6, `đáp án đúng là lựa chọn ${s} ở ${k}/${mcs.length} câu nhiều lựa chọn`));
// ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có (ba lựa chọn “Vì …” và đáp án không có “Vì” thì đoán được đáp án)
const cungDau = (q) => { const dau = (s) => String(s).trim().split(/\s+/)[0].toLowerCase(), w = q.o.slice(1).map(dau); return w.every((x) => x === w[0]) && dau(q.o[0]) !== w[0]; };
assert.ok(cungDau({ o: ["Nhớ ơn bà", "Vì bà A", "Vì bà B", "vì C"] }) && !cungDau({ o: ["Vì A", "Vì B", "Vì C", "Vì D"] }) && !cungDau({ o: ["A", "Vì B", "Để C", "Vì D"] }), "bộ dò lựa chọn cùng mở đầu tự thử");
mcs.forEach((q) => assert.ok(!cungDau(q), "ba lựa chọn sai cùng mở đầu một chữ, đáp án đúng thì không: " + q.q.slice(0, 60)));
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
{ const phanNhan = (t) => t.split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
  kho.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => {
    if (low(d).includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => low(o).includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); }); }
// lời giải không nhắc vị trí phương án (app xáo phương án); gọi người làm bài là “bạn”; chữ như sách in năm 2026; tên tỉnh, thành phố là một
// trong 34 đơn vị hành chính năm 2025 (Bài 1); không hỏi “thuộc tỉnh nào”
const TINH = ["Lai Châu", "Điện Biên", "Sơn La", "Lạng Sơn", "Quảng Ninh", "Thanh Hoá", "Nghệ An", "Hà Tĩnh", "Cao Bằng", "Tuyên Quang", "Lào Cai",
  "Thái Nguyên", "Phú Thọ", "Bắc Ninh", "Hưng Yên", "Ninh Bình", "Quảng Trị", "Quảng Ngãi", "Gia Lai", "Khánh Hoà", "Lâm Đồng", "Đắk Lắk",
  "Đồng Nai", "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang"];
const THANH_PHO = ["Hà Nội", "Hải Phòng", "Huế", "Đà Nẵng", "Hồ Chí Minh", "Cần Thơ"];
assert.equal(TINH.length, SO_LIEU.tinh); assert.equal(THANH_PHO.length, SO_LIEU.thanhPho);
const chuCau = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans)).join(" ");
kho.forEach((q) => {
  assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50));
  const C = chuCau(q);
  assert.ok(!/(^|[^\p{L}])em([^\p{L}]|$)/u.test(C), "gọi người làm bài là “bạn”, không “em”: " + q.q.slice(0, 50));
  assert.ok(!/hóa|thủy|khỏe|tùy|hòa/u.test(C), "viết “hoá”, “thuỷ”, “khoẻ”, “tuỳ”, “hoà” như sách: " + q.q.slice(0, 50));
  assert.ok(!/(^|[^\p{L}])huyện([^\p{L}]|$)|63 tỉnh|Tây Nguyên|Duyên hải miền Trung|Đông Nam Bộ|Tây Nam Bộ/u.test(C), "không dùng đơn vị hành chính, tên vùng cũ: " + q.q.slice(0, 50));
  assert.ok(!/thuộc (tỉnh|thành phố) nào|ở tỉnh nào/iu.test(C), "không hỏi “thuộc tỉnh nào”: " + q.q.slice(0, 50));
  [...C.matchAll(/(tỉnh|thành phố) (\p{Lu}\p{L}*(?: \p{Lu}\p{L}*)*)/gu)].filter(([, , ten2]) => ten2.length > 1).forEach(([, loai, ten2]) => // “tỉnh M”: tên tự đặt
    assert.ok((loai === "tỉnh" ? TINH : THANH_PHO).includes(ten2), `“${loai} ${ten2}” không là một trong 34 đơn vị hành chính năm 2025: ` + q.q.slice(0, 50)));
});
// lời dặn: phạm vi, trường đã học Bài 12, đề cương của trường, đề chung của Sở
DE.concat(S.pool).forEach((id) => { const t = bank(id).note; assert.ok(/Bài 1–11/.test(t) && /Bài 12/.test(t) && /đề cương của trường/.test(t) && /Sở GD&ĐT ra đề chung cuối kì một số môn lớp 5/.test(t), id + ": note ghi phạm vi, Bài 12, đề cương của trường, đề chung của Sở"); });
const seen = new Set();
const thuRut = (hist) => {
  const d = Quiz.draw(pool, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, pool.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, "rút đúng ma trận ở chủ đề " + t));
  return d;
};
for (let k = 0; k < 400; k++) thuRut().questions.forEach((q) => seen.add(Quiz.key(q)));
assert.equal(seen.size, kho.length, "400 lần rút thử phải gặp đủ các câu của kho");
// học sinh đã làm hết một đề cố định (đúng cả): lần rút sau không lấy lại câu của đề đó; làm hết cả hai đề thì rút đúng các câu riêng
[[S.de1], [S.de2], [S.de1, S.de2]].forEach((lam) => {
  const done = new Set(lam.flatMap((id) => bank(id).questions.map(Quiz.key)));
  for (let k = 0; k < 30; k++) thuRut((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(!done.has(Quiz.key(q)), `đã làm hết ${lam.join(", ")} mà vẫn gặp lại câu của đề đó`));
});

/* ---------- đề bài không trùng câu nào khác trong data/banks/5-lsdl.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === FILE).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: gocChu(q.q) })));
  deBai.forEach((d) => { const cung2 = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung2, [d.at], "đề bài trùng: " + cung2.join(", ")); });
}

/* ---------- dò lộ đáp án (Rút ra N5, N25, RS9; như tests/khoahoc5-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung mọi câu của một
   chủ đề (chủ đề nào cũng dưới 10 câu nên lấy hết), đề ngẫu nhiên rút chung câu của các chủ đề khác; lời dặn (note) hiện ở màn mở đề nên cũng
   là “câu kia”. Chữ của câu kia gồm đề bài, lời giải, các ô, đáp án và chữ trong hình. Số (từ 10) chỉ tìm ở vị trí kết quả (ngay sau “=”,
   “là”, “bằng”, “được”); cặp nối: câu kia có cả hai vế; câu sắp xếp: câu kia có hai ô liền nhau theo đúng thứ tự; câu đúng/sai 4 ý về trục
   thời gian: câu kia có cả hai năm của hai sự kiện được so trong một ý; đáp án bằng chữ (lựa chọn đúng, đáp án điền) có ở câu kia thì in ra
   với DO_LO=1 để người làm xem (đáp án một, hai từ chỉ tính khi câu kia cùng chủ đề), danh sách đã xem ghi ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || [], q.svg ? TEXTS(q.svg).map((t) => t.t) : []).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const coCum = (t, s) => new RegExp("(?<![\\p{L}\\p{N}])" + low(s).replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u").test(t);
const LOI_DAN = [...new Set(DE.concat(S.pool).map((id) => bank(id).note))].map((note, i) => ({ q: note, note: true, ten: "note" + (i + 1) }));
const doLo = (qs, name, notes) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so = q.type === "num" && q.ans >= 10 ? [q.ans] : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const lien = q.type === "order" ? q.o.slice(1).map((o, k) => [q.o[k], o]) : [], cum = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : [];
    const nam = namYTruc.get(q) || [];
    qs.concat(notes || []).forEach((p) => {
      if (p === q) return;
      const C = p.note ? [p.q] : chu(p), T = C.map(low), at = `${name(p)} → ${name(q)}: `;
      so.filter((x) => C.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l) && coCum(t, r))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      lien.filter(([a, b]) => T.some((t) => t.includes(low(a)) && t.includes(low(b)) && t.indexOf(low(a)) < t.indexOf(low(b)))).forEach(([a, b]) => lo.push(at + a + " → " + b));
      if (nam.length && nam.every((y) => T.some((t) => coCum(t, y)))) lo.push(at + "năm " + nam.join(", "));
      cum.filter((s) => (s.split(/\s+/).length > 2 || p.topic === q.topic) && T.some((t) => coCum(t, s))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const tenCau = (q) => (q.note ? q.ten : ten.get(q));
const r = doLo(kho, tenCau, LOI_DAN);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác của kho (xem tay):\n" + r.chuLo.join("\n"));
const DA_XEM = [];
assert.deepEqual(r.chuLo, DA_XEM, "đáp án bằng chữ có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(r.lo, [], "lộ đáp án:\n" + r.lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 192”, cả hai vế một cặp nối, hai ô liền nhau của câu sắp xếp, cả hai năm của
// một ý so thứ tự trên trục thời gian, lựa chọn đúng
{ const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const k = doLo(qs, (q) => q.q.slice(0, 12)); return k.lo.concat(k.chuLo).map((s) => s.replace(/^.*?: /, "")); };
  const khac = tim("vịnh Hạ Long");
  assert.deepEqual(thuLo([tim("Mai Thúc Loan nổ ra năm 713"), gia(khac, "Hai mốc đó cách nhau là 192 năm.")]), ["192"]);
  assert.deepEqual(thuLo([tim("phần lãnh thổ của nước ta mà nơi đó thuộc về"), gia(khac, "Quần đảo Trường Sa thuộc vùng đất của nước ta.")]), ["Quần đảo Trường Sa → Vùng đất"]);
  assert.deepEqual(thuLo([tim("các sự kiện thời nhà Trần sau đây"), gia(khac, "Hội nghị Diên Hồng họp trước, sau đó là chiến thắng Bạch Đằng, bắt sống Ô Mã Nhi.")]), ["Hội nghị Diên Hồng → Chiến thắng Bạch Đằng, bắt sống Ô Mã Nhi"]);
  assert.deepEqual(thuLo([tim("Lớp 5A làm trục thời gian về thời kì Bắc thuộc"), gia(khac, "Hai cuộc khởi nghĩa ấy nổ ra vào năm 40 và năm 766.")]), ["năm 766, 40"]);
  assert.deepEqual(thuLo([tim("Dân số đông và tăng thêm hằng năm"), gia(khac, "Dân số đông làm khó lo đủ việc làm, nhà ở, trường học, bệnh viện.")]), ["Khó lo đủ việc làm, nhà ở, trường học, bệnh viện"]); }
// bộ đọc hình bắt được hình vẽ sai: hai quần đảo đổi chỗ thì đáp án đổi, cột vẽ lệch số ở đỉnh, mốc thời gian ghi năm giảm dần, mũi tên
// hướng bắc chỉ xuống
{ const tim = (has) => kho.find((q) => q.q.includes(has));
  const qd = tim("hai quần đảo lớn nhất của nước ta").svg;
  assert.equal(docQuanDao(qd.replace('cx="262" cy="44"', 'cx="286" cy="166" data-x="1"').replace('cx="286" cy="166" r="11"', 'cx="262" cy="44" r="11"').replace('x="262" y="49"', 'x="286" y="171" data-x="1"').replace('x="286" y="171" text', 'x="262" y="49" text')), "1: Trường Sa; 2: Hoàng Sa", "đổi chỗ hai vòng số thì đáp án đổi");
  assert.throws(() => docCot(tim("Số dân của tỉnh M năm 2025").svg.replace(">705<", ">710<"), "Nghìn người"), /AssertionError|khớp/);
  assert.throws(() => docTruc(tim("Mốc (2) là năm nổ ra").svg.replace(">542<", ">200<")), /AssertionError|tăng dần/);
  assert.throws(() => docDoiDo(tim("đoàn thuyền đi về phía nào").svg.replace('points="279,40 286,26 293,40"', 'points="279,64 286,78 293,64"'), "Hoa Lư", "Thành Đại La"), /AssertionError|mũi tên/); }

/* ---------- không gần trùng câu của kho Lịch sử và Địa lí lớp 4 (lời giao việc; Rút ra N25, như tests/khoahoc5-ck1.js): đề bài cùng lựa chọn,
   ô nối, ô sắp xếp có từ 4 cặp hai âm tiết liền nhau chung với một câu của data/banks/4-lsdl.js và số cặp chung từ một nửa số cặp của câu ít
   cặp hơn thì báo. Bỏ cách hỏi chung (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của hai file. ---------- */
{
  const CUM = ["mỗi ý sau đúng hay sai", "mỗi ý kiến sau đúng hay sai", "nào dưới đây", "dưới đây", "vì sao", "điều này cho thấy", "bao nhiêu năm"];
  const cap2 = (s) => { let t = low(s); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const cauCua = (file) => BANKS.filter((b) => b.file === file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const lop4 = cauCua("4-lsdl.js"), ca = lop4.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const P4 = lop4.map((p) => [p, capAm(p)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return P4.map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Lịch sử và Địa lí 4:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Lịch sử và Địa lí 4");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, chữ trong hình) không có trong sách; tên riêng nhiều chữ (GOP) tính là
   một từ (như tests/lsdl4-ck2.js); cụm từ chung của môn (tên bài, tên chủ đề, cách hỏi chuẩn: TU_CHUNG) thay bằng dấu ngăn trước khi so;
   chuỗi so phải có ít nhất 5 từ có chữ; câu nói trích nguyên văn (TRICH) không tính. */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const boDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP = ["cong hoa xa hoi chu nghia viet nam", "thanh pho ho chi minh", "bac trung bo va nam trung bo", "bac bo va bac trung bo", "trung du va mien nui phia bac",
  "dong bang song cuu long", "dong bang bac bo", "dai nam nhat thong toan do", "dong nam a", "bien dong", "hoang sa", "truong sa", "ha noi", "hai phong", "da nang",
  "can tho", "khanh hoa", "quang ngai", "quang tri", "an giang", "tay ninh", "thai nguyen", "phu tho", "bac ninh", "ninh binh", "thanh hoa", "gia lai", "nghe an",
  "ca mau", "van lang", "au lac", "phu nam", "cham pa", "my son", "ba po na ga", "po klong ga rai", "banh it", "thien y a na", "hon dien", "lieu diep", "go cay thi",
  "nen chua", "binh hoa", "con rong chau tien", "son tinh", "thuy tinh", "an duong vuong", "thuc phan", "trieu da", "trong thuy", "kim quy", "co loa", "phong chau",
  "hung vuong", "vua hung", "dong son", "hai ba trung", "trung trac", "trung nhi", "thi sach", "to dinh", "me linh", "luy lau", "ba trieu", "ly bi", "ly nam de",
  "van xuan", "mai thuc loan", "phung hung", "khuc thua du", "ngo quyen", "duong dinh nghe", "nam han", "hoang thao", "bach dang", "ly cong uan", "ly thai to",
  "le long dinh", "tien le", "hoa lu", "dai la", "thang long", "dai viet", "van hanh", "y lan", "ly thanh tong", "ly thuong kiet", "ly dao thanh", "quach quy",
  "nhu nguyet", "ly chieu hoang", "tran canh", "tran nhan tong", "tran anh tong", "tran quoc tuan", "tran quoc toan", "dien hong", "o ma nhi", "nguyen hien",
  "mac dinh chi", "chu van an", "quoc tu giam", "van mieu", "chi linh", "minh mang", "ham nghi", "tan so", "bru van kieu", "ta oi", "co tu", "tien quan ca",
  "van cao", "ba be", "dau tieng", "bach ho", "bach ma", "phe ra lit", "ha long", "con son", "bach long vi", "con co", "bac hai", "mong nguyen", "mong co",
  "thien nhien viet nam", "tri thuc nong dan cong nhan thuong nhan binh si", "in do ne xi a", "phi lip pin", "cam pu chia", "thai lan", "trung quoc"]
  .sort((a, b) => b.length - a.length).map((g, i) => [" " + g + " ", " g" + i + " "]);
const TRICH = ["Phá cường địch, báo hoàng ân", "đền nợ nước, trả thù nhà"];
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
const khongDau = nhoChuoi((s) => { let t = " " + boDau(TRICH.reduce((a, c) => a.split(c).join(" | "), String(s))) + " "; GOP.forEach(([a, b]) => { while (t.includes(a)) t = t.replace(a, b); });
  return t.trim().split(" ").map((w) => (/^g\d+$/.test(w) ? w : w.replace(/[aeiouy]+/g, "a"))).join(" "); });
const TU_CHUNG = [...CHU_DE, "mỗi ý sau đúng hay sai", "mỗi ý kiến sau đúng hay sai", "đơn vị hành chính cấp tỉnh", "phong kiến phương Bắc", "thời kì Bắc thuộc",
  "Quốc kì, Quốc huy, Quốc ca", "nhiệt đới ẩm gió mùa", "di sản thiên nhiên thế giới", "đất nước và con người Việt Nam", "những quốc gia đầu tiên trên lãnh thổ Việt Nam",
  "xây dựng và bảo vệ đất nước Việt Nam", "khởi nghĩa Lam Sơn và Triều Hậu Lê", "Vị trí địa lí, lãnh thổ, đơn vị hành chính, Quốc kì, Quốc huy, Quốc ca",
  "Triều Trần xây dựng đất nước và kháng chiến chống quân Mông – Nguyên xâm lược", "sách Kết nối tri thức", "bản chỉnh sửa năm 2026", "Sở GD&ĐT ra đề chung cuối kì một số môn lớp 5"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}|^g\d+$/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
if (SACH.length) {
  assert.ok(SACH.some((f) => /lop-5\/lich-su-dia-li-5/.test(f)), "OnUp-Book có Lịch sử và Địa lí 5");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const khac = BANKS.filter((b) => b.file !== FILE).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n + " câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu, " + kho.filter((q) => q.svg).length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("LSDL5 OK");
