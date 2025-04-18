import React, { useState } from "react";
import { COLORS, SAMPLE_PROMPTS } from "../lib/constants";

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

  return (
    <form onSubmit={handleSubmit} className="w-full mb-4">
      <div className="flex flex-col space-y-4">
        <label htmlFor="prompt" className="font-bold text-xl text-right">
          أكتب تعليماتك البرمجية:
        </label>

        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="مثال: ارسم دائرة حمراء تتحرك عند النقر عليها"
          className="p-4 border rounded-lg w-full h-32 resize-none text-right"
          dir="rtl"
          disabled={isLoading}
        />

        <div className="flex justify-between">
          <button
            type="button"
            onClick={getRandomPrompt}
            className="px-4 py-2 border rounded-md bg-white hover:bg-gray-100 transition-colors text-sm"
            disabled={isLoading}
          >
            اقتراح فكرة
          </button>

          <button
            type="submit"
            disabled={!prompt.trim() || isLoading}
            style={{ backgroundColor: isLoading ? "#ccc" : COLORS.PRIMARY }}
            className="px-6 py-2 rounded-md text-white transition-colors"
          >
            {isLoading ? "جاري التوليد..." : "توليد الكود"}
          </button>
        </div>
      </div>
    </form>
  );
}
