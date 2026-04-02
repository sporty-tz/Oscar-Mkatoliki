-- ============================================================
-- OSCAR MKATOLIKI — Full Seed Data Migration
-- Run AFTER 001_initial_schema.sql
-- Migrates all hardcoded frontend data into Supabase tables
-- ============================================================

BEGIN;

-- ============================================================
-- 1. CURRENCIES & LANGUAGES & SITE SETTINGS
-- ============================================================

INSERT INTO currencies (code, name, symbol, is_default, is_active) VALUES
  ('TZS', 'Tanzanian Shilling', 'TZS', true,  true),
  ('USD', 'US Dollar',          '$',   false, true)
ON CONFLICT (code) DO NOTHING;

INSERT INTO languages (code, name, is_default, is_active) VALUES
  ('en', 'English',   true,  true),
  ('sw', 'Swahili',   false, true)
ON CONFLICT (code) DO NOTHING;

INSERT INTO site_settings (key, value, description) VALUES
  ('site_name',              'Oscar Mkatoliki',                         'Public site name'),
  ('site_tagline',           'Tanzania''s Catholic Faith & Music Store', 'Short tagline'),
  ('contact_email',          'hello@oscarmkatoliki.co.tz',               'Support email'),
  ('contact_phone',          '+255 712 345 678',                         'Support phone / WhatsApp'),
  ('contact_address',        'Msasani Peninsula, Dar es Salaam, Tanzania','Office address'),
  ('business_hours',         'Monday – Saturday: 8:00 AM – 6:00 PM',    'Business hours label'),
  ('free_shipping_threshold','50000',                                    'Min order for free shipping (TZS)'),
  ('gift_wrap_fee',          '2500',                                     'Gift wrap fee (TZS)'),
  ('service_fee_pct',        '0.05',                                     'Service fee percentage'),
  ('ticker_text',            '✝  NEW ALBUM OUT NOW  ·  FREE SHIPPING ON ORDERS ABOVE TZS 50,000  ·  EASTER COLLECTION IS LIVE  ·  30% OFF ALL BIBLES  ·  SACRED GIFT SETS NOW IN STOCK  ·  ROSARIES FROM TZS 8,000  ·  NEW DEVOTIONAL BOOKS JUST ARRIVED  ·  ', 'Scrolling ticker text')
ON CONFLICT (key) DO NOTHING;


-- ============================================================
-- 2. CATEGORIES  (Home.tsx CATEGORIES array)
-- ============================================================

INSERT INTO categories (id, name, slug, image_url, is_active, sort_order) VALUES
  ('c0000001-0000-0000-0000-000000000001', 'Music & Audio',    'music-audio',    '/Categories/Music-1.png',        true, 1),
  ('c0000001-0000-0000-0000-000000000002', 'Books & Bibles',   'books-bibles',   '/Categories/Books-1.png',        true, 2),
  ('c0000001-0000-0000-0000-000000000003', 'Rosaries',         'rosaries',       '/Categories/Rosary-1.png',       true, 3),
  ('c0000001-0000-0000-0000-000000000004', 'Statues',          'statues',        '/Categories/Statue-1.png',       true, 4),
  ('c0000001-0000-0000-0000-000000000005', 'Candles',          'candles',        '/Categories/Candle-1.png',       true, 5),
  ('c0000001-0000-0000-0000-000000000006', 'Apparel',          'apparel',        '/Categories/Apparel-1.png',      true, 6),
  ('c0000001-0000-0000-0000-000000000007', 'Gifts',            'gifts',          '/Categories/Gifts-1.png',        true, 7),
  ('c0000001-0000-0000-0000-000000000008', 'Children''s',      'childrens',      '/Categories/Children-1.png',     true, 8),
  ('c0000001-0000-0000-0000-000000000009', 'Jewelry',          'jewelry',        '/Categories/Jewerly-1.png',      true, 9),
  ('c0000001-0000-0000-0000-000000000010', 'Sacramentals',     'sacramentals',   '/Categories/Sacramentals-1.png', true, 10)
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- 3. PRODUCTS  (src/lib/products.ts FEATURED_PRODUCTS)
-- ============================================================

INSERT INTO products (id, name, slug, description, category_id, currency, base_price, sale_price, is_featured, is_active, tags) VALUES
  (
    'e0000001-0000-0000-0000-000000000001',
    'Rosary of the Sacred Heart',
    'rosary-of-the-sacred-heart',
    'A beautifully crafted silver-plated rosary dedicated to the devotion of the Sacred Heart of Jesus. Each of the 59 beads is carefully shaped and strung on a durable chain, with a detailed crucifix pendant. Perfect for daily prayer, as a first communion gift, or a cherished keepsake for any devout Catholic.',
    'c0000001-0000-0000-0000-000000000003',
    'TZS', 15000, NULL, true, true,
    ARRAY['rosary','silver','sacred heart','bestseller','gift']
  ),
  (
    'e0000001-0000-0000-0000-000000000002',
    'Oscar Mkatoliki — Praise Vol. 1',
    'oscar-mkatoliki-praise-vol-1',
    'The debut worship album from Tanzania''s most beloved Catholic music minister, Oscar Mkatoliki. Featuring 12 original Swahili and English praise tracks, this album blends contemporary Gospel with deep Catholic spirituality. Includes a physical CD plus a digital download code. A must-have for every Catholic household.',
    'c0000001-0000-0000-0000-000000000001',
    'TZS', 18000, NULL, true, true,
    ARRAY['music','album','swahili','praise','worship','new']
  ),
  (
    'e0000001-0000-0000-0000-000000000003',
    'Catholic Study Bible',
    'catholic-study-bible',
    'The definitive Catholic Study Bible for serious believers and seekers alike. This edition features the complete Deuterocanonical books, detailed commentary from leading Catholic theologians, concordance, maps of the Holy Land, and a the Catechism index. Leather-bound cover with gilt-edged pages. Ideal for personal study, RCIA, and small group ministry.',
    'c0000001-0000-0000-0000-000000000002',
    'TZS', 60000, 45000, true, true,
    ARRAY['bible','study','leather','commentary','rcia']
  ),
  (
    'e0000001-0000-0000-0000-000000000004',
    'Holy Family Statue',
    'holy-family-statue',
    'A stunning hand-finished resin statue of the Holy Family — Jesus, Mary, and Joseph — standing 18 cm tall. Painted in soft, natural tones with gold-leaf accents, this piece radiates warmth and serenity. A timeless addition to your home altar, living room, or as a thoughtful wedding or baptism gift.',
    'c0000001-0000-0000-0000-000000000004',
    'TZS', 35000, NULL, true, true,
    ARRAY['statue','holy family','jesus mary joseph','home altar','gift']
  ),
  (
    'e0000001-0000-0000-0000-000000000005',
    'Church Pillar Candle Set ×6',
    'church-pillar-candle-set-6',
    'Premium ivory pillar candles hand-dipped in pure paraffin wax with a long 8-hour burn time each. The set of six measures 22 cm tall and 5 cm in diameter, making them ideal for altar displays, candlelight vigils, church sanctuaries, and home chapels. Lead-free cotton wick. Sold as a set of six.',
    'c0000001-0000-0000-0000-000000000005',
    'TZS', 12000, 18000, true, true,
    ARRAY['candles','pillar','altar','vigil','set','sale']
  ),
  (
    'e0000001-0000-0000-0000-000000000006',
    'Children''s Bible Stories',
    'childrens-bible-stories',
    'Bring the wonders of Scripture to life for your little ones. This beautifully illustrated collection retells 50 classic Bible stories from both the Old and New Testaments in simple, engaging language for children ages 4–10. Full-colour artwork on every spread, thick board-style pages, and a durable hardcover. A perfect bedtime read and a lasting faith foundation.',
    'c0000001-0000-0000-0000-000000000008',
    'TZS', 20000, NULL, true, true,
    ARRAY['children','bible stories','illustrated','ages 4-10','new']
  ),
  (
    'e0000001-0000-0000-0000-000000000007',
    'Blessed Cross Necklace',
    'blessed-cross-necklace',
    'A sleek, modern cross pendant on a sturdy 60 cm stainless-steel chain. Hypoallergenic and tarnish-resistant, this necklace is suitable for everyday wear. The pendant is 3 cm tall and features a polished front with a brushed reverse. Comes in a gift box, making it an ideal confirmation, baptism, or birthday present.',
    'c0000001-0000-0000-0000-000000000009',
    'TZS', 28000, NULL, true, true,
    ARRAY['necklace','cross','jewelry','stainless steel','gift','confirmation']
  ),
  (
    'e0000001-0000-0000-0000-000000000008',
    'Devotional Prayer Journal',
    'devotional-prayer-journal',
    'Deepen your prayer life with this exquisitely designed A5 devotional journal. Each of its 200 cream-coloured pages features a short Scripture verse at the top, followed by ample space for reflection, gratitude lists, and prayer intentions. The soft-touch cover is embossed with a gold cross motif. A meaningful companion for your daily quiet time.',
    'c0000001-0000-0000-0000-000000000002',
    'TZS', 14000, 20000, true, true,
    ARRAY['journal','prayer','devotional','a5','scripture','reflection']
  )
ON CONFLICT (id) DO NOTHING;


-- Product media (primary images)
INSERT INTO product_media (product_id, url, alt_text, is_primary, sort_order) VALUES
  ('e0000001-0000-0000-0000-000000000001', '/Products/Prod-1.png', 'Rosary of the Sacred Heart',  true, 1),
  ('e0000001-0000-0000-0000-000000000002', '/Products/Prod-2.png', 'Oscar Mkatoliki Praise Vol 1', true, 1),
  ('e0000001-0000-0000-0000-000000000003', '/Products/Prod-3.png', 'Catholic Study Bible',        true, 1),
  ('e0000001-0000-0000-0000-000000000004', '/Products/Prod-4.png', 'Holy Family Statue',          true, 1),
  ('e0000001-0000-0000-0000-000000000005', '/Products/Prod-5.png', 'Church Pillar Candle Set',    true, 1),
  ('e0000001-0000-0000-0000-000000000006', '/Products/Prod-6.png', 'Children''s Bible Stories',   true, 1),
  ('e0000001-0000-0000-0000-000000000007', '/Products/Prod-7.png', 'Blessed Cross Necklace',      true, 1),
  ('e0000001-0000-0000-0000-000000000008', '/Products/prod-8.png', 'Devotional Prayer Journal',   true, 1)
ON CONFLICT DO NOTHING;

