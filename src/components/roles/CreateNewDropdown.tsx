"use client";

import React, { useState, useRef, useEffect } from "react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import Button from "@/components/ui/button/Button";
import { PlusIcon } from "@/icons";
import PermissionWrapper from "@/components/permissions/PermissionWrapper";

interface CreateNewDropdownProps {
  onCreateRole: () => void;
  onCreateUser: () => void;
}

const CreateNewDropdown: React.FC<CreateNewDropdownProps> = ({
  onCreateRole,
  onCreateUser,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function toggleDropdown() {
    setIsOpen((prev) => !prev);
  }

  function closeDropdown() {
    setIsOpen(false);
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.dropdown-toggle')
      ) {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  function handleCreateRole() {
    onCreateRole();
    closeDropdown();
  }

  function handleCreateUser() {
    onCreateUser();
    closeDropdown();
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="primary"
        size="sm"
        startIcon={<PlusIcon />}
        onClick={toggleDropdown}
        className="dropdown-toggle"
      >
        Create
      </Button>

      <Dropdown
        isOpen={isOpen}
        onClose={closeDropdown}
        className="right-0 mt-2 w-[220px] p-2"
      >
        <PermissionWrapper permissions="role.create">
          <DropdownItem
            onClick={handleCreateRole}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            Create Role
          </DropdownItem>
        </PermissionWrapper>

        <PermissionWrapper permissions="adminUser.create">
          <DropdownItem
            onClick={handleCreateUser}
            className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-300"
          >
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
            Create User
          </DropdownItem>
        </PermissionWrapper>
      </Dropdown>
    </div>
  );
};

export default CreateNewDropdown;

