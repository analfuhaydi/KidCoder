"use client";

import React, { useState, useRef, useEffect } from "react";
import { COLORS } from "@/lib/constants";

interface VoiceNotePlayerProps {
  audioUrl?: string;
  isLoading?: boolean;
  transcript?: string;
}

export default function VoiceNotePlayer({
  audioUrl,
  isLoading = false,
  transcript = "",
}: VoiceNotePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Effect to create/update audio element and add listeners
  useEffect(() => {
    // Clear previous interval if it exists
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }

    if (audioUrl && typeof window !== "undefined") {
      // Pause and reset previous audio if URL changes
      if (audioRef.current) {
        audioRef.current.pause();
      }

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      setIsPlaying(false); // Reset playing state for new audio
      setProgress(0); // Reset progress for new audio

      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      };

      const handlePause = () => {
        // We might pause manually or it might pause due to ending
        // Ensure interval is cleared if paused manually
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      };

      audio.addEventListener("ended", handleEnded);
      audio.addEventListener("pause", handlePause);

      // Cleanup function
      return () => {
        audio.pause();
        audio.removeEventListener("ended", handleEnded);
        audio.removeEventListener("pause", handlePause);
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
        audioRef.current = null; // Clear ref on cleanup
      };
    } else {
      // If audioUrl becomes null/undefined, cleanup
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      setIsPlaying(false);
      setProgress(0);
    }
    // This effect should only re-run when the audioUrl changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioUrl]);

  // Effect to handle auto-play when loading finishes
  useEffect(() => {
    if (!isLoading && audioRef.current && !isPlaying && audioUrl) {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          startProgressTracking();
        })
        .catch((error) => {
          console.error("Auto-play failed:", error);
          // Auto-play might be blocked. User may need to click play.
        });
    }
    // Intentionally dependent on isLoading, audioUrl, and isPlaying
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, audioUrl]); // Re-run when loading finishes or audioUrl changes

  // Track audio progress
  const startProgressTracking = () => {
    // Clear existing interval before starting a new one
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }

    if (audioRef.current) {
      progressIntervalRef.current = setInterval(() => {
        if (audioRef.current && audioRef.current.duration) {
          const currentProgress =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(currentProgress);
        } else {
          // If duration is not available yet or audio ended, clear interval
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
        }
      }, 100); // Update progress every 100ms
    }
  };

  const togglePlay = () => {
    if (!audioRef.current || isLoading) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false); // State update will trigger pause listener to clear interval
    } else {
      audioRef.current
        .play()
        .then(() => {
          setIsPlaying(true);
          startProgressTracking(); // Start tracking progress on play
        })
        .catch((error) => {
          console.error("Manual play failed:", error);
        });
    }
  };

  return (
    <div className="border-t pt-3 mt-2">
      <div className="flex items-center">
        <button
          onClick={togglePlay}
          disabled={!audioUrl || isLoading}
          className={`flex items-center justify-center rounded-full w-12 h-12 focus:outline-none transition-colors ${
            isLoading ? "bg-gray-300 cursor-not-allowed" : "hover:bg-opacity-90"
          }`}
          style={!isLoading ? { backgroundColor: COLORS.PRIMARY } : {}}
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
            // Pause Icon
            <svg
              className="h-5 w-5 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            // Play Icon
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
        <div className="mr-3 flex-1">
          <div className="flex justify-between mb-1 items-center">
            <span className="font-medium text-gray-700 text-sm">
              {isLoading
                ? "جاري إعداد الملاحظة الصوتية..."
                : audioUrl
                ? isPlaying
                  ? "الملاحظة الصوتية قيد التشغيل..."
                  : "الملاحظة الصوتية جاهزة"
                : "لا توجد ملاحظة صوتية"}
            </span>
            {transcript && (
              <button
                onClick={() => setShowTranscript(!showTranscript)}
                className="text-xs text-blue-500 hover:text-blue-700 focus:outline-none"
              >
                {showTranscript ? "إخفاء النص" : "عرض النص"}
              </button>
            )}
          </div>

          {!isLoading && audioUrl && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
              <div
                className="h-1.5 rounded-full transition-all duration-100 ease-linear"
                style={{
                  width: `${progress}%`,
                  backgroundColor: COLORS.SECONDARY, // Use secondary color for progress
                }}
              ></div>
            </div>
          )}
          {isLoading && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
              <div
                className="bg-blue-500 h-1.5 rounded-full animate-pulse"
                style={{ width: `100%` }}
              ></div>
            </div>
          )}
        </div>
      </div>

      {showTranscript && transcript && (
        <div className="mt-2 p-3 bg-gray-50 rounded-md text-sm text-right border border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-300">
          {transcript}
        </div>
      )}
    </div>
  );
}
