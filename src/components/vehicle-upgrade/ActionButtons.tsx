"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/button/Button";
import { vehicleApi, VehicleResponse } from "@/lib/api/vehicle";
import { Modal } from "@/components/ui/modal";
import { useModal } from "@/hooks/useModal";
import TextArea from "@/components/form/input/TextArea";
import Label from "@/components/form/Label";
import PermissionWrapper from "../permissions/PermissionWrapper";

interface ActionButtonsProps {
  vehicleId: string;
}

export default function ActionButtons({ vehicleId }: ActionButtonsProps) {
  const router = useRouter();
  const [isApproving, setIsApproving] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);
  const [approveNotes, setApproveNotes] = useState("");
  const [rejectNotes, setRejectNotes] = useState("");
  const [approveError, setApproveError] = useState<string | null>(null);
  const [rejectError, setRejectError] = useState<string | null>(null);
  const [upgradeStatus, setUpgradeStatus] = useState<"PENDING" | "APPROVED" | "REJECTED" | null>(null);

  useEffect(() => {
    const fetchVehicleStatus = async () => {
      try {
        const vehicle = await vehicleApi.getVehicleById(vehicleId);
        if (vehicle) {
          setUpgradeStatus(vehicle.upgradeStatus);
        }
      } catch (error) {
        console.error("Failed to fetch vehicle status:", error);
      }
    };

    fetchVehicleStatus();
  }, [vehicleId]);

  const {
    isOpen: isApproveModalOpen,
    openModal: openApproveModal,
    closeModal: closeApproveModal,
  } = useModal();

  const {
    isOpen: isRejectModalOpen,
    openModal: openRejectModal,
    closeModal: closeRejectModal,
  } = useModal();

  const handleApproveClick = () => {
    setApproveNotes("");
    setApproveError(null);
    openApproveModal();
  };

  const handleRejectClick = () => {
    setRejectNotes("");
    setRejectError(null);
    openRejectModal();
  };

  const handleApproveSubmit = async () => {
    try {
      setApproveError(null);
      setIsApproving(true);
      await vehicleApi.approveUpgrade(vehicleId, approveNotes);
      setUpgradeStatus("APPROVED");
      closeApproveModal();
      // Redirect to upgrade requests list with success message
      router.push("/admin/vehicle/upgrade?action=approved");
    } catch (error: any) {
      console.error("Failed to approve upgrade:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to approve upgrade. Please try again.";
      setApproveError(errorMessage);
    } finally {
      setIsApproving(false);
    }
  };

  const handleRejectSubmit = async () => {
    try {
      setRejectError(null);
      setIsRejecting(true);
      await vehicleApi.rejectUpgrade(vehicleId, rejectNotes);
      setUpgradeStatus("REJECTED");
      closeRejectModal();
      // Redirect to upgrade requests list with success message
      router.push("/admin/vehicle/upgrade?action=rejected");
    } catch (error: any) {
      console.error("Failed to reject upgrade:", error);
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Failed to reject upgrade. Please try again.";
      setRejectError(errorMessage);
    } finally {
      setIsRejecting(false);
    }
  };

  const Spinner = ({ color = "text-white" }: { color?: string }) => (
    <svg
      className={`animate-spin h-3.5 w-3.5 ${color}`}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
  );

  const isLoading = isApproving || isRejecting;

  // Hide buttons based on status
  const showRejectButton = upgradeStatus !== "REJECTED";
  const showApproveButton = upgradeStatus !== "APPROVED";

  // Don't render anything if both buttons should be hidden
  if (!showRejectButton && !showApproveButton) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-2">
        {showRejectButton && (
          <PermissionWrapper permissions={['upgradeRequest.reject']}>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRejectClick}
              disabled={isLoading}
              className="border-red-500! text-red-500! hover:bg-red-50! dark:border-red-500! dark:text-red-500! dark:hover:bg-red-500/10! disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Reject
            </Button>
          </PermissionWrapper>
        )}
        {showApproveButton && (
         <PermissionWrapper permissions={['upgradeRequest.approve']}>
           <Button
            variant="primary"
            size="sm"
            onClick={handleApproveClick}
            disabled={isLoading}
            className="bg-green-500! hover:bg-green-600! disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Approve
          </Button>
         </PermissionWrapper>
        )}
      </div>

      {/* Approve Modal */}
      <Modal
        isOpen={isApproveModalOpen}
        onClose={closeApproveModal}
        className="max-w-[584px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[584px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Approve Upgrade Request
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Please provide a reason for approving this upgrade request.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleApproveSubmit();
            }}
            className="flex flex-col"
          >
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div>
                <Label htmlFor="approve-reason">Note for Approval</Label>
                <TextArea
                  id="approve-reason"
                  placeholder="Enter the reason for approving this upgrade request..."
                  rows={4}
                  value={approveNotes}
                  onChange={(value) => {
                    setApproveNotes(value);
                    setApproveError(null);
                  }}
                  disabled={isApproving}
                  error={!!approveError}
                />
                {approveError && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">{approveError}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeApproveModal}
                disabled={isApproving}
                type="button"
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleApproveSubmit} disabled={isApproving} type="submit">
                {isApproving ? <Spinner /> : "Approve"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>

      {/* Reject Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={closeRejectModal}
        className="max-w-[584px] m-4"
      >
        <div className="no-scrollbar relative w-full max-w-[584px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Reject Upgrade Request
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Please provide a reason for rejecting this upgrade request.
            </p>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleRejectSubmit();
            }}
            className="flex flex-col"
          >
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div>
                <Label htmlFor="reject-reason">Reason for Rejection</Label>
                <TextArea
                  id="reject-reason"
                  placeholder="Enter the reason for rejecting this upgrade request..."
                  rows={4}
                  value={rejectNotes}
                  onChange={(value) => {
                    setRejectNotes(value);
                    setRejectError(null);
                  }}
                  disabled={isRejecting}
                  error={!!rejectError}
                />
                {rejectError && (
                  <p className="mt-2 text-sm text-red-500 dark:text-red-400">{rejectError}</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={closeRejectModal}
                disabled={isRejecting}
                type="button"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleRejectSubmit}
                disabled={isRejecting}
                type="submit"
                className="bg-red-500! hover:bg-red-600! text-white!"
              >
                {isRejecting ? <Spinner color="text-white" /> : "Reject"}
              </Button>
            </div>
          </form>
        </div>
      </Modal>
    </>
  );
}
