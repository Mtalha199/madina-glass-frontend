import apiClient from "@/lib/api/config";
import { VehiclesResponse, VehicleResponse } from "../types";

/**
 * Vehicle API Service
 * Uses the shared apiClient which handles authentication and base URL configuration
 */

/**
 * Vehicle filters for API
 */
export interface VehicleFilters {
  customerType?: "ZAMBIAN_IMPORT" | "ZIMBABWE_TRANSIT" | "DRC";
  route?: "NAKONDE" | "CHIRUNDU" | "SIABUWA" | "LIVINGSTONE" | "KASUMBALESA" | "KASENGA";
  upgradeStatus?: "NONE" | "PENDING" | "APPROVED" | "REJECTED";
  vehicleStatus?: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
  search?: string;
  dhlFilter?: "HAS_DHL" | "NO_DHL";
  shipmentFilter?: "HAS_SHIPMENT" | "NO_SHIPMENT";
  finalDestination?: string;
  page?: number;
  limit?: number;
}

/**
 * Fetch all vehicles with optional filters and pagination
 */
export const fetchVehicles = async (
  filters?: VehicleFilters,
  signal?: AbortSignal
): Promise<VehiclesResponse> => {
  const params = new URLSearchParams();
  
  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });
  
  const queryString = params.toString();
  const url = queryString ? `/vehicle?${queryString}` : "/vehicle";
  
  const response = await apiClient.get<VehiclesResponse>(url, { signal });
  return response.data;
};

/**
 * Export vehicles as CSV with the same filters as the list (no pagination)
 */
export const exportVehiclesCsv = async (filters?: VehicleFilters): Promise<Blob> => {
  const params = new URLSearchParams();
  Object.entries(filters || {}).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      params.append(key, String(value));
    }
  });
  const queryString = params.toString();
  const url = queryString ? `/vehicle/export/csv?${queryString}` : "/vehicle/export/csv";
  const response = await apiClient.get(url, { responseType: "blob" });
  return response.data as Blob;
};

/**
 * Fetch single vehicle by ID
 */
export const fetchVehicleById = async (id: number): Promise<VehicleResponse> => {
  const response = await apiClient.get<VehicleResponse>(`/vehicle/${id}`);
  return response.data;
};

/**
 * Create new vehicle
 */
export interface CreateVehiclePayload {
  vin: string;
  customerType: "ZAMBIAN_IMPORT" | "ZIMBABWE_TRANSIT" | "DRC";
  route: "NAKONDE" | "CHIRUNDU" | "SIABUWA" | "LIVINGSTONE" | "KASUMBALESA" | "KASENGA";
  finalDestination: string;
  city?: string;
  dhlTrackingNumber?: string;
  shipmentNumber?: string;
}

export const createVehicle = async (payload: CreateVehiclePayload): Promise<VehicleResponse> => {
  const response = await apiClient.post<VehicleResponse>("/vehicle", payload);
  return response.data;
};

/**
 * Update vehicle
 */
export interface UpdateVehiclePayload {
  customerType?: "ZAMBIAN_IMPORT" | "ZIMBABWE_TRANSIT";
  route?: "NAKONDE" | "CHIRUNDU";
  finalDestination?: string;
  city?: string;
}

export const updateVehicle = async (
  id: number,
  payload: UpdateVehiclePayload
): Promise<VehicleResponse> => {
  const response = await apiClient.patch<VehicleResponse>(`/vehicle/${id}`, payload);
  return response.data;
};

/**
 * Admin initiate upgrade (multipart: body + optional invoice file)
 * FormData must include: customerType, price; optional: route, finalDestination, notes; file field name: invoice
 */
export const adminInitiateUpgrade = async (
  id: number,
  formData: FormData
): Promise<VehicleResponse> => {
  const response = await apiClient.patch<VehicleResponse>(
    `/vehicle/${id}/admin-initiate-upgrade`,
    formData
  );
  return response.data;
};

/**
 * Update timeline step
 */
export interface UpdateTimelineStepPayload {
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
  notes?: string;
}

// Timeline step response from API
export interface TimelineStepResponse {
  success: boolean;
  data: {
    id: number;
    stepName: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
    notes: string | null;
    createdAt: string;
    updatedAt: string;
    vehicleId: number;
  };
  message: string;
}

export const updateTimelineStep = async (
  stepId: number,
  payload: UpdateTimelineStepPayload
): Promise<TimelineStepResponse> => {
  const response = await apiClient.patch<TimelineStepResponse>(`/timeline/steps/${stepId}`, payload);
  return response.data;
};

/**
 * Delete vehicle
 */
export const deleteVehicle = async (id: number): Promise<{ success: boolean; message: string }> => {
  const response = await apiClient.delete(`/vehicle/${id}`);
  return response.data;
};

/**
 * Update shipment number
 */
export interface UpdateShipmentNumberPayload {
  shipmentNumber: string;
}

export interface UpdateShipmentNumberResponse {
  success: boolean;
  data: {
    vehicle: any; // The full vehicle object from API
  };
  message: string;
}

export const updateShipmentNumber = async (
  id: number,
  payload: UpdateShipmentNumberPayload
): Promise<UpdateShipmentNumberResponse> => {
  const response = await apiClient.post<UpdateShipmentNumberResponse>(
    `/vehicle/${id}/shipment-number`,
    payload
  );
  return response.data;
};

