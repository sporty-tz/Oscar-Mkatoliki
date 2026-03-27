import { useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import HeaderTop from "./HeaderTop";
import Header from "./Header";
import Navbar from "./Navbar";
import CategorySidebar from "./CategorySidebar";
import CartSidebar from "./CartSidebar";
import NavSidebar from "./NavSidebar";
import MobileMenu from "./MobileMenu";
import Newsletter from "./Newsletter";
import Intro from "./Intro";
import Footer from "./Footer";
import BackToTop from "../ui/BackToTop";

export default function MainLayout() {
  const [catOpen, setCatOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  const closeAll = useCallback(() => {
    setCatOpen(false);
    setCartOpen(false);
    setNavOpen(false);
    document.body.style.overflow = "inherit";
  }, []);

  const openSidebar = useCallback(
    (setter: React.Dispatch<React.SetStateAction<boolean>>) => {
      closeAll();
      setter(true);
      document.body.style.overflow = "hidden";
    },
    [closeAll],
  );

  const backdropVisible = catOpen || cartOpen || navOpen;

  return (
    <>
      {/* Backdrop */}
      {backdropVisible && (
        <div
          className="backdrop"
          style={{ display: "block" }}
          onClick={closeAll}
        />
      )}

      <BackToTop />

      <HeaderTop />
      <Header onCartClick={() => openSidebar(setCartOpen)} />
      <Navbar />
      <CategorySidebar open={catOpen} onClose={closeAll} />
      <CartSidebar open={cartOpen} onClose={closeAll} />
      <NavSidebar open={navOpen} onClose={closeAll} />
      <MobileMenu
        onCateClick={() => openSidebar(setNavOpen)}
        onCartClick={() => openSidebar(setCartOpen)}
      />

      <main>
        <Outlet />
      </main>

      <Newsletter />
      <Intro />
      <Footer />
    </>
  );
}
