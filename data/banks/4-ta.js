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
        text: "Hello! My name is Lan. I'm from Viet Nam. I'm in class 4A at Sao Mai Primary School. My new friend is Anna. She's from Australia. Our school is in the town. It has two buildings and a big garden. We have English on Mondays and Thursdays. Anna's favourite subject is art because she likes drawing. I can swim, but Anna can't. Last summer, I was in the mountains with my family."
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
      { topic: "Unit 6 · Our School Facilities", type: "mc", q: "– ___ is your school? – It's in the town.", o: ["Where", "What", "When", "How many"], x: "It's in the town tells us a place, so the question starts with Where: Where's your school?", lv: 1 },
      { topic: "Unit 6 · Our School Facilities", type: "mc", q: "We run and play football in the school ___.", o: ["playground", "computer room", "building", "village"], x: "We run and play games outside, in the playground. We use computers in the computer room.", lv: 1 },
      { topic: "Unit 7 · Our Timetables", type: "mc", q: "Read the timetable: Monday – maths, Vietnamese, English. Choose the correct sentence.", o: ["On Mondays, I have maths, Vietnamese and English.", "On Mondays, I have music, art and science.", "On Mondays, I have science and English.", "On Mondays, I don't have maths."], x: "On Monday, the timetable has maths, Vietnamese and English.", lv: 2 },
      { topic: "Unit 7 · Our Timetables", type: "fill", q: "Fill in the blank with one word. – When do you have history and geography? – I have ___ on Tuesdays.", ans: ["it"], x: "History and geography is one subject, so we use it: I have it on Tuesdays.", lv: 2 },
      { topic: "Unit 8 · My Favourite Subjects", type: "mc", q: "I like ___ stories, so my favourite subject is Vietnamese.", o: ["reading", "singing", "running", "counting"], x: "We read stories in Vietnamese lessons, so I like reading stories.", lv: 1 },
      { topic: "Unit 8 · My Favourite Subjects", type: "mc", q: "My favourite subjects ___ maths and English.", o: ["are", "is", "am", "be"], x: "Maths and English are two subjects, so we use are: My favourite subjects are maths and English.", lv: 2 },
      { topic: "Unit 9 · Our Sports Day", type: "fill", q: "Fill in the blank with one word. Our sports day is in the month after November. It's in ___.", ans: ["December"], x: "December comes after November. It is the last month of the year.", lv: 3 },
      { topic: "Unit 9 · Our Sports Day", type: "mc", q: "Choose the odd one out.", o: ["maths", "football", "badminton", "volleyball"], x: "Football, badminton and volleyball are sports. Maths is a school subject.", lv: 2 },
      { topic: "Unit 10 · Our Summer Holidays", type: "mc", q: "Last summer, I was in the ___. It was quiet, with many trees and fields.", o: ["countryside", "city", "beach", "computer room"], x: "The countryside is quiet and has many trees and fields. A city is busy, with many tall buildings.", lv: 2 },
      { topic: "Unit 10 · Our Summer Holidays", type: "fill", q: "Fill in the blank with one word. – Were you in Tokyo last summer? – No, I ___. I was in Sydney.", ans: ["wasn't", "was not"], x: "We answer Were you…? with Yes, I was or No, I wasn't. I was in Sydney, not Tokyo, so: No, I wasn't.", lv: 3 },
      { topic: "Reading", type: "mc", q: "Where is Anna from?", o: ["She's from Australia.", "She's from Viet Nam.", "She's from America.", "She's from Japan."], x: "The text says: My new friend is Anna. She's from Australia. Lan is from Viet Nam.", lv: 1, p: "lan" },
      { topic: "Reading", type: "tf", q: "Lan and Anna have English on Mondays and Thursdays.", a: true, x: "True. The text says: We have English on Mondays and Thursdays. We means Lan and Anna.", lv: 2, p: "lan" },
      { topic: "Reading", type: "tf", q: "Anna can swim.", a: false, x: "False. The text says: I can swim, but Anna can't. Lan can swim. Anna can't.", lv: 2, p: "lan" }
    ]
  },

  /* Đề 2 (Phiên N3b): cùng phạm vi, mỗi Unit 2–3 câu và một đoạn đọc 3 câu như đề 1; 10 câu Biết, 8 Hiểu, 7 Vận dụng, chia
     theo đúng ma trận của đề ngẫu nhiên (đề 1 có 11 – 11 – 3, nên đề 2 thêm câu Vận dụng: sắp xếp câu, điền từ theo mẫu câu, đọc thời
     khoá biểu, suy luận từ lời mời và từ đoạn đọc). */
  "ta4-ck1-de2": {
    note: "Global Success 4, Units 1–10: My Friends, Time and Daily Routines, My Week, My Birthday Party, Things We Can Do, Our School Facilities, Our Timetables, My Favourite Subjects, Our Sports Day, Our Summer Holidays. School test format: multiple choice, odd one out, fill in the blank, word order, matching, reading. 10 Know, 8 Understand and 7 Apply questions. No listening (practise listening in IOE 4). Every question has an explanation.",
    passages: {
      "mary": {
        title: "Read the text. Then answer the questions.",
        text: "Hello! My name is Mary. I'm from America. My family and I are in Ha Noi now. I'm in class 4B. My birthday is in July. Every morning, I get up at six thirty and go to school at seven o'clock. I have English on Tuesdays and Fridays. My favourite subject is science because I like animals. I can play the piano, but I can't sing well. Last summer, I was in Da Nang with my family. It was great!"
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
      { topic: "Unit 6 · Our School Facilities", type: "mc", q: "My school is in the ___. There are many tall buildings and a lot of people.", o: ["city", "village", "mountains", "garden"], x: "A city has many tall buildings and a lot of people. A village is small.", lv: 1 },
      { topic: "Unit 6 · Our School Facilities", type: "mc", q: "Choose the odd one out.", o: ["teacher", "building", "garden", "playground"], x: "A building, a garden and a playground are places at school. A teacher is a person.", lv: 2 },
      { topic: "Unit 7 · Our Timetables", type: "mc", q: "– Do you have art today? – No, ___. I have it on Fridays.", o: ["I don't", "I'm not", "it isn't", "I can't"], x: "Do you have…? asks about you. You don't have art today, so the answer is No, I don't.", lv: 2 },
      { topic: "Unit 7 · Our Timetables", type: "fill", q: "Read the timetable: Tuesday – science, maths, art; Wednesday – English, Vietnamese, music. Fill in the blank with one word. – When do you have music? – On ___.", ans: ["Wednesday", "Wednesdays"], x: "Music is on the timetable for Wednesday: I have it on Wednesday.", lv: 3 },
      { topic: "Unit 8 · My Favourite Subjects", type: "mc", q: "– What's your favourite subject? – ___", o: ["It's maths.", "It's Monday.", "It's seven o'clock.", "It's in May."], x: "The question asks about a school subject. Maths is a subject. Monday is a day and May is a month.", lv: 1 },
      { topic: "Unit 8 · My Favourite Subjects", type: "fill", q: "Fill in the blank with one word. – ___ do you like art? – Because I like drawing.", ans: ["Why"], x: "The answer starts with Because, so the question starts with Why: Why do you like art?", lv: 2 },
      { topic: "Unit 9 · Our Sports Day", type: "mc", q: "The month after April is ___.", o: ["May", "March", "June", "August"], x: "The months go March, April, May, June… May comes after April.", lv: 1 },
      { topic: "Unit 9 · Our Sports Day", type: "order", q: "Put the words in the correct order.", o: ["Our", "sports day", "is", "in", "June."], x: "Start with Our sports day, then is, then in + the month: Our sports day is in June.", lv: 3 },
      { topic: "Unit 10 · Our Summer Holidays", type: "mc", q: "Last summer, I was ___ the beach with my family.", o: ["on", "of", "to", "under"], x: "We say on the beach, in the mountains and at the campsite: I was on the beach.", lv: 1 },
      { topic: "Unit 10 · Our Summer Holidays", type: "fill", q: "Fill in the blank with one word. – ___ you in the school garden yesterday? – Yes, I was. It was fun!", ans: ["Were"], x: "The answer is Yes, I was, so the question is Were you…?: Were you in the school garden yesterday?", lv: 3 },
      { topic: "Reading", type: "mc", q: "When is Mary's birthday?", o: ["It's in July.", "It's in June.", "It's on Tuesday.", "It's at seven o'clock."], x: "The text says: My birthday is in July.", lv: 1, p: "mary" },
      { topic: "Reading", type: "tf4", q: "Read the text again. Is each sentence true or false?", o: ["Mary is from America.", "Mary has English on Mondays and Fridays.", "Mary likes science because she likes animals.", "Mary can sing well."], a: [true, false, true, false], x: "a) True: I'm from America. b) False: Mary has English on Tuesdays and Fridays. c) True: My favourite subject is science because I like animals. d) False: I can't sing well.", lv: 2, p: "mary" },
      { topic: "Reading", type: "order", q: "Put the words in the correct order to answer the question: Where was Mary last summer?", o: ["She", "was", "in Da Nang", "last summer."], x: "Mary says: Last summer, I was in Da Nang. We talk about Mary with she: She was in Da Nang last summer.", lv: 3, p: "mary" }
    ]
  },

  /* ---------- Tiếng Anh 4 · Đề ngẫu nhiên cuối học kì I: câu riêng của ngân hàng (Phiên N3b) ----------
     Kho câu của đề ngẫu nhiên = 26 câu dưới đây + 50 câu của hai đề cố định ở trên (mọi câu có lv). Ma trận trong
     data/banks/index.js: mỗi lần rút 25 câu, 10 Biết, 8 Hiểu, 7 Vận dụng; mỗi Unit 2–3 câu, Reading 3 câu; ô (chủ đề, mức) nào
     cũng có ít nhất gấp đôi số câu ô đó rút. Câu riêng chỉ nằm ở ô ma trận có rút câu, phần nhiều là câu Vận dụng (sắp xếp
     câu, điền từ theo mẫu câu, đọc thời khoá biểu), cùng hai đoạn đọc, mỗi đoạn 3 câu đủ ba mức. Câu và đoạn văn tự soạn. */
  "ta4-ck1-ngau-nhien": {
    note: "Global Success 4, Units 1–10. Each test has 2–3 questions for each unit and 3 reading questions: 10 Know, 8 Understand and 7 Apply. No listening (practise listening in IOE 4). Every question has an explanation.",
    passages: {
      "phong": {
        title: "Read the text. Then answer the questions.",
        text: "My name is Phong. I'm ten years old and I'm in class 4C. My school is big and beautiful. It has three buildings, a garden and two computer rooms. I have English on Mondays, Wednesdays and Fridays. My favourite subject is PE because I like playing football. My friend Akio is from Japan. He can draw very well, but he can't play football."
      },
      "lucy": {
        title: "Read the text. Then answer the questions.",
        text: "Hi, I'm Lucy. I'm from Britain. Last summer, I was in Viet Nam. First, I was in Phu Quoc with my parents. Then I was in Ha Noi with my friend Mai. Mai's birthday is in August, and I was at her birthday party. It was great!"
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
      { topic: "Unit 6 · Our School Facilities", type: "mc", q: "– How many computer rooms are there at your school? – ___", o: ["There is one.", "There are one.", "It's one.", "There is two."], x: "For one thing, we say There is one. For more than one, we use There are.", lv: 2 },
      { topic: "Unit 6 · Our School Facilities", type: "fill", q: "Fill in the blank with one word. There ___ four buildings at my school.", ans: ["are"], x: "Four buildings is more than one, so we use There are.", lv: 2 },
      { topic: "Unit 7 · Our Timetables", type: "order", q: "Put the words in the correct order.", o: ["What", "subjects", "do you have", "on Fridays?"], x: "Start with the question words What subjects, then do you have, then the day: What subjects do you have on Fridays?", lv: 3 },
      { topic: "Unit 7 · Our Timetables", type: "tf4", q: "Read Nam's timetable: Monday – maths, English, music; Tuesday – Vietnamese, science, art; Wednesday – maths, Vietnamese, English. Is each sentence true or false?", o: ["Nam has maths on Mondays and Wednesdays.", "Nam has art on Wednesdays.", "Nam has three subjects on Tuesdays.", "Nam has English on Tuesdays."], a: [true, false, true, false], x: "a) True: maths is on Monday and Wednesday. b) False: art is on Tuesday. c) True: Vietnamese, science and art. d) False: English is on Monday and Wednesday.", lv: 3 },
      { topic: "Unit 8 · My Favourite Subjects", type: "mc", q: "We use computers in ___ lessons.", o: ["IT", "music", "art", "PE"], x: "In IT lessons, we use computers. We sing in music, draw in art and run and play sports in PE.", lv: 1 },
      { topic: "Unit 8 · My Favourite Subjects", type: "match", q: "Match the questions with the answers.", l: ["Why do you like maths?", "Do you like music?", "Is music your favourite subject?"], r: ["Because I want to be a maths teacher.", "Yes, I do.", "No, it isn't.", "I have it on Tuesdays."], x: "Why…? → Because I want to be a maths teacher. Do you like…? → Yes, I do. Is…? → No, it isn't. I have it on Tuesdays answers When do you have…?", lv: 2 },
      { topic: "Unit 9 · Our Sports Day", type: "mc", q: "– When's your sports day? – It's in ___.", o: ["September", "Sunday", "sports", "seven"], x: "When's your sports day? asks about a month. September is a month. Sunday is a day and seven is a number.", lv: 1 },
      { topic: "Unit 9 · Our Sports Day", type: "fill", q: "Fill in the blank with one word. Our sports day is in the last month of the year. It's in ___.", ans: ["December"], x: "The year ends with October, November and December. December is the last month.", lv: 3 },
      { topic: "Unit 10 · Our Summer Holidays", type: "mc", q: "Last summer, I was on the ___. The sea was blue and beautiful.", o: ["beach", "campsite", "countryside", "village"], x: "The sea is next to the beach, so I was on the beach.", lv: 1 },
      { topic: "Unit 10 · Our Summer Holidays", type: "order", q: "Put the words in the correct order.", o: ["Were", "you", "in Sydney", "last", "summer?"], x: "A yes/no question about the past starts with Were: Were you in Sydney last summer?", lv: 3 },
      { topic: "Reading", type: "mc", q: "How many computer rooms are there at Phong's school?", o: ["There are two.", "There is one.", "There are three.", "It's in the town."], x: "The text says: It has three buildings, a garden and two computer rooms.", lv: 1, p: "phong" },
      { topic: "Reading", type: "tf", q: "Akio can play football very well.", a: false, x: "False. The text says: He can draw very well, but he can't play football.", lv: 2, p: "phong" },
      { topic: "Reading", type: "mc", q: "Today is Wednesday. Choose the correct sentence.", o: ["Phong has English today.", "Phong doesn't have English today.", "Phong has English on Tuesdays.", "Phong doesn't go to school today."], x: "Phong has English on Mondays, Wednesdays and Fridays. Today is Wednesday, so Phong has English today.", lv: 3, p: "phong" },
      { topic: "Reading", type: "mc", q: "Where was Lucy first?", o: ["In Phu Quoc", "In Ha Noi", "In Britain", "At Mai's birthday party"], x: "The text says: First, I was in Phu Quoc with my parents. Then Lucy was in Ha Noi.", lv: 1, p: "lucy" },
      { topic: "Reading", type: "tf", q: "Lucy was at Mai's birthday party in Ha Noi.", a: true, x: "True. Lucy visited Mai in Ha Noi and was at her birthday party.", lv: 2, p: "lucy" },
      { topic: "Reading", type: "mc", q: "When was Lucy in Ha Noi?", o: ["In August", "In May", "In July", "In March"], x: "Lucy was at Mai's birthday party in Ha Noi, and Mai's birthday is in August. So Lucy was in Ha Noi in August.", lv: 3, p: "lucy" }
    ]
  },

  /* ---------- Tiếng Anh 4 · Kiểm tra cuối năm học (Global Success 4 tập hai, Unit 11–20, Review 3, 4; Phiên N15) ----------
     Dạng đề kiểm tra ở trường như cuối kì I: chọn đáp án, phát âm (âm trong từ của Unit 11–15), trọng âm từ hai âm tiết (Unit
     16–20, lời dặn "Choose the word with a different stress pattern."), chọn từ khác loại, điền từ, sắp xếp câu, nối câu hỏi với câu
     trả lời, đọc hiểu. Không có câu nghe, không có câu tự luận. Từ, mẫu câu theo Book map (trang in 4–5) và các trang của từng Unit
     trong sách in năm 2026: ngôi thứ ba thêm -s, -es từ Unit 12; quá khứ chỉ có was, were (Unit 10) và "What was the weather
     like…?" (Unit 16); thì hiện tại tiếp diễn ở Unit 20. Câu và đoạn văn tự soạn, khác câu, bài đọc, bài hát của sách và câu của bài
     ôn IOE 4. Mỗi đề 25 câu, mỗi Unit 2–3 câu, Reading 3 câu một đoạn đọc (mức 1-2-3); 10 Biết, 8 Hiểu, 7 Vận dụng, chia đúng theo
     ma trận của đề ngẫu nhiên. Hai đề cùng các câu riêng của "ta4-ck2-ngau-nhien" bên dưới là kho của đề ngẫu nhiên; mã đoạn đọc
     không trùng nhau trong cả kho. */
  "ta4-ck2-de1": {
    note: "Global Success 4, Units 11–20: My Home, Jobs, Appearance, Daily Activities, My Family's Weekends, Weather, In the City, At the Shopping Centre, The Animal World, At Summer Camp. School test format: multiple choice, pronunciation and stress, odd one out, fill in the blank, word order, reading. 10 Know, 8 Understand and 7 Apply questions. No listening (practise listening in IOE 4). Every question has an explanation.",
    passages: {
      "vy": {
        title: "Read the text. Then answer the questions.",
        text: "Hi, I'm Vy. My home is in a town near Ha Noi. My father is a doctor. He works in the city. My mother works at my school. She is a music teacher. On Saturdays, my father does yoga, and my mother and I go to the bookshop. On Sundays, we visit my grandparents in the countryside."
      }
    },
    questions: [
      { topic: "Unit 11 · My Home", type: "mc", q: "– Where does your grandmother live? – She lives ___ Hang Bac Street.", o: ["in", "of", "to", "from"], x: "We use in with the name of a street: She lives in Hang Bac Street.", lv: 1 },
      { topic: "Unit 11 · My Home", type: "mc", q: "Choose the odd one out.", o: ["pupil", "quiet", "noisy", "big"], x: "Quiet, noisy and big tell us what a place is like. A pupil is a person.", lv: 2 },
      { topic: "Unit 12 · Jobs", type: "mc", q: "– What does Thu's mother do? – ___", o: ["She's a nurse.", "She's very nice.", "She's at home.", "She's forty."], x: "What does she do? asks about a job. A nurse is a job: She's a nurse.", lv: 1 },
      { topic: "Unit 12 · Jobs", type: "mc", q: "My father is ___ office worker, and my brother is ___ actor.", o: ["an / an", "a / an", "an / a", "a / a"], x: "Office starts with o, and actor starts with a, so we say an: an office worker, an actor.", lv: 2 },
      { topic: "Unit 13 · Appearance", type: "mc", q: "– What does Lan's mother look like? – ___", o: ["She's short and slim.", "She's a cook.", "She's at the cinema.", "She likes tennis."], x: "What does she look like? asks how a person looks. Short and slim tell us how she looks.", lv: 1 },
      { topic: "Unit 13 · Appearance", type: "order", q: "Put the words in the correct order.", o: ["My mother", "has long hair,", "and", "my father", "has a round face."], x: "Start with My mother and what she has, then and my father and what he has: My mother has long hair, and my father has a round face.", lv: 3 },
      { topic: "Unit 14 · Daily Activities", type: "mc", q: "– When do you have lunch? – ___ It's twelve o'clock.", o: ["At noon.", "In the morning.", "In the evening.", "At home."], x: "Twelve o'clock in the day is noon, so we say: At noon.", lv: 1 },
      { topic: "Unit 14 · Daily Activities", type: "mc", q: "Which word has the sound /ʃ/?", o: ["shop", "beach", "chicken", "lunch"], x: "The letters sh in shop have the sound /ʃ/. In beach, chicken and lunch, the letters ch have the sound /tʃ/.", lv: 2 },
      { topic: "Unit 15 · My Family's Weekends", type: "mc", q: "On Sundays, Ngoc and her mother buy food and clothes. Where do they go?", o: ["To the shopping centre.", "To the swimming pool.", "To the bookshop.", "To the zoo."], x: "We can buy food and clothes at the shopping centre.", lv: 1 },
      { topic: "Unit 15 · My Family's Weekends", type: "fill", q: "Write the correct form of the verb in brackets. On Saturdays, my brother ___ (play) badminton at the sports centre.", ans: ["plays"], x: "We say play badminton. My brother = he, so play → plays: My brother plays badminton.", lv: 3 },
      { topic: "Unit 16 · Weather", type: "mc", q: "– What was the weather like last weekend? – ___", o: ["It was sunny.", "It's Sunday.", "I was at home.", "Yes, it was."], x: "What was the weather like…? asks about the weather in the past, so we answer: It was sunny.", lv: 1 },
      { topic: "Unit 16 · Weather", type: "mc", q: "Choose the word with a different stress pattern.", o: ["today", "cloudy", "windy", "weather"], x: "In today /təˈdeɪ/, the stress is on the second syllable. In cloudy, windy and weather, it is on the first syllable.", lv: 2 },
      { topic: "Unit 17 · In the City", type: "mc", q: "– Where's the cinema? – It's behind you. ___", o: ["Turn round.", "Turn left.", "Go straight.", "Stop."], x: "The cinema is behind you, so you turn round to see it.", lv: 2 },
      { topic: "Unit 17 · In the City", type: "fill", q: "Fill in the blank with one word. Look at the road sign near the zoo. It ___ 'stop'. Let's stop here.", ans: ["says"], x: "A road sign says something. It is one thing, so say → says: It says 'stop'.", lv: 3 },
      { topic: "Unit 18 · At the Shopping Centre", type: "mc", q: "Seventy thousand dong is ___.", o: ["70 000 dong", "17 000 dong", "7 000 dong", "700 dong"], x: "Seventy is 70, and thousand is 1 000, so seventy thousand is 70 000.", lv: 1 },
      { topic: "Unit 18 · At the Shopping Centre", type: "mc", q: "Look: gift shop, toy shop, food stall, bookshop. – Where's the toy shop? – ___", o: ["It's between the gift shop and the food stall.", "It's between the food stall and the bookshop.", "It's opposite the bookshop.", "It's behind the gift shop."], x: "The toy shop comes after the gift shop and before the food stall, so it's between the gift shop and the food stall.", lv: 2 },
      { topic: "Unit 18 · At the Shopping Centre", type: "mc", q: "A pen is 10 000 dong, and a notebook is 15 000 dong. Mi wants to buy the pen and the notebook with 20 000 dong. Can she buy them?", o: ["No, she can't.", "Yes, she can.", "Yes, she does.", "No, she isn't."], x: "The pen and the notebook are 25 000 dong. That is more than 20 000 dong, so Mi can't buy them.", lv: 3 },
      { topic: "Unit 19 · The Animal World", type: "mc", q: "– What are these animals? – ___", o: ["They're crocodiles.", "It's a crocodile.", "They're crocodile.", "This is crocodiles."], x: "These animals are more than one animal, so we say They're + crocodiles.", lv: 1 },
      { topic: "Unit 19 · The Animal World", type: "order", q: "Put the words in the correct order.", o: ["My father", "likes horses", "because", "they are", "strong."], x: "We give the reason with because: My father likes horses because they are strong.", lv: 3 },
      { topic: "Unit 20 · At Summer Camp", type: "mc", q: "– What's she doing? – She's ___ a tent.", o: ["putting up", "playing", "telling", "singing"], x: "We say put up a tent: She's putting up a tent.", lv: 1 },
      { topic: "Unit 20 · At Summer Camp", type: "mc", q: "Choose the word with a different stress pattern.", o: ["guitar", "visit", "email", "photo"], x: "In guitar /ɡɪˈtɑː/, the stress is on the second syllable. In visit, email and photo, it is on the first syllable.", lv: 2 },
      { topic: "Unit 20 · At Summer Camp", type: "order", q: "Put the words in the correct order.", o: ["Tuan and Long", "are", "playing", "tug of war", "now."], x: "Tuan and Long = they, so we use are + playing: Tuan and Long are playing tug of war now.", lv: 3 },
      { topic: "Reading", type: "mc", q: "What does Vy's father do?", o: ["He's a doctor.", "He's a teacher.", "He's a farmer.", "He's a policeman."], x: "In the text: My father is a doctor. He works in the city.", lv: 1, p: "vy" },
      { topic: "Reading", type: "tf4", q: "Read the text again. Is each sentence true or false?", o: ["Vy's home is in a big city.", "Vy's mother is a maths teacher.", "Vy goes to the bookshop on Saturdays.", "Vy visits her grandparents on Sundays."], a: [false, false, true, true], x: "a) False: Vy's home is in a town near Ha Noi. b) False: Vy's mother is a music teacher. c) True: on Saturdays, Vy and her mother go to the bookshop. d) True: on Sundays, Vy's family visits her grandparents in the countryside.", lv: 2, p: "vy" },
      { topic: "Reading", type: "order", q: "Put the words in the correct order to answer the question: What does Vy's father do on Saturdays?", o: ["He", "does", "yoga", "on", "Saturdays."], x: "In the text: On Saturdays, my father does yoga. We talk about Vy's father with he: He does yoga on Saturdays.", lv: 3, p: "vy" }
    ]
  },

  /* Đề 2 (Phiên N15): cùng phạm vi, cùng ma trận với đề 1, câu và đoạn đọc khác. */
  "ta4-ck2-de2": {
    note: "Global Success 4, Units 11–20: My Home, Jobs, Appearance, Daily Activities, My Family's Weekends, Weather, In the City, At the Shopping Centre, The Animal World, At Summer Camp. School test format: multiple choice, pronunciation and stress, odd one out, fill in the blank, word order, reading. 10 Know, 8 Understand and 7 Apply questions. No listening (practise listening in IOE 4). Every question has an explanation.",
    passages: {
      "tim": {
        title: "Read the text. Then answer the questions.",
        text: "Dear Mum, I'm at a summer camp in Viet Nam with my friends. The campsite is near the beach. It's eight o'clock now. Bao is playing the guitar, and Daisy and Sophie are dancing. Our teacher is reading a story to the boys. I'm writing this email to you in my tent. Love, Tim"
      }
    },
    questions: [
      { topic: "Unit 11 · My Home", type: "mc", q: "Choose the correct question. – ___ – I live in Ba Trieu Street.", o: ["Where do you live?", "Where does he work?", "What's your street like?", "What do you do?"], x: "I live in… tells us where you live, so we ask: Where do you live?", lv: 1 },
      { topic: "Unit 11 · My Home", type: "mc", q: "Which word has the sound /iː/?", o: ["three", "sister", "fish", "listen"], x: "The letters ee in three have the sound /iː/. In sister, fish and listen, the letter i has the sound /ɪ/.", lv: 2 },
      { topic: "Unit 12 · Jobs", type: "mc", q: "– Where does Minh's father work? – He works at a ___. He's a doctor.", o: ["hospital", "cinema", "bookshop", "zoo"], x: "A doctor works at a hospital.", lv: 1 },
      { topic: "Unit 12 · Jobs", type: "mc", q: "Choose the odd one out.", o: ["factory", "farmer", "policeman", "actor"], x: "A farmer, a policeman and an actor are people with jobs. A factory is a place.", lv: 2 },
      { topic: "Unit 13 · Appearance", type: "mc", q: "My brother is not short. He is ___.", o: ["tall", "long", "windy", "cloudy"], x: "A person can be tall or short. Not short means tall: He is tall.", lv: 1 },
      { topic: "Unit 13 · Appearance", type: "fill", q: "Fill in the blank with one word. – What does your teacher look like? – She ___ a round face and long hair.", ans: ["has"], x: "We use has with face and hair. My teacher = she, so we say: She has a round face and long hair.", lv: 3 },
      { topic: "Unit 14 · Daily Activities", type: "mc", q: "On Sundays, I ___ the dishes with my brother.", o: ["wash", "draw", "play", "read"], x: "We wash the dishes: I wash the dishes with my brother.", lv: 1 },
      { topic: "Unit 14 · Daily Activities", type: "mc", q: "– What do you do in the afternoon? – ___", o: ["I clean the floor.", "In the afternoon.", "At three o'clock.", "Yes, I do."], x: "What do you do…? asks about an activity, not a time. I clean the floor tells us an activity.", lv: 2 },
      { topic: "Unit 15 · My Family's Weekends", type: "mc", q: "My dad ___ films on TV on Sunday evenings.", o: ["watches", "cooks", "goes", "stays"], x: "We watch films. My dad = he, so watch → watches: My dad watches films.", lv: 1 },
      { topic: "Unit 15 · My Family's Weekends", type: "order", q: "Put the words in the correct order.", o: ["Where", "do", "your grandparents", "go", "at the weekend?"], x: "A question about a place starts with Where. Your grandparents = they, so we use do: Where do your grandparents go at the weekend?", lv: 3 },
      { topic: "Unit 16 · Weather", type: "mc", q: "We can swim and have fun at the ___.", o: ["water park", "gift shop", "bookshop", "food stall"], x: "At a water park, we can swim and play in the water.", lv: 1 },
      { topic: "Unit 16 · Weather", type: "mc", q: "– Do you want to go to the food stall with me? – ___ I'm at my grandmother's house now.", o: ["Sorry, I can't.", "Great! Let's go.", "Yes, it is.", "They're at home."], x: "I'm not at home now, so I can't go. We say: Sorry, I can't.", lv: 2 },
      { topic: "Unit 17 · In the City", type: "mc", q: "Choose the word with a different stress pattern.", o: ["hotel", "bookshop", "campsite", "village"], x: "In hotel /həʊˈtel/, the stress is on the second syllable. In bookshop, campsite and village, it is on the first syllable.", lv: 2 },
      { topic: "Unit 17 · In the City", type: "mc", q: "Hoa is on her bike. First, she sees a road sign. It says 'turn left'. Then she sees a road sign. It says 'go straight'. What does Hoa do?", o: ["She turns left and then goes straight.", "She goes straight and then turns left.", "She turns right and then goes straight.", "She stops and goes home."], x: "The first sign says 'turn left', and the sign after it says 'go straight'. So Hoa turns left and then goes straight.", lv: 3 },
      { topic: "Unit 18 · At the Shopping Centre", type: "mc", q: "We buy bread at the ___.", o: ["bakery", "bookshop", "gift shop", "zoo"], x: "We can buy bread and cakes at a bakery.", lv: 1 },
      { topic: "Unit 18 · At the Shopping Centre", type: "mc", q: "– How much ___ the ball? – It's thirty thousand dong.", o: ["is", "are", "do", "does"], x: "The ball is one thing, so we ask: How much is the ball?", lv: 2 },
      { topic: "Unit 18 · At the Shopping Centre", type: "order", q: "Put the words in the correct order.", o: ["My mum", "wants to buy", "a skirt", "at the", "clothes shop."], x: "Start with the person, then wants to buy and the thing, then the place: My mum wants to buy a skirt at the clothes shop.", lv: 3 },
      { topic: "Unit 19 · The Animal World", type: "mc", q: "Lions ___ loudly.", o: ["roar", "dance", "swim", "read"], x: "We say lions roar loudly.", lv: 1 },
      { topic: "Unit 19 · The Animal World", type: "order", q: "Put the words in the correct order.", o: ["These birds", "are", "singing merrily", "in the", "garden."], x: "These birds = they, so we use are + singing: These birds are singing merrily in the garden.", lv: 3 },
      { topic: "Unit 20 · At Summer Camp", type: "mc", q: "At the campsite, my friends and I dance around the ___.", o: ["campfire", "photo", "story", "email"], x: "At a summer camp, we dance around the campfire.", lv: 1 },
      { topic: "Unit 20 · At Summer Camp", type: "mc", q: "– ___ – They're playing card games with their friends.", o: ["What are your brothers doing?", "What is your brother doing?", "What do your brothers like?", "What does your brother do?"], x: "They're + V-ing tells us what people are doing now. They = your brothers, so we ask: What are your brothers doing?", lv: 2 },
      { topic: "Unit 20 · At Summer Camp", type: "fill", q: "Fill in the blank with one word. Look! My father is ___ a photo of us.", ans: ["taking"], x: "We say take a photo. He is + V-ing: My father is taking a photo of us.", lv: 3 },
      { topic: "Reading", type: "mc", q: "Where is Tim now?", o: ["At a summer camp in Viet Nam.", "At home in Australia.", "At school in Viet Nam.", "At a bookshop in Ha Noi."], x: "In the text: I'm at a summer camp in Viet Nam with my friends.", lv: 1, p: "tim" },
      { topic: "Reading", type: "tf", q: "Bao is dancing.", a: false, x: "False. Daisy and Sophie are dancing. Bao is playing the guitar.", lv: 2, p: "tim" },
      { topic: "Reading", type: "mc", q: "Who is NOT at the summer camp?", o: ["Tim's mum", "Tim's teacher", "Daisy and Sophie", "Bao"], x: "Tim is writing an email to his mum, so she is not at the camp. The teacher, Daisy, Sophie and Bao are at the camp with Tim.", lv: 3, p: "tim" }
    ]
  },

  /* ---------- Tiếng Anh 4 · Đề ngẫu nhiên cuối năm: câu riêng của ngân hàng (Phiên N15) ----------
     Kho câu của đề ngẫu nhiên = 24 câu dưới đây + 50 câu của hai đề cố định ở trên (mọi câu có lv). Ma trận trong
     data/banks/index.js: mỗi lần rút 25 câu, 10 Biết, 8 Hiểu, 7 Vận dụng; mỗi Unit 2–3 câu, Reading 3 câu (một đoạn 3 câu mức
     1-2-3); ô (chủ đề, mức) nào cũng có ít nhất gấp đôi số câu ô đó rút. Câu riêng chỉ nằm ở ô ma trận có rút câu, cùng một đoạn
     đọc 3 câu đủ ba mức. Câu và đoạn văn tự soạn. */
  "ta4-ck2-ngau-nhien": {
    note: "Global Success 4, Units 11–20. Each test has 2–3 questions for each unit and 3 reading questions: 10 Know, 8 Understand and 7 Apply. No listening (practise listening in IOE 4). Every question has an explanation.",
    passages: {
      "nga": {
        title: "Read the text. Then answer the questions.",
        text: "Hi, I'm Nga. My grandfather is a cook at a nursing home. He works there every day, but not at the weekend. Every Saturday, my class and I go to the nursing home, too. We sing songs and dance for the old people there, and my friend Hung tells a story. The old people like our songs very much."
      }
    },
    questions: [
      { topic: "Unit 11 · My Home", type: "mc", q: "– Where do you live? – I live at 18 Ly Thuong Kiet ___.", o: ["Street", "City", "Village", "Town"], x: "A house number goes with a street: at 18 Ly Thuong Kiet Street.", lv: 1 },
      { topic: "Unit 11 · My Home", type: "mc", q: "– What's your village like, Khoa? – ___", o: ["It's small and quiet.", "It's near Ha Long Bay.", "I'm from Viet Nam.", "Yes, it is."], x: "What's … like? asks what a place is like, so we answer: It's small and quiet.", lv: 2 },
      { topic: "Unit 12 · Jobs", type: "mc", q: "– Where does your grandfather work? – He works ___ a big farm.", o: ["on", "to", "of", "with"], x: "We use on with a farm: on a farm.", lv: 1 },
      { topic: "Unit 12 · Jobs", type: "match", q: "Match the questions with the answers.", l: ["What does Duc's sister do?", "Where does she work?", "Is she nice?"], r: ["She's an office worker.", "In an office.", "Yes, she is.", "Yes, it is."], x: "What does she do? asks about a job: She's an office worker. Where does she work? asks about a place: In an office. Is she…? → Yes, she is.", lv: 2 },
      { topic: "Unit 12 · Jobs", type: "mc", q: "Which word has the sound /ɜː/, like ur in nurse?", o: ["girl", "car", "garden", "party"], x: "The letters ir in girl sound like ur in nurse: /ɜː/. Car, garden and party have the sound /ɑː/, like ar in farmer.", lv: 2 },
      { topic: "Unit 13 · Appearance", type: "mc", q: "We see with our ___.", o: ["eyes", "hands", "legs", "hair"], x: "We see with our eyes.", lv: 1 },
      { topic: "Unit 13 · Appearance", type: "fill", q: "Fill in the blank with one word. Ha's father has black hair and a round ___.", ans: ["face"], x: "We say a round face: Ha's father has black hair and a round face.", lv: 3 },
      { topic: "Unit 14 · Daily Activities", type: "mc", q: "– When do you go to the swimming pool, Lan? – ___", o: ["In the evening.", "At home.", "With my friends.", "Yes, I do."], x: "When asks about the time, so we answer with a time: In the evening.", lv: 1 },
      { topic: "Unit 14 · Daily Activities", type: "mc", q: "Which one is housework?", o: ["clean the floor", "read books", "do yoga", "play the piano"], x: "Housework is work in the house: we clean the floor at home.", lv: 2 },
      { topic: "Unit 15 · My Family's Weekends", type: "mc", q: "– What does Quan's brother do on Saturdays? – ___", o: ["He helps with the cooking.", "He's twelve years old.", "In a flat in Hue.", "Yes, he does."], x: "What does he do on Saturdays? asks about an activity: He helps with the cooking.", lv: 1 },
      { topic: "Unit 15 · My Family's Weekends", type: "mc", q: "Phong reads books at home on Saturdays. His sister swims at the sports centre every Sunday. Today is Sunday. Where is Phong's sister now?", o: ["At the sports centre.", "At home.", "At the bookshop.", "At the cinema."], x: "Phong's sister swims at the sports centre every Sunday, and today is Sunday. So she is at the sports centre now.", lv: 3 },
      { topic: "Unit 16 · Weather", type: "mc", q: "– What's the weather like now? – ___", o: ["It's windy.", "It was windy.", "It's Monday.", "Yes, it is."], x: "Now is not the past, so we say It's, not It was: It's windy.", lv: 1 },
      { topic: "Unit 16 · Weather", type: "mc", q: "Choose the odd one out.", o: ["supermarket", "windy", "rainy", "cloudy"], x: "Windy, rainy and cloudy tell us about the weather. A supermarket is a place.", lv: 2 },
      { topic: "Unit 17 · In the City", type: "mc", q: "Choose the best answer. – How can I get to the zoo? – ___", o: ["Go straight and turn right.", "Go straight and turns right.", "Goes straight and turn right.", "Going straight and turn right."], x: "To tell the way, we use go and turn without -s and without -ing: Go straight and turn right.", lv: 2 },
      { topic: "Unit 17 · In the City", type: "order", q: "Put the words in the correct order.", o: ["What", "does", "this road sign", "say?"], x: "We ask about a sign with What does … say?: What does this road sign say?", lv: 3 },
      { topic: "Unit 18 · At the Shopping Centre", type: "mc", q: "Choose the word with a different stress pattern.", o: ["behind", "office", "hippo", "tennis"], x: "In behind /bɪˈhaɪnd/, the stress is on the second syllable. In office, hippo and tennis, it is on the first syllable.", lv: 2 },
      { topic: "Unit 18 · At the Shopping Centre", type: "mc", q: "A pen is 12 000 dong, a ruler is 5 000 dong and a book is 25 000 dong. With 10 000 dong, what can Phong buy?", o: ["a ruler", "a book", "a pen and a ruler", "a book and a ruler"], x: "The ruler is 5 000 dong. The pen is 12 000 dong and the book is 25 000 dong, so they are more than 10 000 dong. A pen and a ruler are 17 000 dong. So Phong can buy the ruler.", lv: 3 },
      { topic: "Unit 19 · The Animal World", type: "mc", q: "– ___ – They're horses.", o: ["What are these animals?", "What is this animal?", "Why do you like horses?", "Where are the horses?"], x: "They're horses tells us what the animals are, so we ask: What are these animals?", lv: 1 },
      { topic: "Unit 19 · The Animal World", type: "fill", q: "Write the correct form of the word in brackets. Peacocks dance ___ (beautiful).", ans: ["beautifully"], x: "We add -ly to beautiful to say how they dance: They dance beautifully.", lv: 3 },
      { topic: "Unit 20 · At Summer Camp", type: "mc", q: "My brother is ___ a campfire with our teacher.", o: ["building", "telling", "singing", "playing"], x: "We say build a campfire: My brother is building a campfire.", lv: 1 },
      { topic: "Unit 20 · At Summer Camp", type: "order", q: "Put the words in the correct order.", o: ["My sister", "is", "singing", "songs", "with her friends."], x: "My sister = she, so we use is + singing: My sister is singing songs with her friends.", lv: 3 },
      { topic: "Reading", type: "mc", q: "Where does Nga's grandfather work?", o: ["At a nursing home.", "At a school.", "At a cinema.", "At a bookshop."], x: "In the text: My grandfather is a cook at a nursing home.", lv: 1, p: "nga" },
      { topic: "Reading", type: "tf", q: "Nga goes to the nursing home on Sundays.", a: false, x: "False. Nga and her class go there every Saturday.", lv: 2, p: "nga" },
      { topic: "Reading", type: "mc", q: "How many days does Nga's grandfather work in a week?", o: ["five days", "two days", "six days", "seven days"], x: "There are seven days in a week and two days at the weekend. 7 − 2 = 5, so he works five days.", lv: 3, p: "nga" }
    ]
  }
});
