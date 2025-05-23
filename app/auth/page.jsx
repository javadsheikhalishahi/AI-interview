'use client';

import { Button } from "@/components/ui/button";
import { supabase } from "@/services/supabaseClient";
import { LinkedinIcon } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react"; // Import Suspense

// Create a component that contains the logic and uses useSearchParams
function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  
  useEffect(() => {
    if (typeof window === "undefined") return;

    const hash = window.location.hash;

    if (hash) {
      const params = new URLSearchParams(hash.substring(1));
      const access_token = params.get("access_token");
      const refresh_token = params.get("refresh_token");
      const token_type = params.get("token_type");

      if (access_token && refresh_token && token_type) {
        supabase.auth.setSession({
          access_token,
          refresh_token,
        }).then(() => {
          router.replace(redirectTo); // Clean redirect
        });
      }
    }
  }, []);

  const signInWithGoogle = async () => {
    setLoading(true);
    // Use the redirectTo obtained from searchParams
    const redirectAfterLogin = searchParams?.get("redirectTo") || "/dashboard";
    const redirectUrl = process.env.NEXT_PUBLIC_APP_URL;

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${redirectUrl}/auth/callback?redirectTo=${redirectAfterLogin}`,
      },
    });

    if (error) {
      console.error('Error:', error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-blue-50 via-purple-100 to-pink-100">
      <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg p-10 shadow-2xl w-full max-w-md animate-slideInRight">
        <Image
          src="/Logo1.png"
          alt="AIQuestify Logo"
          width={400}
          height={100}
          className="w-48 mb-0 animate-slideInRight1"
        />
        <div className="flex flex-col items-center">
          <Image
            src="/Login.svg"
            alt="Login illustration"
            width={600}
            height={400}
            className="w-64 h-64 mb-8"
          />
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 animate-slideInRight2">
            Welcome to AIQuestify
          </h2>
          <p className=" text-sm sm:text-sm text-gray-700 text-center mb-6 animate-slideInRight2">
            Sign in with your Google account to continue
          </p>
          <Button
            onClick={() => {
              signInWithGoogle();
            }}
            disabled={loading}
            aria-label="Login with Google"
            className={`w-full flex items-center justify-center gap-2 py-3 text-white bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 rounded-lg shadow-xl transition duration-300 ease-in-out transform hover:scale-105 cursor-pointer animate-buttonEntrance animate-pulseGlow ${
              loading ? "opacity-60 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <span className="animate-spin rounded-full border-2 border-white border-t-transparent h-5 w-5" />
            ) : (
              <>
                <Image
                  src={"/Google-logo.svg"}
                  alt="Google-logo"
                  width={20}
                  height={20}
                  className="mr-1"
                />{" "}
                Login with Google
              </>
            )}
          </Button>
        </div>
      </div>
      <footer className="text-center text-sm text-gray-600 mt-6 mb-4 flex flex-col items-center gap-2">
        <div>
          © 2025{" "}
          <a
            href="https://www.linkedin.com/in/javad-sheikhalishahi-60094629b/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline"
          >
            Javad Sheikhalishahi
          </a>
          . All rights reserved.
        </div>
        <div className="flex gap-3">
          <a
            href="https://www.linkedin.com/in/javad-sheikhalishahi-60094629b/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-all hover:scale-110 transform"
            aria-label="LinkedIn"
          >
            <LinkedinIcon size={18} />
          </a>
        </div>
      </footer>
    </div>
  );
}

// Export the default component wrapped in Suspense
export default function Login() {
  return (
    <Suspense fallback={<div>Loading login...</div>}>
      <LoginForm />
    </Suspense>
  );
}