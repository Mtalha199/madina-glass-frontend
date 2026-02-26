/**
 * Process Overview Component
 * Displays process statistics in the left sidebar
 */

import React from "react";
import { ApiVehicleData } from "../types";

interface ProcessOverviewProps {
    vehicleData: ApiVehicleData;
    totalSteps: number;
    completedSteps: number;
}

export const ProcessOverview: React.FC<ProcessOverviewProps> = ({
    vehicleData,
    totalSteps,
    completedSteps,
}) => {
    return (
        <div className="bg-white dark:bg-white/3 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
            <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-4">
                Process Overview
            </h3>
            <div className="space-y-3">
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">TOTAL STEPS</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {totalSteps} steps
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">COMPLETED STEPS</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {completedSteps} / {totalSteps}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">ROUTE</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {vehicleData.route}
                    </p>
                </div>
                <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">FINAL DESTINATION</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                        {vehicleData.finalDestination}
                    </p>
                </div>
                {vehicleData.shipmentNumber && (
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1 uppercase">Vessel NUMBER</p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {vehicleData.shipmentNumber}
                        </p>
                    </div>
                )}
                {vehicleData.dhlTrackingNumber && (
                    <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">DHL TRACKING</p>
                        <p className="text-sm font-medium text-gray-800 dark:text-white/90">
                            {vehicleData.dhlTrackingNumber}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

