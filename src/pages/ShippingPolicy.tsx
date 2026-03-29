import AppLayout from "../components/layout/AppLayout";

const zones = [
  {
    region: "Dar es Salaam & Pwani",
    time: "1–2 business days",
    cost: "TZS 3,000",
    free: "Free over TZS 50,000",
  },
  {
    region: "Arusha, Moshi, Kilimanjaro",
    time: "2–3 business days",
    cost: "TZS 5,500",
    free: "Free over TZS 80,000",
  },
  {
    region: "Other Mainland Regions",
    time: "3–5 business days",
    cost: "TZS 7,500",
    free: "Free over TZS 100,000",
  },
  {
    region: "Zanzibar",
    time: "2–4 business days",
    cost: "TZS 9,000",
    free: "Free over TZS 100,000",
  },
  {
    region: "International",
    time: "7–14 business days",
    cost: "Quote on request",
    free: "—",
  },
];

const sections = [
  {
    id: "processing",
    title: "Order Processing",
    icon: "📦",
    text: `All orders are processed Monday through Saturday during business hours (8:00 AM – 6:00 PM). Orders placed before 12:00 PM are dispatched the same day. Orders placed after 12:00 PM or on Sundays are dispatched the next working day.

During major Catholic liturgical seasons (Christmas, Easter) and promotional events, processing may take an additional 1–2 business days. We will notify you if there is an unexpected delay.`,
  },
  {
    id: "carriers",
    title: "Carrier Partners",
    icon: "🚚",
    text: `We partner with trusted local courier services including SENDY, G4S Courier, Speedaf and selected boda boda last-mile networks in Dar es Salaam. The carrier used depends on your region and the parcel size.

You will receive an SMS and email notification with your tracking number once your order is dispatched. Tracking is available on the carrier's website or via our Track Order page.`,
  },
  {
    id: "packaging",
    title: "Packaging",
    icon: "🎁",
    text: `We pack every order with care, especially fragile religious items such as statues, glass rosaries, and framed artwork. Items are bubble-wrapped and placed in sturdy cardboard boxes.

Gift wrapping is available for TZS 2,500 per order. Select this option at checkout and add a personalised message card. Eco-friendly packaging materials are used wherever possible.`,
  },
  {
    id: "issues",
    title: "Delivery Issues",
    icon: "⚠️",
    text: `If your order is delayed beyond the estimated window, please contact us with your order number. We will investigate with the carrier immediately.

If a delivery attempt is made and you are unavailable, the courier will leave a notification and attempt re-delivery the next business day. After two failed attempts, the parcel returns to us and we will contact you to arrange re-delivery (a small re-delivery fee may apply).

Packages lost in transit are fully refunded or replaced at no charge to you.`,
  },
  {
    id: "restrictions",
    title: "Shipping Restrictions",
    icon: "🚫",
    text: `Some large or fragile items (oversized wooden crosses, large altar furniture) are available for Dar es Salaam delivery only. This is noted clearly on the product page.

Hazardous materials (certain incense types or aerosols) cannot be shipped internationally due to airline regulations. We do not ship to P.O. box addresses.`,
  },
];

