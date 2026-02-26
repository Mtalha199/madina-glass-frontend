"use client";
import React, { useState } from "react";
import PageHeader from "../common/PageHeader";
import TeamsContent from "./TeamsContent";
import Button from "../ui/button/Button";
import CreateAdminModal from "./CreateAdminModal";
import { PlusIcon } from "@/icons";
import PermissionWrapper from "../permissions/PermissionWrapper";

export default function TeamsPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleAddMember = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div>
      <PageHeader
        title="Team Members"
        subtitle="Manage and monitor your team members and their roles."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Teams" },
        ]}
        action={
          <PermissionWrapper permissions={['adminUser.create']}>

          <Button startIcon={<PlusIcon />} onClick={handleAddMember}>
            Add Member
          </Button>
          </PermissionWrapper>
        }
      />
      <TeamsContent refreshTrigger={refreshKey} />
      <CreateAdminModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
