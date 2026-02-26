"use client";

import React from "react";

/**
 * Loading skeleton for VehicleTable
 * Matches the structure of VehicleTable component
 */
const VehicleTableRowSkeleton: React.FC = () => {
  return (
    <tr className="animate-pulse">
      {/* Vehicle Column */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          {/* Icon skeleton */}
          <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded shrink-0" />
          {/* Reference Number */}
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </td>

      {/* VIN Column */}
      <td className="px-6 py-4">
        <div className="h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </td>

      {/* Route Column */}
      <td className="px-6 py-4">
        <div className="h-4 w-40 bg-gray-200 dark:bg-gray-700 rounded" />
      </td>

      {/* Status Column */}
      <td className="px-6 py-4">
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </td>

      {/* Actions Column */}
      <td className="px-6 py-4">
        <div className="flex justify-end">
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </td>
    </tr>
  );
};

/**
 * Full table skeleton for loading state
 */
interface VehicleTableSkeletonProps {
  count?: number;
}

export const VehicleTableSkeleton: React.FC<VehicleTableSkeletonProps> = ({ 
  count = 9 
}) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Table Header */}
          <thead className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-gray-800">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                Vehicle
              </th>
              <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider">
                VIN
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

          {/* Table Body with Skeleton Rows */}
          <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
            {Array.from({ length: count }).map((_, index) => (
              <VehicleTableRowSkeleton key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VehicleTableSkeleton;

/**
 * Card-shaped skeleton for grid view loading state
 */
const VehicleCardSkeleton: React.FC = () => (
  <div className="p-5 border border-gray-200 rounded-2xl bg-white dark:border-gray-800 dark:bg-white/3 animate-pulse">
    <div className="flex items-start gap-3 mb-3">
      <div className="w-6 h-6 bg-gray-200 dark:bg-gray-700 rounded shrink-0" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
    <div className="flex items-center justify-between gap-2">
      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  </div>
);

interface VehicleGridSkeletonProps {
  count?: number;
}

export const VehicleGridSkeleton: React.FC<VehicleGridSkeletonProps> = ({ count = 9 }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <VehicleCardSkeleton key={index} />
    ))}
  </div>
);