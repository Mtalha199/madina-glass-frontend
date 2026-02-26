import React from "react";
// import { ShipmentTimeline, TimelineStep } from "../timeline";
import { VehicleCardData } from "../types";
import HierarchicalTimeline from "../timeline/HierarchicalTimeline";

interface TimelineCardProps {
  vehicle: VehicleCardData;
  onUpdateStep: (stepId: string) => void;
}

export function TimelineCard({
  vehicle,
  onUpdateStep,
}: TimelineCardProps) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700">
      <div className="mb-2">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white/90 mb-1 transition-colors duration-200">
          Shipment Timeline
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-200">
          Track the progress of this vehicle through all checkpoints.
        </p>
      </div>
      
      {/* New Hierarchical Timeline */}
      <HierarchicalTimeline />

      {/* Old Timeline - Commented Out */}
      {/* {vehicle.timelineSteps.length > 0 ? (
        <ShipmentTimeline
          steps={vehicle.timelineSteps}
          onUpdate={onUpdateStep}
        />
      ) : (
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
          No timeline steps available.
        </p>
      )} */}
    </div>
  );
}

