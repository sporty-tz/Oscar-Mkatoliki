import { createContext } from "react";

export type Language = "english" | "swahili" | "french";
export type Currency = "tsh" | "usd" | "gbp";

export interface AppSettingsContextValue {
  language: Language;
  setLanguage: (language: Language) => void;
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatMoney: (value: number, sourceCurrency?: Currency) => string;
}

export const AppSettingsContext = createContext<
  AppSettingsContextValue | undefined
>(undefined);
