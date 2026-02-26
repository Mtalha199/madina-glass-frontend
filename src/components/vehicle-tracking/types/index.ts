import { StepStatus } from "../timeline";

/**
 * API Response Types for Vehicle Tracking
 */

// Timeline step from API
export interface ApiTimelineStep {
  id: number;
  stepName: string;
  status: StepStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  vehicleId: number;
}

// Vehicle from API
export interface ApiVehicle {
  id: number;
  referenceNumber?: string; // Optional, may use vin as fallback
  vin: string;
  customerType: "ZAMBIAN_IMPORT" | "ZIMBABWE_TRANSIT" | "DRC";
  route: "NAKONDE" | "CHIRUNDU" | "SIABUWA" | "LIVINGSTONE" | "KASUMBALESA" | "KASENGA";
  finalDestination: string;
  city?: string;
  shipmentNumber?: string | null;
  dhlTrackingNumber?: string | null;
  vehicleStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
  createdAt: string;
  updatedAt: string;
  timelineSteps?: ApiTimelineStep[];
}

// API Response wrapper
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

// Meta data for pagination and statistics
export interface VehiclesMeta {
  totalVehicles: number;
  inProgressCount: number;
  pendingCount: number;
  deliveredCount: number;
  currentPage: number;
  totalPages: number;
  blocked: number;
}

// Vehicles list response with new structure
export interface VehiclesListData {
  vehicles: ApiVehicle[];
  meta: VehiclesMeta;
}

export type VehiclesResponse = ApiResponse<VehiclesListData>;

// Single vehicle response
export type VehicleResponse = ApiResponse<ApiVehicle>;

/**
 * Transformed types for UI components
 */

// Transformed vehicle for VehicleCard
export interface VehicleCardData {
  id: number;
  referenceNumber: string;
  customerType: string;
  vin: string;
  status: string; // Display-friendly customer type
  vehicleStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED"; // API vehicle status
  route: string;
  destination: string;
  city?: string;
  shipmentNumber?: string | null;
  dhlTrackingNumber?: string | null;
  progress: {
    current: number;
    total: number;
  };
  timelineSteps: {
    id: string;
    title: string;
    subtitle?: string;
    status: StepStatus;
  }[];
}

/**
 * Helper functions to transform API data
 */

// Map customer type to display string
export const getCustomerTypeDisplay = (customerType: ApiVehicle["customerType"]): string => {
  switch (customerType) {
    case "ZAMBIAN_IMPORT":
      return "Zambian Import";
    case "ZIMBABWE_TRANSIT":
      return "Zimbabwe Transit";
    default:
      return customerType;
  }
};

// Calculate progress from timeline steps
export const calculateProgress = (steps?: ApiTimelineStep[]): { current: number; total: number } => {
  // Handle undefined or null steps
  if (!steps || !Array.isArray(steps)) {
    return {
      current: 0,
      total: 0,
    };
  }

  const total = steps.length;
  const completed = steps.filter((step) => step.status === "COMPLETED").length;
  const inProgress = steps.filter((step) => step.status === "IN_PROGRESS").length;
  
  // Count completed + half of in-progress for a more accurate representation
  const current = completed + (inProgress > 0 ? 0.5 : 0);
  
  return {
    current: Math.floor(current),
    total,
  };
};

// Transform API vehicle to VehicleCardData
export const transformVehicle = (apiVehicle: ApiVehicle): VehicleCardData => {
  const timelineSteps = apiVehicle.timelineSteps || [];
  
  return {
    id: apiVehicle.id,
    referenceNumber: apiVehicle.referenceNumber || apiVehicle.vin, // Use vin as fallback if referenceNumber is missing
    vin: apiVehicle.vin,
    customerType:getCustomerTypeDisplay(apiVehicle.customerType),
    status: getCustomerTypeDisplay(apiVehicle.customerType),
    vehicleStatus: apiVehicle.vehicleStatus,
    route: apiVehicle.route,
    destination: apiVehicle.finalDestination,
    city: apiVehicle.city,
    shipmentNumber: apiVehicle.shipmentNumber,
    dhlTrackingNumber: apiVehicle.dhlTrackingNumber,
    progress: calculateProgress(timelineSteps),
    timelineSteps: timelineSteps.map((step) => ({
      id: String(step.id),
      title: step.stepName,
      subtitle: step.notes || undefined,
      status: step.status,
    })),
  };
};

// Transform array of API vehicles
export const transformVehicles = (apiVehicles: ApiVehicle[]): VehicleCardData[] => {
  return apiVehicles.map(transformVehicle);
};

