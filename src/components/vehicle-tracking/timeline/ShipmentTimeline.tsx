import React from "react";
import TimelineStepItem from "./TimelineStepItem";
import { TimelineStep } from "./types";

interface ShipmentTimelineProps {
  steps: TimelineStep[];
  onUpdate?: (stepId: string) => void;
}

// Move helper function outside component to prevent recreation
const getLineColorAbove = (steps: TimelineStep[], currentIndex: number) => {
  const prevStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
  
  if (prevStep && prevStep.status === "COMPLETED") {
    return "bg-success-500";
  }
  return "bg-gray-300 dark:bg-gray-700";
};

const ShipmentTimeline: React.FC<ShipmentTimelineProps> = ({
  steps,
  onUpdate,
}) => {
  // Timeline items
  const timelineItems = steps.map((step, index) => {
    return (
      <TimelineStepItem
        key={step.id}
        step={step}
        index={index}
        isLast={index === steps.length - 1}
        lineColorAbove={getLineColorAbove(steps, index)}
        onUpdate={onUpdate}
      />
    );
  });

  return (
    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-lg font-bold text-gray-800 dark:text-white/90 mb-6">
        Shipment Timeline
      </h3>

      <div className="relative">
        <div className="space-y-6">
          {timelineItems}
        </div>
      </div>
    </div>
  );
};

export default ShipmentTimeline;

