"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { ProfileApi, AdminProfile } from "@/lib/api/profile";
import { useAuth } from "./AuthContext";

interface PermissionsContextType {
  profile: AdminProfile | null;
  permissions: string[];
  permissionsSet: Set<string>;
  isLoading: boolean;
  hasPermission: (permission: string) => boolean;
  hasAnyPermission: (permissions: string[]) => boolean;
  hasAllPermissions: (permissions: string[]) => boolean;
  refetch: () => Promise<void>;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const PermissionsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [isPermissionsLoading, setIsPermissionsLoading] = useState(true);

  const fetchProfile = useCallback(async () => {
    // Wait for auth to finish loading before fetching permissions
    if (isAuthLoading) {
      return;
    }

    if (!isAuthenticated) {
      setProfile(null);
      setIsPermissionsLoading(false);
      return;
    }

    try {
      setIsPermissionsLoading(true);
      const profileData = await ProfileApi.getProfile();
      setProfile(profileData);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      setProfile(null);
    } finally {
      setIsPermissionsLoading(false);
    }
  }, [isAuthenticated, isAuthLoading]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // Combined loading: show loading while auth OR permissions are loading
  const isLoading = isAuthLoading || isPermissionsLoading;

  // Permissions array and Set
  const permissions = profile?.permissions?.map((p) => p.name) || [];
  const permissionsSet = new Set(permissions);

  function hasPermission(permission: string): boolean {
    return permissionsSet.has(permission);
  }

  function hasAnyPermission(requiredPermissions: string[]): boolean {
    if (requiredPermissions.length === 0) return true;
    return requiredPermissions.some((permission) => permissionsSet.has(permission));
  }

  function hasAllPermissions(requiredPermissions: string[]): boolean {
    if (requiredPermissions.length === 0) return true;
    return requiredPermissions.every((permission) => permissionsSet.has(permission));
  }

  const contextValue = {
    profile,
    permissions,
    permissionsSet,
    isLoading,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    refetch: fetchProfile,
  };

  return (
    <PermissionsContext.Provider value={contextValue}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }
  return context;
};

