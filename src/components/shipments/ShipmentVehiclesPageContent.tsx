"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import PageHeader from "../common/PageHeader";
import ResourceNotFound from "../common/ResourceNotFound";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";
import Skeleton from "../ui/skeleton/Skeleton";
import Pagination from "../tables/Pagination";
import Button from "../ui/button/Button";
import { ChevronLeftIcon } from "@/icons";
import {
  fetchShipmentVehicles,
  ShipmentVehicle,
  ShipmentVehiclesMetadata,
} from "../vehicle-tracking/services/vehicleApi";
import { formatDate } from "./utils";
import UpdateShipmentStatusModal from "./UpdateShipmentStatusModal";
import Toast from "../ui/toast/Toast";

interface ShipmentVehiclesPageContentProps {
  shipmentNumber: string;
}

const getShipmentStatusBadgeColor = (
  status?: string
): "success" | "warning" | "info" | "primary" | "error" | "light" => {
  if (!status) return "light";
  const normalized = status.toLowerCase();
  if (normalized.includes("created")) return "primary";
  if (normalized.includes("pending")) return "warning";
  if (normalized.includes("progress") || normalized.includes("in_progress")) return "info";
  if (normalized.includes("completed") || normalized.includes("delivered") || normalized.includes("arrived")) return "success";
  if (normalized.includes("blocked") || normalized.includes("cancel") || normalized.includes("error")) return "error";
  return "light";
};

const getVehicleStatusBadgeColor = (
  status?: string
): "success" | "warning" | "info" | "primary" | "error" | "light" => {
  if (!status) return "light";
  const normalized = status.toLowerCase();
  if (normalized === "pending") return "warning";
  if (normalized === "in_progress" || normalized.includes("progress")) return "info";
  if (normalized === "completed" || normalized === "delivered") return "success";
  if (normalized === "blocked") return "error";
  return "light";
};

const getCustomerTypeLabel = (customerType?: string): string => {
  if (!customerType) return "-";
  switch (customerType) {
    case "ZAMBIAN_IMPORT":
      return "Zambian Import";
    case "ZIMBABWE_TRANSIT":
      return "Zimbabwe Transit";
    case "DRC":
      return "DRC";
    default:
      return customerType;
  }
};

