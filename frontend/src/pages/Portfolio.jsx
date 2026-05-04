import React, { useRef } from "react";
import { Toaster } from "sonner";
import TopNav from "../components/TopNav";
import ScrollHero from "../components/ScrollHero";
import Pillars from "../components/Pillars";
import TechStack from "../components/TechStack";
import Projects from "../components/Projects";
import AIChat from "../components/AIChat";
import Process from "../components/Process";
import Stats from "../components/Stats";
import About from "../components/About";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import { useLang } from "../lib/i18n";

export default function Portfolio() {
  const { lang } = useLang();
  const contactRef = useRef(null);
  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  return (
    <main dir={lang === "ar" ? "rtl" : "ltr"} lang={lang} className="bg-[color:var(--ink-0)] text-[color:var(--ink-9)]">
      <TopNav onContact={scrollToContact} />
      <ScrollHero />
      <Pillars />
      <TechStack />
      <Projects />
      <AIChat />
      <Process />
      <Stats />
      <About />
      <Contact forwardRef={contactRef} />
      <Footer />
      <Toaster position="top-center" richColors closeButton />
    </main>
  );
}
