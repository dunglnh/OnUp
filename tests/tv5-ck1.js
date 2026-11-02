// Kiểm tra ngân hàng Tiếng Việt 5 cuối kì I của Phiên N5-ck1-tv (data/banks/5-tv.js, tv5-ck1-*), theo mẫu tests/van9-ck1.js (phần không
// phải thơ) và các script lớp 4 cuối năm. Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên; số câu, số đề lấy từ danh mục.
// Đọc lại đáp án các câu Luyện từ và câu bằng bảng từ ghi trong script (CHECKS: mỗi câu khớp đúng một mục, nhận ra câu bằng một đoạn chữ của
// đề bài): từ loại (danh từ, động từ, tính từ; danh từ chỉ hiện tượng tự nhiên, chỉ thời gian; động từ chỉ trạng thái), đại từ (xưng hô,
// nghi vấn, thay thế; đại từ nghi vấn hợp điều muốn hỏi; “chúng ta” gồm cả người nói và người nghe), từ đồng nghĩa (nhóm từ đồng nghĩa,
// cặp từ đồng nghĩa, trái nghĩa trong thành ngữ, từ hợp văn cảnh), kết từ (từ, cặp kết từ, quan hệ giữa hai vế, cặp ghép sai), dấu gạch
// ngang (đọc công dụng từ vị trí của dấu: sau lời dẫn và dấu hai chấm là lời nói, nhiều ý ngăn bằng dấu chấm phẩy là liệt kê, hai dấu
// kẹp một bộ phận giữa câu là chú thích, một dấu nối hai tên là liên danh); từ được hỏi phải có trong câu, đoạn của đề bài và đáp án chỉ
// khớp một lựa chọn. Từ đa nghĩa, sử dụng từ điển (đọc mục từ: từ loại, số nghĩa, nghĩa chuyển), điệp từ, điệp ngữ (đếm từ ngữ lặp lại)
// cũng đọc lại. Đọc hiểu: chữ trích trong ngoặc kép ở đề bài, lời giải có đúng trong đoạn đọc.
// Rồi kiểm tra ma trận 10 – 8 – 7 (hai đề cố định đúng ma trận; ô Luyện từ và câu có rút có 4 câu: một ở mỗi đề cố định, hai câu riêng), đoạn
// đọc (đoạn 4 câu mức 1-1-2-3, đoạn 3 câu mức 1-2-3), câu Viết (chỉ tự luận, đủ bảy kiểu bài Viết của học kì I, 4–6 ý chấm, 5 điểm), dạng
// câu (đúng/sai 4 ý không lặp kiểu Đ/S; có điền, đúng/sai, trả lời bằng số, nối cột, sắp xếp), gọi người làm bài là “bạn”, đáp án đúng
// không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất (kể cả bằng nhau) ở không quá một phần ba số câu nhiều lựa chọn,
// không lặp chữ của nhãn chủ đề, đề bài không trùng câu nào trong file, rút thử (đúng ma trận, trọn đoạn; đã làm hết một đề cố định thì
// không rút lại câu của đề đó), dò lộ đáp án giữa mọi cặp câu của kho (đề “Ôn chủ đề” rút chung mọi câu của một chủ đề, đề ngẫu nhiên
// rút chung câu của các chủ đề khác; cả lời dặn của đề), đề bài không gần trùng câu của data/banks/4-tv.js (cặp hai âm tiết chung) và,
// nếu có ../OnUp-Book, so mọi trường chữ (cả đoạn đọc) với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng), so với câu của mọi kho
// khác, cả câu riêng của các đề ngẫu nhiên (không chuỗi 8 từ nào trùng).
// Chạy: node tests/tv5-ck1.js → in TV5 OK. DO_LO=1 in đáp án có ở câu khác (để xem tay, danh sách đã xem ở DA_XEM); DO_SACH=1 in chuỗi
// 6 từ trùng sách; DO_KHO=1 in chuỗi 6 từ trùng kho khác và câu gần trùng kho Tiếng Việt 4.
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
const S = { de1: "tv5-ck1-de1", de2: "tv5-ck1-de2", pool: "tv5-ck1-ngau-nhien" };
const DE = [S.de1, S.de2];
const sum = (a) => a.reduce((s, v) => s + v, 0);
const nfc = (s) => String(s).normalize("NFC");
const thuong = (s) => nfc(s).toLowerCase();

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, DE, "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 40, b.id + ": 40 phút (có câu Viết tự chấm, như các đề Tiếng Việt 4 có câu Viết)");
  assert.equal(b.grade, 5); assert.equal(b.subject, "Tiếng Việt"); assert.equal(b.file, "5-tv.js");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
assert.ok(rieng.length >= 45 && rieng.length <= 60, "đề ngẫu nhiên có khoảng 50 câu riêng: " + rieng.length);
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
{ // mã đoạn đọc không trùng giữa hai đề cố định và phần câu riêng (kho của đề ngẫu nhiên gộp đoạn đọc của cả ba)
  const riengP = [...new Set(kho.filter((q) => q.src === S.pool && q.p).map((q) => q.p))];
  assert.equal(new Set(Object.keys(d1.passages).concat(Object.keys(d2.passages), riengP)).size, Object.keys(d1.passages).length + Object.keys(d2.passages).length + riengP.length, "mã đoạn đọc không trùng giữa các đề");
  assert.ok(kho.every((q) => !q.p || PSG[q.p]), "câu có đoạn đọc trỏ tới đoạn có thật");
}
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("tv5-ck1-", "") + "#" + (i + 1))));
const cal = fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8");
{
  const m = /id: "ck1-l5"[\s\S]*?banks: \[([^\]]*)\]/.exec(cal);
  assert.ok(m, "có kì thi ck1-l5");
  [S.de1, S.de2, S.pool].forEach((id) => assert.ok(m[1].includes(`"${id}"`), "ck1-l5 gắn đề " + id));
}

/* ---------- chữ trong câu ---------- */
const trich = (s) => [...nfc(s).matchAll(/“([^”]*)”/g)].map((m) => m[1]); // các đoạn trong ngoặc kép
const coTu = (cau, tu) => new RegExp("(^|[^\\p{L}])" + thuong(tu).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "(?![\\p{L}])", "u").test(thuong(cau));
const tach = (o) => o.split(/,\s*/).map((w) => thuong(w).trim()).filter(Boolean); // “gieo, tưới, vun xới” → các từ
const mot = (q, ok, at) => { // đúng một lựa chọn thoả ok, và đó là lựa chọn đúng (đứng đầu mảng)
  const hit = q.o.filter(ok);
  assert.deepEqual(hit, [q.o[0]], `${at}: lựa chọn khớp ${JSON.stringify(hit)}, cần đúng một lựa chọn là đáp án ${JSON.stringify(q.o[0])}`);
};
const trongCau = (q, cau, ws, at) => ws.forEach((w) => assert.ok(coTu(cau, w), `${at}: từ “${w}” không có trong câu “${cau}”`));

