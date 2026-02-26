"use client";

import React, { useEffect, useRef, useMemo, useCallback, useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { FormField, TextInput, SelectInput } from "../utils/formFields";
import { useZodForm } from "../hooks/useZodForm";
import {
  issueUpgradeSchema,
  IssueUpgradeFormData,
  CustomerType,
  customerTypeOptions,
  zambianRouteOptions,
  zimbabweRouteOptions,
  drcRouteOptions,
  zimbabweDestinationOptions,
  zambianCityOptions,
  getDefaultRouteForCustomerType,
  CustomerTypeValue,
  Route,
} from "../utils/schemas";
import { adminInitiateUpgrade } from "../services/vehicleApi";
import Toast from "@/components/ui/toast/Toast";

interface Vehicle {
  referenceNumber: string;
  id: string;
  status: string;
  route: string;
  destination: string;
  city?: string;
}

interface EditVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  vehicle: Vehicle | null;
  onSave: (vehicleData?: {
    referenceNumber: string;
    customerType: string;
    route: string;
    finalDestination: string;
    city?: string;
  }) => void | Promise<void>;
  isSaving?: boolean;
}

const initialFormValues: IssueUpgradeFormData = {
  customerType: CustomerType.ZAMBIAN_IMPORT,
  route: "NAKONDE",
  finalDestination: "",
  city: "",
  price: "",
};

// Helper to map status to customer type (moved outside component)
const mapStatusToCustomerType = (status: string): CustomerTypeValue => {
  if (status === "Zimbabwe Transit") return CustomerType.ZIMBABWE_TRANSIT;
  if (status === "DRC") return CustomerType.DRC;
  return CustomerType.ZAMBIAN_IMPORT;
};

const ACCEPTED_FILE_TYPES = "application/pdf,image/*";
const MAX_FILE_SIZE_MB = 10;

