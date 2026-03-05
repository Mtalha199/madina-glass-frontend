import type { Metadata } from "next";
import React from "react";
import InvoicesPageContent from "@/components/invoices/invoicesContent";

export const metadata: Metadata = {
  title: "Walk-In Invoices | Madina Glass And Aluminium",
  description: "Create and manage walk-in invoices",
};

export default function WalkinInvoicesPage() {
  return <InvoicesPageContent presetCreateType="WALKIN" lockCreateType listFilterType="WALKIN" />;
}
