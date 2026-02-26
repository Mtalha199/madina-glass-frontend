import { z } from "zod";

/**
 * Enums for vehicle tracking
 */
export const CustomerType = {
  ZAMBIAN_IMPORT: "ZAMBIAN_IMPORT",
  ZIMBABWE_TRANSIT: "ZIMBABWE_TRANSIT",
  DRC: "DRC",
} as const;

export const Route = {
  NAKONDE: "NAKONDE",
  CHIRUNDU: "CHIRUNDU",
  SIABUWA: "SIABUWA",
  LIVINGSTONE: "LIVINGSTONE",
  KASUMBALESA: "KASUMBALESA",
  KASENGA: "KASENGA",
} as const;

export const ZambianCities = {
  LUSAKA: "LUSAKA",
  KABWE: "KABWE",
  KAPIRI_MPOSHI: "KAPIRI_MPOSHI",
  NDOLA: "NDOLA",
  KITWE: "KITWE",
  CHINGOLA: "CHINGOLA",
  SOLWEZI: "SOLWEZI",
  MAZABUKA: "MAZABUKA",
  CHOMA: "CHOMA",
  LIVINGSTONE: "LIVINGSTONE",
  CHIPATA: "CHIPATA",
  PETAUKE: "PETAUKE",
  SIAVONGA: "SIAVONGA",
  MONGU: "MONGU",
  MKUSHI: "MKUSHI",
  KASAMA: "KASAMA",
} as const;

export const ZimbabweDestinations = {
  CHIRUNDU: "CHIRUNDU",
  SIABUWA: "SIABUWA",
  LIVINGSTONE: "LIVINGSTONE",
} as const;

export type CustomerTypeValue = (typeof CustomerType)[keyof typeof CustomerType];
export type RouteValue = (typeof Route)[keyof typeof Route];
export type ZambianCityValue = (typeof ZambianCities)[keyof typeof ZambianCities];
export type ZimbabweDestinationValue = (typeof ZimbabweDestinations)[keyof typeof ZimbabweDestinations];

/**
 * Zod schemas for vehicle forms
 */

// Base vehicle schema (common fields)
const baseVehicleFields = {
  customerType: z.enum([CustomerType.ZAMBIAN_IMPORT, CustomerType.ZIMBABWE_TRANSIT, CustomerType.DRC]),
  route: z.enum([Route.NAKONDE, Route.CHIRUNDU, Route.SIABUWA, Route.LIVINGSTONE, Route.KASUMBALESA, Route.KASENGA]),
  finalDestination: z.string().min(1, "Final destination is required"),
  city: z.string().optional(),
  dhlTrackingNumber: z.string().optional(),
  shipmentNumber: z.string().optional(),
};

// Create Vehicle Schema - includes Reference Number
export const createVehicleSchema = z
  .object({
    referenceNumber: z
      .string()
      .min(1, "Reference number is required"),
    ...baseVehicleFields,
  });
  // .refine(
  //   (data) => {
  //     // Zambian Import requires city selection
  //     if (data.customerType === CustomerType.ZAMBIAN_IMPORT && !data.city) {
  //       return false;
  //     }
  //     return true;
  //   },
  //   {
  //     message: "City is required for Zambian Import",
  //     path: ["city"],
  //   }
  // );

// Edit Vehicle Schema - Reference Number is not editable
export const editVehicleSchema = z
  .object({
    ...baseVehicleFields,
  });
  // .refine(
  //   (data) => {
  //     // Zambian Import requires city selection
  //     if (data.customerType === CustomerType.ZAMBIAN_IMPORT && !data.city) {
  //       return false;
  //     }
  //     return true;
  //   },
  //   {
  //     message: "City is required for Zambian Import",
  //     path: ["city"],
  //   }
  // );

// Issue Upgrade Request (admin) - edit fields + required price
export const issueUpgradeSchema = z.object({
  ...baseVehicleFields,
  price: z.string().min(1, "Price is required"),
});

// Timeline step update schema
export const updateTimelineStepSchema = z.object({
  status: z.enum(["PENDING", "IN_PROGRESS", "COMPLETED", "BLOCKED"]),
  notes: z.string().max(500, "Notes must be 500 characters or less").optional(),
});

