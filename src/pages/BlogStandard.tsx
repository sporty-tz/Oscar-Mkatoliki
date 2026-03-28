import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  loadBlogPosts,
  loadBlogCategories,
  type BlogPost,
  type BlogCategory,
} from "../lib/supabase";
import "@/styles/blog-standard.css";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function BlogStandard() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [categories, setCategories] = useState<BlogCategory[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [postRows, catRows] = await Promise.all([
        loadBlogPosts(20),
        loadBlogCategories(),
      ]);
      if (!mounted) return;
      setPosts(postRows);
      setCategories(catRows);
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const recentPosts = useMemo(() => posts.slice(0, 5), [posts]);
  const popularTags = useMemo(
    () => [...new Set(posts.flatMap((p) => p.tags as string[]))].slice(0, 10),
    [posts],
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
          <h2>blog standard</h2>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              blog standard
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section blog-standard">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="top-filter">
                <div className="filter-show">
                  <label className="filter-label">Show :</label>
                  <select className="form-select filter-select">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
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
                  <Link to="/blog" title="Grid View">
                    <i className="fas fa-th" />
                  </Link>
                  <Link
                    to="/blog/standard"
                    className="active"
                    title="List View"
                  >
                    <i className="fas fa-th-list" />
                  </Link>
                </div>
              </div>

              {loading && <p>Loading posts…</p>}

              <div className="row">
                {posts.map((post) => (
                  <div key={post.id} className="col-lg-12">
                    <div className="blog-card">
                      <div className="blog-media">
                        <div className="blog-img">
                          <Link to={`/blog/${post.slug}`}>
                            <img
                              src={
                                post.featured_image_url || "/images/blog/01.jpg"
                              }
                              alt={post.title}
                            />
                          </Link>
                        </div>
                      </div>
                      <div className="blog-content">
                        <ul className="blog-meta">
                          <li>
                            <i className="fas fa-calendar-alt" />
                            <span>{formatDate(post.published_at)}</span>
                          </li>
                          <li>
                            <i className="fas fa-user" />
                            <span>{post.blog_authors?.name ?? "Admin"}</span>
                          </li>
                          <li>
                            <i className="fas fa-eye" />
                            <span>{post.view_count} views</span>
                          </li>
                        </ul>
                        <h4 className="blog-title">
                          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                        </h4>
                        <p className="blog-desc">{post.excerpt}</p>
                        <Link to={`/blog/${post.slug}`} className="blog-btn">
                          <span>read more</span>
                          <i className="icofont-arrow-right" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
                {!loading && posts.length === 0 && (
                  <p>No posts available yet.</p>
                )}
              </div>

              <div className="bottom-paginate">
                <p className="page-info">Showing {posts.length} posts</p>
                <ul className="pagination">
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
            <div className="col-sm-10 col-md-7 col-lg-4">
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
