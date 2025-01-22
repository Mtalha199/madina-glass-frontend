import { API_END_POINT, API_TYPE } from "@/Constant";
import React, { useState, useEffect } from "react";
import HeaderCommon from "./HeaderCommon";
import { APICALL } from "@/components/Api/ApiCall";
import SkeletonTable from "./SkeletonTable";
import { Badge } from "@/components/ui/badge";

const SipTrunkCommonTable = ({ id }) => {
  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const columns = [
    { header: "ID", accessorKey: "id" },
    { header: "Name", accessorKey: "trunk_name" },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <Badge variant={status === true ? "success" : "destructive"}>
            {status === true ? "True" : "False"}
          </Badge>
        );
      },
    },
    { header: "Trunk Type", accessorKey: "trunk_type" },
    {
      header: "Global Ani Block",
      accessorKey: "global_ani_block",
      cell: ({ row }) => {
        const status = row.getValue("global_ani_block");
        return (
          <Badge variant={status === true ? "success" : "destructive"}>
            {status === true ? "True" : "False"}
          </Badge>
        );
      },
    },
    {
      header: "Customer Ani Block",
      accessorKey: "customer_ani_block",
      cell: ({ row }) => {
        const status = row.getValue("customer_ani_block");
        return (
          <Badge variant={status === true ? "success" : "destructive"}>
            {status === true ? "True" : "False"}
          </Badge>
        );
      },
    },
    { header: "DNIS Call Limit", accessorKey: "dnis_call_limit" },
    { header: "ANI Call Limit", accessorKey: "ani_call_limit" },
    { header: "Session Limit", accessorKey: "session_limit" },
    { header: "Default Stir Shaken", accessorKey: "default_stir_shaken" },
    { header: "SIP Trunk ID", accessorKey: "sip_trunk_id" },
    {
      header: "Global DNIS Block",
      accessorKey: "global_dnis_block",
      cell: ({ row }) => {
        const status = row.getValue("global_dnis_block");
        return (
          <Badge variant={status === true ? "success" : "destructive"}>
            {status === true ? "True" : "False"}
          </Badge>
        );
      },
    },
    {
      header: "Customer DNIS Block",
      accessorKey: "customer_dnis_block",
      cell: ({ row }) => {
        const status = row.getValue("customer_dnis_block");
        return (
          <Badge variant={status === true ? "success" : "destructive"}>
            {status === true ? "True" : "False"}
          </Badge>
        );
      },
    },
    { header: "CPS Limit", accessorKey: "cps_limit" },
  ];

  useEffect(() => {
    getData();
  }, [id]); // Re-fetch data when `id` changes

  const getData = async () => {
    const endpoint = id
      ? `${API_END_POINT.SIP_TRUNK_LIST}/${id}`
      : `${API_END_POINT.SIP_TRUNK_LIST}`;
    await APICALL(
      API_TYPE.GET,
      endpoint,
      setloading,
      null,
      setData,
      setCount
    );
  };

  return (
    <div>
      {loading ? (
        <SkeletonTable ROWS={10} COLUMNS={3} />
      ) : (
        <HeaderCommon DATA={data} COLUMNS={columns} COUNT={count} />
      )}
    </div>
  );
};

export default SipTrunkCommonTable;
