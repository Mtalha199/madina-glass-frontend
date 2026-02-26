import apiClient from "./config";

export interface Admin {
  id: number;
  name: string;
  email: string;
  role?: string | { id: number; name: string } | null;
  status: "active" | "inactive";
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateAdminRequest {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export interface UpdateAdminRequest {
  name?: string;
  email?: string;
  roleId?: number;
  password?: string;
}

export interface ChangeStatusRequest {
  status: "active" | "inactive";
}

export interface AdminApiResponse {
  success: boolean;
  data: Admin;
  message: string;
}

export interface AdminsApiResponse {
  success: boolean;
  data: Admin[];
  message: string;
}

export interface PaginatedAdminsResponse {
  success: boolean;
  data: Admin[];
  page?: number;
  limit?: number;
  total?: number;
  message: string;
}

export interface ApiError {
  message: string;
  errors?: { field: string; message: string }[];
}

// Raw API response interface (what the API actually returns)
interface RawAdminApiData {
  id: number;
  name: string;
  email: string;
  role?: string | { id: number; name: string; description?: string; createdAt?: string } | null;
  isActive: boolean; // API returns boolean, not status string
  createdAt?: string;
  updatedAt?: string;
}

interface RawAdminApiResponse {
  success: boolean;
  data: RawAdminApiData;
  message: string;
}

interface RawAdminsApiResponse {
  success: boolean;
  data: RawAdminApiData[];
  message: string;
}

interface RawPaginatedAdminsResponse {
  success: boolean;
  data: RawAdminApiData[];
  page?: number;
  limit?: number;
  total?: number;
  message: string;
}

// Transform raw API response to match our Admin interface
const transformAdmin = (raw: RawAdminApiData): Admin => ({
  id: raw.id,
  name: raw.name,
  email: raw.email,
  role: raw.role,
  status: raw.isActive ? "active" : "inactive", // Convert boolean to string
  createdAt: raw.createdAt,
  updatedAt: raw.updatedAt,
});

export const adminsApi = {
  createAdmin: async (adminData: CreateAdminRequest): Promise<Admin> => {
    const response = await apiClient.post<RawAdminApiResponse>(
      "/admin",
      adminData
    );
    return transformAdmin(response.data.data);
  },

  getAdmins: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: "active" | "inactive";
  }): Promise<Admin[] | PaginatedAdminsResponse> => {
    const response = await apiClient.get<RawAdminsApiResponse | RawPaginatedAdminsResponse>(
      "/admin",
      { params }
    );
    // Handle both array response and paginated response
    if (Array.isArray(response.data.data)) {
      // Check if it's a paginated response (has page/limit/total)
      if ("page" in response.data || "limit" in response.data || "total" in response.data) {
        const paginatedResponse = response.data as RawPaginatedAdminsResponse;
        return {
          ...paginatedResponse,
          data: paginatedResponse.data.map(transformAdmin),
        };
      }
      // Simple array response
      return response.data.data.map(transformAdmin);
    }
    // Fallback (shouldn't happen, but TypeScript needs it)
    return [];
  },

  getAdminById: async (id: number | string): Promise<Admin> => {
    const response = await apiClient.get<RawAdminApiResponse>(
      `/admin/${id}`
    );
    return transformAdmin(response.data.data);
  },

  updateAdmin: async (
    id: number | string,
    adminData: UpdateAdminRequest
  ): Promise<Admin> => {
    const response = await apiClient.patch<RawAdminApiResponse>(
      `/admin/${id}`,
      adminData
    );
    return transformAdmin(response.data.data);
  },

  changeAdminStatus: async (
    id: number | string,
  ): Promise<Admin> => {
    const response = await apiClient.patch<RawAdminApiResponse>(
      `/admin/${id}/status`,
      undefined,
      {
        transformRequest: [
          (data, headers) => {
            // Remove Content-Type header for no-body PATCH requests
            // Some servers reject PATCH with Content-Type but no body
            if (data === undefined) {
              delete headers["Content-Type"];
            }
            return data;
          },
        ],
      }
    );
    return transformAdmin(response.data.data);
  },
};

