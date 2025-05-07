'use client';

import { Brain, Clock2, PhoneCall } from "lucide-react";
import Link from "next/link";

function CreateOptions() {
  // Ripple effect function
  const addRipple = (e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    ripple.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    ripple.className = "absolute bg-blue-300 opacity-30 rounded-full animate-ripple pointer-events-none";

    const existingRipple = button.querySelector(".animate-ripple");
    if (existingRipple) existingRipple.remove();

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-1 animate-fadeIn">
      {/* Option 1 */}
      <Link href={"/dashboard/create-interview"}
        className="ripple-effect relative bg-white rounded-2xl border border-gray-200 p-5 shadow-md hover:shadow-lg hover:bg-blue-50 hover:border-blue-100 hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-fadeUp delay-[100ms]"
        onClick={addRipple}
      >
        <Brain className="w-12 h-12 text-purple-600 p-3 bg-purple-100 rounded-2xl shadow-inner transition-transform hover:rotate-3 hover:scale-105" />
        <h2 className="font-bold pt-2 text-lg">Create New AI Interview</h2>
        <p className="text-gray-500 text-sm mt-1">
          Build interviews with AI and manage candidate scheduling with ease
        </p>
        <button className="mt-3 text-sm text-blue-600 font-medium cursor-pointer hover:underline">
          Get Started
        </button>
      </Link>

      {/* Option 2 */}
      <Link href={"/dashboard/create-call"}
        className="ripple-effect relative bg-white rounded-2xl border border-gray-200 p-5 shadow-md hover:shadow-lg hover:bg-blue-50 hover:border-blue-100 hover:scale-[1.02] transition-all duration-300 cursor-pointer animate-fadeUp delay-[200ms]"
        onClick={addRipple}
      >
        <PhoneCall className="w-12 h-12 text-emerald-500 p-3 bg-emerald-100 rounded-2xl shadow-inner transition-transform hover:rotate-3 hover:scale-105" />
        <h2 className="font-bold pt-2 text-lg">Set Up a Video-Calling Interview Session</h2>
        <p className="text-gray-500 text-sm mt-1">
          Plan and schedule phone interviews with candidates
        </p>
        <button className="mt-3 text-sm text-blue-600 font-medium hover:underline">
          Get Started
        </button>
        </Link>

      {/* Coming Soon Option */}
      <div
        className="relative bg-white rounded-2xl border border-dashed border-gray-300 p-5 opacity-70 hover:opacity-100 transition cursor-not-allowed animate-fadeUp delay-[300ms]"
      >
        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-2xl text-gray-400 text-2xl font-bold">
          <Clock2 />
        </div>
        <h2 className="font-bold pt-2 text-lg">Group Interview (Soon)</h2>
        <p className="text-gray-400 text-sm mt-1">
          Host multiple candidates at once — coming soon!
        </p>
      </div>
    </div>
  );
}

export default CreateOptions;
