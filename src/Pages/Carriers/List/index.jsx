"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import HeaderCommon from "@/Commons/HeaderCommon";
import { APICALL } from "@/components/Api/ApiCall";
import { API_END_POINT, API_TYPE, SCREEN_PATH } from "@/Constant";
import SkeletonTable from "@/Commons/SkeletonTable";



export default function CarriersList() {
  const navigate = useNavigate();

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
  const columns = [
    {
      header: "Name",
      accessorKey: "fullName",
      cell: ({ row }) => {
        const fullName = row.getValue("company_name");
        const id = row.getValue("id");
        const status = row.getValue("is_active");

        const handleNavigation = () => {
          navigate(`/carriers/${id}`, {
            state: { name: fullName, is_active: status },
          });
        };

        return (
          <span
            className="text-primary hover:underline cursor-pointer"
            onClick={handleNavigation}
          >
            {fullName}
          </span>
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
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Carriers List</h1>
        
        <Link to={SCREEN_PATH.ADD_NEW_CARRIER} className="text-primary hover:underline">
          <Button>Add New Carrier</Button>
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
