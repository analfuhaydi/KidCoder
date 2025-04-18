"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import InputBox from "@/components/InputBox";
import CodePreview from "@/components/CodePreview";
import Notification from "@/components/Notification";
import { generateCode } from "@/lib/ai";
import { COLORS } from "@/lib/constants";

export default function Home() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "info" as "success" | "error" | "info",
  });

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

  const handleSubmit = async (prompt: string) => {
    setIsLoading(true);
    showNotification("جاري توليد الكود...", "info");

    try {
      const generatedCode = await generateCode(prompt);
      setCode(generatedCode);
      showNotification("تم توليد الكود بنجاح!", "success");
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
    <div className="flex flex-col min-h-screen bg-[#FFFDF5]">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="order-2 lg:order-1">
            <h2 className="text-xl font-bold mb-3 text-right">المعاينة</h2>
            <CodePreview code={code} isLoading={isLoading} />
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-xl font-bold mb-3 text-right">الكود</h2>
            <InputBox onSubmit={handleSubmit} isLoading={isLoading} />

            <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
              <h3 className="text-lg font-bold text-right mb-2">
                نصائح للأطفال:
              </h3>
              <ul className="list-disc list-inside text-right text-sm space-y-1">
                <li>جرب كتابة تعليمات واضحة مثل "ارسم دائرة حمراء"</li>
                <li>يمكنك طلب أشكال متحركة أو ألعاب بسيطة</li>
                <li>استخدم زر "اقتراح فكرة" للحصول على أفكار جديدة</li>
                <li>جرب تعديل التعليمات لترى نتائج مختلفة</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <Notification
        message={notification.message}
        type={notification.type}
        show={notification.show}
        onClose={() => setNotification((prev) => ({ ...prev, show: false }))}
      />
    </div>
  );
}
