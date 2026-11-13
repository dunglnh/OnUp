/* Tự thử các công cụ làm đề (tests/README.md, mục 1), không cần trình duyệt: node tests/thu-cong-cu.js → in CONG CU OK.
   - xem-chu-de.js, tim.js, phu-sach.js chạy được và tìm đúng chỗ đã biết;
   - ghep-de.js --xuat một đề có sẵn ra nháp; soat-nhap.js với nháp đó không báo lỗi; ghep-de.js --thu với nháp đó: đề, dòng danh mục không đổi;
   - cài lỗi vào nháp (lộ đáp án, đáp án dài hơn hẳn, điểm sai, kiểu Đ/S lặp, câu trùng kho, nhắc vị trí phương án, mức sai, cách hỏi chung
     trùng câu của kho môn khác, câu chép sách) rồi soát lại: mỗi lỗi phải được báo đúng nhóm;
   - kho Tiếng Anh 7 (hai đề cố định và đề ngẫu nhiên có đoạn đọc) xuất ra nháp rồi soát: lời dặn chuẩn và tên đoạn đọc không làm mục “kho
     khác” báo nhầm (Phiên N7-ck1-khtn), ghép thử không đổi; câu chép câu của kho Tiếng Anh 9 (phần sau lời dặn) thì vẫn báo.
   Đề dùng để thử: Lịch sử 12 · Thi thử tốt nghiệp · Đề 8 (đã qua tests/lichsu12-tn.js và mọi script khác); không ghi gì vào repo. */
