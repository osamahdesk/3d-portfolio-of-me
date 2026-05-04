import React from "react";
import Reveal from "./Reveal";
import { useContent } from "../lib/i18n";

export default function Process() {
  const c = useContent();
  return (
    <section id="process" data-testid="process-section" className="relative bg-[color:var(--ink-1)] text-[color:var(--ink-9)] py-28 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-6 mb-16 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="label-eyebrow mb-5">{c.processHeader.eyebrow}</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[64px] leading-[1.02] tracking-tight">
              {c.processHeader.titleA}<br />
              <span className="font-serif-italic text-[color:var(--ink-4)]">{c.processHeader.titleB}</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-end">
            <span className="chip">{c.processHeader.chip}</span>
          </div>
        </div>

        <ol className="relative">
          <div className="absolute top-0 bottom-0 end-0 md:end-[50%] w-[1px] bg-[color:var(--ink-2)]" />
          {c.processSteps.map((s, i) => (
            <Reveal key={s.n} delay={i * 80}>
              <li data-testid={`process-step-${s.n}`} className="relative grid grid-cols-12 gap-6 py-10 border-t border-[color:var(--ink-2)] first:border-t-0">
                <div className="col-span-12 md:col-span-5 flex items-center gap-5">
                  <span className="num-display text-[72px] leading-none">{s.n}</span>
                  <div>
                    <div className="label-eyebrow">step {s.n} / 04</div>
                    <h3 className="font-display text-3xl tracking-tight mt-2">{s.t}</h3>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-7 md:pe-8 text-[16px] leading-[1.9] text-[color:var(--ink-4)] max-w-lg">
                  {s.d}
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
