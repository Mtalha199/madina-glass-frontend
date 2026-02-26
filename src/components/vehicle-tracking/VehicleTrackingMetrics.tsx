"use client";
import React from "react";
import MetricCard from "../common/MetricCard";
import { BoxIconLine, PaperPlaneIcon, TimeIcon, CheckCircleIcon } from "@/icons";
import Image from "next/image";

interface VehicleTrackingMetricsProps {
  totalVehicles: number;
  inTransit: number;
  pending: number;
  delivered: number;
  blocked: number;
}

const VehicleTrackingMetrics: React.FC<VehicleTrackingMetricsProps> = ({
  totalVehicles,
  inTransit,
  pending,
  delivered,
  blocked
}) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 md:gap-6">
      <MetricCard
        label="Total Vehicles"
        value={totalVehicles}
        icon={<BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />}
        change={{ value: "+12.5%", isPositive: true }}
      />
      <MetricCard
        label="In Progress"
        value={inTransit}
        icon={<PaperPlaneIcon className="text-gray-800 size-6 dark:text-white/90" />}
        change={{ value: "+8.1%", isPositive: true }}
      />
      <MetricCard
        label="Pending"
        value={pending}
        icon={<TimeIcon className="text-gray-800 size-6 dark:text-white/90" />}
        change={{ value: "-2.3%", isPositive: false }}
      />
      <MetricCard
        label="Delivered"
        value={delivered}
        icon={<CheckCircleIcon className="text-gray-800 size-6 dark:text-white/90" />}
        change={{ value: "+15.3%", isPositive: true }}
      />
       <MetricCard
        label="Blocked"
        value={blocked}
        icon={<Image src="/images/icons/blocked.svg" className="opacity-60" width={24} height={24} alt="Blocked" />}
        change={{ value: "+8.1%", isPositive: true }}
      />
    </div>
  );
};

export default VehicleTrackingMetrics;

