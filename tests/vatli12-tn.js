// Kiểm tra các đề Vật lí thi thử tốt nghiệp THPT (data/banks/12-vatli.js, vatli12-tn-de<N>; Phiên N12-tn-vatli: Đề 1–4; Phiên N12-tn-vatli-b:
// Đề 5–8; phiên sau thêm đề thì mở rộng script này: thêm các mục kiểm tra của đề mới vào RIENG). Đề tính điểm (Phiên K5), khung đề tốt nghiệp THPT từ năm 2025 (Quyết
// định 764/QĐ-BGDĐT; docs/KE-HOACH-NOI-DUNG.md, mục 2 và mục 7, khối “Phiên N12-tn-vatli”). Số đề, số câu lấy từ danh mục (không ghi cứng).
// Khung: danh mục (tên, khối 12, môn Vật lí, file, 50 phút, pts 10, gắn vào tn-thpt-2027); Phần I 18 câu nhiều lựa chọn pt 0,25, Phần II 4
// câu đúng/sai 4 ý pt 1, Phần III 6 câu trả lời ngắn pt 0,25 (đúng tên part, đúng thứ tự), Quiz.grade điểm tối đa 4,5 – 4 – 1,5; đáp án Phần
// III là số, không quá 4 kí tự (dấu trừ, dấu phẩy tính một kí tự), câu dặn làm tròn có tol bằng nửa đơn vị làm tròn và lời giải ghi “≈ …”;
// mức độ như ma trận đề tham khảo năm 2025 (Phần I 11 Biết, 5 Hiểu, 2 Vận dụng; Phần II bốn câu ghi mức 1, 2, 2, 3; Phần III 1 Biết, 3 Hiểu,
// 2 Vận dụng); phạm vi: mọi câu thuộc Vật lí 12, chủ đề đúng chữ chủ đề của ba kho Vật lí 12 (cuối kì I, giữa kì II, cuối năm), mỗi đề 40 ý
// (mỗi câu Phần II tính 4 ý): Vật lí nhiệt 8, Khí lí tưởng 9, Từ trường 13, Vật lí hạt nhân 10 (tỉ lệ 20 – 22,5 – 32,5 – 25% của đề tham
// khảo năm 2025), Phần I 3 – 4 – 7 – 4 câu, Phần II mỗi chương một câu, Phần III 1 – 1 – 2 – 2 câu; đoạn thông tin dùng chung (passages):
// Phần III ba cặp câu liền nhau, mỗi cặp một đoạn; Phần I nhiều nhất một cặp; lời dặn ghi đúng số câu, số điểm, số ý mỗi chương (tính từ dữ liệu).
// Mỗi câu khớp đúng một mục kiểm tra của đề đó (theo chữ has trong đề bài), mục đó đọc số liệu trong đề bài hoặc đoạn thông tin rồi tính
// lại đáp án bằng code: nhiệt lượng (Q = mcΔt, Q = λm, Q = Lm, cân bằng nhiệt, cả nước đá tan rồi nóng lên), định luật I (ΔU = A + Q, công
// của khí đẩy pit-tông A = pSd, nén đẳng nhiệt khí lí tưởng thì ΔU = 0), thang Kelvin, định luật Boyle (cả bọt khí ở đáy hồ p = p₀ + ρgh),
// Charles, phương trình trạng thái (số mol, khối lượng khí), p = μkT, Ēđ = (3/2)kT, tốc độ căn quân phương; lực từ F = BILsinθ (cả N
// đoạn dây, cân điện tử, thanh trên hai ray có ma sát), hướng lực từ, hướng cảm ứng từ quanh dây thẳng bằng tích có hướng theo các hướng
// Đông, Tây, Nam, Bắc, chiều dòng điện cảm ứng theo định luật Lenz, suất điện động cảm ứng |e| = N · |ΔΦ|/Δt, nhiệt lượng toả ra trong
// khung, máy phát điện (f, E₀ = NBSω, giá trị hiệu dụng, biểu thức e, u, i), máy biến áp, bước sóng, ra-đa; hạt nhân (kí hiệu ᴬ_ZX đúng số
// proton của nguyên tố, số neutron, bán kính R = 1,2 · 10⁻¹⁵ · ∛A, độ hụt khối, năng lượng liên kết, năng lượng liên kết riêng, năng lượng
// toả ra của phản ứng, động năng các hạt sinh ra; mọi phản ứng hạt nhân bảo toàn số khối và điện tích, cả hệ số như “3¹₀n”; phân loại phân
// hạch, tổng hợp, phóng xạ α), định luật phóng xạ (số hạt nhân, khối lượng còn lại, độ phóng xạ, hằng số phóng xạ, H = λN, tuổi theo ¹⁴C),
// lò phản ứng (số phân hạch mỗi giây, khối lượng ²³⁵U tiêu thụ); Phiên N12-tn-vatli-b thêm: động cơ nhiệt (A = Q₁ − Q₂ sau một chu trình,
// hiệu suất, công suất), nhiệt lượng làm nước nóng lên rồi hoá hơi và hiệu suất bộ phận đun, thể tích hơi nước pV = nRT, bình khí nén của thợ
// lặn (khí chỉ ra khỏi bình khi áp suất trong bình còn lớn hơn áp suất của nước), mật độ phân tử khí trong 1 cm³ (p = μkT), khối lượng riêng
// theo phương trình trạng thái, từ trường đổi chiều (|ΔΦ| = (B₁ + B₂)S), máy biến áp quấn thêm vòng (mỗi vòng ứng với U₁/N₁), thanh treo
// bằng hai lò xo (BIL = mg, 2kΔl = 2mg), đinamô (ω = v/r, E₀ = NΦ₀ω), điện tích hạt nhân Ze, đồng vị (số neutron, bán kính tỉ lệ với ∛A),
// khối lượng Mặt Trời mất mỗi giây E = mc², số chuỗi phản ứng nhiệt hạch mỗi giây; câu khái niệm so với bảng ghi trong script (theo sách in năm 2026).
// Đọc lại đồ thị trên lưới (như tests/vatli-hoahoc12-gk2.js: gốc O, lưới đều, số ở trục đúng vạch, cả phần âm của trục đứng, tên trục ở đầu
// trục): đồ thị thể tích theo nhiệt độ tuyệt đối (đường thẳng qua gốc toạ độ, đoạn gần gốc nét đứt), từ thông theo thời gian, nhiệt độ của
// nước đá được đun theo thời gian, số hạt nhân chưa phân rã theo thời gian (đường giảm theo hàm mũ), nhiệt độ của băng phiến để nguội theo
// thời gian (đoạn nằm ngang duy nhất là lúc đông đặc, các đoạn khác nhiệt độ giảm); chữ trong hình từ cỡ 13, nằm trọn trong khung, không đè nhau.
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân, chữ số dưới dòng, dấu thanh kiểu sách “hoá”, “thuỷ”, tên hạt như
// sách; mũi tên chỉ ở phương trình phản ứng hạt nhân); kiểu Đ/S không lặp trong một đề, mỗi kiểu nhiều nhất ba lần trong các đề thi thử;
// đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu
// nhiều lựa chọn của đề, không là lựa chọn duy nhất có chữ của nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng
// không có; lời giải không nhắc vị trí của phương án. So với ba kho Vật lí 12 và giữa các đề thi thử: đề bài không trùng câu nào trong
// file, không gần trùng (chuỗi 6 từ; cặp hai âm tiết chung), đáp án không trùng câu cùng chủ đề. Dò lộ đáp án giữa mọi câu của một đề (mọi
// đoạn thông tin cùng hiện) và với lời dặn, giữa câu cùng chủ đề của các đề thi thử và ba kho Vật lí 12 (đề “Ôn chủ đề” rút chung; đáp án
// bằng chữ đã xem ghi ở DA_XEM). Có ../OnUp-Book thì so mọi trường chữ (cả đoạn thông tin, lời dặn) với chữ OCR của mọi cuốn (không chuỗi 8
// từ nào trùng) và với câu của mọi kho khác, cả giữa các đề thi thử với nhau. Bộ đọc hình, bộ đọc phản ứng hạt nhân, bộ dò lộ tự thử với
// hình, phản ứng, câu cố ý viết sai.
// Chạy: node tests/vatli12-tn.js → in MATH OK. DO_LO=1: in đáp án bằng chữ có ở câu khác; DO_SACH=1: in chuỗi 6 từ trùng chữ OCR của sách;
// DO_KHO=1: in chuỗi 6 từ trùng câu của kho khác.
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

/* ---------- số (như tests/vatli-hoahoc12-ck2.js): hàng nghìn ngăn bằng khoảng trắng, dấu phẩy thập phân, luỹ thừa của 10 viết “3 · 10⁸” ---------- */
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹", SUB = "₀₁₂₃₄₅₆₇₈₉";
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?(?: · 10⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)?";
const val = (s) => {
  const m = /^([−-]?\d{1,3}(?: \d{3})*(?:,\d+)?)(?: · 10(⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+))?$/.exec(String(s).trim());
  assert.ok(m, "không đọc được số “" + s + "”");
  const e = m[2] ? +[...m[2]].map((c) => (c === "⁻" ? "-" : SUP.indexOf(c))).join("") : 0;
  return +m[1].replace(/ /g, "").replace("−", "-").replace(",", ".") * 10 ** e;
};
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
const R = (mau) => new RegExp(mau.split("#").map(escRe).join("(" + NUM + ")"), "u");
const so = (s, mau) => { const m = R(mau).exec(s); assert.ok(m, "không thấy “" + mau + "” trong: " + String(s).slice(0, 90)); return m.slice(1).map(val); };
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b));
const vn = (x, d = 6) => { const r = Math.round(x * 10 ** d) / 10 ** d, [a, b] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const vnf = (x, d) => { const [a, b] = Math.abs(x).toFixed(d).split("."); return (x < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const supN = (k) => [...String(k)].map((c) => (c === "-" ? "⁻" : SUP[+c])).join("");
const supV = (s) => +[...s].map((c) => SUP.indexOf(c)).join(""), subV = (s) => +[...s].map((c) => SUB.indexOf(c)).join("");
const sci = (x, d) => { let e = Math.floor(Math.log10(Math.abs(x))), m = x / 10 ** e; if (Math.abs(+m.toFixed(d)) >= 10) { m /= 10; e++; } return vnf(m, d) + " · 10" + supN(e); };
const lamTron = (x, k) => Math.round(x * 10 ** k + 1e-9 * Math.sign(x)) / 10 ** k;
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const khoang = (a, b, e = 0.03) => Math.abs(a - b) <= e * Math.abs(b); // “khoảng …”: lệch không quá 3%
// chọn đúng một lựa chọn thoả điều kiện
const motCai = (q, f, at = "") => { const c = q.o.filter(f); assert.equal(c.length, 1, at + "cần đúng một lựa chọn thoả điều kiện, có " + c.length + ": " + c.join(" | ")); return c[0]; };
// bảng tra: mọi lựa chọn phải có trong bảng, đúng một lựa chọn có giá trị cần tìm
const tra = (q, bang, can) => { q.o.forEach((o) => assert.ok(o in bang, "lựa chọn chưa có trong bảng: " + o)); return motCai(q, (o) => bang[o] === can); };

/* ---------- vectơ: Đông (x), Bắc (y), hướng lên trên (z) ---------- */
const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
const dai = (a) => Math.hypot(...a);
const cungHuong = (a, b) => dai(a) > 1e-9 && dai(b) > 1e-9 && gan((a[0] * b[0] + a[1] * b[1] + a[2] * b[2]) / (dai(a) * dai(b)), 1, 1e-6);
const HUONG = { Đông: [1, 0, 0], Tây: [-1, 0, 0], Bắc: [0, 1, 0], Nam: [0, -1, 0], "lên trên": [0, 0, 1], "xuống dưới": [0, 0, -1] };
const tenHuong = (v) => { const h = Object.keys(HUONG).filter((k) => cungHuong(v, HUONG[k])); assert.equal(h.length, 1, "hướng không theo một trong các hướng chính: " + v); return h[0]; };

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => { const a = attrs("<t " + m[1] + ">");
  return Object.assign(a, { t: m[2], at: [+a.x, +a.y], b: a["font-weight"] === "bold" || a["font-weight"] === "700", fs: +(a["font-size"] || 15), anchor: a["text-anchor"] || "start" }); });
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const dist = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1]);
const hopChu = (t) => { const w = (t.b ? 0.62 : 0.55) * t.fs * [...t.t].length, x0 = t.anchor === "middle" ? t.at[0] - w / 2 : t.anchor === "end" ? t.at[0] - w : t.at[0];
  return [x0, t.at[1] - 0.75 * t.fs, x0 + w, t.at[1] + 0.25 * t.fs]; };
const khung = (svg) => /viewBox="([^"]+)"/.exec(svg)[1].split(/\s+/).map(Number);
const chuHinh = (svg, at) => {
  const v = khung(svg), T = texts(svg);
  T.forEach((t) => { const h = hopChu(t); assert.ok(t.fs >= 13, at + ": chữ “" + t.t + "” nhỏ hơn cỡ 13"); assert.ok(h[0] >= 0 && h[2] <= v[2] && h[1] >= 0 && h[3] <= v[3], at + ": chữ “" + t.t + "” tràn khỏi khung hình"); });
  T.forEach((t, i) => T.slice(i + 1).forEach((u) => { const a = hopChu(t), b = hopChu(u); assert.ok(!(a[0] < b[2] - 1 && b[0] < a[2] - 1 && a[1] < b[3] - 1 && b[1] < a[3] - 1), at + ": chữ “" + t.t + "” đè lên chữ “" + u.t + "”"); }));
};
/* Đồ thị trên lưới (như tests/vatli-hoahoc12-gk2.js): hai trục màu ink nét 1,5 cắt nhau ở gốc O (chữ O cạnh gốc), trục ngang đi từ gốc sang
   phải, trục đứng đi lên (kéo xuống dưới gốc khi đồ thị có giá trị âm), đầu trục có mũi tên; đường lưới màu line cách đều theo từng chiều,
   tính từ trục, mỗi vạch có một số; số ở trục ngang ngay dưới một vạch dọc (dưới cả phần đồ thị), số ở trục đứng ngay trái một vạch ngang,
   giá trị tỉ lệ với khoảng cách tới gốc (cả số âm, số thập phân); tên trục dạng “Φ (mWb)”, “τ (phút)”, “N (10¹⁸)”: tên trục đứng ở đầu trục
   đứng, tên trục ngang ở đầu trục ngang, dưới hàng số; đường biểu diễn là một đường gấp khúc màu acc nét 2,5 nằm trong lưới. Trả về tên hai
   trục và các điểm của đường biểu diễn (theo giá trị). */
const daDoc = new Set();
const docLuoi = (svg, at) => {
  const L = tags(svg, "line"), T = texts(svg), sx = (v) => v.map(Number).sort((a, b) => a - b);
  const doc = sx(L.filter((l) => l.stroke === "line" && l.x1 === l.x2).map((l) => l.x1)), ngang = sx(L.filter((l) => l.stroke === "line" && l.y1 === l.y2).map((l) => l.y1));
  const truc = L.filter((l) => l.stroke === "ink" && l["stroke-width"] === "1.5"), tx = truc.filter((l) => l.y1 === l.y2), ty = truc.filter((l) => l.x1 === l.x2);
  assert.ok(tx.length === 1 && ty.length === 1 && truc.length === 2, at + ": một trục ngang, một trục đứng");
  const O = [+ty[0].x1, +tx[0].y1], X2 = +tx[0].x2, Y2 = +ty[0].y2;
  assert.ok(+tx[0].x1 === O[0] && X2 > O[0] && +ty[0].y1 >= O[1] && Y2 < O[1], at + ": trục ngang đi từ gốc O sang phải, trục đứng đi lên");
  const dau = tags(svg, "polygon").filter((p) => p.fill === "ink").map((p) => pts(p.points)[0]);
  assert.ok(dau.some((p) => p[1] === O[1] && p[0] > X2) && dau.some((p) => p[0] === O[0] && p[1] < Y2), at + ": đầu hai trục có mũi tên");
  assert.ok(T.some((t) => t.t === "O" && dist(t.at, O) < 26), at + ": chữ O ở gốc");
  const bx = doc[0] - O[0], tren = ngang.filter((y) => y < O[1]).reverse(), duoi = ngang.filter((y) => y > O[1]), by = O[1] - tren[0];
  doc.forEach((x, i) => assert.ok(Math.abs(x - O[0] - (i + 1) * bx) < 0.06, at + ": lưới đều theo chiều ngang"));
  tren.forEach((y, j) => assert.ok(Math.abs(O[1] - y - (j + 1) * by) < 0.06, at + ": lưới đều theo chiều đứng"));
  duoi.forEach((y, j) => assert.ok(Math.abs(y - O[1] - (j + 1) * by) < 0.06, at + ": lưới đều theo chiều đứng (dưới trục)"));
  assert.ok(!ngang.includes(O[1]), at + ": không có vạch lưới trùng trục ngang");
  const top = tren[tren.length - 1], day_ = duoi.length ? duoi[duoi.length - 1] : O[1], phai = doc[doc.length - 1];
  assert.ok(+ty[0].y1 === day_, at + ": trục đứng kéo xuống hết phần âm của lưới");
  L.filter((l) => l.stroke === "line").forEach((l) => assert.ok(l.x1 === l.x2 ? +l.y1 === top && +l.y2 === day_ : +l.x1 === O[0] && +l.x2 === phai, at + ": vạch lưới đi hết phần đồ thị"));
  const SO = /^[−-]?\d+(?:,\d+)?$/, soX = T.filter((t) => SO.test(t.t) && t.anchor === "middle"), soY = T.filter((t) => SO.test(t.t) && t.anchor === "end");
  assert.ok(soX.length + soY.length === T.filter((t) => SO.test(t.t)).length, at + ": số ở trục ngang căn giữa, ở trục đứng căn phải");
  doc.forEach((x) => assert.equal(soX.filter((t) => Math.abs(t.at[0] - x) < 0.06).length, 1, at + ": mỗi vạch dọc có một số"));
  ngang.forEach((y) => assert.equal(soY.filter((t) => Math.abs(t.at[1] - 5 - y) < 0.06).length, 1, at + ": mỗi vạch ngang có một số"));
  soX.forEach((t) => assert.ok(doc.some((x) => Math.abs(x - t.at[0]) < 0.06) && t.at[1] > day_ + 10, at + ": số " + t.t + " ở trục ngang dưới một vạch dọc"));
  soY.forEach((t) => assert.ok(ngang.some((y) => Math.abs(y - (t.at[1] - 5)) < 0.06) && t.at[0] < O[0], at + ": số " + t.t + " ở trục đứng trái một vạch ngang"));
  const kx = val(soX[0].t) / (soX[0].at[0] - O[0]), ky = val(soY[0].t) / (O[1] - (soY[0].at[1] - 5));
  soX.forEach((t) => assert.ok(gan(val(t.t), kx * (t.at[0] - O[0]), 1e-6), at + ": số ở trục ngang tỉ lệ với khoảng cách tới gốc"));
  soY.forEach((t) => assert.ok(gan(val(t.t), ky * (O[1] - (t.at[1] - 5)), 1e-6), at + ": số ở trục đứng tỉ lệ với khoảng cách tới gốc"));
  const V = (p) => [(p[0] - O[0]) * kx, (O[1] - p[1]) * ky];
  const tenTruc = T.filter((t) => /^[ΦτtNVT] \((?:mWb|s|°C|K|L|phút|giờ|ngày|10[⁰¹²³⁴⁵⁶⁷⁸⁹]+)\)$/u.test(t.t));
  assert.equal(tenTruc.length, 2, at + ": tên hai trục");
  const tenX = tenTruc.filter((t) => Math.abs(t.at[0] - X2) < 30 && t.at[1] > day_ + 20 && t.at[1] < day_ + 46), tenY = tenTruc.filter((t) => dist(t.at, [O[0], Y2]) < 30);
  assert.ok(tenX.length === 1 && tenY.length === 1 && tenX[0] !== tenY[0], at + ": tên trục ở đầu mỗi trục");
  const pl = tags(svg, "polyline").filter((p) => p.stroke === "acc" && p["stroke-width"] === "2.5");
  assert.ok(pl.length === 1 && tags(svg, "polyline").length === 1, at + ": một đường biểu diễn");
  const diemPl = pts(pl[0].points);
  diemPl.forEach((p) => assert.ok(p[0] >= O[0] - 0.06 && p[0] <= phai + 0.06 && p[1] >= top - 0.06 && p[1] <= day_ + 0.06, at + ": đường biểu diễn nằm trong lưới"));
  diemPl.slice(1).forEach((p, i) => assert.ok(p[0] > diemPl[i][0], at + ": đường biểu diễn đi theo thời gian"));
  chuHinh(svg, at);
  daDoc.add(svg);
  return { x: tenX[0].t, y: tenY[0].t, net: diemPl.map(V), val: V };
};
// giá trị của đường gấp khúc tại hoành độ t (nội suy tuyến tính); thời điểm đường gấp khúc có giá trị y
const tai = (net, t) => { for (let i = 1; i < net.length; i++) { const [a, b] = [net[i - 1], net[i]]; if (t >= a[0] - 1e-9 && t <= b[0] + 1e-9) return a[1] + ((b[1] - a[1]) * (t - a[0])) / (b[0] - a[0]); } assert.fail("không có giá trị tại " + t); };
const luc = (net, y) => { for (let i = 1; i < net.length; i++) { const [a, b] = [net[i - 1], net[i]]; if ((y - a[1]) * (y - b[1]) <= 0 && a[1] !== b[1]) return a[0] + ((b[0] - a[0]) * (y - a[1])) / (b[1] - a[1]); } assert.fail("đường biểu diễn không có giá trị " + y); };

