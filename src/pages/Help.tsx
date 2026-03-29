import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";

const categories = [
  {
    icon: "🛒",
    label: "Orders & Payment",
    desc: "Placing orders, payment issues, order confirmations",
    href: "/faq#orders",
  },
  {
    icon: "🚚",
    label: "Shipping & Delivery",
    desc: "Delivery times, tracking, shipping zones",
    href: "/shipping-policy",
  },
  {
    icon: "↩️",
    label: "Returns & Refunds",
    desc: "Return process, timelines, eligibility",
    href: "/faq#returns",
  },
  {
    icon: "👤",
    label: "Account & Login",
    desc: "Sign in issues, profile, password reset",
    href: "/faq#account",
  },
  {
    icon: "📿",
    label: "Products & Stock",
    desc: "Product questions, availability, gifting",
    href: "/faq#products",
  },
  {
    icon: "💻",
    label: "Technical Issues",
    desc: "Website problems, payment errors, app bugs",
    href: "/contact",
  },
];

const popularArticles = [
  {
    title: "How do I track my order?",
    category: "Orders",
    href: "/track-order",
  },
  {
    title: "What payment methods are accepted?",
    category: "Payment",
    href: "/faq",
  },
  {
    title: "Can I return a religious item?",
    category: "Returns",
    href: "/faq",
  },
  {
    title: "How long does delivery take to Mwanza?",
    category: "Shipping",
    href: "/shipping-policy",
  },
  { title: "How do I reset my password?", category: "Account", href: "/faq" },
  { title: "Do you offer gift wrapping?", category: "Products", href: "/faq" },
];

export default function Help() {
  const [query, setQuery] = useState("");

  const filteredArticles = popularArticles.filter(
    (a) =>
      !query ||
      a.title.toLowerCase().includes(query.toLowerCase()) ||
      a.category.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <AppLayout>
      {/* Hero with search */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #2c2c60 100%)",
          padding: "80px 24px 80px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#D4AF37",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "2px",
            textTransform: "uppercase",
            margin: "0 0 12px",
          }}
        >
          Help Centre
        </p>
        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 42,
            margin: "0 0 14px",
          }}
        >
          How Can We Help You?
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 16,
            maxWidth: 480,
            margin: "0 auto 32px",
          }}
        >
          Search our knowledge base or browse categories below.
        </p>
        <div style={{ maxWidth: 520, margin: "0 auto", position: "relative" }}>
          <input
            type="text"
            placeholder="Search help articles… (e.g. track order, refund)"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              width: "100%",
              borderRadius: 14,
              border: "none",
              padding: "15px 18px 15px 50px",
              fontSize: 14.5,
              outline: "none",
              fontFamily: "inherit",
              boxSizing: "border-box",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 17,
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: 17,
              pointerEvents: "none",
            }}
          >
            🔍
          </span>
        </div>
      </div>

      <div
        style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px 80px" }}
      >
        {/* Categories */}
        {!query && (
          <div style={{ marginBottom: 60 }}>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 800,
                color: "#1a1a2e",
                textAlign: "center",
                margin: "0 0 30px",
              }}
            >
              Browse by Category
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 16,
              }}
              className="help-cats"
            >
              {categories.map((cat) => (
                <a
                  key={cat.label}
                  href={cat.href}
                  style={{
                    textDecoration: "none",
                    background: "#fff",
                    border: "1px solid #ebebeb",
                    borderRadius: 16,
                    padding: "24px 20px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    transition: "all 0.2s",
                    display: "block",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 6px 20px rgba(0,0,0,0.09)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "#D4AF37";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.boxShadow =
                      "0 2px 8px rgba(0,0,0,0.04)";
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "#ebebeb";
                  }}
                >
                  <div style={{ fontSize: 30, marginBottom: 12 }}>
                    {cat.icon}
                  </div>
                  <h3
                    style={{
                      margin: "0 0 6px",
                      fontSize: 14.5,
                      fontWeight: 800,
                      color: "#1a1a2e",
                    }}
                  >
                    {cat.label}
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 12.5,
                      color: "#888",
                      lineHeight: 1.55,
                    }}
                  >
                    {cat.desc}
                  </p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Articles */}
        <div style={{ marginBottom: 56 }}>
          <h2
            style={{
              fontSize: 19,
              fontWeight: 800,
              color: "#1a1a2e",
              margin: "0 0 20px",
            }}
          >
            {query ? `Results for "${query}"` : "Popular Articles"}
          </h2>
          {filteredArticles.length === 0 ? (
            <div
              style={{ textAlign: "center", padding: "40px 0", color: "#aaa" }}
            >
              <p style={{ fontSize: 36, margin: "0 0 10px" }}>🔍</p>
              <p
                style={{
                  fontSize: 15,
                  margin: "0 0 6px",
                  fontWeight: 700,
                  color: "#999",
                }}
              >
                No articles found
              </p>
              <p style={{ fontSize: 13.5, margin: 0 }}>
                Try different keywords or browse a category above.
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {filteredArticles.map((a) => (
                <a
                  key={a.title}
                  href={a.href}
                  style={{
                    textDecoration: "none",
                    background: "#fff",
                    border: "1px solid #ebebeb",
                    borderRadius: 12,
                    padding: "16px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "#D4AF37")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.borderColor =
                      "#ebebeb")
                  }
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <span style={{ fontSize: 16 }}>📄</span>
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1a1a2e",
                      }}
                    >
                      {a.title}
                    </span>
                  </div>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#C9A84C",
                      background: "#fdf4dc",
                      borderRadius: 20,
                      padding: "3px 10px",
                      flexShrink: 0,
                    }}
                  >
                    {a.category}
                  </span>
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Contact CTA */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #2c2c60)",
            borderRadius: 20,
            padding: "40px 48px",
            display: "grid",
            gridTemplateColumns: "1fr auto",
            gap: 28,
            alignItems: "center",
            flexWrap: "wrap",
          }}
          className="help-cta"
        >
          <div style={{ color: "#fff" }}>
            <h2 style={{ margin: "0 0 8px", fontSize: 19, fontWeight: 900 }}>
              Didn't Find an Answer?
            </h2>
            <p
              style={{
                margin: 0,
                fontSize: 14.5,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.7,
              }}
            >
              Our support team is available Monday – Saturday, 8 AM – 6 PM EAT.
              <br />
              Average response time: under 2 hours on business days.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              flexShrink: 0,
            }}
          >
            <a
              href="/contact"
              style={{
                background: "#D4AF37",
                color: "#1a1a2e",
                borderRadius: 12,
                padding: "11px 24px",
                fontWeight: 800,
                fontSize: 13.5,
                textDecoration: "none",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              Send a Message
            </a>
            <a
              href="https://wa.me/255712345678"
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#25D366",
                color: "#fff",
                borderRadius: 12,
                padding: "11px 24px",
                fontWeight: 800,
                fontSize: 13.5,
                textDecoration: "none",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              WhatsApp Chat
            </a>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .help-cats { grid-template-columns: repeat(2, 1fr) !important; }
            .help-cta { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 480px) {
            .help-cats { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </AppLayout>
  );
}
