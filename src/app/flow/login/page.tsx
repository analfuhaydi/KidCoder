"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { loginUser } from "@/lib/auth";
import { auth } from "@/lib/firebase";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password) {
      setError("الرجاء إدخال البريد الإلكتروني وكلمة المرور");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Login using Firebase
      await loginUser(email, password);

      // Redirect to main app
      router.push("/");
    } catch (err: any) {
      // Handle errors
      switch (err.message) {
        case "Firebase: Error (auth/user-not-found).":
          setError("البريد الإلكتروني غير مسجل");
          break;
        case "Firebase: Error (auth/wrong-password).":
          setError("كلمة المرور غير صحيحة");
          break;
        case "Firebase: Error (auth/invalid-email).":
          setError("البريد الإلكتروني غير صالح");
          break;
        default:
          setError("حدث خطأ أثناء تسجيل الدخول. الرجاء المحاولة مرة أخرى");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFFDF5] px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#1E90FF]">تسجيل الدخول</h2>
          <p className="text-gray-600 mt-2">
            أدخل بياناتك للوصول إلى منصة كدكود
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-right">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6 text-right">
          <div>
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              البريد الإلكتروني
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-right"
              placeholder="أدخل بريدك الإلكتروني"
              dir="rtl"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              كلمة المرور
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-right"
              placeholder="أدخل كلمة المرور"
              dir="rtl"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E90FF] text-white py-2 px-4 rounded-md hover:bg-[#1E90FF]/90 transition duration-300 disabled:opacity-50"
          >
            {loading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            ليس لديك حساب؟{" "}
            <Link
              href="/flow/create-account"
              className="text-[#1E90FF] hover:underline"
            >
              إنشاء حساب جديد
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
