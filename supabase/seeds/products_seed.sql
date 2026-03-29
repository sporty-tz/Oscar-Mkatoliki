-- ============================================================
-- OSCALIUS CATHOLIC STORE — Sample Product Seed Data
-- Categories  → Brands → Products → Inventory → Media → Pricing
-- All IDs are deterministic UUIDs — safe to re-run (idempotent).
-- ============================================================

BEGIN;

-- ─────────────────────────────────────────────────────────────
-- 0. Currency
-- ─────────────────────────────────────────────────────────────
INSERT INTO currencies (code, name, symbol)
VALUES
  ('TSH', 'Tanzanian Shilling', 'TSh'),
  ('USD', 'US Dollar',          '$')
ON CONFLICT (code) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 1. Categories  (5 shown in the nav screenshot)
-- ─────────────────────────────────────────────────────────────
INSERT INTO categories (id, name, slug, image_url, icon_class, is_active, sort_order)
VALUES
  (
    'ca000001-0000-0000-0000-000000000001',
    'Books',
    'books',
    'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80',
    'icofont-book',
    true, 1
  ),
  (
    'ca000001-0000-0000-0000-000000000002',
    'Devotionals',
    'devotionals',
    'https://images.unsplash.com/photo-1544967919-44c1ef2f9e4c?w=600&q=80',
    'icofont-prayer',
    true, 2
  ),
  (
    'ca000001-0000-0000-0000-000000000003',
    'Sacraments',
    'sacraments',
    'https://images.unsplash.com/photo-1509909756405-be0199881695?w=600&q=80',
    'icofont-cross',
    true, 3
  ),
  (
    'ca000001-0000-0000-0000-000000000004',
    'Home & Gifts',
    'home-gifts',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&q=80',
    'icofont-home',
    true, 4
  ),
  (
    'ca000001-0000-0000-0000-000000000005',
    'Church Essentials',
    'church-essentials',
    'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=600&q=80',
    'icofont-church',
    true, 5
  )
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 2. Brands
-- ─────────────────────────────────────────────────────────────
INSERT INTO brands (id, name, slug, image_url, is_active, sort_order)
VALUES
  (
    'ba000001-0000-0000-0000-000000000001',
    'Oscalius',
    'oscalius',
    'https://picsum.photos/seed/oscalius-brand/200/80',
    true, 1
  ),
  (
    'ba000001-0000-0000-0000-000000000002',
    'Don Bosco Press',
    'don-bosco-press',
    'https://picsum.photos/seed/donbosco-brand/200/80',
    true, 2
  ),
  (
    'ba000001-0000-0000-0000-000000000003',
    'Paulines Africa',
    'paulines-africa',
    'https://picsum.photos/seed/paulines-brand/200/80',
    true, 3
  ),
  (
    'ba000001-0000-0000-0000-000000000004',
    'Kenzan Crafts',
    'kenzan-crafts',
    'https://picsum.photos/seed/kenzan-brand/200/80',
    true, 4
  ),
  (
    'ba000001-0000-0000-0000-000000000005',
    'Liturgia Supply Co.',
    'liturgia-supply',
    'https://picsum.photos/seed/liturgia-brand/200/80',
    true, 5
  )
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 3. Products  (25 products — 5 per category)
-- ─────────────────────────────────────────────────────────────

-- ── 3a. BOOKS ────────────────────────────────────────────────
INSERT INTO products (
  id, category_id, brand_id,
  name, slug, short_description, description, sku,
  image_url, gallery_urls,
  price, old_price, currency,
  unit, rating, review_count, inventory_count, inventor_count,
  labels, is_featured, is_active
) VALUES

( 'ac000001-0000-0000-0000-000000000001',
  'ca000001-0000-0000-0000-000000000001',
  'ba000001-0000-0000-0000-000000000002',
  'Holy Bible — Catholic Edition (Swahili/English)',
  'holy-bible-catholic-swahili-english',
  'Dual-language Catholic Bible with deuterocanonical books, maps, and commentary.',
  'The complete Catholic Bible in both Swahili and English. Includes all 73 books, detailed footnotes, concordance, full-colour maps, and a guide to daily readings. Ideal for personal study, liturgy, and family prayer.',
  'BK-001',
  'https://images.unsplash.com/photo-1585559700398-1385b3a8aeb6?w=600&q=80',
  '["https://images.unsplash.com/photo-1585559700398-1385b3a8aeb6?w=600&q=80","https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80"]',
  22000.00, 27000.00, 'TSH',
  'piece', 4.90, 42, 80, 80,
  '["Best Seller","New"]', true, true
),

( 'ac000001-0000-0000-0000-000000000002',
  'ca000001-0000-0000-0000-000000000001',
  'ba000001-0000-0000-0000-000000000003',
  'Daily Mass Companion — Catholic Prayer Book',
  'daily-mass-companion-prayer-book',
  'Complete guide for following the Holy Mass with liturgical prayers and responses.',
  'A beautifully bound prayer book covering every part of the Mass, the Liturgy of the Hours, Rosary, Chaplets, and common novenas. Laminated tabs make navigation easy. Suitable for adults and young people alike.',
  'BK-002',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  '["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80"]',
  16500.00, NULL, 'TSH',
  'piece', 4.75, 28, 60, 60,
  '[]', false, true
),

