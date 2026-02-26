"use client";
import React, { useState } from "react";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useZodForm } from "./hooks/useZodForm";
import { changePasswordSchema, ChangePasswordFormData } from "./utils/schemas";
import { ProfileApi } from "@/lib/api/profile";
import { LockIcon, CheckCircleIcon, AlertIcon } from "@/icons";

export default function AccountSettingsContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { values, errors, setValue, validate, reset } = useZodForm<ChangePasswordFormData>({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
    schema: changePasswordSchema,
  });

  const handleCancel = () => {
    reset();
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validate form
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      await ProfileApi.changePassword({
        oldPassword: values.currentPassword,
        newPassword: values.newPassword,
      });

      setSuccess("Password updated successfully!");
      reset();
      
      // Clear success message after 3 seconds
      setTimeout(() => {
        setSuccess(null);
      }, 3000);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || "Failed to update password. Please try again.";
      setError(errorMessage);
      console.error("Error changing password:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      {/* Password Change Section */}
      <div className="col-span-12">
        <div className="relative overflow-hidden p-6 border border-gray-200 rounded-2xl bg-white shadow-sm transition-all duration-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 lg:p-8">
          {/* Decorative gradient background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-linear-to-br from-brand-50 to-transparent rounded-full blur-3xl opacity-50 dark:from-brand-900/20 dark:to-transparent" />
          
          {/* Header with icon */}
          <div className="relative flex items-center gap-3 mb-6">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-linear-to-br from-brand-500 to-brand-600 shadow-lg shadow-brand-500/20">
              <LockIcon className="w-6 h-6 text-white" />
            </div>
            <div>
              <h4 className="text-xl font-bold text-gray-800 dark:text-white/90">
                Change Password
              </h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                Update your account password to keep it secure
              </p>
            </div>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="relative mb-6 flex items-start gap-3 p-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50">
              <AlertIcon className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Error</p>
                <p className="mt-1 text-red-600 dark:text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="relative mb-6 flex items-start gap-3 p-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded-xl dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50">
              <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="font-medium">Success</p>
                <p className="mt-1 text-green-600 dark:text-green-400">{success}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="relative">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Current Password */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Current Password
                </Label>
                <Input
                  type="password"
                  placeholder="Enter your current password"
                  value={values.currentPassword}
                  onChange={(e) => setValue("currentPassword", e.target.value)}
                  error={!!errors.currentPassword}
                  hint={errors.currentPassword}
                  disabled={loading}
                  className="transition-all duration-200"
                />
              </div>

              {/* New Password */}
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  New Password
                </Label>
                <Input
                  type="password"
                  placeholder="Enter your new password"
                  value={values.newPassword}
                  onChange={(e) => setValue("newPassword", e.target.value)}
                  error={!!errors.newPassword}
                  hint={errors.newPassword}
                  disabled={loading}
                  className="transition-all duration-200"
                />
                {values.newPassword && !errors.newPassword && (
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
                    <CheckCircleIcon className="w-6 h-6" />
                    Password meets requirements
                  </p>
                )}
              </div>

              {/* Confirm New Password */}
              <div className="lg:col-span-2 space-y-2">
                <Label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Confirm New Password
                </Label>
                <Input
                  type="password"
                  placeholder="Re-enter your new password"
                  value={values.confirmNewPassword}
                  onChange={(e) => setValue("confirmNewPassword", e.target.value)}
                  error={!!errors.confirmNewPassword}
                  hint={errors.confirmNewPassword}
                  disabled={loading}
                  className="transition-all duration-200"
                />
                {values.confirmNewPassword && 
                 values.newPassword === values.confirmNewPassword && 
                 !errors.confirmNewPassword && (
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1 mt-1">
                    <CheckCircleIcon className="w-6 h-6" />
                    Passwords match
                  </p>
                )}
              </div>
            </div>

            {/* Password Requirements Hint */}
            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
              <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-2">
                Password Requirements:
              </p>
              <ul className="space-y-1 text-xs text-gray-500 dark:text-gray-500">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                  At least 4 characters long
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-gray-500" />
                  Must be different from your current password
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col-reverse sm:flex-row items-center gap-3 mt-8 pt-6 border-t border-gray-200 dark:border-gray-800 lg:justify-end">
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
                className="w-full sm:w-auto min-w-[120px] transition-all duration-200 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="sm"
                disabled={loading}
                className="w-full sm:w-auto min-w-[140px] bg-linear-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 shadow-lg shadow-brand-500/25 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </span>
                ) : (
                  "Update Password"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
