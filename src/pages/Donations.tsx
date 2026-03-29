import React, { useState } from "react";
import AppLayout from "../components/layout/AppLayout";

const TIERS = [
  { amount: 5000, label: "TZS 5,000", desc: "Light a Candle", icon: "🕯️" },
  {
    amount: 10000,
    label: "TZS 10,000",
    desc: "Fund a Prayer Book",
    icon: "📖",
  },
  {
    amount: 25000,
    label: "TZS 25,000",
    desc: "Support a Family's Rosary",
    icon: "📿",
  },
  { amount: 50000, label: "TZS 50,000", desc: "Sponsor an Album", icon: "🎵" },
  {
    amount: 100000,
    label: "TZS 100,000",
    desc: "Equip a Parish Library",
    icon: "⛪",
  },
];

const CAUSES = [
  {
    icon: "🎵",
    title: "Catholic Music Ministry",
    desc: "Support original Swahili and English worship music recorded and produced in Tanzania. Your gift funds studio time, musicians, and distribution so that praise reaches every corner of the country.",
  },
  {
    icon: "📖",
    title: "Bibles & Devotionals",
    desc: "Many families cannot afford a Bible. Donations enable us to procure and distribute Catholic Bibles and devotional books to parishes, schools, and underserved communities across Tanzania.",
  },
  {
    icon: "⛪",
    title: "Parish Outreach",
    desc: "From rural chapels to urban centres, your support helps us bring faith resources, music events, and catechesis materials to parishes that need them most.",
  },
  {
    icon: "👶",
    title: "Children's Faith Education",
    desc: "Fund illustrated children's Bibles, catechism resources, and faith-based activity kits for Sunday schools and primary schools across the region.",
  },
];

