# Changelog

What changed in My Game Project, in plain language. The newest change is at the top. Every commit adds one entry here: its date, a short title and two or three sentences about what was added or changed. The code in brackets is the commit's ID on GitHub, so you can open that exact version.

## 2026-11-03

### A small notice after the page is reloaded
When the page is reloaded, the game starts again on the main menu, as before, but now a small pop-up says so: "Oops, you reloaded the page. When you reload the page, you go back to the main menu." (Turkish too, with an OK / Tamam button). It has no title, and Escape or a click outside closes it. With Trick or Treat on, the walker waits until it is closed. The pop-up engine can now show a pop-up without a title. The notes say that the browser's back and forward buttons are still not used, and the Roadmap has the idea for later.

### A black and orange Halloween theme, "Trick or Treat", with a walking scene (`25df911`)
Settings has a new switch, Trick or Treat (Şeker mi şaka mı in Turkish), that turns the whole game into a Halloween look: pure black, one pumpkin orange, thin orange lines and a small ghost in the top corner. While it is on, Auto, Light and Dark are grayed out with a note, and the choice is remembered. A few seconds after the game opens (after Settings closes, when the switch was turned on there), a hooded figure with a lantern walks across the bottom once, dragging a skeleton on a rope, stops to look back, tugs the rope now and then and leaves. It lives behind everything, so changing menus never cuts it, and if a quiz starts while it is still on screen it sinks into a glowing hole in the ground and the quiz starts after it. It only runs once per visit and not with "reduce motion". Everything is drawn in code, so the game still opens by double-click from the folder and works the same on a website.

### The notes now cover the walking scene fully (`bcef30a`)
The README and DESIGN notes now say that the Halloween walker is the one long animation (everything else is short), that it does not run with "reduce motion", and that a quiz waits a little while the walker sinks into the ground. This is only a change to the notes; the game itself is the same.
### Clearer working notes
The README now explains the private tools and the git leftovers (the `split` branch and the `before-split` tag), has a Website check list so every change works both from the folder and on a website, and describes the idea of a compact single-file lesson maker. The rules for the helper assistant now say that a question or a "yes" to one item is never a go-ahead for the other items, and that every change must work both on a website and from the folder.

## 2026-11-02

### Menu buttons that lead to unfinished parts are grayed out and ask first (`0eb20f1`)
A button whose part has no real questions yet (A2 to C1, A1 Grammar and the A1 vocabulary themes that are still placeholders) is now softer and carries a small "Not finished" tag, but keeps its level color and still works. Clicking it asks "The part you want to go to is not finished yet. Do you still want to go there?" with Go back or Go there, in English and Turkish. Only the first such button on a path is gray, Next exercise asks too when it leads from a finished theme into an unfinished one, and the gray disappears by itself as soon as a part gets real questions.

### The game is now split into several tidy files, and a folder for what players need (`e8121f8`)
The split is finished and joined into the main version. A player opens `game/index.html`: the page only holds the screens, the look is in 5 files, the code in 22 small files that each start with a note of what they give and need, and the questions and word meanings in files of their own (one per theme). The old single-file game is kept safely in a private archive folder. The notes were tidied too (a plain "what is in this folder" paragraph, the new rules for the private folder), and the final tests passed: the whole-game test, phone width in light, dark and Turkish, and saved settings.

### All the game code now lives in its own files (`796723f`)
The last cutting step of the split, made on the separate working copy. The rest of the code (questions, menus, pop-ups, settings, the quiz, the timer, the question screens, the results and the start-up) moved into fourteen more small files in `game/js/`, so the page itself only holds the screens and a list of the files to load. Nothing changed for a player: the joined files are exactly the old code text, the whole-game test still passes, and the screens look the same in light, dark and Turkish.

### The first part of the game code moves into its own files (`4cddfd1`)
The third step of the split, made on the separate working copy. The numbers, the English and Turkish texts, the topic names, the helper tools, the language switch, the theme, the sounds and the confetti now live in eight small files in `game/js/`, each starting with a short note that says what it provides and what it needs from the other files. Nothing changed for a player: the joined files are exactly the old code text, the whole-game test still passes, and the screens look the same in light, dark and Turkish.

### The questions and word meanings move out of the page into their own files (`4c8d9b5`)
The second step of the split, made on the separate working copy. The real questions now live in one small file per theme (`game/data/questions/`), and the word meanings in one file per level (`game/data/glossary/`), instead of two huge blocks inside the page, which is now about 500 lines shorter. Nothing changed for a player: the files read back give exactly the old questions and meanings, the whole-game test still passes, and the question checker gives the same report as before.

### The game page moves into a game folder and its look gets its own files (`c69e036`)
This is the first real step of the split, made on a separate working copy. The page now lives in `game/index.html`, and all of its look is in five small files in `game/css/` (colors, layout, quiz, results, dialogs). Nothing changed for a player: the page looks and plays exactly the same, which was checked by comparing the text of the style files, the computed look of the screens in light and dark, and a test that plays the whole game by itself. The working rule about "one single file" was reworded, and "How to play" now says to download the ZIP and open `game/index.html`.

### First safe steps toward splitting the game into several files (`aa371ca`)
Nothing in the game itself changed. A test that plays the whole game by itself was added (about 300 checks, covering every question type, the timer, pop-ups, language and settings), and a practice run of the split showed that cutting the page into 27 smaller files loses nothing: the joined files are exactly the old text. The private notes folder was also tidied into four drawers (tools, drafts, word lists, plans).

### Helper agents dropped from the plan, and a small saving in the notes (`3b03dc8`)
The notes no longer suggest using helper agents or a second AI reviewer, because they used too much of the owner's working space. Questions are reviewed in the main conversation by reading, with a quote for every hard item. The file map also now says to read only the first 12 lines of this changelog when adding an entry.

### New tools to write and review questions more safely (`9536b30`)
The question checker can now check a draft together with the questions that already exist, so repeated sentences and names are caught before you see the draft. Its report is much shorter, and it always ends by saying that a person must still read and review the questions. It can also print "review pages" for a reader (every option in the sentence, every Matching meaning against all four words) and has its own set of 26 self-tests. The working rules and the guide in the README were updated to match, and drafts now live in a private folder.

### Added a file map so the notes are quicker and cheaper to use (`6dc0b7a`)
The README now starts with a map that says where everything is and what to read for each kind of task, so a helper no longer has to read the whole file first. A new working rule keeps the map up to date, and a private checker also looks for out-of-date names in the notes. In a test with six helpers, the answers were just as correct and used about 40% fewer tokens. A few old lines in the notes were corrected, and the testing rule now lists all five saved settings.

## 2026-11-01

### Turkish now covers the quiz, the feedback and the results (`ea4d67c`)
With the Turkish switch on, the quiz screen (question number, score, timer, buttons), the answer feedback and the whole results screen are in Turkish too. Scores use a comma in Turkish (12,5 instead of 12.5). If you change the language while looking at the results, the page switches at once. Questions, answer options and the True / False buttons stay in English.

### Added a Turkish language switch for the menus (first half) (`8f4af6c`)
Settings now has a Language switch, English by default, with a sliding English / Türkçe pill. In Turkish, the menus, buttons, level names, the menu tree, Settings and the pop-ups (like Quit and Time out) are shown in Turkish, and the choice is remembered. Questions and their answer options always stay in English, and the quiz screen and results will follow in the next step.

### Finished "Numbers and Amounts": True or False and Matching (`12b7eb1`)
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
