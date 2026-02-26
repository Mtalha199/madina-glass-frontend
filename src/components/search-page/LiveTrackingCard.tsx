"use client";

import React from "react";

export default function LiveTrackingCard() {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-6 sm:p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            LIVE TRACKING FOUND
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
            Status: In Transit
          </span>
        </div>
      </div>

      {/* Reference Number */}
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 dark:text-white">
        #BFZ-VH-2024-7829
      </h2>

      {/* Map Section */}
      <div className="mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700 h-64 sm:h-80 relative">
        {/* Simplified Map - Zambia Route */}
        <div className="w-full h-full relative bg-linear-to-br from-brand-50 to-brand-100 dark:from-brand-900/20 dark:to-brand-800/20">
          {/* Map labels */}
          <div className="absolute inset-0 p-4" aria-label="Zambia delivery route map">
            <div className="absolute top-4 left-4 text-lg font-bold text-gray-800 dark:text-gray-200">
              Lusaka
            </div>
            <div className="absolute top-12 left-4 text-sm text-gray-600 dark:text-gray-400">
              Capital City
            </div>
            <div className="absolute top-24 left-8 text-xs text-gray-500 dark:text-gray-500">
              Ndola
            </div>
            <div className="absolute top-32 left-12 text-xs text-gray-500 dark:text-gray-500">
              Kitwe
            </div>
            <div className="absolute bottom-32 left-16 text-xs text-gray-500 dark:text-gray-500">
              Chingola
            </div>
            <div className="absolute bottom-24 left-20 text-xs text-gray-500 dark:text-gray-500">
              Livingstone
            </div>
            <div className="absolute bottom-16 left-24 text-xs text-gray-500 dark:text-gray-500">
              Chipata
            </div>
            <div className="absolute bottom-8 right-16 text-xs text-gray-500 dark:text-gray-500">
              Nakonde Border
            </div>
            <div className="absolute top-16 right-12 text-xs text-gray-500 dark:text-gray-500">
              Kapiri Mposhi
            </div>

            {/* Location Pin */}
            <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <svg
                  className="w-8 h-8 text-blue-light-500"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                <div className="absolute top-0 left-0 w-full h-full animate-ping pointer-events-none">
                  <div className="w-8 h-8 rounded-full bg-blue-light-500 opacity-20" />
                </div>
              </div>
              <div className="absolute top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-white dark:bg-gray-800 px-2 py-1 rounded shadow-lg text-xs font-medium text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700">
                Current: Lusaka Port
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Port Information */}
      <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-gray-600 dark:text-gray-400 mt-0.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              Lusaka Port, Zambia
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Port Clearance In Progress
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Last Update
          </p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            5 mins ago
          </p>
        </div>
      </div>
    </div>
  );
}
