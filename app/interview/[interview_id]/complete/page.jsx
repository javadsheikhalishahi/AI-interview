'use client';

import { supabase } from "@/services/supabaseClient";
import { BrainCog, CheckCircle, ChevronRight, Clock, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function InterviewComplete() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const { data, error } = await supabase
        .from("interview-feedback")
        .select("userName, userEmail")
        .order("created_at", { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error("Error fetching interview data:", error);
      } else if (data) {
        setUserName(data.userName);
        setUserEmail(data.userEmail);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#f3f4f6] via-[#e0e7ff] to-[#dbeafe] px-6 py-10">
      <main className="flex-1 flex items-center justify-center animate-slideInRight1">
        <div className="relative w-full max-w-3xl sm:max-w-2xl bg-white/40 border border-white/50 backdrop-blur-2xl shadow-2xl rounded-2xl px-8 py-12 overflow-hidden">
          {/* Subtle background glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-purple-300 via-blue-300 to-transparent opacity-20 blur-2xl pointer-events-none"></div>

          <div className="relative z-10 flex flex-col items-center text-center gap-8 animate-slideInRight2">
            <div className="bg-gradient-to-tr from-green-400 to-green-600 p-5 rounded-full shadow-lg animate-pulse">
              <CheckCircle className="text-white w-10 h-10" />
            </div>

            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 tracking-tight">
              Interview Completed 🎉
            </h1>

            <p className="text-gray-700 text-base">
              Good job, <span className="font-semibold text-gray-900">{userName}</span>!
              <br />
              Your responses have been submitted — now our smart AI is reviewing your performance.
            </p>
            <p className="text-gray-600 text-sm">
              A detailed feedback report will be sent to <strong>{userEmail}</strong>.
            </p>

            {/* Evaluation in Progress */}
            <div className="w-full text-left bg-white/60 border border-gray-200 rounded-2xl p-6 shadow-lg backdrop-blur-lg transition hover:scale-[1.015] hover:shadow-xl duration-300 ease-in-out animate-slideInRight3">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-purple-600 w-5 h-5" />
                <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                  AI Evaluation In Progress
                </h2>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed">
                Our intelligent engine is analyzing your answers based on clarity, confidence, communication, and more. We will contact you once the evaluation is complete.
              </p>
              <p className="flex items-center gap-1 text-xs text-gray-500 mt-3">
                <Clock className="w-4 h-4 text-yellow-500" />
                Response within <span className="font-medium text-gray-800">24–48 business hours</span>.
              </p>
            </div>

            {/* What’s Next */}
            <div className="w-full text-left bg-white/60 border border-gray-200 rounded-2xl p-6 shadow-lg backdrop-blur-lg transition hover:scale-[1.015] hover:shadow-xl duration-300 ease-in-out animate-slideInRight4">
              <div className="flex items-center gap-2 mb-2">
                <BrainCog className="text-blue-500 w-5 h-5" />
                <h2 className="text-sm font-semibold text-gray-800 uppercase tracking-wide">
                  What’s Next?
                </h2>
              </div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-400 mt-1" />
                  Your answers are reviewed by advanced AI models trained on expert interview data.
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-400 mt-1" />
                  You’ll receive a personalized report with insights and scores.
                </li>
                <li className="flex items-start gap-2">
                  <ChevronRight className="w-4 h-4 text-blue-400 mt-1" />
                  You’ll get notified once your evaluation is ready.
                </li>
              </ul>
            </div>

            {/* Reassurance */}
            <p className="text-sm text-gray-500 pt-4 max-w-md animate-fadeUp">
              You’re in great hands — our AI ensures a fair, unbiased, and insightful review.
              Sit back and relax. We’ve got this. 🌟
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full text-center text-sm text-gray-500 mt-1">
        <div className="py-4">
          © {new Date().getFullYear()} AIQuestify. All rights reserved.
          <span className="block text-xs text-gray-400">Built with ❤️ </span>
        </div>
      </footer>
    </div>
  );
}