/* ---------- bảng từ (theo Ghi nhớ của sách: danh từ, động từ, tính từ tr. 10; đại từ tr. 21; từ đồng nghĩa tr. 48; kết từ tr. 142) ---------- */
const LOAI = {
  dong: ["gieo", "tưới", "vun xới", "nhổ", "hút", "mua", "soi bóng", "báo hiệu", "rơi", "quên", "ngủ", "thức", "nghỉ ngơi", "chạy", "ném", "viết", "nhảy", "đá", "bơi", "tập văn nghệ", "dựng rạp", "chuẩn bị", "tưới cây"],
  danh: ["khu vườn", "luống rau", "bầy ong", "giỏ cam", "mẹ", "mặt hồ", "tán cây", "cánh đồng", "chân trời", "sấm", "giông", "bình minh", "buổi trưa", "mùa thu", "áo len", "ghế đá", "hội trường", "hôm nay", "hội làng", "chiếc cầu", "mét", "vườn trường", "lan", "sáng sớm", "sương", "lá cỏ"],
  tinh: ["xanh tốt", "cần mẫn", "vàng óng", "phẳng lặng", "oi ả", "trôi chảy", "xinh", "dài", "long lanh"]
};
const NHOM_LOAI = { danhTN: ["sấm", "giông", "sương"], danhTG: ["sáng sớm", "bình minh", "buổi trưa", "mùa thu"], dongTT: ["ngủ", "thức", "nghỉ ngơi"], tinhMau: ["vàng óng"], danhNguoi: ["mẹ"] };
const loaiCua = (w) => Object.keys(LOAI).filter((k) => LOAI[k].includes(thuong(w)));
Object.values(NHOM_LOAI).forEach((ws) => ws.forEach((w) => assert.equal(loaiCua(w).length, 1, "bảng từ: “" + w + "” phải có đúng một từ loại")));
[...LOAI.dong, ...LOAI.danh, ...LOAI.tinh].forEach((w) => assert.equal(loaiCua(w).length, 1, "bảng từ: “" + w + "” có ở hai từ loại"));
const TEN_LOAI = { dong: "động từ", danh: "danh từ", tinh: "tính từ" };
const DAI = {
  xh: ["tôi", "tớ", "mình", "chúng mình", "chúng ta", "chúng tôi", "chúng tớ", "họ", "nó", "chúng nó", "ta", "cậu"],
  nv: ["ai", "gì", "nào", "sao", "bao nhiêu", "đâu", "mấy", "bao giờ", "khi nào"],
  tt: ["thế", "vậy", "đó", "này", "ấy", "kia"]
};
const TEN_DAI = { xh: "Đại từ xưng hô", nv: "Đại từ nghi vấn", tt: "Đại từ thay thế" };
const laDai = (w) => Object.keys(DAI).find((k) => DAI[k].includes(thuong(w)));
const GOP = ["chúng ta", "chúng mình"]; // gồm cả người nói và người nghe
const NV_HOI = { "thời gian": ["bao giờ", "khi nào"], "nơi chốn": ["đâu"], "người": ["ai"], "số lượng": ["bao nhiêu", "mấy"] };
const XUNG_HO_DANH = ["ông", "bà", "bố", "mẹ", "anh", "chị", "em", "cháu", "thầy", "cô", "bạn", "con"]; // danh từ dùng để xưng hô
const DONG_NGHIA = [["dũng cảm", "can đảm", "gan dạ", "anh dũng"], ["quê hương", "quê nhà", "quê quán"], ["to lớn", "khổng lồ", "to tướng"],
  ["lấp lánh", "chói chang", "rực lửa", "sáng trưng"], ["ngắm", "liếc nhìn", "nhòm ngó", "dòm"], ["thơm ngát", "thơm phức", "thơm tho", "thơm giòn"],
  ["lộng lẫy", "xinh xắn", "xinh xinh", "dễ thương"], ["to", "lớn"]];
const TRAI_NGHIA = [["cứng", "mềm"], ["gần", "xa"], ["khôn", "dại"], ["bé nhỏ", "to lớn"], ["thấp bé", "cao lớn"]];
const nhomDN = (w) => DONG_NGHIA.find((g) => g.includes(thuong(w)));
// từ hợp văn cảnh nhất trong nhóm đồng nghĩa (lí do ở lời giải từng câu)
const HOP = { "Những ngôi sao …": "lấp lánh", "cả nhà ngồi ngoài sân … trăng": "ngắm", "Những bông hoa nhài …": "thơm ngát", "sân khấu được trang hoàng …": "lộng lẫy" };
const KET = ["và", "với", "hay", "hoặc", "nhưng", "mà", "thì", "của", "vì", "nên", "do", "nếu", "tuy", "mặc dù", "để", "bằng", "nhờ", "tại", "bởi", "còn", "trong"];
const CAP = { "tương phản": ["tuy… nhưng", "mặc dù… nhưng"], "nguyên nhân – kết quả": ["vì… nên", "do… nên", "nhờ… mà"], "giả thiết – kết quả": ["nếu… thì", "hễ… thì"],
  "tăng tiến": ["không những… mà", "không những… mà còn", "không chỉ… mà còn"] };
const quanHe = (cap) => Object.keys(CAP).find((k) => CAP[k].includes(thuong(cap)));
Object.values(CAP).flat().forEach((c) => assert.ok(c.split("… ").every((x) => KET.includes(x) || ["không những", "hễ", "không chỉ", "mà còn"].includes(x)), "cặp kết từ lạ: " + c));
// cặp kết từ có trong một câu: hai vế xuất hiện đúng thứ tự
const capTrong = (cau) => Object.values(CAP).flat().filter((c) => { const [a, b] = c.split("… "); const t = thuong(cau), i = t.search(new RegExp("(^|[^\\p{L}])" + a + "(?![\\p{L}])", "u")); return i >= 0 && coTu(t.slice(i + a.length + 1), b); });

