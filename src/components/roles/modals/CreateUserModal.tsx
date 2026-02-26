"use client";

import React, { useMemo, useCallback, useEffect } from "react";
import { FormModal } from "./FormModal";
import { FormField, TextInput, SelectInput } from "../utils/formFields";
import { useZodForm } from "../hooks/useZodForm";
import { createUserSchema, CreateUserFormData } from "../utils/schemas";
import { Role } from "@/shared/types/permissions";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: { name: string; email: string; password: string; roleId: string }) => Promise<void>;
  roles: Role[];
  isLoading?: boolean;
  isSaving?: boolean;
}

const initialFormValues: CreateUserFormData = {
  name: "",
  email: "",
  password: "",
  roleId: "",
};

const CreateUserModal: React.FC<CreateUserModalProps> = React.memo(({
  isOpen,
  onClose,
  onSave,
  roles,
  isLoading = false,
  isSaving = false,
}) => {
  const { values, errors, setValue, validate, reset } = useZodForm({
    initialValues: initialFormValues,
    schema: createUserSchema,
  });

  const roleOptions = useMemo(
    () => roles.map((role) => ({ value: role.id, label: role.name })),
    [roles]
  );

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
        console.error("Error creating user:", error);
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
      title="Create User"
      onSubmit={handleSubmit}
      submitLabel="Create User"
      isSubmitting={isSaving}
      isLoading={isLoading}
    >
      <FormField label="Full Name" error={errors.name}>
        <TextInput
          id="user-name"
          value={values.name}
          onChange={(value) => setValue("name", value)}
          placeholder="e.g., John Doe"
          error={!!errors.name}
        />
      </FormField>

      <FormField label="Email" error={errors.email}>
        <TextInput
          id="user-email"
          type="email"
          value={values.email}
          onChange={(value) => setValue("email", value)}
          placeholder="e.g., john.doe@example.com"
          error={!!errors.email}
        />
      </FormField>

      <FormField label="Password" error={errors.password} hint="Minimum 6 characters">
        <TextInput
          id="user-password"
          type="password"
          value={values.password}
          onChange={(value) => setValue("password", value)}
          placeholder="Enter password"
          error={!!errors.password}
        />
      </FormField>

      <FormField label="Role" error={errors.roleId}>
        <SelectInput
          id="user-role"
          value={values.roleId}
          onChange={(value) => setValue("roleId", value)}
          options={roleOptions}
          placeholder="Select a role"
          error={!!errors.roleId}
          isLoading={isLoading}
          loadingText="Loading roles..."
        />
      </FormField>
    </FormModal>
  );
});

CreateUserModal.displayName = "CreateUserModal";

export default CreateUserModal;
