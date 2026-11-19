// Kiểm tra các đề Công nghệ thi thử tốt nghiệp THPT, định hướng Công nghiệp (data/banks/12-congnghe.js, congnghe12-tn-de<N>; Phiên
// N12-tn-congnghe: Đề 1–3; phiên sau thêm đề thì mở rộng script này: thêm các mục kiểm tra của đề mới vào RIENG; đề định hướng Nông nghiệp
// (Công nghệ 12 – Lâm nghiệp – Thuỷ sản) là đề riêng, cần khung, chủ đề riêng).
// Đề tính điểm theo khung đề tốt nghiệp THPT từ năm 2025 (Quyết định 764/QĐ-BGDĐT), ma trận của đề tham khảo môn Công nghệ năm 2025 (chưa
// đối chiếu được đề chính thức năm 2026; docs/KE-HOACH-NOI-DUNG.md, mục 2 và mục 7). Số đề, số câu lấy từ danh mục.
// Khung: danh mục (tên, khối 12, môn Công nghệ, file, 50 phút, pts 10, gắn vào tn-thpt-2027); Phần I 24 câu nhiều lựa chọn pt 0,25, Phần II
// 4 câu đúng/sai 4 ý pt 1 (không có Phần III), Quiz.grade điểm tối đa 6 – 4. Phần I: câu 1–12 Biết, 13–20 Hiểu, 21–24 Vận dụng; 4 câu
// Công nghệ 10 (2 Biết, 1 Hiểu, 1 Vận dụng), 4 câu Công nghệ 11 (2, 1, 1), 8 câu phần Công nghệ điện của Công nghệ 12 (Bài 1–12; 4, 3, 1),
// 8 câu phần Công nghệ điện tử (Bài 13–25; 4, 3, 1); trong mỗi mức theo thứ tự lớp 10, lớp 11, phần điện, phần điện tử, rồi chương, bài.
// Phần II: câu 1, 2 phần Công nghệ điện, câu 3, 4 phần Công nghệ điện tử, mỗi phần theo thứ tự bài; bốn câu ghi mức 1, 2, 3, 3. Mỗi bài
// Công nghệ 12, mỗi chương lớp 10, 11 nhiều nhất hai câu một đề. Chủ đề: câu Công nghệ 12 đúng chữ chủ đề của ba kho Công nghệ 12 (tên bài
// của sách); câu lớp 10, 11 ghi “Lớp 10 · ”, “Lớp 11 · ” và tên chương của sách Công nghệ 10 – Thiết kế và công nghệ, Công nghệ 11 – Công
// nghệ cơ khí; đối chiếu mục lục trong README của các cuốn ở OnUp-Book. Đề 1–3 phủ đủ 3 chương lớp 10, 7 chương lớp 11 và mọi bài của ba
// kho Công nghệ 12. Lời dặn ghi định hướng Công nghiệp, đề của định hướng Nông nghiệp là đề khác, số câu, số điểm, số câu mỗi lớp, mỗi phần
// tính từ dữ liệu.
// Mỗi câu khớp đúng một mục kiểm tra của đề đó (theo chữ has trong đề bài): câu nhiều lựa chọn so với chữ khoá của đáp án (đúng một lựa chọn
// có chữ đó) hoặc tính lại bằng code theo công thức, bảng của sách: tỉ lệ bản vẽ (số kích thước là số đo thật), hình chiếu trục đo xiên góc
// cân (q = 0,5), tỉ số nén, thể tích công tác của động cơ nhiều xi lanh, cách nối tải ba pha (sao, tam giác), dòng điện dây, tổng trở một
// pha, cấp điện áp của lưới điện, chọn aptomat và dây dẫn theo hệ số an toàn và mật độ dòng điện (loại lớn hơn gần nhất trên thị trường), sai
// số của công tơ theo cấp chính xác, điện năng tiêu thụ, vạch màu của điện trở (bảng Hình 15.3), cảm kháng, mạch cộng đảo, cộng không đảo,
// trừ dùng khuếch đại thuật toán (công thức 19.5, 19.6, 19.7), hàm logic viết bằng chữ so với bảng chân lí, mạch logic trong hình
// đọc bằng bộ đọc của tests/tin-congnghe12-ck2.js (kí hiệu cổng như sách, dây nối, lối vào, lối ra), cổng logic theo yêu cầu, tần số ở lối
// ra của bộ đếm nhị phân, thời gian chạy câu lệnh theo xung nhịp; ý của câu đúng/sai 4 ý so với bảng ý → đúng/sai ghi trong script hoặc
// tính bằng code. Mọi hình được đọc lại.
// Rồi: chữ (số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân; dấu thanh kiểu sách “hoá”, “thuỷ”; không “huyện”, “63 tỉnh”); kiểu
// Đ/S không lặp trong một đề, mỗi kiểu nhiều nhất ba lần trong các đề thi thử; đáp án đúng không dài hơn hẳn lựa chọn sai và là lựa chọn dài
// nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn của đề, không là lựa chọn duy nhất có chữ của
// nhãn chủ đề, ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có; lời giải không nhắc vị trí của phương án. So với ba
// kho Công nghệ 12 và giữa các đề thi thử: đề bài không trùng câu nào trong file, không gần trùng (chuỗi 6 từ; cặp hai âm tiết chung với
// câu của ba kho), đáp án không trùng câu cùng chủ đề. Dò lộ đáp án giữa mọi câu của một đề (lời dặn cùng hiện) và giữa câu cùng chủ đề của
// các đề thi thử và ba kho (đề “Ôn chủ đề” rút chung), như tests/tin12-tn.js; chuỗi đã xem tay ghi ở DA_XEM. Có ../OnUp-Book thì so mọi
// trường chữ (cả lời dặn) với chữ OCR của mọi cuốn (không chuỗi 8 từ nào trùng; DO_SACH=1 in chuỗi 6 từ) và với câu của mọi kho khác, cả
// giữa các đề thi thử (không chuỗi 8 từ nào trùng; DO_KHO=1 in chuỗi 6 từ). Các bộ tính, bộ đọc hình, bộ dò lộ tự thử với câu cố ý viết sai.
// Chạy: node tests/congnghe12-tn.js → in MATH OK.
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

// chép từ tests/tin-congnghe12-ck2.js
/* ---------- số ----------
   Số trong đề: hàng nghìn ngăn bằng khoảng trắng, dấu phẩy thập phân. */
