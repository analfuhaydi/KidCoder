"use client";

import React, { useState, useEffect } from "react";

interface PromptSuggestionsProps {
  currentPrompt: string;
  onSuggestionClick: (suggestion: string) => void;
}

export default function PromptSuggestions({
  currentPrompt,
  onSuggestionClick,
}: PromptSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Generate suggestions based on the current prompt
  useEffect(() => {
    if (!currentPrompt || currentPrompt.length < 5) {
      setSuggestions([]);
      return;
    }

    // Simple prompt enhancement suggestions
    const enhancedSuggestions = [
      currentPrompt + " بحجم 200 بكسل",
      currentPrompt + " باللون الأزرق",
      currentPrompt + " مع إضافة تأثير متحرك",
      currentPrompt + " مع إضافة تعليقات توضيحية",
      currentPrompt + " بخلفية متدرجة الألوان",
    ];

    // Filter suggestions to avoid duplicates
    const filteredSuggestions = enhancedSuggestions.filter(
      (suggestion) =>
        !currentPrompt.includes(suggestion.replace(currentPrompt, "").trim())
    );

    setSuggestions(filteredSuggestions.slice(0, 3));
  }, [currentPrompt]);

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-2">
      <p className="text-xs text-gray-500 mb-1 text-right">
        اقتراحات لتحسين البرومبت:
      </p>
      <div className="flex flex-wrap gap-2 justify-end">
        {suggestions.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-xs py-1 px-2 rounded border border-blue-200 bg-blue-50 hover:bg-blue-100 transition-colors"
            style={{ direction: "rtl" }}
          >
            {suggestion.replace(currentPrompt, `${currentPrompt} `).trim()}
            <span className="text-blue-500 ml-1">+</span>
          </button>
        ))}
      </div>
    </div>
  );
}
