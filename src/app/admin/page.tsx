"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { usePermissions } from "@/context/PermissionsContext";
import Skeleton from "@/components/ui/skeleton/Skeleton";

export default function AdminPage() {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const { isLoading: isPermissionsLoading } = usePermissions();
  const router = useRouter();

  // Only show loading skeleton if auth is still loading (initial load)
  // Don't show skeleton if user is authenticated and we're just fetching permissions
  const isLoading = isAuthLoading || (isPermissionsLoading && !isAuthenticated);

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.push("/admin/dashboard");
      } else {
        router.push("/admin/auth/signin");
      }
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
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

  return null;
}

