"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { authApi } from "@/lib/api/auth";
import { storage } from "@/lib/storage";
import { AuthState, User, LoginRequest } from "@/shared/types/auth";
import { ProfileApi, AdminProfile } from "@/lib/api/profile";

interface AuthContextType extends AuthState {
  login: (credentials: LoginRequest) => Promise<void>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Helper function to convert AdminProfile to User
const mapAdminProfileToUser = (profile: AdminProfile): User => ({
  id: profile.id,
  email: profile.email,
  name: profile.name,
  role: profile.role?.name || "",
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserProfile = useCallback(async () => {
    try {
      const profile = await ProfileApi.getProfile();
      const userData = mapAdminProfileToUser(profile);
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user profile:", error);
      // If profile fetch fails, user might not be authenticated
      setUser(null);
    }
  }, []);

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = storage.getAccessToken();
        if (token) {
          setAccessToken(token);
          // Fetch fresh user data from profile API
          await fetchUserProfile();
        }
      } catch (error) {
        console.error("Auth initialization error:", error);
        storage.clearAuth();
        setAccessToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, [fetchUserProfile]);

  const login = async (credentials: LoginRequest) => {
    const response = await authApi.login(credentials);
    if (!response.success || !response.data) {
      throw new Error(response.message || "Login failed");
    }

    const { access_token } = response.data;
    storage.setAccessToken(access_token);
    setAccessToken(access_token);
    
    // Fetch fresh user data from profile API after login
    await fetchUserProfile();
  };

  const logout = () => {
    storage.clearAuth();
    setAccessToken(null);
    setUser(null);
  };

  const refreshUser = useCallback(async () => {
    await fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: !!accessToken && !!user,
        login,
        logout,
        refreshUser,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
