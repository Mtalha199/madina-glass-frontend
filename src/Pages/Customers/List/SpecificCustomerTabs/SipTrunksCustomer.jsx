"use client";

import { useParams } from "react-router-dom";
import SipTrunkCommonTable from "@/Commons/SipTrunkTableCommon";

export default function SipTrunksCusotmer() {
  const { id } = useParams();
  return <SipTrunkCommonTable id={id} />;
}