/* ---------- hạt nhân: kí hiệu ᴬ_ZX (số khối viết chữ số trên dòng, số proton viết chữ số dưới dòng), phản ứng hạt nhân (hệ số như “3¹₀n”) ---------- */
const Z_NT = { n: 0, H: 1, He: 2, Li: 3, B: 5, C: 6, N: 7, O: 8, F: 9, Ne: 10, Na: 11, Mg: 12, Al: 13, P: 15, Fe: 26, Co: 27, Ni: 28, Cu: 29, Kr: 36, Rb: 37, Sr: 38, Y: 39, Zr: 40, I: 53, Xe: 54,
  Cs: 55, Ba: 56, Au: 79, Pb: 82, Bi: 83, Po: 84, At: 85, Rn: 86, Ra: 88, Th: 90, U: 92, Pu: 94, Am: 95 };
const HN = "[⁰¹²³⁴⁵⁶⁷⁸⁹]+[₀₁₂₃₄₅₆₇₈₉]*(?:[A-Z][a-z]?|n)(?![\\p{L}])";
const hatNhan = (t) => {
  const m = /^([⁰¹²³⁴⁵⁶⁷⁸⁹]+)([₀₁₂₃₄₅₆₇₈₉]*)([A-Z][a-z]?|n)$/u.exec(t); assert.ok(m, "không đọc được hạt nhân " + t);
  assert.ok(m[3] in Z_NT, "thiếu số proton của " + m[3]); const A = supV(m[1]), Z = Z_NT[m[3]];
  if (m[2]) assert.equal(subV(m[2]), Z, "số proton của " + t + " đúng nguyên tố"); assert.ok(A >= Z && A > 0 && (m[3] !== "n" || A === 1), "số khối của " + t);
  return { A, Z, k: m[3] }; };
const HAT = `(?:[2-9])?(?:${HN}|X)`;
const PTHN = new RegExp(`${HAT}(?: \\+ ${HAT})* → ${HAT}(?: \\+ ${HAT})*`, "gu");
const hat = (t) => { const m = /^([2-9]?)(.+)$/u.exec(t); return { k: m[1] ? +m[1] : 1, t: m[2] }; };
// tổng số khối, tổng điện tích hai vế; có hạt X chưa biết thì trả về X (bảo toàn số khối và điện tích)
const phanUng = (pt) => {
  const ve = pt.split(" → ").map((v) => v.split(" + ").map(hat)), X = ve.flat().filter((h) => h.t === "X").length;
  assert.ok(X <= 1, "phản ứng có nhiều nhất một hạt X: " + pt);
  const tong = (v) => v.filter((h) => h.t !== "X").reduce((s, h) => { const x = hatNhan(h.t); return [s[0] + h.k * x.A, s[1] + h.k * x.Z]; }, [0, 0]);
  const [a, b] = ve.map(tong);
  if (!X) { assert.ok(a[0] === b[0] && a[1] === b[1], "phản ứng hạt nhân bảo toàn số khối và điện tích: " + pt); return null; }
  const trai = ve[0].some((h) => h.t === "X"), x = trai ? [b[0] - a[0], b[1] - a[1]] : [a[0] - b[0], a[1] - b[1]];
  assert.ok(x[0] > 0 && x[1] >= 0 && x[0] >= x[1], "hạt X có số khối, điện tích hợp lí: " + pt); return { A: x[0], Z: x[1] };
};
// loại phản ứng: phân hạch (hạt nhân nặng hấp thụ neutron, vỡ thành hai hạt nhân trung bình), tổng hợp (hai hạt nhân nhẹ thành hạt nhân nặng
// hơn), phóng xạ α (một hạt nhân tự phát ra ⁴₂He), phản ứng kích thích khác
const loaiPhanUng = (pt) => {
  phanUng(pt); const [t, s] = pt.split(" → ").map((v) => v.split(" + ").map(hat).map((h) => Object.assign(hatNhan(h.t), { k: h.k })));
  const nang = (v) => v.filter((x) => x.A >= 4 && x.k === 1);
  if (t.length === 2 && t.some((x) => x.k === 1 && x.A === 1 && x.Z === 0) && t.some((x) => x.A > 200) && nang(s).length === 2 && nang(s).every((x) => x.A > 60 && x.A < 170)) return "phân hạch";
  if (t.length === 1 && s.some((x) => x.A === 4 && x.Z === 2)) return "phóng xạ α";
  if (t.length === 2 && t.every((x) => x.A <= 4) && s.some((x) => x.A > Math.max(...t.map((y) => y.A)))) return "tổng hợp";
  return "khác";
};
const MEV = 931.5;
const khoi = (s, hn) => { const m = new RegExp(escRe(hn) + "(?: là)? (" + NUM + ") amu", "u").exec(s); assert.ok(m, "không thấy khối lượng của " + hn); return val(m[1]); };
const khoiN = (s, ten) => { const m = new RegExp("(?:^|[\\s,;:(])" + ten + "(?: là)? (" + NUM + ") amu", "u").exec(s); assert.ok(m, "không thấy khối lượng " + ten); return val(m[1]); };

/* ---------- bảng ghi trong script (theo sách Vật lí 12 Kết nối tri thức in năm 2026; câu khái niệm so với bảng) ---------- */
const BAI_HOC = {
  // Bài 1: chất rắn kết tinh và chất rắn vô định hình (Em có biết, tr. 8)
  ranVDH: { "Thuỷ tinh": true, "Muối ăn": false, "Đồng": false, "Kim cương": false },
  // Bài 1: sơ đồ chuyển thể (Hình 1.4)
  chuyenThe: { "rắn→lỏng": "sự nóng chảy", "lỏng→rắn": "sự đông đặc", "lỏng→khí": "sự hoá hơi", "khí→lỏng": "sự ngưng tụ" },
  // Bài 8: khí lí tưởng coi va chạm là hoàn toàn đàn hồi (tr. 36)
  vaCham: "va chạm hoàn toàn đàn hồi",
  // Bài 9: đường đẳng nhiệt trong hệ toạ độ (p, V) là đường hypebol (Hình 9.5)
  dangNhiet: "một đường hypebol",
  // Bài 14: đường sức từ có tiếp tuyến tại mỗi điểm trùng phương với cảm ứng từ tại điểm đó
  tiepTuyen: "tiếp tuyến với đường sức từ đi qua điểm đó",
  // Bài 18: thiết bị dựa trên hiện tượng cảm ứng điện từ
  camUng: { "Máy biến áp": true, "Máy phát điện xoay chiều": true, "Đế sạc không dây của điện thoại": true, "Ấm điện đun nước bằng dây đốt nóng": false },
  // Bài 22: các định luật bảo toàn trong phản ứng hạt nhân
  baoToan: { "Tổng số nucleon của các hạt": true, "Tổng điện tích của các hạt": true, "Năng lượng toàn phần của hệ": true, "Tổng khối lượng nghỉ của các hạt": false },
  // Bài 23: tính chất của tia γ (sóng điện từ, không mang điện, đâm xuyên mạnh, ion hoá yếu)
  tiaGamma: { "Khả năng đâm xuyên mạnh": true, "Bị lệch nhiều trong điện trường": false, "Làm ion hoá mạnh chất khí": false, "Mang điện tích dương": false },
  // Bài 8, 10: khí thực gần khí lí tưởng ở áp suất thấp, nhiệt độ cao
  khiThuc: "Áp suất thấp và nhiệt độ cao",
  // Bài 14: bên ngoài thanh nam châm, đường sức từ đi ra từ cực Bắc, đi vào cực Nam
  duongSuc: "Bên ngoài một thanh nam châm, các đường sức từ đi ra từ cực Bắc và đi vào cực Nam",
  // Bài 17: máy phát điện xoay chiều hoạt động dựa trên hiện tượng cảm ứng điện từ
  mayPhat: "Hiện tượng cảm ứng điện từ",
  // Bài 2: nội năng phụ thuộc vào nhiệt độ và thể tích
  noiNang: "nhiệt độ và thể tích của vật",
  // Bài 8: phân tử khí va chạm liên tục, chuyển động theo đường gấp khúc (Hình 8.3)
  gapKhuc: "các phân tử va chạm liên tục nên chuyển động theo đường gấp khúc",
  // Bài 14: dòng điện sinh ra từ trường; Trái Đất có từ trường
  sinhTu: "Một bóng đèn sợi đốt đang sáng trên bàn", traiDat: "Trái Đất có từ trường",
  // Bài 17: số chỉ của ampe kế xoay chiều là giá trị hiệu dụng
  ampeKe: "hiệu dụng của cường độ dòng điện",
  // Bài 18: phanh điện từ dùng dòng điện Foucault; định nghĩa dòng điện Foucault
  phanh: "lực từ tác dụng lên dòng điện Foucault trong đĩa kim loại",
  foucault: "khối vật dẫn chuyển động trong từ trường hoặc đặt trong từ trường biến thiên",
  // Bài 3, 19: nhiệt kế đo từ xa thu tia hồng ngoại; thang sóng điện từ theo bước sóng trong chân không (nm)
  hongNgoai: "Tia hồng ngoại",
  vung: [["Tia γ", 0, 0.01], ["Tia X", 0.01, 10], ["Tia tử ngoại", 10, 380], ["Ánh sáng nhìn thấy", 380, 760], ["Tia hồng ngoại", 760, 1e6], ["Sóng vô tuyến", 1e6, Infinity]],
  // Bài 23, 24: ứng dụng của tia phóng xạ
  ungDung: { "Xạ trị để tiêu diệt tế bào ung thư": true, "Đo độ dày tấm thép trong nhà máy cán thép": true, "Kiểm tra vết nứt bên trong ống kim loại": true, "Làm nóng thức ăn bằng lò vi sóng gia đình": false },
  // Bài 6: nhiệt hoá hơi riêng tăng khi nhiệt độ giảm
  hoaHoi: "lớn hơn",
  // Bài 24: nước trong lò phản ứng làm chậm neutron và tải nhiệt; năng lượng phân hạch chủ yếu là động năng của các mảnh
  nuocLo: "giảm tốc độ neutron, vừa mang nhiệt ra khỏi vùng hoạt động của lò", manh: true,
  // Phiên N12-tn-vatli-b (Đề 5–8)
  // Bài 8: phân tử khí là chất điểm, chỉ tương tác lúc va chạm, nên giữa hai lần va chạm chuyển động thẳng đều (câu hỏi ở Bài 12, tr. 48)
  thangDeu: "thẳng đều",
  // Bài 14: các cực cùng tên đẩy nhau, khác tên hút nhau
  khacTen: "hút nhau", cungTen: "đẩy nhau",
  // Bài 16: từ thông có đơn vị là vêbe (Wb)
  wb: "vêbe (Wb)",
  // Bài 23: đơn vị độ phóng xạ là becơren (Bq); Bài 24: tia phóng xạ gây đột biến gene để tạo giống cây trồng mới
  bq: "becơren (Bq)", dotBien: "gây đột biến gene để chọn ra giống cây mới",
  // Bài 1 (Em có biết): ở nhiệt độ hàng triệu độ, chất ở thể plasma (dạng các ion); Bài 1, 8: nhiệt độ càng cao, phân tử chuyển động càng nhanh
  plasma: "plasma", nhanhHon: "chuyển động càng nhanh",
  // Bài 14: các đường sức từ là những đường cong khép kín, không cắt nhau, vẽ dày hơn ở nơi từ trường mạnh hơn
  khepKin: "đều là đường cong khép kín",
  // Bài 1: khi bay hơi, các phân tử có động năng đủ lớn thoát ra khỏi mặt thoáng, nhiệt độ của chất lỏng còn lại giảm (tr. 8)
  bayHoi: "những phân tử có động năng lớn thoát ra khỏi mặt thoáng",
  // Bài 6: hơi nước ngưng tụ toả ra nhiệt lượng bằng nhiệt lượng đã nhận khi hoá hơi (Q = Lm)
  bong: "hơi nước ngưng tụ trên da, toả thêm nhiều nhiệt lượng",
  // Bài 8: kích thước các phân tử khí rất nhỏ so với khoảng cách giữa chúng
  deNen: "các phân tử khí chỉ chiếm một phần rất nhỏ thể tích bình chứa",
  // Bài 14: chiều của từ trường tại một điểm là chiều từ cực Nam sang cực Bắc của kim nam châm nhỏ nằm cân bằng ở đó
  chieuB: "hướng từ cực Nam sang cực Bắc",
  // Bài 19: tại mỗi điểm, E và B biến thiên điều hoà và luôn đồng pha
  dongPha: "đồng pha với nhau",
  // Bài 23: phóng xạ γ: hạt nhân chuyển từ trạng thái kích thích về trạng thái năng lượng thấp hơn, phát ra bức xạ điện từ (A, Z không đổi)
  gamma: "có số proton và số neutron không đổi",
  // Bài 24: đo bề dày bằng tia phóng xạ: vật càng mỏng, tia bị hấp thụ càng ít, số đếm càng lớn
  doDay: "mỏng đi",
  // Bài 1 (Em có biết): kim loại là chất rắn kết tinh, có nhiệt độ nóng chảy xác định; nhựa đường, các chất dẻo là chất rắn vô định hình
  ketTinh: { "Thiếc": true, "Nhựa đường": false, "Nhựa thông": false, "Chất dẻo PVC": false },
  // Bài 14: từ trường của thanh nam châm mạnh nhất ở gần hai cực (đường sức từ dày nhất)
  cucManh: "gần hai cực của thanh nam châm",
  // Bài 24: chất thải hạt nhân phải cất giữ hàng trăm năm vì chu kì bán rã của một số đồng vị trong thanh nhiên liệu đã dùng rất lớn
  chatThai: "nhiều chất trong đó có chu kì bán rã rất lớn"
};
// biến đổi số khối, số proton của hạt nhân con so với hạt nhân mẹ, đọc từ lựa chọn (“cùng số khối, số proton nhiều hơn 1”)
const bienDoi = (o) => { const f = (ten) => { const m = new RegExp("(cùng số " + ten + ")|số " + ten + " (nhiều|ít) hơn (\\d)").exec(o); assert.ok(m, "không đọc được “" + o + "”"); return m[1] ? 0 : (m[2] === "nhiều" ? 1 : -1) * +m[3]; };
  return [f("khối"), f("proton")]; };
const PHONG_XA = { "β⁻": [0, 1], "β⁺": [0, -1], α: [-4, -2] };

/* ---------- các mục kiểm tra của từng đề (RIENG; phiên thêm đề thì thêm một khoá mới) ----------
   has: đoạn chữ của đề bài; right(q, d): đáp án tính bằng code, d là chữ của đoạn thông tin dùng chung (rỗng nếu câu không có): câu nhiều
   lựa chọn trả về lựa chọn đúng, câu đúng/sai 4 ý trả về mảng 4 ý, câu trả lời ngắn trả về số chưa làm tròn. */
