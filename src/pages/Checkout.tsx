import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { useCart } from "../context/CartContext";
import type { Product } from "../lib/products";

type Step = 1 | 2 | 3;

interface DeliveryInfo {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
}

const INPUT_STYLE: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1.5px solid #e8e8e8",
  borderRadius: 10,
  fontSize: 14,
  color: "#1a1a2e",
  outline: "none",
  background: "#fafafa",
  boxSizing: "border-box",
};

const STEP_LABELS = ["Cart", "Delivery", "Payment"];

export default function Checkout() {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>(1);
  const [delivery, setDelivery] = useState<DeliveryInfo>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Dar es Salaam",
  });
  const [payMethod, setPayMethod] = useState<"mpesa" | "card">("mpesa");
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [placing, setPlacing] = useState(false);

  // Aggregate duplicate items
  const aggregated = cartItems.reduce<(Product & { qty: number })[]>(
    (acc, item) => {
      const found = acc.find((i) => i.id === item.id);
      if (found) found.qty += 1;
      else acc.push({ ...item, qty: 1 });
      return acc;
    },
    [],
  );

  const subtotal = cartItems.reduce((s, p) => s + p.price, 0);
  const shipping = subtotal >= 50000 ? 0 : 5000;
  const total = subtotal + shipping;

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 1400));
    clearCart();
    navigate("/order-confirmation");
  }

  // Empty cart state
  if (cartItems.length === 0 && step === 1) {
    return (
      <AppLayout>
        <div
          style={{
            minHeight: "65vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "60px 24px",
            textAlign: "center",
          }}
        >
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "#f5f5f5",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
              fontSize: 36,
            }}
          >
            🛒
          </div>
          <h2
            style={{
              fontSize: 26,
              color: "#1a1a2e",
              fontWeight: 800,
              marginBottom: 10,
            }}
          >
            Your Cart is Empty
          </h2>
          <p
            style={{
              color: "#888",
              fontSize: 15,
              marginBottom: 32,
              lineHeight: 1.6,
            }}
          >
            Browse our collection and add items you love.
          </p>
          <a
            href="/"
            style={{
              padding: "13px 36px",
              background: "#1a1a2e",
              color: "#D4AF37",
              borderRadius: 10,
              fontWeight: 700,
              textDecoration: "none",
              fontSize: 15,
            }}
          >
            Browse Store
          </a>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div
        style={{ minHeight: "100vh", background: "#fafafa", paddingBottom: 80 }}
      >
        {/* ── Top bar ── */}
        <div
          style={{
            background: "#fff",
            borderBottom: "1px solid #f0e8d0",
            padding: "16px 24px",
          }}
        >
          <div
            style={{
              maxWidth: 1100,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            <a
              href="/"
              style={{
                color: "#1a1a2e",
                textDecoration: "none",
                fontSize: 13.5,
                fontWeight: 600,
                opacity: 0.65,
                flexShrink: 0,
              }}
            >
              ← Continue Shopping
            </a>
            <h1
              style={{
                flex: 1,
                textAlign: "center",
                margin: 0,
                fontSize: 19,
                fontWeight: 800,
                color: "#1a1a2e",
                letterSpacing: "-0.3px",
              }}
            >
              Checkout
            </h1>
            <div style={{ width: 140, flexShrink: 0 }} />
          </div>
        </div>

        {/* ── Step Indicator ── */}
        <div
          style={{
            background: "#fff",
            padding: "18px 24px",
            borderBottom: "1px solid #f0f0f0",
          }}
        >
          <div
            style={{
              maxWidth: 380,
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
            }}
          >
            {STEP_LABELS.map((label, i) => {
              const n = (i + 1) as Step;
              const active = step === n;
              const done = step > n;
              return (
                <React.Fragment key={n}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 5,
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: done || active ? "#1a1a2e" : "#f0f0f0",
                        color: done || active ? "#D4AF37" : "#bbb",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontWeight: 700,
                        fontSize: 13,
                        border: active ? "2.5px solid #D4AF37" : "none",
                        boxSizing: "border-box",
                        transition: "all 0.25s",
                      }}
                    >
                      {done ? (
                        <svg
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      ) : (
                        n
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: 11.5,
                        fontWeight: active ? 700 : 500,
                        color: active ? "#1a1a2e" : "#bbb",
                        letterSpacing: "0.2px",
                      }}
                    >
                      {label}
                    </span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div
                      style={{
                        flex: 1,
                        height: 2,
                        background: done ? "#D4AF37" : "#e8e8e8",
                        margin: "0 8px 20px",
                        transition: "background 0.3s",
                      }}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ── Main Content ── */}
        <div
          className="checkout-layout"
          style={{
            maxWidth: 1100,
            margin: "0 auto",
            padding: "32px 24px",
            display: "grid",
            gridTemplateColumns: "1fr 340px",
            gap: 28,
            alignItems: "start",
          }}
        >
          {/* ╔══ Left Panel ══╗ */}
          <div>
            {/* ── Step 1: Cart Review ── */}
            {step === 1 && (
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #f0e8d0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "20px 24px",
                    borderBottom: "1px solid #f5f5f5",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 17,
                      fontWeight: 800,
                      color: "#1a1a2e",
                    }}
                  >
                    Review Your Bag ({cartItems.length}{" "}
                    {cartItems.length === 1 ? "item" : "items"})
                  </h2>
                </div>

                <div>
                  {aggregated.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: "flex",
                        gap: 18,
                        padding: "16px 24px",
                        alignItems: "center",
                        borderBottom: "1px solid #fafafa",
                      }}
                    >
                      <div
                        style={{
                          width: 66,
                          height: 66,
                          borderRadius: 12,
                          overflow: "hidden",
                          flexShrink: 0,
                          background: "#f8f6f1",
                        }}
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p
                          style={{
                            margin: "0 0 3px",
                            fontSize: 14,
                            fontWeight: 700,
                            color: "#1a1a2e",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.name}
                        </p>
                        <p
                          style={{
                            margin: "0 0 4px",
                            fontSize: 12.5,
                            color: "#aaa",
                          }}
                        >
                          {item.category}
                        </p>
                        {item.qty > 1 && (
                          <span
                            style={{
                              display: "inline-block",
                              fontSize: 11.5,
                              color: "#C9A84C",
                              fontWeight: 700,
                              background: "#fffbf0",
                              padding: "2px 8px",
                              borderRadius: 20,
                              border: "1px solid #f0e8d0",
                            }}
                          >
                            ×{item.qty}
                          </span>
                        )}
                      </div>
                      <div
                        style={{
                          textAlign: "right",
                          flexShrink: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "flex-end",
                          gap: 8,
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 15,
                            fontWeight: 800,
                            color: "#1a1a2e",
                          }}
                        >
                          TZS {(item.price * item.qty).toLocaleString()}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{
                            background: "none",
                            border: "1px solid #ebebeb",
                            borderRadius: 6,
                            padding: "4px 10px",
                            fontSize: 11.5,
                            color: "#aaa",
                            cursor: "pointer",
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {shipping > 0 && (
                  <div
                    style={{
                      padding: "13px 24px",
                      background: "#fffbf0",
                      borderTop: "1px solid #f0e8d0",
                    }}
                  >
                    <p style={{ margin: 0, fontSize: 13, color: "#b8860b" }}>
                      🚚 Add TZS {(50000 - subtotal).toLocaleString()} more for{" "}
                      <strong>free shipping!</strong>
                    </p>
                  </div>
                )}

                <div
                  style={{
                    padding: "20px 24px",
                    borderTop: "1px solid #f5f5f5",
                  }}
                >
                  <button
                    onClick={() => setStep(2)}
                    style={{
                      width: "100%",
                      padding: "15px",
                      background: "#1a1a2e",
                      color: "#D4AF37",
                      border: "none",
                      borderRadius: 12,
                      fontWeight: 800,
                      fontSize: 15,
                      cursor: "pointer",
                      letterSpacing: "0.2px",
                    }}
                  >
                    Continue to Delivery →
                  </button>
                </div>
              </div>
            )}

            {/* ── Step 2: Delivery ── */}
            {step === 2 && (
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #f0e8d0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "20px 24px",
                    borderBottom: "1px solid #f5f5f5",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 17,
                      fontWeight: 800,
                      color: "#1a1a2e",
                    }}
                  >
                    Delivery Details
                  </h2>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep(3);
                  }}
                  style={{ padding: "24px" }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 16,
                      marginBottom: 16,
                    }}
                  >
                    <div>
                      <label style={LABEL_STYLE}>Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maria Joseph"
                        value={delivery.name}
                        onChange={(e) =>
                          setDelivery((d) => ({ ...d, name: e.target.value }))
                        }
                        style={INPUT_STYLE}
                      />
                    </div>
                    <div>
                      <label style={LABEL_STYLE}>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={delivery.email}
                        onChange={(e) =>
                          setDelivery((d) => ({ ...d, email: e.target.value }))
                        }
                        style={INPUT_STYLE}
                      />
                    </div>
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={LABEL_STYLE}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+255 712 345 678"
                      value={delivery.phone}
                      onChange={(e) =>
                        setDelivery((d) => ({ ...d, phone: e.target.value }))
                      }
                      style={INPUT_STYLE}
                    />
                  </div>

                  <div style={{ marginBottom: 16 }}>
                    <label style={LABEL_STYLE}>Street Address *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Msasani, Barabara ya Haile Selasie"
                      value={delivery.address}
                      onChange={(e) =>
                        setDelivery((d) => ({ ...d, address: e.target.value }))
                      }
                      style={INPUT_STYLE}
                    />
                  </div>

                  <div style={{ marginBottom: 28 }}>
                    <label style={LABEL_STYLE}>City *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Dar es Salaam"
                      value={delivery.city}
                      onChange={(e) =>
                        setDelivery((d) => ({ ...d, city: e.target.value }))
                      }
                      style={INPUT_STYLE}
                    />
                  </div>

                  <div style={{ display: "flex", gap: 12 }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={BACK_BTN_STYLE}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      style={{
                        flex: 2,
                        padding: "14px",
                        background: "#1a1a2e",
                        color: "#D4AF37",
                        border: "none",
                        borderRadius: 12,
                        fontWeight: 800,
                        fontSize: 15,
                        cursor: "pointer",
                      }}
                    >
                      Continue to Payment →
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ── Step 3: Payment ── */}
            {step === 3 && (
              <div
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #f0e8d0",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    padding: "20px 24px",
                    borderBottom: "1px solid #f5f5f5",
                  }}
                >
                  <h2
                    style={{
                      margin: 0,
                      fontSize: 17,
                      fontWeight: 800,
                      color: "#1a1a2e",
                    }}
                  >
                    Choose Payment Method
                  </h2>
                </div>

                <form onSubmit={handlePlaceOrder} style={{ padding: "24px" }}>
                  {/* Method tabs */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: 12,
                      marginBottom: 24,
                    }}
                  >
                    {(["mpesa", "card"] as const).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setPayMethod(m)}
                        style={{
                          padding: "14px 12px",
                          borderRadius: 12,
                          border:
                            payMethod === m
                              ? "2px solid #D4AF37"
                              : "1.5px solid #e8e8e8",
                          background: payMethod === m ? "#fffbf0" : "#fff",
                          cursor: "pointer",
                          fontWeight: 700,
                          fontSize: 14,
                          color: payMethod === m ? "#1a1a2e" : "#999",
                          transition: "all 0.2s",
                        }}
                      >
                        {m === "mpesa" ? "📱 M-Pesa" : "💳 Card"}
                      </button>
                    ))}
                  </div>

                  {payMethod === "mpesa" && (
                    <div>
                      <label style={LABEL_STYLE}>M-Pesa Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="+255 712 345 678"
                        value={mpesaPhone}
                        onChange={(e) => setMpesaPhone(e.target.value)}
                        style={INPUT_STYLE}
                      />
                      <p
                        style={{
                          fontSize: 12.5,
                          color: "#aaa",
                          marginTop: 10,
                          lineHeight: 1.65,
                        }}
                      >
                        You will receive a Push notification to confirm your
                        payment of{" "}
                        <strong style={{ color: "#1a1a2e" }}>
                          TZS {total.toLocaleString()}
                        </strong>
                        .
                      </p>
                    </div>
                  )}

                  {payMethod === "card" && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                      }}
                    >
                      <div>
                        <label style={LABEL_STYLE}>Card Number *</label>
                        <input
                          type="text"
                          required
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                          style={INPUT_STYLE}
                        />
                      </div>
                      <div
                        style={{
                          display: "grid",
                          gridTemplateColumns: "1fr 1fr",
                          gap: 14,
                        }}
                      >
                        <div>
                          <label style={LABEL_STYLE}>Expiry *</label>
                          <input
                            type="text"
                            required
                            placeholder="MM / YY"
                            style={INPUT_STYLE}
                          />
                        </div>
                        <div>
                          <label style={LABEL_STYLE}>CVC *</label>
                          <input
                            type="text"
                            required
                            placeholder="•••"
                            maxLength={4}
                            style={INPUT_STYLE}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      style={BACK_BTN_STYLE}
                    >
                      ← Back
                    </button>
                    <button
                      type="submit"
                      disabled={placing}
                      style={{
                        flex: 2,
                        padding: "14px",
                        background: placing
                          ? "#ccc"
                          : "linear-gradient(135deg, #D4AF37, #C9A84C)",
                        color: "#1a1a2e",
                        border: "none",
                        borderRadius: 12,
                        fontWeight: 800,
                        fontSize: 15,
                        cursor: placing ? "not-allowed" : "pointer",
                        transition: "all 0.2s",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {placing
                        ? "Processing…"
                        : `Place Order · TZS ${total.toLocaleString()}`}
                    </button>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      marginTop: 18,
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#bbb"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="3" y="11" width="18" height="11" rx="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                    <span style={{ fontSize: 12, color: "#ccc" }}>
                      Secured with 256-bit SSL encryption
                    </span>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* ╔══ Right Panel: Order Summary ══╗ */}
          <div style={{ position: "sticky", top: 24 }}>
            <div
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid #f0e8d0",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "18px 22px",
                  borderBottom: "1px solid #f5f5f5",
                }}
              >
                <h3
                  style={{
                    margin: 0,
                    fontSize: 15,
                    fontWeight: 800,
                    color: "#1a1a2e",
                  }}
                >
                  Order Summary
                </h3>
              </div>

              <div style={{ padding: "10px 22px" }}>
                {aggregated.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      padding: "9px 0",
                      borderBottom: "1px solid #fafafa",
                      gap: 10,
                    }}
                  >
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontSize: 13,
                          fontWeight: 600,
                          color: "#333",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.name}
                      </p>
                      {item.qty > 1 && (
                        <p
                          style={{
                            margin: "2px 0 0",
                            fontSize: 11,
                            color: "#bbb",
                          }}
                        >
                          ×{item.qty}
                        </p>
                      )}
                    </div>
                    <span
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: "#1a1a2e",
                        flexShrink: 0,
                      }}
                    >
                      TZS {(item.price * item.qty).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div
                style={{
                  padding: "14px 22px",
                  borderTop: "1px solid #f5f5f5",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span style={{ fontSize: 13, color: "#777" }}>Subtotal</span>
                  <span
                    style={{ fontSize: 13, fontWeight: 600, color: "#333" }}
                  >
                    TZS {subtotal.toLocaleString()}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: 18,
                  }}
                >
                  <span style={{ fontSize: 13, color: "#777" }}>Shipping</span>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: shipping === 0 ? "#16a34a" : "#333",
                    }}
                  >
                    {shipping === 0
                      ? "Free 🎉"
                      : `TZS ${shipping.toLocaleString()}`}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: 14,
                    borderTop: "1.5px solid #f0e8d0",
                  }}
                >
                  <span
                    style={{ fontSize: 16, fontWeight: 800, color: "#1a1a2e" }}
                  >
                    Total
                  </span>
                  <span
                    style={{ fontSize: 19, fontWeight: 900, color: "#1a1a2e" }}
                  >
                    TZS {total.toLocaleString()}
                  </span>
                </div>
              </div>

              <div
                style={{
                  padding: "13px 22px",
                  borderTop: "1px solid #f5f5f5",
                  background: "#fffbf0",
                  textAlign: "center",
                }}
              >
                <p
                  style={{
                    margin: 0,
                    fontSize: 12,
                    color: "#b8860b",
                    fontStyle: "italic",
                  }}
                >
                  ✝ Blessed items, delivered with love
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .checkout-layout {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </AppLayout>
  );
}

const LABEL_STYLE: React.CSSProperties = {
  fontSize: 12.5,
  fontWeight: 600,
  color: "#555",
  display: "block",
  marginBottom: 6,
};

const BACK_BTN_STYLE: React.CSSProperties = {
  flex: 1,
  padding: "14px",
  background: "#f5f5f5",
  color: "#666",
  border: "none",
  borderRadius: 12,
  fontWeight: 700,
  cursor: "pointer",
  fontSize: 14,
};
