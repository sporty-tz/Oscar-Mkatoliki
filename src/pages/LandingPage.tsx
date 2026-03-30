import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { useLiturgicalDay } from "../hooks/useLiturgicalDay";
import { useDailyVerse } from "../hooks/useDailyVerse";

// ─── Ministry Cards Data ───────────────────────────────────────────────────────
const MINISTRY_CARDS = [
  {
    id: "bible",
    icon: "📖",
    title: "Bible",
    desc: "Read Sacred Scripture daily. Reflect on the Word of God from the Catholic canon.",
    href: "/bible",
    headerGradient: "linear-gradient(135deg, #0c2461 0%, #1e3799 100%)",
    glowColor: "rgba(30,55,153,0.32)",
    cta: "Open Bible",
    tag: "DAILY SCRIPTURE",
    tagBg: "rgba(255,255,255,0.16)",
  },
  {
    id: "daily-saints",
    icon: "✨",
    title: "Daily Saints",
    desc: "Celebrate the feast days and discover the lives of Catholic saints every day.",
    href: "/daily-saints",
    headerGradient: "linear-gradient(135deg, #2d1b69 0%, #6c3483 100%)",
    glowColor: "rgba(108,52,131,0.32)",
    cta: "Today's Saint",
    tag: "FEAST DAY",
    tagBg: "rgba(255,255,255,0.16)",
  },
  {
    id: "sacramentals",
    icon: "✝️",
    title: "Sacramentals",
    desc: "Rosaries, medals, holy water, blessed candles and sacred items for your home.",
    href: "/shop",
    headerGradient: "linear-gradient(135deg, #0d3320 0%, #1a6b40 100%)",
    glowColor: "rgba(26,107,64,0.32)",
    cta: "Browse Items",
    tag: "BLESSED GOODS",
    tagBg: "rgba(255,255,255,0.16)",
  },
  {
    id: "shop",
    icon: "🛒",
    title: "Shop",
    desc: "Catholic music, devotional books, gifts and more — to nourish your spiritual life.",
    href: "/shop",
    headerGradient: "linear-gradient(135deg, #1a1a2e 0%, #2c2c54 100%)",
    glowColor: "rgba(212,175,55,0.22)",
    cta: "Visit the Store",
    tag: "NEW ARRIVALS",
    tagBg: "rgba(212,175,55,0.28)",
  },
  {
    id: "prayers",
    icon: "🙏",
    title: "Prayers & Novenas",
    desc: "Daily prayers, chaplets, novenas and devotionals to deepen your faith life.",
    href: "/prayers",
    headerGradient: "linear-gradient(135deg, #641e16 0%, #a93226 100%)",
    glowColor: "rgba(169,50,38,0.32)",
    cta: "Pray Now",
    tag: "DAILY PRAYER",
    tagBg: "rgba(255,255,255,0.16)",
  },
  {
    id: "donations",
    icon: "❤️",
    title: "Donations",
    desc: "Support this ministry. Your generous gift helps spread the Catholic faith further.",
    href: "/donations",
    headerGradient: "linear-gradient(135deg, #6b2fa0 0%, #9b59b6 100%)",
    glowColor: "rgba(107,47,160,0.32)",
    cta: "Give Today",
    tag: "SUPPORT US",
    tagBg: "rgba(255,255,255,0.16)",
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

  // Pill label: feast name when known, else liturgical season, else "Word of the Day"
  const pillLabel = liturgical.loading
    ? dateStr
    : liturgical.feastName
      ? `${liturgical.feastName} · ${dateStr}`
      : liturgical.seasonDisplay
        ? `${liturgical.seasonDisplay} · ${dateStr}`
        : dateStr;

  // Fallback verse while loading or on error
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

  // Liturgical colour accent (subtle override for hero glow when not default)
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
          "linear-gradient(160deg, #080f1e 0%, #111827 50%, #0d1f3c 100%)",
        overflow: "hidden",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* Large decorative cross — background */}
      <div
        style={{
          position: "absolute",
          right: "6%",
          top: "50%",
          transform: "translateY(-50%)",
          opacity: 0.055,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        <svg width="560" height="560" viewBox="0 0 100 100" fill="none">
          <line
            x1="50"
            y1="4"
            x2="50"
            y2="96"
            stroke="#D4AF37"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <line
            x1="16"
            y1="28"
            x2="84"
            y2="28"
            stroke="#D4AF37"
            strokeWidth="8"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Radial gold glow */}
      <div
        style={{
          position: "absolute",
          left: "30%",
          top: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,175,55,0.065) 0%, transparent 60%)",
          pointerEvents: "none",
        }}
      />

      <div
        className="landing-hero-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "88px 48px",
          position: "relative",
          zIndex: 1,
          width: "100%",
        }}
      >
        {/* Date / occasion pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(212,175,55,0.1)",
            border: "1px solid rgba(212,175,55,0.28)",
            borderRadius: 50,
            padding: "6px 18px",
            marginBottom: 32,
          }}
        >
          <span style={{ fontSize: 11, color: "#D4AF37" }}>✝</span>
          <span
            style={{
              fontSize: 12.5,
              color: "rgba(212,175,55,0.85)",
              fontWeight: 600,
              letterSpacing: "0.4px",
            }}
          >
            {pillLabel}
          </span>
        </div>

        {/* Brand name */}
        <p
          style={{
            fontSize: 12.5,
            fontWeight: 800,
            color: "#D4AF37",
            letterSpacing: "3.5px",
            textTransform: "uppercase",
            margin: "0 0 22px",
          }}
        >
          Oscar Mkatoliki
        </p>

        {/* Verse */}
        <h1
          className="lhero-h1"
          style={{
            fontSize: 46,
            fontWeight: 800,
            color: "#fff",
            lineHeight: 1.16,
            maxWidth: 660,
            margin: "0 0 18px",
            fontStyle: "italic",
            letterSpacing: "-0.5px",
          }}
        >
          &ldquo;{verseText}&rdquo;
        </h1>

        {/* Reference */}
        <p
          style={{
            fontSize: 14.5,
            color: accentColor,
            fontWeight: 700,
            margin: "0 0 16px",
            paddingLeft: 20,
            borderLeft: `3px solid ${accentColor}`,
          }}
        >
          {verseRef && `— ${verseRef}`}
        </p>

        {/* Tagline */}
        <p
          style={{
            fontSize: 16,
            color: "rgba(255,255,255,0.58)",
            margin: "0 0 48px",
            lineHeight: 1.65,
            maxWidth: 520,
          }}
        >
          Your Catholic faith companion — scripture, saints, prayers and a store
          for sacred living.
        </p>

        {/* CTA buttons */}
        <div
          className="lhero-ctas"
          style={{ display: "flex", gap: 14, flexWrap: "wrap" }}
        >
          <a
            href="#ministries"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "linear-gradient(135deg, #D4AF37, #C9A84C)",
              color: "#0f1623",
              padding: "14px 34px",
              borderRadius: 50,
              fontWeight: 800,
              fontSize: 14.5,
              textDecoration: "none",
              letterSpacing: "0.2px",
              boxShadow: "0 6px 26px rgba(212,175,55,0.28)",
              transition: "opacity 0.15s, transform 0.15s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.88";
              e.currentTarget.style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
              e.currentTarget.style.transform = "";
            }}
          >
            Explore All Features ↓
          </a>
          <a
            href="/shop"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "transparent",
              color: "rgba(255,255,255,0.82)",
              padding: "14px 34px",
              borderRadius: 50,
              fontWeight: 600,
              fontSize: 14.5,
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
              e.currentTarget.style.color = "rgba(255,255,255,0.82)";
            }}
          >
            Visit the Shop →
          </a>
        </div>
      </div>

      {/* Bottom fade into next section */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 90,
          background:
            "linear-gradient(to bottom, transparent, rgba(8,15,30,0.75))",
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
        background: "#f8f6f2",
        padding: "80px 0 96px",
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              marginBottom: 18,
            }}
          >
            <div
              style={{
                height: 1,
                width: 52,
                background: "linear-gradient(to right, transparent, #D4AF37)",
              }}
            />
            <span style={{ color: "#D4AF37", fontSize: 18, lineHeight: 1 }}>
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
              fontSize: 32,
              fontWeight: 800,
              color: "#1a1a2e",
              margin: "0 0 12px",
              letterSpacing: "-0.4px",
            }}
          >
            Grow in Faith, One Step at a Time
          </h2>
          <p
            style={{
              color: "#888",
              fontSize: 15,
              margin: "0 auto",
              lineHeight: 1.65,
              maxWidth: 520,
            }}
          >
            Explore our Catholic ministries — from Scripture and prayer to
            sacred goods and community giving.
          </p>
        </div>

        {/* 3 × 2 grid */}
        <div
          className="ministry-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 24,
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
                borderRadius: 20,
                overflow: "hidden",
                border: "1.5px solid #f0ece4",
                cursor: "pointer",
                transition:
                  "box-shadow 0.22s, transform 0.22s, border-color 0.22s",
                display: "flex",
                flexDirection: "column",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = `0 16px 48px ${card.glowColor}`;
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "transparent";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "";
                e.currentTarget.style.transform = "";
                e.currentTarget.style.borderColor = "#f0ece4";
              }}
            >
              {/* Coloured gradient header */}
              <div
                style={{
                  background: card.headerGradient,
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
                    width: 130,
                    height: 130,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.07)",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    left: -22,
                    top: -22,
                    width: 88,
                    height: 88,
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.06)",
                  }}
                />
                {/* Tag */}
                <span
                  style={{
                    position: "absolute",
                    top: 14,
                    left: 16,
                    background: card.tagBg,
                    color: "rgba(255,255,255,0.9)",
                    fontSize: 9.5,
                    fontWeight: 800,
                    padding: "4px 11px",
                    borderRadius: 4,
                    letterSpacing: "0.8px",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {card.tag}
                </span>
                {/* Icon */}
                <span
                  style={{
                    fontSize: 56,
                    position: "relative",
                    zIndex: 1,
                    filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.22))",
                    lineHeight: 1,
                  }}
                >
                  {card.icon}
                </span>
              </div>

              {/* Card body */}
              <div
                style={{
                  padding: "22px 24px 28px",
                  display: "flex",
                  flexDirection: "column",
                  flex: 1,
                }}
              >
                <h3
                  style={{
                    fontSize: 19,
                    fontWeight: 800,
                    color: "#1a1a2e",
                    margin: "0 0 8px",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "#777",
                    lineHeight: 1.6,
                    margin: "0 0 22px",
                    flex: 1,
                  }}
                >
                  {card.desc}
                </p>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1a1a2e",
                  }}
                >
                  {card.cta}
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
          .ministry-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
          .ministry-card { border-radius: 14px !important; }
        }
      `}</style>
    </section>
  );
}

// ─── Faith Pillars Strip ───────────────────────────────────────────────────────
function FaithPillars() {
  const pillars = [
    {
      symbol: "✝",
      title: "Rooted in Tradition",
      desc: "Two thousand years of Catholic wisdom, prayer and devotion.",
      color: "#1a3a6e",
      bg: "#edf2fb",
    },
    {
      symbol: "📿",
      title: "Guided by Scripture",
      desc: "The living Word of God at the heart of everything we offer.",
      color: "#6c3483",
      bg: "#f5eefb",
    },
    {
      symbol: "🤝",
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
                  fontSize: 20,
                  flexShrink: 0,
                  boxShadow: "0 2px 10px rgba(0,0,0,0.07)",
                  color: p.color,
                  fontWeight: 800,
                }}
              >
                {p.symbol}
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
      }}
    >
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        {/* Gold cross divider */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 14,
            marginBottom: 30,
          }}
        >
          <div
            style={{
              height: 1,
              width: 52,
              background: "linear-gradient(to right, transparent, #D4AF37)",
            }}
          />
          <span style={{ color: "#D4AF37", fontSize: 20, lineHeight: 1 }}>
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
            fontSize: 32,
            fontWeight: 800,
            color: "#fff",
            margin: "0 0 14px",
            letterSpacing: "-0.4px",
            lineHeight: 1.22,
          }}
        >
          Bringing Catholic Faith to Every Home
        </h2>
        <p
          style={{
            fontSize: 15.5,
            color: "rgba(255,255,255,0.58)",
            margin: "0 0 44px",
            lineHeight: 1.7,
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
              gap: 8,
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
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.87")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            📱 Get the App
          </a>
          <a
            href="/find-parish"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
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
            ⛪ Find a Parish
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
