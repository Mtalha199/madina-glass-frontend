import React from "react";
import { CheckIcon, ClockIcon } from "./TimelineIcons";
import { TimelineStep } from "./types";

interface TimelineStepIconProps {
  status: TimelineStep["status"];
}

const TimelineStepIcon: React.FC<TimelineStepIconProps> = ({ status }) => {
  switch (status) {
    case "COMPLETED":
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-success-500 shrink-0">
          <CheckIcon className="w-4 h-4 text-white" />
        </div>
      );
    case "IN_PROGRESS":
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-brand-500 shrink-0">
          <ClockIcon className="w-4 h-4 text-white" />
        </div>
      );
    case "BLOCKED":
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-error-500 shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
      );
    case "PENDING":
    default:
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full border-2 border-gray-300 bg-transparent dark:border-gray-600 shrink-0">
          <div className="w-3 h-3 rounded-full border-2 border-gray-400 bg-transparent dark:border-gray-500" />
        </div>
      );
  }
};

export default TimelineStepIcon;

