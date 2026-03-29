import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";

const denominations = [
  { label: "TZS 10,000", value: 10000 },
  { label: "TZS 25,000", value: 25000 },
  { label: "TZS 50,000", value: 50000 },
  { label: "TZS 100,000", value: 100000 },
];

export default function GiftCards() {
  const [tab, setTab] = useState<"buy" | "check">("buy");
  const [amount, setAmount] = useState<number | null>(50000);
  const [custom, setCustom] = useState("");
  const [form, setForm] = useState({
    recipientName: "",
    recipientEmail: "",
    senderName: "",
    message: "",
  });
  const [balance, setBalance] = useState("");
  const [balanceResult, setBalanceResult] = useState<null | string>(null);

  const effectiveAmount = amount !== null ? amount : parseInt(custom) || 0;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleBuy = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `Gift card of TZS ${effectiveAmount.toLocaleString()} will be sent to ${form.recipientEmail}. (Payment integration coming soon.)`,
    );
  };

  const handleCheck = (e: React.FormEvent) => {
    e.preventDefault();
    setBalanceResult(
      balance.startsWith("GC")
        ? "TZS 35,500 remaining"
        : "Gift card not found. Please check the code.",
    );
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
          Gift Cards
        </p>
        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 40,
            margin: "0 0 16px",
          }}
        >
          Give the Gift of Faith
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.68)",
            fontSize: 16,
            maxWidth: 500,
            margin: "0 auto",
          }}
        >
          Perfect for baptisms, confirmations, Christmas and Easter. Choose an
          amount and send a beautifully designed digital gift card.
        </p>
      </div>

      <div
        style={{ maxWidth: 780, margin: "0 auto", padding: "60px 24px 80px" }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 0,
            background: "#f5f5f5",
            borderRadius: 14,
            padding: 4,
            marginBottom: 36,
            width: "fit-content",
          }}
        >
          {(
            [
              ["buy", "🎁 Buy a Gift Card"],
              ["check", "💳 Check Balance"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                padding: "10px 24px",
                borderRadius: 12,
                border: "none",
                fontWeight: 700,
                fontSize: 14,
                cursor: "pointer",
                background: tab === key ? "#fff" : "transparent",
                color: tab === key ? "#1a1a2e" : "#888",
                boxShadow: tab === key ? "0 1px 6px rgba(0,0,0,0.08)" : "none",
                transition: "all 0.2s",
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Buy tab */}
        {tab === "buy" && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 320px",
              gap: 32,
              alignItems: "start",
            }}
            className="gift-grid"
          >
            {/* Form */}
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                border: "1px solid #ebebeb",
                padding: "32px 30px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              }}
            >
              <h2
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#1a1a2e",
                  margin: "0 0 22px",
                }}
              >
                Choose an Amount
              </h2>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 10,
                  marginBottom: 14,
                }}
              >
                {denominations.map((d) => (
                  <button
                    key={d.value}
                    onClick={() => {
                      setAmount(d.value);
                      setCustom("");
                    }}
                    style={{
                      padding: "10px 8px",
                      borderRadius: 10,
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      background: amount === d.value ? "#1a1a2e" : "#f5f5f5",
                      color: amount === d.value ? "#D4AF37" : "#444",
                      border:
                        amount === d.value
                          ? "2px solid #1a1a2e"
                          : "2px solid transparent",
                      transition: "all 0.15s",
                    }}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              <input
                type="number"
                placeholder="Custom amount (e.g. 75000)"
                value={custom}
                onChange={(e) => {
                  setCustom(e.target.value);
                  setAmount(null);
                }}
                style={{
                  width: "100%",
                  border: "1px solid #ddd",
                  borderRadius: 10,
                  padding: "10px 14px",
                  fontSize: 13.5,
                  marginBottom: 20,
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />

              <form
                onSubmit={handleBuy}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#555",
                      marginBottom: 5,
                    }}
                  >
                    Recipient's Name *
                  </label>
                  <input
                    type="text"
                    name="recipientName"
                    value={form.recipientName}
                    onChange={handleChange}
                    required
                    placeholder="e.g. Mama Joyce"
                    style={{
                      width: "100%",
                      border: "1px solid #ddd",
                      borderRadius: 10,
                      padding: "10px 14px",
                      fontSize: 14,
                      outline: "none",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#555",
                      marginBottom: 5,
                    }}
                  >
                    Recipient's Email *
                  </label>
                  <input
                    type="email"
                    name="recipientEmail"
                    value={form.recipientEmail}
                    onChange={handleChange}
                    required
                    placeholder="recipient@example.com"
                    style={{
                      width: "100%",
                      border: "1px solid #ddd",
                      borderRadius: 10,
                      padding: "10px 14px",
                      fontSize: 14,
                      outline: "none",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#555",
                      marginBottom: 5,
                    }}
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="senderName"
                    value={form.senderName}
                    onChange={handleChange}
                    placeholder="e.g. Baba Patrick"
                    style={{
                      width: "100%",
                      border: "1px solid #ddd",
                      borderRadius: 10,
                      padding: "10px 14px",
                      fontSize: 14,
                      outline: "none",
                      fontFamily: "inherit",
                      boxSizing: "border-box",
                    }}
                  />
                </div>
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: 12,
                      fontWeight: 700,
                      color: "#555",
                      marginBottom: 5,
                    }}
                  >
                    Personal Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Write a heartfelt blessing…"
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
                  disabled={effectiveAmount < 5000}
                  style={{
                    background: "linear-gradient(90deg, #1a1a2e, #2c2c60)",
                    color: "#D4AF37",
                    border: "none",
                    borderRadius: 12,
                    padding: "13px",
                    fontWeight: 800,
                    fontSize: 15,
                    cursor: effectiveAmount < 5000 ? "not-allowed" : "pointer",
                    opacity: effectiveAmount < 5000 ? 0.5 : 1,
                  }}
                >
                  {effectiveAmount >= 5000
                    ? `Send TZS ${effectiveAmount.toLocaleString()} Gift Card →`
                    : "Select an amount to continue"}
                </button>
              </form>
            </div>

            {/* Card preview */}
            <div>
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: "#aaa",
                  textTransform: "uppercase",
                  letterSpacing: "1px",
                  margin: "0 0 12px",
                }}
              >
                Preview
              </p>
              <div
                style={{
                  background:
                    "linear-gradient(135deg, #1a1a2e 0%, #2c2c60 100%)",
                  borderRadius: 20,
                  padding: "32px 26px",
                  color: "#fff",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -20,
                    right: -20,
                    width: 120,
                    height: 120,
                    background: "rgba(212,175,55,0.08)",
                    borderRadius: "50%",
                  }}
                />
                <div
                  style={{
                    position: "absolute",
                    bottom: -30,
                    left: -30,
                    width: 160,
                    height: 160,
                    background: "rgba(212,175,55,0.06)",
                    borderRadius: "50%",
                  }}
                />
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "1.5px",
                    textTransform: "uppercase",
                  }}
                >
                  Oscar Mkatoliki
                </p>
                <p
                  style={{
                    margin: "0 0 24px",
                    fontSize: 28,
                    fontWeight: 900,
                    color: "#D4AF37",
                  }}
                >
                  ✝ Gift Card
                </p>
                <p
                  style={{
                    margin: "0 0 6px",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.5)",
                  }}
                >
                  Value
                </p>
                <p
                  style={{
                    margin: "0 0 32px",
                    fontSize: 32,
                    fontWeight: 900,
                    color: "#fff",
                  }}
                >
                  {effectiveAmount >= 1000
                    ? `TZS ${effectiveAmount.toLocaleString()}`
                    : "TZS ---"}
                </p>
                <p
                  style={{
                    margin: 0,
                    fontSize: 11.5,
                    color: "rgba(255,255,255,0.4)",
                    fontStyle: "italic",
                  }}
                >
                  {form.message ||
                    "For every good and perfect gift is from above…"}
                </p>
              </div>
              <div
                style={{
                  marginTop: 12,
                  padding: "12px 14px",
                  background: "#fff",
                  border: "1px solid #ebebeb",
                  borderRadius: 12,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#888",
                    lineHeight: 1.6,
                  }}
                >
                  ✔ Valid for 12 months from purchase
                  <br />
                  ✔ Can be used across all products
                  <br />✔ Sent instantly via email
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Check balance tab */}
        {tab === "check" && (
          <div style={{ maxWidth: 440 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 20,
                border: "1px solid #ebebeb",
                padding: "36px 32px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.04)",
              }}
            >
              <h2
                style={{
                  fontSize: 17,
                  fontWeight: 800,
                  color: "#1a1a2e",
                  margin: "0 0 6px",
                }}
              >
                Check Gift Card Balance
              </h2>
              <p style={{ fontSize: 13.5, color: "#888", margin: "0 0 24px" }}>
                Enter the 16-character code found on your gift card email.
              </p>
              <form
                onSubmit={handleCheck}
                style={{ display: "flex", flexDirection: "column", gap: 14 }}
              >
                <input
                  type="text"
                  value={balance}
                  onChange={(e) => {
                    setBalance(e.target.value);
                    setBalanceResult(null);
                  }}
                  placeholder="e.g. GCXYZ1234ABCD5678"
                  maxLength={20}
                  style={{
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    padding: "12px 14px",
                    fontSize: 14,
                    fontFamily: "inherit",
                    outline: "none",
                    letterSpacing: "1px",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: "linear-gradient(90deg, #1a1a2e, #2c2c60)",
                    color: "#D4AF37",
                    border: "none",
                    borderRadius: 12,
                    padding: "12px",
                    fontWeight: 800,
                    fontSize: 14,
                    cursor: "pointer",
                  }}
                >
                  Check Balance
                </button>
              </form>
              {balanceResult && (
                <div
                  style={{
                    marginTop: 20,
                    padding: "14px 16px",
                    background: balanceResult.includes("not found")
                      ? "#fff5f5"
                      : "#f0fff4",
                    border: `1.5px solid ${balanceResult.includes("not found") ? "#ffb3b3" : "#86efac"}`,
                    borderRadius: 10,
                  }}
                >
                  <p
                    style={{
                      margin: 0,
                      fontWeight: 700,
                      fontSize: 14,
                      color: balanceResult.includes("not found")
                        ? "#e00"
                        : "#166534",
                    }}
                  >
                    {balanceResult}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        <style>{`
          @media (max-width: 720px) {
            .gift-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </AppLayout>
  );
}
