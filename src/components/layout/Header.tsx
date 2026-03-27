import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useShop } from "../../context/useShop";
import { useAppSettings } from "../../context/useAppSettings";
import {
  assetPath,
  getAssetPublicUrl,
  getCurrentUser,
  getMyProfile,
  supabase,
} from "../../lib/supabase";

interface HeaderProps {
  onCartClick: () => void;
}

export default function Header({ onCartClick }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accountName, setAccountName] = useState("join");
  const [avatarUrl, setAvatarUrl] = useState("");
  const { cartCount, compareCount, wishlistCount, cartTotal } = useShop();
  const { formatMoney } = useAppSettings();

  const defaultUserIcon = getAssetPublicUrl(assetPath("user.png"));
  const logoImage = getAssetPublicUrl(assetPath("Logo-3.png"));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 130);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    let mounted = true;

    const syncAuthUi = async () => {
      const user = await getCurrentUser();
      if (!mounted) return;

      if (!user) {
        setIsLoggedIn(false);
        setAccountName("join");
        setAvatarUrl("");
        return;
      }

      const profile = await getMyProfile();
      if (!mounted) return;

      setIsLoggedIn(true);
      setAccountName(
        profile?.full_name || user.user_metadata?.full_name || "Account",
      );
      setAvatarUrl(profile?.avatar_url || "");
    };

    void syncAuthUi();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void syncAuthUi();
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const accountPath = isLoggedIn ? "/profile" : "/login";

  return (
    <header className={`header-part${scrolled ? " active" : ""}`}>
      <div className="container">
        <div className="header-content">
          <div className="header-media-group">
            <Link className="header-user" to={accountPath} title="My Account">
              <img src={avatarUrl || defaultUserIcon} alt="user" />
            </Link>
            <Link to="/">
              <img src={logoImage} alt="logo" />
            </Link>
            <button
              className="header-src"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <i className={`fas ${searchOpen ? "fa-times" : "fa-search"}`}></i>
            </button>
          </div>

          <Link className="header-logo" to="/">
            <img src={logoImage} alt="logo" />
          </Link>
          <Link className="header-widget" to={accountPath} title="My Account">
            <img src={avatarUrl || defaultUserIcon} alt="user" />
            <span>{isLoggedIn ? accountName : "join"}</span>
          </Link>

          <form
            className={`header-form${searchOpen ? " active" : ""}`}
            onSubmit={(e) => e.preventDefault()}
          >
            <input type="text" placeholder="Search anything..." />
            <button type="submit">
              <i className="fas fa-search"></i>
            </button>
          </form>

          <div className="header-widget-group">
            <Link className="header-widget" to="/compare" title="Compare List">
              <i className="fas fa-random"></i>
              <sup>{compareCount}</sup>
            </Link>
            <Link className="header-widget" to="/wishlist" title="Wishlist">
              <i className="fas fa-heart"></i>
              <sup>{wishlistCount}</sup>
            </Link>
            <button
              className="header-widget header-cart"
              title="Cartlist"
              onClick={onCartClick}
            >
              <i className="fas fa-shopping-basket"></i>
              <sup>{cartCount}</sup>
              <span>
                total price<small>{formatMoney(cartTotal, "usd")}</small>
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
