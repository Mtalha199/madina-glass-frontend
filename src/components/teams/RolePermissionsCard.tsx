"use client";
import React from "react";
import ComponentCard from "../common/ComponentCard";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import { LockIcon, CalenderIcon } from "@/icons";

interface RolePermissionsCardProps {
  role: string;
  description: string;
  roleCreated: string;
}

export default function RolePermissionsCard({
  role,
  description,
  roleCreated,
}: RolePermissionsCardProps) {
  return (
    <ComponentCard
      title="Role & Permissions"
      className="h-full"
    >
      <div className="space-y-6">
        {/* Assigned Role */}
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
            Assigned Role
          </p>
          <Badge size="md" color="primary" variant="light">
            {role}
          </Badge>
        </div>

        {/* Description */}
        <div>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
            Description
          </p>
          <p className="text-sm font-medium text-gray-800 dark:text-white/90">
            {description}
          </p>
        </div>

        {/* Role Created */}
        <div className="flex items-start gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-lg dark:bg-gray-800 shrink-0">
            <CalenderIcon className="w-6 h-6 text-gray-800 dark:text-white/90" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
              Role Created
            </p>
            <p className="text-sm font-medium text-gray-800 dark:text-white/90">
              {roleCreated}
            </p>
          </div>
        </div>

        {/* Edit Permissions Button */}
        {/* <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
          <Button
            variant="outline"
            startIcon={<LockIcon className="w-4 h-4" />}
            onClick={() => {
              console.log("Edit permissions");
            }}
            className="w-full"
          >
            Edit Permissions
          </Button>
        </div> */}
      </div>
    </ComponentCard>
  );
}

