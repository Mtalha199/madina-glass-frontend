import apiClient from "./config";


export const customersApi = {
  getCustomers: async () => {
    const response = await apiClient.get('/customers');
    return response.data;
  },
  getCustomerById: async (id: number, includeArchived = false) => {
    const response = await apiClient.get(`/customers/${id}?includeArchived=${includeArchived ? "true" : "false"}`);
    return response.data;
  },
  deleteCustomer: async (id: number) => {
    const response = await apiClient.delete(`/customers/${id}`);
    return response.data;
  },
  closeLedger: async (id: number, mode: "HIDE" | "DELETE") => {
    const response = await apiClient.post(`/customers/${id}/ledger/close`, { mode });
    return response.data;
  },
};
