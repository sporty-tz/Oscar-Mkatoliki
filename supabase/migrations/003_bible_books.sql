-- ============================================================
-- OSCAR MKATOLIKI — Bible Books Reference Table
-- Run AFTER 002_seed_data.sql
-- Migrates bibleBooks.json (73 Catholic canonical books) to Supabase
-- ============================================================

BEGIN;

-- ─────────────────────────────────────────────────────────────
-- 1. TABLE
-- ─────────────────────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS bible_books (
  id          SERIAL PRIMARY KEY,
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,   -- used by Bible reader API calls
  chapters    INT  NOT NULL,
  testament   TEXT NOT NULL CHECK (testament IN ('OT', 'NT')),
  is_deutero  BOOLEAN NOT NULL DEFAULT false,  -- Deuterocanonical books
  sort_order  INT NOT NULL            -- canonical Catholic order
);

-- Update bible_bookmarks to FK-reference bible_books if desired (optional)
-- ALTER TABLE bible_bookmarks ADD COLUMN IF NOT EXISTS book_id INT REFERENCES bible_books(id);


-- ─────────────────────────────────────────────────────────────
-- 2. SEED — 73 books in canonical Catholic order
--    OT: 46 books (7 deuterocanonical)
--    NT: 27 books
-- ─────────────────────────────────────────────────────────────

INSERT INTO bible_books (sort_order, name, slug, chapters, testament, is_deutero) VALUES
  -- ── Old Testament ──────────────────────────────────────────
  (1,  'Genesis',        'genesis',        50,  'OT', false),
  (2,  'Exodus',         'exodus',         40,  'OT', false),
  (3,  'Leviticus',      'leviticus',      27,  'OT', false),
  (4,  'Numbers',        'numbers',        36,  'OT', false),
  (5,  'Deuteronomy',    'deuteronomy',    34,  'OT', false),
  (6,  'Joshua',         'joshua',         24,  'OT', false),
  (7,  'Judges',         'judges',         21,  'OT', false),
  (8,  'Ruth',           'ruth',            4,  'OT', false),
  (9,  '1 Samuel',       '1+samuel',       31,  'OT', false),
  (10, '2 Samuel',       '2+samuel',       24,  'OT', false),
  (11, '1 Kings',        '1+kings',        22,  'OT', false),
  (12, '2 Kings',        '2+kings',        25,  'OT', false),
  (13, '1 Chronicles',   '1+chronicles',   29,  'OT', false),
  (14, '2 Chronicles',   '2+chronicles',   36,  'OT', false),
  (15, 'Ezra',           'ezra',           10,  'OT', false),
  (16, 'Nehemiah',       'nehemiah',       13,  'OT', false),
  (17, 'Tobit',          'tobit',          14,  'OT', true),   -- deutero
  (18, 'Judith',         'judith',         16,  'OT', true),   -- deutero
  (19, 'Esther',         'esther',         10,  'OT', false),
  (20, '1 Maccabees',    '1+maccabees',    16,  'OT', true),   -- deutero
  (21, '2 Maccabees',    '2+maccabees',    15,  'OT', true),   -- deutero
  (22, 'Job',            'job',            42,  'OT', false),
  (23, 'Psalms',         'psalms',        150,  'OT', false),
  (24, 'Proverbs',       'proverbs',       31,  'OT', false),
  (25, 'Ecclesiastes',   'ecclesiastes',   12,  'OT', false),
  (26, 'Song of Solomon','song+of+solomon', 8,  'OT', false),
  (27, 'Wisdom',         'wisdom',         19,  'OT', true),   -- deutero
  (28, 'Sirach',         'sirach',         51,  'OT', true),   -- deutero
  (29, 'Isaiah',         'isaiah',         66,  'OT', false),
  (30, 'Jeremiah',       'jeremiah',       52,  'OT', false),
  (31, 'Lamentations',   'lamentations',    5,  'OT', false),
  (32, 'Baruch',         'baruch',          6,  'OT', true),   -- deutero
  (33, 'Ezekiel',        'ezekiel',        48,  'OT', false),
  (34, 'Daniel',         'daniel',         14,  'OT', false),
  (35, 'Hosea',          'hosea',          14,  'OT', false),
  (36, 'Joel',           'joel',            3,  'OT', false),
  (37, 'Amos',           'amos',            9,  'OT', false),
  (38, 'Obadiah',        'obadiah',         1,  'OT', false),
  (39, 'Jonah',          'jonah',           4,  'OT', false),
  (40, 'Micah',          'micah',           7,  'OT', false),
  (41, 'Nahum',          'nahum',           3,  'OT', false),
  (42, 'Habakkuk',       'habakkuk',        3,  'OT', false),
  (43, 'Zephaniah',      'zephaniah',       3,  'OT', false),
  (44, 'Haggai',         'haggai',          2,  'OT', false),
  (45, 'Zechariah',      'zechariah',      14,  'OT', false),
  (46, 'Malachi',        'malachi',         4,  'OT', false),
  -- ── New Testament ──────────────────────────────────────────
  (47, 'Matthew',           'matthew',           28, 'NT', false),
  (48, 'Mark',              'mark',              16, 'NT', false),
  (49, 'Luke',              'luke',              24, 'NT', false),
  (50, 'John',              'john',              21, 'NT', false),
  (51, 'Acts',              'acts',              28, 'NT', false),
  (52, 'Romans',            'romans',            16, 'NT', false),
  (53, '1 Corinthians',     '1+corinthians',     16, 'NT', false),
  (54, '2 Corinthians',     '2+corinthians',     13, 'NT', false),
  (55, 'Galatians',         'galatians',          6, 'NT', false),
  (56, 'Ephesians',         'ephesians',          6, 'NT', false),
  (57, 'Philippians',       'philippians',        4, 'NT', false),
  (58, 'Colossians',        'colossians',         4, 'NT', false),
  (59, '1 Thessalonians',   '1+thessalonians',    5, 'NT', false),
  (60, '2 Thessalonians',   '2+thessalonians',    3, 'NT', false),
  (61, '1 Timothy',         '1+timothy',          6, 'NT', false),
  (62, '2 Timothy',         '2+timothy',          4, 'NT', false),
  (63, 'Titus',             'titus',              3, 'NT', false),
  (64, 'Philemon',          'philemon',           1, 'NT', false),
  (65, 'Hebrews',           'hebrews',           13, 'NT', false),
  (66, 'James',             'james',              5, 'NT', false),
  (67, '1 Peter',           '1+peter',            5, 'NT', false),
  (68, '2 Peter',           '2+peter',            3, 'NT', false),
  (69, '1 John',            '1+john',             5, 'NT', false),
  (70, '2 John',            '2+john',             1, 'NT', false),
  (71, '3 John',            '3+john',             1, 'NT', false),
  (72, 'Jude',              'jude',               1, 'NT', false),
  (73, 'Revelation',        'revelation',        22, 'NT', false)
ON CONFLICT (slug) DO NOTHING;

COMMIT;
