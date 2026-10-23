// Tính lại đáp án ngân hàng KHTN 6 giữa kì II (data/banks/6-khtn.js): hai đề cố định khtn6-gk2-de1, khtn6-gk2-de2 và các câu
// riêng của đề ngẫu nhiên khtn6-gk2-ngau-nhien (Phiên N11), theo mẫu tests/khtn6-gk1.js. Câu có phép tính hoặc có hình được nhận ra
// bằng một đoạn chữ của đề (has, đúng một câu trong kho, đúng đề ghi ở src); so đáp án với kết quả tính bằng code: trả lời bằng số
// ans, trắc nghiệm o[0]. Câu có hình đọc lại hình: khoá lưỡng phân (ô câu hỏi, ô kết quả, mũi tên đi từ ô nào tới ô nào, nhãn
// Có/Không của từng mũi tên; đi theo khoá với bảng đặc điểm của từng sinh vật ghi ở dưới, CAY và CON), sơ đồ cấu tạo vi khuẩn,
// virus, nấm, cây rêu (đường kẻ từ mỗi số dừng ở bộ phận nào, tính bằng toạ độ của các hình; mỗi số chỉ đúng một bộ phận). Câu trả
// lời bằng số và câu điền có đáp án là số nào trong kho cũng phải có kiểm tra ở đây.
// Cuối cùng kiểm tra mức độ và ma trận như tests/khtn6-gk1.js: mọi câu có lv, mỗi ô (chủ đề, mức) có ít nhất gấp đôi số câu ô đó
// rút, câu riêng nằm ở ô có rút câu, cả hai đề cố định chia đúng ma trận, rút thử nhiều lần ra đúng 10 Biết, 8 Hiểu, 7 Vận dụng,
// đúng ma trận từng chủ đề và gặp đủ các câu riêng; học sinh đã làm hết Đề 1 hoặc Đề 2 vẫn rút được 25 câu toàn câu chưa làm.
// Chạy: node tests/khtn6-gk2.js → in MATH OK.
const assert = require("assert");
const fs = require("fs");
const path = require("path");
const vm = require("vm");
const BANKS = require("./nap-de.js").napDe();
const bank = (id) => BANKS.find((b) => b.id === id);
const POOL = "khtn6-gk2-ngau-nhien", DE1 = "khtn6-gk2-de1", DE2 = "khtn6-gk2-de2";

