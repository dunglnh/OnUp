// Kiểm tra ngân hàng Tin học và Công nghệ 5 cuối kì I của Phiên N5-ck1-tincn (data/banks/5-tincn.js, tincn5-ck1-*), theo mẫu
// tests/tincn4-ck2.js, tests/lsdl5-ck1.js và các ý chung của các phiên lớp 5 (đoạn “Chung của các phiên lớp 5” ở mục 7 của
// docs/KE-HOACH-NOI-DUNG.md). Kho = Đề 1 + Đề 2 (không có câu riêng); số câu, số đề lấy từ danh mục (không ghi cứng).
// Tính lại đáp án bằng code (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho, đúng đề ghi ở id) theo bảng ghi trong
// script (theo sách Tin học 5, Công nghệ 5 in năm 2026): công cụ của Paint (Bài 8A, 9A), nút trên website (Bài 2), cách ghi nguồn (Bài 5),
// nhà sáng chế và năm được cấp bằng sáng chế (Công nghệ Bài 2), bộ phận của đồng hồ đeo tay, treo tường (Bài 4), tiêu chí đánh giá sản phẩm
// mẫu (đúng hình dạng, chắc chắn, thẩm mĩ), bộ phận của điện thoại cố định, số điện thoại khẩn cấp, các bước gọi điện (Bài 5), khoang của tủ
// lạnh và thời gian giữ thịt, cá (Bài 6); thứ tự các việc khi sao chép văn bản (Bài 7).
// Hình đọc lại từ chuỗi SVG: cây thư mục (docCay: mỗi dòng một tên, lùi vào 26 đơn vị mỗi mức; biểu tượng bên trái tên: ổ đĩa, thư mục,
// tệp (tên có đuôi như .png); đoạn nối dọc từ dưới biểu tượng của thư mục cha, đoạn nối ngang tới từng con, không thừa đoạn nào) rồi tính
// đường đi tới một tệp, số thư mục con nằm ngay bên trong một thư mục; sơ đồ các bước thiết kế (docBuoc: các ô từ trên xuống, mũi tên từ
// ô trên tới ô dưới, một ô “?”), so với bốn bước của Bài 3. Chữ trong hình từ cỡ 13 và nằm trọn trong khung hình.
// Rồi kiểm tra mức độ, ma trận (10 Biết, 8 Hiểu, 7 Vận dụng; mỗi đề 13 câu Tin học, 12 câu Công nghệ; hai đề cố định chia đúng ma trận, mỗi
// ô có rút có đúng 2 câu, một ở mỗi đề), dạng câu (ít nhất 2 câu đúng/sai 4 ý, kiểu Đ/S không lặp), nối cột có một ô thừa và không nối được
// nhờ chữ trùng, đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một
// phần sáu số câu nhiều lựa chọn, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có, đáp án không lặp chữ của nhãn chủ
// đề (bỏ tiền tố “Tin học · ”, “Công nghệ · ”), lời giải không nhắc vị trí phương án, gọi người làm bài là “bạn”, chữ như sách (“hoá”, “hoạ”,
// “khoẻ”…; không tên hãng điện thoại, tủ lạnh; tên cơ quan, địa danh sách in năm 2026 đã sửa ở tr. 13–17), note (phạm vi, phần A, B của Chủ
// đề 5, Bài 7 Công nghệ, đề cương của trường, đề chung của Sở), đề bài không trùng, rút thử (đúng ma trận, gặp đủ kho; đã làm hết một đề
// cố định thì chỉ rút câu của đề kia), dò lộ đáp án giữa mọi cặp câu của kho và lời dặn (đề “Ôn chủ đề” rút chung mọi câu của một chủ đề;
// cách dò ở chú thích của doLo), đề bài không gần trùng câu của data/banks/4-tincn.js (cặp hai âm tiết liền nhau chung). Có ../OnUp-Book
// (repo riêng tư): mọi trường chữ, cả chữ trong hình, không có chuỗi 8 từ liền nhau trùng chữ OCR của mọi cuốn (bỏ dấu, gộp nguyên âm, tên
// riêng nhiều chữ tính là một từ; DO_SACH=1 in chuỗi 6 từ). So thêm với mọi câu của các kho khác, cả câu riêng của các đề ngẫu nhiên: không
// có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 6 từ và câu gần trùng kho lớp 4.
// Chạy: node tests/tincn5-ck1.js → in TINCN5 OK. DO_LO=1 in đáp án bằng chữ có ở câu khác để người làm xem.
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
const S = { de1: "tincn5-ck1-de1", de2: "tincn5-ck1-de2", pool: "tincn5-ck1-ngau-nhien" };
const FILE = "5-tincn.js";
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
  assert.ok(b.grade === 5 && b.subject === "Tin học và Công nghệ" && b.minutes === 35 && b.file === FILE, id + ": lớp 5, Tin học và Công nghệ, 35 phút, file " + FILE);
  if (id !== S.pool) assert.equal(b.questions.length, b.n, id + ": số câu bằng n của danh mục");
});
const kho = pool.questions;
assert.equal(kho.filter((q) => q.src === S.pool).length, 0, "đề ngẫu nhiên không có câu riêng (lời giao việc: hai đề cố định)");
assert.equal(kho.length, sum(DE.map((id) => bank(id).n)), "kho = câu của hai đề cố định");
{
  const cal = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ck1 = /id: "ck1-l5"[\s\S]*?banks: \[([^\]]*)\]/.exec(cal);
  assert.ok(ck1, "lịch có kì ck1-l5");
  DE.concat(S.pool).forEach((id) => assert.ok(ck1[1].includes(`"${id}"`), id + " gắn vào ck1-l5"));
}
const ten = new Map();
DE.forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("tincn5-ck1-", "") + "#" + (i + 1))));

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
// chữ trong hình từ cỡ 13 và nằm trọn trong khung hình
const chuHinh = (svg, at) => {
  const v = nums(/viewBox="([^"]+)"/.exec(svg)[1]);
  TEXTS(svg).forEach((t) => {
    assert.ok(t.fs >= 13, `${at}: chữ “${t.t}” cỡ ${t.fs}, cần từ cỡ 13`);
    const w = rong(t), x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0];
    assert.ok(x0 >= v[0] && x0 + w <= v[0] + v[2] && t.at[1] - 0.75 * t.fs >= v[1] && t.at[1] + 0.25 * t.fs <= v[1] + v[3], `${at}: chữ “${t.t}” tràn khỏi khung hình`);
  });
};
/* Cây thư mục (Tin học 5 Bài 4, Hình 18, 19): mỗi dòng một tên (chữ căn trái), dòng sau thấp hơn dòng trước; mức lùi vào 26 đơn vị mỗi mức,
   dòng đầu là ổ đĩa (mức 0), con chỉ sâu hơn cha một mức. Bên trái mỗi tên một biểu tượng (hình chữ nhật cách chữ 4–22 đơn vị, ngang tầm chữ):
   ổ đĩa tô màu line, thư mục tô màu sun, tệp tô màu surface; tên có đuôi (.png, .docx, .mp4…) là tệp và tệp không có con. Thư mục cha của
   một dòng là dòng gần nhất phía trên có mức nhỏ hơn một. Đường nối: mỗi thư mục có con một đoạn dọc ở giữa biểu tượng, từ ngay dưới biểu
   tượng tới ngang tầm con cuối; mỗi con một đoạn ngang từ đoạn dọc đó tới sát biểu tượng của con; không có đoạn thừa. Trả về { duong(tên):
   các thư mục phải mở lần lượt để tới tên đó, “D: › A › B”; con(tên): thư mục con nằm ngay bên trong }. */
