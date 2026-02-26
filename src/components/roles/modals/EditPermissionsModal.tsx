"use client";

import React, { useState, useMemo, useCallback } from "react";
import { Modal } from "@/components/ui/modal";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";
import PermissionItem from "../PermissionItem";
import PermissionItemSkeleton from "../PermissionItemSkeleton";
import { Role, Permission } from "@/shared/types/permissions";

interface EditPermissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  role: Role;
  permissions: Permission[];
  isLoading?: boolean;
  isSaving?: boolean;
  onSave: (roleId: string, permissionIds: string[]) => Promise<void>;
}

const EditPermissionsModalContent: React.FC<{
  role: Role;
  permissions: Permission[];
  isLoading?: boolean;
  isSaving?: boolean;
  onSave: (roleId: string, permissionIds: string[]) => Promise<void>;
  onClose: () => void;
}> = ({ role, permissions, isLoading, isSaving = false, onSave, onClose }) => {
  // Single source of truth: selected permission IDs state
  // State is reset automatically when role.id or role.permissionIds changes via key prop
  const [selectedPermissionIds, setSelectedPermissionIds] = useState<Set<string>>(
    () => new Set(role.permissionIds)
  );

  const handleTogglePermission = useCallback((permissionId: string, checked: boolean) => {
    setSelectedPermissionIds((prev) => {
      const hasPermission = prev.has(permissionId);
      if ((checked && hasPermission) || (!checked && !hasPermission)) {
        return prev; // No change needed
      }
      const newSet = new Set(prev);
      checked ? newSet.add(permissionId) : newSet.delete(permissionId);
      return newSet;
    });
  }, []);

  const selectedCount = useMemo(() => selectedPermissionIds.size, [selectedPermissionIds]);

  const handleSave = useCallback(async () => {
    try {
      await onSave(role.id, Array.from(selectedPermissionIds));
      onClose();
    } catch (error) {
      console.error("Error saving permissions:", error);
    }
  }, [role.id, selectedPermissionIds, onSave, onClose]);

  const handleCancel = useCallback(() => {
    setSelectedPermissionIds(new Set(role.permissionIds));
    onClose();
  }, [role.permissionIds, onClose]);

  return (
    <div className="flex flex-col h-full max-h-[80vh]">
      {/* Fixed Header */}
      <div className="shrink-0 mb-6">
        <div className="flex items-center gap-2 mb-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90">
            Manage Permissions for
          </h2>
          <Badge variant="light" color="info" size="md">
            {role.name}
          </Badge>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Select the permissions you want to assign to the {role.name} role.
        </p>
      </div>

      {/* Scrollable Permissions List */}
      <div 
        className="flex-1 overflow-y-auto min-h-0 mb-6 pr-2 -mr-2 custom-scrollbar"
        style={{
          willChange: 'scroll-position',
          transform: 'translateZ(0)',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
      >
        <div className="pr-2">
          {isLoading ? (
            <div className="space-y-3">
              {[...Array(5)].map((_, index) => (
                <PermissionItemSkeleton key={index} />
              ))}
            </div>
          ) : permissions.length === 0 ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No permissions available
            </div>
          ) : (
            <div className="space-y-3">
              {permissions.map((permission) => (
                <PermissionItem
                  key={permission.id}
                  permission={permission}
                  isChecked={selectedPermissionIds.has(permission.id)}
                  onToggle={handleTogglePermission}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="shrink-0 flex items-center justify-between pt-6 border-t border-gray-200 dark:border-gray-800">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">{selectedCount}</span> permissions selected
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="md"
            onClick={handleCancel}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={handleSave}
            disabled={isSaving || isLoading}
          >
            {isSaving ? "Saving..." : "Save Permissions"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const EditPermissionsModal: React.FC<EditPermissionsModalProps> = React.memo(({
  isOpen,
  onClose,
  role,
  permissions,
  isLoading,
  isSaving,
  onSave,
}) => {
  // Create a stable key that includes both role.id and permissionIds
  // This ensures the component remounts when either changes, avoiding the need for useEffect
  const contentKey = useMemo(
    () => `${role.id}-${role.permissionIds.slice().sort().join(',')}`,
    [role.id, role.permissionIds]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      className="max-w-4xl p-6 lg:p-8 max-h-[90vh]"
    >
      <EditPermissionsModalContent
        key={contentKey}
        role={role}
        permissions={permissions}
        isLoading={isLoading}
        isSaving={isSaving}
        onSave={onSave}
        onClose={onClose}
      />
    </Modal>
  );
});

EditPermissionsModal.displayName = "EditPermissionsModal";

export default EditPermissionsModal;

