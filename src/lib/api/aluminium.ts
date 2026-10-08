import apiClient from "./config";

export interface AluminiumBranch {
  id: number;
  name: string;
  address?: string | null;
  code: string;
}

export interface AluminiumPriceItem {
  id: number;
  branchId?: number | null;
  type: string;
  length: string;
  unit: string;
  purchaseRate: number;
  saleRate: number;
  isActive: boolean;
  branch?: AluminiumBranch | null;
}

export interface AluminiumStockEntry {
  id: number;
  branchId: number;
  priceItemId: number;
  source: string;
  quantity: number;
  remainingQuantity: number;
  reference?: string | null;
  notes?: string | null;
  createdAt: string;
  branch?: AluminiumBranch;
  priceItem?: AluminiumPriceItem;
}

export interface AluminiumInvoiceLine {
  id?: number;
  priceItemId?: number;
  quantity: number;
  rate: number;
  length: string;
  type: string;
  value?: number;
  priceItem?: AluminiumPriceItem;
}

export interface AluminiumInvoice {
  id: number;
  invoiceNumber: string;
  branchId: number;
  customerName: string;
  customerPhone: string;
  customerAddress?: string | null;
  invoiceType: "CUSTOMER" | "LABOUR";
  remarks?: string | null;
  discount: number;
  carriage: number;
  paidAmount: number;
  billValue: number;
  balance: number;
  status: string;
  createdAt: string;
  branch?: AluminiumBranch;
  items?: AluminiumInvoiceLine[];
}

export interface AluminiumCompany {
  id: number;
  name: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AluminiumCompanyItem {
  id: number;
  companyId: number;
  profileName: string;
  thickness: string;
  type: string;
  amount: number;
  createdAt?: string;
  updatedAt?: string;
  company?: AluminiumCompany;
}

export const aluminiumApi = {
  getCompanies: async () => (await apiClient.get("/aluminium/companies")).data,
  getCompany: async (id: number) => (await apiClient.get(`/aluminium/companies/${id}`)).data,
  createCompany: async (data: { name: string }) => (await apiClient.post("/aluminium/companies", data)).data,
  updateCompany: async (id: number, data: { name?: string }) => (await apiClient.patch(`/aluminium/companies/${id}`, data)).data,
  deleteCompany: async (id: number) => (await apiClient.delete(`/aluminium/companies/${id}`)).data,
  getCompanyItems: async (companyId: number) => (await apiClient.get(`/aluminium/companies/${companyId}/items`)).data,
  createCompanyItem: async (companyId: number, data: { profileName: string; thickness: string; type: string; amount: number }) =>
    (await apiClient.post(`/aluminium/companies/${companyId}/items`, data)).data,
  seedCompanyItems: async (
    companyId: number,
    items: Array<{ profileName: string; thickness: string; type: string; amount: number }>
  ) => (await apiClient.post(`/aluminium/companies/${companyId}/items/bulk`, { items })).data,
  updateCompanyItem: async (id: number, data: { profileName?: string; thickness?: string; type?: string; amount?: number }) =>
    (await apiClient.patch(`/aluminium/company-items/${id}`, data)).data,
  deleteCompanyItem: async (id: number) => (await apiClient.delete(`/aluminium/company-items/${id}`)).data,
  deleteCompanyItems: async (companyId: number) => (await apiClient.delete(`/aluminium/companies/${companyId}/items`)).data,
  getPriceList: async () => (await apiClient.get("/aluminium/price-list")).data,
  createPriceItem: async (data: Partial<AluminiumPriceItem> & { type: string; length: string; purchaseRate: number; saleRate: number }) =>
    (await apiClient.post("/aluminium/price-list", data)).data,
  seedPriceList: async (items: Array<{ type: string; length: string; unit?: string; purchaseRate: number; saleRate: number; isActive?: boolean }>) =>
    (await apiClient.post("/aluminium/price-list/seed", { items })).data,
  getStock: async () => (await apiClient.get("/aluminium/stock")).data,
  addStock: async (data: {
    companyId?: number;
    companyItemId?: number;
    priceItemId?: number;
    type: string;
    length: string;
    unit?: string;
    quantity: number;
    purchaseRate?: number;
    saleRate?: number;
    reference?: string;
    notes?: string;
  }) => (await apiClient.post("/aluminium/stock", data)).data,
  deleteStock: async (id: number) => (await apiClient.delete(`/aluminium/stock/${id}`)).data,
  getInvoices: async () => (await apiClient.get("/aluminium/invoices")).data,
  getInvoiceById: async (id: number) => (await apiClient.get(`/aluminium/invoices/${id}`)).data,
  createInvoice: async (data: {
    customerName: string;
    customerPhone: string;
    customerAddress?: string;
    invoiceType?: "CUSTOMER" | "LABOUR";
    remarks?: string;
    discount?: number;
    carriage?: number;
    paidAmount?: number;
    items: Array<{ priceItemId?: number; type: string; length: string; quantity: number; rate: number }>;
  }) => (await apiClient.post("/aluminium/invoices", data)).data,
};
