import type { Metadata } from "next";
import React from "react";
import TeamsPageContent from "@/components/teams/TeamsPageContent";

export const metadata: Metadata = {
  title: "Team Members | BFZ Track ",
  description: "Manage and monitor your team members and their roles",
};

export default function TeamsPage() {
  return <TeamsPageContent />;
}

