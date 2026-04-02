import { useEffect, useState } from "react";
import { supabase } from "./supabase";
import { type Product, GRADIENT_MAP } from "./products";

// ─── Ticker ───────────────────────────────────────────────────────────────────
export function useTickerText(fallback = "") {
  const [text, setText] = useState<string>(fallback);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("value")
      .eq("key", "ticker_text")
      .single()
      .then(({ data }) => {
        if (data?.value) setText(data.value);
      });
  }, []);

  return text;
}

// ─── Homepage Sections (hero_slides / promo_banners) ──────────────────────────
export function useHomepageSection<T>(sectionKey: string): T[] {
  const [items, setItems] = useState<T[]>([]);

  useEffect(() => {
    supabase
      .from("homepage_sections")
      .select("data")
      .eq("section_key", sectionKey)
      .eq("is_active", true)
      .single()
      .then(({ data }) => {
        if (Array.isArray(data?.data)) setItems(data.data as T[]);
      });
  }, [sectionKey]);

  return items;
}

// ─── Categories ───────────────────────────────────────────────────────────────
export interface DbCategory {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  sort_order: number;
}

export function useCategories() {
  const [categories, setCategories] = useState<DbCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("categories")
      .select("id,name,slug,image_url,sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .then(({ data }) => {
        if (data) setCategories(data as DbCategory[]);
        setLoading(false);
      });
  }, []);

  return { categories, loading };
}

// ─── Featured Products ────────────────────────────────────────────────────────
export function useFeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("products")
      .select(
        `id, name, slug, description, short_desc, base_price, sale_price, tags,
         categories!inner(name),
         product_media(url, is_primary)`,
      )
      .eq("is_featured", true)
      .eq("is_active", true)
      .then(({ data, error }) => {
        if (error) {
          console.error("useFeaturedProducts", error);
          setLoading(false);
          return;
        }
        if (!data) {
          setLoading(false);
          return;
        }

        type ProductRow = {
          id: string; name: string; slug: string; short_desc: string | null;
          base_price: number; sale_price: number | null; tags: string[] | null;
          description: string | null;
          product_media: Array<{ url: string; is_primary: boolean }>;
          categories: { name: string } | null;
        };
        const mapped: Product[] = (data as unknown as ProductRow[]).map((row) => {
          const primaryMedia = row.product_media.find((m) => m.is_primary);
          const image = primaryMedia?.url ?? "";
          const price = row.sale_price ?? row.base_price;
          const originalPrice = row.sale_price ? row.base_price : undefined;
          const badge = row.tags?.[0] ?? undefined;
          const gradient = GRADIENT_MAP[row.slug] ??
            "linear-gradient(135deg, #667eea 0%, #764ba2 100%)";
          const categoryName = row.categories?.name ?? "";

          return {
            id: row.id,
            name: row.name,
            category: categoryName,
            weight: row.short_desc ?? undefined,
            price,
            originalPrice,
            badge,
            gradient,
            image,
            description: row.description ?? undefined,
          };
        });

        setProducts(mapped);
        setLoading(false);
      });
  }, []);

  return { products, loading };
}

// ─── Blog Posts ───────────────────────────────────────────────────────────────
export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  published_at: string | null;
  read_time_mins: number | null;
  blog_authors: { name: string } | null;
  blog_categories: { name: string; color: string | null; slug: string } | null;
}

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("blog_posts")
      .select(
        `id, title, slug, excerpt, published_at, read_time_mins,
         blog_authors(name),
         blog_categories(name, color, slug)`,
      )
      .eq("is_published", true)
      .order("published_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) {
          console.error("useBlogPosts", error);
          setLoading(false);
          return;
        }
        if (data) setPosts(data as unknown as BlogPost[]);
        setLoading(false);
      });
  }, []);

  return { posts, loading };
}

// ─── Parishes ─────────────────────────────────────────────────────────────────
export interface Parish {
  id: string;
  name: string;
  region: string | null;
  area: string | null;
  phone: string | null;
  mass_times: string | null;
  type: string | null;
}

export function useParishes() {
  const [parishes, setParishes] = useState<Parish[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("parishes")
      .select("id,name,region,area,phone,mass_times,type")
      .eq("is_active", true)
      .order("region", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("useParishes", error);
          setLoading(false);
          return;
        }
        if (data) setParishes(data as Parish[]);
        setLoading(false);
      });
  }, []);

  return { parishes, loading };
}

// ─── FAQs ─────────────────────────────────────────────────────────────────────
interface RawFaq {
  id: string;
  question: string;
  answer: string;
  category: string | null;
  sort_order: number;
}

export interface FaqGroup {
  category: string;
  icon: string;
  items: RawFaq[];
}

const FAQ_ICON_MAP: Record<string, string> = {
  "Orders & Payment": "🛒",
  "Shipping & Delivery": "🚚",
  "Returns & Refunds": "↩️",
  "Products & Faith Resources": "📿",
  "Account & Privacy": "👤",
};

export function useFaqs() {
  const [groups, setGroups] = useState<FaqGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("faqs")
      .select("id,question,answer,category,sort_order")
      .eq("is_active", true)
      .order("sort_order", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("useFaqs", error);
          setLoading(false);
          return;
        }
        if (!data) {
          setLoading(false);
          return;
        }
        const faqRows = data as RawFaq[];
        const groupMap = new Map<string, RawFaq[]>();
        for (const faq of faqRows) {
          const cat = faq.category ?? "General";
          if (!groupMap.has(cat)) groupMap.set(cat, []);
          groupMap.get(cat)!.push(faq);
        }
        const grouped: FaqGroup[] = Array.from(groupMap.entries()).map(
          ([cat, items]) => ({
            category: cat,
            icon: FAQ_ICON_MAP[cat] ?? "❓",
            items,
          }),
        );
        setGroups(grouped);
        setLoading(false);
      });
  }, []);

  return { groups, loading };
}

// ─── Donation Config ──────────────────────────────────────────────────────────
export interface DonationTier {
  amount: number;
  label: string;
  desc: string;
  icon: string;
}

export interface DonationCause {
  icon: string;
  title: string;
  desc: string;
}

export function useDonationConfig() {
  const [tiers, setTiers] = useState<DonationTier[]>([]);
  const [causes, setCauses] = useState<DonationCause[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("site_settings")
      .select("key,value")
      .in("key", ["donation_tiers", "donation_causes"])
      .then(({ data, error }) => {
        if (error) {
          console.error("useDonationConfig", error);
          setLoading(false);
          return;
        }
        if (!data) {
          setLoading(false);
          return;
        }
        for (const row of data) {
          try {
            const parsed = JSON.parse(row.value ?? "[]");
            if (row.key === "donation_tiers") setTiers(parsed as DonationTier[]);
            if (row.key === "donation_causes") setCauses(parsed as DonationCause[]);
          } catch {
            console.error("useDonationConfig parse error", row.key);
          }
        }
        setLoading(false);
      });
  }, []);

  return { tiers, causes, loading };
}
