"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import { RouteGuard } from "@/lib/routes";
import { isAuthRoute } from "@/lib/routes/route-matcher";
import { usePathname } from "next/navigation";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const pathname = usePathname();
  
  // Check if current route is an auth route (should not show sidebar/header)
  const isAuth = pathname ? isAuthRoute(pathname) : false;

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  // For auth routes, render without sidebar/header (RouteGuard handles protection)
  if (isAuth) {
    return (
      <RouteGuard>
        {children}
      </RouteGuard>
    );
  }

  // For protected admin routes, show sidebar and header
  return (
    <RouteGuard>
      <div className="min-h-screen xl:flex overflow-x-hidden w-full">
        {/* Sidebar and Backdrop */}
        <AppSidebar />
        <Backdrop />
        {/* Main Content Area */}
        <div
          className={`flex-1 min-w-0 overflow-x-hidden transition-all  duration-300 ease-in-out ${mainContentMargin}`}
        >
          {/* Header */}
          <AppHeader />
          {/* Page Content */}
          <div className="p-4 mx-auto max-w-screen-2xl md:p-6 w-full min-w-0 overflow-x-hidden">{children}</div>
        </div>
      </div>
    </RouteGuard>
  );
}
