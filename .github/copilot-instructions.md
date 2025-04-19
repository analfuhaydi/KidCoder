## Current Documentation | version 1 of our product

📚 Project Documentation: كود المرح – تعليم البرمجة للأطفال باستخدام الذكاء الاصطناعي

---

## 🧠 Concept (v2)

"كود المرح" هو تطبيق ويب تفاعلي يُمكن الأطفال السعوديين من تعلّم البرمجة بطريقة ممتعة عبر الذكاء الاصطناعي. يكتب الطفل تعليماته بصيغة طبيعية (مثلاً: "ارسم زر أحمر يتحرك عند الضغط")، فيقوم الذكاء الاصطناعي بتحويلها إلى كود HTML/CSS/JS يُعرض فورًا في نافذة تجريبية.

في النسخة الثانية، نضيف:

- تحليل البرومبت والكود الناتج باستخدام Gemini.
- توليد ملاحظات تعليمية صوتية (نص → صوت عبر ElevenLabs) تشرح الكود وتحث الطفل على التكرار والتجربة.

---

## 🏗️ Folder Structure

```
/app
  page.tsx                  # الواجهة الرئيسية
  /api
    generate.ts             # تحويل البرومبت إلى كود (Gemini)
    feedback.ts             # تحليل البرومبت + الكود وتوليد الملاحظة (Gemini)
    tts.ts                  # تحويل النص إلى صوت (ElevenLabs)
/components
  InputBox.tsx              # إدخال البرومبت
  CodePreview.tsx           # عرض الكود في iframe
  VoiceNotePlayer.tsx       # تشغيل الملاحظة الصوتية
  FeedbackCard.tsx          # عرض الملاحظة النصية
  LoadingSpinner.tsx        # أثناء توليد الكود
  Header.tsx                # العنوان والشعار
  Footer.tsx                # الحقوق البسيطة
/lib
  ai.ts                     # منطق Gemini للكود والملاحظات
  tts.ts                    # منطق ElevenLabs
  constants.ts              # الألوان – العبارات – الأمثلة
/public
  /images                   # أيقونات أو شخصية كرتونية للأطفال
/styles
  globals.css               # Tailwind + دعم RTL
```

---

## 🖥️ User Interface & Experience

### 🔸 Flow (in Arabic)

1. الطفل يكتب طلبه في صندوق الإدخال (مثال: "أريد شكل يتحرك عند الضغط عليه").
2. الذكاء الاصطناعي يولد الكود ويعرضه في iframe.
3. يتم تشغيل ملاحظة صوتية قصيرة:
   - تشرح ما قام به الكود.
   - تعطي فكرة بسيطة للتحسين.
   - تُشجع الطفل على تجربة أخرى.

### 🔸 UI Layout (RTL)

```
┌──────────────────────┬───────────────────────────────┐
│ صندوق الإدخال        │ نافذة المعاينة (iframe)        │
│ [ أكتب تعليماتك ]   │ [تنفيذ مباشر للكود]            │
├──────────────────────┴───────────────────────────────┤
│ ملاحظة صوتية + نص تحفيزي للطفل                      │
└───────────────────────────────────────────────────────┘
```

---

## 🎨 UI Color System

| Element    | Color   | Note                     |
| ---------- | ------- | ------------------------ |
| Primary    | #1E90FF | Buttons, highlights      |
| Secondary  | #FFD700 | Hover, accents           |
| Background | #FFFDF5 | Gentle on kids' eyes     |
| Text       | #1A1A1A | Arabic-friendly contrast |
| Success    | #4CAF50 | When code works          |
| Error      | #F44336 | If AI/code fails         |

Font: "Cairo" or "Tajawal".

---

## 🧠 AI Logic (Gemini + ElevenLabs)

### 🔹 Gemini Prompt – Code Generation

```ts
export const generateCodePrompt = (input: string) => `
أنت مساعد برمجي للأطفال. حوّل هذا الطلب إلى كود HTML/CSS/JS بسيط وممتع. 
لا تستخدم مكتبات خارجية. الكود يجب أن يعمل مباشرة داخل iframe.

