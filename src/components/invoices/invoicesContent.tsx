"use client";
import React, { useState } from "react";
import PageHeader from "../common/PageHeader";

import Button from "../ui/button/Button";

import { PlusIcon } from "@/icons";
import PermissionWrapper from "../permissions/PermissionWrapper";
import InvoicesList from "./InvoiceList";
import CreateInvoiceModal from "./CreateInvoiceModal";

export default function InvoicesPageContent() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateInvoice = () => setIsModalOpen(true);
  const handleSuccess = () => setRefreshKey((prev) => prev + 1);

  return (
    <div>
      <PageHeader
        title="Sales Invoices"
        subtitle="Generate and manage customer bills for Glass & Aluminium."
        breadcrumbs={[
          { label: "Dashboard", href: "/" },
          { label: "Invoices" },
        ]}
        action={
        //   <PermissionWrapper permissions={['invoice.create']}>
            <Button startIcon={<PlusIcon />} onClick={handleCreateInvoice}>
              Create New Bill
            </Button>
        //   </PermissionWrapper>
        }
      />
      
      <InvoicesList refreshTrigger={refreshKey} />

      <CreateInvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
      />
    </div>
  );
}