import AppLayout from "../components/layout/AppLayout";

const stats = [
  { value: "50,000+", label: "Products Delivered" },
  { value: "12,000+", label: "Happy Customers" },
  { value: "200+", label: "Faith Products" },
  { value: "5 Years", label: "Serving Tanzania" },
];

const values = [
  {
    icon: "✝",
    title: "Faith First",
    desc: "Every product, every decision, every partnership is filtered through the lens of authentic Catholic faith. We never compromise on the spiritual integrity of what we offer.",
  },
  {
    icon: "🤝",
    title: "Community",
    desc: "We are more than a shop — we are a gathering place for the Catholic faithful across Tanzania and East Africa to connect, support and inspire one another.",
  },
  {
    icon: "🌍",
    title: "Local Impact",
    desc: "We partner with Tanzanian artisans, musicians and publishers whenever possible, ensuring that your purchases create economic opportunity right here at home.",
  },
  {
    icon: "📖",
    title: "Authentic Teaching",
    desc: "All books, devotionals, music and media we carry align with the Magisterium of the Catholic Church — so you can shop with confidence.",
  },
];

const team = [
  {
    name: "Oscar Mkatoliki",
    role: "Founder & Lead Artist",
    initials: "OM",
    bio: "Dar es Salaam-born gospel artist and Catholic lay minister, Oscar founded this platform to make quality faith resources accessible to every Catholic household in Tanzania.",
  },
  {
    name: "Sr. Agnes Mtoto",
    role: "Faith Resources Director",
    initials: "AM",
    bio: "A Benedictine sister with a theology degree from Hekima University College, Sr. Agnes curates every book and devotional to ensure doctrinal accuracy and spiritual depth.",
  },
  {
    name: "David Kileo",
    role: "Head of Logistics",
    initials: "DK",
    bio: "15 years of supply-chain experience across East Africa. David ensures your order reaches you safely, quickly, and with care.",
  },
];

export default function AboutUs() {
  return (
    <AppLayout>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #2c2c60 100%)",
          padding: "80px 24px 70px",
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
            margin: "0 0 14px",
          }}
        >
          Our Story
        </p>
        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 42,
            margin: "0 0 16px",
            lineHeight: 1.2,
          }}
        >
          About Oscar Mkatoliki
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.7)",
            fontSize: 16,
            maxWidth: 600,
            margin: "0 auto",
            lineHeight: 1.75,
          }}
        >
          Bringing the beauty of Catholic faith to every home in Tanzania —
          through music, books, art and devotional gifts.
        </p>
      </div>

      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "64px 24px 80px" }}
      >
        {/* Origin Story */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 60,
            alignItems: "center",
            marginBottom: 80,
          }}
          className="about-2col"
        >
          <div>
            <span
              style={{
                display: "inline-block",
                width: 48,
                height: 4,
                background: "#D4AF37",
                borderRadius: 2,
                marginBottom: 18,
              }}
            />
            <h2
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#1a1a2e",
                margin: "0 0 16px",
                lineHeight: 1.3,
              }}
            >
              How It All Began
            </h2>
            <p
              style={{
                fontSize: 15,
                color: "#555",
                lineHeight: 1.85,
                marginBottom: 16,
              }}
            >
              Oscar Mkatoliki started as a passion project in a small apartment
              in Kinondoni, Dar es Salaam. Oscar, a gistriano musician and
              committed Catholic, noticed a glaring gap: there was no reliable
              source for high-quality Catholic music, books and devotional items
              in Tanzania.
            </p>
            <p
              style={{
                fontSize: 15,
                color: "#555",
                lineHeight: 1.85,
                marginBottom: 16,
              }}
            >
              What began as sharing CDs at Sunday Mass grew into a full-fledged
              online store. Today we serve thousands of families across
              Tanzania, shipping everything from prayer beads to award-winning
              gospel albums.
            </p>
            <p style={{ fontSize: 15, color: "#555", lineHeight: 1.85 }}>
              We remain family-owned, parish-rooted and deeply committed to the
              Catholic faith that inspired our founding.
            </p>
          </div>
          <div
            style={{
              background: "linear-gradient(135deg, #1a1a2e, #2c2c60)",
              borderRadius: 20,
              aspectRatio: "4/3",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 80,
            }}
          >
            ✝
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            background: "#fdf4dc",
            borderRadius: 20,
            padding: "48px 40px",
            marginBottom: 80,
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 24,
              textAlign: "center",
            }}
            className="about-stats"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div
                  style={{
                    fontSize: 32,
                    fontWeight: 900,
                    color: "#1a1a2e",
                    marginBottom: 6,
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: 13, color: "#888", fontWeight: 500 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span
              style={{
                display: "inline-block",
                width: 48,
                height: 4,
                background: "#D4AF37",
                borderRadius: 2,
                marginBottom: 14,
              }}
            />
            <h2
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#1a1a2e",
                margin: 0,
              }}
            >
              What We Stand For
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 20,
            }}
            className="about-values"
          >
            {values.map((v) => (
              <div
                key={v.title}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #ebebeb",
                  padding: "28px 28px",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ fontSize: 32, marginBottom: 12 }}>{v.icon}</div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#1a1a2e",
                    margin: "0 0 10px",
                  }}
                >
                  {v.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#666",
                    lineHeight: 1.75,
                    margin: 0,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <span
              style={{
                display: "inline-block",
                width: 48,
                height: 4,
                background: "#D4AF37",
                borderRadius: 2,
                marginBottom: 14,
              }}
            />
            <h2
              style={{
                fontSize: 28,
                fontWeight: 900,
                color: "#1a1a2e",
                margin: 0,
              }}
            >
              Meet the Team
            </h2>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 24,
            }}
            className="about-team"
          >
            {team.map((m) => (
              <div
                key={m.name}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #ebebeb",
                  padding: "28px 24px",
                  textAlign: "center",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #1a1a2e, #2c2c60)",
                    border: "3px solid #D4AF37",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#D4AF37",
                    fontWeight: 800,
                    fontSize: 20,
                    margin: "0 auto 14px",
                  }}
                >
                  {m.initials}
                </div>
                <h3
                  style={{
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#1a1a2e",
                    margin: "0 0 4px",
                  }}
                >
                  {m.name}
                </h3>
                <p
                  style={{
                    fontSize: 12,
                    color: "#C9A84C",
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.8px",
                    margin: "0 0 12px",
                  }}
                >
                  {m.role}
                </p>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "#666",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {m.bio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #2c2c60)",
            borderRadius: 20,
            padding: "52px 40px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h2 style={{ margin: "0 0 12px", fontSize: 26, fontWeight: 900 }}>
            Join Our Community
          </h2>
          <p
            style={{
              margin: "0 0 28px",
              fontSize: 15,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 500,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Whether you are a long-time Catholic or just beginning your faith
            journey, there is a place for you here.
          </p>
          <a
            href="/register"
            style={{
              display: "inline-block",
              background: "#D4AF37",
              color: "#1a1a2e",
              borderRadius: 12,
              padding: "13px 36px",
              fontWeight: 800,
              fontSize: 15,
              textDecoration: "none",
            }}
          >
            Create Free Account
          </a>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .about-2col { grid-template-columns: 1fr !important; gap: 32px !important; }
            .about-stats { grid-template-columns: repeat(2, 1fr) !important; }
            .about-values { grid-template-columns: 1fr !important; }
            .about-team  { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </AppLayout>
  );
}