/* ---------- hình ---------- */
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w-]+)="([^"]*)"/g)].map((m) => [m[1], m[2]]));
const tags = (svg, name) => [...svg.matchAll(new RegExp(`<${name} [^>]*>`, "g"))].map((m) => attrs(m[0]));
const texts = (svg) => [...svg.matchAll(/<text ([^>]*)>([^<]*)<\/text>/g)].map((m) => Object.assign(attrs("<t " + m[1] + ">"), { t: m[2] }));
const num = (a, k) => +a[k];
const pts = (s) => s.trim().split(/\s+/).map((p) => p.split(",").map(Number));
const ends = (l) => [[num(l, "x1"), num(l, "y1")], [num(l, "x2"), num(l, "y2")]];
const half = (s) => num(s, "stroke-width") / 2 + 0.5; // nửa nét vẽ, thêm 0,5 px
const inRect = (p, r, tol = 0) => p[0] >= num(r, "x") - tol && p[0] <= num(r, "x") + num(r, "width") + tol && p[1] >= num(r, "y") - tol && p[1] <= num(r, "y") + num(r, "height") + tol;
const onEdge = (p, r) => inRect(p, r, 0.5) && [p[0] - num(r, "x"), p[0] - num(r, "x") - num(r, "width"), p[1] - num(r, "y"), p[1] - num(r, "y") - num(r, "height")].some((d) => Math.abs(d) <= 0.5);
// khoảng cách có dấu từ điểm tới đường viền hình chữ nhật bo góc (âm: ở trong hình)
const rrDist = (p, r) => {
  const w = num(r, "width") / 2, h = num(r, "height") / 2, k = +(r.rx || 0);
  const qx = Math.abs(p[0] - num(r, "x") - w) - (w - k), qy = Math.abs(p[1] - num(r, "y") - h) - (h - k);
  return Math.hypot(Math.max(qx, 0), Math.max(qy, 0)) + Math.min(Math.max(qx, qy), 0) - k;
};
const inEllipse = (p, e) => ((p[0] - num(e, "cx")) / num(e, "rx")) ** 2 + ((p[1] - num(e, "cy")) / num(e, "ry")) ** 2 <= 1;
const segDist = (p, a, b) => {
  const dx = b[0] - a[0], dy = b[1] - a[1], L = dx * dx + dy * dy, t = L ? Math.max(0, Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / L)) : 0;
  return Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
};
const lineDist = (p, pl) => Math.min(...pl.slice(1).map((b, i) => segDist(p, pl[i], b)));
// đường cong trong hình chỉ dùng lệnh M, q, t (toạ độ tương đối): đổi thành nhiều đoạn thẳng nhỏ
const pathPts = (d) => {
  const tk = d.match(/[A-Za-z]|-?[\d.]+/g), out = [];
  let i = 0, cmd = null, cur = null, ctrl = null;
  const nx = () => +tk[i++];
  while (i < tk.length) {
    if (/[A-Za-z]/.test(tk[i])) cmd = tk[i++];
    if (cmd === "M") { cur = [nx(), nx()]; ctrl = null; out.push(cur); continue; }
    assert.ok(cmd === "q" || cmd === "t", "đường cong chỉ dùng M, q, t");
    const c = cmd === "q" ? [cur[0] + nx(), cur[1] + nx()] : ctrl ? [2 * cur[0] - ctrl[0], 2 * cur[1] - ctrl[1]] : cur, end = [cur[0] + nx(), cur[1] + nx()];
    for (let s = 1; s <= 20; s++) { const t = s / 20, u = 1 - t; out.push([0, 1].map((k) => u * u * cur[k] + 2 * u * t * c[k] + t * t * end[k])); }
    ctrl = c; cur = end;
  }
  return out;
};

/* Số đánh dấu: chữ số trong một vòng tròn nhỏ (r = 11), một đường kẻ đi từ mép vòng tròn tới bộ phận được chỉ. Trả về điểm cuối
   đường kẻ của từng số và danh sách đường kẻ đó (để các hàm đọc hình bỏ ra). */
const docSo = (svg) => {
  const so = tags(svg, "circle").filter((c) => num(c, "r") === 11), lines = tags(svg, "line"), at = {}, leaders = [];
  texts(svg).filter((t) => /^\d$/.test(t.t)).forEach((t) => {
    const c = so.find((s) => Math.hypot(num(s, "cx") - +t.x, num(s, "cy") - (+t.y - 5)) < 1);
    assert.ok(c, "số " + t.t + " cần nằm trong một vòng tròn nhỏ");
    const l = lines.filter((x) => Math.abs(Math.hypot(num(x, "x1") - num(c, "cx"), num(x, "y1") - num(c, "cy")) - 11) < 0.5);
    assert.equal(l.length, 1, "số " + t.t + " cần đúng một đường kẻ");
    at[t.t] = ends(l[0])[1]; leaders.push(l[0]);
  });
  assert.deepEqual(Object.keys(at).sort(), ["1", "2", "3", "4"], "hình đánh số 1, 2, 3, 4");
  const key = (l) => [l.x1, l.y1, l.x2, l.y2].join();
  return { at, other: lines.filter((l) => !leaders.some((x) => key(x) === key(l))) };
};