export default function ShipmentVehiclesPageContent({
  shipmentNumber,
}: ShipmentVehiclesPageContentProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const pageFromUrlRaw = parseInt(searchParams.get("page") || "1", 10);
  const pageFromUrl = Number.isFinite(pageFromUrlRaw) && pageFromUrlRaw > 0 ? pageFromUrlRaw : 1;
  const [currentPageState, setCurrentPageState] = useState(pageFromUrl);

  useEffect(() => {
    setCurrentPageState(pageFromUrl);
  }, [pageFromUrl]);

  const currentPage = currentPageState;
  const itemsPerPage = 10;

  const [shipmentStatus, setShipmentStatus] = useState<string | null>(null);
  const [vehicles, setVehicles] = useState<ShipmentVehicle[]>([]);
  const [metadata, setMetadata] = useState<ShipmentVehiclesMetadata | null>(null);
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



  const loadVehicles = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetchShipmentVehicles(shipmentNumber, {
        page: currentPage,
        limit: itemsPerPage,
      });

      if (response.success && response.data) {
        const rawMeta = response.data.metadata || response.data.meta;
        let normalizedMeta: ShipmentVehiclesMetadata | null = null;
        if (rawMeta) {
          const offsetFallback = (currentPage - 1) * itemsPerPage;

          const totalVehiclesRaw = Number(
            // Support common backend naming variants
            (rawMeta as any).totalVehicles ?? (rawMeta as any).total ?? (rawMeta as any).count ?? 0
          );
          const limitRaw = Number((rawMeta as any).limit ?? itemsPerPage);
          const offsetRaw = Number((rawMeta as any).offset ?? offsetFallback);

          const currentPageRaw =
            (rawMeta as any).currentPage !== undefined
              ? Number((rawMeta as any).currentPage)
              : undefined;
          const totalPagesRaw =
            (rawMeta as any).totalPages !== undefined
              ? Number((rawMeta as any).totalPages)
              : undefined;

          normalizedMeta = {
            totalVehicles:
              Number.isFinite(totalVehiclesRaw) && totalVehiclesRaw >= 0 ? totalVehiclesRaw : 0,
            limit: Number.isFinite(limitRaw) && limitRaw > 0 ? limitRaw : itemsPerPage,
            offset: Number.isFinite(offsetRaw) && offsetRaw >= 0 ? offsetRaw : offsetFallback,
            currentPage:
              currentPageRaw !== undefined && Number.isFinite(currentPageRaw) && currentPageRaw > 0
                ? currentPageRaw
                : undefined,
            totalPages:
              totalPagesRaw !== undefined && Number.isFinite(totalPagesRaw) && totalPagesRaw > 0
                ? totalPagesRaw
                : undefined,
          };
        }
        setShipmentStatus(response.data.status || null);
        setVehicles(response.data.vehicles || []);
        setMetadata(normalizedMeta);
      } else {
        setError(response.message || "Failed to load shipment vehicles");
        setShipmentStatus(null);
        setVehicles([]);
        setMetadata(null);
      }
    } catch (err: any) {
      const errorMessage =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to load shipment vehicles. Please try again.";
      setError(errorMessage);
      setShipmentStatus(null);
      setVehicles([]);
      setMetadata(null);
    } finally {
      setIsLoading(false);
    }
  }, [shipmentNumber, currentPage, itemsPerPage]);

  useEffect(() => {
    loadVehicles();
  }, [loadVehicles]);

  const totalPages = useMemo(() => {
    const pagesFromApi = metadata?.totalPages;
    if (pagesFromApi !== undefined && pagesFromApi > 0) return pagesFromApi;

    const total = metadata?.totalVehicles ?? 0;
    if (total <= 0) return 1;
    return Math.max(1, Math.ceil(total / itemsPerPage));
  }, [metadata, itemsPerPage]);

  const handlePageChange = (page: number) => {
    const nextPage = Math.min(Math.max(1, page), totalPages);
    setCurrentPageState(nextPage);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(nextPage));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const handleUpdateClick = (shipmentNumber: string) => {
    setSelectedShipment(shipmentNumber);
  };

  const handleUpdateSuccess = () => {
    // Show success toast
    setToast({
      message: "Shipment status updated successfully",
      type: "success",
      isVisible: true,
    });
  };

  const handleUpdateError = (message: string) => {
    // Show error toast
    setToast({
      message: message,
      type: "error",
      isVisible: true,
    });
  };
  const getCurrentStatus = (): string | undefined => {
    return shipmentStatus || undefined;
  };

  return (
    <div>
      <PageHeader
        title={`Shipment ${shipmentNumber}`}
        subtitle="View vehicles associated with this shipment."
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "All Shipments", href: "/admin/vessels" },
          { label: shipmentNumber },
        ]}
        action={
          <Button onClick={() => {
            handleUpdateClick(shipmentNumber);
          }}>
            Update
          </Button>
        }
      />


      {/* Summary */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {isLoading ? (
          <>
            <Skeleton variant="rectangular" height={24} width={120} className="rounded-full" />
            <Skeleton variant="text" height={16} width={160} />
          </>
        ) : (
          <>
            <Badge
              size="sm"
              color={getShipmentStatusBadgeColor(shipmentStatus || undefined)}
              variant="light"
            >
              {shipmentStatus || "UNKNOWN"}
            </Badge>
            {metadata && (
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {metadata.totalVehicles} vehicle{metadata.totalVehicles !== 1 ? "s" : ""}
              </span>
            )}
          </>
        )}
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 overflow-x-auto overflow-y-visible no-scrollbar">
          <div className="w-full">
            <div className="border-b border-gray-100 dark:border-white/5">
              <div className="grid grid-cols-5 gap-4 px-4 py-3">
                <Skeleton variant="text" height={20} width="50%" />
                <Skeleton variant="text" height={20} width="40%" />
                <Skeleton variant="text" height={20} width="35%" />
                <Skeleton variant="text" height={20} width="35%" />
                <Skeleton variant="text" height={20} width="30%" />
              </div>
            </div>
            <div className="divide-y divide-gray-100 dark:divide-white/5">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                <div key={i} className="grid grid-cols-5 gap-4 px-4 py-4">
                  <Skeleton variant="text" height={18} width={140} />
                  <Skeleton variant="rectangular" height={24} width={100} className="rounded-full" />
                  <Skeleton variant="text" height={18} width={120} />
                  <Skeleton variant="text" height={18} width={140} />
                  <Skeleton variant="text" height={18} width={120} />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
          <ResourceNotFound
            variant="error"
            title="Failed to Load Shipment"
            message={error}
          />
        </div>
      ) : vehicles.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
          <ResourceNotFound
            variant="empty"
            title="No Vehicles Found"
            message="This shipment has no vehicles associated with it yet."
          />
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 overflow-x-auto overflow-y-visible no-scrollbar">
          <Table className="w-full">
            <TableHeader className="border-b border-gray-100 dark:border-white/5">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Ref
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Vehicle Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Customer Type
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Final Destination
                </TableCell>
                <TableCell
                  isHeader
                  className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 whitespace-nowrap"
                >
                  Updated
                </TableCell>
              </TableRow>
            </TableHeader>
            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
              {vehicles.map((vehicle) => (
                <TableRow key={vehicle.id} onClick={() => router.push(`/admin/vehicle/trackings/${vehicle.id}`)} className="hover:bg-gray-50 dark:hover:bg-white/2 cursor-pointer">
                  <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    <span className="font-semibold text-gray-800 dark:text-white/90">
                      {vehicle.vin || "-"}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-start whitespace-nowrap">
                    <Badge
                      size="sm"
                      color={getVehicleStatusBadgeColor(vehicle.vehicleStatus)}
                      variant="light"
                    >
                      {vehicle.vehicleStatus.replace("_", " ") || "-"}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    <span className="font-medium text-gray-800 dark:text-white/90">
                      {getCustomerTypeLabel(vehicle.customerType)}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    <span className="font-medium text-gray-800 dark:text-white/90">
                      {vehicle.finalDestination || "-"}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
                    <span className="font-medium text-gray-800 dark:text-white/90">
                      {vehicle.updatedAt ? formatDate(vehicle.updatedAt) : "-"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Pagination */}
      {metadata && metadata.totalVehicles > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={metadata.totalVehicles}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}

      {selectedShipment && (
        <UpdateShipmentStatusModal
          isOpen={!!selectedShipment}
          onClose={() => setSelectedShipment(null)}
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
    </div>
  );
}
