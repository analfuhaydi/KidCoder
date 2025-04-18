import { NextResponse } from "next/server";
import { textToSpeech } from "@/lib/tts";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { text } = body;

    if (!text) {
      return NextResponse.json(
        { error: "الرجاء تقديم النص للتحويل إلى صوت" },
        { status: 400 }
      );
    }

    const audioData = await textToSpeech(text);

    const base64Audio = Buffer.from(audioData).toString("base64");
    const audioUrl = `data:audio/mp3;base64,${base64Audio}`;

    return NextResponse.json({ audioUrl });
  } catch (error: unknown) {
    console.error("Error in TTS API route:", error);
    // Provide a more specific error message if possible
    const errorMessage =
      error instanceof Error
        ? error.message
        : "حدث خطأ غير معروف أثناء توليد الصوت";
    // Determine appropriate status code based on error type if needed
    const status = errorMessage.includes("Missing") ? 400 : 500;

    return NextResponse.json({ error: errorMessage }, { status: status });
  }
}
