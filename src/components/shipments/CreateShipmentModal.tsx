"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import { FormField, TextInput } from "../vehicle-tracking/utils/formFields";
import { createShipment } from "../vehicle-tracking/services/vehicleApi";

interface CreateShipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (shipmentNumber: string) => void;
}

export default function CreateShipmentModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateShipmentModalProps) {
  const [shipmentNumber, setShipmentNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setShipmentNumber("");
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedShipmentNumber = shipmentNumber.trim();

    if (!trimmedShipmentNumber) {
      setError("Shipment number is required");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await createShipment({
        shipmentNumber: trimmedShipmentNumber,
      });

      if (response.success) {
        onSuccess?.(response.data.shipmentNumber);
        onClose();
      } else {
        setError(response.message || "Failed to create shipment");
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to create shipment. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
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
          Create Vessel
        </h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
          Add a new Vessel to the system.
        </p>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 rounded-lg bg-error-50 border border-error-200 dark:bg-error-500/10 dark:border-error-500/30">
              <p className="text-sm text-error-700 dark:text-error-400">{error}</p>
            </div>
          )}

          <div className="mb-6">
            <FormField label="Vessel Number" required>
              <TextInput
                id="shipmentNumber"
                value={shipmentNumber}
                onChange={(value) => setShipmentNumber(value)}
                placeholder="Enter Vessel number"
                error={!!error}
                disabled={isSubmitting}
              />
            </FormField>
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
              disabled={isSubmitting || !shipmentNumber.trim()}
            >
              {isSubmitting ? "Creating..." : "Create Vessel"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
