import React, { useEffect, useRef, useState } from "react";
import { audienceStats, testimonials } from "../lib/data";

function useCountUp(target, start) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    // Extract numeric part while preserving prefix/suffix symbols
    const num = parseFloat(String(target).replace(/[^0-9.]/g, "")) || 0;
    const hasDecimal = String(target).includes(".");
    const prefix = String(target).startsWith("+") ? "+" : "";
    const suffixMatch = String(target).match(/[^\d.+]+$/);
    const suffix = suffixMatch ? suffixMatch[0] : "";

    let frame = 0;
    const totalFrames = 60;
    const step = () => {
      frame += 1;
      const p = Math.min(1, frame / totalFrames);
      const eased = 1 - Math.pow(1 - p, 3);
      const cur = num * eased;
      const text = hasDecimal ? cur.toFixed(1) : Math.round(cur).toString();
      setVal(`${prefix}${text}${suffix}`);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target]);
  return val || "0";
}

function StatItem({ n, l, start, i }) {
  const value = useCountUp(n, start);
  return (
    <div data-testid={`stat-${i}`} className="py-10 border-t border-white/10 flex items-start gap-6">
      <span className="font-mono text-[11px] tracking-[0.2em] uppercase opacity-50 mt-3">0{i + 1}</span>
      <div>
        <div className="num-display text-[64px] sm:text-[88px] leading-[0.95] tracking-tight">{value}</div>
        <div className="mt-3 text-[14px] leading-[1.7] opacity-70 max-w-[240px]">{l}</div>
      </div>
    </div>
  );
}

export default function Stats() {
  const sectionRef = useRef(null);
  const [start, setStart] = useState(false);
  const [tIndex, setTIndex] = useState(0);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStart(true)),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const id = setInterval(() => setTIndex((i) => (i + 1) % testimonials.length), 6500);
    return () => clearInterval(id);
  }, []);

  const t = testimonials[tIndex];

  return (
    <section
      ref={sectionRef}
      data-testid="stats-section"
      className="relative bg-[color:var(--ink-9)] text-[color:var(--ink-0)] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-6 mb-14 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="label-eyebrow mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>الأثر</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[64px] leading-[1.02] tracking-tight">
              أرقام حقيقيّة من
              <br />
              <span className="font-serif-italic text-[color:var(--accent)]">مستخدمين حقيقيّين.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-left opacity-70">
            <p className="text-[14px] leading-[1.85] max-w-xs md:ml-auto">
              قياسات محدَّثة من مشاريع الإنتاج — تُراجَع شهريًا مع نمو قاعدة المستخدمين.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-b border-white/10">
          {audienceStats.map((s, i) => (
            <StatItem key={i} n={s.n} l={s.l} start={start} i={i} />
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-20 grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="label-eyebrow mb-6" style={{ color: "rgba(255,255,255,0.5)" }}>من المجتمع</div>
            <blockquote
              key={tIndex}
              data-testid="testimonial-quote"
              className="font-serif-italic text-2xl sm:text-3xl lg:text-[40px] leading-[1.35] max-w-4xl"
              style={{ animation: "fadeSoft .7s ease both" }}
            >
              « {t.q} »
            </blockquote>
            <div className="mt-6 font-mono text-[12px] tracking-[0.2em] uppercase opacity-70">— {t.a}</div>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-left">
            <div className="flex md:justify-end gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  aria-label={`testimonial ${i + 1}`}
                  onClick={() => setTIndex(i)}
                  data-testid={`testimonial-dot-${i}`}
                  className={`h-[6px] rounded-full transition-all duration-500 ${
                    i === tIndex ? "w-10 bg-[color:var(--accent)]" : "w-3 bg-white/25"
                  }`}
                />
              ))}
            </div>
            <div className="mt-4 font-mono text-[11px] tracking-[0.2em] uppercase opacity-60 md:text-left">
              {String(tIndex + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeSoft { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </section>
  );
}
