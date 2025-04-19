import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
// In production, this should be stored in environment variables
// Note: This is for direct API usage outside of the API route context
const API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY"; // Replace with your actual API key in .env
const genAI = new GoogleGenerativeAI(API_KEY);

// The model we'll use for code generation
export const MODEL_NAME = "gemini-1.5-pro"; // Changed from gemini-2.5-pro to gemini-pro which is widely available

// Template prompt for Gemini to generate children's code from natural language
export const promptTemplate = (input: string) => `
أنت مساعد برمجي للأطفال تعلمهم هندسة البرومبت. مهمتك هي توليد كود HTML و CSS و JavaScript بناءً على برومبت الطفل.

الكود يجب أن:
1. يكون تعليميًا ويظهر علاقة واضحة بين البرومبت والكود المنتج
2. يكون بسيطًا وممتعًا للأطفال بين 8-14 سنة
3. يتضمن تعليقات توضيحية داخل الكود تشرح الأجزاء المهمة
4. يعمل مباشرةً داخل iframe دون الحاجة لمكتبات خارجية

برومبت الطفل:
"${input}"

أخرج الكود كاملاً في ملف HTML واحد.
`;

// Template for generating feedback about the code and prompt quality
export const feedbackTemplate = (input: string, code: string) =>
  `
أنت مدرس سعودي تشرح البرمجة للأطفال في المرحلة الابتدائية (من ٨ إلى ١٤ سنة) داخل منصة كدكود.

مهمتك: اكتب ملاحظة صوتية قصيرة ومبسطة باللهجة السعودية، موجهة للطفل بعد ما كتب كود HTML/CSS/JS بسيط.

الهدف من الملاحظة:

تشجيع الطفل على محاولته الحالية

الإشارة لشيء جميل أو واضح في الكود

تقديم اقتراح واحد فقط سهل (مثل: تغيير لون، تكبير خط، تعديل مكان، تغيير نص)

دعوة الطفل يجرب التغيير ويلاحظ النتيجة

شروط مهمة:

استخدم لهجة سعودية بسيطة

لا تستخدم مصطلحات برمجية

لا تشرح الكود

لا تقدم أكثر من اقتراح

لا تطول، الملاحظة من 3 إلى 4 جمل فقط

طلب الطفل: ${input}
الكود الناتج: ${code.substring(0, 300)}

اكتب الآن الملاحظة الصوتية باللهجة السعودية


`;

// Function for direct server-side code generation (can be used in Server Actions)
export async function generateCodeServer(prompt: string): Promise<string> {
  try {
    // Get the model and generate content
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(promptTemplate(prompt));
    const response = await result.response;
    const generatedCode = response.text();

    // Extract code from response if it's wrapped in markdown code blocks
    const codeRegex = /```(?:html)?\s*([\s\S]*?)```/;
    const match = generatedCode.match(codeRegex);

    return match && match[1] ? match[1].trim() : generatedCode;
  } catch (error) {
    console.error("Error generating code on server:", error);
    throw error;
  }
}

// Function for direct server-side feedback generation
export async function generateFeedbackServer(
  prompt: string,
  code: string
): Promise<string> {
  try {
    // Get the model and generate content
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(feedbackTemplate(prompt, code));
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Error generating feedback on server:", error);
    throw error;
  }
}

// Client-side code to interact with our secure API endpoint
export async function generateCode(prompt: string): Promise<string> {
  try {
    if (!prompt || prompt.trim() === "") {
      throw new Error("البرومبت فارغ");
    }

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.code || "";
  } catch (error) {
    console.error("Error generating code:", error);
    return `
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: 'Cairo', sans-serif; 
      text-align: center; 
      direction: rtl;
      background-color: #FFFDF5;
    }
    .error { 
      color: #F44336; 
      margin-top: 50px;
    }
  </style>
</head>
<body>
  <h2 class="error">عذراً، حدث خطأ أثناء توليد الكود</h2>
  <p>يرجى المحاولة مرة أخرى بتعليمات مختلفة</p>
</body>
</html>`;
  }
}

// Client-side code to interact with our feedback API endpoint
export async function generateFeedback(
  prompt: string,
  code: string
): Promise<string> {
  try {
    if (!prompt || !code) {
      throw new Error("البرومبت أو الكود فارغ");
    }

    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, code }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.feedback || "";
  } catch (error) {
    console.error("Error generating feedback:", error);
    // Return a fallback feedback message instead of throwing an error
    return "أحسنت! استمر في تجربة المزيد من الأفكار والتعلم. يمكنك تحسين البرومبت بإضافة المزيد من التفاصيل.";
  }
}

// New function to analyze prompt quality
export async function analyzePromptQuality(prompt: string): Promise<{
  score: number;
  feedback: string;
  improvements: string[];
}> {
  try {
    const response = await fetch("/api/analyze-prompt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error analyzing prompt quality:", error);
    throw error;
  }
}
