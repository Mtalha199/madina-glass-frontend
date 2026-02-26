"use client";

import React from "react";

export default function ContactInfoCard(props: any) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-lg bg-blue-light-50 dark:bg-blue-light-950 flex items-center justify-center shrink-0">
          {props.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">
            {props.label}
          </p>
          <p className="text-base font-semibold text-gray-900 dark:text-white wrap-break-word">
            {props.value}
          </p>
        </div>
      </div>
    </div>
  );
}

