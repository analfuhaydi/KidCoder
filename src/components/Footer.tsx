import React from "react";
import { APP_META } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="w-full text-center p-4 border-t mt-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm text-gray-600">{APP_META.FOOTER_TEXT}</p>
        <p className="text-xs text-gray-500 mt-1 md:mt-0">
          الإصدار {APP_META.VERSION}
        </p>
      </div>
    </footer>
  );
}
