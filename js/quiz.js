/* Bộ làm bài chung cho các ngân hàng câu hỏi (đề có sẵn trong data/banks/ và ngân hàng do quản trị viên nhập).
   Quiz.run(el, bank, {mode:"exam"|"practice", onExit, onFinish}) → {stop(), busy(), answered(), submit(), exam}
     busy(): đang làm dở (làm như thi chưa nộp, hoặc ôn luyện đã trả lời hoặc bỏ qua ít nhất một câu);
     answered(): số câu đã trả lời (câu bấm "Bỏ qua" không tính); submit(): nộp bài như bấm Nộp.
     Chưa trả lời câu nào (kể cả khi hết giờ) thì nộp bài không gọi onFinish: không lưu điểm.
     "Làm lại" dùng tiếp đối tượng này, nên app luôn dừng hoặc nộp đúng lượt đang làm. opts.redraw() → {questions} (đề
     ngẫu nhiên): nút thành "Làm đề khác", lượt sau dùng bộ câu mới.
   onFinish(res) được gọi cho hai loại kết quả:
     - phần chấm tự động: {r, t, s, mode, wrongTopics}. t: số câu, r: số câu đúng, có thể lẻ đến 0,01 vì câu đúng/sai 4 ý
       và nối cột chấm theo từng ý (score); câu tự luận không tính vào r, t;
     - điểm tự chấm phần tự luận: {mode: "self", r, t, s: 0}, r và t tính bằng phần tư điểm (số nguyên), không cộng vào
       điểm trung bình (app ghi riêng). Ôn luyện: lưu lúc nộp; làm như thi: lưu khi bấm "Lưu điểm tự chấm" ở trang kết quả.
     Phần chấm tự động còn có marks: [[Quiz.key(câu), điểm 0–1]] của từng câu đã chấm (câu bỏ qua, chưa làm: 0).
   Dạng câu (xem đầu data/banks/index.js): mc, fill, tf, tf4 (đúng/sai 4 ý), num (trả lời ngắn bằng số), match (nối cột),
   order (sắp xếp), essay (tự luận tự chấm). Trường chung không bắt buộc: lv (mức độ 1 Biết, 2 Hiểu, 3 Vận dụng),
   p (mã đoạn đọc trong bank.passages), svg (hình, lọc bằng Quiz.svg). Mọi thao tác là chạm, không kéo thả.
   Quiz.parse(text) → {questions, passages, errors}: đọc câu hỏi dán từ Word/Zalo theo cú pháp đơn giản.
   Quiz.svg(src) → {svg, problems}: hình đã lọc (chuỗi rỗng nếu không đọc được) và các chỗ bị bỏ.
   Quiz.draw(bank, hist) → {questions, notes}: rút đề ngẫu nhiên theo ma trận của đề có pool (Phiên K3, xem draw).
   Quiz.key(q): mã ổn định của một câu (băm nội dung), dùng để ghi nhớ câu đã làm; onFinish có marks: [[mã câu, điểm]].
   Báo câu sai (Phiên R1): có opts.onReport thì dưới lời giải khi ôn luyện (sau khi Kiểm tra, cả câu tự luận sau khi Xem gợi ý)
     và dưới từng câu ở màn kết quả (câu cần xem lại, câu tự luận tự chấm) có link nhỏ "Báo câu này sai"; bấm thì mở hộp
     chọn lí do (Quiz.REASONS) và ghi chú (tối đa 200 kí tự) ngay bên dưới, không dùng hộp nổi.
     onReport(q, {reason, note}) → Promise: gửi xong thì hiện lời cảm ơn, lỗi (reject) thì hiện e.message trong hộp.
     opts.reported(q) → true nếu người này đã báo câu đó từ trước: link ghi "Đã báo câu này", không bấm được.
     q là câu đã dựng (có key = Quiz.key(câu gốc), src nếu từ đề ngẫu nhiên). Quiz.text(q): bản chụp nội dung câu
     (câu hỏi, các ô, đáp án; tối đa 500 kí tự) để lưu kèm báo cáo. */
