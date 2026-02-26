import type { Metadata } from "next";
import React from "react";
import InvoicesPageContent from "@/components/invoices/invoicesContent";

export const metadata: Metadata = {
  title: "Invoices | Madina Glass And Aluminium  ",
  description: "Manage and monitor invoices",
};

export default function TeamsPage() {
  return <InvoicesPageContent />;
}

