"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function RedirectIfAuthenticated({
  children,
  redirectTo = "/admin/dashboard",
}: {
  children: React.ReactNode;
  redirectTo?: string;
}) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && isAuthenticated) router.push(redirectTo);
  }, [isAuthenticated, isLoading, router, redirectTo]);

  return isAuthenticated ? null : <>{children}</>;
}

