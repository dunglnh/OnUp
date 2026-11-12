// Kiểm tra ngân hàng Ngữ văn 7 cuối kì I của Phiên N7-ck1-van (data/banks/7-van.js, van7-ck1-*), theo mẫu tests/van9-ck1.js.
// Kho = Đề 1 + Đề 2 + câu riêng của đề ngẫu nhiên. Số câu, số đề lấy từ danh mục (không ghi cứng); ma trận 10 – 8 – 7 như mọi kho
// lớp 7 (đoạn “Chung của các phiên lớp 7” ở mục 7 của docs/KE-HOACH-NOI-DUNG.md).
// Thơ bốn chữ, năm chữ người soạn viết (bài thơ trong đoạn đọc, kể cả bài thơ dẫn trong bài nghị luận; bài «Đêm trăng» trong câu Viết;
// bài thơ mẫu trong lời giải câu tập làm thơ): đếm tiếng từng dòng, khổ bốn dòng, vần chân ở dòng 2 và dòng 4 mỗi khổ (cùng vần, cùng
// thanh bằng hay trắc; dòng 1, dòng 3 không hiệp vần liền), ngắt nhịp theo bảng NHIP (2/2 với dòng bốn tiếng; 2/3, 3/2 với dòng năm
// tiếng; bảng phải khớp từng chữ của bài).
// Tính lại đáp án (CHECKS: nhận ra câu bằng một đoạn chữ của đề, đúng một câu trong kho): thể thơ, cách gieo vần, cặp vần, nhịp, hình
// ảnh so sánh trong bài thơ, bài văn; từ láy (bảng LAY, kiểu láy tính bằng code; mọi cặp tiếng liền nhau có dáng láy mà không phải từ
// láy ghi ở KHONG_LAY); mở rộng thành phần câu (bảng MR: trạng ngữ, chủ ngữ, vị ngữ của câu gốc và của từng phương án; chỉ đáp án mở
// rộng đúng thành phần được hỏi thành cụm từ, giữ nguyên phần còn lại và kiểu câu); trạng ngữ chỉ nơi chốn; biện pháp tu từ theo dấu
// hiệu trong câu (từ so sánh, từ so sánh hơn kém, từ ngữ chỉ người dùng cho vật, cụm từ lặp lại, hình ảnh ẩn dụ ở AN_DU); số từ, phó
// từ, từ ngữ địa phương, nói giảm nói tránh theo bảng; bài tóm tắt mẫu đúng số câu, số chữ đề yêu cầu. Chữ trích trong «» của câu có
// đoạn đọc (đề bài, lời giải, ý của câu đúng/sai) phải có trong đoạn đọc.
// Rồi kiểm tra ma trận, đoạn đọc (mỗi chủ đề đọc hiểu một đoạn mỗi đề, đoạn 3 câu mức 1-2-3), câu Viết (chỉ tự luận, 4–6 ý chấm, đủ
// sáu kiểu bài Viết của Bài 1–5), dạng câu (đúng/sai 4 ý không lặp kiểu Đ/S, có câu trả lời ngắn), đáp án đúng không dài hơn hẳn lựa
// chọn sai, là lựa chọn dài nhất hay ngắn nhất ở không quá một phần ba số câu nhiều lựa chọn, không là lựa chọn duy nhất có chữ của
// nhãn chủ đề; đề bài không trùng câu nào trong file; không gần trùng câu của kho Ngữ văn 6 (6-van.js), đoạn đọc không dùng lại câu
// văn nào của kho đó; rút thử nhiều lần (đúng ma trận, trọn đoạn, gặp đủ kho; đã làm hết một đề cố định thì không rút lại câu của đề
// đó); dò lộ đáp án giữa mọi cặp câu của kho (đề ngẫu nhiên rút chung câu khác chủ đề, đề “Ôn chủ đề” rút chung câu cùng chủ đề) và
// lời dặn: chuỗi 3 từ liền nhau của đáp án có ở câu kia; DO_LO=1 in ra để xem tay, danh sách đã xem ở DA_XEM.
// Có sách ở ../OnUp-Book (repo riêng tư) thì so mọi trường chữ (cả đoạn đọc, thang chấm) với chữ OCR của mọi cuốn (có Ngữ văn 7 hai
// tập) sau khi bỏ dấu, gộp nguyên âm, gộp tên văn bản, tác giả ở GOP thành một từ: không có chuỗi 8 từ liền nhau trùng sách; DO_SACH=1
// in cả chuỗi 6 từ. So thêm với mọi câu của các kho khác: không có chuỗi 8 từ trùng; DO_KHO=1 in chuỗi 5 từ và câu gần trùng kho lớp 6.
// Chạy: node tests/van7-ck1.js → in VAN7 OK.
"use strict";
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
vm.runInContext(fs.readFileSync(path.join(__dirname, "../data/calendar-2026-2027.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, EVENTS = ctx.window.ONTAP_SEED_EVENTS;
const S = { de1: "van7-ck1-de1", de2: "van7-ck1-de2", pool: "van7-ck1-ngau-nhien" };
const sum = (a) => a.reduce((s, v) => s + v, 0);

/* ---------- tiếng, thanh, vần ---------- */
const TRAC = /[\u0301\u0309\u0303\u0323]/; // sắc, hỏi, ngã, nặng
const tieng = (s) => String(s).normalize("NFC").replace(/[«»“”"(),.;:!?…–—]/g, " ").split(/\s+/).filter(Boolean);
const thanh = (t) => (TRAC.test(t.normalize("NFD")) ? "T" : "B");
const khongThanh = (t) => t.normalize("NFD").replace(/[\u0300\u0301\u0309\u0303\u0323]/g, "").normalize("NFC").toLowerCase();
// phụ âm đầu (“gi”, “qu” tính là phụ âm đầu: “gió” → “gi”, “quê” → “qu”) và vần (bỏ dấu thanh, giữ mũ, trăng, móc; bỏ phụ âm đầu)
const PAD = /^(ngh|ng|gh|gi|kh|ph|th|tr|ch|nh|qu|b|c|d|đ|g|h|k|l|m|n|p|r|s|t|v|x)(?=[aăâeêioôơuưy])/;
const amDau = (t) => (PAD.exec(khongThanh(t)) || [""])[0];
const van = (t) => khongThanh(t).replace(PAD, "");
const dongTho = (text) => String(text).split("\n").map((l) => l.trim()).filter((l) => l && !/^\(/.test(l)); // bỏ đoạn văn đánh số (1), (2)…
const cuoi = (l) => tieng(l).slice(-1)[0];

/* ---------- kho ---------- */
const d1 = bank(S.de1), d2 = bank(S.de2), p = bank(S.pool);
assert.ok(d1 && d2 && p && p.pool, "có đủ hai đề cố định và đề ngẫu nhiên");
assert.deepEqual(p.pool.from, [S.de1, S.de2], "đề ngẫu nhiên lấy câu của hai đề cố định");
[d1, d2, p].forEach((b) => {
  assert.equal(b.minutes, 45, b.id + ": 45 phút"); assert.equal(b.grade, 7); assert.equal(b.subject, "Ngữ văn"); assert.equal(b.file, "7-van.js");
  assert.ok(!/Sở|đề chung/.test(b.note), b.id + ": lớp 7 không thuộc Thông tư 89/2026, lời dặn không nói đề chung của Sở");
});
assert.equal(d1.questions.length, d1.n); assert.equal(d2.questions.length, d2.n);
const kho = p.questions, rieng = kho.filter((q) => q.src === S.pool);
assert.equal(kho.length, d1.n + d2.n + rieng.length, "kho = hai đề cố định + câu riêng");
assert.ok(rieng.length >= d1.n + d2.n - 10, "đề ngẫu nhiên có khoảng 50 câu riêng");
const PSG = Object.assign({}, d1.passages, d2.passages, p.passages);
const ten = new Map();
[S.de1, S.de2, S.pool].forEach((id) => kho.filter((q) => q.src === id).forEach((q, i) => ten.set(q, id.replace("van7-ck1-", "") + "#" + (i + 1))));
const cau = (has) => { const m = kho.filter((q) => q.q.includes(has)); assert.equal(m.length, 1, `“${has}”: cần đúng một câu trong kho, có ${m.length}`); return m[0]; };
// lịch thi: ba mã gắn vào kì cuối kì I lớp 7
{
  const e = EVENTS.find((x) => x.id === "ck1-l7");
  assert.ok(e && e.grades.includes(7), "có kì thi ck1-l7 của khối 7");
  [S.de1, S.de2, S.pool].forEach((id) => assert.ok(e.banks.includes(id), "ck1-l7 gắn " + id));
}
// không hỏi văn bản cũ «Bầy chim chìa vôi» (sách in năm 2026 đã thay bằng «Bồng chanh đỏ»)
const chu = (q) => [q.q, q.x].concat(q.o || [], q.ans || [], (q.rubric || []).map((r) => r.c)).map(String);
kho.forEach((q) => assert.ok(!chu(q).concat(q.p ? [PSG[q.p].text] : []).some((s) => /chìa vôi/i.test(s)), "không hỏi «Bầy chim chìa vôi»: " + ten.get(q)));

/* ---------- thơ bốn chữ, năm chữ: số tiếng, khổ, vần, nhịp ---------- */
const THO = { // mã: chữ của bài, số tiếng mỗi dòng, số khổ; lien: các dòng viết liền, chia khổ bốn dòng
  "vuon-ong": { nguon: () => PSG["vuon-ong"].text, so: 4, kho: 4 },
  "cau-vong": { nguon: () => PSG["cau-vong"].text, so: 4, kho: 4 },
  "ban-do": { nguon: () => PSG["ban-do"].text, so: 5, kho: 4 },
  "dan-bau": { nguon: () => PSG["dan-bau"].text, so: 5, kho: 4 },
  "chao-co": { nguon: () => PSG["chao-co"].text, so: 5, kho: 4 },
  "dinh-deo": { nguon: () => dongTho(PSG["dinh-deo"].text).join("\n"), so: 5, kho: 2, lien: true }, // tám dòng thơ dẫn trong bài nghị luận
  "dem-trang": { nguon: () => /«Đêm trăng»: «([^»]+)»/.exec(cau("Đọc bài thơ (người soạn viết) «Đêm trăng»").q)[1].split(" / ").join("\n"), so: 4, kho: 2, lien: true },
  "mau-tho": { nguon: () => /^Bài thơ gợi ý \([^)]*\):\n([\s\S]*?)\nCách làm:/.exec(cau("Hãy sáng tác một bài thơ").x)[1], so: 5, kho: 3 }
};
// ngắt nhịp từng dòng (dấu “ | ” giữa hai nhịp)
const NHIP = {
  "vuon-ong": ["Vườn nhỏ | sau nhà", "Ông trồng | đủ cây", "Mướp leo | kín giàn", "Bí bầu | đầy dây.", "Mỗi sáng | tinh mơ", "Ông ra | tưới nước", "Cháu xách | bình con",
    "Lon ton | theo bước.", "Ông bảo | cháu rằng:", "Cây cũng | biết nghe", "Thương cây, | cây lớn", "Cho mình | bóng che.", "Nay ông | đi xa", "Vườn xưa | vẫn đó",
    "Cháu tưới | từng cây", "Nghe ông | trong gió."],
  "cau-vong": ["Mưa vừa | tạnh hẳn", "Nắng lại | về sân", "Trên nền | trời xanh", "Cầu vồng | hiện dần.", "Bảy màu | rực rỡ", "Vắt ngang | đồi xa", "Như chiếc | cầu nhỏ",
    "Nối trời | với nhà.", "Em chạy | ra ngõ", "Kiễng chân, | giơ tay", "Mẹ bảo: | cầu vồng", "Ngắm thì | mới hay.", "Cầu vồng | tan dần", "Nắng chiều | nghiêng nghiêng",
    "Mà trong | lòng em", "Còn bảy | màu riêng."],
  "ban-do": ["Em trải | tấm bản đồ", "Dải đất cong | dịu dàng", "Ngón tay em | đi dọc", "Qua núi rừng, | xóm làng.", "Ngón tay dừng | Hà Nội", "Hồ Gươm | in bóng chiều",
    "Miền Trung | đầy nắng gió", "Cát trắng, | dừa liêu xiêu.", "Phương Nam | sông chín nhánh", "Phù sa | bồi ruộng đồng", "Ngoài khơi xa | sóng vỗ",
    "Trường Sa | giữa biển Đông.", "Bản đồ | chỉ bằng gang", "Mà bao người | gìn giữ", "Em thầm hứa | với mình", "Gắng học | từng con chữ."],
  "dan-bau": ["Chiều chiều | bên hiên nhỏ", "Ông ngồi | gảy đàn bầu", "Một dây | mà ngân mãi", "Tiếng đàn | vọng về đâu?", "Tiếng đàn | như dòng suối",
    "Lượn qua | đồng lúa xanh", "Tiếng đàn | như cánh gió", "Ru giấc ngủ | yên lành.", "Cháu ngồi | bên chân ông", "Lắng nghe | từng nốt nhạc",
    "Ông cười, | mắt rưng rưng", "Mái tóc ông | đã bạc.", "Mai này | cháu khôn lớn", "Cầm cây đàn | ông trao", "Cho tiếng đàn | quê hương", "Ngân mãi | tận trời cao."],
  "chao-co": ["Sáng thứ hai | đầu tuần", "Cả trường | đứng nghiêm trang", "Quốc ca | vang trong nắng", "Cờ đỏ thắm | sao vàng.", "Em ngước nhìn | lá cờ",
    "Thấy núi biển | mênh mông", "Thấy ruộng đồng | quê mẹ", "Thấy bến nước | dòng sông.", "Thấy ông cha | thuở trước", "Mở đất, | lập xóm làng",
    "Bao thế hệ | nối nhau", "Cùng dựng nước | vẻ vang.", "Lá cờ | bay trong gió", "Như lời chào | thân thương", "Em đứng | thẳng lưng hơn", "Lòng thêm yêu | quê hương."],
  "dinh-deo": ["Cột mốc | trên đỉnh đèo", "Giữa mây gió | mênh mông", "Chú bộ đội | biên phòng", "Dáng chú | tựa cây thông.", "Dưới kia | làng bản ngủ",
    "Khói chiều | vương nóc nhà", "Nhờ những | người lính trẻ", "Giữ bình yên | quê ta."],
  "dem-trang": ["Trăng rằm | tròn vành", "Treo trên | ngọn tre", "Gió đồng | thổi về", "Mát rượi | đêm hè.", "Bà ngồi | kể chuyện", "Cháu nằm | bên bà",
    "Trăng nghe | mê say", "Quên cả | đường xa."],
  "mau-tho": ["Cô đến lớp | mỗi sáng", "Tà áo trắng | tinh khôi", "Giọng cô | như suối nhỏ", "Mát lành | tim chúng tôi.", "Bàn tay cô | cầm phấn",
    "Viết những dòng | chữ tròn", "Bảng đen | như trời rộng", "Chữ sáng | như trăng non.", "Mai này | em khôn lớn", "Đi khắp | mọi phương trời",
    "Vẫn nhớ | lời cô dạy", "Như nắng ấm | không vơi."]
};
const khoCua = (id) => { const t = THO[id], l = dongTho(t.nguon()); if (t.lien) { const r = []; for (let i = 0; i < l.length; i += 4) r.push(l.slice(i, i + 4)); return r; } return t.nguon().split(/\n\s*\n/).map(dongTho).filter((k) => k.length); };
const dongCua = (id) => khoCua(id).flat();
const nhipCua = (id) => NHIP[id].map((x) => x.split(" | ").map((s) => tieng(s).length).join("/"));
const phanLon = (id, ks) => 2 * nhipCua(id).filter((k) => ks.includes(k)).length > NHIP[id].length; // phần lớn các dòng
Object.entries(THO).forEach(([id, t]) => {
  const ks = khoCua(id), lines = ks.flat();
  assert.equal(ks.length, t.kho, `${id}: ${t.kho} khổ`);
  ks.forEach((k, j) => assert.equal(k.length, 4, `${id}, khổ ${j + 1}: bốn dòng`));
  lines.forEach((l, i) => assert.equal(tieng(l).length, t.so, `${id}, dòng ${i + 1} («${l}»): ${t.so} tiếng`));
  ks.forEach((k, j) => {
    const c = k.map(cuoi), at = `${id}, khổ ${j + 1}`;
    assert.equal(van(c[1]), van(c[3]), `${at}: dòng 2, dòng 4 hiệp vần («${c[1]}» – «${c[3]}»)`);
    assert.equal(thanh(c[1]), thanh(c[3]), `${at}: hai tiếng hiệp vần cùng thanh bằng hay cùng thanh trắc («${c[1]}» – «${c[3]}»)`);
    assert.ok(van(c[0]) !== van(c[1]) && van(c[2]) !== van(c[3]), `${at}: vần cách (dòng 1, dòng 3 không hiệp vần liền với dòng sau)`);
  });
  assert.ok(NHIP[id], id + ": chưa ghi nhịp ở NHIP");
  assert.deepEqual(NHIP[id].map((x) => x.replace(" | ", " ")), lines, id + ": bảng NHIP khớp từng dòng của bài");
  nhipCua(id).forEach((k, i) => assert.ok(t.so === 4 ? k === "2/2" : k === "2/3" || k === "3/2", `${id}, dòng ${i + 1}: nhịp ${k}`));
});
// đoạn đọc nào cũng toàn dòng ngắn (bài thơ) thì phải có trong THO
Object.entries(PSG).filter(([, ps]) => { const l = dongTho(ps.text); return l.length >= 4 && l.every((x) => tieng(x).length <= 6); }).forEach(([id]) => assert.ok(THO[id], "bài thơ " + id + " chưa có ở THO"));

/* ---------- bảng tiếng Việt ---------- */
const chuThuong = (s) => String(s).replace(/_/g, " ").normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, " ").trim();
const coCum = (s, c) => (" " + chuThuong(s) + " ").includes(" " + chuThuong(c) + " ");
const trich = (q) => /«([^»]+)»/.exec(q.q)[1];
// từ láy: kiểu láy tính bằng code (toàn bộ: hai tiếng chỉ khác thanh; bộ phận: cùng phụ âm đầu hay cùng vần)
const LAY = ["vi vu", "lững lờ", "thoang thoảng", "chói chang", "lao xao", "lấp ló", "chậm chạp", "lích chích", "lênh khênh"];
const GOI_TA = { "thoang thoảng": "mùi hương", "chói chang": "ánh sáng", "lao xao": "âm thanh", "lấp ló": "dáng vẻ" };
const KHONG_LAY = ["rau sau"]; // cặp tiếng liền nhau cùng phụ âm đầu hay cùng vần mà không phải từ láy
const kieuLay = (w) => {
  const [a, b] = w.split(" ");
  if (khongThanh(a) === khongThanh(b)) return "toàn bộ";
  if (amDau(a) && amDau(a) === amDau(b)) return "âm đầu";
  return van(a) === van(b) ? "vần" : null;
};
LAY.forEach((w) => assert.ok(kieuLay(w), "từ láy ở LAY phải có tiếng lặp: " + w));
const layTrong = (s) => {
  const r = [];
  String(s).normalize("NFC").split(/[,.;:!?«»“”()–]/).forEach((v) => {
    const w = tieng(v.toLowerCase());
    for (let i = 0; i + 1 < w.length; i++) {
      const c = w[i] + " " + w[i + 1];
      if (LAY.includes(c)) r.push(c);
      else assert.ok(!kieuLay(c) || KHONG_LAY.includes(c), `cặp «${c}» có dáng láy: ghi vào LAY hay KHONG_LAY`);
    }
  });
  return r;
};
// mở rộng thành phần câu: “trạng ngữ | chủ ngữ | vị ngữ” của câu gốc và của từng phương án (thứ tự như trong dữ liệu); “_” nối các
// tiếng của một từ. Phương án đạt: giữ kiểu câu (dấu kết thúc), thành phần được hỏi thành cụm từ (ít nhất hai từ, nhiều từ hơn câu
// gốc), thành phần khác giữ nguyên.
const MR = [
  { has: "«Chiều, đàn cò bay về.»", goc: "Chiều | đàn cò | bay về.", muc: ["tn"], o: ["Chiều muộn, khi mặt_trời vừa khuất sau rặng tre | đàn cò | bay về.",
    "Chiều | cả đàn cò trắng_muốt | rủ_nhau bay về luỹ_tre làng.", "Chiều_chiều | đàn cò | bay về.", "Chiều | đàn cò | bay về rất nhanh."] },
  { has: "«Chim hót.»", goc: " | Chim | hót.", muc: ["cn", "vn"], o: [" | Mấy chú chim_sâu | hót ríu_ran trên cành bưởi.",
    "Từ sáng sớm tinh_mơ, khi sương còn đọng trên lá | chim | hót.", " | Chim | hót rất hay.", " | Những chú chim nhỏ | hót."] },
  { has: "«Hoa nở đầy vườn.»", goc: " | Hoa | nở đầy vườn.", muc: ["cn"], o: [" | Những bông hồng_nhung đỏ_thắm | nở đầy vườn.", "Sáng nay | hoa | nở đầy vườn.",
    " | Hoa | nở đầy vườn và thơm_ngát cả một góc phố nhỏ của chúng_tôi.", " |  | Nở đầy vườn."] },
  { has: "«Con mèo ngủ.»", goc: " | Con mèo | ngủ.", muc: ["vn"], o: [" | Con mèo | nằm cuộn_tròn ngủ say bên bếp_lửa.",
    " | Con mèo mướp lông xám mà bà mang về từ chợ_phiên | ngủ.", "Trưa nay | con mèo | ngủ.", " | Con mèo | ngủ rồi à?"] },
  { has: "«Người đi chợ đông.»", goc: " | Người | đi chợ đông.", muc: ["cn", "vn"], o: [" | Người ở các xóm gần_xa | gánh_gồng ra chợ đông như hội.",
    " | Người | đi chợ đông lắm.", " | Người | đi chợ đông, rất đông, đông vô_cùng đông.", " | Người | đi chợ đông vì hàng ở chợ quê rẻ hơn."] }
];
const NOI_CHON = /^(dưới|trên|trong|ngoài|ở|bên|giữa|cạnh)\s/i; // trạng ngữ chỉ nơi chốn mở đầu bằng từ chỉ vị trí
// biện pháp tu từ theo dấu hiệu trong câu
const SO_SANH = /(^|[\s,])(như|tựa|giống)(?=[\s,.]|$)/i, HON_KEM = /(^|\s)(hơn|kém)(?=[\s,.]|$)/i;
const NGUOI = ["vươn mình", "đón", "gân cổ", "gọi", "nghe", "mê say", "quên", "tắm", "thổi sáo", "khúc khích", "lắng nghe"]; // từ ngữ vốn chỉ người
const VAT = ["hàng phi lao", "chú gà trống", "trăng", "mây", "tre", "gió"]; // sự vật được nói tới bằng từ ngữ chỉ người
const AN_DU = [["người lái đò", "thầy"]]; // [hình ảnh, đối tượng]: câu chỉ có hình ảnh, không nêu đối tượng, không có từ so sánh
const NOI_GIAM = ["chưa được đẹp lắm", "về với tổ tiên", "khiếm thị", "hơi to một chút", "không được khoẻ"];
const lapCum = (s) => { const w = chuThuong(s).split(" "), dem = {}; for (let k = 2; k <= 3; k++) for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k).join(" "); dem[c] = (dem[c] || 0) + 1; } return Object.keys(dem).filter((c) => dem[c] >= 2); };
const bienPhap = (s) => {
  const r = new Set();
  if (SO_SANH.test(s)) r.add("so sánh").add("so sánh ngang bằng");
  if (HON_KEM.test(s)) r.add("so sánh").add("so sánh hơn kém");
  if (NGUOI.some((c) => coCum(s, c)) && VAT.some((c) => coCum(s, c))) r.add("nhân hoá");
  if (lapCum(s).length) r.add("điệp ngữ");
  if (!r.has("so sánh") && AN_DU.some(([h, d]) => coCum(s, h) && !coCum(s, d))) r.add("ẩn dụ");
  if (NOI_GIAM.some((c) => coCum(s, c))) r.add("nói giảm nói tránh");
  return r;
};
// số từ, phó từ, từ ngữ địa phương
const SO_DEM = ["một", "hai", "ba", "bốn", "năm", "sáu", "bảy", "tám", "chín", "mười"];
const SO_TU = SO_DEM.concat(["tư", "trăm", "nghìn", "triệu", "dăm", "vài", "mươi", "mấy"]);
const DON_VI = ["cặp", "đôi", "chục", "tá"]; // danh từ chỉ đơn vị gắn với số lượng, không phải số từ
const uocChung = (s) => {
  const w = tieng(String(s).toLowerCase()), r = w.filter((t) => ["dăm", "vài", "mươi", "mấy"].includes(t));
  for (let i = 0; i + 1 < w.length; i++) { const a = SO_DEM.indexOf(w[i]); if (a >= 0 && SO_DEM.indexOf(w[i + 1]) === a + 1) r.push(w[i] + " " + w[i + 1]); }
  return r;
};
const PHO_TU = { "đi kèm danh từ": ["những", "các", "mọi", "mỗi", "từng"], "thời gian": ["đã", "đang", "sẽ", "vừa", "mới", "sắp"], "mức độ": ["rất", "lắm", "quá", "hơi"],
  "tiếp diễn": ["vẫn", "cũng", "còn", "đều", "cứ"], "phủ định": ["không", "chưa", "chẳng"], "cầu khiến": ["đừng", "chớ", "hãy"] };
const coTu = (s, ds) => tieng(String(s).toLowerCase()).filter((t) => ds.includes(t));
const DIA_PHUONG = { "mắc cỡ": "xấu hổ", "chừ": "bây giờ", "nớ": "đó", "ni": "này", "tê": "kia", "răng": "sao", "rứa": "thế", "nỏ": "không", "thơm": "dứa",
  "giùm": "giúp", "má": "mẹ", "chén": "bát" };
const motCai = (ds, at) => { assert.equal(ds.length, 1, at + ": đúng một lựa chọn đạt, có " + ds.length); return ds[0]; };

/* ---------- đáp án tính lại bằng code ---------- */
const THE = { 4: "Thơ bốn chữ", 5: "Thơ năm chữ" };
const noiDung = (q, i) => q.a[i]; // ý về nội dung, cảm xúc: đọc tay
const yTf = (q, y) => q.o.map((o, i) => { const f = y.filter(([re]) => re.test(o)); assert.equal(f.length, 1, "ý cần đúng một cách tính: " + o); return !!f[0][1](q, i); });
const CHECKS = [
  // thơ: thể thơ, vần, nhịp, hình ảnh so sánh
  { id: S.de1, has: "bạn xếp bài thơ vào thể thơ nào", right: (q) => { const n = new Set(dongCua("vuon-ong").map((l) => tieng(l).length)); assert.equal(n.size, 1); return THE[[...n][0]]; } },
  { id: S.de1, has: "Đọc lại bài thơ «Vườn của ông». Ý nào đúng", right: (q) => yTf(q, [
    [/«nước» và «bước» ở khổ hai hiệp vần/, () => { const k = khoCua("vuon-ong")[1]; return cuoi(k[1]) === "nước" && cuoi(k[3]) === "bước" && van("nước") === van("bước"); }],
    [/ngắt nhịp 3\/1/, () => phanLon("vuon-ong", ["3/1"])],
    [/chỉ tả cảnh khu vườn/, noiDung],
    [/Dòng cuối «Nghe ông trong gió»/, (q2, i) => dongCua("vuon-ong").slice(-1)[0] === "Nghe ông trong gió." && noiDung(q2, i)]]) },
  { id: S.de1, has: "Những nhận xét dưới đây về bài thơ «Tấm bản đồ»", right: (q) => yTf(q, [
    [/có bốn khổ, mỗi dòng năm tiếng, các dòng thường ngắt nhịp 2\/3 hoặc 3\/2/, () => khoCua("ban-do").length === 4 && dongCua("ban-do").every((l) => tieng(l).length === 5) && phanLon("ban-do", ["2/3", "3/2"])],
    [/^Cảm xúc đi từ/, noiDung],
    [/tiếng cuối dòng thứ nhất hiệp vần với tiếng cuối dòng thứ ba/, () => khoCua("ban-do").every((k) => van(cuoi(k[0])) === van(cuoi(k[2])))],
    [/chỉ kể tên các vùng đất/, noiDung]]) },
  { id: S.de2, has: "«Tiếng đàn bầu» gieo vần theo cách nào", right: (q) => {
    const v = (l) => van(cuoi(l));
    assert.ok(khoCua("dan-bau").every((k) => v(k[1]) === v(k[3]) && v(k[0]) !== v(k[1]) && v(k[2]) !== v(k[3]) && v(k[0]) !== v(k[2])), "dan-bau: chỉ dòng 2, dòng 4 mỗi khổ hiệp vần");
    return motCai(q.o.filter((o) => /^Vần cách, ở cuối dòng 2 và dòng 4/.test(o)), "vần cách"); } },
  { id: S.de2, has: "Xét bài thơ «Tiếng đàn bầu» cả về nội dung", right: (q) => yTf(q, [
    [/chỉ gợi nỗi buồn/, noiDung],
    [/ngắt nhịp 2\/3 hoặc 3\/2/, () => phanLon("dan-bau", ["2/3", "3/2"])],
    [/^Khổ cuối là lời/, noiDung],
    [/không có hình ảnh so sánh nào/, () => !dongCua("dan-bau").some((l) => SO_SANH.test(l))]]) },
  { id: S.pool, has: "Trong khổ thơ thứ hai, cầu vồng được so sánh", right: (q) => {
    const k = khoCua("cau-vong")[1], i = k.findIndex((l) => /^Như /.test(l));
    const hinh = chuThuong(k[i].replace(/^Như /, "") + " " + k[i + 1]);
    return motCai(q.o.filter((o) => chuThuong(o).includes(hinh)), "hình ảnh so sánh ở khổ hai"); } },
  { id: S.pool, has: "Đọc lại bài thơ «Cầu vồng»", right: (q) => yTf(q, [
    [/ngắt nhịp 1\/3/, () => phanLon("cau-vong", ["1/3"])],
    [/Mỗi dòng có bốn tiếng; các cặp/, (q2, i) => dongCua("cau-vong").every((l) => tieng(l).length === 4)
      && [...q2.o[i].matchAll(/«(\S+) – (\S+)»/g)].every((m) => van(m[1]) === van(m[2]) && khoCua("cau-vong").some((k) => cuoi(k[1]) === m[1] && cuoi(k[3]) === m[2]))],
    [/Hình ảnh so sánh ở khổ hai/, () => khoCua("cau-vong")[1].some((l) => SO_SANH.test(l))],
    [/^Khổ cuối cho thấy/, noiDung]]) },
  { id: S.pool, has: "Việc lặp lại từ «Thấy» ở đầu nhiều dòng thơ", right: () => { assert.ok(dongCua("chao-co").filter((l) => /^Thấy /.test(l)).length >= 3, "chao-co: «Thấy» mở đầu ít nhất ba dòng"); return null; } },
  { id: S.de2, has: "so sánh váy áo sặc sỡ của các cô gái với hình ảnh nào", right: (q) => {
    const c = PSG["cho-phien"].text.split(/(?<=[.!?])\s+/).find((s) => /Váy áo sặc sỡ/.test(s)), sau = chuThuong(c.split(" như ")[1]);
    return motCai(q.o.filter((o) => sau.startsWith(chuThuong(o))), "vế được so sánh"); } },
  { id: S.pool, has: "Đọc bài thơ (người soạn viết) «Đêm trăng»", right: (q) => {
    const cap = khoCua("dem-trang").map((k) => cuoi(k[1]) + " – " + cuoi(k[3])).join(", ");
    assert.ok(q.rubric.some((r) => r.c.includes("nhịp 2/2") && r.c.includes("vần " + cap)), "thang chấm nêu đúng nhịp 2/2 và cặp vần " + cap);
    assert.ok(/mỗi dòng bốn tiếng/.test(q.x + q.rubric.map((r) => r.c).join(" ")), "bài «Đêm trăng» mỗi dòng bốn tiếng");
    return null; } },
  { id: S.pool, has: "Hãy sáng tác một bài thơ", right: (q) => {
    const ks = khoCua("mau-tho"), cap = ks.map((k) => cuoi(k[1]) + " – " + cuoi(k[3])).join(", ");
    assert.ok(q.x.startsWith("Bài thơ gợi ý (mỗi dòng năm tiếng, ba khổ):") && ks.length === 3, "bài thơ mẫu: năm tiếng, ba khổ");
    assert.ok(q.x.includes("(" + cap + ")"), "lời giải nêu đúng các cặp vần: " + cap);
    assert.ok(/mỗi dòng bốn hoặc năm tiếng/.test(q.q) && /nhịp 2\/2 với dòng bốn tiếng, 2\/3 hoặc 3\/2 với dòng năm tiếng/.test(q.rubric.map((r) => r.c).join(" ")), "đề, thang chấm nêu thể thơ và nhịp");
    return null; } },
  // Viết: bài tóm tắt mẫu đúng số câu, số chữ đề yêu cầu
  { id: S.de1, has: "rồi tóm tắt bằng một đoạn văn", right: (q) => {
    const m = /khoảng (\d+)–(\d+) câu \(chừng (\d+)–(\d+) chữ\)/.exec(q.q), b = /^Bài tóm tắt gợi ý \((\d+) câu, khoảng (\d+) chữ\):\n(.+)$/m.exec(q.x);
    const soCau = b[3].split(/(?<=[.!?])\s+/).filter(Boolean).length, soChu = tieng(b[3]).length, truyen = /«([^»]+)»$/.exec(q.q)[1];
    assert.ok(soCau >= +m[1] && soCau <= +m[2] && soChu >= +m[3] && soChu <= +m[4], `bài tóm tắt ${soCau} câu, ${soChu} chữ`);
    assert.ok(soCau === +b[1] && Math.abs(soChu - +b[2]) <= 5, `lời giải ghi ${b[1]} câu, ${b[2]} chữ; đếm được ${soCau} câu, ${soChu} chữ`);
    assert.ok(tieng(truyen).length > 1.5 * soChu, "câu chuyện dài hơn hẳn bài tóm tắt");
    return null; } },
  // từ láy
  { id: S.de1, has: "có những từ láy nào", right: (q) => layTrong(trich(q)).join(", ") },
  { id: S.de2, has: "Từ láy nào dưới đây gợi tả mùi hương", right: (q) => { q.o.forEach((o) => assert.ok(LAY.includes(o) && GOI_TA[o], "phương án ở LAY, GOI_TA: " + o)); return motCai(q.o.filter((o) => GOI_TA[o] === "mùi hương"), "gợi tả mùi hương"); } },
  { id: S.pool, has: "có một từ láy. Từ láy đó là", right: (q) => motCai(layTrong(trich(q)), "từ láy trong câu") },
  { id: S.pool, has: "nào dưới đây có từ láy?", right: (q) => motCai(q.o.filter((o) => layTrong(o).length), "câu có từ láy") },
  { id: S.pool, has: "Từ láy «lênh khênh»", right: (q) => { const w = trich(q); assert.equal(kieuLay(w), "vần"); return "Phần vần «" + van(w.split(" ")[0]) + "»"; } },
  // trạng ngữ chỉ nơi chốn
  { id: S.pool, has: "cho biết rõ nơi bà ngồi làm việc", right: (q) => motCai(q.o.filter((o) => NOI_CHON.test(o) && tieng(o).length >= 3), "trạng ngữ chỉ nơi chốn là cụm từ") },
  // số từ
  { id: S.de1, has: "nào dưới đây có số từ chỉ số lượng ước chừng", right: (q) => motCai(q.o.filter((o) => uocChung(o).length), "số từ ước chừng") },
  { id: S.de2, has: "những từ nào là số từ", right: (q) => { const s = trich(q); assert.deepEqual(tieng(s).filter((t) => DON_VI.includes(t)), ["cặp", "chục"]); return tieng(s.toLowerCase()).filter((t) => SO_TU.includes(t)).join(", "); } },
  { id: S.pool, has: "từ «tư» là số từ chỉ gì", right: (q) => { assert.ok(/thứ tư/.test(trich(q))); return motCai(q.o.filter((o) => /thứ tự/.test(o)), "số từ chỉ thứ tự (đứng sau «thứ»)"); } },
  { id: S.pool, has: "có số từ chỉ số lượng ước chừng là", right: (q) => motCai(uocChung(trich(q)), "số từ ước chừng") },
  { id: S.pool, has: "số từ «trăm» mang nghĩa gì", right: (q) => { assert.ok(/trăm lần/.test(trich(q))); return motCai(q.o.filter((o) => /^Rất nhiều/.test(o)), "«trăm» chỉ số lượng rất nhiều, không chính xác"); } },
  // phó từ
  { id: S.de1, has: "nào dưới đây có phó từ đi kèm danh từ", right: (q) => motCai(q.o.filter((o) => coTu(o, PHO_TU["đi kèm danh từ"]).length), "phó từ đi kèm danh từ") },
  { id: S.de2, has: "phó từ «đừng» bổ sung ý nghĩa gì", right: (q) => motCai(q.o.filter((o) => o.includes(Object.keys(PHO_TU).find((k) => PHO_TU[k].includes("đừng")))), "ý nghĩa của «đừng»") },
  { id: S.pool, has: "nào dưới đây có phó từ chỉ mức độ", right: (q) => motCai(q.o.filter((o) => coTu(o, PHO_TU["mức độ"]).length), "phó từ chỉ mức độ") },
  { id: S.pool, has: "phó từ «vẫn» cho biết điều gì", right: (q) => motCai(q.o.filter((o) => o.includes(Object.keys(PHO_TU).find((k) => PHO_TU[k].includes("vẫn")))), "ý nghĩa của «vẫn»") },
  { id: S.pool, has: "cho biết việc sắp xảy ra", right: (q) => motCai(q.o.filter((o) => coTu(o, ["sẽ", "sắp"]).length), "phó từ chỉ việc sắp xảy ra") },
  // từ ngữ địa phương
  { id: S.de1, has: "từ ngữ địa phương «mắc cỡ» tương ứng", right: () => DIA_PHUONG["mắc cỡ"] },
  { id: S.de2, has: "có nghĩa là «bây giờ»", right: (q) => { q.o.forEach((o) => assert.ok(DIA_PHUONG[o], "phương án ở DIA_PHUONG: " + o)); return motCai(q.o.filter((o) => DIA_PHUONG[o] === "bây giờ"), "«bây giờ»"); } },
  { id: S.pool, has: "từ «thơm» (phương ngữ Nam Bộ)", right: () => "quả " + DIA_PHUONG["thơm"] },
  { id: S.pool, has: "nào dưới đây có dùng từ ngữ địa phương", right: (q) => motCai(q.o.filter((o) => Object.keys(DIA_PHUONG).some((w) => coCum(o, w))), "câu có từ ngữ địa phương") },
  { id: S.pool, has: "có nghĩa là «không»", right: (q) => { q.o.forEach((o) => assert.ok(DIA_PHUONG[o], "phương án ở DIA_PHUONG: " + o)); return motCai(q.o.filter((o) => DIA_PHUONG[o] === "không"), "«không»"); } },
  // nói giảm nói tránh (câu điền)
  { id: S.pool, has: "để nói về bệnh tật. Cụm từ đó là", right: (q) => motCai(NOI_GIAM.filter((c) => coCum(trich(q), c)), "cụm nói giảm nói tránh trong câu") }
];
let n = 0;
CHECKS.forEach((c) => {
  const q = cau(c.has), at = c.id + ": " + c.has, want = c.right(q);
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  n++;
  if (want === null) return;
  const got = q.type === "fill" ? q.ans[0] : q.type === "tf4" ? q.a : q.o[0];
  if (Array.isArray(want)) assert.deepEqual(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  else assert.equal(got, want, at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
});
// mở rộng thành phần câu (bảng MR)
const phanCau = (s) => { const [tn, cn, vn] = s.split(" | ").map((x) => x.trim()); return { tn, cn, vn }; };
const soTu = (s) => s.replace(/[.,!?;:]/g, " ").split(/\s+/).filter(Boolean).length; // “_” nối tiếng của một từ
const dauCuoi = (s) => (/[.?!]$/.exec(s.trim()) || [""])[0];
MR.forEach((m) => {
  const q = cau(m.has), g = phanCau(m.goc), cauGoc = trich(q);
  assert.equal(chuThuong([g.tn, g.cn, g.vn].join(" ")), chuThuong(cauGoc), "bảng MR khớp câu gốc: " + cauGoc);
  const dat = m.o.map((s, i) => {
    const o = phanCau(s);
    assert.equal(chuThuong([o.tn, o.cn, o.vn].join(" ")), chuThuong(q.o[i]), "bảng MR khớp phương án: " + q.o[i]);
    if (dauCuoi(q.o[i]) !== dauCuoi(cauGoc)) return false;
    return ["tn", "cn", "vn"].every((k) => (m.muc.includes(k) ? soTu(o[k]) >= 2 && soTu(o[k]) > soTu(g[k]) : chuThuong(o[k]) === chuThuong(g[k])));
  });
  assert.deepEqual(dat, q.o.map((_, i) => i === 0), `${ten.get(q)}: chỉ đáp án mở rộng ${m.muc.join(", ")} thành cụm từ, giữ phần còn lại (tính được ${JSON.stringify(dat)})`);
  n++;
});
// biện pháp tu từ: phương án mở đầu bằng tên biện pháp; ý của câu đúng/sai nêu tên biện pháp của câu trích
{
  const TEN_BP = /^(So sánh hơn kém|So sánh ngang bằng|So sánh|Nhân hoá|Ẩn dụ|Hoán dụ|Điệp ngữ|Nói giảm nói tránh)[ ,]/;
  const bp = kho.filter((q) => q.topic === "Biện pháp tu từ");
  const mc = bp.filter((q) => q.type === "mc" && q.o.every((o) => TEN_BP.test(o)));
  mc.forEach((q) => {
    const co = bienPhap(trich(q)), tenO = q.o.map((o) => TEN_BP.exec(o)[1].toLowerCase());
    assert.deepEqual(tenO.map((t) => co.has(t)), q.o.map((_, i) => i === 0), `${ten.get(q)}: biện pháp tính được ${[...co].join(", ")}`);
    n++;
  });
  bp.filter((q) => q.type === "tf4").forEach((q) => {
    q.o.forEach((o) => { const m = /^«([^»]+)»: (so sánh|nhân hoá|điệp ngữ|ẩn dụ)/.exec(o); assert.ok(m && bienPhap(m[1]).has(m[2]), `${ten.get(q)}: ý «${o.slice(0, 40)}…» nêu đúng biện pháp`); });
    n++;
  });
  assert.ok(mc.length >= 4, "có câu hỏi tên biện pháp tu từ của một câu trích");
}
// nói giảm nói tránh: chỉ đáp án có cách nói giảm nói tránh ở bảng NOI_GIAM
kho.filter((q) => q.topic === "Nói giảm nói tránh" && q.type === "mc").forEach((q) => {
  assert.deepEqual(q.o.map((o) => NOI_GIAM.some((c) => coCum(o, c))), q.o.map((_, i) => i === 0), ten.get(q) + ": chỉ đáp án nói giảm nói tránh");
  n++;
});
// chữ trích trong «» của câu có đoạn đọc (đề bài, lời giải, ý của câu đúng/sai) có trong đoạn đọc (hay tên đoạn đọc)
// chữ trích không lấy từ đoạn đọc mà đúng: lời giải nói người kể không xưng «tôi»
const NGOAI_DOAN = ["ngau-nhien#7: «tôi»"];
{
  const thieu = [];
  kho.filter((q) => q.p).forEach((q) => {
    const T = " " + chuThuong(PSG[q.p].title + " " + PSG[q.p].text) + " ";
    [q.q, q.x].concat(q.type === "tf4" ? q.o : []).forEach((s) => [...String(s).matchAll(/«([^»]+)»/g)].forEach((m) => {
      // «sân – dần»: cặp tiếng (vần), mỗi tiếng có trong đoạn; « / » ngăn hai dòng thơ; «ươc»: vần của một tiếng trong đoạn
      const phan = /^\S+ – \S+$/.test(m[1]) ? m[1].split(" – ") : [m[1].replace(/ \/ /g, " ")];
      const laVan = (c) => /^\S+$/.test(c) && tieng(PSG[q.p].text).some((t) => van(t) === khongThanh(c) && amDau(t));
      phan.filter((c) => !T.includes(" " + chuThuong(c) + " ") && !laVan(c) && !NGOAI_DOAN.includes(`${ten.get(q)}: «${c}»`)).forEach((c) => thieu.push(`${ten.get(q)}: «${c}»`));
    }));
  });
  assert.deepEqual(thieu, [], "chữ trích không có trong đoạn đọc");
}

/* ---------- ma trận, đoạn đọc, câu Viết ---------- */
const M = p.pool.matrix, cells = Object.values(M), TOPICS = Object.keys(M);
const dem = (qs, t, lv) => qs.filter((q) => q.topic === t && q.lv === lv).length;
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
assert.equal(sum(cells.map(sum)), p.n, "ma trận đủ số câu của đề");
assert.equal(TOPICS[TOPICS.length - 1], "Viết", "chủ đề Viết đứng cuối ma trận");
[d1.questions, d2.questions].forEach((d, i) => {
  assert.deepEqual([...new Set(d.map((q) => q.topic))], TOPICS, `Đề ${i + 1} đủ chủ đề, theo thứ tự của ma trận`);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d, t, l)), v, `Đề ${i + 1} đúng ma trận ở chủ đề ${t}`));
});
Object.entries(M).forEach(([t, v]) => [1, 2, 3].forEach((l) => {
  const o = dem(kho, t, l);
  assert.ok(v[l - 1] ? o >= 2 * v[l - 1] : o === 0, `ô (${t}, mức ${l}) rút ${v[l - 1]} câu, kho có ${o}`);
}));
// năm chủ đề đọc hiểu theo tên Bài 1–5: mỗi đề cố định và phần câu riêng có đúng một đoạn mỗi chủ đề, đoạn 3 câu mức 1-2-3
const docHieu = TOPICS.filter((t) => kho.some((q) => q.topic === t && q.p));
assert.deepEqual(docHieu, ["Bầu trời tuổi thơ", "Khúc nhạc tâm hồn", "Cội nguồn yêu thương", "Giai điệu đất nước", "Màu sắc trăm miền"], "năm chủ đề đọc hiểu theo tên Bài 1–5");
docHieu.forEach((t) => {
  assert.ok(kho.filter((q) => q.topic === t).every((q) => q.p), t + ": mọi câu có đoạn đọc");
  assert.deepEqual(M[t], [1, 1, 1], t + ": ma trận [1, 1, 1]");
  [S.de1, S.de2, S.pool].forEach((id) => {
    const qs = kho.filter((q) => q.topic === t && q.src === id), ps = [...new Set(qs.map((q) => q.p))];
    assert.equal(ps.length, 1, `${id}, ${t}: đúng một đoạn`);
    assert.deepEqual(qs.map((q) => q.lv), [1, 2, 3], `${id}, ${t}: đoạn 3 câu mức 1-2-3`);
  });
});
Object.keys(PSG).forEach((id) => assert.equal(kho.filter((q) => q.p === id).length, 3, "đoạn " + id + " có 3 câu"));
assert.ok(PSG["dinh-deo"] && kho.some((q) => q.p === "dinh-deo" && q.topic === "Giai điệu đất nước"), "Bài 4 có văn bản nghị luận văn học");
assert.ok(kho.filter((q) => !q.p).every((q) => !docHieu.includes(q.topic)), "câu không có đoạn đọc chỉ ở Tiếng Việt, Viết");
const viet = kho.filter((q) => q.topic === "Viết");
assert.ok(viet.every((q) => q.type === "essay" && !q.p) && kho.filter((q) => q.type === "essay").every((q) => q.topic === "Viết"), "chủ đề Viết chỉ gồm câu tự luận không gắn đoạn đọc, tự luận chỉ ở Viết");
viet.forEach((q) => {
  assert.ok(q.rubric.length >= 4 && q.rubric.length <= 6, "câu Viết có 4–6 ý chấm: " + ten.get(q));
  assert.equal(sum(q.rubric.map((r) => r.p)), sum(viet[0].rubric.map((r) => r.p)), "các câu Viết cùng tổng điểm: " + ten.get(q));
  assert.ok(/^(Dàn ý gợi ý|Bài tóm tắt gợi ý|Bài thơ gợi ý)/.test(q.x) && q.x.length > 300, "câu Viết có dàn ý, bài mẫu gợi ý: " + ten.get(q));
});
// sáu kiểu bài Viết của Bài 1–5 (Bài 2 có hai kiểu) đều có
[/tóm tắt/, /sáng tác một bài thơ/, /đoạn văn .*cảm xúc .*bài thơ/, /phân tích đặc điểm của nhân vật/, /bài văn biểu cảm/, /bản tường trình/]
  .forEach((re) => assert.ok(viet.filter((q) => re.test(q.q)).length >= 1, "kiểu bài Viết: " + re));

