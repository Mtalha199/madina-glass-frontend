/**
 * Step Update Modal Component
 * Modal for updating step status, notes, and documents
 */

import React, { useState, useEffect, memo } from "react";
import Image from "next/image";
import { Modal } from "@/components/ui/modal";
import { TimelineStep, StepStatus } from "../types";
import { isMandatoryStep } from "../utils";

// Helper function to get the base URL without /api/v1 for static assets
const getBaseUrl = () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    // Remove /api/v1 if present, static files are served at root level
    return apiUrl.replace(/\/api\/v1$/, '');
};

// Helper function to construct image URL
const getImageUrl = (imageUrl: string | null): string | null => {
    if (!imageUrl) return null;

    // If already a full URL, return as is
    if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
        return imageUrl;
    }

    // Construct URL: baseUrl + imageUrl path
    // imageUrl is stored as "/uploads/timelines/filename.jpg"
    return `${getBaseUrl()}${imageUrl}`;
};

interface StepUpdateModalProps {
    isOpen: boolean;
    selectedStep: TimelineStep | null;
    selectedStatus: StepStatus | null;
    notes: string;
    isCompressing?: boolean;
    selectedFile: File | null;
    isSaving: boolean;
    fileError?: string | null;
    onClose: () => void;
    onStatusChange: (status: StepStatus) => void;
    onNotesChange: (notes: string) => void;
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onFileDrop: (e: React.DragEvent<HTMLDivElement>) => void;
    onFileDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
    onSave: () => void;
}

