import React from "react";
import Label from "@/components/form/Label";
import Input from "@/components/form/input/InputField";
import TextArea from "@/components/form/input/TextArea";
import Select from "@/components/form/Select";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import { ChevronDownIcon } from "@/icons";

/**
 * Generic form field components - Single source of truth for field rendering
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
  hint?: string;
}

export const TextInput: React.FC<TextInputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  error,
  hint,
}) => (
  <Input
    type={type}
    id={id}
    placeholder={placeholder}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    error={!!error}
    hint={hint}
  />
);

interface TextareaInputProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  error?: boolean;
  hint?: string;
}

export const TextareaInput: React.FC<TextareaInputProps> = ({
  id,
  value,
  onChange,
  placeholder,
  rows = 4,
  error,
  hint,
}) => (
  <TextArea
    id={id}
    placeholder={placeholder}
    rows={rows}
    value={value}
    onChange={onChange}
    error={!!error}
    hint={hint}
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
  loadingText?: string;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  id,
  value,
  onChange,
  options,
  placeholder = "Select an option",
  error,
  isLoading,
  loadingText = "Loading...",
}) => (
  <div className="relative">
    <Select
      options={options}
      placeholder={placeholder}
      onChange={onChange}
      defaultValue={value}
      className={error ? "border-error-500" : ""}
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

