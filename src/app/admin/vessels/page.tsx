import type { Metadata } from "next";
import React from "react";
import AllShipmentsPageContent from "@/components/shipments/AllShipmentsPageContent";

export const metadata: Metadata = {
  title: "All Vessels | BFZ Track",
  description: "View and manage all Vessels in the system",
};

export default function AllShipmentsPage() {
  return (
    <div>
      <AllShipmentsPageContent />
    </div>
  );
}

