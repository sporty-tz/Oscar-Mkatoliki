import { Link } from "react-router-dom";
import { useShop } from "../../context/useShop";
import { useAppSettings } from "../../context/useAppSettings";

interface ProductCardProps {
  id: number | string;
  name: string;
  image: string;
  price: number;
  oldPrice?: number;
  unit?: string;
  rating: number;
  reviewCount: number;
  labels?: string[];
  labelText?: string;
}

export default function ProductCard({
  id,
  name,
  image,
  price,
  oldPrice,
  unit = "piece",
  rating,
  reviewCount,
  labels = [],
  labelText,
}: ProductCardProps) {
  const {
    addToCart,
    setCartQuantity,
    toggleWishlist,
    toggleCompare,
    isInWishlist,
    isInCompare,
    getCartQty,
  } = useShop();
  const { formatMoney } = useAppSettings();

  const product = { id, name, image, price, oldPrice, unit };
  const wished = isInWishlist(id);
  const compared = isInCompare(id);
  const qty = getCartQty(id);

  return (
    <div className="product-card">
      <div className="product-media">
        <div className="product-label">
          {labels.map((l) => (
            <label className={`label-text ${l}`} key={l}>
              {labelText || l}
            </label>
          ))}
        </div>
        <button
          className={`product-wish wish${wished ? " active" : ""}`}
          onClick={() => toggleWishlist(product)}
        >
          <i className="fas fa-heart"></i>
        </button>
        <Link className="product-image" to={`/product/${id}`}>
          <img src={image} alt={name} />
        </Link>
        <div className="product-widget">
          <a
            className="fas fa-random"
            href="#"
            title="Product Compare"
            onClick={(e) => {
              e.preventDefault();
              toggleCompare(product);
            }}
            style={{ color: compared ? "var(--primary)" : undefined }}
          />
          <a title="Product View" href="#" className="fas fa-eye" />
        </div>
      </div>
      <div className="product-content">
        <div className="product-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <i
              key={i}
              className={`icofont-star${i < rating ? " active" : ""}`}
            ></i>
          ))}
          <Link to={`/product/${id}`}>({reviewCount})</Link>
        </div>
        <h6 className="product-name">
          <Link to={`/product/${id}`}>{name}</Link>
        </h6>
        <h6 className="product-price">
          {oldPrice && <del>{formatMoney(oldPrice, "usd")}</del>}
          <span>
            {formatMoney(price, "usd")}
            <small>/{unit}</small>
          </span>
        </h6>
        {qty <= 0 ? (
          <button
            className="product-add"
            title="Add to Cart"
            onClick={() => addToCart(product, 1)}
          >
            <i className="fas fa-shopping-basket"></i>
            <span>add</span>
          </button>
        ) : (
          <div className="product-action" style={{ display: "flex" }}>
            <button
              className="action-minus"
              title="Quantity Minus"
              onClick={() => setCartQuantity(id, qty - 1)}
              disabled={qty <= 1}
            >
              <i className="icofont-minus"></i>
            </button>
            <input
              className="action-input"
              title="Quantity Number"
              type="text"
              readOnly
              value={qty}
            />
            <button
              className="action-plus"
              title="Quantity Plus"
              onClick={() => setCartQuantity(id, qty + 1)}
            >
              <i className="icofont-plus"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
