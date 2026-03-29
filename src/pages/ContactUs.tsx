import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";

const contactInfo = [
  {
    icon: "📧",
    label: "Email",
    value: "hello@oscarmkatoliki.co.tz",
    href: "mailto:hello@oscarmkatoliki.co.tz",
  },
  {
    icon: "📞",
    label: "Phone / WhatsApp",
    value: "+255 712 345 678",
    href: "tel:+255712345678",
  },
  {
    icon: "📍",
    label: "Address",
    value: "Msasani Peninsula, Dar es Salaam, Tanzania",
    href: "#",
  },
  {
    icon: "🕐",
    label: "Business Hours",
    value: "Monday – Saturday: 8:00 AM – 6:00 PM",
    href: "#",
  },
];

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: POST to backend or Supabase function
    setSent(true);
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
          We'd Love to Hear from You
        </p>
        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 40,
            margin: "0 0 16px",
          }}
        >
          Contact Us
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.68)",
            fontSize: 16,
            maxWidth: 540,
            margin: "0 auto",
          }}
        >
          Questions about your order, products, or faith resources? Our team is
          here to help.
        </p>
      </div>

      <div
        style={{ maxWidth: 1040, margin: "0 auto", padding: "60px 24px 80px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 380px",
            gap: 40,
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Form */}
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #ebebeb",
              padding: "36px 36px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
            }}
          >
            {sent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 52, marginBottom: 16 }}>✅</div>
                <h2
                  style={{
                    fontSize: 22,
                    fontWeight: 900,
                    color: "#1a1a2e",
                    margin: "0 0 12px",
                  }}
                >
                  Message Received!
                </h2>
                <p style={{ fontSize: 14.5, color: "#666", lineHeight: 1.7 }}>
                  Thank you for reaching out. We will get back to you within one
                  business day.
                </p>
                <button
                  onClick={() => {
                    setSent(false);
                    setForm({ name: "", email: "", subject: "", message: "" });
                  }}
                  style={{
                    marginTop: 24,
                    border: "none",
                    background: "#1a1a2e",
                    color: "#D4AF37",
                    borderRadius: 12,
                    padding: "11px 28px",
                    fontWeight: 700,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <>
                <h2
                  style={{
                    fontSize: 20,
                    fontWeight: 800,
                    color: "#1a1a2e",
                    margin: "0 0 24px",
                  }}
                >
                  Send a Message
                </h2>
                <form
                  onSubmit={handleSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 16 }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 14,
                    }}
                    className="contact-name-row"
                  >
                    {(["name", "email"] as const).map((field) => (
                      <div key={field}>
                        <label
                          style={{
                            display: "block",
                            fontSize: 12,
                            fontWeight: 700,
                            color: "#555",
                            marginBottom: 6,
                            textTransform: "capitalize",
                          }}
                        >
                          {field === "name" ? "Full Name *" : "Email Address *"}
                        </label>
                        <input
                          type={field === "email" ? "email" : "text"}
                          name={field}
                          value={form[field]}
                          onChange={handleChange}
                          required
                          placeholder={
                            field === "name" ? "Your name" : "you@example.com"
                          }
                          style={{
                            width: "100%",
                            border: "1px solid #ddd",
                            borderRadius: 10,
                            padding: "10px 14px",
                            fontSize: 14,
                            outline: "none",
                            boxSizing: "border-box",
                            fontFamily: "inherit",
                          }}
                        />
                      </div>
                    ))}
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#555",
                        marginBottom: 6,
                      }}
                    >
                      Subject *
                    </label>
                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      style={{
                        width: "100%",
                        border: "1px solid #ddd",
                        borderRadius: 10,
                        padding: "10px 14px",
                        fontSize: 14,
                        outline: "none",
                        fontFamily: "inherit",
                        background: "#fff",
                        cursor: "pointer",
                      }}
                    >
                      <option value="">Select a topic…</option>
                      <option>Order Inquiry</option>
                      <option>Shipping & Delivery</option>
                      <option>Returns & Refunds</option>
                      <option>Product Question</option>
                      <option>Account Help</option>
                      <option>Wholesale / Partnership</option>
                      <option>Other</option>
                    </select>
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: 12,
                        fontWeight: 700,
                        color: "#555",
                        marginBottom: 6,
                      }}
                    >
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="Write your message here…"
                      style={{
                        width: "100%",
                        border: "1px solid #ddd",
                        borderRadius: 10,
                        padding: "10px 14px",
                        fontSize: 14,
                        outline: "none",
                        resize: "vertical",
                        fontFamily: "inherit",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: "linear-gradient(90deg, #1a1a2e, #2c2c60)",
                      color: "#D4AF37",
                      border: "none",
                      borderRadius: 12,
                      padding: "13px",
                      fontWeight: 800,
                      fontSize: 15,
                      cursor: "pointer",
                      letterSpacing: "0.3px",
                    }}
                  >
                    Send Message →
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Info sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                border: "1px solid #ebebeb",
                padding: "28px 26px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
              }}
            >
              <h2
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#1a1a2e",
                  margin: "0 0 20px",
                }}
              >
                Get in Touch
              </h2>
              {contactInfo.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  style={{
                    display: "flex",
                    gap: 14,
                    alignItems: "flex-start",
                    textDecoration: "none",
                    padding: "12px 0",
                    borderBottom: "1px solid #f5f5f5",
                  }}
                >
                  <span
                    style={{ fontSize: 20, flexShrink: 0, lineHeight: 1.4 }}
                  >
                    {item.icon}
                  </span>
                  <div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#aaa",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                      }}
                    >
                      {item.label}
                    </p>
                    <p
                      style={{
                        margin: "3px 0 0",
                        fontSize: 13.5,
                        color: "#333",
                        fontWeight: 600,
                        lineHeight: 1.5,
                      }}
                    >
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            <div
              style={{
                background: "linear-gradient(135deg, #1a1a2e, #2c2c60)",
                borderRadius: 20,
                padding: "26px",
                textAlign: "center",
                color: "#fff",
              }}
            >
              <p style={{ margin: "0 0 10px", fontSize: 28 }}>💬</p>
              <h3 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 800 }}>
                Chat on WhatsApp
              </h3>
              <p
                style={{
                  margin: "0 0 16px",
                  fontSize: 12.5,
                  color: "rgba(255,255,255,0.65)",
                  lineHeight: 1.6,
                }}
              >
                Quickest way to get help. We reply within minutes during
                business hours.
              </p>
              <a
                href="https://wa.me/255712345678"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "block",
                  background: "#25D366",
                  color: "#fff",
                  borderRadius: 12,
                  padding: "11px",
                  fontWeight: 700,
                  fontSize: 13.5,
                  textDecoration: "none",
                }}
              >
                Open WhatsApp
              </a>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .contact-grid { grid-template-columns: 1fr !important; }
            .contact-name-row { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </AppLayout>
  );
}
