// Kiểm tra ngân hàng Lịch sử và Địa lí 5 cuối năm của Phiên N5-ck2-lsdl (data/banks/5-lsdl.js, lsdl5-ck2-*), theo mẫu tests/lsdl5-ck1.js và
// các ý chung của các phiên lớp 5 (đoạn “Chung của các phiên lớp 5” ở mục 7 của docs/KE-HOACH-NOI-DUNG.md). Kho = Đề 1 + Đề 2 + câu riêng của
// đề ngẫu nhiên; số câu, số đề lấy từ danh mục (không ghi cứng).
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho):
// - số liệu theo sách in năm 2026 (SO_LIEU: 30 tỉnh và 1 phủ thời Minh Mạng, 34 chiến sĩ của Đội Việt Nam Tuyên truyền Giải phóng quân, 56 dân
//   tộc của Trung Quốc và người Hán hơn 90%, diện tích, số dân Trung Quốc, tháp Thạt Luổng 45 m, 11 quốc gia Đông Nam Á, Việt Nam là thành
//   viên thứ bảy của ASEAN, đại dương chứa hơn 96% lượng nước, kim tự tháp Kê-ốp cao 147 m); bảng diện tích các châu lục (BANG_CHAU, sách
//   tr. 93), diện tích và độ sâu trung bình các đại dương (BANG_DD, tr. 97), số dân các châu lục năm 2024 (DAN_SO, tr. 98);
// - số năm, số tuổi, số ngày: năm, ngày ghi trong đề đúng bảng NAM, NGAY (theo sách), đáp án là hiệu (số ngày tính cả ngày đầu, ngày cuối),
//   lời giải ghi đúng phép tính; câu sắp xếp: thứ tự theo bảng NAM, NGAY; ba đợt của chiến dịch Điện Biên Phủ theo bảng DOT; từng ý của câu
//   đúng/sai 4 ý về bảng đại dương tính lại từ số liệu chép trong đề (số liệu phải đúng BANG_DD);
// - hình đọc lại từ chuỗi SVG: sơ đồ vị trí của Lào, của Cam-pu-chia (ô ở giữa, mỗi ô khác ở một trong tám hướng theo mũi tên chỉ hướng bắc,
//   nơi tiếp giáp theo bảng TIEP_GIAP), trục thời gian thời nhà Nguyễn (số mốc ở trên, năm ở dưới, năm tăng dần sang phải), biểu đồ cột số dân
//   các châu lục (trục số, số ở đỉnh cột khớp chiều cao cột, tên châu lục dưới mỗi cột, số liệu đúng DAN_SO); chữ trong hình từ 13px ở ô hình
//   rộng 328px (màn 360px) và nằm trọn trong khung hình; câu nối cột loài vật – châu lục theo bảng DONG_VAT.
// Rồi kiểm tra mức độ, ma trận (10 Biết, 8 Hiểu, 7 Vận dụng; 16 chủ đề theo tên Bài 12–27; Lịch sử Việt Nam và văn minh cổ đại 13 câu, các
// nước láng giềng, thế giới 12 câu; hai đề cố định và câu riêng đều chia đúng ma trận, mỗi ô 3 câu), dạng câu (ít nhất 2 câu đúng/sai 4 ý, kiểu
// Đ/S không lặp; đủ các dạng nối cột, sắp xếp, điền, trả lời bằng số, đúng/sai), đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài
// nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn, ba lựa chọn sai không cùng mở đầu bằng một chữ mà
// đáp án đúng không có, không lặp chữ của nhãn chủ đề, lời giải không nhắc vị trí phương án, gọi người làm bài là “bạn”, chữ như sách in năm
// 2026 (“hoà”, “thuỷ”; không “huyện”, “63 tỉnh”, tên vùng cũ; tên tỉnh, thành phố Việt Nam là một trong 34 đơn vị hành chính năm 2025; không
// hỏi “thuộc tỉnh nào”), note (phạm vi Bài 12–27, Bài 28 ôn tập, đề cuối kì I, đề cương của trường, đề chung của Sở), đề bài không trùng, rút
// thử (đúng ma trận, gặp đủ kho; đã làm hết một đề cố định thì không rút lại câu của đề đó), dò lộ đáp án giữa mọi cặp câu của kho và lời dặn
// (đề “Ôn chủ đề” rút chung mọi câu của một chủ đề; cách dò ở chú thích của doLo), đề bài không gần trùng câu của data/banks/4-lsdl.js và kho
// Lịch sử và Địa lí 5 cuối kì I (cặp hai âm tiết liền nhau chung). Có ../OnUp-Book (repo riêng tư): mọi trường chữ, cả chữ trong hình, không
// có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm, tên riêng nhiều chữ tính là một từ; DO_SACH=1 in chuỗi 6 từ). So
// thêm với mọi câu của các kho khác, cả kho cuối kì I và câu riêng của các đề ngẫu nhiên: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 6 từ và
// câu gần trùng.
// Chạy: node tests/lsdl5-ck2.js → in LSDL5 CK2 OK. DO_LO=1 in đáp án bằng chữ có ở câu khác để người làm xem.
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
const S = { de1: "lsdl5-ck2-de1", de2: "lsdl5-ck2-de2", pool: "lsdl5-ck2-ngau-nhien" };
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
  const cal = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ck2 = /id: "ck2-l5"[\s\S]*?banks: \[([^\]]*)\]/.exec(cal);
  assert.ok(ck2, "lịch có kì ck2-l5");
  DE.concat(S.pool).forEach((id) => assert.ok(ck2[1].includes(`"${id}"`), id + " gắn vào ck2-l5"));
}
const ten = new Map();
DE.concat(S.pool).forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("lsdl5-ck2-", "").replace("ngau-nhien", "own") + "#" + (i + 1))));

