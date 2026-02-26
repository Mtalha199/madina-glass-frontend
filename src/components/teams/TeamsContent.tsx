"use client";
import React, { useEffect, useState } from "react";
import TeamSummaryCards from "./TeamSummaryCards";
import TeamMemberCard from "./TeamMemberCard";
import Toast from "../ui/toast/Toast";
import { adminsApi, Admin } from "@/lib/api/admins";
import Skeleton from "../ui/skeleton/Skeleton";
import Pagination from "../tables/Pagination";
import { usePagination } from "@/hooks/usePagination";
import ResourceNotFound from "../common/ResourceNotFound";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Input from "../form/input/InputField";
import Label from "../form/Label";
import { useModal } from "@/hooks/useModal";
import { usersApi } from "@/lib/api/users";

interface TeamMember {
  id: number;
  name: string;
  email: string;
  role: string;
  joinedDate: string;
  status: "Active" | "Inactive";
}

const formatDate = (dateString?: string): string => {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const getRoleName = (role: string | { id: number; name: string } | undefined | null): string => {
  if (!role) return "N/A";
  return typeof role === "string" ? role : role.name || "N/A";
};

const mapAdminToTeamMember = (admin: Admin): TeamMember => ({
  id: admin.id,
  name: admin.name,
  email: admin.email,
  role: getRoleName(admin.role),
  joinedDate: formatDate(admin.createdAt),
  status: admin.status === "active" ? "Active" : "Inactive",
});

interface TeamsContentProps {
  refreshTrigger?: number;
}

export default function TeamsContent({ refreshTrigger }: TeamsContentProps) {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error" | "info" | "warning";
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const { isOpen, openModal, closeModal } = useModal();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);


  const fetchAdmins = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await adminsApi.getAdmins();
      const adminsList = Array.isArray(response) ? response : response.data || [];
      setAdmins(adminsList);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to load admins");
      console.error("Error fetching admins:", err);
    } finally {
      setLoading(false);
    }
  };

  // Update pagination when admins change
  const teamMembers = admins.map(mapAdminToTeamMember);
  const {
    currentPage,
    totalPages,
    paginatedItems,
    goToPage,
    totalItems,
  } = usePagination<TeamMember>(teamMembers, { itemsPerPage: 9 });

  useEffect(() => {
    fetchAdmins();
  }, [refreshTrigger]);

  const handleStatusChange = async (id: number, currentStatus: "Active" | "Inactive") => {
    try {
      const newStatus = currentStatus === "Active" ? "inactive" : "active";
      await adminsApi.changeAdminStatus(id);
      await fetchAdmins();
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
    }
  };

  const handleEditPassword = (member: TeamMember) => {
    setSelectedMember(member);
    setPassword("");
    setConfirmPassword("");
    setPasswordError(null);
    setConfirmPasswordError(null);
    setFormError(null);
    setSuccessMessage(null);
    openModal();
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setPasswordError(null);
    setFormError(null);
    // Clear confirm password error if passwords match
    if (confirmPassword && value === confirmPassword) {
      setConfirmPasswordError(null);
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);
    setConfirmPasswordError(null);
    setFormError(null);
    // Validate match immediately
    if (password && value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError(null);
    }
  };

  const validateForm = (): boolean => {
    let isValid = true;

    // Validate password
    if (!password || password.trim() === "") {
      setPasswordError("Password is required");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      isValid = false;
    }

    // Validate confirm password
    if (!confirmPassword || confirmPassword.trim() === "") {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmitPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMessage(null);

    if (!validateForm() || !selectedMember) {
      return;
    }

    setIsUpdating(true);

    try {
      await usersApi.updatePassword(selectedMember.id, password);
      setSuccessMessage("Password updated successfully!");
      
      // Reset form
      setPassword("");
      setConfirmPassword("");
      setPasswordError(null);
      setConfirmPasswordError(null);

      // Close modal after 1.5 seconds
      setTimeout(() => {
        closeModal();
        setSuccessMessage(null);
        // Refresh admins list
        fetchAdmins();
      }, 1500);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to update password";
      setFormError(errorMessage);
      console.error("Error updating password:", err);
    } finally {
      setIsUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <TeamSummaryCards admins={[]} loading={true} />
        <div>
          <div className="flex items-center justify-between mb-4">
            <Skeleton variant="rectangular" height={32} width={200} />
            <Skeleton variant="rectangular" height={20} width={120} />
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} variant="rectangular" height={280} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
        <ResourceNotFound 
          variant="error"
          title="Failed to Load Team Members"
          message="We couldn't load the team members. Please try again or contact support if the problem persists."
        />
      </div>
    );
  }

  // Show ResourceNotFound when no admins are found
  if (!loading && !error && admins.length === 0) {
    return (
      <div className="space-y-6">
        <TeamSummaryCards admins={[]} loading={false} />
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
          <ResourceNotFound 
            variant="empty"
            title="No Team Members"
            message="There are no team members yet. Add your first team member to get started."
          />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <TeamSummaryCards admins={admins} loading={false} />
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white/90">
            All Members
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {totalItems} members found
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 md:gap-6">
          {paginatedItems.map((member) => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onStatusChange={handleStatusChange}
              onEditPassword={handleEditPassword}
            />
          ))}
        </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={goToPage}
            totalItems={totalItems}
            itemsPerPage={9}
          />
      </div>
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />

      {/* Edit Password Modal */}
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[500px] m-4">
        <div className="no-scrollbar relative w-full max-w-[500px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Update Password
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Update the password for {selectedMember?.name || "this member"}.
            </p>
          </div>
          <form onSubmit={handleSubmitPassword} className="flex flex-col">
            {formError && (
              <div className="px-2 mb-4 p-3 text-sm text-red-600 bg-red-50 rounded-lg dark:bg-red-900/20 dark:text-red-400">
                {formError}
              </div>
            )}
            {successMessage && (
              <div className="px-2 mb-4 p-3 text-sm text-green-600 bg-green-50 rounded-lg dark:bg-green-900/20 dark:text-green-400">
                {successMessage}
              </div>
            )}
            <div className="px-2 pb-3">
              <div className="space-y-5">
                <div>
                  <Label>New Password</Label>
                  <Input 
                    type="password" 
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    error={!!passwordError}
                    hint={passwordError || undefined}
                    disabled={isUpdating}
                    required
                  />
                </div>

                <div>
                  <Label>Confirm Password</Label>
                  <Input 
                    type="password" 
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                    error={!!confirmPasswordError}
                    hint={confirmPasswordError || undefined}
                    disabled={isUpdating}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button 
                type="button"
                size="sm" 
                variant="outline" 
                onClick={closeModal}
                disabled={isUpdating}
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                size="sm"
                disabled={isUpdating}
              >
                {isUpdating ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