"use strict";
const assert = require("assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawnSync } = require("child_process");
const D = require("./de-chung.js");

const ROOT = D.ROOT, MA = "lichsu12-tn-de8", MON = "tests/lichsu12-tn.js";
const chay = (f, args) => { const r = spawnSync(process.execPath, [path.join(__dirname, f)].concat(args), { cwd: ROOT, encoding: "utf8", maxBuffer: 64 << 20 }); return { ma: r.status, ra: (r.stdout || "") + (r.stderr || "") }; };
const tam = fs.mkdtempSync(path.join(os.tmpdir(), "onup-thu-"));
try {
  // công cụ xem, tìm
  let r = chay("xem-chu-de.js", ["12-lichsu.js"]);
  assert.equal(r.ma, 0, r.ra); assert.ok(/Liên hợp quốc/.test(r.ra), "xem-chu-de.js: bảng chủ đề có “Liên hợp quốc”");
  r = chay("xem-chu-de.js", ["12-lichsu.js", "Liên hợp quốc", "--giai"]);
  assert.equal(r.ma, 0, r.ra); assert.ok(/lichsu12-tn-de\d+#\d+/.test(r.ra) && /\n {4}x: /.test(r.ra), "xem-chu-de.js: câu của chủ đề kèm lời giải");
  r = chay("tim.js", ["Tuần lễ vàng", "--kho", "12-lichsu.js", "--chi-kho"]);
  assert.equal(r.ma, 0, r.ra); assert.ok(r.ra.includes(MA + "#23"), "tim.js: thấy “Tuần lễ vàng” ở câu 23 Đề 8");
  if (D.coSach()) {
    r = chay("tim.js", ["Tuần lễ vàng", "--sach", "lich-su-12", "--chi-sach"]);
    assert.equal(r.ma, 0, r.ra); assert.ok(/lop-12\/lich-su-12 · trang in \d+/.test(r.ra), "tim.js: thấy “Tuần lễ vàng” trong Lịch sử 12");
    r = chay("phu-sach.js", ["lop-12/lich-su-12", "12-lichsu.js", "--it", "3"]);
    assert.equal(r.ma, 0, r.ra); assert.ok(/Bài 1\. Liên hợp quốc/.test(r.ra), "phu-sach.js: độ phủ theo bài của mục lục");
    r = chay("phu-sach.js", ["lop-12/lich-su-12", "--doc", "8"]);
    assert.equal(r.ma, 0, r.ra); assert.ok(/page-\d+; ảnh: /.test(r.ra), "phu-sach.js --doc in một trang");
  }

  // xuất, soát, ghép thử: không lỗi, không đổi
  r = chay("ghep-de.js", ["--xuat", MA]);
  assert.equal(r.ma, 0, r.ra);
  const goc = path.join(tam, "goc.js");
  fs.writeFileSync(goc, r.ra);
  const soat = (f) => chay("soat-nhap.js", [f, "--mon", MON]);
  r = soat(goc);
  assert.equal(r.ma, 0, "soat-nhap.js báo lỗi ở đề đã qua mọi script:\n" + r.ra);
  assert.ok(/Không có lỗi/.test(r.ra), r.ra);
  r = chay("ghep-de.js", [goc, "--thu"]);
  assert.equal(r.ma, 0, r.ra);
  assert.ok(r.ra.includes(MA + ": đề trong data/banks/12-lichsu.js không đổi") && r.ra.includes(MA + ": dòng danh mục không đổi"), "ghep-de.js --thu với nháp xuất ra: không đổi\n" + r.ra);

  // cài lỗi
  const d = JSON.parse(JSON.stringify(require(goc))), qs = d.questions;
  const kho = D.kho(), cau = D.cacCau(kho);
  qs[1].x += " Ghi nhớ: " + qs[4].o[0] + ".";                                               // #2 lộ đáp án #5
  qs[2].o[0] += ", đây là phần viết thêm rất dài để đáp án đúng dài hơn hẳn các lựa chọn sai";  // #3 đáp án dài
  qs[0].pt = 0.3;                                                                           // #1 điểm sai, tổng điểm sai
  const tf = qs.map((q, i) => i).filter((i) => qs[i].type === "tf4");
  qs[tf[1]].a = qs[tf[0]].a.slice();                                                        // kiểu Đ/S lặp
  const gk = cau.find((e) => e.b.id === "lichsu12-gk2-de1" && e.q.type === "mc");
  qs[6] = Object.assign({}, gk.q, { part: qs[6].part, pt: 0.25 });                          // #7 trùng câu kho
  qs[9].x += " Phương án B sai vì không đúng thời gian.";                                   // #10 nhắc vị trí phương án
  qs[14].lv = 4;                                                                            // #15 mức sai
  const gd = cau.find((e) => /^Việc làm nào sau đây của học sinh thể hiện thái độ phản đối chiến tranh phi nghĩa/.test(e.q.q));
  qs[16].q = gd.q.q;                                                                        // #17 cách hỏi trùng câu của kho GDCD 9
  let sach = null;
  if (D.coSach()) {
    const tr = D.trangCua(D.cacCuon("lop-12/lich-su-12")[0]).find((p) => p.trang === "101");
    sach = tr.chu.replace(/\s+/g, " ").slice(200, 420);
    const p0 = Object.keys(d.passages)[0];
    d.passages[p0].text += " " + sach;                                                      // chép sách vào đoạn tư liệu
  }
  const hong = path.join(tam, "hong.js");
  fs.writeFileSync(hong, "module.exports = " + JSON.stringify(d) + ";\n");
  r = soat(hong);
  assert.equal(r.ma, 1, "soat-nhap.js phải thoát mã 1 khi có lỗi:\n" + r.ra);
  const can = [
    [/\[dò lộ\] lichsu12-tn-de8#2 → lichsu12-tn-de8#5 /, "lộ đáp án câu 5 ở lời giải câu 2"],
    [/\[lựa chọn\] #3: đáp án đúng dài hơn hẳn/, "đáp án đúng dài hơn hẳn"],
    [/\[cấu trúc\] #1: pt = 0\.3/, "điểm của câu"],
    [/\[cấu trúc\] tổng pt của các câu là 10\.05/, "tổng điểm"],
    [/\[lựa chọn\] kiểu Đ\/S của các câu đúng\/sai 4 ý lặp/, "kiểu Đ/S lặp"],
    [/\[cấu trúc\] #7: trùng câu lichsu12-gk2-de1#\d+/, "câu trùng kho"],
    [/\[lựa chọn\] #10: nhắc vị trí của phương án/, "nhắc vị trí phương án"],
    [/\[cấu trúc\] #15: mức độ lv = 4/, "mức độ"],
    [/\[kho khác\] lichsu12-tn-de8#17 q: tests\/lsdl-gdcd9-ck1\.js sẽ báo/, "cách hỏi chung làm script của môn khác báo lỗi"],
  ].concat(sach ? [[/\[sách\] lichsu12-tn-de8 đoạn [^:]+: chuỗi 8 từ trùng [^\n]*lop-12\/lich-su-12 trang in/, "chép sách"]] : []);
  const thieu = can.filter(([re]) => !re.test(r.ra)).map(([, t]) => t);
  assert.deepEqual(thieu, [], "soat-nhap.js không báo: " + thieu.join("; ") + "\n" + r.ra);

  // kho Tiếng Anh 7: các script Tiếng Anh 5, 9, 12 bỏ lời dặn chuẩn khỏi đề bài (boLoiDan: “Write the correct form of the verb in brackets.”,
  // “Read the text again. Is each sentence true or false?”, “Which part of the sentence is wrong?”) và không so tên đoạn đọc (“Read the text.
  // Then answer the questions.”), nên các chỗ đó không được báo “kho khác”; đề ngẫu nhiên xuất ra chỉ có đoạn đọc câu riêng dùng
  const TA = ["ta7-ck1-de1", "ta7-ck1-de2", "ta7-ck1-ngau-nhien"], MON_TA = "tests/ta7-ck1.js";
  r = chay("ghep-de.js", ["--xuat"].concat(TA));
  assert.equal(r.ma, 0, r.ra);
  const ta = path.join(tam, "ta.js");
  fs.writeFileSync(ta, r.ra);
  r = chay("soat-nhap.js", [ta, "--mon", MON_TA]);
  assert.equal(r.ma, 0, "soat-nhap.js báo lỗi ở kho Tiếng Anh 7 đã qua mọi script:\n" + r.ra);
  assert.ok(!/\[kho khác\]/.test(r.ra), "lời dặn chuẩn, tên đoạn đọc bị báo “kho khác”:\n" + r.ra);
  r = chay("ghep-de.js", [ta, "--thu"]);
  assert.equal(r.ma, 0, r.ra);
  TA.forEach((id) => assert.ok(r.ra.includes(id + ": đề trong data/banks/7-ta.js không đổi"), "ghep-de.js --thu với kho Tiếng Anh 7 xuất ra: " + id + " không đổi\n" + r.ra));
  // câu chép câu của kho Tiếng Anh 9 (cùng lời dặn, cả câu sau lời dặn) thì script Tiếng Anh 9 vẫn báo
  const c9 = cau.find((e) => /^ta9-ck1-/.test(e.b.id) && /^Write the correct form of the verb in brackets\. \S+( \S+){9}/.test(e.q.q)), dt = JSON.parse(JSON.stringify(require(ta)));
  dt[0].questions[0].q = c9.q.q;
  const taHong = path.join(tam, "ta-hong.js");
  fs.writeFileSync(taHong, "module.exports = " + JSON.stringify(dt) + ";\n");
  r = chay("soat-nhap.js", [taHong, "--mon", MON_TA]);
  assert.ok(/\[kho khác\] ta7-ck1-de1#1 q: tests\/ta9-ck1\.js sẽ báo/.test(r.ra), "câu chép câu Tiếng Anh 9 phải được báo “kho khác”:\n" + r.ra);
} finally {
  fs.rmSync(tam, { recursive: true, force: true });
}
console.log("CONG CU OK");
