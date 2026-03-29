import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

const socialBtnStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  border: "1.5px solid #e5e7eb",
  borderRadius: "12px",
  padding: "12px",
  background: "#fff",
  cursor: "pointer",
  transition: "background 0.15s",
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) setError(error.message);
    else navigate("/");
  }

  async function oAuth(provider: "google" | "facebook" | "apple") {
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin },
    });
  }

  return (
    <AuthLayout>
      {/* Brand */}
      <div style={{ marginBottom: "28px", textAlign: "center" }}>
        <img
          src="/images/logo.png"
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
          fontSize: "36px",
          fontWeight: 800,
          color: "#111827",
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        Welcome Back!
      </h1>
      <p
        style={{
          marginTop: "8px",
          marginBottom: 0,
          fontSize: "14px",
          color: "#9ca3af",
        }}
      >
        Please enter your details
      </p>

      {/* Social buttons */}
      <div style={{ display: "flex", gap: "12px", marginTop: "28px" }}>
        <button
          style={socialBtnStyle}
          onClick={() => oAuth("google")}
          aria-label="Google"
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
        </button>
        <button
          style={socialBtnStyle}
          onClick={() => oAuth("facebook")}
          aria-label="Facebook"
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#1877F2">
            <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
          </svg>
        </button>
        <button
          style={socialBtnStyle}
          onClick={() => oAuth("apple" as "google")}
          aria-label="Apple"
          onMouseEnter={(e) => (e.currentTarget.style.background = "#f9fafb")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#111827">
            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
          </svg>
        </button>
      </div>

      {/* Or divider */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "20px 0",
        }}
      >
        <hr
          style={{ flex: 1, border: "none", borderTop: "1px solid #e5e7eb" }}
        />
        <span style={{ fontSize: "12px", color: "#9ca3af" }}>or</span>
        <hr
          style={{ flex: 1, border: "none", borderTop: "1px solid #e5e7eb" }}
        />
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
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
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••••"
            required
            style={inputStyle}
            onFocus={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 0 2px #111827")
            }
            onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "13px",
              color: "#6b7280",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              style={{ width: 15, height: 15, accentColor: "#111827" }}
            />
            Remember me
          </label>
          <Link
            to="/forgot-password"
            style={{
              fontSize: "13px",
              fontWeight: 600,
              color: "#374151",
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Forgot Password?
          </Link>
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
            transition: "background 0.15s",
            marginTop: "4px",
          }}
        >
          {loading ? "Signing in…" : "Sign In"}
        </button>
        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#9ca3af",
            margin: 0,
          }}
        >
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#374151",
              fontWeight: 700,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
            }}
          >
            Sign Up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
