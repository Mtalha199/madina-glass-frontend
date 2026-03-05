import type { Metadata } from "next";
import React from "react";
import PageHeader from "@/components/common/PageHeader";
import CustomersContent from "@/components/Customers/CustomersContent";

export const metadata: Metadata = {
  title: "Permanent Customers | Madina Glass",
  description: "View permanent customer records and history",
};

export default function PermanentCustomersPage() {
  return (
    <div>
      <PageHeader
        title="Permanent Customers"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Customers", href: "/admin/users" },
          { label: "Permanent" },
        ]}
      />
      <CustomersContent filterType="PERMANENT" />
    </div>
  );
}