/* ---------- hình SVG ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const nums = (s) => s.trim().split(/[\s,]+/).map(Number);
const pts2 = (s) => { const v = nums(s), p = []; for (let i = 0; i < v.length; i += 2) p.push([v[i], v[i + 1]]); return p; };
const TAGS = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const RECTS = (svg) => TAGS(svg, "rect").map((a) => ({ x: +a.x, y: +a.y, w: +a.width, h: +a.height, fill: a.fill || "none" }));
const LINES = (svg) => TAGS(svg, "line").map((a) => ({ a: [+a.x1, +a.y1], b: [+a.x2, +a.y2], stroke: a.stroke || "none" }));
const POLYS = (svg) => TAGS(svg, "polygon").map((a) => ({ p: pts2(a.points), fill: a.fill || "none" }));
const TEXTS = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">"); return { at: [+a.x, +a.y], t: m[2], fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start", b: a["font-weight"] === "700" }; });
const rong = (t) => (t.b ? 0.62 : 0.56) * t.fs * [...t.t].length; // ước bề rộng chữ (Noto Sans)
const daDoc = new Set(); // hình đã đọc lại bằng code
// chữ trong hình từ 13px khi hình vẽ trong ô .qfig rộng 328px (màn 360px; hình co giãn theo bề rộng ô) và nằm trọn trong khung hình
const O_HINH = 328;
const chuHinh = (svg, at) => {
  const v = nums(/viewBox="([^"]+)"/.exec(svg)[1]);
  TEXTS(svg).forEach((t) => {
    const px = t.fs * O_HINH / v[2];
    assert.ok(px >= 13, `${at}: chữ “${t.t}” cỡ ${t.fs} trong hình rộng ${v[2]}, ở ô ${O_HINH}px chỉ còn ${px.toFixed(1)}px, cần từ 13px`);
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
/* Sơ đồ vị trí: ô chữ nhật có chữ ở trong; ô “giua” ở giữa, mỗi ô khác ở một trong tám hướng so với ô giữa (lệch không quá 15°).
   Trả về { hướng: chữ trong ô }. */
const docViTri = (svg, giua) => {
  daDoc.add(svg); muiTenBac(svg);
  const tx = TEXTS(svg), o = RECTS(svg).map((r) => {
    const chu = tx.filter((t) => t.at[0] > r.x && t.at[0] < r.x + r.w && t.at[1] > r.y && t.at[1] < r.y + r.h).map((t) => t.t).join(" ");
    assert.ok(chu, "ô nào cũng có chữ"); return { chu, c: [r.x + r.w / 2, r.y + r.h / 2] };
  });
  const g = o.filter((v) => v.chu === giua); assert.equal(g.length, 1, "một ô giữa ghi " + giua);
  const out = {};
  o.filter((v) => v !== g[0]).forEach((v) => { const h = huong(g[0].c, v.c); assert.equal(out[h], undefined, "mỗi hướng một ô"); out[h] = v.chu; });
  return out;
};
// nơi tiếp giáp theo hướng (Bài 19: Lào giáp Trung Quốc, Mi-an-ma, Thái Lan, Cam-pu-chia, Việt Nam, không giáp biển; Bài 20: Cam-pu-chia giáp
// Lào và Thái Lan ở phía bắc, Việt Nam ở phía đông, vịnh Thái Lan ở phía tây nam). Sơ đồ đơn giản: Mi-an-ma ở phía tây bắc, Thái Lan ở phía
// tây của Lào; Thái Lan ở phía tây bắc của Cam-pu-chia (phần phía bắc giáp Lào và Thái Lan).
const TIEP_GIAP = {
  "Lào": { "bắc": "Trung Quốc", "tây bắc": "Mi-an-ma", "tây": "Thái Lan", "nam": "Cam-pu-chia", "đông": "Việt Nam" },
  "Cam-pu-chia": { "bắc": "Lào", "tây bắc": "Thái Lan", "đông": "Việt Nam", "tây nam": "Vịnh Thái Lan" }
};
const kiemViTri = (h, giua) => Object.entries(h).filter(([, v]) => !/^\(\d\)$/.test(v)).forEach(([k, v]) => assert.equal(v, TIEP_GIAP[giua][k], `${giua}: ô phía ${k} ghi đúng nơi tiếp giáp`));
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
/* Biểu đồ cột số dân các châu lục: đường lưới nằm ngang (nét màu line), số ở đầu trái mỗi đường lưới (text-anchor="end", chân chữ thấp hơn
   vạch 5 đơn vị) là giá trị; cột là hình chữ nhật đứng trên đường đáy, số ở đỉnh cột (giữa cột, cao hơn đỉnh 6 đơn vị) khớp chiều cao cột;
   dưới mỗi cột hai dòng “Châu” và tên châu lục; trục ghi đơn vị. Trả về { "Châu …": số dân }. */
const docCotChau = (svg, donVi) => {
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
  const out = {};
  RECTS(svg).forEach((r) => {
    assert.ok(close(r.y + r.h, day), "cột đứng trên đường đáy");
    const cx = r.x + r.w / 2, v = Math.round(giaTri(r.y) * 1000) / 1000;
    const dinh = tx.filter((t) => t.anchor === "middle" && close(t.at[0], cx) && t.at[1] < day);
    assert.equal(dinh.length, 1, "mỗi cột một số ở đỉnh"); assert.ok(close(dinh[0].at[1], r.y - 6), "số ghi ngay trên đỉnh cột");
    assert.equal(val(dinh[0].t), v, `số ở đỉnh cột (${dinh[0].t}) khớp chiều cao cột (${v})`);
    const duoi = tx.filter((t) => t.anchor === "middle" && close(t.at[0], cx) && t.at[1] > day).sort((a, b) => a.at[1] - b.at[1]);
    assert.equal(duoi.length, 2, "dưới mỗi cột hai dòng tên châu lục"); assert.equal(duoi[0].t, "Châu", "dòng trên ghi “Châu”");
    const tenChau = "Châu " + duoi[1].t; assert.equal(out[tenChau], undefined, "mỗi châu lục một cột"); out[tenChau] = v;
  });
  assert.ok(Object.keys(out).length >= 4, "ít nhất 4 cột");
  return out;
};

