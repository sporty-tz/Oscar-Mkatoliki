import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import SlickSlider from "react-slick";
import type { Settings } from "react-slick";
import ProductCard from "../components/product/ProductCard";
import {
  assetPath,
  getAssetPublicUrl,
  loadBrands,
  loadCategories,
  loadProducts,
  type Brand,
  type Category,
  type Product,
} from "../lib/supabase";
import "@/styles/home-grid.css";

// react-slick is CJS – Vite may resolve default differently
const Slider = (
  "default" in SlickSlider
    ? (SlickSlider as unknown as { default: typeof SlickSlider }).default
    : SlickSlider
) as React.ComponentType<Settings & { children?: React.ReactNode }>;

const asset = (subPath: string) => getAssetPublicUrl(assetPath(subPath));

function SliderArrow(props: {
  className?: string;
  onClick?: () => void;
  direction: "prev" | "next";
  currentSlide?: number;
  slideCount?: number;
}) {
  const { onClick, direction } = props;
  return (
    <i
      className={
        direction === "next"
          ? "icofont-arrow-right dandik"
          : "icofont-arrow-left bamdik"
      }
      onClick={onClick}
    />
  );
}

const testimonials = [
  { name: "mahmud hasan", img: asset("avatar/01.jpg") },
  { name: "mahmud hasan", img: asset("avatar/02.jpg") },
  { name: "mahmud hasan", img: asset("avatar/03.jpg") },
  { name: "mahmud hasan", img: asset("avatar/04.jpg") },
];

