import type { Metadata } from "next";
import React from "react";
import { VehicleDetailContent } from "@/components/vehicle-tracking/detail";
import { notFound } from "next/navigation";
import PermissionWrapper from "@/components/permissions/PermissionWrapper";

export const metadata: Metadata = {
  title: "Vehicle Details | BFZ Track ",
  description: "View detailed information about vehicle shipment",
};

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  return (
  <PermissionWrapper permissions={['vehicle.view']}>
      <VehicleDetailContent vehicleId={id} />
  </PermissionWrapper>
  )
  ;
}

