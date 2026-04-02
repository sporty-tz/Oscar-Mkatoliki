-- ============================================================
-- OSCAR MKATOLIKI — Migrate images to Supabase Storage URLs
-- Run in Supabase SQL Editor to update already-seeded rows
-- Bucket: Web_images (PUBLIC)
-- ============================================================

BEGIN;

    -- ============================================================
    -- 1. CATEGORIES — update image_url to Supabase Storage
    -- ============================================================
    UPDATE categories SET image_url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Categories/Music-1.png'        WHERE slug = 'music-audio';
    UPDATE categories SET image_url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Categories/Books-1.png'        WHERE slug = 'books-bibles';
    UPDATE categories SET image_url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Categories/Rosary-1.png'       WHERE slug = 'rosaries';
    UPDATE categories SET image_url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Categories/Statue-1.png'       WHERE slug = 'statues';
    UPDATE categories SET image_url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Categories/Candle-1.png'       WHERE slug = 'candles';
    UPDATE categories SET image_url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Categories/Apparel-1.png'      WHERE slug = 'apparel';
    UPDATE categories SET image_url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Categories/Gifts-1.png'        WHERE slug = 'gifts';
    UPDATE categories SET image_url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Categories/Children-1.png'     WHERE slug = 'childrens';
    UPDATE categories SET image_url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Categories/Jewerly-1.png'      WHERE slug = 'jewelry';
    UPDATE categories SET image_url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Categories/Sacramentals-1.png' WHERE slug = 'sacramentals';


    -- ============================================================
    -- 2. PRODUCT MEDIA — update url to Supabase Storage
    -- ============================================================
    UPDATE product_media SET url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Products/Prod-1.png'
  WHERE product_id = 'e0000001-0000-0000-0000-000000000001' AND is_primary = true;

    UPDATE product_media SET url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Products/Prod-2.png'
  WHERE product_id = 'e0000001-0000-0000-0000-000000000002' AND is_primary = true;

    UPDATE product_media SET url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Products/Prod-3.png'
  WHERE product_id = 'e0000001-0000-0000-0000-000000000003' AND is_primary = true;

    UPDATE product_media SET url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Products/Prod-4.png'
  WHERE product_id = 'e0000001-0000-0000-0000-000000000004' AND is_primary = true;

    UPDATE product_media SET url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Products/Prod-5.png'
  WHERE product_id = 'e0000001-0000-0000-0000-000000000005' AND is_primary = true;

    UPDATE product_media SET url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Products/Prod-6.png'
  WHERE product_id = 'e0000001-0000-0000-0000-000000000006' AND is_primary = true;

    UPDATE product_media SET url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Products/Prod-7.png'
  WHERE product_id = 'e0000001-0000-0000-0000-000000000007' AND is_primary = true;

    UPDATE product_media SET url = 'https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Products/prod-8.png'
  WHERE product_id = 'e0000001-0000-0000-0000-000000000008' AND is_primary = true;


    -- ============================================================
    -- 3. HOMEPAGE SECTIONS — update hero_slides images in JSONB
    -- ============================================================
    UPDATE homepage_sections
SET data = jsonb_set(
  jsonb_set(
    jsonb_set(
      data,
      '{0,image}',
      '"https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/slider/Pope-leo-xiv.png"'
    ),
    '{1,image}',
    '"https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/slider/Hail-Mary.png"'
  ),
  '{2,image}',
  '"https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/slider/Christ-the-king.png"'
)
WHERE section_key = 'hero_slides';

    COMMIT;
