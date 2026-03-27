import { Link } from "react-router-dom";
import "@/styles/brand-list.css";

export default function BrandList() {
  return (
    <>
      <section
        className="inner-section single-banner"
        style={{
          background: "url(/images/single-banner.jpg) no-repeat center",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <h2>brand list</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              brands
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section brand-part">
        <div className="container">
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 row-cols-xl-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div className="col" key={i}>
                <div
                  className="brand-card"
                  style={{
                    padding: "20px",
                    textAlign: "center",
                    background: "var(--white)",
                    borderRadius: "8px",
                    marginBottom: "20px",
                  }}
                >
                  <Link to={`/brand/${i + 1}`}>
                    <img
                      src={`/images/brand/${String(i + 1).padStart(2, "0")}.jpg`}
                      alt="brand"
                      style={{ maxWidth: "100%" }}
                    />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
