"use client";
import React from "react";
import { BoxIconLine, PaperPlaneIcon, CheckCircleIcon, TimeIcon, AlertIcon, DollarLineIcon } from "@/icons";
import type { DashboardStats } from "@/lib/api/dashboard";
import PermissionWrapper from "../permissions/PermissionWrapper";

interface EcommerceMetricsProps {
  stats: DashboardStats;
}

export const EcommerceMetrics = React.memo(({ stats }: EcommerceMetricsProps) => {
  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {/* <!-- Total Shipments --> */}
      <PermissionWrapper permissions={['dashboard.totalShipment']}>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
          </div>

          <div className="flex items-start flex-col mt-5">

            <span className="text-sm text-gray-500 dark:text-gray-400">
              Total Shipments
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {formatNumber(stats.totalShipments)}
            </h4>
          </div>
        </div>
      </PermissionWrapper>

      {/* <!-- In Transit --> */}
      <PermissionWrapper permissions={['dashboard.inTransit']}>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <PaperPlaneIcon className="text-gray-800 size-6 relative top-0.5 left-0.5 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                In Transit
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {formatNumber(stats.inTransit)}
              </h4>
            </div>
          </div>
        </div>
      </PermissionWrapper>

      {/* <!-- Delivered --> */}
      <PermissionWrapper permissions={['dashboard.delivered']}>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <CheckCircleIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Delivered
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {formatNumber(stats.delivered)}
              </h4>
            </div>
          </div>
        </div>
      </PermissionWrapper>

      {/* <!-- Blocked --> */}
      <PermissionWrapper permissions={['dashboard.blocked']}>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <AlertIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Blocked
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {formatNumber(stats.blocked)}
              </h4>
            </div>
          </div>
        </div>
      </PermissionWrapper>

      {/* <!-- Pending Shipments --> */}
      <PermissionWrapper permissions={['dashboard.pending']}>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <TimeIcon className="text-gray-800 relative top-0.5 left-0.5 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Pending
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {formatNumber(stats.pending)}
              </h4>
            </div>
          </div>
        </div>
      </PermissionWrapper>

      {/* <!-- Upgrade Requests --> */}
      <PermissionWrapper permissions={['dashboard.upgradeRequest']}>
        <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6">
          <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
            <DollarLineIcon className="text-gray-800 size-6 dark:text-white/90" />
          </div>
          <div className="flex items-end justify-between mt-5">
            <div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                Upgrade Requests
              </span>
              <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
                {formatNumber(stats.upgradeRequests)}
              </h4>
            </div>
          </div>
        </div>
      </PermissionWrapper>
    </div>
  );
});

EcommerceMetrics.displayName = "EcommerceMetrics";
