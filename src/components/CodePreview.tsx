import React, { useRef, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface CodePreviewProps {
  code: string;
  isLoading: boolean;
}

export default function CodePreview({ code, isLoading }: CodePreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [showSource, setShowSource] = useState(false);

  // Function to format HTML for display
  const formatHtml = (html: string) => {
    // Simple indentation for the code display
    return html
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\n/g, "<br>")
      .replace(/\s{2}/g, "&nbsp;&nbsp;");
  };

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
    <div className="w-full border rounded-lg overflow-hidden bg-white flex flex-col h-[500px] relative">
      {/* Toggle button to switch between result and source code */}
      {code && !isLoading && (
        <div className="bg-gray-100 p-2 border-b flex justify-between items-center">
          <div>
            <button
              onClick={() => setShowSource(!showSource)}
              className="px-3 py-1 text-xs rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors ml-2"
            >
              {showSource ? "عرض النتيجة" : "عرض الكود المصدري"}
            </button>
          </div>
          <span className="text-xs text-gray-500">
            هذا الكود تم توليده من البرومبت الذي كتبته
          </span>
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <LoadingSpinner />
        ) : code ? (
          showSource ? (
            // Source code view with syntax highlighting
            <div
              className="p-4 overflow-auto h-full text-left code-preview bg-gray-50 font-mono text-sm"
              dir="ltr"
              dangerouslySetInnerHTML={{ __html: formatHtml(code) }}
            />
          ) : (
            // Result preview in iframe
            <iframe
              ref={iframeRef}
              className="w-full h-full"
              title="معاينة الكود"
              srcDoc={prepareHtmlContent()}
              sandbox="allow-scripts allow-same-origin allow-forms"
            />
          )
        ) : (
          // Empty state
          <div className="flex justify-center items-center h-full flex-col text-gray-500 p-4">
            <p className="text-xl text-center">
              أكتب برومبت الذكاء الاصطناعي وانقر على &quot;توليد الكود&quot;
              لرؤية النتيجة هنا
            </p>
            <p className="mt-2 text-center">
              كلما كان البرومبت أكثر تفصيلاً، كان الكود الناتج أفضل!
            </p>
            <div className="mt-6 p-3 bg-blue-50 rounded-lg border border-blue-100 max-w-md">
              <p className="text-sm font-bold text-right mb-1">
                نصائح للبرومبت الجيد:
              </p>
              <ul className="text-xs text-right list-disc list-inside">
                <li>صِف بالتفصيل ما تريد أن ترى في النتيجة</li>
                <li>حدد الألوان والأحجام والسلوك المطلوب</li>
                <li>اذكر أي تفاصيل خاصة مثل الحركة والتفاعل</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
