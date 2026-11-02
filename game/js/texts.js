/* js/texts.js - the English and Turkish texts and the text function t()
   Provides: t, LANGS, LANG_NAMES, I18N
   Needs: state */
'use strict';
/* =========================================================================
 * TEXTS (English / Turkish). t(key, params) gives a text in the chosen language; {name} is replaced from params.
 * Not translated, on purpose: topic names, questions, answer options and bank words, the game name, level codes,
 * the True / False answer buttons and people's names. See README.md "Language (English / Turkish)".
 * ========================================================================= */
const LANGS = ['en', 'tr'];
const LANG_NAMES = { en: 'English', tr: 'Türkçe' }; // always shown in their own language

const I18N = {
  en: {
    back: 'Back', backArrow: '← Back', close: 'Close',
    mainMenu: 'Main menu', menuTree: 'Menu tree', settings: 'Settings', credits: 'Credits',

    chooseLevel: 'Choose your level.',
    'levelGroup.A': 'A – Basic user', 'levelGroup.B': 'B – Independent user', 'levelGroup.C': 'C – Proficient user',
    'levelName.A1': 'Beginner', 'levelName.A2': 'Elementary', 'levelName.B1': 'Intermediate',
    'levelName.B2': 'Upper Intermediate', 'levelName.C1': 'Advanced',
    practiceTitle: 'What do you want to practice?', topicTitle: 'Choose a topic',
    typeTitle: 'Choose a question type', difficultyTitle: 'Choose a difficulty',
    'category.vocabulary': 'Vocabulary', 'category.grammar': 'Grammar',
    'type.mc': 'Multiple Choice', 'type.fill': 'Fill in the Blanks', 'type.tf': 'True or False', 'type.match': 'Matching',
    'difficulty.easy': 'Easy', 'difficulty.medium': 'Medium', 'difficulty.hard': 'Hard', 'difficulty.veryhard': 'Very Hard',
    nextTag: 'Next', secondsShort: '{n}s',
    sameDuration: 'Same duration per question across all difficulty settings',

    homeTitle: 'Go to the main menu?', homeBody: 'You will go back to the level selection screen.', no: 'No', yes: 'Yes',
    endTitle: 'End of {here}',
    endBody: 'You have reached the end of {here}. Where do you want to go next?',
    quitTitle: 'Quit quiz?', quitBody: 'Your answers in this quiz will be lost.', cancel: 'Cancel', quit: 'Quit',
    timeOutTitle: 'Time out',
    timeOutBodyPts: 'Time is up! Take {n} more seconds (−{p} points) or skip this question.',
    timeOutBody: 'Time is up! Take {n} more seconds or skip this question.',
    plusSecondsPts: '+{n} seconds (−{p} points)', plusSeconds: '+{n} seconds', skipQuestion: 'Skip question',
    gameOverTitle: 'Game over', gameOverBody: 'Time is up again, so the quiz ends here. Try again or see your results.',
    retry: 'Retry', seeResults: 'See results',
    wordsTitle: 'Words in this game', start: 'Start',

    languageName: 'Language',
    languageHelp: 'Choose the language of menus and buttons. Questions and answer options always stay in English.',
    themeName: 'Theme', themeHelp: 'Choose light or dark colors. Auto follows your device.',
    'theme.auto': 'Auto', 'theme.light': 'Light', 'theme.dark': 'Dark',
    soundName: 'Sound', soundHelp: 'Play sounds for correct and wrong answers and for the timer.',
    durationHelp: 'Every question gets {n} seconds, whatever the difficulty.',
    smartBoardName: 'SmartBoard mode',
    smartBoardHelp: 'Typing is hard on a smart board. When this is on, activities that ask you to type, like Fill in the Blanks, let you tap a word to put it in the blank instead.',
    smartBoardLock: 'You can change this between quizzes.',
    workInProgress: 'Work in Progress',

    treeTitle: 'Where you are',
    'step.level': 'Level', 'step.category': 'Category', 'step.topic': 'Topic', 'step.type': 'Question type', 'step.difficulty': 'Difficulty',
    notChosen: 'Not chosen yet', youAreHere: 'You are here',

    questionOf: 'Question {n} / {total}', score: 'Score', scoreNotGraded: 'Score: not graded yet',
    time: 'Time', extraTime: 'Extra time', next: 'Next', check: 'Check',
    typeInstruction: 'Type the missing word.', tapInstruction: 'Tap a word to put it in the blank.',
    yourAnswer: 'Your answer', theBlank: 'The blank',
    'feedback.correct': 'Correct!', 'feedback.almost': 'Almost!', 'feedback.partial': 'Partly correct.', 'feedback.incorrect': 'Incorrect.',
    answer: 'Answer', correctAnswer: 'Correct answer', explanation: 'Explanation', points: 'Points', result: 'Result', note: 'Note',
    spellingWarning: 'Check your spelling: "{answer}", not "{typed}".',
    pairsCorrect: '{n} of {total} pairs are correct.',
    resultsTitle: 'Your results', nextExercise: 'Next exercise',
    'count.correct': 'Correct', 'count.partial': 'Partly correct', 'count.misspelled': 'Misspelled',
    'count.incorrect': 'Incorrect', 'count.skipped': 'Skipped', 'count.unanswered': 'Not answered',
    'status.correct': 'Correct', 'status.partial': 'Partly correct', 'status.misspelled': 'Misspelled',
    'status.incorrect': 'Incorrect', 'status.skipped': 'Skipped (0)', 'status.unanswered': 'Not answered',
    'status.timedOut': 'Time ran out — game over',
    used: 'used', notGraded: 'not graded', questionNumber: 'Q{n}.',
  },
  tr: {
    back: 'Geri', backArrow: '← Geri', close: 'Kapat',
    mainMenu: 'Ana menü', menuTree: 'Menü ağacı', settings: 'Ayarlar', credits: 'Emeği Geçenler',

    chooseLevel: 'Seviyeni seç.',
    'levelGroup.A': 'A – Temel kullanıcı', 'levelGroup.B': 'B – Bağımsız kullanıcı', 'levelGroup.C': 'C – Yetkin kullanıcı',
    'levelName.A1': 'Başlangıç', 'levelName.A2': 'Temel', 'levelName.B1': 'Orta',
    'levelName.B2': 'Orta Üstü', 'levelName.C1': 'İleri',
    practiceTitle: 'Neyi çalışmak istiyorsun?', topicTitle: 'Bir konu seç',
    typeTitle: 'Bir soru türü seç', difficultyTitle: 'Bir zorluk seviyesi seç',
    'category.vocabulary': 'Kelime Bilgisi', 'category.grammar': 'Dil Bilgisi',
    'type.mc': 'Çoktan Seçmeli', 'type.fill': 'Boşluk Doldurma', 'type.tf': 'Doğru veya Yanlış', 'type.match': 'Eşleştirme',
    'difficulty.easy': 'Kolay', 'difficulty.medium': 'Orta', 'difficulty.hard': 'Zor', 'difficulty.veryhard': 'Çok Zor',
    nextTag: 'Sıradaki', secondsShort: '{n} sn',
    sameDuration: 'Tüm zorluk seviyelerinde soru başına aynı süre',

    homeTitle: 'Ana menüye gitmek istiyor musun?', homeBody: 'Seviye seçim ekranına geri döneceksin.', no: 'Hayır', yes: 'Evet',
    endTitle: '{here} tamamlandı',
    endBody: '{here} bölümünün sonuna geldin. Şimdi nereye gitmek istersin?',
    quitTitle: 'Alıştırmadan çıkmak istiyor musun?', quitBody: 'Bu alıştırmadaki cevapların kaybolacak.', cancel: 'Vazgeç', quit: 'Çık',
    timeOutTitle: 'Süre doldu',
    timeOutBodyPts: 'Süre doldu! {n} saniye daha al (−{p} puan) ya da bu soruyu atla.',
    timeOutBody: 'Süre doldu! {n} saniye daha al ya da bu soruyu atla.',
    plusSecondsPts: '+{n} saniye (−{p} puan)', plusSeconds: '+{n} saniye', skipQuestion: 'Soruyu atla',
    gameOverTitle: 'Oyun bitti', gameOverBody: 'Süre yine doldu, bu yüzden alıştırma burada bitiyor. Tekrar dene ya da sonuçlarını gör.',
    retry: 'Tekrar dene', seeResults: 'Sonuçları gör',
    wordsTitle: 'Bu oyundaki kelimeler', start: 'Başla',

    languageName: 'Dil',
    languageHelp: 'Menülerin ve düğmelerin dilini seç. Sorular ve cevap seçenekleri her zaman İngilizce kalır.',
    themeName: 'Tema', themeHelp: 'Açık ya da koyu renkleri seç. Otomatik, cihazının ayarını izler.',
    'theme.auto': 'Otomatik', 'theme.light': 'Açık', 'theme.dark': 'Koyu',
    soundName: 'Ses', soundHelp: 'Doğru ve yanlış cevaplarda ve süre sayacında ses çalınır.',
    durationHelp: 'Her soru, zorluk ne olursa olsun {n} saniye alır.',
    smartBoardName: 'Akıllı tahta modu',
    smartBoardHelp: 'Akıllı tahtada yazı yazmak zordur. Bu açıkken Boşluk Doldurma gibi yazmayı gerektiren etkinliklerde, yazmak yerine bir kelimeye dokunup boşluğa yerleştirirsin.',
    smartBoardLock: 'Bunu alıştırmalar arasında değiştirebilirsin.',
    workInProgress: 'Yapım aşamasında',

    treeTitle: 'Bulunduğun yer',
    'step.level': 'Seviye', 'step.category': 'Kategori', 'step.topic': 'Konu', 'step.type': 'Soru türü', 'step.difficulty': 'Zorluk',
    notChosen: 'Henüz seçilmedi', youAreHere: 'Buradasın',

    questionOf: 'Soru {n} / {total}', score: 'Puan', scoreNotGraded: 'Puan: henüz puanlanmıyor',
    time: 'Süre', extraTime: 'Ek süre', next: 'Sonraki', check: 'Kontrol et',
    typeInstruction: 'Eksik kelimeyi yaz.', tapInstruction: 'Boşluğa koymak için bir kelimeye dokun.',
    yourAnswer: 'Cevabın', theBlank: 'Boşluk',
    'feedback.correct': 'Doğru!', 'feedback.almost': 'Neredeyse!', 'feedback.partial': 'Kısmen doğru.', 'feedback.incorrect': 'Yanlış.',
    answer: 'Cevap', correctAnswer: 'Doğru cevap', explanation: 'Açıklama', points: 'Puan', result: 'Sonuç', note: 'Not',
    spellingWarning: 'Yazımını kontrol et: "{answer}" olmalı, "{typed}" değil.',
    pairsCorrect: '{total} çiftten {n} tanesi doğru.',
    resultsTitle: 'Sonuçların', nextExercise: 'Sonraki alıştırma',
    'count.correct': 'Doğru sayısı', 'count.partial': 'Kısmen doğru sayısı', 'count.misspelled': 'Yazım hatası sayısı',
    'count.incorrect': 'Yanlış sayısı', 'count.skipped': 'Atlanan sayısı', 'count.unanswered': 'Cevaplanmayan sayısı',
    'status.correct': 'Doğru', 'status.partial': 'Kısmen doğru', 'status.misspelled': 'Yazım hatalı',
    'status.incorrect': 'Yanlış', 'status.skipped': 'Atlandı (0)', 'status.unanswered': 'Cevaplanmadı',
    'status.timedOut': 'Süre bitti — oyun bitti',
    used: 'kullanıldı', notGraded: 'puanlanmıyor', questionNumber: 'Soru {n}.',
  },
};

// The text for `key` in the chosen language (English if a Turkish text is missing). {name} is replaced from params.
function t(key, params) {
  let text = I18N[state.lang] && I18N[state.lang][key];
  if (text === undefined) text = I18N.en[key];
  if (text === undefined) {
    console.warn(`Missing text: ${key}`);
    return key;
  }
  return params ? text.replace(/\{(\w+)\}/g, (match, name) => (name in params ? params[name] : match)) : text;
}

