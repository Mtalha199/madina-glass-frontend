import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "../ui/table";
import Badge from "../ui/badge/Badge";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { HorizontaLDots } from "@/icons";
import { Vehicle } from "./types";
import {
  formatDate,
  getStatusBadge,
  getCustomerTypeDisplay,
  getRouteDisplay,
  calculateProgressPercentage,
} from "./utils";
import {
  updateShipmentNumber,
  updateDhlTrackingNumber,
} from "../vehicle-tracking/services/vehicleApi";

interface VehicleTableRowProps {
  vehicle: Vehicle;
  isDropdownOpen: boolean;
  onToggleDropdown: () => void;
  onCloseDropdown: () => void;
  onViewDetails: (id: number) => void;
  onEdit: (id: number) => void;
  onTrack: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdateShipmentNumber?: (id: number, value: string, error?: string) => void;
  onUpdateDhlTracking?: (id: number, value: string, error?: string) => void;
}

export default function VehicleTableRow({
  vehicle,
  isDropdownOpen,
  onToggleDropdown,
  onCloseDropdown,
  onViewDetails,
  onEdit,
  onTrack,
  onDelete,
  onUpdateShipmentNumber,
  onUpdateDhlTracking,
}: VehicleTableRowProps) {
  const router = useRouter();
  const statusBadge = getStatusBadge(vehicle.progress);
  const progressPercentage = calculateProgressPercentage(vehicle.progress);

  const handleRowClick = () => {
    router.push(`/admin/vehicle/trackings/${vehicle.id}`);
  };

  const [isEditingShipment, setIsEditingShipment] = useState(false);
  const [isEditingDhl, setIsEditingDhl] = useState(false);
  const [shipmentValue, setShipmentValue] = useState(vehicle.shipmentNumber || "");
  const [dhlValue, setDhlValue] = useState(vehicle.dhlTrackingNumber || "");
  const [isSavingShipment, setIsSavingShipment] = useState(false);
  const [isSavingDhl, setIsSavingDhl] = useState(false);
  
  const shipmentInputRef = useRef<HTMLInputElement>(null);
  const dhlInputRef = useRef<HTMLInputElement>(null);

  // Sync local state with vehicle prop changes
  useEffect(() => {
    if (!isEditingShipment) {
      setShipmentValue(vehicle.shipmentNumber || "");
    }
  }, [vehicle.shipmentNumber, isEditingShipment]);

  useEffect(() => {
    if (!isEditingDhl) {
      setDhlValue(vehicle.dhlTrackingNumber || "");
    }
  }, [vehicle.dhlTrackingNumber, isEditingDhl]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditingShipment && shipmentInputRef.current) {
      shipmentInputRef.current.focus();
      shipmentInputRef.current.select();
    }
  }, [isEditingShipment]);

  useEffect(() => {
    if (isEditingDhl && dhlInputRef.current) {
      dhlInputRef.current.focus();
      dhlInputRef.current.select();
    }
  }, [isEditingDhl]);

  const handleShipmentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingShipment(true);
  };

  const handleShipmentBlur = async () => {
    const trimmedValue = shipmentValue.trim();
    // Only save if value changed
    if (trimmedValue !== (vehicle.shipmentNumber || "")) {
      setIsSavingShipment(true);
      try {
        const response = await updateShipmentNumber(vehicle.id, {
          shipmentNumber: trimmedValue,
        });
        
        if (response.success && response.data?.vehicle) {
          // Update local state via callback with the new shipment number
          if (onUpdateShipmentNumber) {
            const updatedShipmentNumber = response.data.vehicle.shipmentNumber || "";
            onUpdateShipmentNumber(vehicle.id, updatedShipmentNumber);
          }
        } else {
          // Handle API error response
          const errorMessage = response.message || "Failed to update shipment number";
          if (onUpdateShipmentNumber) {
            onUpdateShipmentNumber(vehicle.id, vehicle.shipmentNumber || "", errorMessage);
          }
          setShipmentValue(vehicle.shipmentNumber || "");
        }
      } catch (error: any) {
        console.error("Failed to update shipment number:", error);
        // Extract error message from API response
        const errorMessage = 
          error?.response?.data?.message || 
          error?.message || 
          "Failed to update shipment number. Please try again.";
        
        if (onUpdateShipmentNumber) {
          onUpdateShipmentNumber(vehicle.id, vehicle.shipmentNumber || "", errorMessage);
        }
        // Revert to original value on error
        setShipmentValue(vehicle.shipmentNumber || "");
      } finally {
        setIsSavingShipment(false);
        setIsEditingShipment(false);
      }
    } else {
      setIsEditingShipment(false);
    }
  };

  const handleShipmentKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setShipmentValue(vehicle.shipmentNumber || "");
      setIsEditingShipment(false);
    }
  };

  const handleDhlClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditingDhl(true);
  };

  const handleDhlBlur = async () => {
    const trimmedValue = dhlValue.trim();
    // Only save if value changed
    if (trimmedValue !== (vehicle.dhlTrackingNumber || "")) {
      setIsSavingDhl(true);
      try {
        const response = await updateDhlTrackingNumber(vehicle.id, {
          dhlTrackingNumber: trimmedValue,
        });
        
        if (response.success && response.data?.vehicle) {
          // Update local state via callback with the new DHL tracking number
          if (onUpdateDhlTracking) {
            const updatedDhlTracking = response.data.vehicle.dhlTrackingNumber || "";
            onUpdateDhlTracking(vehicle.id, updatedDhlTracking);
          }
        } else {
          // Handle API error response
          const errorMessage = response.message || "Failed to update DHL tracking number";
          if (onUpdateDhlTracking) {
            onUpdateDhlTracking(vehicle.id, vehicle.dhlTrackingNumber || "", errorMessage);
          }
          setDhlValue(vehicle.dhlTrackingNumber || "");
        }
      } catch (error: any) {
        console.error("Failed to update DHL tracking number:", error);
        // Extract error message from API response
        const errorMessage = 
          error?.response?.data?.message || 
          error?.message || 
          "Failed to update DHL tracking number. Please try again.";
        
        if (onUpdateDhlTracking) {
          onUpdateDhlTracking(vehicle.id, vehicle.dhlTrackingNumber || "", errorMessage);
        }
        // Revert to original value on error
        setDhlValue(vehicle.dhlTrackingNumber || "");
      } finally {
        setIsSavingDhl(false);
        setIsEditingDhl(false);
      }
    } else {
      setIsEditingDhl(false);
    }
  };

  const handleDhlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    } else if (e.key === "Escape") {
      setDhlValue(vehicle.dhlTrackingNumber || "");
      setIsEditingDhl(false);
    }
  };

  return (
    <TableRow className="hover:bg-gray-50 dark:hover:bg-white/2 cursor-pointer" onClick={handleRowClick}>
      <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
        <span className="whitespace-nowrap font-mono text-xs">
          {vehicle.vin}
        </span>
      </TableCell>
      <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
        <span className="whitespace-nowrap">
          {getCustomerTypeDisplay(vehicle.customerType)}
        </span>
      </TableCell>
      <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
        <span className="whitespace-nowrap">
          {getRouteDisplay(vehicle.route)}
        </span>
      </TableCell>
      <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
        <span className="whitespace-nowrap">
          {vehicle.finalDestination}
        </span>
      </TableCell>
      <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
        <span className="whitespace-nowrap">
          {vehicle.city || "-"}
        </span>
      </TableCell>
      <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
        {isEditingShipment ? (
          <div className="relative">
            <input
              ref={shipmentInputRef}
              type="text"
              value={shipmentValue}
              onChange={(e) => setShipmentValue(e.target.value)}
              onBlur={handleShipmentBlur}
              onKeyDown={handleShipmentKeyDown}
              disabled={isSavingShipment}
              className="w-full min-w-[120px] rounded border border-brand-500 bg-white px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed dark:border-brand-400 dark:bg-gray-800 dark:text-gray-200"
              onClick={(e) => e.stopPropagation()}
            />
            {isSavingShipment && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-brand-500 border-t-transparent"></div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="w-full min-h-[24px] cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors rounded px-1 -mx-1 py-1 -my-1 flex items-center"
            onClick={handleShipmentClick}
            title="Click to edit"
          >
            <span className="whitespace-nowrap hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
              {vehicle.shipmentNumber || "-"}
            </span>
          </div>
        )}
      </TableCell>
      <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
        {isEditingDhl ? (
          <div className="relative">
            <input
              ref={dhlInputRef}
              type="text"
              value={dhlValue}
              onChange={(e) => setDhlValue(e.target.value)}
              onBlur={handleDhlBlur}
              onKeyDown={handleDhlKeyDown}
              disabled={isSavingDhl}
              className="w-full min-w-[120px] rounded border border-brand-500 bg-white px-2 py-1 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-brand-500 disabled:opacity-50 disabled:cursor-not-allowed dark:border-brand-400 dark:bg-gray-800 dark:text-gray-200"
              onClick={(e) => e.stopPropagation()}
            />
            {isSavingDhl && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2">
                <div className="h-3 w-3 animate-spin rounded-full border-2 border-brand-500 border-t-transparent"></div>
              </div>
            )}
          </div>
        ) : (
          <div
            className="w-full min-h-[24px] cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors rounded px-1 -mx-1 py-1 -my-1 flex items-center"
            onClick={handleDhlClick}
            title="Click to edit"
          >
            <span className="whitespace-nowrap hover:text-brand-500 dark:hover:text-brand-400 transition-colors">
              {vehicle.dhlTrackingNumber || "-"}
            </span>
          </div>
        )}
      </TableCell>
      <TableCell className="px-4 py-4 text-start whitespace-nowrap">
        <Badge
          size="sm"
          color={statusBadge.color}
          variant="light"
        >
          {statusBadge.label}
        </Badge>
      </TableCell>
      <TableCell className="px-4 py-4 text-start whitespace-nowrap">
        <div className="flex items-center gap-2">
          <div className="flex-1 min-w-[80px]">
            <div className="relative w-full h-2 bg-gray-200 rounded-full dark:bg-gray-800">
              <div
                className="absolute left-0 top-0 h-full bg-brand-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>
          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {vehicle.progress.current}/{vehicle.progress.total}
          </span>
        </div>
      </TableCell>
      <TableCell className="px-4 py-4 text-gray-500 text-start text-theme-sm dark:text-gray-400 whitespace-nowrap">
        <span className="whitespace-nowrap">
          {formatDate(vehicle.createdAt)}
        </span>
      </TableCell>
    </TableRow>
  );
}
