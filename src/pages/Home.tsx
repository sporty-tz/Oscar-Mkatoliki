import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { type Product, FEATURED_PRODUCTS } from "../lib/products";
import AppLayout from "../components/layout/AppLayout";
import { useCart } from "../context/CartContext";

// ─── Data ─────────────────────────────────────────────────────────────────────
const SLIDES = [
  {
    id: 1,
    image: "/Slider/Pope-leo-xiv.png",
    subheading: "Words of the Holy Father",
    heading: "Walk in Hope",
    quote:
      "\u201cWe are pilgrims on a journey of faith. Let us walk together in hope, in charity, and in the joy of the Gospel, building a world of fraternity and peace.\u201d",
    attribution: "\u2014 Pope Leo XIV",
    cta: "Explore Faith Resources",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 60%, #0f3460 100%)",
    accent: "#D4AF37",
  },
  {
    id: 2,
    image: "/Slider/Hail-Mary.png",
    subheading: "Ave Maria",
    heading: "Full of Grace",
    quote:
      "\u201cHail Mary, full of grace, the Lord is with thee. Blessed art thou among women, and blessed is the fruit of thy womb, Jesus.\u201d",
    attribution: "\u2014 Luke 1:28, The Angel Gabriel",
    cta: "Shop Rosaries & Devotionals",
    bg: "linear-gradient(135deg, #1e0a3c 0%, #3b1260 60%, #5c1f8a 100%)",
    accent: "#e8c8ff",
  },
  {
    id: 3,
    image: "/Slider/Christ-the-king.png",
    subheading: "Christ the King",
    heading: "The Way & the Life",
    quote:
      "\u201cI am the way, and the truth, and the life. No one comes to the Father except through me. Let your hearts not be troubled.\u201d",
    attribution: "\u2014 Jesus Christ, John 14:6",
    cta: "Shop Sacred Items",
    bg: "linear-gradient(135deg, #1b3a2d 0%, #2d5a3d 60%, #1a4d33 100%)",
    accent: "#C9A84C",
  },
];

const CATEGORIES = [
  {
    id: 1,
    name: "Music & Audio",
    image: "/Categories/Music-1.png",
    color: "#e8f4fc",
  },
  {
    id: 2,
    name: "Books & Bibles",
    image: "/Categories/Books-1.png",
    color: "#fff3cd",
  },
  {
    id: 3,
    name: "Rosaries",
    image: "/Categories/Rosary-1.png",
    color: "#fce4ec",
  },
  {
    id: 4,
    name: "Statues",
    image: "/Categories/Statue-1.png",
    color: "#d4edda",
  },
  {
    id: 5,
    name: "Candles",
    image: "/Categories/Candle-1.png",
    color: "#fff9c4",
  },
  {
    id: 6,
    name: "Apparel",
    image: "/Categories/Apparel-1.png",
    color: "#e2d9f3",
  },
  { id: 7, name: "Gifts", image: "/Categories/Gifts-1.png", color: "#fce0c8" },
  {
    id: 8,
    name: "Children's",
    image: "/Categories/Children-1.png",
    color: "#e8f5e9",
  },
  {
    id: 9,
    name: "Jewelry",
    image: "/Categories/Jewerly-1.png",
    color: "#fff8e1",
  },
  {
    id: 10,
    name: "Sacramentals",
    image: "/Categories/Sacramentals-1.png",
    color: "#e3f2fd",
  },
];

const PROMO_BANNERS = [
  {
    id: 1,
    brand: "Sacred Sounds",
    headline: "New Albums Just Dropped",
    subtext: "Praise & Worship · Gospel · Devotional",
    cta: "Listen & Shop",
    gradient: "linear-gradient(135deg, #e8edff 0%, #c9d4ff 100%)",
    accent: "#3b5bdb",
    badge: "NEW",
    icon: "🎵",
  },
  {
    id: 2,
    brand: "Holy Scripture",
    headline: "Up to 30% Off Bibles",
    subtext: "Catholic, Protestant & Study Editions",
    cta: "Shop Bibles",
    gradient: "linear-gradient(135deg, #fff8e1 0%, #fde089 100%)",
    accent: "#9a6a00",
    badge: "30% OFF",
    icon: "📖",
  },
  {
    id: 3,
    brand: "Sacred Gifts",
    headline: "Easter Collection",
    subtext: "Rosaries, Statues & Blessed Items",
    cta: "Shop Easter",
    gradient: "linear-gradient(135deg, #e8f5ee 0%, #bbedd3 100%)",
    accent: "#1b6b3a",
    badge: "SEASONAL",
    icon: "✝️",
  },
];

