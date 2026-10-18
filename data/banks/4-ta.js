/* Câu hỏi các đề Tiếng Anh lớp 4 có sẵn. Danh mục (tên, khối, môn, số phút, số câu): data/banks/index.js.
   App chỉ tải file này khi mở một đề trong đó. Dạng câu hỏi: xem đầu data/banks/index.js.
   Đề Tiếng Anh viết 100% tiếng Anh (CLAUDE.md, docs/KE-HOACH-NOI-DUNG.md mục 3): note, topic, lời dặn, câu hỏi, lựa chọn,
   đáp án, lời giải, đoạn đọc. tests/kiem-tra-de.js báo lỗi khi có chữ cái tiếng Việt. */
window.ONTAP_SEED_QUESTIONS = Object.assign(window.ONTAP_SEED_QUESTIONS || {}, {
  /* ---------- Tiếng Anh 4 · Kiểm tra cuối học kì I (Global Success 4, Unit 1–10) ----------
     Dạng đề kiểm tra ở trường (không phải IOE): chọn đáp án, điền từ, chọn từ khác loại, sắp xếp câu, đọc hiểu.
     Không có câu nghe. Câu và đoạn văn tự soạn, khác câu của bài ôn IOE 4. */
  "ta4-ck1-de1": {
    note: "Global Success 4, Units 1–10: My Friends, Time and Daily Routines, My Week, My Birthday Party, Things We Can Do, Our School Facilities, Our Timetables, My Favourite Subjects, Our Sports Day, Our Summer Holidays. School test format: multiple choice, fill in the blank, odd one out, word order, reading. No listening (practise listening in IOE 4). Every question has an explanation.",
    passages: {
      "lan": {
        title: "Read the text. Then answer the questions.",
        text: "Hello! My name is Lan. I'm from Viet Nam. I'm in class 4A at Sao Mai Primary School. My new friend is Lucy. She's from Australia. Our school is big. It has a library and a gym. We have English on Mondays and Thursdays. Lucy's favourite subject is Art because she likes drawing. I can swim, but Lucy can't. Last summer, I was at the beach with my family."
      }
    },
    questions: [
      { topic: "Unit 1 · My Friends", type: "mc", q: "Hiro is from Japan. What nationality is he?", o: ["He's Japanese.", "He's Japan.", "He's from Japanese.", "He's Malaysian."], x: "Japan is a country. Japanese is a nationality: He's Japanese.", lv: 1 },
      { topic: "Unit 1 · My Friends", type: "fill", q: "Fill in the blank with one word. Linh and I are from Viet Nam. ___ are Vietnamese.", ans: ["We"], x: "Linh and I = we: We are Vietnamese.", lv: 2 },
      { topic: "Unit 2 · Time and Daily Routines", type: "mc", q: "Look at the time: 5:45. What time is it?", o: ["It's five forty-five.", "It's five forty.", "It's four forty-five.", "It's forty-five five."], x: "Say the hour first, then the minutes: 5:45 is five forty-five.", lv: 1 },
      { topic: "Unit 2 · Time and Daily Routines", type: "mc", q: "Nam ___ his homework at eight o'clock in the evening.", o: ["does", "do", "makes", "doing"], x: "We say do homework. Nam = he, so do → does: Nam does his homework.", lv: 2 },
      { topic: "Unit 2 · Time and Daily Routines", type: "mc", q: "Put the words in the correct order. you / What time / have lunch / do / ?", o: ["What time do you have lunch?", "What time you do have lunch?", "What time do have you lunch?", "Do you what time have lunch?"], x: "A question about time: What time + do + you + verb? → What time do you have lunch?", lv: 3 },
      { topic: "Unit 3 · My Week", type: "fill", q: "Fill in the blank with one word. Saturday and Sunday are the ___.", ans: ["weekend"], x: "Saturday and Sunday are the two days at the end of the week: the weekend.", lv: 1 },
      { topic: "Unit 3 · My Week", type: "mc", q: "– What do you do on Sunday mornings? – I ___ the flowers in the garden.", o: ["water", "play", "ride", "cook"], x: "Flowers need water, so we water the flowers in the garden.", lv: 1 },
      { topic: "Unit 4 · My Birthday Party", type: "mc", q: "Choose the odd one out.", o: ["grapes", "milk", "juice", "water"], x: "Milk, juice and water are drinks. Grapes are fruit, not a drink.", lv: 2 },
      { topic: "Unit 4 · My Birthday Party", type: "mc", q: "– When's your birthday, Mai? – ___", o: ["It's in March.", "It's March in.", "I'm nine years old.", "Yes, it is."], x: "When's your birthday? asks about the month: It's in March. I'm nine years old answers How old are you?", lv: 1 },
      { topic: "Unit 4 · My Birthday Party", type: "fill", q: "Fill in the blank with one word. The last month of the year is ___.", ans: ["December"], x: "The year ends with October, November and December. December is the last month.", lv: 1 },
      { topic: "Unit 5 · Things We Can Do", type: "mc", q: "Choose the correct sentence.", o: ["She can swim very well.", "She can swims very well.", "She cans swim very well.", "She can to swim very well."], x: "After can, the verb has no -s and no to. Can has no -s either: She can swim very well.", lv: 2 },
      { topic: "Unit 5 · Things We Can Do", type: "mc", q: "– Can your brother roller skate? – ___, he can't. But he can ride a bike.", o: ["No", "Yes", "Not", "Don't"], x: "He can't means no, so the answer starts with No: No, he can't.", lv: 1 },
      { topic: "Unit 6 · Our School Facilities", type: "mc", q: "– ___ computer rooms are there at your school? – There are two.", o: ["How many", "How much", "What", "Where"], x: "How many + computer rooms asks about a number. The answer is a number: There are two.", lv: 1 },
      { topic: "Unit 6 · Our School Facilities", type: "mc", q: "We draw and paint pictures in the ___.", o: ["art room", "music room", "computer room", "library"], x: "The art room is the room for drawing and painting. We sing in the music room and read books in the library.", lv: 1 },
      { topic: "Unit 7 · Our Timetables", type: "mc", q: "Read the timetable: Monday – Maths, Vietnamese, English. Choose the correct sentence.", o: ["On Mondays, I have Maths, Vietnamese and English.", "On Mondays, I have Music, Art and PE.", "On Mondays, I have Science and IT.", "On Mondays, I don't have Maths."], x: "On Monday, the timetable has Maths, Vietnamese and English.", lv: 2 },
      { topic: "Unit 7 · Our Timetables", type: "fill", q: "Write the correct form of the verb in brackets. My brother ___ (have) Music on Fridays.", ans: ["has"], x: "My brother = he, so have → has: My brother has Music on Fridays.", lv: 2 },
      { topic: "Unit 8 · My Favourite Subjects", type: "mc", q: "– Why do you like Vietnamese? – Because I like ___ stories.", o: ["reading", "singing", "running", "counting"], x: "We read stories. You like Vietnamese because you like reading stories.", lv: 1 },
      { topic: "Unit 8 · My Favourite Subjects", type: "mc", q: "My favourite subjects ___ Maths and English.", o: ["are", "is", "am", "be"], x: "Maths and English are two subjects, so we use are: My favourite subjects are Maths and English.", lv: 2 },
      { topic: "Unit 9 · Our Sports Day", type: "fill", q: "Write the correct form of the verb in brackets. Look! Minh and Nam ___ (run) in the race.", ans: ["are running", "'re running"], x: "Look! means it is happening now, so we use are + V-ing. Run → running (double n): are running.", lv: 3 },
      { topic: "Unit 9 · Our Sports Day", type: "mc", q: "Choose the odd one out.", o: ["Maths", "football", "badminton", "volleyball"], x: "Football, badminton and volleyball are sports. Maths is a school subject.", lv: 2 },
      { topic: "Unit 10 · Our Summer Holidays", type: "mc", q: "My parents and I ___ in Hue last summer.", o: ["were", "was", "are", "is"], x: "Last summer is in the past. My parents and I means more than one person, so we use were.", lv: 2 },
      { topic: "Unit 10 · Our Summer Holidays", type: "fill", q: "Write the correct form of the verb in brackets. Last summer, we ___ (visit) Ha Long Bay.", ans: ["visited"], x: "Last summer is in the past: visit + -ed → visited.", lv: 3 },
      { topic: "Reading", type: "mc", q: "Where is Lucy from?", o: ["She's from Australia.", "She's from Viet Nam.", "She's from America.", "She's from Japan."], x: "The text says: My new friend is Lucy. She's from Australia. Lan is from Viet Nam.", lv: 1, p: "lan" },
      { topic: "Reading", type: "tf", q: "Lan and Lucy have English on Mondays and Thursdays.", a: true, x: "True. The text says: We have English on Mondays and Thursdays. We means Lan and Lucy.", lv: 2, p: "lan" },
      { topic: "Reading", type: "tf", q: "Lucy can swim.", a: false, x: "False. The text says: I can swim, but Lucy can't. Lan can swim. Lucy can't.", lv: 2, p: "lan" }
    ]
  }
});