/* ---------- dấu gạch ngang: công dụng đọc từ vị trí của dấu ---------- */
const DUNG = { "loi-noi": "Đánh dấu chỗ bắt đầu lời nói của nhân vật", "liet-ke": "Đánh dấu các ý được liệt kê", "lien-danh": "Nối các từ ngữ thành một liên danh", "chu-thich": "Đánh dấu phần chú thích, giải thích" };
const LOI_DAN = /(hỏi|nói|dặn|đáp|reo|bảo|thưa|kêu)( lên)?:\s*$/;
// mỗi dấu “–” của một câu, đoạn → công dụng
const gach = (s) => {
  const t = nfc(s), ra = [];
  const pos = [...t.matchAll(/–/g)].map((m) => m.index);
  for (let k = 0; k < pos.length; k++) {
    const i = pos[k], truoc = t.slice(0, i), sau = t.slice(i + 1);
    if (/:\s*$/.test(truoc) || /;\s*$/.test(truoc)) { // đầu một dòng, một ý sau dấu hai chấm hay dấu chấm phẩy
      const lietKe = /;\s*$/.test(truoc) || /^[^;.!?]*;\s*–/.test(sau);
      ra.push(lietKe ? "liet-ke" : LOI_DAN.test(truoc) ? "loi-noi" : "?");
      continue;
    }
    // dấu ở giữa câu: có dấu “–” thứ hai trong cùng câu, cách từ hai từ trở lên, phần sau còn tiếp câu → chú thích (tính cả hai dấu)
    const doan = sau.split(/[.!?]/)[0], j = doan.indexOf("–");
    if (j >= 0 && doan.slice(0, j).trim().split(/\s+/).length >= 2 && doan.slice(j + 1).trim().length) { ra.push("chu-thich", "chu-thich"); k++; continue; }
    // một dấu nối hai tên: từ ngay trước và ngay sau đều viết hoa, hoặc là cặp nam – nữ
    const a = /(\S+)\s*$/.exec(truoc), b = /^\s*(\S+)/.exec(sau);
    ra.push(a && b && (/^\p{Lu}/u.test(a[1]) && /^\p{Lu}/u.test(b[1]) || a[1] === "nam" && b[1] === "nữ") ? "lien-danh" : "?");
  }
  assert.ok(ra.length && !ra.includes("?"), "không đọc được công dụng của dấu gạch ngang: " + s);
  return ra;
};
const motCong = (s) => { const g = [...new Set(gach(s))]; assert.equal(g.length, 1, "câu có nhiều công dụng của dấu gạch ngang: " + s); return g[0]; };
// tự thử bộ đọc với các câu viết sai cố ý
assert.equal(motCong("Bố mẹ dặn: – Đi đường cẩn thận nhé!"), "loi-noi");
assert.equal(motCong("Lớp em có: – hai bạn hát; – ba bạn múa."), "liet-ke");
assert.equal(motCong("Đội Hoa Sen – Hoa Mai thi kéo co."), "lien-danh");
assert.equal(motCong("Cô Ba – người bán hàng vui tính – đã về quê."), "chu-thich");
assert.throws(() => gach("Hôm nay – trời mưa."), /không đọc được/);

/* ---------- điệp từ, điệp ngữ: có từ được lặp lại để nhấn mạnh ---------- */
const NHE = new Set(["và", "những", "của", "em", "cả", "rồi", "thì", "là", "một", "cho", "với", "trong", "đã", "rất", "các", "nhà", "hoa", "bay"]);
const am = (s) => thuong(s).replace(/[^\p{L}\s]/gu, " ").split(/\s+/).filter(Boolean);
const dem = (s, tu) => { const w = am(s), x = am(tu); let n = 0; for (let i = 0; i + x.length <= w.length; i++) if (x.every((v, k) => w[i + k] === v)) n++; return n; };
const coDiep = (s) => { const w = am(s), c = {}; w.forEach((x) => { if (!NHE.has(x)) c[x] = (c[x] || 0) + 1; }); const b = {}; w.slice(1).forEach((x, i) => { const k = w[i] + " " + x; b[k] = (b[k] || 0) + 1; });
  return Object.values(c).some((n) => n >= 3) || Object.entries(b).some(([k, n]) => n >= 2 && !k.split(" ").every((x) => NHE.has(x))); };
assert.ok(coDiep("Biển xanh. Biển rộng. Biển hiền.") && !coDiep("Em thích hoa hồng, hoa cúc và hoa lan."), "bộ đọc điệp từ tự thử");

/* ---------- từ điển: mục từ “từ (từ loại) 1. … 2. …” ---------- */
const mucTu = (q) => { const m = /“(\S+) \((danh từ|động từ|tính từ)\) (1\. [^”]*)”/.exec(q.q); assert.ok(m, "không đọc được mục từ: " + q.q.slice(0, 60));
  const nghia = m[3].split(/\s*\d\.\s*/).filter(Boolean).map((x) => { const c = x.split(". "); return { dinhNghia: c[0].replace(/\.$/, ""), viDu: c.slice(1).join(". ").replace(/\.$/, "") }; });
  return { tu: m[1], loai: m[2], nghia }; };

