"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InputBox from "@/components/InputBox";
import CodePreview from "@/components/CodePreview";
import Notification from "@/components/Notification";
import FeedbackCard from "@/components/FeedbackCard";
import { generateCode, generateFeedback, analyzePromptQuality } from "@/lib/ai";
import { generateSpeech } from "@/lib/tts";
import { COLORS, PROMPT_ENGINEERING_TIPS } from "@/lib/constants";
import AuthGuard from "@/components/AuthGuard";

export default function Home() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "info" as "success" | "error" | "info",
  });
  const [lastPrompt, setLastPrompt] = useState("");
  const [feedback, setFeedback] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);
  const [promptAnalysis, setPromptAnalysis] = useState<{
    score: number;
    feedback: string;
    improvements: string[];
  } | null>(null);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);

  const showNotification = (
    message: string,
    type: "success" | "error" | "info"
  ) => {
    setNotification({
      show: true,
      message,
      type,
    });
  };

  // Generate feedback, voice note, and analyze prompt quality
  const generateFeedbackAndAnalysis = async (
    prompt: string,
    generatedCode: string
  ) => {
    setIsFeedbackLoading(true);
    setIsAnalysisLoading(true);

    try {
      // Run these in parallel for better performance
      const [feedbackText, promptAnalysisResult] = await Promise.all([
        generateFeedback(prompt, generatedCode),
        analyzePromptQuality(prompt),
      ]);

      setFeedback(feedbackText);
      setPromptAnalysis(promptAnalysisResult);

      // Generate speech from the feedback text
      const speechUrl = await generateSpeech(feedbackText);
      setAudioUrl(speechUrl);
    } catch (error) {
      console.error("Error generating feedback or analysis:", error);
      setFeedback("عذراً، حدث خطأ أثناء توليد الملاحظات");
      setPromptAnalysis(null);
    } finally {
      setIsFeedbackLoading(false);
      setIsAnalysisLoading(false);
    }
  };

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true);
    setLastPrompt(prompt);
    setFeedback("");
    setAudioUrl("");
    setPromptAnalysis(null);
    showNotification("جاري توليد الكود...", "info");

    try {
      const generatedCode = await generateCode(prompt);
      setCode(generatedCode);
      showNotification("تم توليد الكود بنجاح!", "success");

      // After code generation, generate feedback and analyze prompt
      await generateFeedbackAndAnalysis(prompt, generatedCode);
    } catch (error) {
      console.error("Error generating code:", error);
      showNotification("حدث خطأ أثناء توليد الكود", "error");

      // Show an error message in the preview
      setCode(`
<!DOCTYPE html>
<html>
<head>
  <style>
    body { 
      font-family: 'Cairo', sans-serif; 
      text-align: center; 
      direction: rtl;
      background-color: ${COLORS.BACKGROUND};
    }
    .error { 
      color: ${COLORS.ERROR}; 
      margin-top: 50px;
    }
  </style>
</head>
<body>
  <h2 class="error">عذراً، حدث خطأ أثناء توليد الكود</h2>
  <p>يرجى المحاولة مرة أخرى بتعليمات مختلفة</p>
</body>
</html>`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen bg-[#FFFDF5]">
        <Header />

        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="order-2 lg:order-1">
              <h2 className="text-xl font-bold mb-3 text-right">المعاينة</h2>
              <CodePreview code={code} isLoading={isLoading} />
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-xl font-bold mb-3 text-right">
                برومبت الذكاء الاصطناعي
              </h2>
              <InputBox onSubmit={handleSubmit} isLoading={isLoading} />

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="text-lg font-bold text-right mb-2">
                  نصائح لهندسة البرومبت:
                </h3>
                <ul className="list-disc list-inside text-right text-sm space-y-1">
                  {PROMPT_ENGINEERING_TIPS.map((tip, index) => (
                    <li key={index}>{tip}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Feedback section with prompt analysis */}
          {(feedback ||
            lastPrompt ||
            isFeedbackLoading ||
            promptAnalysis ||
            isAnalysisLoading) && (
            <div className="mt-8">
              <FeedbackCard
                feedback={feedback}
                audioUrl={audioUrl}
                isLoading={isFeedbackLoading}
                promptAnalysis={promptAnalysis || undefined}
                isAnalysisLoading={isAnalysisLoading}
                transcript={feedback} // Pass feedback as transcript to VoiceNotePlayer
              />
            </div>
          )}
        </main>

        <Footer />

        <Notification
          message={notification.message}
          type={notification.type}
          show={notification.show}
          onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
        />
      </div>
    </AuthGuard>
  );
}
