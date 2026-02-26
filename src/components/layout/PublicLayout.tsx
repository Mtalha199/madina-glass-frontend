"use client";

import { usePathname } from "next/navigation";
import { isAdminRoute } from "@/lib/routes/route-matcher";
import PublicNavbar from "./PublicNavbar";
import PublicFooter from "./PublicFooter";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Show navbar and footer only on routes that do NOT start with /admin
  const shouldShowPublicLayout = pathname && !isAdminRoute(pathname);

  if (!shouldShowPublicLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <PublicNavbar />
      {children}
      <PublicFooter />
    </>
  );
}

