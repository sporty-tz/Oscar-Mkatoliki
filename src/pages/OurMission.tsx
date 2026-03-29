import AppLayout from "../components/layout/AppLayout";

const pillars = [
  {
    icon: "🎵",
    title: "Spread Sacred Music",
    desc: "We believe music is one of the most powerful vehicles of worship. Our goal is to make authentic Catholic music — from Tanzania and across Africa — accessible and celebrated.",
  },
  {
    icon: "📖",
    title: "Nurture Faith Literacy",
    desc: "We curate books, devotionals and study guides that are doctrinally sound, locally relevant and affordable — so every Catholic can grow deeper in their faith.",
  },
  {
    icon: "🙏",
    title: "Equip the Faithful",
    desc: "From rosaries to candles to sacred art, we provide the physical tools that anchor a life of prayer — bringing the sacred into everyday Tanzanian homes.",
  },
  {
    icon: "🌍",
    title: "Uplift the Local Church",
    desc: "A portion of every purchase supports local parishes, youth groups and community outreach programmes across Tanzania.",
  },
];

const commitments = [
  {
    label: "100% Doctrinally Verified",
    desc: "Every product is reviewed against Catholic teaching",
  },
  {
    label: "Locally Sourced First",
    desc: "We prioritise Tanzanian artists and craftspeople",
  },
  {
    label: "Affordable for All",
    desc: "We keep prices accessible on essential faith items",
  },
  {
    label: "Community-Driven",
    desc: "Decisions are guided by our parish partners and customers",
  },
];

export default function OurMission() {
  return (
    <AppLayout>
      {/* Hero */}
      <div
        style={{
          background:
            "linear-gradient(160deg, #1a1a2e 0%, #2c2c60 60%, #1a2e20 100%)",
          padding: "90px 24px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 40,
            left: "10%",
            fontSize: 60,
            opacity: 0.06,
            userSelect: "none",
          }}
        >
          ✝
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 30,
            right: "8%",
            fontSize: 90,
            opacity: 0.05,
            userSelect: "none",
          }}
        >
          ✝
        </div>
        <p
          style={{
            color: "#D4AF37",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "2.5px",
            textTransform: "uppercase",
            margin: "0 0 16px",
          }}
        >
          Our Purpose
        </p>
        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 44,
            margin: "0 0 20px",
            lineHeight: 1.15,
          }}
        >
          Our Mission
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.8)",
            fontSize: 18,
            maxWidth: 640,
            margin: "0 auto 28px",
            lineHeight: 1.75,
            fontStyle: "italic",
          }}
        >
          "To make the riches of Catholic faith — in music, word and devotion —
          available to every home in Tanzania and beyond."
        </p>
      </div>

      <div
        style={{ maxWidth: 1000, margin: "0 auto", padding: "64px 24px 80px" }}
      >
        {/* Mission Statement */}
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span
            style={{
              display: "inline-block",
              width: 48,
              height: 4,
              background: "#D4AF37",
              borderRadius: 2,
              marginBottom: 24,
            }}
          />
          <h2
            style={{
              fontSize: 26,
              fontWeight: 900,
              color: "#1a1a2e",
              margin: "0 0 20px",
            }}
          >
            Why We Exist
          </h2>
          <p
            style={{
              fontSize: 16,
              color: "#555",
              lineHeight: 1.9,
              maxWidth: 700,
              margin: "0 auto 16px",
            }}
          >
            In many parts of Tanzania, a committed Catholic family cannot easily
            find a well-composed gospel album, a well-chosen Bible commentary,
            or a beautifully crafted rosary — all in one place, at a fair price,
            with reliable delivery.
          </p>
          <p
            style={{
              fontSize: 16,
              color: "#555",
              lineHeight: 1.9,
              maxWidth: 700,
              margin: "0 auto",
            }}
          >
            <strong style={{ color: "#1a1a2e" }}>
              Oscar Mkatoliki exists to change that.
            </strong>{" "}
            We believe an enriched faith life is not a luxury for the few — it
            is a birthright of every baptised Catholic.
          </p>
        </div>

        {/* Four Pillars */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#1a1a2e",
                margin: 0,
              }}
            >
              The Four Pillars
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            }}
            className="mission-2col"
          >
            {pillars.map((p, i) => (
              <div
                key={p.title}
                style={{
                  display: "flex",
                  gap: 20,
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #ebebeb",
                  padding: "26px 26px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: "#fdf4dc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 26,
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#C9A84C",
                      letterSpacing: "1px",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    Pillar {i + 1}
                  </div>
                  <h3
                    style={{
                      fontSize: 15,
                      fontWeight: 800,
                      color: "#1a1a2e",
                      margin: "0 0 8px",
                    }}
                  >
                    {p.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 13.5,
                      color: "#666",
                      lineHeight: 1.7,
                      margin: 0,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision */}
        <div
          style={{
            background: "#fdf4dc",
            border: "1px solid #eedfa8",
            borderRadius: 20,
            padding: "48px 48px",
            marginBottom: 72,
            textAlign: "center",
          }}
        >
          <p
            style={{
              color: "#C9A84C",
              fontWeight: 700,
              fontSize: 12,
              letterSpacing: "2px",
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            Vision 2030
          </p>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 900,
              color: "#1a1a2e",
              margin: "0 0 16px",
            }}
          >
            Where We Are Headed
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "#555",
              lineHeight: 1.85,
              maxWidth: 640,
              margin: "0 auto",
            }}
          >
            By 2030, we aim to serve every diocese in Tanzania, distribute 500+
            locally created Catholic titles, and establish community faith
            libraries in 100 parishes — ensuring that no Catholic community is
            without access to spiritual resources.
          </p>
        </div>

        {/* Commitments */}
        <div style={{ marginBottom: 72 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 900,
                color: "#1a1a2e",
                margin: 0,
              }}
            >
              Our Commitments
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
            className="mission-2col"
          >
            {commitments.map((c) => (
              <div
                key={c.label}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  background: "#fff",
                  borderRadius: 14,
                  border: "1px solid #ebebeb",
                  padding: "20px 22px",
                }}
              >
                <span style={{ fontSize: 18, color: "#D4AF37", marginTop: 1 }}>
                  ✓
                </span>
                <div>
                  <p
                    style={{
                      margin: "0 0 3px",
                      fontWeight: 800,
                      color: "#1a1a2e",
                      fontSize: 14,
                    }}
                  >
                    {c.label}
                  </p>
                  <p style={{ margin: 0, color: "#888", fontSize: 13 }}>
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 15, color: "#888", marginBottom: 20 }}>
            Be part of the mission.
          </p>
          <a
            href="/register"
            style={{
              display: "inline-block",
              background: "#1a1a2e",
              color: "#D4AF37",
              borderRadius: 12,
              padding: "13px 36px",
              fontWeight: 800,
              fontSize: 15,
              textDecoration: "none",
              marginRight: 12,
            }}
          >
            Join the Community
          </a>
          <a
            href="/contact"
            style={{
              display: "inline-block",
              background: "transparent",
              color: "#1a1a2e",
              borderRadius: 12,
              padding: "12px 36px",
              fontWeight: 700,
              fontSize: 15,
              textDecoration: "none",
              border: "2px solid #1a1a2e",
            }}
          >
            Partner With Us
          </a>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .mission-2col { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </AppLayout>
  );
}