( 'ac000001-0000-0000-0000-000000000003',
  'ca000001-0000-0000-0000-000000000001',
  'ba000001-0000-0000-0000-000000000003',
  'Life of Saint Francis of Assisi',
  'life-of-saint-francis-of-assisi',
  'Inspiring biography of the patron saint of nature and the poor.',
  'A richly illustrated narrative of the life, miracles, and teachings of Saint Francis of Assisi. Written for East African readers, exploring his relevance to modern life and Catholic mission. 224 pages, softcover.',
  'BK-003',
  'https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=600&q=80',
  '["https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=600&q=80"]',
  18000.00, 21000.00, 'TSH',
  'piece', 4.60, 17, 45, 45,
  '["Sale"]', false, true
),

( 'ac000001-0000-0000-0000-000000000004',
  'ca000001-0000-0000-0000-000000000001',
  'ba000001-0000-0000-0000-000000000002',
  'My First Catholic Catechism — Children''s Edition',
  'my-first-catholic-catechism-children',
  'Colourful illustrated catechism for children aged 5–12 in simple language.',
  'Introduces the Creed, Sacraments, Commandments, and prayer to young children using bright illustrations, stories, and activity pages. Based on the Catechism of the Catholic Church. Printed in Swahili with English glossary.',
  'BK-004',
  'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80',
  '["https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80"]',
  12000.00, NULL, 'TSH',
  'piece', 4.85, 34, 100, 100,
  '["Popular"]', true, true
),

( 'ac000001-0000-0000-0000-000000000005',
  'ca000001-0000-0000-0000-000000000001',
  'ba000001-0000-0000-0000-000000000001',
  'Catholic Living Study Guide — RCIA & Faith Formation',
  'catholic-living-study-guide-rcia',
  'Comprehensive RCIA and adult faith formation workbook.',
  'Designed for RCIA candidates, confirmation classes, and adult continuing education. Covers Church history, doctrine, Scripture, morality, sacramental life, and social teaching. Includes discussion questions and journaling prompts.',
  'BK-005',
  'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80',
  '["https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80"]',
  15000.00, NULL, 'TSH',
  'piece', 4.50, 12, 55, 55,
  '[]', false, true
),

-- ── 3b. DEVOTIONALS ──────────────────────────────────────────

( 'ac000001-0000-0000-0000-000000000006',
  'ca000001-0000-0000-0000-000000000002',
  'ba000001-0000-0000-0000-000000000004',
  'Crystal Rosary Beads — White with Silver Crucifix',
  'crystal-rosary-beads-white-silver',
  'Handcrafted crystal-bead rosary with a detailed silver-tone crucifix.',
  'Five-decade rosary made with hand-polished crystal beads strung on durable stainless steel wire. The centrepiece features Our Lady of Fatima and the crucifix is detailed with corpus Christi. Presented in a velvet gift pouch.',
  'DV-001',
  'https://images.unsplash.com/photo-1544967919-44c1ef2f9e4c?w=600&q=80',
  '["https://images.unsplash.com/photo-1544967919-44c1ef2f9e4c?w=600&q=80"]',
  9500.00, 13000.00, 'TSH',
  'piece', 4.95, 67, 120, 120,
  '["Best Seller","Sale"]', true, true
),

( 'ac000001-0000-0000-0000-000000000007',
  'ca000001-0000-0000-0000-000000000002',
  'ba000001-0000-0000-0000-000000000003',
  'Novena to Our Lady of Fatima — Prayer Booklet',
  'novena-our-lady-of-fatima',
  'Nine-day novena booklet with scripture readings, reflections, and the complete Fatima prayers.',
  'A compact yet beautifully designed novena guide covering all nine days of prayer to Our Lady of Fatima. Each day includes a scripture reading, meditation, the Fatima prayers, and intercessions. 48 pages, A6 size, full colour.',
  'DV-002',
  'https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=600&q=80',
  '["https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=600&q=80"]',
  5500.00, NULL, 'TSH',
  'piece', 4.70, 22, 200, 200,
  '[]', false, true
),

( 'ac000001-0000-0000-0000-000000000008',
  'ca000001-0000-0000-0000-000000000002',
  'ba000001-0000-0000-0000-000000000001',
  'Saint Jude Thaddeus Prayer Cards — Pack of 10',
  'saint-jude-prayer-cards-pack-10',
  'Laminated holy cards with Saint Jude image on front and novena prayer on the back.',
  'Pack of 10 durable laminated prayer cards featuring a full-colour icon of Saint Jude Thaddeus on the front and the traditional prayer for hopeless causes on the reverse. Credit-card size — fits easily in a wallet or missal.',
  'DV-003',
  'https://picsum.photos/seed/prayer-card-saint/600/600',
  '["https://picsum.photos/seed/prayer-card-saint/600/600"]',
  4000.00, NULL, 'TSH',
  'pack', 4.40, 9, 500, 500,
  '[]', false, true
),

