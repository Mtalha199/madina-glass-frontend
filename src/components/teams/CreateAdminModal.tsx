"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import Select from "../form/Select";
import Toast from "../ui/toast/Toast";
import { adminsApi, CreateAdminRequest } from "@/lib/api/admins";
import { rolesApi, RoleResponse } from "@/lib/api/roles";

interface CreateAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateAdminModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateAdminModalProps) {
  const [formData, setFormData] = useState<CreateAdminRequest>({
    name: "",
    email: "",
    password: "",
    roleId: 0,
  });
  const [roles, setRoles] = useState<RoleResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingRoles, setLoadingRoles] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const fetchRoles = useCallback(async () => {
    try {
      setLoadingRoles(true);
      const rolesData = await rolesApi.getRoles();
      setRoles(rolesData);
      // Set default role if roles are loaded and no role is selected
      setFormData((prev) => {
        if (rolesData.length > 0 && prev.roleId === 0) {
          return { ...prev, roleId: rolesData[0].id };
        }
        return prev;
      });
    } catch (err) {
      console.error("Error fetching roles:", err);
    } finally {
      setLoadingRoles(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      fetchRoles();
    }
  }, [isOpen, fetchRoles]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    // Validate roleId
    if (!formData.roleId || formData.roleId === 0) {
      setErrors({ roleId: "Please select a role" });
      setLoading(false);
      return;
    }

    try {
      await adminsApi.createAdmin(formData);
      setToast({
        message: "Admin created successfully",
        type: "success",
        isVisible: true,
      });
      onSuccess();
      setTimeout(() => {
        onClose();
        setFormData({ name: "", email: "", password: "", roleId: roles.length > 0 ? roles[0].id : 0 });
        setErrors({});
      }, 1000);
    } catch (err: any) {
      const errorData = err.response?.data;
      const fieldErrors: Record<string, string> = {};
      
      if (errorData?.errors && Array.isArray(errorData.errors)) {
        // Handle array of errors
        errorData.errors.forEach((e: { field: string; message: string }) => {
          // Map common field names to form field names
          const fieldName = e.field === "email" ? "email" 
            : e.field === "password" ? "password" 
            : e.field === "name" ? "name" 
            : e.field === "roleId" || e.field === "role" ? "roleId" 
            : e.field;
          fieldErrors[fieldName] = e.message;
        });
      }
      
      // Also check the main message for field-specific errors
      const errorMessage = errorData?.message || "Failed to create admin";
      const lowerMessage = errorMessage.toLowerCase();
      
      if (lowerMessage.includes("email") && !fieldErrors.email) {
        fieldErrors.email = errorMessage;
      } else if (lowerMessage.includes("password") && !fieldErrors.password) {
        fieldErrors.password = errorMessage;
      } else if (lowerMessage.includes("name") && !fieldErrors.name) {
        fieldErrors.name = errorMessage;
      } else if (lowerMessage.includes("role") && !fieldErrors.roleId) {
        fieldErrors.roleId = errorMessage;
      }
      
      // Set field errors if any
      if (Object.keys(fieldErrors).length > 0) {
        setErrors(fieldErrors);
      } else {
        // Only show toast if no field-specific errors
        setToast({
          message: errorMessage,
          type: "error",
          isVisible: true,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[600px] m-4">
      <div className="no-scrollbar relative w-full max-w-[600px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <div className="px-2 pr-14">
          <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
            Add Admin User
          </h4>
          <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
            Create a new admin user with the specified role and permissions.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
            <div className="space-y-5">
              <div>
                <Label>Full Name</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  error={!!errors.name}
                  hint={errors.name}
                  required
                />
              </div>
              <div>
                <Label>Email Address</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  error={!!errors.email}
                  hint={errors.email}
                  required
                />
              </div>
              <div>
                <Label>Password</Label>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  error={!!errors.password}
                  hint={errors.password}
                  required
                />
              </div>
              <div>
                <Label>Role</Label>
                <Select
                  options={roles.map((role) => ({
                    value: role.id.toString(),
                    label: role.name,
                  }))}
                  placeholder={loadingRoles ? "Loading roles..." : "Select role"}
                  value={formData.roleId > 0 ? formData.roleId.toString() : ""}
                  onChange={(value) =>
                    setFormData({ ...formData, roleId: value ? parseInt(value, 10) : 0 })
                  }
                  disabled={loadingRoles}
                />
                {errors.roleId && (
                  <p className="mt-1 text-sm text-error-500 dark:text-error-400">{errors.roleId}</p>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
            <Button size="sm" variant="outline" onClick={onClose} type="button">
              Cancel
            </Button>
            <Button size="sm" type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Admin"}
            </Button>
          </div>
        </form>
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </Modal>
  );
}

