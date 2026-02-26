"use client";

import React from "react";
import Skeleton from "@/components/ui/skeleton/Skeleton";

/**
 * Loading skeleton for CRM Vehicle Detail Page
 * Modern minimalist design matching the actual page layout
 */
export const VehicleDetailSkeleton: React.FC = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Back Button Skeleton */}
                <div className="mb-6">
                    <Skeleton variant="rectangular" height={20} width={120} />
                </div>

                {/* Header Section */}
                <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-8 mb-6 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6 flex-1">
                            {/* Vehicle Icon */}
                            <Skeleton variant="circular" width={64} height={64} />
                            
                            {/* Vehicle Info */}
                            <div className="flex-1 space-y-3">
                                <Skeleton variant="rectangular" height={28} width={400} />
                                <div className="flex gap-6">
                                    <Skeleton variant="rectangular" height={18} width={180} />
                                    <Skeleton variant="rectangular" height={18} width={180} />
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                            <Skeleton variant="rectangular" height={40} width={40} />
                            <Skeleton variant="rectangular" height={40} width={100} />
                        </div>
                    </div>
                </div>

                {/* Pipeline Progress Skeleton */}
                <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6 shadow-sm">
                    <Skeleton variant="rectangular" height={20} width={150} className="mb-4" />
                    <div className="flex items-center justify-between">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <React.Fragment key={index}>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <Skeleton variant="circular" width={40} height={40} />
                                    <Skeleton variant="rectangular" height={14} width={60} />
                                </div>
                                {index < 5 && <Skeleton variant="rectangular" height={2} width={30} className="mb-8" />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                    {/* Left Sidebar */}
                    <div className="lg:col-span-1 space-y-4">
                        {/* Overview Card */}
                        <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                            <Skeleton variant="rectangular" height={20} width={140} className="mb-4" />
                            <div className="space-y-4">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <div key={i} className="space-y-2">
                                        <Skeleton variant="text" height={14} width="80%" />
                                        <Skeleton variant="text" height={16} width="60%" />
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Attachments Card */}
                        <div className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 p-6 shadow-sm">
                            <Skeleton variant="rectangular" height={20} width={160} className="mb-4" />
                            <div className="space-y-3">
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Skeleton variant="circular" width={20} height={20} />
                                        <div className="flex-1 space-y-1">
                                            <Skeleton variant="text" height={14} width="90%" />
                                            <Skeleton variant="text" height={12} width="70%" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-4">
                        {/* Timeline Phases Container */}
                        {Array.from({ length: 2 }).map((_, phaseIndex) => (
                            <div
                                key={phaseIndex}
                                className="bg-white dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm"
                            >
                                {/* Phase Header */}
                                <div className="p-4 bg-gray-50 dark:bg-gray-800/30 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        <Skeleton variant="circular" width={24} height={24} />
                                        <Skeleton variant="rectangular" height={20} width={280} />
                                    </div>
                                    <Skeleton variant="circular" width={20} height={20} />
                                </div>

                                {/* Phase Steps */}
                                <div className="p-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        {Array.from({ length: 4 }).map((_, stepIndex) => (
                                            <div
                                                key={stepIndex}
                                                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                                            >
                                                <div className="flex items-start gap-3">
                                                    <Skeleton variant="circular" width={28} height={28} />
                                                    <div className="flex-1 space-y-2">
                                                        <Skeleton variant="text" height={14} width="85%" />
                                                        <Skeleton variant="text" height={12} width="65%" />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetailSkeleton;
