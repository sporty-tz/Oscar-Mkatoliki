import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import MainLayout from "./components/layout/MainLayout";
import AuthLayout from "./components/layout/AuthLayout";
import ScrollToTop from "./components/ui/ScrollToTop";

// Lazy-loaded pages
const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Faq = lazy(() => import("./pages/Faq"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Offer = lazy(() => import("./pages/Offer"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductSingle = lazy(() => import("./pages/ProductSingle"));
const AllCategory = lazy(() => import("./pages/AllCategory"));
const BrandList = lazy(() => import("./pages/BrandList"));
const BrandSingle = lazy(() => import("./pages/BrandSingle"));
const Wishlist = lazy(() => import("./pages/Wishlist"));
const Compare = lazy(() => import("./pages/Compare"));
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderList = lazy(() => import("./pages/OrderList"));
const Invoice = lazy(() => import("./pages/Invoice"));
const Profile = lazy(() => import("./pages/Profile"));
const Wallet = lazy(() => import("./pages/Wallet"));
const BlogGrid = lazy(() => import("./pages/BlogGrid"));
const BlogDetails = lazy(() => import("./pages/BlogDetails"));
const BlogAuthor = lazy(() => import("./pages/BlogAuthor"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const ChangePassword = lazy(() => import("./pages/ChangePassword"));
const ComingSoon = lazy(() => import("./pages/ComingSoon"));
const NotFound = lazy(() => import("./pages/NotFound"));

function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary)]"></div>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Auth pages (no header/footer) */}
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/change-password" element={<ChangePassword />} />
          </Route>

          {/* Full-chrome pages */}
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product/:id" element={<ProductSingle />} />
            <Route path="/categories" element={<AllCategory />} />
            <Route path="/brands" element={<BrandList />} />
            <Route path="/brand/:id" element={<BrandSingle />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/invoice" element={<Invoice />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/blog" element={<BlogGrid />} />
            <Route path="/blog/:slug" element={<BlogDetails />} />
            <Route path="/blog/author/:id" element={<BlogAuthor />} />
          </Route>

          {/* Standalone pages */}
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}
