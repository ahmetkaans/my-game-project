/* Glossary for the "Words in this game" pop-up: one short meaning per tested word, written once per level and reused
   in every quiz. Shape: { "A1": { "banana": [ { "type": "noun", "meaning": "a long yellow fruit" } ] } }.
   Keys are lower case. The part between "Object.assign(GAME_DATA.glossary, " and the closing ");" must stay valid
   JSON: it is read by .gitignore/tools/check_questions.ps1. One file per level. */
Object.assign(GAME_DATA.glossary, {
  "A1": {
    "hello": [
      { "type": "exclamation", "meaning": "you say it when you meet someone" },
      { "type": "noun", "meaning": "the word people say when they meet" }
    ],
    "hi": { "type": "exclamation", "meaning": "you say it when you meet a friend" },
    "hey": { "type": "exclamation", "meaning": "you say it to a friend when you meet them or want them to listen" },
    "bye": { "type": "exclamation", "meaning": "you say it to a friend when you leave" },
    "goodbye": [
      { "type": "exclamation", "meaning": "you say it when you leave someone" },
      { "type": "noun", "meaning": "the word people say when they leave" }
    ],
    "thanks": [
      { "type": "exclamation", "meaning": "you say it when someone gives you something or helps you" },
      { "type": "noun", "meaning": "words that tell someone you are happy about their help" }
    ],
    "please": { "type": "exclamation", "meaning": "you say it when you ask for something in a nice way" },
    "sorry": [
      { "type": "adjective", "meaning": "sad about something you did" },
      { "type": "exclamation", "meaning": "you say it when you do something wrong" }
    ],
    "fine": { "type": "adjective", "meaning": "well or OK; not sick and not sad" },
    "ok": [
      { "type": "exclamation", "meaning": "you say it when you agree" },
      { "type": "adjective", "meaning": "good enough, not bad" },
      { "type": "adverb", "meaning": "in a way that is good enough" }
    ],
    "yeah": { "type": "exclamation", "meaning": "yes (you say it to friends)" },
    "oh": { "type": "exclamation", "meaning": "you say it when you hear something new, good or bad" },
    "welcome": [
      { "type": "exclamation", "meaning": "you say it to someone when they arrive" },
      { "type": "verb", "meaning": "to be nice to someone who comes to your home or a new place" },
      { "type": "adjective", "meaning": "people are happy to see you or have you with them" }
    ],
    "hungry": { "type": "adjective", "meaning": "you want to eat" },
    "thirsty": { "type": "adjective", "meaning": "you want to drink" },
    "tired": { "type": "adjective", "meaning": "you want to sleep or sit down" },
    "sad": { "type": "adjective", "meaning": "not happy" },
    "angry": { "type": "adjective", "meaning": "not happy with someone because of something bad they did" },
    "afraid": { "type": "adjective", "meaning": "you think something bad can happen to you" },
    "bored": { "type": "adjective", "meaning": "not interested, because there is nothing to do" },
    "excited": { "type": "adjective", "meaning": "very happy because something good is going to happen" },
    "interested": { "type": "adjective", "meaning": "you want to know more about something" },
    "sure": { "type": "adjective", "meaning": "you know something is true" },
    "thank": { "type": "verb", "meaning": "to tell someone you are happy about their help or about something they gave you" },
    "dear": { "type": "adjective", "meaning": "a word before a name at the start of a letter or email" },
    "laugh": [
      { "type": "verb", "meaning": "to make a happy sound when something is funny" },
      { "type": "noun", "meaning": "the happy sound people make when something is funny" }
    ],
    "boring": { "type": "adjective", "meaning": "not interesting at all" },
    "exciting": { "type": "adjective", "meaning": "it makes you feel very happy and interested" },
    "interesting": { "type": "adjective", "meaning": "it makes you want to know more" },
    "believe": { "type": "verb", "meaning": "to think that something is true" },
    "hope": { "type": "verb", "meaning": "to want something good to happen" },
    "happen": { "type": "verb", "meaning": "to take place, like an event or a problem" },
    "one": [
      { "type": "number", "meaning": "the number 1" },
      { "type": "determiner", "meaning": "only this person or thing, not two or more" },
      { "type": "pronoun", "meaning": "a person or thing from a group of them" }
    ],
    "two": { "type": "number", "meaning": "the number 2" },
    "three": { "type": "number", "meaning": "the number 3" },
    "four": { "type": "number", "meaning": "the number 4" },
    "five": { "type": "number", "meaning": "the number 5" },
    "six": { "type": "number", "meaning": "the number 6" },
    "seven": { "type": "number", "meaning": "the number 7" },
    "eight": { "type": "number", "meaning": "the number 8" },
    "first": [
      { "type": "determiner", "meaning": "that comes before all the others" },
      { "type": "number", "meaning": "the one in place number 1, like 1st" },
      { "type": "adverb", "meaning": "before anyone or anything else" }
    ],
    "second": [
      { "type": "number", "meaning": "the one in place number 2, like 2nd" },
      { "type": "determiner", "meaning": "that comes after the first one" },
      { "type": "noun", "meaning": "a very short time: 60 of them make a minute" }
    ],
    "third": { "type": "number", "meaning": "the one in place number 3, like 3rd" },
    "fourth": { "type": "number", "meaning": "the one in place number 4, like 4th" },
    "number": { "type": "noun", "meaning": "something like 7 or 15 that tells how many" },
    "half": [
      { "type": "noun", "meaning": "one of two parts that look the same" },
      { "type": "determiner", "meaning": "one of two parts that look the same, said before a word like class or cake" },
      { "type": "pronoun", "meaning": "one of two parts that look the same, said without a word after it" }
    ],
    "pair": { "type": "noun", "meaning": "two things that go together, like two shoes" },
    "mile": { "type": "noun", "meaning": "a long way, much longer than a meter" },
    "eleven": { "type": "number", "meaning": "the number 11" },
    "twelve": { "type": "number", "meaning": "the number 12" },
    "thirteen": { "type": "number", "meaning": "the number 13" },
    "fourteen": { "type": "number", "meaning": "the number 14" },
    "fifteen": { "type": "number", "meaning": "the number 15" },
    "sixteen": { "type": "number", "meaning": "the number 16" },
    "eighteen": { "type": "number", "meaning": "the number 18" },
    "twenty": { "type": "number", "meaning": "the number 20" },
    "thirty": { "type": "number", "meaning": "the number 30" },
    "forty": { "type": "number", "meaning": "the number 40" },
    "fifty": { "type": "number", "meaning": "the number 50" },
    "sixty": { "type": "number", "meaning": "the number 60" },
    "seventy": { "type": "number", "meaning": "the number 70" },
    "eighty": { "type": "number", "meaning": "the number 80" },
    "ninety": { "type": "number", "meaning": "the number 90" },
    "thousand": { "type": "number", "meaning": "the number 1,000" },
    "nine": { "type": "number", "meaning": "the number 9" },
    "ten": { "type": "number", "meaning": "the number 10" },
    "fifth": { "type": "number", "meaning": "the one in place number 5, like 5th" },
    "quarter": { "type": "noun", "meaning": "one of four parts that look the same" },
    "meter": { "type": "noun", "meaning": "a way to say how long or tall something is; a door is about 2 of them tall" },
    "seventeen": { "type": "number", "meaning": "the number 17" },
    "nineteen": { "type": "number", "meaning": "the number 19" },
    "hundred": { "type": "number", "meaning": "the number 100" },
    "million": { "type": "number", "meaning": "the number 1,000,000" },
    "miss": { "type": "verb", "meaning": "to feel sad because someone is not with you; also, to be late for a bus, train or plane" },
    "feeling": { "type": "noun", "meaning": "something you feel, like happy or sad" }
  }
});
