"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { vehicleApi } from "@/lib/api/vehicle";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import Input from "@/components/form/input/InputField";
import FileInput from "@/components/form/input/FileInput";
import Label from "@/components/form/Label";
import { processImageForUpload } from "@/lib/utils/imageCompression";

interface RequestPaymentButtonProps {
  vehicleId: string;
  onPaymentSuccess?: () => void;
}

export default function RequestPaymentButton({ vehicleId, onPaymentSuccess }: RequestPaymentButtonProps) {
  const router = useRouter();
  const [price, setPrice] = useState<string>("");
  const [invoice, setInvoice] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [priceError, setPriceError] = useState<string | null>(null);
  const [invoiceError, setInvoiceError] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);

  const {
    isOpen: isModalOpen,
    openModal: openModal,
    closeModal: closeModal,
  } = useModal();

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check if it's a PDF (allow PDFs without compression)
      const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
      
      if (isPdf) {
        // For PDFs, set directly without compression
        setInvoice(file);
        setInvoiceError(null);
      } else {
        // For images, compress and validate
        const result = await processImageForUpload(file, {
        maxSizeBytes: 1024 * 1024, // 1MB
        preferQuality: true, // Balance between quality and size
        maintainAspectRatio: true
      });
        
        if (!result.success) {
          setInvoiceError(result.error || "Failed to process image");
          return;
        }
        
        setInvoice(result.file!);
        setInvoiceError(null);
      }
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;
    setPriceError(null);
    setInvoiceError(null);

    // Validate price
    if (!price || price.trim() === "") {
      setPriceError("Price is required");
      isValid = false;
    } else {
      const priceNum = parseFloat(price);
      if (isNaN(priceNum) || priceNum <= 0) {
        setPriceError("Price must be a valid positive number");
        isValid = false;
      }
    }

    // Invoice file is optional, no validation needed

    return isValid;
  };

  const submitPayment = async () => {
    setError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      await vehicleApi.requestPayment(vehicleId, {
        price: parseFloat(price),
        invoice: invoice || undefined,
      });

      // Reset form and close modal
      setPrice("");
      setInvoice(null);
      closeModal();

      // Refresh vehicle data
      if (onPaymentSuccess) {
        onPaymentSuccess();
      } else {
        // Fallback to router refresh if callback not provided
        router.refresh();
      }
    } catch (err: any) {
      console.error("Failed to request payment:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to request payment. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitPayment();
  };

  const handleClose = () => {
    setPrice("");
    setInvoice(null);
    setError(null);
    setPriceError(null);
    setInvoiceError(null);
    // Reset file input by changing key
    setFileInputKey((prev) => prev + 1);
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
      <Button
        variant="primary"
        size="sm"
        onClick={openModal}
      >
        Issue an invoice for payment
      </Button>

      {/* Request Payment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleClose}
        className="max-w-[584px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[584px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Request Payment
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Please provide the payment details and upload the invoice.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              {/* Price Field */}
              <div className="mb-4">
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setPriceError(null);
                    setError(null);
                  }}
                  disabled={isSubmitting}
                  error={!!priceError}
                  required
                  min="0"
                  step={0.01}
                />
                {priceError && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                    {priceError}
                  </p>
                )}
              </div>

              {/* Invoice File Field */}
              <div className="mb-4">
                <Label htmlFor="invoice">Invoice</Label>
                <FileInput
                  key={fileInputKey}
                  accept="image/jpeg,image/jpg,image/png,application/pdf"
                  onChange={handleFileChange}
                  className={invoiceError ? "border-red-500" : ""}
                />
                {invoice && (
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Selected: {invoice.name}
                  </p>
                )}
                {invoiceError && (
                  <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                    {invoiceError}
                  </p>
                )}
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
                onClick={submitPayment}
                disabled={isSubmitting}
                type="submit"
              >
                {isSubmitting ? <Spinner color="text-white" /> : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}

