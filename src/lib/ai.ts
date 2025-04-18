import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with your API key
// In production, this should be stored in environment variables
// Note: This is for direct API usage outside of the API route context
const API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY"; // Replace with your actual API key in .env
const genAI = new GoogleGenerativeAI(API_KEY);

// The model we'll use for code generation
export const MODEL_NAME = "gemini-1.5-pro";

// Template prompt for Gemini to generate children's code from natural language
export const promptTemplate = (input: string) => `
أنت مساعد برمجي للأطفال. مهمتك هي توليد كود بسيط جدًا باستخدام HTML و CSS و JavaScript فقط.
الكود يجب أن يكون تعليمي وممتع وبدون تعقيد، ويفضل أن يحتوي على تفاعل بسيط (زر، حركة، تغيير لون).
لا تستخدم مكتبات خارجية. الكود يجب أن يعمل داخل iframe مباشرة.

تعليمات الطفل:
"${input}"

أخرج الكود كاملاً في ملف HTML واحد.
`;

// Template for generating feedback about the code
export const feedbackTemplate = (input: string, code: string) => `
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
    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.code;
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
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt, code }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error);
    }

    return data.feedback;
  } catch (error) {
    console.error("Error generating feedback:", error);
    throw error;
  }
}
