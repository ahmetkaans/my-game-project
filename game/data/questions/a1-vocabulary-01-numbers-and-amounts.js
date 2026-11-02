/* Questions: A1 Vocabulary, theme 01 "Numbers and Amounts" (16 quizzes). One entry per quiz.
   Key: "level|category|topicIndex|type|difficulty" (e.g. "A1|vocabulary|0|mc|easy"). Value: an array of question
   objects; shapes in README.md "Question types". The correct answer is stored first (options[0], bank[0]); the
   game shuffles. A key that is missing gets lorem ipsum questions.
   The part between "Object.assign(GAME_DATA.questions, " and the closing ");" must stay valid JSON: it is read by
   .gitignore/tools/check_questions.ps1. The file name is level, category, topic number and topic name in lower case. */
Object.assign(GAME_DATA.questions, {
  "A1|vocabulary|1|mc|easy": [
    { "type": "mc", "prompt": "The teacher says, \"Open your book at page 1.\" That is page ___.", "options": ["one", "four", "seven", "nine"], "target": "one", "targetType": "number", "explanation": "The number 1 is \"one\". Page one is the first page of the book." },
    { "type": "mc", "prompt": "People have ___ hands.", "options": ["two", "five", "eight", "ten"], "explanation": "We have a left hand and a right hand. That is two hands." },
    { "type": "mc", "prompt": "Ken has an apple, a banana and an egg in his bag. He has ___ things in his bag.", "options": ["three", "six", "eight", "ten"], "explanation": "An apple, a banana and an egg are three things." },
    { "type": "mc", "prompt": "A cat has ___ legs.", "options": ["four", "two", "six", "nine"], "explanation": "A cat walks on four legs. A person has two legs." },
    { "type": "mc", "prompt": "Mia has pens: red, blue, green, pink and black. She has ___ pens.", "options": ["five", "two", "three", "seven"], "explanation": "Red, blue, green, pink and black are five colors, so Mia has five pens." },
    { "type": "mc", "prompt": "Ali takes bus 6 to school. He takes bus ___.", "options": ["six", "one", "three", "ten"], "explanation": "The number 6 is \"six\"." },
    { "type": "mc", "prompt": "A week has ___ days.", "options": ["seven", "three", "four", "nine"], "explanation": "A week has seven days: Monday, Tuesday, Wednesday, Thursday, Friday, Saturday and Sunday." },
    { "type": "mc", "prompt": "The book is $8. It is ___ dollars.", "options": ["eight", "two", "five", "six"], "explanation": "The number 8 is \"eight\". The book is eight dollars." }
  ],
  "A1|vocabulary|1|mc|medium": [
    { "type": "mc", "prompt": "January is the ___ month of the year.", "options": ["first", "second", "third", "fourth"], "target": "first", "targetType": "number", "explanation": "January comes first in the year, so it is the first month." },
    { "type": "mc", "prompt": "Ali, Ken and Tom run to school. Ali is 1st and Ken is 2nd. Ken is ___.", "options": ["second", "first", "third", "fifth"], "target": "second", "targetType": "number", "explanation": "Ali is first. Ken comes next after Ali, so he is second." },
    { "type": "mc", "prompt": "Sam lives on the 3rd floor. He lives on the ___ floor.", "options": ["third", "second", "fourth", "fifth"], "explanation": "We write 3rd and we say \"third\"." },
    { "type": "mc", "prompt": "Today is July 4th. It is the ___ of July.", "options": ["fourth", "third", "fifth", "first"], "explanation": "We write 4th and we say \"fourth\". July 4th is the fourth day of July." },
    { "type": "mc", "prompt": "Anna writes her phone ___ on the paper: 555-0182.", "options": ["number", "name", "address", "email"], "explanation": "A phone number has numbers in it. Anna writes them on the paper." },
    { "type": "mc", "prompt": "Maria cuts a pizza in two. The two parts look the same. Each part is a ___.", "options": ["half", "quarter", "pair", "number"], "target": "half", "targetType": "noun", "explanation": "Each of two parts that look the same is a half. A quarter is one of four parts." },
    { "type": "mc", "prompt": "Anna buys new shoes. One shoe is for each foot, so she buys a ___ of shoes.", "options": ["pair", "mile", "meter", "quarter"], "explanation": "A pair is two things that go together, like two shoes." },
    { "type": "mc", "prompt": "Ali walks to school every day. It is 2 ___ and takes him one hour.", "options": ["miles", "meters", "pairs", "numbers"], "target": "mile", "explanation": "A meter is very short, but Ali walks for one hour. A mile is a long way, so it is two miles." }
  ],
  "A1|vocabulary|1|mc|hard": [
    { "type": "mc", "prompt": "The movie starts at 11:15. Ben says, \"Oh! It starts at ___ fifteen!\"", "options": ["eleven", "twelve", "ten", "twenty"], "explanation": "We say 11:15 \"eleven fifteen\". The number 11 is \"eleven\"." },
    { "type": "mc", "prompt": "A year has ___ months.", "options": ["twelve", "eleven", "thirteen", "ten"], "explanation": "A year has twelve months, from January to December." },
    { "type": "mc", "prompt": "Emma opens her birthday card. It says, \"Happy birthday! You are 13 today!\" Emma says, \"Yes, I am ___!\"", "options": ["thirteen", "thirty", "twelve", "fourteen"], "explanation": "The number 13 ends with \"-teen\": thirteen. The number 30 ends with \"-ty\": thirty." },
    { "type": "mc", "prompt": "The teacher says, \"Go to room 14.\" Tom says, \"OK, room ___.\"", "options": ["fourteen", "forty", "fifteen", "thirteen"], "explanation": "The number 14 ends with \"-teen\": fourteen. The number 40 is \"forty\"." },
    { "type": "mc", "prompt": "The bus comes at 8:15. It comes at eight ___.", "options": ["fifteen", "fifty", "fourteen", "sixteen"], "explanation": "We say 8:15 \"eight fifteen\". The number 15 is \"fifteen\" and the number 50 is \"fifty\"." },
    { "type": "mc", "prompt": "The teacher says, \"Open your books at page 16.\" Anna says, \"Page ___?\"", "options": ["sixteen", "sixty", "fifteen", "seventeen"], "explanation": "The number 16 ends with \"-teen\": sixteen. The number 60 ends with \"-ty\": sixty." },
    { "type": "mc", "prompt": "The big building has 18 floors. It has ___ floors.", "options": ["eighteen", "eighty", "seventeen", "nineteen"], "explanation": "In 18, the 1 comes first and the 8 comes next: eighteen. In 80, the 8 comes first: eighty." },
    { "type": "mc", "prompt": "The pizza is $20. It is ___ dollars.", "options": ["twenty", "twelve", "thirty", "nineteen"], "explanation": "The number 20 is \"twenty\". It has no \"-teen\" at the end." }
  ],
  "A1|vocabulary|1|mc|veryhard": [
    { "type": "mc", "prompt": "Ali says, \"The bag is $30.\" Anna says, \"OK, ___ dollars.\"", "options": ["thirty", "thirteen", "forty", "twenty"], "explanation": "The number 30 ends with \"-ty\": thirty. The number 13 ends with \"-teen\": thirteen." },
    { "type": "mc", "prompt": "The bus is late! It is 6:40. Ali says, \"It is six ___!\"", "options": ["forty", "fourteen", "fifty", "thirty"], "explanation": "We say 6:40 \"six forty\". Forty has no \"u\"." },
    { "type": "mc", "prompt": "Mia says, \"My class is big. It has 50 students.\" Ken says, \"Oh, ___ students!\"", "options": ["fifty", "fifteen", "sixty", "forty"], "explanation": "The number 50 ends with \"-ty\": fifty. The number 15 ends with \"-teen\": fifteen." },
    { "type": "mc", "prompt": "A minute has ___ seconds.", "options": ["sixty", "sixteen", "fifty", "seventy"], "explanation": "A minute has sixty seconds. The number 60 is \"sixty\" and the number 16 is \"sixteen\"." },
    { "type": "mc", "prompt": "Mia says, \"My grandmother is 70.\" Ken says, \"Oh, she is ___!\"", "options": ["seventy", "seventeen", "sixty", "eighty"], "explanation": "The number 70 ends with \"-ty\": seventy. The number 17 ends with \"-teen\": seventeen." },
    { "type": "mc", "prompt": "The city is 80 miles from here. It is ___ miles.", "options": ["eighty", "eighteen", "seventy", "ninety"], "explanation": "In 80, the 8 comes first: eighty. In 18, the 1 comes first and the 8 comes next: eighteen." },
    { "type": "mc", "prompt": "The test is 90 minutes long. It is ___ minutes.", "options": ["ninety", "nineteen", "eighty", "seventy"], "explanation": "The number 90 is \"ninety\". The number 19 is \"nineteen\" and ends with \"-teen\"." },
    { "type": "mc", "prompt": "The new bike costs $1,000. It costs one ___ dollars.", "options": ["thousand", "hundred", "million", "ten"], "explanation": "One thousand is 1,000. One hundred is only 100, and one million is a very big number." }
  ],
  "A1|vocabulary|1|fill|easy": [
    { "type": "fill", "before": "Mia's bus is number 1. She takes bus", "after": ".", "answer": "one", "bank": ["one", "five", "nine"], "target": "one", "targetType": "number", "explanation": "The number 1 is \"one\". Mia takes bus one." },
    { "type": "fill", "before": "One, two,", "after": ", four.", "answer": "three", "bank": ["three", "eight", "ten"], "explanation": "The numbers go: one, two, three, four." },
    { "type": "fill", "before": "The bus leaves at 5:30. It leaves at", "after": "thirty.", "answer": "five", "bank": ["five", "seven", "ten"], "explanation": "We say 5:30 \"five thirty\". The number 5 is \"five\"." },
    { "type": "fill", "before": "Open your book at page 6. Please read page", "after": ".", "answer": "six", "bank": ["six", "three", "eight"], "explanation": "The number 6 is \"six\"." },
    { "type": "fill", "before": "Ali lives at 7 Park Street. He lives at number", "after": "Park Street.", "answer": "seven", "bank": ["seven", "one", "nine"], "explanation": "The number 7 is \"seven\". Ali lives at number seven." },
    { "type": "fill", "before": "Mia's phone number is 555-0128. The last number is", "after": ".", "answer": "eight", "bank": ["eight", "three", "five"], "explanation": "The last number in 555-0128 is 8, and 8 is \"eight\"." },
    { "type": "fill", "before": "The class has 9 boys. There are", "after": "boys in the class.", "answer": "nine", "bank": ["nine", "six", "ten"], "explanation": "The number 9 is \"nine\"." },
    { "type": "fill", "before": "Tom says the numbers: eight, nine,", "after": ".", "answer": "ten", "bank": ["ten", "five", "one"], "explanation": "After nine comes ten." }
  ],
  "A1|vocabulary|1|fill|medium": [
    { "type": "fill", "before": "Sam lives on floor 3. It is the", "after": "floor.", "answer": "third", "bank": ["third", "first", "fifth"], "explanation": "Floor 3 is the third floor. We write 3rd and we say \"third\"." },
    { "type": "fill", "before": "Tom lives at 12 Green Street. His house", "after": "is 12.", "answer": "number", "bank": ["number", "name", "color"], "explanation": "A house number tells us where a house is on the street. Tom's house number is 12." },
    { "type": "fill", "before": "Ken and Mia run to school. Ken is 3rd and Mia is 4th. Mia is", "after": ".", "answer": "fourth", "bank": ["fourth", "second", "fifth"], "explanation": "Ken is third and Mia comes next, so she is fourth." },
    { "type": "fill", "before": "Maria cuts a cake in four parts that look the same. Each part is a", "after": ".", "answer": "quarter", "bank": ["quarter", "half", "pair"], "explanation": "Each of four parts that look the same is a quarter. Two of them make a half." },
    { "type": "fill", "before": "Maria's birthday is on May 5th. It is on May", "after": ".", "answer": "fifth", "bank": ["fifth", "third", "fourth"], "explanation": "We write 5th and we say \"fifth\". We say \"May fifth\"." },
    { "type": "fill", "before": "Ken has two new shoes. They are a", "after": "of shoes.", "answer": "pair", "bank": ["pair", "mile", "meter"], "explanation": "A pair is two things that go together, like two shoes." },
    { "type": "fill", "before": "A door is about two", "after": "tall.", "answer": "meters", "bank": ["meters", "miles", "numbers"], "target": "meter", "explanation": "A door is not very tall, so it is two meters, not two miles." },
    { "type": "fill", "before": "The bus goes 60", "after": "in one hour.", "answer": "miles", "bank": ["miles", "meters", "pairs"], "target": "mile", "explanation": "A bus goes a long way in one hour. A mile is much longer than a meter, so the bus goes 60 miles." }
  ],
  "A1|vocabulary|1|fill|hard": [
    { "type": "fill", "before": "Ten,", "after": ", twelve.", "answer": "eleven", "bank": ["eleven", "thirteen", "fifteen", "twenty"], "explanation": "The numbers go: ten, eleven, twelve." },
    { "type": "fill", "before": "It is 12:30. It is", "after": "thirty.", "answer": "twelve", "bank": ["twelve", "ten", "nineteen", "fourteen"], "explanation": "We say 12:30 \"twelve thirty\". The number 12 is \"twelve\"." },
    { "type": "fill", "before": "Ken says, \"I am in room 13.\" Mia asks, \"Room", "after": "?\"", "answer": "thirteen", "bank": ["thirteen", "thirty", "fourteen", "eleven"], "explanation": "The number 13 ends with \"-teen\": thirteen. The number 30 ends with \"-ty\": thirty." },
    { "type": "fill", "before": "The teacher says, \"Read page 14.\" Mia says, \"Page", "after": "?\"", "answer": "fourteen", "bank": ["fourteen", "forty", "sixteen", "twelve"], "explanation": "The number 14 ends with \"-teen\": fourteen. The number 40 is \"forty\"." },
    { "type": "fill", "before": "Ali says, \"The test is 15 minutes long.\" Ken says, \"OK,", "after": "minutes.\"", "answer": "fifteen", "bank": ["fifteen", "fifty", "fourteen", "eleven"], "explanation": "The number 15 is \"fifteen\" and the number 50 is \"fifty\"." },
    { "type": "fill", "before": "The big hotel has 17 floors. It has", "after": "floors.", "answer": "seventeen", "bank": ["seventeen", "seventy", "eighteen", "sixteen"], "explanation": "In 17, the 1 comes first: seventeen. In 70, the 7 comes first: seventy." },
    { "type": "fill", "before": "The ticket is $19. It is", "after": "dollars.", "answer": "nineteen", "bank": ["nineteen", "ninety", "eleven", "twelve"], "explanation": "The number 19 ends with \"-teen\": nineteen. The number 90 is \"ninety\"." },
    { "type": "fill", "before": "Eighteen, nineteen,", "after": ".", "answer": "twenty", "bank": ["twenty", "twelve", "thirty", "fifteen"], "explanation": "The numbers go: eighteen, nineteen, twenty." }
  ],
  "A1|vocabulary|1|fill|veryhard": [
    { "type": "fill", "before": "Ten, twenty,", "after": ", forty.", "answer": "thirty", "bank": ["thirty", "thirteen", "fifty", "sixty"], "explanation": "The numbers go up by tens: ten, twenty, thirty, forty." },
    { "type": "fill", "before": "Mia says, \"The bag is $40.\" Ali says, \"OK,", "after": "dollars.\"", "answer": "forty", "bank": ["forty", "fourteen", "fifty", "thirty"], "explanation": "The number 40 is \"forty\". Forty has no \"u\"." },
    { "type": "fill", "before": "Half of 100 is", "after": ".", "answer": "fifty", "bank": ["fifty", "fifteen", "forty", "sixty"], "explanation": "One of two same parts of 100 is 50, and 50 is \"fifty\"." },
    { "type": "fill", "before": "An hour has", "after": "minutes.", "answer": "sixty", "bank": ["sixty", "sixteen", "seventy", "fifty"], "explanation": "An hour has sixty minutes. The number 60 is \"sixty\"." },
    { "type": "fill", "before": "Ken says, \"The bus has 70 students.\" Mia says, \"Oh,", "after": "students!\"", "answer": "seventy", "bank": ["seventy", "seventeen", "sixty", "eighty"], "explanation": "The number 70 is \"seventy\". The number 17 is \"seventeen\"." },
    { "type": "fill", "before": "Eighty,", "after": ", one hundred.", "answer": "ninety", "bank": ["ninety", "nineteen", "forty", "seventy"], "explanation": "The numbers go up by tens: eighty, ninety, one hundred." },
    { "type": "fill", "before": "The old tree is 100 years old. It is one", "after": "years old.", "answer": "hundred", "bank": ["hundred", "thousand", "million", "seventy"], "explanation": "The number 100 is \"one hundred\". One thousand is much more than that." },
    { "type": "fill", "before": "The city has 1,000,000 people. It has a", "after": "people.", "answer": "million", "bank": ["million", "hundred", "thousand", "ninety"], "explanation": "The number 1,000,000 is \"one million\". A million is much more than a thousand." }
  ],
  "A1|vocabulary|1|tf|easy": [
    { "type": "tf", "prompt": "A weekend has two days.", "answer": true, "target": "two", "explanation": "A weekend is Saturday and Sunday. That is two days." },
    { "type": "tf", "prompt": "We say \"three\" for the number 4.", "answer": false, "target": "three", "explanation": "The number 3 is \"three\". The number 4 is \"four\"." },
    { "type": "tf", "prompt": "Four is bigger than 5.", "answer": false, "target": "four", "explanation": "Five comes after four, so four is smaller than 5." },
    { "type": "tf", "prompt": "The number before 7 is \"six\".", "answer": true, "target": "six", "explanation": "The numbers go: five, six, seven. Six comes before seven." },
    { "type": "tf", "prompt": "Seven is more than 6.", "answer": true, "target": "seven", "explanation": "Seven comes after six, so it is more than 6." },
    { "type": "tf", "prompt": "Eight comes before 7.", "answer": false, "target": "eight", "explanation": "The numbers go: seven, eight. Eight comes after seven." },
    { "type": "tf", "prompt": "The number 9 is \"nine\".", "answer": true, "target": "nine", "explanation": "We write 9 and we say \"nine\"." },
    { "type": "tf", "prompt": "A baby is ten years old.", "answer": false, "target": "ten", "explanation": "A baby is very young. A child of ten years is not a baby." }
  ],
  "A1|vocabulary|1|tf|medium": [
    { "type": "tf", "prompt": "January is the fifth month of the year.", "answer": false, "target": "fifth", "explanation": "January is the first month, not the fifth." },
    { "type": "tf", "prompt": "We write 1st and we say \"first\".", "answer": true, "target": "first", "targetType": "number", "explanation": "The number 1 is \"one\", and 1st is \"first\"." },
    { "type": "tf", "prompt": "In a line, the person after the first one is second.", "answer": true, "target": "second", "targetType": "number", "explanation": "The first person is first. The next person is second." },
    { "type": "tf", "prompt": "In a line of three people, Tom is fourth.", "answer": false, "target": "fourth", "explanation": "A line of three people has a first, a second and a third person. There is no fourth." },
    { "type": "tf", "prompt": "\"Number\" means a kind of fruit.", "answer": false, "target": "number", "explanation": "A number is something like 7 or 15 that tells how many. It is not a fruit." },
    { "type": "tf", "prompt": "Half of 10 is 5.", "answer": true, "target": "half", "targetType": "noun", "explanation": "Five and five is ten, so 5 is half of 10." },
    { "type": "tf", "prompt": "A quarter is one of two parts that look the same.", "answer": false, "target": "quarter", "explanation": "A quarter is one of four parts that look the same. One of two parts is a half." },
    { "type": "tf", "prompt": "A meter is shorter than a mile.", "answer": true, "target": "meter", "explanation": "A mile is a long way. A meter is much shorter." }
  ],
  "A1|vocabulary|1|tf|hard": [
    { "type": "tf", "prompt": "The number after 10 is \"eleven\".", "answer": true, "target": "eleven", "explanation": "The numbers go: ten, eleven, twelve." },
    { "type": "tf", "prompt": "Twelve is more than 11.", "answer": true, "target": "twelve", "explanation": "Twelve comes after eleven, so it is more than 11." },
    { "type": "tf", "prompt": "We say \"fourteen\" for the number 40.", "answer": false, "target": "fourteen", "explanation": "The number 14 is \"fourteen\" and the number 40 is \"forty\"." },
    { "type": "tf", "prompt": "Sixteen ends with \"-teen\".", "answer": true, "target": "sixteen", "explanation": "The numbers 13 to 19 end with \"-teen\": sixteen, seventeen, eighteen." },
    { "type": "tf", "prompt": "We write \"seventeen\" as 71.", "answer": false, "target": "seventeen", "explanation": "Seventeen is 17. The number 71 is \"seventy-one\"." },
    { "type": "tf", "prompt": "Eighteen is smaller than 17.", "answer": false, "target": "eighteen", "explanation": "Seventeen comes before eighteen, so eighteen is more than 17." },
    { "type": "tf", "prompt": "Nineteen comes before 20.", "answer": true, "target": "nineteen", "explanation": "The numbers go: nineteen, twenty. Nineteen comes before twenty." },
    { "type": "tf", "prompt": "Twenty ends with \"-teen\".", "answer": false, "target": "twenty", "explanation": "Twenty ends with \"-ty\". Only the numbers 13 to 19 end with \"-teen\"." }
  ],
  "A1|vocabulary|1|tf|veryhard": [
    { "type": "tf", "prompt": "The word \"forty\" has a \"u\".", "answer": false, "target": "forty", "explanation": "Forty has no \"u\". The word \"fourteen\" has a \"u\"." },
    { "type": "tf", "prompt": "Fifty ends with \"-teen\".", "answer": false, "target": "fifty", "explanation": "Fifty ends with \"-ty\". Fifteen ends with \"-teen\"." },
    { "type": "tf", "prompt": "The numbers go by tens: 60, seventy, 80.", "answer": true, "target": "seventy", "explanation": "We say 70 \"seventy\". It comes after 60 and before 80." },
    { "type": "tf", "prompt": "Eighty is smaller than 70.", "answer": false, "target": "eighty", "explanation": "Seventy comes before eighty, so eighty is more than 70." },
    { "type": "tf", "prompt": "Ninety ends with \"-ty\".", "answer": true, "target": "ninety", "explanation": "Ninety ends with \"-ty\". Nineteen ends with \"-teen\"." },
    { "type": "tf", "prompt": "A hundred is more than 90.", "answer": true, "target": "hundred", "explanation": "Ninety comes before a hundred, so a hundred is more than 90." },
    { "type": "tf", "prompt": "We say \"one thousand\" for the number 100.", "answer": false, "target": "thousand", "explanation": "The number 100 is \"one hundred\". The number 1,000 is \"one thousand\"." },
    { "type": "tf", "prompt": "The number 1,000,000 is \"one million\".", "answer": true, "target": "million", "explanation": "We say 1,000,000 \"one million\". It is a very big number." }
  ],
  "A1|vocabulary|1|match|easy": [
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "one", "right": "the number of heads people have", "type": "number" },
      { "left": "two", "right": "the number of eyes people have" },
      { "left": "four", "right": "the number of spring, summer, fall and winter" },
      { "left": "nine", "right": "the number before 10" }
    ], "explanation": "People have one head and two eyes. Spring, summer, fall and winter are four, and nine comes before ten." },
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "five", "right": "the number of school days from Monday to Friday" },
      { "left": "six", "right": "the number before 7" },
      { "left": "eight", "right": "the number after 7" },
      { "left": "ten", "right": "the number after 9" }
    ], "explanation": "Monday, Tuesday, Wednesday, Thursday and Friday are five days. Six comes before seven, and eight comes after seven. Ten comes after nine." }
  ],
  "A1|vocabulary|1|match|medium": [
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "second", "right": "the place of the letter B in A, B, C", "type": "number" },
      { "left": "half", "right": "the part of a class of 20 students that is 10 students", "type": "noun" },
      { "left": "pair", "right": "two people who do something together, like two friends" },
      { "left": "mile", "right": "how we say how far a person runs, like 3 of them in the park" }
    ], "explanation": "B is the second letter. Ten of twenty students is half of the class. Two friends who do something together are a pair, and people can run a mile or more." },
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "third", "right": "the place of the letter C in A, B, C" },
      { "left": "fifth", "right": "the place of the letter E in A, B, C, D, E" },
      { "left": "quarter", "right": "the part of an hour that is 15 minutes" },
      { "left": "meter", "right": "how long a room is: a room can be 4 of them long" }
    ], "explanation": "C is the third letter and E is the fifth letter. Fifteen minutes is a quarter of an hour. A meter is a short way, so a room can be 4 meters long." }
  ],
  "A1|vocabulary|1|match|hard": [
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "twelve", "right": "the number of hours in half a day" },
      { "left": "fifteen", "right": "the number on page 15 of a book" },
      { "left": "seventeen", "right": "the number before 18" },
      { "left": "twenty", "right": "the number after 19" }
    ], "explanation": "A day has twenty-four hours, so half a day is twelve hours. Page 15 has the number fifteen. Seventeen comes before 18, and twenty comes after 19." },
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "thirteen", "right": "one more than 12" },
      { "left": "sixteen", "right": "8 and 8 together" },
      { "left": "eighteen", "right": "the number on a hotel door: room 18" },
      { "left": "nineteen", "right": "the number before 20" }
    ], "explanation": "Thirteen is one more than 12. Eight and eight together are sixteen. Room 18 is room eighteen, and nineteen comes before 20." }
  ],
  "A1|vocabulary|1|match|veryhard": [
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "thirty", "right": "the number of days in April" },
      { "left": "seventy", "right": "the number after 69" },
      { "left": "hundred", "right": "the most points you can get on a test: 100" },
      { "left": "million", "right": "500,000 and 500,000 together" }
    ], "explanation": "April has thirty days. Seventy comes after 69. The most points you can get on a test is a hundred, and 500,000 and 500,000 together are a million." },
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "sixty", "right": "the number after 59" },
      { "left": "eighty", "right": "the price of a coat that costs $80" },
      { "left": "ninety", "right": "the number after 89" },
      { "left": "thousand", "right": "500 and 500 together" }
    ], "explanation": "Sixty comes after 59, and ninety comes after 89. A coat that costs $80 costs eighty dollars. 500 and 500 together are a thousand." }
  ]
});