( 'ac000001-0000-0000-0000-000000000009',
  'ca000001-0000-0000-0000-000000000002',
  'ba000001-0000-0000-0000-000000000004',
  'Seven Sorrows Chaplet — Wooden Beads',
  'seven-sorrows-chaplet-wooden-beads',
  'Traditional seven-sorrows chaplet carved from olive wood with a Mater Dolorosa medal.',
  'A chaplet of seven groups of seven beads made from genuine olive wood, honouring the Seven Sorrows of Our Lady. Includes a pewter Mater Dolorosa centrepiece and an Our Lady of Sorrows medal. Supplied with a prayer leaflet.',
  'DV-004',
  'https://picsum.photos/seed/wooden-chaplet-beads/600/600',
  '["https://picsum.photos/seed/wooden-chaplet-beads/600/600"]',
  8000.00, 10000.00, 'TSH',
  'piece', 4.65, 14, 75, 75,
  '["Sale"]', false, true
),

( 'ac000001-0000-0000-0000-000000000010',
  'ca000001-0000-0000-0000-000000000002',
  'ba000001-0000-0000-0000-000000000001',
  'Morning & Evening Meditation Set',
  'morning-evening-meditation-set',
  'A 90-day guided journal and reflection card deck for daily Catholic prayer.',
  'Set includes a 192-page hardcover journal with daily prompts for Lauds and Vespers, plus a 40-card deck of Scripture verses and saint quotes. Presented in a sturdy kraft box. Perfect as a personal retreat companion or gift.',
  'DV-005',
  'https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&q=80',
  '["https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&q=80"]',
  22000.00, NULL, 'TSH',
  'set', 4.80, 19, 40, 40,
  '["New"]', true, true
),

-- ── 3c. SACRAMENTS ───────────────────────────────────────────

( 'ac000001-0000-0000-0000-000000000011',
  'ca000001-0000-0000-0000-000000000003',
  'ba000001-0000-0000-0000-000000000001',
  'Baptism Gift Set — Candle, Rosary & Keepsake Card',
  'baptism-gift-set-candle-rosary-card',
  'Complete baptism gift — white candle, white rosary, and a personalised keepsake card boxed together.',
  'Everything needed to celebrate a new Christian. Includes a hand-dipped 30 cm white baptism candle with a golden cross motif, a pearl-white rosary, and a thick keepsake card with space for the child''s name and date. Presented in a white linen gift box.',
  'SC-001',
  'https://images.unsplash.com/photo-1509909756405-be0199881695?w=600&q=80',
  '["https://images.unsplash.com/photo-1509909756405-be0199881695?w=600&q=80","https://picsum.photos/seed/baptism-set-detail/600/600"]',
  35000.00, 40000.00, 'TSH',
  'set', 4.90, 31, 50, 50,
  '["Best Seller","Sale"]', true, true
),

( 'ac000001-0000-0000-0000-000000000012',
  'ca000001-0000-0000-0000-000000000003',
  'ba000001-0000-0000-0000-000000000004',
  'First Holy Communion Keepsake Box',
  'first-holy-communion-keepsake-box',
  'Engraved white wooden keepsake box for storing First Communion mementos.',
  'A hand-painted white wooden box (18×12×8 cm) featuring a gold-tone relief chalice and wheat design on the lid. Interior lined with ivory satin fabric. Ideal for storing a rosary, prayer card, photo, and other Communion day mementos.',
  'SC-002',
  'https://picsum.photos/seed/communion-keepsake-box/600/600',
  '["https://picsum.photos/seed/communion-keepsake-box/600/600","https://picsum.photos/seed/communion-box-open/600/600"]',
  28000.00, NULL, 'TSH',
  'piece', 4.85, 26, 35, 35,
  '["Popular"]', false, true
),

( 'ac000001-0000-0000-0000-000000000013',
  'ca000001-0000-0000-0000-000000000003',
  'ba000001-0000-0000-0000-000000000001',
  'Confirmation Gift Set — Bible, Rosary & Medal',
  'confirmation-gift-set-bible-rosary-medal',
  'Thoughtful three-piece gift for Confirmation: pocket Bible, rosary, and personalised patron-saint medal.',
  'Set includes a compact New Testament & Psalms (Swahili/English, hard cover), a blue crystal rosary, and a personalised sterling-silver-plated medal engraved with the recipient''s confirmation name. All packed in a royal-blue gift box with ribbon.',
  'SC-003',
  'https://picsum.photos/seed/confirmation-gift-set/600/600',
  '["https://picsum.photos/seed/confirmation-gift-set/600/600"]',
  42000.00, 50000.00, 'TSH',
  'set', 4.75, 18, 30, 30,
  '["Sale","New"]', true, true
),

( 'ac000001-0000-0000-0000-000000000014',
  'ca000001-0000-0000-0000-000000000003',
  'ba000001-0000-0000-0000-000000000004',
  'Catholic Marriage Blessing Frame Set',
  'catholic-marriage-blessing-frame-set',
  'Handcrafted wooden frame featuring the marriage blessing prayer and a dove motif.',
  'A 20×25 cm carved wooden frame with the traditional Catholic marriage blessing printed on archival paper. The frame features hand-painted doves, wedding rings, and a small cross. Can be personalised with the couple''s names and wedding date at no extra cost.',
  'SC-004',
  'https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=600&q=80',
  '["https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=600&q=80"]',
  32000.00, NULL, 'TSH',
  'piece', 4.60, 11, 25, 25,
  '[]', false, true
),