طلب الطفل:
"${input}"

اخرج الكود فقط داخل ملف HTML واحد.
`;
```

### 🔹 Gemini Prompt – Feedback Explanation

```ts
export const generateFeedbackPrompt = (input: string, code: string) => `
أنت مساعد ذكي تشرح للأطفال سبب ظهور هذا الكود.
اكتب ملاحظة صوتية قصيرة تشرح:
- لماذا الكود يعمل بهذه الطريقة
- كيف يمكن تحسينه بفكرة بسيطة
- رسالة تحفيزية للتكرار

الطلب:
"${input}"

الكود:
${code}

اكتب الملاحظة كأنك تتحدث لطفل عمره 10 سنوات.
`;
```

### 🔹 ElevenLabs Integration

- بعد توليد الملاحظة النصية من Gemini، يتم تمريرها إلى ElevenLabs API لتحويلها إلى صوت.
- الصوت يُشغل مباشرة داخل `VoiceNotePlayer.tsx`.

---

## 🧰 Tech Stack (Updated)

| Layer          | Tech                       |
| -------------- | -------------------------- |
| Frontend       | Next.js (App Router)       |
| Styling        | Tailwind CSS + RTL support |
| UI Kit         | shadcn/ui (customized)     |
| AI             | Google Gemini              |
| Text-to-Speech | ElevenLabs                 |
| Code Render    | iframe srcDoc              |
| Language       | 100% Arabic (RTL)          |

---

## ✅ MVP Feature Checklist (v2)

| Feature                                  | Status |
| ---------------------------------------- | ------ |
| Arabic UI                                | ✅     |
| RTL Layout                               | ✅     |
| Prompt input                             | ✅     |
| Gemini API integration (code generation) | ✅     |
| Code rendering in iframe                 | ✅     |
| AI explanation feedback (text)           | ✅     |
| ElevenLabs voice notes (audio feedback)  | ✅     |
| Safe and friendly experience             | ✅     |
| Random prompt suggestions                | ✅     |

--

## Updated documentation | version 2 of our product

📚 Project Documentation: كدكود – تعليم هندسة البرومبت بالذكاء الاصطناعي للأطفال
🌟 نظرة عامة على المشروع
كدكود هو منصة تعليمية تفاعلية تستهدف الأطفال السعوديين في الفئة العمرية 8-14 عامًا، وتهدف إلى تعليمهم أساسيات هندسة البرومبت (Prompt Engineering) باستخدام الذكاء الاصطناعي. يقوم الأطفال بإدخال تعليمات بسيطة باللغة العربية (برومبت)، ويقوم النظام بإنشاء محتوى HTML/CSS/JS بناءً على هذا البرومبت، يتبعه ملاحظة صوتية مُنشأة بواسطة الذكاء الاصطناعي تشرح ما تم إنشاؤه.

🧠 المفهوم
تطور المفهوم الأساسي للمشروع من توليد كود مباشر من اللغة الطبيعية إلى تعليم الأطفال كيفية التواصل بفعالية مع الذكاء الاصطناعي من خلال كتابة برومبتات مُوجهة. تتضمن العملية الآن:

إدخال البرومبت: يقوم الطفل بإدخال طلبه أو تعليمه باللغة العربية في صندوق الإدخال (مثال: "أريد زرًا أخضر يدور عندما أضغط عليه").
توليد المحتوى بواسطة الذكاء الاصطناعي (Gemini): يتم إرسال البرومبت إلى نموذج Gemini مباشرةً باستخدام Google Gen AI SDK.
عرض الكود: يقوم Gemini بإنشاء كود HTML/CSS/JS بناءً على البرومبت المُدخل، ويُعرض في مكون CodeOutput.tsx.
الشرح الصوتي (ElevenLabs): يتم تشغيل ملاحظة صوتية باللغة العربية مُنشأة بواسطة الذكاء الاصطناعي (عبر ElevenLabs) تشرح الكود الذي تم إنشاؤه وربما تقدم اقتراحات لتحسين البرومبت أو تجربة أفكار أخرى.
🏗️ هيكل المجلدات
يستخدم المشروع هيكل مجلدات Next.js App Router لتنظيم الملفات والمنطق:

