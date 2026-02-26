"use client";

import React, { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useSearchParams, useRouter, usePathname, useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageHeader from "@/components/common/PageHeader";
import Pagination from "@/components/tables/Pagination";
import ResourceNotFound from "@/components/common/ResourceNotFound";
import Skeleton from "@/components/ui/skeleton/Skeleton";
import Button from "@/components/ui/button/Button";
import PermissionWrapper from "@/components/permissions/PermissionWrapper";
import Toast from "@/components/ui/toast/Toast";
import ConfirmModal from "@/components/common/ConfirmModal";
import { rolesApi } from "@/lib/api/roles";

const ITEMS_PER_PAGE = 10;

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function RoleUsersContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const roleId = typeof params?.id === "string" ? params.id : "";

  // Pagination synced with URL: read page from query, default 1, clamp to >= 1
  const rawPageFromUrl = searchParams.get("page");
  const pageFromUrl = Math.max(
    1,
    rawPageFromUrl ? parseInt(rawPageFromUrl, 10) || 1 : 1
  );
  const [currentPageState, setCurrentPageState] = useState(pageFromUrl);

  // Keep state in sync when URL changes (e.g. browser back/forward)
  useEffect(() => {
    setCurrentPageState(pageFromUrl);
  }, [pageFromUrl]);

  const currentPage = currentPageState;
  const isInitialMount = useRef(true);

  // Sync URL with current page on mount (so ?page=1 is set when no param)
  useEffect(() => {
    if (!isInitialMount.current) return;
    isInitialMount.current = false;
    if (searchParams.get("page") === null) {
      const next = new URLSearchParams(searchParams.toString());
      next.set("page", "1");
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    }
  }, [pathname, router, searchParams]);

  const [roleName, setRoleName] = useState<string>("");
  const [users, setUsers] = useState<{ id: number; name: string; email: string; createdAt: string }[]>([]);
  const [meta, setMeta] = useState<{
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  } | null>(null);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isDeletingRole, setIsDeletingRole] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    isVisible: boolean;
  }>({ message: "", type: "success", isVisible: false });

  // Fetch role name from roles list
  useEffect(() => {
    if (!roleId) return;
    let cancelled = false;
    const fetchRoleName = async () => {
      setIsLoadingRoles(true);
      try {
        const roles = await rolesApi.getRoles();
        const role = roles.find((r) => String(r.id) === roleId);
        if (!cancelled && role) {
          setRoleName(role.name);
        }
      } catch {
        if (!cancelled) setRoleName("");
      } finally {
        if (!cancelled) setIsLoadingRoles(false);
      }
    };
    fetchRoleName();
    return () => {
      cancelled = true;
    };
  }, [roleId]);

  const apiParams = useMemo(
    () => ({ page: currentPage, limit: ITEMS_PER_PAGE }),
    [currentPage]
  );

  const fetchUsers = useCallback(async () => {
    if (!roleId) return;
    setIsLoadingUsers(true);
    setError(null);
    try {
      const data = await rolesApi.getRoleUsers(roleId, apiParams);
      setUsers(data.users);
      setMeta(data.meta);
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : null;
      setError(message || "Failed to load users");
      setUsers([]);
      setMeta(null);
    } finally {
      setIsLoadingUsers(false);
    }
  }, [roleId, apiParams]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePageChange = useCallback(
    (page: number) => {
      setCurrentPageState(page);
      const next = new URLSearchParams(searchParams.toString());
      next.set("page", String(page));
      router.replace(`${pathname}?${next.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const handleDeleteRoleClick = useCallback(() => {
    setShowDeleteConfirm(true);
  }, []);

  const handleConfirmDeleteRole = useCallback(async () => {
    if (!roleId) return;
    setIsDeletingRole(true);
    setError(null);
    try {
      await rolesApi.deleteRole(roleId);
      setShowDeleteConfirm(false);
      setToast({ message: "Role deleted successfully", type: "success", isVisible: true });
      router.push("/admin/dashboard/roles");
    } catch (err: unknown) {
      const message =
        err && typeof err === "object" && "response" in err
          ? (err as { response?: { data?: { message?: string } } }).response?.data?.message
          : null;
      const errorMessage = message || "Failed to delete role";
      setError(errorMessage);
      setToast({ message: errorMessage, type: "error", isVisible: true });
    } finally {
      setIsDeletingRole(false);
    }
  }, [roleId, router]);

  const totalPages = meta?.totalPages ?? 1;
  const totalItems = meta?.total ?? 0;

  if (!roleId) {
    return (
      <div>
        <PageHeader
          title="Role users"
          breadcrumbs={[
            { label: "Dashboard", href: "/admin/dashboard" },
            { label: "Roles", href: "/admin/dashboard/roles" },
            { label: "Users" },
          ]}
        />
        <ResourceNotFound variant="error" title="Invalid role" message="Role ID is missing." />
      </div>
    );
  }

  return (
    <div>
      <PageHeader
        title={roleName ? `Users assigned to ${roleName}` : "Users assigned to role"}
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Roles", href: "/admin/dashboard/roles" },
          { label: roleName ? `Users (${roleName})` : "Users" },
        ]}
        action={
          <PermissionWrapper permissions={["role.delete"]}>
            <Button
              variant="primary"
              size="sm"
              className="bg-red-600 hover:bg-red-700 border-red-200 hover:border-red-300 dark:text-red-400 dark:border-red-800 dark:hover:border-red-700"
              onClick={handleDeleteRoleClick}
              disabled={isDeletingRole}
            >
              {isDeletingRole ? "Deleting…" : "Delete role"}
            </Button>
          </PermissionWrapper>
        }
      />

      <div className="space-y-4">
        {isLoadingUsers ? (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            <div className="w-full">
              <div className="border-b border-gray-100 dark:border-white/5">
                <div className="grid grid-cols-3 gap-4 px-4 py-3">
                  <Skeleton variant="text" height={20} width="30%" />
                  <Skeleton variant="text" height={20} width="40%" />
                  <Skeleton variant="text" height={20} width="25%" />
                </div>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-white/5">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => (
                  <div key={i} className="grid grid-cols-3 gap-4 px-4 py-4">
                    <Skeleton variant="text" height={18} width={140} />
                    <Skeleton variant="text" height={16} width={180} />
                    <Skeleton variant="text" height={16} width={100} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            <ResourceNotFound
              variant="error"
              title="Failed to load users"
              message={error}
            />
          </div>
        ) : users.length === 0 ? (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            <ResourceNotFound
              variant="empty"
              title="No users assigned"
              message="No users are assigned to this role yet."
            />
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
            <Table className="w-full">
              <TableHeader className="border-b border-gray-100 dark:border-white/5">
                <TableRow>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Email
                  </TableCell>
                  <TableCell
                    isHeader
                    className="px-4 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Created At
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    onClick={() => router.push(`/admin/teams/member/${user.id}`)}
                    className="hover:bg-gray-50 dark:hover:bg-white/2 cursor-pointer"
                  >
                    <TableCell className="px-4 py-4 font-medium text-gray-800 text-theme-sm dark:text-white/90">
                      {user.name}
                    </TableCell>
                    <TableCell className="px-4 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                      <span className="truncate block max-w-[280px]">{user.email}</span>
                    </TableCell>
                    <TableCell className="px-4 py-4 text-gray-500 text-theme-sm dark:text-gray-400">
                      {formatDate(user.createdAt)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}

        {meta && meta.total > 0 && (
          <div className="mt-6">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              totalItems={totalItems}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={(totalItems ?? 0) > 0 ? undefined : handleConfirmDeleteRole}
        title={(totalItems ?? 0) > 0 ? "Cannot delete role" : "Delete role"}
        message={
          roleName
            ? `Are you sure you want to delete the role "${roleName}"? This cannot be undone.`
            : "Are you sure you want to delete this role? This cannot be undone."
        }
        blockedMessage={
          (totalItems ?? 0) > 0
            ? `This role has ${totalItems} user(s) assigned. Remove all users from this role before deleting.`
            : undefined
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        variant="danger"
        isLoading={isDeletingRole}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast((t) => ({ ...t, isVisible: false }))}
      />
    </div>
  );
}
