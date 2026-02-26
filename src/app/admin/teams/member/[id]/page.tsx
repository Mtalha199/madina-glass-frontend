import type { Metadata } from "next";
import { notFound } from "next/navigation";
import MemberDetailContent from "@/components/teams/MemberDetailContent";

export const metadata: Metadata = {
  title: "Member Details | BFZ Track ",
  description: "View detailed information about team member",
};

export default async function MemberDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) {
    notFound();
  }

  return <MemberDetailContent memberId={id} />;
}

