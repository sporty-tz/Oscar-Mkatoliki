import AppLayout from "../components/layout/AppLayout";

const sections = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    body: `By accessing or using the Oscar Mkatoliki website (oscarmkatoliki.co.tz), mobile application or any related service (collectively, the "Platform"), you confirm that you are at least 18 years old (or have parental consent) and agree to be bound by these Terms of Service. If you do not agree, please do not use the Platform.`,
  },
  {
    id: "account",
    title: "2. Your Account",
    body: `You must provide accurate, current and complete information when registering. You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account. You must notify us immediately at support@oscarmkatoliki.co.tz if you suspect unauthorised access.

Oscar Mkatoliki reserves the right to suspend or terminate accounts that violate these Terms without notice.`,
  },
  {
    id: "products",
    title: "3. Products and Pricing",
    body: `All products are subject to availability. We reserve the right to limit quantities, discontinue products or adjust prices at any time without prior notice.

Prices are displayed in Tanzanian Shillings (TZS) and are inclusive of applicable taxes unless stated otherwise. We make every effort to display accurate pricing; however, in the event of an error, we will notify you before processing your order.`,
  },
  {
    id: "orders",
    title: "4. Orders and Payment",
    body: `Placing an order constitutes an offer to purchase. We reserve the right to refuse or cancel any order at our sole discretion. An order is accepted when we send you an order confirmation email.

Payment is processed through our authorised payment partners. By providing payment information you warrant that you are authorised to use the payment method provided. We do not store your full card or mobile money credentials.`,
  },
  {
    id: "shipping",
    title: "5. Shipping and Delivery",
    body: `We deliver within Tanzania. Estimated delivery times are provided at checkout and are not guaranteed. Oscar Mkatoliki is not liable for delays caused by third-party couriers, weather, public holidays or events beyond our reasonable control. Please refer to our Shipping Policy for full details.`,
  },
  {
    id: "returns",
    title: "6. Returns and Refunds",
    body: `You may return non-perishable, unopened items within 7 days of delivery for a full refund or exchange, provided the item is in its original condition and packaging. Digital products and personalised items are non-refundable unless defective.

To initiate a return, contact us at returns@oscarmkatoliki.co.tz with your order number and reason for return. Refunds are processed within 5–10 business days.`,
  },
  {
    id: "ip",
    title: "7. Intellectual Property",
    body: `All content on the Platform — including the Oscar Mkatoliki name, logo, product images, music tracks, written content, graphics and software — is owned by or licensed to Oscar Mkatoliki and protected by applicable intellectual property laws.

You are granted a limited, non-exclusive licence to access the Platform for personal, non-commercial use. You may not reproduce, distribute, modify or create derivative works without our prior written consent.`,
  },
  {
    id: "prohibited",
    title: "8. Prohibited Conduct",
    body: `You agree not to:

• Use the Platform for any unlawful purpose or in violation of any applicable local, national or international law.
• Use automated tools (bots, scrapers) to access the Platform without express written permission.
• Attempt to gain unauthorised access to our systems or other users' accounts.
• Post or transmit any content that is defamatory, obscene, harassing or infringes third-party rights.
• Circumvent or attempt to disable any security or access-control feature.`,
  },
  {
    id: "disclaimer",
    title: "9. Disclaimers and Limitation of Liability",
    body: `The Platform is provided "as is" and "as available" without express or implied warranties of any kind. To the fullest extent permitted by law, Oscar Mkatoliki disclaims all warranties including merchantability and fitness for a particular purpose.

We shall not be liable for indirect, incidental, consequential or punitive damages arising from your use of the Platform. Our total aggregate liability shall not exceed the amount you paid for the product or service giving rise to the claim.`,
  },
  {
    id: "changes",
    title: "10. Changes to These Terms",
    body: `We may revise these Terms at any time. Changes will be posted on this page with an updated date. Your continued use of the Platform after changes are posted constitutes your acceptance of the revised Terms.`,
  },
  {
    id: "governing",
    title: "11. Governing Law",
    body: `These Terms are governed by the laws of the United Republic of Tanzania. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of Dar es Salaam, Tanzania.`,
  },
];

export default function TermsOfService() {
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
          Terms of Service
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
          Please read these Terms of Service carefully before using the Oscar
          Mkatoliki Platform. These Terms govern your use of our website, mobile
          app and all services offered through them.
        </p>

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