const BUOC_CAY = 26;
const docCay = (svg) => {
  daDoc.add(svg);
  const tx = TEXTS(svg).sort((a, b) => a.at[1] - b.at[1]), rc = RECTS(svg), x0 = tx[0].at[0];
  assert.ok(tx.every((t) => t.anchor === "start"), "tên trong cây thư mục căn trái");
  tx.forEach((t, i) => assert.ok(i === 0 || t.at[1] > tx[i - 1].at[1], "mỗi dòng một tên"));
  const nut = tx.map((t) => {
    const d = (t.at[0] - x0) / BUOC_CAY;
    assert.ok(Number.isInteger(d) && d >= 0, `“${t.t}” lùi vào đúng bội của ${BUOC_CAY} đơn vị`);
    const ic = rc.filter((r) => r.x + r.w <= t.at[0] - 4 && r.x >= t.at[0] - 24 && r.y < t.at[1] && r.y + r.h > t.at[1] - 12);
    assert.equal(ic.length, 1, `“${t.t}” có đúng một biểu tượng bên trái`);
    const loai = { line: "o", sun: "thu-muc", surface: "tep" }[ic[0].fill];
    assert.ok(loai, `biểu tượng của “${t.t}” tô màu line, sun hoặc surface`);
    return { ten: t.t, d, y: t.at[1], ic: ic[0], loai };
  });
  assert.equal(nut[0].d, 0, "dòng đầu là ổ đĩa (mức 0)");
  assert.ok(/^Ổ đĩa [A-Z]:$/.test(nut[0].ten) && nut[0].loai === "o", "dòng đầu ghi “Ổ đĩa D:”, biểu tượng ổ đĩa");
  assert.equal(rc.length, nut.length, "mỗi dòng đúng một biểu tượng, không có hình chữ nhật thừa");
  nut.forEach((v, i) => {
    if (i === 0) return;
    assert.ok(v.d >= 1 && v.d <= nut[i - 1].d + 1, `“${v.ten}” chỉ sâu hơn dòng trên tối đa một mức`);
    for (let j = i - 1; j >= 0; j--) if (nut[j].d === v.d - 1) { v.cha = nut[j]; break; }
    assert.ok(v.loai !== "o", "chỉ dòng đầu là ổ đĩa");
    assert.equal(v.loai === "tep", /\.[a-z0-9]{2,4}$/.test(v.ten), `“${v.ten}”: tên có đuôi thì là tệp, không thì là thư mục`);
    assert.ok(v.cha.loai !== "tep", `tệp “${v.cha.ten}” không chứa gì bên trong`);
  });
  assert.equal(new Set(nut.map((v) => v.ten)).size, nut.length, "mỗi tên chỉ một dòng");
  // đường nối
  const ln = LINES(svg), dung = new Set();
  const tim = (f, s) => { const k = ln.filter((l, i) => !dung.has(i) && f(l)); assert.equal(k.length, 1, s); dung.add(ln.indexOf(k[0])); };
  nut.forEach((p) => {
    const con = nut.filter((v) => v.cha === p);
    if (!con.length) return;
    const cx = p.ic.x + p.ic.w / 2, cuoi = con[con.length - 1];
    tim((l) => l.a[0] === cx && l.b[0] === cx && Math.abs(Math.min(l.a[1], l.b[1]) - (p.ic.y + p.ic.h)) <= 2 && close(Math.max(l.a[1], l.b[1]), cuoi.y - 6), `“${p.ten}” có đoạn nối dọc từ biểu tượng xuống tới con cuối`);
    con.forEach((c) => tim((l) => l.a[1] === c.y - 6 && l.b[1] === c.y - 6 && Math.min(l.a[0], l.b[0]) === cx && Math.abs(Math.max(l.a[0], l.b[0]) - c.ic.x) <= 3, `“${c.ten}” có đoạn nối ngang tới thư mục cha “${p.ten}”`));
  });
  assert.equal(dung.size, ln.length, "cây thư mục không có đoạn nối thừa");
  const theoTen = (s) => { const v = nut.find((x) => x.ten === s); assert.ok(v, "cây không có “" + s + "”"); return v; };
  return {
    duong: (s) => { const a = []; for (let v = theoTen(s).cha; v; v = v.cha) a.unshift(v.d === 0 ? v.ten.replace("Ổ đĩa ", "") : v.ten); return a.join(" › "); },
    con: (s) => nut.filter((v) => v.cha === theoTen(s) && v.loai === "thu-muc").map((v) => v.ten),
    ten: nut.map((v) => v.ten)
  };
};
/* Sơ đồ các bước (Công nghệ 5 Bài 3): các ô chữ nhật từ trên xuống, chữ của mỗi ô (một hay hai dòng, căn giữa) nằm trong ô; giữa hai ô liền
   nhau một đoạn dọc từ đáy ô trên và một đầu tam giác chạm đỉnh ô dưới (mũi tên đi xuống); ô “?” tô màu sun-soft. Trả về chữ các ô theo thứ tự. */
