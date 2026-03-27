import { type ReactNode, useEffect, useMemo, useRef, useState } from "react";
import {
  AppSettingsContext,
  type AppSettingsContextValue,
  type Currency,
  type Language,
} from "./AppSettingsStore";

const STORAGE_KEY = "oscalius_app_settings";
const SETTINGS_LOCK_ATTR = "data-settings-lock";

const currencyMeta: Record<
  Currency,
  { code: string; symbol: string; locale: string }
> = {
  tsh: { code: "TZS", symbol: "TSh", locale: "en-TZ" },
  usd: { code: "USD", symbol: "$", locale: "en-US" },
  gbp: { code: "GBP", symbol: "GBP", locale: "en-GB" },
};

const rateToTzs: Record<Currency, number> = {
  tsh: 1,
  usd: 2600,
  gbp: 3300,
};

const translations: Record<
  Exclude<Language, "english">,
  Record<string, string>
> = {
  swahili: {
    "Welcome to Oscalius, Your Catholic Online Store!":
      "Karibu Oscalius, Duka lako la Kikatoliki mtandaoni!",
    "Search anything...": "Tafuta chochote...",
    "Search Anything...": "Tafuta chochote...",
    "total price": "jumla ya bei",
    join: "jiunge",
    offers: "ofa",
    "need help": "unahitaji msaada",
    "contact us": "wasiliana nasi",
    Home: "Nyumbani",
    Shop: "Duka",
    Collections: "Mikusanyiko",
    Company: "Kampuni",
    Account: "Akaunti",
    Blog: "Blogu",
    "All Products": "Bidhaa zote",
    "Latest Offers": "Ofa za hivi karibuni",
    "Featured Brands": "Bidhaa bora",
    "Browse Categories": "Vinjari makundi",
    "Your Orders": "Maagizo yako",
    Explore: "Gundua",
    "About Us": "Kuhusu sisi",
    Contact: "Mawasiliano",
    "Help Center": "Kituo cha msaada",
    "Latest Articles": "Makala za hivi karibuni",
    "Create Account": "Fungua akaunti",
    "My Profile": "Wasifu wangu",
    "Reset Password": "Weka upya nenosiri",
    "Change Password": "Badili nenosiri",
    Checkout: "Malipo",
    "Order History": "Historia ya oda",
    Wishlist: "Orodha ya matamanio",
    Compare: "Linganisha",
    "privacy policy": "sera ya faragha",
    "about our company": "kuhusu kampuni yetu",
    about: "kuhusu",
    faq: "maswali",
    contact: "mawasiliano",
    shop: "duka",
    blog: "blogu",
    "send message": "tuma ujumbe",
    "Drop Your Thoughts": "Tuambie mawazo yako",
    "Your Name": "Jina lako",
    "Your Email": "Barua pepe yako",
    "Your Subject": "Mada yako",
    "Your Message": "Ujumbe wako",
    "Get 20% Discount for Subscriber": "Pata punguzo la 20% kwa msajili",
    Subscribe: "Jiandikishe",
    "our team members": "wanachama wa timu yetu",
    "Founder & CEO": "Mwanzilishi na CEO",
    "Web developer": "Msanidi wa tovuti",
    "graphics designer": "Mbunifu wa picha",
    "digital marketer": "Mtaalamu wa masoko ya kidijitali",
  },
  french: {
    "Welcome to Oscalius, Your Catholic Online Store!":
      "Bienvenue sur Oscalius, votre boutique catholique en ligne!",
    "Search anything...": "Recherchez n'importe quoi...",
    "Search Anything...": "Recherchez n'importe quoi...",
    "total price": "prix total",
    join: "rejoindre",
    offers: "offres",
    "need help": "besoin d'aide",
    "contact us": "contactez-nous",
    Home: "Accueil",
    Shop: "Boutique",
    Collections: "Collections",
    Company: "Entreprise",
    Account: "Compte",
    Blog: "Blog",
    "All Products": "Tous les produits",
    "Latest Offers": "Dernières offres",
    "Featured Brands": "Marques en vedette",
    "Browse Categories": "Parcourir les catégories",
    "Your Orders": "Vos commandes",
    Explore: "Découvrir",
    "About Us": "À propos",
    Contact: "Contact",
    "Help Center": "Centre d'aide",
    "Latest Articles": "Derniers articles",
    "Create Account": "Créer un compte",
    "My Profile": "Mon profil",
    "Reset Password": "Réinitialiser le mot de passe",
    "Change Password": "Changer le mot de passe",
    Checkout: "Paiement",
    "Order History": "Historique des commandes",
    Wishlist: "Favoris",
    Compare: "Comparer",
    "privacy policy": "politique de confidentialité",
    "about our company": "à propos de notre entreprise",
    about: "à propos",
    faq: "faq",
    contact: "contact",
    shop: "boutique",
    blog: "blog",
    "send message": "envoyer le message",
    "Drop Your Thoughts": "Partagez vos idées",
    "Your Name": "Votre nom",
    "Your Email": "Votre e-mail",
    "Your Subject": "Votre sujet",
    "Your Message": "Votre message",
    "Get 20% Discount for Subscriber":
      "Obtenez 20% de réduction pour les abonnés",
    Subscribe: "S'abonner",
    "our team members": "nos membres d'équipe",
    "Founder & CEO": "Fondateur & PDG",
    "Web developer": "Développeur web",
    "graphics designer": "Designer graphique",
    "digital marketer": "Responsable marketing digital",
  },
};

