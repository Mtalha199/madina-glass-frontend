import apiClient from "./config";


export const customersApi = {
  getCustomers: async () => {
    const response = await apiClient.get('/customers');
    return response.data;
  },
  getCustomerById: async (id: number) => {
    const response = await apiClient.get(`/customers/${id}`);
    return response.data;
  }
};