const docBuoc = (svg) => {
  daDoc.add(svg);
  const o = RECTS(svg).sort((a, b) => a.y - b.y), tx = TEXTS(svg);
  const chu = o.map((r) => {
    const t = tx.filter((x) => x.at[0] > r.x && x.at[0] < r.x + r.w && x.at[1] > r.y && x.at[1] < r.y + r.h).sort((a, b) => a.at[1] - b.at[1]);
    assert.ok(t.length && t.every((x) => x.anchor === "middle" && close(x.at[0], r.x + r.w / 2)), "ô nào cũng có chữ căn giữa");
    const s = t.map((x) => x.t).join(" ");
    assert.equal(r.fill === "sun-soft", s === "?", "chỉ ô “?” tô màu sun-soft");
    return s;
  });
  assert.equal(sum(o.map((r) => tx.filter((x) => x.at[0] > r.x && x.at[0] < r.x + r.w && x.at[1] > r.y && x.at[1] < r.y + r.h).length)), tx.length, "chữ nào cũng nằm trong một ô");
  const ln = LINES(svg), dau = POLYS(svg).filter((g) => g.p.length === 3);
  assert.equal(ln.length, o.length - 1, "giữa hai ô liền nhau một đoạn nối"); assert.equal(dau.length, o.length - 1, "mỗi đoạn nối một đầu mũi tên");
  o.slice(1).forEach((r, i) => {
    const tren = o[i], cx = r.x + r.w / 2;
    assert.ok(ln.some((l) => l.a[0] === cx && l.b[0] === cx && close(Math.min(l.a[1], l.b[1]), tren.y + tren.h) && Math.max(l.a[1], l.b[1]) < r.y), `có đoạn nối từ ô “${chu[i]}” xuống ô dưới`);
    assert.ok(dau.some((g) => { const d = g.p.reduce((a, p) => (p[1] > a[1] ? p : a)); return close(d[0], cx) && close(d[1], r.y) && g.p.every((p) => p[1] <= d[1]); }), `mũi tên chỉ xuống ô “${chu[i + 1]}”`);
  });
  return chu;
};

/* ---------- bảng tra (theo sách Tin học 5, Công nghệ 5 in năm 2026) ---------- */
// Tin học 5 Bài 8A: công cụ của Paint và việc công cụ đó làm (nhóm công cụ vẽ hình, công cụ chọn, tô màu, viết chữ; lệnh Flip horizontal
// trong mục Rotate)
const PAINT = { Oval: "Vẽ hình ô van", Line: "Vẽ đoạn thẳng", Rectangle: "Vẽ hình chữ nhật", Text: "Viết chữ lên trang vẽ", Fill: "tô màu", Select: "chọn",
  "Flip horizontal": "Lật hình theo chiều ngang" };
// Tin học 5 Bài 2: nút tìm kiếm thường có hình kính lúp, nút về trang chủ hình ngôi nhà; Bài 5: cách ghi nguồn
const NUT_WEB = { "nút tìm kiếm": "kính lúp", "trang chủ": "ngôi nhà" };
const GHI_NGUON = { "không biết ai là tác giả": "sưu tầm", "kể lại bằng lời của mình": "phỏng theo" };
// Công nghệ 5 Bài 2: nhà sáng chế, sáng chế và năm được cấp bằng sáng chế (tr. 10–12)
const SANG_CHE = { "Giêm Oát": ["Động cơ hơi nước", 1784], "A-lếch-xan-đơ Gra-ham Beo": ["Điện thoại", 1876], "Tô-mát Ê-đi-xơn": ["Bóng đèn sợi đốt", 1879],
  "Các Ben": ["Ô tô", 1886] };
