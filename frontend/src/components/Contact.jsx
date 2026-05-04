import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { profile } from "../lib/data";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export default function Contact({ forwardRef }) {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("رجاءً أكمل الحقول الأساسيّة");
      return;
    }
    try {
      setLoading(true);
      await axios.post(`${API}/contact`, form);
      toast.success("وصلتني رسالتك — سأردّ في أقرب وقت.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      const msg = err?.response?.data?.detail || "حدث خطأ أثناء الإرسال";
      toast.error(typeof msg === "string" ? msg : "حدث خطأ أثناء الإرسال");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      ref={forwardRef}
      data-testid="contact-section"
      className="relative bg-[color:var(--ink-9)] text-[color:var(--ink-0)] py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[1320px] px-6 sm:px-10">
        <div className="grid grid-cols-12 gap-10 items-start">
          {/* Left — manifesto */}
          <div className="col-span-12 md:col-span-6">
            <div className="label-eyebrow mb-5" style={{ color: "rgba(255,255,255,0.5)" }}>
              ابدأ من هنا
            </div>
            <h2 className="font-display text-5xl sm:text-6xl lg:text-[88px] leading-[0.98] tracking-tight">
              هيّا نبني
              <br />
              <span className="font-serif-italic text-[color:var(--accent)]">شيئًا ذكيًّا.</span>
            </h2>
            <p className="mt-8 text-[16px] leading-[1.95] opacity-80 max-w-lg">
              تعاون تقني، فرصة أكاديميّة، أو فكرة تبحث عن مهندس يُنفّذها؟ اكتب لي مباشرة — أردّ على كلّ رسالة حقيقيّة.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="btn-pill btn-accent"
                data-testid="contact-email-btn"
              >
                {profile.email}
              </a>
              <a href="#projects" className="btn-pill" style={{ borderColor: "rgba(255,255,255,0.3)", border: "1px solid", color: "var(--ink-0)" }} data-testid="contact-projects-btn">
                تصفّح المشاريع
              </a>
            </div>

            <div className="mt-14 grid grid-cols-2 gap-y-6 max-w-md">
              {profile.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  data-testid={`social-${s.label.toLowerCase()}`}
                  className="group flex items-center justify-between border-t border-white/10 pt-5 link-underline"
                >
                  <span className="font-mono text-[12px] tracking-[0.18em] uppercase opacity-70 group-hover:opacity-100">
                    {s.label}
                  </span>
                  <span className="font-display text-lg tracking-tight">
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <form
            onSubmit={onSubmit}
            data-testid="contact-form"
            className="col-span-12 md:col-span-6 glass-dark rounded-sm p-8 sm:p-10 border border-white/10"
          >
            <div className="label-eyebrow mb-8" style={{ color: "rgba(255,255,255,0.5)" }}>
              نموذج تواصل · آمن
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Field
                label="الاسم"
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="اسمك الكامل"
                required
                testid="input-name"
              />
              <Field
                label="البريد"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="you@domain.com"
                required
                testid="input-email"
              />
            </div>
            <div className="mt-6">
              <Field
                label="الموضوع"
                name="subject"
                value={form.subject}
                onChange={onChange}
                placeholder="تعاون، فرصة، استفسار…"
                testid="input-subject"
              />
            </div>
            <div className="mt-6">
              <label className="block mb-3">
                <span className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-60">الرسالة *</span>
              </label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                rows={6}
                placeholder="اكتب فكرتك باختصار…"
                required
                data-testid="input-message"
                className="w-full bg-transparent border-b border-white/20 focus:border-[color:var(--accent)] outline-none resize-none py-3 text-[16px] leading-[1.85] placeholder:text-white/40 transition-colors"
              />
            </div>

            <div className="mt-10 flex items-center justify-between gap-6 flex-wrap">
              <div className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-50 max-w-[280px]">
                بإرسال هذا النموذج، توافق على أن أتواصل معك عبر البريد المذكور.
              </div>
              <button
                type="submit"
                disabled={loading}
                data-testid="contact-submit-btn"
                className="btn-pill btn-accent disabled:opacity-60"
              >
                {loading ? "جارٍ الإرسال…" : "إرسال الرسالة"}
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
