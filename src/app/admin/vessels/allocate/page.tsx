import type { Metadata } from "next";
import React from "react";
import PageHeader from "@/components/common/PageHeader";
import ShipmentsContent from "@/components/shipments/ShipmentsContent";

export const metadata: Metadata = {
  title: "Vehicles | BFZ Track ",
  description: "Manage and view all vehicles in the system",
};

export default function ShipmentsPage() {
  return (
    <div className="w-full min-w-0">
      <PageHeader
        title="Vehicles"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Vehicles" },
        ]}
      />
      <ShipmentsContent />
    </div>
  );
}

