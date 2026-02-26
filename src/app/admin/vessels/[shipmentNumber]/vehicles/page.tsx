import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import ShipmentVehiclesPageContent from "@/components/shipments/ShipmentVehiclesPageContent";

export const metadata: Metadata = {
  title: "Shipment Vehicles | BFZ Track ",
  description: "View vehicles associated with a shipment",
};

export default async function ShipmentVehiclesPage({
  params,
}: {
  params: Promise<{ shipmentNumber: string }>;
}) {
  const { shipmentNumber } = await params;

  if (!shipmentNumber) {
    notFound();
  }

  return <ShipmentVehiclesPageContent shipmentNumber={shipmentNumber} />;
}

