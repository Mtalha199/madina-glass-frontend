"use client";
import React from "react";
import { AdminProfile } from "@/lib/api/profile";
import { displayValue } from "@/shared/constants/commons";

interface ProfileContentProps {
  adminProfile?: AdminProfile | null;
  onUpdate?: () => void;
}

export default function UserInfoCard({ adminProfile, onUpdate }: ProfileContentProps) {
  return (
    <div className="p-5 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
      <div>
        <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">
          Personal Information
        </h4>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
             Name
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
             {displayValue(adminProfile?.name)}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Email address
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {displayValue(adminProfile?.email)}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Phone
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {displayValue(adminProfile?.phone)}
            </p>
          </div>

          <div>
            <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">
              Bio
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
             {displayValue(adminProfile?.role.name)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
