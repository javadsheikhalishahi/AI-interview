'use client';

import { useUser } from "@/app/provider";
import Image from "next/image";

function Welcome() {
  const { user } = useUser();
  return (
    <div className="relative w-full">
      {/* Blue blur background */}
      <div className="absolute -top-0 right-1 z-0 bg-blue-600 rounded-full opacity-90 w-[80px] h-[80px] blur-xl" />
      {/* Main content */}
      <div className="relative z-10 flex w-full justify-between items-center glassmorphism-1 p-5 rounded-xl">
        <div className="animate-slideInRight">
          <h2 className="font-bold sm:text-lg md:text-xl lg:text-xl">Welcome Back <span className="animate-pulse">👋</span>, {user?.name}</h2>
          <h2 className="text-gray-500 text-sm pt-1">AI Interviews, Smarter Process, Faster Hires</h2>
        </div>
        {user && (
          <Image
            src={user?.picture}
            alt="Avatar"
            width={40}
            height={40}
            className="rounded-full lg:size-9 md:size-7"
          />
        )}
      </div>
    </div>
  );
}

export default Welcome;
