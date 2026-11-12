/* Tự thử các công cụ làm đề (tests/README.md, mục 1), không cần trình duyệt: node tests/thu-cong-cu.js → in CONG CU OK.
   - xem-chu-de.js, tim.js, phu-sach.js chạy được và tìm đúng chỗ đã biết;
   - ghep-de.js --xuat một đề có sẵn ra nháp; soat-nhap.js với nháp đó không báo lỗi; ghep-de.js --thu với nháp đó: đề, dòng danh mục không đổi;
   - cài lỗi vào nháp (lộ đáp án, đáp án dài hơn hẳn, điểm sai, kiểu Đ/S lặp, câu trùng kho, nhắc vị trí phương án, mức sai, cách hỏi chung
     trùng câu của kho môn khác, câu chép sách) rồi soát lại: mỗi lỗi phải được báo đúng nhóm.
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
} finally {
  fs.rmSync(tam, { recursive: true, force: true });
}
console.log("CONG CU OK");
