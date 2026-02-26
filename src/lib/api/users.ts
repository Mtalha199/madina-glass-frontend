import apiClient from "./config";

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  roleId: number;
}

export interface UserResponse {
  id: number;
  name: string;
  email: string;
  createdAt: string;
}

export interface CreateUserApiResponse {
  success: boolean;
  data: UserResponse;
  message: string;
}

export interface ApiUser {
  id: number;
  email: string;
  phone: string | null;
  password: string;
  name: string;
  profilePic: string | null;
  deviceToken: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersResponse {
  success: boolean;
  data: {
    users: ApiUser[];
    meta: {
      total: number;
      offset: number;
      limit: number;
    };
  };
  message: string;
}

export interface GetUsersParams {
  offset?: number;
  limit?: number;
  search?: string;
  page?: number;
}

export interface UpdatePasswordResponse {
  success: boolean;
  message: string;
}

export const usersApi = {
  createUser: async (userData: {
    name: string;
    email: string;
    password: string;
    roleId: string;
  }): Promise<UserResponse> => {
    const requestBody: CreateUserRequest = {
      name: userData.name,
      email: userData.email,
      password: userData.password,
      roleId: parseInt(userData.roleId, 10),
    };
    const response = await apiClient.post<CreateUserApiResponse>(
      "/admin",
      requestBody
    );
    return response.data.data;
  },

  getUsers: async (params: GetUsersParams = {}): Promise<GetUsersResponse> => {
    const queryParams: Record<string, string> = {};
    
    // Convert page to offset if page is provided
    if (params.page !== undefined && params.limit !== undefined) {
      queryParams.offset = String((params.page - 1) * params.limit);
      queryParams.limit = String(params.limit);
    } else {
      queryParams.offset = String(params.offset || 0);
      queryParams.limit = String(params.limit || 100);
    }
    
    // Add search parameter if provided
    if (params.search && params.search.trim()) {
      queryParams.search = params.search.trim();
    }
    
    const response = await apiClient.get<GetUsersResponse>("/users", {
      params: queryParams,
    });
    return response.data;
  },

  updatePassword: async (userId: number, password: string): Promise<UpdatePasswordResponse> => {
    const response = await apiClient.patch<UpdatePasswordResponse>(
      `/admin/${userId}/password`,
      { password }
    );
    return response.data;
  },
};

