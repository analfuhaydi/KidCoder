"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { APP_META } from "@/lib/constants";

export default function LandingPage() {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/flow/login");
  };

  const handleSignup = () => {
    router.push("/flow/create-account");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFDF5]">
      {/* Hero Section */}
      <header className="py-6 px-4 bg-gradient-to-b from-[#1E90FF20] to-transparent">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-[#1E90FF]">
              {APP_META.TITLE}
            </h1>
            <button
              onClick={handleLogin}
              className="bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white px-6 py-2 rounded-md transition-colors"
            >
              دخول
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-4xl font-bold mb-6 text-right leading-tight">
              {APP_META.SUBTITLE}
            </h2>
            <p className="text-lg mb-8 text-right text-gray-700">
              منصة تعليمية تفاعلية للأطفال في الفئة العمرية {APP_META.AGE_RANGE}{" "}
              لتعلم هندسة البرومبت مع الذكاء الاصطناعي من خلال تجربة ممتعة
              وتفاعلية.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSignup}
                className="bg-[#1E90FF] hover:bg-[#1E90FF]/90 text-white px-8 py-3 rounded-md text-lg transition-colors"
              >
                ابدأ الآن
              </button>
              <button
                onClick={() =>
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                  })
                }
                className="bg-white border-2 border-[#1E90FF] text-[#1E90FF] hover:bg-[#1E90FF]/10 px-8 py-3 rounded-md text-lg transition-colors"
              >
                تعرف أكثر
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-full h-[300px] lg:h-[400px]">
              <Image
                src="/images/robot-mascot.svg"
                alt="كدكود - روبوت المنصة"
                fill
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-16">
          <h2 className="text-3xl font-bold mb-12 text-center">
            مميزات المنصة
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4 text-[#1E90FF] flex justify-center">
                🎮
              </div>
              <h3 className="text-xl font-bold mb-2">تعلم بطريقة ممتعة</h3>
              <p className="text-gray-700">
                تعلم مهارات هندسة البرومبت من خلال التفاعل مع الذكاء الاصطناعي
                بطريقة ممتعة وتفاعلية
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4 text-[#1E90FF] flex justify-center">
                🔊
              </div>
              <h3 className="text-xl font-bold mb-2">ملاحظات صوتية</h3>
              <p className="text-gray-700">
                احصل على ملاحظات صوتية باللغة العربية تشرح الكود وكيفية تحسين
                البرومبت
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="text-5xl mb-4 text-[#1E90FF] flex justify-center">
                📊
              </div>
              <h3 className="text-xl font-bold mb-2">تقييم البرومبت</h3>
              <p className="text-gray-700">
                الحصول على تقييم فوري لجودة البرومبت واقتراحات للتحسين
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-gray-100 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-600">{APP_META.FOOTER_TEXT}</p>
        </div>
      </footer>
    </div>
  );
}
