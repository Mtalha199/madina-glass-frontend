import apiClient from "./config";

export interface EstimateItem {
  SerialNum?: string;
  itemName: string;
  jobDescription?: string;
  glassThickness?: string;
  glassType?: string;
  glassShade?: string;
  standardSize?: string;
  width: number;
  height: number;
  SWidth?: number;
  SHeight?: number;
  qtyPcs: number;
  totalSqft: number;
  rate: number;
  value: number;
}

export interface CreateEstimateRequest {
  customerType?: "CUSTOMER" | "WALKIN";
  customerId?: number;
  name: string;
  phone: string;
  address?: string;
  driverName?: string;
  cutterName?: string;
  fitterName?: string;
  remarks?: string;
  items: EstimateItem[];
  carriage: number;
  discountPercent?: number;
  discount: number;
  billValue?: number;
}

export interface ConvertEstimateRequest {
  customerType?: "CUSTOMER" | "WALKIN";
  customerId?: number;
  paidAmount?: number;
}

export const estimatesApi = {
  createEstimate: async (data: CreateEstimateRequest) => {
    const response = await apiClient.post("/estimates", data);
    return response.data;
  },

  updateEstimate: async (id: number, data: Partial<CreateEstimateRequest>) => {
    const response = await apiClient.patch(`/estimates/${id}`, data);
    return response.data;
  },

  deleteEstimate: async (id: number) => {
    const response = await apiClient.delete(`/estimates/${id}`);
    return response.data;
  },

  getEstimates: async () => {
    const response = await apiClient.get("/estimates");
    return response.data;
  },

  getEstimateById: async (id: number) => {
    const response = await apiClient.get(`/estimates/${id}`);
    return response.data;
  },

  convertEstimate: async (id: number, data: ConvertEstimateRequest) => {
    const response = await apiClient.post(`/estimates/${id}/convert`, data);
    return response.data;
  },
};
