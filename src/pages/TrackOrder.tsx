import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";

const statusSteps = [
  {
    key: "placed",
    label: "Order Placed",
    icon: "📋",
    desc: "We've received your order and payment.",
  },
  {
    key: "processing",
    label: "Processing",
    icon: "⚙️",
    desc: "Your items are being picked and packed.",
  },
  {
    key: "packed",
    label: "Packed & Ready",
    icon: "📦",
    desc: "Your parcel is sealed and labelled.",
  },
  {
    key: "shipped",
    label: "Shipped",
    icon: "🚚",
    desc: "On its way with our courier partner.",
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: "✅",
    desc: "Successfully delivered to your address.",
  },
];

// Demo result for a specific order number
const DEMO_ORDER = "OM-2024-00991";
const DEMO_STEP = 2; // 0-indexed: "Packed & Ready"

export default function TrackOrder() {
  const [orderNo, setOrderNo] = useState("");
  const [email, setEmail] = useState("");
  const [result, setResult] = useState<null | {
    found: boolean;
    step: number;
    orderNo: string;
  }>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (orderNo.trim().toUpperCase() === DEMO_ORDER) {
        setResult({
          found: true,
          step: DEMO_STEP,
          orderNo: orderNo.trim().toUpperCase(),
        });
      } else {
        setResult({ found: false, step: 0, orderNo: orderNo.trim() });
      }
      setLoading(false);
    }, 900);
  };

  const reset = () => {
    setResult(null);
    setOrderNo("");
    setEmail("");
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
          Order Tracking
        </p>
        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 40,
            margin: "0 0 16px",
          }}
        >
          Track Your Order
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.68)",
            fontSize: 16,
            maxWidth: 480,
            margin: "0 auto",
          }}
        >
          Enter your order number and the email address used at checkout to see
          the latest status.
        </p>
      </div>

      <div
        style={{ maxWidth: 640, margin: "0 auto", padding: "60px 24px 80px" }}
      >
        {/* Form */}
        {!result && (
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #ebebeb",
              padding: "36px 36px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              marginBottom: 40,
            }}
          >
            <h2
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: "#1a1a2e",
                margin: "0 0 22px",
              }}
            >
              Find Your Order
            </h2>
            <form
              onSubmit={handleSubmit}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
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
                  Order Number *
                </label>
                <input
                  type="text"
                  value={orderNo}
                  onChange={(e) => setOrderNo(e.target.value)}
                  required
                  placeholder="e.g. OM-2024-00991"
                  style={{
                    width: "100%",
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    padding: "11px 14px",
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
                <p style={{ margin: "6px 0 0", fontSize: 11.5, color: "#aaa" }}>
                  Found in your order confirmation email.
                </p>
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
                  Email Address *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="you@example.com"
                  style={{
                    width: "100%",
                    border: "1px solid #ddd",
                    borderRadius: 10,
                    padding: "11px 14px",
                    fontSize: 14,
                    outline: "none",
                    fontFamily: "inherit",
                    boxSizing: "border-box",
                  }}
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                style={{
                  background: "linear-gradient(90deg, #1a1a2e, #2c2c60)",
                  color: "#D4AF37",
                  border: "none",
                  borderRadius: 12,
                  padding: "13px",
                  fontWeight: 800,
                  fontSize: 15,
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Searching…" : "Track Order →"}
              </button>
            </form>
          </div>
        )}

        {/* Result: not found */}
        {result && !result.found && (
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #ebebeb",
              padding: "40px 36px",
              textAlign: "center",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              marginBottom: 40,
            }}
          >
            <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
            <h2
              style={{
                fontSize: 20,
                fontWeight: 900,
                color: "#1a1a2e",
                margin: "0 0 10px",
              }}
            >
              Order Not Found
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#666",
                lineHeight: 1.7,
                marginBottom: 24,
              }}
            >
              We couldn't find an order matching{" "}
              <strong>{result.orderNo}</strong>. Please double-check the order
              number in your confirmation email and try again.
            </p>
            <div
              style={{
                display: "flex",
                gap: 12,
                justifyContent: "center",
                flexWrap: "wrap",
              }}
            >
              <button
                onClick={reset}
                style={{
                  background: "#1a1a2e",
                  color: "#D4AF37",
                  border: "none",
                  borderRadius: 12,
                  padding: "11px 24px",
                  fontWeight: 700,
                  fontSize: 13.5,
                  cursor: "pointer",
                }}
              >
                Try Again
              </button>
              <a
                href="/contact"
                style={{
                  background: "#f5f5f5",
                  color: "#333",
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
        )}

        {/* Result: found — timeline */}
        {result && result.found && (
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #ebebeb",
              padding: "36px 36px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
              marginBottom: 40,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 28,
              }}
            >
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
                  Order
                </p>
                <h2
                  style={{
                    margin: "4px 0 0",
                    fontSize: 20,
                    fontWeight: 900,
                    color: "#1a1a2e",
                  }}
                >
                  {result.orderNo}
                </h2>
              </div>
              <span
                style={{
                  background: "#fdf4dc",
                  color: "#C9A84C",
                  fontWeight: 800,
                  fontSize: 12,
                  padding: "6px 14px",
                  borderRadius: 20,
                }}
              >
                {statusSteps[result.step].label}
              </span>
            </div>

            {/* Timeline */}
            <div style={{ position: "relative" }}>
              {statusSteps.map((step, i) => {
                const done = i <= result.step;
                const current = i === result.step;
                return (
                  <div
                    key={step.key}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 16,
                      position: "relative",
                      paddingBottom: i < statusSteps.length - 1 ? 28 : 0,
                    }}
                  >
                    {/* Connector line */}
                    {i < statusSteps.length - 1 && (
                      <div
                        style={{
                          position: "absolute",
                          left: 19,
                          top: 38,
                          width: 2,
                          bottom: 0,
                          background:
                            done && i < result.step ? "#D4AF37" : "#ebebeb",
                          zIndex: 0,
                        }}
                      />
                    )}
                    {/* Icon */}
                    <div
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 18,
                        zIndex: 1,
                        background: done
                          ? current
                            ? "#D4AF37"
                            : "#1a1a2e"
                          : "#f5f5f5",
                        border: current
                          ? "3px solid #D4AF37"
                          : done
                            ? "none"
                            : "2px solid #ddd",
                        boxShadow: current
                          ? "0 0 0 4px rgba(212,175,55,0.18)"
                          : "none",
                      }}
                    >
                      {step.icon}
                    </div>
                    <div style={{ paddingTop: 8 }}>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 800,
                          fontSize: 14,
                          color: done ? "#1a1a2e" : "#bbb",
                        }}
                      >
                        {step.label}
                      </p>
                      <p
                        style={{
                          margin: "3px 0 0",
                          fontSize: 12.5,
                          color: done ? "#666" : "#ccc",
                        }}
                      >
                        {step.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={reset}
              style={{
                marginTop: 28,
                width: "100%",
                background: "none",
                border: "1.5px solid #ebebeb",
                borderRadius: 12,
                padding: "11px",
                fontWeight: 700,
                fontSize: 14,
                color: "#555",
                cursor: "pointer",
              }}
            >
              Track Another Order
            </button>
          </div>
        )}

        {/* Help links */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
        >
          <a
            href="/shipping-policy"
            style={{
              textDecoration: "none",
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 14,
              padding: "18px 20px",
              textAlign: "center",
              display: "block",
            }}
          >
            <p style={{ margin: "0 0 6px", fontSize: 22 }}>🚚</p>
            <p
              style={{
                margin: 0,
                fontWeight: 700,
                color: "#1a1a2e",
                fontSize: 13,
              }}
            >
              Shipping Policy
            </p>
          </a>
          <a
            href="/contact"
            style={{
              textDecoration: "none",
              background: "#fff",
              border: "1px solid #ebebeb",
              borderRadius: 14,
              padding: "18px 20px",
              textAlign: "center",
              display: "block",
            }}
          >
            <p style={{ margin: "0 0 6px", fontSize: 22 }}>💬</p>
            <p
              style={{
                margin: 0,
                fontWeight: 700,
                color: "#1a1a2e",
                fontSize: 13,
              }}
            >
              Contact Support
            </p>
          </a>
        </div>
      </div>
    </AppLayout>
  );
}
