# Changelog

What changed in My Game Project, in plain language. The newest change is at the top. Every commit adds one entry here: its date, a short title and two or three sentences about what was added or changed. The code in brackets is the commit's ID on GitHub, so you can open that exact version.

## 2026-11-01

### Finished "Numbers and Amounts": True or False and Matching
The second theme is now complete: all 16 quizzes have real questions (104 in total). The True or False and Matching questions mix real-life situations, number order, word endings (like "-teen" and "-ty") and a few sums for the biggest numbers. Matching meanings use new situations, such as letters of the alphabet, half a day and the days in April.

### Wrote the Multiple Choice and Fill in the Blanks questions for "Numbers and Amounts" (`5783251`)
The second theme now has real questions: all four difficulties of Multiple Choice and Fill in the Blanks (64 questions), with short meanings in the word pop-up for all 41 words. Many questions use real-life numbers, such as bus numbers, prices, times and ages, and some are written as small dialogues. The notes now also hold two new rules for writing questions: every word should be tested about equally often, and no wrong answer should appear too often in one quiz.

### Made very short answers stricter in Fill in the Blanks (`5783251`)
Answers of one to three letters, like "hi", "one" or "six", must now be typed exactly. Before, one wrong letter earned half points, which could reward a different real word, like "he" for "hey". Longer answers keep the old, forgiving rule.

### Made SmartBoard Fill in the Blanks one tap (`5783251`)
In SmartBoard mode, tapping a word now puts it straight into the blank. Tapping the word in the blank takes it out. Before, you had to tap the word first and then tap the only blank.

### Fixed keyboard focus behind pop-ups (`d43415c`)
While a pop-up or the menu tree is open, the keyboard can no longer reach the page behind it. Before, someone using the Tab key could answer a question behind the "Time out" pop-up and be charged the extra-time penalty for it. Focus now also returns to the button that opened the pop-up.

### Made SmartBoard mode work (`c5db62d`)
The SmartBoard switch in Settings now does something and is remembered: with it on, Fill in the Blanks lets you tap a word and then tap the blank instead of typing. Scoring is the same as typed Fill, and the switch is locked while a quiz is on screen.

### Added a main menu button (`13eebdf`)
A house button next to the menu tree takes you back to the level screen after a "Go to the main menu?" question with Yes and No buttons. It is hidden on the level screen itself.

### Grouped the levels and added their names (`13eebdf`)
The main menu now splits the levels into three groups with headings (A - Basic user, B - Independent user, C - Proficient user), and each level button shows its name under the code: Beginner, Elementary, Intermediate, Upper Intermediate and Advanced.

### Filled gaps in the project notes (`a45a14d`)
Wrote down details that were only in our conversation: how to test saved settings on a real web address, how the Settings pop-up keeps its controls in sync, two internal fields of the menu, and the idea of splitting the game file later. Also added a small private test-server tool and the color of the dim background behind pop-ups, and updated the testing rule in the working rules to list all three remembered settings (theme, sound and same duration).

### Added a SmartBoard mode switch (preview only) (`9935304`)
The Settings menu now has a "SmartBoard mode" switch with an explanation: it is meant to let students tap a word instead of typing it on a smart board. For now it is only there to show how it will look, and its explanation ends with "Its code hasn't been written yet", because the feature itself is not built.

### Added the changelog rule to the working rules (`d70fbd8`)
The working rules for the helper assistant now say that every commit must add an entry to the changelog. This way the list stays complete even when someone only edits the documents and never opens the README./

### Added this changelog (`d144895`)
A list of every change, written in simple language, so friends and visitors can follow what was built and when. From now on, each commit adds a new entry to it.

### Fixed the word list pop-up and added a back arrow (`002e159`)
The "Words in this game" pop-up used to open already scrolled to the bottom, so the first words were hidden. It now always opens at the top. A round arrow button next to its title also lets players go back to the difficulty screen before the quiz starts.

### Added a menu tree and made pop-ups smoother (`8f8bf35`)
A small pine-tree button next to Settings opens a panel that shows where you are in the menu: level, category, topic, question type and difficulty. Every step you have already chosen is clickable, so you can jump back and change it. The panel slides in from the right on computers and up from the bottom on phones, and the blur behind pop-ups was removed so their animations run more smoothly.

