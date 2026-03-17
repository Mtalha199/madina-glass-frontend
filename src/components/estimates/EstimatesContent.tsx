"use client";
import React, { useState } from "react";
import PageHeader from "../common/PageHeader";
import Button from "../ui/button/Button";
import { PlusIcon } from "@/icons";
import EstimatesList from "./EstimatesList";
import CreateEstimateModal from "./CreateEstimateModal";

export default function EstimatesContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleSuccess = () => setRefreshKey((prev) => prev + 1);

  return (
    <div>
      <PageHeader
        title="Estimates"
        subtitle="Create quotes for customers and convert them to invoices later."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Estimates" },
        ]}
        action={
          <Button startIcon={<PlusIcon />} onClick={() => setIsModalOpen(true)}>
            Create Estimate
          </Button>
        }
      />

      <EstimatesList refreshTrigger={refreshKey} />

      <CreateEstimateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}
