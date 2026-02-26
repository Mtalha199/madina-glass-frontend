"use client";

import { useState } from "react";
import { VehicleCardData, transformVehicle } from "../../types";
import { fetchVehicleById } from "../../services/vehicleApi";

interface UseVehicleDetailReturn {
  vehicle: VehicleCardData | null;
  isLoading: boolean;
  error: string | null;
  createdAt: string;
  updatedAt: string;
  loadVehicle: () => Promise<void>;
  updateVehicle: (updated: VehicleCardData) => void;
  updateTimestamps: (createdAt: string, updatedAt: string) => void;
}

/**
 * Custom hook for managing vehicle detail state and data loading
 */
export const useVehicleDetail = (vehicleId: string): UseVehicleDetailReturn => {
  const [vehicle, setVehicle] = useState<VehicleCardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [createdAt, setCreatedAt] = useState<string>("");
  const [updatedAt, setUpdatedAt] = useState<string>("");

  async function loadVehicle() {
    try {
      setIsLoading(true);
      setError(null);
      
      // Fetch vehicle data from API
      const response = await fetchVehicleById(Number(vehicleId));

      if (response.success) {
        // Transform API data to VehicleCardData format
        const transformed = transformVehicle(response.data);
        
        setVehicle(transformed);
        setCreatedAt(response.data.createdAt);
        setUpdatedAt(response.data.updatedAt);
      } else {
        setError(response.message || "Failed to fetch vehicle");
        setVehicle(null);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while loading vehicle"
      );
      setVehicle(null);
    } finally {
      setIsLoading(false);
    }
  }

  function updateVehicle(updated: VehicleCardData) {
    setVehicle(updated);
  }

  function updateTimestamps(newCreatedAt: string, newUpdatedAt: string) {
    setCreatedAt(newCreatedAt);
    setUpdatedAt(newUpdatedAt);
  }

  return {
    vehicle,
    isLoading,
    error,
    createdAt,
    updatedAt,
    loadVehicle,
    updateVehicle,
    updateTimestamps,
  };
};

