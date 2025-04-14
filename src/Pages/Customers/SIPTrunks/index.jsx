"use client";
import SipTrunkCommonTable from "@/Commons/SipTrunkTableCommon";
import { Button } from "@/components/ui/button";
import { HAS_PERMISSION, PARENT_MODULE_NAME, PERMISSIONS, SCREEN_PATH } from "@/Constant";
import { Link } from "react-router-dom";
export default function SipTrunkList() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold mb-4">Sip Trunk List</h1>
        {HAS_PERMISSION(
          PARENT_MODULE_NAME.CUSTOMER,

          PERMISSIONS.CUSTOMER.SIP_TRUNK.NAME,
          PERMISSIONS.CUSTOMER.SIP_TRUNK.ACTIONS.CUSTOMER_SIP_TRUNK_CREATE
        ) && (
          <Link
            to={SCREEN_PATH.ADD_NEW_SIP_TRUNK}
            className="text-primary hover:underline"
          >
            <Button>Add New Sip Trunk</Button>
          </Link>
        )}
      </div>
      <SipTrunkCommonTable />
    </div>
  );
}
