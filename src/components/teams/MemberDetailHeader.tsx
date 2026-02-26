"use client";
import React from "react";
import Link from "next/link";
import AvatarText from "../ui/avatar/AvatarText";
import Badge from "../ui/badge/Badge";
import Button from "../ui/button/Button";
import { ChevronLeftIcon, PencilIcon, TrashBinIcon } from "@/icons";
import useGoBack from "@/hooks/useGoBack";
import PermissionWrapper from "../permissions/PermissionWrapper";

interface MemberDetailHeaderProps {
  member: {
    id: number;
    name: string;
    role: string;
    status: "Active" | "Inactive";
  };
  onUpdate?: (updates: { name?: string; email?: string; role?: string }) => void;
  onDelete?: () => void;
  onStatusChange?: (newStatus: "active" | "inactive") => void;
  onEdit?: () => void;
  isStatusChanging?: boolean;
}

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

export default function MemberDetailHeader({
  member,
  onUpdate,
  onDelete,
  onStatusChange,
  onEdit,
  isStatusChanging = false,
}: MemberDetailHeaderProps) {
  const goBack = useGoBack();

  return (
    <div className="mb-6">
      <button
        onClick={goBack}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-4 transition-colors"
      >
        <ChevronLeftIcon className="w-4 h-4" />
        Back to Teams
      </button>

      <nav className="mb-6">
        <ol className="flex items-center gap-1.5">
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/admin/dashboard"
            >
              Dashboard
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li>
            <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/admin/teams"
            >
              Teams
              <svg
                className="stroke-current"
                width="17"
                height="16"
                viewBox="0 0 17 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6.0765 12.667L10.2432 8.50033L6.0765 4.33366"
                  stroke=""
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li>
            <span className="text-sm text-gray-800 dark:text-white/90">
              {member.name}
            </span>
          </li>
        </ol>
      </nav>

      <div className="p-6 border border-gray-200 rounded-2xl bg-white dark:border-gray-800 dark:bg-white/3">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <AvatarText name={member.name} className="h-16 w-16" />
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white/90 mb-2">
                {member.name}
              </h1>
              <div className="flex flex-wrap items-center gap-2">
                <Badge size="md" color="primary" variant="solid">
                  {member.role}
                </Badge>
                <Badge
                  size="md"
                  color={member.status === "Active" ? "success" : "error"}
                  variant="solid"
                >
                  {member.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <PermissionWrapper
              permissions={["adminUser.update"]}>
              <Button
                variant="outline"
                startIcon={<PencilIcon className="w-5 h-5" />}
                onClick={onEdit}
              >
                Edit
              </Button>
            </PermissionWrapper>
            {onStatusChange && (
              <Button
                variant="outline"
                onClick={() =>
                  onStatusChange(member.status === "Active" ? "inactive" : "active")
                }
                disabled={isStatusChanging}
                startIcon={isStatusChanging ? <Spinner /> : undefined}
              >
                {isStatusChanging
                  ? member.status === "Active"
                    ? "Deactivating..."
                    : "Activating..."
                  : member.status === "Active"
                    ? "Deactivate"
                    : "Activate"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
