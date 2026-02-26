"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { vehicleApi } from "@/lib/api/vehicle";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";

interface VerifyPaymentModalProps {
  vehicleId: string;
  onPaymentVerified?: () => void;
  autoOpen?: boolean;
  showButton?: boolean;
}

export default function VerifyPaymentModal({ vehicleId, onPaymentVerified, autoOpen = false, showButton = true }: VerifyPaymentModalProps) {
  const router = useRouter();
  const [isReceived, setIsReceived] = useState<boolean>(true);
  const [notes, setNotes] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    isOpen: isModalOpen,
    openModal: openModal,
    closeModal: closeModal,
  } = useModal();

  // Auto-open modal if autoOpen prop is true
  useEffect(() => {
    if (autoOpen && !isModalOpen) {
      openModal();
    }
  }, [autoOpen, isModalOpen, openModal]);

  const validateForm = (): boolean => {
    setError(null);
    // isReceived is always required (boolean), notes is optional
    return true;
  };

  const submitVerification = async () => {
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await vehicleApi.verifyPayment(vehicleId, {
        isReceived,
        notes: notes.trim() || undefined,
      });

      // Reset form and close modal
      setNotes("");
      setIsReceived(true);
      closeModal();

      // Refresh vehicle data
      if (onPaymentVerified) {
        onPaymentVerified();
      } else {
        // Fallback to router refresh if callback not provided
        router.refresh();
      }
    } catch (err: any) {
      console.error("Failed to verify payment:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to verify payment. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitVerification();
  };

  const handleClose = () => {
    setNotes("");
    setIsReceived(true);
    setError(null);
    closeModal();
  };

  const Spinner = ({ color = "text-white" }: { color?: string }) => (
    <svg
      className={`animate-spin h-3.5 w-3.5 ${color}`}
      xmlns="http://www.w3.org/2000/svg"
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
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  return (
    <>
      {showButton && (
        <Button
          variant="primary"
          size="sm"
          onClick={openModal}
        >
          Verify Payment
        </Button>
      )}

      {/* Verify Payment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        className="max-w-[584px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[584px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Verify Payment
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Confirm whether the payment has been received and add any additional notes.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              {/* Payment Received Status */}
              <div className="mb-4">
                <Label htmlFor="isReceived">Payment Status *</Label>
                <div className="flex items-center gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isReceived"
                      checked={isReceived === true}
                      onChange={() => setIsReceived(true)}
                      disabled={isSubmitting}
                      className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Payment Received
                    </span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="isReceived"
                      checked={isReceived === false}
                      onChange={() => setIsReceived(false)}
                      disabled={isSubmitting}
                      className="w-4 h-4 text-brand-500 border-gray-300 focus:ring-brand-500"
                    />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Payment Not Received
                    </span>
                  </label>
                </div>
              </div>

              {/* Notes Field */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <Label htmlFor="notes">Notes (Optional)</Label>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {notes.length}/500
                  </span>
                </div>
                <TextArea
                  id="notes"
                  placeholder="Add any additional notes about the payment verification"
                  value={notes}
                  onChange={(value) => {
                    setNotes(value);
                    setError(null);
                  }}
                  disabled={isSubmitting}
                  rows={4}
                  maxLength={500}
                />
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-4 rounded-lg bg-red-50 p-3 dark:bg-red-500/10">
                  <p className="text-sm text-red-500 dark:text-red-400">{error}</p>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={handleClose}
                disabled={isSubmitting}
                type="button"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={submitVerification}
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? <Spinner color="text-white" /> : "Verify Payment"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

