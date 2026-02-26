"use client";
import React, { useMemo } from "react";
import MetricCard from "../common/MetricCard";
import { GroupIcon, CheckCircleIcon, CloseLineIcon, LockIcon } from "@/icons";
import { Admin } from "@/lib/api/admins";
import Skeleton from "../ui/skeleton/Skeleton";

interface TeamSummaryCardsProps {
  admins: Admin[];
  loading: boolean;
}

export default function TeamSummaryCards({ admins, loading }: TeamSummaryCardsProps) {
  const stats = useMemo(() => {
    const total = admins.length;
    const active = admins.filter((a) => a.status === "active").length;
    const inactive = admins.filter((a) => a.status === "inactive").length;
    const adminsCount = admins.filter((a) => {
      if (!a.role) return false;
      const roleName = typeof a.role === "string" ? a.role : a.role.name || "";
      return roleName.toLowerCase().includes("admin");
    }).length;
    return { total, active, inactive, adminsCount };
  }, [admins]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} variant="rectangular" height={140} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 md:gap-6">
      <MetricCard
        label="Total Members"
        value={stats.total}
        icon={<GroupIcon className="text-gray-800 size-6 dark:text-white/90" />}
        change={{ value: "12.5%", isPositive: true }}
      />
      <MetricCard
        label="Active"
        value={stats.active}
        icon={<CheckCircleIcon className="text-gray-800 size-6 dark:text-white/90" />}
        change={{ value: "8.1%", isPositive: true }}
      />
      <MetricCard
        label="Inactive"
        value={stats.inactive}
        icon={<CloseLineIcon className="text-gray-800 size-6 dark:text-white/90" />}
        change={{ value: "2.3%", isPositive: false }}
      />
      <MetricCard
        label="Admins"
        value={stats.adminsCount}
        icon={<LockIcon className="text-gray-800 size-6 dark:text-white/90" />}
        change={{ value: "15.3%", isPositive: true }}
      />
    </div>
  );
}
