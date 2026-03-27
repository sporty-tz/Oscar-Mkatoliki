import { Link } from "react-router-dom";

export default function Offer() {
  const offerItems = Array.from({ length: 12 }).map((_, index) => ({
    id: index + 1,
    image: `/images/offer/${String(index + 1).padStart(2, "0")}.jpg`,
    code: "RAMADAN20",
  }));

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
          <h2>latest offers</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              offers
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section offer-part">
        <div className="container">
          <div className="row justify-content-center">
            {offerItems.map((item) => (
              <div className="col-sm-6 col-md-4 col-lg-3" key={item.id}>
                <div className="offer-card">
                  <a href="#">
                    <img src={item.image} alt="offer" />
                  </a>
                  <div className="offer-div">
                    <h5 className="offer-code">{item.code}</h5>
                    <button className="offer-select" type="button">
                      copy
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