/* ---------- bảng tra (theo sách Lịch sử và Địa lí 5 bản chỉnh sửa năm 2026, Bài 12–27) ---------- */
// số liệu: Bài 13 (vua Minh Mạng chia cả nước thành 30 tỉnh và 1 phủ), Bài 14 (Đội Việt Nam Tuyên truyền Giải phóng quân 34 chiến sĩ), Bài 18
// (Trung Quốc khoảng 9,6 triệu km², rộng thứ tư thế giới, hơn 1,4 tỉ người năm 2024, 56 dân tộc, người Hán hơn 90%), Bài 19 (Thạt Luổng: tháp
// giữa cao 45 m), Bài 21 (Đông Nam Á 11 quốc gia, đều là thành viên ASEAN; Việt Nam là thành viên thứ 7), Bài 22 (đại dương chứa hơn 96% lượng
// nước trên Trái Đất), Bài 24 (kim tự tháp Kê-ốp cao 147 m)
const SO_LIEU = { tinhPhu: "30 tỉnh và 1 phủ", chienSi: 34, danTocTQ: 56, hanTQ: 90, danSoTQ: "1,4 tỉ", dienTichTQ: "9,6 triệu km²", thuTQ: "thứ tư",
  thatLuong: 45, quocGiaDNA: 11, thuTuVN: 7, nuocDaiDuong: 96, keOp: 147 };
const SO_CHU = ["", "nhất", "hai", "ba", "tư", "năm", "sáu", "bảy", "tám", "chín", "mười"];
const BANG_CHAU = { "châu Á": 44.4, "châu Âu": 10.3, "châu Phi": 30.3, "châu Mỹ": 42, "châu Đại Dương": 8.5, "châu Nam Cực": 14 }; // triệu km², tr. 93
const BANG_DD = { "Đại Tây Dương": [106.4, 3338], "Ấn Độ Dương": [70.6, 3741], "Thái Bình Dương": [165.3, 4280], "Bắc Băng Dương": [14.1, 987], "Nam Đại Dương": [22.0, 3270] }; // tr. 97
const DAN_SO = { "Châu Á": 4773, "Châu Âu": 747, "Châu Đại Dương": 44, "Châu Mỹ": 1040, "Châu Phi": 1478 }; // triệu người, năm 2024, tr. 98
// năm của các sự kiện; khoá là chữ có trong ô sắp xếp hay lựa chọn: Bài 12 (1418 dựng cờ khởi nghĩa, Chi Lăng trong những năm cuối của cuộc
// khởi nghĩa 1418 – 1427: ghi 1427, 1428 Lê Lợi lên ngôi, vua Lê Thánh Tông trị vì 1460 – 1497: bản đồ Hồng Đức vẽ trong thời gian đó, ghi 1460),
// Bài 13 (1802 Triều Nguyễn, 1831 – 1832 cải cách hành chính, 1884 hiệp ước, 1885 Dụ Cần vương), Bài 21 (1967 ASEAN ra đời, 1995 Việt Nam gia nhập)
const NAM = {
  "Lê Lợi dựng cờ khởi nghĩa": 1418, "ải Chi Lăng": 1427, "Lê Lợi lên ngôi vua": 1428, "bản đồ Hồng Đức": 1460,
  "Triều Nguyễn được thành lập": 1802, "Minh Mạng bắt đầu cải cách hành chính": 1831, "kí hiệp ước chịu sự đô hộ": 1884, "Dụ Cần vương": 1885
};
// ngày (năm × 10 000 + tháng × 100 + ngày): Bài 14 (Hà Nội 19 – 8, Huế 23 – 8, Sài Gòn 25 – 8, Tuyên ngôn Độc lập 2 – 9 – 1945), Bài 15
// (chiến dịch Điện Biên Phủ 13 – 3 đến 7 – 5 – 1954), Bài 16 (Chiến dịch Hồ Chí Minh bắt đầu 17 giờ ngày 26 – 4 – 1975)
const NGAY = {
  "Hà Nội khởi nghĩa giành chính quyền": 19450819, "người dân Huế": 19450823, "chính quyền cách mạng ở Sài Gòn": 19450825, "đọc Tuyên ngôn Độc lập": 19450902
};
const DBP = { dau: [13, 3, 1954], cuoi: [7, 5, 1954] };
// ba đợt tiến công của chiến dịch Điện Biên Phủ (sơ đồ diễn biến, tr. 66)
const DOT = [{ tu: [13, 3], den: [17, 3], noi: "cứ điểm Him Lam và phân khu Bắc" }, { tu: [30, 3], den: [26, 4], noi: "các cứ điểm phía đông của phân khu Trung tâm" },
  { tu: [1, 5], den: [7, 5], noi: "trung tâm Mường Thanh và phân khu Nam" }];