// Công nghệ 5 Bài 3: bốn bước chính khi thiết kế (tr. 15)
const BUOC_TK = ["Hình thành ý tưởng về sản phẩm", "Vẽ phác thảo sản phẩm và lựa chọn vật liệu, dụng cụ", "Làm sản phẩm mẫu", "Đánh giá và hoàn thiện sản phẩm"];
// Công nghệ 5 Bài 4: bộ phận của đồng hồ đồ chơi (bản vẽ phác thảo đồng hồ đeo tay: vỏ, mặt số, quai đeo, núm vặn, bộ kim); đồng hồ treo
// tường không đeo vào tay nên không có quai đeo; tiêu chí đánh giá sản phẩm mẫu
const DONG_HO = { "đeo tay": ["Vỏ đồng hồ", "Mặt số", "Quai đeo", "Kim giờ và kim phút"], "treo tường": ["Vỏ đồng hồ", "Mặt số", "Kim giờ và kim phút"] };
const TIEU_CHI = { "mặt số tròn, đủ 12 số": ["đúng hình dạng", true], "kim quay được": ["đúng hình dạng", true], "một bên quai đeo bị bong keo": ["chắc chắn", false],
  "màu sắc tươi, hài hoà": ["thẩm mĩ", true] };
// Công nghệ 5 Bài 5: bộ phận cơ bản của điện thoại cố định; số điện thoại khẩn cấp (tr. 22); các bước gọi điện (tr. 23)
const DT_CO_DINH = "Ống nghe và nói, bàn phím";
const KHAN_CAP = { 111: "bảo vệ trẻ em", 112: "tìm kiếm, cứu nạn", 113: "công an", 114: "cứu hoả", 115: "cấp cứu y tế" };
const BUOC_GOI = [/^Mở ứng dụng Điện thoại$/, /chọn số/, /^Nhấn biểu tượng Gọi$/, /Kết thúc cuộc gọi$/];
// Công nghệ 5 Bài 6: khoang của tủ lạnh; thịt, cá ở khoang làm lạnh (1 °C đến 7 °C) giữ được từ 3 ngày đến 5 ngày (tr. 26–29)
const TU_LANH = { "cấp đông": /nước đá|đông lạnh/, "làm lạnh": /tươi mát|cho mát|rau|sữa/, giuLanh: "Từ 3 ngày đến 5 ngày" };
const motDung = (q, f) => { const d = q.o.map(f); assert.deepEqual(d.map(Boolean), q.o.map((o, i) => i === 0), "chỉ lựa chọn đầu khớp: " + q.q.slice(0, 50)); return q.o[0]; };