( 'ac000001-0000-0000-0000-000000000015',
  'ca000001-0000-0000-0000-000000000003',
  'ba000001-0000-0000-0000-000000000005',
  'Ordination Chalice & Paten Set — Silver-Plated',
  'ordination-chalice-paten-set-silver',
  'Liturgical-grade silver-plated chalice and paten set, suitable for parish and personal use.',
  'A silver-plated brass chalice (21 cm high, 8 cm cup diameter) paired with a matching 15 cm paten. The chalice bowl features a hand-etched IHS monogram and chased grape-vine motif on the node. Supplied in a padded presentation case. Meets liturgical standards.',
  'SC-005',
  'https://picsum.photos/seed/ordination-chalice-paten/600/600',
  '["https://picsum.photos/seed/ordination-chalice-paten/600/600","https://picsum.photos/seed/chalice-detail/600/600"]',
  185000.00, 210000.00, 'TSH',
  'set', 4.95, 8, 15, 15,
  '["Sale"]', false, true
),

-- ── 3d. HOME & GIFTS ─────────────────────────────────────────

( 'ac000001-0000-0000-0000-000000000016',
  'ca000001-0000-0000-0000-000000000004',
  'ba000001-0000-0000-0000-000000000004',
  'Handcrafted Wooden Wall Cross — Dark Stain',
  'handcrafted-wooden-wall-cross-dark',
  'Solid mahogany wall cross with a hand-carved corpus, 45 cm tall.',
  'Carved from a single piece of mature mahogany and finished with a warm dark-walnut stain. The corpus is hand-detailed and finished in a gilt wash. Comes with two wall-mount hooks and a certificate of origin from Kenzan Crafts artisans.',
  'HG-001',
  'https://images.unsplash.com/photo-1519817650390-64a993b6a97e?w=600&q=80',
  '["https://images.unsplash.com/photo-1519817650390-64a993b6a97e?w=600&q=80","https://picsum.photos/seed/wall-cross-detail/600/600"]',
  25000.00, 32000.00, 'TSH',
  'piece', 4.90, 53, 40, 40,
  '["Best Seller","Sale"]', true, true
),

( 'ac000001-0000-0000-0000-000000000017',
  'ca000001-0000-0000-0000-000000000004',
  'ba000001-0000-0000-0000-000000000001',
  'Home Altar Set — 5 Piece Cedar Wood',
  'home-altar-set-5-piece-cedar',
  'Complete five-piece home altar: shelf, cross, candle holders (×2), and icon stand.',
  'Create a sacred space at home with this cedar-wood altar set. Includes a 40 cm floating shelf with corbels, a central standing cross, two matching taper-candle holders, and an angled icon stand. All pieces lock together seamlessly. Unfinished cedar can be waxed or painted.',
  'HG-002',
  'https://picsum.photos/seed/home-altar-cedar-set/600/600',
  '["https://picsum.photos/seed/home-altar-cedar-set/600/600","https://picsum.photos/seed/home-altar-assembled/600/600"]',
  65000.00, NULL, 'TSH',
  'set', 4.70, 21, 20, 20,
  '["New"]', false, true
),

( 'ac000001-0000-0000-0000-000000000018',
  'ca000001-0000-0000-0000-000000000004',
  'ba000001-0000-0000-0000-000000000001',
  'Oscalius Blessed Gift Box — Assorted',
  'oscalius-blessed-gift-box-assorted',
  'Pre-assembled gift box with a curated selection of blessed items for any Catholic occasion.',
  'A ready-to-give gift box containing: one pocket rosary, one saint prayer card, one votive candle, one scapular (brown), and one small bottle of holy water (empty, for self-filling). All items are blessed at source. Kraft outer box with a red ribbon.',
  'HG-003',
  'https://images.unsplash.com/photo-1549465208-4bc1db0d58c0?w=600&q=80',
  '["https://images.unsplash.com/photo-1549465208-4bc1db0d58c0?w=600&q=80"]',
  38000.00, NULL, 'TSH',
  'box', 4.80, 37, 60, 60,
  '["Popular"]', true, true
),

( 'ac000001-0000-0000-0000-000000000019',
  'ca000001-0000-0000-0000-000000000004',
  'ba000001-0000-0000-0000-000000000004',
  'Decorative Prayer Pillar Candle Set — 3 Pack',
  'decorative-prayer-pillar-candle-set-3pack',
  'Three hand-poured beeswax pillar candles with embossed cross, Sacred Heart, and Marian motifs.',
  'A set of three pure-beeswax pillar candles, each 10 cm tall and 6 cm in diameter. One features an embossed cross in gold, one a Sacred Heart in red, and one the Miraculous Medal in blue. Burn time approx. 30 hours each. Presented in a window gift box.',
  'HG-004',
  'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&q=80',
  '["https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&q=80","https://picsum.photos/seed/candle-set-detail/600/600"]',
  18000.00, 22000.00, 'TSH',
  'set', 4.75, 44, 90, 90,
  '["Sale","Popular"]', false, true
),