const BAT_DAU_HCM = "17 giờ ngày 26 – 4 – 1975";
// loài vật và châu lục (Bài 18: gấu trúc là con vật đặc trưng của Trung Quốc, ở châu Á; Bài 22: can-gu-ru, gấu túi ở châu Đại Dương, chim cánh cụt
// ở châu Nam Cực)
const DONG_VAT = { "Can-gu-ru": "Châu Đại Dương", "Chim cánh cụt": "Châu Nam Cực", "Gấu trúc": "Châu Á", "Gấu túi": "Châu Đại Dương" };
const khoa = (bang, s) => { const k = Object.keys(bang).filter((e) => low(s).includes(low(e))); assert.equal(k.length, 1, "nhận ra đúng một sự kiện: " + s); return bang[k[0]]; };
const namCua = (s) => khoa(NAM, s);
// câu số năm, số tuổi: năm ghi trong đề đúng năm của hai sự kiện, đáp án là hiệu, lời giải ghi đúng phép trừ
const hieu = (q, nam, donVi) => {
  const y = (q.q.match(/năm (\d{3,4})/gi) || []).map((s) => +s.replace(/\D/g, "")).sort((a, b) => a - b), want = nam.slice().sort((a, b) => a - b);
  assert.deepEqual(y, want, "năm ghi trong đề đúng năm của sự kiện: " + q.q.slice(0, 60));
  assert.equal(q.unit, donVi || "năm");
  assert.ok(q.x.includes(`${want[1]} − ${want[0]} = ${want[1] - want[0]}`), "lời giải ghi phép trừ: " + q.q.slice(0, 60));
  return want[1] - want[0];
};
const ngayCua = (d, m, y) => Date.UTC(y, m - 1, d);
const DATE = /ngày (\d{1,2}) – (\d{1,2}) – (\d{4})/gi;
// số ngày của chiến dịch (tính cả ngày đầu và ngày cuối): hai ngày ghi trong đề đúng bảng DBP; số ngày của từng tháng ghi trong đề đúng lịch
const soNgay = (q) => {
  const d = [...q.q.matchAll(DATE)].map((m) => m.slice(1).map(Number));
  assert.deepEqual(d, [DBP.dau, DBP.cuoi], "ngày bắt đầu, kết thúc ghi trong đề đúng sách");
  [...q.q.matchAll(/Tháng (\d+) có (\d+) ngày/g)].forEach(([, m, n]) => assert.equal(new Date(Date.UTC(d[0][2], +m, 0)).getUTCDate(), +n, "số ngày của tháng " + m));
  const n = (ngayCua(...d[1]) - ngayCua(...d[0])) / 864e5 + 1;
  assert.ok(q.x.includes(`= ${n} (ngày)`), "lời giải ghi số ngày"); return n;
};
// một ý về các đợt tiến công của chiến dịch Điện Biên Phủ → đúng hay sai, theo bảng DOT
const yDot = (s) => {
  let m;
  if ((m = /^Trong đợt (\d), quân ta (?:tiêu diệt|đánh vào) (.+)\.$/.exec(s))) return DOT[m[1] - 1].noi.includes(m[2]) && DOT.every((d, i) => i === m[1] - 1 || !d.noi.includes(m[2]));
  if ((m = /^Đợt (\d) diễn ra trước đợt (\d)\.$/.exec(s))) return +m[1] < +m[2];
  if ((m = /^Chiến dịch có tất cả (\S+) đợt tiến công\.$/.exec(s))) return SO_CHU.indexOf(m[1]) === DOT.length;
  return assert.fail("không đọc được ý: " + s);
};
// bảng diện tích, độ sâu trung bình các đại dương chép trong đề (phải đúng BANG_DD); một ý → đúng hay sai
const bangDD = (q) => {
  const t = {}; [...q.q.matchAll(/([\p{Lu}][\p{L}]*(?: [\p{Lu}][\p{L}]*)* Dương) (\d+,\d) triệu km², (\d[\d ]*\d) m/gu)].forEach(([, n, s, d]) => { t[n] = [val(s), val(d)]; });
  assert.deepEqual(t, BANG_DD, "số liệu các đại dương trong đề đúng bảng của sách"); return t;
};
const yDD = (t, s) => {
  let m;
  if ((m = /^(.+) sâu hơn (.+) hơn (\d+) m\.$/.exec(s))) return t[m[1]][1] - t[m[2]][1] > +m[3];
  if ((m = /^(.+) rộng hơn (.+)\.$/.exec(s))) return t[m[1]][0] > t[m[2]][0];
  if ((m = /^(.+) có độ sâu trung bình chưa tới (\d[\d ]*) m\.$/.exec(s))) return t[m[1]][1] < val(m[2]);
  if ((m = /^Diện tích (.+) gấp hơn (\d+) lần diện tích (.+)\.$/.exec(s))) return t[m[1]][0] > +m[2] * t[m[3]][0];
  return assert.fail("không đọc được ý: " + s);
};
// một nhận xét về số dân các châu lục → đúng hay sai
const yDan = (d, s) => {
  const v = (c) => d["Châu " + c], xep = Object.values(d).sort((a, b) => b - a);
  let m;
  if ((m = /^Số dân châu (\S+) nhiều hơn số dân châu (\S+)$/.exec(s))) return v(m[1]) > v(m[2]);
  if ((m = /^Châu (\S+) đông dân thứ hai, chỉ sau châu (\S+)$/.exec(s))) return v(m[1]) === xep[1] && v(m[2]) === xep[0];
  if ((m = /^Châu (.+) có số dân nhiều hơn châu (\S+)$/.exec(s))) return v(m[1]) > v(m[2]);
  if ((m = /^Châu (\S+) có số dân ít nhất trong năm châu lục$/.exec(s))) return v(m[1]) === xep[xep.length - 1];
  return assert.fail("không đọc được nhận xét: " + s);
};
const motDung = (q, f) => { const d = q.o.map(f); assert.deepEqual(d.map(Boolean), q.o.map((o, i) => i === 0), "chỉ lựa chọn đầu khớp: " + q.q.slice(0, 50)); return q.o[0]; };
const namTimeline = new Map(); // câu trục thời gian → năm của mốc được hỏi (dò lộ đáp án)

