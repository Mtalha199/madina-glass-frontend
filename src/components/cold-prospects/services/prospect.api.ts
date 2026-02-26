import apiClient from "@/lib/api/config";

export interface ProspectFilters {
  search?: string;
  page?: number;
  limit?: number;
}

export interface ProspectListResponse {
  success: boolean;
  data: {
    prospects: Array<{
      id: number;
      title: string;
      description: string;
      toQualify: string;
      activeLeads: number;
      completion: string;
      createdAt: string;
      updatedAt: string;
    }>;
    meta: {
      totalRecords: number;
      currentPage: number;
      totalPages: number;
    };
  };
  message: string;
}

export const fetchProspects = async (
  filters?: ProspectFilters,
  signal?: AbortSignal
): Promise<ProspectListResponse> => {
  const params = new URLSearchParams();
  
  if (filters?.page) params.append("page", String(filters.page));
  if (filters?.limit) params.append("limit", String(filters.limit));
  if (filters?.search) params.append("search", filters.search);
  
  const response = await apiClient.get<ProspectListResponse>(`/prospects?${params.toString()}`, { signal });
  return response.data;
};