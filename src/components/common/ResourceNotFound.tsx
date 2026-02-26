"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "@/icons";

interface ResourceNotFoundProps {
  showGoBack?: boolean;
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  variant?: "default" | "empty" | "error";
}

const ResourceNotFound: React.FC<ResourceNotFoundProps> = ({
  showGoBack = true,
  title,
  message,
  icon,
  variant = "default",
}) => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  // Default content based on variant
  const getDefaultContent = () => {
    switch (variant) {
      case "empty":
        return {
          title: title || "No Data Available",
          message: message || "There are no items to display at the moment. Please check back later or try refreshing the page.",
          iconColor: "text-gray-400 dark:text-gray-500",
          bgColor: "bg-gray-50 dark:bg-gray-800/50",
        };
      case "error":
        return {
          title: title || "Something Went Wrong",
          message: message || "We encountered an error while loading this content. Please try again.",
          iconColor: "text-red-500 dark:text-red-400",
          bgColor: "bg-red-50 dark:bg-red-900/10",
        };
      default:
        return {
          title: title || "Content Not Found",
          message: message || "The requested content could not be found. It may have been moved or deleted.",
          iconColor: "text-gray-400 dark:text-gray-500",
          bgColor: "bg-gray-50 dark:bg-gray-800/50",
        };
    }
  };

  const content = getDefaultContent();

  // Default icon
  const defaultIcon = icon || (
    <svg
      className={`w-16 h-16 ${content.iconColor}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  );

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {/* Icon Container */}
      <div className={`flex items-center justify-center w-32 h-32 rounded-2xl ${content.bgColor} mb-6 transition-colors`}>
        {defaultIcon}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-3 text-center max-w-md">
        {content.title}
      </h2>

      {/* Message */}
      <p className="text-gray-500 dark:text-gray-400 mb-8 text-center max-w-lg leading-relaxed">
        {content.message}
      </p>

      {/* Action Buttons */}
      {showGoBack && (
        <div className="flex items-center justify-center">
          <button
            onClick={handleGoBack}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gray-300 dark:focus:ring-gray-600 focus:ring-offset-2"
          >
            <ChevronLeftIcon className="w-4 h-4" />
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};

export default ResourceNotFound;

