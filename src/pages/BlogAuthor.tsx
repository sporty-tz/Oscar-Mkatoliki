import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  loadBlogAuthor,
  loadBlogPostsByAuthor,
  loadBlogPosts,
  loadBlogCategories,
  type BlogAuthor,
  type BlogPost,
  type BlogCategory,
} from "../lib/supabase";
import "@/styles/blog-author.css";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function BlogAuthor() {
  const { id } = useParams<{ id: string }>();
  const [author, setAuthor] = useState<BlogAuthor | null>(null);
  const [authorPosts, setAuthorPosts] = useState<BlogPost[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    (async () => {
      const [authorData, postData, recentData, catData] = await Promise.all([
        loadBlogAuthor(id),
        loadBlogPostsByAuthor(id),
        loadBlogPosts(5),
        loadBlogCategories(),
      ]);
      if (!mounted) return;
      setAuthor(authorData);
      setAuthorPosts(postData);
      setRecentPosts(recentData);
      setCategories(catData);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [id]);

  const popularTags = useMemo(
    () =>
      [...new Set(recentPosts.flatMap((p) => p.tags as string[]))].slice(0, 10),
    [recentPosts],
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
          <h2>blog author</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to="/blog">Blog</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              blog author
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section blog-grid">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              {loading && <p style={{ padding: "40px 0" }}>Loading author…</p>}
              {!loading && !author && (
                <p style={{ padding: "40px 0" }}>Author not found.</p>
              )}
              {!loading && author && (
                <>
                  {/* Author Profile */}
                  <div className="author-single">
                    <div className="author-content">
                      <div className="author-image">
                        <img
                          src={author.avatar_url || "/images/avatar/01.jpg"}
                          alt={author.name}
                        />
                      </div>
                      <div className="author-info">
                        <h3 className="author-name">{author.name}</h3>
                        {author.email && (
                          <h6 className="author-mail">{author.email}</h6>
                        )}
                        <ul className="author-social">
                          {author.social_links?.facebook && (
                            <li>
                              <a href={author.social_links.facebook}>
                                <i className="fab fa-facebook-f" />
                              </a>
                            </li>
                          )}
                          {author.social_links?.twitter && (
                            <li>
                              <a href={author.social_links.twitter}>
                                <i className="fab fa-twitter" />
                              </a>
                            </li>
                          )}
                          {author.social_links?.instagram && (
                            <li>
                              <a href={author.social_links.instagram}>
                                <i className="fab fa-instagram" />
                              </a>
                            </li>
                          )}
                          {author.social_links?.youtube && (
                            <li>
                              <a href={author.social_links.youtube}>
                                <i className="fab fa-youtube" />
                              </a>
                            </li>
                          )}
                        </ul>
                      </div>
                    </div>
                    {author.bio && <p className="author-bio">{author.bio}</p>}
                    <ul className="author-meta">
                      <li>
                        <i className="fas fa-newspaper" />
                        <span>
                          Total Blog <b>{authorPosts.length}</b>
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="top-filter">
                    <div className="filter-short">
                      <label className="filter-label">Sort by :</label>
                      <select className="form-select filter-select">
                        <option value="default">default</option>
                        <option value="recent">recent</option>
                      </select>
                    </div>
                  </div>

                  <div className="row">
                    {authorPosts.map((post) => (
                      <div key={post.id} className="col-md-6 col-lg-6">
                        <div className="blog-card">
                          <div className="blog-media">
                            <div className="blog-img">
                              <Link to={`/blog/${post.slug}`}>
                                <img
                                  src={
                                    post.featured_image_url ||
                                    "/images/blog/01.jpg"
                                  }
                                  alt={post.title}
                                />
                              </Link>
                            </div>
                          </div>
                          <div className="blog-content">
                            <ul className="blog-meta">
                              <li>
                                <i className="fas fa-user" />
                                <span>{author.name}</span>
                              </li>
                              <li>
                                <i className="fas fa-calendar-alt" />
                                <span>{formatDate(post.published_at)}</span>
                              </li>
                            </ul>
                            <h4 className="blog-title">
                              <Link to={`/blog/${post.slug}`}>
                                {post.title}
                              </Link>
                            </h4>
                            <p className="blog-desc">{post.excerpt}</p>
                            <Link
                              to={`/blog/${post.slug}`}
                              className="blog-btn"
                            >
                              <span>read more</span>
                              <i className="icofont-arrow-right" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                    {authorPosts.length === 0 && (
                      <p>No posts by this author yet.</p>
                    )}
                  </div>

                  <div className="bottom-paginate">
                    <p className="page-info">
                      Showing {authorPosts.length} posts
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Sidebar */}
            <div className="col-md-7 col-lg-4">
              <div className="blog-widget">
                <h4 className="blog-widget-title">Find blogs</h4>
                <form
                  className="blog-widget-form"
                  onSubmit={(e) => e.preventDefault()}
                >
                  <input type="text" placeholder="Search blogs..." />
                  <button type="submit">
                    <i className="fas fa-search" />
                  </button>
                </form>
              </div>

              <div className="blog-widget">
                <h4 className="blog-widget-title">popular feeds</h4>
                <ul className="blog-widget-feed">
                  {recentPosts.map((post) => (
                    <li key={post.id}>
                      <Link to={`/blog/${post.slug}`}>
                        <img
                          src={post.featured_image_url || "/images/blog/01.jpg"}
                          alt={post.title}
                        />
                        <div>
                          <h6>{post.title}</h6>
                          <span>{formatDate(post.published_at)}</span>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="blog-widget">
                <h4 className="blog-widget-title">top categories</h4>
                <ul className="blog-widget-category">
                  {categories.map((cat) => (
                    <li key={cat.id}>
                      <a href="#">{cat.name}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="blog-widget">
                <h4 className="blog-widget-title">popular tags</h4>
                <ul className="blog-widget-tag">
                  {popularTags.map((tag) => (
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
