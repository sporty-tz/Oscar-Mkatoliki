import { useState } from "react";
import { Link } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { supabase } from "../../lib/supabase";

const inputStyle: React.CSSProperties = {
  width: "100%",
  background: "#f3f4f6",
  border: "none",
  borderRadius: "12px",
  padding: "12px 16px",
  fontSize: "14px",
  color: "#111827",
  outline: "none",
  boxSizing: "border-box",
};

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);
    if (error) setError(error.message);
    else setSent(true);
  }

  return (
    <AuthLayout>
      {/* Logo */}
      <div style={{ marginBottom: "28px", textAlign: "center" }}>
        <img
          src="https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Logo/Logo.png"
          alt="Oscar Mkatoliki"
          style={{
            height: "130px",
            width: "auto",
            objectFit: "contain",
            display: "inline-block",
          }}
        />
      </div>

      <h1
        style={{
          fontSize: "32px",
          fontWeight: 800,
          color: "#111827",
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        Forgot Password?
      </h1>
      <p style={{ marginTop: "8px", fontSize: "14px", color: "#9ca3af" }}>
        Enter your email and we'll send you a reset link.
      </p>

      {sent ? (
        <div
          style={{
            marginTop: "32px",
            padding: "20px 24px",
            background: "#f0fdf4",
            borderRadius: "14px",
            border: "1px solid #bbf7d0",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: "14px",
              fontWeight: 600,
              color: "#15803d",
            }}
          >
            ✓ Reset link sent!
          </p>
          <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#166534" }}>
            Check your inbox at <strong>{email}</strong> and follow the link to
            reset your password.
          </p>
          <Link
            to="/login"
            style={{
              display: "inline-block",
              marginTop: "16px",
              fontSize: "13px",
              fontWeight: 600,
              color: "#374151",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            ← Back to Sign In
          </Link>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{
            marginTop: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {error && (
            <p
              style={{
                fontSize: "13px",
                color: "#ef4444",
                background: "#fef2f2",
                borderRadius: "8px",
                padding: "10px 14px",
                margin: 0,
              }}
            >
              {error}
            </p>
          )}

          <div>
            <label
              style={{
                display: "block",
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                marginBottom: "6px",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="youremail@mail.com"
              required
              style={inputStyle}
              onFocus={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 0 2px #111827")
              }
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              background: loading ? "#6b7280" : "#111827",
              color: "#fff",
              border: "none",
              borderRadius: "999px",
              padding: "14px",
              fontSize: "14px",
              fontWeight: 600,
              cursor: "pointer",
              marginTop: "4px",
            }}
          >
            {loading ? "Sending…" : "Send Reset Link"}
          </button>

          <p
            style={{
              textAlign: "center",
              fontSize: "12px",
              color: "#9ca3af",
              margin: 0,
            }}
          >
            Remembered your password?{" "}
            <Link
              to="/login"
              style={{
                color: "#374151",
                fontWeight: 700,
                textDecoration: "underline",
                textUnderlineOffset: "3px",
              }}
            >
              Sign In
            </Link>
          </p>
        </form>
      )}
    </AuthLayout>
  );
}