/* ---------- kiểm tra từng câu: id (đề), has (chữ có trong đề bài), right(q) (đáp án tính bằng code) ---------- */
const CHECKS = [
  { id: S.de1, has: "muốn tới được tệp «Thiep-Tet.png»", right: (q) => {
    const c = docCay(q.svg), dung = c.duong("Thiep-Tet.png");
    return motDung(q, (o) => o === dung); } },
  { id: S.de2, has: "thư mục «Gia-dinh-Nam» có bao nhiêu thư mục con", right: (q) => {
    const c = docCay(q.svg), con = c.con("Gia-dinh-Nam");
    const so = ["không", "một", "hai", "ba", "bốn", "năm"][con.length];
    assert.ok(q.x.includes(so + " thư mục") && con.every((t) => q.x.includes(t)), "lời giải ghi số thư mục con bằng chữ và kể đủ tên");
    return con.length; } },
  { id: S.de1, has: "Bước ở ô có dấu “?” là", right: (q) => {
    const b = docBuoc(q.svg), k = b.indexOf("?");
    assert.equal(b.length, BUOC_TK.length, "sơ đồ có đủ bốn bước");
    b.forEach((s, i) => assert.ok(i === k || s === BUOC_TK[i], `ô thứ ${i + 1} ghi đúng bước của sách: ${s}`));
    assert.ok(q.o.slice(1).every((o) => !BUOC_TK.includes(o)), "lựa chọn sai không là bước nào của thiết kế");
    return BUOC_TK[k]; } },
  { id: S.de1, has: "công cụ nào dùng để tô màu kín", right: (q) => {
    assert.ok(q.o.every((o) => PAINT[o]), "lựa chọn là tên công cụ của Paint"); return motDung(q, (o) => PAINT[o] === "tô màu"); } },
  { id: S.de2, has: "Nối mỗi công cụ của phần mềm Paint", right: (q) => {
    assert.ok(!q.r.slice(q.l.length).some((r) => q.l.some((l) => PAINT[l] === r)), "ô thừa không là việc của công cụ nào ở cột trái");
    assert.ok(q.r.slice(q.l.length).every((r) => Object.values(PAINT).includes(r)), "ô thừa là việc của một công cụ, lệnh khác của Paint");
    return q.l.map((l) => PAINT[l]); } },
  { id: S.de1, has: "giống hệt mà không phải vẽ lại", right: (q) => motDung(q, (o) => /Select/.test(o) && /Copy/.test(o) && /Paste/.test(o)) },
  { id: S.de2, has: "nút tìm kiếm thường có hình chiếc", right: () => NUT_WEB["nút tìm kiếm"] },
  { id: S.de1, has: "không biết ai là tác giả", right: () => GHI_NGUON["không biết ai là tác giả"] },
  { id: S.de1, has: "điệp khúc lần hai mà không phải gõ lại", right: (q) => { // chọn → sao chép → đặt con trỏ → dán
    const thu = [/^Chọn phần/, /gõ phím C$/, /^Đặt con trỏ/, /gõ phím V$/];
    return thu.map((r) => { const k = q.o.filter((o) => r.test(o)); assert.equal(k.length, 1, "nhận ra ô: " + r); return k[0]; }); } },
  { id: S.de1, has: "Nối mỗi nhà sáng chế", right: (q) => {
    const tim = (s) => SANG_CHE[s] || assert.fail("không có nhà sáng chế " + s);
    q.l.forEach((l) => assert.ok(q.x.includes(String(tim(l)[1])), `lời giải ghi năm ${l} được cấp bằng sáng chế`));
    const thua = q.r.slice(q.l.length); assert.ok(thua.every((r) => !Object.values(SANG_CHE).some(([s]) => low(r).startsWith(low(s)))), "ô thừa không là sáng chế của ai trong bảng");
    return q.l.map((l) => q.r.find((r) => low(r).startsWith(low(tim(l)[0])))); } },
  { id: S.de1, has: "đồng hồ treo tường đồ chơi", right: (q) => {
    const thieu = DONG_HO["đeo tay"].filter((b) => !DONG_HO["treo tường"].includes(b)); assert.equal(thieu.length, 1);
    assert.ok(q.o.slice(1).every((o) => DONG_HO["treo tường"].includes(o)), "lựa chọn sai là bộ phận đồng hồ treo tường vẫn cần");
    return thieu[0]; } },
  { id: S.de2, has: "Mỗi nhận xét sau đúng hay sai?", right: (q) => {
    const co = Object.keys(TIEU_CHI).filter((f) => q.q.includes(f)); assert.equal(co.length, Object.keys(TIEU_CHI).length, "đề tả đủ các điểm trong bảng TIEU_CHI");
    const dat = (tc) => co.filter((f) => TIEU_CHI[f][0] === tc).every((f) => TIEU_CHI[f][1]);
    return q.o.map((o) => { let m;
      if ((m = /^Sản phẩm (?:đã )?đạt tiêu chí (.+)\.$/.exec(o))) return dat(m[1]);
      if (/^Nhóm cần dán lại quai đeo/.test(o)) return !dat("chắc chắn") && co.some((f) => /quai đeo/.test(f) && !TIEU_CHI[f][1]);
      return assert.fail("không đọc được ý: " + o); }); } },
  { id: S.de1, has: "có hai bộ phận cơ bản nào?", right: (q) => DT_CO_DINH },
  { id: S.de2, has: "Nối mỗi số điện thoại khẩn cấp", right: (q) => {
    const thua = q.r.slice(q.l.length); assert.ok(thua.every((r) => !Object.values(KHAN_CAP).some((v) => low(r).includes(v.split(",")[0]))), "ô thừa không là việc của số khẩn cấp nào");
    return q.l.map((l) => { assert.ok(KHAN_CAP[l], "số " + l + " có trong bảng"); const k = q.r.filter((r) => low(r).includes(KHAN_CAP[l].split(",")[0])); assert.equal(k.length, 1, "nhận ra việc của số " + l); return k[0]; }); } },
  { id: S.de2, has: "gọi điện cho bà bằng số đã lưu trong danh bạ", right: (q) => BUOC_GOI.map((r) => { const k = q.o.filter((o) => r.test(o)); assert.equal(k.length, 1, "nhận ra bước: " + r); return k[0]; }) },
  { id: S.de1, has: "Khoang cấp đông của tủ lạnh dùng để làm gì?", right: (q) => motDung(q, (o) => TU_LANH["cấp đông"].test(o) && !TU_LANH["làm lạnh"].test(o)) },
  { id: S.de2, has: "giữ được bao lâu?", right: (q) => { assert.ok(q.q.includes("1 °C đến 7 °C") && q.q.includes("khoang làm lạnh")); return TU_LANH.giuLanh; } }
];
let n = 0;
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = ten.get(q) + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const want = c.right(q);
  const got = { mc: () => q.o[0], fill: () => q.ans[0], num: () => q.ans, tf: () => q.a, tf4: () => q.a, order: () => q.o, match: () => q.r.slice(0, q.l.length) }[q.type]();
  assert.ok(want !== undefined, at + ": không tính được đáp án");
  if (Array.isArray(want)) assert.deepEqual(got, want, at);
  else assert.ok(typeof want === "number" ? close(got, want) : got === want, `${at}: đáp án ${JSON.stringify(got)}, tính được ${JSON.stringify(want)}`);
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": lựa chọn sai trùng đáp án đúng");
  checked.add(q); n++;
});
// câu có hình, câu trả lời bằng số, câu sắp xếp, nối cột, điền nào cũng phải có kiểm tra
kho.filter((q) => q.svg || ["num", "order", "match", "fill"].includes(q.type)).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
kho.filter((q) => q.svg).forEach((q) => {
  assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại: " + q.q.slice(0, 60)); chuHinh(q.svg, ten.get(q));
  const r = Quiz.svg(q.svg); assert.ok(r.svg && !r.problems.length, "bộ lọc hình bỏ bớt: " + q.q.slice(0, 40));
});
// bộ đọc hình bắt được hình vẽ sai: tên lùi sai mức, biểu tượng thư mục cho một tệp, thiếu đoạn nối, thứ tự bước đổi chỗ, mũi tên chỉ lên
{ const tim = (has) => kho.find((q) => q.q.includes(has));
  const c1 = tim("muốn tới được tệp").svg, c2 = tim("thư mục «Gia-dinh-Nam»").svg, b = tim("Bước ở ô có dấu").svg;
  assert.throws(() => docCay(c1.replace('x="112" y="154"', 'x="100" y="154"')), /bội của 26/);
  assert.throws(() => docCay(c1.replace('<rect x="118" y="166" width="12" height="15" fill="surface"', '<rect x="118" y="166" width="12" height="15" fill="sun"')), /tên có đuôi/);
  assert.throws(() => docCay(c2.replace(/<line [^>]*\/>/, "")), /đoạn nối/);
  assert.deepEqual(docCay(c2).con("Hinh-anh"), ["Tet-2026", "He-2026"], "bộ đọc tự thử: thư mục con của Hinh-anh");
  assert.equal(docCay(c1).duong("San-pham"), "D: › Lop-5A › Tin-hoc", "bộ đọc tự thử: đường tới thư mục San-pham");
  assert.throws(() => docBuoc(b.replace(">?<", ">Làm sản phẩm mẫu<")), /sun-soft/);
  const doi = b.replace(">Hình thành ý tưởng về sản phẩm<", ">Đánh giá và hoàn thiện sản phẩm<");
  assert.throws(() => CHECKS[2].right(Object.assign({}, tim("Bước ở ô có dấu"), { svg: doi })), /bước của sách/);
  assert.throws(() => docBuoc(b.replace(/points="154,(\d+) 166,\1 160,(\d+)"/, (m, a, c) => `points="154,${c} 166,${c} 160,${a}"`)), /mũi tên chỉ xuống/); }