( 'ac000001-0000-0000-0000-000000000020',
  'ca000001-0000-0000-0000-000000000004',
  'ba000001-0000-0000-0000-000000000004',
  'Saint Joseph Holy Family Picture Frame 6×8"',
  'saint-joseph-holy-family-picture-frame-6x8',
  'Antique-gold resin frame with a full-colour print of the Holy Family by Murillo.',
  'A 6×8 inch moulded resin frame in an antique-gold finish, pre-fitted with a high-quality reproduction of Bartolomé Murillo''s Holy Family painting. Suitable for desk or wall display. Backing board has an easel and two wall hooks.',
  'HG-005',
  'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80',
  '["https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80"]',
  15000.00, NULL, 'TSH',
  'piece', 4.55, 16, 70, 70,
  '[]', false, true
),

-- ── 3e. CHURCH ESSENTIALS ────────────────────────────────────

( 'ac000001-0000-0000-0000-000000000021',
  'ca000001-0000-0000-0000-000000000005',
  'ba000001-0000-0000-0000-000000000005',
  'Priest Liturgical Alb — White Polyester-Cotton',
  'priest-liturgical-alb-white',
  'Liturgical alb in ivory white with lace hemline, suitable for all ordinary-form celebrations.',
  'Full-length (150 cm) alb tailored from a 60% polyester / 40% cotton blend for easy care and drape. Features a 20 cm Cluny-lace hemline, hook-and-eye neck closure, and deep side pockets. Available in sizes S–XXL. Machine washable at 30 °C.',
  'CE-001',
  'https://picsum.photos/seed/priest-alb-vestment/600/600',
  '["https://picsum.photos/seed/priest-alb-vestment/600/600","https://picsum.photos/seed/alb-lace-detail/600/600"]',
  185000.00, 220000.00, 'TSH',
  'piece', 4.80, 12, 20, 20,
  '["Sale"]', false, true
),

( 'ac000001-0000-0000-0000-000000000022',
  'ca000001-0000-0000-0000-000000000005',
  'ba000001-0000-0000-0000-000000000005',
  'Gold-Plated Liturgical Chalice — IHS Motif',
  'gold-plated-liturgical-chalice-ihs',
  'Brass chalice with 24 K gold interior plating and hand-chased IHS motif on the cup.',
  'A 22 cm brass chalice with a 24 K gold-plated interior cup ensuring full liturgical compliance. The exterior showcases a hand-chased IHS monogram surrounded by wheat and vine. Hexagonal base, total capacity 250 ml. Supplied in a red velvet-lined case.',
  'CE-002',
  'https://picsum.photos/seed/gold-liturgical-chalice/600/600',
  '["https://picsum.photos/seed/gold-liturgical-chalice/600/600","https://picsum.photos/seed/chalice-base-detail/600/600"]',
  145000.00, 175000.00, 'TSH',
  'piece', 4.95, 9, 12, 12,
  '["Sale"]', true, true
),

( 'ac000001-0000-0000-0000-000000000023',
  'ca000001-0000-0000-0000-000000000005',
  'ba000001-0000-0000-0000-000000000005',
  'Church-Grade Frankincense Incense — 250 g',
  'church-grade-frankincense-incense-250g',
  'Pure Boswellia sacra resin incense granules sourced from Oman — the traditional liturgical incense.',
  'Authentic Omani frankincense (Boswellia sacra) in coarse granule form, as used in Catholic and Orthodox liturgy for centuries. Burns with a clean, low-smoke flame and a rich, warm resinous fragrance. Package: 250 g resealable kraft pouch.',
  'CE-003',
  'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  '["https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80"]',
  12000.00, NULL, 'TSH',
  '250g', 4.85, 29, 150, 150,
  '["Popular"]', false, true
),

( 'ac000001-0000-0000-0000-000000000024',
  'ca000001-0000-0000-0000-000000000005',
  'ba000001-0000-0000-0000-000000000003',
  'Roman Missal — Third Edition (English)',
  'roman-missal-third-edition-english',
  'The complete Roman Missal for Mass, approved by the CBCT for use in Tanzania.',
  'The full Third Edition of the Roman Missal in English, approved for liturgical use by the Catholic Bishops Conference of Tanzania (CBCT). Hard bound, red ribbon markers, gilt page edges, and rubrics printed in red. 1500 pages.',
  'CE-004',
  'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80',
  '["https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80"]',
  75000.00, 90000.00, 'TSH',
  'piece', 4.90, 21, 30, 30,
  '["Sale"]', false, true
),

