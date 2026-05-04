import React, { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useContent } from "../lib/i18n";

/**
 * AIChat — premium disabled chat preview.
 * - Glass panel + conic rotating border
 * - Fake conversation plays automatically with typing dots
 * - Any interaction with the input is blocked with a toast + badge
 */
export default function AIChat() {
  const c = useContent();
  const chat = c.chat;
  const [visibleCount, setVisibleCount] = useState(0);
  const [typing, setTyping] = useState(false);
  const panelRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = panelRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setStarted(true)),
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Reset replay on language change
  useEffect(() => {
    setVisibleCount(0);
    setTyping(false);
  }, [c.lang]);

  useEffect(() => {
    if (!started) return;
    let cancelled = false;
    const run = async () => {
      const messages = chat.previewMessages;
      for (let i = 0; i < messages.length; i++) {
        if (cancelled) return;
        // Typing indicator before bot messages only
        if (messages[i].from === "bot") {
          setTyping(true);
          await new Promise((r) => setTimeout(r, 1400));
          if (cancelled) return;
          setTyping(false);
        } else {
          await new Promise((r) => setTimeout(r, 550));
          if (cancelled) return;
        }
        setVisibleCount((v) => v + 1);
        await new Promise((r) => setTimeout(r, 1600));
      }
    };
    run();
    return () => { cancelled = true; };
  }, [started, chat.previewMessages]);

  const block = (e) => {
    e.preventDefault();
    toast.info(chat.toastClosed);
  };

  return (
    <section id="chat" data-testid="chat-section" className="relative bg-[color:var(--ink-9)] text-[color:var(--ink-0)] py-28 sm:py-36 overflow-hidden">
      {/* ambient gradient backdrop */}
      <div className="absolute inset-0 pointer-events-none opacity-70"
        style={{
          background:
            "radial-gradient(60% 40% at 20% 0%, rgba(209,255,58,0.12) 0%, transparent 70%), radial-gradient(50% 40% at 90% 100%, rgba(140,184,255,0.10) 0%, transparent 70%)",
        }}
      />
      <div className="absolute inset-0 grain pointer-events-none opacity-60" />

      <div className="relative mx-auto max-w-[1320px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-6 mb-14 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="label-eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>{chat.eyebrow}</span>
              <span className="chip" style={{ color: "var(--accent)", borderColor: "var(--accent)" }}>{chat.badgeSoon}</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-[72px] leading-[1.02] tracking-tight">
              {chat.titleA}{" "}<span className="font-serif-italic text-[color:var(--accent)]">{chat.titleB}</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-end opacity-70">
            <p className="text-[14px] leading-[1.85] max-w-xs md:ms-auto">{chat.lead}</p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6 items-start">
          {/* Left — capability cards + meta */}
          <div className="col-span-12 lg:col-span-4 space-y-5">
            {/* Connection status card */}
            <div className="p-6 border border-white/10 bg-white/[0.03] rounded-sm" data-testid="chat-status-card">
              <div className="flex items-center justify-between">
                <div className="label-eyebrow" style={{ color: "rgba(255,255,255,0.5)" }}>{chat.connectionLabel}</div>
                <span className="inline-flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[color:var(--brick)]" style={{ animation: "pulseRed 2.2s ease-in-out infinite" }} />
                  <span className="font-mono text-[11px] tracking-[0.18em] uppercase">{chat.connectionVal}</span>
                </span>
              </div>
              <div className="mt-5 grid grid-cols-2 gap-4">
                <div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-50">{chat.modelLabel}</div>
                  <div className="font-display text-base mt-2 tracking-tight">{chat.modelVal}</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-50">{chat.latencyLabel}</div>
                  <div className="font-display text-base mt-2 tracking-tight">{chat.latencyVal}</div>
                </div>
              </div>
            </div>

            {chat.capabilities.map((cap, i) => (
              <div key={i} className="group p-6 border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-colors rounded-sm">
                <div className="flex items-start gap-4">
                  <span className="num-display text-3xl opacity-40 group-hover:text-[color:var(--accent)] group-hover:opacity-100 transition">0{i + 1}</span>
                  <div>
                    <div className="font-display text-lg tracking-tight">{cap.t}</div>
                    <p className="text-[13px] leading-[1.8] opacity-75 mt-2">{cap.d}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — chat panel with conic border */}
          <div
            ref={panelRef}
            data-testid="chat-panel"
            className="col-span-12 lg:col-span-8 relative rounded-[6px] conic-border overflow-hidden"
            style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.015))", backdropFilter: "blur(14px)" }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full grid place-items-center bg-[color:var(--accent)] text-[color:var(--accent-ink)] font-display text-xl" aria-hidden="true">
                    AI
                  </div>
                  <span className="absolute -bottom-0.5 -end-0.5 w-3 h-3 rounded-full bg-[color:var(--brick)] border-2 border-[color:var(--ink-9)]" />
                </div>
                <div>
                  <div className="font-display text-base tracking-tight">{chat.assistantName}</div>
                  <div className="font-mono text-[10px] tracking-[0.18em] uppercase opacity-60">{chat.assistantRole}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="chip" style={{ color: "var(--brick)", borderColor: "rgba(196,74,42,0.6)" }}>{chat.statusClosed}</span>
              </div>
            </div>

            {/* Chat body */}
            <div className="px-6 py-8 sm:px-10 sm:py-10 min-h-[420px] flex flex-col gap-4" data-testid="chat-body">
              {chat.previewMessages.slice(0, visibleCount).map((m, i) => (
                <Bubble key={`${c.lang}-${i}`} from={m.from} text={m.text} />
              ))}
              {typing && (
                <Bubble from="bot" typing />
              )}
            </div>

            {/* Input — disabled */}
            <div className="px-6 pb-6 sm:px-10 sm:pb-8">
              <div className="relative flex items-center gap-3 border border-white/15 rounded-full bg-white/[0.03] hover:bg-white/[0.05] transition-colors" onClickCapture={block}>
                <input
                  type="text"
                  placeholder={chat.placeholder}
                  readOnly
                  onKeyDown={block}
                  onBeforeInput={block}
                  onFocus={(e) => { e.target.blur(); toast.info(chat.toastClosed); }}
                  data-testid="chat-input"
                  className="flex-1 bg-transparent px-5 py-4 text-[15px] placeholder:text-white/40 outline-none cursor-not-allowed"
                  aria-disabled="true"
                />
                <button
                  type="button"
                  onClick={block}
                  data-testid="chat-send-btn"
                  className="btn-pill btn-accent me-1"
                  disabled
                  style={{ opacity: 0.55, cursor: "not-allowed" }}
                >
                  {chat.sendBtn}
                </button>
              </div>
              <div className="mt-3 flex items-center gap-2 font-mono text-[10px] tracking-[0.18em] uppercase opacity-60">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="10" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                {chat.disabledHint}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulseRed { 0%,100% { opacity: .5 } 50% { opacity: 1 } }
      `}</style>
    </section>
  );
}

function Bubble({ from, text, typing = false }) {
  const isUser = from === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`} data-testid={`chat-bubble-${from}`}>
      <div
        className={`max-w-[78%] px-5 py-3 rounded-2xl text-[15px] leading-[1.7] ${
          isUser
            ? "bg-[color:var(--accent)] text-[color:var(--accent-ink)] rounded-ee-sm"
            : "bg-white/[0.06] text-[color:var(--ink-0)] border border-white/10 rounded-es-sm"
        }`}
        style={{ animation: "fadeInBubble .5s ease both" }}
      >
        {typing ? (
          <span className="inline-flex items-center gap-1 text-white/70">
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </span>
        ) : text}
      </div>
      <style>{`@keyframes fadeInBubble { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}