/* ---------- kiểm tra từng câu: has (chữ có trong đề bài), right(q) (đáp án tính bằng code) ---------- */
const CHECKS = [
  { has: "trị vì trong bao nhiêu năm", right: (q) => hieu(q, [1460, 1497]) },
  { has: "Thẻ nào ghi việc diễn ra sớm hơn", right: (q) => q.o.slice().sort((a, b) => namCua(a) - namCua(b)) },
  { has: "vua Minh Mạng đã chia cả nước thành", right: () => SO_LIEU.tinhPhu },
  { has: "năm của bốn sự kiện thời nhà Nguyễn", right: (q) => {
    const t = docTruc(q.svg), m = /ứng với mốc \((\d)\)/.exec(q.q)[1];
    Object.values(t).forEach((y) => assert.ok(Object.values(NAM).includes(y), `năm ${y} trên trục là năm của một sự kiện trong bảng NAM`));
    namTimeline.set(q, [String(t[m])]);
    return motDung(q, (o) => namCua(o) === t[m]); } },
  { has: "những ngày thu năm 1945", right: (q) => q.o.slice().sort((a, b) => khoa(NGAY, a) - khoa(NGAY, b)) },
  { has: "Giải phóng quân gồm", right: (q) => { assert.ok(q.q.includes(`gồm ${SO_LIEU.chienSi} chiến sĩ`), "số chiến sĩ đúng sách"); return q.o[0]; } },
  { has: "tròn bao nhiêu năm tuổi", right: (q) => {
    const y = [...q.q.matchAll(DATE)].map((m) => +m[3]); assert.deepEqual(y.slice(0, 1), [1944], "đội ra đời năm 1944 (ngày 22 – 12 – 1944)");
    assert.ok(q.x.includes(`${y[1]} − ${y[0]} = ${y[1] - y[0]}`), "lời giải ghi phép trừ"); assert.equal(q.unit, "năm"); return y[1] - y[0]; } },
  { has: "các đợt tiến công trong chiến dịch Điện Biên Phủ", right: (q) => q.o.map(yDot) },
  { has: "chiến dịch kéo dài bao nhiêu ngày", right: (q) => { assert.equal(q.unit, "ngày"); return soNgay(q); } },
  { has: "Bế Văn Đàn", right: (q) => hieu(q, [1931, 1953], "tuổi") },
  { has: "Chiến dịch Hồ Chí Minh bắt đầu vào thời điểm nào", right: () => BAT_DAU_HCM },
  { has: "Dân tộc nào chiếm hơn", right: (q) => { assert.ok(q.q.includes(`${SO_LIEU.danTocTQ} dân tộc`) && q.q.includes(`hơn ${SO_LIEU.hanTQ}%`), "số dân tộc, tỉ lệ đúng sách"); return "Dân tộc Hán"; } },
  { has: "đứng thứ tư thế giới", right: (q) => {
    [SO_LIEU.danSoTQ, SO_LIEU.dienTichTQ, "đứng " + SO_LIEU.thuTQ].forEach((s) => assert.ok(q.q.includes(s), "số liệu Trung Quốc đúng sách: " + s)); return q.o[0]; } },
  { has: "vị trí nước Lào và các nước tiếp giáp", right: (q) => {
    const h = docViTri(q.svg, "Lào"); kiemViTri(h, "Lào");
    const so = (n) => TIEP_GIAP["Lào"][Object.keys(h).find((k) => h[k] === `(${n})`)];
    return motDung(q, (o) => o === `(1) ${so(1)}; (2) ${so(2)}`); } },
  { has: "tháp ở giữa cao", right: (q) => { assert.ok(q.q.includes(`cao ${SO_LIEU.thatLuong} m`), "chiều cao Thạt Luổng đúng sách"); return "Thạt Luổng"; } },
  { has: "vị trí của Cam-pu-chia", right: (q) => {
    const h = docViTri(q.svg, "Cam-pu-chia"); kiemViTri(h, "Cam-pu-chia");
    const k = Object.keys(h).find((x) => h[x] === "Vịnh Thái Lan"); return motDung(q, (o) => o === "Phía " + k); } },
  { has: "thành viên thứ mấy", right: () => "Thứ " + SO_CHU[SO_LIEU.thuTuVN] },
  { has: "quốc gia thành viên; mọi nước", right: () => String(SO_LIEU.quocGiaDNA) },
  { has: "Từ khi ASEAN ra đời đến khi Việt Nam gia nhập", right: (q) => hieu(q, [1967, 1995]) },
  { has: "Nối mỗi loài động vật", right: (q) => q.l.map((l) => { assert.ok(DONG_VAT[l], "loài vật có trong bảng: " + l); return DONG_VAT[l]; }) },
  { has: "ghi theo thứ tự diện tích, độ sâu trung bình", right: (q) => { const t = bangDD(q); return q.o.map((s) => yDD(t, s)); } },
  { has: "lượng nước trên Trái Đất", right: () => "Hơn " + SO_LIEU.nuocDaiDuong + "%" },
  { has: "Châu Á rộng hơn châu Âu", right: (q) => {
    const a = +/châu Á khoảng (\d+,\d)/.exec(q.q)[1].replace(",", "."), b = +/châu Âu khoảng (\d+,\d)/.exec(q.q)[1].replace(",", ".");
    assert.deepEqual([a, b], [BANG_CHAU["châu Á"], BANG_CHAU["châu Âu"]], "diện tích châu lục đúng bảng của sách");
    const d = Math.round((a - b) * 10) / 10; assert.ok(q.x.includes(`= ${String(d).replace(".", ",")}`), "lời giải ghi phép trừ"); return d; } },
  { has: "Số dân châu Phi nhiều hơn số dân châu Mỹ", right: (q) => {
    const d = docCotChau(q.svg, "Triệu người"); assert.deepEqual(d, DAN_SO, "biểu đồ đúng số dân các châu lục năm 2024 trong sách");
    const n = d["Châu Phi"] - d["Châu Mỹ"]; assert.equal(q.unit, "triệu người"); return n; } },
  { has: "Quan sát biểu đồ số dân các châu lục năm 2024 (theo sách). Nhận xét nào đúng", right: (q) => {
    const d = docCotChau(q.svg, "Triệu người"); assert.deepEqual(d, DAN_SO, "biểu đồ đúng số dân các châu lục năm 2024 trong sách"); return motDung(q, (o) => yDan(d, o)); } },
  { has: "Kim tự tháp Kê-ốp cao", right: (q) => { const h = +/Kê-ốp cao (\d+) m/.exec(q.q)[1]; return h === SO_LIEU.keOp; } }
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
// câu có hình, câu trả lời bằng số, câu sắp xếp, nối cột, điền, đúng/sai nào cũng phải có kiểm tra
kho.filter((q) => q.svg || ["num", "order", "match", "fill", "tf"].includes(q.type)).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => { assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)); chuHinh(q.svg, ten.get(q)); });