const IssueUpgradeRequestModal: React.FC<EditVehicleModalProps> = ({
  isOpen,
  onClose,
  vehicle,
  onSave,
  isSaving = false,
}) => {
  const {
    values,
    errors,
    setValue,
    validate,
    reset,
    setFormValues,
  } = useZodForm({
    initialValues: initialFormValues,
    schema: issueUpgradeSchema,
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: "success" | "error"; isVisible: boolean }>({
    message: "",
    type: "success",
    isVisible: false,
  });
  const previousVehicleIdRef = useRef<string | null>(null);

  // Memoize route options based on customer type
  const routeOptions = useMemo(() => {
    switch (values.customerType) {
      case CustomerType.ZAMBIAN_IMPORT:
        return zambianRouteOptions;
      case CustomerType.ZIMBABWE_TRANSIT:
        return zimbabweRouteOptions;
      case CustomerType.DRC:
        return drcRouteOptions;
      default:
        return zambianRouteOptions;
    }
  }, [values.customerType]);

  // Memoize destination field component
  const destinationField = useMemo(() => {
    if (values.customerType === CustomerType.ZAMBIAN_IMPORT) {
      return (
        <SelectInput
          id="finalDestination"
          value={values.finalDestination}
          onChange={(value) => setValue("finalDestination", value)}
          options={zambianCityOptions}
          placeholder="Select final destination"
          error={!!errors.finalDestination}
        />
      );
    }
    
    if (values.customerType === CustomerType.ZIMBABWE_TRANSIT) {
      return (
        <SelectInput
          id="finalDestination"
          value={values.finalDestination}
          onChange={(value) => setValue("finalDestination", value)}
          options={zimbabweDestinationOptions}
          placeholder="Select final destination"
          error={!!errors.finalDestination}
        />
      );
    }
    
    return (
      <TextInput
        id="finalDestination"
        value={values.finalDestination}
        onChange={(value) => setValue("finalDestination", value)}
        placeholder="Enter final destination"
        error={!!errors.finalDestination}
      />
    );
  }, [values.customerType, values.finalDestination, errors.finalDestination, setValue]);

  // Initialize form when vehicle changes - single useEffect
  useEffect(() => {
    if (!isOpen || !vehicle) {
      if (!isOpen && previousVehicleIdRef.current) {
        previousVehicleIdRef.current = null;
      }
      return;
    }

    // Only update if vehicle ID changed
    if (previousVehicleIdRef.current === vehicle.id) {
      return;
    }

    const customerType = mapStatusToCustomerType(vehicle.status);
    const route = getDefaultRouteForCustomerType(customerType);

    // Batch state update in one call
    setFormValues({
      customerType,
      route,
      finalDestination: vehicle.destination,
      city: vehicle.city || "",
      price: "",
    });
    setSelectedFile(null);
    setFileError(null);
    previousVehicleIdRef.current = vehicle.id;
  }, [isOpen, vehicle, setFormValues]);

  // Memoized handlers
  const handleCustomerTypeChange = useCallback((newCustomerType: string) => {
    const customerType = newCustomerType as CustomerTypeValue;
    const defaultRoute = getDefaultRouteForCustomerType(customerType);
    
    // Batch updates together
    setFormValues({
      customerType,
      route: defaultRoute,
      finalDestination: "",
      city: values.city,
    });
  }, [setFormValues, values.city]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
    const isImage = file.type.startsWith("image/");
    if (!isPdf && !isImage) {
      setFileError("Please upload a PDF or image file.");
      setSelectedFile(null);
      return;
    }
    if (file.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setFileError(`File must be under ${MAX_FILE_SIZE_MB}MB.`);
      setSelectedFile(null);
      return;
    }
    setFileError(null);
    setSelectedFile(file);
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!vehicle) return;
    if (!validate()) return;

    const formData = new FormData();
    formData.append("customerType", values.customerType);
    formData.append("price", values.price.trim());
    if (values.route) formData.append("route", values.route);
    if (values.finalDestination) formData.append("finalDestination", values.finalDestination);
    if (selectedFile) formData.append("invoice", selectedFile);

    try {
      setIsSubmitting(true);
      await adminInitiateUpgrade(Number(vehicle.id), formData);
      reset();
      setSelectedFile(null);
      setFileError(null);
      setToast({ message: "Upgrade request issued successfully", type: "success", isVisible: true });
      onSave();
      onClose();
    } catch (err) {
      console.error("Error issuing upgrade request:", err);
    } finally {
      setIsSubmitting(false);
    }
  }, [vehicle, validate, onSave, values, reset, onClose, selectedFile]);

  const handleCancel = useCallback(() => {
    reset();
    setSelectedFile(null);
    setFileError(null);
    onClose();
  }, [reset, onClose]);

  const handleFormSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  }, [handleSubmit]);

  if (!vehicle) return null;

  return (
    <>
    <Modal isOpen={isOpen} onClose={handleCancel} className="max-w-[600px] p-5 lg:p-10">
      {/* Modal Header */}
      <div className="mb-6">
        <h4 className="text-xl font-bold text-gray-800 dark:text-white/90 mb-1">
          Create Service Extension
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span>REF:</span> 
          <span className="bg-brand-500 text-white px-4 py-0.5 rounded-full ml-2">
            {vehicle.referenceNumber}
          </span>
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={handleFormSubmit}>
        <fieldset className="space-y-5" disabled={isSaving || isSubmitting} aria-busy={isSaving || isSubmitting}>
        <FormField label="Customer Type" error={errors.customerType} required>
          <SelectInput
            id="customerType"
            value={values.customerType}
            onChange={handleCustomerTypeChange}
            options={customerTypeOptions}
            placeholder="Select customer type"
            error={!!errors.customerType}
          />
        </FormField>

        <FormField label="Route" error={errors.route} required>
          <SelectInput
            id="route"
            value={values.route}
            onChange={(value) => setValue("route", value as typeof Route[keyof typeof Route])}
            options={routeOptions}
            placeholder="Select route"
            error={!!errors.route}
          />
        </FormField>

        <FormField label="Final Destination" error={errors.finalDestination} required>
          {destinationField}
        </FormField>

        <FormField label="Price" error={errors.price} required>
          <TextInput
            id="price"
            type="text"
            value={values.price}
            onChange={(v) => setValue("price", v)}
            placeholder="Enter price"
            error={!!errors.price}
          />
        </FormField>

        <FormField label="Document (invoice)" error={fileError || undefined} hint="Image or PDF, optional">
          <div className="flex items-center gap-2">
            <input
              type="file"
              accept={ACCEPTED_FILE_TYPES}
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-600 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-medium file:bg-brand-500 file:text-white hover:file:bg-brand-600"
            />
            {selectedFile && (
              <span className="text-sm text-gray-600 dark:text-gray-400 truncate max-w-[180px]" title={selectedFile.name}>
                {selectedFile.name}
              </span>
            )}
          </div>
        </FormField>

        </fieldset>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end w-full gap-3 mt-8">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving || isSubmitting}
            type="button"
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="primary"
            type="submit"
            disabled={isSaving || isSubmitting}
          >
            {(isSaving || isSubmitting) && (
              <svg
                className="animate-spin -ml-1 mr-2 h-3.5 w-3.5 text-current"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
            {isSaving || isSubmitting ? "Updating..." : "Update Vehicle"}
          </Button>
        </div>
      </form>
    </Modal>
    <Toast
      message={toast.message}
      type={toast.type}
      isVisible={toast.isVisible}
      onClose={() => setToast((t) => ({ ...t, isVisible: false }))}
    />
    </>
  );
};

export default IssueUpgradeRequestModal;