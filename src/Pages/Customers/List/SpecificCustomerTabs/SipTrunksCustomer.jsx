"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/ui/data-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Link, useParams } from "react-router-dom";
import { Headers } from "@tanstack/react-table";
import HeaderCommon from "@/Commons/HeaderCommon";
import axios from "@/components/Api/Axios";
import { toast } from "@/hooks/use-toast";
import { APICALL } from "@/components/Api/ApiCall";
import { API_END_POINT, API_TYPE } from "@/Constant";
import SkeletonTable from "@/Commons/SkeletonTable";

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


export default function SipTrunksCusotmer() {
  const { id } = useParams();

  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      `${API_END_POINT.SIP_TRUNK}/${id}`,
      setloading,
      null,
      setData,
      setCount
    );
  };
  console.log(data,"datat")
  return (
    <div className="">
      {loading ? (
        <SkeletonTable ROWS={10} COLUMNS={3} />
      ) : (
        <HeaderCommon DATA={data} COLUMNS={columns} COUNT={count} />
      )}
    </div>
  );
}