-- Product inventory (initial stock)
INSERT INTO product_inventory (product_id, quantity, reserved, low_stock_alert, is_unlimited) VALUES
  ('e0000001-0000-0000-0000-000000000001', 50, 0, 5, false),
  ('e0000001-0000-0000-0000-000000000002', 100, 0, 10, false),
  ('e0000001-0000-0000-0000-000000000003', 30, 0, 5, false),
  ('e0000001-0000-0000-0000-000000000004', 25, 0, 3, false),
  ('e0000001-0000-0000-0000-000000000005', 60, 0, 10, false),
  ('e0000001-0000-0000-0000-000000000006', 40, 0, 5, false),
  ('e0000001-0000-0000-0000-000000000007', 35, 0, 5, false),
  ('e0000001-0000-0000-0000-000000000008', 45, 0, 5, false)
ON CONFLICT (product_id) DO NOTHING;


-- ============================================================
-- 4. HOMEPAGE SECTIONS  (Home.tsx SLIDES, PROMO_BANNERS)
-- ============================================================

INSERT INTO homepage_sections (section_key, data, is_active) VALUES
(
  'hero_slides',
  '[
    {
      "id": 1,
      "image": "/Slider/Pope-leo-xiv.png",
      "subheading": "Words of the Holy Father",
      "heading": "Walk in Hope",
      "quote": "\u201cWe are pilgrims on a journey of faith. Let us walk together in hope, in charity, and in the joy of the Gospel, building a world of fraternity and peace.\u201d",
      "attribution": "\u2014 Pope Leo XIV",
      "cta": "Explore Faith Resources",
      "bg": "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
      "accent": "#D4AF37"
    },
    {
      "id": 2,
      "image": "/Slider/Hail-Mary.png",
      "subheading": "Ave Maria",
      "heading": "Full of Grace",
      "quote": "\u201cHail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus.\u201d",
      "attribution": "\u2014 Luke 1:28, The Angel Gabriel",
      "cta": "Shop Rosaries & Devotionals",
      "bg": "linear-gradient(135deg, #1e0a3c 0%, #3b1260 60%, #5c1f8a 100%)",
      "accent": "#e8c8ff"
    },
    {
      "id": 3,
      "image": "/Slider/Christ-the-king.png",
      "subheading": "Christ the King",
      "heading": "The Way & the Life",
      "quote": "\u201cI am the way, and the truth, and the life. No one comes to the Father except through me. Let your hearts not be troubled.\u201d",
      "attribution": "\u2014 Jesus Christ, John 14:6",
      "cta": "Shop Sacred Items",
      "bg": "linear-gradient(135deg, #1b3a2d 0%, #2d5a3d 60%, #1a4d33 100%)",
      "accent": "#C9A84C"
    }
  ]'::jsonb,
  true
),
(
  'promo_banners',
  '[
    {
      "id": 1,
      "brand": "Sacred Sounds",
      "headline": "New Albums Just Dropped",
      "subtext": "Praise & Worship · Gospel · Devotional",
      "cta": "Listen & Shop",
      "gradient": "linear-gradient(135deg, #e8edff 0%, #c9d4ff 100%)",
      "accent": "#3b5bdb",
      "badge": "NEW",
      "icon": "\uD83C\uDFB5"
    },
    {
      "id": 2,
      "brand": "Holy Scripture",
      "headline": "Up to 30% Off Bibles",
      "subtext": "Catholic, Protestant & Study Editions",
      "cta": "Shop Bibles",
      "gradient": "linear-gradient(135deg, #fff8e1 0%, #fde089 100%)",
      "accent": "#9a6a00",
      "badge": "30% OFF",
      "icon": "\uD83D\uDCDA"
    },
    {
      "id": 3,
      "brand": "Sacred Gifts",
      "headline": "Easter Collection",
      "subtext": "Rosaries, Statues & Blessed Items",
      "cta": "Shop Easter",
      "gradient": "linear-gradient(135deg, #e8f5ee 0%, #bbedd3 100%)",
      "accent": "#1b6b3a",
      "badge": "SEASONAL",
      "icon": "\u271D\uFE0F"
    }
  ]'::jsonb,
  true
)
ON CONFLICT (section_key) DO NOTHING;


-- ============================================================
-- 5. OFFER BANNERS / COUPONS  (commerce config)
-- ============================================================

INSERT INTO coupons (code, description, discount_type, discount_value, min_order, is_active) VALUES
  ('BIBLE30',    '30% off all Bibles',                 'percent', 30,    0,      true),
  ('EASTER2026', 'Easter collection 15% off',          'percent', 15,    20000,  true),
  ('WELCOME10',  '10% off your first order',           'percent', 10,    0,      true),
  ('FREESHIP',   'Free shipping (waive delivery fee)', 'fixed',   5000,  50000,  true)
ON CONFLICT (code) DO NOTHING;

INSERT INTO shipping_methods (id, name, description, price, currency, eta_days, is_active, sort_order) VALUES
  ('5a000001-0000-0000-0000-000000000001', 'Standard Delivery',  'Dar es Salaam 1–2 days, Other regions 3–5 days', 4000,  'TZS', '1-5 days',   true, 1),
  ('5a000001-0000-0000-0000-000000000002', 'Express Delivery',   'Dar es Salaam same-day or next-day',             8000,  'TZS', 'Same day',   true, 2),
  ('5a000001-0000-0000-0000-000000000003', 'Zanzibar Delivery',  'Zanzibar 2–4 business days',                     6000,  'TZS', '2-4 days',   true, 3),
  ('5a000001-0000-0000-0000-000000000004', 'International',      'International shipping on request',              25000, 'TZS', '7-14 days',  true, 4),
  ('5a000001-0000-0000-0000-000000000005', 'Free Shipping',      'Free on orders over TZS 50,000',                 0,     'TZS', '1-5 days',   true, 5)
ON CONFLICT (id) DO NOTHING;

INSERT INTO fee_config (key, value, description) VALUES
  ('service_fee_pct',       0.0500, 'Service fee — 5% of subtotal'),
  ('min_order_amount',      0.0000, 'Minimum order amount (TZS)'),
  ('gift_wrap_fee',         2500.0, 'Gift wrapping fee (TZS)'),
  ('free_shipping_min',     50000.0,'Minimum order for free standard shipping (TZS)')
ON CONFLICT (key) DO NOTHING;


-- ============================================================
-- 6. FAQs  (Faq.tsx faqData)
-- ============================================================

INSERT INTO faqs (question, answer, category, sort_order, is_active) VALUES
  -- Orders & Payment
  ('How do I place an order?',
   'Browse our catalogue, add items to your cart, proceed to checkout, enter your delivery details and complete payment. You will receive an email confirmation immediately.',
   'Orders & Payment', 1, true),
  ('What payment methods are accepted?',
   'We accept M-Pesa, Tigo Pesa, Airtel Money, and debit/credit cards (Visa & Mastercard). All transactions are secured with 256-bit SSL encryption.',
   'Orders & Payment', 2, true),
  ('Can I modify or cancel my order?',
   'You can cancel or modify an order within 1 hour of placing it by contacting us on WhatsApp or email. Once the order is packed it can no longer be changed.',
   'Orders & Payment', 3, true),
  ('How do I track my order?',
   'Visit the Track Order page and enter your order number and email address. You can also log into your account and view Order History for live status updates.',
   'Orders & Payment', 4, true),
  -- Shipping & Delivery
  ('Which areas do you deliver to?',
   'We deliver to all regions of Tanzania including Dar es Salaam, Mwanza, Arusha, Dodoma, Zanzibar and more. International shipping is available on request.',
   'Shipping & Delivery', 5, true),
  ('How long does delivery take?',
   'Dar es Salaam: 1–2 business days. Other mainland regions: 3–5 business days. Zanzibar: 2–4 business days. International orders: 7–14 business days.',
   'Shipping & Delivery', 6, true),
  ('Is there a minimum order for free shipping?',
   'Yes! Orders of TZS 50,000 or more qualify for free standard shipping within mainland Tanzania. Zanzibar and international orders carry a flat shipping fee.',
   'Shipping & Delivery', 7, true),
  ('Can I choose a specific delivery time?',
   'Currently we do not offer scheduled time-slot delivery. Our couriers deliver during business hours (8 AM – 6 PM). We will notify you before dispatch.',
   'Shipping & Delivery', 8, true),
  -- Returns & Refunds
  ('What is your return policy?',
   'Unused, unopened items in original condition can be returned within 7 days of delivery. Religious artefacts, personalised items and digital downloads are non-returnable.',
   'Returns & Refunds', 9, true),
  ('How do I start a return?',
   'Contact our support team via WhatsApp or email with your order number and photos of the item. We will arrange a collection or advise you how to send it back.',
   'Returns & Refunds', 10, true),
  ('When will I receive my refund?',
   'Refunds are processed within 3–5 business days after we receive and inspect the returned item. Mobile money refunds typically appear within 24 hours of processing.',
   'Returns & Refunds', 11, true),
  ('What if I received a wrong or damaged item?',
   'We sincerely apologise. Please send us a photo and your order number within 48 hours of delivery. We will arrange a free replacement or full refund immediately.',
   'Returns & Refunds', 12, true),
  -- Products & Faith
  ('Are all products officially approved religious items?',
   'Yes. We source our religious items — rosaries, crucifixes, statues, and prayer books — from trusted Catholic suppliers and ensure they meet Church-approved standards.',
   'Products & Faith Resources', 13, true),
  ('Do you sell Oscar Mkatoliki music albums physically?',
   'Yes! We carry signed physical CDs and limited-edition vinyl for select albums. Digital downloads are also available for instant purchase.',
   'Products & Faith Resources', 14, true),
  ('Can I request a product that is out of stock?',
   'Yes. Use the ''Notify Me'' button on the product page, or contact us. We restock popular items regularly and will notify you when available.',
   'Products & Faith Resources', 15, true),
  ('Do you offer gift wrapping?',
   'Yes, gift wrapping is available at checkout for a small fee of TZS 2,500. You can add a personalised message card as well.',
   'Products & Faith Resources', 16, true),
  -- Account & Privacy
  ('How do I create an account?',
   'Click ''Sign In'' in the top navigation, then select ''Create Account''. Enter your name, email and a secure password. You will receive a verification email to confirm.',
   'Account & Privacy', 17, true),
  ('I forgot my password. What should I do?',
   'On the Sign In page, click ''Forgot password?'' and enter your email. You will receive a password-reset link. Check your spam folder if it doesn''t arrive within a few minutes.',
   'Account & Privacy', 18, true),
  ('How is my personal data used?',
   'We use your information only to process orders, send order updates and improve your shopping experience. We never sell your data to third parties. See our Privacy Policy for full details.',
   'Account & Privacy', 19, true),
  ('Can I delete my account?',
   'Yes. Email hello@oscarmkatoliki.co.tz from your registered address and request account deletion. We will process this within 7 business days and confirm via email.',
   'Account & Privacy', 20, true);


