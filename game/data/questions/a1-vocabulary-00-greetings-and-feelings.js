/* Questions: A1 Vocabulary, theme 00 "Greetings and Feelings" (16 quizzes). One entry per quiz.
   Key: "level|category|topicIndex|type|difficulty" (e.g. "A1|vocabulary|0|mc|easy"). Value: an array of question
   objects; shapes in README.md "Question types". The correct answer is stored first (options[0], bank[0]); the
   game shuffles. A key that is missing gets lorem ipsum questions.
   The part between "Object.assign(GAME_DATA.questions, " and the closing ");" must stay valid JSON: it is read by
   .gitignore/tools/check_questions.ps1. The file name is level, category, topic number and topic name in lower case. */
Object.assign(GAME_DATA.questions, {
  "A1|vocabulary|0|mc|easy": [
    { "type": "mc", "prompt": "Ken sees Anna at school in the morning. He says, \"___, Anna! How are you?\"", "options": ["Hello", "Bye", "Please", "No"], "target": "hello", "targetType": "exclamation", "explanation": "We say \"hello\" when we meet someone. \"Bye\" is for when we leave." },
    { "type": "mc", "prompt": "Lisa: \"See you tomorrow, Sam!\" Sam: \"___, Lisa!\"", "options": ["Bye", "Hello", "Please", "Welcome"], "target": "bye", "explanation": "\"See you tomorrow\" tells us Lisa is leaving. We say \"bye\" to friends when we leave." },
    { "type": "mc", "prompt": "Tom is going to Tokyo for a year. What does his mother say to him at the airport?", "options": ["Goodbye", "Hello", "Please", "Yes"], "target": "goodbye", "targetType": "exclamation", "explanation": "Tom is leaving, so his mother says \"goodbye\". \"Bye\" means the same, but we say it more to friends." },
    { "type": "mc", "prompt": "Emma gives Ben a pen. Ben says, \"___ for the pen, Emma!\"", "options": ["Thanks", "Hello", "Bye", "Please"], "target": "thanks", "targetType": "exclamation", "explanation": "We say \"thanks\" when someone gives us something. It means \"thank you\"." },
    { "type": "mc", "prompt": "Maria is at a cafe. She says, \"A cup of tea, ___.\"", "options": ["please", "sorry", "bye", "hello"], "explanation": "We say \"please\" when we ask for something. It is the nice way to ask." },
    { "type": "mc", "prompt": "Leo is late for class. He says, \"___ I'm late!\"", "options": ["Sorry", "Thanks", "Welcome", "Please"], "target": "sorry", "targetType": "exclamation", "explanation": "We say \"sorry\" when we do something wrong, like being late. \"Sorry I'm late!\" is very common." },
    { "type": "mc", "prompt": "Mia: \"How are you, Ali?\" Ali: \"I'm ___, thank you.\"", "options": ["fine", "blue", "cheap", "tall"], "explanation": "\"I'm fine\" means \"I'm OK, I'm well\". It is a common answer to \"How are you?\"." },
    { "type": "mc", "prompt": "Tom: \"Let's play tennis after school.\" Anna: \"___! Good idea.\"", "options": ["OK", "Sorry", "Bye", "Hello"], "targetType": "exclamation", "explanation": "We say \"OK\" when we agree with an idea. Anna wants to play, too." }
  ],
  "A1|vocabulary|0|mc|medium": [
    { "type": "mc", "prompt": "\"Can I have a sandwich? I'm ___,\" Ken says.", "options": ["hungry", "thirsty", "afraid", "angry"], "explanation": "When you are hungry, you want to eat. When you are thirsty, you want to drink." },
    { "type": "mc", "prompt": "It is very hot today. Maria wants a big glass of cold water. She is ___.", "options": ["thirsty", "hungry", "angry", "afraid"], "explanation": "Maria wants water, so she is thirsty. Hungry people want food." },
    { "type": "mc", "prompt": "Tom works from morning to night. Now he wants to go to bed. He is ___.", "options": ["tired", "hungry", "thirsty", "afraid"], "explanation": "When you are tired, you want to sleep. Tom wants to go to bed." },
    { "type": "mc", "prompt": "Lisa's best friend is moving to another country. Lisa is very ___.", "options": ["sad", "happy", "hot", "hungry"], "explanation": "Lisa is not going to see her best friend every day, so she is sad. \"Sad\" means \"not happy\"." },
    { "type": "mc", "prompt": "Kate's brother breaks her new phone. Kate is very ___.", "options": ["angry", "happy", "tired", "thirsty"], "explanation": "We are angry when someone does something bad to us. Kate's brother broke her new phone." },
    { "type": "mc", "prompt": "Anna: \"My cat is sick.\" Mia: \"___, no! I'm sorry.\"", "options": ["Oh", "Hi", "Bye", "Welcome"], "target": "oh", "explanation": "We say \"oh\" when we hear something new, good or bad. \"Oh, no!\" shows we are sad about the news." },
    { "type": "mc", "prompt": "Tom: \"Do you want to play football?\" Ali: \"___! Let's go!\"", "options": ["Yeah", "Sorry", "Bye", "Welcome"], "target": "yeah", "explanation": "\"Yeah\" means \"yes\". We say it to friends." },
    { "type": "mc", "prompt": "\"___ to our school!\" the teacher says to the new students.", "options": ["Welcome", "Sorry", "Thanks", "Bye"], "target": "welcome", "targetType": "exclamation", "explanation": "We say \"welcome\" to people when they come to a new place. The students are new at the school." }
  ],
  "A1|vocabulary|0|mc|hard": [
    { "type": "mc", "prompt": "Emma runs away from big dogs. She is ___ of them.", "options": ["afraid", "angry", "hungry", "excited"], "explanation": "When you are afraid, you think something bad can happen. We say \"afraid of\" something." },
    { "type": "mc", "prompt": "There is nothing to do at home. Sam watches the clock all day. He is ___.", "options": ["bored", "afraid", "angry", "thirsty"], "explanation": "When there is nothing to do, we feel bored. Sam wants the day to end." },
    { "type": "mc", "prompt": "Tomorrow is Ali's birthday party. He can't wait! He is very ___.", "options": ["excited", "bored", "tired", "afraid"], "explanation": "When something good is going to happen, we are excited. \"I can't wait\" shows this." },
    { "type": "mc", "prompt": "Mia reads lots of books about animals. She is ___ in animals.", "options": ["interested", "afraid", "excited", "bored"], "explanation": "When you are interested in something, you want to know more about it. We say \"interested in\"." },
    { "type": "mc", "prompt": "Teacher: \"Is the answer 12?\" Ken: \"Yes, I'm ___. I checked it twice.\"", "options": ["sure", "sorry", "bored", "hungry"], "explanation": "\"I'm sure\" means \"I know it is true\". Ken checked the answer two times." },
    { "type": "mc", "prompt": "\"I want to ___ you for the beautiful flowers,\" says Tom.", "options": ["thank", "like", "miss", "laugh"], "targetType": "verb", "explanation": "We thank people when they give us something or help us. \"Thank you for…\" is very common." },
    { "type": "mc", "prompt": "Ben writes an email to his aunt. He starts with \"___ Aunt Mary,\".", "options": ["Dear", "Sure", "Sorry", "Afraid"], "target": "dear", "explanation": "We often start a letter or an email with \"Dear\" and the person's name." },
    { "type": "mc", "prompt": "The movie is very funny. Everyone in the theater ___ a lot.", "options": ["laughs", "misses", "hopes", "believes"], "target": "laugh", "targetType": "verb", "explanation": "When something is funny, we laugh. The movie is funny, so the people laugh." }
  ],
  "A1|vocabulary|0|mc|veryhard": [
    { "type": "mc", "prompt": "The lesson is long and slow. Everyone in the class is sleeping! It's so ___.", "options": ["boring", "bored", "exciting", "interesting"], "explanation": "A lesson that makes people sleep is boring. We use \"boring\" for things and \"bored\" for people." },
    { "type": "mc", "prompt": "Our team wins in the last minute! It's a very ___ game.", "options": ["exciting", "excited", "bored", "interested"], "explanation": "A game is exciting; the people who watch it are excited. \"-ing\" words describe the thing, and \"-ed\" words describe how people feel." },
    { "type": "mc", "prompt": "Tom reads a book about space. He learns a lot of new things. The book is very ___.", "options": ["interesting", "interested", "excited", "bored"], "explanation": "A book can be interesting, but it can't be interested. People are interested; things are interesting." },
    { "type": "mc", "prompt": "Ali says he can fly. Nobody ___ him.", "options": ["believes", "misses", "hopes", "thanks"], "target": "believe", "explanation": "To believe someone is to think that their words are true. People can't fly, so nobody thinks Ali's words are true." },
    { "type": "mc", "prompt": "Anna is going to Paris tomorrow. Her friend says, \"I ___ you have a great trip!\"", "options": ["hope", "miss", "thank", "feel"], "explanation": "We use \"hope\" when we want something good to happen. Her friend wants Anna's trip to be great." },
    { "type": "mc", "prompt": "\"What ___?\" Maria asks. There are police cars on our street.", "options": ["happened", "missed", "hoped", "laughed"], "target": "happen", "explanation": "\"What happened?\" asks about something that took place. The police are there, so something took place." },
    { "type": "mc", "prompt": "Mehmet lives in London now. His family is in Ankara. He ___ them a lot.", "options": ["misses", "hopes", "believes", "thanks"], "target": "miss", "explanation": "We miss people when they are not with us and we want to see them. Mehmet's family lives far away." },
    { "type": "mc", "prompt": "Love is a beautiful ___.", "options": ["feeling", "laugh", "goodbye", "hello"], "explanation": "Love is something we feel, so it is a feeling. Happy, sad and angry are feelings, too." }
  ],
  "A1|vocabulary|0|fill|easy": [
    { "type": "fill", "before": "Sara sees her friend Omar in the park. She says, \"", "after": "! How are you, Omar?\"", "answer": "Hi", "bank": ["Hi", "Bye", "Please"], "target": "hi", "explanation": "We say \"hi\" when we meet a friend. It is like \"hello\", but we say it more to friends." },
    { "type": "fill", "before": "Ali answers the phone: \"", "after": "? Who is it?\"", "answer": "Hello", "bank": ["Hello", "Bye", "Thanks"], "target": "hello", "targetType": "exclamation", "explanation": "We often say \"hello\" when we answer the phone. \"Hello? Who is it?\" is very common." },
    { "type": "fill", "before": "Paul leaves school and says, \"", "after": ", everyone! See you on Monday!\"", "answer": "Bye", "bank": ["Bye", "Hello", "Please"], "target": "bye", "explanation": "Paul is leaving, so he says \"bye\". We say \"hello\" when we arrive." },
    { "type": "fill", "before": "The train is leaving. Mia's mother says, \"", "after": ", Mia! Call me tonight!\"", "answer": "Goodbye", "bank": ["Goodbye", "Hello", "Welcome"], "target": "goodbye", "targetType": "exclamation", "explanation": "Mia is leaving on the train, so her mother says \"goodbye\"." },
    { "type": "fill", "before": "Waiter: \"Here is your pizza.\" Lucas: \"", "after": "!\"", "answer": "Thanks", "bank": ["Thanks", "Sorry", "Bye"], "target": "thanks", "targetType": "exclamation", "explanation": "We say \"thanks\" when someone gives us something. The waiter gives Lucas his pizza." },
    { "type": "fill", "before": "Can I have some water,", "after": "?", "answer": "please", "bank": ["please", "sorry", "hello"], "explanation": "We say \"please\" when we ask for something. It makes the question nice." },
    { "type": "fill", "before": "\"I'm", "after": "I broke your cup,\" Nina says.", "answer": "sorry", "bank": ["sorry", "fine", "blue"], "targetType": "adjective", "explanation": "We say \"I'm sorry\" when we do something wrong. Nina broke her friend's cup." },
    { "type": "fill", "before": "My brother is sick, but my sister is", "after": ".", "answer": "fine", "bank": ["fine", "blue", "cheap"], "explanation": "\"Fine\" means \"well, not sick\". The brother is sick, but the sister is not." }
  ],
  "A1|vocabulary|0|fill|medium": [
    { "type": "fill", "before": "\"", "after": ", Mike! Wait for me!\" Sam calls from across the street.", "answer": "Hey", "bank": ["Hey", "Goodbye", "Welcome"], "target": "hey", "explanation": "We say \"hey\" when we want a friend to look at us or listen. It is like \"hi\", but only for friends." },
    { "type": "fill", "before": "Mom: \"Your phone is on the table.\" Carlos: \"", "after": ", good! Thank you.\"", "answer": "Oh", "bank": ["Oh", "Bye", "Welcome"], "target": "oh", "explanation": "We say \"oh\" when we hear something new. \"Oh, good!\" means we are happy about the news." },
    { "type": "fill", "before": "Amy: \"Thank you for the cake!\" Yuki: \"You're", "after": "!\"", "answer": "welcome", "bank": ["welcome", "hungry", "sad"], "targetType": "adjective", "explanation": "\"You're welcome\" is the answer to \"Thank you\". It is a nice, friendly answer." },
    { "type": "fill", "before": "Elif: \"Let's have lunch now. I'm", "after": "!\"", "answer": "hungry", "bank": ["hungry", "thirsty", "sad"], "explanation": "Elif wants to eat, so she is hungry. \"Thirsty\" is for when we want a drink." },
    { "type": "fill", "before": "After the game, the players drink lots of water. They are", "after": ".", "answer": "thirsty", "bank": ["thirsty", "hungry", "sad"], "explanation": "People drink water when they are thirsty. Players are often thirsty after a game." },
    { "type": "fill", "before": "Omar walks ten miles today. Now he is very", "after": "and sits down.", "answer": "tired", "bank": ["tired", "angry", "sad"], "explanation": "After a long walk, we are tired. We want to sit down or sleep." },
    { "type": "fill", "before": "It's raining, so the children can't go to the park. They are", "after": ".", "answer": "sad", "bank": ["sad", "thirsty", "hungry"], "explanation": "The children can't go to the park, so they are not happy. They are sad." },
    { "type": "fill", "before": "\"Don't take my things without asking!\" Ahmet is", "after": "with his brother.", "answer": "angry", "bank": ["angry", "thirsty", "tired"], "explanation": "Ahmet's brother takes his things, and Ahmet is not happy about it. We are \"angry with\" someone." }
  ],
  "A1|vocabulary|0|fill|hard": [
    { "type": "fill", "before": "Lisa is", "after": "to fly, so she always goes by train.", "answer": "afraid", "bank": ["afraid", "bored", "excited", "interested"], "explanation": "Lisa thinks flying is dangerous, so she is afraid to fly. She takes the train." },
    { "type": "fill", "before": "It's Sunday afternoon, and Ben has nothing to do. He is", "after": ".", "answer": "bored", "bank": ["bored", "afraid", "excited", "sure"], "explanation": "Ben has nothing to do, so he is bored." },
    { "type": "fill", "before": "The children are very", "after": "about the school trip tomorrow.", "answer": "excited", "bank": ["excited", "bored", "afraid", "interested"], "explanation": "The trip is something good that is going to happen, so the children are excited. We say \"excited about\"." },
    { "type": "fill", "before": "\"Are you", "after": "in art?\" \"Yes, I love painting.\"", "answer": "interested", "bank": ["interested", "excited", "bored", "afraid"], "explanation": "The answer \"I love painting\" tells us the person likes art. We say \"interested in\"." },
    { "type": "fill", "before": "\"Is the museum open today?\" \"I'm not", "after": ". Let's check online.\"", "answer": "sure", "bank": ["sure", "afraid", "bored", "interested"], "explanation": "\"I'm not sure\" means \"I don't know\". So they check online." },
    { "type": "fill", "before": "Don't forget to", "after": "your grandfather for the birthday money.", "answer": "thank", "bank": ["thank", "laugh", "hope", "miss"], "targetType": "verb", "explanation": "We thank people when they give us something. Your grandfather gives you money, so you thank him." },
    { "type": "fill", "before": "Maria's email starts: \"", "after": "Tom, thanks for your letter.\"", "answer": "Dear", "bank": ["Dear", "Sure", "Afraid", "Bored"], "target": "dear", "explanation": "Letters and emails often start with \"Dear\" and the person's name." },
    { "type": "fill", "before": "My brother is very funny. He always makes me", "after": ".", "answer": "laugh", "bank": ["laugh", "miss", "hope", "thank"], "targetType": "verb", "explanation": "Funny people make us laugh." }
  ],
  "A1|vocabulary|0|fill|veryhard": [
    { "type": "fill", "before": "This TV show is the same every week. It's really", "after": ".", "answer": "boring", "bank": ["boring", "bored", "exciting", "interesting"], "explanation": "A show that is the same every week is not interesting. It is boring." },
    { "type": "fill", "before": "Nina rides a fast horse for the first time. \"This is so", "after": "!\" she says.", "answer": "exciting", "bank": ["exciting", "excited", "bored", "interested"], "explanation": "Nina is excited, and the ride is exciting. \"-ing\" words describe the thing, and \"-ed\" words describe how people feel." },
    { "type": "fill", "before": "Our new history teacher tells great stories. Her lessons are very", "after": ".", "answer": "interesting", "bank": ["interesting", "interested", "boring", "bored"], "explanation": "Great stories make a lesson interesting. \"Interested\" is for people, not lessons." },
    { "type": "fill", "before": "\"I can speak ten languages,\" says Paul. \"I don't", "after": "you!\" says his friend.", "answer": "believe", "bank": ["believe", "hope", "miss", "happen"], "explanation": "His friend thinks Paul's words are not true. \"I don't believe you\" means \"I don't think it's true\"." },
    { "type": "fill", "before": "I", "after": "it doesn't rain tomorrow. We want to go to the beach.", "answer": "hope", "bank": ["hope", "miss", "laugh", "happen"], "explanation": "We hope for good things in the future. They want good weather for the beach." },
    { "type": "fill", "before": "\"What", "after": "to your arm?\" \"I fell off my bike.\"", "answer": "happened", "bank": ["happened", "hoped", "missed", "believed"], "target": "happen", "explanation": "We ask \"What happened?\" when we want to know about something that took place. He fell off his bike." },
    { "type": "fill", "before": "I", "after": "the bus this morning, so I was late for school.", "answer": "missed", "bank": ["missed", "hoped", "happened", "believed"], "target": "miss", "explanation": "When you miss the bus, you are too late and it goes without you. Then you are late, too." },
    { "type": "fill", "before": "I see my family after a long time. It's a wonderful", "after": ".", "answer": "feeling", "bank": ["feeling", "problem", "question", "mistake"], "explanation": "Seeing your family again makes you very happy. It is a wonderful feeling." }
  ],
  "A1|vocabulary|0|tf|easy": [
    { "type": "tf", "prompt": "When Anna meets her teacher in the morning, she can say \"hello\".", "answer": true, "target": "hello", "targetType": "exclamation", "explanation": "Yes. We say \"hello\" when we meet someone." },
    { "type": "tf", "prompt": "You say \"goodbye\" when you arrive at a party.", "answer": false, "target": "goodbye", "targetType": "exclamation", "explanation": "No. We say \"goodbye\" when we leave. When we arrive, we say \"hello\" or \"hi\"." },
    { "type": "tf", "prompt": "\"Hi\" is a short, friendly way to say \"hello\".", "answer": true, "target": "hi", "explanation": "Yes. We often say \"hi\" to friends and family." },
    { "type": "tf", "prompt": "We say \"thanks\" when we do something wrong.", "answer": false, "target": "thanks", "targetType": "exclamation", "explanation": "No. We say \"thanks\" when someone helps us or gives us something. When we do something wrong, we say \"sorry\"." },
    { "type": "tf", "prompt": "\"Please\" is the answer to \"Thank you\".", "answer": false, "target": "please", "explanation": "No. The answer to \"Thank you\" is \"You're welcome\". We say \"please\" when we ask for something." },
    { "type": "tf", "prompt": "Leo takes his sister's pen without asking. He should say \"sorry\".", "answer": true, "target": "sorry", "targetType": "exclamation", "explanation": "Yes. Leo did something wrong, so he should say \"sorry\"." },
    { "type": "tf", "prompt": "\"I'm fine\" is a good answer to \"How are you?\".", "answer": true, "target": "fine", "explanation": "Yes. \"I'm fine, thank you\" is a very common answer." },
    { "type": "tf", "prompt": "\"OK\" means \"no\".", "answer": false, "target": "OK", "targetType": "exclamation", "explanation": "No. \"OK\" means \"yes\" or \"all right\". We say it when we agree." }
  ],
  "A1|vocabulary|0|tf|medium": [
    { "type": "tf", "prompt": "A thirsty person wants something to eat.", "answer": false, "target": "thirsty", "explanation": "No. A thirsty person wants something to drink, like water or juice. A hungry person wants to eat." },
    { "type": "tf", "prompt": "If you have no breakfast, you are often hungry before lunch.", "answer": true, "target": "hungry", "explanation": "Yes. When we don't eat in the morning, we want food early. We are hungry." },
    { "type": "tf", "prompt": "After a long day at work, people are often tired.", "answer": true, "target": "tired", "explanation": "Yes. Work makes us tired, and we want to sit down or sleep." },
    { "type": "tf", "prompt": "Kate is sad because she gets a great birthday present.", "answer": false, "target": "sad", "explanation": "No. A great present makes us happy, not sad." },
    { "type": "tf", "prompt": "People say \"Welcome!\" when friends come to their new house.", "answer": true, "target": "welcome", "targetType": "exclamation", "explanation": "Yes. We say \"welcome\" when someone comes to our home or a new place." },
    { "type": "tf", "prompt": "When your team wins a game, you feel angry.", "answer": false, "target": "angry", "explanation": "No. When our team wins, we are happy. We are angry when someone does something bad." },
    { "type": "tf", "prompt": "\"Hey\" is a way to say \"goodbye\".", "answer": false, "target": "hey", "explanation": "No. \"Hey\" is like \"hi\". We say it when we meet a friend or want them to listen." },
    { "type": "tf", "prompt": "\"Yeah\" means \"yes\", and we say it to friends.", "answer": true, "target": "yeah", "explanation": "Yes. \"Yeah\" is a friendly way to say \"yes\"." }
  ],
  "A1|vocabulary|0|tf|hard": [
    { "type": "tf", "prompt": "People who are afraid of dogs stay away from them.", "answer": true, "target": "afraid", "explanation": "Yes. When we are afraid of something, we don't want to be near it." },
    { "type": "tf", "prompt": "An exciting movie makes people bored.", "answer": false, "target": "bored", "explanation": "No. An exciting movie makes people excited. We feel bored when we have nothing to do, or when something is not interesting." },
    { "type": "tf", "prompt": "\"I'm excited\" means \"I'm very tired\".", "answer": false, "target": "excited", "explanation": "No. \"Excited\" means very happy because something good is going to happen." },
    { "type": "tf", "prompt": "A person interested in music wants to know more about it.", "answer": true, "target": "interested", "explanation": "Yes. When we are interested in something, we want to learn more about it." },
    { "type": "tf", "prompt": "\"I'm sure\" means \"I don't know\".", "answer": false, "target": "sure", "explanation": "No. \"I'm sure\" means \"I know it is true\". \"I'm not sure\" means \"I don't know\"." },
    { "type": "tf", "prompt": "You can thank a friend for a nice birthday card.", "answer": true, "target": "thank", "targetType": "verb", "explanation": "Yes. We thank people when they give us something or help us." },
    { "type": "tf", "prompt": "People often write \"Dear\" at the end of a letter.", "answer": false, "target": "dear", "explanation": "No. We write \"Dear\" at the start of a letter or email, before the person's name." },
    { "type": "tf", "prompt": "A laugh is a happy sound.", "answer": true, "target": "laugh", "targetType": "noun", "explanation": "Yes. We make this happy sound when something is funny." }
  ],
  "A1|vocabulary|0|tf|veryhard": [
    { "type": "tf", "prompt": "\"I'm boring\" and \"I'm bored\" mean the same thing.", "answer": false, "target": "boring", "explanation": "No. \"I'm bored\" tells how I feel. \"I'm boring\" means other people think I am not interesting!" },
    { "type": "tf", "prompt": "An exciting game makes the people who watch it excited.", "answer": true, "target": "exciting", "explanation": "Yes. \"Exciting\" is for the game, and \"excited\" is for how people feel." },
    { "type": "tf", "prompt": "People want to stop reading an interesting book.", "answer": false, "target": "interesting", "explanation": "No. An interesting book makes you want to read more." },
    { "type": "tf", "prompt": "If you believe someone, you think their words are true.", "answer": true, "target": "believe", "explanation": "Yes. \"I believe you\" means \"I think your words are true\"." },
    { "type": "tf", "prompt": "You can hope for good weather for your vacation.", "answer": true, "target": "hope", "explanation": "Yes. We hope for good things that we want to happen." },
    { "type": "tf", "prompt": "\"What happened?\" is a question about the future.", "answer": false, "target": "happen", "explanation": "No. \"What happened?\" asks about something that took place before now, not later." },
    { "type": "tf", "prompt": "People often miss their friends when they move to another city.", "answer": true, "target": "miss", "explanation": "Yes. We miss people when they are far away and we can't see them." },
    { "type": "tf", "prompt": "A bad feeling about a test means you think it's easy.", "answer": false, "target": "feeling", "explanation": "No. A bad feeling means you think something bad is going to happen." }
  ],
  "A1|vocabulary|0|match|easy": [
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "hello", "right": "you often say it when you answer the phone", "type": "exclamation" },
      { "left": "sorry", "right": "you say it when you make a mistake", "type": "exclamation" },
      { "left": "fine", "right": "well; not sick" },
      { "left": "please", "right": "a nice word to use when you ask for something" }
    ], "explanation": "We say \"hello\" on the phone and \"sorry\" for a mistake. \"Fine\" means well, and \"please\" makes a question nice." },
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "hi", "right": "a short, friendly \"hello\"" },
      { "left": "bye", "right": "a short way to say \"goodbye\"" },
      { "left": "thanks", "right": "you say it when someone helps you", "type": "exclamation" },
      { "left": "OK", "right": "you say it to agree, like \"yes\"", "type": "exclamation" }
    ], "explanation": "\"Hi\" is for meeting and \"bye\" is for leaving. We say \"thanks\" for help, and \"OK\" when we agree." }
  ],
  "A1|vocabulary|0|match|medium": [
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "hey", "right": "you say it to a friend to make them look at you" },
      { "left": "hungry", "right": "you need food" },
      { "left": "sad", "right": "how you feel when something bad happens" },
      { "left": "welcome", "right": "you say it when someone comes to your home", "type": "exclamation" }
    ], "explanation": "\"Hey\" gets a friend to look at you. Hungry people need food, and we say \"welcome\" to people who come to our home." },
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "yeah", "right": "\"yes\" when you talk to friends" },
      { "left": "oh", "right": "you say it before \"no!\" when you hear bad news" },
      { "left": "tired", "right": "how you feel after a long day of work" },
      { "left": "angry", "right": "how you feel when someone is bad to you" }
    ], "explanation": "\"Yeah\" is a friendly \"yes\", and \"Oh, no!\" is what we say when we hear bad news. After a long day we are tired, and we are angry when someone is bad to us." }
  ],
  "A1|vocabulary|0|match|hard": [
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "afraid", "right": "how you feel near a big, dangerous animal" },
      { "left": "excited", "right": "how you feel the night before your birthday party" },
      { "left": "sure", "right": "you know you are right" },
      { "left": "dear", "right": "you write it before a name at the start of a letter" }
    ], "explanation": "We are afraid of dangerous things and excited about good things. \"Sure\" means we know we are right, and \"Dear\" starts a letter." },
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "bored", "right": "you have nothing to do, and the day is long" },
      { "left": "interested", "right": "you like a subject and want to learn about it" },
      { "left": "thank", "right": "to tell someone you are happy about their help", "type": "verb" },
      { "left": "laugh", "right": "what you do when something is funny", "type": "verb" }
    ], "explanation": "With nothing to do, we are bored. We want to learn more when we are interested, we thank people for help, and we laugh at funny things." }
  ],
  "A1|vocabulary|0|match|veryhard": [
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "boring", "right": "it makes people feel bored" },
      { "left": "exciting", "right": "it makes people feel excited" },
      { "left": "believe", "right": "to think that someone's words are true" },
      { "left": "miss", "right": "to feel sad because a person is far away" }
    ], "explanation": "\"-ing\" words describe the thing: a boring lesson makes people bored. We believe true words, and we miss people who are far away." },
    { "type": "match", "prompt": "Match each word with its meaning.", "pairs": [
      { "left": "interesting", "right": "a book like this makes you want to read more" },
      { "left": "hope", "right": "to want a good result, for example in a test" },
      { "left": "happen", "right": "to take place, like a party or a problem" },
      { "left": "feeling", "right": "happy, sad and angry are examples of this" }
    ], "explanation": "An interesting book makes us want to read more, and we hope for good results. Events happen, and happy, sad and angry are feelings." }
  ]
});
