import { RoleResponse, PermissionResponse } from "../roles";
import { Role, Permission } from "@/shared/types/permissions";

/**
 * Converts role name to identifier (slug format)
 * "SuperAdmin" -> "super_admin"
 */
const nameToIdentifier = (name: string): string =>
  name.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase().replace(/\s+/g, "_");

/**
 * Maps permission response to Permission type
 */
const mapPermissionResponseToPermission = (perm: PermissionResponse): Permission => ({
  id: String(perm.id),
  name: perm.name,
  description: perm.description,
});

/**
 * Maps role response to Role type - single source of truth
 */
export const mapRoleResponseToRole = (role: RoleResponse): Role => ({
  id: String(role.id),
  identifier: nameToIdentifier(role.name),
  name: role.name,
  description: role.description,
  assignedUsersCount: role.assignedUsersCount ?? 0,
  permissionIds: role.permissions.map((p) => String(p.permission.id)),
  permissionNames: role.permissions.map((p) => p.permission.name),
});

/**
 * Maps role responses array to Roles array
 */
export const mapRolesResponseToRoles = (roles: RoleResponse[]): Role[] =>
  roles.map(mapRoleResponseToRole);

/**
 * Extracts unique permissions from roles response
 * Uses Map for O(n) time complexity with O(1) lookups
 */
export const extractUniquePermissionsFromRoles = (roles: RoleResponse[]): Permission[] => {
  const permissionsMap = new Map<string, Permission>();
  
  for (const role of roles) {
    for (const { permission } of role.permissions || []) {
      const id = String(permission.id);
      if (!permissionsMap.has(id)) {
        permissionsMap.set(id, mapPermissionResponseToPermission(permission));
      }
    }
  }
  
  return Array.from(permissionsMap.values());
};

