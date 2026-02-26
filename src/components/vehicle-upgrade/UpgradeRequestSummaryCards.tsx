"use client";
import React, { useMemo } from "react";
import MetricCard from "../common/MetricCard";
import { VehicleIcon, CheckCircleIcon, CloseLineIcon, TimeIcon } from "@/icons";
import Image from "next/image";

interface UpgradeRequest {
  id: string;
  vin: string;
  currentType: string;
  requestedType: string;
  requestedDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

interface UpgradeRequestSummaryCardsProps {
  requests: UpgradeRequest[];
  loading: boolean;
}

export default function UpgradeRequestSummaryCards({
  requests,
  loading,
}: UpgradeRequestSummaryCardsProps) {
  const stats = useMemo(() => {
    const total = requests.length;
    const pending = requests.filter((r) => r.status === "PENDING").length;
    const approved = requests.filter((r) => r.status === "APPROVED").length;
    const rejected = requests.filter((r) => r.status === "REJECTED").length;
    return { total, pending, approved, rejected };
  }, [requests]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-6">
            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded-xl animate-pulse mb-5" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2" />
            <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      <MetricCard
        label="Total Requests"
        value={stats.total}
        icon={<VehicleIcon className="text-gray-800 size-6 dark:text-white/90" />}
        change={{ value: "12.5%", isPositive: true }}
      />
      <MetricCard
        label="Pending"
        value={stats.pending}
        icon={<TimeIcon className="text-gray-800 size-6 dark:text-white/90" />}
        change={{ value: "8.1%", isPositive: true }}
      />
      <MetricCard
        label="Approved"
        value={stats.approved}
        icon={<CheckCircleIcon className="text-gray-800 size-6 dark:text-white/90" />}
        change={{ value: "15.3%", isPositive: true }}
      />
      <MetricCard
        label="Rejected"
        value={stats.rejected}
        icon={<Image src="/images/icons/blocked.svg" className="opacity-60" width={24} height={24} alt="Blocked" />}
        change={{ value: "2.3%", isPositive: false }}
      />
    </div>
  );
}

