"use client";

import React from "react";
import { createPortal } from "react-dom";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm?: () => void | Promise<void>;
  title: string;
  message: string;
  /** When set, shows an info prompt with only an OK button (no confirm action). Use when the action is not allowed. */
  blockedMessage?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "default";
  isLoading?: boolean;
}

export default function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  blockedMessage,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  variant = "default",
  isLoading = false,
}: ConfirmModalProps) {
  const isDanger = variant === "danger";
  const isBlocked = !!blockedMessage;

  const handleConfirm = async () => {
    if (onConfirm) await onConfirm();
  };

  const iconContent = isBlocked ? (
    <svg
      className="w-6 h-6 text-warning-600 dark:text-warning-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ) : isDanger ? (
    <svg
      className="w-6 h-6 text-error-600 dark:text-error-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
      />
    </svg>
  ) : (
    <svg
      className="w-6 h-6 text-gray-600 dark:text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const displayMessage = isBlocked ? blockedMessage : message;
  const iconWrapperClass = isBlocked
    ? "bg-warning-100 dark:bg-warning-900/20"
    : isDanger
      ? "bg-error-100 dark:bg-error-900/20"
      : "bg-gray-100 dark:bg-gray-800";

  const modalContent = (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[400px] m-4">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${iconWrapperClass}`}
          >
            {iconContent}
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {displayMessage}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-end">
          {isBlocked ? (
            <Button type="button" size="sm" onClick={onClose}>
              OK
            </Button>
          ) : (
            <>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                {cancelLabel}
              </Button>
              <Button
                type="button"
                size="sm"
                onClick={handleConfirm}
                disabled={isLoading}
                className={
                  isDanger
                    ? "bg-error-500 hover:bg-error-600 text-white disabled:opacity-50"
                    : ""
                }
              >
                {isLoading ? "Please wait…" : confirmLabel}
              </Button>
            </>
          )}
        </div>
      </div>
    </Modal>
  );

  if (typeof window === "undefined") {
    return null;
  }

  return isOpen ? createPortal(modalContent, document.body) : null;
}
