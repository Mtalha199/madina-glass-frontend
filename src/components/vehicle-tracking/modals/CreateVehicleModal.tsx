"use client";

import React, { useEffect, useCallback, useMemo, useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import { FormField, TextInput, SelectInput } from "../utils/formFields";
import { useZodForm } from "../hooks/useZodForm";
import Toast from "@/components/ui/toast/Toast";
import {
  createVehicleSchema,
  CreateVehicleFormData,
  CustomerType,
  customerTypeOptions,
  zambianRouteOptions,
  zimbabweRouteOptions,
  drcRouteOptions,
  zambianCityOptions,
  zimbabweDestinationOptions,
  getDefaultRouteForCustomerType,
  CustomerTypeValue,
  Route,
} from "../utils/schemas";
import { VehicleIcon } from "@/icons";

interface CreateVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (vehicleData: {
    referenceNumber: string;
    customerType: string;
    route: string;
    finalDestination: string;
    city?: string;
    dhlTrackingNumber?: string;
    shipmentNumber?: string;
  }) => void | Promise<void>;
  isSaving?: boolean;
}

const initialFormValues: CreateVehicleFormData = {
  referenceNumber: "",
  customerType: CustomerType.ZAMBIAN_IMPORT,
  route: "NAKONDE",
  finalDestination: "",
  city: "",
  dhlTrackingNumber: "",
  shipmentNumber: "",
};

const CreateVehicleModal: React.FC<CreateVehicleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  isSaving = false,
}) => {
  const {
    values,
    errors,
    setValue,
    validate,
    reset,
  } = useZodForm({
    initialValues: initialFormValues,
    schema: createVehicleSchema,
  });

  const [apiError, setApiError] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  // Reset form when modal opens - single effect
  useEffect(() => {
    if (isOpen) {
      reset();
      setApiError(null);
      setToastVisible(false);
    }
  }, [isOpen, reset]);

  // Memoize route options based on customer type
  const routeOptions = useMemo(() => {
    switch (values.customerType) {
      case CustomerType.ZIMBABWE_TRANSIT:
        return zimbabweRouteOptions;
      case CustomerType.DRC:
        return drcRouteOptions;
      default:
        return zambianRouteOptions;
    }
  }, [values.customerType]);

  // Memoize final destination input based on customer type
  const FinalDestinationInput = useMemo(() => {
    const commonProps = {
      id: "finalDestination",
      value: values.finalDestination,
      onChange: (value: string) => setValue("finalDestination", value),
      error: !!errors.finalDestination,
    };

    if (values.customerType === CustomerType.ZAMBIAN_IMPORT) {
      return (
        <SelectInput
          {...commonProps}
          options={zambianCityOptions}
          placeholder="Select final destination"
        />
      );
    }
    
    if (values.customerType === CustomerType.ZIMBABWE_TRANSIT) {
      return (
        <SelectInput
          {...commonProps}
          options={zimbabweDestinationOptions}
          placeholder="Select final destination"
        />
      );
    }
    
    return (
      <TextInput
        {...commonProps}
        placeholder="Enter final destination"
      />
    );
  }, [values.customerType, values.finalDestination, errors.finalDestination, setValue]);

  // Optimized customer type change handler
  const handleCustomerTypeChange = useCallback(
    (newCustomerType: string) => {
      const customerType = newCustomerType as CustomerTypeValue;
      const defaultRoute = getDefaultRouteForCustomerType(customerType);
      
      // Batch updates to reduce re-renders
      setValue("customerType", customerType);
      setValue("route", defaultRoute);
      setValue("finalDestination", "");
    },
    [setValue]
  );

  // Optimized submit handler
  const handleSubmit = useCallback(async () => {
    if (!validate()) return;
    
    setApiError(null);
    
    try {
      await onSave({
        referenceNumber: values.referenceNumber,
        customerType: values.customerType,
        route: values.route,
        finalDestination: values.finalDestination,
        city: values.city,
        dhlTrackingNumber: values.dhlTrackingNumber,
        shipmentNumber: values.shipmentNumber,
      });
      reset();
      onClose();
    } catch (error: any) {
      const errorMessage = 
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create vehicle. Please try again.";
      
      setApiError(errorMessage);
      setToastVisible(true);
    }
  }, [validate, values, onSave, reset, onClose]);

  // Optimized cancel handler
  const handleCancel = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  // Memoized form change handlers to prevent recreation
  const handleReferenceNumberChange = useCallback(
    (value: string) => setValue("referenceNumber", value),
    [setValue]
  );

  const handleRouteChange = useCallback(
    (value: string) => setValue("route", value as typeof Route[keyof typeof Route]),
    [setValue]
  );

  const handleDhlTrackingChange = useCallback(
    (value: string) => setValue("dhlTrackingNumber", value),
    [setValue]
  );

  const handleShipmentNumberChange = useCallback(
    (value: string) => setValue("shipmentNumber", value),
    [setValue]
  );

  return (
    <>
      <Modal isOpen={isOpen} onClose={handleCancel} className="max-w-[600px] p-5 lg:p-10">
        {/* Modal Header */}
        <div className="mb-6">
          <div className="flex items-start gap-4 mb-3">
            <div className="flex items-center justify-center w-12 h-12 bg-brand-500 rounded-xl shrink-0">
              <VehicleIcon className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h4 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-1">
                Create New Vehicle
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Add a new vehicle to the tracking system.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form 
          className="flex flex-col" 
          onSubmit={(e) => { 
            e.preventDefault(); 
            handleSubmit(); 
          }}
        >
          {/* API Error Message */}
          {apiError && (
            <div className="mb-5 p-4 text-sm text-error-800 bg-error-50 border border-error-200 rounded-lg dark:bg-error-900/20 dark:text-error-400 dark:border-error-800">
              {apiError}
            </div>
          )}

          {/* Scrollable Form Content */}
          <div className="overflow-y-auto max-h-[60vh] pr-2 -mr-2 space-y-5">
            <FormField label="Reference Number" error={errors.referenceNumber} required>
              <TextInput
                id="referenceNumber"
                value={values.referenceNumber}
                onChange={handleReferenceNumberChange}
                placeholder="Enter reference number"
                error={!!errors.referenceNumber}
              />
            </FormField>

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
                onChange={handleRouteChange}
                options={routeOptions}
                placeholder="Select route"
                error={!!errors.route}
              />
            </FormField>

            <FormField label="Final Destination" error={errors.finalDestination} required>
              {FinalDestinationInput}
            </FormField>

            <FormField label="DHL Tracking Number" error={errors.dhlTrackingNumber}>
              <TextInput
                id="dhlTrackingNumber"
                value={values.dhlTrackingNumber || ""}
                onChange={handleDhlTrackingChange}
                placeholder="Enter DHL tracking number"
                error={!!errors.dhlTrackingNumber}
              />
            </FormField>

            <FormField label="Vessel Number" error={errors.shipmentNumber}>
              <TextInput
                id="shipmentNumber"
                value={values.shipmentNumber || ""}
                onChange={handleShipmentNumberChange}
                placeholder="Enter Vessel number"
                error={!!errors.shipmentNumber}
              />
            </FormField>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-end w-full gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <Button
              size="sm"
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
              type="button"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              variant="primary"
              onClick={handleSubmit}
              disabled={isSaving}
              type="submit"
            >
              {isSaving ? "Creating..." : "Create Vehicle"}
            </Button>
          </div>
        </form>
      </Modal>
          
      <Toast
        message={apiError || ""}
        type="error"
        isVisible={toastVisible}
        onClose={() => setToastVisible(false)}
      />
    </>
  );
};

export default CreateVehicleModal;