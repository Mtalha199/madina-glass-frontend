/**
 * Types specific to Vehicle Detail page
 */

export interface EditVehicle {
  referenceNumber: string;
  id: string;
  status: string;
  route: string;
  destination: string;
  city?: string;
}

export interface VehicleDetailContentProps {
  vehicleId: string;
}

