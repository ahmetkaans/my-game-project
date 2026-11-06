/* js/topics.js - topic names, credits, the two lists the data files fill, lorem words, icons
   Provides: getTopics, DEFAULT_TOPICS, TOPICS_BY_SECTION, CREDITS, QUESTION_BANK, GLOSSARY, LOREM_WORDS, ICONS
   Needs: GAME_DATA */
'use strict';
/* =========================================================================
 * TOPICS AND DATA (topic names, credits, the JSON blocks, lorem words, icons)
 * ========================================================================= */
// Placeholder topic names, used for every level/category without its own list.
const DEFAULT_TOPICS = [
  'Lorem Ipsum', 'Dolor Sit', 'Amet Consectetur', 'Adipiscing Elit', 'Sed Eiusmod',
  'Tempor Incididunt', 'Labore Dolore', 'Magna Aliqua', 'Enim Minim', 'Veniam Nostrud',
];

// Real topic names per section. Key: `${level}|${category}`. Order = button order.
const TOPICS_BY_SECTION = {
  'A1|vocabulary': [
    'Greetings and Feelings',
    'Numbers and Amounts',
    'People and Family',
    'School and Classroom',
    'Time and Dates',
    'Home and Daily Routine',
    'Food and Drink',
    'Clothes and Colors',
    'Town and Shopping',
    'Free Time and Sports',
    'Body and Health',
    'Nature and Animals',
    'Travel and the World',
    'Jobs and Technology',
    'Learning and Ideas',
  ],
  'A1|grammar': [
    'To be (am / is / are)',
    'A / an / the',
    'Present simple',
    'Present continuous',
    'Past simple of "to be" (was / were)',
    'Past simple',
    'Going to',
    'Imperatives',
    "Can / can't / could / couldn't",
    'Questions (yes/no and wh-)',
    'There is / there are',
    'How much / how many (countable and uncountable)',
    'Personal pronouns',
    "Possessives (my, mine, 's)",
    'This / that / these / those',
    'Adjectives with very / really',
    'Comparatives and superlatives',
    'Adverbs of frequency',
    'Prepositions of place',
    'Prepositions of time (in / on / at)',
    "Like / love / hate + -ing and I'd like",
  ],
};

function getTopics(nav) {
  return TOPICS_BY_SECTION[`${nav.level}|${nav.category}`] || DEFAULT_TOPICS;
}

// Placeholder credits.
const CREDITS = ['Claude', 'Ahmet Kaan Sarılarlı', 'Enes Miraç Ateş'];

// Real questions and the glossary come from the files of data/ (loaded before this script, see index.html).
const QUESTION_BANK = GAME_DATA.questions;
const GLOSSARY = GAME_DATA.glossary;

const LOREM_WORDS = Array.from(new Set((
  'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et ' +
  'dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea ' +
  'commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur ' +
  'excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum'
).split(' ')));

// Inline SVG icons: the tree and Settings buttons in the top bar and the theme buttons in Settings (stroke uses currentColor).
const ICONS = {
  auto: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/></svg>',
  light: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  dark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m11 18-6-6 6-6"/></svg>',
  home: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 11.5 12 4l9 7.5"/><path d="M5.5 10v10h13V10"/><path d="M10 20v-5.5h4V20"/></svg>',
  history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><path d="M12 7v5l3 2"/></svg>',
  tree: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 5.5 12H9l-4 6h14l-4-6h3.5z"/><path d="M12 18v3"/></svg>',
  settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>',
};

