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
import { Link, useNavigate } from "react-router-dom";
import { Headers } from "@tanstack/react-table";
import HeaderCommon from "@/Commons/HeaderCommon";
import axios from "@/components/Api/Axios";
import { toast } from "@/hooks/use-toast";
import { APICALL } from "@/components/Api/ApiCall";
import { API_END_POINT, API_TYPE, SCREEN_PATH } from "@/Constant";
import SkeletonTable from "@/Commons/SkeletonTable";

export const PaymentsCarrier=()=>{
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
        accessorKey: "company_name",
      },
    
      { header: "Balance", accessorKey: "balance" },
    
    ];
    return (
        <>
        <div className="flex justify-end items-center mb-4">
          
            <Button>Add Balance</Button>
        </div>
        {loading ? (
          <SkeletonTable ROWS={10} COLUMNS={3} />
        ) : (
          <HeaderCommon DATA={data} COLUMNS={columns} COUNT={count} />
        )}
        </>
    );
}