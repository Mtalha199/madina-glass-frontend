"use client";

import React from "react";

// Shipment details data
const SHIPMENT_DETAILS = [
  { label: "VEHICLE REF", value: "BFZ-VH-2024-7829" },
  { label: "VEHICLE TYPE", value: "Container Truck" },
  { label: "ORIGIN PORT", value: "Dar es Salaam, Tanzania" },
  { label: "DESTINATION", value: "Lusaka, Zambia" },
];

export default function ShipmentDetails() {
  return (
    <div className="space-y-4">
      {/* Details Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SHIPMENT_DETAILS.map((detail, index) => {
          return (
            <div
              key={index}
              className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700"
            >
              <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                {detail.label}
              </p>
              <p className="text-base font-medium text-gray-900 dark:text-white">
                {detail.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Additional Info */}
      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              CLEARANCE STATUS
            </p>
            <p className="text-base font-medium text-gray-900 dark:text-white">
              Customs Processing
            </p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
            <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
              ESTIMATED DELIVERY
            </p>
            <p className="text-base font-medium text-gray-900 dark:text-white">
              2-3 Business Days
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4">
        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          View Full Documentation
        </button>
        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3.5 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-medium rounded-lg transition-colors shadow-sm hover:shadow-md">
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          Download Report
        </button>
      </div>
    </div>
  );
}

