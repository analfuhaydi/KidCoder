import React, { useState } from "react";
import { COLORS, SAMPLE_PROMPTS } from "../lib/constants";
import PromptSuggestions from "./PromptSuggestions";

interface InputBoxProps {
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

export default function InputBox({ onSubmit, isLoading }: InputBoxProps) {
  const [prompt, setPrompt] = useState("");

  // Get a random sample prompt for inspiration
  const getRandomPrompt = () => {
    const randomIndex = Math.floor(Math.random() * SAMPLE_PROMPTS.length);
    setPrompt(SAMPLE_PROMPTS[randomIndex]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  // Handle prompt suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setPrompt(suggestion);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full mb-4">
      <div className="flex flex-col space-y-4">
        <label
          htmlFor="prompt"
          className="font-bold text-xl text-right flex items-center justify-end"
        >
          <span>اكتب برومبت الذكاء الاصطناعي:</span>
          <div className="tooltip mr-2 cursor-help">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="tooltiptext bg-gray-800 text-white text-xs rounded py-1 px-2 absolute z-10 right-full mr-2 w-64 text-right">
              برومبت هو التعليمات التي تعطيها للذكاء الاصطناعي ليفهم ما تريد
            </span>
          </div>
        </label>

        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="مثال: ارسم زرًا أخضر يتحول للأحمر عند الضغط عليه"
          className="p-4 border rounded-lg w-full h-32 resize-none text-right"
          dir="rtl"
          disabled={isLoading}
        />

        {/* Add prompt suggestions component */}
        <PromptSuggestions
          currentPrompt={prompt}
          onSuggestionClick={handleSuggestionClick}
        />

        <div className="flex flex-col sm:flex-row sm:justify-between space-y-2 sm:space-y-0">
          <button
            type="button"
            onClick={getRandomPrompt}
            className="px-4 py-2 border rounded-md bg-white hover:bg-gray-100 transition-colors text-sm flex items-center justify-center"
            disabled={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            اقتراح برومبت
          </button>

          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            style={{ backgroundColor: isLoading ? "#ccc" : COLORS.PRIMARY }}
            className="px-6 py-2 rounded-md text-white transition-colors flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                جاري التوليد...
              </>
            ) : (
              <>
                توليد الكود
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 mr-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 5l7 7-7 7M5 5l7 7-7 7"
                  />
                </svg>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Character count with prompt quality indicators */}
      <div className="mt-1 flex justify-end items-center text-sm">
        <span
          className={`${
            prompt.length > 0 && prompt.length < 10
              ? "text-red-500"
              : prompt.length >= 10 && prompt.length < 30
              ? "text-yellow-500"
              : prompt.length >= 30
              ? "text-green-500"
              : "text-gray-400"
          }`}
        >
          {prompt.length > 0 ? (
            <>
              {prompt.length < 10
                ? "برومبت قصير جدًا"
                : prompt.length < 30
                ? "برومبت متوسط"
                : "برومبت جيد"}
              <span className="mx-2">•</span>
            </>
          ) : null}
          {prompt.length} حرف
        </span>
      </div>
    </form>
  );
}
