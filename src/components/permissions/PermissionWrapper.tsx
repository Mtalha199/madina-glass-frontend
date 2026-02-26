"use client";

import React from "react";
import { usePermissions } from "@/context/PermissionsContext";

interface PermissionWrapperProps {
  /**
   * Single permission string or array of permissions
   * If array is provided, user must have ALL permissions (AND logic)
   * Use `requireAny` prop to change to OR logic
   */
  permissions: string | string[];
  /**
   * If true, user needs ANY of the provided permissions (OR logic)
   * If false, user needs ALL of the provided permissions (AND logic)
   * Default: false
   */
  requireAny?: boolean;
  /**
   * Content to render if user has the required permissions
   */
  children: React.ReactNode;
  /**
   * Optional fallback content to render if user doesn't have permissions
   * If not provided, nothing is rendered
   */
  fallback?: React.ReactNode;
  /**
   * If true, shows children while permissions are loading
   * If false, shows nothing (or fallback) while loading
   * Default: false
   */
  showWhileLoading?: boolean;
}

/**
 * PermissionWrapper - A universal component to conditionally render content based on user permissions
 * 
 * @example
 * // Single permission
 * <PermissionWrapper permissions="role.create">
 *   <button>Create Role</button>
 * </PermissionWrapper>
 * 
 * @example
 * // Multiple permissions (AND logic - user must have all)
 * <PermissionWrapper permissions={["role.create", "role.update"]}>
 *   <button>Create & Update</button>
 * </PermissionWrapper>
 * 
 * @example
 * // Multiple permissions (OR logic - user must have any)
 * <PermissionWrapper permissions={["role.create", "role.update"]} requireAny>
 *   <button>Create or Update</button>
 * </PermissionWrapper>
 * 
 * @example
 * // With fallback
 * <PermissionWrapper 
 *   permissions="role.delete" 
 *   fallback={<p>You don't have permission to delete</p>}
 * >
 *   <button>Delete</button>
 * </PermissionWrapper>
 */
export const PermissionWrapper: React.FC<PermissionWrapperProps> = ({
  permissions,
  requireAny = false,
  children,
  fallback = null,
  showWhileLoading = false,
}) => {
  const { hasAnyPermission, hasAllPermissions, isLoading } = usePermissions();

  // Normalize permissions to array
  const permissionArray = Array.isArray(permissions) ? permissions : [permissions];

  // Check permissions based on requireAny flag
  let hasRequiredPermissions = false;
  if (!isLoading) {
    if (requireAny) {
      hasRequiredPermissions = hasAnyPermission(permissionArray);
    } else {
      hasRequiredPermissions = hasAllPermissions(permissionArray);
    }
  }

  // Show loading state
  if (isLoading) {
    return showWhileLoading ? <>{children}</> : <>{fallback}</>;
  }

  // Render based on permission check
  return hasRequiredPermissions ? <>{children}</> : <>{fallback}</>;
};

export default PermissionWrapper;

