"use client";

import React from "react";
import Link from "next/link";
import Badge from "@/components/ui/badge/Badge";
import { ArrowRightIcon, VehicleIcon } from "@/icons";

interface VehicleTableProps {
  vehicles: Array<{
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
  }>;
}

const VehicleTable: React.FC<VehicleTableProps> = ({ vehicles }) => {
  // Determine status badge based on API vehicleStatus
  const getStatusBadge = (vehicleStatus: string) => {
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
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Customer Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Route
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {vehicles.map((vehicle) => {
              const statusBadge = getStatusBadge(vehicle.vehicleStatus);
              return (
                <tr
                  key={vehicle.id}
                  className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <VehicleIcon className="w-6 h-6 text-brand-500 dark:text-brand-400 shrink-0" />
                      <div>
                        <p className="text-sm font-bold text-gray-800 dark:text-white/90">
                          {vehicle.referenceNumber}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm">
                      {vehicle.customerType}
                    </p>
                  </td>
                  <td className="px-6 py-4 flex flex-row items-center gap-2">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {vehicle.route}
                    </p>
                    <ArrowRightIcon className="w-5 relative -top-0.5 h-4 text-gray-400 dark:text-gray-500" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {vehicle.destination}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="light" color={statusBadge.color} size="sm">
                      {statusBadge.label}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/vehicle/trackings/${vehicle.id}`}
                      className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
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
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTable;