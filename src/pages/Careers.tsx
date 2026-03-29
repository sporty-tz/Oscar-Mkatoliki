import AppLayout from "../components/layout/AppLayout";

const openRoles = [
  {
    title: "Frontend Developer (React / TypeScript)",
    department: "Engineering",
    type: "Full-time",
    location: "Dar es Salaam (Hybrid)",
    desc: "Join our tech team to build beautiful, fast shopping experiences for Catholic faithful across Tanzania. You will own the customer-facing web experience.",
    skills: ["React", "TypeScript", "Tailwind / CSS", "Supabase"],
  },
  {
    title: "Customer Support Specialist",
    department: "Customer Care",
    type: "Full-time",
    location: "Dar es Salaam",
    desc: "Be the warm, helpful voice of Oscar Mkatoliki. Handle order inquiries, returns, and product questions via phone, email and WhatsApp.",
    skills: [
      "Swahili & English",
      "Customer empathy",
      "Order management systems",
    ],
  },
  {
    title: "Content Writer — Catholic Resources",
    department: "Editorial",
    type: "Part-time / Contract",
    location: "Remote (Tanzania)",
    desc: "Write devotional blog posts, product descriptions and email content that nurtures faith and inspires customers. Must have a genuine Catholic faith background.",
    skills: ["Catholic theology knowledge", "Swahili writing", "SEO basics"],
  },
  {
    title: "Logistics Coordinator",
    department: "Operations",
    type: "Full-time",
    location: "Dar es Salaam",
    desc: "Coordinate order fulfilment, courier partnerships and warehouse operations. Manage shipping timelines and oversee last-mile delivery within Dar es Salaam.",
    skills: [
      "Logistics / supply chain",
      "Excel / Google Sheets",
      "Local courier knowledge",
    ],
  },
];

const perks = [
  { icon: "✝", label: "Faith-aligned workplace" },
  { icon: "🌍", label: "Meaningful local impact" },
  { icon: "🏠", label: "Flexible / remote options" },
  { icon: "📚", label: "Learning & development budget" },
  { icon: "🎵", label: "Music & spiritual products discount" },
  { icon: "🤝", label: "Collaborative team culture" },
];

export default function Careers() {
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
            margin: "0 0 12px",
          }}
        >
          Join the Team
        </p>
        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 40,
            margin: "0 0 16px",
          }}
        >
          Careers at Oscar Mkatoliki
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.68)",
            fontSize: 16,
            maxWidth: 560,
            margin: "0 auto",
          }}
        >
          Work with a purpose. Help us bring faith, culture and community
          together for Catholics across Tanzania.
        </p>
      </div>

      <div
        style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px 80px" }}
      >
        {/* Perks */}
        <div style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#1a1a2e",
              textAlign: "center",
              margin: "0 0 32px",
            }}
          >
            Why Work With Us
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 16,
            }}
            className="careers-perks"
          >
            {perks.map((p) => (
              <div
                key={p.label}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  border: "1px solid #ebebeb",
                  padding: "22px 20px",
                  textAlign: "center",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                }}
              >
                <div style={{ fontSize: 28, marginBottom: 10 }}>{p.icon}</div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 700,
                    color: "#1a1a2e",
                    fontSize: 14,
                  }}
                >
                  {p.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Open roles */}
        <div style={{ marginBottom: 64 }}>
          <h2
            style={{
              fontSize: 22,
              fontWeight: 900,
              color: "#1a1a2e",
              margin: "0 0 8px",
            }}
          >
            Open Positions
          </h2>
          <p style={{ fontSize: 14, color: "#888", margin: "0 0 28px" }}>
            {openRoles.length} positions currently open
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {openRoles.map((role) => (
              <div
                key={role.title}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #ebebeb",
                  padding: "26px 28px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.2s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow =
                    "0 6px 24px rgba(0,0,0,0.09)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.04)")
                }
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    gap: 12,
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <h3
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: "#1a1a2e",
                        margin: "0 0 6px",
                      }}
                    >
                      {role.title}
                    </h3>
                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                      <span
                        style={{
                          background: "#fdf4dc",
                          color: "#C9A84C",
                          fontSize: 11,
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: 20,
                        }}
                      >
                        {role.department}
                      </span>
                      <span
                        style={{
                          background: "#f0f0f0",
                          color: "#555",
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 20,
                        }}
                      >
                        {role.type}
                      </span>
                      <span
                        style={{
                          background: "#f0f0f0",
                          color: "#555",
                          fontSize: 11,
                          fontWeight: 600,
                          padding: "3px 10px",
                          borderRadius: 20,
                        }}
                      >
                        📍 {role.location}
                      </span>
                    </div>
                  </div>
                  <a
                    href={`mailto:careers@oscarmkatoliki.co.tz?subject=Application: ${role.title}`}
                    style={{
                      background: "#1a1a2e",
                      color: "#D4AF37",
                      borderRadius: 10,
                      padding: "9px 20px",
                      fontSize: 13,
                      fontWeight: 700,
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    Apply Now
                  </a>
                </div>
                <p
                  style={{
                    fontSize: 13.5,
                    color: "#666",
                    lineHeight: 1.7,
                    margin: "0 0 14px",
                  }}
                >
                  {role.desc}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {role.skills.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontSize: 12,
                        background: "#f8f8f8",
                        border: "1px solid #ebebeb",
                        borderRadius: 6,
                        padding: "3px 10px",
                        color: "#777",
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Spontaneous application */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #2c2c60)",
            borderRadius: 20,
            padding: "44px 48px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h2 style={{ margin: "0 0 12px", fontSize: 22, fontWeight: 900 }}>
            Don't See a Fit?
          </h2>
          <p
            style={{
              margin: "0 0 24px",
              fontSize: 14.5,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 480,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            We are always interested in passionate, faith-driven talent. Send us
            your CV and a short note about what you would bring to our mission.
          </p>
          <a
            href="mailto:careers@oscarmkatoliki.co.tz"
            style={{
              display: "inline-block",
              background: "#D4AF37",
              color: "#1a1a2e",
              borderRadius: 12,
              padding: "12px 32px",
              fontWeight: 800,
              fontSize: 14,
              textDecoration: "none",
            }}
          >
            Send Spontaneous Application
          </a>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .careers-perks { grid-template-columns: repeat(2, 1fr) !important; }
          }
        `}</style>
      </div>
    </AppLayout>
  );
}