const RIENG = {
  "vatli12-tn-de1": [
    { has: "Chất nào sau đây là chất rắn vô định hình?", right: (q) => tra(q, BAI_HOC.ranVDH, true) },
    { has: "nhiệt độ của nước trong cốc tăng thêm", right: (q) => { const [d] = so(q.q, "tăng thêm # °C"); return vn(d) + " K"; } },
    { has: "nếu đem truyền cho 1 kg nước ở 0 °C", right: (q) => {
      const [lam] = so(q.q, "nước đá là # J/kg"), [c] = so(q.q, "nước là # J/kg.K"), t = lam / c;
      coX(q, "≈ " + vnf(t, 1)); return motCai(q, (o) => Math.abs(val(o.replace(" °C", "")) - t) < 1); } },
    { has: "khi một phân tử khí đập vào thành bình rồi bật ra thì va chạm đó được coi là", right: () => BAI_HOC.vaCham },
    { has: "Vẽ đồ thị biểu diễn p theo V", right: () => BAI_HOC.dangNhiet },
    { has: "Hình bên cho biết thể tích của lượng khí thay đổi thế nào", right: (q) => {
      const g = docLuoi(q.svg, "đồ thị V–T"); assert.ok(g.x === "T (K)" && g.y === "V (L)");
      // đường liền và đoạn nét đứt (từ gốc O tới đầu đường liền) cùng nằm trên một đường thẳng qua gốc toạ độ: V tỉ lệ thuận với T
      const k = g.net[0][1] / g.net[0][0], dut = tags(q.svg, "line").filter((l) => l["stroke-dasharray"]);
      g.net.forEach(([T, V]) => assert.ok(gan(V, k * T, 1e-6), "đồ thị V theo T là đường thẳng qua gốc toạ độ"));
      assert.ok(dut.length === 1 && dut[0].stroke === "acc", "một đoạn nét đứt");
      const a = g.val([+dut[0].x1, +dut[0].y1]), b = g.val([+dut[0].x2, +dut[0].y2]);
      assert.ok(Math.abs(a[0]) < 1e-9 && Math.abs(a[1]) < 1e-9 && gan(b[0], g.net[0][0], 1e-6) && gan(b[1], g.net[0][1], 1e-6), "đoạn nét đứt nối gốc O với đầu đường liền");
      const [t] = so(q.q, "Ở nhiệt độ # °C, lượng khí có thể tích"); return vnf(k * (t + 273), 2) + " L"; } },
    { has: "Khi đó tốc độ căn quân phương của các phân tử khí", right: (q) => { const [k] = so(q.q, "tăng lên # lần"); return "tăng " + vn(Math.sqrt(k)) + " lần"; } },
    { has: "Tại một điểm trong từ trường, vectơ cảm ứng từ có phương", right: () => BAI_HOC.tiepTuyen },
    { has: "được căng theo hướng Đông – Tây", right: (q) => {
      const i = /dòng điện trong dây chạy theo hướng từ (Đông|Tây|Nam|Bắc) sang (Đông|Tây|Nam|Bắc)/.exec(q.q), b = /từ trường của Trái Đất tại nơi đó nằm ngang, hướng từ (Nam|Bắc) sang (Nam|Bắc)/.exec(q.q);
      assert.ok(i && b); const I = HUONG[i[2]].map((v, k) => v - HUONG[i[1]][k]), B = HUONG[b[2]].map((v, k) => v - HUONG[b[1]][k]);
      return { "xuống dưới": "thẳng đứng xuống dưới", "lên trên": "thẳng đứng lên trên", Bắc: "nằm ngang về phía Bắc", Nam: "nằm ngang về phía Nam" }[tenHuong(cross(I, B))]; } },
    { has: "KHÔNG có dòng điện cảm ứng trong một vòng dây dẫn kín", right: (q) => motCai(q, (o) => /nằm yên.*đứng yên/.test(o)) },
    { has: "Trong mỗi giây, chiều của dòng điện này đổi bao nhiêu lần?", right: (q) => { const [f] = so(q.q, "tần số # Hz"); return vn(2 * f) + " lần"; } },
    { has: "hoạt động KHÔNG dựa trên hiện tượng cảm ứng điện từ", right: (q) => tra(q, BAI_HOC.camUng, false) },
    { has: "Bước sóng của sóng điện từ do trạm phát ra là", right: (q, d) => { const [f] = so(d, "tần số # MHz"), [c] = so(d, "là # m/s"); return vnf(c / (f * 1e6), 2) + " m"; } },
    { has: "truyền tới một chiếc điện thoại cách trạm", right: (q, d) => { const [s] = so(q.q, "cách trạm # km"), [c] = so(d, "là # m/s"); return vn((s * 1000 / c) * 1e6) + " μs"; } },
    { has: "Hạt nhân ⁶⁰₂₇Co có bao nhiêu neutron?", right: (q) => { const h = hatNhan(new RegExp("Hạt nhân (" + HN + ")", "u").exec(q.q)[1]); return String(h.A - h.Z); } },
    { has: "đại lượng nào sau đây KHÔNG được bảo toàn?", right: (q) => tra(q, BAI_HOC.baoToan, false) },
    { has: "Trong phóng xạ β⁻, so với hạt nhân mẹ, hạt nhân con có", right: (q) => motCai(q, (o) => bienDoi(o).join() === PHONG_XA["β⁻"].join()) },
    { has: "tìm vết nứt nằm sâu bên trong các mối hàn kim loại", right: (q) => tra(q, BAI_HOC.tiaGamma, true) },
    { has: "Để ước lượng nhiệt dung riêng của nước", right: (q) => {
      const [m] = so(q.q, "đun # kg nước"), [P] = so(q.q, "công suất # W"), [ph] = so(q.q, "Sau # phút"), [t1, t2] = so(q.q, "tăng từ # °C lên # °C");
      const A = P * ph * 60, c = A / (m * (t2 - t1)), [a] = so(q.o[0], "là # kJ"), [b] = so(q.o[1], "tính được là # J/kg.K");
      const [Qd, h] = so(q.o[2], "nhiệt lượng nước thu vào là # kJ, nên hiệu suất của ấm khoảng #%"), [cs] = so(q.o[2], "nhiệt dung riêng của nước là # J/kg.K"), Q = m * cs * (t2 - t1);
      assert.ok(/lớn hơn giá trị thật, vì một phần điện năng bị hao phí/.test(q.o[3]));
      return [gan(a * 1000, A), gan(b, c), gan(Qd * 1000, Q) && Math.abs((Q / A) * 100 - h) < 0.5, c > cs]; } },
    { has: "để khảo sát một lượng khí xác định ở nhiệt độ không đổi", right: (q) => {
      const d = [...q.q.matchAll(new RegExp("(" + NUM + ") mL,(?: áp suất)? (" + NUM + ") kPa", "gu"))].map((m) => [val(m[1]), val(m[2])]); assert.equal(d.length, 4);
      const K = d[0][0] * d[0][1], hang = d.every(([V, p]) => gan(V * p, K)), [b] = so(q.o[1], "đều bằng # kPa · mL"), [V3, p3] = so(q.o[2], "đến thể tích # mL thì áp suất của nó là # kPa");
      assert.ok(/tỉ lệ thuận với thể tích/.test(q.o[0]) && /nằm trên một đường thẳng không đi qua gốc toạ độ/.test(q.o[3]));
      // p = K · (1/V): áp suất tỉ lệ nghịch với thể tích, đồ thị p theo 1/V là đường thẳng qua gốc toạ độ
      return [!hang, hang && gan(b, K), gan(K / V3, p3), !hang]; } },
    { has: "Đặt một nam châm chữ U lên đĩa của một cân điện tử", right: (q) => {
      const [L] = so(q.q, "trong từ trường dài # cm"), [m0] = so(q.q, "cân chỉ # g. Khi có"), [I, m1] = so(q.q, "dòng điện # A chạy qua đoạn dây, cân chỉ # g"), [g] = so(q.q, "g = # m/s²");
      const F = ((m1 - m0) / 1000) * g, B = F / (I * (L / 100)), [Fd] = so(q.o[1], "khoảng # N"), [Bd] = so(q.o[2], "khoảng # T"), [I2, m2] = so(q.o[3], "lên # A thì cân chỉ # g");
      assert.ok(/lực từ mà đoạn dây tác dụng lên nam châm hướng lên trên/.test(q.o[0]));
      // số chỉ tăng: nam châm bị đẩy xuống (lực do đoạn dây tác dụng lên nam châm hướng xuống)
      return [m1 < m0, khoang(Fd, F), khoang(Bd, B), gan(m0 + ((m1 - m0) * I2) / I, m2)]; } },
    { has: "một liều dược chất có ¹⁸F", right: (q) => {
      const [T] = so(q.q, "chu kì bán rã # phút"), [H0] = so(q.q, "là # MBq"), [ln2] = so(q.q, "ln 2 ≈ #"), luc_ = (o) => { const m = new RegExp("Lúc (\\d+) giờ (\\d+) phút cùng ngày, độ phóng xạ của liều dược chất còn (" + NUM + ") MBq", "u").exec(o); assert.ok(m); return [(+m[1] - 8) * 60 + +m[2], val(m[3])]; };
      const H = (t) => H0 / 2 ** (t / T), lam = ln2 / (T * 60), [ta, Ha] = luc_(q.o[0]), [tb, Hb] = luc_(q.o[1]), [ld] = so(q.o[2], "khoảng # s⁻¹"), [Nd] = so(q.o[3], "khoảng # hạt nhân");
      return [gan(H(ta), Ha), gan(H(tb), Hb), khoang(ld, lam, 0.01), khoang(Nd, (H0 * 1e6) / lam)]; } },
    { has: "Trong quá trình đun nóng trên, nội năng của lượng khí tăng thêm", right: (q, d) => {
      const [S] = so(d, "diện tích # cm²"), [p] = so(d, "luôn có cùng áp suất đó".length ? "khí quyển bên ngoài là # Pa" : ""), [Q, dd] = so(d, "khí nhận nhiệt lượng # J và đẩy pit-tông dịch chuyển ra phía ngoài # cm");
      const A = -p * S * 1e-4 * (dd / 100); return A + Q; } },
    { has: "Nhiệt độ của lượng khí sau khi đun bằng bao nhiêu độ C?", right: (q, d) => {
      const [L1, t1] = so(d, "cột khí trong xi lanh dài # cm và có nhiệt độ # °C"), [dd] = so(d, "dịch chuyển ra phía ngoài # cm"); return ((t1 + 273) * (L1 + dd)) / L1 - 273; } },
    { has: "biến thiên điều hoà với tần số bằng bao nhiêu héc?", right: (q, d) => so(d, "tốc độ # vòng/giây")[0] },
    { has: "Suất điện động hiệu dụng của máy bằng bao nhiêu vôn", right: (q, d) => {
      const [N, S] = so(d, "gồm # vòng, diện tích mỗi vòng # cm²"), [n] = so(d, "tốc độ # vòng/giây"), [B] = so(d, "cảm ứng từ # T"), E0 = N * B * S * 1e-4 * 2 * Math.PI * n;
      coX(q, "≈ " + vnf(E0, 1)); return E0 / Math.SQRT2; } },
    { has: "Năng lượng toả ra của mỗi phản ứng bằng bao nhiêu MeV", right: (q, d) => {
      const pt = d.match(PTHN); assert.equal(pt.length, 1); phanUng(pt[0]); assert.equal(pt[0], "²₁H + ²₁H → ³₂He + ¹₀n");
      const mD = khoi(d, "²₁H"), mHe = khoi(d, "³₂He"), mn = khoiN(d, "neutron"); assert.equal(so(d, "1 amu = # MeV/c²")[0], MEV);
      return (2 * mD - mHe - mn) * MEV; } },
    { has: "Năng lượng toả ra khi 1,0 g ²₁H phản ứng hết", right: (q, d) => {
      const mD = khoi(d, "²₁H"), mHe = khoi(d, "³₂He"), mn = khoiN(d, "neutron"), E = (2 * mD - mHe - mn) * MEV;
      const [M] = so(q.q, "khối lượng mol của ²₁H là # g/mol"), [NA] = so(q.q, "Avogadro bằng # mol⁻¹"), [mev] = so(q.q, "1 MeV = # J"), [m] = so(q.q, "khi # g ²₁H");
      return ((((m / M) * NA) / 2) * E * mev) / 1e10; } }
  ],
  "vatli12-tn-de2": [
    { has: "Trong kì nén của một động cơ", right: (q) => { const [A] = so(q.q, "một công # J"), [Q] = so(q.q, "nhiệt lượng # J"), dU = A - Q; return (dU > 0 ? "tăng " : "giảm ") + vn(Math.abs(dU)) + " J"; } },
    { has: "Vật làm bằng chất có nhiệt dung riêng lớn hơn sẽ", right: () => { const dt = (c) => 1 / c; return dt(2) < dt(1) ? "tăng nhiệt độ ít hơn" : "tăng nhiệt độ nhiều hơn"; } },
    { has: "Nhiệt lượng cần cung cấp để 0,2 kg nước đang sôi", right: (q) => { const [L] = so(q.q, "100 °C là # J/kg"), [m] = so(q.q, "để # kg nước"); return vn((L * m) / 1000) + " kJ"; } },
    { has: "gần giống khí lí tưởng nhất?", right: () => BAI_HOC.khiThuc },
    { has: "Một bọt khí nhỏ nổi từ đáy một hồ nước sâu", right: (q) => {
      const [h] = so(q.q, "sâu # m"), [p0] = so(q.q, "Áp suất khí quyển là # Pa"), [rho] = so(q.q, "nước có khối lượng riêng # kg/m³"), [g] = so(q.q, "g = # m/s²");
      return "tăng " + vn((p0 + rho * g * h) / p0) + " lần"; } },
    { has: "Một bình thép dung tích 10 L chứa khí oxygen", right: (q) => {
      const [V, p, t] = so(q.q, "dung tích # L chứa khí oxygen ở áp suất # Pa và nhiệt độ # °C"), [Rk] = so(q.q, "R = # J/mol.K"), [M] = so(q.q, "oxygen là # g/mol");
      const n = (p * V * 1e-3) / (Rk * (t + 273)); coX(q, "≈ " + vnf(n, 1) + " (mol)"); return vnf((n * M) / 1000, 1) + " kg"; } },
    { has: "Phân tử nitrogen có khối lượng", right: (q) => { const [m] = so(q.q, "khối lượng # kg"), [k] = so(q.q, "k = # J/K"), [t] = so(q.q, "Ở # °C"); return vn(Math.round(Math.sqrt((3 * k * (t + 273)) / m))) + " m/s"; } },
    { has: "Phát biểu nào sau đây về đường sức từ là đúng?", right: () => BAI_HOC.duongSuc },
    { has: "Trong một động cơ điện, một cạnh của khung dây dài", right: (q) => {
      const [L] = so(q.q, "dài # cm"), [B] = so(q.q, "cảm ứng từ # T"), [N] = so(q.q, "Khung gồm # vòng"), [I] = so(q.q, "mỗi vòng là # A"); return vn(N * B * I * (L / 100)) + " N"; } },
    { has: "Đưa cực Nam (S) của một thanh nam châm thẳng đứng", right: (q) => {
      // cực gần vòng dây ở phía trên: từ trường đi ra từ cực Bắc, đi vào cực Nam; nam châm lại gần thì từ thông tăng, dòng điện cảm ứng sinh từ
      // trường ngược chiều; nhìn từ trên xuống, dòng điện sinh từ trường hướng xuống trong lòng vòng dây thì chạy cùng chiều kim đồng hồ
      const cuc = /Đưa cực (Nam|Bắc)/.exec(q.q)[1], tren = /từ phía trên xuống lại gần/.test(q.q); assert.ok(tren);
      const Bnc = cuc === "Nam" ? 1 : -1, Bcu = -Bnc; return Bcu < 0 ? "cùng chiều kim đồng hồ" : "ngược chiều kim đồng hồ"; } },
    { has: "Máy phát điện xoay chiều tạo ra dòng điện dựa trên hiện tượng nào", right: () => BAI_HOC.mayPhat },
    { has: "i = 2√2cos(120πt)", right: (q) => { const [w] = so(q.q, "cos(#πt)"); return vn(w / 2) + " Hz"; } },
    { has: "hạ điện áp hiệu dụng của lưới điện từ 220 V xuống 11 V", right: (q) => { const [U1, U2] = so(q.q, "từ # V xuống # V"), [N1] = so(q.q, "có # vòng"); return vn((N1 * U2) / U1) + " vòng"; } },
    { has: "Lò vi sóng làm nóng thức ăn", right: (q) => { const [f] = so(q.q, "tần số # GHz"), [c] = so(q.q, "tốc độ # m/s"); return vn(Math.round((c / (f * 1e9)) * 100)) + " cm"; } },
    { has: "Đồng vị của hạt nhân ¹²₆C là hạt nhân nào sau đây?", right: (q) => { const me = hatNhan("¹²₆C"); return motCai(q, (o) => { const h = hatNhan(o); return h.Z === me.Z && h.A !== me.A; }); } },
    { has: "Năng lượng liên kết của ¹⁶₈O là", right: (q) => { const h = hatNhan("¹⁶₈O"), [W] = so(q.q, "¹⁶₈O là # MeV"); return vnf(lamTron(W / h.A, 2), 2) + " MeV/nucleon"; } },
    { has: "Hạt nhân bền tạo thành sau mỗi lần phân rã", right: (q, d) => {
      const me = new RegExp("Mỗi hạt nhân (" + HN + ") phóng ra một hạt α", "u").exec(d)[1], X = phanUng(me + " → ⁴₂He + X");
      return motCai(q, (o) => { const h = hatNhan(o); return h.A === X.A && h.Z === X.Z; }); } },
    { has: "Sau 414 ngày, số hạt nhân", right: (q, d) => { const [t] = so(q.q, "Sau # ngày"), [T] = so(d, "là # ngày"), [N0] = so(d, "mẫu chứa # hạt nhân"); return sci(N0 / 2 ** (t / T), 1); } },
    { has: "Một ấm điện có công suất 2 000 W đang đun nước sôi", right: (q) => {
      const [P] = so(q.q, "công suất # W"), [ph, dm] = so(q.q, "đun tiếp # phút thì khối lượng nước trong ấm giảm # kg"), [L] = so(q.q, "100 °C là # J/kg"), A = P * ph * 60;
      const [a] = so(q.o[0], "điện năng # kJ"), [m3, Q3] = so(q.o[2], "làm # kg nước hoá hơi là # kJ"), [m4] = so(q.o[3], "giảm # kg");
      assert.ok(/nhiệt độ của nước trong ấm tăng dần/.test(q.o[1]));
      // nước đang sôi ở áp suất không đổi: nhiệt độ giữ nguyên
      return [gan(a * 1000, A), false, gan(m3, dm) && gan(Q3 * 1000, L * m3), Math.abs(A / L - m4) < 0.005]; } },
    { has: "vào cốc nước ở các nhiệt độ khác nhau và ghi thể tích khí", right: (q) => {
      const d = [...q.q.matchAll(new RegExp("(" + NUM + ") °C, (" + NUM + ") mL", "gu"))].map((m) => [val(m[1]) + 273, val(m[2])]); assert.equal(d.length, 4);
      const k = d[0][1] / d[0][0], hang = d.every(([T, V]) => gan(V / T, k)), [a] = so(q.o[0], "đều bằng # mL/K"), [c] = so(q.o[2], "là # mL"), [t4, V4] = so(q.o[3], "đến # °C thì thể tích của nó là # mL");
      assert.ok(/theo nhiệt độ Celsius là một đường thẳng mà đường kéo dài đi qua gốc toạ độ/.test(q.o[1]));
      // V tỉ lệ thuận với T (kelvin), nên theo nhiệt độ Celsius đường kéo dài cắt trục nhiệt độ ở −273 °C
      return [hang && gan(a, k), !hang, gan(k * 273, c), gan(k * (t4 + 273), V4)]; } },
    { has: "thay đổi theo thời gian t như đồ thị ở hình bên", right: (q) => {
      const g = docLuoi(q.svg, "đồ thị Φ–t"); assert.ok(g.x === "t (s)" && g.y === "Φ (mWb)"); const [N] = so(q.q, "cuộn dây kín (# vòng)");
      const e = (a, b) => (N * Math.abs(tai(g.net, b) - tai(g.net, a)) * 1e-3) / (b - a), doan = (o) => { const m = new RegExp("Từ (" + NUM + ")(?: s)? đến (" + NUM + ") s", "u").exec(o); return [val(m[1]), val(m[2])]; };
      const [a1, b1] = doan(q.o[0]), [ea] = so(q.o[0], "độ lớn # V"), [a2, b2] = doan(q.o[1]), [a3, b3] = doan(q.o[2]), [ec] = so(q.o[2], "độ lớn # V");
      const doc = (a, b) => tai(g.net, b) - tai(g.net, a), m4 = [...q.o[3].matchAll(new RegExp("từ (" + NUM + ")(?: s)? đến (" + NUM + ") s", "gu"))].map((m) => [val(m[1]), val(m[2])]);
      assert.ok(/dòng điện cảm ứng trong cuộn dây bằng 0/.test(q.o[1]) && /có cùng chiều/.test(q.o[3]) && m4.length === 2);
      return [gan(e(a1, b1), ea), Math.abs(doc(a2, b2)) < 1e-9, gan(e(a3, b3), ec), Math.sign(doc(...m4[0])) === Math.sign(doc(...m4[1]))]; } },
    { has: "Hạt nhân ⁴₂He được tạo thành từ các nucleon riêng lẻ", right: (q) => {
      const h = hatNhan("⁴₂He"), m = khoi(q.q, "hạt nhân ⁴₂He"), mp = khoiN(q.q, "proton"), mn = khoiN(q.q, "neutron"), [NA] = so(q.q, "Avogadro bằng # mol⁻¹");
      const dm = h.Z * mp + (h.A - h.Z) * mn - m, W = dm * MEV, [p_, n_] = so(q.o[0], "gồm # proton và # neutron"), [d2] = so(q.o[1], "là # amu"), [w3] = so(q.o[2], "khoảng # MeV/nucleon"), [e4] = so(q.o[3], "khoảng # MeV");
      return [p_ === h.Z && n_ === h.A - h.Z, gan(dm, d2, 1e-6), Math.abs(W / h.A - w3) < 0.05, khoang(e4, NA * W)]; } },
    { has: "Nhiệt độ tuyệt đối của khí trong bình lúc sau", right: (q, d) => so(d, "khí trong bình có nhiệt độ # °C")[0] + 273 },
    { has: "Áp suất của khí trong bình lúc sau là x · 10⁵ Pa", right: (q, d) => { const [t1, p1] = so(d, "khí lí tưởng ở # °C và áp suất # Pa"), [t2] = so(d, "khí trong bình có nhiệt độ # °C"); return (p1 * (t2 + 273)) / (t1 + 273) / 1e5; } },
    { has: "Lực từ tác dụng lên thanh MN có độ lớn", right: (q, d) => { const [L] = so(d, "cách nhau # cm"), [B] = so(d, "cảm ứng từ # T"), [I] = so(d, "dòng điện # A"); return B * I * (L / 100); } },
    { has: "Gia tốc của thanh MN khi trượt", right: (q, d) => {
      const [L] = so(d, "cách nhau # cm"), [B] = so(d, "cảm ứng từ # T"), [I] = so(d, "dòng điện # A"), [m] = so(d, "khối lượng # g"), [g] = so(d, "g = # m/s²"), [mu] = so(q.q, "ray là #.");
      return (B * I * (L / 100) - mu * (m / 1000) * g) / (m / 1000); } },
    { has: "Công suất toả nhiệt của lò phản ứng bằng bao nhiêu MW?", right: (q, d) => { const [P] = so(d, "công suất phát điện # MW"), [H] = so(d, "là #%"); return P / (H / 100); } },
    { has: "hạt nhân ²³⁵U bị phân hạch", right: (q, d) => {
      const [P] = so(d, "công suất phát điện # MW"), [H] = so(d, "là #%"), [E] = so(d, "trung bình # MeV"), [mev] = so(d, "1 MeV = # J");
      return ((P * 1e6) / (H / 100) / (E * mev)) / 1e19; } }
  ],
  "vatli12-tn-de3": [
    { has: "các giọt nước đọng trên lá cây chuyển dần thành băng", right: () => BAI_HOC.chuyenThe["lỏng→rắn"] },
    { has: "nội năng của vật phụ thuộc vào", right: () => BAI_HOC.noiNang },
    { has: "Đổ thêm nước sôi ở 100 °C vào", right: (q) => {
      const [t1] = so(q.q, "nước sôi ở # °C"), [m2, t2] = so(q.q, "vào # kg nước ở # °C"), [tc] = so(q.q, "nước ấm # °C"); return vnf((m2 * (tc - t2)) / (t1 - tc), 1) + " kg"; } },
    { has: "khi mở nắp một lọ nước hoa", right: () => BAI_HOC.gapKhuc },
    { has: "mật độ phân tử khí (số phân tử khí trong một đơn vị thể tích)", right: (q) => {
      assert.ok(/đẳng áp/.test(q.q) && /nhiệt độ tuyệt đối của nó tăng gấp đôi/.test(q.q)); const k = 1 / 2; // V tỉ lệ với T, số phân tử không đổi
      return { 0.5: "giảm một nửa", 2: "tăng gấp đôi", 1: "không thay đổi", 0.25: "giảm bốn lần" }[k]; } },
    { has: "áp suất tăng gấp đôi, thể tích giảm còn một phần tư", right: () => { const k = 2 * (1 / 4); return { 0.5: "giảm còn một nửa", 2: "tăng gấp đôi", 8: "tăng gấp tám lần", 0.125: "giảm còn một phần tám" }[k]; } },
    { has: "Khi động năng tịnh tiến trung bình của các phân tử khí lí tưởng trong một bình bằng", right: (q) => { const [k] = so(q.q, "k = # J/K"), [E] = so(q.q, "bằng # J"); return vn(Math.round((2 * E) / (3 * k) - 273)) + " °C"; } },
    { has: "Vật nào sau đây sinh ra từ trường ở xung quanh nó?", right: () => BAI_HOC.sinhTu },
    { has: "kim của một la bàn đặt nằm ngang", right: () => BAI_HOC.traiDat },
    { has: "Một dây dẫn thẳng dài 25 cm mang dòng điện 5,0 A", right: (q) => {
      const [L, I, B] = so(q.q, "dài # cm mang dòng điện # A nằm trong từ trường đều có cảm ứng từ # T"), [th] = so(q.q, "nghiêng #° so với"); return vnf(B * I * (L / 100) * Math.sin((th * Math.PI) / 180), 3) + " N"; } },
    { has: "Một cuộn dây kín có 50 vòng, diện tích mỗi vòng 100 cm²", right: (q) => {
      const [N, S] = so(q.q, "có # vòng, diện tích mỗi vòng # cm²"), [dt, B1, B2] = so(q.q, "Trong # s, người ta tăng đều độ lớn cảm ứng từ, từ # T lên # T"); return vnf((N * Math.abs(B2 - B1) * S * 1e-4) / dt, 1) + " V"; } },
    { has: "Mắc nối tiếp một ampe kế xoay chiều với bếp điện", right: () => BAI_HOC.ampeKe },
    { has: "có lắp phanh điện từ", right: () => BAI_HOC.phanh },
    { has: "Nhiệt kế điện tử đo thân nhiệt từ xa", right: () => BAI_HOC.hongNgoai },
    { has: "Hạt nhân ⁶⁴₂₉Cu có bán kính khoảng", right: (q) => { const [r0] = so(q.q, "R ≈ # · ∛A"), h = hatNhan("⁶⁴₂₉Cu"); return sci(r0 * Math.cbrt(h.A), 1) + " m"; } },
    { has: "Phản ứng hạt nhân nào sau đây là phản ứng phân hạch?", right: (q) => motCai(q, (o) => { assert.equal(o.match(PTHN)[0], o); return loaiPhanUng(o) === "phân hạch"; }) },
    { has: "Hạt nhân ⁷₃Li có năng lượng liên kết khoảng", right: (q) => {
      const h = hatNhan("⁷₃Li"), [m] = so(q.q, "⁷₃Li có khối lượng # amu"), [mp, mn] = so(q.q, "proton và neutron lần lượt là # amu và # amu"); return vnf((h.Z * mp + (h.A - h.Z) * mn - m) * MEV, 1) + " MeV"; } },
    { has: "KHÔNG phải là một ứng dụng của tia phóng xạ?", right: (q) => tra(q, BAI_HOC.ungDung, false) },
    { has: "Cho 0,50 kg nước đá ở −20 °C vào một cốc", right: (q) => {
      const g = docLuoi(q.svg, "đồ thị nhiệt độ – thời gian"); assert.ok(g.x === "τ (phút)" && g.y === "t (°C)");
      const [m] = so(q.q, "Cho # kg nước đá"), [cd] = so(q.q, "nước đá là # J/kg.K"), [cn] = so(q.q, "của nước là # J/kg.K"), P_ = g.net;
      assert.equal(P_.length, 4, "đồ thị gồm ba đoạn"); assert.ok(gan(P_[1][1], 0) && gan(P_[2][1], 0) && P_[0][1] < 0 && P_[3][1] > 0, "đoạn nằm ngang ở 0 °C");
      const Q1 = m * cd * (P_[1][1] - P_[0][1]), P = Q1 / ((P_[1][0] - P_[0][0]) * 60), lam = (P * (P_[2][0] - P_[1][0]) * 60) / m;
      // nhiệt độ tăng đều theo thời gian ở hai đoạn: nhiệt dung riêng đọc lại từ đồ thị khớp đề bài
      assert.ok(gan((P * (P_[3][0] - P_[2][0]) * 60) / (m * (P_[3][1] - P_[2][1])), cn, 1e-6), "đoạn nước nóng lên khớp nhiệt dung riêng của nước");
      const [t1, t2] = so(q.o[0], "Từ phút thứ # đến phút thứ #"), [Qd, Pd] = so(q.o[1], "nhận nhiệt lượng # kJ, nên mỗi giây bếp truyền cho chất trong cốc nhiệt lượng # J"), [ld] = so(q.o[2], "khoảng # J/kg");
      assert.ok(/tăng nhanh hơn lúc đầu/.test(q.o[3]));
      const toc = (i) => (P_[i + 1][1] - P_[i][1]) / (P_[i + 1][0] - P_[i][0]);
      return [t1 === P_[1][0] && t2 === P_[2][0], gan(Qd * 1000, Q1) && gan(Pd, P), gan(ld, lam, 1e-6), toc(2) > toc(0)]; } },
    { has: "Một quả bóng thám không chứa khí helium", right: (q) => {
      const [V1, p1, t1] = so(q.q, "có thể tích # m³, áp suất # Pa, nhiệt độ # °C"), [p2, t2] = so(q.q, "có áp suất # Pa và nhiệt độ # °C"), [Rk] = so(q.q, "R = # J/mol.K");
      const n = (p1 * V1) / (Rk * (t1 + 273)), V2 = V1 * (p1 / p2) * ((t2 + 273) / (t1 + 273)), [na] = so(q.o[0], "khoảng # mol"), [Vb] = so(q.o[1], "là # m³"), [Vc] = so(q.o[2], "là # m³");
      const [md, M] = so(q.o[3], "khoảng # kg (khối lượng mol của helium là # g/mol)");
      return [khoang(na, n, 0.01), gan(Vb, V2), gan(Vc, (V1 * p1) / p2), khoang(md * 1000, n * M)]; } },
    { has: "e = 220√2cos(100πt + π/6)", right: (q) => {
      const [U, w] = so(q.q, "e = #√2cos(#πt + π/6)"), E0 = U * Math.SQRT2, phi = Math.PI / 6, [Ea] = so(q.o[0], "là # V"), [Tb] = so(q.o[1], "chu kì # s"), [ec] = so(q.o[2], "giá trị #√2 V");
      assert.ok(/tần số và giá trị cực đại của suất điện động đều tăng gấp đôi/.test(q.o[3]));
      // E₀ = NBSω và f = ω/(2π) đều tỉ lệ với tốc độ quay
      return [gan(E0 / Math.SQRT2, Ea), gan((2 * Math.PI) / (w * Math.PI), Tb), gan(E0 * Math.cos(phi), ec * Math.SQRT2), true]; } },
    { has: "Một lò phản ứng hạt nhân dùng cho nghiên cứu", right: (q) => {
      const [P] = so(q.q, "công suất toả nhiệt # kW"), [E] = so(q.q, "giải phóng # MeV"), [mev] = so(q.q, "1 MeV = # J"), [NA] = so(q.q, "Avogadro bằng # mol⁻¹"), [M] = so(q.q, "²³⁵U là # g/mol");
      const e1 = E * mev, r = (P * 1e3) / e1, [a] = so(q.o[0], "năng lượng # J"), [b] = so(q.o[1], "khoảng # phân hạch"), [ngay, mc] = so(q.o[2], "trong # ngày, lò tiêu thụ khoảng # kg");
      assert.ok(/chủ yếu dưới dạng động năng của các mảnh hạt nhân/.test(q.o[3]));
      return [gan(a, e1), khoang(b, r, 0.05), khoang(mc * 1000, ((r * ngay * 86400) / NA) * M, 0.05), BAI_HOC.manh]; } },
    { has: "Áp suất của lượng khí sau khi nén là x · 10⁵ Pa", right: (q, d) => { const [V1, p1] = so(d, "chứa # L khí lí tưởng ở áp suất # Pa"), [V2] = so(d, "còn # L"); return (p1 * V1) / V2 / 1e5; } },
    { has: "lượng khí đã truyền ra ngoài một nhiệt lượng", right: (q, d) => {
      const [V1, p1] = so(d, "chứa # L khí lí tưởng ở áp suất # Pa"), [V2] = so(d, "còn # L"), [A] = so(d, "một công # J");
      // công nén đẳng nhiệt khí lí tưởng: A = p₁V₁ · ln(V₁/V₂); số liệu của đề khớp công thức này (sai lệch dưới 1 J)
      assert.ok(Math.abs(p1 * V1 * 1e-3 * Math.log(V1 / V2) - A) < 1, "công nén đẳng nhiệt khớp số liệu");
      const dU = 0, Q = dU - A; return -Q; } },
    { has: "Ở lần đo thứ nhất, máy bay cách ra-đa", right: (q, d) => { const [c] = so(d, "là # m/s"), [t] = so(d, "sau # μs"); return (c * t * 1e-6) / 2 / 1000; } },
    { has: "Tốc độ của máy bay bằng bao nhiêu m/s?", right: (q, d) => { const [c] = so(d, "là # m/s"), [t1] = so(d, "sau # μs"), [dt, t2] = so(q.q, "sau lần đo thứ nhất # s; xung sóng phản xạ trở về ra-đa sau # μs"); return ((c * (t1 - t2) * 1e-6) / 2) / dt; } },
    { has: "bằng 25% độ phóng xạ của mẫu gỗ tươi", right: (q, d) => { const [T] = so(d, "chu kì bán rã # năm"), [k] = so(q.q, "bằng #% độ phóng xạ"); return (T * Math.log2(100 / k)) / 1000; } },
    { has: "bằng 80% độ phóng xạ của mẫu gỗ tươi", right: (q, d) => { const [T] = so(d, "chu kì bán rã # năm"), [k] = so(q.q, "bằng #% độ phóng xạ"); return T * Math.log2(100 / k); } }
  ],
  "vatli12-tn-de4": [
    { has: "Nhiệt độ trong ngăn đá của một tủ lạnh là", right: (q) => vn(so(q.q, "tủ lạnh là # °C")[0] + 273) + " K" },
    { has: "Thả 50 g nước đá ở 0 °C vào 200 g nước", right: (q) => {
      const [md] = so(q.q, "Thả # g nước đá"), [mn, t0] = so(q.q, "vào # g nước ở # °C"), [lam] = so(q.q, "nước đá là # J/kg"), [c] = so(q.q, "nước là # J/kg.K");
      const toa = (mn / 1000) * c * t0, tan = (md / 1000) * lam; assert.ok(toa > tan, "nước đá tan hết");
      return vnf((toa - tan) / (((md + mn) / 1000) * c), 1) + " °C"; } },
    { has: "Khi nước bay hơi ở nhiệt độ thấp hơn", right: (q) => motCai(q, (o) => o.startsWith(BAI_HOC.hoaHoi)) },
    { has: "làm thể tích của nó giảm 20%", right: (q) => { const [k] = so(q.q, "giảm #%"); return vn((1 / (1 - k / 100) - 1) * 100) + "%"; } },
    { has: "Không khí trong một khinh khí cầu", right: (q) => { const [t1, t2] = so(q.q, "từ # °C lên # °C"); return Math.round(((t1 + 273) / (t2 + 273)) * 100) + "%"; } },
    { has: "Bình 1 chứa 4 g khí hydrogen, bình 2 chứa 32 g khí oxygen", right: (q) => {
      const [m1, m2] = so(q.q, "Bình 1 chứa # g khí hydrogen, bình 2 chứa # g khí oxygen"), [M1, M2] = so(q.q, "hydrogen là # g/mol, của oxygen là # g/mol"), r = m1 / M1 / (m2 / M2);
      return r === 1 ? "p₁ = p₂" : r > 1 ? "p₁ = " + vn(r) + "p₂" : "p₂ = " + vn(1 / r) + "p₁"; } },
    { has: "Một bình kín dung tích 2,0 L chứa 2,0 · 10²² phân tử", right: (q) => {
      const [V, N, t] = so(q.q, "dung tích # L chứa # phân tử khí lí tưởng ở # °C"), [k] = so(q.q, "k = # J/K"); return sci((N / (V * 1e-3)) * k * (t + 273), 2) + " Pa"; } },
    { has: "Một kim nam châm nhỏ đặt trên tấm bìa, ở phía Bắc của dây", right: (q) => {
      assert.ok(/dòng điện chạy từ dưới lên trên/.test(q.q)); const I = HUONG["lên trên"], r = HUONG[/ở phía (Đông|Tây|Nam|Bắc) của dây/.exec(q.q)[1]];
      return "hướng " + tenHuong(cross(I, r)); } },
    { has: "Đặt một đoạn dây dẫn thẳng dài 50 cm vuông góc", right: (q) => { const [L] = so(q.q, "dài # cm"), [I] = so(q.q, "cường độ # A chạy qua"), [F] = so(q.q, "lực từ # N"); return vnf(F / (I * (L / 100)), 3) + " T"; } },
    { has: "Thay bằng một vòng dây có bán kính gấp đôi", right: () => { const k = 2; return k * k + "e"; } },
    { has: "u = 100√2cos(100πt + π/2)", right: (q) => vn(so(q.q, "u = #√2cos(")[0]) + " V" },
    { has: "Khung dây của một máy phát điện xoay chiều gồm 100 vòng", right: (q) => {
      const [N, S] = so(q.q, "gồm # vòng, diện tích mỗi vòng # cm²"), [w, B] = so(q.q, "tốc độ góc # rad/s trong một từ trường đều # T"); return vn(N * B * S * 1e-4 * w) + " V"; } },
    { has: "Dòng điện Foucault là dòng điện cảm ứng sinh ra trong", right: () => BAI_HOC.foucault },
    { has: "Bức xạ điện từ có bước sóng 600 nm", right: (q) => { const [l] = so(q.q, "bước sóng # nm"); return BAI_HOC.vung.find(([, a, b]) => l >= a && l < b)[0]; } },
    { has: "Hạt nhân của một đồng vị sodium có 11 proton và 12 neutron", right: (q) => { const [Z, N] = so(q.q, "có # proton và # neutron"); return motCai(q, (o) => { const h = hatNhan(o); return h.k === "Na" && h.Z === Z && h.A === Z + N; }); } },
    { has: "Sau 90 năm, lượng ¹³⁷Cs còn lại", right: (q, d) => { const [t] = so(q.q, "Sau # năm"), [T] = so(d, "khoảng # năm"); return vn(100 / 2 ** (t / T)) + "%"; } },
    { has: "Một mẫu đất bị nhiễm ¹³⁷Cs có độ phóng xạ", right: (q, d) => { const [H0, H] = so(q.q, "độ phóng xạ # Bq. Sau bao lâu thì độ phóng xạ của mẫu do ¹³⁷Cs gây ra chỉ còn # Bq"), [T] = so(d, "khoảng # năm"); return vn(T * Math.log2(H0 / H)) + " năm"; } },
    { has: "nước vừa có vai trò", right: () => BAI_HOC.nuocLo },
    { has: "Một quả bóng cao su khối lượng 0,20 kg", right: (q) => {
      const [m] = so(q.q, "khối lượng # kg"), [h1] = so(q.q, "từ độ cao # m"), [h2] = so(q.q, "lên tới độ cao # m"), [g] = so(q.q, "g = # m/s²"), dW = m * g * (h1 - h2);
      const [a] = so(q.o[0], "giảm # J"), [k, c] = so(q.o[2], "Nếu #% phần cơ năng bị mất làm tăng nội năng của quả bóng thì nội năng của quả bóng tăng # J");
      assert.ok(/chủ yếu chuyển hoá thành nội năng của quả bóng và của sàn/.test(q.o[1]) && /do quả bóng nhận nhiệt lượng từ sàn/.test(q.o[3]));
      // quả bóng và sàn gần như cùng nhiệt độ: nội năng tăng do nhận công khi bị nén, biến dạng
      return [gan(a, dW), true, gan((k / 100) * dW, c), false]; } },
    { has: "Một bình kín dung tích 8,31 L chứa 0,20 mol khí lí tưởng", right: (q) => {
      const [V, n, t] = so(q.q, "dung tích # L chứa # mol khí lí tưởng ở # °C"), [Rk] = so(q.q, "R = # J/mol.K"), [k] = so(q.q, "k = # J/K"), [NA] = so(q.q, "Avogadro bằng # mol⁻¹"), T = t + 273;
      const [pa] = so(q.o[0], "là # Pa"), [Eb] = so(q.o[1], "khoảng # J"), [Nc] = so(q.o[2], "khoảng #."), [t4] = so(q.o[3], "khí đến # °C");
      return [gan(pa, (n * Rk * T) / (V * 1e-3)), khoang(Eb, 1.5 * k * T, 0.01), khoang(Nc, n * NA), gan((t4 + 273) / T, 2)]; } },
    { has: "dùng trong bộ nguồn của một chiếc đèn bàn", right: (q) => {
      const [N1, N2] = so(q.q, "có # vòng ở cuộn sơ cấp và # vòng ở cuộn thứ cấp"), [U1, f] = so(q.q, "lưới điện # V – # Hz"), [Ub] = so(q.o[1], "của nó là # V"), [fc] = so(q.o[2], "tần số # Hz"), [N2d, Ud] = so(q.o[3], "có # vòng thì điện áp hiệu dụng ở hai đầu cuộn này khi để hở là # V");
      assert.ok(/^Đây là máy tăng áp\.$/.test(q.o[0]));
      // máy biến áp không làm thay đổi tần số
      return [N2 > N1, gan((U1 * N2) / N1, Ub), gan(f, fc), gan((U1 * N2d) / N1, Ud)]; } },
    { has: "Một phòng thí nghiệm đếm số hạt nhân N chưa phân rã", right: (q) => {
      const g = docLuoi(q.svg, "đồ thị N–t"); assert.ok(g.x === "t (giờ)" && g.y === "N (10¹⁸)"); const N0 = tai(g.net, 0), T = luc(g.net, N0 / 2), [ln2] = so(q.q, "ln 2 ≈ #");
      // đường biểu diễn là đường giảm theo hàm mũ N = N₀ · 2^(−t/T) ở mọi điểm (toạ độ ghi đến 0,1); chu kì bán rã đọc được ở vạch lưới
      g.net.forEach(([t, N]) => assert.ok(Math.abs(N - N0 * 2 ** (-t / T)) < 0.02, "đường biểu diễn là đường giảm theo hàm mũ"));
      assert.ok(gan(T, Math.round(T), 1e-3) && gan(tai(g.net, 2 * T), N0 / 4, 1e-3), "chu kì bán rã đọc được ở vạch lưới");
      const lam = ln2 / (T * 3600), [Ta] = so(q.o[0], "Cứ sau # giờ"), [tb, Nb] = so(q.o[1], "Trong # giờ đầu, có # hạt nhân"), [lc] = so(q.o[2], "khoảng # s⁻¹"), [Hd] = so(q.o[3], "khoảng # Bq");
      return [gan(Ta, T, 1e-3), gan((N0 - tai(g.net, tb)) * 1e18, Nb, 1e-3), khoang(lc, lam, 0.01), khoang(Hd, lam * N0 * 1e18, 0.01)]; } },
    { has: "Nhiệt độ của bình sau khi nhận nhiệt lượng trên", right: (q, d) => { const [m, t1] = so(d, "khối lượng # kg, bên trong chứa không khí ở # °C"), [Q] = so(d, "nhiệt lượng # kJ"), [c] = so(d, "thép là # J/kg.K"); return t1 + (Q * 1000) / (m * c); } },
    { has: "Không khí trong bình lúc này có áp suất", right: (q, d) => {
      const [m, t1] = so(d, "khối lượng # kg, bên trong chứa không khí ở # °C"), [p1] = so(d, "áp suất # Pa"), [Q] = so(d, "nhiệt lượng # kJ"), [c] = so(d, "thép là # J/kg.K"), t2 = t1 + (Q * 1000) / (m * c);
      return (p1 * (t2 + 273)) / (t1 + 273) / 1e5; } },
    { has: "Độ lớn suất điện động cảm ứng trong khung khi đang kéo khung ra", right: (q, d) => { const [a, N] = so(d, "cạnh # cm gồm # vòng"), [B] = so(d, "cảm ứng từ # T"), [dt] = so(d, "trong thời gian # s"); return (N * B * (a / 100) ** 2) / dt; } },
    { has: "Nhiệt lượng toả ra trong khung trong thời gian kéo khung", right: (q, d) => {
      const [a, N] = so(d, "cạnh # cm gồm # vòng"), [R_] = so(d, "điện trở # Ω"), [B] = so(d, "cảm ứng từ # T"), [dt] = so(d, "trong thời gian # s"), e = (N * B * (a / 100) ** 2) / dt;
      return (e / R_) ** 2 * R_ * dt * 1000; } },
    { has: "Năng lượng toả ra của mỗi phản ứng bằng bao nhiêu MeV", right: (q, d) => {
      const pt = d.match(PTHN); assert.equal(pt.length, 1); phanUng(pt[0]); assert.equal(pt[0], "¹₁H + ⁷₃Li → 2⁴₂He");
      return (khoi(d, "¹₁H") + khoi(d, "⁷₃Li") - 2 * khoi(d, "⁴₂He")) * MEV; } },
    { has: "Động năng của mỗi hạt ⁴₂He bằng bao nhiêu MeV", right: (q, d) => {
      const [K] = so(d, "động năng # MeV"), E = (khoi(d, "¹₁H") + khoi(d, "⁷₃Li") - 2 * khoi(d, "⁴₂He")) * MEV; return (K + E) / 2; } }
  ],
  // ---------- Phiên N12-tn-vatli-b: Đề 5–8 ----------
  "vatli12-tn-de5": [
    { has: "bề mặt Sao Hoả có thể xuống tới khoảng", right: (q) => vn(so(q.q, "khoảng # K")[0] - 273) + " °C" },
    { has: "Một thỏi đồng khối lượng", right: (q) => { const [m] = so(q.q, "khối lượng # kg"), [dt] = so(q.q, "nóng thêm # °C"), [c] = so(q.q, "của đồng là # J/kg.K"); return vn(m * c * dt) + " J"; } },
    { has: "kg mồ hôi bay hơi khỏi da", right: (q) => { const [L] = so(q.q, "nước khoảng # J/kg"), [m] = so(q.q, "có # kg mồ hôi"); return vn((L * m) / 1000) + " kJ"; } },
    { has: "giữa hai lần va chạm kế tiếp nhau, một phân tử khí bất kì", right: () => BAI_HOC.thangDeu },
    { has: "Bịt kín đầu kim của một ống tiêm", right: (q) => {
      const [V1] = so(q.q, "chứa # mL"), [V2] = so(q.q, "tăng lên # mL"), k = V2 / V1; // pV không đổi: p tỉ lệ nghịch với V
      return (k > 1 ? "giảm " : "tăng ") + vn(k > 1 ? k : 1 / k) + " lần"; } },
    { has: "Một quả bóng bay chứa", right: (q) => { const [V1, t1] = so(q.q, "chứa # L không khí ở # °C"), [t2] = so(q.q, "có nhiệt độ # °C"); return vnf((V1 * (t2 + 273)) / (t1 + 273), 2) + " L"; } },
    { has: "hỗn hợp khí hydrogen và khí oxygen ở cùng một nhiệt độ", right: (q) => { const [k] = so(q.q, "gấp # lần khối lượng"); return "lớn gấp " + vn(Math.sqrt(k)) + " lần"; } },
    { has: "lại gần cực Bắc của thanh nam châm được treo", right: (q) => { const c = /Đưa cực (Nam|Bắc) của một thanh nam châm khác lại gần cực (Nam|Bắc)/.exec(q.q); return c[1] === c[2] ? BAI_HOC.cungTen : BAI_HOC.khacTen; } },
    { has: "Trong một loa điện động", right: (q) => {
      const [N] = so(q.q, "gồm # vòng"), [L] = so(q.q, "mỗi vòng dài # cm"), [B] = so(q.q, "có độ lớn # T"), [I] = so(q.q, "cường độ # A"); return vnf(N * B * I * (L / 100), 2) + " N"; } },
    { has: "cảm ứng từ của từ trường Trái Đất gần như vuông góc với mặt đất", right: (q) => {
      assert.ok(/hướng vào trong lòng đất/.test(q.q)); const B = HUONG["xuống dưới"], I = HUONG[/dẫn dòng điện hướng về phía (Đông|Tây|Nam|Bắc)/.exec(q.q)[1]];
      return { Đông: "nằm ngang, về phía Đông", Tây: "nằm ngang, về phía Tây", Nam: "nằm ngang, về phía Nam", Bắc: "nằm ngang, về phía Bắc", "lên trên": "thẳng đứng lên trên", "xuống dưới": "thẳng đứng xuống dưới" }[tenHuong(cross(I, B))]; } },
    { has: "Trong hệ SI, từ thông có đơn vị là", right: () => BAI_HOC.wb },
    { has: "e = 12cos(80πt)", right: (q) => { const [w] = so(q.q, "cos(#πt)"); return vn(1 / w) + " s"; } }, // T = 2π/ω = 2/w, nửa chu kì 1/w
    { has: "Ở một xưởng thực hành, cuộn sơ cấp gồm", right: (q) => { const [N1, U1] = so(q.q, "gồm # vòng của một máy biến áp lí tưởng được nối với nguồn điện xoay chiều có điện áp hiệu dụng # V"), [U2] = so(q.q, "để hở là # V"); return vn((N1 * U2) / U1) + " vòng"; } },
    { has: "Một vệ tinh của hệ thống định vị GPS", right: (q) => { const [h] = so(q.q, "cách mặt đất khoảng # km"), [c] = so(q.q, "với tốc độ # m/s"), t = (h * 1000) / c; return motCai(q, (o) => khoang(val(o.replace(" s", "")), t)); } },
    { has: "Hai hạt nhân ³₁H và ³₂He có cùng", right: (q) => {
      const [a, b] = [...q.q.matchAll(new RegExp(HN, "gu"))].map((m) => hatNhan(m[0])), f = { "số nucleon": (h) => h.A, "số proton": (h) => h.Z, "số neutron": (h) => h.A - h.Z, "điện tích": (h) => h.Z };
      return motCai(q, (o) => f[o](a) === f[o](b)); } },
    { has: "hấp thụ một neutron rồi vỡ thành hạt nhân ¹⁴⁴₅₆Ba", right: (q) => {
      const pt = q.q.match(PTHN); assert.equal(pt.length, 1); const X = phanUng(pt[0]); return motCai(q, (o) => { const h = hatNhan(o); return h.A === X.A && h.Z === X.Z; }); } },
    { has: "Độ phóng xạ được đo bằng đơn vị nào sau đây?", right: () => BAI_HOC.bq },
    { has: "chiếu tia phóng xạ với liều thích hợp vào hạt giống", right: () => BAI_HOC.dotBien },
    { has: "Để xác định nhiệt dung riêng của một kim loại", right: (q) => {
      const [mk] = so(q.q, "khối lượng # kg trong nồi"), [ts] = so(q.q, "đang sôi (# °C)"), [mn, t1] = so(q.q, "vào # kg nước ở # °C"), [t] = so(q.q, "Nước nóng dần lên tới # °C"), [cn] = so(q.q, "của nước là # J/kg.K");
      const Q = mn * cn * (t - t1), c = Q / (mk * (ts - t)), [Qa] = so(q.o[0], "nhiệt lượng # kJ"), [cb] = so(q.o[1], "là # J/kg.K"), [cd] = so(q.o[3], "nhỏ hơn # J/kg.K");
      assert.ok(/khối kim loại vẫn nóng hơn nước/.test(q.o[2]) && gan(cd, cb));
      // cân bằng nhiệt: cùng nhiệt độ; tính cả phần bình thu vào thì kim loại toả nhiều hơn Q, nhiệt dung riêng tính được lớn hơn
      return [gan(Qa * 1000, Q), gan(cb, c), false, false]; } },
    { has: "áp suất của khí trong lốp một chiếc xe máy", right: (q) => {
      const [t1, p1] = so(q.q, "lúc nhiệt độ là # °C, áp suất của khí trong lốp một chiếc xe máy là # Pa"), [t2] = so(q.q, "có nhiệt độ # °C"), r = (t2 + 273) / (t1 + 273);
      const [ka] = so(q.o[0], "khoảng # lần"), [pb] = so(q.o[1], "khoảng # Pa"), [kd] = so(q.o[3], "khoảng #%");
      assert.ok(/Số phân tử khí trong mỗi xentimét khối của lốp lúc trưa bằng lúc sáng/.test(q.o[2]));
      // thể tích, số phân tử không đổi: mật độ phân tử không đổi; động năng tịnh tiến trung bình tỉ lệ thuận với T
      return [khoang(ka, r), khoang(pb, p1 * r), true, khoang(kd, (r - 1) * 100)]; } },
    { has: "Hai thanh ray dẫn điện nằm ngang, song song", right: (q) => {
      const [L] = so(q.q, "cách nhau # m"), [R_] = so(q.q, "điện trở # Ω"), [B] = so(q.q, "có độ lớn # T"), [v] = so(q.q, "tốc độ # m/s");
      const [dt, dS] = so(q.o[0], "Trong mỗi # s, diện tích của mạch kín tăng thêm # m²"), [eb] = so(q.o[1], "độ lớn # V"), [ic] = so(q.o[2], "cường độ # A");
      assert.ok(/cùng chiều với chiều chuyển động của thanh/.test(q.o[3]));
      // |e| = BΔS/Δt = BLv; định luật Lenz: lực từ cản trở chuyển động của thanh
      return [gan(dS, L * v * dt, 1e-6), gan(eb, B * L * v, 1e-6), gan(ic, (B * L * v) / R_, 1e-6), false]; } },
    { has: "phân rã qua một chuỗi gồm nhiều lần phóng xạ α và phóng xạ β⁻", right: (q) => {
      const [me, con] = [...q.q.matchAll(new RegExp(HN, "gu"))].map((m) => hatNhan(m[0])), na = (me.A - con.A) / 4, nb = 2 * na - (me.Z - con.Z);
      assert.ok(Number.isInteger(na) && nb >= 0, "chuỗi phân rã hợp lí");
      const [kb] = so(q.o[1], "có # lần phóng xạ α"), [kc] = so(q.o[2], "có # lần phóng xạ β⁻"), [kd] = so(q.o[3], "Th # neutron");
      assert.ok(/Mỗi lần phóng xạ β⁻, số khối của hạt nhân giảm đi 1/.test(q.o[0]));
      return [PHONG_XA["β⁻"][0] === -1, kb === na, kc === nb, kd === me.A - me.Z - (con.A - con.Z)]; } },
    { has: "Khối lượng không khí trong phòng bằng bao nhiêu kilôgam", right: (q, d) => {
      const [a, b, c] = so(d, "dài # m, rộng # m, cao # m"), [t, p] = so(d, "nhiệt độ # °C, áp suất # Pa"), [M] = so(d, "khối lượng mol # g/mol"), [Rk] = so(d, "R = # J/mol.K");
      return (p * a * b * c * (M / 1000)) / (Rk * (t + 273)); } },
    { has: "Bật máy sưởi để nhiệt độ của không khí trong phòng tăng", right: (q, d) => {
      const [a, b, c] = so(d, "dài # m, rộng # m, cao # m"), [t, p] = so(d, "nhiệt độ # °C, áp suất # Pa"), [M] = so(d, "khối lượng mol # g/mol"), [Rk] = so(d, "R = # J/mol.K");
      const [t1, t2] = so(q.q, "tăng từ # °C lên # °C"), [ck] = so(q.q, "không khí là # J/kg.K"), [H] = so(q.q, "chỉ #%"), m = (p * a * b * c * (M / 1000)) / (Rk * (t + 273));
      assert.equal(t1, t); return (m * ck * (t2 - t1)) / (H / 100) / 1e6; } },
    { has: "Cảm ứng từ ở chỗ đặt cuộn dây trước khi ngắt dòng điện", right: (q, d) => {
      const [N, S] = so(d, "gồm # vòng, diện tích mỗi vòng # cm²"), [dt, e] = so(d, "trong # s và trong thời gian đó vôn kế chỉ # V"); return (e * dt) / (N * S * 1e-4); } },
    { has: "dòng điện cảm ứng qua điện kế có cường độ", right: (q, d) => { const [e] = so(d, "vôn kế chỉ # V"), [R_] = so(q.q, "là # Ω"); return e / R_; } },
    { has: "Sau 30 năm, công suất toả nhiệt của pin bằng bao nhiêu phần trăm", right: (q, d) => { const [T] = so(d, "là # năm"), [t] = so(q.q, "Sau # năm"); return 100 * 2 ** (-t / T); } },
    { has: "Công suất toả nhiệt lúc đầu của 1,0 kg", right: (q, d) => {
      const [T] = so(d, "là # năm"), [E] = so(d, "năng lượng # MeV"), [ngay] = so(d, "1 năm = # ngày"), [ln2] = so(d, "ln 2 ≈ #"), [NA] = so(d, "bằng # mol⁻¹"), [mev] = so(d, "1 MeV = # J"), [M] = so(d, "là # g/mol"), [m] = so(q.q, "của # kg");
      return (ln2 / (T * ngay * 86400)) * ((m * 1000) / M) * NA * E * mev; } }
  ],
  "vatli12-tn-de6": [
    { has: "Trong lòng Mặt Trời, nhiệt độ lên tới hàng triệu kenvin", right: () => BAI_HOC.plasma },
    { has: "các cánh khuấy quay trong một thùng nước", right: (q) => { const [A] = so(q.q, "một công # kJ"), [Q] = so(q.q, "nhiệt lượng # kJ"), dU = A - Q; return (dU > 0 ? "tăng " : "giảm ") + vnf(Math.abs(dU), 1) + " kJ"; } },
    { has: "kg nhôm vụn đã được nung tới nhiệt độ nóng chảy", right: (q) => { const [m] = so(q.q, "cơ sở tái chế, # kg"), [lam] = so(q.q, "của nhôm là # J/kg"); return sci(lam * m, 1) + " J"; } },
    { has: "nhiệt độ của một khối khí càng cao thì các phân tử của nó", right: () => BAI_HOC.nhanhHon },
    { has: "Nén chậm một lượng khí xác định ở nhiệt độ không đổi để áp suất", right: (q) => {
      const [p1, p2] = so(q.q, "tăng từ # Pa lên # Pa"); return "tăng " + vn(p2 / p1) + " lần"; } }, // pV không đổi: V giảm, ρ = m/V tăng cùng tỉ lệ với p
    { has: "Kéo dài đường thẳng này về phía nhiệt độ thấp", right: () => vn(-273) + " °C" }, // V tỉ lệ thuận với T = t + 273
    { has: "Trong động cơ diesel, không khí trong xi lanh", right: (q) => {
      const [V1, p1, t1] = so(q.q, "từ thể tích # L (lúc này khí có áp suất # Pa và nhiệt độ # °C)"), [V2] = so(q.q, "xuống thể tích # L"), [p2] = so(q.q, "áp suất của nó là # Pa");
      return vn(Math.round(((t1 + 273) * p2 * V2) / (p1 * V1) - 273)) + " °C"; } },
    { has: "Đặc điểm nào sau đây là đặc điểm của các đường sức từ?", right: () => BAI_HOC.khepKin },
    { has: "Trong mô hình súng điện từ", right: (q) => { const [L, I] = so(q.q, "dài # cm mang dòng điện # A"), [B] = so(q.q, "cảm ứng từ # T"); return vn(B * I * (L / 100)) + " N"; } },
    { has: "Một khung dây phẳng hình chữ nhật kích thước", right: (q) => {
      const [a, b] = so(q.q, "kích thước # cm × # cm"), [B] = so(q.q, "cảm ứng từ # T"), [al] = so(q.q, "cảm ứng từ bằng #°"); return sci(B * (a / 100) * (b / 100) * Math.cos((al * Math.PI) / 180), 1) + " Wb"; } },
    { has: "Hai lần di chuyển một thanh nam châm từ xa tới sát một cuộn dây kín", right: (q) => {
      assert.ok(/lần thứ hai mất thời gian bằng một nửa lần thứ nhất/.test(q.q)); const k = 2; // cùng ΔΦ, |e| tỉ lệ nghịch với Δt
      return { 2: "lớn gấp đôi", 0.5: "nhỏ bằng một nửa", 1: "bằng nhau", 4: "lớn gấp bốn lần" }[k]; } },
    { has: "Mạng điện xoay chiều trong một gia đình có điện áp hiệu dụng", right: (q) => { const [U] = so(q.q, "hiệu dụng # V"); return motCai(q, (o) => khoang(val(o.replace(" V", "")), U * Math.SQRT2, 0.005)); } },
    { has: "Bộ phận phát vi sóng của một lò vi sóng", right: (q) => { const [U2] = so(q.q, "khoảng # V"), [U1] = so(q.q, "mạng điện # V"); return vn(U2 / U1); } },
    { has: "Đèn diệt khuẩn trong một tủ sấy bát đĩa", right: (q) => { const [f] = so(q.q, "tần số khoảng # Hz"), [c] = so(q.q, "bằng # m/s"), l = (c / f) * 1e9; return motCai(q, (o) => khoang(val(o.replace(" nm", "")), l)); } },
    { has: "số neutron nhiều hơn số proton là", right: (q) => { const h = hatNhan(new RegExp("hạt nhân (" + HN + ")", "u").exec(q.q)[1]); return String(h.A - 2 * h.Z); } },
    { has: "Cho năng lượng liên kết của bốn hạt nhân", right: (q) => {
      const W = Object.fromEntries([...q.q.matchAll(new RegExp("(" + HN + ") là (" + NUM + ") MeV", "gu"))].map((m) => [m[1], val(m[2]) / hatNhan(m[1]).A]));
      assert.equal(Object.keys(W).length, 4); q.o.forEach((o) => assert.ok(o in W, "lựa chọn " + o)); const max = Math.max(...Object.values(W)); return motCai(q, (o) => W[o] === max); } },
    { has: "Hạt nhân X tạo thành sau mỗi phân rã của", right: (q, d) => {
      const me = hatNhan(new RegExp("Hạt nhân (" + HN + ") phân rã β⁻", "u").exec(d)[1]), [dA, dZ] = PHONG_XA["β⁻"];
      return motCai(q, (o) => { const h = hatNhan(o); return h.A === me.A + dA && h.Z === me.Z + dZ; }); } },
    { has: "Sau 58 năm, tỉ số giữa số hạt nhân", right: (q, d) => {
      const [t] = so(q.q, "Sau # năm"), [T] = so(d, "là # năm"), con = 2 ** (-t / T), r = (1 - con) / con;
      return motCai(q, (o) => gan(o.includes("/") ? +o.split("/")[0] / +o.split("/")[1] : +o, r, 1e-9)); } },
    { has: "Cho 0,15 kg nước đá ở 0 °C vào một cốc cách nhiệt", right: (q) => {
      const [mi] = so(q.q, "Cho # kg nước đá"), [mj, tj] = so(q.q, "đựng # kg nước chanh ở # °C"), [c] = so(q.q, "như nước, # J/kg.K"), [lam] = so(q.q, "nước đá là # J/kg");
      const Qt = mi * lam, Qc = mj * c * tj, t = (Qc - Qt) / ((mi + mj) * c);
      const [qa] = so(q.o[0], "nước đá là # kJ"), [tb, qb] = so(q.o[1], "nguội tới # °C thì nó toả ra nhiệt lượng # kJ"), [td] = so(q.o[3], "khoảng # °C");
      assert.ok(/vẫn còn một phần nước đá chưa tan/.test(q.o[2]) && tb === 0 && /lớn hơn nhiệt lượng cần để làm tan hết/.test(q.o[1]));
      // nước chanh nguội tới 0 °C toả ra nhiều hơn nhiệt lượng làm tan hết nước đá: nước đá tan hết, nhiệt độ cuối trên 0 °C
      return [gan(qa * 1000, Qt), gan(qb * 1000, Qc) && Qc > Qt, Qc < Qt, khoang(td, t)]; } },
    { has: "Một bóng đèn sợi đốt chứa khí argon", right: (q) => {
      const [M, t1] = so(q.q, "khối lượng mol # g/mol) ở # °C"), [t2] = so(q.q, "nóng lên tới # °C"), [k] = so(q.q, "k = # J/K"), [NA] = so(q.q, "Avogadro bằng # mol⁻¹");
      const T1 = t1 + 273, T2 = t2 + 273, m = M / 1000 / NA, [Ea] = so(q.o[0], "khoảng # J"), [vb] = so(q.o[1], "khoảng # m/s"), [kc] = so(q.o[2], "gấp # lần"), [kd] = so(q.o[3], "gấp # lần");
      // thể tích không đổi: p tỉ lệ thuận với T; tốc độ căn quân phương tỉ lệ với √T
      return [khoang(Ea, 1.5 * k * T1, 0.01), khoang(vb, Math.sqrt((3 * k * T1) / m)), gan(kc, T2 / T1, 1e-9), gan(kd, Math.sqrt(T2 / T1), 1e-3)]; } },
    { has: "Một khung dây dẫn hình chữ nhật ABCD gồm", right: (q) => {
      const [N] = so(q.q, "gồm # vòng"), [AB] = so(q.q, "AB = CD = # cm"), [B] = so(q.q, "cảm ứng từ # T"), [I] = so(q.q, "cường độ # A"), [Fb] = so(q.o[1], "độ lớn # N");
      assert.ok(/các cạnh AB, CD vuông góc với các đường sức từ, còn các cạnh BC, DA nằm dọc theo các đường sức từ/.test(q.q));
      assert.ok(/cạnh BC có độ lớn bằng lực từ/.test(q.o[0]) && /ngược chiều nhau/.test(q.o[2]) && /lớn gấp bốn lần/.test(q.o[3]));
      // cạnh song song với đường sức từ: lực từ bằng 0; dòng điện ở AB, CD ngược chiều nên hai lực ngược chiều; F tỉ lệ thuận với I
      return [false, gan(Fb, N * B * I * (AB / 100), 1e-9), true, false]; } },
    { has: "Năm 1919, Rutherford bắn hạt α vào hạt nhân", right: (q) => {
      const pt = q.q.match(PTHN); assert.equal(pt.length, 1); const X = phanUng(pt[0]);
      const truoc = khoi(q.q, "⁴₂He") + khoi(q.q, "¹⁴₇N"), sau = khoi(q.q, "¹⁷₈O") + khoi(q.q, "¹₁H"), E = (truoc - sau) * MEV, [Ec] = so(q.o[2], "khoảng # MeV");
      assert.ok(/^Hạt X là proton\.$/.test(q.o[0]) && /thu năng lượng/.test(q.o[2]) && /không nhỏ hơn năng lượng mà phản ứng thu vào/.test(q.o[3]));
      // tổng khối lượng tăng: phản ứng thu năng lượng, lấy từ động năng của hạt α
      return [X.A === 1 && X.Z === 1, truoc > sau, E < 0 && khoang(Ec, -E), E < 0]; } },
    { has: "Công suất làm nóng không khí", right: (q, d) => { const [m, t1] = so(d, "hút vào # g không khí ở # °C"), [t2] = so(d, "thổi ra ở # °C"), [c] = so(d, "nhiệt dung riêng # J/kg.K"); return (m / 1000) * c * (t2 - t1); } },
    { has: "Thể tích không khí mà máy hút vào trong mỗi giây là", right: (q, d) => { const [t1] = so(d, "không khí ở # °C"), [t2] = so(d, "thổi ra ở # °C"), [V1] = so(q.q, "mỗi giây là # lít"); return (V1 * (t2 + 273)) / (t1 + 273); } },
    { has: "Trong quá trình máy hoạt động, suất điện động lớn nhất", right: (q, d) => {
      const [N, S] = so(d, "gồm # vòng, diện tích mỗi vòng # cm²"), [n] = so(d, "tốc độ # vòng/phút"), [B] = so(d, "cảm ứng từ # T"); return N * B * S * 1e-4 * 2 * Math.PI * (n / 60); } },
    { has: "Khi t = 0,025 s, suất điện động có độ lớn", right: (q, d) => {
      const [N, S] = so(d, "gồm # vòng, diện tích mỗi vòng # cm²"), [n] = so(d, "tốc độ # vòng/phút"), [B] = so(d, "cảm ứng từ # T"), [t] = so(q.q, "Khi t = # s"), w = 2 * Math.PI * (n / 60);
      assert.ok(/t = 0 lúc mặt phẳng khung vuông góc với các đường sức từ/.test(d)); // Φ = NBScos(ωt), e = NBSω · sin(ωt)
      return Math.abs(N * B * S * 1e-4 * w * Math.sin(w * t)); } },
    { has: "Sau 7,5 giờ, độ phóng xạ của toàn bộ lượng", right: (q, d) => { const [H0] = so(d, "độ phóng xạ # Bq"), [T] = so(d, "là # giờ"), [t] = so(q.q, "Sau # giờ"); return (H0 * 2 ** (-t / T)) / 1e4; } },
    { has: "Thể tích máu của người này bằng bao nhiêu lít", right: (q, d) => {
      const [H0] = so(d, "độ phóng xạ # Bq"), [T] = so(d, "là # giờ"), [t] = so(d, "Sau # giờ"), [Vm, a] = so(d, "lấy # cm³ máu của người đó và đo được độ phóng xạ # Bq");
      return (((H0 * 2 ** (-t / T)) / a) * Vm) / 1000; } }
  ],
  "vatli12-tn-de7": [
    { has: "Nước đựng trong chum, vại bằng đất nung", right: () => BAI_HOC.bayHoi },
    { has: "Nung nóng một lượng khí từ", right: (q) => { const [t1, t2] = so(q.q, "từ # °C lên # °C"); return "gấp " + vn((t2 + 273) / (t1 + 273)) + " lần"; } },
    { has: "hơi nước ở 100 °C phả vào da gây bỏng nặng hơn", right: () => BAI_HOC.bong },
    { has: "Chất khí dễ bị nén hơn nhiều so với chất lỏng", right: () => BAI_HOC.deNen },
    { has: "được nối thông với một bình khác dung tích", right: (q) => {
      const [V1, p1] = so(q.q, "chứa # L không khí ở áp suất # Pa"), [V2] = so(q.q, "dung tích # L đã được hút hết"); return sci((p1 * V1) / (V1 + V2), 1) + " Pa"; } }, // pV không đổi
    { has: "Khi nướng bánh mì, các bọt khí", right: (q) => {
      const [V1, t1] = so(q.q, "thể tích # cm³ ở # °C"), [t2] = so(q.q, "nóng lên tới # °C"); return vnf((V1 * (t2 + 273)) / (t1 + 273), 2) + " cm³"; } },
    { has: "nơi các máy bay chở khách thường bay", right: (q) => {
      const [p] = so(q.q, "áp suất khoảng # Pa"), [t] = so(q.q, "nhiệt độ khoảng # °C"), [k] = so(q.q, "k = # J/K"), mu = (p / (k * (t + 273))) * 1e-6; // p = μkT; 1 cm³ = 10⁻⁶ m³
      return motCai(q, (o) => khoang(val(o.replace(" phân tử", "")), mu)); } },
    { has: "Đặt một kim nam châm nhỏ, quay tự do được", right: () => BAI_HOC.chieuB },
    { has: "Nếu cường độ dòng điện giảm một nửa và chiều dài phần dây", right: (q) => {
      const [F] = so(q.q, "dây chịu lực từ # N"); assert.ok(/giảm một nửa và chiều dài phần dây nằm trong từ trường tăng gấp ba/.test(q.q));
      return vnf(F * (1 / 2) * 3, 2) + " N"; } }, // F = BIL tỉ lệ thuận với I và L
    { has: "Cảm ứng từ đổi chiều trong", right: (q) => {
      const [N, S] = so(q.q, "gồm # vòng, diện tích mỗi vòng # cm²"), [dt] = so(q.q, "đổi chiều trong # s"), [B1, B2] = so(q.q, "từ # T về 0 rồi tăng đều lên # T");
      return vnf((N * (B1 + B2) * S * 1e-4) / dt, 1) + " V"; } }, // từ trường đổi chiều: |ΔΦ| = (B₁ + B₂)S
    { has: "Nếu tốc độ quay của khung tăng lên gấp đôi", right: (q) => {
      assert.ok(/suất điện động do khung tạo ra có tần số và giá trị cực đại/.test(q.q)); return { 2: "cùng tăng gấp đôi" }[2]; } }, // f = ω/(2π), E₀ = NBSω đều tỉ lệ thuận với ω
    { has: "Quấn thêm 20 vòng dây vào cuộn thứ cấp", right: (q) => {
      const [U1] = so(q.q, "mạng điện # V"), [n] = so(q.q, "Quấn thêm # vòng"), [dU] = so(q.q, "tăng thêm # V"); return vn((U1 * n) / dU) + " vòng"; } }, // mỗi vòng ứng với U₁/N₁
    { has: "do một bộ phát Wi-Fi phát ra", right: (q) => { const [f] = so(q.q, "tần số # GHz"), [c] = so(q.q, "c = # m/s"); return vnf((c / (f * 1e9)) * 100, 1) + " cm"; } },
    { has: "dao động của điện trường và dao động của từ trường", right: () => BAI_HOC.dongPha },
    { has: "có điện tích bằng", right: (q) => {
      const [e] = so(q.q, "e = # C"), h = hatNhan(new RegExp("Hạt nhân (" + HN + ") có điện tích", "u").exec(q.q)[1]); return sci(h.Z * e, 2) + " C"; } },
    { has: "mô tả một phản ứng nhiệt hạch?", right: (q) => motCai(q, (o) => { assert.equal(o.match(PTHN)[0], o); return loaiPhanUng(o) === "tổng hợp"; }) }, // nhiệt hạch: tổng hợp hạt nhân
    { has: "Sau khi phóng xạ γ, so với lúc trước", right: () => BAI_HOC.gamma },
    { has: "nguồn phóng xạ β⁻ ở một bên băng giấy", right: () => BAI_HOC.doDay },
    { has: "đun cho băng phiến nóng chảy hết rồi để nguội", right: (q) => {
      const g = docLuoi(q.svg, "đồ thị nhiệt độ – thời gian"); assert.ok(g.x === "τ (phút)" && g.y === "t (°C)");
      // đoạn nằm ngang duy nhất: băng phiến đông đặc ở nhiệt độ không đổi; các đoạn khác nhiệt độ giảm
      const n = g.net, k = n.findIndex((p, i) => i > 0 && gan(p[1], n[i - 1][1], 1e-6)); assert.ok(k > 0 && n.slice(1).every((p, i) => i + 1 === k || p[1] < n[i][1]));
      const [t1, t2, T] = [n[k - 1][0], n[k][0], n[k][1]], [ta] = so(q.o[0], "đông đặc ở phút thứ #"), [Tb] = so(q.o[1], "là # °C"), [tc] = so(q.o[2], "Ở phút thứ #"), [td] = so(q.o[3], "Trong # phút đông đặc");
      assert.ok(/bắt đầu đông đặc/.test(q.o[0]) && /đã đông đặc hoàn toàn/.test(q.o[2]) && /vẫn toả nhiệt ra môi trường/.test(q.o[3]));
      // sau đoạn nằm ngang, chất đã đông đặc hết; trong khi đông đặc, chất vẫn toả nhiệt mà nhiệt độ không đổi
      return [gan(ta, t1), gan(Tb, T), tc > t2, gan(td, t2 - t1)]; } },
    { has: "Một thợ lặn mang bình khí nén dung tích", right: (q) => {
      const [V, pb] = so(q.q, "dung tích # L, khí trong bình có áp suất # Pa"), [h] = so(q.q, "độ sâu # m dưới"), [p0] = so(q.q, "khí quyển bằng # Pa"), [rho] = so(q.q, "của nước bằng # kg/m³"), [g] = so(q.q, "g = # m/s²");
      // khí ra khỏi bình cho tới khi áp suất trong bình bằng áp suất của nước: phần dùng được V(p_b − p)/p (định luật Boyle)
      const p = (sau) => p0 + rho * g * sau, dung = (V * (pb - p(h))) / p(h);
      const [pa] = so(q.o[0], "là # Pa"), [Vb] = so(q.o[1], "thể tích # L"), [Vc, tc] = so(q.o[2], "hít vào # L không khí (đo ở áp suất đó) thì bình khí đủ dùng trong khoảng # phút"), [h2] = so(q.o[3], "Ở độ sâu # m");
      assert.ok(/nhận được số phân tử khí bằng ở độ sâu/.test(q.o[3])); // cùng thể tích, cùng nhiệt độ: số phân tử tỉ lệ thuận với áp suất
      return [gan(pa, p(h)), gan(Vb, dung, 1e-6), khoang(tc, dung / Vc), gan(p(h2), p(h))]; } },
    { has: "Một thanh nam châm được thả rơi từ phía trên xuống", right: (q) => {
      assert.ok(/đang lại gần vòng dây, lực từ do dòng điện cảm ứng gây ra cho nam châm/.test(q.o[0]) && /đang rời xa vòng dây, lực từ đó/.test(q.o[1]) && /gia tốc bằng gia tốc rơi tự do/.test(q.o[2]) && /cắt hở vòng dây/.test(q.o[3]));
      // dòng điện cảm ứng chống lại sự biến thiên của từ thông: lại gần thì đẩy, rời xa thì hút; lực lên nam châm luôn hướng lên (ngược chiều rơi),
      // nên gia tốc nhỏ hơn g; vòng dây hở không có dòng điện cảm ứng
      const huong = "lên"; return [/chiều hướng lên\.$/.test(q.o[0]) === (huong === "lên"), /chiều hướng xuống\.$/.test(q.o[1]) === (huong === "xuống"), false, /không có dòng điện cảm ứng\.$/.test(q.o[3])]; } },
    { has: "Uranium tự nhiên gồm chủ yếu hai đồng vị", right: (q) => {
      const [k5] = so(q.q, "²³⁵₉₂U (chiếm khoảng #% khối lượng)"), U8 = hatNhan("²³⁸₉₂U"), U5 = hatNhan("²³⁵₉₂U"), N8 = U8.A - U8.Z, N5 = U5.A - U5.Z;
      const [db] = so(q.o[1], "nhiều hơn hạt nhân ²³⁵₉₂U # neutron"), [mt, mc] = so(q.o[2], "Trong # kg uranium tự nhiên có khoảng # g"), [rd] = so(q.o[3], "khoảng #%");
      assert.ok(/có cùng số neutron/.test(q.o[0]) && /bán kính của hạt nhân tỉ lệ với ∛A/.test(q.q));
      return [N8 === N5, N8 - N5 === db, gan(mc, (mt * 1000 * k5) / 100, 1e-6), khoang(rd / 100, Math.cbrt(U8.A / U5.A) - 1)]; } },
    { has: "Hiệu suất của bộ phận đun", right: (q, d) => {
      const [P] = so(d, "công suất # W"), [m, t1] = so(d, "biến # g nước ở # °C"), [t2] = so(d, "thành hơi nước ở # °C"), [c] = so(d, "nhiệt dung riêng của nước là # J/kg.K"), [L] = so(d, "ở 100 °C là # J/kg");
      assert.equal(t2, 100); return (((m / 1000) * (c * (t2 - t1) + L)) / (P * 60)) * 100; } }, // Q = mcΔt + Lm trong 1 phút
    { has: "Thể tích hơi nước mà cây là tạo ra", right: (q, d) => {
      const [m] = so(d, "biến # g nước"), [t] = so(d, "thành hơi nước ở # °C"), [p] = so(d, "áp suất # Pa"), [M] = so(d, "khối lượng mol của nước là # g/mol"), [R] = so(d, "R = # J/mol.K");
      return (((m / M) * R * (t + 273)) / p) * 1000; } }, // pV = nRT
    { has: "thì hai lò xo trở về độ dài tự nhiên", right: (q, d) => { const [L, m] = so(d, "dài # cm, khối lượng # g"), [B] = so(d, "cảm ứng từ # T"), [g] = so(d, "g = # m/s²"); return ((m / 1000) * g) / (B * (L / 100)); } }, // BIL = mg
    { has: "mỗi lò xo dãn bao nhiêu xentimét", right: (q, d) => {
      const [m] = so(d, "khối lượng # g"), [k] = so(d, "độ cứng # N/m"), [g] = so(d, "g = # m/s²"); return ((2 * (m / 1000) * g) / (2 * k)) * 100; } }, // lực từ (bằng mg) hướng xuống: 2kΔl = 2mg
    { has: "ngày kể từ lúc lấy mẫu, độ phóng xạ", right: (q, d) => { const [T] = so(d, "chu kì bán rã # ngày"), [H0] = so(d, "của mẫu khí là # Bq"), [t] = so(q.q, "Sau # ngày"); return H0 * 2 ** (-t / T); } },
    { has: "Lúc lấy mẫu, trong bình có x · 10⁸ hạt nhân", right: (q, d) => {
      const [T] = so(d, "chu kì bán rã # ngày"), [H0] = so(d, "của mẫu khí là # Bq"), [ln2] = so(q.q, "ln 2 ≈ #"); return H0 / (ln2 / (T * 86400)) / 1e8; } } // H = λN
  ],
  "vatli12-tn-de8": [
    { has: "chất nào sau đây nóng chảy ở một nhiệt độ xác định?", right: (q) => tra(q, BAI_HOC.ketTinh, true) },
    { has: "Một nồi nhôm khối lượng", right: (q) => {
      const [m1, m2, t1] = so(q.q, "khối lượng # kg chứa # kg nước ở # °C"), [c1] = so(q.q, "của nhôm # J/kg.K"), [c2] = so(q.q, "của nước # J/kg.K"), [t2] = so(q.q, "tới # °C");
      return vn(((m1 * c1 + m2 * c2) * (t2 - t1)) / 1000) + " kJ"; } },
    { has: "Nhiệt nóng chảy riêng của chì là", right: (q) => {
      const [L] = so(q.q, "của chì là # J/kg"); return "1 kg chì ở nhiệt độ nóng chảy cần nhận " + sci(L, 1) + " J để nóng chảy hoàn toàn"; } }, // định nghĩa, Q = λm
    { has: "Bình A chứa khí helium ở", right: (q) => { const [tA] = so(q.q, "helium ở # °C"), [tB] = so(q.q, "argon ở # °C"); return vn((tB + 273) / (tA + 273)); } }, // Ēđ = (3/2)kT, không phụ thuộc khối lượng phân tử
    { has: "Một chai nhựa rỗng đã vặn chặt nắp", right: (q) => { const [V1, p1] = so(q.q, "chứa # mL không khí, áp suất # Pa"), [V2] = so(q.q, "còn # mL"); return sci((p1 * V1) / V2, 2) + " Pa"; } },
    { has: "cứ mỗi khi nhiệt độ của khí tăng thêm", right: (q) => {
      const [V0] = so(q.q, "chiếm thể tích # cm³"), [dt] = so(q.q, "tăng thêm # °C"); assert.ok(/Ở 0 °C, một lượng khí/.test(q.q)); return vnf((V0 * dt) / 273, 1) + " cm³"; } }, // V = V₀(273 + t)/273
    { has: "Không khí nén trong bình chứa của một máy nén khí", right: (q) => {
      const [t1, p1, r1] = so(q.q, "Ở # °C và áp suất # Pa, không khí có khối lượng riêng # kg/m³"), [t2, p2] = so(q.q, "có nhiệt độ # °C và áp suất # Pa");
      return vnf((r1 * (p2 / p1) * (t1 + 273)) / (t2 + 273), 2) + " kg/m³"; } }, // pV/T không đổi, V = m/ρ
    { has: "từ trường mạnh nhất ở vùng", right: () => BAI_HOC.cucManh },
    { has: "Đoạn dây chịu lực từ", right: (q) => {
      const [L, I] = so(q.q, "dài # cm mang dòng điện # A"), [al] = so(q.q, "một góc #° so với vectơ"), [F] = so(q.q, "chịu lực từ # N"); return vnf(F / (I * (L / 100) * Math.sin((al * Math.PI) / 180)), 2) + " T"; } },
    { has: "Khung dây ABCD hình chữ nhật có AB =", right: (q) => {
      const [a, b] = so(q.q, "AB = # cm, BC = # cm"), [B] = so(q.q, "cảm ứng từ # T"); assert.ok(/mặt phẳng khung vuông góc với các đường sức từ/.test(q.q)); return sci(B * a * b * 1e-4, 1) + " Wb"; } }, // Φ = BScos 0
    { has: "Bếp toả nhiệt với công suất trung bình bằng", right: (q) => { const [I0] = so(q.q, "cường độ cực đại # A"), [R] = so(q.q, "điện trở # Ω"); return vn((I0 ** 2 / 2) * R) + " W"; } }, // I = I₀/√2, P = I²R
    { has: "Tần số của dòng điện xoay chiều mà máy phát ra", right: (q) => { const [n] = so(q.q, "tốc độ # vòng/phút"); return vnf(n / 60, 1) + " Hz"; } }, // mỗi vòng quay một chu kì
    { has: "Một vôn kế xoay chiều mắc vào cuộn", right: (q) => {
      const [N1, N2] = so(q.q, "hai cuộn dây # vòng và # vòng"), [n1] = so(q.q, "Cuộn # vòng được cắm vào mạng điện"), [U1] = so(q.q, "mạng điện # V"); assert.equal(n1, N1);
      return vnf((U1 * N2) / N1, 1) + " V"; } }, // U₂/U₁ = N₂/N₁
    { has: "Tia X dùng trong chụp X-quang", right: (q) => { const [l] = so(q.q, "bước sóng khoảng # m"), [c] = so(q.q, "truyền với tốc độ # m/s"); return sci(c / l, 1) + " Hz"; } },
    { has: "có số neutron bằng số proton?", right: (q) => motCai(q, (o) => { const h = hatNhan(o); return h.A - h.Z === h.Z; }) },
    { has: "Để tách một hạt nhân ¹²₆C thành các proton và neutron riêng lẻ", right: (q) => {
      const [m, mp, mn] = so(q.q, "¹²₆C có khối lượng # amu; mỗi proton có khối lượng # amu, mỗi neutron có khối lượng # amu"), h = hatNhan("¹²₆C");
      return vnf((h.Z * mp + (h.A - h.Z) * mn - m) * MEV, 1) + " MeV"; } }, // năng lượng liên kết: Δm · c²
    { has: "Chu kì bán rã của ¹⁹⁸Au là", right: (q) => { const [T] = so(q.q, "¹⁹⁸Au là # ngày"), [t] = so(q.q, "Sau # ngày"); return vnf((1 - 2 ** (-t / T)) * 100, 1) + "%"; } },
    { has: "Thanh nhiên liệu đã qua sử dụng của lò phản ứng", right: () => BAI_HOC.chatThai },
    { has: "tác nhân của một động cơ nhiệt nhận từ nguồn nóng", right: (q) => {
      const [Q1] = so(q.q, "nhận từ nguồn nóng nhiệt lượng # kJ"), [Q2] = so(q.q, "truyền cho nguồn lạnh nhiệt lượng # kJ"), [n] = so(q.q, "Mỗi giây động cơ thực hiện # chu trình"), A = Q1 - Q2; // sau một chu trình ΔU = 0
      const [Aa] = so(q.o[0], "công cơ học # kJ"), [Hc] = so(q.o[2], "là #%"), [Pd] = so(q.o[3], "là # kW");
      assert.ok(/nội năng của tác nhân trở về giá trị ban đầu/.test(q.o[1]));
      return [gan(Aa, A), true, gan(Hc, (A / Q1) * 100, 1e-6), gan(Pd, A * n, 1e-6)]; } },
    { has: "Một lượng khí được nung nóng đẳng áp. Trong hình bên", right: (q) => {
      const g = docLuoi(q.svg, "đồ thị V–T"); assert.ok(g.x === "T (K)" && g.y === "V (L)");
      const k = g.net[0][1] / g.net[0][0]; g.net.forEach((p) => assert.ok(gan(p[1], k * p[0], 1e-6), "đồ thị V–T là đường thẳng qua gốc toạ độ"));
      const [tb, Vb] = so(q.o[1], "Ở # °C, thể tích của khí là # L"), [td, Vd] = so(q.o[3], "Ở # °C, thể tích của khí là # L");
      assert.ok(/tỉ lệ thuận với nhiệt độ t tính theo thang Celsius/.test(q.o[0]) && /tăng gấp đôi thì thể tích của khí tăng gấp bốn/.test(q.o[2]));
      // V = kT: tỉ lệ thuận với nhiệt độ tuyệt đối (ở 0 °C, V = 273k khác 0); T tăng gấp đôi thì V tăng gấp đôi
      return [gan(k * 273, 0), gan(Vb, k * (tb + 273), 1e-6), gan((k * 2) / k, 4), gan(Vd, k * (td + 273), 1e-6)]; } },
    { has: "Một tàu thăm dò trên Sao Hoả gửi tín hiệu vô tuyến", right: (q) => {
      const [f] = so(q.q, "tần số # GHz"), [s] = so(q.q, "Trái Đất là # m"), [c] = so(q.q, "chân không với tốc độ # m/s"), [tb] = so(q.o[1], "mất # phút"), [lc] = so(q.o[2], "khoảng # cm");
      assert.ok(/không truyền được qua khoảng chân không/.test(q.o[0]) && /lệch pha nhau π\/2/.test(q.o[3])); // sóng điện từ truyền được trong chân không; E và B đồng pha
      return [false, gan(tb, s / c / 60, 1e-6), khoang(lc, (c / (f * 1e9)) * 100), false]; } },
    { has: "Trong một máy xạ trị, nguồn ⁶⁰₂₇Co phát tia γ", right: (q) => {
      const me = hatNhan(new RegExp("Hạt nhân (" + HN + ") phân rã β⁻", "u").exec(q.q)[1]), con = hatNhan(new RegExp("là (" + HN + ")\\.$", "u").exec(q.o[0])[1]), [dA, dZ] = PHONG_XA["β⁻"];
      const [T] = so(q.q, "chu kì bán rã khoảng # năm"), [tb, pb] = so(q.o[1], "Sau # năm, độ phóng xạ của nguồn còn #%"), [tc] = so(q.o[2], "sau # năm");
      assert.ok(/thời gian của mỗi lần chiếu phải tăng gấp đôi/.test(q.o[2]) && /tia γ đi xuyên qua được/.test(q.o[3]));
      // cùng liều: số tia γ phát ra trong thời gian chiếu như cũ, nên thời gian chiếu tỉ lệ nghịch với độ phóng xạ
      return [con.A === me.A + dA && con.Z === me.Z + dZ, gan(pb, 100 * 2 ** (-tb / T), 1e-6), gan(1 / 2 ** (-tc / T), 2, 1e-6), BAI_HOC.tiaGamma["Khả năng đâm xuyên mạnh"]]; } },
    { has: "Nhiệt độ 50 °C ghi trên vỏ bình ứng với bao nhiêu kelvin?", right: (q, d) => { const [t] = so(d, "nhiệt độ trên # °C"); return t + 273; } },
    { has: "Nếu bình bị nung nóng, đến nhiệt độ bao nhiêu độ C", right: (q, d) => {
      const [t1, p1] = so(d, "Ở # °C, khí trong bình có áp suất # Pa"), [p2] = so(d, "áp suất lớn nhất là # Pa"); return ((t1 + 273) * p2) / p1 - 273; } }, // thể tích không đổi: p/T không đổi
    { has: "có tần số là bao nhiêu héc", right: (q, d) => { const [r] = so(d, "bán kính # cm"), [v] = so(q.q, "tốc độ # km/h"); return v / 3.6 / (r / 100) / (2 * Math.PI); } }, // lăn không trượt: ω = v/r
    { has: "giá trị hiệu dụng của suất điện động do đinamô", right: (q, d) => {
      const [r] = so(d, "bán kính # cm"), [N] = so(d, "cuộn dây cố định gồm # vòng"), [phi] = so(d, "mỗi vòng dây là # Wb"), [v] = so(q.q, "tốc độ # km/h"), w = v / 3.6 / (r / 100);
      return (N * phi * w) / Math.SQRT2; } }, // E₀ = NΦ₀ω, E = E₀/√2
    { has: "khối lượng của Mặt Trời giảm x · 10⁹ kg", right: (q, d) => { const [P] = so(d, "công suất khoảng # W"), [c] = so(d, "c = # m/s"); return P / c ** 2 / 1e9; } }, // E = mc²
    { has: "Mặt Trời tạo ra x · 10³⁷ hạt nhân", right: (q, d) => { const [P] = so(d, "công suất khoảng # W"), [E] = so(d, "toả ra năng lượng # MeV"), [J] = so(d, "1 MeV = # J"); return P / (E * J) / 1e37; } }
  ]
};

