"use client";

import React, { useState } from "react";
import { ChevronDownIcon, ArrowRightIcon } from "@/icons";
import { CheckIcon, ClockIcon, AttachmentIcon } from "./TimelineIcons";

interface SubStep {
  id: string;
  title: string;
  status: "COMPLETED" | "IN_PROGRESS" | "PENDING" | "BLOCKED";
  completedAt?: string;
  hasAttachment?: boolean;
  canUpdate?: boolean;
}

interface TimelineStage {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  status: "COMPLETED" | "IN_PROGRESS" | "PENDING" | "BLOCKED";
  completed: number;
  total: number;
  subSteps: SubStep[];
}

// Static data matching the image
const staticTimelineData: TimelineStage[] = [
  {
    id: "1",
    number: 1,
    title: "Commercial & Shipping",
    subtitle: "Pre-Dar es Salaam",
    status: "COMPLETED",
    completed: 7,
    total: 7,
    subSteps: [],
  },
  {
    id: "2",
    number: 2,
    title: "Document & Port Process",
    subtitle: "Dar es Salaam",
    status: "IN_PROGRESS",
    completed: 3,
    total: 4,
    subSteps: [
      {
        id: "2-1",
        title: "Customer TPIN & TCC Uploaded",
        status: "COMPLETED",
        completedAt: "Jan 31, 2026, 4:24 PM",
        hasAttachment: true,
      },
      {
        id: "2-2",
        title: "TPIN & TCC Verified",
        status: "COMPLETED",
        completedAt: "Feb 1, 2026, 4:24 PM",
      },
      {
        id: "2-3",
        title: "Vehicle Arrives – Dar",
        status: "COMPLETED",
        completedAt: "Feb 2, 2026, 4:24 PM",
      },
      {
        id: "2-4",
        title: "Port Clearance Completed",
        status: "IN_PROGRESS",
        canUpdate: true,
      },
    ],
  },
  {
    id: "3",
    number: 3,
    title: "Zambia Clearing - Nakonde",
    subtitle: "Detailed Stages",
    status: "PENDING",
    completed: 0,
    total: 12,
    subSteps: [],
  },
  {
    id: "4",
    number: 4,
    title: "Inland Transit",
    subtitle: "TZ → ZM",
    status: "PENDING",
    completed: 0,
    total: 3,
    subSteps: [],
  },
];

const HierarchicalTimeline: React.FC = () => {
  const [expandedStages, setExpandedStages] = useState<Set<string>>(new Set(["2"]));

  const toggleStage = (stageId: string) => {
    setExpandedStages((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(stageId)) {
        newSet.delete(stageId);
      } else {
        newSet.add(stageId);
      }
      return newSet;
    });
  };

  const getStageColor = (status: TimelineStage["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400";
      case "IN_PROGRESS":
        return "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-400";
      case "PENDING":
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-500/20 dark:text-gray-400";
    }
  };

  const getProgressColor = (status: TimelineStage["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "text-green-600 dark:text-green-400";
      case "IN_PROGRESS":
        return "text-orange-600 dark:text-orange-400";
      case "PENDING":
      default:
        return "text-gray-600 dark:text-gray-400";
    }
  };

  const getSubStepStatusIcon = (status: SubStep["status"]) => {
    switch (status) {
      case "COMPLETED":
        return (
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 shrink-0">
            <CheckIcon className="w-3 h-3 text-white" />
          </div>
        );
      case "IN_PROGRESS":
        return (
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-orange-500 shrink-0">
            <ClockIcon className="w-3 h-3 text-white" />
          </div>
        );
      case "BLOCKED":
        return (
          <div className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500 shrink-0">
            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        );
      case "PENDING":
      default:
        return (
          <div className="flex items-center justify-center w-5 h-5 rounded-full border-2 border-gray-300 bg-transparent dark:border-gray-600 shrink-0">
            <div className="w-2 h-2 rounded-full border-2 border-gray-400 bg-transparent dark:border-gray-500" />
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      {staticTimelineData.map((stage) => {
        const isExpanded = expandedStages.has(stage.id);
        const hasSubSteps = stage.subSteps.length > 0;
        const isCompleted = stage.status === "COMPLETED";

        return (
          <div
            key={stage.id}
            className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 overflow-hidden"
          >
            {/* Stage Header */}
            <div
              className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${
                hasSubSteps ? "" : "cursor-default"
              }`}
              onClick={() => hasSubSteps && toggleStage(stage.id)}
            >
              {/* Numbered Circle */}
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full shrink-0 font-semibold text-sm ${getStageColor(
                  stage.status
                )}`}
              >
                {stage.number}
              </div>

              {/* Stage Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
                    {stage.title}
                  </h3>
                  {isCompleted && (
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-green-500 shrink-0">
                      <CheckIcon className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                  {stage.subtitle}
                </p>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-sm font-medium ${getProgressColor(stage.status)}`}>
                  {stage.completed}/{stage.total}
                </span>
                {hasSubSteps && (
                  <div className="text-gray-400 dark:text-gray-500">
                    {isExpanded ? (
                      <ChevronDownIcon className="w-4 h-4" />
                    ) : (
                      <ArrowRightIcon className="w-4 h-4" />
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Sub-steps */}
            {isExpanded && hasSubSteps && (
              <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-white/2">
                <div className="p-4 pt-4 space-y-4">
                  {stage.subSteps.map((subStep, index) => (
                    <div key={subStep.id} className="flex items-start gap-3">
                      {/* Sub-step Icon */}
                      {getSubStepStatusIcon(subStep.status)}

                      {/* Sub-step Content */}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                          {subStep.title}
                        </p>
                        {subStep.completedAt && (
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                            Completed: {subStep.completedAt}
                          </p>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        {subStep.hasAttachment && (
                          <a
                            href="#"
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              console.log(`View attachment for ${subStep.id}`);
                            }}
                            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                          >
                            <AttachmentIcon className="w-3.5 h-3.5" />
                            <span>Attachment</span>
                          </a>
                        )}

                        {subStep.canUpdate && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              console.log(`Update step ${subStep.id}`);
                            }}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300"
                          >
                            <div className="w-3.5 h-3.5 rounded-full border-2 border-current" />
                            <span>Update</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default HierarchicalTimeline;

