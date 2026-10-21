/* Bộ làm bài chung cho các ngân hàng câu hỏi (đề có sẵn trong data/banks/ và ngân hàng do quản trị viên nhập).
   Quiz.run(el, bank, {mode:"exam"|"practice", onExit, onFinish, name?, previous?}) → {stop(), busy(), answered(), submit(), count(), exam, retry}
     busy(): đang làm dở (làm như thi chưa nộp, hoặc ôn luyện đã trả lời hoặc bỏ qua ít nhất một câu);
     answered(): số câu đã trả lời (câu bấm "Bỏ qua" không tính); submit(): nộp bài như bấm Nộp; count(): số câu của lượt đang làm.
     Nút trên cùng (Phiên UX5, X6): ôn luyện "← Thoát" (#qzExit); làm như thi "Nộp bài" (#qzSubmit, bên phải). Cả hai hỏi lại trong
     trang trước (chưa trả lời câu nào thì hỏi "Thoát đề?"). Chip đồng hồ "Còn 12:30" (#qzTimer, role="timer", aria-label "Thời gian
     còn lại", X7) và tiến độ "Câu 9/25" (#qzProg).
     Chưa trả lời câu nào (kể cả khi hết giờ) thì nộp bài không gọi onFinish: không lưu điểm.
     "Làm lại" dùng tiếp đối tượng này, nên app luôn dừng hoặc nộp đúng lượt đang làm. opts.redraw() → {questions} (đề
     ngẫu nhiên): nút thành "Làm đề khác", lượt sau dùng bộ câu mới.
   Màn kết quả (Phiên UX1): lời khen theo điểm (opts.name: tên học sinh, để trống thì không xưng tên); opts.previous() → {r, t} của
     lần trước cùng đề (app đọc từ kết quả đã lưu, gọi trước khi lưu lượt này) thì có nhãn "Hơn/Kém/Bằng lần trước"; nút "Ôn lại N câu sai"
     mở một lượt ôn luyện chỉ gồm các câu sai (retry = true trong lúc đó), không gọi onFinish, không lưu điểm; "Làm lại cả đề" về đề đầy đủ
     cùng cách làm; câu cần xem lại thu gọn (<details class="rv">, bấm mới xem đáp án, lời giải); theo chủ đề chỉ hiện chủ đề cần ôn thêm.
     Trên câu chỉ một dòng nhãn "môn · chủ đề" (dạng đúng/sai 4 ý, nối cột, sắp xếp, tự luận ghi thêm cách làm); câu điền mà mọi đáp án
     là số thì ô nhập có inputmode="decimal" (bàn phím số), trừ khi có đáp án âm (L30: bàn phím thường, dòng nhắc số âm dưới câu).
   Bài đã gửi cho bố mẹ chưa (Phiên UX6, X10): màn kết quả có chỗ trống <p class="saved" id="qzSaved" hidden> trong #qzScore;
     bản đám mây, app điền sau khi lưu (onFinish) và lượt gửi xong (js/app.js, savedLine). Chữ: TXT.appSent, appPending.
   Chế độ tập trung (Phiên UX5, X5): opts.onStart() khi một lượt bắt đầu (cả "Làm lại", "Ôn lại câu sai"), opts.onEnd() khi lượt
     đó xong, ở mọi nhánh của finish() (có màn kết quả hoặc chưa trả lời câu nào) và khi thoát đề chưa làm câu nào. App ẩn thanh trên
     trong khoảng giữa hai lần gọi.
   onFinish(res) được gọi cho hai loại kết quả:
     - phần chấm tự động: {r, t, s, mode, wrongTopics}. t: số câu, r: số câu đúng, có thể lẻ đến 0,01 vì câu đúng/sai 4 ý
       và nối cột chấm theo từng ý (score); câu tự luận không tính vào r, t;
     - điểm tự chấm phần tự luận: {mode: "self", r, t, s: 0}, r và t tính bằng phần tư điểm (số nguyên), không cộng vào
       điểm trung bình (app ghi riêng). Ôn luyện: lưu lúc nộp; làm như thi: lưu khi bấm "Lưu điểm tự chấm" ở trang kết quả.
   Lịch sử câu (đề ngẫu nhiên): opts.onMarks(marks, late) khi một lượt làm xong (không gọi ở lượt ôn lại câu sai), marks:
     [[Quiz.key(câu), điểm 0–1]] của từng câu đã làm: câu chấm tự động (câu bỏ qua, chưa làm: 0) và câu tự luận đã làm (ôn luyện: đã
     bấm Xem gợi ý; làm như thi: đã bấm Trả lời), điểm 0 khi đã tự chấm mà được dưới một nửa số điểm, còn lại 1 (essayMark). Làm như
     thi tự chấm sau khi nộp, nên bấm "Lưu điểm tự chấm" thì gọi thêm: onMarks(marks, true) với các câu đã trả lời mà tự chấm dưới một
     nửa số điểm (lần làm đã ghi lúc nộp, app chỉ ghi thêm lần sai), onMarks(marks) với các câu bỏ qua hoặc chưa tới mà nay tự chấm
     (có thể đã làm ra giấy). Câu tự luận bỏ qua mà không tự chấm không ghi gì: vẫn là câu chưa làm.
   Dạng câu (xem đầu data/banks/index.js): mc, fill, tf, tf4 (đúng/sai 4 ý), num (trả lời ngắn bằng số; ans là số hoặc phân số
   "a/b", ô nhập có nút ± và nút "/", L29), match (nối cột),
   order (sắp xếp), essay (tự luận tự chấm). Trường chung không bắt buộc: lv (mức độ 1 Biết, 2 Hiểu, 3 Vận dụng),
   p (mã đoạn đọc trong bank.passages), svg (hình, lọc bằng Quiz.svg). Mọi thao tác là chạm, không kéo thả.
   Quiz.parse(text) → {questions, passages, errors}: đọc câu hỏi dán từ Word/Zalo theo cú pháp đơn giản.
   Quiz.svg(src) → {svg, problems}: hình đã lọc (chuỗi rỗng nếu không đọc được) và các chỗ bị bỏ.
   Quiz.draw(bank, hist) → {questions, notes}: rút đề ngẫu nhiên theo ma trận của đề có pool (Phiên K3; câu dùng chung đoạn đọc
     rút theo đoạn từ Phiên K4, xem draw).
   Quiz.key(q): mã ổn định của một câu (băm nội dung), dùng để ghi nhớ câu đã làm; opts.onMarks nhận [[mã câu, điểm]].
   Báo câu sai (Phiên R1): có opts.onReport thì dưới lời giải khi ôn luyện (sau khi Kiểm tra, cả câu tự luận sau khi Xem gợi ý)
     và dưới từng câu ở màn kết quả (câu cần xem lại, câu tự luận tự chấm) có link nhỏ "Báo câu này sai"; bấm thì mở hộp
     chọn lí do (Quiz.REASONS) và ghi chú (tối đa 200 kí tự) ngay bên dưới, không dùng hộp nổi.
     onReport(q, {reason, note}) → Promise: gửi xong thì hiện lời cảm ơn, lỗi (reject) thì hiện e.message trong hộp.
     opts.reported(q) → true nếu người này đã báo câu đó từ trước: link ghi "Đã báo câu này", không bấm được.
     q là câu đã dựng (có key = Quiz.key(câu gốc), src nếu từ đề ngẫu nhiên). Quiz.text(q): bản chụp nội dung câu
     (câu hỏi, các ô, đáp án; tối đa 500 kí tự) để lưu kèm báo cáo.
   Đề Tiếng Anh (Phiên TA2): mọi chữ của màn làm bài lấy từ bảng chữ TXT (vi, en). Quiz.lang(bank) → "en" khi môn là Tiếng Anh
     (hoặc bank.lang = "en"), còn lại "vi"; Quiz.run đọc opts.lang, mặc định Quiz.lang(bank). Quiz.title(bank, lang): tên đề
     tiếng Anh dựng từ tên chuẩn ("Tiếng Anh 4 · Cuối kì I · Đề 1" → "English 4 · End-of-term 1 · Test 1"). Quiz.TXT[lang]
     cho js/app.js dùng cùng bảng chữ (màn mở đề, hộp rời trang, thông báo lưu điểm). Quiz.fmtN(x, lang): số thập phân
     tiếng Anh dùng dấu chấm. Khung làm bài có lang="en" để trình đọc màn hình đọc đúng giọng. */
