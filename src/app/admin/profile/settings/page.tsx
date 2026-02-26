import type { Metadata } from "next";
import React from "react";
import AccountSettingsContent from "@/components/user-profile/AccountSettingsContent";

export const metadata: Metadata = {
  title: "Account Settings | BFZ Track ",
  description: "Manage your account settings and preferences",
};

export default function AccountSettingsPage() {
  return <AccountSettingsContent />;
}