export default function Donations() {
  const [selected, setSelected] = useState<number | null>(null);
  const [custom, setCustom] = useState("");
  const [method, setMethod] = useState<"mpesa" | "card" | "">("");
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const displayAmount = selected
    ? selected.toLocaleString()
    : custom
      ? Number(custom.replace(/\D/g, "")).toLocaleString()
      : null;

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selected && !custom) return;
    if (!method) return;
    setSubmitted(true);
  }

  return (
    <AppLayout>
      {/* ─── Hero ── */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #1a1a2e 0%, #16213e 55%, #0f3460 100%)",
          padding: "80px 24px 72px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <span
            style={{
              display: "inline-block",
              background: "#D4AF37",
              color: "#1a1a2e",
              padding: "4px 18px",
              borderRadius: 4,
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "1.2px",
              textTransform: "uppercase",
              marginBottom: 22,
            }}
          >
            Support Our Mission
          </span>
          <h1
            style={{
              fontSize: 46,
              fontWeight: 900,
              color: "#fff",
              lineHeight: 1.08,
              margin: "0 0 20px",
            }}
          >
            Give with a Faithful Heart
          </h1>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.78)",
              lineHeight: 1.7,
              margin: "0 0 12px",
              fontStyle: "italic",
              borderLeft: "3px solid #D4AF37",
              paddingLeft: 18,
              textAlign: "left",
              maxWidth: 520,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            "Each of you should give what you have decided in your heart to
            give, not reluctantly or under compulsion, for God loves a cheerful
            giver."
          </p>
          <p
            style={{
              fontSize: 13.5,
              fontWeight: 700,
              color: "#D4AF37",
              letterSpacing: "0.02em",
            }}
          >
            — 2 Corinthians 9:7
          </p>
        </div>
      </section>

      {/* ─── What Your Gift Supports ── */}
      <section style={{ padding: "64px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#1a1a2e",
              marginBottom: 8,
            }}
          >
            What Your Gift Supports
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#888",
              fontSize: 15,
              marginBottom: 48,
            }}
          >
            Every contribution — no matter the size — makes a real difference.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 24,
            }}
          >
            {CAUSES.map((cause) => (
              <div
                key={cause.title}
                style={{
                  background: "#fafafa",
                  border: "1.5px solid #f0f0f0",
                  borderRadius: 18,
                  padding: "28px 24px",
                  transition: "box-shadow 0.2s, border-color 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 8px 28px rgba(0,0,0,0.09)";
                  e.currentTarget.style.borderColor = "#D4AF37";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "";
                  e.currentTarget.style.borderColor = "#f0f0f0";
                }}
              >
                <div
                  style={{
                    fontSize: 32,
                    marginBottom: 16,
                    width: 56,
                    height: 56,
                    background: "#fdf8ee",
                    borderRadius: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {cause.icon}
                </div>
                <h3
                  style={{
                    fontSize: 16,
                    fontWeight: 800,
                    color: "#1a1a2e",
                    marginBottom: 10,
                  }}
                >
                  {cause.title}
                </h3>
                <p style={{ fontSize: 13.5, color: "#666", lineHeight: 1.65 }}>
                  {cause.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Donation Form ── */}
      <section
        style={{
          padding: "72px 24px 80px",
          background: "linear-gradient(180deg, #f9f6ef 0%, #fff 100%)",
        }}
      >
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2
            style={{
              textAlign: "center",
              fontSize: 28,
              fontWeight: 800,
              color: "#1a1a2e",
              marginBottom: 8,
            }}
          >
            Make a Donation
          </h2>
          <p
            style={{
              textAlign: "center",
              color: "#888",
              fontSize: 14.5,
              marginBottom: 40,
            }}
          >
            Choose an amount and your preferred payment method.
          </p>

          {submitted ? (
            <div
              style={{
                background: "#fff",
                border: "1.5px solid #D4AF37",
                borderRadius: 20,
                padding: "48px 32px",
                textAlign: "center",
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 18 }}>🙏</div>
              <h3
                style={{
                  fontSize: 22,
                  fontWeight: 800,
                  color: "#1a1a2e",
                  marginBottom: 10,
                }}
              >
                God Bless You, {name || "Friend"}!
              </h3>
              <p style={{ color: "#666", fontSize: 15, lineHeight: 1.65 }}>
                Your generous gift of{" "}
                <strong style={{ color: "#C9A84C" }}>
                  TZS {displayAmount}
                </strong>{" "}
                has been received. You will get a confirmation{" "}
                {method === "mpesa" ? `to ${phone}` : "to your email"} shortly.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setSelected(null);
                  setCustom("");
                  setMethod("");
                  setName("");
                  setPhone("");
                }}
                style={{
                  marginTop: 28,
                  padding: "12px 32px",
                  background: "#D4AF37",
                  color: "#1a1a2e",
                  border: "none",
                  borderRadius: 24,
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: "pointer",
                }}
              >
                Donate Again
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                background: "#fff",
                border: "1.5px solid #ebebeb",
                borderRadius: 20,
                padding: "36px 32px",
                boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
              }}
            >
              {/* Amount tiers */}
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#999",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Choose Amount
              </p>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                {TIERS.map((tier) => (
                  <button
                    type="button"
                    key={tier.amount}
                    onClick={() => {
                      setSelected(tier.amount);
                      setCustom("");
                    }}
                    style={{
                      padding: "12px 8px",
                      border: `2px solid ${selected === tier.amount ? "#D4AF37" : "#ebebeb"}`,
                      borderRadius: 12,
                      background:
                        selected === tier.amount ? "#fdf8ee" : "#fafafa",
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "border-color 0.15s, background 0.15s",
                    }}
                  >
                    <div style={{ fontSize: 18, marginBottom: 4 }}>
                      {tier.icon}
                    </div>
                    <p
                      style={{
                        fontSize: 12.5,
                        fontWeight: 800,
                        color: selected === tier.amount ? "#C9A84C" : "#1a1a2e",
                        margin: "0 0 2px",
                      }}
                    >
                      {tier.label}
                    </p>
                    <p style={{ fontSize: 10.5, color: "#aaa", margin: 0 }}>
                      {tier.desc}
                    </p>
                  </button>
                ))}
              </div>

              {/* Custom amount */}
              <div style={{ marginBottom: 28 }}>
                <input
                  type="text"
                  inputMode="numeric"
                  value={custom}
                  onChange={(e) => {
                    setCustom(e.target.value);
                    setSelected(null);
                  }}
                  placeholder="Or enter custom amount (TZS)"
                  style={{
                    width: "100%",
                    padding: "11px 16px",
                    border: `1.5px solid ${custom ? "#D4AF37" : "#ddd"}`,
                    borderRadius: 10,
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#1a1a2e",
                    background: "#fafafa",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                  onBlur={(e) =>
                    (e.target.style.borderColor = custom ? "#D4AF37" : "#ddd")
                  }
                />
              </div>

              {/* Your name */}
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#999",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  marginBottom: 12,
                }}
              >
                Your Details
              </p>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name (optional)"
                style={{
                  width: "100%",
                  padding: "11px 16px",
                  border: "1.5px solid #ddd",
                  borderRadius: 10,
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                  color: "#1a1a2e",
                  background: "#fafafa",
                  marginBottom: 12,
                }}
                onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                onBlur={(e) => (e.target.style.borderColor = "#ddd")}
              />

              {/* Payment method */}
              <p
                style={{
                  fontSize: 13,
                  fontWeight: 700,
                  color: "#999",
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  margin: "20px 0 12px",
                }}
              >
                Payment Method
              </p>
              <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
                {(["mpesa", "card"] as const).map((m) => (
                  <button
                    type="button"
                    key={m}
                    onClick={() => setMethod(m)}
                    style={{
                      flex: 1,
                      padding: "12px 16px",
                      border: `2px solid ${method === m ? "#D4AF37" : "#ebebeb"}`,
                      borderRadius: 12,
                      background: method === m ? "#fdf8ee" : "#fafafa",
                      cursor: "pointer",
                      fontSize: 13.5,
                      fontWeight: 700,
                      color: method === m ? "#C9A84C" : "#555",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 8,
                      transition: "border-color 0.15s, background 0.15s",
                    }}
                  >
                    {m === "mpesa" ? "📱 M-Pesa" : "💳 Debit / Credit Card"}
                  </button>
                ))}
              </div>

              {method === "mpesa" && (
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="M-Pesa phone number e.g. 0712 345 678"
                  required
                  style={{
                    width: "100%",
                    padding: "11px 16px",
                    border: "1.5px solid #ddd",
                    borderRadius: 10,
                    fontSize: 14,
                    outline: "none",
                    boxSizing: "border-box",
                    color: "#1a1a2e",
                    background: "#fafafa",
                    marginBottom: 20,
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#C9A84C")}
                  onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                />
              )}

              <button
                type="submit"
                disabled={(!selected && !custom) || !method}
                style={{
                  width: "100%",
                  padding: "15px",
                  background:
                    (!selected && !custom) || !method
                      ? "#e0d9c7"
                      : "linear-gradient(135deg, #D4AF37, #C9A84C)",
                  color: (!selected && !custom) || !method ? "#aaa" : "#1a1a2e",
                  border: "none",
                  borderRadius: 12,
                  fontSize: 15,
                  fontWeight: 800,
                  cursor:
                    (!selected && !custom) || !method
                      ? "not-allowed"
                      : "pointer",
                  letterSpacing: "0.3px",
                  transition: "opacity 0.15s",
                }}
              >
                {displayAmount
                  ? `Donate TZS ${displayAmount} →`
                  : "Select an Amount to Continue"}
              </button>

              <p
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color: "#bbb",
                  marginTop: 16,
                }}
              >
                🔒 Secure & encrypted · Your generosity stays private
              </p>
            </form>
          )}
        </div>
      </section>

      {/* ─── Trust badges ── */}
      <section
        style={{
          background: "#1a1a2e",
          padding: "48px 24px",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.45)",
              letterSpacing: "1px",
              textTransform: "uppercase",
              marginBottom: 28,
            }}
          >
            Your Donation Is Safe &amp; Transparent
          </p>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 40,
              flexWrap: "wrap",
            }}
          >
            {[
              { icon: "🔒", label: "Encrypted Payments" },
              { icon: "🧾", label: "Receipt Issued" },
              { icon: "✝", label: "Faith-First Mission" },
              { icon: "📊", label: "Transparent Use of Funds" },
            ].map((b) => (
              <div
                key={b.label}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <span style={{ fontSize: 22 }}>{b.icon}</span>
                <span
                  style={{ fontSize: 13.5, color: "rgba(255,255,255,0.65)" }}
                >
                  {b.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