const NUM = "[−-]?\\d{1,3}(?: \\d{3})*(?:,\\d+)?";
const val = (s) => { const m = /^[−-]?\d{1,3}(?: \d{3})*(?:,\d+)?$/.exec(String(s).trim()); assert.ok(m, "không đọc được số “" + s + "”"); return +String(s).trim().replace(/ /g, "").replace("−", "-").replace(",", "."); };
const escRe = (s) => s.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&");
// mẫu chữ có # ở chỗ số: so(s, "Cho # Ω") → [số]
const R = (mau) => new RegExp(mau.split("#").map(escRe).join("(" + NUM + ")"), "u");
const so = (s, mau) => { const m = R(mau).exec(s); assert.ok(m, "không thấy “" + mau + "” trong: " + String(s).slice(0, 80)); return m.slice(1).map(val); };
const gan = (a, b, e = 1e-9) => a === b || Math.abs(a - b) <= e * Math.max(Math.abs(a), Math.abs(b));
// số viết kiểu Việt Nam: 7500 → "7 500", 0.15 → "0,15"
const vn = (x, d = 6) => { const r = Math.round(x * 10 ** d) / 10 ** d, [a, b] = String(Math.abs(r)).split("."); return (r < 0 ? "−" : "") + a.replace(/\B(?=(\d{3})+$)/g, " ") + (b ? "," + b : ""); };
const lam = (x, d) => Math.round(x * 10 ** d + 1e-9) / 10 ** d; // làm tròn d chữ số thập phân
const coX = (q, ...cum) => cum.forEach((c) => assert.ok(q.x.includes(c), "lời giải cần có “" + c + "”"));
const y = (o, re) => { const m = re.exec(o); assert.ok(m, "không đọc được ý “" + o + "”"); return m; };

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const giaiMa = (t) => t.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&amp;/g, "&");
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: giaiMa(m[2]) }));
const num = (a, k) => +a[k];
const svgRong = (svg) => +attrs(svg.slice(0, svg.indexOf(">") + 1)).viewBox.split(" ")[2];
const svgCao = (svg) => +attrs(svg.slice(0, svg.indexOf(">") + 1)).viewBox.split(" ")[3];
const daDoc = new Set(); // hình đã đọc lại bằng code
// ước bề rộng một dòng chữ (Noto Sans, đo trong trình duyệt; mỗi nhóm lấy bề rộng của kí tự rộng nhất nhóm, nên ước lượng không nhỏ hơn bề
// rộng thật): xếp nhóm theo chữ gốc (bỏ dấu): chữ rất hẹp; t, f, dấu cách; r, /, ", -, 1; chữ rộng; chữ hoa; dấu so sánh; a c e k s v x y z;
// chữ thường, chữ số còn lại
const rongChu = (t, c) => { const g = c.normalize("NFD")[0];
  return (/[il|.,:;'!]/.test(g) ? 0.3 : /[tf ]/.test(g) ? 0.35 : /[r/"\-1]/.test(g) ? 0.47 : /[mwMW]/.test(g) ? 0.9 : /[A-ZĐ]/.test(g) ? 0.76 : /[<>=+]/.test(g) ? 0.66 : /[aceksvxyz]/.test(g) ? 0.58 : 0.62) *
    (+t["font-size"] || 15) * (t["font-weight"] === "700" ? 1.06 : 1); };
const rong = (t) => sum([...t.t].map((c) => rongChu(t, c)));
// chữ trong hình từ cỡ 13, nằm trong khung hình
const khungHinh = (svg) => { const W = svgRong(svg), H = svgCao(svg);
  texts(svg).forEach((t) => { const c = +t["font-size"]; assert.ok(c >= 13, "chữ trong hình cỡ từ 13: " + t.t); const w = rong(t), a = t["text-anchor"], x0 = a === "middle" ? num(t, "x") - w / 2 : a === "end" ? num(t, "x") - w : num(t, "x");
    assert.ok(x0 >= 0 && x0 + w <= W && num(t, "y") - 0.75 * c >= 0 && num(t, "y") <= H, "chữ “" + t.t + "” nằm trong khung hình"); }); };

/* ---------- Công nghệ 12: điện trở (Bài 15; chép từ tests/tin-congnghe12-ck2.js) ----------
   Vạch màu theo Hình 15.3 của sách: điện trở 4 vạch: vạch 1, 2 là hai chữ số, vạch 3 là hệ số nhân, vạch 4 là sai số; 5 vạch: ba chữ số, hệ
   số nhân, sai số. MAU_SO: màu → chữ số; MAU_MU: màu → số mũ của hệ số nhân (bảng của sách chỉ có nâu đến xanh lam, nhũ vàng 0,1, bạc 0,01);
   MAU_SAI: màu → sai số (%) (bảng chỉ có nâu, đỏ, nhũ vàng, bạc). */
const MAU_SO = { "đen": 0, "nâu": 1, "đỏ": 2, "cam": 3, "vàng": 4, "xanh lục": 5, "xanh lam": 6, "tím": 7, "xám": 8, "trắng": 9 };
const MAU_MU = { "nâu": 1, "đỏ": 2, "cam": 3, "vàng": 4, "xanh lục": 5, "xanh lam": 6, "nhũ vàng": -1, "bạc": -2 };
const MAU_SAI = { "nâu": 1, "đỏ": 2, "nhũ vàng": 5, "bạc": 10 };
// vòng màu → { R (Ω), sai (%) }; vm: mảng tên màu theo thứ tự từ trái sang phải
const docVongMau = (vm_) => {
  assert.ok(vm_.length === 4 || vm_.length === 5, "điện trở 4 hoặc 5 vạch màu: " + vm_.join(", "));
  const so_ = vm_.slice(0, vm_.length - 2), mu = vm_[vm_.length - 2], sai = vm_[vm_.length - 1];
  so_.forEach((c) => assert.ok(c in MAU_SO, "màu chữ số: " + c)); assert.ok(MAU_SO[so_[0]] > 0, "vạch đầu không là màu đen");
  assert.ok(mu in MAU_MU, "màu hệ số nhân theo bảng của sách: " + mu); assert.ok(sai in MAU_SAI, "màu sai số theo bảng của sách: " + sai);
  const n_ = +so_.map((c) => MAU_SO[c]).join("");
  return { R: Math.round(n_ * 10 ** MAU_MU[mu] * 1e6) / 1e6, sai: MAU_SAI[sai] };
};
// số đo đọc từ chữ: "4,7 kΩ" → 4 700; "15 mH" → 0,015
const HE = { k: 1e3, M: 1e6, m: 1e-3, "µ": 1e-6, p: 1e-12, "": 1 };
const doLuong = (s, dv) => { const m = new RegExp("(" + NUM + ") ?(k|M|m|µ|p)?" + dv + "(?![\\p{L}])", "u").exec(s); assert.ok(m, "không thấy số đo " + dv + " trong: " + String(s).slice(0, 60)); return val(m[1]) * HE[m[2] || ""]; };
const mauCua = (s) => s.split(",").map((x) => x.trim().toLowerCase().replace(/\.$/, ""));
// cảm kháng X_L = 2πfL (Bài 15): bằng 0 với dòng một chiều, tăng theo tần số
const camKhang = (f, L) => 2 * Math.PI * f * L;

/* ---------- Công nghệ 12: phép tính phần Công nghệ điện (Bài 3, 4, 9) ----------
   Bài 3: mạch ba pha đối xứng: nối sao U_d = √3·U_p, I_d = I_p; nối tam giác U_d = U_p, I_d = √3·I_p; tổng trở một pha Z = √(R² + X²).
   Bài 4: cấp điện áp của lưới điện: hạ áp đến 1 kV, trung áp trên 1 kV đến 35 kV, cao áp trên 35 kV đến 220 kV, siêu cao áp trên 220 kV;
   lưới điện truyền tải có điện áp trên 110 kV, lưới điện phân phối từ 110 kV trở xuống; trạm tăng áp nâng điện áp (22/220 kV), trạm hạ áp hạ.
   Bài 9: dòng điện I = P : (U · cosφ); aptomat: dòng định mức tính được I · k (k = 1,2 với tải không có động cơ, 2,0–2,5 với tải có động cơ),
   chọn loại trên thị trường có dòng định mức lớn hơn; dây dẫn: S = I : J, chọn loại có tiết diện lớn hơn gần nhất; công tơ cấp chính xác c
   có sai số c%. */
const SAO = { U: (Up) => Math.sqrt(3) * Up, I: (Ip) => Ip }, TAM_GIAC = { U: (Up) => Up, I: (Ip) => Math.sqrt(3) * Ip };
const tongTro = (R_, X) => Math.hypot(R_, X);
const capAp = (kV) => (kV <= 1 ? "hạ áp" : kV <= 35 ? "trung áp" : kV <= 220 ? "cao áp" : "siêu cao áp");
const luoiCua = (kV) => (kV > 110 ? "truyền tải" : "phân phối");
const dongDien = (P, U, cos) => P / (U * cos);
// loại trên thị trường lớn hơn gần nhất giá trị tính được
const chonLon = (ds, x) => { const c = ds.filter((v) => v > x + 1e-9).sort((a, b) => a - b)[0]; assert.ok(c !== undefined, "không có loại nào lớn hơn " + x); return c; };

/* ---------- Công nghệ 12: khuếch đại thuật toán (Bài 19; công thức 19.5–19.7 của sách) ----------
   Cộng đảo: U_ra = −(R_f : R1 · U_vào1 + R_f : R2 · U_vào2); cộng không đảo: U_ra = (1 + R_f : R_g)(R2 : (R1 + R2) · U_vào1 + R1 : (R1 + R2) ·
   U_vào2); trừ (19.7, bên dưới). */
const congDao = (Rf, R1, R2, U1, U2) => -(Rf / R1 * U1 + Rf / R2 * U2);
const congKhongDao = (Rf, Rg, R1, R2, U1, U2) => (1 + Rf / Rg) * (R2 / (R1 + R2) * U1 + R1 / (R1 + R2) * U2);
// mạch trừ (19.7): U_vào1 qua R1 tới lối vào đảo, R2 từ lối ra về lối vào đảo; U_vào2 qua R3 tới lối vào không đảo, R4 từ lối vào không đảo
// xuống đất: U_ra = R4 : (R3 + R4) · (1 + R2 : R1) · U_vào2 − R2 : R1 · U_vào1
const tru = (R1, R2, R3, R4, U1, U2) => R4 / (R3 + R4) * (1 + R2 / R1) * U2 - R2 / R1 * U1;

/* ---------- Công nghệ 12: mạch logic trong hình (Bài 21; chép từ tests/tin-congnghe12-ck2.js) ----------
   Kí hiệu theo sách (Hình 21.6, 21.8, 21.10, 21.12, 21.15): cổng AND: path “M x y H xm A r r 0 0 1 xm y+2r H x Z” (cạnh sau thẳng, phía
   trước nửa hình tròn), hai lối vào ở cạnh sau cách đỉnh r/2 và 3r/2, lối ra ở đỉnh nửa hình tròn; cổng OR: path “M x y Q x+12 y+r x
   y+2r Q x+0,6L y+2r x+L y+r Q x+0,6L y x y Z” (cạnh sau cong lõm, phía trước nhọn), hai lối vào trên cạnh sau cong ở t = 1/4, 3/4 (điểm
   (x + 24t(1 − t), y + 2rt)), lối ra ở mũi nhọn; cổng NOT: tam giác đỉnh hướng sang phải, lối vào ở giữa cạnh sau; dấu đảo: vòng tròn
   r = 5 sát lối ra (cổng NOT luôn có; AND, OR có dấu đảo là NAND, NOR). Dây nối: đoạn ngang hoặc dọc, nối nhau ở đầu mút (đầu dây không
   chạm giữa dây khác); đầu dây nào cũng là chân cổng, lối vào, lối ra của mạch hoặc đầu dây khác. Lối vào của mạch: một chữ in hoa
   text-anchor end, cách đầu dây 6 về bên trái, thấp hơn 5; lối ra: chữ Y cách đầu dây 6 về bên phải. Mỗi lưới dây có đúng một nguồn (lối
   vào của mạch hoặc lối ra của một cổng), không có vòng. docMach(svg) → { vao: [tên lối vào], cong: [loại cổng], ham(giá trị) → Y }. */
const CONG = { AND: (a, b) => a & b, OR: (a, b) => a | b, NAND: (a, b) => 1 - (a & b), NOR: (a, b) => 1 - (a | b), NOT: (a) => 1 - a };
const docMach = (svg) => {
  khungHinh(svg);
  const cong = [], P = [...svg.matchAll(/<path d="([^"]*)"[^>]*>/g)].map((m) => m[1]);
  P.forEach((d) => {
    let m;
    if ((m = /^M (\S+) (\S+) H (\S+) A (\S+) (\S+) 0 0 1 (\S+) (\S+) H (\S+) Z$/.exec(d))) {
      const [x, y_, xm, r, r2, xm2, y2, x2] = m.slice(1).map(Number);
      assert.ok(r === r2 && xm === xm2 && x2 === x && y2 === y_ + 2 * r && xm > x, "cổng AND vẽ sai: " + d);
      cong.push({ loai: "AND", vao: [[x, y_ + r / 2], [x, y_ + 1.5 * r]], ra: [xm + r, y_ + r] });
    } else if ((m = /^M (\S+) (\S+) Q (\S+) (\S+) (\S+) (\S+) Q (\S+) (\S+) (\S+) (\S+) Q (\S+) (\S+) (\S+) (\S+) Z$/.exec(d))) {
      const v = m.slice(1).map(Number), [x, y_] = v, h = v[5] - y_, r = h / 2, L = v[8] - x;
      assert.ok(h > 0 && L > 0 && v[2] === x + 12 && v[3] === y_ + r && v[4] === x && gan(v[6], x + 0.6 * L) && v[7] === y_ + h && v[9] === y_ + r && gan(v[10], x + 0.6 * L) && v[11] === y_ && v[12] === x && v[13] === y_, "cổng OR vẽ sai: " + d);
      const tai = (t) => [x + 24 * t * (1 - t), y_ + h * t];
      cong.push({ loai: "OR", vao: [tai(0.25), tai(0.75)], ra: [x + L, y_ + r] });
    } else assert.fail("hình lạ trong mạch logic: " + d);
  });
  tags(svg, "polygon").forEach((g) => { const p = g.points.trim().split(/\s+/).map((xy) => xy.split(",").map(Number));
    assert.ok(p.length === 3 && p[0][0] === p[1][0] && p[2][1] === (p[0][1] + p[1][1]) / 2 && p[2][0] > p[0][0], "cổng NOT: tam giác đỉnh hướng sang phải");
    cong.push({ loai: "NOT", vao: [[p[0][0], p[2][1]]], ra: p[2].slice() }); });
  const tron = tags(svg, "circle");
  assert.ok(tron.every((c) => +c.r === 5), "trong mạch logic chỉ có vòng tròn dấu đảo");
  tron.forEach((c) => { const g = cong.find((k) => !k.dao && k.ra[0] + 5 === +c.cx && k.ra[1] === +c.cy); assert.ok(g, "dấu đảo nằm sát lối ra của một cổng"); g.dao = true; g.ra = [g.ra[0] + 10, g.ra[1]]; });
  cong.forEach((g) => { if (g.loai === "NOT") assert.ok(g.dao, "cổng NOT có dấu đảo ở lối ra"); else if (g.dao) g.loai = "N" + g.loai; });
  assert.ok(cong.length >= 1, "mạch có cổng logic");
  // dây nối
  const day = tags(svg, "line").map((l) => [[+l.x1, +l.y1], [+l.x2, +l.y2]]), k = (p) => p[0] + "," + p[1];
  day.forEach(([p, q]) => assert.ok((p[0] === q[0]) !== (p[1] === q[1]), "dây nối là đoạn ngang hoặc dọc"));
  day.forEach((a, i) => a.forEach((p) => day.forEach(([u, v], j) => { if (i === j) return;
    const giua = (u[0] === v[0] && p[0] === u[0] && p[1] > Math.min(u[1], v[1]) && p[1] < Math.max(u[1], v[1])) || (u[1] === v[1] && p[1] === u[1] && p[0] > Math.min(u[0], v[0]) && p[0] < Math.max(u[0], v[0]));
    assert.ok(!giua, "đầu dây chạm giữa một dây khác"); })));
  const cha = day.map((_, i) => i), goc = (i) => (cha[i] === i ? i : (cha[i] = goc(cha[i])));
  day.forEach((a, i) => day.forEach((b, j) => { if (i < j && a.some((p) => b.some((q) => k(p) === k(q)))) cha[goc(i)] = goc(j); }));
  const luoi = (p) => { const i = day.findIndex((d) => d.some((q) => k(q) === k(p))); return i < 0 ? null : goc(i); };
  // chữ của lối vào, lối ra
  const nguon = new Map(), vao = [], chan = new Set();
  let ra = null;
  texts(svg).forEach((t) => {
    const x = +t.x, y_ = +t.y, trai = t["text-anchor"] === "end";
    const dau = day.flat().filter((p) => p[1] === y_ - 5 && p[0] === (trai ? x + 6 : x - 6));
    assert.equal(dau.length, 1, "chữ “" + t.t + "” đứng sát đúng một đầu dây");
    chan.add(k(dau[0]));
    if (trai) { assert.ok(/^[A-Z]$/.test(t.t) && !vao.includes(t.t), "lối vào của mạch: một chữ in hoa, không lặp"); nguon.set(luoi(dau[0]), { vao: t.t }); vao.push(t.t); }
    else { assert.ok(t.t === "Y" && ra === null, "lối ra của mạch: chữ Y"); ra = luoi(dau[0]); }
  });
  assert.ok(ra !== null, "mạch có lối ra Y");
  cong.forEach((g, i) => {
    const n_ = luoi(g.ra); assert.ok(n_ !== null && !nguon.has(n_), "lối ra của cổng " + g.loai + " nối với một lưới dây chưa có nguồn"); nguon.set(n_, { cong: i }); chan.add(k(g.ra));
    g.luoi = g.vao.map((p) => { const m = luoi(p); assert.ok(m !== null, "lối vào của cổng " + g.loai + " có dây nối"); chan.add(k(p)); return m; });
  });
  new Set(day.map((_, i) => goc(i))).forEach((n_) => assert.ok(nguon.has(n_), "lưới dây nào cũng có nguồn"));
  day.forEach((d) => d.forEach((p) => assert.ok(chan.has(k(p)) || day.filter((e) => e.some((q) => k(q) === k(p))).length >= 2, "đầu dây bỏ trống ở " + k(p))));
  const tinh = (n_, gt, sau = 0) => { assert.ok(sau < 20, "mạch có vòng"); const s = nguon.get(n_);
    if (s.vao) { assert.ok(s.vao in gt, "thiếu giá trị lối vào " + s.vao); return gt[s.vao]; }
    const g = cong[s.cong]; return CONG[g.loai](...g.luoi.map((m) => tinh(m, gt, sau + 1))); };
  daDoc.add(svg);
  return { vao: vao.slice().sort(), cong: cong.map((g) => g.loai), ham: (gt) => tinh(ra, gt) };
};
// hàm logic viết bằng chữ: biến là một chữ in hoa (gạch trên: Ā, B̄ là phủ định), “·” nhân logic, “+” cộng logic, ngoặc tròn; có thể mở đầu
// bằng “Y = ” → hàm (giá trị) → 0, 1
const docHam = (s) => {
  const t = String(s).normalize("NFD").trim().replace(/^[A-Z] = /, "");
  let i = 0;
  const bo = () => { while (t[i] === " ") i++; };
  const nguyenTo = () => { bo(); let f;
    if (t[i] === "(") { i++; f = cong_(); bo(); assert.equal(t[i], ")", "hàm logic thiếu ngoặc: " + s); i++; }
    else { const c = t[i]; assert.ok(/^[A-Z]$/.test(c || ""), "hàm logic viết sai: " + s); i++; f = (g) => { assert.ok(c in g, "thiếu giá trị " + c); return g[c]; }; }
    if (t[i] === "̄") { i++; const h = f; f = (g) => 1 - h(g); }
    return f; };
  const nhan_ = () => { let f = nguyenTo(); bo(); while (t[i] === "·") { i++; const a = f, b = nguyenTo(); f = (g) => a(g) & b(g); bo(); } return f; };
  const cong_ = () => { let f = nhan_(); bo(); while (t[i] === "+") { i++; const a = f, b = nhan_(); f = (g) => a(g) | b(g); bo(); } return f; };
  const f = cong_(); bo(); assert.equal(i, t.length, "hàm logic viết sai: " + s);
  return f;
};
// mọi tổ hợp giá trị của các biến; hai hàm giống nhau trên mọi tổ hợp
const toHop = (bien) => bien.reduce((ds, b) => ds.flatMap((d) => [0, 1].map((v) => Object.assign({}, d, { [b]: v }))), [{}]);
const giongNhau = (f, g, bien) => toHop(bien).every((d) => f(d) === g(d));
/* ---------- Công nghệ 12: bộ đếm nhị phân đếm tiến (Bài 22; chép từ tests/tin-congnghe12-ck2.js) ----------
   Mỗi xung FF0 đổi trạng thái; FF thứ i + 1 đổi trạng thái khi Q của FF thứ i chuyển từ 1 về 0. demTien(n, số xung) → [Q₀, Q₁, …] từ 0…0.
   chuKi(n, i): số xung vào để lối ra Q_i lặp lại (tần số ở Q_i bằng tần số xung vào chia cho số này). */
const demTien = (n_, xung) => { const q = Array(n_).fill(0);
  for (let k = 0; k < xung; k++) for (let i = 0; i < n_; i++) { const cu = q[i]; q[i] ^= 1; if (!(cu === 1 && q[i] === 0)) break; }
  return q; };
const chuKi = (n_, i) => { const N = 64, ds = [...Array(N).keys()].map((k) => demTien(n_, k)[i]);
  return [...Array(N).keys()].slice(1).find((T) => ds.every((v, k) => k + T >= N || ds[k + T] === v)); };

/* ---------- chọn đáp án ---------- */
const motLuaChon = (q, ok) => { const c = q.o.filter(ok); assert.equal(c.length, 1, "đúng một lựa chọn đáp ứng yêu cầu, có " + c.length + ": " + c.join(" | ")); return c[0]; };
// lựa chọn duy nhất có mọi đoạn chữ cho trước (chữ khoá của đáp án theo sách); lựa chọn đúng bằng một chữ
const chon = (q, ...has) => motLuaChon(q, (o) => has.every((h) => o.includes(h)));
const laDung = (q, s) => motLuaChon(q, (o) => o === s);
// ý của câu đúng/sai 4 ý có chữ “…”: bảng chữ của ý → đúng/sai (hàm: tính bằng code)
const yCo = (q, has) => { const i = q.o.findIndex((o) => o.includes(has)); assert.ok(i >= 0, "không thấy ý có “" + has + "”"); assert.equal(q.o.filter((o) => o.includes(has)).length, 1, "nhiều ý có “" + has + "”"); return i; };
const traY = (q, bang) => { const r = q.o.map(() => undefined); Object.entries(bang).forEach(([has, v]) => { const i = yCo(q, has); assert.equal(r[i], undefined, "hai mục cùng khớp ý " + (i + 1)); r[i] = typeof v === "function" ? v(q.o[i]) : v; });
  assert.ok(r.every((v) => typeof v === "boolean"), "mọi ý đều có trong bảng"); return r; };

/* ---------- các mục kiểm tra của từng đề (RIENG; phiên thêm đề thì thêm một khoá mới) ----------
   has: đoạn chữ của đề bài; right(q): câu nhiều lựa chọn trả về lựa chọn đúng, câu đúng/sai 4 ý trả về mảng 4 ý. */
// tỉ lệ a : b của bản vẽ (Công nghệ 10, Bài 8): a < b thu nhỏ, a > b phóng to, a = b nguyên hình
const loaiTiLe = (a, b) => (a < b ? "Tỉ lệ thu nhỏ" : a > b ? "Tỉ lệ phóng to" : "Tỉ lệ nguyên hình");
const RIENG = {
  "congnghe12-tn-de1": [
    // đầu vào của hệ thống kĩ thuật: vật liệu, năng lượng, thông tin đưa vào để xử lí (Công nghệ 10, Bài 2)
    { has: "cây mía và điện năng cấp cho máy", right: (q) => laDung(q, "Đầu vào") },
    { has: "thuộc loại tỉ lệ nào", right: (q) => { const [a, b] = so(q.q, "tỉ lệ # : #"); return laDung(q, loaiTiLe(a, b)); } },
    { has: "Trong vật liệu composite", right: (q) => laDung(q, "Vật liệu cốt") },
    { has: "động cơ Diesel 4 kì, trong kì nạp", right: (q) => laDung(q, "Chỉ có không khí") },
    // máy phát điện, động cơ điện, máy biến áp làm việc theo hiện tượng cảm ứng điện từ (Bài 1)
    { has: "Michael Faraday", right: (q) => motLuaChon(q, (o) => ["Máy biến áp", "Máy phát điện", "Động cơ điện"].includes(o)) },
    { has: "công tắc điện thường dùng", right: (q) => chon(q, "Từng đèn") },
    { has: "aptomat, cầu dao của mạng điện trong nhà", right: (q) => chon(q, "tủ điện có nắp che", "khô ráo") },
    { has: "thuộc khâu chọn mua thiết bị điện", right: (q) => chon(q, "cảm biến chuyển động") },
    { has: "John Ambrose Fleming", right: (q) => laDung(q, "Biến dòng điện xoay chiều thành một chiều") },
    { has: "truyền hình hội nghị", right: (q) => laDung(q, "Dịch vụ viễn thông") },
    { has: "Bên trong một IC số", right: (q) => chon(q, "Cổng logic") },
    { has: "thiết bị chủ như lò vi sóng", right: (q) => laDung(q, "Máy tính nhúng") },
    { has: "máy cho cá ăn tự động", right: (q) => laDung(q, "Kiểm chứng giải pháp") },
    { has: "chạy dao dọc", right: (q) => laDung(q, "Mặt trụ ngoài") },
    // cấp điện: đóng từ phía nguồn về phía tải: tủ phân phối tổng → tủ phân phối nhánh → tủ động lực (Bài 6)
    { has: "đóng các aptomat theo thứ tự", right: (q) => { const TU = ["tổng", "nhánh", "động lực"];
      return motLuaChon(q, (o) => { const t = o.split(" → ").map((s) => TU.findIndex((k) => s.endsWith(k))); assert.ok(t.length === 3 && t.every((k) => k >= 0) && new Set(t).size === 3, "ô ghi đủ ba loại tủ: " + o); return t.join() === "0,1,2"; }); } },
    { has: "được lấy giữa hai dây nào", right: (q) => { coX(q, "220 V giữa một dây pha với dây trung tính"); return laDung(q, "Một dây pha và dây trung tính"); } },
    { has: "thể hiện vị trí đặt công tắc", right: (q) => laDung(q, "Sơ đồ lắp đặt") },
    { has: "chặn bớt nhiễu có tần số cao", right: (q) => { assert.ok(camKhang(0, 1e-3) === 0 && camKhang(1e6, 1e-3) > 1000 * camKhang(1e3, 1e-3) - 1e-6, "cảm kháng bằng 0 với dòng một chiều, tăng theo tần số");
      return laDung(q, "Mắc nối tiếp cuộn cảm trên đường dây"); } },
    { has: "mạng truyền hình cáp", right: (q) => chon(q, "Tăng biên độ") },
    { has: "đọc cảm biến ánh sáng", right: (q) => laDung(q, "Đo lường và điều khiển") },
    // số kích thước ghi trên bản vẽ là số đo thật của vật (Công nghệ 10, Bài 8)
    { has: "đường kính một lỗ đo được", right: (q) => { const [a, b] = so(q.q, "tỉ lệ # : #"), [d] = so(q.q, "đo được # mm"), that = d * b / a; coX(q, "= " + vn(that));
      return laDung(q, "Ø" + vn(that)); } },
    // tỉ số nén ε = V_tp : V_bc, V_tp = V_bc + V_xl (Công nghệ 11, Bài 17)
    { has: "Tỉ số nén của xi lanh", right: (q) => { const [vbc] = so(q.q, "thể tích buồng cháy # lít"), [vxl] = so(q.q, "thể tích công tác # lít"), vtp = vbc + vxl;
      coX(q, "= " + vn(lam(vtp, 4)) + " (lít)"); return laDung(q, vn(lam(vtp / vbc, 2))); } },
    // mỗi cuộn chịu U_p khi nối sao (U_d : √3), U_d khi nối tam giác; cần đúng điện áp định mức
    { has: "mỗi cuộn dây chịu được điện áp định mức", right: (q) => { const [Ud, Up] = so(q.q, "có điện áp dây # V, điện áp pha # V"), [dm] = so(q.q, "điện áp định mức # V");
      assert.ok(Math.abs(SAO.U(Up) - Ud) < 0.01 * Ud, "lưới ba pha: U_d ≈ √3 · U_p");
      // lựa chọn: cách nối và điện áp mỗi cuộn chịu so với định mức (đúng, gấp √3 lần, nhỏ hơn)
      return motLuaChon(q, (o) => { const m = y(o, /^Nối hình (sao|tam giác), mỗi cuộn chịu (đúng điện áp định mức|điện áp gấp √3 lần định mức|điện áp nhỏ hơn định mức)$/);
        const u = m[1] === "sao" ? Ud / Math.sqrt(3) : TAM_GIAC.U(Ud), ghi = m[2].startsWith("đúng") ? Math.abs(u - dm) < 1 : m[2].includes("√3") ? Math.abs(u - Math.sqrt(3) * dm) < 1 : u < dm - 1;
        return ghi && Math.abs(u - dm) < 1; }); } },
    { has: "khi hai tín hiệu vào A, B khác nhau", right: (q) => { const f = (d) => d.A ^ d.B; coX(q, "Y = 1 ở hai dòng A = 0, B = 1 và A = 1, B = 0");
      return motLuaChon(q, (o) => giongNhau(docHam(o), f, ["A", "B"])); } },
    { has: "các thành phần của hệ thống điện quốc gia", right: (q) => traY(q, {
      "thuộc lưới truyền tải": (o) => luoiCua(so(o, "Đường dây # kV")[0]) === "truyền tải",
      "thuộc cấp điện áp cao áp": (o) => capAp(so(o, "Đường dây # kV")[0]) === "cao áp",
      "là trạm hạ áp": (o) => { const [a, b] = so(o, "Trạm biến áp #/# kV"); return a > b; },
      "là tải tiêu thụ sản xuất": true }) },
    { has: "máy giặt có công suất", right: (q) => { const [P] = so(q.q, "công suất # W"), [U] = so(q.q, "dùng điện # V"), [cos] = so(q.q, "cosφ = #"), [J] = so(q.q, "cho phép # A/mm²"), I = dongDien(P, U, cos);
      coX(q, "= " + vn(lam(I, 2)) + " (A)");
      return traY(q, { "hệ số an toàn từ 2,0 đến 2,5": true, "Nếu bỏ qua hệ số công suất": dongDien(P, U, 1) > I,
        "Dòng điện chạy qua dây dẫn": (o) => gan(so(o, "là # A")[0], I), "là đủ cho mạch này": (o) => so(o, "tiết diện # mm²")[0] > I / J }); } },
    { has: "Trong một mạch cộng đảo", right: (q) => { const [Rf] = so(q.q, "R_f = # kΩ"), [R1] = so(q.q, "R1 = # kΩ"), [R2] = so(q.q, "R2 = # kΩ");
      return traY(q, { "mạch làm việc như mạch khuếch đại đảo": (o) => { const [k] = so(o, "có hệ số khuếch đại #"); return [0.1, 1, 2.5].every((u) => gan(congDao(Rf, R1, R2, u, 0), k * u)); },
        "Trọng số của U_vào1 nhỏ hơn": Rf / R1 < Rf / R2,
        "thì U_ra = ": (o) => { const [u1, u2, ur] = so(o, "Khi U_vào1 = # V, U_vào2 = # V thì U_ra = # V"); return gan(congDao(Rf, R1, R2, u1, u2), ur); },
        "lối ra không có điện áp": (o) => { const [u1, u2] = so(o, "Khi U_vào1 = # V, U_vào2 = # V thì lối ra không có điện áp"); return Math.abs(congDao(Rf, R1, R2, u1, u2)) < 1e-9; } }); } },
    { has: "Mạch logic trong hình có ba lối vào A, B, C", right: (q) => { const m = docMach(q.svg), H = (d) => m.ham(d), ABC = toHop(["A", "B", "C"]);
      assert.deepEqual(m.vao, ["A", "B", "C"], "ba lối vào A, B, C"); assert.deepEqual([...m.cong].sort(), ["AND", "NAND", "NOT"], "các cổng của mạch");
      return traY(q, { "Lối vào C đi qua một cổng NOT": ABC.every((d) => H(d) === (H(Object.assign({}, d, { C: 0 })) & (1 - d.C))),
        "Khi C = 1 thì Y = 0": ABC.filter((d) => d.C === 1).every((d) => H(d) === 0), "Khi A = 1, B = 1, C = 0 thì Y = 1": H({ A: 1, B: 1, C: 0 }) === 1,
        "Có đúng ba tổ hợp": ABC.filter(H).length === 3 }); } },
  ],
  "congnghe12-tn-de2": [
    // luyện kim đen: gang, thép; luyện kim màu: nhôm, đồng, vàng, chì, kẽm (Công nghệ 10, Bài 3)
    { has: "công nghệ luyện kim đen", right: (q) => motLuaChon(q, (o) => ["Gang", "Thép"].includes(o)) },
    { has: "Hình chiếu phối cảnh", right: (q) => laDung(q, "Phép chiếu xuyên tâm") },
    { has: "mô hình 3D của các chi tiết máy", right: (q) => laDung(q, "Thiết kế sản phẩm cơ khí") },
    { has: "nằm giữa động cơ và hộp số", right: (q) => laDung(q, "Li hợp") },
    { has: "thuộc nhóm sản xuất, chế tạo thiết bị điện", right: (q) => chon(q, "quạt điện") },
    { has: "Đường dây 500 kV mạch 1 nối miền Bắc với miền Nam", right: (q) => laDung(q, "1994") },
    { has: "Nhà máy thuỷ điện biến dạng năng lượng", right: (q) => laDung(q, "Thế năng") },
    { has: "tủ điện phân phối tổng thường được đặt ở đâu", right: (q) => chon(q, "trạm biến áp") },
    { has: "là việc của ngành kĩ thuật điện tử", right: (q) => chon(q, "mạch hẹn giờ") },
    { has: "thông số kĩ thuật của một loại diode", right: (q) => chon(q, "datasheet") },
    { has: "Đại số logic", right: (q) => laDung(q, "Cộng logic, nhân logic và phủ định") },
    { has: "LED chỉ thị và phím bấm reset", right: (q) => chon(q, "kiểm thử") },
    { has: "động cơ hơi nước bằng máy chạy điện", right: (q) => laDung(q, "Lần thứ hai") },
    { has: "máy CNC có thể lập trình lại", right: (q) => laDung(q, "Dây chuyền sản xuất tự động mềm") },
    { has: "ba mạch nhánh", right: (q) => chon(q, "chỉ làm mạch đó mất điện") },
    { has: "cầu dao kèm cầu chì", right: (q) => chon(q, "tự cắt điện") },
    { has: "dàn nóng", right: (q) => chon(q, "thoáng gió") },
    { has: "làm mẫu thử bộ điều khiển", right: (q) => laDung(q, "Thiết kế thiết bị điện tử") },
    { has: "dùng transistor để khuếch đại điện áp", right: (q) => laDung(q, "Biên độ lớn hơn và ngược pha") },
    // số dây của bus dữ liệu là độ rộng dữ liệu CPU xử lí được (Bài 24)
    { has: "mỗi đường mang một bit", right: (q) => { const [d] = so(q.q, "qua # đường dây"); return laDung(q, "Vi điều khiển " + vn(d) + " bit"); } },
    { has: "giá để giày", right: (q) => laDung(q, "Nguyên tắc tối thiểu tài chính") },
    // S = 2R, V_xl = πD²/4 · S, V_đc = i · V_xl (Công nghệ 11, Bài 17)
    { has: "Thể tích công tác của động cơ", right: (q) => { const [i] = so(q.q, "Một động cơ # xi lanh"), [D] = so(q.q, "D = # mm"), [Rq] = so(q.q, "R = # mm"), S = 2 * Rq;
      const Vxl = Math.PI * D * D / 4 * S / 1000, V = i * Vxl / 1000; coX(q, "S = 2 × R = " + vn(S) + " mm");
      return motLuaChon(q, (o) => Math.abs(so(o, "Khoảng # lít")[0] - V) < 0.006); } },
    { has: "bóng đèn pha chiếu sáng sân", right: (q) => { const [nb, p] = so(q.q, "điều khiển # bóng đèn pha chiếu sáng sân, mỗi bóng # W"), [U] = so(q.q, "W, # V"), [cos] = so(q.q, "cosφ = #");
      const [k] = so(q.q, "hệ số an toàn #"), [J] = so(q.q, "cho phép # A/mm²"), m = y(q.q, /có aptomat loại (.+?) và dây có tiết diện (.+?) mm²/);
      const AP = m[1].split(", ").map((s) => so(s, "# A")[0]), DAY = m[2].split("; "), I = dongDien(nb * p, U, cos), A = chonLon(AP, I * k), S = chonLon(DAY.map(val), I / J);
      coX(q, "≈ " + vn(lam(I, 2)) + " (A)"); return laDung(q, `Aptomat ${vn(A)} A, dây ${DAY.find((s) => val(s) === S)} mm²`); } },
    { has: "đếm từ 0 đến 3 rồi quay lại 0", right: (q) => { const [f] = so(q.q, "tần số # Hz"); assert.ok(chuKi(2, 0) === 2 && chuKi(2, 1) === 4, "bộ đếm 2 bit: Q₀ lặp sau 2 xung, Q₁ sau 4 xung");
      coX(q, "Q₀ lặp lại sau 2 xung", "Q₁ lặp lại sau 4 xung"); return laDung(q, vn(f / chuKi(2, 1)) + " Hz"); } },
    { has: "máy bơm nước công nghiệp có ba cuộn dây", right: (q) => { const [Rr] = so(q.q, "điện trở # Ω"), [X] = so(q.q, "điện kháng # Ω"), [Ud, Up] = so(q.q, "lưới ba pha #/# V");
      assert.ok(q.q.includes("đấu sao"), "tải đấu sao"); const Z = tongTro(Rr, X), Ip = Up / Z;
      return traY(q, { "điện áp dây bằng điện áp pha": gan(SAO.U(Up), Up), "chịu điện áp khoảng": (o) => Math.abs(so(o, "khoảng # V")[0] - Ud / Math.sqrt(3)) < 1,
        "Tổng trở của mỗi cuộn dây": (o) => gan(so(o, "là # Ω")[0], Z), "Dòng điện chạy trong mỗi dây pha": (o) => gan(so(o, "là # A")[0], SAO.I(Ip)) }); } },
    { has: "dùng máy khoan cầm tay", right: (q) => traY(q, { "găng tay cách điện": true, "dây điện đặt ngầm trong tường": true, "chung một ổ cắm": false, "đi chân trần": false }) },
    { has: "phân loại điện trở trước khi lắp mạch", right: (q) => traY(q, {
      // điện trở 4 vạch: vạch 3 là hệ số nhân, vạch 4 là sai số
      "vạch thứ tư cho biết hệ số nhân": false,
      "chính xác hơn": (o) => { const m = y(o, /vạch sai số màu (.+?) chính xác hơn loại có vạch sai số màu (.+?)\.$/); return MAU_SAI[m[1]] < MAU_SAI[m[2]]; },
      "có trị số": (o) => { const m = y(o, /mang các vạch (.+?) có trị số (.+?)\.$/); return gan(docVongMau(mauCua(m[1])).R, doLuong(m[2], "Ω")); },
      "đo được": (o) => { const m = y(o, /mang các vạch (.+?) mà đo được (.+?) thì vẫn nằm trong khoảng sai số cho phép\.$/), r = docVongMau(mauCua(m[1])), d = doLuong(m[2], "Ω");
        return Math.abs(d - r.R) <= r.R * r.sai / 100; } }) },
    { has: "Mạch trừ dùng khuếch đại thuật toán", right: (q) => { const [R1] = so(q.q, "R1 = R3 = # kΩ"), [R2] = so(q.q, "R2 = R4 = # kΩ"), R3 = R1, R4 = R2;
      assert.ok(q.q.includes("U_vào1 đưa vào lối vào đảo qua R1") && q.q.includes("U_vào2 đưa vào lối vào không đảo qua R3") && q.q.includes("nối đất qua R4"), "cách nối của mạch trừ như Hình 19.11");
      const ura = (u1, u2) => tru(R1, R2, R3, R4, u1, u2), ra_ = (o) => { const [u1, u2, ur] = so(o, "Khi U_vào1 = # V, U_vào2 = # V thì U_ra = # V"); return gan(ura(u1, u2), ur); };
      return traY(q, { "Với các điện trở trên": (o) => { const [k] = so(o, "U_ra = # × (U_vào2 − U_vào1)"); return [[0, 1], [1, 0], [0.4, 1.7], [2, 2]].every(([a, b]) => Math.abs(ura(a, b) - k * (b - a)) < 1e-9); },
        "Khi U_vào1 = 1,5 V": ra_, "Khi U_vào1 = 0,8 V": ra_, "Nếu tăng U_vào1 mà giữ nguyên U_vào2 thì U_ra tăng": ura(1, 0.5) > ura(0, 0.5) }); } },
  ],
  "congnghe12-tn-de3": [
    { has: "sản phẩm của quá trình CAM", right: (q) => laDung(q, "Quy trình gia công chi tiết") },
    { has: "đường đỉnh ren", right: (q) => laDung(q, "Nét liền đậm") },
    { has: "Nitinol", right: (q) => laDung(q, "Nickel và titanium") },
    { has: "chân vịt", right: (q) => laDung(q, "Máy công tác") },
    { has: "triển vọng của kĩ thuật điện", right: (q) => chon(q, "xe điện") },
    { has: "là mạch đối xứng", right: (q) => laDung(q, "Nguồn và tải ba pha đều đối xứng") },
    { has: "dây dẫn điện được lắp theo những cách nào", right: (q) => chon(q, "đi ngầm trong tường") },
    { has: "không được đến gần đường dây cao áp", right: (q) => chon(q, "phóng qua không khí") },
    { has: "Thông số điện cảm (L)", right: (q) => chon(q, "năng lượng từ trường") },
    { has: "micro điện động", right: (q) => chon(q, "màng rung") },
    { has: "Ngoài việc đếm số xung", right: (q) => chon(q, "Chia tần số") },
    { has: "development kit", right: (q) => chon(q, "thử nhanh") },
    { has: "bàn học cho học sinh tiểu học", right: (q) => laDung(q, "Nhân trắc") },
    { has: "cánh tản nhiệt đúc liền", right: (q) => laDung(q, "Làm mát bằng không khí") },
    { has: "Định kì 6 tháng một lần", right: (q) => laDung(q, "Bảo dưỡng điện") },
    { has: "cùng thuộc cấp cao áp", right: (q) => motLuaChon(q, (o) => so(o, "Đường dây # kV và # kV").every((u) => capAp(u) === "cao áp")) },
    { has: "Một ưu điểm của nhà máy nhiệt điện chạy than", right: (q) => chon(q, "Vốn đầu tư ban đầu thấp hơn") },
    { has: "điều khiển đèn giao thông, thu phí đỗ xe", right: (q) => laDung(q, "Thành phố thông minh") },
    { has: "cao đẳng nghề kĩ thuật điện tử", right: (q) => laDung(q, "Sản xuất, chế tạo thiết bị điện tử") },
    // máy chạy khi và chỉ khi cả hai nút được bấm: Y = A · B
    { has: "Một máy dập", right: (q) => motLuaChon(q, (o) => { const g = y(o, /^Cổng (AND|OR|NOT|NAND|NOR)$/)[1]; return g !== "NOT" && toHop(["A", "B"]).every((d) => CONG[g](d.A, d.B) === (d.A & d.B)); }) },
    // hình chiếu trục đo xiên góc cân: p = r = 1, q = 0,5 (Công nghệ 10, Bài 11)
    { has: "hình chiếu trục đo xiên góc cân của một khối hộp", right: (q) => { const [rr] = so(q.q, "rộng # mm (theo trục Oy)"); assert.ok(q.q.includes("song song với trục O′y′"), "hỏi cạnh theo trục O′y′");
      coX(q, "p = r = 1, q = 0,5"); return laDung(q, vn(rr * 0.5) + " mm"); } },
    { has: "xưởng hàn", right: (q) => chon(q, "bệnh nghề nghiệp", "hút khói hàn") },
    { has: "cấp chính xác", right: (q) => { const [c] = so(q.q, "cấp chính xác #"), [A] = so(q.q, "ghi nhận # kWh"), s = A * c / 100; return laDung(q, `Từ ${vn(A - s)} kWh đến ${vn(A + s)} kWh`); } },
    { has: "Một mạch cộng không đảo", right: (q) => { const [Rg] = so(q.q, "R_f = R_g = # kΩ"), [R1] = so(q.q, "R1 = R2 = # kΩ"), [U1] = so(q.q, "U_vào1 = # V"), [U2] = so(q.q, "U_vào2 = # V");
      return laDung(q, vn(lam(congKhongDao(Rg, Rg, R1, R1, U1, U2), 3)) + " V"); } },
    { has: "mạng điện hạ áp dùng trong sinh hoạt của một khu dân cư", right: (q) => traY(q, { "thuộc lưới điện phân phối": luoiCua(0.4) === "phân phối",
      "đặt ở giữa khu dân cư": false, "máy bơm nước công cộng": true, "như ACB hoặc MCCB": true }) },
    { has: "bình nóng lạnh", right: (q) => { const [P] = so(q.q, "bình nóng lạnh # W"), [h] = so(q.q, "mỗi ngày bật # giờ"), A = (P / 1000) * h;
      return traY(q, { "nhãn năng lượng ít sao hơn": false, "Chỉ bật bình trước giờ tắm": true, "bình tiêu thụ": (o) => gan(so(o, "Mỗi tháng (30 ngày), bình tiêu thụ # kWh")[0], A * 30),
        "tiết kiệm được hơn": (o) => { const [h2] = so(o, "còn # giờ"), [x] = so(o, "hơn # kWh"); return (P / 1000) * (h - h2) * 30 > x; } }); } },
    { has: "đọc thông số và kiểm tra một số transistor, IC", right: (q) => traY(q, { "U_CE0": true, "IC một hàng chân": true,
      "dòng điện base định mức": (o) => { const [dm, I] = so(o, "dòng điện base định mức # mA; cho dòng base # mA"); return I <= dm; }, "IC cảm biến": false }) },
    { has: "xung nhịp 16 MHz", right: (q) => { const [f] = so(q.q, "xung nhịp # MHz"), [k] = so(q.q, "cần # xung nhịp"), t = k / f; // µs
      return traY(q, { "bộ nhớ RAM thực hiện": false, "tăng tần số xung nhịp": true, "Mỗi câu lệnh chạy trong": (o) => gan(so(o, "trong # µs")[0], t),
        "câu lệnh như vậy chạy xong": (o) => { const [n_, ms] = so(o, "gồm # câu lệnh như vậy chạy xong trong # ms"); return gan(n_ * t / 1000, ms); } }); } },
  ],
};

/* ---------- đề và danh mục: số đề, số câu lấy từ danh mục ---------- */
const soDe = (id) => +/de(\d+)$/.exec(id)[1];
const DE = BANKS.filter((b) => /^congnghe12-tn-de\d+$/.test(b.id)).sort((a, b) => soDe(a.id) - soDe(b.id));
assert.ok(DE.length >= 1, "chưa có đề Công nghệ thi thử tốt nghiệp nào trong danh mục");
DE.forEach((b, i) => assert.equal(b.id, "congnghe12-tn-de" + (i + 1), "mã đề phải liên tiếp từ congnghe12-tn-de1"));
const TN = EVENTS.find((e) => e.id === "tn-thpt-2027");
const P1 = "Phần I. Trắc nghiệm nhiều lựa chọn", P2 = "Phần II. Trắc nghiệm đúng sai";
const KHUNG = [[P1, "mc", 24, 0.25], [P2, "tf4", 4, 1]];
// tên chương của Công nghệ 10 – Thiết kế và công nghệ, Công nghệ 11 – Công nghệ cơ khí; tên bài của ba cuốn (mục lục ở README của từng cuốn
// trong OnUp-Book; so ở bước sách). Bài 22 của Công nghệ 10, Bài 10 của Công nghệ 11 là bài dự án; bài thực hành của Công nghệ 12 không có
// chủ đề riêng.
const CHUONG_10 = ["Đại cương về công nghệ", "Vẽ kĩ thuật", "Thiết kế kĩ thuật"];
const CHUONG_11 = ["Giới thiệu chung về cơ khí chế tạo", "Vật liệu cơ khí", "Các phương pháp gia công cơ khí", "Sản xuất cơ khí", "Giới thiệu chung về cơ khí động lực",
  "Động cơ đốt trong", "Ô tô"];
const BAI_10 = ["Công nghệ và đời sống", "Hệ thống kĩ thuật", "Công nghệ phổ biến", "Một số công nghệ mới", "Đánh giá công nghệ", "Cách mạng công nghiệp",
  "Ngành nghề kĩ thuật, công nghệ", "Bản vẽ kĩ thuật và tiêu chuẩn trình bày bản vẽ kĩ thuật", "Hình chiếu vuông góc", "Hình cắt và mặt cắt", "Hình chiếu trục đo",
  "Hình chiếu phối cảnh", "Biểu diễn quy ước ren", "Bản vẽ cơ khí", "Bản vẽ xây dựng", "Vẽ kĩ thuật với sự trợ giúp của máy tính", "Khái quát về thiết kế kĩ thuật",
  "Quy trình thiết kế kĩ thuật", "Những yếu tố ảnh hưởng đến thiết kế kĩ thuật", "Nguyên tắc thiết kế kĩ thuật", "Phương pháp, phương tiện hỗ trợ thiết kế kĩ thuật",
  "Dự án: Thiết kế sản phẩm đơn giản"];
const BAI_11 = ["Khái quát về cơ khí chế tạo", "Ngành nghề trong lĩnh vực cơ khí chế tạo", "Tổng quan về vật liệu cơ khí", "Vật liệu kim loại và hợp kim",
  "Vật liệu phi kim loại", "Vật liệu mới", "Khái quát về gia công cơ khí", "Một số phương pháp gia công cơ khí", "Quy trình công nghệ gia công chi tiết",
  "Dự án: Chế tạo sản phẩm bằng phương pháp gia công cắt gọt", "Quá trình sản xuất cơ khí", "Dây chuyền sản xuất tự động với sự tham gia của robot",
  "Tự động hoá quá trình sản xuất dưới tác động của Cách mạng công nghiệp lần thứ 4", "An toàn lao động và bảo vệ môi trường trong sản xuất cơ khí",
  "Khái quát về cơ khí động lực", "Ngành nghề trong lĩnh vực cơ khí động lực", "Đại cương về động cơ đốt trong", "Nguyên lí làm việc của động cơ đốt trong",
  "Các cơ cấu trong động cơ đốt trong", "Các hệ thống trong động cơ đốt trong", "Khái quát chung về ô tô", "Hệ thống truyền lực", "Bánh xe và hệ thống treo",
  "Hệ thống lái", "Hệ thống phanh và an toàn khi tham gia giao thông"];
// Công nghệ 12 – Công nghệ điện – điện tử: [tên bài, số bài]; Bài 1–12 phần Công nghệ điện, Bài 13–26 phần Công nghệ điện tử (Bài 17, 20, 23,
// 26 thực hành)
const BAI_12 = [["Giới thiệu tổng quan về kĩ thuật điện", 1], ["Ngành nghề trong lĩnh vực kĩ thuật điện", 2], ["Mạch điện xoay chiều ba pha", 3], ["Hệ thống điện quốc gia", 4],
  ["Sản xuất điện năng", 5], ["Mạng điện sản xuất quy mô nhỏ", 6], ["Mạng điện hạ áp dùng trong sinh hoạt", 7], ["Hệ thống điện trong gia đình", 8],
  ["Thiết bị điện trong hệ thống điện gia đình", 9], ["Thiết kế và lắp đặt mạch điện điều khiển trong gia đình", 10], ["An toàn điện", 11], ["Tiết kiệm điện năng", 12],
  ["Khái quát về kĩ thuật điện tử", 13], ["Ngành nghề và dịch vụ trong lĩnh vực kĩ thuật điện tử", 14], ["Điện trở, tụ điện và cuộn cảm", 15],
  ["Diode, transistor và mạch tích hợp IC", 16], ["Giới thiệu về điện tử tương tự", 18], ["Khuếch đại thuật toán", 19], ["Tín hiệu số và các cổng logic cơ bản", 21],
  ["Một số mạch xử lí tín hiệu trong điện tử số", 22], ["Khái quát về vi điều khiển", 24], ["Bo mạch lập trình vi điều khiển", 25]];
const THUC_HANH_12 = [17, 20, 23, 26];
// chủ đề Công nghệ 12: đúng chữ chủ đề của ba kho Công nghệ 12 (tên bài của sách)
const KHO = BANKS.filter((b) => b.file === "12-congnghe.js" && b.pool), CD_KHO = new Set(KHO.flatMap((b) => Object.keys(b.pool.matrix)));
assert.deepEqual([...CD_KHO].sort(), BAI_12.map((b) => b[0]).sort(), "chủ đề của ba kho Công nghệ 12 là mọi bài (trừ bài thực hành) của sách");
const soBai = (t) => (BAI_12.find((b) => b[0] === t) || [])[1];
// nhóm của câu: "10", "11", "điện" (Bài 1–12), "điện tử" (Bài 13–25)
const NHOM = ["10", "11", "điện", "điện tử"];
const nhom = (t) => (/^Lớp 10 · /.test(t) && CHUONG_10.includes(t.slice(9)) ? "10" : /^Lớp 11 · /.test(t) && CHUONG_11.includes(t.slice(9)) ? "11" :
  CD_KHO.has(t) ? (soBai(t) <= 12 ? "điện" : "điện tử") : null);
const thuTuCD = (t) => (nhom(t) === "10" ? CHUONG_10.indexOf(t.slice(9)) : nhom(t) === "11" ? CHUONG_11.indexOf(t.slice(9)) : soBai(t));
DE.flatMap((b) => b.questions).forEach((q) => assert.ok(("chu-de:12:congnghe:" + q.topic).length <= 80, "mã đề “Ôn chủ đề” quá 80 kí tự: " + q.topic));

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
      const got = q.type === "tf4" ? q.a : q.o[0];
      assert.strictEqual(JSON.stringify(got), JSON.stringify(want), "đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
      if (q.type === "mc") {
        assert.ok(new Set(q.o).size === 4 && q.o.length === 4, "bốn lựa chọn khác nhau");
        const L = Math.max(...q.o.slice(1).map((o) => o.length)); assert.ok(q.o[0].length <= Math.max(1.2 * L, L + 8), "đáp án đúng dài hơn hẳn lựa chọn sai");
      }
      if (q.type === "tf4") {
        assert.ok(q.o.length === 4 && q.a.includes(true) && q.a.includes(false), "đúng/sai 4 ý có cả ý đúng và ý sai");
        // lời giải ghi “a) Đúng: …”, “b) Sai: …” theo đúng đáp án
        q.a.forEach((a, k) => assert.ok(q.x.includes("abcd"[k] + ") " + (a ? "Đúng" : "Sai") + ":"), "lời giải ghi “" + "abcd"[k] + ") " + (a ? "Đúng" : "Sai") + ":”"));
      }
      if (q.svg) assert.ok(daDoc.has(q.svg), "hình chưa được đọc lại");
    } catch (e) { throw new Error(at + ": " + e.message + "\n" + e.stack.split("\n").slice(1, 3).join("\n")); }
    n++;
  });
});
assert.deepEqual(Object.keys(RIENG).sort(), DE.map((b) => b.id).sort(), "RIENG có đúng các đề thi thử của danh mục");
assert.deepEqual(Object.entries(RIENG).flatMap(([id, ck]) => ck.filter((c) => !dung.has(c)).map((c) => id + ": " + c.has)), [], "có mục kiểm tra không khớp câu nào");
const chu = (q) => [q.q, q.x].concat(q.o || []).map(String);

