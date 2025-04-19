import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const MODEL_NAME = "gemini-1.5-pro";

// Function to analyze prompt quality
async function analyzePrompt(prompt: string) {
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  // Create a template for analyzing prompt quality
  const analysisPrompt = `
  تحليل برومبت للأطفال:
  
  أنت محلل برومبت متخصص يساعد الأطفال على تحسين مهاراتهم في هندسة البرومبت.
  قيّم جودة البرومبت التالي وقدم تقييماً من 1 إلى 10 مع تعليقات مفيدة.
  
  البرومبت للتقييم: "${prompt}"
  
  قدم مخرجات التحليل بالتنسيق التالي (بالضبط كـ JSON):
  {
    "score": (رقم بين 1 و 10),
    "feedback": "تعليق عام حول جودة البرومبت (1-2 جملة)",
    "improvements": [
      "اقتراح 1 لتحسين البرومبت",
      "اقتراح 2 لتحسين البرومبت",
      "اقتراح 3 لتحسين البرومبت"
    ]
  }
  
  قدم النتيجة بتنسيق JSON فقط بدون أي نص إضافي.
  `;

  try {
    const result = await model.generateContent(analysisPrompt);
    const response = await result.response;
    const analysisText = response.text();

    // Parse the JSON response from the generated text
    // Extract the JSON from any surrounding text the model might generate
    const jsonMatch = analysisText.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }

    // Fall back to a default response if parsing fails
    return {
      score: 5,
      feedback: "تم تحليل البرومبت، لكن لم نتمكن من تنسيق النتائج بشكل صحيح.",
      improvements: [
        "حاول أن تكون أكثر تحديداً",
        "أضف تفاصيل أكثر عن النتيجة المطلوبة",
        "استخدم كلمات وصفية أوضح",
      ],
    };
  } catch (error) {
    console.error("Error analyzing prompt:", error);
    throw error;
  }
}

// API route handler
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { prompt } = body;

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "البرومبت مطلوب ويجب أن يكون نصًا" },
        { status: 400 }
      );
    }

    const analysis = await analyzePrompt(prompt);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Error in API route:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء تحليل البرومبت" },
      { status: 500 }
    );
  }
}