( 'ac000001-0000-0000-0000-000000000025',
  'ca000001-0000-0000-0000-000000000005',
  'ba000001-0000-0000-0000-000000000005',
  'Choir Robe — White with Gold Trim',
  'choir-robe-white-gold-trim',
  'Full-length choir robe in bright white with gold-ribbon trim at cuffs, collar, and hem.',
  'Tailored from wrinkle-resistant polyester satin with full-length sleeves and a side-zip closure. The gold trim is machine-embroidered ribbon, not glued. One size fits most (adjustable drawstring waist). Available in youth and adult sizing. Machine washable.',
  'CE-005',
  'https://picsum.photos/seed/choir-robe-white-gold/600/600',
  '["https://picsum.photos/seed/choir-robe-white-gold/600/600"]',
  95000.00, 110000.00, 'TSH',
  'piece', 4.70, 15, 35, 35,
  '["Sale"]', false, true
)

ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 4. Product Inventory
-- ─────────────────────────────────────────────────────────────
INSERT INTO product_inventory
  (product_id, qty_available, qty_reserved, reorder_level, is_backorder_allowed)
VALUES
  ('ac000001-0000-0000-0000-000000000001', 80,  2, 10, false),
  ('ac000001-0000-0000-0000-000000000002', 60,  0, 10, false),
  ('ac000001-0000-0000-0000-000000000003', 45,  1,  8, false),
  ('ac000001-0000-0000-0000-000000000004', 100, 3, 15, false),
  ('ac000001-0000-0000-0000-000000000005', 55,  0, 10, false),
  ('ac000001-0000-0000-0000-000000000006', 120, 5, 20, false),
  ('ac000001-0000-0000-0000-000000000007', 200, 0, 30, false),
  ('ac000001-0000-0000-0000-000000000008', 500, 0, 50, false),
  ('ac000001-0000-0000-0000-000000000009', 75,  2, 10, false),
  ('ac000001-0000-0000-0000-000000000010', 40,  1,  8, false),
  ('ac000001-0000-0000-0000-000000000011', 50,  2, 10, false),
  ('ac000001-0000-0000-0000-000000000012', 35,  1,  5, false),
  ('ac000001-0000-0000-0000-000000000013', 30,  0,  5, false),
  ('ac000001-0000-0000-0000-000000000014', 25,  0,  5, false),
  ('ac000001-0000-0000-0000-000000000015', 15,  1,  3, true),
  ('ac000001-0000-0000-0000-000000000016', 40,  2,  8, false),
  ('ac000001-0000-0000-0000-000000000017', 20,  0,  5, false),
  ('ac000001-0000-0000-0000-000000000018', 60,  3, 10, false),
  ('ac000001-0000-0000-0000-000000000019', 90,  4, 15, false),
  ('ac000001-0000-0000-0000-000000000020', 70,  0, 10, false),
  ('ac000001-0000-0000-0000-000000000021', 20,  1,  3, true),
  ('ac000001-0000-0000-0000-000000000022', 12,  0,  2, true),
  ('ac000001-0000-0000-0000-000000000023', 150, 0, 20, false),
  ('ac000001-0000-0000-0000-000000000024', 30,  1,  5, true),
  ('ac000001-0000-0000-0000-000000000025', 35,  0,  5, true)