-- ============================================================
-- 7. BLOG AUTHORS & CATEGORIES & POSTS  (Blog.tsx posts array)
-- ============================================================

INSERT INTO blog_authors (id, name) VALUES
  ('a0000001-0000-0000-0000-000000000001', 'Sr. Agnes Mtoto'),
  ('a0000001-0000-0000-0000-000000000002', 'Oscar Mkatoliki'),
  ('a0000001-0000-0000-0000-000000000003', 'Community Contributors'),
  ('a0000001-0000-0000-0000-000000000004', 'Fr. Benedikt Mwamba'),
  ('a0000001-0000-0000-0000-000000000005', 'David Kileo'),
  ('a0000001-0000-0000-0000-000000000006', 'Editorial Team')
ON CONFLICT (id) DO NOTHING;

INSERT INTO blog_categories (id, name, slug, color) VALUES
  ('bc000001-0000-0000-0000-000000000001', 'Devotional',   'devotional',   '#e8f3fb'),
  ('bc000001-0000-0000-0000-000000000002', 'Music',        'music',        '#fdf4dc'),
  ('bc000001-0000-0000-0000-000000000003', 'Family Faith', 'family-faith', '#eafbea'),
  ('bc000001-0000-0000-0000-000000000004', 'Liturgy',      'liturgy',      '#fff0f0'),
  ('bc000001-0000-0000-0000-000000000005', 'Saints',       'saints',       '#f0f0ff'),
  ('bc000001-0000-0000-0000-000000000006', 'Products',     'products',     '#fdf4dc')
ON CONFLICT (id) DO NOTHING;

INSERT INTO blog_posts (id, title, slug, excerpt, author_id, category_id, is_published, published_at, read_time_mins) VALUES
  (
    'b0000001-0000-0000-0000-000000000001',
    'How the Rosary Transformed My Daily Commute in Dar es Salaam',
    'rosary-transformed-daily-commute-dar-es-salaam',
    'When traffic on Bagamoyo Road became unbearable, one Catholic bus driver discovered that the mysteries of the rosary turned what was frustration into deep prayer.',
    'a0000001-0000-0000-0000-000000000001',
    'bc000001-0000-0000-0000-000000000001',
    true, '2026-03-25', 5
  ),
  (
    'b0000001-0000-0000-0000-000000000002',
    'Sacred Praise Vol. 2 — A Track-by-Track Journey',
    'sacred-praise-vol-2-track-by-track',
    'Oscar Mkatoliki walks us through the spiritual and creative inspiration behind every song on his latest album — from a midnight vision in Mwanza to a choir in Dodoma.',
    'a0000001-0000-0000-0000-000000000002',
    'bc000001-0000-0000-0000-000000000002',
    true, '2026-03-20', 8
  ),
  (
    'b0000001-0000-0000-0000-000000000003',
    'Raising Catholic Children in a Digital Age: A Tanzanian Parent''s Guide',
    'raising-catholic-children-digital-age-tanzania',
    'Three Catholic parents from Kinondoni, Arusha and Mwanza share practical, tested strategies for nurturing genuine faith in an age of smartphones and social media.',
    'a0000001-0000-0000-0000-000000000003',
    'bc000001-0000-0000-0000-000000000003',
    true, '2026-03-15', 6
  ),
  (
    'b0000001-0000-0000-0000-000000000004',
    'Understanding the Easter Triduum: A Beginner''s Guide',
    'understanding-easter-triduum-beginners-guide',
    'Holy Thursday. Good Friday. Easter Vigil. What happens at each liturgy, why it matters, and how to participate fully — explained simply for every Catholic.',
    'a0000001-0000-0000-0000-000000000004',
    'bc000001-0000-0000-0000-000000000004',
    true, '2026-03-10', 7
  ),
  (
    'b0000001-0000-0000-0000-000000000005',
    'Blessed Isidore Bakanja: Uganda''s Lay Martyr Who Belongs to All of Africa',
    'blessed-isidore-bakanja-ugandas-lay-martyr',
    'The story of the young Congolese layworker who refused to remove his scapular and died proclaiming forgiveness — and why his feast day should matter to every East African Catholic.',
    'a0000001-0000-0000-0000-000000000005',
    'bc000001-0000-0000-0000-000000000005',
    true, '2026-03-03', 4
  ),
  (
    'b0000001-0000-0000-0000-000000000006',
    'The Best Catholic Gifts for a First Communion in Tanzania',
    'best-catholic-gifts-first-communion-tanzania',
    'From personalised rosaries to illustrated children''s Bibles, we have curated the most meaningful, age-appropriate gifts for this unforgettable sacrament.',
    'a0000001-0000-0000-0000-000000000006',
    'bc000001-0000-0000-0000-000000000006',
    true, '2026-02-28', 3
  )
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- 8. PARISHES  (FindParish.tsx parishes array)
-- ============================================================

INSERT INTO parishes (name, region, area, phone, mass_times, type, is_active) VALUES
  ('Cathedral of Saint Joseph',  'Dar es Salaam', 'Msimbazi, Ilala',    '+255 22 211 5678', 'Sun: 7AM, 9AM, 11AM • Sat: 5PM',   'Cathedral', true),
  ('Holy Cross Parish',          'Dar es Salaam', 'Oyster Bay',         '+255 22 266 9900', 'Sun: 8AM, 10AM • Weekday: 7AM',     'Parish',    true),
  ('Our Lady of the Angels',     'Dar es Salaam', 'Kimara',             '+255 22 244 3210', 'Sun: 7AM, 9:30AM • Sat: 6PM',       'Parish',    true),
  ('St. Peter & Paul Parish',    'Arusha',        'Arusha Town Centre', '+255 27 254 4456', 'Sun: 7AM, 9AM, 11AM',               'Parish',    true),
  ('Christ the King Cathedral',  'Mwanza',        'Mwanza City',        '+255 28 250 0123', 'Sun: 8AM, 10AM • Sat: 5PM',         'Cathedral', true),
  ('Blessed Sacrament Parish',   'Dodoma',        'Dodoma City Centre', '+255 26 232 5789', 'Sun: 7AM, 9AM',                     'Parish',    true),
  ('St. Augustine Parish',       'Moshi',         'Moshi Town',         '+255 27 275 6634', 'Sun: 7AM, 10AM • Sat: 5:30PM',      'Parish',    true),
  ('Our Lady of Fatima',         'Zanzibar',      'Stone Town',         '+255 24 223 4567', 'Sun: 8AM, 10AM',                    'Parish',    true);


-- ============================================================
-- 9. DONATION TIERS & CAUSES  (Donations.tsx TIERS / CAUSES)
-- ============================================================

INSERT INTO site_settings (key, value, description) VALUES
  ('donation_tiers',
   '[{"amount":5000,"label":"TZS 5,000","desc":"Light a Candle","icon":"🕯️"},{"amount":10000,"label":"TZS 10,000","desc":"Fund a Prayer Book","icon":"📖"},{"amount":25000,"label":"TZS 25,000","desc":"Support a Family''s Rosary","icon":"📿"},{"amount":50000,"label":"TZS 50,000","desc":"Sponsor an Album","icon":"🎵"},{"amount":100000,"label":"TZS 100,000","desc":"Equip a Parish Library","icon":"⛪"}]',
   'Donation amount tiers (JSON array)'),
  ('donation_causes',
   '[{"icon":"🎵","title":"Catholic Music Ministry","desc":"Support original Swahili and English worship music recorded and produced in Tanzania."},{"icon":"📖","title":"Bibles & Devotionals","desc":"Many families cannot afford a Bible. Donations enable us to procure and distribute Catholic Bibles and devotional books."},{"icon":"⛪","title":"Parish Outreach","desc":"From rural chapels to urban centres, your support helps us bring faith resources, music events, and catechesis materials to parishes."},{"icon":"👶","title":"Children''s Faith Education","desc":"Fund illustrated children''s Bibles, catechism resources, and faith-based activity kits for Sunday schools."}]',
   'Donation cause descriptions (JSON array)')
ON CONFLICT (key) DO NOTHING;


-- ============================================================
-- 10. PRAYERS  (src/data/prayers.json — 17 prayers)
-- ============================================================

