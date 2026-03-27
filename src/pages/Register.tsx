import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithGoogle, signup } from "../lib/supabase";
import "@/styles/user-auth.css";

export default function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (password !== confirm) {
      setErrorMessage("Passwords do not match");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await signup(name, email, password);
      if (!result.session) {
        setSuccessMessage(
          "Account created. Please verify your email, then login.",
        );
      } else {
        navigate("/");
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to register";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    try {
      await signInWithGoogle("/profile?complete=1");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to continue with Google";
      setErrorMessage(message);
    }
  };

  return (
    <section className="auth-split-page">
      <div className="auth-split-shell auth-split-shell-register">
        <div className="auth-split-left">
          <div className="auth-split-content">
            <div className="auth-brand-row">
              <Link to="/">
                <img src="/images/Logo-3.png" alt="Oscalius logo" />
              </Link>
            </div>

            <div className="auth-split-title">
              <h2>Create Account</h2>
              <p>Keep signup minimal, complete profile after first login.</p>
            </div>

            <div className="auth-social-row" style={{ marginBottom: "14px" }}>
              <button
                type="button"
                onClick={handleGoogleAuth}
                title="Continue with Google"
              >
                <i className="fab fa-google" />
              </button>
              <button type="button" disabled>
                <i className="fab fa-facebook" />
              </button>
              <button type="button" disabled>
                <i className="fab fa-apple" />
              </button>
            </div>

            <div className="auth-divider">or</div>

            <form className="auth-split-form" onSubmit={handleSubmit}>
              {errorMessage && <p className="auth-error">{errorMessage}</p>}
              {successMessage && (
                <p className="auth-success">{successMessage}</p>
              )}

              <label>Full Name</label>
              <input
                type="text"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <label>Email Address</label>
              <input
                type="email"
                placeholder="youremail@mail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <label>Password</label>
              <input
                type="password"
                placeholder="***************"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="***************"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />

              <div className="auth-meta-row">
                <label>
                  <input type="checkbox" required /> I accept terms
                </label>
                <span />
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Creating..." : "Create Account"}
              </button>
            </form>

            <p className="auth-bottom-note">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </div>

        <div className="auth-split-right">
          <img src="/images/promo/home/02.jpg" alt="Catholic store visual" />
        </div>
      </div>
    </section>
  );
}