/* Mỗi hàm dưới nhận hình (và các đường kẻ không phải đường chỉ số), trả về hàm cho biết một điểm nằm trên bộ phận nào. */
// Vi khuẩn: hai hình chữ nhật bo góc lồng nhau (ngoài: thành tế bào, trong: màng tế bào), hình bầu dục ở giữa là vùng nhân, phần
// còn lại bên trong màng là tế bào chất, đường lượn sóng mọc ra từ thành tế bào là roi.
const viKhuan = (svg) => {
  const [ngoai, trong] = tags(svg, "rect").sort((a, b) => num(b, "width") - num(a, "width")), [nhan] = tags(svg, "ellipse"), [roi] = tags(svg, "path");
  assert.ok(ngoai && trong && nhan && roi, "cần thành, màng, vùng nhân, roi");
  const song = pathPts(roi.d);
  assert.ok(rrDist([num(trong, "x"), num(trong, "y") + num(trong, "height") / 2], ngoai) < 0, "màng nằm trong thành tế bào");
  assert.ok(rrDist([num(nhan, "cx") - num(nhan, "rx"), num(nhan, "cy")], trong) < 0 && rrDist([num(nhan, "cx") + num(nhan, "rx"), num(nhan, "cy")], trong) < 0, "vùng nhân nằm trong màng");
  assert.ok(Math.abs(rrDist(song[0], ngoai)) <= half(ngoai), "roi mọc ra từ thành tế bào");
  return (p) => [
    Math.abs(rrDist(p, ngoai)) <= half(ngoai) && "Thành tế bào",
    Math.abs(rrDist(p, trong)) <= half(trong) && "Màng tế bào",
    inEllipse(p, nhan) && "Vùng nhân",
    rrDist(p, trong) < -half(trong) && !inEllipse(p, nhan) && "Tế bào chất",
    rrDist(p, ngoai) > half(ngoai) && lineDist(p, song) <= half(roi) && "Roi"
  ];
};
// Virus có vỏ ngoài: hình tròn lớn là vỏ ngoài, các gai (đường kẻ có đầu tròn nhỏ) mọc ra từ vỏ ngoài, hình lục giác bên trong là
// vỏ protein, đường lượn sóng trong lục giác là vật chất di truyền.
const virus = (svg, other) => {
  const tron = tags(svg, "circle"), [vo] = tron.filter((c) => num(c, "r") > 30), dau = tron.filter((c) => num(c, "r") < 11);
  const [luc] = tags(svg, "polygon"), [loi] = tags(svg, "path");
  const tam = [num(vo, "cx"), num(vo, "cy")], R = num(vo, "r"), hex = pts(luc.points), song = pathPts(loi.d);
  assert.equal(hex.length, 6, "vỏ protein là hình lục giác");
  hex.forEach((p) => assert.ok(Math.hypot(p[0] - tam[0], p[1] - tam[1]) < R, "vỏ protein nằm trong vỏ ngoài"));
  song.forEach((p) => assert.ok(Math.hypot(p[0] - tam[0], p[1] - tam[1]) < 30, "vật chất di truyền nằm trong vỏ protein"));
  assert.ok(other.length >= 6 && other.length === dau.length, "mỗi gai có một đầu tròn");
  other.forEach((l) => { const [a, b] = ends(l).map((p) => Math.hypot(p[0] - tam[0], p[1] - tam[1])); assert.ok(Math.abs(a - R) <= half(vo) && b > a, "gai mọc ra từ vỏ ngoài"); });
  return (p) => [
    (other.some((l) => segDist(p, ...ends(l)) <= half(l)) || dau.some((c) => Math.hypot(p[0] - num(c, "cx"), p[1] - num(c, "cy")) <= num(c, "r") + half(c))) && "Gai glycoprotein",
    Math.abs(Math.hypot(p[0] - tam[0], p[1] - tam[1]) - R) <= half(vo) && "Vỏ ngoài",
    lineDist(p, [...hex, hex[0]]) <= half(luc) && "Vỏ protein",
    lineDist(p, song) <= half(loi) && "Vật chất di truyền"
  ];
};
// Nấm: nửa trên một hình bầu dục là mũ nấm, các vạch ngắn ngay dưới mũ là phiến nấm, hình chữ nhật dưới mũ là cuống nấm, các sợi
// mọc ra từ chân cuống là sợi nấm.
const nam = (svg, other) => {
  const [mu] = tags(svg, "path"), [cuong] = tags(svg, "rect"), soi = tags(svg, "polyline").map((pl) => pts(pl.points));
  const m = mu.d.match(/^M ([\d.]+) ([\d.]+) A ([\d.]+) ([\d.]+) 0 0 1 ([\d.]+) ([\d.]+) Z$/);
  assert.ok(m && m[2] === m[6] && +m[5] - +m[1] === 2 * +m[3], "mũ nấm là nửa trên một hình bầu dục");
  const cx = (+m[1] + +m[5]) / 2, cy = +m[2], rx = +m[3], ry = +m[4];
  assert.ok(num(cuong, "y") === cy && num(cuong, "x") > cx - rx && num(cuong, "x") + num(cuong, "width") < cx + rx, "cuống nấm ngay dưới mũ nấm");
  other.forEach((l) => { const [a, b] = ends(l); assert.ok(a[0] === b[0] && a[1] === cy && b[1] > cy && Math.abs(a[0] - cx) < rx && !inRect(a, cuong), "phiến nấm là vạch ngắn dưới mũ nấm"); });
  soi.forEach((pl) => assert.equal(pl[0][1], num(cuong, "y") + num(cuong, "height"), "sợi nấm mọc ra từ chân cuống nấm"));
  return (p) => [
    p[1] < cy && ((p[0] - cx) / rx) ** 2 + ((p[1] - cy) / ry) ** 2 <= 1 && "Mũ nấm",
    other.some((l) => segDist(p, ...ends(l)) <= half(l)) && "Phiến nấm",
    inRect(p, cuong) && p[1] > cy && "Cuống nấm",
    !inRect(p, cuong) && soi.some((pl) => lineDist(p, pl) <= 1.5) && "Sợi nấm"
  ];
};
// Cây rêu: hình bầu dục đứng trên ngọn là túi bào tử (nối với thân bằng một cuống mảnh), các hình bầu dục nằm ngang là lá, đường
// thẳng đứng nét dày là thân, các sợi ở gốc thân là rễ giả.
const reu = (svg, other) => {
  const el = tags(svg, "ellipse"), tui = el.filter((e) => num(e, "ry") > num(e, "rx")), la = el.filter((e) => num(e, "rx") > num(e, "ry"));
  const [than, cuong] = other.sort((a, b) => num(b, "stroke-width") - num(a, "stroke-width")), re = tags(svg, "polyline").map((pl) => pts(pl.points));
  assert.ok(tui.length === 1 && la.length >= 3 && than && cuong && other.length === 2, "cần túi bào tử, lá, thân, cuống");
  const [t1, t2] = ends(than), [c1, c2] = ends(cuong);
  assert.ok(t1[0] === t2[0] && c1[0] === c2[0], "thân và cuống thẳng đứng");
  assert.ok(c1[1] === num(tui[0], "cy") + num(tui[0], "ry") && c2[1] === t1[1], "cuống nối túi bào tử với ngọn thân");
  la.forEach((e) => assert.ok(num(e, "cy") > t1[1] && num(e, "cy") < t2[1] && Math.abs(num(e, "cx") - t1[0]) <= num(e, "rx") + 2, "lá mọc trên thân"));
  re.forEach((pl) => assert.deepEqual(pl[0], t2, "rễ giả mọc ra từ gốc thân"));
  return (p) => [
    inEllipse(p, tui[0]) && "Túi bào tử",
    la.some((e) => inEllipse(p, e)) && "Lá",
    !la.some((e) => inEllipse(p, e)) && segDist(p, t1, t2) <= half(than) && "Thân",
    segDist(p, c1, c2) <= half(cuong) && "Cuống",
    re.some((pl) => lineDist(p, pl) <= 1.5) && "Rễ giả"
  ];
};
// Câu “Bộ phận số k là:” của sơ đồ cấu tạo: mỗi số chỉ đúng một bộ phận, bốn số chỉ bốn bộ phận khác nhau, lời giải ghi đúng
// “số k là <bộ phận>” với cả bốn số; trả về bộ phận của số được hỏi.
const cauTao = (q, doc) => {
  const { at, other } = docSo(q.svg), cls = doc(q.svg, other), ten = {};
  Object.entries(at).forEach(([k, p]) => { const c = cls(p).filter(Boolean); assert.equal(c.length, 1, `số ${k} chỉ vào ${c.join(", ") || "không bộ phận nào"}`); ten[k] = c[0]; });
  assert.equal(new Set(Object.values(ten)).size, 4, "bốn số chỉ bốn bộ phận khác nhau");
  Object.entries(ten).forEach(([k, v]) => assert.ok(new RegExp(`[Ss]ố ${k} là ${v.toLowerCase()}(?!\\p{L})`, "u").test(q.x), "lời giải số " + k + " là " + v));
  return ten[q.q.match(/Bộ phận số (\d) là:/)[1]];
};

