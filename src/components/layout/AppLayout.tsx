import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { type Product } from "../../lib/products";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useFeaturedProducts } from "../../lib/hooks";

// ─── Announcement Bar ─────────────────────────────────────────────────────────
function AnnouncementBar() {
  const [idx, setIdx] = useState(0);
  const promos = [
    "🎵  New Album Out Now — Oscar Mkatoliki: Sacred Praise Vol. 2",
    "✝  Easter Collection Is Live! Shop Blessed Items & Gifts",
    "📖  30% off all Bibles & Devotionals — this week only",
    "🎁  Free Shipping on all orders above TZS 50,000",
  ];
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % promos.length), 3800);
    return () => clearInterval(t);
  }, []);
  const utilLinks = [
    {
      label: "Get App",
      svg: (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12" y2="18" strokeWidth="3" />
        </svg>
      ),
    },
    {
      label: "Find Parish",
      svg: (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 2L12 6M12 2L8 5M12 2L16 5" />
          <rect x="4" y="6" width="16" height="14" rx="1" />
          <path d="M9 20V14h6v6" />
        </svg>
      ),
    },
    {
      label: "Gift Cards",
      svg: (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="3" y="8" width="18" height="13" rx="2" />
          <path d="M19 8V6a2 2 0 00-2-2H7a2 2 0 00-2 2v2" />
          <line x1="12" y1="8" x2="12" y2="21" />
          <path d="M12 8c0-2 1.5-4 3-4s2 2 0 4" />
          <path d="M12 8c0-2-1.5-4-3-4s-2 2 0 4" />
        </svg>
      ),
    },
    {
      label: "Help",
      svg: (
        <svg
          width="13"
          height="13"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12" y2="17" strokeWidth="3" />
        </svg>
      ),
    },
  ];
  return (
    <div style={{ background: "#fdf4dc", borderBottom: "1px solid #eedfa8" }}>
      <div
        className="ann-bar"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 28px",
          height: 42,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <p
          style={{
            fontSize: 13,
            color: "#1a1a2e",
            fontWeight: 600,
            margin: 0,
            letterSpacing: "0.15px",
          }}
        >
          {promos[idx]}
        </p>
        <div
          className="ann-util"
          style={{ display: "flex", alignItems: "center", flexShrink: 0 }}
        >
          {utilLinks.map((link, i) => {
            const path =
              link.label === "Get App"
                ? "/get-app"
                : link.label === "Find Parish"
                  ? "/find-parish"
                  : link.label === "Gift Cards"
                    ? "/gift-cards"
                    : "/help";
            return (
              <React.Fragment key={link.label}>
                {i > 0 && (
                  <span
                    style={{
                      color: "#d4c49a",
                      padding: "0 2px",
                      fontSize: 11,
                      userSelect: "none",
                    }}
                  >
                    |
                  </span>
                )}
                <a
                  href={path}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    padding: "0 9px",
                    fontSize: 12,
                    color: "#5a4a2a",
                    textDecoration: "none",
                    fontWeight: 500,
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#C9A84C")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#5a4a2a")
                  }
                >
                  {link.svg}
                  {link.label}
                </a>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Header ───────────────────────────────────────────────────────────────────
function getInitials(email?: string, meta?: Record<string, unknown>): string {
  const name = (meta?.full_name as string) || (meta?.name as string) || "";
  if (name)
    return name
      .split(" ")
      .slice(0, 2)
      .map((w) => w[0])
      .join("")
      .toUpperCase();
  return (email?.[0] ?? "U").toUpperCase();
}

function Header({
  cartCount,
  onCartClick,
}: {
  cartCount: number;
  onCartClick: () => void;
}) {
  const [query, setQuery] = useState("");
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { products } = useFeaturedProducts();

  useEffect(() => {
    function handleOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // ── Nav dropdown types & data ──────────────────────────────────────────────
  type DropItem = { label: string; href: string; desc?: string };
  type NavCol = { title: string; items: DropItem[] };
  type NavEntry = {
    label: string;
    href: string;
    columns?: NavCol[];
    items?: DropItem[];
  };

  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideSearch(e: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleOutsideSearch);
    return () => document.removeEventListener("mousedown", handleOutsideSearch);
  }, []);

  const searchResults =
    query.trim().length > 0
      ? products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase()),
          )
          .slice(0, 6)
      : [];

  const mainNav: NavEntry[] = [
    {
      label: "Categories",
      href: "#categories",
      columns: [
        {
          title: "Music & Faith",
          items: [
            { label: "Music & Audio", href: "#music" },
            { label: "Albums", href: "#albums" },
            { label: "Devotionals", href: "#devotionals" },
          ],
        },
        {
          title: "Books & Learning",
          items: [
            { label: "Books & Bibles", href: "#books" },
            { label: "Children's Books", href: "#children" },
            { label: "Sacramentals", href: "#sacramentals" },
          ],
        },
        {
          title: "Sacred Items",
          items: [
            { label: "Statues", href: "#statues" },
            { label: "Candles", href: "#candles" },
            { label: "Rosaries", href: "#rosaries" },
            { label: "Jewelry", href: "#jewelry" },
            { label: "Apparel", href: "#apparel" },
          ],
        },
      ],
    },
    {
      label: "Albums",
      href: "#albums",
      items: [
        { label: "All Albums", href: "#albums", desc: "Complete discography" },
        {
          label: "Praise Vol. 1",
          href: "#albums",
          desc: "12-track debut worship album",
        },
        {
          label: "Sacred Praise Vol. 2",
          href: "#albums",
          desc: "New release · Easter 2025",
        },
        {
          label: "Christmas Devotionals",
          href: "#albums",
          desc: "Seasonal faith collection",
        },
        {
          label: "Worship in Swahili",
          href: "#albums",
          desc: "Kiswahili praise & worship",
        },
      ],
    },
    {
      label: "Collections",
      href: "#collections",
      items: [
        { label: "New Arrivals", href: "#", desc: "Just landed this week" },
        {
          label: "Easter Collection",
          href: "#",
          desc: "Seasonal blessed items & gifts",
        },
        {
          label: "Lent Collection",
          href: "#",
          desc: "Prayer, fasting & reflection",
        },
        {
          label: "Christmas Collection",
          href: "#",
          desc: "Sacred gifts for the season",
        },
        {
          label: "Gift Bundles",
          href: "#",
          desc: "Curated sets for every occasion",
        },
      ],
    },
    {
      label: "Devotionals",
      href: "#devotionals",
      items: [
        {
          label: "Daily Devotionals",
          href: "#devotionals",
          desc: "Start each day with God",
        },
        {
          label: "Prayer Books",
          href: "#devotionals",
          desc: "Guided prayer collections",
        },
        {
          label: "Rosary Guides",
          href: "#devotionals",
          desc: "Mysteries & meditations",
        },
        {
          label: "Meditation Series",
          href: "#devotionals",
          desc: "Quiet time with scripture",
        },
        {
          label: "RCIA Resources",
          href: "#devotionals",
          desc: "Journey of faith materials",
        },
      ],
    },
    {
      label: "Gifts",
      href: "#gifts",
      items: [
        {
          label: "Gift Sets",
          href: "#gifts",
          desc: "Curated faith gift collections",
        },
        {
          label: "Gift Cards",
          href: "/gift-cards",
          desc: "Give the gift of faith",
        },
        {
          label: "Sacrament Gifts",
          href: "#gifts",
          desc: "Baptism, communion & confirmation",
        },
        {
          label: "Wedding & Anniversary",
          href: "#gifts",
          desc: "Sacred celebration gifts",
        },
        {
          label: "Birthday Gifts",
          href: "#gifts",
          desc: "Blessed birthday surprises",
        },
      ],
    },
  ];

  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #ececec",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 1px 6px rgba(0,0,0,0.07)",
      }}
    >
      <div
        className="main-header-inner"
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          height: 70,
        }}
      >
        <a
          href="/"
          className="header-logo"
          style={{
            display: "flex",
            alignItems: "center",
            flexShrink: 0,
            textDecoration: "none",
            marginRight: 28,
            overflow: "visible",
          }}
        >
          <img
            src="https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Logo/Logo.png"
            alt="Oscar Mkatoliki"
            style={{ height: 80, objectFit: "contain", display: "block" }}
          />
        </a>
        <nav
          className="header-main-nav"
          style={{
            display: "flex",
            alignItems: "stretch",
            flexShrink: 0,
            position: "relative",
            zIndex: 110,
          }}
        >
          {mainNav.map((nav) => (
            <div
              key={nav.label}
              style={{ position: "relative" }}
              onMouseEnter={() => setHoveredNav(nav.label)}
              onMouseLeave={() => setHoveredNav(null)}
            >
              <a
                href={nav.href}
                style={{
                  padding: "0 14px",
                  fontSize: 14,
                  fontWeight: 500,
                  color: hoveredNav === nav.label ? "#C9A84C" : "#333",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "center",
                  gap: 4,
                  height: 70,
                  borderBottom: `2.5px solid ${hoveredNav === nav.label ? "#C9A84C" : "transparent"}`,
                  whiteSpace: "nowrap",
                  transition: "color 0.15s, border-color 0.15s",
                  boxSizing: "border-box",
                }}
              >
                {nav.label}
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transition: "transform 0.2s",
                    transform:
                      hoveredNav === nav.label ? "rotate(180deg)" : "none",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </a>

              {/* ── Dropdown panel ── */}
              {hoveredNav === nav.label && (
                <div
                  className="nav-dropdown"
                  style={{
                    position: "absolute",
                    top: "calc(100% + 1px)",
                    left: nav.columns ? "50%" : 0,
                    transform: nav.columns ? "translateX(-50%)" : "none",
                    background: "#fff",
                    border: "1px solid #ebebeb",
                    borderRadius: 14,
                    boxShadow: "0 16px 48px rgba(0,0,0,0.13)",
                    zIndex: 300,
                    minWidth: nav.columns ? 560 : 260,
                    overflow: "hidden",
                  }}
                >
                  {nav.columns ? (
                    /* ── Mega menu (Categories) ── */
                    <>
                      <div
                        style={{ display: "flex", padding: "20px 8px 12px" }}
                      >
                        {nav.columns.map((col) => (
                          <div
                            key={col.title}
                            style={{
                              flex: 1,
                              padding: "0 16px",
                              borderRight: "1px solid #f5f5f5",
                            }}
                          >
                            <p
                              style={{
                                fontSize: 10.5,
                                fontWeight: 800,
                                color: "#C9A84C",
                                letterSpacing: "1px",
                                textTransform: "uppercase",
                                margin: "0 0 12px",
                              }}
                            >
                              {col.title}
                            </p>
                            {col.items.map((item) => (
                              <a
                                key={item.label}
                                href={item.href}
                                style={{
                                  display: "block",
                                  padding: "7px 8px",
                                  borderRadius: 7,
                                  fontSize: 13.5,
                                  fontWeight: 500,
                                  color: "#333",
                                  textDecoration: "none",
                                  transition: "background 0.12s, color 0.12s",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "#fdf8ee";
                                  e.currentTarget.style.color = "#C9A84C";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "";
                                  e.currentTarget.style.color = "#333";
                                }}
                              >
                                {item.label}
                              </a>
                            ))}
                          </div>
                        ))}
                      </div>
                      <div
                        style={{
                          borderTop: "1px solid #f5f5f5",
                          padding: "12px 24px",
                          background: "#fafafa",
                        }}
                      >
                        <a
                          href="#categories"
                          style={{
                            fontSize: 13,
                            fontWeight: 700,
                            color: "#C9A84C",
                            textDecoration: "none",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.textDecoration = "underline")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.textDecoration = "none")
                          }
                        >
                          View All Categories →
                        </a>
                      </div>
                    </>
                  ) : (
                    /* ── Standard dropdown ── */
                    <div style={{ padding: "6px 0" }}>
                      {nav.items?.map((item, idx) => (
                        <a
                          key={item.label}
                          href={item.href}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "10px 20px",
                            textDecoration: "none",
                            borderBottom:
                              idx < (nav.items?.length ?? 0) - 1
                                ? "1px solid #f8f8f8"
                                : "none",
                            transition: "background 0.12s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background = "#fdf8ee")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background = "")
                          }
                        >
                          <span
                            style={{
                              fontSize: 13.5,
                              fontWeight: 600,
                              color: "#1a1a2e",
                            }}
                          >
                            {item.label}
                          </span>
                          {item.desc && (
                            <span
                              style={{
                                fontSize: 11.5,
                                color: "#aaa",
                                marginTop: 2,
                              }}
                            >
                              {item.desc}
                            </span>
                          )}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}

          {/* ── Donations link ── */}
          <a
            href="/donations"
            style={{
              padding: "0 14px",
              fontSize: 14,
              fontWeight: 700,
              color: "#D4AF37",
              textDecoration: "none",
              display: "flex",
              alignItems: "center",
              gap: 5,
              height: 70,
              borderBottom: "2.5px solid transparent",
              whiteSpace: "nowrap",
              transition: "color 0.15s",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#C9A84C")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#D4AF37")}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="none"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            Donate
          </a>
        </nav>
        <div className="header-spacer" style={{ flex: 1 }} />
        <div
          ref={searchRef}
          className="header-search"
          style={{
            position: "relative",
            width: 360,
            flexShrink: 0,
            zIndex: 120,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: 14,
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
              display: "flex",
              alignItems: "center",
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#aaa"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </span>
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSearchOpen(true);
            }}
            onFocus={(e) => {
              setSearchOpen(true);
              e.target.style.borderColor = "#C9A84C";
              e.target.style.background = "#fff";
            }}
            onBlur={(e) => {
              e.target.style.borderColor = "#ddd";
              e.target.style.background = "#fafafa";
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && query.trim()) {
                navigate(`/search?q=${encodeURIComponent(query.trim())}`);
                setSearchOpen(false);
              }
              if (e.key === "Escape") setSearchOpen(false);
            }}
            placeholder="Search for music, books, rosaries…"
            style={{
              width: "100%",
              padding: "10px 16px 10px 38px",
              border: "1.5px solid #ddd",
              borderRadius: 24,
              fontSize: 14,
              outline: "none",
              background: "#fafafa",
              color: "#333",
              boxSizing: "border-box",
              transition: "border-color 0.15s",
            }}
          />

          {/* ── Live search results dropdown ── */}
          {searchOpen && query.trim().length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 8px)",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid #ebebeb",
                borderRadius: 14,
                boxShadow: "0 16px 48px rgba(0,0,0,0.13)",
                zIndex: 400,
                overflow: "hidden",
              }}
            >
              {searchResults.length > 0 ? (
                <>
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => {
                        navigate(`/product/${product.id}`);
                        setSearchOpen(false);
                        setQuery("");
                      }}
                      style={{
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        padding: "10px 16px",
                        background: "none",
                        border: "none",
                        borderBottom: "1px solid #f5f5f5",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 0.1s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#fdf8ee")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "")
                      }
                    >
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: 8,
                          background: product.gradient,
                          flexShrink: 0,
                        }}
                      />
                      <div
                        style={{
                          flex: 1,
                          overflow: "hidden",
                          textAlign: "left",
                        }}
                      >
                        <p
                          style={{
                            margin: 0,
                            fontSize: 13.5,
                            fontWeight: 600,
                            color: "#1a1a2e",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {product.name}
                        </p>
                        <p style={{ margin: 0, fontSize: 12, color: "#999" }}>
                          {product.category} · TZS{" "}
                          {product.price.toLocaleString()}
                        </p>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => {
                      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
                      setSearchOpen(false);
                    }}
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "#fafafa",
                      border: "none",
                      borderTop: "1px solid #f0f0f0",
                      cursor: "pointer",
                      textAlign: "left",
                      fontSize: 13,
                      fontWeight: 700,
                      color: "#C9A84C",
                      display: "flex",
                      alignItems: "center",
                      gap: 7,
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#fdf8ee")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "#fafafa")
                    }
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    See all results for &ldquo;{query}&rdquo;
                  </button>
                </>
              ) : (
                <div
                  style={{
                    padding: "20px 16px",
                    textAlign: "center",
                    color: "#aaa",
                    fontSize: 13.5,
                  }}
                >
                  No products found for &ldquo;{query}&rdquo;
                </div>
              )}
            </div>
          )}
        </div>
        {user ? (
          /* ── Signed-in: avatar + dropdown ── */
          <div
            ref={dropdownRef}
            style={{ position: "relative", marginLeft: 16, flexShrink: 0 }}
          >
            <button
              onClick={() => setDropdownOpen((o) => !o)}
              title={user.email}
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1a1a2e, #2d2d5e)",
                border: `2.5px solid ${dropdownOpen ? "#C9A84C" : "#D4AF37"}`,
                color: "#D4AF37",
                fontWeight: 800,
                fontSize: 14,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: dropdownOpen
                  ? "0 0 0 3px rgba(212,175,55,0.25)"
                  : "none",
                outline: "none",
                transition: "box-shadow 0.15s",
              }}
            >
              {getInitials(user.email, user.user_metadata)}
            </button>

            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "calc(100% + 10px)",
                  right: 0,
                  background: "#fff",
                  borderRadius: 14,
                  border: "1px solid #ebebeb",
                  boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
                  minWidth: 230,
                  zIndex: 200,
                  overflow: "hidden",
                }}
              >
                {/* User info strip */}
                <div
                  style={{
                    padding: "16px 18px 14px",
                    borderBottom: "1px solid #f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #1a1a2e, #2d2d5e)",
                      border: "2px solid #D4AF37",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#D4AF37",
                      fontWeight: 800,
                      fontSize: 12,
                      flexShrink: 0,
                    }}
                  >
                    {getInitials(user.email, user.user_metadata)}
                  </div>
                  <div style={{ overflow: "hidden" }}>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 700,
                        fontSize: 13.5,
                        color: "#1a1a2e",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {(user.user_metadata?.full_name as string) ||
                        (user.user_metadata?.name as string) ||
                        "My Account"}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 11.5,
                        color: "#888",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {user.email}
                    </p>
                  </div>
                </div>

                {/* Menu items */}
                <div style={{ padding: "6px 0" }}>
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/profile");
                    }}
                    style={{
                      width: "100%",
                      padding: "11px 18px",
                      background: "none",
                      border: "none",
                      textAlign: "left" as const,
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#1a1a2e",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#fafafa")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    Profile
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/orders");
                    }}
                    style={{
                      width: "100%",
                      padding: "11px 18px",
                      background: "none",
                      border: "none",
                      textAlign: "left" as const,
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#1a1a2e",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#fafafa")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <path d="M16 10a4 4 0 01-8 0" />
                    </svg>
                    My Orders
                  </button>

                  <div
                    style={{
                      height: 1,
                      background: "#f0f0f0",
                      margin: "4px 0",
                    }}
                  />

                  <button
                    onClick={async () => {
                      setDropdownOpen(false);
                      await signOut();
                      navigate("/login");
                    }}
                    style={{
                      width: "100%",
                      padding: "11px 18px",
                      background: "none",
                      border: "none",
                      textAlign: "left" as const,
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#e53e3e",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background = "#fff5f5")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background = "none")
                    }
                  >
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* ── Not signed in: gold pill ── */
          <a
            href="/login"
            className="header-signin"
            style={{
              marginLeft: 16,
              padding: "9px 26px",
              background: "#D4AF37",
              color: "#1a1a2e",
              borderRadius: 24,
              fontSize: 14,
              fontWeight: 700,
              textDecoration: "none",
              whiteSpace: "nowrap",
              letterSpacing: "0.15px",
              flexShrink: 0,
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#C9A84C")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#D4AF37")}
          >
            <span className="header-signin-text">Sign in</span>
            <svg
              className="header-signin-icon"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </a>
        )}
        <button
          onClick={onCartClick}
          style={{
            marginLeft: 12,
            position: "relative",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "#333",
            padding: "6px 8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
          title="View Cart"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
          {cartCount > 0 && (
            <span
              style={{
                position: "absolute",
                top: 2,
                right: 2,
                background: "#D4AF37",
                color: "#1a1a2e",
                borderRadius: "50%",
                width: 17,
                height: 17,
                fontSize: 10,
                fontWeight: 800,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                lineHeight: 1,
              }}
            >
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

// ─── Category Nav ─────────────────────────────────────────────────────────────
function CategoryNav() {
  const [active, setActive] = useState("Music");
  const tabs = [
    "Music",
    "Books",
    "Rosaries",
    "Statues",
    "Candles",
    "Apparel",
    "Gifts",
    "Children's",
    "Jewelry",
    "Sacramentals",
  ];

  return (
    <div
      className="cat-nav-sticky"
      style={{
        background: "#fff",
        borderBottom: "1px solid #e8e8e8",
        position: "sticky",
        top: 70,
        zIndex: 99,
      }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 28px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            overflowX: "auto",
          }}
          className="hide-scrollbar cat-nav-inner"
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              style={{
                padding: "14px 16px",
                background: "none",
                border: "none",
                borderBottom:
                  active === tab
                    ? "2px solid #C9A84C"
                    : "2px solid transparent",
                color: active === tab ? "#C9A84C" : "#4a4a4a",
                fontWeight: active === tab ? 600 : 400,
                fontSize: 13.5,
                cursor: "pointer",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "color 0.15s, border-color 0.15s",
                letterSpacing: "0.1px",
                outline: "none",
              }}
              onMouseEnter={(e) => {
                if (active !== tab) e.currentTarget.style.color = "#C9A84C";
              }}
              onMouseLeave={(e) => {
                if (active !== tab) e.currentTarget.style.color = "#4a4a4a";
              }}
            >
              {tab}
            </button>
          ))}
          <button
            onClick={() => setActive("Offers")}
            style={{
              marginLeft: 8,
              padding: "6px 14px",
              background:
                active === "Offers"
                  ? "linear-gradient(135deg, #b8912a, #D4AF37)"
                  : "linear-gradient(135deg, #D4AF37, #f0c84e)",
              color: "#1a1a2e",
              border: "none",
              borderRadius: 20,
              fontSize: 11.5,
              fontWeight: 800,
              cursor: "pointer",
              whiteSpace: "nowrap",
              flexShrink: 0,
              letterSpacing: "0.8px",
              textTransform: "uppercase" as const,
              alignSelf: "center",
              outline: "none",
              boxShadow: "0 2px 6px rgba(212,175,55,0.45)",
              transition: "box-shadow 0.15s, transform 0.1s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow =
                "0 4px 12px rgba(212,175,55,0.6)";
              e.currentTarget.style.transform = "scale(1.04)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow =
                "0 2px 6px rgba(212,175,55,0.45)";
              e.currentTarget.style.transform = "";
            }}
          >
            OFFERS
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const links: Record<string, { label: string; href: string }[]> = {
    Company: [
      { label: "About Us", href: "/about" },
      { label: "Our Mission", href: "/mission" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
    "Customer Care": [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Shipping Policy", href: "/shipping-policy" },
      { label: "Track Order", href: "/track-order" },
    ],
    "Faith Resources": [
      { label: "Daily Devotionals", href: "/blog" },
      { label: "Bible Reading", href: "/blog" },
      { label: "Prayer Guide", href: "/blog" },
      { label: "Find a Parish", href: "/find-parish" },
    ],
    Connect: [
      { label: "Facebook", href: "#" },
      { label: "Instagram", href: "#" },
      { label: "YouTube", href: "#" },
      { label: "Twitter", href: "#" },
    ],
  };

  return (
    <footer
      style={{ background: "#111", color: "#999", padding: "60px 24px 32px" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div
          className="footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 1fr",
            gap: 40,
            marginBottom: 48,
          }}
        >
          <div className="footer-brand">
            <img
              src="https://pznwwbrwgpxyveqbqhiq.supabase.co/storage/v1/object/public/Web_images/Logo/Logo.png"
              alt="Oscar Mkatoliki"
              style={{
                height: 56,
                marginBottom: 20,
                filter: "brightness(0) invert(1)",
              }}
            />
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.75,
                color: "#777",
                maxWidth: 260,
              }}
            >
              Bringing Catholic faith and inspiration to every home. Music,
              books, gifts and more — all to deepen your spiritual life.
            </p>
          </div>
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4
                style={{
                  color: "#D4AF37",
                  fontSize: 12,
                  fontWeight: 800,
                  letterSpacing: "1px",
                  textTransform: "uppercase",
                  margin: "0 0 18px",
                }}
              >
                {title}
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {items.map((item) => (
                  <li key={item.label} style={{ marginBottom: 11 }}>
                    <a
                      href={item.href}
                      style={{
                        color: "#777",
                        fontSize: 14,
                        textDecoration: "none",
                        transition: "color 0.15s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#D4AF37")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#777")
                      }
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="footer-bottom"
          style={{
            borderTop: "1px solid #222",
            paddingTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <p style={{ fontSize: 13, color: "#555", margin: 0 }}>
            © 2025 Oscar Mkatoliki. All rights reserved.
          </p>
          <div style={{ display: "flex", gap: 20 }}>
            {[
              { label: "Privacy Policy", href: "/privacy-policy" },
              { label: "Terms of Service", href: "/terms-of-service" },
              { label: "Cookie Policy", href: "/cookie-policy" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                style={{
                  fontSize: 13,
                  color: "#555",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#D4AF37")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#555")}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="footer-payments" style={{ display: "flex", gap: 8 }}>
            {["M-Pesa", "Visa", "Mastercard"].map((p) => (
              <span
                key={p}
                style={{
                  fontSize: 12,
                  background: "#1e1e1e",
                  padding: "5px 12px",
                  borderRadius: 4,
                  color: "#777",
                  border: "1px solid #333",
                }}
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Cart Sidebar ─────────────────────────────────────────────────────────────
function CartSidebar({
  items,
  onClose,
  onRemove,
  onCheckout,
}: {
  items: Product[];
  onClose: () => void;
  onRemove: (id: string) => void;
  onCheckout: () => void;
}) {
  const total = items.reduce((sum, p) => sum + p.price, 0);

  return (
    <>
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 200,
          backdropFilter: "blur(3px)",
        }}
      />
      <div
        className="cart-sidebar"
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          width: 400,
          background: "#fff",
          zIndex: 201,
          display: "flex",
          flexDirection: "column",
          boxShadow: "-8px 0 36px rgba(0,0,0,0.18)",
        }}
      >
        <div
          style={{
            padding: "22px 24px",
            borderBottom: "1px solid #f0e8d0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: "#1a1a2e",
            }}
          >
            Your Cart ({items.length})
          </h3>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              fontSize: 24,
              cursor: "pointer",
              color: "#666",
              lineHeight: 1,
              padding: 0,
            }}
          >
            ×
          </button>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px" }}>
          {items.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "60px 20px",
                color: "#aaa",
              }}
            >
              <div style={{ fontSize: 52, marginBottom: 14 }}>🛒</div>
              <p style={{ fontSize: 15 }}>Your cart is empty</p>
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={`${item.id}-${idx}`}
                style={{
                  display: "flex",
                  gap: 14,
                  padding: "14px 0",
                  borderBottom: "1px solid #f5f5f5",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 10,
                    overflow: "hidden",
                    flexShrink: 0,
                    background: "#f8f6f1",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "#1a1a2e",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.name}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 14,
                      color: "#C9A84C",
                      fontWeight: 700,
                    }}
                  >
                    TZS {item.price.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(item.id)}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#bbb",
                    cursor: "pointer",
                    fontSize: 18,
                    padding: "4px 6px",
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div style={{ padding: "20px 24px", borderTop: "1px solid #f0e8d0" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 16,
              }}
            >
              <span style={{ fontWeight: 600, color: "#555", fontSize: 15 }}>
                Total
              </span>
              <span style={{ fontSize: 20, fontWeight: 800, color: "#1a1a2e" }}>
                TZS {total.toLocaleString()}
              </span>
            </div>
            <button
              onClick={onCheckout}
              style={{
                display: "block",
                width: "100%",
                textAlign: "center",
                padding: "15px",
                background: "#1a1a2e",
                color: "#D4AF37",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 15,
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.3px",
              }}
            >
              Checkout →
            </button>
          </div>
        )}
      </div>
    </>
  );
}

// ─── Global CSS ───────────────────────────────────────────────────────────────
const GLOBAL_CSS = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html, body { overflow-x: hidden; max-width: 100%; }
  ::-webkit-scrollbar { height: 4px; width: 6px; }
  ::-webkit-scrollbar-track { background: #f1f1f1; }
  ::-webkit-scrollbar-thumb { background: #C9A84C; border-radius: 3px; }
  .hide-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .ticker-track { display: flex; width: max-content; animation: ticker-move 28s linear infinite; }
  .ticker-content { font-size: 11.5px; color: #D4AF37; font-weight: 600; letter-spacing: 0.9px; text-transform: uppercase; white-space: nowrap; flex-shrink: 0; }
  @keyframes ticker-move { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
  .header-signin-icon { display: none; }

  @media (max-width: 1024px) {
    .cat-grid   { grid-template-columns: repeat(4, 1fr) !important; }
    .prod-grid  { grid-template-columns: repeat(3, 1fr) !important; }
    .promo-grid { grid-template-columns: repeat(2, 1fr) !important; }
    .trust-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  @media (max-width: 640px) {
    .ann-util { display: none !important; }
    .ann-bar  { justify-content: center !important; padding: 0 12px !important; }
    .main-header-inner { height: 64px !important; padding: 0 14px !important; gap: 8px !important; }
    .header-main-nav { display: none !important; }
    .header-spacer { display: none !important; }
    .header-search { width: auto !important; flex: 1 !important; min-width: 0 !important; }
    .header-search input { font-size: 13px !important; padding: 9px 12px 9px 36px !important; }
    .header-logo { margin-right: 10px !important; }
    .header-logo img { height: 58px !important; }
    .header-signin { background: transparent !important; padding: 6px !important; margin-left: 6px !important; border-radius: 50% !important; color: #333 !important; display: flex !important; align-items: center !important; }
    .header-signin-text { display: none !important; }
    .header-signin-icon { display: block !important; }
    .cat-nav-sticky { top: 64px !important; }
    .cat-nav-inner button { padding: 11px 12px !important; font-size: 12px !important; }
    /* ── Hero: full-bleed image background on mobile ── */
    .hero-section::before { content: ''; position: absolute; inset: 0; background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.05) 100%); z-index: 1; pointer-events: none; }
    .hero-inner { flex-direction: column !important; min-height: 480px !important; padding: 0 20px 64px !important; gap: 0 !important; align-items: flex-start !important; justify-content: flex-end !important; }
    .hero-image-panel { position: absolute !important; inset: 0 !important; width: 100% !important; height: 100% !important; z-index: 0 !important; }
    .hero-image-panel img { border-radius: 0 !important; box-shadow: none !important; width: 100% !important; height: 100% !important; object-fit: cover !important; object-position: 65% top !important; }
    .hero-text-block { position: relative !important; z-index: 2 !important; padding: 0 !important; }
    .hero-h1 { font-size: 38px !important; }
    .section-pad { padding: 36px 0 !important; }
    .section-inner { padding: 0 12px !important; }
    .cat-grid  { grid-template-columns: repeat(3, 1fr) !important; gap: 10px !important; }
    .cat-card  { padding: 16px 8px 12px !important; border-radius: 12px !important; }
    .cat-icon  { width: 46px !important; height: 46px !important; font-size: 20px !important; margin-bottom: 8px !important; }
    .cat-label { font-size: 11px !important; }
    .promo-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
    .promo-card { padding: 24px 20px !important; border-radius: 14px !important; }
    .prod-grid  { grid-template-columns: repeat(3, 1fr) !important; gap: 8px !important; }
    .prod-card  { border-radius: 10px !important; }
    .prod-img   { height: 95px !important; }
    .prod-img-icon { font-size: 28px !important; }
    .prod-info  { padding: 7px 8px 9px !important; }
    .prod-name  { font-size: 10px !important; margin-bottom: 2px !important; -webkit-line-clamp: 2 !important; }
    .prod-price { font-size: 11px !important; }
    .prod-orig  { display: none !important; }
    .prod-btn   { padding: 5px 8px !important; font-size: 10px !important; border-radius: 6px !important; letter-spacing: 0 !important; }
    .prod-badge { font-size: 8px !important; padding: 3px 5px !important; }
    .prod-cat   { font-size: 9px !important; margin-bottom: 6px !important; }
    .vid-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 14px !important; }
    .trust-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 16px !important; }
    .trust-section { padding: 28px 0 !important; }
    .trust-inner  { padding: 0 12px !important; }
    .nl-form { flex-direction: column !important; }
    .nl-form input  { width: 100% !important; }
    .nl-section { padding: 48px 16px !important; }
    .footer-grid  { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
    .footer-brand { grid-column: 1 / -1 !important; }
    .footer-bottom { flex-direction: column !important; align-items: flex-start !important; }
    .footer-payments { display: none !important; }
    .cart-sidebar { width: 100% !important; }
    .pd-top { grid-template-columns: 1fr !important; gap: 24px !important; }
    .pd-product-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important; }
  }

  /* ── Landscape phone: constrain layout, stay single-column ── */
  @media (max-height: 500px) and (orientation: landscape) {
    .main-header-inner { height: 52px !important; }
    .hero-inner { min-height: 320px !important; }
    .hero-h1 { font-size: 28px !important; }
    .cat-nav-sticky { top: 52px !important; }
  }
`;

// ─── App Layout ───────────────────────────────────────────────────────────────
export default function AppLayout({
  children,
  hideCategoryNav,
}: {
  children: React.ReactNode;
  hideCategoryNav?: boolean;
}) {
  const { cartItems, removeFromCart, cartOpen, setCartOpen } = useCart();
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif",
        background: "#faf7f2",
        minHeight: "100vh",
        overflowX: "hidden",
        maxWidth: "100%",
      }}
    >
      <style>{GLOBAL_CSS}</style>
      <AnnouncementBar />
      <Header
        cartCount={cartItems.length}
        onCartClick={() => setCartOpen(true)}
      />
      {!hideCategoryNav && <CategoryNav />}

      <main>{children}</main>

      <Footer />

      {cartOpen && (
        <CartSidebar
          items={cartItems}
          onClose={() => setCartOpen(false)}
          onRemove={removeFromCart}
          onCheckout={() => {
            setCartOpen(false);
            navigate("/checkout");
          }}
        />
      )}
    </div>
  );
}
