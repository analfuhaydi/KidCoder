"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InputBox from "@/components/InputBox";
import CodePreview from "@/components/CodePreview";
import Notification from "@/components/Notification";
import VoiceNotePlayer from "@/components/VoiceNotePlayer";
import LoadingSpinner from "@/components/LoadingSpinner";
import { generateCode, generateFeedback } from "@/lib/ai";
import { generateSpeech } from "@/lib/tts";
import { COLORS } from "@/lib/constants";
import AuthGuard from "@/components/AuthGuard";

export default function Home() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "info" as "success" | "error" | "info",
  });
  const [audioUrl, setAudioUrl] = useState("");
  const [isFeedbackLoading, setIsFeedbackLoading] = useState(false);

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

  const generateFeedbackAndVoice = async (
    prompt: string,
    generatedCode: string
  ) => {
    setIsFeedbackLoading(true);
    setAudioUrl("");

    try {
      const feedbackText = await generateFeedback(prompt, generatedCode);

      const url = await generateSpeech(feedbackText);
      setAudioUrl(url);

      showNotification("تم إنشاء الملاحظة الصوتية بنجاح!", "success");
    } catch (error) {
      console.error("Error generating feedback or voice:", error);
      showNotification("حدث خطأ أثناء إنشاء الملاحظة الصوتية.", "error");
    } finally {
      setIsFeedbackLoading(false);
    }
  };

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true);
    setCode("");
    setAudioUrl("");
    setIsFeedbackLoading(false);

    try {
      const generatedCode = await generateCode(prompt);
      setCode(generatedCode);
      showNotification("تم إنشاء الكود بنجاح!", "success");

      await generateFeedbackAndVoice(prompt, generatedCode);
    } catch (error) {
      console.error("Error generating code:", error);
      showNotification("حدث خطأ أثناء إنشاء الكود.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard>
      <div
        className="flex flex-col min-h-screen"
        style={{ backgroundColor: COLORS.BACKGROUND, direction: "rtl" }}
      >
        <Header />
        <main className="flex-grow container mx-auto p-4 flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2 flex flex-col">
            <InputBox onSubmit={handleSubmit} isLoading={isLoading} />
            {isFeedbackLoading && (
              <div className="mt-4 flex justify-center items-center h-16">
                <LoadingSpinner />
              </div>
            )}
            {audioUrl && !isFeedbackLoading && (
              <div className="mt-4">
                <VoiceNotePlayer audioUrl={audioUrl} />
              </div>
            )}
          </div>
          <div className="lg:w-1/2">
            <CodePreview code={code} isLoading={isLoading && !code} />
          </div>
        </main>
        <Footer />
        <Notification
          message={notification.message}
          type={notification.type}
          show={notification.show}
          onClose={() => setNotification({ ...notification, show: false })}
        />
      </div>
    </AuthGuard>
  );
}
