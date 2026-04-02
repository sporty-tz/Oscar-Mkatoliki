-- ============================================================
-- OSCAR MKATOLIKI — Full Database Migration
-- Run in: Supabase Dashboard → SQL Editor
-- NOTE: user_profiles table already exists — NOT recreated here
-- ============================================================

BEGIN;

-- ─────────────────────────────────────────────────────────────
-- HELPER: auto-update updated_at timestamp
-- ─────────────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- ============================================================
-- 1. SETTINGS
-- ============================================================

CREATE TABLE currencies (
  code        TEXT PRIMARY KEY,           -- 'TZS', 'USD'
  name        TEXT NOT NULL,
  symbol      TEXT NOT NULL,
  is_default  BOOLEAN DEFAULT false,
  is_active   BOOLEAN DEFAULT true
);

CREATE TABLE languages (
  code        TEXT PRIMARY KEY,           -- 'en', 'sw'
  name        TEXT NOT NULL,
  is_default  BOOLEAN DEFAULT false,
  is_active   BOOLEAN DEFAULT true
);

CREATE TABLE site_settings (
  key         TEXT PRIMARY KEY,
  value       TEXT,
  description TEXT
);


-- ============================================================
-- 2. PRODUCT CATALOG
-- ============================================================

CREATE TABLE categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  description TEXT,
  image_url   TEXT,
  icon_class  TEXT,
  parent_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_active   BOOLEAN DEFAULT true,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE brands (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  image_url   TEXT,
  is_active   BOOLEAN DEFAULT true,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE products (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT NOT NULL,
  slug          TEXT UNIQUE NOT NULL,
  description   TEXT,
  short_desc    TEXT,
  sku           TEXT UNIQUE,
  category_id   UUID REFERENCES categories(id) ON DELETE SET NULL,
  brand_id      UUID REFERENCES brands(id) ON DELETE SET NULL,
  currency      TEXT NOT NULL DEFAULT 'TZS' REFERENCES currencies(code),
  base_price    NUMERIC(12,2) NOT NULL,
  sale_price    NUMERIC(12,2),
  is_featured   BOOLEAN DEFAULT false,
  is_active     BOOLEAN DEFAULT true,
  tags          TEXT[],
  weight_grams  INT,
  created_at    TIMESTAMPTZ DEFAULT NOW(),
  updated_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE product_media (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  url         TEXT NOT NULL,
  alt_text    TEXT,
  is_primary  BOOLEAN DEFAULT false,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE product_pricing (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  currency    TEXT NOT NULL REFERENCES currencies(code),
  price       NUMERIC(12,2) NOT NULL,
  sale_price  NUMERIC(12,2),
  is_active   BOOLEAN DEFAULT true,
  UNIQUE(product_id, currency)
);

CREATE TABLE product_inventory (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id      UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE UNIQUE,
  quantity        INT NOT NULL DEFAULT 0,
  reserved        INT NOT NULL DEFAULT 0,   -- held by pending orders
  low_stock_alert INT DEFAULT 5,
  is_unlimited    BOOLEAN DEFAULT false,
  updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_inventory_updated_at
  BEFORE UPDATE ON product_inventory
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- ============================================================
-- 3. COMMERCE CONFIG
-- ============================================================

CREATE TABLE shipping_methods (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  description TEXT,
  price       NUMERIC(12,2) NOT NULL DEFAULT 0,
  currency    TEXT NOT NULL DEFAULT 'TZS' REFERENCES currencies(code),
  eta_days    TEXT,                         -- '2-3 days'
  is_active   BOOLEAN DEFAULT true,
  sort_order  INT DEFAULT 0
);

CREATE TABLE fee_config (
  key         TEXT PRIMARY KEY,             -- 'service_fee_pct', 'min_order_amount'
  value       NUMERIC(10,4) NOT NULL,
  description TEXT
);

CREATE TABLE coupons (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code            TEXT UNIQUE NOT NULL,
  description     TEXT,
  discount_type   TEXT NOT NULL CHECK (discount_type IN ('percent', 'fixed')),
  discount_value  NUMERIC(10,2) NOT NULL,
  min_order       NUMERIC(12,2) DEFAULT 0,
  max_uses        INT,
  used_count      INT DEFAULT 0,
  expires_at      TIMESTAMPTZ,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE offer_banners (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  subtitle    TEXT,
  image_url   TEXT,
  link        TEXT,
  bg_color    TEXT,
  is_active   BOOLEAN DEFAULT true,
  sort_order  INT DEFAULT 0,
  starts_at   TIMESTAMPTZ,
  ends_at     TIMESTAMPTZ,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 4. USER DATA
-- ============================================================

CREATE TABLE user_contacts (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label       TEXT NOT NULL,               -- 'Home', 'Work'
  phone       TEXT NOT NULL,
  is_primary  BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_addresses (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  label           TEXT NOT NULL,           -- 'Home', 'Office'
  address_line_1  TEXT NOT NULL,
  address_line_2  TEXT,
  city            TEXT NOT NULL,
  region          TEXT,
  postal_code     TEXT,
  is_default      BOOLEAN DEFAULT false,
  lat             NUMERIC(10,7),
  lng             NUMERIC(10,7),
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_payment_methods (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id       UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider      TEXT NOT NULL,             -- 'mpesa', 'tigopesa', 'visa'
  method_type   TEXT NOT NULL,             -- 'mobile_money', 'card'
  account_name  TEXT,
  account_ref   TEXT,                      -- phone or masked card number
  last4         TEXT,
  is_default    BOOLEAN DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cart_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity    INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  added_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE TABLE wishlist_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  added_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);


-- ============================================================
-- 5. ORDERS & PAYMENTS
-- ============================================================

CREATE TABLE orders (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number          TEXT UNIQUE NOT NULL,
  user_id               UUID REFERENCES auth.users(id),
  status                TEXT NOT NULL DEFAULT 'pending'
                          CHECK (status IN ('pending','confirmed','processing','shipped','delivered','cancelled')),
  payment_status        TEXT NOT NULL DEFAULT 'unpaid'
                          CHECK (payment_status IN ('unpaid','paid','refunded','failed')),
  shipping_address_id   UUID REFERENCES user_addresses(id),
  shipping_method_id    UUID REFERENCES shipping_methods(id),
  coupon_id             UUID REFERENCES coupons(id),
  subtotal              NUMERIC(12,2) NOT NULL,
  delivery_fee          NUMERIC(12,2) NOT NULL DEFAULT 0,
  discount_amount       NUMERIC(12,2) NOT NULL DEFAULT 0,
  total_amount          NUMERIC(12,2) NOT NULL,
  currency              TEXT NOT NULL DEFAULT 'TZS',
  notes                 TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE order_items (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id       UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id     UUID REFERENCES products(id) ON DELETE SET NULL,
  product_name   TEXT NOT NULL,            -- snapshot at order time
  product_image  TEXT,
  quantity       INT NOT NULL,
  unit_price     NUMERIC(12,2) NOT NULL,
  subtotal       NUMERIC(12,2) NOT NULL
);

CREATE TABLE payments (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id       UUID NOT NULL REFERENCES orders(id),
  provider       TEXT NOT NULL,            -- 'mpesa', 'tigopesa', 'card'
  provider_ref   TEXT,                     -- external transaction ID
  amount         NUMERIC(12,2) NOT NULL,
  currency       TEXT NOT NULL DEFAULT 'TZS',
  status         TEXT NOT NULL DEFAULT 'pending'
                   CHECK (status IN ('pending','completed','failed','refunded')),
  failure_reason TEXT,
  initiated_at   TIMESTAMPTZ DEFAULT NOW(),
  completed_at   TIMESTAMPTZ
);

CREATE TABLE wallet_transactions (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           UUID NOT NULL REFERENCES auth.users(id),
  transaction_type  TEXT NOT NULL CHECK (transaction_type IN ('credit', 'debit')),
  amount            NUMERIC(12,2) NOT NULL,
  currency          TEXT NOT NULL DEFAULT 'TZS',
  description       TEXT,
  reference         TEXT,
  status            TEXT NOT NULL DEFAULT 'completed',
  created_at        TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 6. CMS / CONTENT
-- ============================================================

CREATE TABLE faqs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  category    TEXT,                        -- 'orders', 'shipping', 'account'
  sort_order  INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE static_pages (
  slug        TEXT PRIMARY KEY,            -- 'privacy-policy', 'terms-of-service'
  title       TEXT NOT NULL,
  body        TEXT,
  sections    JSONB,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE homepage_sections (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_key  TEXT UNIQUE NOT NULL,       -- 'hero_slides', 'promo_banners'
  data         JSONB NOT NULL,
  is_active    BOOLEAN DEFAULT true,
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE team_members (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  role        TEXT,
  bio         TEXT,
  image_url   TEXT,
  sort_order  INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true
);

CREATE TABLE testimonials (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  role        TEXT,
  message     TEXT NOT NULL,
  avatar_url  TEXT,
  rating      INT CHECK (rating BETWEEN 1 AND 5),
  is_active   BOOLEAN DEFAULT true,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE menu_items (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  menu_key    TEXT NOT NULL,               -- 'main_nav', 'footer_nav'
  label       TEXT NOT NULL,
  path        TEXT NOT NULL,
  icon        TEXT,
  parent_id   UUID REFERENCES menu_items(id) ON DELETE SET NULL,
  sort_order  INT DEFAULT 0,
  is_active   BOOLEAN DEFAULT true
);

CREATE TABLE footer_links (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  group_label  TEXT NOT NULL,              -- 'Company', 'Help', 'Legal'
  label        TEXT NOT NULL,
  path         TEXT NOT NULL,
  sort_order   INT DEFAULT 0,
  is_active    BOOLEAN DEFAULT true
);


-- ============================================================
-- 7. BLOG
-- ============================================================

CREATE TABLE blog_authors (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  bio         TEXT,
  avatar_url  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE blog_categories (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  color       TEXT
);

CREATE TABLE blog_posts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title            TEXT NOT NULL,
  slug             TEXT UNIQUE NOT NULL,
  excerpt          TEXT,
  body             TEXT,
  cover_image_url  TEXT,
  author_id        UUID REFERENCES blog_authors(id) ON DELETE SET NULL,
  category_id      UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  tags             TEXT[],
  is_published     BOOLEAN DEFAULT false,
  published_at     TIMESTAMPTZ,
  read_time_mins   INT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  updated_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TRIGGER trg_blog_posts_updated_at
  BEFORE UPDATE ON blog_posts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TABLE blog_comments (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id      UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  user_id      UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name  TEXT,
  body         TEXT NOT NULL,
  is_approved  BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 8. CATHOLIC-SPECIFIC
-- ============================================================

CREATE TABLE saints (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  feast_day   TEXT,                        -- 'January 24'
  feast_date  DATE,
  birth_year  INT,
  death_year  INT,
  biography   TEXT,
  short_bio   TEXT,
  image_url   TEXT,
  patronage   TEXT[],
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE prayers (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title       TEXT NOT NULL,
  slug        TEXT UNIQUE NOT NULL,
  category    TEXT,                        -- 'rosary', 'morning', 'saints'
  language    TEXT DEFAULT 'en',
  body_text   TEXT NOT NULL,
  audio_url   TEXT,
  is_active   BOOLEAN DEFAULT true,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE novenas (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title           TEXT NOT NULL,
  slug            TEXT UNIQUE NOT NULL,
  description     TEXT,
  days_count      INT NOT NULL DEFAULT 9,
  daily_prayers   JSONB,                   -- [{day: 1, title: '...', prayer_text: '...'}]
  image_url       TEXT,
  is_active       BOOLEAN DEFAULT true,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE parishes (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  region      TEXT,
  area        TEXT,
  address     TEXT,
  phone       TEXT,
  email       TEXT,
  mass_times  TEXT,
  type        TEXT,                        -- 'Cathedral', 'Parish', 'Chapel'
  lat         NUMERIC(10,7),
  lng         NUMERIC(10,7),
  image_url   TEXT,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE daily_reflections (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date          DATE UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  body          TEXT,
  scripture_ref TEXT,                      -- 'John 3:16'
  author        TEXT,
  image_url     TEXT,
  is_published  BOOLEAN DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 9. COMMUNITY & ENGAGEMENT
-- ============================================================

CREATE TABLE reviews (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  product_id  UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  order_id    UUID REFERENCES orders(id) ON DELETE SET NULL,
  rating      INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title       TEXT,
  body        TEXT,
  is_approved BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE TABLE donations (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  donor_name      TEXT,
  donor_email     TEXT,
  amount          NUMERIC(12,2) NOT NULL,
  currency        TEXT NOT NULL DEFAULT 'TZS',
  cause           TEXT,
  payment_method  TEXT,
  provider_ref    TEXT,
  status          TEXT NOT NULL DEFAULT 'pending'
                    CHECK (status IN ('pending','completed','failed')),
  message         TEXT,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE newsletter_subscribers (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email            TEXT UNIQUE NOT NULL,
  name             TEXT,
  is_active        BOOLEAN DEFAULT true,
  subscribed_at    TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at  TIMESTAMPTZ
);

CREATE TABLE contact_requests (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT,
  subject      TEXT,
  message      TEXT NOT NULL,
  is_resolved  BOOLEAN DEFAULT false,
  created_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE gift_card_orders (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_user_id    UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  buyer_email      TEXT NOT NULL,
  recipient_name   TEXT NOT NULL,
  recipient_email  TEXT NOT NULL,
  message          TEXT,
  amount           NUMERIC(12,2) NOT NULL,
  currency         TEXT NOT NULL DEFAULT 'TZS',
  code             TEXT UNIQUE NOT NULL,
  balance          NUMERIC(12,2),
  status           TEXT NOT NULL DEFAULT 'pending'
                     CHECK (status IN ('pending','paid','delivered','redeemed','expired')),
  expires_at       TIMESTAMPTZ,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE bible_bookmarks (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  book_slug   TEXT NOT NULL,
  chapter     INT NOT NULL,
  verse_start INT,
  verse_end   INT,
  note        TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE prayer_intentions (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id          UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  intention_text   TEXT NOT NULL,
  is_public        BOOLEAN DEFAULT false,
  created_at       TIMESTAMPTZ DEFAULT NOW()
);


-- ============================================================
-- 10. INDEXES
-- ============================================================

CREATE INDEX idx_products_category    ON products(category_id);
CREATE INDEX idx_products_brand       ON products(brand_id);
CREATE INDEX idx_products_slug        ON products(slug);
CREATE INDEX idx_products_featured    ON products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_product_media_prod   ON product_media(product_id);
CREATE INDEX idx_cart_user            ON cart_items(user_id);
CREATE INDEX idx_wishlist_user        ON wishlist_items(user_id);
CREATE INDEX idx_orders_user          ON orders(user_id);
CREATE INDEX idx_orders_status        ON orders(status);
CREATE INDEX idx_order_items_order    ON order_items(order_id);
CREATE INDEX idx_payments_order       ON payments(order_id);
CREATE INDEX idx_wallet_user          ON wallet_transactions(user_id);
CREATE INDEX idx_reviews_product      ON reviews(product_id);
CREATE INDEX idx_blog_posts_slug      ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(is_published, published_at);
CREATE INDEX idx_saints_feast_date    ON saints(feast_date);
CREATE INDEX idx_parishes_region      ON parishes(region);
CREATE INDEX idx_reflections_date     ON daily_reflections(date);


-- ============================================================
-- 11. ROW LEVEL SECURITY (RLS)
-- ============================================================

-- Enable RLS on all user-owned tables
ALTER TABLE user_contacts         ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_addresses        ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_payment_methods  ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items            ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items        ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders                ENABLE ROW LEVEL SECURITY;
ALTER TABLE wallet_transactions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE bible_bookmarks       ENABLE ROW LEVEL SECURITY;
ALTER TABLE prayer_intentions     ENABLE ROW LEVEL SECURITY;

-- Users can only see/modify their own rows
CREATE POLICY "own_contacts"         ON user_contacts         USING (auth.uid() = user_id);
CREATE POLICY "own_addresses"        ON user_addresses        USING (auth.uid() = user_id);
CREATE POLICY "own_payment_methods"  ON user_payment_methods  USING (auth.uid() = user_id);
CREATE POLICY "own_cart"             ON cart_items            USING (auth.uid() = user_id);
CREATE POLICY "own_wishlist"         ON wishlist_items        USING (auth.uid() = user_id);
CREATE POLICY "own_orders"           ON orders                USING (auth.uid() = user_id);
CREATE POLICY "own_wallet"           ON wallet_transactions   USING (auth.uid() = user_id);
CREATE POLICY "own_bookmarks"        ON bible_bookmarks       USING (auth.uid() = user_id);
CREATE POLICY "own_intentions"       ON prayer_intentions     USING (auth.uid() = user_id OR is_public = true);

COMMIT;
