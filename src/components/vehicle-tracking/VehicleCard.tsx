"use client";

import React from "react";
import Link from "next/link";
import Badge from "@/components/ui/badge/Badge";
import { ArrowRightIcon, VehicleIcon } from "@/icons";

export interface VehicleCardVehicle {
  id: number;
  referenceNumber: string;
  vin: string;
  customerType: string;
  route: string;
  destination: string;
  progress: {
    current: number;
    total: number;
  };
  vehicleStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
}

interface VehicleCardProps {
  vehicle: VehicleCardVehicle;
}

function getStatusBadge(vehicleStatus: string) {
  switch (vehicleStatus) {
    case "PENDING":
      return { label: "Pending", color: "light" as const };
    case "IN_PROGRESS":
      return { label: "In Progress", color: "warning" as const };
    case "COMPLETED":
      return { label: "Delivered", color: "success" as const };
    case "BLOCKED":
      return { label: "Blocked", color: "error" as const };
    default:
      return { label: "Pending", color: "light" as const };
  }
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const statusBadge = getStatusBadge(vehicle.vehicleStatus);

  return (
    <div className="p-5 border border-gray-200 rounded-2xl bg-white dark:border-gray-800 dark:bg-white/3 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <VehicleIcon className="w-6 h-6 text-brand-500 dark:text-brand-400 shrink-0 mt-0.5" />
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-gray-800 dark:text-white/90 truncate">
            {vehicle.referenceNumber}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {vehicle.customerType}
          </p>
        </div>
      </div>
      <div className="space-y-1.5 mb-4">
        <div className="flex flex-row items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <span>{vehicle.route}</span>
          <ArrowRightIcon className="w-5 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
          <span className="truncate">{vehicle.destination}</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Badge variant="light" color={statusBadge.color} size="sm">
          {statusBadge.label}
        </Badge>
        <Link
          href={`/admin/vehicle/trackings/${vehicle.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors shrink-0"
        >
          View details
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default VehicleCard;
