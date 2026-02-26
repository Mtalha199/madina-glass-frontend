import React from "react";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { VehicleIcon } from "@/icons";
import { VehicleCardData } from "../types";
import PermissionWrapper from "@/components/permissions/PermissionWrapper";

interface VehicleInfoCardProps {
  vehicle: VehicleCardData;
  createdAt: string;
  updatedAt: string;
  onEdit: () => void;
}

// Move formatDate outside component to prevent recreation on every render
const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  } catch {
    return dateString;
  }
};

export function VehicleInfoCard({
  vehicle,
  createdAt,
  updatedAt,
  onEdit,
}: VehicleInfoCardProps) {
  // Calculate progress percentage
  const progressPercentage = vehicle.progress.total > 0
    ? Math.round((vehicle.progress.current / vehicle.progress.total) * 100)
    : 0;

  // Format dates
  const formattedCreatedAt = formatDate(createdAt);
  const formattedUpdatedAt = formatDate(updatedAt);

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-brand-500 rounded-xl transition-all duration-300 ease-in-out hover:bg-brand-600 hover:scale-110 hover:shadow-md">
            <VehicleIcon className="w-6 h-6 text-white transition-transform duration-300 ease-in-out hover:rotate-12" />
          </div>
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90">
                {vehicle.referenceNumber}
              </h1>
              <Badge variant="light" color="dark" size="sm">
                {vehicle.status}
              </Badge>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Vehicle ID: {`#${vehicle.id}`}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Reference Number: {vehicle.vin}
            </p>
          </div>
        </div>
        <PermissionWrapper 
        permissions={["vehicle.update"]} >
       <Button
          variant="outline"
          size="sm"
          startIcon={
            <svg
              className="w-4 h-4"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M17.0911 3.53206C16.2124 2.65338 14.7878 2.65338 13.9091 3.53206L5.6074 11.8337C5.29899 12.1421 5.08687 12.5335 4.99684 12.9603L4.26177 16.445C4.20943 16.6931 4.286 16.9508 4.46529 17.1301C4.64458 17.3094 4.90232 17.3859 5.15042 17.3336L8.63507 16.5985C9.06184 16.5085 9.45324 16.2964 9.76165 15.988L18.0633 7.68631C18.942 6.80763 18.942 5.38301 18.0633 4.50433L17.0911 3.53206ZM14.9697 4.59272C15.2626 4.29982 15.7375 4.29982 16.0304 4.59272L17.0027 5.56499C17.2956 5.85788 17.2956 6.33276 17.0027 6.62565L16.1043 7.52402L14.0714 5.49109L14.9697 4.59272ZM13.0107 6.55175L6.66806 12.8944C6.56526 12.9972 6.49455 13.1277 6.46454 13.2699L5.96704 15.6283L8.32547 15.1308C8.46772 15.1008 8.59819 15.0301 8.70099 14.9273L15.0436 8.58468L13.0107 6.55175Z"
                fill="currentColor"
              />
            </svg>
          }
          onClick={onEdit}
        >
          Edit
        </Button>
        </PermissionWrapper>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 transition-all duration-300 ease-in-out hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50/50 dark:hover:bg-brand-500/10 hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-brand-500 transition-transform duration-300 ease-in-out hover:scale-110"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="2" cy="2" r="1.5" fill="currentColor" />
              <path
                d="M2 2 C6 2, 8 6, 8 8 C8 10, 10 14, 14 14"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
              <circle cx="14" cy="14" r="1.5" fill="currentColor" />
            </svg>
            <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">Route</span>
          </div>
          <p className="text-base font-semibold text-gray-800 dark:text-white/90 transition-colors duration-200">
            {vehicle.route}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 transition-all duration-300 ease-in-out hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50/50 dark:hover:bg-brand-500/10 hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-brand-500 transition-transform duration-300 ease-in-out hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
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
            <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">Destination</span>
          </div>
          <p className="text-base font-semibold text-gray-800 dark:text-white/90 transition-colors duration-200">
            {vehicle.destination}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 transition-all duration-300 ease-in-out hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50/50 dark:hover:bg-brand-500/10 hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-brand-500 transition-transform duration-300 ease-in-out hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">Created</span>
          </div>
          <p className="text-base font-semibold text-gray-800 dark:text-white/90 transition-colors duration-200">
            {formattedCreatedAt}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 transition-all duration-300 ease-in-out hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50/50 dark:hover:bg-brand-500/10 hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-brand-500 transition-transform duration-300 ease-in-out hover:scale-110"
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
            <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">Updated</span>
          </div>
          <p className="text-base font-semibold text-gray-800 dark:text-white/90 transition-colors duration-200">
            {formattedUpdatedAt}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 transition-all duration-300 ease-in-out hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50/50 dark:hover:bg-brand-500/10 hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-brand-500 transition-transform duration-300 ease-in-out hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
              />
            </svg>
            <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">Shipment No.</span>
          </div>
          <p className="text-base font-semibold text-gray-800 dark:text-white/90 transition-colors duration-200">
            {vehicle.shipmentNumber || "-"}
          </p>
        </div>

        <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 transition-all duration-300 ease-in-out hover:border-brand-300 dark:hover:border-brand-700 hover:bg-brand-50/50 dark:hover:bg-brand-500/10 hover:shadow-md hover:-translate-y-1">
          <div className="flex items-center gap-2 mb-2">
            <svg
              className="w-5 h-5 text-brand-500 transition-transform duration-300 ease-in-out hover:scale-110"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
              />
            </svg>
            <span className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">DHL Tracking</span>
          </div>
          <p className="text-base font-semibold text-gray-800 dark:text-white/90 transition-colors duration-200">
            {vehicle.dhlTrackingNumber || "-"}
          </p>
        </div>
      </div>

      {/* Overall Progress */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
            Overall Progress
          </h3>
          <span className="text-sm font-semibold text-brand-500">
            {progressPercentage}%
          </span>
        </div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full dark:bg-gray-800 overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-brand-500 rounded-full transition-all duration-500 ease-out hover:bg-brand-600"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
          {vehicle.progress.current} of {vehicle.progress.total} steps completed
        </p>
      </div>
    </div>
  );
}


