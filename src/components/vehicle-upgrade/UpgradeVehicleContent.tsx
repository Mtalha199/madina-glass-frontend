"use client";

import React, { useState, useEffect, useCallback } from "react";
import Badge from "@/components/ui/badge/Badge";
import { VehicleIcon, ArrowRightIcon, UserIcon, PaperPlaneIcon } from "@/icons";
import ClearanceTimeline from "./ClearanceTimeline";
import { vehicleApi, VehicleResponse } from "@/lib/api/vehicle";
import { API_BASE_URL } from "@/lib/api/config";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import ResourceNotFound from "@/components/common/ResourceNotFound";
import VerifyPaymentModal from "./VerifyPaymentModal";

interface UpgradeVehicleContentProps {
  vehicleId: string;
  refreshRef?: React.MutableRefObject<(() => void) | null>;
  onPaymentVerified?: () => void;
}

// Helper function to format customer type (ZAMBIAN_IMPORT -> ZAMBIAN IMPORT)
const formatCustomerType = (type: string): string => {
  return type.replace(/_/g, " ");
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
};

// Helper function to format payment status
const formatPaymentStatus = (status: string | null): string => {
  if (!status) return "N/A";
  return status.replace(/_/g, " ");
};

// Helper function to get payment status badge color
const getPaymentStatusColor = (status: string | null): "success" | "warning" | "error" | "light" => {
  if (!status) return "light";
  const upperStatus = status.toUpperCase();
  if (upperStatus.includes("PAID") || upperStatus.includes("COMPLETED")) {
    return "success";
  }
  if (upperStatus.includes("PENDING")) {
    return "warning";
  }
  if (upperStatus.includes("FAILED") || upperStatus.includes("REJECTED")) {
    return "error";
  }
  return "light";
};

// Helper function to get file URL
const getFileUrl = (url: string | null): string | null => {
  if (!url) return null;
  
  let finalUrl: string;
  
  // If URL already includes http/https, use it as is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    finalUrl = url;
  } else {
    // Otherwise, prepend API base URL
    finalUrl = `${API_BASE_URL}${url}`;
  }
  
  // Remove /api/v1 from the URL path (cleanest way to handle API versioning in file URLs)
  return finalUrl.replace("/api/v1", "");
};

// Helper function to check if file is PDF
const isPdfFile = (url: string | null): boolean => {
  if (!url) return false;
  const lowerUrl = url.toLowerCase();
  return lowerUrl.endsWith('.pdf') || lowerUrl.includes('.pdf');
};