/* ---------- khung đề (Quyết định 764/QĐ-BGDĐT; ma trận đề tham khảo năm 2025): danh mục, phần, điểm, mức độ, phạm vi, lời dặn ---------- */
const KIEU = {};
// số câu mỗi mức (Biết, Hiểu, Vận dụng) của từng nhóm ở Phần I
const MUC_NHOM = { "10": [2, 1, 1], "11": [2, 1, 1], "điện": [4, 3, 1], "điện tử": [4, 3, 1] };
DE.forEach((b) => {
  const at = b.id, qs = b.questions, so_ = soDe(b.id);
  assert.deepEqual([b.title, b.grade, b.subject, b.minutes, b.pts, b.file, !!b.pool, b.auto], ["Công nghệ 12 · Thi thử tốt nghiệp · Đề " + so_, 12, "Công nghệ", 50, 10, "12-congnghe.js", false, undefined], at + ": danh mục");
  assert.ok(TN && TN.banks.includes(b.id) && TN.grades.includes(12) && TN.subjects.includes("Công nghệ"), at + ": phải gắn vào tn-thpt-2027");
  let k = 0;
  KHUNG.forEach(([part, type, n_, pt]) => { const ph = qs.slice(k, k + n_); k += n_;
    assert.ok(ph.length === n_ && ph.every((q) => q.part === part && q.type === type && q.pt === pt), at + ": " + part + " gồm " + n_ + " câu " + type + ", mỗi câu " + pt + " điểm"); });
  assert.equal(k, qs.length, at + ": đề có đúng 28 câu theo khung 24 – 4");
  const G = Quiz.grade(qs, qs.map(() => null));
  assert.ok(G.max === 10 && G.got === 0, at + ": Quiz.grade: tối đa 10 điểm");
  assert.deepEqual(G.parts.map((p) => [p.part, p.max]), [[P1, 6], [P2, 4]], at + ": điểm tối đa từng phần 6 – 4");
  qs.forEach((q, i) => assert.ok(nhom(q.topic), at + "#" + (i + 1) + ": chủ đề lạ “" + q.topic + "”"));
  const p1 = qs.slice(0, 24), p2 = qs.slice(24);
  const muc = (ds, g) => [1, 2, 3].map((v) => ds.filter((q) => q.lv === v && (!g || nhom(q.topic) === g)).length);
  assert.deepEqual(p1.map((q) => q.lv), [...Array(12).fill(1), ...Array(8).fill(2), ...Array(4).fill(3)], at + ": Phần I câu 1–12 Biết, 13–20 Hiểu, 21–24 Vận dụng");
  NHOM.forEach((g) => assert.deepEqual(muc(p1, g), MUC_NHOM[g], at + ": số câu mỗi mức của nhóm " + g + " ở Phần I"));
  // Phần II: câu 1, 2 phần Công nghệ điện, câu 3, 4 phần Công nghệ điện tử, mỗi phần theo thứ tự bài; mức 1, 2, 3, 3
  assert.deepEqual(p2.map((q) => nhom(q.topic)), ["điện", "điện", "điện tử", "điện tử"], at + ": Phần II hai câu phần Công nghệ điện rồi hai câu phần Công nghệ điện tử");
  assert.ok(soBai(p2[0].topic) < soBai(p2[1].topic) && soBai(p2[2].topic) < soBai(p2[3].topic), at + ": Phần II theo thứ tự bài");
  assert.deepEqual(p2.map((q) => q.lv).sort(), [1, 2, 3, 3], at + ": Phần II bốn câu ghi mức 1, 2, 3, 3");
  // mỗi bài Công nghệ 12, mỗi chương lớp 10, 11 nhiều nhất hai câu
  [...new Set(qs.map((q) => q.topic))].forEach((t) => assert.ok(qs.filter((q) => q.topic === t).length <= 2, at + ": chủ đề “" + t + "” quá hai câu"));
  // thứ tự Phần I: theo mức, trong mỗi mức lớp 10, lớp 11, phần điện, phần điện tử, rồi chương, bài
  const kh = (q) => q.lv * 10000 + NHOM.indexOf(nhom(q.topic)) * 100 + thuTuCD(q.topic);
  p1.map(kh).forEach((x, i, v) => i && assert.ok(x >= v[i - 1], at + ": thứ tự câu trong Phần I (câu " + (i + 1) + ")"));
  // lời dặn: định hướng, số câu mỗi lớp, mỗi phần tính từ dữ liệu
  const c = (ds, g) => ds.filter((q) => nhom(q.topic) === g).length;
  ["Quyết định 764/QĐ-BGDĐT", "thí điểm thi trên máy tính", "Môn Công nghệ có hai đề thi riêng: đề định hướng Công nghiệp và đề định hướng Nông nghiệp",
    "Đây là đề định hướng Công nghiệp (Công nghệ 10 – Thiết kế và công nghệ, Công nghệ 11 – Công nghệ cơ khí, Công nghệ 12 – Công nghệ điện – điện tử)",
    "học định hướng Nông nghiệp (Công nghệ 12 – Lâm nghiệp – Thuỷ sản) thì không làm đề này",
    `ở đề này Phần I có ${c(p1, "10")} câu Công nghệ 10, ${c(p1, "11")} câu Công nghệ 11 và ${c(p1, "điện") + c(p1, "điện tử")} câu Công nghệ 12 (${c(p1, "điện")} câu phần Công nghệ điện, ${c(p1, "điện tử")} câu phần Công nghệ điện tử)`,
    `${p2.length} câu của Phần II đều thuộc Công nghệ 12 (${c(p2, "điện")} câu phần Công nghệ điện, ${c(p2, "điện tử")} câu phần Công nghệ điện tử)`,
    `Đề có ${qs.length} câu, làm trong ${b.minutes} phút`, "Phần I gồm 24 câu nhiều lựa chọn (6 điểm, mỗi câu 0,25 điểm)", "Phần II gồm 4 câu đúng/sai, mỗi câu 4 ý (4 điểm)",
    "đề Công nghệ không có Phần III", "Đề không có câu tự chấm"].forEach((s) => assert.ok(b.note.includes(s), at + ": lời dặn thiếu “" + s + "”"));
  // đúng/sai 4 ý: trong một đề không lặp kiểu Đ/S
  const kieu = qs.filter((q) => q.type === "tf4").map((q) => q.a.map((a) => (a ? "Đ" : "S")).join(""));
  assert.equal(new Set(kieu).size, kieu.length, at + ": kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + kieu.join(", "));
  kieu.forEach((x) => (KIEU[x] = (KIEU[x] || 0) + 1));
  // đáp án đúng là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba và không dưới một phần sáu số câu nhiều lựa chọn của đề
  const mc = qs.filter((q) => q.type === "mc" && new Set(q.o.map((o) => o.length)).size > 1), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  const dai2 = mc.filter((q) => hon(q, (a, c_) => a > c_)).length, ngan = mc.filter((q) => hon(q, (a, c_) => a < c_)).length;
  assert.ok(dai2 * 3 <= mc.length && ngan * 3 <= mc.length && (dai2 + ngan) * 6 >= mc.length, at + `: đáp án đúng dài nhất ở ${dai2}, ngắn nhất ở ${ngan} trong ${mc.length} câu`);
  b._le = dai2 + ngan; b._mc = mc.length;
});
assert.ok(Object.values(KIEU).every((c) => c <= 3), "một kiểu Đ/S dùng quá ba lần trong các đề thi thử: " + JSON.stringify(KIEU));
// Đề 1–3 (Phiên N12-tn-congnghe): phủ đủ 3 chương Công nghệ 10, 7 chương Công nghệ 11 và mọi bài của ba kho Công nghệ 12
if (DE.length >= 3) {
  const ba = DE.slice(0, 3).flatMap((b) => b.questions);
  assert.deepEqual([...new Set(ba.filter((q) => nhom(q.topic) === "10").map((q) => q.topic.slice(9)))].sort(), [...CHUONG_10].sort(), "Đề 1–3 phủ đủ 3 chương Công nghệ 10");
  assert.deepEqual([...new Set(ba.filter((q) => nhom(q.topic) === "11").map((q) => q.topic.slice(9)))].sort(), [...CHUONG_11].sort(), "Đề 1–3 phủ đủ 7 chương Công nghệ 11");
  assert.deepEqual([...CD_KHO].filter((t) => !ba.some((q) => q.topic === t)), [], "Đề 1–3 phủ đủ các bài Công nghệ 12 của ba kho");
}
// câu nhiều lựa chọn: đáp án đúng không là lựa chọn duy nhất có chữ của nhãn chủ đề; ba lựa chọn sai không cùng mở đầu bằng một chữ mà đáp án đúng không có
{
  const chuThuong = (s) => String(s).normalize("NFC").toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean), loi = [];
  DE.forEach((b) => b.questions.forEach((q, i) => {
    if (q.type !== "mc") return;
    const at = b.id + "#" + (i + 1), c = chuThuong(q.topic.replace(/^Lớp 1[01] · /, ""));
    const tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|một|giữa|từ|đến|năm|nay|sau|người)( |$)/u.test(w));
    tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o).join(" ") + " ").includes(" " + w + " ")); if (co[0] && !co.slice(1).some(Boolean)) loi.push(`${at}: chỉ đáp án đúng có chữ “${w}” của nhãn chủ đề`); });
    const dau = q.o.map((o) => o.split(" ")[0]);
    if (dau.slice(1).every((d) => d === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1) loi.push(at + ": ba lựa chọn sai cùng mở đầu bằng “" + dau[1] + "”");
  }));
  assert.deepEqual(loi, [], "câu nhiều lựa chọn có gợi ý từ chữ của lựa chọn:\n" + loi.join("\n"));
}

