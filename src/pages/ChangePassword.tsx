import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import "@/styles/user-auth.css";

export default function ChangePassword() {
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [repeatPass, setRepeatPass] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (newPass !== repeatPass) {
      alert("New passwords do not match!");
      return;
    }
    // TODO: Supabase password update
    console.log("Change password");
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
                <h2>any issue?</h2>
                <p>Make sure your current password is strong</p>
              </div>
              <div className="user-form-group">
                <form className="user-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Old password"
                      required
                      value={oldPass}
                      onChange={(e) => setOldPass(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="New password"
                      required
                      value={newPass}
                      onChange={(e) => setNewPass(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Repeat new password"
                      required
                      value={repeatPass}
                      onChange={(e) => setRepeatPass(e.target.value)}
                    />
                  </div>
                  <div className="form-button">
                    <button type="submit">change password</button>
                  </div>
                </form>
              </div>
            </div>
            <div className="user-form-remind">
              <p>
                Go back to <Link to="/login">login</Link>
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