ON CONFLICT (product_id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 5. Product Media  (primary image + optional second image)
-- ─────────────────────────────────────────────────────────────
INSERT INTO product_media
  (id, product_id, media_url, media_type, alt_text, is_primary, sort_order)
VALUES
-- Books
  ('da000001-0000-0000-0000-000000000001','ac000001-0000-0000-0000-000000000001','https://images.unsplash.com/photo-1585559700398-1385b3a8aeb6?w=600&q=80','image','Holy Bible Catholic Edition cover',true,0),
  ('da000001-0000-0000-0000-000000000002','ac000001-0000-0000-0000-000000000001','https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80','image','Holy Bible pages spread',false,1),
  ('da000001-0000-0000-0000-000000000003','ac000001-0000-0000-0000-000000000002','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80','image','Daily Mass Companion prayer book',true,0),
  ('da000001-0000-0000-0000-000000000004','ac000001-0000-0000-0000-000000000003','https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?w=600&q=80','image','Life of Saint Francis cover',true,0),
  ('da000001-0000-0000-0000-000000000005','ac000001-0000-0000-0000-000000000004','https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&q=80','image','Children Catholic Catechism colourful cover',true,0),
  ('da000001-0000-0000-0000-000000000006','ac000001-0000-0000-0000-000000000005','https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600&q=80','image','RCIA Catholic Study Guide',true,0),
-- Devotionals
  ('da000001-0000-0000-0000-000000000007','ac000001-0000-0000-0000-000000000006','https://images.unsplash.com/photo-1544967919-44c1ef2f9e4c?w=600&q=80','image','Crystal white rosary beads',true,0),
  ('da000001-0000-0000-0000-000000000008','ac000001-0000-0000-0000-000000000007','https://images.unsplash.com/photo-1519817914152-22d216bb9170?w=600&q=80','image','Novena to Our Lady of Fatima booklet',true,0),
  ('da000001-0000-0000-0000-000000000009','ac000001-0000-0000-0000-000000000008','https://picsum.photos/seed/prayer-card-saint/600/600','image','Saint Jude Thaddeus prayer cards pack',true,0),
  ('da000001-0000-0000-0000-000000000010','ac000001-0000-0000-0000-000000000009','https://picsum.photos/seed/wooden-chaplet-beads/600/600','image','Seven Sorrows wooden chaplet beads',true,0),
  ('da000001-0000-0000-0000-000000000011','ac000001-0000-0000-0000-000000000010','https://images.unsplash.com/photo-1508672019048-805c876b67e2?w=600&q=80','image','Morning and evening meditation set journal',true,0),
-- Sacraments
  ('da000001-0000-0000-0000-000000000012','ac000001-0000-0000-0000-000000000011','https://images.unsplash.com/photo-1509909756405-be0199881695?w=600&q=80','image','Baptism gift set candle and rosary',true,0),
  ('da000001-0000-0000-0000-000000000013','ac000001-0000-0000-0000-000000000011','https://picsum.photos/seed/baptism-set-detail/600/600','image','Baptism gift set box detail',false,1),
  ('da000001-0000-0000-0000-000000000014','ac000001-0000-0000-0000-000000000012','https://picsum.photos/seed/communion-keepsake-box/600/600','image','First Communion white wooden keepsake box closed',true,0),
  ('da000001-0000-0000-0000-000000000015','ac000001-0000-0000-0000-000000000012','https://picsum.photos/seed/communion-box-open/600/600','image','First Communion keepsake box open interior',false,1),
  ('da000001-0000-0000-0000-000000000016','ac000001-0000-0000-0000-000000000013','https://picsum.photos/seed/confirmation-gift-set/600/600','image','Confirmation gift set Bible rosary medal',true,0),
  ('da000001-0000-0000-0000-000000000017','ac000001-0000-0000-0000-000000000014','https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?w=600&q=80','image','Catholic marriage blessing wooden frame',true,0),
  ('da000001-0000-0000-0000-000000000018','ac000001-0000-0000-0000-000000000015','https://picsum.photos/seed/ordination-chalice-paten/600/600','image','Silver-plated ordination chalice and paten set',true,0),
  ('da000001-0000-0000-0000-000000000019','ac000001-0000-0000-0000-000000000015','https://picsum.photos/seed/chalice-detail/600/600','image','Ordination chalice IHS motif close-up',false,1),
-- Home & Gifts
  ('da000001-0000-0000-0000-000000000020','ac000001-0000-0000-0000-000000000016','https://images.unsplash.com/photo-1519817650390-64a993b6a97e?w=600&q=80','image','Handcrafted mahogany wooden wall cross',true,0),
  ('da000001-0000-0000-0000-000000000021','ac000001-0000-0000-0000-000000000016','https://picsum.photos/seed/wall-cross-detail/600/600','image','Wooden wall cross corpus detail',false,1),
  ('da000001-0000-0000-0000-000000000022','ac000001-0000-0000-0000-000000000017','https://picsum.photos/seed/home-altar-cedar-set/600/600','image','Cedar wood home altar five-piece set',true,0),
  ('da000001-0000-0000-0000-000000000023','ac000001-0000-0000-0000-000000000017','https://picsum.photos/seed/home-altar-assembled/600/600','image','Home altar set assembled with candles',false,1),
  ('da000001-0000-0000-0000-000000000024','ac000001-0000-0000-0000-000000000018','https://images.unsplash.com/photo-1549465208-4bc1db0d58c0?w=600&q=80','image','Oscalius blessed Catholic gift box',true,0),
  ('da000001-0000-0000-0000-000000000025','ac000001-0000-0000-0000-000000000019','https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=600&q=80','image','Decorative beeswax pillar prayer candle set',true,0),
  ('da000001-0000-0000-0000-000000000026','ac000001-0000-0000-0000-000000000019','https://picsum.photos/seed/candle-set-detail/600/600','image','Prayer candle motif embossed detail',false,1),
  ('da000001-0000-0000-0000-000000000027','ac000001-0000-0000-0000-000000000020','https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&q=80','image','Saint Joseph Holy Family antique gold frame',true,0),
-- Church Essentials
  ('da000001-0000-0000-0000-000000000028','ac000001-0000-0000-0000-000000000021','https://picsum.photos/seed/priest-alb-vestment/600/600','image','White liturgical alb with lace hemline',true,0),
  ('da000001-0000-0000-0000-000000000029','ac000001-0000-0000-0000-000000000021','https://picsum.photos/seed/alb-lace-detail/600/600','image','Cluny lace hem detail of liturgical alb',false,1),
  ('da000001-0000-0000-0000-000000000030','ac000001-0000-0000-0000-000000000022','https://picsum.photos/seed/gold-liturgical-chalice/600/600','image','Gold-plated liturgical chalice IHS motif',true,0),
  ('da000001-0000-0000-0000-000000000031','ac000001-0000-0000-0000-000000000022','https://picsum.photos/seed/chalice-base-detail/600/600','image','Liturgical chalice hexagonal base close-up',false,1),
  ('da000001-0000-0000-0000-000000000032','ac000001-0000-0000-0000-000000000023','https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80','image','Church frankincense incense granules',true,0),
  ('da000001-0000-0000-0000-000000000033','ac000001-0000-0000-0000-000000000024','https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&q=80','image','Roman Missal Third Edition hardbound',true,0),
  ('da000001-0000-0000-0000-000000000034','ac000001-0000-0000-0000-000000000025','https://picsum.photos/seed/choir-robe-white-gold/600/600','image','White choir robe with gold ribbon trim',true,0)
ON CONFLICT (id) DO NOTHING;

-- ─────────────────────────────────────────────────────────────
-- 6. Product Pricing  (TSH active prices)
-- ─────────────────────────────────────────────────────────────
INSERT INTO product_pricing
  (id, product_id, currency, amount, compare_at_amount, is_active)
VALUES
  ('f0000001-0000-0000-0000-000000000001','ac000001-0000-0000-0000-000000000001','TSH', 22000.00, 27000.00, true),
  ('f0000001-0000-0000-0000-000000000002','ac000001-0000-0000-0000-000000000002','TSH', 16500.00, NULL,      true),
  ('f0000001-0000-0000-0000-000000000003','ac000001-0000-0000-0000-000000000003','TSH', 18000.00, 21000.00, true),
  ('f0000001-0000-0000-0000-000000000004','ac000001-0000-0000-0000-000000000004','TSH', 12000.00, NULL,      true),
  ('f0000001-0000-0000-0000-000000000005','ac000001-0000-0000-0000-000000000005','TSH', 15000.00, NULL,      true),
  ('f0000001-0000-0000-0000-000000000006','ac000001-0000-0000-0000-000000000006','TSH',  9500.00, 13000.00, true),
  ('f0000001-0000-0000-0000-000000000007','ac000001-0000-0000-0000-000000000007','TSH',  5500.00, NULL,      true),
  ('f0000001-0000-0000-0000-000000000008','ac000001-0000-0000-0000-000000000008','TSH',  4000.00, NULL,      true),
  ('f0000001-0000-0000-0000-000000000009','ac000001-0000-0000-0000-000000000009','TSH',  8000.00, 10000.00, true),
  ('f0000001-0000-0000-0000-000000000010','ac000001-0000-0000-0000-000000000010','TSH', 22000.00, NULL,      true),
  ('f0000001-0000-0000-0000-000000000011','ac000001-0000-0000-0000-000000000011','TSH', 35000.00, 40000.00, true),
  ('f0000001-0000-0000-0000-000000000012','ac000001-0000-0000-0000-000000000012','TSH', 28000.00, NULL,      true),
  ('f0000001-0000-0000-0000-000000000013','ac000001-0000-0000-0000-000000000013','TSH', 42000.00, 50000.00, true),
  ('f0000001-0000-0000-0000-000000000014','ac000001-0000-0000-0000-000000000014','TSH', 32000.00, NULL,      true),
  ('f0000001-0000-0000-0000-000000000015','ac000001-0000-0000-0000-000000000015','TSH',185000.00,210000.00, true),
  ('f0000001-0000-0000-0000-000000000016','ac000001-0000-0000-0000-000000000016','TSH', 25000.00, 32000.00, true),
  ('f0000001-0000-0000-0000-000000000017','ac000001-0000-0000-0000-000000000017','TSH', 65000.00, NULL,      true),
  ('f0000001-0000-0000-0000-000000000018','ac000001-0000-0000-0000-000000000018','TSH', 38000.00, NULL,      true),
  ('f0000001-0000-0000-0000-000000000019','ac000001-0000-0000-0000-000000000019','TSH', 18000.00, 22000.00, true),
  ('f0000001-0000-0000-0000-000000000020','ac000001-0000-0000-0000-000000000020','TSH', 15000.00, NULL,      true),
  ('f0000001-0000-0000-0000-000000000021','ac000001-0000-0000-0000-000000000021','TSH',185000.00,220000.00, true),
  ('f0000001-0000-0000-0000-000000000022','ac000001-0000-0000-0000-000000000022','TSH',145000.00,175000.00, true),
  ('f0000001-0000-0000-0000-000000000023','ac000001-0000-0000-0000-000000000023','TSH', 12000.00, NULL,      true),
  ('f0000001-0000-0000-0000-000000000024','ac000001-0000-0000-0000-000000000024','TSH', 75000.00, 90000.00, true),
  ('f0000001-0000-0000-0000-000000000025','ac000001-0000-0000-0000-000000000025','TSH', 95000.00,110000.00, true)
ON CONFLICT (product_id, currency, starts_at, ends_at) DO NOTHING;

COMMIT;

-- ─────────────────────────────────────────────────────────────
-- SUMMARY (25 products seeded)
-- ─────────────────────────────────────────────────────────────
-- Books (5):            BK-001 … BK-005   — TSH 12,000 – 22,000
-- Devotionals (5):      DV-001 … DV-005   — TSH  4,000 – 22,000
-- Sacraments (5):       SC-001 … SC-005   — TSH 28,000 – 185,000
-- Home & Gifts (5):     HG-001 … HG-005   — TSH 15,000 – 65,000
-- Church Essentials (5):CE-001 … CE-005   — TSH 12,000 – 185,000
--
-- Images: Unsplash (free-to-use) + picsum.photos (CC0 fallback)
-- All inserts are idempotent (ON CONFLICT … DO NOTHING)
-- Run again safely without creating duplicates.
-- ─────────────────────────────────────────────────────────────
