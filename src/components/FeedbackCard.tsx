"use client";

import React from "react";
import { COLORS } from "@/lib/constants";
import VoiceNotePlayer from "./VoiceNotePlayer";

interface FeedbackCardProps {
  feedback?: string;
  audioUrl?: string;
  isLoading?: boolean;
}

export default function FeedbackCard({
  feedback,
  audioUrl,
  isLoading = false,
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

      {(audioUrl || isLoading) && (
        <VoiceNotePlayer audioUrl={audioUrl} isLoading={isLoading} />
      )}
    </div>
  );
}
