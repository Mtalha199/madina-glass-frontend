import { useState, useEffect, useRef } from "react";
import { fetchVehicles, VehicleFilters as ApiVehicleFilters } from "../services/vehicleApi";
import { VehicleCardData, transformVehicles, VehiclesMeta } from "../types";

interface UseVehiclesState {
  vehicles: VehicleCardData[];
  meta: VehiclesMeta | null;
  isLoading: boolean;
  error: string | null;
}

interface UseVehiclesReturn extends UseVehiclesState {
  refetch: () => void;
}

/**
 * Custom hook for fetching and managing vehicles data
 */
export const useVehicles = (filters?: ApiVehicleFilters): UseVehiclesReturn => {
  const [vehicles, setVehicles] = useState<VehicleCardData[]>([]);
  const [meta, setMeta] = useState<VehiclesMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchTrigger, setFetchTrigger] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    let isMounted = true;
    
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    
    const load = async () => {
      try {
        const response = await fetchVehicles(filters, abortController.signal);
        
        if (!isMounted || abortController.signal.aborted) return;
        
        if (response.success && response.data) {
          // Handle new response structure with vehicles array and meta
          const vehiclesData = response.data.vehicles || [];
          const metaData = response.data.meta || null;
          
          setVehicles(transformVehicles(vehiclesData));
          setMeta(metaData);
          setError(null);
        } else {
          setVehicles([]);
          setMeta(null);
          setError(response.message || "Failed to fetch vehicles");
        }
      } catch (err: any) {
        // Ignore abort errors
        if (err?.name === 'AbortError' || abortController.signal.aborted) {
          return;
        }
        
        if (!isMounted) return;
        
        setVehicles([]);
        setMeta(null);
        setError(
          err instanceof Error 
            ? err.message 
            : "An unexpected error occurred while fetching vehicles"
        );
      } finally {
        if (isMounted && !abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    setIsLoading(true);
    setError(null);
    load();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [fetchTrigger, filters]);

  function refetch() {
    setFetchTrigger((prev) => prev + 1);
  }

  return {
    vehicles,
    meta,
    isLoading,
    error,
    refetch,
  };
};

export default useVehicles;
