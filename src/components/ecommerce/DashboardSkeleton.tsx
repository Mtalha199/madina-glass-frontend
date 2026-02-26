"use client";
import React from "react";
import Skeleton from "../ui/skeleton/Skeleton";

export const MetricsSkeleton = React.memo(() => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
      {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/3 md:p-6"
        >
          <Skeleton variant="rectangular" width={48} height={48} className="rounded-xl" />
          <div className="flex items-end justify-between mt-5">
            <div className="flex-1">
              <Skeleton variant="text" height={16} width="60%" className="mb-2" />
              <Skeleton variant="text" height={32} width="40%" />
            </div>
            <Skeleton variant="rectangular" width={60} height={24} className="rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
});

MetricsSkeleton.displayName = "MetricsSkeleton";

export const ChartSkeleton = React.memo(() => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/3 sm:px-6 sm:pt-6">
      <div className="mb-6">
        <Skeleton variant="text" height={24} width="40%" className="mb-2" />
        <Skeleton variant="text" height={16} width="60%" />
      </div>
      <Skeleton variant="rectangular" height={350} width="100%" className="rounded-lg" />
    </div>
  );
});

ChartSkeleton.displayName = "ChartSkeleton";

export const TableSkeleton = React.memo(() => {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/3 sm:px-6">
      <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
        <Skeleton variant="text" height={24} width="30%" />
        <div className="flex items-center gap-3">
          <Skeleton variant="rectangular" width={100} height={40} className="rounded-lg" />
          <Skeleton variant="rectangular" width={80} height={40} className="rounded-lg" />
        </div>
      </div>
      <div className="space-y-3">
        {[...Array(5)].map((_, index) => (
          <div key={index} className="flex items-center gap-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <Skeleton variant="rectangular" width={50} height={50} className="rounded-md" />
            <Skeleton variant="text" height={16} width="20%" />
            <Skeleton variant="text" height={16} width="25%" />
            <Skeleton variant="text" height={16} width="15%" />
            <Skeleton variant="text" height={16} width="15%" />
            <Skeleton variant="rectangular" width={80} height={24} className="rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
});

TableSkeleton.displayName = "TableSkeleton";

