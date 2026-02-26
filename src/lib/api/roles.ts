import apiClient from "./config";

export interface PermissionResponse {
  id: number;
  name: string;
  description: string;
  createdAt: string;
}

export interface PermissionsApiResponse {
  success: boolean;
  data: PermissionResponse[];
  message: string;
}

export interface RolePermissionResponse {
  roleId: number;
  permissionId: number;
  permission: PermissionResponse;
}

export interface RoleResponse {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  permissions: RolePermissionResponse[];
  assignedUsersCount?: number;
}

export interface RolesApiResponse {
  success: boolean;
  data: RoleResponse[];
  message: string;
}

export interface CreateRoleRequest {
  name: string;
  description: string;
  permissionIds: number[];
}

export interface CreateRoleApiResponse {
  success: boolean;
  data: RoleResponse;
  message: string;
}

export interface UpdateRolePermissionsRequest {
  permissionIds: number[];
}

export interface UpdateRolePermissionsResponse {
  success: boolean;
  data: RoleResponse;
  message: string;
}

export interface RoleUserResponse {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export interface GetRoleUsersResponse {
  success: boolean;
  data: {
    users: RoleUserResponse[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
  message: string;
}

export interface GetRoleUsersParams {
  page: number;
  limit: number;
}

export interface DeleteRoleApiResponse {
  success: boolean;
  data: Record<string, never>;
  message: string;
}

export const rolesApi = {
  getPermissions: async (): Promise<PermissionResponse[]> => {
    const response = await apiClient.get<PermissionsApiResponse>("/roles/permissions");
    return response.data.data;
  },

  getRoles: async (): Promise<RoleResponse[]> => {
    const response = await apiClient.get<RolesApiResponse>("/roles");
    return response.data.data;
  },

  createRole: async (
    roleData: { name: string; description: string; permissionIds?: number[] }
  ): Promise<RoleResponse> => {
    const requestBody: CreateRoleRequest = {
      name: roleData.name,
      description: roleData.description,
      permissionIds: roleData.permissionIds || [],
    };
    const response = await apiClient.post<CreateRoleApiResponse>(
      "/roles",
      requestBody
    );
    return response.data.data;
  },

  updateRolePermissions: async (
    roleId: string,
    permissionIds: string[]
  ): Promise<RoleResponse> => {
    const requestBody: UpdateRolePermissionsRequest = {
      permissionIds: permissionIds.map((id) => parseInt(id, 10)),
    };
    const response = await apiClient.patch<UpdateRolePermissionsResponse>(
      `/roles/${roleId}/permissions`,
      requestBody
    );
    return response.data.data;
  },

  getRoleUsers: async (
    roleId: string,
    params: GetRoleUsersParams
  ): Promise<GetRoleUsersResponse["data"]> => {
    const response = await apiClient.get<GetRoleUsersResponse>(
      `/roles/${roleId}/users`,
      {
        params: { page: params.page, limit: params.limit },
      }
    );
    return response.data.data;
  },

  deleteRole: async (roleId: string): Promise<void> => {
    await apiClient.delete<DeleteRoleApiResponse>(`/roles/${roleId}`);
  },
};

