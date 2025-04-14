"use client";
import SipTrunkCommonTable from "@/Commons/SipTrunkTableCommon";
import { Button } from "@/components/ui/button";
import { HAS_PERMISSION, PARENT_MODULE_NAME, PERMISSIONS, SCREEN_PATH } from "@/Constant";
import { Link } from "react-router-dom";
export default function SipTrunkListCarrier() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Carrier Sip Trunk List</h1>
        {
          HAS_PERMISSION(
            PARENT_MODULE_NAME.CARRIER,
            PERMISSIONS.CARRIER.SIP_TRUNK.NAME,
            PERMISSIONS.CARRIER.SIP_TRUNK.ACTIONS.CARRIER_SIP_TRUNK_CREATE
          ) && (
            <Link
              to={SCREEN_PATH.ADD_NEW_SIP_TRUNK_CARRIER}
              className="text-primary hover:underline"
            >
              <Button>Add New Sip Trunk</Button>
            </Link>
          )
        }
      </div>
      <SipTrunkCommonTable CARRIER={true} />
    </div>
  );
}
