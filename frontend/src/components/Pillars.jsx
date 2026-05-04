import React from "react";
import Reveal from "./Reveal";
import { useContent } from "../lib/i18n";

export default function Pillars() {
  const c = useContent();
  return (
    <section id="build" data-testid="pillars-section" className="relative bg-[color:var(--ink-0)] text-[color:var(--ink-9)] py-28 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="label-eyebrow mb-5">{c.pillarsHeader.eyebrow}</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[64px] leading-[1.02] tracking-tight">
              {c.pillarsHeader.titleA}<br />
              <span className="font-serif-italic text-[color:var(--ink-4)]">{c.pillarsHeader.titleB}</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-end">
            <p className="text-[15px] leading-[1.9] text-[color:var(--ink-4)] max-w-md md:ms-auto">
              {c.pillarsHeader.lead}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[color:var(--ink-2)] border border-[color:var(--ink-2)]">
          {c.pillars.map((p, i) => (
            <Reveal key={p.n} delay={i * 80}>
              <article
                data-testid={`pillar-${p.n}`}
                className="group bg-[color:var(--ink-0)] p-8 sm:p-10 min-h-[320px] flex flex-col justify-between transition-colors duration-500 hover:bg-[color:var(--ink-9)] hover:text-[color:var(--ink-0)]"
              >
                <div>
                  <div className="flex items-start justify-between">
                    <span className="num-display text-[72px] leading-none opacity-40 group-hover:opacity-100 transition-opacity">{p.n}</span>
                    <span className="label-eyebrow group-hover:text-[color:var(--accent)] transition-colors">Pillar · {p.n}</span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl mt-8 tracking-tight">{p.title}</h3>
                  <p className="mt-4 text-[15px] leading-[1.9] opacity-80 max-w-md">{p.body}</p>
                </div>
                <div className="mt-8 flex flex-wrap gap-2">
                  {p.tags.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
