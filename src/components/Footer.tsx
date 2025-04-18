import React from "react";
import { APP_META } from "../lib/constants";

export default function Footer() {
  return (
    <footer className="w-full text-center p-4 border-t mt-8">
      <p className="text-sm text-gray-600">{APP_META.FOOTER_TEXT}</p>
    </footer>
  );
}
