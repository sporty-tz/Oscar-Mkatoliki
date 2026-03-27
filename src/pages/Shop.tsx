import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import {
  assetPath,
  getAssetPublicUrl,
  loadBrands,
  loadProducts,
  type Brand,
  type Product,
} from "../lib/supabase";
import "@/styles/product-grid.css";

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [productRows, brandRows] = await Promise.all([
          loadProducts(60),
          loadBrands(30),
        ]);
        if (!mounted) return;
        setProducts(productRows);
        setBrands(brandRows);
      } finally {
        if (mounted) setLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, []);

  const uiProducts = useMemo(
    () =>
      products.map((p, idx) => ({
        id: p.id,
        name: p.name,
        image:
          p.image_url ||
          getAssetPublicUrl(
            assetPath(`product/${String((idx % 20) + 1).padStart(2, "0")}.jpg`),
          ),
        price: Number(p.price) || 0,
        oldPrice: undefined,
        unit: "piece",
        rating: 4,
        reviewCount: 0,
        labels: p.is_featured ? (["feat"] as string[]) : ([] as string[]),
      })),
    [products],
  );

  const bannerImage = getAssetPublicUrl(assetPath("single-banner.jpg"));
  const promoImage = getAssetPublicUrl(assetPath("promo/shop/01.jpg"));

  return (
    <>
      <section
        className="inner-section single-banner"
        style={{
          background: `url(${bannerImage}) no-repeat center`,
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <h2>shop 4 column</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              shop
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section shop-part">
        <div className="container">
          <div className="row content-reverse">
            <div className="col-lg-3">
              <div className="shop-widget-promo">
                <a href="#">
                  <img src={promoImage} alt="promo" />
                </a>
              </div>

              <div className="shop-widget">
                <h6 className="shop-widget-title">Filter by Price</h6>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="shop-widget-group">
                    <input type="text" placeholder="Min - 00" />
                    <input type="text" placeholder="Max - 5k" />
                  </div>
                  <button className="shop-widget-btn" type="submit">
                    <i className="fas fa-search"></i>
                    <span>search</span>
                  </button>
                </form>
              </div>

              <div className="shop-widget">
                <h6 className="shop-widget-title">Filter by Rating</h6>
                <form onSubmit={(e) => e.preventDefault()}>
                  <ul className="shop-widget-list">
                    {[5, 4, 3, 2, 1].map((rating, index) => (
                      <li key={`rating-${rating}`}>
                        <div className="shop-widget-content">
                          <input type="checkbox" id={`feat${index + 1}`} />
                          <label htmlFor={`feat${index + 1}`}>
                            {[1, 2, 3, 4, 5].map((star) => (
                              <i
                                key={`star-${rating}-${star}`}
                                className={`fas fa-star${
                                  star <= rating ? " active" : ""
                                }`}
                              ></i>
                            ))}
                          </label>
                        </div>
                        <span className="shop-widget-number">
                          ({13 + index * 12})
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button className="shop-widget-btn" type="button">
                    <i className="far fa-trash-alt"></i>
                    <span>clear filter</span>
                  </button>
                </form>
              </div>

              <div className="shop-widget">
                <h6 className="shop-widget-title">Filter by Tag</h6>
                <form onSubmit={(e) => e.preventDefault()}>
                  <ul className="shop-widget-list">
                    {[
                      "new items",
                      "sale items",
                      "rating items",
                      "feature items",
                      "discount items",
                    ].map((tag, index) => (
                      <li key={tag}>
                        <div className="shop-widget-content">
                          <input type="checkbox" id={`tag${index + 1}`} />
                          <label htmlFor={`tag${index + 1}`}>{tag}</label>
                        </div>
                        <span className="shop-widget-number">
                          ({13 + index * 15})
                        </span>
                      </li>
                    ))}
                  </ul>
                  <button className="shop-widget-btn" type="button">
                    <i className="far fa-trash-alt"></i>
                    <span>clear filter</span>
                  </button>
                </form>
              </div>

              <div className="shop-widget">
                <h6 className="shop-widget-title">Filter by Brand</h6>
                <form onSubmit={(e) => e.preventDefault()}>
                  <input
                    className="shop-widget-search"
                    type="text"
                    placeholder="Search..."
                  />
                  <ul className="shop-widget-list shop-widget-scroll">
                    {brands.map((brand, index) => (
                      <li key={brand.id}>
                        <div className="shop-widget-content">
                          <input type="checkbox" id={`brand${index + 1}`} />
                          <label htmlFor={`brand${index + 1}`}>
                            {brand.name}
                          </label>
                        </div>
                        <span className="shop-widget-number">
                          ({13 + index * 11})
                        </span>
                      </li>
                    ))}
                    {brands.length === 0 && <li>No brands available yet.</li>}
                  </ul>
                  <button className="shop-widget-btn" type="button">
                    <i className="far fa-trash-alt"></i>
                    <span>clear filter</span>
                  </button>
                </form>
              </div>
            </div>

            <div className="col-lg-9">
              <div className="row">
                <div className="col-lg-12">
                  <div className="top-filter">
                    <div className="filter-show">
                      <label className="filter-label">Show :</label>
                      <select className="form-select filter-select">
                        <option value="1">12</option>
                        <option value="2">24</option>
                        <option value="3">36</option>
                      </select>
                    </div>
                    <div className="filter-short">
                      <label className="filter-label">Short by :</label>
                      <select
                        className="form-select filter-select"
                        defaultValue="default"
                      >
                        <option value="default">default</option>
                        <option value="trending">trending</option>
                        <option value="featured">featured</option>
                        <option value="recommend">recommend</option>
                      </select>
                    </div>
                    <div className="filter-action">
                      <Link to="/shop" title="Three Column">
                        <i className="fas fa-th"></i>
                      </Link>
                      <Link to="/shop" title="Two Column">
                        <i className="fas fa-th-large"></i>
                      </Link>
                      <Link to="/shop" title="One Column">
                        <i className="fas fa-th-list"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-3 row-cols-xl-4">
                {loading && (
                  <div className="col-12">
                    <p>Loading products...</p>
                  </div>
                )}
                {!loading && uiProducts.length === 0 && (
                  <div className="col-12">
                    <p>No products found yet. Add products in Supabase.</p>
                  </div>
                )}
                {uiProducts.map((p) => (
                  <div className="col" key={p.id}>
                    <ProductCard {...p} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
