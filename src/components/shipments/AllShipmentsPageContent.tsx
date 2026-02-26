"use client";

import React, { useState } from "react";
import PageHeader from "../common/PageHeader";
import AllShipmentsContent from "./AllShipmentsContent";
import Button from "../ui/button/Button";
import CreateShipmentModal from "./CreateShipmentModal";
import Toast from "../ui/toast/Toast";
import { PlusIcon } from "@/icons";

export default function AllShipmentsPageContent() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const handleCreateSuccess = (shipmentNumber: string) => {
    setRefreshKey((prev) => prev + 1);
    setToast({
      message: `Shipment ${shipmentNumber} created successfully`,
      type: "success",
      isVisible: true,
    });
  };

  return (
    <div>
      <PageHeader
        title="All Shipments"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "All Vessels" },
        ]}
        action={
          <Button startIcon={<PlusIcon />} onClick={() => setIsCreateOpen(true)}>
            Add Vessel
          </Button>
        }
      />
      <AllShipmentsContent refreshTrigger={refreshKey} />
      <CreateShipmentModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onSuccess={handleCreateSuccess}
      />
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
}
