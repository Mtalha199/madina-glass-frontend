"use client";

import React, { useState, useEffect } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { updateShipmentStatus, UpdateShipmentStatusPayload } from "../vehicle-tracking/services/vehicleApi";

interface UpdateShipmentStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
  shipmentNumber: string;
  currentStatus?: string;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}

const SHIPMENT_STATUSES: UpdateShipmentStatusPayload["stepName"][] = [
  "Payment Recieved",
  "Vehicle booked",
  "Shipment Departured",
  "Shipment Arrived",
];

export default function UpdateShipmentStatusModal({
  isOpen,
  onClose,
  shipmentNumber,
  currentStatus,
  onSuccess,
  onError,
}: UpdateShipmentStatusModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<UpdateShipmentStatusPayload["stepName"] | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Map current status to modal status format and pre-select if it matches
  const mapStatusToModalStatus = (status?: string): UpdateShipmentStatusPayload["stepName"] | null => {
    if (!status) return null;
    
    const statusLower = status.toLowerCase();
    // Handle "Payment Recieved" (note: API uses the misspelled version)
    if (statusLower.includes("payment") && (statusLower.includes("received") || statusLower.includes("recieved"))) {
      return "Payment Recieved";
    } else if (statusLower.includes("vehicle") && statusLower.includes("booked")) {
      return "Vehicle booked";
    } else if (statusLower.includes("departured") || statusLower.includes("departed")) {
      return "Shipment Departured";
    } else if (statusLower.includes("arrived")) {
      return "Shipment Arrived";
    }
    // "Pending" doesn't match any modal option, so return null (won't pre-select)
    return null;
  };

  // Get the index of current status in the status array
  const getCurrentStatusIndex = (): number => {
    if (!currentStatus) return -1;
    const mappedStatus = mapStatusToModalStatus(currentStatus);
    if (!mappedStatus) return -1;
    return SHIPMENT_STATUSES.indexOf(mappedStatus);
  };

  // Check if a status option should be disabled (only allow forward progression)
  const isStatusDisabled = (status: UpdateShipmentStatusPayload["stepName"]): boolean => {
    const currentIndex = getCurrentStatusIndex();
    // If no current status, allow all options
    if (currentIndex === -1) return false;
    
    const statusIndex = SHIPMENT_STATUSES.indexOf(status);
    // Disable if the status is before or equal to current status (only allow selecting next statuses)
    return statusIndex <= currentIndex;
  };

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedStatus("");
      setError(null);
      setIsSubmitting(false);
    }
    // Don't pre-select current status - user must select a next status
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedStatus) {
      setError("Please select a status");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const payload: UpdateShipmentStatusPayload = {
        shipmentNumber,
        stepName: selectedStatus as UpdateShipmentStatusPayload["stepName"],
      };

      const response = await updateShipmentStatus(payload);

      if (response.success) {
        // Reset form
        setSelectedStatus("");
        setError(null);
        
        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        }
        
        // Close modal
        onClose();
      } else {
        const errorMsg = response.message || "Failed to update shipment status";
        setError(errorMsg);
        if (onError) {
          onError(errorMsg);
        }
      }
    } catch (err: any) {
      console.error("Failed to update shipment status:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to update shipment status. Please try again.";
      setError(errorMessage);
      if (onError) {
        onError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setSelectedStatus("");
      setError(null);
      onClose();
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      className="max-w-[500px] p-5 lg:p-8"
    >
      <div>
        <h4 className="font-semibold text-gray-800 mb-2 text-title-sm dark:text-white/90">
          Update Shipment Status
        </h4>
        <div className="mb-6 space-y-1">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Shipment Number: <span className="font-semibold text-gray-800 dark:text-white/90">{shipmentNumber}</span>
          </p>
          {currentStatus && (
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Current Status: <span className="font-semibold text-gray-800 dark:text-white/90">{currentStatus}</span>
            </p>
          )}
        </div>

         {error && (
            <div className="mb-4 p-3 rounded-lg bg-error-50 border border-error-200 dark:bg-error-500/10 dark:border-error-500/30">
              <p className="text-sm text-error-700 dark:text-error-400">{error}</p>
            </div>
          )}

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label
              htmlFor="status"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
            >
              Select Status
            </label>
            <div className="space-y-2">
              {SHIPMENT_STATUSES.map((status) => {
                const isDisabled = isStatusDisabled(status);
                return (
                  <label
                    key={status}
                    className={`flex items-center p-3 rounded-lg border transition-colors ${
                      isDisabled
                        ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 cursor-not-allowed opacity-50"
                        : selectedStatus === status
                        ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10 dark:border-brand-500 cursor-pointer"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 cursor-pointer"
                    }`}
                  >
                    <input
                      type="radio"
                      name="status"
                      value={status}
                      checked={selectedStatus === status}
                      onChange={(e) => setSelectedStatus(e.target.value as UpdateShipmentStatusPayload["stepName"])}
                      className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-0 focus:ring-offset-0 focus:outline-none"
                      disabled={isSubmitting || isDisabled}
                    />
                    <span className={`ml-3 text-sm font-medium ${
                      isDisabled 
                        ? "text-gray-400 dark:text-gray-500" 
                        : "text-gray-700 dark:text-gray-300"
                    }`}>
                      {status}
                      {isDisabled && (
                        <span className="ml-2 text-xs text-gray-400 dark:text-gray-500 italic">
                          (cannot go back)
                        </span>
                      )}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

         

          <div className="flex items-center justify-end gap-3">
            <Button
              type="button"
              size="sm"
              variant="outline"
              onClick={handleClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={isSubmitting || !selectedStatus}
            >
              {isSubmitting ? "Updating..." : "Update Status"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

