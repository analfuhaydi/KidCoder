import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@fontsource/cairo/400.css";
import "@fontsource/cairo/700.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "كود المرح - تعليم البرمجة للأطفال",
  description:
    "تطبيق تعليمي للبرمجة يستخدم الذكاء الاصطناعي لمساعدة الأطفال على تعلم البرمجة بطريقة ممتعة",
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
        {children}
      </body>
    </html>
  );
}
