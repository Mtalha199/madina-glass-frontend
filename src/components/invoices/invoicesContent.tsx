"use client";
import React, { useState } from "react";
import PageHeader from "../common/PageHeader";

import Button from "../ui/button/Button";

import { PlusIcon } from "@/icons";
import PermissionWrapper from "../permissions/PermissionWrapper";
import InvoicesList from "./InvoiceList";
import CreateInvoiceModal from "./CreateInvoiceModal";

export default function InvoicesPageContent({
  presetCreateType,
  lockCreateType = false,
  autoOpenCreate = false,
  listFilterType = "ALL",
}: {
  presetCreateType?: "CUSTOMER" | "WALKIN";
  lockCreateType?: boolean;
  autoOpenCreate?: boolean;
  listFilterType?: "ALL" | "CUSTOMER" | "WALKIN";
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  React.useEffect(() => {
    if (autoOpenCreate) setIsModalOpen(true);
  }, [autoOpenCreate]);

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
          <div className="flex gap-2">
            {!lockCreateType && (
              <>
                <Button variant="outline" onClick={() => (window.location.href = "/admin/invoice/customer")}>
                  Customer Invoice
                </Button>
                <Button variant="outline" onClick={() => (window.location.href = "/admin/invoice/walkin")}>
                  Walk-In Invoice
                </Button>
              </>
            )}
            <Button startIcon={<PlusIcon />} onClick={handleCreateInvoice}>
              {presetCreateType ? `Create ${presetCreateType} Bill` : "Create New Bill"}
            </Button>
          </div>
        //   </PermissionWrapper>
        }
      />
      
      <InvoicesList refreshTrigger={refreshKey} filterType={listFilterType} />

      <CreateInvoiceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        presetCustomerType={presetCreateType}
        lockCustomerType={lockCreateType}
      />
    </div>
  );
}
