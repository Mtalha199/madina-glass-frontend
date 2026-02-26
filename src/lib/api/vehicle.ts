import apiClient from "./config";
import { API_BASE_URL } from "./config";

export interface TimelineStep {
  id: number;
  stepName: string;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  vehicleId: number;
}

export interface VehicleResponse {
  id: number;
  referenceNumber: string;
  vin: string;
  customerType: string;
  pendingCustomerType: string | null;
  route: string;
  pendingRoute: string | null;
  finalDestination: string;
  pendingDestination: string | null;
  upgradeStatus: "PENDING" | "APPROVED" | "REJECTED";
  upgradePrice: number | null;
  upgradeInvoiceUrl: string | null;
  paymentScreenshot: string | null;
  paymentStatus: string | null;
  paymentNotes: string | null;
  vehicleStatus: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  timelineSteps: TimelineStep[];
}

export interface GetVehiclesApiResponse {
  success: boolean;
  data: {
    vehicles: VehicleResponse[];
    meta: {
      totalVehicles: number;
      inProgressCount: number;
      pendingCount: number;
      deliveredCount: number;
      currentPage: number;
      totalPages: number;
    };
  };
  message: string;
}

export interface GetVehiclesParams {
  upgradeStatus?: "PENDING" | "APPROVED" | "REJECTED";
}

export interface GetVehicleByIdApiResponse {
  success: boolean;
  data: VehicleResponse[];
  message: string;
}

export interface RequestPaymentRequest {
  price: number;
  invoice?: File;
}

export interface RequestPaymentApiResponse {
  success: boolean;
  data: VehicleResponse;
  message: string;
}

export interface VerifyPaymentRequest {
  isReceived: boolean;
  notes?: string;
}

export interface VerifyPaymentApiResponse {
  success: boolean;
  data: VehicleResponse;
  message: string;
}

export interface ApproveUpgradeRequest {
  notes?: string;
}

export interface ApproveUpgradeApiResponse {
  success: boolean;
  data: VehicleResponse;
  message: string;
}

export interface RejectUpgradeRequest {
  reason?: string;
}

export interface RejectUpgradeApiResponse {
  success: boolean;
  data: VehicleResponse;
  message: string;
}

export const vehicleApi = {
  getVehicles: async (params?: GetVehiclesParams): Promise<VehicleResponse[]> => {
    const response = await apiClient.get<GetVehiclesApiResponse>("/vehicle", {
      params,
    });
    return response.data.data.vehicles || [];
  },

  getVehicleById: async (id: string | number): Promise<VehicleResponse | null> => {
    const response = await apiClient.get<GetVehicleByIdApiResponse>(`/vehicle/${id}`);
    const data = response.data.data;
    
    // Handle different response formats
    if (!data) {
      return null;
    }
    
    // If data is already a single vehicle object
    if (!Array.isArray(data)) {
      return data as VehicleResponse;
    }
    
    // If data is an array, find the vehicle with matching ID or return first one
    const vehicles = data as VehicleResponse[];
    const vehicle = vehicles.find((v) => v.id === Number(id)) || vehicles[0] || null;
    return vehicle;
  },

  requestPayment: async (
    id: string | number,
    data: RequestPaymentRequest
  ): Promise<VehicleResponse> => {
    // Create FormData for file upload
    const formData = new FormData();
    formData.append("price", data.price.toString());
    if (data.invoice) {
      formData.append("invoice", data.invoice);
    }

    const response = await apiClient.patch<RequestPaymentApiResponse>(
      `/vehicle/${id}/request-payment`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },

  verifyPayment: async (
    id: string | number,
    data: VerifyPaymentRequest
  ): Promise<VehicleResponse> => {
    const response = await apiClient.patch<VerifyPaymentApiResponse>(
      `/vehicle/${id}/verify-payment`,
      data
    );
    return response.data.data;
  },

  approveUpgrade: async (
    id: string | number,
    notes?: string
  ): Promise<VehicleResponse> => {
    const response = await apiClient.patch<ApproveUpgradeApiResponse>(
      `/vehicle/${id}/approve-upgrade`,
      { notes }
    );
    return response.data.data;
  },

  rejectUpgrade: async (
    id: string | number,
    reason?: string
  ): Promise<VehicleResponse> => {
    const response = await apiClient.patch<RejectUpgradeApiResponse>(
      `/vehicle/${id}/reject-upgrade`,
      { reason }
    );
    return response.data.data;
  },
};