/project-root
│
├── /public
│ ├── /assets # ملفات ثابتة (صور، أيقونات، خطوط)
│ ├── /sounds # ملفات صوتية للملاحظات الصوتية
│ └── favicon.ico
│
├── /src
│ ├── /components # مكونات واجهة مستخدم قابلة لإعادة الاستخدام
│ │ ├── Header.tsx # ترويسة الموقع
│ │ ├── Footer.tsx # تذييل الموقع
│ │ ├── Chat.tsx # منطقة إدخال برومبت الذكاء الاصطناعي
│ │ └── CodeOutput.tsx # عرض الكود والناتج المُولد
│ │
│ ├── /app # دليل Next.js App Router
│ │ ├── /api
│ │ │ ├── auth
│ │ │ │ └── route.ts # مسارات API للتحقق من المستخدم (Firebase Auth)
│ │ │ └── sessions
│ │ │ └── route.ts # مسارات API لإدارة الجلسات
│ │ ├── page.tsx # مسار الصفحة الرئيسية
│ │ ├── login
│ │ │ └── page.tsx # مسار صفحة تسجيل الدخول
│ │ ├── signup
│ │ │ └── page.tsx # مسار صفحة إنشاء حساب جديد
│ │ ├── dashboard
│ │ │ └── page.tsx # مسار لوحة التحكم الرئيسية (بعد تسجيل الدخول)
│ │ └── not-found.tsx # صفحة "غير موجود" مخصصة
│ │
│ ├── /styles
│ │ ├── globals.css # أنماط عامة (Tailwind + دعم RTL)
│ │ └── tailwind.config.js # إعدادات Tailwind CSS
│ │
│ ├── /lib # منطق التطبيق الأساسي
│ │ ├── firebase.ts # تهيئة Firebase
│ │ ├── auth.ts # وظائف مساعدة للتحقق من مستخدمي Firebase
│ │ ├── voiceNotes.ts # منطق التكامل مع ElevenLabs API
│ │ └── ai.ts # منطق التكامل مع Google Gen AI SDK
│ │
│ └── /utils # وظائف مساعدة
│ └── helpers.ts # وظائف مساعدة عامة (مثل إدارة الجلسات)
│
├── .env # متغيرات البيئة (مفاتيح API لـ Firebase و ElevenLabs و Google Gen AI)
├── .gitignore # ملف تجاهل Git
├── next.config.js # إعدادات Next.js
├── package.json # تبعيات المشروع
└── tsconfig.json # إعدادات TypeScript
التغييرات في هيكل المجلدات:

تمت إضافة ملف جديد /lib/ai.ts لاحتواء منطق التكامل مع Google Gen AI SDK.
🖥️ واجهة المستخدم وتجربة المستخدم
🔸 سير العمل (باللغة العربية)
يقوم المستخدم (الطفل) بتسجيل الدخول أو إنشاء حساب جديد.
بعد تسجيل الدخول، ينتقل إلى صفحة لوحة التحكم (/dashboard/page.tsx).
في صفحة لوحة التحكم، يجد صندوق إدخال (Chat.tsx) لكتابة طلبه (برومبت الذكاء الاصطناعي) باللغة العربية (مثال: "اجعل مربعًا أحمر يدور ببطء").
يتم إرسال البرومبت إلى نموذج Gemini مباشرةً باستخدام Google Gen AI SDK (المنطق موجود في /lib/ai.ts).
يُعرض الكود الناتج من Gemini في منطقة عرض الكود (CodeOutput.tsx).
يتم تشغيل ملاحظة صوتية تلقائيًا (VoiceNotePlayer.tsx مُدمج داخل CodeOutput.tsx أو كمكون منفصل) تشرح الكود الذي تم إنشاؤه وربما تقدم اقتراحات لتحسين البرومبت أو تجربة أفكار أخرى.
🔸 تخطيط واجهة المستخدم (RTL)
يظل المفهوم العام للتخطيط مشابهًا ويتم تنفيذه الآن داخل صفحة dashboard/page.tsx:

┌──────────────────────┬───────────────────────────────┐
│ صندوق إدخال البرومبت │ منطقة عرض الكود والمعاينة │
│ [ أكتب برومبت الذكاء │ [عرض الكود + تنفيذ مباشر؟] │
│ الاصطناعي هنا ] │ │
├──────────────────────┴───────────────────────────────┤
│ ملاحظة صوتية + نص/رسالة تحفيزية متعلقة بالبرومبت/الكود │
└───────────────────────────────────────────────────────┘
🧠 منطق الذكاء الاصطناعي (Gemini + ElevenLabs - مُحدث)
🔹 التفاعل مع Gemini – معالجة البرومبت
يركز التفاعل مع Gemini الآن على معالجة برومبت المستخدم لإنشاء الكود مباشرةً باستخدام Google Gen AI SDK. سيتم تنفيذ منطق إرسال البرومبت واستقبال الاستجابة من Gemini في الملف /lib/ai.ts.

🔹 شرح الملاحظات (ضمنيًا عبر الملاحظات الصوتية)
يظل الأمر كما هو، حيث يتم إنشاء شرح نصي للكود الناتج (إما بواسطة Gemini أو برمجيًا) ويتم تمريره إلى ElevenLabs API لإنشاء الملاحظة الصوتية.

🔹 تكامل ElevenLabs (مُحدث)
بعد أن يقوم Gemini بإنشاء الكود، يتم تمرير شرح نصي للكود إلى ElevenLabs API عبر المنطق الموجود في /lib/voiceNotes.ts.
يقوم ElevenLabs بتحويل هذا النص إلى ملاحظة صوتية باللغة العربية.
يتم تشغيل ملف الصوت تلقائيًا داخل صفحة dashboard/page.tsx. قد يتم تخزين ملفات الصوت في /public/sounds.
🧰 التقنيات المستخدمة
الطبقة التقنية
الواجهة الأمامية Next.js (App Router)، TypeScript، TailwindCSS، shadcn/ui
التصميم Tailwind CSS + دعم RTL
مجموعة UI shadcn/ui (مُخصصة)
الذكاء الاصطناعي Google Gemini (عبر Google Gen AI SDK)
تحويل النص إلى صوت ElevenLabs API
عرض الكود مُدمج ضمن CodeOutput.tsx أو طريقة مشابهة
اللغة العربية 100% (RTL)
الواجهة الخلفية Firebase (Auth, Firestore)

Export to Sheets
التغييرات في التقنيات المستخدمة:

يتم الآن استخدام Google Gen AI SDK للتفاعل مباشرةً مع نموذج Gemini بدلاً من Vercel AI SDK.
✅ قائمة ميزات MVP
الميزة الحالة
واجهة مستخدم عربية ✅
تخطيط RTL ✅
تسجيل وإنشاء حساب مستخدم (Firebase Auth) ✅
صفحة لوحة التحكم للتفاعل مع البرومبت 🚧 (قيد التنفيذ)
إدخال البرومبت (Chat.tsx) 🚧 (قيد التنفيذ)
تكامل Google Gen AI SDK 🚧 (قيد التنفيذ)
عرض الكود (CodeOutput.tsx) 🚧 (قيد التنفيذ)
ملاحظات صوتية من ElevenLabs (باللغة العربية) 🚧 (قيد التنفيذ)
التشغيل التلقائي للملاحظات الصوتية 🚧 (قيد التنفيذ)
حفظ جلسات المستخدم (Firestore) 🚧 (قيد التنفيذ)
تجربة آمنة ومناسبة للأطفال ✅