/* ---------- chữ ---------- */
{
  const loi = [], kt = (ok, m) => ok || loi.push(m);
  DE.forEach((b) => b.questions.map((q) => [b.id + ": " + q.q.slice(0, 50), chu(q)]).concat([[b.id + ": lời dặn", [b.note]]]).forEach(([at, ss]) => ss.forEach((s) => {
    // số ngăn hàng nghìn bằng khoảng trắng, dấu phẩy thập phân (năm 1800–2099 viết liền)
    kt(!/(?<![,\d])\d{5,}/.test(s) && [...s.matchAll(/(?<![\d,])\d{4}(?![\d,])/g)].every((x) => /^(18|19|20)\d\d$/.test(x[0])) && !/\d\.\d/.test(s), at + ": số viết sai cách: " + s.slice(0, 120));
    // dấu thanh kiểu sách: oa, oe, uy không có phụ âm cuối đặt dấu ở nguyên âm sau (hoá, khoẻ, thuỷ, tuỳ); kĩ, lí
    kt(!/[òóỏõọ][ae](?![\p{L}])|[ùúủũụ]y(?![\p{L}])|(?<![\p{L}])(?:kỹ|lý)(?![\p{L}])/iu.test(s), at + ": dấu thanh kiểu mới: " + s.slice(0, 120));
    kt(!/(?<![\p{L}])(?:huyện|63 tỉnh|64 tỉnh|cấp huyện)(?![\p{L}])/iu.test(s), at + ": đơn vị hành chính cũ: " + s.slice(0, 120));
    kt(!/(phương án|lựa chọn|ý) (thứ|số) (nhất|hai|ba|tư|\d)|phương án [A-D]\b/.test(s), at + ": nhắc vị trí của phương án (app xáo phương án): " + s.slice(0, 120));
  })));
  assert.deepEqual(loi, [], "chữ viết khác quy ước:\n" + loi.join("\n"));
}

