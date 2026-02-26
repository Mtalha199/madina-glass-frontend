import type { Metadata } from "next";
import TermsAndConditionsContent from "@/components/settings/TermsAndConditionsContent";

export const metadata: Metadata = {
  title: "Terms and Conditions | BFZ Track ",
  description: "Manage terms and conditions for your platform",
};

export default function TermsAndConditionsPage() {
  return <TermsAndConditionsContent />;
}

