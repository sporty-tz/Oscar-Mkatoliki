import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  loadBlogPost,
  loadBlogComments,
  submitBlogComment,
  type BlogPost,
  type BlogComment,
} from "../lib/supabase";
import "@/styles/blog-details.css";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [comments, setComments] = useState<BlogComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [commentName, setCommentName] = useState("");
  const [commentEmail, setCommentEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMsg, setSubmitMsg] = useState("");

  useEffect(() => {
    if (!slug) return;
    let mounted = true;
    setLoading(true);
    setPost(null);
    setComments([]);
    (async () => {
      const postData = await loadBlogPost(slug);
      if (!mounted) return;
      setPost(postData);
      if (postData) {
        const commentData = await loadBlogComments(postData.id);
        if (mounted) setComments(commentData);
      }
      setLoading(false);
    })();
    return () => {
      mounted = false;
    };
  }, [slug]);

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!post || !commentText.trim() || !commentName.trim()) return;
    setSubmitting(true);
    try {
      await submitBlogComment({
        post_id: post.id,
        author_name: commentName,
        author_email: commentEmail,
        comment: commentText,
      });
      setSubmitMsg(
        "Your comment has been submitted and is awaiting approval. Thank you!",
      );
      setCommentText("");
      setCommentName("");
      setCommentEmail("");
    } catch {
      setSubmitMsg("Failed to submit comment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading)
    return (
      <div style={{ padding: "80px 0", textAlign: "center" }}>Loading…</div>
    );
  if (!post)
    return (
      <div style={{ padding: "80px 0", textAlign: "center" }}>
        Post not found.
      </div>
    );

  const author = post.blog_authors;
  const tags = Array.isArray(post.tags) ? (post.tags as string[]) : [];

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
              <Link to="/blog">Blog</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              {post.title}
            </li>
          </ol>
        </div>
      </section>

      <section className="inner-section blog-details-part">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <article className="blog-details">
                {post.featured_image_url && (
                  <div className="blog-details-thumb">
                    <img src={post.featured_image_url} alt={post.title} />
                  </div>
                )}

                <div className="blog-details-content">
                  <ul className="blog-details-meta">
                    <li>
                      <i className="fas fa-calendar-alt" />
                      <span>{formatDate(post.published_at)}</span>
                    </li>
                    <li>
                      <i className="fas fa-user" />
                      <span>{author?.name ?? "Admin"}</span>
                    </li>
                    <li>
                      <i className="fas fa-comments" />
                      <span>{comments.length} comments</span>
                    </li>
                    <li>
                      <i className="fas fa-eye" />
                      <span>{post.view_count} views</span>
                    </li>
                  </ul>

                  <h2 className="blog-details-title">{post.title}</h2>

                  {post.excerpt && (
                    <p className="blog-details-excerpt">{post.excerpt}</p>
                  )}

                  {post.content && (
                    <div
                      className="blog-details-body"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  )}

                  <div className="blog-details-footer">
                    <div className="blog-details-share">
                      <h5>share :</h5>
                      <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-twitter" />
                      </a>
                      <a
                        href={`https://wa.me/?text=${encodeURIComponent(post.title + " " + window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fab fa-whatsapp" />
                      </a>
                    </div>
                    {tags.length > 0 && (
                      <div className="blog-details-tag">
                        <h5>tags :</h5>
                        {tags.map((tag) => (
                          <a key={tag} href="#">
                            {tag}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </article>

              {/* Author Card */}
              {author && (
                <div className="blog-details-profile">
                  <div
                    style={{
                      display: "flex",
                      gap: "24px",
                      alignItems: "flex-start",
                      textAlign: "left",
                    }}
                  >
                    <img
                      src={author.avatar_url || "/images/avatar/01.jpg"}
                      alt={author.name}
                      style={{
                        width: "90px",
                        height: "90px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                        border: "4px solid var(--chalk)",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h3
                        style={{
                          marginBottom: "4px",
                          fontSize: "18px",
                          textTransform: "capitalize",
                        }}
                      >
                        {author.name}
                      </h3>
                      {author.email && (
                        <p
                          style={{
                            color: "var(--primary)",
                            fontSize: "14px",
                            marginBottom: "12px",
                          }}
                        >
                          {author.email}
                        </p>
                      )}
                      <ul style={{ marginBottom: "14px" }}>
                        {author.social_links?.facebook && (
                          <li>
                            <a
                              href={author.social_links.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fab fa-facebook-f" />
                            </a>
                          </li>
                        )}
                        {author.social_links?.twitter && (
                          <li>
                            <a
                              href={author.social_links.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fab fa-twitter" />
                            </a>
                          </li>
                        )}
                        {author.social_links?.instagram && (
                          <li>
                            <a
                              href={author.social_links.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fab fa-instagram" />
                            </a>
                          </li>
                        )}
                        {author.social_links?.youtube && (
                          <li>
                            <a
                              href={author.social_links.youtube}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fab fa-youtube" />
                            </a>
                          </li>
                        )}
                      </ul>
                      {author.bio && (
                        <p style={{ fontSize: "15px", lineHeight: "1.7" }}>
                          {author.bio}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Back link */}
              <div className="blog-details-navigate">
                <div className="row">
                  <div className="col-md-6">
                    <Link to="/blog" className="navigate-prev">
                      <i className="fas fa-long-arrow-alt-left" />
                      <h6>Back to Blog</h6>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Comments */}
              <div className="blog-details-comment">
                <h4 className="blog-details-comment-title">
                  {comments.length} comment{comments.length !== 1 ? "s" : ""} on
                  this post
                </h4>
                <ul className="comment-list">
                  {comments.map((c) => (
                    <li key={c.id} className="comment-item">
                      <div className="comment-media">
                        <div
                          style={{
                            width: "48px",
                            height: "48px",
                            borderRadius: "50%",
                            background: "var(--primary)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "#fff",
                            fontWeight: 700,
                            fontSize: "18px",
                            flexShrink: 0,
                          }}
                        >
                          {(c.author_name ?? "A").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h6>{c.author_name ?? "Anonymous"}</h6>
                          <span>{formatDate(c.created_at)}</span>
                        </div>
                      </div>
                      <p className="comment-desc">{c.comment}</p>
                    </li>
                  ))}
                  {comments.length === 0 && (
                    <p
                      style={{
                        color: "#888",
                        fontStyle: "italic",
                        padding: "20px 0",
                      }}
                    >
                      No comments yet. Be the first to share your thoughts!
                    </p>
                  )}
                </ul>
              </div>

              {/* Comment Form */}
              <form
                className="blog-details-form"
                onSubmit={(e) => void handleCommentSubmit(e)}
              >
                <h4>Post a comment</h4>
                {submitMsg && (
                  <p
                    style={{
                      color: submitMsg.includes("Failed")
                        ? "#e53e3e"
                        : "#38a169",
                      background: submitMsg.includes("Failed")
                        ? "#fff5f5"
                        : "#f0fff4",
                      padding: "10px 14px",
                      borderRadius: "6px",
                      marginBottom: "16px",
                      fontSize: "14px",
                    }}
                  >
                    {submitMsg}
                  </p>
                )}
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea
                        className="form-control"
                        placeholder="Write your comment…"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Your name *"
                        value={commentName}
                        onChange={(e) => setCommentName(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        className="form-control"
                        type="email"
                        placeholder="Your email (optional)"
                        value={commentEmail}
                        onChange={(e) => setCommentEmail(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button
                      type="submit"
                      className="form-btn"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting…" : "submit comment"}
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
