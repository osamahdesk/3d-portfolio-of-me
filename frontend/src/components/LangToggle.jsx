import React from "react";
import { useLang } from "../lib/i18n";

export default function LangToggle({ tone = "dark" }) {
  const { lang, toggle, c } = useLang();
  const isDark = tone === "dark";
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={c.langToggle.aria}
      data-testid="lang-toggle"
      className={`group inline-flex items-center gap-2 rounded-full px-3 py-1.5 border transition-colors ${
        isDark
          ? "border-white/25 text-[color:var(--ink-0)] hover:bg-white/10"
          : "border-[color:var(--ink-9)]/30 text-[color:var(--ink-9)] hover:bg-black/5"
      }`}
    >
      <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${lang === "ar" ? "opacity-100" : "opacity-40"}`}>AR</span>
      <span className="w-[1px] h-3 bg-current opacity-30" />
      <span className={`font-mono text-[10px] tracking-[0.2em] uppercase ${lang === "en" ? "opacity-100" : "opacity-40"}`}>EN</span>
    </button>
  );
}
