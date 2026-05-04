import React, { useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Toaster } from "sonner";
import { useContent, useLang } from "../lib/i18n";
import LangToggle from "../components/LangToggle";
import Reveal from "../components/Reveal";

export default function ProjectCase() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const c = useContent();
  const { lang } = useLang();

  // Select project by slug; each language has .slug on each project
  const project = slug === c.projectHSK.slug ? c.projectHSK : slug === c.projectAIBot.slug ? c.projectAIBot : null;

  useEffect(() => { window.scrollTo(0, 0); }, [slug]);

  if (!project) {
    return (
      <main dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className="min-h-screen grid place-items-center bg-[color:var(--ink-0)] text-[color:var(--ink-9)]">
        <div className="text-center">
          <h1 className="font-display text-4xl mb-4">404</h1>
          <Link to="/" className="btn-pill btn-dark">{c.case.backHome}</Link>
        </div>
      </main>
    );
  }

  const isHSK = slug === c.projectHSK.slug;
  const otherSlug = isHSK ? c.projectAIBot.slug : c.projectHSK.slug;
  const otherName = isHSK ? c.projectAIBot.name : c.projectHSK.name;
  const otherSub = isHSK ? c.projectAIBot.subName : c.projectHSK.subName;

  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className="bg-[color:var(--ink-0)] text-[color:var(--ink-9)]">
      {/* Top sub-nav */}
      <header className="fixed top-0 inset-x-0 z-40 py-5">
        <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
          <div className="flex items-center justify-between gap-4 rounded-full px-5 py-3 glass-dark text-[color:var(--ink-0)]">
            <button
              onClick={() => navigate("/")}
              data-testid="case-back-btn"
              className="flex items-center gap-2 font-mono text-[11px] tracking-[0.18em] uppercase hover:text-[color:var(--accent)] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={lang === "ar" ? "M5 12h14M12 5l7 7-7 7" : "M19 12H5M12 19l-7-7 7-7"} /></svg>
              {c.case.backHome}
            </button>
            <span className="hidden sm:block font-display text-[14px] tracking-tight">{c.profile.nameShort} · Portfolio</span>
            <LangToggle tone="dark" />
          </div>
        </div>
      </header>

      {/* HERO */}
      <section data-testid="case-hero" className="relative bg-[color:var(--ink-9)] text-[color:var(--ink-0)] min-h-[100vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-70"
          style={{
            background:
              `radial-gradient(60% 50% at 10% 0%, ${isHSK ? "rgba(209,255,58,0.14)" : "rgba(140,184,255,0.14)"} 0%, transparent 70%),
               radial-gradient(50% 40% at 100% 100%, rgba(196,74,42,0.12) 0%, transparent 70%)`,
          }}
        />
        <div className="absolute inset-0 grain opacity-60 pointer-events-none" />
        <div className="relative mx-auto max-w-[1320px] w-full px-6 sm:px-10 pb-20 pt-40">
          <div className="grid grid-cols-12 gap-6 items-end">
            <div className="col-span-12 md:col-span-8">
              <div className="label-eyebrow mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>{project.codename}</div>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-[128px] leading-[0.95] tracking-tight">
                {project.name}
              </h1>
              <div className="mt-4 font-serif-italic text-3xl text-[color:var(--accent)]">{project.subName}</div>
              <p className="mt-10 max-w-2xl text-[18px] leading-[1.9] opacity-85">
                {project.longLead || project.lead}
              </p>
            </div>
            <div className="col-span-12 md:col-span-4">
              <div className="space-y-5 border-s border-white/15 ps-6">
                <MetaRow label={c.case.status} value={project.status || c.projectsHeader.shipped} />
                <MetaRow label={c.case.role} value={c.case.roleVal} />
                <MetaRow label={c.case.duration} value={c.case.durationVal} />
                {project.hosting && <MetaRow label={c.case.hosting} value={project.hosting} />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW + STACK */}
      <section className="relative bg-[color:var(--ink-0)] py-24 sm:py-32">
        <div className="mx-auto max-w-[1320px] px-6 sm:px-10 grid grid-cols-12 gap-6">
          <div className="col-span-12 md:col-span-5">
            <div className="label-eyebrow mb-5">{c.case.overview}</div>
            <h2 className="font-display text-3xl sm:text-4xl tracking-tight leading-[1.1]">
              {project.lead}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-7">
            <div className="label-eyebrow mb-5">{c.case.stack}</div>
            <div className="flex flex-wrap gap-3">
              {project.stack.map((s) => (
                <span key={s} className="inline-flex items-center gap-2 px-4 py-2 bg-[color:var(--ink-1)] border border-[color:var(--ink-2)] font-mono text-[12px] tracking-[0.12em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--ink-9)]" />{s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STATS (HSK only) */}
      {isHSK && (
        <section className="relative bg-[color:var(--ink-9)] text-[color:var(--ink-0)] py-24">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="label-eyebrow mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>{c.case.results}</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border-s border-white/10">
              {project.stats.map((s, i) => (
                <Reveal key={i} delay={i * 80} className="border-e border-t border-b border-white/10 p-8">
                  <div className="num-display text-[64px] leading-none" style={{ color: "var(--accent)" }}>{s.n}</div>
                  <div className="mt-3 text-[13px] leading-[1.7] opacity-75 max-w-[220px]">{s.l}</div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FEATURES / CAPABILITIES */}
      <section className="relative bg-[color:var(--ink-1)] py-24 sm:py-32">
        <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
          <div className="label-eyebrow mb-10">
            {isHSK ? c.case.features : c.case.capabilities}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[1px] bg-[color:var(--ink-2)] border border-[color:var(--ink-2)]">
            {(isHSK ? project.features : project.capabilities).map((f, i) => (
              <Reveal key={i} delay={i * 80}>
                <article className="group bg-[color:var(--ink-0)] p-8 sm:p-10 min-h-[220px] flex flex-col transition-colors hover:bg-[color:var(--ink-9)] hover:text-[color:var(--ink-0)]">
                  <div className="flex items-start justify-between">
                    <span className="num-display text-5xl opacity-40 group-hover:opacity-100 group-hover:text-[color:var(--accent)] transition">0{i + 1}</span>
                  </div>
                  <h3 className="font-display text-2xl mt-6 tracking-tight">{f.t}</h3>
                  <p className="mt-3 text-[15px] leading-[1.9] opacity-80">{f.d}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE (HSK only) */}
      {isHSK && project.architecture && (
        <section className="relative bg-[color:var(--ink-0)] py-24 sm:py-32">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="label-eyebrow mb-10">{c.case.architecture}</div>
            <ol className="relative">
              <div className="absolute top-0 bottom-0 start-0 md:start-[48%] w-[1px] bg-[color:var(--ink-2)]" />
              {project.architecture.map((a, i) => (
                <Reveal key={i} delay={i * 60}>
                  <li className="grid grid-cols-12 gap-6 py-8 border-t border-[color:var(--ink-2)] first:border-t-0">
                    <div className="col-span-12 md:col-span-5 flex items-center gap-4">
                      <span className="num-display text-5xl">0{i + 1}</span>
                      <h3 className="font-display text-2xl tracking-tight">{a.t}</h3>
                    </div>
                    <div className="col-span-12 md:col-span-7 text-[16px] leading-[1.9] text-[color:var(--ink-4)] max-w-xl">
                      {a.d}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>
      )}

      {/* ROADMAP (AI Bot only) */}
      {!isHSK && project.roadmap && (
        <section className="relative bg-[color:var(--ink-0)] py-24 sm:py-32">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="label-eyebrow mb-10">{c.case.roadmap}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[1px] bg-[color:var(--ink-2)] border border-[color:var(--ink-2)]">
              {project.roadmap.map((r, i) => (
                <Reveal key={i} delay={i * 80}>
                  <article className="bg-[color:var(--ink-0)] p-8 min-h-[280px] flex flex-col justify-between">
                    <div>
                      <div className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-60">{r.q}</div>
                      <h3 className="font-display text-2xl mt-4 tracking-tight">{r.t}</h3>
                      <p className="mt-3 text-[14px] leading-[1.85] text-[color:var(--ink-4)]">{r.d}</p>
                    </div>
                    <div className="mt-6">
                      <span className="num-display text-5xl opacity-30">0{i + 1}</span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* LEARNINGS (HSK only) */}
      {isHSK && project.learnings && (
        <section className="relative bg-[color:var(--ink-9)] text-[color:var(--ink-0)] py-24">
          <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
            <div className="label-eyebrow mb-10" style={{ color: "rgba(255,255,255,0.5)" }}>{c.case.learnings}</div>
            <ul className="space-y-4 max-w-4xl">
              {project.learnings.map((l, i) => (
                <Reveal key={i} delay={i * 60}>
                  <li className="flex items-start gap-5 border-t border-white/10 pt-5">
                    <span className="num-display text-4xl opacity-50">0{i + 1}</span>
                    <p className="font-serif-italic text-2xl leading-[1.4]">{l}</p>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* NEXT PROJECT */}
      <section className="relative bg-[color:var(--ink-0)] py-24">
        <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
          <div className="label-eyebrow mb-6">{c.case.nextProject}</div>
          <Link
            to={`/projects/${otherSlug}`}
            data-testid="case-next-link"
            className="group flex items-center justify-between border-t border-b border-[color:var(--ink-9)] py-10 hover:bg-[color:var(--ink-9)] hover:text-[color:var(--ink-0)] transition-colors"
          >
            <div>
              <div className="font-display text-4xl sm:text-6xl lg:text-[88px] tracking-tight leading-none">{otherName}</div>
              <div className="mt-3 font-serif-italic text-xl opacity-70">{otherSub}</div>
            </div>
            <svg className="flex-shrink-0" width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d={lang === "ar" ? "M19 12H5M12 19l-7-7 7-7" : "M5 12h14M12 5l7 7-7 7"} />
            </svg>
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="relative bg-[color:var(--ink-9)] text-[color:var(--ink-0)] py-20">
        <div className="mx-auto max-w-[1320px] px-6 sm:px-10 flex items-center justify-between gap-6 flex-wrap">
          <h3 className="font-display text-3xl sm:text-4xl tracking-tight">
            {lang === "ar" ? "تواصل معي مباشرة على انستقرام" : "Reach me directly on Instagram"}
          </h3>
          <a
            href={c.shared.instagramUrl}
            target="_blank"
            rel="noreferrer"
            data-testid="case-instagram-btn"
            className="btn-pill btn-accent"
          >
            @{c.shared.instagramHandle}
          </a>
        </div>
      </section>

      <Toaster position="top-center" richColors closeButton />
    </main>
  );
}

function MetaRow({ label, value }) {
  return (
    <div>
      <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-50">{label}</div>
      <div className="font-display text-lg mt-2 tracking-tight">{value}</div>
    </div>
  );
}