/* ---------- dạng câu, lựa chọn ---------- */
const tf4 = kho.filter((q) => q.type === "tf4"), kieu = {};
assert.ok(tf4.length >= 4, "mỗi kho ít nhất 4 câu đúng/sai 4 ý");
tf4.forEach((q) => { const k = q.a.map((a) => (a ? "Đ" : "S")).join(""); kieu[k] = (kieu[k] || 0) + 1; assert.ok(/Đ/.test(k) && /S/.test(k), "câu đúng/sai 4 ý có cả ý đúng và ý sai"); });
assert.ok(Math.max(...Object.values(kieu)) === 1, "kiểu Đ/S của các câu đúng/sai 4 ý lặp: " + JSON.stringify(kieu));
assert.ok(kho.some((q) => q.type === "fill"), "có câu trả lời ngắn (điền)");
assert.ok(kho.every((q) => ["mc", "tf4", "fill", "essay"].includes(q.type)), "chỉ dùng dạng câu của khung Công văn 7991 và tự luận");
// gọi người làm bài là «bạn» (trừ lời dẫn trong ngoặc kép), lời giải không nói “ý thứ hai”, “phương án A” (app xáo ý, phương án)
kho.forEach((q) => assert.ok(!/(của em|(?<![Cc]ác )em hãy|Em hãy|theo em|Theo em|em chọn)\b/.test([q.q, q.x].concat(q.o || [], (q.rubric || []).map((r) => r.c)).join(" ").replace(/«[^»]*»|“[^”]*”/g, "")), "gọi người làm bài là «bạn»: " + ten.get(q)));
kho.forEach((q) => assert.ok(!/(ý|phương án|lựa chọn|đáp án) (thứ|số) (nhất|hai|ba|tư|\d)|(phương án|đáp án) [A-D]\b/i.test([q.x].concat(q.o || []).join(" ")), "nhắc vị trí của ý, phương án: " + ten.get(q)));
// đáp án đúng không dài hơn hẳn các lựa chọn sai (ngưỡng như tests/tincn4-ck2.js); các lựa chọn không trùng nhau; ba lựa chọn sai không
// cùng mở đầu một chữ mà đáp án thì không
const mcs = kho.filter((q) => q.type === "mc");
mcs.forEach((q) => {
  const m = Math.max(...q.o.slice(1).map((o) => o.length)), dau = q.o.map((o) => o.split(" ")[0]);
  assert.ok(q.o[0].length <= Math.max(1.2 * m, m + 8), "đáp án đúng dài hơn hẳn các lựa chọn sai: " + ten.get(q));
  assert.equal(new Set(q.o).size, q.o.length, "lựa chọn trùng nhau: " + ten.get(q));
  assert.ok(!(q.o.length >= 4 && dau.slice(1).every((x) => x === dau[1]) && dau[0] !== dau[1] && dau[1].length > 1), "ba lựa chọn sai cùng mở đầu một chữ: " + ten.get(q));
});
// đáp án đúng là lựa chọn dài nhất hay ngắn nhất (hơn hẳn mọi lựa chọn sai): mỗi kiểu không quá một phần ba, cả hai kiểu cộng lại từ một
// phần sáu số câu nhiều lựa chọn (để người làm không đoán theo độ dài)
{
  const khac = mcs.filter((q) => new Set(q.o.map((o) => o.length)).size > 1), hon = (q, f) => q.o.slice(1).every((o) => f(q.o[0].length, o.length));
  const dai = khac.filter((q) => hon(q, (a, b) => a > b)).length, ngan = khac.filter((q) => hon(q, (a, b) => a < b)).length;
  assert.ok(3 * dai <= khac.length, `đáp án là lựa chọn dài nhất ở ${dai}/${khac.length} câu nhiều lựa chọn`);
  assert.ok(3 * ngan <= khac.length, `đáp án là lựa chọn ngắn nhất ở ${ngan}/${khac.length} câu nhiều lựa chọn`);
  assert.ok(6 * (dai + ngan) >= khac.length, `đáp án là lựa chọn dài nhất hay ngắn nhất chỉ ở ${dai + ngan}/${khac.length} câu`);
}
// đáp án không là lựa chọn duy nhất có chữ (cặp hai chữ) của nhãn chủ đề, như tests/soat-nhap.js
mcs.forEach((q) => {
  const c = chuThuong(q.topic).split(" ");
  const tu = c.length === 1 ? c : c.slice(1).map((w, k) => c[k] + " " + w).filter((w) => !/(^| )(trong|của|các|và|ở|về|với|số|lên|giữa|từ|đến|năm|nay|sau)( |$)/u.test(w));
  tu.forEach((w) => { const co = q.o.map((o) => (" " + chuThuong(o) + " ").includes(" " + w + " ")); assert.ok(!(co[0] && !co.slice(1).some(Boolean)), `${ten.get(q)}: chỉ đáp án có chữ “${w}” của nhãn chủ đề`); });
});

