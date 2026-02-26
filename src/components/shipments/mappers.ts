import { Vehicle } from "./types";
import { ApiVehicle, calculateProgress } from "../vehicle-tracking/types";

/**
 * Map ApiVehicle from API to Vehicle type for table display
 */
export const mapApiVehicleToVehicle = (apiVehicle: ApiVehicle): Vehicle => {
  // Use shipment number from API, or generate one if not present
  const shipmentNumber = apiVehicle.shipmentNumber 
    ? apiVehicle.shipmentNumber
    : (apiVehicle.referenceNumber
      ? `BFZ-${new Date(apiVehicle.createdAt).getFullYear()}-${String(apiVehicle.id).padStart(6, '0')}`
      : null);

  // Calculate progress from timeline steps
  const progress = calculateProgress(apiVehicle.timelineSteps);

  return {
    id: apiVehicle.id,
    referenceNumber: apiVehicle.referenceNumber || apiVehicle.vin,
    vin: apiVehicle.vin,
    // Cast to handle type differences - API may have more types than defined
    customerType: (apiVehicle.customerType || "ZAMBIAN_IMPORT") as Vehicle["customerType"],
    route: (apiVehicle.route || "NAKONDE") as Vehicle["route"],
    finalDestination: apiVehicle.finalDestination,
    city: apiVehicle.city,
    shipmentNumber: shipmentNumber || null,
    dhlTrackingNumber: apiVehicle.dhlTrackingNumber || null,
    createdAt: apiVehicle.createdAt,
    progress,
  };
};

