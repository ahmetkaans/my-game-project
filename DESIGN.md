# DESIGN.md

## Status

The visual design is **decided** and applied in [game/index.html](game/index.html) (all CSS lives in the six files of [game/css/](game/css/)). Copy that the owner has not named explicitly is still lorem ipsum.

Names that are fixed by the owner: A1, A2, B1, B2, C1, Vocabulary, Grammar, Multiple Choice, Fill in the Blanks, True or False, Matching, Easy, Medium, Hard, Very Hard, "Same duration per question across all difficulty settings", Credits, Back, Time out, Game over, Skip question, Retry, Next exercise.

Student-facing text approved in real short English (not lorem): "Words in this game" and "Start" (pop-up), "Back" (its arrow), "Almost!", "Check your spelling: …", "Partly correct.", "… of 4 pairs are correct.".

**Turkish** (owner's request, 2026-11-01; see README "Language (English / Turkish)"). Every text has an English and a Turkish version in `I18N` in `game/js/texts.js`; the fixed names above, in Turkish (informal "sen" everywhere; "seviye" = level; "alıştırma" = quiz): Vocabulary = Kelime Bilgisi; Grammar = Dil Bilgisi; Multiple Choice = Çoktan Seçmeli; Fill in the Blanks = Boşluk Doldurma; True or False = Doğru veya Yanlış; Matching = Eşleştirme; Easy / Medium / Hard / Very Hard = Kolay / Orta / Zor / Çok Zor; "Same duration per question across all difficulty settings" = Tüm zorluk seviyelerinde soru başına aynı süre; Credits = Emeği Geçenler; Back = Geri; Main menu = Ana menü; Menu tree = Menü ağacı; Settings = Ayarlar; Time out = Süre doldu; Game over = Oyun bitti; Skip question = Soruyu atla; Retry = Tekrar dene; Next exercise = Sonraki alıştırma; the "Next" mark = Sıradaki; levels: A1 Başlangıç, A2 Temel, B1 Orta, B2 Orta Üstü, C1 İleri (groups: A – Temel kullanıcı, B – Bağımsız kullanıcı, C – Yetkin kullanıcı). Never translated: topic names, questions and their options, the True / False answer buttons, "My Game Project", level codes, people's names. All the other approved Turkish texts (menus, pop-ups, Settings, quiz screen, feedback, results) are in `I18N.tr` in `index.html`. In Turkish, numbers use a comma (12,5), and the quiz header label is the short "Puan".

Language row in Settings (owner approved the wording, 2026-11-01): name "Language" / "Dil"; the two sides are always "English" and "Türkçe"; explanation "Choose the language of menus and buttons. Questions and answer options always stay in English." / "Menülerin ve düğmelerin dilini seç. Sorular ve cevap seçenekleri her zaman İngilizce kalır." It is the first row of the pop-up.

Pop-up for a part without real questions (owner approved the wording, 2026-11-02): English title "Not finished yet", text "The part you want to go to is not finished yet. Do you still want to go there?", buttons "Go back" (the main button) and "Go there", and the tag "Not finished" on the grayed buttons; Turkish: "Henüz bitmedi", "Gitmek istediğin bölüm henüz tamamlanmadı. Yine de oraya gitmek istiyor musun?", "Geri dön", "Oraya git" and the tag "Henüz bitmedi".

Game name: **My Game Project** (level screen title and browser tab). Credits: **Claude**, **Ahmet Kaan Sarılarlı**, **Enes Miraç Ateş**.

Settings pop-up texts (approved with the plan, 2026-11-01; "Work in Progress" is the owner's own text):
- Title: "Settings"; button: "Close".
- Theme (Auto / Light / Dark): "Choose light or dark colors. Auto follows your device." While Trick or Treat is on the three buttons are grayed out and this text becomes: "Halloween mode is on. Turn off Trick or Treat to choose Auto, Light or Dark." (Turkish: "Cadılar Bayramı modu açık. Otomatik, Açık veya Koyu seçmek için Şeker mi şaka mı’yı kapat.")
- Trick or Treat (a switch after Theme; the name is the owner's, the explanations and the note above were drafted with the owner's go-ahead, 2026-11-03): "Gives the whole game a black and orange Halloween look." Turkish: name "Şeker mi şaka mı", "Bütün oyuna siyah turuncu bir Cadılar Bayramı görünümü verir."
- Sound: "Play sounds for correct and wrong answers and for the timer."
- Same duration per question across all difficulty settings (the fixed name, as on the Difficulty screen): "Every question gets 60 seconds, whatever the difficulty." (the number comes from `CONFIG.SAME_DURATION_SECONDS`)
- SmartBoard mode: "Typing is hard on a smart board. When this is on, activities that ask you to type, like Fill in the Blanks, let you tap a word to put it in the blank instead." While a quiz is on screen the switch is locked and shows "You can change this between quizzes." Instruction text on a tap Fill question: "Tap a word to put it in the blank."
- Note at the bottom: "Work in Progress".

Next exercise texts (approved with the plan, 2026-11-01):
- Results button: "Next exercise"; mark on the Difficulty screen: "Next".
- End-of-category pop-up: title "End of {level} {category}" (for example "End of A1 Vocabulary"); text "You have reached the end of {level} {category}. Where do you want to go next?"; buttons "{level} {category}" (for example "A1 Grammar", "A2 Vocabulary") and "Main menu".

Menu tree texts (approved with the plan, 2026-11-01):
- Button name (tooltip and screen readers): "Menu tree"; panel title: "Where you are"; button: "Close".
- Step captions: "Level", "Category", "Topic", "Question type", "Difficulty"; a step not chosen yet: "Not chosen yet"; the current step: "You are here".

Screen and pop-up texts approved by the owner:
- Level screen subtitle: "Choose your level."
- Main menu pop-up (approved 2026-11-01): title "Go to the main menu?"; text "You will go back to the level selection screen."; buttons "No" and "Yes" (Yes is primary).
- Level screen groups (approved 2026-11-01): "A - Basic user", "B - Independent user", "C - Proficient user" (shown with an en dash, in small capitals). Level names under the codes: A1 Beginner, A2 Elementary, B1 Intermediate, B2 Upper Intermediate, C1 Advanced.
- Screen titles: "What do you want to practice?" (category), "Choose a topic", "Choose a question type", "Choose a difficulty", "Your results".
- Fill in the Blanks instruction: "Type the missing word."
- Reload notice (approved 2026-11-03; no title, one button): "Oops, you reloaded the page. When you reload the page, you go back to the main menu." and the button "OK"; Turkish "Hay aksi, sayfayı yeniden yükledin. Sayfayı yeniden yüklediğinde ana menüye dönersin." and "Tamam". Escape and clicking outside close it.
- Quit pop-up: "Your answers in this quiz will be lost."
- Time out pop-up: "Time is up! Take 10 more seconds (−10 points) or skip this question." (numbers from `CONFIG`).
- Game over pop-up: "Time is up again, so the quiz ends here. Try again or see your results."

A1 Vocabulary themes (15, in this order; stored in `TOPICS_BY_SECTION['A1|vocabulary']`): Greetings and Feelings; Numbers and Amounts; People and Family; School and Classroom; Time and Dates; Home and Daily Routine; Food and Drink; Clothes and Colors; Town and Shopping; Free Time and Sports; Body and Health; Nature and Animals; Travel and the World; Jobs and Technology; Learning and Ideas.

A1 Grammar topics (21, in this order; stored in `TOPICS_BY_SECTION['A1|grammar']`): To be (am / is / are); A / an / the; Present simple; Present continuous; Past simple of "to be" (was / were); Past simple; Going to; Imperatives; Can / can't / could / couldn't; Questions (yes/no and wh-); There is / there are; How much / how many (countable and uncountable); Personal pronouns; Possessives (my, mine, 's); This / that / these / those; Adjectives with very / really; Comparatives and superlatives; Adverbs of frequency; Prepositions of place; Prepositions of time (in / on / at); Like / love / hate + -ing and I'd like.

## Style: "clean study app"

- Calm, focused and minimal, but not boring. For adults, teens and kids.
- Neutral surfaces everywhere; color comes only from the **level accent** and from the **correct / wrong** states. The one exception is the optional **Halloween theme** (Trick or Treat), a whole separate look: see "Light and dark mode".
- Soft white cards (`.card`, menu buttons) on a page background lightly tinted with the level color. Rounded corners (14px cards, 10px controls), very soft shadows, no hard lines.
- Works on phones and computers: single centered column (`max-width: 760px`, 16px side gutter), all tap targets at least 44–48px tall, menu grids are 2 columns on phones and auto-fill on wider screens, primary actions are full width on phones.

## Level colors

Each level's color is the accent (`--accent`) on **every screen inside that level** (category, topic, type, difficulty, quiz, results). It is set by `document.body.dataset.level`, which `showScreen()` updates.

| Level | Light mode | Dark mode |
|---|---|---|
| A1 teal | `#0F7A6C` | `#5CC9B8` |
| A2 blue | `#2F6FB8` | `#7DB1EC` |
| B1 violet | `#6B4FC0` | `#A894EE` |
| B2 rose | `#A8436F` | `#E89BBB` |
| C1 gold | `#A0670B` | `#E7B54F` |

- **Level selection screen** (no level chosen yet): neutral slate accent (`--neutral-accent`: `#44505C` / `#B4BEC9`). Each level button is tinted in its own level color as a preview (`.level-btn`, `--chip`).
- **Backgrounds** use tints of the accent made with `color-mix()`: `--page-bg` (page, ~7% light / ~10% dark), `--accent-soft` (hover, selection, word bank; ~12% / ~18%). In dark mode the same mix produces dark tints automatically.
- Text on accent-colored buttons: white in light mode, near-black in dark mode (`--on-accent`), because the dark-mode level colors are light.

## Other colors

| Token | Light | Dark | Use |
|---|---|---|---|
| `--ok` | `#1E7B3C` | `#6CCB8A` | correct answers only |
| `--bad` | `#B3261E` | `#F08A80` | wrong answers only |
| `--extra` | `#C2410C` | `#FB923C` | timer during the +10 s extra time |
| `--bg` / `--surface` | `#F6F6F3` / `#FFFFFF` | `#121417` / `#1A1D21` | page base / cards |
| `--fg` / `--muted` / `--border` | `#1D2125` / `#5F6670` / `#E3E3DE` | `#E6E8EB` / `#9AA1AA` / `#2C3137` | text / secondary text / lines |
| `--overlay` | `rgba(20,24,28,.5)` | `rgba(0,0,0,.66)` | the dim behind pop-ups and the menu tree (no blur, so their animations stay smooth) |

- Green and red are used **only** for correct and wrong answers (buttons, feedback box, results cards). Partly right answers use the level color.
- **Timer**: normal and low time use the level accent. Low time (< 25%) is shown with a gentle pulse and the ticking sound, not with red. Extra time uses deep orange **plus a diagonal stripe pattern** and an "Extra time" label, so it is clearly different from C1 gold (also in dark mode).

## Light and dark mode

- Follows the device setting by default (`prefers-color-scheme`).
- Theme is chosen in **Settings** with three buttons, **Auto / Light / Dark** (a segmented control). The choice is remembered in `localStorage` (`lg-theme`); a tiny script in `<head>` applies it before the first paint to avoid a flash.
- **Halloween theme** (Trick or Treat in Settings; owner's request, 2026-11-03; `css/halloween.css`): a whole third look that **replaces Auto / Light / Dark while it is on** (off by default, remembered as `lg-halloween`; Auto / Light / Dark are grayed out in Settings with a note). Chosen by the owner from sketches: **AMOLED black with thin orange lines**. Page and cards `#000000`; text `#F2F2F2` / `#B8B8B8`; **one pumpkin orange `#FF8A1F` for every accent** (the five level colors are five close orange shades, `#FF8A1F #FF9A3C #FF7A00 #FFA94D #FFB347`, only so the confetti has some variety); dim amber lines `#5A3A14` for ordinary borders; green `#4ADE80` and red `#F87171` for right and wrong answers; no shadows; pop-up dim `rgba(0,0,0,.82)`. Cards, menu buttons, level buttons, pop-ups, the menu tree panel and the round top bar buttons get a 1px orange outline; **unfinished buttons** get a dashed amber outline (`#5A3A14`), gray text (`#8A8A8A`) and an amber tag. Primary buttons are filled orange with black text. The ghost (thin orange line) sits in the top bar's left corner. Only token values and outlines change; layout, spacing and motion are the same. The look is made only in code (CSS and inline SVG).
- Tokens are defined on `:root` (light), redefined under `@media (prefers-color-scheme: dark) { :root:not([data-theme="light"]) }` and under `:root[data-theme="dark"]`. Only token values change between modes; layout, spacing and motion stay the same so the calm feel is identical.

## Typography

- **Inter** from Google Fonts, weights **400 (regular)** and **500 (medium)** only, `display=swap`.
- Fallback: the device's system font (`system-ui, -apple-system, "Segoe UI", Roboto, …`) — used automatically when offline or while Inter loads.
- Headings and buttons use 500; body text uses 400. No bold (600/700) weights. Numbers in the timer and score use tabular figures.

## Motion

All motion is short (≤ 350ms, confetti ~2.8s) and soft (ease-out, tiny distances). **The one exception is the Halloween walker** (Halloween theme only, see Components): a calm decoration that lasts much longer (one pass of about 25 s on a phone and about 57 s on a wide screen, then the 2.2 s sinking when a quiz starts).

- Screens and the feedback box fade/rise in by 4–6px.
- **Correct answer**: the correct element(s) do a gentle "pop" (scale to 1.035 and back, 320ms).
- Buttons press down slightly (`scale(.98)`).
- Low-time timer bar pulses softly.
- **Confetti** on the results screen for a high score: final score **≥ 80** (Multiple Choice, Fill in the Blanks, True or False) or **≥ 75** (Matching, which has partial points). Drawn on a temporary `<canvas>` in the five level colors, removed when done or when leaving the screen.
- **Menu tree**: the backdrop fades in (0.25s); on wide screens the drawer slides in from the right (0.28s, ease-out), on phones the sheet slides up (0.22s); then the steps fade and slide in one after another (0.06s apart, starting 0.12s in). Closing reverses it (`CONFIG.TREE_CLOSE_MS` = 280).
- **Halloween walker** (Trick or Treat only): one slow pass along the bottom per visit, drawn frame by frame by a script (not CSS); the feet, bumps, tugs, look-back, rope and the 2.2 s sinking into the ground are described under Components. It never moves faster than a calm walk (28 px per second), it lives behind everything, and it never blocks a tap.

## Sound

Generated with the Web Audio API in `game/js/sound.js` (no audio files):

- **Correct**: soft two-note sine chime (E5 → B5).
- **Partly right**: one soft sine note (D5), between the chime and the low tone.
- **Wrong**: gentle low triangle tone gliding down (A3 → F3).
- **Tick**: very quiet short sine blip once per second in the last 5 seconds of the normal timer and of the extra time.
- Sound is **on by default**. The Sound switch in **Settings** remembers the choice in `localStorage` (`lg-muted`).

## Controls placement

- Top bar (`.topbar`, right-aligned): three round icon buttons (inline SVG), **Main menu** (a house, in the level accent, hidden on the level screen; asks "Go to the main menu?" with No / Yes), the **menu tree** (a minimal pine tree, in the level accent) and **Settings** (a gear), the tree to the left of the gear. Shown on every screen **except the quiz screen**, to keep the quiz focused. The tree opens the menu tree panel; the gear opens the Settings pop-up (Language, Theme, Trick or Treat, Sound, Same duration, SmartBoard mode, "Work in Progress"). The Same duration switch also stays on the Difficulty screen, always showing the same value.
- In the Halloween theme a small **ghost** (thin orange line, 30px) sits at the left end of the top bar, opposite the round buttons; it is decoration only (hidden from screen readers).
- Back button: top-left text button on every screen except the level screen.
- Footer: Credits link on every screen except the quiz screen.

## Components

- **Menu button** (`.menu-btn`): white card button in a grid; optional `<small>` sub-label (seconds on difficulty buttons).
- **Level button** (`.level-btn`): bigger, tinted in its own level color; the level code in large type with its name below in a small, softer line. The buttons sit in three groups (`.level-group`) with a small muted uppercase heading (`.level-group-title`), 28px apart.
- **Unfinished button** (`.menu-btn.is-unfinished`, `.level-btn.is-unfinished`, `.unfinished-tag`; owner's request, 2026-11-02): a menu or level button whose part has no real questions yet. Softer, not disabled: muted text, a flat surface a little closer to the page color, no shadow, a thin neutral border; a level button keeps its **own level color**, only paler (text 60% level color, a tint of about half the usual strength). **No opacity** (the text keeps its contrast; the button stays a normal, focusable, clickable button). A small neutral pill tag in words ("Not finished" / "Henüz bitmedi", 0.75rem, muted, 1px border) sits in the button's own column under the label, so a long name never runs under it and color is never the only signal. Hover makes the button a little less pale. A click opens the "Not finished yet" pop-up (a normal modal, Go back is the primary button).
- **Primary button** (`button.primary`): accent background; Next, Check, Next exercise, main modal action. (Retry is a normal button.)
- **Next-quiz mark** (`.menu-btn.is-next`, `.next-tag`): after Next exercise, the suggested difficulty on the Difficulty screen gets an accent outline and a small accent pill "Next" in its top-right corner. It disappears when the student leaves the screen.
- **Icon button** (`.icon-btn`): 44px round, the menu tree and the Settings gear.
- **Settings pop-up** (`.settings`, `.setting`, `.setting-head`, `.setting-help`, `.segmented`, `.settings-note`): a dismissible modal (Escape or a click outside closes it; one **Close** button). One bordered row per setting: its name and control on one line (a **switch** on the right, or a three-button **segmented control** for Theme, selected button in the accent color), then a short muted explanation (0.9rem) underneath. At the bottom, a small muted centered "Work in Progress". Tap targets are at least 44px; rows and explanations wrap on phones.
- **Halloween walker** (`#walker`, `js/halloween-walker.js`; owner's idea and choices, 2026-11-03; Halloween theme only): a short decoration along the bottom, drawn in a **dark silhouette** style: figures filled `#171009` with a thin orange rim (`#FF8A1F`), a faint lantern glow (two thin amber rings and a ring of light on the ground, flat, no blur). A hooded, cloaked figure (dark face opening, two small glowing eyes) holds a lantern up in one hand and holds a rope in the other; the rope ties around the wrist of a skeleton that lies on its back on the ground and is dragged: it slides with slow bumps, its skull and legs swing loosely, small dust puffs rise behind it and a scratch line trails on the ground. The figure's feet lift and land, its cloak sways, the lantern swings and the flame flickers. **One pass per visit**, a few seconds after the page opens (when the switch was turned on in Settings: a few seconds after the Settings pop-up closes, so it is not hidden behind the dimmed page): it walks in from the left, eases to a stop in the middle (the rope goes slack, the skeleton slides a little further), the face turns back toward the skeleton for a moment, then it walks on (the skeleton lags, the rope pulls tight), now and then giving the rope a hard tug (the skeleton jerks forward), and leaves on the right. **It lives behind everything and outside the screens**, so changing menus never cuts it; it cannot be tapped and is hidden from screen readers. **When a quiz is about to start while it is still on screen**, about 2.2 s: everything stops; a hole opens in the ground (a gap in the ground line with glowing orange ends, a flat beam of light shooting up and a pool of light on the ground); the lantern flares; the figure sinks into the hole (clipped at the ground line) while sparks and dirt fly up and the lantern light goes out; the rope drags the skeleton along the ground into the hole; the hole closes; and then the quiz starts. It never returns in the same visit. With "reduce motion" it does not run. Not on the quiz screen.
- **Menu tree** (`.tree-overlay`, `.tree-panel`, `.tree`, `.tree-step`, `.tree-here`): a panel with the dimmed page behind it (no blur: a blur is recomputed on every animation frame and made the pop-ups choppy). Wide screens (600px and up): a full-height drawer on the right, about 340px wide. Phones: a bottom sheet with rounded top corners, at most 75% of the screen height, scrolling inside if needed. Inside, the five menu steps form a vertical tree, each one level deeper (14px) than the step above, joined by a thin elbow line (level-accent line color) and marked with a dot in the level accent. A step is a button of at least 56px: a small muted caption above its bold value. The step being chosen has an accent-soft background, a ring around its dot and a small accent pill "You are here"; steps not chosen yet are muted, with a hollow dot, and disabled. The tree uses the **level accent, not green** (green stays for answers only; the owner agreed).
- **Switch** (`.switch-row` / `.switch`): card row with a toggle in the accent color.
- **Language toggle** (`.lang-toggle`, `.lang-thumb`, `.lang-lbl`; owner chose this design from several mock-ups, 2026-11-01): a calm **sliding pill**, 176 × 44px, fully rounded. The track is a faint level-accent tint (11% accent over the surface) with a 1px accent-tinted border; **both names are always visible**, "English" and "Türkçe", in medium weight (the same weight on both, so nothing shifts), muted on the inactive side, `--on-accent` on the active one. The pill (accent fill, 3px inside the track on every side, a soft shadow and a 1px light edge on top) glides to the chosen side in 0.3s (`cubic-bezier(.22,.9,.3,1)`, under the 350ms limit) and shrinks to 0.98 while pressed, like the other buttons. It is a `div` with `role="switch"`, **not a button**, so no hover color change exists (the owner disliked a grey hover patch in a mock-up); keyboard focus shows the same 3px accent ring as the other switches. A tap on the left or right half picks that side; Left / Right pick a side, Space / Enter switch. Under "reduce motion" the slide is off. The row wraps (name above, toggle below) if a very narrow screen needs it.
- **Quiz header**: progress, running score, timer text (`.quiz-meta`) and a rounded timer bar (`.timer-bar`, states `.is-low`, `.is-extension`).
- **Question card** (`#quiz-question.card`): options are full-width 56px buttons; True/False are side by side.
- **Feedback box** (`.feedback.ok` / `.feedback.bad`): green or red tint.
- **Word bank + typed blank** (`.word-bank`, `.chip`, `.blank-input`): dashed accent-tinted bank with pill chips (display only) above the sentence; the blank is a text input inside the sentence with a light accent tint and an accent underline, fixed width (9.5em, never hints at the word's length), focus ring in the accent color. After Check it turns green (correct), red (wrong) or level-color tint (misspelled).
- **SmartBoard Fill** (`.chip` buttons, `.blank-slot`): the bank words are tappable pills (a tap puts the word into the blank at once; the placed one is faded with a dashed border); the blank is a tappable box with the same size and accent underline as the typed blank, and tapping the word in it takes it out; it turns green or red after Check. No new animation.
- **Partly right** (misspelled Fill answer, Matching question with 1–3 correct pairs): uses the **level color**, never green or red. Feedback box `.feedback.partial` (accent-soft background, accent heading "Almost!" / "Partly correct."), result card `st-partial` (accent left border).
- **Matching** (`.match-columns`, `.match-item`): two columns. On phones the word column is only as wide as its longest word (words never break in the middle), the meanings get the rest of the width, and the pair number badge sits on the box's top-right corner, so long meanings don't wrap into tall, narrow boxes. From 600px: equal columns, badge inside the box on the right; selected item gets accent outline + tint; paired items share a round number badge.
- **Modal** (`.modal-overlay`, `.modal`): card with soft shadow over a dimmed page (no blur, for smooth animation; the dim fades in over 0.2s, then the card rises). It always opens scrolled to its top; the main button is focused without scrolling the card. While it is open the page behind is `inert` (keyboard focus stays inside) and focus returns to the opener when it closes. A pop-up may have no title (the reload notice, owner's choice 2026-11-03: one sentence and one button): the title row is then hidden and the sentence names the pop-up for screen readers. **Every new pop-up must keep this behavior (owner's rule): use `openModal()`.
- **"Words in this game" pop-up** (`.word-list`): a modal before every quiz (and Retry). One soft accent-tinted row per tested word: the word (medium weight), then one line per word type it has at that level: the type (small, muted, italic) and its meaning. **The type used in that game is underlined** in the level color and shown in the normal text color. One button, **Start** (primary, as before); a round **back arrow** icon button (`#modal-back`, same style as the top-bar icon buttons, a left-pointing arrow) sits left of the title and leaves to the Difficulty screen; the list scrolls inside the modal when it is long (Matching: up to 16 words).
- **Results**: hero card with big score in the accent color, summary, actions; then one card per question with a colored left border (green / red / grey). Actions: **Next exercise** (primary, hidden after the very last quiz), Retry, Main menu; they wrap on phones.

## Open design work

- Topic names for A2–C1 (still lorem placeholders).
- Illustrations or icons for topics / question types (if wanted).
