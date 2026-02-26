import React from "react";
import TimelineStepIcon from "./TimelineStepIcon";
import TimelineUpdateButton from "./TimelineUpdateButton";
import { AttachmentIcon } from "./TimelineIcons";
import { TimelineStepItemProps } from "./types";
import PermissionWrapper from "@/components/permissions/PermissionWrapper";

const TimelineStepItem: React.FC<TimelineStepItemProps> = ({
  step,
  index,
  isLast,
  lineColorAbove,
  onUpdate,
}) => {
  // Calculate line height based on spacing (space-y-6 = 1.5rem = 24px)
  const lineHeight = index === 0 ? 0 : "24px";

  return (
    <div className="relative flex items-start gap-4">
      {/* Vertical line segment above icon (except first item) */}
      {index > 0 && (
        <div
          className={`absolute left-4 w-0.5 ${lineColorAbove} z-0`}
          style={{
            top: "-24px",
            height: lineHeight,
          }}
        />
      )}

      {/* Icon */}
      <div className="relative z-10">
        <TimelineStepIcon status={step.status} />
      </div>

      {/* Vertical line segment below icon (except last item) */}
      {!isLast && (
        <div
          className={`absolute left-4 w-0.5 z-0 ${
            step.status === "COMPLETED"
              ? "bg-success-500"
              : "bg-gray-300 dark:bg-gray-700"
          }`}
          style={{
            top: "32px",
            height: "calc(100% - 32px + 24px)",
          }}
        />
      )}

      {/* Content */}
      <div className="flex-1 flex items-start justify-between gap-4 min-w-0">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            {step.title}
          </p>
          {step.subtitle && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              {step.subtitle}
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Add Attachment Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // TODO: Handle attachment addition
              console.log(`Add attachment for step ${step.id}`);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 text-gray-600 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300 whitespace-nowrap"
          >
            <AttachmentIcon className="w-3.5 h-3.5" />
            <span>Attachment</span>
          </button>

          {/* Update Button */}
       
       <PermissionWrapper permissions={['timeline.update']}>
          <TimelineUpdateButton
            status={step.status}
            stepId={step.id}
            onUpdate={onUpdate}
            />
            </PermissionWrapper>
        </div>
      </div>
    </div>
  );
};

export default TimelineStepItem;

