import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { type Product, FEATURED_PRODUCTS } from "../lib/products";
import AppLayout from "../components/layout/AppLayout";
import { useCart } from "../context/CartContext";

// ─── Mini Product Card (for the two bottom sections) ──────────────────────────
function MiniCard({
  product,
  onAddToCart,
}: {
  product: Product;
  onAddToCart: (p: Product) => void;
}) {
  const [qty, setQty] = useState(0);
  const navigate = useNavigate();
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div
      onClick={() => {
        window.scrollTo(0, 0);
        navigate(`/product/${product.id}`);
      }}
      style={{
        background: "#fff",
        borderRadius: 14,
        border: "1px solid #ebebeb",
        overflow: "hidden",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
        transition: "border-color 0.2s, box-shadow 0.2s",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#D4AF37";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 6px 20px rgba(201,168,76,0.14)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.borderColor = "#ebebeb";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 2px 8px rgba(0,0,0,0.05)";
      }}
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          height: 155,
          background: "#f8f6f1",
          overflow: "hidden",
        }}
      >
        <img
          src={product.image}
          alt={product.name}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {discount > 0 && (
          <span
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              background: "#1a1a2e",
              color: "#D4AF37",
              fontSize: 9,
              fontWeight: 800,
              lineHeight: 1.15,
              padding: "4px 6px",
              textAlign: "center",
              borderRadius: "0 0 0 8px",
            }}
          >
            {discount}%<br />
            OFF
          </span>
        )}
      </div>

      {/* Info */}
      <div
        style={{
          padding: "10px 12px 12px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <span
          style={{
            fontSize: 10,
            color: "#888",
            marginBottom: 4,
            display: "block",
          }}
        >
          Ships in 2–3 days
        </span>
        <h4
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: "#1a1a2e",
            margin: "0 0 3px",
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.name}
        </h4>
        <p
          style={{
            fontSize: 11,
            color: "#aaa",
            margin: "0 0 10px",
          }}
        >
          {product.weight ?? product.category}
        </p>

        {/* Price row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginTop: "auto",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <span style={{ fontSize: 14, fontWeight: 800, color: "#1a1a2e" }}>
              TZS {product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <p
                style={{
                  fontSize: 10,
                  color: "#bbb",
                  textDecoration: "line-through",
                  margin: "2px 0 0",
                }}
              >
                TZS {product.originalPrice.toLocaleString()}
              </p>
            )}
          </div>
          {qty === 0 ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQty(1);
                onAddToCart(product);
              }}
              style={{
                border: "1.5px solid #C9A84C",
                background: "#fff",
                color: "#C9A84C",
                fontWeight: 800,
                fontSize: 12,
                padding: "6px 12px",
                borderRadius: 8,
                cursor: "pointer",
              }}
            >
              ADD +
            </button>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1.5px solid #C9A84C",
                borderRadius: 8,
                overflow: "hidden",
              }}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQty((q) => (q > 1 ? q - 1 : 0));
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#C9A84C",
                  fontWeight: 800,
                  fontSize: 18,
                  width: 28,
                  height: 30,
                  cursor: "pointer",
                }}
              >
                −
              </button>
              <span
                style={{
                  minWidth: 18,
                  textAlign: "center",
                  fontWeight: 800,
                  fontSize: 13,
                  color: "#1a1a2e",
                }}
              >
                {qty}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setQty((q) => q + 1);
                  onAddToCart(product);
                }}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#C9A84C",
                  fontWeight: 800,
                  fontSize: 18,
                  width: 28,
                  height: 30,
                  cursor: "pointer",
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

// ─── Star Rating ──────────────────────────────────────────────────────────────
function StarRating({ rating }: { rating: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill={
            s <= Math.floor(rating)
              ? "#D4AF37"
              : s - 0.5 <= rating
                ? "url(#half)"
                : "#e0e0e0"
          }
        >
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="50%" stopColor="#e0e0e0" />
            </linearGradient>
          </defs>
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      <span style={{ fontSize: 13, color: "#888", marginLeft: 4 }}>
        {rating} (124 reviews)
      </span>
    </div>
  );
}

// ─── Product Details Page ─────────────────────────────────────────────────────
export default function ProductDetails() {
  const { addToCart } = useCart();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [activeThumb, setActiveThumb] = useState(0);
  const [toast, setToast] = useState(false);

  const product = FEATURED_PRODUCTS.find((p) => p.id === Number(id));

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  function showToast() {
    setToast(true);
    setTimeout(() => setToast(false), 2200);
  }

  if (!product) {
    return (
      <AppLayout>
        <div
          style={{
            minHeight: "60vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 16,
          }}
        >
          <span style={{ fontSize: 48 }}>✝</span>
          <h2 style={{ color: "#1a1a2e", fontWeight: 700 }}>
            Product not found
          </h2>
          <button
            onClick={() => navigate("/")}
            style={{
              background: "#1a1a2e",
              color: "#D4AF37",
              border: "none",
              padding: "12px 28px",
              borderRadius: 10,
              fontWeight: 700,
              fontSize: 15,
              cursor: "pointer",
            }}
          >
            Back to Shop
          </button>
        </div>
      </AppLayout>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  // Similar: same category, excluding this product (fill with others if needed)
  const similar = FEATURED_PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category,
  )
    .concat(
      FEATURED_PRODUCTS.filter(
        (p) => p.id !== product.id && p.category !== product.category,
      ),
    )
    .slice(0, 4);

  // People also buy: 4 products different from current + similar set
  const similarIds = new Set([product.id, ...similar.map((p) => p.id)]);
  const alsoBy = FEATURED_PRODUCTS.filter((p) => !similarIds.has(p.id)).slice(
    0,
    4,
  );

  // Pad if fewer than 4
  const fillFrom = FEATURED_PRODUCTS.filter((p) => p.id !== product.id);
  function padTo4(arr: Product[]) {
    if (arr.length >= 4) return arr.slice(0, 4);
    const extras = fillFrom.filter((p) => !arr.find((a) => a.id === p.id));
    return [...arr, ...extras].slice(0, 4);
  }

  const similarSection = padTo4(similar);
  const alsoSection = padTo4(
    alsoBy.length < 4
      ? alsoBy.concat(
          fillFrom.filter((p) => !alsoBy.find((a) => a.id === p.id)),
        )
      : alsoBy,
  );

  // 4 "image" thumbnail panels using gradient variants
  const thumbOpacities = [1, 0.75, 0.55, 0.38];

  function handleAddToCart(p: Product) {
    addToCart(p);
    showToast();
  }

  return (
    <AppLayout>
      {/* ── Toast ── */}
      {toast && (
        <div
          style={{
            position: "fixed",
            bottom: 28,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#1a1a2e",
            color: "#D4AF37",
            padding: "12px 28px",
            borderRadius: 50,
            fontWeight: 700,
            fontSize: 14,
            zIndex: 9999,
            boxShadow: "0 6px 24px rgba(0,0,0,0.18)",
            whiteSpace: "nowrap",
          }}
        >
          ✓ Added to cart!
        </div>
      )}

      {/* ── Breadcrumb + Back ── */}
      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "10px 24px",
          display: "flex",
          alignItems: "center",
          gap: 10,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "none",
            border: "1px solid #ebebeb",
            width: 34,
            height: 34,
            borderRadius: "50%",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1a1a2e"
            strokeWidth="2.5"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <nav style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            onClick={() => navigate("/")}
            style={{
              fontSize: 13,
              color: "#C9A84C",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Home
          </span>
          <span style={{ color: "#ccc", fontSize: 13 }}>›</span>
          <span
            style={{
              fontSize: 13,
              color: "#C9A84C",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {product.category}
          </span>
          <span style={{ color: "#ccc", fontSize: 13 }}>›</span>
          <span
            style={{
              fontSize: 13,
              color: "#888",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {product.name}
          </span>
        </nav>
      </div>

      {/* ── Main content ── */}
      <main style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 24px" }}>
        {/* ── Top section: images + info ── */}
        <div
          className="pd-top"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 48,
            alignItems: "flex-start",
            marginBottom: 72,
          }}
        >
          {/* LEFT: Image gallery */}
          <div className="pd-gallery">
            {/* Main image */}
            <div
              style={{
                background: "#f8f6f1",
                borderRadius: 20,
                height: 420,
                position: "relative",
                overflow: "hidden",
                border: "1px solid #ebebeb",
                marginBottom: 14,
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  padding: 24,
                  boxSizing: "border-box",
                  transition: "opacity 0.3s",
                }}
              />
              {discount > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    background: "#1a1a2e",
                    color: "#D4AF37",
                    fontSize: 13,
                    fontWeight: 800,
                    lineHeight: 1.2,
                    padding: "8px 10px",
                    textAlign: "center",
                    borderRadius: "0 20px 0 14px",
                  }}
                >
                  {discount}%<br />
                  OFF
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div style={{ display: "flex", gap: 10 }}>
              {thumbOpacities.map((op, i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  style={{
                    flex: 1,
                    height: 80,
                    background: "#f8f6f1",
                    borderRadius: 12,
                    border: `2px solid ${activeThumb === i ? "#D4AF37" : "#ebebeb"}`,
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                    padding: 0,
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      opacity: 0.6 + op * 0.4,
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product info */}
          <div className="pd-info">
            {/* Category pill */}
            <span
              style={{
                display: "inline-block",
                background: "rgba(201,168,76,0.12)",
                color: "#C9A84C",
                fontSize: 11,
                fontWeight: 800,
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                padding: "4px 12px",
                borderRadius: 20,
                marginBottom: 14,
              }}
            >
              {product.category}
            </span>

            <h1
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#1a1a2e",
                lineHeight: 1.25,
                margin: "0 0 12px",
              }}
            >
              {product.name}
            </h1>

            <StarRating rating={4.5} />

            {/* Divider */}
            <div
              style={{ height: 1, background: "#f0f0f0", margin: "20px 0" }}
            />

            {/* Price block */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 12,
                marginBottom: 6,
              }}
            >
              <span
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: "#1a1a2e",
                  letterSpacing: "-0.5px",
                }}
              >
                TZS {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span
                  style={{
                    fontSize: 18,
                    color: "#bbb",
                    textDecoration: "line-through",
                    fontWeight: 500,
                  }}
                >
                  TZS {product.originalPrice.toLocaleString()}
                </span>
              )}
              {discount > 0 && (
                <span
                  style={{
                    background: "#e6f9ed",
                    color: "#16a34a",
                    fontSize: 13,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 20,
                  }}
                >
                  {discount}% off
                </span>
              )}
            </div>
            <p style={{ fontSize: 13, color: "#888", margin: "0 0 20px" }}>
              Inclusive of all taxes · Ships in 2–3 business days
            </p>

            {/* Variant / weight */}
            {product.weight && (
              <div style={{ marginBottom: 20 }}>
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#444",
                    margin: "0 0 8px",
                  }}
                >
                  Variant
                </p>
                <span
                  style={{
                    display: "inline-block",
                    border: "1.5px solid #D4AF37",
                    color: "#1a1a2e",
                    padding: "7px 18px",
                    borderRadius: 8,
                    fontSize: 13,
                    fontWeight: 600,
                    background: "rgba(212,175,55,0.06)",
                  }}
                >
                  {product.weight}
                </span>
              </div>
            )}

            {/* Quantity stepper */}
            <div style={{ marginBottom: 22 }}>
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#444",
                  margin: "0 0 8px",
                }}
              >
                Quantity
              </p>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  border: "1.5px solid #C9A84C",
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#C9A84C",
                    fontWeight: 800,
                    fontSize: 22,
                    width: 44,
                    height: 44,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  −
                </button>
                <span
                  style={{
                    minWidth: 40,
                    textAlign: "center",
                    fontWeight: 800,
                    fontSize: 16,
                    color: "#1a1a2e",
                  }}
                >
                  {qty}
                </span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#C9A84C",
                    fontWeight: 800,
                    fontSize: 22,
                    width: 44,
                    height: 44,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  +
                </button>
              </div>
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", gap: 12, marginBottom: 28 }}>
              <button
                onClick={() => {
                  for (let i = 0; i < qty; i++) addToCart(product);
                  showToast();
                }}
                style={{
                  flex: 1,
                  padding: "15px 0",
                  background: "#1a1a2e",
                  color: "#D4AF37",
                  border: "none",
                  borderRadius: 12,
                  fontWeight: 800,
                  fontSize: 16,
                  cursor: "pointer",
                  letterSpacing: "0.3px",
                  transition: "background 0.2s",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#C9A84C")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#1a1a2e")
                }
              >
                🛒 Add to Cart
              </button>
              <button
                style={{
                  padding: "15px 20px",
                  background: "#fff",
                  color: "#1a1a2e",
                  border: "1.5px solid #ebebeb",
                  borderRadius: 12,
                  fontWeight: 700,
                  fontSize: 20,
                  cursor: "pointer",
                  transition: "border-color 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.borderColor = "#C9A84C")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.borderColor = "#ebebeb")
                }
                title="Save to Wishlist"
              >
                🤍
              </button>
            </div>

            {/* Delivery & trust pills */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { icon: "🚚", text: "Free shipping over TZS 50,000" },
                { icon: "🔒", text: "Secure checkout" },
                { icon: "🔄", text: "30-day returns" },
              ].map((t) => (
                <div
                  key={t.text}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    background: "#f8f6f1",
                    padding: "7px 14px",
                    borderRadius: 8,
                    fontSize: 12,
                    color: "#555",
                    fontWeight: 600,
                  }}
                >
                  <span>{t.icon}</span>
                  {t.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Description ── */}
        <section style={{ marginBottom: 72 }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 800,
              color: "#1a1a2e",
              margin: "0 0 16px",
              paddingBottom: 12,
              borderBottom: "2px solid #f0e8d0",
            }}
          >
            Product Description
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#555",
              lineHeight: 1.75,
              maxWidth: 780,
              margin: 0,
            }}
          >
            {product.description ??
              "A beautifully crafted item perfect for your spiritual journey. Each piece is made with care and devotion, designed to bring peace and inspiration to your daily life."}
          </p>
        </section>

        {/* ── Similar Products ── */}
        <section style={{ marginBottom: 72 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#1a1a2e",
                  margin: "0 0 6px",
                }}
              >
                Similar Products
              </h2>
              <p style={{ color: "#888", fontSize: 14, margin: 0 }}>
                More in {product.category}
              </p>
            </div>
            <span
              onClick={() => navigate("/")}
              style={{
                color: "#C9A84C",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              View All →
            </span>
          </div>
          <div
            className="pd-product-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
            }}
          >
            {similarSection.map((p) => (
              <MiniCard key={p.id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>

        {/* ── People Also Buy ── */}
        <section style={{ marginBottom: 40 }}>
          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              marginBottom: 24,
            }}
          >
            <div>
              <h2
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#1a1a2e",
                  margin: "0 0 6px",
                }}
              >
                People Also Buy
              </h2>
              <p style={{ color: "#888", fontSize: 14, margin: 0 }}>
                Customers who viewed this also loved
              </p>
            </div>
            <span
              onClick={() => navigate("/")}
              style={{
                color: "#C9A84C",
                fontWeight: 700,
                fontSize: 13,
                cursor: "pointer",
              }}
            >
              View All →
            </span>
          </div>
          <div
            className="pd-product-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 20,
            }}
          >
            {alsoSection.map((p) => (
              <MiniCard key={p.id} product={p} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </section>
      </main>
    </AppLayout>
  );
}
