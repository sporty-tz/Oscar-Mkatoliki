import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";

interface FaqItem {
  q: string;
  a: string;
}
interface FaqGroup {
  category: string;
  icon: string;
  items: FaqItem[];
}

const faqData: FaqGroup[] = [
  {
    category: "Orders & Payment",
    icon: "🛒",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse our catalogue, add items to your cart, proceed to checkout, enter your delivery details and complete payment. You will receive an email confirmation immediately.",
      },
      {
        q: "What payment methods are accepted?",
        a: "We accept M-Pesa, Tigo Pesa, Airtel Money, and debit/credit cards (Visa & Mastercard). All transactions are secured with 256-bit SSL encryption.",
      },
      {
        q: "Can I modify or cancel my order?",
        a: "You can cancel or modify an order within 1 hour of placing it by contacting us on WhatsApp or email. Once the order is packed it can no longer be changed.",
      },
      {
        q: "How do I track my order?",
        a: "Visit the Track Order page and enter your order number and email address. You can also log into your account and view Order History for live status updates.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    icon: "🚚",
    items: [
      {
        q: "Which areas do you deliver to?",
        a: "We deliver to all regions of Tanzania including Dar es Salaam, Mwanza, Arusha, Dodoma, Zanzibar and more. International shipping is available on request.",
      },
      {
        q: "How long does delivery take?",
        a: "Dar es Salaam: 1–2 business days. Other mainland regions: 3–5 business days. Zanzibar: 2–4 business days. International orders: 7–14 business days.",
      },
      {
        q: "Is there a minimum order for free shipping?",
        a: "Yes! Orders of TZS 50,000 or more qualify for free standard shipping within mainland Tanzania. Zanzibar and international orders carry a flat shipping fee.",
      },
      {
        q: "Can I choose a specific delivery time?",
        a: "Currently we do not offer scheduled time-slot delivery. Our couriers deliver during business hours (8 AM – 6 PM). We will notify you before dispatch.",
      },
    ],
  },
  {
    category: "Returns & Refunds",
    icon: "↩️",
    items: [
      {
        q: "What is your return policy?",
        a: "Unused, unopened items in original condition can be returned within 7 days of delivery. Religious artefacts, personalised items and digital downloads are non-returnable.",
      },
      {
        q: "How do I start a return?",
        a: "Contact our support team via WhatsApp or email with your order number and photos of the item. We will arrange a collection or advise you how to send it back.",
      },
      {
        q: "When will I receive my refund?",
        a: "Refunds are processed within 3–5 business days after we receive and inspect the returned item. Mobile money refunds typically appear within 24 hours of processing.",
      },
      {
        q: "What if I received a wrong or damaged item?",
        a: "We sincerely apologise. Please send us a photo and your order number within 48 hours of delivery. We will arrange a free replacement or full refund immediately.",
      },
    ],
  },
  {
    category: "Products & Faith Resources",
    icon: "📿",
    items: [
      {
        q: "Are all products officially approved religious items?",
        a: "Yes. We source our religious items — rosaries, crucifixes, statues, and prayer books — from trusted Catholic suppliers and ensure they meet Church-approved standards.",
      },
      {
        q: "Do you sell Oscar Mkatoliki music albums physically?",
        a: "Yes! We carry signed physical CDs and limited-edition vinyl for select albums. Digital downloads are also available for instant purchase.",
      },
      {
        q: "Can I request a product that is out of stock?",
        a: "Yes. Use the 'Notify Me' button on the product page, or contact us. We restock popular items regularly and will notify you when available.",
      },
      {
        q: "Do you offer gift wrapping?",
        a: "Yes, gift wrapping is available at checkout for a small fee of TZS 2,500. You can add a personalised message card as well.",
      },
    ],
  },
  {
    category: "Account & Privacy",
    icon: "👤",
    items: [
      {
        q: "How do I create an account?",
        a: "Click 'Sign In' in the top navigation, then select 'Create Account'. Enter your name, email and a secure password. You will receive a verification email to confirm.",
      },
      {
        q: "I forgot my password. What should I do?",
        a: "On the Sign In page, click 'Forgot password?' and enter your email. You will receive a password-reset link. Check your spam folder if it doesn't arrive within a few minutes.",
      },
      {
        q: "How is my personal data used?",
        a: "We use your information only to process orders, send order updates and improve your shopping experience. We never sell your data to third parties. See our Privacy Policy for full details.",
      },
      {
        q: "Can I delete my account?",
        a: "Yes. Email hello@oscarmkatoliki.co.tz from your registered address and request account deletion. We will process this within 7 business days and confirm via email.",
      },
    ],
  },
];

export default function FAQ() {
  const [active, setActive] = useState<{ [key: string]: boolean }>({});

  const toggle = (key: string) => {
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
  };

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
          Frequently Asked Questions
        </p>
        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 40,
            margin: "0 0 16px",
          }}
        >
          How Can We Help?
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.68)",
            fontSize: 16,
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          Find quick answers to common questions about orders, shipping,
          returns, products, and your account.
        </p>
      </div>

      <div
        style={{ maxWidth: 820, margin: "0 auto", padding: "60px 24px 80px" }}
      >
        {faqData.map((group) => (
          <div key={group.category} style={{ marginBottom: 44 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 18,
              }}
            >
              <span style={{ fontSize: 22 }}>{group.icon}</span>
              <h2
                style={{
                  fontSize: 18,
                  fontWeight: 800,
                  color: "#1a1a2e",
                  margin: 0,
                }}
              >
                {group.category}
              </h2>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {group.items.map((item, i) => {
                const key = `${group.category}-${i}`;
                const open = !!active[key];
                return (
                  <div
                    key={key}
                    style={{
                      background: "#fff",
                      border: `1.5px solid ${open ? "#D4AF37" : "#ebebeb"}`,
                      borderRadius: 14,
                      overflow: "hidden",
                      transition: "border-color 0.2s",
                    }}
                  >
                    <button
                      onClick={() => toggle(key)}
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "17px 20px",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        gap: 12,
                      }}
                    >
                      <span
                        style={{
                          fontSize: 14.5,
                          fontWeight: 700,
                          color: "#1a1a2e",
                          lineHeight: 1.4,
                        }}
                      >
                        {item.q}
                      </span>
                      <span
                        style={{
                          fontSize: 18,
                          color: "#D4AF37",
                          fontWeight: 700,
                          flexShrink: 0,
                          transform: open ? "rotate(45deg)" : "none",
                          transition: "transform 0.2s",
                          display: "block",
                        }}
                      >
                        +
                      </span>
                    </button>
                    {open && (
                      <div
                        style={{
                          padding: "0 20px 18px",
                          borderTop: "1px solid #f5f5f5",
                        }}
                      >
                        <p
                          style={{
                            margin: "14px 0 0",
                            fontSize: 14,
                            color: "#555",
                            lineHeight: 1.75,
                          }}
                        >
                          {item.a}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}

        {/* Still need help? */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #2c2c60)",
            borderRadius: 20,
            padding: "40px 44px",
            textAlign: "center",
            color: "#fff",
            marginTop: 16,
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 20, fontWeight: 900 }}>
            Still Have Questions?
          </h2>
          <p
            style={{
              margin: "0 0 24px",
              fontSize: 14.5,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Our friendly team is ready to help you Monday through Saturday, 8 AM
            – 6 PM.
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
              href="/contact"
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
              Contact Us
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
              }}
            >
              WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
