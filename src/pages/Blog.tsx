import AppLayout from "../components/layout/AppLayout";

const posts = [
  {
    id: 1,
    category: "Devotional",
    title: "How the Rosary Transformed My Daily Commute in Dar es Salaam",
    excerpt:
      "When traffic on Bagamoyo Road became unbearable, one Catholic bus driver discovered that the mysteries of the rosary turned what was frustration into deep prayer.",
    author: "Sr. Agnes Mtoto",
    date: "25 Mar 2026",
    readTime: "5 min read",
    emoji: "📿",
    color: "#e8f3fb",
  },
  {
    id: 2,
    category: "Music",
    title: "Sacred Praise Vol. 2 — A Track-by-Track Journey",
    excerpt:
      "Oscar Mkatoliki walks us through the spiritual and creative inspiration behind every song on his latest album — from a midnight vision in Mwanza to a choir in Dodoma.",
    author: "Oscar Mkatoliki",
    date: "20 Mar 2026",
    readTime: "8 min read",
    emoji: "🎵",
    color: "#fdf4dc",
  },
  {
    id: 3,
    category: "Family Faith",
    title:
      "Raising Catholic Children in a Digital Age: A Tanzanian Parent's Guide",
    excerpt:
      "Three Catholic parents from Kinondoni, Arusha and Mwanza share practical, tested strategies for nurturing genuine faith in an age of smartphones and social media.",
    author: "Community Contributors",
    date: "15 Mar 2026",
    readTime: "6 min read",
    emoji: "👨‍👩‍👧",
    color: "#eafbea",
  },
  {
    id: 4,
    category: "Liturgy",
    title: "Understanding the Easter Triduum: A Beginner's Guide",
    excerpt:
      "Holy Thursday. Good Friday. Easter Vigil. What happens at each liturgy, why it matters, and how to participate fully — explained simply for every Catholic.",
    author: "Fr. Benedikt Mwamba",
    date: "10 Mar 2026",
    readTime: "7 min read",
    emoji: "🕯️",
    color: "#fff0f0",
  },
  {
    id: 5,
    category: "Saints",
    title:
      "Blessed Isidore Bakanja: Uganda's Lay Martyr Who Belongs to All of Africa",
    excerpt:
      "The story of the young Congolese layworker who refused to remove his scapular and died proclaiming forgiveness — and why his feast day should matter to every East African Catholic.",
    author: "David Kileo",
    date: "3 Mar 2026",
    readTime: "4 min read",
    emoji: "✝",
    color: "#f0f0ff",
  },
  {
    id: 6,
    category: "Products",
    title: "The Best Catholic Gifts for a First Communion in Tanzania",
    excerpt:
      "From personalised rosaries to illustrated children's Bibles, we have curated the most meaningful, age-appropriate gifts for this unforgettable sacrament.",
    author: "Editorial Team",
    date: "28 Feb 2026",
    readTime: "3 min read",
    emoji: "🎁",
    color: "#fdf4dc",
  },
];

const categories = [
  "All",
  "Devotional",
  "Music",
  "Family Faith",
  "Liturgy",
  "Saints",
  "Products",
];

export default function Blog() {
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
          {categories.map((c, i) => (
            <button
              key={c}
              style={{
                padding: "8px 20px",
                borderRadius: 24,
                border: i === 0 ? "none" : "1.5px solid #ddd",
                background: i === 0 ? "#1a1a2e" : "#fff",
                color: i === 0 ? "#D4AF37" : "#555",
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
              background: posts[0].color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 80,
              minHeight: 260,
            }}
          >
            {posts[0].emoji}
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
              Featured · {posts[0].category}
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
              {posts[0].title}
            </h2>
            <p
              style={{
                fontSize: 14,
                color: "#666",
                lineHeight: 1.7,
                margin: "0 0 20px",
              }}
            >
              {posts[0].excerpt}
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
                {posts[0].author}
              </span>
              <span style={{ fontSize: 12, color: "#ccc" }}>·</span>
              <span style={{ fontSize: 12, color: "#999" }}>
                {posts[0].date}
              </span>
              <span style={{ fontSize: 12, color: "#ccc" }}>·</span>
              <span style={{ fontSize: 12, color: "#C9A84C", fontWeight: 600 }}>
                {posts[0].readTime}
              </span>
            </div>
          </div>
        </div>

        {/* Post grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20,
          }}
          className="blog-grid"
        >
          {posts.slice(1).map((post) => (
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
                  background: post.color,
                  height: 130,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 52,
                }}
              >
                {post.emoji}
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
                  {post.category}
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
                    {post.date}
                  </span>
                  <span style={{ color: "#ddd" }}>·</span>
                  <span
                    style={{ fontSize: 11, color: "#C9A84C", fontWeight: 600 }}
                  >
                    {post.readTime}
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
