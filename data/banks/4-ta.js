/* Câu hỏi các đề Tiếng Anh lớp 4 có sẵn. Danh mục (tên, khối, môn, số phút, số câu): data/banks/index.js.
   App chỉ tải file này khi mở một đề trong đó. Dạng câu hỏi: xem đầu data/banks/index.js.
   Đề Tiếng Anh viết 100% tiếng Anh (CLAUDE.md, docs/KE-HOACH-NOI-DUNG.md mục 3): note, topic, lời dặn, câu hỏi, lựa chọn,
   đáp án, lời giải, đoạn đọc. tests/kiem-tra-de.js báo lỗi khi có chữ cái tiếng Việt. */
window.ONTAP_SEED_QUESTIONS = Object.assign(window.ONTAP_SEED_QUESTIONS || {}, {
  /* ---------- Tiếng Anh 4 · Kiểm tra cuối học kì I (Global Success 4, Unit 1–10) ----------
     Dạng đề kiểm tra ở trường (không phải IOE): chọn đáp án, điền từ, chọn từ khác loại, sắp xếp câu, nối câu hỏi với
     câu trả lời, đọc hiểu. Không có câu nghe. Câu và đoạn văn tự soạn, khác câu của bài ôn IOE 4. Hai đề cùng các câu riêng
     của "ta4-ck1-ngau-nhien" bên dưới là kho của đề ngẫu nhiên (Phiên N3b); mã đoạn đọc không trùng nhau trong cả kho. */
  "ta4-ck1-de1": {
    note: "Global Success 4, Units 1–10: My Friends, Time and Daily Routines, My Week, My Birthday Party, Things We Can Do, Our School Facilities, Our Timetables, My Favourite Subjects, Our Sports Day, Our Summer Holidays. School test format: multiple choice, fill in the blank, odd one out, word order, reading. No listening (practise listening in IOE 4). Every question has an explanation.",
    passages: {
      "lan": {
        title: "Read the text. Then answer the questions.",
        text: "Hello! My name is Lan. I'm from Viet Nam. I'm in class 4A at Sao Mai Primary School. My new friend is Lucy. She's from Australia. Our school is big. It has a library and a gym. We have English on Mondays and Thursdays. Lucy's favourite subject is Art because she likes drawing. I can swim, but Lucy can't. Last summer, I was at the beach with my family."
      }
    },
    questions: [
      { topic: "Unit 1 · My Friends", type: "mc", q: "– Where are you from? – ___", o: ["I'm from Thailand.", "I'm Thailand from.", "I from Thailand.", "I'm nine years old."], x: "Where are you from? asks about your country: I'm from + country. I'm nine years old answers How old are you?", lv: 1 },
      { topic: "Unit 1 · My Friends", type: "fill", q: "Fill in the blank with one word. Linh and I are nine years old. ___ are from Viet Nam.", ans: ["We"], x: "Linh and I = we: We are from Viet Nam.", lv: 2 },
      { topic: "Unit 2 · Time and Daily Routines", type: "mc", q: "Look at the time: 8:45. What time is it?", o: ["It's eight forty-five.", "It's eight forty.", "It's seven forty-five.", "It's forty-five eight."], x: "Say the hour first, then the minutes: 8:45 is eight forty-five.", lv: 1 },
      { topic: "Unit 2 · Time and Daily Routines", type: "mc", q: "Choose the correct sentence.", o: ["I have breakfast at seven fifteen.", "I have breakfast on seven fifteen.", "I have breakfast in seven fifteen.", "I at seven fifteen have breakfast."], x: "We use at with a time: at seven fifteen. The time comes after have breakfast: I have breakfast at seven fifteen.", lv: 2 },
      { topic: "Unit 2 · Time and Daily Routines", type: "mc", q: "Put the words in the correct order. you / What time / have lunch / do / ?", o: ["What time do you have lunch?", "What time you do have lunch?", "What time do have you lunch?", "Do you what time have lunch?"], x: "A question about time: What time + do + you + verb? → What time do you have lunch?", lv: 3 },
      { topic: "Unit 3 · My Week", type: "fill", q: "Fill in the blank with one word. Saturday and Sunday are the ___.", ans: ["weekend"], x: "Saturday and Sunday are the two days at the end of the week: the weekend.", lv: 1 },
      { topic: "Unit 3 · My Week", type: "mc", q: "– What do you do on Saturdays? – I ___ housework with my mum and dad.", o: ["do", "listen", "study", "play"], x: "We say do housework. We listen to music, study at school and play games.", lv: 1 },
      { topic: "Unit 4 · My Birthday Party", type: "mc", q: "Choose the odd one out.", o: ["grapes", "lemonade", "juice", "water"], x: "Lemonade, juice and water are drinks. Grapes are fruit, not a drink.", lv: 2 },
      { topic: "Unit 4 · My Birthday Party", type: "mc", q: "– When's your birthday, Mai? – ___", o: ["It's in March.", "It's March in.", "I'm nine years old.", "Yes, it is."], x: "When's your birthday? asks about the month: It's in March. I'm nine years old answers How old are you?", lv: 1 },
      { topic: "Unit 4 · My Birthday Party", type: "fill", q: "Fill in the blank with one word. The first month of the year is ___.", ans: ["January"], x: "The year starts with January, then February, March and April. January is the first month.", lv: 1 },
      { topic: "Unit 5 · Things We Can Do", type: "mc", q: "Choose the correct sentence.", o: ["She can swim very well.", "She can swims very well.", "She cans swim very well.", "She can to swim very well."], x: "After can, we use the verb without -s and without to. We never add -s to can: She can swim very well.", lv: 2 },
      { topic: "Unit 5 · Things We Can Do", type: "mc", q: "– Can your brother roller skate? – ___, he can't. But he can play the guitar.", o: ["No", "Yes", "Not", "Don't"], x: "He can't means no, so the answer starts with No: No, he can't.", lv: 1 },
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
  },

  /* Đề 2 (Phiên N3b): cùng phạm vi, mỗi Unit 2–3 câu và một đoạn đọc 3 câu như đề 1; 10 câu Biết, 8 Hiểu, 7 Vận dụng, chia
     theo đúng ma trận của đề ngẫu nhiên (đề 1 có 11 – 11 – 3, nên đề 2 thêm câu Vận dụng: sắp xếp câu, chia động từ, đọc thời
     khoá biểu, suy luận từ lời mời và từ đoạn đọc). */
  "ta4-ck1-de2": {
    note: "Global Success 4, Units 1–10: My Friends, Time and Daily Routines, My Week, My Birthday Party, Things We Can Do, Our School Facilities, Our Timetables, My Favourite Subjects, Our Sports Day, Our Summer Holidays. School test format: multiple choice, odd one out, fill in the blank, word order, matching, reading. 10 Know, 8 Understand and 7 Apply questions. No listening (practise listening in IOE 4). Every question has an explanation.",
    passages: {
      "mary": {
        title: "Read the text. Then answer the questions.",
        text: "Hello! My name is Mary. I'm from America. My family and I are in Ha Noi now. I'm in class 4B. My birthday is in July. Every morning, I get up at six thirty and go to school at seven o'clock. I have English on Tuesdays and Fridays. My favourite subject is Science because I like animals. I can play the piano, but I can't sing well. Last summer, I was in Da Nang with my family. We played on the beach every day."
      }
    },
    questions: [
      { topic: "Unit 1 · My Friends", type: "mc", q: "– Where's he from? – He's from ___.", o: ["Thailand", "thank you", "thirty", "three"], x: "Thailand is a country. Thirty and three are numbers. Thank you is not a place.", lv: 1 },
      { topic: "Unit 1 · My Friends", type: "mc", q: "– Where's your new friend from? – ___ from Malaysia. Her name is Siti.", o: ["She's", "He's", "I'm", "It's"], x: "Her name is Siti, so the friend is a girl. We use she: She's from Malaysia.", lv: 2 },
      { topic: "Unit 2 · Time and Daily Routines", type: "mc", q: "Nine fifteen is ___.", o: ["9:15", "9:50", "5:15", "9:05"], x: "Say the hour first, then the minutes: nine fifteen is 9:15. Nine fifty is 9:50.", lv: 1 },
      { topic: "Unit 2 · Time and Daily Routines", type: "mc", q: "– What time do you have breakfast? – ___", o: ["At six forty-five.", "In the kitchen.", "It's Monday.", "With my family."], x: "What time asks about the time, so the answer is a time: At six forty-five.", lv: 2 },
      { topic: "Unit 2 · Time and Daily Routines", type: "order", q: "Put the words in the correct order.", o: ["My sister and I", "get up", "at", "five forty-five", "every day."], x: "Start with the people, then the activity, then at + the time: My sister and I get up at five forty-five every day.", lv: 3 },
      { topic: "Unit 3 · My Week", type: "mc", q: "The day after Wednesday is ___.", o: ["Thursday", "Tuesday", "Sunday", "Monday"], x: "The days of the week are Monday, Tuesday, Wednesday, Thursday… Thursday comes after Wednesday.", lv: 1 },
      { topic: "Unit 3 · My Week", type: "order", q: "Put the words in the correct order.", o: ["We", "don't go", "to school", "on", "Sundays."], x: "Start with We, then don't go to school, then on + the day: We don't go to school on Sundays.", lv: 3 },
      { topic: "Unit 4 · My Birthday Party", type: "fill", q: "Fill in the blank with one word. The month after January is ___.", ans: ["February"], x: "The year starts with January, February, March… February comes after January.", lv: 1 },
      { topic: "Unit 4 · My Birthday Party", type: "mc", q: "Choose the odd one out.", o: ["party", "chips", "jam", "grapes"], x: "Chips, jam and grapes are things we eat. A party is not food.", lv: 2 },
      { topic: "Unit 4 · My Birthday Party", type: "mc", q: "Mai says to Lucy: “My birthday party is on the day after Saturday. Please come at three o'clock.” Choose the correct sentence.", o: ["Mai's party is on Sunday.", "Mai's party is on Saturday.", "Lucy's party is on Sunday.", "Mai's party is at three thirty."], x: "The day after Saturday is Sunday, so Mai's party is on Sunday at three o'clock. It is Mai's party, not Lucy's.", lv: 3 },
      { topic: "Unit 5 · Things We Can Do", type: "mc", q: "I can ___ a horse and a bike.", o: ["ride", "play", "swim", "sing"], x: "We ride a horse and ride a bike. We play games, swim in the water and sing songs.", lv: 1 },
      { topic: "Unit 5 · Things We Can Do", type: "match", q: "Match the questions with the answers.", l: ["Can you play the piano?", "Can your sister dance?", "Can your brothers swim?"], r: ["Yes, I can.", "Yes, she can.", "No, they can't.", "Yes, it is."], x: "Can you…? → Yes, I can. Your sister = she: Yes, she can. Your brothers = they: No, they can't. Yes, it is answers an Is it…? question.", lv: 2 },
      { topic: "Unit 6 · Our School Facilities", type: "mc", q: "We read books in the ___.", o: ["library", "gym", "playground", "computer room"], x: "A library is a room with lots of books. We play sports in the gym and play games in the playground.", lv: 1 },
      { topic: "Unit 6 · Our School Facilities", type: "mc", q: "Choose the odd one out.", o: ["teacher", "library", "gym", "playground"], x: "A library, a gym and a playground are places at school. A teacher is a person.", lv: 2 },
      { topic: "Unit 7 · Our Timetables", type: "mc", q: "– When do you have PE? – I have ___ on Tuesdays and Fridays.", o: ["it", "them", "they", "its"], x: "PE is one subject, so we use it: I have it on Tuesdays and Fridays.", lv: 2 },
      { topic: "Unit 7 · Our Timetables", type: "fill", q: "Read the timetable: Tuesday – Science, Maths, PE; Wednesday – English, Vietnamese, Music. Fill in the blank with one word. – When do you have Music? – I have it on ___.", ans: ["Wednesday", "Wednesdays"], x: "Music is on the timetable for Wednesday: I have it on Wednesday.", lv: 3 },
      { topic: "Unit 8 · My Favourite Subjects", type: "mc", q: "– What's your favourite subject? – ___", o: ["It's Maths.", "It's Monday.", "It's seven o'clock.", "It's in May."], x: "The question asks about a school subject. Maths is a subject. Monday is a day and May is a month.", lv: 1 },
      { topic: "Unit 8 · My Favourite Subjects", type: "fill", q: "Fill in the blank with one word. – ___ do you like Art? – Because I like drawing.", ans: ["Why"], x: "The answer starts with Because, so the question starts with Why: Why do you like Art?", lv: 2 },
      { topic: "Unit 9 · Our Sports Day", type: "mc", q: "We play ___ with a small ball on a big table.", o: ["table tennis", "football", "basketball", "volleyball"], x: "We play table tennis on a table with a small ball. Football, basketball and volleyball use a big ball.", lv: 1 },
      { topic: "Unit 9 · Our Sports Day", type: "order", q: "Put the words in the correct order.", o: ["What", "are", "the girls", "doing", "now?"], x: "A question about now: What + are + they + V-ing? → What are the girls doing now?", lv: 3 },
      { topic: "Unit 10 · Our Summer Holidays", type: "mc", q: "– Where were you last summer? – I ___ at the beach.", o: ["was", "were", "am", "be"], x: "Last summer is in the past. With I, we use was: I was at the beach.", lv: 1 },
      { topic: "Unit 10 · Our Summer Holidays", type: "fill", q: "Write the correct form of the verb in brackets. Last summer, my brother and I ___ (play) badminton every evening.", ans: ["played"], x: "Last summer is in the past: play + -ed → played.", lv: 3 },
      { topic: "Reading", type: "mc", q: "When is Mary's birthday?", o: ["It's in July.", "It's in June.", "It's on Tuesday.", "It's at seven o'clock."], x: "The text says: My birthday is in July.", lv: 1, p: "mary" },
      { topic: "Reading", type: "tf4", q: "Read the text again. Is each sentence true or false?", o: ["Mary is from America.", "Mary has English on Mondays and Fridays.", "Mary likes Science because she likes animals.", "Mary can sing well."], a: [true, false, true, false], x: "a) True: I'm from America. b) False: Mary has English on Tuesdays and Fridays. c) True: My favourite subject is Science because I like animals. d) False: I can't sing well.", lv: 2, p: "mary" },
      { topic: "Reading", type: "order", q: "Put the words in the correct order to answer the question: Where was Mary last summer?", o: ["She", "was", "in Da Nang", "last summer."], x: "Mary says: Last summer, I was in Da Nang. We talk about Mary with she: She was in Da Nang last summer.", lv: 3, p: "mary" }
    ]
  },

  /* ---------- Tiếng Anh 4 · Đề ngẫu nhiên cuối học kì I: câu riêng của ngân hàng (Phiên N3b) ----------
     Kho câu của đề ngẫu nhiên = 26 câu dưới đây + 50 câu của hai đề cố định ở trên (mọi câu có lv). Ma trận trong
     data/banks/index.js: mỗi lần rút 25 câu, 10 Biết, 8 Hiểu, 7 Vận dụng; mỗi Unit 2–3 câu, Reading 3 câu; ô (chủ đề, mức) nào
     cũng có ít nhất gấp đôi số câu ô đó rút. Câu riêng chỉ nằm ở ô ma trận có rút câu, phần nhiều là câu Vận dụng (sắp xếp
     câu, chia động từ, đọc thời khoá biểu), cùng hai đoạn đọc, mỗi đoạn 3 câu đủ ba mức. Câu và đoạn văn tự soạn. */
  "ta4-ck1-ngau-nhien": {
    note: "Global Success 4, Units 1–10. Each test has 2–3 questions for each unit and 3 reading questions: 10 Know, 8 Understand and 7 Apply. No listening (practise listening in IOE 4). Every question has an explanation.",
    passages: {
      "phong": {
        title: "Read the text. Then answer the questions.",
        text: "My name is Phong. I'm ten years old and I'm in class 4C. My school is big and beautiful. It has a playground, a library and two computer rooms. I have English on Mondays, Wednesdays and Fridays. My favourite subject is PE because I like playing football. My friend Akio is from Japan. He can draw very well, but he can't play football."
      },
      "lucy": {
        title: "Read the text. Then answer the questions.",
        text: "Hi, I'm Lucy. I'm from Australia. Last summer, I was in Viet Nam with my parents. First, we were in Ha Long Bay. We played on the beach every day. Then we were in Ha Noi and visited my friend Mai. Mai's birthday is in August, and I was at her birthday party! We danced and played games. It was great!"
      }
    },
    questions: [
      { topic: "Unit 1 · My Friends", type: "mc", q: "Choose the correct question. – ___ – I'm from Britain.", o: ["Where are you from?", "Where is you from?", "What are you from?", "How old are you?"], x: "I'm from Britain answers a question about your country: Where are you from?", lv: 1 },
      { topic: "Unit 1 · My Friends", type: "match", q: "Match the questions with the answers.", l: ["Where are you from?", "Where's he from?", "Where's she from?"], r: ["I'm from Malaysia.", "He's from Japan.", "She's from Singapore.", "It's Tuesday."], x: "Where are you from? → I'm from Malaysia. Where's he from? → He's from Japan. Where's she from? → She's from Singapore. It's Tuesday answers What day is it today?", lv: 2 },
      { topic: "Unit 2 · Time and Daily Routines", type: "tf4", q: "Look at Linh's day: get up – 6:15, have breakfast – 6:30, go to school – 6:45, have lunch – 11:15. Linh says these sentences. Is each sentence true or false?", o: ["I get up at six fifteen.", "I have breakfast at six thirty.", "I go to school at seven forty-five.", "I have lunch at eleven fifteen."], a: [true, true, false, true], x: "a) True: 6:15 is six fifteen. b) True: 6:30 is six thirty. c) False: Linh goes to school at 6:45, six forty-five. d) True: 11:15 is eleven fifteen.", lv: 2 },
      { topic: "Unit 2 · Time and Daily Routines", type: "fill", q: "Fill in the blank with one word. – What time do you go to ___? – At nine thirty. Good night, Mum!", ans: ["bed"], x: "We say Good night when we go to bed: What time do you go to bed?", lv: 3 },
      { topic: "Unit 3 · My Week", type: "fill", q: "Fill in the blank with one word. – What day is it today? – It's ___. It's the last school day of the week.", ans: ["Friday"], x: "We go to school five days a week. The last school day is Friday.", lv: 3 },
      { topic: "Unit 3 · My Week", type: "order", q: "Put the words in the correct order.", o: ["My friends and I", "play", "football", "on", "Saturdays."], x: "A sentence starts with the person, then the verb: My friends and I play football. The day comes last: on Saturdays.", lv: 3 },
      { topic: "Unit 4 · My Birthday Party", type: "mc", q: "Choose the correct question for the answer: I want some lemonade.", o: ["What do you want to drink?", "When's your birthday?", "What day is it today?", "What time is it?"], x: "Lemonade is a drink, so the question is: What do you want to drink?", lv: 2 },
      { topic: "Unit 4 · My Birthday Party", type: "order", q: "Put the words in the correct order.", o: ["When", "is", "your", "birthday", "party?"], x: "A question about the time of an event starts with When: When is your birthday party?", lv: 3 },
      { topic: "Unit 5 · Things We Can Do", type: "mc", q: "I can play the ___.", o: ["guitar", "bike", "horse", "swim"], x: "We play the guitar. We ride a bike and ride a horse. Swim is a verb: I can swim.", lv: 1 },
      { topic: "Unit 5 · Things We Can Do", type: "mc", q: "Choose the odd one out.", o: ["piano", "sing", "swim", "draw"], x: "Sing, swim and draw are things we can do. A piano is a thing we play.", lv: 2 },
      { topic: "Unit 6 · Our School Facilities", type: "mc", q: "– Is there a swimming pool at your school? – No, ___.", o: ["there isn't", "there aren't", "it isn't", "isn't there"], x: "We answer Is there…? with Yes, there is or No, there isn't.", lv: 2 },
      { topic: "Unit 6 · Our School Facilities", type: "fill", q: "Fill in the blank with one word. There ___ two playgrounds at my school.", ans: ["are"], x: "Two playgrounds is more than one, so we use There are.", lv: 2 },
      { topic: "Unit 7 · Our Timetables", type: "order", q: "Put the words in the correct order.", o: ["What", "subjects", "do you have", "on Fridays?"], x: "Start with the question words What subjects, then do you have, then the day: What subjects do you have on Fridays?", lv: 3 },
      { topic: "Unit 7 · Our Timetables", type: "tf4", q: "Read Nam's timetable: Monday – Maths, English, Music; Tuesday – Vietnamese, Science, PE; Wednesday – Maths, Art, IT. Is each sentence true or false?", o: ["Nam has Maths on Mondays and Wednesdays.", "Nam has PE on Wednesdays.", "Nam has three subjects on Tuesdays.", "Nam has English on Tuesdays."], a: [true, false, true, false], x: "a) True: Maths is on Monday and Wednesday. b) False: PE is on Tuesday. c) True: Vietnamese, Science and PE. d) False: English is on Monday.", lv: 3 },
      { topic: "Unit 8 · My Favourite Subjects", type: "mc", q: "We use computers in ___ lessons.", o: ["IT", "Music", "Art", "PE"], x: "In IT lessons, we use computers. We sing in Music, draw in Art and play sports in PE.", lv: 1 },
      { topic: "Unit 8 · My Favourite Subjects", type: "match", q: "Match the questions with the answers.", l: ["What's your favourite subject?", "Why do you like PE?", "Do you like Maths?"], r: ["It's English.", "Because I like playing football.", "Yes, I do.", "It's on Tuesday."], x: "What's your favourite subject? → It's English. Why do you like PE? → Because I like playing football. Do you like Maths? → Yes, I do. It's on Tuesday answers a When question.", lv: 2 },
      { topic: "Unit 9 · Our Sports Day", type: "mc", q: "– Are they playing badminton? – Yes, they ___.", o: ["are", "do", "can", "is"], x: "We answer Are they…? with Yes, they are or No, they aren't.", lv: 1 },
      { topic: "Unit 9 · Our Sports Day", type: "fill", q: "Write the correct form of the verb in brackets. Look! Our teacher ___ (watch) the race.", ans: ["is watching", "'s watching"], x: "Look! means it is happening now. Our teacher = he or she, so we use is + V-ing: is watching.", lv: 3 },
      { topic: "Unit 10 · Our Summer Holidays", type: "mc", q: "Last summer, I was at the ___. I played in the sea with my brother.", o: ["beach", "library", "gym", "computer room"], x: "The sea is at the beach, so I was at the beach.", lv: 1 },
      { topic: "Unit 10 · Our Summer Holidays", type: "order", q: "Put the words in the correct order.", o: ["Where", "were", "you", "last", "summer?"], x: "A question about a place in the past: Where + were + you + last summer?", lv: 3 },
      { topic: "Reading", type: "mc", q: "How many computer rooms are there at Phong's school?", o: ["There are two.", "There is one.", "There are three.", "There aren't any."], x: "The text says: It has a playground, a library and two computer rooms.", lv: 1, p: "phong" },
      { topic: "Reading", type: "tf", q: "Akio can play football very well.", a: false, x: "False. The text says: He can draw very well, but he can't play football.", lv: 2, p: "phong" },
      { topic: "Reading", type: "mc", q: "Today is Wednesday. Does Phong have English today?", o: ["Yes, he does.", "No, he doesn't.", "Yes, he is.", "No, he isn't."], x: "Phong has English on Mondays, Wednesdays and Fridays, so he has English today: Yes, he does.", lv: 3, p: "phong" },
      { topic: "Reading", type: "mc", q: "Where was Lucy first?", o: ["In Ha Long Bay", "In Ha Noi", "In Australia", "At Mai's birthday party"], x: "The text says: First, we were in Ha Long Bay. Then they were in Ha Noi.", lv: 1, p: "lucy" },
      { topic: "Reading", type: "tf", q: "Lucy was at Mai's birthday party in Ha Noi.", a: true, x: "True. Lucy visited Mai in Ha Noi and was at her birthday party.", lv: 2, p: "lucy" },
      { topic: "Reading", type: "mc", q: "When was Lucy in Ha Noi?", o: ["In August", "In May", "In December", "In March"], x: "Lucy was at Mai's birthday party in Ha Noi, and Mai's birthday is in August. So Lucy was in Ha Noi in August.", lv: 3, p: "lucy" }
    ]
  }
});
