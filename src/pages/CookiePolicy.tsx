import AppLayout from "../components/layout/AppLayout";

const cookieTypes = [
  {
    name: "Strictly Necessary",
    color: "#2d7a2d",
    bg: "#eafbea",
    description:
      "These cookies are essential for the website to function. They enable core features such as security, authentication and shopping cart management. They cannot be disabled.",
    examples: ["Session cookies", "Authentication tokens", "Cart state"],
    canDisable: false,
  },
  {
    name: "Functional",
    color: "#1a6aa5",
    bg: "#e8f3fb",
    description:
      "These cookies remember your preferences and choices to provide a more personalised experience, such as your preferred language or region.",
    examples: [
      "Language preference",
      "Currency setting",
      "Recently viewed products",
    ],
    canDisable: true,
  },
  {
    name: "Analytics",
    color: "#b07d00",
    bg: "#fff8e1",
    description:
      "We use analytics cookies (via privacy-respecting tools) to understand how visitors interact with our website — which pages are popular, how long visitors stay, and where they came from. This helps us improve our content.",
    examples: ["Page views", "Session duration", "Traffic source"],
    canDisable: true,
  },
  {
    name: "Marketing",
    color: "#9c3030",
    bg: "#fff0f0",
    description:
      "Marketing cookies track your visit to our website and other sites in order to deliver advertising relevant to you and your interests. We currently do not use third-party advertising cookies.",
    examples: ["Ad targeting", "Cross-site tracking"],
    canDisable: true,
  },
];

export default function CookiePolicy() {
  return (
    <AppLayout>
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #2c2c60 100%)",
          padding: "60px 24px 50px",
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
          Legal
        </p>
        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 36,
            margin: "0 0 14px",
          }}
        >
          Cookie Policy
        </h1>
        <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 15, margin: 0 }}>
          Last updated: 29 March 2026
        </p>
      </div>

      <div
        style={{ maxWidth: 820, margin: "0 auto", padding: "56px 24px 80px" }}
      >
        <p
          style={{
            fontSize: 15,
            color: "#555",
            lineHeight: 1.8,
            marginBottom: 48,
          }}
        >
          This Cookie Policy explains what cookies are, how Oscar Mkatoliki uses
          them, and how you can control your cookie preferences. By continuing
          to use our website you consent to our use of cookies as described
          below.
        </p>

        <h2
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#1a1a2e",
            margin: "0 0 16px",
            paddingBottom: 10,
            borderBottom: "2px solid #f0f0f0",
          }}
        >
          What Are Cookies?
        </h2>
        <p
          style={{
            fontSize: 14.5,
            color: "#555",
            lineHeight: 1.8,
            marginBottom: 48,
          }}
        >
          Cookies are small text files placed on your device by a website when
          you visit it. They are widely used to make websites work efficiently,
          to remember your preferences, and to provide information to website
          owners. Cookies cannot run programs or deliver viruses to your
          computer and do not contain personal information such as your name or
          bank details.
        </p>

        <h2
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#1a1a2e",
            margin: "0 0 24px",
            paddingBottom: 10,
            borderBottom: "2px solid #f0f0f0",
          }}
        >
          Types of Cookies We Use
        </h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            marginBottom: 48,
          }}
        >
          {cookieTypes.map((c) => (
            <div
              key={c.name}
              style={{
                background: "#fff",
                borderRadius: 14,
                border: "1px solid #ebebeb",
                padding: "24px 28px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 10,
                  flexWrap: "wrap",
                  gap: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      display: "inline-block",
                      width: 10,
                      height: 10,
                      borderRadius: "50%",
                      background: c.color,
                    }}
                  />
                  <h3
                    style={{
                      margin: 0,
                      fontSize: 15,
                      fontWeight: 800,
                      color: "#1a1a2e",
                    }}
                  >
                    {c.name}
                  </h3>
                </div>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: 20,
                    background: c.bg,
                    color: c.color,
                  }}
                >
                  {c.canDisable ? "Optional" : "Required"}
                </span>
              </div>
              <p
                style={{
                  fontSize: 14,
                  color: "#666",
                  lineHeight: 1.7,
                  margin: "0 0 12px",
                }}
              >
                {c.description}
              </p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {c.examples.map((ex) => (
                  <span
                    key={ex}
                    style={{
                      fontSize: 12,
                      background: "#f8f8f8",
                      border: "1px solid #ebebeb",
                      borderRadius: 6,
                      padding: "3px 10px",
                      color: "#666",
                    }}
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#1a1a2e",
            margin: "0 0 16px",
            paddingBottom: 10,
            borderBottom: "2px solid #f0f0f0",
          }}
        >
          How to Control Cookies
        </h2>
        <p
          style={{
            fontSize: 14.5,
            color: "#555",
            lineHeight: 1.8,
            marginBottom: 16,
          }}
        >
          Most web browsers allow you to control cookies through their settings.
          You can usually find these settings in the "Options" or "Preferences"
          menu of your browser. You can also use the following links for popular
          browsers:
        </p>
        <ul style={{ paddingLeft: 20, marginBottom: 40 }}>
          {["Google Chrome", "Mozilla Firefox", "Safari", "Microsoft Edge"].map(
            (b) => (
              <li
                key={b}
                style={{ fontSize: 14.5, color: "#555", lineHeight: 2 }}
              >
                {b}
              </li>
            ),
          )}
        </ul>
        <p
          style={{
            fontSize: 14.5,
            color: "#555",
            lineHeight: 1.8,
            marginBottom: 40,
          }}
        >
          Please note that restricting cookies may impact the functionality of
          our website, including your ability to sign in, manage your cart or
          place orders.
        </p>

        <h2
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#1a1a2e",
            margin: "0 0 16px",
            paddingBottom: 10,
            borderBottom: "2px solid #f0f0f0",
          }}
        >
          Contact
        </h2>
        <p style={{ fontSize: 14.5, color: "#555", lineHeight: 1.8 }}>
          If you have questions about our use of cookies, please contact us at{" "}
          <a
            href="mailto:privacy@oscarmkatoliki.co.tz"
            style={{ color: "#C9A84C", fontWeight: 600 }}
          >
            privacy@oscarmkatoliki.co.tz
          </a>
          .
        </p>
      </div>
    </AppLayout>
  );
}
