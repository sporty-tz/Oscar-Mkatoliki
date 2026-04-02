import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import { useBlogPosts } from "../lib/hooks";

const CATEGORY_EMOJI: Record<string, string> = {
  Devotional: "📿",
  Music: "🎵",
  "Family Faith": "👨‍👩‍👧",
  Liturgy: "🕯️",
  Saints: "✝",
  Products: "🎁",
};

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export default function Blog() {
  const { posts, loading } = useBlogPosts();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(
      new Set(posts.map((p) => p.blog_categories?.name ?? "")),
    ).filter(Boolean),
  ];

  const filtered =
    activeCategory === "All"
      ? posts
      : posts.filter((p) => p.blog_categories?.name === activeCategory);

  const featured = filtered[0] ?? null;

  return (
    <AppLayout>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #2c2c60 100%)",
          padding: "72px 24px 60px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            color: "#D4AF37",
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: "2px",
            textTransform: "uppercase",
            margin: "0 0 12px",
          }}
        >
          Insights & Inspiration
        </p>
        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 40,
            margin: "0 0 14px",
          }}
        >
          The Oscar Mkatoliki Blog
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.65)",
            fontSize: 15,
            maxWidth: 520,
            margin: "0 auto",
          }}
        >
          Devotional reflections, music stories, faith resources and news from
          the Catholic community in Tanzania.
        </p>
      </div>

      <div
        style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 24px 80px" }}
      >
        {/* Category filter */}
        <div
          style={{
            display: "flex",
            overflowX: "auto",
            gap: 10,
            marginBottom: 40,
            paddingBottom: 4,
          }}
        >
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              style={{
                padding: "8px 20px",
                borderRadius: 24,
                border: c === activeCategory ? "none" : "1.5px solid #ddd",
                background: c === activeCategory ? "#1a1a2e" : "#fff",
                color: c === activeCategory ? "#D4AF37" : "#555",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
              }}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Featured post */}
        {loading ? (
          <div
            style={{
              background: "#f5f5f5",
              borderRadius: 20,
              height: 260,
              marginBottom: 32,
            }}
          />
        ) : featured ? (
          <div
            style={{
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #ebebeb",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              overflow: "hidden",
              marginBottom: 32,
              display: "grid",
              gridTemplateColumns: "1.4fr 1fr",
              cursor: "pointer",
            }}
            className="blog-featured"
          >
            <div
              style={{
                background: featured.blog_categories?.color ?? "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 80,
                minHeight: 260,
              }}
            >
              {CATEGORY_EMOJI[featured.blog_categories?.name ?? ""] ?? "✝"}
            </div>
            <div style={{ padding: "36px 36px" }}>
              <span
                style={{
                  display: "inline-block",
                  background: "#fdf4dc",
                  color: "#C9A84C",
                  fontSize: 11,
                  fontWeight: 700,
                  padding: "4px 12px",
                  borderRadius: 20,
                  letterSpacing: "0.8px",
                  textTransform: "uppercase",
                  marginBottom: 14,
                }}
              >
                Featured · {featured.blog_categories?.name ?? ""}
              </span>
              <h2
                style={{
                  fontSize: 20,
                  fontWeight: 900,
                  color: "#1a1a2e",
                  margin: "0 0 12px",
                  lineHeight: 1.35,
                }}
              >
                {featured.title}
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: "#666",
                  lineHeight: 1.7,
                  margin: "0 0 20px",
                }}
              >
                {featured.excerpt}
              </p>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  flexWrap: "wrap",
                }}
              >
                <span style={{ fontSize: 12, color: "#999" }}>
                  {featured.blog_authors?.name ?? ""}
                </span>
                <span style={{ fontSize: 12, color: "#ccc" }}>·</span>
                <span style={{ fontSize: 12, color: "#999" }}>
                  {formatDate(featured.published_at)}
                </span>
                <span style={{ fontSize: 12, color: "#ccc" }}>·</span>
                <span
                  style={{ fontSize: 12, color: "#C9A84C", fontWeight: 600 }}
                >
                  {featured.read_time_mins} min read
                </span>
              </div>
            </div>
          </div>
        ) : null}

        {/* Post grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
          className="blog-grid"
        >
          {filtered.slice(1).map((post) => (
            <article
              key={post.id}
              style={{
                background: "#fff",
                borderRadius: 16,
                border: "1px solid #ebebeb",
                overflow: "hidden",
                cursor: "pointer",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                transition: "box-shadow 0.2s, transform 0.15s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 28px rgba(0,0,0,0.10)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 2px 8px rgba(0,0,0,0.04)";
                (e.currentTarget as HTMLElement).style.transform = "";
              }}
            >
              <div
                style={{
                  background: post.blog_categories?.color ?? "#f5f5f5",
                  height: 130,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 52,
                }}
              >
                {CATEGORY_EMOJI[post.blog_categories?.name ?? ""] ?? "✝"}
              </div>
              <div style={{ padding: "18px 20px 22px" }}>
                <span
                  style={{
                    display: "inline-block",
                    background: "#f8f8f8",
                    color: "#888",
                    fontSize: 10,
                    fontWeight: 700,
                    padding: "3px 10px",
                    borderRadius: 20,
                    letterSpacing: "0.7px",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  }}
                >
                  {post.blog_categories?.name ?? ""}
                </span>
                <h3
                  style={{
                    fontSize: 14.5,
                    fontWeight: 800,
                    color: "#1a1a2e",
                    margin: "0 0 8px",
                    lineHeight: 1.4,
                  }}
                >
                  {post.title}
                </h3>
                <p
                  style={{
                    fontSize: 13,
                    color: "#888",
                    lineHeight: 1.65,
                    margin: "0 0 14px",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {post.excerpt}
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    flexWrap: "wrap",
                  }}
                >
                  <span style={{ fontSize: 11, color: "#bbb" }}>
                    {formatDate(post.published_at)}
                  </span>
                  <span style={{ color: "#ddd" }}>·</span>
                  <span
                    style={{ fontSize: 11, color: "#C9A84C", fontWeight: 600 }}
                  >
                    {post.read_time_mins} min read
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load more */}
        <div style={{ textAlign: "center", marginTop: 48 }}>
          <button
            style={{
              background: "#1a1a2e",
              color: "#D4AF37",
              border: "none",
              borderRadius: 12,
              padding: "13px 40px",
              fontWeight: 800,
              fontSize: 14,
              cursor: "pointer",
            }}
          >
            Load More Articles
          </button>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .blog-featured { grid-template-columns: 1fr !important; }
            .blog-grid { grid-template-columns: repeat(2, 1fr) !important; }
          }
          @media (max-width: 540px) {
            .blog-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </AppLayout>
  );
}
