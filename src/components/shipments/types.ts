export interface Vehicle {
  id: number;
  referenceNumber: string;
  vin: string;
  customerType: "ZAMBIAN_IMPORT" | "ZIMBABWE_TRANSIT" | "DRC";
  route: "NAKONDE" | "CHIRUNDU" | "SIABUWA" | "LIVINGSTONE" | "KASUMBALESA" | "KASENGA";
  finalDestination: string;
  city?: string;
  shipmentNumber?: string | null;
  dhlTrackingNumber?: string | null;
  createdAt: string;
  progress: {
    current: number;
    total: number;
  };
}

