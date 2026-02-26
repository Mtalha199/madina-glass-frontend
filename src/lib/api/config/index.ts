import axios from "axios";
import { storage } from "@/lib/storage";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true"
  },
  timeout: 30000,
});

// Request: Inject auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = storage.getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response: Handle auth errors (only redirect if token exists - not login failures)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const isUnauthorized = error.response?.status === 401;
    const hasToken = !!storage.getAccessToken();
    const isNotLoginPage = typeof window !== "undefined" && window.location.pathname !== "/admin/auth/signin";

    if (isUnauthorized && hasToken && isNotLoginPage) {
      storage.clearAuth();
      window.location.href = "/admin/auth/signin";
    }

    return Promise.reject(error);
  }
);

export default apiClient;

