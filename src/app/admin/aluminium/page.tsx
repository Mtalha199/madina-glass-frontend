import type { Metadata } from "next";
import React from "react";
import AluminiumPageContent from "@/components/aluminium/AluminiumPageContent";

export const metadata: Metadata = {
  title: "Aluminium | Madina Glass And Aluminium",
  description: "Manage aluminium stock, price list and invoices",
};

export default function AluminiumPage() {
  return <AluminiumPageContent />;
}