export const StepUpdateModal: React.FC<StepUpdateModalProps> = ({
    isOpen,
    selectedStep,
    selectedStatus,
    notes,
    isCompressing,
    selectedFile,
    isSaving,
    fileError,
    onClose,
    onStatusChange,
    onNotesChange,
    onFileChange,
    onFileDrop,
    onFileDragOver,
    onSave,
}) => {
    const [imageError, setImageError] = useState(false);

    // Reset image error when step changes
    useEffect(() => {
        setImageError(false);
    }, [selectedStep?.id]);

    if (!selectedStep) return null;

    const existingImageUrl = getImageUrl(selectedStep.imageUrl);

    // Normalize flags
    const requiresDocument = isMandatoryStep(selectedStep.globalStepNumber);
    const hasExistingImage = Boolean(existingImageUrl && !imageError);
    const missingRequiredDocument = requiresDocument && !selectedFile && !hasExistingImage;

    // Check if the document is a PDF
    const lowerUrl = existingImageUrl ? existingImageUrl.toLowerCase() : '';
    const isPdf = lowerUrl.endsWith('.pdf') || lowerUrl.includes('.pdf') || lowerUrl.includes('application/pdf');

    // Whether Save should be enabled
    const canSave = !isSaving && Boolean(selectedStatus) && !(selectedStatus === "COMPLETED" && missingRequiredDocument);

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            className="max-w-2xl max-h-[90vh] flex flex-col overflow-hidden"
        >
            <div className="flex flex-col h-full max-h-[90vh]">
                <div className="p-5 overflow-y-auto flex-1 min-h-0">
                    {/* Modal Header */}
                    <div className="flex items-center justify-center gap-3 mb-5">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-brand-500 shrink-0">
                            <span className="text-base font-semibold text-white">{selectedStep.number}</span>
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl w-lg font-bold text-gray-800 dark:text-white/90 mb-1">
                                {selectedStep.title}
                            </h2>
                            <p className="text-xs text-gray-600 dark:text-gray-400">
                                Update status, add notes, upload documents, and assign team members.
                            </p>
                        </div>
                    </div>

                    {/* Modal Content */}
                    <div className="space-y-5">
                        {/* Step Status */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-3">
                                Step Status
                            </h3>
                            <div className="grid grid-cols-2 gap-2.5">
                                {/* Status Options */}
                                <StatusButton
                                    label="Pending"
                                    description="Not started yet"
                                    icon={<ClockIcon />}
                                    iconBg="bg-gray-300 dark:bg-gray-600"
                                    iconColor="text-gray-600 dark:text-gray-400"
                                    isSelected={selectedStatus === "PENDING"}
                                    onClick={() => onStatusChange("PENDING")}
                                />

                                <StatusButton
                                    label="In Progress"
                                    description="Currently being worked on"
                                    icon={<InProgress />}
                                    iconBg="bg-blue-light-500"
                                    iconColor="text-white"
                                    isSelected={selectedStatus === "IN_PROGRESS"}
                                    onClick={() => onStatusChange("IN_PROGRESS")}
                                />

                                <StatusButton
                                    label="Completed"
                                    description="Step finished successfully"
                                    icon={<CheckIcon />}
                                    iconBg="bg-success-500"
                                    iconColor="text-white"
                                    isSelected={selectedStatus === "COMPLETED"}
                                    onClick={() => onStatusChange("COMPLETED")}
                                    disabled={missingRequiredDocument}
                                />

                                <StatusButton
                                    label="Blocked"
                                    description="Cannot proceed - issue exists"
                                    icon={<WarningIcon />}
                                    iconBg="bg-error-500"
                                    iconColor="text-white"
                                    isSelected={selectedStatus === "BLOCKED"}
                                    onClick={() => onStatusChange("BLOCKED")}
                                />
                            </div>
                            {missingRequiredDocument && (
                                <p className="text-xs text-red-600 mt-2">
                                    This step requires a document before it can be marked Completed.
                                </p>
                            )}
                        </div>

                        {/* Notes */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-2.5">Notes</h3>
                            <textarea
                                value={notes}
                                onChange={(e) => onNotesChange(e.target.value)}
                                placeholder="Add any notes, observations, or issues..."
                                className="w-full min-h-[100px] px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm text-gray-800 dark:text-white/90 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-y"
                            />
                        </div>

                        {/* Upload Documents - Only show for mandatory steps */}
                        {requiresDocument && (
                            <div>
                                <h3 className="text-sm font-semibold text-gray-800 dark:text-white/90 mb-2.5">
                                    Documents
                                </h3>

                                {/* Existing Document Display */}
                                {hasExistingImage && (
                                    <div className="mb-4">
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                                            Current Document
                                        </p>
                                        <div className="relative w-full rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden bg-gray-50 dark:bg-gray-800/50">
                                            {isPdf ? (
                                                // PDF Display
                                                <div className="p-6 flex flex-col items-center justify-center min-h-[200px]">
                                                    <svg
                                                        className="w-16 h-16 text-red-500 mb-3"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                    <p className="text-sm font-medium text-gray-800 dark:text-white/90 mb-2">
                                                        PDF Document
                                                    </p>
                                                    {existingImageUrl ? <a
                                                        href={existingImageUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                                                    >
                                                        View PDF
                                                    </a> : <span className="text-xs text-gray-500 dark:text-gray-400">No document URL available</span>}
                                                </div>
                                            ) : (
                                                // Image Display
                                                <div className="relative aspect-video w-full">
                                                    {existingImageUrl && (<Image
                                                        src={existingImageUrl}
                                                        alt={selectedStep.title}
                                                        fill
                                                        className="object-contain"
                                                        unoptimized
                                                        onError={() => setImageError(true)}
                                                    />)}
                                                </div>
                                            )}
                                            <div className="absolute top-2 right-2">
                                                <button
                                                    type="button"
                                                    onClick={() => setImageError(true)}
                                                    className="px-2 py-1 text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Upload Area */}
                                {<div
                                    onDrop={onFileDrop}
                                    onDragOver={onFileDragOver}
                                    className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 bg-gray-50 dark:bg-gray-800/50 hover:border-gray-400 dark:hover:border-gray-500 transition-colors cursor-pointer"
                                    onClick={() => document.getElementById("file-input")?.click()}
                                >
                                    <div className="flex flex-col items-center justify-center text-center">
                                        <div className="mb-4">
                                            <UploadIcon />
                                        </div>
                                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                            {hasExistingImage
                                                ? "Upload a new document to replace the current one"
                                                : "Drag & drop files here, or click to select"}
                                        </p>
                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    document.getElementById("file-input")?.click();
                                                }}
                                            >
                                                Choose File
                                            </button>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {selectedFile ? selectedFile.name : "No file chosen"}
                                            </span>
                                        </div>
                                        <input
                                            id="file-input"
                                            type="file"
                                            accept="image/*,application/pdf"
                                            className="hidden"
                                            onChange={onFileChange}
                                            multiple={false}
                                        />
                                    </div>
                                </div>}
                                {/* File Error Display */}
                                {fileError && (
                                    <div className="mt-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 p-3">
                                        <p className="text-sm text-red-600 dark:text-red-400">{fileError}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-end gap-3 p-5 pt-4 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shrink-0">
                    <button
                        onClick={onClose}
                        disabled={isSaving}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onSave}
                        disabled={!canSave}
                        className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSaving ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

// Helper Components
interface StatusButtonProps {
    label: string;
    description: string;
    icon: React.ReactNode;
    iconBg: string;
    iconColor: string;
    isSelected: boolean;
    onClick: () => void;
    disabled?: boolean;
}

const StatusButton: React.FC<StatusButtonProps> = ({
    label,
    description,
    icon,
    iconBg,
    iconColor,
    isSelected,
    onClick,
    disabled,
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`flex justify-center items-start gap-2.5 p-3 rounded-lg border-2 transition-all text-left ${isSelected
                ? "border-brand-500 bg-brand-50 dark:bg-brand-500/10"
                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-white/3 hover:border-gray-300 dark:hover:border-gray-600"
                } ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
        >
            <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center shrink-0 mt-0.5`}>
                <div className={iconColor}>{icon}</div>
            </div>
            <div className="flex-1">
                <p className="font-medium text-gray-800 dark:text-white/90">{label}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{description}</p>
            </div>
        </button>
    );
};

// Icons
const ClockIcon = memo(() => (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
));

const InProgressComponent: React.FC = () => (
    <svg
        className="w-4 h-4"
        fill="none"
        viewBox="0 0 24 24"
    >
        <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
        />
        <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        />
    </svg>
);

export const InProgress = memo(InProgressComponent);

const CheckIcon = memo(() => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
    </svg>
));

const WarningIcon = () => (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
    </svg>
);

const UploadIcon = memo(() => (
    <svg className="w-12 h-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
    </svg>
));