/* ---------- đề và danh mục: số đề, số câu lấy từ danh mục ---------- */
const soDe = (id) => +/de(\d+)$/.exec(id)[1];
const DE = BANKS.filter((b) => /^vatli12-tn-de\d+$/.test(b.id)).sort((a, b) => soDe(a.id) - soDe(b.id));
assert.ok(DE.length >= 1, "chưa có đề Vật lí thi thử tốt nghiệp nào trong danh mục");
DE.forEach((b, i) => assert.equal(b.id, "vatli12-tn-de" + (i + 1), "mã đề phải liên tiếp từ vatli12-tn-de1"));
const TN = EVENTS.find((e) => e.id === "tn-thpt-2027");
const P1 = "Phần I. Trắc nghiệm nhiều lựa chọn", P2 = "Phần II. Trắc nghiệm đúng sai", P3 = "Phần III. Trả lời ngắn";
const KHUNG = [[P1, "mc", 18, 0.25], [P2, "tf4", 4, 1], [P3, "num", 6, 0.25]];
// chủ đề: đúng chữ chủ đề của ba kho Vật lí 12 (cuối kì I, giữa kì II, cuối năm); chương theo thứ tự bài của sách
const KHO = BANKS.filter((b) => b.file === "12-vatli.js" && b.pool), CD12 = new Set(KHO.flatMap((b) => Object.keys(b.pool.matrix)));
const CHUONG = [["Vật lí nhiệt", ["Cấu trúc của chất. Sự chuyển thể", "Nội năng. Định luật I của nhiệt động lực học", "Nhiệt độ. Thang nhiệt độ – nhiệt kế", "Nhiệt dung riêng", "Nhiệt nóng chảy riêng", "Nhiệt hoá hơi riêng"]],
  ["Khí lí tưởng", ["Mô hình động học phân tử chất khí", "Định luật Boyle", "Định luật Charles", "Phương trình trạng thái của khí lí tưởng", "Áp suất khí. Động năng phân tử và nhiệt độ"]],
  ["Từ trường", ["Từ trường", "Lực từ tác dụng lên dây dẫn mang dòng điện. Cảm ứng từ", "Từ thông. Hiện tượng cảm ứng điện từ", "Máy phát điện xoay chiều", "Ứng dụng hiện tượng cảm ứng điện từ", "Điện từ trường. Mô hình sóng điện từ"]],
  ["Vật lí hạt nhân", ["Cấu trúc hạt nhân", "Phản ứng hạt nhân và năng lượng liên kết", "Hiện tượng phóng xạ", "Công nghiệp hạt nhân"]]];
