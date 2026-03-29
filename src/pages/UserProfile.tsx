import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AppLayout from "../components/layout/AppLayout";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

function getInitials(email?: string, meta?: Record<string, unknown>): string {
  const name = (meta?.full_name as string) || (meta?.name as string) || "";
  if (name)
    return name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  return (email?.[0] ?? "U").toUpperCase();
}

export default function UserProfile() {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const meta = user.user_metadata ?? {};
    setFullName((meta.full_name as string) || (meta.name as string) || "");
    setPhone((meta.phone as string) || "");
  }, [user, navigate]);

  if (!user) return null;

  const initials = getInitials(user.email, user.user_metadata);
  const displayName =
    (user.user_metadata?.full_name as string) ||
    (user.user_metadata?.name as string) ||
    "My Account";
  const memberSince = new Date(user.created_at!).toLocaleDateString("en-GB", {
    year: "numeric",
    month: "long",
  });

  async function handleSave() {
    setSaving(true);
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, phone },
    });
    setSaving(false);
    if (error) {
      setSaveMsg("Error: " + error.message);
    } else {
      setSaveMsg("✓ Profile updated");
      setEditing(false);
      setTimeout(() => setSaveMsg(""), 3000);
    }
  }

  function cancelEdit() {
    setEditing(false);
    const meta = user?.user_metadata ?? {};
    setFullName((meta.full_name as string) || (meta.name as string) || "");
    setPhone((meta.phone as string) || "");
    setSaveMsg("");
  }

  async function handleLogout() {
    await signOut();
    navigate("/login");
  }

  /* ── Shared micro-styles ── */
  const card = {
    background: "#fff",
    borderRadius: 16,
    border: "1px solid #ebebeb",
    boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
    padding: "28px 32px",
  };

  const label = {
    display: "block" as const,
    fontSize: 11,
    fontWeight: 600,
    color: "#999",
    textTransform: "uppercase" as const,
    letterSpacing: "0.8px",
    marginBottom: 5,
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    border: "1.5px solid #C9A84C",
    borderRadius: 10,
    fontSize: 14,
    outline: "none",
    color: "#1a1a2e",
    background: "#fffdf5",
    boxSizing: "border-box" as const,
    fontFamily: "inherit",
  };

  const btnGold = {
    background: "#D4AF37",
    color: "#1a1a2e",
    border: "none",
    borderRadius: 10,
    padding: "10px 24px",
    fontWeight: 700,
    fontSize: 14,
    cursor: "pointer",
    transition: "background 0.15s",
  };

  const btnOutline = {
    background: "#fff",
    color: "#555",
    border: "1.5px solid #ddd",
    borderRadius: 10,
    padding: "10px 22px",
    fontWeight: 600,
    fontSize: 14,
    cursor: "pointer",
  };

  return (
    <AppLayout>
      <div
        style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}
      >
        {/* ── Profile Hero ── */}
        <div
          style={{
            ...card,
            background: "linear-gradient(135deg, #1a1a2e 0%, #2c2c60 100%)",
            border: "none",
            display: "flex",
            alignItems: "center",
            gap: 28,
            marginBottom: 20,
            padding: "32px 36px",
            flexWrap: "wrap",
          }}
        >
          {/* Avatar */}
          <div
            style={{
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "rgba(212,175,55,0.12)",
              border: "3px solid #D4AF37",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#D4AF37",
              fontSize: 28,
              fontWeight: 800,
              flexShrink: 0,
              letterSpacing: "-1px",
            }}
          >
            {initials}
          </div>

          {/* Name + email + badge */}
          <div style={{ flex: 1, minWidth: 180 }}>
            <h1
              style={{
                margin: "0 0 4px",
                fontSize: 22,
                fontWeight: 800,
                color: "#fff",
                lineHeight: 1.2,
              }}
            >
              {displayName}
            </h1>
            <p
              style={{
                margin: "0 0 10px",
                fontSize: 14,
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {user.email}
            </p>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "3px 12px",
                background: "rgba(212,175,55,0.15)",
                border: "1px solid rgba(212,175,55,0.35)",
                borderRadius: 20,
                fontSize: 11.5,
                color: "#D4AF37",
                fontWeight: 600,
              }}
            >
              ✝ Member since {memberSince}
            </span>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleLogout}
            style={{
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.18)",
              color: "#fff",
              borderRadius: 10,
              padding: "9px 20px",
              fontSize: 13,
              fontWeight: 600,
              cursor: "pointer",
              flexShrink: 0,
              transition: "background 0.15s",
              display: "flex",
              alignItems: "center",
              gap: 7,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(229,62,62,0.25)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.07)")
            }
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Sign Out
          </button>
        </div>

        {/* ── Stats Row ── */}
        <div
          className="profile-stats"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginBottom: 20,
          }}
        >
          {[
            { icon: "📦", value: "0", label: "Orders" },
            { icon: "♡", value: "0", label: "Wishlist" },
            { icon: "📍", value: "0", label: "Addresses" },
          ].map((s) => (
            <div
              key={s.label}
              style={{ ...card, textAlign: "center", padding: "22px 16px" }}
            >
              <div style={{ fontSize: 28, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: 24, fontWeight: 800, color: "#1a1a2e" }}>
                {s.value}
              </div>
              <div style={{ fontSize: 12, color: "#999", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Two-column grid ── */}
        <div
          className="profile-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 20,
            marginBottom: 20,
          }}
        >
          {/* ── Personal Information ── */}
          <div style={card}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 22,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  fontSize: 16,
                  fontWeight: 800,
                  color: "#1a1a2e",
                }}
              >
                Personal Information
              </h2>
              {!editing && (
                <button
                  onClick={() => setEditing(true)}
                  style={{
                    background: "none",
                    border: "1px solid #D4AF37",
                    color: "#C9A84C",
                    borderRadius: 8,
                    padding: "5px 14px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Edit
                </button>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Full Name */}
              <div>
                <span style={label}>Full Name</span>
                {editing ? (
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    style={inputStyle}
                  />
                ) : (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      color: fullName ? "#1a1a2e" : "#ccc",
                      fontWeight: 500,
                    }}
                  >
                    {fullName || "—"}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <span style={label}>Email Address</span>
                <p
                  style={{
                    margin: 0,
                    fontSize: 15,
                    color: "#555",
                    fontWeight: 500,
                  }}
                >
                  {user.email}
                </p>
                <p style={{ margin: "3px 0 0", fontSize: 11, color: "#bbb" }}>
                  Email cannot be changed here
                </p>
              </div>

              {/* Phone */}
              <div>
                <span style={label}>Phone Number</span>
                {editing ? (
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+255 XXX XXX XXX"
                    style={inputStyle}
                  />
                ) : (
                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      color: phone ? "#1a1a2e" : "#ccc",
                      fontWeight: 500,
                    }}
                  >
                    {phone || "—"}
                  </p>
                )}
              </div>

              {/* Action buttons (edit mode) */}
              {editing && (
                <div style={{ display: "flex", gap: 10, paddingTop: 4 }}>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{ ...btnGold, opacity: saving ? 0.7 : 1 }}
                    onMouseEnter={(e) =>
                      !saving && (e.currentTarget.style.background = "#C9A84C")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#D4AF37")
                    }
                  >
                    {saving ? "Saving…" : "Save Changes"}
                  </button>
                  <button onClick={cancelEdit} style={btnOutline}>
                    Cancel
                  </button>
                </div>
              )}

              {saveMsg && (
                <p
                  style={{
                    margin: 0,
                    fontSize: 13,
                    fontWeight: 600,
                    color: saveMsg.startsWith("✓") ? "#2d7a2d" : "#e53e3e",
                  }}
                >
                  {saveMsg}
                </p>
              )}
            </div>
          </div>

          {/* ── Security & Account ── */}
          <div
            style={{
              ...card,
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 800,
                color: "#1a1a2e",
              }}
            >
              Security & Account
            </h2>

            {/* Password row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                background: "#fafafa",
                borderRadius: 12,
                border: "1px solid #f0f0f0",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#1a1a2e",
                  }}
                >
                  Password
                </p>
                <p style={{ margin: "2px 0 0", fontSize: 12, color: "#aaa" }}>
                  ●●●●●●●●●●
                </p>
              </div>
              <a
                href="/change-password"
                style={{
                  background: "#1a1a2e",
                  color: "#D4AF37",
                  borderRadius: 8,
                  padding: "7px 14px",
                  fontSize: 12,
                  fontWeight: 700,
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Change
              </a>
            </div>

            {/* Account ID row */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "14px 16px",
                background: "#fafafa",
                borderRadius: 12,
                border: "1px solid #f0f0f0",
              }}
            >
              <div>
                <p
                  style={{
                    margin: 0,
                    fontWeight: 600,
                    fontSize: 14,
                    color: "#1a1a2e",
                  }}
                >
                  Account ID
                </p>
                <p
                  style={{
                    margin: "2px 0 0",
                    fontSize: 11,
                    color: "#bbb",
                    fontFamily: "monospace",
                  }}
                >
                  {user.id.slice(0, 8).toUpperCase()}…
                </p>
              </div>
              <span
                style={{
                  background: "#eafbea",
                  color: "#2d7a2d",
                  borderRadius: 20,
                  padding: "4px 12px",
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                Active
              </span>
            </div>

            {/* Sign out button */}
            <div style={{ marginTop: "auto", paddingTop: 8 }}>
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  padding: "11px",
                  background: "#fff5f5",
                  border: "1.5px solid #fed7d7",
                  borderRadius: 10,
                  color: "#e53e3e",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                  transition: "background 0.15s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#ffe8e8")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#fff5f5")
                }
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                Sign Out of Account
              </button>
            </div>
          </div>
        </div>

        {/* ── Recent Orders ── */}
        <div style={card}>
          <h2
            style={{
              margin: "0 0 16px",
              fontSize: 16,
              fontWeight: 800,
              color: "#1a1a2e",
            }}
          >
            Recent Orders
          </h2>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "52px 24px",
              background: "#fafafa",
              borderRadius: 12,
              gap: 12,
            }}
          >
            <span style={{ fontSize: 40 }}>📦</span>
            <p
              style={{
                margin: 0,
                fontWeight: 700,
                color: "#1a1a2e",
                fontSize: 16,
              }}
            >
              No orders yet
            </p>
            <p style={{ margin: 0, color: "#999", fontSize: 13 }}>
              Your order history will appear here
            </p>
            <a
              href="/"
              style={{
                ...btnGold,
                display: "inline-block",
                textDecoration: "none",
                padding: "10px 32px",
                borderRadius: 10,
                marginTop: 4,
              }}
            >
              Start Shopping
            </a>
          </div>
        </div>

        {/* ── Responsive overrides ── */}
        <style>{`
          @media (max-width: 768px) {
            .profile-grid { grid-template-columns: 1fr !important; }
          }
          @media (max-width: 540px) {
            .profile-stats { grid-template-columns: 1fr 1fr !important; }
          }
        `}</style>
      </div>
    </AppLayout>
  );
}
