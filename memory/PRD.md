# PRD — Osama Al-Hawash Portfolio (ملف أسامة)

## Original Problem Statement
User provided a reference site (skeleton-rebuild NomadaToast clone) and a scroll-controlled MP4 hero prompt. They requested a PORTFOLIO built using the supplied profile docx for **أسامة مروان حامد الحواش** (Osama Marwan Hamed Al-Hawash), with the uploaded MP4 as a full-screen scroll-controlled hero, preserving the premium editorial aesthetic (glass cards, generous spacing, warm paper + near-black rhythm).

## Architecture
- **Frontend**: React 19 + CRA (craco) + Tailwind + shadcn-ready primitives. RTL (`dir="rtl" lang="ar"`). Fonts: Reem Kufi (display), Tajawal (body), Fraunces (serif italic), JetBrains Mono (eyebrows).
- **Backend**: FastAPI + Motor (MongoDB async). Routes prefixed with `/api`. Models use Pydantic v2.
- **Hero**: Sticky 320vh section, `videoRef.currentTime` lerped against scroll progress using rAF. 4 cue points switch eyebrow/title/italic copy.
- **Data**: Centralized in `/app/frontend/src/lib/data.js` — sourced verbatim from the docx.

## User Personas
- **Primary**: Admissions committee / academic reviewers (BIT target) looking for proof of technical depth.
- **Secondary**: Recruiters and collaborators evaluating technical portfolio.
- **Tertiary**: Students/peers interested in his projects (HSK app, AI Bot).

## Core Requirements (Static)
1. RTL Arabic-first UI.
2. MP4 as scroll-scrubbed hero (not autoplay).
3. Reference site's editorial aesthetic preserved (dark hero → warm paper reading sections).
4. All docx content reflected: profile, HSK App + stats, AI Bot, skills, languages, vision.
5. Backend contact form persisted to MongoDB.

## What's Been Implemented (2026-05-04)
- Scroll-scrubbed MP4 hero (`ScrollHero.jsx`) with 4 cue progression + progress bar + cue dots.
- `Pillars.jsx` — 4 hover-inverting pillar cards.
- `TechStack.jsx` — infinite marquee of tech stack on dark.
- `Projects.jsx` — featured HSK App card (stack, lead, features, 4 stats) + AI Bot vision list.
- `Process.jsx` — 4-step research/build/test/publish on warm panel.
- `Stats.jsx` — IntersectionObserver count-up + rotating testimonial.
- `About.jsx` — monogram portrait + facts grid + languages (AR/EN/ZH).
- `Contact.jsx` — form → `POST /api/contact` → Mongo, sonner toasts.
- `Footer.jsx` — XXL brand signature + sitemap + meta.
- Backend: `/api/` health, `/api/contact` POST+GET, `/api/status` (retained). `_id` excluded everywhere.
- Tests: `/app/backend/tests/test_portfolio_api.py` — 8/8 pass.

## Prioritized Backlog
- **P1**: Replace placeholder social URLs (GitHub/LinkedIn/YT/X) with real handles.
- **P1**: Add real portrait image to About section (currently stylized monogram).
- **P2**: Optional rate-limit + spam honeypot on `/api/contact`.
- **P2**: Admin endpoint + simple page to read submitted messages (auth-gated).
- **P2**: English (LTR) toggle for international audience.
- **P3**: OG image + Twitter card metadata tuned for sharing.
- **P3**: Dedicated project detail pages (/projects/hsk, /projects/ai-bot).
- **P3**: Newsletter/waitlist (if AI Bot launches publicly).

## Next Tasks
1. Collect real social handles + portrait photo from Osama.
2. Add i18n (ar/en) toggle.
3. Harden contact form (rate limit + honeypot).
4. Add project detail routes.
