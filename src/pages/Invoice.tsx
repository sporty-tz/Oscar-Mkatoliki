import { Link } from "react-router-dom";
import "@/styles/invoice.css";

export default function Invoice() {
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
          <h2>order invoice</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              invoice
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section invoice-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 mx-auto">
              <div
                className="invoice-content"
                style={{
                  background: "var(--white)",
                  padding: "30px",
                  borderRadius: "8px",
                }}
              >
                <div
                  className="invoice-header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "30px",
                  }}
                >
                  <div>
                    <img
                      src="/images/Logo-3.png"
                      alt="Oscalius logo"
                      style={{ maxWidth: "150px" }}
                    />
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <h4>Invoice #0001</h4>
                    <p>Date: {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr style={{ borderBottom: "2px solid var(--border)" }}>
                      <th style={{ padding: "10px", textAlign: "left" }}>
                        Product
                      </th>
                      <th style={{ padding: "10px", textAlign: "center" }}>
                        Qty
                      </th>
                      <th style={{ padding: "10px", textAlign: "right" }}>
                        Price
                      </th>
                      <th style={{ padding: "10px", textAlign: "right" }}>
                        Total
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td
                        colSpan={4}
                        style={{ textAlign: "center", padding: "30px" }}
                      >
                        No invoice data available
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
