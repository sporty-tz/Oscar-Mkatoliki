import { Link } from "react-router-dom";
import { useShop } from "../../context/useShop";

interface MobileMenuProps {
  onCateClick: () => void;
  onCartClick: () => void;
}

export default function MobileMenu({
  onCateClick,
  onCartClick,
}: MobileMenuProps) {
  const { cartCount, compareCount, wishlistCount } = useShop();

  return (
    <div className="mobile-menu">
      <Link to="/" title="Home Page">
        <i className="fas fa-home"></i>
        <span>Home</span>
      </Link>
      <button className="cate-btn" title="Category List" onClick={onCateClick}>
        <i className="fas fa-list"></i>
        <span>category</span>
      </button>
      <button className="cart-btn" title="Cartlist" onClick={onCartClick}>
        <i className="fas fa-shopping-basket"></i>
        <span>cartlist</span>
        <sup>{cartCount}</sup>
      </button>
      <Link to="/wishlist" title="Wishlist">
        <i className="fas fa-heart"></i>
        <span>wishlist</span>
        <sup>{wishlistCount}</sup>
      </Link>
      <Link to="/compare" title="Compare List">
        <i className="fas fa-random"></i>
        <span>compare</span>
        <sup>{compareCount}</sup>
      </Link>
    </div>
  );
}
