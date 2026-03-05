import type { Metadata } from "next";
import React from "react";
import InvoicesPageContent from "@/components/invoices/invoicesContent";

export const metadata: Metadata = {
  title: "Customer Invoices | Madina Glass And Aluminium",
  description: "Create and manage permanent customer invoices",
};

export default function CustomerInvoicesPage() {
  return <InvoicesPageContent presetCreateType="CUSTOMER" lockCreateType listFilterType="CUSTOMER" />;
}
