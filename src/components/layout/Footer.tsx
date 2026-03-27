import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="footer-part">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-xl-3">
            <div className="footer-widget">
              <Link className="footer-logo" to="/">
                <img src="/images/Logo-3.png" alt="Oscalius logo" />
              </Link>
              <p className="footer-desc">
                Your trusted Catholic online store for books, gifts,
                sacramentals and more. Serving the faithful with devotion.
              </p>
              <ul className="footer-social">
                <li>
                  <a className="icofont-facebook" href="#"></a>
                </li>
                <li>
                  <a className="icofont-twitter" href="#"></a>
                </li>
                <li>
                  <a className="icofont-linkedin" href="#"></a>
                </li>
                <li>
                  <a className="icofont-instagram" href="#"></a>
                </li>
                <li>
                  <a className="icofont-pinterest" href="#"></a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="footer-widget contact">
              <h3 className="footer-title">contact us</h3>
              <ul className="footer-contact">
                <li>
                  <i className="icofont-ui-email"></i>
                  <p>
                    <span>support@oscalius.com</span>
                    <span>info@oscalius.com</span>
                  </p>
                </li>
                <li>
                  <i className="icofont-ui-touch-phone"></i>
                  <p>
                    <span>+255 615 228 292</span>
                    <span>+255 615 228 293</span>
                  </p>
                </li>
                <li>
                  <i className="icofont-location-pin"></i>
                  <p>Dar es Salaam, Tanzania</p>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="footer-widget">
              <h3 className="footer-title">quick Links</h3>
              <div className="footer-links">
                <ul>
                  <li>
                    <Link to="/profile">My Account</Link>
                  </li>
                  <li>
                    <Link to="/orders">Order History</Link>
                  </li>
                  <li>
                    <Link to="/shop">Best Seller</Link>
                  </li>
                  <li>
                    <Link to="/shop">New Arrivals</Link>
                  </li>
                </ul>
                <ul>
                  <li>
                    <Link to="/contact">Contact</Link>
                  </li>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/faq">Faq</Link>
                  </li>
                  <li>
                    <Link to="/privacy">Privacy</Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-sm-6 col-xl-3">
            <div className="footer-widget">
              <h3 className="footer-title">Download App</h3>
              <p className="footer-desc">
                Get our mobile app for a seamless shopping experience. Available
                on Google Play and App Store.
              </p>
              <div className="footer-app">
                <a href="#">
                  <img src="/images/google-store.png" alt="google" />
                </a>
                <a href="#">
                  <img src="/images/app-store.png" alt="app" />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="footer-bottom">
              <p className="footer-copytext">
                &copy; {new Date().getFullYear()} All Rights Reserved by Oscar
                Mkatoliki
              </p>
              <div className="footer-card">
                <a href="#">
                  <img src="/images/payment/jpg/01.jpg" alt="payment" />
                </a>
                <a href="#">
                  <img src="/images/payment/jpg/02.jpg" alt="payment" />
                </a>
                <a href="#">
                  <img src="/images/payment/jpg/03.jpg" alt="payment" />
                </a>
                <a href="#">
                  <img src="/images/payment/jpg/04.jpg" alt="payment" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
