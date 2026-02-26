"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface ToastProps {
  message: string;
  type: "success" | "error" | "info" | "warning";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  isVisible,
  onClose,
  duration = 3000,
}: ToastProps) {
  const [mounted, setMounted] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle mounting for portal
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle visibility and animation
  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // Trigger animation after a small delay to ensure DOM is ready
      setTimeout(() => setIsAnimating(true), 10);
      
      // Auto-close timer
      const timer = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          setShouldRender(false);
          onClose();
        }, 300); // Wait for exit animation
      }, duration);
      
      return () => clearTimeout(timer);
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, 300); // Wait for exit animation
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!mounted || !shouldRender || !message) return null;

  const typeClasses = {
    success:
      "bg-success-50 border-success-500 text-success-700 dark:bg-success-500/15 dark:border-success-500/30 dark:text-success-400",
    error:
      "bg-error-50 border-error-500 text-error-700 dark:bg-error-500/15 dark:border-error-500/30 dark:text-error-400",
    info: "bg-blue-light-50 border-blue-light-500 text-blue-light-700 dark:bg-blue-light-500/15 dark:border-blue-light-500/30 dark:text-blue-light-400",
    warning:
      "bg-warning-50 border-warning-500 text-warning-700 dark:bg-warning-500/15 dark:border-warning-500/30 dark:text-warning-400",
  };

  const icons = {
    success: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    error: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    info: (
      <svg
        className="w-5 h-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    ),
    warning: (
      <svg
        className="w-5 h-5"
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
    ),
  };

  const toastContent = (
    <div
      className={`fixed top-4 right-4 z-[999999] flex items-center gap-3 rounded-lg border p-4 shadow-lg transition-all duration-300 ease-out ${
        isAnimating 
          ? "translate-x-0 opacity-100" 
          : "translate-x-full opacity-0 pointer-events-none"
      } ${typeClasses[type]}`}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex-shrink-0">{icons[type]}</div>
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => {
          setIsAnimating(false);
          setTimeout(() => {
            setShouldRender(false);
            onClose();
          }, 300);
        }}
        className="ml-2 flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity"
        aria-label="Close notification"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );

  // Render using portal to body to avoid z-index and overflow issues
  // Check if document.body exists (for SSR safety)
  if (typeof document !== "undefined" && document.body) {
    return createPortal(toastContent, document.body);
  }
  return null;
}