/* ---------- mức độ và ma trận ---------- */
const M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), pool.n, "tổng ma trận bằng n");
assert.equal(CHU_DE.length, 16, "16 chủ đề theo tên Bài 12–27 (Bài 28 là ôn tập)");
const nhom = (ts) => sum(ts.map((t) => sum(M[t])));
assert.deepEqual([nhom(CHU_DE.slice(0, 6).concat(CHU_DE.slice(12, 14))), nhom(CHU_DE.slice(6, 12).concat(CHU_DE.slice(14)))], [13, 12],
  "Lịch sử Việt Nam (Bài 12–17) và văn minh cổ đại (Bài 24–25) 13 câu; các nước láng giềng, châu lục, dân số, xây dựng thế giới 12 câu");
CHU_DE.forEach((t) => { assert.ok(sum(M[t]) >= 1 && sum(M[t]) <= 2, "mỗi bài 1–2 câu: " + t); assert.ok(("chu-de:5:lsdl:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t); });
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
    q.r.slice(q.l.length).forEach((r) => assert.ok(!Object.entries(DONG_VAT).some(([l, c]) => q.l.includes(l) && c === r), "ô thừa không nối được với ô bên trái nào"));
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
// lời giải không nhắc vị trí phương án (app xáo phương án); gọi người làm bài là “bạn”; chữ như sách in năm 2026; tên tỉnh, thành phố Việt Nam là
// một trong 34 đơn vị hành chính năm 2025 (Bài 1); thành phố nước ngoài trong bài học ở NUOC_NGOAI; không hỏi “thuộc tỉnh nào”
const TINH = ["Lai Châu", "Điện Biên", "Sơn La", "Lạng Sơn", "Quảng Ninh", "Thanh Hoá", "Nghệ An", "Hà Tĩnh", "Cao Bằng", "Tuyên Quang", "Lào Cai",
  "Thái Nguyên", "Phú Thọ", "Bắc Ninh", "Hưng Yên", "Ninh Bình", "Quảng Trị", "Quảng Ngãi", "Gia Lai", "Khánh Hoà", "Lâm Đồng", "Đắk Lắk",
  "Đồng Nai", "Tây Ninh", "Vĩnh Long", "Đồng Tháp", "Cà Mau", "An Giang"];
const THANH_PHO = ["Hà Nội", "Hải Phòng", "Huế", "Đà Nẵng", "Hồ Chí Minh", "Cần Thơ"];
const NUOC_NGOAI = ["Xiêm Riệp", "Phnôm Pênh", "Viêng Chăn", "Bắc Kinh", "A-ten", "Niu Oóc"];
assert.equal(TINH.length + THANH_PHO.length, 34);
const chuCau = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans)).join(" ");
kho.forEach((q) => {
  assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50));
  const C = chuCau(q);
  assert.ok(!/(^|[^\p{L}])em([^\p{L}]|$)/u.test(C), "gọi người làm bài là “bạn”, không “em”: " + q.q.slice(0, 50));
  assert.ok(!/hóa|thủy|khỏe|tùy|hòa/u.test(C), "viết “hoá”, “thuỷ”, “khoẻ”, “tuỳ”, “hoà” như sách: " + q.q.slice(0, 50));
  assert.ok(!/(^|[^\p{L}])huyện([^\p{L}]|$)|63 tỉnh|Tây Nguyên|Duyên hải miền Trung|Đông Nam Bộ|Tây Nam Bộ/u.test(C), "không dùng đơn vị hành chính, tên vùng cũ: " + q.q.slice(0, 50));
  assert.ok(!/thuộc (tỉnh|thành phố) nào|ở tỉnh nào/iu.test(C), "không hỏi “thuộc tỉnh nào”: " + q.q.slice(0, 50));
  [...C.matchAll(/(tỉnh|thành phố) (\p{Lu}[\p{L}-]*(?: \p{Lu}[\p{L}-]*)*)/gu)].filter(([, , ten2]) => ten2.length > 1).forEach(([, loai, ten2]) => // “tỉnh M”: tên tự đặt
    assert.ok((loai === "tỉnh" ? TINH : THANH_PHO.concat(NUOC_NGOAI)).includes(ten2), `“${loai} ${ten2}” không là một trong 34 đơn vị hành chính năm 2025: ` + q.q.slice(0, 50)));
});
// lời dặn: phạm vi, Bài 28 ôn tập, đề cuối kì I, đề cương của trường, đề chung của Sở
DE.concat(S.pool).forEach((id) => { const t = bank(id).note; assert.ok(/Bài 12–27/.test(t) && /Bài 28 là bài ôn tập/.test(t) && /cuối kì I/.test(t) && /đề cương của trường/.test(t) && /Sở GD&ĐT ra đề chung cuối kì một số môn lớp 5/.test(t), id + ": note ghi phạm vi, Bài 28, đề cuối kì I, đề cương của trường, đề chung của Sở"); });
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

