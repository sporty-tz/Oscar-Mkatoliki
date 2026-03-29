export interface Product {
  id: number;
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

export const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Rosary of the Sacred Heart",
    category: "Rosaries",
    weight: "Silver plated · 59 beads",
    price: 15000,
    originalPrice: 22000,
    badge: "BESTSELLER",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    image: "/Products/Prod-1.png",
    description:
      "A beautifully crafted silver-plated rosary dedicated to the devotion of the Sacred Heart of Jesus. Each of the 59 beads is carefully shaped and strung on a durable chain, with a detailed crucifix pendant. Perfect for daily prayer, as a first communion gift, or a cherished keepsake for any devout Catholic.",
  },
  {
    id: 2,
    name: "Oscar Mkatoliki — Praise Vol. 1",
    category: "Music",
    weight: "Digital + Physical · 12 tracks",
    price: 18000,
    badge: "NEW",
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    image: "/Products/Prod-2.png",
    description:
      "The debut worship album from Tanzania's most beloved Catholic music minister, Oscar Mkatoliki. Featuring 12 original Swahili and English praise tracks, this album blends contemporary Gospel with deep Catholic spirituality. Includes a physical CD plus a digital download code. A must-have for every Catholic household.",
  },
  {
    id: 3,
    name: "Catholic Study Bible",
    category: "Books",
    weight: "Catholic Edition · 1,600 pages",
    price: 45000,
    originalPrice: 60000,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    image: "/Products/Prod-3.png",
    description:
      "The definitive Catholic Study Bible for serious believers and seekers alike. This edition features the complete Deuterocanonical books, detailed commentary from leading Catholic theologians, concordance, maps of the Holy Land, and a the Catechism index. Leather-bound cover with gilt-edged pages. Ideal for personal study, RCIA, and small group ministry.",
  },
  {
    id: 4,
    name: "Holy Family Statue",
    category: "Statues",
    weight: "Hand-carved resin · 18 cm",
    price: 35000,
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    image: "/Products/Prod-4.png",
    description:
      "A stunning hand-finished resin statue of the Holy Family — Jesus, Mary, and Joseph — standing 18 cm tall. Painted in soft, natural tones with gold-leaf accents, this piece radiates warmth and serenity. A timeless addition to your home altar, living room, or as a thoughtful wedding or baptism gift.",
  },
  {
    id: 5,
    name: "Church Pillar Candle Set ×6",
    category: "Candles",
    weight: "Set of 6 · 22 cm each",
    price: 12000,
    originalPrice: 18000,
    badge: "SALE",
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    image: "/Products/Prod-5.png",
    description:
      "Premium ivory pillar candles hand-dipped in pure paraffin wax with a long 8-hour burn time each. The set of six measures 22 cm tall and 5 cm in diameter, making them ideal for altar displays, candlelight vigils, church sanctuaries, and home chapels. Lead-free cotton wick. Sold as a set of six.",
  },
  {
    id: 6,
    name: "Children's Bible Stories",
    category: "Books",
    weight: "Illustrated · Ages 4–10",
    price: 20000,
    badge: "NEW",
    gradient: "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
    image: "/Products/Prod-6.png",
    description:
      "Bring the wonders of Scripture to life for your little ones. This beautifully illustrated collection retells 50 classic Bible stories from both the Old and New Testaments in simple, engaging language for children ages 4–10. Full-colour artwork on every spread, thick board-style pages, and a durable hardcover. A perfect bedtime read and a lasting faith foundation.",
  },
  {
    id: 7,
    name: "Blessed Cross Necklace",
    category: "Jewelry",
    weight: "Stainless steel · 60 cm chain",
    price: 28000,
    gradient: "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
    image: "/Products/Prod-7.png",
    description:
      "A sleek, modern cross pendant on a sturdy 60 cm stainless-steel chain. Hypoallergenic and tarnish-resistant, this necklace is suitable for everyday wear. The pendant is 3 cm tall and features a polished front with a brushed reverse. Comes in a gift box, making it an ideal confirmation, baptism, or birthday present.",
  },
  {
    id: 8,
    name: "Devotional Prayer Journal",
    category: "Books",
    weight: "A5 size · 200 pages",
    price: 14000,
    originalPrice: 20000,
    gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)",
    image: "/Products/prod-8.png",
    description:
      "Deepen your prayer life with this exquisitely designed A5 devotional journal. Each of its 200 cream-coloured pages features a short Scripture verse at the top, followed by ample space for reflection, gratitude lists, and prayer intentions. The soft-touch cover is embossed with a gold cross motif. A meaningful companion for your daily quiet time.",
  },
];
