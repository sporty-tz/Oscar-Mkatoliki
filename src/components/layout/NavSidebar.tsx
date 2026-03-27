import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

interface NavSidebarProps {
  open: boolean;
  onClose: () => void;
}

const navItems = [
  {
    icon: "icofont-home",
    label: "Home",
    children: [
      { label: "homepage", to: "/" },
      { label: "all categories", to: "/categories" },
      { label: "featured brands", to: "/brands" },
    ],
  },
  {
    icon: "icofont-food-cart",
    label: "Shop",
    children: [
      { label: "all products", to: "/shop" },
      { label: "latest offers", to: "/offer" },
      { label: "checkout", to: "/checkout" },
    ],
  },
  {
    icon: "icofont-page",
    label: "Collections",
    children: [
      { label: "bibles & books", to: "/shop" },
      { label: "devotionals", to: "/shop" },
      { label: "church essentials", to: "/shop" },
      { label: "wishlist", to: "/wishlist" },
      { label: "compare", to: "/compare" },
    ],
  },
  {
    icon: "icofont-bag-alt",
    label: "Company",
    children: [
      { label: "about us", to: "/about" },
      { label: "contact us", to: "/contact" },
      { label: "need help", to: "/faq" },
      { label: "privacy policy", to: "/privacy" },
    ],
  },
  {
    icon: "icofont-lock",
    label: "Account",
    children: [
      { label: "login", to: "/login" },
      { label: "create account", to: "/register" },
      { label: "my profile", to: "/profile" },
      { label: "reset password", to: "/reset-password" },
      { label: "change password", to: "/change-password" },
    ],
  },
  {
    icon: "icofont-book-alt",
    label: "Blog",
    children: [
      { label: "blog grid", to: "/blog" },
      { label: "editorial feed", to: "/blog/standard" },
      { label: "featured story", to: "/blog/details-1" },
      { label: "author spotlight", to: "/blog/author/1" },
    ],
  },
];

const singleLinks = [
  { icon: "icofont-sale-discount", label: "latest offers", to: "/offer" },
  { icon: "icofont-info-circle", label: "about us", to: "/about" },
  { icon: "icofont-support-faq", label: "help center", to: "/faq" },
  { icon: "icofont-contacts", label: "contact us", to: "/contact" },
  { icon: "icofont-warning", label: "privacy policy", to: "/privacy" },
  { icon: "icofont-options", label: "coming soon", to: "/coming-soon" },
];

export default function NavSidebar({ open, onClose }: NavSidebarProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    setOpenIndex(null);
    onClose();
  };

  useEffect(() => {
    if (!open) {
      return;
    }

    contentRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [open]);

  return (
    <aside className={`nav-sidebar${open ? " active" : ""}`}>
      <div className="nav-header">
        <a href="#">
          <img src="/images/Logo-3.png" alt="Oscalius logo" />
        </a>
        <button className="nav-close" onClick={handleClose}>
          <i className="icofont-close"></i>
        </button>
      </div>
      <div className="nav-content" ref={contentRef}>
        <div className="nav-btn">
          <Link className="btn btn-inline" to="/login" onClick={handleClose}>
            <i className="fa fa-unlock-alt"></i>
            <span>join here</span>
          </Link>
        </div>
        <div className="nav-select-group">
          <div className="nav-select">
            <i className="icofont-world"></i>
            <select className="select" defaultValue="english">
              <option value="english">English</option>
              <option value="swahili">Swahili</option>
            </select>
          </div>
          <div className="nav-select">
            <i className="icofont-money"></i>
            <select className="select" defaultValue="tsh">
              <option value="tsh">TSH</option>
              <option value="usd">USD</option>
            </select>
          </div>
        </div>
        <ul className="nav-list">
          {navItems.map((item, i) => (
            <li key={item.label}>
              <a
                className={`nav-link dropdown-link${openIndex === i ? " active" : ""}`}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenIndex(openIndex === i ? null : i);
                }}
              >
                <i className={item.icon}></i>
                {item.label}
              </a>
              <ul
                className="dropdown-list"
                style={{ display: openIndex === i ? "block" : "none" }}
              >
                {item.children.map((child) => (
                  <li key={child.to}>
                    <Link to={child.to} onClick={handleClose}>
                      {child.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
          {singleLinks.map((link) => (
            <li key={link.to}>
              <Link className="nav-link" to={link.to} onClick={handleClose}>
                <i className={link.icon}></i>
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link className="nav-link" to="/login" onClick={handleClose}>
              <i className="icofont-logout"></i>logout
            </Link>
          </li>
        </ul>
        <div className="nav-info-group">
          <div className="nav-info">
            <i className="icofont-ui-touch-phone"></i>
            <p>
              <small>call us</small>
              <span>(+255) 615 228 292</span>
            </p>
          </div>
          <div className="nav-info">
            <i className="icofont-ui-email"></i>
            <p>
              <small>email us</small>
              <span>support@oscalius.com</span>
            </p>
          </div>
        </div>
        <div className="nav-footer">
          <p>
            All Rights Reserved by <a href="#">Oscar Mkatoliki</a>
          </p>
        </div>
      </div>
    </aside>
  );
}
