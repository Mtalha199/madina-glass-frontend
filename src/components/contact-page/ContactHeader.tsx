"use client";

import React from "react";

export default function ContactHeader() {
  return (
    <div className="w-full bg-gray-50 dark:bg-gray-900 py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div className="flex-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 dark:text-white">
                Get In Touch
              </h1>
              <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
                Contact BFZ Track Limited today for vehicle import services from Japan to Zambia and Zimbabwe. As the official partner of Beforward, we're here to help with port clearance, vehicle tracking, and delivery inquiries. We typically respond within 2 hours.
              </p>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 shadow-sm">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Online Now
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

