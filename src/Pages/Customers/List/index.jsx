"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { APICALL } from "@/components/Api/ApiCall";
import { API_END_POINT, API_TYPE, HAS_PERMISSION, PARENT_MODULE_NAME, PERMISSIONS, SCREEN_PATH } from "@/Constant";
import SkeletonTable from "@/Commons/SkeletonTable";
import TableContainer from "@/Commons/TableContainer";
import DataTable from "@/components/ui/data-table";

export default function CustomersList() {
  const columns = [
    {
      header: "Name",
      accessorKey: "username",
      cell: ({ row }) => {
        const fullName = row.getValue("username");
        const id = row.getValue("id");
        const status = row.getValue("is_active");
  
        const handleNavigation = () => {
          navigate(`/customer/${id}`, {
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
  const navigate = useNavigate();

  const [loading, setloading] = useState(false);
  const [data, setData] = useState([]);

  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [orderBy, setOrderBy] = useState(null);
  const [order, setOrder] = useState(null);
  const [visibleColumns, setVisibleColumns] = useState(
    columns.map((col) => col.accessorKey)
  );
  const [search, setSearch] = useState(null);
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      getData();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [page, limit, orderBy, order, search]);
  const getData = async () => {
    await APICALL(
      API_TYPE.GET,
      API_END_POINT.CUSTOMER_LIST,
      setloading,
      { page, limit, orderBy, order, search },
      setData,
      setCount
    );
  };
  const handleSort = (column) => {
    if (orderBy === column) {
      setOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setOrderBy(column);
      setOrder("asc");
    }
  };

  const handleSearch = (query) => {
    if (query === "") query = null;
    setSearch(query);
    setPage(1);
  };
  const handleVisibleColumnsChange = (newVisibleColumns) => {
    setVisibleColumns(newVisibleColumns);
  };
  const canViewDashboard = HAS_PERMISSION("List", "View");
  console.log("canViewDashboard", canViewDashboard);
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Customers List</h1>
        {
          HAS_PERMISSION(PARENT_MODULE_NAME.CUSTOMER,PERMISSIONS.CUSTOMER.LIST.NAME, PERMISSIONS.CUSTOMER.LIST.ACTIONS.CUSTOMER_CREATE) && (
            <Link
              to={SCREEN_PATH.ADD_NEW_CUSTOMER}
              className="text-primary hover:underline"
            >
              <Button>Add New Customer</Button>
            </Link>
          )
        }
      </div>
      {loading ? (
        <SkeletonTable ROWS={10} COLUMNS={3} />
      ) : (
        <>
          <TableContainer
            SEARCH={search}
            COLUMNS={columns}
            onSearch={handleSearch}
            VISIBILE_COLUMN_CHANGE={handleVisibleColumnsChange}
            INITIAL_VISIBLE_COLUMNS={visibleColumns}
          />
          <DataTable
            data={data}
            columns={columns?.filter((col) =>
              visibleColumns.includes(col?.accessorKey)
            )}
            COUNT={count}
            PAGE={page}
            SET_PAGE={setPage}
            LIMIT={limit}
            SET_LIMIT={setLimit}
            HANDLE_SORT={handleSort}
          />
        </>
      )}
    </div>
  );
}