/* ---------- so với ba kho Công nghệ 12 và giữa các đề thi thử: đề bài không trùng, không gần trùng; đáp án không trùng câu cùng chủ đề ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
const ten = new Map();
DE.forEach((b) => b.questions.forEach((q, i) => ten.set(q, b.id.replace("congnghe12-", "") + "#" + (i + 1))));
const KHO_Q = BANKS.filter((b) => b.file === "12-congnghe.js" && !b.pool && !/^congnghe12-tn-/.test(b.id)).flatMap((b) => b.questions.map((q, i) => { ten.set(q, b.id.replace("congnghe12-", "") + "#" + (i + 1)); return Object.assign(q, { _de: b.id }); }));
const TNQ = DE.flatMap((b) => b.questions.map((q) => Object.assign(q, { _de: b.id })));

// tên riêng nhiều chữ (người, linh kiện, bo mạch, địa danh): mỗi tên tính là một từ khi so với chữ của sách và của kho khác
const GOP = ["Michael Faraday", "John Ambrose Fleming", "George Boole", "Arduino Uno", "Việt Nam", "Bắc – Nam"];
// cụm từ chung của môn: tên sách, tên chương, tên bài, thuật ngữ, cách nói chung của đề (thay bằng dấu ngăn trước khi so)
const TU_CHUNG = [...CHUONG_10, ...CHUONG_11, ...BAI_10, ...BAI_11, ...BAI_12.map((b) => b[0]),
  "mỗi ý sau đúng hay sai", "nào sau đây", "nào dưới đây", "trong hình",
  "đề thi thử theo cấu trúc đề thi tốt nghiệp thpt từ năm 2025", "năm 2027 thí điểm thi trên máy tính ở nơi đủ điều kiện, đề như thi giấy",
  "phần i gồm 24 câu nhiều lựa chọn (6 điểm, mỗi câu 0,25 điểm)", "phần ii gồm 4 câu đúng/sai, mỗi câu 4 ý (4 điểm)",
  "app chấm tự động cả hai phần như đề thật", "đúng 1, 2, 3 hay cả 4 ý của một câu thì câu đó được 0,1; 0,25; 0,5 hay 1 điểm",
  "đề không có câu tự chấm, nên điểm lưu ở mục kết quả là điểm của cả đề",
  // tên sách, định hướng
  "Công nghệ 10 – Thiết kế và công nghệ", "Công nghệ 11 – Công nghệ cơ khí", "Công nghệ 12 – Công nghệ điện – điện tử", "Công nghệ 12 – Lâm nghiệp – Thuỷ sản",
  "định hướng Công nghiệp", "định hướng Nông nghiệp", "phần Công nghệ điện tử", "phần Công nghệ điện",
  // phần điện: lưới điện, tủ điện, thiết bị, thông số như sách (Bài 3–12)
  "điện áp dây", "điện áp pha", "dòng điện dây", "dòng điện pha", "dây trung tính", "dây pha", "nối hình sao", "nối hình tam giác", "lưới điện truyền tải",
  "lưới điện phân phối", "trạm biến áp", "tủ điện phân phối tổng", "tủ điện phân phối nhánh", "tủ điện phân phối khu vực", "tủ điện động lực", "tủ điện chiếu sáng",
  "mạng điện hạ áp", "hệ số công suất", "hệ số an toàn", "mật độ dòng điện cho phép", "dòng điện định mức", "cấp chính xác", "nhãn năng lượng", "bình nóng lạnh",
  "máy biến áp", "cảm ứng điện từ", "bút thử điện", "aptomat tổng",
  // tên nhóm nghề, dịch vụ (Bài 2, Bài 14)
  "thiết kế điện", "lắp đặt điện", "vận hành điện", "bảo dưỡng điện", "sửa chữa điện", "sản xuất, chế tạo thiết bị điện",
  "thiết kế thiết bị điện tử", "sản xuất, chế tạo thiết bị điện tử", "lắp đặt thiết bị điện tử", "vận hành thiết bị điện tử", "bảo dưỡng và sửa chữa thiết bị điện tử",
  "dịch vụ viễn thông", "dịch vụ tài chính", "dịch vụ trong giao thông", "dịch vụ trong đào tạo",
  // phần điện tử: linh kiện, mạch, khối chức năng như sách (Bài 15–25)
  "đồng hồ vạn năng", "khuếch đại thuật toán", "lối vào đảo", "lối vào không đảo", "lối ra", "điện áp ngưỡng", "mạch so sánh đảo", "mạch cộng đảo", "mạch cộng không đảo",
  "hệ số khuếch đại", "mạch logic tổ hợp", "bảng chân lí", "cổng logic", "tín hiệu số", "bộ đếm nhị phân", "xung nhịp", "bộ xử lí trung tâm", "khối truyền thông",
  "khối dao động", "khối nguồn", "khối tín hiệu vào/ra", "điện tử tương tự", "điện tử số",
  // Công nghệ 10, 11: thuật ngữ như sách
  "hệ thống kĩ thuật", "kiểm chứng giải pháp", "hình chiếu trục đo xiên góc cân", "hệ số biến dạng", "thể tích buồng cháy", "thể tích công tác", "thể tích toàn phần",
  "tỉ số nén", "bán kính quay của trục khuỷu", "hành trình pít tông", "hệ thống truyền lực", "máy công tác", "nguồn động lực", "bệnh nghề nghiệp", "tai nạn lao động",
  // nhóm công việc của cơ khí chế tạo (Công nghệ 11, Bài 2)
  "thiết kế sản phẩm cơ khí", "gia công cơ khí", "lắp ráp sản phẩm cơ khí", "bảo dưỡng và sửa chữa thiết bị cơ khí"];
const boDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP_ = GOP.map(boDau).sort((a, b) => b.length - a.length), TU_CHUNG_ = TU_CHUNG.map((p) => " " + boDau(p) + " ").sort((a, b) => b.length - a.length);
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
const khongDau = nhoChuoi((s) => {
  let t = " " + boDau(s) + " ";
  TU_CHUNG_.forEach((p) => { while (t.includes(p)) t = t.replace(p, " | "); });
  GOP_.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); });
  return t.replace(/[aeiouy]+/g, "a").replace(/\s+/g, " ").trim();
});
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
{
  const ds = BANKS.filter((b) => b.file === "12-congnghe.js" && !b.pool).flatMap((b) => b.questions.map((q) => ({ q, k: gocChu(q.q) })));
  TNQ.forEach((q) => assert.deepEqual(ds.filter((e) => e.k === gocChu(q.q)).map((e) => ten.get(e.q)), [ten.get(q)], "đề bài trùng câu khác trong 12-congnghe.js"));
  // cặp hai âm tiết liền nhau (như tests/tin12-tn.js): đề bài cùng các lựa chọn có từ 4 cặp chung với một câu của ba kho và số cặp chung từ
  // một nửa số cặp của câu ít cặp hơn thì báo; không tính cặp có số hay chữ đơn, cặp của nhãn chủ đề, cụm chung và cặp có ở từ 3% số câu của
  // file. Giữa các đề thi thử chỉ so chuỗi 6 từ.
  const CUM = ["mỗi ý sau đúng hay sai", "nào sau đây", "nào dưới đây", "trong hình"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c_) => { t = t.split(c_).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c_) => c_.split(" ").every((x) => /\p{L}{2}/u.test(x))); };
  const ca = KHO_Q.concat(TNQ), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c_) => (df[c_] = (df[c_] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c_) => !nhan.has(c_) && df[c_] < 0.03 * ca.length)); };
  const gan_ = [], gan6 = [], trung = [];
  TNQ.forEach((q) => {
    const c = capAm(q);
    KHO_Q.concat(TNQ.filter((p) => p._de !== q._de)).forEach((p) => {
      const d = capAm(p), chung = [...c].filter((x) => d.has(x));
      if (!/^congnghe12-tn-/.test(p._de) && chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size)) gan_.push(`${ten.get(q)} ~ ${ten.get(p)}: ${chung.join(", ")}`);
      const s = " " + khongDau(p.q) + " "; chuoi(q.q, 6).forEach((x) => { if (s.includes(" " + x + " ")) gan6.push(ten.get(q) + " ~ " + ten.get(p) + ": " + x); });
      if (p.topic !== q.topic) return;
      if (q.type === "mc" && p.type === "mc" && gocChu(q.o[0]) === gocChu(p.o[0])) trung.push(ten.get(q) + " ~ " + ten.get(p) + ": đáp án trùng câu cùng chủ đề");
    });
  });
  assert.deepEqual([...new Set(gan_)], [], "đề bài gần trùng (cặp hai âm tiết) câu khác:\n" + [...new Set(gan_)].join("\n"));
  assert.deepEqual([...new Set(gan6)], [], "đề bài gần trùng (chuỗi 6 từ) câu khác:\n" + [...new Set(gan6)].join("\n"));
  assert.deepEqual(trung, [], "đáp án trùng câu cùng chủ đề:\n" + trung.join("\n"));
}

/* ---------- dò lộ đáp án (như tests/tin12-tn.js) ----------
   Đề cố định: mọi câu cùng hiện, lời dặn hiện ở màn mở đề; đề “Ôn chủ đề” rút chung câu cùng chủ đề của các đề thi thử và ba kho Công nghệ 12.
   Như tests/soat-nhap.js: đáp án là một số thì tìm số đó ở vị trí kết quả của câu kia (ngay sau “=”, “là”, “bằng”, “được”): không được có;
   đáp án khác: số không nguyên hay từ 10 trở lên trong đáp án tìm như vậy, chữ của đáp án tách thành các chuỗi 3 từ liền nhau (đáp án từ 3 từ
   trở xuống thì lấy cả đáp án); chuỗi có ở từ hai lựa chọn sai thì không chỉ ra được lựa chọn đúng nên bỏ; chuỗi có trong đề bài, lựa chọn,
   lời giải của câu kia thì in ra với DO_LO=1 để xem tay, danh sách đã xem ở DA_XEM. */
