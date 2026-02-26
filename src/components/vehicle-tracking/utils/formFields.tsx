import React from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import Select from "@/components/form/Select";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import { ChevronDownIcon } from "@/icons";

/**
 * Generic form field components for vehicle tracking
 */

interface FormFieldProps {
  label: string;
  error?: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  hint,
  required,
  children,
}) => (
  <div>
    <Label htmlFor={label.toLowerCase().replace(/\s+/g, "-")}>
      {label}
      {required && <span className="text-error-500">*</span>}
    </Label>
    {children}
    {error && <p className="mt-1.5 text-sm text-error-500">{error}</p>}
    {hint && !error && (
      <p className="mt-1.5 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
    )}
  </div>
);

interface TextInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "password";
  error?: boolean;
  disabled?: boolean;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  disabled,
}) => (
  <Input
    type={type}
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    error={!!error}
    disabled={disabled}
    className={disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""}
  />
);

interface SelectInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  placeholder?: string;
  error?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  isLoading,
  disabled,
}) => (
  <div className={`relative ${disabled ? "pointer-events-none opacity-60" : ""}`}>
    <Select
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      value={value}
      className={`${error ? "border-error-500" : ""} ${disabled ? "bg-gray-100 dark:bg-gray-800 cursor-not-allowed" : ""}`}
    />
    <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
      <ChevronDownIcon />
    </span>
    {isLoading && (
      <div className="mt-1.5">
        <Skeleton variant="text" height={16} width="30%" />
      </div>
    )}
  </div>
);

