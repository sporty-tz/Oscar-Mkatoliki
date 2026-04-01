import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { type Product, FEATURED_PRODUCTS } from "../lib/products";
import { useCart } from "../context/CartContext";

// ── Sacramental categories and their products ──────────────────────────────────
const SACRAMENTAL_CATEGORIES = [
  {
    id: "rosaries",
    name: "Rosaries",
    image: "/Categories/Rosary-1.png",
    color: "#fce4ec",
    desc: "Pray the Holy Rosary with beautifully crafted beads",
  },
  {
    id: "statues",
    name: "Statues",
    image: "/Categories/Statue-1.png",
    color: "#d4edda",
    desc: "Holy images to sanctify your home and altar",
  },
  {
    id: "candles",
    name: "Candles",
    image: "/Categories/Candle-1.png",
    color: "#fff9c4",
    desc: "Sacred flames for prayer, vigils and devotion",
  },
  {
    id: "jewelry",
    name: "Jewelry & Medals",
    image: "/Categories/Jewerly-1.png",
    color: "#fff8e1",
    desc: "Wear your faith with blessed crosses and medals",
  },
  {
    id: "sacramentals",
    name: "Sacramentals",
    image: "/Categories/Sacramentals-1.png",
    color: "#e3f2fd",
    desc: "Holy water, oils, scapulars and blessed objects",
  },
];

const SACRAMENTAL_CAT_NAMES = ["Rosaries", "Statues", "Candles", "Jewelry"];

const SACRAMENTAL_PRODUCTS = FEATURED_PRODUCTS.filter((p) =>
  SACRAMENTAL_CAT_NAMES.includes(p.category),
);