/* ---------- từng câu ---------- */
const CHECKS = [
  // Danh từ, động từ, tính từ
  { has: "Dòng nào dưới đây gồm toàn động từ?", right: (q, at) => mot(q, (o) => tach(o).every((w) => LOAI.dong.includes(w)), at) },
  { has: "dòng nào gồm các danh từ đều chỉ hiện tượng tự nhiên?", right: (q, at) => { const c = trich(q.q)[0]; q.o.forEach((o) => trongCau(q, c, tach(o), at)); mot(q, (o) => tach(o).every((w) => NHOM_LOAI.danhTN.includes(w)), at); } },
  { has: "là tính từ có trong câu", right: (q, at) => { const c = trich(q.q)[0]; trongCau(q, c, q.o, at); mot(q, (o) => LOAI.tinh.includes(thuong(o)), at); } },
  { has: "từ ngữ nào là danh từ chỉ thời gian?", right: (q, at) => { const c = trich(q.q)[0]; trongCau(q, c, q.o, at); mot(q, (o) => NHOM_LOAI.danhTG.includes(thuong(o)), at); } },
  { has: "từ “vàng” là tính từ?", right: (q, at) => { q.o.forEach((o) => assert.ok(coTu(o, "vàng"), at)); mot(q, (o) => coTu(o, "nở vàng"), at); } }, // “nở vàng”: màu của hoa; các câu kia “vàng” là kim loại (sau “bằng”, “nung chảy”)
  { has: "Nối mỗi từ ở cột trái với từ loại của nó.", right: (q, at) => { const c = trich(q.q)[0]; trongCau(q, c, q.l, at); q.l.forEach((w, i) => assert.equal(thuong(q.r[i]), TEN_LOAI[loaiCua(w)[0]], `${at}: “${w}”`)); } },
  { has: "mẹ mua về một giỏ cam vàng óng", right: (q, at) => {
    const c = trich(q.q)[0];
    return q.o.map((o) => { const m = /^“([^”]+)” là (danh từ|động từ|tính từ)( chỉ màu sắc| chỉ người)?\.$/.exec(o); assert.ok(m, at + ": ý lạ " + o); trongCau(q, c, [m[1]], at);
      const k = Object.keys(TEN_LOAI).find((x) => TEN_LOAI[x] === m[2]), w = thuong(m[1]);
      return loaiCua(w)[0] === k && (!m[3] || (m[3] === " chỉ màu sắc" ? NHOM_LOAI.tinhMau : NHOM_LOAI.danhNguoi).includes(w)); });
  } },
  { has: "từ “trôi chảy” chỉ đặc điểm của gì?", right: (q, at) => { const c = trich(q.q)[0]; assert.ok(LOAI.tinh.includes("trôi chảy") && /đọc bài rất trôi chảy/.test(c), at); mot(q, (o) => /đọc bài/.test(o), at); } },
  // Đại từ
  { has: "từ nào là đại từ?", right: (q, at) => { const c = trich(q.q)[0]; trongCau(q, c, q.o, at); mot(q, (o) => !!laDai(o), at); } },
  { has: "Đại từ nghi vấn trong câu", right: (q, at) => { const c = trich(q.q)[0]; trongCau(q, c, q.o, at); mot(q, (o) => laDai(o) === "nv", at); } },
  { has: "Đại từ “đó” thay thế cho điều gì?", right: (q, at) => { const c = trich(q.q)[0], [c1, c2] = c.split(/(?<=\.)\s+/); assert.ok(coTu(c2, "đó") && !coTu(c1, "đó"), at + ": “đó” ở câu sau");
    mot(q, (o) => thuong(c1).includes(thuong(o)), at); } },
  { has: "Từ “nó” trong câu trả lời chỉ gì?", right: (q, at) => { const [hoi, dap] = trich(q.q)[0].split(/\s*–\s*/).filter(Boolean); assert.ok(coTu(dap, "nó") && !coTu(hoi, "nó"), at);
    mot(q, (o) => thuong(hoi).includes(thuong(o)), at); } },
  { has: "Lan muốn rủ cả nhóm, gồm cả Lan", right: (q, at) => mot(q, (o) => GOP.includes(thuong(o)), at) },
  { has: "Bạn muốn hỏi Hoà về thời gian", right: (q, at) => { mot(q, (o) => NV_HOI["thời gian"].some((w) => coTu(o, w)), at); q.o.forEach((o) => assert.ok(DAI.nv.some((w) => coTu(o, w)), at + ": lựa chọn nào cũng là câu hỏi có đại từ nghi vấn")); } },
  { has: "Nối mỗi đại từ ở cột trái với loại đại từ", right: (q, at) => q.l.forEach((l, i) => { const m = /^“([^”]+)” trong (?:câu|đoạn): (.+)$/.exec(l); assert.ok(m && coTu(m[2], m[1]), at + ": " + l);
    assert.equal(q.r[i], TEN_DAI[laDai(m[1])], `${at}: “${m[1]}”`); }) },
  { has: "từ “cháu” chỉ ai?", right: (q, at) => { assert.ok(XUNG_HO_DANH.includes("cháu") && /bạn Thu nói với bà/.test(q.q) && coTu(trich(q.q)[0], "cháu"), at); mot(q, (o) => /Thu/.test(o) && /người đang nói/.test(o), at); } },
  { has: "Cách sửa nào dùng đại từ hợp lí nhất?", right: (q, at) => { const goc = "chú mèo mướp";
    mot(q, (o) => thuong(o).startsWith(goc) && dem(o, goc) === 1 && am(o).some((w) => DAI.xh.includes(w) || DAI.tt.includes(w)) && !am(o).some((w) => DAI.nv.includes(w)), at); } },
  { has: "xin phép thầy giáo cho vào lớp", right: (q, at) => mot(q, (o) => coTu(o, "em") && coTu(o, "thưa") && coTu(o, "ạ") && !DAI.xh.some((w) => coTu(o, w)), at) }, // nói với người lớn: xưng “em”, có “thưa”, “ạ”
  // Từ đồng nghĩa
  { has: "Từ nào đồng nghĩa với từ", right: (q, at) => { const w = /từ “([^”]+)”/.exec(q.q)[1], g = nhomDN(w); assert.ok(g, at + ": chưa có nhóm của “" + w + "”"); mot(q, (o) => g.includes(thuong(o)), at); } },
  { has: "Dòng nào gồm các từ đồng nghĩa?", right: (q, at) => mot(q, (o) => { const ws = tach(o), g = nhomDN(ws[0]); return !!g && ws.every((w) => g.includes(w)); }, at) },
  { has: "Thành ngữ nào dưới đây có cặp từ đồng nghĩa?", right: (q, at) => {
    const cap = (o, ds) => ds.some((g) => g.some((a) => g.some((b) => a !== b && coTu(o, a) && coTu(o, b))));
    q.o.forEach((o) => assert.ok(cap(o, DONG_NGHIA) !== cap(o, TRAI_NGHIA), at + ": thành ngữ phải có đúng một loại cặp từ: " + o));
    mot(q, (o) => cap(o, DONG_NGHIA), at); } },
  { has: "Chọn từ thích hợp nhất điền vào chỗ trống", right: (q, at) => { const k = Object.keys(HOP).find((h) => q.q.includes(h)); assert.ok(k, at + ": chưa ghi từ hợp văn cảnh");
    const g = nhomDN(q.o[0]); assert.ok(g && q.o.every((o) => g.includes(thuong(o))), at + ": các lựa chọn cùng một nhóm từ đồng nghĩa"); mot(q, (o) => thuong(o) === HOP[k], at); } },
  // Từ đa nghĩa: từ được hỏi có trong mọi lựa chọn; câu dùng nghĩa gốc nhận ra bằng cụm từ ghi ở GOC
  { has: "được dùng với nghĩa gốc?", right: (q, at) => { const w = /từ “([^”]+)”/.exec(q.q)[1], GOC = { mũi: "chiếc mũi", lá: "lá bàng", ngọn: "ngọn cây" };
    q.o.forEach((o) => assert.ok(coTu(o, w), at + ": lựa chọn không có từ “" + w + "”")); mot(q, (o) => coTu(o, GOC[w]), at); } },
  { has: "dùng từ “miệng” với nghĩa chuyển?", right: (q, at) => { q.o.forEach((o) => assert.ok(coTu(o, "miệng"), at)); mot(q, (o) => coTu(o, "miệng giếng"), at); } },
  { has: "với nghĩa của từ “chạy” trong câu đó", right: (q, at) => { q.l.forEach((l) => assert.ok(coTu(l, "chạy"), at)); assert.deepEqual(q.r.map((r) => /bằng chân/.test(r) ? "gốc" : "chuyển"), ["gốc", "chuyển", "chuyển"], at); assert.ok(/Bạn Hoà chạy/.test(q.l[0]) && /đồng hồ/.test(q.l[1]) && /con đường/i.test(q.l[2]), at); } },
  { has: "Từ “cổ” trong câu", right: (q, at) => { assert.ok(coTu(trich(q.q)[1], "cổ áo"), at); mot(q, (o) => /áo/.test(o), at); } },
  { has: "Các nghĩa của từ “mặt”", right: (q, at) => { ["mặt người", "mặt bàn", "mặt hồ"].forEach((x) => assert.ok(q.q.includes(x), at)); mot(q, (o) => /phía trước/.test(o) && /phía trên/.test(o), at); } },
  { has: "Những chiếc răng lược đều tăm tắp", right: (q, at) => mot(q, (o) => /^Nghĩa chuyển/.test(o) && /đồ vật/.test(o), at) },
  // Sử dụng từ điển
  { has: "“đồng cam cộng khổ”", right: (q, at) => { const THANH_NGU = ["đồng cam cộng khổ"]; assert.ok(THANH_NGU.includes(trich(q.q)[0]), at); mot(q, (o) => o === "Từ điển thành ngữ", at); } },
  { has: "muốn biết nghĩa của từ “bền bỉ”", right: (q, at) => { const w = "bền bỉ";
    assert.ok(/từ điển tiếng Việt/.test(q.o[0]) && q.o[1].endsWith("chữ " + w[0].toUpperCase()) && q.o[2].includes("“" + w + "”") && /^Đọc nghĩa/.test(q.o[3]), at + ": thứ tự tra từ điển"); } },
  { has: "Nghĩa đánh số 1 thường là", right: (q, at) => mot(q, (o) => /^Nghĩa gốc/.test(o), at) },
  { has: "“nóng (tính từ)", right: (q, at) => { const e = mucTu(q); assert.ok(/chẳng bao giờ nóng với ai/.test(q.q), at); mot(q, (o) => o === e.nghia[1].dinhNghia, at); } },
  { has: "muốn biết từ “happy”", right: (q, at) => { assert.ok(/tiếng Anh/.test(q.q), at); mot(q, (o) => o === "Từ điển Anh – Việt", at); } },
  { has: "không cho bạn biết điều nào", right: (q, at) => mot(q, (o) => /mấy lần/.test(o), at) },
  { has: "“xanh (tính từ)", right: (q) => mucTu(q).nghia.length - 1 },
  { has: "“ngọt (tính từ)", right: (q) => { const e = mucTu(q); return [e.loai === "tính từ" && e.tu === "ngọt", e.nghia.length === 3, false, e.nghia.every((x) => x.viDu)]; } },
  // Dấu gạch ngang
  { has: "Dấu gạch ngang trong câu sau dùng để làm gì?", right: (q) => DUNG[motCong(trich(q.q)[0])] },
  { has: "Dấu gạch ngang trong đoạn sau dùng để làm gì?", right: (q) => DUNG[motCong(trich(q.q)[0])] },
  { has: "phần nằm giữa hai dấu gạch ngang là phần chú thích", right: (q, at) => mot(q, (o) => motCong(o) === "chu-thich", at) },
  { has: "đi tàu Hà Nội – Hải Phòng", right: (q) => { const c = trich(q.q)[0], cau = c.split(/(?<=[.!])\s+(?=\p{Lu})/u), g = (x) => gach(cau.find((s) => s.includes(x)));
    return [g("Hà Nội – Hải Phòng")[0] === "lien-danh", g("em trai của bố").every((x) => x === "chu-thich"), g("Lần sau nhớ")[0] === "liet-ke", new Set(gach(c)).size === 1]; } },
  { has: "vẫn đủ ý khi bỏ phần nằm giữa hai dấu gạch ngang", right: (q, at) => { assert.equal(motCong(trich(q.q)[0]), "chu-thich", at); mot(q, (o) => /giải thích/.test(o), at); } },
  { has: "Các dấu gạch ngang trong đoạn giúp người đọc điều gì?", right: (q, at) => { assert.equal(motCong(trich(q.q)[0]), "liet-ke", at); mot(q, (o) => /từng việc/.test(o), at); } },
  // Biện pháp điệp từ, điệp ngữ
  { has: "Việc lặp lại từ “nhớ” có tác dụng gì?", right: (q, at) => { assert.ok(dem(trich(q.q)[0], "nhớ") >= 3, at); mot(q, (o) => /^Nhấn mạnh/.test(o), at); } },
  { has: "Từ “yêu” được lặp lại ba lần", right: (q, at) => { assert.equal(dem(trich(q.q)[1], "yêu"), 3, at); mot(q, (o) => /tình cảm/i.test(o), at); } },
  { has: "Cụm từ “vẫn đó” được lặp lại", right: (q, at) => { assert.equal(dem(trich(q.q)[0], "vẫn đó"), 3, at); mot(q, (o) => /đã lớn/.test(o), at); } },
  { has: "giữ được điệp từ “thích”", right: (q, at) => { assert.equal(dem(trich(q.q)[0], "thích"), 3, at); mot(q, (o) => dem(o, "thích") >= 2, at); } },
  { has: "Đoạn văn nào dưới đây có dùng biện pháp điệp từ", right: (q, at) => mot(q, coDiep, at) },
  { has: "nhấn mạnh tình cảm với biển quê", right: (q, at) => mot(q, coDiep, at) },
  { has: "câu kết cho đoạn văn về mẹ", right: (q, at) => mot(q, coDiep, at) },
  { has: "nhấn mạnh sự chăm chỉ của đàn ong", right: (q, at) => mot(q, coDiep, at) },
  // Kết từ
  { has: "từ nào là kết từ?", right: (q, at) => { const c = trich(q.q)[0]; trongCau(q, c, q.o, at); mot(q, (o) => KET.includes(thuong(o)), at); } },
  { has: "Kết từ trong câu", right: (q, at) => { const c = trich(q.q)[0], k = am(c).filter((w) => KET.includes(w)); assert.deepEqual(k, q.ans.map(thuong), at + ": câu chỉ có một kết từ, là đáp án"); } },
  { has: "Dòng nào gồm toàn kết từ?", right: (q, at) => mot(q, (o) => tach(o).every((w) => KET.includes(w)), at) },
  { has: "Cặp kết từ trong câu", right: (q, at) => { const c = capTrong(trich(q.q)[0]); assert.equal(c.length, 1, at + ": câu có đúng một cặp kết từ"); mot(q, (o) => thuong(o) === c[0], at); } },
  { has: "Chọn cặp kết từ thích hợp", right: (q, at) => {
    const QH = { "đường trơn và dốc": "tương phản", "chăm chỉ luyện viết": "giả thiết – kết quả", "vẽ đẹp … còn": "tăng tiến" }, k = Object.keys(QH).find((h) => q.q.includes(h));
    assert.ok(k, at + ": chưa ghi quan hệ giữa hai vế"); q.o.forEach((o) => assert.ok(quanHe(o), at + ": cặp kết từ lạ " + o)); mot(q, (o) => quanHe(o) === QH[k], at); } },
  { has: "dùng cặp kết từ chưa đúng?", right: (q, at) => mot(q, (o) => capTrong(o).length === 0, at) }
];
let soCau = 0;
const daKiem = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.type !== "essay" && q.q.includes(c.has));
  assert.ok(m.length >= 1, `“${c.has}”: không có câu nào trong kho`);
  m.forEach((q) => {
    const at = ten.get(q) + " (" + c.has + ")", want = c.right(q, at);
    assert.ok(!daKiem.has(q), at + ": câu khớp hai mục của CHECKS");
    daKiem.add(q); soCau++;
    if (want === undefined) return;
    const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.type === "num" ? q.ans : q.o[0];
    assert.deepEqual(got, want, `${at}: đáp án ${JSON.stringify(got)}, tính được ${JSON.stringify(want)}`);
  });
});
// mọi câu Luyện từ và câu đều được đọc lại
kho.filter((q) => !["Đọc hiểu", "Viết"].includes(q.topic)).forEach((q) => assert.ok(daKiem.has(q), "câu Luyện từ và câu chưa có cách đọc lại đáp án: " + ten.get(q) + " " + q.q.slice(0, 60)));

