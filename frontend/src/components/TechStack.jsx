import React from "react";
import { useContent } from "../lib/i18n";

export default function TechStack() {
  const c = useContent();
  const row = [...c.techStack, ...c.techStack];
  return (
    <section data-testid="tech-section" className="relative bg-[color:var(--ink-9)] text-[color:var(--ink-0)] py-20 overflow-hidden border-y border-white/5">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10 mb-10 flex items-end justify-between gap-6">
        <div>
          <div className="label-eyebrow mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{c.tech.eyebrow}</div>
          <h3 className="font-display text-2xl sm:text-3xl tracking-tight">{c.tech.title}</h3>
        </div>
        <div className="hidden md:block font-mono text-[11px] tracking-[0.22em] uppercase opacity-60">
          {c.tech.count(c.techStack.length)}
        </div>
      </div>

      <div className="relative w-full overflow-hidden py-6 border-y border-white/5">
        <div className="flex gap-16 whitespace-nowrap" style={{ animation: "scrollX 40s linear infinite" }}>
          {row.map((t, i) => (
            <span key={i} className="font-display text-3xl sm:text-5xl tracking-tight opacity-80 hover:opacity-100 hover:text-[color:var(--accent)] transition-colors" data-testid={`tech-${i}`}>
              {t}<span className="mx-8 opacity-30">◆</span>
            </span>
          ))}
        </div>
      </div>

      <style>{`@keyframes scrollX { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
