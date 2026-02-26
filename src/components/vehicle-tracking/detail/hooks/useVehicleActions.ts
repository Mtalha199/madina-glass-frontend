"use client";

import { useState } from "react";
import { VehicleCardData, transformVehicle } from "../../types";
import { TimelineStep } from "../../timeline";
import { EditVehicle } from "../types";
import { updateVehicle, updateTimelineStep } from "../../services/vehicleApi";

interface UseVehicleActionsReturn {
  isEditingVehicle: boolean;
  isUpdatingStep: boolean;
  selectedVehicle: EditVehicle | null;
  selectedStep: TimelineStep | null;
  setSelectedVehicle: (vehicle: EditVehicle | null) => void;
  setSelectedStep: (step: TimelineStep | null) => void;
  handleSaveEditVehicle: (
    vehicle: VehicleCardData,
    vehicleData: {
      referenceNumber: string;
      customerType: string;
      route: string;
      finalDestination: string;
      city?: string;
    },
    currentCreatedAt: string,
    onUpdate: (updated: VehicleCardData) => void,
    onUpdateTimestamps: (createdAt: string, updatedAt: string) => void
  ) => Promise<void>;
  handleSaveStepUpdate: (
    vehicle: VehicleCardData,
    stepId: string,
    status: TimelineStep["status"],
    notes: string,
    currentCreatedAt: string,
    onUpdate: (updated: VehicleCardData) => void,
    onUpdateTimestamps: (createdAt: string, updatedAt: string) => void
  ) => Promise<void>;
}

/**
 * Custom hook for managing vehicle edit and timeline update actions
 */
export const useVehicleActions = (): UseVehicleActionsReturn => {
  const [isEditingVehicle, setIsEditingVehicle] = useState(false);
  const [isUpdatingStep, setIsUpdatingStep] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<EditVehicle | null>(null);
  const [selectedStep, setSelectedStep] = useState<TimelineStep | null>(null);

  async function handleSaveEditVehicle(
    vehicle: VehicleCardData,
    vehicleData: {
      referenceNumber: string;
      customerType: string;
      route: string;
      finalDestination: string;
      city?: string;
    },
    currentCreatedAt: string,
    onUpdate: (updated: VehicleCardData) => void,
    onUpdateTimestamps: (createdAt: string, updatedAt: string) => void
  ) {
    setIsEditingVehicle(true);
    try {
      // Prepare payload matching API structure
      const payload: {
        customerType: "ZAMBIAN_IMPORT" | "ZIMBABWE_TRANSIT";
        route: "NAKONDE" | "CHIRUNDU";
        finalDestination: string;
        city?: string;
      } = {
        customerType: vehicleData.customerType as "ZAMBIAN_IMPORT" | "ZIMBABWE_TRANSIT",
        route: vehicleData.route as "NAKONDE" | "CHIRUNDU",
        finalDestination: vehicleData.finalDestination,
      };

      // Only include city if it's provided and not empty
      if (vehicleData.city && vehicleData.city.trim()) {
        payload.city = vehicleData.city;
      }

      // Call API to update vehicle
      const response = await updateVehicle(vehicle.id, payload);

      // Verify response structure matches API
      if (response.success && response.data) {
        // Update timestamps from response
        onUpdateTimestamps(response.data.createdAt, response.data.updatedAt);
        // Transform and update vehicle data
        const transformed = transformVehicle(response.data);
        onUpdate(transformed);
      } else {
        throw new Error(response.message || "Failed to update vehicle");
      }
    } catch (error) {
      console.error("Failed to update vehicle:", error);
      throw error;
    } finally {
      setIsEditingVehicle(false);
      setSelectedVehicle(null);
    }
  }

  async function handleSaveStepUpdate(
    vehicle: VehicleCardData,
    stepId: string,
    status: TimelineStep["status"],
    notes: string,
    currentCreatedAt: string,
    onUpdate: (updated: VehicleCardData) => void,
    onUpdateTimestamps: (createdAt: string, updatedAt: string) => void
  ) {
    setIsUpdatingStep(true);
    try {
      // Prepare payload matching API structure
      const payload: {
        status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
        notes?: string;
      } = {
        status,
      };

      // Only include notes if it's provided and not empty
      if (notes && notes.trim()) {
        payload.notes = notes.trim();
      }

      // Call API to update timeline step
      const response = await updateTimelineStep(Number(stepId), payload);

      // Verify response structure matches API
      if (response.success && response.data) {
        // Note: Vehicle data will be reloaded by the parent component after this call
        // The response contains the updated step data if needed in the future
      } else {
        throw new Error(response.message || "Failed to update timeline step");
      }
    } catch (error) {
      console.error("Failed to update step:", error);
      throw error;
    } finally {
      setIsUpdatingStep(false);
      setSelectedStep(null);
    }
  }

  return {
    isEditingVehicle,
    isUpdatingStep,
    selectedVehicle,
    selectedStep,
    setSelectedVehicle,
    setSelectedStep,
    handleSaveEditVehicle,
    handleSaveStepUpdate,
  };
};

