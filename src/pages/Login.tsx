import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  requiresProfileCompletion,
  signInWithGoogle,
  signin,
} from "../lib/supabase";
import "@/styles/user-auth.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);
    try {
      await signin(email, password);
      const profileIsIncomplete = await requiresProfileCompletion();
      navigate(profileIsIncomplete ? "/profile?complete=1" : "/");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to sign in";
      setErrorMessage(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMessage("");
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
      <div className="auth-split-shell">
        <div className="auth-split-left">
          <div className="auth-split-content">
            <div className="auth-brand-row">
              <Link to="/">
                <img src="/images/Logo-3.png" alt="Oscalius logo" />
              </Link>
            </div>

            <div className="auth-split-title">
              <h2>Welcome Back!</h2>
              <p>Please enter your details</p>
            </div>

            <div className="auth-social-row">
              <button
                type="button"
                onClick={handleGoogleAuth}
                title="Continue with Google"
              >
                <i className="fab fa-google" />
              </button>
              <button type="button">
                <i className="fab fa-facebook" />
              </button>
              <button type="button">
                <i className="fab fa-apple" />
              </button>
            </div>

            <div className="auth-divider">or</div>

            <form className="auth-split-form" onSubmit={handleSubmit}>
              {errorMessage && <p className="auth-error">{errorMessage}</p>}

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

              <div className="auth-meta-row">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <Link to="/reset-password">Forgot Password?</Link>
              </div>

              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>

            <p className="auth-bottom-note">
              Don&apos;t have an account?{" "}
              <Link to="/register">Create account</Link>
            </p>
          </div>
        </div>

        <div className="auth-split-right">
          <img src="/images/promo/home/01.jpg" alt="Catholic store visual" />
        </div>
      </div>
    </section>
  );
}
