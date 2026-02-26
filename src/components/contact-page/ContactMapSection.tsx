"use client";

import React from "react";

export default function ContactMapSection() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Map */}
      <div className="relative h-64 sm:h-80 bg-linear-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800">
        {/* Simplified map with pins */}
        <div className="absolute inset-0">
          {/* Map grid pattern */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 21px),
repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 21px)`,
            }}
          />
          {/* Map pins */}
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <svg
                className="w-6 h-6 text-brand-600 dark:text-brand-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
          </div>
          <div className="absolute bottom-1/3 right-1/4 transform translate-x-1/2 translate-y-1/2">
            <div className="relative">
              <svg
                className="w-6 h-6 text-brand-600 dark:text-brand-400"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Map Info */}
      <div className="p-4 sm:p-6 flex items-center justify-between gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
            BFZ Track Limited
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Official Beforward Partner • Vehicle Import Services
          </p>
        </div>
        <button className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow-md shrink-0">
          GET DIRECTIONS
        </button>
      </div>
    </div>
  );
}

