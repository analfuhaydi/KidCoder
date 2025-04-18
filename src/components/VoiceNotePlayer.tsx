"use client";

import React, { useState, useRef, useEffect } from "react";
import { COLORS } from "@/lib/constants";

interface VoiceNotePlayerProps {
  audioUrl?: string;
  isLoading?: boolean;
}

export default function VoiceNotePlayer({
  audioUrl,
  isLoading = false,
}: VoiceNotePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Create audio element when audioUrl changes
  useEffect(() => {
    if (audioUrl && typeof window !== "undefined") {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;

      audio.addEventListener("ended", () => {
        setIsPlaying(false);
      });

      return () => {
        audio.pause();
        audio.removeEventListener("ended", () => {
          setIsPlaying(false);
        });
      };
    }
  }, [audioUrl]);

  const togglePlay = () => {
    if (!audioRef.current || isLoading) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex items-center justify-center py-2">
      <button
        onClick={togglePlay}
        disabled={!audioUrl || isLoading}
        className={`flex items-center justify-center rounded-full w-12 h-12 focus:outline-none transition-colors ${
          isLoading ? "bg-gray-300 cursor-not-allowed" : "" // Remove dynamic Tailwind classes
        }`}
        style={
          // Apply colors using inline styles
          !isLoading
            ? {
                backgroundColor: COLORS.PRIMARY,
              }
            : {}
        }
        // Add hover effect handling if needed via state or simple CSS (though inline hover isn't direct)
        // A simple approach is to rely on default browser focus/active states or add more complex state management
        aria-label={isPlaying ? "إيقاف التشغيل" : "تشغيل الملاحظة الصوتية"}
      >
        {isLoading ? (
          <svg
            className="animate-spin h-5 w-5 text-white"
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
        ) : isPlaying ? (
          <svg
            className="h-5 w-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1zm4 0a1 1 0 00-1 1v4a1 1 0 002 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            className="h-5 w-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>
      <span className="mr-3 font-medium text-gray-700">
        {isLoading
          ? "جاري إعداد الملاحظة الصوتية..."
          : isPlaying
          ? "الملاحظة الصوتية قيد التشغيل..."
          : "اضغط لتشغيل الملاحظة الصوتية"}
      </span>
    </div>
  );
}
