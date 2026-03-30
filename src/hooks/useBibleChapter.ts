import { useState, useEffect } from "react";

export interface BibleVerse {
  chapter: number;
  verse: number;
  text: string;
}

export interface BibleChapterResult {
  reference: string;
  verses: BibleVerse[];
  loading: boolean;
  error: boolean;
}

export function useBibleChapter(
  slug: string | null,
  chapter: number | null,
): BibleChapterResult {
  const [result, setResult] = useState<BibleChapterResult>({
    reference: "",
    verses: [],
    loading: false,
    error: false,
  });

  useEffect(() => {
    if (!slug || !chapter) {
      setResult({ reference: "", verses: [], loading: false, error: false });
      return;
    }

    let cancelled = false;
    setResult({ reference: "", verses: [], loading: true, error: false });

    fetch(`https://bible-api.com/${slug}+${chapter}?translation=dra`)
      .then((r) => {
        if (!r.ok) throw new Error("fetch failed");
        return r.json();
      })
      .then((data) => {
        if (cancelled) return;
        const rawVerses = data.verses as Array<{
          chapter: number;
          verse: number;
          text: string;
        }>;
        const verses: BibleVerse[] = rawVerses.map((v) => ({
          chapter: v.chapter,
          verse: v.verse,
          text: v.text.trim().replace(/\n/g, " "),
        }));
        setResult({
          reference: data.reference as string,
          verses,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setResult({ reference: "", verses: [], loading: false, error: true });
      });

    return () => {
      cancelled = true;
    };
  }, [slug, chapter]);

  return result;
}
