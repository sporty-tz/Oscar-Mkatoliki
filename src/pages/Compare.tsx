import { Link } from "react-router-dom";
import { useShop } from "../context/useShop";
import "@/styles/compare.css";

export default function Compare() {
  const { compareItems, removeFromCompare, addToCart } = useShop();

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
          <h2>compare products</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              compare
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section compare-part">
        <div className="container">
          {compareItems.length === 0 ? (
            <div className="row">
              <div className="col-lg-12">
                <div className="alert-info">
                  <p>
                    No products added to compare yet.{" "}
                    <Link to="/shop">Browse products</Link>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
              {compareItems.map((item) => (
                <div className="col mb-4" key={item.id}>
                  <div className="product-card">
                    <div className="product-media">
                      <Link
                        className="product-image"
                        to={`/product/${item.id}`}
                      >
                        <img src={item.image} alt={item.name} />
                      </Link>
                    </div>
                    <div className="product-content">
                      <h6 className="product-name">
                        <Link to={`/product/${item.id}`}>{item.name}</Link>
                      </h6>
                      <h6 className="product-price">
                        {item.oldPrice && <del>${item.oldPrice}</del>}
                        <span>
                          ${item.price}
                          <small>/{item.unit ?? "piece"}</small>
                        </span>
                      </h6>
                      <div
                        className="details-action-group"
                        style={{ marginTop: "15px" }}
                      >
                        <button
                          className="btn btn-inline"
                          onClick={() => addToCart(item, 1)}
                        >
                          <i className="fas fa-shopping-basket"></i>
                          <span>add to cart</span>
                        </button>
                        <button
                          className="btn btn-outline"
                          onClick={() => removeFromCompare(item.id)}
                        >
                          <i className="icofont-trash"></i>
                          <span>remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
