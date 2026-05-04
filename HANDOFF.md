# ملف تسليم المشروع — موقع أسامة الهويش (Portfolio)

> **الغرض من هذا الملف:** إذا فتحت محادثة جديدة، أرفق هذا الملف + ملفات المشروع، ثم اكتب ما تريد تعديله مباشرة. هذا الملف يحتوي على كل ما يحتاجه المساعد ليستأنف العمل دون طرح أسئلة عن السياق.

---

## 1. نظرة عامة

- **الاسم:** أسامة مروان حامد الهويش
- **الاسم اللاتيني:** Osama Al-Huwaish
- **الهوية:** طالب طموح، مطوّر برمجيات كامل المكدّس، باحث في الذكاء الاصطناعي.
- **الوجهة الأكاديميّة:** معهد بكين للتكنولوجيا (Beijing Institute of Technology — BIT).
- **الموقع:** غزة → بكين.
- **الجمهور المستهدف:** لجان القبول الجامعي، المُوظّفون، المتعاونون في مشاريع تقنية.
- **الغرض من الموقع:** عرض المسيرة الأكاديمية + المشاريع التقنية + الرؤية المستقبلية، بأسلوب افتتاحي (editorial) فاخر يتميّز عن الـ "AI slop" الشائع.
- **المشاريع البارزة:**
  1. **HSK App** — منصّة تعلّم الصينية (React + Node + MongoDB + Manus Cloud). +100 مستخدم، 4.8/5، 85% إكمال، +30% نموّ في الدرجات.
  2. **My AI BOT** — وكيل ذكاء اصطناعي قيد البناء (Python + LLM + FastAPI + MongoDB).
