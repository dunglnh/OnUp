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
  }
});
