import { useState, useEffect } from "react";

export interface DailyVerse {
  text: string;
  reference: string;
  translation: string;
  occasion: string;
  loading: boolean;
  error: boolean;
}

// Curated liturgically relevant verse references (Douay-Rheims)
// Rotates based on the day of the year mod the array length
const VERSE_REFERENCES = [
  "john+3:16",
  "psalm+23:1-3",
  "romans+8:28",
  "philippians+4:13",
  "isaiah+40:31",
  "matthew+11:28",
  "john+14:6",
  "jeremiah+29:11",
  "psalm+46:1",
  "romans+8:38-39",
  "matthew+5:3-4",
  "john+1:14",
  "psalm+27:1",
  "galatians+2:20",
  "1+corinthians+13:4-7",
  "matthew+28:19-20",
  "john+15:5",
  "luke+1:37",
  "psalm+91:1-2",
  "hebrews+11:1",
  "james+1:17",
  "1+john+4:8",
  "romans+5:8",
  "ephesians+2:8-9",
  "matthew+6:33",
  "psalm+118:24",
  "john+11:25",
  "colossians+3:17",
  "2+corinthians+5:17",
  "matthew+22:37-39",
];

function getDailyReference(): string {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const dayOfYear = Math.floor(diff / (1000 * 60 * 60 * 24));
  return VERSE_REFERENCES[dayOfYear % VERSE_REFERENCES.length];
}

// Liturgically appropriate occasion labels by liturgical season
function getOccasionLabel(season: string): string {
  const map: Record<string, string> = {
    LENT: "Season of Lent",
    HOLY_WEEK: "Holy Week",
    EASTER: "Easter Time",
    ADVENT: "Season of Advent",
    CHRISTMASTIDE: "Christmas Time",
    EARLY_ORDINARY_TIME: "Ordinary Time",
    LATER_ORDINARY_TIME: "Ordinary Time",
  };
  return map[season] || "Word of the Day";
}

export function useDailyVerse(liturgicalSeason?: string): DailyVerse {
  const [verse, setVerse] = useState<DailyVerse>({
    text: "",
    reference: "",
    translation: "",
    occasion: "",
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;
    const ref = getDailyReference();
    const occasion = getOccasionLabel(liturgicalSeason ?? "");
    fetch(`https://bible-api.com/${ref}?translation=dra`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const text: string = (data.text as string).trim().replace(/\n/g, " ");
        const reference: string = data.reference as string;
        setVerse({
          text,
          reference,
          translation: "Douay-Rheims",
          occasion,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setVerse((prev) => ({ ...prev, loading: false, error: true }));
      });
    return () => {
      cancelled = true;
    };
  }, [liturgicalSeason]);

  return verse;
}
