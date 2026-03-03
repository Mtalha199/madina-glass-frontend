 // Assuming you have a base axios instance

import apiClient from "./config";

export interface InvoiceItem {
  SerialNum?: string;
  itemName: string;
  jobDescription?: string;
  width: number;
  height: number;
  qtyPcs: number;
  totalSqft: number;
  rate: number;
  value: number;
}

export interface CreateInvoiceRequest {
  invoiceType?: "CUSTOMER" | "LABOUR";
  customerType: "CUSTOMER" | "WALKIN";
  name: string;
  phone: string;
  address?: string;
  driverName?: string;
  cutterName?: string;
  fitterName?: string;
  remarks?: string;
  items: InvoiceItem[];
  carriage: number;
  discountPercent?: number;
  discount: number;
  paidAmount: number;
}

export const invoicesApi = {
  createInvoice: async (data: CreateInvoiceRequest) => {
    const response = await apiClient.post('/invoices', data);
    return response.data;
  },

  getInvoices: async () => {
    const response = await apiClient.get('/invoices');
    return response.data;
  },

  getInvoiceById: async (id: number) => {
    const response = await apiClient.get(`/invoices/${id}`);
    return response.data;
  },

  getCustomerHistory: async (phone: string) => {
    const response = await apiClient.get(`/invoices/customer/${phone}`);
    return response.data;
  }
};
