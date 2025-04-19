import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MODEL_NAME, feedbackTemplate } from "@/lib/ai";

// Initialize the Gemini API with your API key from environment variable
const API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req: Request) {
  try {
    // Get the prompt and code from the request body
    const body = await req.json();
    const { prompt, code } = body;

    if (!prompt || !code) {
      return NextResponse.json(
        { error: "الرجاء تقديم التعليمات والكود" },
        { status: 400 }
      );
    }

    // Get the model and generate feedback
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(feedbackTemplate(prompt, code));
    const response = await result.response;
    const feedback = response.text();

    return NextResponse.json({ feedback });
  } catch (error) {
    console.error("Error generating feedback:", error);
    const errorMessage =
      error instanceof Error ? error.message : "حدث خطأ أثناء توليد الملاحظات";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
