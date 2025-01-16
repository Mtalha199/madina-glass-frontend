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
import { Link } from "react-router-dom";
import { Headers } from "@tanstack/react-table";
import HeaderCommon from "@/Commons/HeaderCommon";
import axios from "@/components/Api/Axios";
import { toast } from "@/hooks/use-toast";
import { APICALL } from "@/components/Api/ApiCall";
import { API_END_POINT, API_TYPE, SCREEN_PATH } from "@/Constant";
import SkeletonTable from "@/Commons/SkeletonTable";

const columns = [
  {
    header: "Name",
    accessorKey: "fullName",
    cell: ({ row }) => {
      const fullName = row.getValue("company_name");
      const id = row.getValue("id");
      return (
        <Link to={`/customer/${id}`} className="text-primary hover:underline">
          {fullName}
        </Link>
      );
    },
  },
  {
    header: "Status",
    accessorKey: "is_active",
    cell: ({ row }) => {
      const status = row.getValue("is_active");
      return (
        <Badge variant={status === true ? "success" : "destructive"}>
          {status === true ? "Active" : "Suspended"}
        </Badge>
      );
    },
  },
  { header: "User Name", accessorKey: "username" },
  { header: "Sip Trunks", accessorKey: "sip_trunks" },

  { header: "Balance", accessorKey: "balance" },

];

export default function CustomersList() {
  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(0);
  const [data,setData]= useState([]);

  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      API_END_POINT.CUSTOMER_LIST,
      setloading,
      null,
      setData,
      setCount
    );
  };
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customers List</h1>
        
        <Link to={SCREEN_PATH.ADD_NEW_CUSTOMER} className="text-primary hover:underline">
          <Button>Add New Customer</Button>
        </Link>
      </div>
      {loading ? (
        <SkeletonTable ROWS={10} COLUMNS={3} />
      ) : (
        <HeaderCommon DATA={data} COLUMNS={columns} COUNT={count} />
      )}
    </div>
  );
}
