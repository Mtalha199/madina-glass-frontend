"use client";

import { Link, useNavigate, useParams } from "react-router-dom";
import SipTrunkCommonTable from "@/Commons/SipTrunkTableCommon";
import { Button } from "@/components/ui/button";
import { SCREEN_PATH } from "@/Constant";

export default function SipTrunksCusotmer() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <div className="flex justify-end items-center mb-4">
        <Button
          onClick={() =>
            navigate(SCREEN_PATH.ADD_NEW_SIP_TRUNK, { state: { id: id } })
          }
        >
          Add New Sip Trunk
        </Button>
      </div>
      <SipTrunkCommonTable id={id} />
    </>
  );
}
