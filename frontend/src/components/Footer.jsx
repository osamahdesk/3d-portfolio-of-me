import React from "react";
import { profile } from "../lib/data";

export default function Footer() {
  return (
    <footer data-testid="footer" className="relative bg-[color:var(--ink-9)] text-[color:var(--ink-0)] border-t border-white/10">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10 py-16">
        <div className="grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="font-display text-5xl sm:text-7xl lg:text-[120px] leading-[0.95] tracking-tight">
              {profile.nameShort}
              <span className="font-serif-italic text-[color:var(--accent)]">.</span>
            </div>
          </div>
          <div className="col-span-12 md:col-span-5 grid grid-cols-2 gap-6 md:text-left">
            <div>
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-50">الخريطة</div>
              <ul className="mt-4 space-y-2 text-[14px]">
                <li><a href="#build" className="link-underline">ما أبني</a></li>
                <li><a href="#projects" className="link-underline">المشاريع</a></li>
                <li><a href="#process" className="link-underline">المنهج</a></li>
                <li><a href="#about" className="link-underline">عن أسامة</a></li>
                <li><a href="#contact" className="link-underline">تواصل</a></li>
              </ul>
            </div>
            <div>
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-50">الشبكات</div>
              <ul className="mt-4 space-y-2 text-[14px]">
                {profile.socials.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} className="link-underline">{s.label} · {s.handle}</a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] tracking-[0.2em] uppercase opacity-60">
          <div>© {new Date().getFullYear()} {profile.nameShort} — All rights reserved</div>
          <div className="hidden md:block">{profile.estRange}</div>
          <div>Built with care · {profile.targetSchool}</div>
        </div>
      </div>
    </footer>
  );
}
