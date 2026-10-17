/* Bộ làm bài chung cho các ngân hàng câu hỏi (đề có sẵn trong data/banks/ và ngân hàng do quản trị viên nhập).
   Quiz.run(el, bank, {mode:"exam"|"practice", onExit, onFinish}) → {stop(), busy(), answered(), submit(), exam}
     busy(): đang làm dở (làm như thi chưa nộp, hoặc ôn luyện đã trả lời hoặc bỏ qua ít nhất một câu);
     answered(): số câu đã trả lời (câu bấm "Bỏ qua" không tính); submit(): nộp bài như bấm Nộp.
     Chưa trả lời câu nào (kể cả khi hết giờ) thì nộp bài không gọi onFinish: không lưu điểm.
     "Làm lại" dùng tiếp đối tượng này, nên app luôn dừng hoặc nộp đúng lượt đang làm.
   Quiz.parse(text) → {questions, errors}: đọc câu hỏi dán từ Word/Zalo theo cú pháp đơn giản. */
(function () {
  const LET = "ABCD";
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const fmtTime = (s) => { s = Math.max(0, Math.round(s)); return String((s / 60) | 0).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
  const normT = (s) => String(s).normalize("NFC").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").replace(/[.!?;:,]+$/, "").trim().toLowerCase();
  const isNum = (s) => /^[-−–]?\s*\d[\d\s.,]*$/.test(String(s).trim());
  const numKey = (s) => String(s).trim().replace(/[−–]/g, "-").replace(/[\s.]/g, "").replace(",", ".");

  function prep(q) {
    const x = Object.assign({}, q);
    if (q.type === "mc") { x.order = shuffle(q.o.map((_, i) => i)); x.a = 0; }
    if (q.type === "tf") { x.o = ["Đúng", "Sai"]; x.order = [0, 1]; x.a = q.a ? 0 : 1; }
    return x;
  }
  // Đơn vị in ngay sau chỗ trống ("___ kg", "___ cây.", "___°"); học sinh hay gõ kèm nó vào ô.
  const fold = (s) => s.normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/gi, "d").toLowerCase().replace(/2/g, "²").replace(/3/g, "³");
  const unitAfter = (q) => { const w = ((String(q.q).split("___")[1] || "").trim().split(/\s+/)[0] || "").normalize("NFC").replace(/[.,;:!?]+$/, ""); return /^[\p{L}°²³]+$/u.test(w) ? w.toLowerCase() : ""; };
  function isRight(q, g) {
    if (g == null || g === "") return false;
    if (q.type === "fill") {
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
    return g === q.a;
  }
  const correctText = (q) => (q.type === "fill" ? q.ans[0] : q.o[q.a]);
  const givenText = (q, g) => (g == null || g === "" ? "(bỏ trống)" : q.type === "fill" ? String(g) : q.o[g]);

  const run = (el, bank, opts) => start(el, bank, opts, { exam: opts.mode === "exam" });
  function start(el, bank, opts, h) {
    const exam = opts.mode === "exam";
    const qs = shuffle(bank.questions).map(prep);
    const S = { i: 0, ans: [], cur: null, checked: false, start: Date.now(), limit: exam && bank.minutes ? bank.minutes * 60 : 0, timer: null, done: false };
    const answered = () => S.ans.filter((a) => a && a.g != null && a.g !== "").length;
    if (S.limit) S.timer = setInterval(() => { const left = S.limit - (Date.now() - S.start) / 1000; const t = el.querySelector("#qzTimer"); if (t) { t.textContent = fmtTime(left); t.classList.toggle("warn", left < 120); } if (left <= 0) finish(); }, 500);

    function render() {
      const q = qs[S.i]; S.cur = null; S.checked = false;
      let body;
      const qcls = "qtext" + (String(q.q).length > 160 ? " long" : ""); // đoạn văn đọc hiểu dài: chữ thường, dễ đọc hơn
      if (q.type === "fill") {
        const parts = esc(q.q).split("___");
        body = `<div class="label">Điền vào chỗ trống</div><div class="${qcls}">${parts[0]}<input class="blank" id="qzFill" autocomplete="off" spellcheck="false" aria-label="Câu trả lời">${parts.slice(1).join("___")}</div>`;
      } else {
        const wide = q.o.some((o) => String(o).length > 22);
        body = `<div class="label">${q.type === "tf" ? "Đúng hay sai?" : "Chọn đáp án đúng"}</div><div class="${qcls}">${esc(q.q)}</div>
          <div class="opts${wide ? " wide" : ""}">${q.order.map((oi, k) => `<button class="opt" data-o="${oi}"><span class="k">${LET[k]}</span><span>${esc(q.o[oi])}</span></button>`).join("")}</div>`;
      }
      el.innerHTML = `<div class="stack">
        <div class="row between"><button class="linkbtn" id="qzExit">← Thoát</button>
          <div class="row">${S.limit ? `<span class="chip" id="qzTimer">${fmtTime(S.limit - (Date.now() - S.start) / 1000)}</span>` : ""}<span class="chip">${S.i + 1} / ${qs.length}</span></div></div>
        <div class="bar" aria-hidden="true"><i style="width:${(S.i / qs.length) * 100}%"></i></div>
        <section class="qcard">
          <div class="row between"><span class="label">${esc(bank.title)}</span>${q.topic ? `<span class="label">${esc(q.topic)}</span>` : ""}</div>
          ${body}
          <div id="qzFb" aria-live="polite"></div>
        </section>
        <div class="row between"><button class="btn ghost" id="qzSkip">Bỏ qua</button><button class="btn main" id="qzGo">${exam ? "Trả lời" : "Kiểm tra"}</button></div>
      </div>`;
      el.querySelectorAll(".opt").forEach((b) => (b.onclick = () => { if (S.checked) return; el.querySelectorAll(".opt").forEach((x) => x.classList.remove("sel")); b.classList.add("sel"); S.cur = +b.dataset.o; }));
      const inp = el.querySelector("#qzFill");
      if (inp) { inp.oninput = () => (S.cur = inp.value); inp.onkeydown = (e) => { if (e.key === "Enter") el.querySelector("#qzGo").click(); }; setTimeout(() => inp.focus({ preventScroll: true }), 50); }
      el.querySelector("#qzExit").onclick = confirmExit;
      el.querySelector("#qzSkip").onclick = () => { S.ans[S.i] = { q, g: null, ok: false }; next(); };
      el.querySelector("#qzGo").onclick = () => {
        if (S.checked) { next(); return; }
        if (S.cur == null || S.cur === "") { el.querySelector("#qzFb").innerHTML = `<div class="fb bad">Bạn trả lời trước, hoặc bấm Bỏ qua nhé.</div>`; return; }
        const ok = isRight(q, S.cur); S.ans[S.i] = { q, g: S.cur, ok };
        if (exam) { next(); return; }
        S.checked = true;
        el.querySelectorAll(".opt").forEach((b) => { const o = +b.dataset.o; if (o === q.a) b.classList.add("right"); else if (b.classList.contains("sel")) b.classList.add("wrong"); });
        el.querySelector("#qzFb").innerHTML = (ok ? `<div class="fb ok">Đúng rồi!</div>` : `<div class="fb bad">Chưa đúng. <span>Đáp án: <b>${esc(correctText(q))}</b></span></div>`) + (q.x ? `<div class="expl">${esc(q.x)}</div>` : "");
        el.querySelector("#qzGo").textContent = S.i + 1 < qs.length ? "Câu tiếp" : "Xem kết quả";
        el.querySelector("#qzSkip").disabled = true;
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
    function finish() {
      if (S.done) return; S.done = true; clearInterval(S.timer);
      if (!answered()) {
        el.innerHTML = `<div class="stack">
          <section class="panel"><div class="label">${esc(bank.title)} · ${exam ? "Làm như thi" : "Ôn luyện"}</div><p>Bạn chưa làm câu nào nên không lưu điểm.</p></section>
          <div class="row"><button class="btn main" id="qzAgain">Làm lại</button><button class="btn ghost" id="qzHome">Về trang chính</button></div></div>`;
        el.querySelector("#qzAgain").onclick = () => start(el, bank, opts, h);
        el.querySelector("#qzHome").onclick = () => opts.onExit && opts.onExit();
        window.scrollTo(0, 0);
        return;
      }
      if (exam) for (let i = 0; i < qs.length; i++) if (!S.ans[i]) S.ans[i] = { q: qs[i], g: null, ok: false };
      const done = S.ans.filter(Boolean), right = done.filter((a) => a.ok).length, total = done.length;
      const secs = Math.min((Date.now() - S.start) / 1000, S.limit || Infinity);
      const wrong = done.filter((a) => !a.ok);
      const byTopic = {}; done.forEach((a) => { const k = a.q.topic || "Chung"; byTopic[k] = byTopic[k] || [0, 0]; byTopic[k][1]++; if (a.ok) byTopic[k][0]++; });
      if (total && opts.onFinish) opts.onFinish({ r: right, t: total, s: Math.round(secs), mode: exam ? "exam" : "practice", wrongTopics: wrong.map((a) => a.q.topic || "Chung") });
      const d10 = total ? String(Math.round((right / total) * 40) / 4).replace(".", ",") : "0";
      el.innerHTML = `<div class="stack">
        <section class="panel">
          <div class="label">${esc(bank.title)} · ${exam ? "Làm như thi" : "Ôn luyện"}</div>
          <div class="row" style="gap:18px;align-items:flex-end"><div class="score">${d10}<span class="score-sub">/10</span></div>
          <div class="stack tight"><b>${right}/${total} câu đúng</b><span class="muted small">Thời gian: ${fmtTime(secs)}</span></div></div>
        </section>
        ${Object.keys(byTopic).length > 1 ? `<section class="panel"><div class="label">Theo chủ đề</div><div class="ubreak">${Object.entries(byTopic).map(([k, [r, t]]) => `<span>${esc(k)}</span><div class="bar"><i style="width:${(r / t) * 100}%"></i></div><span>${r}/${t}</span>`).join("")}</div></section>` : ""}
        ${wrong.length ? `<section class="panel"><div class="label">Câu cần xem lại (${wrong.length})</div><div class="review">${wrong.map((a) => `<div class="rv"><div>${esc(a.q.q).replace("___", "…")}</div><div class="small">Bạn trả lời: <s>${esc(givenText(a.q, a.g))}</s> · Đáp án: <b>${esc(correctText(a.q))}</b></div>${a.q.x ? `<div class="expl">${esc(a.q.x)}</div>` : ""}</div>`).join("")}</div></section>` : ""}
        <div class="row"><button class="btn main" id="qzAgain">Làm lại</button><button class="btn ghost" id="qzHome">Về trang chính</button></div>
      </div>`;
      el.querySelector("#qzAgain").onclick = () => start(el, bank, opts, h);
      el.querySelector("#qzHome").onclick = () => opts.onExit && opts.onExit();
      window.scrollTo(0, 0);
    }
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
     Đúng: Hình vuông có 4 góc vuông.   → câu đúng/sai (hoặc "Sai: ...") */
  function parse(text) {
    const questions = [], errors = [];
    let topic = "";
    String(text || "").replace(/\r/g, "").split(/\n\s*\n/).forEach((blk, bi) => {
      let lines = blk.split("\n").map((l) => l.trim()).filter(Boolean);
      while (lines.length && lines[0].startsWith("#")) { topic = lines[0].replace(/^#+\s*/, "").replace(/^chủ đề\s*:?\s*/i, ""); lines.shift(); }
      if (!lines.length) return;
      const x = lines.filter((l) => l.startsWith(">")).map((l) => l.replace(/^>\s*/, "")).join(" ");
      lines = lines.filter((l) => !l.startsWith(">"));
      const opts = lines.filter((l) => /^[*-]\s+/.test(l));
      const stem = lines.filter((l) => !/^[*-]\s+/.test(l)).join(" ");
      const n = bi + 1;
      if (opts.length) {
        const right = opts.filter((l) => l.startsWith("*"));
        if (right.length !== 1) { errors.push(`Câu ${n}: cần đúng một đáp án đánh dấu *`); return; }
        if (opts.length < 2) { errors.push(`Câu ${n}: cần ít nhất 2 lựa chọn`); return; }
        const o = [right[0]].concat(opts.filter((l) => !l.startsWith("*"))).map((l) => l.replace(/^[*-]\s+/, ""));
        questions.push({ topic, type: "mc", q: stem || "Chọn đáp án đúng.", o, x });
        return;
      }
      const tf = stem.match(/^(Đúng|Sai)\s*:\s*(.+)$/i);
      if (tf) { questions.push({ topic, type: "tf", q: tf[2], a: /^đúng$/i.test(tf[1]), x }); return; }
      const m = stem.match(/\[([^\]]+)\]/);
      if (m) { questions.push({ topic, type: "fill", q: stem.replace(m[0], "___"), ans: m[1].split("|").map((s) => s.trim()).filter(Boolean), x }); return; }
      errors.push(`Câu ${n}: chưa nhận ra dạng câu ("${stem.slice(0, 40)}…")`);
    });
    return { questions, errors };
  }

  window.Quiz = { run, parse, isRight };
})();