/* Khoá lưỡng phân: ô câu hỏi (nền surface) và ô kết quả (nền sun-soft), mỗi ô một dòng chữ; mỗi mũi tên là một đường kẻ có đầu
   mũi tên (tam giác) đi từ cạnh một ô câu hỏi tới cạnh một ô khác, nhãn “Có”/“Không” là chữ ngay cạnh đường kẻ. Trả về các ô và
   hàm đi theo khoá: bắt đầu ở ô câu hỏi không có mũi tên nào đi tới, mỗi ô câu hỏi trả lời bằng đặc điểm của sinh vật (doi: thay
   chữ một ô câu hỏi), tới ô kết quả thì dừng và trả về chữ của ô đó. */
const docKhoa = (svg) => {
  const tx = texts(svg), heads = tags(svg, "polygon").map((p) => pts(p.points));
  const boxes = tags(svg, "rect").map((r) => {
    const t = tx.filter((x) => inRect([+x.x, +x.y], r));
    assert.equal(t.length, 1, "mỗi ô cần đúng một dòng chữ");
    assert.ok(r.fill === "surface" || r.fill === "sun-soft", "ô câu hỏi nền surface, ô kết quả nền sun-soft");
    return { t: t[0].t, r, leaf: r.fill === "sun-soft" };
  });
  const arrows = tags(svg, "line").map((l) => {
    const [a, b] = ends(l), h = heads.filter((ps) => ps.some((p) => Math.hypot(p[0] - b[0], p[1] - b[1]) <= 4.01));
    assert.equal(h.length, 1, "mỗi đường kẻ cần đúng một đầu mũi tên");
    const tip = h[0].reduce((m, p) => (Math.hypot(p[0] - a[0], p[1] - a[1]) > Math.hypot(m[0] - a[0], m[1] - a[1]) ? p : m));
    const from = boxes.filter((x) => onEdge(a, x.r)), to = boxes.filter((x) => onEdge(tip, x.r));
    assert.ok(from.length === 1 && !from[0].leaf, "mũi tên phải đi ra từ cạnh một ô câu hỏi");
    assert.ok(to.length === 1 && to[0] !== from[0], "đầu mũi tên phải chạm cạnh một ô khác");
    return { a, b, from: from[0], to: to[0] };
  });
  tx.filter((x) => x.t === "Có" || x.t === "Không").forEach((x) => {
    const d = arrows.map((m) => segDist([+x.x, +x.y], m.a, m.b)), i = d.indexOf(Math.min(...d));
    assert.ok(d[i] < 15 && !arrows[i].nhan, "nhãn " + x.t + " cần đứng ngay cạnh một mũi tên chưa có nhãn");
    arrows[i].nhan = x.t;
  });
  boxes.filter((x) => !x.leaf).forEach((x) => assert.deepEqual(arrows.filter((m) => m.from === x).map((m) => m.nhan).sort(), ["Có", "Không"], `ô “${x.t}” cần hai mũi tên Có, Không`));
  boxes.filter((x) => x.leaf).forEach((x) => assert.equal(arrows.filter((m) => m.to === x).length, 1, `ô “${x.t}” cần đúng một mũi tên đi tới`));
  const goc = boxes.filter((x) => !x.leaf && !arrows.some((m) => m.to === x));
  assert.equal(goc.length, 1, "khoá cần đúng một ô câu hỏi đầu");
  const walk = (dd, doi = {}) => {
    let x = goc[0];
    for (let k = 0; !x.leaf; k++) {
      assert.ok(k < boxes.length, "khoá có vòng lặp");
      const cau = doi[x.t] || x.t;
      assert.ok(cau in dd, `thiếu đặc điểm “${cau}”`);
      x = arrows.find((m) => m.from === x && m.nhan === (dd[cau] ? "Có" : "Không")).to;
    }
    return x.t;
  };
  return { leaves: boxes.filter((x) => x.leaf).map((x) => x.t), walk };
};
// Đặc điểm của các sinh vật trong hai khoá (chỉ những đặc điểm khoá hỏi đến).
const CAY = {
  "xương rồng": { "Lá biến thành gai?": true },
  "hoa hồng": { "Lá biến thành gai?": false, "Thân có gai?": true },
  "xoài": { "Lá biến thành gai?": false, "Thân có gai?": false, "Thân gỗ?": true },
  "lúa": { "Lá biến thành gai?": false, "Thân có gai?": false, "Thân gỗ?": false }
};
const CON = {
  "Ốc sên": { "Có vỏ cứng xoắn?": true },
  "Giun đất": { "Có vỏ cứng xoắn?": false, "Có chân?": false, "Có cánh?": false, "Sống dưới nước?": false },
  "Châu chấu": { "Có vỏ cứng xoắn?": false, "Có chân?": true, "Có cánh?": true, "Sống dưới nước?": false },
  "Rết": { "Có vỏ cứng xoắn?": false, "Có chân?": true, "Có cánh?": false, "Sống dưới nước?": false }
};

