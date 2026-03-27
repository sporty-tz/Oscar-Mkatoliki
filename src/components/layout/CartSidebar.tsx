import { useState } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/useShop";
import { useAppSettings } from "../../context/useAppSettings";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function CartSidebar({ open, onClose }: CartSidebarProps) {
  const [showCoupon, setShowCoupon] = useState(false);
  const { cartItems, setCartQuantity, removeFromCart, cartTotal, cartCount } =
    useShop();
  const { formatMoney } = useAppSettings();

  return (
    <aside className={`cart-sidebar${open ? " active" : ""}`}>
      <div className="cart-header">
        <div className="cart-total">
          <i className="fas fa-shopping-basket"></i>
          <span>total item ({cartCount})</span>
        </div>
        <button className="cart-close" onClick={onClose}>
          <i className="icofont-close"></i>
        </button>
      </div>
      <ul className="cart-list">
        {cartItems.length === 0 && (
          <li className="cart-item">
            <div className="cart-info-group">
              <div className="cart-info">
                <h6>Your cart is empty.</h6>
                <p>Add products to see them here.</p>
              </div>
            </div>
          </li>
        )}
        {cartItems.map((item) => (
          <li className="cart-item" key={item.id}>
            <div className="cart-media">
              <a href="#">
                <img src={item.image} alt="product" />
              </a>
              <button
                className="cart-delete"
                onClick={() => removeFromCart(item.id)}
              >
                <i className="far fa-trash-alt"></i>
              </button>
            </div>
            <div className="cart-info-group">
              <div className="cart-info">
                <h6>
                  <Link to={`/product/${item.id}`}>{item.name}</Link>
                </h6>
                <p>Unit Price - {formatMoney(item.price, "usd")}</p>
              </div>
              <div className="cart-action-group">
                <div className="product-action" style={{ display: "flex" }}>
                  <button
                    className="action-minus"
                    title="Quantity Minus"
                    onClick={() => setCartQuantity(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                  >
                    <i className="icofont-minus"></i>
                  </button>
                  <input
                    className="action-input"
                    title="Quantity Number"
                    type="text"
                    readOnly
                    value={item.qty}
                  />
                  <button
                    className="action-plus"
                    title="Quantity Plus"
                    onClick={() => setCartQuantity(item.id, item.qty + 1)}
                  >
                    <i className="icofont-plus"></i>
                  </button>
                </div>
                <h6>{formatMoney(item.price * item.qty, "usd")}</h6>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-footer">
        {!showCoupon && (
          <button className="coupon-btn" onClick={() => setShowCoupon(true)}>
            Do you have a coupon code?
          </button>
        )}
        {showCoupon && (
          <form
            className="coupon-form"
            style={{ display: "flex" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="text" placeholder="Enter your coupon code" />
            <button type="submit">
              <span>apply</span>
            </button>
          </form>
        )}
        <Link className="cart-checkout-btn" to="/checkout" onClick={onClose}>
          <span className="checkout-label">Proceed to Checkout</span>
          <span className="checkout-price">
            {formatMoney(cartTotal, "usd")}
          </span>
        </Link>
      </div>
    </aside>
  );
}
