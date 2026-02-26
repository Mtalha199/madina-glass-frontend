/**
 * Hook for managing step update logic
 */

import { useState } from "react";
import apiClient from "@/lib/api/config";
import { TimelineStep, StepStatus } from "../types";

interface UseStepUpdateReturn {
    isModalOpen: boolean;
    selectedStep: TimelineStep | null;
    selectedStatus: StepStatus | null;
    notes: string;
    selectedFile: File | null;
    isSaving: boolean;
    openStepModal: (step: TimelineStep) => void;
    closeStepModal: () => void;
    setSelectedStatus: (status: StepStatus | null) => void;
    setNotes: (notes: string) => void;
    setSelectedFile: (file: File | null) => void;
    handleSaveStep: (vehicleId: string, onSuccess: () => void) => Promise<void>;
}

export const useStepUpdate = (): UseStepUpdateReturn => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStep, setSelectedStep] = useState<TimelineStep | null>(null);
    const [selectedStatus, setSelectedStatus] = useState<StepStatus | null>(null);
    const [notes, setNotes] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isSaving, setIsSaving] = useState(false);

    const openStepModal = (step: TimelineStep) => {
        setSelectedStep(step);
        setSelectedStatus(step.status);
        setNotes(step.notes || "");
        setIsModalOpen(true);
    };

    const closeStepModal = () => {
        setIsModalOpen(false);
        setSelectedStep(null);
        setSelectedStatus(null);
        setNotes("");
        setSelectedFile(null);
    };

    const handleSaveStep = async (vehicleId: string, onSuccess: () => void) => {
        if (!selectedStep || !selectedStatus) return;

        try {
            setIsSaving(true);

            // Create FormData for file upload support
            const formData = new FormData();
            
            // Append status (required)
            const statusValue = selectedStatus === "SKIPPED" ? "PENDING" : selectedStatus;
            formData.append("status", statusValue);

            // Append notes if provided
            if (notes && notes.trim()) {
                formData.append("notes", notes.trim());
            }

            // Append image file if provided (key: "image")
            if (selectedFile) {
                formData.append("image", selectedFile);
            }

            // Send FormData with multipart/form-data header
            const response = await apiClient.patch(
                `/timeline/steps/${selectedStep.id}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (response.data.success) {
                onSuccess();
                closeStepModal();
            }
        } catch (err: any) {
            console.error("Failed to update step:", err);
            // Error logged to console - could implement toast notification here
        } finally {
            setIsSaving(false);
        }
    };

    return {
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
    };
};

