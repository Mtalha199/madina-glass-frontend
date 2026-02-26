import apiClient from "./config";
import { ApiVehicle, VehiclesResponse } from "@/components/vehicle-tracking/types";

/**
 * Search API Service
 * Follows the project architecture pattern from auth.ts, users.ts, roles.ts
 */
export const searchApi = {
  /**
   * Search vehicles by Reference Number
   * GET /search/vehicles?query=ABC123
   *
   * @param query - Search text (searches in Reference Number field only, partial match, case-insensitive)
   * @returns Promise<ApiVehicle[]> - Array of matching vehicles
   */
  searchVehicles: async (query: string): Promise<ApiVehicle[]> => {
    const response = await apiClient.get<VehiclesResponse>(
      "/search/vehicles",
      {
        params: { query },
      }
    );

    // Extract vehicles array from wrapped response following the alignment guide
    // The response structure is: { success: boolean, data: { vehicles: ApiVehicle[], meta: VehiclesMeta }, message: string }
    return response.data.data.vehicles;
  },
};

