# AGENTS.md

Before doing anything with the HTML file, you need to read README.md and DESIGN.md files in full. When it is needed and logical to edit README.md and DESIGN.md files, you can. README.md file should be filled with important details, the algorithms, anything you will need for the changes in HTML file to guide you in the future. DESIGN.md file should be filled with important details about the design process and design language and style. Don't change AGENTS.md unless asked.

## Rules

1. **Ask first.** Before writing code for a new feature or change, ask the owner about every important decision and wait for the answers.
2. **Single file.** Everything stays in `index.html`: no build step, no separate CSS/JS files, no audio or image files. The only external resource is the Inter font from Google Fonts.
3. **Placeholder content.** Any text the owner has not explicitly named stays lorem ipsum. The list of names fixed by the owner is in DESIGN.md.
4. **Don't decide open questions.** Do not invent rules for things that are still undecided (for example, the spelling rule for very short answers or the grammar content method). Follow the notes in README.md ("Open questions" and the Roadmap's open questions) and ask the owner.
5. **Numbers live in `CONFIG`.** Change times, points, thresholds and similar values only in the `CONFIG` object, and update the Configuration table in README.md whenever `CONFIG` changes.
6. **Test before handing over:**
   - no errors in the browser console;
   - works at phone width;
   - check both light and dark mode;
   - works with "reduce motion" turned on;
   - test remembered settings (theme, mute) in a normal browser, because previews served as `data:` URLs block `localStorage`.
7. **Git.** Commit only when asked, with a meaningful message. Do not push unless asked.
8. **Private `.gitignore/` folder.** The files in the `.gitignore/` folder must never be uploaded to GitHub: never `git add`, commit or push them. The folder is excluded locally through `.git/info/exclude` (a folder named `.gitignore` cannot work as an ignore file). For A1 work, read `ORG_A1_WORDS.md`. `A1_WORDS.md` should be read only when you work on creating a file in the same format as `ORG_A1_WORDS.md` (for example for another level), just to understand how the original word file is turned into a useful file for AI, or when the owner asks you to.
9. **Draft, review, then write.** Don't add questions (or explanations, glossary meanings or target-word plans) to the files right after you write them. Show them to the owner as a draft first, and remind the owner to ask you to review them again against the "Review checklist" in README.md, so that you can be sure before changing the files. Change the files only after that review and the owner's go-ahead. The steps are in README.md, "Workflow: draft → review → write".
10. **Check for inconsistencies first.** Before doing anything the owner asks, check whether something stands in its way or doesn't fit together: two rules that contradict each other, a rule that contradicts the request, docs that don't match the code (or the code and `CONFIG`), or anything else that is inconsistent (for example a target-word plan and its questions, or DESIGN.md and the page). If you find something, tell the owner what it is and where, suggest a fix, and wait for the answer before you continue.
11. **Change a rule everywhere.** When you change a rule, a decision, a name, a number or any other fact, find every place it appears and change it in all of them: AGENTS.md, README.md, DESIGN.md, `index.html` (code, `CONFIG`, comments, texts), the check script, the private files in `.gitignore/` (organized word files, plans; never `A1_WORDS.md` or another original word list, which are never changed) and your memory notes. Search for it (for example with grep) instead of relying on memory, because some rules are written in several sections of README.md. Then tell the owner which places you changed.
