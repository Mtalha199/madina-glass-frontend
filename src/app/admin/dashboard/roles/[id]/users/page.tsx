import type { Metadata } from "next";
import React from "react";
import RoleUsersContent from "@/components/roles/RoleUsersContent";

export const metadata: Metadata = {
  title: "Role users | BFZ Track",
  description: "View users assigned to a role",
};

export default function RoleUsersPage() {
  return <RoleUsersContent />;
}