(function () {
  const LET = "ABCDEFGHIJ";
  const ABCD = "abcd";
  /* ---------------- bảng chữ hai ngôn ngữ (Phiên TA2) ----------------
     Mọi chữ học sinh thấy khi làm một đề (màn làm bài, màn kết quả, hộp hỏi, thang tự chấm, đoạn đọc, gợi ý nối cột và sắp xếp,
     aria-label, tên mức độ, Đúng/Sai, link và hộp báo câu sai) và chữ của js/app.js quanh đề (các khóa app…: màn mở đề, màn tải đề,
     hộp rời trang, thông báo lưu điểm, khung bài ôn IOE) lấy từ đây. Đề Tiếng Anh (Quiz.lang(bank) → "en") dùng cột en, còn lại
     cột vi. Thêm chữ mới cho màn làm đề thì thêm ở cả hai cột (CLAUDE.md, "Quy ước code"); chuỗi có tham số viết là hàm.
     Dữ liệu lưu (kết quả, bản chụp câu bị báo Quiz.text) và chữ ở trang chủ, báo cáo, khu phụ huynh không qua bảng này (trừ appWhen:
     ago() trong js/app.js dùng TXT.vi.appWhen cho chữ "Hôm nay 12:43" ở mọi màn hình, Phiên UX5). */
  const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const TXT = {
    vi: {
      lang: "vi", lv: { 1: "Biết", 2: "Hiểu", 3: "Vận dụng" }, tfYes: "Đúng", tfNo: "Sai", blank: "(bỏ trống)", topicGeneral: "Chung",
      tol: (x) => ` (sai số cho phép ±${x})`,
      // rút đề ngẫu nhiên (draw)
      drawLv: (t, n, lv, from) => `${t}: thiếu ${n} câu mức ${lv}, lấy bù ${from}`, lvOf: (lv) => "mức " + lv, noLv: "câu chưa ghi mức",
      drawOther: (t, n) => `${t}: thiếu ${n} câu, lấy từ chủ đề khác`, drawShort: (t, n) => `${t}: kho chưa đủ câu, thiếu ${n} câu`,
      drawPsg: (t, d) => `${t}: lấy cả đoạn đọc nên ${d}`, lvDiff: (lv, n, want) => `mức ${lv} có ${n} câu thay vì ${want}`,
      // đoạn đọc
      psgTitle: "Đọc kĩ rồi trả lời", psgFor: (n) => `Dùng chung cho ${n} câu`, psgHide: "Thu gọn", psgShow: "Mở ra",
      // thân câu hỏi (UX1: trên câu chỉ một dòng nhãn "môn · chủ đề", dạng phức tạp ghi thêm cách làm: tf4Label, matchLabel, orderLabel, essayLabel)
      fillAria: "Câu trả lời", negHint: "Số âm: gõ dấu trừ phía trước, ví dụ -12.", numSign: "Thêm hoặc bỏ dấu trừ", numSlash: "Thêm dấu phân số", numAria: "Đáp số",
      numHint: "Phân số viết a/b, ví dụ 3/4. Số thập phân viết bằng dấu phẩy, ví dụ 2,5.", tf4Label: "Đúng hay sai? Chọn cho từng ý", tf4Group: (c) => `Ý ${c}`,
      matchLabel: "Nối cột", orderLabel: "Sắp xếp thứ tự", orderYours: "Thứ tự của bạn", essayLabel: "Tự luận · tự chấm", essayAria: "Bài làm",
      essayPh: "Viết bài làm ở đây, hoặc viết ra giấy.", essayNote: "Phần tự luận không tính vào điểm trung bình.",
      essayExam: "Nộp bài xong, bạn xem gợi ý và tự chấm.", essayPractice: "Bấm Xem gợi ý để tự chấm theo thang điểm.",
      needTf4: "Bạn chọn Đúng hoặc Sai cho cả 4 ý", needMatch: "Bạn nối hết các ô bên trái", needOrder: "Bạn xếp hết các ô", needAnswer: "Bạn trả lời trước", needTail: ", hoặc bấm Bỏ qua nhé.",
      // thang tự chấm (số điểm đã định dạng, kèm giá trị số để tiếng Anh chia số ít/nhiều)
      rubricHead: (m) => `Thang tự chấm · ${m} điểm`, rubricPts: (p) => `(${p} điểm)`, lvNone: "Chưa có", lvPart: "Một phần", lvFull: "Đủ",
      selfSum: (g, m) => `Tự chấm: <b>${g}/${m} điểm</b>`, selfPick: "Chọn mức cho từng ý để tính điểm.",
      // báo câu sai (R1)
      rpLink: "Báo câu này sai", rpDone: "Đã báo câu này", rpHead: "Câu này sai ở đâu?", rpReason: "Lí do",
      reasons: { wrong: "Đáp án sai", unclear: "Câu hỏi khó hiểu", typo: "Lỗi chính tả", other: "Khác" },
      rpNote: "Ghi chú", rpNoteOpt: "(không bắt buộc, tối đa 200 kí tự)", rpNotePh: "Viết thêm nếu muốn", rpSend: "Gửi", rpCancel: "Thôi",
      rpNeed: "Bạn chọn một lí do nhé.", rpThanks: "Cảm ơn bạn! Người làm đề sẽ xem lại câu này.", rpFail: "Chưa gửi được. Thử lại nhé.",
      // màn làm bài
      // X7: chip đồng hồ "Còn 12:30" (aria-label "Thời gian còn lại"), tiến độ "Câu 9/25"
      timeLeft: (t) => `Còn ${t}`, timeAria: "Thời gian còn lại", progress: (i, n) => `Câu ${i}/${n}`,
      exit: "← Thoát", submit: "Nộp bài", skip: "Bỏ qua", answer: "Trả lời", seeGuide: "Xem gợi ý", check: "Kiểm tra", next: "Câu tiếp", seeResults: "Xem kết quả",
      guide: "Gợi ý:", noGuide: "Chưa có gợi ý.", right: "Đúng rồi!", wrong: "Chưa đúng.", ansLabel: "Đáp án:", ordRight: "Thứ tự đúng:",
      tf4All: "Đúng cả 4 ý!", tf4Part: (k, p) => `Đúng ${k}/4 ý · được ${p}/1 điểm.`,
      mtNone: "Chưa nối", mtItem: (i) => "Ô " + i, mtDone: "Đã nối đủ. Chạm một ô bên trái để đổi.", mtPick: (i) => `Chọn ô nối với ô ${i}`,
      mtWrong: (g) => `Bạn nối: ${g} · Đúng: `, mtAll: "Nối đúng hết!", mtPart: (k, n, p) => `Nối đúng ${k}/${n} cặp · được ${p}/1 điểm.`,
      ordRemove: (i, s) => `Bỏ ô ${i}: ${s}`, ordTap: (i) => `Chạm ô thứ ${i}`, ordDone: "Đã xếp đủ. Chạm một ô ở trên để bỏ ra.",
      // hộp hỏi khi bấm "← Thoát" (ôn luyện) hoặc "Nộp bài" (làm như thi, X6) trong màn làm bài
      exNone: ["Thoát đề? Bạn chưa làm câu nào nên không lưu điểm.", "Thoát"], exExam: ["Nộp bài ngay? Câu chưa làm tính là sai.", "Nộp bài"],
      exPractice: ["Dừng ôn và xem kết quả?", "Dừng"], exRetry: ["Dừng ôn lại câu sai? Lượt này không lưu điểm.", "Dừng"], keepGoing: "Làm tiếp",
      // màn kết quả
      modeExam: "Làm như thi", modePractice: "Ôn luyện", noneDone: "Bạn chưa làm câu nào nên không lưu điểm.", again: "Làm lại", newTest: "Làm đề khác", home: "Về trang chính",
      // UX1: lời khen theo điểm (thang 10; nm: ", tên" hoặc rỗng), so với lần trước cùng đề, ôn lại câu sai, câu sai thu gọn, chủ đề cần ôn
      praise: (d, nm) => (d >= 9 ? `Xuất sắc${nm}!` : d >= 8 ? `Giỏi lắm${nm}!` : d >= 6.5 ? `Khá tốt${nm}! Cố thêm chút nữa nhé.` : d >= 5 ? `Được rồi${nm}! Ôn thêm là lên điểm thôi.` : `Chưa sao${nm}. Xem lại lời giải rồi thử lại nhé.`),
      cmpMore: (n, p) => `Hơn lần trước ${n} câu (${p})`, cmpLess: (n, p) => `Kém lần trước ${n} câu (${p})`, cmpSame: (p) => `Bằng lần trước (${p})`, cmpPrev: (p) => `Lần trước: ${p}`,
      retry: (n) => `Ôn lại ${n} câu sai`, againAll: "Làm lại cả đề", retryHead: "Ôn lại câu sai", retryNote: "Lượt ôn lại câu sai không lưu điểm.",
      qN: (n) => `Câu ${n}`, rvTap: "bấm để xem đáp án, lời giải",
      topicsAll: (m) => `Đúng hết cả ${m} chủ đề!`, topicsOk: (k, m) => `Đúng hết ${k}/${m} chủ đề. Cần ôn thêm:`, topicsShow: (m) => `Xem cả ${m} chủ đề`,
      essayHead: (n) => `Tự luận · tự chấm (${n} câu)`, essayExamNote: "Không tính vào điểm trung bình. Đọc gợi ý, chọn mức cho từng ý rồi bấm Lưu.",
      saveSelf: "Lưu điểm tự chấm", notMarked: "chưa chấm", selfSaved: (g, m) => `Đã lưu điểm tự chấm: ${g}/${m} điểm.`, selfNoAvg: "Không tính vào điểm trung bình.",
      selfNeed: "Chọn mức cho từng ý của ít nhất một câu rồi bấm Lưu nhé.",
      scoreLine: (r, t) => `${r}/${t} câu đúng`, time: "Thời gian: ", partNote: "Câu đúng/sai 4 ý và nối cột tính điểm theo từng ý.",
      onlyEssay: "Lượt này chỉ có câu tự luận.", byTopic: "Theo chủ đề", byLv: "Theo mức độ", review: (n) => `Câu cần xem lại (${n})`,
      yourAns: "Bạn trả lời: ", gotPts: (p) => ` (được ${p}/1 điểm)`, ansIn: " · Đáp án: ", emptyBank: "Ngân hàng này chưa có câu hỏi.",
      // js/app.js: màn mở đề, màn tải đề, hộp rời trang, thông báo lưu điểm, khung bài ôn (renderQuiz, loadQuiz, renderPlay)
      appHome: "Trang chính", appGrade: (g) => `Lớp ${g}`, english: "Tiếng Anh", appRandom: "Đề ngẫu nhiên",
      appPoolIntro: (n, all, src) => `Mỗi lần làm là một đề khác: ${n} câu rút từ kho ${all} câu${src ? ` (${src} đề)` : ""} theo ma trận đề, ưu tiên câu bạn chưa làm hoặc hay sai`,
      appCount: (n) => `${n} câu`, appEssayN: (n) => ` (${n} câu tự luận tự chấm)`, appNotes: (s) => `Kho còn thiếu câu, lần này: ${s}.`, appNotesToast: (s) => "Kho còn thiếu câu: " + s,
      appSaved: "Đã lưu kết quả", appSavedSelf: "Đã lưu điểm tự chấm",
      // bản đám mây (UX6, X10): dòng #qzSaved ở màn kết quả và thông báo lưu điểm ghi bài đã tới bố mẹ chưa; bài ôn trong khung: "18/20 câu đúng. Đã lưu và gửi…"
      appSent: "Đã lưu và gửi cho bố mẹ.", appPending: "Đã lưu trên máy này. Sẽ gửi cho bố mẹ khi có mạng.", appModScore: (r, t) => `${r}/${t} câu đúng.`,
      // màn mở đề (UX5, X9): thẻ "Lần trước" (số câu đúng; lúc làm · cách làm · thời gian), hai thẻ chọn cách làm có một dòng giải thích.
      // appWhen: lúc làm (diff: số ngày trước hôm nay, hm: giờ:phút, d/m: ngày, tháng), cũng là chữ "Hôm nay 12:43" của ago() trong js/app.js
      appPrev: (r, t) => `Lần trước: ${r}/${t} câu đúng`, appPrevMode: { exam: "làm như thi", practice: "ôn luyện" },
      appWhen: (diff, hm, d, m) => (diff <= 0 ? "Hôm nay " + hm : diff === 1 ? "Hôm qua " + hm : `${d}/${m} ${hm}`),
      appDur: (s) => (s < 60 ? `${s} giây` : `${Math.round(s / 60)} phút`),
      appChoose: "Chọn cách làm", appPractice: "Ôn luyện", appPracticeNote: "Xem đáp án và lời giải ngay sau mỗi câu. Không tính giờ.",
      appExam: (m) => `Làm như thi · ${m} phút`, appExamNote: "Tính giờ như ở trường, chấm điểm khi nộp bài.",
      appLeaveNone: { ask: "Thoát đề?", note: "Bạn chưa làm câu nào nên không lưu điểm.", yes: "Thoát", no: "Làm tiếp" },
      appLeaveExam: { ask: "Nộp bài và rời trang?", note: "Câu chưa làm tính là sai.", yes: "Nộp bài", no: "Làm tiếp" },
      appLeavePractice: { ask: "Dừng ôn và rời trang?", note: "Kết quả các câu đã làm được lưu lại.", yes: "Dừng ôn", no: "Ôn tiếp" },
      appLeaveRetry: { ask: "Dừng ôn lại và rời trang?", note: "Lượt ôn lại câu sai không lưu điểm.", yes: "Dừng", no: "Ôn tiếp" },
      appLoading: "Đang tải đề…", appLoadFail: "Chưa tải được đề này. Bạn kiểm tra mạng rồi bấm Thử lại nhé.",
      appLoadTip: "Đề đã mở một lần khi có mạng thì lần sau mở được cả khi mất mạng.", appRetry: "Thử lại",
      appScoreSaved: ["Điểm được lưu", "Điểm mỗi lần làm xong được lưu vào hồ sơ của bạn."],
      appLeavePlay: { ask: "Rời bài ôn?", note: "Bài đang làm dở sẽ không được lưu.", yes: "Rời bài", no: "Ở lại" },
      appSavedModule: (r, t) => `Đã lưu kết quả: ${r}/${t} câu đúng`
    },
    en: {
      lang: "en", lv: { 1: "Know", 2: "Understand", 3: "Apply" }, tfYes: "True", tfNo: "False", blank: "(no answer)", topicGeneral: "General",
      tol: (x) => ` (±${x} allowed)`,
      drawLv: (t, n, lv, from) => `${t}: ${n} missing at level ${lv}, filled with ${from}`, lvOf: (lv) => "level " + lv, noLv: "questions without a level",
      drawOther: (t, n) => `${t}: ${n} missing, taken from other topics`, drawShort: (t, n) => `${t}: not enough questions in the bank, ${n} missing`,
      drawPsg: (t, d) => `${t}: whole passages were kept, so ${d}`, lvDiff: (lv, n, want) => `${n} at level ${lv} instead of ${want}`,
      psgTitle: "Read and answer", psgFor: (n) => (n === 1 ? "For 1 question" : `For ${n} questions`), psgHide: "Hide", psgShow: "Show",
      fillAria: "Your answer", negHint: "For a negative number, type the minus sign first, for example -12.", numSign: "Add or remove the minus sign", numSlash: "Add a fraction bar", numAria: "Your answer",
      numHint: "Write a fraction as a/b, for example 3/4. Use a decimal point, for example 2.5.", tf4Label: "True or false? Choose for each sentence", tf4Group: (c) => `Sentence ${c}`,
      matchLabel: "Match", orderLabel: "Put in order", orderYours: "Your order", essayLabel: "Writing · self-check", essayAria: "Your writing",
      essayPh: "Write here, or on paper.", essayNote: "Writing is not counted in your average score.",
      essayExam: "After you finish, read the guide and mark your own work.", essayPractice: "Tap See the guide to mark your own work.",
      needTf4: "Choose True or False for all 4 sentences", needMatch: "Match all the items on the left", needOrder: "Put all the items in order", needAnswer: "Answer the question first", needTail: ", or tap Skip.",
      rubricHead: (m, n) => `Marking guide · ${m} ${n === 1 ? "point" : "points"}`, rubricPts: (p, n) => `(${p} ${n === 1 ? "point" : "points"})`, lvNone: "Not yet", lvPart: "Partly", lvFull: "Fully",
      selfSum: (g, m, n) => `My score: <b>${g}/${m} ${n === 1 ? "point" : "points"}</b>`, selfPick: "Choose a level for each part to get your score.",
      rpLink: "Report a problem", rpDone: "Reported", rpHead: "What's wrong with this question?", rpReason: "Reason",
      reasons: { wrong: "Wrong answer", unclear: "Confusing question", typo: "Spelling mistake", other: "Other" },
      rpNote: "Note", rpNoteOpt: "(optional, up to 200 characters)", rpNotePh: "Write more if you like", rpSend: "Send", rpCancel: "Cancel",
      rpNeed: "Please choose a reason.", rpThanks: "Thank you! We will check this question.", rpFail: "Couldn't send. Please try again.",
      timeLeft: (t) => `${t} left`, timeAria: "Time left", progress: (i, n) => `${i} of ${n}`,
      exit: "← Exit", submit: "Finish test", skip: "Skip", answer: "Answer", seeGuide: "See the guide", check: "Check", next: "Next question", seeResults: "See results",
      guide: "Guide:", noGuide: "No guide yet.", right: "Correct!", wrong: "Not quite.", ansLabel: "Answer:", ordRight: "Correct order:",
      tf4All: "All 4 correct!", tf4Part: (k, p) => `${k}/4 correct · ${p}/1 point.`,
      mtNone: "Not matched yet", mtItem: (i) => "Item " + i, mtDone: "All matched. Tap an item on the left to change it.", mtPick: (i) => `Choose a match for item ${i}`,
      mtWrong: (g) => `You matched: ${g} · Correct: `, mtAll: "All matched!", mtPart: (k, n, p) => `${k}/${n} matched · ${p}/1 point.`,
      ordRemove: (i, s) => `Remove item ${i}: ${s}`, ordTap: (i) => `Tap item ${i}`, ordDone: "All placed. Tap an item above to remove it.",
      exNone: ["Exit the test? You haven't answered any questions, so no score is saved.", "Exit"], exExam: ["Finish test now? Unanswered questions count as wrong.", "Finish test"],
      exPractice: ["End practice and see your results?", "End practice"], exRetry: ["Stop reviewing your mistakes? This round is not scored.", "Stop"], keepGoing: "Keep going",
      modeExam: "Test mode", modePractice: "Practice", noneDone: "You haven't answered any questions, so no score is saved.", again: "Try again", newTest: "New test", home: "Go to home",
      praise: (d, nm) => (d >= 9 ? `Excellent${nm}!` : d >= 8 ? `Great job${nm}!` : d >= 6.5 ? `Good work${nm}! Keep it up.` : d >= 5 ? `Nice try${nm}! A bit more practice and you'll get there.` : `Don't worry${nm}. Read the guides and try again.`),
      cmpMore: (n, p) => `${n} more than last time (${p})`, cmpLess: (n, p) => `${n} fewer than last time (${p})`, cmpSame: (p) => `Same as last time (${p})`, cmpPrev: (p) => `Last time: ${p}`,
      retry: (n) => `Review ${n} ${n === 1 ? "mistake" : "mistakes"}`, againAll: "Try the whole test again", retryHead: "Reviewing mistakes", retryNote: "Reviewing your mistakes is not scored.",
      qN: (n) => `Question ${n}`, rvTap: "tap to see the answer and guide",
      topicsAll: (m) => `All ${m} topics correct!`, topicsOk: (k, m) => `${k}/${m} topics fully correct. Needs more practice:`, topicsShow: (m) => `Show all ${m} topics`,
      essayHead: (n) => `Writing · self-check (${n} ${n === 1 ? "question" : "questions"})`, essayExamNote: "Not counted in your average score. Read the guide, choose a level for each part, then tap Save.",
      saveSelf: "Save my score", notMarked: "not marked", selfSaved: (g, m, n) => `Self-check score saved: ${g}/${m} ${n === 1 ? "point" : "points"}.`, selfNoAvg: "Not counted in your average score.",
      selfNeed: "Choose a level for each part of at least one question, then tap Save.",
      scoreLine: (r, t) => `${r}/${t} correct`, time: "Time: ", partNote: "True/false and matching questions are scored by part.",
      onlyEssay: "This round had only writing questions.", byTopic: "By topic", byLv: "By level", review: (n) => `Review mistakes (${n})`,
      yourAns: "Your answer: ", gotPts: (p) => ` (${p}/1 point)`, ansIn: " · Answer: ", emptyBank: "This bank has no questions yet.",
      appHome: "Home", appGrade: (g) => `Grade ${g}`, english: "English", appRandom: "Random test",
      appPoolIntro: (n, all, src) => `A new test every time: ${n} questions from a bank of ${all}${src ? ` (${src} tests)` : ""}, more of the ones you haven't done or often get wrong`,
      appCount: (n) => `${n} questions`, appEssayN: (n) => ` (${n} self-check writing ${n === 1 ? "question" : "questions"})`, appNotes: (s) => `Not enough questions in the bank this time: ${s}.`, appNotesToast: (s) => "Not enough questions in the bank: " + s,
      appSaved: "Result saved", appSavedSelf: "Self-check score saved",
      appSent: "Saved and sent to your parents.", appPending: "Saved on this device. It will be sent to your parents when you're online.", appModScore: (r, t) => `${r}/${t} correct.`,
      appPrev: (r, t) => `Last time: ${r}/${t} correct`, appPrevMode: { exam: "test mode", practice: "practice" },
      appWhen: (diff, hm, d, m) => (diff <= 0 ? "Today " + hm : diff === 1 ? "Yesterday " + hm : `${d} ${MONTHS[m - 1]} ${hm}`),
      appDur: (s) => (s < 60 ? `${s} ${s === 1 ? "second" : "seconds"}` : `${Math.round(s / 60)} ${Math.round(s / 60) === 1 ? "minute" : "minutes"}`),
      appChoose: "Choose a mode", appPractice: "Practice", appPracticeNote: "See the answer and guide right after each question. No timer.",
      appExam: (m) => `Test mode · ${m} minutes`, appExamNote: "Timed like at school, scored when you finish.",
      appLeaveNone: { ask: "Exit the test?", note: "You haven't answered any questions, so no score is saved.", yes: "Exit", no: "Keep going" },
      appLeaveExam: { ask: "Finish the test and leave?", note: "Unanswered questions count as wrong.", yes: "Finish test", no: "Keep going" },
      appLeavePractice: { ask: "End practice and leave?", note: "Your answers so far will be saved.", yes: "End practice", no: "Keep practising" },
      appLeaveRetry: { ask: "Stop reviewing and leave?", note: "Reviewing your mistakes is not scored.", yes: "Stop", no: "Keep going" },
      appLoading: "Loading the test…", appLoadFail: "Can't load this test. Check your internet and tap Try again.",
      appLoadTip: "Once a test has been opened online, it also opens offline.", appRetry: "Try again",
      appScoreSaved: ["Score saved", "Your score is saved to your profile each time you finish."],
      appLeavePlay: { ask: "Leave this practice?", note: "Your unfinished work won't be saved.", yes: "Leave", no: "Stay" },
      appSavedModule: (r, t) => `Result saved: ${r}/${t} correct`
    }
  };
  const LV = TXT.vi.lv; // tên mức độ tiếng Việt (Quiz.LV, dùng ở js/app.js và tests/kiem-tra-de.js)
  /* Ngôn ngữ của một đề: "en" khi bank.lang là "en" hoặc môn là Tiếng Anh (so sau khi bỏ dấu, chữ thường: "tieng anh", "english"),
     còn lại "vi". Đề có sẵn lẫn ngân hàng phụ huynh tự nhập đều qua đây. */
  const foldS = (s) => String(s == null ? "" : s).normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/gi, "d").toLowerCase().replace(/\s+/g, " ").trim();
  const EN_SUBJECTS = ["tieng anh", "english"];
  const langOf = (bank) => (bank && (bank.lang === "en" || EN_SUBJECTS.includes(foldS(bank.subject))) ? "en" : "vi");
  /* Tên đề bằng tiếng Anh, dựng từ tên chuẩn "<môn> <khối> · <kì> · Đề N" (CLAUDE.md): "Tiếng Anh 4 · Cuối kì I · Đề 1" →
     "English 4 · End-of-term 1 · Test 1", "· Đề ngẫu nhiên" → "· Random test". Tên tự đặt (ngân hàng tự nhập) giữ nguyên. */
  const TERMS = { "Giữa kì I": "Mid-term 1", "Cuối kì I": "End-of-term 1", "Giữa kì II": "Mid-term 2", "Cuối năm": "End-of-year" };
  function title(bank, lg) {
    const t = String((bank && bank.title) || "");
    if ((lg || langOf(bank)) !== "en") return t;
    const m = /^(.+?) (\d{1,2}) · (Giữa kì I|Cuối kì I|Giữa kì II|Cuối năm) · (?:Đề (\d+)|Đề ngẫu nhiên)$/u.exec(t.normalize("NFC").replace(/\s+/g, " ").trim());
    if (!m) return t;
    return `${EN_SUBJECTS.includes(foldS(m[1])) ? "English" : m[1]} ${m[2]} · ${TERMS[m[3]]} · ${m[4] ? "Test " + m[4] : "Random test"}`;
  }
  const TF4_PTS = [0, 0.1, 0.25, 0.5, 1]; // đúng 0/1/2/3/4 ý, như đề thi tốt nghiệp THPT
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  // khoảng trắng ngay trước " · " thành khoảng trắng không ngắt, để tên đề không xuống dòng bắt đầu bằng "·" (như nb của js/app.js, L26)
  const nb = (s) => String(s).replace(/ (?=·)/g, "\u00a0");
  /* Số trong dữ liệu ngăn hàng nghìn bằng khoảng trắng ("1 200", "987 650"): khoảng trắng giữa các nhóm số thành khoảng trắng không ngắt,
     để số không bị tách ra hai dòng ở màn hình hẹp. Dùng sau esc() cho chữ của câu khi hiện ra (câu hỏi, các ô, đáp án, câu trả lời,
     lời giải, đoạn đọc, thang tự chấm, chủ đề); không dùng cho aria-label, hình. Dữ liệu, Quiz.key, Quiz.text giữ khoảng trắng thường;
     cách chấm không đổi (fillRight, numVals coi U+00A0 như khoảng trắng thường). Quiz.nbNum cho js/app.js. */
  const nbNum = (s) => String(s).replace(/(\d) (?=\d{3}(?!\d))/g, "$1\u00a0");
  const shuffle = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };
  const range = (n) => [...Array(n).keys()];
  // xáo đến khi khác thứ tự gốc (để câu nối cột, sắp xếp không có sẵn đáp án)
  const mix = (n) => { let a = range(n); for (let k = 0; k < 20 && n > 1 && a.every((v, i) => v === i); k++) a = shuffle(a); return a; };
  const fmtTime = (s) => { s = Math.max(0, Math.round(s)); return String((s / 60) | 0).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0"); };
  const r2 = (x) => Math.round(x * 100) / 100;
  // số kiểu Việt Nam: 12,5; từ 10 000 thì ngăn hàng nghìn bằng khoảng trắng. lang "en" (đề Tiếng Anh, TA2): 12.5 và 10,000
  const fmtN = (x, lang) => { const [i, d] = String(Math.abs(r2(x))).split("."), en = lang === "en"; return (x < 0 ? "-" : "") + (i.length > 4 ? i.replace(/\B(?=(\d{3})+$)/g, en ? "," : " ") : i) + (d ? (en ? "." : ",") + d : ""); };
  const normT = (s) => String(s).normalize("NFC").replace(/[‘’]/g, "'").replace(/[“”]/g, '"').replace(/\s+/g, " ").replace(/[.!?;:,]+$/, "").trim().toLowerCase();
  const isNum = (s) => /^[-−–]?\s*\d[\d\s.,]*$/.test(String(s).trim());
  const isNeg = (s) => /^\(?\s*[-−–]\s*\d/.test(String(s).trim()); // số âm: "-7", "(−7)" (L30)
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
  /* draw(bank, hist, lg): rút đề từ kho câu của đề ngẫu nhiên (bank.questions, mỗi câu có topic, lv?, src?, p?) theo ma trận
     bank.pool.matrix: { "<chủ đề>": số câu } hoặc { "<chủ đề>": [Biết, Hiểu, Vận dụng] } (xem đầu data/banks/index.js).
     hist(q) → {done, wrong}: số lần học sinh đã làm, làm sai câu đó (app tính từ kết quả); không có thì coi như chưa làm.
     Điểm ưu tiên của một câu là done − 2·wrong, thấp trước (câu hay sai, rồi câu chưa làm, rồi câu đã làm đúng), bằng nhau thì
     ngẫu nhiên. Đi theo từng chủ đề của ma trận:
     - Câu dùng chung đoạn đọc (q.p có trong bank.passages, Phiên K4) rút theo đoạn: k câu của chủ đề lấy từ không quá ⌈k/3⌉ đoạn.
       Mỗi đoạn tính điểm trung bình của các câu còn lại (đoạn có câu hay sai, chưa làm đứng trước), bằng điểm thì đoạn đã rút cho
       chủ đề khác trong lần này đứng trước (câu Viết về bài thơ đi cùng bài thơ), rồi đoạn nhiều câu trước, rồi ngẫu nhiên. Mỗi
       lượt lấy cả đoạn: trong nhóm đoạn bằng điểm chọn đoạn lớn nhất còn vừa số câu cần; không đoạn nào vừa thì lấy phần vừa đủ của
       đoạn hợp mức ma trận nhất, chọn câu theo mức còn thiếu. Câu lẻ (không đoạn) của chủ đề chỉ được rút khi ưu tiên hơn mọi đoạn
       còn lại (câu lẻ chưa làm, đoạn đã làm) hoặc khi đã đủ số đoạn: phần còn lại rút theo ô như bên dưới. Số câu từng mức theo
       đoạn có thể lệch ma trận: lệch quá 1 câu ở một mức thì ghi notes (L.drawPsg). Câu cùng đoạn đứng liền nhau trong questions,
       theo thứ tự trong kho (Quiz.run giữ nhóm đó, chủ đề sau đứng sau).
     - Câu không có đoạn đọc (và đề không có passages) rút theo từng ô (chủ đề, mức) như Phiên K3: ô lấy câu đúng chủ đề (đúng mức
       nếu ô ghi theo mức) theo điểm ưu tiên; ở chủ đề có đoạn đọc, câu còn lại của các đoạn chỉ được lấy khi câu lẻ không đủ (câu
       hay sai của một đoạn được rút cùng đoạn, không tách lẻ). Ô thiếu câu thì lấy bù cùng chủ đề: câu chưa ghi mức trước, rồi mức
       gần nhất, rồi từ chủ đề khác; mỗi chỗ bù ghi một dòng vào notes (chưa esc; theo ngôn ngữ lg, mặc định Quiz.lang(bank)). Kho
       đủ câu thì trả về đúng tổng của ma trận. */
  function draw(bank, hist, lg) {
    const m = (bank.pool && bank.pool.matrix) || {}, notes = [], L = TXT[lg] || TXT[langOf(bank)];
    const topicOf = (t) => String(t == null ? "" : t).normalize("NFC").replace(/\s+/g, " ").trim();
    const weight = (q) => { const h = hist ? hist(q) : null; return h ? (+h.done || 0) - 2 * (+h.wrong || 0) : 0; };
    const psg = bank.passages && typeof bank.passages === "object" && !Array.isArray(bank.passages) ? bank.passages : {};
    const pOf = (q) => (q && q.p != null && Object.prototype.hasOwnProperty.call(psg, q.p) ? String(q.p) : "");
    // xáo rồi sắp theo điểm ưu tiên (sort giữ thứ tự câu bằng điểm): câu bằng điểm đứng ngẫu nhiên. i: vị trí trong kho.
    const ranked = shuffle((bank.questions || []).map((q, i) => ({ q, i, w: weight(q), t: topicOf(q.topic), p: pOf(q) }))).sort((a, b) => a.w - b.w);
    const used = new Set(), usedP = new Set(), out = [];
    const take = (list, k) => { const got = []; for (const x of list) { if (got.length >= k) break; if (!used.has(x)) { used.add(x); got.push(x); } } return got; };
    const lvN = (x) => (LV[x.q.lv] ? x.q.lv : 0);
    const dist = (q, lv) => (LV[q.lv] ? Math.abs(q.lv - lv) : 0.5); // câu chưa ghi mức: lấy trước mức kề
    const topics = [];
    Object.keys(m).forEach((t) => {
      const v = m[t], topic = topicOf(t);
      if (Array.isArray(v)) { const need = [0, 1, 2].map((i) => Math.max(0, Math.floor(v[i]) || 0)); if (need.some((n) => n > 0)) topics.push({ topic, need, k: need.reduce((a, n) => a + n, 0) }); }
      else if (v > 0) topics.push({ topic, need: null, k: Math.floor(v) });
    });
    topics.forEach((T) => {
      const same = ranked.filter((x) => x.t === T.topic), need = T.need ? T.need.slice() : null, got = [], cap = Math.ceil(T.k / 3);
      let r = T.k, nP = 0;
      const useLv = (x) => { if (need && lvN(x)) need[lvN(x) - 1] = Math.max(0, need[lvN(x) - 1] - 1); };
      const fit = (x) => (need ? (lvN(x) ? need[lvN(x) - 1] : 0.5) : 0); // mức còn thiếu nhiều lấy trước; câu chưa ghi mức sau mức còn thiếu
      // --- theo đoạn (K4) ---
      while (r > 0 && nP < cap && same.some((x) => x.p && !used.has(x))) {
        const groups = {}, units = [];
        same.forEach((x) => { if (used.has(x)) return; if (x.p) (groups[x.p] = groups[x.p] || []).push(x); else units.push({ p: "", g: [x], size: 1, mean: x.w, inUse: 0 }); });
        Object.keys(groups).forEach((p) => { const g = groups[p]; units.push({ p, g, size: g.length, mean: g.reduce((a, x) => a + x.w, 0) / g.length, inUse: usedP.has(p) ? 1 : 0 }); });
        units.forEach((u) => (u.rnd = Math.random()));
        units.sort((a, b) => a.mean - b.mean || b.inUse - a.inUse || b.size - a.size || a.rnd - b.rnd);
        const top = units[0];
        if (!top.p) break; // câu lẻ ưu tiên hơn mọi đoạn còn lại: phần còn lại rút theo ô
        const group = units.filter((u) => u.p && u.mean === top.mean && u.inUse === top.inUse);
        const fitOf = (u) => (need ? [1, 2, 3].reduce((a, lv) => a + Math.min(need[lv - 1], u.g.filter((x) => x.q.lv === lv).length), 0) : 0);
        const pick = group.find((u) => u.size <= r) || group.slice().sort((a, b) => fitOf(b) - fitOf(a) || a.rnd - b.rnd)[0];
        let sel = pick.g.slice();
        if (sel.length > r) { // lấy một phần: câu theo mức còn thiếu, rồi điểm ưu tiên, rồi ngẫu nhiên
          const rest = sel, want = r; sel = [];
          while (sel.length < want) { rest.sort((a, b) => fit(b) - fit(a) || a.w - b.w); const x = rest.shift(); sel.push(x); useLv(x); }
        } else sel.forEach(useLv);
        sel.sort((a, b) => a.i - b.i).forEach((x) => { used.add(x); got.push(x); });
        r -= sel.length; nP++; usedP.add(pick.p);
      }
      // --- phần còn lại theo ô (K3) ---
      let cells = [];
      if (need) {
        // ô còn lại theo mức còn thiếu, bớt cho vừa số câu còn cần (đoạn đã lấy dư ở mức này thì bớt ở mức còn thiếu nhiều nhất)
        for (let s = need.reduce((a, n) => a + n, 0); s > r; s--) need[need.indexOf(Math.max(...need))]--;
        cells = [1, 2, 3].filter((lv) => need[lv - 1] > 0).map((lv) => ({ lv, n: need[lv - 1] }));
        const plan = [1, 2, 3].map((lv) => got.filter((x) => x.q.lv === lv).length + need[lv - 1]);
        if (plan.some((n, i) => Math.abs(n - T.need[i]) > 1)) notes.push(L.drawPsg(T.topic, plan.map((n, i) => (n === T.need[i] ? "" : L.lvDiff(L.lv[i + 1], n, T.need[i]))).filter(Boolean).join(", ")));
      } else if (r > 0) cells = [{ lv: 0, n: r }];
      // câu lẻ trước (theo điểm ưu tiên), câu còn lại của các đoạn chỉ khi câu lẻ không đủ: câu hay sai của một đoạn được rút theo đoạn, không tách lẻ
      const rest = same.filter((x) => !used.has(x)).sort((a, b) => (a.p ? 1 : 0) - (b.p ? 1 : 0) || a.w - b.w);
      cells.forEach((c) => {
        let g = take(c.lv ? rest.filter((x) => x.q.lv === c.lv) : rest, c.n);
        if (g.length < c.n && c.lv) {
          const near = rest.filter((x) => x.q.lv !== c.lv).sort((a, b) => dist(a.q, c.lv) - dist(b.q, c.lv));
          const more = take(near, c.n - g.length);
          if (more.length) notes.push(L.drawLv(T.topic, more.length, L.lv[c.lv], [...new Set(more.map((x) => (LV[x.q.lv] ? L.lvOf(L.lv[x.q.lv]) : L.noLv)))].join(", ")));
          g = g.concat(more);
        }
        if (g.length < c.n) {
          const more = take(ranked.filter((x) => x.t !== T.topic), c.n - g.length);
          if (more.length) notes.push(L.drawOther(T.topic, more.length));
          g = g.concat(more);
        }
        if (g.length < c.n) notes.push(L.drawShort(T.topic, c.n - g.length));
        g.forEach((x) => { if (x.p) usedP.add(x.p); }); // đoạn có câu được lấy ở đây cũng tính là đã rút (chủ đề sau ưu tiên câu của nó khi bằng điểm)
        got.push(...g);
      });
      out.push(...got.map((x) => x.q));
    });
    return { questions: out, notes };
  }

  /* ---------------- chấm ---------------- */
  function prep(q, L) {
    // mã câu tính trên câu gốc (đúng/sai thêm o khi dựng, theo ngôn ngữ L); orig: câu gốc, để "Ôn lại câu sai" dựng lại từ đầu
    const x = Object.assign({ key: key(q), orig: q }, q);
    if (q.type === "mc") { x.order = shuffle(q.o.map((_, i) => i)); x.a = 0; }
    if (q.type === "tf") { x.o = [L.tfYes, L.tfNo]; x.order = [0, 1]; x.a = q.a ? 0 : 1; }
    if (q.type === "match") x.rOrder = mix(q.r.length);
    if (q.type === "order") x.pOrder = mix(q.o.length);
    return x;
  }
  // Đơn vị in ngay sau chỗ trống ("___ kg", "___ cây.", "___°"); học sinh hay gõ kèm nó vào ô.
  const fold = (s) => s.normalize("NFD").replace(/\p{M}/gu, "").replace(/đ/gi, "d").toLowerCase().replace(/2/g, "²").replace(/3/g, "³");
  const unitAfter = (q) => { const w = ((String(q.q).split("___")[1] || "").trim().split(/\s+/)[0] || "").normalize("NFC").replace(/[.,;:!?]+$/, ""); return /^[\p{L}°²³]+$/u.test(w) ? w.toLowerCase() : ""; };
  /* Đáp án và chữ gõ đều là số (L31): có dấu chấm hoặc dấu phẩy thì so giá trị, đọc như câu trả lời bằng số (numVals), nên dấu phẩy
     hay dấu chấm thập phân đều đúng ("1,25", "1.25" với đáp án 1,25), còn "2.5" không đúng với đáp án 25. Chữ viết mơ hồ ("1.200")
     có hai cách đọc, trùng một cách là đúng. Chỉ có chữ số (và khoảng trắng), hoặc không đọc được thành một số (dãy "1, 2, 3, 6"),
     thì so chữ như trước (numKey): "1 200" đúng với "1200", "05" không đúng với 5. */
  const sameNum = (a, c) => {
    const va = /[.,]/.test(a + c) ? numVals(a) : [], vc = va.length ? numVals(c) : [];
    return vc.length ? vc.some((v) => va.some((w) => Math.abs(v - w) < 1e-9)) : numKey(a) === numKey(c);
  };
  /* Đáp án là phân số, hỗn số ("3/4", "-3/4", "3 1/2"; L32): bỏ khoảng trắng quanh "/" ở cả đáp án và chữ gõ rồi so chữ, nên
     "3 / 4" đúng với "3/4", "3 1 / 2" đúng với "3 1/2"; "6/8" vẫn sai với "3/4" (câu bắt viết phân số tối giản). */
  const isFrac = (s) => /^[-−–]?\s*(\d+\s+)?\d+\s*\/\s*\d+$/.test(String(s).trim());
  const fracT = (s) => normT(s).replace(/\s*\/\s*/g, "/");
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
    return cands.some((c) => q.ans.some((a) => (isNum(a) && isNum(c)) ? sameNum(a, c) : isFrac(a) ? fracT(a) === fracT(c) : normT(a) === normT(c)));
  }
  /* Trả lời ngắn bằng số: các cách đọc của số học sinh gõ. Dấu phẩy thập phân kiểu Việt Nam ("12,5", "1.000,5"), dấu chấm
     thập phân ("12.5"), phân số ("3/4"), hỗn số ("1 1/2"), số âm ("-2", "(-2)"), gõ kèm đơn vị của câu. Số viết mơ hồ ("1.000",
     "1,000") thì nhận cả hai cách đọc. */
  function numVals(g, unit) {
    let t = String(g).normalize("NFC").trim().replace(/[−–]/g, "-");
    if (unit) { const m = /^(.*\d)\s*(\D+?)\.?$/u.exec(t); if (m && fold(m[2].trim()) === fold(unit)) t = m[1]; }
    t = t.replace(/\.$/, "");
    const out = [];
    /* Hỗn số "a b/c" (L32): a + b/c, dấu trừ áp cho cả số ("-1 1/2" là −1,5), có thể trong ngoặc. Đọc trước khi bỏ khoảng trắng,
       nên "1 1/2" không còn là 11/2. Phần trước "/" viết được như số ngăn hàng nghìn ("1 200/3") thì nhận cả cách đọc 1 200 phần 3. */
    const h = /^(-?)\s*(\d+)\s+(\d+)\s*\/\s*(\d+)$/.exec(t.trim().replace(/^\(\s*(.+?)\s*\)$/, "$1"));
    if (h && +h[4]) out.push((h[1] ? -1 : 1) * (+h[2] + h[3] / h[4]));
    if (h && !(h[2].length <= 3 && h[3].length === 3)) return out;
    t = t.replace(/\s+/g, "");
    const p = /^\((.+)\)$/.exec(t); if (p) t = p[1];
    const f = /^(-?)(\d+)\/(\d+)$/.exec(t);
    if (f && +f[3]) out.push((f[1] ? -1 : 1) * f[2] / f[3]);
    if (/^-?\d{1,3}(\.\d{3})+(,\d+)?$/.test(t) || /^-?\d+(,\d+)?$/.test(t)) out.push(+t.replace(/\./g, "").replace(",", "."));
    if (/^-?\d{1,3}(,\d{3})+(\.\d+)?$/.test(t) || /^-?\d+\.\d+$/.test(t)) out.push(+t.replace(/,/g, ""));
    return out.filter(Number.isFinite);
  }
  /* Đáp án của câu trả lời bằng số: một số, hoặc phân số là chuỗi "a/b" ("2/3", "-3/4"; L29). Chấm theo giá trị nên 0,75 hay 6/8
     cũng đúng với đáp án "3/4"; chỗ hiện đáp án (correctText) ghi đúng "2/3", không làm tròn. */
  const numAns = (q) => (typeof q.ans === "number" ? [q.ans] : numVals(q.ans));
  /* Điểm của một câu, từ 0 đến 1. Câu đúng/sai 4 ý: đúng 1/2/3/4 ý được 0,1/0,25/0,5/1. Nối cột: theo số cặp nối đúng.
     Sắp xếp: đúng cả thứ tự mới được điểm. Tự luận: 0 (tự chấm riêng). */
  function score(q, g) {
    if (g == null || g === "") return 0;
    switch (q.type) {
      case "fill": return fillRight(q, g) ? 1 : 0;
      case "num": { const a = numAns(q); return numVals(g, q.unit).some((v) => a.some((x) => Math.abs(v - x) <= (+q.tol || 0) + 1e-9)) ? 1 : 0; }
      case "tf4": return Array.isArray(g) ? TF4_PTS[q.a.filter((a, i) => g[i] === a).length] : 0;
      case "match": return Array.isArray(g) ? q.l.filter((_, i) => g[i] === i).length / q.l.length : 0;
      case "order": return Array.isArray(g) && g.length === q.o.length && g.every((v, k) => v === k) ? 1 : 0;
      case "essay": return 0;
      default: return g === q.a ? 1 : 0;
    }
  }
  const isRight = (q, g) => score(q, g) === 1;
  // Chữ đáp án theo bảng chữ L (mặc định tiếng Việt: Quiz.text dùng cho bản chụp câu bị báo).
  const yn = (v, L) => (v == null ? "?" : v ? (L || TXT.vi).tfYes : (L || TXT.vi).tfNo);
  function correctText(q, L) {
    L = L || TXT.vi;
    switch (q.type) {
      case "fill": return q.ans[0];
      case "num": return (typeof q.ans === "number" ? fmtN(q.ans, L.lang) : String(q.ans).trim()) + (q.unit ? " " + q.unit : "") + (q.tol ? L.tol(fmtN(q.tol, L.lang)) : "");
      case "tf4": return q.a.map((v, i) => `${ABCD[i]}) ${yn(v, L)}`).join("; ");
      case "match": return q.l.map((l, i) => `${l} → ${q.r[i]}`).join("; ");
      case "order": return q.o.join(" → ");
      default: return q.o[q.a];
    }
  }
  function givenText(q, g, L) {
    L = L || TXT.vi;
    if (g == null || g === "") return L.blank;
    switch (q.type) {
      case "fill": case "num": return String(g);
      case "tf4": return g.map((v, i) => `${ABCD[i]}) ${yn(v, L)}`).join("; ");
      case "match": return q.l.map((l, i) => `${l} → ${g[i] == null ? "?" : q.r[g[i]]}`).join("; ");
      case "order": return g.map((k) => q.o[k]).join(" → ");
      default: return q.o[g];
    }
  }
  /* Thang tự chấm: mỗi ý chọn Chưa có (0), Một phần (nửa số điểm, khi chia được thành phần tư điểm) hoặc Đủ. */
  const levels = (p, L) => [[0, L.lvNone]].concat(Math.round(p * 2) === p * 2 && p >= 0.5 ? [[p / 2, L.lvPart]] : [], [[p, L.lvFull]]);
  const rubricMax = (q) => q.rubric.reduce((a, c) => a + c.p, 0);

  /* ---------------- báo câu sai (Phiên R1) ----------------
     REASONS: mã lí do lưu trong báo cáo (cả hai kho, bảng question_reports) và chữ hiện trên nút.
     text(q): bản chụp nội dung câu để người làm đề biết câu nào bị báo kể cả khi đề đã sửa: câu hỏi, các ô (trắc nghiệm:
     ✓ đáp án đúng, – các ô sai), đáp án hoặc gợi ý; tối đa 500 kí tự. Nhận câu gốc lẫn câu đã dựng (prep: câu đúng/sai có a = 0
     khi Đúng). Luôn ghi tiếng Việt, kể cả câu của đề Tiếng Anh: là dữ liệu cho người làm đề, không phải chữ trên màn hình. */
  const REASONS = Object.entries(TXT.vi.reasons);
  // biểu tượng đồng hồ trên chip thời gian còn lại (X7)
  const CLOCK = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>`;
  const FLAG = `<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 21V4h12l-2.5 4.5L17 13H5"/></svg>`;
  function text(q) {
    let s = String(q.q == null ? "" : q.q);
    if (q.type === "mc") s += " · " + (q.o || []).map((o, i) => (i ? "– " : "✓ ") + o).join(" · ");
    else if (q.type === "tf") s += " · Đáp án: " + yn(typeof q.a === "boolean" ? q.a : q.a === 0);
    else if (q.type === "essay") s += q.x ? " · Gợi ý: " + q.x : "";
    else if (q.type) s += " · Đáp án: " + correctText(q);
    s = s.replace(/\s+/g, " ").trim();
    return s.length > 500 ? s.slice(0, 499) + "…" : s;
  }

  const run = (el, bank, opts) => start(el, bank, opts, {});
  /* retry (UX1, "Ôn lại câu sai"): lượt ôn luyện chỉ gồm các câu sai của lượt trước, không gọi onFinish (không lưu điểm);
     h.full, h.opts0: đề và tùy chọn của lượt đầy đủ, để "Làm lại cả đề" quay về đề đầy đủ (cùng cách làm). */
  function start(el, bank, opts, h, retry) {
    const exam = opts.mode === "exam";
    h.exam = exam; h.retry = !!retry;
    if (!retry) { h.full = bank; h.opts0 = opts; }
    // Ngôn ngữ của màn làm bài (TA2): opts.lang, mặc định theo môn của đề (Quiz.lang). N: số theo ngôn ngữ; LANG: lang="en" cho khung.
    const lang = TXT[opts.lang] ? opts.lang : langOf(bank), L = TXT[lang], N = (x) => fmtN(x, lang), ttl = title(bank, lang), LANG = lang === "en" ? ' lang="en"' : "";
    // Dòng nhãn trên câu (UX1): "môn · chủ đề", dạng phức tạp ghi thêm cách làm. Đề Tiếng Anh ghi môn bằng tiếng Anh; đề không ghi môn thì tên đề.
    const subj = bank.subject ? (lang === "en" && EN_SUBJECTS.includes(foldS(bank.subject)) ? L.english : bank.subject) : ttl;
    const INSTR = { tf4: L.tf4Label, match: L.matchLabel, order: L.orderLabel, essay: L.essayLabel };
    const passages = bank.passages || {};
    // Câu dùng chung một đoạn đọc đứng liền nhau, giữ thứ tự trong đề; các nhóm và câu lẻ thì xáo.
    const units = [], seenP = {};
    (bank.questions || []).forEach((q) => {
      if (q.p && passages[q.p]) { if (!seenP[q.p]) units.push((seenP[q.p] = [])); seenP[q.p].push(q); } else units.push([q]);
    });
    const qs = shuffle(units).flat().map((q) => prep(q, L));
    const S = { i: 0, ans: [], cur: null, checked: false, start: Date.now(), limit: exam && bank.minutes ? bank.minutes * 60 : 0, timer: null, done: false, psgOpen: {}, self: {} };
    const answered = () => S.ans.filter((a) => a && (a.done || (a.g != null && a.g !== ""))).length;
    // đồng hồ (X7): "Còn 12:30"; còn dưới 2 phút thì chip đổi màu (.warn)
    const remain = () => S.limit - (Date.now() - S.start) / 1000;
    if (S.limit) S.timer = setInterval(() => { const s = remain(), t = el.querySelector("#qzTimer"); if (t) { t.lastElementChild.textContent = L.timeLeft(fmtTime(s)); t.classList.toggle("warn", s < 120); } if (s <= 0) finish(); }, 500);

    function passageHtml(id) {
      const p = passages[id], open = S.psgOpen[id] !== false, n = qs.filter((x) => x.p === id).length;
      return `<details class="psg" data-p="${esc(id)}"${open ? " open" : ""}><summary><span class="grow"><b>${nbNum(esc(p.title || L.psgTitle))}</b><span class="small muted">${L.psgFor(n)}</span></span><span class="psg-t small">${open ? L.psgHide : L.psgShow}</span></summary>
        <div class="psg-body">${p.text ? `<div class="psg-text">${nbNum(esc(p.text))}</div>` : ""}${fig(p.svg)}</div></details>`;
    }
    function body(q) {
      const qcls = "qtext" + (String(q.q).length > 160 ? " long" : ""); // đoạn văn đọc hiểu dài: chữ thường, dễ đọc hơn
      const stem = `<div class="${qcls}">${nbNum(esc(q.q))}</div>${fig(q.svg)}`;
      switch (q.type) {
        case "fill": {
          const parts = nbNum(esc(q.q)).split("___");
          // mọi đáp án là số không âm: mở bàn phím số trên điện thoại (UX1). Có đáp án âm (L30): bàn phím số thập phân của iPhone
          // không có dấu trừ, nên dùng bàn phím thường và nhắc cách gõ dưới câu, như bài ôn dạng trang.
          const neg = (q.ans || []).some(isNeg), numeric = (q.ans || []).length && q.ans.every(isNum) && !neg;
          return `<div class="${qcls}">${parts[0]}<input class="blank" id="qzFill" autocomplete="off" spellcheck="false" aria-label="${L.fillAria}"${numeric ? ' inputmode="decimal"' : ""}>${parts.slice(1).join("___")}</div>${fig(q.svg)}${neg ? `<p class="small muted">${L.negHint}</p>` : ""}`;
        }
        case "num":
          // bàn phím số thập phân của iPhone không có "-" và "/": nút ± và nút "/" (L29) cạnh ô; nút "/" có ở mọi câu, để không lộ đáp án là phân số
          return `${stem}
            <div class="num-row"><button type="button" class="btn ghost" id="qzSign" aria-label="${L.numSign}">±</button><button type="button" class="btn ghost" id="qzSlash" aria-label="${L.numSlash}">/</button><input class="num-in" id="qzNum" inputmode="decimal" autocomplete="off" spellcheck="false" aria-label="${L.numAria}">${q.unit ? `<span class="num-unit">${esc(q.unit)}</span>` : ""}</div>
            <p class="small muted">${L.numHint}</p>`;
        case "tf4":
          return `${stem}
            <div class="tf4">${q.o.map((s, i) => `<div class="tf4-row" data-i="${i}"><div class="tf4-s"><b>${ABCD[i]})</b> ${nbNum(esc(s))}</div>
              <div class="tf4-b" role="group" aria-label="${L.tf4Group(ABCD[i])}"><button type="button" class="opt" data-i="${i}" data-v="1" aria-pressed="false">${L.tfYes}</button><button type="button" class="opt" data-i="${i}" data-v="0" aria-pressed="false">${L.tfNo}</button></div></div>`).join("")}</div>`;
        case "match":
          return `${stem}
            <div class="mt-l">${q.l.map((s, i) => `<button type="button" class="mt-li" data-i="${i}"><span class="k">${i + 1}</span><span class="grow"><span>${nbNum(esc(s))}</span><span class="mt-to small"></span></span></button>`).join("")}</div>
            <div class="label" id="qzHint" aria-live="polite"></div>
            <div class="mt-r">${q.rOrder.map((ri, k) => `<button type="button" class="opt mt-ri" data-r="${ri}"><span class="k">${LET[k]}</span><span class="grow">${nbNum(esc(q.r[ri]))}</span><span class="mt-n"></span></button>`).join("")}</div>`;
        case "order":
          return `${stem}
            <div class="label">${L.orderYours}</div><ol class="ord-seq" id="qzSeq"></ol>
            <div class="label" id="qzHint" aria-live="polite"></div>
            <div class="ord-pool">${q.pOrder.map((k) => `<button type="button" class="opt ord-p" data-k="${k}">${nbNum(esc(q.o[k]))}</button>`).join("")}</div>`;
        case "essay":
          return `${stem}
            <textarea class="essay-in" id="qzEssay" aria-label="${L.essayAria}" placeholder="${L.essayPh}"></textarea>
            <p class="small muted">${L.essayNote} ${exam ? L.essayExam : L.essayPractice}</p>`;
        default: {
          const wide = q.o.some((o) => String(o).length > 22);
          return `${stem}
            <div class="opts${wide ? " wide" : ""}">${q.order.map((oi, k) => `<button class="opt" data-o="${oi}"><span class="k">${LET[k]}</span><span>${nbNum(esc(q.o[oi]))}</span></button>`).join("")}</div>`;
        }
      }
    }
    const blank = (q) => (q.type === "tf4" ? [null, null, null, null] : q.type === "match" ? q.l.map(() => null) : q.type === "order" ? [] : q.type === "fill" || q.type === "num" || q.type === "essay" ? "" : null);
    const filled = (q, c) => (q.type === "tf4" || q.type === "match" ? c.every((v) => v != null) : q.type === "order" ? c.length === q.o.length : q.type === "essay" ? true : c != null && String(c).trim() !== "");
    const NEED = { tf4: L.needTf4, match: L.needMatch, order: L.needOrder };
    function rubricHtml(i) {
      const q = qs[i], picks = S.self[i] || (S.self[i] = q.rubric.map(() => null));
      return `<div class="rubric" data-q="${i}"><div class="label">${L.rubricHead(N(rubricMax(q)), rubricMax(q))}</div>
        ${q.rubric.map((c, j) => `<div class="rb-row"><div>${nbNum(esc(c.c))} <span class="small muted">${L.rubricPts(N(c.p), c.p)}</span></div>
          <div class="rb-b" role="group" aria-label="${esc(c.c)}">${levels(c.p, L).map(([v, nm]) => `<button type="button" class="opt" data-j="${j}" data-v="${v}" aria-pressed="${picks[j] === v}"><span>${nm}</span><b>${N(v)}</b></button>`).join("")}</div></div>`).join("")}
        <div class="rb-sum" aria-live="polite">${sumText(i)}</div></div>`;
    }
    function selfSum(i) { const p = S.self[i]; return p && p.every((v) => v != null) ? { got: p.reduce((a, v) => a + v, 0), max: rubricMax(qs[i]) } : null; }
    function sumText(i) { const s = selfSum(i); return s ? L.selfSum(N(s.got), N(s.max), s.max) : L.selfPick; }
    /* Câu tự luận trong lịch sử câu (onMarks): 0 (sai) khi đã tự chấm đủ các ý mà được dưới một nửa số điểm, còn lại 1; chưa tự chấm
       thì không biết đúng sai nên không tính là sai. Ngưỡng là một nửa, không phải đủ điểm như câu chấm tự động: tự chấm "Một phần" ở
       một ý là thường gặp, lấy đủ điểm thì câu tự luận hay bị rút lại. */
    const essayMark = (i) => { const s = selfSum(i); return s && s.got * 2 < s.max ? 0 : 1; };
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
    const reportHtml = (q) => (!canReport ? "" : `<div class="rp"><button type="button" class="linkbtn rp-link" data-k="${esc(q.key)}" aria-expanded="false"${reportedQ(q) ? " disabled" : ""}>${FLAG}<span>${reportedQ(q) ? L.rpDone : L.rpLink}</span></button><div class="rp-area"></div></div>`);
    function wireReport(root) {
      if (!canReport) return;
      root.querySelectorAll(".rp-link").forEach((btn) => (btn.onclick = () => {
        const q = qs.find((x) => x.key === btn.dataset.k), area = btn.nextElementSibling;
        if (!q || btn.disabled) return;
        const close = () => { area.innerHTML = ""; btn.setAttribute("aria-expanded", "false"); };
        if (area.firstChild) { close(); return; }
        btn.setAttribute("aria-expanded", "true");
        area.innerHTML = `<form class="report-box" autocomplete="off"><b>${L.rpHead}</b>
          <div class="rsn" role="group" aria-label="${L.rpReason}">${REASONS.map(([k]) => `<button type="button" class="opt" data-r="${k}" aria-pressed="false"><span>${L.reasons[k]}</span></button>`).join("")}</div>
          <label class="field"><span>${L.rpNote} <span class="opt-note">${L.rpNoteOpt}</span></span><textarea class="report-note" maxlength="200" rows="3" placeholder="${L.rpNotePh}"></textarea></label>
          <div class="rp-err" aria-live="assertive"></div>
          <div class="row"><button type="submit" class="btn main sm">${L.rpSend}</button><button type="button" class="btn ghost sm rp-no">${L.rpCancel}</button></div></form>`;
        const form = area.firstElementChild, err = form.querySelector(".rp-err"), btns = () => form.querySelectorAll("button");
        let reason = "";
        form.querySelectorAll(".rsn .opt").forEach((b) => (b.onclick = () => { reason = b.dataset.r; form.querySelectorAll(".rsn .opt").forEach((x) => x.setAttribute("aria-pressed", x === b)); err.innerHTML = ""; }));
        form.querySelector(".rp-no").onclick = close;
        form.onsubmit = async (ev) => {
          ev.preventDefault();
          if (!reason) { err.innerHTML = `<div class="fb bad">${L.rpNeed}</div>`; return; }
          const note = form.querySelector(".report-note").value.trim().slice(0, 200);
          btns().forEach((b) => (b.disabled = true));
          try {
            await opts.onReport(q, { reason, note });
            h.reported.add(q.key);
            area.innerHTML = `<div class="fb ok rp-done">${L.rpThanks}</div>`;
            btn.disabled = true; btn.setAttribute("aria-expanded", "false"); btn.querySelector("span").textContent = L.rpDone;
          } catch (e) {
            if (!form.isConnected) return;
            // đề Tiếng Anh: lỗi do kho trả về là tiếng Việt, thay bằng một câu chung tiếng Anh
            err.innerHTML = `<div class="fb bad">${esc((lang === "vi" && e && e.message) || L.rpFail)}</div>`;
            btns().forEach((b) => (b.disabled = false));
          }
        };
        form.querySelector(".rsn .opt").focus({ preventScroll: true });
        area.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }));
    }

    function render() {
      const q = qs[S.i]; S.cur = blank(q); S.checked = false;
      el.innerHTML = `<div class="stack"${LANG}>
        <div class="row between qz-top">${exam ? "" : `<button class="linkbtn" id="qzExit">${L.exit}</button>`}
          <div class="row">${S.limit ? `<span class="chip timer${remain() < 120 ? " warn" : ""}" id="qzTimer" role="timer" aria-label="${L.timeAria}">${CLOCK}<span>${L.timeLeft(fmtTime(remain()))}</span></span>` : ""}<span class="chip" id="qzProg">${L.progress(S.i + 1, qs.length)}</span></div>
          ${exam ? `<button class="btn ghost sm" id="qzSubmit">${L.submit}</button>` : ""}</div>
        <div class="bar" aria-hidden="true"><i style="width:${(S.i / qs.length) * 100}%"></i></div>
        ${q.p && passages[q.p] ? passageHtml(q.p) : ""}
        <section class="qcard">
          <div class="label">${nb(nbNum(esc([subj, q.topic, INSTR[q.type]].filter(Boolean).join(" · "))))}</div>
          ${body(q)}
          <div id="qzFb" aria-live="polite"></div>
        </section>
        <div class="row between qz-nav"><button class="btn ghost" id="qzSkip">${L.skip}</button><button class="btn main" id="qzGo">${exam ? L.answer : q.type === "essay" ? L.seeGuide : L.check}</button></div>
      </div>`;
      const $ = (s) => el.querySelector(s), $$ = (s) => el.querySelectorAll(s), go = $("#qzGo"), fb = $("#qzFb");
      const ps = $(".psg");
      if (ps) ps.addEventListener("toggle", () => { S.psgOpen[ps.dataset.p] = ps.open; ps.querySelector(".psg-t").textContent = ps.open ? L.psgHide : L.psgShow; });
      if (q.type === "mc" || q.type === "tf") $$(".opt").forEach((b) => (b.onclick = () => { if (S.checked) return; $$(".opt").forEach((x) => x.classList.remove("sel")); b.classList.add("sel"); S.cur = +b.dataset.o; }));
      const inp = $("#qzFill") || $("#qzNum");
      if (inp) { inp.oninput = () => (S.cur = inp.value); inp.onkeydown = (e) => { if (e.key === "Enter") go.click(); }; setTimeout(() => inp.focus({ preventScroll: true }), 50); }
      if ($("#qzSign")) $("#qzSign").onclick = () => { if (S.checked) return; const v = inp.value.trim(); inp.value = /^[-−–]/.test(v) ? v.replace(/^[-−–]\s*/, "") : "-" + v; S.cur = inp.value; inp.focus({ preventScroll: true }); };
      // nút "/" (L29): thêm "/" vào chỗ con trỏ (ô đã có "/" thì thôi), rồi trả focus về ô như nút ±
      if ($("#qzSlash")) $("#qzSlash").onclick = () => {
        if (S.checked) return;
        const v = inp.value, a = inp.selectionStart == null ? v.length : inp.selectionStart, b = inp.selectionEnd == null ? a : inp.selectionEnd;
        inp.focus({ preventScroll: true });
        if (v.includes("/")) return;
        inp.value = v.slice(0, a) + "/" + v.slice(b); inp.setSelectionRange(a + 1, a + 1); S.cur = inp.value;
      };
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
          if (!S.checked) b.querySelector(".mt-to").textContent = k < 0 ? L.mtNone : `→ ${LET[k]}. ${nbNum(q.r[ri])}`;
        });
        $$(".mt-ri").forEach((b) => { const i = S.cur.indexOf(+b.dataset.r); b.classList.toggle("sel", i >= 0); b.querySelector(".mt-n").textContent = i >= 0 ? L.mtItem(i + 1) : ""; });
        if (!S.checked) $("#qzHint").textContent = act == null ? L.mtDone : L.mtPick(act + 1);
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
        $("#qzSeq").innerHTML = S.cur.map((k, n) => `<li><button type="button" class="opt ord-s" data-k="${k}"${S.checked ? " disabled" : ` aria-label="${L.ordRemove(n + 1, esc(q.o[k]))}"`}><span class="k">${n + 1}</span><span class="grow">${nbNum(esc(q.o[k]))}</span>${S.checked ? "" : `<span aria-hidden="true">✕</span>`}</button></li>`).join("")
          + (S.cur.length < q.o.length ? `<li class="ord-empty">${S.cur.length + 1}</li>` : "");
        $$(".ord-p").forEach((b) => (b.hidden = S.cur.includes(+b.dataset.k)));
        $("#qzHint").textContent = S.cur.length < q.o.length ? L.ordTap(S.cur.length + 1) : L.ordDone;
        $$(".ord-s").forEach((b) => (b.onclick = () => { if (S.checked) return; S.cur = S.cur.filter((k) => k !== +b.dataset.k); paintOrder(); }));
      };
      if (q.type === "order") { $$(".ord-p").forEach((b) => (b.onclick = () => { if (S.checked) return; S.cur.push(+b.dataset.k); paintOrder(); })); paintOrder(); }

      $(exam ? "#qzSubmit" : "#qzExit").onclick = confirmExit; // làm như thi: nút "Nộp bài" (X6), vẫn hỏi lại như "← Thoát"
      $("#qzSkip").onclick = () => { S.ans[S.i] = { q, g: null, ok: false, pts: 0 }; next(); };
      go.onclick = () => {
        if (S.checked) { next(); return; }
        if (!filled(q, S.cur)) { fb.innerHTML = `<div class="fb bad">${NEED[q.type] || L.needAnswer}${L.needTail}</div>`; return; }
        // sau Kiểm tra (X8): ẩn hẳn "Bỏ qua", "Câu tiếp" (hoặc "Xem kết quả") đứng một mình bên phải
        const done = () => { S.checked = true; go.textContent = S.i + 1 < qs.length ? L.next : L.seeResults; $("#qzSkip").hidden = true; };
        if (q.type === "essay") {
          S.ans[S.i] = { q, g: S.cur.trim(), done: true };
          if (exam) { next(); return; }
          $("#qzEssay").readOnly = true;
          fb.innerHTML = `<div class="expl pre"><b>${L.guide}</b> ${nbNum(esc(q.x || L.noGuide))}</div>${rubricHtml(S.i)}${reportHtml(q)}`;
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
          msg = k === 4 ? L.tf4All : L.tf4Part(k, N(pts));
        }
        if (q.type === "match") {
          paintMatch();
          $$(".mt-li").forEach((b) => { const i = +b.dataset.i, ok = g[i] === i; b.classList.add(ok ? "right" : "wrong"); b.disabled = true;
            b.querySelector(".mt-to").textContent = nbNum((ok ? "→ " : L.mtWrong(q.r[g[i]])) + q.r[i]); });
          $$(".mt-ri").forEach((b) => (b.disabled = true));
          $("#qzHint").textContent = "";
          const k = q.l.filter((_, i) => g[i] === i).length;
          msg = k === q.l.length ? L.mtAll : L.mtPart(k, q.l.length, N(pts));
        }
        if (q.type === "order") {
          paintOrder();
          $$(".ord-s").forEach((b, n) => b.classList.add(+b.dataset.k === n ? "right" : "wrong"));
          $("#qzHint").textContent = "";
        }
        if (inp) inp.readOnly = true;
        const ans = q.type === "order" ? `<ol class="ord-ans">${q.o.map((s) => `<li>${nbNum(esc(s))}</li>`).join("")}</ol>` : q.type === "tf4" || q.type === "match" ? "" : `<span>${L.ansLabel} <b>${nbNum(esc(correctText(q, L)))}</b></span>`;
        fb.innerHTML = (pts === 1 ? `<div class="fb ok">${msg || L.right}</div>` : `<div class="fb bad">${msg || L.wrong}${ans ? ` ${q.type === "order" ? `<span>${L.ordRight}</span>` : ""}${ans}` : ""}</div>`) + (q.x ? `<div class="expl">${nbNum(esc(q.x))}</div>` : "") + reportHtml(q);
        wireReport(fb);
      };
      window.scrollTo(0, 0);
    }
    function confirmExit() {
      const fb = el.querySelector("#qzFb"), none = !answered();
      const [ask, yes] = none ? L.exNone : h.retry ? L.exRetry : exam ? L.exExam : L.exPractice;
      fb.innerHTML = `<div class="confirm"><div>${ask}</div><div class="row"><button class="btn danger" id="qzYes">${yes}</button><button class="btn ghost" id="qzNo">${L.keepGoing}</button></div></div>`;
      fb.querySelector("#qzYes").onclick = none ? () => { h.stop(); ended(); if (opts.onExit) opts.onExit(); } : finish;
      fb.querySelector("#qzNo").onclick = () => (fb.innerHTML = "");
      // hộp hỏi nằm cuối thẻ câu hỏi: câu dài (đoạn đọc, nối cột…) thì cuộn tới để thấy ngay sau khi bấm nút trên cùng (X6)
      fb.querySelector("#qzNo").focus({ preventScroll: true });
      fb.firstElementChild.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
    function next() { S.i++; if (S.i >= qs.length) finish(); else render(); }
    // lượt làm đã xong (X5): app bỏ chế độ tập trung, thanh trên có lại đủ
    function ended() { if (opts.onEnd) opts.onEnd(); }
    // Làm lại: cả đề (h.full), cùng bộ câu (xáo lại); đề ngẫu nhiên (redraw) thì rút bộ câu mới. Sau lượt ôn lại câu sai: về đề đầy đủ, cùng cách làm.
    const againTxt = h.opts0.redraw ? L.newTest : L.again;
    const again = () => start(el, h.opts0.redraw ? Object.assign({}, h.full, h.opts0.redraw()) : h.full, h.opts0, h);
    // Ôn lại câu sai (UX1): lượt ôn luyện chỉ gồm các câu gốc của các câu sai, không lưu điểm.
    const retryWith = (list) => () => start(el, Object.assign({}, h.full, { questions: list.map((a) => a.q.orig || a.q) }), Object.assign({}, h.opts0, { mode: "practice" }), h, true);
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
      ended();
      if (!answered()) {
        el.innerHTML = `<div class="stack"${LANG}>
          <section class="panel"><div class="label">${nb(nbNum(`${esc(ttl)} · ${h.retry ? L.retryHead : exam ? L.modeExam : L.modePractice}`))}</div><p>${L.noneDone}</p></section>
          <div class="row"><button class="btn main" id="qzAgain">${againTxt}</button><button class="btn ghost" id="qzHome">${L.home}</button></div></div>`;
        el.querySelector("#qzAgain").onclick = again;
        el.querySelector("#qzHome").onclick = () => opts.onExit && opts.onExit();
        window.scrollTo(0, 0);
        return;
      }
      if (exam) for (let i = 0; i < qs.length; i++) if (!S.ans[i]) S.ans[i] = { q: qs[i], g: null, ok: false, pts: 0 };
      const idx = range(qs.length).filter((i) => S.ans[i]);
      const auto = idx.filter((i) => qs[i].type !== "essay").map((i) => Object.assign({ n: i + 1 }, S.ans[i])); // n: số thứ tự câu trong lượt này
      // Tự luận: ôn luyện thì các câu đã xem gợi ý; làm như thi thì mọi câu (có thể đã viết ra giấy).
      const essays = idx.filter((i) => qs[i].type === "essay" && (exam || S.ans[i].done));
      const right = r2(auto.reduce((a, x) => a + (x.pts || 0), 0)), total = auto.length;
      const secs = Math.min((Date.now() - S.start) / 1000, S.limit || Infinity);
      const wrong = auto.filter((a) => (a.pts || 0) < 1);
      const byTopic = {}, byLv = {};
      auto.forEach((a) => { const k = a.q.topic || "Chung"; byTopic[k] = byTopic[k] || [0, 0]; byTopic[k][1]++; byTopic[k][0] += a.pts || 0; });
      auto.forEach((a) => { if (LV[a.q.lv]) { byLv[a.q.lv] = byLv[a.q.lv] || [0, 0]; byLv[a.q.lv][1]++; byLv[a.q.lv][0] += a.pts || 0; } });
      // Lần trước cùng đề (UX1): đọc trước khi lưu lượt này. Lượt ôn lại câu sai không so, không lưu.
      const prev = !h.retry && typeof opts.previous === "function" ? opts.previous() : null;
      const saved = !exam && !h.retry ? saveSelf(essays) : null; // ôn luyện: chấm ngay sau từng câu, lưu luôn
      if (total && !h.retry && opts.onFinish) opts.onFinish({ r: right, t: total, s: Math.round(secs), mode: exam ? "exam" : "practice", wrongTopics: wrong.map((a) => a.q.topic || "Chung") });
      // lịch sử câu: câu chấm tự động và câu tự luận đã làm (ôn luyện: đã xem gợi ý; làm như thi: đã trả lời), kể cả lượt chỉ có câu
      // tự luận (không có phần chấm tự động để lưu)
      if (!h.retry && opts.onMarks) opts.onMarks(auto.map((a) => [a.q.key, a.pts || 0]).concat(essays.filter((i) => S.ans[i].done).map((i) => [qs[i].key, essayMark(i)])));
      const d10n = total ? Math.round((right / total) * 40) / 4 : 0, d10 = N(d10n);
      const bars = (o, name) => `<div class="ubreak">${Object.entries(o).map(([k, [r, t]]) => `<span>${nbNum(esc(name(k)))}</span><div class="bar"><i style="width:${(r / t) * 100}%"></i></div><span>${N(r)}/${t}</span>`).join("")}</div>`;
      const part = auto.some((a) => a.pts > 0 && a.pts < 1);
      // lời khen theo điểm (opts.name: tên học sinh; xem thử thì không có tên) và so với lần trước
      const praise = total ? L.praise(d10n, opts.name ? ", " + esc(opts.name) : "") : "";
      let cmp = "";
      if (prev && prev.t > 0 && total) {
        const ps = `${N(prev.r)}/${prev.t}`, d = r2(right - prev.r);
        cmp = prev.t !== total ? `<span class="tag">${L.cmpPrev(ps)}</span>` : d > 0 ? `<span class="tag ioe">${L.cmpMore(N(d), ps)}</span>` : d < 0 ? `<span class="tag warn">${L.cmpLess(N(-d), ps)}</span>` : `<span class="tag">${L.cmpSame(ps)}</span>`;
      }
      // theo chủ đề: chỉ hiện chủ đề cần ôn thêm, cả bảng thu gọn trong "Xem cả N chủ đề"
      const topicName = (k) => (k === "Chung" ? L.topicGeneral : k), topics = Object.entries(byTopic), need = topics.filter(([, [r, t]]) => r < t), full = topics.length - need.length;
      const topicPanel = topics.length < 2 ? "" : `<section class="panel" id="qzTopics"><div class="label">${L.byTopic}</div>
          ${full ? `<p class="small">${need.length ? L.topicsOk(full, topics.length) : L.topicsAll(topics.length)}</p>` : ""}
          ${need.length ? bars(Object.fromEntries(need), topicName) : ""}
          ${full ? `<details class="small"><summary>${L.topicsShow(topics.length)}</summary>${bars(byTopic, topicName)}</details>` : ""}</section>`;
      // câu cần xem lại, thu gọn: bấm mới xem đáp án và lời giải
      const reviewPanel = !wrong.length ? "" : `<section class="panel" id="qzReview"><div class="label">${L.review(wrong.length)}</div><div class="review">${wrong.map((a) => `<details class="rv"><summary><span class="grow"><span><span class="rv-n">${L.qN(a.n)}</span> · ${nbNum(esc(a.q.q)).replace("___", "…")}${LV[a.q.lv] ? ` <span class="tag">${L.lv[a.q.lv]}</span>` : ""}</span><span class="small">${L.yourAns}<s>${nbNum(esc(givenText(a.q, a.g, L)))}</s>${a.pts > 0 ? L.gotPts(N(a.pts)) : ""} · ${L.rvTap}</span></span></summary>
          <div class="rv-body"><div class="small">${L.ansLabel} <b>${nbNum(esc(correctText(a.q, L)))}</b></div>${a.q.x ? `<div class="expl">${nbNum(esc(a.q.x))}</div>` : ""}${reportHtml(a.q)}</div></details>`).join("")}</div></section>`;
      const againAllTxt = h.opts0.redraw ? L.newTest : L.againAll;
      // chỗ trống để app ghi bài đã gửi cho bố mẹ chưa (bản đám mây, UX6); lượt không lưu điểm (ôn lại câu sai, xem thử) để trống
      const saved0 = `<p class="saved" id="qzSaved" hidden></p>`;
      const essayPanel = !essays.length ? "" : exam
        ? `<section class="panel" id="qzSelf"><div class="label">${L.essayHead(essays.length)}</div>
            <p class="small muted">${L.essayExamNote}</p>
            ${essays.map((i) => `<div class="self-q"><b>${nbNum(esc(qs[i].q))}</b>${S.ans[i].g ? `<div class="essay-done">${nbNum(esc(S.ans[i].g))}</div>` : ""}<div class="expl pre"><b>${L.guide}</b> ${nbNum(esc(qs[i].x || L.noGuide))}</div>${rubricHtml(i)}${reportHtml(qs[i])}</div>`).join("")}
            <div id="qzSelfArea"><div class="row"><button class="btn main" id="qzSelfSave">${L.saveSelf}</button></div><div id="qzSelfMsg" aria-live="polite"></div></div></section>`
        : `<section class="panel" id="qzSelf"><div class="label">${L.essayLabel}</div>
            <div class="ubreak">${essays.map((i) => { const s = selfSum(i); return `<span>${nbNum(esc(String(qs[i].q).slice(0, 60)))}${String(qs[i].q).length > 60 ? "…" : ""}</span><span></span><span>${s ? N(s.got) + "/" + N(s.max) : L.notMarked}</span>`; }).join("")}</div>
            <p class="small muted">${saved ? L.selfSaved(N(saved.got), N(saved.max), saved.max) + " " : ""}${L.selfNoAvg}</p></section>`;
      el.innerHTML = `<div class="stack"${LANG}>
        <section class="panel" id="qzScore">
          <div class="label">${nb(nbNum(`${esc(ttl)} · ${h.retry ? L.retryHead : exam ? L.modeExam : L.modePractice}`))}</div>
          ${total ? `<h2 class="praise">${praise}</h2>
          <div class="row" style="gap:18px;align-items:flex-end"><div class="score">${d10}<span class="score-sub">/10</span></div>
          <div class="stack tight"><b>${L.scoreLine(N(right), total)}</b><span class="muted small">${L.time}${fmtTime(secs)}</span></div></div>
          ${cmp ? `<div class="tags" id="qzCmp">${cmp}</div>` : ""}
          ${saved0}
          ${h.retry ? `<p class="small muted">${L.retryNote}</p>` : ""}
          ${part ? `<p class="small muted">${L.partNote}</p>` : ""}` : `<p>${L.onlyEssay} ${L.time}${fmtTime(secs)}</p>${saved0}`}
        </section>
        <div class="row">${wrong.length ? `<button class="btn main" id="qzRetry">${L.retry(wrong.length)}</button>` : ""}<button class="btn ${wrong.length ? "ghost" : "main"}" id="qzAgain">${wrong.length || h.retry ? againAllTxt : againTxt}</button></div>
        ${reviewPanel}
        ${topicPanel}
        ${Object.keys(byLv).length ? `<section class="panel" id="qzLv"><div class="label">${L.byLv}</div>${bars(byLv, (k) => L.lv[k])}</section>` : ""}
        ${essayPanel}
        <div class="row"><button class="btn ghost" id="qzHome">${L.home}</button></div>
      </div>`;
      el.querySelector("#qzAgain").onclick = again;
      if (wrong.length) el.querySelector("#qzRetry").onclick = retryWith(wrong);
      el.querySelector("#qzHome").onclick = () => opts.onExit && opts.onExit();
      wireReport(el);
      const save = el.querySelector("#qzSelfSave");
      if (save) {
        wireRubric(el, () => (el.querySelector("#qzSelfMsg").innerHTML = ""));
        save.onclick = () => {
          const s = saveSelf(essays);
          if (!s) { el.querySelector("#qzSelfMsg").innerHTML = `<div class="fb bad">${L.selfNeed}</div>`; return; }
          // lịch sử câu: câu đã trả lời có lần làm ghi lúc nộp bài, nay chỉ thêm lần sai nếu tự chấm dưới một nửa số điểm (late); câu bỏ
          // qua hoặc chưa tới mà nay tự chấm (có thể đã làm ra giấy) thì ghi một lần làm
          if (opts.onMarks) {
            const marked = essays.filter((i) => selfSum(i)), mark = (i) => [qs[i].key, essayMark(i)];
            const fresh = marked.filter((i) => !S.ans[i].done).map(mark), late = marked.filter((i) => S.ans[i].done && !essayMark(i)).map(mark);
            if (fresh.length) opts.onMarks(fresh);
            if (late.length) opts.onMarks(late, true);
          }
          el.querySelectorAll("#qzSelf .rubric .opt").forEach((b) => (b.disabled = true));
          el.querySelector("#qzSelfArea").innerHTML = `<div class="fb ok">${L.selfSaved(N(s.got), N(s.max), s.max)}</div>`;
        };
      }
      window.scrollTo(0, 0);
    }
    h.reported = h.reported || new Set();
    h.stop = () => { clearInterval(S.timer); S.done = true; };
    h.busy = () => !S.done && (exam || S.ans.some(Boolean));
    h.count = () => qs.length;
    h.answered = answered;
    h.submit = finish;
    if (!qs.length) { h.stop(); el.innerHTML = `<div class="panel"${LANG}>${L.emptyBank}</div>`; return h; }
    if (opts.onStart) opts.onStart();
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
     Câu hỏi + dòng "Đáp số: 3/4" (hoặc -3/4)    → trả lời ngắn bằng số, đáp án là phân số (ans "3/4")
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
        // số ("2,5", "1 250", "-3") hoặc phân số a/b ("3/4", "-3/4"; L29), rồi sai số và đơn vị nếu có
        const m = /^([-−–]?\s*\d+\s*\/\s*\d+(?![\d,]|\.\d)|[-−–]?\s*\d[\d\s.]*(?:,\d+)?)(?:\s*(?:±|\+\/?-)\s*(\d[\d.]*(?:,\d+)?))?\s*(.*)$/.exec(dap.replace(/^Đáp số\s*:\s*/i, ""));
        const f = m && /^([-−–]?)\s*(\d+)\s*\/\s*(\d+)$/.exec(m[1]), unit = m ? m[3].trim().replace(/\.$/, "") : "";
        if (!m || (!f && !Number.isFinite(vnNum(m[1])))) { err("dòng “Đáp số:” cần một số, ví dụ Đáp số: 2,5, Đáp số: 3/4 hoặc Đáp số: 2,5 ± 0,1 kg"); return; }
        if (f && !+f[3]) { err("phân số cần mẫu số khác 0, ví dụ Đáp số: 3/4"); return; }
        // hỗn số "1 1/2", "3/4,5": phần sau số bắt đầu bằng "/" và chữ số thì không phải đơn vị
        if (/^\/\s*\d/.test(unit)) { err("phân số viết a/b, ví dụ Đáp số: 3/4 (hỗn số 1 1/2 viết thành 3/2)"); return; }
        // phân số: đáp án là chuỗi "3/4" (chấm theo giá trị, hiện đúng "3/4"), không còn đọc thành 3 với đơn vị "/4"
        const q = { topic, type: "num", q: ls.filter((l) => l !== dap).join(" "), ans: f ? `${f[1] ? "-" : ""}${+f[2]}/${+f[3]}` : vnNum(m[1]) };
        if (m[2]) q.tol = vnNum(m[2]);
        if (unit) q.unit = unit;
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

  window.Quiz = { run, parse, isRight, score, svg, draw, key, text, REASONS, LV, fmtN, nbNum, TXT, lang: langOf, title };
})();