const chuong = (t) => CHUONG.findIndex(([, ts]) => ts.includes(t));
assert.deepEqual([...CD12].sort(), CHUONG.flatMap(([, ts]) => ts).sort(), "chủ đề của ba kho Vật lí 12 đúng bốn chương");
const soY = (q) => (q.type === "tf4" ? 4 : 1);
const dinhDang = (a) => (a < 0 ? "−" : "") + String(Math.abs(a)).replace(".", ",");
const dpOf = (b, q) => (q.p && b.passages && b.passages[q.p] ? b.passages[q.p].text : "");

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
      const want = c.right(q, dpOf(b, q));
      if (q.type === "num") {
        assert.equal(typeof q.ans, "number", "đáp án Phần III ghi bằng số");
        const lt = /\(làm tròn kết quả đến hàng (đơn vị|phần mười|phần trăm)\)/.exec(q.q);
        if (lt) {
          const k = { "đơn vị": 0, "phần mười": 1, "phần trăm": 2 }[lt[1]];
          assert.ok(q.tol === 10 ** -k / 2, "tol phải bằng nửa đơn vị làm tròn: " + q.tol);
          assert.ok(Math.abs(q.ans - lamTron(want, k)) < 1e-9, "đáp án " + q.ans + ", tính được " + want + " ≈ " + lamTron(want, k));
          assert.ok(q.x.includes("≈ " + vnf(lamTron(want, k), k)), "lời giải ghi “≈ " + vnf(lamTron(want, k), k) + "”");
        } else {
          assert.ok(gan(q.ans, want, 1e-9), "đáp án " + q.ans + ", tính được " + want);
          assert.ok(q.tol === undefined, "đáp án tính chính xác, không cần sai số");
        }
        assert.ok([...dinhDang(q.ans)].length <= 4, "đáp án Phần III quá 4 kí tự: " + dinhDang(q.ans));
        assert.ok(!q.unit || q.unit.length <= 5, "đơn vị ngắn");
      } else {
        const got = q.type === "tf4" ? q.a : q.o[0];
        assert.strictEqual(JSON.stringify(got), JSON.stringify(want), "đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
      }
      if (q.type === "mc") {
        assert.ok(new Set(q.o).size === 4 && q.o.length === 4, "bốn lựa chọn khác nhau");
        const L = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn lựa chọn sai");
      }
      if (q.type === "tf4") assert.ok(q.o.length === 4 && q.a.includes(true) && q.a.includes(false), "đúng/sai 4 ý có cả ý đúng và ý sai");
    } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
    n++;
  });
});
assert.deepEqual(Object.keys(RIENG).sort(), DE.map((b) => b.id).sort(), "RIENG có đúng các đề thi thử của danh mục");
assert.deepEqual(Object.entries(RIENG).flatMap(([id, ck]) => ck.filter((c) => !dung.has(c)).map((c) => id + ": " + c.has)), [], "có mục kiểm tra không khớp câu nào");
const hinh = DE.flatMap((b) => b.questions.filter((q) => q.svg));
assert.ok(hinh.length >= 2 && hinh.every((q) => daDoc.has(q.svg)), "hình nào cũng được đọc lại");

