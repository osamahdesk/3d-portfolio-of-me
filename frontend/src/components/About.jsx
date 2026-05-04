import React from "react";
import Reveal from "./Reveal";
import { useContent } from "../lib/i18n";

export default function About() {
  const c = useContent();
  const a = c.about;
  return (
    <section id="about" data-testid="about-section" className="relative bg-[color:var(--ink-0)] text-[color:var(--ink-9)] py-28 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-6 items-start">
          <Reveal className="col-span-12 md:col-span-5">
            <div className="relative aspect-[4/5] w-full bg-[color:var(--ink-9)] text-[color:var(--ink-0)] overflow-hidden">
              <div className="absolute inset-0 grain opacity-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <span className="font-serif-italic text-[22px] opacity-80">{a.portraitLabel}</span>
                <div className="font-display text-[140px] sm:text-[180px] leading-none mt-4">
                  {c.lang === "ar" ? "أ" : "O"}
                </div>
                <div className="font-display text-2xl mt-4 tracking-tight">{c.profile.nameShort}</div>
                <div className="mt-2 font-mono text-[11px] tracking-[0.22em] uppercase opacity-70">{c.profile.nameLatin}</div>
              </div>
              <div className="absolute top-4 start-4 side-rail" style={{ color: "rgba(255,255,255,0.6)" }}>Est. 2022</div>
              <div className="absolute bottom-4 end-4 font-mono text-[11px] tracking-[0.22em] uppercase opacity-70">01 / 01</div>
            </div>
          </Reveal>

          <div className="col-span-12 md:col-span-7">
            <div className="label-eyebrow mb-5">{a.eyebrow}</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[64px] leading-[1.02] tracking-tight">
              {a.titleA}<br />
              <span className="font-serif-italic text-[color:var(--ink-4)]">{a.titleB}</span>
            </h2>

            <p className="mt-8 text-[17px] leading-[1.95] max-w-2xl">
              {a.body(c.profile.targetSchool)}
            </p>

            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-6">
              <Fact label={a.facts.academic} value={c.profile.targetSchool} />
              <Fact label={a.facts.specialties} value={a.facts.specialtiesVal} />
              <Fact label={a.facts.prev} value={a.facts.prevVal} />
              <Fact label={a.facts.languages} value={a.facts.languagesVal} />
              <Fact label={a.facts.location} value={c.profile.basedShort} />
              <Fact label={a.facts.status} value={a.facts.statusVal} />
            </div>

            <div className="mt-14">
              <div className="label-eyebrow mb-5">{a.skillsEyebrow}</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {a.languages.map((l) => (
                  <div key={l.code} data-testid={`lang-${l.code}`} className="border border-[color:var(--ink-2)] p-5 bg-[color:var(--ink-1)]">
                    <div className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-60">{l.code}</div>
                    <div className="font-display text-2xl mt-2 tracking-tight">{l.name}</div>
                    <div className="mt-2 text-[13px] leading-[1.7] opacity-80">{l.level}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({ label, value }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-50">{label}</div>
      <div className="font-display text-lg mt-2 tracking-tight">{value}</div>
    </div>
  );
}
