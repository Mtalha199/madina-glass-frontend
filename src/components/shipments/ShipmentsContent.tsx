"use client";
import { useState, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { Table, TableBody } from "../ui/table";
import Pagination from "../tables/Pagination";
import { Vehicle } from "./types";
import VehicleTableHeader from "./VehicleTableHeader";
import VehicleTableRow from "./VehicleTableRow";
import VehicleFilters, { Filters } from "./VehicleFilters";
import { mapApiVehicleToVehicle } from "./mappers";
import ResourceNotFound from "../common/ResourceNotFound";
import Toast from "../ui/toast/Toast";
import type { VehicleFilters as ApiVehicleFilters } from "../vehicle-tracking/services/vehicleApi";
import type { VehiclesMeta } from "../vehicle-tracking/types";
import Skeleton from "../ui/skeleton/Skeleton";

export default function ShipmentsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  const [openDropdownId, setOpenDropdownId] = useState<number | null>(null);
  
  // Get current page from URL, with state fallback for immediate updates
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [currentPageState, setCurrentPageState] = useState(pageFromUrl);
  
  // Sync state with URL when URL changes
  useEffect(() => {
    setCurrentPageState(pageFromUrl);
  }, [pageFromUrl]);
  
  const currentPage = currentPageState;
  const itemsPerPage = 10;

  const [filters, setFilters] = useState<Filters>(() => ({
    status: (searchParams.get("status") as Filters["status"]) || "all",
    customerType: (searchParams.get("customerType") as Filters["customerType"]) || "all",
    route: (searchParams.get("route") as Filters["route"]) || "all",
    upgradeStatus: (searchParams.get("upgradeStatus") as Filters["upgradeStatus"]) || "all",
    search: searchParams.get("search") || undefined,
    dhlFilter: (searchParams.get("dhlFilter") as Filters["dhlFilter"]) || "all",
    shipmentFilter: (searchParams.get("shipmentFilter") as Filters["shipmentFilter"]) || "all",
    finalDestination: searchParams.get("finalDestination") || undefined,
  }));

  // Debounced search state (for API calls)
  const [debouncedFilters, setDebouncedFilters] = useState<Filters>(filters);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Fetch vehicles from API using the same endpoint as vehicle tracking page
  const [apiVehicles, setApiVehicles] = useState<Vehicle[]>([]);
  const [metadata, setMetadata] = useState<VehiclesMeta | null>(null);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [errorData, setErrorData] = useState<string | null>(null);
  
  // Toast state
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  // Debounce search input (500ms delay)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [filters]);

  // Update URL when debounced filters change (but not on initial mount)
  // Reset to page 1 when filters change
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const params = new URLSearchParams();
    const filterMap: Record<string, string | undefined> = {
      status: debouncedFilters.status !== "all" ? debouncedFilters.status : undefined,
      customerType: debouncedFilters.customerType !== "all" ? debouncedFilters.customerType : undefined,
      route: debouncedFilters.route !== "all" ? debouncedFilters.route : undefined,
      upgradeStatus: debouncedFilters.upgradeStatus !== "all" ? debouncedFilters.upgradeStatus : undefined,
      search: debouncedFilters.search,
      dhlFilter: debouncedFilters.dhlFilter !== "all" ? debouncedFilters.dhlFilter : undefined,
      shipmentFilter: debouncedFilters.shipmentFilter !== "all" ? debouncedFilters.shipmentFilter : undefined,
      finalDestination: debouncedFilters.finalDestination,
    };

    Object.entries(filterMap).forEach(([key, value]) => {
      if (value) params.set(key, value);
    });

    // Reset to page 1 when filters change
    params.set("page", "1");
    setCurrentPageState(1);

    const newUrl = `${pathname}?${params.toString()}`;
    const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
    
    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [debouncedFilters, pathname, router]);

  // Convert UI filters to API filters (use debounced filters for API calls)
  const apiFilters: ApiVehicleFilters | undefined = useMemo(() => {
    const apiFilters: ApiVehicleFilters = {};
    
    if (debouncedFilters.status && debouncedFilters.status !== "all") {
      const statusMap: Record<string, "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED"> = {
        "pending": "PENDING",
        "in-transit": "IN_PROGRESS",
        "delivered": "COMPLETED",
        "blocked": "BLOCKED"
      };
      apiFilters.vehicleStatus = statusMap[debouncedFilters.status];
    }
    
    if (debouncedFilters.customerType && debouncedFilters.customerType !== "all") {
      apiFilters.customerType = debouncedFilters.customerType as "ZAMBIAN_IMPORT" | "ZIMBABWE_TRANSIT" | "DRC";
    }
    
    if (debouncedFilters.route && debouncedFilters.route !== "all") {
      apiFilters.route = debouncedFilters.route;
    }
    
    if (debouncedFilters.upgradeStatus && debouncedFilters.upgradeStatus !== "all") {
      apiFilters.upgradeStatus = debouncedFilters.upgradeStatus as "NONE" | "PENDING" | "APPROVED" | "REJECTED";
    }
    
    if (debouncedFilters.search) apiFilters.search = debouncedFilters.search;
    if (debouncedFilters.dhlFilter && debouncedFilters.dhlFilter !== "all") apiFilters.dhlFilter = debouncedFilters.dhlFilter;
    if (debouncedFilters.shipmentFilter && debouncedFilters.shipmentFilter !== "all") apiFilters.shipmentFilter = debouncedFilters.shipmentFilter;
    if (debouncedFilters.finalDestination) apiFilters.finalDestination = debouncedFilters.finalDestination;
    
    return Object.keys(apiFilters).length > 0 ? apiFilters : undefined;
  }, [debouncedFilters]);

  // Add page to API filters for server-side pagination
  const apiFiltersWithPage: ApiVehicleFilters | undefined = useMemo(() => {
    if (!apiFilters) {
      return { page: currentPage, limit: itemsPerPage };
    }
    return { ...apiFilters, page: currentPage, limit: itemsPerPage };
  }, [apiFilters, currentPage]);

  useEffect(() => {
    // Cancel previous request if it exists
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    
    // Create new AbortController for this request
    const abortController = new AbortController();
    abortControllerRef.current = abortController;

    const fetchData = async () => {
      try {
        setIsLoadingData(true);
        setErrorData(null);
        const { fetchVehicles } = await import("../vehicle-tracking/services/vehicleApi");
        const response = await fetchVehicles(apiFiltersWithPage, abortController.signal);
        
        if (abortController.signal.aborted) return;
        
        if (response.success && response.data) {
          // Handle new response structure with vehicles array and meta
          const vehiclesData = response.data.vehicles || [];
          const metaData = response.data.meta || null;
          
          const mappedVehicles = vehiclesData.map(mapApiVehicleToVehicle);
          setApiVehicles(mappedVehicles);
          setMetadata(metaData);
        } else {
          setErrorData(response.message || "Failed to fetch vehicles");
          setApiVehicles([]);
          setMetadata(null);
        }
      } catch (err: any) {
        // Ignore abort errors
        if (err?.name === 'AbortError' || err?.code === 'ERR_CANCELED' || abortController.signal.aborted) {
          return;
        }
        
        setErrorData(err instanceof Error ? err.message : "An error occurred");
        setApiVehicles([]);
        setMetadata(null);
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoadingData(false);
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [apiFiltersWithPage]);

  // Use meta data for pagination (server-side)
  const totalPages = metadata?.totalPages || 1;
  const totalItems = metadata?.totalVehicles || 0;

  // Handle page change for server-side pagination
  function handlePageChange(page: number) {
    // Update state immediately for instant UI feedback
    setCurrentPageState(page);
    
    // Preserve all existing query parameters and update only the page
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // Use vehicles directly (already paginated by server)
  const paginatedVehicles = apiVehicles;

  const handleToggleDropdown = (vehicleId: number) => {
    setOpenDropdownId(openDropdownId === vehicleId ? null : vehicleId);
  };

  const handleCloseDropdown = () => {
    setOpenDropdownId(null);
  };

  const handleFilterChange = (newFilters: Filters) => {
    setFilters(newFilters);
    // Page reset is handled by the URL update effect
  };

  const handleResetFilters = () => {
    setFilters({
      status: "all",
      customerType: "all",
      route: "all",
      upgradeStatus: "all",
      search: undefined,
      dhlFilter: "all",
      shipmentFilter: "all",
      finalDestination: undefined,
    });
    // Page reset is handled by the URL update effect
  };

  const handleViewDetails = (id: number) => {
    console.log("View vehicle:", id);
  };

  const handleEdit = (id: number) => {
    console.log("Edit vehicle:", id);
  };

  const handleTrack = (id: number) => {
    console.log("Track vehicle:", id);
  };

  const handleDelete = (id: number) => {
    console.log("Delete vehicle:", id);
  };

  const handleUpdateShipmentNumber = (id: number, value: string, error?: string) => {
    if (error) {
      console.log("Setting error toast:", error);
      setToast({
        message: error || "An error occurred",
        type: "error",
        isVisible: true,
      });
    } else {
      setApiVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle.id === id
            ? { ...vehicle, shipmentNumber: value || null }
            : vehicle
        )
      );
      setToast({
        message: "Shipment number updated successfully",
        type: "success",
        isVisible: true,
      });
    }
  };

  const handleUpdateDhlTracking = (id: number, value: string, error?: string) => {
    if (error) {
      console.log("Setting error toast:", error);
      setToast({
        message: error || "An error occurred",
        type: "error",
        isVisible: true,
      });
    } else {
      setApiVehicles((prev) =>
        prev.map((vehicle) =>
          vehicle.id === id
            ? { ...vehicle, dhlTrackingNumber: value || null }
            : vehicle
        )
      );
      setToast({
        message: "DHL tracking number updated successfully",
        type: "success",
        isVisible: true,
      });
    }
  };

  return (
    <>
      <VehicleFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        isLoading={false}
      />
      <div className="w-full rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 overflow-x-auto overflow-y-visible" style={{ wordBreak: 'keep-all', overflowWrap: 'normal' }}>
        {isLoadingData ? (
          <div className="w-full min-w-[1200px]">
            <div className="border-b border-gray-100 dark:border-white/5">
              <div className="grid grid-cols-11 gap-4 px-4 py-3">
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="60%" />
                <Skeleton variant="text" height={20} width="40%" />
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="grid grid-cols-11 gap-4 px-4 py-4">
                  <Skeleton variant="text" height={16} width="80%" />
                  <Skeleton variant="text" height={16} width="70%" />
                  <Skeleton variant="text" height={16} width="60%" />
                  <Skeleton variant="text" height={16} width="70%" />
                  <Skeleton variant="text" height={16} width="60%" />
                  <Skeleton variant="text" height={16} width="50%" />
                  <Skeleton variant="rectangular" height={24} width={80} className="rounded-full" />
                  <Skeleton variant="text" height={16} width="60%" />
                  <Skeleton variant="text" height={16} width="50%" />
                  <Skeleton variant="text" height={16} width="60%" />
                  <Skeleton variant="rectangular" height={32} width={32} className="rounded-lg" />
                </div>
              ))}
            </div>
          </div>
        ) : errorData ? (
          <div className="p-8">
            <ResourceNotFound 
              variant="error"
              title="Failed to Load Vehicles"
              message="We couldn't load the vehicles list. Please try again or contact support if the problem persists."
            />
          </div>
        ) : (
          <Table className="w-full min-w-[1200px]">
            <VehicleTableHeader />
            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {paginatedVehicles.length > 0 ? (
                paginatedVehicles.map((vehicle) => (
                  <VehicleTableRow
                    key={vehicle.id}
                    vehicle={vehicle}
                    isDropdownOpen={openDropdownId === vehicle.id}
                    onToggleDropdown={() => handleToggleDropdown(vehicle.id)}
                    onCloseDropdown={handleCloseDropdown}
                    onViewDetails={handleViewDetails}
                    onEdit={handleEdit}
                    onTrack={handleTrack}
                    onDelete={handleDelete}
                    onUpdateShipmentNumber={handleUpdateShipmentNumber}
                    onUpdateDhlTracking={handleUpdateDhlTracking}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="px-4 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        {apiVehicles.length === 0
                          ? "No vehicles found."
                          : "No vehicles found matching your filters."}
                      </p>
                      {apiVehicles.length > 0 && (
                        <button
                          onClick={handleResetFilters}
                          className="mt-2 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-brand-400"
                        >
                          Clear filters
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              )}
            </TableBody>
          </Table>
        )}
      </div>
      {metadata && metadata.totalVehicles > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  );
}