/* ---------- khung đề (Quyết định 764/QĐ-BGDĐT): danh mục, phần, điểm, mức độ, phạm vi, đoạn thông tin, lời dặn ---------- */
const KIEU = {};
DE.forEach((b) => {
  const at = b.id, qs = b.questions;
  assert.deepEqual([b.title, b.grade, b.subject, b.minutes, b.pts, b.file, !!b.pool], ["Vật lí 12 · Thi thử tốt nghiệp · Đề " + soDe(b.id), 12, "Vật lí", 50, 10, "12-vatli.js", false], at + ": danh mục");
  assert.ok(TN && TN.banks.includes(b.id) && TN.grades.includes(12) && TN.subjects.includes("Vật lí"), at + ": phải gắn vào tn-thpt-2027");
  let k = 0;
  KHUNG.forEach(([part, type, so_, pt]) => { const ph = qs.slice(k, k + so_); k += so_;
    assert.ok(ph.length === so_ && ph.every((q) => q.part === part && q.type === type && q.pt === pt), at + ": " + part + " gồm " + so_ + " câu " + type + ", mỗi câu " + pt + " điểm"); });
  assert.equal(k, qs.length, at + ": đề có đúng 28 câu theo khung 18 – 4 – 6");
  const G = Quiz.grade(qs, qs.map(() => null));
  assert.ok(G.max === 10 && G.got === 0, at + ": Quiz.grade: tối đa 10 điểm");
  assert.deepEqual(G.parts.map((p) => [p.part, p.max]), [[P1, 4.5], [P2, 4], [P3, 1.5]], at + ": điểm tối đa từng phần 4,5 – 4 – 1,5");
  const dem = (a, c, f) => qs.slice(a, c).filter(f).length;
  // mức độ như ma trận đề tham khảo năm 2025
  assert.deepEqual([1, 2, 3].map((l) => dem(0, 18, (q) => q.lv === l)), [11, 5, 2], at + ": Phần I 11 Biết, 5 Hiểu, 2 Vận dụng");
  assert.deepEqual(qs.slice(18, 22).map((q) => q.lv).sort(), [1, 2, 2, 3], at + ": Phần II bốn câu ghi mức 1, 2, 2, 3");
  assert.deepEqual([1, 2, 3].map((l) => dem(22, 28, (q) => q.lv === l)), [1, 3, 2], at + ": Phần III 1 Biết, 3 Hiểu, 2 Vận dụng");
  // phạm vi: chủ đề đúng chữ của ba kho; số ý mỗi chương; câu theo thứ tự chương trong mỗi phần
  qs.forEach((q, i) => assert.ok(CD12.has(q.topic), at + "#" + (i + 1) + ": chủ đề lạ “" + q.topic + "”"));
  const yCh = (a, c) => CHUONG.map((_, j) => qs.slice(a, c).filter((q) => chuong(q.topic) === j).reduce((s, q) => s + soY(q), 0));
  assert.deepEqual(yCh(0, 28), [8, 9, 13, 10], at + ": số ý Vật lí nhiệt, Khí lí tưởng, Từ trường, Vật lí hạt nhân");
  assert.deepEqual([yCh(0, 18), yCh(18, 22), yCh(22, 28)], [[3, 4, 7, 4], [4, 4, 4, 4], [1, 1, 2, 2]], at + ": số ý mỗi chương trong từng phần");
  // trong mỗi phần, câu (cặp câu dùng chung đoạn thông tin tính là một nhóm, xếp theo chương nhỏ nhất của nhóm) theo thứ tự chương
  [[0, 18], [18, 22], [22, 28]].forEach(([a, c]) => { const nhom = [];
    qs.slice(a, c).forEach((q, i, arr) => (i && q.p && q.p === arr[i - 1].p ? nhom[nhom.length - 1].push(q) : nhom.push([q])));
    const ch = nhom.map((g) => Math.min(...g.map((q) => chuong(q.topic)))); ch.forEach((v, i) => i && assert.ok(v >= ch[i - 1], at + ": câu theo thứ tự chương trong từng phần")); });
  // đoạn thông tin dùng chung: Phần III ba cặp câu liền nhau, mỗi cặp một đoạn; Phần I nhiều nhất một cặp; mỗi đoạn có đúng hai câu, liền nhau
  const ps = Object.keys(b.passages || {});
  ps.forEach((p) => { const idx = qs.map((q, i) => (q.p === p ? i : -1)).filter((i) => i >= 0); assert.ok(idx.length === 2 && idx[1] === idx[0] + 1, at + ": đoạn " + p + " dùng cho đúng hai câu liền nhau");
    assert.ok(b.passages[p].title && b.passages[p].text && !/câu \d/i.test(b.passages[p].title + b.passages[p].text), at + ": đoạn " + p + " có tên, có chữ, không ghi số câu (đề “Ôn chủ đề” rút câu với số khác)"); });
  const capI = dem(0, 18, (q) => q.p);
  assert.ok(qs.slice(22).every((q) => q.p) && qs.slice(18, 22).every((q) => !q.p) && (capI === 0 || capI === 2) && ps.length === 3 + capI / 2, at + ": Phần III ba cặp, Phần I nhiều nhất một cặp câu dùng chung đoạn thông tin");
  // lời dặn: số câu, số điểm, số ý mỗi chương tính từ dữ liệu
  const [y1, y2, y3, y4] = yCh(0, 28);
  ["Quyết định 764/QĐ-BGDĐT", "thí điểm thi trên máy tính", `trong ${sum([y1, y2, y3, y4])} ý của đề (mỗi câu Phần II tính 4 ý) có ${y1} ý Vật lí nhiệt, ${y2} ý Khí lí tưởng, ${y3} ý Từ trường, ${y4} ý Vật lí hạt nhân`,
    `Đề có ${qs.length} câu, làm trong ${b.minutes} phút`, "Phần I gồm 18 câu nhiều lựa chọn (4,5 điểm, mỗi câu 0,25 điểm)", "Phần II gồm 4 câu đúng/sai, mỗi câu 4 ý (4 điểm)",
    "Phần III gồm 6 câu trả lời ngắn (1,5 điểm, mỗi câu 0,25 điểm)", "không quá 4 kí tự", "Đề không có câu tự chấm", "đề tham khảo năm 2025 và đề chính thức năm 2026"]
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
  qs.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(q.x + " " + (q.o || []).join(" ")), at + ": nhắc vị trí của phương án: " + q.q.slice(0, 50)));
});
assert.ok(Object.values(KIEU).every((c) => c <= 3), "một kiểu Đ/S dùng quá ba lần trong các đề thi thử: " + JSON.stringify(KIEU));
// câu nhiều lựa chọn: đáp án đúng không là lựa chọn duy nhất có chữ của nhãn chủ đề; ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
{
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), loi = [];
  DE.forEach((b) => b.questions.forEach((q, i) => {
    if (q.type !== "mc") return;
    const at = b.id + "#" + (i + 1), c = chuThuong(q.topic), tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|lên)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); if (co[0] && !co.slice(1).some(Boolean)) loi.push(`${at}: chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    if (dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1) loi.push(at + ": ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”");
  }));
  assert.deepEqual(loi, [], "câu nhiều lựa chọn có gợi ý từ chữ của lựa chọn");
}

/* ---------- chữ ---------- */
const chu = (q) => [q.q, q.x].concat(q.o || [], q.unit || [], (q.rubric || []).map((c) => c.c)).map(String);
let soPTHN = 0;
{
  const loi = [], kt = (ok, m) => ok || loi.push(m);
  DE.forEach((b) => {
    const doan = Object.values(b.passages || {}).flatMap((p) => [p.title, p.text]);
    b.questions.map((q) => [b.id + ": " + q.q.slice(0, 50), chu(q)]).concat([[b.id + ": đoạn thông tin, lời dặn", doan.concat(b.note)]]).forEach(([at, ss]) => ss.forEach((s) => {
      // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân (năm viết liền)
      kt(!/(?<![,\d])\d{4,}/.test(s.replace(/[Nn]ăm (\d{4})/g, "năm").replace(/QĐ-BGDĐT/g, "")) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s.slice(0, 120));
      kt(!/(?:^|[^\p{L}])(?:[A-Z][a-z]?)+\d/u.test(s.replace(/\d+\/QĐ/g, "")), at + ": công thức cần chữ số dưới dòng: " + s.slice(0, 120));
      kt(!/(?<![\p{L}])(?:hóa|hòa|thủy|tỏa|hủy|tùy|khỏe|lũy)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s.slice(0, 120));
      kt(!/(?<![\p{L}])(?:nơtron|prôtôn|êlectron|urani|hêli|liti|natri|xesi|côban|pôlôni|ôxi|nitơ|hiđrô)(?![\p{L}])/iu.test(s), at + ": tên hạt, nguyên tố khác sách: " + s.slice(0, 120));
      kt(!/\d°C|\d ?oC\b/.test(s), at + ": đơn vị viết khác sách: " + s.slice(0, 120));
      (s.match(PTHN) || []).forEach((pt) => { phanUng(pt); soPTHN++; });
      kt(!/→|⇌/.test(s.replace(PTHN, "")), at + ": mũi tên ngoài phương trình phản ứng hạt nhân: " + s.slice(0, 120));
      (s.match(new RegExp("(?<![\\p{L}\\d)])" + HN, "gu")) || []).forEach((t) => hatNhan(t)); // không tính “I²Rt”, “10²²”
    }));
  });
  assert.deepEqual(loi, [], "chữ viết khác quy ước");
}
assert.ok(soPTHN > 0, "có phương trình phản ứng hạt nhân");

/* ---------- so với ba kho Vật lí 12 và giữa các đề thi thử: đề bài không trùng, không gần trùng; đáp án không trùng câu cùng chủ đề ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const khongDau = (s) => String(s).normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").replace(/[aeiouy]+/g, "a").trim();
const TU_CHUNG = [...CD12, ...CHUONG.map((c) => c[0]), "mỗi ý sau đúng hay sai", "làm tròn kết quả đến hàng phần trăm", "làm tròn kết quả đến hàng phần mười", "làm tròn kết quả đến hàng đơn vị",
  "vuông góc với các đường sức từ", "song song với các đường sức từ", "hợp với các đường sức từ một góc", "các đường sức của một từ trường đều", "từ trường đều có cảm ứng từ",
  "số avogadro bằng", "khối lượng mol của", "lấy ln 2", "có độ lớn bằng bao nhiêu", "suất điện động cảm ứng", "mỗi vòng có diện tích", "diện tích mỗi vòng",
  "năng lượng liên kết riêng", "chu kì bán rã", "mô hình động học phân tử", "phản ứng phân hạch dây chuyền", "tốc độ ánh sáng trong chân không", "đơn vị khối lượng nguyên tử", "định luật i của nhiệt động lực học",
  "nhiệt dung riêng của nước", "nhiệt nóng chảy riêng của nước đá", "nhiệt hoá hơi riêng của nước", "coi tốc độ của sóng điện từ trong không khí là", "mặt phẳng khung vuông góc với các đường sức từ",
  "động năng tịnh tiến trung bình của phân tử khí", "tốc độ căn quân phương", 
  "điện áp hiệu dụng giữa hai đầu cuộn thứ cấp", "cuộn sơ cấp", "cuộn thứ cấp", "máy biến áp lí tưởng", "dòng điện foucault",
  "đề thi thử theo cấu trúc đề thi tốt nghiệp thpt từ năm 2025", "năm 2027 thí điểm thi trên máy tính ở nơi đủ điều kiện, đề như thi giấy",
  // cách hỏi, cách cho số liệu chung của đề Vật lí (không phải nội dung riêng của một câu)
  "giá trị của x là bao nhiêu", "lực từ tác dụng lên", "vuông góc với các đường sức", "hiện tượng cảm ứng điện từ", "thiết bị nào sau đây hoạt động", "một ấm điện có công suất",
  "năng lượng toả ra của mỗi phản ứng", "nhiệt độ tuyệt đối của khí", "áp suất của khí trong bình", "nhiệt độ của nước trong cốc",
  "bỏ qua sự trao đổi nhiệt với", "đặt một kim nam châm nhỏ", "theo thang nhiệt độ kelvin", "một lượng khí xác định", "nào sau đây không phải là",
  "hình bên là đồ thị biểu diễn", "động năng tịnh tiến trung bình", "một đoạn dây dẫn thẳng dài",
  // cách phát biểu chuẩn của định luật Charles
  "tỉ lệ thuận với nhiệt độ tuyệt đối"]
  .map((p) => " " + khongDau(p) + " ").sort((a, b) => b.length - a.length);
const chuoi = (s, k) => { let t = " " + khongDau(s) + " "; TU_CHUNG.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  const w = t.split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const ten = new Map();
DE.forEach((b) => b.questions.forEach((q, i) => ten.set(q, b.id.replace("vatli12-", "") + "#" + (i + 1))));
const KHO_Q = BANKS.filter((b) => b.file === "12-vatli.js" && !b.pool && !/^vatli12-tn-/.test(b.id)).flatMap((b) => b.questions.map((q, i) => { ten.set(q, b.id.replace("vatli12-", "") + "#" + (i + 1)); return Object.assign(q, { _de: b.id }); }));
const TNQ = DE.flatMap((b) => b.questions.map((q) => Object.assign(q, { _de: b.id, _d: dpOf(b, q) })));
{
  const ds = BANKS.filter((b) => b.file === "12-vatli.js" && !b.pool).flatMap((b) => b.questions.map((q) => ({ q, k: gocChu(q.q) })));
  TNQ.forEach((q) => assert.deepEqual(ds.filter((e) => e.k === gocChu(q.q)).map((e) => ten.get(e.q)), [ten.get(q)], "đề bài trùng câu khác trong 12-vatli.js"));
  // cặp hai âm tiết liền nhau (như tests/vatli-hoahoc12-ck2.js): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của ba kho và số cặp chung
  // từ một nửa số cặp của câu ít cặp hơn thì báo; không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung và cặp có ở từ 3% số câu của
  // file. Giữa các đề thi thử (cùng cách hỏi của đề tốt nghiệp) chỉ so chuỗi 6 từ. “năng lượng toả ra” là cách hỏi chuẩn của câu tính năng
  // lượng phản ứng (Phiên N12-tn-vatli-b: thêm Đề 5–8 thì 3% số câu lớn hơn, cặp “toả ra” của câu đó ở Đề 1, Đề 4 bắt đầu bị tính).
  const CUM = ["mỗi ý sau đúng hay sai", "làm tròn kết quả đến hàng phần trăm", "làm tròn kết quả đến hàng phần mười", "làm tròn kết quả đến hàng đơn vị",
    "năng lượng toả ra"];
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
      if (!/^vatli12-tn-/.test(p._de) && chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`);
      const s = " " + khongDau(p.q) + " "; chuoi(q.q, 6).forEach((x) => { if (s.includes(" " + x + " ")) gan6.push(ten.get(q) + " ~ " + ten.get(p) + ": " + x); });
      if (p.topic !== q.topic) return;
      if (q.type === "mc" && p.type === "mc" && gocChu(q.o[0]) === gocChu(p.o[0])) trung.push(ten.get(q) + " ~ " + ten.get(p) + ": đáp án trùng câu cùng chủ đề");
      if (q.type === "num" && p.type === "num" && gan(q.ans, p.ans) && (q.unit || "") === (p.unit || "")) trung.push(ten.get(q) + " ~ " + ten.get(p) + ": đáp án số trùng câu cùng chủ đề");
    });
  });
  assert.deepEqual([...new Set(gan_)], [], "đề bài gần trùng (cặp hai âm tiết) câu khác");
  assert.deepEqual([...new Set(gan6)], [], "đề bài gần trùng (chuỗi 6 từ) câu khác");
  assert.deepEqual(trung, [], "đáp án trùng câu cùng chủ đề");
}

