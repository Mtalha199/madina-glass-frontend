"use client";

import React, { useState, useCallback, lazy, Suspense, useEffect, useMemo } from "react";
import RolesPageHeader from "@/components/roles/RolesPageHeader";
import RoleCard from "@/components/roles/RoleCard";
import RoleCardSkeleton from "@/components/roles/RoleCardSkeleton";
import Toast from "@/components/ui/toast/Toast";
import ConfirmModal from "@/components/common/ConfirmModal";
import { useModal } from "@/hooks/useModal";
import { Role, Permission } from "@/shared/types/permissions";
import { rolesApi } from "@/lib/api/roles";
import { usersApi } from "@/lib/api/users";
import { mapRolesResponseToRoles, extractUniquePermissionsFromRoles } from "@/lib/api/mappers/roles";

function getApiErrorMessage(error: unknown): string {
  if (error && typeof error === "object" && "response" in error) {
    const err = error as { response?: { data?: { message?: string } } };
    return err.response?.data?.message || "Something went wrong";
  }
  return error instanceof Error ? error.message : "Something went wrong";
}

// Lazy load modals to reduce initial bundle size
const EditPermissionsModal = lazy(() => import("@/components/roles/modals/EditPermissionsModal"));
const CreateRoleModal = lazy(() => import("@/components/roles/modals/CreateRoleModal"));
const CreateUserModal = lazy(() => import("@/components/roles/modals/CreateUserModal"));

