"use client";

import React, { useState, lazy, Suspense, useMemo, useEffect, useRef } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import VehicleTrackingPageHeader from "./VehicleTrackingPageHeader";
import VehicleTrackingMetrics from "./VehicleTrackingMetrics";
import ResourceNotFound from "@/components/common/ResourceNotFound";
import { useModal } from "@/hooks/useModal";
import { useVehicles } from "./hooks/useVehicles";
import { createVehicle, CreateVehiclePayload, VehicleFilters as ApiVehicleFilters, exportVehiclesCsv } from "./services/vehicleApi";
import Pagination from "../tables/Pagination";
import Toast from "@/components/ui/toast/Toast";
import VehicleTrackingFilters, { VehicleFilters } from "./VehicleTrackingFilters";
import VehicleTable from "./VehicleTable";
import VehicleCard from "./VehicleCard";
import VehicleTableSkeleton, { VehicleGridSkeleton } from "./VehicleTableSkeleton";
import { ListIcon, GridIcon, PlusIcon } from "@/icons";
import Button from "../ui/button/Button";

// Lazy load modal to reduce initial bundle size
const CreateVehicleModal = lazy(() => import("./modals/CreateVehicleModal"));

export default function VehicleTrackingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  // Filter state - initialized from URL on first render
  const [filters, setFilters] = useState<VehicleFilters>(() => ({
    status: (searchParams.get("status") as VehicleFilters["status"]) || "all",
    customerType: (searchParams.get("customerType") as VehicleFilters["customerType"]) || "all",
    route: (searchParams.get("route") as VehicleFilters["route"]) || "all",
    upgradeStatus: (searchParams.get("upgradeStatus") as VehicleFilters["upgradeStatus"]) || "all",
    search: searchParams.get("search") || undefined,
    dhlFilter: (searchParams.get("dhlFilter") as VehicleFilters["dhlFilter"]) || "all",
    shipmentFilter: (searchParams.get("shipmentFilter") as VehicleFilters["shipmentFilter"]) || "all",
    finalDestination: searchParams.get("finalDestination") || undefined,
  }));

  // Debounced search state (for API calls)
  const [debouncedFilters, setDebouncedFilters] = useState<VehicleFilters>(filters);

  // View mode: list or grid (optional: persist via URL)
  const viewFromUrl = searchParams.get("view") as "list" | "grid" | null;
  const [viewMode, setViewMode] = useState<"list" | "grid">(
    viewFromUrl === "grid" || viewFromUrl === "list" ? viewFromUrl : "list"
  );

  // Get current page from URL, with state fallback for immediate updates
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [currentPageState, setCurrentPageState] = useState(pageFromUrl);

  // Sync state with URL when URL changes
  useEffect(() => {
    setCurrentPageState(pageFromUrl);
  }, [pageFromUrl]);

  useEffect(() => {
    const view = searchParams.get("view") as "list" | "grid" | null;
    if (view === "list" || view === "grid") setViewMode(view);
  }, [searchParams]);

  // Use state for current page (updated immediately on page change)
  const currentPage = currentPageState;

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
    setCurrentPageState(1); // Update state immediately

    const newUrl = `${pathname}?${params.toString()}`;
    const currentUrl = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;

    // Only update URL if filters actually changed (ignore page-only changes)
    if (newUrl !== currentUrl) {
      router.replace(newUrl, { scroll: false });
    }
  }, [debouncedFilters, pathname, router]); // Removed searchParams from dependencies

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
      return { page: currentPage, limit: 9 };
    }
    return { ...apiFilters, page: currentPage, limit: 9 };
  }, [apiFilters, currentPage]);

  // Fetch vehicles from API with filters and pagination
  const { vehicles, meta, isLoading, error, refetch } = useVehicles(apiFiltersWithPage);

  // Modal state for creating vehicle
  const { isOpen, openModal, closeModal } = useModal();

  // Loading state for creating vehicle
  const [isCreatingVehicle, setIsCreatingVehicle] = useState(false);

  // Loading state for CSV export
  const [isExporting, setIsExporting] = useState(false);

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

  function handleCreateNew() {
    openModal();
  }

  function handleFilterChange(newFilters: VehicleFilters) {
    setFilters(newFilters);
  }

  function handleClearFilters() {
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
  }

  async function handleSaveVehicle(vehicleData: {
    referenceNumber: string;
    customerType: string;
    route: string;
    finalDestination: string;
    city?: string;
    dhlTrackingNumber?: string;
    shipmentNumber?: string;
  }) {
    setIsCreatingVehicle(true);
    try {
      const payload: CreateVehiclePayload = {
        vin: vehicleData.referenceNumber,
        customerType: vehicleData.customerType as "ZAMBIAN_IMPORT" | "ZIMBABWE_TRANSIT" | "DRC",
        route: vehicleData.route as "NAKONDE" | "CHIRUNDU" | "SIABUWA" | "LIVINGSTONE" | "KASUMBALESA" | "KASENGA",
        finalDestination: vehicleData.finalDestination,
      };

      // Only include city if it's provided and not empty
      if (vehicleData.city && vehicleData.city.trim()) {
        payload.city = vehicleData.city;
      }

      // Only include DHL tracking number if it's provided and not empty
      if (vehicleData.dhlTrackingNumber && vehicleData.dhlTrackingNumber.trim()) {
        payload.dhlTrackingNumber = vehicleData.dhlTrackingNumber;
      }

      // Only include shipment number if it's provided and not empty
      if (vehicleData.shipmentNumber && vehicleData.shipmentNumber.trim()) {
        payload.shipmentNumber = vehicleData.shipmentNumber;
      }

      const response = await createVehicle(payload);

      // Verify response structure matches API
      if (response.success && response.data) {
        await refetch(); // Refresh the vehicle list
        closeModal();
        // Show success toast
        setToast({
          message: "Vehicle created successfully",
          type: "success",
          isVisible: true,
        });
      } else {
        throw new Error(response.message || "Failed to create vehicle");
      }
    } catch (error: any) {
      console.error("Failed to create vehicle:", error);
      // Show error toast
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create vehicle. Please try again.";
      setToast({
        message: errorMessage,
        type: "error",
        isVisible: true,
      });
      // Re-throw to let modal handle error display
      throw error;
    } finally {
      setIsCreatingVehicle(false);
    }
  }

  // Handle page change for server-side pagination
  function handlePageChange(page: number) {
    // Update state immediately for instant UI feedback and correct API calls
    setCurrentPageState(page);

    // Preserve all existing query parameters and update only the page
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  // Handle view mode change and persist in URL
  function handleViewModeChange(mode: "list" | "grid") {
    setViewMode(mode);
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", mode);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  async function handleExportCsv() {
    setIsExporting(true);
    try {
      const blob = await exportVehiclesCsv(apiFilters);
      if (!(blob instanceof Blob)) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `vehicles-export-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export CSV error:", err);
      setToast({
        message: err instanceof Error ? err.message : "Failed to export CSV",
        type: "error",
        isVisible: true,
      });
    } finally {
      setIsExporting(false);
    }
  }

  // Use meta data for pagination and metrics
  const totalPages = meta?.totalPages || 1;
  const totalItems = meta?.totalVehicles || 0;

  // Use meta data for metrics (from API)
  const totalVehicles = meta?.totalVehicles || 0;
  const inTransit = meta?.inProgressCount || 0;
  const pending = meta?.pendingCount || 0;
  const delivered = meta?.deliveredCount || 0;
  const blocked = meta?.blocked || 0;



  return (
    <div>
      <VehicleTrackingPageHeader onCreateNew={handleCreateNew} />

      <div className="mb-6">
        <VehicleTrackingMetrics
        blocked={blocked}
          totalVehicles={totalVehicles}
          inTransit={inTransit}
          pending={pending}
          delivered={delivered}
        />
      </div>

      {/* Filters Section */}
      <div className="mb-6">
        <VehicleTrackingFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
          isLoading={false}
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
            All Vehicles
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              className="mr-2"
              size="sm"
              onClick={handleExportCsv}
              disabled={isExporting}
              startIcon={
                isExporting ? (
                  <svg
                    className="animate-spin h-3.5 w-3.5 text-current"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                ) : undefined
              }
            >
              {isExporting ? "Exporting..." : "Export"}
            </Button>
            {!isLoading && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {totalItems} vehicles found
              </span>
            )}
            <div className="flex items-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/5 p-0.5">
              <button
                type="button"
                onClick={() => handleViewModeChange("list")}
                className={`flex items-center justify-center w-9 h-9 rounded-md transition-colors ${
                  viewMode === "list"
                    ? "bg-white dark:bg-white/10 text-brand-600 dark:text-brand-400 shadow-sm border border-gray-200 dark:border-gray-600"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                aria-label="List view"
              >
                <ListIcon className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={() => handleViewModeChange("grid")}
                className={`flex items-center justify-center w-9 h-9 rounded-md transition-colors ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-white/10 text-brand-600 dark:text-brand-400 shadow-sm border border-gray-200 dark:border-gray-600"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
                aria-label="Grid view"
              >
                <GridIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>

        {isLoading ? (
          viewMode === "list" ? (
            <VehicleTableSkeleton count={9} />
          ) : (
            <VehicleGridSkeleton count={9} />
          )
        ) : vehicles.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              No vehicles found. Create your first vehicle tracking to get started.
            </p>
          </div>
        ) : viewMode === "list" ? (
          <>
            <VehicleTable vehicles={vehicles} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={9}
            />
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={9}
            />
          </>
        )}
      </div>

      {isOpen && (
        <Suspense fallback={null}>
          <CreateVehicleModal
            isOpen={isOpen}
            onClose={closeModal}
            onSave={handleSaveVehicle}
            isSaving={isCreatingVehicle}
          />
        </Suspense>
      )}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
}