/* ---------- dò lộ đáp án (như tests/vatli-hoahoc12-ck2.js) ----------
   Đề cố định: mọi câu cùng hiện, mọi đoạn thông tin cùng hiện, lời dặn hiện ở màn mở đề; đề “Ôn chủ đề” rút chung câu cùng chủ đề của các đề
   thi thử và ba kho Vật lí 12 (kèm đoạn thông tin của câu). Đáp án là số (trả lời ngắn, lựa chọn đúng dạng “1,8 · 10¹⁴ J”; từ hai chữ số, hoặc
   số thập phân, hoặc có luỹ thừa của 10) tìm ở vị trí kết quả của câu kia (ngay sau “=”, “≈”, “là”, “bằng”, “được”; không tính số đứng trước
   một phép tính) cùng đơn vị: không được có. Đáp án bằng chữ tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ trở xuống thì lấy cả đáp án);
   chuỗi có trong đề bài, lựa chọn, lời giải, đoạn thông tin của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. */
const DON_VI = "(?:J\\/kg\\.K|J\\/kg|J\\/mol\\.K|MeV\\/nucleon|MeV|eV|rad\\/s|m\\/s²|m\\/s|MHz|GHz|Hz|mWb|Wb|MW|kW|W|MBq|Bq|ngày|năm|giờ|phút|kg\\/m³|g\\/mol|cm²|cm|m³|mL|mJ|μs|ms|mol|kg|kJ|kPa|Pa|vòng|lần|amu|°C|K|L|T|N|V|A|Ω|J|g|s|m|%)";
const soDV = new RegExp("^(" + NUM + ")(?: ?\\(?(" + DON_VI + ")\\)?)?$", "u");
const KQ = new RegExp("(?:=|≈|(?:^|[\\s(])(?:là|bằng|được))\\s+(" + NUM + ")(?![\\d,⁰¹²³⁴⁵⁶⁷⁸⁹π√])(?!\\s*[·+−:×/](?:\\s|\\d|\\())(?: ?\\(?(" + DON_VI + ")(?![\\p{L}]))?", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => ({ v: val(x[1]), u: x[2] || "" }));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["các đường sức", "đường sức từ", "với các đường", "song song với", "vuông góc với", "cảm ứng từ", "từ trường đều", "của dòng điện", "dòng điện chạy",
  "của kim nam", "kim nam châm", "các phân tử", "phân tử khí", "của các phân", "va chạm với", "với nhau nên", "chuyển động theo", "của cường độ", "cường độ dòng",
  "độ dòng điện", "dòng điện cảm", "điện cảm ứng", "trong từ trường", "từ trường biến", "trường biến thiên", "chuyển động trong", "động trong từ", "của nhiệt độ", "nhiệt độ và",
  "thể tích của", "dây dẫn đang", "đang có dòng", "có dòng điện", "điện chạy qua", "trong đĩa kim", "đĩa kim loại", "dòng điện foucault", "điện foucault sinh", "foucault sinh ra",
  "sinh ra trong", "từ tác dụng", "tác dụng lên", "lực từ tác", "và nhiệt độ", "một dây dẫn", "hiệu dụng của", "nhiệt độ của", "ra khỏi vùng", "từ cực nam",
  "từ cực bắc", "một thanh nam", "thanh nam châm", "trong lòng vòng", "lòng vòng dây", "của các hạt", "tăng nhiệt độ", "có từ trường", "điện foucault trong",
  "của phân tử", "vào thành bình", "đoạn dây dẫn", "mặt phẳng khung", "các cuộn dây", "ra dòng điện", "trong chân không", "cuộn thứ cấp", "tia phóng xạ",
  "nội năng của", "của một nguyên", "với đường sức", "đường sức từ", "sức từ đi", "từ đi qua", "đi qua điểm", "qua điểm đó", "suất điện động",
  "điện động cảm", "động cảm ứng", "của nam châm"]);