// Type inference
export type CreateVehicleFormData = z.infer<typeof createVehicleSchema>;
export type EditVehicleFormData = z.infer<typeof editVehicleSchema>;
export type IssueUpgradeFormData = z.infer<typeof issueUpgradeSchema>;
export type UpdateTimelineStepFormData = z.infer<typeof updateTimelineStepSchema>;

/**
 * Helper to get default route based on customer type
 */
export const getDefaultRouteForCustomerType = (customerType: CustomerTypeValue): RouteValue => {
  switch (customerType) {
    case CustomerType.ZAMBIAN_IMPORT:
      return Route.NAKONDE;
    case CustomerType.ZIMBABWE_TRANSIT:
      return Route.CHIRUNDU;
    case CustomerType.DRC:
      return Route.KASUMBALESA;
    default:
      return Route.NAKONDE;
  }
};

/**
 * Check if city selection should be shown
 */
export const shouldShowCitySelection = (customerType: CustomerTypeValue): boolean => {
  return customerType === CustomerType.ZAMBIAN_IMPORT;
};

/**
 * City options for Zambian Import
 */
export const zambianCityOptions = [
  { value: ZambianCities.KABWE, label: "Kabwe" },
  { value: ZambianCities.KAPIRI_MPOSHI, label: "Kapiri Mposhi" },
  { value: ZambianCities.NDOLA, label: "Ndola" },
  { value: ZambianCities.KITWE, label: "Kitwe" },
  { value: ZambianCities.CHINGOLA, label: "Chingola" },
  { value: ZambianCities.SOLWEZI, label: "Solwezi" },
  { value: ZambianCities.LUSAKA, label: "Lusaka" },
  { value: ZambianCities.MAZABUKA, label: "Mazabuka" },
  { value: ZambianCities.CHOMA, label: "Choma" },
  { value: ZambianCities.LIVINGSTONE, label: "Livingstone" },
  { value: ZambianCities.CHIPATA, label: "Chipata" },
  { value: ZambianCities.PETAUKE, label: "Petauke" },
  { value: ZambianCities.SIAVONGA, label: "Siavonga" },
  { value: ZambianCities.MONGU, label: "Mongu" },
  { value: ZambianCities.MKUSHI, label: "Mkushi" },
  { value: ZambianCities.KASAMA, label: "Kasama" },
];

/**
 * Customer type options
 */
export const customerTypeOptions = [
  { value: CustomerType.ZAMBIAN_IMPORT, label: "Zambian Import" },
  { value: CustomerType.ZIMBABWE_TRANSIT, label: "Zimbabwe Transit" },
  { value: CustomerType.DRC, label: "DRC" },
];

/**
 * Route options for Zambian Import (only Nakonde)
 */
export const zambianRouteOptions = [
  { value: Route.NAKONDE, label: "Nakonde" },
];

/**
 * Route options for Zimbabwe Transit
 */
export const zimbabweRouteOptions = [
  { value: Route.CHIRUNDU, label: "Chirundu" },
  { value: Route.SIABUWA, label: "Siabuwa" },
  { value: Route.LIVINGSTONE, label: "Livingstone" },
];

/**
 * Route options for DRC
 */
export const drcRouteOptions = [
  { value: Route.KASUMBALESA, label: "Kasumbalesa" },
  { value: Route.KASENGA, label: "Kasenga" },
];

/**
 * All route options (legacy, kept for backward compatibility)
 */
export const routeOptions = [
  { value: Route.NAKONDE, label: "Nakonde" },
  { value: Route.CHIRUNDU, label: "Chirundu" },
  { value: Route.SIABUWA, label: "Siabuwa" },
  { value: Route.LIVINGSTONE, label: "Livingstone" },
  { value: Route.KASUMBALESA, label: "Kasumbalesa" },
  { value: Route.KASENGA, label: "Kasenga" },
];

/**
 * Zimbabwe destination options for Zimbabwe Transit
 */
export const zimbabweDestinationOptions = [
  { value: ZimbabweDestinations.CHIRUNDU, label: "Chirundu" },
  { value: ZimbabweDestinations.SIABUWA, label: "Siabuwa" },
  { value: ZimbabweDestinations.LIVINGSTONE, label: "Livingstone" },
];
