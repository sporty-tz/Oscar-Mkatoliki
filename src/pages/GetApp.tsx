import AppLayout from "../components/layout/AppLayout";

const features = [
  {
    icon: "🛒",
    title: "Shop Anytime",
    desc: "Browse our full catalogue of religious items, music, and faith resources from anywhere on your phone.",
  },
  {
    icon: "🔔",
    title: "Order Notifications",
    desc: "Get real-time push notifications at every step — order confirmed, packed, dispatched and delivered.",
  },
  {
    icon: "📖",
    title: "Daily Devotionals",
    desc: "Receive daily Catholic devotionals, prayers and reflections directly in the app each morning.",
  },
  {
    icon: "🎵",
    title: "Music Player",
    desc: "Stream Oscar Mkatoliki's full discography and download albums for offline listening.",
  },
  {
    icon: "🗺️",
    title: "Find a Parish",
    desc: "Locate Catholic parishes near you using GPS — get directions, Mass times and contact info.",
  },
  {
    icon: "💳",
    title: "Saved Addresses & Cards",
    desc: "Checkout in seconds with your saved delivery addresses and mobile money accounts.",
  },
];

export default function GetApp() {
  return (
    <AppLayout>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #2c2c60 100%)",
          padding: "80px 24px 80px",
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
          Download the App
        </p>
        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 42,
            margin: "0 0 16px",
            lineHeight: 1.2,
          }}
        >
          Faith & Shopping in Your Pocket
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.68)",
            fontSize: 16,
            maxWidth: 520,
            margin: "0 auto 36px",
          }}
        >
          The Oscar Mkatoliki app brings your favourite Catholic store, music
          and devotional content to your phone. Available for iOS and Android.
        </p>

        {/* Download buttons */}
        <div
          style={{
            display: "flex",
            gap: 14,
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#000",
              color: "#fff",
              borderRadius: 14,
              padding: "12px 24px",
              textDecoration: "none",
              border: "1.5px solid rgba(255,255,255,0.15)",
              minWidth: 180,
            }}
          >
            <span style={{ fontSize: 28 }}>🍏</span>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  opacity: 0.7,
                  letterSpacing: "0.5px",
                }}
              >
                Download on the
              </p>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
                App Store
              </p>
            </div>
          </a>
          <a
            href="#"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              background: "#000",
              color: "#fff",
              borderRadius: 14,
              padding: "12px 24px",
              textDecoration: "none",
              border: "1.5px solid rgba(255,255,255,0.15)",
              minWidth: 180,
            }}
          >
            <span style={{ fontSize: 28 }}>▶️</span>
            <div style={{ textAlign: "left" }}>
              <p
                style={{
                  margin: 0,
                  fontSize: 10,
                  opacity: 0.7,
                  letterSpacing: "0.5px",
                }}
              >
                Get it on
              </p>
              <p style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>
                Google Play
              </p>
            </div>
          </a>
        </div>
      </div>

      <div
        style={{ maxWidth: 1000, margin: "0 auto", padding: "70px 24px 80px" }}
      >
        {/* QR + coming soon banner */}
        <div
          style={{
            background: "#fdf4dc",
            border: "1.5px solid #D4AF37",
            borderRadius: 16,
            padding: "22px 28px",
            marginBottom: 60,
            display: "flex",
            alignItems: "center",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <span style={{ fontSize: 32 }}>📱</span>
          <div>
            <p
              style={{
                margin: "0 0 4px",
                fontWeight: 800,
                color: "#1a1a2e",
                fontSize: 15,
              }}
            >
              App Coming Soon
            </p>
            <p style={{ margin: 0, color: "#666", fontSize: 13.5 }}>
              Our mobile app is in active development. Sign up below to be
              notified the moment it launches and receive an exclusive
              first-user discount.
            </p>
          </div>
        </div>

        {/* Features */}
        <h2
          style={{
            fontSize: 22,
            fontWeight: 900,
            color: "#1a1a2e",
            textAlign: "center",
            margin: "0 0 36px",
          }}
        >
          Everything in One App
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
            marginBottom: 64,
          }}
          className="app-features"
        >
          {features.map((f) => (
            <div
              key={f.title}
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid #ebebeb",
                padding: "26px 22px",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 14 }}>{f.icon}</div>
              <h3
                style={{
                  margin: "0 0 8px",
                  fontSize: 14.5,
                  fontWeight: 800,
                  color: "#1a1a2e",
                }}
              >
                {f.title}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontSize: 13,
                  color: "#666",
                  lineHeight: 1.7,
                }}
              >
                {f.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Early access form */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #2c2c60)",
            borderRadius: 20,
            padding: "44px 52px",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 22, fontWeight: 900 }}>
            Get Early Access
          </h2>
          <p
            style={{
              margin: "0 0 28px",
              fontSize: 14.5,
              color: "rgba(255,255,255,0.7)",
              maxWidth: 440,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            Be the first to know when the app launches — and get 10% off your
            first in-app order.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("You're on the list! We'll notify you at launch.");
            }}
            style={{
              display: "flex",
              gap: 10,
              maxWidth: 440,
              margin: "0 auto",
              flexWrap: "wrap",
            }}
          >
            <input
              type="email"
              required
              placeholder="Enter your email address"
              style={{
                flex: 1,
                minWidth: 200,
                border: "none",
                borderRadius: 12,
                padding: "12px 16px",
                fontSize: 14,
                fontFamily: "inherit",
                outline: "none",
              }}
            />
            <button
              type="submit"
              style={{
                background: "#D4AF37",
                color: "#1a1a2e",
                border: "none",
                borderRadius: 12,
                padding: "12px 24px",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                whiteSpace: "nowrap",
              }}
            >
              Notify Me
            </button>
          </form>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .app-features { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 480px) {
            .app-features { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </AppLayout>
  );
}