- **التواصل:**
  - Instagram: [@0r.ei](https://instagram.com/0r.ei)
  - Email: `osamadevlopment@gmail.com`

---

## 2. ستاك تقني (Stack)

| الطبقة | التقنية |
|---|---|
| Frontend | React 19 + CRA (Craco) + React Router v7 |
| Styling | Tailwind CSS + shadcn primitives (مجهّزة في `/app/frontend/src/components/ui/`) |
| Toasts | sonner |
| Backend | FastAPI + Motor (MongoDB async) |
| DB | MongoDB (خاصة بكل container عبر `MONGO_URL` و `DB_NAME`) |
| Fonts | Reem Kufi + Tajawal (AR) · Fraunces + Manrope (EN) · JetBrains Mono (labels) |
| Animations | CSS keyframes + IntersectionObserver + requestAnimationFrame لفيديو الـ Hero |
| Internationalization | Context-based بلا مكتبة خارجية (`/app/frontend/src/lib/i18n.jsx`) |

لا يُستخدم npm — فقط **yarn** لإضافة التبعيات في الـ frontend.

---

## 3. نظام التصميم (Design System)

### الفلسفة
- ديلالة بصرية مستوحاة من مواقع Awwwards: تنفيذ تحريري (editorial) بتباين حاد بين أقسام داكنة (near-black) وأقسام دافئة (warm paper).
- تجنّب "AI slop": لا تدرّج بنفسجي على أبيض، لا خطوط Inter، لا تركيز وسط تقليدي. يُفضَّل تخطيط يسار-أيمن غير متماثل ومسافات مضاعفة.
- لمسة جلاس (glass) خفيفة + حبوب (grain) + خطوط مسح (scanlines) في الفيديو.

### لوحة الألوان
جميع الألوان معرّفة كـ CSS variables في `/app/frontend/src/index.css` تحت `:root`.

```css
--ink-0: #f6f3ec;   /* warm paper background */
--ink-1: #ece7dc;   /* panel warm */
--ink-2: #d9d2c2;   /* border warm */
--ink-9: #0b0b0c;   /* near black */
--ink-8: #131315;   /* panel dark */
--ink-7: #1c1c1f;   /* elevated dark */
--ink-6: #2a2a2e;
--ink-4: #5b5b62;   /* muted text */
--ink-3: #8a8a92;
--accent: #d1ff3a;  /* electric lime — الاستخدام الأساسي */
--accent-ink: #0b0b0c;
--brick: #c44a2a;   /* red indicators */
--sky: #8cb8ff;     /* subtle accent */
```

### الخطوط (Typography)
متغيّرات تتبدّل تلقائياً مع اللغة:

| Variable | AR | EN |
|---|---|---|
| `--font-display` | Reem Kufi | Fraunces |
| `--font-body` | Tajawal | Manrope |
| `--font-serif` | Fraunces | Fraunces |
| `--font-mono` | JetBrains Mono | JetBrains Mono |

التبديل يحدث عبر selector `html[lang="en"]` في `index.css`.

### هرم المقاسات
- `h1`: `text-[44px] sm:text-[64px] lg:text-[96px]`
- `h2` لعناوين الأقسام: `text-4xl sm:text-5xl lg:text-[64px]`
- `h3` بطاقات: `text-2xl` → `text-4xl`
- `label-eyebrow`: JetBrains Mono 11px، `letter-spacing: 0.18em`، uppercase.
- `num-display`: Fraunces + `lnum` + `ss01` لأرقام الإحصاءات.

### مكوّنات Utility أساسية
| Class | الوظيفة |
|---|---|
| `.glass` / `.glass-dark` | Backdrop blur 16-18px + تشبّع. |
| `.grain::before` | SVG turbulence overlay. |
| `.shine` | نص مع gradient متحرّك. |
| `.hero-video-soft` | فيديو خلفي مُعتِم (blur(10px) scale 1.25). |
| `.hero-video-layer` | فيديو علوي شفّاف (saturate 1.18). |
| `.hero-glass-veil` | طبقة زجاج فوق الفيديو — لإخفاء ضعف الجودة. |
| `.hero-scanlines` | خطوط مسح CRT خفيفة. |
| `.conic-border` | حد دوّار conic-gradient لقسم الذكاء الاصطناعي. |
| `.btn-pill`, `.btn-accent`, `.btn-dark`, `.btn-light` | أزرار بيلّة (pill buttons). |
| `.chip` | شارة صغيرة بإطار. |
| `.side-rail` | نص عمودي على الجوانب. |
| `.reveal` | IntersectionObserver fade+translate. |
| `.link-underline` | خط سفلي يتحرّك عند hover. |
| `.typing-dot` | ثلاث نقاط متحرّكة في الشات. |

### كل عنصر تفاعلي يجب أن يحتوي على `data-testid`.

---

## 4. هيكل المشروع (File Tree)

```
/app
├── backend/
│   ├── server.py           # FastAPI entry — /api/, /api/status, /api/contact
│   ├── .env                # MONGO_URL, DB_NAME, CORS_ORIGINS (لا تُمسح)
│   ├── requirements.txt
│   └── tests/
│       └── test_portfolio_api.py  # 8 اختبارات pytest
│
├── frontend/
│   ├── public/
│   │   ├── index.html      # يحمّل خطوط Google + RTL افتراضي
│   │   └── media/
│   │       └── hero.mp4    # فيديو Hero (≈1MB)
│   ├── src/
│   │   ├── App.js          # راوتر: "/" و "/projects/:slug"
│   │   ├── App.css
│   │   ├── index.js
│   │   ├── index.css       # نظام التصميم كاملاً
│   │   ├── lib/
│   │   │   ├── i18n.jsx    # LanguageProvider + content{ar,en} + hooks
│   │   │   └── utils.js    # cn() helper
│   │   ├── components/
│   │   │   ├── ui/         # shadcn primitives (جاهزة للاستخدام)
│   │   │   ├── Reveal.jsx
│   │   │   ├── TopNav.jsx
│   │   │   ├── LangToggle.jsx
│   │   │   ├── ScrollHero.jsx
│   │   │   ├── Pillars.jsx
│   │   │   ├── TechStack.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── AIChat.jsx
│   │   │   ├── Process.jsx
│   │   │   ├── Stats.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Contact.jsx
│   │   │   └── Footer.jsx
│   │   └── pages/
│   │       ├── Portfolio.jsx    # الصفحة الرئيسية (تجميع الأقسام)
│   │       └── ProjectCase.jsx  # /projects/:slug — HSK + AI Bot
│   ├── package.json
│   ├── tailwind.config.js
│   └── .env               # REACT_APP_BACKEND_URL (لا تُمسح)
│
└── memory/
    └── PRD.md             # ملخص المتطلبات + الحالة الحالية
```

---

## 5. نظام اللغة (i18n)

### أين يعيش المحتوى
كل النصوص الظاهرة للمستخدم **موجودة في ملف واحد**: `/app/frontend/src/lib/i18n.jsx`
```js
const content = {
  ar: { profile, heroCues, pillars, projectHSK, projectAIBot, ... },
  en: { profile, heroCues, pillars, projectHSK, projectAIBot, ... }
};
```

### الـ Hooks
```jsx
import { useContent, useLang } from "../lib/i18n";

const c = useContent();          // → content[lang]
const { lang, setLang, toggle } = useLang();
```

### كيف يضاف نص جديد
1. افتح `i18n.jsx`.
2. أضف المفتاح في الكائن `ar` والكائن `en` بنفس الاسم.
3. اقرأه في المكوّن عبر `c.yourKey`.

### قواعد حرجة
- **لا تضع نصوصاً عربية حرفية داخل المكوّنات** — كلّها تمرّ عبر `useContent()`.
- كل مشروع (HSK / AI Bot) **يجب** أن يملك: `slug`, `name`, `subName`, `lead`, `stack[]`, `features[]` أو `capabilities[]`. الحقول الاختيارية: `hosting`, `stats[]`, `architecture[]`, `learnings[]`, `roadmap[]`.
- تبديل اللغة يحدث تلقائياً عبر `localStorage` (`oh_lang`) + يكتب `html[lang]` و `html[dir]`.

---

## 6. الأقسام الرئيسية ووظائفها

### 6.1 TopNav (`components/TopNav.jsx`)
- ثابت في الأعلى، يتحوّل لـ glass عند scrolled > 40px.
- يحتوي: Brand + Nav links + Lang toggle + CTA "تواصل معي".
- يمرّر `onContact` من الصفحة الأم → scroll إلى قسم الاتصال.

### 6.2 ScrollHero (`components/ScrollHero.jsx`) — **أهم قسم**
- ارتفاع القسم: `320vh` (sticky child 100vh).
- **فيديوان مسطبقان**:
  - `bgVideoRef` (خلفي): `.hero-video-soft` — blur 10px + scale 1.25 (يخفي حواف ضعيفة).
  - `videoRef` (أمامي): `.hero-video-layer` — شفاف مع saturation/contrast زيادة.
- الاثنان يتزامنان عبر نفس الـ `currentTime`.
- طبقات فوق: `hero-glass-veil` + `hero-scanlines` + `grain` + vignette.
- التمرير يُحرّك `currentTime` عبر `requestAnimationFrame` (lerp بنسبة 0.2 لتنعيم).
- `heroCues` (4 نقاط): تتغيّر العناوين + النصّ الـ italic + عدّاد الـ progress.

**ضبط الفيديو**:
- استبدال الفيديو: ضع الملف الجديد في `/app/frontend/public/media/hero.mp4` (نفس الاسم) أو غيّر `shared.videoSrc` في `i18n.jsx`.
- تغيير عدد نقاط الـ cue: عدّل `heroCues` array في `i18n.jsx` — القسم يضبط نفسه تلقائياً.

### 6.3 Pillars (`components/Pillars.jsx`)
- شبكة 2×2 من أربع بطاقات تقلب ألوانها عند hover (أبيض → أسود).
- البيانات: `c.pillars[]`.

### 6.4 TechStack (`components/TechStack.jsx`)
- Marquee لا نهائي للخطوط التقنية، على خلفية سوداء.

### 6.5 Projects (`components/Projects.jsx`)
- **مشروع 01 — HSK**: بطاقة ضخمة مع stack + stats (4 أرقام lime) + features جانبية + زر "عرض تفصيلي" → `/projects/hsk`.
- **مشروع 02 — AI Bot**: layout مقسوم ـ left sticky + right 3 vision items + زر "عرض تفصيلي" → `/projects/ai-bot`.

### 6.6 AIChat (`components/AIChat.jsx`) — قسم تجريبي/مغلق
- **يجب أن يكون مغلق حاليًا**. المستخدم لا يستطيع الكتابة.
- ثلاث طبقات حماية على `chat-input`:
  - `readOnly`
  - `onKeyDown`, `onBeforeInput` → `e.preventDefault()` + toast
  - `onFocus` → `e.target.blur()` + toast
  - زر الإرسال `disabled`
- محادثة معروضة تلقائيًا عند scroll داخل الرؤية (IntersectionObserver): user bubble → typing dots → bot reply → loop.
- إذا أراد العميل تشغيل الشات لاحقًا:
  1. احذف طبقات الحماية من `<input>` وأزل `disabled` من الزر.
  2. أضف endpoint `/api/chat` مع `emergentintegrations` (اطلب `integration_playbook_expert_v2` عن "Claude Sonnet 4.5" أو "GPT-5.2" + استدعِ `Emergent LLM key`).
- **بديل منخفض الجهد** مُوصَى به: تحويل الحقل إلى "أشعرني عند الإطلاق" — يحفظ البريد في نفس جدول `contacts` مع `source: ai-waitlist`.

### 6.7 Process (`components/Process.jsx`)
- 4 خطوات (بحث/بناء/اختبار/نشر) على خلفية دافئة، خط عمودي يفصل بين أرقام الخطوات والشرح.

### 6.8 Stats (`components/Stats.jsx`)
- 4 عدادات تتحرك بـ ease-out لمدة 60 frame عند IntersectionObserver.
- اقتباسات دوارة (6.5 ثواني) من `c.testimonials`.

### 6.9 About (`components/About.jsx`)
- بطاقة "Portrait" سوداء مع الحرف الأوّل من الاسم (أ / O) بحجم 180px.
- **لاستبدال هذا بصورة حقيقية**: انسخ الصورة إلى `/app/frontend/public/brand/portrait.png` واستبدل `<div>` الحرف بـ `<img>`.
- شبكة facts (6 خانات) + 3 بطاقات لغات (AR/EN/ZH).

### 6.10 Contact (`components/Contact.jsx`)
- يسار: عنوان + lead + زر البريد الإلكتروني + زر "تصفّح المشاريع" + بطاقات Instagram و Email.
- يمين: نموذج glass-dark (اسم/بريد/موضوع/رسالة) → `POST /api/contact` → Mongo.
- التحقق أدنى (client): الحقول غير الفارغة + توست.

### 6.11 Footer (`components/Footer.jsx`)
- اسم ضخم + sitemap + channels + est range.

### 6.12 ProjectCase (`pages/ProjectCase.jsx`) — HSK + AI Bot
- Top sub-nav: Back home + Lang toggle.
- Hero ضخم بقالب: codename → name → subName → longLead + meta sidebar (status/role/duration/hosting).
- Overview + Stack chips.
- Stats grid (HSK only).
- Features (HSK) أو Capabilities (AI Bot).
- Architecture (HSK) أو Roadmap (AI Bot).
- Learnings (HSK only).
- Next project cross-link.
- CTA: رابط Instagram مباشر.

---

## 7. الـ Backend و قاعدة البيانات

### Endpoints
جميعها تحت prefix `/api`:

| Method | Path | Body | Response | ملاحظات |
|---|---|---|---|---|
| GET | `/api/` | — | `{message, status}` | health check |
| POST | `/api/contact` | `{name, email, subject?, message}` | `ContactOut` | يحفظ في `db.contacts` |
| GET | `/api/contact` | — | `ContactOut[]` | مرتّب تنازلياً، يُستبعد `_id` |
| POST | `/api/status` | `{client_name}` | `StatusCheck` | legacy مُحتَفَظ به |
| GET | `/api/status` | — | `StatusCheck[]` | |

### Models
```python
ContactCreate(name: str 1-120, email: EmailStr, subject: str ≤160, message: str 1-4000)
ContactOut(id, name, email, subject, message, created_at: datetime)
```

### قواعد MongoDB الحرجة
- `_id` يُستبعد دائمًا بـ `find({}, {"_id": 0})`.
- `created_at` يُخزّن كـ ISO string ويُحوّل إلى `datetime` عند القراءة.
- **لا تُعدّل `MONGO_URL` و `DB_NAME`** في `.env`.

---

## 8. متغيّرات البيئة (محمية)

| ملف | المفتاح | الاستخدام |
|---|---|---|
| `/app/backend/.env` | `MONGO_URL` | اتصال Mongo (لا يُعدّل) |
| `/app/backend/.env` | `DB_NAME` | اسم قاعدة البيانات (لا يُعدّل) |
| `/app/backend/.env` | `CORS_ORIGINS` | `"*"` افتراضي |
| `/app/frontend/.env` | `REACT_APP_BACKEND_URL` | URL الخارجي للباك-إند (**كل axios call في الواجهة يستخدمها**) |

**قواعد:**
- Backend يُربط على `0.0.0.0:8001` عبر supervisor — لا تُشغّل uvicorn يدويًا.
- Frontend يُشغَّل على `3000` عبر supervisor.
- إعادة التشغيل عند تعديل `.env` أو إضافة تبعية: `sudo supervisorctl restart backend` أو `frontend`.
- كل تعديل كود يطبّق Hot Reload تلقائيًا.

---

## 9. الاختبار

- Backend: `pytest /app/backend/tests/test_portfolio_api.py` — 8/8 اختبارات تمرّ.
- Frontend: اختبار E2E عبر `testing_agent_v3` (playwright).
- الاختبار السريع للـ Contact:
```bash
API_URL=$(grep REACT_APP_BACKEND_URL /app/frontend/.env | cut -d '=' -f2)
curl -X POST "$API_URL/api/contact" -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"t@t.com","message":"hi"}'
```

---

## 10. تاريخ التغييرات

### Iteration 1 — الإصدار الأولي
- بناء البنية كاملة: Hero + Pillars + Tech + Projects + Process + Stats + About + Contact + Footer.
- `POST /api/contact` مع MongoDB.
- اختبار testing_agent: 8/8 backend + 100% frontend.

### Iteration 2 — التعديلات بناءً على ملاحظات المستخدم
1. **جودة الفيديو** → طبقة زجاج ثنائية + سكان-لاينز.
2. **AR ↔ EN toggle** → `lib/i18n.jsx` + `LangToggle.jsx`.
3. **تصحيح الاسم** إلى أسامة الهويش / Osama Al-Huwaish في كل مكان.
4. **Instagram @0r.ei** + **`osamadevlopment@gmail.com`** (إزالة أي سوشيال وهمي).
5. **صفحات تفصيلية** `/projects/hsk` و `/projects/ai-bot`.
6. **قسم AI Chat** فاخر — مغلق حاليًا، يوتر عند الكتابة.
7. إصلاح bug: `projectAIBot.stack` كان مفقودًا → تمّ إضافته.

---

## 11. وصفات سريعة (Recipes)

### كيف أضيف قسمًا جديدًا في الصفحة الرئيسية؟
1. أنشئ `/app/frontend/src/components/MyNewSection.jsx`.
2. استخدم `const c = useContent();` لقراءة النصوص.
3. أضف النصوص في `i18n.jsx` تحت `ar.mySection` و `en.mySection`.
4. استورد القسم في `/app/frontend/src/pages/Portfolio.jsx` بترتيبه.
5. أضف `data-testid` لكل عنصر تفاعلي.

### كيف أضيف مشروعًا ثالثًا؟
1. في `i18n.jsx`، أضف `projectX` داخل `ar` و `en` بنفس شكل `projectHSK` (`slug`, `name`, `subName`, `lead`, `longLead`, `stack[]`, `features[]`, `stats[]`, إلخ).
2. في `/app/frontend/src/components/Projects.jsx`، أضف بطاقة ثالثة ورابط إلى `/projects/${c.projectX.slug}`.
3. في `/app/frontend/src/pages/ProjectCase.jsx`، أضف شرط slug جديد في `const project = ...`.

### كيف أغيّر الفيديو؟
استبدل `/app/frontend/public/media/hero.mp4` بملف جديد (يُفضَّل > 720p و < 5MB). القسم يقرأه تلقائيًا.

### كيف أغيّر لون الأكسنت (الـ lime)؟
عدّل `--accent: #d1ff3a;` في `/app/frontend/src/index.css` — كل الأزرار/الإحصاءات/الشارات تتبعه.

### كيف أشغّل الشات فعليًا؟
1. أزل طبقات الحماية من `AIChat.jsx` (input: أزل readOnly, onKeyDown, onBeforeInput, onFocus; button: أزل disabled).
2. اطلب من المساعد: **"ادمج LLM في /api/chat باستخدام Emergent LLM key + Claude Sonnet 4.5"**.
3. سيتم استخدام `integration_playbook_expert_v2` + `emergent_integrations_manager`.

### كيف أُضيف Google Analytics / OG image؟
- Meta tags في `/app/frontend/public/index.html` (قسم `<head>`).

---

## 12. أشياء يجب تجنّبها

- ❌ **لا تستبدل** خطوط Reem Kufi أو Tajawal بخطوط Inter/Roboto.
- ❌ **لا تستخدم** تدرّج بنفسجي→أزرق (AI slop).
- ❌ **لا تَنقل** محتوى النصوص إلى المكوّنات — أبقها في `i18n.jsx`.
- ❌ **لا تَنسَ `data-testid`** على العناصر التفاعلية والحرجة.
- ❌ **لا تشغّل** خادمًا يدويًا — supervisor يُدير كل شيء.
- ❌ **لا تستخدم** `npm` — فقط `yarn`.
- ❌ **لا تفتح** الشات للكتابة إلا بطلب صريح من العميل (حاليًا مغلق).

---

## 13. كيف تبدأ محادثة جديدة (للعميل)

في المحادثة الجديدة، اكتب:
```
هذا مشروعي (ملف HANDOFF.md مرفق + ملفات المشروع).
المطلوب: <اكتب ما تريد تعديله بالضبط>
```

أمثلة:
- "غيّر لون الـ accent من lime إلى ذهبي."
- "أضف قسم مدوّنة بعد About."
- "استبدل صورة الـ About بهذه الصورة المرفقة."
- "شغّل الشات بالفعل باستخدام Claude Sonnet 4.5."
- "أضف زر تحميل CV بصيغة PDF في الـ Hero."
- "ترجم الموقع أيضاً إلى الصينية."

المساعد سيقرأ هذا الملف ويعرف كل السياق دون أسئلة إضافية.

---

**آخر تحديث:** ديسمبر 2026
**الإصدار:** v2.0 (Portfolio + AR/EN + Case Pages + Closed AI Chat)
