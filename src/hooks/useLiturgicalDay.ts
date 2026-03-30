import { useState, useEffect } from "react";
import { Romcal } from "romcal";
import { GeneralRoman_En } from "@romcal/calendar.general-roman";

export interface LiturgicalDayInfo {
  feastName: string;
  season: string;
  seasonDisplay: string;
  color: string;
  colorHex: string;
  rank: string;
  loading: boolean;
}

const SEASON_DISPLAY: Record<string, string> = {
  ADVENT: "Season of Advent",
  CHRISTMASTIDE: "Christmas Time",
  EARLY_ORDINARY_TIME: "Ordinary Time",
  LATER_ORDINARY_TIME: "Ordinary Time",
  LENT: "Season of Lent",
  HOLY_WEEK: "Holy Week",
  EASTER: "Easter Time",
  PASCHAL_TRIDUUM: "Paschal Triduum",
};

const COLOR_HEX: Record<string, string> = {
  GREEN: "#2d6a4f",
  PURPLE: "#6c3483",
  WHITE: "#d4af37",
  RED: "#a93226",
  ROSE: "#c77dab",
  GOLD: "#d4af37",
};

export function useLiturgicalDay(): LiturgicalDayInfo {
  const [info, setInfo] = useState<LiturgicalDayInfo>({
    feastName: "",
    season: "",
    seasonDisplay: "",
    color: "GREEN",
    colorHex: "#2d6a4f",
    rank: "",
    loading: true,
  });

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const romcal = new Romcal({ localizedCalendar: GeneralRoman_En });
        const calendar = await romcal.generateCalendar();
        const today = new Date();
        const key = today.toISOString().split("T")[0]; // YYYY-MM-DD
        const days = calendar[key];
        if (!days || days.length === 0) throw new Error("no data");
        const day = days[0];
        const season = (day.seasons?.[0] as string) ?? "";
        const colorKey = (day.colors?.[0] as string) ?? "GREEN";
        if (!cancelled) {
          setInfo({
            feastName: day.name ?? "",
            season,
            seasonDisplay: SEASON_DISPLAY[season] ?? season,
            color: colorKey,
            colorHex: COLOR_HEX[colorKey] ?? "#2d6a4f",
            rank: day.rankName ?? "",
            loading: false,
          });
        }
      } catch {
        if (!cancelled) {
          setInfo((prev) => ({ ...prev, loading: false }));
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return info;
}
