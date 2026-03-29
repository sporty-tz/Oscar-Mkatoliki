import { useSearchParams, useNavigate } from "react-router-dom";
import { FEATURED_PRODUCTS } from "../lib/products";
import AppLayout from "../components/layout/AppLayout";
import { useCart } from "../context/CartContext";

export default function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const q = searchParams.get("q") ?? "";

  const results = q.trim()
    ? FEATURED_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.category.toLowerCase().includes(q.toLowerCase()),
      )
    : [];

  return (
    <AppLayout>
      <section
        style={{
          minHeight: "60vh",
          padding: "52px 24px 80px",
          background: "#fff",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Header row */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 12,
              marginBottom: 36,
              borderBottom: "1px solid #f0f0f0",
              paddingBottom: 20,
            }}
          >
            <div>
              <h1
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#1a1a2e",
                  margin: "0 0 4px",
                }}
              >
                {q ? `Results for "${q}"` : "Search"}
              </h1>
              <p style={{ fontSize: 13.5, color: "#999", margin: 0 }}>
                {results.length > 0
                  ? `${results.length} product${results.length > 1 ? "s" : ""} found`
                  : q
                    ? "No products matched your search"
                    : "Enter a search term above"}
              </p>
            </div>
            {/* Inline search for easy refinement */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const val = (
                  e.currentTarget.querySelector("input") as HTMLInputElement
                ).value;
                if (val.trim()) setSearchParams({ q: val.trim() });
              }}
              style={{ display: "flex", gap: 8 }}
            >
              <div style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: 12,
                    top: "50%",
                    transform: "translateY(-50%)",
                    pointerEvents: "none",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aaa"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  defaultValue={q}
                  placeholder="Refine your search…"
                  style={{
                    padding: "9px 14px 9px 34px",
                    border: "1.5px solid #ddd",
                    borderRadius: 24,
                    fontSize: 13.5,
                    outline: "none",
                    width: 240,
                    boxSizing: "border-box" as const,
                    background: "#fafafa",
                    color: "#333",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#C9A84C";
                    e.target.style.background = "#fff";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "#ddd";
                    e.target.style.background = "#fafafa";
                  }}
                />
              </div>
              <button
                type="submit"
                style={{
                  padding: "9px 20px",
                  background: "#D4AF37",
                  color: "#1a1a2e",
                  border: "none",
                  borderRadius: 24,
                  fontSize: 13.5,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Search
              </button>
            </form>
          </div>

          {/* Results grid */}
          {results.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                gap: 20,
              }}
            >
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => navigate(`/product/${product.id}`)}
                  style={{
                    border: "1.5px solid #f0f0f0",
                    borderRadius: 18,
                    overflow: "hidden",
                    background: "#fff",
                    cursor: "pointer",
                    transition:
                      "box-shadow 0.2s, border-color 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 8px 28px rgba(0,0,0,0.10)";
                    e.currentTarget.style.borderColor = "#C9A84C";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.borderColor = "#f0f0f0";
                    e.currentTarget.style.transform = "";
                  }}
                >
                  {/* Image */}
                  <div
                    style={{
                      height: 160,
                      background: "#f8f6f1",
                      position: "relative",
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
                    {product.badge && (
                      <span
                        style={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          background: "#D4AF37",
                          color: "#1a1a2e",
                          fontSize: 10,
                          fontWeight: 800,
                          padding: "3px 10px",
                          borderRadius: 4,
                          letterSpacing: "0.8px",
                          zIndex: 1,
                        }}
                      >
                        {product.badge}
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding: "16px 16px 18px" }}>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#C9A84C",
                        textTransform: "uppercase",
                        letterSpacing: "0.8px",
                        margin: "0 0 6px",
                      }}
                    >
                      {product.category}
                    </p>
                    <h3
                      style={{
                        fontSize: 14.5,
                        fontWeight: 700,
                        color: "#1a1a2e",
                        margin: "0 0 8px",
                        lineHeight: 1.35,
                      }}
                    >
                      {product.name}
                    </h3>
                    {product.weight && (
                      <p
                        style={{
                          fontSize: 12,
                          color: "#aaa",
                          margin: "0 0 12px",
                        }}
                      >
                        {product.weight}
                      </p>
                    )}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                      }}
                    >
                      <div>
                        <span
                          style={{
                            fontSize: 15.5,
                            fontWeight: 800,
                            color: "#1a1a2e",
                          }}
                        >
                          TZS {product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span
                            style={{
                              fontSize: 12,
                              color: "#bbb",
                              textDecoration: "line-through",
                              marginLeft: 8,
                            }}
                          >
                            TZS {product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        style={{
                          padding: "7px 14px",
                          background: "#D4AF37",
                          color: "#1a1a2e",
                          border: "none",
                          borderRadius: 20,
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                          whiteSpace: "nowrap",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "#C9A84C")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "#D4AF37")
                        }
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : q ? (
            <div
              style={{
                textAlign: "center",
                padding: "80px 20px",
                color: "#aaa",
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 18 }}>🔍</div>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 700,
                  color: "#333",
                  marginBottom: 10,
                }}
              >
                No results for "{q}"
              </h2>
              <p style={{ fontSize: 14.5 }}>
                Try a different keyword — e.g. "rosary", "music", "bible",
                "candle"
              </p>
            </div>
          ) : null}
        </div>
      </section>
    </AppLayout>
  );
}