function getInitialSettings(): { language: Language; currency: Currency } {
  if (typeof window === "undefined") {
    return { language: "english", currency: "tsh" };
  }

  const savedRaw = localStorage.getItem(STORAGE_KEY);
  if (!savedRaw) {
    return { language: "english", currency: "tsh" };
  }

  try {
    const parsed = JSON.parse(savedRaw) as {
      language?: Language;
      currency?: Currency;
    };

    return {
      language: parsed.language ?? "english",
      currency: parsed.currency ?? "tsh",
    };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return { language: "english", currency: "tsh" };
  }
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function translateText(input: string, language: Language): string {
  if (language === "english") {
    return input;
  }

  const dictionary = translations[language];
  const entries = Object.entries(dictionary).sort(
    (a, b) => b[0].length - a[0].length,
  );

  return entries.reduce((result, [from, to]) => {
    const regex = new RegExp(escapeRegExp(from), "g");
    return result.replace(regex, to);
  }, input);
}

function parseCurrencySymbol(symbol: string): Currency | null {
  const normalized = symbol.toLowerCase();
  if (normalized === "$" || normalized === "usd") {
    return "usd";
  }
  if (normalized === "£" || normalized === "gbp") {
    return "gbp";
  }
  if (normalized === "tsh" || normalized === "tzs") {
    return "tsh";
  }
  return null;
}

function convertCurrencyInText(
  input: string,
  targetCurrency: Currency,
): string {
  const moneyRegex =
    /(Tsh|TSH|TZS|\$|USD|GBP|£)\s*([0-9]+(?:,[0-9]{3})*(?:\.[0-9]+)?)/g;

  return input.replace(moneyRegex, (_, symbol: string, rawAmount: string) => {
    const sourceCurrency = parseCurrencySymbol(symbol);
    if (!sourceCurrency) {
      return `${symbol}${rawAmount}`;
    }

    const amount = Number(rawAmount.replace(/,/g, ""));
    if (!Number.isFinite(amount)) {
      return `${symbol}${rawAmount}`;
    }

    const amountInTzs = amount * rateToTzs[sourceCurrency];
    const converted = amountInTzs / rateToTzs[targetCurrency];
    const targetMeta = currencyMeta[targetCurrency];

    const formatted = new Intl.NumberFormat(targetMeta.locale, {
      minimumFractionDigits: targetCurrency === "tsh" ? 0 : 2,
      maximumFractionDigits: targetCurrency === "tsh" ? 0 : 2,
    }).format(converted);

    return `${targetMeta.symbol}${formatted}`;
  });
}

function shouldTransformText(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) {
    return false;
  }

  return /[A-Za-z]|(Tsh|TSH|TZS|USD|GBP|\$|£)/.test(trimmed);
}

function shouldSkipNode(element: Element | null): boolean {
  if (!element) {
    return true;
  }

  if (element.closest(`[${SETTINGS_LOCK_ATTR}="true"]`)) {
    return true;
  }

  return [
    "SCRIPT",
    "STYLE",
    "NOSCRIPT",
    "INPUT",
    "TEXTAREA",
    "SELECT",
    "OPTION",
  ].includes(element.tagName);
}