/* ---------- các câu cần tính ----------
   id: đề chứa câu; has: đoạn chữ của đề; right(q): đáp án tính bằng code (so với ans hoặc o[0]). */
const CHECKS = [
  { id: DE1, has: "để phân loại bốn loài cây: xương rồng, hoa hồng, xoài, lúa. Ô số 3 là cây nào?", right: (q) => {
    const k = docKhoa(q.svg), o = {};
    Object.entries(CAY).forEach(([cay, dd]) => { o[k.walk(dd)] = cay; });
    assert.deepEqual(Object.keys(o).sort(), k.leaves.slice().sort(), "bốn cây vào bốn ô khác nhau");
    Object.entries(o).forEach(([so, cay]) => assert.ok(new RegExp(`${cay}[^;]* ở ô ${so}(?!\\d)`).test(q.x), `lời giải: ${cay} ở ô ${so}`));
    assert.deepEqual(q.o.slice().sort(), Object.keys(CAY).map((c) => "Cây " + c).sort(), "bốn lựa chọn là bốn cây");
    return "Cây " + o[q.q.match(/Ô số (\d) là/)[1]];
  } },
  { id: POOL, has: "Câu hỏi nào điền vào ô có dấu “?” cho đúng?", right: (q) => {
    const k = docKhoa(q.svg);
    assert.deepEqual(k.leaves.slice().sort(), Object.keys(CON).sort(), "bốn ô kết quả là bốn con vật");
    assert.ok(q.q.includes(Object.keys(CON).map((c) => c.toLowerCase()).join(", ")), "đề kể đủ bốn con vật");
    const ok = q.o.filter((cau) => Object.entries(CON).every(([con, dd]) => k.walk(dd, { "?": cau }) === con));
    assert.equal(ok.length, 1, "đúng một lựa chọn làm khoá xếp đúng cả bốn con vật, có " + ok.length);
    return ok[0];
  } },
  { id: DE1, has: "sơ đồ cấu tạo một vi khuẩn. Bộ phận số", right: (q) => cauTao(q, viKhuan) },
  { id: DE2, has: "sơ đồ cấu tạo một virus có vỏ ngoài. Bộ phận số", right: (q) => cauTao(q, virus) },
  { id: DE2, has: "sơ đồ cấu tạo một cây nấm. Bộ phận số", right: (q) => cauTao(q, nam) },
  { id: POOL, has: "sơ đồ một cây rêu. Bộ phận số", right: (q) => cauTao(q, reu) },
  // số trong sách (Bài 36): khoảng 95% số loài động vật đã biết là động vật không xương sống
  { id: DE1, has: "phần trăm số loài động vật đã biết thuộc nhóm động vật không xương sống", right: (q) => { assert.ok(q.x.includes(`khoảng ${100 - 95}% là động vật có xương sống`)); return 95; } },
  { id: DE2, has: "xây dựng khoá lưỡng phân để phân loại 8 loài cây", right: (q) => { const n = +q.q.match(/phân loại (\d+) loài/)[1]; assert.ok(q.x.includes(`${n} − 1 = ${n - 1}`)); return n - 1; } },
  { id: DE2, has: "cứ 20 phút lại phân chia một lần", right: (q) => {
    const [, p, h] = q.q.match(/cứ (\d+) phút lại phân chia một lần.* Sau (\d+) giờ/).map(Number), lan = (h * 60) / p;
    assert.ok(Number.isInteger(lan) && q.x.includes(`${h * 60} : ${p} = ${lan} lần`), "số lần phân chia");
    assert.ok(q.x.includes(Array.from({ length: lan + 1 }, (_, i) => 2 ** i).join(" → ")), "dãy gấp đôi");
    return 2 ** lan;
  } },
  { id: POOL, has: "Một vi khuẩn dài 3 micrômét (µm), một virus dài 0,1 µm", right: (q) => {
    const m = q.q.match(/vi khuẩn dài ([\d,]+) micrômét \(µm\), một virus dài ([\d,]+) µm/), r = Math.round((+m[1].replace(",", ".") / +m[2].replace(",", ".")) * 1e6) / 1e6;
    assert.ok(q.x.includes(`${m[1]} : ${m[2]} = ${r} (lần)`));
    return r;
  } }
];

