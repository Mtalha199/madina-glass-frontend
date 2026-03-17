import type { Metadata } from "next";
import React from "react";
import EstimatesContent from "@/components/estimates/EstimatesContent";

export const metadata: Metadata = {
  title: "Estimates | Madina Glass And Aluminium",
  description: "Create and manage customer estimates",
};

export default function EstimatesPage() {
  return <EstimatesContent />;
}
