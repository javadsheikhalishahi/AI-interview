'use client';

import { useUser } from "@/app/provider";
import { supabase } from "@/services/supabaseClient";
import { LogOut } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Welcome() {
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  return (
    <div className="relative w-full">
      {/* Blue blur background */}
      <div className="absolute -top-0 right-1 z-0 bg-blue-600 rounded-full opacity-90 w-[80px] h-[80px] blur-xl" />

      {/* Main content */}
      <div className="relative z-10 flex w-full justify-between items-center glassmorphism-1 p-5 rounded-xl">
        {/* Welcome Text */}
        <div className="animate-slideInRight">
          <h2 className="font-bold sm:text-lg md:text-xl lg:text-xl">
            Welcome Back <span className="animate-pulse">👋</span>, {user?.name}
          </h2>
          <p className="text-gray-500 text-sm pt-1">
            AI Interviews, Smarter Process, Faster Hires
          </p>
        </div>

        {/* Avatar + Sign Out Button */}
        {user && (
          <div className="flex items-center gap-1">
            <Image
              src={user?.picture}
              alt="Avatar"
              width={40}
              height={40}
              className="rounded-full shadow-md border border-gray-200"
            />
            {/* Sign Out Icon Button */}
            <button
              onClick={handleSignOut}
              className="p-2 rounded-full  transition-colors cursor-pointer"
            >
              <LogOut className="w-6 h-6 text-rose-600 hover:scale-110 hover:animate-bounce" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Welcome;
