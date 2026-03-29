import { useState } from "react";
import AppLayout from "../components/layout/AppLayout";

const parishes = [
  {
    name: "Cathedral of Saint Joseph",
    region: "Dar es Salaam",
    area: "Msimbazi, Ilala",
    phone: "+255 22 211 5678",
    massTimes: "Sun: 7AM, 9AM, 11AM • Sat: 5PM",
    type: "Cathedral",
  },
  {
    name: "Holy Cross Parish",
    region: "Dar es Salaam",
    area: "Oyster Bay",
    phone: "+255 22 266 9900",
    massTimes: "Sun: 8AM, 10AM • Weekday: 7AM",
    type: "Parish",
  },
  {
    name: "Our Lady of the Angels",
    region: "Dar es Salaam",
    area: "Kimara",
    phone: "+255 22 244 3210",
    massTimes: "Sun: 7AM, 9:30AM • Sat: 6PM",
    type: "Parish",
  },
  {
    name: "St. Peter & Paul Parish",
    region: "Arusha",
    area: "Arusha Town Centre",
    phone: "+255 27 254 4456",
    massTimes: "Sun: 7AM, 9AM, 11AM",
    type: "Parish",
  },
  {
    name: "Christ the King Cathedral",
    region: "Mwanza",
    area: "Mwanza City",
    phone: "+255 28 250 0123",
    massTimes: "Sun: 8AM, 10AM • Sat: 5PM",
    type: "Cathedral",
  },
  {
    name: "Blessed Sacrament Parish",
    region: "Dodoma",
    area: "Dodoma City Centre",
    phone: "+255 26 232 5789",
    massTimes: "Sun: 7AM, 9AM",
    type: "Parish",
  },
  {
    name: "St. Augustine Parish",
    region: "Moshi",
    area: "Moshi Town",
    phone: "+255 27 275 6634",
    massTimes: "Sun: 7AM, 10AM • Sat: 5:30PM",
    type: "Parish",
  },
  {
    name: "Our Lady of Fatima",
    region: "Zanzibar",
    area: "Stone Town",
    phone: "+255 24 223 4567",
    massTimes: "Sun: 8AM, 10AM",
    type: "Parish",
  },
];

const regions = [
  "All Regions",
  "Dar es Salaam",
  "Arusha",
  "Mwanza",
  "Dodoma",
  "Moshi",
  "Zanzibar",
];

