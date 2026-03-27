import { Link } from "react-router-dom";
import "@/styles/blog-details.css";

export default function BlogDetails() {
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
          <h2>blog details</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/blog-grid">Blog</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              blog details
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section blog-details-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <article className="blog-details">
                <div className="blog-details-thumb">
                  <img src="/images/blog/01.jpg" alt="blog" />
                </div>

                <div className="blog-details-content">
                  <ul className="blog-details-meta">
                    <li>
                      <i className="fas fa-calendar-alt" />
                      <span>25 Jun, 2024</span>
                    </li>
                    <li>
                      <i className="fas fa-user" />
                      <span>Admin</span>
                    </li>
                    <li>
                      <i className="fas fa-comments" />
                      <span>8 comments</span>
                    </li>
                    <li>
                      <i className="fas fa-share-alt" />
                      <span>12 share</span>
                    </li>
                  </ul>
                  <h2 className="blog-details-title">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit
                    tempor incididunt
                  </h2>
                  <p className="blog-details-desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Amet reiciendis beatae consequis mollitia provident, nisi
                    eum voluptate. Necessitatibus assumenda quisquam consequatur
                    dolor voluptatem labore rerum fugiat.
                  </p>
                  <p className="blog-details-desc">
                    Inventore amet similique illo nesciunt distinctio error nisi
                    at perspiciatis ab enim quam earum repellendus hic officiis
                    ad aspernatur.
                  </p>

                  <blockquote className="blog-details-quote">
                    <p>
                      Inventore amet similique illo nesciunt distinctio error
                      nisi at perspiciatis ab enim quam earum repellendus hic
                      officiis.
                    </p>
                    <footer>— Oscar Mkatoliki</footer>
                  </blockquote>

                  <div className="blog-details-grid">
                    <div className="row">
                      <div className="col-md-6">
                        <img src="/images/blog/02.jpg" alt="blog" />
                      </div>
                      <div className="col-md-6">
                        <p>
                          Lorem ipsum dolor sit amet consectetur adipisicing
                          elit. Amet reiciendis beatae consequis mollitia
                          provident, nisi eum voluptate labore rerum fugiat
                          tempor.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="blog-details-subtitle">
                    Why choose organic products?
                  </h3>
                  <p className="blog-details-desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Amet reiciendis beatae consequis repellendus hic officiis ad
                    aspernatur.
                  </p>

                  <h3 className="blog-details-subtitle">
                    Benefits of healthy eating
                  </h3>
                  <p className="blog-details-desc">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Inventore amet similique illo nesciunt distinctio error nisi
                    at perspiciatis ab enim earum repellendus.
                  </p>

                  <ul className="blog-details-list">
                    <li>Fresh organic vegetables from local farms</li>
                    <li>Natural ingredients without preservatives</li>
                    <li>Sustainable farming practices</li>
                  </ul>

                  <div className="blog-details-footer">
                    <div className="blog-details-share">
                      <h5>share :</h5>
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                      <a href="#">
                        <i className="fab fa-instagram" />
                      </a>
                    </div>
                    <div className="blog-details-tag">
                      <h5>tags :</h5>
                      <a href="#">organic</a>
                      <a href="#">grocery</a>
                      <a href="#">health</a>
                    </div>
                  </div>
                </div>
              </article>

              {/* Author Profile */}
              <div className="blog-details-profile">
                <div className="row">
                  <div className="col-md-2">
                    <img src="/images/avatar/01.jpg" alt="author" />
                  </div>
                  <div className="col-md-10">
                    <h4>Admin</h4>
                    <p>admin@oscarmkatoliki.com</p>
                    <ul>
                      <li>
                        <a href="#">
                          <i className="fab fa-facebook-f" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-twitter" />
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="fab fa-linkedin-in" />
                        </a>
                      </li>
                    </ul>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Amet repellendus hic officiis.
                    </p>
                  </div>
                </div>
              </div>

              {/* Post Navigation */}
              <div className="blog-details-navigate">
                <div className="row">
                  <div className="col-md-6">
                    <Link to="/blog-details" className="navigate-prev">
                      <i className="fas fa-long-arrow-alt-left" />
                      <h6>Previous Post</h6>
                    </Link>
                  </div>
                  <div className="col-md-6">
                    <Link to="/blog-details" className="navigate-next">
                      <h6>Next Post</h6>
                      <i className="fas fa-long-arrow-alt-right" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="blog-details-comment">
                <h4 className="blog-details-comment-title">
                  3 comments on this post
                </h4>
                <ul className="comment-list">
                  <li className="comment-item">
                    <div className="comment-media">
                      <img src="/images/avatar/02.jpg" alt="avatar" />
                      <div>
                        <h6>John Doe</h6>
                        <span>25 Jun, 2024</span>
                      </div>
                    </div>
                    <p className="comment-desc">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Amet reiciendis.
                    </p>
                    <button className="comment-reply">reply</button>
                  </li>
                  <li className="comment-item">
                    <div className="comment-media">
                      <img src="/images/avatar/03.jpg" alt="avatar" />
                      <div>
                        <h6>Jane Smith</h6>
                        <span>26 Jun, 2024</span>
                      </div>
                    </div>
                    <p className="comment-desc">
                      Inventore amet similique illo nesciunt distinctio error
                      nisi at perspiciatis.
                    </p>
                    <button className="comment-reply">reply</button>
                  </li>
                </ul>
              </div>

              {/* Comment Form */}
              <form className="blog-details-form">
                <h4>Post a comment</h4>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Write your comment..."
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Your name"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Your email"
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button type="submit" className="form-btn">
                      submit comment
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
