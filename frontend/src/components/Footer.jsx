import React from "react";
import { useContent } from "../lib/i18n";

export default function Footer() {
  const c = useContent();
  const f = c.footer;
  return (
    <footer data-testid="footer" className="relative bg-[color:var(--ink-9)] text-[color:var(--ink-0)] border-t border-white/10">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10 py-16">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="font-display text-5xl sm:text-7xl lg:text-[120px] leading-[0.95] tracking-tight">
              {c.profile.nameShort}
              <span className="font-serif-italic text-[color:var(--accent)]">.</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-6 md:text-end">
            <div>
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-50">{f.sitemap}</div>
              <ul className="mt-4 space-y-2 text-[14px]">
                <li><a href="/#build" className="link-underline">{c.nav.build}</a></li>
                <li><a href="/#projects" className="link-underline">{c.nav.projects}</a></li>
                <li><a href="/#chat" className="link-underline">{c.nav.chat}</a></li>
                <li><a href="/#process" className="link-underline">{c.nav.process}</a></li>
                <li><a href="/#about" className="link-underline">{c.nav.about}</a></li>
                <li><a href="/#contact" className="link-underline">{c.nav.contactBtn}</a></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-50">{f.networks}</div>
              <ul className="mt-4 space-y-2 text-[14px]">
                <li><a href={c.shared.instagramUrl} target="_blank" rel="noreferrer" className="link-underline">Instagram · @{c.shared.instagramHandle}</a></li>
                <li><a href={`mailto:${c.shared.email}`} className="link-underline">Email · {c.shared.email}</a></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.2em] uppercase opacity-60">
          <div>© {new Date().getFullYear()} {c.profile.nameShort} — {f.rights}</div>
          <div className="hidden md:block">{c.shared.estRange}</div>
          <div>{f.built} · {c.profile.targetSchool}</div>
        </div>
      </div>
    </footer>
  );
}