INSERT INTO prayers (id, title, slug, category, language, body_text, is_active, sort_order) VALUES
  ('1a000001-0000-0000-0000-000000000001', 'Our Father (Pater Noster)',       'our-father',           'Daily Prayers',     'en', 'Our Father, who art in heaven,
hallowed be thy name;
thy kingdom come,
thy will be done
on earth as it is in heaven.
Give us this day our daily bread,
and forgive us our trespasses,
as we forgive those who trespass against us;
and lead us not into temptation,
but deliver us from evil.
Amen.', true, 1),

  ('1a000001-0000-0000-0000-000000000002', 'Hail Mary (Ave Maria)',           'hail-mary',            'Marian Prayers',    'en', 'Hail Mary, full of grace,
the Lord is with thee;
blessed art thou among women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God,
pray for us sinners,
now and at the hour of our death.
Amen.', true, 2),

  ('1a000001-0000-0000-0000-000000000003', 'Glory Be (Gloria Patri)',         'glory-be',             'Daily Prayers',     'en', 'Glory be to the Father,
and to the Son,
and to the Holy Spirit.
As it was in the beginning,
is now, and ever shall be,
world without end.
Amen.', true, 3),

  ('1a000001-0000-0000-0000-000000000004', 'The Apostles'' Creed',            'apostles-creed',       'Daily Prayers',     'en', 'I believe in God,
the Father almighty,
Creator of heaven and earth,
and in Jesus Christ, his only Son, our Lord,
who was conceived by the Holy Spirit,
born of the Virgin Mary,
suffered under Pontius Pilate,
was crucified, died and was buried;
he descended into hell;
on the third day he rose again from the dead;
he ascended into heaven,
and is seated at the right hand of God the Father almighty;
from there he will come to judge the living and the dead.
I believe in the Holy Spirit,
the holy catholic Church,
the communion of saints,
the forgiveness of sins,
the resurrection of the body,
and life everlasting.
Amen.', true, 4),

  ('1a000001-0000-0000-0000-000000000005', 'Act of Contrition',               'act-of-contrition',    'Daily Prayers',     'en', 'O my God, I am heartily sorry
for having offended you,
and I detest all my sins
because of your just punishments,
but most of all because they offend you, my God,
who are all-good and deserving of all my love.
I firmly resolve, with the help of your grace,
to sin no more and to avoid the near occasions of sin.
Amen.', true, 5),

  ('1a000001-0000-0000-0000-000000000006', 'Morning Offering',               'morning-offering',     'Daily Prayers',     'en', 'O Jesus, through the Immaculate Heart of Mary,
I offer you my prayers, works, joys and sufferings of this day
in union with the Holy Sacrifice of the Mass throughout the world.
I offer them for all the intentions of your Sacred Heart:
the salvation of souls, reparation for sin,
and the reunion of all Christians.
Amen.', true, 6),

  ('1a000001-0000-0000-0000-000000000007', 'The Angelus',                    'angelus',              'Daily Prayers',     'en', 'V. The Angel of the Lord declared unto Mary.
R. And she conceived of the Holy Spirit.

Hail Mary...

V. Behold the handmaid of the Lord.
R. Be it done unto me according to thy word.

Hail Mary...

V. And the Word was made flesh.
R. And dwelt among us.

Hail Mary...

V. Pray for us, O Holy Mother of God.
R. That we may be made worthy of the promises of Christ.

Let us pray:
Pour forth, we beseech thee, O Lord, thy grace into our hearts;
that we, to whom the incarnation of Christ thy Son was made known
by the message of an angel, may by his Passion and Cross
be brought to the glory of his Resurrection,
through the same Christ our Lord. Amen.', true, 7),

  ('1a000001-0000-0000-0000-000000000008', 'The Memorare',                   'memorare',             'Marian Prayers',    'en', 'Remember, O most gracious Virgin Mary,
that never was it known
that anyone who fled to thy protection,
implored thy help,
or sought thine intercession
was left unaided.
Inspired by this confidence I fly unto thee,
O Virgin of virgins, my mother;
to thee do I come,
before thee I stand,
sinful and sorrowful.
O Mother of the Word Incarnate,
despise not my petitions,
but in thy mercy hear and answer me.
Amen.', true, 8),

  ('1a000001-0000-0000-0000-000000000009', 'Salve Regina (Hail Holy Queen)',  'salve-regina',         'Marian Prayers',    'en', 'Hail, Holy Queen, Mother of Mercy,
hail, our life, our sweetness and our hope.
To thee do we cry, poor banished children of Eve;
to thee do we send up our sighs,
mourning and weeping in this valley of tears.
Turn then, most gracious advocate,
thine eyes of mercy towards us;
and after this our exile,
show unto us the blessed fruit of thy womb, Jesus.
O clement, O loving, O sweet Virgin Mary.', true, 9),

  ('1a000001-0000-0000-0000-000000000010', 'Regina Caeli (Queen of Heaven)',  'regina-caeli',         'Marian Prayers',    'en', 'Queen of Heaven, rejoice, alleluia.
For he whom you did merit to bear, alleluia.
Has risen as he said, alleluia.
Pray for us to God, alleluia.

Let us pray: O God, who gave joy to the world
through the resurrection of your Son, our Lord Jesus Christ,
grant we beseech you, that through the intercession
of the Virgin Mary, his Mother,
we may obtain the joys of everlasting life.
Through the same Christ our Lord. Amen.', true, 10),

  ('1a000001-0000-0000-0000-000000000011', 'Chaplet of Divine Mercy',         'chaplet-divine-mercy', 'Chaplets',          'en', 'On each Our Father bead:
"Eternal Father, I offer you the Body and Blood,
Soul and Divinity of your dearly beloved Son,
Our Lord, Jesus Christ,
in atonement for our sins and those of the whole world."

On each Hail Mary bead (ten per decade):
"For the sake of his sorrowful Passion,
have mercy on us and on the whole world."

Conclude (three times):
"Holy God, Holy Mighty One,
Holy Immortal One,
have mercy on us and on the whole world."', true, 11),

  ('1a000001-0000-0000-0000-000000000012', 'Prayer to St. Michael the Archangel', 'st-michael-prayer', 'Chaplets',         'en', 'Saint Michael the Archangel,
defend us in battle;
be our protection against the wickedness
and snares of the devil.
May God rebuke him, we humbly pray,
and do thou, O prince of the heavenly host,
by the power of God,
thrust into hell Satan and all the evil spirits
who prowl about the world seeking the ruin of souls.
Amen.', true, 12),

  ('1a000001-0000-0000-0000-000000000013', 'Stations of the Cross',           'stations-of-the-cross','Special Occasions', 'en', 'We adore you, O Christ, and we bless you,
because by your holy Cross you have redeemed the world.

The 14 Stations:
1. Jesus is condemned to death
2. Jesus carries his Cross
3. Jesus falls for the first time
4. Jesus meets his Mother
5. Simon of Cyrene helps Jesus carry the Cross
6. Veronica wipes the face of Jesus
7. Jesus falls for the second time
8. Jesus meets the women of Jerusalem
9. Jesus falls for the third time
10. Jesus is stripped of his garments
11. Jesus is nailed to the Cross
12. Jesus dies on the Cross
13. Jesus is taken down from the Cross
14. Jesus is laid in the tomb

At each station:
We adore you, O Christ, and we bless you,
because by your holy Cross you have redeemed the world.', true, 13),

  ('1a000001-0000-0000-0000-000000000014', 'Grace Before Meals',             'grace-before-meals',   'Daily Prayers',     'en', 'Bless us, O Lord, and these thy gifts,
which we are about to receive
from thy bounty,
through Christ our Lord.
Amen.', true, 14),

  ('1a000001-0000-0000-0000-000000000015', 'Grace After Meals',              'grace-after-meals',    'Daily Prayers',     'en', 'We give thee thanks, Almighty God,
for all thy benefits,
who livest and reignest
world without end.
And may the souls of the faithful departed,
through the mercy of God, rest in peace.
Amen.', true, 15),

  ('1a000001-0000-0000-0000-000000000016', 'Act of Spiritual Communion',     'spiritual-communion',  'Special Occasions', 'en', 'My Jesus, I believe that you are present
in the Most Holy Sacrament.
I love you above all things,
and I desire to receive you into my soul.
Since I cannot at this moment receive you sacramentally,
come at least spiritually into my heart.
I embrace you as if you were already there
and unite myself wholly to you.
Never permit me to be separated from you.
Amen.', true, 16),

  ('1a000001-0000-0000-0000-000000000017', 'Eternal Rest (De Profundis)',    'eternal-rest',         'Special Occasions', 'en', 'Eternal rest grant unto them, O Lord,
and let perpetual light shine upon them.
May the souls of all the faithful departed,
through the mercy of God,
rest in peace.
Amen.', true, 17),

  ('1a000001-0000-0000-0000-000000000018', 'Anima Christi (Soul of Christ)', 'anima-christi',        'Special Occasions', 'en', 'Soul of Christ, sanctify me.
Body of Christ, save me.
Blood of Christ, inebriate me.
Water from the side of Christ, wash me.
Passion of Christ, strengthen me.
O Good Jesus, hear me.
Within thy wounds, hide me.
Suffer me not to be separated from thee.
From the malicious enemy, defend me.
In the hour of my death, call me.
And bid me come to thee,
that with thy saints I may praise thee
for ever and ever. Amen.', true, 18)

ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- 11. NOVENAS  (src/data/novenas.json — 8 novenas)
-- ============================================================

INSERT INTO novenas (id, title, slug, description, days_count, daily_prayers, is_active) VALUES
  (
    '4e000001-0000-0000-0000-000000000001',
    'Divine Mercy Novena',
    'divine-mercy-novena',
    'Jesus asked St. Faustina Kowalska to begin this novena on Good Friday. Each day focuses on a different group of souls to bring before the Throne of Mercy.',
    9,
    '[
      {"day":1,"prayer":"Today bring to Me ALL MANKIND, especially all sinners, and immerse them in the ocean of My mercy."},
      {"day":2,"prayer":"Today bring to Me THE SOULS OF PRIESTS AND RELIGIOUS, and immerse them in My unfathomable mercy."},
      {"day":3,"prayer":"Today bring to Me ALL DEVOUT AND FAITHFUL SOULS, and immerse them in the ocean of My mercy."},
      {"day":4,"prayer":"Today bring to Me THOSE WHO DO NOT BELIEVE IN GOD AND THOSE WHO DO NOT KNOW ME."},
      {"day":5,"prayer":"Today bring to Me THE SOULS OF THOSE WHO HAVE SEPARATED THEMSELVES FROM MY CHURCH."},
      {"day":6,"prayer":"Today bring to Me THE MEEK AND HUMBLE SOULS AND THE SOULS OF LITTLE CHILDREN."},
      {"day":7,"prayer":"Today bring to Me THE SOULS WHO ESPECIALLY VENERATE AND GLORIFY MY MERCY."},
      {"day":8,"prayer":"Today bring to Me THE SOULS WHO ARE DETAINED IN PURGATORY."},
      {"day":9,"prayer":"Today bring to Me SOULS WHO HAVE BECOME LUKEWARM."}
    ]'::jsonb,
    true
  ),
  (
    '4e000001-0000-0000-0000-000000000002',
    'Novena to St. Joseph',
    'novena-st-joseph',
    'A powerful nine-day prayer to St. Joseph leading up to his Solemnity on March 19. Pray for the needs of your family, workers, and the dying.',
    9,
    '[
      {"day":1,"prayer":"St. Joseph, faithful guardian of the Holy Family, pray for us. We entrust our families to your care today."},
      {"day":2,"prayer":"St. Joseph, carpenter and labourer, sanctify all honest work. Pray for those who labour with their hands."},
      {"day":3,"prayer":"St. Joseph, model of silence and contemplation, teach us interior peace in the midst of daily duties."},
      {"day":4,"prayer":"St. Joseph, protector against doubts and temptations, strengthen our faith and guard our purity."},
      {"day":5,"prayer":"St. Joseph, patron of the dying, be with us in our final hour as you were with Jesus and Mary."},
      {"day":6,"prayer":"St. Joseph, model of obedience to God''s will, help us to accept suffering with patience and hope."},
      {"day":7,"prayer":"St. Joseph, patron of the Universal Church, intercede for all priests, religious, and the Holy Father."},
      {"day":8,"prayer":"St. Joseph, just man and faithful steward, teach us to serve God faithfully in our vocation."},
      {"day":9,"prayer":"St. Joseph, terror of demons, protect our homes and families from all spiritual harm. Amen."}
    ]'::jsonb,
    true
  ),
  (
    '4e000001-0000-0000-0000-000000000003',
    'Novena to the Holy Spirit',
    'novena-holy-spirit',
    'The very first novena in Christian history: the nine days between Ascension and Pentecost, when the Apostles and Mary prayed together in the Upper Room.',
    9,
    '[
      {"day":1,"prayer":"Come, Holy Spirit, fill the hearts of your faithful with the gift of Wisdom — to see all things in the light of eternity."},
      {"day":2,"prayer":"Come, Holy Spirit, and grant us Understanding — to penetrate the truths of our faith more deeply."},
      {"day":3,"prayer":"Come, Holy Spirit, and grant us Counsel — to judge rightly in all situations and discern God''s will."},
      {"day":4,"prayer":"Come, Holy Spirit, and grant us Fortitude — to endure trials and to stand firm for the Gospel."},
      {"day":5,"prayer":"Come, Holy Spirit, and grant us Knowledge — to know God''s ways and to avoid the snares of sin."},
      {"day":6,"prayer":"Come, Holy Spirit, and grant us Piety — a profound reverence for God and holy affection for all that belongs to him."},
      {"day":7,"prayer":"Come, Holy Spirit, and grant us Fear of the Lord — a holy awe in God''s presence that turns us from sin."},
      {"day":8,"prayer":"Come, Holy Spirit, renew the face of the earth. Send forth your Spirit and we shall be created anew."},
      {"day":9,"prayer":"Come, Holy Spirit, Come! Fill my heart with your fire. Let me burn for God alone. Amen."}
    ]'::jsonb,
    true
  ),
  (
    '4e000001-0000-0000-0000-000000000004',
    'Novena to Our Lady of Fatima',
    'novena-our-lady-fatima',
    'Pray this novena in preparation for the feast of Our Lady of Fatima on May 13. Ask her intercession for peace in the world and the conversion of sinners.',
    9,
    '[
      {"day":1,"prayer":"Immaculate Heart of Mary, intercede for peace in our families and in our world."},
      {"day":2,"prayer":"Our Lady of Fatima, you asked for the Rosary each day. Help us to be faithful to this prayer."},
      {"day":3,"prayer":"Mary, you promised to help those who consecrate themselves to your Immaculate Heart. We renew our consecration today."},
      {"day":4,"prayer":"Our Lady, you showed the children a vision of hell. Move our hearts to pray for sinners."},
      {"day":5,"prayer":"Mary, you asked for the First Saturday devotions. Help us to make reparation for sins against your Immaculate Heart."},
      {"day":6,"prayer":"Our Lady of Fatima, you asked for the consecration of Russia. We pray for the conversion of all nations."},
      {"day":7,"prayer":"Mary, messenger of mercy, bring all souls who are far from God back to his loving embrace."},
      {"day":8,"prayer":"Immaculate Heart of Mary, triumph in our hearts, our homes and our nation."},
      {"day":9,"prayer":"Our Lady of Fatima, pray for us as we pray the Rosary for peace. In the end, your Immaculate Heart will triumph. Amen."}
    ]'::jsonb,
    true
  ),
  (
    '4e000001-0000-0000-0000-000000000005',
    'Novena to St. Thérèse of Lisieux',
    'novena-st-therese',
    'Pray to St. Thérèse in confidence that she will shower roses from heaven. Her little way of spiritual childhood opens the path of holiness to everyone.',
    9,
    '[
      {"day":1,"prayer":"St. Thérèse, teach me the little way — to do small things with great love."},
      {"day":2,"prayer":"Little Flower, pray that I may have the complete abandonment to God''s will that you showed."},
      {"day":3,"prayer":"St. Thérèse, you said you would spend your heaven doing good on earth. Send me a rose of grace today."},
      {"day":4,"prayer":"Little Flower, intercede for all souls who are suffering with serious illness, as you suffered from tuberculosis."},
      {"day":5,"prayer":"St. Thérèse, you were a great missionary from your cloister. Pray for all missionaries in the field today."},
      {"day":6,"prayer":"Little Flower, help me to accept humiliations with love, as you did throughout your life in Carmel."},
      {"day":7,"prayer":"St. Thérèse, patron of all those who love God with a childlike trust, deepen my confidence in the Father."},
      {"day":8,"prayer":"Little Flower, pray for priests — as you promised to pray for them from heaven — that they be holy and zealous."},
      {"day":9,"prayer":"St. Thérèse, my little sister in Carmel, walk beside me on my Christian journey. Amen."}
    ]'::jsonb,
    true
  ),
  (
    '4e000001-0000-0000-0000-000000000006',
    'Novena to St. Jude',
    'novena-st-jude',
    'A beloved novena for situations that seem beyond all human hope. St. Jude, the Apostle of desperate cases, stands before the throne of God to intercede for us.',
    9,
    '[
      {"day":1,"prayer":"St. Jude, Apostle and martyr, I come to you in my need. Nothing is impossible with God."},
      {"day":2,"prayer":"St. Jude, glorious Apostle, faithful servant and friend of Jesus, I place my desperate need before you."},
      {"day":3,"prayer":"St. Jude, patron of the impossible, intercede that I may receive the grace I so urgently need."},
      {"day":4,"prayer":"Holy St. Jude, worker of miracles, be not deaf to my pleading but gracious and merciful."},
      {"day":5,"prayer":"St. Jude, helper of the hopeless, pray that God''s will be done — and that his will be my healing."},
      {"day":6,"prayer":"Holy St. Jude, grant me patience and trust in God''s timing as I wait on his answer."},
      {"day":7,"prayer":"St. Jude, I promise to make it known that it is through your intercession that I have been helped."},
      {"day":8,"prayer":"Holy St. Jude, pray that I may accept with Christian joy whatever God shall will for me."},
      {"day":9,"prayer":"Glorious St. Jude, thank you for your intercession. I will keep my promise. Amen."}
    ]'::jsonb,
    true
  ),
  (
    '4e000001-0000-0000-0000-000000000007',
    'Novena to the Immaculate Conception',
    'novena-immaculate-conception',
    'A nine-day novena leading to the Solemnity of the Immaculate Conception on December 8.',
    9,
    '[
      {"day":1,"prayer":"O Mary, conceived without sin, you were preserved from all stain of original sin. Pray for us who have recourse to you."},
      {"day":2,"prayer":"Immaculate Mary, your soul was the purest vessel for the Word of God. Purify our minds and hearts."},
      {"day":3,"prayer":"O Immaculate One, you crushed the head of the serpent. Help us overcome our habitual sins today."},
      {"day":4,"prayer":"Mary, full of grace, share your fullness with us. We are empty; fill us with God''s life."},
      {"day":5,"prayer":"Immaculate Heart of Mary, you were the first to believe fully in your Son. Deepen our faith."},
      {"day":6,"prayer":"O Immaculate Virgin, you are the model of the Church. Help the Church to be holy as you are holy."},
      {"day":7,"prayer":"Mary, Queen conceived without original sin, intercede for our nation and all nations."},
      {"day":8,"prayer":"O Immaculate Mary, in whom God showed us what redeemed humanity looks like, draw us to your Son."},
      {"day":9,"prayer":"Immaculate Virgin, on this eve of your feast, present our petitions to your Son. Amen."}
    ]'::jsonb,
    true
  ),
  (
    '4e000001-0000-0000-0000-000000000008',
    'Novena to the Sacred Heart of Jesus',
    'novena-sacred-heart',
    'Jesus promised St. Margaret Mary Alacoque twelve promises to those who practise the devotion to his Sacred Heart.',
    9,
    '[
      {"day":1,"prayer":"O Sacred Heart of Jesus, I give myself entirely to you. Make me burn with love as you burn with love."},
      {"day":2,"prayer":"Sacred Heart, Jesus meek and humble, grant that my heart may become more like unto thine."},
      {"day":3,"prayer":"O Sacred Heart of Jesus, I trust in you completely. In my weakness, be my strength."},
      {"day":4,"prayer":"Sacred Heart of Jesus, atonement. I make reparation for all the times I have pushed you aside."},
      {"day":5,"prayer":"O Sacred Heart, pierced by a lance, have mercy on all who are dying today without the sacraments."},
      {"day":6,"prayer":"Sacred Heart of Jesus, refuge of sinners, receive all who are far from you and draw them home."},
      {"day":7,"prayer":"O Sacred Heart, from which flows the grace of the sacraments, be the strength of all priests."},
      {"day":8,"prayer":"Sacred Heart of Jesus, you are patient and full of mercy. Teach me to bear wrongs patiently."},
      {"day":9,"prayer":"O Sacred Heart of Jesus, I consecrate myself completely to you. Thy kingdom come. Amen."}
    ]'::jsonb,
    true
  )
ON CONFLICT (id) DO NOTHING;


-- ============================================================
-- 12. SAINTS  (src/data/saints.json — full liturgical calendar)
-- ============================================================

INSERT INTO saints (name, slug, feast_day, biography, is_active) VALUES
  ('Mary, Mother of God',                  'mary-mother-of-god',                   'January 1',   'On this day the Church celebrates the divine motherhood of the Blessed Virgin Mary. She who bore the Son of God, the Second Person of the Holy Trinity, is rightly proclaimed Theotokos — God-bearer.', true),
  ('The Epiphany of the Lord',             'epiphany-of-the-lord',                 'January 6',   'The manifestation of Christ to the Gentiles, represented by the Magi. The word epiphany means ''manifestation'' or ''showing forth.''', true),
  ('St. Hilary of Poitiers',               'st-hilary-of-poitiers',                'January 13',  'Bishop and Doctor of the Church. Known as the ''Athanasius of the West'' for his courageous defence of the divinity of Christ against Arianism.', true),
  ('St. Anthony of Egypt',                 'st-anthony-of-egypt',                  'January 17',  'Father of Christian monasticism. He withdrew into the Egyptian desert at age 20 and spent decades in prayer, fasting and spiritual combat.', true),
  ('St. Fabian',                           'st-fabian',                            'January 20',  'Pope and martyr. Fabian was elected pope by the extraordinary sign of a dove landing on his head. He governed the Church for 14 years and was martyred under Emperor Decius.', true),
  ('St. Agnes',                            'st-agnes',                             'January 21',  'Virgin and martyr of Rome. Agnes refused marriage to the son of a prefect and was denounced as a Christian. She was executed at about 13 years old and is patron of chastity and young girls.', true),
  ('St. Francis de Sales',                 'st-francis-de-sales',                  'January 24',  'Bishop of Geneva and Doctor of the Church. His gentle and optimistic approach to holiness — that every person can become a saint — transformed Catholic spirituality.', true),
  ('The Conversion of St. Paul',           'conversion-of-st-paul',                'January 25',  'Saul of Tarsus was thrown to the ground on the road to Damascus by a blinding light and the voice of the risen Christ. This event transformed the greatest persecutor of Christians into the Apostle to the Gentiles.', true),
  ('Ss. Timothy and Titus',                'ss-timothy-and-titus',                 'January 26',  'Two faithful disciples and collaborators of St. Paul. Timothy was the first Bishop of Ephesus and Titus the first Bishop of Crete. Both received Pauline epistles in their names.', true),
  ('St. Angela Merici',                    'st-angela-merici',                     'January 27',  'Foundress of the Ursulines, the first teaching order of women in the Church. She dedicated her life to the education of young women and care for the sick and poor.', true),
  ('St. Thomas Aquinas',                   'st-thomas-aquinas',                    'January 28',  'Dominican friar, Doctor of the Church, ''Angelic Doctor.'' His Summa Theologiae remains the foundation of Catholic theology.', true),
  ('St. John Bosco',                       'st-john-bosco',                        'January 31',  'Founder of the Salesians. Don Bosco devoted his life to the education and care of poor youth in Turin. His preventive system of education based on reason, religion and kindness remains influential worldwide.', true),
  ('The Presentation of the Lord',         'presentation-of-the-lord',             'February 2',  'On this day, forty days after Christmas, Mary and Joseph presented the infant Jesus in the Temple according to the Law of Moses. The prophet Simeon proclaimed him ''a light for revelation to the Gentiles.''', true),
  ('St. Blaise',                           'st-blaise',                            'February 3',  'Bishop of Sebastea and martyr. The blessing of throats on his feast day recalls the legend of his healing a boy choking on a fishbone. He is patron of those with throat ailments.', true),
  ('St. Agatha',                           'st-agatha',                            'February 5',  'Virgin and martyr of Sicily. Agatha refused the advances of a Roman prefect and was savagely tortured before her execution. She is patron of Sicily, breast cancer patients and bell-makers.', true),
  ('St. Paul Miki and Companions',         'st-paul-miki-and-companions',          'February 6',  'Twenty-six martyrs crucified on a hill overlooking Nagasaki, Japan in 1597. Among them were Jesuit priests, Franciscans, and Japanese laypeople including Paul Miki, a Jesuit brother.', true),
  ('St. Jerome Emiliani',                  'st-jerome-emiliani',                   'February 8',  'Founder of the Somaschi Fathers. After his miraculous release from prison, he devoted himself entirely to the care of orphans, the poor and the sick.', true),
  ('St. Scholastica',                      'st-scholastica',                       'February 10', 'Twin sister of St. Benedict and foundress of Benedictine women''s monasticism. The famous story of her last meeting with Benedict shows the power of love over rules.', true),
  ('Our Lady of Lourdes',                  'our-lady-of-lourdes',                  'February 11', 'On this date in 1858, the Blessed Virgin Mary began appearing to 14-year-old Bernadette Soubirous in a grotto at Lourdes, France, revealing herself as the Immaculate Conception.', true),
  ('Ss. Cyril and Methodius',              'ss-cyril-and-methodius',               'February 14', 'Apostles to the Slavs and co-patrons of Europe. Brothers who created the Glagolitic alphabet to translate the Bible and liturgy into Slavonic, opening Christ''s message to millions.', true),
  ('The Seven Holy Founders of the Servite Order', 'seven-holy-founders-servite',  'February 17', 'Seven Florentine merchants who, in 1233, withdrew to Monte Senario under Our Lady''s guidance and founded the Order of Servants of Mary (Servites).', true),
  ('St. Peter Damian',                     'st-peter-damian',                      'February 21', 'Cardinal-Bishop and Doctor of the Church. A fierce reformer of clerical morality and monastic discipline in 11th-century Italy.', true),
  ('The Chair of St. Peter',               'chair-of-st-peter',                    'February 22', 'This feast honours the authority given to St. Peter as head of the Church. The ''chair'' (cathedra) is the symbol of teaching authority. Peter''s successor, the Pope, sits in this chair.', true),
  ('St. Polycarp',                         'st-polycarp',                          'February 23', 'Bishop of Smyrna and martyr. A disciple of St. John the Apostle. When asked to renounce Christ, the 86-year-old bishop replied: ''For 86 years I have served him and he has done me no wrong.''', true),
  ('St. Casimir',                          'st-casimir',                           'March 4',     'Prince of Poland who chose a life of celibacy and penance over worldly power. Known for his great devotion to the Eucharist and to Our Lady, he died at age 25.', true),
  ('Ss. Perpetua and Felicity',            'ss-perpetua-and-felicity',             'March 7',     'Martyrs of Carthage (203 AD). Perpetua was a young noblewoman and Felicity a slave. Together they were thrown to wild beasts in the arena.', true),
  ('St. John of God',                      'st-john-of-god',                       'March 8',     'Founder of the Brothers Hospitallers. After a dramatic conversion at age 40, he devoted himself entirely to the care of the sick and poor in Granada.', true),
  ('St. Frances of Rome',                  'st-frances-of-rome',                   'March 9',     'Married laywoman and foundress of the Oblates of Mary. She bore the mystical wound of stigmata and was granted the constant visible companionship of her guardian angel.', true),
  ('St. Patrick',                          'st-patrick',                           'March 17',    'Apostle of Ireland. Captured as a slave from Britain at 16, he escaped, became a priest, and returned to Ireland to evangelise the whole island.', true),
  ('St. Cyril of Jerusalem',               'st-cyril-of-jerusalem',                'March 18',    'Bishop and Doctor of the Church. His Catechetical Lectures remain one of the best introductions to Christian faith and remain the basis of Easter vigil catechesis.', true),
  ('St. Joseph, Spouse of the Blessed Virgin Mary', 'st-joseph',                   'March 19',    'Patron of the Universal Church, workers, fathers and a happy death. The humble carpenter of Nazareth was chosen by God to be the guardian of the Holy Family and the foster-father of Jesus.', true),
  ('St. Turibius of Mogrovejo',            'st-turibius-of-mogrovejo',             'March 23',    'Archbishop of Lima and patron of the bishops of Latin America. He learned local languages to minister to indigenous peoples and is credited with confirming St. Rose of Lima and St. Martin de Porres.', true),
  ('The Annunciation of the Lord',         'annunciation-of-the-lord',             'March 25',    'The Angel Gabriel appeared to the Virgin Mary in Nazareth and announced that she would conceive and bear the Son of God. Her Fiat is the foundation of our salvation.', true),
  ('St. Francis of Paola',                 'st-francis-of-paola',                  'April 2',     'Founder of the Order of Minims. A hermit from Calabria, Italy, he was renowned for miracles including crossing the Strait of Messina on his cloak.', true),
  ('St. Isidore of Seville',               'st-isidore-of-seville',                'April 4',     'Bishop and Doctor of the Church. His Etymologiae was the standard encyclopedia of the Middle Ages. He is patron of the internet and computer users.', true),
  ('St. Vincent Ferrer',                   'st-vincent-ferrer',                    'April 5',     'Dominican friar and great preacher who travelled through Spain, France and Italy calling sinners to repentance. Credited with thousands of miracles and conversions.', true),
  ('St. John Baptist de la Salle',         'st-john-baptist-de-la-salle',          'April 7',     'Founder of the Christian Brothers. He gave up his fortune to establish free schools for poor boys and revolutionised education by teaching in the vernacular.', true),
  ('St. Stanislaus',                       'st-stanislaus',                        'April 11',    'Bishop of Krakow and martyr. He was killed by King Boleslaw II of Poland for excommunicating him. He is patron of Poland and moral courage.', true),
  ('St. Anselm',                           'st-anselm',                            'April 21',    'Archbishop of Canterbury and Doctor of the Church. ''Father of Scholasticism.'' His famous formula ''faith seeking understanding'' defines the Catholic intellectual tradition.', true),
  ('St. George',                           'st-george',                            'April 23',    'Martyr and patron of England. A Roman soldier martyred in Palestine. The legend of slaying a dragon represents the victory of faith over evil.', true),
  ('St. Mark',                             'st-mark',                              'April 25',    'Evangelist and author of the second Gospel. A companion of Paul and Barnabas and later of Peter, whose preaching he recorded. Patron of Venice and Egypt.', true),
  ('St. Peter Chanel',                     'st-peter-chanel',                      'April 28',    'First martyr of Oceania. A Marist missionary killed on the island of Futuna in 1841. His death led to the conversion of the entire island.', true),
  ('St. Catherine of Siena',               'st-catherine-of-siena',                'April 29',    'Dominican tertiary, Doctor of the Church, and co-patron of Europe. She persuaded Pope Gregory XI to return from Avignon to Rome.', true),
  ('St. Joseph the Worker',                'st-joseph-the-worker',                 'May 1',       'Established by Pope Pius XII in 1955, this feast consecrates the dignity of human labour to God through the model of St. Joseph, the humble carpenter of Nazareth.', true),
  ('St. Athanasius',                       'st-athanasius',                        'May 2',       '''Athanasius against the world.'' Bishop of Alexandria who spent 17 years in exile for defending the full divinity of Christ against Arianism.', true),
  ('Ss. Philip and James',                 'ss-philip-and-james',                  'May 3',       'Apostles of Christ. Philip asked Jesus ''Show us the Father'' and received the great reply: ''He who sees me sees the Father.''', true),
  ('St. Damien of Molokai',                'st-damien-of-molokai',                 'May 10',      'Belgian missionary priest who voluntarily lived and died among the lepers of Molokai, Hawaii. Canonised 2009 by Pope Benedict XVI.', true),
  ('Our Lady of Fatima',                   'our-lady-of-fatima',                   'May 13',      'On May 13, 1917, the Virgin Mary appeared to three shepherd children in Fatima, Portugal, asking for prayer, penance and consecration of Russia to her Immaculate Heart.', true),
  ('St. Matthias',                         'st-matthias',                          'May 14',      'The Apostle chosen to replace Judas Iscariot. He had been a follower of Jesus from the beginning and was chosen by lot to complete the Twelve.', true),
  ('St. Bernardine of Siena',              'st-bernardine-of-siena',               'May 20',      'Franciscan friar and great itinerant preacher who renewed devotion to the Holy Name of Jesus throughout Italy in the 15th century.', true),
  ('St. Rita of Cascia',                   'st-rita-of-cascia',                    'May 22',      'Augustinian nun and widow. After the violent death of her husband and then the death of her two sons, she entered religious life. Patron of impossible causes.', true),
  ('St. Philip Neri',                      'st-philip-neri',                       'May 26',      '''Apostle of Rome.'' Founder of the Oratorians. A joyful and playful mystic who drew people to God through friendship and laughter.', true),
  ('The Visitation of the Blessed Virgin Mary', 'visitation-of-mary',             'May 31',      'Mary travels to visit her cousin Elizabeth, who is pregnant with John the Baptist. Elizabeth exclaims ''Most blessed are you among women'' and John leaps in the womb.', true),
  ('St. Justin Martyr',                    'st-justin-martyr',                     'June 1',      'Christian philosopher and apologist. His First and Second Apology and Dialogue with Trypho are the earliest extended Christian defences of the faith.', true),
  ('St. Charles Lwanga and Companions',    'st-charles-lwanga-and-companions',     'June 3',      'Twenty-two Ugandan men martyred between 1885–1887 under King Mwanga. They refused to renounce their faith and their moral convictions. Charles Lwanga led them to their deaths singing hymns.', true),
  ('St. Boniface',                         'st-boniface',                          'June 5',      '''Apostle of Germany.'' English Benedictine monk who evangelized the Germanic peoples and reorganised the Church in the Frankish kingdom. Martyred by pagan Frisians at age 80.', true),
  ('St. Ephrem the Syrian',                'st-ephrem-the-syrian',                 'June 9',      'Deacon, poet and Doctor of the Church. Called the ''Harp of the Holy Spirit.'' His hymns and commentaries are foundational for the Syriac Christian tradition.', true),
  ('St. Barnabas',                         'st-barnabas',                          'June 11',     'Apostle and companion of St. Paul. A Levite from Cyprus, he introduced Paul to the Apostles in Jerusalem and became his partner on the first missionary journey.', true),
  ('St. Anthony of Padua',                 'st-anthony-of-padua',                  'June 13',     'Franciscan friar and Doctor of the Church. Known for his powerful preaching and as the patron for finding lost things. One of the most beloved saints in the Catholic world.', true),
  ('St. Aloysius Gonzaga',                 'st-aloysius-gonzaga',                  'June 21',     'Jesuit scholastic and patron of youth. He renounced his princely inheritance to become a Jesuit and died at 23 while nursing plague victims in Rome.', true),
  ('The Nativity of St. John the Baptist', 'nativity-of-john-the-baptist',         'June 24',     'The forerunner of Christ, born six months before Jesus. John''s birth to the aged Elizabeth and Zechariah was announced by the Angel Gabriel.', true),
  ('St. Irenaeus',                         'st-irenaeus',                          'June 28',     'Bishop of Lyon and Father of the Church. His Against Heresies is the first great work of systematic Catholic theology and the definitive early refutation of Gnosticism.', true),
  ('Ss. Peter and Paul',                   'ss-peter-and-paul',                    'June 29',     'The two great pillars of the Church. Peter, the Prince of the Apostles and first Pope, was crucified upside down in Rome. Paul, the Apostle to the Gentiles, was beheaded.', true),
  ('St. Thomas',                           'st-thomas-apostle',                    'July 3',      'Apostle and martyr. The ''Doubting Thomas'' who demanded to see Christ''s wounds became the first to proclaim ''My Lord and my God!'' Tradition holds he evangelized India.', true),
  ('St. Maria Goretti',                    'st-maria-goretti',                     'July 6',      'Virgin and martyr, died aged 11 defending her chastity. Before she died, she forgave her killer. He later repented after a vision of her and attended her canonisation. Patron of youth and purity.', true),
  ('St. Benedict',                         'st-benedict',                          'July 11',     '''Father of Western Monasticism'' and patron of Europe. His Rule is the foundation of monastic life in the West. His motto — Ora et Labora (Pray and Work) — shaped Western civilisation.', true),
  ('St. Kateri Tekakwitha',                'st-kateri-tekakwitha',                 'July 14',     'First Native American saint. Called the ''Lily of the Mohawks.'' She converted to Catholicism and lived a life of extraordinary penance and mystical union with God.', true),
  ('St. Bonaventure',                      'st-bonaventure',                       'July 15',     'Franciscan friar, Cardinal and Doctor of the Church. Called the ''Seraphic Doctor.'' His Journey of the Soul into God is a masterpiece of Franciscan mysticism.', true),
  ('Our Lady of Mount Carmel',             'our-lady-of-mount-carmel',             'July 16',     'This feast honours Mary under her title as patroness of the Carmelite Order. The Brown Scapular is associated with this devotion, linked to a vision of Simon Stock in 1251.', true),
  ('St. Mary Magdalene',                   'st-mary-magdalene',                    'July 22',     '''Apostle to the Apostles.'' The first witness of the Resurrection. Jesus appeared to her in the garden and sent her to announce the good news to the disciples.', true),
  ('St. James',                            'st-james-apostle',                     'July 25',     'Son of Zebedee and Apostle. Brother of St. John. He was the first Apostle to be martyred. His shrine at Santiago de Compostela is one of the great pilgrimage destinations.', true),
  ('Ss. Joachim and Anne',                 'ss-joachim-and-anne',                  'July 26',     'The parents of the Blessed Virgin Mary and grandparents of Jesus. They are honoured in Christian tradition as models of prayerful, holy parenthood.', true),
  ('St. Martha',                           'st-martha',                            'July 29',     'Sister of Mary and Lazarus. The practical, hospitable woman who prepared meals for Jesus and made the profound profession of faith: ''You are the Christ, the Son of God.''', true),
  ('St. Ignatius of Loyola',               'st-ignatius-of-loyola',                'July 31',     'Founder of the Society of Jesus (Jesuits). A Basque soldier whose conversion in a hospital bed led him to write the Spiritual Exercises — one of the most influential texts in Christian spirituality.', true),
  ('St. Alphonsus Liguori',                'st-alphonsus-liguori',                 'August 1',    'Bishop, founder of the Redemptorists and Doctor of the Church. A prolific theologian of moral theology and Marian devotion.', true),
  ('St. John Vianney (Curé of Ars)',        'st-john-vianney',                      'August 4',    'Parish priest of Ars, France, and patron of priests. He spent up to 18 hours a day in the confessional and attracted pilgrims from across Europe.', true),
  ('The Transfiguration of the Lord',      'transfiguration-of-the-lord',          'August 6',    'On Mount Tabor, Jesus was transfigured before Peter, James and John. His face shone like the sun, his clothes became white as light, and the voice of the Father spoke from a cloud.', true),
  ('St. Dominic',                          'st-dominic',                           'August 8',    'Founder of the Order of Preachers (Dominicans). He founded the order to combat heresy through preaching, study and poverty. He spread the Rosary as a weapon of prayer against error.', true),
  ('St. Teresa Benedicta of the Cross',    'st-teresa-benedicta',                  'August 9',    'Jewish philosopher who became a Carmelite nun and was gassed at Auschwitz in 1942. A brilliant intellect and martyr, she is co-patron of Europe.', true),
  ('St. Lawrence',                         'st-lawrence',                          'August 10',   'Deacon and martyr of Rome. When ordered to surrender the Church''s treasure, he presented the poor to the prefect saying ''These are the treasures of the Church.''', true),
  ('St. Clare of Assisi',                  'st-clare-of-assisi',                   'August 11',   'Founder of the Poor Clares and close friend of St. Francis. She spent 40 years in enclosure at San Damiano living strict poverty. She is patron of television.', true),
  ('St. Maximilian Kolbe',                 'st-maximilian-kolbe',                  'August 14',   'Franciscan friar martyred at Auschwitz. He volunteered to take the place of a family man condemned to the starvation bunker. He led his fellow prisoners in prayer and song until death.', true),
  ('The Assumption of the Blessed Virgin Mary', 'assumption-of-mary',              'August 15',   'On this day the Church proclaims the dogma of 1950: that Mary, having completed the course of her earthly life, was assumed body and soul into heavenly glory.', true),
  ('St. Bernard of Clairvaux',             'st-bernard-of-clairvaux',              'August 20',   'Cistercian abbot and Doctor of the Church. ''Last of the Fathers.'' He revived the Cistercian reform and became the dominant figure of 12th-century Europe.', true),
  ('St. Pius X',                           'st-pius-x',                            'August 21',   'Pope (1903–1914) who promoted frequent Communion and lowered the age of First Communion to the age of reason. He condemned the heresy of Modernism.', true),
  ('The Queenship of the Blessed Virgin Mary', 'queenship-of-mary',                'August 22',   'Closely linked to the Assumption, this feast crowns Mary''s earthly journey. As Mother of the King of Kings, she shares in his reign as Queen of Heaven and Earth.', true),
  ('St. Bartholomew',                      'st-bartholomew',                       'August 24',   'Apostle, possibly identical with Nathanael. He proclaimed ''You are the Son of God! You are King of Israel!'' upon meeting Jesus. Tradition holds he was martyred in Armenia.', true),
  ('St. Monica',                           'st-monica',                            'August 27',   'Mother of St. Augustine. For seventeen years she prayed and wept for the conversion of her brilliant but dissolute son. Her perseverance is the model for all praying parents.', true),
  ('St. Augustine of Hippo',               'st-augustine-of-hippo',                'August 28',   'Bishop and Doctor of the Church. ''Our heart is restless until it rests in You.'' After years of sin and searching, his conversion led him to become one of the greatest theologians in history.', true),
  ('The Martyrdom of St. John the Baptist','martyrdom-of-john-the-baptist',        'August 29',   'Beheaded by Herod Antipas at the request of Salome, prompted by her mother Herodias. He had condemned Herod''s adulterous marriage.', true),
  ('St. Gregory the Great',                'st-gregory-the-great',                 'September 3', 'Pope and Doctor of the Church. He reformed the liturgy (Gregorian chant bears his name), sent missionaries to England and wrote prolifically.', true),
  ('The Nativity of the Blessed Virgin Mary', 'nativity-of-mary',                 'September 8', 'The Blessed Virgin Mary is born to Sts. Joachim and Anne in fulfilment of God''s plan of salvation. Her birth is the dawn that precedes the rising of the Sun of Righteousness.', true),
  ('St. Peter Claver',                     'st-peter-claver',                      'September 9', 'Jesuit priest and patron of African slaves and Colombia. He met every slave ship that docked at Cartagena for 40 years, ministering to the enslaved.', true),
  ('St. John Chrysostom',                  'st-john-chrysostom',                   'September 13','Archbishop of Constantinople and Doctor of the Church. ''Golden-Mouthed.'' His homilies on Scripture are the most extensive patristic biblical commentaries.', true),
  ('The Exaltation of the Holy Cross',     'exaltation-of-the-holy-cross',         'September 14','This feast commemorates the finding of the True Cross by St. Helena in Jerusalem (326) and its later recovery from Persian captivity (628).', true),
  ('Our Lady of Sorrows',                  'our-lady-of-sorrows',                  'September 15','This feast meditates on the Seven Sorrows of Mary — from the prophecy of Simeon to standing at the foot of the Cross.', true),
  ('Ss. Cornelius and Cyprian',            'ss-cornelius-and-cyprian',             'September 16','Pope and Bishop of Carthage, both martyrs. They worked together to resolve the controversy over those who had lapsed during the Decian persecution.', true),
  ('St. Matthew',                          'st-matthew',                           'September 21','Apostle and Evangelist. A tax collector called by Jesus with the words ''Follow me.'' He wrote the first Gospel, placing Jesus as the fulfilment of all Messianic prophecy.', true),
  ('St. Pio of Pietrelcina (Padre Pio)',   'padre-pio',                            'September 23','Capuchin friar who bore the five wounds of Christ (stigmata) for 50 years with great suffering. He spent up to 15 hours a day in the confessional.', true),
  ('St. Vincent de Paul',                  'st-vincent-de-paul',                   'September 27','Founder of the Lazarists and co-founder of the Daughters of Charity. He organised the most comprehensive network of charitable works in 17th-century France. Patron of all works of charity.', true),
  ('Ss. Michael, Gabriel and Raphael',     'ss-michael-gabriel-raphael',           'September 29','The three archangels named in Scripture. Michael is the warrior-protector; Gabriel the herald of the Annunciation; Raphael the guide of Tobiah.', true),
  ('St. Jerome',                           'st-jerome',                            'September 30','Priest and Doctor of the Church. He translated the entire Bible into Latin — the Vulgate — which remained the standard Catholic Bible for 1,500 years. Patron of Bible scholars.', true),
  ('St. Thérèse of Lisieux',               'st-therese-of-lisieux',                'October 1',   'Carmelite nun and Doctor of the Church. The ''Little Flower'' who discovered the ''little way'' of spiritual childhood — trusting God with the simplicity of a child.', true),
  ('The Holy Guardian Angels',             'holy-guardian-angels',                 'October 2',   'The Church honours the angels appointed to guide and protect each person. Jesus himself said: ''Their angels in heaven always behold the face of my Father.''', true),
  ('St. Francis of Assisi',                'st-francis-of-assisi',                 'October 4',   'Founder of the Friars Minor. After a dramatic conversion, Francis embraced absolute poverty and became the most Christ-like figure of the Middle Ages. He received the stigmata on La Verna.', true),
  ('Our Lady of the Rosary',               'our-lady-of-the-rosary',               'October 7',   'Instituted by Pope Pius V to thank God for the victory at Lepanto (1571), won after a call for Rosary prayer throughout Europe. Mary appeared at Fatima and repeatedly requested the Rosary.', true),
  ('St. Teresa of Ávila',                  'st-teresa-of-avila',                   'October 15',  'Doctor of the Church and reformer of the Carmelites. Her autobiography and her Interior Castle are masterpieces of mystical theology. First woman declared Doctor of the Church (1970).', true),
  ('St. Ignatius of Antioch',              'st-ignatius-of-antioch',               'October 17',  'Bishop of Antioch and martyr. While being transported to Rome to be thrown to lions (c. 107), he wrote seven letters that are among the earliest documents of early Christianity.', true),
  ('St. Luke',                             'st-luke',                              'October 18',  'Evangelist and physician. He wrote the third Gospel and the Acts of the Apostles. His Gospel is especially rich in mercy, women and prayer. Patron of artists and doctors.', true),
  ('Ss. Isaac Jogues, John de Brébeuf and Companions', 'north-american-martyrs',   'October 19',  'Eight Jesuit missionaries martyred by the Iroquois and Huron peoples in Canada between 1642–1649. They brought the Gospel to North America at the cost of their lives.', true),
  ('St. John Paul II',                     'st-john-paul-ii',                      'October 22',  'Pope (1978–2005). Karol Wojtyła was the first non-Italian pope in 455 years. He survived an assassination attempt, helped end Communism in Europe and canonised more saints than any other pope.', true),
  ('Ss. Simon and Jude',                   'ss-simon-and-jude',                    'October 28',  'Two Apostles celebrated together. Simon was called ''the Zealot.'' Jude (Thaddaeus) wrote the Epistle of Jude. Patron Jude is invoked for impossible or desperate causes.', true),
  ('All Saints',                           'all-saints',                           'November 1',  'The Church celebrates all who have entered the Kingdom of Heaven — the canonised and the unknown. The Beatitudes are the portrait of every saint, great and small.', true),
  ('The Commemoration of All the Faithful Departed (All Souls)', 'all-souls',      'November 2',  'The Church prays for all who have died and are being purified in purgatory. Every priest may celebrate three Masses today. Our prayer, Mass, indulgences and almsgiving help the holy souls.', true),
  ('St. Martin de Porres',                 'st-martin-de-porres',                  'November 3',  'Dominican lay brother of Lima. Son of a Spanish nobleman and a freed African slave, he cared for the poor of all races and is patron of racial harmony, barbers and social workers.', true),
  ('St. Charles Borromeo',                 'st-charles-borromeo',                  'November 4',  'Cardinal Archbishop of Milan and key figure in the Counter-Reformation. He implemented the Council of Trent in his diocese and created the model Catholic seminary.', true),
  ('St. Leo the Great',                    'st-leo-the-great',                     'November 10', 'Pope and Doctor of the Church. He famously met Attila the Hun outside Rome and turned him back. His Tome defined the two natures of Christ.', true),
  ('St. Martin of Tours',                  'st-martin-of-tours',                   'November 11', 'Bishop of Tours and patron of France, soldiers and the poor. Before his baptism, the young Roman soldier cut his cloak in half to clothe a freezing beggar — who appeared to him that night as Christ.', true),
  ('St. Josaphat',                         'st-josaphat',                          'November 12', 'Archbishop of Polotsk and first Eastern Catholic to be formally canonised. He worked to reunite the Ruthenian Church with Rome and was murdered by a mob opposed to reunion.', true),
  ('St. Elizabeth of Hungary',             'st-elizabeth-of-hungary',              'November 17', 'Queen of Hungary who gave away her royal wealth to the poor and sick. After the death of her husband, she became a Franciscan tertiary and died at 24, exhausted by her works of charity.', true),
  ('The Presentation of the Blessed Virgin Mary', 'presentation-of-mary',          'November 21', 'An ancient feast from Jerusalem celebrating the tradition that Mary was brought to the Temple at age 3 to be consecrated to God.', true),
  ('St. Cecilia',                          'st-cecilia',                           'November 22', 'Virgin, martyr and patron of music and musicians. The Roman noblewoman who reportedly sang in her heart to God as she was martyred.', true),
  ('St. Andrew Dũng-Lạc and Companions',  'st-andrew-dung-lac',                   'November 24', '117 Vietnamese martyrs from the 17th–19th centuries. Foreign missionaries and Vietnamese clergy and laity who died for their faith.', true),
  ('St. Andrew',                           'st-andrew',                            'November 30', 'Apostle and brother of Peter. The first man called by Jesus. Andrew brought his brother Peter to Jesus with the words: ''We have found the Messiah.'' Patron of Scotland, Russia and Greece.', true),
  ('St. Francis Xavier',                   'st-francis-xavier',                    'December 3',  'Jesuit missionary and co-founder of the Society of Jesus. He baptised over 30,000 people in India, Japan and Malaysia. Patron of foreign missions.', true),
  ('St. Nicholas',                         'st-nicholas',                          'December 6',  'Bishop of Myra and patron of children, sailors and Russia. The historical figure behind Santa Claus. Famous for secretly providing dowries for three poor girls.', true),
  ('St. Ambrose',                          'st-ambrose',                           'December 7',  'Bishop of Milan and Doctor of the Church. Elected bishop by popular acclamation while still a catechumen. He baptised St. Augustine and developed the Latin liturgical hymn.', true),
  ('The Immaculate Conception of the Blessed Virgin Mary', 'immaculate-conception', 'December 8', 'The dogma proclaimed by Pius IX (1854): Mary was conceived without the stain of original sin, preserved by the merits of her Son. She revealed this title to Bernadette at Lourdes four years later.', true),
  ('St. Juan Diego',                       'st-juan-diego',                        'December 9',  'An Aztec convert to whom Our Lady of Guadalupe appeared four times on the hill of Tepeyac in 1531. Her image was miraculously imprinted on his tilma (cloak).', true),
  ('Our Lady of Guadalupe',                'our-lady-of-guadalupe',                'December 12', 'The Virgin Mary appeared to St. Juan Diego at Tepeyac (modern Mexico City) in 1531, leaving her miraculous image on his tilma.', true),
  ('St. Lucy',                             'st-lucy',                              'December 13', 'Virgin and martyr from Syracuse, Sicily. She dedicated her virginity to God and gave away her dowry to the poor. Her name means ''light.'' Patron of the blind.', true),
  ('St. John of the Cross',                'st-john-of-the-cross',                 'December 14', 'Carmelite friar and Doctor of the Church. His Dark Night of the Soul and Ascent of Mount Carmel are classics of mystical theology.', true),
  ('The Nativity of the Lord (Christmas)', 'christmas',                            'December 25', 'The Word was made flesh and dwelt among us. God entered human history as a helpless infant born of the Virgin Mary in Bethlehem. The mystery of the Incarnation — God with us — is the heart of the Christian faith.', true),
  ('St. Stephen',                          'st-stephen',                           'December 26', 'First martyr (protomartyr) of the Church. A deacon who preached the Gospel with power and was stoned to death outside Jerusalem.', true),
  ('St. John the Apostle and Evangelist',  'st-john-apostle',                      'December 27', 'The Beloved Disciple. Author of the fourth Gospel, three epistles and the Book of Revelation. The only Apostle not martyred by violence, he lived to old age in Ephesus.', true),
  ('The Holy Innocents',                   'holy-innocents',                       'December 28', 'The children of Bethlehem, two years old and under, massacred by Herod the Great in his attempt to kill the infant Jesus. They are the first martyrs of the New Covenant.', true),
  ('St. Thomas Becket',                    'st-thomas-becket',                     'December 29', 'Archbishop of Canterbury martyred in his own cathedral by knights of King Henry II for defending the rights of the Church against royal encroachment.', true),
  ('St. Sylvester I',                      'st-sylvester-i',                       'December 31', 'Pope during the reign of the Emperor Constantine. He presided over the First Council of Nicaea (325) and received the donation of the Lateran Palace.', true)
ON CONFLICT (slug) DO NOTHING;


COMMIT;
