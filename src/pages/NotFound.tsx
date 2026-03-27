import { Link } from "react-router-dom";
import "@/styles/error.css";

export default function NotFound() {
  return (
    <section
      className="error-part"
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div className="container">
        <h1
          style={{
            fontSize: "72px",
            fontWeight: 700,
            color: "var(--primary)",
            marginBottom: "20px",
          }}
        >
          404
        </h1>
        <img
          src="/images/error.png"
          alt="error"
          className="img-fluid"
          style={{ maxWidth: "400px", marginBottom: "30px" }}
        />
        <h3 style={{ marginBottom: "10px" }}>
          Ooopps! This page can't be found.
        </h3>
        <p style={{ marginBottom: "25px", color: "var(--text)" }}>
          It looks like nothing was found at this location.
        </p>
        <Link
          to="/"
          style={{
            display: "inline-block",
            padding: "12px 30px",
            background: "var(--primary)",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
          }}
        >
          go to home
        </Link>
      </div>
    </section>
  );
}
