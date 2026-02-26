/**
 * CRM Detail Page Types
 */

// API Response Types
export interface ApiStep {
    id: number;
    stepName: string;
    status: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
    notes: string | null;
    imageUrl: string | null;
    createdAt: string;
    updatedAt: string;
    vehicleId: number;
}

export interface ApiPhase {
    title: string;
    steps: ApiStep[];
}

export interface ApiVehicleData {
    id: number;
    vin: string;
    customerType: "ZAMBIAN_IMPORT" | "ZIMBABWE_TRANSIT" | "DRC";
    route: "NAKONDE" | "CHIRUNDU" | "SIABUWA" | "LIVINGSTONE" | "KASUMBALESA" | "KASENGA";
    finalDestination: string;
    vehicleStatus: "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED";
    dhlTrackingNumber: string | null;
    shipmentNumber: string | null;
    createdAt: string;
    updatedAt: string;
    timeline: ApiPhase[];
}

export interface ApiResponse {
    success: boolean;
    data: ApiVehicleData;
    message: string;
}

// UI Types
export interface Phase {
    id: string;
    title: string;
    color: string;
    steps?: ApiStep[]; // Steps in this phase
    progress?: number; // Progress percentage (0-100)
}

export type StepStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "BLOCKED" | "SKIPPED";

export interface TimelineStep {
    id: number;
    number: number; // Phase-local step number
    globalStepNumber: number; // Global sequential step number across all phases
    title: string;
    status: StepStatus;
    notes: string | null;
    imageUrl: string | null;
}

export interface PhaseGroup {
    id: string;
    title: string;
    color: string;
    steps: TimelineStep[];
}

export interface MandatoryAttachment {
    label: string;
    steps: string;
}