### Added a "Next exercise" button (`1a57cc1`)
Every results page now has a "Next exercise" button. It opens the difficulty screen of the next quiz and marks it with a small "Next" tag: first the next difficulty, then the next question type, then the next topic. At the end of a category, a pop-up lets you choose where to go next.

### Added Claude to the Credits page (`db450c4`)
Claude is now listed on the Credits page, in first place, together with the two creators of the game.

### Added a Settings menu (`322f7e4`)
One gear button at the top now opens a Settings pop-up that replaces the old theme and sound buttons. It has the light/dark/auto theme choice, a sound switch and the "same duration" switch, each with a short explanation. The "same duration" switch is remembered, and it always matches the one on the difficulty screen.

### Moved two question checks to the written review (`b47c84f`)
Two checks (a Matching meaning that contains one of its own words, and repeated sentence patterns) are now done by the reviewer with the review checklist, instead of by the automatic checking tool. The tool's other checks stay as they were, because counting and word-list lookups are better done by a program.

### Wrote the rules for numbers and for new levels (`cdb6cb3`)
Added the rules for using numbers such as 12, 3rd or 10:30 in questions: they may appear in sentences, but the answer itself is always a word. Added notes for the future "Numbers and Amounts" theme, new items in the review checklist, and step-by-step instructions for preparing the word lists of other levels.

### Rewrote the list of planned features (`7dba5b0`)
The Roadmap now lists the plans: a history of plays, overall performance with comments, two separate reset buttons, a "Next exercise" button, a Settings menu, a maker for small lesson files, and a website. Each item has its open questions, so we decide them before building.

### Added two working rules and a "How to play" section (`aa7e6c3`)
Two new rules for the helper assistant: check that nothing contradicts before starting a task, and change every place at once when a rule changes. A new "How to play" section tells people to download only the `index.html` file and open it in a browser.

### Added a review checklist (`4dc2b37`)
A long checklist for reviewing questions the way an experienced teacher would, built from real mistakes found while writing the first theme. Also added the rule "draft first, review, then write" and a step-by-step guide for writing the next theme. The Roadmap gained a history, an overall performance score and a "Next exercise" button.

## 2026-10-31

### Finished the first theme and gave the game its name (`78e5424`)
All 16 quizzes of the first theme, "Greetings and Feelings", now have real questions, after adding True or False and Matching. Matching looks better on phones, with the pair number on the corner of each box. The game also got its name, "My Game Project", its credits, and final English texts for the menus and pop-ups.

### Added the first real questions (`e2f6e31`)
The first real questions (Multiple Choice and Fill in the Blanks) for "Greetings and Feelings", each with an explanation, and short meanings for the 34 words of the theme. The blank in Fill in the Blanks now has natural spacing around it, and the word pop-up has a single Start button.

### Prepared the game for real English vocabulary (`af6e5ee`)
Added the 15 A1 vocabulary themes, one separate quiz for each difficulty, and a "Words in this game" pop-up that shows the meanings before every quiz. Fill in the Blanks now needs typing and forgives small spelling mistakes (half points), Matching gives points for each correct pair, and the right answers are spread fairly across the positions. A long set of notes explains how questions should be planned and written.

### Added a rule to keep private files off GitHub (`d6b6424`)
A rule that the private folder with working files (word lists and plans) must never be uploaded to GitHub.

### Added 21 named grammar topics (`4b6ead0`)
A1 Grammar now shows 21 named topics, such as "To be", "Present simple" and "Comparatives and superlatives", instead of placeholder names. Other levels still use placeholders. The topic buttons now update whenever you choose a category.

### Added the first working rules (`41a1be8`)
Rules for the helper assistant: ask before building, keep everything in one file, keep placeholder text until it is named, keep all numbers in one settings block, test before handing over, and commit only when asked.

### Gave the game its look (`42c202e`)
Each level has its own color, there is a light and a dark mode, and the text uses the Inter font. Small effects were added: a gentle pop for correct answers, confetti for high scores, simple generated sounds and a mute button. All motion turns off for people who ask their device to reduce motion.

### Added the Roadmap (`d60c899`)
A list of planned work in the README: the design, deciding the menu items, filling the menus with real content, and a separate Academic Word List section.

### The first working version (`ec29752`)
A complete game in a single file: five levels, two categories, topics, four question types, four difficulties with timers, a results screen and a Credits pop-up. The questions were still placeholder text. The first documents describing how the game works and how it looks were added too.

### Project started (`ebaf01d`)
The repository was created.
