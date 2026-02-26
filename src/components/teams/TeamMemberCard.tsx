"use client";
import React, { useState } from "react";
import Link from "next/link";
import AvatarText from "../ui/avatar/AvatarText";
import Badge from "../ui/badge/Badge";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { HorizontaLDots, EnvelopeIcon, CalenderIcon, ArrowRightIcon } from "@/icons";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  joinedDate: string;
  status: "Active" | "Inactive";
}

interface TeamMemberCardProps {
  member: TeamMember;
  onStatusChange?: (id: number, currentStatus: "Active" | "Inactive") => void;
  onEditPassword?: (member: TeamMember) => void;
}

export default function TeamMemberCard({ member, onStatusChange, onEditPassword }: TeamMemberCardProps) { 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleToggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);
  const handleCloseDropdown = () => setIsDropdownOpen(false);

  const handleStatusToggle = () => {
    if (onStatusChange) {
      onStatusChange(member.id, member.status);
    }
    handleCloseDropdown();
  };

  return (
    <div className="relative p-5 border border-gray-200 rounded-2xl bg-white dark:border-gray-800 dark:bg-white/3">
      <div className="absolute top-4 right-4">
        <div className="relative">
          <button
            onClick={handleToggleDropdown}
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            aria-label="Actions"
          >
            <HorizontaLDots className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
          <Dropdown
            isOpen={isDropdownOpen}
            onClose={handleCloseDropdown}
            className="min-w-[160px] py-1"
          >
            <DropdownItem
              onClick={() => {
                window.location.href = `/admin/teams/member/${member.id}`;
                handleCloseDropdown();
              }}
              baseClassName="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-gray-200"
            >
              View Details
            </DropdownItem>
            <DropdownItem
              onClick={() => {
                if (onEditPassword) {
                  onEditPassword(member);
                }
                handleCloseDropdown();
              }}
              baseClassName="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-gray-200"
            >
              Edit Password
            </DropdownItem>
            <DropdownItem
              onClick={handleStatusToggle}
              baseClassName="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/[0.05] dark:hover:text-gray-200"
            >
              {member.status === "Active" ? "Deactivate" : "Activate"}
            </DropdownItem>
          </Dropdown>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <AvatarText name={member.name} />
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-gray-800 text-base dark:text-white/90 truncate">
              {member.name}
            </h4>
            <div className="mt-1">
              <Badge size="sm" color="primary" variant="light">
                {member.role}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm dark:text-gray-400">
          <EnvelopeIcon className="w-6 h-6 shrink-0" />
          <span className="truncate">{member.email}</span>
        </div>

        <div className="flex items-center gap-2 text-gray-500 text-sm dark:text-gray-400">
          <CalenderIcon className="w-6 h-6 shrink-0" />
          <span>{member.joinedDate}</span>
        </div>

        <div>
          <Badge
            size="sm"
            color={member.status === "Active" ? "success" : "error"}
            variant="light"
          >
            {member.status}
          </Badge>
        </div>

        <div className="pt-2 border-t border-gray-100 dark:border-gray-800">
          <Link
            href={`/admin/teams/member/${member.id}`}
            className="flex items-center gap-2 text-brand-500 hover:text-brand-600 text-sm font-medium transition-colors"
          >
            View details
            <ArrowRightIcon className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
