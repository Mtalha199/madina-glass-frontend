import type { Metadata } from "next";
import React from "react";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserAddressCard from "@/components/user-profile/UserAddressCard";
import ProfilePageContent from "@/components/teams/ProfilePageContent";

export const metadata: Metadata = {
  title: "Edit Profile | BFZ Track ",
  description: "Edit your profile information and personal details",
};

export default function EditProfilePage() {
  return (<ProfilePageContent />);
}