/* ---------- đề bài không trùng câu nào khác trong file ---------- */
const gocChu = (s) => String(s).normalize("NFC").toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
{
  const deBai = BANKS.filter((b) => b.file === "7-van.js").flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id).map((q, i) => ({ at: b.id + "#" + (i + 1), k: gocChu(q.q) })));
  deBai.forEach((d) => { const cung = deBai.filter((e) => e.k === d.k).map((e) => e.at); assert.deepEqual(cung, [d.at], "đề bài trùng: " + cung.join(", ")); });
}

/* ---------- không gần trùng kho Ngữ văn 6 (data/banks/6-van.js) ----------
   Đề bài cùng lựa chọn có từ 4 cặp từ liền nhau chung với một câu của kho lớp 6 và số cặp chung từ một nửa số cặp của câu ít cặp hơn thì
   báo; bỏ cách hỏi chung (CUM), cặp của nhãn chủ đề và cặp có ở từ 3% số câu của hai file. Đoạn đọc không có câu văn (từ 5 từ) nào có
   trong đoạn đọc, câu hỏi của kho lớp 6. */
{
  const CUM = ["người soạn viết", "mỗi ý sau đúng hay sai", "đúng hay sai", "câu nào dưới đây", "dưới đây", "có tác dụng gì", "dùng biện pháp tu từ nào", "trong câu",
    "từ ngữ địa phương", "nói giảm nói tránh", "theo văn bản", "theo bạn", "bài thơ", "văn bản", "người viết", "nhân vật"];
  const cap2 = (s) => { let t = String(s).normalize("NFC").toLowerCase(); CUM.forEach((c) => { t = t.split(c).join(" | "); });
    const w = t.replace(/[^\p{L}\p{N}\s|]/gu, " ").split(/\s+/).filter(Boolean); return w.slice(1).map((x, k) => w[k] + " " + x).filter((c) => !c.includes("|")); };
  const file6 = BANKS.filter((b) => b.file === "6-van.js");
  assert.ok(file6.length, "có kho Ngữ văn 6");
  const lop6 = file6.flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)), ca = lop6.concat(kho), df = {};
  ca.forEach((q) => new Set(cap2(q.q)).forEach((c) => (df[c] = (df[c] || 0) + 1)));
  const capAm = (q) => { const nhan = new Set(cap2(q.topic)); return new Set(cap2([q.q].concat(q.o || []).join(" | ")).filter((c) => !nhan.has(c) && (df[c] || 0) < 0.03 * ca.length)); };
  const P6 = lop6.map((x) => [x, capAm(x)]);
  const ganTrung = kho.flatMap((q) => { const c = capAm(q); return P6.map(([x, d]) => { const chung = [...c].filter((y) => d.has(y)); return chung.length >= 4 && chung.length >= 0.5 * Math.min(c.size, d.size) ? `${ten.get(q)} ~ ${x.q.slice(0, 60)}: ${chung.join(", ")}` : null; }).filter(Boolean); });
  if (process.env.DO_KHO) console.log("Câu gần trùng kho Ngữ văn 6:\n" + ganTrung.join("\n"));
  assert.deepEqual(ganTrung, [], "đề bài gần trùng câu của kho Ngữ văn 6");
  const chu6 = " " + file6.flatMap((b) => Object.values(b.passages || {}).map((x) => (x.title || "") + " | " + (x.text || "")).concat(b.questions.flatMap(chu))).map(chuThuong).join(" | ") + " ";
  Object.entries(PSG).forEach(([id, ps]) => String(ps.text).split(/(?<=[.!?…])\s+|\n+/).map(chuThuong).filter((c) => c.split(" ").length >= 5)
    .forEach((c) => assert.ok(!chu6.includes(" " + c + " "), `đoạn ${id} dùng lại câu văn của kho Ngữ văn 6: ${c}`)));
}

