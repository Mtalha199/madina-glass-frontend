import apiClient from "./config";
import { storage } from "@/lib/storage";
import { LoginRequest, LoginResponse } from "@/shared/types/auth";

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>("/auth/admin/login", credentials);
    return response.data;
  },

  logout: (): void => {
    storage.clearAuth();
  },
};