export default function FindParish() {
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("All Regions");

  const filtered = parishes.filter((p) => {
    const matchRegion = region === "All Regions" || p.region === region;
    const q = search.toLowerCase();
    const matchSearch =
      !q ||
      p.name.toLowerCase().includes(q) ||
      p.area.toLowerCase().includes(q) ||
      p.region.toLowerCase().includes(q);
    return matchRegion && matchSearch;
  });

  return (
    <AppLayout>
      {/* Hero */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #2c2c60 100%)",
          padding: "80px 24px 70px",
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
          Parish Finder
        </p>
        <h1
          style={{
            color: "#fff",
            fontWeight: 900,
            fontSize: 40,
            margin: "0 0 16px",
          }}
        >
          Find a Parish Near You
        </h1>
        <p
          style={{
            color: "rgba(255,255,255,0.68)",
            fontSize: 16,
            maxWidth: 520,
            margin: "0 auto 32px",
          }}
        >
          Locate Catholic parishes across Tanzania — view Mass times, contact
          numbers and directions.
        </p>

        {/* Search + filter */}
        <div
          style={{
            maxWidth: 600,
            margin: "0 auto",
            display: "flex",
            gap: 10,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <input
            type="text"
            placeholder="Search parish or area…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: "1 1 260px",
              borderRadius: 12,
              border: "none",
              padding: "13px 18px",
              fontSize: 14,
              outline: "none",
              fontFamily: "inherit",
            }}
          />
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            style={{
              flex: "0 0 auto",
              borderRadius: 12,
              border: "none",
              padding: "13px 18px",
              fontSize: 14,
              fontFamily: "inherit",
              background: "#fff",
              cursor: "pointer",
              outline: "none",
            }}
          >
            {regions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      <div
        style={{ maxWidth: 1000, margin: "0 auto", padding: "60px 24px 80px" }}
      >
        {/* Map placeholder */}
        <div
          style={{
            background: "#e8e8e8",
            borderRadius: 16,
            height: 220,
            marginBottom: 40,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "1px solid #ddd",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ margin: "0 0 8px", fontSize: 40 }}>🗺️</p>
            <p
              style={{
                margin: 0,
                fontWeight: 700,
                color: "#888",
                fontSize: 14,
              }}
            >
              Interactive map coming soon
            </p>
            <p style={{ margin: "4px 0 0", fontSize: 12, color: "#aaa" }}>
              We are integrating Google Maps — parish pins will appear here
            </p>
          </div>
        </div>

        {/* Results */}
        <div
          style={{
            marginBottom: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontWeight: 700,
              color: "#1a1a2e",
              fontSize: 15,
            }}
          >
            {filtered.length} {filtered.length === 1 ? "Parish" : "Parishes"}{" "}
            Found
          </p>
          {(search || region !== "All Regions") && (
            <button
              onClick={() => {
                setSearch("");
                setRegion("All Regions");
              }}
              style={{
                background: "none",
                border: "none",
                fontSize: 12.5,
                color: "#D4AF37",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Clear filters ✕
            </button>
          )}
        </div>

        {filtered.length === 0 ? (
          <div
            style={{ textAlign: "center", padding: "60px 0", color: "#aaa" }}
          >
            <p style={{ fontSize: 40, margin: "0 0 12px" }}>⛪</p>
            <p
              style={{
                fontSize: 15,
                fontWeight: 700,
                margin: "0 0 6px",
                color: "#999",
              }}
            >
              No parishes found
            </p>
            <p style={{ fontSize: 13.5, margin: 0 }}>
              Try a different search or region filter.
            </p>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: 16,
            }}
            className="parish-grid"
          >
            {filtered.map((p) => (
              <div
                key={p.name}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  border: "1px solid #ebebeb",
                  padding: "22px 22px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  transition: "box-shadow 0.2s",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow =
                    "0 6px 20px rgba(0,0,0,0.09)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.04)")
                }
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 10,
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        color: "#C9A84C",
                        background: "#fdf4dc",
                        borderRadius: 20,
                        padding: "3px 10px",
                        display: "inline-block",
                        marginBottom: 8,
                      }}
                    >
                      ✝ {p.type}
                    </span>
                    <h3
                      style={{
                        margin: 0,
                        fontSize: 14.5,
                        fontWeight: 800,
                        color: "#1a1a2e",
                        lineHeight: 1.3,
                      }}
                    >
                      {p.name}
                    </h3>
                  </div>
                </div>
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ fontSize: 14, flexShrink: 0 }}>📍</span>
                    <p style={{ margin: 0, fontSize: 13, color: "#555" }}>
                      {p.area}, {p.region}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ fontSize: 14, flexShrink: 0 }}>🕐</span>
                    <p style={{ margin: 0, fontSize: 12.5, color: "#555" }}>
                      {p.massTimes}
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      gap: 8,
                      alignItems: "flex-start",
                    }}
                  >
                    <span style={{ fontSize: 14, flexShrink: 0 }}>📞</span>
                    <a
                      href={`tel:${p.phone}`}
                      style={{
                        margin: 0,
                        fontSize: 13,
                        color: "#D4AF37",
                        fontWeight: 700,
                        textDecoration: "none",
                      }}
                    >
                      {p.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Submit a parish */}
        <div
          style={{
            background: "linear-gradient(135deg, #1a1a2e, #2c2c60)",
            borderRadius: 20,
            padding: "36px 44px",
            textAlign: "center",
            color: "#fff",
            marginTop: 48,
          }}
        >
          <h2 style={{ margin: "0 0 10px", fontSize: 19, fontWeight: 900 }}>
            Know a Parish Not Listed?
          </h2>
          <p
            style={{
              margin: "0 0 22px",
              fontSize: 14.5,
              color: "rgba(255,255,255,0.7)",
            }}
          >
            Help us build the most complete Catholic parish directory in
            Tanzania. Submit parish details and we'll add it within 48 hours.
          </p>
          <a
            href="mailto:hello@oscarmkatoliki.co.tz?subject=Parish Submission"
            style={{
              display: "inline-block",
              background: "#D4AF37",
              color: "#1a1a2e",
              borderRadius: 12,
              padding: "11px 28px",
              fontWeight: 800,
              fontSize: 13.5,
              textDecoration: "none",
            }}
          >
            Submit a Parish
          </a>
        </div>

        <style>{`
          @media (max-width: 640px) {
            .parish-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </div>
    </AppLayout>
  );
}
