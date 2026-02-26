import type { Metadata } from "next";
import React from "react";
import UpgradeRequestsPageContent from "@/components/vehicle-upgrade/UpgradeRequestsPageContent";
import PermissionWrapper from "@/components/permissions/PermissionWrapper";

export const metadata: Metadata = {
  title: "Upgrade Requests | BFZ Track ",
  description: "Manage and monitor vehicle upgrade requests and their status",
};

export default function UpgradeVehiclePage() {


  return (
    <PermissionWrapper
      permissions={['upgradeRequest.view']}
      fallback={null}
    >
      <UpgradeRequestsPageContent />
    </PermissionWrapper>
  )
}

