/**
 * Timeline Phases Component
 * Displays all timeline phases with collapsible steps
 */

import React from "react";
import { ChevronDownIcon } from "@/icons";
import { PhaseGroup, TimelineStep } from "../types";

interface TimelinePhasesProps {
    phaseGroups: PhaseGroup[];
    expandedPhases: Set<string>;
    onTogglePhase: (phaseId: string) => void;
    onStepClick: (step: TimelineStep) => void;
}

export const TimelinePhases: React.FC<TimelinePhasesProps> = ({
    phaseGroups,
    expandedPhases,
    onTogglePhase,
    onStepClick,
}) => {
    // Calculate cumulative step numbers across all phases
    let cumulativeStepNumber = 0;

    return (
        <div className="bg-white dark:bg-white/3 rounded-xl border border-gray-200 dark:border-gray-800 p-6 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-2">
                Timeline Steps
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Click any step to update status, add notes, or upload documents
            </p>

            <div className="space-y-4">
                {phaseGroups.map((phase) => {
                    const isExpanded = expandedPhases.has(phase.id);
                    return (
                        <div
                            key={phase.id}
                            className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden"
                        >
                            {/* Phase Header - Collapsible */}
                            <button
                                onClick={() => onTogglePhase(phase.id)}
                                className={`w-full flex items-center gap-4 p-4 ${phase.color} text-white hover:opacity-90 transition-opacity`}
                            >
                                <svg
                                    className="w-5 h-5 shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                                    />
                                </svg>
                                <div className="flex-1 text-left">
                                    <h4 className="font-semibold text-sm">{phase.title}</h4>
                                </div>
                                <ChevronDownIcon
                                    className={`w-4 h-4 shrink-0 transition-transform ${isExpanded ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {/* Phase Steps */}
                            {isExpanded && (
                                <div className="p-4 bg-gray-50 dark:bg-white/2">
                                    <div className="grid grid-cols-2 gap-3">
                                        {phase.steps.map((step) => {
                                            // Increment step number for each step
                                            cumulativeStepNumber++;
                                            const currentStepNumber = cumulativeStepNumber;
                                            
                                            return (
                                                <div
                                                    key={step.id || currentStepNumber}
                                                    onClick={() => onStepClick(step)}
                                                    className="flex items-center gap-3 p-3 bg-white dark:bg-white/3 rounded-lg border border-gray-200 dark:border-gray-800 cursor-pointer hover:border-brand-500 hover:shadow-sm transition-all"
                                                >
                                                    {/* Step Number Circle */}
                                                    <div
                                                        className={`flex items-center justify-center w-8 h-8 rounded-full shrink-0 font-semibold text-sm relative ${step.status === "COMPLETED"
                                                                ? "bg-success-500 text-white"
                                                                : step.status === "IN_PROGRESS"
                                                                    ? "bg-blue-light-500 text-white"
                                                                    : step.status === "BLOCKED"
                                                                        ? "bg-error-500 text-white"
                                                                        : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                                                            } ${step.status === "IN_PROGRESS" ? "animate-pulse" : ""
                                                            }`}
                                                    >
                                                        {step.status === "IN_PROGRESS" ? (
                                                            <svg
                                                                className="w-4 h-4 animate-spin"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                />
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                />
                                                            </svg>
                                                        ) : (
                                                            currentStepNumber
                                                        )}
                                                    </div>

                                                    {/* Step Title */}
                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium text-gray-800 dark:text-white/90 line-clamp-2">
                                                            {step.title}
                                                        </p>
                                                    </div>

                                                    {/* Status Badge */}
                                                    {step.status === "COMPLETED" && (
                                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-success-50 dark:bg-success-500/20 rounded-full">
                                                            <svg
                                                                className="w-3.5 h-3.5 text-success-600 dark:text-success-400"
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
                                                            <span className="text-xs font-medium text-success-600 dark:text-success-400">
                                                                Completed
                                                            </span>
                                                        </div>
                                                    )}
                                                    {step.status === "IN_PROGRESS" && (
                                                        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-light-50 dark:bg-blue-light-500/20 rounded-full">
                                                            <svg
                                                                className="w-3 h-3 text-blue-light-600 dark:text-blue-light-400 animate-spin"
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <circle
                                                                    className="opacity-25"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                />
                                                                <path
                                                                    className="opacity-75"
                                                                    fill="currentColor"
                                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                />
                                                            </svg>
                                                            <span className="text-xs font-medium text-blue-light-600 dark:text-blue-light-400">
                                                                In Progress
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};