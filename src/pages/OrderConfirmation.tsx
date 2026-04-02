import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { getOrder } from "../lib/orders";

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderParam = searchParams.get("order");
  const [orderNum] = useState(
    () =>
      orderParam || `OM-${String(Math.floor(100000 + Math.random() * 900000))}`,
  );
  const [orderData, setOrderData] = useState<{
    total_amount: number;
    subtotal: number;
    delivery_fee: number;
    created_at: string;
    status: string;
    payment_status: string;
    order_items: {
      product_name: string;
      quantity: number;
      unit_price: number;
      subtotal: number;
    }[];
  } | null>(null);

  useEffect(() => {
    if (orderParam) {
      getOrder(orderParam).then((data) => {
        if (data) setOrderData(data as typeof orderData);
      });
    }
  }, [orderParam]);

  return (
    <AppLayout>
      <div
        style={{
          minHeight: "80vh",
          background: "#fafafa",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "60px 24px",
        }}
      >
        <div style={{ maxWidth: 560, width: "100%", textAlign: "center" }}>
          {/* Success badge */}
          <div
            style={{
              width: 84,
              height: 84,
              borderRadius: "50%",
              background: "#edfaf3",
              border: "3px solid #52c48a",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 28px",
            }}
          >
            <svg
              width="38"
              height="38"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#16a34a"
              strokeWidth="2.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: "#1a1a2e",
              marginBottom: 10,
              letterSpacing: "-0.5px",
            }}
          >
            Order Placed!
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "#666",
              marginBottom: 6,
              lineHeight: 1.7,
            }}
          >
            Thank you! Your order has been received successfully.
          </p>
          <p
            style={{
              fontSize: 13,
              color: "#C9A84C",
              fontWeight: 700,
              marginBottom: 36,
              letterSpacing: "0.3px",
            }}
          >
            {orderNum}
          </p>

          {/* Faith card */}
          <div
            style={{
              background: "#fff",
              border: "1.5px solid #f0e8d0",
              borderRadius: 18,
              padding: "26px 28px",
              marginBottom: 32,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "linear-gradient(to right, transparent, #D4AF37)",
                }}
              />
              <span style={{ fontSize: 17, color: "#D4AF37" }}>✝</span>
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: "linear-gradient(to left, transparent, #D4AF37)",
                }}
              />
            </div>
            <p
              style={{
                fontSize: 14,
                color: "#777",
                margin: "0 0 14px",
                lineHeight: 1.7,
              }}
            >
              We are preparing your order with care. A confirmation will be sent
              to your email shortly.
            </p>
            <p
              style={{
                fontSize: 13.5,
                fontStyle: "italic",
                color: "#C9A84C",
                margin: 0,
              }}
            >
              &ldquo;May the Lord bless you and keep you; may His face shine
              upon you.&rdquo; — Numbers 6:24–25
            </p>
          </div>

          {/* Order items summary */}
          {orderData && orderData.order_items.length > 0 && (
            <div
              style={{
                background: "#fff",
                border: "1px solid #f0f0f0",
                borderRadius: 14,
                padding: "20px 24px",
                marginBottom: 32,
                textAlign: "left",
              }}
            >
              <h3
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1a1a2e",
                  margin: "0 0 14px",
                }}
              >
                Order Items
              </h3>
              {orderData.order_items.map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "8px 0",
                    borderBottom:
                      i < orderData.order_items.length - 1
                        ? "1px solid #f5f5f5"
                        : "none",
                    fontSize: 13,
                  }}
                >
                  <span style={{ color: "#555" }}>
                    {item.product_name} × {item.quantity}
                  </span>
                  <span style={{ fontWeight: 700, color: "#1a1a2e" }}>
                    TZS {item.subtotal.toLocaleString()}
                  </span>
                </div>
              ))}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "10px 0 0",
                  marginTop: 8,
                  borderTop: "1.5px solid #f0e8d0",
                  fontSize: 15,
                  fontWeight: 800,
                  color: "#1a1a2e",
                }}
              >
                <span>Total</span>
                <span>TZS {orderData.total_amount.toLocaleString()}</span>
              </div>
            </div>
          )}

          {/* Delivery info row */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 0,
              marginBottom: 36,
              background: "#fff",
              border: "1px solid #f0f0f0",
              borderRadius: 14,
              overflow: "hidden",
            }}
          >
            <div style={{ flex: 1, padding: "18px 20px", textAlign: "center" }}>
              <p
                style={{
                  fontSize: 11,
                  color: "#bbb",
                  margin: "0 0 5px",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  fontWeight: 600,
                }}
              >
                Est. Delivery
              </p>
              <p
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1a1a2e",
                  margin: 0,
                }}
              >
                3 – 5 Business Days
              </p>
            </div>
            <div
              style={{ width: 1, background: "#f0f0f0", margin: "12px 0" }}
            />
            <div style={{ flex: 1, padding: "18px 20px", textAlign: "center" }}>
              <p
                style={{
                  fontSize: 11,
                  color: "#bbb",
                  margin: "0 0 5px",
                  textTransform: "uppercase",
                  letterSpacing: "0.8px",
                  fontWeight: 600,
                }}
              >
                Need Help?
              </p>
              <a
                href="/contact"
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#1a1a2e",
                  textDecoration: "none",
                }}
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Action buttons */}
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
                padding: "13px 30px",
                background: "#1a1a2e",
                color: "#D4AF37",
                borderRadius: 10,
                fontWeight: 700,
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              Track Order
            </a>
            <a
              href="/"
              style={{
                padding: "13px 30px",
                background: "#f5f5f5",
                color: "#555",
                borderRadius: 10,
                fontWeight: 700,
                textDecoration: "none",
                fontSize: 14,
              }}
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
