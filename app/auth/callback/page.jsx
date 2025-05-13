'use client';

import { useUser } from "@/app/provider";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

// This component uses useSearchParams and should be wrapped in Suspense
function AuthCallbackContent() {
  const user = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  useEffect(() => {
    if (user) {
      router.replace(redirectTo);
    }
  }, [user, redirectTo, router]); 

  return <p className="text-center mt-20">Redirecting...</p>;
}

// Wrap the component that uses useSearchParams in a Suspense boundary
export default function AuthCallback() {
  return (
    <Suspense fallback={<p className="text-center mt-20">Loading...</p>}>
      <AuthCallbackContent />
    </Suspense>
  );
}