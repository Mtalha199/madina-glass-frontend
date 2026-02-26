import apiClient from "./config";

export interface DashboardStats {
  totalShipments: number;
  inTransit: number;
  delivered: number;
  blocked: number;
  pending: number;
  upgradeRequests: number;
}

export interface ShipmentOverTime {
  date: string;
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
  blocked: number;
}

export interface DistributionItem {
  type?: string;
  route?: string;
  status?: string;
  count: number;
}

export interface RecentActivity {
  id: number;
  stepName: string;
  status: string;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  vehicleId: number;
  vehicle: {
    vin: string;
    customerType: string;
    route: string;
  };
}

export interface ProcessingTime {
  averageDays: number;
  totalCompleted: number;
}

export interface DocumentStats {
  total: number;
  byType: Array<{
    type: string;
    count: number;
  }>;
}

export interface PendingUpgrade {
  id: number;
  vin: string;
  customerType: string;
  pendingCustomerType: string;
  route: string;
  pendingRoute: string;
  updatedAt: string;
}

export interface NeedsAttention {
  blocked: any[];
  pendingUpgrades: PendingUpgrade[];
}

export interface DashboardCharts {
  shipmentsOverTime: ShipmentOverTime[];
  customerTypeDistribution: DistributionItem[];
  routeDistribution: DistributionItem[];
  statusDistribution: DistributionItem[];
}

export interface DashboardData {
  stats: DashboardStats;
  charts: DashboardCharts;
  recentActivity: RecentActivity[];
  processingTime: ProcessingTime;
  documentStats: DocumentStats;
  needsAttention: NeedsAttention;
}

export interface DashboardApiResponse {
  success: boolean;
  data: DashboardData;
  message: string;
}

export interface ShipmentsOverTimeApiResponse {
  success: boolean;
  data: ShipmentOverTime[];
  message: string;
}

export const dashboardApi = {
  getCompleteDashboard: async (): Promise<DashboardData> => {
    const response = await apiClient.get<DashboardApiResponse>("/dashboard/complete");
    return response.data.data;
  },
  getShipmentsOverTime: async (days: number): Promise<ShipmentOverTime[]> => {
    const response = await apiClient.get<ShipmentsOverTimeApiResponse>(
      "/dashboard/shipments-over-time",
      { params: { days } }
    );
    return response.data.data;
  },
};

