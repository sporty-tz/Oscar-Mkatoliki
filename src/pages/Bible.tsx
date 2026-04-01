import { useState, useEffect, useRef } from "react";
import AppLayout from "../components/layout/AppLayout";
import bibleBooks from "../data/bibleBooks.json";
import { useBibleChapter } from "../hooks/useBibleChapter";
import { useLiturgicalDay } from "../hooks/useLiturgicalDay";
import { useDailyVerse } from "../hooks/useDailyVerse";

interface BibleBook {
  name: string;
  slug: string;
  chapters: number;
  testament: string;
  deutero: boolean;
}

const BOOKS = bibleBooks as BibleBook[];

const SECTION_ORDER = [
  {
    key: "OT_PROTO",
    label: "Old Testament",
    filter: (b: BibleBook) => b.testament === "OT" && !b.deutero,
  },
  {
    key: "OT_DEUTERO",
    label: "Deuterocanonical",
    filter: (b: BibleBook) => b.testament === "OT" && b.deutero,
  },
  {
    key: "NT",
    label: "New Testament",
    filter: (b: BibleBook) => b.testament === "NT",
  },
];

const ttsSupported =
  typeof window !== "undefined" && "speechSynthesis" in window;

export default function Bible() {
  const [selectedBook, setSelectedBook] = useState<BibleBook | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [fontSize, setFontSize] = useState(16);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("OT_PROTO");
  const [bookSearch, setBookSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const readerRef = useRef<HTMLDivElement>(null);

  const liturgical = useLiturgicalDay();
  const dailyVerse = useDailyVerse(liturgical.season);
  const chapter = useBibleChapter(selectedBook?.slug ?? null, selectedChapter);

  // Scroll reader to top when chapter changes
  useEffect(() => {
    if (readerRef.current) {
      readerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedBook, selectedChapter]);

  // Stop TTS when chapter changes
  useEffect(() => {
    if (ttsSupported) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [selectedBook, selectedChapter]);

  function selectBook(book: BibleBook) {
    setSelectedBook(book);
    setSelectedChapter(1);
  }

  function handleSpeak() {
    if (!ttsSupported || chapter.verses.length === 0) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    const fullText = chapter.verses
      .map((v) => `${v.verse}. ${v.text}`)
      .join(" ");
    const utterance = new SpeechSynthesisUtterance(fullText);
    utterance.lang = "en-GB";
    utterance.rate = 0.88;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  }

  const filteredBooks = bookSearch.trim()
    ? BOOKS.filter((b) =>
        b.name.toLowerCase().includes(bookSearch.toLowerCase()),
      )
    : null;

  const accentHex =
    !liturgical.loading && liturgical.colorHex !== "#2d6a4f"
      ? liturgical.colorHex
      : "#D4AF37";

  return (
    <AppLayout hideCategoryNav>
      {/* ── Hero ── */}
      <section
        style={{
          background:
            "linear-gradient(160deg, #0c2461 0%, #1e3799 60%, #0b1a4a 100%)",
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
            fontSize: 260,
            fontWeight: 900,
            color: "rgba(255,255,255,0.025)",
            userSelect: "none",
            pointerEvents: "none",
            letterSpacing: -10,
          }}
        >
          BIBLIA
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
            📖
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
            Sacred Scripture
          </h1>
          <p
            style={{
              fontSize: 16,
              color: "rgba(255,255,255,0.65)",
              margin: "0 0 28px",
              lineHeight: 1.7,
            }}
          >
            Read the Word of God — all 73 books of the Catholic Bible in the
            Douay-Rheims translation.
          </p>

          {/* Liturgical context pill */}
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
            <span
              style={{
                display: "inline-block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: accentHex,
                flexShrink: 0,
              }}
            />
            <span style={{ color: "#D4AF37", fontWeight: 700, fontSize: 13.5 }}>
              {liturgical.loading
                ? "Loading liturgical calendar…"
                : liturgical.feastName
                  ? liturgical.feastName
                  : liturgical.seasonDisplay || "Ordinary Time"}
            </span>
          </div>
        </div>
      </section>

      {/* ── Daily Reading Banner ── */}
      <section style={{ background: "#1a1a2e", padding: "36px 24px" }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <p
            style={{
              fontSize: 11,
              fontWeight: 800,
              color: accentHex,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              margin: "0 0 12px",
            }}
          >
            Scripture of the Day · Douay-Rheims
          </p>
          {dailyVerse.loading ? (
            <div
              style={{
                height: 60,
                background: "rgba(255,255,255,0.06)",
                borderRadius: 10,
              }}
            />
          ) : (
            <>
              <p
                style={{
                  fontSize: 17,
                  color: "rgba(255,255,255,0.85)",
                  margin: "0 0 10px",
                  lineHeight: 1.75,
                  fontStyle: "italic",
                }}
              >
                &ldquo;{dailyVerse.text}&rdquo;
              </p>
              <p
                style={{
                  fontSize: 13,
                  color: accentHex,
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                {dailyVerse.reference}
              </p>
            </>
          )}
        </div>
      </section>

      {/* ── Main Reader ── */}
      <section style={{ background: "#f8f6f2", padding: "0" }}>
        <div
          style={{
            maxWidth: 1280,
            margin: "0 auto",
            display: "flex",
            minHeight: 600,
          }}
        >
          {/* ── Left: Book Browser ── */}
          <div
            style={{
              borderRight: "1.5px solid #e8e2d8",
              background: "#fff",
              display: "flex",
              flexDirection: "column",
              width: sidebarCollapsed ? 48 : 300,
              minWidth: sidebarCollapsed ? 48 : 300,
              transition: "width 0.25s ease, min-width 0.25s ease",
              overflow: "hidden",
              flexShrink: 0,
              position: "relative",
            }}
          >
            {/* Collapse toggle */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: sidebarCollapsed ? "center" : "flex-end",
                padding: "10px 10px 0",
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => setSidebarCollapsed((v) => !v)}
                title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: 7,
                  border: "1.5px solid #e8e2d8",
                  background: "#f5f2eb",
                  color: "#555",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 16,
                  fontWeight: 700,
                  flexShrink: 0,
                  transition: "background 0.15s",
                  lineHeight: 1,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#ece7dc")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#f5f2eb")
                }
              >
                {sidebarCollapsed ? "›" : "‹"}
              </button>
            </div>

            {/* Sidebar content — hidden when collapsed */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                opacity: sidebarCollapsed ? 0 : 1,
                pointerEvents: sidebarCollapsed ? "none" : "auto",
                transition: "opacity 0.15s ease",
                overflow: "hidden",
              }}
            >
              {/* Search */}
              <div style={{ padding: "16px 16px 0" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    background: "#f5f2eb",
                    border: "1.5px solid #e8e2d8",
                    borderRadius: 10,
                    padding: "8px 12px",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#aaa"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search books…"
                    value={bookSearch}
                    onChange={(e) => setBookSearch(e.target.value)}
                    style={{
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      fontSize: 13.5,
                      color: "#1a1a2e",
                      flex: 1,
                    }}
                  />
                  {bookSearch && (
                    <button
                      onClick={() => setBookSearch("")}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#aaa",
                        padding: 0,
                        fontSize: 16,
                        lineHeight: 1,
                      }}
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>

              {/* Section tabs */}
              {!filteredBooks && (
                <div
                  style={{ display: "flex", padding: "12px 16px 0", gap: 6 }}
                >
                  {SECTION_ORDER.map((sec) => (
                    <button
                      key={sec.key}
                      onClick={() => setActiveSection(sec.key)}
                      style={{
                        flex: 1,
                        padding: "6px 4px",
                        borderRadius: 8,
                        border: "1.5px solid",
                        borderColor:
                          activeSection === sec.key ? "#1e3799" : "#e8e2d8",
                        background:
                          activeSection === sec.key ? "#1e3799" : "transparent",
                        color: activeSection === sec.key ? "#fff" : "#888",
                        fontWeight: 700,
                        fontSize: 10.5,
                        cursor: "pointer",
                        transition: "all 0.18s",
                      }}
                    >
                      {sec.key === "OT_PROTO"
                        ? "OT"
                        : sec.key === "OT_DEUTERO"
                          ? "Deut."
                          : "NT"}
                    </button>
                  ))}
                </div>
              )}

              {/* Book list */}
              <div
                style={{
                  flex: 1,
                  overflowY: "auto",
                  padding: "10px 10px 20px",
                  minWidth: 280,
                }}
              >
                {(filteredBooks
                  ? [{ key: "search", label: "Results", filter: () => true }]
                  : SECTION_ORDER.filter((s) => s.key === activeSection)
                ).map((sec) => {
                  const books = filteredBooks ?? BOOKS.filter(sec.filter);
                  return (
                    <div key={sec.key}>
                      {books.map((book) => (
                        <button
                          key={book.name}
                          onClick={() => selectBook(book)}
                          style={{
                            width: "100%",
                            textAlign: "left",
                            background:
                              selectedBook?.name === book.name
                                ? "#eef2ff"
                                : "transparent",
                            border: "none",
                            borderRadius: 9,
                            padding: "9px 12px",
                            cursor: "pointer",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) => {
                            if (selectedBook?.name !== book.name)
                              (
                                e.currentTarget as HTMLButtonElement
                              ).style.background = "#f5f2eb";
                          }}
                          onMouseLeave={(e) => {
                            if (selectedBook?.name !== book.name)
                              (
                                e.currentTarget as HTMLButtonElement
                              ).style.background = "transparent";
                          }}
                        >
                          <span
                            style={{
                              fontSize: 13.5,
                              fontWeight:
                                selectedBook?.name === book.name ? 800 : 500,
                              color:
                                selectedBook?.name === book.name
                                  ? "#1e3799"
                                  : "#1a1a2e",
                            }}
                          >
                            {book.name}
                          </span>
                          <span
                            style={{
                              fontSize: 10.5,
                              color: "#bbb",
                              fontWeight: 600,
                            }}
                          >
                            {book.chapters} ch
                          </span>
                        </button>
                      ))}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* end sidebar content */}
          </div>

          {/* ── Right: Reader ── */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              background: "#fafaf7",
            }}
          >
            {!selectedBook ? (
              /* Empty state */
              <div
                style={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "80px 24px",
                  textAlign: "center",
                  color: "#aaa",
                }}
              >
                <span
                  style={{ fontSize: 64, marginBottom: 20, display: "block" }}
                >
                  📖
                </span>
                <p
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    color: "#1a1a2e",
                    margin: "0 0 8px",
                  }}
                >
                  Select a book to begin reading
                </p>
                <p style={{ fontSize: 14, lineHeight: 1.6, maxWidth: 320 }}>
                  Choose any of the 73 books of the Catholic Bible from the
                  panel on the left.
                </p>
              </div>
            ) : (
              <>
                {/* Reader toolbar */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    padding: "14px 20px",
                    borderBottom: "1.5px solid #e8e2d8",
                    background: "#fff",
                    flexWrap: "wrap",
                  }}
                >
                  {/* Book + chapter title */}
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 800,
                        fontSize: 15,
                        color: "#1a1a2e",
                      }}
                    >
                      {selectedBook.name}
                    </p>
                    {selectedChapter && (
                      <p style={{ margin: 0, fontSize: 12, color: "#888" }}>
                        Chapter {selectedChapter} of {selectedBook.chapters}
                      </p>
                    )}
                  </div>

                  {/* Font size */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    <button
                      onClick={() => setFontSize((s) => Math.max(13, s - 1))}
                      style={toolBtnStyle}
                      title="Smaller text"
                    >
                      A−
                    </button>
                    <button
                      onClick={() => setFontSize((s) => Math.min(22, s + 1))}
                      style={toolBtnStyle}
                      title="Larger text"
                    >
                      A+
                    </button>
                  </div>

                  {/* TTS */}
                  {ttsSupported && (
                    <button
                      onClick={handleSpeak}
                      disabled={chapter.loading || chapter.verses.length === 0}
                      style={{
                        ...toolBtnStyle,
                        background: isSpeaking ? "#1e3799" : undefined,
                        color: isSpeaking ? "#fff" : undefined,
                        borderColor: isSpeaking ? "#1e3799" : undefined,
                      }}
                      title={isSpeaking ? "Stop reading" : "Read aloud"}
                    >
                      {isSpeaking ? "⏹ Stop" : "🔊 Listen"}
                    </button>
                  )}

                  {/* Prev / Next chapter */}
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() =>
                        setSelectedChapter((c) => (c && c > 1 ? c - 1 : c))
                      }
                      disabled={!selectedChapter || selectedChapter <= 1}
                      style={navBtnStyle}
                      title="Previous chapter"
                    >
                      ‹
                    </button>
                    <button
                      onClick={() =>
                        setSelectedChapter((c) =>
                          c && c < selectedBook.chapters ? c + 1 : c,
                        )
                      }
                      disabled={
                        !selectedChapter ||
                        selectedChapter >= selectedBook.chapters
                      }
                      style={navBtnStyle}
                      title="Next chapter"
                    >
                      ›
                    </button>
                  </div>
                </div>

                {/* Chapter selector grid */}
                <div
                  style={{
                    padding: "12px 20px",
                    borderBottom: "1.5px solid #e8e2d8",
                    background: "#fff",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  {Array.from(
                    { length: selectedBook.chapters },
                    (_, i) => i + 1,
                  ).map((ch) => (
                    <button
                      key={ch}
                      onClick={() => setSelectedChapter(ch)}
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 8,
                        border: "1.5px solid",
                        borderColor:
                          selectedChapter === ch ? "#1e3799" : "#e8e2d8",
                        background:
                          selectedChapter === ch ? "#1e3799" : "transparent",
                        color: selectedChapter === ch ? "#fff" : "#666",
                        fontWeight: selectedChapter === ch ? 800 : 500,
                        fontSize: 12.5,
                        cursor: "pointer",
                        transition: "all 0.15s",
                      }}
                    >
                      {ch}
                    </button>
                  ))}
                </div>

                {/* Verses */}
                <div
                  ref={readerRef}
                  style={{
                    padding: "28px 32px 60px",
                  }}
                >
                  {chapter.loading && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 12,
                      }}
                    >
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            height: 20,
                            borderRadius: 6,
                            background: "#e8e2d8",
                            width: `${70 + Math.random() * 28}%`,
                            animation: "pulse 1.4s ease-in-out infinite",
                          }}
                        />
                      ))}
                    </div>
                  )}

                  {chapter.error && (
                    <div
                      style={{
                        padding: "32px 24px",
                        textAlign: "center",
                        color: "#a93226",
                      }}
                    >
                      <p
                        style={{
                          fontSize: 16,
                          fontWeight: 700,
                          margin: "0 0 8px",
                        }}
                      >
                        Unable to load this chapter
                      </p>
                      <p style={{ fontSize: 13.5, color: "#888", margin: 0 }}>
                        Please check your connection and try again.
                      </p>
                    </div>
                  )}

                  {!chapter.loading &&
                    !chapter.error &&
                    chapter.verses.length > 0 && (
                      <>
                        <p
                          style={{
                            fontSize: 11,
                            fontWeight: 800,
                            color: "#C9A84C",
                            letterSpacing: "2px",
                            textTransform: "uppercase",
                            margin: "0 0 20px",
                          }}
                        >
                          {chapter.reference} · Douay-Rheims
                        </p>
                        <div style={{ lineHeight: 1.9 }}>
                          {chapter.verses.map((v) => (
                            <span key={v.verse}>
                              <sup
                                style={{
                                  fontSize: fontSize * 0.6,
                                  fontWeight: 800,
                                  color: "#1e3799",
                                  marginRight: 3,
                                  userSelect: "none",
                                }}
                              >
                                {v.verse}
                              </sup>
                              <span
                                style={{
                                  fontSize,
                                  color: "#2a2a2a",
                                  fontFamily: "Georgia, serif",
                                }}
                              >
                                {v.text}{" "}
                              </span>
                            </span>
                          ))}
                        </div>
                      </>
                    )}
                </div>
              </>
            )}
          </div>
        </div>
      </section>

      {/* ── Pulse animation for skeletons ── */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </AppLayout>
  );
}

const toolBtnStyle: React.CSSProperties = {
  padding: "6px 12px",
  borderRadius: 8,
  border: "1.5px solid #e8e2d8",
  background: "#fff",
  color: "#1a1a2e",
  fontWeight: 700,
  fontSize: 12.5,
  cursor: "pointer",
  transition: "all 0.15s",
  whiteSpace: "nowrap" as const,
};

const navBtnStyle: React.CSSProperties = {
  width: 34,
  height: 34,
  borderRadius: 8,
  border: "1.5px solid #e8e2d8",
  background: "#fff",
  color: "#1a1a2e",
  fontWeight: 700,
  fontSize: 18,
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  transition: "all 0.15s",
};
