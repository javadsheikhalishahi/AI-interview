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
    <section className="relative w-full overflow-hidden px-6 py-5 rounded-2xl border border-white/10 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b] shadow-lg shadow-black">
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
      <div className="relative z-10 flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-white">
            Welcome back, <span className="text-blue-400">{user?.name}</span>👋
          </h1>
          <p className="text-sm text-gray-300 mt-1">
            Your AI interview dashboard awaits.
          </p>
        </div>

        {/* Avatar & Logout */}
        {user && (
          <div className="flex items-center gap-4">
            <Image
              src={user.picture}
              alt="User Avatar"
              width={48}
              height={48}
              className="rounded-full border border-gray-700 hover:ring-2 hover:ring-blue-500 transition duration-200"
            />
            <div className="relative group">
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center p-2 rounded-full hover:bg-rose-500/10 transition cursor-pointer"
                aria-label="Sign out"
              >
                <LogOut className="h-5 w-5 text-rose-500 group-hover:text-rose-600 transition-transform duration-150 group-hover:scale-110" />
              </button>

              {/* Tooltip */}
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                Sign out
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default Welcome;
