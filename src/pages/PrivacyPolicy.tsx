import AppLayout from "../components/layout/AppLayout";

const sections = [
  {
    id: "information",
    title: "1. Information We Collect",
    body: `We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support. This includes:

• **Account data**: name, email address, phone number and password (hashed).
• **Order data**: delivery address, billing details, order history and transaction records.
• **Payment data**: we do not store full card or M-Pesa wallet numbers — payments are processed by our payment partner (Snippe) and only a transaction reference is retained.
• **Communications**: messages you send us via email, contact forms or live chat.
• **Usage data**: pages visited, products viewed, click events and session duration, collected through browser analytics.`,
  },
  {
    id: "use",
    title: "2. How We Use Your Information",
    body: `We use the information we collect to:

• Process and fulfil your orders, and send order confirmations and shipping updates.
• Manage your account and authenticate you securely.
• Send you transactional emails (receipts, password resets) and, with your consent, promotional emails about new products and offers.
• Improve our website, personalise your experience and analyse usage trends.
• Comply with legal obligations and resolve disputes.`,
  },
  {
    id: "sharing",
    title: "3. Sharing of Information",
    body: `We do not sell your personal data. We share it only:

• **Service providers**: payment processors, shipping partners, cloud hosting and analytics providers who process data on our behalf under strict confidentiality agreements.
• **Legal compliance**: when required by applicable Tanzanian law, court order or to protect the rights and safety of our users.
• **Business transfer**: in the event of a merger, acquisition or asset sale, your data may transfer to the successor entity, and you will be notified.`,
  },
  {
    id: "security",
    title: "4. Data Security",
    body: `We implement industry-standard security measures including TLS encryption for all data in transit, bcrypt-hashed passwords, and access controls restricting internal access to personal data on a need-to-know basis. No method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    id: "cookies",
    title: "5. Cookies",
    body: `We use cookies and similar tracking technologies to operate essential site features, remember your preferences and analyse traffic. You can control cookie settings in your browser; however, disabling certain cookies may affect site functionality. See our Cookie Policy for full details.`,
  },
  {
    id: "rights",
    title: "6. Your Rights",
    body: `Under applicable data-protection law you have the right to:

• **Access** the personal data we hold about you.
• **Correction** of inaccurate or incomplete data.
• **Deletion** ("right to be forgotten") subject to legal retention requirements.
• **Portability** — receive your data in a machine-readable format.
• **Objection** to processing for direct marketing at any time.

To exercise these rights, email us at privacy@oscarmkatoliki.co.tz.`,
  },
  {
    id: "retention",
    title: "7. Data Retention",
    body: `We retain your personal data for as long as your account is active or as needed to provide services, comply with legal obligations and resolve disputes. Order records are kept for a minimum of five years as required by Tanzanian tax law.`,
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    body: `Our services are not directed to children under the age of 13. We do not knowingly collect personal data from children. If you believe a child has provided us with personal data, please contact us and we will delete it promptly.`,
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    body: `We may update this Privacy Policy from time to time. We will notify you of material changes by email or a prominent notice on our website at least 14 days before the change takes effect. Your continued use of our services after the effective date constitutes acceptance of the updated policy.`,
  },
  {
    id: "contact",
    title: "10. Contact Us",
    body: `If you have questions about this Privacy Policy, please contact us at:

Oscar Mkatoliki Ltd  
P.O. Box 12345, Dar es Salaam, Tanzania  
Email: privacy@oscarmkatoliki.co.tz  
Phone: +255 712 345 678`,
  },
];

export default function PrivacyPolicy() {
  return (
    <AppLayout>
      {/* Hero */}
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
          Privacy Policy
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
            marginBottom: 40,
          }}
        >
          Oscar Mkatoliki ("<strong>we</strong>", "<strong>our</strong>", or "
          <strong>us</strong>") is committed to protecting your personal
          information. This Privacy Policy explains what data we collect, how we
          use it, and your rights regarding it. By using our website or placing
          an order, you agree to this policy.
        </p>

        {/* ToC */}
        <div
          style={{
            background: "#fdf4dc",
            border: "1px solid #eedfa8",
            borderRadius: 12,
            padding: "20px 24px",
            marginBottom: 48,
          }}
        >
          <p
            style={{
              margin: "0 0 10px",
              fontWeight: 800,
              color: "#1a1a2e",
              fontSize: 13,
            }}
          >
            Contents
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px 24px" }}>
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                style={{
                  fontSize: 13,
                  color: "#C9A84C",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                {s.title}
              </a>
            ))}
          </div>
        </div>

        {sections.map((s) => (
          <div
            key={s.id}
            id={s.id}
            style={{ marginBottom: 44, scrollMarginTop: 90 }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#1a1a2e",
                margin: "0 0 14px",
                paddingBottom: 10,
                borderBottom: "2px solid #f0f0f0",
              }}
            >
              {s.title}
            </h2>
            {s.body.split("\n\n").map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 14.5,
                  color: "#555",
                  lineHeight: 1.8,
                  margin: "0 0 12px",
                  whiteSpace: "pre-line",
                }}
              >
                {para}
              </p>
            ))}
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