function walkTextNodes(root: Node, visit: (textNode: Text) => void) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let node = walker.nextNode();

  while (node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const parentTag = node.parentElement?.tagName;
      if (parentTag && !["SCRIPT", "STYLE", "NOSCRIPT"].includes(parentTag)) {
        visit(node as Text);
      }
    }
    node = walker.nextNode();
  }
}

export function AppSettingsProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(
    () => getInitialSettings().language,
  );
  const [currency, setCurrency] = useState<Currency>(
    () => getInitialSettings().currency,
  );

  const originalTextMapRef = useRef(new WeakMap<Text, string>());
  const originalAttrMapRef = useRef(
    new WeakMap<Element, Map<string, string>>(),
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ language, currency }));
  }, [language, currency]);

  useEffect(() => {
    document.documentElement.lang =
      language === "english" ? "en" : language === "swahili" ? "sw" : "fr";

    const applyTransformToNode = (textNode: Text) => {
      if (shouldSkipNode(textNode.parentElement)) {
        return;
      }

      const original =
        originalTextMapRef.current.get(textNode) ?? textNode.textContent ?? "";

      if (!originalTextMapRef.current.has(textNode)) {
        originalTextMapRef.current.set(textNode, original);
      }

      if (!shouldTransformText(original)) {
        return;
      }

      const translated = translateText(original, language);
      const converted = convertCurrencyInText(translated, currency);

      if (textNode.textContent !== converted) {
        textNode.textContent = converted;
      }
    };

    const applyTransformToElementAttributes = (element: Element) => {
      if (shouldSkipNode(element)) {
        return;
      }

      const attrsToTransform = ["placeholder", "title", "aria-label"];
      let attrMap = originalAttrMapRef.current.get(element);

      if (!attrMap) {
        attrMap = new Map<string, string>();
        originalAttrMapRef.current.set(element, attrMap);
      }

      attrsToTransform.forEach((attr) => {
        const currentValue = element.getAttribute(attr);
        if (!currentValue) {
          return;
        }

        if (!attrMap?.has(attr)) {
          attrMap?.set(attr, currentValue);
        }

        const originalValue = attrMap?.get(attr) ?? currentValue;
        if (!shouldTransformText(originalValue)) {
          return;
        }

        const translated = translateText(originalValue, language);
        const converted = convertCurrencyInText(translated, currency);
        if (converted !== currentValue) {
          element.setAttribute(attr, converted);
        }
      });
    };

    const transformSubtree = (root: Node) => {
      if (root.nodeType === Node.ELEMENT_NODE) {
        const rootElement = root as Element;
        applyTransformToElementAttributes(rootElement);
        rootElement
          .querySelectorAll("*")
          .forEach((child) => applyTransformToElementAttributes(child));
      }

      walkTextNodes(root, applyTransformToNode);
    };

    transformSubtree(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        if (
          mutation.type === "characterData" &&
          mutation.target.nodeType === Node.TEXT_NODE
        ) {
          applyTransformToNode(mutation.target as Text);
          continue;
        }

        if (mutation.type === "childList") {
          mutation.addedNodes.forEach((addedNode) => {
            if (addedNode.nodeType === Node.TEXT_NODE) {
              applyTransformToNode(addedNode as Text);
              return;
            }

            transformSubtree(addedNode);
          });
        }
      }
    });

    observer.observe(document.body, {
      subtree: true,
      childList: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, [language, currency]);

  const value = useMemo<AppSettingsContextValue>(
    () => ({
      language,
      setLanguage,
      currency,
      setCurrency,
      formatMoney: (value: number, sourceCurrency: Currency = "usd") => {
        const amountInTzs = value * rateToTzs[sourceCurrency];
        const targetAmount = amountInTzs / rateToTzs[currency];
        const meta = currencyMeta[currency];
        const formatted = new Intl.NumberFormat(meta.locale, {
          minimumFractionDigits: currency === "tsh" ? 0 : 2,
          maximumFractionDigits: currency === "tsh" ? 0 : 2,
        }).format(targetAmount);
        return `${meta.symbol}${formatted}`;
      },
    }),
    [language, currency],
  );

  return (
    <AppSettingsContext.Provider value={value}>
      {children}
    </AppSettingsContext.Provider>
  );
}
