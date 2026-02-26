/**
 * CRM Detail Page - Main Component
 * Vehicle tracking detail page with modular architecture
 */

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { VehicleDetailSkeleton } from "./VehicleDetailSkeleton";
import ResourceNotFound from "@/components/common/ResourceNotFound";

// Hooks
import { useVehicleDetailData } from "./crm/hooks/useVehicleDetailData";
import { useStepUpdate } from "./crm/hooks/useStepUpdate";

// Components
import { VehicleHeader } from "./crm/components/VehicleHeader";
import { PhasePipeline } from "./crm/components/PhasePipeline";
import { ProcessOverview } from "./crm/components/ProcessOverview";
import { MandatoryAttachments } from "./crm/components/MandatoryAttachments";
import { TimelinePhases } from "./crm/components/TimelinePhases";
import { StepUpdateModal } from "./crm/components/StepUpdateModal";

// Constants and Utils
import { transformToPhaseGroups, transformToPhasePipeline, calculateStepProgress } from "./crm/utils";
import { processImageForUpload } from "@/lib/utils/imageCompression";
import IssueUpgradeRequestModal from "../modals/IssueUpgradeRequestModal";


interface CRMDetailPageProps {
    vehicleId?: string;
}

const CRMDetailPage: React.FC<CRMDetailPageProps> = ({ vehicleId }) => {
    // State
    const [expandedPhases, setExpandedPhases] = useState<Set<string>>(
        new Set(["phase1", "phase2", "phase3", "phase4", "phase5", "phase6"])
    );
    const [issueUpgradeRequestModalOpen, setIssueUpgradeRequestModalOpen] = useState(false);
    const [isEditSaving, setIsEditSaving] = useState(false);
    const [fileError, setFileError] = useState<string | null>(null);


    // Custom Hooks
    const { vehicleData, isLoading, error, refetchVehicle } = useVehicleDetailData(vehicleId);
    const {
        isModalOpen,
        selectedStep,
        selectedStatus,
        notes,
        selectedFile,
        isSaving,
        openStepModal,
        closeStepModal,
        setSelectedStatus,
        setNotes,
        setSelectedFile,
        handleSaveStep,
    } = useStepUpdate();

    // Derived Data
    const phaseGroups = transformToPhaseGroups(vehicleData);
    const phases = transformToPhasePipeline(vehicleData);
    const { total: totalSteps, completed: completedSteps } = calculateStepProgress(phaseGroups);

    // Event Handlers
    const togglePhase = (phaseId: string) => {
        setExpandedPhases((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(phaseId)) {
                newSet.delete(phaseId);
            } else {
                newSet.add(phaseId);
            }
            return newSet;
        });
    };

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Check if it's a PDF (allow PDFs without compression)
            const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

            if (isPdf) {
                // For PDFs, set directly without compression
                setSelectedFile(file);
                setFileError(null);
            } else {

                try {
                    const result = await processImageForUpload(file, {
                        maxSizeBytes: 1024 * 1024, // 1MB
                        preferQuality: true,
                        maintainAspectRatio: true
                    });

                    console.log("Image compression result:", result);

                    if (!result.success) {
                        setFileError(result.error || "Failed to process image");
                        return;
                    }

                    setSelectedFile(result.file!);
                    setFileError(null);
                } catch (error) {
                    setFileError("An error occurred while processing the image");
                    console.error("Compression error:", error);
                }
            }
        }
    };

    const handleFileDrop = async (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];

            // Check if it's a PDF (allow PDFs without compression)
            const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');

            if (isPdf) {
                // For PDFs, set directly without compression
                setSelectedFile(file);
                setFileError(null);
            } else {

                try {
                    const result = await processImageForUpload(file, {
                        maxSizeBytes: 1024 * 1024, // 1MB
                        preferQuality: true,
                        maintainAspectRatio: true
                    });

                    if (!result.success) {
                        setFileError(result.error || "Failed to process image");
                        return;
                    }

                    setSelectedFile(result.file!);
                    setFileError(null);
                } catch (error) {
                    setFileError("An error occurred while processing the image");
                    console.error("Compression error:", error);
                }
            }
        }
    };

    const handleFileDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleSave = async () => {
        if (!vehicleId) return;
        await handleSaveStep(vehicleId, refetchVehicle);
    };

    // Loading State
    if (isLoading) {
        return <VehicleDetailSkeleton />;
    }

    // Error State
    if (error || !vehicleData) {
        return (
            <div>
                <Link
                    href="/admin/vehicle/trackings"
                    className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white/90 mb-4 transition-all duration-200 ease-in-out hover:gap-3 group"
                >
                    <svg
                        className="w-4 h-4 transition-transform duration-200 ease-in-out group-hover:-translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                        />
                    </svg>
                    Back to tracking
                </Link>
                <div className="mt-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
                    <ResourceNotFound showGoBack={false} />
                </div>
            </div>
        );
    }

    // Main Render
    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            {/* Vehicle Header */}
            <VehicleHeader vehicleData={vehicleData} onIssueClick={() => setIssueUpgradeRequestModalOpen(true)} />

            {/* Phase Pipeline */}
            <PhasePipeline phases={phases} />


            {/* Main Content */}
            <div className="flex gap-6">
                {/* Left Sidebar */}
                <div className="w-80 space-y-4 shrink-0">
                    <ProcessOverview
                        vehicleData={vehicleData}
                        totalSteps={totalSteps}
                        completedSteps={completedSteps}
                    />
                    {vehicleData.customerType === "ZAMBIAN_IMPORT" && <MandatoryAttachments vehicleData={vehicleData} />}
                </div>

                {/* Right Main Content - Timeline */}
                <div className="flex-1">
                    <TimelinePhases
                        phaseGroups={phaseGroups}
                        expandedPhases={expandedPhases}
                        onTogglePhase={togglePhase}
                        onStepClick={openStepModal}
                    />
                </div>
            </div>

            {/* Edit Vehicle Modal */}
            <IssueUpgradeRequestModal
                isOpen={issueUpgradeRequestModalOpen}
                onClose={() => setIssueUpgradeRequestModalOpen(false)}
                vehicle={
                    vehicleData
                        ? {
                            referenceNumber: vehicleData.vin,
                            id: String(vehicleData.id),
                            status: vehicleData.customerType === "ZIMBABWE_TRANSIT" ? "Zimbabwe Transit" : "Zambian Import",
                            route: vehicleData.route,
                            destination: vehicleData.finalDestination,
                            city: vehicleData.finalDestination,
                        }
                        : null
                }
                onSave={() => refetchVehicle()}
                isSaving={isEditSaving}
            />

            {/* Step Update Modal */}
            <StepUpdateModal
                isOpen={isModalOpen}
                selectedStep={selectedStep}
                selectedStatus={selectedStatus}
                notes={notes}
                selectedFile={selectedFile}
                isSaving={isSaving}
                fileError={fileError}
                onClose={closeStepModal}
                onStatusChange={setSelectedStatus}
                onNotesChange={setNotes}
                onFileChange={handleFileChange}
                onFileDrop={handleFileDrop}
                onFileDragOver={handleFileDragOver}
                onSave={handleSave}
            />
        </div>
    );
};

export default CRMDetailPage;
