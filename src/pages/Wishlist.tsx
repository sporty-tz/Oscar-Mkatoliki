import { Link } from "react-router-dom";
import { useShop } from "../context/useShop";
import "@/styles/wishlist.css";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, addToCart } = useShop();

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
          <h2>my wishlist</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              wishlist
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section wishlist-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              {wishlistItems.length === 0 ? (
                <div className="alert-info">
                  <p>
                    No products in wishlist yet.{" "}
                    <Link to="/shop">Browse products</Link>
                  </p>
                </div>
              ) : (
                <div className="table-scroll">
                  <table className="table-list">
                    <thead>
                      <tr>
                        <th>Serial</th>
                        <th>Product</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlistItems.map((item, index) => (
                        <tr key={item.id}>
                          <td className="table-serial">
                            <h6>{String(index + 1).padStart(2, "0")}</h6>
                          </td>
                          <td className="table-image">
                            <img src={item.image} alt="product" />
                          </td>
                          <td className="table-name">
                            <h6>{item.name}</h6>
                          </td>
                          <td className="table-price">
                            <h6>${item.price}</h6>
                          </td>
                          <td className="table-status">
                            <h6 className="stock-in">in stock</h6>
                          </td>
                          <td className="table-action">
                            <Link to={`/product/${item.id}`} className="view">
                              <i className="fas fa-eye"></i>
                            </Link>
                            <button
                              className="cart"
                              onClick={() => addToCart(item, 1)}
                              title="Add to Cart"
                            >
                              <i className="fas fa-shopping-basket"></i>
                            </button>
                            <button
                              className="trash"
                              onClick={() => removeFromWishlist(item.id)}
                            >
                              <i className="icofont-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
