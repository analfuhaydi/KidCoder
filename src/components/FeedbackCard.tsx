"use client";

import React from "react";
import { COLORS } from "@/lib/constants";
import VoiceNotePlayer from "./VoiceNotePlayer";

interface FeedbackCardProps {
  feedback?: string;
  audioUrl?: string;
  isLoading?: boolean;
  promptAnalysis?: {
    score: number;
    feedback: string;
    improvements: string[];
  };
  isAnalysisLoading?: boolean;
  transcript?: string;
}

export default function FeedbackCard({
  feedback,
  audioUrl,
  isLoading = false,
  promptAnalysis,
  isAnalysisLoading = false,
  transcript = "",
}: FeedbackCardProps) {
  return (
    <div
      className="rounded-lg p-4 mb-6 border shadow-sm"
      style={{
        backgroundColor: "#f8f9fa",
        borderColor: COLORS.PRIMARY,
        direction: "rtl",
      }}
    >
      <div className="flex items-center mb-3">
        <img
          src="/images/robot-mascot.svg"
          alt="روبوت المعلم"
          className="w-12 h-12"
        />
        <h3 className="text-lg font-bold mr-3">ملاحظات المعلم الذكي:</h3>
      </div>

      <div className="mb-3">
        {isLoading ? (
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          </div>
        ) : feedback ? (
          <p className="text-right text-gray-700 leading-relaxed">{feedback}</p>
        ) : (
          <p className="text-right text-gray-500">
            اكتب تعليمات برمجية للحصول على ملاحظات وشرح...
          </p>
        )}
      </div>

      {/* Prompt Analysis Section (new in v2) */}
      {promptAnalysis && !isAnalysisLoading && (
        <div className="mt-5 p-3 bg-blue-50 rounded-lg">
          <h4 className="text-md font-bold mb-2 flex items-center">
            <span>تقييم جودة البرومبت:</span>
            <div className="flex gap-1 mr-2">
              {Array.from({ length: 10 }).map((_, i) => (
                <span
                  key={i}
                  className={`w-2 h-4 rounded-sm ${
                    i < promptAnalysis.score ? "bg-green-500" : "bg-gray-200"
                  }`}
                ></span>
              ))}
            </div>
            <span className="mr-1 text-sm">{promptAnalysis.score}/10</span>
          </h4>

          <p className="text-right text-gray-700 text-sm mb-3">
            {promptAnalysis.feedback}
          </p>

          <div className="mt-2">
            <h5 className="text-sm font-bold mb-1">
              كيف يمكنك تحسين البرومبت:
            </h5>
            <ul className="list-disc list-inside text-right text-sm text-gray-600">
              {promptAnalysis.improvements.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {isAnalysisLoading && (
        <div className="mt-5 p-3 bg-blue-50 rounded-lg animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>
      )}

      {(audioUrl || isLoading) && (
        <VoiceNotePlayer
          audioUrl={audioUrl}
          isLoading={isLoading}
          transcript={transcript}
        />
      )}
    </div>
  );
}
