import { useState, useEffect } from "react";
import "@/styles/coming-soon.css";

export default function ComingSoon() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const target = new Date();
    target.setMonth(target.getMonth() + 3); // 3 months from now

    const tick = () => {
      const now = new Date().getTime();
      const diff = target.getTime() - now;
      if (diff <= 0) return;
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="coming-part"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "var(--chalk)",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-7">
            <div className="coming-content">
              <h1
                className="coming-title"
                style={{
                  fontSize: "48px",
                  fontWeight: 700,
                  marginBottom: "30px",
                  color: "var(--heading)",
                }}
              >
                coming soon...
              </h1>
              <div
                className="coming-clock"
                style={{ display: "flex", gap: "20px", marginBottom: "30px" }}
              >
                {[
                  { val: timeLeft.days, label: "days" },
                  { val: timeLeft.hours, label: "hours" },
                  { val: timeLeft.minutes, label: "minutes" },
                  { val: timeLeft.seconds, label: "seconds" },
                ].map((t) => (
                  <div
                    key={t.label}
                    style={{
                      textAlign: "center",
                      background: "var(--white)",
                      padding: "15px 20px",
                      borderRadius: "8px",
                      minWidth: "80px",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "32px",
                        fontWeight: 700,
                        display: "block",
                        color: "var(--primary)",
                      }}
                    >
                      {t.val}
                    </span>
                    <span
                      style={{
                        fontSize: "14px",
                        textTransform: "uppercase",
                        color: "var(--text)",
                      }}
                    >
                      {t.label}
                    </span>
                  </div>
                ))}
              </div>
              <h3 style={{ marginBottom: "15px" }}>
                Subscribe to get notified!
              </h3>
              <form
                className="coming-form"
                style={{
                  display: "flex",
                  gap: "10px",
                  maxWidth: "400px",
                  marginBottom: "20px",
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    flex: 1,
                    padding: "10px 15px",
                    border: "1px solid var(--border)",
                    borderRadius: "6px",
                  }}
                />
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    background: "var(--primary)",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  <i className="fas fa-paper-plane" />
                </button>
              </form>
              <ul
                className="coming-social"
                style={{
                  listStyle: "none",
                  padding: 0,
                  display: "flex",
                  gap: "10px",
                }}
              >
                {[
                  "facebook-f",
                  "twitter",
                  "linkedin-in",
                  "instagram",
                  "pinterest-p",
                ].map((icon) => (
                  <li key={icon}>
                    <a
                      href="#"
                      style={{
                        width: "40px",
                        height: "40px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: "50%",
                        border: "1px solid var(--border)",
                        color: "var(--text)",
                      }}
                    >
                      <i className={`fab fa-${icon}`} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-lg-5">
            <img
              src="/images/coming-soon.png"
              alt="coming soon"
              style={{ width: "100%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
