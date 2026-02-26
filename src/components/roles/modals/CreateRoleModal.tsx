"use client";

import React, { useCallback, useEffect } from "react";
import { FormModal } from "./FormModal";
import { FormField, TextInput, TextareaInput } from "../utils/formFields";
import { useZodForm } from "../hooks/useZodForm";
import { createRoleSchema, CreateRoleFormData } from "../utils/schemas";

interface CreateRoleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (roleData: { identifier: string; name: string; description: string }) => void | Promise<void>;
  isSaving?: boolean;
}

const initialFormValues: CreateRoleFormData = {
  identifier: "",
  name: "",
  description: "",
};

const CreateRoleModal: React.FC<CreateRoleModalProps> = React.memo(({
  isOpen,
  onClose,
  onSave,
  isSaving = false,
}) => {
  const { values, errors, setValue, validate, reset } = useZodForm({
    initialValues: initialFormValues,
    schema: createRoleSchema,
  });

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const handleSubmit = useCallback(async () => {
    if (validate()) {
      try {
        await onSave(values);
        reset();
        onClose();
      } catch (error) {
        console.error("Error creating role:", error);
      }
    }
  }, [validate, values, onSave, reset, onClose]);

  const handleCancel = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  return (
    <FormModal
      isOpen={isOpen}
      onClose={onClose}
      onCancel={handleCancel}
      title="Create Role"
      onSubmit={handleSubmit}
      submitLabel="Create Role"
      isSubmitting={isSaving}
    >
      <FormField label="Identifier" error={errors.identifier} hint="Lowercase letters, numbers, and underscores only">
        <TextInput
          id="identifier"
          value={values.identifier}
          onChange={(value) => setValue("identifier", value)}
          placeholder="e.g., admin, manager, user"
          error={!!errors.identifier}
        />
      </FormField>

      <FormField label="Name" error={errors.name}>
        <TextInput
          id="name"
          value={values.name}
          onChange={(value) => setValue("name", value)}
          placeholder="e.g., Administrator, Manager, User"
          error={!!errors.name}
        />
      </FormField>

      <FormField label="Description" error={errors.description}>
        <TextareaInput
          id="description"
          value={values.description}
          onChange={(value) => setValue("description", value)}
          placeholder="Enter role description"
          error={!!errors.description}
        />
      </FormField>
    </FormModal>
  );
});

CreateRoleModal.displayName = "CreateRoleModal";

export default CreateRoleModal;
