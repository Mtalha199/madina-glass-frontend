"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import MemberDetailHeader from "./MemberDetailHeader";
import ContactInformationCard from "./ContactInformationCard";
import RolePermissionsCard from "./RolePermissionsCard";
import EditAdminModal from "./EditAdminModal";
import Toast from "../ui/toast/Toast";
import { adminsApi, Admin } from "@/lib/api/admins";
import Skeleton from "../ui/skeleton/Skeleton";
import ResourceNotFound from "../common/ResourceNotFound";

interface MemberDetailContentProps {
  memberId: string;
}

const formatDateTime = (dateString?: string): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};

export default function MemberDetailContent({ memberId }: MemberDetailContentProps) {
  const router = useRouter();
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isStatusChanging, setIsStatusChanging] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const fetchAdmin = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await adminsApi.getAdminById(memberId);
      setAdmin(data);
    } catch (err: any) {
      if (err.response?.status === 404) {
        setError("Admin not found");
      } else {
        setError(err.response?.data?.message || "Failed to load admin details");
      }
      console.error("Error fetching admin:", err);
    } finally {
      setLoading(false);
    }
  }, [memberId]);

  useEffect(() => {
    fetchAdmin();
  }, [fetchAdmin]);

  const handleUpdate = async (updates: { name?: string; email?: string; role?: string }) => {
    if (!admin) return;
    try {
      const updated = await adminsApi.updateAdmin(admin.id, updates);
      setAdmin(updated);
      setToast({
        message: "Admin updated successfully",
        type: "success",
        isVisible: true,
      });
    } catch (err: any) {
      const errorMsg = err.response?.data?.message || "Failed to update admin";
      setToast({
        message: errorMsg,
        type: "error",
        isVisible: true,
      });
      console.error("Error updating admin:", err);
    }
  };

  const handleEditSuccess = async () => {
    // Refresh admin data after successful update
    try {
      const updated = await adminsApi.getAdminById(memberId);
      setAdmin(updated);
    } catch (err) {
      console.error("Error refreshing admin:", err);
    }
  };

  const handleStatusChange = async (newStatus: "active" | "inactive") => {
    if (!admin) return;
    setIsStatusChanging(true);
    try {
      await adminsApi.changeAdminStatus(admin.id);
      // Refetch the full admin data to ensure we have all fields
      const updated = await adminsApi.getAdminById(memberId);
      setAdmin(updated);
      setToast({
        message: `Admin ${newStatus === "active" ? "activated" : "deactivated"} successfully`,
        type: "success",
        isVisible: true,
      });
    } catch (err: any) {
      setToast({
        message: err.response?.data?.message || "Failed to change status",
        type: "error",
        isVisible: true,
      });
      console.error("Error changing status:", err);
    } finally {
      setIsStatusChanging(false);
    }
  };

  const handleDelete = async () => {
    if (!admin || !confirm(`Are you sure you want to delete ${admin.name}?`)) return;
    try {
      await adminsApi.changeAdminStatus(admin.id);
      setToast({
        message: "Admin deactivated successfully",
        type: "success",
        isVisible: true,
      });
      setTimeout(() => {
        router.push("/admin/teams");
      }, 1000);
    } catch (err: any) {
      setToast({
        message: err.response?.data?.message || "Failed to delete admin",
        type: "error",
        isVisible: true,
      });
      console.error("Error deleting admin:", err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Skeleton variant="rectangular" height={200} />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Skeleton variant="rectangular" height={300} />
          <Skeleton variant="rectangular" height={300} />
        </div>
        <Skeleton variant="rectangular" height={150} />
      </div>
    );
  }

  if (error || !admin) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <ResourceNotFound 
          showGoBack={true}
        />
      </div>
    );
  }

  const roleDescriptions: Record<string, string> = {
    super_admin: "Full access to everything in the system",
    admin: "Administrative access with most permissions",
    moderator: "Limited administrative access",
    manager: "Manager level access with limited permissions",
  };

  const getRoleName = (role: string | { id: number; name: string } | undefined | null): string => {
    if (!role) return "N/A";
    return typeof role === "string" ? role : role.name || "N/A";
  };

  const getRoleDescription = (role: string | { id: number; name: string } | undefined | null): string => {
    const roleName = getRoleName(role);
    if (roleName === "N/A") return "No description available";
    const roleStr = roleName.toLowerCase();
    return roleDescriptions[roleStr] || "No description available";
  };

  return (
    <div className="space-y-6">
      <MemberDetailHeader
        member={{
          id: admin.id,
          name: admin.name,
          role: getRoleName(admin.role),
          status: admin.status === "active" ? "Active" : "Inactive",
        }}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onEdit={() => setIsEditModalOpen(true)}
        isStatusChanging={isStatusChanging}
      />

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      <EditAdminModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSuccess={handleEditSuccess}
        admin={admin}
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <ContactInformationCard
          email={admin.email}
          memberSince={formatDateTime(admin.createdAt)}
          lastUpdated={formatDateTime(admin.updatedAt)}
        />
        <RolePermissionsCard
          role={getRoleName(admin.role)}
          description={getRoleDescription(admin.role)}
          roleCreated={formatDateTime(admin.createdAt)}
        />
      </div>
    </div>
  );
}