const KQ = new RegExp("(?:=|(?:^|[\\s(])(?:là|bằng|được))\\s+(" + NUM + ")(?![\\d,])", "gu");
const kqSo = (s) => [...String(s).matchAll(KQ)].map((x) => val(x[1]));
const tuCua = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/[\]{}]/g, " ").split(/\s+/).filter(Boolean);
const cum3 = (s) => { const w = tuCua(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
// chuỗi 3 từ chung của môn (thuật ngữ, cách nói của bài học) không làm lộ đáp án nào: bỏ qua khi là một phần của đáp án dài hơn
const CUM_CHUNG = new Set(["trạm biến áp", "dây trung tính", "thiết bị điện", "bị điện tử", "dòng điện một", "điện một chiều", "dòng điện xoay", "điện xoay chiều",
  "dòng một chiều", "dòng xoay chiều", "tủ điện động", "điện động lực", "điện phân phối", "lưới điện phân", "380 220 v", "vi điều khiển", "biên độ tín",
  "độ tín hiệu", "tín hiệu vào", "của chương trình", "bộ xử lí", "xử lí trung", "lí trung tâm", "và công nghệ", "chiều đi qua"]);
const chuP = (p) => (p.type === "note" ? [p.x] : chu(p));
const NOTES = DE.map((b) => { const o = { q: b.id + "-note", x: b.note, topic: "note", type: "note", _de: b.id }; ten.set(o, b.id.replace("congnghe12-", "") + "-note"); return o; });
const laSo = (q) => q.type === "mc" && /^[−-]?\d[\d ]*(,\d+)?$/.test(String(q.o[0]).trim());
const soCua = (q) => (laSo(q) ? [+String(q.o[0]).trim().replace(/ /g, "").replace("−", "-").replace(",", ".")] : q.type === "mc" ? [...String(q.o[0]).matchAll(new RegExp(NUM, "gu"))].map((x) => val(x[0])).filter((v) => !Number.isInteger(v) || Math.abs(v) >= 10) : []);
const doLo = (qs, them, cap) => {
  const lo = [], chuLo = [];
  qs.forEach((q) => {
    let C = [];
    const soDa = soCua(q);
    if (q.type === "mc" && !laSo(q)) { const c3 = cum3(q.o[0]), sai = q.o.slice(1).map((o) => " " + tuCua(o).join(" ") + " ");
      C = [...new Set(c3.length > 1 ? c3.filter((c) => !CUM_CHUNG.has(c)) : c3)].filter((c) => sai.filter((o) => o.includes(" " + c + " ")).length < 2); }
    qs.concat(them).forEach((p) => {
      if (p === q || !cap(p, q)) return;
      const at = `${ten.get(p)} → ${ten.get(q)}: `, T = " " + chuP(p).map((s) => tuCua(s).join(" ")).join(" | ") + " ";
      soDa.filter((d) => chuP(p).flatMap(kqSo).some((y_) => gan(y_, d))).forEach((d) => lo.push(at + d));
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => chuLo.push(at + c));
    });
  });
  return { lo, chuLo: [...new Set(chuLo)] };
};
// trong một đề (mọi câu cùng hiện) và với lời dặn của đề
const r1 = doLo(TNQ, NOTES, (p, q) => p._de === q._de);
// cùng chủ đề (đề “Ôn chủ đề”): câu của đề thi thử với câu cùng chủ đề của đề thi thử khác và của ba kho (trừ câu tự luận)
const onCD = TNQ.concat(KHO_Q.filter((q) => q.type !== "essay" && TNQ.some((t) => t.topic === q.topic)));
const r2 = doLo(onCD, [], (p, q) => p.topic === q.topic && p._de !== q._de && (/^congnghe12-tn-/.test(p._de) || /^congnghe12-tn-/.test(q._de)));
if (process.env.DO_LO) console.log("Đáp án bằng chữ có ở câu khác (xem tay):\n" + [...r1.chuLo, ...r2.chuLo].join("\n"));
// Đã xem tay (Phiên N12-tn-congnghe): chữ của đáp án có ở câu khác nhưng không chỉ ra đáp án.
const DA_XEM = [
  // câu cùng chủ đề có chung bộ lựa chọn là tên nhóm dịch vụ, nhóm nghề (Bài 14); lời giải của mỗi câu chỉ giải thích tình huống của câu đó
  "gk2-de2#5 → tn-de1#10: dịch vụ viễn", "gk2-de2#5 → tn-de1#10: vụ viễn thông",
  "tn-de1#10 → gk2-de2#5: dịch vụ trong", "tn-de1#10 → gk2-de2#5: vụ trong giao", "tn-de1#10 → gk2-de2#5: trong giao thông",
  "gk2-de1#4 → tn-de2#18: thiết kế thiết", "gk2-de1#4 → tn-de2#18: kế thiết bị", "gk2-de2#6 → tn-de2#18: thiết kế thiết", "gk2-de2#6 → tn-de2#18: kế thiết bị",
  "ck2-de1#2 → tn-de2#18: thiết kế thiết", "ck2-de1#2 → tn-de2#18: kế thiết bị", "ck2-de2#2 → tn-de2#18: thiết kế thiết", "ck2-de2#2 → tn-de2#18: kế thiết bị",
  "tn-de3#19 → tn-de2#18: thiết kế thiết", "tn-de3#19 → tn-de2#18: kế thiết bị",
  "tn-de2#18 → gk2-de1#4: bảo dưỡng và", "tn-de2#18 → gk2-de1#4: dưỡng và sửa", "tn-de2#18 → gk2-de1#4: và sửa chữa", "tn-de2#18 → gk2-de1#4: sửa chữa thiết",
  "tn-de2#18 → gk2-de1#4: chữa thiết bị", "tn-de2#18 → gk2-de2#6: vận hành thiết", "tn-de2#18 → gk2-de2#6: hành thiết bị",
  "tn-de2#18 → ck2-de2#2: lắp đặt thiết", "tn-de2#18 → ck2-de2#2: đặt thiết bị",
  "gk2-de1#4 → tn-de3#19: sản xuất chế", "gk2-de1#4 → tn-de3#19: xuất chế tạo", "gk2-de1#4 → tn-de3#19: chế tạo thiết", "gk2-de1#4 → tn-de3#19: tạo thiết bị",
  "gk2-de2#6 → tn-de3#19: sản xuất chế", "gk2-de2#6 → tn-de3#19: xuất chế tạo", "gk2-de2#6 → tn-de3#19: chế tạo thiết", "gk2-de2#6 → tn-de3#19: tạo thiết bị",
  "ck2-de2#2 → tn-de3#19: sản xuất chế", "ck2-de2#2 → tn-de3#19: xuất chế tạo", "ck2-de2#2 → tn-de3#19: chế tạo thiết", "ck2-de2#2 → tn-de3#19: tạo thiết bị",
  "tn-de3#19 → gk2-de1#4: bảo dưỡng và", "tn-de3#19 → gk2-de1#4: dưỡng và sửa", "tn-de3#19 → gk2-de1#4: và sửa chữa", "tn-de3#19 → gk2-de1#4: sửa chữa thiết",
  "tn-de3#19 → gk2-de1#4: chữa thiết bị", "tn-de3#19 → ck2-de2#2: lắp đặt thiết", "tn-de3#19 → ck2-de2#2: đặt thiết bị",
  // nhóm công việc “lắp đặt điện” (Bài 2) là lựa chọn sai của câu thi thử; câu kho hỏi vị trí việc làm của người thi công
  "tn-de3#15 → ck1-de1#4: lắp đặt điện",
  // câu kho hỏi đường dây nào thuộc lưới truyền tải; câu thi thử hỏi năm hoàn thành đường dây 500 kV, hỏi cấp cao áp (lựa chọn có “… kV và 220 kV”)
  "tn-de2#6 → ck1-de1#9: đường dây 500", "tn-de2#6 → ck1-de1#9: dây 500 kv",
  "ck1-de1#9 → tn-de3#16: kv và 220", "ck1-de1#9 → tn-de3#16: và 220 kv", "tn-de3#16 → ck1-de1#9: kv và 220", "tn-de3#16 → ck1-de1#9: và 220 kv",
  // câu kho hỏi chân có dấu “−” của kí hiệu; câu thi thử tả cách nối mạch trừ, không nói về kí hiệu
  "tn-de2#28 → gk2-de1#23: lối vào đảo",
  // câu kho nêu tên “thành phố thông minh” trong một ý về đèn đường hẹn giờ; câu thi thử tả một tình huống khác, các lựa chọn đều là mô hình “thông minh”
  "gk2-de2#3 → tn-de3#18: thành phố thông", "gk2-de2#3 → tn-de3#18: phố thông minh",
  // tên cổng logic có ở mọi câu về cổng logic; câu thi thử hỏi cổng cho máy dập chạy khi bấm cả hai nút
  "ck2-de1#10 → tn-de3#20: cổng and", "ck2-de1#12 → tn-de3#20: cổng and", "ck2-de2#10 → tn-de3#20: cổng and", "ck2-de2#12 → tn-de3#20: cổng and",
  "ck2-de2#13 → tn-de3#20: cổng and", "tn-de1#28 → tn-de3#20: cổng and", "tn-de3#20 → ck2-de1#10: cổng nor",
];
assert.deepEqual([...r1.chuLo, ...r2.chuLo].sort(), [...DA_XEM].sort(), "đáp án bằng chữ có ở câu khác đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
assert.deepEqual([...r1.lo, ...r2.lo], [], "lộ đáp án:\n" + [...r1.lo, ...r2.lo].join("\n"));

/* ---------- không chép sách: so với chữ OCR của mọi cuốn ở OnUp-Book (nếu có); tên chương, tên bài theo mục lục ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const truongChu = (q) => (q.type === "note" ? [q.x] : chu(q));
// tra nhanh: các chuỗi k từ của chữ đề thi thử (Map chuỗi → các câu), đi một lượt qua chữ nguồn đã chuẩn hoá; trả về Map chuỗi → các mã nguồn có chuỗi đó
const chuoiDe = (k) => { const m = new Map(); TNQ.concat(NOTES).forEach((q) => new Set(truongChu(q).flatMap((x) => chuoi(x, k))).forEach((c) => { if (!m.has(c)) m.set(c, []); m.get(c).push(q); })); return m; };
const timChuoi = (nguon, k, ds) => {
  const dau = new Set([...ds.keys()].map((c) => c.split(" ").slice(0, 2).join(" "))), ra = new Map();
  nguon.forEach(({ id, t }) => { const w = t.split(" "); for (let i = 0; i + k <= w.length; i++) { if (!dau.has(w[i] + " " + w[i + 1])) continue; const c = w.slice(i, i + k).join(" ");
    if (ds.has(c)) { if (!ra.has(c)) ra.set(c, new Set()); ra.get(c).add(id); } } });
  return ra;
};
if (SACH.length) {
  const CUON = { 10: "lop-10/cong-nghe-10-thiet-ke-va-cong-nghe", 11: "lop-11/cong-nghe-11-cong-nghe-co-khi", 12: "lop-12/cong-nghe-12-cong-nghe-dien-dien-tu" };
  assert.ok(Object.values(CUON).every((c) => SACH.some((f) => f.includes(c))), "OnUp-Book có Công nghệ 10 – Thiết kế và công nghệ, Công nghệ 11 – Công nghệ cơ khí, Công nghệ 12 – Công nghệ điện – điện tử");
  // mục lục: chỉ đọc mục “## Mục lục” của README; chương “**Chương I. TÊN**” (chữ in hoa), bài “Bài N. Tên |”
  const ml = (c) => { const f = path.join(BOOK, c, "README.md"); assert.ok(fs.existsSync(f), "có README của " + c); const r = fs.readFileSync(f, "utf8"), i = r.indexOf("## Mục lục");
    assert.ok(i >= 0, c + ": README có mục lục"); return r.slice(i, (r.indexOf("\n## ", i + 5) + 1 || r.length + 1) - 1); };
  const thuong = (s) => s.normalize("NFC").toLowerCase();
  const chuong = (c) => [...ml(c).matchAll(/\*\*Chương [IVX]+\. ([^*]+?)\*\*/g)].map((x) => thuong(x[1].trim()));
  const bai = (c) => [...ml(c).matchAll(/Bài (\d+)\. ([^|]+?) \|/g)].map((x) => [x[2].trim(), +x[1]]);
  assert.deepEqual(chuong(CUON[10]), CHUONG_10.map(thuong), "ba chương của Công nghệ 10 – Thiết kế và công nghệ theo mục lục");
  assert.deepEqual(chuong(CUON[11]), CHUONG_11.map(thuong), "bảy chương của Công nghệ 11 – Công nghệ cơ khí theo mục lục");
  assert.deepEqual(bai(CUON[10]).map((x) => x[0]), BAI_10, "bài của Công nghệ 10 theo mục lục");
  assert.deepEqual(bai(CUON[11]).map((x) => x[0]), BAI_11, "bài của Công nghệ 11 theo mục lục");
  assert.deepEqual(bai(CUON[12]).filter((x) => !THUC_HANH_12.includes(x[1])), BAI_12, "bài của Công nghệ 12 – Công nghệ điện – điện tử theo mục lục (trừ bài thực hành)");
  assert.ok(bai(CUON[12]).filter((x) => THUC_HANH_12.includes(x[1])).every((x) => /^Thực hành/.test(x[0])), "Bài 17, 20, 23, 26 là bài thực hành");
  const sach = SACH.map((f) => ({ id: f, t: khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " ")) }));
  const bao = (k) => { const ds = chuoiDe(k), gap = timChuoi(sach, k, ds); return [...gap.keys()].flatMap((c) => ds.get(c).map((q) => `${ten.get(q)}: ${c}`)); };
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách:\n" + [...new Set(bao(8))].join("\n"));
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách và mục lục.");
/* ---------- trùng ý với các kho khác (Rút ra N21): chuỗi 8 từ liền nhau trùng câu của kho khác, cả ba kho Công nghệ 12 và giữa các đề thi thử ---------- */
{
  const cua = (b, q) => ({ id: b.id, t: chu(q).map(khongDau).join(" | ") });
  const khac = BANKS.filter((b) => !b.pool).flatMap((b) => b.questions.map((q) => cua(b, q))).concat(BANKS.filter((b) => b.pool).flatMap((b) => b.questions.filter((q) => q.src === b.id).map((q) => cua(b, q))));
  const bao = (k) => { const ds = chuoiDe(k), gap = timChuoi(khac, k, ds);
    return [...gap.keys()].flatMap((c) => ds.get(c).flatMap((q) => [...gap.get(c)].filter((id) => id !== q._de).map((id) => `${ten.get(q)} ~ ${id}: ${c}`))); };
  if (process.env.DO_KHO) console.log("Chuỗi 6 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác:\n" + [...new Set(bao(8))].join("\n"));
}