/* ---------- Đọc hiểu: chữ trích có trong đoạn đọc ---------- */
const gon = (s) => nfc(s).replace(/\s*\/\s*/g, " ").replace(/\s+/g, " ").trim();
kho.filter((q) => q.topic === "Đọc hiểu").forEach((q) => {
  const at = ten.get(q), text = gon(PSG[q.p].text);
  trich(q.q).concat(trich(q.x)).forEach((c) => assert.ok(text.includes(gon(c).replace(/[.]$/, "")), `${at}: chữ trích “${c}” không có trong đoạn đọc ${q.p}`));
});
{ const fill = kho.find((q) => q.q.includes("Hưng ghi lên tấm bìa nhỏ ___ ý chính.")); assert.ok(fill && PSG[fill.p].text.includes("tấm bìa nhỏ " + fill.ans[0] + " ý chính"), "câu điền số ý chính khớp đoạn đọc"); }
{ const tf = kho.find((q) => q.type === "tf"); assert.ok(tf && tf.a === false && PSG[tf.p].text.includes("tuyệt đối không được lội qua suối khi nước lên"), "câu đúng/sai khớp đoạn đọc"); }

/* ---------- ma trận, đoạn đọc, câu Viết ---------- */
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
const demO = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
assert.deepEqual(TOPICS, ["Đọc hiểu", "Danh từ, động từ, tính từ", "Đại từ", "Từ đồng nghĩa", "Từ đa nghĩa", "Sử dụng từ điển", "Dấu gạch ngang", "Biện pháp điệp từ, điệp ngữ", "Kết từ", "Viết"],
  "chủ đề theo thứ tự các bài Luyện từ và câu của sách, Viết đứng cuối");
