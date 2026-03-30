import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import LandingPage from "./pages/LandingPage";
import Home from "./pages/Home";
import Bible from "./pages/Bible";
import DailySaints from "./pages/DailySaints";
import Prayers from "./pages/Prayers";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ProductDetails from "./pages/ProductDetails";
import UserProfile from "./pages/UserProfile";
// Informational & utility pages
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import AboutUs from "./pages/AboutUs";
import OurMission from "./pages/OurMission";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import ContactUs from "./pages/ContactUs";
import FAQ from "./pages/Faq";
import ShippingPolicy from "./pages/ShippingPolicy";
import TrackOrder from "./pages/TrackOrder";
import GetApp from "./pages/GetApp";
import FindParish from "./pages/FindParish";
import GiftCards from "./pages/GiftCards";
import Help from "./pages/Help";
import Donations from "./pages/Donations";
import SearchResults from "./pages/SearchResults";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/shop" element={<Home />} />
            <Route path="/bible" element={<Bible />} />
            <Route path="/daily-saints" element={<DailySaints />} />
            <Route path="/prayers" element={<Prayers />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            {/* Legal */}
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            {/* Company */}
            <Route path="/about" element={<AboutUs />} />
            <Route path="/mission" element={<OurMission />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/careers" element={<Careers />} />
            {/* Customer care */}
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/shipping-policy" element={<ShippingPolicy />} />
            <Route path="/track-order" element={<TrackOrder />} />
            {/* Utility */}
            <Route path="/get-app" element={<GetApp />} />
            <Route path="/find-parish" element={<FindParish />} />
            <Route path="/gift-cards" element={<GiftCards />} />
            <Route path="/help" element={<Help />} />
            <Route path="/donations" element={<Donations />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