const pool = bank(POOL);
assert.ok(pool && bank(DE1) && bank(DE2), "thiếu đề");
assert.equal(bank(DE1).questions.length, 25); assert.equal(bank(DE2).questions.length, 25);
const kho = pool.questions, mine = kho.filter((q) => q.src === POOL);
let n = 0;
const checked = new Set();
CHECKS.forEach((c) => {
  const m = kho.filter((q) => q.q.includes(c.has));
  assert.equal(m.length, 1, `“${c.has}”: cần đúng một câu trong kho, có ${m.length}`);
  const q = m[0], at = c.id + ": " + c.has;
  assert.equal(q.src, c.id, at + ": câu nằm ở đề " + q.src);
  const want = c.right(q), got = q.type === "fill" ? q.ans[0] : q.type === "num" ? q.ans : q.o[0];
  assert.strictEqual(JSON.stringify(got), JSON.stringify(want), at + ": đáp án " + JSON.stringify(got) + ", tính được " + JSON.stringify(want));
  if (q.type === "mc") assert.ok(!q.o.slice(1).includes(want), at + ": nhiễu trùng đáp án đúng");
  checked.add(q); n++;
});
// câu trả lời bằng số và câu điền có đáp án là số nào cũng phải được tính lại ở trên; câu có hình nào cũng phải được đọc lại
kho.filter((q) => q.svg || q.type === "num" || (q.type === "fill" && /^[\d\s,.−-]+$/.test(q.ans[0]))).forEach((q) => assert.ok(checked.has(q), "chưa có kiểm tra cho câu: " + q.q.slice(0, 60)));
assert.equal(kho.filter((q) => q.svg).length, 6, "6 câu có hình");

