import type { Metadata } from "next";
import React from "react";
import CompaniesPageContent from "@/components/aluminium/CompaniesPageContent";

export const metadata: Metadata = {
  title: "Companies | Madina Glass And Aluminium",
  description: "Manage aluminium companies",
};

export default function AluminiumCompaniesPage() {
  return <CompaniesPageContent />;
}
