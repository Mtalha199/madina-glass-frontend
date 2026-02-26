"use client";

import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { fetchShipments, Shipment, ShipmentsMetadata, ShipmentsFilters } from "../vehicle-tracking/services/vehicleApi";
import ResourceNotFound from "../common/ResourceNotFound";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Button from "../ui/button/Button";
import Badge from "../ui/badge/Badge";
import { BoxIcon } from "@/icons";
import UpdateShipmentStatusModal from "./UpdateShipmentStatusModal";
import Toast from "../ui/toast/Toast";
import Skeleton from "../ui/skeleton/Skeleton";
import Pagination from "../tables/Pagination";

interface AllShipmentsContentProps {
  refreshTrigger?: number;
}

export default function AllShipmentsContent({ refreshTrigger }: AllShipmentsContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const isInitialMount = useRef(true);

  // Get current page from URL, default to 1
  const pageFromUrl = parseInt(searchParams.get("page") || "1", 10);
  const [currentPageState, setCurrentPageState] = useState(pageFromUrl);

  // Sync state with URL when URL changes
  useEffect(() => {
    setCurrentPageState(pageFromUrl);
  }, [pageFromUrl]);

  const currentPage = currentPageState;
  const itemsPerPage = 10;

  // Search state - initialized from URL
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "");
  const [debouncedSearch, setDebouncedSearch] = useState<string>(searchParams.get("search") || "");

  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [metadata, setMetadata] = useState<ShipmentsMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null);
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
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Reset page to 1 when search changes (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      return;
    }

    // Reset to page 1 when search changes
    setCurrentPageState(1);
  }, [debouncedSearch]);

  // Update URL when debounced search changes (but not on initial mount)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    // Create new params from current search params to preserve other filters
    const params = new URLSearchParams();

    // Preserve existing params except search and page
    searchParams.forEach((value, key) => {
      if (key !== "search" && key !== "page") {
        params.set(key, value);
      }
    });

    // Add or remove search parameter
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch.trim());
    }

    // Reset to page 1 when search changes
    params.set("page", "1");

    const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(newUrl, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, pathname, router]);

  // Prepare API filters with pagination and search
  const apiFilters: ShipmentsFilters = useMemo(() => {
    const filters: ShipmentsFilters = {
      page: currentPage,
      limit: itemsPerPage,
    };

    // Include search if it has a value - this will trigger API call when it changes
    if (debouncedSearch !== undefined && debouncedSearch !== null) {
      const trimmedSearch = debouncedSearch.trim();
      if (trimmedSearch) {
        filters.search = trimmedSearch;
      }
    }

    return filters;
  }, [currentPage, debouncedSearch]);

  const loadShipments = useCallback(async (filters: ShipmentsFilters) => {
    try {
      setIsLoading(true);
      setError(null);

      // Debug: Log the filters being sent
      console.log("Fetching shipments with filters:", filters);

      const response = await fetchShipments(filters);

      if (response.success && response.data) {
        // Extract shipments and metadata from new response structure
        const shipmentsData = response.data.shipments || [];
        const metadataData = response.data.metadata || null;

        setShipments(shipmentsData);
        setMetadata(metadataData);
      } else {
        setError(response.message || "Failed to load shipments");
        setShipments([]);
        setMetadata(null);
      }
    } catch (err: any) {
      console.error("Failed to fetch shipments:", err);
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load shipments. Please try again.";
      setError(errorMessage);
      setShipments([]);
      setMetadata(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadShipments(apiFilters);
  }, [apiFilters, loadShipments, refreshTrigger]);

  // Handle page change for server-side pagination
  function handlePageChange(page: number) {
    // Update state immediately for instant UI feedback
    setCurrentPageState(page);

    // Preserve all existing query parameters and update only the page
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const handleUpdateClick = (shipmentNumber: string) => {
    setSelectedShipment(shipmentNumber);
  };

  // Get current status for the selected shipment
  const getCurrentStatus = (): string | undefined => {
    if (!selectedShipment) return undefined;
    const shipment = shipments.find(s => s.shipmentNumber === selectedShipment);
    return shipment?.status;
  };

  const handleModalClose = () => {
    setSelectedShipment(null);
  };

  const handleUpdateSuccess = () => {
    // Show success toast
    setToast({
      message: "Shipment status updated successfully",
      type: "success",
      isVisible: true,
    });

    // Refresh the shipments list to show updated status
    // Use the current API filters to maintain pagination
    loadShipments(apiFilters);
  };

  const handleUpdateError = (message: string) => {
    // Show error toast
    setToast({
      message: message,
      type: "error",
      isVisible: true,
    });
  };

  // Helper function to get badge color based on status
  const getStatusBadgeColor = (status?: string): "success" | "warning" | "info" | "primary" | "error" | "light" => {
    if (!status) return "light";

    const statusLower = status.toLowerCase();
    if (statusLower.includes("arrived") || statusLower === "completed") {
      return "success";
    } else if (statusLower.includes("payment") || statusLower.includes("received")) {
      return "info";
    } else if (statusLower.includes("booked") || statusLower.includes("departured")) {
      return "primary";
    } else if (statusLower === "pending") {
      return "warning";
    }
    return "light";
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 dark:text-white/90">
            All Shipments
          </h2>
          {isLoading ? (
            <Skeleton variant="text" height={20} width={120} />
          ) : metadata ? (
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {metadata.total} shipment{metadata.total !== 1 ? "s" : ""} found
            </span>
          ) : null}
        </div>

        {/* Search Bar - Always visible */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400 dark:text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by shipment number..."
              className="w-full pl-12 pr-4 py-2.5 border border-gray-300 rounded-lg bg-white text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-900 dark:border-gray-700 dark:text-white/90 dark:placeholder:text-white/30 dark:focus:border-brand-800 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                aria-label="Clear search"
              >
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Loading State - Table Skeleton */}
        {isLoading ? (
          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 overflow-x-auto overflow-y-visible no-scrollbar">
            <div className="w-full">
              {/* Table Header Skeleton */}
              <div className="border-b border-gray-100 dark:border-white/5">
                <div className="grid grid-cols-4 gap-4 px-4 py-3">
                  <Skeleton variant="text" height={20} width="50%" />
                  <Skeleton variant="text" height={20} width="40%" />
                  <Skeleton variant="text" height={20} width="35%" />
                  <Skeleton variant="text" height={20} width="30%" />
                </div>
              </div>

              {/* Table Rows Skeleton */}
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <div key={i} className="grid grid-cols-4 gap-4 px-4 py-4">
                    {/* Shipment Number with Icon */}
                    <div className="flex items-center gap-3">
                      <Skeleton variant="rectangular" width={40} height={40} className="rounded-lg" />
                      <Skeleton variant="text" height={18} width={140} />
                    </div>
                    {/* Vehicles Count */}
                    <div className="flex items-center">
                      <Skeleton variant="text" height={16} width={60} />
                    </div>
                    {/* Status Badge */}
                    <div className="flex items-center">
                      <Skeleton variant="rectangular" height={24} width={120} className="rounded-full" />
                    </div>
                    {/* Update Button */}
                    <div className="flex items-center justify-end">
                      <Skeleton variant="rectangular" height={36} width={80} className="rounded-lg" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : error ? (
          /* Error State */
          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            <ResourceNotFound />
          </div>
        ) : !Array.isArray(shipments) || shipments.length === 0 ? (
          /* Empty State */
          <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <BoxIcon className="w-6 h-6 text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No Vessel found.
              </p>
            </div>
          </div>
        ) : (
          /* Table Content */
          <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 overflow-x-auto overflow-y-visible no-scrollbar">
            <Table className="w-full">
              <TableHeader className="border-b border-gray-100 dark:border-white/5">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                  >
                    Vessel Number
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                  >
                    Vehicles Count
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                  >
                    Status
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-12 whitespace-nowrap"
                  >
                    <span className="sr-only">Actions</span>
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {Array.isArray(shipments) && shipments.map((shipment) => (
                  <TableRow
                    key={shipment.shipmentNumber}
                    className="hover:bg-gray-50 dark:hover:bg-white/2"
                  >
                    <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-brand-500/10 rounded-lg shrink-0">
                          <BoxIcon className="w-5 h-5 text-brand-500" />
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            router.push(
                              `/admin/vessels/${encodeURIComponent(
                                shipment.shipmentNumber
                              )}/vehicles`
                            )
                          }
                          className="font-semibold text-gray-800 dark:text-white/90 hover:text-brand-500 dark:hover:text-brand-400 transition-colors"
                          title="View shipment vehicles"
                        >
                          {shipment.shipmentNumber}
                        </button>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                      <span className="font-medium text-gray-800 dark:text-white/90">
                        {shipment.vehiclesCount}
                      </span>
                    </TableCell>
                    <TableCell className="px-4 py-4 text-start whitespace-nowrap">
                      {shipment.status ? (
                        <Badge
                          size="sm"
                          color={getStatusBadgeColor(shipment.status)}
                          variant="light"
                        >
                          {shipment.status}
                        </Badge>
                      ) : (
                        <span className="text-gray-400 dark:text-gray-500">-</span>
                      )}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-start space-x-2 whitespace-nowrap">
                      <button
                        className="px-3 py-1 text-sm font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200"
                        onClick={() => router.push(`/admin/vessels/${shipment.shipmentNumber}/vehicles`)}
                      >
                        <span>Vehicles in Vessel</span> <span className="text-[12px] py-0.5 px-1.5 text-white ml-3 bg-brand-500 rounded-full" >{shipment.vehiclesCount}</span>
                      </button>
                      <button
                        className="px-3 py-1 text-sm font-medium border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 hover:border-gray-400 transition-colors duration-200"
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                          e.stopPropagation();
                          handleUpdateClick(shipment.shipmentNumber);
                        }}
                      >
                        Update
                      </button>

                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {/* Pagination */}
        {metadata && metadata.total > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(metadata.total / itemsPerPage)}
            onPageChange={handlePageChange}
            totalItems={metadata.total}
            itemsPerPage={itemsPerPage}
          />
        )}
      </div>

      {/* Update Shipment Status Modal */}
      {selectedShipment && (
        <UpdateShipmentStatusModal
          isOpen={!!selectedShipment}
          onClose={handleModalClose}
          shipmentNumber={selectedShipment}
          currentStatus={getCurrentStatus()}
          onSuccess={handleUpdateSuccess}
          onError={handleUpdateError}
        />
      )}

      {/* Toast Notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </>
  );
}