const chuP = (p) => (p.type === "note" ? [p.x] : chu(p).concat(p._d ? [p._d] : []));
const NOTES = DE.map((b) => { const o = { q: b.id + "-note", x: [b.note].concat(Object.values(b.passages || {}).map((p) => p.title + ". " + p.text)).join(" | "), topic: "note", type: "note", _de: b.id }; ten.set(o, b.id.replace("vatli12-", "") + "-note"); return o; });
const doLo = (qs, them, cap) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    let soDa = [], C = [];
    // câu hỏi “… x · 10ⁿ <đơn vị>. Giá trị của x là bao nhiêu”: so giá trị x · 10ⁿ cùng đơn vị đó
    const mu = q.type === "num" && new RegExp("x · 10(⁻?[⁰¹²³⁴⁵⁶⁷⁸⁹]+)(?: (" + DON_VI + ")(?![\\p{L}]))?", "u").exec(q.q);
    if (q.type === "num") soDa = mu ? [{ v: q.ans * 10 ** +[...mu[1]].map((c) => (c === "⁻" ? "-" : SUP.indexOf(c))).join(""), u: mu[2] || "" }] : [{ v: q.ans, u: q.unit || "" }];
    else if (q.type === "mc") { const x = soDV.exec(q.o[0]); if (x) soDa = [{ v: val(x[1]), u: x[2] || "" }]; else { const c3 = cum3(q.o[0]), sai = q.o.slice(1).map((o) => " " + tuCua(o).join(" ") + " ");
      // chuỗi có ở từ hai lựa chọn sai thì không chỉ ra được lựa chọn đúng
      C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)].filter((c) => sai.filter((o) => o.includes(" " + c + " ")).length < 2); } }
    soDa = soDa.filter((d) => Math.abs(d.v) >= 10 || !Number.isInteger(d.v));
    qs.concat(them).forEach((p) => {
      if (p === q || !cap(p, q)) return;
      const at = `${ten.get(p)} → ${ten.get(q)}: `, T = " " + chuP(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chuP(p).flatMap(kqSo).some((y) => gan(y.v, d.v) && (!y.u || !d.u || y.u === d.u))).forEach((d) => lo.push(at + vn(d.v) + " " + d.u));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
// trong một đề (mọi câu cùng hiện) và với lời dặn, đoạn thông tin của đề
const r1 = doLo(TNQ, NOTES, (p, q) => p._de === q._de);
// cùng chủ đề (đề “Ôn chủ đề”): câu của đề thi thử với câu cùng chủ đề của đề thi thử khác và của ba kho (trừ câu tự luận)
const onCD = TNQ.concat(KHO_Q.filter((q) => q.type !== "essay" && TNQ.some((t) => t.topic === q.topic)));
const r2 = doLo(onCD, [], (p, q) => p.topic === q.topic && p._de !== q._de && (/^vatli12-tn-/.test(p._de) || /^vatli12-tn-/.test(q._de)));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác (xem tay):\n" + [...r1.chuLo, ...r2.chuLo].join("\n"));
// Đã xem tay (Phiên N12-tn-vatli): tên gọi, thuật ngữ có ở chữ của câu khác nhưng không chỉ ra đáp án: câu Đ/S của kho nói về vòng dây
// đứng yên khi cảm ứng từ giảm (vẫn có dòng điện cảm ứng); “khối lượng nghỉ” là lựa chọn sai của câu khối lượng tới hạn, là đại lượng
// trong hệ thức Einstein, và câu tính năng lượng phản ứng nào cũng có tổng khối lượng giảm (điều sách dạy ngay trong bài); tia hồng ngoại,
// ánh sáng nhìn thấy chỉ được kể tên trong thang sóng điện từ, không kèm bước sóng hay ứng dụng; câu nước đóng băng nói thể rắn nhưng không nói
// cách sắp xếp phân tử; “cuộn thứ cấp” là tên bộ phận có ở mọi câu máy biến áp; ⁴₂He có trong các phương trình phản ứng khác.
const DA_XEM = [
  "gk2-de1#11 → tn-de1#10: vòng dây đứng", "gk2-de1#11 → tn-de1#10: dây đứng yên",
  "ck2-de2#13 → tn-de1#16: khối lượng nghỉ", "ck2-de2#16 → tn-de1#16: khối lượng nghỉ", "ck2-de2#16 → tn-de1#16: lượng nghỉ của", "ck2-de2#17 → tn-de1#16: tổng khối lượng",
  "ck2-de1#8 → tn-de3#14: tia hồng ngoại", "ck2-de2#8 → tn-de3#14: tia hồng ngoại", "ck2-de2#8 → tn-de4#14: ánh sáng nhìn", "ck2-de2#8 → tn-de4#14: sáng nhìn thấy",
  "tn-de3#1 → ck1-de1#1: thể rắn", "tn-de2#13 → ck2-de1#7: cuộn thứ cấp", "tn-de4#21 → ck2-de1#7: cuộn thứ cấp", "tn-de5#13 → ck2-de1#7: cuộn thứ cấp", "tn-de6#13 → ck2-de1#7: cuộn thứ cấp", "tn-de7#12 → ck2-de1#7: cuộn thứ cấp",
  "tn-de2#22 → ck2-de1#16: ⁴₂he", "tn-de3#16 → ck2-de1#16: ⁴₂he", "tn-de4#27 → ck2-de1#16: ⁴₂he", "tn-de4#28 → ck2-de1#16: ⁴₂he",
  "tn-de6#22 → ck2-de1#16: ⁴₂he", "tn-de7#16 → ck2-de1#16: ⁴₂he", "tn-de8#27 → ck2-de1#16: ⁴₂he",
  "tn-de8#28 → ck2-de1#16: ⁴₂he"
];
assert.deepEqual([...r1.chuLo, ...r2.chuLo], DA_XEM, "đáp án bằng chữ có ở câu khác đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual([...r1.lo, ...r2.lo], [], "lộ đáp án:\n" + [...r1.lo, ...r2.lo].join("\n"));

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (nếu có) ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const truongChu = (q) => (q.type === "note" ? [q.x] : chu(q));
// tra nhanh: các chuỗi k từ của chữ đề thi thử (Map chuỗi → các nhãn), đi một lượt qua chữ nguồn đã chuẩn hoá; trả về Map chuỗi → các mã nguồn có chuỗi đó
const chuoiDe = (k, them) => { const m = new Map(); TNQ.concat(NOTES).forEach((q) => new Set(truongChu(q).concat(them && q._d ? [q._d] : []).flatMap((x) => chuoi(x, k))).forEach((c) => { if (!m.has(c)) m.set(c, []); m.get(c).push(q); })); return m; };
const timChuoi = (nguon, k, ds) => {
  const dau = new Set([...ds.keys()].map((c) => c.split(" ").slice(0, 2).join(" "))), ra = new Map();
  nguon.forEach(({ id, t }) => { const w = t.split(" "); for (let i = 0; i + k <= w.length; i++) { if (!dau.has(w[i] + " " + w[i + 1])) continue; const c = w.slice(i, i + k).join(" ");
    if (ds.has(c)) { if (!ra.has(c)) ra.set(c, new Set()); ra.get(c).add(id); } } });
  return ra;
};
if (SACH.length) {
  assert.ok(SACH.some((f) => /vat-li-12/.test(f)), "OnUp-Book có Vật lí 12");
  // chủ đề đúng tên bài trong mục lục (README của cuốn)
  const readme = path.join(BOOK, "lop-12", "vat-li-12", "README.md");
  if (fs.existsSync(readme)) { const ml = [...fs.readFileSync(readme, "utf8").matchAll(/Bài (\d+)\. ([^|]+?) \|/g)].map((x) => x[2].trim());
    CHUONG.flatMap(([, ts]) => ts).forEach((t) => assert.ok(ml.includes(t) || t === "Áp suất khí. Động năng phân tử và nhiệt độ", "chủ đề đúng tên bài trong mục lục: " + t)); }
  const sach = SACH.map((f) => ({ id: f, t: khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")) }));
  const bao = (k) => { const ds = chuoiDe(k), gap = timChuoi(sach, k, ds); return [...gap.keys()].flatMap((c) => ds.get(c).map((q) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả ba kho Vật lí 12 và giữa các đề thi thử ---------- */
{
  const cua = (b, q) => ({ id: b.id, t: chu(q).concat(dpOf(b, q) ? [dpOf(b, q)] : []).map(khongDau).join(" | ") });
  const khac = BANKS.filter((b) => !b.pool).flatMap((b) => b.questions.map((q) => cua(b, q))).concat(BANKS.filter((b) => b.pool).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => { const ds = chuoiDe(k, true), gap = timChuoi(khac, k, ds);
    return [...gap.keys()].flatMap((c) => ds.get(c).flatMap((q) => [...gap.get(c)].filter((id) => id !== q._de).map((id) => `${ten.get(q)} ~ ${id}: ${c}`))); };
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}

/* ---------- tự thử các bộ đọc với giá trị biết trước và với hình, phản ứng, câu cố ý viết sai ---------- */
{
  const tim = (has) => TNQ.find((q) => q.q.includes(has));
  // đồ thị: số ở trục sai, vạch lưới lệch, tên trục sai, đường biểu diễn lệch khỏi hàm mũ
  const qNT = tim("Một phòng thí nghiệm đếm số hạt nhân N chưa phân rã"), nt = qNT.svg, rNT = RIENG["vatli12-tn-de4"].find((c) => qNT.q.includes(c.has)).right;
  assert.throws(() => docLuoi(nt.replace(">4<", ">5<"), "thử"), /tỉ lệ/);
  assert.throws(() => docLuoi(nt.replace(/(<line x1=")106(" y1="40" x2=")106(" y2="200")/, "$1108$2108$3"), "thử"), /lưới đều/);
  assert.throws(() => docLuoi(nt.replace(">t (giờ)<", ">t (giây)<"), "thử"), /tên hai trục/);
  const lech = nt.replace(/(<polyline points="(?:\S+ ){6})([\d.]+),([\d.]+)/, (s, a, x, y) => a + x + "," + (+y - 8));
  assert.throws(() => rNT(Object.assign({}, qNT, { svg: lech })), /hàm mũ/);
  const g = docLuoi(nt, "thử"); assert.ok(gan(tai(g.net, 0), 8) && gan(luc(g.net, 4), 2, 1e-3) && gan(tai(g.net, 4), 2, 1e-3));
  const qVT = tim("Hình bên cho biết thể tích của lượng khí thay đổi thế nào"), rVT = RIENG["vatli12-tn-de1"].find((c) => qVT.q.includes(c.has)).right;
  assert.equal(rVT(qVT), "1,32 L");
  assert.throws(() => rVT(Object.assign({}, qVT, { svg: qVT.svg.replace('x2="120" y2="170" stroke="acc"', 'x2="120" y2="160" stroke="acc"') })), /nét đứt/);
  assert.throws(() => rVT(Object.assign({}, qVT, { svg: qVT.svg.replace('points="120,170 ', 'points="120,165 ') })), /gốc toạ độ/);
  const qT = tim("Cho 0,50 kg nước đá ở −20 °C"), gT = docLuoi(qT.svg, "thử");
  assert.deepEqual(gT.net.map((p) => p.map((v) => Math.round(v * 1000) / 1000)), [[0, -20], [1, 0], [9, 0], [11, 20]]);
  assert.throws(() => docLuoi(qT.svg.replace(">−20<", ">−30<"), "thử"), /tỉ lệ/);
  // hạt nhân, phản ứng hạt nhân (cả hệ số), loại phản ứng
  assert.deepEqual(phanUng("²¹⁰₈₄Po → ⁴₂He + X"), { A: 206, Z: 82 }); assert.equal(phanUng("¹₁H + ⁷₃Li → 2⁴₂He"), null);
  assert.throws(() => phanUng("¹₀n + ²³⁵₉₂U → ⁹⁵₃₉Y + ¹³⁸₅₃I + 2¹₀n"), /bảo toàn/); assert.throws(() => hatNhan("⁶⁰₂₈Co"), /số proton/); assert.throws(() => hatNhan("²₀n"), /số khối/);
  assert.deepEqual(["¹₀n + ²³⁵₉₂U → ⁹⁵₃₉Y + ¹³⁸₅₃I + 3¹₀n", "²₁H + ³₁H → ⁴₂He + ¹₀n", "²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He", "⁴₂He + ¹⁴₇N → ¹⁷₈O + ¹₁H"].map(loaiPhanUng), ["phân hạch", "tổng hợp", "phóng xạ α", "khác"]);
  assert.deepEqual("Cho phản ứng ¹₁H + ⁷₃Li → 2⁴₂He. Cho".match(PTHN), ["¹₁H + ⁷₃Li → 2⁴₂He"]);
  assert.deepEqual(bienDoi("số khối ít hơn 4, số proton ít hơn 2"), [-4, -2]); assert.deepEqual(bienDoi("cùng số khối, số proton nhiều hơn 1"), [0, 1]);
  assert.equal(tenHuong(cross(HUONG["lên trên"], HUONG.Bắc)), "Tây"); assert.equal(tenHuong(cross(HUONG.Tây, HUONG.Bắc)), "xuống dưới");
  assert.ok(val("1 600") === 1600 && gan(val("4,0 · 10⁸"), 4e8) && gan(val("1,05 · 10⁻⁴"), 1.05e-4) && sci(4.8e-15, 1) === "4,8 · 10⁻¹⁵" && sci(41400, 2) === "4,14 · 10⁴");
  // bộ dò lộ bắt được câu cố ý viết sai: lời giải câu khác có “= 22,2 V”, “là 87 °C”; cụm chữ của đáp án bằng chữ
  const thu = (qs) => { const r = doLo(qs, [], () => true); return r.lo.concat(r.chuLo).map((s) => s.replace(/^.*: /, "")); };
  const gia = (q, x) => Object.assign({}, q, { x: q.x + " " + x });
  const khac = tim("Dòng điện xoay chiều trong mạng điện gia đình có tần số 50 Hz");
  ten.set(khac, "thử-khác");
  const q26 = tim("Suất điện động hiệu dụng của máy bằng bao nhiêu vôn"), q24 = tim("Nhiệt độ của lượng khí sau khi đun"), qVDH = tim("Chất nào sau đây là chất rắn vô định hình?");
  [q26, q24, qVDH].forEach((q) => ten.set(q, "thử"));
  const ghi = (q, x) => { const o = gia(q, x); ten.set(o, "thử-giả"); return o; };
  assert.deepEqual(thu([q26, ghi(khac, "Ví dụ E ≈ 17,8 V.")]), ["17,8 V"]);
  assert.deepEqual(thu([q26, ghi(khac, "Ví dụ E ≈ 17,8 A.")]), []);
  assert.deepEqual(thu([q26, ghi(khac, "Ví dụ ω = 17,8π rad/s, u = 17,8√2 V.")]), []);
  assert.deepEqual(thu([q24, ghi(khac, "Nhiệt độ cuối là 87 °C.")]), ["87 °C"]);
  assert.ok(thu([qVDH, ghi(khac, "Ví dụ thuỷ tinh không có nhiệt độ nóng chảy xác định.")]).length > 0);
}
DE.forEach((b) => console.log(`${b.id}: ${b.questions.length} câu (${b.questions.filter((q) => q.type === "mc").length} nhiều lựa chọn, ${b.questions.filter((q) => q.type === "tf4").length} đúng/sai 4 ý, ${b.questions.filter((q) => q.type === "num").length} trả lời ngắn), ` +
  `${Object.keys(b.passages || {}).length} đoạn thông tin, ${b.questions.filter((q) => q.svg).length} hình; đáp án đúng dài nhất hoặc ngắn nhất ở ${b._le}/18 câu nhiều lựa chọn.`));
console.log(n + " câu đã tính lại hoặc đọc lại hình (" + soPTHN + " phương trình phản ứng hạt nhân).");
console.log("MATH OK");
