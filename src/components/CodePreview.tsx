import React, { useRef } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface CodePreviewProps {
  code: string;
  isLoading: boolean;
}

export default function CodePreview({ code, isLoading }: CodePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Prepare HTML content with Cairo font for Arabic support
  const prepareHtmlContent = () => {
    if (!code) return "";

    // Add the Cairo font import to ensure proper Arabic rendering in the iframe
    const htmlWithFont = code.includes("<head>")
      ? code.replace(
          "<head>",
          '<head><link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet">'
        )
      : code;

    return htmlWithFont;
  };

  return (
    <div className="w-full border rounded-lg overflow-hidden bg-white h-[500px] relative">
      {isLoading ? (
        <LoadingSpinner />
      ) : code ? (
        <iframe
          ref={iframeRef}
          className="w-full h-full"
          title="معاينة الكود"
          srcDoc={prepareHtmlContent()}
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      ) : (
        <div className="flex justify-center items-center h-full flex-col text-gray-500">
          <p className="text-xl text-center">
            أكتب تعليماتك البرمجية وانقر على &quot;توليد الكود&quot; لرؤية
            النتيجة هنا
          </p>
          <p className="mt-2 text-center">
            سيقوم الذكاء الاصطناعي بتحويل تعليماتك إلى كود برمجي!
          </p>
        </div>
      )}
    </div>
  );
}
