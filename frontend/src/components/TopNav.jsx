import React, { useEffect, useState } from "react";
import { profile } from "../lib/data";

export default function TopNav({ onContact }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="top-nav"
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <div
          className={`flex items-center justify-between gap-6 rounded-full px-5 sm:px-6 py-3 transition-all duration-500 ${
            scrolled ? "glass-dark text-[color:var(--ink-0)]" : "text-[color:var(--ink-0)]"
          }`}
        >
          <a
            href="#top"
            data-testid="nav-brand"
            className="flex items-center gap-3 font-display text-[15px] tracking-tight"
          >
            <span className="dot-accent" />
            <span>{profile.nameShort}</span>
            <span className="hidden sm:inline font-mono text-[10px] tracking-[0.2em] uppercase opacity-60">
              · Portfolio
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-7 font-mono text-[11px] tracking-[0.18em] uppercase">
            <a href="#build" className="link-underline" data-testid="nav-build">ما أبني</a>
            <a href="#projects" className="link-underline" data-testid="nav-projects">المشاريع</a>
            <a href="#process" className="link-underline" data-testid="nav-process">المنهج</a>
            <a href="#about" className="link-underline" data-testid="nav-about">عني</a>
          </nav>

          <button
            type="button"
            onClick={onContact}
            data-testid="nav-contact-btn"
            className="btn-pill btn-accent"
          >
            تواصل معي
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
}