// FEATURED_PRODUCTS imported from ../lib/products

// ─── Scrolling Ticker (Nykaa-style infinite marquee between nav and hero) ─────
function ScrollingTicker() {
  const segment =
    "✝  NEW ALBUM OUT NOW  ·  FREE SHIPPING ON ORDERS ABOVE TZS 50,000  ·  EASTER COLLECTION IS LIVE  ·  30% OFF ALL BIBLES  ·  SACRED GIFT SETS NOW IN STOCK  ·  ROSARIES FROM TZS 8,000  ·  NEW DEVOTIONAL BOOKS JUST ARRIVED  ·  ";
  return (
    <div
      style={{
        background: "#1a1a2e",
        overflow: "hidden",
        height: 34,
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="ticker-track">
        <span className="ticker-content">{segment}</span>
        <span className="ticker-content">{segment}</span>
      </div>
    </div>
  );
}

// ─── Hero Banner Carousel ─────────────────────────────────────────────────────
function HeroBanner() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setCurrent((c) => (c + 1) % SLIDES.length),
      5000,
    );
    return () => clearInterval(t);
  }, []);

  const slide = SLIDES[current];

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: slide.bg,
        transition: "background 0.8s ease",
      }}
    >
      <div
        className="hero-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 48px",
          display: "flex",
          alignItems: "center",
          minHeight: 500,
          gap: 60,
        }}
      >
        {/* Text block */}
        <div style={{ flex: 1, zIndex: 2, padding: "72px 0" }}>
          <span
            style={{
              display: "inline-block",
              background: slide.accent,
              color: "#1a1a2e",
              padding: "4px 14px",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "1.2px",
              marginBottom: 20,
              textTransform: "uppercase",
            }}
          >
            {slide.subheading}
          </span>
          <h1
            className="hero-h1"
            style={{
              color: "#fff",
              fontSize: 58,
              fontWeight: 900,
              lineHeight: 1.05,
              margin: "0 0 20px",
              textShadow: "0 2px 12px rgba(0,0,0,0.3)",
            }}
          >
            {slide.heading}
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.88)",
              fontSize: 16,
              fontStyle: "italic",
              lineHeight: 1.75,
              maxWidth: 420,
              margin: "0 0 12px",
              borderLeft: `3px solid ${slide.accent}`,
              paddingLeft: 16,
            }}
          >
            {slide.quote}
          </p>
          <p
            style={{
              color: slide.accent,
              fontSize: 13.5,
              fontWeight: 700,
              letterSpacing: "0.02em",
              marginBottom: 32,
              paddingLeft: 19,
            }}
          >
            {slide.attribution}
          </p>
          <a
            href="#shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: slide.accent,
              color: "#1a1a2e",
              padding: "14px 32px",
              borderRadius: 8,
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              boxShadow: `0 6px 20px rgba(0,0,0,0.25)`,
              letterSpacing: "0.3px",
            }}
          >
            {slide.cta} <span style={{ fontSize: 16 }}>→</span>
          </a>
        </div>

        {/* Decorative image panel */}
        <div
          className="hero-image-panel"
          style={{
            width: 400,
            height: 400,
            flexShrink: 0,
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle, ${slide.accent}30 0%, transparent 70%)`,
              borderRadius: "50%",
              transform: "scale(1.2)",
            }}
          />
          <img
            key={slide.id}
            src={slide.image}
            alt={slide.heading}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              borderRadius: 24,
              boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>
      </div>

      {/* Slide dots */}
      <div
        style={{
          position: "absolute",
          bottom: 22,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 8,
          zIndex: 10,
        }}
      >
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: i === current ? "#D4AF37" : "rgba(255,255,255,0.4)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "all 0.3s",
            }}
          />
        ))}
      </div>
    </section>
  );
}

// ─── Featured Categories ──────────────────────────────────────────────────────
function FeaturedCategories() {
  return (
    <section
      className="section-pad"
      style={{ padding: "52px 0 60px", background: "#ffffff" }}
    >
      <div
        className="section-inner"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 28,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#1a1a2e",
                margin: "0 0 4px",
                letterSpacing: "-0.2px",
              }}
            >
              Shop by Category
            </h2>
            <p style={{ color: "#999", fontSize: 13.5, margin: 0 }}>
              Everything you need to nourish your faith
            </p>
          </div>
          <a
            href="#"
            style={{
              fontSize: 13.5,
              fontWeight: 700,
              color: "#C9A84C",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            See all →
          </a>
        </div>
        <div
          className="cat-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(10, 1fr)",
            gap: 12,
          }}
        >
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.name}`}
              className="cat-card"
              style={{
                textDecoration: "none",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                background: "#fff",
                borderRadius: 16,
                border: "1.5px solid #f0f0f0",
                overflow: "hidden",
                transition:
                  "box-shadow 0.2s, border-color 0.2s, transform 0.2s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 28px rgba(0,0,0,0.10)";
                e.currentTarget.style.borderColor = "#C9A84C";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.borderColor = "#f0f0f0";
                e.currentTarget.style.transform = "";
              }}
            >
              {/* Image area */}
              <div
                style={{
                  width: "100%",
                  aspectRatio: "1 / 1",
                  background: cat.color,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                  padding: "10px 10px 6px",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    maxHeight: 90,
                    transition: "transform 0.25s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.transform =
                      "scale(1.07)")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLImageElement).style.transform = "")
                  }
                />
              </div>
              {/* Label */}
              <div
                style={{
                  padding: "9px 8px 11px",
                  textAlign: "center",
                  width: "100%",
                  boxSizing: "border-box",
                  borderTop: "1px solid #f5f5f5",
                  background: "#fff",
                }}
              >
                <span
                  className="cat-label"
                  style={{
                    fontSize: 11.5,
                    fontWeight: 700,
                    color: "#1a1a2e",
                    lineHeight: 1.3,
                    display: "block",
                  }}
                >
                  {cat.name}
                </span>
              </div>
            </a>
          ))}
        </div>

        <style>{`
          @media (max-width: 1100px) {
            .cat-grid { grid-template-columns: repeat(5, 1fr) !important; }
          }
          @media (max-width: 640px) {
            .cat-grid { grid-template-columns: repeat(4, 1fr) !important; gap: 8px !important; }
          }
          @media (max-width: 400px) {
            .cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
          }
        `}</style>
      </div>
    </section>
  );
}

