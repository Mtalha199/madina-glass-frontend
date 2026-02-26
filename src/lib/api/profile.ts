import apiClient from "./config";


export interface Permission {
  id: number;
  name: string;
  description: string;
}

export interface Role {
    id: number;
    name: string;
    description: string;
    createdAt: string;
  }
  
  export interface AdminProfile {
    id: number;
    email: string;
    name: string;
    phone: string | null;
    role: Role;
    permissions: Permission[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    country: string | null;
    city: string | null;
    postalCode: string | null;
    profilePic: string | null;
  }
  
  export interface RawAdminApiResponse {
    success: boolean;
    data: AdminProfile;
    message: string;
  }

  export interface UpdateProfileResponse {
    success: boolean;
    data: {
      user: AdminProfile;
    };
    message: string;
  }

  export interface UpdateProfileData {
    name?: string;
    email?: string;
    phone?: string;
    country?: string;
    city?: string;
    postalCode?: string;
    profilePic?: File;
  }

  export interface ChangePasswordRequest {
    oldPassword: string;
    newPassword: string;
  }

  export interface ChangePasswordResponse {
    success: boolean;
    message: string;
  }

export const ProfileApi = {
    getProfile: async (): Promise<AdminProfile> => {
    const response = await apiClient.get<RawAdminApiResponse>(
      `/admin/profile`
    );
    return response.data.data
  },

  updateProfile: async (data: UpdateProfileData): Promise<UpdateProfileResponse> => {
    // Create FormData for file upload support
    const formData = new FormData();
    
    if (data.name) formData.append('name', data.name);
    if (data.email) formData.append('email', data.email);
    if (data.phone) formData.append('phone', data.phone);
    if (data.country) formData.append('country', data.country);
    if (data.city) formData.append('city', data.city);
    if (data.postalCode) formData.append('postalCode', data.postalCode);
    if (data.profilePic) formData.append('profilePic', data.profilePic);

    const response = await apiClient.patch<UpdateProfileResponse>(
      `/admin/profile`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  },

  changePassword: async (data: ChangePasswordRequest): Promise<ChangePasswordResponse> => {
    const response = await apiClient.patch<ChangePasswordResponse>(
      `/admin/change-password`,
      {
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }
    );
    return response.data;
  },
}