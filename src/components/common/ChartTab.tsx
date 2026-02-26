import React, { useState } from "react";

export type TimeFilter = "7" | "30" | "90";

interface ChartTabProps {
  selected: TimeFilter;
  onChange: (filter: TimeFilter) => void;
}

const ChartTab: React.FC<ChartTabProps> = ({ selected, onChange }) => {
  const getButtonClass = (option: TimeFilter) =>
    selected === option
      ? "shadow-theme-xs text-gray-900 dark:text-white bg-white dark:bg-gray-800"
      : "text-gray-500 dark:text-gray-400";

  return (
    <div className="flex items-center gap-0.5 rounded-lg bg-gray-100 p-0.5 dark:bg-gray-900">
      <button
        onClick={() => onChange("7")}
        className={`px-3 py-2 font-medium w-20 rounded-md text-theme-sm transition-colors hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "7"
        )}`}
      >
        7 days
      </button>

      <button
        onClick={() => onChange("30")}
        className={`px-3 py-2 font-medium  rounded-md w-32 text-theme-sm transition-colors hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "30"
        )}`}
      >
        1 month
      </button>

      <button
        onClick={() => onChange("90")}
        className={`px-3 py-2 font-medium w-32 rounded-md text-theme-sm transition-colors hover:text-gray-900 dark:hover:text-white ${getButtonClass(
          "90"
        )}`}
      >
        3 months
      </button>
    </div>
  );
};

export default ChartTab;
