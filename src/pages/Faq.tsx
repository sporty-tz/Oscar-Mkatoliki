import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { useFaqs } from "../lib/hooks";

export default function FAQ() {
  const { groups } = useFaqs();
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
        {groups.map((group) => (
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
              {group.items.map((item) => {
                const key = item.id;
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
                        {item.question}
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
                          {item.answer}
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
