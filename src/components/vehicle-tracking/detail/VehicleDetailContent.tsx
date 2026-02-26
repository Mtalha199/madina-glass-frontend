"use client";

import React from "react";
import CRMDetailPage from "./CRMDetailPage";

interface VehicleDetailContentProps {
  vehicleId: string;
}

export default function VehicleDetailContent({ vehicleId }: VehicleDetailContentProps) {
  return <CRMDetailPage vehicleId={vehicleId} />;
}

