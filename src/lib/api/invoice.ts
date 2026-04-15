 // Assuming you have a base axios instance

import apiClient from "./config";

export interface InvoiceItem {
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

export interface CreateInvoiceRequest {
  invoiceType?: "CUSTOMER" | "LABOUR";
  customerType: "CUSTOMER" | "WALKIN";
  deliveryStatus?: "NOT_DELIVERED" | "DELIVERED";
  customerId?: number;
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

export interface CreateCustomerPaymentRequest {
  amount: number;
  method: "CASH" | "CHEQUE" | "BANK" | "OTHER";
  invoiceId?: number;
  reference?: string;
  notes?: string;
}

export interface UpdateCustomerPaymentRequest {
  amount?: number;
  method?: "CASH" | "CHEQUE" | "BANK" | "OTHER";
  invoiceId?: number | null;
  reference?: string;
  notes?: string;
}

export const invoicesApi = {
  createInvoice: async (data: CreateInvoiceRequest) => {
    const response = await apiClient.post('/invoices', data);
    return response.data;
  },

  updateInvoice: async (id: number, data: Partial<CreateInvoiceRequest>) => {
    const response = await apiClient.patch(`/invoices/${id}`, data);
    return response.data;
  },

  deleteInvoice: async (id: number) => {
    const response = await apiClient.delete(`/invoices/${id}`);
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
  },

  getCustomerHistoryById: async (customerId: number) => {
    const response = await apiClient.get(`/invoices/customer/by-id/${customerId}`);
    return response.data;
  },

  getCustomerLedger: async (customerId: number) => {
    const response = await apiClient.get(`/invoices/customer/${customerId}/ledger`);
    return response.data;
  },

  addCustomerPayment: async (customerId: number, data: CreateCustomerPaymentRequest) => {
    const response = await apiClient.post(`/invoices/customer/${customerId}/payments`, data);
    return response.data;
  },

  updateCustomerPayment: async (customerId: number, paymentId: number, data: UpdateCustomerPaymentRequest) => {
    const response = await apiClient.patch(`/invoices/customer/${customerId}/payments/${paymentId}`, data);
    return response.data;
  },

  deleteCustomerPayment: async (customerId: number, paymentId: number) => {
    const response = await apiClient.delete(`/invoices/customer/${customerId}/payments/${paymentId}`);
    return response.data;
  },
};
