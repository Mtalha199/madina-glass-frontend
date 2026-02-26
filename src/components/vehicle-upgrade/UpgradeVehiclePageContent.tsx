"use client";

import React, { useRef, useState, useEffect } from "react";
import PageHeader from "@/components/common/PageHeader";
import UpgradeVehicleContent from "@/components/vehicle-upgrade/UpgradeVehicleContent";
import RequestPaymentButton from "@/components/vehicle-upgrade/RequestPaymentButton";
import VerifyPaymentModal from "@/components/vehicle-upgrade/VerifyPaymentModal";
import { vehicleApi, VehicleResponse } from "@/lib/api/vehicle";
import Skeleton from "@/components/ui/skeleton/Skeleton";

interface UpgradeVehiclePageContentProps {
  vehicleId: string;
}

export default function UpgradeVehiclePageContent({ vehicleId }: UpgradeVehiclePageContentProps) {
  const refreshVehicleDataRef = useRef<(() => void) | null>(null);
  const [vehicle, setVehicle] = useState<VehicleResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const handleRefresh = () => {
    if (refreshVehicleDataRef.current) {
      refreshVehicleDataRef.current();
    }
    // Also refresh vehicle data for button visibility
    fetchVehicle();
  };

  const fetchVehicle = async () => {
    try {
      setIsLoading(true);
      const vehicleData = await vehicleApi.getVehicleById(vehicleId);
      setVehicle(vehicleData);
    } catch (err) {
      console.error("Failed to fetch vehicle:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, [vehicleId]);

  // Hide button when payment status is one of these values
  const shouldHideRequestPaymentButton = vehicle?.paymentStatus && 
    ["PAYMENT_SUBMITTED", "RECEIVED", "NOT_RECEIVED"].includes(vehicle.paymentStatus);

  // Render button action: show skeleton while loading, then show/hide button based on payment status
  const renderButtonAction = () => {
    if (isLoading) {
      // Show loading skeleton matching button size (sm size: px-4 py-3)
      return (
        <Skeleton 
          variant="rectangular" 
          height={38} 
          width={220}
          className="rounded-lg"
        />
      );
    }

    if (!shouldHideRequestPaymentButton) {
      return (
        <RequestPaymentButton vehicleId={vehicleId} onPaymentSuccess={handleRefresh} />
      );
    }

    return null;
  };

  return (
    <div>
      <PageHeader
        title="Vehicle Tracking"
        subtitle="Monitor vehicle status and customs clearance progress."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Upgrade Requests", href: "/admin/vehicle/upgrade" },
          { label: "Vehicle Tracking" },
        ]}
        action={renderButtonAction()}
      />
      <UpgradeVehicleContent 
        vehicleId={vehicleId} 
        refreshRef={refreshVehicleDataRef}
        onPaymentVerified={handleRefresh}
      />
    </div>
  );
}

