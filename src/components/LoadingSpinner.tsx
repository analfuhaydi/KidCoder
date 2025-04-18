import React from "react";
import { COLORS } from "../lib/constants";

export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-full">
      <div className="relative">
        <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
        <div
          className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-transparent border-t-[#1E90FF]"
          style={{ borderTopColor: COLORS.PRIMARY }}
        ></div>
        <div className="mt-16 text-center text-gray-600">جاري التوليد...</div>
      </div>
    </div>
  );
}
