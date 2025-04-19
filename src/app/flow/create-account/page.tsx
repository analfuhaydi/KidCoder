"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/lib/auth";

export default function CreateAccount() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | "">("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle registration
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password || !confirmPassword || !name || !age) {
      setError("الرجاء إكمال جميع الحقول");
      return;
    }

    if (password !== confirmPassword) {
      setError("كلمتا المرور غير متطابقتين");
      return;
    }

    if (typeof age === "number" && (age < 6 || age > 16)) {
      setError("العمر يجب أن يكون بين 6 و 16 سنة");
      return;
    }

    try {
      setLoading(true);
      setError("");

      // Register using Firebase and store user data in Firestore
      const numericAge =
        typeof age === "number" ? age : parseInt(age as string, 10);
      await registerUser(email, password, name, numericAge);

      // Redirect to main app
      router.push("/");
    } catch (err: any) {
      // Handle errors
      switch (err.message) {
        case "Firebase: Error (auth/email-already-in-use).":
          setError("البريد الإلكتروني مستخدم بالفعل");
          break;
        case "Firebase: Error (auth/invalid-email).":
          setError("البريد الإلكتروني غير صالح");
          break;
        case "Firebase: Password should be at least 6 characters (auth/weak-password).":
          setError("كلمة المرور يجب أن تكون 6 أحرف على الأقل");
          break;
        default:
          setError("حدث خطأ أثناء إنشاء الحساب. الرجاء المحاولة مرة أخرى");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#FFFDF5] px-4 py-8">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[#1E90FF]">إنشاء حساب جديد</h2>
          <p className="text-gray-600 mt-2">
            أدخل بيانات الطفل لإنشاء حساب في منصة كدكود
          </p>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-right">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-4 text-right">
          <div>
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              اسم الطفل
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-right"
              placeholder="أدخل اسم الطفل"
              dir="rtl"
            />
          </div>

          <div>
            <label
              htmlFor="age"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              عمر الطفل
            </label>
            <input
              type="number"
              id="age"
              min={6}
              max={16}
              value={age}
              onChange={(e) =>
                setAge(e.target.value ? parseInt(e.target.value, 10) : "")
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-right"
              placeholder="أدخل عمر الطفل"
              dir="rtl"
            />
          </div>

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
              placeholder="أدخل البريد الإلكتروني"
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
              placeholder="أدخل كلمة المرور (6 أحرف على الأقل)"
              dir="rtl"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              تأكيد كلمة المرور
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E90FF] text-right"
              placeholder="أعد إدخال كلمة المرور"
              dir="rtl"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1E90FF] text-white py-2 px-4 rounded-md hover:bg-[#1E90FF]/90 transition duration-300 disabled:opacity-50 mt-6"
          >
            {loading ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            لديك حساب بالفعل؟{" "}
            <Link href="/flow/login" className="text-[#1E90FF] hover:underline">
              تسجيل الدخول
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
