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
import { API_END_POINT, API_TYPE } from "@/Constant";
import SkeletonTable from "@/Commons/SkeletonTable";

const columns = [
  { header: "ID", accessorKey: "id" },
  {
    header: "Name",
    accessorKey: "fullName",
    cell: ({ row }) => {
      const fullName = row.getValue("fullName");
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
  { header: "Email", accessorKey: "email" },
  { header: "Phone", accessorKey: "phoneNumber" },
  { header: "Address", accessorKey: "address" },
];

export default function CustomersList() {
  const [loading, setloading] = useState(false);
  const [count, setCount] = useState(0);
  const [data,setData]= useState([]);

  const [customers, setCustomers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    getCustomerList();
  }, []);
  const getCustomerList = async () => {
    const response = await APICALL(
      API_TYPE.GET,
      API_END_POINT.CUSTOMER_LIST,
      setloading,
      setData,
      setCount
    );
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customers List</h1>
        <Button>Add New Customer</Button>
      </div>
      {loading ? (
        <SkeletonTable ROWS={10} COLUMNS={3} />
      ) : (
        <HeaderCommon DATA={data} COLUMNS={columns} />
      )}
    </div>
  );
}