/* ---------- tự thử các bộ tính, bộ đọc hình với câu cố ý viết sai ---------- */
{
  const hong = (f, m) => assert.throws(f, undefined, "tự thử: " + m);
  const muc = (id, has) => { const q = TNQ.find((x) => x._de === id && x.q.includes(has)); assert.ok(q, "tự thử: có câu “" + has + "”"); const c = RIENG[id].find((x) => q.q.includes(x.has)); return { q, c }; };
  const doi = (m, a, b) => { assert.ok(m.q.q.includes(a), "tự thử: đề có “" + a + "”"); return Object.assign({}, m.q, { q: m.q.q.replace(a, b) }); };
  // phép tính theo sách
  assert.ok(capAp(0.4) === "hạ áp" && capAp(35) === "trung áp" && capAp(110) === "cao áp" && capAp(220) === "cao áp" && capAp(500) === "siêu cao áp", "tự thử: cấp điện áp");
  assert.ok(luoiCua(110) === "phân phối" && luoiCua(220) === "truyền tải", "tự thử: lưới truyền tải, phân phối");
  assert.ok(Math.abs(dongDien(850, 220, 0.8) - 4.83) < 0.01 && chonLon([6, 10, 16, 20, 25, 32], 4.83 * 2) === 10 && chonLon([0.5, 0.75, 1, 1.5], 4.83 / 6) === 1, "tự thử: chọn aptomat, dây dẫn như ví dụ của sách");
  assert.ok(gan(congDao(3, 1, 1.6, 1, 1), -4.875) && gan(congKhongDao(10, 1, 1, 1, 1, 5), 33) && gan(tru(2, 10, 2, 10, 1, 5), 20), "tự thử: công thức cộng đảo, cộng không đảo, trừ");
  assert.ok(gan(docVongMau(["nâu", "xám", "đỏ", "nhũ vàng"]).R, 1800) && docVongMau(["nâu", "xám", "đỏ", "nhũ vàng"]).sai === 5, "tự thử: vạch màu");
  hong(() => docVongMau(["nâu", "xám", "tím", "nhũ vàng"]), "màu hệ số nhân không có trong bảng của sách");
  assert.ok(chuKi(3, 2) === 8 && chuKi(1, 0) === 2, "tự thử: chu kì ở lối ra của bộ đếm");
  // hàm logic
  assert.ok(giongNhau(docHam("Y = Ā · B + A · B̄"), (d) => d.A ^ d.B, ["A", "B"]) && !giongNhau(docHam("A + B"), (d) => d.A ^ d.B, ["A", "B"]), "tự thử: hàm logic");
  hong(() => docHam("Y = A ·"), "hàm logic viết thiếu");
  // mạch logic trong hình: vẽ lệch một dây, bỏ dấu đảo của cổng NOT, dấu đảo của cổng AND thì đáp án đổi
  const lg = muc("congnghe12-tn-de1", "Mạch logic trong hình");
  hong(() => docMach(lg.q.svg.replace('<line x1="160" y1="80" x2="200" y2="80"', '<line x1="160" y1="81" x2="200" y2="81"')), "dây nối lệch khỏi chân cổng");
  hong(() => docMach(lg.q.svg.replace('<circle cx="95" cy="130" r="5" fill="surface" stroke="ink" stroke-width="2"/>', "")), "cổng NOT thiếu dấu đảo");
  hong(() => lg.c.right(Object.assign({}, lg.q, { svg: lg.q.svg.replace('<circle cx="125" cy="55" r="5" fill="surface" stroke="ink" stroke-width="2"/>', "").replace('<line x1="130" y1="55" x2="160" y2="55"', '<line x1="120" y1="55" x2="160" y2="55"') })), "cổng NAND thành AND thì ý về mạch đổi");
  // đổi số liệu của đề thì đáp án tính được đổi theo hay không còn lựa chọn đúng
  const tl = muc("congnghe12-tn-de1", "đường kính một lỗ đo được"); hong(() => tl.c.right(doi(tl, "tỉ lệ 1 : 5", "tỉ lệ 1 : 2")), "đổi tỉ lệ của bản vẽ");
  const nen = muc("congnghe12-tn-de1", "Tỉ số nén"); hong(() => nen.c.right(doi(nen, "0,06 lít", "0,08 lít")), "đổi thể tích buồng cháy");
  const bp = muc("congnghe12-tn-de1", "mỗi cuộn dây chịu được điện áp định mức");
  assert.equal(bp.c.right(doi(bp, "điện áp định mức 380 V", "điện áp định mức 220 V")), "Nối hình sao, mỗi cuộn chịu đúng điện áp định mức", "tự thử: cuộn dây định mức 220 V thì nối hình sao");
  const mg = muc("congnghe12-tn-de1", "máy giặt"); assert.notDeepStrictEqual(mg.c.right(doi(mg, "6 A/mm²", "7 A/mm²")), mg.q.a, "tự thử: đổi mật độ dòng điện");
  const tn4 = muc("congnghe12-tn-de2", "bóng đèn pha"); hong(() => tn4.c.right(doi(tn4, "4 bóng đèn pha", "8 bóng đèn pha")), "đổi số bóng đèn");
  const dm = muc("congnghe12-tn-de2", "đếm từ 0 đến 3"); hong(() => dm.c.right(doi(dm, "800 Hz", "600 Hz")), "đổi tần số xung vào");
  const vx = muc("congnghe12-tn-de2", "Thể tích công tác của động cơ"); hong(() => vx.c.right(doi(vx, "D = 72 mm", "D = 80 mm")), "đổi đường kính xi lanh");
  const ct = muc("congnghe12-tn-de3", "cấp chính xác"); assert.notStrictEqual(ct.c.right(doi(ct, "cấp chính xác 2", "cấp chính xác 1")), ct.q.o[0], "tự thử: đổi cấp chính xác của công tơ thì khoảng điện năng đổi");
  const ckd = muc("congnghe12-tn-de3", "mạch cộng không đảo"); hong(() => ckd.c.right(doi(ckd, "U_vào2 = 1 V", "U_vào2 = 1,2 V")), "đổi điện áp vào của mạch cộng không đảo");
  const vc = muc("congnghe12-tn-de2", "phân loại điện trở"); assert.notDeepStrictEqual(vc.c.right(Object.assign({}, vc.q, { o: vc.q.o.map((o) => o.replace("đỏ, đỏ, cam", "đỏ, đỏ, đỏ")) })), vc.q.a, "tự thử: đổi vạch màu thì ý về trị số đổi");
  // bộ dò lộ bắt được câu cố ý viết sai: đáp án của câu này chép vào lời giải câu khác
  const thu = (qs) => { const r = doLo(qs, [], () => true); return r.lo.concat(r.chuLo); };
  const ghi = (q, x) => { const o = Object.assign({}, q, { x: q.x + " " + x }); ten.set(o, "thử-giả"); return o; };
  const qA = TNQ.find((q) => q.type === "mc" && !/\d/.test(q.o[0]) && q.o[0].split(" ").length >= 4), qK = TNQ.find((q) => q !== qA && q._de === qA._de && q.type === "mc");
  assert.ok(thu([qA, ghi(qK, qA.o[0] + ".")]).some((s) => s.startsWith("thử-giả → ")), "bộ dò lộ bắt được đáp án chép sang câu khác");
  const qS = TNQ.find((q) => q.type === "mc" && soCua(q).length);
  assert.ok(thu([qS, ghi(qK, "Kết quả bằng " + vn(soCua(qS)[0]) + ".")]).some((s) => s.startsWith("thử-giả → ")), "bộ dò lộ bắt được số của đáp án");
}
DE.forEach((b) => console.log(`${b.id}: ${b.questions.length} câu (${b.questions.filter((q) => q.type === "mc").length} nhiều lựa chọn, ${b.questions.filter((q) => q.type === "tf4").length} đúng/sai 4 ý), ` +
  NHOM.map((g) => `${b.questions.filter((q) => nhom(q.topic) === g).length} câu ${g === "10" || g === "11" ? "lớp " + g : "phần " + g}`).join(", ") +
  `, ${b.questions.filter((q) => q.svg).length} hình; đáp án đúng dài nhất hoặc ngắn nhất ở ${b._le}/${b._mc} câu nhiều lựa chọn.`));
console.log(n + " câu đã tính lại hoặc so với bảng.");
console.log("MATH OK");
