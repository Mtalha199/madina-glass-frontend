import React from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";

/**
 * Generic form modal wrapper - Single source of truth for modal structure
 */
interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  onSubmit: () => void | Promise<void>;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  isLoading?: boolean;
  className?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  title,
  onSubmit,
  onCancel,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  isSubmitting = false,
  isLoading = false,
  className = "max-w-[600px] p-5 lg:p-10",
  children,
  footer,
}) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  const defaultFooter = (
    <div className="flex items-center justify-end w-full gap-3 mt-8">
      <Button
        size="sm"
        variant="outline"
        onClick={handleCancel}
        disabled={isSubmitting || isLoading}
      >
        {cancelLabel}
      </Button>
      <Button
        size="sm"
        onClick={onSubmit}
        disabled={isSubmitting || isLoading}
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </Button>
    </div>
  );

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} className={className}>
      <h4 className="font-semibold text-gray-800 mb-6 text-title-sm dark:text-white/90">
        {title}
      </h4>
      <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
        {children}
        {footer !== undefined ? footer : defaultFooter}
      </form>
    </Modal>
  );
};

