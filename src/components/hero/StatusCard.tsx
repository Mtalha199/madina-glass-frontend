"use client";

import React from "react";

// Simple component without proper TypeScript
export default function StatusCard(props: any) {
  // Default position
  let positionClass = "top-3 left-3 sm:left-auto sm:right-4 sm:top-4";
  
  // Check position and set class
  if (props.position === "top-left") {
    positionClass = "top-3 left-3 sm:top-4 sm:left-4";
  } else if (props.position === "bottom-left") {
    positionClass = "bottom-3 left-3 sm:bottom-4 sm:left-4";
  } else if (props.position === "bottom-center") {
    positionClass = "bottom-3 right-3 sm:right-auto sm:left-1/2 sm:-translate-x-1/2 sm:bottom-4";
  } else if (props.position === "bottom-right") {
    positionClass = "bottom-3 right-3 sm:bottom-4 sm:right-4";
  } else {
    // default is top-right
    positionClass = "top-3 left-3 sm:left-auto sm:right-4 sm:top-4";
  }

  return (
    <div className={"absolute " + positionClass + " bg-white rounded-lg border border-gray-200 shadow-theme-sm p-2.5 sm:p-3 dark:bg-gray-800 dark:border-gray-700 z-20 max-w-[calc(100%-1.5rem)] sm:max-w-none"}>
      <p className="text-[10px] sm:text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 sm:mb-1.5">
        {props.label}
      </p>
      <div className="flex items-center gap-1.5 sm:gap-2">
        {props.icon ? <span className="flex items-center">{props.icon}</span> : null}
        <span className="text-xs sm:text-sm font-medium text-gray-800 dark:text-white/90">
          {props.status}
        </span>
      </div>
    </div>
  );
}

