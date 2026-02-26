import type { Metadata } from "next";
import React from "react";
import UpgradeVehiclePageContent from "@/components/vehicle-upgrade/UpgradeVehiclePageContent";
import PermissionWrapper from "@/components/permissions/PermissionWrapper";

export const metadata: Metadata = {
  title: "Upgrade Vehicle | BFZ Track ",
  description: "Upgrade vehicle customer type and monitor transition progress",
};

export default async function UpgradeVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return   <PermissionWrapper permissions={['upgradeRequest.view']}>
<UpgradeVehiclePageContent vehicleId={id} />
  </PermissionWrapper>
  
  ;
}

