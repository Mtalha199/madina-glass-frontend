/**
 * Vehicle Header Component
 * Displays vehicle title, route, and status buttons
 */

import React from "react";
import { ApiVehicleData } from "../types";
import { getCustomerTypeDisplay, getRouteDisplay } from "../utils";
import { InProgress } from "./StepUpdateModal";
import { VehicleIcon } from "@/icons";

interface VehicleHeaderProps {
    vehicleData: ApiVehicleData;
    onIssueClick?: () => void;
}

export const VehicleHeader: React.FC<VehicleHeaderProps> = ({ vehicleData, onIssueClick }) => {
    return (
        <div className="bg-white dark:bg-white/3 rounded-xl border border-gray-200 dark:border-gray-800 p-6 mb-6 shadow-sm">
            <div className="flex  items-center justify-between">
                <div className="flex items-start gap-4">
                    {/* Orange Icon with Truck */}
                    <div className="flex items-center justify-center w-15 h-15 rounded-full bg-brand-500 shrink-0">
                       <VehicleIcon className="w-6 h-6 text-white" />
                    </div>

                    {/* Title and Info */}
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                                {getCustomerTypeDisplay(vehicleData.customerType)}
                            </h1>
                            
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <span className="font-medium py-0.5">REF:</span>
                                <span className="font-medium px-3 py-0.5 bg-brand-500 text-white rounded-full">{vehicleData.vin}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                                <span>{getRouteDisplay(vehicleData)}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Status Buttons */}
                <div className="flex items-center flex-row justify-center h-full gap-3">

                    <button onClick={onIssueClick} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-200 hover:bg-gray-300">
                        Create Service Extension
                    </button>
                   
                    <button
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                            vehicleData.vehicleStatus === "COMPLETED"
                                ? "bg-success-500 text-white hover:bg-success-600"
                                : vehicleData.vehicleStatus === "IN_PROGRESS"
                                ? "bg-blue-light-500 text-white hover:bg-blue-light-600"
                                : "bg-gray-500 text-white hover:bg-gray-600"
                        }`}
                    >
                       {vehicleData.vehicleStatus === "IN_PROGRESS" ? <InProgress/> : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                            />
                        </svg>}
                        {vehicleData.vehicleStatus.replace("_", " ")}
                    </button>

                  
                </div>
            </div>
        </div>
    );
};

