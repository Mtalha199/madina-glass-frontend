// Single source of truth for permission types

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface PermissionCategory {
  id: string;
  title: string;
  description: string;
  permissions: Permission[];
}

export interface Role {
  id: string;
  identifier: string;
  name: string;
  description: string;
  assignedUsersCount: number;
  permissionIds: string[]; // Array of permission IDs assigned to this role
  permissionNames: string[]; // Array of permission names assigned to this role
}

export interface PermissionsData {
  categories: PermissionCategory[];
}

