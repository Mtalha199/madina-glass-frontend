/**
 * Hook for fetching and managing vehicle detail data
 */

import { useState, useEffect } from "react";
import apiClient from "@/lib/api/config";
import { ApiVehicleData, ApiResponse } from "../types";

interface UseVehicleDetailDataReturn {
    vehicleData: ApiVehicleData | null;
    isLoading: boolean;
    error: string | null;
    refetchVehicle: () => Promise<void>;
}

export const useVehicleDetailData = (vehicleId?: string): UseVehicleDetailDataReturn => {
    const [vehicleData, setVehicleData] = useState<ApiVehicleData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVehicle = async () => {
        if (!vehicleId) {
            setIsLoading(false);
            return;
        }

        try {
            setIsLoading(true);
            setError(null);
            const response = await apiClient.get<ApiResponse>(`/vehicle/${vehicleId}`);

            if (response.data.success) {
                setVehicleData(response.data.data);
            } else {
                setError(response.data.message || "Failed to fetch vehicle data");
            }
        } catch (err: any) {
            console.error("Error fetching vehicle:", err);
            setError(err.response?.data?.message || "Failed to fetch vehicle data");
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchVehicle();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [vehicleId]);

    return {
        vehicleData,
        isLoading,
        error,
        refetchVehicle: fetchVehicle,
    };
};