/* ---------- mức độ và ma trận ---------- */
const M = pool.pool.matrix, cells = Object.values(M), CHU_DE = Object.keys(M);
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), pool.n, "tổng ma trận bằng n");
assert.ok(CHU_DE.every((t) => /^(Tin học|Công nghệ) · /.test(t)), "chủ đề có tiền tố “Tin học · ” hoặc “Công nghệ · ”");
const phan = (pre) => sum(CHU_DE.filter((t) => t.startsWith(pre)).map((t) => sum(M[t])));
assert.deepEqual([phan("Tin học · "), phan("Công nghệ · ")], [13, 12], "13 câu Tin học, 12 câu Công nghệ như kho Tin học và Công nghệ 4 cuối kì I");
CHU_DE.forEach((t) => assert.ok(("chu-de:5:tincn:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
DE.forEach((id) => {
  const d = bank(id).questions;
  assert.deepEqual([...new Set(d.map((q) => q.topic))], CHU_DE, id + ": đủ chủ đề, theo thứ tự của ma trận");
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `${id} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = kho.filter((q) => q.topic === t && q.lv === l);
  assert.deepEqual(o.map((q) => q.src).sort(), v[l - 1] ? DE.slice().sort() : [], `ô (${t}, mức ${l}): một câu ở mỗi đề`);
  assert.ok(v[l - 1] <= 1, `ô (${t}, mức ${l}) rút nhiều nhất 1 câu`);
}));
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 2 && !kho.some((q) => q.type === "essay"), "ít nhất 2 câu đúng/sai 4 ý, không có câu tự luận");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.equal(Math.max(...Object.values(kieu)), 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
["match", "order", "fill", "num", "tf", "tf4"].forEach((t) => assert.ok(kho.some((q) => q.type === t), "kho có câu dạng " + t));
kho.filter((q) => q.type === "order").forEach((q) => assert.ok(q.o.length >= 4 && new Set(q.o).size === q.o.length, "câu sắp xếp có ít nhất 4 ô khác nhau"));
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
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b; nhãn hiện trên câu là tên chủ đề), trừ khi mọi lựa chọn cùng có chữ đó
{ const phanNhan = (t) => t.replace(/^(Tin học|Công nghệ) · /, "").split(/ và |, /).map((s) => s.trim().toLowerCase()).filter((s) => s.includes(" ") || s.length >= 6);
  kho.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => {
    if (low(d).includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => low(o).includes(c)), `đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); }); }
// lời giải không nhắc vị trí phương án (app xáo phương án); gọi người làm bài là “bạn”; chữ như sách; không tên hãng điện thoại, tủ lạnh;
// tên cơ quan, địa danh sách Tin học 5 in năm 2026 đã sửa ở tr. 13–17 (“Cục Khí tượng Thủy văn”, “vùng đất cao nguyên”, “điểm du lịch biển”,
// “tỉnh Lào Cai”)
const HANG = /\b(Samsung|Apple|iPhone|Nokia|Oppo|OPPO|Xiaomi|Vivo|Realme|Huawei|Panasonic|Toshiba|Sharp|LG|Electrolux|Aqua|Hitachi|Sanyo|Sony|Casio|Bphone)\b/;
const chuCau = (q) => [q.q, q.x].concat(q.o || [], q.l || [], q.r || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans)).join(" ");
kho.forEach((q) => {
  assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x), "lời giải nhắc vị trí của phương án: " + q.q.slice(0, 50));
  const C = chuCau(q);
  assert.ok(!/(^|[^\p{L}])em([^\p{L}]|$)/u.test(C.replace(/trẻ em/giu, "")), "gọi người làm bài là “bạn”, không “em” (“trẻ em” thì được): " + q.q.slice(0, 50));
  assert.ok(!/hóa|họa|thủy|khỏe|tùy|hòa/u.test(C), "viết “hoá”, “hoạ”, “thuỷ”, “khoẻ”, “tuỳ”, “hoà” như sách: " + q.q.slice(0, 50));
  assert.ok(!HANG.test(C), "không nhắc tên hãng: " + q.q.slice(0, 50));
  assert.ok(!/Tổng cục|thành phố (Lào Cai|Nha Trang|Đà Lạt)|(^|[^\p{L}])huyện([^\p{L}]|$)|63 tỉnh/u.test(C), "tên cơ quan, địa danh như sách in năm 2026: " + q.q.slice(0, 50));
});
// lời dặn: phạm vi, phần A, B của Chủ đề 5, Bài 7 Công nghệ, đề cương của trường, đề chung của Sở
DE.forEach((id) => { const t = bank(id).note;
  assert.ok(/Bài 1–7/.test(t) && /Bài 8A, 9A/.test(t) && /Bài 8B, 9B/.test(t) && /Bài 1–6/.test(t) && /Bài 7/.test(t) && /đề cương của trường/.test(t) && /Sở GD&ĐT ra đề chung cuối kì một số môn lớp 5/.test(t), id + ": note ghi phạm vi, phần A, B, Bài 7 Công nghệ, đề cương của trường, đề chung của Sở");
  assert.ok(t.includes("13 câu") && t.includes("12 câu") && t.includes("10 câu mức Biết, 8 câu mức Hiểu, 7 câu mức Vận dụng"), id + ": note ghi số câu từng môn, từng mức"); });
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
// học sinh đã làm hết một đề cố định (đúng cả): lần rút sau toàn câu của đề kia
[[S.de1, S.de2], [S.de2, S.de1]].forEach(([lam, kia]) => {
  const done = new Set(bank(lam).questions.map(Quiz.key)), kia2 = new Set(bank(kia).questions.map(Quiz.key));
  for (let k = 0; k < 30; k++) thuRut((q) => ({ done: done.has(Quiz.key(q)) ? 1 : 0, wrong: 0 })).questions.forEach((q) => assert.ok(kia2.has(Quiz.key(q)), `đã làm hết ${lam} mà vẫn gặp lại câu của đề đó`));
});

