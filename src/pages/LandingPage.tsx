import React from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { useLiturgicalDay } from "../hooks/useLiturgicalDay";
import { useDailyVerse } from "../hooks/useDailyVerse";

// ─── Ministry Cards Data ───────────────────────────────────────────────────────
const MINISTRY_CARDS = [
  {
    id: "bible",
    title: "Sacred Scripture",
    desc: "Read the Word of God daily — all 73 books of the Catholic Bible in the Douay-Rheims translation.",
    href: "/bible",
    accentColor: "#1e3799",
    accentLight: "#eef2ff",
    cta: "Open Bible",
    tag: "DAILY SCRIPTURE",
    svgPath:
      "M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",
  },
  {
    id: "daily-saints",
    title: "Daily Saints",
    desc: "Celebrate feast days and discover the lives of holy men and women from the Catholic calendar.",
    href: "/daily-saints",
    accentColor: "#6c3483",
    accentLight: "#f5eefb",
    cta: "Today's Saint",
    tag: "FEAST DAY",
    svgPath:
      "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  },
  {
    id: "sacramentals",
    title: "Sacramentals",
    desc: "Rosaries, medals, holy water, blessed candles and sacred items to sanctify your home and life.",
    href: "/shop",
    accentColor: "#1a6b40",
    accentLight: "#edfaf3",
    cta: "Browse Items",
    tag: "BLESSED GOODS",
    svgPath: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  },
  {
    id: "shop",
    title: "Our Store",
    desc: "Catholic music, devotional books, gifts and artworks — curated to nourish your spiritual life.",
    href: "/shop",
    accentColor: "#92400e",
    accentLight: "#fef3c7",
    cta: "Visit the Store",
    tag: "NEW ARRIVALS",
    svgPath:
      "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z M3 6h18 M16 10a4 4 0 0 1-8 0",
  },
  {
    id: "prayers",
    title: "Prayers & Novenas",
    desc: "Daily prayers, chaplets, novenas and the Liturgy of the Hours — a treasury of Catholic devotion.",
    href: "/prayers",
    accentColor: "#a93226",
    accentLight: "#fdf0ee",
    cta: "Pray Now",
    tag: "DAILY PRAYER",
    svgPath:
      "M18 8h1a4 4 0 0 1 0 8h-1 M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z M6 1v3 M10 1v3 M14 1v3",
  },
  {
    id: "donations",
    title: "Support Ministry",
    desc: "Your generous gift helps spread the Catholic faith and sustain this work for God's glory.",
    href: "/donations",
    accentColor: "#6b2fa0",
    accentLight: "#f5eefb",
    cta: "Give Today",
    tag: "SUPPORT US",
    svgPath:
      "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  },
];

// ─── Landing Hero Section ──────────────────────────────────────────────────────
function LandingHero() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const liturgical = useLiturgicalDay();
  const dailyVerse = useDailyVerse(liturgical.season);

  const pillLabel = liturgical.loading
    ? dateStr
    : liturgical.feastName
      ? `${liturgical.feastName} · ${dateStr}`
      : liturgical.seasonDisplay
        ? `${liturgical.seasonDisplay} · ${dateStr}`
        : dateStr;

  const verseText = dailyVerse.loading
    ? "Be still, and know that I am God."
    : dailyVerse.error
      ? "Come to me, all you who are weary and burdened, and I will give you rest."
      : dailyVerse.text;
  const verseRef = dailyVerse.loading
    ? ""
    : dailyVerse.error
      ? "Matthew 11:28"
      : dailyVerse.reference;

  const accentColor =
    !liturgical.loading && liturgical.colorHex !== "#2d6a4f"
      ? liturgical.colorHex
      : "#D4AF37";

  return (
    <section
      className="landing-hero"
      style={{
        position: "relative",
        background:
          "linear-gradient(150deg, #06101f 0%, #0d1a30 55%, #111827 100%)",
        overflow: "hidden",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Subtle grain texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
          pointerEvents: "none",
          opacity: 0.35,
        }}
      />

      {/* Left radial glow */}
      <div
        style={{
          position: "absolute",
          left: "20%",
          top: "40%",
          transform: "translate(-50%, -50%)",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${accentColor}18 0%, transparent 65%)`,
          pointerEvents: "none",
          transition: "background 1s",
        }}
      />

      {/* Right statue glow halo */}
      <div
        style={{
          position: "absolute",
          right: "8%",
          top: "48%",
          transform: "translateY(-50%)",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.13) 0%, transparent 68%)",
          pointerEvents: "none",
        }}
      />

      {/* Two-column inner */}
      <div
        className="landing-hero-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "80px 48px",
          position: "relative",
          zIndex: 1,
          width: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 420px",
          alignItems: "center",
          gap: 48,
        }}
      >
        {/* ── Left: text content ── */}
        <div>
          {/* Liturgical date pill */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(212,175,55,0.08)",
              border: "1px solid rgba(212,175,55,0.24)",
              borderRadius: 50,
              padding: "6px 16px 6px 10px",
              marginBottom: 36,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: "rgba(212,175,55,0.15)",
                color: "#D4AF37",
                fontSize: 11,
                fontWeight: 800,
              }}
            >
              ✝
            </span>
            <span
              style={{
                fontSize: 12,
                color: "rgba(212,175,55,0.8)",
                fontWeight: 600,
                letterSpacing: "0.3px",
              }}
            >
              {pillLabel}
            </span>
          </div>

          {/* Brand label */}
          <p
            style={{
              fontSize: 11.5,
              fontWeight: 800,
              color: "#D4AF37",
              letterSpacing: "4px",
              textTransform: "uppercase",
              margin: "0 0 20px",
              opacity: 0.75,
            }}
          >
            Oscar Mkatoliki
          </p>

          {/* Verse headline */}
          <h1
            className="lhero-h1"
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "#fff",
              lineHeight: 1.14,
              maxWidth: 620,
              margin: "0 0 20px",
              fontStyle: "italic",
              letterSpacing: "-0.6px",
            }}
          >
            &ldquo;{verseText}&rdquo;
          </h1>

          {/* Scripture reference */}
          {verseRef && (
            <p
              style={{
                fontSize: 13.5,
                color: accentColor,
                fontWeight: 700,
                margin: "0 0 18px",
                paddingLeft: 16,
                borderLeft: `2px solid ${accentColor}`,
                transition: "color 0.6s, border-color 0.6s",
              }}
            >
              — {verseRef}
            </p>
          )}

          {/* Tagline */}
          <p
            style={{
              fontSize: 15.5,
              color: "rgba(255,255,255,0.48)",
              margin: "0 0 48px",
              lineHeight: 1.7,
              maxWidth: 480,
            }}
          >
            Your Catholic faith companion — scripture, saints, prayers and a
            store for sacred living.
          </p>

          {/* CTA row */}
          <div
            className="lhero-ctas"
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <a
              href="#ministries"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "linear-gradient(135deg, #D4AF37 0%, #b8922a 100%)",
                color: "#06101f",
                padding: "13px 30px",
                borderRadius: 50,
                fontWeight: 800,
                fontSize: 14,
                textDecoration: "none",
                letterSpacing: "0.1px",
                boxShadow: "0 8px 28px rgba(212,175,55,0.3)",
                transition: "opacity 0.15s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = "0.88";
                e.currentTarget.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = "1";
                e.currentTarget.style.transform = "";
              }}
            >
              Explore Ministries
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
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </a>
            <a
              href="/shop"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: "rgba(255,255,255,0.75)",
                padding: "13px 30px",
                borderRadius: 50,
                fontWeight: 600,
                fontSize: 14,
                textDecoration: "none",
                border: "1px solid rgba(255,255,255,0.15)",
                transition: "border-color 0.18s, color 0.18s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(212,175,55,0.45)";
                e.currentTarget.style.color = "#D4AF37";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "rgba(255,255,255,0.75)";
              }}
            >
              Visit the Shop
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
        </div>

        {/* ── Right: statue image ── */}
        <div
          className="lhero-statue"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          {/* Decorative gold ring behind statue */}
          <div
            style={{
              position: "absolute",
              bottom: "12%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 340,
              height: 340,
              borderRadius: "50%",
              border: "1px solid rgba(212,175,55,0.18)",
              pointerEvents: "none",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "8%",
              left: "50%",
              transform: "translateX(-50%)",
              width: 390,
              height: 390,
              borderRadius: "50%",
              border: "1px solid rgba(212,175,55,0.09)",
              pointerEvents: "none",
            }}
          />

          <img
            src="/images/golden-statue.jpg"
            alt="Our Lady — Golden statue"
            style={{
              width: "100%",
              maxWidth: 380,
              height: 520,
              objectFit: "cover",
              objectPosition: "top center",
              borderRadius: 24,
              boxShadow:
                "0 24px 80px rgba(0,0,0,0.55), 0 0 0 1px rgba(212,175,55,0.12)",
              display: "block",
              position: "relative",
              zIndex: 1,
            }}
          />

          {/* Floating translation badge */}
          <div
            style={{
              position: "absolute",
              bottom: 22,
              left: 0,
              background: "rgba(8,16,31,0.88)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(212,175,55,0.2)",
              borderRadius: 14,
              padding: "12px 18px",
              zIndex: 2,
              maxWidth: 200,
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: 10.5,
                fontWeight: 800,
                color: "#D4AF37",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                marginBottom: 3,
              }}
            >
              Translation
            </p>
            <p
              style={{
                margin: 0,
                fontSize: 13,
                fontWeight: 700,
                color: "#fff",
              }}
            >
              Douay-Rheims Bible
            </p>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 80,
          background:
            "linear-gradient(to bottom, transparent, rgba(6,16,31,0.7))",
          pointerEvents: "none",
        }}
      />
    </section>
  );
}

// ─── Ministry Cards Section ────────────────────────────────────────────────────
function MinistryCards() {
  const navigate = useNavigate();

  return (
    <section
      id="ministries"
      style={{
        background: "#f7f4ef",
        padding: "96px 0 104px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: "#D4AF37",
              letterSpacing: "3.5px",
              textTransform: "uppercase",
              margin: "0 0 16px",
            }}
          >
            Our Ministries
          </p>
          <h2
            style={{
              fontSize: 34,
              fontWeight: 800,
              color: "#1a1a2e",
              margin: "0 0 14px",
              letterSpacing: "-0.5px",
              lineHeight: 1.18,
            }}
          >
            Everything for Your Catholic Life
          </h2>
          <p
            style={{
              color: "#9a9a9a",
              fontSize: 15,
              margin: "0 auto",
              lineHeight: 1.65,
              maxWidth: 480,
            }}
          >
            Scripture, saints, prayer and a sacred goods store — all in one
            faithful companion.
          </p>
        </div>

        {/* 3 × 2 grid */}
        <div
          className="ministry-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
        >
          {MINISTRY_CARDS.map((card) => (
            <div
              key={card.id}
              className="ministry-card"
              onClick={() => navigate(card.href)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && navigate(card.href)}
              style={{
                background: "#fff",
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid #ede8df",
                cursor: "pointer",
                transition: "box-shadow 0.22s, transform 0.22s",
                display: "flex",
                flexDirection: "column",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 20px 56px rgba(0,0,0,0.1)`;
                e.currentTarget.style.transform = "translateY(-4px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.transform = "";
              }}
            >
              {/* Top accent bar */}
              <div
                style={{
                  height: 3,
                  background: card.accentColor,
                  opacity: 0.85,
                }}
              />

              {/* Card body */}
              <div
                style={{
                  padding: "28px 26px 26px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                {/* Icon + tag row */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    marginBottom: 20,
                  }}
                >
                  {/* SVG icon box */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 13,
                      background: card.accentLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg
                      width="22"
                      height="22"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke={card.accentColor}
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      {card.svgPath.split(" M").map((segment, i) => {
                        const d = i === 0 ? segment : "M" + segment;
                        return <path key={i} d={d} />;
                      })}
                    </svg>
                  </div>

                  {/* Tag pill */}
                  <span
                    style={{
                      fontSize: 9.5,
                      fontWeight: 800,
                      color: card.accentColor,
                      background: card.accentLight,
                      padding: "4px 10px",
                      borderRadius: 50,
                      letterSpacing: "0.6px",
                    }}
                  >
                    {card.tag}
                  </span>
                </div>

                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 800,
                    color: "#1a1a2e",
                    margin: "0 0 9px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "#888",
                    lineHeight: 1.62,
                    margin: "0 0 24px",
                    flex: 1,
                  }}
                >
                  {card.desc}
                </p>

                {/* CTA link */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    color: card.accentColor,
                  }}
                >
                  {card.cta}
                  <svg
                    width="13"
                    height="13"
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ministry-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
        }
        @media (max-width: 480px) {
          .ministry-grid { grid-template-columns: 1fr 1fr !important; gap: 10px !important; }
          .ministry-card { border-radius: 14px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Faith Pillars Strip ───────────────────────────────────────────────────────
const PILLAR_ICONS: Record<string, React.ReactElement> = {
  tradition: (
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
      <line x1="12" y1="2" x2="12" y2="22" />
      <line x1="4" y1="10" x2="20" y2="10" />
    </svg>
  ),
  scripture: (
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
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  ),
  service: (
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
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
};

function FaithPillars() {
  const pillars = [
    {
      iconKey: "tradition",
      title: "Rooted in Tradition",
      desc: "Two thousand years of Catholic wisdom, prayer and devotion.",
      color: "#1a3a6e",
      bg: "#edf2fb",
    },
    {
      iconKey: "scripture",
      title: "Guided by Scripture",
      desc: "The living Word of God at the heart of everything we offer.",
      color: "#6c3483",
      bg: "#f5eefb",
    },
    {
      iconKey: "service",
      title: "Serving the Church",
      desc: "Supporting parishes, families and individuals in their faith walk.",
      color: "#1a6b40",
      bg: "#edfaf3",
    },
  ];

  return (
    <section
      style={{
        background: "#fff",
        padding: "64px 0",
        borderTop: "1px solid #f0ece4",
        borderBottom: "1px solid #f0ece4",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <div
          className="pillars-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
          }}
        >
          {pillars.map((p) => (
            <div
              key={p.title}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 18,
                padding: "28px 28px",
                background: p.bg,
                borderRadius: 18,
                border: "1.5px solid transparent",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = p.color + "35";
                e.currentTarget.style.boxShadow = `0 6px 24px ${p.color}14`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 14,
                  background: "#fff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                  color: p.color,
                }}
              >
                {PILLAR_ICONS[p.iconKey]}
              </div>
              <div>
                <h3
                  style={{
                    fontSize: 15.5,
                    fontWeight: 800,
                    color: "#1a1a2e",
                    margin: "0 0 7px",
                    letterSpacing: "-0.1px",
                  }}
                >
                  {p.title}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "#888",
                    margin: 0,
                    lineHeight: 1.6,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pillars-grid { grid-template-columns: 1fr !important; gap: 12px !important; }
        }
        @media (max-width: 640px) {
          .lhero-h1 { font-size: 28px !important; }
          .landing-hero-inner { padding: 64px 20px !important; }
          .landing-hero { min-height: 78vh !important; }
          .lhero-ctas { flex-direction: column !important; }
          .lhero-ctas a { text-align: center !important; justify-content: center !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Mission CTA Band ──────────────────────────────────────────────────────────
function MissionCTA() {
  return (
    <section
      style={{
        background: "linear-gradient(160deg, #080f1e 0%, #1a1a2e 100%)",
        padding: "88px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle radial glow */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 660,
          height: 360,
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(212,175,55,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: 660,
          margin: "0 auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Stat strip */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 20,
            background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.22)",
            borderRadius: 50,
            padding: "8px 24px",
            marginBottom: 36,
          }}
        >
          {[
            { value: "73", label: "Books" },
            { value: "140+", label: "Saints" },
            { value: "17", label: "Prayers" },
          ].map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: i > 0 ? 20 : 0,
              }}
            >
              {i > 0 && (
                <div
                  style={{
                    width: 1,
                    height: 18,
                    background: "rgba(212,175,55,0.25)",
                  }}
                />
              )}
              <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                <span
                  style={{ color: "#D4AF37", fontWeight: 800, fontSize: 15 }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    color: "rgba(255,255,255,0.45)",
                    fontSize: 11,
                    fontWeight: 500,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Gold line divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            marginBottom: 28,
          }}
        >
          <div
            style={{
              height: 1,
              width: 52,
              background: "linear-gradient(to right, transparent, #D4AF37)",
            }}
          />
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="12" y1="2" x2="12" y2="22" />
            <line x1="4" y1="10" x2="20" y2="10" />
          </svg>
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
            fontSize: 34,
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 16px",
            letterSpacing: "-0.5px",
            lineHeight: 1.2,
          }}
        >
          Bringing Catholic Faith
          <br />
          to Every Home
        </h2>
        <p
          style={{
            fontSize: 15.5,
            color: "rgba(255,255,255,0.52)",
            margin: "0 0 44px",
            lineHeight: 1.75,
          }}
        >
          Music, books, prayers and sacred goods — all in one place, rooted in
          the richness of the Catholic tradition.
        </p>

        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="/get-app"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "linear-gradient(135deg, #D4AF37, #C9A84C)",
              color: "#0f1623",
              padding: "14px 30px",
              borderRadius: 50,
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none",
              boxShadow: "0 6px 22px rgba(212,175,55,0.26)",
              transition: "opacity 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            Get the App
          </a>
          <a
            href="/find-parish"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 9,
              background: "transparent",
              color: "rgba(255,255,255,0.78)",
              padding: "14px 30px",
              borderRadius: 50,
              fontWeight: 600,
              fontSize: 14,
              textDecoration: "none",
              border: "1.5px solid rgba(255,255,255,0.18)",
              transition: "border-color 0.15s, color 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "rgba(212,175,55,0.5)";
              e.currentTarget.style.color = "#D4AF37";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
              e.currentTarget.style.color = "rgba(255,255,255,0.78)";
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Find a Parish
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Page Export ───────────────────────────────────────────────────────────────
export default function LandingPage() {
  return (
    <AppLayout hideCategoryNav>
      <LandingHero />
      <MinistryCards />
      <FaithPillars />
      <MissionCTA />
    </AppLayout>
  );
}