// ── What are Sacramentals? ─────────────────────────────────────────────────────
const CATECHISM_POINTS = [
  {
    title: "Sacred Signs",
    body: "Sacramentals are sacred signs instituted by the Church. They prepare us to receive grace and dispose us to cooperate with it.",
    color: "#1a6b40",
    bg: "#edfaf3",
    svgPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    title: "Blessings",
    body: "Blessings are the most important sacramentals. They include praise of God for his works and gifts, and the Church's intercession for the faithful.",
    color: "#1e3799",
    bg: "#eef2ff",
    svgPath:
      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  },
  {
    title: "Disposition of Heart",
    body: "The effect of sacramentals depends on the faith and devotion of those who use them. They draw their power from the prayer of the Church.",
    color: "#6c3483",
    bg: "#f5eefb",
    svgPath:
      "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  },
];

// ── Product Card ───────────────────────────────────────────────────────────────
function SacramentalProductCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
}) {
  const navigate = useNavigate();
  const { cartItems, addToCart, removeFromCart } = useCart();
  const qty = cartItems.filter((i) => i.id === product.id).length;

  function handleAdd() {
    onAddToCart(product);
  }
  function handleIncrease() {
    addToCart(product);
  }
  function handleDecrease() {
    removeFromCart(product.id);
  }

  return (
    <div
      className="prod-card"
      onClick={() => navigate(`/product/${product.id}`)}
      style={{
        background: "#fff",
        borderRadius: 16,
        overflow: "hidden",
        border: "1.5px solid #f0ece4",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        transition: "box-shadow 0.2s, transform 0.2s, border-color 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 12px 36px rgba(0,0,0,0.10)";
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.borderColor = "#C9A84C55";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "";
        e.currentTarget.style.transform = "";
        e.currentTarget.style.borderColor = "#f0ece4";
      }}
    >
      {/* Image area */}
      <div
        style={{
          width: "100%",
          aspectRatio: "1 / 1",
          background: product.gradient,
          position: "relative",
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
          }}
        />
        {product.badge && (
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "#1a6b40",
              color: "#fff",
              fontSize: 9,
              fontWeight: 800,
              padding: "3px 9px",
              borderRadius: 4,
              letterSpacing: "0.7px",
            }}
          >
            {product.badge}
          </span>
        )}
      </div>

      {/* Body */}
      <div
        style={{
          padding: "14px 14px 16px",
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        <p
          style={{
            fontSize: 10.5,
            fontWeight: 700,
            color: "#1a6b40",
            letterSpacing: "1px",
            textTransform: "uppercase",
            margin: "0 0 6px",
          }}
        >
          {product.category}
        </p>
        <p
          style={{
            fontSize: 14,
            fontWeight: 700,
            color: "#1a1a2e",
            margin: "0 0 4px",
            lineHeight: 1.3,
          }}
        >
          {product.name}
        </p>
        <p
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
          <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1a1a" }}>
            TZS {product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span
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

        {/* ADD / stepper */}
        <div style={{ marginTop: "auto" }}>
          {qty === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAdd();
              }}
              style={{
                width: "100%",
                border: "1.5px solid #1a6b40",
                background: "#fff",
                color: "#1a6b40",
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: "0.5px",
                padding: "7px 0",
                borderRadius: 8,
                cursor: "pointer",
                transition: "background 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#1a6b40";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#fff";
                e.currentTarget.style.color = "#1a6b40";
              }}
            >
              ADD
            </button>
          ) : (
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1.5px solid #1a6b40",
                borderRadius: 8,
                overflow: "hidden",
                background: "#1a6b40",
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

// ── Page ───────────────────────────────────────────────────────────────────────
export default function Sacramentals() {
  const { addToCart } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filteredProducts =
    activeCategory === "all"
      ? SACRAMENTAL_PRODUCTS
      : SACRAMENTAL_PRODUCTS.filter(
          (p) => p.category.toLowerCase() === activeCategory.toLowerCase(),
        );

  function handleAddToCart(product: Product) {
    addToCart(product);
  }

  return (
    <AppLayout hideCategoryNav>
      {/* ── Hero ── */}
      <section
        style={{
          background:
            "linear-gradient(150deg, #0d2b1a 0%, #1a6b40 60%, #0d2b1a 100%)",
          padding: "72px 24px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Background radial glow */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 700,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(212,175,55,0.1) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 680,
            margin: "0 auto",
          }}
        >
          {/* Shield SVG */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.15)",
              border: "1.5px solid rgba(212,175,55,0.3)",
              marginBottom: 24,
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 14px",
              letterSpacing: "-0.5px",
              lineHeight: 1.15,
            }}
          >
            Sacramentals
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.65)",
              margin: "0 0 28px",
              lineHeight: 1.7,
            }}
          >
            Sacred signs and blessed objects to sanctify your home, your prayer
            and your daily life.
          </p>

          {/* Catechism pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(212,175,55,0.12)",
              border: "1.5px solid rgba(212,175,55,0.28)",
              borderRadius: 50,
              padding: "9px 22px",
            }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="2" x2="12" y2="22" />
              <line x1="4" y1="10" x2="20" y2="10" />
            </svg>
            <span style={{ color: "#D4AF37", fontSize: 13, fontWeight: 700 }}>
              CCC 1667 — Sacred Signs Instituted by the Church
            </span>
          </div>
        </div>
      </section>

      {/* ── What are Sacramentals? ── */}
      <section
        style={{
          background: "#fff",
          padding: "64px 24px",
          borderBottom: "1px solid #f0ece4",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "#1a6b40",
                letterSpacing: "3px",
                textTransform: "uppercase",
                margin: "0 0 14px",
              }}
            >
              Catechism of the Catholic Church
            </p>
            <h2
              style={{
                fontSize: 30,
                fontWeight: 800,
                color: "#1a1a2e",
                margin: "0 0 14px",
                letterSpacing: "-0.3px",
              }}
            >
              What are Sacramentals?
            </h2>
            <p
              style={{
                fontSize: 15.5,
                color: "#777",
                maxWidth: 600,
                margin: "0 auto",
                lineHeight: 1.7,
              }}
            >
              "Holy Mother Church has, moreover, instituted sacramentals. These
              are sacred signs which bear a resemblance to the sacraments." —{" "}
              <em>CCC 1667</em>
            </p>
          </div>

          <div
            className="sac-info-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
          >
            {CATECHISM_POINTS.map((pt) => {
              const paths = pt.svgPath
                .split(" M")
                .map((d, i) => (i === 0 ? d : "M" + d));
              return (
                <div
                  key={pt.title}
                  style={{
                    padding: "28px 28px",
                    background: pt.bg,
                    borderRadius: 18,
                    border: "1.5px solid transparent",
                    transition: "border-color 0.2s, box-shadow 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = pt.color + "40";
                    e.currentTarget.style.boxShadow = `0 6px 24px ${pt.color}12`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "transparent";
                    e.currentTarget.style.boxShadow = "";
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 13,
                      background: "#fff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 18,
                      boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                      color: pt.color,
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {paths.map((d, i) => (
                        <path key={i} d={d} />
                      ))}
                    </svg>
                  </div>
                  <h3
                    style={{
                      fontSize: 16,
                      fontWeight: 800,
                      color: "#1a1a2e",
                      margin: "0 0 10px",
                      letterSpacing: "-0.1px",
                    }}
                  >
                    {pt.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13.5,
                      color: "#777",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {pt.body}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section style={{ background: "#f8f6f2", padding: "56px 24px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ marginBottom: 32 }}>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 800,
                color: "#1a1a2e",
                margin: "0 0 6px",
                letterSpacing: "-0.2px",
              }}
            >
              Browse by Category
            </h2>
            <p style={{ color: "#999", fontSize: 13.5, margin: 0 }}>
              Discover sacred objects for every aspect of your devotional life
            </p>
          </div>

          <div
            className="sac-cat-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 14,
            }}
          >
            {SACRAMENTAL_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() =>
                  setActiveCategory(
                    activeCategory === cat.name ? "all" : cat.name,
                  )
                }
                style={{
                  textDecoration: "none",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  background: activeCategory === cat.name ? "#1a6b40" : "#fff",
                  borderRadius: 16,
                  border: `1.5px solid ${activeCategory === cat.name ? "#1a6b40" : "#f0f0f0"}`,
                  overflow: "hidden",
                  transition:
                    "box-shadow 0.2s, border-color 0.2s, transform 0.2s",
                  cursor: "pointer",
                  padding: 0,
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(0,0,0,0.10)";
                  e.currentTarget.style.transform = "translateY(-3px)";
                  if (activeCategory !== cat.name)
                    e.currentTarget.style.borderColor = "#1a6b40";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.transform = "";
                  if (activeCategory !== cat.name)
                    e.currentTarget.style.borderColor = "#f0f0f0";
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
                  }}
                >
                  <img
                    src={cat.image}
                    alt={cat.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </div>
                <div style={{ padding: "10px 10px 14px", textAlign: "center" }}>
                  <p
                    style={{
                      fontSize: 12.5,
                      fontWeight: 700,
                      color: activeCategory === cat.name ? "#fff" : "#1a1a2e",
                      margin: "0 0 3px",
                    }}
                  >
                    {cat.name}
                  </p>
                  <p
                    style={{
                      fontSize: 10.5,
                      color:
                        activeCategory === cat.name
                          ? "rgba(255,255,255,0.7)"
                          : "#aaa",
                      margin: 0,
                      lineHeight: 1.4,
                    }}
                  >
                    {cat.desc}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section style={{ background: "#fff", padding: "56px 24px 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
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
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#1a1a2e",
                  margin: "0 0 4px",
                  letterSpacing: "-0.2px",
                }}
              >
                {activeCategory === "all" ? "All Sacramentals" : activeCategory}
              </h2>
              <p style={{ color: "#999", fontSize: 13.5, margin: 0 }}>
                {filteredProducts.length} item
                {filteredProducts.length !== 1 ? "s" : ""} available
              </p>
            </div>
            {activeCategory !== "all" && (
              <button
                onClick={() => setActiveCategory("all")}
                style={{
                  fontSize: 13.5,
                  fontWeight: 700,
                  color: "#1a6b40",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  textDecoration: "none",
                }}
              >
                Clear filter ×
              </button>
            )}
          </div>

          {filteredProducts.length > 0 ? (
            <div
              className="sac-prod-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 20,
              }}
            >
              {filteredProducts.map((p) => (
                <SacramentalProductCard
                  key={p.id}
                  product={p}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "80px 24px",
                color: "#aaa",
              }}
            >
              <svg
                width="48"
                height="48"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#1a6b40"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginBottom: 16, opacity: 0.4 }}
              >
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
              <p
                style={{
                  fontSize: 17,
                  fontWeight: 700,
                  color: "#1a1a2e",
                  margin: "0 0 8px",
                }}
              >
                No items in this category yet
              </p>
              <p style={{ fontSize: 14, lineHeight: 1.6 }}>
                More sacramentals are being added to the store soon.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* ── Browse all shop CTA ── */}
      <section
        style={{
          background: "linear-gradient(160deg, #0d2b1a 0%, #1a6b40 100%)",
          padding: "56px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 12px",
              letterSpacing: "-0.3px",
            }}
          >
            Looking for Something Else?
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.6)",
              margin: "0 0 32px",
              lineHeight: 1.7,
            }}
          >
            Visit the full store for Catholic music, books, gifts and more.
          </p>
          <a
            href="/shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, #D4AF37, #C9A84C)",
              color: "#0d2b1a",
              padding: "14px 32px",
              borderRadius: 50,
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 6px 22px rgba(212,175,55,0.28)",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.87")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Visit the Full Store
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .sac-cat-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .sac-prod-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
        @media (max-width: 768px) {
          .sac-info-grid { grid-template-columns: 1fr !important; }
          .sac-cat-grid { grid-template-columns: repeat(3, 1fr) !important; gap: 10px !important; }
          .sac-prod-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
        }
        @media (max-width: 480px) {
          .sac-cat-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </AppLayout>
  );
}
