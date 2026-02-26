"use client";
import React from "react";
import ComponentCard from "../common/ComponentCard";
import { EnvelopeIcon, CalenderIcon, TimeIcon } from "@/icons";

interface ContactInformationCardProps {
  email: string;
  memberSince: string;
  lastUpdated: string;
}

export default function ContactInformationCard({
  email,
  memberSince,
  lastUpdated,
}: ContactInformationCardProps) {
  return (
    <ComponentCard
      title="Contact Information"
      className="h-full"
    >
      <div className="space-y-6">
        {/* Email */}
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800 shrink-0">
            <EnvelopeIcon className="w-5 h-5 text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Email Address
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90 break-all">
              {email}
            </p>
          </div>
        </div>

        {/* Member Since */}
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800 shrink-0">
            <CalenderIcon className="w-6 h-6 text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Member Since
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {memberSince}
            </p>
          </div>
        </div>

        {/* Last Updated */}
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800 shrink-0">
            <TimeIcon className="w-5 h-5 text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Last Updated
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}

