import React from "react";
import { ApiVehicleData } from "../types";

interface MandatoryAttachmentsProps {
    vehicleData: ApiVehicleData | null;
}

interface MandatoryAttachment {
    label: string;
    steps: { stepNumber: number; stepName: string }[];
    phase?: string;
}

const MANDATORY_ATTACHMENTS: MandatoryAttachment[] = [
    {
        label: "TPIN & TCC",
        steps: [
            { stepNumber: 8, stepName: "Customer TPIN & Tax Clearance Certificate (TCC) Uploaded" },
            { stepNumber: 9, stepName: "TPIN & TCC Verified" },
        ],
        phase: "Phase 2",
    },
    {
        label: "CE-20",
        steps: [{ stepNumber: 15, stepName: "Form CE-20 Shared with Customer" }],
        phase: "Phase 3",
    },
    {
        label: "Duty payment proof",
        steps: [{ stepNumber: 16, stepName: "Duty Payment Completed" }],
        phase: "Phase 3",
    },
    {
        label: "Inspection report",
        steps: [{ stepNumber: 18, stepName: "Physical Inspection Completed" }],
        phase: "Phase 3",
    },
    {
        label: "Release Order & CCC",
        steps: [
            { stepNumber: 21, stepName: "Release Order Issued" },
            { stepNumber: 22, stepName: "Customs Clearance Certificate (CCC) Issued" },
        ],
        phase: "Phase 3",
    },
    {
        label: "Vehicle checklists",
        steps: [
            { stepNumber: 25, stepName: "Vehicle Checklist Completed - Tunduma" },
            { stepNumber: 33, stepName: "Vehicle Checklist Completed - Final Destination" },
            { stepNumber: 34, stepName: "Vehicle Checklist Completed - Handover" },
        ],
        phase: "Phases 4-6",
    },
];

const findStepByNumber = (vehicleData: ApiVehicleData | null, stepNumber: number) => {
    if (!vehicleData) return null;
    let count = 0;
    for (const phase of vehicleData.timeline) {
        for (const step of phase.steps) {
            if (++count === stepNumber) return step;
        }
    }
    return null;
};

const hasDocument = (step: { imageUrl: string | null } | null) => Boolean(step?.imageUrl?.trim());

const CheckIcon = () => (
    <svg className="w-4 h-4 text-success-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
);

export const MandatoryAttachments: React.FC<MandatoryAttachmentsProps> = ({ vehicleData }) => (
    <div className="bg-white dark:bg-white/3 rounded-xl border border-gray-200 dark:border-gray-800 p-5 shadow-sm">
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-4">Mandatory Attachments</h3>
        <div className="space-y-3">
            {MANDATORY_ATTACHMENTS.map((attachment: MandatoryAttachment, i: number) => (
                <div key={i} className="space-y-1.5">
                    <div className="flex items-center gap-2 ml-4">
                        <p className="text-xs font-semibold text-gray-700 dark:text-gray-300">{attachment.label}</p>
                        {attachment.phase && <span className="text-xs text-gray-500 dark:text-gray-400">• {attachment.phase}</span>}
                    </div>
                    {attachment.steps.map((stepInfo, j) => {
                        const step = findStepByNumber(vehicleData, stepInfo.stepNumber);
                        const hasDoc = hasDocument(step);
                        return (
                            <div key={j} className="flex items-start gap-2 pl-6">
                                {hasDoc ? <CheckIcon /> : <div className="w-4 h-4 shrink-0 mt-0.5 rounded-full border-2 border-gray-300 dark:border-gray-600" />}
                                <div className="flex-1 min-w-0">
                                    <p className={`text-xs font-medium ${hasDoc ? "text-gray-800 dark:text-white/90" : "text-gray-500 dark:text-gray-400"}`}>
                                        {step?.stepName || stepInfo.stepName}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">Step {stepInfo.stepNumber}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </div>
    </div>
);