assert.deepEqual(TOPICS.map((t) => sum(M[t])), [7, 2, 3, 2, 2, 2, 2, 2, 2, 1], "7 câu Đọc hiểu, 17 câu Luyện từ và câu theo số bài (đại từ 3 bài), 1 câu Viết");
TOPICS.forEach((t) => assert.ok(("chu-de:5:tv:" + t).length <= 80, "chữ chủ đề dài quá cho mã đề Ôn chủ đề: " + t));
assert.deepEqual([...new Set(kho.map((q) => q.topic))].sort(), TOPICS.slice().sort(), "chủ đề của kho đúng chữ của ma trận");
[d1.questions, d2.questions].forEach((d, i) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, `Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => demO(d, t, l)), v, `Đề ${i + 1} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const have = kho.filter((q) => q.topic === t && q.lv === l);
  assert.ok(v[l - 1] ? have.length >= 2 * v[l - 1] : have.length === 0, `ô (${t}, mức ${l}) rút ${v[l - 1]} câu, kho có ${have.length}`);
  if (t !== "Đọc hiểu" && t !== "Viết" && v[l - 1]) assert.deepEqual(DE.concat(S.pool).map((s) => have.filter((q) => q.src === s).length), [1, 1, 2], `ô (${t}, mức ${l}): một câu ở mỗi đề cố định, hai câu riêng`);
}));
// đoạn đọc: chỉ ở Đọc hiểu, mọi câu Đọc hiểu có đoạn; mỗi đề cố định một đoạn 4 câu 1-1-2-3 và một đoạn 3 câu 1-2-3, câu riêng hai đoạn mỗi loại
assert.ok(kho.filter((q) => q.topic === "Đọc hiểu").every((q) => q.p) && kho.filter((q) => q.p).every((q) => q.topic === "Đọc hiểu"), "đoạn đọc chỉ dùng cho câu Đọc hiểu");
const mucDoan = (id) => kho.filter((q) => q.p === id).map((q) => q.lv).join("-");
Object.keys(PSG).forEach((id) => assert.ok(["1-1-2-3", "1-2-3"].includes(mucDoan(id)), `đoạn ${id}: mức ${mucDoan(id)}, cần 1-1-2-3 hoặc 1-2-3`));
[[S.de1, 1], [S.de2, 1], [S.pool, 2]].forEach(([id, k]) => {
  const ps = [...new Set(kho.filter((q) => q.src === id && q.p).map((q) => q.p))];
  assert.deepEqual(["1-1-2-3", "1-2-3"].map((x) => ps.filter((d) => mucDoan(d) === x).length), [k, k], id + ": số đoạn 4 câu, 3 câu");
});
[d1.questions, d2.questions, rieng].forEach((qs) => { const ps = qs.map((q) => q.p || ""); ps.forEach((x, i) => assert.ok(!x || ps.indexOf(x) === i || ps[i - 1] === x, "câu cùng đoạn đọc đứng liền nhau: " + x)); });
// câu Viết: chỉ tự luận, 4–6 ý chấm, 5 điểm, gợi ý có ví dụ; đủ bảy kiểu bài Viết của học kì I, mỗi kiểu một câu
const viet = kho.filter((q) => q.topic === "Viết");
assert.ok(viet.every((q) => q.type === "essay") && kho.filter((q) => q.type === "essay").every((q) => q.topic === "Viết"), "chủ đề Viết chỉ gồm câu tự luận, tự luận chỉ ở Viết");
viet.forEach((q) => {
  assert.ok(q.rubric.length >= 4 && q.rubric.length <= 6, "câu Viết có 4–6 ý chấm: " + ten.get(q));
  assert.equal(sum(q.rubric.map((r) => r.p)), 5, "câu Viết 5 điểm như các kho Tiếng Việt 4: " + ten.get(q));
  assert.ok(q.rubric.every((r) => r.p > 0 && r.p * 4 === Math.round(r.p * 4)), "điểm mỗi ý chia hết cho 0,25: " + ten.get(q));
  assert.ok(/^Gợi ý:/.test(q.x) && /\nVí dụ/.test(q.x) && q.x.length > 400, "câu Viết có gợi ý và bài mẫu: " + ten.get(q));
});
const KIEU_VIET = [/kể lại câu chuyện đó một cách sáng tạo/, /viết bản báo cáo/, /tả một cảnh đẹp/, /giới thiệu một nhân vật .* trong một cuốn sách/,
  /cảm xúc của bạn về câu chuyện đó/, /cảm xúc của bạn về bài thơ đó/, /giới thiệu một nhân vật .* trong một bộ phim hoạt hình/];
KIEU_VIET.forEach((re) => assert.equal(viet.filter((q) => re.test(q.q)).length, 1, "kiểu bài Viết: " + re));
assert.equal(viet.length, KIEU_VIET.length, "mỗi câu Viết một kiểu bài");

