"use client";

import React from "react";
import Link from "next/link";
import Badge from "../ui/badge/Badge";
import { VehicleIcon, CalenderIcon, ArrowRightIcon } from "@/icons";

export interface UpgradeRequestCardRequest {
  id: string;
  vin: string;
  currentType: string;
  requestedType: string;
  requestedDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface UpgradeRequestCardProps {
  request: UpgradeRequestCardRequest;
}

function getStatusColor(status: string): "success" | "error" | "warning" {
  switch (status) {
    case "APPROVED":
      return "success";
    case "REJECTED":
      return "error";
    default:
      return "warning";
  }
}

export default function UpgradeRequestCard({ request }: UpgradeRequestCardProps) {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl bg-white dark:border-gray-800 dark:bg-white/3 hover:border-gray-300 dark:hover:border-gray-700 transition-colors">
      <div className="flex items-start gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-500/10 dark:bg-brand-500/20 shrink-0">
          <VehicleIcon className="w-6 h-6 text-brand-500 dark:text-brand-400" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-800 dark:text-white/90 truncate">
            {request.vin}
          </p>
          <div className="mt-1.5">
            <Badge size="sm" color="primary" variant="light">
              {request.currentType}
            </Badge>
          </div>
        </div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm">
          <ArrowRightIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 shrink-0" />
          <span className="font-semibold text-gray-800 dark:text-white/90 truncate">
            {request.requestedType}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
          <CalenderIcon className="w-6 h-6 text-gray-500 dark:text-gray-400 shrink-0" />
          <span>{request.requestedDate}</span>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <Badge
          size="sm"
          color={getStatusColor(request.status)}
          variant="light"
        >
          {request.status}
        </Badge>
        <Link
          href={`/admin/vehicle/${request.id}/upgrade`}
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-500 dark:text-brand-400 hover:text-brand-600 dark:hover:text-brand-300 transition-colors shrink-0"
        >
          View details
          <ArrowRightIcon className="w-5 h-4" />
        </Link>
      </div>
    </div>
  );
}
