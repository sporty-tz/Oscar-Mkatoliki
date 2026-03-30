import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";
import prayersData from "../data/prayers.json";
import novenasData from "../data/novenas.json";

interface Prayer {
  id: string;
  category: string;
  title: string;
  text: string;
  latin?: string;
  source?: string;
  note?: string;
}

interface NovenaDay {
  day: number;
  prayer: string;
}

interface Novena {
  id: string;
  title: string;
  duration: number;
  anchor: { type: string; month: number; day: number; name: string };
  offsetDays: number;
  days: NovenaDay[];
}

function getActiveNovenas(): { novena: Novena; currentDay: number }[] {
  const today = new Date();
  const todayMs = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  ).getTime();
  const active: { novena: Novena; currentDay: number }[] = [];

  for (const nov of novenasData as Novena[]) {
    const anchorDate = new Date(
      today.getFullYear(),
      nov.anchor.month - 1,
      nov.anchor.day,
    );
    const startMs = anchorDate.getTime() + nov.offsetDays * 86400000;
    const endMs = startMs + nov.duration * 86400000;
    if (todayMs >= startMs && todayMs < endMs) {
      const dayIndex = Math.floor((todayMs - startMs) / 86400000);
      active.push({ novena: nov, currentDay: dayIndex + 1 });
    }
  }
  return active;
}

// Group prayers by category
function groupByCategory(prayers: Prayer[]): Record<string, Prayer[]> {
  return prayers.reduce<Record<string, Prayer[]>>((acc, p) => {
    if (!acc[p.category]) acc[p.category] = [];
    acc[p.category].push(p);
    return acc;
  }, {});
}

// Featured prayer: keyed to day of week
const FEATURED_IDS: Record<number, string> = {
  0: "rosary", // Sunday
  1: "morning-offering", // Monday
  2: "act-of-contrition",
  3: "memorare",
  4: "anima-christi",
  5: "stations-of-the-cross", // Friday
  6: "rosary", // Saturday
};

const CATEGORY_STYLE: Record<
  string,
  { icon: string; color: string; bg: string }
> = {
  "Daily Prayers": { icon: "🌅", color: "#1a3a6e", bg: "#edf2fb" },
  "Marian Prayers": { icon: "🌹", color: "#6c3483", bg: "#f5eefb" },
  Chaplets: { icon: "📿", color: "#1a6b40", bg: "#edfaf3" },
  "Special Occasions": { icon: "✝️", color: "#0d3320", bg: "#edfaf3" },
};

