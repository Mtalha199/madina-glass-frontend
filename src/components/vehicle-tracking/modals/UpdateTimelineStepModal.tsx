"use client";

import React, { useEffect, useState } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Label from "@/components/form/Label";
import Select from "@/components/form/Select";
import TextArea from "@/components/form/input/TextArea";
import { ChevronDownIcon } from "@/icons";
import { TimelineStep, StepStatus } from "../timeline";
import { useZodForm } from "../hooks/useZodForm";
import { updateTimelineStepSchema, UpdateTimelineStepFormData } from "../utils/schemas";

interface UpdateTimelineStepModalProps {
  isOpen: boolean;
  onClose: () => void;
  step: TimelineStep | null;
  onSave: (stepId: string, status: StepStatus, notes: string) => void | Promise<void>;
  isSaving?: boolean;
}

const MAX_NOTES_LENGTH = 500;

const initialFormValues: UpdateTimelineStepFormData = {
  status: "PENDING",
  notes: "",
};

const UpdateTimelineStepModal: React.FC<UpdateTimelineStepModalProps> = ({
  isOpen,
  onClose,
  step,
  onSave,
  isSaving = false,
}) => {
  const {
    values,
    errors,
    setValue,
    validate,
    reset,
    setFormValues,
  } = useZodForm({
    initialValues: initialFormValues,
    schema: updateTimelineStepSchema,
  });

  // Reset form when modal opens with step data
  useEffect(() => {
    if (isOpen && step) {
      setFormValues({
        status: step.status,
        notes: step.subtitle || "",
      });
    }
  }, [isOpen, step, setFormValues]);

  async function handleSubmit() {
    if (!step) return;
    if (validate()) {
      try {
        await onSave(step.id, values.status as StepStatus, values.notes || "");
        onClose();
      } catch (error) {
        console.error("Error updating step:", error);
      }
    }
  }

  function handleCancel() {
    reset();
    onClose();
  }

  function handleNotesChange(value: string) {
    if (value.length <= MAX_NOTES_LENGTH) {
      setValue("notes", value);
    }
  }

  const statusOptions = [
    { value: "PENDING", label: "Pending" },
    { value: "IN_PROGRESS", label: "In Progress" },
    { value: "COMPLETED", label: "Completed" },
    { value: "BLOCKED", label: "Blocked" },
  ];

  const getStatusIcon = () => {
    switch (values.status) {
      case "COMPLETED":
        return (
          <svg className="w-4 h-4 text-success-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case "IN_PROGRESS":
        return (
          <svg className="w-4 h-4 text-brand-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "BLOCKED":
        return (
          <svg className="w-4 h-4 text-error-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
        );
      case "PENDING":
      default:
        return (
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="9" strokeWidth={2} />
          </svg>
        );
    }
  };

  if (!step) return null;

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} className="max-w-[500px] p-5 lg:p-8">
      {/* Modal Header */}
      <div className="mb-6">
        <h4 className="text-xl font-bold text-gray-800 dark:text-white/90 mb-1">
          Update Timeline Step
        </h4>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {step.title}
        </p>
      </div>

      {/* Form */}
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
        {/* Status Select */}
        <div>
          <Label htmlFor="status">Status</Label>
          <div className="relative">
            <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
              {getStatusIcon()}
            </div>
            <Select
              options={statusOptions}
              value={values.status}
              onChange={(value) => setValue("status", value as StepStatus)}
              className="pl-10"
            />
            <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
              <ChevronDownIcon />
            </span>
          </div>
          {errors.status && <p className="mt-1.5 text-sm text-error-500">{errors.status}</p>}
        </div>

        {/* Notes Textarea */}
        <div>
          <Label htmlFor="notes">Notes (Optional)</Label>
          <TextArea
            id="notes"
            placeholder="Add notes about this step..."
            rows={4}
            value={values.notes || ""}
            onChange={handleNotesChange}
          />
          <p className="mt-1.5 text-xs text-gray-500 dark:text-gray-400">
            {(values.notes || "").length}/{MAX_NOTES_LENGTH} characters
          </p>
          {errors.notes && <p className="mt-1.5 text-sm text-error-500">{errors.notes}</p>}
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center justify-end w-full gap-3 mt-8">
          <Button
            size="sm"
            variant="outline"
            onClick={handleCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            size="sm"
            variant="primary"
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? "Updating..." : "Update Step"}
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default UpdateTimelineStepModal;
