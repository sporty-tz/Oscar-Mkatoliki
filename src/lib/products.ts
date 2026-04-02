export interface Product {
  id: string;
  name: string;
  category: string;
  weight?: string;
  price: number;
  originalPrice?: number;
  badge?: string;
  gradient: string;
  image: string;
  description?: string;
}

/** Per-product gradient keyed by slug — presentational only, not stored in DB */
export const GRADIENT_MAP: Record<string, string> = {
  "rosary-of-the-sacred-heart":
    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "oscar-mkatoliki-praise-vol-1":
    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "catholic-study-bible": "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "holy-family-statue": "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "church-pillar-candle-set-6":
    "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "childrens-bible-stories":
    "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "blessed-cross-necklace": "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
  "devotional-prayer-journal":
    "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
};
