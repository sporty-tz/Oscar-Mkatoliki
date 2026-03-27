import { Link } from "react-router-dom";

const collectionGroups = [
  {
    title: "Books",
    items: [
      "Bibles",
      "Prayer Books",
      "Saint Biographies",
      "Children's Books",
      "Study Guides",
    ],
  },
  {
    title: "Devotionals",
    items: [
      "Rosaries",
      "Novena Guides",
      "Prayer Cards",
      "Chaplets",
      "Meditation Sets",
    ],
  },
  {
    title: "Sacraments",
    items: [
      "Baptism Gifts",
      "First Communion",
      "Confirmation",
      "Marriage",
      "Ordination",
    ],
  },
  {
    title: "Home & Gifts",
    items: ["Wall Crosses", "Home Altars", "Gift Boxes", "Candles", "Frames"],
  },
  {
    title: "Church Essentials",
    items: [
      "Vestments",
      "Liturgical Items",
      "Incense",
      "Missals",
      "Choir Accessories",
    ],
  },
];

export default function Navbar() {
  return (
    <nav className="navbar-part">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="navbar-content">
              <ul className="navbar-list">
                <li className="navbar-item dropdown">
                  <Link className="navbar-link dropdown-arrow" to="/">
                    Home
                  </Link>
                </li>

                <li className="navbar-item dropdown-megamenu">
                  <a className="navbar-link dropdown-arrow" href="#">
                    Shop
                  </a>
                  <div className="megamenu">
                    <div className="container">
                      <div className="row">
                        <div className="col-lg-3">
                          <div className="megamenu-wrap">
                            <h5 className="megamenu-title">Shop</h5>
                            <ul className="megamenu-list">
                              <li>
                                <Link to="/shop">All Products</Link>
                              </li>
                              <li>
                                <Link to="/offer">Latest Offers</Link>
                              </li>
                              <li>
                                <Link to="/brands">Featured Brands</Link>
                              </li>
                              <li>
                                <Link to="/categories">Browse Categories</Link>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <div className="megamenu-wrap">
                            <h5 className="megamenu-title">Products</h5>
                            <ul className="megamenu-list">
                              <li>
                                <Link to="/product/tab/1">
                                  Product Overview
                                </Link>
                              </li>
                              <li>
                                <Link to="/product/grid/1">Gallery View</Link>
                              </li>
                              <li>
                                <Link to="/product/video/1">Video Detail</Link>
                              </li>
                              <li>
                                <Link to="/product/1">Quick Detail</Link>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <div className="megamenu-wrap">
                            <h5 className="megamenu-title">Your Orders</h5>
                            <ul className="megamenu-list">
                              <li>
                                <Link to="/wishlist">Wishlist</Link>
                              </li>
                              <li>
                                <Link to="/compare">Compare</Link>
                              </li>
                              <li>
                                <Link to="/checkout">Checkout</Link>
                              </li>
                              <li>
                                <Link to="/orders">Order History</Link>
                              </li>
                            </ul>
                          </div>
                        </div>

                        <div className="col-lg-3">
                          <div className="megamenu-wrap">
                            <h5 className="megamenu-title">Explore</h5>
                            <ul className="megamenu-list">
                              <li>
                                <Link to="/about">About Us</Link>
                              </li>
                              <li>
                                <Link to="/contact">Contact</Link>
                              </li>
                              <li>
                                <Link to="/faq">Help Center</Link>
                              </li>
                              <li>
                                <Link to="/blog">Latest Articles</Link>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li className="navbar-item dropdown-megamenu">
                  <a className="navbar-link dropdown-arrow" href="#">
                    Collections
                  </a>
                  <div className="megamenu">
                    <div className="container megamenu-scroll">
                      <div className="row row-cols-5">
                        {collectionGroups.map((group) => (
                          <div className="col" key={group.title}>
                            <div className="megamenu-wrap">
                              <h5 className="megamenu-title">{group.title}</h5>
                              <ul className="megamenu-list">
                                {group.items.map((item) => (
                                  <li key={item}>
                                    <Link to="/shop">{item}</Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>

                <li className="navbar-item dropdown">
                  <a className="navbar-link dropdown-arrow" href="#">
                    Company
                  </a>
                  <ul className="dropdown-position-list">
                    <li>
                      <Link to="/about">About Us</Link>
                    </li>
                    <li>
                      <Link to="/contact">Contact Us</Link>
                    </li>
                    <li>
                      <Link to="/faq">Need Help</Link>
                    </li>
                    <li>
                      <Link to="/offer">Latest Offers</Link>
                    </li>
                    <li>
                      <Link to="/privacy">Privacy Policy</Link>
                    </li>
                  </ul>
                </li>

                <li className="navbar-item dropdown">
                  <a className="navbar-link dropdown-arrow" href="#">
                    Account
                  </a>
                  <ul className="dropdown-position-list">
                    <li>
                      <Link to="/login">Login</Link>
                    </li>
                    <li>
                      <Link to="/register">Create Account</Link>
                    </li>
                    <li>
                      <Link to="/profile">My Profile</Link>
                    </li>
                    <li>
                      <Link to="/reset-password">Reset Password</Link>
                    </li>
                    <li>
                      <Link to="/change-password">Change Password</Link>
                    </li>
                  </ul>
                </li>

                <li className="navbar-item dropdown">
                  <a className="navbar-link dropdown-arrow" href="#">
                    Blog
                  </a>
                  <ul className="dropdown-position-list">
                    <li>
                      <Link to="/blog">Blog Grid</Link>
                    </li>
                    <li>
                      <Link to="/blog/standard">Editorial Feed</Link>
                    </li>
                    <li>
                      <Link to="/blog/details-1">Featured Story</Link>
                    </li>
                    <li>
                      <Link to="/blog/author/1">Author Spotlight</Link>
                    </li>
                  </ul>
                </li>
              </ul>

              <div className="navbar-info-group">
                <div className="navbar-info">
                  <i className="icofont-ui-touch-phone"></i>
                  <p>
                    <small>call us</small>
                    <span>(+255) 615 228 292</span>
                  </p>
                </div>
                <div className="navbar-info">
                  <i className="icofont-ui-email"></i>
                  <p>
                    <small>email us</small>
                    <span>support@oscalius.com</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
