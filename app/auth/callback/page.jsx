'use client';

import { useUser } from "@/app/provider";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function AuthCallback() {
  const user = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") || "/dashboard";

  useEffect(() => {
    if (user) {
      router.replace(redirectTo);
    }
  }, [user, redirectTo]);

  return <p className="text-center mt-20">Redirecting...</p>;
}
