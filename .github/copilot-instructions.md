📚 Project Documentation: كود المرح – تعليم البرمجة للأطفال باستخدام الذكاء الاصطناعي
🧠 Concept
"كود المرح" هو تطبيق ويب تفاعلي يُمكن الأطفال السعوديين من تعلّم البرمجة بطريقة ممتعة. يكتب الطفل تعليمات برمجية بصيغة طبيعية (مثلاً: "ارسم زر أحمر يتحرك عند الضغط")، ويقوم الذكاء الاصطناعي بتحويلها إلى كود HTML/CSS/JS يتم عرضه فوراً في نافذة تجريبية.

🏗️ Folder Structure

/app
/page.tsx # Main interface
/api/generate.ts # Server Action or Route for AI (Gemini) prompt → code
/components
InputBox.tsx # Prompt input (Arabic)
CodePreview.tsx # Renders iframe preview
LoadingSpinner.tsx # While AI is generating
Header.tsx # Title, subtitle, etc.
Footer.tsx # Simple credits/footer
/lib
ai.ts # Gemini prompt logic
constants.ts # UI colors, sample prompts, etc.
public/
/images # Icons or mascot for the kids
styles/
globals.css # Tailwind setup + custom RTL tweaks
🖥️ User Interface & Experience
🔸 Flow (in Arabic):
الطفل يكتب طلبه في صندوق الإدخال (مثال: "أريد شكل يتحرك عند الضغط عليه").

الذكاء الاصطناعي يحوّل الطلب إلى كود HTML/CSS/JS.

الكود يظهر في صندوق تجريبي (iframe) على الجهة اليسرى.

يمكن للطفل "تجربة" التفاعل ومشاهدة النتيجة.

🔸 UI Layout (RTL)
css

┌──────────────────────┬───────────────────────────────┐
│ صندوق الإدخال │ نافذة المعاينة (iframe) │
│ [ أكتب تعليماتك ] │ [تنفيذ مباشر للكود] │
├──────────────────────┴───────────────────────────────┤
│ شريط التعليمات / نصائح للأطفال │
└───────────────────────────────────────────────────────┘
🎨 UI Color System

Element Color Note
Primary Color #1E90FF (Sky Blue) Buttons, highlights
Secondary #FFD700 (Gold) Hover, accents
Background #FFFDF5 (Soft Cream) Gentle on kids' eyes
Text #1A1A1A (Dark Gray) Arabic-friendly contrast
Success #4CAF50 (Green) For working code
Error #F44336 (Red) For AI/code issues
Font: Use "Cairo" or "Tajawal" for Arabic readability.

🧰 Tech Stack

Layer Tech
Frontend Next.js (App Router)
Styling Tailwind CSS + RTL support
UI Kit shadcn/ui (customized)
AI Backend Google ai studio Gemini
Code Render iframe srcDoc={...} /
Language 100% Arabic (RTL)
🧠 Gemini Prompt Template (lib/ai.ts)

export const promptTemplate = (input: string) => `
أنت مساعد برمجي للأطفال. مهمتك هي توليد كود بسيط جدًا باستخدام HTML و CSS و JavaScript فقط.
الكود يجب أن يكون تعليمي وممتع وبدون تعقيد، ويفضل أن يحتوي على تفاعل بسيط (زر، حركة، تغيير لون).
لا تستخدم مكتبات خارجية. الكود يجب أن يعمل داخل iframe مباشرة.

تعليمات الطفل:
"${input}"

أخرج الكود كاملاً في ملف HTML واحد.
`;
✅ MVP Feature Checklist

Feature Status
Arabic UI ✅
RTL Layout ✅
Prompt input ✅
Gemini API integration ✅
Code rendering in iframe ✅
Safe AI output sanitization ✅
Basic UI polish (color, fonts) ✅
Sample prompt suggestions (random) ✅
