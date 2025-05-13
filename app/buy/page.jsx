"use client";

import { Separator } from "@/components/ui/separator";
import { ArrowLeft, CheckCircle, CreditCard, X } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function BuyPageContent() {
  const searchParams = useSearchParams();
  const selectedPlan = searchParams.get("plan") || "basic";

  const plans = {
    basic: {
      name: "Basic",
      price: "$49",
      features: [
        { text: "10 AI Interviews/month", included: true },
        { text: "Basic AI Rating", included: true },
        { text: "Candidate Link Sharing", included: true },
        { text: "Standard Reporting", included: true },
        { text: "Live Interview Scheduling", included: false },
        { text: "Advanced Recommendations", included: false },
      ],
    },
    pro: {
      name: "Pro",
      price: "$99",
      features: [
        { text: "50 AI Interviews/month", included: true },
        { text: "Advanced AI Rating", included: true },
        { text: "Candidate Link Sharing", included: true },
        { text: "Detailed Reporting", included: true },
        { text: "Live Interview Scheduling", included: true },
        { text: "Basic Recommendations", included: true },
      ],
    },
  };

  const plan = plans[selectedPlan];
  
  if (!plan) {
    return (
      <div className="text-center text-red-500 mt-20">
          Invalid plan selected. Please return to the pricing page.
      </div>
    );
}

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white animate-fadeUp">
      {/* Full-width Top Nav */}
      <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold text-white hover:text-yellow-400 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>
      </nav>

      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto px-6 py-20 space-y-8">
        {/* Heading */}
        <section className="text-center animate-fadeIn -mt-7">
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-white via-purple-400 to-indigo-500 bg-clip-text text-transparent mb-3">
            Complete Your Purchase
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Select your plan and proceed with secure checkout to unlock powerful
            AI hiring tools.
          </p>
        </section>

        {/* Selected Plan Summary */}
        <section className="bg-gray-800 border border-gray-700 rounded-3xl p-10 shadow-2xl slide-in-top">
          <h2 className="text-2xl font-bold text-white mb-6">
            Your Selected Plan
          </h2>

          {/* Plan Title & Price */}
          <div className="mb-6 bounce-in1">
            <h3 className="text-3xl font-extrabold bg-gradient-to-bl from-white via-purple-400 to-indigo-500 bg-clip-text text-transparent">
              {plan.name}
            </h3>
            <Separator className="mt-2 bg-gray-500" />
            <div
              className={`text-4xl font-extrabold mt-4 ${
                plan.price === "$99" ? "text-purple-600" : "text-blue-500"
              }`}
            >
              {plan.price}{" "}
              <span className="text-xl text-gray-400 font-medium">/month</span>
            </div>
          </div>

          {/* Features List */}
          <ul className="space-y-4 text-gray-300 animate-slideInRight">
            {plan.features.map((feature, idx) => (
              <li
                key={idx}
                className={`flex items-center ${
                  !feature.included ? "text-gray-500" : ""
                }`}
              >
                {feature.included ? (
                  <CheckCircle
                    size={20}
                    className="text-green-500 mr-2 animate-slideInRight1"
                  />
                ) : (
                  <X
                    size={20}
                    className="text-red-500 mr-2 animate-slideInRight2"
                  />
                )}
                {feature.text}
              </li>
            ))}
          </ul>
        </section>

        {/* Checkout Button */}
        <section className="text-center">
          <div className="flex justify-center">
          <Link href={`/payment?plan=${selectedPlan}`}
          target="_blank"
          rel="noopener noreferrer"
          >
            <button
              type="button"
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold px-10 py-4 
                 rounded-full shadow-lg hover:scale-105 hover:from-blue-700 hover:to-purple-700 
                 focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-300 
                 cursor-pointer animate-buttonEntrance flex items-center gap-2"
              aria-label="Proceed to secure payment"
            >
              <CreditCard className="w-6 h-6 animate-wiggle" />
              Proceed to Payment
            </button>
            </Link>
          </div>
          <p className="text-sm text-gray-500 mt-4">
            Payments are securely processed. You can cancel anytime.
          </p>
        </section>
      </div>
    </main>
  );
}

// Export the default component wrapped in Suspense
export default function BuyPage() {
  return (
      <Suspense fallback={<div>Loading purchase options...</div>}>
          <BuyPageContent />
      </Suspense>
  );
}