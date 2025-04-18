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
