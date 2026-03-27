import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import "@/styles/user-auth.css";

export default function ResetPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: Supabase password reset
    console.log("Reset password for:", email);
  };

  return (
    <section className="user-form-part">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5">
            <div className="user-form-logo">
              <Link to="/">
                <img src="/images/Logo-3.png" alt="Oscalius logo" />
              </Link>
            </div>
            <div className="user-form-card">
              <div className="user-form-title">
                <h2>worried?</h2>
                <p>No Problem! Just Follow The Simple Way</p>
              </div>
              <div className="user-form-group">
                <form className="user-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="form-button">
                    <button type="submit">get reset link</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="user-form-remind">
              <p>
                Remember your password? <Link to="/login">login here</Link>
              </p>
            </div>
            <div className="user-form-footer">
              <p>&copy; Oscar Mkatoliki - All Rights Reserved</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
