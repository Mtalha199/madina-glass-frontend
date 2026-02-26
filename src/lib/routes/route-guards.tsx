"use client";

import { useEffect, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { usePermissions } from "@/context/PermissionsContext";
import { shouldProtectRoute, isAuthRoute } from "./route-matcher";
import Skeleton from "@/components/ui/skeleton/Skeleton";

/**
 * Route guard component that protects routes based on route matcher logic
 */
export function RouteGuard({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { isLoading: isPermissionsLoading } = usePermissions();
  const router = useRouter();
  const pathname = usePathname();

  // Only show loading skeleton if auth is still loading (initial load)
  // Don't show skeleton if user is authenticated and we're just fetching permissions
  const isLoading = isAuthLoading || (isPermissionsLoading && !isAuthenticated);

  useEffect(() => {
    if (!pathname) return;

    const needsProtection = shouldProtectRoute(pathname);

    if (!isLoading && needsProtection && !isAuthenticated) {
      router.push("/admin/auth/signin");
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Show loading state while checking authentication (initial load only)
  // Don't show skeleton if user is already authenticated and we're just fetching permissions
  if (isLoading) {
    // Check if this is an auth route (should show simple skeleton)
    const isAuth = pathname ? isAuthRoute(pathname) : false;
    
    if (isAuth) {
      // Simple skeleton for auth pages
      return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-full max-w-md space-y-4 p-6">
            <div className="space-y-3">
              <Skeleton variant="rectangular" height={40} width="100%" />
              <Skeleton variant="rectangular" height={40} width="100%" />
              <Skeleton variant="rectangular" height={40} width="100%" />
            </div>
            <div className="space-y-2 pt-4">
              <Skeleton variant="rectangular" height={200} width="100%" />
            </div>
          </div>
        </div>
      );
    }
    
    // Full admin panel skeleton for protected routes
    return (
      <div className="min-h-screen xl:flex overflow-x-hidden w-full">
        {/* Sidebar Skeleton */}
        <div className="fixed left-0 top-0 z-50 h-screen w-[90px] lg:w-[290px] border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="flex flex-col h-full p-4">
            {/* Logo Skeleton */}
            <div className="mb-8">
              <Skeleton variant="rectangular" height={40} width={120} className="mb-2" />
            </div>
            {/* Menu Items Skeleton */}
            <div className="space-y-2 flex-1">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="flex items-center gap-3 p-3">
                  <Skeleton variant="rectangular" width={24} height={24} className="rounded" />
                  <Skeleton variant="text" height={16} width="60%" />
                </div>
              ))}
            </div>
            {/* User Section Skeleton */}
            <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3 p-3">
                <Skeleton variant="circular" width={40} height={40} />
                <div className="flex-1">
                  <Skeleton variant="text" height={14} width="70%" className="mb-1" />
                  <Skeleton variant="text" height={12} width="50%" />
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content Area Skeleton */}
        <div className="flex-1 min-w-0 overflow-x-hidden lg:ml-[90px] xl:ml-[290px] transition-all duration-300">
          {/* Header Skeleton */}
          <div className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
            <div className="flex items-center justify-between p-4 md:p-6">
              <div className="flex items-center gap-4 flex-1">
                <Skeleton variant="rectangular" width={40} height={40} className="rounded-lg lg:hidden" />
                <div className="flex-1 max-w-md">
                  <Skeleton variant="rectangular" height={40} width="100%" className="rounded-lg" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="circular" width={40} height={40} />
                <Skeleton variant="rectangular" width={100} height={36} className="rounded-lg" />
              </div>
            </div>
          </div>
          
          {/* Page Content Skeleton */}
          <div className="p-4 mx-auto max-w-screen-2xl md:p-6 w-full min-w-0">
            <div className="space-y-6">
              {/* Page Header Skeleton */}
              <div className="flex items-center justify-between">
                <div>
                  <Skeleton variant="text" height={32} width={200} className="mb-2" />
                  <Skeleton variant="text" height={16} width={300} />
                </div>
                <Skeleton variant="rectangular" width={120} height={40} className="rounded-lg" />
              </div>
              
              {/* Content Cards Skeleton */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/3 p-6">
                    <Skeleton variant="rectangular" width={48} height={48} className="rounded-xl mb-4" />
                    <Skeleton variant="text" height={16} width="60%" className="mb-2" />
                    <Skeleton variant="text" height={24} width="40%" />
                  </div>
                ))}
              </div>
              
              {/* Table/List Skeleton */}
              <div className="rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white/3">
                <div className="p-4 border-b border-gray-100 dark:border-white/5">
                  <Skeleton variant="text" height={20} width="30%" />
                </div>
                <div className="divide-y divide-gray-100 dark:divide-white/5">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="p-4 flex items-center gap-4">
                      <Skeleton variant="circular" width={40} height={40} />
                      <Skeleton variant="text" height={16} width="20%" />
                      <Skeleton variant="text" height={16} width="25%" />
                      <Skeleton variant="text" height={16} width="15%" />
                      <Skeleton variant="rectangular" width={80} height={24} className="rounded-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Check if route needs protection
  if (!pathname) {
    return <>{children}</>;
  }

  const needsProtection = shouldProtectRoute(pathname);

  // If route needs protection and user is not authenticated, don't render
  if (needsProtection && !isAuthenticated) {
    return null;
  }

  // Render children for public routes or authenticated users
  return <>{children}</>;
}