/* ---------- mức độ và ma trận ---------- */
assert.ok(kho.every((q) => [1, 2, 3].includes(q.lv)), "câu nào trong kho cũng cần lv");
const ctx = vm.createContext({ window: {} });
vm.runInContext(fs.readFileSync(path.join(__dirname, "../js/quiz.js"), "utf8"), ctx);
const Quiz = ctx.window.Quiz, M = pool.pool.matrix, cells = Object.values(M), sum = (a) => a.reduce((s, v) => s + v, 0);
assert.ok(cells.every(Array.isArray), "ma trận ghi theo [Biết, Hiểu, Vận dụng]");
assert.deepEqual([0, 1, 2].map((k) => sum(cells.map((v) => v[k]))), [10, 8, 7], "ma trận 10 Biết, 8 Hiểu, 7 Vận dụng");
const CHU_DE = ["Phân loại sinh vật", "Khoá lưỡng phân", "Vi khuẩn", "Virus", "Nguyên sinh vật", "Nấm", "Thực vật", "Động vật", "Đa dạng sinh học", "Tìm hiểu sinh vật ngoài thiên nhiên"];
assert.deepEqual(Object.keys(M), CHU_DE, "10 chủ đề theo thứ tự bài trong sách (Bài 25–39)");
[DE1, DE2].forEach((id) => assert.deepEqual([...new Set(bank(id).questions.map((q) => q.topic))], CHU_DE, id + ": đủ 10 chủ đề, đúng thứ tự"));
// mỗi ô có ít nhất gấp đôi số câu ô đó rút; câu nào trong kho cũng nằm ở một ô có số câu của ma trận
Object.entries(M).forEach(([t, v]) => v.forEach((k, i) => { const have = kho.filter((q) => q.topic === t && q.lv === i + 1).length; assert.ok(have >= 2 * k, `ô (${t}, mức ${i + 1}) rút ${k} câu mà kho chỉ có ${have}`); }));
kho.forEach((q) => assert.ok(M[q.topic] && M[q.topic][q.lv - 1] > 0, `${q.src}: ô (${q.topic}, mức ${q.lv}) không có trong ma trận: ${q.q.slice(0, 50)}`));
// cả hai đề cố định chia đúng theo ma trận
[DE1, DE2].forEach((id) => Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => bank(id).questions.filter((q) => q.topic === t && q.lv === l).length), v, id + " đúng ma trận ở chủ đề " + t)));
// ít nhất 2 câu đúng/sai 4 ý mỗi đề, không có câu tự luận
[DE1, DE2].forEach((id) => { assert.ok(bank(id).questions.filter((q) => q.type === "tf4").length >= 2, id + ": cần câu đúng/sai 4 ý"); assert.ok(!bank(id).questions.some((q) => q.type === "essay"), id + ": không có tự luận"); });
assert.ok(!mine.some((q) => q.type === "essay"), "câu riêng không có tự luận");
const seen = new Set();
for (let k = 0; k < 400; k++) {
  const d = Quiz.draw(pool);
  assert.equal(d.notes.length, 0, "rút thử có ghi chú: " + d.notes.join("; "));
  assert.equal(d.questions.length, 25);
  assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.lv === l).length), [10, 8, 7]);
  Object.entries(M).forEach(([t, v]) => assert.deepEqual([1, 2, 3].map((l) => d.questions.filter((q) => q.topic === t && q.lv === l).length), v, "rút đúng ma trận ở chủ đề " + t));
  d.questions.forEach((q) => seen.add(Quiz.key(q)));
}
assert.ok(mine.every((q) => seen.has(Quiz.key(q))), "400 lần rút thử phải gặp đủ các câu riêng");
// học sinh đã làm hết Đề 1 (hoặc Đề 2), đúng cả, vẫn rút được 25 câu chưa làm
[DE1, DE2].forEach((de) => {
  const hist = (q) => (q.src === de ? { done: 1, wrong: 0 } : null); // lịch sử câu như PoolHist
  for (let k = 0; k < 50; k++) {
    const d = Quiz.draw(pool, hist);
    assert.equal(d.notes.length, 0); assert.equal(d.questions.length, 25);
    assert.ok(d.questions.every((q) => q.src !== de), "đã làm hết " + de + " thì không rút lại câu của đề đó");
  }
});
console.log(n, "câu đã tính lại (câu có phép tính, có hình của 2 đề cố định và " + mine.length + " câu riêng của đề ngẫu nhiên); kho " + kho.length + " câu.");
console.log("MATH OK");
