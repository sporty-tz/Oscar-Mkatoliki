import { Link } from "react-router-dom";
import "@/styles/blog-grid.css";

const blogPosts = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  image: `/images/blog/0${(i % 4) + 1}.jpg`,
  author: "Admin",
  date: `${15 + i} Jun, 2024`,
  title: "Lorem ipsum dolor sit amet consectetur tempor incididunt",
  desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet reiciendis beatae consequis...",
}));

export default function BlogGrid() {
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
          <h2>blog grid</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              blog grid
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section blog-grid">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="top-filter">
                <div className="filter-show">
                  <label className="filter-label">Show :</label>
                  <select className="form-select filter-select">
                    <option value="8">8</option>
                    <option value="16">16</option>
                    <option value="24">24</option>
                  </select>
                </div>
                <div className="filter-short">
                  <label className="filter-label">Sort by :</label>
                  <select className="form-select filter-select">
                    <option value="default">default</option>
                    <option value="recent">recent</option>
                    <option value="featured">featured</option>
                    <option value="recommend">recommend</option>
                  </select>
                </div>
                <div className="filter-action">
                  <Link to="/blog-grid" className="active" title="Grid View">
                    <i className="fas fa-th" />
                  </Link>
                  <Link to="/blog-standard" title="List View">
                    <i className="fas fa-th-list" />
                  </Link>
                </div>
              </div>

              <div className="row">
                {blogPosts.map((post) => (
                  <div key={post.id} className="col-md-6 col-lg-6">
                    <div className="blog-card">
                      <div className="blog-media">
                        <div className="blog-img">
                          <Link to="/blog-details">
                            <img src={post.image} alt="blog" />
                          </Link>
                        </div>
                      </div>
                      <div className="blog-content">
                        <ul className="blog-meta">
                          <li>
                            <i className="fas fa-user" />
                            <span>{post.author}</span>
                          </li>
                          <li>
                            <i className="fas fa-calendar-alt" />
                            <span>{post.date}</span>
                          </li>
                        </ul>
                        <h4 className="blog-title">
                          <Link to="/blog-details">{post.title}</Link>
                        </h4>
                        <p className="blog-desc">{post.desc}</p>
                        <Link to="/blog-details" className="blog-btn">
                          <span>read more</span>
                          <i className="icofont-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bottom-paginate">
                <p className="page-info">Show 1 to 8 of 20 results</p>
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <i className="fas fa-long-arrow-alt-left" />
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      <i className="fas fa-long-arrow-alt-right" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-md-7 col-lg-4">
              <div className="blog-widget">
                <h4 className="blog-widget-title">Find blogs</h4>
                <form className="blog-widget-form">
                  <input type="text" placeholder="Search blogs..." />
                  <button type="submit">
                    <i className="fas fa-search" />
                  </button>
                </form>
              </div>

              <div className="blog-widget">
                <h4 className="blog-widget-title">popular feeds</h4>
                <ul className="blog-widget-feed">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <li key={i}>
                      <Link to="/blog-details">
                        <img src={`/images/blog-widget/0${i}.jpg`} alt="blog" />
                        <div>
                          <h6>Lorem ipsum dolor sit amet consectetur</h6>
                          <span>{10 + i} Jun, 2024</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="blog-widget">
                <h4 className="blog-widget-title">top categories</h4>
                <ul className="blog-widget-category">
                  {[
                    "Vegetables",
                    "Grocery",
                    "Fruits",
                    "Snacks",
                    "Beverages",
                  ].map((cat, i) => (
                    <li key={cat}>
                      <a href="#">
                        {cat} <span>({(i + 1) * 5})</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="blog-widget">
                <h4 className="blog-widget-title">popular tags</h4>
                <ul className="blog-widget-tag">
                  {[
                    "organic",
                    "vegetables",
                    "grocery",
                    "fruits",
                    "snacks",
                    "health",
                    "natural",
                  ].map((tag) => (
                    <li key={tag}>
                      <a href="#">{tag}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="blog-widget">
                <h4 className="blog-widget-title">follow us</h4>
                <ul className="blog-widget-social">
                  <li>
                    <a
                      href="#"
                      className="icofont-facebook"
                      title="Facebook"
                    ></a>
                  </li>
                  <li>
                    <a href="#" className="icofont-twitter" title="Twitter"></a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="icofont-instagram"
                      title="Instagram"
                    ></a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="icofont-youtube-play"
                      title="Youtube"
                    ></a>
                  </li>
                </ul>
              </div>

              <div className="blog-widget">
                <img src="/images/promo/blog/01.jpg" alt="promo" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