/* ---------- dò lộ đáp án (Rút ra N5, N25, RS9; như tests/lsdl5-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung mọi câu của một
   chủ đề (chủ đề nào cũng dưới 10 câu nên lấy hết), đề ngẫu nhiên rút chung câu của các chủ đề khác; lời dặn (note) hiện ở màn mở đề nên cũng
   là “câu kia”. Chữ của câu kia gồm đề bài, lời giải, các ô, đáp án và chữ trong hình. Số (từ 10) chỉ tìm ở vị trí kết quả (ngay sau “=”,
   “là”, “bằng”, “được”); cặp nối: câu kia có cả hai vế; câu sắp xếp: câu kia có hai ô liền nhau theo đúng thứ tự; câu trục thời gian: câu kia
   có năm của mốc được hỏi; đáp án bằng chữ (lựa chọn đúng, đáp án điền) có ở câu kia thì in ra với DO_LO=1 để người làm xem (đáp án một, hai
   từ chỉ tính khi câu kia cùng chủ đề), danh sách đã xem ghi ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || [], q.svg ? TEXTS(q.svg).map((t) => t.t) : []).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const coCum = (t, s) => new RegExp("(?<![\\p{L}\\p{N}])" + low(s).replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u").test(t);
const LOI_DAN = [...new Set(DE.concat(S.pool).map((id) => bank(id).note))].map((note, i) => ({ q: note, note: true, ten: "note" + (i + 1) }));
const doLo = (qs, name, notes) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so = q.type === "num" && q.ans >= 10 ? [q.ans] : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const lien = q.type === "order" ? q.o.slice(1).map((o, k) => [q.o[k], o]) : [], cum = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : [];
    const nam = namTimeline.get(q) || [];
    qs.concat(notes || []).forEach((p) => {
      if (p === q) return;
      const C = p.note ? [p.q] : chu(p), T = C.map(low), at = `${name(p)} → ${name(q)}: `;
      so.filter((x) => C.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l) && coCum(t, r))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      lien.filter(([a, b]) => T.some((t) => t.includes(low(a)) && t.includes(low(b)) && t.indexOf(low(a)) < t.indexOf(low(b)))).forEach(([a, b]) => lo.push(at + a + " → " + b));
      nam.filter((y) => T.some((t) => coCum(t, y))).forEach((y) => lo.push(at + "năm " + y));
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
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “= 37”, cả hai vế một cặp nối, hai ô liền nhau của câu sắp xếp, năm của mốc được
// hỏi trên trục thời gian, lựa chọn đúng
{ const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const k = doLo(qs, (q) => q.q.slice(0, 12)); return k.lo.concat(k.chuLo).map((s) => s.replace(/^.*?: /, "")); };
  const khac = tim("Dân tộc nào chiếm hơn");
  assert.deepEqual(thuLo([tim("trị vì trong bao nhiêu năm"), gia(khac, "Vua ở ngôi được 37 năm.")]), ["37"]);
  assert.deepEqual(thuLo([tim("Nối mỗi loài động vật"), gia(khac, "Chim cánh cụt sống ở châu Nam Cực.")]), ["Chim cánh cụt → Châu Nam Cực"]);
  assert.deepEqual(thuLo([tim("Thẻ nào ghi việc diễn ra sớm hơn"), gia(khac, "Nghĩa quân diệt viện binh giặc ở ải Chi Lăng, rồi Lê Lợi lên ngôi vua, đóng đô ở Đông Kinh.")]), ["Nghĩa quân diệt viện binh giặc ở ải Chi Lăng → Lê Lợi lên ngôi vua, đóng đô ở Đông Kinh"]);
  assert.deepEqual(thuLo([tim("năm của bốn sự kiện thời nhà Nguyễn"), gia(khac, "Sự kiện ấy diễn ra năm 1885.")]), ["năm 1885"]);
  assert.deepEqual(thuLo([tim("Vương quốc Cam-pu-chia. Điều đó cho thấy"), gia(khac, "Ăng-co Vát là biểu tượng, niềm tự hào của cả nước bạn.")]), ["Ăng-co Vát là biểu tượng, niềm tự hào của cả nước"]); }
// bộ đọc hình bắt được hình vẽ sai: hai ô có số đổi chỗ thì đáp án đổi, cột vẽ lệch số ở đỉnh, mốc thời gian ghi năm giảm dần, mũi tên hướng
// bắc chỉ xuống
{ const tim = (has) => kho.find((q) => q.q.includes(has));
  const lao = tim("vị trí nước Lào và các nước tiếp giáp").svg;
  const doi = lao.replace('x="266" y="127"', "@1").replace('x="160" y="217"', 'x="266" y="127"').replace("@1", 'x="160" y="217"');
  const h = docViTri(doi, "Lào"); assert.deepEqual([h["đông"], h["nam"]], ["(2)", "(1)"], "đổi chỗ hai ô có số thì đọc ra vị trí mới");
  assert.throws(() => docCotChau(tim("Số dân châu Phi nhiều hơn").svg.replace(">1 478<", ">1 487<"), "Triệu người"), /AssertionError|khớp/);
  assert.throws(() => docTruc(tim("năm của bốn sự kiện thời nhà Nguyễn").svg.replace(">1831<", ">1800<")), /AssertionError|tăng dần/);
  assert.throws(() => docViTri(lao.replace('points="283,36 290,22 297,36"', 'points="283,64 290,78 297,64"'), "Lào"), /AssertionError|mũi tên/); }

/* ---------- không gần trùng câu của kho Lịch sử và Địa lí lớp 4 và kho Lịch sử và Địa lí 5 cuối kì I (lời giao việc; Rút ra N25, như
   tests/lsdl5-ck1.js): đề bài cùng lựa chọn, ô nối, ô sắp xếp có từ 4 cặp hai âm tiết liền nhau chung với một câu của các kho đó và số cặp chung
   từ một nửa số cặp của câu ít cặp hơn thì báo. Bỏ cách hỏi chung (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu đem so. ---------- */
{
  const CUM = ["mỗi ý sau đúng hay sai", "mỗi ý kiến sau đúng hay sai", "nào dưới đây", "dưới đây", "vì sao", "điều này cho thấy", "bao nhiêu năm", "quan sát sơ đồ",
    "không theo tỉ lệ", "theo đúng trình tự thời gian", "quan sát biểu đồ"];
  const cap2 = (s) => { let t = low(s); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const cauCua = (f) => BANKS.filter(f).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const cu = cauCua((b) => b.file === "4-lsdl.js" || b.id.startsWith("lsdl5-ck1-")), ca = cu.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const P = cu.map((p) => [p, capAm(p)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return P.map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Lịch sử và Địa lí 4, kho cuối kì I:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Lịch sử và Địa lí 4 hay kho cuối kì I");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, chữ trong hình) không có trong sách; tên riêng nhiều chữ (GOP) tính là
   một từ (như tests/lsdl5-ck1.js); cụm từ chung của môn (tên bài, cách hỏi chuẩn: TU_CHUNG) thay bằng dấu ngăn trước khi so; chuỗi so phải có
   ít nhất 5 từ có chữ; câu nói trích nguyên văn (TRICH) không tính. */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const boDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP = ["doi viet nam tuyen truyen giai phong quan", "anh hung luc luong vu trang nhan dan", "quan doi nhan dan viet nam", "viet nam dan chu cong hoa",
  "cong hoa nhan dan trung hoa", "cong hoa dan chu nhan dan lao", "hiep hoi cac quoc gia dong nam a", "thanh pho ho chi minh", "chu tich ho chi minh",
  "quang truong ba dinh", "tuyen ngon doc lap", "mat tran viet minh", "doi nhi dong cuu quoc", "van ly truong thanh", "co cung bac kinh", "tan thuy hoang",
  "quoc trieu hinh luat", "dai thanh toan phap", "hoang viet luat le", "nguyen truong to", "nguyen cong tru", "nguyen tri phuong", "pham phu thu", "nguyen lo trach",
  "ton that thuyet", "phan dinh phung", "phan dinh giot", "be van dan", "to vinh dien", "ta quoc luat", "tran nguyen han", "luong the vinh", "le thanh tong",
  "le thai to", "le canh huy", "ngo sy lien", "nguyen chich", "nguyen trai", "nguyen anh", "nguyen an", "ly huu diem", "trinh van bo", "nong van den",
  "vo nguyen giap", "duong van minh", "do ca xto ri", "dien bien phu", "dinh doc lap", "tan son nhat", "phu kham sai", "toa thi chinh", "nha hat lon",
  "hang ngang", "lung nhai", "lam son", "lam kinh", "le loi", "le lai", "chi lang", "chi linh", "lieu thang", "dong quan", "dong kinh", "dai viet", "dai co viet",
  "hong duc", "van mieu", "quoc tu giam", "trieu hau le", "gia long", "minh mang", "phu xuan", "tu duc", "ham nghi", "huong khe", "can vuong", "tien hai",
  "kim son", "kim dong", "pac bo", "tan trao", "binh nguyen", "him lam", "muong thanh", "muong pon", "thanh son", "quyet thang", "sai gon", "gia dinh",
  "ho chi minh", "a 37", "cam ranh", "trung quoc", "trung hoa", "manh khuong", "mi an ma", "thai lan", "viet nam", "cam pu chia",
  "in do ne xi a", "ma lai xi a", "phi lip pin", "xin ga po", "bru nay", "ti mo let xte", "dong nam a", "vieng chan", "that luong", "luong pha bang",
  "xieng thong", "xieng khoang", "canh dong chum", "lan xang", "pha ngum", "me cong", "ang co vat", "ang co thom", "bay on", "ton le sap", "phnom penh",
  "xiem riep", "kho me", "thai binh duong", "dai tay duong", "an do duong", "bac bang duong", "nam dai duong", "chau dai duong", "chau nam cuc",
  "a ma don", "xa ha ra", "o xtray li a", "hi ma lay a", "can gu ru", "trai dat", "bac my", "nam my", "trung my", "nam cuc", "bac cuc",
  "mon go lo it", "ne gro it", "o ro pe o it", "o xtra lo it", "ai cap", "ke op", "pha ra ong", "pa pi rut", "song nin", "cho le o pat", "ghi da",
  "hy lap", "pac te nong", "a cro pon", "a te na", "a ten", "po xe dong", "he ra", "mi lo", "o lim pic", "no e", "lien hop quoc", "chu thap do", "niu ooc",
  "hoa ky", "dong thap", "cao bang", "tuyen quang", "dien bien", "khanh hoa", "ninh binh", "hung yen", "lang son", "nghe an", "ha tinh", "quang tri",
  "thanh hoa", "ha noi", "da nang", "can tho", "bien dong", "chien tranh the gioi thu hai"]
  .sort((a, b) => b.length - a.length).map((g, i) => [" " + g + " ", " g" + i + " "]);
const TRICH = ["Một thước núi, một tấc sông của ta, lẽ nào lại tự tiện vứt bỏ đi được"];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ (như tests/lsdl5-ck1.js): băm mọi chuỗi k từ của chữ đã chuẩn hoá, chỉ so thật (includes) khi băm có
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
const TU_CHUNG = [...CHU_DE, "mỗi ý sau đúng hay sai", "mỗi ý kiến sau đúng hay sai", "theo đúng trình tự thời gian", "quan sát sơ đồ (không theo tỉ lệ)",
  "quan sát biểu đồ số dân các châu lục năm 2024 (theo sách)", "các nước láng giềng", "tìm hiểu thế giới", "chung tay xây dựng thế giới", "các châu lục và đại dương",
  "dân số và các chủng tộc", "sách Kết nối tri thức", "bản chỉnh sửa năm 2026", "Sở GD&ĐT ra đề chung cuối kì một số môn lớp 5", "Bài 28 là bài ôn tập"]
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

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả kho cuối kì I cùng file và câu riêng của
   các đề ngẫu nhiên ---------- */
{
  const khac = BANKS.filter((b) => !b.id.startsWith("lsdl5-ck2-")).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n + " câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu, " + kho.filter((q) => q.svg).length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("LSDL5 CK2 OK");
