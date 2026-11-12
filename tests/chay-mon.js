/* Chạy các script kiểm tra đề (tests/README.md, mục 3) song song, in bảng kết quả.
   node tests/chay-mon.js [--song-song N] [--het-gio <giây>] [--luu <thư mục>] [<phần tên script> …]
     Không ghi tên: mọi script kiểm tra của môn (tên <môn><khối>-<kì>.js), tests/toan-phien8.js và tests/kiem-tra-de.js. Ghi tên: chỉ các
     script có tên chứa một trong các chữ đó (vd: lichsu, 12-tn, khtn9). --song-song: số script chạy cùng lúc (mặc định số nhân CPU trừ 1);
     --het-gio: dừng script chạy quá số giây đó (mặc định 900); --luu: ghi toàn bộ chữ in ra của từng script vào <thư mục>/<tên>.log (để so
     hai lần chạy).
   Script chạy lâu chạy trước (thời gian lần trước lưu ở thư mục tạm của máy, onup-de-dem/thoi-gian.json), nên chạy hết chỉ lâu hơn script lâu
   nhất một chút. Mỗi script in một dòng: OK hay LỖI, số giây, dòng cuối; script lỗi in thêm các dòng đầu của lỗi. Thoát với mã 1 khi có
   script lỗi. Dùng trước khi mở Pull Request có đề mới (đề mới có thể làm script của môn khác báo lỗi: tests/soat-nhap.js, mục “Kho khác”). */
"use strict";
const fs = require("fs");
const os = require("os");
const path = require("path");
const { spawn } = require("child_process");
const D = require("./de-chung.js");

const args = process.argv.slice(2), loc = [];
let song = Math.max(1, os.cpus().length - 1), hetGio = 900, luu = null;
for (let i = 0; i < args.length; i++) {
  if (args[i] === "--song-song") song = Math.max(1, parseInt(args[++i], 10) || 1);
  else if (args[i] === "--het-gio") hetGio = parseInt(args[++i], 10) || 900;
  else if (args[i] === "--luu") luu = path.resolve(args[++i]);
  else loc.push(args[i]);
}
const THU = __dirname;
const ds = fs.readdirSync(THU).filter((f) => /^[a-z0-9-]+\d+-(gk1|ck1|gk2|ck2|tn|vao10)\.js$/.test(f) || f === "toan-phien8.js" || f === "kiem-tra-de.js")
  .filter((f) => !loc.length || loc.some((x) => f.includes(x))).sort();
if (!ds.length) { console.log("Không có script nào khớp " + loc.join(", ")); process.exit(0); }
const FTG = path.join(D.DEM, "thoi-gian.json");
let tg = {};
try { tg = JSON.parse(fs.readFileSync(FTG, "utf8")); } catch (e) { /* lần đầu */ }
const hang = ds.slice().sort((a, b) => (tg[b] || 60) - (tg[a] || 60));
const t0 = Date.now(), ketQua = [];
console.log(`Chạy ${ds.length} script, ${song} script cùng lúc…`);
function chay(f) {
  return new Promise((xong) => {
    const bd = Date.now(), p = spawn(process.execPath, [path.join(THU, f)], { cwd: D.ROOT, env: process.env });
    let ra = "";
    p.stdout.on("data", (d) => { ra += d; }); p.stderr.on("data", (d) => { ra += d; });
    const hen = setTimeout(() => { ra += "\n(quá " + hetGio + " giây, đã dừng)"; p.kill("SIGKILL"); }, hetGio * 1000);
    p.on("close", (ma) => {
      clearTimeout(hen);
      const giay = (Date.now() - bd) / 1000, dong = ra.trim().split("\n");
      const r = { f, ma, giay, cuoi: dong[dong.length - 1] || "", ra };
      if (luu) { fs.mkdirSync(luu, { recursive: true }); fs.writeFileSync(path.join(luu, f.replace(/\.js$/, ".log")), ra); }
      ketQua.push(r);
      console.log(`${ma === 0 ? "OK  " : "LỖI "} ${giay.toFixed(1).padStart(6)} giây  ${f.padEnd(28)} ${r.cuoi.slice(0, 80)}`);
      xong();
    });
  });
}
(async () => {
  const cho = hang.slice(), chayDong = [];
  const tiep = async () => { while (cho.length) await chay(cho.shift()); };
  for (let i = 0; i < Math.min(song, hang.length); i++) chayDong.push(tiep());
  await Promise.all(chayDong);
  ketQua.forEach((r) => { if (r.ma === 0) tg[r.f] = Math.round(r.giay * 10) / 10; });
  try { fs.mkdirSync(D.DEM, { recursive: true }); fs.writeFileSync(FTG, JSON.stringify(tg, null, 1)); } catch (e) { /* không ghi được thì thôi */ }
  const loi = ketQua.filter((r) => r.ma !== 0).sort((a, b) => a.f.localeCompare(b.f));
  loi.forEach((r) => {
    const dong = r.ra.split("\n").filter((l) => l.trim() && !/^\s+at /.test(l));
    const i = Math.max(0, dong.findIndex((l) => /Error|lỗi|LỖI/.test(l)));
    console.log(`\n=== ${r.f} (mã ${r.ma})\n` + dong.slice(i, i + 14).map((l) => "  " + l.slice(0, 220)).join("\n"));
  });
  console.log(`\n${ketQua.length - loi.length}/${ketQua.length} script OK` + (loi.length ? `, ${loi.length} script lỗi: ${loi.map((r) => r.f).join(", ")}` : "")
    + ` · ${((Date.now() - t0) / 1000).toFixed(0)} giây.`);
  process.exit(loi.length ? 1 : 0);
})();
