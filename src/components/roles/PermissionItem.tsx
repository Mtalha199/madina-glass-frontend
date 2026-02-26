import React, { useCallback, useMemo } from "react";
import Checkbox from "@/components/form/input/Checkbox";
import { Permission } from "@/shared/types/permissions";
import { formatPermission } from "@/lib/utils";

interface PermissionItemProps {
  permission: Permission;
  isChecked: boolean;
  onToggle: (permissionId: string, checked: boolean) => void;
}

const PermissionItem: React.FC<PermissionItemProps> = React.memo(({
  permission,
  isChecked,
  onToggle,
}) => {
  const handleChange = useCallback((checked: boolean) => {
    onToggle(permission.id, checked);
  }, [permission.id, onToggle]);

  // Memoize formatted permission name to avoid recalculation on every render
  const formattedName = useMemo(() => formatPermission(permission.name), [permission.name]);

  return (
    <div className="rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-4 hover:border-gray-300 dark:hover:border-gray-700" style={{ contentVisibility: 'auto' }}>
      <div className="flex items-start gap-3">
        <div className="mt-0.5 shrink-0">
          <Checkbox
            id={`permission-${permission.id}`}
            checked={isChecked}
            onChange={handleChange}
          />
        </div>
        <div className="flex-1 min-w-0">
          <label
            htmlFor={`permission-${permission.id}`}
            className="block text-sm font-semibold text-gray-800 dark:text-white/90 mb-1 cursor-pointer"
          >
            {formattedName}
          </label>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {permission.description}
          </p>
        </div>
      </div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison function for better performance
  return (
    prevProps.permission.id === nextProps.permission.id &&
    prevProps.permission.name === nextProps.permission.name &&
    prevProps.permission.description === nextProps.permission.description &&
    prevProps.isChecked === nextProps.isChecked &&
    prevProps.onToggle === nextProps.onToggle
  );
});

PermissionItem.displayName = "PermissionItem";

export default PermissionItem;

