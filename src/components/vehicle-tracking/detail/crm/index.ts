/**
 * CRM Detail Module Exports
 * Central export file for all CRM detail components, hooks, and utilities
 */

// Types
export * from "./types";

// Constants
export * from "./constants";

// Utils
export * from "./utils";

// Hooks
export { useVehicleDetailData } from "./hooks/useVehicleDetailData";
export { useStepUpdate } from "./hooks/useStepUpdate";

// Components
export { VehicleHeader } from "./components/VehicleHeader";
export { PhasePipeline } from "./components/PhasePipeline";
export { ProcessOverview } from "./components/ProcessOverview";
export { MandatoryAttachments } from "./components/MandatoryAttachments";
export { TimelinePhases } from "./components/TimelinePhases";
export { StepUpdateModal } from "./components/StepUpdateModal";

