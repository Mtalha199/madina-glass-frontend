import { AUTHENTICATION_VALUE } from "@/Constant";
import { toast } from "@/hooks/use-toast";
import defaultAxios from "axios";

const axios = defaultAxios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});
axios.interceptors.request.use((config) => {
   const AUTH_TOKEN = localStorage.getItem(AUTHENTICATION_VALUE.AUTH_TOKEN); 
  if (AUTH_TOKEN) {
    config.headers["Authorization"] ="bearer " + AUTH_TOKEN;
  }
  if (config.data instanceof FormData) {
    config.headers["Content-Type"] = "multipart/form-data";
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response && error.response.status;
    if (status === 401) {
      localStorage.clear();
      toast({
        variant: "destructive",
        title: error?.response?.data?.detail,
        description: "Your session is expired.",
      });
      window.location.replace("/");
      return new Promise(() => {});
      
    } else {
      return Promise.reject(error);
    }
  }
);

export default axios;
