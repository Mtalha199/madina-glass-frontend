"use client";

import React from "react";

const UpgradeRequestTableRowSkeleton: React.FC = () => {
  return (
    <tr className="animate-pulse">
      {/* Vehicle Column */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0" />
          <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </td>

      {/* Current Type Column */}
      <td className="px-6 py-4">
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </td>

      {/* Requested Type Column */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </td>

      {/* Request Date Column */}
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
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

interface UpgradeRequestTableSkeletonProps {
  count?: number;
}

export const UpgradeRequestTableSkeleton: React.FC<UpgradeRequestTableSkeletonProps> = ({ 
  count = 9 
}) => {
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
            {Array.from({ length: count }).map((_, index) => (
              <UpgradeRequestTableRowSkeleton key={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UpgradeRequestTableSkeleton;

/**
 * Card-shaped skeleton for grid view loading state
 */
const UpgradeRequestCardSkeleton: React.FC = () => (
  <div className="p-5 border border-gray-200 rounded-2xl bg-white dark:border-gray-800 dark:bg-white/3 animate-pulse">
    <div className="flex items-start gap-3 mb-3">
      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full shrink-0" />
      <div className="min-w-0 flex-1 space-y-2">
        <div className="h-4 w-28 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
    </div>
    <div className="space-y-2 mb-4">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
    <div className="flex items-center justify-between gap-2">
      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full" />
      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  </div>
);

interface UpgradeRequestGridSkeletonProps {
  count?: number;
}

export const UpgradeRequestGridSkeleton: React.FC<UpgradeRequestGridSkeletonProps> = ({ count = 9 }) => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
    {Array.from({ length: count }).map((_, index) => (
      <UpgradeRequestCardSkeleton key={index} />
    ))}
  </div>
);