export default function RolesContent() {
  const { isOpen, openModal, closeModal } = useModal();
  const { isOpen: isCreateRoleOpen, openModal: openCreateRoleModal, closeModal: closeCreateRoleModal } = useModal();
  const { isOpen: isCreateUserOpen, openModal: openCreateUserModal, closeModal: closeCreateUserModal } = useModal();
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(false);
  const [isSavingPermissions, setIsSavingPermissions] = useState(false);
  const [isCreatingUser, setIsCreatingUser] = useState(false);
  const [isCreatingRole, setIsCreatingRole] = useState(false);
  const [deletingRoleId, setDeletingRoleId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    isVisible: boolean;
  }>({ message: "", type: "success", isVisible: false });

  // Fetch roles and extract permissions from roles response
  useEffect(() => {
    const fetchData = async () => {
      setIsLoadingRoles(true);
      try {
        const rolesResponse = await rolesApi.getRoles();
        setRoles(mapRolesResponseToRoles(rolesResponse));
        setPermissions(extractUniquePermissionsFromRoles(rolesResponse));
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setToast({
          message: getApiErrorMessage(error),
          type: "error",
          isVisible: true,
        });
      } finally {
        setIsLoadingRoles(false);
      }
    };
    fetchData();
  }, []);

  const handleCreateRole = () => openCreateRoleModal();
  const handleCreateUser = () => openCreateUserModal();

  // Refetch roles and permissions after update
  const refetchRoles = useCallback(async () => {
    setIsLoadingRoles(true);
    try {
      const rolesResponse = await rolesApi.getRoles();
      const updatedRoles = mapRolesResponseToRoles(rolesResponse);
      setRoles(updatedRoles);
      setPermissions(extractUniquePermissionsFromRoles(rolesResponse));

      // Update selected role if it still exists
      setSelectedRole((prev) => {
        if (!prev) return prev;
        const updatedRole = updatedRoles.find((r) => r.id === prev.id);
        return updatedRole || prev;
      });
    } catch (error) {
      console.error("Failed to refetch roles:", error);
      setToast({
        message: getApiErrorMessage(error),
        type: "error",
        isVisible: true,
      });
    } finally {
      setIsLoadingRoles(false);
    }
  }, []);

  const handleSaveRole = useCallback(
    async (roleData: { identifier: string; name: string; description: string }) => {
      setIsCreatingRole(true);
      try {
        await rolesApi.createRole({
          name: roleData.name,
          description: roleData.description,
        });
        await refetchRoles();
        setToast({ message: "Role created successfully", type: "success", isVisible: true });
      } catch (error) {
        console.error("Failed to create role:", error);
        setToast({
          message: getApiErrorMessage(error),
          type: "error",
          isVisible: true,
        });
        throw error;
      } finally {
        setIsCreatingRole(false);
      }
    },
    [refetchRoles]
  );

  const handleSaveUser = useCallback(
    async (userData: { name: string; email: string; password: string; roleId: string }) => {
      setIsCreatingUser(true);
      try {
        await usersApi.createUser(userData);
        setToast({ message: "User created successfully", type: "success", isVisible: true });
      } catch (error) {
        console.error("Failed to create user:", error);
        setToast({
          message: getApiErrorMessage(error),
          type: "error",
          isVisible: true,
        });
        throw error;
      } finally {
        setIsCreatingUser(false);
      }
    },
    []
  );

  const handleEditPermissions = useCallback(
    (roleId: string) => {
      const role = roles.find((r) => r.id === roleId);
      if (role) {
        setSelectedRole(role);
        openModal();
      }
    },
    [roles, openModal]
  );

  const handleSavePermissions = useCallback(
    async (roleId: string, permissionIds: string[]) => {
      setIsSavingPermissions(true);
      try {
        await rolesApi.updateRolePermissions(roleId, permissionIds);
        await refetchRoles();
        setToast({ message: "Permissions updated successfully", type: "success", isVisible: true });
      } catch (error) {
        console.error("Failed to update role permissions:", error);
        setToast({
          message: getApiErrorMessage(error),
          type: "error",
          isVisible: true,
        });
        throw error;
      } finally {
        setIsSavingPermissions(false);
      }
    },
    [refetchRoles]
  );

  const [roleToDelete, setRoleToDelete] = useState<Role | null>(null);

  const handleDeleteRoleClick = useCallback((roleId: string) => {
    const role = roles.find((r) => r.id === roleId);
    if (role) setRoleToDelete(role);
  }, [roles]);

  const handleConfirmDeleteRole = useCallback(
    async () => {
      if (!roleToDelete) return;
      const roleId = roleToDelete.id;
      setDeletingRoleId(roleId);
      try {
        await rolesApi.deleteRole(roleId);
        if (selectedRole?.id === roleId) {
          closeModal();
          setSelectedRole(null);
        }
        setRoleToDelete(null);
        await refetchRoles();
        setToast({ message: "Role deleted successfully", type: "success", isVisible: true });
      } catch (error) {
        console.error("Failed to delete role:", error);
        setToast({
          message: getApiErrorMessage(error),
          type: "error",
          isVisible: true,
        });
      } finally {
        setDeletingRoleId(null);
      }
    },
    [roleToDelete, selectedRole, closeModal, refetchRoles]
  );

  const roleCards = useMemo(() => {
    if (isLoadingRoles) {
      return Array.from({ length: 3 }, (_, i) => <RoleCardSkeleton key={i} />);
    }
    if (roles.length === 0) {
      return (
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3 p-8 text-center transition-colors">
          <p className="text-gray-500 dark:text-gray-400">
            No roles found. Create your first role to get started.
          </p>
        </div>
      );
    }
    return roles.map((role) => (
      <RoleCard
        key={role.id}
        role={role}
        onEditPermissions={handleEditPermissions}
        onDeleteRole={handleDeleteRoleClick}
        isDeleting={deletingRoleId === role.id}
      />
    ));
  }, [isLoadingRoles, roles, handleEditPermissions, handleDeleteRoleClick, deletingRoleId]);

  return (
    <div>
      <RolesPageHeader
        onCreateRole={handleCreateRole}
        onCreateUser={handleCreateUser}
      />
      
      <div className="space-y-4">
        {roleCards}
      </div>
      
      {selectedRole && isOpen && (
        <Suspense fallback={null}>
          <EditPermissionsModal
            isOpen={isOpen}
            onClose={closeModal}
            role={selectedRole}
            permissions={permissions}
            isLoading={isLoadingRoles}
            isSaving={isSavingPermissions}
            onSave={handleSavePermissions}
          />
        </Suspense>
      )}

      {isCreateRoleOpen && (
        <Suspense fallback={null}>
          <CreateRoleModal
            isOpen={isCreateRoleOpen}
            onClose={closeCreateRoleModal}
            onSave={handleSaveRole}
            isSaving={isCreatingRole}
          />
        </Suspense>
      )}

      {isCreateUserOpen && (
        <Suspense fallback={null}>
          <CreateUserModal
            isOpen={isCreateUserOpen}
            onClose={closeCreateUserModal}
            onSave={handleSaveUser}
            roles={roles}
            isLoading={isLoadingRoles}
            isSaving={isCreatingUser}
          />
        </Suspense>
      )}

      {roleToDelete && (
        <ConfirmModal
          isOpen={!!roleToDelete}
          onClose={() => setRoleToDelete(null)}
          onConfirm={
            (roleToDelete.assignedUsersCount ?? 0) > 0
              ? undefined
              : handleConfirmDeleteRole
          }
          title={
            (roleToDelete.assignedUsersCount ?? 0) > 0
              ? "Cannot delete role"
              : "Delete role"
          }
          message={`Are you sure you want to delete the role "${roleToDelete.name}"? This cannot be undone.`}
          blockedMessage={
            (roleToDelete.assignedUsersCount ?? 0) > 0
              ? `This role has ${roleToDelete.assignedUsersCount} user(s) assigned. Remove all users from this role before deleting.`
              : undefined
          }
          confirmLabel="Delete"
          cancelLabel="Cancel"
          variant="danger"
          isLoading={deletingRoleId === roleToDelete.id}
        />
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((t) => ({ ...t, isVisible: false }))}
      />
    </div>
  );
}

