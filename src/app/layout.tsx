import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/700.css";
import { APP_META } from "@/lib/constants";
import { AuthProvider } from "@/components/AuthProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${APP_META.TITLE} - ${APP_META.SUBTITLE}`,
  description: `منصة تعليمية تفاعلية للأطفال في الفئة العمرية ${APP_META.AGE_RANGE} لتعلم هندسة البرومبت مع الذكاء الاصطناعي`,
  viewport: "width=device-width, initial-scale=1",
  keywords: [
    "هندسة البرومبت",
    "تعليم الأطفال",
    "ذكاء اصطناعي",
    "كدكود",
    "برمجة للأطفال",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-cairo`}
        style={{ fontFamily: "Cairo, sans-serif" }}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