/**
 * Update DHL tracking number
 */
export interface UpdateDhlTrackingPayload {
  dhlTrackingNumber: string;
}

export interface UpdateDhlTrackingResponse {
  success: boolean;
  data: {
    vehicle: any; // The full vehicle object from API
    document?: any; // Document object if created
  };
  message: string;
}

export const updateDhlTrackingNumber = async (
  id: number,
  payload: UpdateDhlTrackingPayload
): Promise<UpdateDhlTrackingResponse> => {
  const response = await apiClient.post<UpdateDhlTrackingResponse>(
    `/vehicle/${id}/dhl-tracking`,
    payload
  );
  return response.data;
};

/**
 * Shipments API
 */
export interface Shipment {
  shipmentNumber: string;
  vehiclesCount: number;
  status?: string;
}

export interface ShipmentsMetadata {
  total: number;
  offset: number;
  limit: number;
  search: string | null;
}

export interface ShipmentsListData {
  shipments: Shipment[];
  metadata: ShipmentsMetadata;
}

export interface ShipmentsResponse {
  success: boolean;
  data: ShipmentsListData;
  message: string;
}

export interface ShipmentsFilters {
  page?: number;
  limit?: number;
  search?: string;
}

export interface CreateShipmentPayload {
  shipmentNumber: string;
}

export interface CreateShipmentResponse {
  success: boolean;
  data: {
    id: number;
    shipmentNumber: string;
    status: string;
    createdAt: string;
    updatedAt: string;
  };
  message: string;
}

export const createShipment = async (
  payload: CreateShipmentPayload
): Promise<CreateShipmentResponse> => {
  const response = await apiClient.post<CreateShipmentResponse>("/shipments", payload);
  return response.data;
};

export interface ShipmentVehicle {
  id: number;
  vin: string;
  vehicleStatus: string;
  customerType: string;
  finalDestination: string;
  updatedAt: string;
}

export interface ShipmentVehiclesMetadata {
  totalVehicles: number;
  limit: number;
  offset: number;
  currentPage?: number;
  totalPages?: number;
}

export interface ShipmentVehiclesData {
  shipmentNumber: string;
  status: string;
  vehicles: ShipmentVehicle[];
  metadata?: ShipmentVehiclesMetadata;
  meta?: ShipmentVehiclesMetadata;
}

export interface ShipmentVehiclesResponse {
  success: boolean;
  data: ShipmentVehiclesData;
  message: string;
}

export interface ShipmentVehiclesFilters {
  page?: number;
  limit?: number;
  offset?: number;
}

export const fetchShipmentVehicles = async (
  shipmentNumber: string,
  filters?: ShipmentVehiclesFilters
): Promise<ShipmentVehiclesResponse> => {
  const params = new URLSearchParams();

  const limit = filters?.limit;
  const page = filters?.page;
  const offset =
    filters?.offset !== undefined
      ? filters.offset
      : page !== undefined
        ? (Math.max(1, page) - 1) * (limit ?? 10)
        : undefined;

  if (limit !== undefined) params.append("limit", String(limit));
  if (page !== undefined) params.append("page", String(page));
  if (offset !== undefined) params.append("offset", String(offset));

  const queryString = params.toString();
  const url = queryString
    ? `/shipments/${encodeURIComponent(shipmentNumber)}/vehicles?${queryString}`
    : `/shipments/${encodeURIComponent(shipmentNumber)}/vehicles`;

  const response = await apiClient.get<ShipmentVehiclesResponse>(url);
  return response.data;
};

export const fetchShipments = async (
  filters?: ShipmentsFilters
): Promise<ShipmentsResponse> => {
  const params = new URLSearchParams();
  
  if (filters?.page) {
    // Convert page to offset (page 1 = offset 0, page 2 = offset limit, etc.)
    const offset = filters.limit ? (filters.page - 1) * filters.limit : 0;
    params.append("offset", String(offset));
  }
  
  if (filters?.limit) {
    params.append("limit", String(filters.limit));
  }
  
  // Send search parameter if it exists and is not empty
  if (filters?.search && filters.search.trim()) {
    params.append("search", filters.search.trim());
  }
  
  const queryString = params.toString();
  const url = queryString ? `/shipments?${queryString}` : "/shipments";
  
  // Debug: Log the URL being called
  console.log("Fetching shipments from:", url);
  
  const response = await apiClient.get<ShipmentsResponse>(url);
  return response.data;
};

/**
 * Update shipment status
 */
export interface UpdateShipmentStatusPayload {
  shipmentNumber: string;
  stepName: "Payment Recieved" | "Vehicle booked" | "Shipment Departured" | "Shipment Arrived";
}

export interface UpdateShipmentStatusResponse {
  success: boolean;
  data: {
    shipmentNumber: string;
    affectedVehicles: number;
    vehicleVINs: string[];
    steps: Array<{
      id: number;
      stepName: string;
      status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
      notes: string | null;
      createdAt: string;
      updatedAt: string;
      vehicleId: number;
    }>;
  };
  message: string;
}

export const updateShipmentStatus = async (
  payload: UpdateShipmentStatusPayload
): Promise<UpdateShipmentStatusResponse> => {
  const response = await apiClient.post<UpdateShipmentStatusResponse>(
    "/vehicle/shipments/status",
    payload
  );
  return response.data;
};

