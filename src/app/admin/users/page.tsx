import type { Metadata } from "next";
import React from "react";
import PageHeader from "@/components/common/PageHeader";
import UsersContent from "@/components/users/UsersContent";

export const metadata: Metadata = {
  title: "Users | BFZ Track ",
  description: "Manage and view all users in the system",
};

export default function UsersPage() {
  return (
    <div>
      <PageHeader
        title="Users"
        breadcrumbs={[
          { label: "Dashboard", href: "/admin/dashboard" },
          { label: "Users" },
        ]}
      />
      <UsersContent />
    </div>
  );
}