/* ---------- đề bài không trùng câu nào khác trong data/banks/5-tincn.js (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === FILE).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: gocChu(q.q) })));
  deBai.forEach((d) => { const cung2 = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung2, [d.at], "đề bài trùng: " + cung2.join(", ")); });
}

/* ---------- dò lộ đáp án (Rút ra N5, N25, RS9; như tests/lsdl5-ck1.js) giữa mọi cặp câu của kho: đề “Ôn chủ đề” rút chung mọi câu của một
   chủ đề (chủ đề nào cũng dưới 10 câu nên lấy hết), đề ngẫu nhiên rút chung câu của các chủ đề khác; lời dặn (note) hiện ở màn mở đề nên cũng
   là “câu kia”. Chữ của câu kia gồm đề bài, lời giải, các ô, đáp án và chữ trong hình. Số (từ 10) chỉ tìm ở vị trí kết quả (ngay sau “=”,
   “là”, “bằng”, “được”); cặp nối: câu kia có cả hai vế; câu sắp xếp: câu kia có hai ô liền nhau theo đúng thứ tự; đáp án bằng chữ (lựa chọn
   đúng, đáp án điền) có ở câu kia thì in ra với DO_LO=1 để người làm xem (đáp án một, hai từ chỉ tính khi câu kia cùng chủ đề), danh sách đã
   xem ghi ở DA_XEM. ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || [], q.svg ? TEXTS(q.svg).map((t) => t.t) : []).map(String);
const soKQ = (s) => [...String(s).matchAll(/(?:=|(?:^|[\s(])(?:là|bằng|được))\s+(\d{1,3}(?: \d{3})*(?:,\d+)?)(?![\d,])/gu)].map((m) => val(m[1]));
const coCum = (t, s) => new RegExp("(?<![\\p{L}\\p{N}])" + low(s).replace(/[.*+?^${}()|[\]\\/]/g, "\\$&") + "(?![\\p{L}\\p{N}])", "u").test(t);
const LOI_DAN = [...new Set(DE.map((id) => bank(id).note))].map((note, i) => ({ q: note, note: true, ten: "note" + (i + 1) }));
const doLo = (qs, name, notes) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    const so = q.type === "num" && q.ans >= 10 ? [q.ans] : [], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    const lien = q.type === "order" ? q.o.slice(1).map((o, k) => [q.o[k], o]) : [], cum = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : [];
    qs.concat(notes || []).forEach((p) => {
      if (p === q) return;
      const C = p.note ? [p.q] : chu(p), T = C.map(low), at = `${name(p)} → ${name(q)}: `;
      so.filter((x) => C.flatMap(soKQ).some((y) => close(x, y))).forEach((x) => lo.push(at + x));
      cap.filter(([l, r]) => T.some((t) => coCum(t, l) && coCum(t, r))).forEach(([l, r]) => lo.push(at + l + " → " + r));
      lien.filter(([a, b]) => T.some((t) => t.includes(low(a)) && t.includes(low(b)) && t.indexOf(low(a)) < t.indexOf(low(b)))).forEach(([a, b]) => lo.push(at + a + " → " + b));
      cum.filter((s) => (s.split(/\s+/).length > 2 || p.topic === q.topic) && T.some((t) => coCum(t, s))).forEach((s) => chuLo.push(at + s));
    });
  });
  return { lo, chuLo };
};
const tenCau = (q) => (q.note ? q.ten : ten.get(q));
const r = doLo(kho, tenCau, LOI_DAN);
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác của kho (xem tay):\n" + r.chuLo.join("\n"));
// đã xem: câu đánh giá đồng hồ đeo tay (Đề 2) nhắc quai đeo bị bong keo, không cho biết đồng hồ treo tường có cần quai đeo hay không
const DA_XEM = ["de2#20 → de1#20: Quai đeo"];
assert.deepEqual(r.chuLo, DA_XEM, "đáp án bằng chữ có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual(r.lo, [], "lộ đáp án:\n" + r.lo.join("\n"));
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác có “là 114”, cả hai vế một cặp nối, hai ô liền nhau của câu sắp xếp, lựa chọn đúng
{ const tim = (has) => kho.find((q) => q.q.includes(has)), gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const thuLo = (qs) => { const k = doLo(qs, (q) => q.q.slice(0, 12)); return k.lo.concat(k.chuLo).map((s) => s.replace(/^.*?: /, "")); };
  const khac = tim("Thịt, cá cất ở khoang làm lạnh"), so = Object.assign({}, tim("Nối mỗi số điện thoại khẩn cấp"), { type: "num", ans: 114 });
  assert.deepEqual(thuLo([so, gia(khac, "Số gọi cứu hoả là 114.")]), ["114"]);
  assert.deepEqual(thuLo([tim("Nối mỗi nhà sáng chế"), gia(khac, "Giêm Oát làm ra động cơ hơi nước.")]), ["Giêm Oát → Động cơ hơi nước"]);
  assert.deepEqual(thuLo([tim("gọi điện cho bà bằng số đã lưu"), gia(khac, "Mở ứng dụng Điện thoại rồi mở danh bạ, chọn số của bà.")]), ["Mở ứng dụng Điện thoại → Mở danh bạ, chọn số của bà"]);
  assert.deepEqual(thuLo([tim("bảo tàng có hoạt động gì"), gia(khac, "Xem chủ đề Hoạt động cho thiếu nhi của website.")]), ["Hoạt động cho thiếu nhi"]); }

/* ---------- không gần trùng câu của kho Tin học và Công nghệ lớp 4 (lời giao việc; Rút ra N25, như tests/lsdl5-ck1.js): đề bài cùng lựa
   chọn, ô nối, ô sắp xếp có từ 4 cặp hai âm tiết liền nhau chung với một câu của data/banks/4-tincn.js và số cặp chung từ một nửa số cặp của
   câu ít cặp hơn thì báo. Bỏ cách hỏi chung (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của hai file. ---------- */
{
  const CUM = ["mỗi ý sau đúng hay sai", "nào sau đây", "dưới đây", "bạn nên làm gì", "theo đúng thứ tự", "sắp xếp các việc"];
  const cap2 = (s) => { let t = low(s); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const cauCua = (file) => BANKS.filter((b) => b.file === file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const lop4 = cauCua("4-tincn.js"), ca = lop4.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const P4 = lop4.map((p) => [p, capAm(p)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return P4.map(([p, d]) => { const chung = [...c].filter((x) => d.has(x)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${p.q.slice(0, 50)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Tin học và Công nghệ 4:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Tin học và Công nghệ 4");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (đề bài, lựa chọn, lời giải, chữ trong hình) không có trong sách; tên riêng nhiều chữ (GOP) tính là
   một từ; cụm từ chung của môn (tên bài, tên chủ đề, tên bước, thuật ngữ như sách: TU_CHUNG) thay bằng dấu ngăn trước khi so; chuỗi so phải có
   ít nhất 5 từ có chữ. */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const boDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP = ["file explorer", "this pc", "microsoft word", "microsoft paint", "giem oat", "to mat e di xon", "a lech xan do gra ham beo", "cac ben",
  "flip horizontal", "ket noi tri thuc"].sort((a, b) => b.length - a.length).map((g, i) => [" " + g + " ", " g" + i + " "]);
const khongDau = (s) => { let t = " " + boDau(s) + " "; GOP.forEach(([a, b]) => { while (t.includes(a)) t = t.replace(a, b); });
  return t.trim().split(" ").map((w) => (/^g\d+$/.test(w) ? w : w.replace(/[aeiouy]+/g, "a"))).join(" "); };
const TU_CHUNG = [...CHU_DE.map((t) => t.replace(/^(Tin học|Công nghệ) · /, "")), ...BUOC_TK, "Em có thể làm gì với máy tính", "Định dạng kí tự và bố trí hình ảnh trong văn bản",
  "Làm quen với phần mềm đồ hoạ", "Sử dụng phần mềm đồ hoạ tạo sản phẩm số", "Lắp ráp mô hình xe điện chạy bằng pin", "Công nghệ và đời sống",
  "Sở GD&ĐT ra đề chung cuối kì một số môn lớp 5", "mỗi ý sau đúng hay sai", "nhóm lệnh Font của dải lệnh Home"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}|^g\d+$/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
if (SACH.length) {
  ["lop-5/tin-hoc-5", "lop-5/cong-nghe-5", "lop-4/tin-hoc-4", "lop-4/cong-nghe-4"].forEach((c) => assert.ok(SACH.some((f) => f.includes(c)), "OnUp-Book có " + c));
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => chu(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)))
    .concat(LOI_DAN.flatMap((d) => chuoi(d.q, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${d.ten}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const khac = BANKS.filter((b) => b.file !== FILE).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q) => ({ id: b.id, s: " " + chu(q).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(chu(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n + " câu đã tính lại hoặc đọc lại hình (" + DE.map((id) => bank(id).questions.length).join(" + ") + " câu của " + DE.length + " đề cố định, không có câu riêng); kho " + kho.length + " câu, " + kho.filter((q) => q.svg).length + " hình, ma trận 10 – 8 – 7 trên " + CHU_DE.length + " chủ đề (" + CHU_DE.filter((t) => t.startsWith("Tin học")).length + " Tin học, " + CHU_DE.filter((t) => t.startsWith("Công nghệ")).length + " Công nghệ); đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("TINCN5 OK");
