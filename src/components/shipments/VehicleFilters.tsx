"use client";
import React from "react";
import Select from "../form/Select";
import { ChevronDownIcon } from "@/icons";
import Button from "../ui/button/Button";
import { TextInput } from "../vehicle-tracking/utils/formFields";

export interface Filters {
  status?: "all" | "pending" | "in-transit" | "delivered" | "blocked";
  customerType?: "all" | "ZAMBIAN_IMPORT" | "ZIMBABWE_TRANSIT" | "DRC";
  route?: "all" | "NAKONDE" | "CHIRUNDU" | "SIABUWA" | "LIVINGSTONE" | "KASUMBALESA" | "KASENGA";
  upgradeStatus?: "all" | "NONE" | "PENDING" | "APPROVED" | "REJECTED";
  search?: string;
  dhlFilter?: "all" | "HAS_DHL" | "NO_DHL";
  shipmentFilter?: "all" | "HAS_SHIPMENT" | "NO_SHIPMENT";
  finalDestination?: string;
}

interface VehicleFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
  onReset: () => void;
  isLoading?: boolean;
}

export default function VehicleFilters({
  filters,
  onFilterChange,
  onReset,
  isLoading = false,
}: VehicleFiltersProps) {
  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "in-transit", label: "In Progress" },
    { value: "delivered", label: "Delivered" },
    { value: "blocked", label: "Blocked" },
  ];

  const customerTypeOptions = [
    { value: "all", label: "All Customer Types" },
    { value: "ZAMBIAN_IMPORT", label: "Zambian Import" },
    { value: "ZIMBABWE_TRANSIT", label: "Zimbabwe Transit" },
    { value: "DRC", label: "DRC" },
  ];

  const routeOptions = [
    { value: "all", label: "All Routes" },
    { value: "NAKONDE", label: "Nakonde" },
    { value: "CHIRUNDU", label: "Chirundu" },
    { value: "SIABUWA", label: "Siabuwa" },
    { value: "LIVINGSTONE", label: "Livingstone" },
    { value: "KASUMBALESA", label: "Kasumbalesa" },
    { value: "KASENGA", label: "Kasenga" },
  ];

  const upgradeStatusOptions = [
    { value: "all", label: "All Upgrade Status" },
    { value: "NONE", label: "None" },
    { value: "PENDING", label: "Pending" },
    { value: "APPROVED", label: "Approved" },
    { value: "REJECTED", label: "Rejected" },
  ];

  const dhlFilterOptions = [
    { value: "all", label: "All" },
    { value: "HAS_DHL", label: "Has DHL" },
    { value: "NO_DHL", label: "No DHL" },
  ];

  const shipmentFilterOptions = [
    { value: "all", label: "All" },
    { value: "HAS_SHIPMENT", label: "Has Vessel" },
    { value: "NO_SHIPMENT", label: "No Vessel" },
  ];

  const handleFilterChange = (key: keyof Filters, value: string) => {
    const newFilters = {
      ...filters,
      [key]: value === "all" || value === "" ? undefined : value,
    };
    onFilterChange(newFilters);
  };

  const handleTextChange = (key: keyof Filters, value: string) => {
    onFilterChange({ ...filters, [key]: value || undefined });
  };

  const hasActiveFilters = 
    (filters.status !== undefined && filters.status !== "all") ||
    (filters.customerType !== undefined && filters.customerType !== "all") ||
    (filters.route !== undefined && filters.route !== "all") ||
    (filters.upgradeStatus !== undefined && filters.upgradeStatus !== "all") ||
    (filters.search !== undefined && filters.search !== "") ||
    (filters.dhlFilter !== undefined && filters.dhlFilter !== "all") ||
    (filters.shipmentFilter !== undefined && filters.shipmentFilter !== "all") ||
    (filters.finalDestination !== undefined && filters.finalDestination !== "");

  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-4 md:p-6 mb-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
          Filters
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Filter vehicles by status, customer type, route, or upgrade status
        </p>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Search (Reference)
        </label>
        <TextInput
          id="search"
          value={filters.search || ""}
          onChange={(value) => handleTextChange("search", value)}
          placeholder="Search by reference number..."
          disabled={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Status
          </label>
          <div className="relative">
            <Select
              options={statusOptions}
              placeholder="Select Status"
              value={filters.status || "all"}
              onChange={(value) => handleFilterChange("status", value)}
              disabled={isLoading}
              className="w-full"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {/* Customer Type Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Customer Type
          </label>
          <div className="relative">
            <Select
              options={customerTypeOptions}
              placeholder="Select Customer Type"
              value={filters.customerType || "all"}
              onChange={(value) => handleFilterChange("customerType", value)}
              disabled={isLoading}
              className="w-full"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {/* Route Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Route
          </label>
          <div className="relative">
            <Select
              options={routeOptions}
              placeholder="Select Route"
              value={filters.route || "all"}
              onChange={(value) => handleFilterChange("route", value)}
              disabled={isLoading}
              className="w-full"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {/* Upgrade Status Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upgrade Status
          </label>
          <div className="relative">
            <Select
              options={upgradeStatusOptions}
              placeholder="Select Upgrade Status"
              value={filters.upgradeStatus || "all"}
              onChange={(value) => handleFilterChange("upgradeStatus", value)}
              disabled={isLoading}
              className="w-full"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {/* DHL Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            DHL Tracking
          </label>
          <div className="relative">
            <Select
              options={dhlFilterOptions}
              placeholder="Select DHL Filter"
              value={filters.dhlFilter || "all"}
              onChange={(value) => handleFilterChange("dhlFilter", value)}
              disabled={isLoading}
              className="w-full"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {/* Shipment Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Vessel
          </label>
          <div className="relative">
            <Select
              options={shipmentFilterOptions}
              placeholder="Select Vessel Filter"
              value={filters.shipmentFilter || "all"}
              onChange={(value) => handleFilterChange("shipmentFilter", value)}
              disabled={isLoading}
              className="w-full"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
        </div>

        {/* Final Destination Filter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Final Destination
          </label>
          <TextInput
            id="finalDestination"
            value={filters.finalDestination || ""}
            onChange={(value) => handleTextChange("finalDestination", value)}
            placeholder="Enter destination..."
            disabled={isLoading}
          />
        </div>
      </div>

      {/* Clear Filters Button */}
      {hasActiveFilters && (
        <div className="mt-4 flex justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onReset}
            disabled={isLoading}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}