function FeatureCard({
  p,
}: {
  p: {
    id: number | string;
    name: string;
    image: string;
    price: number;
    oldPrice?: number;
    unit: string;
    rating: number;
    reviewCount: number;
  };
}) {
  const [wished, setWished] = useState(false);
  const [showAction, setShowAction] = useState(false);
  const [qty, setQty] = useState(1);

  return (
    <div className="feature-card">
      <div className="feature-media">
        <div className="feature-label">
          <label className="label-text feat">feature</label>
        </div>
        <button
          className={`feature-wish wish${wished ? " active" : ""}`}
          onClick={() => setWished(!wished)}
        >
          <i className="fas fa-heart"></i>
        </button>
        <Link className="feature-image" to={`/product/${p.id}`}>
          <img src={p.image} alt={p.name} />
        </Link>
        <div className="feature-widget">
          <Link
            className="fas fa-random"
            to="/compare"
            title="Product Compare"
          />
          <a title="Product View" href="#" className="fas fa-eye" />
        </div>
      </div>
      <div className="feature-content">
        <h6 className="feature-name">
          <Link to={`/product/${p.id}`}>{p.name}</Link>
        </h6>
        <div className="feature-rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <i
              key={i}
              className={`icofont-star${i < p.rating ? " active" : ""}`}
            ></i>
          ))}
          <Link to={`/product/${p.id}`}>({p.reviewCount} Reviews)</Link>
        </div>
        <h6 className="feature-price">
          <del>${p.oldPrice}</del>
          <span>
            ${p.price}
            <small>/{p.unit}</small>
          </span>
        </h6>
        <p className="feature-desc">
          Lorem ipsum dolor sit consectetur adipisicing xpedita dicta amet olor
          ut eveniet commodi...
        </p>
        {!showAction ? (
          <button
            className="product-add"
            title="Add to Cart"
            onClick={() => setShowAction(true)}
          >
            <i className="fas fa-shopping-basket"></i>
            <span>add</span>
          </button>
        ) : (
          <div className="product-action" style={{ display: "flex" }}>
            <button
              className="action-minus"
              title="Quantity Minus"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
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
              onClick={() => setQty((q) => q + 1)}
            >
              <i className="icofont-plus"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Home() {
  const [activeTab, setActiveTab] = useState("top-order");

  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [dbCategories, setDbCategories] = useState<Category[]>([]);
  const [dbBrands, setDbBrands] = useState<Brand[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [products, categories, brands] = await Promise.all([
        loadProducts(80),
        loadCategories(20),
        loadBrands(20),
      ]);
      if (!mounted) return;
      setDbProducts(products);
      setDbCategories(categories);
      setDbBrands(brands);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const mappedDbProducts = useMemo(
    () =>
      dbProducts.map((p, idx) => ({
        id: p.id,
        name: p.name,
        image:
          p.image_url ||
          asset(`product/${String((idx % 20) + 1).padStart(2, "0")}.jpg`),
        price: Number(p.price) || 0,
        oldPrice: undefined,
        unit: "piece",
        rating: 4,
        reviewCount: 0,
        labels: p.is_featured ? (["sale"] as string[]) : ([] as string[]),
      })),
    [dbProducts],
  );

  const suggestItems = dbCategories.slice(0, 8).map((c, idx) => ({
    img:
      c.image_url ||
      asset(`suggest/${String((idx % 8) + 1).padStart(2, "0")}.jpg`),
    name: c.name,
    count: 0,
  }));

  const sampleProducts = mappedDbProducts.slice(0, 10);

  const featuredProducts = mappedDbProducts.slice(0, 6);

  const newProducts = mappedDbProducts.slice(0, 10).map((p) => ({
    ...p,
    labels: ["new"] as string[],
  }));

  const nicheOrderProducts = mappedDbProducts.slice(0, 10).map((p) => ({
    ...p,
    labels: ["order"] as string[],
    labelText: "new",
  }));

  const nicheRateProducts = mappedDbProducts.slice(0, 10).map((p) => ({
    ...p,
    labels: ["rate"] as string[],
    labelText: "4.8",
  }));

  const nicheDiscProducts = mappedDbProducts.slice(0, 10).map((p) => ({
    ...p,
    labels: ["off"] as string[],
    labelText: "-10%",
  }));

  const brands = dbBrands.slice(0, 6).map((b, idx) => ({
    img:
      b.image_url ||
      asset(`brand/${String((idx % 6) + 1).padStart(2, "0")}.jpg`),
    name: b.name,
    count: 0,
  }));

  const nicheData: Record<string, typeof nicheOrderProducts> = {
    "top-order": nicheOrderProducts,
    "top-rate": nicheRateProducts,
    "top-disc": nicheDiscProducts,
  };

  return (
    <>
      {/* Banner */}
      <section className="banner-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 order-1 order-lg-0 order-xl-0">
              <div className="row">
                <div className="col-sm-6 col-lg-12">
                  <div className="home-grid-promo">
                    <a href="#">
                      <img src={asset("promo/home/01.jpg")} alt="promo" />
                    </a>
                  </div>
                </div>
                <div className="col-sm-6 col-lg-12">
                  <div className="home-grid-promo">
                    <a href="#">
                      <img src={asset("promo/home/02.jpg")} alt="promo" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8 order-0 order-lg-1 order-xl-1">
              <Slider
                className="home-grid-slider slider-arrow slider-dots"
                dots={true}
                fade={false}
                infinite={true}
                autoplay={true}
                autoplaySpeed={4000}
                arrows={true}
                speed={600}
                prevArrow={<SliderArrow direction="prev" />}
                nextArrow={<SliderArrow direction="next" />}
                slidesToShow={1}
                slidesToScroll={1}
                responsive={[{ breakpoint: 576, settings: { arrows: false } }]}
              >
                <a href="#">
                  <img src={asset("home/grid/01.jpg")} alt="banner" />
                </a>
                <a href="#">
                  <img src={asset("home/grid/02.jpg")} alt="banner" />
                </a>
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Suggest Categories */}
      <section className="section suggest-part">
        <div className="container">
          <Slider
            className="suggest-slider slider-arrow"
            dots={false}
            infinite={true}
            autoplay={true}
            autoplaySpeed={3000}
            arrows={true}
            speed={1000}
            prevArrow={<SliderArrow direction="prev" />}
            nextArrow={<SliderArrow direction="next" />}
            slidesToShow={5}
            slidesToScroll={2}
            responsive={[
              {
                breakpoint: 1200,
                settings: { slidesToShow: 4, slidesToScroll: 4 },
              },
              {
                breakpoint: 992,
                settings: { slidesToShow: 3, slidesToScroll: 3 },
              },
              {
                breakpoint: 768,
                settings: { slidesToShow: 2, slidesToScroll: 2 },
              },
              {
                breakpoint: 576,
                settings: { slidesToShow: 2, slidesToScroll: 2, arrows: false },
              },
            ]}
          >
            {suggestItems.length === 0 && (
              <li>
                <p>No categories available yet.</p>
              </li>
            )}
            {suggestItems.map((item) => (
              <li key={item.name}>
                <Link className="suggest-card" to="/shop">
                  <img src={item.img} alt={item.name} />
                  <h5>
                    {item.name} <span>{item.count} items</span>
                  </h5>
                </Link>
              </li>
            ))}
          </Slider>
        </div>
      </section>

      {/* Recently Sold Items */}
      <section className="section recent-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>recently sold items</h2>
              </div>
            </div>
          </div>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {sampleProducts.length === 0 && (
              <div className="col-12">
                <p>No products available yet.</p>
              </div>
            )}
            {sampleProducts.map((p) => (
              <div className="col" key={p.id}>
                <ProductCard {...p} />
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="section-btn-25">
                <Link className="btn btn-outline" to="/shop">
                  <i className="fas fa-eye"></i>
                  <span>show more</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <div className="section promo-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="promo-img">
                <a href="#">
                  <img src={asset("promo/home/03.jpg")} alt="promo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Items */}
      <section className="section feature-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>our featured items</h2>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-1 row-cols-lg-2 row-cols-xl-2">
            {featuredProducts.length === 0 && (
              <div className="col-12">
                <p>No featured products available yet.</p>
              </div>
            )}
            {featuredProducts.map((p) => (
              <div className="col" key={p.id}>
                <FeatureCard p={p} />
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="section-btn-25">
                <Link className="btn btn-outline" to="/shop">
                  <i className="fas fa-eye"></i>
                  <span>show more</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown */}
      <section className="section countdown-part">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mx-auto">
              <div className="countdown-content">
                <h3>special discount offer for vegetable items</h3>
                <p>
                  Reprehenderit sed quod autem molestiae aut modi minus
                  veritatis iste dolorum suscipit quis voluptatum fugiat
                  mollitia quia minima
                </p>
                <div className="countdown countdown-clock">
                  <span className="countdown-time">
                    <span>00</span>
                    <small>days</small>
                  </span>
                  <span className="countdown-time">
                    <span>00</span>
                    <small>hours</small>
                  </span>
                  <span className="countdown-time">
                    <span>00</span>
                    <small>minutes</small>
                  </span>
                  <span className="countdown-time">
                    <span>00</span>
                    <small>seconds</small>
                  </span>
                </div>
                <Link className="btn btn-inline" to="/shop">
                  <i className="fas fa-shopping-basket"></i>
                  <span>shop now</span>
                </Link>
              </div>
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5">
              <div className="countdown-img">
                <img src={asset("countdown.png")} alt="countdown" />
                <div className="countdown-off">
                  <span>20%</span>
                  <span>off</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Items */}
      <section className="section newitem-part">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section-heading">
                <h2>collected new items</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <Slider
                className="new-slider slider-arrow"
                dots={false}
                infinite={true}
                autoplay={true}
                autoplaySpeed={3000}
                arrows={true}
                speed={800}
                slidesToShow={5}
                slidesToScroll={1}
                prevArrow={<SliderArrow direction="prev" />}
                nextArrow={<SliderArrow direction="next" />}
                responsive={[
                  {
                    breakpoint: 1200,
                    settings: { slidesToShow: 4, slidesToScroll: 2 },
                  },
                  {
                    breakpoint: 992,
                    settings: { slidesToShow: 3, slidesToScroll: 3 },
                  },
                  {
                    breakpoint: 768,
                    settings: { slidesToShow: 2, slidesToScroll: 2 },
                  },
                  {
                    breakpoint: 576,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      arrows: false,
                    },
                  },
                ]}
              >
                {newProducts.length === 0 && (
                  <div>
                    <p>No new products available yet.</p>
                  </div>
                )}
                {newProducts.map((p) => (
                  <div key={p.id}>
                    <ProductCard {...p} />
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <div className="section-btn-25">
                <Link className="btn btn-outline" to="/shop">
                  <i className="fas fa-eye"></i>
                  <span>show more</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Promo */}
      <div className="section promo-part">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-6 px-xl-3">
              <div className="promo-img">
                <a href="#">
                  <img src={asset("promo/home/01.jpg")} alt="promo" />
                </a>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 px-xl-3">
              <div className="promo-img">
                <a href="#">
                  <img src={asset("promo/home/02.jpg")} alt="promo" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Browse by Top Niche */}
      <section className="section niche-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-heading">
                <h2>Browse by Top Niche</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul className="nav nav-tabs">
                <li>
                  <button
                    className={`tab-link${activeTab === "top-order" ? " active" : ""}`}
                    onClick={() => setActiveTab("top-order")}
                  >
                    <i className="icofont-price"></i>
                    <span>top order</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`tab-link${activeTab === "top-rate" ? " active" : ""}`}
                    onClick={() => setActiveTab("top-rate")}
                  >
                    <i className="icofont-star"></i>
                    <span>top rating</span>
                  </button>
                </li>
                <li>
                  <button
                    className={`tab-link${activeTab === "top-disc" ? " active" : ""}`}
                    onClick={() => setActiveTab("top-disc")}
                  >
                    <i className="icofont-sale-discount"></i>
                    <span>top discount</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {nicheData[activeTab].length === 0 && (
              <div className="col-12">
                <p>No products available for this section yet.</p>
              </div>
            )}
            {nicheData[activeTab].map((p) => (
              <div className="col" key={p.id}>
                <ProductCard
                  id={p.id}
                  name={p.name}
                  image={p.image}
                  price={p.price}
                  oldPrice={p.oldPrice}
                  unit={p.unit}
                  rating={p.rating}
                  reviewCount={p.reviewCount}
                  labels={p.labels}
                  labelText={p.labelText}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Brands */}
      <section className="section brand-part">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h2>shop by brands</h2>
              </div>
            </div>
          </div>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-6">
            {brands.length === 0 && (
              <div className="col-12">
                <p>No brands available yet.</p>
              </div>
            )}
            {brands.map((b) => (
              <div className="col" key={b.name}>
                <div className="brand-wrap">
                  <div className="brand-media">
                    <img src={b.img} alt={b.name} />
                    <div className="brand-overlay">
                      <Link to="/brand/1">
                        <i className="fas fa-link"></i>
                      </Link>
                    </div>
                  </div>
                  <div className="brand-meta">
                    <h4>{b.name}</h4>
                    <p>({b.count} items)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="section-btn-50">
                <Link className="btn btn-outline" to="/brands">
                  <i className="fas fa-eye"></i>
                  <span>view all brands</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section testimonial-part">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h2>client&apos;s feedback</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <Slider
                className="testimonial-slider slider-arrow"
                dots={false}
                infinite={true}
                autoplay={false}
                arrows={true}
                fade={false}
                speed={1000}
                centerMode={true}
                centerPadding="250px"
                slidesToShow={1}
                slidesToScroll={1}
                prevArrow={<SliderArrow direction="prev" />}
                nextArrow={<SliderArrow direction="next" />}
                responsive={[
                  {
                    breakpoint: 1200,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      centerPadding: "250px",
                    },
                  },
                  {
                    breakpoint: 992,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      centerPadding: "130px",
                    },
                  },
                  {
                    breakpoint: 768,
                    settings: {
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      centerPadding: "40px",
                    },
                  },
                  {
                    breakpoint: 576,
                    settings: {
                      arrows: false,
                      slidesToShow: 1,
                      slidesToScroll: 1,
                      centerPadding: "10px",
                    },
                  },
                ]}
              >
                {testimonials.map((t, idx) => (
                  <div key={idx}>
                    <div className="testimonial-card">
                      <i className="fas fa-quote-left"></i>
                      <p>
                        Lorem ipsum dolor consectetur adipisicing elit neque
                        earum sapiente vitae obcaecati magnam doloribus magni
                        provident ipsam
                      </p>
                      <h5>{t.name}</h5>
                      <ul>
                        <li className="fas fa-star"></li>
                        <li className="fas fa-star"></li>
                        <li className="fas fa-star"></li>
                        <li className="fas fa-star"></li>
                        <li className="fas fa-star"></li>
                      </ul>
                      <img src={t.img} alt="testimonial" />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </section>

      {/* Blog */}
      <section className="section blog-part">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section-heading">
                <h2>Read our articles</h2>
              </div>
            </div>
          </div>
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {[1, 2, 3].map((i) => (
              <div className="col" key={i}>
                <div className="blog-card">
                  <div className="blog-media">
                    <Link className="blog-img" to={`/blog/post-${i}`}>
                      <img
                        src={asset(`blog/${String(i).padStart(2, "0")}.jpg`)}
                        alt="blog"
                      />
                    </Link>
                  </div>
                  <div className="blog-content">
                    <ul className="blog-meta">
                      <li>
                        <i className="fas fa-user"></i>
                        <span>admin</span>
                      </li>
                      <li>
                        <i className="fas fa-calendar-alt"></i>
                        <span>february 02, 2021</span>
                      </li>
                    </ul>
                    <h4 className="blog-title">
                      <Link to={`/blog/post-${i}`}>
                        Voluptate blanditiis provident Lorem ipsum dolor sit
                        amet
                      </Link>
                    </h4>
                    <p className="blog-desc">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Alias autem recusandae deleniti nam dignissimos sequi ...
                    </p>
                    <Link className="blog-btn" to={`/blog/post-${i}`}>
                      <span>read more</span>
                      <i className="icofont-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col-lg-12">
              <div className="section-btn-25">
                <Link className="btn btn-outline" to="/blog">
                  <i className="fas fa-eye"></i>
                  <span>view all blog</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
