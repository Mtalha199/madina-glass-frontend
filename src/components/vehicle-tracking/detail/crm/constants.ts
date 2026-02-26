/**
 * CRM Detail Page Constants
 */

import { MandatoryAttachment } from "./types";

export const PHASE_COLORS = [
    "bg-blue-light-500",
    "bg-success-500",
    "bg-warning-500",
    "bg-theme-purple-500",
    "bg-error-500",
    "bg-blue-light-300",
];

export const MANDATORY_ATTACHMENTS: MandatoryAttachment[] = [
    { label: "TPIN & TCC", steps: "Phase 2" },
    { label: "CE-20", steps: "Phase 3" },
    { label: "Duty Payment Proof", steps: "Phase 3" },
    { label: "Inspection Report", steps: "Phase 3" },
    { label: "Release Order & CCC", steps: "Phase 3" },
    { label: "Vehicle Checklists", steps: "Phase 4-6" },
];

