"use client";
import React from "react";
import { AdminProfile } from "@/lib/api/profile";
import { displayValue } from "@/shared/constants/commons";

interface ProfileContentProps {
  adminProfile?: AdminProfile | null;
  onUpdate?: () => void;
}

export default function UserAddressCard({ adminProfile, onUpdate }: ProfileContentProps) {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
          Address
        </h4>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Country
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {displayValue(adminProfile?.country)}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              City/State
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {displayValue(adminProfile?.city)}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Postal Code
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {displayValue(adminProfile?.postalCode)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
