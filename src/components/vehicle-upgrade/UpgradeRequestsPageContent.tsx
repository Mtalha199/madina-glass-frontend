"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import PageHeader from "../common/PageHeader";
import UpgradeRequestsContent from "./UpgradeRequestsContent";
import Toast from "@/components/ui/toast/Toast";

export default function UpgradeRequestsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  useEffect(() => {
    const action = searchParams.get("action");
    if (action === "approved") {
      setToast({
        message: "Upgrade request approved successfully!",
        type: "success",
        isVisible: true,
      });
      // Remove the query parameter from URL
      router.replace("/admin/vehicle/upgrade", { scroll: false });
    } else if (action === "rejected") {
      setToast({
        message: "Upgrade request rejected successfully!",
        type: "success",
        isVisible: true,
      });
      // Remove the query parameter from URL
      router.replace("/admin/vehicle/upgrade", { scroll: false });
    }
  }, [searchParams, router]);

  return (
    <div>
      <PageHeader
        title="Upgrade Requests"
        subtitle="Manage and monitor vehicle upgrade requests and their status."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Upgrade Requests" },
        ]}
      />
      <UpgradeRequestsContent />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
}

