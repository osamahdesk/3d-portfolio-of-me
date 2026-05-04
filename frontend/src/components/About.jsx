import React from "react";
import Reveal from "./Reveal";
import { profile } from "../lib/data";

export default function About() {
  return (
    <section id="about" data-testid="about-section" className="relative bg-[color:var(--ink-0)] text-[color:var(--ink-9)] py-28 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Portrait/monogram */}
          <Reveal className="col-span-12 md:col-span-5">
            <div className="relative aspect-[4/5] w-full bg-[color:var(--ink-9)] text-[color:var(--ink-0)] overflow-hidden">
              <div className="absolute inset-0 grain opacity-50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                <span className="font-serif-italic text-[22px] opacity-80">Portrait · 2025</span>
                <div className="font-display text-[140px] sm:text-[180px] leading-none mt-4">
                  أ
                </div>
                <div className="font-display text-2xl mt-4 tracking-tight">{profile.nameShort}</div>
                <div className="mt-2 font-mono text-[11px] tracking-[0.22em] uppercase opacity-70">
                  {profile.nameLatin}
                </div>
              </div>
              {/* corner tickers */}
              <div className="absolute top-4 left-4 side-rail" style={{ color: "rgba(255,255,255,0.6)" }}>
                Est. 2022
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[11px] tracking-[0.22em] uppercase opacity-70">
                01 / 01
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <div className="col-span-12 md:col-span-7 md:pr-0 md:pl-4">
            <div className="label-eyebrow mb-5">عن أسامة</div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[64px] leading-[1.02] tracking-tight">
              طالب، مطوّر، باحث.
              <br />
              <span className="font-serif-italic text-[color:var(--ink-4)]">مهندس يتعلّم بصوت عالٍ.</span>
            </h2>

            <p className="mt-8 text-[17px] leading-[1.95] max-w-2xl">
              أسامة مروان حامد الحواش — طالب طموح بخلفيّة قويّة في تطوير البرمجيات والذكاء الاصطناعي. أبني أدوات
              تعليميّة حقيقيّة، وأطوّر وكيل ذكاء اصطناعي يساعد الطلّاب والمطوّرين على الإنتاج. أتطلّع لإكمال دراستي في
              <span className="font-serif-italic"> {profile.targetSchool}</span>، والتعمّق في هندسة الأنظمة الذكيّة.
            </p>

            {/* facts grid */}
            <div className="mt-12 grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-6">
              <Fact label="الوجهة الأكاديميّة" value={profile.targetSchool} />
              <Fact label="التخصّصات" value="ذكاء اصطناعي · برمجيّات" />
              <Fact label="سابقًا" value="مطوّر واجهات وخلفيّات" />
              <Fact label="اللغات" value="AR · EN · ZH" />
              <Fact label="الموقع" value={profile.basedShort} />
              <Fact label="الحالة" value="منفتح للتعاون" />
            </div>

            {/* Languages */}
            <div className="mt-14">
              <div className="label-eyebrow mb-5">المهارات اللغويّة</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {profile.languages.map((l) => (
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
