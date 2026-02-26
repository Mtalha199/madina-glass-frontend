import React from "react";
import Link from "next/link";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { GroupIcon } from "@/icons";
import GearIcon from "./GearIcon";
import { Role } from "@/shared/types/permissions";
import PermissionWrapper from "../permissions/PermissionWrapper";
import { formatPermission } from "@/lib/utils";

interface RoleCardProps {
  role: Role;
  onEditPermissions?: (roleId: string) => void;
  onDeleteRole?: (roleId: string) => void;
  isDeleting?: boolean;
}

const RoleCard: React.FC<RoleCardProps> = ({ role, onEditPermissions, onDeleteRole, isDeleting }) => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-6">
      {/* Card Header with Badge, Name, and Actions */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 flex-wrap">
          <Badge variant="solid" color="warning" size="md">
            {formatPermission(role.identifier)}

          </Badge>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            {role.name}
          </h2>
        </div>

        <div className="flex items-center gap-2">

          {role.identifier !== process.env.NEXT_PUBLIC_SUPER_ADMIN_ROLE_ID &&
            (
              <PermissionWrapper permissions={['role.delete']}>
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-red-600 hover:bg-red-700 border-red-200 hover:border-red-300 dark:text-red-400 dark:border-red-800 dark:hover:border-red-700"
                  onClick={() => onDeleteRole?.(role.id)}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting…" : "Delete"}
                </Button>
              </PermissionWrapper>
            )}
          <PermissionWrapper permissions={['permission.update']}>
            <Button
              variant="outline"
              size="sm"
              startIcon={<GearIcon className="w-5 h-5" />}
              onClick={() => onEditPermissions?.(role.id)}
            >
              Edit Permissions
            </Button>
          </PermissionWrapper>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        {role.description}
      </p>

      {/* Assigned Users */}
      <div className="flex items-center gap-2 mb-6">
        <GroupIcon className="w-5 h-5 text-gray-500 dark:text-gray-400 shrink-0" />
        <Link
          href={`/admin/dashboard/roles/${role.id}/users`}
          className="text-sm text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-300 underline underline-offset-2"
        >
          {role.assignedUsersCount} users assigned
        </Link>
      </div>

      {/* Permissions Section */}
      <div>
        <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-2">
          Permissions
        </h3>
        {role.permissionNames && role.permissionNames.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {role.permissionNames.map((permissionName, index) => (
              <Badge key={`${role.id}-permission-${index}`} variant="light" color="primary" size="sm">
                {formatPermission(permissionName)}
              </Badge>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 dark:text-gray-500 italic">
            No permissions found
          </p>
        )}
      </div>
    </div>
  );
};

export default RoleCard;