export default function Prayers() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [expandedPrayer, setExpandedPrayer] = useState<string | null>(null);

  const prayers = prayersData as Prayer[];
  const grouped = groupByCategory(prayers);
  const activeNovenas = getActiveNovenas();

  const dayOfWeek = new Date().getDay();
  const featuredId = FEATURED_IDS[dayOfWeek] ?? "morning-offering";
  const featuredPrayer = prayers.find((p) => p.id === featuredId) ?? prayers[0];

  return (
    <AppLayout hideCategoryNav>
      {/* Page Hero */}
      <section
        style={{
          background:
            "linear-gradient(160deg, #4a0d1a 0%, #a93226 55%, #3a0a12 100%)",
          padding: "72px 24px 80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: 200,
            fontWeight: 900,
            color: "rgba(255,255,255,0.03)",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          ORATIO
        </div>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: 640,
            margin: "0 auto",
          }}
        >
          <span
            style={{
              fontSize: 60,
              display: "block",
              marginBottom: 20,
              lineHeight: 1,
            }}
          >
            🙏
          </span>
          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 14px",
              letterSpacing: "-0.5px",
            }}
          >
            Prayers &amp; Novenas
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.65)",
              margin: "0 0 32px",
              lineHeight: 1.7,
            }}
          >
            Daily prayers, chaplets, novenas and the Liturgy of the Hours — a
            treasury of Catholic prayer for every moment of your day.
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(212,175,55,0.14)",
              border: "1.5px solid rgba(212,175,55,0.32)",
              borderRadius: 50,
              padding: "10px 24px",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#D4AF37"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span style={{ color: "#D4AF37", fontWeight: 700, fontSize: 13.5 }}>
              Full Prayer Library — Coming Soon
            </span>
          </div>
        </div>
      </section>

      {/* Active novenas banner */}
      {activeNovenas.length > 0 && (
        <section style={{ background: "#4a0d1a", padding: "28px 24px" }}>
          <div style={{ maxWidth: 880, margin: "0 auto" }}>
            <p
              style={{
                fontSize: 11,
                fontWeight: 800,
                color: "#D4AF37",
                letterSpacing: "2px",
                textTransform: "uppercase",
                margin: "0 0 14px",
              }}
            >
              🕯️ Active Novenas Today
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
              {activeNovenas.map(({ novena, currentDay }) => (
                <div
                  key={novena.id}
                  style={{
                    background: "rgba(212,175,55,0.1)",
                    border: "1.5px solid rgba(212,175,55,0.3)",
                    borderRadius: 14,
                    padding: "14px 20px",
                    flex: "1 1 260px",
                    cursor: "pointer",
                  }}
                  onClick={() =>
                    setExpanded(expanded === novena.id ? null : novena.id)
                  }
                >
                  <p
                    style={{
                      margin: "0 0 4px",
                      fontWeight: 800,
                      fontSize: 14.5,
                      color: "#fff",
                    }}
                  >
                    {novena.title}
                  </p>
                  <p
                    style={{
                      margin: "0 0 8px",
                      fontSize: 12,
                      color: "#D4AF37",
                      fontWeight: 600,
                    }}
                  >
                    Day {currentDay} of {novena.duration} — {novena.anchor.name}
                  </p>
                  {expanded === novena.id && (
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13.5,
                        color: "rgba(255,255,255,0.75)",
                        lineHeight: 1.7,
                        whiteSpace: "pre-line",
                      }}
                    >
                      {novena.days[currentDay - 1]?.prayer ?? ""}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured prayer highlight */}
      <section style={{ background: "#1a1a2e", padding: "52px 24px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: "#D4AF37",
              letterSpacing: "2px",
              textTransform: "uppercase",
              margin: "0 0 14px",
            }}
          >
            Prayer of the Day
          </p>
          <h2
            style={{
              fontSize: 24,
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 16px",
              letterSpacing: "-0.3px",
            }}
          >
            {featuredPrayer.title}
          </h2>
          <p
            style={{
              fontSize: 15,
              color: "rgba(255,255,255,0.7)",
              margin: "0 0 16px",
              lineHeight: 1.75,
              fontStyle: "italic",
              whiteSpace: "pre-line",
            }}
          >
            {featuredPrayer.text}
          </p>
          {featuredPrayer.source && (
            <p
              style={{
                fontSize: 12.5,
                color: "#D4AF37",
                fontWeight: 700,
                margin: 0,
              }}
            >
              {featuredPrayer.source}
            </p>
          )}
        </div>
      </section>

      {/* Prayer categories */}
      <section style={{ background: "#f8f6f2", padding: "64px 24px 80px" }}>
        <div style={{ maxWidth: 1080, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: "#1a1a2e",
                margin: "0 0 10px",
                letterSpacing: "-0.3px",
              }}
            >
              Prayer Library
            </h2>
            <p style={{ color: "#888", fontSize: 14, margin: 0 }}>
              Expand any category to read the full prayer text.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 18,
            }}
          >
            {Object.entries(grouped).map(([category, categoryPrayers]) => {
              const style = CATEGORY_STYLE[category] ?? {
                icon: "🙏",
                color: "#1a1a2e",
                bg: "#f0f0f0",
              };
              return (
                <div
                  key={category}
                  style={{
                    background: "#fff",
                    borderRadius: 18,
                    border: "1.5px solid #ece8e0",
                    overflow: "hidden",
                    cursor: "pointer",
                    transition: "box-shadow 0.18s, border-color 0.18s",
                  }}
                  onClick={() =>
                    setExpanded(expanded === category ? null : category)
                  }
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow =
                      "0 6px 24px rgba(0,0,0,0.08)";
                    e.currentTarget.style.borderColor = "#D4AF37";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "";
                    e.currentTarget.style.borderColor = "#ece8e0";
                  }}
                >
                  {/* Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 14,
                      padding: "20px 22px",
                      background: style.bg,
                    }}
                  >
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 20,
                        flexShrink: 0,
                        boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
                      }}
                    >
                      {style.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          margin: 0,
                          fontWeight: 800,
                          fontSize: 15,
                          color: style.color,
                        }}
                      >
                        {category}
                      </p>
                      <p style={{ margin: 0, fontSize: 12, color: "#aaa" }}>
                        {categoryPrayers.length} prayer
                        {categoryPrayers.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      style={{
                        transition: "transform 0.2s",
                        transform:
                          expanded === category ? "rotate(180deg)" : "none",
                      }}
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>

                  {/* Expanded prayers list */}
                  {expanded === category && (
                    <div style={{ padding: "6px 0 10px" }}>
                      {categoryPrayers.map((prayer) => (
                        <div key={prayer.id}>
                          <div
                            style={{
                              padding: "10px 22px",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              borderBottom: "1px solid #f5f5f5",
                              cursor: "pointer",
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              setExpandedPrayer(
                                expandedPrayer === prayer.id ? null : prayer.id,
                              );
                            }}
                          >
                            <span
                              style={{
                                fontSize: 13.5,
                                color: "#1a1a2e",
                                fontWeight: 600,
                              }}
                            >
                              {prayer.title}
                            </span>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="#C9A84C"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              style={{
                                transition: "transform 0.2s",
                                transform:
                                  expandedPrayer === prayer.id
                                    ? "rotate(180deg)"
                                    : "none",
                              }}
                            >
                              <polyline points="6 9 12 15 18 9" />
                            </svg>
                          </div>
                          {expandedPrayer === prayer.id && (
                            <div
                              style={{
                                padding: "14px 22px 16px",
                                background: "#fafaf8",
                                borderBottom: "1px solid #f0ece4",
                              }}
                            >
                              {prayer.latin && (
                                <p
                                  style={{
                                    fontSize: 12,
                                    color: "#C9A84C",
                                    fontStyle: "italic",
                                    margin: "0 0 10px",
                                    fontWeight: 600,
                                  }}
                                >
                                  {prayer.latin}
                                </p>
                              )}
                              <p
                                style={{
                                  fontSize: 13.5,
                                  color: "#444",
                                  lineHeight: 1.75,
                                  margin: "0 0 10px",
                                  whiteSpace: "pre-line",
                                }}
                              >
                                {prayer.text}
                              </p>
                              {prayer.source && (
                                <p
                                  style={{
                                    fontSize: 11.5,
                                    color: "#999",
                                    margin: 0,
                                    fontStyle: "italic",
                                  }}
                                >
                                  {prayer.source}
                                </p>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
