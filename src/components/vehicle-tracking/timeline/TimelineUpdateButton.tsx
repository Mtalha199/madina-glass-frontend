import React from "react";
import { CheckIcon, ClockIcon, CircleIcon } from "./TimelineIcons";
import { TimelineStep } from "./types";

interface TimelineUpdateButtonProps {
  status: TimelineStep["status"];
  stepId: string;
  onUpdate?: (stepId: string) => void;
}

const TimelineUpdateButton: React.FC<TimelineUpdateButtonProps> = ({
  status,
  stepId,
  onUpdate,
}) => {
  const baseClasses = "inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200";

  switch (status) {
    case "COMPLETED":
      return (
        <button
          onClick={() => onUpdate?.(stepId)}
          className={`${baseClasses} text-success-500 hover:bg-success-50 hover:text-success-600 dark:hover:bg-success-500/10`}
        >
          <CheckIcon />
          Update
        </button>
      );
    case "IN_PROGRESS":
      return (
        <button
          onClick={() => onUpdate?.(stepId)}
          className={`${baseClasses} text-brand-500 hover:bg-brand-50 hover:text-brand-600 dark:hover:bg-brand-500/10`}
        >
          <ClockIcon />
          Update
        </button>
      );
    case "BLOCKED":
      return (
        <button
          onClick={() => onUpdate?.(stepId)}
          className={`${baseClasses} text-error-500 hover:bg-error-50 hover:text-error-600 dark:hover:bg-error-500/10`}
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
          </svg>
          Update
        </button>
      );
    case "PENDING":
    default:
      return (
        <button
          onClick={() => onUpdate?.(stepId)}
          className={`${baseClasses} text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300`}
        >
          <CircleIcon />
          Update
        </button>
      );
  }
};

export default TimelineUpdateButton;

