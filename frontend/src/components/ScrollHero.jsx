import React, { useEffect, useRef, useState } from "react";
import { heroCues, profile } from "../lib/data";

/**
 * ScrollHero
 * - Sticky-pinned full-screen hero
 * - Video currentTime is driven by scroll progress within the pinned section
 * - Overlay text switches across 4 cue points
 */
export default function ScrollHero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const [progress, setProgress] = useState(0); // 0..1
  const [ready, setReady] = useState(false);
  const rafRef = useRef(0);
  const targetTimeRef = useRef(0);

  // Preload + pause autoplay so we can scrub manually
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    const onMeta = () => {
      // Force the first frame to render (Chrome needs a non-zero currentTime)
      try {
        if (v.currentTime === 0) v.currentTime = 0.05;
      } catch (_) { /* ignore */ }
      setReady(true);
    };
    v.addEventListener("loadedmetadata", onMeta);
    v.addEventListener("canplay", onMeta);
    // Also try to play briefly to guarantee paint on some browsers, then pause
    const prime = async () => {
      try {
        await v.play();
        v.pause();
        v.currentTime = 0.05;
      } catch (_) { /* autoplay blocked — safe to ignore */ }
    };
    prime();
    return () => {
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("canplay", onMeta);
    };
  }, []);

  // Scroll handler computes progress across the pinned section.
  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const tick = () => {
      if (!video.duration || isNaN(video.duration)) {
        rafRef.current = 0;
        return;
      }
      // Smoothly approach target time to avoid jitter
      const cur = video.currentTime;
      const target = targetTimeRef.current;
      const delta = target - cur;
      if (Math.abs(delta) < 0.02) {
        video.currentTime = target;
      } else {
        video.currentTime = cur + delta * 0.2;
      }
      if (Math.abs(target - video.currentTime) > 0.02) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = 0;
      }
    };

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // Section height = 300vh, sticky child = 100vh.
      // When top <= 0 and bottom > vh, we're pinning.
      const scrollableHeight = section.offsetHeight - vh;
      const scrolled = Math.min(
        Math.max(-rect.top, 0),
        scrollableHeight
      );
      const p = scrollableHeight > 0 ? scrolled / scrollableHeight : 0;
      setProgress(p);

      if (video.duration && !prefersReduced) {
        targetTimeRef.current = Math.max(
          0,
          Math.min(video.duration - 0.05, p * video.duration)
        );
        if (!rafRef.current) rafRef.current = requestAnimationFrame(tick);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ready]);

  // Pick the active cue based on progress
  const cueIndex = Math.min(
    heroCues.length - 1,
    Math.floor(progress * heroCues.length * 0.999)
  );
  const activeCue = heroCues[cueIndex];

  const pct = Math.round(progress * 100);

  return (
    <section
      ref={sectionRef}
      id="top"
      data-testid="hero-section"
      className="relative"
      style={{ height: "320vh", background: "var(--ink-9)" }}
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Video layer */}
        <div className="absolute inset-0 video-fade">
          <video
            ref={videoRef}
            data-testid="hero-video"
            className="absolute inset-0 w-full h-full object-cover"
            src="/media/hero.mp4"
            muted
            playsInline
            preload="auto"
            poster=""
          />
        </div>

        {/* Grain & vignette */}
        <div className="absolute inset-0 grain pointer-events-none" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 40%, rgba(0,0,0,0) 0%, rgba(0,0,0,0.35) 70%, rgba(0,0,0,0.75) 100%)",
          }}
        />

        {/* Side rails */}
        <div className="absolute top-24 right-6 hidden lg:block text-[color:var(--ink-0)]/70">
          <div className="side-rail">{profile.estRange}</div>
        </div>
        <div className="absolute top-24 left-6 hidden lg:block text-[color:var(--ink-0)]/70">
          <div className="side-rail">{profile.basedShort}</div>
        </div>

        {/* Overlay content */}
        <div className="relative z-10 h-full w-full text-[color:var(--ink-0)]">
          <div className="mx-auto max-w-[1320px] h-full px-6 sm:px-10 pt-28 pb-10 flex flex-col justify-between">
            {/* Top row */}
            <div className="flex items-start justify-between gap-6">
              <div className="max-w-xl">
                <div className="flex items-center gap-3">
                  <span className="dot-accent" />
                  <span className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-80">
                    {profile.nameLatin} · {profile.nameShort}
                  </span>
                </div>
                <p className="mt-6 font-display text-[13px] leading-[1.8] opacity-80 max-w-md">
                  {profile.tagline}. ملف شخصي يعرض المسيرة الأكاديميّة، المشاريع التقنيّة، والرؤية المستقبليّة.
                </p>
              </div>

              <div className="hidden md:flex flex-col items-end gap-2 text-right">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-70">الموقع الحالي</span>
                <span className="font-serif-italic text-xl">طالب · باحث</span>
              </div>
            </div>

            {/* Main title — switches by cue */}
            <div className="grid grid-cols-12 gap-6 items-end">
              <div className="col-span-12 md:col-span-9">
                <div className="label-eyebrow mb-4" data-testid="hero-eyebrow">
                  {activeCue.eyebrow}
                </div>
                <h1
                  key={cueIndex}
                  data-testid="hero-title"
                  className="font-display text-[44px] sm:text-[64px] lg:text-[96px] leading-[0.98] tracking-tight"
                  style={{ animation: "fadeSlide .9s ease both" }}
                >
                  <span className="shine">{activeCue.title}</span>
                  <br />
                  <span className="font-serif-italic opacity-90">{activeCue.italic}</span>
                </h1>
              </div>

              <div className="col-span-12 md:col-span-3 flex flex-col items-start md:items-end gap-6">
                {/* Scroll progress bar */}
                <div className="w-full flex items-center gap-3" data-testid="hero-progress">
                  <span className="font-mono text-[11px] tracking-[0.22em] uppercase opacity-70">
                    {String(pct).padStart(2, "0")}%
                  </span>
                  <div className="h-[2px] bg-white/20 flex-1">
                    <div
                      className="h-full bg-[color:var(--accent)]"
                      style={{ width: `${pct}%`, transition: "width .2s linear" }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {heroCues.map((_, i) => (
                    <span
                      key={i}
                      className={`h-[6px] rounded-full transition-all duration-500 ${
                        i === cueIndex ? "w-8 bg-[color:var(--accent)]" : "w-3 bg-white/25"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex items-center gap-3 mt-2">
                  <a
                    href="#projects"
                    className="btn-pill btn-accent"
                    data-testid="hero-cta-projects"
                  >
                    شاهد المشاريع
                  </a>
                  <a
                    href="#about"
                    className="btn-pill btn-light"
                    data-testid="hero-cta-about"
                    style={{ background: "transparent", color: "var(--ink-0)", borderColor: "rgba(255,255,255,0.4)" }}
                  >
                    عن أسامة
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom marquee strip */}
            <div className="border-t border-white/10 pt-6 flex items-center justify-between gap-6 text-white/70">
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase">
                مرّر للاستكشاف
              </div>
              <div className="hidden md:flex items-center gap-8 font-mono text-[11px] tracking-[0.22em] uppercase">
                <span>React · Node · MongoDB</span>
                <span className="opacity-40">/</span>
                <span>Python · NLP · Agents</span>
                <span className="opacity-40">/</span>
                <span>{profile.targetSchool}</span>
              </div>
              <div className="font-mono text-[11px] tracking-[0.22em] uppercase flex items-center gap-2">
                <span className="w-1 h-4 bg-[color:var(--accent)] inline-block" style={{ animation: "scrollDot 1.6s ease-in-out infinite" }}></span>
                Scroll
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Keyframes for title transition */}
      <style>{`
        @keyframes fadeSlide {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
