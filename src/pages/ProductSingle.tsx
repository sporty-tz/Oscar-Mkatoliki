import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/product/ProductCard";
import { useShop } from "../context/useShop";
import { useAppSettings } from "../context/useAppSettings";
import "@/styles/product-details.css";

export default function ProductSingle() {
  const { id } = useParams();
  const productId = Number(id) || 1;
  const [activeTab, setActiveTab] = useState<"desc" | "spec" | "review">(
    "desc",
  );
  const [activeImage, setActiveImage] = useState(0);
  const {
    addToCart,
    toggleWishlist,
    toggleCompare,
    isInWishlist,
    isInCompare,
  } = useShop();
  const { formatMoney } = useAppSettings();

  const galleryImages = useMemo(
    () =>
      Array.from(
        { length: 5 },
        (_, i) =>
          `/images/product/${String(((productId + i - 1) % 10) + 1).padStart(2, "0")}.jpg`,
      ),
    [productId],
  );

  const currentProduct = useMemo(
    () => ({
      id: productId,
      name: "existing product name",
      image: galleryImages[activeImage],
      price: 24,
      oldPrice: 38,
      unit: "kilo",
    }),
    [activeImage, galleryImages, productId],
  );

  const wished = isInWishlist(productId);
  const compared = isInCompare(productId);

  const relatedProducts = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        id: i + 1,
        name: "fresh green chilis",
        image: `/images/product/${String((i % 10) + 1).padStart(2, "0")}.jpg`,
        price: 28,
        oldPrice: 34,
        unit: "piece",
        rating: 4,
        reviewCount: 3,
        labels:
          i === 1 ? (["sale", "new"] as string[]) : (["sale"] as string[]),
      })),
    [],
  );

  return (
    <>
      <section
        className="inner-section single-banner"
        style={{
          background: "url(/images/single-banner.jpg) no-repeat center",
          backgroundSize: "cover",
        }}
      >
        <div className="container">
          <h2>product video</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/shop">shop-4column</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              product-video
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="product-navigation">
                <li className="product-nav-prev">
                  <a href="#">
                    <i className="icofont-arrow-left"></i>
                    prev product
                    <span className="product-nav-popup">
                      <img src="/images/product/02.jpg" alt="product" />
                      <small>green chilis</small>
                    </span>
                  </a>
                </li>
                <li className="product-nav-next">
                  <a href="#">
                    next product
                    <i className="icofont-arrow-right"></i>
                    <span className="product-nav-popup">
                      <img src="/images/product/03.jpg" alt="product" />
                      <small>green chilis</small>
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-6">
              <div className="details-gallery">
                <div className="details-label-group">
                  <label className="details-label new">new</label>
                  <label className="details-label off">-10%</label>
                </div>
                <ul className="details-preview">
                  <li>
                    <img src={galleryImages[activeImage]} alt="product" />
                  </li>
                </ul>
                <ul className="details-thumb">
                  {galleryImages.map((img, idx) => (
                    <li
                      key={img}
                      className={idx === activeImage ? "slick-current" : ""}
                      onClick={() => setActiveImage(idx)}
                    >
                      <img src={img} alt="product" />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="details-content">
                <h3 className="details-name">
                  <a href="#">existing product name</a>
                </h3>
                <div className="details-meta">
                  <p>
                    SKU:<span>1234567</span>
                  </p>
                  <p>
                    BRAND:<a href="#">Radhuni</a>
                  </p>
                </div>
                <div className="details-rating">
                  <i className="active icofont-star"></i>
                  <i className="active icofont-star"></i>
                  <i className="active icofont-star"></i>
                  <i className="active icofont-star"></i>
                  <i className="icofont-star"></i>
                  <a href="#">(3 reviews)</a>
                </div>
                <h3 className="details-price">
                  <del>{formatMoney(38, "usd")}</del>
                  <span>
                    {formatMoney(24, "usd")}
                    <small>/per kilo</small>
                  </span>
                </h3>
                <p className="details-desc">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit facere
                  harum natus amet soluta fuga consectetur alias veritatis
                  quisquam ab eligendi itaque eos maiores quibusdam.
                </p>

                <div className="details-list-group">
                  <label className="details-list-title">tags:</label>
                  <ul className="details-tag-list">
                    <li>
                      <a href="#">organic</a>
                    </li>
                    <li>
                      <a href="#">fruits</a>
                    </li>
                    <li>
                      <a href="#">chilis</a>
                    </li>
                  </ul>
                </div>

                <div className="details-list-group">
                  <label className="details-list-title">Share:</label>
                  <ul className="details-share-list">
                    <li>
                      <a
                        href="#"
                        className="icofont-facebook"
                        title="Facebook"
                      ></a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="icofont-twitter"
                        title="Twitter"
                      ></a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="icofont-linkedin"
                        title="Linkedin"
                      ></a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="icofont-instagram"
                        title="Instagram"
                      ></a>
                    </li>
                  </ul>
                </div>

                <div className="details-add-group">
                  <button
                    className="product-add"
                    title="Add to Cart"
                    onClick={() => addToCart(currentProduct, 1)}
                  >
                    <i className="fas fa-shopping-basket"></i>
                    <span>add to cart</span>
                  </button>
                </div>

                <div className="details-action-group">
                  <a
                    href="#"
                    className={`details-wish${wished ? " active" : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      toggleWishlist(currentProduct);
                    }}
                  >
                    <i className="icofont-heart"></i>
                    <span>add to wish</span>
                  </a>
                  <Link
                    className="details-compare"
                    to="/compare"
                    onClick={() => {
                      if (!compared) {
                        toggleCompare(currentProduct);
                      }
                    }}
                  >
                    <i className="fas fa-random"></i>
                    <span>{compared ? "Compared" : "Compare This"}</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="inner-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <ul className="nav nav-tabs">
                <li>
                  <button
                    className={`tab-link${activeTab === "desc" ? " active" : ""}`}
                    onClick={() => setActiveTab("desc")}
                  >
                    descriptions
                  </button>
                </li>
                <li>
                  <button
                    className={`tab-link${activeTab === "spec" ? " active" : ""}`}
                    onClick={() => setActiveTab("spec")}
                  >
                    specifications
                  </button>
                </li>
                <li>
                  <button
                    className={`tab-link${activeTab === "review" ? " active" : ""}`}
                    onClick={() => setActiveTab("review")}
                  >
                    reviews (2)
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className={`tab-pane${activeTab === "desc" ? " active" : ""}`}>
            <div className="row">
              <div className="col-lg-6">
                <div className="product-details-frame">
                  <div className="tab-descrip">
                    <p>
                      Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                      Recusandae delectus natus quasi aperiam. Nulla
                      perspiciatis ullam ipsa, magni animi eligendi quis
                      mollitia dolor omnis alias ut aspernatur est voluptatem
                      illo totam iste consequatur vitae laborum ipsam facilis
                      ipsa, voluptatum neque dolor facere autem maiores
                      pariatur, eveniet veritatis vero iure obcaecati.
                    </p>
                    <ul>
                      <li>
                        Lorem ipsum dolor sit amet consectetur adipisicing.
                      </li>
                      <li>
                        labore possimus architecto, saepe nobis ex mollitia
                      </li>
                      <li>
                        mollitia soluta magni placeat. Eaque sit praesentium
                      </li>
                      <li>
                        distinctio ab a exercitationem officiis labore possimus
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="product-details-frame">
                  <div className="tab-descrip">
                    <img src="/images/video.jpg" alt="video" />
                    <a
                      title="Product Video"
                      href="https://youtu.be/9xzcVxSBbG8"
                      className="venobox fas fa-play"
                    ></a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={`tab-pane${activeTab === "spec" ? " active" : ""}`}>
            <div className="row">
              <div className="col-lg-12">
                <div className="product-details-frame">
                  <table className="table table-bordered">
                    <tbody>
                      <tr>
                        <th scope="row">Product code</th>
                        <td>SKU: 101783</td>
                      </tr>
                      <tr>
                        <th scope="row">Weight</th>
                        <td>1kg, 2kg</td>
                      </tr>
                      <tr>
                        <th scope="row">Styles</th>
                        <td>Fresh greeny</td>
                      </tr>
                      <tr>
                        <th scope="row">Properties</th>
                        <td>Organic, delicious</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className={`tab-pane${activeTab === "review" ? " active" : ""}`}>
            <div className="row">
              <div className="col-lg-12">
                <div className="product-details-frame">
                  <ul className="review-list">
                    <li className="review-item">
                      <div className="review-media">
                        <a className="review-avatar" href="#">
                          <img src="/images/avatar/01.jpg" alt="review" />
                        </a>
                        <div className="review-meta">
                          <a href="#">Mahmud Hasan</a>
                          <span>
                            june 02, 2020 <b>8:24 PM</b>
                          </span>
                        </div>
                      </div>
                      <ul className="review-rating">
                        <li className="icofont-ui-rating"></li>
                        <li className="icofont-ui-rating"></li>
                        <li className="icofont-ui-rating"></li>
                        <li className="icofont-ui-rating"></li>
                        <li className="icofont-ui-rate-blank"></li>
                      </ul>
                      <p className="review-desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit
                        non tempora magni repudiandae sint suscipit tempore.
                      </p>
                      <form className="review-reply">
                        <input type="text" placeholder="reply your thoughts" />
                        <button>
                          <i className="icofont-reply"></i>
                          reply
                        </button>
                      </form>
                    </li>
                  </ul>

                  <form className="review-form">
                    <h3 className="frame-title">add your review</h3>
                    <div className="star-rating">
                      <input type="radio" name="rating" id="star-1" />
                      <label htmlFor="star-1"></label>
                      <input type="radio" name="rating" id="star-2" />
                      <label htmlFor="star-2"></label>
                      <input type="radio" name="rating" id="star-3" />
                      <label htmlFor="star-3"></label>
                      <input type="radio" name="rating" id="star-4" />
                      <label htmlFor="star-4"></label>
                      <input type="radio" name="rating" id="star-5" />
                      <label htmlFor="star-5"></label>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="form-group">
                          <textarea
                            className="form-control"
                            placeholder="Describe"
                          ></textarea>
                        </div>
                      </div>
                      <div className="col-lg-12">
                        <button className="btn btn-inline">
                          drop your review
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="inner-section">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="section-heading">
                <h2>related this items</h2>
              </div>
            </div>
          </div>
          <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5">
            {relatedProducts.map((p) => (
              <div className="col" key={p.id}>
                <ProductCard {...p} />
              </div>
            ))}
          </div>
          <div className="row">
            <div className="col">
              <div className="section-btn-25">
                <Link className="btn btn-outline" to="/shop">
                  <i className="fas fa-eye"></i>
                  <span>view all related</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
