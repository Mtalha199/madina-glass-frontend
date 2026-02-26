/**
 * CRM Detail Page Utility Functions
 */

import { ApiVehicleData, PhaseGroup, Phase } from "./types";
import { PHASE_COLORS } from "./constants";

/**
 * Get customer type display name
 */
export const getCustomerTypeDisplay = (type: string): string => {
    switch (type) {
        case "ZAMBIAN_IMPORT":
            return "Zambian Import - Nakonde Clearing";
        case "ZIMBABWE_TRANSIT":
            return "Zimbabwe Transit";
        case "DRC":
            return "DRC Transit";
        default:
            return type;
    }
};

/**
 * Get route display string
 */
export const getRouteDisplay = (vehicleData: ApiVehicleData): string => {
    const route = vehicleData.route;
    const destination = vehicleData.finalDestination;
    return `Japan → Dar es Salaam → ${route}, ${destination}`;
};

/**
 * Truncate phase title for pipeline display
 */
const truncatePhaseTitle = (title: string, maxLength: number = 18): string => {
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength - 3) + "...";
};

/**
 * Transform API phase titles to Phase objects for pipeline
 */
export const transformToPhasePipeline = (vehicleData: ApiVehicleData | null): Phase[] => {
    if (!vehicleData) return [];

    return vehicleData.timeline.map((phase, index) => {
        const totalSteps = phase.steps.length;
        const completedSteps = phase.steps.filter((s) => s.status === "COMPLETED").length;
        const progress = totalSteps > 0 ? Math.round((completedSteps / totalSteps) * 100) : 0;

        return {
            id: `phase${index + 1}`,
            title: truncatePhaseTitle(phase.title.replace(/^Phase \d+:\s*/i, "")),
            color: PHASE_COLORS[index] || "bg-gray-500",
            steps: phase.steps,
            progress,
        };
    });
};

/**
 * Transform API vehicle data to phase groups
 */
export const transformToPhaseGroups = (vehicleData: ApiVehicleData | null): PhaseGroup[] => {
    if (!vehicleData) return [];

    let globalStepNumber = 0;
    return vehicleData.timeline.map((phase, index) => ({
        id: `phase${index + 1}`,
        title: phase.title.toUpperCase(),
        color: PHASE_COLORS[index] || "bg-gray-500",
        steps: phase.steps.map((step, stepIndex) => {
            globalStepNumber++;
            return {
                id: step.id,
                number: stepIndex + 1,
                globalStepNumber,
                title: step.stepName,
                status: step.status,
                notes: step.notes,
                imageUrl: step.imageUrl,
            };
        }),
    }));
};

/**
 * Calculate total and completed steps
 */
export const calculateStepProgress = (
    phaseGroups: PhaseGroup[]
): { total: number; completed: number } => {
    const total = phaseGroups.reduce((acc, phase) => acc + phase.steps.length, 0);
    const completed = phaseGroups.reduce(
        (acc, phase) => acc + phase.steps.filter((s) => s.status === "COMPLETED").length,
        0
    );

    return { total, completed };
};

/**
 * Mandatory step numbers that require document uploads
 * These are global sequential step numbers across all phases
 * Extracted from MANDATORY_ATTACHMENTS configuration
 */
export const MANDATORY_STEP_NUMBERS = [8, 9, 15, 16, 18, 21, 22, 25, 28, 33, 34];

/**
 * Check if a step is a mandatory attachment step
 * @param globalStepNumber - The global sequential step number across all phases
 */
export const isMandatoryStep = (globalStepNumber: number): boolean => {
    return MANDATORY_STEP_NUMBERS.includes(globalStepNumber);
};

