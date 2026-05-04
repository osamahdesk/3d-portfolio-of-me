import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useContent } from "../lib/i18n";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Contact({ forwardRef }) {
  const c = useContent();
  const k = c.contact;
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error(k.required);
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API}/contact`, form);
      toast.success(k.success);
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const msg = err?.response?.data?.detail || k.error;
      toast.error(typeof msg === "string" ? msg : k.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" ref={forwardRef} data-testid="contact-section" className="relative bg-[color:var(--ink-9)] text-[color:var(--ink-0)] py-28 sm:py-36">
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-10 items-start">
          <div className="col-span-12 md:col-span-6">
            <div className="label-eyebrow mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>{k.eyebrow}</div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-[88px] leading-[0.98] tracking-tight">
              {k.titleA}<br />
              <span className="font-serif-italic text-[color:var(--accent)]">{k.titleB}</span>
            </h2>
            <p className="mt-8 text-[16px] leading-[1.95] opacity-80 max-w-lg">{k.lead}</p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a href={`mailto:${c.shared.email}`} className="btn-pill btn-accent" data-testid="contact-email-btn">
                {c.shared.email}
              </a>
              <a href="#projects" className="btn-pill" style={{ border: "1px solid rgba(255,255,255,0.3)", color: "var(--ink-0)" }} data-testid="contact-projects-btn">
                {k.projectsBtn}
              </a>
            </div>

            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-y-6 max-w-md">
              <a
                href={c.shared.instagramUrl}
                target="_blank"
                rel="noreferrer"
                data-testid="social-instagram"
                className="group flex items-center justify-between border-t border-white/10 pt-5 link-underline"
              >
                <span className="font-mono text-[12px] tracking-[0.18em] uppercase opacity-70 group-hover:opacity-100 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg>
                  {k.instagramLabel}
                </span>
                <span className="font-display text-lg tracking-tight">@{c.shared.instagramHandle}</span>
              </a>
              <a
                href={`mailto:${c.shared.email}`}
                data-testid="social-email"
                className="group flex items-center justify-between border-t border-white/10 pt-5 link-underline"
              >
                <span className="font-mono text-[12px] tracking-[0.18em] uppercase opacity-70 group-hover:opacity-100 flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>
                  {k.emailLabel}
                </span>
                <span className="font-display text-lg tracking-tight">osamadevlopment</span>
              </a>
            </div>
          </div>

          <form onSubmit={onSubmit} data-testid="contact-form" className="col-span-12 md:col-span-6 glass-dark rounded-sm p-8 sm:p-10 border border-white/10">
            <div className="label-eyebrow mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>{k.formLabel}</div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field label={k.fieldName} name="name" value={form.name} onChange={onChange} placeholder={k.phName} required testid="input-name" />
              <Field label={k.fieldEmail} name="email" type="email" value={form.email} onChange={onChange} placeholder={k.phEmail} required testid="input-email" />
            </div>
            <div className="mt-6">
              <Field label={k.fieldSubject} name="subject" value={form.subject} onChange={onChange} placeholder={k.phSubject} testid="input-subject" />
            </div>
            <div className="mt-6">
              <label className="block mb-3">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60">{k.fieldMessage} *</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={6}
                placeholder={k.phMessage}
                required
                data-testid="input-message"
                className="w-full bg-transparent border-b border-white/20 focus:border-[color:var(--accent)] outline-none resize-none py-3 text-[16px] leading-[1.85] placeholder:text-white/40 transition-colors"
              />
            </div>

            <div className="mt-10 flex items-center justify-between gap-6 flex-wrap">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-50 max-w-[280px]">{k.privacy}</div>
              <button type="submit" disabled={loading} data-testid="contact-submit-btn" className="btn-pill btn-accent disabled:opacity-60">
                {loading ? k.sending : k.sendBtn}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, value, onChange, placeholder, required, type = "text", testid }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60">
        {label} {required && "*"}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        data-testid={testid}
        className="mt-3 w-full bg-transparent border-b border-white/20 focus:border-[color:var(--accent)] outline-none py-3 text-[16px] placeholder:text-white/40 transition-colors"
      />
    </label>
  );
}
