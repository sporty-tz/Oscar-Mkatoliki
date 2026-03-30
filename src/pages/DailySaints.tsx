import AppLayout from "../components/layout/AppLayout";
import saintsData from "../data/saints.json";

interface Saint {
  mmdd: string;
  name: string;
  rank: string;
  bio: string;
}

function getTodaysSaints(): Saint[] {
  const today = new Date();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const key = `${mm}-${dd}`;
  return (saintsData as Saint[]).filter((s) => s.mmdd === key);
}

const RANK_BADGE: Record<string, { bg: string; color: string }> = {
  Solemnity: { bg: "#fff3cd", color: "#856404" },
  Feast: { bg: "#d1ecf1", color: "#0c5460" },
  Memorial: { bg: "#d4edda", color: "#155724" },
  "Optional Memorial": { bg: "#f8f9fa", color: "#6c757d" },
};

export default function DailySaints() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
  const todaysSaints = getTodaysSaints();

  return (
    <AppLayout hideCategoryNav>
      {/* Page Hero */}
      <section
        style={{
          background:
            "linear-gradient(160deg, #2d1b69 0%, #6c3483 60%, #1e0e45 100%)",
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
            fontSize: 220,
            fontWeight: 900,
            color: "rgba(255,255,255,0.03)",
            userSelect: "none",
            pointerEvents: "none",
          }}
        >
          SANCTI
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
            ✨
          </span>
          <p
            style={{
              fontSize: 12,
              fontWeight: 800,
              color: "rgba(212,175,55,0.85)",
              letterSpacing: "3px",
              textTransform: "uppercase",
              margin: "0 0 14px",
            }}
          >
            {dateStr}
          </p>
          <h1
            style={{
              fontSize: 44,
              fontWeight: 800,
              color: "#fff",
              margin: "0 0 14px",
              letterSpacing: "-0.5px",
            }}
          >
            Daily Saints
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.65)",
              margin: "0 0 32px",
              lineHeight: 1.7,
            }}
          >
            Discover the saint of the day, celebrate feast days and be inspired
            by the lives of holy men and women.
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
              {todaysSaints.length > 0
                ? `${todaysSaints.length} saint${todaysSaints.length > 1 ? "s" : ""} today — ${dateStr}`
                : `Daily Saints Calendar — ${dateStr}`}
            </span>
          </div>
        </div>
      </section>

      {/* Saints cards */}
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
              {todaysSaints.length > 0
                ? "Today's Saints"
                : "A Few Beloved Saints"}
            </h2>
            <p style={{ color: "#888", fontSize: 14, margin: 0 }}>
              {todaysSaints.length > 0
                ? `The Church commemorates ${todaysSaints.length === 1 ? "this saint" : "these saints"} today, ${dateStr}.`
                : "No specific commemoration found for today. Here are a few saints to inspire you."}
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 20,
            }}
          >
            {(todaysSaints.length > 0
              ? todaysSaints
              : (saintsData as Saint[]).slice(0, 6)
            ).map((saint) => {
              const badge =
                RANK_BADGE[saint.rank] ?? RANK_BADGE["Optional Memorial"];
              return (
                <div
                  key={saint.mmdd + saint.name}
                  style={{
                    background: "#fff",
                    borderRadius: 18,
                    padding: "26px 24px",
                    border: "1.5px solid #ece8e0",
                    display: "flex",
                    gap: 16,
                    alignItems: "flex-start",
                  }}
                >
                  <div
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: "linear-gradient(135deg, #2d1b69, #6c3483)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      flexShrink: 0,
                    }}
                  >
                    ✨
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        margin: "0 0 4px",
                        fontWeight: 800,
                        fontSize: 15.5,
                        color: "#1a1a2e",
                      }}
                    >
                      {saint.name}
                    </p>
                    <span
                      style={{
                        display: "inline-block",
                        fontSize: 11,
                        fontWeight: 700,
                        background: badge.bg,
                        color: badge.color,
                        padding: "2px 9px",
                        borderRadius: 20,
                        marginBottom: 8,
                        letterSpacing: "0.3px",
                      }}
                    >
                      {saint.rank}
                    </span>
                    <p
                      style={{
                        margin: 0,
                        fontSize: 13.5,
                        color: "#777",
                        lineHeight: 1.55,
                      }}
                    >
                      {saint.bio}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