(function () {
  const LET = "ABCDEFGHIJ";
  const ABCD = "abcd";
  const LV = { 1: "Biết", 2: "Hiểu", 3: "Vận dụng" };
  const TF4_PTS = [0, 0.1, 0.25, 0.5, 1]; // đúng 0/1/2/3/4 ý, như đề thi tốt nghiệp THPT
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const range = (n) => [...Array(n).keys()];
  // xáo đến khi khác thứ tự gốc (để câu nối cột, sắp xếp không có sẵn đáp án)
  const mix = (n) => { let a = range(n); for (let k = 0; k < 20 && n > 1 && a.every((v, i) => v === i); k++) a = shuffle(a); return a; };
  const fmtTime = (s) => { s = Math.max(0, Math.round(s)); return String((s / 60) | 0).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
  const r2 = (x) => Math.round(x * 100) / 100;
  // số kiểu Việt Nam: 12,5; từ 10 000 thì ngăn hàng nghìn bằng khoảng trắng
  const fmtN = (x) => { const [i, d] = String(Math.abs(r2(x))).split("."); return (x < 0 ? "-" : "") + (i.length > 4 ? i.replace(/\B(?=(\d{3})+$)/g, " ") : i) + (d ? "," + d : ""); };
  const normT = (s) => String(s).normalize("NFC").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").replace(/[.!?;:,]+$/, "").trim().toLowerCase();
  const isNum = (s) => /^[-−–]?\s*\d[\d\s.,]*$/.test(String(s).trim());
  const numKey = (s) => String(s).trim().replace(/[−–]/g, "-").replace(/[\s.]/g, "").replace(",", ".");

  /* ---------------- hình SVG ----------------
     Chỉ giữ thẻ, thuộc tính vẽ trong danh sách dưới đây; dựng lại chuỗi từ đầu nên không lọt mã chạy (script, on…),
     link ngoài (href, url()), style. Màu (fill, stroke) chỉ nhận tên token của css/app.css, đổi thành var(--…) để đọc được
     ở chế độ tối. Mặc định (css/app.css, .qfig): nét màu chữ, không tô, chữ màu chữ. Chạy được cả trong node (tests/kiem-tra-de.js). */
  const SVG_TAGS = ["svg", "g", "path", "rect", "circle", "ellipse", "line", "polyline", "polygon", "text", "tspan", "title"];
  const SVG_ATTRS = ["x", "y", "x1", "y1", "x2", "y2", "cx", "cy", "r", "rx", "ry", "width", "height", "d", "points", "dx", "dy", "transform",
    "stroke-width", "stroke-dasharray", "stroke-linecap", "stroke-linejoin", "opacity", "fill-opacity", "stroke-opacity", "fill-rule",
    "font-size", "font-weight", "font-style", "text-anchor", "dominant-baseline"];
  const SVG_COLORS = ["ink", "muted", "line", "surface", "bg", "acc", "acc-soft", "sun", "sun-soft", "ok", "ok-soft", "bad", "bad-soft", "ioe", "ioe-soft", "moc", "moc-soft"];
  const ENT = { lt: "<", gt: ">", amp: "&", quot: '"', apos: "'", nbsp: " " };
  const decode = (s, bad) => String(s).replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => {
    if (e[0] === "#") { const c = e[1] === "x" || e[1] === "X" ? parseInt(e.slice(2), 16) : +e.slice(1); return c > 0 && c < 0x110000 ? String.fromCodePoint(c) : ""; }
    if (ENT[e.toLowerCase()]) return ENT[e.toLowerCase()];
    bad.push("kí tự " + m + " lạ"); return "";
  });
  function svg(src) {
    const problems = [], out = [], stack = [];
    let root = 0, count = 0, broken = false, hasBox = false;
    const s = String(src || "").trim();
    if (!s) return { svg: "", problems: ["hình trống"] };
    if (s.length > 30000) return { svg: "", problems: ["hình dài quá 30 000 kí tự"] };
    const re = /<!--[\s\S]*?-->|<\?[\s\S]*?\?>|<!\[CDATA\[[\s\S]*?\]\]>|<![^>]*>|<\/\s*([^\s>]+)\s*>|<([a-zA-Z][\w:.-]*)((?:\s+[^\s=/>]+(?:\s*=\s*(?:"[^"]*"|'[^']*'|[^\s"'=<>`]+))?)*)\s*(\/?)>|([^<]+)|</g;
    const attrRe = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
    let m;
    while ((m = re.exec(s))) {
      const [all, close, name, attrs, selfClose, text] = m;
      const skipping = stack.some((e) => !e.kept);
      if (text != null) {
        if (!text.trim()) continue;
        const top = stack[stack.length - 1];
        if (!top) { problems.push("có chữ nằm ngoài thẻ svg"); broken = true; }
        else if (!["text", "tspan", "title"].includes(top.name)) { if (!skipping) problems.push(`chữ “${text.trim().slice(0, 20)}” nằm ngoài thẻ text`); }
        else if (!skipping) out.push(esc(decode(text, problems)));
        continue;
      }
      if (close) {
        const top = stack.pop();
        if (!top || top.name !== close) { problems.push(`thẻ đóng </${close}> không khớp`); broken = true; break; }
        if (top.kept) out.push(`</${close}>`);
        continue;
      }
      if (!name) {
        if (all === "<") { problems.push("có dấu < lẻ"); broken = true; break; }
        if (/^<!\[CDATA\[|^<![^-]/.test(all)) problems.push("bỏ " + all.slice(0, 12) + "…");
        continue; // chú thích, <?xml…?>
      }
      const entry = { name, kept: false };
      if (skipping) { if (!selfClose) stack.push(entry); continue; }
      if (!SVG_TAGS.includes(name)) problems.push(`bỏ thẻ <${name}>`);
      else if (!stack.length && (name !== "svg" || root)) { problems.push("hình phải nằm trong đúng một thẻ <svg>"); broken = true; break; }
      else if (stack.length && name === "svg") problems.push("bỏ thẻ <svg> lồng bên trong");
      else if (++count > 800) { problems.push("hình có quá 800 phần tử"); broken = true; break; }
      else {
        entry.kept = true;
        if (name === "svg") root++;
        const kept = [], style = [];
        let a;
        attrRe.lastIndex = 0;
        while ((a = attrRe.exec(attrs || ""))) {
          const an = a[1], v = decode(a[2] != null ? a[2] : a[3] != null ? a[3] : a[4] != null ? a[4] : "", problems).trim();
          if (/^xmlns(:|$)/.test(an)) continue;
          if (an === "fill" || an === "stroke") {
            if (SVG_COLORS.includes(v)) style.push(`${an}:var(--${v})`);
            else if (v === "none" || v === "currentColor") style.push(`${an}:${v}`);
            else problems.push(`màu ${an}="${v.slice(0, 20)}": dùng tên màu của app (${SVG_COLORS.slice(0, 6).join(", ")}…), none hoặc currentColor`);
            continue;
          }
          if (name === "svg" && an === "viewBox") {
            if (/^\s*-?[\d.]+([\s,]+-?[\d.]+){3}\s*$/.test(v)) { kept.push(` viewBox="${esc(v)}"`); hasBox = true; } else problems.push(`viewBox="${v.slice(0, 30)}" chưa đúng`);
            continue;
          }
          if (name === "svg" && (an === "width" || an === "height")) { if (an === "width" && /^\d+(\.\d+)?(px)?$/.test(v)) style.push(`max-width:${parseFloat(v)}px`); continue; }
          if (!SVG_ATTRS.includes(an)) { problems.push(`bỏ thuộc tính ${an}`); continue; }
          if (v.length > 20000 || !/^[-+.,\d\s%a-zA-Z()]*$/.test(v) || /url|script|expression/i.test(v)) { problems.push(`bỏ ${an}="${v.slice(0, 20)}"`); continue; }
          kept.push(` ${an}="${esc(v)}"`);
        }
        if (name === "svg") kept.push(' role="img" focusable="false"');
        out.push(`<${name}${kept.join("")}${style.length ? ` style="${esc(style.join(";"))}"` : ""}>`);
        if (selfClose) out.push(`</${name}>`);
      }
      if (!selfClose) stack.push(entry);
    }
    if (!broken && stack.length) { problems.push(`thiếu thẻ đóng </${stack[stack.length - 1].name}>`); broken = true; }
    if (!broken && !root) { problems.push("không có thẻ <svg>"); broken = true; }
    if (!broken && !hasBox) { problems.push("thẻ <svg> cần viewBox, ví dụ viewBox=\"0 0 320 200\""); broken = true; }
    return { svg: broken ? "" : out.join(""), problems: [...new Set(problems)] };
  }
  const fig = (src) => { const c = src ? svg(src).svg : ""; return c ? `<div class="qfig">${c}</div>` : ""; };

  /* ---------------- mã câu, rút đề ngẫu nhiên ----------------
     key(q): băm dạng câu, câu hỏi và các ô (bỏ dấu câu, khoảng trắng, chữ hoa) thành chuỗi ngắn; sửa lời giải hay chủ đề
     không đổi mã, sửa câu hỏi thì thành câu mới. */
  const flat = (x) => String(x == null ? "" : x).normalize("NFC").replace(/[\p{P}\s]+/gu, "").toLowerCase();
  function key(q) {
    const text = [q.type, q.q].concat(q.o || [], q.l || [], q.r || []).map(flat).join("|");
    let h = 2166136261;
    for (let i = 0; i < text.length; i++) { h ^= text.charCodeAt(i); h = Math.imul(h, 16777619); }
    return (h >>> 0).toString(36) + text.length.toString(36);
  }
  /* draw(bank, hist): rút đề từ kho câu của đề ngẫu nhiên (bank.questions, mỗi câu có topic, lv?, src?) theo ma trận
     bank.pool.matrix: { "<chủ đề>": số câu } hoặc { "<chủ đề>": [Biết, Hiểu, Vận dụng] } (xem đầu data/banks/index.js).
     hist(q) → {done, wrong}: số lần học sinh đã làm, làm sai câu đó (app tính từ kết quả); không có thì coi như chưa làm.
     Mỗi ô lấy câu đúng chủ đề (đúng mức nếu ô ghi theo mức), ưu tiên câu chưa làm hoặc hay sai: điểm done − 2·wrong thấp
     trước, bằng nhau thì ngẫu nhiên. Ô thiếu câu thì lấy bù cùng chủ đề: câu chưa ghi mức trước, rồi mức gần nhất, rồi
     từ chủ đề khác; mỗi chỗ bù ghi một dòng vào notes (chưa esc). Kho đủ câu thì trả về đúng tổng của ma trận. */
  function draw(bank, hist) {
    const m = (bank.pool && bank.pool.matrix) || {}, notes = [];
    const topicOf = (t) => String(t == null ? "" : t).normalize("NFC").replace(/\s+/g, " ").trim();
    const weight = (q) => { const h = hist ? hist(q) : null; return h ? (+h.done || 0) - 2 * (+h.wrong || 0) : 0; };
    // xáo rồi sắp theo điểm ưu tiên (sort giữ thứ tự câu bằng điểm): câu bằng điểm đứng ngẫu nhiên
    const ranked = shuffle(bank.questions || []).map((q) => ({ q, w: weight(q), t: topicOf(q.topic) })).sort((a, b) => a.w - b.w);
    const used = new Set(), out = [];
    const take = (list, k) => { const got = []; for (const x of list) { if (got.length >= k) break; if (!used.has(x)) { used.add(x); got.push(x.q); } } return got; };
    const cells = [];
    Object.keys(m).forEach((t) => {
      const v = m[t], topic = topicOf(t);
      if (Array.isArray(v)) v.forEach((n, i) => { if (n > 0) cells.push({ topic, lv: i + 1, n: Math.floor(n) }); });
      else if (v > 0) cells.push({ topic, lv: 0, n: Math.floor(v) });
    });
    const dist = (q, lv) => (LV[q.lv] ? Math.abs(q.lv - lv) : 0.5); // câu chưa ghi mức: lấy trước mức kề
    cells.forEach((c) => {
      const same = ranked.filter((x) => x.t === c.topic);
      let got = take(c.lv ? same.filter((x) => x.q.lv === c.lv) : same, c.n);
      if (got.length < c.n && c.lv) {
        const near = same.filter((x) => x.q.lv !== c.lv).sort((a, b) => dist(a.q, c.lv) - dist(b.q, c.lv));
        const more = take(near, c.n - got.length);
        if (more.length) notes.push(`${c.topic}: thiếu ${more.length} câu mức ${LV[c.lv]}, lấy bù ${[...new Set(more.map((q) => (LV[q.lv] ? "mức " + LV[q.lv] : "câu chưa ghi mức")))].join(", ")}`);
        got = got.concat(more);
      }
      if (got.length < c.n) {
        const more = take(ranked.filter((x) => x.t !== c.topic), c.n - got.length);
        if (more.length) notes.push(`${c.topic}: thiếu ${more.length} câu, lấy từ chủ đề khác`);
        got = got.concat(more);
      }
      if (got.length < c.n) notes.push(`${c.topic}: kho chưa đủ câu, thiếu ${c.n - got.length} câu`);
      out.push(...got);
    });
    return { questions: out, notes };
  }

  /* ---------------- chấm ---------------- */
  function prep(q) {
    const x = Object.assign({ key: key(q) }, q); // mã câu tính trên câu gốc (đúng/sai thêm o khi dựng)
    if (q.type === "mc") { x.order = shuffle(q.o.map((_, i) => i)); x.a = 0; }
    if (q.type === "tf") { x.o = ["Đúng", "Sai"]; x.order = [0, 1]; x.a = q.a ? 0 : 1; }
    if (q.type === "match") x.rOrder = mix(q.r.length);
    if (q.type === "order") x.pOrder = mix(q.o.length);
    return x;
  }
  // Đơn vị in ngay sau chỗ trống ("___ kg", "___ cây.", "___°"); học sinh hay gõ kèm nó vào ô.
  const fold = (s) => s.normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/gi, "d").toLowerCase().replace(/2/g, "²").replace(/3/g, "³");
  const unitAfter = (q) => { const w = ((String(q.q).split("___")[1] || "").trim().split(/\s+/)[0] || "").normalize("NFC").replace(/[.,;:!?]+$/, ""); return /^[\p{L}°²³]+$/u.test(w) ? w.toLowerCase() : ""; };
  function fillRight(q, g) {
    const t = String(g).normalize("NFC").trim(), u = unitAfter(q), cands = [t];
    const bare = t.replace(/[.!?;:]+$/, "").trim();
    // Đơn vị gõ không dấu hoặc gõ "cm2" thay cho "cm²" vẫn tính là đơn vị đó.
    const tail = !u ? "" : bare.toLowerCase().endsWith(u) ? bare.slice(-u.length) : !/\p{L}/u.test(u) ? "" : [...Array(Math.min(bare.length, u.length + 3)).keys()].map((k) => bare.slice(-(k + 1))).find((w) => /^[\p{L}°]/u.test(w) && fold(w) === fold(u))  || "";
    if (tail) {
      const rest = bare.slice(0, -tail.length);
      // "5030kg", "5 030 kg". Chỗ trống là một số lượng (có đáp án bằng số) thì nhận cả số viết bằng chữ: "tám tiếng".
      if (isNum(rest) || (/\s$/.test(rest) && rest.trim() && /___\s/.test(q.q) && q.ans.some(isNum))) cands.push(rest.trim());
    }
    // Số âm hay được viết trong ngoặc: "(-7)".
    cands.slice().forEach((c) => { const m = /^\(\s*(.+?)\s*\)$/.exec(c.replace(/[.!?;:]+$/, "").trim()); if (m && isNum(m[1])) cands.push(m[1]); });
    return cands.some((c) => q.ans.some((a) => (isNum(a) && isNum(c)) ? numKey(a) === numKey(c) : normT(a) === normT(c)));
  }
  /* Trả lời ngắn bằng số: các cách đọc của số học sinh gõ. Dấu phẩy thập phân kiểu Việt Nam ("12,5", "1.000,5"), dấu chấm
     thập phân ("12.5"), phân số ("3/4"), số âm ("-2", "(-2)"), gõ kèm đơn vị của câu. Số viết mơ hồ ("1.000", "1,000")
     thì nhận cả hai cách đọc. */
  function numVals(g, unit) {
    let t = String(g).normalize("NFC").trim().replace(/[−–]/g, "-");
    if (unit) { const m = /^(.*\d)\s*(\D+?)\.?$/u.exec(t); if (m && fold(m[2].trim()) === fold(unit)) t = m[1]; }
    t = t.replace(/\.$/, "").replace(/\s+/g, "");
    const p = /^\((.+)\)$/.exec(t); if (p) t = p[1];
    const out = [];
    const f = /^(-?)(\d+)\/(\d+)$/.exec(t);
    if (f && +f[3]) out.push((f[1] ? -1 : 1) * f[2] / f[3]);
    if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(t) || /^-?\d+(,\d+)?$/.test(t)) out.push(+t.replace(/\./g, "").replace(",", "."));
    if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(t) || /^-?\d+\.\d+$/.test(t)) out.push(+t.replace(/,/g, ""));
    return out.filter(Number.isFinite);
  }
  /* Điểm của một câu, từ 0 đến 1. Câu đúng/sai 4 ý: đúng 1/2/3/4 ý được 0,1/0,25/0,5/1. Nối cột: theo số cặp nối đúng.
     Sắp xếp: đúng cả thứ tự mới được điểm. Tự luận: 0 (tự chấm riêng). */
  function score(q, g) {
    if (g == null || g === "") return 0;
    switch (q.type) {
      case "fill": return fillRight(q, g) ? 1 : 0;
      case "num": return numVals(g, q.unit).some((v) => Math.abs(v - q.ans) <= (+q.tol || 0) + 1e-9) ? 1 : 0;
      case "tf4": return Array.isArray(g) ? TF4_PTS[q.a.filter((a, i) => g[i] === a).length] : 0;
      case "match": return Array.isArray(g) ? q.l.filter((_, i) => g[i] === i).length / q.l.length : 0;
      case "order": return Array.isArray(g) && g.length === q.o.length && g.every((v, k) => v === k) ? 1 : 0;
      case "essay": return 0;
      default: return g === q.a ? 1 : 0;
    }
  }
  const isRight = (q, g) => score(q, g) === 1;
  const yn = (v) => (v == null ? "?" : v ? "Đúng" : "Sai");
  function correctText(q) {
    switch (q.type) {
      case "fill": return q.ans[0];
      case "num": return fmtN(q.ans) + (q.unit ? " " + q.unit : "") + (q.tol ? ` (sai số cho phép ±${fmtN(q.tol)})` : "");
      case "tf4": return q.a.map((v, i) => `${ABCD[i]}) ${yn(v)}`).join("; ");
      case "match": return q.l.map((l, i) => `${l} → ${q.r[i]}`).join("; ");
      case "order": return q.o.join(" → ");
      default: return q.o[q.a];
    }
  }
  function givenText(q, g) {
    if (g == null || g === "") return "(bỏ trống)";
    switch (q.type) {
      case "fill": case "num": return String(g);
      case "tf4": return g.map((v, i) => `${ABCD[i]}) ${yn(v)}`).join("; ");
      case "match": return q.l.map((l, i) => `${l} → ${g[i] == null ? "?" : q.r[g[i]]}`).join("; ");
      case "order": return g.map((k) => q.o[k]).join(" → ");
      default: return q.o[g];
    }
  }
  /* Thang tự chấm: mỗi ý chọn Chưa có (0), Một phần (nửa số điểm, khi chia được thành phần tư điểm) hoặc Đủ. */
  const levels = (p) => [[0, "Chưa có"]].concat(Math.round(p * 2) === p * 2 && p >= 0.5 ? [[p / 2, "Một phần"]] : [], [[p, "Đủ"]]);
  const rubricMax = (q) => q.rubric.reduce((a, c) => a + c.p, 0);

  /* ---------------- báo câu sai (Phiên R1) ----------------
     REASONS: mã lí do lưu trong báo cáo (cả hai kho, bảng question_reports) và chữ hiện trên nút.
     text(q): bản chụp nội dung câu để người làm đề biết câu nào bị báo kể cả khi đề đã sửa: câu hỏi, các ô (trắc nghiệm:
     ✓ đáp án đúng, – các ô sai), đáp án hoặc gợi ý; tối đa 500 kí tự. Nhận câu gốc lẫn câu đã dựng (prep). */
  const REASONS = [["wrong", "Đáp án sai"], ["unclear", "Câu hỏi khó hiểu"], ["typo", "Lỗi chính tả"], ["other", "Khác"]];
  const FLAG = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4h12l-2.5 4.5L17 13H5"/></svg>`;
  function text(q) {
    let s = String(q.q == null ? "" : q.q);
    if (q.type === "mc") s += " · " + (q.o || []).map((o, i) => (i ? "– " : "✓ ") + o).join(" · ");
    else if (q.type === "tf") s += " · Đáp án: " + (typeof q.a === "boolean" ? yn(q.a) : (q.o || [])[q.a]);
    else if (q.type === "essay") s += q.x ? " · Gợi ý: " + q.x : "";
    else if (q.type) s += " · Đáp án: " + correctText(q);
    s = s.replace(/\s+/g, " ").trim();
    return s.length > 500 ? s.slice(0, 499) + "…" : s;
  }

  const run = (el, bank, opts) => start(el, bank, opts, { exam: opts.mode === "exam" });
  function start(el, bank, opts, h) {
    const exam = opts.mode === "exam";
    const passages = bank.passages || {};
    // Câu dùng chung một đoạn đọc đứng liền nhau, giữ thứ tự trong đề; các nhóm và câu lẻ thì xáo.
    const units = [], seenP = {};
    (bank.questions || []).forEach((q) => {
      if (q.p && passages[q.p]) { if (!seenP[q.p]) units.push((seenP[q.p] = [])); seenP[q.p].push(q); } else units.push([q]);
    });
    const qs = shuffle(units).flat().map(prep);
    const S = { i: 0, ans: [], cur: null, checked: false, start: Date.now(), limit: exam && bank.minutes ? bank.minutes * 60 : 0, timer: null, done: false, psgOpen: {}, self: {} };
    const answered = () => S.ans.filter((a) => a && (a.done || (a.g != null && a.g !== ""))).length;
    if (S.limit) S.timer = setInterval(() => { const left = S.limit - (Date.now() - S.start) / 1000; const t = el.querySelector("#qzTimer"); if (t) { t.textContent = fmtTime(left); t.classList.toggle("warn", left < 120); } if (left <= 0) finish(); }, 500);

    function passageHtml(id) {
      const p = passages[id], open = S.psgOpen[id] !== false, n = qs.filter((x) => x.p === id).length;
      return `<details class="psg" data-p="${esc(id)}"${open ? " open" : ""}><summary><span class="grow"><b>${esc(p.title || "Đọc kĩ rồi trả lời")}</b><span class="small muted">Dùng chung cho ${n} câu</span></span><span class="psg-t small">${open ? "Thu gọn" : "Mở ra"}</span></summary>
        <div class="psg-body">${p.text ? `<div class="psg-text">${esc(p.text)}</div>` : ""}${fig(p.svg)}</div></details>`;
    }
    function body(q) {
      const qcls = "qtext" + (String(q.q).length > 160 ? " long" : ""); // đoạn văn đọc hiểu dài: chữ thường, dễ đọc hơn
      const stem = `<div class="${qcls}">${esc(q.q)}</div>${fig(q.svg)}`;
      switch (q.type) {
        case "fill": {
          const parts = esc(q.q).split("___");
          return `<div class="label">Điền vào chỗ trống</div><div class="${qcls}">${parts[0]}<input class="blank" id="qzFill" autocomplete="off" spellcheck="false" aria-label="Câu trả lời">${parts.slice(1).join("___")}</div>${fig(q.svg)}`;
        }
        case "num":
          return `<div class="label">Trả lời bằng số</div>${stem}
            <div class="num-row"><button type="button" class="btn ghost" id="qzSign" aria-label="Thêm hoặc bỏ dấu trừ">±</button><input class="num-in" id="qzNum" inputmode="decimal" autocomplete="off" spellcheck="false" aria-label="Đáp số">${q.unit ? `<span class="num-unit">${esc(q.unit)}</span>` : ""}</div>
            <p class="small muted">Số thập phân viết bằng dấu phẩy, ví dụ 2,5.</p>`;
        case "tf4":
          return `<div class="label">Đúng hay sai? Chọn cho từng ý</div>${stem}
            <div class="tf4">${q.o.map((s, i) => `<div class="tf4-row" data-i="${i}"><div class="tf4-s"><b>${ABCD[i]})</b> ${esc(s)}</div>
              <div class="tf4-b" role="group" aria-label="Ý ${ABCD[i]}"><button type="button" class="opt" data-i="${i}" data-v="1" aria-pressed="false">Đúng</button><button type="button" class="opt" data-i="${i}" data-v="0" aria-pressed="false">Sai</button></div></div>`).join("")}</div>`;
        case "match":
          return `<div class="label">Nối cột</div>${stem}
            <div class="mt-l">${q.l.map((s, i) => `<button type="button" class="mt-li" data-i="${i}"><span class="k">${i + 1}</span><span class="grow"><span>${esc(s)}</span><span class="mt-to small"></span></span></button>`).join("")}</div>
            <div class="label" id="qzHint" aria-live="polite"></div>
            <div class="mt-r">${q.rOrder.map((ri, k) => `<button type="button" class="opt mt-ri" data-r="${ri}"><span class="k">${LET[k]}</span><span class="grow">${esc(q.r[ri])}</span><span class="mt-n"></span></button>`).join("")}</div>`;
        case "order":
          return `<div class="label">Sắp xếp thứ tự</div>${stem}
            <div class="label">Thứ tự của bạn</div><ol class="ord-seq" id="qzSeq"></ol>
            <div class="label" id="qzHint" aria-live="polite"></div>
            <div class="ord-pool">${q.pOrder.map((k) => `<button type="button" class="opt ord-p" data-k="${k}">${esc(q.o[k])}</button>`).join("")}</div>`;
        case "essay":
          return `<div class="label">Tự luận · tự chấm</div>${stem}
            <textarea class="essay-in" id="qzEssay" aria-label="Bài làm" placeholder="Viết bài làm ở đây, hoặc viết ra giấy."></textarea>
            <p class="small muted">Phần tự luận không tính vào điểm trung bình. ${exam ? "Nộp bài xong, bạn xem gợi ý và tự chấm." : "Bấm Xem gợi ý để tự chấm theo thang điểm."}</p>`;
        default: {
          const wide = q.o.some((o) => String(o).length > 22);
          return `<div class="label">${q.type === "tf" ? "Đúng hay sai?" : "Chọn đáp án đúng"}</div>${stem}
            <div class="opts${wide ? " wide" : ""}">${q.order.map((oi, k) => `<button class="opt" data-o="${oi}"><span class="k">${LET[k]}</span><span>${esc(q.o[oi])}</span></button>`).join("")}</div>`;
        }
      }
    }
    const blank = (q) => (q.type === "tf4" ? [null, null, null, null] : q.type === "match" ? q.l.map(() => null) : q.type === "order" ? [] : q.type === "fill" || q.type === "num" || q.type === "essay" ? "" : null);
    const filled = (q, c) => (q.type === "tf4" || q.type === "match" ? c.every((v) => v != null) : q.type === "order" ? c.length === q.o.length : q.type === "essay" ? true : c != null && String(c).trim() !== "");
    const NEED = { tf4: "Bạn chọn Đúng hoặc Sai cho cả 4 ý", match: "Bạn nối hết các ô bên trái", order: "Bạn xếp hết các ô" };
    function rubricHtml(i) {
      const q = qs[i], picks = S.self[i] || (S.self[i] = q.rubric.map(() => null));
      return `<div class="rubric" data-q="${i}"><div class="label">Thang tự chấm · ${fmtN(rubricMax(q))} điểm</div>
        ${q.rubric.map((c, j) => `<div class="rb-row"><div>${esc(c.c)} <span class="small muted">(${fmtN(c.p)} điểm)</span></div>
          <div class="rb-b" role="group" aria-label="${esc(c.c)}">${levels(c.p).map(([v, nm]) => `<button type="button" class="opt" data-j="${j}" data-v="${v}" aria-pressed="${picks[j] === v}"><span>${nm}</span><b>${fmtN(v)}</b></button>`).join("")}</div></div>`).join("")}
        <div class="rb-sum" aria-live="polite">${sumText(i)}</div></div>`;
    }
    function selfSum(i) { const p = S.self[i]; return p && p.every((v) => v != null) ? { got: p.reduce((a, v) => a + v, 0), max: rubricMax(qs[i]) } : null; }
    function sumText(i) { const s = selfSum(i); return s ? `Tự chấm: <b>${fmtN(s.got)}/${fmtN(s.max)} điểm</b>` : "Chọn mức cho từng ý để tính điểm."; }
    function wireRubric(root, onPick) {
      root.querySelectorAll(".rubric .opt").forEach((b) => (b.onclick = () => {
        const box = b.closest(".rubric"), i = +box.dataset.q, j = +b.dataset.j;
        S.self[i][j] = +b.dataset.v;
        box.querySelectorAll(`.opt[data-j="${j}"]`).forEach((x) => x.setAttribute("aria-pressed", x === b));
        box.querySelector(".rb-sum").innerHTML = sumText(i);
        if (onPick) onPick();
      }));
    }
    /* Link "Báo câu này sai" dưới lời giải và hộp chọn lí do mở ngay bên dưới (xem đầu file). Chỉ có khi app đưa opts.onReport.
       h.reported: mã các câu đã báo trong lần mở đề này (giữ qua "Làm lại"); opts.reported: đã báo từ trước (kho dữ liệu). */
    const canReport = typeof opts.onReport === "function";
    const reportedQ = (q) => h.reported.has(q.key) || !!(opts.reported && opts.reported(q));
    const reportHtml = (q) => (!canReport ? "" : `<div class="rp"><button type="button" class="linkbtn rp-link" data-k="${esc(q.key)}" aria-expanded="false"${reportedQ(q) ? " disabled" : ""}>${FLAG}<span>${reportedQ(q) ? "Đã báo câu này" : "Báo câu này sai"}</span></button><div class="rp-area"></div></div>`);
    function wireReport(root) {
      if (!canReport) return;
      root.querySelectorAll(".rp-link").forEach((btn) => (btn.onclick = () => {
        const q = qs.find((x) => x.key === btn.dataset.k), area = btn.nextElementSibling;
        if (!q || btn.disabled) return;
        const close = () => { area.innerHTML = ""; btn.setAttribute("aria-expanded", "false"); };
        if (area.firstChild) { close(); return; }
        btn.setAttribute("aria-expanded", "true");
        area.innerHTML = `<form class="report-box" autocomplete="off"><b>Câu này sai ở đâu?</b>
          <div class="rsn" role="group" aria-label="Lí do">${REASONS.map(([k, t]) => `<button type="button" class="opt" data-r="${k}" aria-pressed="false"><span>${t}</span></button>`).join("")}</div>
          <label class="field"><span>Ghi chú <span class="opt-note">(không bắt buộc, tối đa 200 kí tự)</span></span><textarea class="report-note" maxlength="200" rows="3" placeholder="Viết thêm nếu muốn"></textarea></label>
          <div class="rp-err" aria-live="assertive"></div>
          <div class="row"><button type="submit" class="btn main sm">Gửi</button><button type="button" class="btn ghost sm rp-no">Thôi</button></div></form>`;
        const form = area.firstElementChild, err = form.querySelector(".rp-err"), btns = () => form.querySelectorAll("button");
        let reason = "";
        form.querySelectorAll(".rsn .opt").forEach((b) => (b.onclick = () => { reason = b.dataset.r; form.querySelectorAll(".rsn .opt").forEach((x) => x.setAttribute("aria-pressed", x === b)); err.innerHTML = ""; }));
        form.querySelector(".rp-no").onclick = close;
        form.onsubmit = async (ev) => {
          ev.preventDefault();
          if (!reason) { err.innerHTML = `<div class="fb bad">Bạn chọn một lí do nhé.</div>`; return; }
          const note = form.querySelector(".report-note").value.trim().slice(0, 200);
          btns().forEach((b) => (b.disabled = true));
          try {
            await opts.onReport(q, { reason, note });
            h.reported.add(q.key);
            area.innerHTML = `<div class="fb ok rp-done">Cảm ơn bạn! Người làm đề sẽ xem lại câu này.</div>`;
            btn.disabled = true; btn.setAttribute("aria-expanded", "false"); btn.querySelector("span").textContent = "Đã báo câu này";
          } catch (e) {
            if (!form.isConnected) return;
            err.innerHTML = `<div class="fb bad">${esc((e && e.message) || "Chưa gửi được. Thử lại nhé.")}</div>`;
            btns().forEach((b) => (b.disabled = false));
          }
        };
        form.querySelector(".rsn .opt").focus({ preventScroll: true });
        area.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }));
    }

    function render() {
      const q = qs[S.i]; S.cur = blank(q); S.checked = false;
      el.innerHTML = `<div class="stack">
        <div class="row between"><button class="linkbtn" id="qzExit">← Thoát</button>
          <div class="row">${S.limit ? `<span class="chip" id="qzTimer">${fmtTime(S.limit - (Date.now() - S.start) / 1000)}</span>` : ""}<span class="chip">${S.i + 1} / ${qs.length}</span></div></div>
        <div class="bar" aria-hidden="true"><i style="width:${(S.i / qs.length) * 100}%"></i></div>
        ${q.p && passages[q.p] ? passageHtml(q.p) : ""}
        <section class="qcard">
          <div class="row between"><span class="label">${esc(bank.title)}</span>${q.topic ? `<span class="label">${esc(q.topic)}</span>` : ""}</div>
          ${body(q)}
          <div id="qzFb" aria-live="polite"></div>
        </section>
        <div class="row between"><button class="btn ghost" id="qzSkip">Bỏ qua</button><button class="btn main" id="qzGo">${exam ? "Trả lời" : q.type === "essay" ? "Xem gợi ý" : "Kiểm tra"}</button></div>
      </div>`;
      const $ = (s) => el.querySelector(s), $$ = (s) => el.querySelectorAll(s), go = $("#qzGo"), fb = $("#qzFb");
      const ps = $(".psg");
      if (ps) ps.addEventListener("toggle", () => { S.psgOpen[ps.dataset.p] = ps.open; ps.querySelector(".psg-t").textContent = ps.open ? "Thu gọn" : "Mở ra"; });
      if (q.type === "mc" || q.type === "tf") $$(".opt").forEach((b) => (b.onclick = () => { if (S.checked) return; $$(".opt").forEach((x) => x.classList.remove("sel")); b.classList.add("sel"); S.cur = +b.dataset.o; }));
      const inp = $("#qzFill") || $("#qzNum");
      if (inp) { inp.oninput = () => (S.cur = inp.value); inp.onkeydown = (e) => { if (e.key === "Enter") go.click(); }; setTimeout(() => inp.focus({ preventScroll: true }), 50); }
      if ($("#qzSign")) $("#qzSign").onclick = () => { if (S.checked) return; const v = inp.value.trim(); inp.value = /^[-−–]/.test(v) ? v.replace(/^[-−–]\s*/, "") : "-" + v; S.cur = inp.value; inp.focus({ preventScroll: true }); };
      if ($("#qzEssay")) $("#qzEssay").oninput = (e) => (S.cur = e.target.value);
      if (q.type === "tf4") $$(".tf4 .opt").forEach((b) => (b.onclick = () => {
        if (S.checked) return;
        const i = +b.dataset.i; S.cur[i] = b.dataset.v === "1";
        $$(`.tf4 .opt[data-i="${i}"]`).forEach((x) => { x.classList.toggle("sel", x === b); x.setAttribute("aria-pressed", x === b); });
      }));
      /* Nối cột: chạm một ô bên trái (đang chọn), rồi chạm ô bên phải để nối. Chạm lại ô bên phải đang nối thì bỏ nối.
         Một ô bên phải chỉ nối với một ô bên trái: nối sang ô khác thì bỏ nối cũ. Nối xong tự chuyển sang ô chưa nối tiếp theo. */
      let act = 0;
      const paintMatch = () => {
        $$(".mt-li").forEach((b) => {
          const i = +b.dataset.i, ri = S.cur[i], k = ri == null ? -1 : q.rOrder.indexOf(ri);
          b.classList.toggle("on", i === act && !S.checked); b.setAttribute("aria-pressed", i === act && !S.checked);
          if (!S.checked) b.querySelector(".mt-to").textContent = k < 0 ? "Chưa nối" : `→ ${LET[k]}. ${q.r[ri]}`;
        });
        $$(".mt-ri").forEach((b) => { const i = S.cur.indexOf(+b.dataset.r); b.classList.toggle("sel", i >= 0); b.querySelector(".mt-n").textContent = i >= 0 ? "Ô " + (i + 1) : ""; });
        if (!S.checked) $("#qzHint").textContent = act == null ? "Đã nối đủ. Chạm một ô bên trái để đổi." : `Chọn ô nối với ô ${act + 1}`;
      };
      if (q.type === "match") {
        $$(".mt-li").forEach((b) => (b.onclick = () => { if (S.checked) return; act = +b.dataset.i; paintMatch(); }));
        $$(".mt-ri").forEach((b) => (b.onclick = () => {
          if (S.checked || act == null) return;
          const ri = +b.dataset.r;
          if (S.cur[act] === ri) S.cur[act] = null;
          else { const o = S.cur.indexOf(ri); if (o >= 0) S.cur[o] = null; S.cur[act] = ri; const n = q.l.length; act = [...range(n).slice(act + 1), ...range(act + 1)].find((i) => S.cur[i] == null); if (act === undefined) act = null; }
          paintMatch();
        }));
        paintMatch();
      }
      /* Sắp xếp: chạm lần lượt các ô bên dưới theo thứ tự đúng; chạm một ô đã xếp thì ô đó trở lại bên dưới. */
      const paintOrder = () => {
        $("#qzSeq").innerHTML = S.cur.map((k, n) => `<li><button type="button" class="opt ord-s" data-k="${k}"${S.checked ? " disabled" : ` aria-label="Bỏ ô ${n + 1}: ${esc(q.o[k])}"`}><span class="k">${n + 1}</span><span class="grow">${esc(q.o[k])}</span>${S.checked ? "" : `<span aria-hidden="true">✕</span>`}</button></li>`).join("")
          + (S.cur.length < q.o.length ? `<li class="ord-empty">${S.cur.length + 1}</li>` : "");
        $$(".ord-p").forEach((b) => (b.hidden = S.cur.includes(+b.dataset.k)));
        $("#qzHint").textContent = S.cur.length < q.o.length ? `Chạm ô thứ ${S.cur.length + 1}` : "Đã xếp đủ. Chạm một ô ở trên để bỏ ra.";
        $$(".ord-s").forEach((b) => (b.onclick = () => { if (S.checked) return; S.cur = S.cur.filter((k) => k !== +b.dataset.k); paintOrder(); }));
      };
      if (q.type === "order") { $$(".ord-p").forEach((b) => (b.onclick = () => { if (S.checked) return; S.cur.push(+b.dataset.k); paintOrder(); })); paintOrder(); }

      $("#qzExit").onclick = confirmExit;
      $("#qzSkip").onclick = () => { S.ans[S.i] = { q, g: null, ok: false, pts: 0 }; next(); };
      go.onclick = () => {
        if (S.checked) { next(); return; }
        if (!filled(q, S.cur)) { fb.innerHTML = `<div class="fb bad">${NEED[q.type] || "Bạn trả lời trước"}, hoặc bấm Bỏ qua nhé.</div>`; return; }
        const done = () => { S.checked = true; go.textContent = S.i + 1 < qs.length ? "Câu tiếp" : "Xem kết quả"; $("#qzSkip").disabled = true; };
        if (q.type === "essay") {
          S.ans[S.i] = { q, g: S.cur.trim(), done: true };
          if (exam) { next(); return; }
          $("#qzEssay").readOnly = true;
          fb.innerHTML = `<div class="expl pre"><b>Gợi ý:</b> ${esc(q.x || "Chưa có gợi ý.")}</div>${rubricHtml(S.i)}${reportHtml(q)}`;
          wireRubric(fb); wireReport(fb);
          done();
          return;
        }
        const g = Array.isArray(S.cur) ? S.cur.slice() : S.cur, pts = score(q, g);
        S.ans[S.i] = { q, g, pts, ok: pts === 1 };
        if (exam) { next(); return; }
        done();
        let msg = "";
        if (q.type === "mc" || q.type === "tf") $$(".opt").forEach((b) => { const o = +b.dataset.o; if (o === q.a) b.classList.add("right"); else if (b.classList.contains("sel")) b.classList.add("wrong"); });
        if (q.type === "tf4") {
          $$(".tf4 .opt").forEach((b) => { const i = +b.dataset.i, v = b.dataset.v === "1"; if (v === q.a[i]) b.classList.add("right"); else if (g[i] === v) b.classList.add("wrong"); b.disabled = true; });
          const k = q.a.filter((a, i) => g[i] === a).length;
          msg = k === 4 ? "Đúng cả 4 ý!" : `Đúng ${k}/4 ý · được ${fmtN(pts)}/1 điểm.`;
        }
        if (q.type === "match") {
          paintMatch();
          $$(".mt-li").forEach((b) => { const i = +b.dataset.i, ok = g[i] === i; b.classList.add(ok ? "right" : "wrong"); b.disabled = true;
            b.querySelector(".mt-to").textContent = (ok ? "→ " : `Bạn nối: ${q.r[g[i]]} · Đúng: `) + q.r[i]; });
          $$(".mt-ri").forEach((b) => (b.disabled = true));
          $("#qzHint").textContent = "";
          const k = q.l.filter((_, i) => g[i] === i).length;
          msg = k === q.l.length ? "Nối đúng hết!" : `Nối đúng ${k}/${q.l.length} cặp · được ${fmtN(pts)}/1 điểm.`;
        }
        if (q.type === "order") {
          paintOrder();
          $$(".ord-s").forEach((b, n) => b.classList.add(+b.dataset.k === n ? "right" : "wrong"));
          $("#qzHint").textContent = "";
        }
        if (inp) inp.readOnly = true;
        const ans = q.type === "order" ? `<ol class="ord-ans">${q.o.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>` : q.type === "tf4" || q.type === "match" ? "" : `<span>Đáp án: <b>${esc(correctText(q))}</b></span>`;
        fb.innerHTML = (pts === 1 ? `<div class="fb ok">${msg || "Đúng rồi!"}</div>` : `<div class="fb bad">${msg || "Chưa đúng."}${ans ? ` ${q.type === "order" ? "<span>Thứ tự đúng:</span>" : ""}${ans}` : ""}</div>`) + (q.x ? `<div class="expl">${esc(q.x)}</div>` : "") + reportHtml(q);
        wireReport(fb);
      };
      window.scrollTo(0, 0);
    }
    function confirmExit() {
      const fb = el.querySelector("#qzFb"), none = !answered();
      const [ask, yes] = none ? ["Thoát đề? Bạn chưa làm câu nào nên không lưu điểm.", "Thoát"] : exam ? ["Nộp bài ngay? Câu chưa làm tính là sai.", "Nộp bài"] : ["Dừng ôn và xem kết quả?", "Dừng"];
      fb.innerHTML = `<div class="confirm"><div>${ask}</div><div class="row"><button class="btn danger" id="qzYes">${yes}</button><button class="btn ghost" id="qzNo">Làm tiếp</button></div></div>`;
      fb.querySelector("#qzYes").onclick = none ? () => { h.stop(); if (opts.onExit) opts.onExit(); } : finish;
      fb.querySelector("#qzNo").onclick = () => (fb.innerHTML = "");
    }
    function next() { S.i++; if (S.i >= qs.length) finish(); else render(); }
    // Làm lại: cùng bộ câu (xáo lại); đề ngẫu nhiên (opts.redraw) thì rút bộ câu mới.
    const againTxt = opts.redraw ? "Làm đề khác" : "Làm lại";
    const again = () => start(el, opts.redraw ? Object.assign({}, bank, opts.redraw()) : bank, opts, h);
    // Lưu điểm tự chấm các câu tự luận đã chấm đủ (một kết quả cho cả lượt). Trả về {got, max} hoặc null.
    function saveSelf(list) {
      const sums = list.map(selfSum).filter(Boolean);
      if (!sums.length) return null;
      const got = sums.reduce((a, x) => a + x.got, 0), max = sums.reduce((a, x) => a + x.max, 0);
      if (opts.onFinish) opts.onFinish({ mode: "self", r: Math.round(got * 4), t: Math.round(max * 4), s: 0 });
      return { got, max };
    }
    function finish() {
      if (S.done) return; S.done = true; clearInterval(S.timer);
      if (!answered()) {
        el.innerHTML = `<div class="stack">
          <section class="panel"><div class="label">${esc(bank.title)} · ${exam ? "Làm như thi" : "Ôn luyện"}</div><p>Bạn chưa làm câu nào nên không lưu điểm.</p></section>
          <div class="row"><button class="btn main" id="qzAgain">${againTxt}</button><button class="btn ghost" id="qzHome">Về trang chính</button></div></div>`;
        el.querySelector("#qzAgain").onclick = again;
        el.querySelector("#qzHome").onclick = () => opts.onExit && opts.onExit();
        window.scrollTo(0, 0);
        return;
      }
      if (exam) for (let i = 0; i < qs.length; i++) if (!S.ans[i]) S.ans[i] = { q: qs[i], g: null, ok: false, pts: 0 };
      const idx = range(qs.length).filter((i) => S.ans[i]);
      const auto = idx.filter((i) => qs[i].type !== "essay").map((i) => S.ans[i]);
      // Tự luận: ôn luyện thì các câu đã xem gợi ý; làm như thi thì mọi câu (có thể đã viết ra giấy).
      const essays = idx.filter((i) => qs[i].type === "essay" && (exam || S.ans[i].done));
      const right = r2(auto.reduce((a, x) => a + (x.pts || 0), 0)), total = auto.length;
      const secs = Math.min((Date.now() - S.start) / 1000, S.limit || Infinity);
      const wrong = auto.filter((a) => (a.pts || 0) < 1);
      const byTopic = {}, byLv = {};
      auto.forEach((a) => { const k = a.q.topic || "Chung"; byTopic[k] = byTopic[k] || [0, 0]; byTopic[k][1]++; byTopic[k][0] += a.pts || 0; });
      auto.forEach((a) => { if (LV[a.q.lv]) { byLv[a.q.lv] = byLv[a.q.lv] || [0, 0]; byLv[a.q.lv][1]++; byLv[a.q.lv][0] += a.pts || 0; } });
      const saved = !exam ? saveSelf(essays) : null; // ôn luyện: chấm ngay sau từng câu, lưu luôn
      if (total && opts.onFinish) opts.onFinish({ r: right, t: total, s: Math.round(secs), mode: exam ? "exam" : "practice", wrongTopics: wrong.map((a) => a.q.topic || "Chung"), marks: auto.map((a) => [a.q.key, a.pts || 0]) });
      const d10 = total ? fmtN(Math.round((right / total) * 40) / 4) : "0";
      const bars = (o, name) => `<div class="ubreak">${Object.entries(o).map(([k, [r, t]]) => `<span>${esc(name(k))}</span><div class="bar"><i style="width:${(r / t) * 100}%"></i></div><span>${fmtN(r)}/${t}</span>`).join("")}</div>`;
      const part = auto.some((a) => a.pts > 0 && a.pts < 1);
      const essayPanel = !essays.length ? "" : exam
        ? `<section class="panel" id="qzSelf"><div class="label">Tự luận · tự chấm (${essays.length} câu)</div>
            <p class="small muted">Không tính vào điểm trung bình. Đọc gợi ý, chọn mức cho từng ý rồi bấm Lưu.</p>
            ${essays.map((i) => `<div class="self-q"><b>${esc(qs[i].q)}</b>${S.ans[i].g ? `<div class="essay-done">${esc(S.ans[i].g)}</div>` : ""}<div class="expl pre"><b>Gợi ý:</b> ${esc(qs[i].x || "Chưa có gợi ý.")}</div>${rubricHtml(i)}${reportHtml(qs[i])}</div>`).join("")}
            <div id="qzSelfArea"><div class="row"><button class="btn main" id="qzSelfSave">Lưu điểm tự chấm</button></div><div id="qzSelfMsg" aria-live="polite"></div></div></section>`
        : `<section class="panel" id="qzSelf"><div class="label">Tự luận · tự chấm</div>
            <div class="ubreak">${essays.map((i) => { const s = selfSum(i); return `<span>${esc(String(qs[i].q).slice(0, 60))}${String(qs[i].q).length > 60 ? "…" : ""}</span><span></span><span>${s ? fmtN(s.got) + "/" + fmtN(s.max) : "chưa chấm"}</span>`; }).join("")}</div>
            <p class="small muted">${saved ? `Đã lưu điểm tự chấm: ${fmtN(saved.got)}/${fmtN(saved.max)} điểm. ` : ""}Không tính vào điểm trung bình.</p></section>`;
      el.innerHTML = `<div class="stack">
        <section class="panel">
          <div class="label">${esc(bank.title)} · ${exam ? "Làm như thi" : "Ôn luyện"}</div>
          ${total ? `<div class="row" style="gap:18px;align-items:flex-end"><div class="score">${d10}<span class="score-sub">/10</span></div>
          <div class="stack tight"><b>${fmtN(right)}/${total} câu đúng</b><span class="muted small">Thời gian: ${fmtTime(secs)}</span></div></div>
          ${part ? `<p class="small muted">Câu đúng/sai 4 ý và nối cột tính điểm theo từng ý.</p>` : ""}` : `<p>Lượt này chỉ có câu tự luận. Thời gian: ${fmtTime(secs)}</p>`}
        </section>
        ${Object.keys(byTopic).length > 1 ? `<section class="panel"><div class="label">Theo chủ đề</div>${bars(byTopic, (k) => k)}</section>` : ""}
        ${Object.keys(byLv).length ? `<section class="panel" id="qzLv"><div class="label">Theo mức độ</div>${bars(byLv, (k) => LV[k])}</section>` : ""}
        ${wrong.length ? `<section class="panel"><div class="label">Câu cần xem lại (${wrong.length})</div><div class="review">${wrong.map((a) => `<div class="rv"><div>${esc(a.q.q).replace("___", "…")}${LV[a.q.lv] ? ` <span class="tag">${LV[a.q.lv]}</span>` : ""}</div><div class="small">Bạn trả lời: <s>${esc(givenText(a.q, a.g))}</s>${a.pts > 0 ? ` (được ${fmtN(a.pts)}/1 điểm)` : ""} · Đáp án: <b>${esc(correctText(a.q))}</b></div>${a.q.x ? `<div class="expl">${esc(a.q.x)}</div>` : ""}${reportHtml(a.q)}</div>`).join("")}</div></section>` : ""}
        ${essayPanel}
        <div class="row"><button class="btn main" id="qzAgain">${againTxt}</button><button class="btn ghost" id="qzHome">Về trang chính</button></div>
      </div>`;
      el.querySelector("#qzAgain").onclick = again;
      el.querySelector("#qzHome").onclick = () => opts.onExit && opts.onExit();
      wireReport(el);
      const save = el.querySelector("#qzSelfSave");
      if (save) {
        wireRubric(el, () => (el.querySelector("#qzSelfMsg").innerHTML = ""));
        save.onclick = () => {
          const s = saveSelf(essays);
          if (!s) { el.querySelector("#qzSelfMsg").innerHTML = `<div class="fb bad">Chọn mức cho từng ý của ít nhất một câu rồi bấm Lưu nhé.</div>`; return; }
          el.querySelectorAll("#qzSelf .rubric .opt").forEach((b) => (b.disabled = true));
          el.querySelector("#qzSelfArea").innerHTML = `<div class="fb ok">Đã lưu điểm tự chấm: ${fmtN(s.got)}/${fmtN(s.max)} điểm.</div>`;
        };
      }
      window.scrollTo(0, 0);
    }
    h.reported = h.reported || new Set();
    h.stop = () => { clearInterval(S.timer); S.done = true; };
    h.busy = () => !S.done && (exam || S.ans.some(Boolean));
    h.answered = answered;
    h.submit = finish;
    if (!qs.length) { h.stop(); el.innerHTML = `<div class="panel">Ngân hàng này chưa có câu hỏi.</div>`; return h; }
    render();
    return h;
  }

  /* Cú pháp nhập câu hỏi (mỗi câu cách nhau một dòng trống):
     # Phép cộng                 → đặt chủ đề cho các câu bên dưới
     345 + 255 = ?               → trắc nghiệm: * đáp án đúng, - đáp án sai
     * 600
     - 590
     > Giải thích (không bắt buộc)
     5 tấn 30 kg = [5030] kg     → điền vào chỗ trống; nhiều đáp án: [5030|5 030]
     Đúng: Hình vuông có 4 góc vuông.   → câu đúng/sai (hoặc "Sai: ...")
     Câu hỏi + 4 dòng "a) Đúng: …", "b) Sai: …"   → đúng/sai 4 ý
     Câu hỏi + dòng "Đáp số: 2,5 ± 0,1 kg"       → trả lời ngắn bằng số (sai số, đơn vị không bắt buộc)
     Câu hỏi + các dòng "trái -> phải"           → nối cột; dòng "-> ô thừa" là ô bên phải không nối với ô nào
     Câu hỏi + các dòng "1) …", "2) …", "3) …"   → sắp xếp (viết theo thứ tự đúng, app tự xáo)
     Tự luận: đề bài + các dòng "+ ý cần có (0,5)" (thang tự chấm) + "> gợi ý"   → tự luận tự chấm
     Mức: Biết | Hiểu | Vận dụng  → mức độ của câu (dòng trong câu, không bắt buộc)
     <svg viewBox="…">…</svg>    → hình của câu (được lọc, màu dùng tên token: ink, acc, ok…)
     Đoạn đọc: Tiêu đề … Hết đoạn → đoạn văn dùng chung (có thể nhiều dòng, dòng trống) cho các câu sau nó,
                                    đến chủ đề mới (#) hoặc đoạn đọc mới. */
  const LV_WORDS = [[1, /^(biết|nhận biết|nb|1)$/], [2, /^(hiểu|thông hiểu|th|2)$/], [3, /^(vận dụng|vận dụng cao|vd|vdc|3)$/]];
  const quarter = (p) => p > 0 && Math.abs(p * 4 - Math.round(p * 4)) < 1e-9;
  const vnNum = (s) => +String(s).replace(/[−–]/g, "-").replace(/[\s.]/g, "").replace(",", ".");
  function parse(text) {
    const questions = [], errors = [], passages = {};
    let topic = "", psg = "", used = false, np = 0, nq = 0;
    // Hình viết trên nhiều dòng: gộp thành một dòng. Đoạn đọc (giữ dòng trống bên trong): thay bằng một dòng đánh dấu.
    const lines = String(text || "").replace(/\r/g, "").replace(/<svg[\s\S]*?<\/svg>/gi, (m) => m.replace(/\s*\n\s*/g, " ")).split("\n"), kept = [];
    for (let i = 0; i < lines.length; i++) {
      const m = /^\s*Đoạn đọc\s*:\s*(.*)$/i.exec(lines[i]); // cần dấu hai chấm: câu hỏi "Đoạn đọc trên nói về…" không phải đoạn đọc
      if (!m) { kept.push(lines[i]); continue; }
      let j = i + 1;
      while (j < lines.length && !/^\s*Hết đoạn(\s+đọc)?\s*\.?\s*$/i.test(lines[j])) j++;
      np++;
      if (j >= lines.length) { errors.push(`Đoạn đọc ${np}: thiếu dòng “Hết đoạn” ở cuối đoạn`); continue; }
      const inner = lines.slice(i + 1, j), isSvg = (l) => /^\s*<svg/i.test(l);
      const txt = inner.filter((l) => !isSvg(l)).join("\n").replace(/\n\s*\n(\s*\n)+/g, "\n\n").trim(), pic = inner.filter(isSvg).map((l) => l.trim()).join(" ");
      const id = "d" + np, p = {};
      if (m[1].trim()) p.title = m[1].trim();
      if (txt) p.text = txt;
      if (pic) { const c = svg(pic); if (c.svg) p.svg = pic; if (c.problems.length) errors.push(`Đoạn đọc ${np}, hình: ${c.problems.join("; ")}`); }
      if (!p.text && !p.svg) errors.push(`Đoạn đọc ${np}: chưa có nội dung`);
      passages[id] = p;
      kept.push("", "\u0001" + id, "");
      i = j;
    }
    kept.join("\n").split(/\n\s*\n/).forEach((blk) => {
      let ls = blk.split("\n").map((l) => l.trim()).filter(Boolean);
      while (ls.length && (ls[0].startsWith("#") || ls[0][0] === "\u0001")) {
        if (ls[0][0] === "\u0001") { psg = ls[0].slice(1); used = false; }
        else { topic = ls[0].replace(/^#+\s*/, "").replace(/^chủ đề\s*:?\s*/i, ""); if (used) psg = ""; }
        ls.shift();
      }
      if (!ls.length) return;
      const n = ++nq, err = (msg) => errors.push(`Câu ${n}: ${msg}`);
      const x = ls.filter((l) => l.startsWith(">")).map((l) => l.replace(/^>\s*/, "")).join(" ");
      const extra = {}, pics = [];
      ls = ls.filter((l) => {
        if (l.startsWith(">")) return false;
        const m = /^Mức(?:\s+độ)?\s*:\s*(.+)$/i.exec(l);
        if (m) { const w = m[1].trim().toLowerCase().replace(/\.$/, ""), f = LV_WORDS.find(([, re]) => re.test(w)); if (f) extra.lv = f[0]; else err(`mức độ “${m[1]}” chưa đúng (Biết, Hiểu hoặc Vận dụng)`); return false; }
        if (/^<svg/i.test(l)) { pics.push(l); return false; }
        return true;
      });
      if (psg) { extra.p = psg; used = true; }
      if (pics.length) { const s = pics.join(" "), c = svg(s); if (c.svg) extra.svg = s; if (c.problems.length) err("hình: " + c.problems.join("; ")); }
      const add = (q) => questions.push(Object.assign(q, { x }, extra));
      if (!ls.length) { err("chưa có nội dung câu hỏi"); return; }
      const essay = /^Tự luận\s*:\s*(.*)$/i.exec(ls[0]);
      if (essay) {
        const rubric = [];
        ls.slice(1).filter((l) => l.startsWith("+")).forEach((l) => {
          const m = /^\+\s*(.+?)\s*\(\s*(\d+(?:[.,]\d+)?)\s*(?:điểm|đ)?\s*\)\s*\.?$/i.exec(l), p = m && vnNum(m[2]);
          if (!m || !quarter(p)) err(`ý chấm “${l.slice(0, 40)}” cần điểm ở cuối, chia hết cho 0,25, ví dụ (0,5)`); else rubric.push({ c: m[1], p });
        });
        const stem = [essay[1]].concat(ls.slice(1).filter((l) => !l.startsWith("+"))).join(" ").trim();
        if (!stem) { err("thiếu đề bài tự luận"); return; }
        add({ topic, type: "essay", q: stem, rubric: rubric.length ? rubric : [{ c: "Bài làm đúng, đủ ý như gợi ý", p: 1 }] });
        return;
      }
      const isOpt = (l) => /^[*-]\s+/.test(l), opts = ls.filter(isOpt);
      if (opts.length) {
        const right = opts.filter((l) => l.startsWith("*"));
        if (right.length !== 1) { err("cần đúng một đáp án đánh dấu *"); return; }
        if (opts.length < 2) { err("cần ít nhất 2 lựa chọn"); return; }
        const o = [right[0]].concat(opts.filter((l) => !l.startsWith("*"))).map((l) => l.replace(/^[*-]\s+/, ""));
        add({ topic, type: "mc", q: ls.filter((l) => !isOpt(l)).join(" ") || "Chọn đáp án đúng.", o });
        return;
      }
      const tfRe = /^(?:[a-dA-D][).]\s*)?(Đúng|Sai)\s*:\s*(.+)$/i, tfl = ls.filter((l) => tfRe.test(l)), rest = ls.filter((l) => !tfRe.test(l));
      if (tfl.length === 1 && !rest.length) { const m = tfRe.exec(tfl[0]); add({ topic, type: "tf", q: m[2], a: /^đúng$/i.test(m[1]) }); return; }
      if (tfl.length > 1) {
        if (tfl.length !== 4) { err(`câu đúng/sai nhiều ý cần đúng 4 ý (đang có ${tfl.length})`); return; }
        const it = tfl.map((l) => tfRe.exec(l));
        add({ topic, type: "tf4", q: rest.join(" ") || "Mỗi ý sau đúng hay sai?", o: it.map((m) => m[2].trim()), a: it.map((m) => /^đúng$/i.test(m[1])) });
        return;
      }
      const dap = ls.find((l) => /^Đáp số\s*:/i.test(l));
      if (dap) {
        const m = /^([-−–]?\s*\d[\d\s.]*(?:,\d+)?)(?:\s*(?:±|\+\/?-)\s*(\d[\d.]*(?:,\d+)?))?\s*(.*)$/.exec(dap.replace(/^Đáp số\s*:\s*/i, ""));
        if (!m || !Number.isFinite(vnNum(m[1]))) { err("dòng “Đáp số:” cần một số, ví dụ Đáp số: 2,5 hoặc Đáp số: 2,5 ± 0,1 kg"); return; }
        const q = { topic, type: "num", q: ls.filter((l) => l !== dap).join(" "), ans: vnNum(m[1]) };
        if (m[2]) q.tol = vnNum(m[2]);
        if (m[3].trim()) q.unit = m[3].trim().replace(/\.$/, "");
        if (!q.q) { err("thiếu câu hỏi trước dòng “Đáp số:”"); return; }
        add(q);
        return;
      }
      const arrow = /^(.*?)\s*(?:->|→)\s*(.+)$/, ml = ls.filter((l) => arrow.test(l));
      if (ml.length >= 2) {
        const pr = ml.map((l) => arrow.exec(l)), l = pr.filter((p) => p[1].trim());
        if (l.length < 2) { err("nối cột cần ít nhất 2 cặp “trái -> phải”"); return; }
        add({ topic, type: "match", q: ls.filter((x2) => !arrow.test(x2)).join(" ") || "Nối mỗi ô bên trái với một ô bên phải.",
          l: l.map((p) => p[1].trim()), r: l.map((p) => p[2].trim()).concat(pr.filter((p) => !p[1].trim()).map((p) => p[2].trim())) });
        return;
      }
      const stem = ls.join(" "), fm = stem.match(/\[([^\]]+)\]/);
      if (fm) { add({ topic, type: "fill", q: stem.replace(fm[0], "___"), ans: fm[1].split("|").map((s) => s.trim()).filter(Boolean) }); return; }
      const ordRe = /^(\d+)[).]\s+(.+)$/, ol = ls.filter((l) => ordRe.test(l));
      if (ol.length >= 3 && ol.every((l, k) => +ordRe.exec(l)[1] === k + 1)) {
        add({ topic, type: "order", q: ls.filter((l) => !ordRe.test(l)).join(" ") || "Sắp xếp theo thứ tự đúng.", o: ol.map((l) => ordRe.exec(l)[2].trim()) });
        return;
      }
      err(`chưa nhận ra dạng câu ("${stem.slice(0, 40)}…")`);
    });
    Object.keys(passages).forEach((id) => { if (!questions.some((q) => q.p === id)) errors.push(`Đoạn đọc ${id.slice(1)}: chưa có câu hỏi nào bên dưới`); });
    return { questions, passages, errors };
  }

  window.Quiz = { run, parse, isRight, score, svg, draw, key, text, REASONS, LV, fmtN };
})();
