import type { Metadata } from "next";
import React from "react";
import PageHeader from "@/components/common/PageHeader";
import CustomersContent from "@/components/Customers/CustomersContent";

export const metadata: Metadata = {
  title: "Walk-In Customers | Madina Glass",
  description: "View walk-in customer records and history",
};

export default function WalkinCustomersPage() {
  return (
    <div>
      <PageHeader
        title="Walk-In Customers"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Customers", href: "/admin/users" },
          { label: "Walk-In" },
        ]}
      />
      <CustomersContent filterType="WALKIN" />
    </div>
  );
}
