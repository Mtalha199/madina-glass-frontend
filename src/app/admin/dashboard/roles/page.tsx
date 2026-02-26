import type { Metadata } from "next";
import React from "react";
import RolesContent from "./RolesContent";
import PermissionWrapper from "@/components/permissions/PermissionWrapper";

export const metadata: Metadata = {
  title: "Roles & Permissions | BFZ Track ",
  description: "Define and manage access control roles",
};

export default function RolesPage() {
  return (
    <PermissionWrapper 
      permissions={["role.view"]}
      fallback={null}
    >
      <RolesContent />
    </PermissionWrapper>
  );
}