/* ---------- rút thử ---------- */
const seen = new Set();
for (let k = 0; k < 400; k++) {
  const d = Quiz.draw(p);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, p.n);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => dem(d.questions, t, l)), v, `rút đúng ma trận ở chủ đề ${t}`));
  docHieu.forEach((t) => assert.equal(new Set(d.questions.filter((q) => q.topic === t).map((q) => q.p)).size, 1, t + ": rút trọn một đoạn"));
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.equal(seen.size, kho.length, "400 lần rút thử phải gặp đủ câu của kho");
// học sinh đã làm hết một đề cố định (đúng cả) thì đề ngẫu nhiên không rút lại câu của đề đó
[S.de1, S.de2].forEach((lam) => {
  const hist = (q) => (q.src === lam ? { done: 1, wrong: 0 } : null);
  for (let k = 0; k < 30; k++) {
    const d = Quiz.draw(p, hist);
    assert.equal(d.notes.length, 0); assert.equal(d.questions.length, p.n);
    assert.ok(d.questions.every((q) => q.src !== lam), `đã làm hết ${lam} thì không rút lại câu của đề đó`);
  }
});

/* ---------- dò lộ đáp án giữa hai câu hiện cùng lúc ----------
   Mọi cặp câu của kho: đề ngẫu nhiên rút chung câu khác chủ đề, đề “Ôn chủ đề” rút chung câu cùng chủ đề (chủ đề dưới 10 câu thì cả
   chủ đề); thêm lời dặn của ba đề (hiện ở màn mở đề). Đáp án (lựa chọn đúng, đáp án điền) tách thành các chuỗi 3 từ liền nhau (đáp án
   từ 3 từ trở xuống thì lấy cả đáp án; bỏ chuỗi có ở từ hai lựa chọn sai), như tests/soat-nhap.js; chuỗi có trong đề bài, lựa chọn,
   lời giải, đáp án, thang chấm hay đoạn đọc (khác đoạn của câu này) của câu kia thì in ra với DO_LO=1 để xem tay; đã xem ở DA_XEM. */