export default function UpgradeVehicleContent({ vehicleId, refreshRef, onPaymentVerified }: UpgradeVehicleContentProps) {
  const [vehicle, setVehicle] = useState<VehicleResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchVehicle = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const vehicleData = await vehicleApi.getVehicleById(vehicleId);
      if (!vehicleData) {
        setError("Vehicle not found");
        return;
      }
      setVehicle(vehicleData);
    } catch (err) {
      console.error("Failed to fetch vehicle:", err);
      setError("Failed to load vehicle data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [vehicleId]);

  useEffect(() => {
    fetchVehicle();
  }, [fetchVehicle]);

  // Expose refresh function to parent via ref
  useEffect(() => {
    if (refreshRef) {
      refreshRef.current = fetchVehicle;
    }
  }, [refreshRef, fetchVehicle]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-6">
          <Skeleton variant="rectangular" height={200} />
        </div>
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-6">
          <Skeleton variant="rectangular" height={400} />
        </div>
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <ResourceNotFound />
      </div>
    );
  }

  const vehicleData = {
    referenceNumber: vehicle.referenceNumber,
    createdDate: formatDate(vehicle.createdAt),
    status: vehicle.vehicleStatus,
    upgradeStatus: vehicle.upgradeStatus,
    route: vehicle.route,
    finalDestination: vehicle.finalDestination,
    currentCustomerType: formatCustomerType(vehicle.customerType),
    pendingCustomerType: vehicle.pendingCustomerType
      ? formatCustomerType(vehicle.pendingCustomerType)
      : null,
    pendingRoute: vehicle.pendingRoute,
    pendingDestination: vehicle.pendingDestination,
  };

  return (
    <div className="space-y-6">
      {/* First Section: Vehicle Details, Route Information, and Customer Type Transition */}
      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-6">
        {/* Vehicle Details Section */}
        <div className="flex items-start justify-between mb-8 pb-6 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-14 h-14 rounded-xl border-2 border-brand-500">
              <VehicleIcon className="w-7 h-7 text-brand-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white/90 mb-1">
              Reference Number: {vehicle.vin}
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Created {vehicleData.createdDate}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="light" color="dark" size="sm">
              Vehicle Status: {vehicleData.status}
            </Badge>
            <Badge variant="light" color="warning" size="sm">
              Upgrade Status: {vehicleData.upgradeStatus}
            </Badge>
            {vehicle.paymentStatus && (
              <Badge variant="light" color={getPaymentStatusColor(vehicle.paymentStatus)} size="sm">
                Payment: {formatPaymentStatus(vehicle.paymentStatus)}
              </Badge>
            )}
          </div>
        </div>

        {/* Transitions Section - Full Width */}
        <div className="w-full">
          <h3 className="text-lg font-bold text-gray-800 dark:text-white/90 mb-6">
            Transitions
          </h3>
          <div className="relative">
            {/* Vertical connecting line - dynamic height based on content */}
            <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-brand-500/60 h-80"></div>
            
            <div className="space-y-8">
                {/* Customer Type Transition */}
                <div className="relative flex items-start gap-4">
                  {/* Icon Circle */}
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-brand-500 shrink-0">
                    <UserIcon className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Customer Type Transition
                    </h4>
                    <div className="flex items-center gap-4 w-full">
                      {/* Current State */}
                      <div className="flex-1 min-w-0 rounded-lg border-2 border-brand-500/30 bg-white dark:bg-gray-900 p-4">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase">
                          CURRENT
                        </div>
                        <div className="text-base font-bold text-gray-800 dark:text-white/90 uppercase">
                          {vehicleData.currentCustomerType}
                        </div>
                      </div>

                      {/* Arrow with PENDING */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-500">
                          <ArrowRightIcon className="w-[22px] h-[20px] text-white" />
                        </div>
                        <Badge variant="light" color="warning" size="sm">
                          PENDING
                        </Badge>
                      </div>

                      {/* Pending State */}
                      {vehicleData.pendingCustomerType ? (
                        <div className={`flex-1 min-w-0 rounded-lg border-2 p-4 ${
                          vehicleData.currentCustomerType === vehicleData.pendingCustomerType
                            ? "border-brand-500/30 bg-white dark:bg-gray-900"
                            : "border-dashed border-brand-500/30 bg-warning-50 dark:bg-warning-500/10"
                        }`}>
                          <div className={`text-xs font-medium mb-2 uppercase ${
                            vehicleData.currentCustomerType === vehicleData.pendingCustomerType
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-warning-600 dark:text-warning-400"
                          }`}>
                            PENDING
                          </div>
                          <div className="text-base font-bold text-gray-800 dark:text-white/90 uppercase">
                            {vehicleData.pendingCustomerType}
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 min-w-0 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase">
                            NO UPGRADE
                          </div>
                          <div className="text-base font-bold text-gray-400 dark:text-gray-500">
                            No pending upgrade
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Route Transition */}
                <div className="relative flex items-start gap-4">
                  {/* Icon Circle */}
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-brand-500 shrink-0">
                    <PaperPlaneIcon className="w-5 h-5 text-white" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Route Transition
                    </h4>
                    <div className="flex items-center gap-4 w-full">
                      {/* Current State */}
                      <div className="flex-1 min-w-0 rounded-lg border-2 border-brand-500/30 bg-white dark:bg-gray-900 p-4">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase">
                          CURRENT
                        </div>
                        <div className="text-base font-bold text-gray-800 dark:text-white/90">
                          {vehicleData.route}
                        </div>
                      </div>

                      {/* Arrow with PENDING */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-500">
                          <ArrowRightIcon className="w-[22px] h-[20px] text-white" />
                        </div>
                        <Badge variant="light" color="warning" size="sm">
                          PENDING
                        </Badge>
                      </div>
                      
                      {/* Pending State */}
                      {vehicleData.pendingRoute ? (
                        <div className={`flex-1 min-w-0 rounded-lg border-2 p-4 ${
                          vehicleData.route === vehicleData.pendingRoute
                            ? "border-brand-500/30 bg-white dark:bg-gray-900"
                            : "border-dashed border-brand-500/30 bg-warning-50 dark:bg-warning-500/10"
                        }`}>
                          <div className={`text-xs font-medium mb-2 uppercase ${
                            vehicleData.route === vehicleData.pendingRoute
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-warning-600 dark:text-warning-400"
                          }`}>
                            PENDING
                          </div>
                          <div className="text-base font-bold text-gray-800 dark:text-white/90">
                            {vehicleData.pendingRoute}
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 min-w-0 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase">
                            NO UPGRADE
                          </div>
                          <div className="text-base font-bold text-gray-400 dark:text-gray-500">
                            No pending upgrade
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Destination Transition */}
                <div className="relative flex items-start gap-4">
                  {/* Icon Circle */}
                  <div className="relative z-10 flex items-center justify-center w-10 h-10 rounded-full bg-brand-500 shrink-0">
                    <svg
                      className="w-5 h-5 text-white"
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
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Destination Transition
                    </h4>
                    <div className="flex items-center gap-4 w-full">
                      {/* Current State */}
                      <div className="flex-1 min-w-0 rounded-lg border-2 border-brand-500/30 bg-white dark:bg-gray-900 p-4">
                        <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase">
                          CURRENT
                        </div>
                        <div className="text-base font-bold text-gray-800 dark:text-white/90">
                          {vehicleData.finalDestination}
                        </div>
                      </div>

                      {/* Arrow with PENDING */}
                      <div className="flex flex-col items-center gap-2">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-500">
                          <ArrowRightIcon className="w-[22px] h-[20px] text-white" />
                        </div>
                        <Badge variant="light" color="warning" size="sm">
                          PENDING
                        </Badge>
                      </div>

                      {/* Pending State */}
                      {vehicleData.pendingDestination ? (
                        <div className={`flex-1 min-w-0 rounded-lg border-2 p-4 ${
                          vehicleData.finalDestination === vehicleData.pendingDestination
                            ? "border-brand-500/30 bg-white dark:bg-gray-900"
                            : "border-dashed border-brand-500/30 bg-warning-50 dark:bg-warning-500/10"
                        }`}>
                          <div className={`text-xs font-medium mb-2 uppercase ${
                            vehicleData.finalDestination === vehicleData.pendingDestination
                              ? "text-gray-500 dark:text-gray-400"
                              : "text-warning-600 dark:text-warning-400"
                          }`}>
                            PENDING
                          </div>
                          <div className="text-base font-bold text-gray-800 dark:text-white/90">
                            {vehicleData.pendingDestination}
                          </div>
                        </div>
                      ) : (
                        <div className="flex-1 min-w-0 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 p-4">
                          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase">
                            NO UPGRADE
                          </div>
                          <div className="text-base font-bold text-gray-400 dark:text-gray-500">
                            No pending upgrade
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Payment Information Section */}
      {(vehicle.upgradePrice || vehicle.upgradeInvoiceUrl || vehicle.paymentScreenshot || vehicle.paymentStatus || vehicle.paymentNotes) && (
        <div className={`rounded-2xl border p-6 ${
          vehicle.paymentStatus === "PAYMENT_SUBMITTED" 
            ? "border-warning-300 bg-warning-50/50 dark:border-warning-700 dark:bg-warning-500/10" 
            : "border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3"
        }`}>
          {/* Header Section */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-xl ${
                vehicle.paymentStatus === "PAYMENT_SUBMITTED"
                  ? "bg-warning-500"
                  : vehicle.paymentStatus === "RECEIVED"
                  ? "bg-success-500"
                  : "bg-brand-500"
              }`}>
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark:text-white/90">
                  Payment Information
                </h3>
                {vehicle.paymentStatus === "PAYMENT_SUBMITTED" && (
                  <p className="text-sm text-warning-600 dark:text-warning-400 mt-0.5">
                    Payment proof submitted - Verification required
                  </p>
                )}
              </div>
            </div>
            {vehicle.paymentStatus === "PAYMENT_SUBMITTED" && (
              <VerifyPaymentModal 
                vehicleId={vehicleId} 
                onPaymentVerified={() => {
                  fetchVehicle();
                  if (onPaymentVerified) {
                    onPaymentVerified();
                  }
                }} 
              />
            )}
          </div>

          {/* Payment Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Payment Summary */}
            <div className="space-y-4">
              {vehicle.upgradePrice !== null && vehicle.upgradePrice !== undefined && (
                <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block uppercase tracking-wide">
                    Upgrade Price
                  </label>
                  <p className="text-2xl font-bold text-gray-800 dark:text-white/90">
                    ${vehicle.upgradePrice.toFixed(2)}
                  </p>
                </div>
              )}

              {vehicle.paymentStatus && (
                <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block uppercase tracking-wide">
                    Payment Status
                  </label>
                  <Badge 
                    variant="light" 
                    color={getPaymentStatusColor(vehicle.paymentStatus)} 
                    size="md"
                  >
                    {formatPaymentStatus(vehicle.paymentStatus)}
                  </Badge>
                </div>
              )}

              {vehicle.paymentNotes && (
                <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 block uppercase tracking-wide">
                    Payment Notes
                  </label>
                  <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                    {vehicle.paymentNotes}
                  </p>
                </div>
              )}
            </div>

            {/* Documents Section - Side by Side */}
            <div className="lg:col-span-2 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Invoice */}
                {vehicle.upgradeInvoiceUrl && (
                  <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 block uppercase tracking-wide">
                      Invoice Document
                    </label>
                    <div className="relative w-full h-56 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/50 mb-3 flex items-center justify-center">
                      {isPdfFile(vehicle.upgradeInvoiceUrl) ? (
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                          <svg
                            className="w-16 h-16 text-red-500 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">PDF Document</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Click to view</p>
                        </div>
                      ) : (
                        <img
                          src={getFileUrl(vehicle.upgradeInvoiceUrl) || ""}
                          alt="Invoice"
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3EImage not found%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      )}
                    </div>
                    <a
                      href={getFileUrl(vehicle.upgradeInvoiceUrl) || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 inline-flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {isPdfFile(vehicle.upgradeInvoiceUrl) ? "View PDF" : "View Full Invoice"}
                    </a>
                  </div>
                )}

                {/* Payment Screenshot */}
                {vehicle.paymentScreenshot && (
                  <div className="p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                    <label className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 block uppercase tracking-wide">
                      Payment Proof
                    </label>
                    <div className="relative w-full h-56 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/50 mb-3 flex items-center justify-center">
                      {isPdfFile(vehicle.paymentScreenshot) ? (
                        <div className="flex flex-col items-center justify-center p-4 text-center">
                          <svg
                            className="w-16 h-16 text-red-500 mb-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                            />
                          </svg>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">PDF Document</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Click to view</p>
                        </div>
                      ) : (
                        <img
                          src={getFileUrl(vehicle.paymentScreenshot) || ""}
                          alt="Payment Screenshot"
                          className="w-full h-full object-contain p-2"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dy='.3em' fill='%23999'%3EImage not found%3C/text%3E%3C/svg%3E";
                          }}
                        />
                      )}
                    </div>
                    <a
                      href={getFileUrl(vehicle.paymentScreenshot) || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400 dark:hover:text-brand-300 inline-flex items-center gap-1 transition-colors"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      {isPdfFile(vehicle.paymentScreenshot) ? "View PDF" : "View Full Screenshot"}
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Second Section: Clearance Timeline - Separate Card */}
      {/* <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-6">
        <ClearanceTimeline timelineSteps={vehicle.timelineSteps} />
      </div> */}
    </div>
  );
}