// ─── Promo Banners (Nykaa 3-col layout) ──────────────────────────────────────
function PromoBanners() {
  return (
    <section
      className="section-pad"
      style={{ padding: "72px 0", background: "#fafafa" }}
    >
      <div
        className="section-inner"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}
      >
        {/* Section header */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 22,
                fontWeight: 800,
                color: "#1a1a2e",
                margin: "0 0 4px",
                letterSpacing: "-0.2px",
              }}
            >
              Exclusive Offers
            </h2>
            <p style={{ color: "#999", fontSize: 13.5, margin: 0 }}>
              Carefully curated collections at special prices
            </p>
          </div>
          <a
            href="#"
            style={{
              fontSize: 13.5,
              fontWeight: 700,
              color: "#C9A84C",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.textDecoration = "underline")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.textDecoration = "none")
            }
          >
            View all offers →
          </a>
        </div>

        <div
          className="promo-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {PROMO_BANNERS.map((b) => (
            <div
              key={b.id}
              className="promo-card"
              style={{
                background: "#fff",
                borderRadius: 20,
                overflow: "hidden",
                border: "1.5px solid #f0f0f0",
                cursor: "pointer",
                transition:
                  "box-shadow 0.22s, transform 0.22s, border-color 0.22s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  "0 12px 36px rgba(0,0,0,0.10)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.borderColor = b.accent + "55";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.borderColor = "#f0f0f0";
              }}
            >
              {/* Top gradient panel */}
              <div
                style={{
                  background: b.gradient,
                  height: 148,
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {/* Decorative circles */}
                <div
                  style={{
                    position: "absolute",
                    right: -36,
                    bottom: -36,
                    width: 140,
                    height: 140,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.3)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: -24,
                    top: -24,
                    width: 96,
                    height: 96,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.2)",
                  }}
                />
                {/* Badge */}
                {b.badge && (
                  <span
                    style={{
                      position: "absolute",
                      top: 16,
                      left: 16,
                      background: b.accent,
                      color: "#fff",
                      fontSize: 10,
                      fontWeight: 800,
                      padding: "4px 12px",
                      borderRadius: 4,
                      letterSpacing: "0.8px",
                    }}
                  >
                    {b.badge}
                  </span>
                )}
                {/* Icon */}
                <span
                  style={{
                    fontSize: 52,
                    position: "relative",
                    zIndex: 1,
                    filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.1))",
                  }}
                >
                  {b.icon}
                </span>
              </div>

              {/* Card body */}
              <div style={{ padding: "22px 24px 26px" }}>
                <p
                  style={{
                    fontSize: 11,
                    fontWeight: 800,
                    color: b.accent,
                    letterSpacing: "1px",
                    textTransform: "uppercase",
                    margin: "0 0 8px",
                  }}
                >
                  {b.brand}
                </p>
                <h3
                  style={{
                    fontSize: 21,
                    fontWeight: 800,
                    color: "#1a1a2e",
                    margin: "0 0 8px",
                    lineHeight: 1.22,
                    letterSpacing: "-0.2px",
                  }}
                >
                  {b.headline}
                </h3>
                <p
                  style={{
                    color: "#888",
                    fontSize: 13.5,
                    margin: "0 0 22px",
                    lineHeight: 1.5,
                  }}
                >
                  {b.subtext}
                </p>
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    background: b.accent,
                    color: "#fff",
                    padding: "11px 22px",
                    borderRadius: 8,
                    fontSize: 13.5,
                    fontWeight: 700,
                    textDecoration: "none",
                    letterSpacing: "0.2px",
                    transition: "opacity 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                >
                  {b.cta} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [qty, setQty] = useState(0);
  const navigate = useNavigate();
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  function handleAdd() {
    setQty(1);
    onAddToCart(product);
  }
  function handleIncrease() {
    setQty((q) => q + 1);
    onAddToCart(product);
  }
  function handleDecrease() {
    setQty((q) => (q > 1 ? q - 1 : 0));
  }

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/product/${product.id}`)}
      className="prod-card"
      style={{
        background: "#fff",
        borderRadius: 12,
        border: `1px solid ${hovered ? "#D4AF37" : "#e8e8e8"}`,
        transition: "border-color 0.18s, box-shadow 0.18s",
        boxShadow: hovered
          ? "0 4px 16px rgba(0,0,0,0.10)"
          : "0 1px 4px rgba(0,0,0,0.06)",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* Image area — white bg, product contained with padding like Blinkit */}
      <div
        className="prod-img"
        style={{
          position: "relative",
          height: 185,
          background: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px 16px 8px",
          boxSizing: "border-box",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            width: "auto",
            height: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />

        {/* Discount badge — top-left */}
        {discount > 0 && (
          <span
            className="prod-badge"
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              background: "#1a1a2e",
              color: "#D4AF37",
              fontSize: 10,
              fontWeight: 800,
              lineHeight: 1.2,
              padding: "3px 7px",
              borderRadius: 5,
            }}
          >
            {discount}% OFF
          </span>
        )}

        {/* Text badge (NEW / SALE / BESTSELLER) — top-left */}
        {product.badge && !discount && (
          <span
            className="prod-badge"
            style={{
              position: "absolute",
              top: 8,
              left: 8,
              background: "rgba(26,26,46,0.85)",
              color: "#D4AF37",
              fontSize: 9,
              fontWeight: 800,
              padding: "3px 8px",
              borderRadius: 5,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "#f0f0f0", margin: "0 12px" }} />

      {/* Info */}
      <div
        className="prod-info"
        style={{
          padding: "10px 12px 12px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Delivery chip */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            marginBottom: 6,
          }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#888"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
          <span style={{ fontSize: 11, color: "#888", fontWeight: 500 }}>
            Ships in 2–3 days
          </span>
        </div>

        {/* Product name */}
        <h4
          className="prod-name"
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#1a1a1a",
            margin: "0 0 2px",
            lineHeight: 1.4,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </h4>

        {/* Weight / variant */}
        <p
          className="prod-cat"
          style={{
            fontSize: 12,
            color: "#999",
            margin: "0 0 10px",
            lineHeight: 1.3,
          }}
        >
          {product.weight ?? product.category}
        </p>

        {/* Price row */}
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 6,
            marginBottom: 10,
          }}
        >
          <span
            className="prod-price"
            style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}
          >
            TZS {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span
              className="prod-orig"
              style={{
                fontSize: 12,
                color: "#bbb",
                textDecoration: "line-through",
              }}
            >
              TZS {product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* ADD / stepper — full width, at bottom */}
        <div style={{ marginTop: "auto" }}>
          {qty === 0 ? (
            <button
              className="prod-btn"
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }}
              style={{
                width: "100%",
                border: "1.5px solid #C9A84C",
                background: "#fff",
                color: "#C9A84C",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.5px",
                padding: "7px 0",
                borderRadius: 8,
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#C9A84C";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#C9A84C";
              }}
            >
              ADD
            </button>
          ) : (
            <div
              className="prod-btn"
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1.5px solid #C9A84C",
                borderRadius: 8,
                overflow: "hidden",
                background: "#C9A84C",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDecrease();
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 20,
                  width: 36,
                  height: 34,
                  cursor: "pointer",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                −
              </button>
              <span style={{ fontWeight: 700, fontSize: 14, color: "#fff" }}>
                {qty}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleIncrease();
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 20,
                  width: 36,
                  height: 34,
                  cursor: "pointer",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Featured Products ────────────────────────────────────────────────────────
function FeaturedProducts({
  onAddToCart,
}: {
  onAddToCart: (p: Product) => void;
}) {
  return (
    <section
      className="section-pad"
      style={{ padding: "64px 0", background: "#fff" }}
      id="shop"
    >
      <div
        className="section-inner"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: 36,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 700,
                color: "#1a1a2e",
                margin: "0 0 8px",
              }}
            >
              Featured Products
            </h2>
            <p style={{ color: "#888", fontSize: 15, margin: 0 }}>
              Handpicked for your spiritual journey
            </p>
          </div>
          <a
            href="#"
            style={{
              color: "#C9A84C",
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            View All →
          </a>
        </div>
        <div
          className="prod-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {FEATURED_PRODUCTS.map((p) => (
            <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} />
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Featured Videos ────────────────────────────────────────────────────────
const VIDEO_ITEMS = [
  {
    id: 1,
    title: "Mungu Wangu ni Mkuu",
    platform: "youtube" as const,
    // Replace with your actual YouTube video ID
    embedUrl: "https://www.youtube.com/embed/7wtfhZwyrcc",
  },
  {
    id: 2,
    title: "Yesu ni Bwana",
    platform: "youtube" as const,
    // Replace with your actual YouTube video ID
    embedUrl: "https://www.youtube.com/embed/4Yj_M3nqPZo",
  },
  {
    id: 3,
    title: "Usiniache Bwana",
    platform: "tiktok" as const,
    // Replace with your actual TikTok video ID
    embedUrl: "https://www.tiktok.com/embed/v2/7321234567890123456",
  },
  {
    id: 4,
    title: "Niko Tayari",
    platform: "youtube" as const,
    // Replace with your actual YouTube video ID
    embedUrl: "https://www.youtube.com/embed/GG3GJaHqLAo",
  },
];

function FeaturedVideos() {
  return (
    <section
      className="section-pad"
      style={{ padding: "64px 0", background: "#fff" }}
    >
      <div
        className="section-inner"
        style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}
      >
        <div style={{ marginBottom: 36 }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#1a1a2e",
              margin: "0 0 8px",
            }}
          >
            Featured Videos
          </h2>
          <p style={{ color: "#888", fontSize: 15, margin: 0 }}>
            Handpicked for your spiritual journey
          </p>
        </div>
        <div
          className="vid-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 20,
          }}
        >
          {VIDEO_ITEMS.map((v) => (
            <div key={v.id}>
              {/* 16:9 aspect-ratio wrapper */}
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                  overflow: "hidden",
                  borderRadius: 12,
                  background: "#1a1a2e",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.10)",
                }}
              >
                <iframe
                  src={v.embedUrl}
                  title={v.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                />
              </div>
              <p
                style={{
                  marginTop: 10,
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#1a1a2e",
                  textAlign: "center",
                }}
              >
                {v.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust Badges ─────────────────────────────────────────────────────────────
const TrustIconTruck = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="1" y="3" width="15" height="13" rx="1" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);
const TrustIconCross = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="12" y1="2" x2="12" y2="22" />
    <line x1="5" y1="8" x2="19" y2="8" />
  </svg>
);
const TrustIconShield = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);
const TrustIconReturn = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-3.7" />
  </svg>
);

function TrustBadges() {
  const badges = [
    {
      Icon: TrustIconTruck,
      title: "Free Shipping",
      desc: "On orders above TZS 50,000",
      bg: "#edf4ff",
      color: "#2563eb",
    },
    {
      Icon: TrustIconCross,
      title: "Blessed & Certified",
      desc: "Church approved products",
      bg: "#fffbf0",
      color: "#b8860b",
    },
    {
      Icon: TrustIconShield,
      title: "Secure Payments",
      desc: "M-Pesa, Visa & more",
      bg: "#edfaf3",
      color: "#16a34a",
    },
    {
      Icon: TrustIconReturn,
      title: "Easy Returns",
      desc: "30-day return policy",
      bg: "#f5eeff",
      color: "#7c3aed",
    },
  ];

  return (
    <section
      className="trust-section"
      style={{
        padding: "36px 0",
        background: "#fafafa",
        borderTop: "1px solid #f0f0f0",
        borderBottom: "1px solid #f0f0f0",
      }}
    >
      <div
        className="trust-grid trust-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 24px",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
        }}
      >
        {badges.map((b) => (
          <div
            key={b.title}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              padding: "20px 22px",
              background: "#fff",
              border: "1.5px solid #efefef",
              borderRadius: 16,
              transition:
                "box-shadow 0.22s, border-color 0.22s, transform 0.18s",
              cursor: "default",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 6px 22px rgba(0,0,0,0.08)";
              e.currentTarget.style.borderColor = "#D4AF37";
              e.currentTarget.style.transform = "translateY(-2px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "";
              e.currentTarget.style.borderColor = "#efefef";
              e.currentTarget.style.transform = "";
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 14,
                background: b.bg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                color: b.color,
              }}
            >
              <b.Icon />
            </div>
            <div>
              <p
                style={{
                  color: "#1a1a2e",
                  fontWeight: 700,
                  fontSize: 13.5,
                  margin: "0 0 3px",
                  letterSpacing: "-0.1px",
                }}
              >
                {b.title}
              </p>
              <p
                style={{
                  color: "#aaa",
                  fontSize: 12,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {b.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── Newsletter ───────────────────────────────────────────────────────────────
function Newsletter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <section
      className="nl-section"
      style={{
        background: "#fff",
        padding: "48px 24px",
        borderTop: "1px solid #f0f0f0",
      }}
    >
      <div style={{ maxWidth: 520, margin: "0 auto", textAlign: "center" }}>
        {/* ── Decorative gold divider ── */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            marginBottom: 22,
          }}
        >
          <div
            style={{
              height: 1,
              width: 52,
              background: "linear-gradient(to right, transparent, #D4AF37)",
            }}
          />
          <span style={{ fontSize: 16, color: "#D4AF37", lineHeight: 1 }}>
            ✝
          </span>
          <div
            style={{
              height: 1,
              width: 52,
              background: "linear-gradient(to left, transparent, #D4AF37)",
            }}
          />
        </div>

        <h2
          style={{
            color: "#1a1a2e",
            fontSize: 26,
            fontWeight: 800,
            margin: "0 0 10px",
            letterSpacing: "-0.3px",
          }}
        >
          Stay Inspired
        </h2>
        <p
          style={{
            color: "#888",
            fontSize: 14.5,
            margin: "0 0 24px",
            lineHeight: 1.65,
          }}
        >
          New releases, devotionals &amp; exclusive offers — straight to your
          inbox.
        </p>

        {subscribed ? (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              background: "#f0faf5",
              border: "1.5px solid #52c48a",
              borderRadius: 12,
              padding: "16px 32px",
              color: "#1b6b3a",
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            🙏 Thank you! You're now subscribed.
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="nl-form"
            style={{
              display: "flex",
              maxWidth: 480,
              margin: "0 auto",
              background: "#f6f6f6",
              borderRadius: 50,
              border: "1.5px solid #e8e8e8",
              overflow: "hidden",
              padding: "5px 5px 5px 22px",
            }}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              style={{
                flex: 1,
                border: "none",
                background: "transparent",
                color: "#1a1a2e",
                fontSize: 14.5,
                outline: "none",
                minWidth: 0,
              }}
            />
            <button
              type="submit"
              style={{
                padding: "12px 28px",
                background: "linear-gradient(135deg, #D4AF37, #C9A84C)",
                color: "#1a1a2e",
                border: "none",
                borderRadius: 40,
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                whiteSpace: "nowrap",
                letterSpacing: "0.2px",
              }}
            >
              Subscribe →
            </button>
          </form>
        )}

        <p style={{ fontSize: 12, color: "#ccc", marginTop: 18 }}>
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function Home() {
  const { addToCart } = useCart();

  return (
    <AppLayout>
      <ScrollingTicker />
      <HeroBanner />
      <FeaturedCategories />
      <PromoBanners />
      <FeaturedProducts onAddToCart={addToCart} />
      <FeaturedVideos />
      <TrustBadges />
      <Newsletter />
    </AppLayout>
  );
}
