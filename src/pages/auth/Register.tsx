import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "./AuthLayout";
import { supabase } from "../../lib/supabase";

const IS: React.CSSProperties = {
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
const LS: React.CSSProperties = {
  display: "block",
  fontSize: "13px",
  fontWeight: 600,
  color: "#374151",
  marginBottom: "6px",
};
const focus = (e: React.FocusEvent<HTMLInputElement>) =>
  (e.currentTarget.style.boxShadow = "0 0 0 2px #111827");
const blur = (e: React.FocusEvent<HTMLInputElement>) =>
  (e.currentTarget.style.boxShadow = "none");

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set =
    (f: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
      setForm((p) => ({ ...p, [f]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!agree) {
      setError("You must agree to the terms and conditions.");
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: form.email,
      password: form.password,
      options: {
        data: {
          full_name: `${form.firstName} ${form.lastName}`.trim(),
          phone: form.phone,
        },
      },
    });
    setLoading(false);
    if (error) setError(error.message);
    else navigate("/login");
  }

  return (
    <AuthLayout>
      {/* Brand */}
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
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
          fontSize: "30px",
          fontWeight: 800,
          color: "#111827",
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        Create an Account
      </h1>
      <p style={{ marginTop: "8px", fontSize: "13px", color: "#9ca3af" }}>
        Join our community and start your Catholic journey.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          marginTop: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "14px",
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

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <div>
            <label style={LS}>First name</label>
            <input
              type="text"
              style={IS}
              value={form.firstName}
              onChange={set("firstName")}
              placeholder="John"
              required
              onFocus={focus}
              onBlur={blur}
            />
          </div>
          <div>
            <label style={LS}>Last name</label>
            <input
              type="text"
              style={IS}
              value={form.lastName}
              onChange={set("lastName")}
              placeholder="Doe"
              required
              onFocus={focus}
              onBlur={blur}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <div>
            <label style={LS}>Phone Number</label>
            <input
              type="tel"
              style={IS}
              value={form.phone}
              onChange={set("phone")}
              placeholder="+255 712 345 678"
              onFocus={focus}
              onBlur={blur}
            />
          </div>
          <div>
            <label style={LS}>Email Address</label>
            <input
              type="email"
              style={IS}
              value={form.email}
              onChange={set("email")}
              placeholder="youremail@mail.com"
              required
              onFocus={focus}
              onBlur={blur}
            />
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "12px",
          }}
        >
          <div>
            <label style={LS}>Password</label>
            <input
              type="password"
              style={IS}
              value={form.password}
              onChange={set("password")}
              placeholder="••••••••••••••"
              required
              minLength={6}
              onFocus={focus}
              onBlur={blur}
            />
          </div>
          <div>
            <label style={LS}>Confirm Password</label>
            <input
              type="password"
              style={IS}
              value={form.confirmPassword}
              onChange={set("confirmPassword")}
              placeholder="••••••••••••••"
              required
              minLength={6}
              onFocus={focus}
              onBlur={blur}
            />
          </div>
        </div>

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
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            style={{ width: 15, height: 15, accentColor: "#111827" }}
          />
          I agree to the{" "}
          <span
            style={{
              color: "#374151",
              fontWeight: 600,
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              cursor: "pointer",
            }}
          >
            terms and conditions
          </span>
        </label>

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
          {loading ? "Creating account…" : "Sign Up"}
        </button>

        <p
          style={{
            textAlign: "center",
            fontSize: "12px",
            color: "#9ca3af",
            margin: 0,
          }}
        >
          Already have an account?{" "}
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
    </AuthLayout>
  );
}