export default function ShippingPolicy() {
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
          Shipping Policy
        </p>
        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 40,
            margin: "0 0 16px",
          }}
        >
          Delivery Information
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.68)",
            fontSize: 16,
            maxWidth: 540,
            margin: "0 auto",
          }}
        >
          Everything you need to know about how we get your order safely to your
          door.
        </p>
        <p
          style={{
            color: "rgba(255,255,255,0.4)",
            fontSize: 12,
            margin: "18px 0 0",
          }}
        >
          Last updated: January 2025
        </p>
      </div>

      <div
        style={{ maxWidth: 880, margin: "0 auto", padding: "60px 24px 80px" }}
      >
        {/* Free shipping callout */}
        <div
          style={{
            background: "#fdf4dc",
            border: "1.5px solid #D4AF37",
            borderRadius: 16,
            padding: "20px 24px",
            marginBottom: 48,
            display: "flex",
            alignItems: "flex-start",
            gap: 14,
          }}
        >
          <span style={{ fontSize: 28, flexShrink: 0 }}>🎉</span>
          <div>
            <p
              style={{
                margin: "0 0 4px",
                fontWeight: 800,
                color: "#1a1a2e",
                fontSize: 15,
              }}
            >
              Free Shipping Available
            </p>
            <p
              style={{
                margin: 0,
                color: "#666",
                fontSize: 13.5,
                lineHeight: 1.6,
              }}
            >
              Enjoy free standard shipping on orders above TZS 50,000 within Dar
              es Salaam and Pwani region. Higher thresholds apply to other
              regions — see the table below.
            </p>
          </div>
        </div>

        {/* Delivery Zones Table */}
        <div style={{ marginBottom: 56 }}>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#1a1a2e",
              margin: "0 0 20px",
            }}
          >
            Delivery Zones & Rates
          </h2>
          <div
            style={{
              overflowX: "auto",
              borderRadius: 14,
              border: "1px solid #ebebeb",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontFamily: "inherit",
              }}
            >
              <thead>
                <tr style={{ background: "#1a1a2e" }}>
                  {[
                    "Region",
                    "Est. Delivery Time",
                    "Shipping Cost",
                    "Free Shipping From",
                  ].map((h) => (
                    <th
                      key={h}
                      style={{
                        color: "#D4AF37",
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "14px 18px",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {zones.map((z, i) => (
                  <tr
                    key={z.region}
                    style={{ background: i % 2 === 0 ? "#fff" : "#fafafa" }}
                  >
                    <td
                      style={{
                        padding: "13px 18px",
                        fontSize: 13.5,
                        fontWeight: 700,
                        color: "#1a1a2e",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {z.region}
                    </td>
                    <td
                      style={{
                        padding: "13px 18px",
                        fontSize: 13.5,
                        color: "#444",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {z.time}
                    </td>
                    <td
                      style={{
                        padding: "13px 18px",
                        fontSize: 13.5,
                        color: "#444",
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {z.cost}
                    </td>
                    <td
                      style={{
                        padding: "13px 18px",
                        fontSize: 13.5,
                        color: "#27ae60",
                        fontWeight: 700,
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      {z.free}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Policy sections */}
        {sections.map((sec) => (
          <div key={sec.id} style={{ marginBottom: 40 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <span style={{ fontSize: 22 }}>{sec.icon}</span>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#1a1a2e",
                  margin: 0,
                }}
              >
                {sec.title}
              </h2>
            </div>
            <div
              style={{
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 14,
                padding: "22px 24px",
                boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
              }}
            >
              {sec.text.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  style={{
                    margin: i === 0 ? 0 : "12px 0 0",
                    fontSize: 14,
                    color: "#555",
                    lineHeight: 1.8,
                  }}
                >
                  {para}
                </p>
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #2c2c60)",
            borderRadius: 20,
            padding: "36px 44px",
            textAlign: "center",
            color: "#fff",
            marginTop: 16,
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 19, fontWeight: 900 }}>
            Questions About Your Delivery?
          </h2>
          <p
            style={{
              margin: "0 0 22px",
              fontSize: 14.5,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Our team can help track your order or advise on the best shipping
            option for your region.
          </p>
          <div
            style={{
              display: "flex",
              gap: 12,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href="/track-order"
              style={{
                background: "#D4AF37",
                color: "#1a1a2e",
                borderRadius: 12,
                padding: "11px 24px",
                fontWeight: 800,
                fontSize: 13.5,
                textDecoration: "none",
              }}
            >
              Track My Order
            </a>
            <a
              href="/contact"
              style={{
                background: "rgba(255,255,255,0.12)",
                color: "#fff",
                border: "1.5px solid rgba(255,255,255,0.3)",
                borderRadius: 12,
                padding: "11px 24px",
                fontWeight: 700,
                fontSize: 13.5,
                textDecoration: "none",
              }}
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
