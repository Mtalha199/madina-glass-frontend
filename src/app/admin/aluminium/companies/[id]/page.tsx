import type { Metadata } from "next";
import React from "react";
import { notFound } from "next/navigation";
import CompanyItemsPageContent from "@/components/aluminium/CompanyItemsPageContent";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const companyId = Number.parseInt(id, 10);
  return {
    title: Number.isFinite(companyId) ? `Company Items #${companyId} | Madina Glass And Aluminium` : "Company Items | Madina Glass And Aluminium",
    description: "Manage aluminium company items",
  };
}

export default async function AluminiumCompanyItemsPage({ params }: PageProps) {
  const { id } = await params;
  const companyId = Number.parseInt(id, 10);
  if (!Number.isFinite(companyId)) notFound();
  return <CompanyItemsPageContent companyId={companyId} />;
}
