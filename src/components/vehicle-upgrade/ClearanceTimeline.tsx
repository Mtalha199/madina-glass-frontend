"use client";

import React, { useMemo } from "react";
import Badge from "@/components/ui/badge/Badge";
import { TimelineStep } from "@/lib/api/vehicle";

interface ClearanceStep {
  id: string;
  title: string;
  stepNumber: number;
  totalSteps: number;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  icon: React.ReactNode;
}

interface ClearanceTimelineProps {
  timelineSteps?: TimelineStep[];
  steps?: ClearanceStep[];
}

// Default steps data
const defaultSteps: ClearanceStep[] = [
  {
    id: "1",
    title: "Vehicle Arrives – Dar",
    stepNumber: 1,
    totalSteps: 11,
    status: "PENDING",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    id: "2",
    title: "Dispatched to Nakonde",
    stepNumber: 2,
    totalSteps: 11,
    status: "PENDING",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "3",
    title: "Arrived Nakonde Yard",
    stepNumber: 3,
    totalSteps: 11,
    status: "PENDING",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  },
  {
    id: "4",
    title: "Documents Verified",
    stepNumber: 4,
    totalSteps: 11,
    status: "PENDING",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "5",
    title: "ZRA Entry Lodged (Nakonde)",
    stepNumber: 5,
    totalSteps: 11,
    status: "PENDING",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
  },
  {
    id: "6",
    title: "Assessment Issued",
    stepNumber: 6,
    totalSteps: 11,
    status: "PENDING",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "7",
    title: "Customer Pays Duty",
    stepNumber: 7,
    totalSteps: 11,
    status: "PENDING",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
  {
    id: "8",
    title: "Inspection (If Required)",
    stepNumber: 8,
    totalSteps: 11,
    status: "PENDING",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
  },
  {
    id: "9",
    title: "Release Issued",
    stepNumber: 9,
    totalSteps: 11,
    status: "PENDING",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    id: "10",
    title: "Dispatch to City",
    stepNumber: 10,
    totalSteps: 11,
    status: "PENDING",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "11",
    title: "Delivered / Collected",
    stepNumber: 11,
    totalSteps: 11,
    status: "PENDING",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
];

// Default icon for timeline steps
const defaultIcon = (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
  </svg>
);

// Map API status to component status
const mapStatus = (status: string): "PENDING" | "IN_PROGRESS" | "COMPLETED" => {
  const upperStatus = status.toUpperCase();
  if (upperStatus === "COMPLETED" || upperStatus === "DONE") {
    return "COMPLETED";
  }
  if (upperStatus === "IN_PROGRESS" || upperStatus === "IN PROGRESS" || upperStatus === "PROCESSING") {
    return "IN_PROGRESS";
  }
  return "PENDING";
};

// Convert API timelineSteps to ClearanceStep format
const mapTimelineStepsToSteps = (timelineSteps: TimelineStep[]): ClearanceStep[] => {
  return timelineSteps.map((step, index) => ({
    id: step.id.toString(),
    title: step.stepName,
    stepNumber: index + 1,
    totalSteps: timelineSteps.length,
    status: mapStatus(step.status),
    icon: defaultIcon,
  }));
};

export default function ClearanceTimeline({ timelineSteps, steps }: ClearanceTimelineProps) {
  // Use timelineSteps from API if provided, otherwise use default steps or provided steps
  const displaySteps = useMemo(() => {
    if (timelineSteps && timelineSteps.length > 0) {
      return mapTimelineStepsToSteps(timelineSteps);
    }
    if (steps) {
      return steps;
    }
    return defaultSteps;
  }, [timelineSteps, steps]);
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <svg
          className="w-5 h-5 text-brand-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">
          Clearance Timeline
        </h3>
      </div>

      {/* Timeline */}
      <div className="relative pl-6">
        {/* Vertical connecting line - continuous line through all circles */}
        <div 
          className="absolute left-6 w-0.5 bg-gray-300 dark:bg-gray-700 z-0"
          style={{
            top: '2rem', // Start from first circle center
            bottom: '2rem', // End at last circle center  
            transform: 'translateX(-50%)'
          }}
        />

        {/* Steps */}
        <div className="space-y-4">
          {displaySteps.map((step, index) => (
            <div key={step.id} className="relative">
              {/* Timeline Node Circle - centered on the line */}
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 z-10" />

              {/* Step Card */}
              <div className="ml-8 rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900 p-4 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Icon Circle */}
                  <div className="shrink-0 w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-400">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-1">
                      {step.title}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Step {step.stepNumber} of {step.totalSteps}
                    </p>
                  </div>
                </div>

                {/* Status Badge */}
                <div className="shrink-0">
                  <Badge
                    variant="light"
                    color={
                      step.status === "COMPLETED"
                        ? "success"
                        : step.status === "IN_PROGRESS"
                        ? "primary"
                        : "light"
                    }
                    size="sm"
                  >
                    {step.status}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

