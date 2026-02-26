import React from "react";
import Link from "next/link";

interface VehicleDetailHeaderProps {
  referenceNumber: string;
}

export function VehicleDetailHeader({ referenceNumber }: VehicleDetailHeaderProps) {
  return (
    <div>
      <Link
        href="/admin/vehicle/trackings"
        className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white/90 mb-2 transition-all duration-200 ease-in-out hover:gap-3 group"
      >
        <svg
          className="w-4 h-4 transition-transform duration-200 ease-in-out group-hover:-translate-x-1"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to tracking
      </Link>
      <nav className="flex items-center gap-1.5 text-sm">
        <Link
          href="/admin/dashboard"
          className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white/90 transition-colors duration-200 ease-in-out"
        >
          Dashboard
        </Link>
        <span className="text-gray-400">/</span>
        <Link
          href="/admin/vehicle/trackings"
          className="text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white/90 transition-colors duration-200 ease-in-out"
        >
          Vehicle Tracking
        </Link>
        <span className="text-gray-400">/</span>
        <span className="text-gray-800 dark:text-white/90">{referenceNumber}</span>
      </nav>
    </div>
  );
}