const tuDL = (s) => String(s).normalize("NFC").toLowerCase().replace(/[«»“”"(),.;:!?…–—\-/[\]{}]/g, " ").split(/\s+/).filter(Boolean);
const cum = (s) => { const w = tuDL(s); if (w.length <= 3) return w.length ? [w.join(" ")] : []; const r = []; for (let i = 0; i + 3 <= w.length; i++) r.push(w.slice(i, i + 3).join(" ")); return r; };
const dapAn = (q) => {
  if (q.type === "mc") { const sai = q.o.slice(1).map((o) => " " + tuDL(o).join(" ") + " "); return [...new Set(cum(q.o[0]))].filter((c) => sai.filter((o) => o.includes(" " + c + " ")).length < 2); }
  if (q.type === "fill") return [...new Set(q.ans.map((a) => tuDL(a).join(" ")).filter(Boolean))];
  return [];
};
const LOI_DAN = [d1, d2, p].map((b) => ({ ten: b.id.replace("van7-ck1-", "") + " lời dặn", loi: b.note }));
const doLo = (qs, tenCau, notes) => {
  const ra = [];
  qs.forEach((a) => {
    const C = dapAn(a);
    if (!C.length) return;
    qs.concat(notes || []).forEach((b) => {
      if (b === a) return;
      const T = " " + (b.loi ? [b.loi] : chu(b).concat(b.p && b.p !== a.p ? [PSG[b.p].title + " " + PSG[b.p].text] : [])).map((s) => tuDL(s).join(" ")).join(" | ") + " ";
      C.filter((c) => T.includes(" " + c + " ")).forEach((c) => ra.push(`${b.loi ? b.ten : tenCau(b)} → ${tenCau(a)}: ${c}`));
    });
  });
  return [...new Set(ra)];
};
const lo = doLo(kho, (q) => ten.get(q), LOI_DAN);
if (process.env.DO_LO) console.log("Đáp án có ở câu hiện cùng lúc (xem tay):\n" + lo.map((s) => "  " + JSON.stringify(s) + ",").join("\n"));
// đã xem (Phiên N7-ck1-van): chữ chung, không làm lộ đáp án. “ngôi thứ ba”: hai truyện khác nhau («Hộp cơm trưa», «Lá thư từ đảo») cùng
// có phần kể theo ngôi thứ ba, mỗi câu hỏi về truyện của mình; “là cách nói”: lời giải câu nói giảm nói tránh («là cách nói tránh»),
// không nói gì về cách nói mỉa mai; “ở chợ phiên”: phương án sai của câu kia về «Phiên chợ vùng cao», một phương án sai của câu này
// cũng có chữ đó (số từ ước chừng là «dăm»).
const DA_XEM = [
  "de1#7 → ngau-nhien#7: ngôi thứ ba", "de2#18 → ngau-nhien#40: là cách nói", "ngau-nhien#7 → de1#7: ngôi thứ ba", "de2#14 → de1#21: ở chợ phiên"
];
assert.deepEqual(lo, DA_XEM, "đáp án có ở câu hiện cùng lúc đã đổi: chạy DO_LO=1, xem tay rồi sửa DA_XEM");
// bộ dò bắt được chỗ lộ cố ý viết sai
{
  const a = cau("có nghĩa là «bây giờ»"), b = cau("phó từ «vẫn» cho biết điều gì");
  const gia = Object.assign({}, b, { x: b.x + " Ở miền Trung, «bây giờ» là «chừ»." });
  assert.ok(doLo([a, gia], (q) => (q === a ? "A" : "B")).includes("B → A: chừ"), "bộ dò phải bắt được đáp án nằm trong lời giải câu khác");
}

/* ---------- không chép sách: so với chữ OCR (bỏ dấu, gộp nguyên âm), nếu có OnUp-Book ---------- */
const BOOK = path.join(__dirname, "../../OnUp-Book");
const SACH = fs.existsSync(BOOK) ? fs.readdirSync(BOOK).filter((l) => /^lop-\d+$/.test(l)).flatMap((l) => fs.readdirSync(path.join(BOOK, l)).map((c) => path.join(BOOK, l, c, "chu.txt"))).filter((f) => fs.existsSync(f)) : [];
const TRICH = []; // câu trích nguyên văn được phép trùng sách (không có)
// tên văn bản, tác giả của sách nhắc trong câu Viết: gộp thành một từ trước khi so
const GOP = ["Vừa nhắm mắt vừa mở cửa sổ", "Nguyễn Ngọc Thuần"];
// cụm chữ chung (cách hỏi chung của đề Ngữ văn, tên chủ đề theo tên bài và mục Thực hành tiếng Việt của sách, quốc hiệu – tiêu ngữ của
// văn bản tường trình): thay bằng dấu ngăn trước khi so, vì không phải câu văn riêng của sách hay của câu khác
const TU_CHUNG = ["người soạn viết", "mỗi ý sau đúng hay sai", "nào dưới đây", "trong câu", "dùng biện pháp tu từ nào", "có tác dụng gì", "nhằm điều gì",
  "tác dụng của biện pháp tu từ", "số từ chỉ số lượng ước chừng", "đã nói giảm nói tránh", "cộng hoà xã hội chủ nghĩa việt nam", "độc lập – tự do – hạnh phúc",
  "Bầu trời tuổi thơ", "Khúc nhạc tâm hồn", "Cội nguồn yêu thương", "Giai điệu đất nước", "Màu sắc trăm miền", "Mở rộng thành phần câu bằng cụm từ",
  "Nói giảm nói tránh", "Nghĩa của từ ngữ trong ngữ cảnh", "Biện pháp tu từ", "Từ ngữ địa phương"];
// nhớ kết quả của khongDau: mỗi chuỗi chỉ chuẩn hoá một lần (các vòng lặp lồng nhau gọi lại trên cùng chữ; kết quả như cũ)
const nhoChuoi = (f) => { const m = new Map(); return (s) => { const k = String(s); let v = m.get(k); if (v === undefined) { v = f(k); if (typeof v === "string") m.set(k, v); } return v; }; };
// tra nhanh chuỗi k từ: băm mọi chuỗi k từ của chữ đã chuẩn hoá (một lần cho mỗi chữ, mỗi k), chỉ so thật (includes) khi băm có
const traChu = (() => {
  const bam = (w, k) => {
    const A = new Uint32Array(w.length), B = new Uint32Array(w.length), m = Math.max(0, w.length - k + 1), H = new Float64Array(m);
    for (let i = 0; i < w.length; i++) { let a = 0x811c9dc5, b = 0x1b873593; const t = w[i]; for (let j = 0; j < t.length; j++) { const x = t.charCodeAt(j); a = Math.imul(a ^ x, 0x01000193); b = Math.imul(b ^ x, 0x5bd1e995); } A[i] = a; B[i] = b; }
    for (let i = 0; i < m; i++) { let a = 0x9e3779b9, b = 0x85ebca6b; for (let j = i; j < i + k; j++) { a = Math.imul(a ^ A[j], 0x01000193); b = Math.imul(b ^ B[j], 0x5bd1e995); } H[i] = (a >>> 0) * 2097152 + (b >>> 11); }
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
const boDau = (s) => String(s).normalize("NFC").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[đĐ]/g, "d").toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const GOP_ = GOP.map(boDau).sort((a, b) => b.length - a.length), TU_CHUNG_ = TU_CHUNG.map((c) => " " + boDau(c) + " ").sort((a, b) => b.length - a.length);
// bỏ dấu, bỏ câu trích, thay cụm chung bằng dấu ngăn, gộp tên riêng nhiều chữ thành một từ, gộp nguyên âm (chữ OCR hay đọc sai dấu, nguyên âm)
const khongDau = nhoChuoi((s) => {
  let t = " " + boDau(TRICH.reduce((x, c) => x.split(c).join(" "), String(s).normalize("NFC"))) + " ";
  TU_CHUNG_.forEach((c) => { while (t.includes(c)) t = t.replace(c, " | "); });
  GOP_.forEach((g) => { t = t.split(" " + g + " ").join(" " + g.replace(/ /g, "") + " "); });
  return t.replace(/[aeiouy]+/g, "a").replace(/\s+/g, " ").trim();
});
// chuỗi k từ (không qua dấu ngăn), ít nhất 5 từ có chữ cái (số như “2/3”, “3/2” của nhịp thơ không tính là từ)
const chuoi = (s, k) => { const w = khongDau(s).split(" ").filter(Boolean), ra = []; for (let i = 0; i + k <= w.length; i++) { const c = w.slice(i, i + k); if (!c.includes("|") && c.filter((x) => /[a-z]{2}/.test(x)).length >= 5) ra.push(c.join(" ")); } return ra; };
const truong = (q) => chu(q).concat(q.p && q === kho.find((x) => x.p === q.p) ? [PSG[q.p].title, PSG[q.p].text] : []);
if (SACH.length) {
  assert.ok(SACH.some((f) => /ngu-van-7-tap-1/.test(f)) && SACH.some((f) => /ngu-van-7-tap-2/.test(f)), "OnUp-Book có Ngữ văn 7 hai tập");
  const sach = " " + SACH.map((f) => khongDau(fs.readFileSync(f, "utf8").replace(/=== page-\d+ · [^=]+ ===/g, " "))).join(" | ") + " ";
  // tên văn bản, tác giả ở GOP có trong Ngữ văn 7 tập một (mục lục in năm 2026)
  const tap1 = khongDau(fs.readFileSync(SACH.find((f) => /ngu-van-7-tap-1/.test(f)), "utf8"));
  GOP.forEach((g) => assert.ok((" " + tap1 + " ").includes(" " + khongDau(g) + " "), "Ngữ văn 7 tập một có «" + g + "»"));
  const bao = (k) => kho.flatMap((q) => truong(q).flatMap((s) => chuoi(s, k).filter((c) => traChu.co(sach, c)).map((c) => `${ten.get(q)}: ${c}`)));
  if (process.env.DO_SACH) console.log("Chuỗi 6 từ trùng chữ OCR của sách (xem tay):\n" + [...new Set(bao(6))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng chữ của sách");
  console.log("Đã so với chữ OCR của " + SACH.length + " cuốn sách (OnUp-Book).");
} else console.log("Không có ../OnUp-Book: bỏ qua bước so với chữ của sách.");
/* ---------- trùng ý với các kho khác: chuỗi từ liền nhau trùng câu, đoạn đọc của kho khác (cả câu riêng của đề ngẫu nhiên) ---------- */
{
  const khac = BANKS.filter((b) => !/^van7-ck1-/.test(b.id)).flatMap((b) => b.questions.filter((q) => !b.pool || q.src === b.id)
    .map((q) => ({ id: b.id, s: " " + chu(q).concat(q.p && b.passages && b.passages[q.p] ? [b.passages[q.p].text || ""] : []).map(khongDau).join(" | ") + " " })));
  const bao = (k) => kho.flatMap((q) => [...new Set(truong(q).flatMap((s) => chuoi(s, k)))].flatMap((c) => traChu.loc(khac, c).map((o) => `${ten.get(q)} ~ ${o.id}: ${c}`)));
  if (process.env.DO_KHO) console.log("Chuỗi 5 từ trùng câu của kho khác (xem tay):\n" + [...new Set(bao(5))].join("\n"));
  assert.deepEqual([...new Set(bao(8))], [], "chuỗi 8 từ trùng câu của kho khác");
}
console.log(n, "câu đã tính lại bằng code; kho " + kho.length + " câu (" + rieng.length + " câu riêng), " + Object.keys(PSG).length + " đoạn đọc, "
  + Object.keys(THO).length + " bài thơ đã đếm tiếng, ma trận 10 – 8 – 7 trên " + TOPICS.length + " chủ đề.");
console.log("VAN7 OK");
