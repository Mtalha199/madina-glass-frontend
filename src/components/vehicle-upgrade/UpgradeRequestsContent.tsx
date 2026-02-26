"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import UpgradeRequestSummaryCards from "./UpgradeRequestSummaryCards";
import Pagination from "../tables/Pagination";
import { usePagination } from "@/hooks/usePagination";
import ResourceNotFound from "../common/ResourceNotFound";
import { vehicleApi, VehicleResponse } from "@/lib/api/vehicle";
import { exportVehiclesCsv } from "../vehicle-tracking/services/vehicleApi";
import Select from "../form/Select";
import Label from "../form/Label";
import Button from "../ui/button/Button";
import { ChevronDownIcon, ListIcon, GridIcon } from "@/icons";
import UpgradeRequestTable from "./UpgradeRequestTable";
import UpgradeRequestCard from "./UpgradeRequestCard";
import UpgradeRequestTableSkeleton, { UpgradeRequestGridSkeleton } from "./UpgradeRequestSkeleton";

interface UpgradeRequest {
  id: string;
  vin: string;
  currentType: string;
  requestedType: string;
  requestedDate: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
}

// Helper function to format customer type (ZAMBIAN_IMPORT -> ZAMBIAN IMPORT)
const formatCustomerType = (type: string): string => {
  return type.replace(/_/g, " ");
};

// Helper function to format date
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Map API response to component format
const mapVehicleToUpgradeRequest = (vehicle: VehicleResponse): UpgradeRequest => {
  return {
    id: vehicle.id.toString(),
    vin: vehicle.vin,
    currentType: formatCustomerType(vehicle.customerType),
    requestedType: vehicle.pendingCustomerType
      ? formatCustomerType(vehicle.pendingCustomerType)
      : "",
    requestedDate: formatDate(vehicle.createdAt),
    status: vehicle.upgradeStatus,
  };
};

export default function UpgradeRequestsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [requests, setRequests] = useState<UpgradeRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Derive filter from URL (single source of truth)
  const getFilterFromUrl = (): "ALL" | "PENDING" | "APPROVED" | "REJECTED" => {
    const statusParam = searchParams.get("status");
    if (statusParam && ["ALL", "PENDING", "APPROVED", "REJECTED"].includes(statusParam.toUpperCase())) {
      return statusParam.toUpperCase() as "ALL" | "PENDING" | "APPROVED" | "REJECTED";
    }
    return "PENDING";
  };

  const statusFilter = getFilterFromUrl();

  const [isExporting, setIsExporting] = useState(false);

  // View mode: list or grid (persist via URL)
  const viewFromUrl = searchParams.get("view") as "list" | "grid" | null;
  const [viewMode, setViewMode] = useState<"list" | "grid">(
    viewFromUrl === "grid" || viewFromUrl === "list" ? viewFromUrl : "list"
  );

  useEffect(() => {
    const view = searchParams.get("view") as "list" | "grid" | null;
    if (view === "list" || view === "grid") setViewMode(view);
  }, [searchParams]);

  const handleViewModeChange = (mode: "list" | "grid") => {
    setViewMode(mode);
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", mode);
    router.replace(params.toString() ? `${window.location.pathname}?${params.toString()}` : window.location.pathname, { scroll: false });
  };

  const handleExportCsv = async () => {
    setIsExporting(true);
    try {
      const filter = statusFilter === "ALL" ? {} : { upgradeStatus: statusFilter };
      const blob = await exportVehiclesCsv(filter);
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `upgrade-requests-export-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Export CSV error:", err);
    } finally {
      setIsExporting(false);
    }
  };

  // Update URL when user changes filter
  const handleFilterChange = (value: string) => {
    const newFilter = value as "ALL" | "PENDING" | "APPROVED" | "REJECTED";
    const params = new URLSearchParams(searchParams.toString());

    if (newFilter === "PENDING") {
      params.delete("status");
    } else {
      params.set("status", newFilter);
    }

    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;

    router.replace(newUrl, { scroll: false });
  };

  // Fetch data when filter changes
  useEffect(() => {
    const fetchUpgradeRequests = async () => {
      try {
        setLoading(true);
        setError(null);
        const params = statusFilter === "ALL"
          ? undefined
          : { upgradeStatus: statusFilter };
        const vehicles = await vehicleApi.getVehicles(params);
        const mappedRequests = vehicles.map(mapVehicleToUpgradeRequest);
        setRequests(mappedRequests);
      } catch (err) {
        console.error("Failed to fetch upgrade requests:", err);
        setError("Failed to load upgrade requests. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUpgradeRequests();
  }, [statusFilter]);

  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    totalItems,
  } = usePagination<UpgradeRequest>(requests, { itemsPerPage: 9 });

  const statusFilterOptions = [
    { value: "ALL", label: "All Status" },
    { value: "PENDING", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
  ];

  return (
    <div className="space-y-6">
      <UpgradeRequestSummaryCards requests={requests} loading={loading} />

      {/* Filter Section - Always Visible */}
      <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex-1 max-w-xs">
            <div className="flex items-center gap-2 mb-1.5">
              <Label htmlFor="status-filter">Filter by Status</Label>
              <span className="text-xs text-gray-500 dark:text-gray-400 italic">
                (Adjust the filter to see past records)
              </span>
            </div>
            <div className="relative">
              <Select
                id="status-filter"
                options={statusFilterOptions}
                value={statusFilter}
                onChange={handleFilterChange}
                placeholder="Select Status"
                className="dark:bg-gray-900"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <ChevronDownIcon className="w-4 h-4" />
              </span>
            </div>
          </div>
          {!loading && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
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
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {totalItems} request{totalItems !== 1 ? "s" : ""} found
              </p>
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
          )}
        </div>
      </div>

      {/* Content Section */}
      {loading ? (
        viewMode === "list" ? (
          <UpgradeRequestTableSkeleton count={9} />
        ) : (
          <UpgradeRequestGridSkeleton count={9} />
        )
      ) : error ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
          <ResourceNotFound
            variant="error"
            title="Failed to Load Upgrade Requests"
            message="We couldn't load the upgrade requests. Please try again or contact support if the problem persists."
          />
        </div>
      ) : requests.length === 0 ? (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
          <ResourceNotFound
            variant="empty"
            title="No Upgrade Requests"
            message="No upgrade request at this time"
          />
        </div>
      ) : viewMode === "list" ? (
        <div>
          <UpgradeRequestTable requests={paginatedItems} />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            totalItems={totalItems}
            itemsPerPage={9}
          />
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 md:gap-6">
            {paginatedItems.map((request) => (
              <UpgradeRequestCard key={request.id} request={request} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            totalItems={totalItems}
            itemsPerPage={9}
          />
        </div>
      )}
    </div>
  );
}