/* ---------- dạng câu, cách viết ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 2, "mỗi kho ít nhất 2 câu đúng/sai 4 ý");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
["fill", "tf", "num", "match", "order"].forEach((t) => assert.ok(kho.some((q) => q.type === t), "kho có dạng câu " + t));
assert.ok(kho.every((q) => ["mc", "tf", "tf4", "fill", "num", "match", "order", "essay"].includes(q.type)), "chỉ dùng dạng câu hợp với tiểu học");
const ngoaiNgoac = (s) => nfc(s).replace(/“[^”]*”/g, " ").replace(/‘[^’]*’/g, " ");
kho.forEach((q) => assert.ok(!/(của em|(?<![Cc]ác )em hãy|Em hãy|theo em|Theo em|em chọn)\b/.test(ngoaiNgoac([q.q].concat(q.type === "essay" ? [q.x.split("\nVí dụ")[0]] : [q.x]).join(" "))), "gọi người làm bài là “bạn”: " + ten.get(q)));
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b|câu (đầu|cuối) của đề/.test(q.x), "lời giải nhắc vị trí của ý, câu: " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (Rút ra N2); các lựa chọn không trùng nhau
const mcs = kho.filter((q) => q.type === "mc");
mcs.forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length));
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o.map(thuong)).size, q.o.length, "lựa chọn trùng nhau: " + ten.get(q));
});
// đáp án đúng là lựa chọn dài nhất hay ngắn nhất (kể cả bằng nhau) ở không quá một phần ba số câu nhiều lựa chọn (như tests/van9-ck1.js)
const daiNhat = mcs.filter((q) => q.o[0].length >= Math.max(...q.o.slice(1).map((o) => o.length))).length;
const nganNhat = mcs.filter((q) => q.o[0].length <= Math.min(...q.o.slice(1).map((o) => o.length))).length;
assert.ok(3 * daiNhat <= mcs.length, `đáp án là lựa chọn dài nhất ở ${daiNhat}/${mcs.length} câu nhiều lựa chọn`);
assert.ok(3 * nganNhat <= mcs.length, `đáp án là lựa chọn ngắn nhất ở ${nganNhat}/${mcs.length} câu nhiều lựa chọn`);
// đáp án không lặp chữ của nhãn chủ đề trên câu (Rút ra N6, N16b), trừ khi mọi lựa chọn cùng có chữ đó
{ const phanNhan = (t) => t.split(/ và |, /).map((s) => thuong(s).trim()).filter((s) => s.includes(" ") || s.length >= 6);
  kho.forEach((q) => { const da = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : []; phanNhan(q.topic).forEach((c) => da.forEach((d) => {
    if (thuong(d).includes(c)) assert.ok(q.type === "mc" && q.o.every((o) => thuong(o).includes(c)), `${ten.get(q)}: đáp án “${d}” lặp chữ “${c}” của nhãn chủ đề`); })); }); }
// đề bài không trùng câu nào khác trong file (Rút ra N8), so sau khi bỏ dấu câu, khoảng trắng
const goc = (s) => thuong(s).replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "5-tv.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: goc(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- rút thử ---------- */
const docHieu = kho.filter((q) => q.topic === "Đọc hiểu"), soCauDoan = (id) => kho.filter((q) => q.p === id).length;
const thu = (hist) => {
  const d = Quiz.draw(p, hist);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, p.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => demO(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  const got = {}; d.questions.filter((q) => q.p).forEach((q) => (got[q.p] = (got[q.p] || 0) + 1));
  assert.ok(Object.keys(got).length <= Math.ceil(sum(M["Đọc hiểu"]) / 3), "Đọc hiểu lấy quá ⌈7/3⌉ đoạn");
  assert.ok(Object.keys(got).filter((x) => got[x] < soCauDoan(x)).length <= 1, "nhiều nhất một đoạn lấy một phần");
  return d;
};
const seen = new Set();
for (let k = 0; k < 400; k++) thu().questions.forEach((q) => seen.add(Quiz.key(q)));
assert.equal(seen.size, kho.length, "400 lần rút thử phải gặp đủ câu của kho");
// học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên không rút lại câu của đề đó (Rút ra N12)
DE.forEach((lam) => { for (let k = 0; k < 30; k++) assert.ok(thu((q) => (q.src === lam ? { done: 1, wrong: 0 } : null)).questions.every((q) => q.src !== lam), `đã làm hết ${lam} thì không rút lại câu của đề đó`); });
assert.ok(docHieu.length === 28, "28 câu Đọc hiểu: " + docHieu.length);

/* ---------- dò lộ đáp án giữa mọi cặp câu của kho ----------
   Đề “Ôn chủ đề” rút chung mọi câu của một chủ đề, đề ngẫu nhiên rút chung câu của các chủ đề khác, câu cùng đoạn đọc luôn đi cùng nhau;
   lời dặn (note) hiện ở màn mở đề nên cũng là “câu kia”. Đáp án (lựa chọn đúng, đáp án điền) tách thành chuỗi 3 từ liền nhau (đáp án từ 3
   từ trở xuống thì lấy cả đáp án); cặp nối thì câu kia có cả hai vế. Chuỗi có ở đề bài, lựa chọn đúng, đáp án, ô nối, lời giải, thang chấm
   hay đoạn đọc (khác đoạn của câu này) của câu kia thì in ra với DO_LO=1 để xem tay; danh sách đã xem ở DA_XEM. Lựa chọn sai của câu kia
   không tính (Rút ra N25). Câu hỏi công dụng của dấu gạch ngang có chung bốn lựa chọn (DUNG), nên với các câu đó dò câu, đoạn được hỏi
   (chữ trong ngoặc kép của đề bài) thay cho đáp án: câu kia nói tới chính câu, đoạn ấy thì mới lộ. */
const tu = (s) => thuong(s).replace(/[«»“”‘’"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tu(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((r) => r.c)).map(String);
const chuDung = (q) => [q.q, q.x].concat(q.type === "mc" ? [q.o[0]] : q.o || [], q.ans == null || typeof q.ans === "number" ? [] : [].concat(q.ans), q.l || [], q.r || [], (q.rubric || []).map((r) => r.c)).map(String); // bỏ lựa chọn sai
const LOI_DAN_DE = [...new Set([S.de1, S.de2, S.pool].map((id) => bank(id).note))].map((note, i) => ({ q: note, x: "", note: true, ten: "note" + (i + 1) }));
const tenCau = (q) => (q.note ? q.ten : ten.get(q) || q.topic);
const doLo = (qs, notes) => {
  const ra = [];
  qs.forEach((q) => {
    const dap = q.type === "mc" ? [q.o[0]] : q.type === "fill" ? [q.ans[0]] : [];
    const C = q.type === "mc" && Object.values(DUNG).includes(q.o[0]) ? [tu(trich(q.q)[0]).join(" ")] : [...new Set(dap.flatMap(cum))], cap = q.type === "match" ? q.l.map((l, k) => [l, q.r[k]]) : [];
    // đáp án một, hai từ (“ai”, “và”, “phẳng lặng”) là chữ thường gặp: chỉ tính khi câu kia nhắc chính từ đó trong ngoặc kép, hoặc câu cùng chủ đề
    // có từ đó ở lựa chọn đúng, đáp án, ô nối, lời giải (bỏ câu ví dụ trong ngoặc kép)
    const ngan = C.length === 1 && !(q.type === "mc" && Object.values(DUNG).includes(q.o[0])) && tu(dap[0]).length <= 2 ? C[0] : null;
    qs.concat(notes || []).forEach((p2) => {
      if (p2 === q) return;
      const nguon = p2.note ? [p2.q] : chuDung(p2).concat(p2.p && p2.p !== q.p ? [PSG[p2.p].text] : []);
      if (ngan) {
        const ngoac = nguon.some((x) => [...nfc(x).matchAll(/“([^”]*)”/g)].some((m) => tu(m[1]).join(" ") === ngan));
        const cungCD = !p2.note && p2.topic === q.topic && [p2.x].concat(p2.type === "mc" ? [p2.o[0]] : p2.o || [], p2.ans == null || typeof p2.ans === "number" ? [] : [].concat(p2.ans), p2.l || [], p2.r || [])
          .some((x) => (" " + tu(nfc(x).replace(/“[^”]*\s[^”]*”/g, " ")).join(" ") + " ").includes(" " + ngan + " "));
        if (ngoac || cungCD) ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${ngan}`);
        return;
      }
      const T = " " + nguon.map((s) => tu(s).join(" ")).join(" | ") + " ";
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${c}`));
      cap.filter(([l, r]) => T.includes(" " + tu(l).join(" ") + " ") && T.includes(" " + tu(r).join(" ") + " ")).forEach(([l, r]) => ra.push(`${tenCau(p2)} → ${tenCau(q)}: ${l} → ${r}`));
    });
  });
  return [...new Set(ra)];
};
const lo = doLo(kho, LOI_DAN_DE);
if (process.env.DO_LO) console.log("Đáp án có ở câu khác của kho (xem tay):\n" + lo.join("\n"));
// đã xem (Phiên N5-ck1-tv): cụm chữ chung, không làm lộ đáp án. “một cuốn sách”, “giới thiệu một”: bài đọc «Tủ sách của lớp 5B» và hai đề Viết
// (giới thiệu nhân vật trong một cuốn sách, trong một bộ phim) không nói gì về việc cô giáo giao cho Hưng; “nặn tò he”: tên nghề trong đề bài
// câu cùng đoạn đọc (đoạn đọc vốn có chữ đó); “nghĩa gốc của”: lời giải câu từ đa nghĩa nói nghĩa gốc của một từ là gì, không nói nghĩa nào
// được đánh số 1 trong từ điển.
const DA_XEM = [
  "ngau-nhien#8 → de2#1: một cuốn sách", "ngau-nhien#9 → de2#1: một cuốn sách", "ngau-nhien#10 → de2#1: một cuốn sách", "ngau-nhien#11 → de2#1: một cuốn sách",
  "ngau-nhien#52 → de2#1: giới thiệu một", "ngau-nhien#52 → de2#1: một cuốn sách", "de1#25 → de2#1: giới thiệu một", "de2#5 → de2#6: nặn tò he",
  "ngau-nhien#29 → de2#17: nghĩa gốc của", "ngau-nhien#30 → de2#17: nghĩa gốc của", "de1#15 → de2#17: nghĩa gốc của", "de2#15 → de2#17: nghĩa gốc của"
];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu khác của kho đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai: lời giải câu khác chép đáp án
{
  const a = kho.find((q) => q.q.includes("Dòng nào dưới đây gồm toàn động từ?")), b = kho.find((q) => q.q.includes("Dòng nào gồm toàn kết từ?"));
  const gia = Object.assign({}, b, { x: b.x + " Ví dụ: gieo, tưới, vun xới." });
  assert.ok(doLo([a, gia]).some((s) => /: gieo tưới vun$/.test(s)), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
  const c = kho.find((q) => q.q.includes("Em và Lan tưới cây")), d = kho.find((q) => q.q.includes("Bạn Huy … vẽ đẹp"));
  assert.deepEqual(doLo([c, d]), [], "chữ “và” dùng bình thường ở câu khác không phải lộ");
  assert.ok(doLo([c, Object.assign({}, d, { x: d.x + " “Và” cũng là kết từ." })]).some((s) => /: và$/.test(s)), "bộ dò phải bắt được từ đáp án được nhắc trong ngoặc kép");
}

/* ---------- không gần trùng câu của kho Tiếng Việt 4 (lời giao việc; như tests/toan5-ck1.js) ----------
   Đề bài cùng lựa chọn, ô nối, ô sắp xếp có từ 4 cặp hai âm tiết liền nhau chung với một câu của data/banks/4-tv.js và số cặp chung từ
   một nửa số cặp của câu ít cặp hơn thì báo. Bỏ cách hỏi chung (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của hai file. */
{
  const CUM = ["mỗi ý sau đúng hay sai", "chọn từ thích hợp nhất điền vào chỗ trống", "chọn từ thích hợp điền vào chỗ trống", "dấu gạch ngang trong câu sau dùng để làm gì",
    "dấu gạch ngang trong đoạn sau dùng để làm gì", ...Object.values(DUNG), "đánh dấu các ý được liệt kê", "dòng nào dưới đây gồm toàn", "dòng nào gồm toàn", "dòng nào gồm các",
    "đọc đoạn văn", "đọc câu", "trong câu", "từ nào là", "là danh từ", "là động từ", "là tính từ", "cặp kết từ", "đại từ", "từ đồng nghĩa", "nghĩa gốc", "nghĩa chuyển"];
  const cap2 = (s) => { let t = thuong(s); CUM.map(thuong).forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const cauCua = (file) => BANKS.filter((b) => b.file === file).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id));
  const lop4 = cauCua("4-tv.js"), ca = lop4.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || [], q.l || [], q.r || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const P4 = lop4.map((x) => [x, capAm(x)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return P4.map(([x, d]) => { const chung = [...c].filter((y) => d.has(y)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${x.q.slice(0, 60)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Tiếng Việt 4:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Tiếng Việt 4");
}

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (bỏ dấu, gộp nguyên âm), nếu có ----------
   Chuỗi 8 từ liền nhau của mọi trường chữ (cả đoạn đọc, thang chấm) không có trong sách; cụm từ chung (TU_CHUNG: tên chủ đề, quốc hiệu,
   tiêu ngữ của bản báo cáo, cách hỏi chuẩn như “Chọn từ thích hợp nhất điền vào chỗ trống”) thay bằng dấu ngăn trước khi so. */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const khongDau = (s) => nfc(s).normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...TOPICS, "cộng hoà xã hội chủ nghĩa việt nam", "độc lập – tự do – hạnh phúc", "mỗi ý sau đúng hay sai", "chọn từ thích hợp nhất điền vào chỗ trống",
  "dấu gạch ngang trong câu sau dùng để làm gì", "dấu gạch ngang trong đoạn sau dùng để làm gì"].map((x) => " " + khongDau(x) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((x) => { while (t.includes(x)) t = t.replace(x, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|")) ra.push(c.join(" ")); } return ra; };
const truong = (q) => chu(q).concat(q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].title, PSG[q.p].text] : []);
if (SACH.length) {
  assert.ok(SACH.some((f) => /tieng-viet-5-tap-1/.test(f)) && SACH.some((f) => /tieng-viet-5-tap-2/.test(f)), "OnUp-Book có Tiếng Việt 5 hai tập");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => sach.includes(" " + c + " ")).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");

/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả câu riêng của các đề ngẫu nhiên ---------- */
{
  const cauKhac = (b, q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " });
  const khac = BANKS.filter((b) => !b.pool && b.file !== "5-tv.js").flatMap((b) => b.questions.map((q) => cauKhac(b, q)))
    .concat(BANKS.filter((b) => b.pool && b.file !== "5-tv.js").flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cauKhac(b, q))));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => khac.filter((o) => o.s.includes(" " + c + " ")).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(soCau + " câu Luyện từ và câu đã đọc lại đáp án; kho " + kho.length + " câu (" + d1.n + " + " + d2.n + " câu của hai đề cố định, " + rieng.length + " câu riêng), "
  + Object.keys(PSG).length + " đoạn đọc, " + viet.length + " câu Viết, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề; đáp án đúng dài nhất ở " + daiNhat + ", ngắn nhất ở " + nganNhat + " trên " + mcs.length + " câu nhiều lựa chọn.");
console.log("TV5 OK");
