import React from "react";
import Reveal from "./Reveal";
import { projectHSK, projectAIBot } from "../lib/data";

function Stat({ n, l, i }) {
  return (
    <Reveal delay={i * 80}>
      <div className="py-6">
        <div className="num-display text-[44px] sm:text-[56px] leading-none">{n}</div>
        <div className="mt-2 text-[13px] leading-[1.7] text-[color:var(--ink-4)] max-w-[180px]">{l}</div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" data-testid="projects-section" className="relative bg-[color:var(--ink-0)] text-[color:var(--ink-9)] py-28 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">

        {/* Section heading */}
        <div className="grid grid-cols-12 gap-6 mb-20 items-end">
          <div className="col-span-12 md:col-span-7">
            <div className="label-eyebrow mb-5">المشاريع</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[64px] leading-[1.02] tracking-tight">
              من الفكرة إلى الإنتاج،
              <br />
              <span className="font-serif-italic text-[color:var(--ink-4)]">مشروع بعد الآخر.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:text-left">
            <p className="text-[15px] leading-[1.9] text-[color:var(--ink-4)] max-w-md md:ml-auto">
              مشاريع حقيقيّة بمستخدمين حقيقيّين — لا ديمو وهميّة، لا عروض مُرتّبة.
            </p>
          </div>
        </div>

        {/* ------- PROJECT 01 — HSK App ------- */}
        <article data-testid="project-hsk" className="relative bg-[color:var(--ink-9)] text-[color:var(--ink-0)] rounded-sm overflow-hidden">
          <div className="grid grid-cols-12 gap-0">
            {/* Left large panel */}
            <div className="col-span-12 lg:col-span-7 p-8 sm:p-12 lg:p-16 border-b lg:border-b-0 lg:border-l border-white/10">
              <div className="flex items-center justify-between">
                <span className="label-eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>
                  {projectHSK.codename}
                </span>
                <span className="chip" style={{ color: "var(--accent)", borderColor: "var(--accent)" }}>
                  Shipped · 2024
                </span>
              </div>
              <h3 className="font-display text-4xl sm:text-5xl lg:text-[72px] mt-10 leading-[1] tracking-tight">
                {projectHSK.name}
              </h3>
              <div className="mt-3 font-serif-italic text-2xl text-[color:var(--accent)]">
                {projectHSK.subName}
              </div>

              <p className="mt-8 text-[16px] leading-[1.95] max-w-xl opacity-85">
                {projectHSK.lead}
              </p>

              <div className="mt-10 flex flex-wrap gap-2">
                {projectHSK.stack.map((s) => (
                  <span key={s} className="chip" style={{ color: "var(--ink-0)" }}>
                    {s}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-x-10 gap-y-2 mt-10">
                {projectHSK.stats.map((s, i) => (
                  <div key={i} className="py-4 border-t border-white/10">
                    <div className="num-display text-4xl" style={{ color: "var(--accent)" }}>{s.n}</div>
                    <div className="mt-1 text-[12px] font-mono tracking-[0.12em] uppercase opacity-70">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right features panel */}
            <div className="col-span-12 lg:col-span-5 p-8 sm:p-12 lg:p-14 bg-[color:var(--ink-8)]">
              <div className="label-eyebrow mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>الميزات الأساسيّة</div>
              <ul className="space-y-5">
                {projectHSK.features.map((f, i) => (
                  <li key={i} className="group border-t border-white/10 pt-5 first:border-t-0 first:pt-0">
                    <div className="flex items-start gap-4">
                      <span className="num-display text-xl opacity-50 mt-1">0{i + 1}</span>
                      <div>
                        <div className="font-display text-xl tracking-tight group-hover:text-[color:var(--accent)] transition-colors">{f.t}</div>
                        <p className="text-[14px] leading-[1.85] opacity-75 mt-2 max-w-sm">{f.d}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </article>

        {/* ------- PROJECT 02 — AI BOT ------- */}
        <article data-testid="project-ai-bot" className="mt-16 grid grid-cols-12 gap-6 items-start">
          <div className="col-span-12 md:col-span-5">
            <div className="sticky top-32">
              <span className="label-eyebrow">{projectAIBot.codename}</span>
              <h3 className="font-display text-4xl sm:text-5xl lg:text-[64px] mt-6 leading-[1.02] tracking-tight">
                {projectAIBot.name}
              </h3>
              <div className="mt-3 font-serif-italic text-xl text-[color:var(--ink-4)]">
                {projectAIBot.subName}
              </div>
              <p className="mt-6 text-[15px] leading-[1.9] text-[color:var(--ink-4)] max-w-md">
                {projectAIBot.lead}
              </p>
              <div className="mt-8 inline-flex items-center gap-3 border border-[color:var(--ink-9)] rounded-full px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-[color:var(--brick)]" style={{ animation: "pulse 2s ease-in-out infinite" }} />
                <span className="font-mono text-[11px] tracking-[0.18em] uppercase">{projectAIBot.status}</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-7 space-y-6">
            {projectAIBot.visionItems.map((v, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="group relative p-8 bg-[color:var(--ink-1)] border border-[color:var(--ink-2)] transition-all hover:bg-[color:var(--ink-9)] hover:text-[color:var(--ink-0)]">
                  <div className="flex items-start gap-5">
                    <span className="num-display text-4xl opacity-40 group-hover:opacity-100 group-hover:text-[color:var(--accent)] transition">0{i + 1}</span>
                    <p className="text-[17px] leading-[1.85] max-w-lg">{v}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </article>
      </div>

      <style>{`
        @keyframes pulse { 0%,100% { opacity: .5 } 50% { opacity: 1 } }
      `}</style>
    </section>
  );
}
