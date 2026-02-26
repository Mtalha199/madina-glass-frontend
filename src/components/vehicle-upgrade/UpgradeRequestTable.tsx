"use client";

import React from "react";
import Link from "next/link";
import Badge from "../ui/badge/Badge";
import { VehicleIcon, CalenderIcon, ArrowRightIcon } from "@/icons";

interface UpgradeRequest {
  id: string;
  vin: string;
  currentType: string;
  requestedType: string;
  requestedDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface UpgradeRequestTableProps {
  requests: UpgradeRequest[];
}

export default function UpgradeRequestTable({ requests }: UpgradeRequestTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "error";
      default:
        return "warning";
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
                Current Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Requested Type
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Request Date
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
            {requests.map((request) => (
              <tr
                key={request.id}
                className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
              >
                {/* Vehicle Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-500/10 shrink-0">
                      <VehicleIcon className="w-6 h-6 text-brand-500" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 dark:text-white/90">
                        {request.vin}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Current Type Column */}
                <td className="px-6 py-4">
                  <Badge size="sm" color="primary" variant="light">
                    {request.currentType}
                  </Badge>
                </td>

                {/* Requested Type Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <ArrowRightIcon className="w-6 relative top-0.5 h-6 text-gray-400 dark:text-gray-500" />
                    <span className="text-sm font-semibold text-gray-800 dark:text-white/90">
                      {request.requestedType}
                    </span>
                  </div>
                </td>

                {/* Request Date Column */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <CalenderIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 shrink-0" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {request.requestedDate}
                    </span>
                  </div>
                </td>

                {/* Status Column */}
                <td className="px-6 py-4">
                  <Badge
                    size="sm"
                    color={getStatusColor(request.status)}
                    variant="light"
                  >
                    {request.status}
                  </Badge>
                </td>

                {/* Actions Column */}
                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/admin/vehicle/${request.id}/upgrade`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors"
                  >
                    View details
                    <ArrowRightIcon className="w-6 h-5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}