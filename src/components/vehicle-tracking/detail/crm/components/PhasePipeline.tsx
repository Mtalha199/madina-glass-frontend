/**
 * Phase Pipeline Component - Alternative Design
 * Card-based pipeline with progress indicators and status badges
 */

import React from "react";
import { Phase } from "../types";

interface PhasePipelineProps {
    phases: Phase[];
}

export const PhasePipeline: React.FC<PhasePipelineProps> = ({ phases }) => {
    return (
        <div className="bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 mb-6 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-lg">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                    Phase Pipeline Status
                </h3>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {phases.length} Phases
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {phases.map((phase, index) => {
                    const isLast = index === phases.length - 1;
                    
                    return (
                        <div key={phase.id} className="relative">
                            {/* Card */}
                            <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100 dark:border-gray-700">
                                {/* Header with number badge */}
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`${phase.color} w-10 h-10 rounded-lg flex items-center justify-center shadow-md`}>
                                        <span className="text-white font-bold text-sm">
                                            {index + 1}
                                        </span>
                                    </div>
                                    
                                    {/* Status badge */}
                                    <div className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                                        <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                            Active
                                        </span>
                                    </div>
                                </div>

                                {/* Phase title */}
                                <h4 className="text-sm font-bold text-gray-800 dark:text-white mb-3">
                                    {phase.title}
                                </h4>

                                {/* Progress bar */}
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                                    <div 
                                        className={`${phase.color} h-2 rounded-full transition-all duration-500`}
                                        style={{ width: `${phase.progress ?? 0}%` }}
                                    />
                                </div>

                                {/* Progress text */}
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                    {phase.progress ?? 0}% Complete
                                </p>
                            </div>

                            {/* Connector arrow for desktop */}
                            {!isLast && (
                                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                    <svg 
                                        className="w-8 h-8 bg-brand-500 text-white rounded-full p-1" 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path 
                                            fillRule="evenodd" 
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" 
                                            clipRule="evenodd" 
                                        />
                                    </svg>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};