import React from "react";
import Image from "next/image";
import { APP_META } from "../lib/constants";

export default function Header() {
  return (
    <header className="w-full text-center py-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white relative overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between">
        <div className="flex items-center mb-4 sm:mb-0">
          <Image
            src="/images/robot-mascot.svg"
            alt="كود المرح روبوت"
            width={80}
            height={80}
            className="animate-float"
          />
          <div className="text-right mr-4">
            <h1 className="text-3xl font-bold">{APP_META.TITLE}</h1>
            <p className="mt-1 text-sm sm:text-base">{APP_META.SUBTITLE}</p>
          </div>
        </div>
        <div className="bg-yellow-300 text-blue-800 py-1 px-3 rounded-full text-sm font-bold">
          نسخة تجريبية للأطفال
        </div>
      </div>
      <div className="absolute -bottom-10 left-0 right-0 h-16 bg-[url('/images/wave.svg')] bg-repeat-x opacity-20"></div>
    </header>
  );
}
