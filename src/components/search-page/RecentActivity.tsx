"use client";

import React from "react";

// Extract static icons to prevent recreation
const CheckIcon = () => (
  <svg
    className="w-5 h-5 text-green-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 13l4 4L19 7"
    />
  </svg>
);

const TruckIcon = () => (
  <svg
    className="w-5 h-5 text-blue-light-500"
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
);

const BuildingIcon = () => (
  <svg
    className="w-5 h-5 text-blue-light-500"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

// Extract static data outside component
const ACTIVITIES = [
  {
    id: "port-arrival",
    title: "Vehicle Arrived at Port",
    location: "Lusaka Port, Zambia",
    date: "Dec 15, 2024 - 08:30 AM",
    icon: <BuildingIcon />,
  },
  {
    id: "customs-processing",
    title: "Customs Documentation Submitted",
    location: "Zambia Revenue Authority",
    date: "Dec 15, 2024 - 10:15 AM",
    icon: <CheckIcon />,
  },
  {
    id: "inspection-scheduled",
    title: "Vehicle Inspection Scheduled",
    location: "Port Inspection Bay 3",
    date: "Dec 15, 2024 - 02:00 PM",
    icon: <TruckIcon />,
  },
  {
    id: "clearance-pending",
    title: "Port Clearance In Progress",
    location: "Customs Clearance Office",
    date: "Dec 15, 2024 - 03:45 PM",
    icon: <CheckIcon />,
  },
] as const;

export default function RecentActivity() {
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 dark:text-white">
        Recent Activity
      </h3>
      <div className="space-y-4">
        {ACTIVITIES.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200 cursor-pointer group"
          >
            <div className="shrink-0 mt-0.5">{activity.icon}</div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {activity.title}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {activity.location} • {activity.date}
              </p>
            </div>
            <svg
              className="w-5 h-5 text-gray-400 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}

