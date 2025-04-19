import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { MODEL_NAME, promptTemplate } from "@/lib/ai";

// Initialize the Gemini API with your API key from environment variable
const API_KEY = process.env.GEMINI_API_KEY || "YOUR_API_KEY";
const genAI = new GoogleGenerativeAI(API_KEY);

export async function POST(req: Request) {
  try {
    // Get the prompt from the request body
    const body = await req.json();
    const { prompt } = body;

    if (!prompt) {
      return NextResponse.json(
        { error: "الرجاء تقديم تعليمات برمجية" },
        { status: 400 }
      );
    }

    // Get the model and generate content
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });
    const result = await model.generateContent(promptTemplate(prompt));
    const response = await result.response;
    const generatedCode = response.text();

    // Extract code from response if it's wrapped in markdown code blocks
    const codeRegex = /```(?:html)?\s*([\s\S]*?)```/;
    const match = generatedCode.match(codeRegex);

    const finalCode = match && match[1] ? match[1].trim() : generatedCode;

    return NextResponse.json({ code: finalCode });
  } catch (error) {
    console.error("Error generating code:", error);
    const errorMessage =
      error instanceof Error ? error.message : "حدث خطأ أثناء توليد الكود";

    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
