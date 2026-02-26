"use client";
import React from "react";
import { createPortal } from "react-dom";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";

interface LogoutConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutConfirmModal({
  isOpen,
  onClose,
  onConfirm,
}: LogoutConfirmModalProps) {
  const modalContent = (
    <Modal isOpen={isOpen} onClose={onClose} className="max-w-[400px] m-4">
      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="shrink-0 w-12 h-12 rounded-full bg-error-100 dark:bg-error-900/20 flex items-center justify-center">
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Sign Out
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Are you sure you want to sign out?
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 justify-end">
          <Button
            type="button"
            size="sm"
            variant="outline"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={onConfirm}
            className="bg-error-500 hover:bg-error-600 text-white"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </Modal>
  );

  // Use portal to render modal at document body level to avoid positioning issues
  if (typeof window === "undefined") {
    return null;
  }

  return isOpen ? createPortal(modalContent, document.body) : null;
}

